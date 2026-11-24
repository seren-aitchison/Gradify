// MyGradify academic profile (kit/data/academic.js): exactly eight student-entered fields, saved once on the account
// (profiles.learner.academic), readable on any device, editable and removable without touching progress.
import { test } from "node:test";
import assert from "node:assert/strict";

const mem = {};
globalThis.localStorage = { getItem: (k) => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: (k) => { delete mem[k]; } };
const { validateAcademic, saveAcademic, clearAcademic, academicOf, completeness, summary, FIELDS } = await import("../kit/data/academic.js");
const { learnerOf, saveLearner } = await import("../kit/data/profile.js");
const { LocalStore } = await import("../kit/data/store.js");
const { newId } = await import("../kit/data/catalogue-ids.js");

const NOW = Date.UTC(2026, 10, 24);
const UNI = newId("provider", { now: NOW, random: () => 0.2 }), OFF = newId("offering", { now: NOW, random: () => 0.4 }), UNIT = newId("unit", { now: NOW, random: () => 0.6 });
const full = () => ({
  country: { code: "GB", name: "United Kingdom" },
  institution: { id: UNI, name: "Northmoor University" },
  subject: { id: null, name: "Chemistry" },
  offering: { id: OFF, name: "BSc Chemistry" },
  start_year: 2025,
  current_stage: { value: "ug2", label: "University, year 2" },
  mode: "full-time",
  units: [{ id: UNIT, name: "Organic Chemistry II", code: "NMU-CH201" }, { id: null, name: "My own option module" }],
});
// a stand-in for the account: the profiles row lives "on the server", each device has its own browser storage
function account() {
  const row = { id: "u1", goal: "course", learner: {} };
  return { row, device: () => ({ mode: "cloud", getProfile: async () => structuredClone(row), saveProfile: async (p) => { Object.assign(row, structuredClone(p)); return structuredClone(row); } }) };
}
const wipeBrowser = () => { for (const k of Object.keys(mem)) delete mem[k]; };

test("exactly eight student-entered fields; anything else is refused", () => {
  assert.deepEqual(FIELDS, ["country", "institution", "subject", "offering", "start_year", "current_stage", "mode", "units"]);
  const ok = validateAcademic(full(), { now: NOW });
  assert.equal(ok.ok, true, ok.errors.join("; "));
  for (const extra of ["age_band", "history", "language", "goals", "date_of_birth"]) {
    const r = validateAcademic({ ...full(), [extra]: "x" }, { now: NOW });
    assert.equal(r.ok, false, extra);
    assert.match(r.errors[0], /isn't one of the eight academic fields/);
  }
  assert.deepEqual(Object.keys(ok.value).sort(), [...FIELDS, "verification_status", "last_updated", "schema_version", "catalogue_build"].sort());
  assert.equal(ok.value.verification_status, "not_independently_verified");
  assert.equal(validateAcademic({ ...full(), verification_status: "verified" }, { now: NOW }).value.verification_status, "not_independently_verified", "a student can't mark their own entry verified");
});

test("values are tidied and checked: catalogue IDs only, plausible years, known modes, capped and de-duplicated modules", () => {
  const r = validateAcademic({ institution: { id: null, name: "  My\u0000  College \n" }, units: [{ name: "A" }, { name: "a" }, { name: "B", code: " X1 " }] }, { now: NOW });
  assert.deepEqual(r.value.institution, { id: null, name: "My College" });
  assert.deepEqual(r.value.units, [{ id: null, name: "A" }, { id: null, name: "B", code: "X1" }]);
  assert.match(validateAcademic({ institution: { id: "10007786", name: "X" } }, { now: NOW }).errors[0], /isn't a catalogue ID/, "a UKPRN is never stored as an ID");
  assert.equal(validateAcademic({ start_year: 1990 }, { now: NOW }).ok, false);
  assert.equal(validateAcademic({ start_year: 2027 }, { now: NOW }).ok, true);
  assert.equal(validateAcademic({ mode: "sometimes" }, { now: NOW }).ok, false);
  assert.equal(validateAcademic({ units: Array.from({ length: 31 }, (_, i) => ({ name: `M${i}` })) }, { now: NOW }).ok, false);
  assert.equal(validateAcademic({ institution: { id: null, name: "x".repeat(500) } }, { now: NOW }).value.institution.name.length, 160);
  assert.equal(validateAcademic({}, { now: NOW }).ok, true, "everything is optional");
});

test("typed entries stay unlinked: a name that matches a catalogue record never gains its ID", () => {
  const r = validateAcademic({ institution: { name: "Northmoor University" }, offering: { id: "", name: "BSc Chemistry" } }, { now: NOW });
  assert.equal(r.value.institution.id, null);
  assert.equal(r.value.offering.id, null);
});

test("saved on the account: complete it, leave, come back on another device, see the same; edit without losing anything", async () => {
  wipeBrowser();
  const acc = account(), phone = acc.device();
  await saveLearner(phone, { prior: { ChemGradify: "some" }, prefs: { text: "large" }, intel: { weekday: [[540, 1020]] } });
  await saveAcademic(phone, full(), { now: NOW });
  // sign out: this browser's copy is gone
  wipeBrowser();
  const laptop = acc.device();
  const l = learnerOf(await laptop.getProfile());
  assert.equal(academicOf(l).offering.name, "BSc Chemistry", "the laptop sees the course from the account");
  assert.equal(academicOf(l).institution.id, UNI);
  // edit on the laptop: change course and year; everything else in the profile stays
  await saveAcademic(laptop, { ...academicOf(l), offering: { id: null, name: "MChem Medicinal Chemistry" }, current_stage: { value: "ug3", label: "University, year 3" } }, { now: NOW + 1000 });
  const after = learnerOf(await phone.getProfile());
  assert.equal(academicOf(after).offering.name, "MChem Medicinal Chemistry");
  assert.deepEqual(after.prior, { ChemGradify: "some" });
  assert.deepEqual(after.prefs.text, "large");
  assert.deepEqual(after.intel, { weekday: [[540, 1020]] });
  assert.equal(acc.row.goal, "course", "profile columns untouched");
});

test("changing or removing the course never touches notes, progress, plans or mastery", async () => {
  wipeBrowser();
  const st = new LocalStore();
  await st.saveBlock({ day: "2026-11-25", start_min: 600, end_min: 660, title: "Revise", cal: "study" });
  const before = JSON.stringify(await st.listBlocks("2026-01-01", "2027-12-31"));
  const storeKeys = Object.keys(mem).filter((k) => k !== "gradify.learner").map((k) => [k, mem[k]]);
  await saveAcademic(st, full(), { now: NOW });
  await saveAcademic(st, { ...full(), offering: { id: null, name: "BA History" }, units: [] }, { now: NOW });
  await clearAcademic(st);
  assert.equal(academicOf(learnerOf(await st.getProfile())), null);
  assert.equal(JSON.stringify(await st.listBlocks("2026-01-01", "2027-12-31")), before, "plans unchanged");
  for (const [k] of storeKeys) if (k !== "gradify.v1") assert.equal(mem[k], storeKeys.find(([x]) => x === k)[1], `${k} unchanged`);
});

test("an invalid profile isn't saved", async () => {
  wipeBrowser();
  const st = new LocalStore();
  await assert.rejects(saveAcademic(st, { ...full(), age_band: "18+" }), /eight academic fields/);
  assert.equal(academicOf(learnerOf(await st.getProfile())), null);
});

test("completeness counts what's filled, never penalises skips; summary reads naturally", () => {
  assert.deepEqual(completeness(null), { filled: 0, total: 8, missing: FIELDS });
  assert.equal(completeness(validateAcademic(full(), { now: NOW }).value).filled, 8);
  assert.equal(completeness({ country: { code: "GB", name: "UK" }, units: [] }).filled, 1);
  assert.equal(summary(full()), "BSc Chemistry · Northmoor University · University, year 2");
  assert.equal(summary({ subject: { name: "Law" } }), "Law");
});
