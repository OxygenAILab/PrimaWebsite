import { useEffect, type ReactNode } from "react";
import { Footer, Header } from "./components/Chrome";
import PageMotion from "./components/Motion";
import RegionBanner from "./components/RegionBanner";

export type PrimaPage =
  | "home"
  | "beta"
  | "about"
  | "how-it-works"
  | "scenarios"
  | "roadmap"
  | "pricing"
  | "model-list"
  | "faq"
  | "security";

export default function PageApp({ active, children }: { active: PrimaPage; children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <RegionBanner />
      <PageMotion />
      <Header active={active} />
      {children}
      <Footer active={active} />
    </>
  );
}
