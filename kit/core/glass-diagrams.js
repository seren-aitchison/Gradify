// Glass diagrams: the 3D glass icons' bigger siblings (kit/core/glass-icons.js), with a real diagram on the glass.
// Each one is drawn from a lesson's own notes, word for word, so it shows that lesson's process, formula, structure,
// comparison or timeline, never a stock picture and never anything the notes don't say:
//
//   map        the lesson's sections round its title              (2 to 6 H: headings)
//   path       what you need first → this lesson → what you'll be able to do   (PRE: and O:)
//   flow       a worked example's steps, in order                 (X: with > steps)
//   formula    up to three formulas and what each means           (E:)
//   hub        a section's main points round its heading          (H: then 3 to 6 bullets)
//   cycle      the same, round a circle, for a section about a cycle
//   timeline   dated points along a line                          (3 or more bullets with years)
//   compare    two easily confused terms side by side             (T: pairs that share a word)
//   mistake    a common mistake and what is true instead          (!:)
//   case       a case's facts, decision and principle             (CASE:)
//   drug       a drug's class, uses, cautions and monitoring      (DRUG:)
//   terms      the lesson's key terms and their meanings          (T:)
//   summary    the lesson's summary points, as a checklist        (SUM:)
//   evidence   how strongly each claim is supported               (EV:)
//   recall     questions and answers to test yourself on          (Q:)
//   points     a section's own sentences, when it has no list     (H: then a paragraph)
//   key        a key idea, boxed                                  (K:)
//   facts      statements set out like equations, that aren't maths (E: lines of words, as law uses them)
//
// A lesson gets five (diagramsFor), each placed beside the part of the notes it shows. Used in lessons
// (kit/course/notes.js lessonHtml), in a mind map's detail panel (kit/maps/view.js), on the back of flashcards and in
// the notes converter. Styles: "Glass diagrams" in kit/styles/components.css.
//
// glassDiagram draws a card in HTML, not a picture: every word shows in full and wraps to the width it's given, it
// reads as lists and panels to a screen reader, and "Cover & recall" hides the answers so the learner can test
// themselves. diagramSvg is the same diagram as a fixed 480 × 300 picture, for places that need an image.

const PAIRS = [["#4641ff", "#8b3dff"], ["#f055dd", "#ff6aa8"], ["#ff5600", "#ffc002"], ["#1fae8c", "#3c78d8"], ["#8b3dff", "#f055dd"], ["#3c78d8", "#40d4b1"], ["#ff5a4d", "#f055dd"], ["#ffc002", "#ff8a00"]];
// the colours of a diagram's parts: Gradify's spectrum, each strong enough on white and on near-black
const INK = ["#6366f1", "#ec4899", "#f97316", "#14b8a6", "#8b5cf6", "#eab308", "#3b82f6", "#f43f5e"];
const GOOD = "#16a34a", BAD = "#ef4444", WARN = "#d97706";
const hash = (s) => { let h = 2166136261; for (const ch of String(s)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return h >>> 0; };
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const plain = (s) => String(s ?? "").replace(/\*\*|__|`/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\^\{([^}]*)\}/g, "^$1").replace(/_\{([^}]*)\}/g, "_$1").replace(/\s+/g, " ").trim();

/** A short label from a line of notes: its bold lead if it has one, else its first clause, cut to `n` characters. */
export function label(text, n = 26) {
  const raw = String(text ?? "");
  const bold = raw.match(/^\s*\*\*([^*]{2,60})\*\*/);
  let s = plain(bold ? bold[1] : raw);
  if (!bold) s = s.split(/(?<=\w)[:;—–]\s|,\s(?=which|so|and|because|but)|\.\s/)[0];
  return cut(s.replace(/[.:,;]+$/, ""), n);
}
// a phrase cut to n characters at a word boundary, with an ellipsis when cut
function cut(s, n) {
  s = plain(s);
  if (s.length <= n) return s;
  const c = s.slice(0, n + 1).replace(/\s+\S*$/, "");
  return `${c.length > n * 0.5 ? c : s.slice(0, n)}…`;
}
// what a bold-led bullet says after its lead ("**Metabolism**: chemical reactions…" → "chemical reactions…")
const rest = (text) => plain(String(text ?? "").replace(/^\s*\*\*[^*]{2,60}\*\*\s*[:—–-]?\s*/, ""));
const sentences = (t) => plain(t).split(/(?<=[a-z0-9)%][.!?])\s+(?=[A-Z])/).map((s) => s.trim()).filter((s) => s.length > 3);

// ---------- text on the diagram ----------
// a label as up to `max` lines of about `w` characters; the last line ends in … if there was more
function lines(text, w = 14, max = 2) {
  const words = String(text).split(" "), out = [""];
  let i = 0;
  for (; i < words.length; i++) {
    const word = words[i], next = out.at(-1) ? `${out.at(-1)} ${word}` : word;
    if (out.at(-1) && next.length > w) { if (out.length >= max) break; out.push(word); }
    else out[out.length - 1] = next;
  }
  if (i < words.length) out[out.length - 1] = `${out.at(-1).replace(/[.,;:…]+$/, "")}…`;
  return out.map((l) => (l.length > w + 4 ? `${l.slice(0, w + 2).replace(/\s+\S*$/, "")}…` : l));
}
const text = (x, y, s, { size = 13, w = 16, max = 2, anchor = "middle", weight = 600, cls = "gd-t", fill = "" } = {}) => {
  const ls = lines(s, w, max), dy = size * 1.22, y0 = y - ((ls.length - 1) * dy) / 2;
  return `<text x="${x.toFixed(1)}" y="${y0.toFixed(1)}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" dominant-baseline="middle" class="${cls}"${fill ? ` fill="${fill}"` : ""}>${ls.map((l, i) => `<tspan x="${x.toFixed(1)}" dy="${i ? dy.toFixed(1) : 0}">${esc(l)}</tspan>`).join("")}</text>`;
};
const f1 = (n) => n.toFixed(1);
// a coloured box: a pale fill of its colour, a crisp edge, and a solid strip down its left side
const box = (x, y, w, h, c, { rx = 12, strip = true } = {}) =>
  `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${rx}" fill="${c}" fill-opacity=".13" stroke="${c}" stroke-width="1.6"/>${strip ? `<path d="M${f1(x + 1.6)} ${f1(y + rx)} V${f1(y + h - rx)}" stroke="${c}" stroke-width="4" stroke-linecap="round"/>` : ""}`;
const pill = (x, y, w, h, c) => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h / 2)}" fill="${c}" fill-opacity=".14" stroke="${c}" stroke-width="1.6"/>`;
const badge = (x, y, r, c, s, size = 12) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${c}"/><text x="${f1(x)}" y="${f1(y + 0.5)}" font-size="${size}" font-weight="800" text-anchor="middle" dominant-baseline="middle" fill="#fff">${esc(s)}</text>`;
const arrowDefs = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1.5 1.5 8.5 5 1.5 8.5" fill="none" class="gd-arrowhead" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>`;
const arrow = (d, id, extra = "") => `<path d="${d}" class="gd-line" marker-end="url(#${id})" ${extra}/>`;
const YEAR = /\b(1[0-9]{3}|20[0-9]{2})\b/;
// a line that is maths, not words: an operator, a power or index, or a symbol and a number
const MATHS = /[=+×÷√∝≈≤≥<>∑∫^/]|\b[A-Za-zα-ωΔ]\s*[0-9]|[0-9]\s*[A-Za-z]\b|[α-ωΑ-ΩπΔ]/;
const W = 480, H = 300;

// ---------- choosing a lesson's five ----------
/** The diagrams worth drawing for a lesson (five unless the notes are very short), each with `at`, the index of the
 *  block it belongs beside. Every word on them comes from the notes. */
export function diagramsFor(L, { max = 5, skip = [] } = {}) {
  const out = [], blocks = L?.blocks || [];
  const contentAt = blocks.map((b, i) => (b.t === "h" ? -1 : i)).filter((i) => i >= 0);
  if (!contentAt.length) return [];
  const firstAt = contentAt[0], lastAt = contentAt.at(-1);
  const heads = blocks.map((b, i) => (b.t === "h" ? { x: b.x, i } : null)).filter(Boolean);
  // the lesson's sections round its title, beside the opening part of the notes
  // (three or more: a map of two sections tells the learner nothing the headings don't)
  if (heads.length >= 3 && L.title) out.push({ kind: "map", at: firstAt, title: plain(L.title), items: heads.slice(0, 6).map((h) => cut(h.x, 60)), weight: 3.2 });
  // what you need first, this lesson, what you'll be able to do
  if (L.objectives?.length >= 2) out.push({ kind: "path", at: firstAt, title: plain(L.title || "This lesson"), before: (L.prereq || []).slice(0, 2).map((x) => label(x, 34)), items: L.objectives.slice(0, 3).map((x) => cut(x, 140)), weight: 2.1 });

  let heading = null, headingAt = -1;
  blocks.forEach((b, i) => {
    if (b.t === "h") { heading = b.x; headingAt = i; return; }
    if (b.t === "ex" && b.steps.length >= 2) out.push({ kind: "flow", ex: true, at: i, title: cut(b.x, 90), items: b.steps.slice(0, 6).map((s) => cut(s, 240)), weight: 5 });
    else if (b.t === "eq" && b.rows.length && !b.rows.some(([f]) => MATHS.test(plain(f)))) out.push({ kind: "facts", at: i, title: plain(heading || "Key facts"), items: b.rows.slice(0, 4).map(([f, m]) => ({ term: cut(f, 100), def: m ? cut(m, 160) : "" })), weight: 3.4 });
    else if (b.t === "eq" && b.rows.length) out.push({ kind: "formula", at: i, title: plain(heading || "Formulas"), rows: b.rows.slice(0, 3).map(([f, m]) => ({ f: plain(f), m: m ? cut(m, 140) : "" })), formula: plain(b.rows[0][0]), more: Math.max(0, b.rows.length - 3), weight: 4.5 });
    else if (b.t === "pit") {
      const ss = sentences(b.x);
      if (ss.length >= 2) out.push({ kind: "mistake", at: i, title: cut(ss[0], 90), wrong: cut(ss[0], 220), right: cut(ss.slice(1).join(" "), 360), weight: 3.6 });
      else if (ss.length === 1) out.push({ kind: "mistake", at: i, title: cut(ss[0], 90), wrong: cut(ss[0], 300), right: "", weight: 1.1 });
    }
    else if (b.t === "key") out.push({ kind: "key", at: i, title: plain(heading || L.title || "Key idea"), text: cut(b.x, 340), weight: 1.3 });
    else if (b.t === "ul" && b.items.length >= 3 && heading) {
      const items = b.items.slice(0, 6), dated = items.filter((x) => YEAR.test(x));
      if (dated.length >= 3) out.push({ kind: "timeline", at: i, title: plain(heading), items: dated.slice(0, 5).map((x) => ({ year: x.match(YEAR)[1], text: label(x.replace(/^\s*(in\s+)?\b(1[0-9]{3}|20[0-9]{2})\b[,:]?\s*/i, ""), 90) })).sort((a, b) => a.year - b.year), weight: 4.2 });
      else {
        const bold = items.every((x) => /^\s*\*\*/.test(x));
        out.push({ kind: /cycle|loop|circulat|feedback/i.test(heading) ? "cycle" : "hub", at: i, title: plain(heading), items: items.map((x) => label(x, bold ? 44 : 34)), notes: bold ? items.map((x) => { const r = rest(x); return /^[A-Za-z(]/.test(r) && r.length >= 12 ? cut(r, 240) : ""; }) : null, weight: (bold ? 4 : 3) - (headingAt === i - 1 ? 0 : 1) });
      }
    }
    // a section that is all prose: its own sentences as its main points
    else if (b.t === "p" && heading) {
      const ss = sentences(b.x);
      if (ss.length >= 2) out.push({ kind: "points", at: i, title: plain(heading), items: ss.slice(0, 4).map((s) => cut(s, 180)), weight: (ss.length >= 3 ? 1.5 : 1) - (headingAt === i - 1 ? 0 : 0.6) });
    }
    else if (b.t === "ul" && b.items.length === 2 && heading) out.push({ kind: "points", at: i, title: plain(heading), items: b.items.map((x) => cut(x, 180)), weight: 0.7 });
  });

  // the cards at the end of the notes: cases, drugs; then terms, the summary, the evidence, quick recall
  for (const a of L?.authorities || []) {
    if (a.kind === "case") out.push({ kind: "case", at: lastAt, title: plain(a.name), items: [cut(a.facts, 240), cut(a.held, 240), cut(a.principle, 240)], weight: 3.4 });
    else if (a.kind === "drug") out.push({ kind: "drug", at: lastAt, title: plain(a.name), items: [cut(a.mechanism, 170), cut(a.uses, 170), cut(a.adverse, 170), cut(a.monitoring, 170)], weight: 3.4 });
  }
  const terms = L?.terms || [];
  for (let a = 0; a < terms.length && !out.some((d) => d.kind === "compare"); a++) for (let b = a + 1; b < terms.length; b++) {
    const wa = plain(terms[a][0]).toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3), wb = plain(terms[b][0]).toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3);
    if (wa.some((w) => wb.includes(w)) && plain(terms[a][0]).toLowerCase() !== plain(terms[b][0]).toLowerCase()) {
      out.push({ kind: "compare", at: lastAt, title: `${plain(terms[a][0])} and ${plain(terms[b][0])}`, items: [label(terms[a][0], 30), label(terms[b][0], 30)], notes: [cut(terms[a][1], 220), cut(terms[b][1], 220)], weight: 3.5 });
      break;
    }
  }
  if (terms.length >= 2) out.push({ kind: "terms", at: lastAt, title: "Key terms", items: terms.slice(0, 5).map(([t, d]) => ({ term: label(t, 40), def: cut(d, 180) })), weight: 2.4 });
  if (L?.summary?.length >= 2) out.push({ kind: "summary", at: lastAt, title: "Summary", items: L.summary.slice(0, 5).map((x) => cut(x, 200)), weight: 2.3 });
  if (L?.evidence?.length >= 2) out.push({ kind: "evidence", at: lastAt, title: "How strong is the evidence?", items: L.evidence.slice(0, 4).map((e) => ({ status: e.status, text: cut(e.claim, 200) })), weight: 2.2 });
  if (L?.cards?.length >= 2) out.push({ kind: "recall", at: lastAt, title: "Test yourself", items: L.cards.slice(0, 4).map(([q, a]) => ({ q: cut(q, 180), a: cut(a, 200) })), weight: 1.2 });

  // the most telling five: no more than two of a kind until every kind has had its turn, then kept in the lesson's order
  const ranked = out.filter((d) => !skip.includes(d.kind)).map((d, k) => ({ ...d, k })).sort((a, b) => b.weight - a.weight || a.k - b.k);
  const pick = [], count = {};
  for (const cap of [1, 2, 9]) for (const d of ranked) {
    if (pick.length >= max) break;
    if (pick.includes(d) || (count[d.kind] || 0) >= cap) continue;
    pick.push(d); count[d.kind] = (count[d.kind] || 0) + 1;
  }
  return pick.sort((a, b) => a.at - b.at || a.k - b.k).map(({ k, weight, ...d }, n) => ({ ...d, id: `${d.kind}-${d.at}-${n}` }));
}

/** A diagram for a mind map node: a node with ordered steps, a formula, or a branch with a few children. */
export function diagramForNode(n) {
  if (!n) return null;
  const kids = (n.children || []).filter((c) => !["limit", "gap"].includes(c.kind));
  if (n.kind === "equation") return { kind: "formula", title: plain(n.detail && n.detail !== n.topic ? n.detail : "Formula"), formula: plain(n.topic), rows: [{ f: plain(n.topic), m: n.detail && n.detail !== n.topic ? cut(n.detail, 60) : "" }], more: 0 };
  if (kids.length >= 2 && kids.every((c) => /^\d+\.\s/.test(c.topic))) return { kind: "flow", title: plain(n.topic), items: kids.slice(0, 6).map((c) => cut(c.topic.replace(/^\d+\.\s*/, ""), 60)) };
  if (/ vs /.test(n.topic)) { const [a, b] = n.topic.split(/ vs /); return { kind: "compare", title: plain(n.topic), items: [label(a, 30), label(b, 30)], notes: ["", ""] }; }
  if (kids.length >= 3 && kids.length <= 9) return { kind: /cycle|loop|circulat|feedback/i.test(n.topic) ? "cycle" : "hub", title: plain(n.topic), items: kids.slice(0, 6).map((c) => label(c.topic, 34)) };
  return null;
}

// every word a diagram shows, for matching it to a flashcard
const wordsOf = (d) => [d.title, d.formula, d.wrong, d.right, ...(d.items || []).map((x) => (typeof x === "string" ? x : Object.values(x).join(" "))), ...(d.rows || []).map((r) => `${r.f} ${r.m}`), ...(d.notes || [])].join(" ");
/** The diagram on a lesson's flashcard: the one whose words the card shares most, if it shares enough. */
export function diagramForCard(diagrams, front, back = "") {
  const ws = new Set(`${plain(front)} ${plain(back)}`.toLowerCase().match(/[a-z]{4,}/g) || []);
  let best = null, score = 0;
  for (const d of diagrams || []) {
    if (d.kind === "recall") continue;   // the card's own question, drawn again, adds nothing
    const dw = wordsOf(d).toLowerCase().match(/[a-z]{4,}/g) || [];
    const s = new Set(dw.filter((w) => ws.has(w))).size;
    if (s > score) { score = s; best = d; }
  }
  return score >= 2 ? best : null;
}

// ---------- drawing (a 480 × 300 viewBox, crisp lines, a colour for each part) ----------
function flow(d, id) {
  const n = d.items.length, cols = n <= 3 ? n : Math.ceil(n / 2), rows = n <= 3 ? 1 : 2, gap = 30;
  const bw = (W - 32 - (cols - 1) * gap) / cols, bh = rows === 1 ? 150 : 104;
  const gx = (W - cols * bw - (cols - 1) * gap) / 2, ys = rows === 1 ? [H / 2] : [82, 220];
  const pos = d.items.map((_, i) => { const r = Math.floor(i / cols), c = r % 2 ? cols - 1 - (i % cols) : i % cols; return { x: gx + c * (bw + gap), y: ys[r] - bh / 2, r }; });
  let s = arrowDefs(id);
  pos.forEach((p, i) => {
    const q = pos[i + 1]; if (!q) return;
    if (q.r === p.r) { const dir = q.x > p.x ? 1 : -1, y = p.y + bh / 2; s += arrow(`M${f1(dir > 0 ? p.x + bw + 3 : p.x - 3)} ${f1(y)} H${f1(dir > 0 ? q.x - 5 : q.x + bw + 5)}`, id); }
    else s += arrow(`M${f1(p.x + bw / 2)} ${f1(p.y + bh + 3)} V${f1(q.y - 5)}`, id);
  });
  const tw = Math.max(10, Math.floor(bw / 7.2)), size = rows === 1 ? 13 : 12;
  pos.forEach((p, i) => {
    const c = INK[i % INK.length];
    s += box(p.x, p.y, bw, bh, c) + badge(p.x + 20, p.y + 20, 11, c, String(i + 1));
    s += text(p.x + bw / 2 + 3, p.y + bh / 2 + 9, d.items[i], { size, w: tw, max: rows === 1 ? 6 : 4, weight: 600 });
  });
  return s;
}
function hub(d, cycle, id, { numbered = false } = {}) {
  const n = d.items.length, cx = W / 2, cy = H / 2, rx = n > 4 ? 164 : 158, ry = n > 4 ? 104 : 100, bw = n > 4 ? 146 : 156, bh = d.notes ? 74 : 50;
  let s = arrowDefs(id);
  const pts = d.items.map((_, i) => { const a = -Math.PI / 2 + (i / n) * Math.PI * 2; return { x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry, a }; });
  if (cycle) pts.forEach((p, i) => {
    const q = pts[(i + 1) % n], a1 = p.a + 0.36, a2 = q.a - 0.36 + (i === n - 1 ? Math.PI * 2 : 0);
    s += arrow(`M${f1(cx + Math.cos(a1) * rx)} ${f1(cy + Math.sin(a1) * ry)} A${rx} ${ry} 0 0 1 ${f1(cx + Math.cos(a2) * rx)} ${f1(cy + Math.sin(a2) * ry)}`, id);
  });
  else pts.forEach((p, i) => {
    // a spoke from the core's edge towards the box, in the box's colour
    const dx = p.x - cx, dy = p.y - cy, len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
    const r0 = 1 / Math.hypot(ux / 70, uy / 34), r1 = len - 1 / Math.max(Math.abs(ux) / (bw / 2), Math.abs(uy) / (bh / 2));
    s += `<path d="M${f1(cx + ux * r0)} ${f1(cy + uy * r0)} L${f1(cx + ux * Math.max(r0 + 4, r1 - 2))} ${f1(cy + uy * Math.max(r0 + 4, r1 - 2))}" stroke="${INK[i % INK.length]}" stroke-width="2"/>`;
  });
  s += cycle ? "" : `<ellipse cx="${cx}" cy="${cy}" rx="70" ry="34" class="gd-core"/>`;
  s += text(cx, cy, cut(d.title, 44), { size: 13.5, w: 16, max: 3, weight: 800, cls: "gd-t gd-strong" });
  pts.forEach((p, i) => {
    const c = INK[i % INK.length];
    s += box(p.x - bw / 2, p.y - bh / 2, bw, bh, c, { rx: 14 });
    if (numbered) s += badge(p.x - bw / 2 + 2, p.y - bh / 2 + 2, 10, c, String(i + 1).padStart(2, "0"), 9);
    if (d.notes?.[i]) {
      const two = lines(d.items[i], Math.floor(bw / 7.4), 2).length > 1;
      s += text(p.x + 3, p.y - (two ? 17 : 20), d.items[i], { size: 11.5, w: Math.floor(bw / 7.4), max: 2, weight: 800, fill: c, cls: "gd-k" }) + text(p.x + 3, p.y + (two ? 17 : 9), d.notes[i], { size: 10, w: Math.floor(bw / 6.1), max: two ? 2 : 3, weight: 500, cls: "gd-t gd-soft" });
    }
    else if (d.notes) s += text(p.x + 3, p.y, d.items[i], { size: 11.5, w: Math.floor(bw / 7.4), max: 3, weight: 800, fill: c, cls: "gd-k" });
    else s += text(p.x + 3, p.y, d.items[i], { size: 12, w: Math.floor(bw / 7.6), max: 2, weight: 650 });
  });
  return s;
}
function timeline(d) {
  const n = d.items.length, x0 = 28, x1 = W - 28, y = H / 2;
  let s = `<path d="M${x0} ${y} H${x1}" class="gd-axis"/>`;
  d.items.forEach((it, i) => {
    const c = INK[i % INK.length], x = n === 1 ? W / 2 : x0 + 40 + (i / (n - 1)) * (x1 - x0 - 80), up = i % 2 === 0;
    s += `<path d="M${f1(x)} ${y} V${up ? y - 34 : y + 34}" stroke="${c}" stroke-width="2"/><circle cx="${f1(x)}" cy="${y}" r="8" fill="${c}" class="gd-ring"/>`;
    s += `<text x="${f1(x)}" y="${up ? y - 48 : y + 48}" font-size="17" font-weight="800" text-anchor="middle" dominant-baseline="middle" fill="${c}" class="gd-k">${esc(it.year)}</text>`;
    s += text(x, up ? y - 96 : y + 96, it.text, { size: 11.5, w: 16, max: 3, weight: 600 });
  });
  return s;
}
function formula(d) {
  const rows = d.rows?.length ? d.rows : [{ f: d.formula, m: d.title }];
  if (rows.length === 1) {
    const f = cut(rows[0].f, 48), size = Math.max(12, Math.min(34, 420 / (Math.max(f.length, 6) * 0.62)));
    return `${box(24, 62, W - 48, 112, INK[0], { rx: 22 })}<text x="${W / 2}" y="118" font-size="${size.toFixed(1)}" font-weight="700" text-anchor="middle" dominant-baseline="middle" fill="${INK[0]}" class="gd-mono gd-k">${esc(f)}</text>
      ${text(W / 2, 222, rows[0].m || d.title, { size: 14, w: 46, max: 3, weight: 600 })}${d.more ? `<text x="${W / 2}" y="282" font-size="11" text-anchor="middle" class="gd-t gd-soft">+ ${d.more} more in the notes</text>` : ""}`;
  }
  const rh = (H - 40 - (rows.length - 1) * 14) / rows.length;
  return rows.map((r, i) => {
    const c = INK[i % INK.length], y = 20 + i * (rh + 14), f = cut(r.f, 34), size = Math.max(11, Math.min(20, 230 / (Math.max(f.length, 6) * 0.62)));
    return `${box(16, y, W - 32, rh, c)}<text x="34" y="${f1(y + rh / 2)}" font-size="${size.toFixed(1)}" font-weight="700" dominant-baseline="middle" fill="${c}" class="gd-mono gd-k">${esc(f)}</text>
      ${r.m ? text(W - 30, y + rh / 2, r.m, { size: 11.5, w: 24, max: 3, anchor: "end", weight: 550 }) : ""}`;
  }).join("") + (d.more ? `<text x="${W / 2}" y="293" font-size="10" text-anchor="middle" class="gd-t gd-soft">+ ${d.more} more in the notes</text>` : "");
}
function compare(d) {
  const cs = [INK[0], INK[1]];
  return [0, 1].map((k) => {
    const x = k ? 254 : 18, c = cs[k];
    return `${box(x, 22, 208, 256, c, { rx: 18, strip: false })}<rect x="${x}" y="22" width="208" height="64" rx="18" fill="${c}"/><rect x="${x}" y="66" width="208" height="20" fill="${c}"/>
      ${text(x + 104, 54, d.items[k], { size: 15, w: 18, max: 2, weight: 800, cls: "gd-on" })}
      ${d.notes?.[k] ? text(x + 104, 180, d.notes[k], { size: 12.5, w: 25, max: 6, weight: 550 }) : ""}`;
  }).join("") + `<circle cx="240" cy="150" r="20" class="gd-vs"/><text x="240" y="151" font-size="12" font-weight="800" text-anchor="middle" dominant-baseline="middle" class="gd-t">vs</text>`;
}
function path(d, id) {
  let s = arrowDefs(id);
  // with nothing listed to know first, the path starts at the lesson: nothing is made up to fill the gap
  const before = d.before || [];
  if (!before.length) return pathShort(d, id);
  before.forEach((b, i) => { const h = before.length > 1 ? 86 : 120, y = H / 2 - (before.length * h + (before.length - 1) * 12) / 2 + i * (h + 12); s += box(14, y, 118, h, "#64748b") + text(76, y + h / 2, b, { size: 11.5, w: 14, max: 5 }); });
  s += `<text x="73" y="26" font-size="10" font-weight="800" text-anchor="middle" class="gd-t gd-soft" letter-spacing="1.2">BEFORE</text>`;
  s += arrow(`M136 ${H / 2} H164`, id);
  s += `<circle cx="214" cy="${H / 2}" r="46" fill="${INK[0]}"/>${text(214, H / 2, cut(d.title, 40), { size: 11.5, w: 11, max: 4, weight: 800, cls: "gd-on" })}`;
  s += arrow(`M264 ${H / 2} H290`, id);
  s += `<text x="384" y="26" font-size="10" font-weight="800" text-anchor="middle" class="gd-t gd-soft" letter-spacing="1.2">YOU CAN</text>`;
  const n = d.items.length, h = (H - 56 - (n - 1) * 10) / n;
  d.items.forEach((o, i) => { const y = 40 + i * (h + 10), c = INK[(i + 1) % INK.length]; s += box(296, y, 170, h, c) + badge(312, y + h / 2, 9, c, "✓", 10) + text(390, y + h / 2, o, { size: 11, w: 21, max: n > 2 ? 3 : 4, weight: 600 }); });
  return s;
}
function pathShort(d, id) {
  let s = arrowDefs(id) + `<circle cx="104" cy="${H / 2}" r="64" fill="${INK[0]}"/>${text(104, H / 2, cut(d.title, 48), { size: 13, w: 13, max: 5, weight: 800, cls: "gd-on" })}`;
  s += arrow(`M174 ${H / 2} H206`, id) + `<text x="340" y="26" font-size="10" font-weight="800" text-anchor="middle" class="gd-t gd-soft" letter-spacing="1.2">YOU CAN</text>`;
  const n = d.items.length, h = (H - 56 - (n - 1) * 10) / n;
  d.items.forEach((o, i) => { const y = 40 + i * (h + 10), c = INK[(i + 1) % INK.length]; s += box(214, y, 252, h, c) + badge(232, y + h / 2, 10, c, "✓", 11) + text(350, y + h / 2, o, { size: 12, w: 30, max: n > 2 ? 3 : 4, weight: 600 }); });
  return s;
}
function mistake(d, id) {
  // a mistake with nothing after it in the notes: one panel, no invented correction
  if (!d.right) return `${box(24, 30, W - 48, 240, BAD, { rx: 22 })}${badge(62, 68, 18, BAD, "✗", 18)}<text x="92" y="69" font-size="13" font-weight="800" letter-spacing="1" dominant-baseline="middle" fill="${BAD}" class="gd-k">COMMON MISTAKE · WATCH FOR THIS</text>
    ${text(W / 2, 170, d.wrong, { size: 16, w: 36, max: 6, weight: 650 })}`;
  return `${arrowDefs(id)}${box(14, 26, 206, 248, BAD, { rx: 18 })}${badge(40, 54, 14, BAD, "✗", 15)}<text x="62" y="55" font-size="13" font-weight="800" dominant-baseline="middle" fill="${BAD}" class="gd-k">Mistake</text>
    ${text(118, 166, d.wrong, { size: 13, w: 22, max: 7, weight: 600 })}
    ${arrow("M226 150 H252", id)}
    ${box(260, 26, 206, 248, GOOD, { rx: 18 })}${badge(286, 54, 14, GOOD, "✓", 15)}<text x="308" y="55" font-size="13" font-weight="800" dominant-baseline="middle" fill="${GOOD}" class="gd-k">Remember</text>
    ${text(364, 166, d.right, { size: 12.5, w: 23, max: 8, weight: 600 })}`;
}
function cardFlow(d, id, heads) {
  // three labelled panels left to right (a case's facts → held → principle)
  let s = arrowDefs(id);
  const bw = 140, gap = 16, x0 = (W - 3 * bw - 2 * gap) / 2;
  d.items.forEach((t, i) => {
    const x = x0 + i * (bw + gap), c = INK[i * 2 % INK.length];
    s += box(x, 22, bw, 256, c, { rx: 16, strip: false }) + `<rect x="${f1(x)}" y="22" width="${bw}" height="40" rx="16" fill="${c}"/><rect x="${f1(x)}" y="46" width="${bw}" height="16" fill="${c}"/>`;
    s += `<text x="${f1(x + bw / 2)}" y="43" font-size="12.5" font-weight="800" text-anchor="middle" dominant-baseline="middle" class="gd-on">${esc(heads[i])}</text>`;
    s += text(x + bw / 2, 170, t, { size: 11.5, w: 19, max: 10, weight: 550 });
    if (i < 2) s += arrow(`M${f1(x + bw + 2)} 150 H${f1(x + bw + gap - 3)}`, id);
  });
  return s;
}
function quad(d, heads) {
  return d.items.map((t, i) => {
    const x = i % 2 ? 246 : 14, y = i < 2 ? 14 : 156, c = INK[[0, 3, 7, 5][i]];
    return `${box(x, y, 220, 130, c, { rx: 16 })}<text x="${x + 18}" y="${y + 22}" font-size="11" font-weight="800" letter-spacing="1" dominant-baseline="middle" fill="${c}" class="gd-k">${esc(heads[i].toUpperCase())}</text>
      ${text(x + 114, y + 76, t, { size: 12, w: 28, max: 4, weight: 550 })}`;
  }).join("");
}
function rows(d, render) {
  const n = d.items.length, gap = 10, h = (H - 28 - (n - 1) * gap) / n;
  return d.items.map((it, i) => render(it, i, 14 + i * (h + gap), h)).join("");
}
function terms(d) {
  return rows(d, (it, i, y, h) => { const c = INK[i % INK.length]; return `${pill(14, y + h / 2 - 20, 150, 40, c)}${text(89, y + h / 2, it.term, { size: 12.5, w: 18, max: 2, weight: 800, fill: c, cls: "gd-k" })}
    <path d="M170 ${f1(y + h / 2)} H186" stroke="${c}" stroke-width="2"/>${box(190, y, W - 204, h, c)}${text(196 + (W - 216) / 2, y + h / 2, it.def, { size: 12, w: 36, max: h > 70 ? 3 : 2, weight: 550 })}`; });
}
function facts(d) {
  return rows(d, (it, i, y, h) => { const c = INK[i % INK.length]; return `${box(14, y, W - 28, h, c)}${text(it.def ? 128 : W / 2, y + h / 2, it.term, { size: 12.5, w: it.def ? 25 : 56, max: 3, weight: 800, fill: c, cls: "gd-k" })}
    ${it.def ? `<path d="M244 ${f1(y + 12)} V${f1(y + h - 12)}" stroke="${c}" stroke-opacity=".5" stroke-width="1.4"/>${text(356, y + h / 2, it.def, { size: 12, w: 28, max: 3, weight: 550 })}` : ""}`; });
}
function summary(d) {
  return rows(d, (t, i, y, h) => { const c = INK[i % INK.length]; return `${box(14, y, W - 28, h, c)}${badge(40, y + h / 2, 11, c, "✓", 12)}${text(64, y + h / 2, t, { size: 12.5, w: 56, max: h > 60 ? 3 : 2, anchor: "start", weight: 600 })}`; });
}
function evidence(d) {
  const C = { established: GOOD, contested: WARN, hypothetical: "#7c3aed" }, L = { established: "Established", contested: "Contested", hypothetical: "Hypothetical" };
  return rows(d, (it, i, y, h) => { const c = C[it.status] || INK[i % INK.length]; return `${box(14, y, W - 28, h, c)}${pill(26, y + h / 2 - 14, 108, 28, c)}<text x="80" y="${f1(y + h / 2 + 0.5)}" font-size="11" font-weight="800" text-anchor="middle" dominant-baseline="middle" fill="${c}" class="gd-k">${esc(L[it.status] || it.status)}</text>
    ${text(146, y + h / 2, it.text, { size: 12, w: 44, max: h > 60 ? 3 : 2, anchor: "start", weight: 550 })}`; });
}
function recall(d) {
  return rows(d, (it, i, y, h) => { const c = INK[i % INK.length]; return `${box(14, y, W - 28, h, c)}${badge(38, y + 22, 11, c, "?", 13)}
    ${text(60, y + h * 0.34, it.q, { size: 12.5, w: 54, max: 2, anchor: "start", weight: 700 })}${text(60, y + h * 0.74, `→ ${it.a}`, { size: 11.5, w: 58, max: 1, anchor: "start", weight: 550, fill: c, cls: "gd-k" })}`; });
}
function points(d) {
  return rows(d, (t, i, y, h) => { const c = INK[i % INK.length]; return `${box(14, y, W - 28, h, c)}${badge(40, y + h / 2, 11, c, String(i + 1), 12)}${text(64, y + h / 2, t, { size: 12.5, w: 56, max: h > 60 ? 3 : 2, anchor: "start", weight: 550 })}`; });
}
function key(d) {
  return `${box(24, 30, W - 48, 240, INK[0], { rx: 22 })}<circle cx="62" cy="68" r="20" fill="${INK[0]}"/><path d="M62 57v9m0 7v1" stroke="#fff" stroke-width="3.2"/>
    <text x="94" y="69" font-size="13" font-weight="800" letter-spacing="1" dominant-baseline="middle" fill="${INK[0]}" class="gd-k">KEY IDEA</text>
    ${text(W / 2, 172, d.text, { size: 16, w: 36, max: 6, weight: 650 })}`;
}
const KIND = { facts: "Key facts", key: "Key idea", flow: "Process", formula: "Formula", hub: "Structure", cycle: "Cycle", timeline: "Timeline", compare: "Compare", map: "Lesson map", path: "Learning path", mistake: "Common mistake", case: "Case", drug: "Drug", terms: "Key terms", summary: "Summary", evidence: "Evidence", recall: "Test yourself", points: "Key points" };
export const DIAGRAM_KINDS = Object.keys(KIND);

/** The diagram alone, as an SVG string: crisp coloured lines and parts, text in the page's ink. */
export function diagramSvg(d, id = `gd${hash(JSON.stringify(d)) % 1e6}`) {
  const body = d.kind === "flow" ? flow(d, id) : d.kind === "formula" ? formula(d) : d.kind === "timeline" ? timeline(d) : d.kind === "compare" ? compare(d)
    : d.kind === "map" ? hub(d, false, id, { numbered: true }) : d.kind === "path" ? path(d, id) : d.kind === "mistake" ? mistake(d, id)
    : d.kind === "case" ? cardFlow(d, id, ["Facts", "Held", "Principle"]) : d.kind === "drug" ? quad(d, ["Class and mechanism", "Uses", "Cautions", "Monitoring"])
    : d.kind === "facts" ? facts(d) : d.kind === "key" ? key(d) : d.kind === "terms" ? terms(d) : d.kind === "summary" ? summary(d) : d.kind === "evidence" ? evidence(d) : d.kind === "recall" ? recall(d) : d.kind === "points" ? points(d)
    : hub(d, d.kind === "cycle", id);
  return `<svg viewBox="0 0 ${W} ${H}" class="gd-svg" fill="none" stroke-linecap="round" stroke-linejoin="round" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" font-family="inherit" role="img" aria-label="${esc(`${KIND[d.kind]} diagram: ${d.title}`)}">${body}</svg>`;
}

// ---------- the card: the diagram as real text (HTML), so nothing is cut off, it reflows to any width, a screen
// reader reads it as lists and panels, and the learner can cover the answers and recall them ----------
const ICON = {
  flow: '<path d="M4 12h14M13 7l5 5-5 5"/>',
  hub: '<circle cx="12" cy="12" r="3"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/>',
  cycle: '<path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v4.5h-4.5"/>',
  timeline: '<path d="M3 12h18M7 8v8M12 8v8M17 8v8"/>',
  formula: '<path d="M8 20c2.2 0 2.4-2.5 3.2-8S13 4 15.6 4M7 11h8"/>',
  compare: '<path d="M12 3v18M4 7h5v10H4zM15 7h5v10h-5z"/>',
  mistake: '<path d="M12 3.5 21.5 20h-19zM12 10v4.5M12 17.4v.1"/>',
  key: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z"/>',
  path: '<path d="M5 21V4h11l-2 4 2 4H5"/>',
  recall: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.2a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .9-1 1.6v.6M12 17v.1"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.1M4.5 12h.1M4.5 18h.1"/>',
};
const iconOf = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[k] || (k === "facts" ? ICON.formula : ICON.list)}</svg>`;
// how to use each kind, in a line: what to look at, then how to test yourself on it
const TIP = {
  flow: "Read the steps in order, then cover them and talk yourself through each one.",
  hub: "Each branch is one part of the idea. Cover them and name every branch.",
  map: "This lesson's sections, in order. Tap one to go straight to it.",
  cycle: "Each stage leads to the next, and the last leads back to the first. Trace the loop out loud.",
  timeline: "Read it in date order, then cover the events and recall what happened when.",
  formula: "Cover the formula, read what it means, and write it out from memory.",
  facts: "Cover the right-hand side and recall each one.",
  compare: "Spot the difference. Cover both meanings and explain each in your own words.",
  path: "What you need first, and what you'll be able to do by the end.",
  mistake: "Learn the trap and the fix together. Cover the fix and say it before you check.",
  case: "The facts, the decision, the principle. From the facts, recall the other two.",
  drug: "From the drug's name alone, recall what each box says.",
  terms: "Cover the meanings and define each term before you reveal it.",
  summary: "The lesson in a few lines. Finish each one from its first words.",
  evidence: "Decide how strong the evidence is for each claim, then reveal.",
  recall: "Answer each question in your head before you reveal it.",
  points: "The section's main points. Finish each one from its first words.",
  key: "The one idea to hold on to. Finish it from its first words.",
};
const ink = (i) => INK[i % INK.length];
// an answer: hidden in Cover & recall, revealed by a tap, Enter or Space
const A = (t, tag = "span", cls = "") => `<${tag} class="gd-a${cls ? ` ${cls}` : ""}">${esc(t)}</${tag}>`;
// a sentence with its first few words left showing as the cue, the rest as the answer
const cued = (t) => {
  const w = String(t).split(" ");
  return w.length > 6 ? `${esc(w.slice(0, 3).join(" "))} ${A(w.slice(3).join(" "))}` : A(t);
};
const num = (i, c) => `<span class="gd-n" style="--c:${c}" aria-hidden="true">${i + 1}</span>`;
const tick = (c, s = "✓") => `<span class="gd-n" style="--c:${c}" aria-hidden="true">${s}</span>`;

function bodyHub(d, { map = false, cycle = false } = {}) {
  const li = d.items.map((x, i) => {
    const c = ink(i);
    if (map) return `<li><button type="button" class="gd-item gd-node" data-jump="co-s${i + 1}" style="--c:${c}">${num(i, c)}<span>${esc(x)}</span></button></li>`;
    const note = d.notes?.[i];
    const words = note ? `<b class="gd-k">${esc(x)}</b>${A(note, "span", "gd-sub")}` : cycle && i === 0 ? `<b class="gd-k">${esc(x)}</b>` : `<b class="gd-k">${A(x)}</b>`;
    return `<li class="gd-item"${note ? " data-gd-row" : ""} style="--c:${c}">${cycle ? `${num(i, c)}<div>${words}</div>` : words}</li>`;
  }).join("");
  const core = cycle ? ringView(d) : `<p class="gd-core">${esc(d.title)}</p>`;
  return `<div class="gd-hub${cycle ? " gd-cyc" : ""}">${core}<${map || cycle ? "ol" : "ul"} class="gd-branches${d.items.length === 4 ? " gd-four" : ""}">${li}</${map || cycle ? "ol" : "ul"}>${cycle ? `<p class="gd-loop"><span aria-hidden="true">↻</span> then back to 1, and round again</p>` : ""}</div>`;
}
// a cycle as a real loop (on a wide card): the stages round a ring, an arrow from each to the next, and the stage you
// pick explained in the middle. On a narrow card, and while practising, the stages show as a list instead.
function ringView(d) {
  const n = d.items.length; if (n < 3 || n > 6) return "";
  const X = 300, Y = 190, RX = 222, RY = 140, pt = (t) => [X + RX * Math.cos(t), Y + RY * Math.sin(t)], ang = (i) => -Math.PI / 2 + (i / n) * 2 * Math.PI;
  const gap = n <= 4 ? 0.42 : 0.34;
  const arcs = d.items.map((_, i) => { const [x1, y1] = pt(ang(i) + gap), [x2, y2] = pt(ang(i + 1) - gap); return `<path d="M${f1(x1)} ${f1(y1)} A${RX} ${RY} 0 0 1 ${f1(x2)} ${f1(y2)}" class="gd-rarc" style="--c:${ink(i)}" marker-end="url(#gdr-${n})"/>`; }).join("");
  const nodes = d.items.map((x, i) => { const [cx, cy] = pt(ang(i)); return `<button type="button" class="gd-rnode" data-gd-ring="${i}" aria-pressed="false" style="left:${f1(cx / 6)}%;top:${f1(cy / 3.8)}%;--c:${ink(i)}">${num(i, ink(i))}<span>${esc(x)}</span></button>`; }).join("");
  const notes = d.items.map((x, i) => `<template data-gd-note="${i}"><b class="gd-k" style="--c:${ink(i)}">${i + 1}. ${esc(x)}</b>${d.notes?.[i] ? `<span>${esc(d.notes[i])}</span>` : ""}<small>Then: ${esc(d.items[(i + 1) % n])} ${i === n - 1 ? "↻" : "→"}</small></template>`).join("");
  return `<div class="gd-ringview"><svg viewBox="0 0 600 380" aria-hidden="true"><defs><marker id="gdr-${n}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1.5 1.5 8 5 1.5 8.5" fill="none" stroke="context-stroke" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker></defs><ellipse cx="${X}" cy="${Y}" rx="${RX}" ry="${RY}" class="gd-rtrack"/>${arcs}</svg>
    ${nodes}<div class="gd-rmid" aria-live="polite"><b>${esc(d.title)}</b><span>Tap a stage to read it, or step through the loop.</span></div>${notes}</div>`;
}
function bodyFlow(d) {
  return `<ol class="gd-flow${d.items.length <= 3 ? " gd-row" : ""}">${d.items.map((s, i) => `<li style="--c:${ink(i)}">${num(i, ink(i))}<p class="gd-item">${A(s)}</p></li>`).join("")}</ol>`;
}
// the dates on a true scale: how far apart they really are, and the gap in years between each
function timeScale(d) {
  const ys = d.items.map((it) => Number(it.year)), lo = Math.min(...ys), hi = Math.max(...ys), span = hi - lo;
  if (!(span > 0) || ys.length < 2) return "";
  const at = (y) => (4 + ((y - lo) / span) * 92).toFixed(1);
  const gaps = ys.slice(1).map((y, i) => { const g = y - ys[i]; return g > 0 && (y - ys[i]) / span > 0.14 ? `<span class="gd-gap" style="left:${((Number(at(ys[i])) + Number(at(y))) / 2).toFixed(1)}%">${g} year${g > 1 ? "s" : ""}</span>` : ""; }).join("");
  // a date's label shows unless it would sit on top of the one before
  const far = ys.map((y, i) => !i || (y - ys[i - 1]) / span > 0.09);
  return `<div class="gd-scale" role="img" aria-label="${esc(`To scale: ${ys.join(", ")}, ${span} years from first to last`)}"><span class="gd-scalek" aria-hidden="true">To scale</span><i class="gd-axis2"></i>${ys.map((y, i) => `<span class="gd-tick" style="left:${at(y)}%;--c:${ink(i)}">${far[i] ? `<b>${y}</b>` : ""}</span>`).join("")}${gaps}</div>`;
}
function bodyTimeline(d) {
  return `${timeScale(d)}<ol class="gd-time">${d.items.map((it, i) => `<li style="--c:${ink(i)}"><b class="gd-year gd-k">${esc(it.year)}</b><i class="gd-dot" aria-hidden="true"></i>${A(it.text, "p", "gd-item")}</li>`).join("")}</ol>`;
}
function bodyFormula(d) {
  const rows = d.rows?.length ? d.rows : [{ f: d.formula, m: d.title }];
  return `<div class="gd-frows${rows.length === 1 ? " gd-one" : ""}">${rows.map((r, i) => `<div class="gd-item gd-frow" style="--c:${ink(i)}"><code class="gd-f gd-k${r.m ? " gd-a" : ""}">${esc(r.f)}</code>${r.m ? `<p class="gd-m">${esc(r.m)}</p>` : ""}</div>`).join("")}</div>${d.more ? `<p class="gd-more">+ ${d.more} more formula${d.more > 1 ? "s" : ""} in the notes</p>` : ""}`;
}
function bodyCompare(d) {
  const col = (k) => `<section class="gd-item gd-col"${d.notes?.[k] ? " data-gd-row" : ""} style="--c:${ink(k)}"><b class="gd-colh">${esc(d.items[k])}</b>${d.notes?.[k] ? A(d.notes[k], "p") : ""}</section>`;
  return `<div class="gd-cmp">${col(0)}<span class="gd-vs" aria-hidden="true">vs</span>${col(1)}</div>`;
}
function bodyPath(d) {
  const before = d.before || [];
  return `<div class="gd-panels gd-pathp">${before.length ? `<section class="gd-item" style="--c:#64748b"><b class="gd-ph">Before</b><ul class="gd-rows">${before.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></section>` : ""}
    <section class="gd-item gd-here" style="--c:${ink(0)}"><b class="gd-ph">This lesson</b><p>${esc(d.title)}</p></section>
    <section class="gd-item" style="--c:${GOOD}"><b class="gd-ph">You'll be able to</b><ul class="gd-rows">${d.items.map((o) => `<li>${tick(GOOD)}<span>${esc(o)}</span></li>`).join("")}</ul></section></div>`;
}
function bodyMistake(d) {
  if (!d.right) return `<div class="gd-item gd-warn" style="--c:${BAD}"><b class="gd-ph">${tick(BAD, "✗")} Watch for this</b><p>${esc(d.wrong)}</p></div>`;
  return `<div class="gd-panels gd-two"><section class="gd-item" data-gd-wrong style="--c:${BAD}"><b class="gd-ph">${tick(BAD, "✗")} The mistake</b><p>${esc(d.wrong)}</p></section>
    <section class="gd-item" data-gd-right style="--c:${GOOD}"><b class="gd-ph">${tick(GOOD)} What's true instead</b>${A(d.right, "p")}</section></div>`;
}
function bodyPanels(d, heads, { answerFrom = 0, cols = 3 } = {}) {
  return `<div class="gd-panels gd-c${cols}">${d.items.map((t, i) => `<section class="gd-item" style="--c:${ink(i * 2)}"><b class="gd-ph">${esc(heads[i])}</b>${i >= answerFrom ? A(t, "p") : `<p>${esc(t)}</p>`}</section>`).join("")}</div>`;
}
function bodyDefs(d) {
  return `<dl class="gd-defs">${d.items.map((it, i) => `<div class="gd-item"${it.def ? " data-gd-row" : ""} style="--c:${ink(i)}"><dt class="gd-k">${esc(it.term)}</dt>${it.def ? A(it.def, "dd") : ""}</div>`).join("")}</dl>`;
}
function bodyRows(d, kind) {
  const EV = { established: GOOD, contested: WARN, hypothetical: "#7c3aed" }, EVL = { established: "Established", contested: "Contested", hypothetical: "Hypothetical" };
  const tag = kind === "points" ? "ol" : "ul";
  return `<${tag} class="gd-rows gd-stack">${d.items.map((it, i) => {
    const c = kind === "evidence" ? (EV[it.status] || ink(i)) : ink(i);
    if (kind === "summary") return `<li class="gd-item" style="--c:${c}">${tick(c)}<p>${cued(it)}</p></li>`;
    if (kind === "points") return `<li class="gd-item" style="--c:${c}">${num(i, c)}<p>${cued(it)}</p></li>`;
    if (kind === "evidence") return `<li class="gd-item" data-status="${esc(it.status)}" style="--c:${c}"><span class="gd-pill gd-a">${esc(EVL[it.status] || it.status)}</span><p>${esc(it.text)}</p></li>`;
    return `<li class="gd-item gd-qa" style="--c:${c}">${tick(c, "?")}<div><p class="gd-q">${esc(it.q)}</p>${A(it.a, "p", "gd-k")}</div></li>`;
  }).join("")}</${tag}>`;
}
function bodyKey(d) {
  return `<div class="gd-item gd-keybox" style="--c:${ink(0)}"><p>${cued(d.text)}</p></div>`;
}
function cardBody(d) {
  switch (d.kind) {
    case "map": return bodyHub(d, { map: true });
    case "cycle": return bodyHub(d, { cycle: true });
    case "flow": return bodyFlow(d);
    case "timeline": return bodyTimeline(d);
    case "formula": return bodyFormula(d);
    case "compare": return bodyCompare(d);
    case "path": return bodyPath(d);
    case "mistake": return bodyMistake(d);
    case "case": return bodyPanels(d, ["The facts", "Held", "The principle"], { answerFrom: 1 });
    case "drug": return bodyPanels(d, ["Class and mechanism", "Uses", "Cautions", "Monitoring"], { cols: 2 });
    case "terms": case "facts": return bodyDefs(d);
    case "summary": case "points": case "evidence": case "recall": return bodyRows(d, d.kind);
    case "key": return bodyKey(d);
    default: return bodyHub(d);
  }
}
// a cue to remember a structure by: the first letters of its parts, in order (only when every part is a short name)
function firstLetters(d) {
  if (!["hub", "cycle", "map"].includes(d.kind) || !(d.items?.length >= 3)) return "";
  const words = d.items.map((x) => String(x).replace(/^[^A-Za-z0-9]+/, ""));
  if (!words.every((w) => w && w.split(" ").length <= 4 && !/…$/.test(w))) return "";
  const first = words.map((w) => w[0].toUpperCase());
  // a cue only helps if the letters tell the parts apart (not "A · A · A · A")
  return new Set(first).size >= Math.ceil(first.length * 0.75) ? first.join(" · ") : "";
}

// the ways to work with a card, besides reading it: each one a button in its footer
//   quiz   Cover & recall: every answer hidden; reveal them one by one
//   step   Step through: one step at a time, the ones still to come hidden, so you predict each next step
//   match  Match up: the meanings shuffled into a pile; put each with its term
//   pick   Which is true?: the mistake and the truth, side by side; choose before you see which is which
//   rate   Rate the evidence: say how strong each claim is before you see it
//   order  Put in order: the steps (or a timeline's events) shuffled; tap them in the order they come
const MODE_LABEL = { quiz: "Cover & recall", step: "Step through", order: "Put in order", match: "Match up", pick: "Which is true?", rate: "Rate the evidence" };
function modesOf(d, body) {
  const m = [];
  if ((d.kind === "flow" || d.kind === "cycle") && d.items?.length >= 2) m.push("step");
  if ((d.kind === "flow" || d.kind === "timeline") && d.items?.length >= 3) m.push("order");
  if ((body.match(/data-gd-row/g) || []).length >= 2) m.push("match");
  if (d.kind === "mistake" && d.right) m.push("pick");
  if (d.kind === "evidence" && d.items?.length >= 2) m.push("rate");
  if (/class="[^"]*\bgd-a\b/.test(body)) m.push("quiz");
  return m;
}
const kindName = (d) => (d.kind === "flow" && d.ex ? "Worked example" : KIND[d.kind] || "Diagram");
const tipOf = (d) => (d.kind === "flow" && d.ex ? "Work it through yourself: step through it one step at a time, and say what comes next before you see it." : TIP[d.kind] || "");

/**
 * A diagram card, as HTML: the glass look (a coloured tile behind, a rainbow edge) around the diagram as real text.
 *   size     "md" (a lesson or panel) or "sm" (a flashcard or detail panel: no header actions, no footer)
 *   caption  false: no header or footer at all (the diagram alone)
 *   quiz     true: start with the answers covered, for recall (the lesson's Recap)
 *   n, of    its place among the lesson's diagrams ("2 of 5")
 */
export function glassDiagram(d, { size = "md", seed = d?.title, caption = true, quiz = false, n = 0, of = 0, id = "", key = "" } = {}) {
  if (!d) return "";
  const h = hash(seed || d.kind), [a, b] = PAIRS[h % PAIRS.length], turn = ((h >> 4) % 2 ? 1 : -1) * (0.8 + ((h >> 6) % 3) * 0.4);
  const body = cardBody(d), full = caption && size !== "sm", kind = kindName(d);
  const modes = full ? modesOf(d, body) : [], covered = quiz && modes.includes("quiz");
  const answers = (body.match(/class="[^"]*\bgd-a\b/g) || []).length;
  // the title, unless the card already shows it (a structure's middle, a mistake's own words) or it only repeats the kind
  const title = !d.title || d.title.toLowerCase() === kind.toLowerCase() || ["hub", "map", "mistake"].includes(d.kind) ? "" : d.title;
  const fl = full ? firstLetters(d) : "";
  const head = caption ? `<figcaption class="gd-head"><span class="gd-kind">${iconOf(d.kind)}${esc(kind)}</span>${title ? `<span class="gd-title">${esc(title)}</span>` : ""}${n && of ? `<span class="gd-num">${n} of ${of}</span>` : ""}</figcaption>` : "";
  const btn = (m) => `<button type="button" class="gd-btn${m === modes[0] ? " gd-main" : ""}" data-gd-mode="${m}" aria-pressed="${covered && m === "quiz"}">${covered && m === "quiz" ? "Show all" : esc(MODE_LABEL[m])}</button>`;
  const foot = full ? `<div class="gd-foot"><p class="gd-tip">${esc(tipOf(d))}${fl ? ` <span class="gd-cue">First letters: <b>${esc(fl)}</b></span>` : ""}</p>
      <div class="gd-acts">${modes.map(btn).join("")}<button type="button" class="gd-btn gd-ghost" data-gd-zoom aria-label="Open this diagram full size">Expand</button></div>
      <p class="gd-score" aria-live="polite">${covered ? `0 of ${answers} revealed` : ""}</p></div>` : "";
  let html = `<figure class="gd gd-${size}${covered ? " quiz" : ""}"${covered ? ' data-mode="quiz"' : ""}${id ? ` id="${esc(id)}"` : ""}${key && full ? ` data-gd-key="${esc(key)}"` : ""} data-kind="${d.kind}" style="--a:${a};--b:${b};--tw:${turn.toFixed(1)}deg">
    <span class="gd-back" aria-hidden="true"></span><div class="gd-card">${head}<div class="gd-body">${body}</div>${foot}</div></figure>`;
  // covered from the start: each answer is a button until it's revealed
  if (covered) html = html.replace(/class="([^"]*\bgd-a\b[^"]*)"/g, `role="button" tabindex="0" aria-label="Hidden answer: reveal" class="$1"`);
  return html;
}

// ---------- the small cards, dotted through the notes ----------
// Fill the gap: a sentence with its bold term taken out, the term and two of the lesson's other terms to choose from.
// Numbers to know: the values a section turns on (a resting potential, a dose, a percentage, a year), each in its own
// sentence from the notes, with the number covered to recall. Quick check: one of the lesson's own questions, beside
// the section it tests. Every word is the notes' own; a section gets one at most, and a lesson four at most.
const UNIT = "%|°C|°F|mV|µV|mmol\\/L|µmol\\/L|mmHg|kPa|Pa|mg\\/kg|mg\\/day|mg|µg|mcg|ng|g\\/L|g\\/dL|kg|g|mL\\/min|mL|ml|L|ms|s|min|minutes|hours|hrs|h|days|weeks|months|years|Hz|kHz|nm|µm|mm|cm|km|m|bpm|breaths\\/min|kcal|kJ|J|W|kW|V|A|mol|M|K|dB|units?|times|fold";
const NUM = new RegExp(`(?<![\\w.^_/])([−–-]?\\d+(?:[.,]\\d+)?(?:\\s?(?:–|-|to)\\s?[−–-]?\\d+(?:[.,]\\d+)?)?)\\s?(${UNIT})(?![\\w/])`);
const words = (t) => String(t).split(/\s+/).filter(Boolean);
function numberLine(sentence) {
  const m = sentence.match(NUM); if (!m) return null;
  // the clause the number sits in: from the last ; or : before it, to the next ; after it (or the bracket it's in)
  const before = sentence.slice(0, m.index).split(/[;:]\s/).pop().trim();
  let after = sentence.slice(m.index + m[0].length).split(/;\s/)[0].trim();
  const open = (before.match(/\(/g) || []).length > (before.match(/\)/g) || []).length;
  if (open && after.includes(")")) after = after.slice(0, after.indexOf(")") + 1);
  else if (!open && /\s\(/.test(after)) after = after.slice(0, after.search(/\s\(/));
  const bw = words(before), aw = words(after), keepB = bw.slice(-9), keepA = aw.slice(0, 9);
  return { pre: `${bw.length > 9 ? "…" : ""}${keepB.join(" ")}`, n: m[0].trim(), post: `${keepA.join(" ")}${aw.length > 9 ? "…" : ""}` };
}
const sectionsOf = (L) => {
  const out = []; let cur = null;
  (L?.blocks || []).forEach((b, i) => {
    if (b.t === "h") { cur = { heading: b.x, blocks: [] }; out.push(cur); return; }
    if (!cur) { cur = { heading: null, blocks: [] }; out.push(cur); }
    cur.blocks.push(i);
  });
  return out.filter((s) => s.blocks.length);
};
const textOf = (b) => (b.t === "ul" ? b.items.join(" ") : b.t === "eq" ? b.rows.map((r) => r.join(" ")).join(" ") : b.t === "ex" ? [b.x, ...b.steps].join(" ") : b.x || "");
const bag = (t) => new Set((plain(t).toLowerCase().match(/[a-z]{5,}/g) || []));

/** The small cards for a lesson: [{ kind: "numbers" | "check" | "gap", at, … }], `at` the last block of the section each checks. */
export function minisFor(L, { skipQ = [], max = 4 } = {}) {
  const secs = sectionsOf(L), cards = (L?.cards || []).filter(([q]) => !skipQ.some((x) => x && plain(q).startsWith(x)));
  const used = new Set(), out = [], bolds = boldTerms(L);
  secs.forEach((sec, k) => {
    const blocks = sec.blocks.map((i) => L.blocks[i]);
    // numbers: one line for each sentence that holds one, from the section's prose and lists
    const lines = [], seen = new Set();
    for (const b of blocks) {
      if (!["p", "ul", "key"].includes(b.t)) continue;
      for (const piece of b.t === "ul" ? b.items : [b.x]) for (const s of sentences(piece)) {
        const l = numberLine(s); if (l && !seen.has(l.n)) { seen.add(l.n); lines.push(l); }
      }
    }
    const nums = lines.length >= 2 ? { kind: "numbers", title: plain(sec.heading || L.title || ""), items: lines.slice(0, 3) } : null;
    // a question: the lesson's card that shares most words with this section
    const sb = bag(blocks.map(textOf).join(" "));
    let best = -1, score = 1;
    cards.forEach(([q, a], j) => { if (used.has(j)) return; const s = [...bag(`${q} ${a}`)].filter((w) => sb.has(w)).length; if (s > score) { score = s; best = j; } });
    const check = best >= 0 ? { kind: "check", q: cut(cards[best][0], 200), a: cut(cards[best][1], 260), j: best } : null;
    // a gap to fill: a sentence with the term the notes put in bold taken out, and three to choose from
    const gaps = [];
    for (const b of blocks) if (b.t === "p") for (const raw of rawSentences(b.x)) {
      const g = gapLine(raw, bolds); if (g && !gaps.some((x) => x.ans.toLowerCase() === g.ans.toLowerCase())) gaps.push(g);
    }
    const gap = gaps.length ? { kind: "gap", title: plain(sec.heading || L.title || ""), items: gaps.slice(0, 2) } : null;
    // one a section, taking turns, so the lesson gets a mix
    const pickNow = [[nums, check, gap], [check, gap, nums], [gap, nums, check]][k % 3].find(Boolean);
    if (!pickNow) return;
    if (pickNow.kind === "check") used.add(pickNow.j);
    // at the end of the section: read it, then check yourself on it
    const { j, ...m } = pickNow;
    out.push({ ...m, at: sec.blocks.at(-1) });
  });
  return out.slice(0, max);
}
// the terms a lesson puts in bold in its prose: the gaps, and the other choices for each gap
function boldTerms(L) {
  const out = new Map();
  for (const b of L?.blocks || []) if (b.t === "p") for (const m of String(b.x).matchAll(/\*\*([^*]{3,40})\*\*/g)) {
    const t = plain(m[1]); if (/[a-z]/i.test(t) && !out.has(t.toLowerCase())) out.set(t.toLowerCase(), t);
  }
  return [...out.values()];
}
const rawSentences = (t) => String(t ?? "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/(?<=[a-z0-9)%*][.!?])\s+(?=[A-Z*])/).map((x) => x.trim()).filter(Boolean);
function gapLine(raw, bolds) {
  const m = raw.match(/\*\*([^*]{3,40})\*\*/); if (!m) return null;
  const ans = plain(m[1]), pre = plain(raw.slice(0, m.index)), post = plain(raw.slice(m.index + m[0].length));
  const len = pre.length + ans.length + post.length;
  // the sentence has to say enough round the gap to work it out, and the lesson has to have other terms to choose from
  if (len < 40 || len > 260 || pre.length + post.length < 25) return null;
  const others = bolds.filter((t) => t.toLowerCase() !== ans.toLowerCase() && !raw.toLowerCase().includes(t.toLowerCase()));
  if (others.length < 2) return null;
  const pick = others.map((t) => [hash(`${ans}|${t}`), t]).sort((a, b) => a[0] - b[0]).slice(0, 2).map(([, t]) => t);
  const choices = [ans, ...pick].map((t) => [hash(`${raw}|${t}`), t]).sort((a, b) => a[0] - b[0]).map(([, t]) => t);
  return { pre, ans, post, choices };
}
const MINI_ICON = { numbers: '<path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16"/>', check: ICON.recall, gap: '<path d="M4 7h4M16 7h4M4 17h16M10 4.5h4v5h-4z"/>' };
/** A small card, as HTML: always starts covered, so it asks before it tells. */
export function miniCard(m, { key = "" } = {}) {
  if (!m) return "";
  const k = key ? ` data-gd-key="${esc(key)}"` : "";
  const h = hash(m.q || m.title || m.kind), [a, b] = PAIRS[h % PAIRS.length], c = INK[h % INK.length];
  const btn = (label) => `role="button" tabindex="0" aria-label="${label}"`;
  const head = (name, extra = "") => `<figcaption class="gd-mhead"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${MINI_ICON[m.kind]}</svg><span>${name}</span>${extra}</figcaption>`;
  if (m.kind === "gap") return `<figure class="gd gd-mini quiz" data-mode="quiz" data-kind="gap"${k} style="--a:${a};--b:${b};--c:${c}">${head("Fill the gap")}
    <ul class="gd-nums gd-gaps">${m.items.map((g, i) => `<li style="--c:${INK[(h + i) % INK.length]}"><p>${esc(g.pre)} <span class="gd-a gd-numa gd-gapa" ${btn("Hidden word: reveal")}>${esc(g.ans)}</span> ${esc(g.post)}</p>
      <span class="gd-opts" role="group" aria-label="Which word fits the gap?">${g.choices.map((t) => `<button type="button" class="gd-chip" data-gd-fill="${t === g.ans ? 1 : 0}">${esc(t)}</button>`).join("")}</span></li>`).join("")}</ul>
    <p class="gd-mhint">Which word fits? Tap one, or tap the gap to see it.</p></figure>`;
  if (m.kind === "check") return `<figure class="gd gd-mini quiz" data-mode="quiz" data-kind="check"${k} style="--a:${a};--b:${b};--c:${c}">${head("Quick check")}
    <p class="gd-mq">${esc(m.q)}</p><p class="gd-a gd-ma" ${btn("Hidden answer: reveal")}>${esc(m.a)}</p><p class="gd-mhint">Answer it in your head, then tap the band.</p></figure>`;
  return `<figure class="gd gd-mini quiz" data-mode="quiz" data-kind="numbers"${k} style="--a:${a};--b:${b};--c:${c}">${head("Numbers to know", `<button type="button" class="gd-mbtn" data-gd-mode="quiz" aria-pressed="true">Show all</button>`)}
    <ul class="gd-nums">${m.items.map((l, i) => `<li style="--c:${INK[(h + i) % INK.length]}">${esc(l.pre)} <span class="gd-a gd-numa" ${btn("Hidden number: reveal")}>${esc(l.n)}</span> ${esc(l.post)}${/^\d+(\.\d+)?%$/.test(l.n) && parseFloat(l.n) <= 100 ? `<span class="gd-bar" aria-hidden="true"><i style="width:${parseFloat(l.n)}%"></i></span>` : ""}</li>`).join("")}</ul>
    <p class="gd-mhint">What's each number? Say it, then tap to check.</p></figure>`;
}

// ---------- in the browser: the modes and full size, for every card on the page (one listener for all) ----------
const say = (fig, t) => { const o = fig.querySelector(".gd-score"); if (o) o.textContent = t; };
const asButton = (el, label) => { el.setAttribute("role", "button"); el.tabIndex = 0; el.setAttribute("aria-label", label); };
const unButton = (el) => { el.removeAttribute("role"); el.removeAttribute("tabindex"); el.removeAttribute("aria-label"); };
const cueOf = (row) => (row.querySelector("dt, .gd-colh, .gd-k")?.textContent || "").trim();
const shuffle = (xs) => { const a = [...xs]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } if (a.length > 1 && a.every((x, i) => x === xs[i])) a.push(a.shift()); return a; };

function score(fig) {
  if (fig.dataset.mode !== "quiz") return;
  const all = fig.querySelectorAll(".gd-a").length, seen = fig.querySelectorAll(".gd-a.seen").length;
  say(fig, seen < all ? `${seen} of ${all} revealed` : `All ${all} revealed. How many did you know?`);
  if (all && seen === all) done(fig, "quiz", fig.dataset.kind === "gap" && [...fig.querySelectorAll(".gd-gaps li")].every((li) => li.dataset.clean));
}
// ---------- what the learner has practised, remembered on this device: a badge on each card they've worked through ----------
// { "<course>:<lesson>:<card>": { "<mode>": { clean, n, t } } }; clean: got it all right without a wrong try
const STORE = "gradify:diagrams:v1";
const loadAll = () => { try { return JSON.parse(localStorage.getItem(STORE) || "{}") || {}; } catch { return {}; } };
function done(fig, mode, clean) {
  const key = fig.dataset.gdKey; if (!key) return;
  try {
    const all = loadAll(), r = (all[key] ||= {}), was = r[mode];
    r[mode] = { clean: Boolean(clean || was?.clean), n: (was?.n || 0) + 1, t: Date.now() };
    localStorage.setItem(STORE, JSON.stringify(all));
  } catch { /* private window or storage off: the badge just won't stay */ }
  showBadge(fig, true);
}
const VERB = { quiz: "recalled", step: "stepped through", order: "put in order", match: "matched", pick: "answered", rate: "rated" };
function showBadge(fig, fresh = false) {
  const key = fig.dataset.gdKey, head = fig.querySelector(".gd-head, .gd-mhead"); if (!key || !head) return;
  const r = loadAll()[key]; fig.querySelector(".gd-done")?.remove(); if (!r) return;
  const modes = Object.keys(r), clean = modes.some((m) => r[m].clean);
  const what = modes.map((m) => VERB[m] || m).join(", ");
  const el = `<span class="gd-done${clean ? " gd-star" : ""}${fresh ? " gd-fresh" : ""}" title="${esc(`You've ${what}${clean ? ", with no wrong tries" : ""}`)}"><span aria-hidden="true">${clean ? "★" : "✓"}</span> ${clean ? "First time" : "Practised"}<span class="gd-sr">: you've ${esc(what)}</span></span>`;
  const num = head.querySelector(".gd-num, .gd-mbtn");
  num ? num.insertAdjacentHTML("beforebegin", el) : head.insertAdjacentHTML("beforeend", el);
}
const MODES = {
  quiz: {
    on(fig) { fig.classList.add("quiz"); fig.querySelectorAll(".gd-a").forEach((el) => { el.classList.remove("seen"); asButton(el, "Hidden answer: reveal"); }); score(fig); fig.querySelector(".gd-a")?.focus({ preventScroll: true }); },
    off(fig) { fig.classList.remove("quiz"); fig.querySelectorAll(".gd-a").forEach((el) => { el.classList.remove("seen"); unButton(el); }); },
  },
  step: {
    on(fig) {
      fig.classList.add("stepping");
      const cyc = fig.dataset.kind === "cycle", n = steps(fig).length;
      const ring = cyc ? `<svg class="gd-ring" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="24" class="gd-ringc"/>${Array.from({ length: n }, (_, i) => { const t = -Math.PI / 2 + (i / n) * 2 * Math.PI; return `<circle cx="${(32 + 24 * Math.cos(t)).toFixed(1)}" cy="${(32 + 24 * Math.sin(t)).toFixed(1)}" r="4.5" class="gd-ringd" data-i="${i}"/>`; }).join("")}<path d="M44 12.5a24 24 0 0 1 7 6.5" class="gd-ringa"/></svg>` : "";
      fig.querySelector(".gd-body").insertAdjacentHTML("afterend", `<div class="gd-play gd-stepbar">${ring}<button type="button" class="gd-btn gd-ghost" data-gd-prev aria-label="Previous step">←</button><p class="gd-say" aria-live="polite"></p><button type="button" class="gd-btn gd-main" data-gd-next>Next →</button></div>`);
      show(fig, 0); fig.querySelector("[data-gd-next]").focus({ preventScroll: true });
    },
    off(fig) { fig.classList.remove("stepping"); fig.querySelector(".gd-stepbar")?.remove(); steps(fig).forEach((s) => s.classList.remove("on", "done", "todo")); },
  },
  match: {
    on(fig) {
      fig.classList.add("matching"); fig.dataset.miss = "0";
      const rows = [...fig.querySelectorAll("[data-gd-row]")];
      rows.forEach((r, i) => { r.dataset.i = i; r.querySelector(".gd-a")?.classList.add("gd-slot"); asButton(r, `Put the meaning you picked with: ${cueOf(r)}`); });
      const chips = shuffle(rows.map((r, i) => [i, r.querySelector(".gd-a")?.textContent.trim() || ""]));
      fig.querySelector(".gd-body").insertAdjacentHTML("beforebegin", `<div class="gd-play gd-pool"><p class="gd-say">Pick a meaning, then the ${fig.dataset.kind === "compare" ? "side" : "term"} it belongs to.</p><div class="gd-chips">${chips.map(([i, t]) => `<button type="button" class="gd-chip" data-gd-chip="${i}" aria-pressed="false">${esc(t)}</button>`).join("")}</div></div>`);
      say(fig, `0 of ${rows.length} matched`);
      fig.querySelector(".gd-chip")?.focus({ preventScroll: true });
    },
    off(fig) { fig.classList.remove("matching"); fig.querySelector(".gd-pool")?.remove(); fig.querySelectorAll("[data-gd-row]").forEach((r) => { unButton(r); r.classList.remove("gd-ok", "gd-no"); r.querySelector(".gd-a")?.classList.remove("gd-slot"); }); },
  },
  order: {
    on(fig) {
      fig.classList.add("ordering"); fig.dataset.miss = "0"; fig.dataset.next = "0";
      const items = orderItems(fig), tl = fig.dataset.kind === "timeline";
      items.forEach((li) => li.querySelector(".gd-a")?.classList.add("gd-slot"));
      const chips = shuffle(items.map((li, i) => [i, li.querySelector(".gd-a")?.textContent.trim() || ""]));
      fig.querySelector(".gd-body").insertAdjacentHTML("beforebegin", `<div class="gd-play gd-pool"><p class="gd-say">${tl ? `What happened in ${items[0].querySelector(".gd-year")?.textContent}? Tap it.` : "Which step comes first? Tap it."}</p><div class="gd-chips">${chips.map(([i, t]) => `<button type="button" class="gd-chip" data-gd-ochip="${i}">${esc(t)}</button>`).join("")}</div></div>`);
      items[0]?.classList.add("gd-next");
      say(fig, `0 of ${items.length} in place`);
      fig.querySelector(".gd-chip")?.focus({ preventScroll: true });
    },
    off(fig) { fig.classList.remove("ordering"); fig.querySelector(".gd-pool")?.remove(); orderItems(fig).forEach((li) => { li.classList.remove("gd-ok", "gd-next", "gd-no"); li.querySelector(".gd-a")?.classList.remove("gd-slot"); }); },
  },
  pick: {
    on(fig) {
      fig.classList.add("picking");
      const wrong = fig.querySelector("[data-gd-wrong] p")?.textContent.trim(), right = fig.querySelector("[data-gd-right] .gd-a")?.textContent.trim();
      const opts = shuffle([["right", right], ["wrong", wrong]]);
      fig.querySelector(".gd-body").insertAdjacentHTML("beforebegin", `<div class="gd-play gd-pick"><p class="gd-say">Which of these is true?</p>${opts.map(([k, t], i) => `<button type="button" class="gd-opt" data-gd-opt="${k}"><b>${"AB"[i]}</b><span>${esc(t)}</span></button>`).join("")}</div>`);
      say(fig, ""); fig.querySelector(".gd-opt").focus({ preventScroll: true });
    },
    off(fig) { fig.classList.remove("picking", "picked"); fig.querySelector(".gd-pick")?.remove(); },
  },
  rate: {
    on(fig) {
      fig.classList.add("rating"); fig.dataset.right = "0";
      fig.querySelectorAll("li[data-status]").forEach((li) => li.insertAdjacentHTML("beforeend", `<div class="gd-rate" role="group" aria-label="How strong is the evidence for this?">${["established", "contested", "hypothetical"].map((s) => `<button type="button" data-gd-rate="${s}">${s[0].toUpperCase() + s.slice(1)}</button>`).join("")}</div>`));
      say(fig, "How strong is the evidence for each claim?");
      fig.querySelector("[data-gd-rate]")?.focus({ preventScroll: true });
    },
    off(fig) { fig.classList.remove("rating"); fig.querySelectorAll(".gd-rate").forEach((g) => g.remove()); fig.querySelectorAll("li[data-status]").forEach((li) => li.classList.remove("rated")); },
  },
};
// switching mode: the card cross-fades into its new state (where the browser can, and the learner hasn't asked for less motion)
function setMode(fig, mode) {
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || calm || !fig.isConnected) return switchMode(fig, mode);
  fig.style.viewTransitionName = "gd-active";
  document.documentElement.classList.add("gd-vt");
  const vt = document.startViewTransition(() => switchMode(fig, mode));
  vt.finished.finally(() => { fig.style.viewTransitionName = ""; document.documentElement.classList.remove("gd-vt"); });
}
function switchMode(fig, mode) {
  const cur = fig.dataset.mode;
  if (cur) { MODES[cur].off(fig); delete fig.dataset.mode; say(fig, ""); }
  fig.querySelectorAll("[data-gd-mode]").forEach((b) => { b.setAttribute("aria-pressed", "false"); b.textContent = MODE_LABEL[b.dataset.gdMode]; });
  if (!mode || mode === cur) return;
  fig.dataset.mode = mode; MODES[mode].on(fig);
  const b = fig.querySelector(`[data-gd-mode="${mode}"]`);
  if (b) { b.setAttribute("aria-pressed", "true"); b.textContent = mode === "quiz" ? "Show all" : "Done"; }
}
// Step through
const steps = (fig) => [...fig.querySelectorAll(".gd-flow > li, .gd-cyc .gd-branches > li")];
function show(fig, i) {
  const ss = steps(fig), n = ss.length, cyc = fig.dataset.kind === "cycle";
  i = cyc ? (i + n) % n : Math.max(0, Math.min(n - 1, i));
  fig.dataset.step = i;
  // what's come before stays; what's still to come is hidden, so you can say it before you see it
  ss.forEach((s, k) => { s.classList.toggle("on", k === i); s.classList.toggle("done", cyc ? false : k < i); s.classList.toggle("todo", cyc ? false : k > i); });
  fig.querySelectorAll(".gd-ringd").forEach((d) => d.classList.toggle("on", Number(d.dataset.i) === i));
  if (cyc) ringPick(fig, i);
  const k = ss[i].querySelector(".gd-k"), sub = ss[i].querySelector(".gd-sub");
  const txt = k && sub ? `${k.textContent.trim()}: ${sub.textContent.trim()}` : (ss[i].querySelector(".gd-item, div") || ss[i]).textContent.trim();
  // with the ring showing, its middle already says the stage: the bar just counts
  const ringOn = cyc && fig.querySelector(".gd-ringview") && getComputedStyle(fig.querySelector(".gd-ringview")).display !== "none";
  fig.querySelector(".gd-say").textContent = ringOn ? `Stage ${i + 1} of ${n}` : `${cyc ? "Stage" : "Step"} ${i + 1} of ${n}: ${txt}`;
  const next = fig.querySelector("[data-gd-next]"), prev = fig.querySelector("[data-gd-prev]");
  if (i === n - 1) done(fig, "step", false);
  next.textContent = cyc ? (i === n - 1 ? "Back to 1 ↻" : "Next →") : i === n - 1 ? "Start again" : `What's step ${i + 2}? →`;
  prev.disabled = !cyc && i === 0;
  ss[i].scrollIntoView?.({ block: "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}
// a wrong try: a short shake and a red edge, then back to normal
const flash = (el) => { el.classList.remove("gd-no"); void el.offsetWidth; el.classList.add("gd-no"); setTimeout(() => el.classList.remove("gd-no"), 700); };
// the ring: the stage picked lights up, and the middle explains it
function ringPick(fig, i) {
  const mid = fig.querySelector(".gd-rmid"), tpl = fig.querySelector(`template[data-gd-note="${i}"]`); if (!mid || !tpl) return;
  fig.querySelectorAll(".gd-rnode").forEach((b) => { const on = Number(b.dataset.gdRing) === i; b.setAttribute("aria-pressed", String(on)); b.classList.toggle("on", on); });
  fig.querySelectorAll(".gd-rarc").forEach((a, k) => a.classList.toggle("on", k === i));
  mid.innerHTML = tpl.innerHTML; mid.classList.remove("gd-in"); void mid.offsetWidth; mid.classList.add("gd-in");
}
// Put in order: each tap fills the next place, if it's the right one
const orderItems = (fig) => [...fig.querySelectorAll(".gd-flow > li, .gd-time > li")];
function orderTap(fig, chip) {
  const items = orderItems(fig), k = Number(fig.dataset.next), li = items[k], poolSay = fig.querySelector(".gd-pool .gd-say"), tl = fig.dataset.kind === "timeline";
  if (Number(chip.dataset.gdOchip) === k) {
    li.classList.remove("gd-next"); li.classList.add("gd-ok"); li.querySelector(".gd-a")?.classList.remove("gd-slot"); chip.remove();
    fig.dataset.next = String(k + 1);
    const nx = items[k + 1], miss = Number(fig.dataset.miss);
    if (nx) { nx.classList.add("gd-next"); poolSay.textContent = tl ? `Yes. And in ${nx.querySelector(".gd-year")?.textContent}?` : `Yes. What comes next: step ${k + 2}?`; }
    else { done(fig, "order", !miss); poolSay.textContent = miss ? `All in order, with ${miss} wrong tr${miss > 1 ? "ies" : "y"}. Go through it once more later.` : "All in order, first time. You know this one."; }
    say(fig, `${k + 1} of ${items.length} in place`);
    fig.querySelector(".gd-chip")?.focus({ preventScroll: true });
  } else {
    fig.dataset.miss = String(Number(fig.dataset.miss) + 1);
    flash(chip);
    poolSay.textContent = tl ? `Not that one: that comes ${Number(chip.dataset.gdOchip) > k ? "later" : "earlier"}. What happened in ${li.querySelector(".gd-year")?.textContent}?` : `Not yet: that one comes later. Which is step ${k + 1}?`;
  }
}
// Match up
function chooseChip(fig, chip) {
  fig.querySelectorAll(".gd-chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip && c.getAttribute("aria-pressed") !== "true")));
  fig.querySelector(".gd-pool .gd-say").textContent = chip.getAttribute("aria-pressed") === "true" ? `Now pick the ${fig.dataset.kind === "compare" ? "side" : "term"} it belongs to.` : "Pick a meaning.";
}
function placeChip(fig, row) {
  const chip = fig.querySelector('.gd-chip[aria-pressed="true"]'), poolSay = fig.querySelector(".gd-pool .gd-say");
  if (!chip) { poolSay.textContent = "Pick a meaning first, then its term."; return; }
  const rows = fig.querySelectorAll("[data-gd-row]");
  if (chip.dataset.gdChip === row.dataset.i) {
    row.classList.add("gd-ok"); row.querySelector(".gd-a")?.classList.remove("gd-slot"); unButton(row); chip.remove();
    const placed = fig.querySelectorAll("[data-gd-row].gd-ok").length, miss = Number(fig.dataset.miss);
    if (placed === rows.length) done(fig, "match", !miss);
    poolSay.textContent = placed === rows.length ? (miss ? `All matched, with ${miss} wrong try${miss > 1 ? "s" : ""}. Try again later to get them first time.` : "All matched, first time. Well done.") : `Yes: that's ${cueOf(row)}. Pick the next meaning.`;
    say(fig, `${placed} of ${rows.length} matched`);
    fig.querySelector(".gd-chip")?.focus({ preventScroll: true });
  } else {
    fig.dataset.miss = String(Number(fig.dataset.miss) + 1);
    flash(row);
    poolSay.textContent = `That one doesn't go with ${cueOf(row)}. Read it again and try another.`;
  }
}
function reveal(el) {
  const fig = el.closest(".gd");
  el.classList.add("seen"); unButton(el); el.tabIndex = -1;
  score(fig);
  const next = fig.querySelector(".gd-a:not(.seen)");
  if (next && document.activeElement === el) next.focus();
}
function zoom(fig) {
  const dlg = document.createElement("dialog");
  dlg.className = "gd-zoom";
  dlg.setAttribute("aria-label", fig.querySelector(".gd-head")?.textContent.trim() || "Diagram");
  if (fig.dataset.mode) setMode(fig, null);
  const copy = fig.cloneNode(true);
  copy.removeAttribute("id"); copy.classList.replace("gd-md", "gd-lg");
  copy.querySelector("[data-gd-zoom]")?.remove();
  copy.querySelectorAll("[data-jump]").forEach((b) => b.setAttribute("data-gd-close", ""));
  dlg.append(copy);
  dlg.insertAdjacentHTML("beforeend", `<button type="button" class="gd-zoomx" data-gd-close aria-label="Close">×</button>`);
  dlg.addEventListener("close", () => { dlg.remove(); fig.querySelector("[data-gd-zoom]")?.focus(); });
  document.body.append(dlg);
  dlg.showModal();
}
if (typeof document !== "undefined" && !globalThis.__gdWired) {
  globalThis.__gdWired = true;
  // cards the learner has practised before get their badge as soon as they're on the page
  const deco = (n) => { if (n.nodeType !== 1) return; if (n.matches(".gd[data-gd-key]")) showBadge(n); else n.querySelectorAll?.(".gd[data-gd-key]").forEach((f) => showBadge(f)); };
  const watch = () => { deco(document.body); new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach(deco))).observe(document.body, { childList: true, subtree: true }); };
  document.body ? watch() : addEventListener("DOMContentLoaded", watch, { once: true });
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element) || !t.closest(".gd, dialog.gd-zoom")) return;
    const fig = t.closest(".gd");
    const m = t.closest("[data-gd-mode]"); if (m) { setMode(fig, m.dataset.gdMode); return; }
    const a = t.closest(".gd.quiz .gd-a:not(.seen)"); if (a) { e.preventDefault(); reveal(a); return; }
    if (t.closest("[data-gd-next]")) { const i = Number(fig.dataset.step) + 1, n = steps(fig).length; show(fig, fig.dataset.kind !== "cycle" && i >= n ? 0 : i); return; }
    if (t.closest("[data-gd-prev]")) { show(fig, Number(fig.dataset.step) - 1); return; }
    const rn = t.closest("[data-gd-ring]"); if (rn) { if (fig.dataset.mode === "step") show(fig, Number(rn.dataset.gdRing)); else ringPick(fig, Number(rn.dataset.gdRing)); return; }
    const oc = t.closest("[data-gd-ochip]"); if (oc) { orderTap(fig, oc); return; }
    const fill = t.closest("[data-gd-fill]");
    if (fill) {
      const li = fill.closest("li"), gapEl = li.querySelector(".gd-a");
      if (fill.dataset.gdFill === "1") { if (!li.querySelector("[data-gd-fill].gd-no, [data-gd-fill]:disabled")) li.dataset.clean = "1"; fill.classList.add("gd-ok"); li.querySelectorAll("[data-gd-fill]").forEach((b) => (b.disabled = true)); if (!gapEl.classList.contains("seen")) reveal(gapEl); }
      else { flash(fill); fill.disabled = true; }
      return;
    }
    const chip = t.closest(".gd-chip"); if (chip) { chooseChip(fig, chip); return; }
    const row = t.closest(".matching [data-gd-row]:not(.gd-ok)"); if (row) { placeChip(fig, row); return; }
    const opt = t.closest("[data-gd-opt]");
    if (opt && !fig.classList.contains("picked")) {
      const ok = opt.dataset.gdOpt === "right";
      fig.classList.add("picked");
      fig.querySelectorAll("[data-gd-opt]").forEach((o) => { o.disabled = true; o.classList.add(o.dataset.gdOpt === "right" ? "gd-ok" : "gd-no"); });
      fig.querySelectorAll("[data-gd-opt]").forEach((o) => o.insertAdjacentHTML("beforeend", `<em>${o.dataset.gdOpt === "right" ? "✓ True" : "✗ The common mistake"}</em>`));
      fig.querySelector(".gd-pick .gd-say").textContent = ok ? "Yes, that's true. The other one is the mistake it's easy to make." : "No: that's the common mistake. The other one is what's true, and why.";
      say(fig, ok ? "Right first time." : "Worth another look later.");
      done(fig, "pick", ok);
      return;
    }
    const r = t.closest("[data-gd-rate]");
    if (r) {
      const li = r.closest("li[data-status]"); if (li.classList.contains("rated")) return;
      const ok = r.dataset.gdRate === li.dataset.status;
      li.classList.add("rated");
      li.querySelectorAll("[data-gd-rate]").forEach((b) => { b.disabled = true; if (b.dataset.gdRate === li.dataset.status) b.classList.add("gd-ok"); else if (b === r) b.classList.add("gd-no"); });
      if (ok) fig.dataset.right = String(Number(fig.dataset.right) + 1);
      const all = fig.querySelectorAll("li[data-status]").length, rated = fig.querySelectorAll("li.rated").length;
      say(fig, rated < all ? `${ok ? "Right." : `It's ${li.dataset.status}.`} ${rated} of ${all} rated` : `${fig.dataset.right} of ${all} right.`);
      if (rated === all) done(fig, "rate", Number(fig.dataset.right) === all);
      li.parentElement.querySelector("li[data-status]:not(.rated) [data-gd-rate]")?.focus({ preventScroll: true });
      return;
    }
    const z = t.closest("[data-gd-zoom]"); if (z) { zoom(fig); return; }
    const dlg = t.closest("dialog.gd-zoom");
    if (dlg && (t === dlg || t.closest("[data-gd-close]"))) dlg.close();
  });
  document.addEventListener("keydown", (e) => {
    const t = e.target instanceof Element ? e.target : null, fig = t?.closest(".gd");
    if (!fig) return;
    // a part that acts as a button (a covered answer, a term to match): Enter or Space
    if ((e.key === "Enter" || e.key === " ") && t.getAttribute("role") === "button") { e.preventDefault(); t.click(); return; }
    // stepping: ← and → move through the steps (and don't change the lesson)
    if (fig.dataset.mode === "step" && (e.key === "ArrowRight" || e.key === "ArrowLeft")) { e.preventDefault(); e.stopPropagation(); fig.querySelector(e.key === "ArrowRight" ? "[data-gd-next]" : "[data-gd-prev]").click(); }
  }, true);
}
