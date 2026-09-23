const phases = [
  {
    title: "现在 · Beta 调研",
    status: "进行中",
    tone: "mint",
    items: [
      "收集真实用户的长任务痛点与使用习惯",
      "验证自适应推理深度与分层记忆的产品假设",
      "确定第一版产品的核心能力边界",
    ],
  },
  {
    title: "下一步 · 内部 Alpha",
    status: "筹备中",
    tone: "peri",
    items: [
      "向入选调研用户开放小范围内测",
      "打磨长任务执行一致性与记忆召回",
      "建立共创反馈通道与迭代节奏",
    ],
  },
  {
    title: "之后 · 公开 Beta",
    status: "规划中",
    tone: "gray",
    items: [
      "扩大测试范围并沉淀可量化的体验指标",
      "探索本地与混合部署的适用场景",
      "反哺 Oxygen 模型矩阵的架构设计",
    ],
  },
];

export default function Roadmap() {
  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="roadmap-hero-title">
        <p className="eyebrow">路线图</p>
        <h1 id="roadmap-hero-title">我们按阶段走，不跳步。</h1>
        <p className="lead" style={{ maxWidth: "56ch" }}>
          Prima 的每个阶段都以「可验证的进展」为推进条件。这里的计划是当前视角，会随调研反馈调整。
        </p>
      </section>

      <section className="container about-section" aria-labelledby="phases-title">
        <div className="card-grid">
          {phases.map((phase) => (
            <article className="card" key={phase.title}>
              <p className={`tag ${phase.tone}`}>{phase.status}</p>
              <h3>{phase.title}</h3>
              <ul className="phase-list">
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="roadmap-cta-title">
        <div className="contact-panel">
          <div>
            <h2 id="roadmap-cta-title">想影响这个路线图？</h2>
            <p>填写 Beta 调研，告诉我们你最需要的能力。调研反馈会直接决定优先级。</p>
          </div>
          <a className="button primary" href="../beta/">参与 Beta 调研</a>
        </div>
      </section>
    </main>
  );
}
