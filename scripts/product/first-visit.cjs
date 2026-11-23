// A first-time student (nothing saved, no goal set) opens every app screen and every topic card that leads into the
// app: each must open directly, never be replaced by the set-up question, and render without errors. Also measures
// the "create a folder" journey for a first-timer and checks that Today still offers set-up.
// Usage: node scripts/product/first-visit.cjs   (exit code 1 on any failure)
const http = require("http"), fs = require("fs"), path = require("path");
const { chromium } = require("playwright");
const ROOT = path.resolve(__dirname, "../..");
const T = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".webmanifest": "application/manifest+json", ".glb": "model/gltf-binary" };
const file = (p) => fs.statSync(p, { throwIfNoEntry: false })?.isFile() && p;
const server = http.createServer((q, r) => { const p = path.join(ROOT, decodeURIComponent(new URL(q.url, "http://x").pathname)); const f = file(p) || file(path.join(p, "index.html")); if (!f) { r.writeHead(404); return r.end(); } r.writeHead(200, { "content-type": T[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(r); });

// every screen in the app's navigation, plus the deep links the topic cards use
const ROUTES = ["today", "plan", "study", "notes", "learning", "new", "library", "revise", "knowledge", "progress", "goals", "intel", "ai", "earth", "tools", "tools/convert", "tools/audio", "tools/cards", "community", "account"];
const SETUP = /What do you want to achieve\?/;

(async () => {
  const { SITES_CONTENT } = await import(path.join(ROOT, "kit/core/site-content.js"));
  await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
  const B = `http://127.0.0.1:${server.address().port}`, browser = await chromium.launch();
  const fresh = async (o = { viewport: { width: 1280, height: 860 } }) => {
    const ctx = await browser.newContext({ ...o, serviceWorkers: "block", reducedMotion: "reduce" });
    await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (x) => x.abort());
    const p = await ctx.newPage(), errs = [];
    p.on("pageerror", (e) => errs.push(e.message.split("\n")[0]));
    return { ctx, p, errs };
  };
  const rows = [];
  const check = (name, ok, detail) => rows.push({ name, ok: Boolean(ok), detail });

  // 1. every app screen, each in its own brand-new browser (a true first visit every time)
  for (const r of ROUTES) for (const [mode, o] of [["desktop", { viewport: { width: 1280, height: 860 } }], ["phone", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]]) {
    if (mode === "phone" && !["today", "notes", "progress", "tools", "plan", "study"].includes(r)) continue;
    const { ctx, p, errs } = await fresh(o);
    await p.goto(`${B}/app.html#/${r}`); await p.waitForTimeout(1800);
    const at = new URL(p.url()).hash, text = await p.evaluate(() => document.querySelector("#view")?.innerText || "");
    const stayed = at === `#/${r}` || at.startsWith(`#/${r}/`);
    check(`#/${r} [${mode}] opens directly`, stayed && !SETUP.test(text) && text.trim().length > 40 && !errs.length, `${at} · ${text.trim().length} chars${SETUP.test(text) ? " · SET-UP QUESTION" : ""}${errs.length ? " · errors: " + errs.join(" | ") : ""}`);
    await ctx.close();
  }

  // 2. the topic cards that lead into the app, clicked by a first-time visitor
  for (const [site, c] of Object.entries(SITES_CONTENT)) for (const [title, , href] of c.topics) {
    if (!href || !/app\.html#\//.test(href)) continue;
    const dir = site.toLowerCase().split(" ")[0];
    const { ctx, p, errs } = await fresh();
    await p.goto(`${B}/${dir}/`); await p.waitForTimeout(900);
    await p.locator(".sm-topic").filter({ has: p.locator("b", { hasText: new RegExp(`^${title}$`) }) }).first().click();
    await p.waitForTimeout(2000);
    const want = new URL(href, `${B}/${dir}/`), at = new URL(p.url()), text = await p.evaluate(() => document.querySelector("#view")?.innerText || "");
    check(`${site} "${title}" → ${href} (first visit)`, at.pathname === want.pathname && (at.hash === want.hash || at.hash.startsWith(want.hash + "/")) && !SETUP.test(text) && !errs.length, `${at.pathname}${at.hash}${SETUP.test(text) ? " · SET-UP QUESTION" : ""}${errs.length ? " · errors: " + errs.join(" | ") : ""}`);
    await ctx.close();
  }

  // 3. create a folder, first visit: Gradify home → Open Gradify → Notes → New folder
  {
    const { ctx, p, errs } = await fresh();
    await p.goto(`${B}/`); await p.waitForTimeout(1200);
    let clicks = 0;
    await p.locator('a:has-text("Open Gradify")').first().click(); clicks++; await p.waitForTimeout(1500);
    await p.locator('a[href="#/notes"]').filter({ visible: true }).first().click(); clicks++; await p.waitForTimeout(1500);
    const btn = p.locator('button[data-act="new-folder"]').filter({ visible: true });
    const visible = await btn.count();
    if (visible) { await btn.first().click(); clicks++; await p.waitForTimeout(800); }
    const made = await p.locator(':text("New folder")').count();
    check(`create a folder, first visit: ${clicks} clicks (was 5)`, visible && made && clicks <= 3 && !errs.length, `${clicks} clicks · at ${new URL(p.url()).hash}`);
    await ctx.close();
  }

  // 4. set-up is still offered, never lost: the Today card, and #/start itself
  {
    const { ctx, p, errs } = await fresh();
    await p.goto(`${B}/app.html#/today`); await p.waitForTimeout(1800);
    const nudge = await p.locator(".setup-nudge").count();
    const link = await p.locator('.setup-nudge a[href="#/start"]').count();
    check("Today offers set-up as a card", nudge && link, `nudge ${nudge}, link ${link}`);
    await p.goto(`${B}/app.html#/start`); await p.waitForTimeout(1500);
    check("set-up (#/start) still opens when asked for", SETUP.test(await p.evaluate(() => document.body.innerText)) && !errs.length, errs.join(" | "));
    await ctx.close();
  }

  await browser.close(); server.close();
  for (const r of rows) console.log(`${r.ok ? "ok  " : "FAIL"} ${r.name}${r.ok ? "" : "  — " + r.detail}`);
  const bad = rows.filter((r) => !r.ok).length;
  console.log(bad ? `${bad} of ${rows.length} checks failed` : `all ${rows.length} checks passed`);
  process.exitCode = bad ? 1 : 0;
})();
