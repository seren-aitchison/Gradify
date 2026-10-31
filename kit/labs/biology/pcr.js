// PCR: the three-step thermal cycle and the amplification it produces, as a real-time (qPCR) curve with a
// threshold cycle (Ct). Product grows by (1 + efficiency) each cycle until reagents run short (a logistic
// plateau). Annealing temperature is compared with the primers' melting temperature (Wallace rule,
// Tm = 2(A+T) + 4(G+C), a rough guide for short primers).
// Simplified: efficiency falls smoothly when annealing is too hot; non-specific products are only described.
import { shell, canvas, slider, button, axes, line, clear, text, circle, challenges, panel, loop, C } from "../lab.js";

export const wallace = (p) => 2 * [...p].filter((b) => b === "A" || b === "T").length + 4 * [...p].filter((b) => b === "G" || b === "C").length;
// copies after each cycle, with a plateau at K copies
export function amplify({ N0, eff, cycles = 40, K = 1e12 }) { const out = [N0]; let N = N0; for (let c = 1; c <= cycles; c++) { N = N + N * eff * (1 - N / K); out.push(N); } return out; }
export const ct = (curve, thr) => { for (let i = 1; i < curve.length; i++) if (curve[i] >= thr) return i - 1 + Math.log(thr / curve[i - 1]) / Math.log(curve[i] / curve[i - 1]); return null; };

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.34, max: 200 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.55, max: 330 });
  const ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const fwd = "AGCGTCAGTTCGATCACCTG", rev = "TTGACGGTCATGCCAGATCA";
  const s = { log10N0: 3, Ta: 56, dil: false };
  const st = { dilution: false, hot: false, ct: false };
  const ch = challenges(ctrl, ctx, [
    { id: "ct", text: "Change the starting copies and see how the Ct (threshold cycle) moves", test: (x) => x.ct },
    { id: "dil", text: "Compare a 10-fold dilution: Ct shifts by about 3.3 cycles", test: (x) => x.dilution },
    { id: "hot", text: "Set the annealing temperature too high and watch amplification fail", test: (x) => x.hot },
  ]);
  slider(ctrl, { label: "Starting copies", min: 1, max: 8, step: 0.5, value: s.log10N0, fmt: (v) => `10<sup>${v}</sup>`, onInput: (v) => { s.log10N0 = v; s.moved = true; draw(); } });
  slider(ctrl, { label: "Annealing temp.", min: 40, max: 72, step: 1, value: s.Ta, unit: "°C", fmt: (v) => v, onInput: (v) => { s.Ta = v; draw(); } });
  button(ctrl, "Add a 10-fold dilution", () => { s.dil = !s.dil; draw(); });
  const Tm = Math.min(wallace(fwd), wallace(rev));
  let phase = 0;
  const thr = 1e10;
  function effAt(Ta) { if (Ta > Tm + 2) return Math.max(0, 0.95 * (1 - (Ta - Tm - 2) / 6)); return 0.95; }
  function draw() {
    const eff = effAt(s.Ta), N0 = 10 ** s.log10N0, cA = amplify({ N0, eff }), cB = s.dil ? amplify({ N0: N0 / 10, eff }) : null;
    const g2 = cv2.g, W = cv2.W, H = cv2.H; clear(g2, W, H);
    const A = axes(g2, { l: 56, t: 14, w: W - 70, h: H - 52 }, { x0: 0, x1: 40, y0: 1, y1: 1e13, logy: true, xl: "cycle", yl: "copies (fluorescence)", xt: 8, xf: (v) => v.toFixed(0) });
    line(g2, [[A.X(0), A.Y(thr)], [A.X(40), A.Y(thr)]], "rgba(255,255,255,.35)", 1, [5, 4]); text(g2, "threshold", A.X(1), A.Y(thr) - 5, { size: 11, color: C.mute });
    line(g2, cA.map((n, i) => [A.X(i), A.Y(n)]), C.green, 2.4); if (cB) line(g2, cB.map((n, i) => [A.X(i), A.Y(n)]), C.teal, 2, [5, 3]);
    const ctA = ct(cA, thr), ctB = cB ? ct(cB, thr) : null;
    if (ctA != null) { circle(g2, A.X(ctA), A.Y(thr), 5, C.white); text(g2, `Ct ${ctA.toFixed(1)}`, A.X(ctA) + 6, A.Y(thr) + 16, { size: 11 }); if (s.moved) st.ct = true; }
    if (ctB != null) text(g2, `Ct ${ctB.toFixed(1)}`, A.X(ctB) + 6, A.Y(thr) + 30, { size: 11, color: C.teal });
    if (ctA != null && ctB != null) st.dilution = true;
    if (eff < 0.2) st.hot = true;
    ch.check(st);
    out(`<div class="lab-read"><div><small>Primer Tm (Wallace)</small><b>${wallace(fwd)} / ${wallace(rev)} °C</b></div><div><small>Efficiency</small><b>${Math.round(eff * 100)}%</b></div><div><small>Ct</small><b>${ctA == null ? "not reached" : ctA.toFixed(1)}</b></div>${ctB != null ? `<div><small>ΔCt (10× dilution)</small><b>${(ctB - ctA).toFixed(2)}</b></div>` : ""}</div>
      <p class="lab-msg">Forward primer 5′-${fwd}-3′, reverse primer 5′-${rev}-3′. ${s.Ta > Tm + 2 ? "Annealing above the primers' Tm: they can't stay bound, so amplification falls away." : s.Ta < Tm - 8 ? "Annealing well below Tm: primers bind, but also to partly matching sites, so non-specific products are likely (not modelled)." : "Annealing a few degrees below Tm: specific binding and near-doubling each cycle."} With perfect doubling a 10-fold dilution delays Ct by log₂10 ≈ 3.32 cycles.</p>`);
  }
  // the thermal cycle, animated
  const stages = [["Denature", 95, "Heat separates the DNA strands (hydrogen bonds break)."], ["Anneal", null, "Cooling lets primers bind to their complementary sequences."], ["Extend", 72, "Taq polymerase (heat-stable, from Thermus aquaticus) extends the primers 5′→3′."]];
  const stop = loop(el, (dt) => {
    phase = (phase + dt / 1.5) % 3;
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const temps = [95, s.Ta, 72], k = Math.floor(phase);
    const Y = (T) => H - 18 - ((T - 30) / 70) * (H - 36);
    const pts = []; for (let i = 0; i < 3; i++) { const x0 = 20 + (i * (W - 40)) / 3, x1 = 20 + ((i + 1) * (W - 40)) / 3; pts.push([x0 + 8, Y(temps[i])], [x1 - 8, Y(temps[i])]); }
    line(g, pts, C.orange, 2.5);
    stages.forEach(([nm, T], i) => { const x = 20 + ((i + 0.5) * (W - 40)) / 3; text(g, `${nm} ${temps[i]} °C`, x, Y(temps[i]) - 8, { align: "center", size: 12, weight: i === k ? 700 : 400, color: i === k ? C.text : C.mute }); });
    const fx = 20 + (phase * (W - 40)) / 3; circle(g, fx, Y(temps[k]), 6, C.white);
    text(g, stages[k][2], W / 2, H - 4, { align: "center", size: 11, color: C.mute });
  });
  draw();
  return stop;
}
