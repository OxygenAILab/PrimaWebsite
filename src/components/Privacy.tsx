import { useI18n } from "../i18n";

const sections: Array<{ title: { zh: string; en: string }; copy: { zh: string; en: string } }> = [
  {
    title: { zh: "当前数据范围", en: "Current data scope" },
    copy: {
      zh: "共创阶段的数据仅用于服务运行、产品研究和 Beta 招募。敏感工作区与私有资料不会被当作默认训练素材。",
      en: "Co-creation data is used only to run the service, support product research, and recruit Beta users. Sensitive workspaces and private material are not default training data.",
    },
  },
  {
    title: { zh: "记忆与控制", en: "Memory and control" },
    copy: {
      zh: "分层记忆的设计目标是让用户可以查看、修正与清除记忆内容。我们会随着产品推进继续补充具体控制入口。",
      en: "Layered memory is designed so users can review, correct, and delete stored content. We will continue to add concrete controls as the product advances.",
    },
  },
  {
    title: { zh: "联系与删除", en: "Contact and deletion" },
    copy: {
      zh: "如需了解数据使用边界、申请删除或纠正内容，请写信到 prima@oxygenai.top。我们会在确认身份后按最小必要范围处理。",
      en: "For data-boundary questions, deletion, or correction requests, email prima@oxygenai.top. We process requests with the minimum scope needed after confirming identity.",
    },
  },
];

export default function Privacy() {
  const { locale } = useI18n();

  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="privacy-title">
        <p className="eyebrow">{locale === "zh" ? "隐私" : "Privacy"}</p>
        <h1 id="privacy-title">{locale === "zh" ? "数据边界，先说清楚。" : "Data boundaries, stated first."}</h1>
        <p className="lead" style={{ maxWidth: "62ch" }}>
          {locale === "zh"
            ? "本页说明当前阶段的隐私口径。产品仍在早期共创阶段，正式协议会在可用前发布。"
            : "This page explains the current privacy posture. The product remains in early co-creation; formal agreements will be published before availability."}
        </p>
      </section>

      <section className="container about-section" aria-labelledby="privacy-sections-title">
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
