// Mind maps in a real browser (kit/maps): for real lessons in several subjects, on desktop (dark and light) and a phone,
// open each map, select a node, search, export SVG and the 4K PNG, and check the PNG really is 3840 × 2160.
//   python3 -m http.server 8080 &   then   node scripts/check-mindmaps.cjs [http://localhost:8080] [--shots dir]
const { chromium, devices } = require("playwright");
const fs = require("fs");
const base = process.argv.find((a) => a.startsWith("http")) || "http://localhost:8080";
const shots = process.argv.includes("--shots") ? process.argv[process.argv.indexOf("--shots") + 1] : null;
// [course page, lesson, a word to search for]: law, chemistry, medicine
const LESSONS = [["lawgradify/course", "u01-01", "moral"], ["scigradify/chemistry", "u01-02", "matter"], ["medgradify/course", "u01-02", "membrane"]];
const VIEWS = [["desktop", { viewport: { width: 1440, height: 900 } }, "dark"], ["light", { viewport: { width: 1440, height: 900 } }, "light"], ["phone", devices["iPhone 13"], "dark"]];

(async () => {
  const b = await chromium.launch();
  let failed = 0;
  const check = (ok, what) => { console.log(`${ok ? "ok  " : "FAIL"} ${what}`); if (!ok) failed++; };
  for (const [site, lesson, term] of LESSONS) {
    for (const [label, opts, theme] of VIEWS) {
      const ctx = await b.newContext({ ...opts, acceptDownloads: true });
      await ctx.addInitScript((t) => { try { localStorage.setItem("gradify.theme", t); } catch {} }, theme);
      const pg = await ctx.newPage(), errs = [];
      pg.on("pageerror", (e) => errs.push(e.message));
            const id = lesson;
      await pg.goto(`${base}/${site}/#/lesson/${id}`, { waitUntil: "networkidle" }); await pg.waitForTimeout(800);
      const name = `${site.split("/")[0]} ${id} (${label})`;
      check(await pg.locator(".mm-card").count() === 5, `${name}: five map previews`);
      for (let i = 0; i < 5; i++) {
        if (i === 0) await pg.locator(".mm-card").first().click(); else await pg.locator(`.mm-select [data-map="${i}"]`).click();
        await pg.waitForTimeout(700);
        const n = await pg.locator(".mm-canvas .me-tpc").count();
        check(n >= 2, `${name}: map ${i + 1} draws (${n} nodes)`);
        if (shots && label !== "light") await pg.screenshot({ path: `${shots}/${site.split("/")[0]}-${label}-map${i + 1}.png` });
      }
      await pg.locator(".mm-canvas .me-tpc").nth(2).click(); await pg.waitForTimeout(300);
      check(await pg.locator(".mm-panel").isVisible(), `${name}: selecting a node shows its details`);
      if (term) {
        await pg.locator('[data-act="search"]').click(); await pg.locator(".mm-search input").fill(term); await pg.waitForTimeout(400);
        check(await pg.locator(".mm-hit").count() > 0, `${name}: search highlights "${term}"`);
      }
      if (label !== "phone") {
        const [svg] = await Promise.all([pg.waitForEvent("download"), pg.locator('[data-act="svg"]').click()]);
        const text = fs.readFileSync(await svg.path(), "utf8");
        check(/^<svg[^>]+viewBox/.test(text) && (text.match(/<text/g) || []).length >= 3, `${name}: SVG export is vector, with text`);
        const [png] = await Promise.all([pg.waitForEvent("download", { timeout: 30000 }), pg.locator('[data-act="png"]').click()]);
        const buf = fs.readFileSync(await png.path());
        check(buf.readUInt32BE(16) === 3840 && buf.readUInt32BE(20) === 2160, `${name}: PNG export is 3840 × 2160 (${buf.readUInt32BE(16)} × ${buf.readUInt32BE(20)})`);
        if (shots) fs.writeFileSync(`${shots}/${site.split("/")[0]}-${label}-4k.png`, buf);
      }
      check(await pg.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: no sideways scrolling`);
      await pg.locator('[data-act="close"]').click();
      check(await pg.locator(".mm-viewer").count() === 0, `${name}: closes`);
      check(!errs.length, `${name}: no page errors ${errs.join("; ")}`);
      await ctx.close();
    }
  }
  await b.close();
  console.log(failed ? `\n${failed} check(s) failed.` : "\nEvery check passed.");
  process.exitCode = failed ? 1 : 0;
})();
