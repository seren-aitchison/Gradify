// Content standard 2, as code: every check a lesson written for a new course must pass, collected rather than stopped
// at the first failure, so a writer sees every problem in a school at once. Used by tests/new-courses.test.mjs (which
// fails on any problem) and by `node scripts/new-course.mjs check` (which lists them, before or after a school is
// added). One definition, so the CLI and the tests can never disagree.
import { parseNotes, norm } from "../kit/course/notes.js";

export const SRC_KINDS = ["legislation", "case", "rule", "guidance", "standard", "primary", "secondary", "data"];
export const EV = ["established", "contested", "hypothetical"];
export const CONTENT_BLOCKS = ["p", "ul", "eq", "ex", "key", "pit"];
// QA (scripts/qa-courses.mjs) warns when the right answer is conspicuously the longest option in more than this share
export const LENGTH_BIAS_LIMIT = 0.25;
const longest = (m) => m.right.length > 1.6 * Math.max(...m.wrong.map((w) => w.length));

/** Problems with one parsed lesson. ixIds: the course's interactive ids; seen: a Map shared across lessons for duplicates. */
export function lessonProblems(L, at, { ixIds = new Set(), seen = new Map() } = {}) {
  const p = [], need = (ok, msg) => { if (!ok) p.push(`${at}: ${msg}`); };
  need(L.lead.length > 60, "lead (S:) over 60 characters");
  need(L.level, "level (LV:)");
  need(L.blocks.filter((b) => b.t === "h").length >= 2, "at least two sections (H:)");
  const blocks = L.blocks.filter((b) => CONTENT_BLOCKS.includes(b.t)).length;
  need(blocks >= 6, `too thin: ${blocks} content blocks (P:, lists, X:, K:, !:), at least 6`);
  need(L.blocks.some((b) => b.t === "key"), "key point (K:)");
  need(L.objectives.length >= 2, "at least two objectives (O:)");
  need(L.terms.length >= 2, "at least two key terms (T:)");
  need(L.summary.length >= 1, "summary (SUM:)");
  need(L.sources.length >= 2, "at least two sources (SRC:)");
  need(L.evidence.length >= 1, "evidence status (EV:)");
  for (const e of L.evidence) need(EV.includes(e.status), `evidence status "${e.status}" (established, contested or hypothetical)`);
  for (const s of L.sources) {
    need(SRC_KINDS.includes(s.kind), `source kind "${s.kind}" in "${s.cite.slice(0, 40)}"`);
    need(/^\d{4}(-\d\d){0,2}$/.test(s.date), `source date "${s.date}" in "${s.cite.slice(0, 40)}" (a four-digit year)`);
    if (s.url) need(/^https:\/\//.test(s.url), `source link "${s.url}" (https only)`);
  }
  for (const b of L.blocks.filter((x) => x.t === "ix")) need(ixIds.has(b.id), `interactive ${b.id} isn't registered`);
  need(L.cards.length >= 2, "at least two flashcards (Q:)");
  need(L.mcq.length >= 2, "at least two multiple-choice questions");
  for (const m of L.mcq) {
    need(m.wrong.length >= 3, `"${m.q.slice(0, 50)}" needs three distractors`);
    need(!m.wrong.includes(m.right), `"${m.q.slice(0, 50)}" repeats its answer as a distractor`);
    need(m.why.length > 40, `"${m.q.slice(0, 50)}" explanation is ${m.why.length} characters, over 40 needed`);
    const k = norm(m.q); need(!seen.has(k), `"${m.q.slice(0, 50)}" duplicates a question in ${seen.get(k)}`); seen.set(k, at);
  }
  const all = [...L.mcq.map((m) => m.Q), ...L.tasks];
  need(all.length >= 5, `${all.length} questions, at least five needed`);
  const levels = [...new Set(all.map((q) => q.d))].sort().join(",");
  need(levels === "1,2,3", `questions at levels ${levels || "none"}, all three needed`);
  for (const q of all) {
    need(q.objectives.length, `"${q.q.slice(0, 40)}" isn't linked to an objective (@n)`);
    for (const o of q.objectives) need(o >= 1 && o <= L.objectives.length, `"${q.q.slice(0, 40)}" names objective ${o}`);
  }
  for (const q of L.tasks) if (q.type !== "short") need(q.why?.length > 20, `"${q.q.slice(0, 50)}" explains its answer (over 20 characters)`);
  need(L.tasks.some((q) => q.type === "short"), "an extended written answer (SA:)");
  return p;
}

/**
 * Problems with one school's notes against its syllabus unit, plus the QA warnings a script can predict (length
 * bias). Returns { problems, warnings, stats }.
 */
export function schoolProblems(text, unit, opts = {}) {
  const parsed = parseNotes(text), problems = [], warnings = [];
  for (const p of parsed) if (!unit.lessons.some((l) => norm(l.title) === norm(p.title))) problems.push(`"${p.title}" isn't in the syllabus for ${unit.id}`);
  let mcq = 0, biased = 0, questions = 0;
  for (const l of unit.lessons) {
    const L = parsed.find((p) => norm(p.title) === norm(l.title)), at = `${l.id} ${l.title}`;
    if (!L) { problems.push(`${at}: no notes`); continue; }
    problems.push(...lessonProblems(L, at, opts));
    mcq += L.mcq.length; biased += L.mcq.filter(longest).length; questions += L.mcq.length + L.tasks.length;
  }
  if (mcq && biased / mcq > LENGTH_BIAS_LIMIT) {
    warnings.push(`length bias: the right answer is much the longest option in ${biased} of ${mcq} questions (${Math.round((100 * biased) / mcq)}%, limit ${100 * LENGTH_BIAS_LIMIT}%). Lengthen these distractors:`);
    for (const L of parsed) for (const m of L.mcq) if (longest(m)) warnings.push(`  ${L.title}: "${m.q.slice(0, 60)}"`);
  }
  return { problems, warnings, stats: { lessons: parsed.length, questions, mcq, biased } };
}

/** Text that would break a notes module (a JavaScript template literal) if wrapped as it is. */
export function unsafeForTemplate(text) {
  const out = [];
  if (text.includes("`")) out.push("contains a backtick (`): write \\` or rephrase");
  if (text.includes("${")) out.push("contains ${, which JavaScript would treat as code");
  if (/\\(?![\\`$])/.test(text)) out.push("contains a single backslash, which JavaScript would swallow: write \\\\");
  if (/(^|\n)[A-Z][A-Z0-9]*[123]?#[\w-]+/.test(text)) out.push("a question tag carries a #id: leave ids to `lock`");
  return out;
}
