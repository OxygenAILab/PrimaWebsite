import { useState } from "react";
import {
  pricingFamilies,
  pricingPlans,
  pricingRules,
  type PlanFamily,
} from "../data/pricing";

const tableHeads = [
  "计划",
  "档位",
  "标价",
  "积分",
  "模型权益",
  "限速",
  "并行限制",
  "媒体生成倍率",
  "备注",
];

function familyTone(family: PlanFamily) {
  if (family === "PrimaPlan") return "mint";
  return "gray";
}

export default function Pricing() {
  const [activeFamily, setActiveFamily] = useState<PlanFamily>("SparkPlan");
  const plans = pricingPlans.filter((item) => item.family === activeFamily);

  return (
    <main id="main" className="about-page pricing-page">
      <section className="container about-hero" aria-labelledby="pricing-hero-title">
        <p className="eyebrow">定价</p>
        <h1 id="pricing-hero-title">按验证阶段选择额度。</h1>
        <p className="lead" style={{ maxWidth: "62ch" }}>
          SparkPlan 覆盖个人从免费验证到高频使用的进阶路径；PrimaPlan 面向团队长任务；Credit+ 给现有 Plan 补充额度。
        </p>
        <p className="pricing-note-line">以下为当前定价方案，发布细节和可用范围以正式开通说明为准。</p>
      </section>

      <section className="container about-section" aria-labelledby="plans-title">
        <div className="section-head">
          <p className="eyebrow">订阅方案</p>
          <h2 id="plans-title">三条产品线，十四个档位。</h2>
        </div>
        <div className="pricing-tabs" role="tablist" aria-label="定价分组">
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
          {pricingFamilies.find((family) => family.id === activeFamily)?.description}
        </p>
        <div className="pricing-grid" id="pricing-plan-grid" role="tabpanel" aria-labelledby={`pricing-tab-${activeFamily}`}>
          {plans.map((item, index) => (
            <article className={`pricing-card ${index === 0 ? "featured" : ""}`} key={`${item.family}-${item.tier}`}>
              <div className="pricing-card-head">
                <div>
                  <p className={`tag ${familyTone(item.family)}`}>{item.family}</p>
                  <h3>{item.tier}</h3>
                </div>
                <div className="pricing-price">
                  <strong>¥{item.price}</strong>
                  <span>/{item.period}</span>
                </div>
              </div>
              <p className="pricing-credits">
                <strong>{item.credits}</strong>
                <span>积分</span>
              </p>
              <dl className="pricing-specs">
                <div>
                  <dt>模型权益</dt>
                  <dd>{item.models}</dd>
                </div>
                <div>
                  <dt>限速</dt>
                  <dd>{item.rateLimit}</dd>
                </div>
                <div>
                  <dt>并行限制</dt>
                  <dd>{item.parallelLimit}</dd>
                </div>
                <div>
                  <dt>媒体生成倍率</dt>
                  <dd>{item.mediaRate}</dd>
                </div>
              </dl>
              <p className="pricing-card-note">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="rules-title">
        <div className="section-head">
          <p className="eyebrow">计费规则</p>
          <h2 id="rules-title">额度、倍率和购买条件。</h2>
        </div>
        <div className="card-grid">
          {pricingRules.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="compare-title">
        <div className="section-head">
          <p className="eyebrow">完整对照</p>
          <h2 id="compare-title">所有档位放在一张表里。</h2>
        </div>
        <div className="pricing-table-scroll" tabIndex={0} aria-label="定价对照表">
          <table className="pricing-table">
            <thead>
              <tr>
                {tableHeads.map((head) => (
                  <th key={head} scope="col">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingPlans.map((item) => (
                <tr key={`${item.family}-${item.tier}`}>
                  <th scope="row">{item.family}</th>
                  <td>{item.tier}</td>
                  <td>¥{item.price}<span> / {item.period}</span></td>
                  <td>{item.credits}</td>
                  <td>{item.models}</td>
                  <td>{item.rateLimit}</td>
                  <td>{item.parallelLimit}</td>
                  <td>{item.mediaRate}</td>
                  <td>{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container about-section" aria-labelledby="pricing-cta-title">
        <div className="contact-panel">
          <div>
            <h2 id="pricing-cta-title">还没确定选哪一档？</h2>
            <p>参加 Beta 调研，告诉我们任务规模、并发需求和媒体用量，我们会帮你判断合适档位。</p>
          </div>
          <a className="button primary" href="../beta/">参与调研</a>
        </div>
      </section>
    </main>
  );
}
