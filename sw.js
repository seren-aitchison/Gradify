// Gradify service worker: lets the site open offline.
// Network first, so a new deploy shows straight away; the cache is the fallback.
const CACHE = "gradify-v73";
const SHELL = [
  "./", "index.html", "app.html", "manifest.webmanifest", "gradify.config.js",
  // homepage
  "assets/styles.css", "assets/app.js", "assets/nav.js", "assets/features.js", "assets/favicon.svg", "assets/icons/icon-192.png", "assets/icons/icon-512.png",
  // the Gradify Kit
  "kit/styles/base.css", "kit/styles/components.css",
  "kit/core/icons.js", "kit/core/colour.js", "kit/core/sites.js", "kit/core/site.js", "kit/core/subnav.js", "kit/core/site-pages.js", "kit/core/site-content.js", "kit/core/subsite-home.js", "kit/core/site-maps.js", "kit/earth/subject-map.js", "kit/learning/topic-match.js", "kit/models/viewer.js", "kit/models/index.js", "kit/models/anatomy-glb.js", "kit/vendor/three/addons/GLTFLoader.js", "kit/vendor/three/addons/meshopt_decoder.module.js", "kit/vendor/three/addons/BufferGeometryUtils.js", "kit/styles/model.css", "kit/vendor/three/addons/EffectComposer.js", "kit/vendor/three/addons/RenderPass.js", "kit/vendor/three/addons/ShaderPass.js", "kit/vendor/three/addons/MaskPass.js", "kit/vendor/three/addons/Pass.js", "kit/vendor/three/addons/UnrealBloomPass.js", "kit/vendor/three/addons/OutputPass.js", "kit/vendor/three/addons/CopyShader.js", "kit/vendor/three/addons/LuminosityHighPassShader.js", "kit/vendor/three/addons/OutputShader.js", "kit/vendor/three/addons/RoomEnvironment.js", "kit/vendor/three/three.module.min.js", "kit/vendor/three/OrbitControls.js", "kit/styles/subsite.css",
  "kit/app/main.js", "kit/app/app.css", "kit/data/store.js", "kit/data/functions.js", "kit/data/profile.js", "kit/core/analytics.js", "kit/core/attribution.js", "kit/learning/pace.js",
  "kit/learning/srs.js", "kit/learning/mastery.js", "kit/learning/evidence-class.js", "kit/learning/targets.js", "kit/learning/achievements.js", "kit/learning/mastery-view.js", "kit/learning/learner-data.js", "kit/lifeos/mine.js",
  "kit/course/course.js", "kit/course/notes.js", "kit/course/road.js", "kit/course/syllabus.js", "kit/core/text.js", "kit/assess/questions.js", "kit/assess/model.js", "kit/assess/types.js", "kit/assess/attempts.js", "kit/assess/exam.js", "kit/assess/tutor.js", "kit/assess/tutor-view.js", "kit/course/tutor-panel.js", "kit/course/lab-state.js", "kit/styles/course.css", "kit/courses/physics/course.js", "kit/courses/physics/interactives.js", "kit/courses/physics/syllabus.js", "kit/courses/law/course.js", "kit/courses/law/syllabus.js", "kit/courses/law/qa.js", "kit/courses/law/ids.js", "kit/courses/law/registry.js", "kit/courses/law/map.js", "kit/courses/nursing/course.js", "kit/courses/nursing/syllabus.js", "kit/courses/nursing/qa.js", "kit/courses/nursing/ids.js", "kit/courses/nursing/registry.js", "kit/courses/nursing/map.js",
  "kit/labs/lab.js", "kit/styles/labs.css",
  "kit/courses/biology/course.js", "kit/courses/biology/syllabus.js", "kit/courses/biology/ids.js", "kit/courses/biology/qa.js", "kit/courses/biology/interactives.js",
  "kit/courses/chemistry/course.js", "kit/courses/chemistry/syllabus.js", "kit/courses/chemistry/ids.js", "kit/courses/chemistry/qa.js", "kit/courses/chemistry/interactives.js",
  "kit/courses/psychology/course.js", "kit/courses/psychology/syllabus.js", "kit/courses/psychology/ids.js", "kit/courses/psychology/qa.js", "kit/courses/psychology/interactives.js", "kit/courses/psychology/registry.js",
  "kit/courses/sociology/course.js", "kit/courses/sociology/syllabus.js", "kit/courses/sociology/ids.js", "kit/courses/sociology/qa.js", "kit/courses/sociology/interactives.js", "kit/courses/sociology/registry.js",
  "kit/styles/social-labs.css", "kit/labs/social/stats.js", "kit/labs/social/ui.js",
  "kit/notes/studio.js", "kit/notes/video3d.js", "kit/notes/engine.js", "kit/notes/pack.js",
  "kit/earth/globe.js", "kit/earth/surface.js", "kit/earth/earth-land.js",
  "kit/lifeos/lifeos.js", "kit/lifeos/os.js", "kit/lifeos/earth.js", "kit/lifeos/plan.js", "kit/lifeos/calendar.js", "kit/lifeos/assistant.js", "kit/lifeos/community.js", "kit/lifeos/study.js", "kit/lifeos/tree.js", "kit/lifeos/island3d.js",
  "kit/vendor/pdfjs/pdf.min.js", "kit/vendor/pdfjs/pdf.worker.min.js", "kit/vendor/supabase/supabase.js",
  "kit/courses/health/course.js", "kit/courses/health/syllabus.js", "kit/courses/health/ids.js", "kit/courses/health/qa.js", "kit/courses/health/interactives.js", "kit/courses/health/evidence.js", "kit/courses/health/registry.js",
  "kit/courses/history/course.js", "kit/courses/history/syllabus.js", "kit/courses/history/ids.js", "kit/courses/history/qa.js", "kit/courses/history/interactives.js", "kit/courses/history/evidence.js", "kit/courses/history/registry.js",
  "kit/courses/ecology/course.js", "kit/courses/ecology/syllabus.js", "kit/courses/ecology/ids.js", "kit/courses/ecology/qa.js", "kit/courses/ecology/interactives.js", "kit/courses/ecology/evidence.js", "kit/courses/ecology/registry.js",
  "kit/courses/engineering/course.js", "kit/courses/engineering/syllabus.js", "kit/courses/engineering/ids.js", "kit/courses/engineering/qa.js", "kit/courses/engineering/interactives.js", "kit/courses/engineering/evidence.js", "kit/courses/engineering/registry.js",
  "kit/courses/literature/course.js", "kit/courses/literature/syllabus.js", "kit/courses/literature/ids.js", "kit/courses/literature/qa.js", "kit/courses/literature/interactives.js", "kit/courses/literature/evidence.js", "kit/courses/literature/registry.js",
  "kit/courses/finance/course.js", "kit/courses/finance/syllabus.js", "kit/courses/finance/ids.js", "kit/courses/finance/qa.js", "kit/courses/finance/interactives.js", "kit/courses/finance/evidence.js", "kit/courses/finance/registry.js",
  "kit/courses/medicine/course.js", "kit/courses/medicine/syllabus.js", "kit/courses/medicine/ids.js", "kit/courses/medicine/qa.js", "kit/courses/medicine/interactives.js", "kit/courses/medicine/evidence.js", "kit/courses/medicine/registry.js",
  "kit/courses/art/course.js", "kit/courses/art/syllabus.js", "kit/courses/art/ids.js", "kit/courses/art/qa.js", "kit/courses/art/interactives.js", "kit/courses/art/evidence.js", "kit/courses/art/registry.js",
  "kit/courses/business/course.js", "kit/courses/business/syllabus.js", "kit/courses/business/ids.js", "kit/courses/business/qa.js", "kit/courses/business/interactives.js", "kit/courses/business/evidence.js", "kit/courses/business/registry.js",
  "kit/courses/dentistry/course.js", "kit/courses/dentistry/syllabus.js", "kit/courses/dentistry/ids.js", "kit/courses/dentistry/qa.js", "kit/courses/dentistry/interactives.js", "kit/courses/dentistry/evidence.js", "kit/courses/dentistry/registry.js",
  "kit/courses/investing/course.js", "kit/courses/investing/syllabus.js", "kit/courses/investing/ids.js", "kit/courses/investing/qa.js", "kit/courses/investing/interactives.js", "kit/courses/investing/evidence.js", "kit/courses/investing/registry.js",
  "kit/courses/music/course.js", "kit/courses/music/syllabus.js", "kit/courses/music/ids.js", "kit/courses/music/qa.js", "kit/courses/music/interactives.js", "kit/courses/music/evidence.js", "kit/courses/music/registry.js",
  "kit/courses/sport/course.js", "kit/courses/sport/syllabus.js", "kit/courses/sport/ids.js", "kit/courses/sport/qa.js", "kit/courses/sport/interactives.js", "kit/courses/sport/evidence.js", "kit/courses/sport/registry.js",
  "kit/courses/teaching/course.js", "kit/courses/teaching/syllabus.js", "kit/courses/teaching/ids.js", "kit/courses/teaching/qa.js", "kit/courses/teaching/interactives.js", "kit/courses/teaching/evidence.js", "kit/courses/teaching/registry.js",
  "kit/courses/veterinary/course.js", "kit/courses/veterinary/syllabus.js", "kit/courses/veterinary/ids.js", "kit/courses/veterinary/qa.js", "kit/courses/veterinary/interactives.js", "kit/courses/veterinary/evidence.js", "kit/courses/veterinary/registry.js",
  "kit/courses/design/course.js", "kit/courses/design/syllabus.js", "kit/courses/design/ids.js", "kit/courses/design/qa.js", "kit/courses/design/interactives.js", "kit/courses/design/evidence.js", "kit/courses/design/registry.js",
  "kit/courses/gcse/course.js", "kit/courses/gcse/syllabus.js", "kit/courses/gcse/ids.js", "kit/courses/gcse/qa.js", "kit/courses/gcse/interactives.js", "kit/courses/gcse/evidence.js", "kit/courses/gcse/registry.js",
  "kit/courses/primary/course.js", "kit/courses/primary/syllabus.js", "kit/courses/primary/ids.js", "kit/courses/primary/qa.js", "kit/courses/primary/interactives.js", "kit/courses/primary/evidence.js", "kit/courses/primary/registry.js",
  "kit/courses/professional/course.js", "kit/courses/professional/syllabus.js", "kit/courses/professional/ids.js", "kit/courses/professional/qa.js", "kit/courses/professional/interactives.js", "kit/courses/professional/evidence.js", "kit/courses/professional/registry.js",
  "kit/courses/research/course.js", "kit/courses/research/syllabus.js", "kit/courses/research/ids.js", "kit/courses/research/qa.js", "kit/courses/research/interactives.js", "kit/courses/research/evidence.js", "kit/courses/research/registry.js",
  "kit/courses/university/course.js", "kit/courses/university/syllabus.js", "kit/courses/university/ids.js", "kit/courses/university/qa.js", "kit/courses/university/interactives.js", "kit/courses/university/evidence.js", "kit/courses/university/registry.js",
  "kit/courses/careers/course.js", "kit/courses/careers/syllabus.js", "kit/courses/careers/ids.js", "kit/courses/careers/qa.js", "kit/courses/careers/interactives.js", "kit/courses/careers/evidence.js", "kit/courses/careers/registry.js",
  "kit/courses/computing/course.js", "kit/courses/computing/syllabus.js", "kit/courses/computing/ids.js", "kit/courses/computing/qa.js", "kit/courses/computing/interactives.js", "kit/courses/computing/evidence.js", "kit/courses/computing/registry.js",
  "kit/courses/spanish/course.js", "kit/courses/spanish/syllabus.js", "kit/courses/spanish/ids.js", "kit/courses/spanish/qa.js", "kit/courses/spanish/interactives.js", "kit/courses/spanish/evidence.js", "kit/courses/spanish/registry.js",
  // the shared interactive engine and each course's lab lists and evidence maps (each lab itself is cached when first opened)
  "kit/course/review.js", "kit/course/reviews.js", "kit/course/ix-manifest.js", "kit/courses/biology/evidence.js", "kit/courses/chemistry/evidence.js", "kit/courses/physics/evidence.js", "kit/courses/psychology/evidence.js", "kit/courses/sociology/evidence.js", "kit/courses/maths/evidence.js", "kit/courses/maths/interactives.js", "kit/interactive/scenario.js", "kit/interactive/trainers.js", "kit/interactive/pharmcalc.js", "kit/interactive/mathgen.js", "kit/interactive/grapher.js", "kit/interactive/mathexpr.js", "kit/interactive/stepcheck.js", "kit/interactive/reasoning.js", "kit/interactive/clinsim.js", "kit/interactive/news2.js",
];

self.addEventListener("install", (e) => {
  // fetched from the network, not the browser's HTTP cache, so a new version never stores a mix of old and new files
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting()));
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
    // same-origin files are revalidated with the server (a cheap 304 when unchanged): a module from the HTTP cache can be
    // older than the module importing it, and after a deploy that mix fails to load
    fetch(req, sameOrigin ? { cache: "no-cache" } : undefined).then((res) => {
      if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then((hit) => hit || (req.mode === "navigate" ? caches.match("index.html") : undefined))),
  );
});
