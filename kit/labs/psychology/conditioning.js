// Classical conditioning with the Rescorla–Wagner model (Rescorla and Wagner, 1972): on every trial the associative
// strength of each conditioned stimulus present changes by ΔV = αβ(λ − ΣV), where ΣV is the summed strength of all
// stimuli present, λ is the most the unconditioned stimulus can support (0 when it is absent), α is the salience of the
// CS and β the learning rate set by the US. The model explains acquisition, extinction and Kamin's (1969) blocking. It
// does not predict spontaneous recovery or latent inhibition, which is one reason it is not the last word (Miller,
// Barnet and Grahame, 1995).
import { shell, canvas, slider, seg, button, panel, challenges, clear, axes, line, text, C } from "../lab.js";
import { caveat } from "../social/ui.js";

// run a schedule of trials: each trial { cs: ["A"] or ["A", "X"], us: true/false }; returns V for each CS after each trial
export function rw(trials, { alpha = { A: 0.3, X: 0.3 }, beta = 0.5, lambda = 1 } = {}) {
  const V = { A: 0, X: 0 }, hist = [];
  for (const t of trials) {
    const sumV = t.cs.reduce((s, c) => s + V[c], 0), err = (t.us ? lambda : 0) - sumV;
    for (const c of t.cs) V[c] += (alpha[c] ?? 0.3) * beta * err;
    hist.push({ ...V });
  }
  return hist;
}
const rep = (n, t) => Array.from({ length: n }, () => t);
export const DESIGNS = {
  acquisition: { name: "Acquisition", phases: [["A → food", rep(20, { cs: ["A"], us: true })]], note: "A tone (A) is paired with food. Strength rises fast at first and then levels off as the food becomes predicted: learning is driven by surprise." },
  extinction: { name: "Extinction", phases: [["A → food", rep(15, { cs: ["A"], us: true })], ["A alone", rep(20, { cs: ["A"], us: false })]], note: "After acquisition the tone is presented without food. The prediction error is now negative and strength falls back towards zero." },
  blocking: { name: "Blocking", phases: [["A → food", rep(15, { cs: ["A"], us: true })], ["A + X → food", rep(15, { cs: ["A", "X"], us: true })]], note: "A is trained first. When the light (X) is then added, A already predicts the food, so there is almost no error left and X learns very little: Kamin's blocking effect." },
  control: { name: "Blocking control", phases: [["A + X → food", rep(15, { cs: ["A", "X"], us: true })]], note: "Without pretraining, A and X share the learning, and X gains substantial strength. Compare X here with X in the blocking design." },
};

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-row sx-mode"></div><div class="lab-stage"></div><div class="lab-out"></div></div><div class="lab-ctrl"></div></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.55, max: 340 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { d: "acquisition", aA: 0.3, aX: 0.3, beta: 0.5, lambda: 1 }, st = { seen: new Set() };
  const ch = challenges(ctrl, ctx, [
    { id: "acq", text: "Run acquisition and see the negatively accelerated learning curve", test: (x) => x.seen.has("acquisition") },
    { id: "ext", text: "Run extinction", test: (x) => x.seen.has("extinction") },
    { id: "block", text: "Compare X in the blocking design with X in its control", test: (x) => x.seen.has("blocking") && x.seen.has("control") },
    { id: "sal", text: "Make the light (X) more salient than the tone and see it learn faster in the control design", test: (x) => x.salient },
  ]);
  seg($(".lab-row.sx-mode"), Object.entries(DESIGNS).map(([k, d]) => [k, d.name]), s.d, (v) => { s.d = v; run(); });
  slider(ctrl, { label: "Salience of tone A (α)", min: 0.05, max: 1, step: 0.05, value: s.aA, fmt: (v) => v.toFixed(2), onInput: (v) => { s.aA = v; run(); } });
  slider(ctrl, { label: "Salience of light X (α)", min: 0.05, max: 1, step: 0.05, value: s.aX, fmt: (v) => v.toFixed(2), onInput: (v) => { s.aX = v; run(); } });
  slider(ctrl, { label: "Learning rate (β)", min: 0.05, max: 1, step: 0.05, value: s.beta, fmt: (v) => v.toFixed(2), onInput: (v) => { s.beta = v; run(); } });
  slider(ctrl, { label: "Size of the US (λ)", min: 0.2, max: 1, step: 0.1, value: s.lambda, fmt: (v) => v.toFixed(1), onInput: (v) => { s.lambda = v; run(); } });
  caveat(ctrl, "A formal model with stated assumptions. Real animals also show spontaneous recovery after extinction, which this model cannot produce: extinction is new learning layered over the old, not erasure (Bouton, 2004).");
  function run() {
    const D = DESIGNS[s.d], trials = D.phases.flatMap((p) => p[1]), h = rw(trials, { alpha: { A: s.aA, X: s.aX }, beta: s.beta, lambda: s.lambda });
    st.seen.add(s.d); if (s.d === "control" && s.aX > s.aA + 0.2) st.salient = true; ch.check(st);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const A = axes(g, { l: 46, t: 14, w: W - 62, h: H - 50 }, { x0: 0, x1: trials.length, y0: -0.1, y1: 1.05, xl: "trial", yl: "associative strength V", xt: 5, yt: 4, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1) });
    let at = 0; for (const [name, ts] of D.phases) { line(g, [[A.X(at), A.Y(-0.1)], [A.X(at), A.Y(1.05)]], "rgba(255,255,255,.18)", 1, [3, 3]); text(g, name, A.X(at) + 4, A.Y(1.0), { size: 11, color: C.mute }); at += ts.length; }
    const usesX = trials.some((t) => t.cs.includes("X"));
    line(g, [[A.X(0), A.Y(0)], ...h.map((v, i) => [A.X(i + 1), A.Y(v.A)])], C.violet, 2.5);
    if (usesX) line(g, [[A.X(0), A.Y(0)], ...h.map((v, i) => [A.X(i + 1), A.Y(v.X)])], C.amber, 2.5);
    text(g, "— tone A", W - 150, 30, { color: C.violet, size: 12 }); if (usesX) text(g, "— light X", W - 80, 30, { color: C.amber, size: 12 });
    const last = h.at(-1);
    out(`<p><b>${D.name}.</b> ${D.note}</p><p>After the last trial: V(A) = ${last.A.toFixed(2)}${usesX ? `, V(X) = ${last.X.toFixed(2)}` : ""}.</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
