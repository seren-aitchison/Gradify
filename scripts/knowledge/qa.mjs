// Automated quality assurance for an assembled lesson, its review record and lifecycle, and impact analysis.
//
// Nine dimensions, each a list of checks. A check that fails is either
//   fail     the lesson can't go to a reviewer: it goes back to "generated" for revision
//   review   it goes to the reviewer with this flagged (a judgement a person must make)
// A lesson with no failures moves generated → automated-qa → expert-review, and waits for a named reviewer.
// Nothing here approves or publishes: approval is a person's decision, recorded with their name (review()).
import { loadKnowledge, loadSources, load, at, itemHash, tokens, today, passagesOf, longestSharedRun } from "./lib.mjs";
import { templateFor, depthOf, rankOf, inRange, LEVELS, TEMPLATES } from "../../kit/knowledge/templates.js";
import { COMPUTE } from "../../kit/knowledge/questions.js";
import { checkLesson, NEXT } from "../../kit/knowledge/schema.js";
import { parseNotes } from "../../kit/course/notes.js";
import { resolve } from "../../kit/knowledge/forms.js";
import { checkDataClaims, pointsOf, linearFit, xIntercept } from "../../kit/knowledge/stats.js";
import { categoryOf, usesOf } from "../../kit/knowledge/schema.js";
import { formHash } from "./assemble.mjs";
import { loadIndex } from "../curriculum/engine.mjs";

export const DIMENSIONS = {
  accuracy: "Scientifically correct: knowledge reviewed and evidenced, calculations and diagrams recomputed",
  coverage: "Every part of the requirement is taught",
  depth: "Nothing above the qualification's level",
  terminology: "Every term the lesson uses is defined; the requirement's own terms are taught",
  explanation: "The template's components are there; the prose suits the level",
  visuals: "A diagram where the template needs one; accurate, labelled in the lesson's terms, described",
  assessment: "Enough questions, of the right kinds, testing every objective, parsed by the course engine",
  accessibility: "Alt text and descriptions, text labels (not colour alone), readable prose",
  sources: "Traceable sources; nothing copied from a source whose licence forbids it; attribution given",
};
const c = (name, ok, detail = "", severity = "fail") => ({ name, ok: !!ok, severity, ...(detail ? { detail } : {}) });

// ---------- readability (Flesch–Kincaid grade), for the prose a learner reads ----------
const syllables = (w) => { w = w.toLowerCase().replace(/[^a-z]/g, ""); if (w.length <= 3) return 1; const m = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "").match(/[aeiouy]{1,2}/g); return Math.max(1, m ? m.length : 1); };
export function fkGrade(text) {
  const sentences = String(text).split(/[.!?]+(?:\s|$)/).filter((s) => /[a-z]/i.test(s)), words = String(text).match(/[A-Za-z][A-Za-z'-]*/g) || [];
  if (!sentences.length || !words.length) return null;
  return Math.round((0.39 * (words.length / sentences.length) + 11.8 * (words.reduce((m, w) => m + syllables(w), 0) / words.length) - 15.59) * 10) / 10;
}
/** the prose a learner reads (explanations, steps, cases, mistakes), without markup or the "where this leads" section */
export function proseOf(notes) {
  const out = [];
  let later = false;
  for (const l of notes.split("\n")) {
    if (l.startsWith("H: ")) later = l === "H: Where this leads";
    if (later) continue;
    const m = l.match(/^(P|S|K|!|X|SUM):\s*(.*)$/) || l.match(/^(-|>)\s+(.*)$/);
    if (!m || / · /.test(m[2])) continue;   // data rows aren't prose
    let t = m[2].replace(/\*\*/g, "").replace(/\*/g, "").replace(/"/g, "").trim();
    if (!/[.!?:]$/.test(t)) t += ".";   // a bullet is its own sentence
    out.push(t);
  }
  return out.join(" ");
}

/** the words a diagram shows, by renderer, so QA can check they are the lesson's words */
export function labelsOf(s) {
  if (s.renderer === "osmosisbox") return [...s.sides.map((x) => x.label), s.membrane?.label, s.net?.label].filter(Boolean);
  if (s.renderer === "cellmap") return s.labels.map((l) => s.names?.[l] || l);
  if (s.renderer === "graph") return (s.axisLabels || []).map((l) => l.replace(/\(.*\)/, ""));
  if (s.renderer === "magnification") return ["magnification", "image", "real"];
  if (s.renderer === "inducedfit") return (s.models || []).map((m) => m.name);
  return [s.title];
}
/** labels that run outside an SVG's viewBox (estimated from their text, size and anchor), as the diagram build checks */
export function labelsOutside(svg) {
  const vb = svg.match(/viewBox="([-\d.]+) ([-\d.]+) ([\d.]+) ([\d.]+)"/), W = vb ? +vb[3] : 0;
  const out = [];
  for (const [, attrs, inner] of svg.matchAll(/<text([^>]*)>([\s\S]*?)<\/text>/g)) {
    const x = +(attrs.match(/ x="([-\d.]+)"/)?.[1] ?? NaN), size = +(attrs.match(/font-size="([\d.]+)"/)?.[1] ?? 14), anchor = attrs.match(/text-anchor="(\w+)"/)?.[1] || "start";
    const t = inner.replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "x"), w = t.length * size * 0.56, lo = anchor === "start" ? x : anchor === "end" ? x - w : x - w / 2;
    if (Number.isFinite(x) && W && (lo < -1 || lo + w > W + 1)) out.push(t);
  }
  return out;
}
// "membranes" and "membrane" are the same word for coverage
export const stem = (w) => w.replace(/(?<=[a-z]{3})(es|e|s)$/, "");
// words a requirement uses that say nothing about its content ("carry out calculations involving…", "called", "due to")
export const GENERIC = new Set(["via", "across", "through", "move", "moved", "moves", "may", "way", "help", "called", "comparison", "compared", "due", "carry", "involving", "involve", "found", "given", "much", "one", "two", "calculation", "investigate", "investigation", "measure", "measuring"]);

/** the QA record for a lesson: { result: "pass" | "fail", fails, reviews, dimensions: { name: [checks] } } */
export function qa({ lesson, notes, assets, req }, { subject = lesson.subject } = {}) {
  const items = loadKnowledge(subject), byId = new Map(items.map((k) => [k.id, k])), sources = loadSources();
  const ev = load(at(`${subject}/evidence.json`))?.items || {}, tpl = templateFor(lesson.level, subject, { kind: lesson.requirementKind }), T = TEMPLATES[lesson.template] && { ...TEMPLATES[lesson.template], id: lesson.template };
  const inLesson = lesson.knowledge.map((k) => byId.get(k.id) && resolve(byId.get(k.id), lesson.level)).filter(Boolean), rank = rankOf(lesson.level);
  const atLevel = items.map((k) => resolve(k, lesson.level)).filter(Boolean);
  const prose = proseOf(notes), lessonWords = new Set(tokens(notes)), lessonStems = new Set([...lessonWords].map(stem)), L = parseNotes(notes)[0];
  const D = Object.fromEntries(Object.keys(DIMENSIONS).map((k) => [k, []]));

  // accuracy
  const changed = lesson.knowledge.filter((k) => !byId.get(k.id) || formHash(byId.get(k.id), lesson.level) !== k.formHash);
  D.accuracy.push(c("every knowledge item the lesson was built from still exists, its form for this level unchanged", !changed.length, changed.map((k) => k.id).join(", ")));
  const draft = inLesson.filter((k) => k.status !== "reviewed");
  D.accuracy.push(c("every knowledge item has been reviewed by a subject specialist", !draft.length, draft.length ? `${draft.length} of ${inLesson.length} items are drafts: ${draft.map((k) => k.id).join(", ")}` : "", "review"));
  const noEv = inLesson.filter((k) => !ev[k.id]?.passages?.length);
  D.accuracy.push(c("every knowledge item has supporting passages in its sources", !noEv.length, noEv.map((k) => k.id).join(", ")));
  const stale = inLesson.filter((k) => ev[k.id] && ev[k.id].itemHash !== itemHash(byId.get(k.id)));
  D.accuracy.push(c("the evidence was linked to the current version of each item", !stale.length, stale.map((k) => k.id).join(", ")));
  const weak = inLesson.filter((k) => ev[k.id] && ev[k.id].support < 0.3);
  D.accuracy.push(c("each item's sources contain most of its distinctive vocabulary (support ≥ 0.3)", !weak.length, weak.map((k) => `${k.id} (${ev[k.id].support}: check against ${ev[k.id].passages.map((p) => `${p.source}#${p.passage}`).join(", ")})`).join("; "), "review"));
  for (const k of inLesson.filter((x) => x.kind === "worked-example" && COMPUTE[x.compute?.fn])) {
    const got = COMPUTE[k.compute.fn](k.values);
    D.accuracy.push(c(`worked example "${k.title}": its answer recomputes`, Math.abs(got - k.values.answer) < 1e-9, `computed ${got}, stated ${k.values.answer}`));
  }
  // data: every claim a dataset makes, recomputed from its rows
  for (const k of inLesson.filter((x) => x.kind === "dataset")) for (const r of checkDataClaims(k.data)) D.accuracy.push(c(`${k.id}: "${r.claim}" recomputes from the data`, r.ok, r.detail));
  const fitOf = (id) => linearFit(pointsOf(inLesson.find((k) => k.id === id).data));
  const QCOMPUTE = { ...COMPUTE, fitAt: ({ item, x }) => { const f = fitOf(item); return f.slope * x + f.intercept; }, fitZero: ({ item }) => xIntercept(fitOf(item)) };
  for (const q of lesson.questions.filter((x) => x.compute)) {
    const got = QCOMPUTE[q.compute.fn](q.compute.inputs), r = Math.round(got * 10 ** q.compute.dp) / 10 ** q.compute.dp;
    D.accuracy.push(c(`question ${q.id}: its answer recomputes`, r === q.compute.answer, `computed ${r}, stated ${q.compute.answer}`));
  }
  for (const a of lesson.assets.filter((x) => x.origin === "generated")) D.accuracy.push(c(`diagram ${a.id}: every subject check passes`, a.checks.every((x) => x.ok) && a.checks.length > 0, a.checks.length ? a.checks.filter((x) => !x.ok).map((x) => x.name).join("; ") : "the renderer ran no checks"));
  for (const a of lesson.assets.filter((x) => x.origin === "library")) D.accuracy.push(c(`library diagram ${a.id} passed its own checks (status ${a.status})`, a.status && a.status !== "failed"));

  // coverage
  if (req) {
    D.coverage.push(c("the requirement is the version the lesson was built for", req.hash === lesson.requirement.hash, req.hash === lesson.requirement.hash ? "" : "the requirement's text changed: reassemble"));
    const parts = req.kind === "course" ? req.objectives : [req.text];
    for (const p of parts) {
      const want = [...new Set(tokens(p))].filter((w) => !GENERIC.has(w)), missing = want.filter((w) => !lessonStems.has(stem(w)));
      D.coverage.push(c(`the lesson teaches the requirement's content words${req.kind === "course" ? `: "${p}"` : ""}`, missing.length <= (req.kind === "course" ? Math.floor(want.length * 0.25) : 0), missing.length ? `not in the lesson: ${missing.join(", ")}` : `${want.length} of ${want.length}`));
    }
    if (req.scope?.length) D.coverage.push(c("the reviewer checks the lesson keeps to the specification's limits", false, `${req.scope.length} limit(s) on this statement (in the review sheet)`, "review"));
  } else D.coverage.push(c("requirement text available to check coverage", false, "the specification's text isn't imported here", "review"));

  // a practical lesson must be a practical a student can carry out, not a description of the science
  if (T.for === "practical") {
    const pr = inLesson.find((k) => k.kind === "practical")?.practical;
    D.coverage.push(c("the lesson is built on a practical, with its method", !!pr));
    if (pr) {
      D.coverage.push(c("a method of at least five steps a student can follow", pr.method.length >= 5, `${pr.method.length} steps`));
      D.coverage.push(c("independent, dependent and at least three control variables", pr.variables.independent && pr.variables.dependent && pr.variables.control.length >= 3, `${pr.variables.control.length} controls`));
      D.coverage.push(c("safety precautions", pr.safety.length >= 1));
      D.coverage.push(c("a results table that records the dependent variable", pr.results.columns.some((x) => tokens(x).some((w) => tokens(pr.variables.dependent).includes(w)))));
      D.coverage.push(c("analysis with a calculation and a graph", inLesson.some((k) => ["method", "worked-example"].includes(k.kind)) && lesson.assets.some((a) => a.renderer === "graph")));
      D.coverage.push(c("evaluation: errors and improvements", pr.evaluation.length >= 2));
      D.coverage.push(c("questions on variables and method", lesson.questions.filter((q) => ["MS", "SEQ"].includes(q.type) || /variable/.test(q.line || "")).length >= 2 || lesson.questions.some((q) => q.type === "SEQ")));
    }
  }
  if (lesson.requirementKind === "skill" && inLesson.some((k) => k.kind === "dataset")) {
    D.coverage.push(c("data to interpret, with a graph of it", lesson.assets.some((a) => a.renderer === "graph")));
    D.coverage.push(c("questions that need the data", lesson.questions.some((q) => q.data || q.compute?.fn?.startsWith("fit"))));
  }
  if (lesson.requirementKind === "skill" && inLesson.some((k) => k.compute)) D.coverage.push(c("calculations with independently recomputed answers", lesson.questions.filter((q) => q.compute).length >= 2, `${lesson.questions.filter((q) => q.compute).length} computed questions`));

  // depth
  const above = inLesson.filter((k) => rankOf(k.level.from) > rank || rankOf(k.level.to || "pg") < rank);
  D.depth.push(c(`every knowledge item is valid at ${LEVELS[lesson.level].name}`, !above.length, above.map((k) => k.id).join(", ")));
  const hereTerms = new Set(atLevel.flatMap((k) => (k.terms || []).map((t) => t.term.toLowerCase())));
  const deeperTerms = [...new Set(items.flatMap((k) => [...(rankOf(k.level.from) > rank ? k.terms || [] : []), ...(k.forms || []).filter((f) => rankOf(f.level.from) > rank).flatMap((f) => f.terms || [])]).map((t) => t.term.toLowerCase()))].filter((t) => !hereTerms.has(t));
  const used = [...new Set(deeperTerms.filter((t) => new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(prose)))];
  D.depth.push(c("the lesson's prose uses no term the knowledge base teaches only at a higher level", !used.length, used.join(", ")));
  D.depth.push(c(`the template's depth (${tpl.id}) matches the lesson's level`, depthOf(T) >= rank && T.id === tpl.id, T.id));

  // terminology
  const defined = new Set(L.terms.map(([t]) => t.toLowerCase()));
  const kbTerms = atLevel.flatMap((k) => (k.terms || []).map((t) => t.term.toLowerCase()));
  const usedTerms = [...new Set(kbTerms.filter((t) => new RegExp(`\\b${t}\\b`, "i").test(prose)))];
  const undefinedTerms = usedTerms.filter((t) => !defined.has(t) && !lesson.prior.some((p) => resolve(byId.get(p.id), lesson.level)?.terms?.some((x) => x.term.toLowerCase() === t)));
  D.terminology.push(c("every key term the lesson uses is defined in it (or in a prerequisite)", !undefinedTerms.length, undefinedTerms.join(", ")));
  if (req) { const reqTerms = kbTerms.filter((t) => new RegExp(`\\b${t}\\b`, "i").test(req.text)); D.terminology.push(c("the requirement's own terms are defined in the lesson", reqTerms.every((t) => defined.has(t)), reqTerms.filter((t) => !defined.has(t)).join(", ") || [...new Set(reqTerms)].join(", "))); }

  // explanation
  for (const comp of T.components.filter((x) => x.required)) D.explanation.push(c(`template component "${comp.name}" is present`, (lesson.components[comp.id] ?? 0) !== 0 && lesson.components[comp.id] !== false));
  const fk = fkGrade(prose);
  D.explanation.push(c(`readability suits ${LEVELS[lesson.level].name} (Flesch–Kincaid grade ${T.readability[0]}–${T.readability[1]})`, fk !== null && fk >= T.readability[0] - 1 && fk <= T.readability[1], `grade ${fk}`, "review"));
  const sents = prose.split(/(?<=[.!?])\s+/), long = sents.filter((s) => s.split(" ").length > 30);
  D.explanation.push(c("no sentence is over 30 words", !long.length, long.map((s) => `"${s.slice(0, 60)}…"`).join("; "), "review"));
  const emptyHeads = notes.split("\n").map((l, i, a) => (l.startsWith("H: ") && (!a[i + 1] || /^(H|T|SUM|SRC|M|TF|NUM)/.test(a[i + 1])) ? l.slice(3) : null)).filter(Boolean);
  D.explanation.push(c("every section has content", !emptyHeads.length, emptyHeads.join(", ")));

  // visuals
  const diagrams = lesson.assets.filter((a) => a.kind === "diagram");
  D.visuals.push(c(`a diagram (the ${T.id} template's visual rule is "${T.visual}")`, T.visual !== "required" || diagrams.length, `${diagrams.length} diagram(s)`));
  for (const a of assets.filter((x) => x.origin === "generated")) {
    const s = a.spec;
    D.visuals.push(c(`${a.id}: title, caption, alt text and a step-by-step description`, s.title && s.caption && s.alt?.length > 40 && s.description?.length >= 3));
    const labels = labelsOf(s), off = labels.filter((l) => tokens(l).some((w) => !lessonWords.has(w) && !lessonStems.has(stem(w))));
    D.visuals.push(c(`${a.id}: its labels use the lesson's words`, !off.length, off.join(", ")));
    D.visuals.push(c(`${a.id}: placed in the lesson`, notes.includes(`D: ${a.id}`)));
    D.visuals.push(c(`${a.id}: shows what the lesson's mechanism describes (knowledge ${s.from.item})`, lesson.knowledge.some((k) => k.id === s.from.item)));
  }
  for (const a of lesson.library.filter((x) => notes.includes(`D: ${x.id}`))) D.visuals.push(c(`library diagram ${a.id} fits the level`, a.usable, a.reason));

  // assessment
  const qs = lesson.questions;
  D.assessment.push(c(`at least ${T.questions.min} questions`, qs.length >= T.questions.min, `${qs.length}`));
  const parsed = (L.mcq?.length ?? 0) + (L.tasks?.length ?? 0);
  D.assessment.push(c("the course engine parses every question", parsed === qs.length, `${parsed} parsed of ${qs.length}`));
  D.assessment.push(c("question ids are unique and permanent", new Set(qs.map((q) => q.id)).size === qs.length && qs.every((q) => /^[a-z0-9-]+$/.test(q.id))));
  for (let i = 1; i <= lesson.objectives.length; i++) D.assessment.push(c(`objective ${i} is tested ("${lesson.objectives[i - 1]}")`, qs.some((q) => q.objectives.includes(i))));
  const kinds = [...new Set(qs.map((q) => q.type))];
  D.assessment.push(c(`question kinds: ${kinds.join(", ")}`, kinds.length >= 2, "", "review"));
  for (const q of L.mcq || []) if (q.options) D.assessment.push(c(`${q.id || "a question"}: options are distinct`, new Set(q.options.map((o) => String(o).toLowerCase())).size === q.options.length));

  // accessibility
  for (const a of assets.filter((x) => x.origin === "generated")) for (const w of ["wide", "narrow"]) {
    const svg = a.svg[w];
    const outside = labelsOutside(svg);
    D.visuals.push(c(`${a.id} (${w}): every label inside the picture`, !outside.length, outside.join("; ")));
    D.accessibility.push(c(`${a.id} (${w}): role="img" with an aria-label`, /role="img"/.test(svg) && /aria-label="[^"]{20,}"/.test(svg)));
    D.accessibility.push(c(`${a.id} (${w}): everything coloured is also labelled in text`, (svg.match(/<text/g) || []).length >= Math.min(5, labelsOf(a.spec).length + 1), `${(svg.match(/<text/g) || []).length} text labels`));
  }
  D.accessibility.push(c("headings break the lesson into sections", (notes.match(/^H: /gm) || []).length >= 2));

  // sources and licensing
  for (const k of inLesson) for (const s of k.sources) D.sources.push(c(`${k.id}: source ${s.source} has a provenance record`, !!sources[s.source]));
  for (const id of lesson.sources) { const src = sources[id]; if (src) D.sources.push(c(`${id}: licence category ${categoryOf(src.licence)} permits ${usesOf(src.licence).adapt ? "adaptation" : "fact-checking only"}`, categoryOf(src.licence) !== "unknown" && usesOf(src.licence).verify, categoryOf(src.licence) === "unknown" ? "unknown permissions: can't be used until a person confirms the licence" : "")); }
  for (const k of inLesson.filter((x) => x.origin?.type === "adapted")) D.sources.push(c(`${k.id}: adapted only from a source Gradify may adapt commercially`, usesOf(sources[k.origin.source]?.licence).adapt && usesOf(sources[k.origin.source]?.licence).commercial, k.origin.source));
  for (const k of inLesson.filter((x) => x.kind === "dataset" && x.data.provenance === "illustrative")) {
    D.sources.push(c(`${k.id}: illustrative data are labelled as illustrative in the lesson`, /illustrative data/i.test(notes)));
    const g = assets.find((a) => a.spec?.from?.item === k.id);
    if (g) D.sources.push(c(`${k.id}: and in its diagram's caption`, /illustrative/i.test(g.spec.caption || "")));
  }
  const copied = inLesson.filter((k) => (ev[k.id]?.overlap?.words || 0) >= 12), close = inLesson.filter((k) => { const w = ev[k.id]?.overlap?.words || 0; return w >= 8 && w < 12; });
  D.sources.push(c("no item copies 12 or more words in a row from a source it may not reuse", !copied.length, copied.map((k) => `${k.id}: ${ev[k.id].overlap.words} words from ${ev[k.id].overlap.source}`).join("; ")));
  D.sources.push(c("no item shares 8 or more words in a row with such a source", !close.length, close.map((k) => `${k.id}: ${ev[k.id].overlap.words} words`).join("; "), "review"));
  // the whole lesson, as a learner reads it, against every passage of every verify-only source it used
  const restricted = lesson.sources.map((id) => sources[id]).filter((s) => s?.policy === "verify-only"), local = restricted.filter((s) => passagesOf(s.id));
  let run = { words: 0 };
  for (const s of local) for (const p of passagesOf(s.id)) { const r = longestSharedRun(notes, p.text); if (r.words > run.words) run = { ...r, source: s.id, passage: p.id }; }
  if (local.length) {
    D.sources.push(c("the lesson copies no 12 or more words in a row from a source it may not reuse", run.words < 12, run.words ? `${run.words} words from ${run.source}#${run.passage}: "${run.run}"` : ""));
    D.sources.push(c("the lesson shares fewer than 8 words in a row with such a source", run.words < 8, run.words >= 8 ? `${run.words} words with ${run.source}#${run.passage}: "${run.run}" (a standard phrase, or rewrite?)` : "", "review"));
  } else if (restricted.length) D.sources.push(c("the lesson's text checked against its verify-only sources", false, "their text isn't retrieved here (pipeline.mjs ingest)", "review"));
  // the specification's own text is the awarding body's copyright: a lesson teaches it in Gradify's words
  if (req?.text) { const r = longestSharedRun(notes, req.text); D.sources.push(c("the lesson shares fewer than 8 words in a row with the specification's own wording", r.words < 8, r.words >= 8 ? `${r.words} words: "${r.run}"` : "", "review")); }
  const longest = Math.max(0, ...inLesson.map((k) => ev[k.id]?.overlap?.words || 0));
  D.sources.push(c(`longest run of words shared with a verify-only source: ${longest}`, true, "", "review"));
  for (const s of lesson.sources.map((id) => sources[id]).filter((s) => s?.attribution)) D.sources.push(c(`attribution to ${s.publisher}, ${s.title}`, L.sources.some((x) => x.cite.includes(s.title) && x.url)));
  const rec = checkLesson({ ...lesson, qa: lesson.qa || {} });
  D.sources.push(c("the lesson record links its requirement, template and every item with its version", !rec.length, rec.join("; ")));

  const all = Object.values(D).flat(), fails = all.filter((x) => !x.ok && x.severity === "fail"), reviews = all.filter((x) => !x.ok && x.severity === "review");
  return { result: fails.length ? "fail" : "pass", on: today(), checks: all.length, fails: fails.length, reviews: reviews.length, dimensions: Object.fromEntries(Object.entries(D).map(([k, v]) => [k, { status: v.some((x) => !x.ok && x.severity === "fail") ? "fail" : v.some((x) => !x.ok) ? "review" : "pass", checks: v }])) };
}

/** run QA and move the lesson on: to expert review if it passed, back to "generated" if it failed */
export function advance(lesson, record) {
  const step = (status, note) => { if (!NEXT[lesson.status]?.includes(status)) throw new Error(`${lesson.id}: can't move from ${lesson.status} to ${status}`); lesson.history.push({ status, on: today(), by: "scripts/knowledge/qa.mjs", ...(note ? { note } : {}) }); lesson.status = status; };
  lesson.qa = record;
  step("automated-qa", `${record.checks} checks: ${record.fails} failed, ${record.reviews} for the reviewer`);
  if (record.result === "pass") {
    step("expert-review", "awaiting a subject reviewer");
    lesson.review = { status: "awaiting", reviewer: null, flagged: Object.values(record.dimensions).flatMap((d) => d.checks.filter((x) => !x.ok && x.severity === "review").map((x) => `${x.name}${x.detail ? `: ${x.detail}` : ""}`)), approvedBy: null, approvedOn: null };
  } else step("generated", "failed automated QA: revise and reassemble");
  return lesson;
}

/** a reviewer's decision: approve (with their name) or send back with a note. Publishing is a separate, later step. */
export function review(lesson, { approve, by, note }) {
  if (lesson.status !== "expert-review") throw new Error(`${lesson.id} is ${lesson.status}, not awaiting expert review`);
  if (!by) throw new Error("a review needs the reviewer's name");
  if (!approve && !note) throw new Error("sending a lesson back needs a note saying what to fix");
  lesson.review = { ...lesson.review, status: approve ? "approved" : "changes-requested", reviewer: by, note: note || null, approvedBy: approve ? by : null, approvedOn: approve ? today() : null };
  lesson.history.push({ status: approve ? "approved" : "generated", on: today(), by, ...(note ? { note } : {}) }); lesson.status = approve ? "approved" : "generated";
  return lesson;
}

/**
 * Impact: which lessons need revising because something they were built from changed. A knowledge item edited
 * (its fingerprint differs), removed, or a specification statement whose text changed in a new import.
 */
export function impact(lessons, subject) {
  const byId = new Map(loadKnowledge(subject).map((k) => [k.id, k])), out = [];
  for (const l of lessons) {
    const why = [];
    const retired = load(at(`${subject}/retired.json`))?.retired || {};
    for (const k of [...l.knowledge, ...l.prior]) {
      const now = byId.get(k.id);
      if (!now) why.push(retired[k.id] ? `${k.id} was replaced by ${retired[k.id].replacedBy}` : `${k.id} was removed`);
      else if (k.formHash ? formHash(now, l.level) !== k.formHash : itemHash(now) !== k.hash) why.push(`${k.id} changed for this level (v${k.version} → v${now.version}${k.form ? `, ${k.form} form` : ""})`);
    }
    const [scheme, ref] = l.requirement.id.split(":"), idx = loadIndex(scheme);
    if (idx) { const st = idx.statements.find((x) => x.ref === ref); if (!st) why.push(`${l.requirement.id} is no longer in ${scheme}`); else if (st.hash !== l.requirement.hash) why.push(`${l.requirement.id}'s text changed (specification version ${idx.version})`); }
    if (why.length) out.push({ lesson: l.id, status: l.status, why });
  }
  return out;
}
