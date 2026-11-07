// The complex plane (Argand diagram), in two modes (ctx.mode):
//   "ops":   set z and w and see z + w (vector addition) and z × w (multiply the moduli, add the arguments).
//   "roots": the n solutions of zⁿ = r e^{iθ}, equally spaced on a circle of radius r^{1/n}.
import { shell, canvas, slider, seg, panel, challenges, clear, fmt, C } from "../lab.js";
import { plane, seg as line, dot } from "./plot.js";

const arg = (x, y) => Math.atan2(y, x), deg = (t) => (t * 180) / Math.PI;
const cstr = (x, y) => `${fmt(x, 3)} ${y < 0 ? "−" : "+"} ${fmt(Math.abs(y), 3)}i`;
export const mul = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
export function roots(n, r = 1, th = 0) { const m = r ** (1 / n); return Array.from({ length: n }, (_, k) => { const t = (th + 2 * Math.PI * k) / n; return [m * Math.cos(t), m * Math.sin(t)]; }); }

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 1, max: 460 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  return ctx.mode === "roots" ? rootsLab(cv, ctrl, out, ctx) : ops(cv, ctrl, out, ctx);
}
function ops(cv, ctrl, out, ctx) {
  const s = { z: [1.5, 1], w: [0.5, 1.5], op: "×" };
  const ch = challenges(ctrl, ctx, [
    { id: "i", text: "Multiply by i (w = 0 + 1i): z turns 90° anticlockwise", test: (x) => x.op === "×" && x.w[0] === 0 && x.w[1] === 1 },
    { id: "real", text: "Make z × w real by choosing w as z's conjugate", test: (x) => x.op === "×" && x.z[1] !== 0 && x.w[0] === x.z[0] && x.w[1] === -x.z[1] },
    { id: "unit", text: "Multiply by a w with modulus 1: the product is z rotated, not stretched", test: (x) => x.op === "×" && Math.abs(Math.hypot(...x.w) - 1) < 1e-9 && x.w[1] !== 0 && x.w[0] !== 0 },
  ]);
  for (const [k, i, lab] of [["z", 0, "Re z"], ["z", 1, "Im z"], ["w", 0, "Re w"], ["w", 1, "Im w"]]) slider(ctrl, { label: lab, min: -3, max: 3, step: 0.1, value: s[k][i], onInput: (v) => { s[k][i] = Math.round(v * 10) / 10; run(); } });
  seg(ctrl, [["+", "z + w"], ["×", "z × w"]], s.op, (v) => { s.op = v; run(); });
  function run() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const P = plane(g, W, H, { x0: -5, x1: 5, y0: -5, y1: 5, step: 1 }); P.draw();
    const { z, w, op } = s, r = op === "+" ? [z[0] + w[0], z[1] + w[1]] : mul(z, w), O = [P.X(0), P.Y(0)];
    for (const [v, c] of [[z, C.blue], [w, C.amber], [r, C.green]]) { line(g, ...O, P.X(v[0]), P.Y(v[1]), c, 2.5); dot(g, P.X(v[0]), P.Y(v[1]), c, 5); }
    if (op === "+") { line(g, P.X(z[0]), P.Y(z[1]), P.X(r[0]), P.Y(r[1]), C.amber, 1, [4, 4]); line(g, P.X(w[0]), P.Y(w[1]), P.X(r[0]), P.Y(r[1]), C.blue, 1, [4, 4]); }
    ch.check({ z: [...z], w: [...w], op });
    const mz = Math.hypot(...z), mw = Math.hypot(...w), mr = Math.hypot(...r);
    out(`<p><span style="color:${C.blue}">z = ${cstr(...z)}</span> (|z| = ${fmt(mz, 3)}, arg ${fmt(deg(arg(...z)), 1)}°) · <span style="color:${C.amber}">w = ${cstr(...w)}</span> (|w| = ${fmt(mw, 3)}, arg ${fmt(deg(arg(...w)), 1)}°)</p>
      <p><span style="color:${C.green}">z ${op} w = ${cstr(...r)}</span>, modulus ${fmt(mr, 3)}, argument ${fmt(deg(arg(...r)), 1)}°. ${op === "+" ? "Adding complex numbers adds them as vectors: the parallelogram rule." : `Multiplying multiplies the moduli (${fmt(mz, 3)} × ${fmt(mw, 3)} = ${fmt(mz * mw, 3)}) and adds the arguments (angles may differ by 360°).`}</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
function rootsLab(cv, ctrl, out, ctx) {
  const s = { n: 5, r: 1, th: 0 };
  const ch = challenges(ctrl, ctx, [
    { id: "unity", text: "Show the 6th roots of unity (z⁶ = 1): a regular hexagon", test: (x) => x.n === 6 && x.r === 1 && x.th === 0 },
    { id: "sum", text: "Check that the roots always sum to 0 (for n ≥ 2)", test: (x) => x.n >= 2 && x.seen },
    { id: "minus", text: "Solve z⁴ = −16: modulus 16, argument 180°", test: (x) => x.n === 4 && x.r === 16 && x.th === 180 },
  ]);
  slider(ctrl, { label: "n (number of roots)", min: 1, max: 12, step: 1, value: s.n, fmt: (v) => v.toFixed(0), onInput: (v) => { s.n = v; run(); } });
  slider(ctrl, { label: "Modulus r of the right-hand side", min: 1, max: 32, step: 1, value: s.r, fmt: (v) => v.toFixed(0), onInput: (v) => { s.r = v; run(); } });
  slider(ctrl, { label: "Argument θ of the right-hand side (degrees)", min: 0, max: 360, step: 15, value: s.th, fmt: (v) => `${v}°`, onInput: (v) => { s.th = v; run(); } });
  function run() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const R = roots(s.n, s.r, (s.th * Math.PI) / 180), m = s.r ** (1 / s.n), lim = Math.max(1.6, m * 1.4);
    const P = plane(g, W, H, { x0: -lim, x1: lim, y0: -lim, y1: lim }); P.draw();
    g.save(); g.strokeStyle = "rgba(167,139,250,.6)"; g.setLineDash([4, 4]); g.beginPath(); g.arc(P.X(0), P.Y(0), P.X(m) - P.X(0), 0, Math.PI * 2); g.stroke(); g.restore();
    if (s.n > 2) { g.save(); g.strokeStyle = "rgba(16,185,129,.6)"; g.beginPath(); R.forEach(([x, y], i) => (i ? g.lineTo(P.X(x), P.Y(y)) : g.moveTo(P.X(x), P.Y(y)))); g.closePath(); g.stroke(); g.restore(); }
    R.forEach(([x, y], k) => { dot(g, P.X(x), P.Y(y), k ? C.green : C.amber, 5); });
    const sum = R.reduce((a, [x, y]) => [a[0] + x, a[1] + y], [0, 0]);
    ch.check({ ...s, seen: true });
    out(`<p>zⁿ = ${s.r} e^{i·${s.th}°} has <b>${s.n}</b> root${s.n > 1 ? "s" : ""} on the circle of radius ${s.r}^(1/${s.n}) = ${fmt(m, 4)}, spaced ${fmt(360 / s.n, 2)}° apart. <span style="color:${C.amber}">First root</span>: ${cstr(...R[0])}.</p><p>Sum of the roots: ${cstr(Math.abs(sum[0]) < 1e-9 ? 0 : sum[0], Math.abs(sum[1]) < 1e-9 ? 0 : sum[1])}${s.n >= 2 ? ", zero by symmetry (it is minus the coefficient of zⁿ⁻¹, which is 0)." : "."}</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
