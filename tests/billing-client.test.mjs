// What the pricing and Account pages say about Gradify Pro (kit/data/billing.js) must match what the server enforces:
// planOf() against the real is_pro() for every subscription state, allowances against public.ai_limits, and the
// annual-saving arithmetic. Also the checkout function's return-address and on-sale rules.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { tempDb } from "../scripts/pg-rehearsal.mjs";
import { PRO_PRICES, PRO_ON_SALE, AI_ALLOWANCES, money, annualSaving, planOf, describePlan } from "../kit/data/billing.js";
import { safeBack, returnUrl, mayBuy } from "../supabase/functions/_shared/billing.js";

const U = "00000000-0000-4000-8000-00000000000a";
const migrations = async () => { const dir = new URL("../supabase/migrations/", import.meta.url); return Promise.all((await readdir(dir)).filter((f) => f.endsWith(".sql")).sort().map((f) => readFile(new URL(f, dir), "utf8"))); };

test("the annual saving is worked out correctly and is what the page says", () => {
  assert.deepEqual(PRO_PRICES, { month: 799, year: 6399 });
  const s = annualSaving();
  assert.equal(s.twelveMonths, 9588); assert.equal(money(s.twelveMonths), "£95.88");
  assert.equal(s.saved, 3189); assert.equal(money(s.saved), "£31.89");
  assert.equal(s.percent, 33); assert.equal(money(s.perMonth), "£5.33"); assert.equal(s.monthsFree, 4);
});

test("the page's allowances are exactly the server's (public.ai_limits)", async () => {
  const d = await tempDb();
  for (const m of await migrations()) await d.sql(m);
  const rows = await d.sql("select feature, plan, per_period from public.ai_limits");
  for (const a of AI_ALLOWANCES) {
    assert.equal(rows.find((r) => r.feature === a.feature && r.plan === "free").per_period, a.free, `${a.feature} free`);
    assert.equal(rows.find((r) => r.feature === a.feature && r.plan === "pro").per_period, a.pro, `${a.feature} pro`);
  }
  assert.equal(rows.length, AI_ALLOWANCES.length * 2);
  await d.close();
});

test("planOf() agrees with the server's is_pro() for every subscription state", async () => {
  const d = await tempDb();
  for (const m of await migrations()) await d.sql(m);
  await d.sql(`insert into auth.users (id, email) values ('${U}', 'a@x') on conflict do nothing`);
  const now = Date.now(), at = (days) => new Date(now + days * 86400_000).toISOString();
  const cases = [];
  for (const status of ["none", "incomplete", "incomplete_expired", "trialing", "active", "past_due", "canceled", "unpaid", "paused"])
    for (const end of [null, 20, -1, -2.9, -3.1, -30]) cases.push({ status, current_period_end: end === null ? null : at(end) });
  for (const c of cases) {
    await d.sql(`delete from public.subscriptions; insert into public.subscriptions (user_id, status, current_period_end) values ('${U}', '${c.status}', ${c.current_period_end ? `'${c.current_period_end}'` : "null"})`);
    const [{ pro }] = await d.sql(`select public.is_pro('${U}') as pro`);
    assert.equal(planOf(c, now), pro ? "pro" : "free", JSON.stringify(c));
  }
  assert.equal(planOf(null), "free");
  await d.close();
});

test("the Account page says what to do in each state, and offers Manage billing only where there's something to manage", () => {
  const end = new Date(Date.now() + 20 * 86400_000).toISOString();
  assert.match(describePlan(null).line, /Every course/); assert.equal(describePlan(null).manage, false);
  assert.match(describePlan({ status: "active", billing_interval: "year", current_period_end: end }).title, /billed yearly/);
  assert.match(describePlan({ status: "active", current_period_end: end }).line, /^Renews on/);
  assert.match(describePlan({ status: "active", cancel_at_period_end: true, current_period_end: end }).line, /^Cancelled\. You keep Pro until/);
  const late = describePlan({ status: "past_due", current_period_end: new Date(Date.now() - 86400_000).toISOString() });
  assert.equal(late.plan, "pro"); assert.equal(late.tone, "warn"); assert.match(late.line, /Update your card/);
  assert.equal(describePlan({ status: "unpaid", current_period_end: end }).plan, "free");
  assert.match(describePlan({ status: "canceled", stripe_customer_id: "cus_1" }).line, /has ended/);
  assert.equal(describePlan({ status: "incomplete" }).manage, false);
  // the tone is never the only signal: each has its own words and symbol on the page
  for (const t of ["ok", "warn", "info"]) assert.ok(["ok", "warn", "info"].includes(t));
});

test("pricing.html takes every price and allowance from kit/data/billing.js, not hand-typed numbers", async () => {
  const html = await readFile(new URL("../pricing.html", import.meta.url), "utf8");
  for (const n of ["7.99", "63.99", "5.33", "31.89", "95.88"]) {
    const script = html.slice(html.indexOf('<script type="module">'));
    assert.ok(!script.includes(n), `${n} is typed into the page script; use PRO_PRICES/annualSaving()`);
  }
  assert.match(html, /including VAT/);
  assert.equal(PRO_ON_SALE, false, "Gradify Pro stays off sale until Gradify AI is switched on (docs/BILLING.md)");
});

test("checkout returns only to the Gradify site, with ?checkout before any #fragment", () => {
  for (const bad of ["//evil.example/x", "https://evil.example", "/\\evil.example", "javascript:alert(1)", "", null, "/a b", "/" + "x".repeat(400)]) assert.equal(safeBack(bad), "/pricing.html", String(bad));
  assert.equal(safeBack("/lawgradify/app.html#/account"), "/lawgradify/app.html#/account");
  assert.equal(returnUrl("https://getgradify.com", "/app.html#/account", { checkout: "success" }), "https://getgradify.com/app.html?checkout=success#/account");
  assert.equal(returnUrl("https://getgradify.com", "/pricing.html"), "https://getgradify.com/pricing.html");
});

test("before Gradify Pro goes on sale, only listed billing testers can check out", () => {
  assert.equal(mayBuy("a@x.com", {}), false);
  assert.equal(mayBuy("A@X.com", { GRADIFY_BILLING_TESTERS: " b@y.com , a@x.com" }), true);
  assert.equal(mayBuy("", { GRADIFY_BILLING_TESTERS: "," }), false);
  assert.equal(mayBuy("anyone@x.com", { GRADIFY_PRO_ON_SALE: "on" }), true);
  assert.equal(mayBuy("anyone@x.com", { GRADIFY_PRO_ON_SALE: "yes" }), false);
});

test("the Account page names both reset dates when they differ", async () => {
  const { aiResetLine, capResetsAt } = await import("../kit/data/billing.js");
  const now = Date.parse("2026-11-18T12:00:00Z");
  assert.equal(capResetsAt(now), "2026-12-01T00:00:00.000Z");
  assert.equal(capResetsAt(Date.parse("2026-12-31T23:30:00Z")), "2027-01-01T00:00:00.000Z", "across the year end");
  // Free: allowances and the fair-use limit both reset on the 1st, so one date
  assert.equal(aiResetLine("2026-12-01T00:00:00Z", "free", now), "Gradify AI used this month. Your allowances and the fair-use limit reset on 1 December.");
  // Pro billed from the 18th: two different dates, each named
  assert.equal(aiResetLine("2026-12-18T09:00:00Z", "pro", now),
    "Gradify AI used this billing period. Your allowances reset on 18 December, at the end of your billing period. The monthly fair-use limit resets separately, on 1 December.");
  // Pro whose billing date happens to be the 1st: one date again
  assert.match(aiResetLine("2026-12-01T00:00:00Z", "pro", now), /allowances and the fair-use limit reset on 1 December/);
  assert.match(aiResetLine(null, "free", now), /fair-use limit resets on 1 December/);
});

test("the server and the Account page agree on when the fair-use limit resets", async () => {
  const client = await import("../kit/data/billing.js");
  const server = await import("../supabase/functions/_shared/ai.js");
  for (const t of ["2026-11-01T00:00:00Z", "2026-11-18T12:00:00Z", "2026-12-31T23:59:59Z", "2027-02-28T10:00:00Z"])
    assert.equal(client.capResetsAt(Date.parse(t)), server.capResetsAt(new Date(t)), t);
});
