export type PlanFamily = "SparkPlan" | "PrimaPlan" | "Credit+";

export type PricingPlan = {
  family: PlanFamily;
  tier: string;
  price: string;
  period: "月付" | "一次性";
  credits: string;
  models: string;
  rateLimit: string;
  parallelLimit: string;
  mediaRate: string;
  note: string;
};

export const pricingFamilies: Array<{
  id: PlanFamily;
  label: string;
  description: string;
}> = [
  {
    id: "SparkPlan",
    label: "SparkPlan",
    description: "从免费验证到高并发生产使用的分层订阅。",
  },
  {
    id: "PrimaPlan",
    label: "PrimaPlan",
    description: "面向长任务团队的大额度档位，解除常规速率与并行限制。",
  },
  {
    id: "Credit+",
    label: "Credit+",
    description: "给现有 Plan 补充额度的加购包。",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    family: "SparkPlan",
    tier: "Free",
    price: "0",
    period: "月付",
    credits: "375",
    models: "Free 优选模型",
    rateLimit: "3 RPM",
    parallelLimit: "1",
    mediaRate: "3.5×",
    note: "所有人都可订阅。付费计划获得的积分会叠加在上面，优先消耗免费额度。当有其他订阅时，Free 订阅的限速与并行限制取消，但其他规则保留。",
  },
  {
    family: "SparkPlan",
    tier: "Free+",
    price: "9.9",
    period: "月付",
    credits: "1,058",
    models: "全部模型",
    rateLimit: "10 RPM",
    parallelLimit: "3",
    mediaRate: "2.5×",
    note: "一个机器码仅可订阅一次。覆盖免费额度，并启用多账号维度限制。",
  },
  {
    family: "SparkPlan",
    tier: "Start",
    price: "29.9",
    period: "月付",
    credits: "2,422",
    models: "Spark 优选模型",
    rateLimit: "10 RPM",
    parallelLimit: "3",
    mediaRate: "2.5×",
    note: "适合轻量创作与偶发批处理。",
  },
  {
    family: "SparkPlan",
    tier: "Basic",
    price: "67.9",
    period: "月付",
    credits: "5,515",
    models: "Spark+ 优选模型",
    rateLimit: "20 RPM",
    parallelLimit: "5",
    mediaRate: "2×",
    note: "适合稳定使用图像、音频与长文本能力的个人创作者。",
  },
  {
    family: "SparkPlan",
    tier: "Plus",
    price: "99.9",
    period: "月付",
    credits: "8,137",
    models: "Spark+ 优选模型",
    rateLimit: "50 RPM",
    parallelLimit: "15",
    mediaRate: "1.5×",
    note: "适合高频多任务工作流。",
  },
  {
    family: "SparkPlan",
    tier: "Pro",
    price: "149.9",
    period: "月付",
    credits: "12,226",
    models: "Spark+ 优选模型",
    rateLimit: "75 RPM",
    parallelLimit: "25",
    mediaRate: "1×",
    note: "适合把模型能力接入内部工具的小型团队。",
  },
  {
    family: "PrimaPlan",
    tier: "Plus 2x",
    price: "199.99",
    period: "月付",
    credits: "16,199",
    models: "全部模型",
    rateLimit: "不限速",
    parallelLimit: "无限制",
    mediaRate: "1×",
    note: "面向需要更高吞吐的团队工作流。",
  },
  {
    family: "PrimaPlan",
    tier: "Plus 5x",
    price: "499",
    period: "月付",
    credits: "40,419",
    models: "全部模型",
    rateLimit: "不限速",
    parallelLimit: "无限制",
    mediaRate: "1×",
    note: "适合多成员并行使用统一额度的团队。",
  },
  {
    family: "PrimaPlan",
    tier: "Pro 5x",
    price: "749",
    period: "月付",
    credits: "61,343",
    models: "全部模型",
    rateLimit: "不限速",
    parallelLimit: "无限制",
    mediaRate: "1×",
    note: "先扣加购包，再扣订阅额度。",
  },
  {
    family: "PrimaPlan",
    tier: "Pro 10x",
    price: "1,499",
    period: "月付",
    credits: "124,117",
    models: "全部模型",
    rateLimit: "不限速",
    parallelLimit: "无限制",
    mediaRate: "1×",
    note: "先扣加购包，再扣订阅额度。",
  },
  {
    family: "PrimaPlan",
    tier: "Pro 20x",
    price: "2,999",
    period: "月付",
    credits: "251,016",
    models: "全部模型",
    rateLimit: "不限速",
    parallelLimit: "无限制",
    mediaRate: "1×",
    note: "先扣加购包，再扣订阅额度。",
  },
  {
    family: "Credit+",
    tier: "100",
    price: "19.9",
    period: "一次性",
    credits: "1,254",
    models: "跟随当前 Plan",
    rateLimit: "跟随当前 Plan",
    parallelLimit: "跟随当前 Plan",
    mediaRate: "延续订阅",
    note: "需持有任意一种 Plan 才可购买。",
  },
  {
    family: "Credit+",
    tier: "500",
    price: "89.9",
    period: "一次性",
    credits: "6,245",
    models: "跟随当前 Plan",
    rateLimit: "跟随当前 Plan",
    parallelLimit: "跟随当前 Plan",
    mediaRate: "延续订阅",
    note: "需持有任意一种 Plan 才可购买。",
  },
  {
    family: "Credit+",
    tier: "1000",
    price: "169.9",
    period: "一次性",
    credits: "12,500",
    models: "跟随当前 Plan",
    rateLimit: "跟随当前 Plan",
    parallelLimit: "跟随当前 Plan",
    mediaRate: "延续订阅",
    note: "需持有任意一种 Plan 才可购买。",
  },
];

export const pricingRules = [
  {
    title: "额度叠加与消耗",
    copy: "Free 额度对所有账号开放；购买付费计划后额度会叠加，并优先消耗免费额度。",
  },
  {
    title: "限制解除口径",
    copy: "存在其他有效订阅时，Free 档的限速与并行限制解除；Free 档的其他规则继续保留。",
  },
  {
    title: "媒体生成倍率",
    copy: "媒体生成按所属档位倍率扣除。档位越高，倍率越低；Credit+ 延续当前订阅倍率。",
  },
  {
    title: "Credit+ 购买条件",
    copy: "Credit+ 是加购包，不能单独使用；需持有任意一种 Plan，并延续当前订阅的能力与限制。",
  },
];
