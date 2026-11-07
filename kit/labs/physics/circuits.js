// DC circuits: a battery with internal resistance driving resistor networks, solved exactly by nodal analysis
// (Kirchhoff's current law at every junction, Ohm's law in every resistor). Ideal wires; fixed resistances.
import { shell, canvas, slider, seg, axes, line, clear, text, circle, challenges, panel, loop, C } from "../lab.js";

// solve a network: n nodes (0 is ground), resistors [[a, b, R]], one battery (EMF E, internal r) from 0 to node p
export function solve(n, resistors, { E, r, p = 1 }) {
  const G = Array.from({ length: n }, () => new Array(n).fill(0)), I = new Array(n).fill(0);
  const add = (a, b, g) => { G[a][a] += g; G[b][b] += g; G[a][b] -= g; G[b][a] -= g; };
  for (const [a, b, R] of resistors) add(a, b, 1 / R);
  add(0, p, 1 / r); I[p] += E / r;   // the battery as its Norton equivalent
  // ground node 0: solve the rest by Gaussian elimination
  const m = n - 1, A = G.slice(1).map((row, i) => [...row.slice(1), I[i + 1]]);
  for (let c = 0; c < m; c++) {
    let piv = c; for (let i = c + 1; i < m; i++) if (Math.abs(A[i][c]) > Math.abs(A[piv][c])) piv = i;
    [A[c], A[piv]] = [A[piv], A[c]];
    for (let i = 0; i < m; i++) if (i !== c) { const f = A[i][c] / A[c][c]; for (let k = c; k <= m; k++) A[i][k] -= f * A[c][k]; }
  }
  const V = [0, ...A.map((row, i) => row[m] / row[i])];
  return { V, currents: resistors.map(([a, b, R]) => (V[a] - V[b]) / R), battery: (E - V[p]) / r };
}

const TOPO = {
  load: { name: "Internal resistance", keys: ["R1"], nodes: 2, res: (R) => [[1, 0, R.R1]],
    paths: { R1: [[420, 50], [420, 230]] }, wires: [[[80, 50], [420, 50]], [[80, 230], [420, 230]]] },
  series: { name: "Series", keys: ["R1", "R2", "R3"], nodes: 4, res: (R) => [[1, 2, R.R1], [2, 3, R.R2], [3, 0, R.R3]],
    paths: { R1: [[150, 50], [270, 50]], R2: [[300, 50], [420, 50]], R3: [[420, 80], [420, 230]] }, wires: [[[80, 50], [150, 50]], [[270, 50], [300, 50]], [[420, 50], [420, 80]], [[80, 230], [420, 230]]] },
  parallel: { name: "Parallel", keys: ["R1", "R2", "R3"], nodes: 2, res: (R) => [[1, 0, R.R1], [1, 0, R.R2], [1, 0, R.R3]],
    paths: { R1: [[220, 50], [220, 230]], R2: [[320, 50], [320, 230]], R3: [[420, 50], [420, 230]] }, wires: [[[80, 50], [420, 50]], [[80, 230], [420, 230]]] },
  mixed: { name: "Series and parallel", keys: ["R1", "R2", "R3"], nodes: 3, res: (R) => [[1, 2, R.R1], [2, 0, R.R2], [2, 0, R.R3]],
    paths: { R1: [[130, 50], [260, 50]], R2: [[310, 50], [310, 230]], R3: [[420, 50], [420, 230]] }, wires: [[[80, 50], [130, 50]], [[260, 50], [420, 50]], [[80, 230], [420, 230]]] },
  bridge: { name: "Wheatstone bridge", keys: ["R1", "R2", "R3", "R4"], nodes: 4, res: (R) => [[1, 2, R.R1], [1, 3, R.R2], [2, 0, R.R3], [3, 0, R.R4], [2, 3, 50]],
    paths: { R1: [[250, 40], [170, 140]], R2: [[250, 40], [330, 140]], R3: [[170, 140], [250, 240]], R4: [[330, 140], [250, 240]], G: [[170, 140], [330, 140]] }, wires: [[[80, 40], [250, 40]], [[80, 240], [250, 240]]] },
};
const KEY_INDEX = { R1: 0, R2: 1, R3: 2, R4: 3, G: 4 };

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.56, max: 330 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.34, max: 200 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  let topo = TOPO[ctx.mode] ? ctx.mode : "series";
  const R = { R1: 10, R2: 20, R3: 30, R4: 60 }, B = { E: 12, r: 2 };
  const seen = new Map(); let phase = 0, sol, st = { maxp: false, balance: false, compare: false, share: false };
  const ch = challenges(ctrl, ctx, [
    { id: "maxp", text: "Internal resistance: find the load that takes the most power (it matches r)", test: (s) => s.maxp },
    { id: "cmp", text: "Wire the same three resistors in series, then in parallel: which draws more current?", test: (s) => s.compare },
    { id: "share", text: "Series and parallel: make the two parallel branches share the current equally", test: (s) => s.share },
    { id: "bal", text: "Balance the Wheatstone bridge so the meter reads zero (below 1 mA)", test: (s) => s.balance },
  ]);
  seg($(".top"), Object.entries(TOPO).map(([k, v]) => [k, v.name]), topo, (v) => { topo = v; controls(); });
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  function controls() {
    sl.innerHTML = "";
    slider(sl, { label: "Battery EMF", min: 1, max: 24, step: 0.5, value: B.E, unit: "V", fmt: (v) => v.toFixed(1), onInput: (v) => { B.E = v; calc(); } });
    slider(sl, { label: "Internal resistance r", min: 0.1, max: 10, step: 0.1, value: B.r, unit: "Ω", fmt: (v) => v.toFixed(1), onInput: (v) => { B.r = v; calc(); } });
    for (const k of TOPO[topo].keys) slider(sl, { label: topo === "load" ? "Load resistance" : `Resistor ${k}`, min: 1, max: 100, step: 0.5, value: R[k], unit: "Ω", fmt: (v) => v.toFixed(1), onInput: (v) => { R[k] = v; calc(); } });
    calc();
  }
  function calc() {
    const T = TOPO[topo]; sol = solve(T.nodes, T.res(R), { E: B.E, r: B.r });
    const key = `${R.R1}|${R.R2}|${R.R3}`;
    if (topo === "series" || topo === "parallel") { const prev = seen.get(key) || {}; prev[topo] = sol.battery; seen.set(key, prev); if (prev.series && prev.parallel) st.compare = true; }
    if (topo === "load" && Math.abs(R.R1 - B.r) / B.r < 0.05) st.maxp = true;
    if (topo === "mixed" && Math.abs(R.R2 - R.R3) < 0.01) st.share = true;
    if (topo === "bridge" && Math.abs(sol.currents[4]) < 1e-3) st.balance = true;
    ch.check(st); report();
  }
  loop(el, (dt) => { phase += dt; draw(); });
  function zig(g, [x1, y1], [x2, y2], col) {
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, nx = -uy, ny = ux, a = L * 0.25, b = L * 0.75;
    g.strokeStyle = col; g.lineWidth = 2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x1 + ux * a, y1 + uy * a);
    for (let i = 1; i <= 8; i++) { const s = a + ((b - a) * i) / 8, o = i === 8 ? 0 : (i % 2 ? 7 : -7); g.lineTo(x1 + ux * s + nx * o, y1 + uy * s + ny * o); }
    g.lineTo(x2, y2); g.stroke();
  }
  function dots(g, path, I, col) {
    const [[x1, y1], [x2, y2]] = path, L = Math.hypot(x2 - x1, y2 - y1), sp = 22, off = ((phase * I * 60) % sp + sp) % sp;
    for (let s = off; s < L; s += sp) circle(g, x1 + ((x2 - x1) * s) / L, y1 + ((y2 - y1) * s) / L, 2.6, col);
  }
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const T = TOPO[topo], k = Math.min(W / 560, (H - 26) / 270), ox = (W - 500 * k) / 2 + 24 * k, P = ([x, y]) => [ox + x * k, y * k + 24];   // room above for the top labels
    g.save();
    const wire = (pts) => line(g, pts.map(P), "rgba(255,255,255,.55)", 2);
    T.wires.forEach(wire);
    // the battery on the left
    const by = topo === "bridge" ? [40, 240] : [50, 230], mid = (by[0] + by[1]) / 2;
    wire([[80, by[0]], [80, mid - 12]]); wire([[80, mid + 12], [80, by[1]]]);
    const [bx, bym] = P([80, mid]); g.fillStyle = C.white; g.fillRect(bx - 16, bym - 12, 32, 3); g.fillRect(bx - 9, bym + 6, 18, 5);
    text(g, `${B.E} V`, bx - 24, bym + 4, { align: "right", size: 12, weight: 600 }); text(g, `r = ${B.r} Ω`, bx - 24, bym + 20, { align: "right", size: 11, color: C.mute });
    dots(g, [P([80, by[1]]), P([80, by[0]])], sol.battery, C.gold);
    const cols = { R1: C.teal, R2: C.violet, R3: C.orange, R4: C.pink, G: C.white };
    for (const [key, path] of Object.entries(T.paths)) {
      const i = KEY_INDEX[key], I = sol.currents[i], [a, b] = path.map(P);
      if (key === "G") { line(g, [a, b], "rgba(255,255,255,.55)", 2); const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; circle(g, mx, my, 16, "#15171b", C.white); text(g, "G", mx, my + 4, { align: "center", weight: 700 }); text(g, `${(I * 1000).toFixed(1)} mA`, mx, my + 32, { align: "center", size: 11, color: Math.abs(I) < 1e-3 ? C.green : C.red }); dots(g, [a, b], I, C.white); continue; }
      zig(g, a, b, cols[key]); dots(g, [a, b], I, cols[key]);
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, vert = Math.abs(b[0] - a[0]) < 30, inner = vert && mx > W * 0.62, dx = vert ? (inner ? -14 : 14) : 0, dy = vert ? 0 : -24;   // near the right edge, labels go on the inner side
      const Vd = Math.abs(I) * (key === "G" ? 50 : R[key]);
      const al = vert ? (inner ? "right" : "left") : "center";
      text(g, `${key} ${R[key]} Ω`, mx + dx, my + dy - (vert ? 8 : 6), { align: al, size: 11, weight: 600, color: cols[key] });
      text(g, `${Math.abs(I).toFixed(3)} A · ${Vd.toFixed(2)} V`, mx + dx, my + dy + 8, { align: al, size: 10.5, color: C.mute });
    }
    g.restore();
    // power delivered against load resistance (for the battery and its internal resistance)
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    const Pw = (RL) => (B.E / (RL + B.r)) ** 2 * RL, maxP = (B.E * B.E) / (4 * B.r);
    const A = axes(g2, { l: 52, t: 10, w: W2 - 66, h: H2 - 44 }, { x0: 0, x1: 100, y0: 0, y1: maxP * 1.15, xl: "external resistance (Ω)", yl: "power out (W)", xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0), yt: 3 });
    line(g2, Array.from({ length: 200 }, (_, i) => { const RL = 0.2 + (i / 199) * 99.8; return [A.X(RL), A.Y(Pw(RL))]; }), C.gold, 2);
    const Rext = B.E / sol.battery - B.r; circle(g2, A.X(Math.min(100, Rext)), A.Y(Pw(Rext)), 5, C.white);
    line(g2, [[A.X(B.r), A.Y(0)], [A.X(B.r), A.Y(maxP)]], "rgba(255,255,255,.3)", 1, [4, 3]); text(g2, "R = r", A.X(B.r) + 4, A.Y(maxP) + 12, { size: 11, color: C.mute });
  }
  function report() {
    const I = sol.battery, Vt = B.E - I * B.r, Rext = Vt / I, Pout = Vt * I;
    const msg = {
      load: "The battery's own internal resistance takes a share of the EMF, so the terminal voltage V = E − Ir falls as more current is drawn. Power delivered to the load peaks when the load resistance equals r, but then half the energy is wasted inside the battery.",
      series: "In series the same current flows through every resistor, the resistances add (R = R₁ + R₂ + R₃), and the voltages across them add up to the terminal voltage: Kirchhoff's voltage law.",
      parallel: "In parallel every branch has the same voltage across it and the currents add (Kirchhoff's current law), so the combined resistance is less than the smallest branch: 1/R = 1/R₁ + 1/R₂ + 1/R₃.",
      mixed: "R₂ and R₃ in parallel act as one resistor, which is then in series with R₁. The current splits between the branches in inverse proportion to their resistance.",
      bridge: "When R₁/R₃ = R₂/R₄ the two midpoints sit at the same voltage, so no current flows through the meter. With three resistors known, balancing finds the fourth: how strain gauges and precision thermometers are read.",
    }[topo];
    out(`<div class="lab-read"><div><small>Battery current</small><b>${I.toFixed(3)} A</b></div><div><small>Terminal voltage</small><b>${Vt.toFixed(2)} V</b></div><div><small>External resistance</small><b>${Rext.toFixed(2)} Ω</b></div><div><small>Power to the circuit</small><b>${Pout.toFixed(2)} W</b></div><div><small>Efficiency</small><b>${((Vt / B.E) * 100).toFixed(0)}%</b></div></div><p class="lab-msg">${msg}</p>`);
  }
  controls();
}
