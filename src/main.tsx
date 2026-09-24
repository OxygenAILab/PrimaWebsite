import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Lora 拉丁字面自托管（标题西文字符）；中文标题走系统衬线回退（思源宋体/宋体）
import "@fontsource/lora/400.css";
import "@fontsource/lora/500.css";
import "@fontsource/lora/600.css";
import App from "./App";
import PageApp, { type PrimaPage } from "./PageApp";
import BetaSection from "./components/Beta";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";
import Scenarios from "./components/Scenarios";
import Roadmap from "./components/Roadmap";
import Faq from "./components/Faq";
import Security from "./components/Security";
import "./site.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing #root element");
}

const pageId = (document.body.dataset.page ?? "home") as PrimaPage;

const pageMap: Partial<Record<PrimaPage, React.ReactNode>> = {
  beta: <BetaSection />,
  about: <About />,
  "how-it-works": <HowItWorks />,
  scenarios: <Scenarios />,
  roadmap: <Roadmap />,
  faq: <Faq />,
  security: <Security />,
};

createRoot(rootElement).render(
  <StrictMode>
    {pageId === "home" ? <App /> : <PageApp active={pageId}>{pageMap[pageId] ?? <App />}</PageApp>}
  </StrictMode>,
);
