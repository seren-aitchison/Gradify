// The proposed server-side check for profiles.learner.academic (docs/sql/academic-validate-merge.sql, decision D4),
// rehearsed in PGlite (real Postgres in-process). It must accept what the app saves and refuse anything outside the
// eight fields. The SQL is NOT applied to production by this test.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { validateAcademic } from "../kit/data/academic.js";
import { newId } from "../kit/data/catalogue-ids.js";

const SQL = readFileSync(new URL("../docs/sql/academic-validate-merge.sql", import.meta.url), "utf8");
const NOW = Date.UTC(2026, 10, 24);
const good = validateAcademic({
  country: { code: "GB", name: "United Kingdom" }, institution: { id: newId("provider", { now: NOW, random: () => 0.1 }), name: "Northmoor University" },
  subject: { id: null, name: "Chemistry" }, offering: { id: null, name: "BSc Chemistry" }, start_year: 2025,
  current_stage: { value: "ug2", label: "University, year 2" }, mode: "full-time",
  units: [{ id: newId("unit", { now: NOW, random: () => 0.3 }), name: "Organic Chemistry II", code: "CH201" }, { id: null, name: "Research skills" }],
}, { now: NOW }).value;

async function db() {
  const pg = new PGlite();
  await pg.exec("create table public.profiles (id uuid primary key, learner jsonb not null default '{}'::jsonb);");
  await pg.exec("insert into public.profiles (id, learner) values ('00000000-0000-0000-0000-000000000001', '{\"academic\": {\"legacy\": true}}');");
  await pg.exec(SQL);
  return pg;
}
const write = (pg, academic) => pg.query("insert into public.profiles (id, learner) values (gen_random_uuid(), $1)", [{ prior: { X: "new" }, academic }]);

test("the server-side check accepts what the app saves, and an empty or removed profile", async () => {
  const pg = await db();
  await write(pg, good);
  await write(pg, null);
  await pg.query("insert into public.profiles (id, learner) values (gen_random_uuid(), '{}')");
  await write(pg, validateAcademic({}, { now: NOW }).value);
});

test("the server-side check refuses fields beyond the eight, bad IDs, bad shapes and too many modules", async () => {
  const pg = await db();
  const bad = {
    extra_field: { ...good, age_band: "18+" },
    verified_by_student: { ...good, verification_status: "verified" },
    ukprn_as_id: { ...good, institution: { id: "10007786", name: "X" } },
    empty_name: { ...good, subject: { id: null, name: "" } },
    bad_country: { ...good, country: { code: "gbr", name: "UK" } },
    bad_stage: { ...good, current_stage: { value: "", label: "Year 2" } },
    bad_mode: { ...good, mode: "sometimes" },
    bad_year: { ...good, start_year: 1850 },
    fractional_year: { ...good, start_year: 2025.5 },
    unit_extra_key: { ...good, units: [{ id: null, name: "A", grade: 70 }] },
    unit_bad_id: { ...good, units: [{ id: "CH201", name: "A" }] },
    too_many_units: { ...good, units: Array.from({ length: 31 }, (_, i) => ({ id: null, name: `M${i}` })) },
    not_an_object: "BSc Chemistry",
  };
  for (const [name, academic] of Object.entries(bad)) await assert.rejects(write(pg, academic), /profiles_academic_ok|violates check constraint/, name);
});

test("existing rows aren't rewritten or blocked by adding the check (NOT VALID), but a new write to them is checked", async () => {
  const pg = await db();
  const { rows } = await pg.query("select learner from public.profiles where id = '00000000-0000-0000-0000-000000000001'");
  assert.deepEqual(rows[0].learner, { academic: { legacy: true } }, "untouched");
  await assert.rejects(pg.query("update public.profiles set learner = learner || '{\"x\":1}' where id = '00000000-0000-0000-0000-000000000001'"), /profiles_academic_ok/);
  await pg.query("update public.profiles set learner = jsonb_set(learner, '{academic}', $1) where id = '00000000-0000-0000-0000-000000000001'", [good]);
});

test("the rollback removes the check cleanly", async () => {
  const pg = await db();
  await pg.exec("alter table public.profiles drop constraint profiles_academic_ok; drop function public.academic_ok(jsonb);");
  await write(pg, { anything: true });
});
