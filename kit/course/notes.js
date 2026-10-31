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
//   TF: MS: SEQ: MATCH: SA: NUM: further question types (true or false, multi-select, ordering, matching,
//      short answer, numerical calculation). Any question tag may carry a permanent id and objectives: M2#law-u03-05-q2@1:
//      see kit/assess/model.js
// Lesson metadata (optional for older lessons; expected in new ones, see docs/CURRICULUM_CONTENT_STANDARD.md):
//   O: a learning objective ("By the end of this lesson you can…")
//   PRE: prerequisite knowledge, ideally a lesson title from the same course
//   T: a key term, "term | definition"
//   SUM: a summary point
//   SAFE: a competence or safety statement, boxed (clinical skills: what this lesson does not authorise)
//   SRC: a source, "citation | kind | date | link" where kind is legislation, case, rule, guidance,
//        standard, primary or secondary, and date is the version or the date checked (YYYY-MM or YYYY-MM-DD)
//   READ: further reading
//   IX: the id of one of the course's interactives (config.interactives), embedded at this point in the notes
// Inline: **bold**, *italic*, `code`, x^{2} and v_{0}.
export { esc, inline, norm } from "../core/text.js";
import { esc, inline } from "../core/text.js";
import { parseQuestion } from "../assess/questions.js";

export function parseNotes(text) {
  const lessons = [];
  let L = null, ex = null;
  for (const raw of String(text || "").split("\n")) {
    const line = raw.trim();
    if (!line) { ex = null; continue; }
    if (line.startsWith("## ")) { L = { title: line.slice(3).trim(), lead: "", blocks: [], cards: [], mcq: [], tasks: [], objectives: [], prereq: [], terms: [], summary: [], sources: [], reading: [] }; lessons.push(L); ex = null; continue; }
    if (!L) continue;
    if (line.startsWith("> ") && ex) { ex.steps.push(line.slice(2)); continue; }
    ex = null;
    const m = line.match(/^(S|H|P|E|X|K|!|Q|O|PRE|T|SUM|SAFE|SRC|READ|IX|(?:M|TF|MS|SEQ|MATCH|SA|NUM)[123]?(?:#[a-z0-9-]+)?(?:@[\d,]+)?):\s*(.*)$/);
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
    else if (tag === "O") L.objectives.push(body);
    else if (tag === "PRE") L.prereq.push(body);
    else if (tag === "T") { const [t, d] = body.split(" | "); if (t && d) L.terms.push([t.trim(), d.trim()]); }
    else if (tag === "SUM") L.summary.push(body);
    else if (tag === "SAFE") L.blocks.push({ t: "safe", x: body });
    else if (tag === "SRC") { const [cite, kind = "", date = "", url = ""] = body.split(" | ").map((x) => x.trim()); if (cite) L.sources.push({ cite, kind, date, url }); }
    else if (tag === "READ") L.reading.push(body);
    else if (tag === "IX") L.blocks.push({ t: "ix", id: body.trim() });
    else {
      const Q = parseQuestion(tag, body);
      // single-choice questions keep the original { q, right, wrong, why, d } view (used by older code and
      // the physics course) alongside the full question in Q
      if (Q && (Q.type === "sba" || Q.type === "mcq")) L.mcq.push({ q: Q.q, right: Q.options.find((o) => o.correct).text, wrong: Q.options.filter((o) => !o.correct).map((o) => o.text), why: Q.why, d: Q.d, id: Q.id, Q });
      else if (Q) L.tasks.push(Q);
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
  if (b.t === "safe") return `<div class="co-safe"><b>Competence and safety</b>${inline(b.x)}</div>`;
  if (b.t === "pit") return `<div class="mv-clin co-pit"><b>Common mistake</b>${inline(b.x)}</div>`;
  if (b.t === "ix") return `<div class="co-ixslot" data-ix="${esc(b.id)}"></div>`;
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
    else if (b.t === "ix") continue;
    else out.push(b.x);
  }
  return out.join("\n").replace(/\*\*|`|\^\{|_\{|\}/g, "");
}

// the lesson's framing (objectives, prerequisites) and its closing material (summary, key terms,
// sources with their kind and date, further reading), drawn around the notes
export function lessonFrame(L) {
  const top = (L.objectives.length || L.prereq.length) ? `<div class="co-frame">${L.objectives.length ? `<section><h3>By the end of this lesson you can</h3><ul>${L.objectives.map((o) => `<li>${inline(o)}</li>`).join("")}</ul></section>` : ""}${L.prereq.length ? `<section><h3>Before you start</h3><ul>${L.prereq.map((o) => `<li>${inline(o)}</li>`).join("")}</ul></section>` : ""}</div>` : "";
  const KIND = { legislation: "Legislation", case: "Case law", rule: "Professional rules", guidance: "Guidance", standard: "Standard", primary: "Primary source", secondary: "Secondary source" };
  const end = [
    L.summary.length ? `<section><h3>Summary</h3><ul>${L.summary.map((x) => `<li>${inline(x)}</li>`).join("")}</ul></section>` : "",
    L.terms.length ? `<section><h3>Key terms</h3><dl class="co-terms">${L.terms.map(([t, d]) => `<dt>${inline(t)}</dt><dd>${inline(d)}</dd>`).join("")}</dl></section>` : "",
    L.sources.length ? `<section><h3>Sources</h3><ul class="co-sources">${L.sources.map((x) => `<li>${x.url && /^https:\/\//.test(x.url) ? `<a href="${esc(x.url)}" rel="noopener" target="_blank">${inline(x.cite)}</a>` : inline(x.cite)}${x.kind ? ` <small>${esc(KIND[x.kind] || x.kind)}${x.date ? ` · ${esc(x.date)}` : ""}</small>` : ""}</li>`).join("")}</ul></section>` : "",
    L.reading.length ? `<section><h3>Further reading</h3><ul>${L.reading.map((x) => `<li>${inline(x)}</li>`).join("")}</ul></section>` : "",
  ].join("");
  return { top, end: end ? `<div class="co-frame co-end">${end}</div>` : "" };
}
