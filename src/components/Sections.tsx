import { siteConfig } from "../config";
import detailImage from "../../assets/images/detail.jpg";

const painPoints = [
  {
    title: "推理深度不该固定",
    copy: "简单问题被拖慢，复杂问题又可能想得不够深。你被迫在速度、成本和质量之间反复取舍。",
  },
  {
    title: "协作背景会丢失",
    copy: "偏好、项目目标和既有决策无法持续积累，每次对话都像从零开始。",
  },
  {
    title: "长任务容易跑偏",
    copy: "多文件、多轮次或长项目里，Agent 忘记约束、重复返工，甚至让一次小修改变成连带失控。",
  },
];

const capabilities = [
  {
    title: "自适应推理深度",
    copy: "根据任务复杂度在快答与深想之间切换，让该快的任务不等待，该深的任务不草率。",
    status: "核心方向",
  },
  {
    title: "分层长期记忆",
    copy: "组织个人偏好、项目背景、关键决策和失败教训，让协作随着使用变得更省心。",
    status: "正在打磨",
  },
  {
    title: "长任务执行一致性",
    copy: "在长对话和长项目中保持目标、约束与已确认事实一致，减少重复解释和连带返工。",
    status: "正在打磨",
  },
  {
    title: "本地 / 混合数据边界",
    copy: "探索敏感工作区、私有资料和长期记忆的更清晰边界，给用户更多控制感。",
    status: "探索中",
  },
];

const scenarios = [
  {
    title: "多文件编程与 Bug 定位",
    copy: "保持仓库结构、修改意图和验证结果连续可见，减少改一处伤一处。",
  },
  {
    title: "数据分析与研究汇总",
    copy: "在长资料、反复提问和结论更新中保留关键判断，让输出更容易复核。",
  },
  {
    title: "写作、文档与知识工作",
    copy: "记住你的语气、术语、受众和项目阶段，把持续协作而不是单次生成作为基础。",
  },
];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-inner reveal">
          <p className="eyebrow">{siteConfig.brandDisplayName}</p>
          <h1 id="hero-title">让 Agent 该快则快，该深则深，越用越懂你的工作。</h1>
          <p className="hero-sub">
            Prima 是面向真实长任务的 AI Agent 方向，探索自适应推理、分层长期记忆与更可靠的持续协作。
          </p>
          <div className="hero-actions" style={{justifyContent: "flex-start"}}>
            <p className="stage-pill">{siteConfig.betaStatus}</p>
          </div>
          <div className="hero-actions" style={{justifyContent: "flex-start", marginTop: "20px"}}>
            <a className="button primary" href="./beta/">立即参与调研</a>
            <a className="button ghost" href="#product">了解产品方向</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Product() {
  return (
    <section className="section alt" id="product" aria-labelledby="product-title">
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
    <section className="section dark" id="capabilities" aria-labelledby="capabilities-title">
      <div className="container">
        <div className="split reveal">
          <div className="split-copy">
            <p className="eyebrow">核心能力</p>
            <h2 id="capabilities-title">四条正在打磨的方向</h2>
            <p className="lead">这些不是已经完成的卖点，而是我们愿意和你一起验证的产品假设。</p>
          </div>
          <figure className="split-visual">
            <img
              src={detailImage}
              alt="冷白玻璃与薄荷蓝折射光，表达 Prima 的自适应推理与分层记忆"
              width={1280}
              height={720}
              loading="lazy"
            />
          </figure>
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

export function Stage() {
  return (
    <section className="section alt" id="stage" aria-labelledby="stage-title">
      <div className="container reveal">
        <p className="eyebrow">产品阶段</p>
        <h2 id="stage-title">我们正在打磨第一版，也想先听你说。</h2>
        <p className="section-copy">
          Prima 还没有开放注册。我们希望先理解真实用户如何使用 Agent、哪里最容易返工，以及什么样的记忆和推理方式真正有价值。
        </p>
        <div className="hero-actions">
          <a className="button primary" href="./beta/">立即参与调研</a>
        </div>
      </div>
    </section>
  );
}

export function Models() {
  return (
    <section className="section" id="models" aria-labelledby="models-title">
      <div className="container">
        <div className="split">
          <div className="split-copy">
            <p className="eyebrow">模型矩阵</p>
            <h2 id="models-title">Prima 背后的模型研究。</h2>
            <p>
              Oxygen AI 正在构建两条正交的模型路线：序列生成路线的 OxygenTBM Avenues 与 Terrace，以及隐状态动力学的 OxygenDCM N1 和校准决策的 OxygenCDM T1 / V1。Prima 的产品验证会直接反哺这些架构的设计。
            </p>
            <a className="text-link" href="https://oxygenai.top/model/" target="_blank" rel="noopener noreferrer">
              查看模型矩阵&nbsp;&rarr;
            </a>
          </div>
          <figure className="split-visual">
            <img
              src={detailImage}
              alt="日光折射的抽象视觉，代表 Oxygen AI 的模型研究"
              width={1280}
              height={800}
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

export function Beta() {
  return (
    <section className="cta-section" id="beta" aria-labelledby="beta-title">
      <div className="container reveal" style={{textAlign: "center"}}>
        <p className="eyebrow">Beta 调研</p>
        <h2 id="beta-title">参与调研，一起定义下一代 AI Agent</h2>
        <p className="section-copy">
          我们正在邀请 AI Agent 用户参与 Prima 前期调研。问卷约需 5 分钟，用于了解你的使用习惯、真实痛点以及对未来服务形态的期待，同时作为 Beta 用户筛选参考。
        </p>
        <ul className="benefit-list">
          <li>入选用户有机会提前体验产品，预计体验周期为 1 至 3 个月。</li>
          <li>有效问题反馈可获得对应奖励或京东 E 卡，具体以活动规则为准。</li>
          <li>用户信息严格保密，仅用于产品研究和 Beta 招募。</li>
        </ul>
        <div className="hero-actions">
          <a className="button primary" href="./beta/">立即参与调研</a>
          <a className="button ghost" href={siteConfig.surveyUrl} target="_blank" rel="noopener noreferrer">
            直接打开问卷
          </a>
        </div>
      </div>
    </section>
  );
}
