// An electron in one dimension. Bound states: the time-independent Schrödinger equation is solved numerically
// (finite differences, eigenvalues by Sturm bisection) for an infinite well, a finite well, a harmonic potential
// and a double well. Tunnelling: the equation is integrated through a barrier to find the transmission
// probability at each energy. Non-relativistic, one electron, ħ²/2m = 0.0381 eV nm².
import { shell, canvas, slider, seg, axes, line, clear, text, challenges, panel, C } from "../lab.js";

export const HB = 0.0380998;   // ħ²/2mₑ in eV nm²
export const boxLevel = (n, L) => (n * n * Math.PI * Math.PI * HB) / (L * L);

// the lowest `count` eigenvalues and eigenvectors of −HB d²/dx² + V on a grid with hard walls at the ends
export function boundStates(V, dx, count) {
  const n = V.length, off = -HB / (dx * dx), diag = V.map((v) => -2 * off + v);
  const sturm = (x) => { let c = 0, q = diag[0] - x; if (q < 0) c++; for (let i = 1; i < n; i++) { q = diag[i] - x - (off * off) / (q || 1e-300); if (q < 0) c++; } return c; };
  let lo = Math.min(...diag) + 2 * off * 2, hi = Math.max(...diag) - 2 * off * 2;
  const vals = [];
  for (let k = 0; k < count; k++) { let a = lo, b = hi; for (let i = 0; i < 80; i++) { const m = (a + b) / 2; if (sturm(m) > k) b = m; else a = m; } vals.push((a + b) / 2); }
  const vecs = vals.map((E) => {
    let y = new Array(n).fill(1), s = E + 1e-9;
    for (let it = 0; it < 4; it++) {   // inverse iteration, solving the tridiagonal system with the Thomas algorithm
      const cp = new Array(n), dp = new Array(n); let b0 = diag[0] - s; cp[0] = off / b0; dp[0] = y[0] / b0;
      for (let i = 1; i < n; i++) { const m = diag[i] - s - off * cp[i - 1]; cp[i] = off / m; dp[i] = (y[i] - off * dp[i - 1]) / m; }
      const x = new Array(n); x[n - 1] = dp[n - 1]; for (let i = n - 2; i >= 0; i--) x[i] = dp[i] - cp[i] * x[i + 1];
      const norm = Math.sqrt(x.reduce((a, v) => a + v * v, 0) * dx); y = x.map((v) => v / norm);
    }
    const peak = y.reduce((a, v) => (Math.abs(v) > Math.abs(a) ? v : a), 0); return peak < 0 ? y.map((v) => -v) : y;
  });
  return { E: vals, psi: vecs };
}
// transmission through a potential V(x) defined on [0, L] (zero outside) for an electron of energy E (eV)
export function transmission(Vf, L, E, steps = 1200) {
  const k = Math.sqrt(E / HB), h = -L / steps;
  // start beyond the barrier with a pure transmitted wave e^{ikx} and integrate back to x = 0
  let x = L, y = [Math.cos(k * L), Math.sin(k * L), -k * Math.sin(k * L), k * Math.cos(k * L)];   // Re ψ, Im ψ, Re ψ', Im ψ'
  const f = (xx, [a, b, c2, d]) => { const q = (Vf(xx) - E) / HB; return [c2, d, q * a, q * b]; };
  const path = [[x, y[0], y[1]]];
  for (let i = 0; i < steps; i++) {
    const k1 = f(x, y), k2 = f(x + h / 2, y.map((v, j) => v + (h / 2) * k1[j])), k3 = f(x + h / 2, y.map((v, j) => v + (h / 2) * k2[j])), k4 = f(x + h, y.map((v, j) => v + h * k3[j]));
    y = y.map((v, j) => v + (h / 6) * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j])); x += h;
    if (i % 6 === 0) path.push([x, y[0], y[1]]);
  }
  // at x = 0: ψ = A + B and ψ' = ik(A − B), so A = (ψ + ψ'/ik)/2
  const Ar = (y[0] + y[3] / k) / 2, Ai = (y[1] - y[2] / k) / 2, A2 = Ar * Ar + Ai * Ai;
  // the reflected amplitude relative to the incident one: B/A, with B = ψ(0) − A
  const Br = y[0] - Ar, Bi = y[1] - Ai, R = { re: (Br * Ar + Bi * Ai) / A2, im: (Bi * Ar - Br * Ai) / A2 };
  return { T: 1 / A2, R, k, path: path.map(([xx, a, b]) => [xx, a / Math.sqrt(A2), b / Math.sqrt(A2)]) };
}
export function barrierT(V0, a, E) {   // the textbook formula for a rectangular barrier
  if (E < V0) { const kap = Math.sqrt((V0 - E) / HB); return 1 / (1 + (V0 * V0 * Math.sinh(kap * a) ** 2) / (4 * E * (V0 - E))); }
  const kk = Math.sqrt((E - V0) / HB); return 1 / (1 + (V0 * V0 * Math.sin(kk * a) ** 2) / (4 * E * (E - V0)));
}

const COLS = [C.teal, C.violet, C.orange, C.pink, C.blue, C.gold];

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.7, max: 440 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let mode = ["finite", "harmonic", "double", "tunnel"].includes(ctx.mode) ? ctx.mode : "box";
  const P = { L: 1, depth: 2, hw: 0.4, bump: 1.5, V0: 1, a: 0.5, E: 0.5, two: false, prob: false };
  const st = { box: false, finite: false, ladder: false, tunnel: false, resonant: false };
  const ch = challenges(ctrl, ctx, [
    { id: "box", text: "Infinite well: halve the width and see every energy level go up four times", test: (s) => s.box },
    { id: "fin", text: "Finite well: make it so shallow that only one bound state is left", test: (s) => s.finite },
    { id: "lad", text: "Harmonic potential: see the levels evenly spaced by ħω, starting at ½ħω", test: (s) => s.ladder },
    { id: "tun", text: "Tunnelling: get more than 10% of electrons through a barrier higher than their energy", test: (s) => s.tunnel },
  ]);
  seg($(".top"), [["box", "Infinite well"], ["finite", "Finite well"], ["harmonic", "Harmonic"], ["double", "Double well"], ["tunnel", "Tunnelling"]], mode, (v) => { mode = v; controls(); });
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  let L0 = P.L;
  function controls() {
    sl.innerHTML = "";
    const S = (o) => slider(sl, { ...o, onInput: (v) => { P[o.key] = v; draw(); } });
    if (mode === "box" || mode === "finite") S({ key: "L", label: "Well width", min: 0.3, max: 2, step: 0.05, value: P.L, unit: "nm", fmt: (v) => v.toFixed(2) });
    if (mode === "finite") S({ key: "depth", label: "Well depth", min: 0.05, max: 3, step: 0.05, value: P.depth, unit: "eV", fmt: (v) => v.toFixed(2) });
    if (mode === "harmonic") S({ key: "hw", label: "ħω", min: 0.1, max: 0.8, step: 0.01, value: P.hw, unit: "eV", fmt: (v) => v.toFixed(2) });
    if (mode === "double") S({ key: "bump", label: "Barrier between the wells", min: 0, max: 3, step: 0.05, value: P.bump, unit: "eV", fmt: (v) => v.toFixed(2) });
    if (mode === "tunnel") {
      S({ key: "V0", label: "Barrier height", min: 0.1, max: 3, step: 0.05, value: P.V0, unit: "eV", fmt: (v) => v.toFixed(2) });
      S({ key: "a", label: "Barrier width", min: 0.05, max: 1.5, step: 0.01, value: P.a, unit: "nm", fmt: (v) => v.toFixed(2) });
      S({ key: "E", label: "Electron energy", min: 0.02, max: 3, step: 0.01, value: P.E, unit: "eV", fmt: (v) => v.toFixed(2) });
      const t = document.createElement("label"); t.className = "lab-tog"; t.innerHTML = `<input type="checkbox" ${P.two ? "checked" : ""}><span>Two barriers (resonant tunnelling)</span>`; sl.append(t);
      t.querySelector("input").addEventListener("change", (e) => { P.two = e.target.checked; draw(); });
    } else {
      const t = document.createElement("label"); t.className = "lab-tog"; t.innerHTML = `<input type="checkbox" ${P.prob ? "checked" : ""}><span>Show probability |ψ|² instead of ψ</span>`; sl.append(t);
      t.querySelector("input").addEventListener("change", (e) => { P.prob = e.target.checked; draw(); });
    }
    L0 = P.L; draw();
  }
  function potential() {
    // the infinite well is solved on a grid that ends exactly at its walls (ψ = 0 there), so the levels are exact
    if (mode === "box") { const n = 400, dx = P.L / (n + 1), xs = Array.from({ length: n }, (_, i) => -P.L / 2 + (i + 1) * dx); return { xs, V: xs.map(() => 0), dx }; }
    const X = 1.6, n = 500, dx = (2 * X) / (n - 1), xs = Array.from({ length: n }, (_, i) => -X + i * dx);
    const V = xs.map((x) => mode === "box" ? (Math.abs(x) < P.L / 2 ? 0 : 5000) : mode === "finite" ? (Math.abs(x) < P.L / 2 ? 0 : P.depth) : mode === "harmonic" ? Math.min(60, (P.hw * P.hw / (4 * HB)) * x * x) : Math.min(60, (Math.abs(x) > 1.2 ? 60 : 0) + (Math.abs(x) < 0.1 ? P.bump : 0)));
    return { xs, V, dx };
  }
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    if (mode === "tunnel") return drawTunnel(g, W, H);
    const { xs, V, dx } = potential(), count = mode === "box" ? 5 : 6, { E, psi } = boundStates(V, dx, count);
    const top = mode === "finite" ? P.depth * 1.25 : mode === "box" ? Math.min(60, E[Math.min(3, E.length - 1)] * 1.3) : mode === "harmonic" ? 4.6 * P.hw : Math.max(P.bump * 1.3, E[3] * 1.2);
    const A = axes(g, { l: 52, t: 10, w: W - 66, h: H - 44 }, { x0: -1.6, x1: 1.6, y0: 0, y1: top, xl: "position (nm)", yl: "energy (eV)", xf: (v) => v.toFixed(1), yf: (v) => v.toFixed(top < 1 ? 2 : 1) });
    if (mode === "box") line(g, [[A.X(-1.6), A.Y(top)], [A.X(-P.L / 2), A.Y(top)], [A.X(-P.L / 2), A.Y(0)], [A.X(P.L / 2), A.Y(0)], [A.X(P.L / 2), A.Y(top)], [A.X(1.6), A.Y(top)]], "rgba(255,255,255,.7)", 2);
    else line(g, xs.map((x, i) => [A.X(x), A.Y(Math.min(top, V[i]))]), "rgba(255,255,255,.7)", 2);
    const bound = E.filter((e) => e < (mode === "finite" ? P.depth : top));
    bound.forEach((e, k) => {
      if (e > top) return;
      line(g, [[A.X(-1.6), A.Y(e)], [A.X(1.6), A.Y(e)]], "rgba(255,255,255,.12)", 1, [3, 3]);
      const amp = (top / 9) / Math.max(...psi[k].map(Math.abs));
      line(g, xs.map((x, i) => [A.X(x), A.Y(e + (P.prob ? psi[k][i] ** 2 * amp * Math.max(...psi[k].map(Math.abs)) * 0.9 : psi[k][i] * amp))]), COLS[k % COLS.length], 2);
      text(g, `n = ${k + 1}: ${e.toFixed(3)} eV`, W - 14, A.Y(e) - 4, { align: "right", size: 11, color: COLS[k % COLS.length] });
    });
    // challenges against the exact results
    if (mode === "box" && Math.abs(P.L - L0 / 2) < 0.03 && L0 !== P.L) st.box = true;
    if (mode === "finite" && bound.length === 1) st.finite = true;
    if (mode === "harmonic" && P.hw !== 0.4) st.ladder = true;
    ch.check(st);
    const msg = {
      box: `Only standing waves that fit the box are allowed, so the energy comes in levels E<sub>n</sub> = n²π²ħ²/2mL² (here ${boxLevel(1, P.L).toFixed(3)} eV × n²). Squeeze the box and every level rises; the lowest energy is never zero.`,
      finite: `With finite walls the wavefunction leaks into the walls, where a classical particle couldn't be, so levels sit a little lower than in an infinite well. There are only ${bound.length} bound state${bound.length === 1 ? "" : "s"}; a shallow enough well always keeps at least one.`,
      harmonic: `A parabolic potential gives equally spaced levels, E<sub>n</sub> = (n − ½)ħω here (the first is ½ħω = ${(P.hw / 2).toFixed(3)} eV), the model for vibrating molecules and much of quantum field theory.`,
      double: "Two wells joined by a barrier: each level splits into a symmetric and an antisymmetric pair, closer together the higher the barrier. An electron put in one well tunnels back and forth at a rate set by that splitting, the basis of the ammonia maser.",
    }[mode];
    out(`<div class="lab-read">${bound.slice(0, 4).map((e, k) => `<div><small>E<sub>${k + 1}</sub></small><b>${e.toFixed(3)} eV</b></div>`).join("")}${mode === "box" ? `<div><small>Exact n²π²ħ²/2mL² (n = 1)</small><b>${boxLevel(1, P.L).toFixed(3)} eV</b></div>` : ""}</div><p class="lab-msg">${msg}</p>`);
  }
  function drawTunnel(g, W, H) {
    const two = P.two, Lb = two ? 2 * P.a + 0.6 : P.a, Vf = (x) => (two ? ((x >= 0 && x <= P.a) || (x >= P.a + 0.6 && x <= Lb) ? P.V0 : 0) : x >= 0 && x <= P.a ? P.V0 : 0);
    const res = transmission(Vf, Lb, P.E), top = 1.4 * Math.max(P.V0, P.E);
    const half = H * 0.55, A = axes(g, { l: 52, t: 10, w: W - 66, h: half - 40 }, { x0: -1.5, x1: Lb + 1.5, y0: 0, y1: top, xl: "position (nm)", yl: "energy (eV)", xf: (v) => v.toFixed(1), yf: (v) => v.toFixed(1), yt: 3 });
    line(g, Array.from({ length: 400 }, (_, i) => { const x = -1.5 + (i / 399) * (Lb + 3); return [A.X(x), A.Y(Vf(x))]; }), "rgba(255,255,255,.7)", 2);
    line(g, [[A.X(-1.5), A.Y(P.E)], [A.X(Lb + 1.5), A.Y(P.E)]], C.gold, 1, [4, 3]);
    // |ψ|² across the barrier, on the energy line; incoming and reflected waves on the left, transmitted on the right
    const k = Math.sqrt(P.E / HB), T = res.T, sc = top / 10;
    // left of the barrier ψ = e^{ikx} + (B/A)e^{−ikx}, so |ψ|² = 1 + |B/A|² + 2 Re[(B/A)e^{−2ikx}]: the standing ripple of reflection
    const left = Array.from({ length: 200 }, (_, i) => { const x = -1.5 + (i / 199) * 1.5, R = res.R; return [A.X(x), A.Y(P.E + (1 + R.re * R.re + R.im * R.im + 2 * (R.re * Math.cos(2 * k * x) + R.im * Math.sin(2 * k * x))) * sc)]; });
    line(g, left, C.teal, 1.8);
    line(g, res.path.map(([x, a, b]) => [A.X(x), A.Y(P.E + (a * a + b * b) * sc)]), C.teal, 1.8);
    line(g, [[A.X(Lb), A.Y(P.E + T * sc)], [A.X(Lb + 1.5), A.Y(P.E + T * sc)]], C.teal, 1.8);
    text(g, "|ψ|² drawn on the energy line", W - 14, 24, { align: "right", size: 11, color: C.teal });
    // transmission against energy
    const B = axes(g, { l: 52, t: half + 8, w: W - 66, h: H - half - 42 }, { x0: 0, x1: 3, y0: 0, y1: 1, xl: "electron energy (eV)", yl: "transmission", xf: (v) => v.toFixed(1), yf: (v) => v.toFixed(1), yt: 2 });
    const curve = Array.from({ length: 160 }, (_, i) => { const E = 0.02 + (i / 159) * 2.98; return [B.X(E), B.Y(transmission(Vf, Lb, E, 400).T)]; });
    line(g, curve, C.violet, 2); line(g, [[B.X(P.V0), B.Y(0)], [B.X(P.V0), B.Y(1)]], "rgba(255,255,255,.3)", 1, [4, 3]); text(g, "barrier height", B.X(P.V0) + 4, B.Y(0.9), { size: 10.5, color: C.mute });
    const yy = B.Y(T); g.fillStyle = C.white; g.beginPath(); g.arc(B.X(P.E), yy, 4.5, 0, 2 * Math.PI); g.fill();
    if (P.E < P.V0 && T > 0.1) st.tunnel = true;
    ch.check(st);
    out(`<div class="lab-read"><div><small>Transmission</small><b>${(T * 100).toFixed(T < 0.01 ? 3 : 1)}%</b></div><div><small>Reflection</small><b>${((1 - T) * 100).toFixed(1)}%</b></div>${!two ? `<div><small>Textbook formula</small><b>${(barrierT(P.V0, P.a, P.E) * 100).toFixed(T < 0.01 ? 3 : 1)}%</b></div>` : ""}<div><small>Wavelength h/p</small><b>${(2 * Math.PI / k).toFixed(2)} nm</b></div></div>
      <p class="lab-msg">${P.E < P.V0 ? "Classically the electron can't enter a barrier higher than its energy, but its wavefunction decays exponentially inside rather than stopping, so some of it emerges on the far side. The transmission falls off steeply with barrier width and height: the basis of scanning tunnelling microscopes, flash memory and alpha decay." : "Above the barrier the electron gets through classically, yet quantum mechanically some is still reflected, except at energies where a whole number of half-wavelengths fit in the barrier and transmission is perfect."}${two ? " With two barriers, transmission spikes to nearly 100% at the energies of the states trapped between them: resonant tunnelling." : ""}</p>`);
  }
  controls();
}
