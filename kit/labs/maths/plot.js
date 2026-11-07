// Shared drawing helpers for MathGradify's labs (kit/labs/maths/*), built on kit/labs/lab.js: a Cartesian plane
// with gridlines and axes through the origin, function plotting that breaks at asymptotes, and a function
// picker that accepts anything the safe expression parser reads (kit/interactive/mathexpr.js, no eval).
import { C, fmt } from "../lab.js";
import { compile, parse, variables } from "../../interactive/mathexpr.js";

// a coordinate plane over the canvas: X/Y map maths coordinates to pixels, and back with ix/iy
export function plane(g, W, H, { x0, x1, y0, y1, pad = 0, step } = {}) {
  const X = (x) => pad + ((x - x0) / (x1 - x0)) * (W - 2 * pad), Y = (y) => H - pad - ((y - y0) / (y1 - y0)) * (H - 2 * pad);
  const ix = (px) => x0 + ((px - pad) / (W - 2 * pad)) * (x1 - x0), iy = (py) => y0 + ((H - pad - py) / (H - 2 * pad)) * (y1 - y0);
  return { X, Y, ix, iy, x0, x1, y0, y1, draw: () => grid(g, W, H, { X, Y, x0, x1, y0, y1, step }) };
}
// a "nice" spacing for gridlines (1, 2 or 5 × a power of ten)
export function niceStep(span, target = 8) {
  const raw = span / target, p = 10 ** Math.floor(Math.log10(raw)), m = raw / p;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
}
function grid(g, W, H, { X, Y, x0, x1, y0, y1, step }) {
  const sx = step || niceStep(x1 - x0), sy = step || niceStep(y1 - y0);
  g.save(); g.lineWidth = 1; g.font = "11px ui-monospace, monospace"; g.fillStyle = C.mute;
  for (let x = Math.ceil(x0 / sx) * sx; x <= x1 + 1e-9; x += sx) {
    const px = Math.round(X(x)) + 0.5; g.strokeStyle = Math.abs(x) < 1e-9 ? C.axis : C.grid; g.beginPath(); g.moveTo(px, 0); g.lineTo(px, H); g.stroke();
    if (Math.abs(x) > 1e-9) g.fillText(fmt(x, 2), px + 3, Math.min(H - 4, Math.max(12, Y(0) + 13)));
  }
  for (let y = Math.ceil(y0 / sy) * sy; y <= y1 + 1e-9; y += sy) {
    const py = Math.round(Y(y)) + 0.5; g.strokeStyle = Math.abs(y) < 1e-9 ? C.axis : C.grid; g.beginPath(); g.moveTo(0, py); g.lineTo(W, py); g.stroke();
    if (Math.abs(y) > 1e-9) g.fillText(fmt(y, 2), Math.min(W - 30, Math.max(3, X(0) + 4)), py - 3);
  }
  g.restore();
}
// plot y = f(x) across the plane, lifting the pen at gaps and jumps (asymptotes)
export function curve(g, P, f, color = C.blue, width = 2.5, dash = null) {
  const n = 800, span = P.y1 - P.y0; let pen = false, prev = null;
  g.save(); g.strokeStyle = color; g.lineWidth = width; if (dash) g.setLineDash(dash); g.beginPath();
  for (let i = 0; i <= n; i++) {
    const x = P.x0 + ((P.x1 - P.x0) * i) / n, y = f(x), ok = Number.isFinite(y) && Math.abs(y) < 1e6;
    if (!ok || (prev != null && Math.abs(y - prev) > span * 1.5)) { pen = false; prev = ok ? y : null; if (!ok) continue; }
    const py = Math.max(-1e4, Math.min(1e4, P.Y(y)));
    if (pen) g.lineTo(P.X(x), py); else g.moveTo(P.X(x), py); pen = true; prev = y;
  }
  g.stroke(); g.restore();
}
export function dot(g, x, y, color = C.white, r = 5) { g.save(); g.fillStyle = color; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); g.restore(); }
export function seg(g, x1, y1, x2, y2, color = C.white, width = 2, dash = null) { g.save(); g.strokeStyle = color; g.lineWidth = width; if (dash) g.setLineDash(dash); g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); g.restore(); }

// a typed-function picker: presets plus a text box; calls onChange({ f, src }) with a callable of the named variables
export function fnPicker(host, { label = "f(x) =", presets, value, vars = ["x"], onChange }) {
  const w = document.createElement("div"); w.className = "mg-fn";
  w.innerHTML = `<label class="mg-fnin"><span>${label}</span><input spellcheck="false" autocomplete="off" aria-label="${label.replace(/[=:]/g, "").trim()}"></label><p class="mg-err" role="alert" hidden></p><div class="mg-pre">${presets.map((p) => `<button type="button" class="lab-btn">${p}</button>`).join("")}</div>`;
  host.append(w);
  const inp = w.querySelector("input"), err = w.querySelector(".mg-err");
  const set = (src) => {
    inp.value = src;
    try {
      const t = parse(src), bad = [...variables(t)].filter((v) => !vars.includes(v));
      if (bad.length) throw new Error(`Use ${vars.join(" and ")} only (not ${bad.join(", ")}).`);
      const c = compile(t); err.hidden = true; onChange({ src, f: vars.length === 1 ? (x) => c({ [vars[0]]: x }) : (...a) => c(Object.fromEntries(vars.map((v, i) => [v, a[i]]))) });
    } catch (e) { err.textContent = e.message; err.hidden = false; }
  };
  inp.addEventListener("change", () => set(inp.value));
  inp.addEventListener("keydown", (e) => { if (e.key === "Enter") set(inp.value); });
  w.querySelectorAll(".mg-pre button").forEach((b) => b.addEventListener("click", () => set(b.textContent)));
  set(value);
  return { set };
}
// derivatives and integrals by numerical methods (for display and checking, not proof)
export const deriv = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
export function simpson(f, a, b, n = 2000) {
  if (n % 2) n++; const h = (b - a) / n; let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
  return (s * h) / 3;
}
