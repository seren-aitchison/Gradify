#!/usr/bin/env node
// The Gradify quality audit: every written lesson scored on nine dimensions of teaching quality, against the Quality
// Constitution (docs/QUALITY-CONSTITUTION.md). The first project for Gradify's AI workforce, and run on every change.
//
//   node scripts/quality-audit.mjs            write docs/quality/AUDIT.md and docs/quality/baseline.json
//   node scripts/quality-audit.mjs --check    fail if any course's score has dropped since the baseline (article 7)
//
// IMPORTANT: every score is a structural proxy. It checks that what good teaching needs is present and well formed
// (outcomes, prerequisites, worked examples, application questions, dated sources, readable sentences…). It can't
// tell whether an explanation is right or whether students learn from it (article 10). Accuracy is capped at 60 for
// any lesson no subject expert has reviewed, and the report says "unverified" rather than guessing.
import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { parseNotes } from "../kit/course/notes.js";
import { notation, arithmetic } from "./qa-content.mjs";
import { coverageOf, summary, STATUS, QUALIFICATIONS } from "../kit/curriculum/coverage.js";
import { ARTICLES } from "../kit/quality/constitution.js";

const ROOT = new URL("../", import.meta.url);
export const DIMENSIONS = [
  ["accuracy", "Accuracy", "Dated sources, evidence labels, no mechanical errors. Capped at 60 until a subject expert reviews it."],
  ["completeness", "Completeness", "Objectives stated, each one taught in the body, key terms and a summary."],
  ["clarity", "Clarity", "Sentence length, long-sentence share, a clear lead, terms defined."],
  ["progression", "Progression", "Prerequisites named (or first in its unit) and a stated level."],
  ["application", "Application", "Worked examples, common mistakes, and questions above recall level."],
  ["assessment", "Assessment", "Enough questions, more than one type, each explained, no giveaway answer lengths."],
  ["accessibility", "Accessibility", "Headed sections, digestible paragraphs, lists, a summary to return to."],
  ["engagement", "Engagement", "Variety of ways in: examples, key points, interactives, pitfalls. Supports attention, not clicks."],
  ["retention", "Retention", "Flashcards for spaced retrieval, key terms and a summary."],
];
const clamp = (x) => Math.max(0, Math.min(100, Math.round(x)));
const words = (s) => String(s).replace(/\*\*|`|_\{|\^\{|[{}]/g, "").split(/\s+/).filter(Boolean);
const STOP = new Set("the a an and or of to in on for with by from into is are be as at that this these those your you can how what why which their its it using use explain describe identify state".split(" "));
const keyWords = (s) => words(s.toLowerCase()).map((w) => w.replace(/[^a-z0-9]/g, "")).filter((w) => w.length > 3 && !STOP.has(w));

/**
 * One lesson's scores. L: a parsed lesson; ctx: { first: is it the first lesson of its unit, reviewed: has an expert
 * signed it off, earlier: titles of the lessons before it }. Returns { scores, overall, fixes, unverified }. Pure.
 */
export function scoreLesson(L, { first = false, reviewed = false, earlier = new Set() } = {}) {
  const fixes = [], S = {};
  const text = [L.lead, ...L.blocks.map((b) => b.x || (b.items || []).join(" ") || (b.rows || []).map((r) => r.join(" ")).join(" ") || (b.steps || []).join(" ")), ...L.summary].join(" \n");
  const blocks = (t) => L.blocks.filter((b) => b.t === t);
  const qs = [...L.mcq.map((m) => m.Q || { type: "sba", d: m.d, why: m.why }), ...L.tasks];
  const want = (ok, fix) => { if (!ok) fixes.push(fix); return ok ? 1 : 0; };

  // accuracy: what can be checked mechanically, never more than 60 without an expert
  const dated = L.sources.filter((s) => /\d{4}/.test(s.date)).length;
  const mech = text.split("\n").filter((l) => notation(l)).length + arithmetic(text).length;
  S.accuracy = clamp((reviewed ? 40 : 0) + 25 * want(L.sources.length >= 2, "Cite at least two sources (SRC:)") + 15 * want(L.sources.length && dated === L.sources.length, "Date every source, so it can be rechecked")
    + 10 * want(L.evidence.length >= 1 || L.authorities.length >= 1, "Say how strong the evidence is (EV:)") + 10 * want(!mech, "Fix the notation or arithmetic errors the checker found"));
  if (!reviewed) S.accuracy = Math.min(60, S.accuracy);

  // completeness: every objective taught somewhere in the lesson
  const body = new Set(keyWords(`${text} ${L.terms.map((t) => t.join(" ")).join(" ")}`));
  const taught = L.objectives.filter((o) => { const k = keyWords(o); return k.length && k.filter((w) => body.has(w)).length / k.length >= 0.5; });
  S.completeness = clamp(30 * want(L.objectives.length >= 2, "State at least two learning objectives (O:)") + 35 * (L.objectives.length ? taught.length / L.objectives.length : 0)
    + 15 * want(L.terms.length >= 2, "Define the key terms (T:)") + 20 * want(L.summary.length >= 1, "End with a summary (SUM:)"));
  if (L.objectives.length && taught.length < L.objectives.length) fixes.push(`Teach every objective: ${L.objectives.length - taught.length} isn't clearly covered in the notes`);

  // clarity: sentences a learner can hold in mind
  const sentences = text.split(/(?<=[.!?])\s+/).map(words).filter((w) => w.length > 2);
  const avg = sentences.reduce((a, w) => a + w.length, 0) / Math.max(1, sentences.length), long = sentences.filter((w) => w.length > 35).length / Math.max(1, sentences.length);
  S.clarity = clamp(40 * (avg <= 20 ? 1 : avg >= 32 ? 0 : (32 - avg) / 12) + 30 * (1 - Math.min(1, long * 4)) + 15 * want(L.lead.length > 40, "Open with a one- or two-sentence lead (S:)") + 15 * want(L.terms.length >= 1, "Define terms where they're first used (T:)"));
  if (avg > 24) fixes.push(`Shorten sentences: ${avg.toFixed(0)} words on average`);

  // progression
  const preOk = L.prereq.length ? L.prereq.some((p) => earlier.has(p.toLowerCase())) : first;
  S.progression = clamp(55 * (L.prereq.length || first ? 1 : 0) + 15 * (preOk ? 1 : 0) + 30 * want(Boolean(L.level), "State the level (LV:)"));
  if (!L.prereq.length && !first) fixes.push("Name what this builds on (PRE:)");

  // application
  const higher = qs.filter((q) => (q.d || 1) >= 2 || ["short", "num", "seq", "match", "ms"].includes(q.type)).length;
  S.application = clamp(40 * Math.min(1, blocks("ex").length) + 20 * want(blocks("pit").length >= 1, "Add a common mistake (!:)") + 40 * Math.min(1, higher / 2));
  if (!blocks("ex").length) fixes.push("Add a worked example (X:)");
  if (higher < 2) fixes.push("Add questions that ask learners to apply it, not just recall it (M2/M3, SA:, NUM:)");

  // assessment
  const types = new Set(qs.map((q) => q.type)), explained = qs.filter((q) => (q.why || "").length > 10).length;
  const mcq = L.mcq.filter((m) => m.wrong?.length), giveaway = mcq.filter((m) => m.right.length > 1.6 * Math.max(...m.wrong.map((w) => w.length))).length;
  S.assessment = clamp(35 * Math.min(1, qs.length / 3) + 20 * Math.min(1, (types.size - 1) / 1) + 30 * (qs.length ? explained / qs.length : 0) + 15 * (mcq.length ? 1 - giveaway / mcq.length : 1));
  if (qs.length < 3) fixes.push("Add check questions: at least three");
  if (giveaway) fixes.push(`Even out answer lengths: the right answer is the longest in ${giveaway}`);

  // accessibility (of the text itself; the page's own is checked in the browser)
  const paras = blocks("p").map((b) => words(b.x).length), heavy = paras.filter((n) => n > 110).length;
  S.accessibility = clamp(30 * want(blocks("h").length >= 2, "Break it into headed sections (H:)") + 35 * (paras.length ? 1 - heavy / paras.length : 1) + 15 * (blocks("ul").length ? 1 : 0) + 20 * (L.summary.length ? 1 : 0));
  if (heavy) fixes.push(`Split long paragraphs: ${heavy} over 110 words`);

  // engagement: ways in, not time on page
  const kinds = ["ex", "key", "pit", "ix", "eq", "ul"].filter((t) => blocks(t).length).length;
  S.engagement = clamp(Math.min(100, kinds * 20 + (blocks("ix").length ? 20 : 0)));

  // retention
  S.retention = clamp(50 * Math.min(1, L.cards.length / 4) + 25 * (L.terms.length >= 2 ? 1 : 0) + 25 * (L.summary.length ? 1 : 0));
  if (L.cards.length < 4) fixes.push("Add flashcards for spaced retrieval (Q:): at least four");

  const overall = Math.round(DIMENSIONS.reduce((a, [k]) => a + S[k], 0) / DIMENSIONS.length);
  return { scores: S, overall, fixes: [...new Set(fixes)], unverified: !reviewed };
}

async function courses() {
  const dir = new URL("kit/courses/", ROOT), out = [];
  for (const slug of (await readdir(dir)).sort()) {
    let cfg; try { cfg = (await import(new URL(`kit/courses/${slug}/course.js`, ROOT))).default; } catch { continue; }
    if (!cfg?.units) continue;
    out.push({ slug, cfg });
  }
  return out;
}
export async function audit() {
  const rows = [];
  for (const { slug, cfg } of await courses()) {
    const reviewedUnits = new Set(cfg.reviewed || []);
    const earlier = new Set();
    for (const u of cfg.units) {
      if (!(cfg.written || []).includes(u.id)) continue;
      let src; try { src = (await import(new URL(`kit/courses/${slug}/notes/${u.id}.js`, ROOT))).default; } catch { continue; }
      parseNotes(src).forEach((L, i) => {
        const r = scoreLesson(L, { first: i === 0, reviewed: reviewedUnits.has(u.id), earlier });
        rows.push({ course: slug, name: cfg.name, unit: u.id, lesson: L.title, ...r });
        earlier.add(L.title.toLowerCase());
      });
    }
  }
  return rows;
}
const mean = (a) => (a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : 0);
export function summarise(rows) {
  const by = new Map();
  for (const r of rows) (by.get(r.course) || by.set(r.course, []).get(r.course)).push(r);
  const courses = [...by.entries()].map(([slug, rs]) => ({ slug, name: rs[0].name, lessons: rs.length, overall: mean(rs.map((r) => r.overall)), dims: Object.fromEntries(DIMENSIONS.map(([k]) => [k, mean(rs.map((r) => r.scores[k]))])), coverage: coverageOf(slug) }));
  const fixCounts = new Map(); for (const r of rows) for (const f of r.fixes) { const k = f.replace(/: (?!\)).*$/, ""); fixCounts.set(k, (fixCounts.get(k) || 0) + 1); }
  return { lessons: rows.length, overall: mean(rows.map((r) => r.overall)), dims: Object.fromEntries(DIMENSIONS.map(([k]) => [k, mean(rows.map((r) => r.scores[k]))])), courses, fixes: [...fixCounts.entries()].sort((a, b) => b[1] - a[1]), reviewed: rows.filter((r) => !r.unverified).length, coverage: summary(courses.map((c) => c.slug)) };
}
function report(sum, rows, when) {
  const bar = (n) => `${"█".repeat(Math.round(n / 10))}${"░".repeat(10 - Math.round(n / 10))} ${n}`;
  const worst = [...rows].sort((a, b) => a.overall - b.overall).slice(0, 30);
  return `# Gradify quality audit

Run ${when} by \`node scripts/quality-audit.mjs\`, against the [Quality Constitution](../QUALITY-CONSTITUTION.md).

> **Read this first.** Every score is a structural proxy: it checks that what good teaching needs is present and well
> formed. It can't tell whether an explanation is right, or whether students learn from it. **${sum.lessons - sum.reviewed} of ${sum.lessons} lessons
> have not been reviewed by a subject expert**, so their accuracy is reported as unverified and capped at 60. Real
> evidence of learning will come from learners' own answers over time, with consent (constitution articles 9 and 10).

## The whole of Gradify

${sum.lessons.toLocaleString("en-GB")} written lessons in ${sum.courses.length} courses. Overall **${sum.overall}/100**.

| Dimension | Score | What it measures |
|---|---|---|
${DIMENSIONS.map(([k, n, d]) => `| ${n} | \`${bar(sum.dims[k])}\` | ${d} |`).join("\n")}

## Curriculum coverage: what Gradify can honestly claim

| Claim | Courses | Meaning |
|---|---|---|
${Object.entries(STATUS).map(([k, s]) => `| ${s.name} | ${sum.coverage[k]} | ${s.line} |`).join("\n")}

${sum.coverage.verified ? "" : "**No course is yet verified against an official specification.** Gradify doesn't claim to cover any qualification until it is (article 3). Verifying the SQE and NMC mappings against the published documents is the first coverage task.\n"}
| Course | Serves | Claim |
|---|---|---|
${sum.courses.map((c) => `| ${c.name} | ${c.coverage.serves.map((s) => (s.q ? QUALIFICATIONS[s.q].name : "Gradify's own curriculum")).join("; ")} | ${c.coverage.serves.map((s) => STATUS[s.status].name).join("; ")} |`).join("\n")}

## By course, weakest first

| Course | Lessons | Overall | ${DIMENSIONS.map(([, n]) => n).join(" | ")} |
|---|---|---|${DIMENSIONS.map(() => "---").join("|")}|
${[...sum.courses].sort((a, b) => a.overall - b.overall).map((c) => `| ${c.name} | ${c.lessons} | **${c.overall}** | ${DIMENSIONS.map(([k]) => c.dims[k]).join(" | ")} |`).join("\n")}

## What would help most, across every lesson

| Fix | Lessons |
|---|---|
${sum.fixes.slice(0, 15).map(([f, n]) => `| ${f} | ${n.toLocaleString("en-GB")} |`).join("\n")}

## The 30 lessons to improve first

| Course | Lesson | Overall | Fixes |
|---|---|---|---|
${worst.map((r) => `| ${r.name} | ${r.lesson.replace(/\|/g, "/")} | ${r.overall} | ${r.fixes.slice(0, 4).join("; ").replace(/\|/g, "/")} |`).join("\n")}

## The constitution, article by article

${ARTICLES.map((a) => `- **${a.id}. ${a.title}.** ${a.measured}`).join("\n")}
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rows = await audit(), sum = summarise(rows), when = new Date().toISOString().slice(0, 10);
  const basePath = new URL("docs/quality/baseline.json", ROOT);
  if (process.argv.includes("--check")) {
    const base = JSON.parse(await readFile(basePath, "utf8"));
    const drops = sum.courses.filter((c) => base.courses[c.slug] != null && c.overall < base.courses[c.slug] - 1).map((c) => `${c.name}: ${base.courses[c.slug]} → ${c.overall}`);
    if (drops.length) { console.error(`Quality dropped (constitution article 7, no silent degradation):\n${drops.join("\n")}\nImprove the lessons, or explain the change and run node scripts/quality-audit.mjs to set a new baseline.`); process.exit(1); }
    console.log(`Quality audit: ${sum.lessons} lessons, overall ${sum.overall}/100, no course below its baseline.`);
  } else {
    await mkdir(new URL("docs/quality/", ROOT), { recursive: true });
    await writeFile(new URL("docs/quality/AUDIT.md", ROOT), report(sum, rows, when));
    await writeFile(basePath, `${JSON.stringify({ at: when, overall: sum.overall, courses: Object.fromEntries(sum.courses.map((c) => [c.slug, c.overall])) }, null, 1)}\n`);
    // kit/api/v1/quality.json, for the public quality page, is written by scripts/build-api.mjs from this baseline
    console.log(`Quality audit: ${sum.lessons} lessons, overall ${sum.overall}/100. Written docs/quality/AUDIT.md. Run node scripts/build-api.mjs to update the public page's data.`);
  }
}

/** What the public quality page shows (kit/api/v1/quality.json, written by scripts/build-api.mjs): course averages and
 * coverage only, dated by the baseline so the file only changes when the content does. */
export async function qualityJson() {
  const sum = summarise(await audit());
  const base = JSON.parse(await readFile(new URL("docs/quality/baseline.json", ROOT), "utf8"));
  return { api: 1, about: "Gradify's quality audit: structural scores for every written lesson (scripts/quality-audit.mjs). Not proof that students learn; see docs/QUALITY-CONSTITUTION.md.", at: base.at, lessons: sum.lessons, reviewed: sum.reviewed, overall: sum.overall, dims: sum.dims, coverage: sum.coverage,
    courses: sum.courses.map((c) => ({ slug: c.slug, name: c.name, lessons: c.lessons, overall: c.overall, dims: c.dims, serves: c.coverage.serves.map((x) => ({ q: x.q, status: x.status })) })) };
}
