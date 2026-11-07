// Gradient descent on a function of two variables, drawn as a contour (height) map. Click to choose a starting
// point; each step moves against the gradient by the learning rate times its size. Too small and it crawls; too
// large and it overshoots, zigzags or diverges. Gradients are computed exactly for the built-in functions.
import { shell, canvas, slider, select, button, panel, challenges, clear, fmt, C } from "../lab.js";
import { plane, dot } from "./plot.js";

export const FUNCS = {
  bowl: { label: "Round bowl: x² + y²", f: (x, y) => x * x + y * y, g: (x, y) => [2 * x, 2 * y], min: [0, 0], box: 3 },
  valley: { label: "Narrow valley: x² + 10y²", f: (x, y) => x * x + 10 * y * y, g: (x, y) => [2 * x, 20 * y], min: [0, 0], box: 3 },
  rosen: { label: "Rosenbrock: (1 − x)² + 5(y − x²)²", f: (x, y) => (1 - x) ** 2 + 5 * (y - x * x) ** 2, g: (x, y) => [-2 * (1 - x) - 20 * x * (y - x * x), 10 * (y - x * x)], min: [1, 1], box: 2.2 },
  two: { label: "Two valleys: (x² − 1)² + y²", f: (x, y) => (x * x - 1) ** 2 + y * y, g: (x, y) => [4 * x * (x * x - 1), 2 * y], min: null, box: 2 },
};
export function descend(F, x, y, lr, steps) {
  const path = [[x, y]];
  for (let i = 0; i < steps; i++) { const [gx, gy] = F.g(x, y); x -= lr * gx; y -= lr * gy; path.push([x, y]); if (!Number.isFinite(x) || Math.abs(x) + Math.abs(y) > 1e6) break; if (Math.hypot(gx, gy) < 1e-6) break; }
  return path;
}
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-cols"><div><div class="lab-stage"></div><p class="mg-tip">Click or tap the map to choose where to start.</p></div><div class="lab-ctrl"></div></div><div class="lab-out"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 1, max: 440 }), ctrl = $(".lab-ctrl"), out = panel($(".lab-out"));
  const s = { key: "valley", x: -2.5, y: 1.5, lr: 0.05, steps: 40 };
  const ch = challenges(ctrl, ctx, [
    { id: "diverge", text: "Make it diverge with a learning rate that's too large", test: (x) => x.diverged },
    { id: "zig", text: "See zigzagging in the narrow valley, then fix it with a smaller rate", test: (x) => x.key === "valley" && x.lr <= 0.04 && x.close },
    { id: "local", text: "On the two-valley function, reach both minima from different starts", test: (x) => x.both },
    { id: "rosen", text: "Get within 0.05 of the Rosenbrock minimum (1, 1)", test: (x) => x.key === "rosen" && x.dist < 0.05 },
  ]);
  const seenMin = new Set(), bg = {};
  select(ctrl, { label: "Function", options: Object.entries(FUNCS).map(([k, v]) => [k, v.label]), value: s.key, onChange: (v) => { s.key = v; s.x = -FUNCS[v].box * 0.8; s.y = FUNCS[v].box * 0.5; run(); } });
  slider(ctrl, { label: "Learning rate (step size)", min: 0.005, max: 0.2, step: 0.005, value: s.lr, fmt: (v) => fmt(v, 3), onInput: (v) => { s.lr = v; run(); } });
  slider(ctrl, { label: "Steps", min: 1, max: 400, step: 1, value: s.steps, fmt: (v) => v.toFixed(0), onInput: (v) => { s.steps = v; run(); } });
  button(ctrl, "Random start", () => { const b = FUNCS[s.key].box; s.x = (Math.random() * 2 - 1) * b; s.y = (Math.random() * 2 - 1) * b; run(); });
  cv.cv.addEventListener("pointerdown", (e) => { const b = FUNCS[s.key].box, P = plane(cv.g, cv.W, cv.H, { x0: -b, x1: b, y0: -b, y1: b }), [px, py] = cv.pos(e); s.x = P.ix(px); s.y = P.iy(py); run(); });
  function run() {
    const F = FUNCS[s.key], b = F.box, g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const P = plane(g, W, H, { x0: -b, x1: b, y0: -b, y1: b });
    // shaded height map with contour bands, coloured on a log scale so valleys stay visible
    const tag = `${s.key}:${g.canvas.width}x${g.canvas.height}`;
    if (bg.tag !== tag) {
      const img = g.createImageData(g.canvas.width, g.canvas.height), sx = img.width / W, sy = img.height / H;
      for (let j = 0; j < img.height; j++) for (let i = 0; i < img.width; i++) {
        const v = Math.log1p(F.f(P.ix(i / sx), P.iy(j / sy))), band = (v * 4) % 1 < 0.08, t = Math.min(1, v / 4), k = (j * img.width + i) * 4;
        img.data[k] = 20 + 60 * t + (band ? 50 : 0); img.data[k + 1] = 30 + 40 * (1 - t) + (band ? 50 : 0); img.data[k + 2] = 60 + 120 * (1 - t) + (band ? 50 : 0); img.data[k + 3] = 255;
      }
      Object.assign(bg, { tag, img });
    }
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.putImageData(bg.img, 0, 0); g.restore(); P.draw();
    const path = descend(F, s.x, s.y, s.lr, s.steps), end = path.at(-1), diverged = !Number.isFinite(end[0]) || Math.abs(end[0]) + Math.abs(end[1]) > 50;
    g.save(); g.strokeStyle = C.amber; g.lineWidth = 2; g.beginPath(); path.forEach(([x, y], i) => (i ? g.lineTo(P.X(x), P.Y(y)) : g.moveTo(P.X(x), P.Y(y)))); g.stroke(); g.restore();
    if (path.length < 120) path.forEach(([x, y]) => dot(g, P.X(x), P.Y(y), C.amber, 2.5));
    dot(g, P.X(s.x), P.Y(s.y), C.white, 5); if (!diverged) dot(g, P.X(end[0]), P.Y(end[1]), C.green, 5);
    if (F.min) dot(g, P.X(F.min[0]), P.Y(F.min[1]), C.pink, 3);
    const dist = F.min ? Math.hypot(end[0] - F.min[0], end[1] - F.min[1]) : Math.min(Math.hypot(end[0] - 1, end[1]), Math.hypot(end[0] + 1, end[1]));
    if (s.key === "two" && !diverged && dist < 0.05) seenMin.add(Math.sign(end[0]));
    ch.check({ key: s.key, lr: s.lr, diverged, close: dist < 0.05, dist, both: seenMin.size === 2 });
    out(diverged ? `<p><b>Diverged.</b> Each step overshoots the minimum by more than it gains, so the iterates blow up. Lower the learning rate.</p>` : `<p>After ${path.length - 1} step${path.length === 2 ? "" : "s"}: (${fmt(end[0], 4)}, ${fmt(end[1], 4)}), f = <b>${fmt(F.f(...end), 6)}</b>, distance to the nearest minimum ${fmt(dist, 4)}.</p><p>${s.key === "valley" ? "In a narrow valley the gradient points mostly across the valley, not along it: a large rate zigzags, a small one is slow. This is why practical optimisers use momentum or rescale the variables." : s.key === "two" ? "Gradient descent finds a <i>local</i> minimum: which one depends on where you start." : "Each step is x ← x − η∇f(x), where η is the learning rate."}</p>`);
  }
  run(); cv.onresize = run;
  return () => cv.stop();
}
