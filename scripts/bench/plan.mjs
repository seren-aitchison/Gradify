// Benchmark 5: Smart Plan feasibility ("is every plan Gradify makes actually possible, and does it use the time well?").
// Random but realistic days: availability windows, calendar events already in place, a ranked list of study items,
// and a daily time budget. kit/intel/schedule.js planDay builds each day; this checks the plan against hard
// constraints and measures how well it uses the time. Any hard-constraint violation is a bug.
import { planDay, INTEL_DEFAULTS } from "../../kit/intel/schedule.js";
import { rng } from "./simulate.mjs";

const overlaps = (a, b) => a.start_min < b.end_min && b.start_min < a.end_min;

export function planBenchmark({ seed = 4, days = 400 } = {}) {
  const R = rng(seed);
  const v = { outsideWindow: 0, overlapsCalendar: 0, overlapsItself: 0, overBudget: 0, longStretch: 0 };
  let placedPriority = 0, possiblePriority = 0, used = 0, offered = 0, inversions = 0, plans = 0, placedItems = 0, truncated = 0;
  for (let i = 0; i < days; i++) {
    const day = `2026-0${1 + (i % 9)}-${String(1 + (i % 27)).padStart(2, "0")}`;
    const from = R.int(7, 18) * 60, to = Math.min(23 * 60, from + R.int(1, 5) * 60);
    const windows = R.next() < 0.3 ? [{ from, to }, { from: Math.max(6 * 60, from - 4 * 60), to: Math.max(6 * 60 + 30, from - 2 * 60) }] : [{ from, to }];
    const intel = { ...INTEL_DEFAULTS, weekday: windows, weekend: windows, energy: R.pick(["none", "morning", "evening"]) };
    const existing = Array.from({ length: R.int(0, 3) }, () => { const s = R.int(6 * 4, 22 * 4) * 15; return { day, start_min: s, end_min: s + R.int(1, 6) * 15, cal: "personal" }; });
    const items = Array.from({ length: R.int(2, 9) }, (_, k) => ({ id: `i${k}`, title: `Item ${k}`, mins: R.pick([5, 10, 15, 20, 25, 30, 45, 60]), kind: "review", weight: R.next() < 0.3 ? "hard" : "normal", rank: k }));
    const minutes = R.pick([20, 30, 45, 60, 90, 120]);
    const { blocks, free } = planDay({ items, day, minutes, intel, existing, now: Date.parse("2026-01-01T00:00:00") });
    plans++;
    const study = blocks.filter((b) => b.kind !== "break" && b.kind !== "wrap");
    for (const b of blocks) {
      if (!windows.some((w) => b.start_min >= w.from && b.end_min <= w.to)) v.outsideWindow++;
      if (existing.some((e) => overlaps(e, b))) v.overlapsCalendar++;
    }
    for (let a = 0; a < blocks.length; a++) for (let b = a + 1; b < blocks.length; b++) if (overlaps(blocks[a], blocks[b])) v.overlapsItself++;
    // an item squeezed into the end of the budget: placed with under half the time it asked for
    for (const b of study) { const x = items.find((y) => y.id === b.id); placedItems++; if (x && b.end_min - b.start_min < x.mins / 2) truncated++; }
    const studyMins = study.reduce((s, b) => s + b.end_min - b.start_min, 0);
    if (studyMins > minutes) v.overBudget++;
    // no more than breakEvery + one item's length of focus without a break (the planner inserts breaks between items)
    let run = 0, last = null;
    for (const b of [...blocks].sort((x, y) => x.start_min - y.start_min)) {
      if (b.kind === "break" || (last != null && b.start_min - last >= intel.breakLen)) run = 0;
      if (b.kind !== "break" && b.kind !== "wrap") run += b.end_min - b.start_min;
      if (run > intel.breakEvery + 60) v.longStretch++;
      last = b.end_min;
    }
    // use of the time: study minutes placed against what could have been placed (budget, free time and items all limit it)
    const freeMins = free.reduce((s, f) => s + f.to - f.from, 0), want = items.reduce((s, x) => s + x.mins, 0);
    used += studyMins; offered += Math.min(minutes, freeMins, want);
    // priority: with no energy reordering, a lower-ranked item placed while a higher-ranked one that would fit is left out
    if (intel.energy === "none") {
      const placed = new Set(study.map((b) => b.id));
      for (const x of items) if (!placed.has(x.id) && items.some((y) => y.rank > x.rank && placed.has(y.id) && y.mins >= x.mins)) inversions++;
      possiblePriority += Math.min(3, items.length); placedPriority += items.slice(0, 3).filter((x) => placed.has(x.id)).length;
    }
  }
  const r = (x) => Math.round(x * 1000) / 1000;
  return { plans, violations: v, utilisation: r(used / Math.max(1, offered)), top3Placed: r(placedPriority / Math.max(1, possiblePriority)), priorityInversions: inversions, truncated: r(truncated / Math.max(1, placedItems)) };
}
