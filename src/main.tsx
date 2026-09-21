import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import BetaApp from "./BetaApp";
import AboutApp from "./AboutApp";
import "./site.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing #root element");
}

const isBetaPage =
  document.body.dataset.page === "beta" ||
  window.location.pathname.replace(/\/+$/, "").endsWith("/beta");

const isAboutPage =
  document.body.dataset.page === "about" ||
  window.location.pathname.replace(/\/+$/, "").endsWith("/about");

createRoot(rootElement).render(
  <StrictMode>
    {isBetaPage ? <BetaApp /> : isAboutPage ? <AboutApp /> : <App />}
  </StrictMode>,
);
