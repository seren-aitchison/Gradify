// Radioactive decay as chance: every nucleus has the same probability of decaying in each instant, so the number
// left falls exponentially with a fixed half-life. Includes a two-step chain, parent → daughter → stable.
// Each nucleus decays independently (a Monte Carlo simulation); the smooth curves are the exact equations.
import { shell, canvas, slider, seg, axes, line, clear, text, challenges, panel, loop, C } from "../lab.js";

export const remaining = (N0, t, half) => N0 * 2 ** (-t / half);
export const lambdaOf = (half) => Math.LN2 / half;
// Bateman: daughter atoms at time t from N0 parents (half-lives h1, h2), no daughter at the start
export function daughter(N0, t, h1, h2) {
  const l1 = lambdaOf(h1), l2 = lambdaOf(h2);
  if (Math.abs(l1 - l2) < 1e-12) return N0 * l1 * t * Math.exp(-l1 * t);
  return ((N0 * l1) / (l2 - l1)) * (Math.exp(-l1 * t) - Math.exp(-l2 * t));
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.4, max: 240 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.48, max: 280 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let mode = ctx.mode === "chain" ? "chain" : "single";
  const P = { N: 400, h1: 10, h2: 4, speed: 4 };
  let nuc, t, hist, running = true, st = { half: false, random: false, chain: false, few: false }, marks = [];
  const ch = challenges(ctrl, ctx, [
    { id: "half", text: "Mark the moment half the nuclei are left and compare it with the half-life", test: (s) => s.half },
    { id: "few", text: "Run it with only 20 nuclei: the decay gets lumpy and unpredictable", test: (s) => s.few },
    { id: "random", text: "Run the same settings twice: the curves differ, but the half-life doesn't", test: (s) => s.random },
    { id: "chain", text: "Decay chain: watch the daughter build up, peak and then decay away", test: (s) => s.chain },
  ]);
  seg($(".top"), [["single", "One isotope"], ["chain", "Decay chain"]], mode, (v) => { mode = v; controls(); });
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  let runs = 0, key = "";
  function controls() {
    sl.innerHTML = "";
    slider(sl, { label: "Nuclei", min: 20, max: 1600, step: 20, value: P.N, fmt: (v) => v.toFixed(0), onInput: (v) => { P.N = v; reset(); } });
    slider(sl, { label: mode === "chain" ? "Parent half-life" : "Half-life", min: 2, max: 30, step: 1, value: P.h1, unit: "s", fmt: (v) => v.toFixed(0), onInput: (v) => { P.h1 = v; reset(); } });
    if (mode === "chain") slider(sl, { label: "Daughter half-life", min: 1, max: 30, step: 1, value: P.h2, unit: "s", fmt: (v) => v.toFixed(0), onInput: (v) => { P.h2 = v; reset(); } });
    const row = document.createElement("div"); row.className = "lab-row"; sl.append(row);
    const btn = (l, f) => { const b = document.createElement("button"); b.type = "button"; b.className = "lab-btn"; b.textContent = l; b.addEventListener("click", f); row.append(b); };
    btn("Run again", reset); btn("Mark this moment", () => { marks.push(t); const left = nuc.filter((x) => x === 0).length / P.N; if (mode === "single" && Math.abs(left - 0.5) < 0.04) st.half = true; ch.check(st); report(); });
    reset();
  }
  function reset() {
    nuc = new Uint8Array(P.N);   // 0 parent, 1 daughter, 2 stable
    t = 0; hist = [[0, P.N, 0]]; marks = [];
    const k = `${mode}|${P.N}|${P.h1}|${P.h2}`; runs = k === key ? runs + 1 : 1; key = k;
    if (mode === "single" && runs >= 2) st.random = true;
    if (P.N <= 20) st.few = true;
    ch.check(st); report();
  }
  loop(el, (dt) => {
    const step = dt * P.speed, p1 = 1 - Math.exp(-lambdaOf(P.h1) * step), p2 = 1 - Math.exp(-lambdaOf(P.h2) * step);
    if (t < 6 * Math.max(P.h1, mode === "chain" ? P.h2 + P.h1 : 0)) {
      for (let i = 0; i < nuc.length; i++) { if (nuc[i] === 0 && Math.random() < p1) nuc[i] = 1; else if (mode === "chain" && nuc[i] === 1 && Math.random() < p2) nuc[i] = 2; }
      t += step;
      let a = 0, b = 0; for (const x of nuc) { if (x === 0) a++; else if (x === 1) b++; }
      hist.push([t, a, b]);
      if (mode === "chain" && t > P.h1 * 4 && b < Math.max(...hist.map((r) => r[2])) * 0.6) st.chain = true;
      ch.check(st);
      if (Math.floor(t) !== Math.floor(t - step)) report();
    }
    draw();
  });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const n = nuc.length, cols = Math.ceil(Math.sqrt((n * W) / H)), rows = Math.ceil(n / cols), s = Math.min(W / cols, H / rows);
    for (let i = 0; i < n; i++) { const x = (i % cols) * s, y = Math.floor(i / cols) * s; g.fillStyle = nuc[i] === 0 ? C.gold : nuc[i] === 1 && mode === "chain" ? C.violet : "rgba(255,255,255,.12)"; g.beginPath(); g.arc(x + s / 2, y + s / 2, Math.max(1, s * 0.36), 0, 2 * Math.PI); g.fill(); }
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const T = 6 * Math.max(P.h1, mode === "chain" ? P.h1 + P.h2 : 0) * (mode === "chain" ? 0.8 : 1);
    const A = axes(g2, { l: 52, t: 12, w: W2 - 66, h: H2 - 46 }, { x0: 0, x1: T, y0: 0, y1: P.N * 1.05, xl: "time (s)", yl: "nuclei", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    for (let k = 1; k * P.h1 < T; k++) { line(g2, [[A.X(k * P.h1), A.Y(0)], [A.X(k * P.h1), A.Y(P.N)]], "rgba(255,255,255,.1)", 1, [3, 3]); if (k <= 4) text(g2, `${k}×`, A.X(k * P.h1) + 3, 24, { size: 10, color: C.mute }); }
    line(g2, Array.from({ length: 150 }, (_, i) => { const tt = (i / 149) * T; return [A.X(tt), A.Y(remaining(P.N, tt, P.h1))]; }), "rgba(251,191,36,.45)", 1.4, [5, 3]);
    line(g2, hist.map(([tt, a]) => [A.X(tt), A.Y(a)]), C.gold, 2.2);
    if (mode === "chain") { line(g2, Array.from({ length: 150 }, (_, i) => { const tt = (i / 149) * T; return [A.X(tt), A.Y(daughter(P.N, tt, P.h1, P.h2))]; }), "rgba(167,139,250,.45)", 1.4, [5, 3]); line(g2, hist.map(([tt, , b]) => [A.X(tt), A.Y(b)]), C.violet, 2.2); }
    for (const m of marks) line(g2, [[A.X(m), A.Y(0)], [A.X(m), A.Y(P.N)]], C.teal, 1.5);
    text(g2, mode === "chain" ? "gold: parent   violet: daughter   dashed: the exact equations" : "solid: this run   dashed: N₀ × 2^(−t/half-life)", W2 - 12, H2 - 6, { align: "right", size: 10.5, color: C.mute });
  }
  function report() {
    const left = nuc.filter((x) => x === 0).length;
    out(`<div class="lab-read"><div><small>Time</small><b>${t.toFixed(1)} s</b></div><div><small>${mode === "chain" ? "Parents" : "Nuclei"} left</small><b>${left} (${((left / P.N) * 100).toFixed(0)}%)</b></div><div><small>Decay constant λ = ln2 / half-life</small><b>${lambdaOf(P.h1).toFixed(3)} s⁻¹</b></div><div><small>Expected left now</small><b>${remaining(P.N, t, P.h1).toFixed(0)}</b></div>${marks.length ? `<div><small>Your mark</small><b>${marks.at(-1).toFixed(1)} s</b></div>` : ""}</div>
      <p class="lab-msg">${mode === "chain" ? "The daughter is made as the parent decays and is itself decaying, so it builds up, peaks when it is being destroyed as fast as it is made, and then falls away. If the daughter is much shorter-lived than the parent, the two settle into the same activity (secular equilibrium)." : "No-one can say when a particular nucleus will decay, only the chance per second, λ. With many nuclei the chance becomes a law: N = N₀e^(−λt), halving every ln2/λ seconds whatever the starting number. With few nuclei the randomness shows, and each run is different."} The clock runs ${P.speed}× faster than real time.</p>`);
  }
  controls();
}
