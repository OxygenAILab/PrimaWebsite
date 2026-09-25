import { useEffect, useState } from "react";

type RegionState = {
  status: "detecting" | "china" | "other" | "unknown";
  country: string;
};

const STORAGE_KEY = "prima-region-preference";

function detectWithIpWho() {
  return fetch("https://ipwho.is/", {
    signal: AbortSignal.timeout(3500),
  }).then(async (response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = (await response.json()) as {
      success?: boolean;
      country?: string;
      country_code?: string;
    };
    if (!data.success) throw new Error("lookup failed");
    return { country: data.country || data.country_code || "", code: data.country_code || "" };
  });
}

function detectWithIpApi() {
  return fetch("https://ip-api.com/json/?fields=status,country,countryCode", {
    signal: AbortSignal.timeout(3500),
  }).then(async (response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = (await response.json()) as {
      status?: string;
      country?: string;
      countryCode?: string;
    };
    if (data.status !== "success") throw new Error("lookup failed");
    return { country: data.country || data.countryCode || "", code: data.countryCode || "" };
  });
}

export default function RegionBanner() {
  const [region, setRegion] = useState<RegionState>(() => {
    const cached = window.sessionStorage.getItem(`${STORAGE_KEY}-state`);
    if (cached === "china" || cached === "other") return { status: cached, country: "" };
    return { status: "detecting", country: "" };
  });

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "china" || stored === "other") {
      setRegion({ status: stored, country: "" });
      return;
    }

    let active = true;
    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 450));
        const result = await detectWithIpWho().catch(detectWithIpApi);
        if (!active) return;
        window.sessionStorage.setItem(`${STORAGE_KEY}-state`, result.code.toUpperCase() === "CN" ? "china" : "other");
        setRegion({
          status: result.code.toUpperCase() === "CN" ? "china" : "other",
          country: result.country,
        });
      } catch {
        if (active) setRegion({ status: "unknown", country: "" });
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const setPreference = (preference: "china" | "other") => {
    window.localStorage.setItem(STORAGE_KEY, preference);
    window.sessionStorage.setItem(`${STORAGE_KEY}-state`, preference);
    setRegion({ status: preference, country: region.country });
  };

  return (
    <div className="region-banner" role="status" aria-live="polite">
      {region.status === "detecting" && <span>正在识别访问区域…</span>}
      {region.status === "china" && (
        <span>
          检测到中国大陆访问{region.country ? `（${region.country}）` : ""}，页面使用简体中文。
        </span>
      )}
      {region.status === "other" && (
        <span>
          Detected outside mainland China{region.country ? ` (${region.country})` : ""}. English is recommended for this region.
        </span>
      )}
      {region.status === "unknown" && (
        <span>Unable to detect your region. You can choose a display preference.</span>
      )}
      <span className="region-actions">
        <button type="button" className={region.status === "china" ? "active" : ""} onClick={() => setPreference("china")}>
          中文
        </button>
        <button type="button" className={region.status === "other" ? "active" : ""} onClick={() => setPreference("other")}>
          English
        </button>
      </span>
    </div>
  );
}
