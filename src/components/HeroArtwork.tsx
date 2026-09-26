import { useEffect, useRef } from "react";

/**
 * Prima 首屏主视觉：珍珠生长纹。
 *
 * 一圈圈同心弧从右下方那束光里长出来，越往外越淡——珍珠的层结构就是「一层层累积」，
 * 和分层记忆、珠光白是同一件事。第三圈被点亮，是这次任务里被召回的那层。
 *
 * 实现要点：圆环用 SVG，pathLength=1 把周长归一，于是一组 CSS 变量就能让所有半径
 * 共用同一条 stroke-dashoffset 生长动画；焦点钉在右下靠 preserveAspectRatio 保证。
 * 入场与循环全在 CSS，脚本挂了内容照样在；指针视差只写两个 CSS 变量。
 */

/* 生长纹半径：内密外疏，读作出自同心的年轮 */
const rings = [
  { r: 96, o: 0.2 },
  { r: 158, o: 0.17 },
  { r: 232, o: 0.14 },
  { r: 318, o: 0.11 },
  { r: 416, o: 0.1 },
  { r: 528, o: 0.085 },
  { r: 652, o: 0.07 },
  { r: 788, o: 0.055 },
  { r: 936, o: 0.04 },
  { r: 1096, o: 0.028 },
];

const LIT_INDEX = 2;
const focus = { x: 1250, y: 774 };

export default function HeroArtwork() {
  const fieldRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let tx = 0;
    let ty = 0;
    const apply = () => {
      frame = 0;
      field.style.setProperty("--art-x", tx.toFixed(3));
      field.style.setProperty("--art-y", ty.toFixed(3));
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
    <div className="hero-art" aria-hidden="true">
      <div className="art-field" ref={fieldRef}>
        <span className="art-glow" />
        <span className="art-grid" />

        <svg className="art-rings" viewBox="0 0 1600 900" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
          {rings.map((ring, index) => (
            <circle
              key={ring.r}
              className={index === LIT_INDEX ? "art-ring art-ring-lit" : "art-ring"}
              cx={focus.x}
              cy={focus.y}
              r={ring.r}
              pathLength="1"
              style={{ "--ring-o": ring.o, "--ring-i": index } as React.CSSProperties}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
