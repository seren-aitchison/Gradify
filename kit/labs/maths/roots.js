// Root-finding: bisection, Newton–Raphson and the secant method side by side on f(x) = 0. Each method's iterates are
// listed with the error |xₙ − root| (the root itself found to machine precision by long bisection), so you can see
// linear convergence (bisection halves the error) against quadratic convergence (Newton roughly squares it).
import { shell, canvas, slider, seg as segCtl, panel, challenges, clear, fmt, C } from "../lab.js";
import { plane, curve, dot, seg, fnPicker, deriv } from "./plot.js";

export function bisection(f, a, b, n) { const out = []; let fa = f(a); if (fa * f(b) > 0) return null; for (let i = 0; i < n; i++) { const m = (a + b) / 2, fm = f(m); out.push(m); if (fm === 0) break; if ((fm > 0) === (fa > 0)) { a = m; fa = fm; } else b = m; } return out; }
export function newton(f, x, n) { const out = [x]; for (let i = 0; i < n; i++) { const d = deriv(f, x); if (!d || !Number.isFinite(d)) break; x -= f(x) / d; out.push(x); if (!Number.isFinite(x)) break; } return out; }
export function secant(f, x0, x1, n) { const out = [x0, x1]; for (let i = 0; i < n; i++) { const d = f(x1) - f(x0); if (!d) break; [x0, x1] = [x1, x1 - (f(x1) * (x1 - x0)) / d]; out.push(x1); if (!Number.isFinite(x1)) break; } return out; }

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div></div><div class="lab-ctrl"></div></div><div class="mg-iter"></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.66, max: 420 }), ctrl = $(".lab-ctrl"), tab = $(".mg-iter"), out = panel($(".lab-out"));
  const s = { f: (x) => x * x - 2, src: "x^2 - 2", a: 0, b: 2, x0: 2, n: 6, show: "newton" };
  const ch = challenges(ctrl, ctx, [
    { id: "sqrt2", text: "Find √2 to 10 decimal places with Newton's method in at most 5 steps", test: (x) => x.src === "x^2 - 2" && x.newtonErr < 1e-10 && x.n <= 5 },
    { id: "fail", text: "Make Newton's method fail: start where the tangent is flat or it heads off", test: (x) => x.newtonFail },
    { id: "nobr", text: "Choose a bracket [a, b] where f(a) and f(b) have the same sign: bisection can't start", test: (x) => x.noBracket },
  ]);
  fnPicker(ctrl, { presets: ["x^2 - 2", "x^3 - 2x - 5", "cos(x) - x", "e^x - 3", "x^3 - x"], value: s.src, onChange: ({ f, src }) => { s.f = f; s.src = src; run(); } });
  segCtl(ctrl, [["newton", "Newton–Raphson"], ["bisect", "Bisection"], ["secant", "Secant"]], s.show, (v) => { s.show = v; run(); });
  slider(ctrl, { label: "Bracket start a", min: -3, max: 3, step: 0.1, value: s.a, onInput: (v) => { s.a = v; run(); } });
  slider(ctrl, { label: "Bracket end b", min: -3, max: 4, step: 0.1, value: s.b, onInput: (v) => { s.b = v; run(); } });
  slider(ctrl, { label: "Newton / secant start x₀", min: -3, max: 4, step: 0.05, value: s.x0, onInput: (v) => { s.x0 = v; run(); } });
  slider(ctrl, { label: "Iterations", min: 1, max: 20, step: 1, value: s.n, fmt: (v) => v.toFixed(0), onInput: (v) => { s.n = v; run(); } });
  function run() {
    const { f, n } = s, a = Math.min(s.a, s.b), b = Math.max(s.a, s.b), g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const P = plane(g, W, H, { x0: -3.2, x1: 4.2, y0: -6, y1: 6 }); P.draw(); curve(g, P, f, C.blue);
    const B = bisection(f, a, b, n), N = newton(f, s.x0, n), S = secant(f, s.x0, s.x0 + 0.5, n);
    // the true root nearest the iterates, by long bisection on the bracket or near Newton's end point
    const near = (x) => { for (const w of [0.05, 0.2, 0.6, 1.5]) { const r = bisection(f, x - w, x + w, 200); if (r) return r.at(-1); } return null; };
    const root = B ? B.length && near(B.at(-1)) : near(N.at(-1));
    const its = s.show === "bisect" ? B || [] : s.show === "newton" ? N : S;
    if (s.show === "newton") N.slice(0, -1).forEach((x, i) => { const y = f(x), x1 = N[i + 1]; if ([y, x1].every(Number.isFinite)) { seg(g, P.X(x), P.Y(0), P.X(x), P.Y(y), C.mute, 1, [3, 3]); seg(g, P.X(x), P.Y(y), P.X(x1), P.Y(0), C.amber, 1.5); } });
    if (s.show === "bisect" && B) { g.save(); g.fillStyle = "rgba(16,185,129,.15)"; g.fillRect(P.X(a), 0, P.X(b) - P.X(a), H); g.restore(); }
    its.forEach((x, i) => Number.isFinite(x) && dot(g, P.X(x), P.Y(0), i === its.length - 1 ? C.green : C.amber, 4));
    const err = (x) => (root != null && Number.isFinite(x) ? Math.abs(x - root) : NaN);
    const newtonErr = err(N.at(-1)), newtonFail = !Number.isFinite(N.at(-1)) || Math.abs(N.at(-1)) > 50 || (N.length < n + 1 && Math.abs(f(N.at(-1))) > 1e-6);
    ch.check({ src: s.src, n, newtonErr, newtonFail, noBracket: !B });
    tab.innerHTML = its.length ? `<table class="mg-mod"><caption>${{ newton: "Newton–Raphson", bisect: "Bisection", secant: "Secant method" }[s.show]} iterates</caption><tr><th>n</th><th>xₙ</th><th>f(xₙ)</th><th>|xₙ − root|</th></tr>${its.map((x, i) => `<tr><td>${i}</td><td>${Number.isFinite(x) ? x.toFixed(12) : "–"}</td><td>${fmt(f(x), 3)}</td><td>${fmt(err(x), 3)}</td></tr>`).join("")}</table>` : "";
    out(s.show === "bisect" && !B ? `<p><b>No bracket.</b> f(a) and f(b) have the same sign, so the intermediate value theorem doesn't guarantee a root between them. Move a or b.</p>`
      : `<p>${s.show === "bisect" ? "Bisection halves the interval each step, so it gains about one binary digit per iteration: slow but guaranteed once you have a bracket." : s.show === "newton" ? "Newton–Raphson follows the tangent to the x-axis: x ← x − f(x)/f′(x). Near a simple root, the number of correct digits roughly doubles each step, but a poor start or a flat tangent can send it astray." : "The secant method replaces f′(x) with the gradient through the last two iterates: nearly as fast as Newton, with no derivative needed."}${newtonFail && s.show === "newton" ? " <b>Here it has failed to converge.</b>" : ""}</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
