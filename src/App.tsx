import { useEffect } from "react";
import PageApp from "./PageApp";
import { Capabilities, Hero, Models, Product, Scenarios, StageAndBeta, Updates } from "./components/Sections";

export default function App() {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    try {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.querySelector(hash)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    } catch {
      // 非法 hash 选择器（外链截断等）：忽略，不影响首屏 reveal 注册
    }
  }, []);

  return (
    <PageApp active="home" rail>
      <main id="main">
        <Hero />
        <Product />
        <Capabilities />
        <Scenarios />
        <Updates />
        <StageAndBeta />
        <Models />
      </main>
    </PageApp>
  );
}
