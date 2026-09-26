import { siteConfig } from "../config";
import { useI18n } from "../i18n";

export default function BetaSection() {
  const { locale } = useI18n();

  return (
    <main id="main" className="beta-page">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Prima Beta</p>
          <h1 id="beta-page-title">{locale === "zh" ? "填写问卷，申请 Beta 资格。" : "Complete the survey to apply for Beta."}</h1>
          <p className="section-copy">
            {locale === "zh"
              ? "问卷约需 5 分钟，用于了解你的使用习惯、真实痛点、部署偏好和服务期待，同时作为 Beta 用户筛选参考。提交后，我们会结合反馈安排体验资格。"
              : "The survey takes about five minutes. It covers usage habits, real pain points, deployment preferences, and service expectations, and also informs Beta selection."}
          </p>
        </div>
        <div className="survey-shell reveal">
          <div className="survey-head">
            <div>
              <p className="tag">{siteConfig.betaStatus[locale]}</p>
              <h2>{locale === "zh" ? "Prima 用户调研" : "Prima user research"}</h2>
            </div>
            <a className="button primary compact" href={siteConfig.surveyUrl} target="_blank" rel="noopener noreferrer">
              {locale === "zh" ? "在新窗口填写" : "Open in a new tab"}
            </a>
          </div>
          <div className="survey-frame">
            <iframe
              src={siteConfig.surveyUrl}
              title={locale === "zh" ? "Prima Beta 调研问卷" : "Prima Beta research survey"}
              loading="lazy"
              allow="fullscreen"
            />
          </div>
          <p className="survey-note">
            {locale === "zh"
              ? "如果问卷因安全策略无法嵌入，请使用右上角“在新窗口填写”打开原问卷。你的反馈仅用于产品研究和 Beta 招募。"
              : "If security policy blocks the embed, use the top-right action to open the original survey. Feedback is used only for product research and Beta recruitment."}
          </p>
        </div>
      </div>
    </main>
  );
}
