import { useI18n } from "../i18n";

export default function Download() {
  const { locale } = useI18n();

  return (
    <main id="main" className="about-page download-page">
      <section className="container about-hero" aria-labelledby="download-page-title">
        <p className="eyebrow">{locale === "zh" ? "下载" : "Download"}</p>
        <h1 id="download-page-title">{locale === "zh" ? "下载入口暂未开放。" : "Downloads are not open yet."}</h1>
        <p className="lead" style={{ maxWidth: "62ch" }}>
          {locale === "zh"
            ? "这里会列出可用的安装包与更新说明；当前产品仍在早期共创阶段，还没有开放下载。"
            : "This page will list available packages and release notes. The product remains in early co-creation and downloads are not open yet."}
        </p>
      </section>

      <section className="container about-section" aria-labelledby="download-list-title">
        <div className="section-head">
          <p className="eyebrow">{locale === "zh" ? "当前状态" : "Current status"}</p>
          <h2 id="download-list-title">{locale === "zh" ? "暂无下载项。" : "No download items yet."}</h2>
        </div>
        <div className="stack-cards">
          <article className="card">
            <h3>{locale === "zh" ? "保留占位" : "Reserved"}</h3>
            <p>
              {locale === "zh"
                ? "我们不在没有可用构建时提供占位下载。页面会随产品阶段同步更新。"
                : "We do not provide placeholder downloads without an available build. This page updates with the product stage."}
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
