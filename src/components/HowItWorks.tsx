import detailImage from "../../assets/images/detail.jpg";

const layers = [
  {
    title: "快答层",
    copy: "一次简单的澄清或短句改写不需要深想。Prima 会判断哪些请求可以直接响应，避免浪费你的时间。",
  },
  {
    title: "深想层",
    copy: "当任务涉及多文件修改、方案取舍或复杂推理时，Prima 主动放慢速度，分阶段验证、回看并修正计划。",
  },
  {
    title: "记忆层",
    copy: "偏好、项目状态、既有决策和失败教训被分层存储，模型知道“该记住什么”以及“该在什么时候想起什么”。",
  },
];

const steps = [
  {
    title: "01 · 判断",
    copy: "进入任务前，Prima 先评估复杂度：需要几个文件、几轮验证、是否有前置约束。",
  },
  {
    title: "02 · 规划",
    copy: "把长任务拆成可复核的步骤，标注每一步的输入、预期结果和回退条件。",
  },
  {
    title: "03 · 执行",
    copy: "按计划推进，过程中持续校验是否偏离目标，遇到冲突时主动停下来确认。",
  },
  {
    title: "04 · 复盘",
    copy: "记录哪些决策成立、哪些假设被推翻，沉淀为下一次任务可以调用的长期记忆。",
  },
];

export default function HowItWorks() {
  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="how-hero-title">
        <p className="eyebrow">工作方式</p>
        <h1 id="how-hero-title">该快则快，该深则深。</h1>
        <p className="lead" style={{maxWidth: "56ch"}}>
          Prima 不是把“多想几步”当作一个开关，而是在每次任务里判断：此刻需要多深的推理、多少上下文，以及哪些记忆值得被调用。
        </p>
      </section>

      <section className="container about-section" aria-labelledby="layer-title">
        <div className="split">
          <div className="split-copy">
            <p className="eyebrow">推理分层</p>
            <h2 id="layer-title">三种思考方式，而不是一个固定速度。</h2>
            <p>
              我们不想让简单问题被拖慢，也不想复杂问题被草率对待。Prima 的核心假设是：推理深度应该跟任务复杂度匹配，而不是跟着对话轮数增长。
            </p>
          </div>
          <figure className="split-visual">
            <img
              src={detailImage}
              alt="冷白玻璃与薄荷蓝折射光，表达 Prima 的分层推理结构"
              width={1280}
              height={800}
              loading="lazy"
            />
          </figure>
        </div>
        <div className="card-grid" style={{marginTop: "48px"}}>
          {layers.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="process-title">
        <div className="section-head">
          <p className="eyebrow">执行流程</p>
          <h2 id="process-title">长任务的四步循环。</h2>
        </div>
        <div className="timeline">
          {steps.map((step) => (
            <div className="timeline-item" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="how-cta-title">
        <div className="contact-panel">
          <div>
            <h2 id="how-cta-title">想试试这套工作方式？</h2>
            <p>我们正在邀请真实用户参与 Beta，验证这套设计是否真的能减少返工。</p>
          </div>
          <a className="button primary" href="../beta/">立即参与调研</a>
        </div>
      </section>
    </main>
  );
}
