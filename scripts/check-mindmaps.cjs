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
      // the lesson viewer is the spidermap (kit/maps/spider.js on kit/notes/mindmap/view.js)
      for (let i = 0; i < 5; i++) {
        if (i === 0) await pg.locator(".mm-card").first().click(); else await pg.locator(`[data-lesson-map="${i}"]`).click();
        await pg.waitForTimeout(900);
        const n = await pg.locator(".smap-overlay .smap-node").count();
        check(n >= 2, `${name}: map ${i + 1} draws (${n} nodes)`);
        check(pg.url().endsWith(`/map/${i + 1}`), `${name}: map ${i + 1} has its own link`);
        if (shots && label !== "light") await pg.screenshot({ path: `${shots}/${site.split("/")[0]}-${label}-map${i + 1}.png` });
      }
      // map 1 again: links, icons, keyboard, outline, minimap
      await pg.locator('[data-lesson-map="0"]').click(); await pg.waitForTimeout(900);
      const links = Number(await pg.locator(".smap-overlay").getAttribute("data-links"));
      const drawn = await pg.locator(".smap-overlay path.e-lesson").count();
      check(drawn >= links, `${name}: ${links} cross-links drawn (${drawn})`);
      check(await pg.locator(".smap-overlay .sm-topic .sm-ico svg").count() > 0, `${name}: main branches have icons`);
      check(await pg.evaluate(() => [...document.querySelectorAll(".smap-overlay .sm-term")].every((t) => parseFloat(getComputedStyle(t).borderTopWidth) > 0)), `${name}: every idea is in its own bubble`);
      await pg.locator(".smap-overlay .sm-term").first().click(); await pg.waitForTimeout(300);
      check(await pg.locator('.smap-panel[data-kind="term"]').count() === 1, `${name}: selecting a node shows its details`);
      const before = await pg.locator(".smap-panel .smp-head b").first().textContent();
      await pg.keyboard.press("ArrowLeft"); await pg.waitForTimeout(300);
      check((await pg.locator(".smap-panel .smp-head b").first().textContent()) !== before, `${name}: arrow keys move between ideas`);
      if (label !== "phone") check(await pg.locator(".smap-mini").isVisible(), `${name}: minimap`);
      await pg.locator('[data-act="menu"]').click(); await pg.locator('[data-extra="outline"]').click(); await pg.waitForTimeout(200);
      check(await pg.locator(".smap-outline li").count() > 3, `${name}: outline view lists the map`);
      await pg.keyboard.press("Escape"); await pg.waitForTimeout(150);
      if (term) {
        await pg.locator(".smap-search input").fill(term); await pg.waitForTimeout(400);
        check(await pg.locator(".smap-overlay .smap-node.lit").count() > 0, `${name}: search highlights "${term}"`);
        check(await pg.locator(".smap-results li button").count() > 0, `${name}: search lists matches with their paths`);
        if (await pg.locator(".smap-results li button").count()) { await pg.locator(".smap-results li button").first().click(); await pg.waitForTimeout(400); check(await pg.locator('.smap-panel:not([data-kind="intel"])').count() === 1, `${name}: a match opens its node`); }
        await pg.locator(".smap-search input").fill("");
      }
      if (label !== "phone") {
        const exp = async (act, timeout = 10000) => { await pg.locator('[data-act="menu"]').click(); const [d] = await Promise.all([pg.waitForEvent("download", { timeout }), pg.locator(`[data-extra="${act}"]`).click()]); return d; };
        const md = fs.readFileSync(await (await exp("md")).path(), "utf8");
        check(/^---\nmarkmap:|markmap:/.test(md) && /^## /m.test(md) && /^- /m.test(md), `${name}: Markdown export (Markmap headings and bullets)`);
        const opml = fs.readFileSync(await (await exp("opml")).path(), "utf8");
        check(/<opml version="2.0">/.test(opml) && (opml.match(/<outline/g) || []).length > 5, `${name}: OPML export`);
        const svg = await exp("svg");
        const text = fs.readFileSync(await svg.path(), "utf8");
        check(/^<svg[^>]+viewBox/.test(text) && (text.match(/<text/g) || []).length >= 3, `${name}: SVG export is vector, with text`);
        check(links <= 0 || /stroke-dasharray/.test(text), `${name}: SVG includes the cross-links`);
        const png = await exp("png", 30000);
        const buf = fs.readFileSync(await png.path());
        check(buf.readUInt32BE(16) === 3840 && buf.readUInt32BE(20) === 2160, `${name}: PNG export is 3840 × 2160 (${buf.readUInt32BE(16)} × ${buf.readUInt32BE(20)})`);
        if (shots) fs.writeFileSync(`${shots}/${site.split("/")[0]}-${label}-4k.png`, buf);
      }
      check(await pg.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: no sideways scrolling`);
      await pg.locator('.smap-overlay [data-act="close"]').click();
      check(await pg.locator(".smap-overlay").count() === 0, `${name}: closes`);
      check(!errs.length, `${name}: no page errors ${errs.join("; ")}`);
      await ctx.close();
    }
  }
  await b.close();
  console.log(failed ? `\n${failed} check(s) failed.` : "\nEvery check passed.");
  process.exitCode = failed ? 1 : 0;
})();
