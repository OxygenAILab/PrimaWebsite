import { useEffect, useState } from "react";
import { LanguageSwitch, useI18n } from "../i18n";

type RegionState = {
  status: "detecting" | "china" | "other" | "unknown" | "hidden";
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
  const { setLocale, t } = useI18n();
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
        const code = result.code.toUpperCase();
        if (!window.localStorage.getItem("site-language")) setLocale(code === "CN" ? "zh" : "en");
        window.sessionStorage.setItem(`${STORAGE_KEY}-state`, result.code.toUpperCase() === "CN" ? "china" : "other");
        setRegion({
          status: code === "CN" ? "china" : "other",
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

  useEffect(() => {
    if (!["china", "other", "unknown"].includes(region.status)) return;
    const timer = window.setTimeout(() => setRegion((state) => ({ ...state, status: "hidden" })), 8000);
    return () => window.clearTimeout(timer);
  }, [region.status]);

  const setPreference = (preference: "china" | "other") => {
    window.localStorage.setItem(STORAGE_KEY, preference);
    window.sessionStorage.setItem(`${STORAGE_KEY}-state`, preference);
    setRegion({ status: preference, country: region.country });
  };

  return (
    <div className={region.status === "hidden" ? "region-banner hidden" : "region-banner"} role="status" aria-live="polite">
      {region.status === "detecting" && <span>{t("region.detecting")}</span>}
      {region.status === "china" && (
        <span>
          {t("region.china")}
        </span>
      )}
      {region.status === "other" && (
        <span>
          {t("region.other")}
        </span>
      )}
      {region.status === "unknown" && (
        <span>{t("region.unknown")}</span>
      )}
      <span className="region-actions">
        <LanguageSwitch />
      </span>
    </div>
  );
}
