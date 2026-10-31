// Mitosis and meiosis, step by step, for a cell with two pairs of homologous chromosomes (2n = 4): maternal
// chromosomes red, paternal blue. Meiosis shows synapsis, crossing over (chiasmata) and the random
// orientation of bivalents at metaphase I, so each run can give different gametes.
// Illustrative: chromosome shapes, the spindle and timings are schematic.
import { shell, canvas, seg, button, loop, clear, text, circle, challenges, panel, quiz, lerp, C } from "../lab.js";

const MCOL = "#ff6b6b", PCOL = "#4dabf7";
const MITOSIS = [
  ["Interphase (G1)", "The cell grows. Each chromosome is a single DNA molecule (one chromatid), spread out as chromatin in the nucleus."],
  ["Interphase (S)", "DNA replication: each chromosome now has two identical sister chromatids joined at the centromere."],
  ["Prophase", "Chromosomes condense and become visible; the spindle forms from the centrosomes; the nuclear envelope breaks down (prometaphase)."],
  ["Metaphase", "Chromosomes line up at the equator. Spindle fibres from opposite poles attach to the kinetochores of each pair of sister chromatids."],
  ["Anaphase", "The centromeres split and sister chromatids are pulled to opposite poles: each pole receives one copy of every chromosome."],
  ["Telophase and cytokinesis", "Nuclear envelopes re-form and the cytoplasm divides: two diploid daughter cells, genetically identical to the parent."],
];
const MEIOSIS = [
  ["Interphase (S)", "DNA has been replicated: each chromosome has two sister chromatids."],
  ["Prophase I", "Homologous chromosomes pair up (synapsis) to form bivalents. Non-sister chromatids exchange segments at chiasmata: crossing over."],
  ["Metaphase I", "Bivalents line up at the equator. Which homologue faces which pole is random for each pair: independent assortment."],
  ["Anaphase I", "Homologous chromosomes separate to opposite poles; sister chromatids stay together. The chromosome number halves."],
  ["Telophase I", "Two cells, each haploid (n = 2) but each chromosome still has two (now non-identical) chromatids."],
  ["Metaphase II", "In each cell the chromosomes line up at a new equator."],
  ["Anaphase II", "Sister chromatids separate to opposite poles."],
  ["Telophase II", "Four haploid cells, each genetically different, which develop into gametes."],
];

export function mount(el, ctx = {}) {
  const $ = shell(el, `<div class="lab-row top"></div><div class="lab-cols"><div class="lab-stage"></div><div class="lab-ctrl"></div></div><div class="lab-row tools"></div><div class="lab-q"></div>`);
  const cv = canvas($(".lab-stage"), { aspect: 0.72, max: 440 }), ctrl = $(".lab-ctrl"), info = panel(ctrl);
  let mode = "mitosis", k = 0, tween = 1, prev = null, flips = [false, false], cross = 0.45;
  const st = { mitosis: false, meiosis: false, two: false };
  const ch = challenges(ctrl, ctx, [
    { id: "mit", text: "Step through mitosis to two daughter cells", test: (x) => x.mitosis },
    { id: "mei", text: "Step through meiosis to four haploid cells", test: (x) => x.meiosis },
    { id: "two", text: "Run meiosis twice and compare the gametes", test: (x) => x.two },
  ]);
  quiz($(".lab-q"), ctx, [
    { id: "n", q: "A cell with 2n = 46 undergoes meiosis. How many chromosomes are in each gamete?", options: ["46", "23", "92", "12"], answer: 1, why: "Meiosis I separates homologous pairs, halving the number from 46 to 23; meiosis II separates sister chromatids, so each of the four gametes has 23 chromosomes." },
    { id: "combos", q: "Ignoring crossing over, how many chromosome combinations can independent assortment give in human gametes?", options: ["46", "2 × 23 = 46", "2²³, about 8.4 million", "23²"], answer: 2, why: "Each of the 23 pairs lines up independently, two ways each: 2²³ ≈ 8.4 million combinations, before crossing over adds far more." },
  ]);
  const phases = () => (mode === "mitosis" ? MITOSIS : MEIOSIS);
  seg($(".top"), [["mitosis", "Mitosis"], ["meiosis", "Meiosis"]], mode, (v) => { mode = v; k = 0; prev = null; tween = 1; newRun(); });
  let runs = 0;
  function newRun() { flips = [Math.random() < 0.5, Math.random() < 0.5]; cross = 0.35 + Math.random() * 0.25; if (mode === "meiosis") runs++; }
  button($(".tools"), "← Back", () => go(k - 1));
  button($(".tools"), "Next →", () => go(k + 1), "pri");
  button($(".tools"), "Restart", () => { newRun(); prev = null; k = 0; tween = 1; });
  function go(nk) {
    nk = Math.max(0, Math.min(phases().length - 1, nk)); if (nk === k) return;
    prev = layout(k); k = nk; tween = 0;
    if (mode === "mitosis" && k === MITOSIS.length - 1) st.mitosis = true;
    if (mode === "meiosis" && k === MEIOSIS.length - 1) { st.meiosis = true; if (runs >= 2) st.two = true; }
    ch.check(st);
  }
  // chromosome set: chromosome 1 (long) and 2 (short), maternal and paternal, two chromatids each
  const L = { 1: 62, 2: 34 };
  function segsFor(chr, par, sis) {
    const base = par === "m" ? MCOL : PCOL, other = par === "m" ? PCOL : MCOL;
    // crossing over in meiosis (from prophase I): maternal sister 1 and paternal sister 0 swap their distal ends
    if (mode === "meiosis" && k >= 1 && chr === 1 && ((par === "m" && sis === 1) || (par === "p" && sis === 0))) return [[base, cross], [other, 1 - cross]];
    if (mode === "meiosis" && k >= 1 && chr === 2 && ((par === "m" && sis === 1) || (par === "p" && sis === 0))) return [[base, 0.6], [other, 0.4]];
    return [[base, 1]];
  }
  function layout(step) {
    const W = cv.W, H = cv.H, cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.42;
    const out = [], cells = [], ph = phases()[step][0];
    const add = (chr, par, sis, x, y, ang, w) => out.push({ id: `${chr}${par}${sis}`, x, y, ang, len: L[chr], w, segs: segsFor(chr, par, sis) });
    const chrs = [[1, "m"], [1, "p"], [2, "m"], [2, "p"]];
    if (mode === "mitosis") {
      const slots = { "1m": [cx - 34, cy - 20, 0.3], "1p": [cx + 30, cy + 24, -0.5], "2m": [cx + 26, cy - 34, 1.2], "2p": [cx - 28, cy + 34, 0.8] };
      if (step <= 2) {
        cells.push({ x: cx, y: cy, r: R, nucleus: step < 2 ? 0.62 : 0.0, poles: step === 2 });
        for (const [c, p] of chrs) { const [x, y, a] = slots[c + p], off = step === 0 ? 0 : step === 1 ? 4 : 7, w = step === 2 ? 7 : 3; add(c, p, 0, x - off * Math.sin(a), y + off * Math.cos(a), a, w); add(c, p, 1, x + off * Math.sin(a), y - off * Math.cos(a), a, w); }
      } else if (step === 3 || step === 4) {
        cells.push({ x: cx, y: cy, r: R, poles: true, spindle: true });
        chrs.forEach(([c, p], i) => { const y = cy - 90 + i * 60, d = step === 3 ? 6 : R * 0.62; add(c, p, 0, cx - d, y, Math.PI / 2, 7); add(c, p, 1, cx + d, y, Math.PI / 2, 7); });
      } else {
        const dx = R * 0.55; cells.push({ x: cx - dx, y: cy, r: R * 0.52, nucleus: 0.7 }, { x: cx + dx, y: cy, r: R * 0.52, nucleus: 0.7 });
        chrs.forEach(([c, p], i) => { const y = cy - 36 + i * 24; add(c, p, 0, cx - dx + (i % 2 ? 12 : -12), y, 0.4 * i, 3); add(c, p, 1, cx + dx + (i % 2 ? 12 : -12), y, 0.4 * i, 3); });
      }
    } else {
      const dx = R * 0.55;
      if (step === 0) { cells.push({ x: cx, y: cy, r: R, nucleus: 0.62 }); const slots = { "1m": [cx - 34, cy - 20, 0.3], "1p": [cx + 30, cy + 24, -0.5], "2m": [cx + 26, cy - 34, 1.2], "2p": [cx - 28, cy + 34, 0.8] }; for (const [c, p] of chrs) { const [x, y, a] = slots[c + p]; add(c, p, 0, x - 4 * Math.sin(a), y + 4 * Math.cos(a), a, 3); add(c, p, 1, x + 4 * Math.sin(a), y - 4 * Math.cos(a), a, 3); } }
      else if (step === 1) { cells.push({ x: cx, y: cy, r: R, poles: true }); [[1, cy - 40, -30], [2, cy + 50, 20]].forEach(([c, y, x0]) => { const x = cx + x0; add(c, "m", 0, x - 21, y, Math.PI / 2, 7); add(c, "m", 1, x - 7, y, Math.PI / 2, 7); add(c, "p", 0, x + 7, y, Math.PI / 2, 7); add(c, "p", 1, x + 21, y, Math.PI / 2, 7); }); }
      else if (step <= 3) {
        cells.push({ x: cx, y: cy, r: R, poles: true, spindle: true });
        [[1, cy - 50], [2, cy + 50]].forEach(([c, y], i) => { const f = flips[i], d = step === 2 ? 0 : R * 0.6; const left = f ? "p" : "m", right = f ? "m" : "p"; add(c, left, 0, cx - 21 - d, y, Math.PI / 2, 7); add(c, left, 1, cx - 7 - d, y, Math.PI / 2, 7); add(c, right, 0, cx + 7 + d, y, Math.PI / 2, 7); add(c, right, 1, cx + 21 + d, y, Math.PI / 2, 7); });
      } else if (step === 4 || step === 5) {
        cells.push({ x: cx - dx, y: cy, r: R * 0.5, poles: step === 5, spindleV: step === 5 }, { x: cx + dx, y: cy, r: R * 0.5, poles: step === 5, spindleV: step === 5 });
        [[1, -1], [2, 1]].forEach(([c, s], i) => { const f = flips[i]; for (const [side, par] of [[-1, f ? "p" : "m"], [1, f ? "m" : "p"]]) { const x0 = cx + side * dx + (step === 5 ? s * 18 : s * 14), y0 = cy + (step === 5 ? 0 : s * 16); add(c, par, 0, x0, y0 - (step === 5 ? 6 : 4), step === 5 ? 0 : 0.6, step === 5 ? 7 : 6); add(c, par, 1, x0, y0 + (step === 5 ? 6 : 4), step === 5 ? 0 : 0.6, step === 5 ? 7 : 6); } });
      } else {
        const sep = step === 6 ? R * 0.28 : R * 0.42, r2 = step === 6 ? R * 0.5 : R * 0.26;
        if (step === 6) cells.push({ x: cx - dx, y: cy, r: r2, poles: true, spindleV: true }, { x: cx + dx, y: cy, r: r2, poles: true, spindleV: true });
        else for (const sx of [-1, 1]) for (const sy of [-1, 1]) cells.push({ x: cx + sx * dx, y: cy + sy * sep, r: r2, nucleus: 0.6 });
        [[1, -1], [2, 1]].forEach(([c, s], i) => { const f = flips[i]; for (const [side, par] of [[-1, f ? "p" : "m"], [1, f ? "m" : "p"]]) { const x0 = cx + side * dx + s * 14; add(c, par, 0, x0, cy - sep, 0, step === 6 ? 7 : 3); add(c, par, 1, x0, cy + sep, 0, step === 6 ? 7 : 3); } });
      }
    }
    return { out, cells };
  }
  function chromatid(g, c, alpha = 1) {
    const ux = Math.cos(c.ang), uy = Math.sin(c.ang); let s = -c.len / 2;
    g.lineCap = "round"; g.lineWidth = c.w; g.globalAlpha = alpha;
    for (const [col, f] of c.segs) { const e = s + f * c.len; g.strokeStyle = col; g.beginPath(); g.moveTo(c.x + ux * s, c.y + uy * s); g.lineTo(c.x + ux * e, c.y + uy * e); g.stroke(); s = e; }
    g.globalAlpha = 1;
  }
  function draw() {
    const g = cv.g, W = cv.W, H = cv.H; clear(g, W, H);
    const cur = layout(k), t = tween < 1 ? 0.5 - Math.cos(Math.PI * tween) / 2 : 1;
    for (const c of cur.cells) {
      circle(g, c.x, c.y, c.r, "rgba(255,255,255,.035)", "rgba(255,255,255,.35)");
      if (c.nucleus) { g.setLineDash([5, 4]); circle(g, c.x, c.y, c.r * c.nucleus, null, "rgba(180,160,255,.5)"); g.setLineDash([]); }
      if (c.poles) { const v = c.spindleV; const p1 = v ? [c.x, c.y - c.r * 0.85] : [c.x - c.r * 0.85, c.y], p2 = v ? [c.x, c.y + c.r * 0.85] : [c.x + c.r * 0.85, c.y]; circle(g, ...p1, 5, C.gold); circle(g, ...p2, 5, C.gold); if (c.spindle || c.spindleV) { g.strokeStyle = "rgba(250,176,5,.25)"; g.lineWidth = 1; for (let i = -3; i <= 3; i++) { g.beginPath(); g.moveTo(...p1); g.quadraticCurveTo(v ? c.x + i * 16 : c.x, v ? c.y : c.y + i * 22, ...p2); g.stroke(); } } }
    }
    const prevBy = prev ? Object.fromEntries(prev.out.map((c) => [c.id, c])) : {};
    for (const c of cur.out) { const p = prevBy[c.id]; chromatid(g, p && t < 1 ? { ...c, x: lerp(p.x, c.x, t), y: lerp(p.y, c.y, t), ang: lerp(p.ang, c.ang, t), w: lerp(p.w, c.w, t) } : c); }
    const [nm, d] = phases()[k];
    text(g, `${mode === "mitosis" ? "Mitosis" : "Meiosis"} · ${nm}`, 14, 22, { size: 14, weight: 600 });
    text(g, `step ${k + 1} of ${phases().length}`, W - 14, 22, { align: "right", size: 12, color: C.mute });
    info(`<h4>${nm}</h4><p>${d}</p><p class="lab-msg">Red: chromosomes from the mother; blue: from the father. ${mode === "meiosis" ? "Restart to see a different random orientation and crossover point." : "The two daughter cells get identical sets."}</p>`);
  }
  newRun();
  const stop = loop(el, (dt) => { if (tween < 1) tween = Math.min(1, tween + dt * 1.6); draw(); });
  return stop;
}
