import { useEffect } from "react";
import { Footer, Header } from "./components/Chrome";
import HowItWorks from "./components/HowItWorks";

export default function HowItWorksApp() {
  useEffect(() => {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <Header active="how-it-works" />
      <HowItWorks />
      <Footer active="how-it-works" />
    </>
  );
}
