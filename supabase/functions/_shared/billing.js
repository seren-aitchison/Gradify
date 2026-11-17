// Gradify Pro billing helpers shared by the billing-checkout, billing-portal and billing-webhook Edge Functions.
// Plain JavaScript with Web Crypto only, so the same code runs in Deno (Supabase) and in Node (tests/billing-stripe.test.mjs).
// Talks to Stripe's REST API directly; no SDK.

export const STRIPE_API = "https://api.stripe.com/v1";

/** Stripe's form encoding, including nested objects and arrays: { a: { b: 1 }, c: [x] } → a[b]=1&c[0]=x */
export function form(obj, prefix = "") {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (Array.isArray(v)) v.forEach((x, i) => (typeof x === "object" ? out.push(form(x, `${key}[${i}]`)) : out.push(`${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(String(x))}`)));
    else if (typeof v === "object") out.push(form(v, key));
    else out.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
  }
  return out.filter(Boolean).join("&");
}

/** One Stripe API call. Throws with Stripe's own message on an error. */
export async function stripe(secret, method, path, params, fetchImpl = fetch) {
  const res = await fetchImpl(`${STRIPE_API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/x-www-form-urlencoded", "Stripe-Version": "2025-08-27.basil" },
    body: params && method !== "GET" ? form(params) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data?.error?.message || `Stripe ${res.status}`), { status: res.status });
  return data;
}

const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
/** constant-time comparison of two hex strings */
function same(a, b) {
  if (a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

/**
 * Verify a Stripe webhook's Stripe-Signature header against the raw body.
 * Returns the parsed event, or throws. Rejects signatures older than `tolerance` seconds (replays).
 */
export async function verifyStripeEvent(payload, header, secret, { tolerance = 300, now = Date.now() / 1000 } = {}) {
  if (!secret) throw new Error("webhook secret not set");
  const parts = Object.fromEntries((header || "").split(",").map((p) => p.split("=")).filter((p) => p.length === 2).map(([k, v]) => [k.trim(), v.trim()]));
  const sigs = (header || "").split(",").map((p) => p.trim()).filter((p) => p.startsWith("v1=")).map((p) => p.slice(3));
  const t = Number(parts.t);
  if (!t || !sigs.length) throw new Error("malformed signature header");
  if (Math.abs(now - t) > tolerance) throw new Error("signature too old");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const expected = hex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${payload}`)));
  if (!sigs.some((s) => same(s, expected))) throw new Error("signature mismatch");
  return JSON.parse(payload);
}

const iso = (s) => (s ? new Date(s * 1000).toISOString() : null);
const STATUSES = new Set(["incomplete", "incomplete_expired", "trialing", "active", "past_due", "canceled", "unpaid", "paused"]);

/** Which plan a Stripe price is: the Plus price, or Pro (Pro's prices, and the original Gradify Pro prices). Prices
 *  are Edge Function secrets: STRIPE_PRICE_PLUS_MONTH, STRIPE_PRICE_PRO_MONTH (and the older STRIPE_PRICE_MONTH and
 *  STRIPE_PRICE_YEAR, which were Pro). An unknown price is null, and the subscription doesn't count as either. */
export function planForPrice(priceId, env = {}) {   // → "plus" | "pro" | null (not a price Gradify knows)
  if (!priceId) return null;
  const ids = (...keys) => keys.map((k) => env[k]).filter(Boolean);
  if (ids("STRIPE_PRICE_PLUS_MONTH", "STRIPE_PRICE_PLUS_YEAR").includes(priceId)) return "plus";
  if (ids("STRIPE_PRICE_PRO_MONTH", "STRIPE_PRICE_PRO_YEAR", "STRIPE_PRICE_MONTH", "STRIPE_PRICE_YEAR").includes(priceId)) return "pro";
  return null;
}

/** The subscriptions row for a Stripe subscription object (periods are on the item in newer API versions). */
export function subscriptionRow(sub, env = {}) {
  const item = sub.items?.data?.[0] || {};
  const price = item.price || sub.plan || {};
  // Plus by its price; anything else is Pro, as every subscription was before there were two plans (only Gradify's
  // own checkout creates subscriptions, so a learner can't bring their own price)
  const plan = planForPrice(price.id, env) ?? "pro";
  return {
    plan,
    stripe_customer_id: typeof sub.customer === "string" ? sub.customer : sub.customer?.id ?? null,
    stripe_subscription_id: sub.id,
    status: STATUSES.has(sub.status) ? sub.status : "none",
    price_id: price.id ?? null,
    billing_interval: price.recurring?.interval === "year" ? "year" : price.recurring?.interval === "month" ? "month" : null,
    current_period_start: iso(sub.current_period_start ?? item.current_period_start),
    current_period_end: iso(sub.current_period_end ?? item.current_period_end),
    cancel_at_period_end: !!sub.cancel_at_period_end,
    updated_at: new Date().toISOString(),
  };
}

/** The Gradify user a Stripe object belongs to: metadata set at checkout, or the checkout's client reference. */
export const userOf = (obj) => obj?.metadata?.gradify_user_id || obj?.client_reference_id || null;

/** Which Stripe price a checkout for a plan and interval maps to (prices are Edge Function secrets). */
export function priceFor(plan, interval, env) {
  if (plan !== "plus" && plan !== "pro") throw Object.assign(new Error("Choose Gradify Plus or Gradify Pro."), { status: 400 });
  if (interval !== "month" && interval !== "year") throw Object.assign(new Error("Choose monthly billing."), { status: 400 });
  const id = env[`STRIPE_PRICE_${plan.toUpperCase()}_${interval === "year" ? "YEAR" : "MONTH"}`];
  if (!id) throw Object.assign(new Error(`${plan === "plus" ? "Gradify Plus" : "Gradify Pro"} isn't on sale yet.`), { status: 503 });
  return id;
}

const LIVE = new Set(["active", "trialing", "past_due", "incomplete", "unpaid", "paused"]);
/**
 * Whether an incoming subscription may replace the learner's stored row. A learner has one row, so a late event
 * about an old, finished subscription must never overwrite a newer live one (subscribe, cancel, expire, resubscribe).
 */
export function shouldApply(stored, row) {
  if (!stored?.stripe_subscription_id || stored.stripe_subscription_id === row.stripe_subscription_id) return true;
  return LIVE.has(row.status) || !LIVE.has(stored.status);
}

const SUB_EVENTS = new Set(["customer.subscription.created", "customer.subscription.updated", "customer.subscription.deleted", "customer.subscription.paused", "customer.subscription.resumed"]);

/**
 * The billing webhook's whole decision, with Stripe and the database passed in, so tests can run every path.
 * deps: { whsec, getSubscription(id), claimEvent(id, type) → "new" | "duplicate", releaseEvent(id),
 *         storedFor(user) → row | null, userForCustomer(customerId) → user | null, save(user, row) }
 * Returns { status, body }.
 */
export async function handleStripeEvent(payload, header, deps, opts = {}) {
  let event;
  try { event = await verifyStripeEvent(payload, header, deps.whsec, opts); }
  catch (e) { return { status: 400, body: "Bad signature.", reason: e.message }; }
  const relevant = (event.type === "checkout.session.completed" && event.data?.object?.mode === "subscription") || SUB_EVENTS.has(event.type);
  if (!relevant) return { status: 200, body: "Ignored." };
  if ((await deps.claimEvent(event.id, event.type)) === "duplicate") return { status: 200, body: "Already processed." };
  try {
    const obj = event.data.object;
    // always read the subscription fresh from Stripe rather than trusting the event's copy (also makes order irrelevant)
    const sub = await deps.getSubscription(event.type === "checkout.session.completed" ? obj.subscription : obj.id);
    const row = subscriptionRow(sub, deps.env || {});
    const user = (event.type === "checkout.session.completed" ? userOf(obj) : null) || userOf(sub) || (await deps.userForCustomer(row.stripe_customer_id));
    if (!user) throw new Error(`no Gradify user for customer ${row.stripe_customer_id}`);
    if (!shouldApply(await deps.storedFor(user), row)) return { status: 200, body: "Older subscription; kept the current one." };
    await deps.save(user, row);
    return { status: 200, body: "OK" };
  } catch (e) {
    // let Stripe retry: forget the event id so the retry is processed
    await deps.releaseEvent(event.id).catch(() => {});
    return { status: 500, body: "Try again.", reason: e.message };
  }
}

/** A return path on the Gradify site only ("/x.html#/y"), or the default; never another host. */
export function safeBack(from, fallback = "/pricing.html") {
  return typeof from === "string" && /^\/(?![\/\\])[^\s\\]*$/.test(from) && from.length < 300 ? from : fallback;
}
/** SITE + path with ?checkout=… placed before any #fragment, so the page can read it. */
export function returnUrl(site, back, params = {}) {
  const u = new URL(back, site);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  return u.toString();
}

/** Whether this learner may buy a plan now: on sale to all, or listed as a billing tester (for the deliberate first
 *  test). Plus and Pro go on sale separately (GRADIFY_PLUS_ON_SALE, GRADIFY_PRO_ON_SALE). */
export function mayBuy(email, env, plan = "pro") {
  if (env[plan === "plus" ? "GRADIFY_PLUS_ON_SALE" : "GRADIFY_PRO_ON_SALE"] === "on") return true;
  const testers = (env.GRADIFY_BILLING_TESTERS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  return Boolean(email) && testers.includes(String(email).toLowerCase());
}
