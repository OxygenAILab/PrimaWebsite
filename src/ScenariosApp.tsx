import { useEffect } from "react";
import { Footer, Header } from "./components/Chrome";
import Scenarios from "./components/Scenarios";

export default function ScenariosApp() {
  useEffect(() => {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <Header active="scenarios" />
      <Scenarios />
      <Footer active="scenarios" />
    </>
  );
}
