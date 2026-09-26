import { siteConfig } from "../config";
import BetaCta from "./BetaCta";
import SplitTitle from "./SplitTitle";
import { useI18n } from "../i18n";
import type { Localized } from "../data/content";

const principles: Array<{ title: Localized; copy: Localized }> = [
  {
    title: { zh: "真实长任务优先", en: "Real long tasks first" },
    copy: {
      zh: "我们不把“能聊天”当作终点，而是关注多文件工程、长文档、数据分析和研究汇总里能否稳定完成。",
      en: "We do not stop at chat; we test stable completion in multi-file engineering, long documents, data analysis, and research synthesis.",
    },
  },
  {
    title: { zh: "阶段透明", en: "Transparent stages" },
    copy: {
      zh: "Prima 仍在早期共创阶段。我们没有把探索中的能力包装成已上线功能。",
      en: "Prima is still in early co-creation. We do not present exploratory capabilities as shipped features.",
    },
  },
  {
    title: { zh: "反馈驱动", en: "Feedback driven" },
    copy: {
      zh: "问卷、访谈和 Beta 反馈会直接影响推理、记忆、数据边界和界面优先级。",
      en: "Surveys, interviews, and Beta feedback directly shape reasoning, memory, data boundaries, and interface priorities.",
    },
  },
];

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

export default function About() {
  const { locale, pick, t } = useI18n();

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
          {pick({ zh: "Prima 面向真实长任务，探索自适应推理、分层长期记忆和更可靠的执行一致性。当前项目由 Oxygen AI 支持，仍处于早期共创阶段。", en: "Prima targets real long tasks and explores adaptive reasoning, layered long-term memory, and reliable execution consistency. Oxygen AI supports the project, which remains in early co-creation." })}
        </p>
        <div className="hero-actions">
          <a className="button primary" href="../beta/">{t("cta.joinBeta")}</a>
          <a className="button ghost" href={siteConfig.oxygenUrl} target="_blank" rel="noopener noreferrer">{pick({ zh: "了解 Oxygen AI", en: "Explore Oxygen AI" })}</a>
        </div>
      </section>

      <section className="container about-section" aria-labelledby="principles-title">
        <h2 id="principles-title">{pick({ zh: "我们关心的三件事", en: "Three things we care about" })}</h2>
        <div className="three-grid">
          {principles.map((item) => (
            <article className="feature-tile" key={item.title.en}>
              <h3>{item.title[locale]}</h3>
              <p>{item.copy[locale]}</p>
            </article>
          ))}
        </div>
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

      <BetaCta
        id="contact-title"
        title={{ zh: "想影响产品方向？", en: "Want to influence the product?" }}
        copy={{ zh: "填写约 5 分钟的问卷，告诉我们你的真实场景、痛点和部署期待。入选用户有机会进入 Beta。", en: "Complete a five-minute survey to share your real scenarios, pain points, and deployment expectations. Selected users may enter Beta." }}
      />
    </main>
  );
}
