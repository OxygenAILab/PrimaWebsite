import { useEffect, useState } from "react";
import { useI18n } from "../i18n";

export default function OfflineBanner() {
  const { locale } = useI18n();
  const [offline, setOffline] = useState(() => !navigator.onLine);

  useEffect(() => {
    const goOffline = () => setOffline(true);
    const goOnline = () => {
      setOffline(false);
      navigator.serviceWorker?.controller?.postMessage({ type: "SYNC_CACHE" });
    };
    const onServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data?.type === "SERVED_FROM_CACHE") setOffline(true);
      if (event.data?.type === "NETWORK_OK") setOffline(false);
    };
    // 首次渲染发生在 Service Worker 处理完导航之后，先读它留下的状态标记
    let cancelled = false;
    const syncFromCacheFlag = async () => {
      try {
        const hit = await caches.match("/__offline-state");
        if (!hit || cancelled) return;
        setOffline((await hit.text()) === "offline");
      } catch {
        /* 没有 Cache Storage 时沿用 navigator.onLine */
      }
    };
    syncFromCacheFlag();

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    navigator.serviceWorker?.addEventListener("message", onServiceWorkerMessage);

    if (navigator.onLine === false) goOffline();

    return () => {
      cancelled = true;
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
      navigator.serviceWorker?.removeEventListener("message", onServiceWorkerMessage);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="offline-banner" role="status" aria-live="polite">
      <span>
        {locale === "zh"
          ? "网络不稳定，正在浏览缓存页面。恢复后我们会自动同步。"
          : "Network is unstable; showing cached pages. We'll sync automatically when it recovers."}
      </span>
    </div>
  );
}
