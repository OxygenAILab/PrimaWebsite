import BetaCta from "./BetaCta";
import { useI18n } from "../i18n";
import type { Localized } from "../data/content";

type Scenario = {
  title: Localized;
  audience: Localized;
  problems: Localized[];
  prima: Localized;
};

const scenarios: Scenario[] = [
  {
    title: { zh: "多文件编程与 Bug 定位", en: "Multi-file coding and bug localization" },
    audience: { zh: "工程团队 · 日常开发", en: "Engineering teams · Daily development" },
    problems: [
      {
        zh: "改一个接口定义，下游五个文件都要跟着动，Agent 忘记改第三个。",
        en: "One interface change ripples into five files, and the agent forgets the third one.",
      },
      {
        zh: "上一轮刚确认的约束，十轮对话后再问一遍，答案完全相反。",
        en: "A constraint confirmed one turn earlier is contradicted ten turns later.",
      },
    ],
    prima: {
      zh: "Prima 记住本轮会话里你确认的约束，在每次改动前重新校验，发现冲突时主动停下来问你，而不是默默改完。",
      en: "Prima keeps confirmed constraints, revalidates before every change, and pauses to ask about conflicts instead of silently finishing.",
    },
  },
  {
    title: { zh: "数据分析与研究汇总", en: "Data analysis and research synthesis" },
    audience: { zh: "分析师 · 研究员", en: "Analysts · Researchers" },
    problems: [
      {
        zh: "反复清理同一份数据，每次都要重新说明列名和口径。",
        en: "Cleaning the same dataset repeatedly means restating column names and definitions each time.",
      },
      {
        zh: "结论文档改到第 8 版，早就忘了第 2 版为什么被否决。",
        en: "By version eight, nobody remembers why version two was rejected.",
      },
    ],
    prima: {
      zh: "Prima 把你的口径、术语和被否决的结论存进分层记忆，引用时能区分“当前采纳”和“已废弃”，减少无效返工。",
      en: "Prima stores definitions, terminology, and rejected conclusions in layered memory, distinguishing adopted from retired work.",
    },
  },
  {
    title: { zh: "写作、文档与知识工作", en: "Writing, documentation, and knowledge work" },
    audience: { zh: "作者 · 内容团队", en: "Writers · Content teams" },
    problems: [
      {
        zh: "同一份报告换个角度写，语气和术语就变了。",
        en: "Rewriting the same report from another angle changes tone and terminology.",
      },
      {
        zh: "写到后半段，Agent 忘记了你前半段确立的论点结构。",
        en: "Later sections forget the argument structure established earlier.",
      },
    ],
    prima: {
      zh: "Prima 记录你的写作偏好，在长文档里保持章节间的论点一致性，而不是每次都从零开始。",
      en: "Prima records your writing preferences and keeps argument consistency across long documents instead of starting over.",
    },
  },
];

export default function Scenarios() {
  const { locale, pick } = useI18n();

  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="scenarios-hero-title">
        <p className="eyebrow">{pick({ zh: "使用场景", en: "Scenarios" })}</p>
        <h1 id="scenarios-hero-title">{pick({ zh: "先服务长任务，而不是所有任务。", en: "Serve long tasks first, not every task." })}</h1>
        <p className="lead lead-tight">
          {pick({ zh: "Prima 首发聚焦三类最常见的连续性断裂：多文件工程、长数据链路和长文档协作。这些不是行业口号，而是我们调研里反复出现的痛点。", en: "Prima's first release focuses on three common breaks in continuity: multi-file engineering, long data pipelines, and long-document collaboration." })}
        </p>
      </section>

      <section className="container about-section" aria-labelledby="scenario-list-title">
        <div className="card-grid">
          {scenarios.map((item) => (
            <article className="card scenario-card" key={item.title.en}>
              <div>
                <p className="tag gray">{item.audience[locale]}</p>
                <h3>{item.title[locale]}</h3>
              </div>
              <div>
                <p className="scenario-label">{pick({ zh: "今天的断裂", en: "Where it breaks today" })}</p>
                <ul className="scenario-list">
                  {item.problems.map((problem) => <li key={problem.en}>{problem[locale]}</li>)}
                </ul>
              </div>
              <div>
                <p className="scenario-label scenario-label-brand">{pick({ zh: "Prima 想做的事", en: "What Prima aims to do" })}</p>
                <p>{item.prima[locale]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <BetaCta
        id="scenario-cta-title"
        title={{ zh: "你的场景没有被覆盖？", en: "Scenario not covered?" }}
        copy={{ zh: "告诉我们你工作中最容易返工的环节。你的反馈会直接影响我们下一轮打磨的重点。", en: "Tell us where your work is easiest to redo. Your feedback directly sets the next refinement focus." }}
      />
    </main>
  );
}
