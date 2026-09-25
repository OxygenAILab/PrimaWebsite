import { useEffect, useRef } from "react";

/**
 * 首屏装饰件：玻璃板拼贴 + 基元点阵 + 制图线稿 + 同心测量环 + 光核 + 游走粒子。
 *
 * 参照 stepfun-design skill 的主视觉公式，做阶跃首屏拼贴动画的同构转译
 * （主题自拟，非素材级复制）。三层运动：
 *   1. 入场：各层按不同延迟淡入上移（cubic-bezier(.22,1,.36,1)，同阶跃 home-content-enter 手感）
 *   2. 常态：玻璃板错时漂浮、光核呼吸、外环自转、粒子游走 —— 页面静止时也在动
 *   3. 响应：随指针做小幅分层位移
 * 全部 CSS 绘制与 transform/opacity 动画，无图片、无第三方依赖。
 * 无障碍：容器 aria-hidden；prefers-reduced-motion 下仅保留静态构图。
 */
export default function HeroArtwork() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = rootRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      frame = 0;
      host.style.setProperty("--art-mx", tx.toFixed(3));
      host.style.setProperty("--art-my", ty.toFixed(3));
    };

    const onMove = (event: PointerEvent) => {
      tx = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      ty = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="hero-artwork" aria-hidden="true">
      <div className="art-field" ref={rootRef}>
        <span className="art-grid" />

        <svg className="art-schematic" viewBox="0 0 600 400" aria-hidden="true">
          <g className="art-schematic-static" fill="none" stroke="currentColor" strokeWidth="1">
            <line x1="30" y1="200" x2="570" y2="200" />
            <line x1="300" y1="16" x2="300" y2="384" />
            <path d="M80 200 L300 68 L520 200 L300 332 Z" />
          </g>
          <g className="art-schematic-orbit" fill="none" stroke="currentColor" strokeWidth="1">
            <ellipse cx="300" cy="200" rx="236" ry="118" strokeDasharray="2 6" />
            <ellipse cx="300" cy="200" rx="146" ry="192" strokeDasharray="2 6" />
          </g>
        </svg>

        <span className="art-plate art-plate-a" />
        <span className="art-plate art-plate-b" />
        <span className="art-plate art-plate-c" />
        <span className="art-plate art-plate-d" />
        <span className="art-plate art-plate-e" />

        <span className="art-ticks" />

        <span className="art-particle art-particle-a" />
        <span className="art-particle art-particle-b" />
        <span className="art-particle art-particle-c" />
        <span className="art-particle art-particle-d" />
        <span className="art-particle art-particle-e" />

        <span className="art-core">
          <span className="art-ring art-ring-inner" />
          <span className="art-ring art-ring-mid" />
          <span className="art-ring art-ring-outer" />
          <span className="art-spark" />
        </span>
      </div>
    </div>
  );
}
