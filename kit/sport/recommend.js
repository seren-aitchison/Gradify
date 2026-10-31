// Body Intelligence recommendations: suggestions drawn only from what the user has logged. Each one
// says what it's based on (the numbers), how it was derived ("calculated" from logs, "estimated"
// from a model, "measured" from tests) and which muscles it concerns, so the interface can show the
// evidence and light up the muscles. No recommendation is made without enough data behind it.
//
// Thresholds follow common evidence-based training guidance: roughly 10–20 hard sets per muscle per
// week for growth, training each muscle about twice a week, a hamstring:quadriceps volume balance,
// a balance of pushing and pulling, and small left/right differences.
import { MUSCLES, EXERCISES, TESTS, exercisesFor } from "./exercises.js";
import { stimulus, recovery, development, meshKeys, dayTime } from "./body-intel.js";

const DAY = 864e5;
const r1 = (x) => Math.round(x * 10) / 10;
const MAJOR = ["quadriceps", "hamstrings", "gluteal", "chest_muscles", "back_muscles", "deltoid", "upper_arm_muscles", "calf", "abdominal_muscles"];

export function recommendations({ workouts = [], checkins = [], tests = [] }, at = Date.now()) {
  const recent = workouts.filter((w) => dayTime(w.date) <= at && dayTime(w.date) > at - 28 * DAY);
  const history = workouts.filter((w) => dayTime(w.date) <= at && dayTime(w.date) > at - 84 * DAY);
  const out = [];
  if (!recent.length && !tests.length) return out;
  const st = stimulus(workouts, at), rec = recovery(workouts, checkins, at), dev = development(workouts, at);
  const weekly = (m) => meshKeys(m).reduce((a, k) => a + st[k].weekly, 0) / meshKeys(m).length;
  const used = new Set(recent.flatMap((w) => w.sets.map((s) => s.exercise)));
  const suggest = (m, n = 2) => exercisesFor(m).filter((x) => x.weight >= 0.8 && !used.has(x.id)).slice(0, n).map((x) => x.name);
  const lastTrained = (m) => { let t = 0; for (const w of history) for (const s of w.sets) if ((EXERCISES[s.exercise]?.muscles[m] || 0) >= 0.5) t = Math.max(t, dayTime(w.date)); return t; };
  const sessionsWith = (m, list) => new Set(list.filter((w) => w.sets.some((s) => (EXERCISES[s.exercise]?.muscles[m] || 0) >= 0.5)).map((w) => w.id)).size;

  // today: what's still fatigued, what's ready (recovery is an estimate)
  if (recent.length) {
    const fatigued = Object.keys(MUSCLES).filter((m) => meshKeys(m).some((k) => rec[k].state === "fatigued"));
    if (fatigued.length) out.push({ id: "fatigued", kind: "recovery", priority: 2, basis: "estimated", muscles: fatigued,
      title: `Still recovering: ${fatigued.map((m) => MUSCLES[m].name).join(", ")}`,
      detail: `Your recent sessions${checkins.length ? " and soreness check-ins" : ""} suggest these need more time before another hard session. Lighter work or other muscle groups are a better choice today.` });
    const ready = MAJOR.filter((m) => meshKeys(m).every((k) => rec[k].state === "recovered") && weekly(m) < 10 && sessionsWith(m, history) > 0);
    if (ready.length) out.push({ id: "ready", kind: "recovery", priority: 3, basis: "estimated", muscles: ready,
      title: `Ready to train: ${ready.slice(0, 4).map((m) => MUSCLES[m].name).join(", ")}`,
      detail: "Recovered, and below 10 effective sets this week: good candidates for your next session." });
  }

  if (recent.length >= 3) {
    // muscles you used to train that have gone quiet
    for (const m of MAJOR) {
      const t = lastTrained(m);
      if (t && at - t > 14 * DAY) out.push({ id: `gap-${m}`, kind: "volume", priority: 2, basis: "calculated", muscles: [m],
        title: `${MUSCLES[m].name}: not trained for ${Math.floor((at - t) / DAY)} days`,
        detail: `Last trained ${new Date(t).toISOString().slice(0, 10)}. Strength and muscle are maintained with surprisingly little work: even one or two hard sets a week helps.${suggest(m).length ? ` Try ${suggest(m).join(" or ")}.` : ""}` });
    }
    // trained, but below common guidance
    for (const m of MAJOR) {
      const w = weekly(m), t = lastTrained(m);
      if (w >= 0.5 && w < 6 && t && at - t <= 14 * DAY) out.push({ id: `low-${m}`, kind: "volume", priority: 3, basis: "calculated", muscles: [m],
        title: `${MUSCLES[m].name}: ${r1(w)} effective sets a week`,
        detail: `Below the roughly 10 hard sets a week often recommended for growth.${suggest(m).length ? ` Adding ${suggest(m).join(" or ")} would raise it.` : ""}` });
      if (w > 25) out.push({ id: `high-${m}`, kind: "volume", priority: 2, basis: "calculated", muscles: [m],
        title: `${MUSCLES[m].name}: ${r1(w)} effective sets a week`,
        detail: "That's above the range where most people keep progressing. If performance stalls or soreness lingers, reducing volume often helps." });
    }
    // frequency: high weekly volume crammed into one session a week
    for (const m of MAJOR) {
      const w = weekly(m), n = sessionsWith(m, recent);
      if (w >= 8 && n > 0 && n <= 4) out.push({ id: `freq-${m}`, kind: "frequency", priority: 4, basis: "calculated", muscles: [m],
        title: `${MUSCLES[m].name}: trained about once a week`,
        detail: `${n} session${n > 1 ? "s" : ""} in 4 weeks for ${r1(w)} effective sets a week. Splitting the same sets over two sessions tends to work better than one big session.` });
    }
    // balance between opposing muscle groups
    const push = weekly("chest_muscles"), pull = weekly("back_muscles");
    if (push > 3 && push > 1.5 * pull) out.push({ id: "push-pull", kind: "balance", priority: 2, basis: "calculated", muscles: ["chest_muscles", "back_muscles"],
      title: "More pushing than pulling", detail: `Chest ${r1(push)} vs back ${r1(pull)} effective sets a week. A roughly even balance supports shoulder health: add rows or pull-ups.` });
    const q = weekly("quadriceps"), h = weekly("hamstrings");
    if (q > 3 && q > 2 * h) out.push({ id: "quad-ham", kind: "balance", priority: 2, basis: "calculated", muscles: ["quadriceps", "hamstrings"],
      title: "Quadriceps far ahead of hamstrings", detail: `Quadriceps ${r1(q)} vs hamstrings ${r1(h)} effective sets a week. Hamstring strength is linked to fewer hamstring injuries: add Romanian deadlifts, leg curls or Nordic curls.` });
    // left/right differences from unilateral sets
    for (const m of Object.keys(MUSCLES)) {
      const [l, rr] = meshKeys(m); if (!rr) continue;
      const a = st[l].weekly, b = st[rr].weekly, hi = Math.max(a, b);
      if (hi > 2 && Math.abs(a - b) / hi > 0.25) out.push({ id: `lr-${m}`, kind: "balance", priority: 3, basis: "calculated", muscles: [m],
        title: `${MUSCLES[m].name}: ${a > b ? "left" : "right"} side trained more`, detail: `Left ${r1(a)} vs right ${r1(b)} effective sets a week from your unilateral sets. Matching the sets on each side keeps them even.` });
    }
  }

  // strength trends (estimated 1RM from logged sets)
  const seen = new Set();
  for (const m of MAJOR) {
    const d = dev[meshKeys(m)[0]]; if (!d) continue;
    for (const c of d.evidence) {
      if (seen.has(c.key)) continue; seen.add(c.key);
      const name = EXERCISES[c.exercise].name;
      if (c.change < -0.05) out.push({ id: `drop-${c.key}`, kind: "strength", priority: 1, basis: "estimated", muscles: Object.keys(EXERCISES[c.exercise].muscles).filter((x) => EXERCISES[c.exercise].muscles[x] >= 0.8),
        title: `${name}: estimated strength down ${Math.round(-c.change * 100)}%`, detail: `Best ${c.metric} ${r1(c.before)} → ${r1(c.now)} (last 4 weeks vs the 8 before). Sleep, stress, illness or accumulated fatigue are common causes; a lighter week often helps.` });
      else if (Math.abs(c.change) < 0.01) out.push({ id: `flat-${c.key}`, kind: "strength", priority: 4, basis: "estimated", muscles: Object.keys(EXERCISES[c.exercise].muscles).filter((x) => EXERCISES[c.exercise].muscles[x] >= 0.8),
        title: `${name}: no change in estimated strength`, detail: `Best ${c.metric} ${r1(c.now)} for 12 weeks. Progressing load or reps gradually, or changing the rep range, can restart progress.` });
      else if (c.change > 0.05) out.push({ id: `up-${c.key}`, kind: "strength", priority: 5, basis: "estimated", muscles: Object.keys(EXERCISES[c.exercise].muscles).filter((x) => EXERCISES[c.exercise].muscles[x] >= 0.8),
        title: `${name}: estimated strength up ${Math.round(c.change * 100)}%`, detail: `Best ${c.metric} ${r1(c.before)} → ${r1(c.now)}. What you're doing is working.` });
    }
  }

  // measured tests due for a retest
  const lastTest = {};
  for (const t of tests) if (dayTime(t.date) <= at) lastTest[t.test] = Math.max(lastTest[t.test] || 0, dayTime(t.date));
  for (const [id, t] of Object.entries(lastTest)) if (at - t > 56 * DAY && TESTS[id]) out.push({ id: `retest-${id}`, kind: "fitness", priority: 4, basis: "measured", muscles: TESTS[id].muscles,
    title: `Retest: ${TESTS[id].name}`, detail: `Last measured ${new Date(t).toISOString().slice(0, 10)}. Retesting every 4–8 weeks shows real change.` });

  return out.sort((a, b) => a.priority - b.priority);
}
