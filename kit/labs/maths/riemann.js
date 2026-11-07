// Riemann sums and the definite integral. Split [a, b] into n strips and approximate the area under y = f(x) with
// left, right or midpoint rectangles, or trapezia, then watch the error shrink as n grows. The "exact" value is
// Simpson's rule with 2,000 strips: accurate to many decimal places for smooth functions, but still numerical.
import { shell, canvas, slider, seg as segCtl, panel, challenges, clear, fmt, C } from "../lab.js";
import { plane, curve, fnPicker, simpson } from "./plot.js";

export const sum = (f, a, b, n, rule) => {
  const h = (b - a) / n; let s = 0;
  for (let i = 0; i < n; i++) {
    const l = a + i * h, r = l + h;
    s += rule === "left" ? f(l) : rule === "right" ? f(r) : rule === "mid" ? f((l + r) / 2) : (f(l) + f(r)) / 2;
  }
  return s * h;
};
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.66, max: 440 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { f: (x) => x * x, src: "x^2", a: 0, b: 2, n: 6, rule: "left" }, st = {};
  const ch = challenges(ctrl, ctx, [
    { id: "pct", text: "Get within 1% of the exact area using left rectangles", test: (x) => x.rule === "left" && x.rel < 0.01 },
    { id: "mid", text: "Beat 0.1% error with midpoints and at most 10 strips", test: (x) => x.rule === "mid" && x.n <= 10 && x.rel < 0.001 },
    { id: "neg", text: "Integrate over a region where f is negative and get a negative answer", test: (x) => x.exact < -0.1 },
  ]);
  fnPicker(ctrl, { presets: ["x^2", "sin(x)", "e^x", "1/x", "x^3 - 2x", "sqrt(4 - x^2)"], value: s.src, onChange: ({ f, src }) => { s.f = f; s.src = src; run(); } });
  slider(ctrl, { label: "Lower limit a", min: -3, max: 3, step: 0.1, value: s.a, onInput: (v) => { s.a = v; run(); } });
  slider(ctrl, { label: "Upper limit b", min: -3, max: 4, step: 0.1, value: s.b, onInput: (v) => { s.b = v; run(); } });
  slider(ctrl, { label: "Strips n", min: 1, max: 200, step: 1, value: s.n, fmt: (v) => v.toFixed(0), onInput: (v) => { s.n = v; run(); } });
  segCtl(ctrl, [["left", "Left"], ["right", "Right"], ["mid", "Midpoint"], ["trap", "Trapezium"]], s.rule, (v) => { s.rule = v; run(); });
  function run() {
    const { f, n, rule } = s, a = Math.min(s.a, s.b), b = Math.max(s.a, s.b), g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    let lo = 0, hi = 1; for (let i = 0; i <= 200; i++) { const y = f(a - 0.5 + ((b - a + 1) * i) / 200); if (Number.isFinite(y) && Math.abs(y) < 50) { lo = Math.min(lo, y); hi = Math.max(hi, y); } }
    const pad = (hi - lo) * 0.15 || 1, P = plane(g, W, H, { x0: a - 0.5, x1: b + 0.5, y0: lo - pad, y1: hi + pad }); P.draw();
    const h = (b - a) / n;
    g.save();
    for (let i = 0; i < n; i++) {
      const l = a + i * h, r = l + h, fl = f(l), fr = f(r), fm = f((l + r) / 2);
      const pos = (rule === "trap" ? (fl + fr) / 2 : rule === "left" ? fl : rule === "right" ? fr : fm) >= 0;
      g.fillStyle = pos ? "rgba(90,160,255,.28)" : "rgba(255,77,109,.28)"; g.strokeStyle = pos ? "rgba(90,160,255,.8)" : "rgba(255,77,109,.8)"; g.lineWidth = n > 60 ? 0.5 : 1;
      g.beginPath();
      if (rule === "trap") { g.moveTo(P.X(l), P.Y(0)); g.lineTo(P.X(l), P.Y(fl)); g.lineTo(P.X(r), P.Y(fr)); g.lineTo(P.X(r), P.Y(0)); g.closePath(); }
      else { const y = rule === "left" ? fl : rule === "right" ? fr : fm; g.rect(P.X(l), P.Y(Math.max(0, y)), P.X(r) - P.X(l), Math.abs(P.Y(y) - P.Y(0))); }
      if (Number.isFinite(fl) && Number.isFinite(fr)) { g.fill(); g.stroke(); }
    }
    g.restore();
    curve(g, P, f, C.white, 2);
    const approx = sum(f, a, b, n, rule), exact = simpson(f, a, b), err = approx - exact, rel = Math.abs(err) / Math.max(Math.abs(exact), 1e-9);
    Object.assign(st, { rule, n, rel, exact }); if (Number.isFinite(rel)) ch.check(st);
    out(Number.isFinite(approx) && Number.isFinite(exact) ? `<p>${{ left: "Left", right: "Right", mid: "Midpoint", trap: "Trapezium" }[rule]} sum with ${n} strip${n === 1 ? "" : "s"} of width ${fmt(h, 4)}: <b>${fmt(approx, 6)}</b> · ∫<sub>${fmt(a, 2)}</sub><sup>${fmt(b, 2)}</sup> f(x) dx ≈ <b>${fmt(exact, 6)}</b> · error <b>${fmt(err, 6)}</b> (${fmt(rel * 100, 3)}%)</p>
      <p>${rule === "mid" || rule === "trap" ? "Midpoint and trapezium errors shrink like 1/n²: double n and the error falls about fourfold." : "Left and right sums' errors shrink like 1/n: double n and the error roughly halves."} Red strips lie below the x-axis and count as negative area.</p>`
      : `<p>f isn't defined everywhere on [${fmt(a, 2)}, ${fmt(b, 2)}]. Choose limits where it is (for example, keep 1/x away from 0).</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
