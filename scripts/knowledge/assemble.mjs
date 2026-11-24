// Lesson assembly: one curriculum requirement + the subject's knowledge base + the level's template → one lesson
// instance, in the website's notes format, with its diagram, questions and a record of everything it was built from.
//
//   requirement   loadRequirement("aqa-gcse-biology:4.1.3.2.a")   a specification statement (text read locally)
//                 loadRequirement("gradify-biology:u02-21")        a Gradify course lesson's objectives
//   retrieve      which knowledge items the requirement needs, at its level, and why each was chosen
//   assemble      fill the template's components, generate or select the diagram, generate questions
// Nothing here publishes: a new lesson starts at "generated" and goes to automated QA (qa.mjs).
import { existsSync } from "node:fs";
import { at, ROOT, load, save, fp, itemHash, bm25, tokens, today, loadSources } from "./lib.mjs";
import { templateFor, inRange, rankOf, LEVELS } from "../../kit/knowledge/templates.js";
import { generateQuestions } from "../../kit/knowledge/questions.js";
import { SPECS } from "../../kit/curriculum/uk.js";
import { loadIndex, statementsPath } from "../curriculum/engine.mjs";
import { claimText } from "./evidence.mjs";

const QUAL_LEVEL = { gcse: "gcse", "gcse-combined": "gcse", as: "as", "a-level": "alevel", nat5: "nat5", higher: "higher", "adv-higher": "advhigher" };
const COURSE_LEVEL = { biology: "ug" };   // Gradify's biology course is a first-year university course
export const slugOf = (reqId, level) => `kb-${reqId.replace(/^aqa-gcse-biology:/, "aqa8461-").replace(/^gradify-biology:/, "gradify-bio-").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${level}`.replace(/-+/g, "-");

// ---------- requirements ----------
/**
 * A requirement: { id, kind: "specification" | "course", level, subject, title, text, hash, ref?, section?, context }.
 * Specification text is the awarding body's and is read from the local import (data/curriculum/specs, gitignored);
 * a lesson records only the requirement's id and the fingerprint of its text.
 */
export async function loadRequirement(id) {
  const [scheme, ref] = id.split(":");
  const spec = SPECS.find((s) => s.id === scheme);
  if (spec) {
    if (!existsSync(statementsPath(scheme))) throw new Error(`${scheme}'s statement text isn't imported here: node scripts/curriculum/engine.mjs fetch ${scheme} && … import ${scheme}`);
    const full = load(statementsPath(scheme)), st = full.statements.find((x) => x.ref === ref), idx = loadIndex(scheme);
    if (!st) throw new Error(`${ref} is not a statement of ${scheme}`);
    const sec = full.sections.find((x) => x.ref === st.section), siblings = idx.statements.filter((x) => x.section === st.section && x.ref !== ref).map((x) => x.ref);
    return { id, kind: "specification", spec: scheme, ref, version: full.version, level: QUAL_LEVEL[spec.qual], subject: spec.subject, title: `${spec.title} ${st.section} ${sec.title}`, sectionTitle: sec.title, text: st.text, scope: st.scope || [], statementKind: st.kind, higherTier: !!st.higherTier, biologyOnly: !!st.biologyOnly, hash: idx.statements.find((x) => x.ref === ref).hash, siblings, page: st.page };
  }
  if (scheme.startsWith("gradify-")) {
    const course = scheme.slice(8), [unit] = ref.split("-");
    const { parseNotes } = await import("../../kit/course/notes.js");
    const { IDS } = await import(new URL(`kit/courses/${course}/ids.js`, ROOT)), title = IDS[ref];
    const notes = (await import(new URL(`kit/courses/${course}/notes/${unit}.js`, ROOT))).default, L = parseNotes(notes).find((x) => x.title === title);
    if (!L) throw new Error(`no lesson ${ref} in ${course}`);
    const text = L.objectives.join(". ");
    return { id, kind: "course", course, ref, level: COURSE_LEVEL[course] || "ug", subject: course, title: `Gradify ${course[0].toUpperCase() + course.slice(1)} ${ref}: ${L.title}`, sectionTitle: L.title, text, objectives: L.objectives, statementKind: "content", hash: fp(text), siblings: [] };
  }
  throw new Error(`unknown requirement scheme ${scheme}`);
}

// ---------- retrieval ----------
const EXPLAIN = new Set(["definition", "concept", "fact", "mechanism", "misconception", "application"]);
const closure = (ids, byId) => { const seen = new Set(), go = (i) => { for (const p of byId.get(i)?.prereqs || []) if (!seen.has(p)) { seen.add(p); go(p); } }; ids.forEach(go); return seen; };
/**
 * The knowledge a requirement needs at its level: [{ id, why, score }] plus prerequisites.
 *   matched   the item answers the requirement's own words (BM25 over the items valid at this level)
 *   concept   explanatory items (definitions, mechanisms, misconceptions, applications) on the requirement's
 *             main concept; calculations, practicals and worked examples come in only when the requirement asks
 *             for them, so a lesson stays one statement's lesson
 *   prior     prerequisites of the chosen items that the lesson doesn't teach itself: shown as "what you need first"
 */
export function retrieve(req, items) {
  const eligible = items.filter((k) => inRange(k.level, req.level)), byId = new Map(items.map((k) => [k.id, k]));
  const query = `${req.text} ${req.sectionTitle} ${req.sectionTitle}`;
  const hits = bm25(eligible.map((k) => ({ id: k.id, text: claimText(k) + " " + k.concepts.join(" ") }))).search(query);
  const top = hits[0]?.score || 0, seeds = hits.filter((h) => h.score >= Math.max(4, 0.35 * top));
  const count = {}; for (const h of seeds) for (const c of byId.get(h.id).concepts) count[c] = (count[c] || 0) + h.score;
  const main = Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0];
  const chosen = new Map(seeds.map((h) => [h.id, { id: h.id, why: "matched", score: h.score, matched: h.matched.slice(0, 8) }]));
  for (const k of eligible) if (!chosen.has(k.id) && EXPLAIN.has(k.kind) && k.concepts[0] === main) chosen.set(k.id, { id: k.id, why: "concept", concept: main });
  // a requirement's own wording can bring in a calculation or practical (seeds), but no others come by concept
  for (const [id, c] of chosen) if (c.why === "matched" && !EXPLAIN.has(byId.get(id).kind) && req.statementKind !== "skill" && req.statementKind !== "practical" && c.score < 0.6 * top) chosen.delete(id);
  // a prerequisite whose terms the requirement itself uses is part of the requirement: teach it, don't assume it
  const named = (k) => (k.terms || []).some((t) => new RegExp(`\\b${t.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(req.text));
  for (const id of closure([...chosen.keys()], byId)) { const k = byId.get(id); if (!chosen.has(id) && inRange(k.level, req.level) && named(k)) chosen.set(id, { id, why: "required term" }); }
  const prior = [...closure([...chosen.keys()], byId)].filter((p) => !chosen.has(p)).map((id) => ({ id, why: "prior" }));
  // the lesson teaches prerequisites it needs only when they're at its level and on its concept; others are "prior"
  return { main, items: [...chosen.values()], prior, excludedAboveLevel: items.filter((k) => rankOf(k.level.from) > rankOf(req.level) && k.concepts.includes(main)).map((k) => k.id) };
}

// ---------- visuals ----------
const DIAGRAMS = new URL("kit/diagrams/", ROOT);
let renderersLoaded = null;
async function renderer() {
  if (!renderersLoaded) renderersLoaded = (async () => { const { readdirSync } = await import("node:fs"); for (const f of readdirSync(DIAGRAMS).filter((f) => /^[a-z]+-renderers(-\d+)?\.js$/.test(f)).sort()) await import(new URL(f, DIAGRAMS)); return (await import(new URL("renderers.js", DIAGRAMS))).render; })();
  return renderersLoaded;
}
/** a diagram spec for an item's visual brief at a level: the brief's data with that level's labels and wording */
export function visualSpec(item, level, id) {
  const v = item.visual, L = v.byLevel.find((x) => inRange(x.level, level));
  if (!L) return null;
  const d = structuredClone(v.data);
  d.sides = d.sides.map((s, i) => ({ ...s, ...L.labels.sides[i] }));
  return { id, renderer: v.renderer, course: "knowledge", title: L.title, caption: L.caption, alt: L.alt, description: L.description, ...d, membrane: { ...(d.membrane || {}), label: L.labels.membrane }, net: { label: L.labels.net }, from: { item: item.id, version: item.version } };
}
/**
 * Diagrams already in the library (kit/diagrams/manifest.json) that suit a lesson: on its subject and concepts, not
 * failed, and using no term the lesson's level doesn't teach (a GCSE lesson can't use a diagram about water potential).
 */
export function selectLibraryDiagrams(lessonText, level, items, allItems, { subject, main = null }) {
  const man = load(new URL("manifest.json", DIAGRAMS)) || {};
  const entries = Object.entries(man).filter(([, e]) => e.course === subject && e.status !== "failed");
  const idx = bm25(entries.map(([id, e]) => ({ id, text: `${e.title} ${e.caption} ${e.lesson}` })));
  const aboveLevel = allItems.filter((k) => rankOf(k.level.from) > rankOf(level)).flatMap((k) => (k.terms || []).map((t) => t.term.toLowerCase()));
  const taught = new Set(items.flatMap((k) => (k.terms || []).map((t) => t.term.toLowerCase())));
  return idx.search(lessonText).slice(0, 5).map((h) => {
    const e = man[h.id], words = `${e.title} ${e.caption} ${e.alt}`.toLowerCase();
    const tooDeep = aboveLevel.filter((t) => words.includes(t) && !taught.has(t));
    const onTopic = !main || tokens(`${e.lesson} ${e.title}`).some((w) => tokens(main).includes(w));
    return { id: h.id, score: h.score, status: e.status, title: e.title, usable: !tooDeep.length && onTopic && h.score >= 8, reason: tooDeep.length ? `uses ${tooDeep.join(", ")}, beyond ${LEVELS[level].name}` : !onTopic ? `on another topic (${e.lesson})` : h.score < 8 ? "not closely related" : "fits" };
  });
}

// ---------- assembly ----------
const firstSentence = (s) => String(s).split(/(?<=[.!?])\s/)[0];
const OBJ = { definition: (k) => `Define ${(k.terms?.[0]?.term || k.title).replace(/^./, (c) => (/^[A-Z]{2}/.test(k.terms?.[0]?.term || "") ? c : c.toLowerCase()))} and use the term correctly`, concept: (k) => `Explain ${k.title.toLowerCase().replace(/^water potential$/, "what water potential is")}`, mechanism: (k) => `Explain ${k.title.replace(/^Why/, "why").replace(/^./, (c) => c.toLowerCase())}`, application: (k) => `Predict and explain ${k.title.replace(/^What/, "what")}`, equation: (k) => `Use ${k.equation} to work out ${k.title.toLowerCase()}`, method: (k) => `Calculate ${k.title.toLowerCase()} and interpret it`, practical: (k) => `Describe how to carry out ${k.title.replace(/^Investigating/, "an investigation of")}` };

export async function assemble(reqId, { subject = "biology", level: forceLevel } = {}) {
  const req = await loadRequirement(reqId), level = forceLevel || req.level, tpl = templateFor(level, req.subject);
  const all = (await import("./lib.mjs")).loadKnowledge(subject), byId = new Map(all.map((k) => [k.id, k]));
  const r = retrieve({ ...req, level }, all), slug = slugOf(reqId, level);
  // the lesson's items in teaching order: prerequisites it teaches first, definitions, concepts, mechanisms …
  const ORDER = ["definition", "concept", "fact", "mechanism", "equation", "method", "worked-example", "practical", "application", "misconception"];
  const sorted = r.items.map((x) => byId.get(x.id)).sort((a, b) => ORDER.indexOf(a.kind) - ORDER.indexOf(b.kind));
  // prerequisites first: an item comes after every item in the lesson it depends on (stable otherwise)
  const inLesson = [], placed = new Set(), place = (k) => { if (placed.has(k.id)) return; placed.add(k.id); for (const p of k.prereqs || []) { const q = sorted.find((x) => x.id === p); if (q) place(q); } inLesson.push(k); };
  sorted.forEach(place);
  // the main item: the definition of the main concept itself (its term is the concept's name), else any definition on it
  const named = (k) => k.terms?.some((t) => t.term.toLowerCase() === r.main);
  const main = inLesson.find((k) => k.kind === "definition" && named(k)) || inLesson.find((k) => k.kind === "definition" && k.concepts[0] === r.main) || inLesson[0];
  // objectives: the main definition first, then one per mechanism, concept, application, calculation and practical
  const objItems = [main, ...inLesson.filter((k) => k !== main && ["concept", "mechanism", "application", "equation", "method", "practical"].includes(k.kind))].slice(0, 5);
  const objectives = objItems.map((k) => (OBJ[k.kind] || OBJ.concept)(k));
  const objectiveOf = (id) => { const i = objItems.findIndex((k) => k.id === id); if (i >= 0) return [i + 1]; const k = byId.get(id); const j = objItems.findIndex((o) => o.concepts[0] === k?.concepts[0] && (k.kind === "misconception" || k.kind === "definition" || k.kind === "fact")); return j >= 0 ? [j + 1] : [1]; };
  const lines = [`## ${req.sectionTitle}`, `S: ${main.summary || firstSentence(main.text)}`, `LV: ${LEVELS[level].name}`];
  const comp = {};
  for (const o of objectives) lines.push(`O: ${o}`);
  comp.objectives = objectives.length;
  const definedHere = new Set(inLesson.flatMap((k) => (k.terms || []).map((t) => t.term.toLowerCase())));
  const prior = r.prior.map((p) => byId.get(p.id)).filter((k) => !(k.terms?.length && k.terms.every((t) => definedHere.has(t.term.toLowerCase()))));
  for (const p of prior) lines.push(`PRE: ${p.title}`);
  comp.prior = prior.length;
  const kinds = (ks) => inLesson.filter((k) => ks.includes(k.kind));
  const ex = kinds(["definition", "concept", "fact"]);
  if (ex.length) { lines.push("H: The idea"); for (const k of ex) lines.push(`P: ${k.text}`); const mt = main.terms?.find((t) => t.term.toLowerCase() === r.main) || main.terms?.[0]; lines.push(`K: ${mt ? `**${mt.term}** is ${mt.definition.replace(/^(The|A|An) /, (m) => m.toLowerCase())}.` : main.summary || firstSentence(main.text)}`); }
  comp.explain = ex.length;
  // the diagram: generated from a visual brief at this level, else chosen from the library
  const assets = [];
  const mech = kinds(["mechanism"]);
  const render = await renderer();
  for (const k of inLesson.filter((x) => x.visual)) {
    const spec = visualSpec(k, level, `${slug}-${k.id.split(".").slice(1).join("-")}`);
    if (!spec) continue;
    const out = render(spec);
    assets.push({ id: spec.id, kind: "diagram", origin: "generated", renderer: spec.renderer, from: spec.from, spec, svg: out, checks: out.checks });
  }
  for (const k of mech) {
    lines.push(`H: ${k.title}`); lines.push(`P: ${k.text}`); for (const s of k.steps) lines.push(`- ${s}`);
    const a = assets.find((x) => x.from.item === k.id); if (a) lines.push(`D: ${a.id}`);
  }
  comp.mechanism = mech.length;
  const quant = kinds(["equation", "method"]);
  if (quant.length) { lines.push("H: Calculations"); for (const k of quant) { lines.push(`P: ${k.text}`); lines.push(`E: ${k.equation}${k.equationNote ? ` :: ${k.equationNote}` : ""}`); } }
  for (const k of kinds(["worked-example"])) { lines.push(`X: ${k.text}`); for (const s of k.steps) lines.push(`> ${s}`); }
  comp.quantitative = quant.length; comp.worked = kinds(["worked-example"]).length;
  for (const k of kinds(["practical"])) { lines.push(`H: ${k.title}`); lines.push(`P: ${k.text}`); }
  comp.practical = kinds(["practical"]).length;
  const apps = kinds(["application"]);
  for (const k of apps) { lines.push(`H: ${k.title}`); lines.push(`P: ${k.text}`); for (const c of k.cases) lines.push(`- **${c.situation}:** ${c.outcome.replace(/^./, (x) => x.toLowerCase())}. ${c.why}`); }
  comp.apply = apps.length;
  // library diagrams, when the template wants a visual and the lesson doesn't already have a fitting one
  const lessonWords = inLesson.map(claimText).join(" ");
  const library = selectLibraryDiagrams(lessonWords, level, inLesson, all, { subject, main: r.main });
  const shown = assets.some((a) => a.origin === "generated");
  for (const d of library.filter((x) => x.usable && !shown && tpl.visual !== "optional").slice(0, 1)) { assets.push({ id: d.id, kind: "diagram", origin: "library", status: d.status, title: d.title }); lines.push(`D: ${d.id}`); }
  comp.visual = assets.length;
  for (const k of kinds(["misconception"])) lines.push(`!: "${k.wrong}" ${k.right}`);
  comp.misconceptions = kinds(["misconception"]).length;
  const terms = [...new Map(inLesson.flatMap((k) => (k.terms || []).map((t) => [t.term, t]))).values()];
  for (const t of terms) lines.push(`T: ${t.term} | ${t.definition}`);
  comp.terms = terms.length;
  for (const k of [main, ...inLesson.filter((x) => x !== main && x.summary)].slice(0, 5)) lines.push(`SUM: ${k.summary || firstSentence(k.text).replace(/\*\*/g, "")}`);
  comp.summary = true;
  // sources: attribution for every source the lesson's knowledge rests on, and the primary sources they cite
  const sources = loadSources(), used = [...new Set(inLesson.flatMap((k) => k.sources.map((s) => s.source)))];
  for (const s of used.map((id) => sources[id]).filter((s) => s && s.licence !== "gradify")) lines.push(`SRC: ${s.publisher}, ${s.title} (${s.authors.join(", ")}), ${s.licenceName}: used to check facts, not reproduced | secondary | ${s.retrievedOn} | ${s.readerUrl || s.url}`);
  for (const c of inLesson.flatMap((k) => k.sources.filter((s) => s.cites).map((s) => s.cites))) lines.push(`SRC: ${c.citation} | ${c.kind} | ${c.date} | ${c.link}`);
  comp.evidence = used.length;
  // questions
  const qs = generateQuestions(inLesson, { slug, objectiveOf });
  for (const q of qs) lines.push(q.line);
  comp.practice = qs.length;
  // connections: the other statements of the same specification section, and deeper knowledge for later
  const connections = { siblings: req.siblings, deeper: r.excludedAboveLevel };
  if (req.siblings.length || r.excludedAboveLevel.length) {
    lines.splice(lines.findIndex((l) => l.startsWith("T: ")), 0, "H: Where this leads");
    const at = lines.findIndex((l) => l === "H: Where this leads") + 1, add = [];
    if (req.siblings.length) add.push(`P: The rest of ${req.title.replace(/ (\d+(?:\.\d+)+) (.+)$/, " $1 ($2)")} has its own lessons: ${req.siblings.join(", ")}.`);
    const later = r.excludedAboveLevel.map((id) => byId.get(id)).filter((k) => ["concept", "definition", "fact", "equation"].includes(k.kind)).map((k) => k.title.replace(/^Osmosis, in terms of /, "osmosis in terms of ")).map((t) => (/^[A-Z][a-z]/.test(t) ? t[0].toLowerCase() + t.slice(1) : t));
    if (later.length) add.push(`P: Later, at A level and university: ${[...new Set(later)].join("; ")}.`);
    lines.splice(at, 0, ...add);
  }
  comp.connections = req.siblings.length + r.excludedAboveLevel.length;
  const notes = `${lines.join("\n")}\n`;
  const lesson = {
    id: slug, title: req.sectionTitle, level, subject, template: tpl.id,
    requirement: { id: req.id, kind: req.kind, title: req.title, hash: req.hash, version: req.version || null, page: req.page || null, higherTier: req.higherTier || false, biologyOnly: req.biologyOnly || false },
    objectives,
    knowledge: inLesson.map((k) => ({ id: k.id, version: k.version, hash: itemHash(k), status: k.status, why: r.items.find((x) => x.id === k.id).why })),
    prior: prior.map((k) => ({ id: k.id, version: k.version, hash: itemHash(k) })),
    retrieval: { main: r.main, items: r.items, excludedAboveLevel: r.excludedAboveLevel },
    assets: assets.map(({ svg, spec, ...a }) => a),
    library: library.map(({ id, usable, reason, score }) => ({ id, usable, reason, score })),
    questions: qs.map(({ line, ...q }) => q),
    components: comp, connections, sources: used,
    status: "generated", history: [{ status: "generated", on: today(), by: "scripts/knowledge/assemble.mjs" }],
  };
  return { lesson, notes, assets, req };
}

/** write a lesson's files: lesson.json, notes.txt and its generated diagrams (spec and SVG) */
export function writeLesson({ lesson, notes, assets }) {
  const dir = at(`lessons/${lesson.id}/`);
  save(new URL("notes.txt", dir), notes);
  for (const a of assets.filter((x) => x.origin === "generated")) {
    save(new URL(`assets/${a.id}.json`, dir), a.spec);
    save(new URL(`assets/${a.id}.wide.svg`, dir), a.svg.wide);
    save(new URL(`assets/${a.id}.narrow.svg`, dir), a.svg.narrow);
  }
  save(new URL("lesson.json", dir), lesson);
  return dir;
}
