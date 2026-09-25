import { useEffect } from "react";

export default function PageMotion() {
  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    if (!progress) return;

    let frame = 0;
    const sync = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const parents = new Map<Element, number>();
    document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
      const parent = element.parentElement ?? document.body;
      const index = parents.get(parent) ?? 0;
      parents.set(parent, index + 1);
      element.style.setProperty("--reveal-delay", `${Math.min(index * 70, 280)}ms`);
      observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
