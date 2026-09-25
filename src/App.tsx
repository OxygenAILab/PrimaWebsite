import { useEffect } from "react";
import { Footer, Header } from "./components/Chrome";
import PageMotion from "./components/Motion";
import SectionRail from "./components/SectionRail";
import { Capabilities, Hero, Models, Product, Scenarios, StageAndBeta, Updates } from "./components/Sections";

export default function App() {
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      try {
        const target = document.querySelector(hash);
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      } catch {
        // 非法 hash 选择器（外链截断等）：忽略，不影响首屏 reveal 注册
      }
    }

    return () => {};
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <PageMotion />
      <Header />
      <SectionRail />
      <main id="main">
        <Hero />
        <Product />
        <Capabilities />
        <Scenarios />
        <Updates />
        <StageAndBeta />
        <Models />
      </main>
      <Footer />
    </>
  );
}
