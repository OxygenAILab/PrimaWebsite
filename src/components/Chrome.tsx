import { useEffect, useState } from "react";
import { siteConfig } from "../config";
import logoImage from "../../assets/images/logo.png";

type PageId = "home" | "beta" | "about" | "how-it-works" | "scenarios";

export function Header({ active = "home" }: { active?: PageId }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={scrolled ? "site-header scrolled" : "site-header"} id="top">
      <div className="container header-inner">
        <a className="brand" href={active === "beta" ? "../" : "#top"} aria-label={`${siteConfig.brandShortName} 首页`}>
          <img className="brand-mark" src={logoImage} alt="" width={30} height={30} />
          <span>{siteConfig.brandShortName}</span>
        </a>
        <nav className="site-nav" aria-label="主导航">
          <a href={active === "home" ? "#product" : "../#product"}>产品理念</a>
          <a href={active === "home" ? "./how-it-works/" : active === "how-it-works" ? "#top" : "../how-it-works/"}>工作方式</a>
          <a href={active === "home" ? "./scenarios/" : active === "scenarios" ? "#top" : "../scenarios/"}>使用场景</a>
          <a href={active === "home" ? "./beta/" : "../beta/"}>Beta 调研</a>
          <a href={active === "home" ? "./about/" : active === "about" ? "#top" : "../about/"}>关于项目</a>
        </nav>
        <a
          className="button primary compact"
          href={active === "beta" ? siteConfig.surveyUrl : "./beta/"}
          target={active === "beta" ? "_blank" : undefined}
          rel="noopener noreferrer"
        >
          立即参与调研
        </a>
      </div>
    </header>
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
        </div>
        <nav aria-label="项目导航">
          {active === "home" ? <a href="./about/">关于项目</a> : <a href="../">返回首页</a>}
          <a href={active === "home" ? "#capabilities" : "../#capabilities"}>核心能力</a>
          <a href={active === "home" ? "./scenarios/" : "../scenarios/"}>使用场景</a>
          <a href={active === "home" ? "./beta/" : "../beta/"}>Beta 调研</a>
        </nav>
        <nav aria-label="参与入口">
          <a href={siteConfig.oxygenUrl} target="_blank" rel="noopener noreferrer">Oxygen AI</a>
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
