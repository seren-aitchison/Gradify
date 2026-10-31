// Body Intelligence calculations. Pure functions with no DOM and no storage, so they can be tested
// in Node and run the same in the browser.
//
// Every number is labelled honestly in the interface:
//  - stimulus:    recent training stimulus, computed from the user's logged sets
//  - development: estimated strength progression (e1RM or rep trends from logged sets), never
//                 "muscle size", because training logs can't measure that
//  - recovery:    an estimate from recent load and reported soreness, not a medical assessment
//  - fitness:     measured test results, compared only with the user's own earlier results
//
// Data shapes (what kit/sport/body-store.js saves):
//   workout  { id, date: "YYYY-MM-DD", name?, sets: [{ exercise, reps, load_kg, rpe?, side? }] }
//   checkin  { id, at: ISO time, soreness: { [muscle]: 0..3 }, fatigue?: 1..5, note? }
//   test     { id, date: "YYYY-MM-DD", test, value }
import { MUSCLES, EXERCISES, TESTS } from "./exercises.js";

const DAY = 864e5;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
// a logged date counts from the start of that (UTC) day, so a session logged today is never "in the future"
export const dayTime = (d) => (typeof d === "number" ? d : d.length <= 10 ? Date.parse(`${d}T00:00:00Z`) : Date.parse(d));

// the mesh keys a muscle group paints: quadriceps → quadriceps_l, quadriceps_r
export const meshKeys = (m) => (MUSCLES[m]?.sided === false ? [m] : [`${m}_l`, `${m}_r`]);
export const muscleOfKey = (k) => k.replace(/_[lr]$/, "");
export const ALL_KEYS = Object.keys(MUSCLES).flatMap(meshKeys);

// how hard a set was: from RPE when logged (8+ counts fully), otherwise a moderate default
export function intensity(set) {
  if (set.rpe == null || set.rpe === "") return 0.85;
  const r = Number(set.rpe);
  return r >= 8 ? 1 : r >= 6 ? 0.75 : 0.5;
}

// one set's contribution to each mesh key (unilateral sets only load the side they were done on)
export function setLoads(set) {
  const x = EXERCISES[set.exercise]; if (!x) return {};
  const out = {}, f = intensity(set);
  for (const [m, w] of Object.entries(x.muscles)) {
    const keys = meshKeys(m);
    for (const k of keys) {
      if (keys.length === 2 && x.unilateral && (set.side === "l" || set.side === "r") && !k.endsWith(`_${set.side}`)) continue;
      out[k] = (out[k] || 0) + w * f;
    }
  }
  return out;
}

const setsBefore = (workouts, at, fromDays) => {
  const out = [];
  for (const w of workouts) {
    const t = dayTime(w.date);
    if (t > at || t <= at - fromDays * DAY) continue;
    for (const s of w.sets || []) out.push({ ...s, t, workout: w.id });
  }
  return out;
};

// ---------- 1. Training stimulus ----------
// Effective sets with a 7-day half-life. A steady weekly volume V settles at about V/ln 2, so the
// total × ln 2 reads as "effective sets per week". Common evidence-based guidance for muscle
// growth is roughly 10–20 hard sets per muscle per week, so 20 maps to the top of the scale.
export const STIMULUS_TOP = 20, HALF_LIFE = 7;
export function stimulus(workouts, at = Date.now()) {
  const raw = Object.fromEntries(ALL_KEYS.map((k) => [k, 0]));
  for (const s of setsBefore(workouts, at, 6 * HALF_LIFE)) {
    const decay = 0.5 ** ((at - s.t) / DAY / HALF_LIFE);
    for (const [k, v] of Object.entries(setLoads(s))) raw[k] += v * decay;
  }
  return Object.fromEntries(Object.entries(raw).map(([k, v]) => { const weekly = v * Math.LN2; return [k, { weekly, t: clamp(weekly / STIMULUS_TOP) }]; }));
}

// ---------- 2. Estimated strength development ----------
// Epley e1RM from sets of 1–12 reps; bodyweight exercises with no added load track best reps.
export const e1rm = (load, reps) => (load > 0 && reps >= 1 && reps <= 12 ? load * (1 + reps / 30) : null);
function bestByExercise(sets) {
  const best = {};
  for (const s of sets) {
    const x = EXERCISES[s.exercise]; if (!x) continue;
    const load = Number(s.load_kg) || 0, reps = Number(s.reps) || 0;
    const [key, v] = load > 0 ? [s.exercise, e1rm(load, reps)] : x.bodyweight ? [`${s.exercise}:reps`, reps] : [null, null];
    if (key && v != null && v > (best[key] ?? 0)) best[key] = v;
  }
  return best;
}
// recent 4 weeks against the 8 weeks before them
export function development(workouts, at = Date.now(), recentDays = 28, baseDays = 56) {
  const recent = bestByExercise(setsBefore(workouts, at, recentDays));
  const base = bestByExercise(setsBefore(workouts, at - recentDays * DAY, baseDays));
  const changes = Object.keys(recent).filter((k) => base[k]).map((k) => ({ key: k, exercise: k.split(":")[0], metric: k.includes(":reps") ? "reps" : "e1RM", before: base[k], now: recent[k], change: recent[k] / base[k] - 1 }));
  const out = {};
  for (const m of Object.keys(MUSCLES)) {
    let sum = 0, wsum = 0; const evidence = [];
    for (const c of changes) { const w = EXERCISES[c.exercise].muscles[m] || 0; if (w < 0.4) continue; sum += c.change * w; wsum += w; evidence.push(c); }
    const v = wsum ? { change: sum / wsum, t: clamp(0.5 + (sum / wsum) / 0.2), evidence } : null;
    for (const k of meshKeys(m)) out[k] = v;
  }
  return out;
}

// ---------- 3. Recovery estimate ----------
// Fatigue from sets in the last 7 days decays with a 36-hour time constant; reported soreness
// (0–3) adds to it and decays the same way. Estimated hours until fatigue falls below 1.5.
export const RECOVERY_TAU = 36;
export function recovery(workouts, checkins = [], at = Date.now()) {
  const f = Object.fromEntries(ALL_KEYS.map((k) => [k, 0]));
  for (const s of setsBefore(workouts, at, 7)) {
    const h = (at - s.t) / 36e5;
    for (const [k, v] of Object.entries(setLoads(s))) f[k] += v * Math.exp(-h / RECOVERY_TAU);
  }
  for (const c of checkins) {
    const t = dayTime(c.at); if (t > at || at - t > 4 * DAY) continue;
    const decay = Math.exp(-(at - t) / 36e5 / RECOVERY_TAU);
    for (const [m, lvl] of Object.entries(c.soreness || {})) for (const k of meshKeys(m)) if (k in f) f[k] += Number(lvl) * 1.5 * decay;
  }
  return Object.fromEntries(Object.entries(f).map(([k, v]) => [k, { fatigue: v, t: clamp(v / 6), hours: v > 1.5 ? Math.round(RECOVERY_TAU * Math.log(v / 1.5)) : 0, state: v > 4 ? "fatigued" : v > 1.5 ? "recovering" : "recovered" }]));
}

// ---------- 4. Measured fitness ----------
export function fitness(tests, at = Date.now()) {
  const byTest = {};
  for (const r of [...tests].filter((r) => dayTime(r.date) <= at).sort((a, b) => dayTime(a.date) - dayTime(b.date))) (byTest[r.test] ||= []).push(r);
  const results = Object.entries(byTest).filter(([id]) => TESTS[id]).map(([id, rows]) => {
    const def = TESTS[id], first = Number(rows[0].value), last = Number(rows.at(-1).value);
    const change = rows.length < 2 || !first ? 0 : def.better === "lower" ? (first - last) / first : (last - first) / first;
    return { id, ...def, first, last, firstDate: rows[0].date, lastDate: rows.at(-1).date, count: rows.length, change };
  });
  const out = {};
  const add = (k, r) => (out[k] ||= []).push(r);
  for (const r of results) { for (const m of r.muscles || []) for (const k of meshKeys(m)) add(k, r); for (const o of r.organs || []) for (const k of o === "lung" ? ["lung_l", "lung_r"] : [o]) add(k, r); }
  const map = Object.fromEntries(Object.entries(out).map(([k, rs]) => { const c = rs.reduce((a, r) => a + r.change, 0) / rs.length; return [k, { change: c, t: clamp(0.5 + c / 0.3), tests: rs, baselineOnly: rs.every((r) => r.count < 2) }]; }));
  return { map, results };
}

// ---------- per-muscle detail for the side panel ----------
export function muscleSummary(m, workouts, checkins, at = Date.now()) {
  const keys = meshKeys(m), st = stimulus(workouts, at), rec = recovery(workouts, checkins, at), dev = development(workouts, at);
  const recent = setsBefore(workouts, at, 28), weeks = Array(12).fill(0), byEx = {}, sessions = new Set();
  let last = null;
  for (const s of setsBefore(workouts, at, 84)) {
    const load = keys.reduce((a, k) => a + (setLoads(s)[k] || 0), 0) / keys.length; if (!load) continue;
    weeks[11 - Math.min(11, Math.floor((at - s.t) / (7 * DAY)))] += load;
    if (!last || s.t > last) last = s.t;
  }
  for (const s of recent) {
    const load = keys.reduce((a, k) => a + (setLoads(s)[k] || 0), 0) / keys.length; if (!load) continue;
    byEx[s.exercise] = (byEx[s.exercise] || 0) + load; sessions.add(s.workout);
  }
  const avg = (o, f) => keys.reduce((a, k) => a + f(o[k]), 0) / keys.length;
  return {
    muscle: m, ...MUSCLES[m],
    weekly: avg(st, (v) => v.weekly), sides: keys.length === 2 ? { l: st[keys[0]].weekly, r: st[keys[1]].weekly } : null,
    sessions28: sessions.size, lastTrained: last ? new Date(last).toISOString().slice(0, 10) : null,
    weeks, topExercises: Object.entries(byEx).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id, v]) => ({ id, name: EXERCISES[id]?.name || id, sets: v })),
    recovery: rec[keys[0]].fatigue >= (rec[keys[1]]?.fatigue ?? -1) ? rec[keys[0]] : rec[keys[1]],
    development: dev[keys[0]],
  };
}

// ---------- colour: deep blue → blue-green → yellow → orange → red ----------
const RAMP = [[0, [0.11, 0.25, 0.75]], [0.25, [0.12, 0.64, 0.64]], [0.5, [0.95, 0.82, 0.23]], [0.75, [0.95, 0.52, 0.16]], [1, [0.91, 0.2, 0.16]]];
export function heatColour(t) {
  t = clamp(t);
  for (let i = 1; i < RAMP.length; i++) {
    const [t1, c1] = RAMP[i], [t0, c0] = RAMP[i - 1];
    if (t <= t1) { const f = (t - t0) / (t1 - t0); return c0.map((v, j) => v + (c1[j] - v) * f); }
  }
  return RAMP.at(-1)[1];
}
export const hex = (rgb) => `#${rgb.map((v) => Math.round(clamp(v) * 255).toString(16).padStart(2, "0")).join("")}`;
