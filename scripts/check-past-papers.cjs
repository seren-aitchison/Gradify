// Browser check of Past Papers (kit/papers/) in the real SciGradify Biology course page, in Chromium. Run before
// deploying changes to Past Papers.
//   node scripts/check-past-papers.cjs --serve .                 the repository, served locally for the run
//   node scripts/check-past-papers.cjs --url https://getgradify.com
//   --shots <dir>   save screenshots
// Checks:
//   pages     the Past papers tab, the topic page grouped by specification point, a question page
//   marking   one try per part; marks, mark scheme, model answer, examiner notes, mistakes, lesson links; a calculation,
//             a match with partial marks, a self-assessed written answer, the question total
//   evidence  an attempt record per part (pp:<question><part>) on its lesson; self-assessed parts provisional; nothing
//             recorded after "Show model answers"
//   phone, offline, keyboard, no script errors
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { chromium, devices } = require("playwright");

const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, all) => (x.startsWith("--") ? [...a, [x.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]] : a), []));
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2" };
function serve(dir) {
  const server = http.createServer((req, res) => {
    const u = decodeURIComponent(new URL(req.url, "http://x").pathname); let p = path.join(dir, u);
    let s = fs.statSync(p, { throwIfNoEntry: false });
    if (s?.isDirectory()) { if (!u.endsWith("/")) { res.writeHead(301, { location: `${u}/` }); return res.end(); } p = path.join(p, "index.html"); s = fs.statSync(p, { throwIfNoEntry: false }); }
    if (!s?.isFile()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": TYPES[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(res);
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok(server)));
}

const results = [];
const check = (name, ok, detail = "") => { results.push({ name, ok: !!ok, detail }); console.log(`${ok ? "pass" : "FAIL"}  ${name}${detail ? `: ${detail}` : ""}`); };

(async () => {
  let server, base = args.url;
  if (args.serve) { server = await serve(path.resolve(args.serve)); base = `http://127.0.0.1:${server.address().port}`; }
  if (!base) { console.error("Give --serve <dir> or --url <site>"); process.exit(2); }
  const PAGE = `${base}/scigradify/biology/`, shots = args.shots && path.resolve(args.shots);
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const browser = await chromium.launch();
  const errorsOf = (pg) => { const e = []; pg.on("pageerror", (x) => e.push(x.message)); pg.on("console", (m) => m.type() === "error" && !/Failed to load resource|supabase|net::ERR/i.test(m.text()) && e.push(m.text())); return e; };
  const go = async (pg, hash, sel) => { await pg.goto(`${PAGE}${hash}`, { waitUntil: "load" }); await pg.waitForSelector(sel, { timeout: 20000 }); };
  const attempts = (pg) => pg.evaluate(() => { try { return (JSON.parse(localStorage.getItem("gradify.course.biology") || "{}").attempts || []).filter((a) => String(a.question?.id).startsWith("pp:")); } catch { return []; } });
  const part = (pg, p) => pg.locator(`.pp-part[data-part="${p}"]`);

  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 2 }), pg = await ctx.newPage(), errs = errorsOf(pg);
    await go(pg, "#/papers", ".co-pcard");
    check("the Past papers tab is in the course", await pg.locator('.co-tabs a[data-v="papers"]').count() === 1);
    check("the landing page lists the Cell biology topic", /4\.1 Cell biology/.test(await pg.locator(".co-pcard").first().innerText()));
    await pg.click(".co-pcard");
    await pg.waitForSelector(".pp-group");
    const groups = await pg.$$eval(".pp-group h3", (h) => h.map((x) => x.textContent));
    check("the topic is grouped by specification group", groups.length === 3 && /4\.1\.1 Cell structure/.test(groups[0]), groups.join(" | "));
    check("all 12 questions are listed", (await pg.$$(".pp-list li")).length === 12);
    check("the Biology-only point is badged", /4\.1\.1\.6[\s\S]*Biology only/.test(await pg.locator(".pp-list li", { hasText: "4.1.1.6" }).innerText()));
    check("the honesty note links to the exam board's papers", await pg.locator('.sx-banner a[href*="aqa.org.uk"]').count() === 1);
    if (shots) await pg.screenshot({ path: path.join(shots, "topic.png"), fullPage: true });

    // cb-05: a calculation (auto-marked) and a written answer (self-assessed)
    await go(pg, "#/papers/cell-biology/cb-05", ".pp-part");
    await part(pg, "a").locator(".aq-num input").fill("20");
    await part(pg, "a").locator(".aq-submit").click();
    await pg.waitForTimeout(150);
    let out = await part(pg, "a").innerText();
    check("a correct calculation earns 2 of 2 marks", /2 of 2 marks/.test(out), out.match(/\d of \d marks?/)?.[0]);
    check("the mark scheme, model answer, examiner notes and mistakes are shown", /Mark scheme/.test(out) && /Model answer/.test(out) && /Why the marks are given/.test(out) && /Common mistakes/.test(out));
    check("one try: the answer can't be changed", await part(pg, "a").locator(".aq-num input").isDisabled());
    const rev = await part(pg, "a").locator(".pp-revise a").evaluateAll((as) => as.map((a) => [a.getAttribute("href"), a.textContent]));
    check("Revise this concept links to named lessons", rev.length === 2 && rev.every(([h, t]) => /^#\/lesson\/u\d\d-\d\d$/.test(h) && t && !/^u\d/.test(t)), JSON.stringify(rev));
    // the written part, entirely by keyboard
    await part(pg, "b").locator("textarea").fill("The electron microscope has a higher resolution.");
    await part(pg, "b").locator(".aq-submit").focus(); await pg.keyboard.press("Enter");
    await part(pg, "b").locator("[data-pt]").first().focus(); await pg.keyboard.press("Space");
    await part(pg, "b").locator(".aq-self").focus(); await pg.keyboard.press("Enter");
    await pg.waitForTimeout(150);
    out = await part(pg, "b").innerText();
    check("a written answer is self-assessed against the mark scheme, by keyboard, with the points listed once", /You gave yourself 1 of 2 marks/.test(out) && /provisional/.test(out) && (out.match(/too small to be resolved/g) || []).length === 1 && !/Self-assessed: 50%/.test(out), out.match(/You gave yourself[^.]*\./)?.[0]);
    const total = await pg.locator(".pp-total").innerText();
    check("the question total adds the parts", /3 of 4 marks \(some self-assessed\)/.test(total), total);
    if (shots) await pg.screenshot({ path: path.join(shots, "question.png"), fullPage: true });
    let A = await attempts(pg);
    const a5 = A.find((a) => a.question.id === "pp:cb-05a"), b5 = A.find((a) => a.question.id === "pp:cb-05b");
    check("evidence: the calculation is recorded, final, on its lesson", a5 && a5.score === 1 && a5.lesson === "u01-14" && a5.marking?.status !== "provisional", JSON.stringify(a5 && [a5.score, a5.lesson, a5.marking]));
    check("evidence: the written part is recorded as provisional self-assessment", b5 && b5.score === 0.5 && b5.marking?.status === "provisional" && b5.marking?.method === "self", JSON.stringify(b5 && [b5.score, b5.marking]));

    // cb-02: a match with partial marks
    await go(pg, "#/papers/cell-biology/cb-02", ".pp-part");
    const sels = part(pg, "a").locator(".aq-match select");
    const want = { Mitochondrion: "Where proteins are made", Ribosome: "Where aerobic respiration happens", Chloroplast: "Absorbs light for photosynthesis", "Cell wall": "Strengthens and supports the cell" };
    for (let i = 0; i < await sels.count(); i++) { const s = sels.nth(i); await s.selectOption(want[await s.getAttribute("data-left")]); }
    await part(pg, "a").locator(".aq-submit").click(); await pg.waitForTimeout(150);
    check("a match with two right earns 1 of 2 marks", /1 of 2 marks/.test(await part(pg, "a").innerText()));

    // cb-07: Show model answers first, then nothing is recorded
    const before = (await attempts(pg)).length;
    await go(pg, "#/papers/cell-biology/cb-07", ".pp-part");
    await pg.click("[data-reveal]"); await pg.waitForTimeout(100);
    check("Show model answers reveals every part's mark scheme", await pg.locator(".pp-ms:not([hidden])").count() === 2);
    await part(pg, "a").locator(".aq-opts button", { hasText: /^46$/ }).click(); await pg.waitForTimeout(150);
    check("an answer after seeing the model answers is marked but not recorded", /Not recorded/.test(await part(pg, "a").innerText()) && (await attempts(pg)).length === before);

    // the topic page shows progress
    await go(pg, "#/papers/cell-biology", ".pp-group");
    check("the topic page shows marks for answered questions", /3 \/ 4/.test(await pg.locator(".pp-list li", { hasText: "4.1.1.5" }).innerText()));
    // Revise this concept opens the lesson
    await go(pg, "#/papers/cell-biology/cb-01", ".pp-part");
    await part(pg, "a").locator(".aq-opts button", { hasText: "Plasmid" }).click(); await pg.waitForTimeout(150);
    await part(pg, "a").locator(".pp-revise a").first().click();
    await pg.waitForFunction(() => location.hash.startsWith("#/lesson/u02-02"), null, { timeout: 10000 }).catch(() => {});
    await pg.waitForTimeout(1500);
    check("Revise this concept opens the lesson", (await pg.evaluate(() => location.hash)) === "#/lesson/u02-02" && await pg.locator("main h1, main h2").count() > 0);
    check("desktop: no script errors", !errs.length, errs.slice(0, 3).join(" | "));
    await ctx.close();
  }

  {
    const ctx = await browser.newContext({ ...devices["iPhone 13"] }), pg = await ctx.newPage(), errs = errorsOf(pg);
    await go(pg, "#/papers/cell-biology/cb-09", ".pp-part");
    await pg.click("[data-reveal]"); await pg.waitForTimeout(150);
    const wide = await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check("phone: a question with its mark schemes open doesn't scroll sideways", wide <= 1, `${wide}px`);
    if (shots) await pg.screenshot({ path: path.join(shots, "phone.png"), fullPage: true });
    await go(pg, "#/papers/cell-biology", ".pp-group");
    const wide2 = await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check("phone: the topic page doesn't scroll sideways", wide2 <= 1, `${wide2}px`);
    check("phone: no script errors", !errs.length, errs.slice(0, 3).join(" | "));
    await ctx.close();
  }

  {
    const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } }), pg = await ctx.newPage(), errs = errorsOf(pg);
    try {
      await pg.goto(PAGE, { waitUntil: "load" });
      const sw = await pg.evaluate(() => Promise.race([navigator.serviceWorker?.ready.then(() => true), new Promise((r) => setTimeout(() => r(false), 8000))]));
      if (!sw) throw new Error("no service worker became active");
      await pg.reload({ waitUntil: "load" }); await pg.waitForTimeout(1500);
      await pg.evaluate(() => { location.hash = "#/papers/cell-biology/cb-10"; }); await pg.waitForSelector(".pp-part"); await pg.waitForTimeout(1500);
      await ctx.setOffline(true);
      await pg.reload({ waitUntil: "load" }); await pg.waitForSelector(".pp-part", { timeout: 15000 });
      await part(pg, "b").locator(".aq-num input").fill("3"); await part(pg, "b").locator(".aq-submit").click(); await pg.waitForTimeout(150);
      check("offline: a question opens and is marked with the network off", /2 of 2 marks/.test(await part(pg, "b").innerText()));
    } catch (e) { check("offline", false, String(e.message).split("\n")[0]); }
    check("offline: no script errors", !errs.length, errs.slice(0, 3).join(" | "));
    await ctx.close();
  }

  await browser.close(); server?.close();
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length} of ${results.length} checks passed`);
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
