#!/usr/bin/env node
// Automated accessibility checks for the Premium Lesson System pilot (docs/LESSON-SCHEMA.md): axe-core (WCAG 2.0, 2.1
// and 2.2 A and AA, plus best practice) on every Learn mode step of the pilot lessons, their Notes pages and each
// onboarding screen, in light and dark, at desktop and phone width; and the keyboard behaviour Learn mode relies on.
// Screen-reader checks stay manual. Fails (exit 1) on any violation.
//   node scripts/a11y/learn.cjs [--out a11y-learn.json]
const http = require("node:http"), fs = require("node:fs"), path = require("node:path");
const { chromium } = require("playwright");
const ROOT = path.resolve(__dirname, "../.."), OUT = process.argv.includes("--out") ? process.argv[process.argv.indexOf("--out") + 1] : null;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json" };
const PAGES = { biology: "scigradify/biology/", maths: "mathgradify/course/", pharmacy: "pharmagradify/course/" };
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": TYPES[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
});

(async () => {
  await new Promise((r) => server.listen(0, r));
  const BASE = `http://localhost:${server.address().port}`, failures = [], results = { pages: [], keyboard: {} };
  const { LEARN_PILOTS, lessonSteps } = await import(path.join(ROOT, "kit/course/blocks.js"));
  const { parseNotes } = await import(path.join(ROOT, "kit/course/notes.js"));
  const axeSource = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
  const browser = await chromium.launch();
  const runAxe = async (page) => { await page.addScriptTag({ content: axeSource }); return page.evaluate(async (tags) => (await window.axe.run(document, { runOnly: tags })).violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map((n) => n.target.join(" ")) })), TAGS); };
  const check = async (page, label) => {
    const v = await runAxe(page); results.pages.push({ label, violations: v });
    if (v.length) failures.push(`${label}: ${v.map((x) => `${x.id} (${x.nodes.join(", ")})`).join("; ")}`);
    console.log(`${v.length ? "✗" : "✓"} ${label}${v.length ? `: ${v.map((x) => x.id).join(", ")}` : ""}`);
  };
  const settle = (page) => page.waitForTimeout(700);

  // every step of each pilot lesson, and its Notes page
  const pilots = [];
  for (const [slug, ids] of Object.entries(LEARN_PILOTS)) {
    const course = (await import(path.join(ROOT, `kit/courses/${slug}/course.js`))).default;
    for (const id of ids) {
      const u = course.units.find((x) => x.id === id.split("-")[0]), l = u.lessons.find((x) => x.id === id);
      const L = parseNotes(await course.notes(u.id)).find((p) => p.title.toLowerCase() === l.title.toLowerCase());
      pilots.push({ slug, id, steps: lessonSteps(L).steps });
    }
  }
  for (const scheme of ["light", "dark"]) for (const [vw, vp] of [["desktop", { width: 1280, height: 860 }], ["phone", { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({ colorScheme: scheme, viewport: vp, reducedMotion: "reduce" }), page = await ctx.newPage();
    for (const p of pilots) {
      for (let n = 0; n < p.steps.length; n++) {
        await page.goto(`${BASE}/${PAGES[p.slug]}#/step/${p.id}/${n}`); await page.waitForSelector(".ls-title"); await settle(page);
        await check(page, `${scheme} ${vw} ${p.slug} ${p.id} step ${n} (${p.steps[n].kind})`);
      }
      await page.goto(`${BASE}/${PAGES[p.slug]}#/lesson/${p.id}`); await page.waitForSelector(".co-complete"); await settle(page);
      await check(page, `${scheme} ${vw} ${p.slug} ${p.id} notes`);
    }
    // onboarding: each screen, choosing the first card to move on
    await page.goto(`${BASE}/app.html#/start`); await page.waitForSelector(".onb-screen"); await settle(page);
    for (let k = 0; k < 4; k++) {
      await check(page, `${scheme} ${vw} onboarding screen ${k + 1}`);
      const card = page.locator(".onb-cards button").first(); if (await card.count()) await card.click();
      const go = page.locator(".onb-go"); if (!(await go.count()) || (await go.isDisabled())) break;
      await go.click(); await settle(page);
      if (!(await page.locator(".onb-screen").count())) break;
    }
    await ctx.close();
  }

  // keyboard: on a concept block with a check, focus starts on the title, Continue waits for an answer, and
  // Tab reaches the question before Continue; a wrong answer gets guidance, and the page stays clean under axe
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 } }), page = await ctx.newPage(), K = results.keyboard;
    const p = pilots.find((x) => x.steps.some((s) => s.kind === "block" && s.block.checks.length)), n = p.steps.findIndex((s) => s.kind === "block" && s.block.checks.length);
    await page.goto(`${BASE}/${PAGES[p.slug]}#/step/${p.id}/${n}`); await page.waitForSelector(".ls-title"); await settle(page);
    K.focus_on_title = await page.evaluate(() => document.activeElement?.classList.contains("ls-title"));
    K.continue_waits = await page.evaluate(() => document.querySelector(".ls-go")?.getAttribute("aria-disabled") === "true");
    const order = [];
    for (let i = 0; i < 60; i++) { await page.keyboard.press("Tab"); const t = await page.evaluate(() => { const a = document.activeElement; return a?.closest(".aq") ? "question" : a?.classList.contains("ls-go") ? "continue" : null; }); if (t && order.at(-1) !== t) order.push(t); if (t === "continue") break; }
    K.question_before_continue = order[0] === "question" && order.includes("continue");
    const opts = page.locator(".ls-check .aq button, .ls-check .aq input");
    if (await opts.count()) {
      await opts.last().click(); const submit = page.locator(".ls-check .aq button", { hasText: /check|submit/i }); if (await submit.count()) await submit.first().click(); await settle(page);
      K.continue_unlocks = await page.evaluate(() => document.querySelector(".ls-go")?.getAttribute("aria-disabled") !== "true");
      await check(page, `light desktop ${p.slug} ${p.id} step ${n} after an answer`);
    }
    for (const [k, v] of Object.entries(K)) if (v === false) failures.push(`keyboard: ${k}`);
    console.log("keyboard", K);
    await ctx.close();
  }
  await browser.close(); server.close();
  if (OUT) fs.writeFileSync(OUT, JSON.stringify(results, null, 2));
  if (failures.length) { console.error(`\n${failures.length} failure(s):\n${failures.join("\n")}`); process.exit(1); }
  console.log(`\nNo accessibility violations on ${results.pages.length} page states.`);
})().catch((e) => { console.error(e); process.exit(1); });
