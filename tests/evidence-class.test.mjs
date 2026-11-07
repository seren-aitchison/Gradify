// Three kinds of evidence (kit/learning/evidence-class.js): exploration earns XP but never mastery; practice counts;
// assessment counts more. XP never feeds mastery.
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { evidenceClass, evidenceCounts, explorationIds, EVIDENCE_CLASSES } from "../kit/learning/evidence-class.js";
import { evidenceFromAttempts, sixProfiles, labPractice } from "../kit/learning/mastery.js";
import { courseSummary } from "../kit/learning/learner-data.js";

const maths = (await import("../kit/courses/maths/course.js")).default;
let n = 0;
const at = (h) => new Date(Date.UTC(2026, 10, 1, 9) + h * 36e5).toISOString();
const rec = (o = {}) => ({ schema: 1, id: `a${++n}`, at: at(n), site: "MathGradify", subject: "maths", context: "lesson", contextId: null,
  question: { id: `q${n}`, v: null, type: "num", d: 2, objectives: [] }, lesson: "u07-03", unit: "u07", response: null, score: 1, correct: true,
  attempt: 1, confidence: null, ms: null, misconception: null, marking: { method: "auto", status: "final" }, ...o });
const lab = (lab, task, outcome = "success", extra = {}) => rec({ context: "practice", contextId: lab, question: { id: `ix:${lab}:${task}`, v: null, type: "lab", d: 2, objectives: [] },
  score: outcome === "success" || outcome === "assisted_success" ? 1 : 0, correct: outcome === "success" || outcome === "assisted_success", response: { challenge: task, outcome, ...extra } });
const EX = explorationIds(maths.exploration);

test("classification: exploration, practice and assessment", () => {
  // exploration: tagged when recorded, or listed by the course (which covers records made before tagging)
  assert.equal(evidenceClass(lab("lln", "k1", "success", { evidence: "exploration" })), "exploration");
  assert.equal(evidenceClass(lab("lln", "k1")), "practice");                                  // without the course's list it can't know
  assert.equal(evidenceClass(lab("lln", "k1"), { exploration: maths.exploration }), "exploration");
  assert.equal(evidenceClass(lab("lln", "k1"), { exploration: EX }), "exploration");
  assert.equal(evidenceClass(lab("roots", "sqrt2"), { exploration: EX }), "practice");       // a skill challenge
  // only interactive challenges can be exploration
  assert.equal(evidenceClass(rec({ response: { evidence: "exploration" } })), "practice");
  // practice: checked answers in lessons, problems and review
  for (const context of ["lesson", "problems", "review", "practice"]) assert.equal(evidenceClass(rec({ context })), "practice");
  // assessment: quizzes and exams, working checked step by step, and anything a person marked
  assert.equal(evidenceClass(rec({ context: "quiz" })), "assessment");
  assert.equal(evidenceClass(rec({ context: "exam" })), "assessment");
  assert.equal(evidenceClass(rec({ context: "practice", question: { id: "ws:linear-1:p3", type: "reasoning", d: 2 } })), "assessment");
  assert.equal(evidenceClass(rec({ marking: { method: "human", status: "final" } })), "assessment");
  // provisional marks (self-assessed or AI-assisted) never count as assessment, even in an exam
  assert.equal(evidenceClass(rec({ context: "exam", marking: { method: "self", status: "provisional" } })), "practice");
  assert.equal(evidenceClass(rec({ question: { id: "ws:case-2:sbar", type: "short", d: 2 }, marking: { method: "ai-assisted", status: "provisional" } })), "practice");
  assert.deepEqual(evidenceCounts([lab("lln", "k1"), lab("roots", "sqrt2"), rec({ context: "exam" })], { exploration: EX }), { exploration: 1, practice: 1, assessment: 1 });
  assert.equal(EVIDENCE_CLASSES.exploration.mastery, false); assert.equal(EVIDENCE_CLASSES.exploration.weight, 0);
  assert.ok(EVIDENCE_CLASSES.assessment.weight > EVIDENCE_CLASSES.practice.weight);
});

test("exploration never moves mastery, up or down", () => {
  const explore = ["k1", "k10", "six"].flatMap((t) => [lab("lln", t), lab("lln", t, "success", { evidence: "exploration" })]).concat([lab("clt", "n1"), lab("tangent", "three"), lab("tangent", "negh")]);
  assert.deepEqual(evidenceFromAttempts(explore, { exploration: EX }), []);
  const p = sixProfiles(evidenceFromAttempts(explore, { exploration: EX })).all;
  assert.equal(p.mastery, null); assert.equal(p.measured.length, 0);
  // a learner's real evidence gives the same profile with or without a hundred explorations on top
  const real = [rec(), rec({ score: 0, correct: false }), rec({ context: "quiz" }), lab("roots", "sqrt2"), rec({ question: { id: "q-x", type: "num", d: 3 } })];
  const many = Array.from({ length: 100 }, (_, i) => lab("lln", i % 2 ? "k1" : "six"));
  const strip = (ev) => ev.map(({ at: _, ...e }) => e);
  assert.deepEqual(strip(evidenceFromAttempts([...real, ...many], { exploration: EX })), strip(evidenceFromAttempts(real, { exploration: EX })));
  // an exploration challenge tried and not met isn't a sign to practise; a skill challenge is
  const tries = (l, t) => [lab(l, t, "unsuccessful", { via: "try" }), lab(l, t, "unsuccessful", { via: "try" })];
  assert.equal(labPractice(tries("lln", "k10"), { exploration: EX }).length, 0);
  assert.equal(labPractice(tries("roots", "sqrt2"), { exploration: EX }).length, 1);
});

test("assessment counts more strongly than practice; practice and labs keep their weights", () => {
  const w = (a) => evidenceFromAttempts([a], { exploration: EX })[0].w;
  const practice = w(rec()), quiz = w(rec({ context: "quiz" })), exam = w(rec({ context: "exam" }));
  assert.ok(Math.abs(quiz - practice * 1.5) < 1e-12 && Math.abs(exam - quiz) < 1e-12);
  assert.ok(Math.abs(w(rec({ context: "practice", question: { id: "ws:linear-1:p1", type: "reasoning", d: 2 } })) - practice * 1.5) < 1e-12);
  assert.ok(w(lab("roots", "sqrt2")) < practice);                                             // labs only see successes
  assert.equal(evidenceFromAttempts([rec()])[0].evidence, "practice");
  assert.equal(evidenceFromAttempts([rec({ context: "exam" })])[0].evidence, "assessment");
  // more assessment evidence moves mastery further than the same practice evidence would
  const wrong = (context) => Array.from({ length: 4 }, () => rec({ context, score: 0, correct: false }));
  const right = Array.from({ length: 4 }, () => rec());
  const m = (xs) => sixProfiles(evidenceFromAttempts(xs, { exploration: EX })).all.dims.apply.value;
  assert.ok(m([...right, ...wrong("exam")]) < m([...right, ...wrong("lesson")]));
});

test("XP alone never inflates mastery", () => {
  const S = { done: {}, log: Array.from({ length: 500 }, (_, i) => ({ t: Date.parse(at(i)), xp: 50, kind: "practice" })),
    attempts: ["k1", "k10", "six"].map((t) => lab("lln", t)), solved: { "ix:lln:k1": 1, "ix:lln:k10": 1, "ix:lln:six": 1 } };
  const c = courseSummary(maths, S, { now: Date.parse(at(600)) });
  assert.equal(c.six.mastery, null); assert.equal(c.six.measured.length, 0);
  for (const s of c.schools) assert.equal(s.profile?.mastery ?? null, null);
  assert.ok(c.started);   // the activity still shows: the learner has started, with XP and records
});

test("every course's exploration list names real challenges, and its config passes the list on", async () => {
  let total = 0;
  for (const slug of ["maths", "biology", "chemistry", "physics", "psychology", "sociology", "law", "nursing", "pharmacy"]) {
    const file = new URL(`../kit/courses/${slug}/evidence.js`, import.meta.url);
    if (!existsSync(file)) continue;
    const { EVIDENCE, EXPLORATION } = await import(file.href);
    const cfg = (await import(`../kit/courses/${slug}/course.js`)).default;
    assert.equal(cfg.exploration ?? undefined, EXPLORATION ?? undefined, `${slug}: course config passes EXPLORATION`);
    const ixs = Object.fromEntries((cfg.interactives || []).map((x) => [x.id, x]));
    for (const [ix, tasks] of Object.entries(EXPLORATION || {})) for (const t of tasks) {
      assert.ok(ixs[ix], `${slug}: no interactive ${ix}`);
      assert.ok(t in { ...(EVIDENCE[ix] || {}), ...(ixs[ix].evidence || {}) }, `${slug}/${ix}: no challenge ${t}`);
      total++;
    }
  }
  assert.ok(total >= 100, `${total} exploration challenges`);
  // the maths ones named in the request
  for (const id of ["ix:lln:k1", "ix:tangent:three", "ix:clt:n1"]) assert.ok(EX.has(id), id);
  assert.ok(!EX.has("ix:roots:sqrt2") && !EX.has("ix:descent:rosen"));
});

// Challenges the evidence-map generator had sent to an interactive's first lesson for want of shared words, corrected by
// hand (8 November 2026): each must stay on the lesson that teaches it.
test("evidence maps: challenges are evidence for the lesson that teaches them", async () => {
  const expect = {
    physics: { pendulum: { chaos: /initial conditions/i, big: /anharmonic/i }, photoelectric: { thr: /photoelectric/i, planck: /photoelectric/i }, transients: { rl: /RL circuits/ }, projectile: { angle: /resistive/i } },
    biology: { punnett: { 9331: /dihybrid/i, test: /monohybrid/i }, "natural-selection": { drift: /drift/i }, "enzyme-kinetics": { mystery: /inhibition/i } },
    psychology: { "experiment-builder": { iv: /independent and dependent/i, confound: /confounding/i }, "study-critique": { weird: /generalisab/i, phack: /open science/i } },
    sociology: { "survey-design": { leading: /questionnaire design/i }, sampling: { bias: /^bias$/i } },
    maths: { grapher: { sine: /trigonometric graphs/i, flip: /transformations/i, cubic: /roots of polynomials/i } },
    chemistry: { bonding: { n2: /covalent/i }, "energy-profile": { temp: /activation energy/i } },
  };
  for (const [slug, ixs] of Object.entries(expect)) {
    const cfg = (await import(`../kit/courses/${slug}/course.js`)).default, { EVIDENCE } = await import(`../kit/courses/${slug}/evidence.js`);
    const title = Object.fromEntries(cfg.units.flatMap((u) => u.lessons.map((l) => [l.id, l.title])));
    for (const [ix, tasks] of Object.entries(ixs)) for (const [t, re] of Object.entries(tasks)) assert.match(title[EVIDENCE[ix][t]] || "", re, `${slug}/${ix}/${t} → ${title[EVIDENCE[ix][t]]}`);
  }
});
