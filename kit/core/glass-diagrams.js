// Glass diagrams: the 3D glass icons' bigger siblings (kit/core/glass-icons.js), with a real diagram on the glass
// instead of a symbol. Each one is drawn from a lesson's own notes, so it shows that lesson's process, formula,
// structure, comparison or timeline, never a stock picture:
//
//   flow       a worked example's steps, in order                (X: with > steps)
//   formula    a formula and what it is                          (E:)
//   hub        a section's main points around its heading        (H: then 3 to 6 bullets)
//   cycle      the same, round a circle, for a section about a cycle
//   timeline   dated points along a line                         (3 or more bullets with years)
//   compare    two easily confused terms side by side            (T: pairs that share a word)
//
// Used beside those parts of a lesson (kit/course/notes.js lessonHtml), in a mind map's detail panel
// (kit/maps/view.js) and on the back of flashcards. Styles: "Glass diagrams" in kit/styles/components.css.

const PAIRS = [["#4641ff", "#8b3dff"], ["#f055dd", "#ff6aa8"], ["#ff5600", "#ffc002"], ["#1fae8c", "#3c78d8"], ["#8b3dff", "#f055dd"], ["#3c78d8", "#40d4b1"], ["#ff5a4d", "#f055dd"], ["#ffc002", "#ff8a00"]];
const hash = (s) => { let h = 2166136261; for (const ch of String(s)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return h >>> 0; };
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const plain = (s) => String(s ?? "").replace(/\*\*|__|`/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ").trim();

/** A short label from a line of notes: its bold lead if it has one, else its first clause, cut to `n` characters. */
export function label(text, n = 26) {
  const raw = String(text ?? "");
  const bold = raw.match(/^\s*\*\*([^*]{2,60})\*\*/);
  let s = plain(bold ? bold[1] : raw);
  if (!bold) s = s.split(/(?<=\w)[:;—–]\s|,\s(?=which|so|and|because|but)|\.\s/)[0];
  s = s.replace(/[.:,;]+$/, "");
  if (s.length <= n) return s;
  const cut = s.slice(0, n + 1).replace(/\s+\S*$/, "");
  return `${cut.length > n * 0.5 ? cut : s.slice(0, n)}…`;
}
// a label as one or two lines of about `w` characters
function lines(text, w = 14) {
  const words = String(text).split(" "), out = [""];
  for (const word of words) {
    if (out.at(-1) && (out.at(-1) + " " + word).length > w && out.length < 2) out.push(word);
    else out[out.length - 1] = out.at(-1) ? `${out.at(-1)} ${word}` : word;
  }
  if (out[1] && out[1].length > w + 3) out[1] = `${out[1].slice(0, w + 1).replace(/\s+\S*$/, "")}…`;
  return out;
}
const text = (x, y, s, { size = 11, w = 14, anchor = "middle", weight = 600 } = {}) => {
  const ls = lines(s, w), dy = size * 1.15, y0 = y - ((ls.length - 1) * dy) / 2;
  return `<text x="${x.toFixed(1)}" y="${y0.toFixed(1)}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" dominant-baseline="middle">${ls.map((l, i) => `<tspan x="${x.toFixed(1)}" dy="${i ? dy : 0}">${esc(l)}</tspan>`).join("")}</text>`;
};
const arrowDefs = (id) => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1 9 5 1 9" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>`;
const YEAR = /\b(1[0-9]{3}|20[0-9]{2})\b/;

/** The diagrams worth drawing for a lesson, each with `at`, the index of the block it belongs beside. */
export function diagramsFor(L, { max = 4 } = {}) {
  const out = [], blocks = L?.blocks || [];
  let heading = null, headingAt = -1;
  blocks.forEach((b, i) => {
    if (b.t === "h") { heading = b.x; headingAt = i; return; }
    if (b.t === "ex" && b.steps.length >= 2) out.push({ kind: "flow", at: i, title: label(b.x, 60), items: b.steps.slice(0, 6).map((s) => label(s, 30)), weight: 3 });
    else if (b.t === "eq" && b.rows.length) out.push({ kind: "formula", at: i, title: plain(b.rows[0][1] || heading || "Formula"), formula: plain(b.rows[0][0]), more: b.rows.length - 1, weight: 2 });
    else if (b.t === "ul" && b.items.length >= 3 && heading && headingAt === i - 1) {
      const items = b.items.slice(0, 6), dated = items.filter((x) => YEAR.test(x));
      if (dated.length >= 3) out.push({ kind: "timeline", at: i, title: plain(heading), items: dated.slice(0, 5).map((x) => ({ year: x.match(YEAR)[1], text: label(x.replace(/^\s*(in\s+)?\b(1[0-9]{3}|20[0-9]{2})\b[,:]?\s*/i, ""), 22) })).sort((a, b) => a.year - b.year), weight: 2 });
      else if (items.length <= 6) out.push({ kind: /cycle|loop|circulat|feedback/i.test(heading) ? "cycle" : "hub", at: i, title: plain(heading), items: items.map((x) => label(x, 28)), weight: items.every((x) => /^\s*\*\*/.test(x)) ? 2 : 1 });
    }
  });
  // two key terms that share a word ("Competitive inhibitor", "Non-competitive inhibitor"): side by side
  const terms = L?.terms || [];
  for (let a = 0; a < terms.length && !out.some((d) => d.kind === "compare"); a++) for (let b = a + 1; b < terms.length; b++) {
    const wa = plain(terms[a][0]).toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3), wb = plain(terms[b][0]).toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3);
    if (wa.some((w) => wb.includes(w)) && plain(terms[a][0]).toLowerCase() !== plain(terms[b][0]).toLowerCase()) {
      out.push({ kind: "compare", at: blocks.length - 1, title: `${plain(terms[a][0])} and ${plain(terms[b][0])}`, items: [label(terms[a][0], 24), label(terms[b][0], 24)], notes: [label(terms[a][1], 30), label(terms[b][1], 30)], weight: 2 });
      break;
    }
  }
  // the most telling few, kept in the lesson's order
  return out.map((d, k) => ({ ...d, k })).sort((a, b) => b.weight - a.weight || a.k - b.k).slice(0, max).sort((a, b) => a.at - b.at || a.k - b.k)
    .map(({ k, weight, ...d }, n) => ({ ...d, id: `${d.kind}-${d.at}-${n}` }));
}

/** A diagram for a mind map node: a node with ordered steps, a formula, or a branch with a few children. */
export function diagramForNode(n) {
  if (!n) return null;
  const kids = (n.children || []).filter((c) => !["limit", "gap"].includes(c.kind));
  if (n.kind === "equation") return { kind: "formula", title: plain(n.detail && n.detail !== n.topic ? n.detail : "Formula"), formula: plain(n.topic), more: 0 };
  if (kids.length >= 2 && kids.every((c) => /^\d+\.\s/.test(c.topic))) return { kind: "flow", title: plain(n.topic), items: kids.slice(0, 6).map((c) => label(c.topic.replace(/^\d+\.\s*/, ""), 30)) };
  if (/ vs /.test(n.topic)) { const [a, b] = n.topic.split(/ vs /); return { kind: "compare", title: plain(n.topic), items: [label(a, 24), label(b, 24)], notes: ["", ""] }; }
  if (kids.length >= 3 && kids.length <= 9) return { kind: /cycle|loop|circulat|feedback/i.test(n.topic) ? "cycle" : "hub", title: plain(n.topic), items: kids.slice(0, 6).map((c) => label(c.topic, 28)) };
  return null;
}

/** The diagram on a lesson's flashcard: the one whose words the card shares most, if it shares enough. */
export function diagramForCard(diagrams, front, back = "") {
  const ws = new Set(`${plain(front)} ${plain(back)}`.toLowerCase().match(/[a-z]{4,}/g) || []);
  let best = null, score = 0;
  for (const d of diagrams || []) {
    const dw = `${d.title} ${(d.items || []).map((x) => x.text || x).join(" ")} ${d.formula || ""}`.toLowerCase().match(/[a-z]{4,}/g) || [];
    const s = new Set(dw.filter((w) => ws.has(w))).size;
    if (s > score) { score = s; best = d; }
  }
  return score >= 2 ? best : null;
}

// ---------- drawing (a 320 × 200 viewBox; white on the glass) ----------
const W = 320, H = 200;
function flow(d, id) {
  const n = d.items.length, cols = n <= 3 ? n : Math.ceil(n / 2), rows = n <= 3 ? 1 : 2;
  const bw = Math.min(92, (W - 24 - (cols - 1) * 18) / cols), bh = rows === 1 ? 58 : 46;
  const gx = (W - cols * bw - (cols - 1) * 18) / 2, ys = rows === 1 ? [H / 2] : [62, 142];
  const pos = d.items.map((_, i) => { const r = Math.floor(i / cols), c = r % 2 ? cols - 1 - (i % cols) : i % cols; return { x: gx + c * (bw + 18), y: ys[r] - bh / 2, r }; });
  let s = arrowDefs(id);
  pos.forEach((p, i) => {
    const q = pos[i + 1]; if (!q) return;
    if (q.r === p.r) { const dir = q.x > p.x ? 1 : -1; s += `<line x1="${(dir > 0 ? p.x + bw + 2 : p.x - 2).toFixed(1)}" y1="${(p.y + bh / 2).toFixed(1)}" x2="${(dir > 0 ? q.x - 3 : q.x + bw + 3).toFixed(1)}" y2="${(q.y + bh / 2).toFixed(1)}" marker-end="url(#${id})"/>`; }
    else s += `<path d="M${(p.x + bw / 2).toFixed(1)} ${(p.y + bh + 2).toFixed(1)} V${(q.y - 4).toFixed(1)}" marker-end="url(#${id})"/>`;
  });
  pos.forEach((p, i) => {
    s += `<rect x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh}" rx="12" class="gd-box"/>`;
    s += `<circle cx="${(p.x + 12).toFixed(1)}" cy="${(p.y + 12).toFixed(1)}" r="8" class="gd-dot"/><text x="${(p.x + 12).toFixed(1)}" y="${(p.y + 12.5).toFixed(1)}" font-size="9" font-weight="800" text-anchor="middle" dominant-baseline="middle" class="gd-num">${i + 1}</text>`;
    s += text(p.x + bw / 2 + 4, p.y + bh / 2 + 5, d.items[i], { size: 10, w: Math.max(9, Math.floor(bw / 6)) });
  });
  return s;
}
function hub(d, cycle, id) {
  const n = d.items.length, cx = W / 2, cy = H / 2, rx = cycle ? 104 : 106, ry = cycle ? 66 : 68;
  let s = cycle ? arrowDefs(id) : "";
  const pts = d.items.map((_, i) => { const a = -Math.PI / 2 + (i / n) * Math.PI * 2; return { x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry, a }; });
  if (cycle) pts.forEach((p, i) => { const a1 = p.a + 0.32, a2 = pts[(i + 1) % n].a - 0.32 + (i === n - 1 ? Math.PI * 2 : 0); s += `<path d="M${(cx + Math.cos(a1) * rx).toFixed(1)} ${(cy + Math.sin(a1) * ry).toFixed(1)} A${rx} ${ry} 0 0 1 ${(cx + Math.cos(a2) * rx).toFixed(1)} ${(cy + Math.sin(a2) * ry).toFixed(1)}" marker-end="url(#${id})"/>`; });
  // spokes from the core's edge to each box's edge, not through the text
  else pts.forEach((p) => { const dx = p.x - cx, dy = p.y - cy, len = Math.hypot(dx, dy) || 1, a = Math.min(54 / Math.hypot(dx / 1, dy * 2.1) * len, len * 0.45);
    s += `<line x1="${(cx + (dx / len) * a).toFixed(1)}" y1="${(cy + (dy / len) * a).toFixed(1)}" x2="${(p.x - (dx / len) * Math.min(len * 0.3, Math.abs(dx) > Math.abs(dy) * 2.5 ? 50 : 18)).toFixed(1)}" y2="${(p.y - (dy / len) * Math.min(len * 0.3, Math.abs(dx) > Math.abs(dy) * 2.5 ? 50 : 18)).toFixed(1)}" class="gd-spoke"/>`; });
  if (!cycle) s += `<ellipse cx="${cx}" cy="${cy}" rx="50" ry="24" class="gd-core"/>${text(cx, cy, label(d.title, 24), { size: 10.5, w: 13, weight: 800 })}`;
  pts.forEach((p, i) => { s += `<rect x="${(p.x - 50).toFixed(1)}" y="${(p.y - 17).toFixed(1)}" width="100" height="34" rx="17" class="gd-box"/>${text(p.x, p.y, d.items[i], { size: 10, w: 15 })}`; });
  if (cycle) s += text(cx, cy, label(d.title, 24), { size: 11, w: 13, weight: 800 });
  return s;
}
function timeline(d) {
  const n = d.items.length, x0 = 26, x1 = W - 26, y = 100;
  let s = `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" class="gd-axis"/>`;
  d.items.forEach((it, i) => {
    const x = n === 1 ? W / 2 : x0 + 16 + (i / (n - 1)) * (x1 - x0 - 32), up = i % 2 === 0;
    s += `<circle cx="${x.toFixed(1)}" cy="${y}" r="6" class="gd-dot"/><text x="${x.toFixed(1)}" y="${up ? y - 20 : y + 22}" font-size="13" font-weight="800" text-anchor="middle" dominant-baseline="middle">${esc(it.year)}</text>`;
    s += text(x, up ? y - 52 : y + 54, it.text, { size: 9, w: 14 });
  });
  return s;
}
function formula(d) {
  const f = d.formula.length > 44 ? `${d.formula.slice(0, 43)}…` : d.formula, size = Math.max(9, Math.min(26, 276 / (Math.max(f.length, 6) * 0.62)));
  return `<rect x="18" y="52" width="${W - 36}" height="70" rx="18" class="gd-box"/>
    <text x="${W / 2}" y="88" font-size="${size.toFixed(1)}" font-weight="700" text-anchor="middle" dominant-baseline="middle" class="gd-mono">${esc(f)}</text>
    ${text(W / 2, 152, label(d.title, 40), { size: 11, w: 34, weight: 600 })}${d.more ? `<text x="${W / 2}" y="182" font-size="9" text-anchor="middle" class="gd-soft">+ ${d.more} more</text>` : ""}`;
}
function compare(d) {
  return `<circle cx="122" cy="96" r="68" class="gd-venn"/><circle cx="198" cy="96" r="68" class="gd-venn"/>
    ${text(100, 88, d.items[0], { size: 10, w: 10, weight: 800 })}${text(220, 88, d.items[1], { size: 10, w: 10, weight: 800 })}
    ${d.notes?.[0] ? text(96, 122, d.notes[0], { size: 8.5, w: 13, weight: 500 }) : ""}${d.notes?.[1] ? text(224, 122, d.notes[1], { size: 8.5, w: 13, weight: 500 }) : ""}
    <text x="160" y="182" font-size="9.5" font-weight="700" text-anchor="middle" class="gd-soft">Easily confused</text>`;
}
const KIND = { flow: "Process", formula: "Formula", hub: "Structure", cycle: "Cycle", timeline: "Timeline", compare: "Compare" };

/** The diagram alone, as an SVG string (white lines and text, for the glass). */
export function diagramSvg(d, id = `gd${hash(JSON.stringify(d)) % 1e6}`) {
  const body = d.kind === "flow" ? flow(d, id) : d.kind === "formula" ? formula(d) : d.kind === "timeline" ? timeline(d) : d.kind === "compare" ? compare(d) : hub(d, d.kind === "cycle", id);
  return `<svg viewBox="0 0 ${W} ${H}" class="gd-svg" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" font-family="inherit" role="img" aria-label="${esc(`${KIND[d.kind]} diagram: ${d.title}`)}">${body}</svg>`;
}

/**
 * A glass diagram tile, as HTML: the glass icon's look (a coloured tile behind frosted glass, a rainbow edge, a soft
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
