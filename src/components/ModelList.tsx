import { useState } from "react";
import { modelMatrix, type ModelRegion } from "../data/models";

type RegionKey = "china" | "global";

const regions: Array<{ id: RegionKey; label: string; description: string }> = [
  {
    id: "china",
    label: "中国大陆",
    description: "面向中国大陆服务环境可用的模型，标记 # 的模型在第一批内测中开放。",
  },
  {
    id: "global",
    label: "其他地区",
    description: "包含中国大陆可用模型，并额外支持海外模型；标记 # 的模型在第一批内测中开放。",
  },
];

function vendorToken(vendor: string) {
  return vendor.slice(0, 2).toUpperCase();
}

function vendorClass(vendor: string) {
  return `model-vendor-${vendor.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
}

export default function ModelList() {
  const [activeRegion, setActiveRegion] = useState<RegionKey>("china");
  const models = modelMatrix.filter((item) => item.regions.includes(activeRegion as ModelRegion));

  return (
    <main id="main" className="about-page model-list-page">
      <section className="container about-hero" aria-labelledby="model-list-title">
        <p className="eyebrow">模型列表</p>
        <h1 id="model-list-title">按服务区域查看支持范围。</h1>
        <p className="lead" style={{ maxWidth: "62ch" }}>
          其他地区包含中国大陆支持的所有模型，并额外开放海外模型。第一批内测模型会用 # 标注，可用性以开通说明为准。
        </p>
      </section>

      <section className="container about-section" aria-labelledby="supported-models-title">
        <div className="section-head">
          <p className="eyebrow">支持模型</p>
          <h2 id="supported-models-title">当前区域共 {models.length} 个模型。</h2>
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
              {region.label}
            </button>
          ))}
        </div>
        <p className="model-region-copy" aria-live="polite">
          {regions.find((region) => region.id === activeRegion)?.description}
        </p>
        <div className="model-grid" id="model-grid" role="tabpanel" aria-labelledby={`model-region-${activeRegion}`}>
          {models.map((item) => (
            <article className="model-card" key={item.name}>
              <div className="model-head">
                <span className={`model-mark ${vendorClass(item.vendor)}`} aria-hidden="true">{vendorToken(item.vendor)}</span>
                <div>
                  <h3>{item.name}{item.beta ? <span className="model-beta">#</span> : null}</h3>
                  <p className="model-vendor">{item.vendor}</p>
                </div>
              </div>
              <div className="model-foot">
                <span className={item.beta ? "tag mint" : "tag gray"}>{item.beta ? "第一批内测" : "计划支持"}</span>
                <span className="model-region">{item.regions.map((region) => region === "china" ? "中国大陆" : "其他地区").join(" · ")}</span>
              </div>
              {item.note ? <p className="model-note">{item.note}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="container about-section" aria-labelledby="model-note-title">
        <div className="card-grid">
          <article className="card">
            <h3># 是什么意思？</h3>
            <p>表示该模型进入第一批内测可用清单；是否获得资格仍以开通通知与权限设置为准。</p>
          </article>
          <article className="card">
            <h3>区域为什么会影响模型？</h3>
            <p>上游模型的服务边界不同。我们按访问与服务区域整理支持范围，避免把不可用模型写成已开放。</p>
          </article>
          <article className="card">
            <h3>名单会更新吗？</h3>
            <p>会。模型进入或离开支持范围时，这里会同步调整；不确定时请以最新页面为准。</p>
          </article>
        </div>
      </section>
    </main>
  );
}
