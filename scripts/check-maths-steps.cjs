// Browser check of MathGradify's Step by step section (kit/interactive/stepcheck.js and steprules.js) in the real
// course page, in Chromium. Run before deploying changes to the step checker.
//   node scripts/check-maths-steps.cjs --serve .                 the repository, served locally for the run
//   node scripts/check-maths-steps.cjs --url https://getgradify.com
//   --shots <dir>   save screenshots (desktop, phone, the worked solution)
// Checks:
//   desktop   rule names on valid lines (opened with the keyboard), named mistakes on wrong ones, hints,
//             Show the next step, the worked solution with its rules, the screen-reader announcement
//   evidence  an attempt record per problem, keyed ws:<set>:<problem>, on the right lesson: 1 when solved unaided,
//             less with a hint, 0 when the steps were shown to the end
//   phone     an iPhone-sized screen: no script error, no sideways scrolling, the tools reachable
//   offline   opened once online, the Step by step section works again with the network off
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
  const PAGE = `${base}/mathgradify/course/`, shots = args.shots && path.resolve(args.shots);
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const browser = await chromium.launch();
  const errorsOf = (pg) => { const e = []; pg.on("pageerror", (x) => e.push(x.message)); pg.on("console", (m) => m.type() === "error" && !/Failed to load resource|supabase|net::ERR/i.test(m.text()) && e.push(m.text())); return e; };
  const open = async (pg, set) => { await pg.goto(`${PAGE}#/steps/${set}`, { waitUntil: "load" }); await pg.waitForSelector("#mx-line", { timeout: 20000 }); };
  const line = async (pg, t) => { await pg.fill("#mx-line", t); await pg.press("#mx-line", "Enter"); await pg.waitForTimeout(120); };
  const lines = (pg) => pg.$$eval(".mx-lines > li", (ls) => ls.map((l) => ({ cls: l.className, text: l.innerText.replace(/\s+/g, " ").trim() })));
  const attempts = (pg) => pg.evaluate(() => { try { return (JSON.parse(localStorage.getItem("gradify.course.maths") || "{}").attempts || []).filter((a) => String(a.question?.id).startsWith("ws:")); } catch { return []; } });

  // ---------- desktop ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 2 }), pg = await ctx.newPage(), errs = errorsOf(pg);
    await open(pg, "linear");
    // problem 1, 3(x − 2) = 2x + 5: a named mistake, then valid lines with their rules, solved unaided except the slip
    await line(pg, "3x − 2 = 2x + 5");
    let L = await lines(pg);
    check("a wrong line names its mistake", L[0].cls.includes("no") && /Not every term multiplied/.test(L[0].text), L[0].text);
    await pg.click("[data-undo]");
    await line(pg, "3x − 6 = 2x + 5"); await line(pg, "x − 6 = 5");
    L = await lines(pg);
    check("a valid line names its rule", /Expanded the bracket/.test(L[0].text) && /Subtracted 2x from both sides/.test(L[1].text), L.map((l) => l.text).join(" | "));
    const live = await pg.evaluate(() => [...document.querySelectorAll("[aria-live]")].map((x) => x.textContent).join(" "));
    check("each line is announced to screen readers", /Line 2: Valid step\. Subtracted 2x from both sides/.test(live), live);
    // the rule opens with the keyboard
    await pg.focus(".mx-lines > li:nth-child(1) .mx-rule summary"); await pg.keyboard.press("Enter");
    const open1 = await pg.$eval(".mx-lines > li:nth-child(1) .mx-rule", (d) => d.open && d.querySelector("p").innerText);
    check("a rule's explanation opens from the keyboard", open1 && /Multiply every term inside the bracket/.test(open1));
    if (shots) await pg.screenshot({ path: path.join(shots, "desktop-rules.png") });
    await line(pg, "x = 11");
    const fb = await pg.$eval(".sx-feedback", (x) => x.innerText).catch(() => "");
    check("the problem is solved", /Solved/.test(fb), fb.split("\n")[0]);
    check("the worked solution names a rule for each line", (await pg.$$(".mx-solution .mx-rule")).length === 3);
    let A = await attempts(pg);
    check("evidence: solved with a corrected slip is recorded below 1, on its lesson", A.length === 1 && A[0].question.id === "ws:linear:lin-1" && A[0].score > 0 && A[0].score < 1 && A[0].lesson === "u03-09", JSON.stringify(A.map((a) => [a.question.id, a.score, a.lesson])));
    // problem 2, 5x + 7 = 2x − 8: a hint, then solved
    await pg.click("[data-next]"); await pg.waitForSelector("#mx-line");
    await pg.click("[data-hint]");
    check("a hint shows", (await pg.$$(".mx-hints li")).length === 1);
    await line(pg, "3x + 7 = −8"); await line(pg, "3x = −15"); await line(pg, "x = −5");
    A = await attempts(pg);
    check("evidence: solved with one hint scores 0.85", A.at(-1)?.question.id === "ws:linear:lin-2" && A.at(-1).score === 0.85, String(A.at(-1)?.score));
    // problem 3: Show the next step from a student's own line, then to the end
    await pg.click("[data-next]"); await pg.waitForSelector("#mx-line");
    await line(pg, "8x + 4 − 3x + 6 = 25");
    await pg.click("[data-step]"); await pg.waitForTimeout(150);
    L = await lines(pg);
    check("Show the next step continues from the student's line", L.length === 2 && L[1].cls.includes("shown") && /5x \+ 10 = 25/.test(L[1].text) && /Collected like terms/.test(L[1].text), L.map((l) => l.text).join(" | "));
    check("focus returns to the input after a step is shown", await pg.evaluate(() => document.activeElement?.id === "mx-line"));
    for (let k = 0; k < 4 && await pg.$("[data-step]"); k++) { await pg.click("[data-step]"); await pg.waitForTimeout(120); }
    const fb3 = await pg.$eval(".sx-feedback", (x) => x.innerText).catch(() => "");
    check("showing the final step ends the problem as a worked solution", /Worked solution/.test(fb3), fb3.split("\n")[0]);
    if (shots) await pg.screenshot({ path: path.join(shots, "desktop-shown-steps.png"), fullPage: true });
    A = await attempts(pg);
    check("evidence: steps shown to the end scores 0", A.at(-1)?.question.id === "ws:linear:lin-3" && A.at(-1).score === 0, String(A.at(-1)?.score));
    // the ± fix, in the page
    await open(pg, "quadratics");
    for (let k = 0; k < 4; k++) { await pg.click("[data-reveal]"); await pg.click("[data-next]"); await pg.waitForSelector("#mx-line"); }
    await line(pg, "x − 1 = ±3"); await line(pg, "x = 4 or x = −2");
    L = await lines(pg);
    check("x − 1 = ±3 is accepted as working and the answer follows", /Square-rooted both sides/.test(L[0].text) && /Solved each equation/.test(L[1].text) && L[1].cls.includes("final"), L.map((l) => l.text).join(" | "));
    // the calculus sets mount and name their rules
    await open(pg, "differentiation"); await line(pg, "dy/dx = 12x^3 − 10x^2 + 7x");
    L = await lines(pg);
    check("calculus: a named mistake", /The power wasn't reduced/.test(L[0].text), L[0].text);
    check("desktop: no script errors", !errs.length, errs.slice(0, 3).join(" | "));
    await ctx.close();
  }

  // ---------- phone ----------
  {
    const ctx = await browser.newContext({ ...devices["iPhone 13"] }), pg = await ctx.newPage(), errs = errorsOf(pg);
    await open(pg, "quadratics");
    await line(pg, "(x − 2)(x + 3) = 0"); await line(pg, "(x − 2)(x − 3) = 0"); await line(pg, "x − 2 = 0 or x − 3 = 0");
    await pg.click(".mx-lines > li:nth-child(2) .mx-rule summary");
    const wide = await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const L0 = await lines(pg);
    check("phone: a wrong factorisation is named as one, not as \"only one side changed\"", /The brackets don.t expand back/.test(L0[0].text), L0[0].text);
    check("phone: no sideways scrolling", wide <= 1, `${wide}px`);
    const tools = await pg.$$eval(".mx-tools button", (bs) => bs.map((b) => { const r = b.getBoundingClientRect(); return r.width >= 44 && r.height >= 24 && r.right <= innerWidth; }));
    check("phone: every tool button fits and is a usable size", tools.length === 3 && tools.every(Boolean), JSON.stringify(tools));
    const sum = await pg.$eval(".mx-rule summary", (s) => s.getBoundingClientRect().height);
    check("phone: a rule's name is at least 24px tall to tap", sum >= 24, `${sum}px`);
    if (shots) await pg.screenshot({ path: path.join(shots, "phone.png"), fullPage: true });
    check("phone: no script errors", !errs.length, errs.slice(0, 3).join(" | "));
    await ctx.close();
  }

  // ---------- offline ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } }), pg = await ctx.newPage(), errs = errorsOf(pg);
    try {
      await pg.goto(PAGE, { waitUntil: "load" });
      const sw = await pg.evaluate(() => Promise.race([navigator.serviceWorker?.ready.then(() => true), new Promise((r) => setTimeout(() => r(false), 8000))]));
      if (!sw) throw new Error("no service worker became active");
      await pg.reload({ waitUntil: "load" }); await pg.waitForTimeout(1500);
      await pg.evaluate(() => { location.hash = "#/steps/linear"; }); await pg.waitForSelector("#mx-line"); await pg.waitForTimeout(1500);
      await ctx.setOffline(true);
      await pg.reload({ waitUntil: "load" }); await pg.waitForSelector("#mx-line", { timeout: 15000 });
      await line(pg, "3x − 2 = 2x + 5");
      const L = await lines(pg);
      check("offline: the step checker and its rules work with the network off", /Not every term multiplied/.test(L[0]?.text || ""), L[0]?.text);
      const cached = await pg.evaluate(async () => { for (const k of await caches.keys()) if (await (await caches.open(k)).match(new URL("/kit/interactive/steprules.js", location.origin).href)) return true; return false; });
      check("offline: steprules.js is in the cache", cached);
    } catch (e) { check("offline", false, String(e.message).split("\n")[0]); }
    check("offline: no script errors", !errs.length, errs.slice(0, 3).join(" | "));
    await ctx.close();
  }

  await browser.close(); server?.close();
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length} of ${results.length} checks passed`);
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
