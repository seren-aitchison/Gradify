// The curriculum engine's Node side: load statements and maps, import a specification, propose lesson links, and build
// a subject's inventory. The rules (statuses, claims, where a learner stands) live in kit/curriculum/mapping.js.
//
//   node scripts/curriculum/engine.mjs import <specId> <file.pdf|file.txt|file.csv> --version <v> --source <url> --checked <YYYY-MM-DD>
//   node scripts/curriculum/engine.mjs propose <specId>        suggest lessons for unreviewed statements (never verified)
//   node scripts/curriculum/engine.mjs inventory <subject>     every lesson with objectives, diagrams and questions
//   node scripts/curriculum/engine.mjs report <subject>        docs/curriculum/<SUBJECT>-COVERAGE.md
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { lessonsOf } from "../growth/lesson-readiness.mjs";
import { parseTable, readText } from "../growth/sources.mjs";
import { SPECS, BODIES, QUAL_TYPES, specsFor, nationsOf, NATIONS } from "../../kit/curriculum/uk.js";
import { coverageReport, claimFor, COVERAGE } from "../../kit/curriculum/mapping.js";

const root = new URL("../../", import.meta.url);
export const statementsPath = (id) => new URL(`data/curriculum/specs/${id}.json`, root);
export const mapPath = (id) => new URL(`kit/curriculum/maps/${id}.json`, root);
const load = (u) => (existsSync(u) ? JSON.parse(readFileSync(u, "utf8")) : null);
export const loadStatements = (id) => load(statementsPath(id));
export const loadMap = (id) => load(mapPath(id));
const COURSE_OF = { biology: ["biology"], chemistry: ["chemistry"], physics: ["physics"], maths: ["maths"] };

// ---------- importing a specification ----------
/**
 * Statements from a specification's text (pdftotext output). Awarding bodies number content hierarchically
 * ("4.1.1.2 Animal and plant cells", "1.2(a)", "2.1.3 c"); every numbered heading becomes a statement whose text is what
 * follows it, until the next. A parser is a first draft: a person checks the result against the document before any
 * mapping is verified (importedBy says how it was made).
 */
export function parseSpecText(text) {
  const lines = text.replace(/\r/g, "").split("\n"), out = [];
  const head = /^\s*((?:\d+\.){2,}\d+)\s+(\S.{2,120})$/;
  let cur = null;
  for (const raw of lines) {
    const l = raw.replace(/\s+/g, " ").trim(); if (!l) continue;
    const m = raw.match(head);
    if (m && !/\.\.\.|\s\d+$/.test(m[2])) {   // skip contents-page lines ("4.1 Cell biology ........ 12")
      if (cur) out.push(cur);
      cur = { ref: m[1], title: m[2].trim(), text: "" };
    } else if (cur && cur.text.length < 3000) cur.text = `${cur.text} ${l}`.trim();
  }
  if (cur) out.push(cur);
  const seen = new Set();
  return out.filter((s) => !seen.has(s.ref) && seen.add(s.ref)).map((s) => ({ ...s, topic: s.ref.split(".").slice(0, -1).reduce((acc, _, i, a) => [...acc, a.slice(0, i + 1).join(".")], []) }));
}
/** statements from a reviewer's CSV: ref, topic, title, statement, tier, kind */
export function parseSpecCsv(text) {
  return parseTable(text).filter((r) => r.ref).map((r) => ({ ref: r.ref.trim(), topic: (r.topic || "").split(/\s*>\s*/).filter(Boolean), title: r.title || "", text: r.statement || r.text || "", ...(r.tier ? { tier: r.tier } : {}), ...(r.kind ? { kind: r.kind } : {}) }));
}
export function importSpec(id, file, { version, source, checked }) {
  const s = SPECS.find((x) => x.id === id); if (!s) throw new Error(`no specification ${id} in kit/curriculum/uk.js`);
  if (!version || !source || !/^\d{4}-\d{2}-\d{2}$/.test(checked || "")) throw new Error("--version, --source (the official URL) and --checked YYYY-MM-DD are required");
  const statements = /\.csv$/i.test(file) ? parseSpecCsv(readText(readFileSync(file))) : parseSpecText(/\.pdf$/i.test(file) ? execFileSync("pdftotext", ["-layout", file, "-"], { encoding: "utf8", maxBuffer: 64e6 }) : readFileSync(file, "utf8"));
  if (!statements.length) throw new Error("no statements found: check the file, or transcribe a CSV");
  const doc = { spec: id, title: s.title, code: s.code, version, source, checkedOn: checked, importedBy: /\.csv$/i.test(file) ? "transcribed (CSV)" : "parsed from the official document: check against it", statements };
  mkdirSync(new URL("data/curriculum/specs/", root), { recursive: true });
  writeFileSync(statementsPath(id), `${JSON.stringify(doc, null, 1)}\n`);
  return doc;
}

// ---------- proposing links (a matcher suggests; only a reviewer verifies) ----------
const STOP = new Set("a an the and or of to in on for with by from as at is are be this that these those how why what which their its it into between within including include describe explain understand know recall use using able students should".split(" "));
export const tokens = (s) => String(s ?? "").toLowerCase().replace(/\*\*|`|\^\{|_\{|[{}]/g, "").match(/[a-z][a-z0-9'-]+/g)?.map((w) => w.replace(/'s$/, "").replace(/(ies)$/, "y").replace(/(?<=[a-z]{3})(es|s)$/, "")).filter((w) => w.length > 2 && !STOP.has(w)) || [];
/** a lesson as matchable text: title (weighted), objectives, headings, key terms, summary and lead */
export function lessonDoc(x) {
  const L = x.L, heads = L.blocks.filter((b) => b.t === "h").map((b) => b.x);
  return [L.title, L.title, L.title, ...L.objectives, ...heads, ...L.terms.map(([t]) => t), ...L.terms.map(([t]) => t), ...(L.summary || []), L.lead].join(" ");
}
/** BM25 ranking of lessons for each statement: [{ ref, candidates: [{ id, title, score, matched }] }] */
export function propose(statements, lessons, { top = 3, k1 = 1.2, b = 0.75 } = {}) {
  const docs = lessons.map((x) => ({ id: x.id, title: x.L.title, unit: x.u.title, t: tokens(lessonDoc(x)) }));
  const N = docs.length, avg = docs.reduce((m, d) => m + d.t.length, 0) / N, df = new Map();
  for (const d of docs) for (const w of new Set(d.t)) df.set(w, (df.get(w) || 0) + 1);
  const idf = (w) => Math.log(1 + (N - (df.get(w) || 0) + 0.5) / ((df.get(w) || 0) + 0.5));
  const tf = docs.map((d) => { const m = new Map(); for (const w of d.t) m.set(w, (m.get(w) || 0) + 1); return m; });
  return statements.map((s) => {
    const q = [...new Set(tokens(`${s.title} ${s.title} ${s.text}`))];
    const scored = docs.map((d, i) => {
      let sc = 0; const hit = [];
      for (const w of q) { const f = tf[i].get(w); if (!f) continue; hit.push(w); sc += idf(w) * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.t.length) / avg))); }
      return { id: d.id, title: d.title, unit: d.unit, score: Math.round(sc * 100) / 100, matched: hit };
    }).filter((c) => c.score > 0).sort((a, c) => c.score - a.score);
    return { ref: s.ref, candidates: scored.slice(0, top) };
  });
}
/** add proposals to a map for statements without a link; verified links are never touched */
export function mergeProposals(map, proposals, { minScore = 6 } = {}) {
  const out = { ...map, links: { ...(map.links || {}) } };
  for (const p of proposals) {
    if (out.links[p.ref]?.status === "verified") continue;
    const best = p.candidates.filter((c) => c.score >= minScore);
    out.links[p.ref] = best.length
      ? { status: "proposed", proposedBy: "matcher v1 (BM25 on titles, objectives, headings, key terms)", lessons: best.map((c) => ({ id: c.id, coverage: "partial", note: `score ${c.score}; matched: ${c.matched.slice(0, 8).join(", ")}` })) }
      : { status: "proposed", proposedBy: "matcher v1", lessons: [], gap: "no lesson matched: a likely gap, to confirm" };
  }
  return out;
}

// ---------- the Gradify side: what each lesson brings ----------
export async function inventory(subject) {
  const lessons = await lessonsOf(COURSE_OF[subject] || [subject]);
  return lessons.map((x) => ({
    id: x.id, unit: `${x.u.id}: ${x.u.title}`, title: x.L.title, level: x.L.level || null, objectives: x.L.objectives,
    diagrams: x.L.blocks.filter((b) => b.t === "dg").map((b) => b.id), interactives: x.L.blocks.filter((b) => b.t === "ix").map((b) => b.id),
    workedExamples: x.L.blocks.filter((b) => b.t === "ex").length, mistakes: x.L.blocks.filter((b) => b.t === "pit").length,
    questions: x.L.mcq.length, explainedQuestions: x.L.mcq.filter((q) => q.why).length, flashcards: x.L.cards.length, keyTerms: x.L.terms.length,
    sources: x.L.sources.length, pageReady: !x.m.missing.length,
  }));
}

export async function subjectReport(subject, date) {
  const inv = await inventory(subject), byId = new Map(inv.map((l) => [l.id, l])), specs = specsFor(subject);
  const units = [...new Set(inv.map((l) => l.unit))];
  const sum = (k) => inv.reduce((m, l) => m + (Array.isArray(l[k]) ? l[k].length : l[k]), 0);
  const specRows = specs.map((s) => {
    const st = loadStatements(s.id), map = loadMap(s.id), r = st ? coverageReport(st, map) : null, claim = st ? claimFor(st, map) : null;
    return { s, st, r, claim };
  });
  const name = subject[0].toUpperCase() + subject.slice(1);
  return `# ${name}: specification coverage

Generated by \`node scripts/curriculum/engine.mjs report ${subject}\` on ${date}. How it works and how to review a mapping: \`docs/curriculum/README.md\`.

**What Gradify may claim today:** ${specRows.some((x) => x.claim?.allowed) ? specRows.filter((x) => x.claim?.allowed).map((x) => `${x.s.title}: ${x.claim.line}`).join("; ") : "nothing yet. No specification has been fully reviewed, so no GCSE, A level or Scottish qualification is claimed for this subject (kit/curriculum/coverage.js stays \"Gradify curriculum\")."}

## Gradify's ${name.toLowerCase()} course

${inv.length} lessons in ${units.length} units: ${sum("objectives")} learning objectives, ${sum("diagrams")} diagrams, ${sum("interactives")} interactives, ${sum("workedExamples")} worked examples, ${sum("explainedQuestions")} practice questions with explanations (${sum("questions")} in all), ${sum("flashcards")} flashcards. ${inv.filter((l) => l.pageReady).length} lessons clear the standalone-page floor. Full inventory: \`data/curriculum/inventory/${subject}.json\`.

## Specifications

| Specification | Body | Qualification | Nations | Code | Confirmed | Statements | Covered | Partial | Missing | Awaiting verification |
|---|---|---|---|---|---|---|---|---|---|---|
${specRows.map(({ s, r }) => `| ${s.title} | ${BODIES[s.body].name} | ${QUAL_TYPES[s.qual].name} | ${nationsOf(s).map((n) => NATIONS[n].name).join(", ")} | ${s.code ?? "to confirm"} | ${s.confirmed ? "yes" : "no"} | ${r ? r.totals.statements : "not imported"} | ${r?.totals.covered ?? "–"} | ${r?.totals.partial ?? "–"} | ${r?.totals.missing ?? "–"} | ${r?.totals.awaiting ?? "–"} |`).join("\n")}

"Not imported" means the official specification's statements aren't in \`data/curriculum/specs/\` yet, so nothing about that specification can be shown or claimed.

${specRows.filter((x) => x.r).map(({ s, r }) => `## ${s.title}: statement by statement

| Ref | Statement | Status | Lessons | Diagrams | Explained questions | Note |
|---|---|---|---|---|---|---|
${r.rows.map((row) => { const ls = row.link?.lessons || []; const ins = ls.map((l) => byId.get(l.id)).filter(Boolean); return `| ${row.ref} | ${(row.title || row.text).slice(0, 90).replace(/\|/g, "/")} | ${COVERAGE[row.status].name}${row.link?.status === "proposed" ? " (proposal)" : ""} | ${ls.map((l) => `${l.id}${l.coverage === "partial" ? " (part)" : ""}`).join(", ") || "–"} | ${ins.reduce((m, l) => m + l.diagrams.length, 0)} | ${ins.reduce((m, l) => m + l.explainedQuestions, 0)} | ${(row.link?.gap || "").replace(/\|/g, "/")} |`; }).join("\n")}`).join("\n\n")}
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, a, b] = process.argv.slice(2), arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
  const date = new Date().toISOString().slice(0, 10);
  if (cmd === "import") { const d = importSpec(a, b, { version: arg("--version"), source: arg("--source"), checked: arg("--checked") }); console.log(`${d.statements.length} statements → data/curriculum/specs/${a}.json (${d.importedBy})`); }
  else if (cmd === "propose") {
    const st = loadStatements(a); if (!st) { console.error(`No statements for ${a}: import the official specification first.`); process.exit(2); }
    const s = SPECS.find((x) => x.id === a), lessons = await lessonsOf(COURSE_OF[s.subject]);
    const map = mergeProposals(loadMap(a) || { spec: a, specVersion: st.version, links: {} }, propose(st.statements, lessons));
    mkdirSync(new URL("kit/curriculum/maps/", root), { recursive: true }); writeFileSync(mapPath(a), `${JSON.stringify(map, null, 1)}\n`);
    console.log(`Proposals written to kit/curriculum/maps/${a}.json: review each, then set status "verified" with reviewer and reviewedOn.`);
  } else if (cmd === "inventory") { mkdirSync(new URL("data/curriculum/inventory/", root), { recursive: true }); const inv = await inventory(a); writeFileSync(new URL(`data/curriculum/inventory/${a}.json`, root), `${JSON.stringify(inv, null, 1)}\n`); console.log(`${inv.length} ${a} lessons → data/curriculum/inventory/${a}.json`); }
  else if (cmd === "report") { mkdirSync(new URL("docs/curriculum/", root), { recursive: true }); writeFileSync(new URL(`docs/curriculum/${a.toUpperCase()}-COVERAGE.md`, root), await subjectReport(a, date)); console.log(`docs/curriculum/${a.toUpperCase()}-COVERAGE.md`); }
  else { console.error("usage: import | propose | inventory | report (see the top of this file)"); process.exit(2); }
}
