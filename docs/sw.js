const CACHE_NAME = "prima-site-v1";
const PRECACHE = [
  "/",
  "/favicon.png",
  "/robots.txt",
  "/sitemap.xml",
  "/404.html",
];

const CACHEABLE_TYPES = new Set([
  "text/css",
  "application/javascript",
  "image/png",
  "image/svg+xml",
  "image/jpeg",
  "font/woff",
  "font/woff2",
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
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match("/")),
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
      PRECACHE.forEach((url) => {
        fetch(url, { cache: "no-cache" })
          .then((response) => {
            if (response.ok) cache.put(url, response);
          })
          .catch(() => {});
      });
    });
  }
});
