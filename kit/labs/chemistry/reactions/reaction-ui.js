// Reaction mode of the Organic Chemistry Lab, in three views:
//   Predict     a starting material (your Structure-mode drawing or a common compound) and a reagent; the predictor
//               (predictor.js) gives the products with its reasoning, or says why there is no reaction. "Predict
//               first" hides the answer; Practice picks questions at your level, weighted towards reagents you've
//               got wrong, optionally against a timer.
//   Conditions  substitution versus elimination: two sets of conditions side by side (competition.js).
//   Synthesis   reach a target from a starting material, forwards or backwards (planner.js); every step is checked
//               by the same rules, so any route they support is accepted.
import { toggle, button, esc } from "../../lab.js";
import { challengePanel, outcomeBanner } from "../ui.js";
import * as K from "../skeletal.js";
import { REAGENTS, STARTERS, predict, starter, reagentOf, LEVELS, atLevel } from "./predictor.js";
import { competition, NUCLEOPHILES, SOLVENTS, TEMPS, halideSites } from "./competition.js";
import { TASKS, task, routes, explore, precursors, moves, hashOf } from "./planner.js";
import { REACTIONS } from "./library.js";
import { CONFIDENCE } from "./rules.js";
import { explainContext } from "./predictor.js";
import { mountTutor } from "./tutor-ui.js";

const sub = (f) => esc(f).replace(/(\d+)/g, "<sub>$1</sub>");
const nameOf = (m) => { const A = K.analyse(m); return A.name?.name || A.formula; };
const shuffle = (a, seed) => { const r = [...a]; let x = seed || 1; for (let i = r.length - 1; i > 0; i--) { x = (x * 9301 + 49297) % 233280; const j = Math.floor((x / 233280) * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
const HIST = "gradify.organicLab.rxHistory";
const loadH = () => { try { return JSON.parse(localStorage.getItem(HIST)) || {}; } catch { return {}; } };
const saveH = (h) => { try { localStorage.setItem(HIST, JSON.stringify(h)); } catch { /* storage may be off */ } };

export function mountReaction(host, { ctx = {}, palette = () => "dark", getDrawing = () => null, onMechanism = null, onEdit = null, prefs = { level: "university" }, onPrefs = () => {} } = {}) {
  host.innerHTML = `
    <div class="lab-row mx-top rx-top">
      <div class="lab-seg rx-views" role="tablist" aria-label="Reaction view"><button type="button" data-v="predict" aria-pressed="true">Predict</button><button type="button" data-v="conditions" aria-pressed="false">Conditions</button><button type="button" data-v="synthesis" aria-pressed="false">Synthesis</button></div>
      <label class="lab-sel"><span>Level</span><select class="rx-level">${Object.entries(LEVELS).map(([k, v]) => `<option value="${k}">up to ${v}</option>`).join("")}</select></label>
    </div>
    <div class="rx-view" data-view="predict">
      <div class="lab-row mx-top"><label class="lab-sel"><span>Start</span><select class="rx-src"></select></label><label class="lab-sel"><span>Reagent and conditions</span><select class="rx-reag"></select></label></div>
      <div class="lab-row rx-practice" role="group" aria-label="Practice"><span class="osk-label">Practice</span></div>
      <div class="rx-route" aria-live="polite"></div>
      <div class="lab-cols osk-cols"><div class="rx-scheme" aria-live="polite"></div><div class="lab-ctrl"><div class="lab-info rx-info" aria-live="polite"></div><div class="lab-row rx-btns"></div><div class="rx-tutor"></div></div></div>
    </div>
    <div class="rx-view" data-view="conditions" hidden></div>
    <div class="rx-view" data-view="synthesis" hidden></div>
    <div class="rx-about"></div>`;
  const q = (s) => host.querySelector(s);
  let view = "predict", start = null, srcKey = "mine", reagent = REAGENTS[0].id, guess = null, predictFirst = false, seed = 1, route = [];
  let stats = { right: 0, asked: 0, comp: 0 }, practice = null, timed = false, clock = null, hist = loadH();
  const lv = q(".rx-level"); lv.value = prefs.level || "university";
  const level = () => lv.value;
  const ch = challengePanel(q(".rx-about"), ctx, [
    { id: "rx-predict", text: "Predict five products correctly, with “Predict first” on", test: (s) => s.right >= 5 },
    { id: "rx-markovnikov", text: "Predict the major product when HBr or steam adds to an unsymmetrical alkene", test: (s) => s.ok && ["hbr", "steam"].includes(s.reagent) && s.minor },
    { id: "rx-zaitsev", text: "Predict the major alkene from an elimination that can give two", test: (s) => s.ok && ["koh-eth", "h3po4", "tbuok"].includes(s.reagent) && s.minor },
    { id: "rx-directing", text: "Predict where a substituted benzene ring is substituted", test: (s) => s.ok && ["nitration", "cl2-alcl3", "br2-febr3", "fc-alkyl", "fc-acyl"].includes(s.reagent) && s.substituted },
    { id: "rx-two-step", text: "Carry out a two-step synthesis: react a product again", test: (s) => s.routeSteps >= 2 },
    { id: "rx-competition", text: "Predict the main pathway (SN1, SN2, E1 or E2) correctly three times", test: (s) => s.comp >= 3 },
    { id: "rx-synthesis", text: "Complete a synthesis challenge", test: (s) => s.synth },
    { id: "rx-retro", text: "Complete a synthesis by working backwards from the target", test: (s) => s.retro },
  ]);
  const check = (x) => ch.check({ right: stats.right, comp: stats.comp, routeSteps: route.length, ...x });

  const remember = () => { prefs.rx = { view, src: srcKey === "route" ? prefs.rx?.src || "mine" : srcKey, reagent }; onPrefs(prefs); };
  function showView(v) { view = v; q(".rx-views").querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.v === v))); host.querySelectorAll("[data-view]").forEach((p) => { p.hidden = p.dataset.view !== view; }); remember(); paintView(); }
  q(".rx-views").addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (b) showView(b.dataset.v); });
  lv.addEventListener("change", () => { prefs.level = lv.value; onPrefs(prefs); fillReagents(); fillTasks(); paintView(); });

  // ---------- predict ----------
  const src = q(".rx-src");
  src.innerHTML = `<option value="mine">My drawing (from Structure mode)</option><optgroup label="Common compounds">${STARTERS.map(([n]) => `<option value="${esc(n)}">${esc(n)}</option>`).join("")}</optgroup>`;
  src.addEventListener("change", () => { srcKey = src.value; route = []; practice = null; stopClock(); remember(); load(); });
  const rg = q(".rx-reag");
  function fillReagents() {
    const list = REAGENTS.filter((r) => atLevel(r, level())), groups = [...new Set(list.map((r) => r.type.split(" (")[0]))];
    rg.innerHTML = groups.map((g) => `<optgroup label="${esc(g)}">${list.filter((r) => r.type.split(" (")[0] === g).map((r) => `<option value="${r.id}">${esc(r.label)}, ${esc(r.cond)}</option>`).join("")}</optgroup>`).join("");
    if (!list.some((r) => r.id === reagent)) reagent = list[0].id;
    rg.value = reagent;
  }
  fillReagents();
  rg.addEventListener("change", () => { reagent = rg.value; guess = null; seed++; practice = null; stopClock(); remember(); paint(); });
  const pr = q(".rx-practice");
  button(pr, "Practice question", nextQuestion, "pri");
  const opts0 = document.createElement("span"); opts0.className = "mx-opts rx-opts"; pr.append(opts0);
  const pfToggle = toggle(opts0, "Predict first", predictFirst, (v) => { predictFirst = v; guess = null; paint(); });
  toggle(opts0, "Timed (45 s)", timed, (v) => { timed = v; });
  const score = document.createElement("span"); score.className = "osk-aka rx-score"; pr.append(score);

  // practice: a random starting material and reagent at the chosen level, weighted towards reagent families the
  // learner has got wrong before (adaptive), with real reactions most of the time and some "no reaction" cases
  function nextQuestion() {
    const list = REAGENTS.filter((r) => atLevel(r, level()));
    for (let tries = 0; tries < 200; tries++) {
      const w = list.map((r) => 1 + 2 * (hist[r.type.split(" (")[0]] || 0)), tot = w.reduce((a, b) => a + b, 0);
      let x = Math.random() * tot, r = list[0]; for (let i = 0; i < list.length; i++) { x -= w[i]; if (x <= 0) { r = list[i]; break; } }
      const [n] = STARTERS[Math.floor(Math.random() * STARTERS.length)], m = starter(n), res = predict(m, r.id);
      // only questions with a definite answer: a predicted reaction, or (sometimes) a checked "no reaction"; never a
      // case the lab can't predict, whose honest answer isn't "no reaction"
      if (res.outcome === "unsupported" || (res.outcome === "no_reaction" && Math.random() > 0.2)) continue;
      start = m; srcKey = n; src.value = n; reagent = r.id; rg.value = r.id; route = []; guess = null; seed++;
      predictFirst = true; pfToggle.checked = true; practice = { family: r.type.split(" (")[0] };
      stopClock(); if (timed) { practice.end = Date.now() + 45000; clock = setInterval(() => { const left = Math.ceil((practice.end - Date.now()) / 1000); const t = q(".rx-clock"); if (t) t.textContent = `⏱ ${Math.max(0, left)} s`; if (left <= 0) { stopClock(); answer(null); } }, 250); }
      paint(); return;
    }
  }
  function stopClock() { if (clock) { clearInterval(clock); clock = null; } }
  function answer(choice) {
    const res = predict(start, reagent), opts = options(res);
    guess = choice ?? "(time ran out)"; const ok = opts.right.includes(guess);
    stats.asked++; if (ok) stats.right++; else ctx.fail?.("rx-predict", `${nameOf(start)} + ${reagentOf(reagent).label}`);
    if (practice) { const f = practice.family; hist[f] = Math.max(0, (hist[f] || 0) + (ok ? -1 : 1)); saveH(hist); }
    stopClock();
    check({ ok, reagent, minor: res.reacts && res.products.some((p) => p.role === "minor"), substituted: res.reacts && K.analyse(start).formula !== "C6H6" && /aromatic|Friedel/i.test(res.type) });
    paint();
  }
  function load() {
    guess = null;
    if (srcKey === "route") { /* start set by "use as next" */ } else if (srcKey === "mine") { const m = getDrawing(); start = m && m.atoms.length ? m : null; } else start = starter(srcKey);
    paint();
  }
  const pal = () => palette();
  const mol = (m, w = 240, h = 150) => { const A = K.analyse(m); return K.render(m, A, K.fit(m, [w, h], { max: 30, pad: 0.8 }), [w, h], { palette: pal(), title: A.name?.name || A.formula }); };
  const card = (m, role = "product", note = "", w, h) => { const A = K.analyse(m); return `<figure class="rx-mol ${role === "minor" ? "minor" : ""}">${mol(m, w, h)}<figcaption>${role !== "product" ? `<em class="rx-role ${role}">${role}</em> ` : ""}<b>${esc(A.name?.name || "")}</b> <span>${sub(A.formula)}${A.charge ? (A.charge < 0 ? "⁻" : "⁺") : ""}</span>${note ? `<small>${esc(note)}</small>` : ""}</figcaption></figure>`; };
  function options(res) {
    const right = res.reacts ? (res.products.length ? res.products.filter((p) => p.role !== "minor").map((p) => nameOf(p.m)) : ["No organic product"]) : ["No reaction"];
    const pool = new Set(res.reacts && res.join === "+" ? [right.join(" + ")] : right);
    if (res.reacts) res.products.filter((p) => p.role === "minor").forEach((p) => pool.add(nameOf(p.m)));
    for (const r of shuffle(REAGENTS, seed)) { if (pool.size >= 4) break; if (r.id === reagent) continue; const o = predict(start, r.id); if (o.reacts && o.products.length) { const n = nameOf(o.products[0].m); if (!right.includes(n)) pool.add(n); } }
    if (pool.size < 4) pool.add(right.includes("No reaction") ? nameOf(start) : "No reaction");
    const accepted = res.reacts && res.join === "+" ? [right.join(" + ")] : right;
    return { right: accepted, list: shuffle([...pool].slice(0, 4), seed + 7) };
  }
  function paint() {
    const box = q(".rx-scheme"), info = q(".rx-info"), btns = q(".rx-btns"); btns.innerHTML = "";
    score.textContent = stats.asked ? `${stats.right}/${stats.asked} right this session` : "";
    q(".rx-route").innerHTML = route.length ? `<span class="osk-aka">Route so far</span> ${route.map((r) => `<span class="rx-chip">${esc(r.from)}</span><i>→<small>${esc(r.reagent)}</small></i>`).join("")}<span class="rx-chip now">${esc(nameOf(start))}</span>` : "";
    if (!start) { box.innerHTML = `<div class="rx-empty"><p>Draw a starting material in <b>Structure</b> mode, choose a common compound above, or press <b>Practice question</b>.</p></div>`; info.innerHTML = ""; return; }
    const res = predict(start, reagent), r = res.reagent;
    const arrow = `<div class="mx-arrow rx-arrow"><small>${esc(r.label)}</small><b>⟶</b><small>${esc(r.cond)}</small></div>`;
    const quiz = predictFirst && res.outcome !== "unsupported", opts = quiz ? options(res) : null, hidden = quiz && guess == null;
    const prods = !res.reacts || hidden || !res.products.length ? `<div class="rx-none">${hidden ? "?" : res.reacts ? "No organic product" : res.outcome === "unsupported" ? "Not predicted" : "No reaction"}</div>` : res.products.map((p) => card(p.m, p.role, p.note)).join(`<span class="rx-plus">${res.join === "+" ? "+" : "or"}</span>`);
    const by = res.reacts && !hidden && res.byproducts.length ? `<span class="rx-by">+ ${res.byproducts.map(sub).join(" + ")}</span>` : "";
    box.innerHTML = `<div class="rx-row">${card(start)}${arrow}<div class="rx-prods">${prods}${by}</div></div>`;
    if (hidden) {
      info.innerHTML = `<h4>Predict the product${practice && timed ? ` <span class="rx-clock">⏱ 45 s</span>` : ""}</h4><p>What forms when <b>${esc(nameOf(start))}</b> reacts with ${esc(r.label)} (${esc(r.cond)})?${res.reacts && res.products.filter((p) => p.role !== "minor").length > 1 && res.join !== "+" ? " Several answers are accepted: any main product." : res.reacts && res.products.some((p) => p.role === "minor") ? " Choose the major product." : ""}</p><div class="rx-choices">${opts.list.map((o, i) => `<button type="button" class="lab-btn" data-g="${i}">${esc(o)}</button>`).join("")}</div>`;
      info.querySelectorAll("[data-g]").forEach((b) => b.addEventListener("click", () => answer(opts.list[Number(b.dataset.g)])));
      return;
    }
    const verdict = guess == null || !opts ? "" : opts.right.includes(guess) ? `<p class="lab-msg ok">✓ Right: ${esc(guess)}.</p>` : `<p class="lab-msg">✗ ${guess === "(time ran out)" ? "Time ran out." : `You chose ${esc(guess)}.`} ${res.reacts ? `The answer: ${esc(opts.right.join(" or "))}.` : "There's no reaction."}</p>`;
    const comp = res.competition ? `<p class="osk-aka">${res.competition.pathways.map((p) => `${p.mech}: ${p.share}`).join(" · ")}. Explore other conditions in the <b>Conditions</b> view.</p>` : "";
    const rule = res.rule ? `<details class="rx-rule"><summary>The rule behind this</summary><dl><dt>Applies to</dt><dd>${esc(res.rule.reactants)}</dd><dt>Gives</dt><dd>${esc(res.rule.products)}</dd><dt>Selectivity</dt><dd>${esc(res.rule.selectivity)}</dd>${res.rule.limitations.length ? `<dt>Doesn't cover</dt><dd><ul>${res.rule.limitations.map((l) => `<li>${esc(l)}</li>`).join("")}</ul></dd>` : ""}<dt>Sources</dt><dd>${res.rule.sources.map((x) => esc(`${x.id === "aqa" ? "AQA A-level (7405)" : x.id === "clayden" ? "Clayden, Organic Chemistry" : x.id === "ocr" ? "OCR A-level" : "March's Advanced Organic Chemistry"}: ${x.topic}`)).join("; ")}</dd><dt>Confidence</dt><dd>${esc(res.rule.confidence)}: ${esc(CONFIDENCE[res.rule.confidence])}</dd></dl></details>` : "";
    const mains = res.reacts ? res.products.filter((p) => p.role !== "minor").map((p) => nameOf(p.m)) : [];
    const head = res.outcome === "reaction" ? outcomeBanner("reaction", res.type, mains.length ? `${res.products.some((p) => p.role === "major") ? "Major product" : mains.length > 1 ? "Products" : "Product"}: ${mains.join(res.join === "+" ? " + " : " or ")}${res.products.some((p) => p.role === "minor") ? " (minor products shown too)" : ""}` : "No organic product: see below.")
      : res.outcome === "no_reaction" ? outcomeBanner("no_reaction", "No reaction under these conditions", "Every group in this molecule was checked against this reagent.")
      : outcomeBanner("unsupported", "Not supported by the lab's rules", "Something may happen, but the lab can't reliably predict it. It says why below; try another reagent or a simpler molecule, or ask the tutor.");
    box.insertAdjacentHTML("afterbegin", head);
    info.innerHTML = `${verdict}<ul class="mx-list">${res.why.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>${res.reacts && res.stereo?.length ? `<p><b>Stereochemistry</b></p><ul class="mx-list">${res.stereo.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}${comp}${res.reacts ? `<p class="osk-aka">Predicted by rule templates (${esc(r.type.toLowerCase())}). Real reactions can also give side products the rules don't list.</p>` : ""}${rule}`;
    if (practice) button(btns, "Next question", nextQuestion, "pri");
    if (res.reacts && res.mechanism && onMechanism && REACTIONS.some((x) => x.id === res.mechanism)) button(btns, "See the mechanism", () => onMechanism(res.mechanism), practice ? "" : "pri");
    const named = new Set();
    if (res.reacts) res.products.forEach((p) => { const nm = nameOf(p.m); if (K.analyse(p.m).charge || named.has(nm)) return; named.add(nm); button(btns, `Continue with ${nm}`, () => {
      route.push({ from: nameOf(start), reagent: r.label }); start = K.clone(p.m); srcKey = "route"; guess = null; seed++; practice = null; check({}); paint();
    }); });
    if (onEdit) button(btns, "Edit in Structure mode", () => onEdit(K.clone(res.reacts && res.products.length ? res.products[0].m : start)));
    if (route.length) button(btns, "Start the route again", () => { route = []; srcKey = src.value; load(); });
    tutor.refresh();
  }

  // ---------- conditions: substitution versus elimination ----------
  const cHost = q('[data-view="conditions"]');
  const HALIDES = ["bromoethane", "1-bromopropane", "2-bromopropane", "2-bromobutane", "2-bromo-2-methylpropane", "1-bromo-2,2-dimethylpropane"];
  let cStart = "2-bromobutane", sets = [{ nuc: "hydroxide", solvent: "water", temp: "warm" }, { nuc: "hydroxide", solvent: "ethanol", temp: "hot" }], cGuess = [null, null];
  const opt = (obj, v) => Object.entries(obj).map(([k, x]) => `<option value="${k}" ${k === v ? "selected" : ""}>${esc(typeof x === "string" ? x : x.label)}</option>`).join("");
  function paintConditions() {
    const mine = getDrawing(), mineOk = mine && halideSites(mine).length === 1;
    const m = cStart === "mine" ? (mineOk ? mine : null) : starter(cStart);
    cHost.innerHTML = `<div class="lab-row mx-top"><label class="lab-sel"><span>Halogenoalkane</span><select class="cx-src">${mineOk ? `<option value="mine">My drawing</option>` : ""}${HALIDES.map((n) => `<option value="${n}" ${n === cStart ? "selected" : ""}>${n}</option>`).join("")}</select></label></div>
      <div class="lab-cols osk-cols cx-cols">${sets.map((c, i) => {
        const r = m ? competition(m, c) : { ok: false, why: "Choose a halogenoalkane." }, hide = predictFirst && cGuess[i] == null && r.ok;
        const pick = hide ? `<p>Which pathway is the main one?</p><div class="rx-choices">${["SN2", "SN1", "E2", "E1"].map((p) => `<button type="button" class="lab-btn" data-cg="${i}:${p}">${p}</button>`).join("")}</div>` : "";
        const verdict = cGuess[i] && r.ok ? (r.pathways.filter((p) => p.share === "major").some((p) => p.mech === cGuess[i]) ? `<p class="lab-msg ok">✓ ${cGuess[i]} is right.</p>` : `<p class="lab-msg">✗ Not ${cGuess[i]}.</p>`) : "";
        return `<div class="lab-ctrl cx-set"><div class="lab-info"><h4>Conditions ${"AB"[i]}</h4>
          <label class="lab-sel"><span>Reagent</span><select data-c="${i}:nuc">${opt(NUCLEOPHILES, c.nuc)}</select></label>
          <label class="lab-sel"><span>Solvent</span><select data-c="${i}:solvent">${opt(SOLVENTS, c.solvent)}</select></label>
          <label class="lab-sel"><span>Temperature</span><select data-c="${i}:temp">${opt(TEMPS, c.temp)}</select></label>
          ${pick}${verdict}${hide ? "" : r.ok ? `<div class="cx-paths">${r.pathways.map((p) => `<div class="cx-path ${p.share}"><b>${p.mech}</b> <em>${p.share}</em><span class="cx-bar"><i style="width:${Math.round(p.score * 100)}%"></i></span><div class="cx-prods">${p.products.map((x) => card(x.m, x.role === "minor" ? "minor" : "product", "", 200, 110)).join("")}</div><small>${esc(p.why)}</small></div>`).join("")}</div><ul class="mx-list">${r.factors.map((f) => `<li>${esc(f)}</li>`).join("")}</ul><p class="osk-aka">${esc(r.note)}</p>` : `<p class="lab-msg">${esc(r.why)}</p>`}
        </div></div>`; }).join("")}</div>`;
    cHost.querySelector(".cx-src").addEventListener("change", (e) => { cStart = e.target.value; cGuess = [null, null]; paintConditions(); });
    cHost.querySelectorAll("[data-c]").forEach((s) => s.addEventListener("change", () => { const [i, k] = s.dataset.c.split(":"); sets[Number(i)][k] = s.value; cGuess[Number(i)] = null; paintConditions(); }));
    cHost.querySelectorAll("[data-cg]").forEach((b) => b.addEventListener("click", () => {
      const [i, p] = b.dataset.cg.split(":"), r = competition(m, sets[Number(i)]); cGuess[Number(i)] = p;
      if (r.pathways.filter((x) => x.share === "major").some((x) => x.mech === p)) stats.comp++; else ctx.fail?.("rx-competition", `${cStart}: ${p}`);
      check({}); paintConditions();
    }));
  }

  // ---------- synthesis planning ----------
  const sHost = q('[data-view="synthesis"]');
  let T = null, path = [], backwards = false, back = null, graph = null, hintLevel = 0, sMsg = "";
  function fillTasks() { const ok = TASKS.filter((t) => atLevel(t, level())); if (!T || !atLevel(T, level())) setTask(ok[0]?.id); }
  function setTask(id) { T = id ? task(id) : null; path = T ? [{ m: T.start, hash: hashOf(T.start) }] : []; back = T ? [{ m: T.target, hash: T.targetHash }] : []; graph = null; hintLevel = 0; sMsg = ""; }
  const g = () => graph || (graph = explore(T.start, { depth: T.best + 1, level: level() }));
  function paintSynthesis() {
    if (!T) { sHost.innerHTML = `<p class="rx-empty">No synthesis challenges at this level.</p>`; return; }
    const cur = path.at(-1), done = cur.hash === T.targetHash, bdone = back.at(-1).hash === hashOf(T.start);
    const chain = (list, rev) => list.map((s, i) => `${i ? `<i>→<small>${esc(reagentOf(s.reagent)?.label || "")}</small></i>` : ""}<span class="rx-chip ${i === list.length - 1 ? "now" : ""}">${esc(nameOf(s.m))}</span>`).join("");
    const reagentOpts = REAGENTS.filter((r) => atLevel(r, level())).map((r) => `<option value="${r.id}">${esc(r.label)}, ${esc(r.cond)}</option>`).join("");
    let body;
    if (!backwards) {
      body = `<div class="rx-row">${card(cur.m)}<div class="mx-arrow rx-arrow"><small>${done ? "done" : "?"}</small><b>⟶</b><small>${path.length - 1} step${path.length === 2 ? "" : "s"}</small></div>${card(T.target, "product", "Target")}</div>
        <div class="rx-route">${chain(path)}</div>
        ${done ? `<p class="lab-msg ok">✓ Target reached in ${path.length - 1} step${path.length === 2 ? "" : "s"}${path.length - 1 <= T.best ? " — as short as the rules allow" : ` (the shortest route the rules allow has ${T.best})`}.</p>` : `<div class="lab-row"><label class="lab-sel"><span>Next reagent</span><select class="sy-reag">${reagentOpts}</select></label></div><div class="lab-row sy-btns"></div>`}
        ${sMsg ? `<div class="lab-info">${sMsg}</div>` : ""}`;
    } else {
      const now = back.at(-1), opts = bdone ? [] : backOptions(now);
      body = `<div class="rx-row">${card(T.start, "product", "Start")}<div class="mx-arrow rx-arrow"><small>working backwards</small><b>⟵</b><small>${back.length - 1} step${back.length === 2 ? "" : "s"}</small></div>${card(now.m, "product", back.length === 1 ? "Target" : "Precursor")}</div>
        <div class="rx-route">${chain([...back].reverse().map((s, i, a) => ({ m: s.m, reagent: a[i - 1]?.reagentFwd })))}</div>
        ${bdone ? `<p class="lab-msg ok">✓ You've worked back to the starting material: a ${back.length - 1}-step route.</p>` : `<p>What could <b>${esc(nameOf(now.m))}</b> be made from, in one step? (Retrosynthesis: think of the reaction that makes its functional group.)</p><div class="rx-choices sy-back">${opts.map((o, i) => `<button type="button" class="lab-btn" data-b="${i}">${esc(nameOf(o.m))}, using ${esc(reagentOf(o.reagent).label)}</button>`).join("")}</div>`}
        ${sMsg ? `<div class="lab-info">${sMsg}</div>` : ""}`;
      sHost._opts = opts;
    }
    sHost.innerHTML = `<div class="lab-row mx-top"><label class="lab-sel"><span>Challenge</span><select class="sy-task">${TASKS.filter((t) => atLevel(t, level())).map((t) => `<option value="${t.id}" ${t.id === T.id ? "selected" : ""}>${esc(t.text)}</option>`).join("")}</select></label><div class="lab-seg sy-dir" role="group" aria-label="Direction"><button type="button" data-d="f" aria-pressed="${!backwards}">Forwards</button><button type="button" data-d="b" aria-pressed="${backwards}">Backwards</button></div></div>
      <p class="osk-aka">${esc(LEVELS[T.level])} · ${esc(T.text)} Every step is checked with the same rules as Predict, so any route they support counts.</p>${body}`;
    sHost.querySelector(".sy-task").addEventListener("change", (e) => { setTask(e.target.value); paintSynthesis(); });
    sHost.querySelector(".sy-dir").addEventListener("click", (e) => { const b = e.target.closest("[data-d]"); if (!b) return; backwards = b.dataset.d === "b"; sMsg = ""; paintSynthesis(); });
    const sb = sHost.querySelector(".sy-btns");
    if (sb) {
      button(sb, "Apply", () => applyStep(sHost.querySelector(".sy-reag").value), "pri");
      button(sb, "Hint", hint);
      if (path.length > 1) button(sb, "Undo step", () => { path.pop(); sMsg = ""; paintSynthesis(); });
    }
    if (done || bdone) { const b2 = document.createElement("div"); b2.className = "lab-row"; sHost.append(b2); button(b2, "Try again", () => { setTask(T.id); paintSynthesis(); }); }
    sHost.querySelectorAll("[data-b]").forEach((b) => b.addEventListener("click", () => pickBack(sHost._opts[Number(b.dataset.b)])));
    const th = document.createElement("div"); sHost.append(th);
    sTutor = mountTutor(th, { ask: ctx.ask || null, getContext: synthContext, learner: () => ({ mistakes: mistakes() }), intents: [["synthesis", "Help me understand this route"], ["guide", "Guide me to the next step", (c) => !c.reached]] });
  }
  function applyStep(rid) {
    const cur = path.at(-1), res = predict(cur.m, rid), r = reagentOf(rid);
    if (!res.reacts) { sMsg = `<p class="lab-msg">✗ No useful reaction: ${esc(res.why[0])}</p>`; ctx.fail?.("rx-synthesis", T.text); paintSynthesis(); return; }
    const main = res.products.filter((p) => p.role !== "minor" && !K.analyse(p.m).charge);
    const pickP = (p) => { path.push({ m: p.m, hash: hashOf(p.m), reagent: rid }); hintLevel = 0; sMsg = `<p><b>${esc(r.label)}</b>: ${esc(res.why[0])}</p>`; if (hashOf(p.m) === T.targetHash) check({ synth: true }); paintSynthesis(); };
    if (main.length === 1) { pickP(main[0]); return; }
    if (!main.length) { sMsg = `<p class="lab-msg">✗ This gives only an ion or a minor product here, which isn't a useful intermediate.</p>`; paintSynthesis(); return; }
    sMsg = `<p>${esc(r.label)} gives more than one main product. Which do you carry on with?</p><div class="rx-choices">${main.map((p, i) => `<button type="button" class="lab-btn" data-pp="${i}">${esc(nameOf(p.m))}</button>`).join("")}</div>`;
    paintSynthesis(); sHost.querySelectorAll("[data-pp]").forEach((b) => b.addEventListener("click", () => pickP(main[Number(b.dataset.pp)])));
  }
  function hint() {
    const cur = path.at(-1), rr = routes(cur.m, T.targetHash, { depth: Math.max(1, T.best + 2 - (path.length - 1)), level: level(), max: 3 }).routes;
    if (!rr.length) { sMsg = `<p class="lab-msg">From ${esc(nameOf(cur.m))} the rules find no route to the target within a few steps. Undo a step and try another way.</p>`; paintSynthesis(); return; }
    hintLevel++;
    const first = rr[0][0], nextM = routes(cur.m, T.targetHash, { depth: rr[0].length, level: level(), max: 1 }).graph.nodes.get(first.to)?.m;
    sMsg = hintLevel === 1 ? `<p><b>Hint:</b> the shortest route from here has ${rr[0].length} step${rr[0].length > 1 ? "s" : ""}. Aim for <b>${esc(nextM ? nameOf(nextM) : "the next intermediate")}</b> next.</p>` : `<p><b>Hint:</b> use <b>${esc(reagentOf(first.reagent).label)}</b> (${esc(reagentOf(first.reagent).cond)}).</p>`;
    paintSynthesis();
  }
  // retrosynthesis options: real precursors in the graph from the start (nearest first) and plausible decoys
  function backOptions(now) {
    const gr = g(), dNow = gr.nodes.get(now.hash)?.depth ?? 99, real = precursors(gr, now.hash).filter((e) => gr.nodes.get(e.from).depth < dNow).slice(0, 2).map((e) => ({ m: gr.nodes.get(e.from).m, reagent: e.reagent, hash: e.from, ok: true }));
    const decoys = [];
    for (const [h, n] of shuffle([...gr.nodes.entries()], seed + back.length)) {
      if (decoys.length >= 2) break; if (h === now.hash || real.some((r) => r.hash === h)) continue;
      const rs = shuffle(REAGENTS.filter((r) => atLevel(r, level())), seed + h.length);
      const r = rs.find((x) => predict(n.m, x.id).reacts && !moves(n.m, level()).some((mv) => mv.reagent === x.id && mv.hash === now.hash));
      if (r) decoys.push({ m: n.m, reagent: r.id, hash: h, ok: false });
    }
    return shuffle([...real, ...decoys], seed + 3 * back.length);
  }
  function pickBack(o) {
    const now = back.at(-1);
    if (!o.ok) { const res = predict(o.m, o.reagent); sMsg = `<p class="lab-msg">✗ ${esc(reagentOf(o.reagent).label)} turns ${esc(nameOf(o.m))} into ${res.reacts ? esc(res.products.map((p) => nameOf(p.m)).join(" or ")) : "nothing useful"}, not ${esc(nameOf(now.m))}.</p>`; ctx.fail?.("rx-retro", T.text); paintSynthesis(); return; }
    back.push({ m: o.m, hash: o.hash, reagentFwd: o.reagent }); sMsg = `<p>✓ ${esc(nameOf(o.m))} → ${esc(nameOf(now.m))} with ${esc(reagentOf(o.reagent).label)}.</p>`;
    if (o.hash === hashOf(T.start)) check({ retro: true });
    seed++; paintSynthesis();
  }

  // ---------- the AI tutor: it is given the engine's own data, never asked to work the chemistry out ----------
  const mistakes = () => Object.entries(hist).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([topic, count]) => ({ topic, count }));
  const tutor = mountTutor(q(".rx-tutor"), { ask: ctx.ask || null, onUse: () => {},
    getContext: () => { if (!start) return null; const res0 = predict(start, reagent); if (predictFirst && guess == null && res0.outcome !== "unsupported") return null; const res = predict(start, reagent); return { kind: "prediction", ...explainContext(start, res) }; },
    learner: () => { const res = start ? predict(start, reagent) : null, o = res ? options(res) : null; return { mistakes: mistakes(), ...(guess && o && !o.right.includes(guess) ? { answer: `I chose: ${guess}` } : {}) }; },
    intents: [["explain", "Explain this reaction"], ["compare", "Why this product, not another?", (c) => c.outcome === "reaction" && (c.products.length > 1 || c.pathways)], ["guide", "Guide me through it", (c) => c.outcome === "reaction"], ["diagnose", "What did I get wrong?", () => { const res = predict(start, reagent), o = options(res); return guess != null && !o.right.includes(guess); }]] });
  let sTutor = null, routeCache = null;
  function synthContext() {
    if (!T) return null;
    const steps = path.slice(1).map((s, i) => { const res = predict(path[i].m, s.reagent), g = reagentOf(s.reagent); return { from: nameOf(path[i].m), reagent: g.label, conditions: g.cond, to: nameOf(s.m), why: res.why?.[0] || "", confidence: res.rule?.confidence || "provisional" }; });
    const key = `${T.id}|${path.map((p) => p.hash).join(",")}`;
    if (routeCache?.key !== key) { const rr = routes(T.start, T.targetHash, { depth: T.best, level: level(), max: 4 }); routeCache = { key, alt: rr.routes.map((rt) => rt.map((e) => `${reagentOf(e.reagent).label} → ${nameOf(rr.graph.nodes.get(e.to).m)}`).join("; ")) }; }
    return { kind: "synthesis", start: nameOf(T.start), target: nameOf(T.target), routeSoFar: steps, reached: path.at(-1).hash === T.targetHash, shortestSteps: T.best, routesTheRulesAllow: routeCache.alt, confidence: steps.some((x) => x.confidence === "disputed") ? "disputed" : "provisional" };
  }

  function paintView() { if (view === "predict") paint(); else if (view === "conditions") paintConditions(); else paintSynthesis(); }
  // restore the learner's last view, starting material and reagent
  if (prefs.rx) { if (REAGENTS.some((g) => g.id === prefs.rx.reagent && atLevel(g, level()))) { reagent = prefs.rx.reagent; rg.value = reagent; } if (prefs.rx.src && (prefs.rx.src === "mine" || STARTERS.some(([n]) => n === prefs.rx.src))) { srcKey = prefs.rx.src; src.value = srcKey; } }
  fillTasks(); load();
  if (prefs.rx?.view && prefs.rx.view !== "predict") showView(prefs.rx.view);
  return { useDrawing() { srcKey = "mine"; src.value = "mine"; route = []; practice = null; guess = null; stopClock(); if (view !== "predict") showView("predict"); else load(); remember(); }, repaint: () => paintView(), refresh: () => { if (view === "predict" && srcKey === "mine") load(); else paintView(); }, stop: () => stopClock() };
}
