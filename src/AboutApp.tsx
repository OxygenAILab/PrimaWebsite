import { useEffect } from "react";
import { Footer, Header } from "./components/Chrome";
import About from "./components/About";

export default function AboutApp() {
  useEffect(() => {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <Header active="about" />
      <About />
      <Footer active="about" />
    </>
  );
}
