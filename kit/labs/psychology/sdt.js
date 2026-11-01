// Signal detection theory (Green and Swets, 1966) with the equal-variance Gaussian model: noise alone gives evidence
// N(0, 1); signal plus noise gives N(d′, 1). An observer says "yes" when evidence exceeds a criterion. Sensitivity (d′)
// and bias (c) are separate: moving the criterion trades hits for false alarms without changing d′. All values exact.
import { shell, canvas, slider, panel, challenges, clear, axes, line, text, circle, C } from "../lab.js";
import { normCdf, normPdf, normInv } from "../social/stats.js";

// hit and false-alarm rates for sensitivity d and a criterion k on the evidence axis
export const rates = (d, k) => ({ hit: 1 - normCdf(k - d), fa: 1 - normCdf(k) });
// d′ and c from hit and false-alarm rates
export const fromRates = (H, F) => ({ d: normInv(H) - normInv(F), c: -(normInv(H) + normInv(F)) / 2 });

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><div class="lab-stage2"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.45, max: 280 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.6, max: 280 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { d: 1.5, k: 0.75 }, st = {};
  const ch = challenges(ctrl, ctx, [
    { id: "lib", text: "Set a liberal criterion: hit rate above 90%", test: (x) => x.hit > 0.9 },
    { id: "cons", text: "Set a conservative criterion: false alarms below 5%", test: (x) => x.fa < 0.05 },
    { id: "chance", text: "Make the observer unable to tell signal from noise (d′ = 0)", test: (x) => x.d === 0 },
  ]);
  slider(ctrl, { label: "Sensitivity d′", min: 0, max: 3.5, step: 0.1, value: s.d, fmt: (v) => v.toFixed(1), onInput: (v) => { s.d = v; run(); } });
  slider(ctrl, { label: "Criterion (position on the evidence axis)", min: -2, max: 4, step: 0.05, value: s.k, fmt: (v) => v.toFixed(2), onInput: (v) => { s.k = v; run(); } });
  function run() {
    const R = rates(s.d, s.k), c = s.k - s.d / 2; Object.assign(st, R, { d: s.d }); ch.check(st);
    let g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const A = axes(g, { l: 40, t: 12, w: W - 54, h: H - 44 }, { x0: -3.5, x1: 6.5, y0: 0, y1: 0.45, xl: "internal evidence", yl: "density", xt: 5, yt: 3, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1) });
    const xs = Array.from({ length: 201 }, (_, i) => -3.5 + i * 0.05);
    g.save(); g.globalAlpha = 0.25; g.fillStyle = C.red; g.beginPath(); g.moveTo(A.X(s.k), A.Y(0)); xs.filter((x) => x >= s.k).forEach((x) => g.lineTo(A.X(x), A.Y(normPdf(x)))); g.lineTo(A.X(6.5), A.Y(0)); g.fill();
    g.fillStyle = C.green; g.beginPath(); g.moveTo(A.X(s.k), A.Y(0)); xs.filter((x) => x >= s.k).forEach((x) => g.lineTo(A.X(x), A.Y(normPdf(x - s.d)))); g.lineTo(A.X(6.5), A.Y(0)); g.fill(); g.restore();
    line(g, xs.map((x) => [A.X(x), A.Y(normPdf(x))]), C.mute, 2); line(g, xs.map((x) => [A.X(x), A.Y(normPdf(x - s.d))]), C.green, 2);
    line(g, [[A.X(s.k), A.Y(0)], [A.X(s.k), A.Y(0.45)]], C.gold, 2); text(g, "say “yes” →", A.X(s.k) + 4, A.Y(0.42), { size: 11, color: C.gold });
    text(g, "noise", A.X(0), A.Y(0.41), { align: "center", size: 11, color: C.mute }); text(g, "signal + noise", A.X(s.d), A.Y(0.43), { align: "center", size: 11, color: C.green });
    g = cv2.g; W = cv2.W; H = cv2.H; clear(g, W, H);
    const B = axes(g, { l: 44, t: 12, w: Math.min(W - 60, H - 44), h: H - 44 }, { x0: 0, x1: 1, y0: 0, y1: 1, xl: "false-alarm rate", yl: "hit rate", xt: 4, yt: 4, xf: (v) => v.toFixed(2), yf: (v) => v.toFixed(2) });
    line(g, [[B.X(0), B.Y(0)], [B.X(1), B.Y(1)]], "rgba(255,255,255,.25)", 1, [4, 4]);
    line(g, Array.from({ length: 121 }, (_, i) => { const k = -4 + i * (10 / 120), r = rates(s.d, k); return [B.X(r.fa), B.Y(r.hit)]; }), C.violet, 2);
    circle(g, B.X(R.fa), B.Y(R.hit), 5, C.gold); text(g, "ROC curve", B.X(0.55), B.Y(0.2), { size: 11, color: C.violet });
    out(`<p><b>Hits ${(R.hit * 100).toFixed(1)}% · misses ${((1 - R.hit) * 100).toFixed(1)}% · false alarms ${(R.fa * 100).toFixed(1)}% · correct rejections ${((1 - R.fa) * 100).toFixed(1)}%.</b> Bias c = ${c.toFixed(2)} (${c > 0.05 ? "conservative" : c < -0.05 ? "liberal" : "neutral"}).</p><p>Moving the criterion slides the gold point along one ROC curve: hits and false alarms change together. Only greater sensitivity (a larger d′) moves the whole curve towards the top-left corner. This is why a radiologist, a lifeguard or an eyewitness can be "more willing to say yes" without being any better at telling the difference.</p>`);
  }
  run(); cv.onresize = run; cv2.onresize = run;
  return () => { cv.stop(); cv2.stop(); };
}
