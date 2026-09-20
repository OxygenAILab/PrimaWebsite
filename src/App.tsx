import { useEffect } from "react";
import { Footer, Header } from "./components/Chrome";
import { Beta, Capabilities, Hero, Product, Scenarios, Stage } from "./components/Sections";

export default function App() {
  useEffect(() => {
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
      <main id="main">
        <Hero />
        <Product />
        <Capabilities />
        <Scenarios />
        <Stage />
        <Beta />
      </main>
      <Footer />
    </>
  );
}
