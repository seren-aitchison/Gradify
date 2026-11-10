// What Gradify AI is likely to cost per learner per month, against what Gradify Pro brings in.
//   node scripts/ai-cost-model.mjs [--write]      (--write saves docs/AI-COSTS.md)
// Input sizes are MEASURED: the real tutor requests (kit/assess/tutor.js buildRequest) are built for every published
// lesson of the larger courses, with the lesson notes the server would send (kit/assess/canon.js), and the real
// study-pack prompt (supabase/functions/_shared/pack.js) for notes of several lengths. Characters become tokens at
// 3.5 characters a token (English prose; newer Claude tokenizers use somewhat more tokens than older ones).
// Everything else is an ASSUMPTION, stated in the ASSUME block below and printed in the report: reply and thinking
// lengths, conversation lengths, how a tutor use splits across modes, cache hits, usage levels, the exchange rate and
// payment fees. Change them and re-run. Nothing here calls Claude.
import { readFile, readdir, writeFile } from "node:fs/promises";
import { buildRequest, MODEL } from "../kit/assess/tutor.js";
import { canonicalLesson } from "../kit/assess/canon.js";
import { SYSTEM_PROMPT, userPrompt } from "../supabase/functions/_shared/pack.js";

const root = new URL("../", import.meta.url);
const CHARS_PER_TOKEN = 3.5;
const tok = (s) => Math.ceil((typeof s === "string" ? s : JSON.stringify(s)).length / CHARS_PER_TOKEN);

// ---------- assumptions (edit these) ----------
export const ASSUME = {
  model: MODEL,
  // US dollars per million tokens: Anthropic's published Claude Opus 5.5 prices (also seeded in public.ai_prices)
  price: { input: 4, output: 20, cacheRead: 0.2, cacheWrite: 5 },
  gbpPerUsd: 0.79,                     // exchange rate: an assumption, check before deciding (public.ai_settings.gbp_per_usd)
  cacheMinTokens: 4096,                // prompts shorter than this are assumed not to be cached (the minimum varies by model)
  // output tokens per request (visible reply + adaptive thinking at the mode's effort), typical and high; never above max_tokens
  output: {
    explain: [600, 1500], diagnose: [700, 1500], socratic: [300, 500], examiner: [350, 500], roleplay: [180, 400],
    challenge: [1600, 3000], connect: [500, 1500], mark: [2000, 4000], debrief: [2000, 4000], director: [1200, 2000],
    card: [400, 1200], pack: [12000, 24000], questions: [6000, 12000],
  },
  // one tutor "conversation" (one use) by mode: share of uses, turns per use, and words a learner types per turn
  tutorMix: { socratic: [0.30, 8], examiner: [0.15, 6], roleplay: [0.10, 10], diagnose: [0.15, 1], challenge: [0.10, 1], mark: [0.12, 1], connect: [0.04, 1], director: [0.04, 1] },
  learnerTokensPerTurn: 45,
  // an explanation use: explain or a single-card rewrite; share answered from the response cache
  explainMix: { explain: 0.85, card: 0.15 }, explainCacheHit: 0.10,
  // a learner's own notes for a study pack, in characters (about 3, 7 and 12 pages of typed notes)
  packChars: { short: 10000, typical: 25000, long: 40000 },
  // uses a month: [tutor, explanations, packs, quizzes]
  usage: {
    "Free, light": [2, 2, 0, 0], "Free, active": [4, 4, 1, 1], "Free, uses everything": [5, 5, 1, 2],
    "Pro, light": [15, 10, 2, 3], "Pro, typical": [40, 25, 5, 8], "Pro, heavy": [90, 60, 12, 18], "Pro, every use": [150, 100, 20, 30],
  },
  // revenue: prices include 20% VAT; Stripe's standard UK card fee (1.5% + 20p) and Stripe Billing (0.7%): check your own rates
  revenue: { month: 7.99, year: 63.99, vat: 0.2, cardPct: 0.015, cardFixed: 0.20, billingPct: 0.007 },
};

const usd = (inp, out, cr = 0, cw = 0) => (inp * ASSUME.price.input + out * ASSUME.price.output + cr * ASSUME.price.cacheRead + cw * ASSUME.price.cacheWrite) / 1e6;
const gbp = (u) => u * ASSUME.gbpPerUsd;
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const p90 = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length * 0.9)]; };

// ---------- measure: real lessons, real prompts ----------
async function lessons() {
  const out = [];
  for (const subject of ["law", "maths", "nursing", "pharmacy", "history", "psychology", "sociology"]) {
    const ids = await readFile(new URL(`kit/courses/${subject}/ids.js`, root), "utf8").catch(() => null);
    if (!ids) continue;
    const read = (p) => readFile(new URL(p, root), "utf8").catch(() => null);
    for (const [, id] of ids.matchAll(/"(u\d{2}-[a-z0-9-]+)"\s*:/gi)) {
      const lesson = await canonicalLesson({ subject, lesson: { id } }, read).catch(() => null);
      if (lesson) out.push({ subject, lesson });
    }
  }
  return out;
}

function sizeOf(body) { const r = buildRequest(body); return { system: tok(r.system), messages: tok(r.messages), max: r.maxTokens }; }

export async function measure() {
  const all = await lessons();
  const sample = all.filter((_, i) => i % 3 === 0);   // every third lesson: plenty, and fast
  const sizes = { explain: [], socratic: [], examiner: [], challenge: [], connect: [], diagnose: [] };
  const say = "Can you explain why this happens and how it links to the earlier idea in the notes?";
  for (const { subject, lesson } of sample) {
    sizes.explain.push(sizeOf({ mode: "explain", subject, lesson, question: say }));
    sizes.socratic.push(sizeOf({ mode: "socratic", subject, lesson, turns: [{ role: "learner", text: say }] }));
    sizes.examiner.push(sizeOf({ mode: "examiner", subject, lesson, turns: [{ role: "learner", text: "Ready." }] }));
    sizes.challenge.push(sizeOf({ mode: "challenge", subject, lesson, focus: "apply" }));
    sizes.connect.push(sizeOf({ mode: "connect", subject, lesson, candidates: all.filter((x) => x.subject === subject).slice(0, 40).map((x) => ({ id: x.lesson.id, title: x.lesson.title })) }));
    sizes.diagnose.push(sizeOf({ mode: "diagnose", subject, lesson, question: { q: "Which statement is correct?", options: [{ text: "A plausible but wrong statement about the lesson", correct: false }, { text: "The correct statement from the lesson", correct: true }, { text: "Another distractor", correct: false }, { text: "A fourth option", correct: false }], chosen: 0, why: "Because the notes explain it." } }));
  }
  const notesTokens = sample.map((x) => tok(x.lesson.text));
  const pack = Object.fromEntries(Object.entries(ASSUME.packChars).map(([k, n]) => [k, tok(SYSTEM_PROMPT) + tok(userPrompt({ title: "Lecture 4", site: "Gradify", level: "undergraduate", text: "x".repeat(n), today: "2026-11-11" }))]));
  return { lessons: all.length, sampled: sample.length, notesTokens: { median: median(notesTokens), p90: p90(notesTokens) }, sizes, pack, packSystem: tok(SYSTEM_PROMPT) };
}

// ---------- cost of one use of each kind ----------
// A conversation: the system prompt (instructions + lesson notes) is written to the cache on the first turn and read
// from it on later turns (if long enough to cache); the history grows by the learner's message and the visible reply.
function conversationUsd(systemTok, firstMsgTok, turns, outTok, cacheable) {
  let total = 0, history = firstMsgTok;
  const visibleReply = Math.min(outTok, 160);
  for (let t = 1; t <= turns; t++) {
    const sys = cacheable ? (t === 1 ? usd(0, 0, 0, systemTok) : usd(0, 0, systemTok, 0)) : usd(systemTok, 0);
    total += sys + usd(history, outTok);
    history += visibleReply + ASSUME.learnerTokensPerTurn;
  }
  return total;
}

export function perUse(m, level = 0) {
  const med = (k, f) => median(m.sizes[k].map(f));
  const out = (k) => ASSUME.output[k][level];
  const single = (k) => { const s = med(k, (x) => x.system), msg = med(k, (x) => x.messages); return usd(s + msg, out(k)); };
  const conv = (k, turns) => { const s = med(k, (x) => x.system), msg = med(k, (x) => x.messages); return conversationUsd(s, msg, turns, out(k), s >= ASSUME.cacheMinTokens); };
  const modes = {
    socratic: conv("socratic", ASSUME.tutorMix.socratic[1]), examiner: conv("examiner", ASSUME.tutorMix.examiner[1]),
    // role-play case files are short (no lesson notes): about 1,200 tokens of instructions and case
    roleplay: conversationUsd(1200, 60, ASSUME.tutorMix.roleplay[1], out("roleplay"), false),
    diagnose: single("diagnose"), challenge: single("challenge"), connect: single("connect"),
    // marking: instructions, task, rubric, model answer and the learner's answer, about 3,500 tokens
    mark: usd(3500, out("mark")),
    director: usd(2500, out("director")),
  };
  const tutor = Object.entries(ASSUME.tutorMix).reduce((n, [k, [share]]) => n + share * modes[k], 0);
  const explainOne = single("explain"), cardOne = usd(tok(SYSTEM_PROMPT) + 1800, out("card"));
  const explain = (1 - ASSUME.explainCacheHit) * (ASSUME.explainMix.explain * explainOne) + ASSUME.explainMix.card * cardOne;
  const pack = usd(m.pack.typical, out("pack"));
  const quiz = usd(m.pack.typical + 200, out("questions"));
  return { modes, tutor, explain, explainOne, cardOne, pack, packShort: usd(m.pack.short, out("pack")), packLong: usd(m.pack.long, out("pack")), quiz };
}

// the per-learner monthly fair-use caps seeded in supabase/migrations/20261111120000_ai_controls.sql (pence)
export const CAPS = { free: 100, pro: 400 };
const PRICES = { "claude-opus-5-5": { input: 4, output: 20, cacheRead: 0.2, cacheWrite: 5 }, "claude-sonnet-5-5": { input: 2, output: 10, cacheRead: 0.1, cacheWrite: 2.5 } };
let MEASURED = null;
// re-run the model with some assumptions changed, then put them back
function withAssume(patch, fn) {
  const saved = JSON.parse(JSON.stringify(ASSUME));
  Object.assign(ASSUME, patch);
  try { return fn(); } finally { Object.assign(ASSUME, saved); }
}
function levers() {
  const m = MEASURED, use = ASSUME.usage;
  const cost = (u, mix = (x) => x) => { const t = perUse(m, 0); const tt = mix(t); return gbp(u[0] * tt.tutor + u[1] * tt.explain + u[2] * tt.pack + u[3] * tt.quiz); };
  const both = (fn) => ({ typical: fn(use["Pro, typical"]), max: fn(use["Pro, every use"]) });
  const sonnetPacks = (u) => { const opus = perUse(m, 0); const son = withAssume({ price: PRICES["claude-sonnet-5-5"] }, () => perUse(m, 0)); return gbp(u[0] * opus.tutor + u[1] * opus.explain + u[2] * son.pack + u[3] * son.quiz); };
  return [
    { name: `As built: ${ASSUME.model}, Pro allowance 150 / 100 / 20 / 30`, ...both((u) => cost(u)) },
    { name: "Packs and quizzes at medium effort (assumed 40% less output)", ...both((u) => withAssume({ output: { ...ASSUME.output, pack: ASSUME.output.pack.map((x) => x * 0.6), questions: ASSUME.output.questions.map((x) => x * 0.6) } }, () => cost(u))) },
    { name: "Packs and quizzes on claude-sonnet-5-5, the rest on Opus", ...both(sonnetPacks) },
    { name: "Everything on claude-sonnet-5-5", ...both((u) => withAssume({ price: PRICES["claude-sonnet-5-5"] }, () => cost(u))) },
    { name: "Pro allowance 150 / 100 / 8 / 12 (fewer packs and quizzes)", typical: cost(use["Pro, typical"]), max: cost([150, 100, 8, 12]) },
  ];
}

export function revenue() {
  const R = ASSUME.revenue, net = (gross) => gross / (1 + R.vat) - (gross * (R.cardPct + R.billingPct) + R.cardFixed);
  return { month: net(R.month), year: net(R.year) / 12 };
}

const money = (x) => `£${x.toFixed(2)}`;
const p = (x) => `${(x * 100).toFixed(1)}p`;

export async function report() {
  const m = await measure(), t = perUse(m, 0), h = perUse(m, 1), rev = revenue();
  MEASURED = m;
  const monthly = (use, u) => gbp(use[0] * u.tutor + use[1] * u.explain + use[2] * u.pack + use[3] * u.quiz);
  const rows = Object.entries(ASSUME.usage).map(([name, use]) => ({ name, use, typical: monthly(use, t), high: monthly(use, h) }));
  const proRows = rows.filter((r) => r.name.startsWith("Pro"));
  const lines = [];
  lines.push(`# Gradify AI: estimated Anthropic cost per learner

Generated by \`scripts/ai-cost-model.mjs\` on ${new Date().toISOString().slice(0, 10)}. **Estimates, not measurements of real use.** Input sizes are measured from Gradify's real prompts and lesson notes; reply lengths, usage levels, the exchange rate and fees are assumptions (listed at the end). Once Gradify AI is in use, \`scripts/ai-usage.mjs\` and the owner's page (\`ai-usage.html\`) show the real cost per request, and these assumptions should be replaced with those figures.

Model: **${ASSUME.model}** for every feature, at $${ASSUME.price.input} / $${ASSUME.price.output} per million input / output tokens ($${ASSUME.price.cacheRead} cached reads, $${ASSUME.price.cacheWrite} cache writes), £${ASSUME.gbpPerUsd} per $.

## What each use costs

| Use | Typical | High | What drives it |
|---|---|---|---|
| AI tutor conversation (the mix below) | ${p(gbp(t.tutor))} | ${p(gbp(h.tutor))} | output tokens: thinking plus the reply, over several turns |
| Explanation | ${p(gbp(t.explain))} | ${p(gbp(h.explain))} | the lesson's notes (${m.notesTokens.median.toLocaleString()} tokens median) and the answer |
| Study pack (${(ASSUME.packChars.typical / 1000)}k characters of notes) | ${p(gbp(t.pack))} | ${p(gbp(h.pack))} | a long structured pack at high effort: output is ${Math.round((usd(0, ASSUME.output.pack[0]) / usd(m.pack.typical, ASSUME.output.pack[0])) * 100)}% of the cost |
| AI-written quiz | ${p(gbp(t.quiz))} | ${p(gbp(h.quiz))} | re-reading the notes, then the questions |

A pack from short notes (${ASSUME.packChars.short / 1000}k characters) is about ${p(gbp(t.packShort))}; from the Pro maximum (${ASSUME.packChars.long / 1000}k characters on Free's limit, 120k on Pro's) ${p(gbp(t.packLong))} or more.

Tutor conversation by mode (typical): ${Object.entries(t.modes).map(([k, v]) => `${k} ${p(gbp(v))}`).join(", ")}.

## Cost per learner per month

| Learner | Tutor / explanations / packs / quizzes | AI cost, typical | AI cost, high |
|---|---|---|---|
${rows.map((r) => `| ${r.name} | ${r.use.join(" / ")} | ${money(r.typical)} | ${money(r.high)} |`).join("\n")}

## Against Gradify Pro's income

What one Pro subscriber brings in a month after VAT (20%) and Stripe's fees: **${money(rev.month)}** on monthly billing (£${ASSUME.revenue.month}), **${money(rev.year)}** on yearly billing (£${ASSUME.revenue.year} ÷ 12).

| Pro learner | AI cost (typical) | Left from monthly | Left from yearly |
|---|---|---|---|
${proRows.map((r) => `| ${r.name.replace("Pro, ", "")} | ${money(r.typical)} | ${money(rev.month - r.typical)} (${Math.round(((rev.month - r.typical) / rev.month) * 100)}%) | ${money(rev.year - r.typical)} (${Math.round(((rev.year - r.typical) / rev.year) * 100)}%) |`).join("\n")}

The same, if replies run long (the "high" column above):

| Pro learner | AI cost (high) | Left from monthly | Left from yearly |
|---|---|---|---|
${proRows.map((r) => `| ${r.name.replace("Pro, ", "")} | ${money(r.high)} | ${money(rev.month - r.high)} | ${money(rev.year - r.high)} |`).join("\n")}

Free learners bring in nothing: an active Free learner costs about ${money(rows.find((r) => r.name === "Free, active").typical)} a month, so each typical Pro subscriber's margin on monthly billing covers about ${Math.floor((rev.month - proRows.find((r) => r.name === "Pro, typical").typical) / rows.find((r) => r.name === "Free, active").typical)} active Free learners.

Not included: Supabase, hosting and email costs, refunds, chargebacks, and income tax.

## What changes the picture

Cost a month for a typical and an every-use Pro learner (typical reply lengths) under different choices. These are options for the owner, not changes made: Gradify AI currently uses ${ASSUME.model} everywhere.

| Option | Pro, typical | Pro, every use | Left from yearly (typical) |
|---|---|---|---|
${levers().map((l) => `| ${l.name} | ${money(l.typical)} | ${money(l.max)} | ${money(rev.year - l.typical)} |`).join("\n")}

The per-learner fair-use cap (public.ai_plan_caps, now ${"£"}${(CAPS.pro / 100).toFixed(2)} Pro and ${"£"}${(CAPS.free / 100).toFixed(2)} Free a month) stops any one learner costing more than that, whatever the allowance says. At today's model and allowances, a Pro learner who uses most of their allowance reaches the cap first.

## The measured inputs

${m.lessons} lessons with published notes in law, maths, nursing, pharmacy, history, psychology and sociology; every third one (${m.sampled}) measured. Lesson notes sent to the tutor: median ${m.notesTokens.median.toLocaleString()} tokens, 90th percentile ${m.notesTokens.p90.toLocaleString()}.

| Mode | Instructions + notes (median tokens) | Message (median) | max_tokens |
|---|---|---|---|
${Object.entries(m.sizes).map(([k, v]) => `| ${k} | ${median(v.map((x) => x.system)).toLocaleString()} | ${median(v.map((x) => x.messages)).toLocaleString()} | ${v[0].max.toLocaleString()} |`).join("\n")}

Study pack prompt (instructions + notes): ${Object.entries(m.pack).map(([k, v]) => `${k} ${v.toLocaleString()} tokens`).join(", ")}; max_tokens 32,000.

## Assumptions

\`\`\`json
${JSON.stringify(ASSUME, null, 2)}
\`\`\`
`);
  return { md: lines.join("\n"), m, t, h, rev, rows };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = await report();
  if (process.argv.includes("--write")) { await writeFile(new URL("docs/AI-COSTS.md", root), r.md); console.error("Wrote docs/AI-COSTS.md"); }
  else console.log(r.md);
}
