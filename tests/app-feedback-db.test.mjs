// Feedback about a Gradify tool or page (supabase/migrations/20261127120000_app_feedback.sql), against a real
// PostgreSQL with Supabase's default privileges: a learner adds and reads only their own, can't edit it, can't
// send a page address with a query in it, and a visitor can do nothing.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { tempDb } from "../scripts/pg-rehearsal.mjs";
import { feedbackRow, reportRow } from "../kit/ui/quick-actions.js";

const ANA = "00000000-0000-4000-8000-0000000000a1", BEN = "00000000-0000-4000-8000-0000000000b2";
async function db() {
  const d = await tempDb();
  await d.sql(`grant usage on schema public to anon, authenticated, service_role;
    alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
    alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;`);
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const f of (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort()) await d.sql(await readFile(new URL(f, dir), "utf8"));
  await d.sql(`insert into auth.users (id, email) values ('${ANA}', 'a@x'), ('${BEN}', 'b@x')`);
  const as = (uid, q) => d.sql(`set role authenticated; set request.jwt.claim.sub = '${uid}'; ${q};`).finally(() => d.sql("reset role; reset request.jwt.claim.sub;"));
  const anon = (q) => d.sql(`set role anon; ${q};`).finally(() => d.sql("reset role;"));
  return { as, anon };
}
const lit = (v) => (v == null ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const insert = (table, r) => `insert into public.${table} (${Object.keys(r).join(", ")}) values (${Object.values(r).map(lit).join(", ")})`;

test("what the app sends as feedback is what the table accepts; it's the learner's own and can't be edited", async () => {
  const { as, anon } = await db();
  const r = feedbackRow({ site: "MedGradify", about: "Flashcards", kind: "idea", note: "Let me shuffle a set", page: "/medgradify/app.html#/deck/x?card=1" });
  assert.equal(r.page, "/medgradify/app.html");   // never a fragment or query: they can carry the learner's own ids
  await as(ANA, insert("app_feedback", r));
  assert.equal((await as(ANA, "select count(*)::int as n from public.app_feedback"))[0].n, 1);
  assert.equal((await as(BEN, "select count(*)::int as n from public.app_feedback"))[0].n, 0);
  await assert.rejects(as(ANA, "update public.app_feedback set note = 'changed'"), /permission denied/);
  await assert.rejects(as(ANA, insert("app_feedback", { ...r, page: "/app.html?x=1" })), /check constraint/);
  await assert.rejects(anon(insert("app_feedback", r)), /permission denied/);
  assert.equal(feedbackRow({ note: "   " }), null);
});

test("what the app sends as a lesson report is what the lesson_reports table accepts", async () => {
  const { as } = await db();
  const r = reportRow({ site: "SciGradify", subject: "biology", lesson: "u01-01", question: "u01-01-q3", kind: "wrong", note: "Answer should be 4.2 kJ" });
  await as(ANA, insert("lesson_reports", r));
  assert.equal((await as(ANA, "select kind from public.lesson_reports"))[0].kind, "wrong");
  // a question key the table can't hold is left off rather than refusing the report
  assert.equal(reportRow({ subject: "biology", lesson: "u01-01", question: "u01/01:Q3" }).question_id, null);
  assert.equal(reportRow({ subject: "Biology!", lesson: "u01-01" }), null);
});
