// Benchmark 4: card quality ("does a flawed card get caught before a learner sees it?").
// A labelled set of cards across nine subjects (tests/fixtures/bench/cards.json): some good, each of the rest with
// one known defect. Every card goes through Gradify's real checks in code, exactly as AI cards do
// (kit/notes/pack.js cardsFromPack: quote grounding, answer support, the reviewer's checks, near-duplicate merging).
// With --claude the independent AI review (REVIEW_PROMPT) also runs, so the two can be compared and combined.
//
// For each check we report, per defect, how many flawed cards it caught (detection), and how many good cards it
// wrongly rejected or flagged (false rejection). A card counts as:
//   blocked   removed, or marked "not in your notes" (grounded: "no")
//   flagged   blocked, or shown with any warning (grounded: "partly", or any reviewer issue)
import { cardsFromPack, reviewRequest, REVIEW_PROMPT, REVIEW_SCHEMA, MODEL } from "../../kit/notes/pack.js";

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** The code checks on one subject's cards, in order. Returns, per input card, { blocked, flagged, why }. */
export function codeVerdicts(set) {
  const pack = { topics: [{ name: set.subject, facts: set.cards.map((c, j) => ({ statement: `input-${j}`, importance: "core", quote: c.quote, page: null, card: { type: c.kind, front: c.front, back: c.back } })) }] };
  const out = cardsFromPack(pack, set.notes);
  // output cards keep the fact they came from; a list answer split into one card per item gives several
  // each input carries a unique fact id, kept on every output card it becomes (even when two fronts are identical)
  return set.cards.map((c, j) => {
    const os = out.filter((o) => o.fact === `input-${j}`);
    if (!os.length) return { blocked: true, flagged: true, rewritten: false, why: "removed (duplicate or unusable)" };
    const issues = [...new Set(os.flatMap((o) => o.issues || []))];
    const blocked = os.every((o) => o.grounded === "no");
    const rewritten = os.length > 1 || norm(os[0].front) !== norm(c.front);
    return { blocked, flagged: blocked || os.some((o) => o.grounded === "partly" || o.grounded === "no") || issues.length > 0, rewritten,
      why: [os.some((o) => o.grounded !== "yes") ? `grounded: ${os.map((o) => o.grounded).join("/")}` : null, rewritten ? `rewritten as ${os.length} card${os.length > 1 ? "s" : ""}` : null, ...issues].filter(Boolean).join(", ") || null };
  });
}

/** Detection per defect and false rejection on good cards, from per-card verdicts. */
export function tally(sets, verdictsBySet) {
  const by = {}, good = { n: 0, blocked: 0, flagged: 0, rewritten: 0 };
  sets.forEach((s, i) => s.cards.forEach((c, j) => {
    const v = verdictsBySet[i][j];
    if (c.label === "good") { good.n++; good.blocked += v.blocked ? 1 : 0; good.flagged += v.flagged ? 1 : 0; good.rewritten += v.rewritten ? 1 : 0; return; }
    const d = (by[c.label] ||= { n: 0, blocked: 0, flagged: 0 });
    d.n++; d.blocked += v.blocked ? 1 : 0; d.flagged += v.flagged ? 1 : 0;
  }));
  const bad = Object.values(by).reduce((a, d) => ({ n: a.n + d.n, blocked: a.blocked + d.blocked, flagged: a.flagged + d.flagged }), { n: 0, blocked: 0, flagged: 0 });
  const r = (x, n) => (n ? Math.round((x / n) * 1000) / 1000 : null);
  return {
    cards: good.n + bad.n, good: good.n, flawed: bad.n,
    detection: { blocked: r(bad.blocked, bad.n), flagged: r(bad.flagged, bad.n) },
    falseRejection: { blocked: r(good.blocked, good.n), flagged: r(good.flagged, good.n) },
    goodRewritten: r(good.rewritten, good.n),   // good cards the code changed (a list split); each one listed in misses
    byDefect: Object.fromEntries(Object.entries(by).sort().map(([k, d]) => [k, { n: d.n, blocked: r(d.blocked, d.n), flagged: r(d.flagged, d.n) }])),
  };
}

export function cardBenchmark(fixture) {
  const verdicts = fixture.sets.map(codeVerdicts);
  return { code: tally(fixture.sets, verdicts), misses: missesOf(fixture.sets, verdicts) };
}
function missesOf(sets, verdicts) {
  return sets.flatMap((s, i) => s.cards.map((c, j) => ({ subject: s.subject, label: c.label, front: c.front, ...verdicts[i][j] })))
    .filter((x) => (x.label === "good" ? x.flagged || x.rewritten : !x.flagged)).map((x) => `${x.label === "good" ? (x.flagged ? "good card flagged" : "good card rewritten") : `missed ${x.label}`} [${x.subject}] ${x.front}${x.why ? ` (${x.why})` : ""}`);
}

/** The independent AI review on the same cards (costs a few pence). Needs ANTHROPIC_API_KEY. */
export async function aiVerdicts(set, model = MODEL) {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();
  const cards = set.cards.map((c) => ({ ...c, grounded: "yes" }));
  const msg = await client.beta.messages.stream({
    model, max_tokens: 8000, betas: ["server-side-fallback-2026-07-01"], fallbacks: "default",
    output_config: { effort: "medium", format: { type: "json_schema", schema: REVIEW_SCHEMA } },
    system: [{ type: "text", text: REVIEW_PROMPT }],
    messages: [{ role: "user", content: [{ type: "text", text: reviewRequest(cards, set.notes) }] }],
  }).finalMessage();
  if (msg.stop_reason !== "end_turn") throw new Error(`stop_reason ${msg.stop_reason}`);
  const list = JSON.parse(msg.content.filter((b) => b.type === "text").map((b) => b.text).join("")).verdicts;
  const by = new Map(list.map((v) => [v.id, v]));
  // an unreviewed card must not count as accepted: every card needs exactly one verdict
  const ids = set.cards.map((_, i) => `c${i + 1}`);
  const missing = ids.filter((id) => list.filter((v) => v.id === id).length !== 1);
  if (missing.length || list.length !== ids.length) throw new Error(`[${set.subject}] the reviewer didn't return exactly one verdict per card (problem ids: ${missing.join(", ") || "extra verdicts"})`);
  return { usage: msg.usage, verdicts: set.cards.map((_, i) => { const v = by.get(`c${i + 1}`); return { blocked: v?.verdict === "reject", flagged: v?.verdict === "reject" || v?.verdict === "revise", why: v?.reason ?? null }; }) };
}

/** Code checks and AI review together, as production runs them: either one blocking or flagging a card counts. */
export const combine = (a, b) => a.map((x, i) => ({ blocked: x.blocked || b[i].blocked, flagged: x.flagged || b[i].flagged, why: [x.why, b[i].why].filter(Boolean).join("; ") || null }));
