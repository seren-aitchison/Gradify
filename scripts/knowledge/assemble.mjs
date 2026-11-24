// Lesson assembly: one curriculum requirement + the subject's knowledge base + the level's template → one lesson
// instance, in the website's notes format, with its diagrams, questions and a record of everything it was built from.
//
//   requirement   loadRequirement("aqa-gcse-biology:4.1.3.2.a")   a specification statement (text read locally)
//                 loadRequirement("gradify-biology:u02-21")        a Gradify course lesson's objectives
//   retrieve      which knowledge items the requirement needs, at its level (each in its form for that level)
//   assemble      lay the lesson out in its template's component order; generate or select diagrams; questions
// Nothing here publishes: a new lesson starts at "generated" and goes to automated QA (qa.mjs).
import { existsSync } from "node:fs";
import { at, ROOT, load, save, fp, itemHash, bm25, tokens, today, loadSources, loadKnowledge } from "./lib.mjs";
import { templateFor, inRange, rankOf, LEVELS } from "../../kit/knowledge/templates.js";
import { resolve, formContent } from "../../kit/knowledge/forms.js";
import { generateQuestions } from "../../kit/knowledge/questions.js";
import { pointsOf, linearFit, xIntercept } from "../../kit/knowledge/stats.js";
import { LICENCES } from "../../kit/knowledge/schema.js";
import { SPECS } from "../../kit/curriculum/uk.js";
import { loadIndex, statementsPath } from "../curriculum/engine.mjs";
import { claimText } from "./evidence.mjs";

const QUAL_LEVEL = { gcse: "gcse", "gcse-combined": "gcse", as: "as", "a-level": "alevel", nat5: "nat5", higher: "higher", "adv-higher": "advhigher" };
const COURSE_LEVEL = { biology: "ug" };   // Gradify's biology course is a first-year university course
export const slugOf = (reqId, level) => `kb-${reqId.replace(/^aqa-gcse-biology:/, "aqa8461-").replace(/^gradify-biology:/, "gradify-bio-").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${level}`.replace(/-+/g, "-");
/** the fingerprint of the form of an item a lesson at this level uses */
export const formHash = (item, level) => fp(formContent(item, level));

// ---------- requirements ----------
/**
 * A requirement: { id, kind: "specification" | "course", level, subject, title, text, hash, statementKind, … }.
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
// which kinds of knowledge join a lesson because they're on its main concept, by the kind of requirement: a content
// statement's lesson explains; a skill's lesson also calculates and interprets; a practical's lesson is the practical
const EXPAND = {
  content: new Set(["definition", "concept", "fact", "mechanism", "misconception", "application"]),
  skill: new Set(["definition", "concept", "fact", "equation", "method", "worked-example", "dataset", "misconception"]),
  practical: new Set(["practical", "dataset", "method", "worked-example", "misconception"]),
};
const closure = (ids, byId) => { const seen = new Set(), go = (i) => { for (const p of byId.get(i)?.prereqs || []) if (!seen.has(p)) { seen.add(p); go(p); } }; ids.forEach(go); return seen; };
/**
 * The knowledge a requirement needs at its level. Every item is taken in its form for that level.
 *   matched        the item answers the requirement's own words (BM25 over the items valid at this level)
 *   concept        items on the requirement's main concept, of the kinds its kind of requirement uses (EXPAND); a
 *                  practical's lesson takes only practical-tagged misconceptions
 *   required term  a prerequisite whose term the requirement itself uses: taught, not assumed
 *   prior          other prerequisites: listed as what the learner needs first
 */
export function retrieve(req, items) {
  const kind = EXPAND[req.statementKind] ? req.statementKind : "content", allow = EXPAND[kind];
  const eligible = items.map((k) => resolve(k, req.level)).filter(Boolean), byId = new Map(items.map((k) => [k.id, k])), at = new Map(eligible.map((k) => [k.id, k]));
  const query = `${req.text} ${req.sectionTitle} ${req.sectionTitle}`;
  const hits = bm25(eligible.map((k) => ({ id: k.id, text: `${claimText(k)} ${k.concepts.join(" ")}` }))).search(query);
  const top = hits[0]?.score || 0;
  let seeds = hits.filter((h) => h.score >= Math.max(4, 0.35 * top));
  // a content statement's lesson doesn't pull in calculations and practicals on weak matches; a practical's lesson
  // doesn't teach the underlying theory again (that's prior knowledge)
  seeds = seeds.filter((h) => { const k = at.get(h.id); return kind === "practical" ? allow.has(k.kind) || k.concepts.includes("practical") : allow.has(k.kind) || kind !== "content" || h.score >= 0.6 * top; });
  const count = {}; for (const h of seeds) for (const c of at.get(h.id).concepts) count[c] = (count[c] || 0) + h.score * (c === at.get(h.id).concepts[0] ? 1 : 0.5);
  const main = Object.entries(count).filter(([c]) => c !== "practical" && c !== "calculation").sort((a, b) => b[1] - a[1])[0]?.[0];
  const chosen = new Map(seeds.map((h) => [h.id, { id: h.id, why: "matched", score: h.score, matched: h.matched.slice(0, 8) }]));
  for (const k of eligible) {
    if (chosen.has(k.id) || !allow.has(k.kind) || !k.concepts.includes(main)) continue;
    if (kind === "content" && (k.concepts[0] !== main || k.concepts.some((c) => c === "practical" || c === "calculation"))) continue;
    if (kind === "practical" && !k.concepts.includes("practical")) continue;
    if (kind === "skill" && k.kind === "misconception" && !k.concepts.some((c) => (seeds.map((h) => at.get(h.id).concepts[0])).includes(c))) continue;
    chosen.set(k.id, { id: k.id, why: "concept", concept: main });
  }
  const named = (k) => (k.terms || []).some((t) => new RegExp(`\\b${t.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(req.text));
  for (const id of closure([...chosen.keys()], byId)) { const k = at.get(id); if (k && !chosen.has(id) && named(k)) chosen.set(id, { id, why: "required term" }); }
  const prior = [...closure([...chosen.keys()], byId)].filter((p) => !chosen.has(p) && at.has(p)).map((id) => ({ id, why: "prior" }));
  return { main, kind, items: [...chosen.values()], prior, excludedAboveLevel: items.filter((k) => rankOf(k.level.from) > rankOf(req.level) && k.concepts.includes(main)).map((k) => k.id) };
}

// ---------- visuals ----------
const DIAGRAMS = new URL("kit/diagrams/", ROOT);
let renderersLoaded = null;
export async function renderer() {
  if (!renderersLoaded) renderersLoaded = (async () => { const { readdirSync } = await import("node:fs"); for (const f of readdirSync(DIAGRAMS).filter((f) => /^[a-z]+-renderers(-\d+)?\.js$/.test(f)).sort()) await import(new URL(f, DIAGRAMS)); return (await import(new URL("renderers.js", DIAGRAMS))).render; })();
  return renderersLoaded;
}
const nice = (lo, hi, n = 5) => { const span = hi - lo, step0 = span / n, mag = 10 ** Math.floor(Math.log10(step0)), step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= n) || mag * 10; const a = Math.floor(lo / step) * step, b = Math.ceil(hi / step) * step, t = []; for (let v = a; v <= b + step / 2; v += step) t.push(Math.round(v * 1e6) / 1e6); return t; };
/** a graph of a dataset item: its points, a line of best fit, and (if claimed) where the line crosses zero */
export function dataGraph(item, id) {
  const D = item.data, pts = pointsOf(D), fit = linearFit(pts), X = D.columns.find((c) => c.key === D.x), Y = D.columns.find((c) => c.key === D.y);
  const zero = (D.claims || []).find((c) => c.type === "xIntercept");
  // axes start at zero only when the analysis needs the zero crossing (or the data already span it)
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]), pad = (lo, hi) => [lo >= 0 ? Math.max(0, lo - (hi - lo) * 0.06) : lo - (hi - lo) * 0.06, hi + (hi - lo) * 0.06];
  const [xl, xh] = zero ? [Math.min(0, ...xs), Math.max(...xs)] : pad(Math.min(...xs), Math.max(...xs)), [yl, yh] = zero ? [Math.min(0, ...ys), Math.max(...ys)] : pad(Math.min(...ys), Math.max(...ys));
  const tx = nice(xl, xh), ty = nice(yl, yh), fx = (x) => fit.slope * x + fit.intercept, x0 = Math.round(xIntercept(fit) * 100) / 100;
  // the line's label goes where the line is furthest from every point, at two thirds of the way along
  const sx = (x) => (x - tx[0]) / (tx.at(-1) - tx[0]), sy = (y) => (y - ty[0]) / (ty.at(-1) - ty[0]);
  const spots = [0.2, 0.35, 0.5, 0.65, 0.8].flatMap((f) => [1, -1].map((side) => { const x = tx[0] + (tx.at(-1) - tx[0]) * f, y = fx(x) + side * (ty.at(-1) - ty[0]) * 0.1; return { x, y, room: Math.min(...pts.map(([px, py]) => Math.hypot(Math.max(0, Math.abs(sx(px) - sx(x)) - 0.12) * 1.6, sy(py) - sy(y)))) }; })).filter((p) => p.y > ty[0] && p.y < ty.at(-1));
  const spot = spots.sort((a, b) => b.room - a.room)[0] || { x: tx.at(-1), y: fx(tx.at(-1)) };
  const v = item.visual || {};
  return {
    id, renderer: "graph", course: "knowledge", title: v.title || item.title, caption: v.caption, alt: v.alt, description: v.description,
    range: { x: [tx[0], tx.at(-1)], y: [ty[0], ty.at(-1)] }, ticks: [tx, ty], height: [340, 300], xLabelBelow: true,
    axisLabels: [`${X.label}${X.unit ? ` (${X.unit})` : ""}`, `${Y.label}${Y.unit ? ` (${Y.unit})` : ""}`],
    points: pts.map(([x, y]) => ({ x, y, colour: "a1" })),
    ...(D.fitLine !== false ? { curves: [{ expr: `${fit.slope.toFixed(6)}*x+${fit.intercept.toFixed(6)}`, colour: "a2", dash: "7 5", width: 2.2, domain: [Math.min(...xs, ...(zero ? [x0] : [])), Math.max(...xs, ...(zero ? [x0] : []))], label: "line of best fit", labelAt: [spot.x, spot.y], anchor: "middle" }] } : {}),
    ...(zero ? { marks: [{ x: x0, to: 0 }], points: [...pts.map(([x, y]) => ({ x, y, colour: "a1" })), { x: x0, y: 0, colour: "a2", label: `≈ ${x0} ${X.unit || ""}`, dx: -8, dy: (ty.at(-1) - ty[0]) > 0 ? 30 : -14, anchor: "end" }] } : {}),
    checks: [
      { type: "point", expr: `${fit.slope.toFixed(6)}*x+${fit.intercept.toFixed(6)}`, x: xs.reduce((a, b) => a + b, 0) / xs.length, y: +(fit.slope.toFixed(6) * (xs.reduce((a, b) => a + b, 0) / xs.length) + +fit.intercept.toFixed(6)).toFixed(6), name: "the line of best fit passes through the mean of the data (a least-squares line)" },
      ...(zero ? [{ type: "point", expr: `${fit.slope.toFixed(6)}*x+${fit.intercept.toFixed(6)}`, x: +(-fit.intercept.toFixed(6) / fit.slope.toFixed(6)).toFixed(6), y: 0, name: "the line crosses zero where the lesson says" }] : []),
    ],
    from: { item: item.id, version: item.version, form: item.form }, dataClaims: D.claims || [],
  };
}
/** a diagram spec for an item's visual brief, in the item's form for the lesson's level */
export function visualSpec(item, level, id) {
  const k = resolve(item, level); if (!k?.visual) return null;
  if (k.kind === "dataset" && k.visual.renderer === "graph") return dataGraph(k, id);
  const { renderer: r, data = {}, title, caption, alt, description } = k.visual;
  if (!title || !caption || !alt) return null;
  return { id, renderer: r, course: "knowledge", title, caption, alt, description, ...structuredClone(data), from: { item: k.id, version: k.version, form: k.form } };
}
/**
 * Diagrams already in the library (kit/diagrams/manifest.json) that suit a lesson: on its subject and main concept,
 * not failed, and using no term the lesson's level doesn't teach (a GCSE lesson can't use one about water potential).
 */
export function selectLibraryDiagrams(lessonText, level, items, allItems, { subject, main = null }) {
  const man = load(new URL("manifest.json", DIAGRAMS)) || {};
  const entries = Object.entries(man).filter(([, e]) => e.course === subject && e.status !== "failed");
  const idx = bm25(entries.map(([id, e]) => ({ id, text: `${e.title} ${e.caption} ${e.lesson}` })));
  const taught = new Set(items.flatMap((k) => (k.terms || []).map((t) => t.term.toLowerCase())));
  const rank = rankOf(level), hereTerms = new Set(allItems.flatMap((k) => (resolve(k, level)?.terms || []).map((t) => t.term.toLowerCase())));
  const aboveLevel = [...new Set(allItems.flatMap((k) => [...(rankOf(k.level.from) > rank ? k.terms || [] : []), ...(k.forms || []).filter((f) => rankOf(f.level.from) > rank).flatMap((f) => f.terms || [])]).map((t) => t.term.toLowerCase()))].filter((t) => !hereTerms.has(t) && !taught.has(t));
  const mainWords = tokens(main || "");
  return idx.search(lessonText).slice(0, 6).map((h) => {
    const e = man[h.id], words = `${e.title} ${e.caption} ${e.alt} ${(e.description || []).join(" ")}`.toLowerCase();
    const tooDeep = [...new Set(aboveLevel.filter((t) => new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(words)))];
    const onTopic = !main || tokens(`${e.lesson} ${e.title}`).some((w) => mainWords.some((m) => m.length >= 5 && (w.startsWith(m) || m.startsWith(w.slice(0, Math.max(5, w.length - 3))))));
    return { id: h.id, score: h.score, status: e.status, title: e.title, usable: !tooDeep.length && onTopic && h.score >= 8, reason: tooDeep.length ? `uses ${tooDeep.join(", ")}, beyond ${LEVELS[level].name}` : !onTopic ? `on another topic (${e.lesson})` : h.score < 8 ? "not closely related" : "fits" };
  });
}

// ---------- assembly ----------
const firstSentence = (s) => String(s).split(/(?<=[.!?])\s/)[0];
const lc = (s) => (/^[A-Z]{2}/.test(s) ? s : s[0].toLowerCase() + s.slice(1));
const OBJ = {
  definition: (k) => `Define ${lc(k.terms?.[0]?.term || k.title)} and use the term correctly`, concept: (k) => `Explain ${lc(k.title)}`, fact: (k) => `Recall ${lc(k.title)}`,
  mechanism: (k) => `Explain ${lc(k.title)}`, application: (k) => `Predict and explain ${lc(k.title)}`, equation: (k) => `Use ${k.equation} to work out ${lc(k.title)}`,
  method: (k) => (k.compute ? `Calculate ${lc(k.title)}` : k.compute === undefined && /^Using /.test(k.title) ? k.title.replace(/^Using /, "Use ") : `Work with ${lc(k.title)}`), practical: (k) => `Plan and carry out ${lc(k.title)}, and analyse and evaluate the results`, dataset: (k) => `Interpret ${lc(k.title)}`, "worked-example": (k) => `Solve problems like "${k.title}"`,
};
const ORDER = ["definition", "concept", "fact", "mechanism", "equation", "method", "worked-example", "practical", "dataset", "application", "misconception"];

export async function assemble(reqId, { subject = "biology", level: forceLevel } = {}) {
  const req = await loadRequirement(reqId), level = forceLevel || req.level, tpl = templateFor(level, req.subject, { kind: req.statementKind });
  const all = loadKnowledge(subject), raw = new Map(all.map((k) => [k.id, k]));
  const r = retrieve({ ...req, level }, all), slug = slugOf(reqId, level);
  const R = (id) => resolve(raw.get(id), level);
  // teaching order: by kind, and every item after the items in the lesson it depends on
  const sorted = r.items.map((x) => R(x.id)).sort((a, b) => ORDER.indexOf(a.kind) - ORDER.indexOf(b.kind));
  const inLesson = [], placed = new Set(), place = (k) => { if (placed.has(k.id)) return; placed.add(k.id); for (const p of k.prereqs || []) { const q = sorted.find((x) => x.id === p); if (q) place(q); } inLesson.push(k); };
  sorted.forEach(place);
  const kinds = (...ks) => inLesson.filter((k) => ks.includes(k.kind));
  const isName = (k) => k.terms?.some((t) => t.term.toLowerCase() === r.main || t.term.toLowerCase().replace(/s$/, "") === r.main?.replace(/s$/, ""));
  // the lesson's anchor: the practical, for a practical; a dataset or calculation for a skill that asks for one; else the main concept's definition
  const anchor = (r.kind === "practical" && kinds("practical")[0]) || (r.kind === "skill" && (kinds("dataset")[0] || kinds("equation", "method")[0])) || inLesson.find((k) => k.kind === "definition" && isName(k)) || inLesson.find((k) => ["definition", "concept"].includes(k.kind) && k.concepts[0] === r.main) || inLesson[0];
  const objItems = [anchor, ...inLesson.filter((k) => k !== anchor && ["definition", "concept", "mechanism", "application", "equation", "method", "dataset"].includes(k.kind) && !(r.kind === "practical" && k.kind === "definition"))].filter((k, i, a) => a.indexOf(k) === i && (k.kind !== "definition" || k === anchor)).slice(0, 5);
  const objectives = objItems.map((k) => (OBJ[k.kind] || OBJ.concept)(k));
  const objectiveOf = (id) => { const i = objItems.findIndex((k) => k.id === id); if (i >= 0) return [i + 1]; const k = R(id); const j = objItems.findIndex((o) => o.concepts.some((c) => k?.concepts.includes(c))); return j >= 0 ? [j + 1] : [1]; };
  const definedHere = new Set(inLesson.flatMap((k) => (k.terms || []).map((t) => t.term.toLowerCase())));
  const prior = r.prior.map((p) => R(p.id)).filter((k) => k && !(k.terms?.length && k.terms.every((t) => definedHere.has(t.term.toLowerCase()))));
  const P = kinds("practical")[0]?.practical;

  // diagrams: generated from the visual briefs of the lesson's items (in their forms for this level)
  const render = await renderer(), assets = [];
  for (const k of inLesson.filter((x) => x.visual)) {
    const spec = visualSpec(raw.get(k.id), level, `${slug}-${k.id.split(".").slice(1).join("-")}`);
    if (!spec) continue;
    const out = render(spec);
    assets.push({ id: spec.id, kind: "diagram", origin: "generated", renderer: spec.renderer, from: spec.from, spec, svg: out, checks: out.checks });
  }
  const lessonWords = inLesson.map(claimText).join(" ");
  const library = selectLibraryDiagrams(lessonWords, level, inLesson, all, { subject, main: r.main });
  const placedD = new Set();
  const D = (k) => { const a = assets.find((x) => x.from.item === k.id && !placedD.has(x.id)); if (!a) return []; placedD.add(a.id); return [`D: ${a.id}`]; };

  // each template component, in order
  const comp = {}, lines = [`## ${req.sectionTitle}`, `S: ${anchor.summary || firstSentence(anchor.text || anchor.title)}`, `LV: ${LEVELS[level].name}`];
  const ex = (k) => (k.examples?.length ? [`P: For example:`, ...k.examples.map((e) => `- ${e}`)] : []);
  const C = {
    objectives: () => objectives.map((o) => `O: ${o}`),
    prior: () => prior.map((p) => `PRE: ${p.title}`),
    explain: () => { const xs = kinds("definition", "concept"), fs = kinds("fact"); if (!xs.length && !fs.length) return []; const mt = anchor.terms?.find((t) => isName({ terms: [t] })) || (r.kind === "content" ? anchor.terms?.[0] : null); return [...(xs.length ? ["H: The idea", ...xs.flatMap((k) => [`P: ${k.text}`, ...ex(k)]), ...(mt ? [`K: **${mt.term}**: ${lc(mt.definition)}.`] : [])] : []), ...fs.flatMap((k) => [`H: ${k.title}`, `P: ${k.text}`, ...ex(k)])]; },
    mechanism: () => kinds("mechanism").flatMap((k) => [`H: ${k.title}`, ...(k.text ? [`P: ${k.text}`] : []), ...k.steps.map((s) => `- ${s}`), ...D(k)]),
    visual: () => { const out = inLesson.flatMap((k) => (k.kind === "dataset" ? [] : D(k))); return out; },
    terms: () => [],
    quantitative: () => { const xs = kinds("equation", "method"); return xs.length ? ["H: Calculations", ...xs.flatMap((k) => [`P: ${k.text}`, ...(k.equation ? [`E: ${k.equation}${k.equationNote ? ` :: ${k.equationNote}` : ""}`] : []), ...(k.steps || []).map((s) => `- ${s}`), ...ex(k), ...D(k)])] : []; },
    worked: () => kinds("worked-example").flatMap((k) => [`X: ${k.text}`, ...k.steps.map((s) => `> ${s}`)]),
    practical: () => kinds("practical").flatMap((k) => [`H: ${k.title}`, `P: ${k.text}`]),
    data: () => kinds("dataset").flatMap((k) => dataLines(k)),
    misconceptions: () => kinds("misconception").map((k) => `!: "${k.wrong}" ${k.right}`),
    apply: () => kinds("application").flatMap((k) => [`H: ${k.title}`, `P: ${k.text}`, ...k.cases.map((c) => `- **${c.situation}:** ${lc(c.outcome)}. ${c.why}`)]),
    // the practical template's components, from the practical item
    aim: () => (P ? ["H: Aim", `P: ${P.aim}`, ...(P.hypothesis ? [`P: **Prediction:** ${P.hypothesis}`] : [])] : []),
    equipment: () => (P ? ["H: Equipment", ...P.equipment.map((e) => `- ${e}`)] : []),
    variables: () => (P ? ["H: Variables", `- **Independent variable** (what you change): ${P.variables.independent}`, `- **Dependent variable** (what you measure): ${P.variables.dependent}`, `- **Control variables** (kept the same): ${P.variables.control.join("; ")}`] : []),
    method: () => (P ? ["H: Method", ...P.method.map((m, i) => `- **${i + 1}.** ${m}`), ...(P.reasons?.length ? ["P: Why some steps matter:", ...P.reasons.map((x) => `- *${x.step}:* ${x.why}`)] : [])] : []),
    safety: () => (P ? ["H: Safety", ...P.safety.map((s) => `SAFE: ${s}`)] : []),
    results: () => (P ? ["H: Recording results", `P: ${P.results.text}`, `- ${P.results.columns.join(" | ").replace(/\|/g, "·")}`] : []),
    analysis: () => { const ms = kinds("method"), ws = kinds("worked-example"), ds = kinds("dataset"); return ["H: Analysing results", ...(P?.analysis || []).map((a) => `- ${a}`), ...ms.flatMap((k) => [`P: ${k.text}`, ...(k.equation ? [`E: ${k.equation}${k.equationNote ? ` :: ${k.equationNote}` : ""}`] : [])]), ...ws.flatMap((k) => [`X: ${k.text}`, ...k.steps.map((s) => `> ${s}`)]), ...ds.flatMap((k) => dataLines(k, true))]; },
    evaluation: () => (P ? ["H: Evaluating the investigation", ...P.evaluation.map((e) => `- ${e}`)] : []),
    evidence: () => [],
    practice: () => [],
    summary: () => [],
    connections: () => [],
  };
  function dataLines(k, inAnalysis = false) {
    const Dt = k.data, X = Dt.columns.find((c) => c.key === Dt.x), Y = Dt.columns.find((c) => c.key === Dt.y);
    const prov = Dt.provenance === "illustrative" ? "These are illustrative data, made up for practice: they are not real measurements." : `Data: ${Dt.provenance}.`;
    return [...(inAnalysis ? [`P: **${k.title}.** ${k.text}`] : [`H: ${k.title}`, `P: ${k.text}`]), `P: ${prov}`, `- ${Dt.columns.map((c) => `${c.label}${c.unit ? ` (${c.unit})` : ""}`).join(" · ")}`, ...Dt.rows.map((row) => `- ${row.join(" · ")}`), ...D(k), ...(k.steps || []).map((s) => `- ${s}`)].filter(Boolean).map((l) => l.replace(/\*\*\*\*/g, "")).concat(X && Y ? [] : []);
  }
  for (const c of tpl.components) { const out = (C[c.id] || (() => []))(); lines.push(...out); comp[c.id] = out.length; }
  // a library diagram, when the template wants a visual and none was generated for the main idea
  if (!assets.some((a) => a.origin === "generated" && a.renderer !== "graph") && tpl.visual !== "optional") {
    for (const d of library.filter((x) => x.usable).slice(0, 1)) { assets.push({ id: d.id, kind: "diagram", origin: "library", status: d.status, title: d.title }); const at = lines.findIndex((l) => l.startsWith("H: ") && !/^H: (The idea|Calculations)$/.test(l)); lines.splice(at > 0 ? at + 1 + lines.slice(at + 1).findIndex((l) => l.startsWith("H: ") || /^(T|SUM|SRC|!):/.test(l)) : lines.length, 0, `D: ${d.id}`); }
  }
  comp.visual = assets.length;
  // where this leads: the other statements of the section, and deeper knowledge for later
  if (req.siblings.length || r.excludedAboveLevel.length) {
    lines.push("H: Where this leads");
    if (req.siblings.length) lines.push(`P: The rest of ${req.title.replace(/ (\d+(?:\.\d+)+) (.+)$/, " $1 ($2)")} has its own lessons: ${req.siblings.join(", ")}.`);
    const later = r.excludedAboveLevel.map((id) => raw.get(id)).filter((k) => ["concept", "definition", "fact", "equation", "mechanism"].includes(k.kind)).map((k) => lc(k.title.replace(/, in terms of /, " in terms of ")));
    if (later.length) lines.push(`P: Later, at A level and university: ${[...new Set(later)].join("; ")}.`);
    comp.connections = req.siblings.length + later.length;
  }
  // key terms, summary, sources, questions (metadata lines: order doesn't change how they're shown)
  const terms = [...new Map(inLesson.flatMap((k) => (k.terms || []).map((t) => [t.term, t]))).values()];
  for (const t of terms) lines.push(`T: ${t.term} | ${t.definition}`);
  comp.terms = terms.length;
  for (const k of [anchor, ...inLesson.filter((x) => x !== anchor && x.summary)].slice(0, 5)) lines.push(`SUM: ${k.summary || firstSentence(k.text).replace(/\*\*/g, "")}`);
  comp.summary = true;
  const sources = loadSources(), used = [...new Set(inLesson.flatMap((k) => k.sources.map((s) => s.source)))];
  const attributed = [];
  for (const s of used.map((id) => sources[id]).filter((s) => s && LICENCES[s.licence]?.attribution)) { lines.push(`SRC: ${s.publisher}, ${s.title} (${s.authors.join(", ")}), ${s.licenceName}: ${s.policy === "reuse" ? "adapted" : "used to check facts, not reproduced"} | secondary | ${s.retrievedOn} | ${s.readerUrl || s.url}`); attributed.push(s.id); }
  for (const c of inLesson.flatMap((k) => k.sources.filter((s) => s.cites).map((s) => s.cites))) lines.push(`SRC: ${c.citation} | ${c.kind} | ${c.date} | ${c.link}`);
  comp.evidence = used.length;
  const qs = generateQuestions(inLesson, { slug, objectiveOf, focus: r.kind, priority: objItems.map((k) => k.id) });
  for (const q of qs) lines.push(q.line);
  comp.practice = qs.length;
  const notes = `${lines.join("\n")}\n`;
  const lesson = {
    id: slug, title: req.sectionTitle, level, subject, template: tpl.id, requirementKind: r.kind,
    requirement: { id: req.id, kind: req.kind, title: req.title, hash: req.hash, version: req.version || null, page: req.page || null, statementKind: req.statementKind, higherTier: req.higherTier || false, biologyOnly: req.biologyOnly || false },
    objectives,
    knowledge: inLesson.map((k) => ({ id: k.id, version: k.version, form: k.form, hash: itemHash(raw.get(k.id)), formHash: formHash(raw.get(k.id), level), status: k.status, origin: k.origin?.type || "original", why: r.items.find((x) => x.id === k.id).why })),
    prior: prior.map((k) => ({ id: k.id, version: k.version, form: k.form, hash: itemHash(raw.get(k.id)), formHash: formHash(raw.get(k.id), level) })),
    retrieval: { main: r.main, kind: r.kind, items: r.items, excludedAboveLevel: r.excludedAboveLevel },
    assets: assets.map(({ svg, spec, ...a }) => a),
    library: library.map(({ id, usable, reason, score }) => ({ id, usable, reason, score })),
    questions: qs.map(({ line, ...q }) => q),
    components: comp, sources: used, attributed,
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
