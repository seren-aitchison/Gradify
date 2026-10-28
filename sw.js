// Gradify service worker: lets the site open offline.
// Network first, so a new deploy shows straight away; the cache is the fallback.
const CACHE = "gradify-v4";
const SHELL = [
  "./", "index.html", "app.html", "assets/app/app.css", "assets/app/main.js", "assets/app/store.js", "assets/app/engine.js", "assets/app/srs.js", "assets/app/config.js", "supabase/functions/_shared/pack.js", "assets/vendor/supabase/supabase.js", "manifest.webmanifest",
  "assets/styles.css", "assets/app.js", "assets/sites.js", "assets/icons.js", "assets/colour.js", "assets/nav.js",
  "assets/os.js", "assets/lifeos.js", "assets/earth.js", "assets/plan.js", "assets/assistant.js", "assets/community.js", "assets/study.js", "assets/calendar.js", "assets/tree.js", "assets/studio.js", "assets/features.js", "assets/vendor/pdfjs/pdf.min.js", "assets/vendor/pdfjs/pdf.worker.min.js", "assets/favicon.svg", "assets/icons/icon-192.png", "assets/icons/icon-512.png",
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
