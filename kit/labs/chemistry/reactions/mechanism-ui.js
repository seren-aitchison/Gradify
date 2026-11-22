// Mechanism mode of the Organic Chemistry Lab: draw curly and fishhook arrows on a structure, check each step with
// the mechanism engine (electron-flow.js), get help at four levels, and play the mechanism back as an animation
// generated from its data. Two sources: a reaction from the library (guided and marked against the template) or
// the learner's own drawing from Structure mode (checked for chemical consistency only, and the lab says so).
import { button, toggle, challenges, esc } from "../../lab.js";
import * as K from "../skeletal.js";
import * as E from "./electron-flow.js";
import { REACTIONS, FAMILIES, instantiate, arrowKinds, faultyStep } from "./library.js";
import { breakdown, stepCredit } from "./marking.js";
import { mountTutor } from "./tutor-ui.js";
import { LEVELS, atLevel } from "./predictor.js";

const sub = (f) => esc(f).replace(/(\d+)/g, "<sub>$1</sub>").replace(/([+-]+)$/, (m) => `<sup>${m.replace(/-/g, "−")}</sup>`);
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const COL = { pend: "#f59e0b", bad: "#ff4d6d", good: "#10b981", form: "rgba(16,185,129,.4)", brk: "rgba(255,77,109,.55)" };

export function mountMechanism(host, { ctx = {}, palette = () => "dark", getDrawing = () => null, onSave = null, prefs = { level: "university" }, onPrefs = () => {} } = {}) {
  host.innerHTML = `
    <div class="lab-row mx-top">
      <label class="lab-sel"><span>Mechanism</span><select class="mx-src"></select></label>
      <label class="lab-sel"><span>Level</span><select class="mx-level">${Object.entries(LEVELS).map(([k, v]) => `<option value="${k}">up to ${v}</option>`).join("")}</select></label>
      <div class="lab-seg mx-type" role="group" aria-label="Arrow type"><button type="button" data-t="pair" aria-pressed="true" title="Curly arrow: a pair of electrons">↷ Curly (2e⁻)</button><button type="button" data-t="single" aria-pressed="false" title="Fishhook arrow: one electron">⇀ Fishhook (1e⁻)</button></div>
      <span class="mx-opts"></span>
    </div>
    <div class="mx-cond" aria-live="polite"></div>
    <div class="lab-cols osk-cols">
      <div class="mx-stagewrap">
        <div class="osk-svg mx-svg" tabindex="0" aria-label="Mechanism drawing: drag from a lone pair or a bond to an atom or a bond to add an arrow"></div>
        <p class="osk-hint mx-hint"></p>
        <div class="mx-steps" role="tablist" aria-label="Mechanism steps"></div>
        <div class="lab-row mx-play"></div>
        <details class="mx-kbd"><summary>Add an arrow without dragging</summary><div class="lab-row"><label class="lab-sel"><span>From</span><select class="mx-from"></select></label><label class="lab-sel"><span>To</span><select class="mx-to"></select></label><label class="lab-sel mx-endsel" hidden><span>New bond forms from</span><select class="mx-end"></select></label><span class="mx-addbtn"></span></div></details>
      </div>
      <div class="lab-ctrl">
        <div class="lab-info mx-fb" aria-live="polite"></div>
        <div class="lab-row mx-actions"></div>
        <div class="lab-row mx-help"></div>
        <div class="mx-tutor"></div>
        <div class="lab-info mx-about"></div>
      </div>
    </div>`;
  const q = (s) => host.querySelector(s), svgHost = q(".mx-svg");
  let W = 600, H = 360, view = { cx: 0, cy: 0, s: 40 }, type = "pair", showDelta = true, showLabels = false;
  let src = REACTIONS[0].id, inst = null, states = [], done = [], pending = [], viewK = null, fb = null, drag = null, hover = null;
  let marks = { got: 0, total: 0, first: [] }, attempts = [], assisted = false, anim = null, speed = 1, finished = false;
  // ecf: the step from which the learner carried their own (valid but different) intermediate forward; spot: "spot the error"
  let ecf = null, spot = null, spotSeed = 0, spots = 0;
  // exam style: conditions question first, no help, a timer, an explanation question at the end, a 10-mark breakdown
  let exam = false, xq = null, timer = null;
  const ch = challenges(q(".mx-about").parentElement, ctx, REACTIONS.map((r) => ({ id: `mech-${r.id}`, text: `Draw the ${r.title.split(":")[0]} mechanism${r.title.includes(":") ? ` (${r.title.split(":")[1].trim()})` : ""} with no help`, test: (st) => st.done === r.id })).concat([{ id: "mech-spot", text: "Spot the wrong arrow five times (use “Spot the error”)", test: (st) => st.spots >= 5 }, { id: "mech-exam", text: "Score 8/10 or more on an exam-style mechanism", test: (st) => st.exam >= 8 }]));

  // ---------- sources ----------
  const sel = q(".mx-src");
  const lv = q(".mx-level"); lv.value = prefs.level || "university";
  const fillSources = () => { sel.innerHTML = Object.entries(FAMILIES).map(([f, label]) => { const rs = REACTIONS.filter((r) => r.family === f && atLevel(r, lv.value)); return rs.length ? `<optgroup label="${esc(label)}">${rs.map((r) => `<option value="${r.id}">${esc(r.title)}</option>`).join("")}</optgroup>` : ""; }).join("") + `<optgroup label="Your own"><option value="mine">My drawing (from Structure mode)</option></optgroup>`; };
  fillSources();
  lv.addEventListener("change", () => { prefs.level = lv.value; onPrefs(prefs); fillSources(); load(REACTIONS.find((r) => r.id === src && atLevel(r, lv.value)) ? src : (REACTIONS.find((r) => atLevel(r, lv.value))?.id || "mine")); });
  sel.addEventListener("change", () => load(sel.value));
  q(".mx-type").addEventListener("click", (e) => { const b = e.target.closest("[data-t]"); if (!b) return; type = b.dataset.t; q(".mx-type").querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); });
  toggle(q(".mx-opts"), "δ+ δ−", showDelta, (v) => { showDelta = v; paint(); });
  toggle(q(".mx-opts"), "Atom labels", showLabels, (v) => { showLabels = v; paint(); });
  toggle(q(".mx-opts"), "Exam style", exam, (v) => { exam = v; load(src); });

  function load(id, mech = null) {
    stopAnim(); src = id; sel.value = id; pending = []; done = []; viewK = null; fb = null; finished = false; assisted = false; attempts = []; ecf = null; spot = null; stopTimer(); xq = null;
    if (mech) { inst = mech.reactionId ? instantiate(REACTIONS.find((r) => r.id === mech.reactionId)) : null; src = mech.reactionId || "mine"; sel.value = src; const rp = E.replay({ start: mech.start, steps: mech.steps }); states = rp.states; done = mech.steps.slice(0, rp.states.length - 1).map((s) => s.arrows); }
    else if (id === "mine") {
      inst = null; const m = getDrawing();
      states = m && m.atoms.length ? [E.fromDrawing(m)] : [];
      if (!states.length) fb = { kind: "info", html: "<p>Draw the reactants in <b>Structure</b> mode first (for example a halogenoalkane and a hydroxide ion, O with a − charge), then come back to push the electrons.</p>" };
    } else { inst = instantiate(REACTIONS.find((r) => r.id === id)); states = [inst.start]; }
    marks = { got: 0, total: inst ? inst.steps.reduce((t, s) => t + s.arrows.length, 0) : 0, first: [] };
    // a saved note with every step done opens as a finished mechanism: shown complete, not re-marked (it isn't an
    // attempt, so it earns no marks or challenges); an unfinished note stays editable from where it stopped
    if (mech && inst && done.length >= inst.steps.length) { finished = true; assisted = true; fb = { kind: "done", ecf: null, restored: true }; }
    if (inst) type = inst.steps[0].arrows[0].type; q(".mx-type").querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.t === type)));
    if (exam && inst && !finished) startExam();
    fitAll(); about(); actions(); refresh();
  }
  // ---------- exam style ----------
  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
  const elapsed = () => { const t = Math.round(((xq?.end || Date.now()) - (xq?.t0 || Date.now())) / 1000); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`; };
  function pickN(list, n, seed) { const r = [...list]; let x = seed || 7; for (let i = r.length - 1; i > 0; i--) { x = (x * 9301 + 49297) % 233280; const j = Math.floor((x / 233280) * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r.slice(0, n); }
  function startExam() {
    const r = inst.reaction, seed = Date.now() % 1000, cond = (x) => `${x.conditions.above}; ${x.conditions.below}`;
    const others = [...new Set(REACTIONS.filter((x) => x.id !== r.id).map(cond))].filter((c) => c !== cond(r));
    const firstSentence = (t) => t.split(/(?<=\.)\s/)[0];
    xq = { phase: "conditions", t0: Date.now(), cond: pickN([cond(r), ...pickN(others, 3, seed)], 4, seed + 1), condRight: cond(r),
      expl: pickN([r.misconceptions[0], ...pickN([...new Set([...r.steps.map((st) => firstSentence(st.explain)), firstSentence(r.overview), firstSentence(r.outcome)])], 3, seed + 5)], 4, seed + 2), explRight: r.misconceptions[0] };
    timer = setInterval(() => { if (xq && !xq.end) { const t = q(".mx-timer"); if (t) t.textContent = `⏱ ${elapsed()}`; } }, 1000);
  }
  function examPanel() {
    if (xq.phase === "conditions") return `<h4>Exam question</h4><p>${esc(inst.reaction.title.split(":")[1]?.trim() || inst.reaction.title)}: first, which reagents and conditions are used?</p><div class="rx-choices">${xq.cond.map((c, i) => `<button type="button" class="lab-btn" data-xc="${i}">${esc(c)}</button>`).join("")}</div>`;
    if (xq.phase === "explain") return `<h4>Last question</h4><p>Which of these would be a <b>mistake</b> in this mechanism?</p><div class="rx-choices mx-xpl">${xq.expl.map((c, i) => `<button type="button" class="lab-btn" data-xe="${i}">${esc(c)}</button>`).join("")}</div>`;
    return "";
  }
  const cur = () => states[states.length - 1];
  const shown = () => (viewK != null ? states[viewK] : cur());
  function fitAll() {
    const all = inst ? E.replay({ start: inst.start, steps: inst.steps }).states : states; const pts = all.flatMap((s) => s.atoms);
    if (!pts.length) { view = { cx: 0, cy: 0, s: 40 }; return; }
    const x0 = Math.min(...pts.map((a) => a.x)) - 1.4, x1 = Math.max(...pts.map((a) => a.x)) + 1.4, y0 = Math.min(...pts.map((a) => a.y)) - 1.4, y1 = Math.max(...pts.map((a) => a.y)) + 1.4;
    view = { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, s: Math.min(58, W / (x1 - x0), H / (y1 - y0)) };
  }

  // ---------- geometry of lone pairs and arrows ----------
  const bondsOf = (s, id) => s.bonds.filter((b) => b.a === id || b.b === id);
  const labelled = (s, a) => a.el !== "C" || E.charge(s, a.id) !== 0 || !bondsOf(s, a.id).length;
  function dots(s) {
    const out = new Map();
    for (const a of s.atoms) {
      const pairs = Math.floor(a.n / 2), single = a.n % 2; if (!pairs && !single) continue;
      const nb = bondsOf(s, a.id).map((b) => E.atomOf(s, b.a === a.id ? b.b : b.a)), dirs = nb.map((o) => Math.atan2(o.y - a.y, o.x - a.x));
      const mx = nb.reduce((t, o) => t + (o.x - a.x), 0), lab = labelled(s, a);
      if (lab && a.h) dirs.push(mx > 0.2 && nb.length === 1 ? Math.PI : 0);
      const cand = Array.from({ length: 12 }, (_, k) => -Math.PI / 2 + (k * Math.PI) / 6), chosen = [];
      const sep = (x, y) => Math.abs(Math.atan2(Math.sin(x - y), Math.cos(x - y)));
      for (let k = 0; k < pairs + single; k++) { let best = cand[0], bs = -1; for (const c of cand) { const occ = [...dirs, ...chosen], d = occ.length ? Math.min(...occ.map((o) => sep(o, c))) : Math.PI; const sc = d + (Math.abs(Math.sin(2 * c)) < 0.01 ? 0.05 : 0); if (sc > bs + 1e-9) { bs = sc; best = c; } } chosen.push(best); }
      const r = lab ? (a.h ? 0.5 : 0.44) : 0.32;
      out.set(a.id, chosen.map((t, k) => ({ x: a.x + r * Math.cos(t), y: a.y + r * Math.sin(t), t, single: k >= pairs })));
    }
    return out;
  }
  function anchors(s, arrow, D = dots(s)) {
    const atom = (id) => E.atomOf(s, id), mid = (b) => { const p = atom(b.a), r = atom(b.b); return [(p.x + r.x) / 2, (p.y + r.y) / 2]; };
    let tgt;
    if (arrow.to.atom != null) tgt = atom(arrow.to.atom) && [atom(arrow.to.atom).x, atom(arrow.to.atom).y];
    else { const [p, r] = arrow.to.between.map(atom); if (!p || !r) return null; const b = E.bondBetween(s, p.id, r.id); tgt = b ? mid(b) : [(p.x + r.x) / 2, (p.y + r.y) / 2]; }
    if (!tgt) return null;
    let s0;
    if (arrow.from.lp != null) { const ds = D.get(arrow.from.lp) || [], a = atom(arrow.from.lp); if (!a) return null; const pool = arrow.type === "single" && ds.some((d) => d.single) ? ds.filter((d) => d.single) : ds.filter((d) => !d.single).length ? ds.filter((d) => !d.single) : ds; s0 = pool.length ? pool.reduce((m, d) => (Math.hypot(d.x - tgt[0], d.y - tgt[1]) < Math.hypot(m.x - tgt[0], m.y - tgt[1]) ? d : m)) : a; s0 = [s0.x, s0.y]; }
    else if (arrow.from.bond != null || arrow.from.ends) { const b = (arrow.from.bond != null && E.bondOf(s, arrow.from.bond)) || (arrow.from.ends && E.bondBetween(s, ...arrow.from.ends)); if (!b) return null; s0 = mid(b); }
    else { const a = atom(arrow.from.atom); if (!a) return null; s0 = [a.x, a.y]; }
    if (arrow.to.atom != null) { const dx = s0[0] - tgt[0], dy = s0[1] - tgt[1], L = Math.hypot(dx, dy) || 1, off = Math.min(0.32, L * 0.4); tgt = [tgt[0] + (dx / L) * off, tgt[1] + (dy / L) * off]; }
    const cx = s.atoms.reduce((t, a) => t + a.x, 0) / s.atoms.length, cy = s.atoms.reduce((t, a) => t + a.y, 0) / s.atoms.length;
    const mx = (s0[0] + tgt[0]) / 2, my = (s0[1] + tgt[1]) / 2, dx = tgt[0] - s0[0], dy = tgt[1] - s0[1], L = Math.hypot(dx, dy) || 1;
    let nx = -dy / L, ny = dx / L; if ((mx - cx) * nx + (my - cy) * ny < 0) { nx = -nx; ny = -ny; }
    const bow = Math.max(0.42, Math.min(1.1, L * 0.38));
    return [s0, [mx + nx * bow, my + ny * bow], tgt];
  }
  const X = (x) => (x - view.cx) * view.s + W / 2, Y = (y) => (y - view.cy) * view.s + H / 2;
  function arrowSvg(pts, kind, col, t = 1) {
    let [p0, c, p2] = pts;
    if (t < 1) { const q0 = [lerp(p0[0], c[0], t), lerp(p0[1], c[1], t)], q1 = [lerp(c[0], p2[0], t), lerp(c[1], p2[1], t)]; p2 = [lerp(q0[0], q1[0], t), lerp(q0[1], q1[1], t)]; c = q0; }
    const P = (p) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`, ang = Math.atan2(Y(p2[1]) - Y(c[1]), X(p2[0]) - X(c[0])), hl = Math.max(8, view.s * 0.26), w = Math.max(1.6, view.s * 0.055);
    const tip = [X(p2[0]), Y(p2[1])], b1 = [tip[0] - hl * Math.cos(ang - 0.42), tip[1] - hl * Math.sin(ang - 0.42)], b2 = [tip[0] - hl * Math.cos(ang + 0.42), tip[1] - hl * Math.sin(ang + 0.42)];
    const head = t < 0.98 ? "" : kind === "single" ? `<path d="M${tip.join(",")}L${b1.join(",")}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" fill="none"/>` : `<path d="M${tip.join(",")}L${b1.join(",")}L${b2.join(",")}Z" fill="${col}"/>`;
    return `<path d="M${P(p0)}Q${P(c)} ${P(p2)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>${head}`;
  }
  // the structure as SVG content (no outer element), with lone pairs, radicals, δ charges and highlights
  function layer(s, { arrows = [], arrowCols = [], t = 1, formed = [], broken = [], bad = new Set(), hi = null } = {}) {
    const pal = palette(), P = K.PALETTES[pal], dm = E.toDrawing(s), A = { hcount: dm.hcount, problems: [], stereo: [] };
    const svg = K.render(dm.m, A, view, [W, H], { palette: pal, grid: false, showC: false });
    const inner = svg.slice(svg.indexOf(">") + 1, svg.lastIndexOf("</svg>")).replace(/^<rect[^>]*\/>/, "");
    const under = [], over = [];
    const seg = (a, b, col, w) => { const p = E.atomOf(s, a), r = E.atomOf(s, b); if (p && r) under.push(`<line x1="${X(p.x)}" y1="${Y(p.y)}" x2="${X(r.x)}" y2="${Y(r.y)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`); };
    for (const c of formed) seg(c.a, c.b, COL.form, view.s * 0.32);
    for (const c of broken) seg(c.a, c.b, COL.brk, view.s * 0.32);
    for (const id of bad) { const a = E.atomOf(s, id); if (a) under.push(`<circle cx="${X(a.x)}" cy="${Y(a.y)}" r="${view.s * 0.4}" fill="none" stroke="${COL.bad}" stroke-width="2.5" stroke-dasharray="4 3"/>`); }
    if (hi) { const a = hi.type === "atom" && E.atomOf(s, hi.id); if (a) under.push(`<circle cx="${X(a.x)}" cy="${Y(a.y)}" r="${view.s * 0.34}" fill="${P.hover}"/>`); if (hi.type === "bond") { const b = E.bondOf(s, hi.id); if (b) seg(b.a, b.b, P.hover, view.s * 0.34); } if (hi.type === "lp") { const d = (dots(s).get(hi.id) || []); for (const p of d) under.push(`<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="${view.s * 0.16}" fill="${P.hover}"/>`); } }
    const D = dots(s), dr = Math.max(1.8, view.s * 0.055);
    for (const [id, ds] of D) { const a = E.atomOf(s, id), col = P.el[a.el] || P.bond; for (const d of ds) { if (d.single) { over.push(`<circle cx="${X(d.x)}" cy="${Y(d.y)}" r="${dr * 1.15}" fill="${col}"/>`); continue; } const ox = -Math.sin(d.t) * 0.09, oy = Math.cos(d.t) * 0.09; over.push(`<circle cx="${X(d.x + ox)}" cy="${Y(d.y + oy)}" r="${dr}" fill="${col}"/><circle cx="${X(d.x - ox)}" cy="${Y(d.y - oy)}" r="${dr}" fill="${col}"/>`); } }
    if (showDelta) for (const { atom, sign } of E.partialCharges(s)) { const a = E.atomOf(s, atom); over.push(`<text x="${X(a.x) - view.s * 0.42}" y="${Y(a.y) - view.s * 0.36}" font-size="${Math.max(10, view.s * 0.3)}" fill="${P.mute}" font-family="Geist, system-ui, sans-serif" text-anchor="middle">${sign}</text>`); }
    if (showLabels) for (const a of s.atoms) over.push(`<text x="${X(a.x) + view.s * 0.3}" y="${Y(a.y) + view.s * 0.5}" font-size="${Math.max(9, view.s * 0.22)}" fill="${P.accent}" font-family="Geist Mono, monospace">${esc(E.atomLabel(s, a.id))}</text>`);
    arrows.forEach((ar, i) => { const pts = anchors(s, ar, D); if (pts) over.push(arrowSvg(pts, ar.type, arrowCols[i] || COL.pend, typeof t === "number" ? t : t[i])); });
    return under.join("") + inner + over.join("");
  }
  function arrowNumbers(s, arrows) {
    const D = dots(s); return arrows.map((a, i) => { const pts = anchors(s, a, D); if (!pts) return ""; const [x, y] = pts[1]; return `<circle cx="${X(x)}" cy="${Y(y)}" r="10" fill="${K.PALETTES[palette()].bg}" stroke="${COL.pend}" stroke-width="1.5"/><text x="${X(x)}" y="${Y(y) + 4}" font-size="12" font-weight="700" text-anchor="middle" fill="${COL.pend}" font-family="Geist, system-ui, sans-serif">${i + 1}</text>`; }).join("");
  }
  const frame = (content) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-hidden="true"><rect width="${W}" height="${H}" fill="${K.PALETTES[palette()].bg}"/>${content}</svg>`;

  // ---------- painting ----------
  function paint(extra = null) {
    if (anim) return;
    if (!states.length) { svgHost.innerHTML = frame(""); return; }
    if (spot) { const cols = spot.f.arrows.map((_, i) => (spot.picked == null ? COL.pend : i === spot.f.wrong ? COL.bad : i === spot.picked ? COL.pend : COL.good)); svgHost.innerHTML = frame(layer(spot.state, { arrows: spot.f.arrows, arrowCols: cols }) + arrowNumbers(spot.state, spot.f.arrows)); return; }
    const s = shown();
    if (viewK != null) { svgHost.innerHTML = frame(layer(s, { arrows: done[viewK] || [], arrowCols: (done[viewK] || []).map(() => COL.good) })); return; }
    const bad = new Set((fb?.errors || []).map((e) => e.atom).filter((x) => x != null)), badArrows = new Set((fb?.errors || []).map((e) => e.arrow).filter((x) => x != null));
    const arrows = [...pending], cols = pending.map((_, i) => (badArrows.has(i) ? COL.bad : COL.pend));
    if (extra?.ghost) { arrows.push(extra.ghost); cols.push(COL.pend); }
    let content = layer(s, { arrows, arrowCols: cols, bad, hi: hover });
    if (extra?.free) { const [p0, p1] = extra.free; content += `<path d="M${X(p0[0])},${Y(p0[1])}Q${X((p0[0] + p1[0]) / 2) + 20},${Y((p0[1] + p1[1]) / 2) - 20} ${X(p1[0])},${Y(p1[1])}" stroke="${COL.pend}" stroke-width="2" stroke-dasharray="5 4" fill="none"/>`; }
    svgHost.innerHTML = frame(content);
  }
  function refresh() { paint(); stepsStrip(); feedback(); kbd(); hint(); tutor?.refresh(); }
  const hint = () => { q(".mx-hint").textContent = spot ? "Spot the error: one of these arrows is wrong. Tap its number (or choose it in the panel)." : viewK != null ? "Viewing an earlier step. Choose the current step below to carry on drawing." : finished ? "Mechanism complete. Press Play to watch it, or choose another." : states.length ? `Drag from a lone pair (••) or a bond to an atom or a bond. Start a bond's arrow near one end to make the new bond from that end. Tap an arrow's tail again to remove it. ${type === "single" ? "Fishhook: one electron." : "Curly: two electrons."}` : ""; };

  // ---------- drawing arrows ----------
  const world = (e) => { const r = svgHost.getBoundingClientRect(); return [(e.clientX - r.left - W / 2) / view.s + view.cx, (e.clientY - r.top - H / 2) / view.s + view.cy]; };
  function pick(x, y, forSource) {
    const s = cur();
    if (forSource) for (const [id, ds] of dots(s)) for (const d of ds) if (Math.hypot(d.x - x, d.y - y) < 0.22) return { type: "lp", id };
    let best = null, bd = forSource ? 0.24 : 0.4;
    for (const a of s.atoms) { const d = Math.hypot(a.x - x, a.y - y); if (d < bd) { bd = d; best = { type: "atom", id: a.id }; } }
    if (best) return best;
    for (const b of s.bonds) { const p = E.atomOf(s, b.a), r = E.atomOf(s, b.b), dx = r.x - p.x, dy = r.y - p.y, L2 = dx * dx + dy * dy || 1, t = Math.max(0, Math.min(1, ((x - p.x) * dx + (y - p.y) * dy) / L2)); if (t > 0.15 && t < 0.85 && Math.hypot(p.x + t * dx - x, p.y + t * dy - y) < 0.26) return { type: "bond", id: b.id, t }; }
    return null;
  }
  const fromOf = (h) => (h.type === "lp" ? { lp: h.id } : h.type === "bond" ? { bond: h.id } : { atom: h.id });
  // an arrow that starts near one end of a bond and ends on another atom forms the new bond from that end (as drawn
  // in exam answers); started near the middle, the end nearer the target is used
  const toFor = (from, h) => { if (from.type === "bond" && h.type === "atom" && from.t != null && (from.t < 0.42 || from.t > 0.58)) { const b = E.bondOf(cur(), from.id); if (b && b.a !== h.id && b.b !== h.id) return { between: [from.t < 0.42 ? b.a : b.b, h.id] }; } return toOf(h); };
  const toOf = (h) => { if (h.type === "bond") { const b = E.bondOf(cur(), h.id); return { between: [b.a, b.b] }; } return { atom: h.id }; };
  // in exam style nothing can be drawn or checked until the conditions question is answered (pointer or keyboard)
  const locked = () => exam && xq && xq.phase === "conditions";
  function addArrow(a) {
    if (locked()) return;
    const n = E.normalize(cur(), a); pending.push(a); finished = false;
    fb = n.error ? { kind: "arrow", errors: [{ arrow: pending.length - 1, ...n.error }], html: "" } : null;
    refresh();
  }
  svgHost.addEventListener("pointerdown", (e) => {
    if (spot && spot.picked == null) { const [x, y] = world(e), D = dots(spot.state); let best = -1, bd = 0.6; spot.f.arrows.forEach((a, i) => { const pts = anchors(spot.state, a, D); if (pts) { const d = Math.hypot(pts[1][0] - x, pts[1][1] - y); if (d < bd) { bd = d; best = i; } } }); if (best >= 0) pickSpot(best); return; }
    if (spot || !states.length || viewK != null || finished || anim || (exam && xq?.phase === "conditions")) return; svgHost.focus({ preventScroll: true });
    const [x, y] = world(e), h = pick(x, y, true); if (!h) return;
    // tapping the tail of an existing arrow removes it
    const D = dots(cur()), i = pending.findIndex((a) => { const pts = anchors(cur(), a, D); return pts && Math.hypot(pts[0][0] - x, pts[0][1] - y) < 0.2; });
    drag = { h, x, y, remove: i, moved: false }; svgHost.setPointerCapture(e.pointerId);
  });
  svgHost.addEventListener("pointermove", (e) => {
    if (spot || anim || !states.length || viewK != null) return; const [x, y] = world(e);
    if (!drag) { const h = pick(x, y, true); if (JSON.stringify(h) !== JSON.stringify(hover)) { hover = h; paint(); } return; }
    if (Math.hypot(x - drag.x, y - drag.y) > 0.2) drag.moved = true;
    const t = pick(x, y, false);
    if (t && !(t.type === drag.h.type && t.id === drag.h.id)) paint({ ghost: { type, from: fromOf(drag.h), to: toFor(drag.h, t) } });
    else { const p0 = drag.h.type === "lp" ? [x, y] : [drag.x, drag.y]; paint({ free: [p0, [x, y]] }); }
  });
  svgHost.addEventListener("pointerup", (e) => {
    if (!drag) return; const d = drag; drag = null; const [x, y] = world(e);
    if (!d.moved && d.remove >= 0) { pending.splice(d.remove, 1); fb = null; refresh(); return; }
    const t = pick(x, y, false);
    if (!t || (t.type === d.h.type && t.id === d.h.id)) { paint(); return; }
    addArrow({ type, from: fromOf(d.h), to: toFor(d.h, t) });
  });
  svgHost.addEventListener("pointerleave", () => { if (!drag && hover) { hover = null; paint(); } });
  svgHost.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") { e.preventDefault(); pending.pop(); fb = null; refresh(); }
    else if (e.key === "Enter" && pending.length) { e.preventDefault(); check(); }
  });
  // the same, from two lists (keyboard and screen readers)
  function kbd() {
    const s = states.length && viewK == null && !finished && !spot && !locked() ? cur() : null, f = q(".mx-from"), t = q(".mx-to"), e = q(".mx-end");
    if (!s) { f.innerHTML = t.innerHTML = e.innerHTML = ""; endPick(); return; }
    const L = (id) => E.atomLabel(s, id);
    f.innerHTML = s.atoms.filter((a) => a.n > 0).map((a) => `<option value="lp:${a.id}">${a.n % 2 && a.n < 2 ? "unpaired electron" : "lone pair"} on ${esc(L(a.id))}</option>`).join("") + s.bonds.map((b) => `<option value="bond:${b.id}">${esc(L(b.a))}${b.e >= 6 ? "≡" : b.e >= 4 ? "=" : "–"}${esc(L(b.b))} bond</option>`).join("");
    t.innerHTML = s.atoms.map((a) => `<option value="atom:${a.id}">atom ${esc(L(a.id))}</option>`).join("") + s.bonds.map((b) => `<option value="bond:${b.id}">${esc(L(b.a))}–${esc(L(b.b))} bond</option>`).join("");
    endPick();
  }
  // a bond's electrons moving to an atom form a new bond from one end of that bond: which end is chosen here (the
  // pointer equivalent is starting the arrow near that end); "automatic" leaves it to the end nearer the atom
  function endPick() {
    const wrap = q(".mx-endsel"), sel = q(".mx-end"), [fk, fi] = q(".mx-from").value.split(":"), [tk] = q(".mx-to").value.split(":"), s = states.length ? cur() : null;
    const b = s && fk === "bond" ? E.bondOf(s, Number(fi)) : null, show = !!(b && tk === "atom");
    wrap.hidden = !show;
    if (show) { const keep = sel.value; sel.innerHTML = `<option value="">automatic (the end nearer the atom)</option>${[b.a, b.b].map((id) => `<option value="${id}">${esc(E.atomLabel(s, id))}</option>`).join("")}`; if ([...sel.options].some((o) => o.value === keep)) sel.value = keep; }
  }
  q(".mx-from").addEventListener("change", endPick); q(".mx-to").addEventListener("change", endPick);
  button(q(".mx-addbtn"), "Add arrow", () => {
    const [fk, fi] = q(".mx-from").value.split(":"), [tk, ti] = q(".mx-to").value.split(":"); if (!fk || !tk) return;
    const end = q(".mx-endsel").hidden ? "" : q(".mx-end").value, b = fk === "bond" ? E.bondOf(cur(), Number(fi)) : null;
    const to = b && tk === "atom" && end && Number(end) !== Number(ti) && b.a !== Number(ti) && b.b !== Number(ti) ? { between: [Number(end), Number(ti)] } : toOf({ type: tk, id: Number(ti) });
    addArrow({ type, from: fromOf({ type: fk, id: Number(fi) }), to });
  });

  // ---------- checking ----------
  const keys = (s, arrows) => arrows.map((a) => E.arrowKey(s, a));
  function describeKey(s, a) { const n = E.normalize(s, a); if (n.error) return "an arrow"; return n.src.atom != null ? (n.e === 1 ? "a fishhook from an unpaired electron" : "an arrow from a lone pair") : n.dst.atom != null ? (n.e === 1 ? "a fishhook that splits a bond" : "an arrow that breaks a bond, sending both electrons to one atom") : (n.e === 1 ? "a fishhook that moves one bond electron into a new bond" : "an arrow that moves a bond's electrons into a new bond"); }
  function advance(arrows, move) {
    const r = E.applyStep(cur(), arrows); let next = r.state;
    if (move) { next = JSON.parse(JSON.stringify(next)); for (const [id, [x, y]] of Object.entries(move)) { const a = E.atomOf(next, Number(id)); if (a) { a.x = x; a.y = y; } } }
    states.push(next); done.push(arrows); pending = [];
    return r;
  }
  function check() {
    if (locked()) return;
    if (spot) { spot = null; fb = null; }
    if (!pending.length) { fb = { kind: "info", html: "<p>Draw the arrows for this step first.</p>" }; refresh(); return; }
    const s = cur(), r = E.applyStep(s, pending), k = done.length;
    if (!inst) {
      if (!r.ok) { fb = { kind: "bad", errors: r.errors, warnings: r.warnings, checks: r.checks, steps: [] }; refresh(); return; }
      const prev = s; advance(pending.slice(), null); fb = { kind: "good", result: r, title: `Step ${k + 1} applied`, prev, steps: r.steps, warnings: r.warnings, checks: r.checks }; play([k]); return;
    }
    const st = inst.steps[k];
    attempts[k] = (attempts[k] || 0) + 1;
    if (ecf != null) {
      // error carried forward: the template's atoms are no longer where its arrows expect, so the step is marked by
      // whether it is valid and does the same kinds of electron movement as the model step at this point
      const model = E.replay({ start: inst.start, steps: inst.steps.slice(0, k) }).states.at(-1), want = arrowKinds(model, st.arrows), got = arrowKinds(s, pending);
      if (!r.ok) { fb = { kind: "bad", errors: r.errors, warnings: r.warnings, checks: r.checks }; refresh(); return; }
      const same = want.length === got.length && want.every((w, i) => w === got[i]);
      if (attempts[k] === 1) marks.first[k] = same ? st.arrows.length : 0;
      if (!same) { fb = { kind: "bad", errors: [], notes: [`Valid, but this isn't the kind of step the mechanism needs here (${st.label.toLowerCase()}). ${st.hint}`], checks: r.checks }; refresh(); return; }
      const prev = s; advance(pending.slice(), null);
      fb = { kind: "good", title: attempts[k] === 1 ? "Credited (error carried forward)" : "Right kind of step now", steps: r.steps, warnings: r.warnings.filter((w) => w.code !== "assumed"), checks: r.checks, explain: `Marked on your own intermediate: ${st.explain}`, prev };
      if (states.length - 1 === inst.steps.length) finish(); else play([k]);
      return;
    }
    const exp = E.applyStep(s, st.arrows), mine = keys(s, pending), want = keys(s, st.arrows);
    const right = want.filter((w) => mine.includes(w)).length;
    if (attempts[k] === 1) marks.first[k] = stepCredit({ valid: r.ok, matches: r.ok && E.sameState(r.state, exp.state), found: right, submitted: pending.length, expected: want.length });
    if (r.ok && E.sameState(r.state, exp.state)) {
      const prev = s; advance(pending.slice(), st.move);
      fb = { kind: "good", title: attempts[k] === 1 ? "Correct" : "Correct now", steps: r.steps, warnings: r.warnings.filter((w) => w.code !== "assumed"), checks: r.checks, explain: st.explain, prev };
      if (states.length - 1 === inst.steps.length) finish(); else play([k]);
      return;
    }
    const plain = `${inst.reaction.title}, step ${k + 1}`;
    ctx.fail?.(`mech-${inst.reaction.id}`, plain);
    const notes = [];
    if (r.ok) {
      for (const m of inst.reaction.mistakes || []) if (m.test(r.state, inst.key)) notes.push(m.text);
      for (const w of r.warnings) if (w.code === "unstable-cation") notes.push(w.text);
      if (!notes.length) notes.push("Every arrow is chemically possible, but this isn't what happens in this reaction.");
    }
    const missing = st.arrows.filter((a, i) => !mine.includes(want[i])), extra = pending.map((a, i) => (want.includes(mine[i]) ? -1 : i)).filter((i) => i >= 0);
    fb = { kind: "bad", errors: [...r.errors, ...extra.map((i) => ({ arrow: i, code: "extra", text: `Arrow ${i + 1} isn't part of this step.` }))], warnings: r.warnings.filter((w) => w.code !== "unstable-cation"), checks: r.checks, notes, right, of: want.length, canCarry: r.ok && k < inst.steps.length - 1,
      missing: missing.length ? `Still needed: ${[...new Set(missing.map((a) => describeKey(s, a)))].join("; ")}.` : "" };
    refresh();
  }
  function finish() {
    finished = true; marks.got = marks.first.reduce((t, x) => t + (x || 0), 0);
    if (exam && xq) xq.phase = "explain";
    const unaided = !assisted && marks.got === marks.total;
    if (unaided) ch.check({ done: inst.reaction.id });
    fb = { ...(fb || {}), kind: "done", ecf };
    feedback();
    play(done.map((_, i) => i).slice(-1));
  }
  function showNext(all = false) {
    if (!inst || finished) return;
    if (ecf != null) { if (all) { load(src); showNext(true); } else { fb = { kind: "info", html: "<p>You're working from your own intermediate (error carried forward), so the model's next step doesn't apply to it. Use <b>Full solution</b> to see the model answer from the start, or <b>Restart</b>.</p>" }; feedback(); } return; }
    assisted = true; pending = [];
    const k = done.length; marks.first[k] = marks.first[k] ?? 0; attempts[k] = (attempts[k] || 0) + 1;
    const from = done.length;
    const run = all ? inst.steps.slice(k) : [inst.steps[k]];
    for (const st of run) advance(st.arrows, st.move);
    const last = inst.steps[done.length - 1];
    fb = { kind: "shown", title: all ? "Full solution" : `Step ${k + 1} shown`, explain: last.explain, steps: E.applyStep(states[states.length - 2], last.arrows).steps };
    if (states.length - 1 === inst.steps.length) { finished = true; marks.got = marks.first.reduce((t, x) => t + (x || 0), 0); fb.kind = "done"; }
    play(done.map((_, i) => i).slice(from));
  }

  // ---------- feedback ----------
  function feedback() {
    const box = q(".mx-fb");
    if (!states.length) { box.innerHTML = fb?.html || ""; return; }
    const checks = (cs) => (cs ? `<ul class="mx-checks">${cs.filter((c) => c.ok != null).map((c) => `<li class="${c.ok ? "ok" : "no"}">${c.ok ? "✓" : "✗"} ${esc(c.label)}</li>`).join("")}</ul>` : "");
    const list = (xs, cls) => (xs?.length ? `<ul class="mx-list ${cls}">${xs.map((x) => `<li>${esc(typeof x === "string" ? x : x.text)}</li>`).join("")}</ul>` : "");
    const head = inst ? `<p class="osk-aka">Step ${Math.min(done.length + 1, inst.steps.length)} of ${inst.steps.length}${marks.total ? ` · marks ${marks.first.reduce((t, x) => t + (x || 0), 0)}/${marks.total}` : ""}</p>` : `<p class="osk-aka">Your own structure: each step is checked for chemical consistency (electron sources, valence, charges, electron count). There's no reaction template to compare it with.</p>`;
    let body = "";
    const examHead = exam && xq ? `<p class="osk-aka mx-exam">Exam style · no hints · <span class="mx-timer">⏱ ${elapsed()}</span></p>` : "";
    if (exam && xq && (xq.phase === "conditions" || xq.phase === "explain")) { box.innerHTML = head + examHead + examPanel(); return; }
    if (!fb) body = viewK != null ? "" : `<p>${inst ? esc(inst.steps[done.length]?.label ? `Next: draw the arrows that lead to “${inst.steps[done.length].label}”.` : "") : "Draw an arrow, then press Apply step."}</p>`;
    else if (fb.kind === "info") body = fb.html;
    else if (fb.kind === "arrow") body = `<h4 class="no">Check this arrow</h4>${list(fb.errors, "no")}`;
    else if (fb.kind === "bad") body = `<h4 class="no">Not yet${fb.of ? `: ${fb.right} of ${fb.of} arrows right` : ""}</h4>${list(fb.errors, "no")}${list(fb.notes, "")}${fb.missing ? `<p>${esc(fb.missing)}</p>` : ""}${list(fb.warnings, "warn")}${checks(fb.checks)}${fb.canCarry ? `<p class="osk-aka">Your step is chemically valid. You can fix it, or carry on from your own intermediate: later steps are then marked on what you drew (error carried forward).</p><button type="button" class="lab-btn" data-ecf>Carry on with my step</button>` : ""}`;
    else if (fb.kind === "spot") body = fb.html;
    else if (fb.kind === "good" || fb.kind === "shown") body = `<h4 class="ok">${esc(fb.title || "")}</h4>${list(fb.steps, "")}${list(fb.warnings, "warn")}${fb.explain ? `<p class="mx-why">${esc(fb.explain)}</p>` : ""}${checks(fb.checks)}`;
    else if (fb.kind === "done") {
      const sp = E.species(cur()), names = sp.map((x) => { if (x.radical || x.charge) return sub(x.formula); const sub2 = { atoms: cur().atoms.filter((a) => x.atoms.includes(a.id)), bonds: cur().bonds.filter((b) => x.atoms.includes(b.a)) }; const nm = K.analyse(E.toDrawing(sub2).m).name?.name; return nm ? `${esc(nm)} (${sub(x.formula)})` : sub(x.formula); });
      const bd = inst && !fb.restored ? breakdown({ arrows: inst.steps.map((st) => st.arrows.length), first: marks.first, ecf, conditions: exam && xq ? xq.condOK : null, explanation: exam && xq ? xq.explOK : null, assisted }) : null;
      const table = bd ? `<table class="mx-marks"><caption>Mark breakdown${exam && xq ? ` · time ${elapsed()}` : ""}</caption>${bd.rows.map((r) => `<tr><td>${esc(r.label)}${r.note ? `<small>${esc(r.note)}</small>` : ""}</td><td>${r.max ? `${r.got}/${r.max}` : ""}</td></tr>`).join("")}<tr class="tot"><td>Total</td><td>${bd.got}/10</td></tr></table>` : "";
      body = `<h4 class="ok">Mechanism complete${bd ? `: ${bd.got}/10${assisted ? " (with help)" : ""}` : ""}</h4>${fb.restored ? `<p class="osk-aka">Opened from your notes: a saved mechanism isn't marked again.</p>` : ""}${table}${fb.ecf != null ? `<p class="osk-aka">Error carried forward from step ${fb.ecf + 1}: the steps after it were marked on your own intermediate, so the products differ from the model answer. Use Full solution to compare.</p>` : ""}<p><small>Products</small><br>${names.join(" + ")}</p>${inst ? `<p class="mx-why">${esc(inst.reaction.outcome)}</p>` : ""}${list(fb.steps, "")}`;
    }
    box.innerHTML = head + examHead + body;
  }
  q(".mx-fb").addEventListener("click", (e) => {
    const xc = e.target.closest("[data-xc]"), xe = e.target.closest("[data-xe]");
    if (xc && xq?.phase === "conditions") { xq.condOK = xq.cond[Number(xc.dataset.xc)] === xq.condRight; xq.phase = "draw"; fb = { kind: "info", html: `<p class="lab-msg ${xq.condOK ? "ok" : ""}">${xq.condOK ? "✓ Right." : `✗ It's ${esc(xq.condRight)}.`} Now draw the mechanism; there are no hints in exam style.</p>` }; about(); refresh(); return; }
    if (xe && xq?.phase === "explain") { xq.explOK = xq.expl[Number(xe.dataset.xe)] === xq.explRight; xq.phase = "done"; xq.end = Date.now(); stopTimer(); const bd = breakdown({ arrows: inst.steps.map((st) => st.arrows.length), first: marks.first, ecf, conditions: xq.condOK, explanation: xq.explOK, assisted }); if (!assisted) ch.check({ exam: bd.got }); if (bd.got < 8) ctx.fail?.("mech-exam", inst.reaction.title); fb = { kind: "done" }; refresh(); return; }
    if (e.target.closest("[data-ecf]") && pending.length && inst) { const k = done.length, r = E.applyStep(cur(), pending); if (!r.ok) return; ecf = ecf ?? k; const prev = cur(); advance(pending.slice(), null); fb = { kind: "good", title: "Carried forward", steps: r.steps, warnings: r.warnings.filter((w) => w.code !== "assumed"), checks: r.checks, explain: "You're now working from your own intermediate. Later steps earn marks when they're valid and do what the mechanism needs at that point.", prev }; if (states.length - 1 === inst.steps.length) finish(); else play([k]); return; }
    const g = e.target.closest("[data-spot]"); if (g && spot && spot.picked == null) pickSpot(Number(g.dataset.spot));
    if (e.target.closest("[data-spot-next]")) startSpot();
    if (e.target.closest("[data-spot-end]")) { spot = null; fb = null; refresh(); }
  });
  // ---------- spot the error ----------
  function startSpot() {
    if (!inst) return; stopAnim();
    const model = E.replay({ start: inst.start, steps: inst.steps }).states, order = inst.steps.map((_, i) => (i + spotSeed) % inst.steps.length);
    let f = null, k = 0; for (const i of order) { f = faultyStep(inst, i, spotSeed); if (f) { k = i; break; } }
    spotSeed++;
    if (!f) { fb = { kind: "info", html: "<p>No checked error is available for this reaction.</p>" }; refresh(); return; }
    spot = { f, k, state: model[k], picked: null };
    fb = { kind: "spot", html: `<h4>Spot the error</h4><p>Step ${k + 1} of ${esc(inst.reaction.title)}: “${esc(inst.steps[k].label)}”. One arrow is wrong. Which?</p><div class="rx-choices">${f.arrows.map((_, i) => `<button type="button" class="lab-btn" data-spot="${i}">Arrow ${i + 1}</button>`).join("")}</div>` };
    refresh();
  }
  function pickSpot(i) {
    const f = spot.f, ok = i === f.wrong; spot.picked = i;
    if (ok) { spots++; ch.check({ spots }); } else ctx.fail?.("mech-spot", inst.reaction.title);
    const right = !ok ? `<p>Arrow ${i + 1} is right: it is ${esc(describeKey(spot.state, f.arrows[i]))}.</p>` : "";
    fb = { kind: "spot", html: `<h4 class="${ok ? "ok" : "no"}">${ok ? `Yes: arrow ${f.wrong + 1} is wrong` : `Not that one: arrow ${f.wrong + 1} is wrong`}</h4>${right}<p class="mx-why">${esc(f.why)}</p><p class="osk-aka">${spots} spotted so far.</p><div class="lab-row"><button type="button" class="lab-btn pri" data-spot-next>Another</button><button type="button" class="lab-btn" data-spot-end>Back to the mechanism</button></div>` };
    refresh();
  }
  // the AI tutor, given the engine's verdict on the learner's arrows (tutorContext); not offered in exam style
  const tutor = mountTutor(q(".mx-tutor"), { ask: ctx.ask || null, onUse: () => { if (inst) assisted = true; },
    getContext: () => { if (!states.length || exam || spot) return null; const s = cur(), r = pending.length ? E.applyStep(s, pending) : null; return { kind: "mechanism", confidence: "provisional", overview: inst?.reaction.overview || null, step: inst ? `${done.length + 1} of ${inst.steps.length}: towards “${inst.steps[done.length]?.label || "the products"}”` : null, ...E.tutorContext({ title: inst?.reaction.title || "My mechanism", reaction: inst?.reaction, state: s, arrows: pending, result: r, stepIndex: done.length, expected: inst && r ? E.sameState(r.state, E.applyStep(s, inst.steps[done.length].arrows).state) : null }) }; },
    learner: () => ({ mistakes: attempts.map((n, k) => (n > 1 ? { topic: `${inst?.reaction.title || "mechanism"}, step ${k + 1}`, count: n - 1 } : null)).filter(Boolean) }),
    intents: [["mechanism", "Explain the verdict on my arrows", (c) => c.arrows?.length], ["guide", "Guide me through this step"], ["explain", "Explain this mechanism"]] });
  function about() {
    const box = q(".mx-about"), r = inst?.reaction;
    q(".mx-cond").innerHTML = r && exam && xq?.phase === "conditions" ? `<span class="mx-rxn">${esc(r.title.split(":")[1]?.trim() || r.title)}</span><span class="mx-fam">Conditions hidden until you answer</span>` : r ? `<span class="mx-rxn">${esc(r.title.split(":")[1]?.trim() || r.title)}</span><span class="mx-arrow"><small>${esc(r.conditions.above)}</small><b>⟶</b><small>${esc(r.conditions.below)}</small></span><span class="mx-fam">${esc(FAMILIES[r.family])}</span>` : "";
    box.innerHTML = r ? `<h4>${esc(r.title)}</h4><p>${esc(r.overview)}</p><details><summary>Common mistakes</summary><ul>${r.misconceptions.map((m) => `<li>${esc(m)}</li>`).join("")}</ul></details>` : `<h4>Your own mechanism</h4><p>Curly arrows move two electrons, fishhooks one. Start each arrow at a lone pair, an unpaired electron or a bond, and end it at the atom (or the bond) where the electrons go. Charges update themselves from where the electrons end up.</p>`;
  }
  function actions() {
    const a = q(".mx-actions"), h = q(".mx-help"); a.innerHTML = h.innerHTML = "";
    button(a, inst ? "Check step" : "Apply step", check, "pri");
    button(a, "Undo arrow", () => { pending.pop(); fb = null; refresh(); });
    button(a, "Clear arrows", () => { pending = []; fb = null; refresh(); });
    button(a, "Restart", () => load(src));
    if (onSave) button(a, "Save to notes", () => { if (!states.length) return; onSave({ v: 1, title: inst ? inst.reaction.title : "My mechanism", reactionId: inst?.reaction.id || null, conditions: inst?.reaction.conditions || null, start: states[0], steps: done.map((arrows) => ({ arrows })) }); fb = { kind: "info", html: "<p class=\"lab-msg ok\">Saved to your organic notes (Structure mode).</p>" }; feedback(); });
    if (!inst || exam) return;
    button(h, "Hint", () => { if (finished) return; fb = { kind: "info", html: `<h4>Hint</h4><p>${esc(inst.steps[done.length].hint)}</p>` }; feedback(); });
    button(h, "Explain", () => { if (finished) return; fb = { kind: "info", html: `<h4>The idea</h4><p>${esc(inst.steps[done.length].explain)}</p>` }; feedback(); });
    button(h, "Show next step", () => showNext(false));
    button(h, "Full solution", () => showNext(true));
    button(h, "Spot the error", startSpot);
  }

  // ---------- steps strip and playback ----------
  function stepsStrip() {
    const box = q(".mx-steps"); if (!states.length || spot) { box.innerHTML = ""; return; }
    const labels = states.map((_, i) => (i === 0 ? "Start" : inst?.steps[i - 1]?.label || `After step ${i}`));
    const chips = labels.map((l, i) => `<button type="button" role="tab" data-k="${i}" aria-selected="${(viewK ?? states.length - 1) === i}" class="${i === states.length - 1 ? "now" : ""}"><b>${i === 0 ? "0" : i}</b> ${esc(l)}</button>`);
    if (inst && !finished) chips.push(`<span class="mx-next">${done.length + 1}. ${esc(inst.steps[done.length].label)}?</span>`);
    box.innerHTML = chips.join("<i aria-hidden=\"true\">→</i>");
  }
  q(".mx-steps").addEventListener("click", (e) => { const b = e.target.closest("[data-k]"); if (!b) return; stopAnim(); const k = Number(b.dataset.k); viewK = k === states.length - 1 ? null : k; refresh(); });
  const pl = q(".mx-play");
  button(pl, "⏮", () => { stopAnim(); viewK = states.length > 1 ? 0 : null; refresh(); }).setAttribute("aria-label", "First step");
  button(pl, "◀", () => { stopAnim(); const k = (viewK ?? states.length - 1) - 1; viewK = k < 0 ? 0 : k; refresh(); }).setAttribute("aria-label", "Previous step");
  const playBtn = button(pl, "▶ Play", () => { if (anim) { stopAnim(); refresh(); } else if (done.length) play(done.map((_, i) => i)); });
  button(pl, "▶|", () => { stopAnim(); if (viewK == null) return; const k = viewK + 1; viewK = k >= states.length - 1 ? null : k; refresh(); }).setAttribute("aria-label", "Next step");
  const sp = document.createElement("label"); sp.className = "lab-sel"; sp.innerHTML = `<span>Speed</span><input type="range" min="0.4" max="2.5" step="0.1" value="1" aria-label="Animation speed">`; pl.append(sp);
  sp.querySelector("input").addEventListener("input", (e) => { speed = Number(e.target.value); });

  // animation, generated from the mechanism: arrows draw on, then the old bonds fade (red) as the new ones appear
  // (green) and atoms glide to their new places
  function play(ks) {
    stopAnim(); if (!ks.length) { refresh(); return; }
    viewK = null; let i = 0, t0 = performance.now(); playBtn.textContent = "❚❚ Pause";
    const D1 = 900, D2 = 800, D3 = 450;
    const tick = (now) => {
      if (!anim || !svgHost.isConnected) return;
      const k = ks[i], s0 = states[k], s1 = states[k + 1], arrows = done[k], el = (now - t0) * speed;
      const r = E.applyStep(s0, arrows), formed = r.changes.filter((c) => c.kind === "form" || (c.kind === "order" && c.to > c.from)), broken = r.changes.filter((c) => c.kind === "break" || (c.kind === "order" && c.to < c.from));
      let content;
      if (el < D1) content = layer(s0, { arrows, arrowCols: arrows.map(() => COL.pend), t: arrows.map((_, j) => Math.max(0, Math.min(1, (el / D1) * arrows.length - j * 0.6))) , broken });
      else if (el < D1 + D2) {
        const t = ease((el - D1) / D2), mid = (s) => ({ ...s, atoms: s.atoms.map((a) => { const b = E.atomOf(s1, a.id), c = E.atomOf(s0, a.id); return { ...a, x: lerp(c.x, b.x, t), y: lerp(c.y, b.y, t) }; }) });
        content = `<g opacity="${(1 - t).toFixed(3)}">${layer(mid(s0), { broken })}</g><g opacity="${t.toFixed(3)}">${layer(mid(s1), { formed })}</g>`;
      } else content = layer(s1, { formed });
      anim.inner = true; svgHost.innerHTML = frame(content);
      q(".mx-hint").textContent = `Step ${k + 1}: ${(inst?.steps[k]?.label) || ""}`;
      if (el > D1 + D2 + D3) { i++; t0 = now; if (i >= ks.length) { stopAnim(); refresh(); return; } }
      anim.id = requestAnimationFrame(tick);
    };
    anim = { id: requestAnimationFrame(tick) };
  }
  function stopAnim() { if (anim) { cancelAnimationFrame(anim.id); anim = null; } playBtn.textContent = "▶ Play"; }

  const resize = () => { const w = Math.max(260, Math.round(svgHost.parentElement.clientWidth || 600)), h = Math.round(Math.max(280, Math.min(520, w * 0.6))); if (w === W && h === H) return; W = w; H = h; svgHost.style.height = `${H}px`; fitAll(); if (!anim) paint(); };
  const ro = "ResizeObserver" in window ? new ResizeObserver(resize) : null; ro?.observe(svgHost.parentElement);
  load(src); resize();
  return {
    load, refresh: () => { resize(); refresh(); },
    /** what an AI tutor would be given: the deterministic verdict and the structure, never a screenshot */
    context: () => (states.length ? E.tutorContext({ title: inst?.reaction.title || "My mechanism", reaction: inst?.reaction, state: cur(), arrows: pending, result: pending.length ? E.applyStep(cur(), pending) : null, stepIndex: done.length }) : null),
    stop: () => { stopAnim(); stopTimer(); ro?.disconnect(); },
  };
}
