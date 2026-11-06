// The production set-up tool (scripts/supabase-admin.mjs) against a fake database: migrations apply in order,
// stop at the first failure, are verified object by object, and never run if a failed query could leave part
// of its work behind; the RLS audit flags every kind of exposure.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { expectations, verifyQuery, migrate, judgeRls, listMigrations, client } from "../scripts/supabase-admin.mjs";

function fakeDb({ applied = [], failOn = null, missing = [], atomic = true } = {}) {
  const ledger = new Set(applied), ran = [];
  let probe = false;
  const sql = async (q) => {
    if (q.includes("_gradify_atomic_probe (x int)")) { probe = !atomic; throw new Error("division by zero"); }
    if (q.includes("to_regclass('public._gradify_atomic_probe')")) return [{ left: probe }];
    if (q.startsWith("drop table if exists public._gradify_atomic_probe")) { probe = false; return []; }
    if (q.includes("create schema if not exists supabase_migrations")) return [];
    if (q.startsWith("select version from supabase_migrations")) return [...ledger].map((version) => ({ version }));
    const m = q.match(/values \('(\d{14})'/);
    if (m) { if (failOn && q.includes(failOn)) throw new Error(`syntax error near "${failOn}"`); ledger.add(m[1]); ran.push(m[1]); return []; }
    if (q.startsWith("select ")) { const n = (q.match(/ as c\d+/g) || []).length, row = {}; for (let i = 0; i < n; i++) row[`c${i}`] = true; for (const i of missing) row[`c${i}`] = false; return [row]; }
    return [];
  };
  return { db: { sql }, ran, ledger };
}
const list = [
  { file: "20260101000000_a.sql", version: "20260101000000", name: "a", sql: "create table public.a (id int, user_id uuid);\nalter table public.a enable row level security;\ncreate policy \"own a\" on public.a for all to authenticated using (user_id = auth.uid());" },
  { file: "20260102000000_b.sql", version: "20260102000000", name: "b", sql: "alter table public.a\n  add column note text;" },
  { file: "20260103000000_c.sql", version: "20260103000000", name: "c", sql: "create table public.c (id int); BROKEN" },
  { file: "20260104000000_d.sql", version: "20260104000000", name: "d", sql: "create table public.d (id int);" },
];

test("expectations are read from the migration itself", () => {
  const e = expectations(list[0].sql + "\n" + list[1].sql);
  assert.deepEqual(e.tables, ["a"]); assert.deepEqual(e.rls, ["a"]);
  assert.deepEqual(e.policies, [{ name: "own a", table: "a" }]);
  assert.deepEqual(e.columns, [{ table: "a", column: "note" }]);
  assert.equal(verifyQuery(e).checks.length, 4);
});

test("every real migration has something to verify", async () => {
  for (const m of await listMigrations()) assert.ok(verifyQuery(expectations(await readFile(m.url, "utf8"))).checks.length > 0, m.file);
});

test("migrations apply in order, already-applied ones are skipped, and the first failure stops the run", async () => {
  const f = fakeDb({ applied: ["20260101000000"], failOn: "BROKEN" });
  const r = await migrate(f.db, { list });
  assert.equal(r.ok, false); assert.equal(r.stoppedAt, "20260103000000_c.sql");
  assert.deepEqual(f.ran, ["20260102000000"], "b applied; c failed; d never attempted");
  assert.deepEqual(r.report.map((x) => x.result), ["already applied", "applied and verified", "FAILED"]);
  assert.match(r.report[2].error, /syntax error/);
});

test("a migration that ran but left something missing is reported, and stops the run", async () => {
  const r = await migrate(fakeDb({ missing: [1] }).db, { list: list.slice(0, 2) });
  assert.equal(r.ok, false);
  assert.equal(r.report[0].result, "APPLIED BUT INCOMPLETE");
  assert.deepEqual(r.report[0].missing, ["RLS on a"]);
});

test("nothing is applied if a failed query could leave part of its work behind", async () => {
  const f = fakeDb({ atomic: false });
  const r = await migrate(f.db, { list });
  assert.equal(r.ok, false); assert.deepEqual(f.ran, []);
  assert.match(r.report[0].error, /half-applied/);
});

test("the RLS audit flags tables without RLS, without policies, readable by anon, or not limited to the owner", () => {
  const out = judgeRls([
    { table: "good", rls: true, learner_owned: true, policies: 1, anon_can_read: false, policy_not_owner_scoped: false },
    { table: "off", rls: false, learner_owned: true, policies: 0, anon_can_read: false, policy_not_owner_scoped: false },
    { table: "empty", rls: true, learner_owned: true, policies: 0, anon_can_read: false, policy_not_owner_scoped: false },
    { table: "leaky", rls: true, learner_owned: true, policies: 1, anon_can_read: true, policy_not_owner_scoped: true },
    { table: "waitlist", rls: true, learner_owned: false, policies: 1, anon_can_read: false, policy_not_owner_scoped: true },
  ]);
  assert.deepEqual(out.map((r) => [r.table, r.ok]), [["good", true], ["off", false], ["empty", false], ["leaky", false], ["waitlist", true]]);
  assert.match(out[3].problems.join(), /signed-out visitors can read it/);
});

test("the tool refuses a malformed project ref and never needs a token in the repository", () => {
  assert.throws(() => client("not-a-ref"), /project ref/);
  assert.ok(client("abcdefghijklmnopqrst"));
});
