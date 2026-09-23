import { useEffect, type ReactNode } from "react";
import { Footer, Header } from "./components/Chrome";

export type PrimaPage =
  | "home"
  | "beta"
  | "about"
  | "how-it-works"
  | "scenarios"
  | "roadmap"
  | "faq"
  | "security";

export default function PageApp({ active, children }: { active: PrimaPage; children: ReactNode }) {
  useEffect(() => {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <Header active={active} />
      {children}
      <Footer active={active} />
    </>
  );
}
