import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { MUSCLES, EXERCISES, TESTS, exercisesFor } from "../kit/sport/exercises.js";
import { stimulus, development, recovery, fitness, muscleSummary, e1rm, setLoads, meshKeys, heatColour, hex, ALL_KEYS, STIMULUS_TOP } from "../kit/sport/body-intel.js";

const catalog = new Set(JSON.parse(readFileSync("kit/vendor/anatomy/catalog.json", "utf8")).map((c) => c.key));
const day = (d) => `2026-10-${String(d).padStart(2, "0")}`;
const AT = Date.parse("2026-10-31T12:00:00Z");

test("every muscle group paints real meshes in the anatomy model", () => {
  for (const k of ALL_KEYS) assert.ok(catalog.has(k), `${k} is a mesh`);
  for (const t of Object.values(TESTS)) for (const m of t.muscles) assert.ok(MUSCLES[m], `${t.name}: ${m}`);
});

test("every exercise references known muscles with weights in (0, 1]", () => {
  for (const [id, x] of Object.entries(EXERCISES)) {
    assert.ok(Object.keys(x.muscles).length, id);
    for (const [m, w] of Object.entries(x.muscles)) { assert.ok(MUSCLES[m], `${id}: ${m}`); assert.ok(w > 0 && w <= 1, `${id}: ${m} ${w}`); }
    assert.ok(Object.values(x.muscles).includes(1), `${id} has a prime mover`);
  }
  for (const m of Object.keys(MUSCLES)) assert.ok(exercisesFor(m).length, `${m} has exercises`);
});

test("unilateral sets only load the side trained", () => {
  const l = setLoads({ exercise: "lunge", reps: 10, load_kg: 20, side: "l", rpe: 8 });
  assert.equal(l.quadriceps_l, 1); assert.equal(l.quadriceps_r, undefined);
  const both = setLoads({ exercise: "back_squat", reps: 5, load_kg: 100, rpe: 8 });
  assert.equal(both.quadriceps_l, 1); assert.equal(both.quadriceps_r, 1); assert.equal(both.abdominal_muscles, 0.3);
});

test("steady weekly volume reads back as roughly that many effective sets per week", () => {
  // 12 hard bench sets a week (4 sets, 3 times a week) for 8 weeks
  const workouts = [];
  for (let d = 0; d < 56; d++) if (d % 7 === 0 || d % 7 === 2 || d % 7 === 4) workouts.push({ id: String(d), date: new Date(AT - d * 864e5).toISOString().slice(0, 10), sets: Array(4).fill({ exercise: "bench_press", reps: 8, load_kg: 80, rpe: 8 }) });
  const s = stimulus(workouts, AT);
  assert.ok(Math.abs(s.chest_muscles_l.weekly - 12) < 2.5, `got ${s.chest_muscles_l.weekly}`);
  assert.ok(s.quadriceps_l.weekly === 0);
  assert.equal(s.chest_muscles_l.t, Math.min(1, s.chest_muscles_l.weekly / STIMULUS_TOP));
});

test("data after the chosen date is ignored (date slider)", () => {
  const w = [{ id: "a", date: day(30), sets: [{ exercise: "deadlift", reps: 5, load_kg: 140 }] }];
  assert.equal(stimulus(w, Date.parse("2026-10-20T12:00:00Z")).gluteal_l.weekly, 0);
  assert.ok(stimulus(w, AT).gluteal_l.weekly > 0);
});

test("e1RM and development trend", () => {
  assert.equal(e1rm(100, 5), 100 * (1 + 5 / 30));
  assert.equal(e1rm(100, 20), null);
  const w = [
    { id: "old", date: "2026-09-10", sets: [{ exercise: "back_squat", reps: 5, load_kg: 100 }] },
    { id: "new", date: day(25), sets: [{ exercise: "back_squat", reps: 5, load_kg: 110 }] },
  ];
  const d = development(w, AT);
  assert.ok(Math.abs(d.quadriceps_l.change - 0.1) < 1e-9);
  assert.ok(d.quadriceps_l.t > 0.5);
  assert.equal(d.chest_muscles_l, null, "no evidence, no colour");
});

test("recovery: fresh heavy session is fatigued, a week later recovered; soreness counts", () => {
  const w = [{ id: "x", date: day(31), sets: Array(6).fill({ exercise: "back_squat", reps: 5, load_kg: 120, rpe: 9 }) }];
  assert.equal(recovery(w, [], AT).quadriceps_l.state, "fatigued");
  assert.equal(recovery(w, [], AT + 7 * 864e5).quadriceps_l.state, "recovered");
  const sore = recovery([], [{ at: new Date(AT - 3600e3).toISOString(), soreness: { hamstrings: 2 } }], AT);
  assert.equal(sore.hamstrings_r.state, "recovering");
  assert.ok(sore.hamstrings_r.hours > 0);
});

test("fitness compares only with the user's own baseline, respecting direction", () => {
  const { map, results } = fitness([{ test: "run_5k", date: "2026-08-01", value: 30 }, { test: "run_5k", date: day(1), value: 27 }, { test: "plank_hold", date: day(2), value: 60 }], AT);
  const run = results.find((r) => r.id === "run_5k");
  assert.ok(Math.abs(run.change - 0.1) < 1e-9, "faster time is an improvement");
  assert.ok(map.heart.t > 0.5);
  assert.ok(map.abdominal_muscles.baselineOnly);
});

test("muscle summary and colours", () => {
  const w = [{ id: "a", date: day(29), sets: [{ exercise: "pull_up", reps: 8, load_kg: 0, rpe: 8 }, { exercise: "pull_up", reps: 8, load_kg: 0, rpe: 8 }] }];
  const s = muscleSummary("back_muscles", w, [], AT);
  assert.equal(s.sessions28, 1); assert.equal(s.lastTrained, day(29)); assert.equal(s.topExercises[0].id, "pull_up");
  assert.equal(s.weeks.length, 12); assert.ok(s.weeks[11] > 0);
  assert.equal(hex(heatColour(0)), "#1c40bf"); assert.equal(hex(heatColour(1)), "#e83329");
  assert.deepEqual(meshKeys("abdominal_muscles"), ["abdominal_muscles"]);
});

// ---------- individual muscles, recommendations ----------
import { identify, PARTS } from "../kit/sport/anatomy-parts.js";
import { stimulus as st2, ALL_PART_KEYS, partLoads } from "../kit/sport/body-intel.js";
import { PART_FACTORS } from "../kit/sport/exercises.js";
import { recommendations } from "../kit/sport/recommend.js";

test("individual muscles are identified the same way on both sides, and only from real surfaces", () => {
  const f = JSON.parse(readFileSync("tests/fixtures/anatomy-components.json", "utf8"));
  for (const [k, big] of Object.entries(f)) {
    const g = k.replace(/_[lr]$/, ""), r = identify(g, big);
    assert.ok(r, `${k} splits`);
    assert.equal(r.length, big.length, `${k}: every large surface gets a part`);
    for (const [, p] of r) assert.ok(PARTS[g][p], `${k}: ${p}`);
    if (k.endsWith("_l")) {
      const right = identify(g, f[k.replace(/_l$/, "_r")]);
      const sig = (x) => x.map(([s, p]) => `${p}`).sort().join();
      assert.equal(sig(r), sig(right), `${g}: left and right identify the same parts`);
      for (const [s, p] of r) { const m = right.find(([s2, p2]) => p2 === p && Math.abs(s2.tris - s.tris) / s.tris < 0.15); assert.ok(m, `${g} ${p}: a right-side surface of similar size`); }
    }
  }
  assert.equal(identify("hamstrings", f.hamstrings_l.slice(0, 3)), null, "unexpected geometry: no split");
});

test("part factors reflect biomechanics: hinges spare the biceps femoris short head, curls load it", () => {
  for (const [ex, groups] of Object.entries(PART_FACTORS)) for (const [g, parts] of Object.entries(groups)) for (const p of Object.keys(parts)) assert.ok(PARTS[g]?.[p], `${ex}: ${g}.${p}`);
  const rdl = partLoads({ exercise: "romanian_deadlift", reps: 8, load_kg: 80, rpe: 8 }), curl = partLoads({ exercise: "leg_curl", reps: 10, load_kg: 40, rpe: 8 });
  assert.ok(rdl["hamstrings_l.biceps_femoris_short"] < 0.2 && rdl["hamstrings_l.biceps_femoris_long"] === 1);
  assert.equal(curl["hamstrings_l.biceps_femoris_short"], 1);
  assert.ok(ALL_PART_KEYS.includes("abdominal_muscles.left"));
  const s = st2([{ id: "x", date: day(30), sets: [{ exercise: "incline_bench", reps: 8, load_kg: 60, rpe: 8 }] }], AT, { parts: true });
  assert.ok(s["chest_muscles_l.clavicular"].weekly > s["chest_muscles_l.sternal"].weekly);
});

test("recommendations come only from logged data and cite it", () => {
  assert.deepEqual(recommendations({}, AT), []);
  const d = (n) => new Date(AT - n * 864e5).toISOString().slice(0, 10);
  const workouts = [];
  for (let wk = 0; wk < 6; wk++) for (const off of [1, 4]) workouts.push({ id: `${wk}-${off}`, date: d(wk * 7 + off), sets: [...Array(5).fill({ exercise: "bench_press", reps: 8, load_kg: 80, rpe: 8 }), ...Array(5).fill({ exercise: "back_squat", reps: 5, load_kg: 100, rpe: 8 })] });
  workouts.push({ id: "old", date: d(40), sets: Array(3).fill({ exercise: "pull_up", reps: 8, load_kg: 0, rpe: 8 }) });
  const r = recommendations({ workouts }, AT), ids = r.map((x) => x.id);
  assert.ok(ids.includes("push-pull"), "chest far ahead of back");
  assert.ok(ids.includes("quad-ham"), "quads far ahead of hamstrings");
  assert.ok(ids.includes("gap-back_muscles"), "back not trained recently");
  for (const x of r) { assert.ok(["calculated", "estimated", "measured"].includes(x.basis)); assert.ok(x.detail.length > 20); assert.ok(x.muscles.every((m) => MUSCLES[m])); }
  assert.ok(r.every((x, i) => i === 0 || r[i - 1].priority <= x.priority), "sorted by priority");
});
