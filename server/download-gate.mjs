import {
  createHash,
  createHmac,
  createPublicKey,
  randomBytes,
  timingSafeEqual,
  verify as verifySignature,
} from "node:crypto";
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ACCOUNT_API_VERSION = "2";
const SESSION_COOKIE = "prima_download_session";
const FLOW_COOKIE = "prima_download_flow";
const SESSION_TTL_SECONDS = 60 * 60;
const FLOW_TTL_SECONDS = 10 * 60;
const DEFAULT_OPEN_AT = "2026-11-22T20:45:00+08:00";
const DEFAULT_ALPHA_ACCOUNTS = [
  ["01ae2e62-92c8-42c5-a09b-1aabfe5b5d8a", "alphatest1@oxygenai.top"],
  ["c2853c9c-844c-4a9e-9e10-3e8fde9003ba", "alphatest2@oxygenai.top"],
  ["1b0344b7-c9f8-494c-8deb-c8c296654d23", "alphatest3@oxygenai.top"],
  ["e247dfbf-b3af-4793-84cf-20a6cb2aafa7", "alphatest4@oxygenai.top"],
  ["7fec388d-5fbb-4380-bfe7-6ef9428074ba", "alphatest5@oxygenai.top"],
  ["64a1b2d0-9d45-47ad-a9f1-f14e2c000278", "alphatest6@oxygenai.top"],
  ["70d0f02d-b58b-4d26-b934-3db5fd2cab72", "alphatest7@oxygenai.top"],
];

//G itH ub @Oxyge nAILab | OxygenA ILab@Starsai lsClover
export const RELEASES = [
  {
    id: "windows",
    platform: "windows",
    format: "EXE",
    filename: "PrimaApp-Setup-0.1.0.exe",
    bytes: 1_652_900_808,
    sha256: "c78eaef4c3c535d6edaef931256b84ae9554a9e39e95b59dfbeee11e49986618",
    contentType: "application/vnd.microsoft.portable-executable",
  },
  {
    id: "linux-appimage",
    platform: "linux",
    format: "AppImage",
    filename: "PrimaApp-0.1.0.AppImage",
    bytes: 555_615_541,
    sha256: "c40129709a487aa1d11beda8374d926f36b177f2dc870076ef10f97e4f6cc090",
    contentType: "application/octet-stream",
  },
  {
    id: "linux-deb",
    platform: "linux",
    format: "DEB",
    filename: "primaapp_0.1.0_amd64.deb",
    bytes: 469_462_332,
    sha256: "7c8dd4ceb510a068547607f3f2c23dc9450d33a5550c8f79ca289e6c5b8059e1",
    contentType: "application/vnd.debian.binary-package",
  },
  {
    id: "android",
    platform: "android",
    format: "APK",
    filename: "primaapp-0.1.0-release.apk",
    bytes: 4_714_041,
    sha256: "26a0db31e785791d1ce9802e541495011f57de26d8090ca3521b5648b93cd730",
    contentType: "application/vnd.android.package-archive",
  },
];

const STATIC_TYPES = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
]);

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function sha256(value) {
  return createHash("sha256").update(value).digest();
}

export function normalizeEmail(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function isOpenAt(openAt, now) {
  return now >= openAt;
}

export function parseRange(value, size) {
  if (!value) return null;
  const match = /^bytes=(\d*)-(\d*)$/.exec(value.trim());
  if (!match) return false;
  const [, rawStart, rawEnd] = match;
  if (rawStart === "" && rawEnd === "") return false;

  let start;
  let end;
  if (rawStart === "") {
    const suffix = Number(rawEnd);
    if (!Number.isSafeInteger(suffix) || suffix <= 0) return false;
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(rawStart);
    end = rawEnd === "" ? size - 1 : Number(rawEnd);
  }
  if (
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(end) ||
    start < 0 ||
    end < start ||
    start >= size
  ) {
    return false;
  }
  return { start, end: Math.min(end, size - 1) };
}

function cookieValue(header, name) {
  for (const part of String(header ?? "").split(";")) {
    const index = part.indexOf("=");
    if (index < 0) continue;
    if (part.slice(0, index).trim() === name) {
      return part.slice(index + 1).trim();
    }
  }
  return "";
}

export function signPayload(payload, secret) {
  const body = base64url(JSON.stringify(payload));
  const signature = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${signature}`;
}

export function verifyPayload(token, secret, now = Date.now()) {
  const [body, signature, extra] = String(token ?? "").split(".");
  if (!body || !signature || extra) return null;
  const expected = createHmac("sha256", secret).update(body).digest();
  let actual;
  try {
    actual = Buffer.from(signature, "base64url");
  } catch {
    return null;
  }
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload || typeof payload !== "object") return null;
    if (!Number.isFinite(payload.exp) || payload.exp <= now) return null;
    return payload;
  } catch {
    return null;
  }
}

function cookie(name, value, options = {}) {
  const pieces = [`${name}=${value}`, `Path=${options.path ?? "/"}`];
  if (options.domain) pieces.push(`Domain=${options.domain}`);
  if (options.maxAge !== undefined) pieces.push(`Max-Age=${options.maxAge}`);
  pieces.push("HttpOnly", "SameSite=Lax");
  if (options.secure) pieces.push("Secure");
  return pieces.join("; ");
}

function redirect(response, location, headers = {}) {
  response.writeHead(303, {
    Location: location,
    "Cache-Control": "no-store",
    "Referrer-Policy": "no-referrer",
    ...headers,
  });
  response.end();
}

function json(response, status, body, headers = {}) {
  const bytes = Buffer.from(JSON.stringify(body));
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": bytes.length,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    ...headers,
  });
  response.end(bytes);
}

function parsePublicUrl(value) {
  const url = new URL(value);
  url.pathname = url.pathname.replace(/\/+$/, "");
  url.search = "";
  url.hash = "";
  return url.toString().replace(/\/+$/, "");
}

export function configFromEnv(env = process.env) {
  const openAtText = env.PRIMA_DOWNLOAD_OPEN_AT ?? DEFAULT_OPEN_AT;
  const openAt = Date.parse(openAtText);
  if (!Number.isFinite(openAt)) {
    throw new Error("PRIMA_DOWNLOAD_OPEN_AT must be an ISO date-time");
  }
  const publicUrl = parsePublicUrl(
    env.PRIMA_DOWNLOAD_PUBLIC_URL ?? "https://prima.oxygenai.top",
  );
  const clientId = String(env.PRIMA_DOWNLOAD_OIDC_CLIENT_ID ?? "").trim();
  if (!clientId) throw new Error("PRIMA_DOWNLOAD_OIDC_CLIENT_ID is required");
  const sessionSecret = String(env.PRIMA_DOWNLOAD_SESSION_SECRET ?? "").trim();
  if (sessionSecret.length < 32) {
    throw new Error("PRIMA_DOWNLOAD_SESSION_SECRET must be at least 32 characters");
  }
  const subjectPairs = String(
    env.PRIMA_DOWNLOAD_SUBJECT_MAP ??
      DEFAULT_ALPHA_ACCOUNTS.map(([subject, email]) => `${subject}=${email}`).join(","),
  )
    .split(",")
    .map((pair) => pair.trim().split("="))
    .filter(([subject, email]) => subject && email)
    .map(([subject, email]) => [subject.trim(), normalizeEmail(email)]);
  const subjectEmails = new Map(subjectPairs);
  return {
    openAt,
    publicUrl,
    issuer: parsePublicUrl(
      env.PRIMA_DOWNLOAD_OIDC_ISSUER ?? "https://account.oxygenai.top",
    ),
    clientId,
    scopes: String(
      env.PRIMA_DOWNLOAD_OIDC_SCOPES ?? "openid profile email",
    ).trim(),
    sessionSecret,
    cookieDomain: String(env.PRIMA_DOWNLOAD_COOKIE_DOMAIN ?? "").trim(),
    secureCookies:
      String(env.PRIMA_DOWNLOAD_SECURE_COOKIES ?? "true").toLowerCase() !== "false",
    fileRoot: resolve(
      env.PRIMA_DOWNLOAD_FILE_ROOT ??
        "/opt/1panel/www/sites/lab.oxygenai.top/index/releases",
    ),
    staticDir: env.PRIMA_DOWNLOAD_STATIC_DIR
      ? resolve(env.PRIMA_DOWNLOAD_STATIC_DIR)
      : "",
    allowedSubjects: new Set(subjectEmails.keys()),
    subjectEmails,
  };
}

function releaseView(release, config) {
  const filePath = join(config.fileRoot, release.filename);
  let available = existsSync(filePath);
  if (available) {
    try {
      available = statSync(filePath).size === release.bytes;
    } catch {
      available = false;
    }
  }
  return {
    id: release.id,
    platform: release.platform,
    format: release.format,
    filename: release.filename,
    bytes: release.bytes,
    sha256: release.sha256,
    available,
    download_path: `/download/api/files/${release.id}`,
  };
}

function sessionFromRequest(request, config, now) {
  const token = cookieValue(request.headers.cookie, SESSION_COOKIE);
  const payload = verifyPayload(token, config.sessionSecret, now);
  if (!payload) return null;
  const subject = String(payload.sub ?? "");
  const email = config.subjectEmails.get(subject);
  if (!subject || !email || !config.allowedSubjects.has(subject)) return null;
  return { ...payload, sub: subject, email };
}

function flowFromRequest(request, config, now) {
  const token = cookieValue(request.headers.cookie, FLOW_COOKIE);
  return verifyPayload(token, config.sessionSecret, now);
}

function accountHeaders(extra = {}) {
  return {
    "X-OxygenAccount-API-Version": ACCOUNT_API_VERSION,
    ...extra,
  };
}

async function exchangeCode(config, fetchImpl, code, verifier) {
  const response = await fetchImpl(`${config.issuer}/oauth2/token`, {
    method: "POST",
    headers: accountHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    signal: AbortSignal.timeout(15_000),
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: `${config.publicUrl}/download/api/auth/callback`,
      code_verifier: verifier,
      client_id: config.clientId,
    }).toString(),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.access_token || !body.id_token) {
    throw new Error(body.error_description || body.error || "token exchange failed");
  }
  return { accessToken: body.access_token, idToken: body.id_token };
}

async function readUser(config, fetchImpl, accessToken) {
  const response = await fetchImpl(`${config.issuer}/oauth2/userinfo`, {
    headers: accountHeaders({ Authorization: `Bearer ${accessToken}` }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`userinfo answered ${response.status}`);
  const body = await response.json();
  return {
    sub: String(body.sub ?? ""),
    email: normalizeEmail(body.email),
    emailVerified: body.email_verified === true,
    accountType: String(body.account_type ?? ""),
    name: String(body.name ?? body.preferred_username ?? ""),
  };
}

function verifyJwt(token, jwks, config) {
  const parts = String(token).split(".");
  if (parts.length !== 3) throw new Error("id_token is not a JWT");
  const header = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8"));
  if (header.alg !== "RS256") throw new Error("unexpected JWT algorithm");
  const key = jwks.keys.find((candidate) => candidate.kid === header.kid) ?? jwks.keys[0];
  if (!key) throw new Error("JWKS is empty");
  const publicKey = createPublicKey({ key, format: "jwk" });
  const valid = verifySignature(
    "RSA-SHA256",
    Buffer.from(`${parts[0]}.${parts[1]}`),
    publicKey,
    Buffer.from(parts[2], "base64url"),
  );
  if (!valid) throw new Error("id_token signature does not verify");
  const claims = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  if (claims.iss !== config.issuer || claims.aud !== config.clientId) {
    throw new Error("id_token issuer or audience mismatch");
  }
  if (Number.isFinite(claims.exp) && claims.exp * 1000 <= Date.now()) {
    throw new Error("id_token expired");
  }
  return claims;
}

async function readJwks(config, fetchImpl, cache) {
  if (cache.value) return cache.value;
  const response = await fetchImpl(`${config.issuer}/.well-known/jwks.json`, {
    headers: accountHeaders(),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`JWKS answered ${response.status}`);
  const body = await response.json();
  if (!Array.isArray(body.keys)) throw new Error("JWKS is malformed");
  cache.value = body;
  return body;
}

function startLogin(request, response, config, now) {
  if (!isOpenAt(config.openAt, now)) {
    redirect(response, "/download/?auth_error=not_open");
    return;
  }
  if (sessionFromRequest(request, config, now)) {
    redirect(response, "/download/");
    return;
  }

  const state = randomBytes(24).toString("base64url");
  const verifier = randomBytes(48).toString("base64url");
  const expiresAt = now + FLOW_TTL_SECONDS * 1000;
  const flow = signPayload(
    { state, verifier, exp: expiresAt },
    config.sessionSecret,
  );
  const authorize = new URL(`${config.issuer}/oauth2/authorize`);
  authorize.searchParams.set("client_id", config.clientId);
  authorize.searchParams.set(
    "redirect_uri",
    `${config.publicUrl}/download/api/auth/callback`,
  );
  authorize.searchParams.set("response_type", "code");
  authorize.searchParams.set("scope", config.scopes);
  authorize.searchParams.set("state", state);
  authorize.searchParams.set(
    "code_challenge",
    sha256(verifier).toString("base64url"),
  );
  authorize.searchParams.set("code_challenge_method", "S256");
  authorize.searchParams.set("api_version", ACCOUNT_API_VERSION);
  authorize.searchParams.set("prompt", "consent");
  redirect(response, authorize.toString(), {
    "Set-Cookie": cookie(FLOW_COOKIE, flow, {
      path: "/download/api",
      domain: config.cookieDomain,
      maxAge: FLOW_TTL_SECONDS,
      secure: config.secureCookies,
    }),
  });
}

async function finishLogin(request, response, url, config, now, fetchImpl, jwksCache) {
  if (!isOpenAt(config.openAt, now)) {
    redirect(response, "/download/?auth_error=not_open");
    return;
  }
  const state = url.searchParams.get("state") ?? "";
  const flow = flowFromRequest(request, config, now);
  const clearFlow = cookie(FLOW_COOKIE, "", {
    path: "/download/api",
    domain: config.cookieDomain,
    maxAge: 0,
    secure: config.secureCookies,
  });
  if (
    url.searchParams.get("error") ||
    !flow ||
    !state ||
    flow.state !== state ||
    typeof flow.verifier !== "string"
  ) {
    redirect(response, "/download/?auth_error=sign_in_failed", {
      "Set-Cookie": clearFlow,
    });
    return;
  }
  const code = url.searchParams.get("code");
  if (!code) {
    redirect(response, "/download/?auth_error=sign_in_failed", {
      "Set-Cookie": clearFlow,
    });
    return;
  }

  try {
    const tokens = await exchangeCode(
      config,
      fetchImpl,
      code,
      flow.verifier,
    );
    const claims = verifyJwt(
      tokens.idToken,
      await readJwks(config, fetchImpl, jwksCache),
      config,
    );
    const account = await readUser(config, fetchImpl, tokens.accessToken);
    const subject = String(claims.sub || account.sub || "");
    const email = config.subjectEmails.get(subject) ?? "";
    const accountType = String(claims.account_type || account.accountType);
    const emailVerified =
      claims.email_verified === true || account.emailVerified === true;
    if (
      !emailVerified ||
      accountType !== "user" ||
      !subject ||
      !config.allowedSubjects.has(subject)
    ) {
      console.error(
        JSON.stringify({
          level: "warn",
          event: "download_gate_denied",
          subject_present: Boolean(subject),
          email_verified: emailVerified,
          account_type: accountType || "missing",
          allowlisted: config.allowedSubjects.has(subject),
        }),
      );
      redirect(response, "/download/?auth_error=not_eligible", {
        "Set-Cookie": clearFlow,
      });
      return;
    }
    const session = signPayload(
      {
        sub: subject,
        email,
        name: account.name,
        exp: now + SESSION_TTL_SECONDS * 1000,
      },
      config.sessionSecret,
    );
    redirect(response, "/download/?auth=ok", {
      "Set-Cookie": [
        clearFlow,
        cookie(SESSION_COOKIE, session, {
          path: "/",
          domain: config.cookieDomain,
          maxAge: SESSION_TTL_SECONDS,
          secure: config.secureCookies,
        }),
      ],
    });
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        event: "download_gate_oauth_failed",
        message: error instanceof Error ? error.message : String(error),
      }),
    );
    redirect(response, "/download/?auth_error=service_unavailable", {
      "Set-Cookie": clearFlow,
    });
  }
}

function serveRelease(request, response, release, config) {
  const filePath = join(config.fileRoot, release.filename);
  if (!existsSync(filePath)) {
    json(response, 404, { error: "release_not_found" });
    return;
  }
  const stat = statSync(filePath);
  if (stat.size !== release.bytes) {
    json(response, 503, { error: "release_integrity_mismatch" });
    return;
  }
  const range = parseRange(request.headers.range, stat.size);
  if (range === false) {
    response.writeHead(416, {
      "Content-Range": `bytes */${stat.size}`,
      "Cache-Control": "private, no-store",
    });
    response.end();
    return;
  }
  const start = range?.start ?? 0;
  const end = range?.end ?? stat.size - 1;
  const length = end - start + 1;
  const headers = {
    "Content-Type": release.contentType,
    "Content-Length": length,
    "Content-Disposition": `attachment; filename="${release.filename}"`,
    "Accept-Ranges": "bytes",
    "Cache-Control": "private, no-store",
    "Content-Security-Policy": "default-src 'none'",
    "X-Content-Type-Options": "nosniff",
    ETag: `"${release.sha256}"`,
  };
  if (range) headers["Content-Range"] = `bytes ${start}-${end}/${stat.size}`;
  response.writeHead(range ? 206 : 200, headers);
  if (request.method === "HEAD") {
    response.end();
    return;
  }
  const stream = createReadStream(filePath, { start, end });
  stream.on("error", () => response.destroy());
  request.on("aborted", () => stream.destroy());
  stream.pipe(response);
}

function staticPath(root, pathname) {
  let relative;
  try {
    relative = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  const target = resolve(root, `.${relative}`);
  if (target !== root && !target.startsWith(root + sep)) return null;
  return target;
}

function serveStatic(response, config, pathname) {
  if (!config.staticDir) return false;
  let target = staticPath(config.staticDir, pathname);
  if (!target) {
    json(response, 404, { error: "not_found" });
    return true;
  }
  if (pathname.endsWith("/")) target = join(target, "index.html");
  if (!existsSync(target) || !statSync(target).isFile()) {
    json(response, 404, { error: "not_found" });
    return true;
  }
  const stat = statSync(target);
  response.writeHead(200, {
    "Content-Type":
      STATIC_TYPES.get(extname(target).toLowerCase()) ??
      "application/octet-stream",
    "Content-Length": stat.size,
    "Cache-Control": "no-cache",
    "X-Content-Type-Options": "nosniff",
  });
  createReadStream(target).pipe(response);
  return true;
}

export function createDownloadGate(options) {
  const config = options.config;
  const releases = config.releases ?? RELEASES;
  const now = options.now ?? (() => Date.now());
  const fetchImpl = options.fetch ?? fetch;
  const jwksCache = { value: null };

  return createServer(async (request, response) => {
    const observed = now();
    const url = new URL(
      request.url ?? "/",
      `${config.publicUrl.replace(/\/+$/, "")}/`,
    );
    const method = request.method ?? "GET";

    if (url.pathname === "/download/api/healthz" && method === "GET") {
      json(response, 200, {
        ok: true,
        open: isOpenAt(config.openAt, observed),
        releases: releases.length,
      });
      return;
    }

    if (url.pathname === "/download/api/status" && method === "GET") {
      const session = sessionFromRequest(request, config, observed);
      const open = isOpenAt(config.openAt, observed);
      const authorized = Boolean(session && config.allowedSubjects.has(session.sub));
      json(response, 200, {
        open,
        open_at: new Date(config.openAt).toISOString(),
        server_time: new Date(observed).toISOString(),
        signed_in: Boolean(session),
        authorized,
        account: session
          ? { email: session.email, name: session.name ?? "" }
          : null,
        login_path: open && !session ? "/download/api/auth/start" : null,
        releases: authorized
          ? releases.map((release) => releaseView(release, config))
          : [],
      });
      return;
    }

    if (url.pathname === "/download/api/auth/start" && method === "GET") {
      startLogin(request, response, config, observed);
      return;
    }

    if (url.pathname === "/download/api/auth/callback" && method === "GET") {
      await finishLogin(
        request,
        response,
        url,
        config,
        observed,
        fetchImpl,
        jwksCache,
      );
      return;
    }

    if (url.pathname === "/download/api/auth/logout" && method === "POST") {
      redirect(response, "/download/", {
        "Set-Cookie": cookie(SESSION_COOKIE, "", {
          path: "/",
          domain: config.cookieDomain,
          maxAge: 0,
          secure: config.secureCookies,
        }),
      });
      return;
    }

    if (url.pathname === "/download/api/auth/verify" && method === "GET") {
      const session = sessionFromRequest(request, config, observed);
      if (session && isOpenAt(config.openAt, observed)) {
        response.writeHead(204, { "Cache-Control": "no-store" });
        response.end();
      } else {
        response.writeHead(401, { "Cache-Control": "no-store" });
        response.end();
      }
      return;
    }

    const fileMatch = /^\/download\/api\/files\/([a-z0-9-]+)$/.exec(
      url.pathname,
    );
    if (fileMatch && (method === "GET" || method === "HEAD")) {
      const session = sessionFromRequest(request, config, observed);
      if (!session || !isOpenAt(config.openAt, observed)) {
        json(response, 401, { error: "unauthorized" });
        return;
      }
      const release = releases.find((item) => item.id === fileMatch[1]);
      if (!release) {
        json(response, 404, { error: "release_not_found" });
        return;
      }
      serveRelease(request, response, release, config);
      return;
    }

    if (url.pathname.startsWith("/download/api/")) {
      json(response, 404, { error: "not_found" });
      return;
    }

    if ((method === "GET" || method === "HEAD") && serveStatic(response, config, url.pathname)) {
      return;
    }

    json(response, 404, { error: "not_found" });
  });
}

function main() {
  const config = configFromEnv();
  const server = createDownloadGate({ config });
  const port = Number(process.env.PRIMA_DOWNLOAD_PORT ?? "8091");
  const host = process.env.PRIMA_DOWNLOAD_HOST ?? "127.0.0.1";
  server.listen(port, host, () => {
    console.log(
      JSON.stringify({
        level: "info",
        event: "download_gate_ready",
        host,
        port,
        open_at: new Date(config.openAt).toISOString(),
        releases: RELEASES.length,
      }),
    );
  });
}

const entry = process.argv[1] ? resolve(process.argv[1]) : "";
if (entry === fileURLToPath(import.meta.url)) main();
