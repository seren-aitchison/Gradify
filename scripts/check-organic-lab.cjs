// The Organic Chemistry Lab (scigradify/chemistry/#/practice/organic-notes) driven in a real browser, as a student
// would use it, at desktop, tablet and phone sizes, in dark and light themes. It serves the repository in-process.
//   node scripts/check-organic-lab.cjs                 every journey at every size
//   node scripts/check-organic-lab.cjs --only phone    one size (desktop, tablet or phone)
//   node scripts/check-organic-lab.cjs --shots <dir>   also save screenshots of each mode there
// Journeys: draw and edit a molecule (click, keyboard, rotate, undo) and see it named; save it and find it again after
// a reload; carry the drawing into Reaction, Mechanism and 3D; read the three prediction outcomes; practise
// predictions; compare conditions; plan a synthesis forwards and backwards; push electrons (keyboard and drag), carry an
// error forward, spot the error, sit an exam-style question; the AI tutor panel (signed out, and with a stand-in for
// Gradify AI); no sideways scrolling, the light theme, and an accessible name on every control.
// Exits 1 if any check fails. Needs Playwright with Chromium (as scripts/check-interactives.cjs does).
const http = require("node:http"), fs = require("node:fs"), path = require("node:path");
const { chromium, devices } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, all) => (x.startsWith("--") ? [...a, [x.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]] : a), []));
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".glb": "model/gltf-binary" };
const SIZES = [["desktop", { viewport: { width: 1366, height: 900 } }, "dark"], ["tablet", { viewport: { width: 820, height: 1100 } }, "dark"], ["phone", { ...devices["iPhone 13"] }, "light"]];
let fails = 0;
const ok = (c, what) => { console.log(`${c ? "ok  " : "FAIL"} ${what}`); if (!c) fails++; };

function serve() {
  const server = http.createServer((req, res) => {
    const u = decodeURIComponent(new URL(req.url, "http://x").pathname); let p = path.join(ROOT, u), s = fs.statSync(p, { throwIfNoEntry: false });
    if (s?.isDirectory()) { p = path.join(p, "index.html"); s = fs.statSync(p, { throwIfNoEntry: false }); }
    if (!s?.isFile() || !p.startsWith(ROOT)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": TYPES[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(res);
  });
  return new Promise((done) => server.listen(0, "127.0.0.1", () => done(server)));
}

(async () => {
  const server = await serve(), url = `http://127.0.0.1:${server.address().port}/scigradify/chemistry/#/practice/organic-notes`;
  const shots = typeof args.shots === "string" ? path.resolve(args.shots) : null; if (shots) fs.mkdirSync(shots, { recursive: true });
  const browser = await chromium.launch();
  for (const [label, opts, theme] of SIZES.filter(([l]) => !args.only || args.only === l)) {
    const ctx = await browser.newContext(opts), pg = await ctx.newPage(), errs = [];
    pg.on("pageerror", (e) => errs.push(e.message)); pg.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    await pg.goto(url, { waitUntil: "networkidle" });
    await pg.evaluate((t) => { localStorage.clear(); localStorage.setItem("gradify.theme", t); }, theme);
    await pg.reload({ waitUntil: "networkidle" }); await pg.waitForTimeout(1200);
    const L = (`${label} (${theme})`), shot = async (n) => { if (shots) await pg.locator(".co-lab").first().screenshot({ path: path.join(shots, `${n}-${label}.png`) }); };
    const text = (sel) => pg.locator(sel).first().innerText();
    const mode = async (m) => { await pg.locator(`.osk-modes [data-mode="${m}"]`).click(); await pg.waitForTimeout(350); };
    const sideways = () => pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok(await pg.locator(".osk-lab").count() === 1, `${L}: the lab opens`);
    ok(await pg.evaluate(() => getComputedStyle(document.querySelector(".osk-lab")).colorScheme) === (theme === "light" ? "light" : "dark"), `${L}: drawn in the ${theme} theme`);

    // ---------- Structure: draw, edit, rotate, undo, see it named ----------
    ok(/Start drawing/.test(await text(".osk-info")), `${L}: empty paper explains how to start`);
    await pg.locator(".osk-stage .osk-svg").click(); await pg.waitForTimeout(250); // scrolls the paper into view first, as a student would
    ok(/ethane/.test(await text(".osk-info .osk-name")), `${L}: one click on the paper draws a bond: ethane`);
    await pg.locator(".osk-stage").focus(); await pg.keyboard.press("ArrowRight"); await pg.keyboard.press("o"); await pg.waitForTimeout(250);
    ok(/methanol/.test(await text(".osk-info .osk-name")), `${L}: select an atom with the keyboard and type O: methanol`);
    await pg.keyboard.press("Control+z"); await pg.waitForTimeout(200);
    ok(/ethane/.test(await text(".osk-info .osk-name")), `${L}: undo restores ethane`);
    await pg.keyboard.press("Control+y"); await pg.waitForTimeout(200);
    const before = await pg.evaluate(() => JSON.parse(localStorage.getItem("gradify.organicLab")).atoms.map((a) => [a.x, a.y]));
    await pg.locator('.osk-tools [data-act="rot-r"]').click(); await pg.waitForTimeout(200);
    const after = await pg.evaluate(() => JSON.parse(localStorage.getItem("gradify.organicLab")).atoms.map((a) => [a.x, a.y]));
    ok(JSON.stringify(before) !== JSON.stringify(after) && /methanol/.test(await text(".osk-info .osk-name")), `${L}: rotate moves the drawing, the molecule is unchanged`);
    await pg.locator('.osk-tools [data-act="flip"]').click(); await pg.waitForTimeout(150);
    ok(/methanol/.test(await text(".osk-info .osk-name")), `${L}: flip keeps the molecule`);
    ok(await pg.locator(".osk-go [data-go]").count() === 3, `${L}: "Use this molecule" offers Reaction, Mechanism and 3D`);
    ok(/of 11 done/.test(await text(".osk-probs .osk-chal-n")) && !(await pg.locator(".osk-probs .osk-chal").evaluate((d) => d.open)), `${L}: challenges are a collapsed panel showing progress`);
    // save it, and find it after a reload (the drawing and the mode come back too)
    await pg.locator(".osk-saved > summary").click();
    await pg.locator(".osk-title").fill("My methanol"); await pg.locator(".osk-bookbtns button", { hasText: "Save to notes" }).click(); await pg.waitForTimeout(200);
    ok(/1 saved/.test(await text(".osk-saved-n")) && /My methanol/.test(await text(".osk-pages")), `${L}: saved work shows the saved drawing`);
    await shot("structure");
    if (label === "phone") ok(await pg.$$eval(".osk-group", (gs) => gs.every((g) => g.offsetHeight < 52)), `${L}: each toolbar group stays on one line`);

    // ---------- carry the drawing into the other modes ----------
    await pg.locator('.osk-go [data-go="reaction"]').click(); await pg.waitForTimeout(400);
    ok(await pg.locator('[data-pane="reaction"]').isVisible() && (await pg.locator(".rx-src").inputValue()) === "mine", `${L}: "Predict a reaction" opens Reaction with the drawing`);
    await pg.selectOption(".rx-reag", "cr-reflux"); await pg.waitForTimeout(300);
    ok(/methanoic acid/.test(await text(".rx-prods")) || /Not predicted|No reaction/.test(await text(".rx-info")), `${L}: the drawing reacts in Reaction mode`);
    await pg.reload({ waitUntil: "networkidle" }); await pg.waitForTimeout(1000);
    ok(await pg.locator('[data-pane="reaction"]').isVisible() && (await pg.locator(".rx-reag").inputValue()) === "cr-reflux", `${L}: after a reload the lab returns to Reaction mode with the same reagent`);
    await mode("structure");
    ok(/methanol/.test(await text(".osk-info .osk-name")) && /1 saved/.test(await text(".osk-saved-n")), `${L}: the drawing and saved work survive a reload`);
    await pg.locator('.osk-go [data-go="mechanism"]').click(); await pg.waitForTimeout(400);
    ok((await pg.locator(".mx-src").inputValue()) === "mine" && /Your own structure/.test(await text(".mx-fb")), `${L}: "Push electrons" opens Mechanism on the drawing`);
    await mode("structure"); await pg.locator('.osk-go [data-go="3d"]').click(); await pg.waitForTimeout(1200);
    ok(/methanol/.test(await text(".m3-info")), `${L}: "See it in 3D" shows the drawing`);

    // ---------- Reaction: the three outcomes, products, continuing a route, the rule, practice ----------
    await mode("reaction");
    await pg.selectOption(".rx-src", "propene"); await pg.selectOption(".rx-reag", "hbr"); await pg.waitForTimeout(300);
    ok(/^reaction$/i.test((await text(".osk-outcome .osk-outcome-tag")).trim()) && /Major product: 2-bromopropane/.test(await text(".osk-outcome")), `${L}: a reaction leads with its outcome and major product`);
    const caps = await pg.locator(".rx-prods figcaption").allInnerTexts();
    ok(caps.some((c) => /major/i.test(c) && /2-bromopropane/.test(c)) && caps.some((c) => /minor/i.test(c) && /1-bromopropane/.test(c)), `${L}: major and minor products are labelled`);
    ok(/Markovnikov/.test(await text(".rx-info")), `${L}: the reasoning explains Markovnikov's rule`);
    await shot("reaction");
    await pg.selectOption(".rx-reag", "nabh4"); await pg.waitForTimeout(200);
    ok(/^no reaction$/i.test((await text(".osk-outcome .osk-outcome-tag")).trim()) && /checked/.test(await text(".osk-outcome")), `${L}: "no reaction" is shown as a checked result`);
    await pg.selectOption(".rx-src", "ethanal"); await pg.selectOption(".rx-reag", "naoh-aq"); await pg.waitForTimeout(200);
    ok(/^not predicted$/i.test((await text(".osk-outcome .osk-outcome-tag")).trim()) && /may happen/.test(await text(".osk-outcome")), `${L}: an unsupported case is never shown as "no reaction"`);
    await pg.selectOption(".rx-src", "ethene"); await pg.selectOption(".rx-reag", "kmno4-hot"); await pg.waitForTimeout(200);
    ok(/^reaction$/i.test((await text(".osk-outcome .osk-outcome-tag")).trim()) && /No organic product/.test(await text(".rx-prods")), `${L}: complete oxidation shows a reaction with no organic product`);
    await pg.selectOption(".rx-src", "2-bromobutane"); await pg.selectOption(".rx-reag", "koh-eth"); await pg.waitForTimeout(300);
    const conts = await pg.locator(".rx-btns button", { hasText: "Continue with" }).allInnerTexts();
    ok(conts.length >= 2 && new Set(conts).size === conts.length, `${L}: each "Continue with" button names its product (${conts.join(", ")})`);
    await pg.selectOption(".rx-src", "propene"); await pg.selectOption(".rx-reag", "hbr"); await pg.waitForTimeout(200);
    await pg.locator(".rx-rule summary").click(); await pg.waitForTimeout(100);
    ok(/Doesn't cover[\s\S]*rearrangements[\s\S]*provisional/.test(await text(".rx-rule")), `${L}: "The rule behind this" shows limitations and confidence`);
    await pg.locator(".rx-practice .rx-opts input").first().check(); await pg.waitForTimeout(200);
    ok(await pg.locator(".rx-choices button").count() >= 2, `${L}: "Predict first" hides the answer and offers choices`);
    await pg.locator(".rx-choices button", { hasText: /^2-bromopropane$/ }).click(); await pg.waitForTimeout(200);
    ok(/Right/.test(await text(".rx-info")), `${L}: a right prediction is confirmed`);
    await pg.locator(".rx-practice .rx-opts input").first().uncheck();
    await pg.selectOption(".rx-src", "ethanol"); await pg.selectOption(".rx-reag", "cr-reflux"); await pg.waitForTimeout(200);
    await pg.locator(".rx-btns button", { hasText: "Continue with ethanoic acid" }).click(); await pg.waitForTimeout(200);
    await pg.selectOption(".rx-reag", "esterify"); await pg.waitForTimeout(200);
    ok(/ethyl ethanoate/.test(await text(".rx-prods")) && /ethanol/.test(await text(".rx-route")), `${L}: a two-step route (ethanol → ethanoic acid → ethyl ethanoate) with its route strip`);
    await pg.locator(".rx-practice button", { hasText: "Practice question" }).click(); await pg.waitForTimeout(400);
    ok(await pg.locator(".rx-choices button").count() >= 2, `${L}: a practice question offers choices`);
    await pg.locator(".rx-choices button").first().click(); await pg.waitForTimeout(300);
    ok(/this session/.test(await text(".rx-score")), `${L}: the practice score is shown`);
    // a run of practice questions: each has choices, none is a case the lab can't predict, and nothing breaks
    let noChoice = 0;
    for (let i = 0; i < 15; i++) { await pg.locator(".rx-practice button", { hasText: /Practice question|Next question/ }).first().click(); await pg.waitForTimeout(120); if (await pg.locator(".rx-choices button").count() < 2 || await pg.locator(".osk-outcome.warn").count()) noChoice++; }
    ok(noChoice === 0 && !errs.length, `${L}: 15 practice questions in a row, each a fair question with choices`);
    ok(await pg.locator(".rx-practice .rx-opts input").first().isChecked(), `${L}: a practice question turns "Predict first" on, and the toggle shows it`);
    await pg.locator(".rx-practice .rx-opts input").first().uncheck(); await pg.waitForTimeout(150);

    // ---------- the AI tutor panel ----------
    await pg.selectOption(".rx-src", "propene"); await pg.selectOption(".rx-reag", "hbr"); await pg.waitForTimeout(200);
    await pg.locator(".rx-tutor .ct-box summary").click(); await pg.waitForTimeout(100);
    const topts = await pg.locator(".rx-tutor [data-i]").allInnerTexts();
    ok(topts.includes("Explain this reaction") && topts.includes("Why this product, not another?"), `${L}: the tutor offers explain and compare`);
    ok(/provisional/.test(await text(".rx-tutor .ct-level")), `${L}: the tutor shows the evidence level`);
    await pg.locator(".rx-tutor [data-i=explain]").click(); await pg.waitForTimeout(400);
    ok(/Sign in|account|switched on/i.test(await text(".rx-tutor .ct-box")), `${L}: signed out, the tutor asks to sign in`);
    if (label === "desktop") {
      const sent = await pg.evaluate(async () => {
        const T = await import("/kit/labs/chemistry/reactions/tutor-ui.js"), P = await import("/kit/labs/chemistry/reactions/predictor.js");
        const host = document.createElement("div"); document.body.append(host); const bodies = [];
        const m = P.drawSmiles("CC(Br)CC"), res = P.predict(m, "koh-eth");
        T.mountTutor(host, { ask: async (b) => { bodies.push(JSON.parse(JSON.stringify(b))); return { reply: "E2 wins <b>here</b>." }; }, getContext: () => ({ kind: "prediction", ...P.explainContext(m, res) }), intents: [["compare", "Why?"]] });
        host.querySelector("details").open = true; host.querySelector("[data-i]").click(); await new Promise((r) => setTimeout(r, 50));
        host.querySelector(".ct-input").value = "Why not SN2?"; host.querySelector("form").requestSubmit(); await new Promise((r) => setTimeout(r, 50));
        const html = host.querySelector(".ct-log").innerHTML; host.remove();
        return { n: bodies.length, mode: bodies[0].mode, outcome: bodies[0].context.outcome, major: bodies[0].context.products.filter((p) => p.role === "major").map((p) => p.name), pathway: bodies[0].context.pathways?.[0]?.mechanism, turns: bodies[1].turns.map((t) => t.role).join(","), conv: bodies[0].conversationId === bodies[1].conversationId, escaped: html.includes("&lt;b&gt;") };
      });
      ok(sent.n === 2 && sent.mode === "chemistry" && sent.outcome === "reaction" && sent.major.includes("but-2-ene") && sent.pathway === "E2", `${L}: the tutor is sent the engine's own verdict`);
      ok(sent.turns === "tutor,learner" && sent.conv && sent.escaped, `${L}: follow-ups share a conversation, and replies are escaped`);
    }

    // ---------- Conditions and Synthesis ----------
    await pg.locator('.rx-views [data-v="conditions"]').click(); await pg.waitForTimeout(300);
    ok(await pg.locator(".cx-set").count() === 2 && /E2\s*major/i.test((await pg.locator(".cx-set").nth(1).innerText()).replace(/\n/g, " ")), `${L}: two condition sets; hot ethanolic hydroxide makes E2 major`);
    await pg.locator(".cx-set").nth(0).locator('select[data-c="0:nuc"]').selectOption("tbuo"); await pg.waitForTimeout(200);
    ok(/but-1-ene/.test(await pg.locator(".cx-set").nth(0).innerText()), `${L}: a bulky base gives the Hofmann alkene`);
    await pg.locator('.rx-views [data-v="synthesis"]').click(); await pg.waitForTimeout(300);
    await pg.selectOption(".sy-task", "chain-acid"); await pg.waitForTimeout(300);
    for (const r of ["kcn", "acid-hydrolysis"]) { await pg.selectOption(".sy-reag", r); await pg.locator(".sy-btns button", { hasText: "Apply" }).click(); await pg.waitForTimeout(300); }
    ok(/Target reached in 2 steps/.test(await text('[data-view="synthesis"]')), `${L}: a forwards synthesis reaches its target`);
    await shot("synthesis");
    await pg.selectOption(".sy-task", "ethene-acid"); await pg.waitForTimeout(300);
    await pg.locator('.sy-dir [data-d="b"]').click(); await pg.waitForTimeout(500);
    for (let i = 0; i < 8 && !/worked back/.test(await text('[data-view="synthesis"]')); i++) { const n = await pg.locator("[data-b]").count(); if (!n) break; await pg.locator("[data-b]").nth(i % n).click(); await pg.waitForTimeout(400); }
    ok(/worked back to the starting material/.test(await text('[data-view="synthesis"]')), `${L}: retrosynthesis works back to the starting material`);
    for (const v of ["predict", "conditions", "synthesis"]) { await pg.locator(`.rx-views [data-v="${v}"]`).click(); await pg.waitForTimeout(250); const w = await sideways(); ok(w <= 1, `${L}: no sideways scrolling in Reaction · ${v} (${w}px)`); }
    await pg.locator('.rx-views [data-v="predict"]').click();

    // ---------- Mechanism: arrows, error carried forward, spot the error, exam ----------
    await mode("mechanism");
    const opt = (sel, re) => pg.locator(`${sel} option`).evaluateAll((os, r) => os.filter((x) => new RegExp(r).test(x.textContent)).map((x) => x.value)[0], re);
    const add = async (f, t) => { await pg.selectOption(".mx-from", await opt(".mx-from", f)); await pg.selectOption(".mx-to", await opt(".mx-to", t)); await pg.locator(".mx-addbtn button").click(); };
    const kbd = async () => { if (!(await pg.locator(".mx-kbd").evaluate((d) => d.open))) await pg.locator(".mx-kbd summary").click(); };
    await pg.selectOption(".mx-src", "hbr-propene"); await pg.waitForTimeout(300);
    ok(await pg.locator(".mx-actions button").first().innerText() === "Check step" && await pg.locator(".mx-help .lab-btn").count() === 4 && await pg.locator(".mx-more .lab-btn").count() >= 2, `${L}: Check step leads; Help and More are separate groups`);
    await kbd(); await add("C1=C2 bond", "^atom H$"); await add("H–Br bond", "^atom Br$");
    await pg.locator(".mx-actions button", { hasText: "Check step" }).click(); await pg.waitForTimeout(2600);
    ok(/Correct/.test(await text(".mx-fb")), `${L}: step 1 drawn with the keyboard lists is accepted`);
    await shot("mechanism");
    if (label === "desktop") {
      await pg.locator(".mx-more button", { hasText: "Restart" }).click(); await pg.waitForTimeout(300);
      const geo = await pg.evaluate(async () => {
        const Lb = await import("/kit/labs/chemistry/reactions/library.js"), E = await import("/kit/labs/chemistry/reactions/electron-flow.js");
        const inst = Lb.instantiate(Lb.REACTIONS.find((r) => r.id === "hbr-propene")), pts = E.replay({ start: inst.start, steps: inst.steps }).states.flatMap((s) => s.atoms);
        const host = document.querySelector(".mx-svg"), r = host.getBoundingClientRect(), W = Math.round(host.parentElement.clientWidth), H = parseFloat(host.style.height);
        const x0 = Math.min(...pts.map((a) => a.x)) - 1.4, x1 = Math.max(...pts.map((a) => a.x)) + 1.4, y0 = Math.min(...pts.map((a) => a.y)) - 1.4, y1 = Math.max(...pts.map((a) => a.y)) + 1.4;
        const v = { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, s: Math.min(58, W / (x1 - x0), H / (y1 - y0)) };
        const at = (x, y) => [r.left + (x - v.cx) * v.s + W / 2, r.top + (y - v.cy) * v.s + H / 2];
        return { from: at(0.68 * 0.87, 0.68 * 0.5), to: at(-0.3, -1.4) };
      });
      await pg.mouse.move(...geo.from); await pg.mouse.down(); for (let i = 1; i <= 8; i++) await pg.mouse.move(geo.from[0] + ((geo.to[0] - geo.from[0]) * i) / 8, geo.from[1] + ((geo.to[1] - geo.from[1]) * i) / 8); await pg.mouse.up();
      await kbd(); await add("H–Br bond", "^atom Br$");
      await pg.locator(".mx-actions button", { hasText: "Check step" }).click(); await pg.waitForTimeout(300);
      ok(/Markovnikov/.test(await text(".mx-fb")) && await pg.locator("[data-ecf]").count() === 1, `${L}: a dragged anti-Markovnikov arrow is recognised and can be carried forward`);
      await pg.locator("[data-ecf]").click(); await pg.waitForTimeout(2600);
      await add("lone pair on Br", "^atom C1$");
      await pg.locator(".mx-actions button", { hasText: "Check step" }).click(); await pg.waitForTimeout(3000);
      const f2 = await text(".mx-fb");
      ok(/Error carried forward/.test(f2) && /1-bromopropane/.test(f2), `${L}: the next step is credited on the learner's own intermediate`);
    }
    await pg.selectOption(".mx-src", "e1"); await pg.waitForTimeout(300);
    await pg.locator(".mx-more button", { hasText: "Spot the error" }).click(); await pg.waitForTimeout(300);
    ok(await pg.locator("[data-spot]").count() >= 1, `${L}: Spot the error shows numbered arrows`);
    await pg.locator("[data-spot]").first().click(); await pg.waitForTimeout(200);
    ok(/wrong/.test(await text(".mx-fb")), `${L}: the verdict explains which arrow is wrong`);
    await pg.locator("[data-spot-end]").click();
    await pg.selectOption(".mx-src", "sn2"); await pg.waitForTimeout(300);
    await pg.locator(".mx-opts label", { hasText: "Exam style" }).locator("input").check(); await pg.waitForTimeout(300);
    ok(await pg.locator("[data-xc]").count() === 4 && await pg.locator(".mx-help .lab-btn").count() === 0, `${L}: exam style asks for conditions first, with no help`);
    await pg.locator("[data-xc]", { hasText: "NaOH(aq); warm, under reflux" }).click(); await pg.waitForTimeout(200);
    await kbd(); await add("lone pair on O", "^atom C1$"); await add("C1–Br bond", "^atom Br$");
    await pg.locator(".mx-actions button", { hasText: "Check step" }).click(); await pg.waitForTimeout(500);
    ok(await pg.locator("[data-xe]").count() === 4, `${L}: the exam ends with an explanation question`);
    await pg.locator("[data-xe]", { hasText: "Drawing the arrow from the O atom" }).click(); await pg.waitForTimeout(300);
    ok(/Total\s*10\/10/.test(await text(".mx-marks")), `${L}: a full mark breakdown, 10/10`);
    await pg.locator(".mx-opts label", { hasText: "Exam style" }).locator("input").uncheck();
    ok(/of 22 done/.test(await text('[data-pane="mechanism"] .osk-chal-n')), `${L}: Mechanism challenges collapse to a progress line`);

    // ---------- every mode: no sideways scrolling, named controls ----------
    for (const m of ["structure", "mechanism", "reaction", "3d"]) {
      await mode(m); if (m === "3d") await shot("3d");
      const w = await sideways(); ok(w <= 1, `${L}: no sideways scrolling in ${m} (${w}px)`);
      const unnamed = await pg.$$eval(".osk-lab button, .osk-lab select, .osk-lab input", (els) => els.filter((e) => e.offsetParent !== null && !(e.getAttribute("aria-label") || e.textContent.trim() || e.closest("label")?.textContent.trim() || e.placeholder)).length);
      ok(unnamed === 0, `${L}: every visible control in ${m} has an accessible name (${unnamed} without)`);
    }
    // theme switch repaints the open mode
    await mode("reaction"); await pg.evaluate((t) => window.gradifyTheme.set(t), theme === "light" ? "dark" : "light"); await pg.waitForTimeout(300);
    ok(await pg.evaluate((t) => getComputedStyle(document.querySelector(".osk-lab")).colorScheme === t, theme === "light" ? "dark" : "light"), `${L}: switching theme restyles the open lab`);
    ok(!errs.length, `${L}: no script errors${errs.length ? `: ${errs.slice(0, 3).join(" | ")}` : ""}`);
    await ctx.close();
  }
  await browser.close(); server.close();
  console.log(fails ? `\n${fails} check(s) failed.` : "\nAll Organic Chemistry Lab journeys passed.");
  process.exit(fails ? 1 : 0);
})();
