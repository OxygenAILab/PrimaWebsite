import { useEffect, useMemo, useRef, useState } from "react";
import SplitTitle from "./SplitTitle";
import { siteConfig } from "../config";
import { useI18n } from "../i18n";

type Release = {
  id: string;
  platform: "windows" | "linux" | "android";
  format: string;
  filename: string;
  bytes: number;
  sha256: string;
  available: boolean;
  download_path: string;
};

type GateStatus = {
  open: boolean;
  open_at: string;
  server_time: string;
  signed_in: boolean;
  authorized: boolean;
  account: { email: string; name: string } | null;
  login_path: string | null;
  releases: Release[];
};

const AUTH_ERRORS: Record<string, { zh: string; en: string }> = {
  not_open: {
    zh: "下载入口尚未到开放时间。",
    en: "Downloads have not opened yet.",
  },
  not_eligible: {
    zh: "此 OxygenAccount 不在本轮 Alpha Test 名单中。",
    en: "This OxygenAccount is not on the Alpha Test list.",
  },
  sign_in_failed: {
    zh: "登录未完成，请重新尝试。",
    en: "Sign-in did not complete. Please try again.",
  },
  service_unavailable: {
    zh: "账号服务暂时不可用，请稍后重试。",
    en: "The account service is temporarily unavailable.",
  },
};

function bytesLabel(bytes: number) {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${Math.ceil(bytes / 1024)} KB`;
}

function platformName(platform: Release["platform"]) {
  if (platform === "windows") return "Windows";
  if (platform === "android") return "Android";
  return "Linux";
}

function countdownParts(milliseconds: number) {
  const total = Math.max(0, Math.floor(milliseconds / 1000));
  return {
    hours: String(Math.floor(total / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((total % 3600) / 60)).padStart(2, "0"),
    seconds: String(total % 60).padStart(2, "0"),
  };
}

// Git Hub@OxygenAI Lab | OxygenAILab@Starsai lsClover
export default function Download() {
  const { locale, pick } = useI18n();
  const [status, setStatus] = useState<GateStatus | null>(null);
  const [error, setError] = useState("");
  const [clock, setClock] = useState(() => Date.now());
  const [refreshing, setRefreshing] = useState(false);
  const offsetRef = useRef(0);
  const lastOpeningSync = useRef(0);

  const authError = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("auth_error") ?? "";
  }, []);

  const loadStatus = async () => {
    setRefreshing(true);
    try {
      const response = await fetch("/download/api/status", {
        cache: "no-store",
        credentials: "same-origin",
      });
      if (!response.ok) throw new Error(`status ${response.status}`);
      const next = (await response.json()) as GateStatus;
      offsetRef.current = Date.parse(next.server_time) - Date.now();
      setStatus(next);
      setClock(Date.now() + offsetRef.current);
      setError("");
    } catch {
      setError(
        pick({
          zh: "暂时无法确认下载状态，请检查网络后重试。",
          en: "The download status could not be confirmed. Check the connection and retry.",
        }),
      );
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void loadStatus();
    const refresh = window.setInterval(() => void loadStatus(), 20_000);
    return () => window.clearInterval(refresh);
  }, []);

  useEffect(() => {
    const tick = window.setInterval(
      () => setClock(Date.now() + offsetRef.current),
      1000,
    );
    return () => window.clearInterval(tick);
  }, []);

  const openAt = status ? Date.parse(status.open_at) : Number.POSITIVE_INFINITY;
  const countdownMs = openAt - clock;
  const open = Boolean(status?.open || (status && countdownMs <= 0));
  const countdown = countdownParts(countdownMs);

  useEffect(() => {
    if (
      !status ||
      status.open ||
      countdownMs > 0 ||
      Date.now() - lastOpeningSync.current < 3000
    ) {
      return;
    }
    lastOpeningSync.current = Date.now();
    void loadStatus();
  }, [countdownMs, status]);

  const releases = status?.authorized ? status.releases : [];
  const orderedReleases = ["windows", "linux", "android"].flatMap((platform) =>
    releases.filter((release) => release.platform === platform),
  );
  const localizedAuthError = authError
    ? AUTH_ERRORS[authError] ?? {
        zh: "登录未完成，请重试。",
        en: "Sign-in did not complete. Please retry.",
      }
    : null;

  return (
    <main id="main" className="about-page download-page">
      <section className="container about-hero download-hero" aria-labelledby="download-page-title">
        <div className="download-hero-copy">
          <p className="eyebrow">Prima Alpha Test</p>
          <SplitTitle
            id="download-page-title"
            lead={{
              zh: status?.authorized ? "你的内测构建" : "内测下载",
              en: status?.authorized ? "Your alpha build" : "Alpha downloads",
            }}
            stress={
              status?.authorized
                ? { zh: "已经准备好。", en: "are ready." }
                : open
                  ? { zh: "使用 OxygenAccount 验证资格。", en: "Verify with OxygenAccount." }
                  : {
                      zh: `将于${siteConfig.alphaOpenLabel.zh} 开放。`,
                      en: `opens ${siteConfig.alphaOpenLabel.en}.`,
                    }
            }
          />
          <p className="lead">
            {pick({
              zh: "本轮仅向 AlphaTest1@oxygenai.top 至 AlphaTest7@oxygenai.top 开放。登录后只能看到与当前账号资格匹配的安装包。",
              en: "This round is limited to AlphaTest1@oxygenai.top through AlphaTest7@oxygenai.top. After sign-in, only packages available to the signed-in account are shown.",
            })}
          </p>
        </div>

        <aside className="download-gate-panel" aria-live="polite">
          <div className="download-gate-head">
            <span className={`tag ${open ? "mint" : "outline"}`}>
              {open
                ? pick({ zh: "已开放", en: "Open" })
                : pick({ zh: "待开放", en: "Scheduled" })}
            </span>
            <span className="download-gate-time">
              {new Intl.DateTimeFormat(pick({ zh: "zh-CN", en: "en-GB" }), {
                dateStyle: "medium",
                timeStyle: "short",
                timeZone: "Asia/Shanghai",
              }).format(new Date(status?.open_at ?? siteConfig.alphaOpenAt))}
              {" · UTC+8"}
            </span>
          </div>

          {!status && !error ? (
            <div className="download-gate-loading" aria-label={pick({ zh: "正在读取状态", en: "Loading status" })}>
              <span />
              <span />
              <span />
            </div>
          ) : error ? (
            <div className="download-gate-message">
              <p>{error}</p>
              <button className="button ghost" type="button" onClick={() => void loadStatus()} disabled={refreshing}>
                {pick({ zh: "重新检查", en: "Check again" })}
              </button>
            </div>
          ) : !open ? (
            <div className="download-countdown" aria-label={pick({ zh: "距离开放时间", en: "Time until open" })}>
              <span><strong>{countdown.hours}</strong>{pick({ zh: "时", en: "h" })}</span>
              <i aria-hidden="true">:</i>
              <span><strong>{countdown.minutes}</strong>{pick({ zh: "分", en: "m" })}</span>
              <i aria-hidden="true">:</i>
              <span><strong>{countdown.seconds}</strong>{pick({ zh: "秒", en: "s" })}</span>
            </div>
          ) : status?.authorized && status.account ? (
            <div className="download-account">
              <div>
                <p className="download-account-label">{pick({ zh: "资格已验证", en: "Access verified" })}</p>
                <strong>{status.account.email}</strong>
              </div>
              <form action="/download/api/auth/logout" method="post">
                <button className="button ghost compact" type="submit">
                  {pick({ zh: "退出登录", en: "Sign out" })}
                </button>
              </form>
            </div>
          ) : status?.signed_in ? (
            <div className="download-gate-message">
              <p>
                {pick({
                  zh: "当前账号不在本轮 Alpha Test 名单中。请退出后使用获邀账号登录。",
                  en: "This account is not on the Alpha Test list. Sign out and use an invited account.",
                })}
              </p>
              <form action="/download/api/auth/logout" method="post">
                <button className="button ghost compact" type="submit">
                  {pick({ zh: "切换账号", en: "Switch account" })}
                </button>
              </form>
            </div>
          ) : (
            <div className="download-signin">
              <p>
                {pick({
                  zh: "使用获邀的 OxygenAccount 登录，下载链接只会在验证通过后出现。",
                  en: "Sign in with an invited OxygenAccount. Download links appear only after eligibility is verified.",
                })}
              </p>
              <a className="button primary" href={status?.login_path ?? "/download/api/auth/start"}>
                {pick({ zh: "使用 OxygenAccount 登录", en: "Sign in with OxygenAccount" })}
              </a>
            </div>
          )}

          {localizedAuthError ? (
            <p className="download-auth-error" role="alert">
              {localizedAuthError[locale]}
            </p>
          ) : null}
        </aside>
      </section>

      <section className="container about-section download-files" aria-labelledby="download-files-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">{pick({ zh: "可用构建", en: "Available builds" })}</p>
            <h2 id="download-files-title">
              {status?.authorized
                ? pick({ zh: "选择你的平台。", en: "Choose your platform." })
                : open
                  ? pick({ zh: "登录后显示安装包。", en: "Sign in to reveal packages." })
                  : pick({ zh: "开放后显示安装包。", en: "Packages appear when downloads open." })}
            </h2>
            <p className="section-copy">
              {pick({
                zh: "所有文件都由 Prima 下载网关校验会话后提供，不提供公开直链。安装前请核对 SHA-256。",
                en: "Every file is served through the Prima download gate after session validation. There are no public direct links. Verify SHA-256 before installing.",
              })}
            </p>
          </div>
        </div>

        {status?.authorized ? (
          <div className="download-grid">
            {orderedReleases.map((release) => (
              <article className="download-item" key={release.id}>
                <div className="download-item-head">
                  <div>
                    <p className="download-platform">{platformName(release.platform)}</p>
                    <h3>{release.format}</h3>
                  </div>
                  <span className="tag outline">Alpha</span>
                </div>
                <p className="download-filename">{release.filename}</p>
                <dl className="download-specs">
                  <div><dt>{pick({ zh: "大小", en: "Size" })}</dt><dd>{bytesLabel(release.bytes)}</dd></div>
                  <div><dt>SHA-256</dt><dd title={release.sha256}>{release.sha256.slice(0, 16)}…</dd></div>
                </dl>
                {release.available ? (
                  <a className="button primary download-button" href={release.download_path}>
                    {pick({ zh: "下载安装包", en: "Download installer" })}
                  </a>
                ) : (
                  <button className="button ghost download-button" type="button" disabled>
                    {pick({ zh: "构建正在同步", en: "Build is syncing" })}
                  </button>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="download-preview" aria-hidden="true">
            <span>Windows · EXE</span>
            <span>Linux · AppImage / DEB</span>
            <span>Android · APK</span>
          </div>
        )}
      </section>
    </main>
  );
}
