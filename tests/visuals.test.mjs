// The visual pipeline's outputs (scripts/visuals/build.py → kit/visuals/molecules), the computed visuals
// (kit/visuals/procedural.js), the visual index, and the world curricula database.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { describe, questionsFor, molarMass } from "../kit/visuals/molecule.js";
import { field, fieldLine, projectile, resultant, wave, K } from "../kit/visuals/procedural.js";
import { findVisuals } from "../kit/visuals/find.js";
import { WORLD, check, stats, qualifications } from "../kit/curriculum/world.js";
import { claimFor } from "../kit/app/curriculum-views.js";

const mols = JSON.parse(readFileSync(new URL("../kit/visuals/molecules/index.json", import.meta.url), "utf8")).molecules;
const src = JSON.parse(readFileSync(new URL("../scripts/visuals/molecules.json", import.meta.url), "utf8")).molecules;

test("every published molecule passed every check, matches its independently written formula, and has its files", () => {
  assert.equal(mols.length, src.length);
  const count = (f) => Object.fromEntries([...f.matchAll(/([A-Z][a-z]?)(\d*)/g)].map(([, e, n]) => [e, n ? +n : 1]));
  for (const m of mols) {
    assert.ok(m.ok && Object.values(m.checks).every((c) => c.ok), m.id);
    assert.deepEqual(count(m.formula), count(src.find((s) => s.id === m.id).formula), m.id);
    assert.deepEqual(m.counts, count(m.formula), `${m.id}: atoms drawn = formula`);
    for (const f of [m.files.glb, m.files.still]) { const p = new URL(`../kit/visuals/molecules/${f}`, import.meta.url); assert.ok(existsSync(p) && statSync(p).size > 1000, f); }
    assert.equal(m.review.status, "pending", "no molecule claims an expert review it hasn't had");
    for (const b of m.bonds) { const a = m.atoms[b.a], c = m.atoms[b.b]; assert.ok(Math.abs(Math.hypot(a.x - c.x, a.y - c.y, a.z - c.z) - b.length) < 0.01, `${m.id}: bond lengths are the coordinates'`); }
  }
  const water = mols.find((m) => m.id === "water");
  assert.ok(Math.abs(water.angles[0].deg - 104.5) < 2, "water's bond angle is close to the measured 104.5°");
  assert.ok(Math.abs(molarMass(water) - 18.015) < 0.01);
  assert.match(describe(water), /1 oxygen atom, 2 hydrogen atoms, joined by 2 single bonds/);
  const benz = mols.find((m) => m.id === "benzene");
  assert.equal(benz.bonds.filter((b) => b.order === 1.5).length, 6, "benzene's ring is aromatic");
});

test("molecule questions are worked out from the structure, with the right answer among the options", () => {
  let s = 3; const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (const m of mols) for (const q of questionsFor(m, rand)) { assert.ok(q.options.includes(q.right), `${m.id}: ${q.q}`); assert.equal(new Set(q.options).size, q.options.length); }
  const eth = questionsFor(mols.find((m) => m.id === "ethene"), rand).find((q) => /double bonds/.test(q.q));
  assert.equal(eth.right, "1");
});

test("computed visuals agree with the physics", () => {
  const [ex, ey] = field([{ x: 0, y: 0, q: 1e-9 }], 1, 0);
  assert.ok(Math.abs(ex - K * 1e-9) < 1e-6 && Math.abs(ey) < 1e-12, "Coulomb: kq/r² along r");
  const [mx] = field([{ x: -0.25, y: 0, q: 1e-9 }, { x: 0.25, y: 0, q: 1e-9 }], 0, 0);
  assert.ok(Math.abs(mx) < 1e-6, "equal charges cancel halfway");
  const line = fieldLine([{ x: 0, y: 0, q: 1e-9 }], 0.01, 0, { max: 50 });
  assert.ok(line.every(([, y]) => Math.abs(y) < 1e-9), "a single charge's field line is radial");
  const p = projectile(20, 45, 9.81);
  assert.ok(Math.abs(p.range - 400 / 9.81) < 1e-9 && Math.abs(p.at(p.time).y) < 1e-9, "range v²sin2θ/g, lands at y = 0");
  assert.ok(Math.abs(resultant([[3, 0], [4, 90]]).magnitude - 5) < 1e-12);
  assert.ok(Math.abs(wave(0.25, 0)) - 1 < 1e-12 && Math.abs(wave(0.25, 0) + wave(0.25, 0, { phi: Math.PI })) < 1e-12, "half a cycle out of phase cancels");
});

test("the visual index finds the right visual first", async () => {
  const ix = JSON.parse(readFileSync(new URL("../kit/api/v1/visuals.json", import.meta.url), "utf8")).visuals;
  assert.equal(findVisuals(ix, "caffeine")[0].id, "caffeine");
  assert.equal(findVisuals(ix, "electric field")[0].id, "field-lines");
  assert.equal(findVisuals(ix, "standing wave")[0].id, "waves");
  assert.ok(findVisuals(ix, "mitochondria").some((v) => v.kind === "model"));
  assert.deepEqual(findVisuals(ix, "qwertyuiop"), []);
});

test("the world curricula database: valid, honest, and linked to real Gradify courses", () => {
  const cat = JSON.parse(readFileSync(new URL("../kit/api/v1/catalogue.json", import.meta.url), "utf8"));
  assert.deepEqual(check(WORLD, cat.courses.map((c) => c.slug)), []);
  const s = stats(); assert.ok(s.countries >= 20 && s.qualifications >= 60);
  assert.equal(s.checked, 0, "nothing is marked checked until someone has checked it");
  assert.equal(claimFor(qualifications().find((q) => q.id === "gb-sqe")).status, "mapped");
  assert.equal(claimFor(qualifications().find((q) => q.id === "in-jee")).status, null, "no claim where nothing is mapped");
});

const refs = JSON.parse(readFileSync(new URL("../scripts/visuals/references.json", import.meta.url), "utf8"));
test("checked against references: identity, configuration, and geometry against experiment", () => {
  for (const [id, r] of Object.entries(refs.molecules)) {
    const m = mols.find((x) => x.id === id); assert.ok(m, `${id} is published`);
    if (r.inchikey) assert.equal(m.inchikey, r.inchikey, `${id}: the right compound, stereochemistry included`);
    if (r.cip) assert.deepEqual({ R: m.stereocentres.filter((s) => s.label === "R").length, S: m.stereocentres.filter((s) => s.label === "S").length }, r.cip, `${id}: R/S`);
    for (const g of m.reference.geometry) assert.ok(Math.abs(g.model - g.experiment) <= (g.unit === "Å" ? refs.tolerance.bond : refs.tolerance.angle), `${id}: ${g.what} ${g.model} vs ${g.experiment}`);
  }
  // L-amino acids: the alpha carbon is S, except cysteine (R), because sulfur outranks the carboxyl group
  const aa = mols.filter((m) => m.keys.includes("amino acid") && m.id !== "glycine");
  assert.ok(aa.length >= 19);
  for (const m of aa) assert.ok(m.stereocentres.length >= 1, m.id);
  assert.deepEqual(mols.find((m) => m.id === "cysteine").stereocentres.map((s) => s.label), ["R"]);
  assert.equal(mols.find((m) => m.id === "carbon-dioxide").method, "Experimental geometry (NIST CCCBDB)", "where the force fields fail, the measured structure");
  assert.ok(mols.find((m) => m.id === "ibuprofen").racemic);
});

test("functional groups and partial charges come from the structure", () => {
  const names = (id) => [...new Set(mols.find((m) => m.id === id).groups.map((g) => g.name))].sort();
  assert.deepEqual(names("aspirin"), ["benzene ring", "carboxylic acid", "ester"]);
  assert.deepEqual(names("paracetamol"), ["amide", "benzene ring", "phenol (hydroxyl on a ring)"]);
  assert.ok(names("ethanol").includes("hydroxyl (alcohol)"));
  assert.ok(names("atp").includes("phosphate"));
  const w = mols.find((m) => m.id === "water");
  assert.ok(w.atoms[0].q < 0 && w.atoms[1].q > 0, "water: oxygen δ−, hydrogens δ+");
});

test("the evidence a learner sees matches the checks", async () => {
  const { evidence } = await import("../kit/visuals/molecule.js");
  const lines = evidence(mols.find((m) => m.id === "glucose")).join(" ");
  assert.match(lines, /InChIKey WQZGKKKJIJFFOK-DVKNGEFBSA-N matches the reference compound's, stereochemistry included/);
  assert.match(lines, /2 R and 3 S stereocentres/);
  assert.match(evidence(mols.find((m) => m.id === "carbon-dioxide")).join(" "), /Experimental geometry/);
  for (const m of mols) assert.ok(m.fingerprint && m.tools?.blender?.startsWith("Blender"), `${m.id}: build recorded`);
});
