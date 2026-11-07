// Single-case behavioural data: an ABAB (reversal) design for an invented pupil's on-task behaviour, the kind of graph
// used in applied behaviour analysis. Set the size of the intervention effect and the noise, then judge the graph by
// level, trend and variability. The data are simulated.
import { shell, canvas, slider, button, panel, challenges, clear, axes, line, circle, text, C } from "../lab.js";
import { dataLabel } from "../social/ui.js";
import { rng, mean } from "../social/stats.js";

export function series({ effect = 30, noise = 8, seed = 5, n = 8 } = {}) {
  const r = rng(seed), out = [];
  ["A", "B", "A", "B"].forEach((ph, k) => { for (let i = 0; i < n; i++) out.push({ phase: ph, block: k, v: Math.max(0, Math.min(100, 35 + (ph === "B" ? effect : 0) + noise * r.n())) }); });
  return out;
}
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.5, max: 320 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out")), s = { effect: 12, noise: 12, seed: 5 }, st = {};
  dataLabel(ctrl, { real: false, how: "Invented observations of one pupil's percentage of intervals on task, generated in your browser." });
  const ch = challenges(ctrl, ctx, [{ id: "clear", text: "Make an effect so clear that every B point is above every A point", test: (x) => x.clear }, { id: "noise", text: "Make the noise so large that the effect is hard to see by eye", test: (x) => x.noisy }]);
  slider(ctrl, { label: "Intervention effect (percentage points)", min: 0, max: 50, step: 1, value: s.effect, fmt: (v) => v, onInput: (v) => { s.effect = v; run(); } });
  slider(ctrl, { label: "Day-to-day variability (SD)", min: 1, max: 25, step: 1, value: s.noise, fmt: (v) => v, onInput: (v) => { s.noise = v; run(); } });
  button(ctrl, "New observations", () => { s.seed++; run(); });
  function run() {
    const D = series(s), A = D.filter((d) => d.phase === "A").map((d) => d.v), B = D.filter((d) => d.phase === "B").map((d) => d.v);
    st.clear = Math.min(...B) > Math.max(...A); st.noisy = s.noise >= 18 && s.effect >= 10; ch.check(st);
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const X = axes(g, { l: 44, t: 24, w: W - 58, h: H - 58 }, { x0: 0.5, x1: D.length + 0.5, y0: 0, y1: 100, xl: "session", yl: "% intervals on task", xt: 4, yt: 4, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    [0, 1, 2, 3].forEach((k) => { const pts = D.map((d, i) => [d, i]).filter(([d]) => d.block === k); line(g, pts.map(([d, i]) => [X.X(i + 1), X.Y(d.v)]), d0(k), 2); pts.forEach(([d, i]) => circle(g, X.X(i + 1), X.Y(d.v), 4, d0(k))); text(g, ["A1 baseline", "B1 praise", "A2 withdrawal", "B2 praise"][k], X.X(k * 8 + 4.5), 16, { align: "center", size: 11, color: C.mute }); if (k) line(g, [[X.X(k * 8 + 0.5), X.Y(0)], [X.X(k * 8 + 0.5), X.Y(100)]], "rgba(255,255,255,.3)", 1, [4, 4]); });
    out(`<p>Mean on task: baseline ${mean(A).toFixed(0)}%, intervention ${mean(B).toFixed(0)}%. ${st.clear ? "No overlap between phases: a clear functional relationship, because behaviour changed each time the intervention was introduced and returned when it was withdrawn." : "The phases overlap: visual analysis would judge this effect weaker or unclear."}</p><p class="sx-fb">The reversal (A2) is what makes the design convincing: if behaviour returns to baseline when praise is withdrawn and improves again when it returns, the change is unlikely to be maturation or coincidence. Withdrawing an effective intervention raises ethical questions, which is why multiple-baseline designs are often preferred.</p>`);
  }
  const d0 = (k) => (k % 2 ? C.violet : C.mute);
  run(); cv.onresize = run;
  return () => cv.stop();
}
