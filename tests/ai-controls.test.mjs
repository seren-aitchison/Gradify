// Gradify AI's server-side controls (supabase/migrations/20261111120000_ai_controls.sql), run for real in a temporary
// PostgreSQL: who may claim and settle uses, testers while AI is off, allowances and their resets, failed and stale
// requests, subscription changes, conversations, rate limits, fair-use and spending caps, pricing, the response cache
// and the owner's overview. The Edge Functions call ai_claim_for / ai_settle_for as the service role; learners can't.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { tempDb } from "../scripts/pg-rehearsal.mjs";

const A = "00000000-0000-4000-8000-00000000000a", B = "00000000-0000-4000-8000-00000000000b";
const OPEN = "update public.ai_settings set enabled = true, per_minute = 1000, per_hour = 1000, global_per_minute = 1000";

async function db() {
  const d = await tempDb();
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((x) => x.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  await d.sql(`grant usage on schema public to anon, authenticated, service_role;
    grant all on all tables in schema public to anon, authenticated, service_role;
    grant all on all sequences in schema public to anon, authenticated, service_role;
    insert into auth.users (id, email) values ('${A}', 'a@x'), ('${B}', 'b@x') on conflict do nothing;`);
  const as = (uid, q) => d.sql(`set role authenticated; set request.jwt.claim.sub = '${uid}'; ${q}; `).finally(() => d.sql("reset role; reset request.jwt.claim.sub;"));
  const svc = (q) => d.sql(`set role service_role; ${q}; `).finally(() => d.sql("reset role;"));
  const owner = (q) => d.sql(q);
  const claim = async (uid, mode = "socratic", { conv = null, input = 1000, output = 1000, site = "web" } = {}) =>
    (await svc(`select * from public.ai_claim_for('${uid}', '${mode}', '${site}', ${conv ? `'${conv}'` : "null"}, ${input}, ${output})`))[0];
  const settle = async (uid, id, { model = "claude-opus-5-5", input = 1000, output = 500, cr = 0, cw = 0, outcome = "ok" } = {}) =>
    Number((await svc(`select public.ai_settle_for(${id}, '${uid}', '${model}', ${input}, ${output}, ${cr}, ${cw}, '${outcome}') as c`))[0].c);
  const allowance = async (uid, f) => (await as(uid, "select * from public.my_ai_allowance()")).find((r) => r.feature === f);
  const pro = (uid, start = "now() - interval '5 days'", end = "now() + interval '25 days'", status = "active") =>
    owner(`insert into public.subscriptions (user_id, stripe_customer_id, stripe_subscription_id, status, billing_interval, current_period_start, current_period_end)
      values ('${uid}', 'cus_${uid.slice(-1)}', 'sub_${uid.slice(-1)}', '${status}', 'month', ${start}, ${end})
      on conflict (user_id) do update set status = excluded.status, current_period_start = excluded.current_period_start, current_period_end = excluded.current_period_end`);
  return { as, svc, owner, claim, settle, allowance, pro, close: d.close };
}

test("learners can't claim, settle, read the cache or see the owner's overview; only the server can", async () => {
  const x = await db();
  await x.owner(OPEN);
  for (const q of [
    "select * from public.ai_claim('socratic', 'x')",
    "select public.ai_settle(1, 0, 0, true)",
    `select * from public.ai_claim_for('${A}', 'socratic', 'x', null, 0, 0)`,
    `select public.ai_settle_for(1, '${A}', 'm', 0, 0, 0, 0, 'failed')`,
    "select public.ai_cache_get('k')",
    "select public.ai_cache_put('k', 'explain', '{}'::jsonb, 'm')",
    `select public.ai_cost_pence('claude-opus-5-5', 1, 1, 0, 0)`,
    "select public.ai_admin_overview()",
  ]) await assert.rejects(x.as(A, q), q);
  assert.equal((await x.as(A, "select public.ai_is_admin() as a"))[0].a, false);
  // the race that motivated this: a learner marking their own in-flight request failed to get the use back
  const r = await x.claim(A, "pack");
  await assert.rejects(x.as(A, `select public.ai_settle(${r.usage_id}, 0, 0, true)`));
  assert.equal((await x.as(A, `update public.tutor_usage set status = 'failed' where id = ${r.usage_id} returning id`)).length, 0, "no update policy either");
  assert.equal((await x.allowance(A, "pack")).used, 1);
  // learners still can't read the settings, prices, testers list, admins list or cache
  for (const t of ["ai_settings", "ai_prices", "ai_cache"]) assert.equal((await x.as(A, `select * from public.${t}`)).length, 0, t);
  await x.close();
});

test("Gradify AI is off for ordinary learners and on for testers until the owner switches it on", async () => {
  const x = await db();
  await x.owner("update public.ai_settings set per_minute = 1000, per_hour = 1000");
  assert.equal((await x.claim(A)).reason, "ai_off");
  assert.equal((await x.allowance(A, "tutor")).enabled, false);
  await x.owner(`insert into public.ai_testers (user_id) values ('${A}')`);
  assert.ok((await x.claim(A)).usage_id, "tester can use it");
  assert.equal((await x.allowance(A, "tutor")).enabled, true);
  assert.equal((await x.claim(B)).reason, "ai_off", "everyone else still can't");
  assert.equal((await x.allowance(B, "tutor")).enabled, false);
  // a learner sees whether they're a tester, and nobody else's row
  assert.equal((await x.as(A, "select * from public.ai_testers")).length, 1);
  assert.equal((await x.as(B, "select * from public.ai_testers")).length, 0);
  await x.close();
});

test("an exhausted allowance is refused with what the learner needs to know; usage is shared by web and app", async () => {
  const x = await db();
  await x.owner(OPEN);
  for (let i = 0; i < 5; i++) { const r = await x.claim(A, "socratic", { site: i % 2 ? "ios" : "web" }); await x.settle(A, r.usage_id); }
  const r = await x.claim(A, "socratic", { site: "ios" });
  assert.equal(r.reason, "allowance"); assert.equal(r.plan, "free"); assert.equal(r.used, 5); assert.equal(r.allowance, 5);
  assert.ok(new Date(r.period_end) > new Date());
  const a = await x.allowance(A, "tutor");
  assert.equal(a.used, 5); assert.equal(a.allowance, 5);
  // other features are separate
  assert.ok((await x.claim(A, "explain")).usage_id);
  await x.close();
});

test("failed requests give the use back but their cost still counts; stale reservations stop counting", async () => {
  const x = await db();
  await x.owner(OPEN);
  const r = await x.claim(A, "pack");
  const cost = await x.settle(A, r.usage_id, { input: 10000, output: 20000, outcome: "failed" });
  assert.ok(cost > 0, "a failed call that used tokens has a cost");
  assert.equal((await x.allowance(A, "pack")).used, 0, "the use is given back");
  const [{ s }] = await x.owner("select public.ai_month_spend_pence() as s");
  assert.equal(Number(s), cost, "the spend includes the failed call");
  // settling twice does nothing
  assert.equal(await x.settle(A, r.usage_id, { outcome: "ok" }), Number((await x.owner(`select public.ai_cost_pence('claude-opus-5-5', 1000, 500, 0, 0) as c`))[0].c));
  assert.equal((await x.owner(`select status from public.tutor_usage where id = ${r.usage_id}`))[0].status, "failed");
  // a reservation in flight counts; one older than stale_minutes (the function died) doesn't
  const r2 = await x.claim(A, "pack");
  assert.equal((await x.allowance(A, "pack")).used, 1);
  assert.equal((await x.claim(A, "pack")).reason, "allowance");
  await x.owner(`update public.tutor_usage set created_at = now() - interval '11 minutes' where id = ${r2.usage_id}`);
  assert.equal((await x.allowance(A, "pack")).used, 0);
  assert.ok((await x.claim(A, "pack")).usage_id);
  await x.close();
});

test("allowances reset: Free at the start of each calendar month, Pro when its billing period renews", async () => {
  const x = await db();
  await x.owner(OPEN);
  // last month's uses don't count for Free
  await x.owner(`insert into public.tutor_usage (user_id, mode, status, created_at) select '${A}', 'socratic', 'ok', date_trunc('month', now()) - interval '1 day' from generate_series(1, 5)`);
  assert.equal((await x.allowance(A, "tutor")).used, 0);
  assert.ok((await x.claim(A)).usage_id);
  // Pro: uses before the current period started don't count; uses inside it do
  await x.pro(B, "now() - interval '2 days'", "now() + interval '28 days'");
  await x.owner(`insert into public.tutor_usage (user_id, mode, status, created_at) select '${B}', 'pack', 'ok', now() - interval '3 days' from generate_series(1, 20);
    insert into public.tutor_usage (user_id, mode, status, created_at) select '${B}', 'pack', 'ok', now() - interval '1 day' from generate_series(1, 3)`);
  assert.equal((await x.allowance(B, "pack")).used, 3);
  assert.equal((await x.allowance(B, "pack")).allowance, 20);
  // the period renews (Stripe moves it on): back to zero
  await x.owner("update public.subscriptions set current_period_start = now() - interval '1 minute', current_period_end = now() + interval '30 days'");
  assert.equal((await x.allowance(B, "pack")).used, 0);
  await x.close();
});

test("subscription changes: upgrading gives the Pro allowance at once, downgrading falls back to Free's", async () => {
  const x = await db();
  await x.owner(OPEN);
  for (let i = 0; i < 5; i++) await x.settle(A, (await x.claim(A)).usage_id);
  assert.equal((await x.claim(A)).reason, "allowance");
  // upgrade: the Pro period starts now, so earlier Free uses don't count against it
  await x.owner(`update public.tutor_usage set created_at = now() - interval '1 minute'`);
  await x.pro(A, "now() - interval '1 second'", "now() + interval '30 days'");
  let a = await x.allowance(A, "tutor");
  assert.equal(a.plan, "pro"); assert.equal(a.allowance, 150); assert.equal(a.used, 0);
  for (let i = 0; i < 10; i++) await x.settle(A, (await x.claim(A)).usage_id);
  // a payment fails: still Pro during the grace period
  await x.owner("update public.subscriptions set status = 'past_due'");
  assert.equal((await x.allowance(A, "tutor")).plan, "pro");
  // cancelled and expired: Free again, and this calendar month's 15 uses exceed Free's 5
  await x.owner("update public.subscriptions set status = 'canceled', current_period_end = now() - interval '1 day'");
  a = await x.allowance(A, "tutor");
  assert.equal(a.plan, "free"); assert.equal(a.allowance, 5); assert.equal(a.used, 15);
  assert.equal((await x.claim(A)).reason, "allowance");
  await x.close();
});

test("a tutor conversation uses one allowance however many turns it has, up to the plan's turn limit", async () => {
  const x = await db();
  await x.owner(OPEN);
  const c1 = "11111111-1111-4111-8111-111111111111", c2 = "22222222-2222-4222-8222-222222222222";
  const first = await x.claim(A, "socratic", { conv: c1 });
  assert.equal(first.counted, true);
  await x.settle(A, first.usage_id);
  for (let t = 2; t <= 12; t++) {
    const r = await x.claim(A, "socratic", { conv: c1 });
    assert.ok(r.usage_id, `turn ${t}`); assert.equal(r.counted, false, `turn ${t} is free`);
    await x.settle(A, r.usage_id);
  }
  assert.equal((await x.allowance(A, "tutor")).used, 1);
  assert.equal((await x.claim(A, "socratic", { conv: c1 })).reason, "conversation_long", "Free conversations end at 12 turns");
  // the same id in another mode is a new conversation
  assert.equal((await x.claim(A, "examiner", { conv: c1 })).counted, true);
  // a conversation whose first turn failed hasn't used anything, so its next turn is the counted one
  const f = await x.claim(A, "socratic", { conv: c2 }); await x.settle(A, f.usage_id, { outcome: "failed" });
  assert.equal((await x.claim(A, "socratic", { conv: c2 })).counted, true);
  // after a day, the same conversation counts again
  await x.owner(`update public.tutor_usage set created_at = now() - interval '25 hours' where conversation_id = '${c1}'`);
  assert.equal((await x.claim(A, "socratic", { conv: c1 })).counted, true);
  await x.close();
});

test("rate limits per learner and across everyone", async () => {
  const x = await db();
  await x.owner("update public.ai_settings set enabled = true, per_minute = 2, per_hour = 3, global_per_minute = 1000");
  assert.ok((await x.claim(A, "explain")).usage_id);
  assert.ok((await x.claim(A, "explain")).usage_id);
  assert.equal((await x.claim(A, "explain")).reason, "rate", "third in a minute");
  assert.ok((await x.claim(B, "explain")).usage_id, "another learner isn't affected");
  await x.owner(`update public.tutor_usage set created_at = now() - interval '2 minutes' where user_id = '${A}'`);
  assert.ok((await x.claim(A, "explain")).usage_id, "a minute later");
  assert.equal((await x.claim(A, "explain")).reason, "rate", "fourth in an hour");
  await x.owner("update public.ai_settings set per_minute = 1000, per_hour = 1000, global_per_minute = 2");
  await x.owner("update public.tutor_usage set created_at = now()");
  assert.equal((await x.claim(B, "explain")).reason, "busy");
  await x.close();
});

test("spending caps: each learner's monthly fair-use cap, the daily budget and the monthly budget", async () => {
  const x = await db();
  await x.owner(`${OPEN}; update public.ai_plan_caps set monthly_pence = 10 where plan = 'free'`);
  const r = await x.claim(A, "pack");
  await x.settle(A, r.usage_id, { input: 50000, output: 20000 });   // about 47p at Opus prices
  assert.equal((await x.claim(A, "explain")).reason, "fair_use");
  assert.ok((await x.claim(B, "explain")).usage_id, "only that learner is paused");
  // in-flight reservations count at their worst case, so a burst can't overshoot the budget
  // today so far: A's 47.4p. A 60p reservation fits under 110p; a second doesn't
  await x.owner("update public.ai_plan_caps set monthly_pence = 100000; update public.ai_settings set daily_budget_pence = 110");
  const big = await x.claim(B, "pack", { input: 30000, output: 32000 });
  assert.ok(big.usage_id, "about 60p reserved");
  assert.equal((await x.claim(B, "questions", { input: 30000, output: 32000 })).reason, "budget");
  await x.owner("update public.ai_settings set daily_budget_pence = 100000, monthly_budget_pence = 1");
  assert.equal((await x.claim(B, "explain")).reason, "budget");
  await x.close();
});

test("costs are worked out from each model's prices, including cached input; unknown models are priced high", async () => {
  const x = await db();
  const cost = async (m, i, o, cr = 0, cw = 0) => Number((await x.owner(`select public.ai_cost_pence('${m}', ${i}, ${o}, ${cr}, ${cw}) as c`))[0].c);
  // Opus 5.5: $4 in, $20 out, $0.20 cache read, $5 cache write per million tokens; £0.79 per $
  assert.equal(await cost("claude-opus-5-5", 1_000_000, 0), 316);
  assert.equal(await cost("claude-opus-5-5", 0, 1_000_000), 1580);
  assert.equal(await cost("claude-opus-5-5", 0, 0, 1_000_000, 0), 15.8);
  assert.equal(await cost("claude-opus-5-5", 0, 0, 0, 1_000_000), 395);
  assert.equal(await cost("claude-opus-5-5", 10000, 2000), 6.32);
  assert.equal(await cost("some-new-model", 1_000_000, 0), 632, "the 'default' row");
  await x.close();
});

test("the response cache: a hit costs nothing and gives the use back; entries expire", async () => {
  const x = await db();
  await x.owner(OPEN);
  assert.equal((await x.svc("select public.ai_cache_get('k1') as r"))[0].r, null);
  await x.svc(`select public.ai_cache_put('k1', 'explain', '{"answer":"x","fromLesson":true}'::jsonb, 'claude-opus-5-5')`);
  assert.deepEqual((await x.svc("select public.ai_cache_get('k1') as r"))[0].r, { answer: "x", fromLesson: true });
  const r = await x.claim(A, "explain");
  assert.equal(await x.settle(A, r.usage_id, { outcome: "cached", input: 0, output: 0 }), 0);
  assert.equal((await x.allowance(A, "explain")).used, 0);
  assert.equal(Number((await x.owner("select hits from public.ai_cache where key = 'k1'"))[0].hits), 1);
  await x.owner("update public.ai_cache set created_at = now() - interval '31 days'");
  assert.equal((await x.svc("select public.ai_cache_get('k1') as r"))[0].r, null, "older than cache_days");
  await x.close();
});

test("the owner's overview: only for admins, with spend, features, days and learners by id prefix only", async () => {
  const x = await db();
  await x.owner(OPEN);
  await x.settle(A, (await x.claim(A, "pack")).usage_id, { input: 20000, output: 10000 });
  await x.settle(B, (await x.claim(B, "explain")).usage_id, { outcome: "failed", input: 1000, output: 0 });
  await assert.rejects(x.as(A, "select public.ai_admin_overview()"));
  await x.owner(`insert into public.ai_admins (user_id) values ('${A}')`);
  assert.equal((await x.as(A, "select public.ai_is_admin() as a"))[0].a, true);
  const o = (await x.as(A, "select public.ai_admin_overview() as o"))[0].o;
  assert.equal(o.settings.enabled, true);
  assert.equal(o.month.requests, 2); assert.equal(o.month.learners, 2);
  assert.ok(o.month.spend_pence > 0);
  const pack = o.by_feature.find((f) => f.feature === "pack");
  assert.equal(pack.requests, 1); assert.equal(pack.counted, 1); assert.equal(pack.input_tokens, 20000);
  assert.equal(o.by_feature.find((f) => f.feature === "explain").failed, 1);
  assert.equal(o.top_learners[0].learner, A.slice(0, 8));
  assert.ok(!JSON.stringify(o).includes("a@x"), "no emails");
  assert.equal(o.by_day.length, 1);
  await assert.rejects(x.as(B, "select public.ai_admin_overview()"), "B is not an admin");
  await x.close();
});

test("the owner-only overview can't be called by learners or the service role", async () => {
  const x = await db();
  await assert.rejects(x.as(A, "select public.ai_usage_overview()"));
  await assert.rejects(x.svc("select public.ai_usage_overview()"));
  const [{ o }] = await x.owner("select public.ai_usage_overview() as o");
  assert.equal(o.settings.enabled, false); assert.equal(o.month.requests, 0);
  await x.close();
});
