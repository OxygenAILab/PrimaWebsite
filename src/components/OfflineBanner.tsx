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

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);

    if (navigator.onLine === false) goOffline();

    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
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
