import { useEffect } from "react";
import { Footer, Header } from "./components/Chrome";
import SectionRail from "./components/SectionRail";
import { Capabilities, Hero, Models, Product, Scenarios, StageAndBeta } from "./components/Sections";

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <Header />
      <SectionRail />
      <main id="main">
        <Hero />
        <Product />
        <Capabilities />
        <Scenarios />
        <StageAndBeta />
        <Models />
      </main>
      <Footer />
    </>
  );
}
