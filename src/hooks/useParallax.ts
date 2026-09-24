import { useEffect, useRef } from "react";

/**
 * 克制的滚动视差：元素随视口滚动做小幅上下位移。
 * 依据 stepfun-design skill——动效服务内容、幅度小、可关闭、不引依赖。
 * prefers-reduced-motion 下不做任何位移。
 */
export function useParallax<T extends HTMLElement>(strength = 18) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      if (!visible) return;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // 元素中点相对视口中心的偏移，映射到 [-1, 1]
      const progress = (rect.top + rect.height / 2 - viewport / 2) / (viewport / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      element.style.transform = `translate3d(0, ${(clamped * strength).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting;
        });
        onScroll();
      },
      { rootMargin: "120px 0px" },
    );

    observer.observe(element);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      element.style.transform = "";
    };
  }, [strength]);

  return ref;
}
