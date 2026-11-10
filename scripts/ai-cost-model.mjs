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
  // which model answers each feature (public.ai_feature_models), and Anthropic's published prices per million tokens
  featureModel: { tutor: "claude-opus-5-5", explain: "claude-opus-5-5", pack: "claude-sonnet-5-5", quiz: "claude-sonnet-5-5" },
  prices: {
    "claude-opus-5-5": { input: 4, output: 20, cacheRead: 0.2, cacheWrite: 5 },
    "claude-sonnet-5-5": { input: 2, output: 10, cacheRead: 0.1, cacheWrite: 2.5 },
  },
  price: { input: 4, output: 20, cacheRead: 0.2, cacheWrite: 5 },   // the model being costed (set per feature below)
  gbpPerUsd: 0.79,                     // exchange rate: an assumption, check before deciding (public.ai_settings.gbp_per_usd)
  cacheMinTokens: 4096,                // prompts shorter than this are assumed not to be cached (the minimum varies by model)
  // output tokens per request (visible reply + adaptive thinking at the mode's effort), typical and high; never above
  // max_tokens. Assumed the same on Sonnet as on Opus: measure both (scripts/eval-notes.mjs --compare) before relying on it.
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
  // allowances a month [tutor, explanations, packs, quizzes] (public.ai_limits) and fair-use caps in pence (public.ai_plan_caps)
  allowance: { free: [5, 5, 1, 2], pro: [40, 25, 5, 8] },
  caps: { free: 100, pro: 500 },
  // uses a month: [tutor, explanations, packs, quizzes], within the allowances
  usage: {
    "Free, light": [2, 2, 0, 0], "Free, active": [4, 4, 1, 1], "Free, uses everything": [5, 5, 1, 2],
    "Pro, light": [10, 6, 1, 2], "Pro, typical": [25, 15, 3, 5], "Pro, every use": [40, 25, 5, 8],
  },
  // Gradify Pro prices (VAT included): today's live prices and the proposal. Stripe's standard UK card fee
  // (1.5% + 20p) and Stripe Billing (0.7%) are assumptions: check your own rates in the Stripe dashboard.
  pricePoints: { "Today: £7.99 / £63.99": { month: 7.99, year: 63.99 }, "Proposed: £14.99 / £119.99": { month: 14.99, year: 119.99 } },
  revenue: { vat: 0.2, cardPct: 0.015, cardFixed: 0.20, billingPct: 0.007 },
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

// ---------- costs by model, and the hybrid ----------
// perUse() prices every feature at ASSUME.price; run it once per model and pick each feature's row from its model
function withPrice(model, fn) { const saved = ASSUME.price; ASSUME.price = ASSUME.prices[model]; try { return fn(); } finally { ASSUME.price = saved; } }
export function costs(m, level = 0) {
  const by = Object.fromEntries(Object.keys(ASSUME.prices).map((model) => [model, withPrice(model, () => perUse(m, level))]));
  const pick = (f, key) => by[ASSUME.featureModel[f]][key];
  return { by, hybrid: { tutor: pick("tutor", "tutor"), explain: pick("explain", "explain"), pack: pick("pack", "pack"), quiz: pick("quiz", "quiz") } };
}
const monthOf = (u, c) => gbp(u[0] * c.tutor + u[1] * c.explain + u[2] * c.pack + u[3] * c.quiz);

export function revenue(point) {
  const R = ASSUME.revenue, net = (gross) => gross / (1 + R.vat) - (gross * (R.cardPct + R.billingPct) + R.cardFixed);
  return { month: net(point.month), year: net(point.year) / 12 };
}

const money = (x) => `${x < 0 ? "–" : ""}£${Math.abs(x).toFixed(2)}`;
const p = (x) => `${(x * 100).toFixed(1)}p`;
const pct = (a, b) => `${Math.round((a / b) * 100)}%`;
const short = (model) => model.replace("claude-", "").replace(/-(\d)-(\d)$/, " $1.$2").replace(/^./, (c) => c.toUpperCase());

export async function report() {
  const m = await measure(), T = costs(m, 0), H = costs(m, 1);
  const opus = "claude-opus-5-5", son = "claude-sonnet-5-5";
  const allOpus = (c) => ({ tutor: c.by[opus].tutor, explain: c.by[opus].explain, pack: c.by[opus].pack, quiz: c.by[opus].quiz });
  const cap = (name) => (name.startsWith("Pro") ? ASSUME.caps.pro : ASSUME.caps.free) / 100;
  const rows = Object.entries(ASSUME.usage).map(([name, use]) => {
    const typical = monthOf(use, T.hybrid), high = monthOf(use, H.hybrid);
    return { name, use, typical, high, opusTypical: monthOf(use, allOpus(T)), capped: Math.min(high, cap(name)) };
  });
  const pro = rows.filter((r) => r.name.startsWith("Pro")), free = rows.filter((r) => r.name.startsWith("Free"));
  const freeActive = rows.find((r) => r.name === "Free, active").typical;
  const out = [];
  out.push(`# Gradify AI: estimated Anthropic cost per learner

Generated by \`scripts/ai-cost-model.mjs\` on ${new Date().toISOString().slice(0, 10)}. **Estimates, not measurements of real use.** Input sizes are measured from Gradify's real prompts and lesson notes; reply lengths, usage, the exchange rate and fees are assumptions (listed at the end). Once Gradify AI is in use, \`ai-usage.html\` and \`scripts/ai-usage.mjs\` show the real cost per request: replace these assumptions with those figures.

**Modelled:** ${Object.entries(ASSUME.featureModel).map(([f, mo]) => `${f} on ${short(mo)}`).join(", ")}. Allowances a month: Free ${ASSUME.allowance.free.join(" / ")}, Pro ${ASSUME.allowance.pro.join(" / ")} (tutor / explanations / packs / quizzes). Fair-use caps: Free ${money(ASSUME.caps.free / 100)}, Pro ${money(ASSUME.caps.pro / 100)} a month. £${ASSUME.gbpPerUsd} per $.

## Cost of one use: Opus 5.5 against Sonnet 5.5

Same prompts, same assumed reply lengths; Sonnet 5.5 costs half as much per token ($2 / $10 against $4 / $20 per million). Bold is the model each feature now uses.

| Use | Opus 5.5 typical | Sonnet 5.5 typical | Opus 5.5 high | Sonnet 5.5 high |
|---|---|---|---|---|
${[["AI tutor conversation", "tutor", "tutor"], ["Explanation", "explain", "explain"], [`Study pack (${ASSUME.packChars.typical / 1000}k characters of notes)`, "pack", "pack"], ["AI-written quiz", "quiz", "quiz"]].map(([label, f, key]) => {
  const b = (model, v) => (ASSUME.featureModel[f] === model ? `**${p(gbp(v))}**` : p(gbp(v)));
  return `| ${label} | ${b(opus, T.by[opus][key])} | ${b(son, T.by[son][key])} | ${b(opus, H.by[opus][key])} | ${b(son, H.by[son][key])} |`;
}).join("\n")}

Moving packs and quizzes to Sonnet saves about ${p(gbp(T.by[opus].pack - T.by[son].pack))} a pack and ${p(gbp(T.by[opus].quiz - T.by[son].quiz))} a quiz. Keeping tutoring and explanations on Opus costs about ${p(gbp(T.by[opus].tutor - T.by[son].tutor))} more a conversation and ${p(gbp(T.by[opus].explain - T.by[son].explain))} more an explanation than Sonnet would.

## Cost per learner per month (hybrid)

| Learner | Tutor / explanations / packs / quizzes | Typical | High | High, after the fair-use cap | All on Opus (typical) |
|---|---|---|---|---|---|
${rows.map((r) => `| ${r.name} | ${r.use.join(" / ")} | ${money(r.typical)} | ${money(r.high)} | ${money(r.capped)} | ${money(r.opusTypical)} |`).join("\n")}

With these allowances the worst case for one Pro learner is the high column for "every use"; the fair-use cap (${money(ASSUME.caps.pro / 100)}) ${pro.at(-1).high > ASSUME.caps.pro / 100 ? "takes effect only there" : "is never reached at these allowances, even with long replies: it is a backstop against abuse and estimate errors"}. A Free learner who uses everything costs at most ${money(free.at(-1).high)}, ${free.at(-1).high > ASSUME.caps.free / 100 ? "so Free's £1 cap can apply in the worst case" : "under Free's £1 cap"}.

## Margin per Pro subscriber

What a subscriber brings in a month after VAT (20%) and Stripe's fees, less their AI cost. The worst case uses the high cost of a learner who uses every Pro allowance, after the cap.
`);
  for (const [label, point] of Object.entries(ASSUME.pricePoints)) {
    const rev = revenue(point);
    out.push(`### ${label}

Net income a month: ${money(rev.month)} on monthly billing, ${money(rev.year)} on yearly (${money(point.year)} ÷ 12; ${pct(point.month * 12 - point.year, point.month * 12)} off twelve monthly payments).

| Pro learner | AI cost | Left from monthly | Left from yearly |
|---|---|---|---|
${pro.map((r) => `| ${r.name.replace("Pro, ", "")} (typical replies) | ${money(r.typical)} | ${money(rev.month - r.typical)} (${pct(rev.month - r.typical, rev.month)}) | ${money(rev.year - r.typical)} (${pct(rev.year - r.typical, rev.year)}) |`).join("\n")}
| Worst case (every use, long replies, capped) | ${money(pro.at(-1).capped)} | ${money(rev.month - pro.at(-1).capped)} (${pct(rev.month - pro.at(-1).capped, rev.month)}) | ${money(rev.year - pro.at(-1).capped)} (${pct(rev.year - pro.at(-1).capped, rev.year)}) |

A typical Pro subscriber's margin on yearly billing covers about ${Math.floor((rev.year - pro.find((r) => r.name === "Pro, typical").typical) / freeActive)} active Free learners (${money(freeActive)} each).
`);
  }
  out.push(`Not included: Supabase, hosting and email costs, refunds, chargebacks, and tax on profits.

## Quality: what is and isn't known

The cost side is estimated from real prompts; the quality side can't be estimated from prompts and **has not been measured yet** (Gradify has no Anthropic key set, so no comparison could be run). What is known:

- **Study packs are checked mechanically whichever model writes them.** Every card carries a quote from the learner's notes and is scored against them (\`groundingScore\`), structured output fixes the shape, and the deck shows how much of each card was found in the notes. A weaker pack shows up as fewer grounded cards, which can be measured.
- **Tutoring and explanations are judged by people**, so they stay on Opus 5.5 until real conversations say otherwise.
- **Before relying on Sonnet for packs and quizzes,** run \`node scripts/eval-notes.mjs --compare --long\` (with \`ANTHROPIC_API_KEY\` set): the same notes through both models, comparing valid output, grounded cards, cards and topics per pack, why/apply questions, real tokens and real cost. A run (three short sample notes and one lecture-length sample, through both models) costs about ${money(2 * gbp(T.by[opus].pack + T.by[son].pack))} at the typical estimates. If Sonnet's packs are clearly worse, switch back without a deploy: \`update public.ai_feature_models set model = 'claude-opus-5-5' where feature in ('pack', 'quiz');\`

## The measured inputs

${m.lessons} lessons with published notes in law, maths, nursing, pharmacy, history, psychology and sociology; every third one (${m.sampled}) measured. Lesson notes sent to the tutor: median ${m.notesTokens.median.toLocaleString()} tokens, 90th percentile ${m.notesTokens.p90.toLocaleString()}.

| Mode | Instructions + notes (median tokens) | Message (median) | max_tokens |
|---|---|---|---|
${Object.entries(m.sizes).map(([k, v]) => `| ${k} | ${median(v.map((x) => x.system)).toLocaleString()} | ${median(v.map((x) => x.messages)).toLocaleString()} | ${v[0].max.toLocaleString()} |`).join("\n")}

Study pack prompt (instructions + notes): ${Object.entries(m.pack).map(([k, v]) => `${k} ${v.toLocaleString()} tokens`).join(", ")}; max_tokens 32,000.

Tutor conversation by mode on Opus 5.5 (typical): ${Object.entries(T.by[opus].modes).map(([k, v]) => `${k} ${p(gbp(v))}`).join(", ")}.

## Assumptions

\`\`\`json
${JSON.stringify({ ...ASSUME, price: undefined }, null, 2)}
\`\`\`
`);
  return { md: out.join("\n"), m, T, H, rows };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = await report();
  if (process.argv.includes("--write")) { await writeFile(new URL("docs/AI-COSTS.md", root), r.md); console.error("Wrote docs/AI-COSTS.md"); }
  else console.log(r.md);
}
