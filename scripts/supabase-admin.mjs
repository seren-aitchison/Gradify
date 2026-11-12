// Production set-up of Gradify's Supabase project, one checked step at a time, with evidence written down.
// Uses the Supabase Management API (api.supabase.com) with a personal access token. The token is never read
// from this repository or printed: give it as SUPABASE_ACCESS_TOKEN, or let a credential-injecting proxy add it.
//
//   node scripts/supabase-admin.mjs preflight    <ref>   read-only: health, secrets by name, existing data and schema
//   node scripts/supabase-admin.mjs status       <ref>   project health, functions, names of secrets set
//   node scripts/supabase-admin.mjs backup       <ref>   schema, row counts and public-table rows → a file OUTSIDE the repo
//   node scripts/supabase-admin.mjs migrate      <ref>   apply pending migrations in order, each in a transaction, verified;
//                                                        --next applies one and stops; refuses destructive SQL, stops if
//                                                        any table loses rows or learner data exists without a backup
//   node scripts/supabase-admin.mjs rls-audit    <ref>   every public table: RLS on, policies present, nothing readable by anon
//   node scripts/supabase-admin.mjs auth-config  <ref>   site URL and sign-in redirect URLs for getgradify.com
// Each command prints a markdown report and, with --write, appends it to docs/BACKEND-LOG.md.
// Nothing here ever prints a key, a secret's value, or a learner's data.
import { readFile, writeFile, appendFile, readdir, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { homedir } from "node:os";
import { resolve, relative, isAbsolute } from "node:path";
import { snapshot, restoreRehearsal, rehearseMigration, columnsNow, checksums, changed } from "./pg-rehearsal.mjs";

const API = "https://api.supabase.com/v1";
const root = new URL("../", import.meta.url);

export function client(ref, { token = process.env.SUPABASE_ACCESS_TOKEN || `sbp_${"0".repeat(40)}`   /* a placeholder the credential proxy replaces; never a real token */, fetch: f = globalThis.fetch.bind(globalThis) } = {}) {
  if (!/^[a-z0-9]{20}$/.test(ref || "")) throw new Error("Give the project ref: the 20-letter id in https://<ref>.supabase.co");
  const call = async (method, path, body) => {
    const r = await f(`${API}${path}`, { method, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body) });
    const text = await r.text(); let data = null; try { data = text ? JSON.parse(text) : null; } catch { data = text; }
    if (!r.ok) throw Object.assign(new Error(`${method} ${path}: HTTP ${r.status} ${typeof data === "string" ? data.slice(0, 300) : data?.message || JSON.stringify(data).slice(0, 300)}`), { status: r.status, data });
    return data;
  };
  return { ref, call, sql: (query) => call("POST", `/projects/${ref}/database/query`, { query }) };
}

// ---------- what each migration must leave behind ----------
// Parsed from the SQL itself, so the check can't drift from the migration.
// what "all" means for a table or view (PostgreSQL 17+, which production runs)
const TABLE_PRIVILEGES = ["SELECT", "INSERT", "UPDATE", "DELETE", "TRUNCATE", "REFERENCES", "TRIGGER", "MAINTAIN"];
/** Thrown for a revoke the tool can't verify. migrate refuses the migration before rehearsing or applying it. */
export class UnverifiableRevoke extends Error {}
// Fails closed: every privilege must be one PostgreSQL names for tables, and every grantee a plain role that
// has_table_privilege can check. PUBLIC can't be passed to has_table_privilege, so a revoke from PUBLIC is refused until
// the tool can verify it; so are GRANT OPTION FOR, CASCADE/RESTRICT and anything else it doesn't understand.
function revokedPrivileges(privs, table, roles) {
  const refuse = (why) => { throw new UnverifiableRevoke(`can't verify "revoke ${privs.trim()} on public.${table} from ${roles.trim()}": ${why}. Refused rather than skipped.`); };
  const named = privs.trim().toLowerCase();
  const p = named === "all" || named === "all privileges" ? TABLE_PRIVILEGES : privs.split(",").map((x) => x.trim().toUpperCase());
  for (const x of p) if (!TABLE_PRIVILEGES.includes(x)) refuse(`"${x}" isn't a table privilege it can check`);
  const rs = roles.split(",").map((r) => r.trim());
  for (const r of rs) {
    if (!/^[a-z_][a-z0-9_]*$/i.test(r)) refuse(`"${r}" isn't a single role name`);
    if (r.toLowerCase() === "public") refuse("revokes from PUBLIC aren't verifiable yet");
  }
  return rs.map((role) => ({ table, role, privileges: p }));
}
export function expectations(sql) {
  const s = sql.replace(/--.*$/gm, "");
  const all = (re) => [...s.matchAll(re)].map((m) => m.slice(1));
  return {
    tables: all(/create table (?:if not exists )?public\.(\w+)/gi).map(([t]) => t),
    rls: all(/alter table public\.(\w+) enable row level security/gi).map(([t]) => t),
    policies: all(/create policy "([^"]+)" on public\.(\w+)/gi).map(([name, table]) => ({ name, table })),
    columns: all(/alter table public\.(\w+)\s+((?:\s*add column [^;]+?,?)+);/gi).flatMap(([table, adds]) => [...adds.matchAll(/add column (?:if not exists )?(\w+)/gi)].map((m) => ({ table, column: m[1] }))),
    triggers: all(/create trigger (\w+)/gi).map(([t]) => t),
    functions: all(/create (?:or replace )?function public\.(\w+)/gi).map(([f]) => f),
    views: all(/create (?:or replace )?view public\.(\w+)/gi).map(([v]) => v),
    constraints: all(/add constraint (\w+)/gi).map(([c]) => c),
    indexes: all(/create (?:unique )?index (?:if not exists )?(\w+)/gi).map(([i]) => i),
    // table privileges a migration takes away: each (table, role) must afterwards hold none of them. A revoke this
    // can't verify is refused, never skipped (see revokedPrivileges)
    revoked: all(/revoke ([\w, ]+?) on (?:table )?public\.(\w+) from ([\w, ]+)/gi).flatMap(([privs, table, roles]) => revokedPrivileges(privs, table, roles)),
  };
}
const lit = (x) => `'${String(x).replace(/'/g, "''")}'`;
/** The checks as statements that raise an error (and so roll back the query they're part of) when one doesn't hold.
 *  Each is a DO block: if the check is false, RAISE EXCEPTION names it. These are added by this tool at apply time;
 *  migration files themselves still may not contain DO blocks (see destructive()). */
export function guards(v) {
  return v.exprs.map((q, i) => `do $gradify_check$ begin if not (${q}) then raise exception '%', ${lit(`migration check failed: ${v.checks[i]}`)}; end if; end $gradify_check$;`).join("\n");
}
// one query that returns, for each expected object, whether it exists
export function verifyQuery(e) {
  const checks = [
    ...e.tables.map((t) => [`table ${t}`, `exists (select 1 from pg_tables where schemaname = 'public' and tablename = ${lit(t)})`]),
    ...e.rls.map((t) => [`RLS on ${t}`, `coalesce((select relrowsecurity from pg_class where oid = to_regclass(${lit(`public.${t}`)})), false)`]),
    ...e.policies.map((p) => [`policy "${p.name}" on ${p.table}`, `exists (select 1 from pg_policies where schemaname = 'public' and tablename = ${lit(p.table)} and policyname = ${lit(p.name)})`]),
    ...e.columns.map((c) => [`column ${c.table}.${c.column}`, `exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = ${lit(c.table)} and column_name = ${lit(c.column)})`]),
    ...e.triggers.map((t) => [`trigger ${t}`, `exists (select 1 from pg_trigger where tgname = ${lit(t)} and not tgisinternal)`]),
    ...e.functions.map((f) => [`function ${f}`, `exists (select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' and p.proname = ${lit(f)})`]),
    ...e.views.map((v) => [`view ${v}`, `exists (select 1 from pg_views where schemaname = 'public' and viewname = ${lit(v)})`]),
    ...e.constraints.map((c) => [`constraint ${c}`, `exists (select 1 from pg_constraint where conname = ${lit(c)})`]),
    ...(e.indexes || []).map((x) => [`index ${x}`, `exists (select 1 from pg_indexes where schemaname = 'public' and indexname = ${lit(x)})`]),
    ...(e.revoked || []).map((r) => [`${r.role} holds no ${r.privileges.join("/")} on ${r.table}`, `not (${r.privileges.map((p) => `has_table_privilege(${lit(r.role)}, ${lit(`public.${r.table}`)}, ${lit(p)})`).join(" or ")})`]),
  ];
  return { checks: checks.map(([label]) => label), exprs: checks.map(([, q]) => q), query: checks.length ? `select ${checks.map(([, q], i) => `${q} as c${i}`).join(", ")};` : "select 1 as c0;" };
}

// ---------- safety checks ----------
// Split SQL into top-level statements, respecting 'strings', "identifiers", $tag$ bodies $tag$ and comments.
export function statements(sql) {
  const out = []; let cur = "", i = 0;
  while (i < sql.length) {
    const c = sql[i], two = sql.slice(i, i + 2);
    if (two === "--") { const e = sql.indexOf("\n", i); i = e < 0 ? sql.length : e; continue; }
    if (two === "/*") { const e = sql.indexOf("*/", i + 2); i = e < 0 ? sql.length : e + 2; continue; }
    if (c === "'" || c === '"') { let j = i + 1; while (j < sql.length && !(sql[j] === c && sql[j + 1] !== c)) j += sql[j] === c ? 2 : 1; cur += sql.slice(i, j + 1); i = j + 1; continue; }
    const tag = sql.slice(i).match(/^\$[A-Za-z_]*\$/);
    if (tag) { const e = sql.indexOf(tag[0], i + tag[0].length); const end = e < 0 ? sql.length : e + tag[0].length; cur += "$$BODY$$"; i = end; continue; }
    if (c === ";") { if (cur.trim()) out.push(cur.trim()); cur = ""; i++; continue; }
    cur += c; i++;
  }
  if (cur.trim()) out.push(cur.trim());
  return out.map((x) => x.replace(/\s+/g, " "));
}
// What a migration may contain: an allowlist, so anything unrecognised (DO blocks, EXECUTE, CALL, COPY, data
// changes, grants, disabling RLS, ownership changes…) is refused rather than guessed about. Code inside a
// function body only runs when the function is called later (triggers fire on future writes, not on existing
// rows), so bodies are skipped; but clauses evaluated against EXISTING rows (column defaults, check
// constraints, generated columns, index expressions) may not call functions defined in the project.
const SAFE = [
  /^create table (if not exists )?public\.\w+ \(/i,
  /^create (unique )?index (if not exists )?\w+ on public\.\w+ /i,
  /^create policy "[^"]+" on public\.\w+ /i,
  /^create (or replace )?function public\.\w+\(.*\) returns ([\w ]+|table \([\w, ]+\)) language (plpgsql|sql)( (stable|immutable|volatile))?( security definer set search_path = [\w, ]+)? as \$\$BODY\$\$$/i,
  /^create trigger \w+ (before|after) (insert|update|delete)( or (insert|update|delete))* on (public|auth)\.\w+ for each row execute function public\.\w+\(\)$/i,
  /^create (or replace )?view public\.\w+ with \(security_invoker = true\) as select /i,
  /^create schema if not exists \w+$/i,
  /^alter table public\.\w+ enable row level security$/i,
  /^revoke [\w, ]+ on (table )?public\.\w+ from [\w, ]+$/i,
  // who may call a function: permissions only, never data
  /^revoke (all|execute) on function public\.\w+\([\w, ]*\) from [\w, ]+$/i,
  /^grant execute on function public\.\w+\([\w, ]*\) to [\w, ]+$/i,
  /^comment on /i,
];
const ROW_EVALUATED = /\b(default|check|generated always as)\b[^,]*\bpublic\.\w+\s*\(/i;
// Owner settings tables hold no learner data: a migration may change their values, but only one keyed row at a time,
// to plain literals, e.g. update public.ai_limits set per_period = 40 where feature = 'tutor' and plan = 'pro'.
// Rows in these tables that a migration updates are left out of the "existing values unchanged" comparison;
// every other table, and every other row count, is still checked.
export const CONFIG_TABLES = ["ai_limits", "ai_plan_caps", "ai_settings", "ai_prices", "ai_feature_models"];
const LITERAL = String.raw`(?:'[^']*'|-?\d+(?:\.\d+)?|true|false)`;
const CONFIG_UPDATE = new RegExp(String.raw`^update public\.(${CONFIG_TABLES.join("|")}) set \w+ = ${LITERAL}(?:, \w+ = ${LITERAL})* where \w+ = ${LITERAL}(?: and \w+ = ${LITERAL})*$`, "i");
/** The owner settings tables a migration updates (their changed values are intended). */
export const configUpdates = (sql) => [...new Set(statements(sql).map((st) => st.match(CONFIG_UPDATE)?.[1]?.toLowerCase()).filter(Boolean))];
export function destructive(sql) {
  const found = [], stmts = statements(sql);
  // seed rows may go only into tables this same migration creates (which have no existing rows to change)
  const created = new Set(stmts.map((s) => s.match(/^create table (?:if not exists )?public\.(\w+) \(/i)?.[1]?.toLowerCase()).filter(Boolean));
  for (const st of stmts) {
    const lower = st.toLowerCase();
    if (CONFIG_UPDATE.test(st)) continue;
    const ins = st.match(/^insert into public\.(\w+) \(/i);
    if (ins) { if (!created.has(ins[1].toLowerCase())) found.push(`insert into an existing table: ${st.slice(0, 100)}`); continue; }
    if (/^alter table public\.\w+ /i.test(st) && !/ enable row level security$/i.test(st)) {
      // ALTER TABLE: each comma-separated action must be add column / add constraint / drop constraint (re-added)
      const actions = st.replace(/^alter table public\.\w+ /i, "").split(/,(?![^(]*\))/).map((x) => x.trim());
      for (const act of actions) {
        if (/^add column (if not exists )?\w+ /i.test(act) || /^add constraint \w+ (check|unique|foreign key|primary key)/i.test(act)) { if (ROW_EVALUATED.test(act) || /\bpublic\.\w+\s*\(/.test(act.replace(/references public\.\w+/gi, ""))) found.push(`calls a project function on existing rows: ${act.slice(0, 100)}`); continue; }
        const d = act.match(/^drop constraint (if exists )?(\w+)$/i);
        if (d) { if (!new RegExp(`add constraint ${d[2]}\\b`, "i").test(sql)) found.push(`drop constraint ${d[2]} (not re-added)`); continue; }
        found.push(`ALTER TABLE action not allowed: ${act.slice(0, 100)}`);
      }
      continue;
    }
    if (!SAFE.some((re) => re.test(st))) { found.push(`statement not allowed: ${st.slice(0, 100)}`); continue; }
    if (/^create (unique )?index /i.test(st) && /\bpublic\.\w+\s*\(/.test(st.replace(/ on public\.\w+/i, ""))) found.push(`index expression calls a project function: ${st.slice(0, 100)}`);
    if (/^create table /i.test(st) && ROW_EVALUATED.test(lower.replace(/references public\.\w+/g, ""))) found.push(`calls a project function in a column default or check: ${st.slice(0, 100)}`);
  }
  return found;
}
// rows in every public table, to prove a migration removed none
export async function rowCounts(c) {
  const tables = (await c.sql("select tablename from pg_tables where schemaname = 'public' and tablename not like '\\_gradify%' order by 1")).map((r) => r.tablename);
  if (!tables.length) return {};
  const row = (await c.sql(`select ${tables.map((t, i) => `(select count(*) from public.${t})::bigint as c${i}`).join(", ")}`))[0] || {};
  return Object.fromEntries(tables.map((t, i) => [t, Number(row[`c${i}`])]));
}
export const lost = (before, after) => Object.entries(before).filter(([t, n]) => (after[t] ?? 0) < n).map(([t, n]) => `${t}: ${n} → ${after[t] ?? 0}`);

// the Supabase CLI's own migration ledger, so `supabase db push` later agrees with what was applied here
const LEDGER = `create schema if not exists supabase_migrations;
create table if not exists supabase_migrations.schema_migrations (version text primary key, statements text[], name text);`;

export async function listMigrations() {
  const dir = new URL("supabase/migrations/", root);
  return (await readdir(dir)).filter((f) => /^\d{14}_.+\.sql$/.test(f)).sort().map((f) => ({ file: f, version: f.slice(0, 14), name: f.slice(15, -4), url: new URL(f, dir) }));
}

/** Apply pending migrations in order. Stops at the first failure and reports it; never skips one. */
export async function migrate(c, { list, log = () => {}, next = false, backedUp = false, rehearse = false } = {}) {
  list ||= await listMigrations();
  // nothing pending: nothing to back up or apply (checked before the backup gate, which only matters for changes)
  const recordedAlready = await c.sql("select version from supabase_migrations.schema_migrations").catch(() => []);
  if (recordedAlready.length && list.every((m) => recordedAlready.some((r) => r.version === m.version))) {
    for (const m of list) log(`= ${m.file} (already applied)`);
    return { ok: true, report: list.map((m) => ({ ...m, result: "already applied" })) };
  }
  // existing learner data needs a full backup taken by the owner (dashboard or supabase db dump) first
  const users = Number((await c.sql("select count(*)::int as n from auth.users"))[0]?.n || 0);
  const before0 = await rowCounts(c), rows0 = Object.values(before0).reduce((a, b) => a + b, 0);
  if ((users || rows0) && !backedUp) return { ok: false, stoppedAt: "(before any migration)", report: [{ file: "existing data", result: "STOPPED", error: `The project already has ${users} accounts and ${rows0} rows. Take a full backup yourself (Database → Backups, or supabase db dump), check it, then rerun with --existing-data-backed-up.` }] };
  // prove that a multi-statement query is all-or-nothing on this project before relying on it
  await c.sql("drop table if exists public._gradify_atomic_probe;");
  await c.sql("create table public._gradify_atomic_probe (x int); select 1 / 0;").catch(() => {});
  const leftover = (await c.sql("select to_regclass('public._gradify_atomic_probe') is not null as left")).at(0)?.left;
  if (leftover) { await c.sql("drop table if exists public._gradify_atomic_probe;"); return { ok: false, stoppedAt: "(before any migration)", report: [{ file: "atomicity probe", result: "FAILED", error: "A failed query left part of its work behind, so a failed migration could be half-applied. Not applying anything; apply with the Supabase CLI instead." }] }; }
  log("✓ atomicity probe: a failed query leaves nothing behind");
  await c.sql(LEDGER);
  const done = new Set((await c.sql("select version from supabase_migrations.schema_migrations")).map((r) => r.version));
  const report = [];
  for (const m of list) {
    const sql = m.sql ?? (await readFile(m.url, "utf8"));
    const sha = createHash("sha256").update(sql).digest("hex").slice(0, 12);
    if (done.has(m.version)) { report.push({ ...m, result: "already applied", sha }); log(`= ${m.file} (already applied)`); continue; }
    const danger = destructive(sql);
    if (danger.length) { report.push({ ...m, result: "REFUSED", sha, error: `could change or remove existing data: ${danger.join("; ")}` }); log(`✗ ${m.file}: refused (${danger.join("; ")})`); return { ok: false, report, stoppedAt: m.file }; }
    // the checks this migration must pass, worked out before anything is rehearsed or applied: a revoke the tool
    // can't verify stops here, with nothing changed
    let v;
    try { v = verifyQuery(expectations(sql)); }
    catch (e) { if (!(e instanceof UnverifiableRevoke)) throw e; report.push({ ...m, result: "REFUSED", sha, error: e.message }); log(`✗ ${m.file}: refused (${e.message})`); return { ok: false, report, stoppedAt: m.file }; }
    // rehearse it first on a temporary copy of the current data (real PostgreSQL, never production)
    if (rehearse) {
      const r = await rehearseMigration(JSON.parse(JSON.stringify(await snapshot(c))), list, m, configUpdates(sql));
      if (!r.ok) { report.push({ ...m, result: "FAILED REHEARSAL", sha, error: r.problems.join("; ") }); log(`✗ ${m.file}: rehearsal on a copy failed (${r.problems.join("; ")})`); return { ok: false, report, stoppedAt: m.file }; }
      log(`✓ ${m.file}: rehearsed on a copy, every existing value unchanged`);
    }
    const before = await rowCounts(c), cols = await columnsNow(c), sums = await checksums(c, cols);
    const t0 = Date.now();
    try {
      // one query: the migration, its ledger entry and its checks commit together or not at all (all-or-nothing is
      // proved by the probe above). Each check that doesn't hold raises an error naming it, so the whole query is
      // rolled back and production is left exactly as it was.
      await c.sql(`${sql}\ninsert into supabase_migrations.schema_migrations (version, name, statements) values (${lit(m.version)}, ${lit(m.name)}, array[${lit(sql)}]);\n${guards(v)}`);
    } catch (e) {
      report.push({ ...m, result: "FAILED", sha, error: e.message });
      log(`✗ ${m.file}: ${e.message}`);
      return { ok: false, report, stoppedAt: m.file };
    }
    // and confirmed again after the commit, from a fresh query
    const row = (await c.sql(v.query))[0] || {};
    const missing = v.checks.filter((_, i) => row[`c${i}`] !== true);
    const intended = configUpdates(sql);
    const gone = [...lost(before, await rowCounts(c)), ...changed(sums, await checksums(c, cols)).filter((t) => !intended.includes(t)).map((t) => `${t}: existing values changed`)];
    const result = gone.length ? "EXISTING DATA CHANGED" : missing.length ? "APPLIED BUT INCOMPLETE" : "applied and verified";
    report.push({ ...m, result, sha, ms: Date.now() - t0, checked: v.checks.length, missing, gone });
    log(`${missing.length || gone.length ? "✗" : "✓"} ${m.file}: ${v.checks.length} objects checked, row counts kept${missing.length ? `; missing: ${missing.join(", ")}` : ""}${gone.length ? `; EXISTING DATA CHANGED: ${gone.join(", ")}` : ""}`);
    if (missing.length || gone.length) return { ok: false, report, stoppedAt: m.file };
    if (next) return { ok: true, report, paused: m.file };
  }
  return { ok: true, report };
}

// ---------- throwaway test accounts (created after the migrations, deleted at the end) ----------
// No person ever sees these passwords: each is generated here, kept in memory, and only its bcrypt hash (made
// locally) is sent to the database, so the plain password isn't in any query log. Creating users by SQL isn't an
// official Supabase API, so each account is proved by signing in with it; if that fails it is removed and the run
// stops. Emails are on example.com (reserved, never delivered to).
export async function createTestAccounts(c, n = 2) {
  const { default: bcrypt } = await import("bcryptjs");
  const { randomBytes, randomUUID } = await import("node:crypto");
  const tag = randomBytes(4).toString("hex"), out = [];
  for (let i = 0; i < n; i++) {
    const id = randomUUID(), email = `gradify-test-${tag}-${i + 1}@example.com`, password = randomBytes(24).toString("base64url");
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await c.sql(`insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token, email_change_token_new, email_change)
      values ('00000000-0000-0000-0000-000000000000', ${lit(id)}, 'authenticated', 'authenticated', ${lit(email)}, ${lit(hash)}, now(), '{"provider":"email","providers":["email"],"gradify_test":true}', '{}', now(), now(), '', '', '', '');
      insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
      values (gen_random_uuid(), ${lit(id)}, ${lit(id)}, ${lit(JSON.stringify({ sub: id, email, email_verified: true }))}::jsonb, 'email', now(), now(), now());`);
    out.push({ id, email, password });
  }
  return out;
}
// only ever deletes accounts this run created: matched by id AND the test marker AND the example.com address
export async function deleteTestAccounts(c, accounts) {
  if (!accounts.length) return 0;
  const ids = accounts.map((a) => lit(a.id)).join(", ");
  await c.sql(`delete from auth.users where id in (${ids}) and email like 'gradify-test-%@example.com' and raw_app_meta_data->>'gradify_test' = 'true';`);
  return Number((await c.sql(`select count(*)::int as n from auth.users where id in (${ids})`))[0]?.n ?? 0);
}

// ---------- row-level security audit over the whole public schema ----------
export const RLS_AUDIT = `
select c.relname as table,
       c.relrowsecurity as rls,
       exists (select 1 from information_schema.columns k where k.table_schema = 'public' and k.table_name = c.relname and k.column_name in ('user_id')) or c.relname = 'profiles' as learner_owned,
       (select count(*) from pg_policies p where p.schemaname = 'public' and p.tablename = c.relname) as policies,
       (select string_agg(p.policyname || ' [' || p.cmd || ' to ' || array_to_string(p.roles, ',') || ']', '; ') from pg_policies p where p.schemaname = 'public' and p.tablename = c.relname) as detail,
       exists (select 1 from pg_policies p where p.schemaname = 'public' and p.tablename = c.relname and p.cmd in ('SELECT', 'ALL') and (p.roles && array['anon', 'public']::name[])) as anon_can_read,
       exists (select 1 from pg_policies p where p.schemaname = 'public' and p.tablename = c.relname and p.cmd in ('SELECT', 'ALL', 'UPDATE', 'DELETE') and coalesce(p.qual, '') not like '%auth.uid()%') as policy_not_owner_scoped
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind = 'r' order by 1;`;
export function judgeRls(rows) {
  return rows.map((r) => {
    const problems = [];
    if (!r.rls) problems.push("row-level security is OFF");
    if (r.rls && Number(r.policies) === 0 && r.learner_owned) problems.push("RLS on but no policies (nobody can use it)");
    if (r.learner_owned && r.anon_can_read) problems.push("signed-out visitors can read it");
    if (r.learner_owned && r.policy_not_owner_scoped) problems.push("a read/change policy isn't limited to the row's owner");
    return { ...r, ok: problems.length === 0, problems };
  });
}

// ---------- commands ----------
const md = (rows, cols) => `| ${cols.join(" | ")} |\n|${cols.map(() => "---").join("|")}|\n${rows.map((r) => `| ${cols.map((k) => String(r[k] ?? "").replace(/\|/g, "/")).join(" | ")} |`).join("\n")}`;

async function status(c) {
  const p = await c.call("GET", `/projects/${c.ref}`);
  const fns = await c.call("GET", `/projects/${c.ref}/functions`).catch((e) => ({ error: e.message }));
  const secrets = await c.call("GET", `/projects/${c.ref}/secrets`).catch((e) => ({ error: e.message }));
  const names = Array.isArray(secrets) ? secrets.map((s) => s.name).sort() : [];
  return `Project ${p.name} (${c.ref}), region ${p.region}, status ${p.status}.

Functions: ${Array.isArray(fns) ? fns.map((f) => `${f.slug} (v${f.version}, ${f.status}, verify_jwt ${f.verify_jwt})`).join(", ") || "none deployed" : fns.error}

Secrets set (names only): ${names.join(", ") || "none"}. ANTHROPIC_API_KEY ${names.includes("ANTHROPIC_API_KEY") ? "is set" : "is NOT set"}.`;
}

export async function backup(c, out) {
  const at = new Date().toISOString().replace(/[:.]/g, "-");
  const dir = resolve(out || `${homedir()}/.gradify-backups`);
  const rel = relative(resolve(new URL(".", root).pathname), dir);
  if (!rel.startsWith("..") && !isAbsolute(rel)) throw new Error("Backups contain learner data: write them outside the repository.");
  await mkdir(dir, { recursive: true });
  const q = (s) => c.sql(s);
  // the same snapshot the rehearsals use (rows, counts, columns, policies, the applied migrations' SQL), plus
  // triggers and function definitions for the record
  const snap = { project: c.ref, at, ...(await snapshot(c)) };
  snap.schema.triggers = await q("select event_object_table as table, trigger_name, action_timing, event_manipulation from information_schema.triggers where trigger_schema in ('public', 'auth') order by 1, 2");
  snap.schema.functions = await q("select p.proname, pg_get_functiondef(p.oid) as def from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' order by 1");
  const tables = Object.keys(snap.counts);
  const file = `${dir}/gradify-${c.ref}-${at}.json`, text = JSON.stringify(snap);
  await writeFile(file, text, { mode: 0o600 });
  const sha = createHash("sha256").update(text).digest("hex");
  // independent check: read the file back from disk, recompute its hash, check every table's rows against its
  // count, and recount the live database to show nothing changed while the backup ran
  const back = await readFile(file, "utf8"), parsed = JSON.parse(back);
  const problems = [];
  if (createHash("sha256").update(back).digest("hex") !== sha) problems.push("the file on disk doesn't match what was written");
  for (const t of tables) if ((parsed.rows[t] || []).length !== parsed.counts[t]) problems.push(`${t}: ${parsed.rows[t]?.length} rows saved but ${parsed.counts[t]} counted`);
  const now = await rowCounts(c);
  for (const t of tables) if (now[t] !== snap.counts[t]) problems.push(`${t} changed during the backup (${snap.counts[t]} → ${now[t]})`);
  // and the real test: restore it into a separate temporary database and compare every row and value
  const rr = problems.length ? null : await restoreRehearsal(parsed, await listMigrations());
  if (rr && !rr.ok) problems.push(...rr.problems.map((x) => `restore rehearsal: ${x}`));
  if (problems.length) throw new Error(`Backup NOT verified: ${problems.join("; ")}. Nothing has been changed; don't migrate.`);
  return `Backup written to ${file} (sha256 ${sha.slice(0, 16)}…, readable only by you) and **verified**: re-read from disk with a matching hash, every table's saved rows equal its count, a fresh count of the live database matches, and it was **restored into a separate temporary PostgreSQL database** (built from the ${parsed.schema.migrations.length} recorded migrations) with every row and value identical (${rr.tables} tables, ${rr.rows} rows). ${tables.length} public tables, ${Object.values(snap.counts).reduce((a, b) => a + b, 0)} rows, ${snap.auth_users} accounts (counted, not copied). ${snap.schema.migrations.length} migrations already recorded.

Note: this is a logical snapshot through the API. Auth accounts and storage files aren't included; Supabase's own daily backups (and point-in-time recovery on paid plans) cover those.

${md(tables.map((t) => ({ table: t, rows: snap.counts[t] })), ["table", "rows"])}`;
}

// What the token can reach, judged only by HTTP status codes: every response body is discarded unread, so a
// token that turns out too broad never causes anything sensitive to be printed. Needed: this project, SQL,
// functions and secret names. Must be refused: other projects, organisation-level data and the API keys.
export async function tokenScope(c, f = globalThis.fetch.bind(globalThis), token = process.env.SUPABASE_ACCESS_TOKEN || `sbp_${"0".repeat(40)}`) {
  const code = async (method, path, body) => { const r = await f(`${API}${path}`, { method, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined }); await r.arrayBuffer().catch(() => {}); return r.status; };
  const need = [["read this project", "GET", `/projects/${c.ref}`], ["run SQL on this project", "POST", `/projects/${c.ref}/database/query`, { query: "select 1 as ok" }], ["list this project's Edge Functions", "GET", `/projects/${c.ref}/functions`], ["read this project's secret names", "GET", `/projects/${c.ref}/secrets`]];
  const deny = [["list projects across the account", "GET", "/projects"], ["read organisations", "GET", "/organizations"], ["read this project's API keys (not needed)", "GET", `/projects/${c.ref}/api-keys`]];
  const rows = [];
  for (const [what, m, p, b] of need) { const s = await code(m, p, b); rows.push({ check: `Can ${what}`, status: s, ok: s >= 200 && s < 300 }); }
  for (const [what, m, p] of deny) {
    let s = await code(m, p), ok = s === 401 || s === 403 || s === 404;
    // a project-scoped token may still "list projects" but see only this one: that's acceptable, checked by ref
    if (!ok && p === "/projects" && s === 200) { const r = await f(`${API}/projects`, { headers: { Authorization: `Bearer ${token}` } }); const list = await r.json().catch(() => []); ok = Array.isArray(list) && list.every((x) => x.id === c.ref || x.ref === c.ref); s = ok ? "200 (this project only)" : "200 (other projects visible)"; }
    rows.push({ check: `Cannot ${what}`, status: s, ok });
  }
  return { ok: rows.every((r) => r.ok), rows };
}

// read-only: everything that must be true before anything is changed
async function preflight(c, { acceptBroad = false } = {}) {
  const scope = await tokenScope(c);
  // --accept-broad-token: the project owner's explicit, logged decision to proceed with a token that reaches more
  // than this needs (Supabase personal tokens can't currently be narrowed). Nothing extra is read or printed.
  const override = !scope.ok && acceptBroad ? "\n\n**Token broader than needed: accepted by the project owner for this run (--accept-broad-token).** The script still reads nothing beyond this project and prints no key." : "";
  if (!scope.ok && !acceptBroad) return `**Token scope check failed: nothing else was run.**\n\n${md(scope.rows.map((r) => ({ ...r, result: r.ok ? "ok" : "FAIL" })), ["check", "status", "result"])}\n\nCreate a token restricted to the Gradify project with only: database (read and write), Edge Functions (read and deploy), secrets (read names).`;
  const st = await status(c);
  const users = Number((await c.sql("select count(*)::int as n from auth.users"))[0]?.n || 0);
  const counts = await rowCounts(c), rows = Object.values(counts).reduce((a, b) => a + b, 0);
  const planned = new Set(); for (const m of await listMigrations()) for (const t of expectations(await readFile(m.url, "utf8")).tables) planned.add(t);
  const clash = Object.keys(counts).filter((t) => planned.has(t));
  const recorded = await c.sql("select version from supabase_migrations.schema_migrations order by 1").catch(() => []);
  return `${st}

Existing data: ${users} accounts, ${rows} rows in ${Object.keys(counts).length} public tables. ${users || rows ? "**Learner data exists: this run expects a new, empty project. Stop, and take a full owner backup first if this data matters.**" : "The project is empty, as expected."}
Tables the migrations create that already exist: ${clash.join(", ") || "none"}. Migrations already recorded: ${recorded.length}.${clash.length && !recorded.length ? " **These tables exist but no migration is recorded: the project was set up by hand. Stop and compare the schema before applying anything.**" : ""}
Token scope:

${md(scope.rows.map((r) => ({ ...r, result: r.ok ? "ok" : "FAIL" })), ["check", "status", "result"])}

Changes made by this check: none.${override}`;
}

async function rlsAudit(c) {
  const rows = judgeRls(await c.sql(RLS_AUDIT));
  const bad = rows.filter((r) => !r.ok);
  return `${bad.length ? `**${bad.length} table(s) need attention.**` : "Every public table has row-level security, with policies limited to the row's owner where learners own the rows."}

${md(rows.map((r) => ({ table: r.table, rls: r.rls ? "on" : "OFF", "learner-owned": r.learner_owned ? "yes" : "no", policies: r.policies, result: r.ok ? "ok" : r.problems.join("; ") })), ["table", "rls", "learner-owned", "policies", "result"])}`;
}

async function authConfig(c) {
  const site = "https://getgradify.com";
  await c.call("PATCH", `/projects/${c.ref}/config/auth`, { site_url: `${site}/app.html`, uri_allow_list: `${site}/**` });
  const cfg = await c.call("GET", `/projects/${c.ref}/config/auth`);
  return `Site URL: ${cfg.site_url}. Redirect URLs: ${cfg.uri_allow_list}. Email confirmation required: ${cfg.mailer_autoconfirm ? "NO (auto-confirm is on)" : "yes"}. Email sign-in: ${cfg.external_email_enabled ? "on" : "off"}.`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, ref, ...rest] = process.argv.slice(2), write = rest.includes("--write");
  const c = client(ref);
  const titles = { preflight: "Preflight (read-only)", status: "Project status", backup: "Backup", migrate: "Migrations", "rls-audit": "Row-level security audit", "auth-config": "Sign-in configuration" };
  let body, failed = false;
  try {
    if (cmd === "status") body = await status(c);
    else if (cmd === "preflight") { body = await preflight(c, { acceptBroad: rest.includes("--accept-broad-token") }); failed = /\*\*(Learner data exists|These tables exist|Token scope check failed)/.test(body); }
    else if (cmd === "backup") body = await backup(c, rest.find((x) => !x.startsWith("--")));
    else if (cmd === "migrate") {
      const r = await migrate(c, { log: (l) => console.error(l), next: rest.includes("--next"), backedUp: rest.includes("--existing-data-backed-up"), rehearse: true });
      failed = !r.ok;
      body = `${r.paused ? `Applied and verified ${r.paused}; paused there (--next).` : r.ok ? "All migrations applied and verified." : `**Stopped at ${r.stoppedAt}.** Nothing after it was applied; the failed migration was rolled back.`}\n\n${md(r.report.map((m) => ({ migration: m.file, result: m.result, "objects checked": m.checked ?? "", sha256: m.sha, detail: m.error || (m.missing?.length ? `missing: ${m.missing.join(", ")}` : "") })), ["migration", "result", "objects checked", "sha256", "detail"])}`;
    } else if (cmd === "rls-audit") { body = await rlsAudit(c); failed = /need attention/.test(body); }
    else if (cmd === "auth-config") body = await authConfig(c);
    else { console.error("Commands: preflight, status, backup, migrate [--next] [--existing-data-backed-up], rls-audit, auth-config"); process.exit(2); }
  } catch (e) { body = `**Failed:** ${e.message}`; failed = true; }
  const entry = `\n## ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC · ${titles[cmd]} · ${ref}\n\n${body}\n`;
  console.log(entry);
  if (write) { await appendFile(new URL("docs/BACKEND-LOG.md", root), entry); console.error("Appended to docs/BACKEND-LOG.md"); }
  if (failed) process.exitCode = 1;
}
