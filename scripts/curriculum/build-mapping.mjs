// Build the lesson → official requirement mapping from its reviewable source, data/curriculum/mapping/<slug>-england.map,
// into structured records (data/curriculum/mapping/<slug>-england.json) that the coverage report and tests read.
//
//   node scripts/curriculum/build-mapping.mjs biology [--check]
//
// For every judged match it attaches evidence from the lesson itself: the objective, heading or key term that best
// overlaps the requirement's wording, quoted exactly. A match with no overlap at all is listed for review (it may
// still be right: the lesson can teach the idea in other words), so title-only matches can't slip through unseen.
// Resource mappings: every flashcard, question, diagram, interactive and mind map inherits its lesson's mappings,
// except where an override in RESOURCE_OVERRIDES says otherwise (see the .map file's "resource" lines).
import { readFile, writeFile } from "node:fs/promises";
import { parseNotes } from "../../kit/course/notes.js";
import { norm } from "../../kit/core/text.js";

const slug = process.argv[2] || "biology", CHECK = process.argv.includes("--check");
const root = new URL("../../", import.meta.url);
const read = async (p) => JSON.parse(await readFile(new URL(p, root), "utf8"));
const src = await readFile(new URL(`data/curriculum/mapping/${slug}-england.map`, root), "utf8");
const R = await read("data/curriculum/requirements/england-biology.json");
const inv = await read(`data/curriculum/inventory/${slug}.json`);
const REQ = new Map(R.requirements.map((r) => [r.id, r]));
const LES = new Map(inv.lessons.map((l) => [l.id, l]));
// the lesson's own sentences (paragraphs, bullets, key points, summaries), for evidence from the body of the notes
const { UNITS } = await import(new URL(`kit/courses/${slug}/syllabus.js`, root));
const SENT = new Map();
for (const u of UNITS) {
  const by = new Map(parseNotes((await import(new URL(`kit/courses/${slug}/notes/${u.id}.js`, root))).default).map((L) => [norm(L.title), L]));
  for (const l of u.lessons) {
    const L = by.get(norm(l.title)); if (!L) continue;
    const xs = [...L.summary, ...L.blocks.flatMap((b) => b.t === "p" || b.t === "key" ? [b.x] : b.t === "ul" ? b.items : [])];
    SENT.set(l.id, xs.flatMap((x) => x.replace(/\*\*/g, "").split(/(?<=[.;:])\s+(?=[A-Z])/)).filter((x) => x.length > 25));
  }
}
const MATCH = { F: "full", P: "partial", I: "indirect" }, CONF = { h: "high", m: "medium", l: "low" };

const STOP = new Set("the a an and or of in on to for with by from as at is are be that this their its into how what which why including include describe explain use using understand recall students should able learners about between within such some other can may will they them these those than more most".split(" "));
const stem = (w) => w.replace(/(ies)$/, "y").replace(/(sses)$/, "ss").replace(/([^s])s$/, "$1").replace(/(ing|ed)$/, "");
const toks = (t) => new Set(String(t).toLowerCase().replace(/\*\*|[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)).map(stem));

function evidence(lesson, req) {
  const q = toks(`${req.title || ""} ${req.text} ${req.include || ""}`);
  const cands = [...lesson.objectives.map((x) => ["Objective", x, 1.2]), ...lesson.sections.map((x) => ["Section", x, 1]), ...lesson.terms.map((x) => ["Key term", x, 1]), ["Lesson", lesson.title, 1.1],
    ...(SENT.get(lesson.id) || []).map((x) => ["Notes", x.length > 220 ? x.slice(0, 217).replace(/\s+\S*$/, "") + "…" : x, 0.9])];
  let best = null;
  for (const [kind, text, w] of cands) {
    const t = toks(text), hit = [...t].filter((x) => q.has(x)).length;
    if (hit && (!best || hit * w > best.score)) best = { kind, text, hit, score: hit * w };
  }
  return best ? { kind: best.kind, text: best.text, overlap: best.hit } : { kind: "Lesson", text: lesson.title, overlap: 0 };
}

const problems = [], mappings = [], judged = new Map(), review = [], seen = new Set();
let batch = null;
src.split("\n").forEach((raw, i) => {
  const line = raw.trim(), at = `line ${i + 1}`;
  if (line.startsWith("## ")) { batch = line.slice(3); return; }
  if (!line || line.startsWith("#")) return;
  const m = line.match(/^(\S+) = (.+)$/); if (!m) return problems.push(`${at}: can't read "${line.slice(0, 60)}"`);
  const rid = `eng-${m[1]}`, req = REQ.get(rid);
  if (!req) return problems.push(`${at}: no requirement ${rid}`);
  if (seen.has(rid)) problems.push(`${at}: ${rid} is judged twice`); seen.add(rid);
  const [body, ...noteParts] = m[2].split(" | "), note = noteParts.join(" | ").trim() || null;
  if (body.trim() === "none") { if (!note) problems.push(`${at}: "none" needs a reason`); judged.set(rid, { status: "uncovered", note, batch }); return; }
  const links = [];
  for (const part of body.split(";").map((x) => x.trim()).filter(Boolean)) {
    const p = part.match(/^(u\d\d-\d\d) ([FPI]) ([hml])$/); if (!p) { problems.push(`${at}: can't read link "${part}"`); continue; }
    const lesson = LES.get(p[1]); if (!lesson) { problems.push(`${at}: no lesson ${p[1]}`); continue; }
    const ev = evidence(lesson, req);
    if (!ev.overlap) review.push(`${m[1]} → ${p[1]} ${lesson.title}`);
    links.push({ requirement: rid, lesson: p[1], match: MATCH[p[2]], confidence: CONF[p[3]], evidence: `${ev.kind}: "${ev.text}"`, evidenceOverlap: ev.overlap });
  }
  if (links.some((l) => l.match !== "full") && !note && links.every((l) => l.match !== "full")) problems.push(`${at}: a partial or indirect match needs a note on what is missing`);
  // a requirement's status: the strongest single lesson, or partial when lessons only together cover it
  const best = links.some((l) => l.match === "full") ? "full" : links.some((l) => l.match === "partial") ? "partial" : "indirect";
  const conf = links.filter((l) => l.match === best).map((l) => l.confidence);
  judged.set(rid, { status: best, confidence: conf.includes("high") ? "high" : conf.includes("medium") ? "medium" : "low", note, batch, above: /^above\b/.test(note || "") });
  for (const l of links) mappings.push({ ...l, note });
});

// Review decisions (data/curriculum/review/<slug>-england-decisions.json): a person's verdict on one link. Only a reviewer
// listed with their name and qualifications can record one. A decision never edits the .map file: a changed or rejected
// link must be corrected there too, and the build fails until the two agree.
const decisionsFile = new URL(`data/curriculum/review/${slug}-england-decisions.json`, root);
let D = { reviewers: {}, decisions: [] };
try { D = JSON.parse(await readFile(decisionsFile, "utf8")); } catch { /* no decisions yet */ }
const linkAt = new Map(mappings.map((l) => [`${l.requirement}|${l.lesson}`, l]));
for (const [i, d] of (D.decisions || []).entries()) {
  const at = `decision ${i + 1} (${d.requirement} → ${d.lesson})`, who = D.reviewers?.[d.reviewer];
  if (!who?.name || !who?.qualifications) { problems.push(`${at}: reviewer "${d.reviewer}" must be listed with a name and qualifications`); continue; }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.on || "")) problems.push(`${at}: needs the review date (YYYY-MM-DD)`);
  if (!["confirmed", "changed", "rejected"].includes(d.verdict)) { problems.push(`${at}: verdict is confirmed, changed or rejected`); continue; }
  const l = linkAt.get(`${d.requirement}|${d.lesson}`);
  if (d.verdict === "rejected") { if (l) problems.push(`${at}: rejected, but the link is still in the .map file; remove it there`); continue; }
  if (!l) { problems.push(`${at}: no such link in the .map file`); continue; }
  if (d.verdict === "changed" && l.match !== d.match) problems.push(`${at}: changed to ${d.match}, but the .map file still says ${l.match}`);
  if (d.verdict === "confirmed" && d.match && d.match !== l.match) problems.push(`${at}: confirmed as ${d.match}, but the .map file says ${l.match}`);
  l.review = { verdict: d.verdict, reviewer: who.name, on: d.on, note: d.note || null };
}
const reviewedLinks = mappings.filter((l) => l.review).length;
const reviewers = [...new Set(mappings.filter((l) => l.review).map((l) => l.review.reviewer))];

const pending = R.requirements.filter((r) => !judged.has(r.id)).map((r) => r.id);
const out = {
  slug, system: "uk-eng", generated: new Date().toISOString().slice(0, 10),
  // whole-mapping status: ai-drafted until a named reviewer has decided every link (the course's state in
  // kit/curriculum/coverage.js is moved by hand, after that)
  review: { status: reviewedLinks === 0 ? "ai-drafted" : reviewedLinks < mappings.length ? "partly-reviewed" : "reviewed", reviewer: reviewers.length ? reviewers.join(", ") : null, verifiedOn: null, reviewedLinks,
    note: "Drafted by an AI mapper from lesson objectives, headings and notes searches. Links carry a review only where a named reviewer has decided them; the rest are AI-drafted. Not an official alignment or endorsement." },
  counts: { requirements: R.requirements.length, judged: judged.size, pending: pending.length, links: mappings.length, reviewedLinks },
  requirements: Object.fromEntries([...judged].map(([id, j]) => [id, j])),
  mappings, pending,
};
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
if (!CHECK) await writeFile(new URL(`data/curriculum/mapping/${slug}-england.json`, root), JSON.stringify(out, null, 1));
console.log(`${judged.size} requirements judged, ${pending.length} pending, ${mappings.length} lesson links; ${review.length} links with no wording overlap to review`);
if (process.argv.includes("--review")) console.log(review.join("\n"));
