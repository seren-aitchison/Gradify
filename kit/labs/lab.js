// The shared toolkit for SciGradify interactives (kit/labs/biology/*, kit/labs/chemistry/*). Every lab is a
// module whose default export mounts it: `export default function mount(el, api) { …; return stop; }`.
// api.complete(taskId, label) records a challenge as done (+XP, once); api.solved(taskId) says whether it is.
// The course engine (kit/course/course.js) loads labs lazily, embeds them in lessons and lists them in the Lab.
export const C = { bg: "#0b0c0e", grid: "rgba(255,255,255,.07)", axis: "rgba(255,255,255,.35)", text: "#e8eaed", mute: "#9aa0a6",
  green: "#10b981", teal: "#14d4c4", lime: "#84cc16", amber: "#f59e0b", orange: "#f97316", gold: "#fbbf24", red: "#ff4d6d", blue: "#5aa0ff", violet: "#a78bfa", pink: "#f472b6", white: "#ffffff" };
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const fmt = (v, d = 2) => (v == null || Number.isNaN(v) ? "–" : Math.abs(v) >= 1e4 || (Math.abs(v) < 1e-2 && v !== 0) ? v.toExponential(Math.max(1, d - 1)).replace("e", " × 10^").replace(/\^\+?(-?)(\d+)/, (m, s, n) => `^${s}${n}`) : (+v.toFixed(d)).toLocaleString());
export const sup = (s) => String(s).replace(/\^\{?(-?[\d+−-]+)\}?/g, "<sup>$1</sup>").replace(/_\{?(\d+)\}?/g, "<sub>$1</sub>");

// build a lab's DOM: html string → element, returns a lookup function
export function shell(el, html, cls = "") {
  el.innerHTML = `<div class="lab ${cls}">${html}</div>`;
  const root = el.firstElementChild;
  const $ = (sel) => root.querySelector(sel);
  $.all = (sel) => [...root.querySelectorAll(sel)];
  $.root = root;
  return $;
}

// a crisp canvas that keeps its aspect ratio and follows its container's width
export function canvas(host, { aspect = 0.56, max = 520 } = {}) {
  const cv = document.createElement("canvas"); cv.className = "lab-cv"; host.append(cv);
  const g = cv.getContext("2d"), st = { W: 0, H: 0, dpr: 1 };
  const fit = () => {
    const w = Math.max(240, host.clientWidth || 600), h = Math.min(max, Math.round(w * aspect)), dpr = Math.min(2, window.devicePixelRatio || 1);
    if (w === st.W && h === st.H && dpr === st.dpr) return false;
    Object.assign(st, { W: w, H: h, dpr }); cv.width = w * dpr; cv.height = h * dpr; cv.style.height = `${h}px`; g.setTransform(dpr, 0, 0, dpr, 0, 0); return true;
  };
  fit();
  const ro = "ResizeObserver" in window ? new ResizeObserver(() => { if (fit()) st.onresize?.(); }) : null; ro?.observe(host);
  st.cv = cv; st.g = g; st.fit = fit; st.stop = () => ro?.disconnect();
  // pointer position in CSS pixels
  st.pos = (e) => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  return st;
}

// requestAnimationFrame loop that stops by itself when its element leaves the page
export function loop(el, fn) {
  let id = 0, last = performance.now(), on = true;
  const tick = (t) => { if (!on || !el.isConnected) return; const dt = Math.max(0, Math.min(0.05, (t - last) / 1000)); last = t; /* the first frame's timestamp can precede performance.now() */ fn(dt, t / 1000); id = requestAnimationFrame(tick); };
  id = requestAnimationFrame(tick);
  return () => { on = false; cancelAnimationFrame(id); };
}

// controls: sliders, selects, buttons and toggles, each wired to a callback
export function slider(host, { label, min, max, step = 1, value, unit = "", fmt: f = (v) => fmt(v, 2), onInput }) {
  const w = document.createElement("label"); w.className = "lab-sl";
  w.innerHTML = `<span>${label}</span><input type="range" min="${min}" max="${max}" step="${step}" value="${value}"><output></output>`;
  host.append(w);
  const inp = w.querySelector("input"), out = w.querySelector("output");
  const show = () => { out.innerHTML = `${f(Number(inp.value))}${unit ? ` ${unit}` : ""}`; };
  inp.addEventListener("input", () => { show(); onInput?.(Number(inp.value)); }); show();
  return { get value() { return Number(inp.value); }, set value(v) { inp.value = v; show(); }, el: w };
}
export function select(host, { label, options, value, onChange }) {
  const w = document.createElement("label"); w.className = "lab-sel";
  w.innerHTML = `${label ? `<span>${label}</span>` : ""}<select>${options.map((o) => { const [v, t] = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(v)}" ${String(v) === String(value) ? "selected" : ""}>${esc(t)}</option>`; }).join("")}</select>`;
  host.append(w);
  const s = w.querySelector("select"); s.addEventListener("change", () => onChange?.(s.value));
  return { get value() { return s.value; }, set value(v) { s.value = v; }, el: w };
}
export function button(host, label, fn, cls = "") {
  const b = document.createElement("button"); b.type = "button"; b.className = `lab-btn ${cls}`; b.innerHTML = label; b.addEventListener("click", fn); host.append(b); return b;
}
export function toggle(host, label, value, fn) {
  const w = document.createElement("label"); w.className = "lab-tog"; w.innerHTML = `<input type="checkbox" ${value ? "checked" : ""}><span>${label}</span>`;
  host.append(w); const i = w.querySelector("input"); i.addEventListener("change", () => fn?.(i.checked)); return i;
}
export function seg(host, options, value, fn) {
  const w = document.createElement("div"); w.className = "lab-seg"; w.setAttribute("role", "group"); host.append(w);
  const paint = () => { w.innerHTML = options.map((o) => { const [v, t] = Array.isArray(o) ? o : [o, o]; return `<button type="button" data-v="${esc(v)}" aria-pressed="${String(v) === String(value)}">${t}</button>`; }).join(""); };
  paint();
  w.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; value = b.dataset.v; paint(); fn?.(value); });
  return { get value() { return value; }, set value(v) { value = v; paint(); } };
}

// challenges: a checklist the learner completes by doing things in the lab
// When the course counts a lab's challenges as mastery evidence, it passes api.focus: each open challenge then has a
// "Try this" button, so the learner can say which one they're working on, and a try that doesn't get there can be
// recorded too (kit/course/course.js). Without api.focus, challenges are a plain checklist.
export function challenges(host, api, list) {
  const box = document.createElement("div"); box.className = "lab-ch"; host.append(box);
  // the course engine learns every challenge this lab offers (each must be mapped to a lesson for mastery evidence)
  api?.declare?.(list.map((c) => ({ id: c.id, text: c.text.replace(/<[^>]+>/g, "") })));
  const done = new Set(list.filter((c) => api?.solved?.(c.id)).map((c) => c.id));
  const can = typeof api?.focus === "function"; let cur = null;
  const paint = () => { box.innerHTML = `<b>Challenges</b><ul>${list.map((c) => `<li class="${done.has(c.id) ? "ok" : ""}">${done.has(c.id) ? "✓" : "○"} <span class="lab-cht">${c.text}</span>${can && !done.has(c.id) ? ` <button type="button" class="lab-try" data-try="${esc(c.id)}" aria-pressed="${cur === c.id}">${cur === c.id ? "Working on it" : "Try this"}</button>` : ""}</li>`).join("")}</ul>`; };
  if (can) box.addEventListener("click", (e) => { const b = e.target.closest("[data-try]"); if (!b) return; cur = cur === b.dataset.try ? null : b.dataset.try; api.focus(cur, list.find((c) => c.id === cur)?.text.replace(/<[^>]+>/g, "")); paint(); });
  paint();
  return {
    check(state) {
      let changed = false;
      for (const c of list) if (!done.has(c.id) && c.test(state)) { done.add(c.id); changed = true; if (cur === c.id) cur = null; api?.complete?.(c.id, c.text.replace(/<[^>]+>/g, "")); }
      if (changed) { paint(); if (done.size === list.length) api?.onComplete?.({ score: 1 }); }
    },
    done: (id) => done.has(id),
  };
}

// plotting helpers on a 2D canvas
export function axes(g, box, { x0, x1, y0, y1, xl = "", yl = "", xt = 5, yt = 4, xf = (v) => fmt(v, 1), yf = (v) => fmt(v, 1), logy = false }) {
  const { l, t, w, h } = box;
  const X = (v) => l + ((v - x0) / (x1 - x0)) * w;
  const Y = logy ? (v) => t + h - ((Math.log10(Math.max(v, 1e-300)) - Math.log10(y0)) / (Math.log10(y1) - Math.log10(y0))) * h : (v) => t + h - ((v - y0) / (y1 - y0)) * h;
  g.save(); g.strokeStyle = C.grid; g.lineWidth = 1; g.fillStyle = C.mute; g.font = "11px Geist, system-ui, sans-serif";
  for (let i = 0; i <= xt; i++) { const v = x0 + ((x1 - x0) * i) / xt, x = X(v); g.beginPath(); g.moveTo(x, t); g.lineTo(x, t + h); g.stroke(); g.textAlign = "center"; g.fillText(xf(v), x, t + h + 14); }
  if (logy) { for (let e = Math.ceil(Math.log10(y0)); e <= Math.log10(y1); e++) { const y = Y(10 ** e); g.beginPath(); g.moveTo(l, y); g.lineTo(l + w, y); g.stroke(); g.textAlign = "right"; g.fillText(`1e${e}`, l - 5, y + 4); } }
  else for (let i = 0; i <= yt; i++) { const v = y0 + ((y1 - y0) * i) / yt, y = Y(v); g.beginPath(); g.moveTo(l, y); g.lineTo(l + w, y); g.stroke(); g.textAlign = "right"; g.fillText(yf(v), l - 5, y + 4); }
  g.strokeStyle = C.axis; g.beginPath(); g.moveTo(l, t); g.lineTo(l, t + h); g.lineTo(l + w, t + h); g.stroke();
  g.fillStyle = C.text; g.textAlign = "center"; g.fillText(xl, l + w / 2, t + h + 30);
  g.save(); g.translate(l - 38, t + h / 2); g.rotate(-Math.PI / 2); g.fillText(yl, 0, 0); g.restore();
  g.restore();
  return { X, Y };
}
export function line(g, pts, color, width = 2, dash = null) {
  if (!pts.length) return; g.save(); g.strokeStyle = color; g.lineWidth = width; if (dash) g.setLineDash(dash);
  g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); g.restore();
}
export function text(g, s, x, y, { color = C.text, size = 12, align = "left", weight = 400, base = "alphabetic" } = {}) {
  g.save(); g.fillStyle = color; g.font = `${weight} ${size}px Geist, system-ui, sans-serif`; g.textAlign = align; g.textBaseline = base; g.fillText(s, x, y); g.restore();
}
export function clear(g, W, H, color = C.bg) { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = color; g.fillRect(0, 0, g.canvas.width, g.canvas.height); g.restore(); }
export function circle(g, x, y, r, fill, stroke) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.stroke(); } }
export function rrect(g, x, y, w, h, r, fill, stroke) { g.beginPath(); g.roundRect(x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.stroke(); } }
export function arrow(g, x1, y1, x2, y2, color = C.text, w = 2, head = 8) {
  const a = Math.atan2(y2 - y1, x2 - x1); g.save(); g.strokeStyle = color; g.fillStyle = color; g.lineWidth = w;
  g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2 - Math.cos(a) * head * 0.7, y2 - Math.sin(a) * head * 0.7); g.stroke();
  g.beginPath(); g.moveTo(x2, y2); g.lineTo(x2 - Math.cos(a - 0.4) * head, y2 - Math.sin(a - 0.4) * head); g.lineTo(x2 - Math.cos(a + 0.4) * head, y2 - Math.sin(a + 0.4) * head); g.closePath(); g.fill(); g.restore();
}

// numerical helpers
export const rk4 = (f, y, t, h) => {
  const k1 = f(t, y), k2 = f(t + h / 2, y.map((v, i) => v + (h / 2) * k1[i])), k3 = f(t + h / 2, y.map((v, i) => v + (h / 2) * k2[i])), k4 = f(t + h, y.map((v, i) => v + h * k3[i]));
  return y.map((v, i) => v + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
};
// bisection root finder on [a, b]
export function bisect(f, a, b, n = 200) { let fa = f(a); for (let i = 0; i < n; i++) { const m = (a + b) / 2, fm = f(m); if ((fm > 0) === (fa > 0)) { a = m; fa = fm; } else b = m; } return (a + b) / 2; }
export const randn = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
export function seeded(s = 1) { return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

// a simple info panel that updates its HTML
export function panel(host, cls = "lab-info") { const d = document.createElement("div"); d.className = cls; host.append(d); return (html) => { d.innerHTML = html; }; }

// a few questions inside a lab, each a challenge: { id, q, options: [...], answer (index), why }
export function quiz(host, ctx, items, title = "Check your understanding") {
  const box = document.createElement("div"); box.className = "lab-ch lab-quiz"; host.append(box);
  ctx?.declare?.(items.map((x) => ({ id: x.id, text: x.q.replace(/<[^>]+>/g, "") })));
  const done = new Set(items.filter((x) => ctx?.solved?.(x.id)).map((x) => x.id));
  const paint = () => {
    box.innerHTML = `<b>${title}</b>${items.map((x, i) => `<div class="lab-qz" data-i="${i}"><p>${x.q}</p><div class="lab-chips">${x.options.map((o, j) => `<button type="button" data-j="${j}" class="${done.has(x.id) && j === x.answer ? "ok" : ""}">${o}</button>`).join("")}</div><p class="lab-msg ${done.has(x.id) ? "ok" : ""}">${done.has(x.id) ? x.why : ""}</p></div>`).join("")}`;
  };
  paint();
  box.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-j]"); if (!b) return;
    const wrap = b.closest(".lab-qz"), x = items[Number(wrap.dataset.i)], j = Number(b.dataset.j), msg = wrap.querySelector(".lab-msg");
    if (j === x.answer) { b.classList.add("ok"); msg.className = "lab-msg ok"; msg.innerHTML = x.why; if (!done.has(x.id)) { done.add(x.id); ctx?.complete?.(x.id, x.q.replace(/<[^>]+>/g, "").slice(0, 60)); if (done.size === items.length) ctx?.onComplete?.({ score: 1 }); } }
    else { b.classList.add("no"); msg.className = "lab-msg no"; msg.textContent = "Not quite: look again at the model and try another answer."; if (!done.has(x.id)) ctx?.fail?.(x.id, x.q.replace(/<[^>]+>/g, "").slice(0, 60)); }
  });
  return { done: (id) => done.has(id) };
}

// statistics: the regularised lower incomplete gamma function and the chi-squared upper-tail p-value
function gammaln(x) { const c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5]; let y = x, tmp = x + 5.5; tmp -= (x + 0.5) * Math.log(tmp); let ser = 1.000000000190015; for (const v of c) ser += v / ++y; return -tmp + Math.log((2.5066282746310005 * ser) / x); }
export function gammaP(a, x) {
  if (x <= 0) return 0;
  if (x < a + 1) { let sum = 1 / a, del = sum, ap = a; for (let n = 0; n < 500; n++) { ap++; del *= x / ap; sum += del; if (Math.abs(del) < Math.abs(sum) * 1e-12) break; } return sum * Math.exp(-x + a * Math.log(x) - gammaln(a)); }
  let b = x + 1 - a, c = 1e300, d = 1 / b, h = d;
  for (let i = 1; i < 500; i++) { const an = -i * (i - a); b += 2; d = an * d + b; if (Math.abs(d) < 1e-300) d = 1e-300; c = b + an / c; if (Math.abs(c) < 1e-300) c = 1e-300; d = 1 / d; const del = d * c; h *= del; if (Math.abs(del - 1) < 1e-12) break; }
  return 1 - Math.exp(-x + a * Math.log(x) - gammaln(a)) * h;
}
export const chiSquareP = (x2, df) => 1 - gammaP(df / 2, x2 / 2);

// ---------- accessibility (docs/INTERACTIVE-ROADMAP.md §5.7) ----------
// describe(cv, label): the canvas becomes an image with a name, and a live text describes what it shows now, for
// screen readers (and the AI tutor reads it too). Returns update(text); call it whenever the drawing changes.
export function describe(cv, label) {
  const c = cv.cv || cv; c.setAttribute("role", "img"); c.setAttribute("aria-label", label);
  const p = document.createElement("p"); p.className = "sr-only lab-desc"; p.setAttribute("aria-live", "polite"); c.after(p);
  let last = "";
  return (text) => { if (text !== last) { last = text; p.textContent = text; c.setAttribute("aria-label", `${label}. ${text}`); } };
}
// handles(cv, points, opts): draggable points over a canvas that also work from the keyboard. Each point is a focusable
// button placed over the canvas: drag it with a pointer, or focus it and use the arrow keys (Shift for bigger steps).
//   points: [{ id, name, x, y }] in maths coordinates; opts: { toPx(x, y) → [px, py], toWorld(px, py) → [x, y],
//   step (keyboard step in maths units), onMove(point) }. Returns { place() } to call after every redraw.
//   nudge(point, dx, dy, size) → [x, y], optional: how the arrow keys move a point (for example round a circle).
export function handles(cv, points, { toPx, toWorld, step = 0.1, onMove, nudge }) {
  const host = cv.cv.parentElement; if (getComputedStyle(host).position === "static") host.style.position = "relative";
  const btns = points.map((pt) => {
    const b = document.createElement("button"); b.type = "button"; b.className = "lab-handle"; b.dataset.handle = pt.id; host.append(b);
    const moveTo = (x, y) => { pt.x = x; pt.y = y; onMove?.(pt); place(); };
    b.addEventListener("keydown", (e) => {
      const k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key]; if (!k) return;
      e.preventDefault(); const s = step * (e.shiftKey ? 5 : 1);
      if (nudge) { const [x, y] = nudge(pt, k[0], k[1], s); moveTo(x, y); } else moveTo(+(pt.x + k[0] * s).toFixed(6), +(pt.y + k[1] * s).toFixed(6));
    });
    b.addEventListener("pointerdown", (e) => {
      b.setPointerCapture(e.pointerId); b.focus();
      const mv = (ev) => { const r = cv.cv.getBoundingClientRect(); const [x, y] = toWorld(ev.clientX - r.left, ev.clientY - r.top); moveTo(x, y); };
      const up = () => { b.removeEventListener("pointermove", mv); b.removeEventListener("pointerup", up); };
      b.addEventListener("pointermove", mv); b.addEventListener("pointerup", up);
    });
    return b;
  });
  function place() {
    points.forEach((pt, i) => {
      const [px, py] = toPx(pt.x, pt.y), b = btns[i];
      b.style.left = `${cv.cv.offsetLeft + px}px`; b.style.top = `${cv.cv.offsetTop + py}px`;
      b.setAttribute("aria-label", `${pt.name} at (${fmt(pt.x, 2)}, ${fmt(pt.y, 2)}): drag, or use the arrow keys`);
    });
  }
  place();
  return { place, buttons: btns };
}
