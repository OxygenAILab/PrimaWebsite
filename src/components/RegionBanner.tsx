import { useEffect, useState } from "react";
import { LanguageSwitch, useI18n } from "../i18n";

type RegionState = {
  status: "detecting" | "china" | "other" | "unknown" | "hidden";
};

const STORAGE_KEY = "prima-region-preference";

function detectWithIpWho() {
  return fetch("https://ipwho.is/", {
    signal: AbortSignal.timeout(3500),
  }).then(async (response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = (await response.json()) as {
      success?: boolean;
      country_code?: string;
    };
    if (!data.success) throw new Error("lookup failed");
    return data.country_code || "";
  });
}

function detectWithIpApi() {
  return fetch("https://ip-api.com/json/?fields=status,countryCode", {
    signal: AbortSignal.timeout(3500),
  }).then(async (response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = (await response.json()) as {
      status?: string;
      countryCode?: string;
    };
    if (data.status !== "success") throw new Error("lookup failed");
    return data.countryCode || "";
  });
}

export default function RegionBanner() {
  const { setLocale, t } = useI18n();
  const [region, setRegion] = useState<RegionState>(() => {
    if (window.sessionStorage.getItem(`${STORAGE_KEY}-seen`)) return { status: "hidden" };
    const cached = window.sessionStorage.getItem(`${STORAGE_KEY}-state`);
    if (cached === "china" || cached === "other") return { status: cached };
    return { status: "detecting" };
  });
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const seen = window.sessionStorage.getItem(`${STORAGE_KEY}-seen`);
    const language = window.localStorage.getItem("site-language");
    if (seen || stored === "china" || stored === "other" || language) {
      setRegion({ status: "hidden" });
      return;
    }

    let active = true;
    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 450));
        const countryCode = await detectWithIpWho().catch(detectWithIpApi);
        if (!active) return;
        const status = countryCode.toUpperCase() === "CN" ? "china" : "other";
        if (!window.localStorage.getItem("site-language")) setLocale(status === "china" ? "zh" : "en");
        window.sessionStorage.setItem(`${STORAGE_KEY}-seen`, "1");
        window.sessionStorage.setItem(`${STORAGE_KEY}-state`, status);
        setRegion({ status });
      } catch {
        if (active) setRegion({ status: "unknown" });
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!["china", "other", "unknown"].includes(region.status)) return;
    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(`${STORAGE_KEY}-seen`, "1");
      setRegion((state) => ({ ...state, status: "hidden" }));
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [region.status]);

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
      <span
        className="region-actions"
        onClickCapture={() => window.sessionStorage.setItem(`${STORAGE_KEY}-seen`, "1")}
      >
        <LanguageSwitch />
      </span>
    </div>
  );
}
