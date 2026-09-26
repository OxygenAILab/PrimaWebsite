import { useState } from "react";
import { modelMatrix, type ModelRegion } from "../data/models";
import { useI18n } from "../i18n";
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
  "model-list.title": { zh: "按服务区域查看支持范围。", en: "View support by service region." },
  "model-list.lead": {
    zh: "其他地区包含中国大陆支持的所有模型，并额外开放海外模型。第一批内测模型会用 # 标注，可用性以开通说明为准。",
    en: "Other regions include every model available in mainland China plus additional overseas models. Early Beta models are marked with #; availability follows activation notices.",
  },
  "model-list.supported": { zh: "支持模型", en: "Supported models" },
  "model-list.regionChina": { zh: "中国大陆", en: "Mainland China" },
  "model-list.regionGlobal": { zh: "其他地区", en: "Other regions" },
  "model-list.count": { zh: "当前区域共 {count} 个模型。", en: "{count} models are available in this region." },
  "model-list.beta": { zh: "第一批内测", en: "Early Beta" },
  "model-list.planned": { zh: "计划支持", en: "Planned" },
  "model-list.regionMainland": { zh: "中国大陆", en: "Mainland China" },
  "model-list.regionOverseas": { zh: "其他地区", en: "Other regions" },
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
  "model-list.searchLabel": { zh: "搜索模型", en: "Search models" },
  "model-list.searchPlaceholder": { zh: "搜索模型或供应商", en: "Search models or vendors" },
  "model-list.filters": { zh: "筛选模型", en: "Filter models" },
  "model-list.allVendors": { zh: "全部供应商", en: "All vendors" },
  "model-list.betaOnly": { zh: "仅第一批内测", en: "Early Beta only" },
  "model-list.filteredCount": { zh: "当前筛选显示 {count} / {total} 个模型。", en: "Showing {count} of {total} models." },
  "model-list.emptyTitle": { zh: "没有匹配的模型", en: "No matching models" },
  "model-list.emptyCopy": {
    zh: "试试更换关键词或清空筛选条件；名单会随阶段更新。",
    en: "Try a different keyword or clear filters; this list updates with each stage.",
  },
} satisfies Record<string, { zh: string; en: string }>;

function localText(key: keyof typeof copy, locale: "zh" | "en", values?: Record<string, string | number>) {
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

function vendorClass(vendor: string) {
  return `model-vendor-${vendor.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
}

export default function ModelList() {
  const { locale } = useI18n();
  const [activeRegion, setActiveRegion] = useState<RegionKey>("china");
  const [query, setQuery] = useState("");
  const [activeVendor, setActiveVendor] = useState<string | "all">("all");
  const [betaOnly, setBetaOnly] = useState(false);

  const regionModels = modelMatrix.filter((item) => item.regions.includes(activeRegion as ModelRegion));
  const vendors = Array.from(new Set(regionModels.map((item) => item.vendor)));
  const models = regionModels.filter((item) => {
    const matchesVendor = activeVendor === "all" || item.vendor === activeVendor;
    const matchesBeta = !betaOnly || item.beta;
    const needle = query.trim().toLowerCase();
    const matchesQuery = !needle || item.name.toLowerCase().includes(needle) || item.vendor.toLowerCase().includes(needle);
    return matchesVendor && matchesBeta && matchesQuery;
  });

  return (
    <main id="main" className="about-page model-list-page">
      <section className="container about-hero" aria-labelledby="model-list-title">
        <p className="eyebrow">{localText("model-list.eyebrow", locale)}</p>
        <h1 id="model-list-title">{localText("model-list.title", locale)}</h1>
        <p className="lead" style={{ maxWidth: "62ch" }}>
          {localText("model-list.lead", locale)}
        </p>
      </section>

      <section className="container about-section" aria-labelledby="supported-models-title">
        <div className="section-head">
          <p className="eyebrow">{localText("model-list.supported", locale)}</p>
          <h2 id="supported-models-title">{localText("model-list.count", locale, { count: regionModels.length })}</h2>
        </div>
        <div className="pricing-tabs" role="tablist" aria-label="选择服务区域">
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
        <div className="model-toolbar">
          <label className="search-shell" htmlFor="model-search">
            <span className="visually-hidden">{localText("model-list.searchLabel", locale)}</span>
            <input
              id="model-search"
              type="search"
              value={query}
              placeholder={localText("model-list.searchPlaceholder", locale)}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="filter-rail" role="group" aria-label={localText("model-list.filters", locale)}>
            <button
              type="button"
              className={activeVendor === "all" ? "filter-chip active" : "filter-chip"}
              aria-pressed={activeVendor === "all"}
              onClick={() => setActiveVendor("all")}
            >
              {localText("model-list.allVendors", locale)}
            </button>
            {vendors.map((vendor) => (
              <button
                key={vendor}
                type="button"
                className={activeVendor === vendor ? "filter-chip active" : "filter-chip"}
                aria-pressed={activeVendor === vendor}
                onClick={() => setActiveVendor(vendor)}
              >
                {vendor}
              </button>
            ))}
            <button
              type="button"
              className={betaOnly ? "filter-chip active" : "filter-chip"}
              aria-pressed={betaOnly}
              onClick={() => setBetaOnly((value) => !value)}
            >
              {localText("model-list.betaOnly", locale)}
            </button>
          </div>
          <p className="model-filter-status" aria-live="polite">
            {localText("model-list.filteredCount", locale, { count: models.length, total: regionModels.length })}
          </p>
        </div>
        <div className="model-grid" id="model-grid" role="tabpanel" aria-labelledby={`model-region-${activeRegion}`}>
          {models.length === 0 && (
            <article className="card model-empty">
              <h3>{localText("model-list.emptyTitle", locale)}</h3>
              <p>{localText("model-list.emptyCopy", locale)}</p>
            </article>
          )}
          {models.map((item) => (
            <article className="model-card" key={item.name}>
              <div className="model-head">
              <span className={`model-mark ${vendorClass(item.vendor)}`} aria-hidden="true">
                {item.icon ? (
                  <img src={item.icon} alt="" width={22} height={22} loading="lazy" />
                ) : (
                  vendorToken(item.vendor)
                )}
              </span>
                <div>
                  <h3>{item.name}{item.beta ? <span className="model-beta">#</span> : null}</h3>
                  <p className="model-vendor">{item.vendor}</p>
                </div>
              </div>
              <div className="model-foot">
                <span className={item.beta ? "tag mint" : "tag gray"}>
                  {item.beta ? localText("model-list.beta", locale) : localText("model-list.planned", locale)}
                </span>
                <span className="model-region">
                  {item.regions
                    .map((region) => (region === "china" ? localText("model-list.regionMainland", locale) : localText("model-list.regionOverseas", locale)))
                    .join(locale === "zh" ? " · " : " / ")}
                </span>
              </div>
              {item.note ? <p className="model-note">{item.note[locale]}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="model-note-title">
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
