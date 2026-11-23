// Coverage of the official England requirements by a Gradify course, computed only from the structured data:
//   data/curriculum/requirements/england-biology.json   official requirements (scripts/curriculum/extract-specs.py)
//   data/curriculum/inventory/<slug>.json                the course's lessons and resources (inventory.mjs)
//   data/curriculum/mapping/<slug>-england.json          judged lesson → requirement links (build-mapping.mjs)
// and writes, never by hand:
//   data/curriculum/mapping/<slug>-england-resources.json  resource → requirement mapping (inherited, with exceptions)
//   data/curriculum/reports/<slug>-england-coverage.json    every statistic below
//   docs/curriculum/<slug>-england-coverage.md              the readable report
//   data/curriculum/progress.json                           the machine-readable progress tracker
//
//   node scripts/curriculum/report.mjs biology
//
// Counting rules (so coverage can't be inflated):
//   a requirement is counted once, at the strongest single lesson link it has: full > partial > indirect > none.
//   Several partial lessons never add up to "full"; many resources on one requirement count once.
//   "Uncertain" = the judged status rests only on low-confidence links.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { norm } from "../../kit/core/text.js";
import { mappingOf, MAPPING } from "../../kit/curriculum/coverage.js";

const slug = process.argv[2] || "biology";
const root = new URL("../../", import.meta.url);
const read = async (p) => JSON.parse(await readFile(new URL(p, root), "utf8"));
const R = await read("data/curriculum/requirements/england-biology.json");
const inv = await read(`data/curriculum/inventory/${slug}.json`);
const M = await read(`data/curriculum/mapping/${slug}-england.json`);
const REQ = new Map(R.requirements.map((r) => [r.id, r]));
const LES = new Map(inv.lessons.map((l) => [l.id, l]));
const today = M.generated;

// ---------------------------------------------------------------- groups: years, stages, qualifications, boards
const GROUPS = [];
for (const y of [1, 2, 3, 4, 5, 6]) GROUPS.push({ key: `y${y}`, name: `Year ${y} (national curriculum, statutory, year by year)`, test: (r) => r.source === "dfe-nc" && r.discipline === "biology" && r.yearAllocation === "year" && r.years[0] === y });
GROUPS.push({ key: "ks3", name: "Key stage 3, Years 7–9 (national curriculum, by stage)", test: (r) => r.source === "dfe-nc" && r.discipline === "biology" && r.keyStage === "KS3" });
GROUPS.push({ key: "ks4", name: "Key stage 4, Years 10–11 (national curriculum programme of study)", test: (r) => r.source === "dfe-nc" && r.discipline === "biology" && r.keyStage === "KS4" });
for (const ks of ["KS1", "KS2", "KS3", "KS4"]) GROUPS.push({ key: `ws-${ks.toLowerCase()}`, name: `Working scientifically, ${ks} (science-wide)`, test: (r) => r.source === "dfe-nc" && r.discipline === "science-wide" && r.keyStage === ks });
for (const [src, s] of Object.entries(R.sources)) if (src !== "dfe-nc") {
  GROUPS.push({ key: src, name: `${s.name}: all content`, test: (r) => r.source === src });
  if (["aqa-8461", "edexcel-1bi0", "ocr-j257"].includes(src)) {
    GROUPS.push({ key: `${src}-combined`, name: `${s.name}: content shared with ${s.combined}`, test: (r) => r.source === src && r.separateOnly === false });
    GROUPS.push({ key: `${src}-separate`, name: `${s.name}: separate Biology only`, test: (r) => r.source === src && r.separateOnly === true });
  }
}

// ---------------------------------------------------------------- requirement status
const linksBy = new Map(); for (const m of M.mappings) (linksBy.get(m.requirement) || linksBy.set(m.requirement, []).get(m.requirement)).push(m);
const statusOf = (id) => M.requirements[id]?.status || "pending";
const uncertain = (id) => (M.requirements[id]?.confidence === "low");
function tally(ids) {
  const t = { total: ids.length, full: 0, partial: 0, indirect: 0, uncovered: 0, pending: 0, uncertain: 0 };
  for (const id of ids) { t[statusOf(id)]++; if (uncertain(id)) t.uncertain++; }
  t.fullPct = t.total ? Math.round((100 * t.full) / t.total) : 0;
  // each status has its own share; they are never added together (a partial match is not coverage)
  for (const k of ["partial", "indirect", "uncovered"]) t[`${k}Pct`] = t.total ? Math.round((100 * t[k]) / t.total) : 0;
  const ls = new Set(ids.flatMap((id) => (linksBy.get(id) || []).filter((l) => l.match !== "indirect").map((l) => l.lesson)));
  t.lessons = ls.size;
  t.resources = inv.resources.filter((x) => (x.lessons || [x.lesson]).some((l) => ls.has(l))).length;
  return t;
}

// ---------------------------------------------------------------- resource mapping (Phase 5)
// Every resource inherits its lesson's links. A resource is marked "specific" for a requirement when its own wording
// overlaps the requirement's (it tests that content directly); for a partial or indirect lesson link, only specific
// resources count as evidence. A level-3 question under a key stage 1–3 requirement is marked "above stage".
const STOP = new Set("the a an and or of in on to for with by from as at is are be that this their its into how what which why including include describe explain use using understand recall students should able learners about between within such some other can may will they them these those than more most what which".split(" "));
const stem = (w) => w.replace(/(ies)$/, "y").replace(/(sses)$/, "ss").replace(/([^s])s$/, "$1").replace(/(ing|ed)$/, "");
const toks = (t) => new Set(String(t || "").toLowerCase().replace(/\*\*|[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w.length > 3 && !STOP.has(w)).map(stem));
const reqToks = new Map(R.requirements.map((r) => [r.id, toks(`${r.title || ""} ${r.text} ${r.include || ""}`)]));
const byLesson = new Map(); for (const m of M.mappings) (byLesson.get(m.lesson) || byLesson.set(m.lesson, []).get(m.lesson)).push(m);
const specific = {}, above = {}; let inheritedPairs = 0;
const specificByReq = new Map();
for (const x of inv.resources) {
  const lessons = x.lessons || [x.lesson];
  const t = x.type === "mindmap" ? new Set() : toks(`${x.q || ""} ${x.a || ""} ${x.title || ""} ${x.ref || ""}`);
  for (const l of lessons) for (const m of byLesson.get(l) || []) {
    inheritedPairs++;
    const hit = [...t].filter((w) => reqToks.get(m.requirement).has(w)).length;
    if (hit >= 2) { (specific[x.id] ||= []).push(m.requirement); (specificByReq.get(m.requirement) || specificByReq.set(m.requirement, new Set()).get(m.requirement)).add(x.id); }
    const r = REQ.get(m.requirement);
    if (x.d === 3 && ["KS1", "KS2", "KS3"].includes(r.keyStage)) (above[x.id] ||= []).push(m.requirement);
  }
}
const resourceMap = {
  slug, generated: today, review: M.review,
  method: "Every resource inherits all of its lesson's requirement links (an interactive, those of each lesson it is used in; mind maps are generated from the notes and always inherit). 'specific' lists the requirements whose wording a resource's own question, answer or title overlaps by two or more content words: it tests that content directly. For a partial or indirect lesson link, only specific resources count as evidence. 'aboveStage' lists key stage 1–3 requirements for which a level-3 (Biological reasoning) question is above the stage. Teaching material is not changed.",
  counts: { resources: inv.resources.length, inheritedPairs, specificResources: Object.keys(specific).length, specificPairs: Object.values(specific).reduce((s, v) => s + v.length, 0), aboveStageResources: Object.keys(above).length },
  specific, aboveStage: above,
};

// ---------------------------------------------------------------- lessons: placement, unaligned, duplication
const KS3_SEQUENCE = { "cells-and-organisation": 7, "the-skeletal-and-muscular-systems": 7, reproduction: 7, "relationships-in-an-ecosystem": 7, "nutrition-and-digestion": 8, "gas-exchange-systems": 8, health: 8, photosynthesis: 8, "cellular-respiration": 8, "inheritance-chromosomes-dna-and-genes": 9 };
function placement(lessonId) {
  const ls = (byLesson.get(lessonId) || []).filter((m) => m.match !== "indirect");
  const reqs = ls.map((m) => ({ m, r: REQ.get(m.requirement) }));
  const primary = reqs.filter(({ m, r }) => r.discipline === "biology" && r.yearAllocation === "year" && m.match === "full" && !/^above\b/.test(m.note || "")).map(({ r }) => r.years[0]);
  if (primary.length) return { year: Math.min(...primary), basis: "national curriculum (statutory year)" };
  const ks3 = reqs.filter(({ r }) => r.discipline === "biology" && r.keyStage === "KS3").map(({ r }) => KS3_SEQUENCE[r.id.replace(/^eng-nc-ks3-/, "").replace(/-\d+$/, "")]).filter(Boolean);
  if (ks3.length) return { year: Math.min(...ks3), basis: "Gradify's suggested sequence within key stage 3 (the national curriculum does not assign years 7–9)" };
  if (reqs.some(({ r }) => r.keyStage === "KS4" && r.discipline === "biology")) return { year: 10, basis: "key stage 4 / GCSE (years 10–11, by stage)" };
  if (reqs.some(({ r }) => r.discipline === "science-wide")) return { year: null, basis: "working scientifically only" };
  return { year: null, basis: "beyond the England years 1–11 curriculum" };
}
const lessonRows = inv.lessons.map((l) => {
  const ms = byLesson.get(l.id) || [];
  const best = ms.some((m) => m.match === "full") ? "full" : ms.some((m) => m.match === "partial") ? "partial" : ms.length ? "indirect" : "none";
  return { id: l.id, title: l.title, unit: l.unit, links: ms.length, best, placement: placement(l.id) };
});
const unaligned = lessonRows.filter((x) => x.best === "none" || x.best === "indirect");
// duplicated content: the same (normalised) lesson title in two schools, or two lessons with full links to largely the same requirements
const byTitle = new Map(); for (const l of inv.lessons) (byTitle.get(norm(l.title)) || byTitle.set(norm(l.title), []).get(norm(l.title))).push(l.id);
const sameTitle = [...byTitle.values()].filter((v) => v.length > 1);
const fullSets = new Map(lessonRows.map((x) => [x.id, new Set((byLesson.get(x.id) || []).filter((m) => m.match === "full").map((m) => m.requirement))]));
const overlapPairs = [];
const ids = [...fullSets.keys()].filter((id) => fullSets.get(id).size >= 3);
for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
  const a = fullSets.get(ids[i]), b = fullSets.get(ids[j]); if (ids[i].slice(0, 3) === ids[j].slice(0, 3)) continue;
  const inter = [...a].filter((x) => b.has(x)).length, j2 = inter / Math.min(a.size, b.size);
  if (inter >= 3 && j2 >= 0.6) overlapPairs.push({ a: ids[i], b: ids[j], shared: inter, overlap: +j2.toFixed(2) });
}
overlapPairs.sort((x, y) => y.shared - x.shared);

// ---------------------------------------------------------------- gaps: requirements needing teaching material
// Every requirement short of an age-appropriate full match is a gap of one of three kinds, which need different fixes:
//   missing    no lesson teaches it (uncovered, or touched on only): new teaching material
//   depth      a lesson covers part of it: extend or deepen what exists, not a new lesson by default
//   age-level  primary content taught only at secondary depth: age-appropriate material, not more secondary lessons
// Priority follows the plan: GCSE, then key stage 3, then practical skills, then primary.
const isPractical = (r) => r.practical || /^(Core Practical|Specified practical)|Required practical/i.test(r.text) || /PAG\d/.test(r.text);
const isPrimary = (r) => r.source === "dfe-nc" && ["KS1", "KS2"].includes(r.keyStage);
const PRIORITY = { 1: "GCSE (exam specifications and the statutory key stage 4 programme)", 2: "Key stage 3", 3: "Practical skills and investigations", 4: "Primary (years 1–6)" };
const priorityOf = (r) => (isPractical(r) ? 3 : isPrimary(r) ? 4 : r.keyStage === "KS3" ? 2 : 1);
const gapItems = [];
for (const r of R.requirements) {
  const st = statusOf(r.id), j = M.requirements[r.id] || {};
  let kind = null;
  if (isPrimary(r)) kind = st === "uncovered" || st === "indirect" ? "missing" : st === "partial" || j.above ? "age-level" : null;
  else kind = st === "uncovered" || st === "indirect" ? "missing" : st === "partial" ? "depth" : null;
  if (kind) gapItems.push({ id: r.id, source: r.source, kind, priority: priorityOf(r), status: st, note: j.note || null });
}
const needs = gapItems.map((g) => REQ.get(g.id));
// themes: group the gaps by the words their notes use, so the report can name the missing topics
const THEMES = [  // first match wins: most specific first
  ["Working scientifically at primary age", (r) => /^eng-nc-(ks1|lks2|uks2)-ws/.test(r.id)],
  ["Primary science (years 1–6): identification, needs, life cycles and health", (r) => /^eng-nc-y\d/.test(r.id)],
  ["The eye and its defects", /\beye\b/i],
  ["Plant disease and plant defences", /plant (disease|defence|pathogen)|plants? .{0,20}defen|prevention in plants|spread in plants|crown gall|ash dieback/i],
  ["Respiration in animals, exercise and lactic acid", /respiration|lactic|exercise on the gas/i],
  ["Selective breeding, farming and food security", /selective breeding|food security|farming|agricultur|pollinat.*food|food production|economic development|deforestation/i],
  ["Diet, nutrition, food tests and energy in food", /diet|calorimetry|energy requirements|food tests|nutrition/i],
  ["Health, non-communicable disease and its treatment", /defines health|health and disease|non-communicable|disease interactions|interactions between|lifestyle|cardiovascular disease|treatments for|percentile|incidence/i],
  ["Communicable disease: named examples, STIs, vaccination choices and monoclonal uses", (r, t) => /\bSTIs?\b/.test(t) || /\bnamed\b|\bdiseases\b|pregnancy test|vaccinat|monoclonal|pathogen/i.test(t)],
  ["Drugs, medicines and clinical trials", /drug|painkiller|clinical|medicine/i],
  ["Decomposition and decay", /decompos|decay/i],
  ["The brain and senses", /brain|nervous-system damage|sense organs/i],
  ["Practical work, techniques and calculations", /practical|investigat|dissection|carried out|extract|inverse square|profiling|stone tools/i],
];
const themeOf = (r) => { const t = `${M.requirements[r.id]?.note || ""} ${r.text}`; return (THEMES.find(([, re]) => (typeof re === "function" ? re(r, t) : re.test(t))) || ["Other"])[0]; };
const gapThemes = {}; for (const r of needs) (gapThemes[themeOf(r)] ||= []).push(r.id);
for (const g of gapItems) g.theme = themeOf(REQ.get(g.id));
// themes ranked within each priority: how many separate documents ask for it, then how much is missing outright
const KINDS = ["missing", "depth", "age-level"];
const gapList = Object.entries(PRIORITY).map(([p, name]) => {
  const xs = gapItems.filter((g) => g.priority === Number(p)), by = {};
  for (const g of xs) (by[g.theme] ||= []).push(g);
  const themes = Object.entries(by).map(([theme, gs]) => ({ theme, requirements: gs.length, documents: new Set(gs.map((g) => g.source)).size,
    ...Object.fromEntries(KINDS.map((k) => [k, gs.filter((g) => g.kind === k).length])), ids: gs.map((g) => g.id) }))
    .sort((a, b) => b.documents - a.documents || b.missing - a.missing || b.requirements - a.requirements);
  return { priority: Number(p), name, requirements: xs.length, ...Object.fromEntries(KINDS.map((k) => [k, xs.filter((g) => g.kind === k).length])), themes };
});

// ---------------------------------------------------------------- write
const groups = GROUPS.map((g) => ({ key: g.key, name: g.name, ...tally(R.requirements.filter(g.test).map((r) => r.id)) }));
const all = tally(R.requirements.map((r) => r.id));
const lessonsMapped = lessonRows.filter((x) => x.best === "full" || x.best === "partial").length;
const resourcesMapped = inv.resources.filter((x) => (x.lessons || [x.lesson]).some((l) => ["full", "partial"].includes(lessonRows.find((y) => y.id === l)?.best))).length;
const coverage = {
  slug, system: "uk-eng", generated: today, review: M.review, countingRules: "Each requirement counts once, at its strongest single lesson link (full > partial > indirect > none). Resources never add to a requirement's count.",
  overall: all, groups, lessons: { total: inv.lessons.length, mapped: lessonsMapped, unaligned: unaligned.length, unalignedList: unaligned.map((x) => ({ id: x.id, title: x.title, best: x.best })) },
  resources: { total: inv.resources.length, mappedViaLessons: resourcesMapped, specificResources: resourceMap.counts.specificResources, aboveStageResources: resourceMap.counts.aboveStageResources },
  placement: lessonRows.map((x) => ({ id: x.id, year: x.placement.year, basis: x.placement.basis })),
  gaps: { count: gapItems.length, kinds: Object.fromEntries(KINDS.map((k) => [k, gapItems.filter((g) => g.kind === k).length])), prioritised: gapList, items: gapItems },
  mappingState: mappingOf(slug), completeness: Object.fromEntries(Object.entries(R.sources).map(([k, s]) => [k, s.notExtracted || []])),
  duplication: { sameTitle, overlapPairs: overlapPairs.slice(0, 40) },
};
await mkdir(new URL("data/curriculum/reports/", root), { recursive: true });
await mkdir(new URL("docs/curriculum/", root), { recursive: true });
await writeFile(new URL(`data/curriculum/mapping/${slug}-england-resources.json`, root), JSON.stringify(resourceMap));
await writeFile(new URL(`data/curriculum/reports/${slug}-england-coverage.json`, root), JSON.stringify(coverage, null, 1));

// progress tracker: phases and batches, from the data
const batches = {}; for (const [id, j] of Object.entries(M.requirements)) batches[j.batch] = (batches[j.batch] || 0) + 1;
const progress = {
  updated: today, pilot: `${slug} → England, years 1–11`,
  phases: {
    "1-audit": "done", "2-inventory": "done", "3-requirements": `done: ${R.requirements.length} requirements from ${Object.keys(R.sources).length} documents`,
    "4-lesson-mapping": M.counts.pending ? `in progress: ${M.counts.judged} of ${M.counts.requirements}` : `done: ${M.counts.judged} requirements judged, ${M.counts.links} lesson links`,
    "5-resource-mapping": `done: inheritance with ${resourceMap.counts.specificResources} resources matched specifically and ${resourceMap.counts.aboveStageResources} flagged above stage`,
    "6-coverage": "done (generated)", "7-implementation": "done: data, scripts, tests; no runtime or database changes",
    review: M.counts.reviewedLinks ? `in progress: ${M.counts.reviewedLinks} of ${M.counts.links} links decided` : "not started: queue ready (docs/curriculum/biology-england-review-queue.md); status stays ai-drafted until a named reviewer decides every link",
    "registry-state": `${mappingOf(slug).state} (kit/curriculum/coverage.js); learner-facing claim unchanged`,
  },
  batches,
  notExtracted: Object.values(R.sources).flatMap((s) => (s.notExtracted || []).map((x) => `${s.name}: ${x}`)),
  next: ["Find the earlier UK Coverage dataset and import it with scripts/curriculum/import-requirements.mjs (don't re-extract those documents)", "Specialist review in queue order, recording decisions in data/curriculum/review/biology-england-decisions.json", "Extract the practical-skills chapters, appendices and Combined Science specifications before any comprehensive GCSE claim", "Decide Biology's intended scope, then address gaps in priority order (GCSE, key stage 3, practical, primary); no lessons written yet", "Only then reuse the pipeline for the next subject"],
};
await writeFile(new URL("data/curriculum/progress.json", root), JSON.stringify(progress, null, 1));

// the readable report
const pct = (t) => `${t.fullPct}% full, ${t.partialPct}% partial, ${t.indirectPct}% indirect, ${t.uncoveredPct}% uncovered`;
const row = (g) => `| ${g.name} | ${g.total} | ${g.full} (${g.fullPct}%) | ${g.partial} (${g.partialPct}%) | ${g.indirect} | ${g.uncovered} | ${g.uncertain} | ${g.lessons} |`;
const md = [
  `# SciGradify Biology against the England curriculum: coverage`,
  ``,
  `_Generated ${today} by \`scripts/curriculum/report.mjs\` from the structured data. Don't edit by hand._`,
  ``,
  `> **Status: ${MAPPING[mappingOf(slug).state].name} (${M.review.status}, ${M.counts.reviewedLinks} of ${M.counts.links} links reviewed).** Every link was judged by an AI mapper from lesson objectives, headings and searches of the lesson notes, with evidence quoted from the lesson. No teacher, examiner or awarding body has checked it. This is not an official alignment, and no awarding body endorses Gradify. None of these figures is a measure of teaching quality, and none should be used in marketing.`,
  ``,
  `## Counting rules`,
  ``,
  `- Each official requirement is counted **once**, at its strongest single lesson link: **full** (a lesson teaches all of it), **partial** (part of it), **indirect** (touched on only), or **uncovered**.`,
  `- Several partial lessons never add up to a full match, and many resources on one requirement count once.`,
  `- **Uncertain**: the status rests only on low-confidence links.`,
  `- Lessons and resources count only through full or partial links.`,
  ``,
  `## Overall`,
  ``,
  `| Full | Partial | Indirect only | Uncovered | Uncertain (low confidence) |`, `|---|---|---|---|---|`,
  `| ${all.full} (${all.fullPct}%) | ${all.partial} (${all.partialPct}%) | ${all.indirect} (${all.indirectPct}%) | ${all.uncovered} (${all.uncoveredPct}%) | ${all.uncertain} |`, ``,
  `Out of ${all.total} official requirements. The four statuses are separate and are never added together: a partial match means part of the requirement is not taught, so it is not coverage.`,
  ``,
  `${lessonsMapped} of ${inv.lessons.length} lessons have at least one full or partial match. Through them, ${resourcesMapped} of ${inv.resources.length} linked resources (flashcards, questions, diagrams, interactives and the generated mind maps) are mapped. ${resourceMap.counts.specificResources} resources match a requirement's wording directly.`,
  ``,
  `## By year, stage, qualification and board`,
  ``,
  `| Curriculum | Requirements | Full | Partial | Indirect | Uncovered | Uncertain | Lessons |`,
  `|---|---|---|---|---|---|---|---|`,
  ...groups.map(row),
  ``,
  `Years 1–6 are statutory year by year. Key stage 3 is set by stage: any year placement within years 7–9 below is **Gradify's suggested sequence**, not the national curriculum's. GCSE content belongs to years 10–11 as a stage. Key stage 1–2 content is mostly taught here at secondary depth, which the mapping marks "above": it covers the idea, but isn't written for that age.`,
  ``,
  `## Specification completeness`,
  ``,
  `**Comprehensive GCSE specification coverage can't be claimed yet.** These parts of the documents are not extracted, so the GCSE figures above leave them out:`,
  ``,
  ...Object.values(R.sources).flatMap((s) => (s.notExtracted || []).map((x) => `- ${s.name}: ${x}`)),
  ``,
  `## Prioritised gaps (${gapItems.length} requirements; no lessons written yet)`,
  ``,
  `Three kinds of gap, needing different fixes:`,
  ``,
  `- **missing** (${gapItems.filter((g) => g.kind === "missing").length}): no lesson teaches it, or one only touches on it. Needs new material.`,
  `- **depth** (${gapItems.filter((g) => g.kind === "depth").length}): a lesson covers part of it. Extend what exists; a new lesson isn't the default answer.`,
  `- **age-level** (${gapItems.filter((g) => g.kind === "age-level").length}): primary content taught only at secondary depth. Needs age-appropriate material, not more secondary lessons.`,
  ``,
  `Priority follows GCSE, then key stage 3, then practical skills, then primary. Within a priority, themes are ranked by how many separate documents ask for them, then by how much is missing outright.`,
  ``,
  ...gapList.flatMap((p) => [`### ${p.priority}. ${p.name} (${p.requirements}: ${p.missing} missing, ${p.depth} depth, ${p["age-level"]} age-level)`, ``,
    `| Theme | Documents | Missing | Depth | Age-level | Requirements |`, `|---|---|---|---|---|---|`,
    ...p.themes.map((t) => `| ${t.theme} | ${t.documents} | ${t.missing} | ${t.depth} | ${t["age-level"]} | ${t.ids.slice(0, 6).map((x) => `\`${x.replace(/^eng-/, "")}\``).join(", ")}${t.ids.length > 6 ? ` +${t.ids.length - 6}` : ""} |`), ``]),
  `Each requirement's note in \`data/curriculum/mapping/${slug}-england.map\` says exactly what is missing; the full list is \`gaps.items\` in \`data/curriculum/reports/${slug}-england-coverage.json\`.`,
  ``,
  `## Lessons with no official alignment (${unaligned.length})`,
  ``,
  `These lessons have no full or partial match in the England years 1–11 curricula. Most are beyond GCSE, which is expected for a course that runs to first-year undergraduate. They aren't a problem to fix: don't delete them or force a match to raise a percentage.`,
  ``,
  ...Object.entries(unaligned.reduce((o, x) => ((o[x.unit] ||= []).push(`${x.id} ${x.title}`), o), {})).map(([u, xs]) => `- **${inv.units.find((y) => y.id === u).title}** (${xs.length}): ${xs.join("; ")}`),
  ``,
  `## Possible duplication (for review)`,
  ``,
  sameTitle.length ? `Lessons with the same title in different schools: ${sameTitle.map((v) => v.map((id) => `${id} ${LES.get(id).title}`).join(" = ")).join("; ")}.` : `No two lessons share a title.`,
  ``,
  `Lessons in different schools that fully cover largely the same requirements (overlap ≥ 60%, at least 3 shared). Some are deliberate (an introduction and a deeper lesson; animal stem cells and plant meristems answer the same statements), so treat these as pairs to review, not as confirmed duplicates:`,
  ``,
  ...overlapPairs.slice(0, 20).map((p) => `- ${p.a} ${LES.get(p.a).title} and ${p.b} ${LES.get(p.b).title}: ${p.shared} shared requirements`),
  ``,
  `## Suggested year placement`,
  ``,
  `Each lesson's earliest placement, from its full and partial links (\`data/curriculum/reports/${slug}-england-coverage.json\`, \`placement\`):`,
  ``,
  ...Object.entries(lessonRows.reduce((o, x) => { const k = x.placement.year ? `Year ${x.placement.year} (${x.placement.basis})` : x.placement.basis; o[k] = (o[k] || 0) + 1; return o; }, {})).sort().map(([k, n]) => `- ${k}: ${n} lessons`),
  ``,
  `## Sources`,
  ``,
  ...Object.values(R.sources).map((s) => `- [${s.name}](${s.url}), ${s.version}. Retrieved ${s.retrieved}.`),
  ``,
  ``,
];
await writeFile(new URL(`docs/curriculum/${slug}-england-coverage.md`, root), md.join("\n"));
console.log(JSON.stringify({ overall: all, lessonsMapped, resourcesMapped, specific: resourceMap.counts.specificResources, above: resourceMap.counts.aboveStageResources, gaps: needs.length, unaligned: unaligned.length, overlapPairs: overlapPairs.length }, null, 0));
