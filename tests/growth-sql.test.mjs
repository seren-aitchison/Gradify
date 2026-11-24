// docs/sql/growth-dashboard.sql runs on real PostgreSQL (PGlite), is read-only, and its activation and retention
// numbers are right on a small made-up set of learners. No real data is involved.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";

const sql = readFileSync(new URL("../docs/sql/growth-dashboard.sql", import.meta.url), "utf8");
// the statements, without comment lines
const statements = sql.split("\n").map((l) => l.replace(/\s*--.*$/, "")).filter((l) => l.trim()).join("\n").split(/;\s*\n/).map((s) => s.trim()).filter(Boolean);

async function db() {
  const pg = new PGlite();
  await pg.exec(`
    create schema auth;
    create table auth.users (id uuid primary key, created_at timestamptz not null, raw_user_meta_data jsonb);
    create table public.page_events (id bigint generated always as identity, day date not null, site text, path text, event text, referrer text, device text);
    create table public.activity (id bigint generated always as identity, user_id uuid, site text default 'Gradify', kind text, xp int default 0, detail jsonb, at timestamptz not null);
    create table public.subscriptions (user_id uuid primary key, status text, cancel_at_period_end boolean default false);
  `);
  // three learners who signed up 10 days ago: A learns on days 0, 1 and 8; B only makes a pack; C never comes back
  const A = "00000000-0000-0000-0000-00000000000a", B = "00000000-0000-0000-0000-00000000000b", C = "00000000-0000-0000-0000-00000000000c";
  const t0 = "now() - interval '10 days'";
  await pg.exec(`
    insert into auth.users values ('${A}', ${t0}, '{"first_touch":{"referrer":"www.google.com","landing":"/features/notes-studio/"}}'),
      ('${B}', ${t0}, '{"first_touch":{"ai":"chatgpt","referrer":"chatgpt.com","landing":"/guides/active-recall/"}}'), ('${C}', ${t0}, null);
    insert into public.activity (user_id, kind, at) values ('${A}', 'session', ${t0} + interval '2 hours'), ('${A}', 'quiz', ${t0} + interval '1 day 1 hour'), ('${A}', 'session', ${t0} + interval '8 days'), ('${B}', 'pack', ${t0} + interval '1 hour');
    insert into public.subscriptions values ('${A}', 'active', false);
    insert into public.page_events (day, site, path, event, referrer) select current_date - 1, 'Gradify', '/features/notes-studio/', 'view', 'www.google.com' from generate_series(1, 60);
    insert into public.page_events (day, site, path, event) select current_date - 1, 'Gradify', '/features/notes-studio/', 'cta_click' from generate_series(1, 6);
  `);
  return pg;
}

test("every statement is a read-only SELECT (or WITH … SELECT)", () => {
  assert.ok(statements.length >= 13, `${statements.length} statements`);
  for (const s of statements) {
    assert.match(s, /^(select|with)\b/i, s.slice(0, 60));
    assert.doesNotMatch(s, /\b(insert|update|delete|drop|alter|create|truncate|grant|revoke)\b/i, s.slice(0, 60));
  }
});

test("every query runs on PostgreSQL, and the numbers are right", async () => {
  const pg = await db(), out = [];
  for (const s of statements) out.push((await pg.query(s)).rows);
  // 1: search views are recognised
  assert.ok(out[0].some((r) => r.page_type === "feature" && r.source === "search engine" && Number(r.views) === 60));
  // 2: a 10% click rate on the feature page
  assert.equal(Number(out[1].find((r) => r.path === "/features/notes-studio/").click_rate_pct), 10);
  // 3: sources
  const src = Object.fromEntries(out[2].map((r) => [r.source, Number(r.signups)]));
  assert.deepEqual(src, { "search engine": 1, "AI assistant": 1, unknown: 1 });
  // 5: activation counts only learning (B's pack doesn't): 1 of 3, first value after 2 hours
  const act = out[4][0];
  assert.equal(Number(act.signups), 3); assert.equal(Number(act.activated_7d), 1); assert.equal(Number(act.median_hours_to_first_value), 2);
  // 6: A came back the next day
  assert.equal(Number(out[5][0].d1_pct), 33.3);
  // 9: one paying of three
  assert.equal(Number(out[8][0].paying_now), 1);
  // 10: the funnel row
  const f = out[9][0];
  assert.deepEqual([f.page_views, f.app_clicks, f.signups, f.activated, f.returned, f.paying_now].map(Number), [60, 6, 3, 1, 1, 1]);
  // 11–13: per page, per site, and paid by feature
  const pg11 = out[10].find((r) => r.landing === "/features/notes-studio/");
  assert.deepEqual([pg11.signups, pg11.activated].map(Number), [1, 1]);
  assert.equal(Number(out[11].find((r) => r.site === "Gradify").returning), 1, "A learned in two different weeks (day 0 and day 8)");
  assert.ok(out[12].some((r) => r.kind === "session" && Number(r.paying_users) === 1));
  await pg.close();
});
