// Synaptic transmission at a cholinergic synapse (like the neuromuscular junction): an action potential opens
// voltage-gated Ca²⁺ channels, Ca²⁺ triggers vesicle fusion, acetylcholine (ACh) crosses the cleft, binds
// receptors and opens cation channels, depolarising the postsynaptic membrane (an EPSP); acetylcholinesterase
// (AChE) breaks ACh down. Drugs and toxins act at each step. The EPSP comes from a small kinetic model
// (release, enzymatic breakdown, receptor binding, a leaky membrane): illustrative values, real mechanism.
import { shell, canvas, slider, toggle, button, axes, line, clear, circle, text, rrect, challenges, panel, loop, C } from "../lab.js";

export function simulate({ freq = 50, n = 3, ca = 1, ache = 1, block = 0, botox = false, T = 200, dt = 0.05 } = {}) {
  let A = 0, V = -70; const out = [], spikes = [];
  for (let i = 0; i < n; i++) spikes.push(10 + (i * 1000) / freq);
  let fired = false;
  for (let t = 0; t <= T; t += dt) {
    for (const s of spikes) if (t >= s && t < s + dt) A += botox ? 0 : 1.0 * Math.min(1, ca ** 2); // release rises steeply with Ca²⁺
    A -= dt * A * (0.9 * ache + 0.05); // breakdown by AChE plus diffusion
    const open = (1 - block) * A / (A + 0.25);
    V += dt * (-(V + 70) / 40 + open * 5); // membrane time constant 40 ms
    if (V > -55 && !fired) fired = true;
    out.push({ t, A, open, V });
  }
  return { out, fired, spikes };
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.5, max: 300 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.42, max: 260 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { freq: 50, n: 1, ca: 1, ache: 1, block: 0, botox: false };
  const st = { summation: false, curare: false, ache: false, botox: false };
  const ch = challenges(ctrl, ctx, [
    { id: "sum", text: "Temporal summation: reach threshold with several impulses in quick succession", test: (x) => x.summation },
    { id: "ache", text: "Inhibit AChE and see the EPSP last longer", test: (x) => x.ache },
    { id: "cur", text: "Block the receptors (curare) so even a burst fails", test: (x) => x.curare },
    { id: "bot", text: "Stop transmitter release with botulinum toxin", test: (x) => x.botox },
  ]);
  slider(ctrl, { label: "Impulses", min: 1, max: 8, step: 1, value: s.n, fmt: (v) => v, onInput: (v) => { s.n = v; run(); } });
  slider(ctrl, { label: "Frequency", min: 5, max: 100, step: 5, value: s.freq, unit: "Hz", fmt: (v) => v, onInput: (v) => { s.freq = v; run(); } });
  slider(ctrl, { label: "External Ca²⁺", min: 0.2, max: 2, step: 0.1, value: 1, unit: "× normal", fmt: (v) => v.toFixed(1), onInput: (v) => { s.ca = v; run(); } });
  toggle(ctrl, "AChE inhibitor (e.g. neostigmine)", false, (v) => { s.ache = v ? 0.15 : 1; run(); });
  toggle(ctrl, "Curare (blocks ACh receptors)", false, (v) => { s.block = v ? 0.85 : 0; run(); });
  toggle(ctrl, "Botulinum toxin (blocks vesicle fusion)", false, (v) => { s.botox = v; run(); });
  let R = null, anim = 0;
  button(ctrl, "Send impulses", () => { anim = 0; }, "pri");
  function run() {
    R = simulate(s); anim = 0;
    const base = simulate({ ...s, ache: 1, block: 0, botox: false });
    if (R.fired && s.n >= 2 && !simulate({ ...s, n: 1 }).fired) st.summation = true;
    if (s.ache < 1 && R.out.filter((p) => p.V > -65).length > base.out.filter((p) => p.V > -65).length * 1.3) st.ache = true;
    if (s.block > 0 && s.n >= 4 && !R.fired) st.curare = true;
    if (s.botox) st.botox = true;
    ch.check(st);
    const g2 = cv2.g, W = cv2.W, H = cv2.H; clear(g2, W, H);
    const A = axes(g2, { l: 48, t: 10, w: W - 62, h: H - 44 }, { x0: 0, x1: 200, y0: -75, y1: -40, xl: "time (ms)", yl: "postsynaptic mV", xt: 5, yt: 3, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    line(g2, [[A.X(0), A.Y(-55)], [A.X(200), A.Y(-55)]], "rgba(255,255,255,.3)", 1, [4, 4]); text(g2, "threshold", A.X(198), A.Y(-55) - 4, { align: "right", size: 10, color: C.mute });
    line(g2, R.out.map((p) => [A.X(p.t), A.Y(Math.min(-40, p.V))]), C.green, 2);
    R.spikes.forEach((t) => line(g2, [[A.X(t), A.Y(-75)], [A.X(t), A.Y(-71)]], C.gold, 2));
    out(`<p><b>${R.fired ? "Threshold reached: the postsynaptic cell fires." : "Below threshold: no postsynaptic action potential."}</b> ${s.botox ? "No vesicles fuse, so no ACh is released at all." : s.block ? "Most receptors are occupied by the antagonist, so ACh opens few channels." : s.ache < 1 ? "ACh lingers in the cleft, so each EPSP is larger and longer." : s.n > 1 ? `Impulses ${(1000 / s.freq).toFixed(0)} ms apart: EPSPs add up before each one decays (temporal summation).` : "One impulse gives one small EPSP."}</p>`);
  }
  function draw(dt) {
    anim += dt * 60;
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    // presynaptic terminal, cleft, postsynaptic membrane
    rrect(g, W * 0.12, 16, W * 0.76, H * 0.42, 40, "rgba(116,143,252,.16)", "#748ffc"); text(g, "presynaptic terminal", W * 0.5, 34, { align: "center", size: 11, color: "#bac8ff" });
    rrect(g, W * 0.08, H * 0.66, W * 0.84, H * 0.3, 10, "rgba(16,185,129,.14)", C.green); text(g, "postsynaptic membrane", W * 0.5, H - 10, { align: "center", size: 11, color: C.green });
    const tNow = anim % 220, ach = R ? (R.out[Math.min(R.out.length - 1, Math.floor(tNow / 0.05))] || { A: 0, open: 0 }) : { A: 0, open: 0 };
    for (let i = 0; i < 7; i++) { const x = W * (0.24 + i * 0.085), fuse = R && R.spikes.some((s) => tNow > s && tNow < s + 4) && !s.botox; circle(g, x, H * 0.36 + (fuse ? 12 : 0), 9, "rgba(250,176,5,.25)", C.gold); }
    const nA = Math.round(Math.min(40, ach.A * 30));
    for (let i = 0; i < nA; i++) { const x = W * 0.2 + ((i * 97) % 100) / 100 * W * 0.6, y = H * 0.5 + ((i * 53) % 100) / 100 * H * 0.14; circle(g, x, y, 2.5, C.gold); }
    for (let i = 0; i < 9; i++) { const x = W * (0.16 + i * 0.085), o = ach.open > 0.3 + (i % 3) * 0.15; rrect(g, x - 6, H * 0.64, 12, 14, 3, o ? C.green : "rgba(255,255,255,.2)"); }
    text(g, `ACh in cleft ${ach.A.toFixed(2)} · receptors open ${(ach.open * 100).toFixed(0)}%`, 10, H * 0.6, { size: 11, color: C.mute });
    if (R && R.spikes.some((s) => tNow > s - 3 && tNow < s + 2)) text(g, "Ca²⁺ in", W * 0.82, H * 0.3, { size: 12, color: C.teal, weight: 700 });
  }
  run();
  const stop = loop(el, (dt) => draw(dt));
  return stop;
}
