import { LayeredArtwork } from "./SectionArtwork";
import BetaCta from "./BetaCta";
import SplitTitle, { PhraseTitle } from "./SplitTitle";
import { useI18n } from "../i18n";
import type { Localized } from "../data/content";

const layers: Array<{ title: Localized; copy: Localized }> = [
  {
    title: { zh: "快答层", en: "Quick answer layer" },
    copy: {
      zh: "一次简单的澄清或短句改写不需要深想。Prima 会判断哪些请求可以直接响应，避免浪费你的时间。",
      en: "A simple clarification or short rewrite does not need deep thought. Prima decides which requests can be answered directly.",
    },
  },
  {
    title: { zh: "深想层", en: "Deep reasoning layer" },
    copy: {
      zh: "当任务涉及多文件修改、方案取舍或复杂推理时，Prima 主动放慢速度，分阶段验证、回看并修正计划。",
      en: "When work involves multi-file changes, trade-offs, or complex reasoning, Prima slows down to verify, review, and revise in phases.",
    },
  },
  {
    title: { zh: "记忆层", en: "Memory layer" },
    copy: {
      zh: "偏好、项目状态、既有决策和失败教训被分层存储，模型知道“该记住什么”以及“该在什么时候想起什么”。",
      en: "Preferences, project state, decisions, and lessons are stored in layers so the model knows what to remember and when to recall it.",
    },
  },
];

const steps: Array<{ title: Localized; copy: Localized }> = [
  {
    title: { zh: "01 · 判断", en: "01 · Assess" },
    copy: {
      zh: "进入任务前，Prima 先评估复杂度：需要几个文件、几轮验证、是否有前置约束。",
      en: "Before entering a task, Prima assesses complexity: files involved, verification rounds, and upstream constraints.",
    },
  },
  {
    title: { zh: "02 · 规划", en: "02 · Plan" },
    copy: {
      zh: "把长任务拆成可复核的步骤，标注每一步的输入、预期结果和回退条件。",
      en: "Break the long task into reviewable steps and mark each one's inputs, expected result, and rollback condition.",
    },
  },
  {
    title: { zh: "03 · 执行", en: "03 · Execute" },
    copy: {
      zh: "按计划推进，过程中持续校验是否偏离目标，遇到冲突时主动停下来确认。",
      en: "Proceed by plan while checking drift; pause and confirm when conflicts appear.",
    },
  },
  {
    title: { zh: "04 · 复盘", en: "04 · Review" },
    copy: {
      zh: "记录哪些决策成立、哪些假设被推翻，沉淀为下一次任务可以调用的长期记忆。",
      en: "Record which decisions held and which assumptions failed, turning the result into long-term memory for the next task.",
    },
  },
];

export default function HowItWorks() {
  const { locale, pick } = useI18n();

  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="how-hero-title">
        <p className="eyebrow">{pick({ zh: "工作方式", en: "How it works" })}</p>
        <SplitTitle
          id="how-hero-title"
          lead={{ zh: "想多深，", en: "The task decides" }}
          stress={{ zh: "由任务说了算。", en: "how deeply to think." }}
        />
        <p className="lead lead-tight">
          {pick({ zh: "Prima 不是把“多想几步”当作一个开关，而是在每次任务里判断：此刻需要多深的推理、多少上下文，以及哪些记忆值得被调用。", en: "Prima does not treat more thinking as a switch. Each task is judged for reasoning depth, context, and which memories are worth recalling." })}
        </p>
      </section>

      <section className="container about-section" aria-labelledby="layer-title">
        <div className="split">
          <div className="split-copy">
            <p className="eyebrow">{pick({ zh: "推理分层", en: "Layered reasoning" })}</p>
            <PhraseTitle id="layer-title" title={{ zh: "三种思考方式，而不是一个固定速度。", en: "Three ways to think, not one fixed speed." }} />
            <p>
              {pick({ zh: "我们不想让简单问题被拖慢，也不想复杂问题被草率对待。Prima 的核心假设是：推理深度应该跟任务复杂度匹配，而不是跟着对话轮数增长。", en: "Simple work should not wait and complex work should not be rushed. Prima assumes reasoning depth should match task complexity, not conversation length." })}
            </p>
          </div>
          <LayeredArtwork />
        </div>
        <div className="card-grid card-grid-after-split">
          {layers.map((item) => (
            <article className="card" key={item.title.en}>
              <h3>{item.title[locale]}</h3>
              <p>{item.copy[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="process-title">
        <div className="section-head">
          <p className="eyebrow">{pick({ zh: "执行流程", en: "Execution loop" })}</p>
          <h2 id="process-title">{pick({ zh: "长任务的四步循环。", en: "A four-step loop for long tasks." })}</h2>
        </div>
        <div className="timeline">
          {steps.map((step) => (
            <div className="timeline-item" key={step.title.en}>
              <h3>{step.title[locale]}</h3>
              <p>{step.copy[locale]}</p>
            </div>
          ))}
        </div>
      </section>

      <BetaCta
        id="how-cta-title"
        title={{ zh: "想试试这套工作方式？", en: "Want to try this workflow?" }}
        copy={{ zh: "我们正在邀请真实用户参与 Beta，验证这套设计是否真的能减少返工。", en: "We are inviting real users into Beta to test whether this design actually reduces rework." }}
      />
    </main>
  );
}
