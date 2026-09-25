import { useEffect, useState } from "react";
import { siteConfig } from "../config";
import logoImage from "../../assets/images/logo.png";

type PageId =
  | "home"
  | "beta"
  | "about"
  | "how-it-works"
  | "scenarios"
  | "roadmap"
  | "pricing"
  | "faq"
  | "security";

function Announce() {
  return (
    <div className="announce">
      <a href={siteConfig.surveyUrl} target="_blank" rel="noopener noreferrer">
        Prima Beta 调研进行中，约 5 分钟 →
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
          <a className="brand" href={active === "beta" ? "../" : "#top"} aria-label={`${siteConfig.brandShortName} 首页`}>
            <img className="brand-mark" src={logoImage} alt="" width={30} height={30} />
            <span>{siteConfig.brandShortName}</span>
          </a>
          <nav className="site-nav" aria-label="主导航">
            {navItems.map((item) => (
              <a key={item.id} href={navHref(item.id, active)}>{item.label}</a>
            ))}
          </nav>
          <a
            className="button primary compact header-cta"
            href={active === "beta" ? siteConfig.surveyUrl : "./beta/"}
            target={active === "beta" ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            立即参与调研
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
          </button>
        </div>
        <div className={menuOpen ? "mobile-menu open" : "mobile-menu"} id="mobile-menu">
          <nav className="container mobile-menu-nav" aria-label="移动端导航">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={navHref(item.id, active)}
                aria-current={item.id === active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="button primary mobile-menu-cta"
              href={active === "beta" ? siteConfig.surveyUrl : "./beta/"}
              onClick={() => setMenuOpen(false)}
            >
              立即参与调研
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

export function Footer({ active = "home" }: { active?: PageId }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">
            <img className="footer-logo" src={logoImage} alt="" width={28} height={28} />
            {siteConfig.brandShortName}
          </p>
          <p>面向真实长任务的 AI Agent，现在处于早期共创阶段。</p>
          <p className="footer-slogan">{siteConfig.slogan}</p>
        </div>
        <nav aria-label="项目导航">
          {active === "home" ? <a href="./about/">关于项目</a> : <a href="../">返回首页</a>}
          <a href={active === "home" ? "#capabilities" : "../#capabilities"}>核心能力</a>
          <a href={active === "home" ? "./scenarios/" : "../scenarios/"}>使用场景</a>
          <a href={active === "home" ? "./roadmap/" : "../roadmap/"}>路线图</a>
          <a href={active === "home" ? "./pricing/" : "../pricing/"}>定价</a>
          <a href={active === "home" ? "./security/" : "../security/"}>数据边界</a>
          <a href={active === "home" ? "./beta/" : "../beta/"}>Beta 调研</a>
        </nav>
        <nav aria-label="参与入口">
          <a href={siteConfig.oxygenUrl} target="_blank" rel="noopener noreferrer">Oxygen AI</a>
          <a href="https://oxygenai.top/progress/" target="_blank" rel="noopener noreferrer">模型研究</a>
          <a href={siteConfig.surveyUrl} target="_blank" rel="noopener noreferrer">立即参与调研</a>
          <a href="mailto:prima@oxygenai.top">prima@oxygenai.top</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2026 Oxygen AI</p>
        <p>产品仍在打磨，能力描述不代表已经可用；反馈仅用于产品研究与 Beta 招募。</p>
      </div>
    </footer>
  );
}
