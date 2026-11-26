// The curriculum engine's Node side: fetch and import a specification, propose lesson links, write review sheets and
// apply a reviewer's decisions, build a subject's inventory, and report. The rules (statuses, claims, where a learner
// stands) live in kit/curriculum/mapping.js.
//
//   node scripts/curriculum/engine.mjs fetch <specId>          download the official PDF (uk.js `document`), check its SHA-1
//   node scripts/curriculum/engine.mjs import <specId> [file]  extract its statements (default: the fetched PDF)
//        a file other than the registered PDF also needs --version <v> --source <url> --checked <YYYY-MM-DD>
//   node scripts/curriculum/engine.mjs propose <specId>        suggest lessons for unreviewed statements (never verified)
//   node scripts/curriculum/engine.mjs review <specId>         a review sheet (CSV, local: it holds the statement text)
//   node scripts/curriculum/engine.mjs apply <specId> <file.csv>   record a reviewer's decisions from a review sheet
//   node scripts/curriculum/engine.mjs inventory <subject>     every lesson with objectives, diagrams and questions
//   node scripts/curriculum/engine.mjs report <subject>        docs/curriculum/<SUBJECT>-COVERAGE.md and one report per
//                                                              imported specification
//
// Specification text is the awarding body's copyright (AQA: "All rights reserved"; registered centres may copy it for
// internal use), and this repository is public. So a specification is kept in two files:
//   data/curriculum/specs/<id>.json    the statements with their text: LOCAL ONLY (.gitignore), rebuilt exactly from
//                                      the official PDF by `fetch` + `import`
//   kit/curriculum/specs/<id>.json     the index, committed: provenance, sections (AQA's headings), and every
//                                      statement's ref, kind, flags, page and a fingerprint of its text, never the text
// Maps, reports and tests use only the index, so they work without the text; review sheets need the text.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { lessonsOf } from "../growth/lesson-readiness.mjs";
import { parseTable, readText } from "../growth/sources.mjs";
import { SPECS, BODIES, QUAL_TYPES, specsFor, nationsOf, NATIONS } from "../../kit/curriculum/uk.js";
import { coverageReport, claimFor, checkMap, COVERAGE } from "../../kit/curriculum/mapping.js";
import { pdfLayout, fileHash, textHash } from "./layout.mjs";
import { extractAqa } from "./aqa.mjs";

const root = new URL("../../", import.meta.url);
export const statementsPath = (id) => new URL(`data/curriculum/specs/${id}.json`, root);
export const indexPath = (id) => new URL(`kit/curriculum/specs/${id}.json`, root);
export const sourcePath = (id) => new URL(`data/curriculum/sources/${id}.pdf`, root);
export const reviewPath = (id) => new URL(`data/curriculum/review/${id}.csv`, root);
export const mapPath = (id) => new URL(`kit/curriculum/maps/${id}.json`, root);
const load = (u) => (existsSync(u) ? JSON.parse(readFileSync(u, "utf8")) : null);
const write = (u, data) => { mkdirSync(new URL("./", u), { recursive: true }); writeFileSync(u, typeof data === "string" ? data : `${JSON.stringify(data, null, 1)}\n`); };
export const loadIndex = (id) => load(indexPath(id));
/** the statements with their text when they've been imported here, else the committed index (refs, no text) */
export const loadStatements = (id) => load(statementsPath(id)) || loadIndex(id);
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
// ---------- what kind of requirement each statement is (Master Plan, decision B; RULES.md rule 3) ----------
export const REQ_STATUSES = ["statutory", "official", "attainment", "developmental", "recommended", "supplementary"];
export const REQ_TYPES = ["spec-bullet", "assessment-objective", "practical", "guidance"];
/** a statement's requirement type from the kind its extractor gave it (AQA: content, skill, practical) */
export const reqTypeOf = (x) => ({ practical: "practical", objective: "assessment-objective", "assessment-objective": "assessment-objective", guidance: "guidance" })[x.kind] || "spec-bullet";
/** problems with a committed index's requirement records: version, publication date, period, status and type */
export function checkIndex(idx) {
  const p = [], at = idx?.spec || "(index)";
  if (!idx?.version) p.push(`${at}: no specification version`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(idx?.published || "")) p.push(`${at}: no publication date (published, YYYY-MM-DD)`);
  if (!/^\d{4}(-\d{2}(-\d{2})?)?$/.test(idx?.applies?.from || "") || !(idx.applies.to === null || /^\d{4}(-\d{2}(-\d{2})?)?$/.test(idx.applies.to))) p.push(`${at}: no applicable period (applies: { from, to }, to null while current)`);
  const bad = (idx?.statements || []).filter((x) => !REQ_STATUSES.includes(x.status) || !REQ_TYPES.includes(x.type));
  if (bad.length) p.push(`${at}: ${bad.length} statements without a valid status and type (first ${bad[0].ref}): re-import it`);
  return p;
}
/** the committed index of a specification: everything but the statement text (pure) */
export function indexOf(doc) {
  const { statements, sections, ...meta } = doc;
  const kinds = {}; for (const x of statements) kinds[x.kind || "statement"] = (kinds[x.kind || "statement"] || 0) + 1;
  return {
    ...meta,
    licence: "Statement text is the awarding body's copyright and is not in this repository: rebuild it with `engine.mjs fetch` and `import`. Sections carry the document's own headings; refs ending in a letter are Gradify's subdivision of a numbered section.",
    counts: { statements: statements.length, ...kinds, higherTier: statements.filter((x) => x.higherTier).length, biologyOnly: statements.filter((x) => x.biologyOnly).length, sections: (sections || []).length },
    sections: sections || [],
    statements: statements.map(({ text, scope, links, title, ...x }) => ({ ...x, ...(scope?.length ? { scoped: scope.length } : {}), hash: textHash(text) })),
  };
}

/** download the registered official document and check it is the version recorded in uk.js */
export async function fetchSpec(id) {
  const s = SPECS.find((x) => x.id === id), d = s?.document;
  if (!d?.url || !d?.sha1) throw new Error(`${id} has no official document (url and sha1) in kit/curriculum/uk.js`);
  const res = await fetch(d.url);
  if (!res.ok) throw new Error(`${d.url}: HTTP ${res.status} (is the host allowed by this environment's network?)`);
  const buf = Buffer.from(await res.arrayBuffer()), out = sourcePath(id);
  mkdirSync(new URL("./", out), { recursive: true }); writeFileSync(out, buf);
  const got = fileHash(out.pathname);
  if (got !== d.sha1) throw new Error(`${d.url} has SHA-1 ${got}, not ${d.sha1}: the awarding body has published a different file. Check its version before importing, then update uk.js`);
  return { file: out.pathname, sha1: got, bytes: buf.length };
}

/**
 * Import a specification's statements. The registered official PDF (fetched, SHA-1 checked) needs nothing else: its
 * provenance comes from uk.js. Any other file (a newer version, or a reviewer's CSV transcription) needs --version,
 * --source and --checked. Writes the statements (local) and the index (committed).
 */
export function importSpec(id, file, { version, source, checked } = {}) {
  const s = SPECS.find((x) => x.id === id); if (!s) throw new Error(`no specification ${id} in kit/curriculum/uk.js`);
  file ||= sourcePath(id).pathname;
  if (!existsSync(file)) throw new Error(`${file} not found: run \`engine.mjs fetch ${id}\` first, or give a file`);
  const pdf = /\.pdf$/i.test(file), sha1 = pdf ? fileHash(file) : null, registered = pdf && s.document?.sha1 === sha1;
  if (!registered && (!version || !source || !/^\d{4}-\d{2}-\d{2}$/.test(checked || ""))) throw new Error(pdf && s.document ? `this PDF (SHA-1 ${sha1}) isn't the registered ${s.document.version}: if it's a newer official version, give --version, --source and --checked, then update uk.js` : "--version, --source (the official URL) and --checked YYYY-MM-DD are required");
  const doc = { spec: id, title: s.title, code: s.code };
  if (pdf && s.body === "aqa") {
    const r = extractAqa(pdfLayout(file));
    Object.assign(doc, { extractedBy: "scripts/curriculum/aqa.mjs from the PDF's layout (pdftotext -bbox-layout)", sections: r.sections, statements: r.statements });
  } else {
    const statements = /\.csv$/i.test(file) ? parseSpecCsv(readText(readFileSync(file))) : parseSpecText(pdf ? execFileSync("pdftotext", ["-layout", file, "-"], { encoding: "utf8", maxBuffer: 64e6 }) : readFileSync(file, "utf8"));
    Object.assign(doc, { extractedBy: /\.csv$/i.test(file) ? "transcribed (CSV)" : "parsed from numbered headings: a first draft, check against the document", statements });
  }
  if (!doc.statements.length) throw new Error("no statements found: check the file, or transcribe a CSV");
  const d = registered ? s.document : {};
  Object.assign(doc, { version: version || d.version, versionDate: d.versionDate || null, source: source || d.url, sha1, checkedOn: checked || d.checkedOn, pages: d.pages || null });
  // keep the provenance first in the file
  // each statement says what kind of requirement it is; the index says when the document applies (decision B)
  const statements = doc.statements.map((x) => ({ ...x, status: REQ_STATUSES.includes(x.status) ? x.status : s.status || "official", type: reqTypeOf(x) }));
  const applies = { from: s.applies?.from ?? (s.firstTeaching ? String(s.firstTeaching) : null), to: s.applies?.to ?? null };
  const ordered = { spec: doc.spec, title: doc.title, code: doc.code, version: doc.version, versionDate: doc.versionDate, published: doc.versionDate, applies, source: doc.source, sha1: doc.sha1, checkedOn: doc.checkedOn, pages: doc.pages, extractedBy: doc.extractedBy, sections: doc.sections, statements };
  write(statementsPath(id), ordered);
  write(indexPath(id), indexOf(ordered));
  return ordered;
}

// ---------- proposing links (a matcher suggests; only a reviewer verifies) ----------
// Words that say nothing about the biology: function words, and the verbs and boilerplate specifications use for
// every statement ("students should be able to explain …"). The stemmer below turns "this" into "thi", so both forms.
const STOP = new Set(`a an the and or of to in on for with by from as at is are be been being was were this thi that these those how why what which who whom whose where when their its it they them there then than into onto between within including include includes such some any all each every both either other others another more most much many few less least very can could may might must shall should would will not no nor only also just even still yet so if but because while about above below over under after before during through up down out off again further once here same own too
students student able describe explain understand know knowledge recall use using used uses state identify discuss evaluate compare suggest interpret apply calculate show give make made making makes way ways one two three first second new example examples simple simply main different differ term terms appropriate provided information given relate related relating level levels idea ideas include process processes role roles important importance effect effects type types range number numbers part parts form forms well have has having had do does doing done get gets mean means change changes changing result results lead leads cause causes allow allows need needs required require study affect affects affecting affected factor factors rate rates increase increases increased reduce reduces reduced local global rapidly people time times large small high low good better best`.split(/\s+/));
export const tokens = (s) => String(s ?? "").toLowerCase().replace(/\*\*|`|\^\{|_\{|[{}]/g, "").match(/[a-z][a-z0-9'-]+/g)?.map((w) => w.replace(/'s$/, "").replace(/(ies)$/, "y").replace(/(?<=[a-z]{3})(es|s)$/, "")).filter((w) => w.length > 2 && !STOP.has(w)) || [];
/** a lesson as matchable text: title (weighted), objectives, headings, key terms, summary and lead */
export function lessonDoc(x) {
  const L = x.L, heads = L.blocks.filter((b) => b.t === "h").map((b) => b.x);
  return [L.title, L.title, L.title, ...L.objectives, ...heads, ...L.terms.map(([t]) => t), ...L.terms.map(([t]) => t), ...(L.summary || []), L.lead].join(" ");
}
export const MATCHER = "matcher v2 (BM25 on lesson titles, objectives, headings and key terms; statement text, its section title at half weight, and the fit to its whole section)";
/**
 * Confidence in a proposal, from its score, `share` (the part of the statement's distinctive vocabulary, weighted by
 * how rare each word is across Gradify's lessons, that the lesson also uses: a word no lesson uses counts against
 * every lesson) and `fit` (how well the lesson fits the statement's whole AQA section, 1 = the section's best):
 *   strong    score ≥ 16 and share ≥ 0.4                         likely the lesson that teaches it (still to review)
 *   moderate  score ≥ 9 and share ≥ 0.25, or the section's best
 *             lesson (fit ≥ 0.9) sharing at least 0.12            a related lesson; may teach all or part of it
 *   weak      anything else                                      shares some words; probably not the lesson
 * A statement whose best candidate is weak is listed as a likely gap. Calibrated on a spot-check of 40 statements
 * (docs/curriculum/AQA-GCSE-BIOLOGY-8461.md); a band is a reviewer's starting point, never a decision.
 */
export const band = (score, share, fit = 0) => (score >= 16 && share >= 0.4 ? "strong" : (score >= 9 && share >= 0.25) || (fit >= 0.9 && share >= 0.12) ? "moderate" : "weak");
/**
 * BM25 ranking of lessons for each statement: [{ ref, candidates: [{ id, title, score, share, band, matched }] }].
 * The statement's own words count in full; `context` (its AQA section title) counts at half weight, so a section
 * heading helps place a short statement without outweighing what the statement says. Statements in one section
 * usually belong to the same few lessons, so a lesson that fits the whole section (`group`, all its statements
 * together) gains up to `groupBoost` points: that settles short statements ("MRSA is resistant to antibiotics.")
 * that share few words with anything.
 */
export function propose(statements, lessons, { top = 3, k1 = 1.2, b = 0.75, context = (s) => s.title || "", contextWeight = 0.5, group = (s) => s.section, groupBoost = 8 } = {}) {
  const docs = lessons.map((x) => ({ id: x.id, title: x.L.title, unit: x.u.title, t: tokens(lessonDoc(x)) }));
  const N = docs.length, avg = docs.reduce((m, d) => m + d.t.length, 0) / N, df = new Map();
  for (const d of docs) for (const w of new Set(d.t)) df.set(w, (df.get(w) || 0) + 1);
  const idf = (w) => Math.log(1 + (N - (df.get(w) || 0) + 0.5) / ((df.get(w) || 0) + 0.5));
  const tf = docs.map((d) => { const m = new Map(); for (const w of d.t) m.set(w, (m.get(w) || 0) + 1); return m; });
  const bm = (i, w) => { const f = tf[i].get(w); return f ? idf(w) * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * docs[i].t.length) / avg))) : 0; };
  // how well each lesson fits each section as a whole, 0–1 (1 = the section's best lesson)
  const fit = new Map();
  if (group) {
    const by = new Map(); for (const s of statements) { const g = group(s); if (g) by.set(g, [...(by.get(g) || []), s]); }
    for (const [g, ss] of by) {
      const q = [...new Set(tokens(`${context(ss[0])} ${ss.map((x) => x.text).join(" ")}`))];
      const sc = docs.map((_, i) => q.reduce((m, w) => m + bm(i, w), 0)), max = Math.max(...sc) || 1;
      fit.set(g, sc.map((v) => v / max));
    }
  }
  return statements.map((s) => {
    const own = [...new Set(tokens(s.text))], ctx = [...new Set(tokens(context(s)))].filter((w) => !own.includes(w));
    const mass = own.reduce((m, w) => m + idf(w), 0) || 1, g = group ? fit.get(group(s)) : null;
    const scored = docs.map((d, i) => {
      let sc = 0, got = 0; const hit = [];
      for (const w of own) { const v = bm(i, w); if (v) { sc += v; got += idf(w); hit.push(w); } }
      for (const w of ctx) { const v = bm(i, w); if (v) { sc += contextWeight * v; hit.push(w); } }
      const sectionFit = g ? Math.round(g[i] * 100) / 100 : 0;
      // the section's fit only adds to a lesson that shares something with the statement itself
      const score = Math.round((sc + (got ? groupBoost * sectionFit ** 2 : 0)) * 100) / 100, share = Math.round((got / mass) * 100) / 100;
      return { id: d.id, title: d.title, unit: d.unit, score, share, sectionFit, band: band(score, share, sectionFit), matched: hit.sort((x, y) => idf(y) - idf(x)) };
    }).filter((c) => c.score > 0).sort((a, c) => c.score - a.score);
    return { ref: s.ref, candidates: scored.slice(0, top), unmatched: own.filter((w) => !df.get(w)) };
  });
}
/**
 * Add proposals to a map for statements nobody has decided on; verified links and AI decisions are never touched. Proposed lessons
 * are the strong and moderate candidates within 70% of the best score; every proposed lesson is "partial" until a
 * reviewer decides, so nothing proposed can read as covered. A statement with only weak candidates is a likely gap.
 */
export function mergeProposals(map, proposals, { keep = 0.7 } = {}) {
  const out = { ...map, links: { ...(map.links || {}) } };
  for (const p of proposals) {
    // a person's review and an AI reviewer's decision are never replaced by a proposal (their candidates are kept)
    if (["verified", "ai-confirmed", "rejected"].includes(out.links[p.ref]?.status)) continue;
    const best = p.candidates[0], use = p.candidates.filter((c) => c.band !== "weak" && c.score >= keep * (best?.score || 0));
    const evidence = (c) => ({ id: c.id, coverage: "partial", confidence: c.band, score: c.score, share: c.share, matched: c.matched.slice(0, 8) });
    // a withdrawn verification and an earlier AI check stay with the statement through new proposals
    const was = out.links[p.ref], history = { ...(was?.revoked ? { revoked: was.revoked } : {}), ...(was?.aiCheck ? { aiCheck: was.aiCheck } : {}) };
    out.links[p.ref] = { ...(use.length
      ? { status: "proposed", proposedBy: MATCHER, confidence: use[0].band, lessons: use.map(evidence) }
      : { status: "proposed", proposedBy: MATCHER, confidence: "none", lessons: [], gap: "likely gap: no lesson shares enough of the statement's vocabulary (to confirm)", nearest: p.candidates.slice(0, 2).map(evidence), ...(p.unmatched.length ? { notInGradify: p.unmatched.slice(0, 8) } : {}) }), ...history };
  }
  return out;
}

/** propose links for every unreviewed statement of an imported specification and write the map */
export async function proposeFor(id) {
  const st = load(statementsPath(id));
  if (!st) throw new Error(`No statement text for ${id} here: run \`engine.mjs fetch ${id}\` and \`import ${id}\` (the text is local only).`);
  const s = SPECS.find((x) => x.id === id), lessons = await lessonsOf(COURSE_OF[s.subject]);
  const titles = new Map((st.sections || []).map((x) => [x.ref, x.title]));
  const prior = loadMap(id), map = mergeProposals(prior && prior.specVersion === st.version ? prior : { spec: id, specVersion: st.version, links: {} }, propose(st.statements, lessons, { context: (x) => titles.get(x.section) || x.title || "" }));
  // keep the map in document order, with the matcher named once
  const order = st.statements.map((x) => x.ref);
  const out = { spec: id, specVersion: st.version, proposedBy: MATCHER, proposedOn: new Date().toISOString().slice(0, 10), links: Object.fromEntries(order.map((r) => [r, map.links[r]])) };
  for (const l of Object.values(out.links)) if (l.proposedBy === MATCHER) delete l.proposedBy;
  write(mapPath(id), out);
  return out;
}

// ---------- review: a sheet per specification, and applying a reviewer's decisions ----------
const cell = (v) => { const t = String(v ?? ""); return /[",\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t; };
export const REVIEW_COLUMNS = ["ref", "section", "section_title", "pdf_page", "kind", "tier", "biology_only", "statement", "aqa_limits", "matcher_confidence", "ai_check", "proposal_1", "evidence_1", "proposal_2", "evidence_2", "proposal_3", "evidence_3", "decision", "lessons", "note", "reviewer", "reviewed_on"];
/**
 * A review sheet: one row per statement, with the statement, AQA's limits on it, the matcher's proposals and their
 * evidence, and empty decision columns. Holds the specification's text, so it stays local (data/curriculum/review/).
 * ai_check shows what an AI reviewer said, if one has looked: evidence only, never a decision. A reviewer fills in, per
 * row, for that statement alone (confirming one statement never confirms another mapped to the same lesson):
 *   decision     full | partial | missing (blank: not reviewed yet, stays awaiting), or revoke to withdraw an
 *                earlier verification (the statement is uncovered again and will be written)
 *   lessons      the lesson ids that teach it, space-separated (blank: the proposed ones). For "partial", the ids
 *                that teach part of it; mark one as fully teaching it with "=full" ("u02-03=full u02-05")
 *   note         always: for full, the evidence (which part of the lesson teaches it); for partial, what isn't taught;
 *                for missing, what a lesson would need to teach; for revoke, why
 *   reviewer, reviewed_on (YYYY-MM-DD)
 * Only "full" counts as taught and stops the content engine writing the statement (scripts/content/mapstore.mjs).
 */
export function reviewSheet(st, map, lessonsById) {
  const titles = new Map((st.sections || []).map((x) => [x.ref, x.title]));
  const lessonLine = (l) => { const x = lessonsById.get(l.id); return x ? `${l.id}: ${x.title} (${x.unit}${x.level ? `; ${x.level}` : ""})` : l.id; };
  const rows = st.statements.map((x) => {
    const link = map?.links?.[x.ref] || {}, cand = link.lessons?.length ? link.lessons : link.nearest || [];
    const done = link.status === "verified";
    const props = [0, 1, 2].flatMap((i) => { const c = cand[i]; return c ? [lessonLine(c), `${c.confidence || ""}; score ${c.score}; shares ${Math.round((c.share || 0) * 100)}% of its distinctive words: ${(c.matched || []).join(", ")}`] : ["", ""]; });
    const ai = link.status === "ai-confirmed" ? `yes: ${(link.lessons || []).map((l) => `${l.id}${l.objectives?.length ? ` @${l.objectives.join(",")}` : ""}`).join(" ")} (${link.by}, ${link.on})` : link.status === "rejected" ? `no: ${(link.missing || []).join("; ")} (${link.by}, ${link.on})` : link.aiCheck ? `${link.aiCheck.verdict} (${link.aiCheck.by}, ${link.aiCheck.on})` : "";
    return [x.ref, x.section, titles.get(x.section) || "", x.page, x.kind, x.higherTier ? "higher" : "both", x.biologyOnly ? "yes" : "no", x.text, (x.scope || []).join(" "), link.status === "verified" ? link.matcherConfidence || "" : link.lessons?.length || link.candidates?.length ? link.confidence : "likely gap", ai, ...props,
      done ? (link.lessons.length ? (link.lessons.some((l) => l.coverage === "full") ? "full" : "partial") : "missing") : "", done ? link.lessons.map((l) => (l.coverage === "full" ? `${l.id}=full` : l.id)).join(" ") : "", done ? (link.gap || link.lessons.map((l) => l.note).filter(Boolean).join("; ")) : "", done ? link.reviewer : "", done ? link.reviewedOn : ""];
  });
  return `${[REVIEW_COLUMNS, ...rows].map((r) => r.map(cell).join(",")).join("\n")}\n`;
}

/**
 * Apply a reviewer's decisions (rows of a review sheet) to a map. Rows without a decision are left as they are.
 * Every decision is checked: a known statement, known lessons, a reviewer and a date, a note for partial and missing.
 * Returns { map, applied, problems }; nothing is applied when there are problems.
 */
export function applyReview(st, map, rows, lessonIds, { now = new Date() } = {}) {
  const out = { ...map, links: { ...(map.links || {}) } }, problems = [], refs = new Set(st.statements.map((x) => x.ref));
  if (map.specVersion && map.specVersion !== st.version) problems.push(`the map is for version ${map.specVersion}, the statements are version ${st.version}: propose again first`);
  let applied = 0;
  for (const r of rows) {
    const d = (r.decision || "").trim().toLowerCase(); if (!d) continue;
    const ref = (r.ref || "").trim(), at = `${ref || "(no ref)"}`;
    if (!refs.has(ref)) { problems.push(`${at}: not a statement of ${st.spec}`); continue; }
    if (!["full", "partial", "missing", "revoke"].includes(d)) { problems.push(`${at}: decision must be full, partial, missing or revoke, not "${r.decision}"`); continue; }
    if (!(r.reviewer || "").trim() || !/^\d{4}-\d{2}-\d{2}$/.test((r.reviewed_on || "").trim())) { problems.push(`${at}: a decision needs reviewer and reviewed_on (YYYY-MM-DD)`); continue; }
    const note = (r.note || "").trim();
    // every decision records why: the evidence for full, what's missing for partial and missing, the reason for revoke
    if (!note) { problems.push(`${at}: ${d} needs a note (${{ full: "the evidence: which part of the lesson teaches it", partial: "what isn't taught", missing: "what a lesson would need to teach", revoke: "why the verification is withdrawn" }[d]})`); continue; }
    const prior = out.links[ref] || {};
    const recordedAt = now.toISOString();
    // an AI check made before this decision is kept beside it, as evidence, never as the decision
    const aiCheck = prior.status === "ai-confirmed" || prior.status === "rejected" ? { verdict: prior.status === "ai-confirmed" ? `yes: ${(prior.lessons || []).map((l) => l.id).join(" ")}` : `no: ${(prior.missing || []).join("; ")}`, by: prior.by, on: prior.on } : prior.aiCheck;
    if (d === "revoke") {
      if (prior.status !== "verified") { problems.push(`${at}: revoke needs an earlier verification to withdraw (this statement is ${prior.status || "unmapped"})`); continue; }
      const was = { reviewer: prior.reviewer, reviewedOn: prior.reviewedOn, lessons: prior.lessons, ...(prior.note ? { note: prior.note } : {}), ...(prior.gap ? { gap: prior.gap } : {}) };
      out.links[ref] = { status: "proposed", ...(prior.matcherConfidence ? { confidence: prior.matcherConfidence } : {}), lessons: (prior.lessons || []).map((l) => ({ id: l.id, coverage: "partial" })), ...(aiCheck ? { aiCheck } : {}),
        revoked: [...(prior.revoked || []), { reviewer: r.reviewer.trim(), on: r.reviewed_on.trim(), recordedAt, why: note, was }] };
      applied++; continue;
    }
    const given = (r.lessons || "").trim().split(/[\s,;]+/).filter(Boolean).map((t) => { const [id, cov] = t.split("="); return { id, full: cov === "full" }; });
    const ids = d === "missing" ? [] : given.length ? given : (prior.lessons || []).map((l) => ({ id: l.id, full: false }));
    const unknown = ids.filter((l) => !lessonIds.has(l.id)).map((l) => l.id);
    if (unknown.length) { problems.push(`${at}: unknown lesson ${unknown.join(", ")}`); continue; }
    if (d !== "missing" && !ids.length) { problems.push(`${at}: ${d} needs the lessons that teach it`); continue; }
    if (new Set(ids.map((l) => l.id)).size !== ids.length) { problems.push(`${at}: a lesson is listed twice`); continue; }
    // "full": every listed lesson counts as teaching it fully unless some are marked; "partial": none fully
    const anyMarked = ids.some((l) => l.full);
    const lessons = ids.map((l) => ({ id: l.id, coverage: d === "full" && (!anyMarked || l.full) ? "full" : "partial", ...(d === "partial" ? { note } : {}) }));
    const sx = st.statements.find((x) => x.ref === ref), hash = sx?.hash || (sx?.text ? textHash(sx.text) : undefined);
    out.links[ref] = { status: "verified", ...(hash ? { hash } : {}), reviewer: r.reviewer.trim(), reviewedOn: r.reviewed_on.trim(), recordedAt, lessons, ...(d === "missing" ? { gap: note } : d === "full" ? { note } : {}),
      ...(prior.confidence || prior.matcherConfidence ? { matcherConfidence: prior.confidence || prior.matcherConfidence } : {}), ...(aiCheck ? { aiCheck } : {}), ...(prior.revoked ? { revoked: prior.revoked } : {}) };
    applied++;
  }
  problems.push(...checkMap(st, out, lessonIds));
  return { map: problems.length ? map : out, applied: problems.length ? 0 : applied, problems };
}

// ---------- what the proposals say (never coverage: proposals only) ----------
/** proposals summarised for a report: bands, likely gaps, and lessons proposed for many statements (pure) */
export function proposalSummary(st, map) {
  const rows = st.statements.map((x) => ({ x, link: map?.links?.[x.ref] }));
  const proposed = rows.filter((r) => r.link?.status === "proposed");
  const by = (k) => proposed.filter((r) => (r.link.lessons?.length ? r.link.confidence : "none") === k).length;
  const lessons = new Map();
  for (const r of proposed) for (const l of r.link.lessons || []) { const e = lessons.get(l.id) || { id: l.id, refs: [], strong: 0 }; e.refs.push(r.x.ref); if (l.confidence === "strong") e.strong++; lessons.set(l.id, e); }
  return {
    proposed: proposed.length, strong: by("strong"), moderate: by("moderate"), gaps: by("none"),
    likelyGaps: proposed.filter((r) => !r.link.lessons?.length).map((r) => ({ ref: r.x.ref, section: r.x.section, page: r.x.page, kind: r.x.kind, higherTier: !!r.x.higherTier, biologyOnly: !!r.x.biologyOnly, nearest: r.link.nearest?.[0]?.id || null })),
    multi: [...lessons.values()].filter((e) => e.refs.length > 1).sort((a, b) => b.refs.length - a.refs.length || a.id.localeCompare(b.id)),
    unproposedLessons: null,
  };
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

| Specification | Body | Qualification | Nations | Code | Document checked | Statements | Covered | Partial | Missing | Awaiting verification |
|---|---|---|---|---|---|---|---|---|---|---|
${specRows.map(({ s, r }) => `| ${s.title} | ${BODIES[s.body].name} | ${QUAL_TYPES[s.qual].name} | ${nationsOf(s).map((n) => NATIONS[n].name).join(", ")} | ${s.code ?? "to confirm"} | ${s.confirmed ? "yes" : "no"} | ${r ? r.totals.statements : "not imported"} | ${r?.totals.covered ?? "–"} | ${r?.totals.partial ?? "–"} | ${r?.totals.missing ?? "–"} | ${r?.totals.awaiting ?? "–"} |`).join("\n")}

"Not imported" means the official specification's statements aren't in \`data/curriculum/specs/\` yet, so nothing about that specification can be shown or claimed.

${specRows.filter((x) => x.r).map(({ s, r }) => `**${s.title}:** ${r.totals.statements} statements imported; ${r.totals.statements - r.totals.awaiting} reviewed. Statement by statement, with the matcher's proposals: \`docs/curriculum/${reportName(s.id)}\`.`).join("\n\n")}
`;
}

export const reportName = (id) => { const s = SPECS.find((x) => x.id === id); return `${id.toUpperCase()}${s?.code ? `-${s.code}` : ""}.md`; };
const flagsOf = (x) => [x.higherTier ? "HT" : "", x.biologyOnly ? "bio only" : ""].filter(Boolean).join(", ");
/** one specification, statement by statement: provenance, verified coverage, and the matcher's proposals kept apart */
export function specReport(id, inv, date) {
  const s = SPECS.find((x) => x.id === id), st = loadStatements(id), map = loadMap(id);
  if (!st) return null;
  const r = coverageReport(st, map), sum = proposalSummary(st, map), claim = claimFor(st, map), byId = new Map(inv.map((l) => [l.id, l]));
  const titles = new Map((st.sections || []).map((x) => [x.ref, x.title])), top = (st.sections || []).filter((x) => x.ref.split(".").length === 2);
  const name = (lid) => `${lid} ${byId.get(lid)?.title || "(unknown lesson)"}`;
  const pct = (n, d) => (d ? `${Math.round((n / d) * 100)}%` : "–");
  const cnt = st.counts || indexOf(st).counts;
  const topicRows = top.map((t) => {
    const rows = r.rows.filter((x) => x.section === t.ref || x.section.startsWith(`${t.ref}.`)), links = rows.map((x) => map?.links?.[x.ref]);
    const conf = (k) => links.filter((l) => l?.status === "proposed" && (l.lessons?.length ? l.confidence : "none") === k).length;
    return `| ${t.ref} ${t.title} | ${rows.length} | ${rows.filter((x) => x.status !== "awaiting").length} | ${conf("strong")} | ${conf("moderate")} | ${conf("none")} |`;
  });
  const statementRows = r.rows.map((x) => {
    const l = x.link, ls = l?.lessons || [];
    const prop = l?.status === "verified" ? ls.map((y) => `${y.id}${y.coverage === "partial" ? " (part)" : ""}`).join(", ") || "–" : ls.length ? ls.map((y) => y.id).join(", ") : `none (nearest ${l?.nearest?.[0]?.id || "–"})`;
    return `| ${x.ref} | ${titles.get(x.section) || ""} | ${x.kind}${flagsOf(x) ? `; ${flagsOf(x)}` : ""} | ${x.page} | ${COVERAGE[x.status].name} | ${l?.status === "verified" ? "reviewed" : ls.length ? l.confidence : "likely gap"} | ${prop} |`;
  });
  return `# ${s.title} (${s.code}): specification map

Generated by \`node scripts/curriculum/engine.mjs report ${s.subject}\` on ${date}. How mapping and review work: \`docs/curriculum/README.md\`.

> **Status: not aligned.** ${r.totals.statements - r.totals.awaiting} of ${r.totals.statements} statements are reviewed. Gradify must not claim ${s.title} alignment or coverage${claim.allowed ? "" : ` (${claim.reason})`}. Everything under "Proposed" is the matcher's suggestion, to be reviewed; none of it is coverage.

## Source

| | |
|---|---|
| Document | ${st.title}, specification ${st.code} |
| Version | ${st.version}${st.versionDate ? ` (${st.versionDate})` : ""} |
| Official URL | ${st.source} |
| SHA-1 of the PDF | \`${st.sha1 || "–"}\` |
| Checked against the awarding body's site | ${st.checkedOn} |
| Extracted by | ${st.extractedBy} |

The statement text is AQA's copyright and isn't in this repository. Rebuild it locally with \`engine.mjs fetch ${id}\` then \`engine.mjs import ${id}\`; the fingerprints in \`kit/curriculum/specs/${id}.json\` confirm the rebuilt text is the same. To read a statement, open the PDF at the page given.

## What was extracted

${cnt.statements} statements from ${(st.sections || []).filter((x) => st.statements.some((y) => y.section === x.ref)).length} numbered sections of the subject content (4.1 to 4.7): ${cnt.content ?? "?"} content statements, ${cnt.skill ?? "?"} "students should be able to" statements and ${cnt.practical ?? "?"} required practicals. ${cnt.higherTier ?? "?"} are Higher Tier only and ${cnt.biologyOnly ?? "?"} are in GCSE Biology only (not Combined Science: Trilogy). ${st.statements.filter((x) => x.scoped || x.scope?.length).length} carry AQA's limits ("Limited to …", "… is not required"), kept with the statement they limit.

Each content paragraph in a section is one statement. A ref is AQA's section number plus a letter Gradify assigns in document order (\`4.1.1.2.c\` is the third statement in AQA section 4.1.1.2); required practicals keep AQA's numbers (\`4.1.1.2.RP1\`). Cite AQA by section number. Not mapped: 4.8 Key ideas (themes running through the content) and the working scientifically, maths and practical skills sections, which are assessed through the content.

${st.statements.filter((x) => x.check).length} statements contain a formula or equation laid out over several lines in the PDF: read those in the PDF (${st.statements.filter((x) => x.check).map((x) => x.ref).join(", ")}).

## Verified coverage

| Covered | Partially covered | Missing | Awaiting verification |
|---|---|---|---|
| ${r.totals.covered} | ${r.totals.partial} | ${r.totals.missing} | ${r.totals.awaiting} |

Only a reviewer's decision moves a statement out of "awaiting verification".

## Proposed (the matcher's suggestions, not coverage)

${sum.proposed} statements have proposals from ${map?.proposedBy || "the matcher"}${map?.proposedOn ? ` (${map.proposedOn})` : ""}: **${sum.strong} strong** (a lesson that very likely teaches it), **${sum.moderate} moderate** (a related lesson, which may teach all or part of it) and **${sum.gaps} likely gaps** (no lesson shares enough of the statement's vocabulary). A proposal is where a reviewer starts, never a decision: a strong match can still teach the idea at the wrong depth, and a likely gap can be taught under different words.

Gradify's Biology course is a first-year university course (levels "Year 1 · Foundation / Application / Biological reasoning"), not a GCSE course. Many lessons match AQA statements by topic but go further than GCSE, or lack the GCSE examples AQA names (named diseases, required practicals, GCSE calculations). Reviewers decide whether a lesson teaches the statement in a way a GCSE student can use; "partial" with a note is the honest answer when it doesn't.

| Topic | Statements | Reviewed | Strong | Moderate | Likely gap |
|---|---|---|---|---|---|
${topicRows.join("\n")}

### Likely gaps (${sum.likelyGaps.length})

Statements no lesson matched well enough. Each needs a reviewer to confirm it's a gap (then it becomes the content backlog) or name the lesson that teaches it.

| Ref | Section | Kind | PDF page | Nearest lesson (weak) |
|---|---|---|---|---|
${sum.likelyGaps.map((g) => `| ${g.ref} | ${titles.get(g.section) || ""} | ${st.statements.find((x) => x.ref === g.ref)?.kind}${flagsOf(g) ? `; ${flagsOf(g)}` : ""} | ${g.page} | ${g.nearest ? name(g.nearest) : "–"} |`).join("\n")}

### Lessons proposed for several statements (${sum.multi.length})

A lesson proposed for many statements is either central to the specification or matched for its broad vocabulary; reviewing it once against all its statements is quicker than one statement at a time.

| Lesson | Statements | Strong | Refs |
|---|---|---|---|
${sum.multi.map((e) => `| ${name(e.id)} | ${e.refs.length} | ${e.strong} | ${e.refs.join(", ")} |`).join("\n")}

${inv.filter((l) => !sum.multi.some((e) => e.id === l.id) && !st.statements.some((x) => map?.links?.[x.ref]?.lessons?.some((y) => y.id === l.id))).length} of ${inv.length} Biology lessons aren't proposed for any statement: mostly university content beyond GCSE (biochemistry, bioinformatics, research methods).

## Statement by statement

| Ref | Section | Kind | PDF page | Status | Matcher | Lessons |
|---|---|---|---|---|---|---|
${statementRows.join("\n")}
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, a, b] = process.argv.slice(2), arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
  const date = new Date().toISOString().slice(0, 10);
  try {
    if (cmd === "fetch") { const f = await fetchSpec(a); console.log(`${f.file}: ${f.bytes} bytes, SHA-1 ${f.sha1} (matches uk.js)`); }
    else if (cmd === "import") {
      const d = importSpec(a, b && !b.startsWith("--") ? b : null, { version: arg("--version"), source: arg("--source"), checked: arg("--checked") });
      console.log(`${d.statements.length} statements, version ${d.version} → data/curriculum/specs/${a}.json (local, with text) and kit/curriculum/specs/${a}.json (index, committed)`);
    } else if (cmd === "propose") {
      const m = await proposeFor(a), sum = proposalSummary(load(statementsPath(a)), m);
      console.log(`kit/curriculum/maps/${a}.json: ${sum.strong} strong, ${sum.moderate} moderate, ${sum.gaps} likely gaps. All proposed: review them (engine.mjs review ${a}).`);
    } else if (cmd === "review") {
      const st = load(statementsPath(a)); if (!st) throw new Error(`no statement text for ${a} here: fetch and import it first`);
      const s = SPECS.find((x) => x.id === a), inv = await inventory(s.subject);
      write(reviewPath(a), reviewSheet(st, loadMap(a), new Map(inv.map((l) => [l.id, l]))));
      console.log(`data/curriculum/review/${a}.csv (local: it holds the specification's text). Fill in decision, lessons, note, reviewer, reviewed_on; then engine.mjs apply ${a} <file>.`);
    } else if (cmd === "apply") {
      const st = loadStatements(a), s = SPECS.find((x) => x.id === a), inv = await inventory(s.subject);
      const res = applyReview(st, loadMap(a) || { spec: a, specVersion: st.version, links: {} }, parseTable(readText(readFileSync(b))), new Set(inv.map((l) => l.id)));
      if (res.problems.length) { console.error(`Nothing applied. ${res.problems.length} problems:\n  ${res.problems.join("\n  ")}`); process.exit(1); }
      write(mapPath(a), res.map); console.log(`${res.applied} decisions recorded in kit/curriculum/maps/${a}.json. Run engine.mjs report ${s.subject}.`);
      // the specification pages read the map through a generated file: refresh it now, so a verification or a
      // revocation shows there in the same commit
      const views = await (await import("./spec-view.mjs")).refreshLinks(a);
      if (views.length) console.log(`Specification pages updated: ${views.map((v) => `kit/specs/${v}.links.js`).join(", ")}.`);
    } else if (cmd === "inventory") { const inv = await inventory(a); write(new URL(`data/curriculum/inventory/${a}.json`, root), inv); console.log(`${inv.length} ${a} lessons → data/curriculum/inventory/${a}.json`); }
    else if (cmd === "report") {
      write(new URL(`docs/curriculum/${a.toUpperCase()}-COVERAGE.md`, root), await subjectReport(a, date)); console.log(`docs/curriculum/${a.toUpperCase()}-COVERAGE.md`);
      const inv = await inventory(a);
      for (const s of specsFor(a)) { const md = specReport(s.id, inv, date); if (md) { write(new URL(`docs/curriculum/${reportName(s.id)}`, root), md); console.log(`docs/curriculum/${reportName(s.id)}`); } }
    } else { console.error("usage: fetch | import | propose | review | apply | inventory | report (see the top of this file)"); process.exit(2); }
  } catch (e) { console.error(e.message); process.exit(1); }
}
