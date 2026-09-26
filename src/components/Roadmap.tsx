import BetaCta from "./BetaCta";
import { useI18n } from "../i18n";
import type { Localized } from "../data/content";

type Phase = {
  title: Localized;
  status: Localized;
  tone: string;
  items: Localized[];
};

const phases: Phase[] = [
  {
    title: { zh: "现在 · Beta 调研", en: "Now · Beta research" },
    status: { zh: "进行中", en: "Active" },
    tone: "mint",
    items: [
      { zh: "收集真实用户的长任务痛点与使用习惯", en: "Collect real long-task pain points and usage habits" },
      { zh: "验证自适应推理深度与分层记忆的产品假设", en: "Validate product hypotheses for adaptive reasoning and layered memory" },
      { zh: "确定第一版产品的核心能力边界", en: "Define the first version's core capability boundaries" },
    ],
  },
  {
    title: { zh: "下一步 · 内部 Alpha", en: "Next · Internal Alpha" },
    status: { zh: "筹备中", en: "Preparing" },
    tone: "peri",
    items: [
      { zh: "向入选调研用户开放小范围内测", en: "Open small-scale testing to selected research users" },
      { zh: "打磨长任务执行一致性与记忆召回", en: "Refine long-task execution consistency and memory recall" },
      { zh: "建立共创反馈通道与迭代节奏", en: "Establish co-creation feedback channels and iteration cadence" },
    ],
  },
  {
    title: { zh: "之后 · 公开 Beta", en: "Later · Public Beta" },
    status: { zh: "规划中", en: "Planned" },
    tone: "outline",
    items: [
      { zh: "扩大测试范围并沉淀可量化的体验指标", en: "Expand testing and establish measurable experience metrics" },
      { zh: "探索本地与混合部署的适用场景", en: "Explore local and hybrid deployment fit" },
      { zh: "反哺 Oxygen 模型矩阵的架构设计", en: "Feed findings into Oxygen's model architecture design" },
    ],
  },
];

export default function Roadmap() {
  const { locale, pick } = useI18n();

  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="roadmap-hero-title">
        <p className="eyebrow">{pick({ zh: "路线图", en: "Roadmap" })}</p>
        <h1 id="roadmap-hero-title">{pick({ zh: "我们按阶段走，不跳步。", en: "We move by stages; no shortcuts." })}</h1>
        <p className="lead lead-tight">
          {pick({ zh: "Prima 的每个阶段都以「可验证的进展」为推进条件。这里的计划是当前视角，会随调研反馈调整。", en: "Each Prima stage advances only on verifiable progress. The plan reflects the current view and will change with research feedback." })}
        </p>
      </section>

      <section className="container about-section" aria-labelledby="phases-title">
        <div className="card-grid">
          {phases.map((phase) => (
            <article className="card" key={phase.title.en}>
              <p className={`tag ${phase.tone}`}>{phase.status[locale]}</p>
              <h3>{phase.title[locale]}</h3>
              <ul className="phase-list">
                {phase.items.map((item) => (
                  <li key={item.en}>{item[locale]}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <BetaCta
        id="roadmap-cta-title"
        title={{ zh: "想影响这个路线图？", en: "Want to shape this roadmap?" }}
        copy={{ zh: "填写 Beta 调研，告诉我们你最需要的能力。调研反馈会直接决定优先级。", en: "Complete Beta research and tell us the capabilities you need most; feedback directly sets priorities." }}
      />
    </main>
  );
}
