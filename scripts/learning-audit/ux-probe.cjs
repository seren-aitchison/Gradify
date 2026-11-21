// UX probe: open a course home and a lesson (signed out) at desktop and phone sizes, measure what a learner meets
// before the teaching starts, and screenshot. Files are served from disk through request interception.
// Usage: node scripts/learning-audit/ux-probe.cjs [outDir]
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const OUT = path.resolve(process.argv[2] || path.join(ROOT, "docs/learning-audit/screens"));
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webmanifest": "application/manifest+json", ".woff2": "font/woff2" };
const PAGES = [
  ["chemistry-home", "scigradify/chemistry/#/"],
  ["chemistry-lesson", "scigradify/chemistry/#/lesson/u13-10"],
  ["law-lesson", "lawgradify/course/#/lesson/u04-03"],
  ["maths-lesson", "mathgradify/course/#/lesson/u03-37"],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const rows = [];
  for (const [vw, vh, tag] of [[1280, 900, "desktop"], [390, 844, "phone"]]) {
    const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 1 });
    await ctx.route("**/*", (route) => {
      const u = new URL(route.request().url());
      if (u.hostname !== "gradify.test") return route.abort();
      let p = path.join(ROOT, decodeURIComponent(u.pathname));
      if (p.endsWith("/")) p += "index.html";
      if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) return route.fulfill({ status: 404, body: "" });
      return route.fulfill({ status: 200, body: fs.readFileSync(p), contentType: TYPES[path.extname(p)] || "application/octet-stream" });
    });
    for (const [name, url] of PAGES) {
      const page = await ctx.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(`http://gradify.test/${url}`, { waitUntil: "load" });
      await page.waitForTimeout(3000);
      const m = await page.evaluate(() => {
        const vis = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none"; };
        const firstNote = [...document.querySelectorAll(".co-prose section p, .co-prose section li")].find(vis);
        const smallTargets = [...document.querySelectorAll("button, a")].filter(vis).filter((b) => { const r = b.getBoundingClientRect(); return r.height < 32 || r.width < 32; }).length;
        return {
          pageHeight: document.documentElement.scrollHeight,
          firstTeachingY: firstNote ? Math.round(firstNote.getBoundingClientRect().top + scrollY) : null,
          glassDiagrams: document.querySelectorAll(".co-lesson .gd, .co-prose .gd, .co-recap .gd").length,
          buttonsVisible: [...document.querySelectorAll("button")].filter(vis).length,
          smallTapTargets: smallTargets,
          fixedLayers: [...document.querySelectorAll("body *")].filter((e) => { const p = getComputedStyle(e).position; return (p === "fixed" || p === "sticky") && vis(e); }).length,
          words: (document.querySelector(".co-prose")?.innerText || "").split(/\s+/).filter(Boolean).length,
          overflowX: document.documentElement.scrollWidth > innerWidth + 1,
        };
      });
      await page.screenshot({ path: path.join(OUT, `ux-${name}-${tag}.png`) });
      rows.push({ page: name, view: tag, ...m, errors: errors.length });
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, "ux-report.json"), JSON.stringify(rows, null, 1));
  console.table(rows);
})();
