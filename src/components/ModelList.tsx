import { useState } from "react";
import { groupByLine, groupByVendor, isOverseasOnly, modelMatrix, type ModelRegion } from "../data/models";
import SplitTitle from "./SplitTitle";
import { useI18n, type Locale } from "../i18n";
import type { Localized } from "../data/content";

type RegionKey = "china" | "global";

const regions: Array<{ id: RegionKey; label: Localized; description: Localized }> = [
  {
    id: "china",
    label: { zh: "中国大陆", en: "Mainland China" },
    description: {
      zh: "面向中国大陆服务环境可用的模型，标记 # 的模型在第一批内测中开放。",
      en: "Models available in mainland China service environments; # marks early Beta availability.",
    },
  },
  {
    id: "global",
    label: { zh: "其他地区", en: "Other regions" },
    description: {
      zh: "包含中国大陆可用模型，并额外支持海外模型；标记 # 的模型在第一批内测中开放。",
      en: "Includes all mainland China models plus overseas models; # marks early Beta availability.",
    },
  },
];

const copy = {
  "model-list.eyebrow": { zh: "模型列表", en: "Model list" },
  "model-list.lead": {
    zh: "其他地区包含中国大陆支持的所有模型，并额外开放海外模型。第一批内测模型会用 # 标注，可用性以开通说明为准。",
    en: "Other regions include every model available in mainland China plus additional overseas models. Early Beta models are marked with #; availability follows activation notices.",
  },
  "model-list.supported": { zh: "支持模型", en: "Supported models" },
  "model-list.grouped": { zh: "按厂商分组。", en: "Grouped by vendor." },
  "model-list.statModels": { zh: "本区域模型", en: "Models in region" },
  "model-list.statVendors": { zh: "覆盖厂商", en: "Vendors" },
  "model-list.statExtra": { zh: "海外专属", en: "Overseas only" },
  "model-list.groupCount": { zh: "{count} 个模型", en: "{count} models" },
  "model-list.groupCountOne": { zh: "{count} 个模型", en: "{count} model" },
  "model-list.overseasOnly": { zh: "海外专属", en: "Overseas only" },
  "model-list.beta": { zh: "第一批内测", en: "Early Beta" },
  "model-list.planned": { zh: "计划支持", en: "Planned" },
  "model-list.legend": {
    zh: "紫色标签为其他地区独有，其余模型两地均可用。",
    en: "Purple chips are exclusive to other regions; the rest are available in both.",
  },
  "model-list.faqBetaTitle": { zh: "# 是什么意思？", en: "What does # mean?" },
  "model-list.faqBetaCopy": {
    zh: "表示该模型进入第一批内测可用清单；是否获得资格仍以开通通知与权限设置为准。",
    en: "It marks models in the first Beta availability list. Eligibility still depends on activation notices and permission settings.",
  },
  "model-list.faqRegionTitle": { zh: "区域为什么会影响模型？", en: "Why does region affect models?" },
  "model-list.faqRegionCopy": {
    zh: "上游模型的服务边界不同。我们按访问与服务区域整理支持范围，避免把不可用模型写成已开放。",
    en: "Upstream service boundaries differ. We organize availability by access and service region so unavailable models are not presented as live.",
  },
  "model-list.faqUpdatesTitle": { zh: "名单会更新吗？", en: "Will this list change?" },
  "model-list.faqUpdatesCopy": {
    zh: "会。模型进入或离开支持范围时，这里会同步调整；不确定时请以最新页面为准。",
    en: "Yes. It updates as models enter or leave support; when uncertain, defer to the latest page.",
  },
} satisfies Record<string, { zh: string; en: string }>;

function localText(key: keyof typeof copy, locale: Locale, values?: Record<string, string | number>) {
  let text = copy[key][locale];
  if (values) {
    for (const [name, value] of Object.entries(values)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}

function vendorToken(vendor: string) {
  return vendor.slice(0, 2).toUpperCase();
}

export default function ModelList() {
  const { locale, pick } = useI18n();
  const [activeRegion, setActiveRegion] = useState<RegionKey>("china");
  const models = modelMatrix.filter((item) => item.regions.includes(activeRegion as ModelRegion));
  const groups = groupByVendor(models);
  const overseasCount = models.filter(isOverseasOnly).length;
  const showRegion = activeRegion === "global";

  return (
    <main id="main" className="about-page">
      <section className="container about-hero" aria-labelledby="model-list-title">
        <p className="eyebrow">{localText("model-list.eyebrow", locale)}</p>
        <SplitTitle
          id="model-list-title"
          lead={{ zh: "按服务区域", en: "View support" }}
          stress={{ zh: "查看支持范围。", en: "by service region." }}
        />
        <p className="lead">
          {localText("model-list.lead", locale)}
        </p>
      </section>

      <section className="container about-section" aria-labelledby="supported-models-title">
        <div className="section-head">
          <p className="eyebrow">{localText("model-list.supported", locale)}</p>
          <h2 id="supported-models-title">{localText("model-list.grouped", locale)}</h2>
        </div>
        <div className="pricing-tabs" role="tablist" aria-label={pick({ zh: "选择服务区域", en: "Service region" })}>
          {regions.map((region) => (
            <button
              key={region.id}
              id={`model-region-${region.id}`}
              type="button"
              role="tab"
              aria-selected={activeRegion === region.id}
              aria-controls="model-grid"
              className={activeRegion === region.id ? "active" : ""}
              onClick={() => setActiveRegion(region.id)}
            >
              {region.label[locale]}
            </button>
          ))}
        </div>
        <p className="model-region-copy" aria-live="polite">
          {regions.find((region) => region.id === activeRegion)?.description[locale]}
        </p>

        <dl className="model-summary">
          <div>
            <dt>{localText("model-list.statModels", locale)}</dt>
            <dd>{models.length}</dd>
          </div>
          <div>
            <dt>{localText("model-list.statVendors", locale)}</dt>
            <dd>{groups.length}</dd>
          </div>
          <div>
            <dt>{localText("model-list.statExtra", locale)}</dt>
            <dd>{overseasCount}</dd>
          </div>
        </dl>

        {showRegion ? (
          <p className="model-legend">
            <span className="model-chip is-overseas">{localText("model-list.overseasOnly", locale)}</span>
            <span>{localText("model-list.legend", locale)}</span>
          </p>
        ) : null}

        <div className="model-groups" id="model-grid" role="tabpanel" aria-labelledby={`model-region-${activeRegion}`}>
          {groups.map((group) => {
            const countLabel = localText(
              group.models.length === 1 ? "model-list.groupCountOne" : "model-list.groupCount",
              locale,
              { count: group.models.length },
            );
            const notes = group.models.filter((item) => item.note);

            return (
              <section className="model-group" key={group.vendor} aria-labelledby={`vendor-${group.vendor}`}>
                <header className="model-group-head">
                  <span className="model-mark" aria-hidden="true">
                    {group.icon ? (
                      <img src={group.icon} alt="" width={17} height={17} loading="lazy" />
                    ) : (
                      vendorToken(group.vendor)
                    )}
                  </span>
                  <h3 id={`vendor-${group.vendor}`}>{group.vendor}</h3>
                  <span className="model-group-count">{countLabel}</span>
                </header>
                <div className="model-group-body">
                  <div className="model-columns">
                    {groupByLine(group.models).map((line) => (
                      <div className="model-column" key={line.line}>
                        {line.generations.map((generation) => (
                          <ul className="model-series" key={generation.key}>
                            {generation.models.map((item) => (
                              <li
                                className={`model-chip${showRegion && isOverseasOnly(item) ? " is-overseas" : ""}`}
                                key={item.name}
                              >
                                {item.name}
                                {item.beta ? <span className="model-beta">#</span> : null}
                                <span className="model-chip-state">
                                  {item.beta
                                    ? localText("model-list.beta", locale)
                                    : localText("model-list.planned", locale)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ))}
                      </div>
                    ))}
                  </div>
                  {notes.map((item) => (
                    <p className="model-note" key={item.name}>
                      {item.note?.[locale]}
                    </p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="container about-section" aria-label={pick({ zh: "名单说明", en: "List notes" })}>
        <div className="card-grid">
          <article className="card">
            <h3>{localText("model-list.faqBetaTitle", locale)}</h3>
            <p>{localText("model-list.faqBetaCopy", locale)}</p>
          </article>
          <article className="card">
            <h3>{localText("model-list.faqRegionTitle", locale)}</h3>
            <p>{localText("model-list.faqRegionCopy", locale)}</p>
          </article>
          <article className="card">
            <h3>{localText("model-list.faqUpdatesTitle", locale)}</h3>
            <p>{localText("model-list.faqUpdatesCopy", locale)}</p>
          </article>
        </div>
      </section>
    </main>
  );
}