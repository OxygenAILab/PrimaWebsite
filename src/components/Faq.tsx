import { useI18n } from "../i18n";
import type { Localized } from "../data/content";

type FaqGroup = {
  title: Localized;
  items: Array<{ q: Localized; a: Localized }>;
};

const groups: FaqGroup[] = [
  {
    title: { zh: "产品与阶段", en: "Product and stage" },
    items: [
      {
        q: { zh: "Prima 现在可以用了吗？", en: "Can I use Prima now?" },
        a: {
          zh: "还没有开放注册。我们正在通过 Beta 调研筛选早期用户，入选后会单独安排体验。",
          en: "Registration is not open yet. Beta research is selecting early users; selected users receive separate access arrangements.",
        },
      },
      {
        q: { zh: "免费吗？", en: "Is it free?" },
        a: {
          zh: "早期体验阶段不收费。正式阶段的收费形态会结合产品完成度再公布。",
          en: "Early access is free. Commercial terms will be published later, based on product maturity.",
        },
      },
      {
        q: { zh: "和一般的聊天助手有什么区别？", en: "How is it different from a chat assistant?" },
        a: {
          zh: "Prima 聚焦长任务：多文件工程、长文档、数据分析。推理深度跟任务复杂度匹配，而不是固定速度。",
          en: "Prima targets long tasks across multi-file engineering, long documents, and data analysis. Reasoning depth matches task complexity rather than a fixed speed.",
        },
      },
    ],
  },
  {
    title: { zh: "记忆与数据", en: "Memory and data" },
    items: [
      {
        q: { zh: "会记住我的所有对话吗？", en: "Will it remember every conversation?" },
        a: {
          zh: "分层记忆会区分「该记住什么」和「该在什么时候想起什么」。偏好、项目状态和关键决策会被分层组织，你会有查看与控制方式。",
          en: "Layered memory distinguishes what to remember from when to recall it. Preferences, project state, and decisions are layered, with review and control methods.",
        },
      },
      {
        q: { zh: "我的数据用来训练模型吗？", en: "Will my data train models?" },
        a: {
          zh: "不会。共创阶段的数据仅用于服务与产品研究，边界会写入协议。",
          en: "No. Co-creation data is used only for service and product research; boundaries are written into agreements.",
        },
      },
    ],
  },
  {
    title: { zh: "参与方式", en: "How to participate" },
    items: [
      {
        q: { zh: "调研要多久？", en: "How long is the survey?" },
        a: {
          zh: "约 5 分钟。问题围绕使用习惯、真实痛点、部署偏好和服务期待。",
          en: "About five minutes. Questions cover usage habits, real pain points, deployment preferences, and service expectations.",
        },
      },
      {
        q: { zh: "多长时间能得到回复？", en: "When will I hear back?" },
        a: {
          zh: "我们会结合反馈安排体验资格，节奏以邮件通知为准。",
          en: "Access arrangements depend on feedback; email notices define the timing.",
        },
      },
    ],
  },
];

export default function Faq() {
  const { locale } = useI18n();

  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="faq-hero-title">
        <p className="eyebrow">{locale === "zh" ? "常见问题" : "FAQ"}</p>
        <h1 id="faq-hero-title">{locale === "zh" ? "把话说清楚。" : "Clear answers, directly stated."}</h1>
        <p className="lead lead-tight">
          {locale === "zh"
            ? "关于阶段、数据边界和参与方式，我们在这里直接回答。没有覆盖到的问题可以写信来问。"
            : "We answer stage, data-boundary, and participation questions directly. Write to us for anything not covered."}
        </p>
      </section>

      {groups.map((group, index) => (
        <section className="container about-section" key={group.title.en} aria-labelledby={`faq-group-${index}`}>
          <div className="section-head">
            <p className="eyebrow" id={`faq-group-${index}`}>{group.title[locale]}</p>
          </div>
          <div className="stack-cards">
            {group.items.map((item) => (
              <article className="card" key={item.q.en}>
                <h3>{item.q[locale]}</h3>
                <p>{item.a[locale]}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
