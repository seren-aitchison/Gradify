// The Gradify Pro subscription lifecycle, end to end without Stripe or a payment: signed Stripe events go through the
// webhook's real decision (handleStripeEvent in supabase/functions/_shared/billing.js) against a fake Stripe and a
// fake database, and the rows it writes are then checked against the real is_pro() in a temporary PostgreSQL.
// Covers: checkout, renewal, a failed payment, cancellation, expiry, resubscribing, signatures and idempotency.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { handleStripeEvent, shouldApply } from "../supabase/functions/_shared/billing.js";
import { tempDb } from "../scripts/pg-rehearsal.mjs";

const WHSEC = "whsec_lifecycle", USER = "00000000-0000-4000-8000-00000000000a", DAY = 86400;
const NOW = Math.floor(Date.now() / 1000);
const sign = (payload, t = Math.floor(Date.now() / 1000), secret = WHSEC) => `t=${t},v1=${createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex")}`;

function world() {
  const subs = new Map(), ledger = new Set(), rows = new Map(), saves = [];
  let failNextSave = false, seq = 0;
  const deps = {
    whsec: WHSEC,
    async getSubscription(id) { if (!subs.has(id)) throw new Error(`no such subscription ${id}`); return structuredClone(subs.get(id)); },
    async claimEvent(id) { if (ledger.has(id)) return "duplicate"; ledger.add(id); return "new"; },
    async releaseEvent(id) { ledger.delete(id); },
    async storedFor(u) { return rows.get(u) ?? null; },
    async userForCustomer(c) { for (const [u, r] of rows) if (r.stripe_customer_id === c) return u; return null; },
    async save(u, row) { if (failNextSave) { failNextSave = false; throw new Error("database unavailable"); } saves.push(row); rows.set(u, { ...rows.get(u), ...row }); },
  };
  const setSub = (id, patch) => subs.set(id, { id, object: "subscription", customer: "cus_1", metadata: { gradify_user_id: USER }, cancel_at_period_end: false, ...subs.get(id), ...patch });
  const period = (start, interval = "month") => ({ items: { data: [{ current_period_start: start, current_period_end: start + (interval === "year" ? 365 : 30) * DAY, price: { id: `price_${interval}`, recurring: { interval } } }] } });
  const send = async (type, object, { id = `evt_${++seq}`, header } = {}) => {
    const payload = JSON.stringify({ id, type, data: { object } });
    return handleStripeEvent(payload, header ?? sign(payload), deps);
  };
  return { subs, ledger, rows, saves, deps, setSub, period, send, failSave: () => { failNextSave = true; } };
}

async function proDb() {
  const d = await tempDb();
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((x) => x.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  await d.sql(`insert into auth.users (id, email) values ('${USER}', 'a@x') on conflict do nothing`);
  const lit = (v) => (v === null || v === undefined ? "null" : typeof v === "boolean" ? String(v) : `'${String(v).replace(/'/g, "''")}'`);
  return {
    async isPro(row) {
      await d.sql(`delete from public.subscriptions; insert into public.subscriptions (user_id, stripe_customer_id, stripe_subscription_id, status, price_id, billing_interval, current_period_start, current_period_end, cancel_at_period_end)
        values ('${USER}', ${[row.stripe_customer_id, row.stripe_subscription_id, row.status, row.price_id, row.billing_interval, row.current_period_start, row.current_period_end, row.cancel_at_period_end].map(lit).join(", ")})`);
      return (await d.sql(`select public.is_pro('${USER}') as pro`))[0].pro;
    },
    close: d.close,
  };
}

test("checkout, renewal, a failed payment, recovery, cancellation and expiry each set the right row and plan", async () => {
  const w = world(), pg = await proDb();
  const start = NOW - 2 * DAY;
  // 1. successful checkout: Stripe sends checkout.session.completed; the subscription is read fresh from Stripe
  w.setSub("sub_1", { status: "active", ...w.period(start) });
  assert.equal((await w.send("checkout.session.completed", { mode: "subscription", subscription: "sub_1", client_reference_id: USER, metadata: { gradify_user_id: USER } })).body, "OK");
  let row = w.rows.get(USER);
  assert.equal(row.status, "active"); assert.equal(row.billing_interval, "month"); assert.equal(row.stripe_subscription_id, "sub_1");
  assert.equal(await pg.isPro(row), true, "Pro straight after checkout");

  // 2. renewal: the period moves on a month, still active
  w.setSub("sub_1", { ...w.period(start + 30 * DAY) });
  await w.send("customer.subscription.updated", { id: "sub_1" });
  row = w.rows.get(USER);
  assert.equal(row.current_period_start, new Date((start + 30 * DAY) * 1000).toISOString());
  assert.equal(await pg.isPro(row), true);

  // 3. a failed renewal payment: Stripe marks the subscription past_due. Pro stays on for a 3-day grace period
  //    after the period ended (Stripe retries the card meanwhile), then lapses even if Stripe hasn't given up yet
  w.setSub("sub_1", { status: "past_due", ...w.period(NOW - 31 * DAY) });
  await w.send("customer.subscription.updated", { id: "sub_1" });
  row = w.rows.get(USER);
  assert.equal(row.status, "past_due");
  assert.equal(await pg.isPro(row), true, "1 day overdue: still in the grace period");
  w.setSub("sub_1", { ...w.period(NOW - 34 * DAY) });
  await w.send("customer.subscription.updated", { id: "sub_1" });
  assert.equal(await pg.isPro(w.rows.get(USER)), false, "4 days overdue: grace period over");
  // unpaid (Stripe stopped retrying) is never Pro
  assert.equal(await pg.isPro({ ...w.rows.get(USER), status: "unpaid", current_period_end: new Date((NOW + 10 * DAY) * 1000).toISOString() }), false);

  // 4. the card is fixed and the retry succeeds: active again with a fresh period
  w.setSub("sub_1", { status: "active", ...w.period(NOW - DAY) });
  await w.send("customer.subscription.updated", { id: "sub_1" });
  assert.equal(await pg.isPro(w.rows.get(USER)), true);

  // 5. the learner cancels in the portal: it runs to the end of the period they paid for
  w.setSub("sub_1", { cancel_at_period_end: true });
  await w.send("customer.subscription.updated", { id: "sub_1" });
  row = w.rows.get(USER);
  assert.equal(row.cancel_at_period_end, true); assert.equal(row.status, "active");
  assert.equal(await pg.isPro(row), true, "cancelled but paid up: still Pro until the period ends");

  // 6. expiry: at the period end Stripe deletes the subscription
  w.setSub("sub_1", { status: "canceled" });
  await w.send("customer.subscription.deleted", { id: "sub_1" });
  row = w.rows.get(USER);
  assert.equal(row.status, "canceled");
  assert.equal(await pg.isPro(row), false, "expired: back to Free");
  // a stale 'active' row whose period ended long ago is not Pro either (belt and braces if a webhook is missed)
  assert.equal(await pg.isPro({ ...row, status: "active", current_period_end: new Date((NOW - 10 * DAY) * 1000).toISOString() }), false);
  await pg.close();
});

test("resubscribing after expiry: a late event about the old subscription never overwrites the new one", async () => {
  const w = world();
  w.setSub("sub_old", { status: "canceled", ...w.period(NOW - 60 * DAY) });
  w.setSub("sub_new", { status: "active", ...w.period(NOW - DAY, "year") });
  await w.send("checkout.session.completed", { mode: "subscription", subscription: "sub_new", client_reference_id: USER });
  assert.equal((await w.send("customer.subscription.deleted", { id: "sub_old" })).body, "Older subscription; kept the current one.");
  assert.equal(w.rows.get(USER).stripe_subscription_id, "sub_new");
  assert.equal(w.rows.get(USER).billing_interval, "year");
  // but a live subscription always replaces a finished one
  assert.equal(shouldApply({ stripe_subscription_id: "sub_a", status: "canceled" }, { stripe_subscription_id: "sub_b", status: "active" }), true);
  assert.equal(shouldApply({ stripe_subscription_id: "sub_a", status: "active" }, { stripe_subscription_id: "sub_b", status: "incomplete_expired" }), false);
});

test("events out of order still end in Stripe's current state, because each one re-reads the subscription", async () => {
  const w = world();
  w.setSub("sub_1", { status: "canceled", ...w.period(NOW - 40 * DAY) });
  // 'deleted' arrives first, then a delayed 'created'
  await w.send("customer.subscription.deleted", { id: "sub_1" });
  await w.send("customer.subscription.created", { id: "sub_1", status: "active" });
  assert.equal(w.rows.get(USER).status, "canceled");
});

test("forged, tampered, wrongly signed and replayed events are rejected and write nothing", async () => {
  const w = world();
  w.setSub("sub_1", { status: "active", ...w.period(NOW) });
  const payload = JSON.stringify({ id: "evt_x", type: "customer.subscription.updated", data: { object: { id: "sub_1" } } });
  for (const header of ["", "t=1,v1=00", sign(payload, undefined, "whsec_wrong"), sign(payload, NOW - 3600), sign(payload.replace("sub_1", "sub_2"))]) {
    const r = await handleStripeEvent(payload, header, w.deps);
    assert.equal(r.status, 400, header);
  }
  // tampering after signing
  const r = await handleStripeEvent(payload.replace("updated", "deleted"), sign(payload), w.deps);
  assert.equal(r.status, 400);
  assert.equal(w.saves.length, 0); assert.equal(w.ledger.size, 0);
});

test("each event is applied once; a failed write is released so Stripe's retry succeeds", async () => {
  const w = world();
  w.setSub("sub_1", { status: "active", ...w.period(NOW) });
  const obj = { mode: "subscription", subscription: "sub_1", client_reference_id: USER };
  assert.equal((await w.send("checkout.session.completed", obj, { id: "evt_dup" })).body, "OK");
  assert.equal((await w.send("checkout.session.completed", obj, { id: "evt_dup" })).body, "Already processed.");
  assert.equal(w.saves.length, 1);
  // the database fails: 500, the id is forgotten, and the redelivery is applied
  w.setSub("sub_1", { cancel_at_period_end: true });
  w.failSave();
  const first = await w.send("customer.subscription.updated", { id: "sub_1" }, { id: "evt_retry" });
  assert.equal(first.status, 500); assert.equal(w.ledger.has("evt_retry"), false);
  assert.equal((await w.send("customer.subscription.updated", { id: "sub_1" }, { id: "evt_retry" })).body, "OK");
  assert.equal(w.rows.get(USER).cancel_at_period_end, true);
  // Stripe unreachable while re-reading: also 500 and released
  const gone = await w.send("customer.subscription.updated", { id: "sub_missing" }, { id: "evt_gone" });
  assert.equal(gone.status, 500); assert.equal(w.ledger.has("evt_gone"), false);
});

test("unrelated events are acknowledged without being recorded; a customer with no learner is retried, not guessed", async () => {
  const w = world();
  assert.equal((await w.send("invoice.paid", { id: "in_1" })).body, "Ignored.");
  assert.equal((await w.send("checkout.session.completed", { mode: "payment" })).body, "Ignored.");
  assert.equal(w.ledger.size, 0);
  w.subs.set("sub_orphan", { id: "sub_orphan", customer: "cus_unknown", status: "active", metadata: {}, ...w.period(NOW) });
  const r = await w.send("customer.subscription.updated", { id: "sub_orphan" });
  assert.equal(r.status, 500); assert.match(r.reason, /no Gradify user/);
  // the checkout function links the customer first, so the fallback finds the learner
  w.rows.set(USER, { stripe_customer_id: "cus_unknown", status: "none" });
  assert.equal((await w.send("customer.subscription.updated", { id: "sub_orphan" })).body, "OK");
  assert.equal(w.rows.get(USER).status, "active");
});
