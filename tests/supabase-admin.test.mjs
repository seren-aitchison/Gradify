// The production set-up tool (scripts/supabase-admin.mjs) against a fake database: migrations apply in order,
// stop at the first failure, are verified object by object, and never run if a failed query could leave part
// of its work behind; the RLS audit flags every kind of exposure.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { UnverifiableRevoke, expectations, verifyQuery, migrate, judgeRls, listMigrations, client, destructive } from "../scripts/supabase-admin.mjs";

function fakeDb({ applied = [], failOn = null, missing = [], atomic = true, users = 0, rows = {}, loseRowsOn = null } = {}) {
  const ledger = new Set(applied), ran = [], counts = { ...rows };
  let probe = false;
  const sql = async (q) => {
    if (q.includes("from auth.users")) return [{ n: users }];
    if (q.startsWith("select tablename from pg_tables")) return Object.keys(counts).map((tablename) => ({ tablename }));
    if (q.startsWith("select (select count(*)")) { const row = {}; Object.values(counts).forEach((n, i) => { row[`c${i}`] = n; }); return [row]; }
    if (q.includes("_gradify_atomic_probe (x int)")) { probe = !atomic; throw new Error("division by zero"); }
    if (q.includes("to_regclass('public._gradify_atomic_probe')")) return [{ left: probe }];
    if (q.startsWith("drop table if exists public._gradify_atomic_probe")) { probe = false; return []; }
    if (q.includes("create schema if not exists supabase_migrations")) return [];
    if (q.startsWith("select version from supabase_migrations")) return [...ledger].map((version) => ({ version }));
    const m = q.match(/values \('(\d{14})'/);
    if (m) { if (failOn && q.includes(failOn)) throw new Error(`syntax error near "${failOn}"`); ledger.add(m[1]); ran.push(m[1]); if (loseRowsOn === m[1]) counts.cards = 0; return []; }
    if (q.startsWith("select ")) { const n = (q.match(/ as c\d+/g) || []).length, row = {}; for (let i = 0; i < n; i++) row[`c${i}`] = true; for (const i of missing) row[`c${i}`] = false; return [row]; }
    return [];
  };
  return { db: { sql }, ran, ledger };
}
const list = [
  { file: "20260101000000_a.sql", version: "20260101000000", name: "a", sql: "create table public.a (id int, user_id uuid);\nalter table public.a enable row level security;\ncreate policy \"own a\" on public.a for all to authenticated using (user_id = auth.uid());" },
  { file: "20260102000000_b.sql", version: "20260102000000", name: "b", sql: "alter table public.a\n  add column note text;" },
  { file: "20260103000000_c.sql", version: "20260103000000", name: "c", sql: "create table public.c (id int BROKEN);" },
  { file: "20260104000000_d.sql", version: "20260104000000", name: "d", sql: "create table public.d (id int);" },
];

test("expectations are read from the migration itself", () => {
  const e = expectations(list[0].sql + "\n" + list[1].sql);
  assert.deepEqual(e.tables, ["a"]); assert.deepEqual(e.rls, ["a"]);
  assert.deepEqual(e.policies, [{ name: "own a", table: "a" }]);
  assert.deepEqual(e.columns, [{ table: "a", column: "note" }]);
  assert.equal(verifyQuery(e).checks.length, 4);
});

test("revoked table privileges are verified: each role must hold none of them afterwards", () => {
  const e = expectations("revoke truncate, maintain on table public.goals from anon, authenticated;\nrevoke all on public.ai_cache from anon;");
  assert.deepEqual(e.revoked, [
    { table: "goals", role: "anon", privileges: ["TRUNCATE", "MAINTAIN"] },
    { table: "goals", role: "authenticated", privileges: ["TRUNCATE", "MAINTAIN"] },
    { table: "ai_cache", role: "anon", privileges: ["SELECT", "INSERT", "UPDATE", "DELETE", "TRUNCATE", "REFERENCES", "TRIGGER", "MAINTAIN"] },
  ]);
  const q = verifyQuery(e);
  assert.equal(q.checks.length, 3);
  assert.match(q.query, /not \(has_table_privilege\('anon', 'public\.goals', 'TRUNCATE'\) or has_table_privilege\('anon', 'public\.goals', 'MAINTAIN'\)\)/);
});

test("a revoke the tool can't verify is refused, never silently skipped", () => {
  for (const sql of [
    "revoke select on table public.x from public;",                       // PUBLIC: has_table_privilege can't check it
    "revoke select on table public.x from anon, PUBLIC;",                 // PUBLIC alongside a checkable role
    "revoke grant option for select on table public.x from anon;",        // not a privilege it can check
    "revoke select on table public.x from anon cascade;",                 // not a single role name
    "revoke usage on table public.x from anon;",                          // not a table privilege
  ]) assert.throws(() => expectations(sql), (e) => e instanceof UnverifiableRevoke && /Refused rather than skipped/.test(e.message), sql);
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

test("destructive statements are refused; widening a constraint and function bodies are allowed", async () => {
  assert.deepEqual(destructive("alter table public.t drop constraint k; alter table public.t add constraint k check (x > 0);"), []);
  assert.deepEqual(destructive("create function public.f() returns trigger language plpgsql as $$ begin update public.profiles set xp = 1; return new; end $$;"), []);
  for (const bad of ["drop table public.cards;", "delete from public.cards;", "truncate public.cards;", "update public.profiles set xp = 0;", "alter table public.cards drop column front;", "alter table public.cards rename to old_cards;", "alter table public.t drop constraint k;"])
    assert.equal(destructive(bad).length, 1, bad);
  const f = fakeDb();
  const r = await migrate(f.db, { list: [{ file: "20260105000000_x.sql", version: "20260105000000", name: "x", sql: "delete from public.cards;" }] });
  assert.equal(r.ok, false); assert.equal(r.report.at(-1).result, "REFUSED"); assert.deepEqual(f.ran, []);
});

test("existing learner data stops the run until the owner has taken a full backup", async () => {
  const f = fakeDb({ users: 3, rows: { cards: 12 } });
  const r = await migrate(f.db, { list: list.slice(0, 2) });
  assert.equal(r.ok, false); assert.match(r.report[0].error, /3 accounts and 12 rows/); assert.deepEqual(f.ran, []);
  const ok = await migrate(fakeDb({ users: 3, rows: { cards: 12 } }).db, { list: list.slice(0, 2), backedUp: true });
  assert.equal(ok.ok, true);
});

test("a migration after which any table has fewer rows stops the run", async () => {
  const f = fakeDb({ users: 1, rows: { cards: 5 }, loseRowsOn: "20260101000000" });
  const r = await migrate(f.db, { list: list.slice(0, 2), backedUp: true });
  assert.equal(r.ok, false); assert.equal(r.report[0].result, "EXISTING DATA CHANGED"); assert.ok(r.report[0].gone.includes("cards: 5 → 0"), JSON.stringify(r.report[0].gone));
  assert.deepEqual(f.ran, ["20260101000000"], "nothing after it runs");
});

test("--next applies exactly one migration and pauses for review", async () => {
  const f = fakeDb();
  const r = await migrate(f.db, { list: list.slice(0, 2), next: true });
  assert.equal(r.ok, true); assert.equal(r.paused, "20260101000000_a.sql"); assert.deepEqual(f.ran, ["20260101000000"]);
});


test("the token scope check passes a project-only token and fails a broader one, without reading any response body", async () => {
  const { tokenScope } = await import("../scripts/supabase-admin.mjs");
  const ref = "abcdefghijklmnopqrst", c = { ref };
  const fake = (broad) => async (u) => {
    const p = new URL(u).pathname.replace("/v1", "");
    const allowed = p.startsWith(`/projects/${ref}`) && !p.endsWith("/api-keys");
    const status = allowed ? 200 : broad ? 200 : 403;
    return { status, arrayBuffer: async () => new ArrayBuffer(0), json: async () => (p === "/projects" ? [{ id: ref }, { id: "otherprojectother000" }] : {}) };
  };
  assert.equal((await tokenScope(c, fake(false), "t")).ok, true);
  const broad = await tokenScope(c, fake(true), "t");
  assert.equal(broad.ok, false);
  assert.deepEqual(broad.rows.filter((r) => !r.ok).map((r) => r.check), ["Cannot list projects across the account", "Cannot read organisations", "Cannot read this project's API keys (not needed)"]);
});

test("the migration checker allows seed rows only in new tables, and function permissions", async () => {
  const { destructive } = await import("../scripts/supabase-admin.mjs");
  assert.deepEqual(destructive("create table public.t (a int);\ninsert into public.t (a) values (1);"), []);
  assert.equal(destructive("insert into public.profiles (id) values (gen_random_uuid());").length, 1, "insert into an existing table is refused");
  assert.deepEqual(destructive("revoke all on function public.f(uuid) from public, anon;\ngrant execute on function public.f(uuid) to authenticated;"), []);
  assert.deepEqual(destructive("create or replace function public.f() returns table (a int, b text) language sql stable as $$ select 1, 'x' $$;"), []);
  assert.equal(destructive("update public.profiles set xp = 0;").length, 1, "updates stay refused");
  assert.equal(destructive("drop policy \"p\" on public.profiles;").length, 1, "dropping a policy stays refused");
});

test("owner settings may be changed one keyed row at a time; learner tables and broad updates are still refused", async () => {
  const { configUpdates } = await import("../scripts/supabase-admin.mjs");
  const ok = "update public.ai_limits set per_period = 40 where feature = 'tutor' and plan = 'pro';\nupdate public.ai_plan_caps set monthly_pence = 500, conversation_turns = 30 where plan = 'pro';\nupdate public.ai_settings set gbp_per_usd = 0.79 where id = true;";
  assert.deepEqual(destructive(ok), []);
  assert.deepEqual(configUpdates(ok).sort(), ["ai_limits", "ai_plan_caps", "ai_settings"]);
  for (const bad of [
    "update public.ai_limits set per_period = 40;",                                         // no key: every row
    "update public.ai_limits set per_period = per_period * 2 where plan = 'pro';",          // not a literal
    "update public.profiles set xp = 0 where user_id = 'x';",                                // learner data
    "update public.subscriptions set status = 'active' where user_id = 'x';",
    "update public.ai_limits set per_period = (select 1) where plan = 'pro';",
    "update public.ai_limits set per_period = 1 where plan = 'pro' or true;",
  ]) assert.ok(destructive(bad).length, bad);
  assert.deepEqual(configUpdates("update public.profiles set xp = 0 where user_id = 'x';"), []);
});
