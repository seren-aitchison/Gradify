// Verifies the Gradify Pro launch offer (GRADIFY48: £5 first month, then £10 a month) in Stripe, before any email is sent.
//
//   STRIPE_SECRET_KEY=rk_live_… node scripts/verify-offer-stripe.mjs              read-only: the live code, coupon and prices
//   STRIPE_SECRET_KEY=sk_test_… node scripts/verify-offer-stripe.mjs --setup-test  test mode only: create GRADIFY48 in test mode
//   STRIPE_SECRET_KEY=sk_test_… node scripts/verify-offer-stripe.mjs --simulate    test mode only: pay with it, a month later, renew
//
// The read-only check changes nothing (a restricted key with read access to Coupons, Promotion codes, Prices, Products
// and Subscriptions is enough). --setup-test and --simulate refuse to run with a live key. --simulate uses a Stripe test
// clock: a new customer subscribes with the code (first invoice £5), the clock moves 32 days (second invoice £10, no
// discount), the same customer is refused the code at Checkout as billing-checkout would ask for it, and a brand-new
// customer's Checkout total is £5. The test clock and its customers are deleted at the end.
// Prints a table and exits 1 if anything fails. Never paste a key into chat or commit it; set it in your own terminal.
import { stripe as call } from "../supabase/functions/_shared/billing.js";
import { PLAN_PRICES } from "../kit/data/billing.js";
import { OFFER } from "../kit/data/offer.js";

const KEY = process.env.STRIPE_SECRET_KEY;
if (!KEY) { console.error("Set STRIPE_SECRET_KEY in your terminal first (a restricted read key for live, sk_test_… for test mode)."); process.exit(2); }
const args = new Set(process.argv.slice(2));
const stripe = (method, path, params) => call(KEY, method, path, params);
const LOOKUP = { plus: "gradify_plus_month", pro: "gradify_pro_month_1500" };
const rows = [], check = (what, ok, detail = "") => { rows.push({ what, ok: Boolean(ok), detail }); return ok; };
const gbp = (p) => `£${(p / 100).toFixed(2)}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const price = async (plan) => (await stripe("GET", `/prices?lookup_keys[]=${LOOKUP[plan]}&expand[]=data.product`)).data[0];
const plus = await price("plus"), ultra = await price("pro");
const live = Boolean(plus?.livemode);
check("Mode", true, live ? "LIVE (read-only checks only)" : "test mode");
for (const [plan, p, name] of [["plus", plus, "Gradify Pro"], ["pro", ultra, "Gradify Ultra"]]) {
  check(`${name} price (internal "${plan}")`, p && p.active && p.currency === "gbp" && p.unit_amount === PLAN_PRICES[plan].month && p.recurring?.interval === "month" && p.recurring?.interval_count === 1 && p.tax_behavior === "inclusive",
    p ? `${p.id}: ${gbp(p.unit_amount)} ${p.currency.toUpperCase()} a ${p.recurring?.interval}, tax ${p.tax_behavior}, ${p.active ? "active" : "INACTIVE"}; site sells ${gbp(PLAN_PRICES[plan].month)}` : `missing (lookup key ${LOOKUP[plan]})`);
}

if (args.has("--setup-test")) {
  if (live) { console.error("--setup-test only runs with a test-mode key."); process.exit(2); }
  if (!plus) { console.error("No test-mode Gradify Pro price (lookup key gradify_plus_month)."); process.exit(1); }
  const existing = (await stripe("GET", `/promotion_codes?code=${OFFER.code}&limit=1`)).data[0];
  if (existing) console.log(`Test-mode ${OFFER.code} already exists (${existing.id}); nothing created.`);
  else {
    const coupon = await stripe("POST", "/coupons", { name: "Gradify Pro: £5 first month (test)", amount_off: 500, currency: "gbp", duration: "once", applies_to: { products: [plus.product.id] }, redeem_by: Math.floor(Date.parse(OFFER.ends) / 1000) });
    const promo = await stripe("POST", "/promotion_codes", { coupon: coupon.id, code: OFFER.code, restrictions: { first_time_transaction: "true" }, expires_at: Math.floor(Date.parse(OFFER.ends) / 1000) });
    console.log(`Created test-mode coupon ${coupon.id} and promotion code ${promo.id} (${OFFER.code}), mirroring live.`);
  }
}

// ---- the code and its coupon (read-only) ----
const promo = (await stripe("GET", `/promotion_codes?code=${OFFER.code}&limit=1`)).data[0];
const couponId = promo && (typeof promo.coupon === "string" ? promo.coupon : promo.coupon?.id ?? promo.promotion?.coupon);
const coupon = couponId ? await stripe("GET", `/coupons/${typeof couponId === "string" ? couponId : couponId.id}?expand[]=applies_to`) : null;
const endsAt = Math.floor(Date.parse(OFFER.ends) / 1000);
if (check(`Promotion code ${OFFER.code}`, promo?.active, promo ? `${promo.id}, ${promo.active ? "active" : "INACTIVE"}, redeemed ${promo.times_redeemed}${promo.max_redemptions ? ` of ${promo.max_redemptions}` : ""}` : "not found in this mode")) {
  check("First-time customers only", promo.restrictions?.first_time_transaction === true, `first_time_transaction: ${promo.restrictions?.first_time_transaction}`);
  check("Expiry matches the email and the app", promo.expires_at === endsAt, `expires_at ${promo.expires_at} (${promo.expires_at ? new Date(promo.expires_at * 1000).toISOString() : "never"}); app and email say ${OFFER.ends}`);
  check("No minimum spend or customer lock", !promo.restrictions?.minimum_amount && !promo.customer, `${promo.restrictions?.minimum_amount ? `minimum ${gbp(promo.restrictions.minimum_amount)}` : "no minimum"}${promo.customer ? `, locked to ${promo.customer}` : ""}`);
}
if (coupon) {
  check("Coupon: £5 off, GBP", coupon.amount_off === OFFER.firstMonthPence && coupon.currency === "gbp" && !coupon.percent_off, `${coupon.id}: ${coupon.amount_off ? gbp(coupon.amount_off) : `${coupon.percent_off}%`} off ${coupon.currency?.toUpperCase() ?? ""}`);
  check("Coupon: first invoice only", coupon.duration === "once", `duration ${coupon.duration}${coupon.duration_in_months ? ` (${coupon.duration_in_months} months)` : ""}`);
  check("Coupon: only Gradify Pro", plus && coupon.applies_to?.products?.length === 1 && coupon.applies_to.products[0] === plus.product.id, `applies to ${coupon.applies_to?.products?.join(", ") || "EVERY product"}; Gradify Pro product ${plus?.product.id}`);
  check("Coupon valid until the deadline", coupon.valid && (!coupon.redeem_by || coupon.redeem_by >= endsAt), `${coupon.valid ? "valid" : "NOT valid"}, redeem by ${coupon.redeem_by ? new Date(coupon.redeem_by * 1000).toISOString() : "no limit"}`);
}

// ---- existing subscribers (read-only): who is on which price ----
const subs = await stripe("GET", "/subscriptions?status=all&limit=100");
const by = {};
for (const s of subs.data) { const id = s.items?.data?.[0]?.price?.id; const k = id === plus?.id ? "Gradify Pro" : id === ultra?.id ? "Gradify Ultra" : `other price ${id}`; by[k] = (by[k] || 0) + 1; }
check("Existing subscriptions (unchanged by this release)", true, Object.entries(by).map(([k, n]) => `${n} on ${k}`).join(", ") || "none");

// ---- test mode: pay with the code, renew a month later ----
if (args.has("--simulate")) {
  if (live) { console.error("--simulate only runs with a test-mode key."); process.exit(2); }
  if (!promo || !plus) { console.error("Run with --setup-test first: there's no test-mode code or price."); process.exit(1); }
  const now = Math.floor(Date.now() / 1000);
  const clock = await stripe("POST", "/test_helpers/test_clocks", { frozen_time: now, name: "Gradify offer check" });
  try {
    const customer = await stripe("POST", "/customers", { email: "offer-check@example.com", test_clock: clock.id, metadata: { purpose: "verify-offer-stripe" } });
    const pm = await stripe("POST", "/payment_methods/pm_card_visa/attach", { customer: customer.id });
    await stripe("POST", `/customers/${customer.id}`, { invoice_settings: { default_payment_method: pm.id } });

    // a brand-new customer's Checkout, exactly as billing-checkout builds it with the code applied
    const session = await stripe("POST", "/checkout/sessions", { mode: "subscription", customer: customer.id, line_items: [{ price: plus.id, quantity: 1 }], discounts: [{ promotion_code: promo.id }], success_url: "https://getgradify.com/pricing.html?checkout=success", cancel_url: "https://getgradify.com/pricing.html?checkout=cancelled" });
    check("Checkout for a new customer shows £5 due", session.amount_total === OFFER.firstMonthPence, `amount_total ${gbp(session.amount_total)} (subtotal ${gbp(session.amount_subtotal)})`);
    await stripe("POST", `/checkout/sessions/${session.id}/expire`);

    const sub = await stripe("POST", "/subscriptions", { customer: customer.id, items: [{ price: plus.id }], discounts: [{ promotion_code: promo.id }], default_payment_method: pm.id, expand: ["latest_invoice"] });
    check("First invoice £5, paid", sub.latest_invoice?.total === OFFER.firstMonthPence && sub.latest_invoice?.status === "paid", `${gbp(sub.latest_invoice?.total)} ${sub.latest_invoice?.status}; subscription ${sub.status}`);
    const preview = await stripe("POST", "/invoices/create_preview", { customer: customer.id, subscription: sub.id });
    check("Next invoice previewed at £10", preview.total === PLAN_PRICES.plus.month, `${gbp(preview.total)}, discounts ${preview.total_discount_amounts?.length ? gbp(preview.total_discount_amounts.reduce((a, d) => a + d.amount, 0)) : "none"}`);

    await stripe("POST", `/test_helpers/test_clocks/${clock.id}/advance`, { frozen_time: now + 32 * 86400 });
    for (let i = 0; i < 60; i++) { if ((await stripe("GET", `/test_helpers/test_clocks/${clock.id}`)).status === "ready") break; await sleep(2000); }
    const invoices = (await stripe("GET", `/invoices?customer=${customer.id}&limit=10`)).data.sort((a, b) => a.created - b.created);
    const renewal = invoices[1];
    check("A month later: renewal £10, no discount", renewal && renewal.total === PLAN_PRICES.plus.month && !(renewal.total_discount_amounts || []).some((d) => d.amount > 0), renewal ? `${gbp(renewal.total)} ${renewal.status}` : `only ${invoices.length} invoice(s)`);
    const after = await stripe("GET", `/subscriptions/${sub.id}`);
    check("Discount gone from the subscription", !(after.discounts || []).length && !after.discount, `discounts: ${JSON.stringify(after.discounts || [])}`);

    // the same customer (has paid) asks for the code again: Stripe should refuse, and billing-checkout falls back
    let refused = null;
    try { await stripe("POST", "/checkout/sessions", { mode: "subscription", customer: customer.id, line_items: [{ price: plus.id, quantity: 1 }], discounts: [{ promotion_code: promo.id }], success_url: "https://getgradify.com/", cancel_url: "https://getgradify.com/" }); }
    // only Stripe's first-time-customer refusal counts; a server error or any other refusal fails the run
    catch (e) { if (e.status >= 400 && e.status < 500 && /prior transactions|first[- ]time/i.test(e.message)) refused = e.message; else throw e; }
    check("A past customer is refused the code", refused, refused ? `Stripe: "${refused}"; billing-checkout then opens Checkout with Add promotion code` : "Stripe ACCEPTED it: first-time restriction isn't working");
    const fallback = await stripe("POST", "/checkout/sessions", { mode: "subscription", customer: customer.id, line_items: [{ price: plus.id, quantity: 1 }], allow_promotion_codes: "true", success_url: "https://getgradify.com/", cancel_url: "https://getgradify.com/" });
    check("…and the fallback Checkout opens at £10", fallback.amount_total === PLAN_PRICES.plus.month, gbp(fallback.amount_total));
    await stripe("POST", `/checkout/sessions/${fallback.id}/expire`);
  } finally {
    await stripe("DELETE", `/test_helpers/test_clocks/${clock.id}`).catch((e) => console.warn("Couldn't delete test clock", clock.id, e.message));
  }
}

const bad = rows.filter((r) => !r.ok);
console.log(`\n## ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC · ${OFFER.code} offer check · ${live ? "live, read-only" : "test mode"}${args.has("--simulate") ? " · simulated purchase and renewal" : ""}\n`);
console.log(bad.length ? `**${bad.length} check(s) failed.**\n` : "Everything matches the email and the app.\n");
console.log("| check | result | detail |\n|---|---|---|\n" + rows.map((r) => `| ${r.what} | ${r.ok ? "ok" : "FAIL"} | ${String(r.detail).replace(/\|/g, "\\|")} |`).join("\n"));
if (bad.length) process.exitCode = 1;
