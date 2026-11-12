// Every interactive in every course is registered properly and wired into learning (docs/INTERACTIVE-ROADMAP.md,
// Stage A): it links to lessons that exist, every challenge it can record maps to one of them, its code has a
// fingerprint for review tracking, and it's cached for offline use with its course. The browser side (every
// interactive loads, declares only mapped challenges, records all four outcomes, works on a phone and offline) is
// scripts/check-interactives.cjs. Also: the four lab outcomes in the mastery model, and the dataset register.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { FINGERPRINTS } from "../kit/course/ix-manifest.js";
import { REVIEWS } from "../kit/course/reviews.js";
import { reviewStatus, reviewLabel } from "../kit/course/review.js";
import { labOutcome, LAB_OUTCOMES, evidenceFromAttempts, labPractice } from "../kit/learning/mastery.js";
import { DATASETS, APPROVED_SOURCES, TEACHING_EXAMPLES } from "../kit/labs/datasets.js";
import { manifest } from "../scripts/ix-manifest.mjs";

const root = new URL("../", import.meta.url);
const COURSES = readdirSync(new URL("kit/courses/", root), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
const courses = await Promise.all(COURSES.map(async (slug) => ({ slug, c: (await import(new URL(`kit/courses/${slug}/course.js`, root))).default })));
const withIx = courses.filter(({ c }) => c.interactives?.length);

test("every course's interactives: unique ids, a title, description, kind and model note, and lessons that exist", () => {
  let n = 0;
  for (const { slug, c } of withIx) {
    const lessons = new Set(c.units.flatMap((u) => u.lessons.map((l) => l.id))), ids = new Set();
    for (const x of c.interactives) {
      n++;
      const at = `${slug}/${x.id}`;
      assert.ok(!ids.has(x.id), `${at}: duplicate id`); ids.add(x.id);
      assert.ok(x.title && x.sub && x.kind, `${at}: title, sub and kind`);
      assert.ok(x.note, `${at}: the note saying what the model simplifies`);
      assert.equal(typeof x.load, "function", `${at}: load()`);
      assert.ok(x.lessons?.length, `${at}: linked to specific lessons (not only to schools), so it appears inside them`);
      for (const l of x.lessons) assert.ok(lessons.has(l), `${at}: lesson ${l} doesn't exist`);
    }
  }
  assert.equal(n, 242, "the number of registered interactives (update when adding some)");
});

test("every interactive has a mastery evidence map, and every mapped lesson is one it links to", () => {
  for (const { slug, c } of withIx) for (const x of c.interactives) {
    const at = `${slug}/${x.id}`, ev = { ...(c.evidence?.[x.id] || {}), ...(x.evidence || {}) };
    assert.ok(Object.keys(ev).length, `${at}: no evidence map (kit/courses/${slug}/evidence.js)`);
    for (const [task, l] of Object.entries(ev)) assert.ok(x.lessons.includes(l), `${at}: challenge "${task}" maps to ${l}, which the interactive doesn't link to`);
  }
  for (const { slug, c } of withIx) for (const id of Object.keys(c.evidence || {})) assert.ok(c.interactives.some((x) => x.id === id), `${slug}/evidence.js: ${id} isn't a registered interactive`);
});

test("every interactive has a code fingerprint, the fingerprints are up to date, and review records are well formed", async () => {
  const fresh = await manifest();
  assert.deepEqual(FINGERPRINTS, fresh, "kit/course/ix-manifest.js is out of date: run node scripts/ix-manifest.mjs");
  for (const { slug, c } of withIx) for (const x of c.interactives) assert.ok(FINGERPRINTS[`${slug}/${x.id}`], `${slug}/${x.id}: no fingerprint`);
  for (const [key, r] of Object.entries(REVIEWS)) {
    assert.ok(FINGERPRINTS[key], `review for ${key}, which isn't an interactive`);
    assert.ok(r.role && /^\d{4}-\d\d-\d\d$/.test(r.date) && r.scope && r.fingerprint, `review for ${key}: role, date, scope and fingerprint`);
  }
});

test("review status: not yet reviewed, reviewed, and updated since the last review", () => {
  assert.equal(reviewStatus(undefined, "abc"), "unreviewed");
  assert.equal(reviewLabel(undefined, "abc").text, "Not yet expert-reviewed");
  const r = { role: "a registered pharmacist", date: "2026-12-01", scope: "model and wording", fingerprint: "abc" };
  assert.equal(reviewStatus(r, "abc"), "reviewed"); assert.match(reviewLabel(r, "abc").text, /^Expert-reviewed by a registered pharmacist, 2026-12-01$/);
  assert.equal(reviewStatus(r, "def"), "updated"); assert.match(reviewLabel(r, "def").text, /^Updated since last review/);
});

test("offline: each course's lab list, evidence map and the shared interactive engine are cached at install", () => {
  const sw = readFileSync(new URL("sw.js", root), "utf8");
  for (const f of ["kit/labs/lab.js", "kit/course/review.js", "kit/course/reviews.js", "kit/course/ix-manifest.js", "kit/interactive/scenario.js", "kit/interactive/trainers.js", "kit/interactive/pharmcalc.js", "kit/interactive/mathgen.js", "kit/interactive/grapher.js"]) assert.match(sw, new RegExp(`"${f.replace(/\./g, "\\.")}"`), `sw.js caches ${f}`);
  for (const { slug } of withIx) for (const f of ["evidence.js", "interactives.js"]) if (existsSync(new URL(`kit/courses/${slug}/${f}`, root))) assert.match(sw, new RegExp(`"kit/courses/${slug}/${f.replace(".", "\\.")}"`), `sw.js caches kit/courses/${slug}/${f}`);
});

// ---------- the four lab outcomes in the mastery model ----------
const lab = (outcome, extra = {}, at = "2026-11-07T10:00:00Z", n = 1) => ({ schema: 1, at, question: { id: "ix:demo:t1", type: "lab", d: 2 }, lesson: "u01-01", unit: "u01", subject: "demo", context: "practice", contextId: "demo", attempt: n, score: ["success", "assisted_success"].includes(outcome) ? 1 : 0, correct: ["success", "assisted_success"].includes(outcome), response: { challenge: "t1", outcome, ...extra }, marking: { status: "final" } });

test("lab outcomes: four kinds, and the older 'attempt' is read as unsuccessful", () => {
  assert.deepEqual(LAB_OUTCOMES, ["success", "assisted_success", "unsuccessful", "attempted"]);
  for (const o of LAB_OUTCOMES) assert.equal(labOutcome(lab(o)), o);
  assert.equal(labOutcome(lab("attempt")), "unsuccessful");
});

test("lab outcomes as mastery evidence: success counts, assisted counts as helped, a wrong answer counts against, a try or a touch doesn't", () => {
  const ev = (o, extra) => evidenceFromAttempts([lab(o, extra)]);
  assert.equal(ev("success").length, 1); assert.equal(ev("success")[0].score, 1); assert.equal(ev("success")[0].independent, true);
  assert.equal(ev("assisted_success").length, 1); assert.equal(ev("assisted_success")[0].independent, false, "help from the tutor or a shown answer");
  assert.equal(ev("unsuccessful", { via: "answer" }).length, 1, "a wrong answer to a challenge is evidence"); assert.equal(ev("unsuccessful", { via: "answer" })[0].score, 0);
  assert.deepEqual(ev("unsuccessful", { via: "try" }), [], "working at a simulation without meeting the goal is a sign to practise, not evidence against");
  assert.deepEqual(ev("attempted", { via: "try" }), [], "opening or touching a challenge is never evidence");
  assert.ok(ev("success")[0].w > ev("assisted_success")[0].w, "independent success weighs more than assisted");
});

test("lab outcomes in practice suggestions: unsuccessful tries add up, a touch doesn't count, a success resets", () => {
  const t = (o, d) => lab(o, { via: "try" }, `2026-11-0${d}T10:00:00Z`);
  assert.equal(labPractice([t("unsuccessful", 1), t("unsuccessful", 2)]).length, 1);
  assert.equal(labPractice([t("attempted", 1), t("attempted", 2)]).length, 0);
  assert.equal(labPractice([t("unsuccessful", 1), t("unsuccessful", 2), t("success", 3)]).length, 0);
});

// ---------- datasets ----------
test("every real dataset is registered with source, licence, attribution, coverage and dates, from an approved source", () => {
  const files = readdirSync(new URL("kit/labs/", root), { withFileTypes: true }).filter((d) => d.isDirectory()).flatMap((d) => existsSync(new URL(`kit/labs/${d.name}/data/`, root)) ? readdirSync(new URL(`kit/labs/${d.name}/data/`, root)).map((f) => `kit/labs/${d.name}/data/${f}`) : []);
  const reg = new Map(DATASETS.map((d) => [d.file, d]));
  for (const f of files) assert.ok(reg.has(f), `${f} isn't in the dataset register (kit/labs/datasets.js)`);
  for (const d of DATASETS) {
    for (const k of ["publisher", "dataset", "licence", "attribution", "coverage", "years", "retrieved", "limitations"]) assert.ok(d[k], `${d.file}: ${k}`);
    assert.equal(typeof d.licenceVerified, "boolean", `${d.file}: say whether the licence has been checked at the source`);
    assert.ok(APPROVED_SOURCES.includes(d.publisher) || TEACHING_EXAMPLES.includes(d.example), `${d.file}: ${d.publisher} isn't an approved source`);
    assert.ok(existsSync(new URL(d.file, root)), `${d.file} doesn't exist`);
  }
  // every lab that labels its data as real is covered by the register
  const labs = readdirSync(new URL("kit/labs/", root), { recursive: true }).filter((f) => f.endsWith(".js") && !f.includes("/data/"));
  for (const f of labs) {
    const src = readFileSync(new URL(`kit/labs/${f}`, root), "utf8");
    if (!/dataLabel\([^)]*real: true/.test(src)) continue;
    const imports = [...src.matchAll(/from\s+"\.\/data\/([a-z-]+\.js)"/g)].map((m) => `kit/labs/${f.split("/")[0]}/data/${m[1]}`);
    assert.ok(imports.some((i) => reg.has(i)) || reg.has(`kit/labs/${f}`), `kit/labs/${f} shows real data that isn't registered`);
  }
});
