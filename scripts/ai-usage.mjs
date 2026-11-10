// Gradify AI usage and spend, read-only, for the owner:
//   NODE_USE_ENV_PROXY=1 node scripts/ai-usage.mjs [ref] [--json] [--write]
// Reads public.ai_usage_overview() through the Supabase Management API (as the database owner), the same figures the
// signed-in owner sees on ai-usage.html. Learners appear by the first 8 characters of their id, never by email.
// With --write the report is appended to docs/BACKEND-LOG.md. Changes nothing.
import { appendFile } from "node:fs/promises";
import { client } from "./supabase-admin.mjs";

const pence = (p) => `£${(Number(p) / 100).toFixed(2)}`;
const table = (rows, cols) => (rows.length ? `| ${cols.map((c) => c[0]).join(" | ")} |\n|${cols.map(() => "---").join("|")}|\n${rows.map((r) => `| ${cols.map(([, f]) => String(f(r)).replace(/\|/g, "/")).join(" | ")} |`).join("\n")}` : "None yet.");

export function report(o) {
  const s = o.settings, m = o.month;
  return `**Gradify AI is ${s.enabled ? "ON for everyone" : `OFF${s.testers ? ` (on for ${s.testers} tester${s.testers === 1 ? "" : "s"})` : ""}`}.**
This month: ${pence(m.spend_pence)} of the ${pence(s.monthly_budget_pence)} budget (${s.monthly_budget_pence ? Math.round((m.spend_pence / s.monthly_budget_pence) * 100) : 0}%). Today: ${pence(m.today_pence)} of ${pence(s.daily_budget_pence)}.
${m.requests} requests from ${m.learners} learner${m.learners === 1 ? "" : "s"}; ${m.in_flight} in flight, ${m.stale} abandoned. Response cache: ${o.cache.entries} answers, ${o.cache.hits} reuses.
Limits: ${s.per_minute} a minute and ${s.per_hour} an hour per learner, ${s.global_per_minute} a minute overall. Fair-use caps: ${(o.plan_caps || []).map((c) => `${c.plan} ${pence(c.monthly_pence)}`).join(", ")} a month. £${s.gbp_per_usd} per $.

### By feature and plan

${table(o.by_feature, [["feature", (r) => r.feature], ["plan", (r) => r.plan], ["requests", (r) => r.requests], ["counted", (r) => r.counted], ["failed", (r) => r.failed], ["cached", (r) => r.cached], ["input tokens", (r) => r.input_tokens], ["output tokens", (r) => r.output_tokens], ["cache reads", (r) => r.cache_read_tokens], ["cost", (r) => pence(r.cost_pence)], ["per request", (r) => `${Number(r.avg_pence).toFixed(2)}p`]])}

### Top learners this month

${table(o.top_learners, [["learner", (r) => r.learner], ["plan", (r) => r.plan], ["requests", (r) => r.requests], ["cost", (r) => pence(r.cost_pence)], ["fair-use cap", (r) => pence(r.cap_pence)]])}

### Last 30 days

${table(o.by_day, [["day", (r) => r.day], ["requests", (r) => r.requests], ["cost", (r) => pence(r.cost_pence)]])}

### Failures in the last 7 days

${table(o.recent_errors, [["at", (r) => String(r.at).slice(0, 16)], ["mode", (r) => r.mode], ["error", (r) => r.error ?? ""]])}`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const ref = process.argv.slice(2).find((a) => !a.startsWith("--")) || "ezlohntrnassgsbofcfc";
  const [row] = await client(ref).sql("select public.ai_usage_overview() as o");
  const o = typeof row.o === "string" ? JSON.parse(row.o) : row.o;
  if (process.argv.includes("--json")) { console.log(JSON.stringify(o, null, 2)); process.exit(0); }
  const entry = `\n## ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC · Gradify AI usage (read-only) · ${ref}\n\n${report(o)}\n\nChanges made by this check: none.\n`;
  console.log(entry);
  if (process.argv.includes("--write")) await appendFile(new URL("../docs/BACKEND-LOG.md", import.meta.url), entry);
}
