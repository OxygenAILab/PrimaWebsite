import { useState } from "react";
import {
  pricingFamilies,
  pricingGroups,
  pricingPlans,
  pricingRules,
  type PlanFamily,
} from "../data/pricing";
import BetaCta from "./BetaCta";
import SplitTitle, { PhraseTitle } from "./SplitTitle";
import { useI18n } from "../i18n";
import type { Localized } from "../data/content";

/* 卡片与对照表共用同一份规格字段，避免两处各写一遍标签 */
const specFields: Array<{
  key: "models" | "rateLimit" | "parallelLimit" | "mediaRate";
  label: Localized;
}> = [
  { key: "models", label: { zh: "模型权益", en: "Model access" } },
  { key: "rateLimit", label: { zh: "限速", en: "Rate limit" } },
  { key: "parallelLimit", label: { zh: "并行限制", en: "Parallel limit" } },
  { key: "mediaRate", label: { zh: "媒体生成倍率", en: "Media multiplier" } },
];

const tableHeads: Array<{ key: string; label: Localized }> = [
  { key: "family", label: { zh: "计划", en: "Plan" } },
  { key: "tier", label: { zh: "档位", en: "Tier" } },
  { key: "price", label: { zh: "标价", en: "Price" } },
  { key: "credits", label: { zh: "积分", en: "Credits" } },
  ...specFields,
  { key: "note", label: { zh: "备注", en: "Notes" } },
];

function familyTone(family: PlanFamily) {
  if (family === "PrimaPlan") return "mint";
  return "gray";
}

/* SparkPlan 的免费档做成通栏，其余四档并作一行 */
function gridModifier(family: PlanFamily, count: number) {
  if (family === "SparkPlan") return " pricing-grid-spark";
  if (count === 2) return " pricing-grid-pair";
  return "";
}

export default function Pricing() {
  const { locale, pick } = useI18n();
  const [activeFamily, setActiveFamily] = useState<PlanFamily>("SparkPlan");
  const [variantIndex, setVariantIndex] = useState<Record<string, number>>({});
  const groups = pricingGroups.filter((group) => group.family === activeFamily);

  const selectVariant = (key: string, index: number) => {
    setVariantIndex((prev) => ({ ...prev, [key]: index }));
  };

  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="pricing-hero-title">
        <p className="eyebrow">{pick({ zh: "定价", en: "Pricing" })}</p>
        <SplitTitle
          id="pricing-hero-title"
          lead={{ zh: "按验证阶段", en: "Choose allocation" }}
          stress={{ zh: "选择额度。", en: "by validation stage." }}
        />
        <p className="lead">
          {pick({ zh: "SparkPlan 覆盖个人从免费验证到高频使用的进阶路径；PrimaPlan 面向团队长任务；Credit+ 给现有 Plan 补充额度。", en: "SparkPlan covers individual progression from free validation to high-frequency use; PrimaPlan targets team long tasks; Credit+ tops up an existing Plan." })}
        </p>
        <p className="pricing-note-line">
          {pick({ zh: "以下为当前定价方案，发布细节和可用范围以正式开通说明为准。", en: "This is the current pricing proposal; final release details and availability govern activation." })}
        </p>
      </section>

      <section className="container about-section" aria-labelledby="plans-title">
        <div className="section-head">
          <p className="eyebrow">{pick({ zh: "订阅方案", en: "Subscriptions" })}</p>
          <PhraseTitle id="plans-title" title={{ zh: "三条产品线，从免费验证到团队生产。", en: "Three product lines, from free validation to team production." }} />
        </div>
        <div className="pricing-tabs" role="tablist" aria-label={pick({ zh: "定价分组", en: "Plan groups" })}>
          {pricingFamilies.map((family) => (
            <button
              key={family.id}
              id={`pricing-tab-${family.id}`}
              type="button"
              role="tab"
              aria-selected={activeFamily === family.id}
              aria-controls="pricing-plan-grid"
              className={activeFamily === family.id ? "active" : ""}
              onClick={() => setActiveFamily(family.id)}
            >
              {family.label}
            </button>
          ))}
        </div>
        <p className="pricing-family-copy" aria-live="polite">
          {pricingFamilies.find((family) => family.id === activeFamily)?.description[locale]}
        </p>
        <div
          className={`pricing-grid${gridModifier(activeFamily, groups.length)}`}
          id="pricing-plan-grid"
          role="tabpanel"
          aria-labelledby={`pricing-tab-${activeFamily}`}
        >
          {groups.map((group) => {
            const key = `${group.family}-${group.name}`;
            const activeIndex = variantIndex[key] ?? 0;
            const variant = group.variants[activeIndex];

            return (
              <article className="pricing-card" key={key}>
                <div className="pricing-card-head">
                  <div className="pricing-card-title">
                    <p className={`tag ${familyTone(group.family)}`}>{group.family}</p>
                    <div className="pricing-card-name">
                      <h3>{group.name}</h3>
                      {group.variants.length > 1 && (
                        <div className="pricing-variants" role="radiogroup" aria-label={pick({ zh: `${group.name} 档位`, en: `${group.name} tiers` })}>
                          {group.variants.map((option, index) => {
                            const selected = index === activeIndex;
                            return (
                              <button
                                key={option.tier}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                className={selected ? "active" : ""}
                                onClick={() => selectVariant(key, index)}
                              >
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pricing-price" aria-live="polite">
                    <strong>¥{variant.price}</strong>
                    <span>/{variant.period[locale]}</span>
                  </div>
                </div>
                <div className="pricing-swap" key={variant.tier}>
                  <p className="pricing-credits">
                    <strong>{variant.credits}</strong>
                    <span>{pick({ zh: "积分", en: "credits" })}</span>
                  </p>
                  <dl className="pricing-specs">
                    {specFields.map((field) => (
                      <div key={field.key}>
                        <dt>{field.label[locale]}</dt>
                        <dd>{variant[field.key][locale]}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="pricing-card-note">{variant.note[locale]}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="rules-title">
        <div className="section-head">
          <p className="eyebrow">{pick({ zh: "计费规则", en: "Billing rules" })}</p>
          <h2 id="rules-title">{pick({ zh: "额度、倍率和购买条件。", en: "Allocation, multipliers, and purchase conditions." })}</h2>
        </div>
        <div className="card-grid">
          {pricingRules.map((item) => (
            <article className="card" key={item.title.en}>
              <h3>{item.title[locale]}</h3>
              <p>{item.copy[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="compare-title">
        <div className="section-head">
          <p className="eyebrow">{pick({ zh: "完整对照", en: "Full comparison" })}</p>
          <h2 id="compare-title">{pick({ zh: "所有档位放在一张表里。", en: "All tiers in one table." })}</h2>
        </div>
        <div className="pricing-table-scroll" tabIndex={0} aria-label="定价对照表">
          <table className="pricing-table">
            <thead>
              <tr>
                {tableHeads.map((head) => (
                  <th key={head.key} scope="col">{head.label[locale]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingPlans.map((item) => (
                <tr key={`${item.family}-${item.tier}`}>
                  <th scope="row">{item.family}</th>
                  <td>{item.tier}</td>
                  <td>¥{item.price}<span> / {item.period[locale]}</span></td>
                  <td>{item.credits}</td>
                  <td>{item.models[locale]}</td>
                  <td>{item.rateLimit[locale]}</td>
                  <td>{item.parallelLimit[locale]}</td>
                  <td>{item.mediaRate[locale]}</td>
                  <td>{item.note[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <BetaCta
        id="pricing-cta-title"
        title={{ zh: "还没确定选哪一档？", en: "Unsure which tier fits?" }}
        copy={{ zh: "参加 Beta 调研，告诉我们任务规模、并发需求和媒体用量，我们会帮你判断合适档位。", en: "Join Beta research and tell us task scale, concurrency, and media use; we can help you choose a tier." }}
      />
    </main>
  );
}
