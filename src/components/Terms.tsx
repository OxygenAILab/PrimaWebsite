import { useI18n } from "../i18n";

const sections: Array<{ title: { zh: string; en: string }; copy: { zh: string; en: string } }> = [
  {
    title: { zh: "阶段口径", en: "Stage terms" },
    copy: {
      zh: "页面中的能力描述用于说明当前方向，不代表产品已经可用。可用性与资格以正式开通通知为准。",
      en: "Capability descriptions explain current direction and do not imply availability. Availability and eligibility follow activation notices.",
    },
  },
  {
    title: { zh: "反馈使用", en: "Feedback use" },
    copy: {
      zh: "你提交的问卷与访谈反馈仅用于产品研究、体验改进和 Beta 招募。我们不会公开展示个人信息。",
      en: "Survey and interview feedback is used only for product research, experience improvement, and Beta recruitment. Personal information is not publicly displayed.",
    },
  },
  {
    title: { zh: "服务边界", en: "Service boundaries" },
    copy: {
      zh: "早期共创阶段的服务能力、奖励与体验安排可能随阶段调整。如有变更，我们会在相关入口说明。",
      en: "Early-stage service capabilities, rewards, and access arrangements may change by phase. Changes are described at the relevant entry point.",
    },
  },
];

export default function Terms() {
  const { locale } = useI18n();

  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="terms-title">
        <p className="eyebrow">{locale === "zh" ? "条款" : "Terms"}</p>
        <h1 id="terms-title">{locale === "zh" ? "当前阶段的使用口径。" : "Current-stage terms of use."}</h1>
        <p className="lead" style={{ maxWidth: "62ch" }}>
          {locale === "zh"
            ? "本页汇总早期共创阶段的基本口径。正式服务条款与协议会在产品可用前发布。"
            : "This page summarizes the current co-creation terms. Formal service terms and agreements will be published before availability."}
        </p>
      </section>

      <section className="container about-section" aria-labelledby="terms-sections-title">
        <div className="card-grid">
          {sections.map((item) => (
            <article className="card" key={item.title.en}>
              <h3>{item.title[locale]}</h3>
              <p>{item.copy[locale]}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
