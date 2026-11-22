import type { Localized } from "./data/content";

export const siteConfig = {
  brandShortName: "Prima",
  oxygenUrl: "https://oxygenai.top/",
  labUrl: "https://lab.oxygenai.top/",
  primaHubUrl: "https://hub.primaai.top/",
  surveyUrl: "https://v.wjx.cn/vm/miVoicp.aspx#",
  alphaOpenAt: "2026-11-22T20:45:00+08:00",
  alphaOpenLabel: {
    zh: "今日 20:45",
    en: "today at 20:45",
  } satisfies Localized,
  betaStatus: {
    zh: "早期共创 · Beta 调研中",
    en: "Early co-creation · Beta research",
  } satisfies Localized,
};
