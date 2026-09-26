import SplitTitle from "./SplitTitle";
import { useI18n } from "../i18n";
import type { Localized } from "../data/content";

type LegalSection = { title: Localized; copy: Localized };

/* 两页法务共用一个版式：只有文案不同 */
function LegalPage({
  id,
  eyebrow,
  lead,
  stress,
  intro,
  label,
  sections,
}: {
  id: string;
  eyebrow: Localized;
  lead: Localized;
  stress: Localized;
  intro: Localized;
  label: Localized;
  sections: LegalSection[];
}) {
  const { locale, pick } = useI18n();

  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby={`${id}-title`}>
        <p className="eyebrow">{pick(eyebrow)}</p>
        <SplitTitle id={`${id}-title`} lead={lead} stress={stress} />
        <p className="lead">{pick(intro)}</p>
      </section>

      <section className="container about-section" aria-label={pick(label)}>
        <div className="card-grid">
          {sections.map((item) => (
            <article className="card" key={item.title.en}>
              <h3>{item.title[locale]}</h3>
              <p>{item.copy[locale]}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const privacySections: LegalSection[] = [
  {
    title: { zh: "当前数据范围", en: "Current data scope" },
    copy: {
      zh: "共创阶段的数据仅用于服务运行、产品研究和 Beta 招募。敏感工作区与私有资料不会被当作默认训练素材。",
      en: "Co-creation data is used only to run the service, support product research, and recruit Beta users. Sensitive workspaces and private material are not default training data.",
    },
  },
  {
    title: { zh: "记忆与控制", en: "Memory and control" },
    copy: {
      zh: "分层记忆的设计目标是让用户可以查看、修正与清除记忆内容。我们会随着产品推进继续补充具体控制入口。",
      en: "Layered memory is designed so users can review, correct, and delete stored content. We will continue to add concrete controls as the product advances.",
    },
  },
  {
    title: { zh: "联系与删除", en: "Contact and deletion" },
    copy: {
      zh: "如需了解数据使用边界、申请删除或纠正内容，请写信到 prima@oxygenai.top。我们会在确认身份后按最小必要范围处理。",
      en: "For data-boundary questions, deletion, or correction requests, email prima@oxygenai.top. We process requests with the minimum scope needed after confirming identity.",
    },
  },
];

export function Privacy() {
  return (
    <LegalPage
      id="privacy"
      eyebrow={{ zh: "隐私", en: "Privacy" }}
      lead={{ zh: "数据边界，", en: "Data boundaries," }}
      stress={{ zh: "先说清楚。", en: "stated up front." }}
      intro={{
        zh: "本页说明当前阶段的隐私口径。产品仍在早期共创阶段，正式协议会在可用前发布。",
        en: "This page explains the current privacy posture. The product remains in early co-creation; formal agreements will be published before availability.",
      }}
      label={{ zh: "隐私条目", en: "Privacy items" }}
      sections={privacySections}
    />
  );
}

const termsSections: LegalSection[] = [
  {
    title: { zh: "阶段口径", en: "Stage terms" },
    copy: {
      zh: "页面中的能力描述用于说明当前方向，不代表产品已经可用。可用性与资格以正式开通通知为准。",
      en: "Capability descriptions explain current direction and do not imply availability. Availability and eligibility follow activation notices.",
    },
  },
  {
    title: { zh: "反馈使用", en: "Feedback use" },
    copy: {
      zh: "你提交的问卷与访谈反馈仅用于产品研究、体验改进和 Beta 招募。我们不会公开展示个人信息。",
      en: "Survey and interview feedback is used only for product research, experience improvement, and Beta recruitment. Personal information is not publicly displayed.",
    },
  },
  {
    title: { zh: "服务边界", en: "Service boundaries" },
    copy: {
      zh: "早期共创阶段的服务能力、奖励与体验安排可能随阶段调整。如有变更，我们会在相关入口说明。",
      en: "Early-stage service capabilities, rewards, and access arrangements may change by phase. Changes are described at the relevant entry point.",
    },
  },
];

export function Terms() {
  return (
    <LegalPage
      id="terms"
      eyebrow={{ zh: "条款", en: "Terms" }}
      lead={{ zh: "当前阶段的", en: "Terms of use" }}
      stress={{ zh: "使用口径。", en: "for this stage." }}
      intro={{
        zh: "本页汇总早期共创阶段的基本口径。正式服务条款与协议会在产品可用前发布。",
        en: "This page summarizes the current co-creation terms. Formal service terms and agreements will be published before availability.",
      }}
      label={{ zh: "条款条目", en: "Terms items" }}
      sections={termsSections}
    />
  );
}
