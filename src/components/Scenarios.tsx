const scenarios = [
  {
    title: "多文件编程与 Bug 定位",
    audience: "工程团队 · 日常开发",
    problems: [
      "改一个接口定义，下游五个文件都要跟着动，Agent 忘记改第三个。",
      "上一轮刚确认的约束，十轮对话后再问一遍，答案完全相反。",
    ],
    prima: "Prima 记住本轮会话里你确认的约束（如“保持现有 API 兼容”），在每次改动前重新校验，发现冲突时主动停下来问你，而不是默默改完。",
  },
  {
    title: "数据分析与研究汇总",
    audience: "分析师 · 研究员",
    problems: [
      "反复清理同一份数据，每次都要重新说明列名和口径。",
      "结论文档改到第 8 版，早就忘了第 2 版为什么被否决。",
    ],
    prima: "Prima 把你的口径、术语和被否决的结论存进分层记忆，引用时能区分“当前采纳”和“已废弃”，减少无效返工。",
  },
  {
    title: "写作、文档与知识工作",
    audience: "作者 · 内容团队",
    problems: [
      "同一份报告换个角度写，语气和术语就变了。",
      "写到后半段，Agent 忘记了你前半段确立的论点结构。",
    ],
    prima: "Prima 记录你的写作偏好（正式度、术语表、受众），在长文档里保持章节间的论点一致性，而不是每次都从零开始。",
  },
];

export default function Scenarios() {
  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="scenarios-hero-title">
        <p className="eyebrow">使用场景</p>
        <h1 id="scenarios-hero-title">先服务长任务，而不是所有任务。</h1>
        <p className="lead" style={{maxWidth: "56ch"}}>
          Prima 首发聚焦三类最常见的连续性断裂：多文件工程、长数据链路和长文档协作。这些不是行业口号，而是我们调研里反复出现的痛点。
        </p>
      </section>

      <section className="container about-section" aria-labelledby="scenario-list-title">
        <div className="card-grid">
          {scenarios.map((item) => (
            <article className="card" key={item.title} style={{display: "grid", gap: "16px", alignContent: "start"}}>
              <div>
                <p className="tag gray">{item.audience}</p>
                <h3>{item.title}</h3>
              </div>
              <div>
                <p style={{fontWeight: 600, marginBottom: "8px"}}>今天的断裂</p>
                <ul style={{paddingLeft: "20px", margin: 0, color: "var(--ink-2)", fontSize: ".95rem", lineHeight: 1.65}}>
                  {item.problems.map((p) => <li key={p} style={{marginBottom: "6px"}}>{p}</li>)}
                </ul>
              </div>
              <div>
                <p style={{fontWeight: 600, marginBottom: "8px", color: "var(--blue)"}}>Prima 想做的事</p>
                <p style={{margin: 0}}>{item.prima}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="scenario-cta-title">
        <div className="contact-panel">
          <div>
            <h2 id="scenario-cta-title">你的场景没有被覆盖？</h2>
            <p>告诉我们你工作中最容易返工的环节。你的反馈会直接影响我们下一轮打磨的重点。</p>
          </div>
          <a className="button primary" href="../beta/">参与 Beta 调研</a>
        </div>
      </section>
    </main>
  );
}
