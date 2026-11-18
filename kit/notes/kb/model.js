// Gradify Notes: the knowledge base behind app.html#/notes. Pure (no page, no storage), so Node tests it
// (tests/kb.test.mjs). The view is kit/notes/kb/view.js; saving and syncing is kit/notes/kb/store.js.
//
// Everything is a "rem" (a remembered thing), as in an outliner: a bullet with text, children and settings. A rem
// can be a document (it opens as a page), a folder (it holds documents) or an ordinary bullet. Documents nest
// without limit, and any bullet can become a document.
//
//   kb = { v, rems: { id: Rem }, roots: [id], gone: { id: ms }, tagDefs: { key: TagDef }, exams: { id: Exam },
//          visits: { id: n }, recent: [id], pinned: [id], cardMap: { kbCardId: storeCardId }, docMap: { remId: storeDocId },
//          settings: {}, u }
//   Rem = { id, parent, kids: [id], text, c, u,
//           doc?, folder?, collapsed?, heading?: 1–3, todo?: "open" | "done", list?: "number",
//           props?: { key: value }, portal?: remId, cards?: "off", dir?: "both" | "fwd" | "back",
//           image?: { id, w, h, occl: [{ x, y, w, h, label, g }], mode: "one" | "all" }, drawing?: { w, h, strokes, bg? },
//           table?: { rows: [[cell]] }, embed?: url, code?: language, math?: true, daily?: "YYYY-MM-DD",
//           template?: true, src?: { kind: "pdf", file, page, rects?, colour? }, pdf?: { file, name, pages },
//           guided?: { familiarity, sections: [remId] }, colour? }
//
// Text is stored with references by id, so renaming a document never breaks a link: [[r3k9…]] is a reference,
// #tag or #[[two words]] a tag. While a bullet is being edited it shows [[Name]] (toEdit) and is turned back into
// ids when it's saved (fromEdit). Flashcards are written in the bullet's own text (cardsOf):
//
//   Front >> Back           a card front to back          Back << Front     back to front
//   Front <> Back           both ways                     Term :: Definition a concept (both ways; `dir` changes it)
//   Attribute ;; Value      a descriptor: asked with its parent as context ("Mitochondria › Function")
//   Question >>>            a multi-line card: the children are the answer
//   Question >>1.           a list answer: the children in order (multi-step processes)
//   Question >>A)           multiple choice: the first child is right, the others are the wrong options
//   The {{mitochondria}} make {{ATP}}   a cloze: one card per gap ({{c1::…}} groups gaps into one card)
//   an image with occlusions, one card per group; a tag with "make cards" on, one card per property of each tagged rem
//
// Every card's id comes from its rem and its place in it, so editing a bullet's wording keeps its schedule.

const DAY = 864e5;
export const uid = (p = "r") => `${p}${Date.now().toString(36).slice(-5)}${Math.random().toString(36).slice(2, 9)}`;
const now = () => Date.now();
const tidy = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// ---------- the knowledge base ----------
export function emptyKb() {
  return { v: 1, rems: {}, roots: [], gone: {}, tagDefs: {}, exams: {}, visits: {}, recent: [], pinned: [], cardMap: {}, docMap: {}, settings: {}, u: now() };
}
/** Fills in anything an older or partial copy is missing, so every function can rely on the shape. */
export function normalise(kb) {
  const k = { ...emptyKb(), ...(kb || {}) };
  for (const f of ["rems", "gone", "tagDefs", "exams", "visits", "cardMap", "docMap", "settings"]) k[f] = { ...(k[f] || {}) };
  for (const f of ["roots", "recent", "pinned"]) k[f] = [...(k[f] || [])];
  for (const r of Object.values(k.rems)) { r.kids ||= []; r.text ??= ""; r.parent ??= null; r.c ||= k.u; r.u ||= k.u; }
  return k;
}
export const get = (kb, id) => kb.rems[id] || null;
export const kidsOf = (kb, id) => (id ? get(kb, id)?.kids || [] : kb.roots).map((x) => kb.rems[x]).filter(Boolean);
const listOf = (kb, parent) => (parent ? kb.rems[parent].kids : kb.roots);

// ---------- undo and redo ----------
// Each change records the rems it touched as they were before, so it can be undone exactly, however big the base.
export function begin(kb) { kb._tx = { rems: new Map(), roots: null }; }
function snap(kb, id) { if (kb._tx && !kb._tx.rems.has(id)) kb._tx.rems.set(id, kb.rems[id] ? structuredClone(kb.rems[id]) : null); }
function snapRoots(kb) { if (kb._tx && !kb._tx.roots) kb._tx.roots = [...kb.roots]; }
/** Ends a change. Returns the step to give undo(), or null if nothing changed. */
export function commit(kb) {
  const t = kb._tx; delete kb._tx;
  if (!t || (!t.rems.size && !t.roots)) return null;
  return { rems: [...t.rems], roots: t.roots };
}
/** Puts a step back. Returns the step that redoes it. */
export function undo(kb, step) {
  const back = { rems: step.rems.map(([id]) => [id, kb.rems[id] ? structuredClone(kb.rems[id]) : null]), roots: step.roots ? [...kb.roots] : null };
  const t = now();
  for (const [id, r] of step.rems) {
    if (r) { kb.rems[id] = { ...structuredClone(r), u: t }; delete kb.gone[id]; }
    else if (kb.rems[id]) { delete kb.rems[id]; kb.gone[id] = t; }
  }
  if (step.roots) kb.roots = [...step.roots];
  kb.u = t;
  return back;
}

// ---------- changes ----------
function touch(kb, id) { snap(kb, id); const r = kb.rems[id]; r.u = now(); kb.u = r.u; return r; }
/** A new rem under `parent` (null: the top level) at `index` (default: the end). */
export function create(kb, { parent = null, index = null, text = "", ...rest } = {}) {
  const id = rest.id || uid();
  delete rest.id;
  snap(kb, id);
  const t = now();
  kb.rems[id] = { id, parent, kids: [], text, c: t, u: t, ...rest };
  delete kb.gone[id];
  if (parent) touch(kb, parent); else snapRoots(kb);
  const list = listOf(kb, parent);
  list.splice(index == null ? list.length : Math.max(0, Math.min(index, list.length)), 0, id);
  kb.u = t;
  return kb.rems[id];
}
export function update(kb, id, patch) {
  const r = touch(kb, id);
  for (const [k, v] of Object.entries(patch)) { if (v === undefined || v === null || v === false) delete r[k]; else r[k] = v; }
  if (patch.text === "") r.text = "";
  return r;
}
/** Deletes a rem and everything under it. */
export function remove(kb, id) {
  const r = kb.rems[id]; if (!r) return;
  if (r.parent && kb.rems[r.parent]) { const p = touch(kb, r.parent); p.kids = p.kids.filter((x) => x !== id); }
  else { snapRoots(kb); kb.roots = kb.roots.filter((x) => x !== id); }
  const t = now();
  for (const x of [id, ...descendants(kb, id)]) { snap(kb, x); delete kb.rems[x]; kb.gone[x] = t; }
  kb.pinned = kb.pinned.filter((x) => kb.rems[x]); kb.recent = kb.recent.filter((x) => kb.rems[x]);
  kb.u = t;
}
/** Moves a rem (and what's under it) to `parent` at `index`. Refuses to move a rem into itself. */
export function move(kb, id, parent, index = null) {
  const r = kb.rems[id]; if (!r) return false;
  if (parent && (parent === id || ancestors(kb, parent).includes(id))) return false;
  if (r.parent) { const p = touch(kb, r.parent); p.kids = p.kids.filter((x) => x !== id); } else { snapRoots(kb); kb.roots = kb.roots.filter((x) => x !== id); }
  if (parent) touch(kb, parent); else snapRoots(kb);
  touch(kb, id).parent = parent;
  const list = listOf(kb, parent);
  list.splice(index == null ? list.length : Math.max(0, Math.min(index, list.length)), 0, id);
  return true;
}
const indexIn = (kb, id) => listOf(kb, kb.rems[id].parent).indexOf(id);
/** Tab: becomes the last child of the bullet above it. */
export function indent(kb, id) {
  const r = kb.rems[id], i = indexIn(kb, id); if (i <= 0) return false;
  const prev = listOf(kb, r.parent)[i - 1];
  if (kb.rems[prev].collapsed) update(kb, prev, { collapsed: false });
  return move(kb, id, prev);
}
/** Shift-Tab: becomes the next sibling of its parent. */
export function outdent(kb, id) {
  const r = kb.rems[id]; if (!r.parent) return false;
  const p = kb.rems[r.parent];
  if (p.doc || p.folder) return false;   // a document's top bullets stay in it
  return move(kb, id, p.parent, indexIn(kb, p.id) + 1);
}
export function moveBy(kb, id, d) {
  const r = kb.rems[id], list = listOf(kb, r.parent), i = list.indexOf(id), j = i + d;
  if (j < 0 || j >= list.length) return false;
  return move(kb, id, r.parent, j);
}
/** A copy of a rem and everything under it, placed just after it (or under `parent`). Returns the copy. */
export function duplicate(kb, id, { parent, index } = {}) {
  const src = kb.rems[id]; if (!src) return null;
  const at = parent === undefined ? src.parent : parent;
  const copyOf = (rid, p, i) => {
    const { id: _, kids, parent: __, c, u, daily, ...rest } = structuredClone(kb.rems[rid]);
    const n = create(kb, { ...rest, parent: p, index: i });
    for (const k of kids) copyOf(k, n.id, null);
    return n;
  };
  return copyOf(id, at, index === undefined ? (parent === undefined ? indexIn(kb, id) + 1 : null) : index);
}

// ---------- the shape of the tree ----------
export function ancestors(kb, id) { const out = []; let r = kb.rems[id]; const seen = new Set(); while (r?.parent && !seen.has(r.parent)) { seen.add(r.parent); out.unshift(r.parent); r = kb.rems[r.parent]; } return out; }
export function descendants(kb, id) { const out = [], stack = [...(kb.rems[id]?.kids || [])]; while (stack.length) { const x = stack.shift(); if (!kb.rems[x]) continue; out.push(x); stack.unshift(...kb.rems[x].kids); } return out; }
/** The document a rem is in (itself, if it is one). */
export function docOf(kb, id) { if (kb.rems[id]?.doc || kb.rems[id]?.folder) return id; const a = ancestors(kb, id); for (let i = a.length - 1; i >= 0; i--) if (kb.rems[a[i]].doc || kb.rems[a[i]].folder) return a[i]; return a[0] || id; }
export const isDoc = (r) => Boolean(r?.doc || r?.folder);
/** Every document and folder, in tree order, with its depth. */
export function docTree(kb, { parent = null, depth = 0, out = [] } = {}) {
  for (const r of kidsOf(kb, parent)) {
    if (!isDoc(r)) continue;
    out.push({ id: r.id, depth, rem: r });
    docTree(kb, { parent: r.id, depth: depth + 1, out });
  }
  return out;
}
/** The bullets shown on a page, in reading order, skipping collapsed branches: for moving up and down with the keys. */
export function visible(kb, rootId) {
  const out = [];
  const walk = (id) => { for (const k of kb.rems[id]?.kids || []) { const r = kb.rems[k]; if (!r) continue; out.push(k); if (!r.collapsed && !isDoc(r)) walk(k); } };
  walk(rootId);
  return out;
}

// ---------- text ----------
const REF = /\[\[([a-z0-9]{6,24})\]\]/g;
const NAMED = /\[\[([^\[\]\n]{1,200})\]\]/g;
const TAG = /(^|[\s(])#(?:\[\[([^\]\n]{1,80})\]\]|([\p{L}\p{N}_\-/]{1,60}))/gu;
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
export const tagKey = (name) => tidy(name).toLowerCase();
/** A rem's text with references as names and markup removed: for search, cards, exports and titles. */
export function plain(kb, text, { keepCloze = false, depth = 0 } = {}) {
  let s = String(text ?? "").replace(REF, (_, id) => (depth > 3 ? "…" : nameOf(kb, id, depth + 1)));
  s = s.replace(TAG, (_, pre, a, b) => `${pre}#${a || b}`);
  if (!keepCloze) s = s.replace(/\{\{(?:c\d+::)?([\s\S]+?)(?:::[^}]*)?\}\}/g, "$1");
  return s.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/__([^_]+)__/g, "$1").replace(/~~([^~]+)~~/g, "$1").replace(/==(?:\{[a-z]+\})?([^=]+)==/g, "$1").replace(/(^|[^*])\*([^*\n]+)\*/g, "$1$2").replace(/`([^`]+)`/g, "$1").replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, "$1");
}
/** What a rem is called: its text before any card delimiter, as plain text. */
export function nameOf(kb, id, depth = 0) {
  const r = kb.rems[id];
  if (!r) return "(deleted)";
  if (r.daily && !r.text) return dayTitle(r.daily);
  const raw = String(r.text || "").split(/\s*(?:>>>|>>1\.|>>A\)|>>|<<|<>|::|;;)\s*/)[0];
  return tidy(plain(kb, raw.replace(TAG, "$1"), { depth })) || (r.image ? r.image.label || "Image" : r.table ? "Table" : r.drawing ? "Drawing" : r.pdf ? r.pdf.name || "PDF" : r.portal ? `Portal: ${nameOf(kb, r.portal, depth + 1)}` : "Untitled");
}
/** The path to a rem, as names: "Biology › Cells › Mitochondria". */
export const pathOf = (kb, id) => ancestors(kb, id).map((a) => nameOf(kb, a));
/** Tags in a rem's text, as keys. */
export function tagsIn(text) { const out = []; for (const m of String(text ?? "").matchAll(TAG)) out.push(tagKey(m[2] || m[3])); return [...new Set(out)]; }
export const refsIn = (text) => [...new Set([...String(text ?? "").matchAll(REF)].map((m) => m[1]))];

/** The text as it shows while being edited: references by name. */
export function toEdit(kb, text) { return String(text ?? "").replace(REF, (_, id) => (kb.rems[id] ? `[[${kb.rems[id].daily && !kb.rems[id].text ? kb.rems[id].daily : nameOf(kb, id)}]]` : `[[${id}]]`)); }
/**
 * Edited text back to stored text: each [[Name]] becomes the id of the document or bullet with that name. A name that
 * was a link before the edit keeps pointing where it did; a date ([[2026-11-18]]) is that day's daily document; a new
 * name makes a new document (as RemNote does). Returns { text, made: [new rem ids] }.
 */
export function fromEdit(kb, text, { before = "" } = {}) {
  const made = [], prior = new Map(refsIn(before).map((id) => [nameOf(kb, id).toLowerCase(), id]));
  const out = String(text ?? "").replace(NAMED, (whole, name) => {
    const n = tidy(name);
    if (/^[a-z0-9]{6,24}$/.test(n) && kb.rems[n]) return whole;
    if (!n) return whole;
    const key = n.toLowerCase();
    if (prior.has(key)) return `[[${prior.get(key)}]]`;
    if (DATE_RE.test(n)) return `[[${dailyDoc(kb, n).id}]]`;
    const hit = findByName(kb, n);
    if (hit) return `[[${hit}]]`;
    const r = create(kb, { text: n, doc: true });
    made.push(r.id);
    return `[[${r.id}]]`;
  });
  return { text: out, made };
}
/** The rem with exactly this name: a document first, then any bullet. */
export function findByName(kb, name) {
  const key = tidy(name).toLowerCase(); let best = null;
  for (const r of Object.values(kb.rems)) {
    if (r.template) continue;
    if (nameOf(kb, r.id).toLowerCase() !== key) continue;
    if (isDoc(r)) return r.id;
    best ||= r.id;
  }
  return best;
}

// ---------- formatting (rem text → HTML) ----------
export const HIGHLIGHTS = ["yellow", "green", "blue", "pink", "orange", "purple", "red"];
/**
 * A rem's text as HTML. Bold **b**, italic *i*, underline __u__, strikethrough ~~s~~, highlight ==h== or =={green}h==,
 * code `c`, maths $x^2$ (shown with KaTeX when it's loaded: opts.math), links [text](https://…) and bare URLs,
 * references, tags, cloze gaps and card arrows.
 */
export function inlineHtml(kb, text, opts = {}) {
  const keep = [];
  const hold = (html) => `\u0000${keep.push(html) - 1}\u0001`;
  let s = String(text ?? "");
  s = s.replace(/`([^`\n]+)`/g, (_, c) => hold(`<code>${esc(c)}</code>`));
  s = s.replace(/\$\$([^$]+)\$\$|\$([^$\n]+)\$/g, (_, d, i) => hold(opts.math ? opts.math(d ?? i, Boolean(d)) : `<span class="kb-math${d ? " block" : ""}">${esc(d ?? i)}</span>`));
  s = s.replace(REF, (_, id) => hold(kb.rems[id] ? `<a class="kb-ref${kb.rems[id].daily ? " daily" : ""}" href="#/notes/${id}" data-ref="${id}">${esc(nameOf(kb, id))}</a>` : `<span class="kb-ref broken" title="This was deleted">deleted</span>`));
  s = s.replace(/\[([^\]\n]+)\]\((https?:\/\/[^)\s]+)\)/g, (_, t, u) => hold(`<a class="kb-link" href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`));
  s = s.replace(/(^|\s)(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g, (_, pre, u) => `${pre}${hold(`<a class="kb-link" href="${esc(u)}" target="_blank" rel="noopener">${esc(u.replace(/^https?:\/\//, "").slice(0, 60))}</a>`)}`);
  s = s.replace(TAG, (_, pre, a, b) => `${pre}${hold(`<a class="kb-tag" href="#/notes/tag/${encodeURIComponent(tagKey(a || b))}" data-tag="${esc(tagKey(a || b))}">#${esc(a || b)}</a>`)}`);
  s = s.replace(/\{\{(?:c(\d+)::)?([\s\S]+?)(?:::([^}]*))?\}\}/g, (_, g, t, hint) => hold(`<span class="kb-cloze"${hint ? ` title="${esc(hint)}"` : ""}>${esc(t)}</span>`));
  s = esc(s);
  s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/__([^_]+)__/g, "<u>$1</u>").replace(/~~([^~]+)~~/g, "<s>$1</s>")
    .replace(/==(?:\{([a-z]+)\})?([^=]+)==/g, (_, c, t) => `<mark class="hl-${HIGHLIGHTS.includes(c) ? c : "yellow"}">${t}</mark>`)
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<i>$2</i>")
    .replace(/\s*(&gt;&gt;&gt;|&gt;&gt;1\.|&gt;&gt;A\)|&gt;&gt;|&lt;&lt;|&lt;&gt;|::|;;)\s*/, (m, d) => ` <span class="kb-arrow" data-d="${d}">${{ "&gt;&gt;&gt;": "↓", "&gt;&gt;1.": "1.", "&gt;&gt;A)": "A)", "&gt;&gt;": "→", "&lt;&lt;": "←", "&lt;&gt;": "↔", "::": "⇄", ";;": "›" }[d]}</span> `)
    .replace(/\n/g, "<br>");
  return s.replace(/\u0000(\d+)\u0001/g, (_, i) => keep[i]);
}

// ---------- flashcards ----------
export const CARD_TYPES = {
  basic: "Front to back", reverse: "Back to front", concept: "Concept", descriptor: "Descriptor", cloze: "Cloze",
  multi: "Multi-line", list: "List answer", mcq: "Multiple choice", occlusion: "Image occlusion", table: "From a table",
};
// the kind each card type has in the app's own card table (kit/learning/mastery.js counts recall kinds)
export const STORE_KIND = { basic: "definition", concept: "definition", descriptor: "definition", mcq: "definition", table: "definition", reverse: "reverse", cloze: "cloze", multi: "sequence", list: "sequence", occlusion: "occlusion" };
const CLOZE = /\{\{(?:c(\d+)::)?([\s\S]+?)(?:::([^}]*))?\}\}/g;
const hashN = (s) => { let h = 2166136261; for (const ch of String(s)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return h >>> 0; };
/** Splits a rem's text at its card delimiter: { front, delim, back } or null. */
export function splitCard(text) {
  const t = String(text ?? "");
  const m = t.match(/^([\s\S]*?)\s*(>>>|>>1\.|>>A\)|>>|<<|<>|::|;;)\s*([\s\S]*)$/);
  if (!m || !m[1].trim()) return null;
  if (m[2] === "::" && /\{\{c\d+$/.test(m[1])) return null;   // the "::" inside {{c1::…}}
  return { front: m[1], delim: m[2], back: m[3] };
}
/** The flashcards one rem makes. */
export function cardsOf(kb, id) {
  const r = kb.rems[id];
  if (!r || r.cards === "off" || r.template || inTemplate(kb, id)) return [];
  const out = [], ctx = pathOf(kb, id).slice(-2).join(" › ");
  const P = (s) => tidy(plain(kb, String(s ?? "").replace(TAG, "$1")));
  const add = (type, k, front, back, extra = {}) => { if (tidy(front) && (tidy(back) || type === "occlusion")) out.push({ id: `${id}:${type}:${k}`, rem: id, type, kind: STORE_KIND[type], front, back, context: ctx, ...extra }); };
  // image occlusion: one card per group of hidden regions
  if (r.image?.occl?.length) {
    const groups = [...new Set(r.image.occl.map((o) => o.g ?? o.label ?? ""))];
    groups.forEach((g, k) => { const labels = r.image.occl.filter((o) => (o.g ?? o.label ?? "") === g).map((o) => o.label).filter(Boolean); add("occlusion", k, `${nameOf(kb, id)}: what's hidden?`, labels.join(", ") || "(see the image)", { occl: { image: r.image.id, group: g, mode: r.image.mode || "one" } }); });
  }
  const text = String(r.text || "");
  const sp = splitCard(text);
  const kidsText = () => kidsOf(kb, id).map((k) => P(k.text)).filter(Boolean);
  if (sp) {
    const f = P(sp.front), b = P(sp.back);
    switch (sp.delim) {
      case ">>": add("basic", 0, f, b); break;
      case "<<": add("reverse", 0, b, f); break;
      case "<>": add("basic", 0, f, b); add("reverse", 1, b, f); break;
      case "::": if ((r.dir || "both") !== "back") add("concept", 0, f, b); if ((r.dir || "both") !== "fwd") add("concept", 1, b, f); break;
      case ";;": add("descriptor", 0, ctx ? `${pathOf(kb, id).at(-1)} › ${f}` : f, b); break;
      case ">>>": add("multi", 0, f, [b, ...kidsText()].filter(Boolean).join("\n")); break;
      case ">>1.": { const items = kidsText(); add("list", 0, `${f} (${items.length} in order)`, items.map((x, i) => `${i + 1}. ${x}`).join("\n")); break; }
      case ">>A)": {
        const [right, ...wrong] = kidsText();
        if (right) {
          const opts = [right, ...wrong].map((x, i) => ({ x, k: hashN(`${id}${i}`) })).sort((a, b2) => a.k - b2.k).map((o) => o.x);
          const L = "ABCDEFGH";
          add("mcq", 0, `${f}\n${opts.map((o, i) => `${L[i]}) ${o}`).join("\n")}`, `${L[opts.indexOf(right)]}) ${right}`, { options: opts, answer: opts.indexOf(right) });
        }
        break;
      }
    }
  }
  // cloze: every gap its own card, unless numbered groups put several in one
  const gaps = [...text.matchAll(CLOZE)];
  if (gaps.length && !(sp && sp.delim !== "::" && sp.delim !== ";;")) {
    const groups = [...new Set(gaps.map((g, i) => (g[1] ? `c${g[1]}` : `g${i}`)))];
    groups.forEach((grp) => {
      let i = 0;
      const front = text.replace(CLOZE, (_, n, t, hint) => { const mine = (n ? `c${n}` : `g${i}`) === grp; i++; return mine ? `[…${hint ? ` ${hint}` : ""}]` : t; });
      i = 0;
      const back = text.replace(CLOZE, (_, n, t) => { const mine = (n ? `c${n}` : `g${i}`) === grp; i++; return mine ? `**${t}**` : t; });
      add("cloze", grp, P(front), P(back).replace(/\*\*/g, ""), { answer: gaps.filter((g, j) => (g[1] ? `c${g[1]}` : `g${j}`) === grp).map((g) => P(g[2])).join(", ") });
    });
  }
  // a tag that makes cards (a table): one card per property of each rem with that tag
  for (const t of tagsIn(text)) {
    const def = kb.tagDefs[t];
    if (!def?.cards) continue;
    for (const [k, v] of Object.entries(r.props || {})) if (tidy(v)) add("table", `${t}.${k}`, `${nameOf(kb, id)} › ${k}`, P(v));
  }
  return out;
}
function inTemplate(kb, id) { return ancestors(kb, id).some((a) => kb.rems[a]?.template); }
/**
 * Every card in a rem's branch: its own, its descendants', and (with portals) the branches its portals show, once each.
 * Documents inside it count too, as RemNote gathers a document's cards through its hierarchy and portals.
 */
export function cardsUnder(kb, id, { portals = true } = {}) {
  const seen = new Set(), out = [];
  const walk = (x, depth) => {
    if (seen.has(x) || depth > 50) return; seen.add(x);
    const r = kb.rems[x]; if (!r) return;
    if (r.cards === "off" && isDoc(r)) return;
    out.push(...cardsOf(kb, x));
    if (portals && r.portal) walk(r.portal, depth + 1);
    for (const k of r.kids) walk(k, depth + 1);
  };
  if (id) walk(id, 0); else for (const x of kb.roots) walk(x, 0);
  return out;
}
export const allCards = (kb) => cardsUnder(kb, null);

// ---------- references, backlinks, tags ----------
/** Rems that link to this one, or show it in a portal, or (for a tag) carry the tag: [{ id, kind, path }]. */
export function backlinks(kb, id) {
  const out = [];
  for (const r of Object.values(kb.rems)) {
    if (r.id === id) continue;
    if (refsIn(r.text).includes(id)) out.push({ id: r.id, kind: "reference", path: pathOf(kb, r.id) });
    else if (r.portal === id) out.push({ id: r.id, kind: "portal", path: pathOf(kb, r.id) });
  }
  return out.sort((a, b) => (kb.rems[b.id].u || 0) - (kb.rems[a.id].u || 0));
}
/** Rems that mention this one's name without linking it: concepts that could be connected. */
export function unlinkedMentions(kb, id, limit = 30) {
  const name = nameOf(kb, id);
  if (name.length < 3 || name === "Untitled") return [];
  const re = new RegExp(`(^|[^\\p{L}\\p{N}])${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|[^\\p{L}\\p{N}])`, "iu");
  const out = [];
  for (const r of Object.values(kb.rems)) {
    if (r.id === id || ancestors(kb, r.id).includes(id) || refsIn(r.text).includes(id) || r.template) continue;
    if (re.test(plain(kb, r.text))) out.push({ id: r.id, path: pathOf(kb, r.id) });
    if (out.length >= limit) break;
  }
  return out;
}
/** Every tag in use, with how many rems carry it. */
export function allTags(kb) {
  const n = new Map();
  for (const r of Object.values(kb.rems)) for (const t of tagsIn(r.text)) n.set(t, (n.get(t) || 0) + 1);
  for (const [k, d] of Object.entries(kb.tagDefs)) if (!n.has(k)) n.set(k, 0), d;
  return [...n].map(([key, count]) => ({ key, name: kb.tagDefs[key]?.name || key, count, def: kb.tagDefs[key] || null })).sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}
export const tagged = (kb, key) => Object.values(kb.rems).filter((r) => tagsIn(r.text).includes(key)).map((r) => r.id);
/** A tag's settings: its name, the properties every rem with it has (a lightweight database), and whether those make cards. */
export function defineTag(kb, name, patch = {}) {
  const key = tagKey(name), old = kb.tagDefs[key] || { name: tidy(name), schema: [], cards: false };
  kb.tagDefs[key] = { ...old, ...patch, u: now() }; kb.u = now();
  return kb.tagDefs[key];
}
/** The table a tag makes: one row per tagged rem, one column per property. */
export function tagTable(kb, key) {
  const def = kb.tagDefs[key] || { schema: [] }, ids = tagged(kb, key);
  const cols = [...new Set([...(def.schema || []), ...ids.flatMap((id) => Object.keys(kb.rems[id].props || {}))])];
  return { cols, rows: ids.map((id) => ({ id, name: nameOf(kb, id), cells: cols.map((c) => kb.rems[id].props?.[c] ?? "") })) };
}

// ---------- search ----------
/**
 * Searches every rem. Ranks names over body text, documents over bullets, then what's opened often and changed
 * recently, and higher in the tree over deeper. Also finds image labels, occlusion labels, property values, PDF
 * highlights and table cells. Options: { limit, docs (documents only), within (a rem id: only under it), tag }.
 */
export function search(kb, q, { limit = 20, docs = false, within = null, tag = null, at = now() } = {}) {
  const words = tidy(q).toLowerCase().split(" ").filter(Boolean);
  const out = [];
  const scope = within ? new Set([within, ...descendants(kb, within)]) : null;
  for (const r of Object.values(kb.rems)) {
    if (docs && !isDoc(r)) continue;
    if (scope && !scope.has(r.id)) continue;
    if (tag && !tagsIn(r.text).includes(tag)) continue;
    if (r.template && !docs) continue;
    const name = nameOf(kb, r.id).toLowerCase();
    const body = [plain(kb, r.text), r.image?.label, ...(r.image?.occl || []).map((o) => o.label), ...Object.entries(r.props || {}).flat(), ...(r.table?.rows || []).flat(), r.src?.quote, r.embed].filter(Boolean).join(" ").toLowerCase();
    let score = 0;
    if (!words.length) score = 1;
    for (const w of words) {
      let s = 0;
      if (name === words.join(" ")) s = 100;
      else if (name.startsWith(w)) s = 60;
      else if (new RegExp(`(^|[^\\p{L}\\p{N}])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "u").test(name)) s = 40;
      else if (name.includes(w)) s = 25;
      else if (body.includes(w)) s = 12;
      if (!s) { score = 0; break; }
      score += s;
    }
    if (!score) continue;
    const depth = ancestors(kb, r.id).length;
    score += (isDoc(r) ? 15 : 0) + Math.log2(1 + (kb.visits[r.id] || 0)) * 6 + Math.max(0, 10 - (at - (r.u || 0)) / DAY / 3) - depth * 1.5;
    out.push({ id: r.id, name: nameOf(kb, r.id), path: pathOf(kb, r.id), doc: isDoc(r), score });
  }
  return out.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name)).slice(0, limit);
}
export function visit(kb, id) {
  kb.visits[id] = (kb.visits[id] || 0) + 1;
  kb.recent = [id, ...kb.recent.filter((x) => x !== id)].slice(0, 20);
}

// ---------- daily documents ----------
export const dayKey = (d = new Date()) => { const x = new Date(d); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`; };
export const dayTitle = (k) => new Date(`${k}T12:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
/** The folder that holds the daily documents. */
export function dailyRoot(kb) {
  let f = Object.values(kb.rems).find((r) => r.dailyRoot);
  if (!f) f = create(kb, { text: "Daily documents", folder: true, dailyRoot: true });
  return f;
}
/** The document for one day (made the first time it's opened). */
export function dailyDoc(kb, day = dayKey()) {
  const hit = Object.values(kb.rems).find((r) => r.daily === day);
  if (hit) return hit;
  const root = dailyRoot(kb), list = root.kids.map((k) => kb.rems[k]?.daily || "");
  let i = list.findIndex((d) => d && d < day); if (i < 0) i = list.length;   // newest first
  return create(kb, { parent: root.id, index: i, text: "", doc: true, daily: day });
}

// ---------- to-dos ----------
/** Every to-do: [{ id, done, due, doc, name }], open ones first, by due date. A to-do's due date is its `due`
 * property, an @2026-11-20 in its text, or the day of the daily document it's in. */
export function tasks(kb, { done = false } = {}) {
  const out = [];
  for (const r of Object.values(kb.rems)) {
    if (!r.todo || r.template) continue;
    if (!done && r.todo === "done") continue;
    const at = r.props?.due || String(r.text).match(/@(\d{4}-\d{2}-\d{2})/)?.[1] || ancestors(kb, r.id).map((a) => kb.rems[a].daily).filter(Boolean).at(-1) || null;
    out.push({ id: r.id, done: r.todo === "done", due: at, doc: docOf(kb, r.id), name: nameOf(kb, r.id) });
  }
  return out.sort((a, b) => Number(a.done) - Number(b.done) || (a.due || "9999").localeCompare(b.due || "9999") || a.name.localeCompare(b.name));
}

// ---------- templates ----------
// A template is a tree of [text, children?, settings?]. Built in, and any document can be saved as one.
export const TEMPLATES = {
  lecture: { name: "Lecture notes", tree: [["Module:: "], ["Lecturer:: "], ["Key ideas", [[""]], { heading: 2 }], ["Terms", [["Term :: definition"]], { heading: 2 }], ["Questions to follow up", [["", [], { todo: "open" }]], { heading: 2 }], ["Summary in three sentences", [[""]], { heading: 2 }]] },
  cornell: { name: "Cornell notes", tree: [["Cues and questions", [["Question >> answer"]], { heading: 2 }], ["Notes", [[""]], { heading: 2 }], ["Summary", [[""]], { heading: 2 }]] },
  revision: { name: "Revision checklist", tree: [["Topics", [["", [], { todo: "open" }]], { heading: 2 }], ["Past paper questions", [["", [], { todo: "open" }]], { heading: 2 }], ["Things I keep getting wrong", [[""]], { heading: 2 }]] },
  book: { name: "Book or chapter", tree: [["Author ;; "], ["Main argument ;; "], ["Key evidence", [[""]], { heading: 2 }], ["Quotes", [[""]], { heading: 2 }], ["What I think", [[""]], { heading: 2 }]] },
  paper: { name: "Research paper", tree: [["Citation ;; "], ["Research question ;; "], ["Method ;; "], ["Findings ;; "], ["Limitations ;; "], ["How it connects to my work", [[""]], { heading: 2 }]] },
  meeting: { name: "Meeting or seminar", tree: [["Who ;; "], ["Agenda", [[""]], { heading: 2 }], ["Decisions", [[""]], { heading: 2 }], ["Actions", [["", [], { todo: "open" }]], { heading: 2 }]] },
  project: { name: "Project", tree: [["Goal ;; "], ["Deadline ;; "], ["Milestones", [["", [], { todo: "open" }]], { heading: 2 }], ["Resources", [[""]], { heading: 2 }], ["Notes", [[""]], { heading: 2 }]] },
  practical: { name: "Practical or lab", tree: [["Aim ;; "], ["Hypothesis ;; "], ["Method >>1.", [[""]]], ["Results", [[""]], { heading: 2 }], ["Conclusion ;; "], ["Sources of error", [[""]], { heading: 2 }]] },
};
/** Adds a template's bullets under `parent`. `tpl` is a built-in key, a tree, or a rem id saved as a template. */
export function applyTemplate(kb, parent, tpl) {
  if (typeof tpl === "string" && kb.rems[tpl]) { for (const k of kb.rems[tpl].kids) duplicate(kb, k, { parent, index: null }); return; }
  const tree = typeof tpl === "string" ? TEMPLATES[tpl]?.tree : tpl;
  const add = (items, p) => { for (const [text, kids = [], set = {}] of items || []) { const r = create(kb, { parent: p, text, ...set }); add(kids, r.id); } };
  add(tree, parent);
}
export const savedTemplates = (kb) => Object.values(kb.rems).filter((r) => r.template).map((r) => ({ id: r.id, name: nameOf(kb, r.id) }));

// ---------- syncing two copies ----------
/**
 * Two copies of the knowledge base (this device and the account) as one. Each rem: the later change wins, and a
 * deletion beats any change made before it. The tree is then repaired so it's always valid: every rem is listed by
 * the parent it names, in that parent's order, and a rem whose parent is gone moves to the top level.
 */
export function merge(a, b) {
  a = normalise(a); b = normalise(b);
  const out = normalise({ ...a, u: Math.max(a.u, b.u) });
  out.gone = { ...a.gone };
  for (const [id, t] of Object.entries(b.gone)) out.gone[id] = Math.max(out.gone[id] || 0, t);
  const ids = new Set([...Object.keys(a.rems), ...Object.keys(b.rems)]);
  out.rems = {};
  for (const id of ids) {
    const x = a.rems[id], y = b.rems[id];
    const win = !x ? y : !y ? x : (y.u || 0) > (x.u || 0) ? y : x;
    if ((out.gone[id] || 0) >= (win.u || 0)) continue;
    out.rems[id] = structuredClone(win);
    delete out.gone[id];
  }
  // the tree: a rem's own parent is the truth
  for (const r of Object.values(out.rems)) if (r.parent && (!out.rems[r.parent] || r.parent === r.id)) r.parent = null;
  // break any loop two devices' moves made (a under b on one, b under a on the other)
  for (const r of Object.values(out.rems)) { const seen = new Set([r.id]); let p = r.parent; while (p) { if (seen.has(p)) { r.parent = null; break; } seen.add(p); p = out.rems[p]?.parent; } }
  const order = (list, parent) => {
    const mine = Object.values(out.rems).filter((r) => r.parent === parent).map((r) => r.id), set = new Set(mine);
    const kept = [...new Set(list)].filter((id) => set.has(id));
    return [...kept, ...mine.filter((id) => !kept.includes(id)).sort((p, q) => out.rems[p].c - out.rems[q].c)];
  };
  for (const r of Object.values(out.rems)) r.kids = order(r.kids, r.id);
  const newer = b.u > a.u ? b : a;
  out.roots = order([...newer.roots, ...(newer === a ? b.roots : a.roots)], null);
  for (const f of ["tagDefs", "exams"]) { out[f] = { ...a[f] }; for (const [k, v] of Object.entries(b[f])) if (!out[f][k] || (v.u || 0) > (out[f][k].u || 0)) out[f][k] = v; for (const [k, v] of Object.entries(out[f])) if (v.deleted && Date.now() - (v.u || 0) > 90 * DAY) delete out[f][k]; }
  out.cardMap = { ...b.cardMap, ...a.cardMap };
  out.docMap = { ...b.docMap, ...a.docMap };
  out.visits = { ...b.visits }; for (const [k, v] of Object.entries(a.visits)) out.visits[k] = Math.max(v, out.visits[k] || 0);
  out.recent = [...new Set([...a.recent, ...b.recent])].filter((id) => out.rems[id]).slice(0, 20);
  out.pinned = [...new Set([...newer.pinned, ...(newer === a ? b.pinned : a.pinned)])].filter((id) => out.rems[id]);
  out.settings = { ...a.settings, ...(b.u > a.u ? b.settings : {}) };
  // tombstones older than 90 days have done their job
  for (const [id, t] of Object.entries(out.gone)) if (Date.now() - t > 90 * DAY) delete out.gone[id];
  return out;
}

// ---------- a starting point ----------
/** A first document that shows how Gradify Notes works, written in its own syntax. */
export function welcome(kb) {
  const d = create(kb, { text: "Welcome to Gradify Notes", doc: true });
  applyTemplate(kb, d.id, [
    ["Every line is a bullet. Press Tab to indent, Shift+Tab to outdent, and / for everything else."],
    ["Write a flashcard in the line itself", [
      ["Mitochondria >> the part of the cell where aerobic respiration releases energy as ATP"],
      ["Photosynthesis :: the process plants use to make glucose from carbon dioxide and water, using light"],
      ["The {{left ventricle}} pumps blood into the {{aorta}}"],
      ["Stages of mitosis >>1.", [["Prophase"], ["Metaphase"], ["Anaphase"], ["Telophase"]]],
      ["Which gas do plants take in for photosynthesis? >>A)", [["Carbon dioxide"], ["Oxygen"], ["Nitrogen"]]],
    ], { heading: 2 }],
    ["Connect ideas", [
      ["Type [[ to link to another document, # to tag, and /portal to show a bullet from somewhere else, live."],
      ["Every document lists what links to it at the bottom."],
    ], { heading: 2 }],
    ["Revise", [["Open Flashcards in the sidebar, or press Practise on any document. Reviews use the same memory model as the rest of Gradify."]], { heading: 2 }],
  ]);
  return d;
}
