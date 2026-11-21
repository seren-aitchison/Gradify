// Screenshot the biology diagrams placed in the given lessons at desktop and phone widths (a copy of
// scripts/diagrams/shoot.cjs that takes lesson ids instead of the fixed pilot list).
// Usage: node scripts/diagrams/biology/shoot.cjs u01-03 u01-05 …   (writes $OUT, default <tmp>/bio-shots; not committed)
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../../..");
const OUT = process.env.OUT || path.join(require("os").tmpdir(), "bio-shots");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webmanifest": "application/manifest+json", ".woff2": "font/woff2", ".glb": "model/gltf-binary" };
const PILOT = process.argv.slice(2).map((id) => ["scigradify/biology/", id, `bio-${id}`]);

async function serve(ctx) {
  await ctx.route("**/*", (route) => {
    const u = new URL(route.request().url());
    if (u.hostname !== "gradify.test") return route.abort();
    let p = path.join(ROOT, decodeURIComponent(u.pathname));
    if (p.endsWith("/")) p += "index.html";
    if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) return route.fulfill({ status: 404, body: "" });
    return route.fulfill({ status: 200, body: fs.readFileSync(p), contentType: TYPES[path.extname(p)] || "application/octet-stream" });
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const report = [];
  for (const [vw, vh, tag, scale] of [[1280, 900, "desktop", 1], [390, 844, "phone", 2]]) {
    const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: scale });
    await serve(ctx);
    for (const [site, id, name] of PILOT) {
      const page = await ctx.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(`http://gradify.test/${site}?diagrams=preview#/lesson/${id}`, { waitUntil: "load" });
      await page.waitForTimeout(2500);
      const figs = await page.$$("figure.vx:not([hidden])");
      const info = { lesson: `${site}#/lesson/${id}`, view: tag, diagrams: figs.length, errors: errors.slice(0, 3) };
      for (let i = 0; i < figs.length; i++) {
        await figs[i].scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        const box = await figs[i].boundingBox();
        info[`fig${i + 1}`] = {
          width: Math.round(box.width),
          overflow: await figs[i].evaluate((f) => f.scrollWidth > f.clientWidth + 1),
          layout: await figs[i].evaluate((f) => (getComputedStyle(f.querySelector(".vx-narrow")).display !== "none" ? "narrow" : "wide")),
        };
        await figs[i].screenshot({ path: path.join(OUT, `${name}-${i + 1}-${tag}.png`) });
      }
      if (figs.length) {
        await figs[0].evaluate((f) => f.scrollIntoView({ block: "start" }));
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(OUT, `${name}-page-${tag}.png`) });
      }
      info.pageOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      report.push(info);
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 1));
  for (const r of report) {
    const layouts = [1, 2].map((i) => r[`fig${i}`] && `${r[`fig${i}`].layout}@${r[`fig${i}`].width}px${r[`fig${i}`].overflow ? " OVERFLOW" : ""}`).filter(Boolean).join(", ");
    console.log(r.view.padEnd(8), r.lesson.padEnd(44), "diagrams:", r.diagrams, layouts, r.pageOverflow ? "PAGE OVERFLOW" : "", r.errors.length ? `errors: ${r.errors.join(" | ").slice(0, 160)}` : "");
  }
})();
