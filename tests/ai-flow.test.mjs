// The Gradify AI request flow both Edge Functions use (supabase/functions/_shared/ai.js): refusals, success, Claude
// failures, refusals by the model, unusable replies, plan-based size checks and the response cache. The last tests
// run the flow against the real ledger (every migration in a temporary PostgreSQL, called through ledger() exactly as
// the Edge Functions call it), so the RPC names and parameters are checked too. No Claude call is made: `call` is fake.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { runAi, refusal, tokensOf, cacheKey, cacheable, normaliseQuestion, conversationOf, ledger, fail, FEATURE_OF, estimateTokens } from "../supabase/functions/_shared/ai.js";
import { tempDb } from "../scripts/pg-rehearsal.mjs";

const msg = (o = {}) => ({ model: "claude-opus-5-5", stop_reason: "end_turn", content: [{ type: "text", text: '{"answer":"Because…","fromLesson":true}' }],
  usage: { input_tokens: 9000, output_tokens: 700, cache_read_input_tokens: 0, cache_creation_input_tokens: 8000 }, ...o });

function fakes(claimRow = { usage_id: 7, plan: "free", used: 1, allowance: 5, period_end: "2026-12-01T00:00:00Z", counted: true }) {
  const log = { claims: [], settles: [], puts: [], calls: 0 }, cache = new Map();
  const deps = {
    claim: async (j) => { log.claims.push(j); return claimRow; },
    settle: async (id, t) => { log.settles.push({ id, ...t }); return 1; },
    cacheGet: async (k) => cache.get(k) ?? null,
    cachePut: async (k, mode, reply) => { log.puts.push(k); cache.set(k, reply); },
  };
  const job = (o = {}) => ({ mode: "explain", site: "maths", estInput: 100, maxOutput: 1500, call: async () => { log.calls++; return msg(); }, parse: (m) => JSON.parse(m.content[0].text), ...o });
  return { deps, job, log, cache };
}

test("every refusal reason gives a clear message, the right status and what the app needs for an upgrade prompt", () => {
  const base = { plan: "free", used: 5, allowance: 5, period_end: "2026-12-01T00:00:00Z" };
  const r = refusal({ ...base, reason: "allowance" }, "socratic");
  assert.equal(r.status, 429); assert.equal(r.body.reason, "allowance"); assert.equal(r.body.upgrade, true); assert.equal(r.body.feature, "tutor");
  assert.equal(r.body.error, "You've used your 5 free AI tutor conversations this month. They reset on 1 December. Gradify Pro has many more.");
  const p = refusal({ ...base, plan: "pro", used: 20, allowance: 20, reason: "allowance" }, "pack");
  assert.equal(p.body.upgrade, false);
  assert.equal(p.body.error, "You've used this month's 20 study packs. Your allowance resets on 1 December.");
  assert.match(refusal({ ...base, plan: "free", allowance: 1, reason: "allowance" }, "pack").body.error, /your 1 free study pack this month/);
  // the fair-use limit resets on the 1st, even for Pro learners whose allowances reset on their billing date
  const fu = refusal({ ...base, plan: "pro", reason: "fair_use", period_end: "2026-12-18T09:00:00Z" }, "explain", new Date("2026-11-20T10:00:00Z"));
  assert.equal(fu.body.resetsAt, "2026-12-01T00:00:00.000Z");
  assert.equal(fu.body.error, "You've reached this month's fair-use limit for Gradify AI. It resets on 1 December.");
  const expect = { signed_out: 401, unknown_mode: 400, ai_off: 503, budget: 503, busy: 503, rate: 429, fair_use: 429, conversation_long: 429, other: 503 };
  for (const [reason, status] of Object.entries(expect)) {
    const x = refusal({ ...base, reason }, "explain");
    assert.equal(x.status, status, reason); assert.ok(x.body.error.length > 10, reason);
    assert.doesNotMatch(x.body.error, /budget|pence|£|cost/i, "learners aren't told about Gradify's costs");
  }
});

test("a successful request settles with the real model and tokens, and returns the learner's usage", async () => {
  const f = fakes();
  const out = await runAi(f.deps, f.job());
  assert.equal(out.status, 200);
  assert.equal(out.body.answer, "Because…");
  assert.deepEqual(out.body.usage, { feature: "explain", plan: "free", used: 1, allowance: 5, resetsAt: "2026-12-01T00:00:00Z", counted: true });
  assert.deepEqual(f.log.settles, [{ id: 7, model: "claude-opus-5-5", input: 9000, output: 700, cacheRead: 0, cacheWrite: 8000, outcome: "ok", error: null }]);
  assert.deepEqual(f.log.claims[0], { mode: "explain", site: "maths", conversationId: null, estInput: 100, maxOutput: 1500 });
});

test("a refused claim never calls Claude", async () => {
  const f = fakes({ usage_id: null, reason: "allowance", plan: "free", used: 2, allowance: 2, period_end: null });
  const out = await runAi(f.deps, f.job({ mode: "questions" }));
  assert.equal(out.status, 429); assert.equal(out.body.feature, "quiz");
  assert.equal(f.log.calls, 0); assert.equal(f.log.settles.length, 0);
});

test("failures give the use back and record why; billed tokens are kept", async () => {
  const cases = [
    [{ call: async () => msg({ stop_reason: "refusal" }) }, 422, "refusal", 9000],
    [{ call: async () => msg({ stop_reason: "max_tokens" }) }, 413, "max_tokens", 9000],
    [{ call: async () => { throw Object.assign(new Error("overloaded"), { status: 529 }); } }, 503, /529/, 0],
    [{ call: async () => { throw Object.assign(new Error("rate"), { status: 429 }); } }, 503, /429/, 0],
    [{ call: async () => { throw new Error("network down"); } }, 502, /network down/, 0],
    [{ call: async () => msg({ content: [{ type: "text", text: "not json" }] }) }, 502, /SyntaxError/, 9000],
    [{ parse: () => fail(502, "The tutor didn't reply.", "empty") }, 502, "empty", 9000],
  ];
  for (const [o, status, why, input] of cases) {
    const f = fakes();
    const out = await runAi(f.deps, f.job(o));
    assert.equal(out.status, status, String(why));
    assert.equal(f.log.settles.length, 1);
    const s = f.log.settles[0];
    assert.equal(s.outcome, "failed"); assert.equal(s.input, input);
    if (why instanceof RegExp) assert.match(s.error, why); else assert.equal(s.error, why);
    assert.equal(out.body.usage.used, 0, "the use is given back");
    assert.equal(f.log.puts.length, 0, "failures are never cached");
  }
});

test("a plan-based check (notes too long for Free) fails before Claude is called", async () => {
  const f = fakes();
  const out = await runAi(f.deps, f.job({ mode: "pack", check: (c) => { if (c.plan === "free") fail(413, "Too long for Free.", "too_long"); } }));
  assert.equal(out.status, 413); assert.equal(f.log.calls, 0);
  assert.equal(f.log.settles[0].outcome, "failed"); assert.equal(f.log.settles[0].input, 0);
});

test("the response cache: a repeat is answered without Claude and gives the use back", async () => {
  const f = fakes();
  const key = await cacheKey("claude-opus-5-5", { mode: "explain", system: "notes", messages: [{ role: "user", content: "Why?" }], schema: {} });
  const first = await runAi(f.deps, f.job({ cacheKey: key }));
  assert.equal(first.status, 200); assert.equal(f.log.calls, 1); assert.equal(f.log.puts.length, 1);
  const again = await runAi(f.deps, f.job({ cacheKey: key }));
  assert.equal(again.status, 200); assert.equal(again.body.cached, true); assert.equal(again.body.answer, "Because…");
  assert.equal(f.log.calls, 1, "no second call");
  assert.equal(f.log.settles[1].outcome, "cached");
  assert.equal(again.body.usage.used, 0);
  // what may be cached, and how keys behave
  assert.equal(cacheable("explain", { question: "x" }), true);
  assert.equal(cacheable("explain", { question: "x", lab: { title: "t", state: "s" } }), false, "lab state is the learner's own");
  assert.equal(cacheable("connect", {}), true);
  for (const m of ["socratic", "mark", "roleplay", "pack", "card", "diagnose"]) assert.equal(cacheable(m, {}), false, m);
  assert.equal(normaliseQuestion("  Why  does\nthis\tdecay? "), "Why does this decay?");
  const k2 = await cacheKey("claude-opus-5-5", { mode: "explain", system: "notes v2", messages: [{ role: "user", content: "Why?" }], schema: {} });
  assert.notEqual(key, k2, "a change to the lesson notes changes the key");
});

test("conversation ids, token accounting and estimates", () => {
  const id = "11111111-1111-4111-8111-111111111111";
  assert.equal(conversationOf("socratic", id), id);
  assert.equal(conversationOf("socratic", id.toUpperCase()), id);
  assert.equal(conversationOf("mark", id), null, "single-shot modes always count");
  assert.equal(conversationOf("roleplay", "not-a-uuid"), null);
  assert.deepEqual(tokensOf(msg()), { model: "claude-opus-5-5", input: 9000, output: 700, cacheRead: 0, cacheWrite: 8000 });
  assert.ok(estimateTokens("x".repeat(3000)) >= 1000);
  for (const [mode, f] of Object.entries(FEATURE_OF)) assert.ok(["tutor", "explain", "pack", "quiz"].includes(f), mode);
});

// ---------- against the real ledger ----------
const U = "00000000-0000-4000-8000-00000000000a";
async function realLedger() {
  const d = await tempDb();
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((x) => x.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  await d.sql(`grant usage on schema public to anon, authenticated, service_role;
    grant all on all tables in schema public to anon, authenticated, service_role;
    insert into auth.users (id, email) values ('${U}', 'a@x') on conflict do nothing;
    update public.ai_settings set enabled = true, per_minute = 1000, per_hour = 1000, global_per_minute = 1000;`);
  const lit = (v) => (v === null || v === undefined ? "null" : typeof v === "number" ? String(v) : `'${String(v).replace(/'/g, "''")}'`);
  const toSql = (v) => (v !== null && typeof v === "object" ? `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb` : lit(v));
  // a stand-in for supabase-js's admin.rpc(name, args), with named arguments, as the service role
  const admin = { rpc: async (name, args) => {
    try {
      const rows = await d.sql(`set role service_role; select * from public.${name}(${Object.entries(args).map(([k, v]) => `${k} => ${toSql(v)}`).join(", ")}); `);
      await d.sql("reset role;");
      const r = rows.map((x) => (name.endsWith("_for") && name.startsWith("ai_claim") ? x : Object.values(x)[0]));
      return { data: name === "ai_claim_for" ? r : r[0], error: null };
    } catch (error) { await d.sql("reset role;"); return { data: null, error }; }
  } };
  return { d, deps: ledger(admin, U) };
}

test("against the real ledger: Free allowance used up, a failure refunded, the cost recorded", async () => {
  const { d, deps } = await realLedger();
  const job = (o = {}) => ({ mode: "pack", site: "web", estInput: 10000, maxOutput: 32000, call: async () => msg({ usage: { input_tokens: 12000, output_tokens: 18000 } }), parse: () => ({ ok: true }), ...o });
  const first = await runAi(deps, job());
  assert.equal(first.status, 200); assert.deepEqual({ ...first.body.usage, resetsAt: undefined }, { feature: "pack", plan: "free", used: 1, allowance: 1, resetsAt: undefined, counted: true });
  const second = await runAi(deps, job());
  assert.equal(second.status, 429); assert.equal(second.body.reason, "allowance"); assert.equal(second.body.upgrade, true);
  // quizzes: a failed call is refunded, so both uses remain
  const q = await runAi(deps, job({ mode: "questions", call: async () => msg({ stop_reason: "refusal", usage: { input_tokens: 5000, output_tokens: 10 } }) }));
  assert.equal(q.status, 422);
  const rows = await d.sql(`select mode, status, counted, input_tokens, output_tokens, model, cost_pence::float as cost from public.tutor_usage order by id`);
  assert.deepEqual(rows.map((r) => [r.mode, r.status, r.counted]), [["pack", "ok", true], ["questions", "failed", false]]);
  // 12k in + 18k out at Opus 5.5: (12000 × $4 + 18000 × $20) / 1M × £0.79 = 32.232p
  assert.equal(rows[0].cost, 32.232); assert.equal(rows[0].model, "claude-opus-5-5");
  assert.ok(rows[1].cost > 0, "the refused call's tokens are still costed");
  // the cache round-trips through the real functions
  const key = "k-" + Date.now();
  const e1 = await runAi(deps, job({ mode: "explain", cacheKey: key, call: async () => msg(), parse: () => ({ answer: "A" }) }));
  const e2 = await runAi(deps, job({ mode: "explain", cacheKey: key, call: async () => { throw new Error("should not be called"); }, parse: () => ({}) }));
  assert.equal(e1.status, 200); assert.equal(e2.status, 200); assert.equal(e2.body.answer, "A"); assert.equal(e2.body.cached, true);
  await d.close();
});
