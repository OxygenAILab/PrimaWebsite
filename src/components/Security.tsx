const principles = [
  {
    title: "数据边界明确",
    copy: "共创阶段的数据仅用于服务与产品研究。敏感工作区与私有资料不会被当作默认训练素材。",
  },
  {
    title: "记忆可控",
    copy: "分层记忆的设计目标之一是让用户可以查看、修正与清除记忆内容，而不是一个不可见的黑箱。",
  },
  {
    title: "部署形态分层",
    copy: "我们在探索本地、私有区与混合部署的适用场景，让敏感工作有更合适的选择。",
  },
  {
    title: "诚实标注阶段",
    copy: "安全能力与边界一样，会随阶段明确标注。我们不会把规划中的能力描述成已经可用。",
  },
];

export default function Security() {
  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="sec-hero-title">
        <p className="eyebrow">安全与数据边界</p>
        <h1 id="sec-hero-title">你的工作区，边界由你。</h1>
        <p className="lead" style={{ maxWidth: "56ch" }}>
          长任务意味着 Agent 会接触更多上下文。我们把数据边界当作产品的第一性设计，而不是事后补丁。
        </p>
      </section>

      <section className="container about-section" aria-labelledby="principles-title">
        <div className="card-grid">
          {principles.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="sec-note-title">
        <div className="section-head">
          <p className="eyebrow">当前状态</p>
          <h2 id="sec-note-title">诚实地说。</h2>
        </div>
        <div className="stack-cards">
          <article className="card">
            <h3>还在演进</h3>
            <p>以上是当前的设计承诺与探索方向。随着产品阶段推进，我们会在这里持续更新实现进度，并用明确的语言标注已落地与规划中的部分。</p>
          </article>
        </div>
      </section>
    </main>
  );
}
