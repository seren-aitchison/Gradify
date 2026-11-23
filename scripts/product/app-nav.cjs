// The app's navigation (kit/app/main.js SECTIONS): from Today, reach every screen the way a student would, on desktop
// (sidebar), tablet and phone (tab bar + the section's screen row), counting clicks; open deep links directly and
// check the right section and screen are marked; and check nothing waits behind a "More".
// Usage: node scripts/product/app-nav.cjs   (exit code 1 on any failure)
const http = require("http"), fs = require("fs"), path = require("path");
const { chromium } = require("playwright");
const ROOT = path.resolve(__dirname, "../..");
const T = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".webmanifest": "application/manifest+json", ".glb": "model/gltf-binary" };
const file = (p) => fs.statSync(p, { throwIfNoEntry: false })?.isFile() && p;
const server = http.createServer((q, r) => { const p = path.join(ROOT, decodeURIComponent(new URL(q.url, "http://x").pathname)); const f = file(p) || file(path.join(p, "index.html")); if (!f) { r.writeHead(404); return r.end(); } r.writeHead(200, { "content-type": T[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(r); });

// what the app should offer: section → its screens (kept here independently of the code, so a lost screen fails)
const EXPECT = { today: ["today", "plan", "goals"], learn: ["learning", "knowledge", "earth"], study: ["study", "revise", "tools", "ai"], library: ["notes", "library", "new", "community"], progress: ["progress", "intel"] };
// deep links that live inside a section: [hash, section, screen it belongs to]
const DEEP = [["#/tools/audio", "study", "tools"], ["#/tools/convert", "study", "tools"], ["#/community/groups", "library", "community"], ["#/topic/x", "progress", "progress"], ["#/plan", "today", "plan"], ["#/account", null, "account"]];
const SIZES = [["desktop", { viewport: { width: 1280, height: 860 } }], ["tablet", { viewport: { width: 1000, height: 800 } }], ["phone", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]];

(async () => {
  await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
  const B = `http://127.0.0.1:${server.address().port}`, browser = await chromium.launch();
  const rows = []; const check = (name, ok, detail) => rows.push({ name, ok: Boolean(ok), detail });
  const clicks = {};
  for (const [mode, o] of SIZES) {
    const ctx = await browser.newContext({ ...o, serviceWorkers: "block", reducedMotion: "reduce" });
    await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (x) => x.abort());
    const p = await ctx.newPage(), errs = [];
    p.on("pageerror", (e) => errs.push(e.message.split("\n")[0]));
    // a returning student (set-up skipped), on Today
    await p.goto(`${B}/app.html#/start`); await p.waitForTimeout(1000);
    if (await p.locator("#skip").count()) { await p.locator("#skip").click(); await p.waitForTimeout(800); }
    const more = await p.evaluate(() => [...document.querySelectorAll("button, a")].filter((e) => e.offsetParent && /^\s*More\b/.test(e.innerText)).length);
    check(`${mode}: no "More" in the navigation`, more === 0, `${more} More controls`);
    for (const [section, screens] of Object.entries(EXPECT)) for (const screen of screens) {
      await p.goto(`${B}/app.html#/today`); await p.waitForTimeout(900);
      let n = 0;
      if (mode === "desktop") {
        await p.locator(`.lo-side a[data-route="${screen}"]`).click(); n = 1;
      } else {
        await p.locator(`.tabbar a[data-section="${section}"]`).click(); n = 1; await p.waitForTimeout(900);
        if (!new URL(p.url()).hash.startsWith(`#/${screen}`)) { await p.locator(`.sec-screens a[data-route="${screen}"]`).click(); n = 2; }
      }
      await p.waitForTimeout(1400);
      const at = new URL(p.url()).hash;
      const marked = await p.evaluate(([scr, sec, mode]) => {
        const link = document.querySelector(`${mode === "desktop" ? ".lo-side" : ".sec-screens"} a[data-route="${scr}"]`);
        const tab = document.querySelector(`.tabbar a[data-section="${sec}"]`);
        return { link: link?.getAttribute("aria-current"), tab: tab?.getAttribute("aria-current"), text: (document.querySelector("#view")?.innerText || "").trim().length };
      }, [screen, section, mode]);
      const ok = (at === `#/${screen}` || at.startsWith(`#/${screen}/`)) && marked.text > 40 && marked.link === "page" && (mode === "desktop" || marked.tab === "true");
      check(`${mode}: ${section} → ${screen} in ${n} click${n > 1 ? "s" : ""}`, ok, `${at} · marked ${JSON.stringify(marked)}`);
      clicks[`${mode} ${screen}`] = n;
    }
    // Settings: the account button in the top bar, everywhere (and the sidebar's last link on desktop)
    await p.goto(`${B}/app.html#/today`); await p.waitForTimeout(900);
    const acct = p.locator('header a[href="#/account"]').filter({ visible: true }).first();
    if (await acct.count()) { await acct.click(); await p.waitForTimeout(1200); }
    check(`${mode}: Settings in 1 click (top-bar account button)`, new URL(p.url()).hash.startsWith("#/account"), new URL(p.url()).hash);
    for (const [hash, section, screen] of DEEP) {
      await p.goto(`${B}/app.html${hash}`); await p.waitForTimeout(1400);
      const m = await p.evaluate(([sec, scr, mode]) => ({
        tab: sec ? document.querySelector(`.tabbar a[data-section="${sec}"]`)?.getAttribute("aria-current") : "n/a",
        link: document.querySelector(`${mode === "desktop" ? ".lo-side" : ".sec-screens"} a[data-route="${scr}"]`)?.getAttribute("aria-current") ?? "n/a",
        text: (document.querySelector("#view")?.innerText || "").trim().length,
      }), [section, screen, mode]);
      const ok = new URL(p.url()).hash.startsWith(hash) && m.text > 40 && (mode === "desktop" ? m.link === "page" || screen === "account" : (section ? m.tab === "true" : true));
      check(`${mode}: deep link ${hash} opens, ${section || "no section"} marked`, ok, `${new URL(p.url()).hash} · ${JSON.stringify(m)}`);
    }
    check(`${mode}: no page errors`, !errs.length, errs.join(" | "));
    await p.screenshot({ path: path.join(ROOT, "tests/reports/product", `app-nav-${mode}.png`) }).catch(() => {});
    await ctx.close();
  }
  await browser.close(); server.close();
  for (const r of rows) console.log(`${r.ok ? "ok  " : "FAIL"} ${r.name}${r.ok ? "" : "  — " + r.detail}`);
  const bad = rows.filter((r) => !r.ok).length;
  console.log(bad ? `${bad} of ${rows.length} checks failed` : `all ${rows.length} checks passed`);
  process.exitCode = bad ? 1 : 0;
})();
