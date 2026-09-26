import { useEffect, useState } from "react";
import { siteConfig } from "../config";
import logoImage from "../../assets/images/logo.png";
import { useI18n } from "../i18n";
import type { Localized } from "../data/content";
import type { PrimaPage } from "../PageApp";

const navItems: PrimaPage[] = [
  "home",
  "how-it-works",
  "scenarios",
  "roadmap",
  "pricing",
  "model-list",
  "faq",
  "beta",
  "about",
];

const navLabels: Record<PrimaPage, Localized> = {
  home: { zh: "产品理念", en: "Product" },
  beta: { zh: "Beta 调研", en: "Beta research" },
  about: { zh: "关于项目", en: "About" },
  "how-it-works": { zh: "工作方式", en: "How it works" },
  scenarios: { zh: "使用场景", en: "Scenarios" },
  roadmap: { zh: "路线图", en: "Roadmap" },
  pricing: { zh: "定价", en: "Pricing" },
  "model-list": { zh: "模型列表", en: "Model list" },
  faq: { zh: "常见问题", en: "FAQ" },
  security: { zh: "数据边界", en: "Data boundaries" },
  download: { zh: "下载", en: "Download" },
};

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
  if (id === "home") return active === "home" ? "#product" : "../#product";
  if (id === active) return "#top";
  return active === "home" ? `./${id}/` : `../${id}/`;
}

/* 页脚链接：首页用 ./x/，子页用 ../x/ */
function fromPage(active: PrimaPage, path: string): string {
  return `${active === "home" ? "./" : "../"}${path}`;
}

export function Header({ active = "home" }: { active?: PrimaPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, pick } = useI18n();

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
            {navItems.map((id) => (
              <a key={id} href={navHref(id, active)}>{navLabels[id][locale]}</a>
            ))}
          </nav>
          <a
            className="button primary compact header-cta"
            href={active === "beta" ? siteConfig.surveyUrl : "./beta/"}
            target={active === "beta" ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            {pick({ zh: "立即参与调研", en: "Join research" })}
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
            {navItems.map((id) => (
              <a
                key={id}
                href={navHref(id, active)}
                aria-current={id === active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {navLabels[id][locale]}
              </a>
            ))}
            <a
              className="button primary mobile-menu-cta"
              href={active === "beta" ? siteConfig.surveyUrl : "./beta/"}
              onClick={() => setMenuOpen(false)}
            >
              {pick({ zh: "立即参与调研", en: "Join research" })}
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

const footerPages: Array<{ path: string; label: Localized }> = [
  { path: "scenarios/", label: { zh: "使用场景", en: "Scenarios" } },
  { path: "roadmap/", label: { zh: "路线图", en: "Roadmap" } },
  { path: "pricing/", label: { zh: "定价", en: "Pricing" } },
  { path: "model-list/", label: { zh: "模型列表", en: "Model list" } },
  { path: "security/", label: { zh: "数据边界", en: "Data boundaries" } },
  { path: "beta/", label: { zh: "Beta 调研", en: "Beta research" } },
  { path: "download/", label: { zh: "下载", en: "Download" } },
];

export function Footer({ active = "home" }: { active?: PrimaPage }) {
  const { locale, t, pick } = useI18n();

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
          <a href={siteConfig.surveyUrl} target="_blank" rel="noopener noreferrer">{pick({ zh: "立即参与调研", en: "Join research" })}</a>
          <a href="mailto:prima@oxygenai.top">prima@oxygenai.top</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2026 Oxygen AI</p>
        <p>{pick({ zh: "产品仍在打磨，能力描述不代表已经可用；反馈仅用于产品研究与 Beta 招募。", en: "The product is still being refined; descriptions do not imply availability. Feedback is used only for product research and Beta recruitment." })}</p>
      </div>
    </footer>
  );
}
