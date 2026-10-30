// Course notes: a compact text format, one file per unit, parsed into lessons and drawn as the
// notes page under each lesson. Each lesson starts with "## Title"; inside it, each line starts with:
//   S: the lead (what this lesson is about, in a sentence or two)
//   H: a heading, which starts a new section
//   P: a paragraph (a line with no prefix is a paragraph too)
//   - a bullet point
//   E: an equation, optionally "equation :: what it means"
//   X: a worked example; following "> " lines are its steps
//   K: a key idea, boxed
//   !: a pitfall, a common mistake
//   Q: a flashcard, "question | answer"
//   M: a check question, "question | right answer | wrong | wrong | wrong | why" (M1: easy, M3: hard)
// Inline: **bold**, *italic*, `code`, x^{2} and v_{0}.
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
export const inline = (s) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, "$1<i>$2</i>")
  .replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\^\{([^}]*)\}/g, "<sup>$1</sup>").replace(/_\{([^}]*)\}/g, "<sub>$1</sub>");
export const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export function parseNotes(text) {
  const lessons = [];
  let L = null, ex = null;
  for (const raw of String(text || "").split("\n")) {
    const line = raw.trim();
    if (!line) { ex = null; continue; }
    if (line.startsWith("## ")) { L = { title: line.slice(3).trim(), lead: "", blocks: [], cards: [], mcq: [] }; lessons.push(L); ex = null; continue; }
    if (!L) continue;
    if (line.startsWith("> ") && ex) { ex.steps.push(line.slice(2)); continue; }
    ex = null;
    const m = line.match(/^(S|H|P|E|X|K|!|Q|M[123]?):\s*(.*)$/);
    const [tag, body] = m ? [m[1], m[2]] : line.startsWith("- ") ? ["-", line.slice(2)] : ["P", line];
    const last = L.blocks.at(-1);
    if (tag === "S") L.lead += (L.lead ? " " : "") + body;
    else if (tag === "H") L.blocks.push({ t: "h", x: body });
    else if (tag === "P") L.blocks.push({ t: "p", x: body });
    else if (tag === "-") { if (last?.t === "ul") last.items.push(body); else L.blocks.push({ t: "ul", items: [body] }); }
    else if (tag === "E") { const [x, note] = body.split(" :: "); if (last?.t === "eq") last.rows.push([x, note]); else L.blocks.push({ t: "eq", rows: [[x, note]] }); }
    else if (tag === "X") { ex = { t: "ex", x: body, steps: [] }; L.blocks.push(ex); }
    else if (tag === "K") L.blocks.push({ t: "key", x: body });
    else if (tag === "!") L.blocks.push({ t: "pit", x: body });
    else if (tag === "Q") { const [q, a] = body.split(" | "); if (q && a) L.cards.push([q.trim(), a.trim()]); }
    else if (tag[0] === "M") {
      const [q, right, ...rest] = body.split(" | ").map((s) => s.trim());
      const why = rest.length > 3 ? rest.pop() : "";
      if (q && right && rest.length) L.mcq.push({ q, right, wrong: rest, why, d: Number(tag[1] || 2) });
    }
  }
  return lessons;
}

// the notes for one lesson, grouped into sections by their headings
export function lessonHtml(L) {
  const sections = [];
  let cur = { h: null, parts: [] };
  for (const b of L.blocks) {
    if (b.t === "h") { if (cur.h || cur.parts.length) sections.push(cur); cur = { h: b.x, parts: [] }; continue; }
    cur.parts.push(block(b));
  }
  if (cur.h || cur.parts.length) sections.push(cur);
  return sections.map((s) => `<section>${s.h ? `<h3>${inline(s.h)}</h3>` : ""}${s.parts.join("")}</section>`).join("");
}
function block(b) {
  if (b.t === "p") return `<p>${inline(b.x)}</p>`;
  if (b.t === "ul") return `<ul>${b.items.map((i) => `<li>${inline(i)}</li>`).join("")}</ul>`;
  if (b.t === "eq") return `<div class="co-eq">${b.rows.map(([x, n]) => `<div><code>${inline(x)}</code>${n ? `<span>${inline(n)}</span>` : ""}</div>`).join("")}</div>`;
  if (b.t === "ex") return `<div class="co-ex"><b>Worked example</b><p>${inline(b.x)}</p>${b.steps.length ? `<ol>${b.steps.map((s) => `<li>${inline(s)}</li>`).join("")}</ol>` : ""}</div>`;
  if (b.t === "key") return `<p class="mv-key">${inline(b.x)}</p>`;
  if (b.t === "pit") return `<div class="mv-clin co-pit"><b>Common mistake</b>${inline(b.x)}</div>`;
  return "";
}
// the lesson as plain text, for saving to the learner's documents
export function lessonText(L) {
  const out = [L.title, "", L.lead, ""];
  for (const b of L.blocks) {
    if (b.t === "h") out.push("", b.x.toUpperCase());
    else if (b.t === "ul") out.push(...b.items.map((i) => `• ${i}`));
    else if (b.t === "eq") out.push(...b.rows.map(([x, n]) => `${x}${n ? `  (${n})` : ""}`));
    else if (b.t === "ex") out.push(`Example: ${b.x}`, ...b.steps.map((s, i) => `  ${i + 1}. ${s}`));
    else if (b.t === "pit") out.push(`Mistake to avoid: ${b.x}`);
    else out.push(b.x);
  }
  return out.join("\n").replace(/\*\*|`|\^\{|_\{|\}/g, "");
}
