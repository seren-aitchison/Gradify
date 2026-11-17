// The Gradify Plus funnel, from the anonymous counts (public.plus_funnel, supabase/migrations/20261118130000_plus_funnel.sql)
// and paying learners (public.subscriptions): what's shown, pressed, priced, started and paid, and which Free
// allowance or Plus feature leads to Plus. Read-only. Uses the Supabase Management API like scripts/supabase-admin.mjs.
//   NODE_USE_ENV_PROXY=1 node scripts/plus-funnel.mjs <project ref> [--days 28]
import { client } from "./supabase-admin.mjs";

const [ref] = process.argv.slice(2).filter((x) => !x.startsWith("--"));
const days = Number(process.argv[process.argv.indexOf("--days") + 1]) || 28;
const c = client(ref);
const rows = await c.sql(`select source, sum(shown)::int shown, sum(clicked)::int clicked, sum(pricing)::int pricing, sum(checkout)::int checkout, sum(paid)::int paid, sum(cancelled)::int cancelled
  from public.plus_funnel where day > current_date - ${days} group by 1 order by 2 desc`);
const [subs] = await c.sql(`select count(*) filter (where plan = 'plus' and status in ('active', 'trialing'))::int plus,
  count(*) filter (where plan = 'pro' and status in ('active', 'trialing'))::int pro,
  count(*) filter (where status in ('active', 'trialing') and current_period_start > now() - interval '${days} days')::int started_in_window
  from public.subscriptions`);
const sum = (k) => rows.reduce((a, r) => a + (r[k] || 0), 0);
const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : "–");
const T = { shown: sum("shown"), clicked: sum("clicked"), pricing: sum("pricing"), checkout: sum("checkout"), paid: sum("paid") };
console.log(`## Gradify Plus funnel, last ${days} days\n`);
console.log("| Step | Count | From the step before |\n|---|---:|---:|");
console.log(`| Plus offer shown | ${T.shown} | |`);
console.log(`| Offer pressed | ${T.clicked} | ${pct(T.clicked, T.shown)} |`);
console.log(`| Pricing page opened | ${T.pricing} | ${pct(T.pricing, T.clicked)} (includes visits from elsewhere) |`);
console.log(`| Checkout started | ${T.checkout} | ${pct(T.checkout, T.pricing)} |`);
console.log(`| Paid (back from checkout) | ${T.paid} | ${pct(T.paid, T.checkout)} |`);
console.log(`\nPaying now: ${subs.plus} on Plus, ${subs.pro} on Pro (${subs.started_in_window} started or renewed in the window). Cancelled at checkout: ${sum("cancelled")}.\n`);
const src = rows.filter((r) => r.source && (r.shown || r.clicked));
if (src.length) {
  console.log("### What leads to Plus\n\n| Trigger | Shown | Pressed | Rate |\n|---|---:|---:|---:|");
  for (const r of src) console.log(`| ${r.source.replace("/plus/", "")} | ${r.shown} | ${r.clicked} | ${pct(r.clicked, r.shown)} |`);
  console.log("\nA trigger shown often but rarely pressed is a limit learners don't value enough to pay for; one pressed often is worth keeping.");
}
