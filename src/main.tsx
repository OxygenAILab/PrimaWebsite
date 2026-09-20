import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import BetaApp from "./BetaApp";
import "./site.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing #root element");
}

const isBetaPage =
  document.body.dataset.page === "beta" ||
  window.location.pathname.replace(/\/+$/, "").endsWith("/beta");

createRoot(rootElement).render(
  <StrictMode>
    {isBetaPage ? <BetaApp /> : <App />}
  </StrictMode>,
);
