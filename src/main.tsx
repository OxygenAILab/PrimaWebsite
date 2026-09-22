import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import BetaApp from "./BetaApp";
import AboutApp from "./AboutApp";
import HowItWorksApp from "./HowItWorksApp";
import ScenariosApp from "./ScenariosApp";
import "./site.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing #root element");
}

const pageId = document.body.dataset.page ?? "";
const pathEnds = (suffix: string) => window.location.pathname.replace(/\/+$/, "").endsWith(suffix);

const isBetaPage =
  document.body.dataset.page === "beta" ||
  pathEnds("/beta");

const isAboutPage =
  pageId === "about" || pathEnds("/about");

const isHowItWorks = pageId === "how-it-works" || pathEnds("/how-it-works");
const isScenarios = pageId === "scenarios" || pathEnds("/scenarios");

createRoot(rootElement).render(
  <StrictMode>
    {isBetaPage ? <BetaApp /> : isAboutPage ? <AboutApp /> : isHowItWorks ? <HowItWorksApp /> : isScenarios ? <ScenariosApp /> : <App />}
  </StrictMode>,
);
