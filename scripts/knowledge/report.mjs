// The production report: for a specification, how far the knowledge engine has got, and what to build next.
//
//   node scripts/knowledge/pipeline.mjs report aqa-gcse-biology
//     → docs/knowledge/PRODUCTION-<SPEC>.md and data/knowledge/production/<spec>.json
//
// For every statement it measures, from the knowledge base as it is (not from hopes):
//   relevant knowledge   items valid at the level cover at least 40% of the statement's content words
//   complete knowledge   they cover all of them, and a practical has a practical item, a calculation a computed item
// and from the lessons: generated, passed automated QA, awaiting expert review, approved, publishable (the gate).
// Coverage of words is a proxy, deliberately strict and simple: it finds where knowledge is missing; it can't show
// that knowledge is correct or complete. That is the reviewer's job.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { at, load, save, loadKnowledge, loadSources, tokens, ROOT } from "./lib.mjs";
import { retrieve } from "./assemble.mjs";
import { claimText } from "./evidence.mjs";
import { stem, GENERIC, impact } from "./qa.mjs";
import { resolve } from "../../kit/knowledge/forms.js";
import { publishGate, categoryOf, LICENCES } from "../../kit/knowledge/schema.js";
import { loadIndex, statementsPath } from "../curriculum/engine.mjs";
import { SPECS } from "../../kit/curriculum/uk.js";

const QUAL_LEVEL = { gcse: "gcse", "gcse-combined": "gcse", as: "as", "a-level": "alevel", nat5: "nat5", higher: "higher", "adv-higher": "advhigher" };
const pct = (n, d) => (d ? `${Math.round((n / d) * 100)}%` : "–");

export function allLessons() { const d = at("lessons/"); return existsSync(d) ? readdirSync(d).map((id) => load(at(`lessons/${id}/lesson.json`))).filter(Boolean) : []; }

/** how well the knowledge base covers one statement at a level (pure apart from the knowledge passed in) */
export function knowledgeFor(st, level, items) {
  const r = retrieve({ text: st.text, sectionTitle: st.title || "", statementKind: st.kind, level }, items);
  const got = r.items.map((x) => resolve(items.find((k) => k.id === x.id), level));
  const have = new Set(tokens(got.map(claimText).join(" ")).map(stem));
  const want = [...new Set(tokens(st.text))].filter((w) => !GENERIC.has(w));
  const missing = want.filter((w) => !have.has(stem(w)));
  const share = want.length ? (want.length - missing.length) / want.length : 0;
  const needsPractical = st.kind === "practical", needsCalc = /\bcalculat|\bpercentage|\bmagnification\b|\bstandard form\b/i.test(st.text);
  const hasPractical = got.some((k) => k.kind === "practical"), hasCalc = got.some((k) => k.compute);
  return { items: got.map((k) => k.id), share, missing, relevant: share >= 0.4 && got.length > 0, complete: !missing.length && got.length > 0 && (!needsPractical || hasPractical) && (!needsCalc || hasCalc), needs: [needsPractical && !hasPractical ? "a practical item" : null, needsCalc && !hasCalc ? "a computed calculation" : null].filter(Boolean) };
}

export function productionReport(specId, { subject = "biology", date = new Date().toISOString().slice(0, 10) } = {}) {
  const spec = SPECS.find((s) => s.id === specId), level = QUAL_LEVEL[spec.qual], idx = loadIndex(specId);
  const full = existsSync(statementsPath(specId)) ? load(statementsPath(specId)) : null;
  if (!full) throw new Error(`${specId}'s statement text isn't imported here (it's needed to measure knowledge coverage)`);
  const items = loadKnowledge(subject), sources = loadSources(), ev = load(at(`${subject}/evidence.json`))?.items || {};
  const titles = new Map(full.sections.map((x) => [x.ref, x.title]));
  const lessons = allLessons(), bySpec = lessons.filter((l) => l.requirement.id.startsWith(`${specId}:`));
  const rows = full.statements.map((st) => {
    const k = knowledgeFor({ ...st, title: titles.get(st.section) }, level, items);
    const ls = bySpec.filter((l) => l.requirement.id === `${specId}:${st.ref}`);
    return { ref: st.ref, section: st.section, kind: st.kind, ...k, lessons: ls.map((l) => ({ id: l.id, status: l.status, qa: l.qa?.result })) };
  });
  const n = rows.length, count = (f) => rows.filter(f).length;
  const L = { generated: bySpec.length, qaPass: bySpec.filter((l) => l.qa?.result === "pass").length, awaiting: bySpec.filter((l) => l.status === "expert-review").length, approved: bySpec.filter((l) => l.status === "approved").length, published: bySpec.filter((l) => l.status === "published").length };
  // publishing gate for every lesson (all levels)
  const gate = lessons.map((l) => {
    const its = l.knowledge.map((k) => items.find((x) => x.id === k.id)).filter(Boolean).map((k) => resolve(k, l.level));
    return { lesson: l.id, problems: publishGate({ lesson: l, items: its, sources, evidence: ev, attributed: l.attributed || [], stale: impact([l], l.subject)[0]?.why || [] }) };
  });
  // topics: each top-level topic and each section
  const topics = full.sections.filter((s) => s.ref.split(".").length === 2).map((t) => { const rs = rows.filter((r) => r.section === t.ref || r.section.startsWith(`${t.ref}.`)); return { ref: t.ref, title: t.title, statements: rs.length, relevant: rs.filter((r) => r.relevant).length, complete: rs.filter((r) => r.complete).length, lessons: rs.filter((r) => r.lessons.length).length }; });
  const sections = [...new Set(rows.map((r) => r.section))].map((sec) => { const rs = rows.filter((r) => r.section === sec); return { ref: sec, title: titles.get(sec), statements: rs.length, relevant: rs.filter((r) => r.relevant).length, complete: rs.filter((r) => r.complete).length }; });
  // knowledge reuse: items used by lessons for more than one requirement, level or qualification
  const use = new Map();
  for (const l of lessons) for (const k of l.knowledge) { const u = use.get(k.id) || { id: k.id, lessons: [], levels: new Set(), schemes: new Set(), forms: new Set() }; u.lessons.push(l.id); u.levels.add(l.level); u.schemes.add(l.requirement.id.split(":")[0]); u.forms.add(k.form); use.set(k.id, u); }
  const reuse = [...use.values()].filter((u) => u.lessons.length > 1).map((u) => ({ id: u.id, lessons: u.lessons.length, levels: [...u.levels], qualifications: [...u.schemes], forms: [...u.forms] })).sort((a, b) => b.lessons - a.lessons || b.levels.length - a.levels.length);
  const kb = { items: items.length, reviewed: items.filter((k) => k.status === "reviewed").length, withForms: items.filter((k) => k.forms?.length).length, adapted: items.filter((k) => k.origin?.type === "adapted").length, weakEvidence: items.filter((k) => (ev[k.id]?.support ?? 0) < 0.3).length, kinds: Object.fromEntries([...new Set(items.map((k) => k.kind))].map((kd) => [kd, items.filter((k) => k.kind === kd).length])) };
  const srcs = Object.values(sources).map((s) => ({ id: s.id, category: categoryOf(s.licence), licence: s.licence, confirmed: !!s.licenceConfirmed }));
  const data = { spec: specId, level, date, statements: n, relevant: count((r) => r.relevant), complete: count((r) => r.complete), lessons: L, knowledge: kb, sources: srcs, topics, sections, reuse, gate: gate.map((g) => ({ lesson: g.lesson, publishable: !g.problems.length, problems: g.problems.length })), rows: rows.map(({ items: its, missing, ...r }) => ({ ...r, items: its.length, missing })) };
  const md = `# Production report: ${spec.title} (${spec.code})

Generated by \`node scripts/knowledge/pipeline.mjs report ${specId}\` on ${date}. What the knowledge engine has built for this specification, measured from the knowledge base and lessons as they are. How the engine works: [\`README.md\`](README.md).

## Summary

| | |
|---|---|
| Specification requirements (statements) | ${n} |
| With relevant knowledge (items cover ≥ 40% of the statement's content words) | ${data.relevant} (${pct(data.relevant, n)}) |
| With complete knowledge (all its content words; a practical item for practicals; a computed item for calculations) | ${data.complete} (${pct(data.complete, n)}) |
| Lessons generated | ${L.generated} |
| Passed automated QA | ${L.qaPass} |
| Awaiting expert review | ${L.awaiting} |
| Approved | ${L.approved} |
| Published | ${L.published} |
| Lessons that would pass the publishing gate today (all levels) | ${gate.filter((g) => !g.problems.length).length} of ${gate.length} |

"Complete knowledge" is a word-coverage measure: it finds where knowledge is missing, and can't show that what exists is correct. Nothing here is reviewed yet.

## The knowledge base

${kb.items} knowledge items (${Object.entries(kb.kinds).map(([k, v]) => `${v} ${k}`).join(", ")}). ${kb.reviewed} reviewed by a specialist; ${kb.withForms} with level-specific forms; ${kb.adapted} adapted from a source (the rest are Gradify's own writing); ${kb.weakEvidence} with weak evidence (their sources contain under 30% of their distinctive vocabulary), flagged for review.

Sources: ${srcs.length}. ${["public-domain", "commercial-adapt", "noncommercial-only", "verify-only", "unknown"].map((c) => `${srcs.filter((s) => s.category === c).length} ${c}`).join(", ")}. Licences confirmed by a person: ${srcs.filter((s) => s.confirmed).length}. Until a person confirms each source's licence, no lesson that rests on it can be published.

## Lessons for this specification

| Requirement | Lesson | Status | Automated QA |
|---|---|---|---|
${bySpec.map((l) => `| ${l.requirement.id.split(":")[1]} (${l.requirementKind}) | ${l.id} | ${l.status} | ${l.qa?.result} (${l.qa?.checks} checks, ${l.qa?.fails} failed, ${l.qa?.reviews} flagged) |`).join("\n")}

## Publishing gate

Every lesson, at every level, against the hard rules (approved by a named reviewer, reviewed knowledge, evidence trails, no adaptation of sources Gradify may not adapt, confirmed licences, attribution):

| Lesson | Publishable | Why not (first three of ${Math.max(0, ...gate.map((g) => g.problems.length))} at most) |
|---|---|---|
${gate.map((g) => `| ${g.lesson} | ${g.problems.length ? "no" : "yes"} | ${g.problems.slice(0, 3).join("; ")}${g.problems.length > 3 ? `; and ${g.problems.length - 3} more` : ""} |`).join("\n")}

## By topic

| Topic | Statements | Relevant knowledge | Complete knowledge | With a lesson |
|---|---|---|---|---|
${topics.map((t) => `| ${t.ref} ${t.title} | ${t.statements} | ${t.relevant} | ${t.complete} | ${t.lessons} |`).join("\n")}

## Sections with no adequate knowledge yet (${sections.filter((s) => !s.relevant).length} of ${sections.length})

${sections.filter((s) => !s.relevant).map((s) => `${s.ref} ${s.title} (${s.statements})`).join(" · ")}

## Knowledge reused across lessons

${reuse.length ? `| Knowledge item | Lessons | Levels | Qualifications | Forms used |\n|---|---|---|---|---|\n${reuse.map((u) => `| ${u.id} | ${u.lessons} | ${u.levels.join(", ")} | ${u.qualifications.join(", ")} | ${u.forms.join(", ")} |`).join("\n")}` : "None yet."}

## Statements with complete knowledge (${data.complete})

${rows.filter((r) => r.complete).map((r) => r.ref).join(", ") || "None."}

## Statements with relevant but incomplete knowledge (${rows.filter((r) => r.relevant && !r.complete).length})

| Statement | Knowledge items | Missing words | Needs |
|---|---|---|---|
${rows.filter((r) => r.relevant && !r.complete).map((r) => `| ${r.ref} | ${r.items.length} | ${r.missing.slice(0, 8).join(", ")} | ${r.needs.join(", ")} |`).join("\n")}
`;
  save(new URL(`docs/knowledge/PRODUCTION-${specId.toUpperCase()}.md`, ROOT), md);
  save(at(`production/${specId}.json`), data);
  return data;
}
void LICENCES;

/**
 * Reuse across levels: for each topic built at two levels, what the lessons share and where they differ.
 *   same item, same form        identical knowledge reused
 *   same item, different form   one canonical item, each level's own wording and depth
 *   one level only              knowledge valid only at that level (its range ends below, or starts above)
 * and their diagrams and questions. → docs/knowledge/REUSE.md
 */
export function reuseReport(pairs, { subject = "biology", date = new Date().toISOString().slice(0, 10) } = {}) {
  const items = loadKnowledge(subject), byId = new Map(items.map((k) => [k.id, k])), lessons = allLessons();
  const get = (id) => lessons.find((l) => l.id === id);
  const sections = pairs.map(([topic, a, b]) => {
    const A = get(a), B = get(b); if (!A || !B) return `## ${topic}\n\nNot built yet.`;
    const ka = new Map(A.knowledge.map((k) => [k.id, k])), kb = new Map(B.knowledge.map((k) => [k.id, k]));
    const shared = [...ka.keys()].filter((id) => kb.has(id));
    const same = shared.filter((id) => ka.get(id).formHash === kb.get(id).formHash), diff = shared.filter((id) => ka.get(id).formHash !== kb.get(id).formHash);
    const onlyA = [...ka.keys()].filter((id) => !kb.has(id)), onlyB = [...kb.keys()].filter((id) => !ka.has(id));
    const why = (id, lvl) => { const k = byId.get(id); return k ? `${k.level.from}–${k.level.to}` : "?"; };
    const diagram = (l) => l.assets.map((x) => `${x.origin === "generated" ? "generated" : "library"} \`${x.id.replace(/^kb-[a-z0-9-]+?-(gcse|ug)-/, "")}\``).join(", ") || "none";
    const qtypes = (l) => Object.entries(l.questions.reduce((m, q) => ((m[q.type] = (m[q.type] || 0) + 1), m), {})).map(([t, n]) => `${n} ${t}`).join(", ");
    // questions compared by their text (ids differ by lesson)
    const qbodies = (l) => readFileSync(at(`lessons/${l.id}/notes.txt`), "utf8").split("\n").filter((x) => /^(M|TF|MS|SEQ|NUM)[123]?#/.test(x)).map((x) => x.replace(/^[A-Z]+[123]?#[^:]+:\s*/, ""));
    const qa = qbodies(A), qb = qbodies(B), sharedQ = qa.filter((q) => qb.includes(q)).length;
    return `## ${topic}

| | ${A.level.toUpperCase()}: ${A.requirement.id} | ${B.level.toUpperCase()}: ${B.requirement.id} |
|---|---|---|
| Template | ${A.template} | ${B.template} |
| Knowledge items | ${A.knowledge.length} | ${B.knowledge.length} |
| Diagrams | ${diagram(A)} | ${diagram(B)} |
| Questions | ${A.questions.length} (${qtypes(A)}) | ${B.questions.length} (${qtypes(B)}) |

- **Shared, identical** (${same.length}): ${same.map((id) => `\`${id}\``).join(", ") || "none"}
- **Shared, each level's own form** (${diff.length}): ${diff.map((id) => `\`${id}\` (${ka.get(id).form} / ${kb.get(id).form})`).join(", ") || "none"}
- **In the ${A.level.toUpperCase()} lesson only** (${onlyA.length}): ${onlyA.map((id) => `\`${id}\` (${why(id)})`).join(", ") || "none"}
- **In the ${B.level.toUpperCase()} lesson only** (${onlyB.length}): ${onlyB.map((id) => `\`${id}\` (${why(id)})`).join(", ") || "none"}
- **Questions:** ${sharedQ} of ${qa.length} and ${qb.length} are word-for-word the same (from identical knowledge); the rest are generated from each level's own forms.`;
  });
  const md = `# Reusing knowledge across levels

Generated by \`node scripts/knowledge/pipeline.mjs reuse\` on ${date}. Each topic below was assembled twice from the same knowledge base: once for an AQA GCSE Biology statement and once for a Gradify university lesson. Nothing was copied between them: each lesson takes each item in its form for its level.

${sections.join("\n\n")}
`;
  save(new URL("docs/knowledge/REUSE.md", ROOT), md);
  return md;
}
