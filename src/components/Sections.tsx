import { siteConfig } from "../config";
import { PhraseTitle } from "./SplitTitle";
import { useI18n } from "../i18n";
import HeroArtwork from "./HeroArtwork";
import { capabilities, painPoints, scenarios, type Localized } from "../data/content";
import { ContinuityArtwork, ResearchArtwork } from "./SectionArtwork";

const updates: Array<{ date: string; tag: Localized; title: Localized; copy: Localized; href: string; external: boolean }> = [
  {
    date: "2026.09",
    tag: { zh: "定价", en: "Pricing" },
    title: { zh: "三条产品线，十四个档位公开", en: "Three product lines and fourteen plans published" },
    copy: {
      zh: "SparkPlan 覆盖个人验证，PrimaPlan 服务团队长任务，Credit+ 提供灵活加购。",
      en: "SparkPlan covers individual validation, PrimaPlan supports team-scale long tasks, and Credit+ adds flexible credits.",
    },
    href: "./pricing/",
    external: false,
  },
  {
    date: "2026.09",
    tag: { zh: "研究", en: "Research" },
    title: { zh: "模型研究边界更新", en: "Model research boundaries updated" },
    copy: {
      zh: "Oxygen AI 公开三条基础路线的目标与阶段；完整机制仍留在论文与发布说明之后。",
      en: "Oxygen AI has published the goals and phases of three research routes; mechanisms remain for later publications.",
    },
    href: "https://oxygenai.top/progress/",
    external: true,
  },
  {
    date: "2026.09",
    tag: { zh: "共创", en: "Co-creation" },
    title: { zh: "Beta 调研持续进行", en: "Beta research continues" },
    copy: {
      zh: "我们继续寻找真实长任务场景，尤其是多文件协作、数据链路和长文档工作中的断点。",
      en: "We are looking for real long-task cases, especially breaks in multi-file work, data pipelines, and long documents.",
    },
    href: "./beta/",
    external: false,
  },
];

export function Hero() {
  const { locale, pick, t } = useI18n();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroArtwork />
      <div className="container">
        <div className="hero-inner">
          <div className="hero-meta">
            <p className="eyebrow">{t("prima.slogan")}</p>
            <p className="stage-pill">{siteConfig.betaStatus[locale]}</p>
          </div>
          <h1 id="hero-title">{pick({ zh: "长任务不跑偏，少返工。", en: "Long tasks stay aligned. Less rework." })}</h1>
          <p className="hero-sub">
            {pick({ zh: "Prima 把多文件编程、数据分析与长文档写作里的约束、决策和失败教训组织成连续的工作记忆。", en: "Prima organizes constraints, decisions, and lessons from multi-file coding, data analysis, and long-document work into continuous working memory." })}
          </p>
          <div className="hero-actions">
            <a className="button primary" href="./beta/">{t("cta.joinBeta")}</a>
            <a className="button ghost" href="#product">{pick({ zh: "了解产品方向", en: "Product direction" })}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Product() {
  const { locale, pick } = useI18n();

  return (
    <section className="section" id="product" aria-labelledby="product-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{pick({ zh: "痛点", en: "Pain points" })}</p>
          <PhraseTitle id="product-title" title={{ zh: "AI Agent 的问题，不只是不够聪明。", en: "AI agents are not just insufficiently smart." }} />
          <p className="section-copy">
            {pick({ zh: "真实工作里，上下文持续存在，决策也会累积。一个好的 Agent 需要理解这些连续性。", en: "In real work, context persists and decisions accumulate. A useful agent has to understand that continuity." })}
          </p>
        </div>
        <div className="card-grid reveal">
          {painPoints.map((item) => (
            <article className="card" key={item.title.en}>
              <h3>{item.title[locale]}</h3>
              <p>{item.copy[locale]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Capabilities() {
  const { locale, pick } = useI18n();

  return (
    <section className="section" id="capabilities" aria-labelledby="capabilities-title">
      <div className="container">
        <div className="split reveal">
          <div className="split-copy">
            <p className="eyebrow">{pick({ zh: "核心能力", en: "Core capabilities" })}</p>
            <h2 id="capabilities-title">{pick({ zh: "四条正在打磨的方向", en: "Four directions in active development" })}</h2>
            <p className="lead">
              {pick({ zh: "四条方向都在打磨中，好不好用，由第一批用户说了算。", en: "All four are being refined; the first users will judge whether they work." })}
            </p>
          </div>
          <ContinuityArtwork />
        </div>
        <div className="card-grid reveal">
          {capabilities.map((item) => (
            <article className="card" key={item.title.en}>
              <p className="tag mint">{item.status[locale]}</p>
              <h3>{item.title[locale]}</h3>
              <p>{item.copy[locale]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Scenarios() {
  const { locale, pick } = useI18n();

  return (
    <section className="section" id="scenarios" aria-labelledby="scenarios-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{pick({ zh: "首发场景", en: "Launch scenarios" })}</p>
          <PhraseTitle id="scenarios-title" title={{ zh: "先服务长任务，而不是所有任务。", en: "Serve long tasks first, not every task." }} />
        </div>
        <div className="card-grid reveal">
          {scenarios.map((item) => (
            <article className="card" key={item.title.en}>
              <h3>{item.title[locale]}</h3>
              <p>{item.copy[locale]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Updates() {
  const { locale, pick } = useI18n();

  return (
    <section className="section" id="updates" aria-labelledby="updates-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{pick({ zh: "最新动态", en: "Updates" })}</p>
          <h2 id="updates-title">{pick({ zh: "进展不靠形容词。", en: "Progress needs evidence." })}</h2>
          <p className="section-copy">
            {pick({ zh: "每一轮更新都指向一个可检查的页面、阶段或调研入口。", en: "Each update points to a checkable page, phase, or research entry point." })}
          </p>
        </div>
        <div className="card-grid reveal">
          {updates.map((item) => (
            <article className="card update-card" key={item.title.en}>
              <div className="news-meta">
                <span className="news-date">{item.date}</span>
                <span className="tag gray">{item.tag[locale]}</span>
              </div>
              <h3>{item.title[locale]}</h3>
              <p>{item.copy[locale]}</p>
              {item.external ? (
                <a className="text-link" href={item.href} target="_blank" rel="noopener noreferrer">{pick({ zh: "查看详情", en: "View details" })}&nbsp;&rarr;</a>
              ) : (
                <a className="text-link" href={item.href}>{pick({ zh: "查看详情", en: "View details" })}&nbsp;&rarr;</a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StageAndBeta() {
  const { pick, t } = useI18n();

  return (
    <>
      <section className="section" id="stage" aria-labelledby="stage-title">
        <div className="container reveal">
          <p className="eyebrow">{pick({ zh: "产品阶段与共创", en: "Stage and co-creation" })}</p>
          <PhraseTitle id="stage-title" title={{ zh: "我们正在打磨第一版，也想先听你说。", en: "We are shaping the first version and want to hear from you." }} />
          <p className="section-copy">
            {pick({ zh: "Prima 还没有开放注册。我们先从真实现场开始：识别任务在哪里断裂、决策在哪里丢失，再决定第一版最该守住哪些秩序。", en: "Prima is not open for registration yet. We start in the field: identify where tasks break and decisions are lost, then decide what the first version must protect." })}
          </p>
        </div>
      </section>
      <section className="cta-section" id="beta" aria-labelledby="beta-title">
        <div className="container reveal">
          <p className="eyebrow">{pick({ zh: "Beta 调研", en: "Beta research" })}</p>
          <PhraseTitle id="beta-title" title={{ zh: "现在参与，影响第一版", en: "Join now and shape the first version" }} />
          <p className="section-copy">
            {pick({ zh: "问卷约需 5 分钟，覆盖你的使用习惯、真实痛点、部署偏好和服务期待，同时作为 Beta 用户筛选参考。入选用户有机会提前体验产品。", en: "The survey takes about five minutes and covers usage habits, real pain points, deployment preferences, and service expectations. Responses also inform early access." })}
          </p>
          <ul className="benefit-list">
            <li>{pick({ zh: "入选用户有机会提前体验产品，体验周期以活动规则为准。", en: "Selected users may get early access; terms govern the access period." })}</li>
            <li>{pick({ zh: "有效问题反馈可获得对应奖励，具体以活动规则为准。", en: "Valid feedback may receive rewards according to the activity rules." })}</li>
            <li>{pick({ zh: "用户信息严格保密，仅用于产品研究和 Beta 招募。", en: "User information is confidential and used only for product research and Beta recruitment." })}</li>
          </ul>
          <div className="hero-actions">
            <a className="button primary" href="./beta/">{t("cta.joinBeta")}</a>
            <a className="button ghost" href={siteConfig.surveyUrl} target="_blank" rel="noopener noreferrer">
              {pick({ zh: "直接打开问卷", en: "Open survey" })}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function Models() {
  const { pick } = useI18n();

  return (
    <section className="section" id="models" aria-labelledby="models-title">
      <div className="container">
        <div className="split">
          <div className="split-copy">
            <p className="eyebrow">{pick({ zh: "模型研究", en: "Model research" })}</p>
            <h2 id="models-title">{pick({ zh: "产品验证反哺模型研究。", en: "Product validation feeds model research." })}</h2>
            <p>
              {pick({ zh: "Prima 在真实工作流里验证连续性；Oxygen AI 把验证出的秩序带回模型层。一边减少返工，一边让推理、记忆与执行逐渐长成同一套结构。", en: "Prima validates continuity in real workflows; Oxygen AI returns that order to the model layer while reducing rework and aligning reasoning, memory, and execution." })}
            </p>
            <a className="text-link" href="https://oxygenai.top/progress/" target="_blank" rel="noopener noreferrer">
              {pick({ zh: "查看模型进展与研究", en: "See model progress and research" })}&nbsp;&rarr;
            </a>
          </div>
          <ResearchArtwork />
        </div>
      </div>
    </section>
  );
}
