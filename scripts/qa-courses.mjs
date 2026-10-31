// Curriculum quality checks for the LawGradify and NurseGradify courses.
//   npm run qa            check every written school, write docs/CURRICULUM_PROGRESS.md and the
//                         citation registers in docs/qa/, exit 1 if any hard check fails
// Hard checks (a school can't count as "technically tested" while any fail): every planned lesson has
// notes and nothing extra; lead, sections, key point, cards and check questions present; every check
// question explained and with enough options; no duplicate questions; no answer leaked into its question.
// Warnings are reported for review (they need a human or AI reviewer's judgement, not a rule).
// The stages after "tested" come from kit/courses/<slug>/qa.js and are never set by this script.
import { writeFile, mkdir } from "node:fs/promises";
import { parseNotes, norm } from "../kit/course/notes.js";

const COURSES = [
  { slug: "law", name: "LawGradify", expert: "a practising solicitor or barrister",
    // SQE1 questions are single best answer from five options
    minWrong: 4, rules: lawRules },
  { slug: "nursing", name: "NurseGradify", expert: "a registered nurse educator", minWrong: 3, rules: nursingRules },
];

// ---------- subject rules: warnings, not hard failures ----------
const CONDITION_HEADINGS = ["definition", "epidemiology", "aetiology", "pathophysiology", "signs", "investigations", "treatment", "nursing assessment", "nursing management", "monitoring", "complications", "education", "escalation"];
const OVERVIEW_LESSONS = new Set(["introduction to disease processes", "inflammation", "infection", "immune dysfunction", "respiratory disease", "renal disease", "gastrointestinal disorders", "neurological disorders", "haematological disorders", "musculoskeletal disease", "rheumatological conditions", "skin conditions", "multimorbidity", "frailty", "palliative and end of life conditions", "cardiovascular disease"]);
function nursingRules(unit, L, text) {
  const w = [];
  const lower = text.toLowerCase();
  // School 5: each named condition covers the brief's thirteen headings
  if (unit.n === 5 && !OVERVIEW_LESSONS.has(norm(L.title))) {
    const heads = L.blocks.filter((b) => b.t === "h").map((b) => b.x.toLowerCase()).join(" | ");
    // a heading counts if its words appear in a heading ("Nursing assessment, management and monitoring" covers "nursing management")
    const missing = CONDITION_HEADINGS.filter((h) => !h.split(" ").every((w) => heads.includes(w)) && !lower.includes(h));
    if (missing.length) w.push(`condition lesson missing heading(s): ${missing.join(", ")}`);
  }
  // clinical schools: an escalation or safety line in every lesson
  if ([3, 4, 5].includes(unit.n) && !/escalat|call for (urgent |emergency )?help|emergency|local polic|supervision|query|prescriber|pharmacist|report|inform the|withhold|\bbnf\b|refer/.test(lower)) w.push("no escalation, safety or local-policy statement");
  // medicines: any worked calculation must say it's illustrative
  if (unit.n === 4 && L.blocks.some((b) => b.t === "ex") && !/illustrative/.test(lower)) w.push("worked calculation not labelled illustrative");
  return w;
}
function lawRules(unit, L, text) {
  const w = [];
  // single best answer: every check question should have five options
  for (const m of L.mcq) if (m.wrong.length < 4) w.push(`not five-option SBA: "${m.q.slice(0, 60)}…"`);
  // core legal content should be anchored in authority
  if (![18, 19].includes(unit.n) && !/\[\d{4}\]|\(\d{4}\)|Act \d{4}|Regulations \d{4}|\bCPR\b|\bSRA\b|Code/.test(text)) w.push("no case, statute or rule cited");
  return w;
}

// ---------- helpers ----------
const lessonText = (L) => [L.title, L.lead, ...L.blocks.flatMap((b) => b.x ? [b.x] : b.items || (b.rows || []).flat() || []), ...L.blocks.flatMap((b) => b.steps || [])].join("\n");
const CITE = [
  ["case", /\b(?:R \(([^)]+)\) v [A-Z][\w'&.\- ]{1,60}?|[A-Z][\w'&.\-]*(?: [A-Z][\w'&.\-]*){0,5} v [A-Z][\w'&.\-]*(?: (?:of |and |[A-Z][\w'&.\-]*)){0,6})(?=\s*[\[(]\d{4}[\])])\s*[\[(]\d{4}[\])](?:\s*\d*\s*(?:UKSC|UKHL|EWCA (?:Civ|Crim)|EWHC|AC|QB|KB|Ch|WLR|All ER)\s*\d*(?:\s*\([A-Za-z]+\))?)?/g],
  ["statute", /\b[A-Z][A-Za-z'(),\- ]{2,80}? Act(?: \([A-Za-z ]+\))? \d{4}\b/g],
  ["regulations", /\b[A-Z][A-Za-z'(),\- ]{2,80}? (?:Regulations|Order|Rules)(?: \([A-Za-z ]+\))? \d{4}\b/g],
  ["guidance", /\b(?:NICE (?:NG|CG|QS)\d+|NG\d{1,3}|CG\d{1,3}|BTS|SIGN|RCUK|Resuscitation Council UK|MHRA|NEWS2|NMC Code|SRA (?:Principles|Code[s]?(?: of Conduct)?|Accounts Rules)|CPR(?: Part)? \d+[A-Z]?(?:\.\d+)?|PD \d+[A-Z]*|Practice Direction \d+[A-Z]*)\b/g],
];
function citations(text) {
  const out = [];
  for (const [kind, re] of CITE) for (const m of text.matchAll(re)) out.push([kind, m[0].trim().replace(/\s+/g, " ").replace(/^(?:(?:In|Briefing|See|Under|Following|After|Before|Since|Applying|Compare|Contrast|And|But|Per|Unlike|As|Both|Whereas|Then|So|Also) )+/, "")]);
  return out;
}

// ---------- run ----------
const today = new Date().toISOString().slice(0, 10);
const report = [], failures = [];
await mkdir(new URL("../docs/qa/", import.meta.url), { recursive: true });

for (const C of COURSES) {
  const course = (await import(`../kit/courses/${C.slug}/course.js`)).default;
  const { QA } = await import(`../kit/courses/${C.slug}/qa.js`);
  const seenQ = new Map(), rows = [], sourceDoc = [`# ${C.name}: citation register`, "", `Generated by \`npm run qa\` on ${today}. Every authority cited in each written school, for checking against primary sources (legislation.gov.uk, the National Archives' Find Case Law, BAILII, the official Law Reports, SRA, NMC, NICE, BNF, RCUK, BTS, MHRA). Record results in \`kit/courses/${C.slug}/qa.js\`.`, ""];
  for (const unit of course.units) {
    const written = course.written.includes(unit.id);
    const row = { unit, written, planned: unit.lessons.length, hard: [], warn: [], stats: null };
    if (written) {
      const parsed = parseNotes(await course.notes(unit.id)), byTitle = new Map(parsed.map((p) => [norm(p.title), p]));
      const missing = unit.lessons.filter((l) => !byTitle.has(norm(l.title)));
      const extra = parsed.filter((p) => !unit.lessons.some((l) => norm(l.title) === norm(p.title)));
      for (const l of missing) row.hard.push(`no notes for "${l.title}"`);
      for (const p of extra) row.hard.push(`notes for "${p.title}", which isn't in the syllabus`);
      let bytes = 0, cards = 0, mcq = 0, longestRight = 0, diff = [0, 0, 0, 0];
      const cites = new Map();
      for (const l of unit.lessons) {
        const L = byTitle.get(norm(l.title)); if (!L) continue;
        const text = lessonText(L); bytes += text.length; cards += L.cards.length; mcq += L.mcq.length;
        const where = `${l.title}`;
        if (L.lead.length <= 60) row.hard.push(`${where}: lead too short`);
        if (L.blocks.filter((b) => b.t === "h").length < 2) row.hard.push(`${where}: fewer than two sections`);
        if (!L.blocks.some((b) => b.t === "key")) row.hard.push(`${where}: no key point`);
        if (L.cards.length < 2) row.hard.push(`${where}: fewer than two flashcards`);
        if (L.mcq.length < 2) row.hard.push(`${where}: fewer than two check questions`);
        if (text.length < 1200) row.warn.push(`${where}: short lesson (${text.length} characters)`);
        for (const m of L.mcq) {
          diff[m.d]++;
          if (m.wrong.length < C.minWrong - 1) row.hard.push(`${where}: "${m.q.slice(0, 50)}…" has too few options`);
          if (m.why.length <= 40) row.hard.push(`${where}: "${m.q.slice(0, 50)}…" explanation too thin`);
          if (m.wrong.includes(m.right) || new Set(m.wrong).size !== m.wrong.length) row.hard.push(`${where}: duplicate option in "${m.q.slice(0, 50)}…"`);
          if (m.right.length > 12 && norm(m.q).includes(norm(m.right))) row.hard.push(`${where}: answer appears in the question "${m.q.slice(0, 50)}…"`);
          const k = norm(m.q); if (seenQ.has(k)) row.hard.push(`${where}: question duplicates one in ${seenQ.get(k)}`); else seenQ.set(k, `${unit.id} ${l.title}`);
          // a classic flaw: the right answer is conspicuously the longest option
          if (m.right.length > 1.6 * Math.max(...m.wrong.map((w) => w.length))) longestRight++;
        }
        row.warn.push(...C.rules(unit, L, text).map((x) => `${where}: ${x}`));
        for (const [kind, c] of citations(text)) { const key = `${kind}|${c}`; if (!cites.has(key)) cites.set(key, new Set()); cites.get(key).add(l.title); }
      }
      if (mcq && longestRight / mcq > 0.25) row.warn.push(`right answer is much the longest option in ${longestRight} of ${mcq} questions (${Math.round((100 * longestRight) / mcq)}%): rewrite distractors so length doesn't give the answer away`);
      if (mcq && diff[3] / mcq < 0.1) row.warn.push(`only ${diff[3]} hard (M3) questions out of ${mcq}`);
      row.stats = { bytes, cards, mcq, diff, cites: cites.size };
      sourceDoc.push(`## School ${unit.n}: ${unit.title}`, "", `${cites.size} distinct citations. Status: ${QA[unit.id]?.sources ? `verified ${QA[unit.id].sources.date}` : "**not yet verified**"}.`, "", "| Kind | Citation | Lessons | Verified |", "|---|---|---|---|",
        ...[...cites].sort().map(([k, ls]) => { const [kind, c] = k.split("|"); return `| ${kind} | ${c.replace(/\|/g, "/")} | ${[...ls].slice(0, 3).join("; ")}${ls.size > 3 ? ` (+${ls.size - 3})` : ""} | |`; }), "");
      if (row.hard.length) failures.push(...row.hard.map((h) => `${C.slug} ${unit.id}: ${h}`));
    }
    rows.push(row);
  }
  await writeFile(new URL(`../docs/qa/${C.slug}-sources.md`, import.meta.url), sourceDoc.join("\n") + "\n");
  report.push({ C, course, QA, rows });
}

// ---------- the progress document ----------
const tick = (b) => (b ? "✅" : "—");
const md = [`# Curriculum progress`, "",
  `Generated by \`npm run qa\` on ${today}. Don't edit by hand: change the notes, \`course.js\` (\`written\`) or \`qa.js\`, then rerun. The process is described in \`docs/CURRICULUM_QA.md\`.`, "",
  "| Stage | Meaning | How it's set |", "|---|---|---|",
  "| Written | Notes exist for every planned lesson in the school | `written` in course.js |",
  "| Technically tested | `npm test` and every hard check in `npm run qa` pass | This script |",
  "| Content reviewed | A structured review against the checklist is recorded, with findings resolved | `reviewed` in qa.js |",
  "| Sources verified | Every cited authority checked against a primary source | `sources` in qa.js |",
  "| Ready for publication | All of the above, plus sign-off by a qualified subject expert | `signoff` in qa.js |", ""];
for (const { C, course, QA, rows } of report) {
  const planned = rows.reduce((a, r) => a + r.planned, 0), written = rows.filter((r) => r.written).reduce((a, r) => a + r.planned, 0);
  md.push(`## ${C.name}`, "", `${written} of ${planned} planned lessons written, in ${rows.filter((r) => r.written).length} of ${rows.length} schools. Ready for publication requires sign-off by ${C.expert}.`, "",
    "| School | Lessons | Written | Technically tested | Content reviewed | Sources verified | Ready | Cards | Questions (easy/med/hard) | Citations | Warnings |", "|---|---|---|---|---|---|---|---|---|---|---|");
  for (const r of rows) {
    const q = QA[r.unit.id] || {}, tested = r.written && !r.hard.length;
    const ready = tested && q.reviewed && q.sources && q.signoff;
    md.push(`| ${r.unit.n}. ${r.unit.title} | ${r.planned} | ${tick(r.written)} | ${r.written ? (tested ? "✅" : `❌ ${r.hard.length}`) : "—"} | ${q.reviewed ? `✅ ${q.reviewed.date}` : "—"} | ${q.sources ? `✅ ${q.sources.date}` : "—"} | ${ready ? "✅" : "—"} | ${r.stats?.cards ?? ""} | ${r.stats ? `${r.stats.mcq} (${r.stats.diff.slice(1).join("/")})` : ""} | ${r.stats?.cites ?? ""} | ${r.written ? r.warn.length : ""} |`);
  }
  md.push("");
  const withWarn = rows.filter((r) => r.written && (r.warn.length || r.hard.length));
  if (withWarn.length) {
    md.push(`### ${C.name}: findings for review`, "");
    for (const r of withWarn) {
      md.push(`**School ${r.unit.n}: ${r.unit.title}**`, "");
      for (const h of r.hard) md.push(`- ❌ ${h}`);
      for (const w of r.warn.slice(0, 25)) md.push(`- ⚠️ ${w}`);
      if (r.warn.length > 25) md.push(`- ⚠️ …and ${r.warn.length - 25} more (run \`npm run qa -- --all\`)`);
      md.push("");
    }
  }
}
await writeFile(new URL("../docs/CURRICULUM_PROGRESS.md", import.meta.url), md.join("\n") + "\n");
if (process.argv.includes("--all")) for (const { rows } of report) for (const r of rows) for (const w of r.warn) console.log(`${r.unit.id}  ${w}`);
for (const { C, rows } of report) console.log(`${C.name}: ${rows.filter((r) => r.written).length} schools written, ${rows.filter((r) => r.written && !r.hard.length).length} pass hard checks, ${rows.reduce((a, r) => a + r.warn.length, 0)} warnings`);
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
