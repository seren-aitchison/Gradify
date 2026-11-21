// Lesson page layout check: does teaching come first, and does the progress rail ever sit on the text?
// Usage: node scripts/learning-audit/page-check.cjs
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");
const T = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png" };
const PAGES = [["scigradify/chemistry/", "u13-10"], ["lawgradify/course/", "u04-03"], ["mathgradify/course/", "u03-37"]];

(async () => {
  const b = await chromium.launch();
  let bad = 0;
  for (const w of [390, 768, 900, 1000, 1280]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 860 } });
    await ctx.route("**/*", (r) => {
      const u = new URL(r.request().url());
      if (u.hostname !== "gradify.test") return r.abort();
      let p = path.join(ROOT, decodeURIComponent(u.pathname));
      if (p.endsWith("/")) p += "index.html";
      if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) return r.fulfill({ status: 404, body: "" });
      return r.fulfill({ status: 200, body: fs.readFileSync(p), contentType: T[path.extname(p)] || "application/octet-stream" });
    });
    for (const [site, id] of PAGES) {
      const p = await ctx.newPage();
      const errors = [];
      p.on("pageerror", (e) => errors.push(e.message));
      await p.goto(`http://gradify.test/${site}#/lesson/${id}`);
      await p.waitForTimeout(2500);
      const m = await p.evaluate(() => {
        const top = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().top + scrollY) : null; };
        const rings = document.querySelector(".cx-rings");
        rings?.classList.add("peek");
        const shown = rings && getComputedStyle(rings).display !== "none";
        let overlap = false;
        if (shown) {
          const r = rings.getBoundingClientRect();
          for (const el of document.querySelectorAll(".co-prose p, .co-prose li, .mv-lead, h1")) {
            const t = el.getBoundingClientRect();
            if (t.bottom > r.top && t.top < r.bottom && t.right > r.left && t.left < r.right) { overlap = true; break; }
          }
        }
        return { firstTeaching: top(".co-prose section p, .co-prose section li"), toolkit: top(".cx-kit"), check: top("#co-check"), glass: document.querySelectorAll(".co-prose .gd, .co-recap .gd").length, railShown: !!shown, overlap };
      });
      const ok = m.firstTeaching < m.toolkit && m.toolkit < (m.check ?? Infinity) && !m.glass && !m.overlap && !errors.length;
      if (!ok) bad++;
      console.log(`${ok ? "ok " : "BAD"} ${String(w).padStart(4)}px ${site}${id}  first teaching at ${m.firstTeaching}px, toolkit at ${m.toolkit}px, glass ${m.glass}, rail ${m.railShown ? (m.overlap ? "OVERLAPS TEXT" : "clear of text") : "hidden"}${errors.length ? ` errors: ${errors[0]}` : ""}`);
      await p.close();
    }
    await ctx.close();
  }
  await b.close();
  process.exit(bad ? 1 : 0);
})();
