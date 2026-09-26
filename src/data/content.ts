export type Localized = { zh: string; en: string };

export const scenarios: Array<{ title: Localized; copy: Localized }> = [
  {
    title: { zh: "多文件编程与 Bug 定位", en: "Multi-file coding and bug localization" },
    copy: {
      zh: "保持仓库结构、修改意图和验证结果连续可见，减少改一处伤一处。",
      en: "Keep repository structure, change intent, and verification results continuously visible to reduce collateral damage.",
    },
  },
  {
    title: { zh: "数据分析与研究汇总", en: "Data analysis and research synthesis" },
    copy: {
      zh: "在长资料、反复提问和结论更新中保留关键判断，让输出更容易复核。",
      en: "Preserve key judgments across long material, repeated questions, and revised conclusions.",
    },
  },
  {
    title: { zh: "写作、文档与知识工作", en: "Writing, documentation, and knowledge work" },
    copy: {
      zh: "记住你的语气、术语、受众和项目阶段，把持续协作而不是单次生成作为基础。",
      en: "Remember your tone, terminology, audience, and project stage so collaboration persists across sessions.",
    },
  },
];

export const painPoints: Array<{ title: Localized; copy: Localized }> = [
  {
    title: { zh: "推理深度不该固定", en: "Reasoning depth should not be fixed" },
    copy: {
      zh: "简单问题被拖慢，复杂问题又可能想得不够深。你被迫在速度、成本和质量之间反复取舍。",
      en: "Simple requests wait too long while complex ones may get too little thought. You keep trading speed, cost, and quality.",
    },
  },
  {
    title: { zh: "协作背景会丢失", en: "Working context gets lost" },
    copy: {
      zh: "偏好、项目目标和既有决策无法持续积累，每次对话都像从零开始。",
      en: "Preferences, project goals, and prior decisions fail to accumulate, so every conversation starts from zero.",
    },
  },
  {
    title: { zh: "长任务容易跑偏", en: "Long tasks drift" },
    copy: {
      zh: "多文件、多轮次或长项目里，Agent 忘记约束、重复返工，甚至让一次小修改变成连带失控。",
      en: "Across files, turns, and long projects, agents forget constraints and redo work until a small change cascades.",
    },
  },
];

export const capabilities: Array<{ title: Localized; copy: Localized; status: Localized }> = [
  {
    title: { zh: "自适应推理深度", en: "Adaptive reasoning depth" },
    copy: {
      zh: "根据任务复杂度在快答与深想之间切换，让该快的任务不等待，该深的任务不草率。",
      en: "Switch between quick answers and deeper thought based on task complexity, without making simple work wait or complex work rushed.",
    },
    status: { zh: "核心方向", en: "Core direction" },
  },
  {
    title: { zh: "分层长期记忆", en: "Layered long-term memory" },
    copy: {
      zh: "组织个人偏好、项目背景、关键决策和失败教训，让协作随着使用变得更省心。",
      en: "Organize preferences, project context, decisions, and lessons so collaboration improves with use.",
    },
    status: { zh: "正在打磨", en: "In progress" },
  },
  {
    title: { zh: "长任务执行一致性", en: "Long-task execution consistency" },
    copy: {
      zh: "在长对话和长项目中保持目标、约束与已确认事实一致，减少重复解释和连带返工。",
      en: "Keep goals, constraints, and confirmed facts aligned across long conversations and projects.",
    },
    status: { zh: "正在打磨", en: "In progress" },
  },
  {
    title: { zh: "本地 / 混合数据边界", en: "Local / hybrid data boundaries" },
    copy: {
      zh: "探索敏感工作区、私有资料和长期记忆的更清晰边界，给用户更多控制感。",
      en: "Explore clearer boundaries for sensitive workspaces, private material, and long-term memory.",
    },
    status: { zh: "探索中", en: "Exploring" },
  },
];
