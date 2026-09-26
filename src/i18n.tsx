import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "zh" | "en";

type Entry = { zh: string; en: string };

const dictionary = {
  "nav.products": { zh: "产品", en: "Products" },
  "nav.model": { zh: "模型", en: "Models" },
  "nav.research": { zh: "研究", en: "Research" },
  "nav.progress": { zh: "进展", en: "Progress" },
  "nav.developers": { zh: "开发者", en: "Developers" },
  "nav.news": { zh: "动态", en: "Updates" },
  "nav.about": { zh: "关于", en: "About" },
  "nav.careers": { zh: "加入我们", en: "Careers" },
  "cta.enterPrima": { zh: "进入 Prima", en: "Enter Prima" },
  "announce.beta": {
    zh: "Prima Beta 调研进行中，问卷约需 5 分钟 →",
    en: "Prima Beta research is open; the survey takes about 5 minutes →",
  },
  "prima.slogan": { zh: "星火灵现，构于基元。", en: "Spark dreams, build from primitives." },
  "region.detecting": { zh: "正在识别访问区域…", en: "Detecting your region..." },
  "region.china": {
    zh: "检测到中国大陆访问，页面使用简体中文。",
    en: "Mainland China detected; the page is using Simplified Chinese.",
  },
  "region.other": {
    zh: "检测到中国大陆以外访问，建议使用 English。",
    en: "Detected outside mainland China; English is recommended.",
  },
  "region.unknown": {
    zh: "暂时无法识别访问区域，可以选择显示语言。",
    en: "Unable to detect your region. You can choose a display language.",
  },
  "hero.sub": {
    zh: "把长任务拆回可验证的基元：Prima 在一线校准体验，OxygenDCM 在底层重塑推理、记忆与执行的秩序。",
    en: "Break long tasks into verifiable primitives: Prima calibrates product experience in the field while OxygenDCM reorders reasoning, memory, and execution beneath it.",
  },
  "cta.learnPrima": { zh: "了解 Prima", en: "Explore Prima" },
  "cta.modelPlan": { zh: "查看模型规划", en: "See model plan" },
  "footer.researchBase": {
    zh: "Prima 的研究底座，也是长任务认知架构的实验室。",
    en: "The research base behind Prima and a laboratory for long-task cognitive architecture.",
  },
  "footer.rights": {
    zh: "产品仍处早期打磨阶段，模型能力以最终发布说明为准。",
    en: "The product remains early; model capabilities are subject to final release notes.",
  },
} satisfies Record<string, Entry>;

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof typeof dictionary) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

function resolveInitialLocale(): Locale {
  const stored = window.localStorage.getItem("site-language");
  if (stored === "zh" || stored === "en") return stored;
  const region = window.localStorage.getItem("prima-region-preference");
  if (region === "china") return "zh";
  if (region === "other") return "en";
  return "zh";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(resolveInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const value = useMemo<I18nValue>(() => ({
    locale,
    setLocale: (next) => {
      window.localStorage.setItem("site-language", next);
      setLocale(next);
    },
    t: (key) => dictionary[key][locale],
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}

export function LanguageSwitch() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="language-switch" role="group" aria-label="Language">
      {([["zh", "中文"], ["en", "English"]] as Array<[Locale, string]>).map(([code, label]) => (
        <button
          key={code}
          type="button"
          aria-pressed={locale === code}
          className={locale === code ? "active" : ""}
          onClick={() => setLocale(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
