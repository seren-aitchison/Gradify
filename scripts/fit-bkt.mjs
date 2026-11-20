// Fits Gradify's mastery model (Bayesian Knowledge Tracing, kit/learning/bkt.js) from learners' answers and writes the
// parameters to kit/learning/bkt-params.js, which the app reads.
//   node scripts/fit-bkt.mjs --attempts attempts.jsonl   real, anonymised course answers (the export in
//                                                        docs/intelligence/BENCHMARKS.md): a default set, plus one per
//                                                        subject that has enough answers of its own
//   node scripts/fit-bkt.mjs                             no export yet: fits on the benchmark's simulated learners, and
//                                                        says so in the file (provisional until real data is used)
// Answers are read the same way the app reads them (evidenceFromAttempts, then bktSequence), so the fit is of
// exactly what the model sees in the browser. Nothing about a learner is written, only the fitted parameters.
import { readFile, writeFile } from "node:fs/promises";
import { evidenceFromAttempts } from "../kit/learning/mastery.js";
import { bktSequence, fitBkt } from "../kit/learning/bkt.js";
import { simulateCourse } from "./bench/simulate.mjs";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const file = arg("--attempts");
const MIN_ANSWERS = 300, MIN_LEARNERS = 20;   // a subject gets its own parameters only with at least this much evidence

const attempts = file
  ? (await readFile(file, "utf8")).split("\n").filter(Boolean).map((l) => JSON.parse(l))
  : simulateCourse({ seed: 11, learners: 80 }).attempts;   // a different seed from the benchmark, which scores on seed 2

// one sequence per learner and lesson, read as the app reads them
const groups = new Map();
for (const a of attempts) { const k = `${a.user}|${a.site}|${a.subject}|${a.lesson}`; (groups.get(k) || groups.set(k, []).get(k)).push(a); }
const seqs = [...groups.entries()].map(([k, list]) => ({ user: k.split("|")[0], subject: k.split("|")[2], ys: bktSequence(evidenceFromAttempts(list)) })).filter((s) => s.ys.length);

const round = (p) => Object.fromEntries(["L0", "T", "G", "S"].map((k) => [k, Math.round(p[k] * 1000) / 1000]));
const all = fitBkt(seqs.map((s) => s.ys));
const bySubject = {};
if (file) for (const subject of [...new Set(seqs.map((s) => s.subject))].sort()) {
  const mine = seqs.filter((s) => s.subject === subject), answers = mine.reduce((a, s) => a + s.ys.length, 0);
  if (answers >= MIN_ANSWERS && new Set(mine.map((s) => s.user)).size >= MIN_LEARNERS) bySubject[subject] = { ...round(fitBkt(mine.map((s) => s.ys))), answers };
}
const source = file ? `real answers (${file.split("/").pop()})` : "the benchmark's simulated learners (scripts/bench/simulate.mjs, seed 11): provisional until fitted on real answers";
const out = `// Fitted by scripts/fit-bkt.mjs on ${new Date().toISOString().slice(0, 10)} from ${source}.
// ${all.answers} answers from ${new Set(seqs.map((s) => s.user)).size} learners; log loss ${all.ll.toFixed(4)}. Regenerate, don't edit by hand.
export const BKT_PARAMS = ${JSON.stringify({ default: { ...round(all), answers: all.answers }, bySubject, source }, null, 2)};
`;
await writeFile(new URL("../kit/learning/bkt-params.js", import.meta.url), out);
console.log(`BKT fitted on ${source}\n  default ${JSON.stringify(round(all))} (${all.answers} answers)\n  per subject: ${Object.keys(bySubject).join(", ") || "none (not enough real answers per subject yet)"}`);
