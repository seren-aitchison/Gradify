// Loads every published page in Chromium and checks the website works, and that nothing excluded is reachable.
//   node scripts/check-site.cjs --url https://getgradify.com      the live site
//   node scripts/check-site.cjs --serve <dir>                      a built site (node scripts/build-site.mjs <dir>), served
//                                                                  locally the way GitHub Pages serves it
//   options: --report <file.json>   write the full results     --compare <file.json>   only report problems not in that run
// For every page: the page itself loads, no request to the site fails (4xx/5xx or no answer), no script error.
// Every file the allowlist leaves out (docs/, scripts/, supabase/, tests/, package files …) must answer 404.
// Phones: the sub-site menu, no sideways scrolling, course search results on top.
// Offline: the service worker installs, caches its offline list, and the homepage and app open with no network.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, all) => (x.startsWith("--") ? [...a, [x.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]] : a), []));
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".glb": "model/gltf-binary", ".txt": "text/plain", ".xml": "application/xml", ".md": "text/markdown" };

function serve(dir) {
  const notFound = (res) => { res.writeHead(404, { "content-type": TYPES[".html"] }); res.end(fs.existsSync(path.join(dir, "404.html")) ? fs.readFileSync(path.join(dir, "404.html")) : "Not found"); };
  const server = http.createServer((req, res) => {
    const u = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let p = path.join(dir, u);
    if (!p.startsWith(path.resolve(dir))) return notFound(res);
    let s = fs.statSync(p, { throwIfNoEntry: false });
    if (s?.isDirectory()) {
      if (!u.endsWith("/")) { res.writeHead(301, { location: `${u}/` }); return res.end(); }
      p = path.join(p, "index.html"); s = fs.statSync(p, { throwIfNoEntry: false });
    }
    if (!s?.isFile()) return notFound(res);
    res.writeHead(200, { "content-type": TYPES[path.extname(p)] || "application/octet-stream" });
    fs.createReadStream(p).pipe(res);
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok(server)));
}

(async () => {
  const { classify, tracked, references } = await import("./build-site.mjs");
  const { publish, excluded } = classify(tracked());
  let server, base = args.url;
  if (args.serve) { server = await serve(path.resolve(args.serve)); base = `http://127.0.0.1:${server.address().port}`; }
  if (!base) { console.error("usage: node scripts/check-site.cjs --url <site> | --serve <dir>"); process.exit(2); }
  base = base.replace(/\/$/, "");
  const origin = new URL(base).origin;
  const pages = publish.filter((f) => f.endsWith(".html")).map((f) => f.replace(/(^|\/)index\.html$/, "$1"));
  const results = { base, at: new Date().toISOString(), pages: {}, exposed: [], offline: {} };

  const browser = await chromium.launch();
  const context = await browser.newContext({ serviceWorkers: "block" });
  // pages, four at a time
  const queue = [...pages];
  async function worker() {
    while (queue.length) {
      const p = queue.shift(), page = await context.newPage(), r = { status: 0, failed: [], errors: [] };
      page.on("pageerror", (e) => r.errors.push(String(e.message).slice(0, 200)));
      page.on("response", (res) => { if (res.url().startsWith(origin) && res.status() >= 400 && res.request().resourceType() !== "document") r.failed.push(`${res.status()} ${res.url().slice(origin.length)}`); });
      page.on("requestfailed", (req) => { if (req.url().startsWith(origin) && !/ERR_ABORTED/.test(req.failure()?.errorText || "")) r.failed.push(`no answer ${req.url().slice(origin.length)}`); });
      try {
        const res = await page.goto(`${base}/${p}`, { waitUntil: "load", timeout: 45000 });
        r.status = res ? res.status() : 0;
        await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
      } catch (e) { r.errors.push(`load: ${String(e.message).split("\n")[0]}`); }
      results.pages[`/${p}`] = r;
      await page.close();
    }
  }
  await Promise.all([worker(), worker(), worker(), worker()]);

  // nothing excluded is reachable: every left-out file, and the folders themselves
  const probes = [...excluded, "docs/", "scripts/", "supabase/", "tests/", ".github/", ".git/config", "node_modules/"];
  // asked from inside the browser, as a visitor would (and through the same network path as the pages)
  const pp = await context.newPage();
  await pp.goto(`${base}/robots.txt`);
  const statuses = await pp.evaluate(async (list) => Promise.all(list.map((f) => fetch(`/${f}`, { cache: "no-store" }).then((r) => r.status, () => "no answer"))), probes);
  probes.forEach((f, i) => { if (statuses[i] !== 404) results.exposed.push(`${statuses[i]} /${f}`); });
  await pp.close();
  results.probed = probes.length;

  // phones: every page with a sub-site header has a working menu holding its header's links, no page scrolls
  // sideways, and on course pages the lesson search shows its results on top of the page
  const { devices } = require("playwright");
  const phone = await browser.newContext({ ...devices["iPhone 13"], serviceWorkers: "block" });
  const withHeader = publish.filter((f) => f.endsWith(".html") && fs.readFileSync(path.join(__dirname, "..", f), "utf8").includes('class="sub-links"'));
  const courses = publish.filter((f) => /\/(course|biology|chemistry|physics)\/index\.html$/.test(f));
  results.phone = {};
  const phoneQueue = [...new Set([...withHeader, ...courses])];
  async function phoneWorker() {
    while (phoneQueue.length) {
      const f = phoneQueue.shift(), url = `${base}/${f.replace(/(^|\/)index\.html$/, "$1")}`, pg = await phone.newPage(), r = {};
      try {
        await pg.goto(url, { waitUntil: "load", timeout: 45000 });
        await pg.waitForTimeout(800);
        r.sideways = await pg.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        if (await pg.$(".sub-links")) {
          const want = await pg.$$eval(".sub-links a", (as) => as.map((a) => a.textContent.trim()));
          await pg.evaluate(() => scrollTo(0, 0));
          // pressed from the page rather than by Playwright: on the 3D pages a busy WebGL loop starves its click checks
          const btnShown = await pg.evaluate(() => { const b = document.querySelector(".sub-menu-btn"); if (!b || !b.offsetParent) return false; b.click(); return true; });
          if (!btnShown) throw new Error("no visible menu button");
          const got = await pg.$$eval(".sub-menu a", (as) => as.filter((a) => a.offsetParent && !a.classList.contains("sub-menu-signin")).map((a) => a.textContent.trim()));
          const onTop = await pg.evaluate(() => { const m = document.querySelector(".sub-menu"), b = m.getBoundingClientRect(); return Boolean(document.elementFromPoint(b.left + b.width / 2, b.bottom - 12)?.closest(".sub-menu")); });
          r.menu = JSON.stringify(got) === JSON.stringify(want) && onTop ? "ok" : `links ${JSON.stringify(got)} instead of ${JSON.stringify(want)}${onTop ? "" : ", covered by the page"}`;
        }
        if (courses.includes(f)) {
          await pg.evaluate(() => scrollTo(0, 0));
          await pg.focus(".co-search input", { timeout: 10000 });
          await pg.keyboard.type("the");
          await pg.waitForTimeout(400);
          r.search = await pg.evaluate(() => { const el = document.querySelector(".co-results.co-float"); if (!el || el.hidden) return "no results shown"; const b = el.getBoundingClientRect(); return document.elementFromPoint(b.left + b.width / 2, b.top + 16)?.closest(".co-float") ? "ok" : "results hidden behind the page"; });
        }
      } catch (e) { r.error = String(e.message).split("\n")[0]; }
      results.phone[`/${f}`] = r;
      await pg.close();
    }
  }
  await Promise.all([phoneWorker(), phoneWorker(), phoneWorker(), phoneWorker()]);
  await phone.close();

  // offline: a fresh context with the service worker allowed
  const off = await browser.newContext();
  const op = await off.newPage();
  try {
    await op.goto(`${base}/`, { waitUntil: "load" });
    const shell = references("sw.js", fs.readFileSync(path.join(__dirname, "..", "sw.js"), "utf8")).length;
    results.offline.cached = await op.evaluate(async (expected) => {
      await navigator.serviceWorker.ready;
      for (let i = 0; i < 60; i++) {
        const keys = await caches.keys();
        const n = keys.length ? (await (await caches.open(keys[0])).keys()).length : 0;
        if (n >= expected) return n;
        await new Promise((r) => setTimeout(r, 500));
      }
      const keys = await caches.keys();
      return keys.length ? (await (await caches.open(keys[0])).keys()).length : 0;
    }, shell);
    results.offline.expected = shell;
    await off.setOffline(true);
    for (const p of ["", "app.html"]) {
      await op.goto(`${base}/${p}`, { waitUntil: "load", timeout: 20000 });
      results.offline[`/${p}`] = (await op.evaluate(() => document.body.innerText.trim().length)) > 50;
    }
  } catch (e) { results.offline.error = String(e.message).split("\n")[0]; }
  await browser.close();
  server?.close();

  // report
  if (args.report) fs.writeFileSync(args.report, JSON.stringify(results, null, 2));
  const before = args.compare ? JSON.parse(fs.readFileSync(args.compare, "utf8")) : null;
  const known = (p, kind, item) => Boolean(before?.pages[p]?.[kind]?.includes(item));
  const bad = [];
  for (const [p, r] of Object.entries(results.pages)) {
    if (r.status !== 200 && !(p === "/404.html")) bad.push(`${p}: page answered ${r.status}`);
    for (const f of r.failed) if (!known(p, "failed", f)) bad.push(`${p}: ${f}`);
    for (const e of r.errors) if (!known(p, "errors", e)) bad.push(`${p}: script error: ${e}`);
  }
  for (const e of results.exposed) bad.push(`reachable but should not be: ${e}`);
  for (const [p, r] of Object.entries(results.phone || {})) {
    if (r.error) bad.push(`${p} (phone): ${r.error}`);
    if (r.sideways > 0) bad.push(`${p} (phone): scrolls sideways by ${r.sideways}px`);
    if (r.menu && r.menu !== "ok") bad.push(`${p} (phone): menu ${r.menu}`);
    if (r.search && r.search !== "ok") bad.push(`${p} (phone): search ${r.search}`);
  }
  const o = results.offline;
  if (o.error || !(o.cached >= o.expected) || !o["/"] || !o["/app.html"]) bad.push(`offline: ${JSON.stringify(o)}`);
  const preexisting = before ? Object.entries(results.pages).reduce((n, [p, r]) => n + r.failed.filter((f) => known(p, "failed", f)).length + r.errors.filter((e) => known(p, "errors", e)).length, 0) : 0;
  console.log(`${base}: ${pages.length} pages loaded, ${Object.keys(results.phone || {}).length} checked on a phone, ${probes.length} excluded paths probed, offline ${o.cached ?? 0}/${o.expected ?? "?"} cached.`);
  if (before) console.log(`${preexisting} problem(s) already present in ${args.compare} are not counted.`);
  console.log(bad.length ? `${bad.length} problem(s):\n- ${bad.join("\n- ")}` : "No problems.");
  process.exitCode = bad.length ? 1 : 0;
})();
