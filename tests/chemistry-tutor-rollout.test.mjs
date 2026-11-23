// The Organic Chemistry Lab's tutor while the backend catches up with the site. Merging the lab deploys the site at
// once; the "chemistry" tutor mode needs migration 20261122120000_chemistry_tutor_mode.sql and the redeployed
// course-tutor function (supabase/functions/_shared/tutor.js and ai.js). Each stage of a delayed or out-of-order
// release must fail safely: no Claude call, no use counted, a plain message for the learner, and nothing in the lab
// marked as done with help. No Claude call is ever made here: `call` is a fake that counts.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { runAi, ledger } from "../supabase/functions/_shared/ai.js";
import { buildRequest, DAILY } from "../supabase/functions/_shared/tutor.js";
import { callFunction } from "../kit/data/functions.js";
import { failureText } from "../kit/labs/chemistry/reactions/tutor-ui.js";
import { tempDb } from "../scripts/pg-rehearsal.mjs";

const CHEM_MIGRATION = "20261122120000_chemistry_tutor_mode.sql";
const U = "00000000-0000-4000-8000-00000000000c";
const request = { subject: "chemistry", mode: "chemistry", intent: "explain", context: { kind: "prediction", id: "r1", status: "reacts", rule: { confidence: "provisional" } }, learner: {}, turns: [], conversationId: "c-1" };
const reply = { model: "claude-opus-5-5", stop_reason: "end_turn", content: [{ type: "text", text: '{"reply":"Because…"}' }], usage: { input_tokens: 900, output_tokens: 70 } };

// the real ledger (every migration, or every one but the chemistry migration) in a temporary PostgreSQL
async function realLedger({ withChemistry }) {
  const d = await tempDb(), dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((x) => x.endsWith(".sql") && (withChemistry || x !== CHEM_MIGRATION)).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  await d.sql(`grant usage on schema public to anon, authenticated, service_role;
    grant all on all tables in schema public to anon, authenticated, service_role;
    insert into auth.users (id, email) values ('${U}', 'c@x') on conflict do nothing;
    update public.ai_settings set enabled = true, per_minute = 1000, per_hour = 1000, global_per_minute = 1000;`);
  const lit = (v) => (v === null || v === undefined ? "null" : typeof v === "number" ? String(v) : `'${String(v).replace(/'/g, "''")}'`);
  const toSql = (v) => (v !== null && typeof v === "object" ? `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb` : lit(v));
  const admin = { rpc: async (name, args) => {
    try {
      const rows = await d.sql(`set role service_role; select * from public.${name}(${Object.entries(args).map(([k, v]) => `${k} => ${toSql(v)}`).join(", ")}); `);
      await d.sql("reset role;");
      const r = rows.map((x) => (name.endsWith("_for") && name.startsWith("ai_claim") ? x : Object.values(x)[0]));
      return { data: name === "ai_claim_for" ? r : r[0], error: null };
    } catch (error) { await d.sql("reset role;"); return { data: null, error }; }
  } };
  return { d, deps: ledger(admin, U) };
}
const chemJob = (counter) => ({ mode: "chemistry", site: "chemistry", estInput: 900, maxOutput: 1200, call: async () => { counter.calls++; return reply; }, parse: (m) => JSON.parse(m.content[0].text) });

// the course page's wrapper around the lab's tutor (kit/course/course.js: ask for a lab), with callFunction as it is
function labAsk(fetchStub) {
  const helped = new Set(), store = { mode: "cloud", session: async () => ({ access_token: "t" }) };
  const ask = async (body) => { const out = await callFunction(store, "course-tutor", { subject: "chemistry", ...body }, { fetch: fetchStub, url: "https://example.invalid", anonKey: "anon", online: () => true }); helped.add("organic"); return out; };
  return { ask, helped };
}
const respond = (status, body) => async () => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

test("stage 0, site live but functions not redeployed: the old course-tutor rejects the mode before any claim or Claude call", async () => {
  // the deployed functions are this code without the chemistry entry (the change to them is additive: one DAILY entry,
  // one FEATURE_OF entry and the chemistry request builder), and buildRequest's first check is the DAILY gate
  const saved = DAILY.chemistry; delete DAILY.chemistry;
  try { assert.throws(() => buildRequest(request), (e) => e.status === 400 && e.message === "Unknown mode."); } finally { DAILY.chemistry = saved; }
  // course-tutor builds the request before it reaches runAi (so before any claim, cache lookup or Claude call)
  const src = await readFile(new URL("../supabase/functions/course-tutor/index.ts", import.meta.url), "utf8");
  assert.ok(src.indexOf("buildRequest(body)") > 0 && src.indexOf("buildRequest(body)") < src.indexOf("runAi("), "buildRequest runs before runAi");
  // what the learner sees, and that the lab isn't marked as done with help
  const { ask, helped } = labAsk(respond(400, { error: "Unknown mode." }));
  const err = await ask(request).then(() => null, (e) => e);
  assert.equal(err.status, 400); assert.equal(err.message, "Unknown mode.");
  assert.match(failureText(err), /isn't available for this lab right now/); assert.doesNotMatch(failureText(err), /Unknown mode/);
  assert.equal(helped.size, 0, "a failed request doesn't mark the lab as done with help");
});

test("stage 1, functions redeployed before the migration: the ledger refuses the mode and Claude is never called", async () => {
  const { d, deps } = await realLedger({ withChemistry: false }), counter = { calls: 0 };
  const out = await runAi(deps, chemJob(counter));
  assert.equal(counter.calls, 0, "no Claude call without the migration");
  assert.ok(out.status >= 400, `refused (${out.status})`);
  const used = await d.sql("select count(*)::int as n from public.tutor_usage where status = 'ok' or counted");
  assert.equal(used[0].n, 0, "no use is counted");
  await d.close();
  // the learner gets a plain message whatever the refusal says
  const { ask, helped } = labAsk(respond(out.status, out.body));
  const err = await ask(request).then(() => null, (e) => e);
  assert.ok(err); assert.ok(failureText(err).length > 10); assert.doesNotMatch(failureText(err), /unknown|mode|constraint|sql/i);
  assert.equal(helped.size, 0);
});

test("stage 2, migration applied and functions redeployed: the chemistry tutor answers and counts as tutor use", async () => {
  assert.ok(DAILY.chemistry > 0);
  const r = buildRequest(request); assert.ok(r.system && r.messages?.length);
  const { d, deps } = await realLedger({ withChemistry: true }), counter = { calls: 0 };
  const out = await runAi(deps, chemJob(counter));
  assert.equal(out.status, 200); assert.equal(counter.calls, 1); assert.equal(out.body.usage.feature, "tutor");
  await d.close();
  const { ask, helped } = labAsk(respond(200, { reply: "Because…" }));
  assert.equal((await ask(request)).reply, "Because…"); assert.equal(helped.size, 1);
});

test("refusals that say why are shown as they are; unsupported requests become a plain message", () => {
  assert.equal(failureText({ signin: true, message: "Sign in to use Gradify AI." }), "Sign in to use Gradify AI.");
  assert.equal(failureText({ status: 429, reason: "allowance", message: "You've used your 5 free AI tutor conversations this month." }), "You've used your 5 free AI tutor conversations this month.");
  assert.match(failureText({ status: 400, reason: "unknown_mode", message: "Unknown request." }), /isn't available/);
  assert.match(failureText({ status: 404, message: "Not found" }), /isn't available/);
  assert.equal(failureText({ status: 503, message: "Gradify AI is busy. Try again in a minute." }), "Gradify AI is busy. Try again in a minute.");
  assert.match(failureText(undefined), /isn't available/);
});
