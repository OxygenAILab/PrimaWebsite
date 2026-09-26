import type { ReactNode } from "react";
import { useI18n } from "./i18n";
import { Footer, Header } from "./components/Chrome";
import LightField from "./components/LightField";
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
  | "download"
  | "privacy"
  | "terms";

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
      <LightField />
      <RegionBanner />
      <PageMotion />
      <Header active={active} />
      {rail ? <SectionRail /> : null}
      {children}
      <Footer active={active} />
    </>
  );
}
