import { useEffect, useState } from "react";
import { siteConfig } from "../config";
import logoImage from "../../assets/images/logo.png";
import { useI18n } from "../i18n";

type PageId =
  | "home"
  | "beta"
  | "about"
  | "how-it-works"
  | "scenarios"
  | "roadmap"
  | "pricing"
  | "model-list"
  | "faq"
  | "security"
  | "download";

function Announce() {
  const { locale, t } = useI18n();
  const copy = {
    zh: "Prima Beta 调研进行中，约 5 分钟 →",
    en: "Prima Beta research is open; about 5 minutes →",
  };

  return (
    <div className="announce">
      <a href={siteConfig.surveyUrl} target="_blank" rel="noopener noreferrer">
        {locale === "zh" ? copy.zh : copy.en}
      </a>
    </div>
  );
}

const navItems: Array<{ id: PageId; label: string }> = [
  { id: "home", label: "产品理念" },
  { id: "how-it-works", label: "工作方式" },
  { id: "scenarios", label: "使用场景" },
  { id: "roadmap", label: "路线图" },
  { id: "pricing", label: "定价" },
  { id: "model-list", label: "模型列表" },
  { id: "faq", label: "常见问题" },
  { id: "beta", label: "Beta 调研" },
  { id: "about", label: "关于项目" },
];

function navHref(id: PageId, active: PageId): string {
  if (id === "home") return active === "home" ? "#product" : "../#product";
  if (id === active) return "#top";
  return active === "home" ? `./${id}/` : `../${id}/`;
}

export function Header({ active = "home" }: { active?: PageId }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale } = useI18n();
  const navLabels: Record<PageId, { zh: string; en: string }> = {
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
      <header className={menuOpen ? "site-header menu-open" : "site-header"} id="top">
        <div className="container header-inner">
          <a className="brand" href={active === "beta" ? "../" : "#top"} aria-label={locale === "zh" ? `${siteConfig.brandShortName} 首页` : `${siteConfig.brandShortName} home`}>
            <img className="brand-mark" src={logoImage} alt="" width={30} height={30} />
            <span>{siteConfig.brandShortName}</span>
          </a>
          <nav className="site-nav" aria-label={locale === "zh" ? "主导航" : "Main navigation"}>
            {navItems.map((item) => (
              <a key={item.id} href={navHref(item.id, active)}>{navLabels[item.id][locale]}</a>
            ))}
          </nav>
          <a
            className="button primary compact header-cta"
            href={active === "beta" ? siteConfig.surveyUrl : "./beta/"}
            target={active === "beta" ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            {locale === "zh" ? "立即参与调研" : "Join research"}
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? (locale === "zh" ? "关闭菜单" : "Close menu") : (locale === "zh" ? "打开菜单" : "Open menu")}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
          </button>
        </div>
        <div className={menuOpen ? "mobile-menu open" : "mobile-menu"} id="mobile-menu">
          <nav className="container mobile-menu-nav" aria-label={locale === "zh" ? "移动端导航" : "Mobile navigation"}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={navHref(item.id, active)}
                aria-current={item.id === active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {navLabels[item.id][locale]}
              </a>
            ))}
            <a
              className="button primary mobile-menu-cta"
              href={active === "beta" ? siteConfig.surveyUrl : "./beta/"}
              onClick={() => setMenuOpen(false)}
            >
              {locale === "zh" ? "立即参与调研" : "Join research"}
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

export function Footer({ active = "home" }: { active?: PageId }) {
  const { locale, t } = useI18n();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">
            <img className="footer-logo" src={logoImage} alt="" width={28} height={28} />
            {siteConfig.brandShortName}
          </p>
          <p>{locale === "zh" ? "面向真实长任务的 AI Agent，现在处于早期共创阶段。" : "An AI Agent for real long tasks, currently in early co-creation."}</p>
          <p className="footer-slogan">{t("prima.slogan")}</p>
        </div>
        <nav aria-label={locale === "zh" ? "项目导航" : "Project navigation"}>
          {active === "home" ? <a href="./about/">{locale === "zh" ? "关于项目" : "About"}</a> : <a href="../">{locale === "zh" ? "返回首页" : "Back home"}</a>}
          <a href={active === "home" ? "#capabilities" : "../#capabilities"}>{locale === "zh" ? "核心能力" : "Capabilities"}</a>
          <a href={active === "home" ? "./scenarios/" : "../scenarios/"}>{locale === "zh" ? "使用场景" : "Scenarios"}</a>
          <a href={active === "home" ? "./roadmap/" : "../roadmap/"}>{locale === "zh" ? "路线图" : "Roadmap"}</a>
          <a href={active === "home" ? "./pricing/" : "../pricing/"}>{locale === "zh" ? "定价" : "Pricing"}</a>
          <a href={active === "home" ? "./model-list/" : "../model-list/"}>{locale === "zh" ? "模型列表" : "Model list"}</a>
          <a href={active === "home" ? "./security/" : "../security/"}>{locale === "zh" ? "数据边界" : "Data boundaries"}</a>
          <a href={active === "home" ? "./beta/" : "../beta/"}>{locale === "zh" ? "Beta 调研" : "Beta research"}</a>
          <a href={active === "home" ? "./download/" : "../download/"}>{locale === "zh" ? "下载" : "Download"}</a>
        </nav>
        <nav aria-label={locale === "zh" ? "参与入口" : "Participation links"}>
          <a href={siteConfig.oxygenUrl} target="_blank" rel="noopener noreferrer">Oxygen AI</a>
          <a href="https://oxygenai.top/progress/" target="_blank" rel="noopener noreferrer">{locale === "zh" ? "模型研究" : "Model research"}</a>
          <a href={siteConfig.surveyUrl} target="_blank" rel="noopener noreferrer">{locale === "zh" ? "立即参与调研" : "Join research"}</a>
          <a href="mailto:prima@oxygenai.top">prima@oxygenai.top</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2026 Oxygen AI</p>
        <p>{locale === "zh" ? "产品仍在打磨，能力描述不代表已经可用；反馈仅用于产品研究与 Beta 招募。" : "The product is still being refined; descriptions do not imply availability. Feedback is used only for product research and Beta recruitment."}</p>
      </div>
    </footer>
  );
}
