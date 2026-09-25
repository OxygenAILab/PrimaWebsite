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
          <h1 id="hero-title">长任务不跑偏，<br />少返工。</h1>
          <p className="hero-sub">
            Prima 是面向真实长任务的 AI Agent：多文件编程、数据分析、长文档写作里，它记住你确认过的约束和决策，在长项目里保持前后一致。
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

export function StageAndBeta() {
  return (
    <>
      <section className="section" id="stage" aria-labelledby="stage-title">
        <div className="container reveal">
          <p className="eyebrow">产品阶段与共创</p>
          <h2 id="stage-title">我们正在打磨第一版，也想先听你说。</h2>
          <p className="section-copy">
            Prima 还没有开放注册。我们先从调研开始：了解你如何使用 Agent、哪里最容易返工，以及什么样的记忆和推理方式真正有价值。你的反馈会直接决定第一版的功能取舍。
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
              Oxygen AI 用 Prima 的真实工作流验证长任务连续性。哪些记忆、推理深度和执行检查值得进入模型层，先看产品证据，再进入架构研究。
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

