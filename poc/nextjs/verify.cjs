// Serves out/ the way GitHub Pages does (folder → index.html, /x → x.html, else 404.html) and checks the PoC in Chromium.
const http = require("http"), fs = require("fs"), path = require("path"); const { chromium } = require("playwright");
const ROOT = path.resolve("out");
const T = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".txt": "text/plain", ".webmanifest": "application/manifest+json", ".woff2": "font/woff2" };
const file = (p) => fs.statSync(p, { throwIfNoEntry: false })?.isFile() && p;
const s = http.createServer((q, r) => {
  const u = decodeURIComponent(new URL(q.url, "http://x").pathname), p = path.join(ROOT, u);
  if (fs.statSync(p, { throwIfNoEntry: false })?.isDirectory() && !u.endsWith("/")) { r.writeHead(301, { location: u + "/" }); return r.end(); }
  const f = file(p) || file(path.join(p, "index.html")) || file(p + ".html");
  if (!f) { r.writeHead(404, { "content-type": "text/html" }); return fs.createReadStream(path.join(ROOT, "404.html")).pipe(r); }
  r.writeHead(200, { "content-type": T[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(r);
});
// every result is a check: any failure is listed and the command exits non-zero; the browser and server always close
const checks = []; const check = (name, ok, detail) => { checks.push({ name, ok: Boolean(ok), detail }); };
// a promise that fails after ms, so a wait that never settles (a worker that never installs) fails the run instead of hanging it
const within = (ms, what, pr) => Promise.race([pr, new Promise((_, no) => setTimeout(() => no(new Error(`${what}: no answer within ${ms / 1000}s`)), ms))]);
s.listen(0, "127.0.0.1", async () => {
  const B = `http://127.0.0.1:${s.address().port}`, errs = [], failed = []; let b;
  try {
    const st = async (u) => (await fetch(B + u, { redirect: "manual" })).status;
    // every existing URL: 200, or the 301 GitHub Pages sends to add a folder's slash
    const URLS = { "/": 200, "/index.html": 200, "/privacy.html": 200, "/privacy": 301, "/privacy/": 200, "/lawgradify/course/": 200, "/lawgradify/course": 301, "/sw.js": 200, "/kit/course/course.js": 200, "/kit/courses/law/course.js": 200 };
    for (const [u, want] of Object.entries(URLS)) { const got = await st(u); check(`URL ${u}`, got === want, `${got} (want ${want})`); }
    b = await chromium.launch(); const c = await b.newContext({ viewport: { width: 1280, height: 900 } });
    await c.route(/^https?:\/\/(?!127\.0\.0\.1)/, (x) => x.abort());
    const p = await c.newPage(); p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => m.type() === "error" && !/ERR_INTERNET_DISCONNECTED/.test(m.text()) && errs.push("console: " + m.text()));
    p.on("response", (r) => { if (r.status() >= 400 && r.url().startsWith(B)) failed.push(r.status() + " " + r.url().slice(B.length)); });
    await p.goto(B + "/"); await p.waitForTimeout(800);
    check("homepage renders", (await p.textContent("h1")) === "Your notes. A full course.");
    check("design tokens load from /kit/", (await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--ds-accent").trim())) !== "");
    check("theme set by theme-boot.js", /^(light|dark)$/.test(await p.evaluate(() => document.documentElement.dataset.theme)));
    // the service worker installs (bounded: a worker that never becomes ready fails the run)
    const sw = await within(15000, "service worker", p.evaluate(() => navigator.serviceWorker.ready.then(() => true))).catch((e) => e.message);
    check("service worker installs", sw === true, sw);
    // client-side navigation to the course (no full reload), then the course engine mounts the law notes from /kit/
    await p.evaluate(() => { window.__noReload = 1; }); await p.click("text=Open the law course"); await p.waitForURL("**/lawgradify/course/"); await p.waitForSelector("#course *", { timeout: 15000 });
    check("client-side navigation to the course", await p.evaluate(() => window.__noReload === 1));
    check("course engine mounts", (await p.evaluate(() => document.querySelectorAll("#course *").length)) > 100);
    // the notes stay out of the bundle: no chunk holds the law course's own text or the course engine
    const chunks = fs.readdirSync(path.join(ROOT, "_next/static/chunks")).map((f) => fs.readFileSync(path.join(ROOT, "_next/static/chunks", f), "utf8")).join("");
    check("course notes and engine not bundled", !/Legal Foundations and the English Legal System|export function mountCourse|gradify\.course\./.test(chunks));
    // open a real lesson (#/lesson/…) through the course's own router: from a unit page if the home view has none
    let link = await p.$('#course a[href^="#/lesson/"]');
    if (!link) { await p.click('#course a[href^="#/learn/"]'); await p.waitForSelector('#course a[href^="#/lesson/"]', { timeout: 10000 }).catch(() => {}); link = await p.$('#course a[href^="#/lesson/"]'); }
    check("a lesson link exists", link);
    if (link) {
      const href = await link.getAttribute("href"), title = (await link.innerText()).trim().split("\n")[0];
      await link.click();
      const opened = await p.waitForFunction((h) => location.hash === h && document.querySelector("#course")?.innerText.length > 400, href, { timeout: 15000 }).then(() => true).catch(() => false);
      check("lesson opens and its notes load", opened, `${href} "${title}"`);
      // the course saves on its own schedule: allow it a few seconds
      const saved = await p.waitForFunction(() => localStorage.getItem("gradify.course.law") !== null, null, { timeout: 5000 }).then(() => true).catch(() => false);
      check("lesson progress saved under the static course's key", saved);
    }
    await p.reload(); await p.waitForTimeout(1500);
    check("service worker controls the page", await p.evaluate(() => !!navigator.serviceWorker.controller));
    // offline: the home page, the course, and a legacy .html page; /privacy/ from the generated cache list
    await p.goto(B + "/privacy.html"); await p.waitForTimeout(500); await p.goto(B + "/lawgradify/course/"); await p.waitForTimeout(1500); await p.goto(B + "/"); await p.waitForTimeout(4000);
    await c.setOffline(true);
    const OFFLINE = { "/": "Your notes. A full course.", "/lawgradify/course/": null, "/privacy.html": "Privacy", "/privacy/": "Privacy" };
    for (const [u, h1] of Object.entries(OFFLINE)) {
      const r = await p.goto(B + u).then(async () => { await p.waitForTimeout(1500); return { h1: await p.textContent("h1").catch(() => null), course: await p.evaluate(() => document.querySelectorAll("#course *").length) }; }).catch((e) => ({ error: e.message.split("\n")[0] }));
      check(`offline ${u}`, !r.error && (h1 ? r.h1 === h1 : r.course > 100), JSON.stringify(r));
    }
    await c.setOffline(false);
    check("no failed requests", failed.length === 0, [...new Set(failed)].join(", "));
    check("no script errors", errs.length === 0, errs.join(" | "));
    await p.screenshot({ path: "out-course.png" });
  } catch (e) {
    check("verification ran to the end", false, e.message.split("\n")[0]);
  } finally {
    await b?.close(); s.close();
    for (const x of checks) console.log(`${x.ok ? "ok  " : "FAIL"} ${x.name}${x.detail !== undefined && !x.ok ? `: ${x.detail}` : ""}`);
    const bad = checks.filter((x) => !x.ok).length;
    console.log(bad ? `${bad} of ${checks.length} checks failed` : `all ${checks.length} checks passed`);
    process.exitCode = bad ? 1 : 0;
  }
});
