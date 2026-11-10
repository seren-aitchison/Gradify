// Gradify Pro and Gradify AI allowances (supabase/migrations/20261110120000_billing_and_ai_allowances.sql), run for
// real: every migration applied in order to a temporary PostgreSQL (PGlite), then exercised as signed-in learners
// with row-level security on, as Supabase grants it (anon and authenticated get table privileges; RLS decides rows).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { tempDb } from "../scripts/pg-rehearsal.mjs";

const A = "00000000-0000-4000-8000-00000000000a", B = "00000000-0000-4000-8000-00000000000b";
async function db() {
  const d = await tempDb();
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((x) => x.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  // Supabase's default grants: table privileges for the API roles, with row-level security deciding which rows
  await d.sql(`grant usage on schema public to anon, authenticated, service_role;
    grant all on all tables in schema public to anon, authenticated, service_role;
    grant all on all sequences in schema public to anon, authenticated, service_role;
    insert into auth.users (id, email) values ('${A}', 'a@x'), ('${B}', 'b@x') on conflict do nothing;`);
  const as = async (uid, q) => d.sql(`set role authenticated; set request.jwt.claim.sub = '${uid}'; ${q}; `).finally(() => d.sql("reset role; reset request.jwt.claim.sub;"));
  const owner = (q) => d.sql(q);
  return { as, owner, close: d.close };
}
const claim = async (x, uid, mode = "socratic") => (await x.as(uid, `select * from public.ai_claim('${mode}', 'test')`))[0];

test("Gradify AI is off until the owner switches it on", async () => {
  const x = await db();
  assert.equal((await claim(x, A)).reason, "ai_off");
  await x.owner("update public.ai_settings set enabled = true");
  assert.ok((await claim(x, A)).usage_id);
  await x.close();
});

test("free learners get the free monthly allowance per feature, and a failed request doesn't count", async () => {
  const x = await db();
  await x.owner("update public.ai_settings set enabled = true");
  const ids = [];
  for (let i = 0; i < 5; i++) { const r = await claim(x, A, "socratic"); assert.ok(r.usage_id, `tutor ${i + 1}`); ids.push(r.usage_id); }
  const sixth = await claim(x, A, "socratic");
  assert.equal(sixth.reason, "allowance"); assert.equal(sixth.plan, "free"); assert.equal(sixth.allowance, 5);
  // a failed call gives the use back
  await x.as(A, `select public.ai_settle(${ids[0]}, null, null, true)`);
  assert.ok((await claim(x, A, "socratic")).usage_id);
  // other features have their own allowances: 1 pack, 2 quizzes
  assert.ok((await claim(x, A, "pack")).usage_id);
  assert.equal((await claim(x, A, "pack")).reason, "allowance");
  assert.ok((await claim(x, A, "questions")).usage_id); assert.ok((await claim(x, A, "questions")).usage_id);
  assert.equal((await claim(x, A, "questions")).reason, "allowance");
  // learner B's allowance is separate
  assert.ok((await claim(x, B, "socratic")).usage_id);
  await x.close();
});

test("Pro learners get the Pro allowance for their billing period", async () => {
  const x = await db();
  await x.owner(`update public.ai_settings set enabled = true;
    insert into public.subscriptions (user_id, stripe_customer_id, stripe_subscription_id, status, billing_interval, current_period_start, current_period_end)
    values ('${A}', 'cus_a', 'sub_a', 'active', 'month', now() - interval '1 day', now() + interval '29 days')`);
  for (let i = 0; i < 20; i++) assert.ok((await claim(x, A, "pack")).usage_id, `pack ${i + 1}`);
  const r = await claim(x, A, "pack");
  assert.equal(r.reason, "allowance"); assert.equal(r.plan, "pro"); assert.equal(r.allowance, 20);
  const mine = await x.as(A, "select * from public.my_ai_allowance()");
  assert.deepEqual(mine.map((m) => [m.feature, m.allowance]).sort(), [["explain", 100], ["pack", 20], ["quiz", 30], ["tutor", 150]]);
  // a cancelled subscription whose period has ended falls back to free
  await x.owner(`update public.subscriptions set status = 'canceled', current_period_end = now() - interval '10 days'`);
  assert.equal((await x.as(A, "select * from public.my_ai_allowance()")).find((m) => m.feature === "tutor").allowance, 5);
  await x.close();
});

test("the monthly budget stops Gradify AI for everyone once it's spent", async () => {
  const x = await db();
  await x.owner("update public.ai_settings set enabled = true, monthly_budget_pence = 100");
  const r = await claim(x, A);
  // a request costing over £1 at the stored prices
  await x.as(A, `select public.ai_settle(${r.usage_id}, 200000, 100000)`);
  assert.equal((await claim(x, B)).reason, "budget");
  await x.close();
});

test("learners can't grant themselves Pro, change the switch, read others' plans or edit their usage", async () => {
  const x = await db();
  await assert.rejects(x.as(A, `insert into public.subscriptions (user_id, status) values ('${A}', 'active')`));
  await x.owner(`insert into public.subscriptions (user_id, status, current_period_end) values ('${B}', 'active', now() + interval '30 days')`);
  assert.equal((await x.as(A, "select * from public.subscriptions")).length, 0, "A can't see B's subscription");
  assert.equal((await x.as(B, "select * from public.subscriptions")).length, 1, "B sees their own");
  assert.equal((await x.as(A, "update public.ai_settings set enabled = true returning id")).length, 0, "switch unchanged");
  assert.equal((await x.as(A, "select * from public.ai_settings")).length, 0, "settings unreadable");
  await assert.rejects(x.as(A, `select public.is_pro('${B}')`), "is_pro is not callable by learners");
  await assert.rejects(x.as(A, "insert into public.tutor_usage (user_id, mode) values (auth.uid(), 'socratic')"), "no direct usage inserts");
  await x.close();
});

test("allowances are monthly on yearly Pro too: a yearly subscriber's window is the current month of their year", async () => {
  const x = await db();
  await x.owner(`update public.ai_settings set enabled = true;
    insert into public.subscriptions (user_id, stripe_customer_id, stripe_subscription_id, status, billing_interval, current_period_start, current_period_end)
    values ('${A}', 'cus_a', 'sub_a', 'active', 'year', now() - interval '100 days', now() + interval '265 days')`);
  const [p] = await x.owner(`select * from public.ai_period('${A}')`);
  assert.equal(p.plan, "pro");
  const days = (new Date(p.period_end) - new Date(p.period_start)) / 86400_000;
  assert.ok(days >= 28 && days <= 31, `window is a month, not a year (${days} days)`);
  assert.ok(new Date(p.period_start) <= new Date() && new Date(p.period_end) > new Date(), "the window contains now");
  // usage from earlier months of the year doesn't count against this month (the owner may seed usage; learners can't)
  await x.owner(`insert into public.tutor_usage (user_id, mode, status, created_at) select '${A}', 'pack', 'ok', now() - interval '60 days' from generate_series(1, 20)`);
  assert.ok((await claim(x, A, "pack")).usage_id, "last month's 20 packs don't use up this month's");
  await x.close();
});

test("monthly Pro keeps its billing period as the window; a past_due grace period doesn't reset it early", async () => {
  const x = await db();
  await x.owner(`insert into public.subscriptions (user_id, stripe_customer_id, stripe_subscription_id, status, billing_interval, current_period_start, current_period_end)
    values ('${A}', 'cus_a', 'sub_a', 'active', 'month', date_trunc('second', now()) - interval '10 days', date_trunc('second', now()) + interval '20 days')`);
  let [p] = await x.owner(`select p.*, s.current_period_start as ps, s.current_period_end as pe from public.ai_period('${A}') p, public.subscriptions s`);
  assert.equal(+new Date(p.period_start), +new Date(p.ps)); assert.equal(+new Date(p.period_end), +new Date(p.pe));
  await x.owner(`update public.subscriptions set status = 'past_due', current_period_start = now() - interval '31 days', current_period_end = now() - interval '1 day'`);
  [p] = await x.owner(`select p.*, s.current_period_start as ps from public.ai_period('${A}') p, public.subscriptions s`);
  assert.equal(p.plan, "pro"); assert.equal(+new Date(p.period_start), +new Date(p.ps), "grace period: same window as the period that just ended");
  await x.close();
});
