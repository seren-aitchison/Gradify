// Population ecology: logistic growth, Lotka–Volterra predator and prey, and Lotka–Volterra competition,
// integrated numerically (RK4), shown over time and as a phase plot. Classic textbook models: they leave
// out age structure, space and chance, which matter in real populations.
import { shell, canvas, slider, seg, axes, line, clear, text, circle, challenges, panel, rk4, C } from "../lab.js";

const MODELS = {
  logistic: { name: "Logistic growth", p: { r: 0.5, K: 500, N0: 10 } },
  pred: { name: "Predator and prey", p: { a: 1.0, b: 0.02, c: 0.6, d: 0.01, H0: 60, P0: 20 } },
  comp: { name: "Competition", p: { r1: 0.8, r2: 0.6, K1: 500, K2: 400, a12: 0.6, a21: 0.7 } },
};
export function run(model, p, T = 60, h = 0.02) {
  let y, f;
  if (model === "logistic") { y = [p.N0]; f = (t, [N]) => [p.r * N * (1 - N / p.K)]; }
  else if (model === "pred") { y = [p.H0, p.P0]; f = (t, [H, P]) => [p.a * H - p.b * H * P, p.d * H * P - p.c * P]; }
  else { y = [50, 50]; f = (t, [A, B]) => [p.r1 * A * (1 - (A + p.a12 * B) / p.K1), p.r2 * B * (1 - (B + p.a21 * A) / p.K2)]; }
  const out = [];
  for (let t = 0, i = 0; t <= T; t += h, i++) { if (i % 10 === 0) out.push([t, ...y]); y = rk4(f, y, t, h).map((v) => Math.max(0, v)); }
  return out;
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.5, max: 320 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.45, max: 280 });
  const ctrl = $(".lab-ctrl"), sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.append(sl);
  const out = panel($(".lab-out"));
  let model = "logistic", touched = false; const P = { logistic: { ...MODELS.logistic.p }, pred: { ...MODELS.pred.p }, comp: { ...MODELS.comp.p } };
  const st = { K: false, cycle: false, crash: false, exclusion: false, coexist: false };
  const ch = challenges(ctrl, ctx, [
    { id: "K", text: "Logistic: change r or K and see the population level off at K", test: (x) => x.K },
    { id: "cycle", text: "Predator–prey: change a rate and see the predator peaks still lag behind the prey peaks", test: (x) => x.cycle },
    { id: "excl", text: "Competition: make one species exclude the other", test: (x) => x.exclusion },
    { id: "co", text: "Competition: find settings where both species coexist", test: (x) => x.coexist },
  ]);
  const DEF = {
    logistic: [["r", "Growth rate r", 0.05, 2, 0.05], ["K", "Carrying capacity K", 50, 1000, 10], ["N0", "Starting N", 1, 200, 1]],
    pred: [["a", "Prey birth rate", 0.2, 2, 0.05], ["b", "Predation rate", 0.005, 0.05, 0.001], ["c", "Predator death rate", 0.1, 1.5, 0.05], ["d", "Conversion efficiency", 0.002, 0.03, 0.001]],
    comp: [["K1", "K species 1", 100, 800, 10], ["K2", "K species 2", 100, 800, 10], ["a12", "Effect of 2 on 1 (α₁₂)", 0, 2, 0.05], ["a21", "Effect of 1 on 2 (α₂₁)", 0, 2, 0.05]],
  };
  function controls() { sl.innerHTML = ""; for (const [k, label, min, max, step] of DEF[model]) slider(sl, { label, min, max, step, value: P[model][k], fmt: (v) => (step < 0.01 ? v.toFixed(3) : step < 1 ? v.toFixed(2) : v), onInput: (v) => { P[model][k] = v; touched = true; draw(); } }); }
  seg($(".top"), Object.entries(MODELS).map(([k, v]) => [k, v.name]), model, (v) => { model = v; controls(); draw(); });
  function draw() {
    const p = P[model], tr = run(model, p, model === "logistic" ? 40 : 80);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const ymax = Math.max(10, ...tr.flatMap((r) => r.slice(1))) * 1.1, T = tr.at(-1)[0];
    const A = axes(g, { l: 52, t: 12, w: W - 66, h: H - 48 }, { x0: 0, x1: T, y0: 0, y1: ymax, xl: "time", yl: "population", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    const cols = [C.green, C.orange];
    for (let j = 1; j < tr[0].length; j++) line(g, tr.map((r) => [A.X(r[0]), A.Y(r[j])]), cols[j - 1], 2.2);
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    let msg = "";
    if (model === "logistic") {
      line(g, [[A.X(0), A.Y(p.K)], [A.X(T), A.Y(p.K)]], "rgba(255,255,255,.3)", 1, [4, 4]); text(g, "K", A.X(T) - 10, A.Y(p.K) - 5, { color: C.mute });
      const B = axes(g2, { l: 52, t: 10, w: W2 - 66, h: H2 - 44 }, { x0: 0, x1: p.K * 1.1, y0: 0, y1: p.r * p.K * 0.3, xl: "population N", yl: "growth dN/dt", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
      line(g2, Array.from({ length: 100 }, (_, i) => { const N = (i / 99) * p.K * 1.1; return [B.X(N), B.Y(Math.max(0, p.r * N * (1 - N / p.K)))]; }), C.green, 2);
      circle(g2, B.X(p.K / 2), B.Y(p.r * p.K / 4), 5, C.white); text(g2, "fastest at K/2", B.X(p.K / 2) + 8, B.Y(p.r * p.K / 4), { size: 11 });
      if (touched && tr.at(-1)[1] > 0.95 * p.K) st.K = true;
      msg = `dN/dt = rN(1 − N/K). Growth is nearly exponential while N is small, slows as resources run short, and stops at the carrying capacity K = ${p.K}.`;
    } else if (model === "pred") {
      const B = axes(g2, { l: 52, t: 10, w: W2 - 66, h: H2 - 44 }, { x0: 0, x1: Math.max(...tr.map((r) => r[1])) * 1.1, y0: 0, y1: Math.max(...tr.map((r) => r[2])) * 1.1, xl: "prey", yl: "predators", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
      line(g2, tr.map((r) => [B.X(r[1]), B.Y(r[2])]), C.violet, 1.8);
      circle(g2, B.X(p.c / p.d), B.Y(p.a / p.b), 4, C.white); text(g2, "equilibrium", B.X(p.c / p.d) + 6, B.Y(p.a / p.b), { size: 11 });
      text(g, "prey", A.X(T * 0.02), 26, { color: C.green, size: 11 }); text(g, "predators", A.X(T * 0.1), 26, { color: C.orange, size: 11 });
      if (touched) st.cycle = true;
      msg = `Prey increase, so predators increase; predators eat more prey, prey decline, then predators decline. Predator peaks follow prey peaks. The closed loops in the phase plot circle the equilibrium (prey ${(p.c / p.d).toFixed(0)}, predators ${(p.a / p.b).toFixed(0)}).`;
    } else {
      const end = tr.at(-1), K1 = p.K1, K2 = p.K2;
      const B = axes(g2, { l: 52, t: 10, w: W2 - 66, h: H2 - 44 }, { x0: 0, x1: Math.max(K1, K2 / Math.max(p.a21, 0.05)) * 1.05, y0: 0, y1: Math.max(K2, K1 / Math.max(p.a12, 0.05)) * 1.05, xl: "species 1", yl: "species 2", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
      line(g2, [[B.X(K1), B.Y(0)], [B.X(0), B.Y(K1 / Math.max(p.a12, 1e-6))]], C.green, 1.6, [5, 3]);
      line(g2, [[B.X(K2 / Math.max(p.a21, 1e-6)), B.Y(0)], [B.X(0), B.Y(K2)]], C.orange, 1.6, [5, 3]);
      line(g2, tr.map((r) => [B.X(r[1]), B.Y(r[2])]), C.violet, 2); circle(g2, B.X(end[1]), B.Y(end[2]), 4, C.white);
      const ex = end[1] < 1 || end[2] < 1;
      if (ex) st.exclusion = true; else st.coexist = true;
      msg = `${ex ? `Competitive exclusion: species ${end[1] < 1 ? 2 : 1} wins.` : "Stable coexistence: each species limits itself more than it limits the other (α₁₂·α₂₁ < 1 with the right K values)."} Dashed lines are the zero-growth isoclines; where they cross, both populations stop changing.`;
    }
    ch.check(st);
    out(`<p class="lab-msg">${msg}</p>`);
  }
  controls(); draw();
}
