// Browser check of Past papers (kit/papers/) in the real SciGradify Biology course page, in Chromium.
//   node scripts/check-papers.cjs --serve .                 the repository, served locally for the run
//   node scripts/check-papers.cjs --url https://getgradify.com
//   --shots <dir>   save screenshots (the bank, a marked question, a practice result; desktop and phone)
// Checks:
//   bank       the Past papers tab, the honesty note with the link to AQA's own papers, every question listed
//   question   choice, short, number and extended parts marked as their mark scheme says; method marks and
//              mark-scheme points ticked by the learner, labelled self-assessed; Revise this concept links to the lesson;
//              "Just show the mark scheme" records nothing; a saved marking is one attempt per part, on its lesson
//   practice   five questions marked together, the result with the lessons to revise, the best score on the bank
//   themes     dark and light at 1280 px, an iPhone-sized screen and 320 px: no script error, no sideways scrolling
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { chromium, devices } = require("playwright");

const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, all) => (x.startsWith("--") ? [...a, [x.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]] : a), []));
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".avif": "image/avif", ".webp": "image/webp" };
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
// the course keeps its attempts in localStorage: count the Past papers ones
const papersAttempts = (p) => p.evaluate(() => {
  const out = [];
  for (let i = 0; i < localStorage.length; i++) { try { const v = JSON.parse(localStorage.getItem(localStorage.key(i))); for (const a of v?.attempts || []) if (a.context === "papers") out.push(a); } catch {} }
  return out.map((a) => ({ key: a.question.id, lesson: a.lesson, score: a.score, status: a.marking.status, method: a.marking.method, q: a.contextId }));
});
const sideways = (p) => p.evaluate(() => document.documentElement.scrollWidth - innerWidth);

(async () => {
  let server, base = args.url;
  if (args.serve) { server = await serve(path.resolve(args.serve)); base = `http://127.0.0.1:${server.address().port}`; }
  if (!base) { console.error("Give --serve <dir> or --url <site>"); process.exit(2); }
  const PAGE = `${base}/scigradify/biology/`, shots = args.shots && path.resolve(args.shots);
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const browser = await chromium.launch();
  const open = async (opts = {}, theme = "dark") => {
    const ctx = await browser.newContext({ ...opts, colorScheme: theme }); const p = await ctx.newPage(), errs = [];
    p.on("pageerror", (e) => errs.push(e.message));
    await p.addInitScript((t) => { try { localStorage.setItem("gradify-theme", t); } catch {} }, theme);
    return { ctx, p, errs };
  };
  const go = async (p, hash) => { await p.goto(`${PAGE}${hash}`, { waitUntil: "networkidle" }); await p.waitForSelector(".pp-intro, .pp-q", { timeout: 15000 }).catch(() => {}); await p.waitForTimeout(250); };

  // ---------- the bank, one question and mini practice: desktop, dark ----------
  {
    const { ctx, p, errs } = await open({ viewport: { width: 1280, height: 900 } });
    await go(p, "#/papers");
    check("bank: the Past papers tab is in the course's tabs", await p.locator('.co-tabs a[data-v="papers"]').count() === 1);
    check("bank: says the questions are Gradify's own and links to AQA's own papers", /Gradify's own questions/.test(await p.locator(".pp-own").innerText()) && /aqa\.org\.uk/.test(await p.locator(".pp-own a").getAttribute("href")));
    const n = await p.locator(".pp-list li").count();
    check("bank: every question is listed", n === 12, `${n} questions`);
    if (shots) await p.screenshot({ path: path.join(shots, "1-bank-desktop.png"), fullPage: true });

    await go(p, "#/papers/q/bio-4.1-02");
    const part = (id) => p.locator(`.pp-part[data-p="${id}"]`);
    await part("a").locator(".pp-opt", { hasText: "Chloroplast" }).click();
    await part("b").locator("input").fill("Aerobic respiration.");
    await part("c").locator(".pp-opt", { hasText: "Nucleus" }).click();
    await part("d").locator("textarea").fill("The membrane controls what goes in and out.");
    await p.locator("[data-mark]").click(); await p.waitForTimeout(200);
    const res = async (id) => (await part(id).locator(".pp-result").innerText()).trim();
    check("question: a right choice earns its mark", /^1\/1 mark: correct/.test(await res("a")), await res("a"));
    check("question: a short answer with a full stop is still right", /^1\/1 mark: correct/.test(await res("b")), await res("b"));
    check("question: a wrong choice earns nothing, and the right option is shown", /^0\/1/.test(await res("c")) && await part("c").locator(".pp-opt.right", { hasText: "Ribosomes" }).count() === 1);
    check("question: an extended answer waits for the learner's ticks, labelled self-assessed", /^0\/2 marks \(self-assessed\)/.test(await res("d")), await res("d"));
    await part("d").locator('[data-tick="membrane"]').check(); await p.waitForTimeout(100);
    check("question: ticking a mark-scheme point adds the mark", /^1\/2 marks \(self-assessed\)/.test(await res("d")) && /3\/5/.test(await p.locator(".pp-total").innerText()), await p.locator(".pp-total").innerText());
    check("question: the mark scheme shows the model answer, mistakes and a Revise this concept link to the lesson", /Model answer/i.test(await part("d").locator(".pp-sch").innerText()) && await part("d").locator('.pp-revise a[href^="#/lesson/u02-"]').count() > 0);
    if (shots) await p.screenshot({ path: path.join(shots, "2-question-marked-desktop.png"), fullPage: true });
    check("question: nothing is recorded before the marks are saved", (await papersAttempts(p)).length === 0);
    await p.locator("[data-save]").click(); await p.waitForTimeout(200);
    const saved = await papersAttempts(p);
    check("question: saving records one attempt per part, each on a lesson that teaches it", saved.length === 4 && saved.every((a) => /^u02-/.test(a.lesson) && a.q === "bio-4.1-02"), JSON.stringify(saved.map((a) => [a.key, a.lesson, a.score])));
    check("question: the self-assessed part is recorded as provisional, the automatic ones as final", saved.find((a) => a.key.endsWith(".d"))?.status === "provisional" && saved.filter((a) => a.status === "final").length === 3);

    // a wrong calculation: method marks only when ticked, never full marks
    await go(p, "#/papers/q/bio-4.1-05");
    await part("a").locator("input").fill("0.02");
    await p.locator("[data-mark]").click(); await p.waitForTimeout(150);
    const before = await res("a");
    await part("a").locator('[data-tick="rearrange"]').check(); await p.waitForTimeout(100);
    check("question: a wrong calculation earns only the method mark ticked", /^0\/2/.test(before) && /^1\/2 marks \(self-assessed\)/.test(await res("a")), `${before} → ${await res("a")}`);

    // just looking at the mark scheme records nothing
    const k = (await papersAttempts(p)).length;
    await go(p, "#/papers/q/bio-4.1-10");
    await p.locator("[data-show]").click(); await p.waitForTimeout(150);
    check("question: Just show the mark scheme shows it and records nothing", await p.locator(".pp-sch").count() === 4 && (await papersAttempts(p)).length === k);
    await p.locator('.pp-revise a').first().click(); await p.waitForTimeout(600);
    check("question: Revise this concept opens the lesson", /#\/lesson\/u02-20/.test(p.url()), p.url());

    // mini practice
    await go(p, "#/papers/practice/4.1/11");
    const qs = await p.locator(".pp-q").count();
    check("practice: five questions", qs === 5, `${qs}`);
    await p.locator("[data-mark]").click(); await p.waitForTimeout(200);
    await p.locator("[data-finish]").click(); await p.waitForTimeout(300);
    const sum = await p.locator(".pp-res").innerText();
    check("practice: the result gives the marks and the lessons to revise", /Your result: 0\/\d+ marks/.test(sum) && await p.locator(".pp-revlist a[href^='#/lesson/']").count() > 0, sum.split("\n")[0]);
    check("practice: every part of every question is recorded", (await papersAttempts(p)).length > k + 5);
    if (shots) await p.screenshot({ path: path.join(shots, "3-practice-result-desktop.png"), fullPage: true });
    await go(p, "#/papers");
    check("bank: shows the best score on a question that was marked", /best 3\/5/.test(await p.locator('.pp-list a[href="#/papers/q/bio-4.1-02"]').innerText()));
    check("desktop: no page errors", !errs.length, errs.join(" | "));
    await ctx.close();
  }

  // ---------- light theme, an iPhone and a 320 px screen: every page loads cleanly and fits ----------
  for (const [label, opts, theme] of [["desktop light", { viewport: { width: 1280, height: 900 } }, "light"], ["iPhone 13", devices["iPhone 13"], "dark"], ["320 px", { viewport: { width: 320, height: 640 } }, "light"]]) {
    const { ctx, p, errs } = await open(opts, theme);
    const wide = [];
    for (const hash of ["#/papers", "#/papers/q/bio-4.1-06", "#/papers/practice/4.1/3"]) {
      await go(p, hash);
      if (hash.includes("/q/")) { await p.locator("[data-mark]").click(); await p.waitForTimeout(150); }
      const w = await sideways(p); if (w > 1) wide.push(`${hash} ${w}px`);
      if (shots && label !== "desktop light" && hash.includes("/q/")) await p.screenshot({ path: path.join(shots, `4-question-${label.replace(/\W+/g, "-")}.png`), fullPage: true });
    }
    check(`${label}: no sideways scrolling on the bank, a marked question or practice`, !wide.length, wide.join(", "));
    check(`${label}: no page errors`, !errs.length, errs.join(" | "));
    await ctx.close();
  }

  await browser.close(); server?.close();
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} Past papers browser checks passed`);
  process.exit(failed ? 1 : 0);
})();
