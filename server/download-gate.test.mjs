import assert from "node:assert/strict";
import { generateKeyPairSync, sign } from "node:crypto";
import { mkdtempSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  createDownloadGate,
  isOpenAt,
  parseRange,
  RELEASES,
  signPayload,
  verifyPayload,
} from "./download-gate.mjs";

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve(server.address().port));
  });
}

function close(server) {
  return new Promise((resolve) => server.close(resolve));
}

test("range parsing accepts bounded, open, and suffix ranges", () => {
  assert.deepEqual(parseRange("bytes=10-19", 100), { start: 10, end: 19 });
  assert.deepEqual(parseRange("bytes=90-", 100), { start: 90, end: 99 });
  assert.deepEqual(parseRange("bytes=-5", 100), { start: 95, end: 99 });
  assert.equal(parseRange("bytes=100-", 100), false);
  assert.equal(parseRange("items=0-1", 100), false);
});

test("the Windows download is the published PrimaLauncher alpha", () => {
  const windows = RELEASES.find((release) => release.id === "windows");
  assert.equal(windows.filename, "PrimaLauncher-26.1.0-alpha.1-x64.exe");
  assert.equal(windows.bytes, 114_262_896);
  assert.equal(
    windows.sha256,
    "2613a09d0f1619f9fede22d25aba45245377663e0361d8f8d507f9f537f13a72",
  );
});

test("signed cookies reject tampering and expiry", () => {
  const secret = "x".repeat(48);
  const token = signPayload({ email: "alphatest1@oxygenai.top", exp: 2_000 }, secret);
  assert.equal(verifyPayload(token, secret, 1_000).email, "alphatest1@oxygenai.top");
  assert.equal(verifyPayload(token.slice(0, -1) + "A", secret, 1_000), null);
  assert.equal(verifyPayload(token, secret, 2_001), null);
});

test("opening time is inclusive and based on the supplied clock", () => {
  const openAt = Date.parse("2026-11-22T20:45:00+08:00");
  assert.equal(isOpenAt(openAt, openAt - 1), false);
  assert.equal(isOpenAt(openAt, openAt), true);
});

test("OAuth callback issues a scoped session and streams whitelisted bytes", async () => {
  const fileRoot = mkdtempSync(join(tmpdir(), "prima-download-gate-"));
  for (const release of RELEASES) {
    writeFileSync(join(fileRoot, release.filename), "download-test-bytes");
  }
  const fixture = RELEASES.map((release) => ({ ...release, bytes: 19 }));

  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  const jwk = { ...publicKey.export({ format: "jwk" }), kid: "test-key" };
  let issuer = "";
  const idToken = () => {
    const header = Buffer.from(
      JSON.stringify({ alg: "RS256", typ: "JWT", kid: "test-key" }),
    ).toString("base64url");
    const claims = Buffer.from(
      JSON.stringify({
        iss: issuer,
        aud: "oa_test",
        token_use: "id",
        sub: "alpha-sub",
        email: "AlphaTest1@oxygenai.top",
        email_verified: true,
        account_type: "user",
        exp: Math.floor(Date.now() / 1000) + 600,
      }),
    ).toString("base64url");
    const signature = sign(
      "RSA-SHA256",
      Buffer.from(`${header}.${claims}`),
      privateKey,
    ).toString("base64url");
    return `${header}.${claims}.${signature}`;
  };
  const account = createServer((request, response) => {
    if (request.url === "/oauth2/token") {
      response.setHeader("content-type", "application/json");
      response.end(
        JSON.stringify({
          access_token: "access-test",
          id_token: idToken(),
        }),
      );
      return;
    }
    if (request.url === "/.well-known/jwks.json") {
      response.setHeader("content-type", "application/json");
      response.end(JSON.stringify({ keys: [jwk] }));
      return;
    }
    if (request.url === "/oauth2/userinfo") {
      response.setHeader("content-type", "application/json");
      response.end(
        JSON.stringify({
          sub: "alpha-sub",
          email_verified: true,
          account_type: "user",
          name: "Alpha Test 1",
        }),
      );
      return;
    }
    response.statusCode = 404;
    response.end();
  });
  const issuerPort = await listen(account);
  issuer = `http://127.0.0.1:${issuerPort}`;
  const now = Date.parse("2026-11-22T20:45:01+08:00");
  const secret = "s".repeat(48);
  const config = {
    openAt: Date.parse("2026-11-22T20:45:00+08:00"),
    publicUrl: "http://127.0.0.1:1",
    issuer,
    clientId: "oa_test",
    scopes: "openid profile email",
    sessionSecret: secret,
    cookieDomain: "",
    secureCookies: false,
    fileRoot,
    staticDir: "",
    allowedSubjects: new Set(["alpha-sub"]),
    subjectEmails: new Map([["alpha-sub", "alphatest1@oxygenai.top"]]),
    releases: fixture,
  };
  const gate = createDownloadGate({ config, now: () => now });
  const gatePort = await listen(gate);
  const base = `http://127.0.0.1:${gatePort}`;

  try {
    const start = await fetch(`${base}/download/api/auth/start`, {
      redirect: "manual",
    });
    assert.equal(start.status, 303);
    const location = new URL(start.headers.get("location"));
    const flowCookie = start.headers.get("set-cookie").split(";")[0];
    const state = location.searchParams.get("state");
    const callback = await fetch(
      `${base}/download/api/auth/callback?code=test&state=${encodeURIComponent(state)}`,
      {
        redirect: "manual",
        headers: { cookie: flowCookie },
      },
    );
    assert.equal(callback.status, 303);
    const sessionCookie = callback.headers
      .getSetCookie()
      .find((value) => value.startsWith("prima_download_session="))
      .split(";")[0];
    const status = await fetch(`${base}/download/api/status`, {
      headers: { cookie: sessionCookie },
    }).then((response) => response.json());
    assert.equal(status.authorized, true);
    assert.equal(status.account.email, "alphatest1@oxygenai.top");
    assert.equal(status.releases.length, fixture.length);

    const download = await fetch(`${base}/download/api/files/windows`, {
      headers: { cookie: sessionCookie, range: "bytes=0-3" },
    });
    assert.equal(download.status, 206);
    assert.equal(await download.text(), "down");
  } finally {
    await close(gate);
    await close(account);
  }
});

test("closed gate does not start a login flow", async () => {
  const config = {
    openAt: Date.parse("2026-11-22T20:45:00+08:00"),
    publicUrl: "http://127.0.0.1:1",
    issuer: "http://127.0.0.1:2",
    clientId: "oa_test",
    scopes: "openid profile email",
    sessionSecret: "s".repeat(48),
    cookieDomain: "",
    secureCookies: false,
    fileRoot: tmpdir(),
    staticDir: "",
    allowedSubjects: new Set(["alpha-sub"]),
    subjectEmails: new Map([["alpha-sub", "alphatest1@oxygenai.top"]]),
    releases: [],
  };
  const gate = createDownloadGate({
    config,
    now: () => Date.parse("2026-11-22T20:44:59+08:00"),
  });
  const port = await listen(gate);
  try {
    const response = await fetch(
      `http://127.0.0.1:${port}/download/api/auth/start`,
      { redirect: "manual" },
    );
    assert.equal(response.status, 303);
    assert.match(response.headers.get("location"), /auth_error=not_open/);
  } finally {
    await close(gate);
  }
});
