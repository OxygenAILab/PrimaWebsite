import { useI18n } from "../i18n";

export function ContinuityArtwork() {
  const { locale } = useI18n();

  return (
    <figure className="split-visual artwork-shell" aria-labelledby="continuity-art-caption">
      <svg className="section-art" viewBox="0 0 720 450" role="img">
        <title id="continuity-art-caption">
          {locale === "zh" ? "长任务在多次修正后仍保持目标一致" : "Long tasks keep goals aligned through repeated revisions"}
        </title>
        <defs>
          <pattern id="prima-dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.2" r="1.2" fill="rgba(22,24,29,.09)" />
          </pattern>
        </defs>
        <rect width="720" height="450" fill="url(#prima-dot-grid)" />

        <g fill="var(--white)" stroke="var(--border)" strokeWidth="1">
          <rect x="52" y="58" width="182" height="104" rx="14" />
          <rect x="269" y="172" width="182" height="104" rx="14" />
          <rect x="486" y="58" width="182" height="104" rx="14" />
        </g>

        <g fill="none" stroke="rgba(22,24,29,.24)" strokeWidth="1.25">
          <path d="M234 110 C258 110 245 224 269 224" />
          <path d="M451 224 C475 224 462 110 486 110" />
          <path d="M360 172 C360 148 420 132 452 126" strokeDasharray="4 6" />
        </g>

        <g fontFamily="var(--font-sans)" fill="var(--ink)">
          <text x="78" y="90" fontSize="15" fontWeight="650">{locale === "zh" ? "输入约束" : "Input constraints"}</text>
          <text x="78" y="118" fontSize="12" fill="var(--ink-2)">{locale === "zh" ? "目标 · 文件 · 边界" : "Goals · files · boundaries"}</text>
          <text x="295" y="204" fontSize="15" fontWeight="650">{locale === "zh" ? "状态回看" : "State review"}</text>
          <text x="295" y="232" fontSize="12" fill="var(--ink-2)">{locale === "zh" ? "已确认事实" : "Confirmed facts"}</text>
          <text x="512" y="90" fontSize="15" fontWeight="650">{locale === "zh" ? "交付结果" : "Deliverable"}</text>
          <text x="512" y="118" fontSize="12" fill="var(--ink-2)">{locale === "zh" ? "可复核输出" : "Reviewable output"}</text>
        </g>

        <path
          d="M84 366 H636"
          fill="none"
          stroke="rgba(22,24,29,.18)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M426 366 H636"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <g fill="var(--white)" stroke="rgba(22,24,29,.28)" strokeWidth="1.5">
          <circle cx="92" cy="366" r="8" />
          <circle cx="258" cy="366" r="8" />
          <circle cx="424" cy="366" r="8" />
        </g>
        <circle cx="636" cy="366" r="9" fill="var(--brand)" />

        <g fontFamily="var(--font-sans)" fontSize="12" fill="var(--ink-3)" textAnchor="middle">
          <text x="92" y="402">{locale === "zh" ? "开始" : "Start"}</text>
          <text x="258" y="402">{locale === "zh" ? "中途修正" : "Mid-course correction"}</text>
          <text x="424" y="402">{locale === "zh" ? "验证" : "Verify"}</text>
          <text x="636" y="402">{locale === "zh" ? "交付" : "Deliver"}</text>
        </g>
      </svg>
    </figure>
  );
}

export function ResearchArtwork() {
  const { locale } = useI18n();

  return (
    <figure className="split-visual artwork-shell" aria-labelledby="research-art-caption">
      <svg className="section-art" viewBox="0 0 720 450" role="img">
        <title id="research-art-caption">
          {locale === "zh" ? "产品验证形成研究证据，再进入模型研究" : "Product validation creates research evidence before model research"}
        </title>
        <defs>
          <pattern id="research-dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.2" r="1.2" fill="rgba(22,24,29,.09)" />
          </pattern>
        </defs>
        <rect width="720" height="450" fill="url(#research-dot-grid)" />

        <g fill="var(--white)" stroke="var(--border)" strokeWidth="1">
          <rect x="52" y="62" width="270" height="130" rx="16" />
          <rect x="398" y="62" width="270" height="130" rx="16" />
          <rect x="164" y="262" width="392" height="122" rx="18" stroke="rgba(126,73,226,.24)" />
        </g>

        <g fill="none" stroke="rgba(22,24,29,.22)" strokeWidth="1.25">
          <path d="M187 192 C187 238 254 268 300 282" />
          <path d="M533 192 C533 238 466 268 420 282" />
        </g>

        <g fontFamily="var(--font-sans)" fill="var(--ink)">
          <text x="82" y="98" fontSize="15" fontWeight="650">{locale === "zh" ? "产品验证" : "Product validation"}</text>
          <text x="82" y="128" fontSize="12" fill="var(--ink-2)">{locale === "zh" ? "真实长任务" : "Real long tasks"}</text>
          <text x="82" y="154" fontSize="12" fill="var(--ink-2)">{locale === "zh" ? "用户反馈" : "User feedback"}</text>
          <text x="428" y="98" fontSize="15" fontWeight="650">{locale === "zh" ? "公开边界" : "Public boundary"}</text>
          <text x="428" y="128" fontSize="12" fill="var(--ink-2)">{locale === "zh" ? "方向级描述" : "Direction-level description"}</text>
          <text x="428" y="154" fontSize="12" fill="var(--ink-2)">{locale === "zh" ? "阶段标注" : "Stage labels"}</text>
        </g>

        <g>
          <rect x="210" y="292" width="82" height="6" rx="3" fill="rgba(22,24,29,.12)" />
          <rect x="210" y="316" width="134" height="6" rx="3" fill="rgba(22,24,29,.08)" />
          <rect x="210" y="340" width="58" height="6" rx="3" fill="var(--brand-soft)" />
          <path
            d="M388 300 H494 M478 284 L496 300 L478 316"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="516" y="306" fontFamily="var(--font-sans)" fontSize="14" fontWeight="650" fill="var(--ink)">
            {locale === "zh" ? "架构研究" : "Architecture research"}
          </text>
        </g>
      </svg>
    </figure>
  );
}

export function LayeredArtwork() {
  const { locale } = useI18n();

  return (
    <figure className="split-visual artwork-shell" aria-labelledby="layered-art-caption">
      <svg className="section-art" viewBox="0 0 720 450" role="img">
        <title id="layered-art-caption">
          {locale === "zh" ? "快答、深想和记忆按任务复杂度分层调度" : "Quick answers, deep reasoning, and memory are scheduled by task complexity"}
        </title>
        <defs>
          <pattern id="layered-dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.2" r="1.2" fill="rgba(22,24,29,.09)" />
          </pattern>
        </defs>
        <rect width="720" height="450" fill="url(#layered-dot-grid)" />

        <path
          d="M90 225 C170 225 205 120 276 120 H580"
          fill="none"
          stroke="rgba(22,24,29,.26)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M90 225 C240 225 300 225 366 225 H580"
          fill="none"
          stroke="rgba(22,24,29,.38)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M90 225 C200 225 250 324 320 324 H580"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <circle cx="90" cy="225" r="10" fill="var(--white)" stroke="var(--ink)" strokeWidth="1.5" />
        <circle cx="580" cy="120" r="8" fill="var(--white)" stroke="rgba(22,24,29,.32)" strokeWidth="1.5" />
        <circle cx="580" cy="225" r="8" fill="var(--white)" stroke="rgba(22,24,29,.42)" strokeWidth="1.5" />
        <circle cx="580" cy="324" r="9" fill="var(--brand)" />

        <g fill="var(--white)" stroke="var(--border)" strokeWidth="1">
          <rect x="150" y="66" width="180" height="72" rx="14" />
          <rect x="226" y="190" width="180" height="72" rx="14" />
          <rect x="196" y="290" width="180" height="72" rx="14" stroke="rgba(126,73,226,.22)" />
        </g>

        <g fontFamily="var(--font-sans)" fill="var(--ink)">
          <text x="174" y="98" fontSize="14" fontWeight="650">{locale === "zh" ? "快答层" : "Quick answer"}</text>
          <text x="174" y="122" fontSize="12" fill="var(--ink-2)">{locale === "zh" ? "低复杂度" : "Low complexity"}</text>
          <text x="250" y="222" fontSize="14" fontWeight="650">{locale === "zh" ? "深想层" : "Deep reasoning"}</text>
          <text x="250" y="246" fontSize="12" fill="var(--ink-2)">{locale === "zh" ? "多步验证" : "Multi-step verification"}</text>
          <text x="220" y="322" fontSize="14" fontWeight="650">{locale === "zh" ? "记忆层" : "Memory"}</text>
          <text x="220" y="346" fontSize="12" fill="var(--ink-2)">{locale === "zh" ? "长期上下文" : "Long-term context"}</text>
        </g>
      </svg>
    </figure>
  );
}
