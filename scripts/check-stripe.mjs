// Read-only check that Stripe and Supabase are set up to sell exactly what the site says, before a real payment.
//   NODE_USE_ENV_PROXY=1 node scripts/check-stripe.mjs [--write]
// Checks, in Stripe: the Gradify Pro product, both prices (GBP, amount, interval, VAT-inclusive, active), the webhook
// (URL, events, enabled, API version) and the billing portal. In Supabase: the Stripe secrets exist, and the price
// ids stored there are the live prices (compared by SHA-256: Supabase lists only digests). Changes nothing.
// The Stripe key and Supabase token come from a credential-injecting proxy or STRIPE_SECRET_KEY / SUPABASE_ACCESS_TOKEN.
import { createHash } from "node:crypto";
import { appendFile } from "node:fs/promises";
import { PRO_PRICES } from "../kit/data/billing.js";

const REF = "ezlohntrnassgsbofcfc", API_VERSION = "2025-08-27.basil";
const HOOK_URL = `https://${REF}.supabase.co/functions/v1/billing-webhook`;
const EVENTS = ["checkout.session.completed", "customer.subscription.created", "customer.subscription.deleted", "customer.subscription.paused", "customer.subscription.resumed", "customer.subscription.updated"];
const stripe = async (path) => {
  const r = await fetch(`https://api.stripe.com/v1${path}`, { headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY || "proxy-injected"}`, "Stripe-Version": API_VERSION } });
  const d = await r.json(); if (!r.ok) throw new Error(`Stripe ${path}: ${d.error?.message}`); return d;
};
const sha = (s) => createHash("sha256").update(s).digest("hex");
const rows = [], check = (what, ok, detail = "") => rows.push({ what, ok: Boolean(ok), detail });

const account = await stripe("/account");
check("Stripe account", account.charges_enabled, `${account.country}, default currency ${account.default_currency}, charges ${account.charges_enabled ? "enabled" : "DISABLED"}`);
const prices = { month: (await stripe("/prices?lookup_keys[]=gradify_pro_month&expand[]=data.product")).data[0], year: (await stripe("/prices?lookup_keys[]=gradify_pro_year&expand[]=data.product")).data[0] };
const live = prices.month?.livemode;
check("Mode", true, live ? "LIVE: real payments" : "test mode");
for (const [interval, p] of Object.entries(prices)) {
  if (!p) { check(`Gradify Pro ${interval}ly price`, false, "missing (lookup key gradify_pro_" + interval + ")"); continue; }
  const want = PRO_PRICES[interval];
  check(`Gradify Pro ${interval}ly price`, p.active && p.currency === "gbp" && p.unit_amount === want && p.type === "recurring" && p.recurring?.interval === interval && p.recurring?.interval_count === 1 && p.recurring?.usage_type === "licensed" && p.tax_behavior === "inclusive" && p.product?.active && p.product?.name === "Gradify Pro",
    `${p.id}: ${p.currency.toUpperCase()} ${(p.unit_amount / 100).toFixed(2)} every ${p.recurring?.interval_count} ${p.recurring?.interval}, ${p.tax_behavior} of tax, ${p.active ? "active" : "INACTIVE"}; product "${p.product?.name}" ${p.product?.active ? "active" : "INACTIVE"}; site sells ${(want / 100).toFixed(2)}`);
}
if (prices.month && prices.year) check("Both prices on the same product", prices.month.product.id === prices.year.product.id, prices.month.product.id);
const products = (await stripe("/products?active=true&limit=100")).data.filter((p) => /gradify/i.test(p.name));
check("No duplicate Gradify products", products.length === 1, products.map((p) => `${p.id} "${p.name}"`).join(", "));

const hooks = (await stripe("/webhook_endpoints?limit=100")).data.filter((h) => h.url === HOOK_URL);
const hook = hooks[0];
check("Webhook endpoint", hooks.length === 1 && hook.status === "enabled" && hook.api_version === API_VERSION && hook.livemode === live,
  hook ? `${hook.id} ${hook.status}, API ${hook.api_version}, ${hooks.length} endpoint(s) for this URL` : "missing");
if (hook) check("Webhook events", JSON.stringify([...hook.enabled_events].sort()) === JSON.stringify(EVENTS), hook.enabled_events.join(", "));

const portals = (await stripe("/billing_portal/configurations?active=true&limit=10&expand[]=data.features.subscription_update.products")).data;
const portal = portals.find((c) => c.is_default) || portals[0];
const upd = portal?.features?.subscription_update;
check("Billing portal", portal && portal.features.subscription_cancel.enabled && portal.features.subscription_cancel.mode === "at_period_end" && portal.features.payment_method_update.enabled && portal.features.invoice_history.enabled,
  portal ? `${portal.id}${portal.is_default ? " (default)" : ""}: cancel ${portal.features.subscription_cancel.mode}, card updates ${portal.features.payment_method_update.enabled ? "on" : "off"}, invoices ${portal.features.invoice_history.enabled ? "on" : "off"}` : "missing");
if (upd && prices.month) check("Portal plan switching", upd.enabled && upd.products?.some((x) => x.product === prices.month.product.id && x.prices.includes(prices.month.id) && x.prices.includes(prices.year.id)), "monthly ↔ yearly");

const sres = await fetch(`https://api.supabase.com/v1/projects/${REF}/secrets`, { headers: { Authorization: `Bearer ${process.env.SUPABASE_ACCESS_TOKEN || "proxy-injected"}` } });
const secrets = Object.fromEntries((await sres.json()).map((s) => [s.name, s.value]));
for (const n of ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "STRIPE_PRICE_MONTH", "STRIPE_PRICE_YEAR"]) check(`Supabase secret ${n}`, n in secrets, n in secrets ? "set" : "MISSING");
for (const [interval, p] of Object.entries(prices)) if (p) check(`STRIPE_PRICE_${interval.toUpperCase()} is the live ${interval}ly price`, secrets[`STRIPE_PRICE_${interval.toUpperCase()}`] === sha(p.id), "compared by SHA-256");
check("Gradify Pro on sale", true, "GRADIFY_PRO_ON_SALE " + (secrets.GRADIFY_PRO_ON_SALE ? "set (check it's only on once Gradify AI is)" : "not set: only GRADIFY_BILLING_TESTERS can check out") + `; testers ${"GRADIFY_BILLING_TESTERS" in secrets ? "set" : "not set"}`);
const subs = await stripe("/subscriptions?status=all&limit=100");
check("Existing subscriptions", true, `${subs.data.length}${subs.has_more ? "+" : ""}`);

const bad = rows.filter((r) => !r.ok);
const report = `\n## ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC · Stripe check (read-only) · ${REF}\n\n${bad.length ? `**${bad.length} check(s) failed.**` : "Everything matches what the site sells."}\n\n| check | result | detail |\n|---|---|---|\n${rows.map((r) => `| ${r.what} | ${r.ok ? "ok" : "FAIL"} | ${r.detail.replace(/\|/g, "\\|")} |`).join("\n")}\n\nChanges made by this check: none.\n`;
console.log(report);
if (process.argv.includes("--write")) await appendFile(new URL("../docs/BACKEND-LOG.md", import.meta.url), report);
if (bad.length) process.exitCode = 1;
