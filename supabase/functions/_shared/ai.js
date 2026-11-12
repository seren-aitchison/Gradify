// Gradify AI request flow shared by the course-tutor and study-pack Edge Functions, so both enforce the same controls.
// Plain JavaScript with Web Crypto only: it runs in Deno (Supabase) and in Node (tests/ai-flow.test.mjs).
//
// Every request:
//   1. is claimed in the server-only usage ledger (public.ai_claim_for): AI on (or a tester), spending caps, rate
//      limits, the learner's fair-use cap, conversation turns, and the Free or Pro allowance, in one locked step;
//   2. may be answered from the response cache (explanations of a lesson's own notes, lesson links): no Claude call,
//      no cost, and the use is given back;
//   3. calls Claude, then settles the claim with the real model, token counts and cost (public.ai_settle_for).
//      A failed call, a refusal or an unusable reply gives the use back but keeps its cost in the spend.
// Learners and the iOS app see the same JSON: { error, reason, feature, plan, used, allowance, resetsAt, upgrade }
// on a refusal, and { ..., usage: { feature, plan, used, allowance, resetsAt, counted } } on success.

/** Which allowance a request mode counts against (mirrors public.ai_feature). */
export const FEATURE_OF = {
  mark: "tutor", roleplay: "tutor", debrief: "tutor", diagnose: "tutor", socratic: "tutor", challenge: "tutor",
  connect: "tutor", examiner: "tutor", director: "tutor",
  explain: "explain", card: "explain",
  pack: "pack", questions: "quiz",
};
const LABEL = { tutor: ["AI tutor conversation", "AI tutor conversations"], explain: ["explanation", "explanations"], pack: ["study pack", "study packs"], quiz: ["AI-written quiz", "AI-written quizzes"] };
/** Multi-turn tutor modes: turns of one conversation share a single use. */
export const CONVERSATION_MODES = ["roleplay", "socratic", "examiner"];

const day = (iso) => (iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", timeZone: "Europe/London" }) : null);
const plural = (f, n) => (LABEL[f] ? LABEL[f][n === 1 ? 0 : 1] : "uses");

/**
 * When the monthly fair-use limit resets: the 1st of next month, 00:00 UTC. The database counts a learner's spend from
 * date_trunc('month', now()), whatever their plan, so for Pro this is not the end of their billing period.
 */
export function capResetsAt(now = new Date()) {
  const d = new Date(now);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1)).toISOString();
}

/** The learner-facing answer when a claim is refused. */
export function refusal(claim, mode, now = new Date()) {
  const feature = FEATURE_OF[mode] ?? null, resetsAt = claim.period_end ?? null, on = day(resetsAt);
  const base = { reason: claim.reason, feature, plan: claim.plan ?? null, used: claim.used ?? 0, allowance: claim.allowance ?? 0, resetsAt, upgrade: false };
  switch (claim.reason) {
    case "signed_out": return { status: 401, body: { ...base, error: "Please sign in to use Gradify AI." } };
    case "unknown_mode": return { status: 400, body: { ...base, error: "Unknown request." } };
    case "ai_off": return { status: 503, body: { ...base, error: "Gradify AI isn't switched on yet. Everything else on Gradify works as normal." } };
    case "budget": return { status: 503, body: { ...base, error: "Gradify AI is taking a short break. Please try again later." } };
    case "busy": return { status: 503, body: { ...base, error: "Gradify AI is busy right now. Please try again in a minute." } };
    case "rate": return { status: 429, body: { ...base, error: "That's a lot of requests in a short time. Wait a minute, then try again." } };
    case "fair_use": {
      const capAt = capResetsAt(now);
      return { status: 429, body: { ...base, resetsAt: capAt, error: `You've reached this month's fair-use limit for Gradify AI. It resets on ${day(capAt)}.` } };
    }
    case "conversation_long": return { status: 429, body: { ...base, error: "This conversation has reached its length limit. Start a new one to keep going." } };
    case "allowance": {
      const n = claim.allowance ?? 0, free = claim.plan !== "pro";
      return { status: 429, body: { ...base, upgrade: free, error: `You've used ${free ? "your" : "this month's"} ${n} ${free ? "free " : ""}${plural(feature, n)}${free ? " this month" : ""}.${on ? ` ${free ? "They" : "Your allowance"} reset${free ? "" : "s"} on ${on}.` : ""}${free ? " Gradify Pro has many more." : ""}` } };
    }
    default: return { status: 503, body: { ...base, error: "Gradify AI isn't available right now." } };
  }
}

/** Token usage from a Claude response, in the ledger's terms. */
export function tokensOf(msg) {
  const u = msg?.usage ?? {};
  return { model: msg?.model ?? null, input: u.input_tokens ?? 0, output: u.output_tokens ?? 0, cacheRead: u.cache_read_input_tokens ?? 0, cacheWrite: u.cache_creation_input_tokens ?? 0 };
}

/** A generous token estimate for reserving a request's worst-case cost (about 3 characters a token). */
export const estimateTokens = (...parts) => Math.ceil(parts.reduce((n, p) => n + (typeof p === "string" ? p.length : JSON.stringify(p ?? "").length), 0) / 3);

const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
export const sha256 = async (s) => hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)));

/** Modes whose answers don't depend on who asked, so may be cached: an explanation (no lab state) and lesson links. */
export const cacheable = (mode, body) => (mode === "explain" && body?.lab == null) || mode === "connect";
/** The same request (model, instructions, lesson notes and question) gives the same key. */
export const cacheKey = (model, r) => sha256(JSON.stringify([model, r.mode, r.system, r.messages, r.schema ? 1 : 0]));
/** Questions differing only in spacing or case share a cache entry. */
export const normaliseQuestion = (q) => String(q ?? "").replace(/\s+/g, " ").trim();

class Failure extends Error {
  constructor(status, message, why) { super(message); this.status = status; this.why = why; }
}
/** Raise from inside call/parse to fail with a learner-facing status and message (the use is given back). */
export const fail = (status, message, why = message) => { throw new Failure(status, message, why); };

/**
 * Run one Gradify AI request through the ledger.
 * deps: claim({ mode, site, conversationId, estInput, maxOutput }) → claim row
 *       settle(id, { model, input, output, cacheRead, cacheWrite, outcome, error }) → cost
 *       cacheGet(key) → reply | null,  cachePut(key, mode, reply, model)
 * job:  { mode, site, conversationId, estInput, maxOutput, check?(claim), cacheKey?, call(model, claim) → message, parse(message, claim) → body }
 * The claim names the model for the feature (public.ai_feature_models); job.model is the fallback if it doesn't.
 * Returns { status, body }.
 */
export async function runAi(deps, job) {
  const claim = await deps.claim({ mode: job.mode, site: job.site ?? null, conversationId: job.conversationId ?? null, estInput: job.estInput ?? 0, maxOutput: job.maxOutput ?? 0 });
  if (!claim?.usage_id) return refusal(claim ?? { reason: "unavailable" }, job.mode);
  const usage = { feature: FEATURE_OF[job.mode] ?? null, plan: claim.plan, used: claim.used, allowance: claim.allowance, resetsAt: claim.period_end ?? null, counted: claim.counted !== false };
  const giveBack = { ...usage, used: usage.counted ? usage.used - 1 : usage.used };
  let tokens = { model: null, input: 0, output: 0, cacheRead: 0, cacheWrite: 0 };
  const settle = (outcome, error) => deps.settle(claim.usage_id, { ...tokens, outcome, error: error ?? null }).catch((e) => console.error("ai settle", e?.message));
  try {
    if (job.check) await job.check(claim);
    if (job.cacheKey && deps.cacheGet) {
      const hit = await deps.cacheGet(job.cacheKey).catch(() => null);
      if (hit) { await settle("cached"); return { status: 200, body: { ...hit, cached: true, usage: giveBack } }; }
    }
    const msg = await job.call(claim.model ?? job.model, claim);
    tokens = tokensOf(msg);
    if (msg.stop_reason === "refusal") fail(422, "Gradify AI couldn't help with that. Try rephrasing, and keep to the course material.", "refusal");
    if (msg.stop_reason === "max_tokens") fail(413, "That was too long for Gradify AI to finish in one go. Try a shorter piece.", "max_tokens");
    const body = await job.parse(msg, claim);
    await settle("ok");
    if (job.cacheKey && deps.cachePut) await deps.cachePut(job.cacheKey, job.mode, body, tokens.model).catch(() => {});
    return { status: 200, body: { ...body, usage } };
  } catch (e) {
    if (e instanceof Failure) { await settle("failed", e.why); return { status: e.status, body: { error: e.message, usage: giveBack } }; }
    const name = e?.constructor?.name ?? "Error", status = e?.status;
    await settle("failed", `${name}${status ? ` ${status}` : ""}: ${String(e?.message ?? "").slice(0, 120)}`);
    if (status === 429 || status === 529 || name === "RateLimitError") return { status: 503, body: { error: "Gradify AI is busy. Please try again in a minute.", usage: giveBack } };
    if (e instanceof SyntaxError) return { status: 502, body: { error: "Gradify AI's answer couldn't be read. Please try again.", usage: giveBack } };
    return { status: 502, body: { error: "Gradify AI is unavailable right now. Please try again in a minute.", usage: giveBack } };
  }
}

/** The ledger over a Supabase client with the service role (Edge Functions only). */
export function ledger(admin, userId) {
  const one = async (p) => { const { data, error } = await p; if (error) throw error; return data; };
  return {
    claim: async (j) => (await one(admin.rpc("ai_claim_for", { p_uid: userId, p_mode: j.mode, p_site: j.site, p_conversation: j.conversationId, p_est_input: Math.min(j.estInput, 2_000_000_000), p_max_output: j.maxOutput })))?.[0] ?? null,
    settle: (id, t) => one(admin.rpc("ai_settle_for", { p_id: id, p_uid: userId, p_model: t.model, p_input: t.input, p_output: t.output, p_cache_read: t.cacheRead, p_cache_write: t.cacheWrite, p_outcome: t.outcome, p_error: t.error })),
    cacheGet: (key) => one(admin.rpc("ai_cache_get", { p_key: key })),
    cachePut: (key, mode, reply, model) => one(admin.rpc("ai_cache_put", { p_key: key, p_mode: mode, p_reply: reply, p_model: model })),
  };
}

/** A conversation id from the client: a UUID, or none. */
export const conversationOf = (mode, id) => (CONVERSATION_MODES.includes(mode) && typeof id === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id) ? id.toLowerCase() : null);
