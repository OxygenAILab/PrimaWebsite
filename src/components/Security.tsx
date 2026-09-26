import { useI18n } from "../i18n";
import type { Localized } from "../data/content";

const principles: Array<{ title: Localized; copy: Localized }> = [
  {
    title: { zh: "数据边界明确", en: "Clear data boundaries" },
    copy: {
      zh: "共创阶段的数据仅用于服务与产品研究。敏感工作区与私有资料不会被当作默认训练素材。",
      en: "Co-creation data is used only for service and product research. Sensitive workspaces and private material are not default training data.",
    },
  },
  {
    title: { zh: "记忆可控", en: "Controllable memory" },
    copy: {
      zh: "分层记忆的设计目标之一是让用户可以查看、修正与清除记忆内容，而不是一个不可见的黑箱。",
      en: "Layered memory is designed for review, correction, and deletion rather than an invisible black box.",
    },
  },
  {
    title: { zh: "部署形态分层", en: "Layered deployment options" },
    copy: {
      zh: "我们在探索本地、私有区与混合部署的适用场景，让敏感工作有更合适的选择。",
      en: "We are exploring local, private, and hybrid deployment fit so sensitive work has more appropriate options.",
    },
  },
  {
    title: { zh: "诚实标注阶段", en: "Honest stage labeling" },
    copy: {
      zh: "安全能力与边界一样，会随阶段明确标注。我们不会把规划中的能力描述成已经可用。",
      en: "Security capabilities are labeled by stage like other boundaries; planned work is not described as available.",
    },
  },
];

export default function Security() {
  const { locale, pick } = useI18n();

  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="sec-hero-title">
        <p className="eyebrow">{pick({ zh: "安全与数据边界", en: "Security and data boundaries" })}</p>
        <h1 id="sec-hero-title">{pick({ zh: "你的工作区，边界由你。", en: "Your workspace, your boundaries." })}</h1>
        <p className="lead lead-tight">
          {pick({ zh: "长任务意味着 Agent 会接触更多上下文。我们把数据边界当作产品的第一性设计，而不是事后补丁。", en: "Long tasks expose more context. We treat data boundaries as first-class product design, not a later patch." })}
        </p>
      </section>

      <section className="container about-section" aria-label={pick({ zh: "数据边界原则", en: "Data boundary principles" })}>
        <div className="card-grid">
          {principles.map((item) => (
            <article className="card" key={item.title.en}>
              <h3>{item.title[locale]}</h3>
              <p>{item.copy[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="sec-note-title">
        <div className="section-head">
          <p className="eyebrow">{pick({ zh: "当前状态", en: "Current status" })}</p>
          <h2 id="sec-note-title">{pick({ zh: "诚实地说。", en: "Stated honestly." })}</h2>
        </div>
        <div className="stack-cards">
          <article className="card">
            <h3>{pick({ zh: "还在演进", en: "Still evolving" })}</h3>
            <p>
              {pick({ zh: "以上是当前的设计承诺与探索方向。随着产品阶段推进，我们会在这里持续更新实现进度，并用明确的语言标注已落地与规划中的部分。", en: "These are current design commitments and directions. As the product advances, we will update implementation progress here and clearly mark shipped versus planned work." })}
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
