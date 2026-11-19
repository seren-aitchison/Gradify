// Lab try numbers through the course engine, in a real browser (kit/course/lab-state.js): a retry in the same sitting
// isn't first-try evidence, and leaving starts a new sitting.
//   node scripts/check-lab-tries.cjs          serves the repository and drives the first chemistry lab
// Checks two sequences:
//   wrong answer → success → leave and come back → success           tries 1, 2, 1
//   wrong answer → a real try (five moves) left unfinished by leaving  tries 1, 2 (the open try is recorded in the
//                                                                       sitting it belongs to, not the next one)
const { chromium } = require("playwright"); const http = require("http"), fs = require("fs"), path = require("path");
const ROOT = process.env.ROOT || require("node:path").resolve(__dirname, "..");
const T = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml" };
const srv = http.createServer((q, r) => { const u = decodeURIComponent(new URL(q.url, "http://x").pathname); let p = path.join(ROOT, u); let s = fs.statSync(p, { throwIfNoEntry: false }); if (s?.isDirectory()) { p = path.join(p, "index.html"); s = fs.statSync(p, { throwIfNoEntry: false }); } if (!s?.isFile()) { r.writeHead(404); return r.end(); } r.writeHead(200, { "content-type": T[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(r); });
(async () => {
  await new Promise((ok) => srv.listen(0, ok)); const base = `http://localhost:${srv.address().port}/scigradify/chemistry/`;
  const b = await chromium.launch(); const ctx = await b.newContext({ serviceWorkers: "block" }); const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  const go = async (h, w = 1300) => { await p.evaluate((h) => { location.hash = h; }, h); await p.waitForTimeout(w); };
  await p.goto(base + "#/practice"); await p.waitForTimeout(1500);
  const id = (await p.evaluate(() => [...document.querySelectorAll("a[href^='#/practice/']")].map((a) => a.getAttribute("href").split("/")[2])))[0];
  await go(`#/practice/${id}`);
  const G = `[...document.querySelectorAll(".co-labstage, .co-ix")].find((e) => e.gradifyIx).gradifyIx`;
  const task = await p.evaluate(`Object.keys(${G}.evidence)[0]`);
  const run = (code) => p.evaluate(`(() => { const g = ${G}; ${code} })()`);
  await run(`g.touch(); g.ctx.fail(${JSON.stringify(task)}, "c");`);
  await run(`g.ctx.complete(${JSON.stringify(task)}, "c");`);
  await go("#/practice"); await go(`#/practice/${id}`);
  await run(`g.touch(); g.ctx.complete(${JSON.stringify(task)}, "c");`);
  // second sequence on a second challenge: fail it, then a real try (five moves) and leave without finishing
  const task2 = await p.evaluate(`Object.keys(${G}.evidence)[1]`);
  await run(`g.touch(); g.ctx.fail(${JSON.stringify(task2)}, "c2");`);
  await run(`g.ctx.focus(${JSON.stringify(task2)}, "c2");`);
  for (let i = 0; i < 6; i++) { await p.evaluate(`[...document.querySelectorAll(".co-labstage, .co-ix")].find((e) => e.gradifyIx).dispatchEvent(new Event("change", { bubbles: true }))`); await p.waitForTimeout(1050); }
  await go("#/practice");
  await go(`#/practice/${id}`);
  const recs2 = await run(`return g.attempts().filter((a) => a.question?.id === "ix:" + g.id + ":" + ${JSON.stringify(task2)}).map((a) => [a.response?.outcome, a.attempt, a.response?.via]);`);
  console.log("challenge", task2, "→", JSON.stringify(recs2));
  const ok2 = JSON.stringify(recs2.map((r) => r.slice(0, 2).join())) === JSON.stringify(["unsuccessful,1", "unsuccessful,2"]);
  console.log(ok2 ? "PASS second failure in the sitting is try 2" : "FAIL second failure in the sitting");
  const recs = await run(`return g.attempts().filter((a) => a.question?.id === "ix:" + g.id + ":" + ${JSON.stringify(task)}).map((a) => [a.response?.outcome, a.attempt]);`);
  console.log("lab", id, "challenge", task, "→", JSON.stringify(recs), "errors:", errs.length ? errs : "none");
  const want = [["unsuccessful", 1], ["success", 2], ["success", 1]];
  const ok = JSON.stringify(recs.map((r) => r.join())) === JSON.stringify(want.map((r) => r.join())) || JSON.stringify(recs.map((r) => r.join()).sort()) === JSON.stringify(want.map((r) => r.join()).sort());
  console.log(ok && !errs.length ? "PASS" : "FAIL"); await b.close(); srv.close(); process.exit(ok && ok2 && !errs.length ? 0 : 1);
})();
