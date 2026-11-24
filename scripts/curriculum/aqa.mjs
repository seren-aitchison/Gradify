// AQA science specifications (GCSE Biology 8461 and the same layout family): every assessable statement, from the
// official PDF's layout. Pure, so tests can feed it a synthetic layout.
//
// AQA numbers its subject content to four levels ("4.1.1.2 Animal and plant cells") and writes each section as a
// two-column table: the content on the left, "Key opportunities for skills development" (MS, WS, AT codes) on the
// right. Within a section, each content paragraph is a separate assessable point, so each becomes a statement:
//
//   ref        the AQA section number plus a letter Gradify assigns in document order: "4.1.1.2.a", "4.1.1.2.b".
//              The letters are Gradify's, not AQA's: cite AQA by its section number ("AQA 8461 4.1.1.2").
//   section    the AQA section number and title, and its parents (topic)
//   kind       "content" (what students should know), "skill" ("Students should be able to …") or "practical"
//              (a required practical activity, ref "4.1.1.2.RP1")
//   higherTier true when AQA marks it (HT only), on the statement or on its section
//   biologyOnly true when AQA marks it (biology only): not in Combined Science: Trilogy
//   scope      AQA's limits on the statement ("Limited to …", "Students are not expected to …"): not statements
//              themselves, so they're kept with the statement they limit
//   skills     the MS / WS / AT codes beside it
//   page       the page in the PDF file (as a PDF viewer numbers it)
//
// The subject content runs from 4.1 to 4.7. 4.8 "Key ideas" restates themes that run through it and isn't assessed
// as separate content; the working scientifically, maths and practical skills sections (5 onwards) are cross-cutting
// skills, assessed through the content, so they're not mapped to lessons here.

const HEAD = /^(4(?:\.\d+){1,3})\s+(.+)$/;
const COLUMN = 410;                 // the skills column usually starts at x≈417; each table's header says where exactly
const MARGIN = 46;                  // headings and required practicals sit at x≈43, table content at x≈48
const SCOPE = /^(Limited to|This is limited to|Knowledge (and understanding )?(of|is)\b.*\b(not required|restricted to|limited to)|.*\b(is|are) not required\.?$|Students (are not|do not need|will not be) (expected|required|need)|Students should not|No (knowledge|details?) of)/i;
const flags = (t) => ({ ...(/\(HT only\)/.test(t) ? { higherTier: true } : {}), ...(/\(biology only\)/i.test(t) ? { biologyOnly: true } : {}) });
// "C 6 H 12 O 6" → "C6H12O6": pdftotext sets subscripts apart
const formulae = (t) => t.replace(/\b((?:[A-Z][a-z]?\d*)*[A-Z][a-z]?) (\d{1,2})(?=[\s,.;)]|$)/g, "$1$2").replace(/\b((?:[A-Z][a-z]?\d+)+) (?=(?:[A-Z][a-z]?\d+)+\b)/g, "$1").replace(/\b((?:[A-Z][a-z]?\d+)+) (?=(?:[A-Z][a-z]?\d+)+\b)/g, "$1").replace(/\b([A-Z][a-z]?\d+) ([A-Z])(?=[\s,.;)]|$)/g, "$1$2").replace(/(\d) (st|nd|rd|th)\b/g, "$1$2").replace(/ ,/g, ",").replace(/ \./g, ".");
const clean = (t) => formulae(t.replace(/\(HT only\)\s*/g, "").replace(/\(biology only\)\s*/gi, "").replace(/\s+/g, " ").trim());
const tidy = (lines) => lines.join("\n").replace(/•\s*•\s*/g, "• ").replace(/-\n(?=[a-z])/g, "-").replace(/\n•/g, " •").replace(/\n/g, " ").replace(/\s+/g, " ").trim();
const letter = (i) => (i < 26 ? String.fromCharCode(97 + i) : letter(Math.floor(i / 26) - 1) + String.fromCharCode(97 + (i % 26)));
const ends = (t) => /[.?!)]$|\.”$|\.’$/.test(t);

/** a block split at "(HT only)" and "Students should be able to" lines, which AQA uses to open a new point */
function paragraphs(lines) {
  const out = [];
  for (const l of lines) {
    const opens = /^\(HT only\)/.test(l) || /^Students should (be able to|understand|know|appreciate|recall)/.test(l);
    if (!out.length || (opens && ends(out.at(-1).at(-1)))) out.push([l]); else out.at(-1).push(l);
  }
  return out;
}

/**
 * Statements from AQA layout pages: { sections: [{ ref, title, page, ...flags }], statements: [...] }.
 * `from`/`to` bound the subject content (the contents pages repeat the headings with page numbers).
 */
export function extractAqa(pages, { first = "4.1", stop = /^4\.8\s|^5\s+Scheme/ } = {}) {
  const sections = [], statements = [], byRef = new Map();
  let dropped = null, on = false, sec = null, last = null, practical = null, practicals = 0, col = COLUMN;
  const secFlags = (ref) => { const f = {}; for (const s of sections) if (ref === s.ref || ref.startsWith(`${s.ref}.`)) Object.assign(f, s.flags); return f; };
  const add = (st) => { statements.push(st); last = st; };

  for (const pg of pages) {
    const body = pg.blocks.filter((b) => b.y > 60 && b.y < pg.height - 50);   // drop the running header and footer
    for (const [bi, b] of body.entries()) {
      // a top-level heading is laid out as two blocks on one line: "4.1" and "Cell biology"
      if (b.x < MARGIN && b.lines.length === 1 && /^\d+(\.\d+)?$/.test(b.lines[0])) {
        const title = body.find((o, j) => j !== bi && Math.abs(o.y - b.y) < 3 && o.x > b.x)?.lines[0] || "";
        if (title) { b.lines = [`${b.lines[0]} ${title}`]; for (const o of body) if (o !== b && Math.abs(o.y - b.y) < 3 && o.lines[0] === title) o.lines = []; }
      }
      if (!b.lines.length || !b.lines[0]) continue;
      const head = b.lines.map((l) => l.match(HEAD));
      if (b.x < MARGIN && stop.test(b.lines[0])) { on = false; continue; }
      if (b.x < MARGIN && head[0]) {
        if (stop.test(b.lines[0])) { on = false; continue; }
        if (!on && head[0][1] === first && !/\s\d+$/.test(b.lines[0])) on = true;
        if (!on) continue;
        // a heading block may hold "4.1.1 Cell structure" and "4.1.1.1 Eukaryotes …" one after the other
        for (let i = 0; i < b.lines.length; i++) {
          const m = head[i]; if (!m) { if (sec && sec.page === pg.page) sec.title = `${sec.title} ${clean(b.lines[i])}`; continue; }
          sec = { ref: m[1], title: clean(m[2]), page: pg.page, flags: flags(m[2]) };
          sections.push(sec); byRef.set(sec.ref, sec); last = null; practical = null;
        }
        continue;
      }
      if (!on || !sec) continue;
      if (stop.test(b.lines[0])) { on = false; continue; }
      const text = tidy(b.lines);
      if (/^Key opportunities for/.test(text)) { col = b.x - 4; continue; }   // this table's skills column
      if (/^Content$/.test(text)) continue;

      if (b.x < MARGIN) {   // margin text inside a section: required practicals, or a section's introduction
        const rp = text.match(/^Required practical activity (\d+):\s*(.+)$/);
        if (rp) { practicals = +rp[1]; practical = { ref: `${sec.ref}.RP${rp[1]}`, section: sec.ref, kind: "practical", text: rp[2], page: pg.page, skills: [], ...secFlags(sec.ref) }; add(practical); continue; }
        if (practical && /^AT skills covered/.test(text)) { practical.skills.push(...(text.match(/\d+/g) || []).map((n) => `AT ${n}`)); continue; }
        if (practical && /^(This practical activity also provides|There are links with this practical)/.test(text)) { if (/^There are links/.test(text)) practical.links = text; continue; }
        if (practical && !ends(practical.text)) { practical.text = `${practical.text} ${text}`; continue; }
        if (practical) { practical.text = `${practical.text} ${clean(text)}`; continue; }   // what the practical must include
        (dropped ||= []).push({ section: sec.ref, page: pg.page, text });
        continue;   // a section introduction ("Cells are the basic unit of all forms of life …"): context, not a statement
      }
      practical = null;

      if (b.x >= col) {  // skills opportunities: attach codes to the statement they sit beside
        const near = [...statements].reverse().find((s) => s.page === pg.page && s.section === sec.ref && s._y !== undefined && Math.abs(s._y - b.y) < 6) || last;
        const codes = text.match(/\b(MS|WS|AT)\s+\d+[a-z]?(?:\.\d+)?(?:\s*,\s*\d+[a-z]?(?:\.\d+)?)*/g) || [];
        if (near) for (const c of codes) { const [k, rest] = [c.slice(0, 2), c.slice(2)]; for (const n of rest.split(",")) near.skills.push(`${k} ${n.trim()}`); }
        continue;
      }

      for (const para of paragraphs(b.lines)) {
        const raw = tidy(para), t = clean(raw);
        if (!t) continue;
        if (/^This section assumes/.test(t)) { sec.assumes = t; continue; }   // prior knowledge, not a statement
        if (/^All of these aspects are covered in more detail/.test(t)) { sec.note = t; continue; }   // a cross-reference
        // a scope limit belongs to the statement before it
        if (SCOPE.test(t) && last && last.section === sec.ref) { (last.scope ||= []).push(t); continue; }
        // a continuation: the previous statement hadn't finished (a page break, a list, a formula laid out on lines)
        if (last && last.section === sec.ref && last.kind !== "practical" && (!ends(last.text) || /^[a-z•(=]/.test(t))) { last.text = `${last.text} ${t}`; Object.assign(last, flags(raw)); continue; }
        add({ ref: null, section: sec.ref, kind: /^Students should/.test(t) || /^They should be able/.test(t) ? "skill" : "content", text: t, page: pg.page, skills: [], ...secFlags(sec.ref), ...flags(raw), _y: b.y });
      }
    }
  }

  // letters in document order within each section; required practicals keep their AQA number
  const n = new Map();
  for (const s of statements) {
    if (s.kind !== "practical") { const i = n.get(s.section) || 0; n.set(s.section, i + 1); s.ref = `${s.section}.${letter(i)}`; }
    delete s._y;
    s.skills = [...new Set(s.skills)];
    const parts = s.section.split("."); s.topic = parts.map((_, i) => parts.slice(0, i + 1).join(".")).slice(1);
    s.title = byRef.get(s.section)?.title || "";
  }
  // a formula or equation is laid out on several lines in the PDF, so its text here loses the layout
  for (const s of statements) if (/(formula|equation):/.test(s.text)) s.check = "contains a formula or equation set out over lines in the PDF: read it there";
  return { sections: sections.map(({ flags: f, ...s }) => ({ ...s, ...f })), statements, practicals, introductions: dropped || [] };
}
