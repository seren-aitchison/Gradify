// Benchmark every Gradify AI tutor mode on a local model (Ollama) and, optionally, on Claude, side by side.
//   node scripts/eval-tutor.mjs                          the local model only (free; default llama3.3:70b)
//   ANTHROPIC_API_KEY=... node scripts/eval-tutor.mjs --claude   also Claude, with the models in ai_feature_models
//                                                        (a few pence a run)
//   --runs 3       ask each mode three times, to measure reliability (default 1)
//   --modes mark,explain   only these modes
// OLLAMA_URL, OLLAMA_MODEL and OLLAMA_NUM_CTX are read as in the Edge Functions (docs/LOCAL-AI.md).
//
// The automatic checks are the ones the product depends on: the reply finished, matches the JSON schema, survives
// the function's own reply check (checkReply) with nothing dropped, and keeps to what it was given (rubric criteria
// copied exactly, only offered lesson ids and actions, one right answer per choice question). Accuracy, reasoning
// and teaching quality need a person: every reply is saved side by side in tests/reports/ for review.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { buildRequest, checkReply } from "../kit/assess/tutor.js";
import { ollamaMessage, OLLAMA_DEFAULT_MODEL } from "../supabase/functions/_shared/provider.js";

const arg = (name, def) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : def; };
const RUNS = Math.max(1, Number(arg("--runs", 1)) || 1);
const ONLY = arg("--modes", "") ? arg("--modes").split(",") : null;
const useClaude = process.argv.includes("--claude");
const OLLAMA = { url: process.env.OLLAMA_URL || "http://localhost:11434", model: process.env.OLLAMA_MODEL || OLLAMA_DEFAULT_MODEL, numCtx: Number(process.env.OLLAMA_NUM_CTX) || 32768, timeoutMs: Number(process.env.OLLAMA_TIMEOUT_MS) || 900_000 };
// the proposed production models (public.ai_feature_models): Opus for tutoring and explanations
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || "claude-opus-5-5";

// one realistic request per mode, grounded in the contract law fixture
const notes = await readFile(new URL("../tests/fixtures/contract-law.txt", import.meta.url), "utf8");
const lesson = { id: "u03-01", title: "Contract law: formation", text: notes };
const candidates = [{ id: "u03-02", title: "Consideration and promissory estoppel" }, { id: "u03-03", title: "Intention to create legal relations" }, { id: "u04-01", title: "Misrepresentation" }, { id: "u01-02", title: "Sources of law" }, { id: "u06-01", title: "Negligence: duty of care" }];
const rubric = ["Identifies whether there was an offer or an invitation to treat", "States and applies the rule on acceptance", "Reaches a reasoned conclusion"];
const kase = { client: "Priya, 34, runs a small bakery", persona: "Anxious, talks quickly, assumes she's in the wrong", facts: "Priya put a cake stand in her shop window priced £40. A customer insisted she had to sell it at that price. She had already promised it to a regular by email the day before, and the regular replied 'yes please' by post, which hasn't arrived yet." };
const interview = [
  { role: "learner", text: "Hello Priya, can you tell me what happened?" }, { role: "client", text: "Someone said I have to sell them my cake stand because it was in the window for £40." },
  { role: "learner", text: "Had you offered it to anyone else before that?" }, { role: "client", text: "Yes, I emailed a regular the day before. She posted a letter saying yes please." },
  { role: "learner", text: "Has the letter arrived?" }, { role: "client", text: "Not yet." },
  { role: "learner", text: "The window display is probably only an invitation to treat, so the customer can't force a sale." },
];
const profile = { site: "LawGradify", dailyMinutes: 30, examDate: "2027-01-20", examIn: 63, readiness: 0.42, readinessLow: 0.33, readinessHigh: 0.51, target: 0.7, perDay: 35, paceStatus: "behind",
  concepts: [{ name: "Offer vs invitation to treat", level: "shaky", mastery: 0.35, certainty: "medium", retention: 0.5, forgetInDays: 2, stage: "seen", confidentErrors: 2, recentErrors: 3 }, { name: "Postal rule", level: "solid", mastery: 0.8, certainty: "high", retention: 0.9, forgetInDays: 12, stage: "known", confidentErrors: 0, recentErrors: 0 }],
  actions: [{ id: "fix:u03-01|offer", title: "Revisit offer vs invitation to treat", why: "Two confident mistakes", mins: 8 }, { id: "due", title: "Review 12 due cards", why: "Due today", mins: 6 }, { id: "lesson:u03-02", title: "Start Consideration", why: "Next lesson", mins: 20 }] };
const summary = { dailyMinutes: 30, done: 14, total: 120, dueCards: 12, dueQuestions: 3, mastery: 0.41, pace: "a little behind", dims: { recognition: { value: 0.6, certainty: "medium" }, recall: { value: 0.45, certainty: "medium" }, apply: { value: 0.3, certainty: "low" } }, calibration: "overconfident on formation questions", weak: [{ id: "u03-01", title: "Contract law: formation", note: "30% on application questions" }] };

const BODIES = {
  mark: { mode: "mark", subject: "law", task: { title: "Shop window", brief: "Formation of contract", prompt: "Dan sees a jacket in a shop window marked £20 and demands to buy it at that price. The shop refuses. Advise Dan.", rubric, model: "A display is an invitation to treat (Fisher v Bell, Boots). Dan makes the offer at the till, which the shop may refuse. No contract." },
    answer: "The jacket in the window is an offer so when Dan says he wants it there is a contract and the shop has to sell it to him for £20 because that was the price on it. Dan could sue." },
  roleplay: { mode: "roleplay", subject: "law", case: kase, turns: interview.slice(0, 3) },
  debrief: { mode: "debrief", subject: "law", case: kase, rubric: ["Finds out the key facts", "Asks about acceptance and timing", "Avoids giving premature advice"], turns: interview },
  explain: { mode: "explain", subject: "law", lesson, question: "Why is a shop display not an offer?" },
  diagnose: { mode: "diagnose", subject: "law", lesson, question: { q: "When is a postal acceptance complete?", options: [{ text: "When it is posted", correct: true }, { text: "When it arrives", correct: false }, { text: "When it is read", correct: false }], chosen: "When it arrives", why: "Adams v Lindsell: the postal rule." } },
  socratic: { mode: "socratic", subject: "law", lesson, goal: "why the postal rule exists", turns: [{ role: "tutor", text: "What problem does post create for the person accepting?" }, { role: "learner", text: "They don't know when it gets there?" }] },
  examiner: { mode: "examiner", subject: "law", lesson, turns: [] },
  challenge: { mode: "challenge", subject: "law", lesson, focus: "apply" },
  connect: { mode: "connect", subject: "law", lesson, candidates },
  director: { mode: "director", subject: "law", course: "Law", summary, candidates: [{ id: "u03-01", title: "Contract law: formation" }, ...candidates] },
  coach: { mode: "coach", subject: "law", question: "I keep getting offer questions wrong. What should I do this week?", profile },
};

/** Problems the product would care about, beyond the JSON parsing. */
function problems(mode, data, kept, body) {
  const p = [];
  if (mode === "mark" || mode === "debrief") {
    const want = mode === "mark" ? body.task.rubric : body.rubric;
    if ((data.criteria ?? []).length !== want.length) p.push(`${(data.criteria ?? []).length}/${want.length} criteria`);
    (data.criteria ?? []).forEach((c, i) => { if (c.criterion !== want[i]) p.push(`criterion ${i + 1} not copied exactly`); });
  }
  if (mode === "connect" && (data.links ?? []).length !== kept.links.length) p.push(`${data.links.length - kept.links.length} invented lesson id(s)`);
  if (mode === "connect" && !kept.links.length) p.push("no links");
  if (mode === "director" && (data.steps ?? []).some((s) => s.lessonId && !kept.steps.some((k) => k.lessonId === s.lessonId))) p.push("invented lesson id(s)");
  if (mode === "coach" && (data.actions ?? []).length !== kept.actions.length) p.push(`${data.actions.length - kept.actions.length} invented/duplicate action(s)`);
  if (mode === "challenge" && kept.questions.length < 3) p.push(`${kept.questions.length}/3 questions usable`);
  if (mode === "explain" && typeof data.fromLesson !== "boolean") p.push("no fromLesson");
  return p;
}

async function viaClaude(r) {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();
  return client.beta.messages.stream({
    model: CLAUDE_MODEL, max_tokens: r.maxTokens, betas: ["server-side-fallback-2026-07-01"], fallbacks: "default",
    output_config: { effort: r.effort, ...(r.schema ? { format: { type: "json_schema", schema: r.schema } } : {}) },
    system: r.system, messages: r.messages,
  }).finalMessage();
}

const engines = [[`ollama/${OLLAMA.model}`, (r) => ollamaMessage(r, OLLAMA)]];
if (useClaude) engines.push([CLAUDE_MODEL, viaClaude]);

const rows = [];
for (const [mode, body] of Object.entries(BODIES)) {
  if (ONLY && !ONLY.includes(mode)) continue;
  const r = buildRequest(structuredClone(body));
  for (const [engine, call] of engines) {
    for (let run = 1; run <= RUNS; run++) {
      const t0 = Date.now(), row = { mode, engine, run };
      try {
        const msg = await call(r);
        row.secs = (Date.now() - t0) / 1000; row.out = msg.usage?.output_tokens ?? 0;
        const text = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("").trim();
        if (msg.stop_reason !== "end_turn") throw new Error(`stop_reason ${msg.stop_reason}`);
        if (r.schema) {
          const data = JSON.parse(text), kept = checkReply(mode, data, body);
          row.problems = problems(mode, data, kept, body); row.reply = kept;
        } else { row.problems = text ? [] : ["empty reply"]; row.reply = text; }
        row.ok = row.problems.length === 0;
      } catch (e) { row.secs = (Date.now() - t0) / 1000; row.ok = false; row.problems = [e.message]; }
      rows.push(row);
      console.log(`${mode.padEnd(10)}${engine.slice(0, 26).padEnd(27)}${row.ok ? "ok  " : "FAIL"}  ${row.secs.toFixed(1).padStart(6)}s  ${String(row.out ?? "-").padStart(5)} out  ${row.problems.join("; ")}`);
    }
  }
}

console.log("\nengine                       passed   median secs");
for (const [engine] of engines) {
  const mine = rows.filter((r) => r.engine === engine), secs = mine.map((r) => r.secs).sort((a, b) => a - b);
  console.log(`${engine.slice(0, 28).padEnd(29)}${`${mine.filter((r) => r.ok).length}/${mine.length}`.padStart(6)}   ${(secs[Math.floor(secs.length / 2)] ?? 0).toFixed(1).padStart(11)}`);
}
await mkdir(new URL("../tests/reports/", import.meta.url), { recursive: true });
const out = new URL(`../tests/reports/eval-tutor-${new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-")}.json`, import.meta.url);
await writeFile(out, JSON.stringify(rows, null, 2));
console.log(`\nEvery reply, side by side: ${out.pathname}`);
console.log("Passing the checks isn't the same as being right: read the replies for accuracy and teaching quality before moving a mode to a local model.");
