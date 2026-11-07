const CACHE_NAME = "prima-site-v2";
// 页面直接读这条缓存记录，判断「上一次导航到底走没走通网络」
const OFFLINE_FLAG = "/__offline-state";
const PRECACHE = [
  "/",
  "/about/",
  "/beta/",
  "/download/",
  "/faq/",
  "/how-it-works/",
  "/model-list/",
  "/pricing/",
  "/privacy/",
  "/roadmap/",
  "/scenarios/",
  "/security/",
  "/terms/",
  "/404.html",
  "/favicon.png",
  "/og.jpg",
  "/robots.txt",
  "/sitemap.xml",
];

const CACHEABLE_TYPES = new Set([
  "text/css",
  // Vite 产物按规范用 text/javascript，旧写法 application/javascript 也要留着
  "text/javascript",
  "application/javascript",
  "application/x-javascript",
  "image/png",
  "image/svg+xml",
  "image/jpeg",
  "image/webp",
  "image/avif",
  "font/woff",
  "font/woff2",
  "font/ttf",
  "font/otf",
  "application/xml",
  "text/plain",
]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
      ),
    ),
  );
  self.clients.claim();
});

function markState(offline) {
  return caches
    .open(CACHE_NAME)
    .then((cache) =>
      cache.put(OFFLINE_FLAG, new Response(offline ? "offline" : "online", { headers: { "content-type": "text/plain" } })),
    )
    .catch(() => {});
}

// 服务器不可达时 navigator.onLine 仍然是 true，所以还要主动告诉页面内容来自缓存。
function broadcast(message) {
  return self.clients
    .matchAll({ type: "window" })
    .then((clients) => clients.forEach((client) => client.postMessage(message)))
    .catch(() => {});
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // HTML: network-first so fresh pages win when online, cache when offline.
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          markState(false);
          broadcast({ type: "NETWORK_OK" });
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => {
            markState(true);
            broadcast({ type: "SERVED_FROM_CACHE" });
            return cached || caches.match("/");
          }),
        ),
    );
    return;
  }

  // Static assets: cache-first, fall back to network and update the cache.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (!response.ok) return response;
          const type = response.headers.get("content-type")?.split(";")[0]?.trim();
          if (type && CACHEABLE_TYPES.has(type)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
    }),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SYNC_CACHE") {
    caches.open(CACHE_NAME).then((cache) => {
      Promise.all(
        PRECACHE.map((url) =>
          fetch(url, { cache: "no-cache" })
            .then((response) => {
              if (!response.ok) return false;
              cache.put(url, response.clone());
              return true;
            })
            .catch(() => false),
        ),
      ).then((results) => markState(results.some((ok) => ok) ? false : true));
    });
  }
});
