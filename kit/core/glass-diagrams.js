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
export function diagramsFor(L, { max = 5 } = {}) {
  const out = [], blocks = L?.blocks || [];
  const contentAt = blocks.map((b, i) => (b.t === "h" ? -1 : i)).filter((i) => i >= 0);
  if (!contentAt.length) return [];
  const firstAt = contentAt[0], lastAt = contentAt.at(-1);
  const heads = blocks.map((b, i) => (b.t === "h" ? { x: b.x, i } : null)).filter(Boolean);
  // the lesson's sections round its title, beside the opening part of the notes
  if (heads.length >= 2 && L.title) out.push({ kind: "map", at: firstAt, title: plain(L.title), items: heads.slice(0, 6).map((h) => cut(h.x, 44)), weight: 3.2 });
  // what you need first, this lesson, what you'll be able to do
  if (L.objectives?.length >= 2) out.push({ kind: "path", at: firstAt, title: plain(L.title || "This lesson"), before: (L.prereq || []).slice(0, 2).map((x) => label(x, 34)), items: L.objectives.slice(0, 3).map((x) => cut(x, 64)), weight: 2.1 });

  let heading = null, headingAt = -1;
  blocks.forEach((b, i) => {
    if (b.t === "h") { heading = b.x; headingAt = i; return; }
    if (b.t === "ex" && b.steps.length >= 2) out.push({ kind: "flow", at: i, title: cut(b.x, 90), items: b.steps.slice(0, 6).map((s) => cut(s, b.steps.length <= 3 ? 120 : 80)), weight: 5 });
    else if (b.t === "eq" && b.rows.length && !b.rows.some(([f]) => MATHS.test(plain(f)))) out.push({ kind: "facts", at: i, title: plain(heading || "Key facts"), items: b.rows.slice(0, 4).map(([f, m]) => ({ term: cut(f, 60), def: m ? cut(m, 80) : "" })), weight: 3.4 });
    else if (b.t === "eq" && b.rows.length) out.push({ kind: "formula", at: i, title: plain(heading || "Formulas"), rows: b.rows.slice(0, 3).map(([f, m]) => ({ f: plain(f), m: m ? cut(m, 60) : "" })), formula: plain(b.rows[0][0]), more: Math.max(0, b.rows.length - 3), weight: 4.5 });
    else if (b.t === "pit") {
      const ss = sentences(b.x);
      if (ss.length >= 2) out.push({ kind: "mistake", at: i, title: cut(ss[0], 90), wrong: cut(ss[0], 110), right: cut(ss.slice(1).join(" "), 150), weight: 3.6 });
      else if (ss.length === 1) out.push({ kind: "mistake", at: i, title: cut(ss[0], 90), wrong: cut(ss[0], 160), right: "", weight: 1.1 });
    }
    else if (b.t === "key") out.push({ kind: "key", at: i, title: plain(heading || L.title || "Key idea"), text: cut(b.x, 200), weight: 1.3 });
    else if (b.t === "ul" && b.items.length >= 3 && heading) {
      const items = b.items.slice(0, 6), dated = items.filter((x) => YEAR.test(x));
      if (dated.length >= 3) out.push({ kind: "timeline", at: i, title: plain(heading), items: dated.slice(0, 5).map((x) => ({ year: x.match(YEAR)[1], text: label(x.replace(/^\s*(in\s+)?\b(1[0-9]{3}|20[0-9]{2})\b[,:]?\s*/i, ""), 36) })).sort((a, b) => a.year - b.year), weight: 4.2 });
      else {
        const bold = items.every((x) => /^\s*\*\*/.test(x));
        out.push({ kind: /cycle|loop|circulat|feedback/i.test(heading) ? "cycle" : "hub", at: i, title: plain(heading), items: items.map((x) => label(x, bold ? 44 : 34)), notes: bold ? items.map((x) => { const r = rest(x); return /^[A-Za-z(]/.test(r) && r.length >= 12 ? cut(r, 62) : ""; }) : null, weight: (bold ? 4 : 3) - (headingAt === i - 1 ? 0 : 1) });
      }
    }
    // a section that is all prose: its own sentences as its main points
    else if (b.t === "p" && heading) {
      const ss = sentences(b.x);
      if (ss.length >= 2) out.push({ kind: "points", at: i, title: plain(heading), items: ss.slice(0, 4).map((s) => cut(s, 70)), weight: (ss.length >= 3 ? 1.5 : 1) - (headingAt === i - 1 ? 0 : 0.6) });
    }
    else if (b.t === "ul" && b.items.length === 2 && heading) out.push({ kind: "points", at: i, title: plain(heading), items: b.items.map((x) => cut(x, 70)), weight: 0.7 });
  });

  // the cards at the end of the notes: cases, drugs; then terms, the summary, the evidence, quick recall
  for (const a of L?.authorities || []) {
    if (a.kind === "case") out.push({ kind: "case", at: lastAt, title: plain(a.name), items: [cut(a.facts, 110), cut(a.held, 110), cut(a.principle, 110)], weight: 3.4 });
    else if (a.kind === "drug") out.push({ kind: "drug", at: lastAt, title: plain(a.name), items: [cut(a.mechanism, 80), cut(a.uses, 80), cut(a.adverse, 80), cut(a.monitoring, 80)], weight: 3.4 });
  }
  const terms = L?.terms || [];
  for (let a = 0; a < terms.length && !out.some((d) => d.kind === "compare"); a++) for (let b = a + 1; b < terms.length; b++) {
    const wa = plain(terms[a][0]).toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3), wb = plain(terms[b][0]).toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3);
    if (wa.some((w) => wb.includes(w)) && plain(terms[a][0]).toLowerCase() !== plain(terms[b][0]).toLowerCase()) {
      out.push({ kind: "compare", at: lastAt, title: `${plain(terms[a][0])} and ${plain(terms[b][0])}`, items: [label(terms[a][0], 30), label(terms[b][0], 30)], notes: [cut(terms[a][1], 100), cut(terms[b][1], 100)], weight: 3.5 });
      break;
    }
  }
  if (terms.length >= 2) out.push({ kind: "terms", at: lastAt, title: "Key terms", items: terms.slice(0, 4).map(([t, d]) => ({ term: label(t, 24), def: cut(d, 70) })), weight: 2.4 });
  if (L?.summary?.length >= 2) out.push({ kind: "summary", at: lastAt, title: "Summary", items: L.summary.slice(0, 5).map((x) => cut(x, 70)), weight: 2.3 });
  if (L?.evidence?.length >= 2) out.push({ kind: "evidence", at: lastAt, title: "How strong is the evidence?", items: L.evidence.slice(0, 4).map((e) => ({ status: e.status, text: cut(e.claim, 70) })), weight: 2.2 });
  if (L?.cards?.length >= 2) out.push({ kind: "recall", at: lastAt, title: "Test yourself", items: L.cards.slice(0, 3).map(([q, a]) => ({ q: cut(q, 70), a: cut(a, 60) })), weight: 1.2 });

  // the most telling five: no more than two of a kind until every kind has had its turn, then kept in the lesson's order
  const ranked = out.map((d, k) => ({ ...d, k })).sort((a, b) => b.weight - a.weight || a.k - b.k);
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

/**
 * A glass diagram tile, as HTML: the glass icon's look (a coloured tile behind a clear pane, a rainbow edge, a soft
 * glow, a slow float) at diagram size, with a caption. `size`: "md" (in a lesson or panel) or "sm" (a card).
 */
export function glassDiagram(d, { size = "md", seed = d?.title, caption = true } = {}) {
  if (!d) return "";
  const h = hash(seed || d.kind), [a, b] = PAIRS[h % PAIRS.length], delay = -((h % 4000) / 1000).toFixed(2), turn = ((h >> 4) % 2 ? 1 : -1) * (2 + ((h >> 6) % 3));
  return `<figure class="gd gd-${size}" data-kind="${d.kind}" style="--a:${a};--b:${b};--dl:${delay}s;--tw:${turn}deg">
    <div class="gd-art"><span class="gd-glow" aria-hidden="true"></span><span class="gd-back" aria-hidden="true"></span><span class="gd-pane">${diagramSvg(d)}</span></div>
    ${caption ? `<figcaption><span class="gd-kind">${KIND[d.kind]}</span>${esc(d.title)}</figcaption>` : ""}
  </figure>`;
}
