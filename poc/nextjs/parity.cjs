const http = require("http"), fs = require("fs"), path = require("path"); const { chromium } = require("playwright");
const T = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".txt": "text/plain", ".webmanifest": "application/manifest+json" };
const serve = (ROOT) => new Promise((ok) => { const s = http.createServer((q, r) => { const u = decodeURIComponent(new URL(q.url, "http://x").pathname), p = path.join(ROOT, u); const f = [p, path.join(p, "index.html"), p + ".html"].find((x) => fs.statSync(x, { throwIfNoEntry: false })?.isFile()); if (!f) { r.writeHead(404); return r.end(); } r.writeHead(200, { "content-type": T[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(r); }); s.listen(0, "127.0.0.1", () => ok(s)); });
(async () => {
  const b = await chromium.launch(), res = {};
  const page = async (root) => { const s = await serve(root); const c = await b.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: "block", reducedMotion: "reduce" }); await c.route(/^https?:\/\/(?!127\.0\.0\.1)/, (x) => x.abort()); return { s, c, B: `http://127.0.0.1:${s.address().port}` }; };
  // 1. the static course: open the outline, open a lesson, let it save
  let { s, c, B } = await page(path.resolve("../..")); let p = await c.newPage();
  await p.goto(B + "/lawgradify/course/"); await p.waitForSelector("#course *"); await p.waitForTimeout(800);
  const lesson = await p.$$eval('#course a[href^="#/"]', (a) => a.map((x) => x.getAttribute("href")).find((h) => /#\/(l|lesson|learn)\//.test(h)) || a.map((x) => x.getAttribute("href")).filter((h) => h.split("/").length > 3)[0]);
  res.lesson = lesson; if (lesson) { await p.goto(B + "/lawgradify/course/" + lesson); await p.waitForTimeout(2500); }
  const ls = await p.evaluate(() => Object.fromEntries(Object.keys(localStorage).filter((k) => k.startsWith("gradify")).map((k) => [k, localStorage.getItem(k)])));
  res.savedKeys = Object.keys(ls);
  await p.goto(B + "/lawgradify/course/"); await p.waitForTimeout(1500); const staticHome = await p.$eval("#course", (e) => e.innerText.replace(/\s+/g, " ").slice(0, 600));
  await c.close(); s.close();
  // 2. the Next.js course, same saved state
  ({ s, c, B } = await page(path.resolve("out"))); await c.addInitScript((d) => { if (!sessionStorage.seeded) { for (const [k, v] of Object.entries(d)) localStorage.setItem(k, v); sessionStorage.seeded = 1; } }, ls);
  p = await c.newPage(); await p.goto(B + "/lawgradify/course/"); await p.waitForSelector("#course *"); await p.waitForTimeout(1500);
  const nextHome = await p.$eval("#course", (e) => e.innerText.replace(/\s+/g, " ").slice(0, 600));
  res.sameCourseHome = staticHome === nextHome; if (!res.sameCourseHome) { res.static = staticHome; res.next = nextHome; }
  res.continueShown = /continue|resume|pick up|where you left/i.test(nextHome) ? nextHome.match(/(continue|resume|pick up|where you left)[^.]{0,60}/i)[0] : "(no continue text)";
  if (lesson) { await p.goto(B + "/lawgradify/course/" + lesson); await p.waitForTimeout(1500); res.lessonOpensInNext = await p.$eval("#course", (e) => e.innerText.replace(/\s+/g, " ").slice(0, 100)); }
  await p.screenshot({ path: "out-lesson.png" });
  console.log(JSON.stringify(res, null, 1)); await b.close(); s.close();
})();
