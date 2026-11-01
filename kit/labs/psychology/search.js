// Visual search (Treisman and Gelade, 1980): find an orange X. In feature search the distractors are all blue Xs, so the
// target differs by one feature and seems to "pop out"; in conjunction search the distractors are blue Xs and orange Os,
// so only the combination identifies it. Feature-integration theory predicts flat search times for features and times
// rising with the number of items for conjunctions. The learner is the participant; results stay on this device.
import { shell, canvas, panel, seg, challenges, clear, text, axes, line, circle, C } from "../lab.js";
import { caveat, local } from "../social/ui.js";
import { mean, regression } from "../social/stats.js";

const ORANGE = "#ff9f43", BLUE = "#5aa0ff", SIZES = [4, 12, 24];
export function makeDisplay(type, n, present, r = Math.random) {
  const items = [], cells = [];
  for (let gx = 0; gx < 8; gx++) for (let gy = 0; gy < 5; gy++) cells.push([gx, gy]);
  for (let i = cells.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [cells[i], cells[j]] = [cells[j], cells[i]]; }
  for (let i = 0; i < n; i++) {
    const [gx, gy] = cells[i], target = present && i === 0;
    const kind = target ? ["X", ORANGE] : type === "feature" ? ["X", BLUE] : (i % 2 ? ["X", BLUE] : ["O", ORANGE]);
    items.push({ gx, gy, jx: r() * 0.4 - 0.2, jy: r() * 0.4 - 0.2, ch: kind[0], col: kind[1] });
  }
  return items;
}
// mean correct RT per set size for one search type, and the search slope (ms per item) by least squares
export function slope(trials, type) {
  const pts = SIZES.map((n) => [n, mean(trials.filter((t) => t.type === type && t.n === n && t.correct && t.present).map((t) => t.rt))]).filter(([, v]) => Number.isFinite(v));
  return { pts, slope: pts.length >= 2 ? regression(pts.map((p) => p[0]), pts.map((p) => p[1])).b : NaN };
}

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="sx-panel"><div class="lab-row sx-mode"></div><div class="sx-stage" style="padding:6px"><div class="sx-cv" style="width:100%"></div></div><div class="sx-keys"></div><div class="lab-stage2"></div><div class="sx-res"></div></div><div class="lab-ctrl"></div>`);
  const cv = canvas($(".sx-cv"), { aspect: 0.58, max: 360 }), cv2 = canvas($(".lab-stage2"), { aspect: 0.45, max: 260 }), keys = $(".sx-keys"), res = panel($(".sx-res")), ctrl = $(".lab-ctrl");
  caveat(ctrl, "Press <b>P</b> if an orange X is present and <b>A</b> if it is absent, as fast as you can without mistakes. Each block has 36 trials (12 per display size, half with a target).");
  const ch = challenges(ctrl, ctx, [
    { id: "feature", text: "Complete a feature-search block", test: (s) => s.done.has("feature") },
    { id: "conj", text: "Complete a conjunction-search block", test: (s) => s.done.has("conjunction") },
    { id: "slope", text: "Show a steeper search slope for conjunctions than for features", test: (s) => s.conj > s.feat },
  ]);
  let type = "feature", trials = [], i = -1, t0 = 0, live = false, timer = 0, plan = [];
  const all = local.get("search-trials", []), st = { done: new Set(all.map((t) => t.type)), feat: NaN, conj: NaN };
  seg($(".lab-row.sx-mode"), [["feature", "Feature search"], ["conjunction", "Conjunction search"]], type, (v) => { type = v; idle(); });
  function idle() { clearTimeout(timer); live = false; i = -1; drawMsg(type === "feature" ? "Find the orange X among blue Xs" : "Find the orange X among blue Xs and orange Os"); keys.innerHTML = `<button type="button" class="sx-key" data-a="p">Present (P)</button><button type="button" class="sx-key" data-a="a">Absent (A)</button><button type="button" class="lab-btn pri" data-start>Start block</button>`; plot(); }
  function drawMsg(m) { const g = cv.g; clear(g, cv.W, cv.H); text(g, m, cv.W / 2, cv.H / 2, { align: "center", size: 15, color: C.text }); }
  function draw(items) {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H); const cw = W / 8, chh = H / 5, fs = Math.max(16, Math.min(cw, chh) * 0.5);
    for (const it of items) text(g, it.ch, (it.gx + 0.5 + it.jx) * cw, (it.gy + 0.5 + it.jy) * chh, { align: "center", base: "middle", size: fs, weight: 700, color: it.col });
  }
  function next() {
    i++; if (i >= plan.length) return finish();
    live = false; drawMsg("+");
    timer = setTimeout(() => { const p = plan[i]; draw(makeDisplay(type, p.n, p.present)); t0 = performance.now(); live = true; }, 500 + Math.random() * 300);
  }
  function answer(a) { if (!live) return; live = false; const p = plan[i]; trials.push({ type, n: p.n, present: p.present, rt: performance.now() - t0, correct: (a === "p") === p.present }); next(); }
  function finish() {
    all.push(...trials); local.set("search-trials", all.slice(-600)); st.done.add(type);
    st.feat = slope(all, "feature").slope; st.conj = slope(all, "conjunction").slope; ch.check(st);
    const s = slope(trials, type), err = trials.filter((t) => !t.correct).length;
    drawMsg("Block complete"); keys.innerHTML = `<button type="button" class="lab-btn pri" data-start>Run another block</button>`;
    res(`<p><b>${type === "feature" ? "Feature" : "Conjunction"} search slope: ${Number.isFinite(s.slope) ? `${s.slope.toFixed(1)} ms per item` : "–"}</b> on target-present trials, ${err} error${err === 1 ? "" : "s"}. ${type === "feature" ? "A slope near zero means the target was found in parallel: it popped out." : "A clearly positive slope means items were checked one after another (serial search)."}</p>
      <p class="sx-fb">Treisman and Gelade (1980) reported near-flat slopes for feature targets and steep, roughly linear slopes for conjunctions. Later work (e.g. Wolfe's guided search model) treats this as a continuum of search efficiency rather than two strict modes.</p>`);
    plot();
  }
  function plot() {
    const g = cv2.g, W = cv2.W, H = cv2.H; clear(g, W, H);
    const A = axes(g, { l: 52, t: 12, w: W - 70, h: H - 46 }, { x0: 0, x1: 28, y0: 0, y1: 2000, xl: "number of items", yl: "mean RT (ms)", xt: 7, yt: 4, xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(0) });
    for (const [t, col] of [["feature", BLUE], ["conjunction", ORANGE]]) { const s = slope(all, t); line(g, s.pts.map(([x, y]) => [A.X(x), A.Y(Math.min(2000, y))]), col, 2); s.pts.forEach(([x, y]) => circle(g, A.X(x), A.Y(Math.min(2000, y)), 4, col)); }
    text(g, "● feature", W - 150, 22, { color: BLUE, size: 11 }); text(g, "● conjunction", W - 80, 22, { color: ORANGE, size: 11 });
  }
  keys.addEventListener("click", (e) => {
    if (e.target.closest("[data-start]")) { trials = []; plan = []; for (const n of SIZES) for (let k = 0; k < 12; k++) plan.push({ n, present: k % 2 === 0 }); for (let a = plan.length - 1; a > 0; a--) { const b = Math.floor(Math.random() * (a + 1)); [plan[a], plan[b]] = [plan[b], plan[a]]; } res(""); keys.innerHTML = `<button type="button" class="sx-key" data-a="p">Present (P)</button><button type="button" class="sx-key" data-a="a">Absent (A)</button>`; next(); return; }
    const b = e.target.closest("[data-a]"); if (b) answer(b.dataset.a);
  });
  const onKey = (e) => { if (live && ["p", "a"].includes(e.key.toLowerCase())) { e.preventDefault(); answer(e.key.toLowerCase()); } };
  document.addEventListener("keydown", onKey);
  idle(); cv.onresize = () => plot();
  return () => { clearTimeout(timer); document.removeEventListener("keydown", onKey); cv.stop(); cv2.stop(); };
}
