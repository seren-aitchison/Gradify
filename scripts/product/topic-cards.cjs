// Clicks every topic card on every subject site's homepage in Chromium and checks where the student lands: the unit's
// lessons, the lesson's notes, the tool, or the course. Desktop for every site; phone too for the launch sites.
// Usage: node scripts/product/topic-cards.cjs   (exit code 1 if any card lands in the wrong place)
const http = require("http"), fs = require("fs"), path = require("path");
const { chromium } = require("playwright");
const ROOT = path.resolve(__dirname, "../..");
const T = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".webmanifest": "application/manifest+json", ".glb": "model/gltf-binary" };
const file = (p) => fs.statSync(p, { throwIfNoEntry: false })?.isFile() && p;
const server = http.createServer((q, r) => { const p = path.join(ROOT, decodeURIComponent(new URL(q.url, "http://x").pathname)); const f = file(p) || file(path.join(p, "index.html")); if (!f) { r.writeHead(404); return r.end(); } r.writeHead(200, { "content-type": T[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(r); });
const PHONE_SITES = ["lawgradify", "nursegradify", "scigradify"];

// what the student should see after the click, by kind of destination
async function landed(p, href) {
  const hash = href.split("#")[1] || "";
  if (/app\.html/.test(href)) return p.evaluate(() => (document.querySelector("#view")?.innerText.trim().length || 0) > 40 && !/What do you want to achieve\?/.test(document.body.innerText) ? true : `app view: "${(document.querySelector("#view")?.innerText || "").slice(0, 60)}"`);
  if (/^\/learn\//.test(hash)) return p.evaluate((u) => { const t = document.querySelector("#course")?.innerText || ""; const links = document.querySelectorAll(`#course a[href^="#/lesson/${u}-"]`).length; return links > 0 ? true : `unit page shows ${links} lessons of ${u}`; }, hash.split("/")[2]);
  if (/^\/lesson\//.test(hash)) return p.evaluate(() => (document.querySelector("#course .co-lesson .co-prose")?.innerText.trim().length || 0) > 200 && !document.querySelector("#course .co-lesson .co-empty") ? true : "lesson notes missing");
  if (hash === "/write") return p.evaluate(() => /written practice|problem question|rubric/i.test(document.querySelector("#course")?.innerText || "") ? true : "no written practice");
  return p.evaluate(() => (document.querySelectorAll("#course *").length > 100 || document.querySelectorAll("main a[href]").length > 5) ? true : "page empty");
}

(async () => {
  const { SITES_CONTENT } = await import(path.join(ROOT, "kit/core/site-content.js"));
  await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
  const B = `http://127.0.0.1:${server.address().port}`, browser = await chromium.launch();
  const rows = [], otherAppLinks = [];
  for (const [site, c] of Object.entries(SITES_CONTENT)) {
    if (process.env.SITE && site !== process.env.SITE) continue;   // SITE=EduGradify to check one site
    const dir = site.toLowerCase().split(" ")[0];
    for (const [mode, o] of [["desktop", { viewport: { width: 1280, height: 860 } }], ["phone", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]]) {
      if (mode === "phone" && !PHONE_SITES.includes(dir)) continue;
      const ctx = await browser.newContext({ ...o, serviceWorkers: "block", reducedMotion: "reduce" });
      await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (x) => x.abort());
      const p = await ctx.newPage(); const errs = [];
      // a returning learner who has skipped the first-run goal question, so it can't hide where a tool card lands
      // (for a first-time visitor that question still interrupts some tool cards: Task 2, reported separately below)
      await p.goto(`${B}/app.html#/progress`); await p.waitForTimeout(1200);
      const skip = p.locator("text=Skip for now"); if (await skip.count()) { await skip.first().click(); await p.waitForTimeout(600); }
      p.on("pageerror", (e) => errs.push(e.message.split("\n")[0]));
      await p.goto(`${B}/${dir}/`); await p.waitForTimeout(900);
      const cards = await p.$$eval(".sm-topic", (els) => els.map((e) => ({ title: e.querySelector("b")?.innerText.trim(), href: e.getAttribute("href"), tag: e.tagName })));
      if (mode === "desktop") otherAppLinks.push(...(await p.$$eval('a[href="app.html"], a[href$="/app.html"]', (a) => a.filter((x) => x.offsetParent && !x.closest("header, nav, footer")).map((x) => x.innerText.trim().replace(/\s+/g, " ").slice(0, 40)))).map((t) => `${dir}: ${t}`));
      for (const card of cards) {
        const row = { site, mode, title: card.title, href: card.href };
        if (!card.href) { row.result = card.tag === "DIV" ? "not linked (no destination yet)" : "✗ link without href"; row.ok = card.tag === "DIV"; rows.push(row); continue; }
        await p.goto(`${B}/${dir}/`); await p.waitForTimeout(700);
        const el = p.locator(`.sm-topic[href="${card.href}"]`).filter({ hasText: card.title }).first();
        await el.scrollIntoViewIfNeeded(); await el.click(); await p.waitForTimeout(2200);
        const expected = new URL(card.href, `${B}/${dir}/`);
        const at = new URL(p.url());
        const sameUrl = at.pathname.replace(/index\.html$/, "") === expected.pathname.replace(/index\.html$/, "") && (at.hash === expected.hash || (!expected.hash && !at.hash) || (expected.hash && at.hash.startsWith(expected.hash)) || (/\/new$/.test(expected.hash) && at.hash.startsWith(expected.hash.replace(/new$/, ""))));   // "…/new" opens a new item at its own id
        const content = sameUrl ? await landed(p, card.href) : `landed at ${at.pathname}${at.hash}`;
        row.ok = sameUrl && content === true; row.result = row.ok ? "✓" : `✗ ${content}`;
        rows.push(row);
      }
      if (errs.length) rows.push({ site, mode, title: "(page errors)", ok: false, result: errs.join(" | ") });
      await ctx.close();
    }
  }
  await browser.close(); server.close();
  const bad = rows.filter((r) => !r.ok), linked = rows.filter((r) => r.href);
  const OUT = path.join(ROOT, "tests/reports/product"); fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "topic-cards.json"), JSON.stringify({ rows, otherAppLinks }, null, 1));
  console.log(`clicked ${linked.length} linked cards (${linked.filter((r) => r.mode === "phone").length} on phone); ${rows.filter((r) => !r.href && r.title !== "(page errors)").length} unlinked; ${bad.length} problems`);
  for (const r of bad) console.log(`  ✗ ${r.site} [${r.mode}] "${r.title}" → ${r.href}: ${r.result}`);
  console.log(`other links to the bare app on site homepages (not topic cards): ${otherAppLinks.length}`); for (const l of [...new Set(otherAppLinks)].slice(0, 12)) console.log("  " + l);
  process.exitCode = bad.length ? 1 : 0;
})();
