// The content API for the native apps (scripts/build-api.mjs → kit/api/v1/): up to date with the courses, every
// course reachable, and every written unit's notes file present, so the apps can read any lesson the website shows.
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { catalogue, courseApi } from "../scripts/build-api.mjs";

const read = async (p) => JSON.parse(await readFile(new URL(`../${p}`, import.meta.url), "utf8"));

test("the published API matches the courses (run node scripts/build-api.mjs if not)", async () => {
  const cat = await catalogue();
  assert.deepEqual(await read("kit/api/v1/catalogue.json"), cat);
  for (const c of cat.courses) assert.deepEqual(await read(`kit/api/v1/courses/${c.slug}.json`), await courseApi(c.slug), c.slug);
});

test("every course in the API has a page, a syllabus and a notes file for each written unit", async () => {
  const cat = await catalogue();
  assert.ok(cat.courses.length >= 9);
  for (const c of cat.courses) {
    assert.ok(c.page && existsSync(new URL(`..${c.page}${c.page.endsWith("/") ? "index.html" : ""}`, import.meta.url)), `${c.slug}: page ${c.page}`);
    const s = await courseApi(c.slug), ids = new Set();
    for (const u of s.units) {
      if (u.written) assert.ok(existsSync(new URL(`..${s.notes.replace("{unit}", u.id)}`, import.meta.url)), `${c.slug}: notes for ${u.id}`);
      for (const l of u.lessons) { assert.ok(!ids.has(l.id), `${c.slug}: duplicate lesson ${l.id}`); ids.add(l.id); }
    }
    assert.equal(ids.size, c.lessons);
  }
});

test("every course lists its labs with a lesson link and a URL an app can open", async () => {
  const { catalogue, courseApi } = await import("../scripts/build-api.mjs");
  for (const c of (await catalogue()).courses) {
    const api = await courseApi(c.slug);
    assert.ok(Array.isArray(api.interactives), `${c.slug}: interactives is an array`);
    const lessonIds = new Set(api.units.flatMap((u) => u.lessons.map((l) => l.id)));
    for (const x of api.interactives) {
      assert.ok(x.id && x.title && x.kind, `${c.slug}/${x.id}: id, title and kind`);
      assert.match(x.url || "", /^https:\/\/getgradify\.com\/.+#\/practice\/[^/]+$/, `${c.slug}/${x.id}: url`);
      for (const l of x.lessons) assert.ok(lessonIds.has(l), `${c.slug}/${x.id}: lesson ${l} exists`);
    }
  }
});
