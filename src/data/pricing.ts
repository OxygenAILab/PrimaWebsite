import type { Localized } from "./content";

export type PlanFamily = "SparkPlan" | "PrimaPlan" | "Credit+";

export type PricingVariant = {
  tier: string;
  label: string;
  price: string;
  period: Localized;
  credits: string;
  models: Localized;
  rateLimit: Localized;
  parallelLimit: Localized;
  mediaRate: Localized;
  note: Localized;
};

export type PricingGroup = {
  family: PlanFamily;
  name: string;
  variants: PricingVariant[];
};

export type PricingPlan = PricingVariant & { family: PlanFamily };

export const pricingFamilies: Array<{
  id: PlanFamily;
  label: string;
  description: Localized;
}> = [
  {
    id: "SparkPlan",
    label: "SparkPlan",
    description: {
      zh: "从免费验证到高并发生产使用的分层订阅。",
      en: "Tiered subscriptions from free validation to high-concurrency production.",
    },
  },
  {
    id: "PrimaPlan",
    label: "PrimaPlan",
    description: {
      zh: "面向长任务团队的大额度档位，解除常规速率与并行限制。",
      en: "High-volume plans for long-task teams, with normal rate and parallel limits removed.",
    },
  },
  {
    id: "Credit+",
    label: "Credit+",
    description: {
      zh: "给现有 Plan 补充额度的加购包。",
      en: "Credit add-ons for an existing Plan.",
    },
  },
];

export const pricingGroups: PricingGroup[] = [
  {
    family: "SparkPlan",
    name: "Free",
    variants: [
      {
        tier: "Free",
        label: "Free",
        price: "0",
        period: { zh: "月付", en: "monthly" },
        credits: "375",
        models: { zh: "Free 优选模型", en: "Free preferred models" },
        rateLimit: { zh: "3 RPM", en: "3 RPM" },
        parallelLimit: { zh: "1", en: "1" },
        mediaRate: { zh: "3.5×", en: "3.5x" },
        note: {
          zh: "所有人都可订阅。付费计划获得的积分会叠加在上面，优先消耗免费额度。当有其他订阅时，Free 订阅的限速与并行限制取消，但其他规则保留。",
          en: "Available to everyone. Paid-plan credits stack on top and free credits are consumed first. With another active subscription, Free rate and parallel limits are lifted while other rules remain.",
        },
      },
      {
        tier: "Free+",
        label: "Free+",
        price: "9.9",
        period: { zh: "月付", en: "monthly" },
        credits: "1,058",
        models: { zh: "全部模型", en: "All models" },
        rateLimit: { zh: "10 RPM", en: "10 RPM" },
        parallelLimit: { zh: "3", en: "3" },
        mediaRate: { zh: "2.5×", en: "2.5x" },
        note: {
          zh: "一个机器码仅可订阅一次。覆盖免费额度，并启用多账号维度限制。",
          en: "One subscription per machine code. Replaces the free allocation and enables multi-account limits.",
        },
      },
    ],
  },
  {
    family: "SparkPlan",
    name: "Start",
    variants: [
      {
        tier: "Start",
        label: "Start",
        price: "29.9",
        period: { zh: "月付", en: "monthly" },
        credits: "2,422",
        models: { zh: "Spark 优选模型", en: "Spark preferred models" },
        rateLimit: { zh: "10 RPM", en: "10 RPM" },
        parallelLimit: { zh: "3", en: "3" },
        mediaRate: { zh: "2.5×", en: "2.5x" },
        note: { zh: "适合轻量创作与偶发批处理。", en: "For lightweight creation and occasional batch work." },
      },
    ],
  },
  {
    family: "SparkPlan",
    name: "Basic",
    variants: [
      {
        tier: "Basic",
        label: "Basic",
        price: "67.9",
        period: { zh: "月付", en: "monthly" },
        credits: "5,515",
        models: { zh: "Spark+ 优选模型", en: "Spark+ preferred models" },
        rateLimit: { zh: "20 RPM", en: "20 RPM" },
        parallelLimit: { zh: "5", en: "5" },
        mediaRate: { zh: "2×", en: "2x" },
        note: {
          zh: "适合稳定使用图像、音频与长文本能力的个人创作者。",
          en: "For creators who steadily use image, audio, and long-text capabilities.",
        },
      },
    ],
  },
  {
    family: "SparkPlan",
    name: "Plus",
    variants: [
      {
        tier: "Plus",
        label: "Plus",
        price: "99.9",
        period: { zh: "月付", en: "monthly" },
        credits: "8,137",
        models: { zh: "Spark+ 优选模型", en: "Spark+ preferred models" },
        rateLimit: { zh: "50 RPM", en: "50 RPM" },
        parallelLimit: { zh: "15", en: "15" },
        mediaRate: { zh: "1.5×", en: "1.5x" },
        note: { zh: "适合高频多任务工作流。", en: "For high-frequency multi-task workflows." },
      },
    ],
  },
  {
    family: "SparkPlan",
    name: "Pro",
    variants: [
      {
        tier: "Pro",
        label: "Pro",
        price: "149.9",
        period: { zh: "月付", en: "monthly" },
        credits: "12,226",
        models: { zh: "Spark+ 优选模型", en: "Spark+ preferred models" },
        rateLimit: { zh: "75 RPM", en: "75 RPM" },
        parallelLimit: { zh: "25", en: "25" },
        mediaRate: { zh: "1×", en: "1x" },
        note: {
          zh: "适合把模型能力接入内部工具的小型团队。",
          en: "For small teams connecting model capabilities to internal tools.",
        },
      },
    ],
  },
  {
    family: "PrimaPlan",
    name: "Plus",
    variants: [
      {
        tier: "Plus 2x",
        label: "2x",
        price: "199.99",
        period: { zh: "月付", en: "monthly" },
        credits: "16,199",
        models: { zh: "全部模型", en: "All models" },
        rateLimit: { zh: "不限速", en: "No rate limit" },
        parallelLimit: { zh: "无限制", en: "Unlimited" },
        mediaRate: { zh: "1×", en: "1x" },
        note: {
          zh: "面向需要更高吞吐的团队工作流。",
          en: "For team workflows that need higher throughput.",
        },
      },
      {
        tier: "Plus 5x",
        label: "5x",
        price: "499",
        period: { zh: "月付", en: "monthly" },
        credits: "40,419",
        models: { zh: "全部模型", en: "All models" },
        rateLimit: { zh: "不限速", en: "No rate limit" },
        parallelLimit: { zh: "无限制", en: "Unlimited" },
        mediaRate: { zh: "1×", en: "1x" },
        note: {
          zh: "适合多成员并行使用统一额度的团队。",
          en: "For teams using one shared allocation across members in parallel.",
        },
      },
    ],
  },
  {
    family: "PrimaPlan",
    name: "Pro",
    variants: [
      {
        tier: "Pro 5x",
        label: "5x",
        price: "749",
        period: { zh: "月付", en: "monthly" },
        credits: "61,343",
        models: { zh: "全部模型", en: "All models" },
        rateLimit: { zh: "不限速", en: "No rate limit" },
        parallelLimit: { zh: "无限制", en: "Unlimited" },
        mediaRate: { zh: "1×", en: "1x" },
        note: {
          zh: "先扣加购包，再扣订阅额度。",
          en: "Credit packs are consumed before subscription credits.",
        },
      },
      {
        tier: "Pro 10x",
        label: "10x",
        price: "1,499",
        period: { zh: "月付", en: "monthly" },
        credits: "124,117",
        models: { zh: "全部模型", en: "All models" },
        rateLimit: { zh: "不限速", en: "No rate limit" },
        parallelLimit: { zh: "无限制", en: "Unlimited" },
        mediaRate: { zh: "1×", en: "1x" },
        note: {
          zh: "先扣加购包，再扣订阅额度。",
          en: "Credit packs are consumed before subscription credits.",
        },
      },
      {
        tier: "Pro 20x",
        label: "20x",
        price: "2,999",
        period: { zh: "月付", en: "monthly" },
        credits: "251,016",
        models: { zh: "全部模型", en: "All models" },
        rateLimit: { zh: "不限速", en: "No rate limit" },
        parallelLimit: { zh: "无限制", en: "Unlimited" },
        mediaRate: { zh: "1×", en: "1x" },
        note: {
          zh: "先扣加购包，再扣订阅额度。",
          en: "Credit packs are consumed before subscription credits.",
        },
      },
    ],
  },
  {
    family: "Credit+",
    name: "100",
    variants: [
      {
        tier: "100",
        label: "100",
        price: "19.9",
        period: { zh: "一次性", en: "one-time" },
        credits: "1,254",
        models: { zh: "跟随当前 Plan", en: "Follows current Plan" },
        rateLimit: { zh: "跟随当前 Plan", en: "Follows current Plan" },
        parallelLimit: { zh: "跟随当前 Plan", en: "Follows current Plan" },
        mediaRate: { zh: "延续订阅", en: "Extends subscription" },
        note: { zh: "需持有任意一种 Plan 才可购买。", en: "Requires any active Plan." },
      },
    ],
  },
  {
    family: "Credit+",
    name: "500",
    variants: [
      {
        tier: "500",
        label: "500",
        price: "89.9",
        period: { zh: "一次性", en: "one-time" },
        credits: "6,245",
        models: { zh: "跟随当前 Plan", en: "Follows current Plan" },
        rateLimit: { zh: "跟随当前 Plan", en: "Follows current Plan" },
        parallelLimit: { zh: "跟随当前 Plan", en: "Follows current Plan" },
        mediaRate: { zh: "延续订阅", en: "Extends subscription" },
        note: { zh: "需持有任意一种 Plan 才可购买。", en: "Requires any active Plan." },
      },
    ],
  },
  {
    family: "Credit+",
    name: "1000",
    variants: [
      {
        tier: "1000",
        label: "1000",
        price: "169.9",
        period: { zh: "一次性", en: "one-time" },
        credits: "12,500",
        models: { zh: "跟随当前 Plan", en: "Follows current Plan" },
        rateLimit: { zh: "跟随当前 Plan", en: "Follows current Plan" },
        parallelLimit: { zh: "跟随当前 Plan", en: "Follows current Plan" },
        mediaRate: { zh: "延续订阅", en: "Extends subscription" },
        note: { zh: "需持有任意一种 Plan 才可购买。", en: "Requires any active Plan." },
      },
    ],
  },
];

export const pricingPlans: PricingPlan[] = pricingGroups.flatMap((group) =>
  group.variants.map((variant) => ({ family: group.family, ...variant })),
);

export const pricingRules: Array<{ title: Localized; copy: Localized }> = [
  {
    title: { zh: "额度叠加与消耗", en: "Stacking and consumption" },
    copy: {
      zh: "Free 额度对所有账号开放；购买付费计划后额度会叠加，并优先消耗免费额度。",
      en: "Free credits are open to all accounts. Paid credits stack, and free credits are consumed first.",
    },
  },
  {
    title: { zh: "限制解除口径", en: "Lifting limits" },
    copy: {
      zh: "存在其他有效订阅时，Free 档的限速与并行限制解除；Free 档的其他规则继续保留。",
      en: "With another active subscription, Free rate and parallel limits are lifted while other Free rules remain.",
    },
  },
  {
    title: { zh: "媒体生成倍率", en: "Media generation multiplier" },
    copy: {
      zh: "媒体生成按所属档位倍率扣除。档位越高，倍率越低；Credit+ 延续当前订阅倍率。",
      en: "Media generation uses the tier multiplier; higher tiers lower it. Credit+ extends the current subscription multiplier.",
    },
  },
  {
    title: { zh: "Credit+ 购买条件", en: "Credit+ purchase conditions" },
    copy: {
      zh: "Credit+ 是加购包，不能单独使用；需持有任意一种 Plan，并延续当前订阅的能力与限制。",
      en: "Credit+ is an add-on and cannot be used alone; it requires any active Plan and extends that Plan's capabilities and limits.",
    },
  },
];