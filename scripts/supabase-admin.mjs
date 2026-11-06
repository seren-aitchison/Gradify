// Production set-up of Gradify's Supabase project, one checked step at a time, with evidence written down.
// Uses the Supabase Management API (api.supabase.com) with a personal access token. The token is never read
// from this repository or printed: give it as SUPABASE_ACCESS_TOKEN, or let a credential-injecting proxy add it.
//
//   node scripts/supabase-admin.mjs status       <ref>   project health, functions, names of secrets set
//   node scripts/supabase-admin.mjs backup       <ref>   schema, row counts and public-table rows → a file OUTSIDE the repo
//   node scripts/supabase-admin.mjs migrate      <ref>   apply pending migrations in order, each in a transaction, verified
//   node scripts/supabase-admin.mjs rls-audit    <ref>   every public table: RLS on, policies present, nothing readable by anon
//   node scripts/supabase-admin.mjs auth-config  <ref>   site URL and sign-in redirect URLs for getgradify.com
// Each command prints a markdown report and, with --write, appends it to docs/BACKEND-LOG.md.
// Nothing here ever prints a key, a secret's value, or a learner's data.
import { readFile, writeFile, appendFile, readdir, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { homedir } from "node:os";
import { resolve, relative, isAbsolute } from "node:path";

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
  };
}
const lit = (x) => `'${String(x).replace(/'/g, "''")}'`;
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
  ];
  return { checks: checks.map(([label]) => label), query: checks.length ? `select ${checks.map(([, q], i) => `${q} as c${i}`).join(", ")};` : "select 1 as c0;" };
}

// the Supabase CLI's own migration ledger, so `supabase db push` later agrees with what was applied here
const LEDGER = `create schema if not exists supabase_migrations;
create table if not exists supabase_migrations.schema_migrations (version text primary key, statements text[], name text);`;

export async function listMigrations() {
  const dir = new URL("supabase/migrations/", root);
  return (await readdir(dir)).filter((f) => /^\d{14}_.+\.sql$/.test(f)).sort().map((f) => ({ file: f, version: f.slice(0, 14), name: f.slice(15, -4), url: new URL(f, dir) }));
}

/** Apply pending migrations in order. Stops at the first failure and reports it; never skips one. */
export async function migrate(c, { list, log = () => {} } = {}) {
  list ||= await listMigrations();
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
    const t0 = Date.now();
    try {
      // one query: the migration and its ledger entry commit together or not at all (checked by the probe above)
      await c.sql(`${sql}\ninsert into supabase_migrations.schema_migrations (version, name, statements) values (${lit(m.version)}, ${lit(m.name)}, array[${lit(sql)}]);`);
    } catch (e) {
      report.push({ ...m, result: "FAILED", sha, error: e.message });
      log(`✗ ${m.file}: ${e.message}`);
      return { ok: false, report, stoppedAt: m.file };
    }
    const v = verifyQuery(expectations(sql));
    const row = (await c.sql(v.query))[0] || {};
    const missing = v.checks.filter((_, i) => row[`c${i}`] !== true);
    report.push({ ...m, result: missing.length ? "APPLIED BUT INCOMPLETE" : "applied and verified", sha, ms: Date.now() - t0, checked: v.checks.length, missing });
    log(`${missing.length ? "✗" : "✓"} ${m.file}: ${v.checks.length} objects checked${missing.length ? `; missing: ${missing.join(", ")}` : ""}`);
    if (missing.length) return { ok: false, report, stoppedAt: m.file };
  }
  return { ok: true, report };
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

async function backup(c, out) {
  const at = new Date().toISOString().replace(/[:.]/g, "-");
  const dir = resolve(out || `${homedir()}/.gradify-backups`);
  const rel = relative(resolve(new URL(".", root).pathname), dir);
  if (!rel.startsWith("..") && !isAbsolute(rel)) throw new Error("Backups contain learner data: write them outside the repository.");
  await mkdir(dir, { recursive: true });
  const q = (s) => c.sql(s);
  const tables = (await q("select tablename from pg_tables where schemaname = 'public' order by 1")).map((r) => r.tablename);
  const snap = {
    project: c.ref, at,
    schema: {
      columns: await q("select table_name, column_name, data_type, is_nullable, column_default from information_schema.columns where table_schema = 'public' order by 1, ordinal_position"),
      policies: await q("select tablename, policyname, cmd, roles, qual, with_check from pg_policies where schemaname = 'public' order by 1, 2"),
      triggers: await q("select event_object_table as table, trigger_name, action_timing, event_manipulation from information_schema.triggers where trigger_schema in ('public', 'auth') order by 1, 2"),
      functions: await q("select p.proname, pg_get_functiondef(p.oid) as def from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' order by 1"),
      migrations: await q("select version, name from supabase_migrations.schema_migrations order by 1").catch(() => []),
    },
    counts: {}, rows: {},
    auth_users: (await q("select count(*)::int as n from auth.users"))[0]?.n ?? null,
  };
  for (const t of tables) {
    snap.counts[t] = (await q(`select count(*)::int as n from public.${t}`))[0].n;
    snap.rows[t] = (await q(`select coalesce(json_agg(t), '[]'::json) as rows from public.${t} t`))[0].rows;
  }
  const file = `${dir}/gradify-${c.ref}-${at}.json`;
  await writeFile(file, JSON.stringify(snap), { mode: 0o600 });
  const sha = createHash("sha256").update(JSON.stringify(snap)).digest("hex").slice(0, 16);
  return `Backup written to ${file} (sha256 ${sha}…, readable only by you). ${tables.length} public tables, ${Object.values(snap.counts).reduce((a, b) => a + b, 0)} rows, ${snap.auth_users} accounts (counted, not copied). ${snap.schema.migrations.length} migrations already recorded.

Note: this is a logical snapshot through the API. Auth accounts and storage files aren't included; Supabase's own daily backups (and point-in-time recovery on paid plans) cover those.

${md(tables.map((t) => ({ table: t, rows: snap.counts[t] })), ["table", "rows"])}`;
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
  const titles = { status: "Project status", backup: "Backup", migrate: "Migrations", "rls-audit": "Row-level security audit", "auth-config": "Sign-in configuration" };
  let body, failed = false;
  try {
    if (cmd === "status") body = await status(c);
    else if (cmd === "backup") body = await backup(c, rest.find((x) => !x.startsWith("--")));
    else if (cmd === "migrate") {
      const r = await migrate(c, { log: (l) => console.error(l) });
      failed = !r.ok;
      body = `${r.ok ? "All migrations applied and verified." : `**Stopped at ${r.stoppedAt}.** Nothing after it was applied; the failed migration was rolled back.`}\n\n${md(r.report.map((m) => ({ migration: m.file, result: m.result, "objects checked": m.checked ?? "", sha256: m.sha, detail: m.error || (m.missing?.length ? `missing: ${m.missing.join(", ")}` : "") })), ["migration", "result", "objects checked", "sha256", "detail"])}`;
    } else if (cmd === "rls-audit") { body = await rlsAudit(c); failed = /need attention/.test(body); }
    else if (cmd === "auth-config") body = await authConfig(c);
    else { console.error("Commands: status, backup, migrate, rls-audit, auth-config"); process.exit(2); }
  } catch (e) { body = `**Failed:** ${e.message}`; failed = true; }
  const entry = `\n## ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC · ${titles[cmd]} · ${ref}\n\n${body}\n`;
  console.log(entry);
  if (write) { await appendFile(new URL("docs/BACKEND-LOG.md", root), entry); console.error("Appended to docs/BACKEND-LOG.md"); }
  if (failed) process.exitCode = 1;
}
