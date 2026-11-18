// Gradify Intelligence benchmarks: measure before changing anything.
//
//   npm run bench                          all five benchmarks on synthetic learners and the labelled cards (free, ~10 s)
//   npm run bench -- --reviews FILE        recall prediction on a real, anonymised review export (JSON lines)
//   npm run bench -- --attempts FILE       mastery prediction on a real, anonymised attempt export (JSON lines)
//   ANTHROPIC_API_KEY=… npm run bench -- --claude   also the AI card reviewer on the labelled cards (a few pence)
//   npm run bench -- --write-baseline      record the synthetic results as the new baseline (tests/fixtures/bench/baseline.json)
//
// The baseline is checked by tests/bench.test.mjs, so any change to Gradify's engines that moves these numbers has
// to update the baseline in the same pull request, with the before and after visible in the diff.
// What each benchmark measures, and what it can't: docs/intelligence/BENCHMARKS.md.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { simulateReviews, simulateCourse } from "./bench/simulate.mjs";
import { recallBenchmark, parseReviewLog } from "./bench/recall.mjs";
import { masteryBenchmark, readinessBenchmark } from "./bench/mastery.mjs";
import { cardBenchmark, codeVerdicts, aiVerdicts, combine, tally } from "./bench/cards.mjs";
import { planBenchmark } from "./bench/plan.mjs";
import { labOutcome } from "../kit/learning/mastery.js";
import { evidenceClass, explorationIds } from "../kit/learning/evidence-class.js";

// Results must not depend on the machine: the readiness code reads an exam date as local noon, as the app does.
process.env.TZ = "UTC";
const FIXTURES = new URL("../tests/fixtures/bench/", import.meta.url);

/** The synthetic suite: deterministic, so it doubles as a regression baseline. */
export async function syntheticSuite() {
  const cards = JSON.parse(await readFile(new URL("cards.json", FIXTURES), "utf8"));
  return {
    recall: recallBenchmark(simulateReviews({ seed: 1 })),
    mastery: masteryBenchmark(simulateCourse({ seed: 2 }).attempts),
    readiness: readinessBenchmark({ seed: 3 }),
    cards: cardBenchmark(cards).code,
    plan: planBenchmark({ seed: 4 }),
  };
}

// a row of public.assessment_attempts (snake_case columns) or an attempt record as the browser keeps it
export const attemptRecord = (r) => (r.question ? { ...r, user: String(r.user ?? r.user_id) } : {
  schema: 1, id: r.id, at: r.at ?? r.created_at, site: r.site, subject: r.subject, context: r.context, user: String(r.user ?? r.user_id),
  question: { id: r.question_id, v: r.question_version ?? null, type: r.question_type, d: r.difficulty ?? null, objectives: r.objectives || [] },
  lesson: r.lesson_id ?? null, module: r.module ?? null, unit: r.unit_id ?? null, response: r.response ?? null, score: Number(r.score), correct: Boolean(r.correct),
  attempt: r.attempt ?? 1, confidence: r.confidence ?? null, ms: r.ms ?? null, misconception: r.misconception ?? null,
  marking: { method: r.marking_method ?? "auto", status: r.marking_status ?? "final" },
});

// the answers the app counts towards mastery (kit/learning/mastery.js evidenceFromAttempts): no exploration, and of
// lab challenges only successes and wrong answers (a challenge tried and left, or failed other than by answering, isn't evidence).
// `exploration` is the course's list of exploration challenges, as the course engine passes it (kit/course/course.js),
// so older records without response.evidence are classified the same way.
export const countsForMastery = (a, exploration = null) => {
  if (evidenceClass(a, { exploration }) === "exploration") return false;
  const o = labOutcome(a);
  return !(o === "attempted" || (o === "unsuccessful" && a.response?.via !== "answer"));
};

/** Each course's exploration challenges (its config's `exploration`), keyed by the course slug that attempts carry in `subject`. */
export async function explorationBySubject(rows) {
  const out = new Map();
  for (const subject of new Set(rows.map((a) => a.subject).filter(Boolean))) {
    try {
      const cfg = (await import(new URL(`../kit/courses/${subject}/course.js`, import.meta.url).href)).default;
      if (cfg?.exploration) out.set(subject, explorationIds(cfg.exploration));
    } catch { /* not a course in this repository: only response.evidence can mark exploration */ }
  }
  return out;
}

const arg = (name) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : null; };

if (import.meta.url === `file://${process.argv[1]}`) {
  const t = Date.now();
  const out = { at: new Date().toISOString(), synthetic: await syntheticSuite() };
  const cardFixture = JSON.parse(await readFile(new URL("cards.json", FIXTURES), "utf8"));
  const misses = cardBenchmark(cardFixture).misses;

  if (arg("--reviews")) out.realRecall = recallBenchmark(parseReviewLog(await readFile(arg("--reviews"), "utf8")));
  if (arg("--attempts")) {
    const rows = (await readFile(arg("--attempts"), "utf8")).split("\n").filter((l) => l.trim()).map((l) => attemptRecord(JSON.parse(l)));
    const explore = await explorationBySubject(rows);
    out.realMastery = masteryBenchmark(rows.filter((a) => a.lesson && a.marking.status === "final" && countsForMastery(a, explore.get(a.subject) || null)));
  }
  if (process.argv.includes("--claude")) {
    const code = cardFixture.sets.map(codeVerdicts), ai = [];
    let tokens = 0;
    for (const set of cardFixture.sets) { const r = await aiVerdicts(set); ai.push(r.verdicts); tokens += r.usage.input_tokens + r.usage.output_tokens; }
    out.cardsClaude = { reviewer: tally(cardFixture.sets, ai), combined: tally(cardFixture.sets, code.map((c, i) => combine(c, ai[i]))), tokens };
  }

  const s = out.synthetic, pct = (x) => (x == null ? "  -  " : `${(x * 100).toFixed(1)}%`.padStart(6)), f = (x) => (x == null ? "  -   " : x.toFixed(4));
  const table = (title, models, note) => {
    console.log(`\n${title}${note ? `  (${note})` : ""}`);
    console.log("  model                 log loss   Brier     AUC     ECE   RMSE(bins)");
    for (const [k, m] of Object.entries(models)) console.log(`  ${k.padEnd(20)} ${f(m.logLoss)}  ${f(m.brier)}  ${f(m.auc)}  ${f(m.ece)}  ${f(m.rmseBins)}`);
  };
  table("1. Flashcard recall prediction (synthetic)", s.recall.models, `${s.recall.reviews} reviews, ${pct(s.recall.models.fsrs5.base)} remembered`);
  if (out.realRecall) table("1. Flashcard recall prediction (YOUR DATA)", out.realRecall.models, `${out.realRecall.reviews} reviews, ${out.realRecall.users} learners`);
  table("2. Mastery: predicting the next answer (synthetic, held-out learners)", s.mastery.models, `${s.mastery.answers} answers`);
  if (out.realMastery) table("2. Mastery: predicting the next answer (YOUR DATA)", out.realMastery.models, `${out.realMastery.answers} answers`);
  table("3. Readiness on exam day (synthetic)", s.readiness.models, `${s.readiness.objectives} objectives, ${s.readiness.horizon} days ahead`);
  console.log("  model                 mean abs error   bias    80% range holds truth   mean range width");
  for (const [k, m] of Object.entries(s.readiness.models)) console.log(`  ${k.padEnd(20)}  ${f(m.meanAbsError)}        ${(m.bias >= 0 ? "+" : "") + m.bias.toFixed(4)}   ${pct(m.interval80)}                  ${f(m.intervalWidth)}`);
  const c = s.cards;
  console.log(`\n4. Card quality, code checks (${c.cards} labelled cards: ${c.good} good, ${c.flawed} flawed)`);
  console.log(`  flawed cards caught: ${pct(c.detection.flagged)} flagged, ${pct(c.detection.blocked)} blocked`);
  console.log(`  good cards wrongly:  ${pct(c.falseRejection.flagged)} flagged, ${pct(c.falseRejection.blocked)} blocked, ${pct(c.goodRewritten)} rewritten`);
  for (const [k, d] of Object.entries(c.byDefect)) console.log(`    ${k.padEnd(12)} n=${String(d.n).padStart(2)}  flagged ${pct(d.flagged)}  blocked ${pct(d.blocked)}`);
  for (const m of misses) console.log(`    · ${m}`);
  if (out.cardsClaude) for (const [k, r] of Object.entries(out.cardsClaude).filter(([k]) => k !== "tokens")) console.log(`  ${k}: caught ${pct(r.detection.flagged)} flagged / ${pct(r.detection.blocked)} blocked; good wrongly ${pct(r.falseRejection.flagged)} flagged / ${pct(r.falseRejection.blocked)} blocked`);
  const p = s.plan;
  console.log(`\n5. Smart Plan feasibility (${p.plans} random days)`);
  console.log(`  hard-constraint violations: ${Object.entries(p.violations).map(([k, v]) => `${k} ${v}`).join(", ")}`);
  console.log(`  time used ${pct(p.utilisation)} of what was possible · top three items placed ${pct(p.top3Placed)} · priority inversions ${p.priorityInversions} · items cut to under half their time ${pct(p.truncated)}`);

  await mkdir(new URL("../tests/reports/", import.meta.url), { recursive: true });
  const file = new URL(`../tests/reports/bench-${out.at.slice(0, 16).replace(/[:T]/g, "-")}.json`, import.meta.url);
  await writeFile(file, JSON.stringify(out, null, 2));
  if (process.argv.includes("--write-baseline")) {
    await writeFile(new URL("baseline.json", FIXTURES), `${JSON.stringify(s, null, 2)}\n`);
    console.log("\nBaseline written: tests/fixtures/bench/baseline.json");
  }
  console.log(`\nFull report: ${file.pathname}  (${((Date.now() - t) / 1000).toFixed(1)} s)`);
}
