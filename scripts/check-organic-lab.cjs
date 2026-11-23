// The Organic Chemistry Lab in a real browser (docs/ORGANIC-LAB.md, "Release gate"): the behaviours unit tests can't
// reach, checked through the lab's own controls, plus every mode at desktop, tablet and phone widths.
//   node scripts/check-organic-lab.cjs                    serves this repository on loopback and checks it
//   node scripts/check-organic-lab.cjs --url <site>       checks a running copy (e.g. a preview or the live site)
//   options: --shots <dir> (save a screenshot of every mode at every width)
// Checks: a bond's electrons can form the new bond from either end from the keyboard (nitration step 1); exam style
// can't be drawn or checked from the keyboard before the conditions question; a rejected first attempt can't earn
// full marks; a finished saved mechanism reopens complete and unmarked; Reaction mode never asks or grades a case
// the lab declines, and shows a reaction with no organic product as one; a tutor reply for a replaced conversation is
// dropped; and no page error or sideways scroll in any mode at 1280, 820 and 390 px.
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path"), http = require("http");
const ROOT = fs.realpathSync(path.resolve(__dirname, ".."));
const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => (a.startsWith("--") ? [a.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true] : null)).filter(Boolean));
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".ico": "image/x-icon" };
// serves only files inside ROOT (after resolving symlinks), on loopback only
function serve() {
  const server = http.createServer((req, res) => {
    try {
      const u = decodeURIComponent(new URL(req.url, "http://x").pathname); let p = path.join(ROOT, u);
      let s = fs.statSync(p, { throwIfNoEntry: false });
      if (s?.isDirectory()) { if (!u.endsWith("/")) { res.writeHead(301, { location: `${u}/` }); return res.end(); } p = path.join(p, "index.html"); s = fs.statSync(p, { throwIfNoEntry: false }); }
      if (!s?.isFile()) { res.writeHead(404); return res.end(); }
      const real = fs.realpathSync(p); if (real !== ROOT && !real.startsWith(ROOT + path.sep)) { res.writeHead(403); return res.end(); }
      res.writeHead(200, { "content-type": TYPES[path.extname(real)] || "application/octet-stream" }); fs.createReadStream(real).pipe(res);
    } catch { res.writeHead(400); res.end(); }
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok(server)));
}
let PAGE = "", shots = args.shots && path.resolve(String(args.shots));
const results = []; const ok = (name, pass, detail = "") => { results.push({ name, pass, detail }); console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? `: ${detail}` : ""}`); };

async function open(b, width = 1280, height = 900) {
  const p = await b.newPage({ viewport: { width, height } }), errs = [];
  p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => { if (m.type() === "error" && !/favicon|Failed to load resource/.test(m.text())) errs.push(m.text()); });
  await p.goto(PAGE, { waitUntil: "load" }); await p.waitForSelector(".osk-modes", { timeout: 15000 }); await p.waitForTimeout(800);
  return { p, errs };
}
const mode = (p, m) => p.click(`.osk-modes [data-mode="${m}"]`);
const pick = (p, sel, value) => p.evaluate(([s, v]) => { const e = document.querySelector(s); e.value = v; e.dispatchEvent(new Event("change", { bubbles: true })); return e.value === v; }, [sel, value]);
const clickText = (p, text, scope = "") => p.evaluate(([t, sc]) => { const b = [...document.querySelectorAll(`${sc} button`)].find((x) => x.textContent.trim() === t && x.offsetParent !== null); if (!b) return false; b.click(); return true; }, [text, scope]);
const feedback = (p) => p.evaluate(() => document.querySelector('[data-pane="mechanism"]').innerText);
const addArrow = async (p, from, to, end = "") => { await pick(p, ".mx-from", from); await pick(p, ".mx-to", to); if (end) await pick(p, ".mx-end", end); await clickText(p, "Add arrow", '[data-pane="mechanism"]'); };
async function examToggle(p, on) {
  await p.evaluate((want) => { const lab = [...document.querySelectorAll('[data-pane="mechanism"] label')].find((l) => /Exam style/.test(l.textContent)); const i = lab.querySelector("input"); if (i.checked !== want) i.click(); }, on);
  await p.waitForTimeout(200);
}

(async () => {
  let server = null, base = typeof args.url === "string" ? args.url.replace(/\/$/, "") : "";
  if (!base) { server = await serve(); base = `http://127.0.0.1:${server.address().port}`; }
  PAGE = `${base}/scigradify/chemistry/#/practice/organic-notes`;
  const b = await chromium.launch();
  // ---------- #4: keyboard users choose which end of a bond the new bond forms from ----------
  {
    const { p, errs } = await open(b); await mode(p, "mechanism"); await pick(p, ".mx-src", "nitration"); await p.waitForTimeout(200);
    await p.evaluate(() => { document.querySelector(".mx-kbd").open = true; });
    await pick(p, ".mx-from", "bond:16"); await pick(p, ".mx-to", "atom:8");
    const shown = await p.evaluate(() => !document.querySelector(".mx-endsel").hidden && [...document.querySelector(".mx-end").options].map((o) => o.textContent).join("|"));
    ok("#4 the endpoint choice appears for a bond → atom arrow", !!shown, shown || "hidden");
    await addArrow(p, "bond:16", "atom:8", "1"); await addArrow(p, "bond:23", "atom:9");
    await clickText(p, "Check step", '[data-pane="mechanism"]');
    // a correct step animates first, then the lab moves on: wait for step 2 and read the marks
    await p.waitForFunction(() => /Step 2 of 2/.test(document.querySelector('[data-pane="mechanism"] .lab-info')?.innerText || ""), null, { timeout: 8000 }).catch(() => {});
    const head = await p.evaluate(() => document.querySelector('[data-pane="mechanism"] .lab-info')?.innerText.split("\n")[0] || "");
    ok("#4 nitration step 1 entered from the keyboard is accepted with full first-attempt credit", /Step 2 of 2 · marks 2\/4/.test(head), head);
    ok("#4 no page errors", !errs.length, errs.join(" | "));
    await p.close();
  }
  // ---------- #20: in exam style, nothing can be drawn or checked from the keyboard before the conditions answer ----------
  {
    const { p, errs } = await open(b); await mode(p, "mechanism"); await examToggle(p, true); await pick(p, ".mx-src", "sn2"); await p.waitForTimeout(300);
    const before = await p.evaluate(() => ({ from: document.querySelector(".mx-from").options.length, q: /which reagents and conditions/.test(document.querySelector('[data-pane="mechanism"]').innerText) }));
    ok("#20 the conditions question is showing and the keyboard lists are empty", before.q && before.from === 0, JSON.stringify(before));
    await clickText(p, "Add arrow", '[data-pane="mechanism"]'); await clickText(p, "Check step", '[data-pane="mechanism"]'); await p.keyboard.press("Enter"); await p.waitForTimeout(300);
    const still = await p.evaluate(() => ({ q: /which reagents and conditions/.test(document.querySelector('[data-pane="mechanism"]').innerText), last: /Last question/.test(document.querySelector('[data-pane="mechanism"]').innerText) }));
    ok("#20 Add arrow / Check step / Enter don't skip the conditions question", still.q && !still.last, JSON.stringify(still));
    await p.click("[data-xc]"); await p.waitForTimeout(300);
    const after = await p.evaluate(() => document.querySelector(".mx-from").options.length);
    ok("#20 after answering, the keyboard lists are available", after > 0, `${after} options`);
    ok("#20 no page errors", !errs.length, errs.join(" | "));
    await p.close();
  }
  // ---------- #5 and #3: a rejected first attempt can't earn full marks; a finished saved mechanism reopens ----------
  {
    const { p, errs } = await open(b); await mode(p, "mechanism"); await pick(p, ".mx-src", "sn2"); await p.waitForTimeout(200);
    await p.evaluate(() => { document.querySelector(".mx-kbd").open = true; });
    for (let k = 0; k < 2; k++) { await addArrow(p, "lp:1", "atom:2"); await addArrow(p, "bond:6", "atom:3"); }
    await clickText(p, "Check step", '[data-pane="mechanism"]'); await p.waitForTimeout(300);
    const rejected = !/Mechanism complete/.test(await feedback(p));
    ok("#5 each SN2 arrow submitted twice is rejected", rejected);
    await clickText(p, "Clear arrows", '[data-pane="mechanism"]'); await addArrow(p, "lp:1", "atom:2"); await addArrow(p, "bond:6", "atom:3");
    await clickText(p, "Check step", '[data-pane="mechanism"]'); await p.waitForTimeout(500);
    const fb = await feedback(p), score = Number(fb.match(/Mechanism complete: ([\d.]+)\/10/)?.[1]);
    ok("#5 the corrected retry completes but doesn't score 10/10", Number.isFinite(score) && score < 10, `score ${score}`);
    await clickText(p, "Save to notes", '[data-pane="mechanism"]'); await p.waitForTimeout(300);
    await mode(p, "structure"); await p.waitForTimeout(300);
    const opened = await p.evaluate(() => { const o = document.querySelector("[data-open]"); if (!o) return false; o.click(); return true; });
    await p.waitForTimeout(600);
    const re = await feedback(p);
    ok("#3 the finished saved mechanism reopens as complete, unmarked", opened && /Mechanism complete/.test(re) && /Opened from your notes/.test(re), re.slice(0, 140).replace(/\n/g, " "));
    ok("#3/#5 no page errors", !errs.length, errs.join(" | "));
    await p.close();
  }
  // ---------- error carried forward survives saving and reopening an unfinished note ----------
  {
    const { p, errs } = await open(b); await mode(p, "mechanism"); await pick(p, ".mx-src", "hbr-propene"); await p.waitForTimeout(200);
    await p.evaluate(() => { document.querySelector(".mx-kbd").open = true; });
    // step 1 drawn wrongly (H to C2, leaving the cation on C1), then carried forward
    await addArrow(p, "bond:6", "atom:4", "2"); await addArrow(p, "bond:8", "atom:5");
    await clickText(p, "Check step", '[data-pane="mechanism"]'); await p.waitForTimeout(300);
    const carried = await p.evaluate(() => { const b = document.querySelector('[data-pane="mechanism"] [data-ecf]'); if (!b) return false; b.click(); return true; });
    await p.waitForTimeout(2500);
    await clickText(p, "Save to notes", '[data-pane="mechanism"]'); await p.waitForTimeout(200);
    await mode(p, "structure"); await p.waitForTimeout(300);
    await p.evaluate(() => document.querySelector("[data-open]").click()); await p.waitForTimeout(600);
    // the learner's own next step: Br⁻ attacks the cation they made, at C1
    await p.evaluate(() => { document.querySelector(".mx-kbd").open = true; });
    await addArrow(p, "lp:5", "atom:1"); await clickText(p, "Check step", '[data-pane="mechanism"]');
    await p.waitForFunction(() => /Mechanism complete/.test(document.querySelector('[data-pane="mechanism"] .lab-info')?.innerText || ""), null, { timeout: 8000 }).catch(() => {});
    const fb = await feedback(p);
    ok("an unfinished note that carried an error forward reopens still carrying it, and the learner can finish", carried && /Mechanism complete/.test(fb) && /carried forward/i.test(fb), carried ? fb.match(/Mechanism complete[^\n]*/)?.[0] || fb.slice(0, 120).replace(/\n/g, " ") : "no carry-forward button");
    ok("carried-forward note: no page errors", !errs.length, errs.join(" | "));
    await p.close();
  }
  // ---------- #25 (and #14): declined predictions aren't graded; a reaction with no organic product is shown as one ----------
  {
    const { p, errs } = await open(b); await mode(p, "reaction"); await p.waitForTimeout(300);
    await p.evaluate(() => { const lab = [...document.querySelectorAll('[data-pane="reaction"] label')].find((l) => /Predict first/.test(l.textContent)); const i = lab?.querySelector("input"); if (i && !i.checked) i.click(); });
    await pick(p, ".rx-src", "ethene"); await pick(p, ".rx-reag", "br2-uv"); await p.waitForTimeout(400);
    const t = await p.evaluate(() => document.querySelector('[data-pane="reaction"]').innerText);
    ok("#25 predict-first doesn't ask (or grade) a case the lab declines", !/Predict the product/.test(t) && /Outside the lab's rules/.test(t), t.match(/Outside the lab's rules|Predict the product/)?.[0] || "");
    await pick(p, ".rx-reag", "kmno4-hot"); await p.waitForTimeout(300);
    await p.evaluate(() => { const lab = [...document.querySelectorAll('[data-pane="reaction"] label')].find((l) => /Predict first/.test(l.textContent)); const i = lab?.querySelector("input"); if (i && i.checked) i.click(); });
    await p.waitForTimeout(300);
    const e = await p.evaluate(() => document.querySelector('[data-pane="reaction"]').innerText);
    ok("#14 ethene + hot KMnO₄ shows a reaction with no organic product", /No organic product/.test(e) && /CO₂/.test(e) && !/^No reaction$/m.test(e), e.match(/No organic product[^\n]*/)?.[0] || e.slice(0, 100));
    // practice never lands on a declined case: 40 practice questions, each revealed by answering
    let declined = 0, asked = 0;
    for (let k = 0; k < 40; k++) {
      if (!(await clickText(p, "Practice question", '[data-pane="reaction"]'))) break;
      await p.waitForTimeout(80); const g = await p.$('[data-pane="reaction"] [data-g]'); if (!g) continue; await g.click(); asked++; await p.waitForTimeout(80);
      if (/Outside the lab's rules/.test(await p.evaluate(() => document.querySelector('[data-pane="reaction"] .rx-info')?.innerText || ""))) declined++;
    }
    ok("#25 practice questions never ask about a declined case", asked > 0 && declined === 0, `${asked} asked, ${declined} declined`);
    ok("#25 no page errors", !errs.length, errs.join(" | "));
    await p.close();
  }
  // ---------- #27: a reply for a replaced conversation is dropped, and the new question is sent ----------
  {
    const { p, errs } = await open(b);
    const r = await p.evaluate(async () => {
      const { mountTutor } = await import("/kit/labs/chemistry/reactions/tutor-ui.js");
      const host = document.createElement("div"); document.body.append(host);
      let ctx = { kind: "prediction", status: "reacts", id: "A" }, uses = 0; const sent = [], pending = [];
      const ask = (req) => new Promise((res) => { sent.push(`${req.intent}:${req.context.id}`); pending.push(() => res({ reply: `about ${req.context.id}` })); });
      const t = mountTutor(host, { ask, getContext: () => ctx, intents: [["explain", "Explain"], ["compare", "Compare"]], onUse: () => uses++ });
      host.querySelector("details").open = true;
      host.querySelector('[data-i="explain"]').click(); // question about A, still pending
      ctx = { kind: "prediction", status: "reacts", id: "B" }; t.refresh(); // the learner moves to reaction B
      host.querySelector('[data-i="compare"]').click(); // and asks about B straight away
      pending[0](); await new Promise((r) => setTimeout(r, 30)); // A's reply arrives late
      const afterStale = host.querySelector(".ct-log").innerText;
      pending[1]?.(); await new Promise((r) => setTimeout(r, 30));
      return { sent, afterStale, final: host.querySelector(".ct-log").innerText, uses };
    });
    ok("#27 the new question is sent while the old one is pending", r.sent.join(",") === "explain:A,compare:B", r.sent.join(","));
    ok("#27 the late reply about A doesn't appear in B's conversation", !/about A/.test(r.afterStale) && !/about A/.test(r.final), JSON.stringify(r.final));
    ok("#27 B's reply appears, and only it counts as tutor use", /about B/.test(r.final) && r.uses === 1, `uses ${r.uses}`);
    ok("#27 no page errors", !errs.length, errs.join(" | "));
    await p.close();
  }
  // ---------- every mode at desktop, tablet and phone: no page error, no sideways scroll ----------
  if (shots) fs.mkdirSync(shots, { recursive: true });
  for (const [label, w, h] of [["desktop", 1280, 900], ["tablet", 820, 1180], ["phone", 390, 844]]) {
    const { p, errs } = await open(b, w, h), wide = [];
    for (const m of ["structure", "mechanism", "reaction", "3d"]) {
      await mode(p, m); await p.waitForTimeout(m === "3d" ? 1500 : 500);
      const over = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (over > 1) wide.push(`${m} +${over}px`);
      if (shots) await p.screenshot({ path: `${shots}/${label}-${m}.png` });
    }
    ok(`${label} (${w}px): every mode loads without a page error`, !errs.length, errs.join(" | "));
    ok(`${label} (${w}px): no sideways scroll in any mode`, !wide.length, wide.join(", "));
    await p.close();
  }
  await b.close(); server?.close();
  const failed = results.filter((r) => !r.pass);
  console.log(`\n${results.length - failed.length}/${results.length} browser checks passed`);
  process.exitCode = failed.length ? 1 : 0;
})();
