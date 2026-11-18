// Bringing notes into Gradify Notes and taking them out again. Pure, so Node tests it (tests/kb.test.mjs).
//
// In:  Markdown (and Obsidian vaults: [[wikilinks]] stay links), OPML (Workflowy, Dynalist, RemNote, Logseq),
//      indented plain text, CSV or a spreadsheet saved as CSV (two columns are cards; a header row makes a table),
//      Anki's "Notes in plain text" export, the Tools notebook, and Gradify's own export.
// Out: Gradify's own format (everything, to bring back later), Markdown, OPML, HTML, plain text, CSV of cards and an
//      Anki import file. Images, drawings and PDFs stay with the rems as ids: the native file keeps them; the others
//      mention them by name.
import { create, kidsOf, nameOf, plain, inlineHtml, cardsUnder, descendants, fromEdit, toEdit, esc, isDoc, normalise } from "./model.js";

const tidy = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
const unhtml = (s) => String(s ?? "").replace(/<br\s*\/?>/gi, "\n").replace(/<(b|strong)>(.*?)<\/\1>/gi, "**$2**").replace(/<(i|em)>(.*?)<\/\1>/gi, "*$2*").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");

// An outline to import: [{ text, kids: [], todo?, heading?, doc? }]
// ---------- reading ----------
/** Markdown or indented text: headings open sections, list items nest by indentation, - [ ] is a to-do. */
export function fromMarkdown(md) {
  const root = { kids: [] }, stack = [{ level: -1, node: root, heading: 0 }];
  let fence = null;
  const lines = String(md ?? "").replace(/\r\n?/g, "\n").split("\n");
  for (let li = 0; li < lines.length; li++) {
    const raw = lines[li];
    if (fence) { if (/^\s*```/.test(raw)) { fence = null; continue; } fence.text += (fence.text ? "\n" : "") + raw; continue; }
    if (!raw.trim()) continue;
    if (/^\s*---+\s*$/.test(raw) && li === 0) { while (li + 1 < lines.length && !/^\s*---+\s*$/.test(lines[++li])); continue; }   // front matter
    const h = raw.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      while (stack.length > 1 && (stack.at(-1).heading === 0 || stack.at(-1).heading >= level)) stack.pop();
      const node = { text: h[2].trim(), kids: [], heading: Math.min(3, level) };
      stack.at(-1).node.kids.push(node);
      stack.push({ level: -1, node, heading: level });
      continue;
    }
    const indent = raw.match(/^\s*/)[0].replace(/\t/g, "    ").length;
    let text = raw.trim(), todo = null;
    const code = text.match(/^```(\w*)/);
    if (code) { const node = { text: "", kids: [], code: code[1] || "text" }; pick(indent).kids.push(node); fence = node; continue; }
    const tm = text.match(/^[-*+]\s+\[( |x|X)\]\s+(.*)$/);
    if (tm) { todo = tm[1] === " " ? "open" : "done"; text = tm[2]; }
    else text = text.replace(/^([-*+]|\d+[.)])\s+/, "");
    if (/^>\s?/.test(text)) text = text.replace(/^>\s?/, "");
    const node = { text, kids: [] };
    if (todo) node.todo = todo;
    const img = text.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) { node.text = img[1] || "Image"; node.imageUrl = img[2]; }
    pick(indent).kids.push(node);
    stack.push({ level: indent, node, heading: 0 });
  }
  return root.kids;
  function pick(indent) {
    while (stack.length > 1 && stack.at(-1).heading === 0 && stack.at(-1).level >= indent) stack.pop();
    return stack.at(-1).node;
  }
}
/** OPML (Workflowy, Dynalist, Logseq, RemNote). */
export function fromOPML(xml) {
  const root = { kids: [] }, stack = [root];
  const attr = (tag, name) => { const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i")); return m ? unhtml(m[1].replace(/&#10;/g, "\n")) : ""; };
  for (const m of String(xml ?? "").matchAll(/<outline\b[^>]*?(\/?)>|<\/outline>/gi)) {
    if (m[0].startsWith("</")) { if (stack.length > 1) stack.pop(); continue; }
    const tag = m[0], node = { text: attr(tag, "text"), kids: [] };
    const note = attr(tag, "_note"); if (note) node.kids.push({ text: note, kids: [] });
    if (/_complete="true"/i.test(tag)) node.todo = "done";
    stack.at(-1).kids.push(node);
    if (!m[1]) stack.push(node);
  }
  return root.kids;
}
/** Splits CSV, with quoted fields. A tab-separated file works too. */
export function parseCSV(text) {
  const s = String(text ?? "").replace(/\r\n?/g, "\n"), sep = (s.split("\n")[0].match(/\t/g) || []).length > (s.split("\n")[0].match(/,/g) || []).length ? "\t" : (s.split("\n")[0].match(/;/g) || []).length > (s.split("\n")[0].match(/,/g) || []).length ? ";" : ",";
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (q) { if (ch === '"' && s[i + 1] === '"') { cell += '"'; i++; } else if (ch === '"') q = false; else cell += ch; continue; }
    if (ch === '"' && !cell) q = true;
    else if (ch === sep) { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim()));
}
/**
 * CSV as notes. Two columns: each row is a card (front >> back). More columns with a header row: a table, and each
 * row is also a bullet with the header's properties (so it can be tagged and make cards).
 */
export function fromCSV(text, { header = null } = {}) {
  const rows = parseCSV(text);
  if (!rows.length) return [];
  const wide = Math.max(...rows.map((r) => r.length));
  if (wide <= 2) return rows.map((r) => ({ text: `${tidy(r[0])} >> ${tidy(r[1] ?? "")}`, kids: [] })).filter((n) => !/^\s*>>/.test(n.text));
  const hasHeader = header ?? rows[0].every((c) => c && c.length < 40 && !/^\d+([.,]\d+)?$/.test(c.trim()));
  const head = hasHeader ? rows[0].map(tidy) : rows[0].map((_, i) => `Column ${i + 1}`), body = hasHeader ? rows.slice(1) : rows;
  return [{ text: "Table", kids: [], table: { rows: [head, ...body.map((r) => head.map((_, i) => tidy(r[i] ?? "")))] } },
    ...body.map((r) => ({ text: tidy(r[0]), kids: [], props: Object.fromEntries(head.slice(1).map((h, i) => [h, tidy(r[i + 1] ?? "")]).filter(([, v]) => v)) }))];
}
/** Anki's "Notes in plain text" export (tab-separated, with #separator / #html / #tags column headers). */
export function fromAnki(text) {
  const lines = String(text ?? "").replace(/\r\n?/g, "\n").split("\n");
  let sep = "\t", html = true, tagsCol = -1;
  const out = [];
  for (const l of lines) {
    if (l.startsWith("#")) {
      const m = l.match(/^#([\w ]+):(.*)$/); if (!m) continue;
      if (m[1] === "separator") sep = { tab: "\t", comma: ",", semicolon: ";", pipe: "|", space: " " }[m[2].trim().toLowerCase()] ?? m[2];
      if (m[1] === "html") html = m[2].trim() === "true";
      if (m[1] === "tags column") tagsCol = Number(m[2]) - 1;
      continue;
    }
    if (!l.trim()) continue;
    const cols = sep === "," ? parseCSV(l)[0] || [] : l.split(sep);
    const clean = (s) => tidy(html ? unhtml(s) : s).replace(/\{\{c\d+::([^}]+?)(::[^}]*)?\}\}/g, "{{$1}}");
    const front = clean(cols[0]), back = clean(cols[1] ?? "");
    const tags = tagsCol >= 0 ? String(cols[tagsCol] || "").trim().split(/\s+/).filter(Boolean).map((t) => ` #${/[^\p{L}\p{N}_\-/]/u.test(t) ? `[[${t}]]` : t}`).join("") : "";
    if (!front) continue;
    out.push({ text: /\{\{/.test(front) ? `${front}${tags}` : `${front} >> ${back}${tags}`, kids: [] });
  }
  return out;
}
/** The Tools notebook's pages (kit/tools/store.js): each page becomes a document. */
export const fromNotebookPages = (pages) => pages.map((p) => ({ text: p.title || "Untitled", doc: true, kids: fromMarkdown(p.text || "") }));

/**
 * Adds an outline under `parent`. [[Name]] links are resolved to documents (made if they don't exist), so an
 * imported Obsidian vault stays connected. Returns the new top rems' ids.
 */
export function insertOutline(kb, parent, items, { asDocs = false } = {}) {
  const made = [];
  const add = (list, p, top) => {
    for (const n of list) {
      const { kids = [], text = "", imageUrl, ...rest } = n;
      const r = create(kb, { parent: p, text: "", ...(top && asDocs ? { doc: true } : {}), ...rest });
      if (imageUrl && !/^img:/.test(imageUrl)) r.embed = imageUrl;
      r.text = fromEdit(kb, text).text;
      if (top) made.push(r.id);
      add(kids, r.id, false);
    }
  };
  add(items, parent, true);
  return made;
}

// ---------- writing ----------
const mdLine = (kb, r) => {
  let t = toEdit(kb, r.text || "");
  if (r.image) t = `![${r.image.label || nameOf(kb, r.id)}](img:${r.image.id})${t ? ` ${t}` : ""}`;
  if (r.embed) t = `${t ? `${t} ` : ""}${r.embed}`;
  if (r.portal) t = `${t}↪ [[${nameOf(kb, r.portal)}]]`;
  if (r.todo) t = `[${r.todo === "done" ? "x" : " "}] ${t}`;
  for (const [k, v] of Object.entries(r.props || {})) t += `\n  - ${k}:: ${v}`;
  return t;
};
function tableMd(rows) { if (!rows?.length) return ""; const w = rows[0].length, line = (r) => `| ${Array.from({ length: w }, (_, i) => String(r[i] ?? "").replace(/\|/g, "\\|")).join(" | ")} |`; return [line(rows[0]), `| ${Array(w).fill("---").join(" | ")} |`, ...rows.slice(1).map(line)].join("\n"); }
/** A document (or any rem) and everything under it as Markdown. */
export function toMarkdown(kb, id) {
  const r = kb.rems[id], out = [`# ${nameOf(kb, id)}`, ""];
  const walk = (x, depth) => {
    for (const k of kidsOf(kb, x)) {
      if (k.heading && depth === 0) { out.push("", `${"#".repeat(Math.min(6, k.heading + 1))} ${toEdit(kb, k.text)}`, ""); walk(k.id, 0); continue; }
      if (k.code) { out.push("```" + (k.code === "text" ? "" : k.code), k.text, "```"); continue; }
      if (k.table) { out.push("", tableMd(k.table.rows), ""); continue; }
      out.push(`${"  ".repeat(depth)}- ${mdLine(kb, k).replace(/\n/g, `\n${"  ".repeat(depth)}`)}`);
      walk(k.id, depth + 1);
    }
  };
  if (r && !isDoc(r) && r.text) out.splice(1, 0, "", mdLine(kb, r));
  walk(id, 0);
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
/** Indented plain text, as most outliners paste it. */
export function toText(kb, id) {
  const out = [nameOf(kb, id)];
  const walk = (x, d) => { for (const k of kidsOf(kb, x)) { out.push(`${"\t".repeat(d + 1)}${plain(kb, k.text) || (k.table ? k.table.rows.map((r) => r.join(" | ")).join(" / ") : nameOf(kb, k.id))}`); walk(k.id, d + 1); } };
  walk(id, 0);
  return out.join("\n") + "\n";
}
/** OPML, for Workflowy, Dynalist, Logseq and RemNote. */
export function toOPML(kb, id) {
  const a = (s) => esc(s).replace(/\n/g, "&#10;");
  const walk = (x, d) => kidsOf(kb, x).map((k) => { const inner = walk(k.id, d + 1); const t = a(toEdit(kb, k.text) || nameOf(kb, k.id)); const done = k.todo === "done" ? ' _complete="true"' : ""; return inner ? `${"  ".repeat(d)}<outline text="${t}"${done}>\n${inner}\n${"  ".repeat(d)}</outline>` : `${"  ".repeat(d)}<outline text="${t}"${done}/>`; }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<opml version="2.0">\n<head><title>${a(nameOf(kb, id))}</title></head>\n<body>\n<outline text="${a(nameOf(kb, id))}">\n${walk(id, 1)}\n</outline>\n</body>\n</opml>\n`;
}
/** A web page of the document, formatted as it reads in Gradify. */
export function toHTML(kb, id) {
  const walk = (x) => { const ks = kidsOf(kb, x); if (!ks.length) return ""; return `<ul>${ks.map((k) => `<li${k.todo ? ` class="todo ${k.todo}"` : ""}>${k.heading ? `<h${k.heading + 1}>` : ""}${k.todo ? (k.todo === "done" ? "☑ " : "☐ ") : ""}${k.table ? `<table>${k.table.rows.map((r, i) => `<tr>${r.map((c) => (i ? `<td>${esc(c)}</td>` : `<th>${esc(c)}</th>`)).join("")}</tr>`).join("")}</table>` : k.code ? `<pre><code>${esc(k.text)}</code></pre>` : inlineHtml(kb, k.text).replace(/href="#\/notes\/[^"]*"/g, "")}${k.heading ? `</h${k.heading + 1}>` : ""}${walk(k.id)}</li>`).join("")}</ul>`; };
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(nameOf(kb, id))}</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:46rem;margin:2rem auto;padding:0 1rem;color:#111}ul{padding-left:1.3rem}mark{background:#fff3a0}.kb-cloze{background:#e8e4ff;padding:0 .2em;border-radius:3px}.kb-arrow{color:#7a6cff;font-weight:600}.kb-ref,.kb-tag{color:#4641ff;text-decoration:none}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:4px 8px}</style></head><body><h1>${esc(nameOf(kb, id))}</h1>${walk(id)}<p style="color:#888;font-size:13px">Exported from Gradify Notes</p></body></html>\n`;
}
/** The cards in a branch, for Anki ("Import" in Anki: fields separated by tabs, HTML allowed, the last column tags). */
export function toAnki(kb, id) {
  const cell = (s) => esc(s).replace(/\n/g, "<br>").replace(/\t/g, " ");
  const tag = nameOf(kb, id).replace(/[^\p{L}\p{N}]+/gu, "_").replace(/^_|_$/g, "") || "Gradify";
  const rows = cardsUnder(kb, id).filter((c) => c.type !== "occlusion").map((c) => `${cell(c.front)}\t${cell(c.back)}\tGradify ${tag}`);
  return `#separator:tab\n#html:true\n#tags column:3\n${rows.join("\n")}\n`;
}
/** The cards in a branch as CSV: front, back, type, where it is. */
export function toCSV(kb, id) {
  const q = (s) => `"${String(s ?? "").replace(/"/g, '""')}"`;
  return ["Front,Back,Type,Location", ...cardsUnder(kb, id).map((c) => [c.front, c.back, c.type, c.context].map(q).join(","))].join("\n") + "\n";
}
/** Gradify's own format: a branch with everything it needs to come back exactly (tags' settings included). */
export function toNative(kb, id) {
  const ids = id ? [id, ...descendants(kb, id)] : Object.keys(kb.rems);
  const rems = Object.fromEntries(ids.map((x) => [x, kb.rems[x]]));
  const tags = new Set(ids.flatMap((x) => [...String(kb.rems[x].text).matchAll(/#(?:\[\[([^\]]+)\]\]|([\p{L}\p{N}_\-/]+))/gu)].map((m) => (m[1] || m[2]).toLowerCase())));
  return { format: "gradify-notes", version: 1, exported: new Date().toISOString(), root: id || null, rems, tagDefs: Object.fromEntries(Object.entries(kb.tagDefs).filter(([k]) => !id || tags.has(k))) };
}
/**
 * Brings Gradify's own export back. Every rem gets a new id (so importing twice makes two copies, never a clash),
 * and links inside the export follow; links to rems that aren't in it are kept if this knowledge base has them.
 */
export function fromNative(kb, data, parent = null) {
  if (data?.format !== "gradify-notes") throw new Error("That isn't a Gradify Notes export.");
  const src = normalise({ rems: data.rems }), map = new Map();
  for (const id of Object.keys(src.rems)) map.set(id, `r${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-3)}`);
  const relink = (t) => String(t ?? "").replace(/\[\[([a-z0-9]{6,24})\]\]/g, (w, x) => (map.has(x) ? `[[${map.get(x)}]]` : kb.rems[x] ? w : ""));
  const tops = data.root ? [data.root] : Object.values(src.rems).filter((r) => !r.parent || !src.rems[r.parent]).map((r) => r.id);
  const add = (id, p) => {
    const { kids, parent: _, id: __, c, u, ...rest } = src.rems[id];
    const r = create(kb, { ...rest, id: map.get(id), parent: p, text: relink(rest.text) });
    if (r.portal) r.portal = map.get(r.portal) || (kb.rems[r.portal] ? r.portal : undefined);
    if (!r.portal) delete r.portal;
    for (const k of kids) if (src.rems[k]) add(k, r.id);
    return r.id;
  };
  const made = tops.map((t) => add(t, parent));
  for (const [k, v] of Object.entries(data.tagDefs || {})) if (!kb.tagDefs[k]) kb.tagDefs[k] = v;
  return made;
}
