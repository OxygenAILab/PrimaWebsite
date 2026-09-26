import { siteConfig } from "../config";
import BetaCta from "./BetaCta";
import SplitTitle from "./SplitTitle";
import { useI18n } from "../i18n";
import type { Localized } from "../data/content";

const boundaries: Array<{ title: Localized; copy: Localized }> = [
  {
    title: { zh: "自适应推理", en: "Adaptive reasoning" },
    copy: {
      zh: "探索任务复杂度感知、快答与深想的切换，以及执行前的自我校验。",
      en: "We explore task complexity sensing, switching between quick and deep reasoning, and pre-execution self-checks.",
    },
  },
  {
    title: { zh: "分层长期记忆", en: "Layered long-term memory" },
    copy: {
      zh: "研究偏好、项目状态、决策和失败教训如何被安全地组织与调用。",
      en: "We study how preferences, project state, decisions, and lessons can be organized and recalled safely.",
    },
  },
  {
    title: { zh: "数据边界", en: "Data boundaries" },
    copy: {
      zh: "评估本地、私有区和混合部署的适用场景，不把敏感工作区当作默认训练素材。",
      en: "We assess local, private, and hybrid deployment fit; sensitive workspaces are not default training material.",
    },
  },
];

/* 常见问题原先单开一页，与本页重叠度高；合并后同类问题并成一条，用折叠列表收起 */
const faqGroups: Array<{ title: Localized; items: Array<{ q: Localized; a: Localized }> }> = [
  {
    title: { zh: "产品与阶段", en: "Product and stage" },
    items: [
      {
        q: { zh: "Prima 现在可以用了吗？收费吗？", en: "Can I use Prima now? Is it free?" },
        a: {
          zh: "还没有开放注册。我们正在通过 Beta 调研筛选早期用户，入选后会单独安排体验。早期体验阶段不收费，正式阶段的收费形态会结合产品完成度再公布。",
          en: "Registration is not open yet. Beta research is selecting early users, and selected users receive separate access arrangements. Early access is free; commercial terms will be published later based on product maturity.",
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
        q: { zh: "调研要多久？多久能得到回复？", en: "How long is the survey, and when will I hear back?" },
        a: {
          zh: "约 5 分钟，问题围绕使用习惯、真实痛点、部署偏好和服务期待。我们会结合反馈安排体验资格，节奏以邮件通知为准。",
          en: "About five minutes, covering usage habits, real pain points, deployment preferences, and service expectations. Access arrangements follow the feedback; email notices define the timing.",
        },
      },
    ],
  },
];

export default function About() {
  const { locale, pick } = useI18n();

  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="about-page-title">
        <p className="eyebrow">{pick({ zh: "关于项目", en: "About the project" })}</p>
        <SplitTitle
          id="about-page-title"
          lead={{ zh: "Prima 是一个", en: "Prima is a product" }}
          stress={{ zh: "正在与用户共同定义的产品。", en: "being defined with its users." }}
        />
        <p className="section-copy">
          {pick({
            zh: "Prima 面向真实长任务，探索自适应推理、分层长期记忆和更可靠的执行一致性。当前项目由 Oxygen AI 支持，仍处于早期共创阶段。阶段、数据边界和参与方式，我们在这一页直接回答。",
            en: "Prima targets real long tasks and explores adaptive reasoning, layered long-term memory, and reliable execution consistency. Oxygen AI supports the project, which remains in early co-creation. This page answers stage, data-boundary, and participation questions directly.",
          })}
        </p>
        <a className="text-link" href={siteConfig.oxygenUrl} target="_blank" rel="noopener noreferrer">
          {pick({ zh: "了解 Oxygen AI", en: "Explore Oxygen AI" })}&nbsp;&rarr;
        </a>
      </section>

      <section className="container about-section" aria-labelledby="boundary-title">
        <div className="section-head">
          <p className="eyebrow">{pick({ zh: "研究边界", en: "Research boundaries" })}</p>
          <h2 id="boundary-title">{pick({ zh: "诚实标注阶段，不夸大能力。", en: "Label stages honestly; do not overstate capability." })}</h2>
        </div>
        <div className="three-grid">
          {boundaries.map((item) => (
            <article className="feature-tile" key={item.title.en}>
              <h3>{item.title[locale]}</h3>
              <p>{item.copy[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="about-faq-title">
        <div className="section-head">
          <p className="eyebrow">{pick({ zh: "常见问题", en: "FAQ" })}</p>
          <h2 id="about-faq-title">{pick({ zh: "把话说清楚。", en: "Clear answers, directly stated." })}</h2>
        </div>
        {faqGroups.map((group) => (
          <div className="faq-group" key={group.title.en}>
            <p className="faq-group-title">{group.title[locale]}</p>
            <div className="faq-list">
              {group.items.map((item) => (
                <details className="faq-item" key={item.q.en}>
                  <summary>{item.q[locale]}</summary>
                  <p>{item.a[locale]}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>

      <BetaCta
        id="contact-title"
        title={{ zh: "想影响产品方向？", en: "Want to influence the product?" }}
        copy={{
          zh: "填写约 5 分钟的问卷，告诉我们你的真实场景、痛点和部署期待。入选用户有机会进入 Beta。",
          en: "Complete a five-minute survey to share your real scenarios, pain points, and deployment expectations. Selected users may enter Beta.",
        }}
      />
    </main>
  );
}
