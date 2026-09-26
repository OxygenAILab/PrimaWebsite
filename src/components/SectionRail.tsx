import { useEffect, useState, type MouseEvent } from "react";
import { useI18n } from "../i18n";
import type { Localized } from "../data/content";

type RailItem = { id: string };

const railItems: Array<RailItem & { label: Localized }> = [
  { id: "product", label: { zh: "痛点", en: "Pain points" } },
  { id: "capabilities", label: { zh: "能力", en: "Capabilities" } },
  { id: "scenarios", label: { zh: "场景", en: "Scenarios" } },
  { id: "stage", label: { zh: "阶段", en: "Stage" } },
  { id: "models", label: { zh: "模型", en: "Models" } },
];

export default function SectionRail() {
  const { locale } = useI18n();
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
    <nav className="section-rail" aria-label={locale === "zh" ? "页面段落导航" : "Section navigation"}>
      <ul className="section-rail-list">
        {railItems.map((item) => (
          <li key={item.id}>
            <a
              className={activeId === item.id ? "section-rail-link is-active" : "section-rail-link"}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "true" : undefined}
              onClick={(event) => handleClick(event, item.id)}
            >
              <span className="section-rail-label">{item.label[locale]}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
