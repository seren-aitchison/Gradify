// From secant to tangent: the derivative as a limit. Choose a function and a point, then shrink h and watch the
// secant through (a, f(a)) and (a + h, f(a + h)) turn into the tangent. The secant gradient is the difference
// quotient (f(a + h) − f(a)) / h; the tangent gradient shown is a central-difference estimate, for comparison.
import { shell, canvas, slider, panel, challenges, clear, fmt, C } from "../lab.js";
import { plane, curve, dot, seg, fnPicker, deriv } from "./plot.js";

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.7, max: 460 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { f: (x) => x * x, src: "x^2", a: 1, h: 1 }, seen = {};
  let sign = 1;
  const ch = challenges(ctrl, ctx, [
    { id: "close", text: "Shrink h below 0.01 and see the secant and tangent gradients agree", test: (x) => x.h < 0.01 },
    { id: "negh", text: "Use a negative h: the secant approaches from the left", test: (x) => x.h < 0 && Math.abs(x.h) < 0.1 },
    { id: "flat", text: "Find a point where the tangent is horizontal (gradient 0)", test: (x) => Math.abs(x.m) < 0.02 && Math.abs(x.h) < 0.05 },
    { id: "three", text: "Try three different functions", test: () => Object.keys(seen).length >= 3 },
  ]);
  fnPicker(ctrl, { presets: ["x^2", "x^3 - 3x", "sin(x)", "e^x", "1/x", "sqrt(x)", "abs(x)"], value: s.src, onChange: ({ f, src }) => { s.f = f; s.src = src; seen[src] = 1; run(); } });
  slider(ctrl, { label: "Point a", min: -3, max: 3, step: 0.05, value: s.a, onInput: (v) => { s.a = v; run(); } });
  slider(ctrl, { label: "Gap h (log scale)", min: -3, max: 0.3, step: 0.01, value: 0, fmt: (v) => fmt(sign * 10 ** v, 4), onInput: (v) => { s.h = sign * 10 ** v; run(); } });
  const flip = document.createElement("button"); flip.type = "button"; flip.className = "lab-btn"; flip.textContent = "Flip the sign of h"; ctrl.append(flip);
  flip.addEventListener("click", () => { sign = -sign; s.h = -s.h; run(); });
  function run() {
    const { f, a, h } = s, g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const fa = f(a), fb = f(a + h), m = deriv(f, a), sec = (fb - fa) / h;
    const ys = [fa, fb].filter(Number.isFinite), mid = ys.length ? ys[0] : 0;
    const P = plane(g, W, H, { x0: a - 4, x1: a + 4, y0: mid - 3.5, y1: mid + 3.5 }); P.draw();
    curve(g, P, f, C.blue);
    if (Number.isFinite(m) && Number.isFinite(fa)) seg(g, P.X(P.x0), P.Y(fa + m * (P.x0 - a)), P.X(P.x1), P.Y(fa + m * (P.x1 - a)), C.green, 2, [6, 5]);
    if (Number.isFinite(sec) && Number.isFinite(fa)) seg(g, P.X(P.x0), P.Y(fa + sec * (P.x0 - a)), P.X(P.x1), P.Y(fa + sec * (P.x1 - a)), C.amber, 2);
    if (Number.isFinite(fa)) dot(g, P.X(a), P.Y(fa), C.white); if (Number.isFinite(fb)) dot(g, P.X(a + h), P.Y(fb), C.amber, 4);
    ch.check({ h, m, sec });
    const ok = Number.isFinite(m) && Number.isFinite(sec) && Number.isFinite(fa);
    out(ok ? `<p><span style="color:${C.amber}">Secant gradient</span> (f(a + h) − f(a)) / h = <b>${fmt(sec, 5)}</b> · <span style="color:${C.green}">tangent gradient</span> f′(${fmt(a, 2)}) ≈ <b>${fmt(m, 5)}</b> · difference <b>${fmt(Math.abs(sec - m), 5)}</b></p>
      <p>${Math.abs(h) < 0.01 ? "As h → 0 the secant becomes the tangent: the limit of the difference quotient <i>is</i> the derivative." : "Make h smaller and watch the secant swing towards the tangent."}${s.src === "abs(x)" && Math.abs(a) < 0.03 ? " At x = 0, |x| has a corner: the left and right secants approach −1 and +1, so the limit doesn't exist and |x| isn't differentiable there." : ""}</p>`
      : `<p>f isn't defined at this point or nearby. Move a, or choose another function.</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
