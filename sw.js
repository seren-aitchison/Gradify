// Gradify service worker: lets the site open offline, and makes return visits instant.
// Each deploy has its own cache: the build stamps CACHE with a hash of what it published (scripts/build-site.mjs), so a
// new deploy installs a new worker whose cache is filled from that deploy alone. Within a deploy, pages and files come
// straight from the cache (no round trip to the server for each of the ~100 files a course page uses), and they all
// belong to the same deploy, so old and new code never mix. A new deploy is fetched in the background and used from
// the next page load.
// Everything in SHELL is kept for offline use, in two steps so a first visit stays light: installing fetches only the
// pages and base styles; everything else (scripts, the PDF reader, the 3D engine, each course's data, the labs, the
// search index) follows right after the page loads, six files at a time, and not at all on Data Saver or a 2G
// connection, where it's cached as it's used instead.
const CACHE = "gradify-v99";
const SHELL = [
  "./", "index.html", "app.html", "manifest.webmanifest", "gradify.config.js",
  // homepage
  "assets/styles.css", "assets/app.js", "assets/proof.js", "assets/nav.js", "assets/features.js", "kit/data/features.js", "assets/favicon.svg", "assets/icons/icon-192.png", "assets/icons/icon-512.png",
  // the Gradify Kit
  "kit/styles/base.css", "kit/styles/components.css", "kit/styles/flashcards.css",
  "kit/core/icons.js", "kit/core/action-card.js", "kit/core/colour.js", "kit/core/sites.js", "kit/core/site.js", "kit/core/subnav.js", "kit/core/site-pages.js", "kit/core/site-content.js", "kit/core/subsite-home.js", "kit/core/site-maps.js", "kit/earth/subject-map.js", "kit/learning/topic-match.js", "kit/models/viewer.js", "kit/models/index.js", "kit/models/anatomy-glb.js", "kit/vendor/three/addons/GLTFLoader.js", "kit/vendor/three/addons/meshopt_decoder.module.js", "kit/vendor/three/addons/BufferGeometryUtils.js", "kit/styles/model.css", "kit/vendor/three/addons/EffectComposer.js", "kit/vendor/three/addons/RenderPass.js", "kit/vendor/three/addons/ShaderPass.js", "kit/vendor/three/addons/MaskPass.js", "kit/vendor/three/addons/Pass.js", "kit/vendor/three/addons/UnrealBloomPass.js", "kit/vendor/three/addons/OutputPass.js", "kit/vendor/three/addons/CopyShader.js", "kit/vendor/three/addons/LuminosityHighPassShader.js", "kit/vendor/three/addons/OutputShader.js", "kit/vendor/three/addons/RoomEnvironment.js", "kit/vendor/three/three.module.min.js", "kit/vendor/three/OrbitControls.js", "kit/styles/subsite.css",
  "kit/app/main.js", "kit/app/app-nav.js", "kit/app/history-view.js", "kit/app/continue-view.js", "kit/app/collections-view.js", "kit/app/widgets-more.js", "kit/ui/quick-dock.js", "kit/ui/quick-actions.js", "kit/core/resource.js", "kit/data/learner-state.js", "kit/data/links.js", "kit/app/cockpit.js", "kit/app/intel-views.js", "kit/intel/memory.js", "kit/intel/priority.js", "kit/intel/schedule.js", "kit/intel/ask.js", "kit/intel/model.js", "kit/intel/coach.js", "kit/intel/ical.js", "kit/intel/calsync.js", "kit/intel/autopilot.js", "kit/intel/nlp.js", "kit/app/autopilot-views.js", "kit/app/widgets.js", "kit/app/notify-views.js", "kit/intel/debt.js", "kit/intel/calibrate.js", "kit/intel/ledger.js", "kit/intel/nudges.js", "kit/core/push.js", "kit/course/lesson-time.js", "kit/core/haptics.js", "kit/core/complete.js", "kit/core/install.js", "kit/core/glass-icons.js", "kit/core/theme-boot.js", "kit/core/consent.js", "kit/core/accent.js", "kit/app/intel3-views.js", "kit/intel/identity.js", "kit/intel/graph.js", "kit/intel/order.js", "kit/intel/cardgen.js", "kit/intel/experiments.js", "kit/intel/readiness.js", "kit/icons3d/gradify.js", "kit/app/app.css", "kit/data/store.js", "kit/data/functions.js", "kit/data/profile.js", "kit/data/academic.js", "kit/data/catalogue.js", "kit/data/catalogue-ids.js", "kit/app/academic-views.js", "kit/app/my-views.js", "kit/data/billing.js", "kit/data/offer.js", "kit/data/plan.js", "kit/core/analytics.js", "kit/core/attribution.js", "kit/learning/pace.js",
  "kit/learning/srs.js", "kit/learning/goal-data.js", "kit/learning/course-states.js", "kit/learning/concepts.js", "kit/learning/goals.js", "kit/game/engine.js", "kit/game/journey.js", "kit/game/habits.js", "kit/game/habits-view.js", "kit/game/challenges.js", "kit/game/achievements.js", "kit/game/quests.js", "kit/data/waitlist.js", "assets/pro.js", "kit/learning/typed.js", "kit/learning/focus.js", "kit/learning/mastery.js", "kit/learning/bkt.js", "kit/learning/bkt-params.js", "kit/learning/evidence-class.js", "kit/learning/targets.js", "kit/learning/achievements.js", "kit/learning/mastery-view.js", "kit/learning/learner-data.js", "kit/lifeos/mine.js",
  "kit/course/course.js", "kit/course/spec-view.js", "kit/learning/spec-mastery.js", "kit/specs/index.js", "kit/specs/aqa-gcse-biology-8461.js", "kit/curriculum/coverage.js", "kit/curriculum/subjects.js", "kit/curriculum/graph.js", "kit/curriculum/uk.js", "kit/ui/pathways.js", "kit/course/navigator.js", "kit/learning/topic-status.js", "kit/assess/target-test.js", "kit/core/continue.js", 
  // the shared UX system (docs/DESIGN-SYSTEM.md) and the Gradify-wide search index
  "kit/ui/index.js", "kit/ui/reveal.js", "kit/styles/system.css", "kit/ui/shelf.js", "kit/ui/store.js", "kit/ui/icons.js", "kit/ui/prefs.js", "kit/ui/places.js", "kit/ui/history.js", "kit/ui/workspace.js", "kit/ui/context-bar.js", "kit/ui/switcher.js", "kit/ui/connections.js", "kit/ui/resource-actions.js", "kit/ui/sync-status.js", "kit/ui/feedback.js", "kit/ui/overlay.js", "kit/ui/keys.js", "kit/ui/disclosure.js", "kit/ui/states.js", "kit/ui/motion.js", "kit/ui/palette.js", "kit/ui/resources.js", "kit/ui/wayfinding.js", "kit/ui/global-nav.js", "kit/ui/explore.js", "kit/ui/feel.js", "kit/ui/mastery-map-view.js", "kit/ui/art.js", "kit/app/curriculum-views.js", "kit/core/render-quality.js", "kit/curriculum/world.js", "kit/data/outcomes.js", "kit/learning/explain.js", "kit/tools/visualise.js", "kit/vendor/three/addons/GTAOPass.js", "kit/vendor/three/addons/GTAOShader.js", "kit/vendor/three/addons/PoissonDenoiseShader.js", "kit/vendor/three/addons/SimplexNoise.js", "kit/visuals/find.js", "kit/visuals/molecule.js", "kit/visuals/procedural.js", "kit/ui/motifs.js", "kit/styles/ui.css", "kit/data/search-index.json",
  "explore.html", "kit/learning/mastery-map.js", "kit/learning/chapter-map.js",
  "kit/course/notes.js", "kit/maps/build.js", "kit/maps/view.js", "kit/maps/spider.js", "kit/maps/maps.css", "kit/core/glass-diagrams.js", "kit/diagrams/visual.js", "kit/diagrams/manifest.json", "kit/data/limits.js", "kit/tools/tools.js", "kit/tools/tools.css", "kit/tools/search.js", "kit/tools/cards.js", "kit/tools/store.js", "kit/tools/convert.js", "kit/tools/mapmaker.js", "kit/tools/cardmaker.js", "kit/tools/converter.js", "kit/core/access-panel.js", "kit/intel/session.js", "kit/app/session-views.js", "kit/tools/material.js", "kit/tools/pick.js", "kit/tools/voice.js", "kit/tools/learn.js", "kit/tools/practise.js", "kit/tools/notebook.js", "kit/tools/handwriting.js", "kit/tools/youtube.js", "kit/tools/projects.js", "kit/app/community.js", "kit/vendor/mind-elixir/MindElixir.js", "kit/vendor/mind-elixir/MindElixir.css", "kit/vendor/liquid-glass/tokens.css", "kit/vendor/liquid-glass/glass-toolbar.css", "kit/vendor/liquid-glass/glass-segmented.css", "kit/vendor/liquid-glass/glass-search.css", "kit/vendor/liquid-glass/glass-surface.css", "kit/vendor/liquid-glass/liquid-glass.js", "kit/course/road.js", "kit/course/syllabus.js", "kit/core/text.js", "kit/assess/questions.js", "kit/assess/model.js", "kit/assess/types.js", "kit/assess/attempts.js", "kit/assess/exam.js", "kit/assess/tutor.js", "kit/assess/tutor-view.js", "kit/course/tutor-panel.js", "kit/course/assistant.js", "kit/ui/liquid-gl.js", "kit/course/lab-state.js", "kit/styles/course.css", "kit/courses/physics/course.js", "kit/courses/physics/interactives.js", "kit/courses/physics/syllabus.js", "kit/courses/law/course.js", "kit/courses/law/syllabus.js", "kit/courses/law/qa.js", "kit/courses/law/ids.js", "kit/courses/law/registry.js", "kit/courses/law/map.js", "kit/courses/nursing/course.js", "kit/courses/nursing/syllabus.js", "kit/courses/nursing/qa.js", "kit/courses/nursing/ids.js", "kit/courses/nursing/registry.js", "kit/courses/nursing/map.js",
  "kit/labs/lab.js", "kit/styles/labs.css",
  "kit/courses/biology/course.js", "kit/courses/biology/syllabus.js", "kit/courses/biology/ids.js", "kit/courses/biology/qa.js", "kit/courses/biology/interactives.js",
  "kit/courses/chemistry/course.js", "kit/courses/chemistry/syllabus.js", "kit/courses/chemistry/ids.js", "kit/courses/chemistry/qa.js", "kit/courses/chemistry/interactives.js",
  "kit/courses/psychology/course.js", "kit/courses/psychology/syllabus.js", "kit/courses/psychology/ids.js", "kit/courses/psychology/qa.js", "kit/courses/psychology/interactives.js", "kit/courses/psychology/registry.js",
  "kit/courses/sociology/course.js", "kit/courses/sociology/syllabus.js", "kit/courses/sociology/ids.js", "kit/courses/sociology/qa.js", "kit/courses/sociology/interactives.js", "kit/courses/sociology/registry.js",
  "kit/styles/social-labs.css", "kit/labs/social/stats.js", "kit/labs/social/ui.js",
  "kit/notes/studio.js", "kit/notes/jot.js", "kit/notes/video3d.js", "kit/notes/engine.js", "kit/notes/pack.js",
  "kit/notes/kb/model.js", "kit/notes/kb/exam.js", "kit/notes/kb/io.js", "kit/notes/kb/ask.js", "kit/notes/kb/store.js", "kit/notes/kb/bridge.js", "kit/notes/kb/view.js", "kit/notes/kb/view-blocks.js", "kit/notes/kb/view-study.js", "kit/notes/kb/view-learn.js", "kit/notes/kb/kb.css",
  "kit/notes/mindmap/config.js", "kit/notes/mindmap/model.js", "kit/notes/mindmap/layout.js", "kit/notes/mindmap/intel.js", "kit/notes/mindmap/memory.js", "kit/notes/mindmap/ask.js", "kit/notes/mindmap/export.js", "kit/notes/mindmap/view.js", "kit/notes/mindmap/mindmap.css",
  "kit/earth/globe.js", "kit/earth/surface.js", "kit/earth/earth-land.js",
  "kit/lifeos/lifeos.js", "kit/lifeos/my-map.js", "kit/core/menu-set.js", "kit/core/hubnav.js", "kit/core/subheader.js", "kit/lifeos/os.js", "kit/lifeos/earth.js", "kit/lifeos/plan.js", "kit/lifeos/calendar.js", "kit/lifeos/assistant.js", "kit/lifeos/community.js", "kit/lifeos/study.js", "kit/lifeos/tree.js", "kit/lifeos/island3d.js",
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
  "kit/courses/japanese/course.js", "kit/courses/japanese/syllabus.js", "kit/courses/japanese/ids.js", "kit/courses/japanese/qa.js", "kit/courses/japanese/interactives.js", "kit/courses/japanese/evidence.js", "kit/courses/japanese/registry.js",
  // the shared interactive engine and each course's lab lists and evidence maps (each lab itself is cached when first opened)
  "kit/course/review.js", "kit/course/reviews.js", "kit/course/ix-manifest.js", "kit/courses/biology/evidence.js", "kit/courses/chemistry/evidence.js", "kit/courses/physics/evidence.js", "kit/courses/psychology/evidence.js", "kit/courses/sociology/evidence.js", "kit/courses/maths/evidence.js", "kit/courses/maths/interactives.js", "kit/interactive/scenario.js", "kit/interactive/trainers.js", "kit/interactive/pharmcalc.js", "kit/interactive/mathgen.js", "kit/interactive/grapher.js", "kit/interactive/mathexpr.js", "kit/interactive/stepcheck.js", "kit/interactive/steprules.js", "kit/interactive/reasoning.js", "kit/interactive/clinsim.js", "kit/interactive/news2.js",
];

// installing fetches only the pages and the base styles (a few files, so the worker is ready at once and a first visit
// isn't competing with its own page load); every script and the rest of the shell is cached in the background pass
// below, which starts as soon as the page has loaded
const CORE_RE = /^(\.\/|index\.html$|app\.html$|explore\.html$|manifest\.webmanifest$|gradify\.config\.js$|assets\/(styles\.css|favicon\.svg|icons\/)|kit\/styles\/(base|components)\.css$)/;
const CORE = SHELL.filter((u) => CORE_RE.test(u)), LATER = SHELL.filter((u) => !CORE_RE.test(u));
// fetched from the network, not the browser's HTTP cache, so a new version never stores a mix of old and new files
const fresh = (u) => new Request(u, { cache: "reload" });
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE.map(fresh))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()).then(() => { warm(); }));
});
// the rest of SHELL, in the background: after a pause (so it never competes with the page being opened), six files
// at a time, skipping what's already cached; once per worker, resumed if the worker was stopped part-way
let warming = null, warmed = false;
const slowLink = () => { const c = self.navigator?.connection; return !!c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")); };
function warm() {
  if (warmed) return Promise.resolve();
  if (warming || slowLink()) return warming || Promise.resolve();
  warming = (async () => {
    await new Promise((r) => setTimeout(r, 1500));
    const cache = await caches.open(CACHE);
    let missing = 0;
    for (let i = 0; i < LATER.length; i += 6) {
      if (slowLink()) return;
      await Promise.all(LATER.slice(i, i + 6).map(async (u) => {
        if (await cache.match(u)) return;
        try { const res = await fetch(fresh(u)); if (res.ok) await cache.put(u, res); else missing++; } catch { missing++; /* offline: tried again next time */ }
      }));
    }
    warmed = !missing;
  })().catch(() => {}).finally(() => { warming = null; });   // a pass cut short (Data Saver, a dropped file) can run again later
  return warming;
}
// only a deployed worker (stamped by the build) serves from the cache first; one served straight from the repository
// (local development) asks the server first, so edits show at once
const DEPLOYED = /-[0-9a-f]{12}$/.test(CACHE);
// a page is cached once, whatever query or hash it was opened with (a sign-in return, a share link): never per query
// at most once a minute, however many files miss
let checked = 0;
const checkForDeploy = () => { if (Date.now() - checked < 60000) return; checked = Date.now(); self.registration.update().catch(() => {}); };
const pageKey = (req) => { const u = new URL(req.url); u.search = ""; u.hash = ""; return u.href; };
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || req.headers.has("range")) return;
  const url = new URL(req.url), sameOrigin = url.origin === location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !isFont) return;
  const page = req.mode === "navigate";
  if (!warmed && !warming && page) e.waitUntil(warm());
  e.respondWith((async () => {
    const cache = await caches.open(CACHE), key = page ? pageKey(req) : req;
    const hit = DEPLOYED && await cache.match(key, page ? { ignoreSearch: true } : undefined);
    if (hit) return hit;
    try {
      // not cached yet in this deploy: from the server, revalidated (a module in the HTTP cache can be older than the
      // one importing it), then kept for next time
      const res = await fetch(req, sameOrigin ? { cache: "no-cache" } : undefined);
      if (res.ok || res.type === "opaque") e.waitUntil(cache.put(key, res.clone()).catch(() => {}));
      // a file this deploy hadn't kept may be from a newer one: look for it, so the next page load is all the new deploy
      // (this cache, and anything newer that got into it, is dropped when that worker takes over)
      if (DEPLOYED && sameOrigin) checkForDeploy();
      return res;
    } catch (err) {
      // offline: whatever this deploy has kept, then the home page
      const kept = await cache.match(key, page ? { ignoreSearch: true } : undefined) || (page && await cache.match("index.html"));
      if (kept) return kept;
      throw err;
    }
  })());
});

// Push notifications (supabase/functions/push-send, rules in kit/intel/nudges.js) and reminders the open app asks for.
self.addEventListener("push", (e) => {
  let n = {};
  try { n = e.data ? e.data.json() : {}; } catch { n = { title: "Gradify", body: e.data?.text() || "" }; }
  e.waitUntil(self.registration.showNotification(n.title || "Gradify", {
    body: n.body || "", tag: n.tag || "gradify", renotify: false,
    icon: "assets/icons/icon-192.png", badge: "assets/icons/icon-192.png", data: { url: n.url || "app.html#/today" },
  }));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = new URL(e.notification.data?.url || "app.html#/today", self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
    const open = list.find((c) => c.url.startsWith(self.registration.scope));
    if (open) { open.navigate(url).catch(() => {}); return open.focus(); }
    return self.clients.openWindow(url);
  }));
});
