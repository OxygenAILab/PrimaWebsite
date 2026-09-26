import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Lora 拉丁字面自托管（标题西文字符）；中文标题走系统衬线回退（思源宋体/宋体）
import "@fontsource/lora/400.css";
import "@fontsource/lora/500.css";
import App from "./App";
import PageApp, { type PrimaPage } from "./PageApp";
import BetaSection from "./components/Beta";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";
import Scenarios from "./components/Scenarios";
import Roadmap from "./components/Roadmap";
import Pricing from "./components/Pricing";
import ModelList from "./components/ModelList";
import Security from "./components/Security";
import Download from "./components/Download";
import { I18nProvider } from "./i18n";
import "./site.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing #root element");
}

const pageId = (document.body.dataset.page ?? "home") as PrimaPage;

/* 首页由 App 自带完整版式，其余子页共用 PageApp 外壳 */
const pageMap: Partial<Record<PrimaPage, React.ReactNode>> = {
  beta: <BetaSection />,
  about: <About />,
  "how-it-works": <HowItWorks />,
  scenarios: <Scenarios />,
  roadmap: <Roadmap />,
  pricing: <Pricing />,
  "model-list": <ModelList />,
  security: <Security />,
  download: <Download />,
};

const page = pageMap[pageId];

createRoot(rootElement).render(
  <StrictMode>
    <I18nProvider>
      {page ? <PageApp active={pageId}>{page}</PageApp> : <App />}
    </I18nProvider>
  </StrictMode>,
);
