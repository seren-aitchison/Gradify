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
  t.fullOrPartialPct = t.total ? Math.round((100 * (t.full + t.partial)) / t.total) : 0;
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
const needs = R.requirements.filter((r) => ["uncovered", "indirect"].includes(statusOf(r.id)) || (statusOf(r.id) === "partial" && /\bnot (taught|covered|drawn)|\bno lesson\b/i.test(M.requirements[r.id]?.note || "")));
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
  ["Communicable disease: named examples, STIs, vaccination choices and monoclonal uses", /STI|named|diseases|pregnancy test|vaccinat|monoclonal/i],
  ["Drugs, medicines and clinical trials", /drug|painkiller|clinical|medicine/i],
  ["Decomposition and decay", /decompos|decay/i],
  ["The brain and senses", /brain|nervous-system damage|sense organs/i],
  ["Practical work, techniques and calculations", /practical|investigat|dissection|carried out|extract|inverse square|profiling|stone tools/i],
];
const themeOf = (r) => { const t = `${M.requirements[r.id]?.note || ""} ${r.text}`; return (THEMES.find(([, re]) => (typeof re === "function" ? re(r) : re.test(t))) || ["Other"])[0]; };
const gapThemes = {}; for (const r of needs) (gapThemes[themeOf(r)] ||= []).push(r.id);

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
  gaps: { count: needs.length, byTheme: gapThemes },
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
    review: "not started: needs a subject specialist to review every link (status stays ai-drafted until then)",
  },
  batches,
  notExtracted: ["OCR J247 topic B7 (Practical skills)", "OCR J257 chapters B7 (Ideas about Science) and B8 (Practical skills)", "Exam-board working-scientifically and mathematical-skills appendices", "GCSE Combined Science specifications as separate documents (shared content is flagged per statement for AQA, Edexcel and OCR J257 only)"],
  next: ["Specialist review of the mapping (start with low-confidence links and the review list from build-mapping.mjs --review)", "Decide whether Biology's entry in kit/curriculum/coverage.js should move from the default to \"mapped\"", "Write lessons for the gap themes in the coverage report", "Repeat for the next subject using the same scripts"],
};
await writeFile(new URL("data/curriculum/progress.json", root), JSON.stringify(progress, null, 1));

// the readable report
const pct = (t) => `${t.fullPct}% full, ${t.fullOrPartialPct}% full or partial`;
const row = (g) => `| ${g.name} | ${g.total} | ${g.full} | ${g.partial} | ${g.indirect} | ${g.uncovered} | ${g.uncertain} | ${g.lessons} | ${g.fullPct}% |`;
const md = [
  `# SciGradify Biology against the England curriculum: coverage`,
  ``,
  `_Generated ${today} by \`scripts/curriculum/report.mjs\` from the structured data. Don't edit by hand._`,
  ``,
  `> **Status: AI-drafted, not reviewed.** Every link was judged by an AI mapper from lesson objectives, headings and searches of the lesson notes, with evidence quoted from the lesson. No teacher, examiner or awarding body has checked it. This is not an official alignment, and no awarding body endorses Gradify.`,
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
  `${all.total} official requirements: **${all.full} full**, ${all.partial} partial, ${all.indirect} indirect, ${all.uncovered} uncovered (${all.uncertain} uncertain). ${pct(all)}.`,
  ``,
  `${lessonsMapped} of ${inv.lessons.length} lessons have at least one full or partial match. Through them, ${resourcesMapped} of ${inv.resources.length} linked resources (flashcards, questions, diagrams, interactives and the generated mind maps) are mapped. ${resourceMap.counts.specificResources} resources match a requirement's wording directly.`,
  ``,
  `## By year, stage, qualification and board`,
  ``,
  `| Curriculum | Requirements | Full | Partial | Indirect | Uncovered | Uncertain | Lessons | Full % |`,
  `|---|---|---|---|---|---|---|---|---|`,
  ...groups.map(row),
  ``,
  `Years 1–6 are statutory year by year. Key stage 3 is set by stage: any year placement within years 7–9 below is **Gradify's suggested sequence**, not the national curriculum's. GCSE content belongs to years 10–11 as a stage. Key stage 1–2 content is mostly taught here at secondary depth, which the mapping marks "above": it covers the idea, but isn't written for that age.`,
  ``,
  `## Requirements that need teaching material (${needs.length})`,
  ``,
  ...Object.entries(gapThemes).sort((a, b) => b[1].length - a[1].length).map(([t, xs]) => `- **${t}** (${xs.length}): ${xs.slice(0, 12).map((x) => `\`${x.replace(/^eng-/, "")}\``).join(", ")}${xs.length > 12 ? `, and ${xs.length - 12} more` : ""}`),
  ``,
  `Each requirement's note in \`data/curriculum/mapping/${slug}-england.map\` says exactly what is missing.`,
  ``,
  `## Lessons with no official alignment (${unaligned.length})`,
  ``,
  `These lessons have no full or partial match in the England years 1–11 curricula. Most are beyond GCSE, which is expected for a course that runs to first-year undergraduate.`,
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
  `Not yet extracted: ${progress.notExtracted.join("; ")}.`,
  ``,
];
await writeFile(new URL(`docs/curriculum/${slug}-england-coverage.md`, root), md.join("\n"));
console.log(JSON.stringify({ overall: all, lessonsMapped, resourcesMapped, specific: resourceMap.counts.specificResources, above: resourceMap.counts.aboveStageResources, gaps: needs.length, unaligned: unaligned.length, overlapPairs: overlapPairs.length }, null, 0));
