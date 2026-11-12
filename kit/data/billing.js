// Gradify Pro in the browser: the plan's prices and allowances, the learner's current plan, and the two ways into
// Stripe (checkout to subscribe, the portal to manage). Used by pricing.html and the Account page (kit/app/main.js).
// The server is the authority: public.subscriptions (written only by the billing-webhook function) and is_pro() /
// ai_claim() in supabase/migrations/20261110120000_billing_and_ai_allowances.sql. planOf() mirrors is_pro() so the
// page shows what the server will enforce; tests/billing-client.test.mjs keeps the two, and these numbers, in step.
import { callFunction } from "./functions.js";

/** Prices in pence (GBP, VAT included). Must match the live Stripe prices: scripts/check-stripe.mjs checks them. */
export const PRO_PRICES = { month: 799, year: 6399 };
export const CURRENCY = "GBP";

/** Whether Gradify Pro is on sale to everyone. Off until Gradify AI, the only thing Pro adds, is switched on:
 *  nobody should pay for an allowance they can't use. The billing-checkout function enforces the same rule
 *  (GRADIFY_PRO_ON_SALE), so this only decides what the page shows. */
export const PRO_ON_SALE = false;

/** Gradify AI uses a month, by plan (monthly on yearly billing too: public.ai_period). Must match public.ai_limits (tests check the migration's seed). */
export const AI_ALLOWANCES = [
  { feature: "tutor", label: "AI tutor conversations", one: "AI tutor conversation", many: "AI tutor conversations", free: 5, pro: 40 },
  { feature: "explain", label: "Explanations", one: "explanation", many: "explanations", free: 5, pro: 25 },
  { feature: "pack", label: "Study packs from your notes", one: "study pack from your notes", many: "study packs from your notes", free: 1, pro: 5 },
  { feature: "quiz", label: "AI-written quizzes", one: "AI-written quiz", many: "AI-written quizzes", free: 2, pro: 8 },
];
/** "1 study pack from your notes", "20 study packs from your notes" */
export const uses = (a, n) => `${n} ${n === 1 ? a.one : a.many}`;

export const money = (pence) => `£${(pence / 100).toFixed(2)}`;

/** What a year costs on monthly billing, and what paying yearly saves. */
export function annualSaving(prices = PRO_PRICES) {
  const twelve = prices.month * 12, saved = twelve - prices.year;
  return { twelveMonths: twelve, saved, percent: Math.round((saved / twelve) * 100), perMonth: Math.round(prices.year / 12), monthsFree: Math.round(saved / prices.month) };
}

const GRACE_MS = 3 * 86400_000;
/** "pro" or "free" for a subscriptions row, exactly as public.is_pro() decides it. */
export function planOf(row, now = Date.now()) {
  if (!row) return "free";
  const end = row.current_period_end ? new Date(row.current_period_end).getTime() : now + 86400_000;
  // past_due needs a real period end (is_pro() compares it, and a null comparison is false)
  const paidUp = row.status === "active" || row.status === "trialing" || (row.status === "past_due" && Boolean(row.current_period_end) && end > now - GRACE_MS);
  return paidUp && end > now - GRACE_MS ? "pro" : "free";
}

const day = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const dayMonth = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", timeZone: "Europe/London" });
/** The 1st of next month, 00:00 UTC: when the monthly fair-use limit resets (mirrors capResetsAt on the server). */
export function capResetsAt(now = Date.now()) {
  const d = new Date(now);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1)).toISOString();
}
/**
 * The Account page's sentence under the Gradify AI allowances. Allowances reset when the learner's period ends (the
 * calendar month on Free, the billing period on Pro); the fair-use limit always resets on the 1st. When those fall on
 * the same day, one date is shown; when they don't (Pro, mostly), both are, so neither surprises anyone.
 */
export function aiResetLine(periodEnd, plan, now = Date.now()) {
  const cap = capResetsAt(now);
  if (!periodEnd) return `Gradify AI used so far. The monthly fair-use limit resets on ${dayMonth(cap)}.`;
  if (dayMonth(periodEnd) === dayMonth(cap)) return `Gradify AI used this month. Your allowances and the fair-use limit reset on ${dayMonth(cap)}.`;
  const when = plan === "pro" ? ", at the end of your billing period" : "";
  return `Gradify AI used this ${plan === "pro" ? "billing period" : "month"}. Your allowances reset on ${dayMonth(periodEnd)}${when}. The monthly fair-use limit resets separately, on ${dayMonth(cap)}.`;
}

/** A plain-English line about the learner's plan, and what (if anything) they need to do. */
export function describePlan(row, now = Date.now()) {
  const plan = planOf(row, now);
  const every = row?.billing_interval === "year" ? "yearly" : row?.billing_interval === "month" ? "monthly" : "";
  if (plan === "pro") {
    const title = `Gradify Pro${every ? `, billed ${every}` : ""}`;
    if (row.status === "past_due") return { plan, title, tone: "warn", line: "Your last payment didn't go through. Update your card in Manage billing to keep Pro; Stripe will try again automatically.", manage: true };
    if (row.cancel_at_period_end) return { plan, title, tone: "info", line: row.current_period_end ? `Cancelled. You keep Pro until ${day(row.current_period_end)}, then move to Free. You can resume any time before then.` : "Cancelled. You keep Pro until the end of the period you've paid for.", manage: true };
    if (row.status === "trialing") return { plan, title, tone: "ok", line: row.current_period_end ? `Free trial until ${day(row.current_period_end)}.` : "Free trial.", manage: true };
    return { plan, title, tone: "ok", line: row.current_period_end ? `Renews on ${day(row.current_period_end)}.` : "Active.", manage: true };
  }
  if (row?.status === "past_due" || row?.status === "unpaid") return { plan, title: "Free", tone: "warn", line: "Gradify Pro is paused because a payment didn't go through. Update your card in Manage billing to restore it.", manage: true };
  if (row?.status === "incomplete") return { plan, title: "Free", tone: "info", line: "Your Gradify Pro checkout wasn't finished. You haven't been charged.", manage: false };
  if (row?.status === "canceled" || row?.status === "incomplete_expired") return { plan, title: "Free", tone: "info", line: "Your Gradify Pro subscription has ended. Your notes and progress are all still here.", manage: Boolean(row.stripe_customer_id) };
  return { plan, title: "Free", tone: "info", line: "Every course, lesson, lab and quiz is free. Gradify Pro adds generous Gradify AI.", manage: false };
}

/** A minimal store over a Supabase client, for pages that don't run the full app (pricing.html). */
export const clientStore = (client) => ({
  mode: "cloud", db: client,
  async session() { return (await client.auth.getSession()).data.session; },
  async refreshSession() { const { data, error } = await client.auth.refreshSession(); return error ? null : data.session; },
});

/** The learner's own subscriptions row (row-level security returns only theirs), or null. */
export async function mySubscription(store) {
  if (store?.mode !== "cloud" || !store.db) return null;
  const { data, error } = await store.db.from("subscriptions").select("status, billing_interval, current_period_end, cancel_at_period_end, stripe_customer_id").maybeSingle();
  if (error) throw error;
  return data;
}

/** How much Gradify AI the learner has used this period: [{ feature, plan, used, allowance, period_end, enabled }]. */
export async function myAllowance(store) {
  if (store?.mode !== "cloud" || !store.db) return [];
  const { data, error } = await store.db.rpc("my_ai_allowance");
  if (error) throw error;
  return data || [];
}

const here = () => `${location.pathname}${location.hash || ""}`.replace(/^\/\//, "/");
/** Send the learner to Stripe Checkout for monthly or yearly Pro. Resolves only on an error (it navigates away). */
export async function startCheckout(store, interval, from = here()) {
  const { url } = await callFunction(store, "billing-checkout", { interval, from }, { fallback: "Checkout couldn't be started. Please try again in a minute." });
  location.assign(url);
}
/** Send the learner to Stripe's billing portal: card, plan, invoices, cancel. */
export async function openPortal(store, from = here()) {
  const { url } = await callFunction(store, "billing-portal", { from }, { fallback: "The billing page couldn't be opened. Please try again in a minute." });
  location.assign(url);
}
