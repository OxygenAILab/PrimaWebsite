import { useEffect } from "react";
import { Footer, Header } from "./components/Chrome";
import BetaSection from "./components/Beta";

export default function BetaApp() {
  useEffect(() => {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <Header active="beta" />
      <main id="main">
        <BetaSection />
      </main>
      <Footer active="beta" />
    </>
  );
}
