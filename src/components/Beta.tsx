import { siteConfig } from "../config";

export default function BetaSection() {
  return (
    <main id="main" className="beta-page">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Prima Beta</p>
          <h1 id="beta-page-title">填写问卷，申请 Beta 资格。</h1>
          <p className="section-copy">
            问卷约需 5 分钟，用于了解你的使用习惯、真实痛点、部署偏好和服务期待，同时作为 Beta 用户筛选参考。提交后，我们会结合反馈安排体验资格。
          </p>
        </div>
        <div className="survey-shell reveal">
          <div className="survey-head">
            <div>
              <p className="tag">{siteConfig.betaStatus}</p>
              <h2>Prima 用户调研</h2>
            </div>
            <a className="button primary compact" href={siteConfig.surveyUrl} target="_blank" rel="noopener noreferrer">
              在新窗口填写
            </a>
          </div>
          <div className="survey-frame">
            <iframe
              src={siteConfig.surveyUrl}
              title="Prima Beta 调研问卷"
              loading="lazy"
              allow="fullscreen"
            />
          </div>
          <p className="survey-note">
            如果问卷因安全策略无法嵌入，请使用右上角“在新窗口填写”打开原问卷。你的反馈仅用于产品研究和 Beta 招募。
          </p>
        </div>
      </div>
    </main>
  );
}
