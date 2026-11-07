// Opens every registered interactive in Chromium and checks it works as part of the learning system
// (docs/INTERACTIVE-ROADMAP.md, Stage A). Run before deploying changes to interactives or the course engine.
//   node scripts/check-interactives.cjs --serve <dir>     a built site or the repository, served locally
//   node scripts/check-interactives.cjs --url https://getgradify.com
//   options: --course <slug> (one course)   --declared <file.json> (write every interactive's challenges, for
//            scripts/evidence-maps.mjs)   --report <file.json>
// For every interactive:
//   loads     it mounts in the course page with no script error and draws something
//   mapped    every challenge it declares maps to a lesson (its evidence map)
//   outcomes  driven through the course engine's context, each outcome is stored against the challenge's lesson:
//             attempted (chosen, touched once), unsuccessful (a wrong answer), assisted (met after the answer was
//             shown), successful (met unaided on a later visit)
//   lesson    it can be reached from the first lesson it links to (shown in full, or linked)
//   phone     on an iPhone-sized screen: no script error and no sideways scrolling
// and for one interactive per course, offline: opened once online, it opens again with the network off.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { chromium, devices } = require("playwright");

const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, all) => (x.startsWith("--") ? [...a, [x.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]] : a), []));
const PAGES = { biology: "scigradify/biology/", chemistry: "scigradify/chemistry/", physics: "scigradify/physics/", maths: "mathgradify/course/", law: "lawgradify/course/", nursing: "nursegradify/course/", pharmacy: "pharmagradify/course/", psychology: "psychgradify/course/", sociology: "socgradify/course/" };
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".glb": "model/gltf-binary" };

function serve(dir) {
  const server = http.createServer((req, res) => {
    const u = decodeURIComponent(new URL(req.url, "http://x").pathname); let p = path.join(dir, u);
    let s = fs.statSync(p, { throwIfNoEntry: false });
    if (s?.isDirectory()) { if (!u.endsWith("/")) { res.writeHead(301, { location: `${u}/` }); return res.end(); } p = path.join(p, "index.html"); s = fs.statSync(p, { throwIfNoEntry: false }); }
    if (!s?.isFile()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": TYPES[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(res);
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok(server)));
}

(async () => {
  let server, base = args.url;
  if (args.serve) { server = await serve(path.resolve(args.serve)); base = `http://127.0.0.1:${server.address().port}`; }
  if (!base) { console.error("usage: node scripts/check-interactives.cjs --serve <dir> | --url <site>"); process.exit(2); }
  base = base.replace(/\/$/, "");
  const browser = await chromium.launch();
  const results = {}, declaredOut = {}, problems = [];
  const courses = Object.entries(PAGES).filter(([slug]) => !args.course || args.course === slug);

  async function checkCourse([slug, page]) {
    const cfg = (await import(path.resolve(__dirname, "..", "kit/courses", slug, "course.js"))).default;
    const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, serviceWorkers: "block" });
    const phone = await browser.newContext({ ...devices["iPhone 13"], serviceWorkers: "block" });
    const p = await ctx.newPage(), ph = await phone.newPage(), errs = [], perrs = [];
    p.on("pageerror", (e) => errs.push(e.message)); ph.on("pageerror", (e) => perrs.push(e.message));
    await p.goto(`${base}/${page}`, { waitUntil: "load" }); await ph.goto(`${base}/${page}`, { waitUntil: "load" });
    await p.waitForTimeout(800);
    const go = async (pg, hash, wait = 1100) => { await pg.evaluate((h) => { location.hash = h; }, hash); await pg.waitForTimeout(wait); };
    results[slug] = { interactives: cfg.interactives.length, loads: 0, mapped: 0, outcomes: 0, lesson: 0, phone: 0 }; declaredOut[slug] = {};
    for (const x of cfg.interactives) {
      const fail = (what) => problems.push(`${slug}/${x.id}: ${what}`);
      if (args.verbose) console.log(`  ${slug}/${x.id}`);
      // loads, and what it declares
      const e0 = errs.length; await go(p, "#/practice"); await go(p, `#/practice/${x.id}`, 1300);
      const info = await p.evaluate(() => { const el = [...document.querySelectorAll(".co-labstage, .co-ix")].find((e) => e.gradifyIx); return el ? { drawn: el.innerHTML.length > 200, declared: el.gradifyIx.declared(), evidence: el.gradifyIx.evidence, onOpen: el.gradifyIx.metOnOpen() } : null; });
      if (!info) { fail("didn't mount"); continue; }
      declaredOut[slug][x.id] = info.declared;
      if (errs.length > e0) fail(`script error: ${errs.at(-1).slice(0, 120)}`); else if (!info.drawn) fail("drew nothing"); else results[slug].loads++;
      // nothing may be met just by opening it (the engine ignores such completions; the lab's start state should be fixed)
      if (info.onOpen.length) fail(`challenge met on opening, before any interaction: ${info.onOpen.join(", ")}`);
      const unmapped = info.declared.filter((c) => !info.evidence[c.id]);
      if (!info.declared.length) fail("declares no challenges"); else if (unmapped.length) fail(`challenges without a lesson: ${unmapped.map((c) => c.id).join(", ")}`); else results[slug].mapped++;
      // the four outcomes, through the engine
      if (info.declared.length) {
        const T = (info.declared.find((c) => !info.onOpen.includes(c.id)) || info.declared[0]).id, lesson = info.evidence[T];
        await p.evaluate(() => [...document.querySelectorAll(".co-labstage, .co-ix")].find((e) => e.gradifyIx).gradifyIx.touch());
        const step = async (fn) => p.evaluate(fn, T);
        await step((t) => { const g = [...document.querySelectorAll(".co-labstage, .co-ix")].find((e) => e.gradifyIx).gradifyIx; g.ctx.focus?.(t); });
        await p.evaluate(() => { const el = [...document.querySelectorAll(".co-labstage, .co-ix")].find((e) => e.gradifyIx); el.dispatchEvent(new Event("change", { bubbles: true })); });
        await step((t) => { const g = [...document.querySelectorAll(".co-labstage, .co-ix")].find((e) => e.gradifyIx).gradifyIx; g.ctx.focus?.(null); g.ctx.fail(t, "check"); g.ctx.fail(t, "check", { revealed: true }); g.ctx.complete(t, "check"); });
        await go(p, "#/practice", 400); await go(p, `#/practice/${x.id}`, 1200);
        await step((t) => { const g = [...document.querySelectorAll(".co-labstage, .co-ix")].find((e) => e.gradifyIx).gradifyIx; g.touch(); g.ctx.complete(t, "check"); });
        const recs = await p.evaluate((t) => { const g = [...document.querySelectorAll(".co-labstage, .co-ix")].find((e) => e.gradifyIx).gradifyIx; return g.attempts().filter((a) => a.question?.id === `ix:${g.id}:${t}`).map((a) => ({ o: a.response?.outcome, l: a.lesson })); }, T);
        const want = [x.evidence || cfg.evidence?.[x.id] ? "attempted" : null, "unsuccessful", "assisted_success", "success"].filter(Boolean);
        const got = recs.map((r) => r.o), lessonsOk = recs.every((r) => r.l === lesson);
        if (JSON.stringify(got) === JSON.stringify(want) && lessonsOk) results[slug].outcomes++; else fail(`outcomes ${JSON.stringify(got)} (expected ${JSON.stringify(want)})${lessonsOk ? "" : `, lesson ${recs.map((r) => r.l)} not ${lesson}`}`);
      }
      // reachable from its first lesson
      await go(p, `#/lesson/${x.lessons[0]}`, 1200);
      const reach = await p.evaluate((id) => Boolean(document.querySelector(`.co-lab[data-ix="${id}"], .co-ixslot[data-ix="${id}"], .co-morelabs a[href="#/practice/${id}"]`)), x.id);
      if (reach) results[slug].lesson++; else fail(`not reachable from its lesson ${x.lessons[0]}`);
      // on a phone
      const pe0 = perrs.length; await go(ph, "#/practice", 300); await go(ph, `#/practice/${x.id}`, 1300);
      const wide = await ph.evaluate(() => { const box = document.querySelector("main .co-labstage, main .co-ix"); return Math.max(document.documentElement.scrollWidth - innerWidth, box ? box.scrollWidth - box.clientWidth : 0); });
      if (perrs.length > pe0) fail(`phone: script error: ${perrs.at(-1).slice(0, 120)}`); else if (wide > 8) fail(`phone: scrolls sideways by ${wide}px`); else results[slug].phone++;
    }
    await ctx.close(); await phone.close();
    // offline: the first interactive, opened online and then again with the network off
    const off = await browser.newContext({ viewport: { width: 1200, height: 900 } }), op = await off.newPage(), x0 = cfg.interactives[0];
    try {
      await op.goto(`${base}/${page}`, { waitUntil: "load" });
      const sw = await op.evaluate(() => Promise.race([navigator.serviceWorker?.ready.then(() => true), new Promise((r) => setTimeout(() => r(false), 8000))]));
      if (!sw) throw new Error("no service worker became active on the course page");
      await op.reload({ waitUntil: "load" }); await op.waitForTimeout(1500);   // now controlled by the worker: the page and its files are cached
      await op.evaluate((h) => { location.hash = h; }, `#/practice/${x0.id}`); await op.waitForTimeout(2500);   // first use of the lab caches it
      await off.setOffline(true);
      await op.reload({ waitUntil: "load" }); await op.waitForTimeout(2500);
      const ok = await op.evaluate(() => Boolean([...document.querySelectorAll(".co-labstage, .co-ix")].find((e) => e.gradifyIx)));
      results[slug].offline = ok ? "ok" : "failed"; if (!ok) problems.push(`${slug}/${x0.id}: didn't open offline after first use`);
    } catch (e) { results[slug].offline = "failed"; problems.push(`${slug}: offline check: ${String(e.message).split("\n")[0]}`); }
    await off.close();
    const r = results[slug];
    console.log(`${slug}: ${r.interactives} interactives · loads ${r.loads} · mapped ${r.mapped} · outcomes ${r.outcomes} · lesson ${r.lesson} · phone ${r.phone} · offline ${r.offline}`);
  }
  // three courses at a time
  const queue = [...courses]; await Promise.all([0, 1, 2].map(async () => { while (queue.length) await checkCourse(queue.shift()); }));
  await browser.close(); server?.close();
  const total = Object.values(results).reduce((a, r) => { for (const k of ["interactives", "loads", "mapped", "outcomes", "lesson", "phone"]) a[k] = (a[k] || 0) + r[k]; return a; }, {});
  console.log(`\nAll: ${total.interactives} interactives · loads ${total.loads} · mapped ${total.mapped} · four outcomes recorded ${total.outcomes} · reachable from a lesson ${total.lesson} · phone ${total.phone} · offline ${Object.values(results).filter((r) => r.offline === "ok").length} of ${Object.keys(results).length} courses`);
  if (args.declared) fs.writeFileSync(args.declared, JSON.stringify(declaredOut, null, 1));
  if (args.report) fs.writeFileSync(args.report, JSON.stringify({ base, at: new Date().toISOString(), results, problems }, null, 2));
  console.log(problems.length ? `${problems.length} problem(s):\n- ${problems.join("\n- ")}` : "No problems.");
  process.exitCode = problems.length ? 1 : 0;
})();
