import { siteConfig } from "../config";

const principles = [
  {
    title: "真实长任务优先",
    copy: "我们不把“能聊天”当作终点，而是关注多文件工程、长文档、数据分析和研究汇总里能否稳定完成。",
  },
  {
    title: "阶段透明",
    copy: "Prima 仍在早期共创阶段。我们没有把探索中的能力包装成已上线功能。",
  },
  {
    title: "反馈驱动",
    copy: "问卷、访谈和 Beta 反馈会直接影响推理、记忆、数据边界和界面优先级。",
  },
];

const boundaries = [
  {
    title: "自适应用推理",
    copy: "探索任务复杂度感知、快答与深想的切换，以及执行前的自我校验。",
  },
  {
    title: "分层长期记忆",
    copy: "研究偏好、项目状态、决策和失败教训如何被安全地组织与调用。",
  },
  {
    title: "数据边界",
    copy: "评估本地、私有区和混合部署的适用场景，不把敏感工作区当作默认训练素材。",
  },
];

export default function About() {
  return (
    <main id="main" className="about-page">
      <section className="container page-hero" aria-labelledby="about-page-title">
        <p className="eyebrow">关于项目</p>
        <h1 id="about-page-title">Prima 是一个正在与用户共同定义的产品。</h1>
        <p className="section-copy">
          Prima 面向真实长任务，探索自适应推理、分层长期记忆和更可靠的执行一致性。当前项目由 Oxygen AI 支持，仍处于早期共创阶段。
        </p>
        <div className="hero-actions">
          <a className="button primary" href="../beta/">参与 Beta 调研</a>
          <a className="button ghost" href={siteConfig.oxygenUrl} target="_blank" rel="noopener noreferrer">了解 Oxygen AI</a>
        </div>
      </section>

      <section className="container about-section" aria-labelledby="principles-title">
        <h2 id="principles-title">我们关心的三件事</h2>
        <div className="three-grid">
          {principles.map((item) => (
            <article className="feature-tile" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="boundary-title">
        <div className="section-head">
          <p className="eyebrow">研究边界</p>
          <h2 id="boundary-title">诚实标注阶段，不夸大能力。</h2>
        </div>
        <div className="three-grid">
          {boundaries.map((item) => (
            <article className="feature-tile" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="contact-title">
        <div className="contact-panel">
          <div>
            <h2 id="contact-title">想影响产品方向？</h2>
            <p>填写约 5 分钟的问卷，告诉我们你的真实场景、痛点和部署期待。入选用户有机会进入 Beta。</p>
          </div>
          <a className="button primary" href="../beta/">立即参与调研</a>
        </div>
      </section>
    </main>
  );
}
