import type { ReactNode } from "react";
import { useI18n } from "./i18n";
import { Footer, Header } from "./components/Chrome";
import PageMotion from "./components/Motion";
import RegionBanner from "./components/RegionBanner";
import SectionRail from "./components/SectionRail";

export type PrimaPage =
  | "home"
  | "beta"
  | "about"
  | "how-it-works"
  | "scenarios"
  | "roadmap"
  | "pricing"
  | "model-list"
  | "security"
  | "download";

/* 页序与英文标签：子页顶部的装饰条，编号按导航顺序排 */
const pageMarks: Record<PrimaPage, { index: number; tag: string }> = {
  home: { index: 1, tag: "OVERVIEW" },
  "how-it-works": { index: 2, tag: "RESEARCH" },
  scenarios: { index: 3, tag: "RESEARCH" },
  roadmap: { index: 4, tag: "RESEARCH" },
  pricing: { index: 5, tag: "PLAN" },
  "model-list": { index: 6, tag: "MODELS" },
  security: { index: 7, tag: "DATA" },
  beta: { index: 8, tag: "BETA" },
  about: { index: 9, tag: "ABOUT" },
  download: { index: 10, tag: "DOWNLOAD" },
};

/* 3×3 基元点阵，点亮那颗点的位置随页序变化，等于每页一个签名 */
function PageHead({ page }: { page: PrimaPage }) {
  const { index, tag } = pageMarks[page];
  const lit = (index - 1) % 9;

  return (
    <div className="page-head" aria-hidden="true">
      <div className="container page-head-row">
        <span className="page-index">{String(index).padStart(2, "0")} / 10</span>
        <span className="page-rule" />
        <span className="page-tag">{tag}</span>
      </div>
      <div className="container page-mark-row">
        <div className="page-mark">
          {Array.from({ length: 9 }, (_, dot) => (
            <span key={dot} className={dot === lit ? "mark-dot is-lit" : "mark-dot"} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PageApp({
  active,
  rail = false,
  children,
}: {
  active: PrimaPage;
  rail?: boolean;
  children: ReactNode;
}) {
  const { pick } = useI18n();

  return (
    <>
      <a className="skip-link" href="#main">{pick({ zh: "跳到主要内容", en: "Skip to content" })}</a>
      <RegionBanner />
      <PageMotion />
      <Header active={active} />
      {rail ? <SectionRail /> : null}
      {active === "home" ? null : <PageHead page={active} />}
      {children}
      <Footer active={active} />
    </>
  );
}
