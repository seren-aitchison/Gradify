// Browser check for the analytics consent banner and Google Analytics loading (kit/core/consent.js).
// Google's servers are stubbed: every request to a Google tag host is recorded and answered with a tiny script that
// sets a fake _ga cookie, so the check can see whether anything would have reached Google, and when.
//   node scripts/check-consent.cjs         serves this folder to the browser itself, at http://localhost:8080
//   BASE=http://localhost:8080 node scripts/check-consent.cjs   against a running server (npm run serve) instead
// localhost isn't getgradify.com, so each run sets localStorage "gradify.analytics.dev" = "1", as a tester would.
const { chromium, devices } = require("playwright");
const fs = require("fs"), nodePath = require("path");
const BASE = process.env.BASE || "http://localhost:8080", SERVE = !process.env.BASE;
const ROOT = nodePath.join(__dirname, "..");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json", ".txt": "text/plain" };
// answer requests for BASE from the files on disk, like python3 -m http.server
async function serveFiles(ctx) {
  await ctx.route(BASE + "/**", (route) => {
    let p = decodeURIComponent(new URL(route.request().url()).pathname);
    let f = nodePath.join(ROOT, p);
    if (!f.startsWith(ROOT)) return route.fulfill({ status: 403 });
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = nodePath.join(f, "index.html");
    if (!fs.existsSync(f)) return route.fulfill({ status: 404, body: "not found" });
    route.fulfill({ status: 200, contentType: TYPES[nodePath.extname(f)] || "application/octet-stream", body: fs.readFileSync(f) });
  });
}
const GOOGLE = /googletagmanager\.com|google-analytics\.com|analytics\.google\.com/;
const STUB = "document.cookie='_ga=GA1.1.123.456; path=/'; window.__gtmLoaded=(window.__gtmLoaded||0)+1;";

const results = [];
const check = (name, ok, detail = "") => { results.push({ name, ok }); console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`); };

async function context(browser, { dnt = false, gpc = false, dev = true, mobile = false, storage = null } = {}) {
  const ctx = await browser.newContext(mobile ? { ...devices["iPhone 13"] } : { viewport: { width: 1280, height: 800 } });
  const hits = [];
  if (SERVE) await serveFiles(ctx);
  await ctx.route(GOOGLE, (route) => { hits.push(route.request().url()); route.fulfill({ status: 200, contentType: "application/javascript", body: STUB }); });
  await ctx.addInitScript(({ dnt, gpc, dev, storage }) => {
    if (dnt) Object.defineProperty(navigator, "doNotTrack", { get: () => "1" });
    if (gpc) Object.defineProperty(navigator, "globalPrivacyControl", { get: () => true });
    try { if (dev && !sessionStorage.getItem("seeded")) { localStorage.setItem("gradify.analytics.dev", "1"); if (storage) for (const [k, v] of Object.entries(storage)) localStorage.setItem(k, v); sessionStorage.setItem("seeded", "1"); } } catch (e) { /* */ }
  }, { dnt, gpc, dev, storage });
  return { ctx, hits };
}
const gaCookie = async (ctx) => (await ctx.cookies()).some((c) => /^_ga/.test(c.name));
const settle = (page) => page.waitForTimeout(700);

(async () => {
  const browser = await chromium.launch();
  const pages = ["/", "/pricing.html", "/guides/", "/medgradify/", "/app.html"];

  // 1. fresh visitor: banner, nothing from Google
  for (const path of pages) {
    const { ctx, hits } = await context(browser);
    const page = await ctx.newPage();
    await page.goto(BASE + path); await settle(page);
    const banner = await page.locator(".gc-banner").isVisible().catch(() => false);
    check(`fresh visitor ${path}: banner shown`, banner);
    check(`fresh visitor ${path}: no Google request or cookie`, hits.length === 0 && !(await gaCookie(ctx)), `${hits.length} requests`);
    await ctx.close();
  }

  // 2. the three buttons are equally prominent (same size and style)
  {
    const { ctx } = await context(browser);
    const page = await ctx.newPage(); await page.goto(BASE + "/"); await settle(page);
    const boxes = await page.locator(".gc-banner .btn").evaluateAll((bs) => bs.map((b) => ({ t: b.textContent.trim(), c: b.className, h: Math.round(b.getBoundingClientRect().height) })));
    check("banner: Accept, Reject, Manage with the same style", boxes.length === 3 && new Set(boxes.map((b) => b.c + b.h)).size === 1, boxes.map((b) => b.t).join(" / "));
    await ctx.close();
  }

  // 3. accept: the Google tag loads once, events reach the dataLayer, returning visitor keeps it; withdraw stops it
  {
    const { ctx, hits } = await context(browser);
    const page = await ctx.newPage(); await page.goto(BASE + "/"); await settle(page);
    await page.click(".gc-banner [data-gc=accept]"); await settle(page);
    check("accept: Google tag G-CPR5LJB35L requested", hits.some((u) => /gtag\/js\?id=G-CPR5LJB35L/.test(u)), hits[0] || "none");
    check("accept: banner closes", !(await page.locator(".gc-banner").count()));
    const dl = await page.evaluate(() => JSON.parse(JSON.stringify(window.dataLayer.map((x) => (x && x.length !== undefined && typeof x !== "string" ? Array.from(x) : x)))));
    const consent = dl.find((x) => Array.isArray(x) && x[0] === "consent" && x[1] === "default");
    check("accept: Consent Mode default sets analytics granted, ads denied", consent && consent[2].analytics_storage === "granted" && consent[2].ad_storage === "denied" && consent[2].ad_user_data === "denied" && consent[2].ad_personalization === "denied");
    const set = dl.find((x) => Array.isArray(x) && x[0] === "set" && x[1] && x[1].page_location);
    const config = dl.find((x) => Array.isArray(x) && x[0] === "config");
    check("accept: cleaned page location set", set && set[1].page_location === BASE + "/");
    check("accept: config G-CPR5LJB35L with Google signals and ad personalisation off", config && config[1] === "G-CPR5LJB35L" && config[2].allow_google_signals === false && config[2].allow_ad_personalization_signals === false);
    check("dev traffic marked internal", config && config[2].traffic_type === "internal");
    await page.evaluate(() => window.gradifyConsent.event("lesson_start", { email: "a@b.c", plan: "x@y", ok: 1 }));
    const last = await page.evaluate(() => Array.from(window.dataLayer[window.dataLayer.length - 1]));
    check("events: personal-looking fields dropped", last[0] === "event" && last[1] === "lesson_start" && !("email" in last[2]) && !("plan" in last[2]) && last[2].ok === 1, JSON.stringify(last));

    // returning visitor, another page with a query string and a sign-in hash
    hits.length = 0;
    await page.goto(BASE + "/pricing.html?checkout=success&utm_source=news&email=a%40b.c#access_token=abc"); await settle(page);
    const loc = await page.evaluate(() => Array.from(window.dataLayer).map((x) => Array.from(x)).find((x) => x[0] === "set" && x[1] && x[1].page_location)?.[1].page_location);
    check("returning visitor: Google tag loads with no banner", hits.filter((u) => /gtag\/js/.test(u)).length === 1 && !(await page.locator(".gc-banner").count()));
    check("page location drops query, sign-in hash, keeps utm", loc === `${BASE}/pricing.html?utm_source=news`, loc);
    const tags = await page.locator("script[src*='googletagmanager.com']").count();
    check("exactly one Google tag on the page, no GTM container", tags === 1 && !(await page.locator("script[src*='gtm.js']").count()), String(tags));

    // withdraw from the privacy page
    await page.goto(BASE + "/privacy.html"); await settle(page);
    check("withdraw: _ga cookie present before", await gaCookie(ctx));
    await page.click("#ga-opt"); await page.uncheck("#gc-an");
    hits.length = 0;
    await Promise.all([page.waitForNavigation(), page.click(".gc-dialog [data-gc=save]")]); await settle(page);
    check("withdraw: _ga cookie deleted, nothing loaded after reload", !(await gaCookie(ctx)) && hits.length === 0, `${hits.length} requests`);
    check("withdraw: privacy page says it's off", /off \(you rejected it\)/.test(await page.locator("#ga-state").textContent()));
    await page.goto(BASE + "/"); await settle(page);
    check("withdraw: no banner, nothing loaded on the next page", !(await page.locator(".gc-banner").count()) && hits.length === 0);
    await ctx.close();
  }

  // 4. reject
  {
    const { ctx, hits } = await context(browser);
    const page = await ctx.newPage(); await page.goto(BASE + "/"); await settle(page);
    await page.click(".gc-banner [data-gc=reject]"); await settle(page);
    await page.goto(BASE + "/guides/"); await settle(page);
    check("reject: no Google request or cookie, no banner after", hits.length === 0 && !(await gaCookie(ctx)) && !(await page.locator(".gc-banner").count()));
    await ctx.close();
  }

  // 5. manage preferences: analytics unticked by default, saving unticked = reject
  {
    const { ctx, hits } = await context(browser);
    const page = await ctx.newPage(); await page.goto(BASE + "/"); await settle(page);
    await page.click(".gc-banner [data-gc=manage]");
    check("manage: analytics not preselected", !(await page.isChecked("#gc-an")));
    await page.click(".gc-dialog [data-gc=save]"); await settle(page);
    check("manage: saving without ticking loads nothing", hits.length === 0 && (await page.evaluate(() => window.gradifyConsent.state())) === false);
    await ctx.close();
  }

  // 6. DNT, GPC, counting off, child sites, not-live host
  for (const [name, opts, path] of [
    ["Do Not Track", { dnt: true }, "/"], ["Global Privacy Control", { gpc: true }, "/"],
    ["counting turned off", { storage: { "gradify.noanalytics": "1" } }, "/"],
    ["JuniorGradify", {}, "/juniorgradify/"], ["JuniorGradify course", {}, "/juniorgradify/course/"], ["YouthGradify", {}, "/youthgradify/"],
    ["JuniorGradify after accepting elsewhere", { storage: { "gradify.consent": JSON.stringify({ v: 1, analytics: true, at: "2026-11-23" }) } }, "/juniorgradify/"],
    ["localhost without the dev flag", { dev: false, storage: null }, "/"],
  ]) {
    const { ctx, hits } = await context(browser, opts);
    const page = await ctx.newPage(); await page.goto(BASE + path); await settle(page);
    check(`${name}: no banner, no Google`, !(await page.locator(".gc-banner").count()) && hits.length === 0 && !(await gaCookie(ctx)), `${hits.length} requests`);
    await ctx.close();
  }

  // 7. phone: banner fits the screen, buttons reachable
  {
    const { ctx } = await context(browser, { mobile: true });
    const page = await ctx.newPage(); await page.goto(BASE + "/"); await settle(page);
    const fit = await page.evaluate(() => { const r = document.querySelector(".gc-banner").getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth && r.bottom <= innerHeight && document.documentElement.scrollWidth <= innerWidth; });
    check("phone: banner fits, no sideways scroll", fit);
    if (process.env.SHOTS) await page.screenshot({ path: `${process.env.SHOTS}/consent-phone.png` });
    await ctx.close();
  }
  if (process.env.SHOTS) {
    const { ctx } = await context(browser);
    const page = await ctx.newPage(); await page.goto(BASE + "/"); await settle(page);
    await page.screenshot({ path: `${process.env.SHOTS}/consent-desktop.png` });
    await page.click(".gc-banner [data-gc=manage]"); await page.screenshot({ path: `${process.env.SHOTS}/consent-manage.png` });
    await ctx.close();
  }

  await browser.close();
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
