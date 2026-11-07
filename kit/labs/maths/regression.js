// Least-squares regression. Click to add points (or load a data set), and see the line of best fit, the residuals
// and Pearson's correlation coefficient r. Drag a single outlier to see how much one point can move the line.
// All data here are made up for teaching unless labelled otherwise.
import { shell, canvas, button, panel, challenges, clear, fmt, toggle, C } from "../lab.js";
import { plane, seg, dot } from "./plot.js";

export function fit(pts) {
  const n = pts.length; if (n < 2) return null;
  const mx = pts.reduce((a, p) => a + p[0], 0) / n, my = pts.reduce((a, p) => a + p[1], 0) / n;
  let sxx = 0, sxy = 0, syy = 0; for (const [x, y] of pts) { sxx += (x - mx) ** 2; sxy += (x - mx) * (y - my); syy += (y - my) ** 2; }
  if (sxx === 0) return null;
  const b = sxy / sxx, a = my - b * mx, r = syy === 0 ? 0 : sxy / Math.sqrt(sxx * syy), sse = pts.reduce((s, [x, y]) => s + (y - a - b * x) ** 2, 0);
  return { a, b, r, sse, mx, my };
}
const SETS = {
  strong: [[1, 2.1], [2, 3.9], [3, 6.2], [4, 7.8], [5, 10.1], [6, 12.2], [7, 13.8], [8, 16.1]],
  weak: [[1, 4], [2, 2], [3, 6], [4, 3], [5, 7], [6, 4], [7, 8], [8, 5]],
  curve: [[0.5, 8], [1.5, 4], [2.5, 1.5], [3.5, 0.5], [4.5, 0.6], [5.5, 1.6], [6.5, 4.2], [7.5, 8.1]],
};
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><p class="mg-tip">Click or tap to add a point. Click a point again to remove it.</p></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.75, max: 440 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const box = { x0: 0, x1: 10, y0: 0, y1: 16 };
  let pts = SETS.strong.map((p) => [...p]), showRes = true;
  const ch = challenges(ctrl, ctx, [
    { id: "pos", text: "Make r greater than 0.95", test: (x) => x.r > 0.95 },
    { id: "negr", text: "Make a strong negative correlation: r below −0.9", test: (x) => x.r < -0.9 },
    { id: "out", text: "Add one outlier that changes the gradient by more than 50%", test: (x) => x.jump },
    { id: "curve", text: "Load the curved data: r is near 0 though the relationship is strong", test: (x) => x.curve && Math.abs(x.r) < 0.3 },
  ]);
  let base = null, curved = false;
  for (const [k, name] of [["strong", "Strong positive"], ["weak", "Weak positive"], ["curve", "Curved (U-shape)"]]) button(ctrl, `Load: ${name}`, () => { pts = SETS[k].map((p) => [...p]); curved = k === "curve"; base = null; run(); });
  button(ctrl, "Clear all points", () => { pts = []; base = null; run(); });
  toggle(ctrl, "Show residuals", showRes, (v) => { showRes = v; run(); });
  cv.cv.addEventListener("pointerdown", (e) => {
    const P = plane(cv.g, cv.W, cv.H, { ...box, pad: 24 }), [px, py] = cv.pos(e);
    const hit = pts.findIndex(([x, y]) => Math.hypot(P.X(x) - px, P.Y(y) - py) < 10);
    if (hit >= 0) pts.splice(hit, 1); else { const f0 = fit(pts); base = f0 ? f0.b : null; pts.push([Math.round(P.ix(px) * 10) / 10, Math.round(P.iy(py) * 10) / 10]); curved = false; }
    run();
  });
  function run() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const P = plane(g, W, H, { ...box, pad: 24 }); P.draw();
    const F = fit(pts);
    if (F) {
      seg(g, P.X(box.x0), P.Y(F.a + F.b * box.x0), P.X(box.x1), P.Y(F.a + F.b * box.x1), C.green, 2.5);
      if (showRes) for (const [x, y] of pts) seg(g, P.X(x), P.Y(y), P.X(x), P.Y(F.a + F.b * x), C.pink, 1.5, [3, 3]);
      dot(g, P.X(F.mx), P.Y(F.my), C.amber, 4);
    }
    for (const [x, y] of pts) dot(g, P.X(x), P.Y(y), C.blue, 5);
    const jump = F && base != null && Math.abs(base) > 0.05 && Math.abs(F.b - base) / Math.abs(base) > 0.5;
    if (F) ch.check({ r: F.r, jump, curve: curved });
    out(F ? `<p>n = ${pts.length} · line of best fit <b>ŷ = ${fmt(F.a, 3)} ${F.b < 0 ? "−" : "+"} ${fmt(Math.abs(F.b), 3)}x</b> · r = <b>${fmt(F.r, 3)}</b> · r² = ${fmt(F.r * F.r, 3)} · sum of squared residuals ${fmt(F.sse, 3)}</p>
      <p>The least-squares line makes the sum of the squared <span style="color:${C.pink}">residuals</span> as small as possible, and always passes through the <span style="color:${C.amber}">mean point</span> (x̄, ȳ). ${curved ? "Here r is close to 0, yet the points follow a clear curve: r only measures <i>linear</i> association, so always plot the data." : "r near ±1 means the points lie close to a straight line; correlation still isn't causation."}</p>` : `<p>Add at least two points with different x-values.</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
