import { siteConfig } from "../config";
import HeroArtwork from "./HeroArtwork";
import { painPoints, capabilities, scenarios } from "../data/content";
import { ContinuityArtwork, ResearchArtwork } from "./SectionArtwork";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroArtwork />
      <div className="container">
        <div className="hero-inner">
          <p className="eyebrow">{siteConfig.slogan}</p>
          <h1 id="hero-title">长任务不跑偏，<br />少返工。</h1>
          <p className="hero-sub">
            Prima 把多文件编程、数据分析与长文档写作里的约束、决策和失败教训组织成连续的工作记忆，让复杂任务在前中后段都保持同一条主线。
          </p>
          <div className="hero-actions" style={{justifyContent: "flex-start"}}>
            <p className="stage-pill">{siteConfig.betaStatus}</p>
          </div>
          <div className="hero-actions" style={{justifyContent: "flex-start", marginTop: "20px"}}>
            <a className="button primary" href="./beta/">参与调研</a>
            <a className="button ghost" href="#product">了解产品方向</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Product() {
  return (
    <section className="section" id="product" aria-labelledby="product-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">痛点</p>
          <h2 id="product-title">AI Agent 的问题，不只是不够聪明。</h2>
          <p className="section-copy">真实工作里，上下文持续存在，决策也会累积。一个好的 Agent 需要理解这些连续性。</p>
        </div>
        <div className="card-grid reveal">
          {painPoints.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Capabilities() {
  return (
    <section className="section" id="capabilities" aria-labelledby="capabilities-title">
      <div className="container">
        <div className="split reveal">
          <div className="split-copy">
            <p className="eyebrow">核心能力</p>
            <h2 id="capabilities-title">四条正在打磨的方向</h2>
            <p className="lead">四条方向都在打磨中，好不好用，由第一批用户说了算。</p>
          </div>
          <ContinuityArtwork />
        </div>
        <div className="card-grid reveal">
          {capabilities.map((item) => (
            <article className="card" key={item.title}>
              <p className="tag mint">{item.status}</p>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Scenarios() {
  return (
    <section className="section" id="scenarios" aria-labelledby="scenarios-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">首发场景</p>
          <h2 id="scenarios-title">先服务长任务，而不是所有任务。</h2>
        </div>
        <div className="card-grid reveal">
          {scenarios.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const updates = [
  {
    date: "2026.09",
    tag: "定价",
    title: "三条产品线，十四个档位公开",
    copy: "SparkPlan 覆盖个人验证，PrimaPlan 服务团队长任务，Credit+ 提供灵活加购。",
    href: "./pricing/",
    external: false,
  },
  {
    date: "2026.09",
    tag: "研究",
    title: "模型研究边界更新",
    copy: "Oxygen AI 公开三条基础路线的目标与阶段；完整机制仍留在论文与发布说明之后。",
    href: "https://oxygenai.top/progress/",
    external: true,
  },
  {
    date: "2026.09",
    tag: "共创",
    title: "Beta 调研持续进行",
    copy: "我们继续寻找真实长任务场景，尤其是多文件协作、数据链路和长文档工作中的断点。",
    href: "./beta/",
    external: false,
  },
];

export function Updates() {
  return (
    <section className="section alt" id="updates" aria-labelledby="updates-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">最新动态</p>
          <h2 id="updates-title">进展不靠形容词。</h2>
          <p className="section-copy">每一轮更新都指向一个可检查的页面、阶段或调研入口。</p>
        </div>
        <div className="card-grid reveal">
          {updates.map((item) => (
            <article className="card update-card" key={item.title}>
              <div className="news-meta">
                <span className="news-date">{item.date}</span>
                <span className="tag gray">{item.tag}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              {item.external ? (
                <a className="text-link" href={item.href} target="_blank" rel="noopener noreferrer">查看详情&nbsp;&rarr;</a>
              ) : (
                <a className="text-link" href={item.href}>查看详情&nbsp;&rarr;</a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StageAndBeta() {
  return (
    <>
      <section className="section" id="stage" aria-labelledby="stage-title">
        <div className="container reveal">
          <p className="eyebrow">产品阶段与共创</p>
          <h2 id="stage-title">我们正在打磨第一版，也想先听你说。</h2>
          <p className="section-copy">
            Prima 还没有开放注册。我们先从真实现场开始：识别任务在哪里断裂、决策在哪里丢失，再决定第一版最该守住哪些秩序。
          </p>
        </div>
      </section>
      <section className="cta-section" id="beta" aria-labelledby="beta-title">
        <div className="container reveal" style={{textAlign: "center"}}>
          <p className="eyebrow">Beta 调研</p>
          <h2 id="beta-title">现在参与，影响第一版</h2>
          <p className="section-copy">
            问卷约需 5 分钟，覆盖你的使用习惯、真实痛点、部署偏好和服务期待，同时作为 Beta 用户筛选参考。入选用户有机会提前体验产品。
          </p>
          <ul className="benefit-list">
            <li>入选用户有机会提前体验产品，体验周期以活动规则为准。</li>
            <li>有效问题反馈可获得对应奖励，具体以活动规则为准。</li>
            <li>用户信息严格保密，仅用于产品研究和 Beta 招募。</li>
          </ul>
          <div className="hero-actions">
            <a className="button primary" href="./beta/">参与调研</a>
            <a className="button ghost" href={siteConfig.surveyUrl} target="_blank" rel="noopener noreferrer">
              直接打开问卷
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function Models() {
  return (
    <section className="section" id="models" aria-labelledby="models-title">
      <div className="container">
        <div className="split">
          <div className="split-copy">
            <p className="eyebrow">模型研究</p>
            <h2 id="models-title">产品验证反哺模型研究。</h2>
            <p>
              Prima 在真实工作流里验证连续性；Oxygen AI 把验证出的秩序带回模型层。一边减少返工，一边让推理、记忆与执行逐渐长成同一套结构。
            </p>
            <a className="text-link" href="https://oxygenai.top/progress/" target="_blank" rel="noopener noreferrer">
              查看模型进展与研究&nbsp;&rarr;
            </a>
          </div>
          <ResearchArtwork />
        </div>
      </div>
    </section>
  );
}

