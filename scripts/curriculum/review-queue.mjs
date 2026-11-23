// The prioritised validation queue for a mapping: every AI-drafted link, once, in the order a reviewer should check
// it, plus the extraction work that must happen before GCSE coverage can be called comprehensive. Links already
// decided (data/curriculum/review/<slug>-england-decisions.json) drop out.
//
//   node scripts/curriculum/review-queue.mjs biology
//     → data/curriculum/review/<slug>-england-queue.json and docs/curriculum/<slug>-england-review-queue.md
//
// Tiers, highest risk first (a link sits in the first tier that takes it):
//   1 links whose evidence shares no wording with the requirement (the likeliest to be wrong or generous)
//   2 the statutory key stage 4 programme, full matches first: they carry the headline figures
//   3 the five GCSE specifications, statements unique to one board first (where boards differ), full matches first
//   4 practical skills: required, core and specified practicals (and the extraction still to do)
//   5 key stages 1–2: is secondary teaching an age-appropriate match at all?
//   6 everything else (key stage 3, working scientifically)
// Within a tier: full before partial before indirect, low confidence before high.
import { readFile, writeFile, mkdir } from "node:fs/promises";

const slug = process.argv[2] || "biology";
const root = new URL("../../", import.meta.url);
const read = async (p) => JSON.parse(await readFile(new URL(p, root), "utf8"));
const R = await read("data/curriculum/requirements/england-biology.json");
const M = await read(`data/curriculum/mapping/${slug}-england.json`);
const inv = await read(`data/curriculum/inventory/${slug}.json`);
const REQ = new Map(R.requirements.map((r) => [r.id, r]));
const TITLE = new Map(inv.lessons.map((l) => [l.id, l.title]));

// how far a board statement is shared with the other boards: its best word overlap (Jaccard) with any other board's statement
const STOP = new Set("the a an and or of in on to for with by from as at is are be that this their its into how what which why including include describe explain use using understand recall students should able learners about between within such some other can may will they them these those than more most".split(" "));
const toks = (t) => new Set(String(t || "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w.length > 3 && !STOP.has(w)).map((w) => w.replace(/s$/, "")));
const board = R.requirements.filter((r) => r.qualification === "gcse");
const T = new Map(board.map((r) => [r.id, toks(`${r.title || ""} ${r.text} ${r.include || ""}`)]));
const shared = new Map();
for (const r of board) {
  let best = 0; const a = T.get(r.id);
  for (const o of board) if (o.source !== r.source) { const b = T.get(o.id); const inter = [...a].filter((x) => b.has(x)).length; const j = inter / (a.size + b.size - inter || 1); if (j > best) best = j; }
  shared.set(r.id, +best.toFixed(2));
}
const UNIQUE = 0.3;

const isPractical = (r) => r.practical || /^(Core Practical|Specified practical)|Required practical/i.test(r.text) || /PAG\d/.test(r.text);
const isPrimary = (r) => r.source === "dfe-nc" && ["KS1", "KS2"].includes(r.keyStage);
const TIERS = [
  [1, "No shared wording", "The quoted evidence shares no wording with the requirement: check the lesson really teaches it.", (l) => l.evidenceOverlap === 0],
  [2, "Statutory key stage 4 programme", "These carry the headline figures: confirm each full match is genuinely full.", (l, r) => r.source === "dfe-nc" && r.keyStage === "KS4" && r.discipline === "biology"],
  [3, "GCSE specifications, board by board", "Check each board's wording separately; statements unique to one board first.", (l, r) => r.qualification === "gcse" && !isPractical(r)],
  [4, "Practical skills", "Required, core and specified practicals: the course describes them; decide whether that counts.", (l, r) => isPractical(r)],
  [5, "Key stages 1–2 (primary)", "Secondary-level teaching is not automatically age-appropriate primary teaching.", (l, r) => isPrimary(r)],
  [6, "Everything else", "Key stage 3 and working scientifically.", () => true],
];
const decided = new Set(M.mappings.filter((l) => l.review).map((l) => `${l.requirement}|${l.lesson}`));
const MO = { full: 0, partial: 1, indirect: 2 }, CO = { low: 0, medium: 1, high: 2 };
const items = [];
for (const l of M.mappings) {
  if (decided.has(`${l.requirement}|${l.lesson}`)) continue;
  const r = REQ.get(l.requirement), [tier, name] = TIERS.find(([, , , f]) => f(l, r));
  items.push({ tier, tierName: name, requirement: l.requirement, source: r.source, ref: r.ref || null, requirementText: r.text, lesson: l.lesson, lessonTitle: TITLE.get(l.lesson),
    match: l.match, confidence: l.confidence, evidence: l.evidence, note: l.note, uniqueToBoard: r.qualification === "gcse" ? shared.get(r.id) < UNIQUE : null, sharedWithOtherBoards: shared.get(r.id) ?? null });
}
items.sort((a, b) => a.tier - b.tier || (a.tier === 3 ? Number(b.uniqueToBoard) - Number(a.uniqueToBoard) || a.source.localeCompare(b.source) : 0) || MO[a.match] - MO[b.match] || CO[a.confidence] - CO[b.confidence] || a.requirement.localeCompare(b.requirement, "en", { numeric: true }));
items.forEach((x, i) => (x.rank = i + 1));

// unjudgeable from links alone: requirements with no lesson at all also need a reviewer to confirm the gap
const uncovered = Object.entries(M.requirements).filter(([, j]) => j.status === "uncovered").map(([id, j]) => ({ requirement: id, text: REQ.get(id).text, note: j.note }));
const extraction = Object.entries(R.sources).flatMap(([k, s]) => (s.notExtracted || []).map((what) => ({ source: k, document: s.name, what })));

const counts = {}; for (const x of items) counts[x.tier] = (counts[x.tier] || 0) + 1;
const queue = { slug, generated: M.generated, status: M.review.status, reviewedLinks: M.counts.reviewedLinks, remaining: items.length,
  tiers: TIERS.map(([n, name, why]) => ({ tier: n, name, why, links: counts[n] || 0 })), extractionBeforeComprehensiveClaims: extraction, confirmGaps: uncovered, items };
await mkdir(new URL("data/curriculum/review/", root), { recursive: true });
await writeFile(new URL(`data/curriculum/review/${slug}-england-queue.json`, root), JSON.stringify(queue, null, 1));

const short = (t, n = 110) => (t.length > n ? t.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : t);
const md = [
  `# SciGradify Biology mapping: validation queue`, ``,
  `_Generated ${M.generated} by \`scripts/curriculum/review-queue.mjs\`. Don't edit by hand. Record decisions in \`data/curriculum/review/${slug}-england-decisions.json\`, then re-run the build, the report and this queue._`, ``,
  `**Mapping status: ${M.review.status}.** ${M.counts.reviewedLinks} of ${M.counts.links} links reviewed. Every link below is AI-drafted.`, ``,
  `**Suggested reviewer:** a qualified Biology teacher or examiner with GCSE experience. For tier 3, ideally someone who knows each board's specification.`, ``,
  `## Order of work`, ``,
  `| Tier | What | Why first | Links |`, `|---|---|---|---|`,
  ...queue.tiers.map((t) => `| ${t.tier} | ${t.name} | ${t.why} | ${t.links} |`), ``,
  `Within each tier: full matches first, then partial, then indirect, and low confidence before high. In tier 3, statements unique to one board come first (best wording overlap with any other board under ${UNIQUE}).`, ``,
  `Alongside the links, a reviewer should also confirm the ${uncovered.length} requirements recorded as having no lesson at all (\`confirmGaps\` in the queue file).`, ``,
  `## Before any claim of comprehensive GCSE coverage`, ``,
  `These parts of the specifications are not extracted yet, so no GCSE figure here is complete:`, ``,
  ...extraction.map((e) => `- ${e.document}: ${e.what}`), ``,
  `## Tier 1: links with no shared wording (all ${counts[1] || 0})`, ``,
  `| # | Requirement | Lesson | Match | Evidence quoted |`, `|---|---|---|---|---|`,
  ...items.filter((x) => x.tier === 1).map((x) => `| ${x.rank} | \`${x.requirement.replace(/^eng-/, "")}\` ${short(x.requirementText, 80)} | ${x.lesson} ${x.lessonTitle} | ${x.match}, ${x.confidence} | ${short(x.evidence, 90)} |`), ``,
  ...[2, 3, 4, 5, 6].flatMap((n) => {
    const xs = items.filter((x) => x.tier === n), t = queue.tiers[n - 1];
    return [`## Tier ${n}: ${t.name} (${xs.length})`, ``, t.why, ``, `First 15:`, ``, `| # | Requirement | Lesson | Match |`, `|---|---|---|---|`,
      ...xs.slice(0, 15).map((x) => `| ${x.rank} | \`${x.requirement.replace(/^eng-/, "")}\`${x.uniqueToBoard ? " (unique to board)" : ""} ${short(x.requirementText, 80)} | ${x.lesson} ${x.lessonTitle} | ${x.match}, ${x.confidence} |`),
      ``, `The full list is in \`data/curriculum/review/${slug}-england-queue.json\`.`, ``];
  }),
];
await mkdir(new URL("docs/curriculum/", root), { recursive: true });
await writeFile(new URL(`docs/curriculum/${slug}-england-review-queue.md`, root), md.join("\n"));
console.log(JSON.stringify({ remaining: items.length, tiers: counts, confirmGaps: uncovered.length, extraction: extraction.length }));
