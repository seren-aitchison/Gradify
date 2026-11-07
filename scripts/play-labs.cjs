// Plays interactives through their own controls in Chromium, the way a learner would, and checks each challenge is met
// and recorded as a success against its lesson. Playbooks live in tests/play/<course>.cjs: for each interactive, the
// steps that meet every one of its challenges. Unlike scripts/check-interactives.cjs (which drives outcomes through
// the course engine), nothing here calls the engine: only sliders, buttons, menus, keys and typing.
//   node scripts/play-labs.cjs --serve . --course maths [--lab quadratics]
//   node scripts/play-labs.cjs --url https://getgradify.com --course maths
// Steps: { slider: "label", value } · { seg: "button text" } · { click: "button text" } · { select: "label", value }
//        { check: "label" } · { handle: "id", keys: ["ArrowRight", …] } · { type: "label", text } · { wait: ms }
//        { expect: "challenge id" }   (met, shown as met, and recorded as a success against its lesson)
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, all) => (x.startsWith("--") ? [...a, [x.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]] : a), []));
const PAGES = { maths: "mathgradify/course/", physics: "scigradify/physics/", biology: "scigradify/biology/", chemistry: "scigradify/chemistry/", law: "lawgradify/course/", nursing: "nursegradify/course/", pharmacy: "pharmagradify/course/", psychology: "psychgradify/course/", sociology: "socgradify/course/" };
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".webmanifest": "application/manifest+json" };
function serve(dir) {
  const server = http.createServer((req, res) => {
    const u = decodeURIComponent(new URL(req.url, "http://x").pathname); let p = path.join(dir, u), s = fs.statSync(p, { throwIfNoEntry: false });
    if (s?.isDirectory()) { if (!u.endsWith("/")) { res.writeHead(301, { location: `${u}/` }); return res.end(); } p = path.join(p, "index.html"); s = fs.statSync(p, { throwIfNoEntry: false }); }
    if (!s?.isFile()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": TYPES[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(res);
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok(server)));
}

(async () => {
  const course = args.course || "maths", plays = require(path.resolve(__dirname, "..", "tests", "play", `${course}.cjs`));
  let server, base = args.url;
  if (args.serve) { server = await serve(path.resolve(args.serve)); base = `http://127.0.0.1:${server.address().port}`; }
  base = base.replace(/\/$/, "");
  const browser = await chromium.launch(), ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, serviceWorkers: "block" });
  const p = await ctx.newPage(), errs = []; p.on("pageerror", (e) => errs.push(e.message));
  await p.goto(`${base}/${PAGES[course]}`, { waitUntil: "load" }); await p.waitForTimeout(800);
  const problems = []; let played = 0, met = 0;
  const root = ".co-labstage";
  for (const [id, steps] of Object.entries(plays)) {
    if (args.lab && args.lab !== id) continue;
    const fail = (m) => problems.push(`${id}: ${m}`);
    await p.evaluate(() => { location.hash = "#/practice"; }); await p.waitForTimeout(300);
    await p.evaluate((h) => { location.hash = h; }, `#/practice/${id}`); await p.waitForTimeout(1300);
    const info = await p.evaluate((r) => { const el = document.querySelector(r); return el?.gradifyIx ? { declared: el.gradifyIx.declared().map((c) => c.id), evidence: el.gradifyIx.evidence } : null; }, root);
    if (!info) { fail("didn't mount"); continue; }
    played++;
    const e0 = errs.length, expected = [];
    for (const st of steps) {
      try {
        const scope = p.locator(root);
        // centre each control first: scrolled to the top edge, it can sit under the course's sticky tab bar
        // a level-up celebration covers the page until closed: close it, as a learner would
        const cele = p.locator(".co-modal [data-close]"); if (await cele.count()) await cele.first().click();
        const click = async (loc) => { await loc.evaluate((el) => el.scrollIntoView({ block: "center" })); await loc.click(); };
        if (st.slider != null) {
          const inp = scope.locator("label.lab-sl", { hasText: st.slider }).first().locator("input[type=range]");
          await inp.evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event("input", { bubbles: true })); el.dispatchEvent(new Event("change", { bubbles: true })); }, st.value);
        } else if (st.seg) await scope.locator(".lab-seg button", { hasText: st.seg }).first().click();
        else if (st.click) await scope.locator("button", { hasText: st.click }).first().click();
        else if (st.select) await scope.locator("label.lab-sel", { hasText: st.select }).first().locator("select").selectOption(String(st.value));
        else if (st.check) await click(scope.locator("label.lab-tog", { hasText: st.check }).first().locator("input"));
        else if (st.handle) { const h = scope.locator(`[data-handle="${st.handle}"]`); await h.focus(); for (const k of st.keys) await p.keyboard.press(k); }
        else if (st.type) { const f = scope.locator("label", { hasText: st.type }).first().locator("input, textarea"); await f.fill(String(st.text)); }
        else if (st.wait) await p.waitForTimeout(st.wait);
        if (st.expect) {
          expected.push(st.expect);
          const ok = await p.waitForFunction(([r, lab, task, lesson]) => {
            const el = document.querySelector(r); if (!el?.gradifyIx) return false;
            return el.gradifyIx.attempts().some((a) => a.question?.id === `ix:${lab}:${task}` && a.response?.outcome === "success" && a.lesson === lesson);
          }, [root, id, st.expect, info.evidence[st.expect]], { timeout: st.timeout || 6000 }).then(() => true, () => false);
          if (ok) met++; else fail(`challenge "${st.expect}" wasn't met and recorded as a success against ${info.evidence[st.expect]}`);
        }
        await p.waitForTimeout(st.pause ?? 120);
      } catch (e) { fail(`step ${JSON.stringify(st)}: ${String(e.message).split("\n")[0]}`); break; }
    }
    const missing = info.declared.filter((t) => !expected.includes(t));
    if (missing.length) fail(`playbook doesn't play every challenge: ${missing.join(", ")}`);
    if (errs.length > e0) fail(`script error: ${errs.at(-1).slice(0, 140)}`);
    console.log(`${id}: ${expected.length} of ${info.declared.length} challenges played`);
  }
  await browser.close(); server?.close();
  console.log(`\n${played} interactives played, ${met} challenges met through their own controls and recorded as successes.`);
  console.log(problems.length ? `${problems.length} problem(s):\n- ${problems.join("\n- ")}` : "No problems.");
  process.exitCode = problems.length ? 1 : 0;
})();
