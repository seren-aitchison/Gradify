// Stripe helpers used by the billing Edge Functions (supabase/functions/_shared/billing.js).
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { form, verifyStripeEvent, subscriptionRow, userOf, priceFor, planForPrice, mayBuy } from "../supabase/functions/_shared/billing.js";

const sign = (payload, secret, t) => `t=${t},v1=${createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex")}`;

test("Stripe form encoding handles nested objects and arrays", () => {
  assert.equal(form({ mode: "subscription", line_items: [{ price: "price_1", quantity: 1 }], metadata: { gradify_user_id: "u 1" } }),
    "mode=subscription&line_items%5B0%5D%5Bprice%5D=price_1&line_items%5B0%5D%5Bquantity%5D=1&metadata%5Bgradify_user_id%5D=u%201");
  assert.equal(form({ a: undefined, b: null, c: "x" }), "c=x");
});

test("a correctly signed webhook verifies; tampered, wrongly signed or replayed ones don't", async () => {
  const secret = "whsec_test", now = 1_800_000_000, body = JSON.stringify({ id: "evt_1", type: "customer.subscription.updated" });
  assert.equal((await verifyStripeEvent(body, sign(body, secret, now), secret, { now })).id, "evt_1");
  // Stripe may send several v1 signatures during secret rotation: any match is enough
  assert.ok(await verifyStripeEvent(body, `${sign(body, secret, now)},v1=${"0".repeat(64)}`, secret, { now }));
  await assert.rejects(verifyStripeEvent(body.replace("evt_1", "evt_2"), sign(body, secret, now), secret, { now }), /mismatch/);
  await assert.rejects(verifyStripeEvent(body, sign(body, "whsec_other", now), secret, { now }), /mismatch/);
  await assert.rejects(verifyStripeEvent(body, sign(body, secret, now - 3600), secret, { now }), /too old/);
  await assert.rejects(verifyStripeEvent(body, "nonsense", secret, { now }), /malformed/);
  await assert.rejects(verifyStripeEvent(body, sign(body, secret, now), "", { now }), /not set/);
});

test("subscription rows come from old and new Stripe API shapes", () => {
  const base = { id: "sub_1", customer: "cus_1", status: "active", cancel_at_period_end: false, metadata: { gradify_user_id: "user-1" } };
  // newer API versions keep the period on the subscription item
  const r = subscriptionRow({ ...base, items: { data: [{ current_period_start: 1_800_000_000, current_period_end: 1_802_592_000, price: { id: "price_m", recurring: { interval: "month" } } }] } });
  assert.deepEqual({ ...r, updated_at: undefined }, { plan: "pro", stripe_customer_id: "cus_1", stripe_subscription_id: "sub_1", status: "active", price_id: "price_m", billing_interval: "month",
    current_period_start: new Date(1_800_000_000_000).toISOString(), current_period_end: new Date(1_802_592_000_000).toISOString(), cancel_at_period_end: false, updated_at: undefined });
  // older versions keep it on the subscription
  const o = subscriptionRow({ ...base, status: "past_due", current_period_end: 1_802_592_000, plan: { id: "price_y", recurring: { interval: "year" } } });
  assert.equal(o.billing_interval, "year"); assert.equal(o.status, "past_due"); assert.ok(o.current_period_end);
  assert.equal(subscriptionRow({ ...base, status: "something_new" }).status, "none");
  assert.equal(userOf(base), "user-1");
  assert.equal(userOf({ client_reference_id: "user-2" }), "user-2");
});

test("checkout maps a plan to its configured price, and refuses anything else", () => {
  const env = { STRIPE_PRICE_PLUS_MONTH: "price_plus", STRIPE_PRICE_PRO_MONTH: "price_pro" };
  assert.equal(priceFor("plus", "month", env), "price_plus");
  assert.equal(priceFor("pro", "month", env), "price_pro");
  assert.throws(() => priceFor("plus", "week", env), /monthly/);
  assert.throws(() => priceFor("gold", "month", env), /Plus or Gradify Pro/);
  assert.throws(() => priceFor("plus", "year", env), /isn't on sale yet/, "no yearly price is configured");
  assert.throws(() => priceFor("plus", "month", {}), /Gradify Plus isn't on sale yet/);
});

test("a subscription's plan comes from its price: Plus by its price, Pro by its own or the original Pro prices", () => {
  const env = { STRIPE_PRICE_PLUS_MONTH: "price_plus", STRIPE_PRICE_PRO_MONTH: "price_pro", STRIPE_PRICE_MONTH: "price_old_m", STRIPE_PRICE_YEAR: "price_old_y" };
  const sub = (price) => ({ id: "sub_1", customer: "cus_1", status: "active", items: { data: [{ price: { id: price, recurring: { interval: "month" } } }] } });
  assert.equal(planForPrice("price_plus", env), "plus");
  assert.equal(planForPrice("price_pro", env), "pro");
  assert.equal(planForPrice("price_old_y", env), "pro");
  assert.equal(planForPrice("price_other", env), null);
  assert.equal(subscriptionRow(sub("price_plus"), env).plan, "plus");
  assert.equal(subscriptionRow(sub("price_old_m"), env).plan, "pro");
  assert.equal(subscriptionRow(sub("price_plus")).plan, "pro", "without the price ids, everything is Pro, as before");
});

test("Plus and Pro go on sale separately", () => {
  assert.equal(mayBuy("a@x.com", { GRADIFY_PLUS_ON_SALE: "on" }, "plus"), true);
  assert.equal(mayBuy("a@x.com", { GRADIFY_PLUS_ON_SALE: "on" }, "pro"), false);
  assert.equal(mayBuy("a@x.com", { GRADIFY_PRO_ON_SALE: "on" }, "plus"), false);
  assert.equal(mayBuy("t@x.com", { GRADIFY_BILLING_TESTERS: "t@x.com" }, "plus"), true);
});
