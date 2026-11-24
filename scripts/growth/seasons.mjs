// The academic year, as search demand: what students look for when, so pages are ready BEFORE the peak.
// This is the illustrative UK cycle from the growth plan. It is an assumption until validated: where a Google Trends
// export exists for a matching term (scripts/growth/sources.mjs), the report shows the measured peak months instead.
//   months: 1–12 when demand is expected to be high; lead: weeks before the first month to have pages ready
//   match: phrases and destinations the season covers
export const SEASONS = [
  { id: "new-term", name: "New term: plans, habits, mocks", months: [1, 2], lead: 6, match: /timetable|planner|plan|habit|routine|mock|time.?block|study.?method|active.?recall|spaced|smart.?plan|freshers|semester|new.?year/i },
  { id: "exam-revision", name: "GCSE and A level revision, past papers", months: [3, 4, 5], lead: 6, match: /gcse|a.?level|revision|revise|past.?paper|exam|flashcard|quiz|practice|biology|chemistry|physics|maths|psychology|history|literature|lessons\/|topics\//i },
  { id: "exam-season", name: "Exams, results nerves, summer learning", months: [6, 7], lead: 4, match: /exam|countdown|cram|last.?minute|two.?weeks|results|resit|summer|focus|timer/i },
  { id: "results-and-uni", name: "Results, university prep, new routines", months: [8, 9], lead: 6, match: /results|resit|university|undergrad|freshers|degree|study.?skills|timetable|routine|notes|notebook|cornell|lecture/i },
  { id: "coursework-mocks", name: "Coursework, modules, mocks, finals planning", months: [10, 11, 12], lead: 6, match: /coursework|dissertation|essay|citation|module|mock|deadline|finals|reading|lit.?review|research|winter/i },
];
export const VALIDATED = false;   // set true once Trends data confirms these months for Gradify's main clusters

/** the seasons a phrase or destination belongs to */
export const seasonsOf = (text) => SEASONS.filter((s) => s.match.test(text)).map((s) => s.id);

/** seasons whose preparation window is open on `date`: from `lead` weeks before the first peak month to the peak */
export function prepareNow(date = new Date()) {
  const d = new Date(date), out = [];
  for (const s of SEASONS) {
    const y = d.getUTCFullYear();
    for (const yr of [y, y + 1]) {
      const peak = new Date(Date.UTC(yr, s.months[0] - 1, 1)), open = new Date(peak.getTime() - s.lead * 7 * 864e5);
      if (d >= open && d < peak) out.push({ ...s, peak: peak.toISOString().slice(0, 10), weeksLeft: Math.ceil((peak - d) / (7 * 864e5)) });
    }
  }
  return out;
}
/** seasons in their peak on `date` */
export const inSeason = (date = new Date()) => SEASONS.filter((s) => s.months.includes(new Date(date).getUTCMonth() + 1));

/** the months a Trends series peaks in (values ≥ 75% of its maximum), when there is one: measured, not assumed */
export function measuredPeaks(series) {
  if (!series?.length) return null;
  const by = new Map(); for (const p of series) { const m = Number(String(p.period).slice(5, 7)); if (m && p.value != null) by.set(m, [...(by.get(m) || []), p.value]); }
  const avg = [...by].map(([m, v]) => [m, v.reduce((a, b) => a + b, 0) / v.length]), max = Math.max(...avg.map(([, v]) => v));
  return max > 0 ? avg.filter(([, v]) => v >= 0.75 * max).map(([m]) => m).sort((a, b) => a - b) : null;
}
