// MathGradify graph explorer: plot functions typed by the student (kit/interactive/mathexpr.js, no eval),
// with sliders for the parameters a, b and c, and transformation challenges: adjust the sliders until your
// graph matches a target (dashed). Challenges are recorded as completed tasks (ctx.complete).
import { compile, parse, variables } from "./mathexpr.js";
import { esc } from "../core/text.js";

export const CHALLENGES = [
  { id: "line", title: "Straight line", template: "a x + b", target: { a: 2, b: -3 }, hint: "a is the gradient; b is where the line crosses the y-axis." },
  { id: "parabola", title: "Completed square", template: "a(x - b)^2 + c", target: { a: 1, b: 2, c: -3 }, hint: "The vertex is at (b, c); a stretches the curve and flips it if negative." },
  { id: "flip", title: "Reflected parabola", template: "a(x - b)^2 + c", target: { a: -2, b: -1, c: 4 }, hint: "A negative a turns the parabola upside down." },
  { id: "sine", title: "Sine wave", template: "a sin(b x) + c", target: { a: 3, b: 2, c: 1 }, hint: "a is the amplitude, the period is 2π ÷ b, and c moves it up or down." },
  { id: "exp", title: "Exponential growth", template: "a e^(b x) + c", target: { a: 1, b: 0.5, c: -2 }, hint: "c is the horizontal asymptote; b controls how fast it grows." },
  { id: "recip", title: "Shifted reciprocal", template: "a/(x - b) + c", target: { a: 2, b: 1, c: 1 }, hint: "The asymptotes are x = b and y = c." },
  { id: "cubic", title: "Cubic roots", template: "a(x - b)(x - c)(x + 1)", target: { a: 0.5, b: 2, c: -3 }, hint: "The graph crosses the x-axis at x = b, x = c and x = −1." },
];
const RANGE = { x: [-8, 8], y: [-8, 8] };

// sample a function as SVG path segments, breaking at gaps and asymptotes
export function pathFor(f, { W, H, x: [x0, x1], y: [y0, y1] }, steps = 600) {
  const X = (x) => ((x - x0) / (x1 - x0)) * W, Y = (y) => H - ((y - y0) / (y1 - y0)) * H;
  let d = "", pen = false, prev = null;
  for (let i = 0; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps, y = f(x);
    const ok = Number.isFinite(y) && Math.abs(y) < 1e6;
    const jump = prev != null && ok && Math.abs(y - prev) > (y1 - y0) * 1.5;
    if (!ok || jump) { pen = false; prev = ok ? y : null; if (!ok) continue; }
    const py = Math.max(-H, Math.min(2 * H, Y(y)));
    d += `${pen ? "L" : "M"}${X(x).toFixed(1)},${py.toFixed(1)}`; pen = true; prev = y;
  }
  return d;
}
export const matches = (ch, vals) => Object.entries(ch.target).every(([k, v]) => Math.abs((vals[k] ?? 0) - v) < 1e-9);

export function mountGrapher(el, ctx = {}) {
  const W = 560, H = 420, view = { W, H, ...RANGE };
  let mode = "free", ch = null, expr = "a x^2 + b x + c", vals = { a: 1, b: 0, c: 0 }, err = "";
  const fn = () => { try { const t = parse(expr); const bad = [...variables(t)].filter((v) => !"xabc".includes(v)); err = bad.length ? `Use x for the variable and a, b, c for sliders (not ${bad.join(", ")}).` : ""; const f = compile(t); return (x) => f({ x, ...vals }); } catch (e) { err = e.message; return () => NaN; } };
  const grid = () => { let g = ""; for (let i = RANGE.x[0]; i <= RANGE.x[1]; i++) { const X = ((i - RANGE.x[0]) / 16) * W, Y = H - ((i - RANGE.y[0]) / 16) * H; g += `<line class="${i === 0 ? "ax" : ""}" x1="${X}" x2="${X}" y1="0" y2="${H}"/><line class="${i === 0 ? "ax" : ""}" x1="0" x2="${W}" y1="${Y}" y2="${Y}"/>${i && i % 2 === 0 ? `<text x="${X + 3}" y="${H / 2 + 13}">${i}</text><text x="${W / 2 + 4}" y="${Y - 3}">${i}</text>` : ""}`; } return g; };
  const paint = () => {
    const f = fn(), target = ch ? compile(ch.template.replace(/\b([abc])\b/g, (m) => `(${ch.target[m]})`)) : null;
    const done = ch && matches(ch, vals);
    if (done) ctx.complete?.(ch.id, ch.title);
    el.innerHTML = `<div class="gx"><div class="gx-modes" role="tablist"><button type="button" role="tab" aria-selected="${mode === "free"}" data-mode="free">Explore</button><button type="button" role="tab" aria-selected="${mode === "ch"}" data-mode="ch">Challenges</button></div>
      ${mode === "ch" ? `<div class="gx-ch">${CHALLENGES.map((c) => `<button type="button" data-ch="${c.id}" class="${ch?.id === c.id ? "on" : ""} ${ctx.solved?.(c.id) ? "done" : ""}">${esc(c.title)}${ctx.solved?.(c.id) ? " ✓" : ""}</button>`).join("")}</div>
        ${ch ? `<p>Match the dashed graph by adjusting the sliders. Your function: <code>y = ${esc(ch.template)}</code></p>` : "<p>Choose a challenge.</p>"}`
        : `<label class="gx-input">y = <input value="${esc(expr)}" spellcheck="false" autocomplete="off" aria-label="Function of x"></label>${err ? `<p class="mx-err" role="alert">${esc(err)}</p>` : `<p class="mx-help">Use x, and a, b, c for the sliders. Try sin(b x), a/(x − b), e^(a x), abs(x − a) + b.</p>`}
        <div class="gx-presets">${["a x + b", "a(x - b)^2 + c", "a x^3 + b x", "a sin(b x) + c", "a e^(b x)", "a ln(x - b)", "a/(x - b) + c", "abs(a x + b)"].map((p) => `<button type="button" data-preset="${esc(p)}">${esc(p)}</button>`).join("")}</div>`}
      <div class="gx-wrap"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Graph of y = ${esc(mode === "ch" && ch ? ch.template : expr)}"><g class="gx-grid">${grid()}</g>
        ${target ? `<path class="gx-target" d="${pathFor((x) => target({ x }), view)}"/>` : ""}${mode === "free" || ch ? `<path class="gx-curve" d="${pathFor(f, view)}"/>` : ""}</svg>
      <div class="gx-sliders">${["a", "b", "c"].filter((k) => (mode === "ch" ? ch && k in ch.target : true)).map((k) => `<label><span>${k} = <b>${vals[k]}</b></span><input type="range" min="-5" max="5" step="${mode === "ch" && ch && !Number.isInteger(ch.target[k]) ? 0.5 : 0.5}" value="${vals[k]}" data-k="${k}" aria-label="${k}"></label>`).join("")}
        ${done ? `<p class="gx-done" role="status"><b>Matched!</b> ${esc(ch.hint)}</p>` : ch ? `<details><summary>Hint</summary><p>${esc(ch.hint)}</p></details>` : ""}</div></div></div>`;
    wire();
  };
  function wire() {
    el.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => { mode = b.dataset.mode; ch = null; vals = { a: 1, b: 0, c: 0 }; paint(); }));
    el.querySelectorAll("[data-ch]").forEach((b) => b.addEventListener("click", () => { ch = CHALLENGES.find((c) => c.id === b.dataset.ch); vals = { a: 1, b: 0, c: 0 }; paint(); }));
    el.querySelectorAll("[data-preset]").forEach((b) => b.addEventListener("click", () => { expr = b.dataset.preset; paint(); }));
    el.querySelectorAll("[data-k]").forEach((s) => s.addEventListener("input", () => { vals[s.dataset.k] = Number(s.value); const k = s.dataset.k; paint(); el.querySelector(`[data-k="${k}"]`)?.focus(); }));
    const inp = el.querySelector(".gx-input input");
    inp?.addEventListener("change", () => { expr = inp.value; paint(); });
    inp?.addEventListener("keydown", (e) => { if (e.key === "Enter") { expr = inp.value; paint(); } });
  }
  paint();
}
