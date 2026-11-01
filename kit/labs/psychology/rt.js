// Simple and choice reaction time: respond as fast as you can to a lit box, with 1, 2 or 4 possible boxes. Hick (1952)
// and Hyman (1953) found choice RT rises linearly with the information in the choice, log2 of the number of options.
import { shell, canvas, panel, seg, challenges, clear, axes, line, circle, rrect, text, C } from "../lab.js";
import { caveat, local } from "../social/ui.js";
import { mean, median, regression } from "../social/stats.js";

const KEYS = ["d", "f", "j", "k"];
export function hick(data) { const pts = [1, 2, 4].map((n) => [Math.log2(n), median(data.filter((d) => d.n === n && d.ok).map((d) => d.rt))]).filter(([, v]) => Number.isFinite(v)); return { pts, slope: pts.length >= 2 ? regression(pts.map((p) => p[0]), pts.map((p) => p[1])).b : NaN }; }
export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="sx-panel"><div class="lab-row sx-mode"></div><div class="lab-stage"></div><div class="sx-keys"></div><div class="lab-stage2"></div><div class="sx-res"></div></div><div class="lab-ctrl"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.32, max: 200 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.42, max: 240 }), keys = $(".sx-keys"), res = panel($(".sx-res")), ctrl = $(".lab-ctrl");
  caveat(ctrl, "Keys D F J K (or the on-screen buttons) for boxes 1–4. 15 trials per block. Results stay on this device.");
  const data = local.get("hick", []);
  const ch = challenges(ctrl, ctx, [{ id: "all", text: "Complete blocks with 1, 2 and 4 choices", test: () => [1, 2, 4].every((n) => data.some((d) => d.n === n)) }, { id: "slope", text: "Find that RT rises with the number of choices", test: () => hick(data).slope > 0 }]);
  let n = 1, plan = [], i = 0, live = false, t0 = 0, timer = 0, lit = -1;
  seg($(".lab-row.sx-mode"), [["1", "1 choice"], ["2", "2 choices"], ["4", "4 choices"]], "1", (v) => { n = Number(v); idle(); });
  function boxes() { const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); const w = Math.min(90, W / 5); for (let k = 0; k < n; k++) { const x = W / 2 + (k - (n - 1) / 2) * (w + 14) - w / 2; rrect(g, x, H / 2 - w / 2, w, w, 12, k === lit ? C.violet : "rgba(255,255,255,.06)", "#555"); text(g, KEYS[k].toUpperCase(), x + w / 2, H / 2 + w / 2 + 16, { align: "center", size: 12, color: C.mute }); } }
  function idle() { clearTimeout(timer); live = false; lit = -1; boxes(); keys.innerHTML = `<button type="button" class="lab-btn pri" data-start>Start ${n}-choice block</button>`; plot(); }
  function next() { if (i >= plan.length) return finish(); live = false; lit = -1; boxes(); timer = setTimeout(() => { lit = plan[i]; boxes(); t0 = performance.now(); live = true; }, 600 + Math.random() * 900); }
  function answer(k) { if (!live) return; live = false; data.push({ n, rt: performance.now() - t0, ok: k === lit }); i++; next(); }
  function finish() { local.set("hick", data.slice(-500)); ch.check({}); lit = -1; boxes(); const mine = data.slice(-15); res(`<p><b>${n} choice${n > 1 ? "s" : ""}: median ${median(mine.filter((d) => d.ok).map((d) => d.rt)).toFixed(0)} ms</b>, ${mine.filter((d) => !d.ok).length} errors.</p>`); keys.innerHTML = `<button type="button" class="lab-btn pri" data-start>Another block</button>`; plot(); }
  function plot() {
    const g = cv2.g, W = cv2.W, H = cv2.H; clear(g, W, H); const h = hick(data);
    const A = axes(g, { l: 52, t: 12, w: W - 70, h: H - 46 }, { x0: 0, x1: 2, y0: 0, y1: 800, xl: "bits of information: log2(number of choices)", yl: "median RT (ms)", xt: 2, yt: 4, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    line(g, h.pts.map(([x, y]) => [A.X(x), A.Y(Math.min(800, y))]), C.violet, 2); h.pts.forEach(([x, y]) => circle(g, A.X(x), A.Y(Math.min(800, y)), 4, C.violet));
    if (Number.isFinite(h.slope)) text(g, `slope ${h.slope.toFixed(0)} ms per bit`, W - 160, 26, { size: 12, color: C.violet });
  }
  keys.addEventListener("click", (e) => { if (e.target.closest("[data-start]")) { plan = Array.from({ length: 15 }, () => Math.floor(Math.random() * n)); i = 0; res(""); keys.innerHTML = KEYS.slice(0, n).map((k, j) => `<button type="button" class="sx-key" data-k="${j}">${k.toUpperCase()}</button>`).join(""); next(); return; } const b = e.target.closest("[data-k]"); if (b) answer(Number(b.dataset.k)); });
  const onKey = (e) => { const k = KEYS.indexOf(e.key.toLowerCase()); if (live && k >= 0 && k < n) { e.preventDefault(); answer(k); } };
  document.addEventListener("keydown", onKey);
  idle(); cv.onresize = boxes; cv2.onresize = plot;
  return () => { clearTimeout(timer); document.removeEventListener("keydown", onKey); cv.stop(); cv2.stop(); };
}
