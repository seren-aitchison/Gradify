// Gradify service worker: lets the site open offline.
// Network first, so a new deploy shows straight away; the cache is the fallback.
const CACHE = "gradify-v39";
const SHELL = [
  "./", "index.html", "app.html", "manifest.webmanifest", "gradify.config.js",
  // homepage
  "assets/styles.css", "assets/app.js", "assets/nav.js", "assets/features.js", "assets/favicon.svg", "assets/icons/icon-192.png", "assets/icons/icon-512.png",
  // the Gradify Kit
  "kit/styles/base.css", "kit/styles/components.css",
  "kit/core/icons.js", "kit/core/colour.js", "kit/core/sites.js", "kit/core/site.js", "kit/core/site-pages.js", "kit/core/site-content.js", "kit/core/subsite-home.js", "kit/core/site-maps.js", "kit/earth/subject-map.js", "kit/learning/topic-match.js", "kit/models/viewer.js", "kit/models/index.js", "kit/models/anatomy-glb.js", "kit/vendor/three/addons/GLTFLoader.js", "kit/vendor/three/addons/meshopt_decoder.module.js", "kit/vendor/three/addons/BufferGeometryUtils.js", "kit/styles/model.css", "kit/vendor/three/addons/EffectComposer.js", "kit/vendor/three/addons/RenderPass.js", "kit/vendor/three/addons/ShaderPass.js", "kit/vendor/three/addons/MaskPass.js", "kit/vendor/three/addons/Pass.js", "kit/vendor/three/addons/UnrealBloomPass.js", "kit/vendor/three/addons/OutputPass.js", "kit/vendor/three/addons/CopyShader.js", "kit/vendor/three/addons/LuminosityHighPassShader.js", "kit/vendor/three/addons/OutputShader.js", "kit/vendor/three/addons/RoomEnvironment.js", "kit/vendor/three/three.module.min.js", "kit/vendor/three/OrbitControls.js", "kit/styles/subsite.css",
  "kit/app/main.js", "kit/app/app.css", "kit/data/store.js",
  "kit/learning/srs.js", "kit/learning/mastery.js",
  "kit/course/course.js", "kit/course/notes.js", "kit/course/road.js", "kit/course/syllabus.js", "kit/core/text.js", "kit/assess/questions.js", "kit/assess/model.js", "kit/assess/types.js", "kit/assess/attempts.js", "kit/assess/exam.js", "kit/styles/course.css", "kit/courses/physics/course.js", "kit/courses/physics/syllabus.js", "kit/courses/law/course.js", "kit/courses/law/syllabus.js", "kit/courses/law/qa.js", "kit/courses/law/ids.js", "kit/courses/law/registry.js", "kit/courses/law/map.js", "kit/courses/nursing/course.js", "kit/courses/nursing/syllabus.js", "kit/courses/nursing/qa.js", "kit/courses/nursing/ids.js", "kit/courses/nursing/registry.js", "kit/courses/nursing/map.js",
  "kit/labs/lab.js", "kit/styles/labs.css",
  "kit/courses/biology/course.js", "kit/courses/biology/syllabus.js", "kit/courses/biology/ids.js", "kit/courses/biology/qa.js", "kit/courses/biology/interactives.js",
  "kit/courses/chemistry/course.js", "kit/courses/chemistry/syllabus.js", "kit/courses/chemistry/ids.js", "kit/courses/chemistry/qa.js", "kit/courses/chemistry/interactives.js",
  "kit/notes/studio.js", "kit/notes/video3d.js", "kit/notes/engine.js", "kit/notes/pack.js",
  "kit/earth/globe.js", "kit/earth/earth-land.js",
  "kit/lifeos/lifeos.js", "kit/lifeos/os.js", "kit/lifeos/earth.js", "kit/lifeos/plan.js", "kit/lifeos/calendar.js", "kit/lifeos/assistant.js", "kit/lifeos/community.js", "kit/lifeos/study.js", "kit/lifeos/tree.js",
  "kit/vendor/pdfjs/pdf.min.js", "kit/vendor/pdfjs/pdf.worker.min.js", "kit/vendor/supabase/supabase.js",
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
