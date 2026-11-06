// Rehearsals in a real, temporary PostgreSQL (PGlite: Postgres compiled to WebAssembly, in this process),
// never touching production:
//   restore rehearsal   rebuild a database from the repository's migrations (exactly those recorded in the backup),
//                       load the backup's rows, snapshot it again and compare every row and value with the backup
//   migration rehearsal apply a pending migration to a copy restored from a fresh snapshot of production, and
//                       require every pre-existing value in every table to be unchanged
// Supabase's own pieces the migrations rely on are stood in for: the anon/authenticated roles, auth.users and
// auth.uid(). Used by scripts/supabase-admin.mjs (backup, migrate) and tests/pg-rehearsal.test.mjs.
import { PGlite } from "@electric-sql/pglite";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const STUB = `
do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then create role authenticated nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then create role service_role nologin; end if;
end $$;
create schema if not exists auth;
create table if not exists auth.users (id uuid primary key, email text, created_at timestamptz default now());
create or replace function auth.uid() returns uuid language sql stable as $f$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $f$;`;

/** A fresh temporary database with Supabase's stand-ins; returns an executor with the same shape as the live one. */
export async function tempDb() {
  const db = new PGlite();
  const sql = async (q) => { const r = await db.exec(q); return r.at(-1)?.rows ?? []; };
  await sql(STUB);
  return { sql, close: () => db.close() };
}

export const sha = (text) => createHash("sha256").update(text).digest("hex");
const lit = (x) => `'${String(x).replace(/'/g, "''")}'`;

// a logical snapshot through any executor (live Management API or a temporary database)
export async function snapshot(c) {
  const q = (s) => c.sql(s);
  const tables = (await q("select tablename from pg_tables where schemaname = 'public' and tablename not like '\\_gradify%' order by 1")).map((r) => r.tablename);
  const snap = {
    schema: {
      columns: await q("select table_name, column_name, data_type, is_nullable, column_default from information_schema.columns where table_schema = 'public' order by 1, ordinal_position"),
      policies: await q("select tablename, policyname, cmd, roles::text as roles, qual, with_check from pg_policies where schemaname = 'public' order by 1, 2"),
      migrations: await q("select version, name, statements from supabase_migrations.schema_migrations order by 1").catch(() => []),
    },
    counts: {}, rows: {},
    auth_users: Number((await q("select count(*)::int as n from auth.users"))[0]?.n ?? 0),
  };
  for (const t of tables) {
    snap.counts[t] = Number((await q(`select count(*)::int as n from public.${t}`))[0].n);
    snap.rows[t] = (await q(`select coalesce(json_agg(t), '[]'::json) as rows from public.${t} t`))[0].rows;
  }
  return snap;
}

// rows compared as canonical JSON, order-independent
const canon = (rows) => (rows || []).map((r) => JSON.stringify(Object.keys(r).sort().reduce((o, k) => ((o[k] = r[k]), o), {}))).sort();
export function compareSnapshots(a, b) {
  const diffs = [];
  for (const t of new Set([...Object.keys(a.rows), ...Object.keys(b.rows)])) {
    const x = canon(a.rows[t]), y = canon(b.rows[t]);
    if (x.length !== y.length) { diffs.push(`${t}: ${x.length} rows in the backup, ${y.length} after restoring`); continue; }
    const bad = x.findIndex((v, i) => v !== y[i]);
    if (bad >= 0) diffs.push(`${t}: row contents differ after restoring`);
  }
  return diffs;
}

/** Apply the repository's migrations listed in `versions` (in order) to a temporary database. */
export async function applyMigrations(c, list, versions) {
  await c.sql("create schema if not exists supabase_migrations; create table if not exists supabase_migrations.schema_migrations (version text primary key, statements text[], name text);");
  for (const m of list.filter((x) => versions.includes(x.version))) {
    const text = m.sql ?? (await readFile(m.url, "utf8"));
    await c.sql(`${text}\ninsert into supabase_migrations.schema_migrations (version, name, statements) values (${lit(m.version)}, ${lit(m.name)}, array[${lit(text)}]);`);
  }
}

/** Load a snapshot's rows into a database already built to the same schema. Triggers are off while loading, so
 *  rows arrive exactly as backed up (no XP added twice, no profiles made twice). */
export async function loadRows(c, snap) {
  const users = new Set();
  for (const [t, rows] of Object.entries(snap.rows)) for (const r of rows) { if (r.user_id) users.add(r.user_id); if (t === "profiles" && r.id) users.add(r.id); }
  let q = "set session_replication_role = replica;\n";
  if (users.size) q += `insert into auth.users (id) values ${[...users].map((u) => `(${lit(u)})`).join(", ")} on conflict do nothing;\n`;
  for (const [t, rows] of Object.entries(snap.rows)) if (rows.length) q += `insert into public.${t} overriding system value select * from json_populate_recordset(null::public.${t}, ${lit(JSON.stringify(rows))}::json);\n`;
  q += "set session_replication_role = origin;";
  await c.sql(q);
}

/** Restore rehearsal: does this backup actually restore, completely and exactly? */
export async function restoreRehearsal(snap, list) {
  const report = { ok: false, problems: [] };
  // the schema must be reproducible from the repository: every recorded migration exists here, unchanged
  const recorded = snap.schema.migrations || [];
  for (const r of recorded) {
    const m = list.find((x) => x.version === r.version);
    if (!m) { report.problems.push(`migration ${r.version} is recorded in the backup but not in the repository`); continue; }
    const text = m.sql ?? (await readFile(m.url, "utf8"));
    if (sha(text) !== sha((r.statements || [])[0] || "")) report.problems.push(`migration ${r.version} differs from the version that was applied`);
  }
  if (report.problems.length) return report;
  const c = await tempDb();
  try {
    await applyMigrations(c, list, recorded.map((r) => r.version));
    await loadRows(c, snap);
    const again = await snapshot(c);
    report.problems.push(...compareSnapshots(snap, again));
    const tablesA = Object.keys(snap.counts).sort().join(), tablesB = Object.keys(again.counts).sort().join();
    if (tablesA !== tablesB) report.problems.push(`tables differ after restoring: backup has [${tablesA}], restored has [${tablesB}]`);
    report.tables = Object.keys(again.counts).length; report.rows = Object.values(again.counts).reduce((a, b) => a + b, 0);
  } catch (e) { report.problems.push(`restore failed: ${e.message}`); }
  finally { await c.close(); }
  report.ok = report.problems.length === 0;
  return report;
}

// ---------- content checksums: every value, not just row counts ----------
/** The columns each public table has now (the values a migration must not change). */
export async function columnsNow(c) {
  const rows = await c.sql("select table_name, column_name from information_schema.columns where table_schema = 'public' and table_name in (select tablename from pg_tables where schemaname = 'public') order by table_name, ordinal_position");
  const out = {}; for (const r of rows) if (r.table_name && r.column_name) (out[r.table_name] ||= []).push(r.column_name);
  return out;
}
/** One checksum per table over the given columns: md5 of every row's values, sorted. */
export async function checksums(c, cols) {
  const tables = Object.keys(cols); if (!tables.length) return {};
  const q = `select ${tables.map((t, i) => `(select md5(coalesce(string_agg(r, '|' order by r), '')) from (select row(${cols[t].map((k) => `"${k}"`).join(", ")})::text as r from public.${t}) x) as c${i}`).join(", ")}`;
  const row = (await c.sql(q))[0] || {};
  return Object.fromEntries(tables.map((t, i) => [t, row[`c${i}`]]));
}
export const changed = (a, b) => Object.keys(a).filter((t) => a[t] !== b[t]);

/** Migration rehearsal: apply one migration to a copy of `snap` and check every pre-existing value survives. */
export async function rehearseMigration(snap, list, migration) {
  const c = await tempDb();
  try {
    await applyMigrations(c, list, (snap.schema.migrations || []).map((r) => r.version));
    await loadRows(c, snap);
    const cols = await columnsNow(c), before = await checksums(c, cols);
    const text = migration.sql ?? (await readFile(migration.url, "utf8"));
    try { await c.sql(text); } catch (e) { return { ok: false, problems: [`the migration fails on a copy of the data: ${e.message}`] }; }
    const after = await checksums(c, cols), diff = changed(before, after);
    return { ok: diff.length === 0, problems: diff.map((t) => `${t}: existing values changed`), tables: Object.keys(cols).length };
  } finally { await c.close(); }
}
