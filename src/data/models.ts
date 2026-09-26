import type { Localized } from "./content";

export type ModelRegion = "china" | "global";
export type ModelNote = Localized;

export type ModelEntry = {
  name: string;
  vendor: string;
  regions: ModelRegion[];
  beta: boolean;
  icon?: string;
  note?: ModelNote;
};

export type VendorGroup = {
  vendor: string;
  icon?: string;
  models: ModelEntry[];
};

export function groupByVendor(entries: ModelEntry[]): VendorGroup[] {
  const groups = new Map<string, VendorGroup>();
  for (const entry of entries) {
    const group = groups.get(entry.vendor) ?? { vendor: entry.vendor, icon: entry.icon, models: [] };
    group.models.push(entry);
    groups.set(entry.vendor, group);
  }
  return [...groups.values()];
}

export function isOverseasOnly(entry: ModelEntry) {
  return !entry.regions.includes("china");
}

/* 变体后缀：同代内的不同型号，Max 与 Flash 同属一个代际 */
const variantSuffixes = ["preview", "turbo", "flash", "max", "pro", "sol", "terra", "astra"];

/* 产品线：去掉版本号与变体后缀。Qwen 3.8 Max → Qwen；Claude Opus 4.7 → Claude Opus */
export function productLineOf(name: string) {
  return name
    .split(" ")
    .filter((word) => !/\d/.test(word) && !variantSuffixes.includes(word.toLowerCase()))
    .join(" ");
}

function generationKey(name: string) {
  return (name.match(/\d+(?:\.\d+)*/g) ?? []).join(".");
}

function compareGenerationDesc(a: string, b: string) {
  const va = a.split(".").map(Number);
  const vb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(va.length, vb.length); i += 1) {
    const diff = (vb[i] ?? 0) - (va[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

export type ModelGeneration = { key: string; models: ModelEntry[] };
export type ModelLine = { line: string; generations: ModelGeneration[] };

/* 产品线成列、代际成行，代际内从新到旧 */
export function groupByLine(entries: ModelEntry[]): ModelLine[] {
  const lines = new Map<string, ModelLine>();
  for (const entry of entries) {
    const lineName = productLineOf(entry.name);
    const gen = generationKey(entry.name) || entry.name;
    const line = lines.get(lineName) ?? { line: lineName, generations: [] };
    const bucket = line.generations.find((item) => item.key === gen);
    if (bucket) bucket.models.push(entry);
    else line.generations.push({ key: gen, models: [entry] });
    lines.set(lineName, line);
  }
  for (const line of lines.values()) {
    line.generations.sort((a, b) => compareGenerationDesc(a.key, b.key));
  }
  return [...lines.values()];
}

type ModelSeed = { name: string; beta: boolean; regions?: ModelRegion[]; note?: ModelNote };
type VendorSeed = { vendor: string; icon?: string; models: ModelSeed[] };

const mainlandAndGlobal: ModelRegion[] = ["china", "global"];
const globalOnly: ModelRegion[] = ["global"];

/* 顺序即页面展示顺序：厂商按首次出现排列，厂商内按数据书写排列 */
const vendorCatalog: VendorSeed[] = [
  {
    vendor: "Alibaba",
    icon: "/vendors/qwen.svg",
    models: [
      { name: "Qwen 3.8 Max", beta: true },
      { name: "Qwen 3.8 Flash", beta: true },
      { name: "Qwen 3.7 Max", beta: true },
      { name: "Qwen 3.7 Flash", beta: true },
    ],
  },
  {
    vendor: "Z.ai",
    icon: "/vendors/zai.svg",
    models: [
      { name: "GLM 5.3 Flash", beta: true },
      { name: "GLM 5.3", beta: false },
      { name: "GLM 5.2", beta: false },
    ],
  },
  {
    vendor: "ByteDance",
    icon: "/vendors/bytedance.svg",
    models: [
      { name: "Seed 2.1 Turbo", beta: false },
      { name: "Seed 2.1 Pro", beta: false },
    ],
  },
  {
    vendor: "StepFun",
    icon: "/vendors/stepfun.svg",
    models: [
      { name: "Step 5 Preview", beta: false },
      { name: "Step 3.7 Flash", beta: false },
      { name: "Step 3.5 Flash", beta: false },
    ],
  },
  {
    vendor: "Moonshot AI",
    icon: "/vendors/moonshot.svg",
    models: [{ name: "Kimi K3", beta: false }],
  },
  {
    vendor: "DeepSeek",
    icon: "/vendors/deepseek.svg",
    models: [
      { name: "DeepSeek V4.1 Flash", beta: true },
      { name: "DeepSeek V4 Pro 0813", beta: true },
      { name: "DeepSeek V3.2", beta: true },
    ],
  },
  {
    vendor: "Tencent",
    icon: "/vendors/hunyuan.svg",
    models: [
      { name: "Hy 3", beta: false },
      { name: "Hy 4 Preview", beta: false },
    ],
  },
  {
    vendor: "Xiaomi",
    icon: "/vendors/xiaomi.svg",
    models: [
      { name: "MIMO V2.6 Flash", beta: false },
      { name: "MIMO V2.6 Pro", beta: false },
    ],
  },
  {
    vendor: "xAI",
    icon: "/vendors/xai.svg",
    models: [
      { name: "Grok 4.6", beta: false, regions: globalOnly },
      { name: "Grok 4.7", beta: false, regions: globalOnly },
    ],
  },
  {
    vendor: "Anthropic",
    icon: "/vendors/anthropic.svg",
    models: [
      { name: "Claude Opus 4.6", beta: false, regions: globalOnly },
      { name: "Claude Opus 4.7", beta: false, regions: globalOnly },
      { name: "Claude Opus 4.8", beta: true, regions: globalOnly },
      { name: "Claude Opus 5", beta: true, regions: globalOnly },
      { name: "Claude Fable 5", beta: true, regions: globalOnly },
      { name: "Claude Fable 5.1", beta: false, regions: globalOnly },
    ],
  },
  {
    vendor: "OpenAI",
    icon: "/vendors/openai.svg",
    models: [
      { name: "GPT 5.6 Terra", beta: true, regions: globalOnly },
      { name: "GPT 5.6 Sol", beta: true, regions: globalOnly },
      { name: "GPT 6 Sol", beta: false, regions: globalOnly },
      { name: "GPT 6 Astra", beta: true, regions: globalOnly },
    ],
  },
  {
    vendor: "Google",
    icon: "/vendors/google.svg",
    models: [
      { name: "Gemini 3.1 Pro", beta: false, regions: globalOnly },
      { name: "Gemini 3.8 Flash", beta: false, regions: globalOnly },
    ],
  },
  {
    vendor: "Yosee",
    models: [
      {
        name: "Xiaobai 5 Pro",
        beta: false,
        regions: globalOnly,
        note: {
          zh: "Yosee 问小白的小白 5 Pro，仅在海外服务中开放。",
          en: "Yosee's Xiaobai 5 Pro, available only in overseas services.",
        },
      },
    ],
  },
];

export const modelMatrix: ModelEntry[] = vendorCatalog.flatMap((vendor) =>
  vendor.models.map((model) => ({
    name: model.name,
    vendor: vendor.vendor,
    regions: model.regions ?? mainlandAndGlobal,
    beta: model.beta,
    ...(vendor.icon ? { icon: vendor.icon } : {}),
    ...(model.note ? { note: model.note } : {}),
  })),
);
