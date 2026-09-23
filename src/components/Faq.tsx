const groups = [
  {
    title: "产品与阶段",
    items: [
      { q: "Prima 现在可以用了吗？", a: "还没有开放注册。我们正在通过 Beta 调研筛选早期用户，入选后会单独安排体验。" },
      { q: "免费吗？", a: "早期体验阶段不收费。正式阶段的收费形态会结合产品完成度再公布。" },
      { q: "和一般的聊天助手有什么区别？", a: "Prima 聚焦长任务：多文件工程、长文档、数据分析。推理深度跟任务复杂度匹配，而不是固定速度。" },
    ],
  },
  {
    title: "记忆与数据",
    items: [
      { q: "会记住我的所有对话吗？", a: "分层记忆会区分「该记住什么」和「该在什么时候想起什么」。偏好、项目状态和关键决策会被分层组织，你会有查看与控制方式。" },
      { q: "我的数据用来训练模型吗？", a: "不会。共创阶段的数据仅用于服务与产品研究，边界会写入协议。" },
    ],
  },
  {
    title: "参与方式",
    items: [
      { q: "调研要多久？", a: "约 5 分钟。问题围绕使用习惯、真实痛点、部署偏好和服务期待。" },
      { q: "多长时间能得到回复？", a: "我们会结合反馈安排体验资格，节奏以邮件通知为准。" },
    ],
  },
];

export default function Faq() {
  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="faq-hero-title">
        <p className="eyebrow">常见问题</p>
        <h1 id="faq-hero-title">把话说清楚。</h1>
        <p className="lead" style={{ maxWidth: "56ch" }}>
          关于阶段、数据边界和参与方式，我们在这里直接回答。没有覆盖到的问题可以写信来问。
        </p>
      </section>

      {groups.map((group) => (
        <section className="container about-section" key={group.title} aria-labelledby={`faq-${group.title}-title`}>
          <div className="section-head">
            <p className="eyebrow">{group.title}</p>
          </div>
          <div className="stack-cards">
            {group.items.map((item) => (
              <article className="card" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
