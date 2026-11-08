// The one-paste setup script (docs/setup/gradify-setup.sql) is up to date, sets up exactly what the migrations do,
// can't be run twice, and leaves nothing behind if it fails.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { setupSql } from "../scripts/build-setup-sql.mjs";
import { tempDb } from "../scripts/pg-rehearsal.mjs";
import { listMigrations } from "../scripts/supabase-admin.mjs";
import { TABLES } from "../kit/data/backend-check.js";

test("the setup script is up to date with supabase/migrations", async () => {
  const file = await readFile(new URL("../docs/setup/gradify-setup.sql", import.meta.url), "utf8");
  assert.equal(file, await setupSql(), "Run node scripts/build-setup-sql.mjs and commit docs/setup/gradify-setup.sql");
});

test("on an empty project it creates every table and records every migration", async () => {
  const c = await tempDb();
  await c.sql(await setupSql());
  for (const t of new Set(Object.values(TABLES).flat().map((x) => x.split("?")[0]))) {
    const [r] = await c.sql(`select to_regclass('public.${t}') is not null as ok, (select relrowsecurity from pg_class where oid = to_regclass('public.${t}')) as rls`);
    assert.equal(r.ok, true, `${t} exists`);
    assert.equal(r.rls, true, `${t} has row-level security`);
  }
  const done = (await c.sql("select version from supabase_migrations.schema_migrations order by 1")).map((r) => r.version);
  assert.deepEqual(done, (await listMigrations()).map((m) => m.version));
});

test("run a second time, it refuses and changes nothing", async () => {
  const c = await tempDb();
  await c.sql(await setupSql());
  await assert.rejects(c.sql(await setupSql()), /already exist/);
  await c.sql("rollback;").catch(() => {});
  assert.equal((await c.sql("select count(*)::int as n from supabase_migrations.schema_migrations"))[0].n, (await listMigrations()).length);
});

test("if any part fails, nothing is left behind", async () => {
  const c = await tempDb();
  const broken = (await setupSql()).replace("commit;", "select 1 / 0;\ncommit;");
  await assert.rejects(c.sql(broken));
  await c.sql("rollback;").catch(() => {});
  assert.equal((await c.sql("select to_regclass('public.profiles') is null as gone"))[0].gone, true);
});
