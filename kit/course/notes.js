// Course notes: a compact text format, one file per unit, parsed into lessons and drawn as the
// notes page under each lesson. Each lesson starts with "## Title"; inside it, each line starts with:
//   S: the lead (what this lesson is about, in a sentence or two)
//   H: a heading, which starts a new section
//   P: a paragraph (a line with no prefix is a paragraph too)
//   - a bullet point
//   E: an equation, optionally "equation :: what it means"
//   X: a worked example; following "> " lines are its steps (on the page they're revealed one at a time; the last is
//      the answer)
//   DEEP: more for whoever wants it, folded under "Show more": "label | text", where the label says what it is
//      ("Derivation", "Deeper theory", "Another example", "Exam detail"). Following "> " lines are more paragraphs
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
//   EV: how well supported a claim is, "established | claim", "contested | claim" or "hypothetical | claim",
//       listed at the end under "How strong is the evidence?" (optional; used by the social sciences)
//   LV: the lesson's level and difficulty, shown as a chip under the title, e.g. "Introductory · Foundation"
//   CASE: a case card, "case name and citation | facts | held | principle": shown under "Case and statute
//        cards" and turned into two flashcards (the case → facts, held and principle; the principle → the case)
//   LAW: a statute card, "provision | what it provides (elements)": shown with the case cards, one flashcard
//   REQ: an official requirement this lesson teaches, "<framework>:<ref> @<objective numbers>", e.g.
//        "aqa-gcse-biology:4.1.1.1.b @1,2". One lesson may carry several boards' equivalent requirements.
//   DIA: a new diagram for the engine to render and check, "<renderer> | <json spec>" (kit/diagrams/renderers.js);
//        it becomes a D: line once built into the library
//   DNEED: a diagram the lesson needs and no renderer can draw yet (for the diagram queue)
//   GAP: something a requirement needs that the research brief didn't support (for the research queue)
//   TIER: how the lesson was checked, shown to learners as a label: "AI-checked" (written and checked by AI against
//        cited sources, not yet reviewed by a person) or "Expert-reviewed" (approved by a named subject expert)
//   DRUG: a drug card, "drug or class | class and mechanism | main uses | key adverse effects and cautions |
//        monitoring, interactions and counselling": shown with the cards and turned into two flashcards
// Inline: **bold**, *italic*, `code`, x^{2} and v_{0}.
export { esc, inline, norm } from "../core/text.js";
import { esc, inline } from "../core/text.js";
import { parseQuestion } from "../assess/questions.js";
import { TAG_LINE } from "../assess/model.js";

export function parseNotes(text) {
  const lessons = [];
  let L = null, ex = null;
  for (const raw of String(text || "").split("\n")) {
    const line = raw.trim();
    if (!line) { ex = null; continue; }
    if (line.startsWith("## ")) { L = { title: line.slice(3).trim(), lead: "", blocks: [], cards: [], mcq: [], tasks: [], objectives: [], prereq: [], terms: [], summary: [], sources: [], reading: [], evidence: [], authorities: [], level: "", reqs: [], needs: [], gaps: [], tier: "" }; lessons.push(L); ex = null; continue; }
    if (!L) continue;
    if (line.startsWith("> ") && ex) { (ex.steps || ex.more).push(line.slice(2)); continue; }
    ex = null;
    // block tags, then question tags (TAG_LINE, which includes any type a subject adapter has registered)
    const m = line.match(/^(S|H|P|E|X|K|!|Q|O|PRE|T|SUM|SAFE|SRC|READ|IX|D|EV|LV|CASE|LAW|DRUG|REQ|DIA|DNEED|GAP|TIER|DEEP):\s*(.*)$/) || line.match(TAG_LINE);
    const [tag, body] = m ? [m[1], m[2]] : line.startsWith("- ") ? ["-", line.slice(2)] : ["P", line];
    const last = L.blocks.at(-1);
    if (tag === "S") L.lead += (L.lead ? " " : "") + body;
    else if (tag === "H") L.blocks.push({ t: "h", x: body });
    else if (tag === "P") L.blocks.push({ t: "p", x: body });
    else if (tag === "-") { if (last?.t === "ul") last.items.push(body); else L.blocks.push({ t: "ul", items: [body] }); }
    else if (tag === "E") { const [x, note] = body.split(" :: "); if (last?.t === "eq") last.rows.push([x, note]); else L.blocks.push({ t: "eq", rows: [[x, note]] }); }
    else if (tag === "X") { ex = { t: "ex", x: body, steps: [] }; L.blocks.push(ex); }
    else if (tag === "K") L.blocks.push({ t: "key", x: body });
    else if (tag === "DEEP") { const i = body.indexOf(" | "); ex = { t: "deep", label: i > 0 ? body.slice(0, i).trim() : "More on this", x: i > 0 ? body.slice(i + 3).trim() : body.trim(), more: [] }; L.blocks.push(ex); }
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
    // a checked teaching diagram from the Visual Learning Engine (kit/diagrams/visual.js, docs/VISUAL-LEARNING-ENGINE.md)
    else if (tag === "D") L.blocks.push({ t: "dg", id: body.trim() });
    else if (tag === "EV") { const [status, claim] = body.split(" | ").map((x) => x.trim()); if (status && claim) L.evidence.push({ status: status.toLowerCase(), claim }); }
    else if (tag === "LV") L.level = body.trim();
    else if (tag === "REQ") { const m = body.trim().match(/^(\S+)(?:\s+@([\d,\s]+))?\s*$/); if (m) L.reqs.push({ id: m[1], objectives: m[2] ? m[2].split(",").map((x) => Number(x.trim())).filter(Boolean) : [] }); }
    else if (tag === "DIA") { const i = body.indexOf(" | "), renderer = (i < 0 ? body : body.slice(0, i)).trim(); let spec = null; try { spec = JSON.parse(body.slice(i + 3)); } catch {} L.blocks.push({ t: "dia", renderer, spec }); }
    else if (tag === "DNEED") L.needs.push(body.trim());
    else if (tag === "GAP") L.gaps.push(body.trim());
    else if (tag === "TIER") L.tier = body.trim();
    else if (tag === "CASE") {
      const [name, facts, held, principle] = body.split(" | ").map((x) => x.trim());
      if (name && facts && held && principle) {
        L.authorities.push({ kind: "case", name, facts, held, principle });
        L.cards.push([`Case card: ${name}. Facts, decision and principle?`, `**Facts:** ${facts} **Held:** ${held} **Principle:** ${principle}`]);
        L.cards.push([`Which case is authority for this? ${principle}`, name]);
      }
    }
    else if (tag === "DRUG") {
      const [name, mechanism, uses, adverse, monitoring] = body.split(" | ").map((x) => x.trim());
      if (name && mechanism && uses && adverse && monitoring) {
        L.authorities.push({ kind: "drug", name, mechanism, uses, adverse, monitoring });
        L.cards.push([`Drug card: ${name}. Class, mechanism and main uses?`, `**Class and mechanism:** ${mechanism} **Uses:** ${uses}`]);
        L.cards.push([`Drug card: ${name}. Key adverse effects, cautions and monitoring?`, `**Adverse effects and cautions:** ${adverse} **Monitoring and counselling:** ${monitoring}`]);
      }
    }
    else if (tag === "LAW") {
      const [name, provides] = body.split(" | ").map((x) => x.trim());
      if (name && provides) { L.authorities.push({ kind: "law", name, provides }); L.cards.push([`Statute card: what does ${name} provide?`, provides]); }
    }
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
// `after(i)`: anything to place after block i (the lesson's glass diagrams, kit/core/glass-diagrams.js)
export function lessonHtml(L, { after = () => "" } = {}) {
  const sections = [];
  let cur = { h: null, parts: [] };
  L.blocks.forEach((b, i) => {
    if (b.t === "h") { if (cur.h || cur.parts.length) sections.push(cur); cur = { h: b.x, parts: [] }; return; }
    cur.parts.push(block(b) + after(i));
  });
  if (cur.h || cur.parts.length) sections.push(cur);
  // each headed section has an id, so a lesson can list its sections ("On this page") and link to them
  let n = 0;
  return sections.map((s) => `<section${s.h ? ` id="co-s${++n}"` : ""}>${s.h ? `<h3>${inline(s.h)}</h3>` : ""}${s.parts.join("")}</section>`).join("");
}
// callout icons (inline so this file stays dependency-free and testable in Node)
const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const LX = {
  ex: svg('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>'),
  pit: svg('<path d="M12 3.5 21 19H3z"/><path d="M12 10v4M12 16.8v.2"/>'),
  key: svg('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>'),
  safe: svg('<path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6z"/><path d="m9 12 2 2 4-4"/>'),
  eq: svg('<path d="M5 9h14M5 15h14"/>'),
};
const head = (k, label) => `<div class="lx-h"><span class="lx-ic">${LX[k]}</span><b>${label}</b></div>`;
function block(b) {
  if (b.t === "p") return `<p>${inline(b.x)}</p>`;
  if (b.t === "ul") return `<ul>${b.items.map((i) => `<li>${inline(i)}</li>`).join("")}</ul>`;
  if (b.t === "eq") return `<div class="co-eq lx-call lx-eq">${b.rows.map(([x, n]) => `<div><code>${inline(x)}</code>${n ? `<span>${inline(n)}</span>` : ""}</div>`).join("")}</div>`;
  if (b.t === "deep") return `<details class="co-deep gx-more"><summary><span class="gx-more-l">Show more</span><b>${inline(b.label)}</b></summary><div class="co-deepb">${[b.x, ...b.more].map((x) => `<p>${inline(x)}</p>`).join("")}</div></details>`;
  if (b.t === "ex") return `<div class="co-ex lx-call lx-ex" data-steps>${head("ex", "Worked example")}<div class="lx-b"><p>${inline(b.x)}</p>${b.steps.length ? `<ol>${b.steps.map((s) => `<li>${inline(s)}</li>`).join("")}</ol>` : ""}</div></div>`;
  if (b.t === "key") return `<div class="mv-key lx-call lx-key">${head("key", "Key idea")}<p class="lx-b">${inline(b.x)}</p></div>`;
  if (b.t === "safe") return `<div class="co-safe lx-call lx-safe">${head("safe", "Competence and safety")}<div class="lx-b">${inline(b.x)}</div></div>`;
  if (b.t === "pit") return `<div class="mv-clin co-pit lx-call lx-pit">${head("pit", "Common mistake")}<div class="lx-b">${inline(b.x)}</div></div>`;
  if (b.t === "ix") return `<div class="co-ixslot" data-ix="${esc(b.id)}"></div>`;
  if (b.t === "dg") return `<figure class="vx" data-dg="${esc(b.id)}" hidden></figure>`;
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
    else if (b.t === "deep") out.push(`${b.label}: ${b.x}`, ...b.more);
    else if (b.t === "ix" || b.t === "dg" || b.t === "dia") continue;
    else out.push(b.x);
  }
  return out.join("\n").replace(/\*\*|`|\^\{|_\{|\}/g, "");
}

// the lesson's framing (objectives, prerequisites), its recap (summary, key terms, case, statute and drug cards,
// the strength of the evidence) and its references (sources with their kind and date, further reading)
// case and statute cards (CASE: and LAW: lines), in a lesson and in the course's authorities view
export function authorityCards(list) {
  return `<div class="co-auths">${list.map((a) => a.kind === "drug"
    ? `<article class="co-auth"><span class="co-auth-k">Drug</span><h4>${inline(a.name)}</h4><dl><dt>Class</dt><dd>${inline(a.mechanism)}</dd><dt>Uses</dt><dd>${inline(a.uses)}</dd><dt>Cautions</dt><dd>${inline(a.adverse)}</dd><dt>Monitor</dt><dd>${inline(a.monitoring)}</dd></dl></article>`
    : a.kind === "case"
    ? `<article class="co-auth"><span class="co-auth-k">Case</span><h4>${inline(a.name)}</h4><dl><dt>Facts</dt><dd>${inline(a.facts)}</dd><dt>Held</dt><dd>${inline(a.held)}</dd><dt>Principle</dt><dd>${inline(a.principle)}</dd></dl></article>`
    : `<article class="co-auth"><span class="co-auth-k">Statute</span><h4>${inline(a.name)}</h4><p>${inline(a.provides)}</p></article>`).join("")}</div>`;
}

export const TIERS = {
  "AI-checked": "Written and checked by AI against cited sources. A subject expert hasn't reviewed it yet.",
  "Expert-reviewed": "Reviewed and approved by a subject expert.",
};
export function lessonFrame(L) {
  const tier = L.tier && TIERS[L.tier] ? `<p class="co-tier co-tier-${L.tier === "Expert-reviewed" ? "expert" : "ai"}"><b>${esc(L.tier)}</b> <span>${esc(TIERS[L.tier])}</span></p>` : "";
  const top = tier + ((L.objectives.length || L.prereq.length) ? `<div class="co-frame">${L.objectives.length ? `<section><h3>By the end of this lesson you can</h3><ul>${L.objectives.map((o) => `<li>${inline(o)}</li>`).join("")}</ul></section>` : ""}${L.prereq.length ? `<section><h3>Before you start</h3><ul>${L.prereq.map((o) => `<li>${inline(o)}</li>`).join("")}</ul></section>` : ""}</div>` : "");
  const KIND = { legislation: "Legislation", case: "Case law", rule: "Professional rules", guidance: "Guidance", standard: "Standard", primary: "Primary source", secondary: "Secondary source", data: "Data source" };
  const EVN = { established: "Established", contested: "Contested", hypothetical: "Hypothetical" };
  // the recap: what to take away from the lesson
  const end = [
    L.summary.length ? `<section><h3>Summary</h3><ul>${L.summary.map((x) => `<li>${inline(x)}</li>`).join("")}</ul></section>` : "",
    L.terms.length ? `<section><h3>Key terms</h3><dl class="co-terms">${L.terms.map(([t, d]) => `<dt>${inline(t)}</dt><dd>${inline(d)}</dd>`).join("")}</dl></section>` : "",
    L.authorities?.length ? `<section><h3>${L.authorities.every((a) => a.kind === "drug") ? "Drug cards" : L.authorities.some((a) => a.kind === "drug") ? "Drug, case and statute cards" : "Case and statute cards"}</h3>${authorityCards(L.authorities)}</section>` : "",
    L.evidence?.length ? `<section><h3>How strong is the evidence?</h3><ul class="co-evidence">${L.evidence.map((e) => `<li><span class="co-ev co-ev-${esc(e.status)}">${esc(EVN[e.status] || e.status)}</span> ${inline(e.claim)}</li>`).join("")}</ul></section>` : "",
  ].join("");
  // the references: where it comes from, and where to read more
  const refs = [
    L.sources.length ? `<section><h3>Sources</h3><ul class="co-sources">${L.sources.map((x) => `<li>${x.url && /^https:\/\//.test(x.url) ? `<a href="${esc(x.url)}" rel="noopener" target="_blank">${inline(x.cite)}</a>` : inline(x.cite)}${x.kind ? ` <small>${esc(KIND[x.kind] || x.kind)}${x.date ? ` · ${esc(x.date)}` : ""}</small>` : ""}</li>`).join("")}</ul></section>` : "",
    L.reading.length ? `<section><h3>Further reading</h3><ul>${L.reading.map((x) => `<li>${inline(x)}</li>`).join("")}</ul></section>` : "",
  ].join("");
  return { top, end: end ? `<div class="co-frame co-end">${end}</div>` : "", refs: refs ? `<div class="co-frame co-refs">${refs}</div>` : "" };
}
