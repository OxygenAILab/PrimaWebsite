export type ModelRegion = "china" | "global";

export type ModelEntry = {
  name: string;
  vendor: string;
  regions: ModelRegion[];
  beta: boolean;
  note?: string;
};

const chinaModels: Array<Omit<ModelEntry, "regions">> = [
  { name: "Qwen 3.8 Max", vendor: "Alibaba", beta: true },
  { name: "Qwen 3.8 Flash", vendor: "Alibaba", beta: true },
  { name: "Qwen 3.7 Max", vendor: "Alibaba", beta: true },
  { name: "Qwen 3.7 Flash", vendor: "Alibaba", beta: true },
  { name: "GLM 5.3 Flash", vendor: "Z.ai", beta: true },
  { name: "GLM 5.3", vendor: "Z.ai", beta: false },
  { name: "GLM 5.2", vendor: "Z.ai", beta: false },
  { name: "Seed 2.1 Turbo", vendor: "ByteDance", beta: false },
  { name: "Seed 2.1 Pro", vendor: "ByteDance", beta: false },
  { name: "Step 5 Preview", vendor: "StepFun", beta: false },
  { name: "Step 3.7 Flash", vendor: "StepFun", beta: false },
  { name: "Step 3.5 Flash", vendor: "StepFun", beta: false },
  { name: "Kimi K3", vendor: "Moonshot AI", beta: false },
  { name: "DeepSeek V4.1 Flash", vendor: "DeepSeek", beta: true },
  { name: "DeepSeek V3.2", vendor: "DeepSeek", beta: true },
  { name: "Hy 3", vendor: "Hunyuan", beta: false },
  { name: "Hy 4 Preview", vendor: "Hunyuan", beta: false },
  { name: "Xiaomi MIMO V2.6", vendor: "Xiaomi", beta: false },
];

const globalOnlyModels: Array<Omit<ModelEntry, "regions">> = [
  { name: "Grok 4.6", vendor: "xAI", beta: false },
  { name: "Grok 4.7", vendor: "xAI", beta: false },
  { name: "Claude Opus 4.6", vendor: "Anthropic", beta: false },
  { name: "Claude Opus 4.7", vendor: "Anthropic", beta: false },
  { name: "Claude Opus 4.8", vendor: "Anthropic", beta: true },
  { name: "Claude Opus 5", vendor: "Anthropic", beta: true },
  { name: "Claude Fable 5", vendor: "Anthropic", beta: true },
  { name: "Claude Fable 5.1", vendor: "Anthropic", beta: false },
  { name: "GPT 5.6 Terra", vendor: "OpenAI", beta: true },
  { name: "GPT 5.6 Sol", vendor: "OpenAI", beta: true },
  { name: "GPT 6 Sol", vendor: "OpenAI", beta: false },
  { name: "GPT 6 Astra", vendor: "OpenAI", beta: true },
  { name: "Gemini 3.1 Pro", vendor: "Google", beta: false },
  { name: "Gemini 3.8 Flash", vendor: "Google", beta: false },
  {
    name: "Xiaobai 5 Pro",
    vendor: "Yuanshi Tech",
    beta: false,
    note: "问小白提供的 Xiaobai 模型，仅在海外服务中开放。",
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
  "Hunyuan",
  "Xiaomi",
  "xAI",
  "Anthropic",
  "OpenAI",
  "Google",
  "Yuanshi Tech",
];
