// Exponentials and logarithms: y = a·bˣ for growth and decay, its inverse y = log_b x as the reflection in y = x, and
// the same data on a log scale, where exponential growth becomes a straight line. Exact functions.
import { shell, canvas, slider, seg, challenges, panel, describe, C, fmt } from "../lab.js";
import { plane, curve, dot } from "./plot.js";

export const doublingTime = (b) => (b > 1 ? Math.log(2) / Math.log(b) : null);
export const halfLife = (b) => (b > 0 && b < 1 ? Math.log(0.5) / Math.log(b) : null);
export const logb = (b, x) => Math.log(x) / Math.log(b);

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.72, max: 440 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const say = describe(cv, "Exponential and logarithm graphs");
  let view = "inverse";
  const s = { a: 1, b: 1.5 }, st = { double: false, decay: false, inverse: false, straight: false };
  let touched = false;
  const ch = challenges(ctrl, ctx, [
    { id: "double", text: "Make y = bˣ double every 2 units (b = √2 ≈ 1.41)", test: (x) => x.double },
    { id: "decay", text: "Make a decay with a half-life of 1 (b = 0.5)", test: (x) => x.decay },
    { id: "inverse", text: "With b = 10, use the inverse to find the x with 10ˣ = 1000", test: (x) => x.inverse },
    { id: "straight", text: "Switch to the log scale and see growth become a straight line", test: (x) => x.straight },
  ]);
  seg($(".top"), [["inverse", "bˣ and its inverse log_b x"], ["logscale", "Log scale"]], view, (v) => { view = v; touched = true; draw(); });
  const sl = document.createElement("div"); sl.className = "lab-ctrl"; ctrl.prepend(sl);
  slider(sl, { label: "Base b", min: 0.2, max: 10, step: 0.01, value: s.b, fmt: (v) => v.toFixed(2), onInput: (v) => { s.b = Math.abs(v - 1) < 0.005 ? 1.01 : v; touched = true; draw(); } });
  slider(sl, { label: "Starting value a", min: 0.5, max: 5, step: 0.5, value: s.a, fmt: (v) => v.toFixed(1), onInput: (v) => { s.a = v; touched = true; draw(); } });
  const xin = document.createElement("label"); xin.className = "lab-sel"; xin.innerHTML = `<span>Solve bˣ = </span><input type="number" step="any" value="8" aria-label="Value to solve b to the power x equals">`; sl.append(xin);
  const yIn = xin.querySelector("input"); yIn.addEventListener("input", () => { touched = true; draw(); });
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; g.fillStyle = C.bg; g.fillRect(0, 0, W, H);
    const { a, b } = s, f = (x) => a * b ** x, target = Number(yIn.value) || 0;
    let text;
    if (view === "inverse") {
      const P = plane(g, W, H, { x0: -4, x1: 8, y0: -4 * (H / W) * 1.6, y1: 8 * (H / W) * 1.6 }); P.draw();
      curve(g, P, (x) => x, "rgba(255,255,255,.35)", 1.4, [5, 4]);
      curve(g, P, (x) => b ** x, C.blue, 2.6); curve(g, P, (x) => (x > 0 ? logb(b, x) : NaN), C.green, 2.6);
      if (a !== 1) curve(g, P, f, "rgba(90,160,255,.45)", 1.6);
      const sol = target > 0 ? logb(b, target) : NaN;
      if (Number.isFinite(sol)) { dot(g, P.X(sol), P.Y(target), C.amber, 5); dot(g, P.X(target), P.Y(sol), C.amber, 5); g.setLineDash([3, 3]); g.strokeStyle = C.amber; g.beginPath(); g.moveTo(P.X(sol), P.Y(target)); g.lineTo(P.X(target), P.Y(sol)); g.stroke(); g.setLineDash([]); }
      if (touched && Math.abs(b - 10) < 0.005 && target === 1000) st.inverse = true;
      text = `y = ${fmt(b, 2)}ˣ (blue) and its inverse y = log base ${fmt(b, 2)} of x (green) are reflections in y = x. ${target > 0 ? `${fmt(b, 2)}ˣ = ${target} when x = log base ${fmt(b, 2)} of ${target} = ${fmt(sol, 4)}.` : ""}`;
    } else {
      // log scale: plot log10(y) against x, labelled in powers of ten
      const P = plane(g, W, H, { x0: 0, x1: 10, y0: -3, y1: 6 }); P.draw();
      curve(g, P, (x) => Math.log10(f(x)), C.blue, 2.6);
      g.fillStyle = C.mute; g.font = "11px Geist, system-ui"; for (let e = -2; e <= 5; e++) g.fillText(`10^${e}`, P.X(0) + 6, P.Y(e) - 3);
      if (touched) st.straight = true;
      text = `On a log scale y = ${fmt(a, 1)} × ${fmt(b, 2)}ˣ is a straight line: log y = log a + x log b, with gradient log ${fmt(b, 2)} = ${fmt(Math.log10(b), 3)}.`;
    }
    if (touched && Math.abs(b - Math.SQRT2) < 0.006) st.double = true;
    if (touched && Math.abs(b - 0.5) < 0.006) st.decay = true;
    ch.check(st);
    say(text); ctx.report?.(text);
    const d = doublingTime(b), hl = halfLife(b);
    out(`<div class="lab-read"><div><small>${b > 1 ? "Doubling time" : "Half-life"}</small><b>${fmt(b > 1 ? d : hl, 3)}</b></div><div><small>Growth per unit</small><b>${fmt((b - 1) * 100, 1)}%</b></div><div><small>ln b (continuous rate)</small><b>${fmt(Math.log(b), 4)}</b></div></div>
      <p class="lab-msg">${text} Logarithms undo exponentials: log_b(bˣ) = x. Multiplying by b each step means adding log b each step, which is why growth looks straight on a log scale: the way scientists spot exponential processes in data.</p>`);
  }
  cv.onresize = draw;
  draw();
}
