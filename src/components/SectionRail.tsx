import { useEffect, useState, type MouseEvent } from "react";

type RailItem = { id: string; label: string };

const railItems: RailItem[] = [
  { id: "product", label: "痛点" },
  { id: "capabilities", label: "能力" },
  { id: "scenarios", label: "场景" },
  { id: "stage", label: "阶段" },
  { id: "models", label: "模型" },
];

export default function SectionRail() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const sections = railItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      // 视口中部偏上的一条横带：进入该带的段落即视为「当前段落」
      { rootMargin: "-22% 0px -68% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    setActiveId(id);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav className="section-rail" aria-label="页面段落导航">
      <ul className="section-rail-list">
        {railItems.map((item) => (
          <li key={item.id}>
            <a
              className={activeId === item.id ? "section-rail-link is-active" : "section-rail-link"}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "true" : undefined}
              onClick={(event) => handleClick(event, item.id)}
            >
              <span className="section-rail-label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
