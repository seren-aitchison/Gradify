// Neuronal action potential: the Hodgkin–Huxley model of the squid giant axon (1952), integrated in the
// browser. This is a genuine simulation of a membrane patch: the voltage-gated Na⁺ and K⁺ conductances
// follow the published rate equations (modern sign convention, rest about −65 mV, 6.3 °C).
// Simplified: one patch of membrane (no propagation along an axon) and no myelin.
import { shell, canvas, slider, toggle, button, axes, line, clear, text, challenges, panel, C } from "../lab.js";

const P = { gNa: 120, gK: 36, gL: 0.3, ENa: 50, EK: -77, EL: -54.387, Cm: 1 };
const ex = (x, y) => (Math.abs(x) < 1e-7 ? y : x / (1 - Math.exp(-x / y))); // x/(1−e^(−x/y)), with its limit at x = 0
export const rates = (V) => ({
  am: 0.1 * ex(V + 40, 10), bm: 4 * Math.exp(-(V + 65) / 18),
  ah: 0.07 * Math.exp(-(V + 65) / 20), bh: 1 / (1 + Math.exp(-(V + 35) / 10)),
  an: 0.01 * ex(V + 55, 10), bn: 0.125 * Math.exp(-(V + 65) / 80),
});
// simulate T ms with stimuli [{ t, dur, amp }] (µA/cm²); returns samples every `every` ms
export function simulate({ T = 50, dt = 0.01, stim = [], hold = 0, naBlock = 0, kBlock = 0, every = 0.05 } = {}) {
  let V = -65; const r0 = rates(V);
  let m = r0.am / (r0.am + r0.bm), h = r0.ah / (r0.ah + r0.bh), n = r0.an / (r0.an + r0.bn);
  const out = [], gNa = P.gNa * (1 - naBlock), gK = P.gK * (1 - kBlock);
  let next = 0;
  for (let t = 0; t <= T + 1e-9; t += dt) {
    const I = hold + stim.reduce((a, s) => a + (t >= s.t && t < s.t + s.dur ? s.amp : 0), 0);
    const r = rates(V);
    const INa = gNa * m ** 3 * h * (V - P.ENa), IK = gK * n ** 4 * (V - P.EK), IL = P.gL * (V - P.EL);
    if (t >= next - 1e-9) { out.push({ t, V, m, h, n, gNa: gNa * m ** 3 * h, gK: gK * n ** 4, I }); next += every; }
    // exponential Euler for the gates (stable), forward Euler for V with a small step
    const step = (x, a, b) => { const tau = 1 / (a + b), inf = a * tau; return inf + (x - inf) * Math.exp(-dt / tau); };
    m = step(m, r.am, r.bm); h = step(h, r.ah, r.bh); n = step(n, r.an, r.bn);
    V += (dt * (I - INa - IK - IL)) / P.Cm;
  }
  return out;
}
export const spikes = (trace) => { let k = 0, up = false; for (const s of trace) { if (!up && s.V > 0) { k++; up = true; } else if (up && s.V < -30) up = false; } return k; };

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.5, max: 340 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.32, max: 220 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { amp: 10, dur: 1, gap: 12, second: false, hold: 0, ttx: false, tea: false, show: "g" };
  const st = { threshold: false, refractory: false, ttx: false, train: false, subthreshold: false };
  const ch = challenges(ctrl, ctx, [
    { id: "sub", text: "Give a stimulus that is too small to fire an action potential", test: (x) => x.subthreshold },
    { id: "thr", text: "Find the threshold: fire with a 1 ms pulse of 7.5 µA/cm² or less", test: (x) => x.threshold },
    { id: "ref", text: "Show the refractory period: a second identical pulse fails to fire", test: (x) => x.refractory },
    { id: "ttx", text: "Block the action potential with tetrodotoxin", test: (x) => x.ttx },
    { id: "train", text: "Make the neurone fire repeatedly with a sustained current", test: (x) => x.train },
  ]);
  slider(ctrl, { label: "Stimulus", min: 0, max: 40, step: 0.5, value: s.amp, unit: "µA/cm²", fmt: (v) => v.toFixed(1), onInput: (v) => { s.amp = v; run(); } });
  slider(ctrl, { label: "Duration", min: 0.2, max: 5, step: 0.1, value: s.dur, unit: "ms", fmt: (v) => v.toFixed(1), onInput: (v) => { s.dur = v; run(); } });
  toggle(ctrl, "Second pulse", s.second, (v) => { s.second = v; run(); });
  slider(ctrl, { label: "Gap", min: 2, max: 30, step: 0.5, value: s.gap, unit: "ms", fmt: (v) => v.toFixed(1), onInput: (v) => { s.gap = v; run(); } });
  slider(ctrl, { label: "Sustained", min: 0, max: 20, step: 0.5, value: 0, unit: "µA/cm²", fmt: (v) => v.toFixed(1), onInput: (v) => { s.hold = v; run(); } });
  toggle(ctrl, "Tetrodotoxin (blocks Na⁺ channels)", false, (v) => { s.ttx = v; run(); });
  toggle(ctrl, "TEA (blocks K⁺ channels)", false, (v) => { s.tea = v; run(); });
  const bshow = button(ctrl, "Show gates m, h, n", () => { s.show = s.show === "g" ? "x" : "g"; bshow.textContent = s.show === "g" ? "Show gates m, h, n" : "Show conductances"; run(); });
  function run() {
    const stim = [{ t: 5, dur: s.dur, amp: s.amp }, ...(s.second ? [{ t: 5 + s.gap, dur: s.dur, amp: s.amp }] : [])];
    const tr = simulate({ T: 50, stim, hold: s.hold, naBlock: s.ttx ? 1 : 0, kBlock: s.tea ? 0.95 : 0 });
    const k = spikes(tr), first = spikes(tr.filter((p) => p.t < 5 + s.gap));
    if (!s.ttx && !s.hold && k === 0 && s.amp > 0) st.subthreshold = true;
    if (!s.ttx && !s.hold && k >= 1 && s.amp <= 7.5 && Math.abs(s.dur - 1) < 0.05) st.threshold = true; // the model fires at about 6.9 µA/cm² for 1 ms
    if (!s.ttx && !s.hold && s.second && first === 1 && k === 1 && s.amp > 0) st.refractory = true;
    if (s.ttx && s.amp >= 10) st.ttx = true;
    if (!s.ttx && s.hold > 0 && spikes(tr.filter((p) => p.t > 10)) >= 3) st.train = true;
    ch.check(st);
    draw(tr, k);
  }
  function draw(tr, k) {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const A = axes(g, { l: 48, t: 14, w: W - 62, h: H - 52 }, { x0: 0, x1: 50, y0: -90, y1: 60, xl: "time (ms)", yl: "membrane potential (mV)", xt: 5, yt: 5, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    line(g, [[A.X(0), A.Y(-55)], [A.X(50), A.Y(-55)]], "rgba(255,255,255,.18)", 1, [4, 4]);
    text(g, "about −55 mV: threshold region", A.X(50) - 4, A.Y(-55) - 4, { align: "right", size: 10, color: C.mute });
    line(g, tr.map((p) => [A.X(p.t), A.Y(p.V)]), C.green, 2.4);
    line(g, tr.map((p) => [A.X(p.t), A.Y(-88 + p.I * 0.8)]), C.gold, 1.4);
    text(g, "stimulus", A.X(1), A.Y(-80), { size: 10, color: C.gold });
    const g2 = cv2.g, W2 = cv2.W, H2 = cv2.H; clear(g2, W2, H2);
    if (s.show === "g") {
      const B = axes(g2, { l: 48, t: 10, w: W2 - 62, h: H2 - 40 }, { x0: 0, x1: 50, y0: 0, y1: 40, yl: "mS/cm²", xt: 5, yt: 2, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
      line(g2, tr.map((p) => [B.X(p.t), B.Y(p.gNa)]), C.orange, 2); line(g2, tr.map((p) => [B.X(p.t), B.Y(p.gK)]), C.blue, 2);
      text(g2, "g Na⁺", B.X(46), B.Y(36), { color: C.orange, size: 11 }); text(g2, "g K⁺", B.X(46), B.Y(28), { color: C.blue, size: 11 });
    } else {
      const B = axes(g2, { l: 48, t: 10, w: W2 - 62, h: H2 - 40 }, { x0: 0, x1: 50, y0: 0, y1: 1, yl: "gate", xt: 5, yt: 2, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1) });
      line(g2, tr.map((p) => [B.X(p.t), B.Y(p.m)]), C.orange, 2); line(g2, tr.map((p) => [B.X(p.t), B.Y(p.h)]), C.pink, 2); line(g2, tr.map((p) => [B.X(p.t), B.Y(p.n)]), C.blue, 2);
      text(g2, "m (Na⁺ activation)", B.X(30), B.Y(0.95), { color: C.orange, size: 11 }); text(g2, "h (Na⁺ inactivation)", B.X(30), B.Y(0.78), { color: C.pink, size: 11 }); text(g2, "n (K⁺ activation)", B.X(30), B.Y(0.61), { color: C.blue, size: 11 });
    }
    const peak = Math.max(...tr.map((p) => p.V));
    out(`<div class="lab-read"><div><small>Action potentials</small><b>${k}</b></div><div><small>Peak</small><b>${peak.toFixed(1)} mV</b></div><div><small>Charge per pulse</small><b>${(s.amp * s.dur).toFixed(1)} nC/cm²</b></div></div>
      <p class="lab-msg">${k ? "Depolarisation past threshold opens voltage-gated Na⁺ channels (m rises fast), Na⁺ rushes in and the membrane approaches E<sub>Na</sub> (+50 mV). Slower inactivation (h falls) and K⁺ channel opening (n rises) then repolarise it, overshooting towards E<sub>K</sub> (−77 mV): the after-hyperpolarisation." : s.ttx ? "Tetrodotoxin blocks voltage-gated Na⁺ channels, so no regenerative depolarisation is possible: the membrane only charges passively." : "Below threshold, K⁺ and leak currents outweigh the Na⁺ current and the membrane returns to rest: no action potential (all or nothing)."}</p>`);
  }
  run();
}
