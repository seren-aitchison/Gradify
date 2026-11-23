const http = require("http"), fs = require("fs"), path = require("path"); const { chromium } = require("playwright");
const T = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".txt": "text/plain", ".webmanifest": "application/manifest+json" };
const serve = (ROOT) => new Promise((ok) => { const s = http.createServer((q, r) => { const u = decodeURIComponent(new URL(q.url, "http://x").pathname), p = path.join(ROOT, u); const f = [p, path.join(p, "index.html"), p + ".html"].find((x) => fs.statSync(x, { throwIfNoEntry: false })?.isFile()); if (!f) { r.writeHead(404); return r.end(); } r.writeHead(200, { "content-type": T[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(r); }); s.listen(0, "127.0.0.1", () => ok(s)); });
// Saved progress carries over: open a real lesson on the current static course, carry its saved state to the Next.js
// course (same origin in production, so the same localStorage), and compare what both show. Exits non-zero on failure.
const checks = []; const check = (name, ok, detail) => checks.push({ name, ok: Boolean(ok), detail });
// the whole course view as displayed, normalised for whitespace (never a sample: a sample hid a styling difference once)
const text = (p) => p.$eval("#course", (e) => e.innerText.replace(/\s+/g, " ").trim());
// where two texts first differ, for the failure message
const firstDiff = (a, b) => { let i = 0; while (i < a.length && a[i] === b[i]) i++; return `${a.length} vs ${b.length} characters; first difference at ${i}: static "…${a.slice(Math.max(0, i - 60), i + 80)}" | next "…${b.slice(Math.max(0, i - 60), i + 80)}"`; };
// a lesson's own notes, once they've rendered (not the previous view, not the "notes coming soon" placeholder)
// the kit stylesheets a page actually has once the course has mounted (the engine adds some itself)
const sheets = (p) => p.$$eval('link[rel="stylesheet"]', (l) => l.map((x) => new URL(x.href).pathname).filter((h) => h.startsWith("/kit/") && h !== "/kit/styles/system.css"));
const notes = async (p, hash) => { await p.waitForFunction((h) => location.hash === h && !document.querySelector("#course .co-lesson .co-empty") && (document.querySelector("#course .co-lesson .co-prose")?.innerText.trim().length || 0) > 200, hash, { timeout: 15000 }); return p.$eval("#course .co-lesson .co-prose", (e) => e.innerText.replace(/\s+/g, " ").trim()); };
(async () => {
  let b; const servers = [];
  try {
    b = await chromium.launch();
    const page = async (root) => { const s = await serve(root); servers.push(s); const c = await b.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: "block", reducedMotion: "reduce" }); await c.route(/^https?:\/\/(?!127\.0\.0\.1)/, (x) => x.abort()); return { c, B: `http://127.0.0.1:${s.address().port}` }; };
    // 1. the static course: find a lesson (from a unit page if the home view has none), open it, let it save
    let { c, B } = await page(path.resolve("../..")); let p = await c.newPage();
    await p.goto(B + "/lawgradify/course/"); await p.waitForSelector("#course *"); await p.waitForTimeout(800);
    let lesson = await p.$$eval('#course a[href^="#/lesson/"]', (a) => a[0]?.getAttribute("href"));
    if (!lesson) { await p.click('#course a[href^="#/learn/"]'); await p.waitForTimeout(1000); lesson = await p.$$eval('#course a[href^="#/lesson/"]', (a) => a[0]?.getAttribute("href")); }
    check("a lesson link exists on the static course", lesson, lesson);
    if (!lesson) throw new Error("no lesson to compare");
    await p.goto(B + "/lawgradify/course/" + lesson);
    const staticLesson = await notes(p, lesson); await p.waitForTimeout(1000);
    const ls = await p.evaluate(() => Object.fromEntries(Object.keys(localStorage).filter((k) => k.startsWith("gradify")).map((k) => [k, localStorage.getItem(k)])));
    check("the static course saved progress", "gradify.course.law" in ls, Object.keys(ls).join(", "));
    await p.goto(B + "/lawgradify/course/"); await p.waitForTimeout(1500); const staticHome = await text(p); const staticSheets = await sheets(p);
    await c.close();
    // 2. the Next.js course, same saved state
    ({ c, B } = await page(path.resolve("out")));
    await c.addInitScript((d) => { if (!sessionStorage.seeded) { for (const [k, v] of Object.entries(d)) localStorage.setItem(k, v); sessionStorage.seeded = 1; } }, ls);
    p = await c.newPage(); await p.goto(B + "/lawgradify/course/"); await p.waitForSelector("#course *"); await p.waitForTimeout(1500);
    const nextHome = await text(p);
    const nextSheets = await sheets(p);
    check("same kit stylesheets as the static course, in the same order", JSON.stringify(staticSheets) === JSON.stringify(nextSheets), `static ${staticSheets.join(", ")} | next ${nextSheets.join(", ")}`);
    check("course home identical with the same saved progress", staticHome === nextHome, staticHome === nextHome ? `${staticHome.length} characters` : firstDiff(staticHome, nextHome));
    await p.goto(B + "/lawgradify/course/" + lesson);
    const nextLesson = await notes(p, lesson);
    check(`lesson ${lesson} notes identical`, staticLesson === nextLesson, staticLesson === nextLesson ? `${staticLesson.length} characters` : firstDiff(staticLesson, nextLesson));
    await p.screenshot({ path: "out-lesson.png" });
  } catch (e) {
    check("parity check ran to the end", false, e.message.split("\n")[0]);
  } finally {
    await b?.close(); servers.forEach((s) => s.close());
    for (const x of checks) console.log(`${x.ok ? "ok  " : "FAIL"} ${x.name}${x.detail !== undefined && !x.ok ? `: ${x.detail}` : ""}`);
    const bad = checks.filter((x) => !x.ok).length;
    console.log(bad ? `${bad} of ${checks.length} checks failed` : `all ${checks.length} checks passed`);
    process.exitCode = bad ? 1 : 0;
  }
})();
