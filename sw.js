// Gradify service worker: lets the site open offline.
// Network first, so a new deploy shows straight away; the cache is the fallback.
const CACHE = "gradify-v2";
const SHELL = [
  "./", "index.html", "manifest.webmanifest",
  "assets/styles.css", "assets/app.js", "assets/sites.js", "assets/icons.js", "assets/colour.js", "assets/nav.js",
  "assets/os.js", "assets/lifeos.js", "assets/earth.js", "assets/plan.js", "assets/assistant.js", "assets/capture.js",
  "assets/community.js", "assets/study.js", "assets/favicon.svg", "assets/icons/icon-192.png", "assets/icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const sameOrigin = new URL(req.url).origin === location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(new URL(req.url).hostname);
  if (!sameOrigin && !isFont) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then((hit) => hit || (req.mode === "navigate" ? caches.match("index.html") : undefined))),
  );
});
