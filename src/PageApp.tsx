import { useEffect, type ReactNode } from "react";
import { useI18n } from "./i18n";
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
  | "security"
  | "download"
  | "privacy"
  | "terms";

export default function PageApp({ active, children }: { active: PrimaPage; children: ReactNode }) {
  const { locale } = useI18n();

  return (
    <>
      <a className="skip-link" href="#main">{locale === "zh" ? "跳到主要内容" : "Skip to content"}</a>
      <RegionBanner />
      <PageMotion />
      <Header active={active} />
      {children}
      <Footer active={active} />
    </>
  );
}
