export type ModelRegion = "china" | "global";
export type ModelNote = { zh: string; en: string };

export type ModelEntry = {
  name: string;
  vendor: string;
  regions: ModelRegion[];
  beta: boolean;
  icon?: string;
  note?: ModelNote;
};

const chinaModels: Array<Omit<ModelEntry, "regions">> = [
  { name: "Qwen 3.8 Max", vendor: "Alibaba", icon: "/vendors/alibaba.svg", beta: true },
  { name: "Qwen 3.8 Flash", vendor: "Alibaba", icon: "/vendors/alibaba.svg", beta: true },
  { name: "Qwen 3.7 Max", vendor: "Alibaba", icon: "/vendors/alibaba.svg", beta: true },
  { name: "Qwen 3.7 Flash", vendor: "Alibaba", icon: "/vendors/alibaba.svg", beta: true },
  { name: "GLM 5.3 Flash", vendor: "Z.ai", beta: true },
  { name: "GLM 5.3", vendor: "Z.ai", beta: false },
  { name: "GLM 5.2", vendor: "Z.ai", beta: false },
  { name: "Seed 2.1 Turbo", vendor: "ByteDance", beta: false },
  { name: "Seed 2.1 Pro", vendor: "ByteDance", beta: false },
  { name: "Step 5 Preview", vendor: "StepFun", icon: "/vendors/stepfun.svg", beta: false },
  { name: "Step 3.7 Flash", vendor: "StepFun", icon: "/vendors/stepfun.svg", beta: false },
  { name: "Step 3.5 Flash", vendor: "StepFun", icon: "/vendors/stepfun.svg", beta: false },
  { name: "Kimi K3", vendor: "Moonshot AI", icon: "/vendors/moonshot.svg", beta: false },
  { name: "DeepSeek V4.1 Flash", vendor: "DeepSeek", icon: "/vendors/deepseek.svg", beta: true },
  { name: "DeepSeek V3.2", vendor: "DeepSeek", icon: "/vendors/deepseek.svg", beta: true },
  { name: "Hy 3", vendor: "Tencent", beta: false },
  { name: "Hy 4 Preview", vendor: "Tencent", beta: false },
  { name: "Xiaomi MIMO V2.6", vendor: "Xiaomi", icon: "/vendors/xiaomi.svg", beta: false },
];

const globalOnlyModels: Array<Omit<ModelEntry, "regions">> = [
  { name: "Grok 4.6", vendor: "xAI", icon: "/vendors/xai.svg", beta: false },
  { name: "Grok 4.7", vendor: "xAI", icon: "/vendors/xai.svg", beta: false },
  { name: "Claude Opus 4.6", vendor: "Anthropic", icon: "/vendors/anthropic.svg", beta: false },
  { name: "Claude Opus 4.7", vendor: "Anthropic", icon: "/vendors/anthropic.svg", beta: false },
  { name: "Claude Opus 4.8", vendor: "Anthropic", icon: "/vendors/anthropic.svg", beta: true },
  { name: "Claude Opus 5", vendor: "Anthropic", icon: "/vendors/anthropic.svg", beta: true },
  { name: "Claude Fable 5", vendor: "Anthropic", icon: "/vendors/anthropic.svg", beta: true },
  { name: "Claude Fable 5.1", vendor: "Anthropic", icon: "/vendors/anthropic.svg", beta: false },
  { name: "GPT 5.6 Terra", vendor: "OpenAI", icon: "/vendors/openai.svg", beta: true },
  { name: "GPT 5.6 Sol", vendor: "OpenAI", icon: "/vendors/openai.svg", beta: true },
  { name: "GPT 6 Sol", vendor: "OpenAI", icon: "/vendors/openai.svg", beta: false },
  { name: "GPT 6 Astra", vendor: "OpenAI", icon: "/vendors/openai.svg", beta: true },
  { name: "Gemini 3.1 Pro", vendor: "Google", icon: "/vendors/google.svg", beta: false },
  { name: "Gemini 3.8 Flash", vendor: "Google", icon: "/vendors/google.svg", beta: false },
  {
    name: "Xiaobai 5 Pro",
    vendor: "Yosee",
    beta: false,
    note: {
      zh: "Yosee 问小白的小白 5 Pro，仅在海外服务中开放。",
      en: "Yosee's Xiaobai 5 Pro, available only in overseas services.",
    },
  },
];

export const modelMatrix: ModelEntry[] = [
  ...chinaModels.map((item) => ({ ...item, regions: ["china", "global"] as ModelRegion[] })),
  ...globalOnlyModels.map((item) => ({ ...item, regions: ["global"] as ModelRegion[] })),
];

export const modelVendors = [
  "Alibaba",
  "Z.ai",
  "ByteDance",
  "StepFun",
  "Moonshot AI",
  "DeepSeek",
  "Tencent",
  "Xiaomi",
  "xAI",
  "Anthropic",
  "OpenAI",
  "Google",
  "Yosee",
];
