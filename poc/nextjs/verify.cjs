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
s.listen(0, "127.0.0.1", async () => {
  const B = `http://127.0.0.1:${s.address().port}`, out = {}, errs = [];
  const st = async (u) => (await fetch(B + u, { redirect: "manual" })).status;
  out.urls = {}; for (const u of ["/", "/index.html", "/privacy.html", "/privacy", "/privacy/", "/lawgradify/course/", "/lawgradify/course", "/sw.js", "/kit/course/course.js", "/kit/courses/law/course.js"]) out.urls[u] = await st(u);
  const b = await chromium.launch(), c = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await c.route(/^https?:\/\/(?!127\.0\.0\.1)/, (x) => x.abort());
  const p = await c.newPage(); p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => m.type() === "error" && errs.push("console: " + m.text()));
  const failed = []; p.on("response", (r) => { if (r.status() >= 400 && r.url().startsWith(B)) failed.push(r.status() + " " + r.url().slice(B.length)); });
  await p.goto(B + "/"); await p.waitForTimeout(800);
  out.homeH1 = await p.textContent("h1"); out.dsTokens = await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--ds-accent").trim());
  out.theme = await p.evaluate(() => document.documentElement.dataset.theme);
  out.swControlled = await p.evaluate(async () => { await navigator.serviceWorker.ready; return !!navigator.serviceWorker.controller || "ready (controls after reload)"; });
  // client-side navigation to the course (no full reload), then the course engine mounts the law notes from /kit/
  await p.evaluate(() => { window.__noReload = 1; }); await p.click("text=Open the law course"); await p.waitForURL("**/lawgradify/course/"); await p.waitForSelector("#course *", { timeout: 15000 });
  out.clientNav = await p.evaluate(() => window.__noReload === 1);
  out.courseMounted = await p.evaluate(() => ({ nodes: document.querySelectorAll("#course *").length, text: document.querySelector("#course")?.innerText.slice(0, 120).replace(/\s+/g, " ") }));
  // the notes stay out of the bundle: no chunk holds the law course's own text or the course engine
  const chunks = fs.readdirSync(path.join(ROOT, "_next/static/chunks")).map((f) => fs.readFileSync(path.join(ROOT, "_next/static/chunks", f), "utf8")).join("");
  out.notesBundled = /Legal Foundations and the English Legal System|export function mountCourse|gradify\.course\./.test(chunks);
  out.bundleKB = Math.round(require("child_process").execSync(`du -sk ${ROOT}/_next`).toString().split("\t")[0]);
  // open a lesson by hash route (the course's own router)
  const firstLesson = await p.$('#course a[href^="#/"]'); if (firstLesson) { const h = await firstLesson.getAttribute("href"); await firstLesson.click(); await p.waitForTimeout(800); out.lessonRoute = { href: h, url: p.url().slice(B.length) }; }
  await p.reload(); await p.waitForTimeout(1500); out.swControlledAfterReload = await p.evaluate(() => !!navigator.serviceWorker.controller);
  // offline: the course and home page again, plus a legacy .html page and a page never visited
  await p.goto(B + "/privacy.html"); await p.waitForTimeout(500); await p.goto(B + "/"); await p.waitForTimeout(4000);
  await c.setOffline(true);
  out.offline = {};
  for (const u of ["/", "/lawgradify/course/", "/privacy.html", "/privacy/"]) { try { await p.goto(B + u); await p.waitForTimeout(1500); out.offline[u] = { h1: (await p.textContent("h1").catch(() => null)), course: await p.evaluate(() => document.querySelectorAll("#course *").length) }; } catch (e) { out.offline[u] = "FAIL " + e.message.split("\n")[0]; } }
  await c.setOffline(false);
  // a lesson saves progress under the same localStorage keys as the static course page
  out.storageKeys = await p.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith("gradify.")).sort());
  out.failedRequests = [...new Set(failed)]; out.errors = errs;
  console.log(JSON.stringify(out, null, 1)); await p.screenshot({ path: "out-course.png" }); await b.close(); s.close();
});
