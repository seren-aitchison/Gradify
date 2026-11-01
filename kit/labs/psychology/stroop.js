// The Stroop task (Stroop, 1935): name the ink colour of colour words. Incongruent words (RED in blue ink) slow responses
// compared with congruent ones (RED in red). A spatial version (the words LEFT and RIGHT shown on either side) gives the
// same kind of interference without needing colour vision. The learner is the participant; their trials stay on this device.
import { shell, panel, seg, challenges } from "../lab.js";
import { caveat, table, local } from "../social/ui.js";
import { mean, median, sd } from "../social/stats.js";

const INKS = [["red", "#ff5c5c", "r"], ["green", "#3ddc84", "g"], ["blue", "#5aa0ff", "b"], ["yellow", "#ffd84d", "y"]];
const SIDES = [["left", "ArrowLeft"], ["right", "ArrowRight"]];

// trials for one block: equal numbers of congruent, incongruent and neutral items, shuffled
export function makeTrials(kind = "colour", per = 8, r = Math.random) {
  const out = [];
  for (let i = 0; i < per; i++) {
    if (kind === "colour") {
      const ink = INKS[i % 4], other = INKS[(i + 1 + Math.floor(r() * 3)) % 4];
      out.push({ cond: "congruent", word: ink[0].toUpperCase(), ink: ink[0] }, { cond: "incongruent", word: other[0].toUpperCase(), ink: ink[0] }, { cond: "neutral", word: "XXXX", ink: ink[0] });
    } else {
      const side = SIDES[i % 2][0], other = SIDES[(i + 1) % 2][0];
      out.push({ cond: "congruent", word: side.toUpperCase(), side, answer: side }, { cond: "incongruent", word: other.toUpperCase(), side, answer: side }, { cond: "neutral", word: "XXXX", side, answer: side });
    }
  }
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
}
// summary by condition: mean and median RT of correct trials, error rate, and the interference effect
export function summarise(trials) {
  const by = {};
  for (const c of ["congruent", "neutral", "incongruent"]) {
    const t = trials.filter((x) => x.cond === c), ok = t.filter((x) => x.correct).map((x) => x.rt);
    by[c] = { n: t.length, mean: mean(ok), median: median(ok), sd: sd(ok), errors: t.length - ok.length };
  }
  return { by, interference: by.incongruent.mean - by.congruent.mean };
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="sx-panel"><div class="lab-row sx-mode"></div><div class="sx-stage" tabindex="0" aria-live="off"><div><p class="sx-big" aria-hidden="true">Ready</p><p class="sx-inst"></p></div></div><div class="sx-keys"></div><div class="sx-res"></div></div><div class="lab-ctrl"></div>`);
  const stage = $(".sx-stage"), big = $(".sx-big"), inst = $(".sx-inst"), keys = $(".sx-keys"), res = panel($(".sx-res"), "sx-res"), ctrl = $(".lab-ctrl");
  caveat(ctrl, "A classroom demonstration with your own responses. Browser timing is accurate to a few milliseconds, which is plenty for an effect this size, but this is not a research-grade measurement.");
  const ch = challenges(ctrl, ctx, [
    { id: "run", text: "Complete a full block of 24 trials", test: (s) => s.runs >= 1 },
    { id: "int", text: "Find a Stroop interference effect: incongruent slower than congruent", test: (s) => s.interference > 0 },
    { id: "both", text: "Run both the colour and the spatial versions", test: (s) => s.kinds.size >= 2 },
  ]);
  let kind = "colour", trials = [], i = -1, t0 = 0, timer = 0, live = false;
  const st = { runs: 0, interference: -1, kinds: new Set(local.get("stroop-kinds", [])) };
  seg($(".sx-mode"), [["colour", "Colour words"], ["spatial", "Left and right"]], kind, (v) => { kind = v; reset(); });
  const keyHtml = () => kind === "colour" ? INKS.map(([n, c, k]) => `<button type="button" class="sx-key" data-a="${n}" style="border-color:${c}">${n} <small>(${k.toUpperCase()})</small></button>`).join("") : SIDES.map(([n]) => `<button type="button" class="sx-key" data-a="${n}">${n === "left" ? "← left" : "right →"}</button>`).join("");
  function reset() {
    clearTimeout(timer); live = false; i = -1; big.textContent = "Ready"; big.style.color = ""; stage.style.justifyItems = "center";
    inst.innerHTML = kind === "colour" ? "Say nothing: press the key for the <b>ink colour</b>, ignoring what the word says. R red · G green · B blue · Y yellow." : "Press the arrow key for the <b>side of the screen</b> the word appears on, ignoring what it says.";
    keys.innerHTML = `${keyHtml()}<button type="button" class="lab-btn pri" data-start>Start 24 trials</button>`;
  }
  function next() {
    i++; if (i >= trials.length) return finish();
    big.textContent = "+"; big.style.color = ""; stage.style.justifyItems = "center"; live = false;
    timer = setTimeout(() => {
      const t = trials[i]; big.textContent = t.word;
      if (kind === "colour") big.style.color = INKS.find((x) => x[0] === t.ink)[1];
      else stage.style.justifyItems = t.side === "left" ? "start" : "end";
      t0 = performance.now(); live = true;
    }, 450 + Math.random() * 300);
  }
  function answer(a) {
    if (!live) return; live = false; const t = trials[i], rt = performance.now() - t0;
    t.rt = rt; t.correct = a === (t.ink || t.answer); next();
  }
  function finish() {
    const s = summarise(trials); st.runs++; st.interference = s.interference; st.kinds.add(kind); local.set("stroop-kinds", [...st.kinds]);
    const hist = local.get(`stroop-${kind}`, []); hist.push({ at: Date.now(), interference: Math.round(s.interference) }); local.set(`stroop-${kind}`, hist.slice(-20));
    ch.check(st); big.textContent = "Done"; big.style.color = ""; stage.style.justifyItems = "center";
    const f = (v) => (Number.isFinite(v) ? `${Math.round(v)} ms` : "–");
    res(`${table(["Condition", "Mean RT (correct)", "Median", "Errors"], ["congruent", "neutral", "incongruent"].map((c) => [c, f(s.by[c].mean), f(s.by[c].median), `${s.by[c].errors} of ${s.by[c].n}`]))}
      <p><b>Your interference effect: ${f(s.interference)}</b> (incongruent minus congruent). ${s.interference > 0 ? "Reading is so automatic that the word competes with the response you were asked to give." : "No slowing this time: with only eight trials per condition one run is noisy, so try another block."}</p>
      <p class="sx-fb">Runs on this device: ${hist.map((h) => `${h.interference} ms`).join(", ")}. Stroop (1935) found that naming ink colours took far longer with incongruent words than with colour patches; MacLeod (1991) reviewed over 70 years of replications.</p>`);
    keys.innerHTML = `${keyHtml()}<button type="button" class="lab-btn pri" data-start>Run another block</button>`;
  }
  keys.addEventListener("click", (e) => {
    if (e.target.closest("[data-start]")) { trials = makeTrials(kind); res(""); keys.querySelector("[data-start]").remove(); stage.focus(); next(); return; }
    const b = e.target.closest("[data-a]"); if (b) answer(b.dataset.a);
  });
  const onKey = (e) => {
    if (!el.isConnected) return; if (!live) return;
    if (kind === "colour") { const m = INKS.find((x) => x[2] === e.key.toLowerCase()); if (m) { e.preventDefault(); answer(m[0]); } }
    else { const m = SIDES.find((x) => x[1] === e.key); if (m) { e.preventDefault(); answer(m[0]); } }
  };
  document.addEventListener("keydown", onKey);
  reset();
  return () => { clearTimeout(timer); document.removeEventListener("keydown", onKey); };
}
