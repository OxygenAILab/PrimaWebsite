import { useEffect, useState } from "react";
import { siteConfig } from "../config";
import logoImage from "../../assets/images/logo.png";
import { useI18n } from "../i18n";
import type { Localized } from "../data/content";
import type { PrimaPage } from "../PageApp";

type NavEntry = { page: PrimaPage; label: Localized; children?: Array<{ page: PrimaPage; label: Localized }> };

/* 顶栏只留六个入口；三个研究页收进「产品研究」下拉 */
const navEntries: NavEntry[] = [
  { page: "home", label: { zh: "首页", en: "Home" } },
  {
    page: "how-it-works",
    label: { zh: "产品研究", en: "Research" },
    children: [
      { page: "how-it-works", label: { zh: "工作方式", en: "How it works" } },
      { page: "scenarios", label: { zh: "使用场景", en: "Scenarios" } },
      { page: "roadmap", label: { zh: "路线图", en: "Roadmap" } },
    ],
  },
  { page: "pricing", label: { zh: "定价", en: "Pricing" } },
  { page: "model-list", label: { zh: "模型列表", en: "Model list" } },
  { page: "about", label: { zh: "关于项目", en: "About" } },
  { page: "beta", label: { zh: "Beta 调研", en: "Beta research" } },
];

function Announce() {
  const { t } = useI18n();

  return (
    <div className="announce">
      <a href={siteConfig.surveyUrl} target="_blank" rel="noopener noreferrer">
        {t("announce.beta")}
      </a>
    </div>
  );
}

function navHref(id: PrimaPage, active: PrimaPage): string {
  if (id === "home") return active === "home" ? "#top" : "../";
  if (id === active) return "#top";
  return active === "home" ? `./${id}/` : `../${id}/`;
}

/* 页脚链接：首页用 ./x/，子页用 ../x/ */
function fromPage(active: PrimaPage, path: string): string {
  return `${active === "home" ? "./" : "../"}${path}`;
}

export function Header({ active = "home" }: { active?: PrimaPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<PrimaPage | null>(null);
  const { locale, pick, t } = useI18n();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!openGroup) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenGroup(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openGroup]);

  return (
    <>
      <Announce />
      <header className="site-header" id="top">
        <div className="container header-inner">
          <a className="brand" href={active === "beta" ? "../" : "#top"} aria-label={pick({ zh: `${siteConfig.brandShortName} 首页`, en: `${siteConfig.brandShortName} home` })}>
            <img className="brand-mark" src={logoImage} alt="" width={30} height={30} />
            <span>{siteConfig.brandShortName}</span>
          </a>
          <nav className="site-nav" aria-label={pick({ zh: "主导航", en: "Main navigation" })}>
            {navEntries.map((entry) => {
              if (!entry.children) {
                return (
                  <a key={entry.page} href={navHref(entry.page, active)} aria-current={entry.page === active ? "page" : undefined}>
                    {entry.label[locale]}
                  </a>
                );
              }
              const inGroup = entry.children.some((child) => child.page === active);
              const opened = openGroup === entry.page;
              return (
                <div
                  className={inGroup ? "nav-group is-current" : "nav-group"}
                  key={entry.page}
                  onMouseEnter={() => setOpenGroup(entry.page)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    type="button"
                    aria-expanded={opened}
                    aria-haspopup="true"
                    onClick={() => setOpenGroup(opened ? null : entry.page)}
                  >
                    {entry.label[locale]}
                    <span className="nav-caret" aria-hidden="true" />
                  </button>
                  <div className="nav-panel">
                    <div className="nav-card">
                      {entry.children.map((child) => (
                        <a
                          key={child.page}
                          href={navHref(child.page, active)}
                          aria-current={child.page === active ? "page" : undefined}
                          onClick={() => setOpenGroup(null)}
                        >
                          {child.label[locale]}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
          <a
            className="button primary compact header-cta"
            href={active === "beta" ? siteConfig.surveyUrl : "./beta/"}
            target={active === "beta" ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            {t("cta.joinBeta")}
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? (pick({ zh: "关闭菜单", en: "Close menu" })) : (pick({ zh: "打开菜单", en: "Open menu" }))}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
          </button>
        </div>
        <div className={menuOpen ? "mobile-menu open" : "mobile-menu"} id="mobile-menu">
          <nav className="container mobile-menu-nav" aria-label={pick({ zh: "移动端导航", en: "Mobile navigation" })}>
            {navEntries.map((entry) =>
              entry.children ? (
                <div className="mobile-menu-group" key={entry.page}>
                  <p className="mobile-menu-heading">{entry.label[locale]}</p>
                  {entry.children.map((child) => (
                    <a
                      key={child.page}
                      href={navHref(child.page, active)}
                      aria-current={child.page === active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {child.label[locale]}
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  key={entry.page}
                  href={navHref(entry.page, active)}
                  aria-current={entry.page === active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {entry.label[locale]}
                </a>
              ),
            )}
            <a
              className="button primary mobile-menu-cta"
              href={active === "beta" ? siteConfig.surveyUrl : "./beta/"}
              onClick={() => setMenuOpen(false)}
            >
              {t("cta.joinBeta")}
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

const footerPages: Array<{ path: string; label: Localized }> = [
  { path: "how-it-works/", label: { zh: "工作方式", en: "How it works" } },
  { path: "scenarios/", label: { zh: "使用场景", en: "Scenarios" } },
  { path: "roadmap/", label: { zh: "路线图", en: "Roadmap" } },
  { path: "pricing/", label: { zh: "定价", en: "Pricing" } },
  { path: "model-list/", label: { zh: "模型列表", en: "Model list" } },
  { path: "security/", label: { zh: "数据边界", en: "Data boundaries" } },
  { path: "beta/", label: { zh: "Beta 调研", en: "Beta research" } },
  { path: "download/", label: { zh: "下载", en: "Download" } },
];

export function Footer({ active = "home" }: { active?: PrimaPage }) {
  const { locale, pick, t } = useI18n();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">
            <img className="footer-logo" src={logoImage} alt="" width={28} height={28} />
            {siteConfig.brandShortName}
          </p>
          <p>{pick({ zh: "面向真实长任务的 AI Agent，现在处于早期共创阶段。", en: "An AI Agent for real long tasks, currently in early co-creation." })}</p>
          <p className="footer-slogan">{t("prima.slogan")}</p>
        </div>
        <nav aria-label={pick({ zh: "项目导航", en: "Project navigation" })}>
          {active === "home" ? <a href="./about/">{pick({ zh: "关于项目", en: "About" })}</a> : <a href="../">{pick({ zh: "返回首页", en: "Back home" })}</a>}
          <a href={active === "home" ? "#capabilities" : "../#capabilities"}>{pick({ zh: "核心能力", en: "Capabilities" })}</a>
          {footerPages.map((item) => (
            <a key={item.path} href={fromPage(active, item.path)}>
              {item.label[locale]}
            </a>
          ))}
        </nav>
        <nav aria-label={pick({ zh: "参与入口", en: "Participation links" })}>
          <a href={siteConfig.oxygenUrl} target="_blank" rel="noopener noreferrer">Oxygen AI</a>
          <a href="https://oxygenai.top/progress/" target="_blank" rel="noopener noreferrer">{pick({ zh: "模型研究", en: "Model research" })}</a>
          <a href={siteConfig.surveyUrl} target="_blank" rel="noopener noreferrer">{t("cta.joinBeta")}</a>
          <a href="mailto:prima@oxygenai.top">prima@oxygenai.top</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2026 Oxygen AI</p>
        <p>{pick({ zh: "产品仍在打磨，能力描述不代表已经可用；反馈仅用于产品研究与 Beta 招募。", en: "The product is still being refined; descriptions do not imply availability. Feedback is used only for product research and Beta recruitment." })}</p>
        <nav className="footer-legal" aria-label={pick({ zh: "法务与页脚工具", en: "Legal and footer tools" })}>
          <a href={fromPage(active, "privacy/")}>{pick({ zh: "隐私", en: "Privacy" })}</a>
          <a href={fromPage(active, "terms/")}>{pick({ zh: "条款", en: "Terms" })}</a>
          {/* 用锚点而不是 JS：html 已有 scroll-behavior，减弱动效时自动变成立刻到顶 */}
          <a className="back-to-top" href="#top" aria-label={pick({ zh: "返回顶部", en: "Back to top" })}>&uarr;</a>
        </nav>
      </div>
    </footer>
  );
}
