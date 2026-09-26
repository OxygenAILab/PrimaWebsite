import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "zh" | "en";

type Entry = { zh: string; en: string };

const dictionary = {
  "cta.joinBeta": { zh: "参与 Beta 调研", en: "Join Beta research" },
  "announce.beta": {
    zh: "Prima Beta 调研进行中，约 5 分钟 →",
    en: "Prima Beta research is open; about 5 minutes →",
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
} satisfies Record<string, Entry>;

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof typeof dictionary) => string;
  /** 双语取值：按当前 locale 从 zh/en 两个分支里取一项，与数据层的 Localized 对象同一套写法 */
  pick: <T,>(entry: Record<Locale, T>) => T;
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
    pick: (entry) => entry[locale],
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
