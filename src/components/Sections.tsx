import { siteConfig } from "../config";
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
  const { locale, t } = useI18n();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroArtwork />
      <div className="container">
        <div className="hero-inner">
          <p className="eyebrow">{t("prima.slogan")}</p>
          <h1 id="hero-title">
            {locale === "zh" ? <>长任务不跑偏，<br />少返工。</> : <>Long tasks stay aligned.<br />Less rework.</>}
          </h1>
          <p className="hero-sub">
            {locale === "en"
              ? "Prima organizes constraints, decisions, and lessons from multi-file coding, data analysis, and long-document work into continuous working memory."
              : "Prima 把多文件编程、数据分析与长文档写作里的约束、决策和失败教训组织成连续的工作记忆。"}
          </p>
          <div className="hero-actions">
            <p className="stage-pill">{siteConfig.betaStatus[locale]}</p>
          </div>
          <div className="hero-actions">
            <a className="button primary" href="./beta/">{locale === "zh" ? "参与调研" : "Join research"}</a>
            <a className="button ghost" href="#product">{locale === "zh" ? "了解产品方向" : "Product direction"}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Product() {
  const { locale } = useI18n();

  return (
    <section className="section" id="product" aria-labelledby="product-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{locale === "zh" ? "痛点" : "Pain points"}</p>
          <h2 id="product-title">{locale === "zh" ? "AI Agent 的问题，不只是不够聪明。" : "AI agents are not just insufficiently smart."}</h2>
          <p className="section-copy">
            {locale === "zh"
              ? "真实工作里，上下文持续存在，决策也会累积。一个好的 Agent 需要理解这些连续性。"
              : "In real work, context persists and decisions accumulate. A useful agent has to understand that continuity."}
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
  const { locale } = useI18n();

  return (
    <section className="section" id="capabilities" aria-labelledby="capabilities-title">
      <div className="container">
        <div className="split reveal">
          <div className="split-copy">
            <p className="eyebrow">{locale === "zh" ? "核心能力" : "Core capabilities"}</p>
            <h2 id="capabilities-title">{locale === "zh" ? "四条正在打磨的方向" : "Four directions in active development"}</h2>
            <p className="lead">
              {locale === "zh" ? "四条方向都在打磨中，好不好用，由第一批用户说了算。" : "All four are being refined; the first users will judge whether they work."}
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
  const { locale } = useI18n();

  return (
    <section className="section" id="scenarios" aria-labelledby="scenarios-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{locale === "zh" ? "首发场景" : "Launch scenarios"}</p>
          <h2 id="scenarios-title">{locale === "zh" ? "先服务长任务，而不是所有任务。" : "Serve long tasks first, not every task."}</h2>
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
  const { locale } = useI18n();

  return (
    <section className="section" id="updates" aria-labelledby="updates-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{locale === "zh" ? "最新动态" : "Updates"}</p>
          <h2 id="updates-title">{locale === "zh" ? "进展不靠形容词。" : "Progress needs evidence."}</h2>
          <p className="section-copy">
            {locale === "zh" ? "每一轮更新都指向一个可检查的页面、阶段或调研入口。" : "Each update points to a checkable page, phase, or research entry point."}
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
                <a className="text-link" href={item.href} target="_blank" rel="noopener noreferrer">{locale === "zh" ? "查看详情" : "View details"}&nbsp;&rarr;</a>
              ) : (
                <a className="text-link" href={item.href}>{locale === "zh" ? "查看详情" : "View details"}&nbsp;&rarr;</a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StageAndBeta() {
  const { locale } = useI18n();

  return (
    <>
      <section className="section" id="stage" aria-labelledby="stage-title">
        <div className="container reveal">
          <p className="eyebrow">{locale === "zh" ? "产品阶段与共创" : "Stage and co-creation"}</p>
          <h2 id="stage-title">{locale === "zh" ? "我们正在打磨第一版，也想先听你说。" : "We are shaping the first version and want to hear from you."}</h2>
          <p className="section-copy">
            {locale === "zh"
              ? "Prima 还没有开放注册。我们先从真实现场开始：识别任务在哪里断裂、决策在哪里丢失，再决定第一版最该守住哪些秩序。"
              : "Prima is not open for registration yet. We start in the field: identify where tasks break and decisions are lost, then decide what the first version must protect."}
          </p>
        </div>
      </section>
      <section className="cta-section" id="beta" aria-labelledby="beta-title">
        <div className="container reveal">
          <p className="eyebrow">{locale === "zh" ? "Beta 调研" : "Beta research"}</p>
          <h2 id="beta-title">{locale === "zh" ? "现在参与，影响第一版" : "Join now and shape the first version"}</h2>
          <p className="section-copy">
            {locale === "zh"
              ? "问卷约需 5 分钟，覆盖你的使用习惯、真实痛点、部署偏好和服务期待，同时作为 Beta 用户筛选参考。入选用户有机会提前体验产品。"
              : "The survey takes about five minutes and covers usage habits, real pain points, deployment preferences, and service expectations. Responses also inform early access."}
          </p>
          <ul className="benefit-list">
            <li>{locale === "zh" ? "入选用户有机会提前体验产品，体验周期以活动规则为准。" : "Selected users may get early access; terms govern the access period."}</li>
            <li>{locale === "zh" ? "有效问题反馈可获得对应奖励，具体以活动规则为准。" : "Valid feedback may receive rewards according to the activity rules."}</li>
            <li>{locale === "zh" ? "用户信息严格保密，仅用于产品研究和 Beta 招募。" : "User information is confidential and used only for product research and Beta recruitment."}</li>
          </ul>
          <div className="hero-actions">
            <a className="button primary" href="./beta/">{locale === "zh" ? "参与调研" : "Join research"}</a>
            <a className="button ghost" href={siteConfig.surveyUrl} target="_blank" rel="noopener noreferrer">
              {locale === "zh" ? "直接打开问卷" : "Open survey"}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function Models() {
  const { locale } = useI18n();

  return (
    <section className="section" id="models" aria-labelledby="models-title">
      <div className="container">
        <div className="split">
          <div className="split-copy">
            <p className="eyebrow">{locale === "zh" ? "模型研究" : "Model research"}</p>
            <h2 id="models-title">{locale === "zh" ? "产品验证反哺模型研究。" : "Product validation feeds model research."}</h2>
            <p>
              {locale === "zh"
                ? "Prima 在真实工作流里验证连续性；Oxygen AI 把验证出的秩序带回模型层。一边减少返工，一边让推理、记忆与执行逐渐长成同一套结构。"
                : "Prima validates continuity in real workflows; Oxygen AI returns that order to the model layer while reducing rework and aligning reasoning, memory, and execution."}
            </p>
            <a className="text-link" href="https://oxygenai.top/progress/" target="_blank" rel="noopener noreferrer">
              {locale === "zh" ? "查看模型进展与研究" : "See model progress and research"}&nbsp;&rarr;
            </a>
          </div>
          <ResearchArtwork />
        </div>
      </div>
    </section>
  );
}
