import { test } from "node:test";
import assert from "node:assert/strict";
import { subjectOf, subjectsFor } from "../kit/core/subject-match.js";

test("module names take their Gradify subject's icon and colour", () => {
  const site = (n) => subjectOf(n)?.site.n ?? null;
  assert.equal(site("Organic Chemistry"), "SciGradify");
  assert.equal(site("Contract Law"), "LawGradify");
  assert.equal(site("Ecology"), "EcoGradify");
  assert.equal(site("Statistics exam"), "MathGradify");
  assert.equal(site("Cognitive Neuroscience"), "PsychGradify");
  assert.equal(site("Financial Accounting"), "FinanceGradify");
  assert.equal(site("Machine Learning"), "TechGradify · ForgeLab");
  assert.equal(site("Victorian Literature"), "LitGradify");
  assert.equal(site("Medieval History"), "HistoryGradify");
  assert.equal(site("French Language"), "LanguageGradify");
  assert.equal(site("Anatomy and Physiology"), "MedGradify");
  assert.equal(site("Fluid Dynamics"), "EngineerGradify");
  assert.equal(site("Adult Nursing"), "NurseGradify");
  assert.equal(site("Pharmacology"), "PharmaGradify");
  assert.equal(site("Microeconomics"), "SocGradify");
  assert.equal(subjectOf("Organic Chemistry").site.i, "atom", "the subject site's own icon");
  // vague names don't guess
  for (const n of ["Dissertation", "Field skills", "Research Methods", "Module 3", ""]) assert.equal(site(n), null, n);
});

test("unmatched modules take the degree's main subject", () => {
  const r = subjectsFor(["Genetics", "Cell Biology", "Ecology", "Dissertation", "Research Methods"]);
  assert.deepEqual(r.map((x) => x.site.n), ["SciGradify", "SciGradify", "EcoGradify", "SciGradify", "SciGradify"]);
  assert.deepEqual(r.map((x) => x.matched), [true, true, true, false, false]);
  assert.equal(subjectsFor(["Dissertation"])[0].site.n, "UnderGradify", "nothing matches at all: UnderGradify");
});
