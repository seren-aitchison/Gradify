// Predictive readiness by objective: for each learning objective, how likely the learner is to get it right on
// exam day, with an honest range.
//
// Course objectives ("By the end of this lesson you can…") come from course answers: each question names the
// objectives it assesses. Evidence is weighted by recency (a 30-day half-life) into a Beta estimate, then projected
// to the exam with a forgetting curve whose stability grows with each separate day the learner got it right. The
// range is an 80% interval from the Beta spread, so little evidence gives a wide range, never a falsely exact figure.
// For the learner's own notes, each topic is an objective: its cards' FSRS recall on exam day, with a range from how
// much evidence there is. Pure, so Node can test it (tests/intel3.test.mjs).
import { memoryOf, retrievability } from "../learning/srs.js";

const DAY = 864e5, HALF_LIFE = 30, Z80 = 1.2816;
const clamp = (x) => Math.max(0, Math.min(1, x));

/** Status from the estimate and its range. */
export function statusOf(p, lo, n) {
  if (n < 2) return "unknown";
  if (lo >= 0.7) return "ready";
  if (p >= 0.7) return "likely";
  if (p >= 0.5) return "borderline";
  return "at-risk";
}

/**
 * @param {{ attempts?: object[], cards?: object[], concepts?: object[], examDate?: string|null, titles?: Map, now?: number }} o
 *   titles: lesson id → lesson title (course summaries), for readable names
 * @returns {{ objectives: object[], summary: object }}
 */
export function objectiveReadiness({ attempts = [], cards = [], concepts = [], examDate = null, titles = new Map(), now = Date.now() } = {}) {
  const at = examDate ? Math.max(now, Date.parse(`${examDate}T12:00:00`)) : now + 14 * DAY;
  const horizon = Math.round((at - now) / DAY);
  const out = [];
  // course objectives
  const groups = new Map();
  for (const a of attempts) {
    if (!a.lesson || a.marking?.status === "provisional") continue;
    for (const o of a.question?.objectives || []) {
      const id = `${a.subject || a.site}:${a.lesson}#o${o}`;
      if (!groups.has(id)) groups.set(id, { id, site: a.site, subject: a.subject, lesson: a.lesson, n: o, list: [] });
      groups.get(id).list.push({ score: clamp(Number(a.score) || 0), t: Date.parse(a.at) });
    }
  }
  for (const g of groups.values()) {
    let s = 1, f = 1;
    for (const e of g.list) { const w = Math.pow(0.5, (now - e.t) / DAY / HALF_LIFE); s += e.score * w; f += (1 - e.score) * w; }
    const p0 = s / (s + f), sd = Math.sqrt((s * f) / ((s + f) ** 2 * (s + f + 1)));
    const goodDays = new Set(g.list.filter((e) => e.score >= 0.7).map((e) => Math.floor(e.t / DAY))).size;
    const last = Math.max(...g.list.map((e) => e.t));
    const S = Math.min(120, 3 * 2 ** Math.max(0, goodDays - 1));
    const keep = retrievability((at - last) / DAY, S);
    // forgetting between the last answer and the exam lowers the estimate and its range
    const p = clamp(p0 * keep), lo = clamp((p0 - Z80 * sd) * keep), hi = clamp(Math.min(1, p0 + Z80 * sd) * Math.max(keep, 0.95));
    const title = titles.get(g.lesson) || g.lesson;
    out.push({ id: g.id, kind: "course", site: g.site, name: `${title}: objective ${g.n}`, lesson: g.lesson, p, lo, hi, n: g.list.length, status: statusOf(p, lo, g.list.length),
      why: `${g.list.length} ${g.list.length === 1 ? "answer" : "answers"}, ${Math.round(p0 * 100)}% now; ${keep < 0.95 ? `about ${Math.round((1 - keep) * 100)}% likely to fade by then without review` : "it should hold until then"}.` });
  }
  // the learner's own topics
  for (const c of concepts) {
    const seen = cards.filter((x) => `${x.document_id}|${x.topic || "Cards"}` === c.key && x.reps > 0 && !x.suspended);
    if (!seen.length) { if (c.cards) out.push({ id: c.key, kind: "notes", site: c.site, name: c.name, p: 0, lo: 0, hi: 1, n: 0, status: "unknown", why: "Not tested yet." }); continue; }
    const rs = seen.map((x) => { const m = memoryOf(x); return m ? retrievability((at - m.last) / DAY, m.S) : 0; });
    const p = rs.reduce((a, b) => a + b, 0) / rs.length;
    const band = (1 - (c.certainty ?? 0.3)) * 0.35;
    const lo = clamp(p - band), hi = clamp(p + band);
    out.push({ id: c.key, kind: "notes", site: c.site, name: c.name, p, lo, hi, n: c.answers || seen.length, status: statusOf(p, lo, c.answers || 0),
      why: `${seen.length} of ${c.cards} cards studied; Gradify's certainty is ${c.certaintyLabel || "low"}.` });
  }
  const order = { "at-risk": 0, borderline: 1, likely: 2, unknown: 3, ready: 4 };
  out.sort((a, b) => order[a.status] - order[b.status] || a.p - b.p);
  const known = out.filter((x) => x.status !== "unknown");
  const mean = known.length ? known.reduce((a, x) => a + x.p, 0) / known.length : null;
  const spread = known.length ? Math.sqrt(known.reduce((a, x) => a + ((x.hi - x.lo) / (2 * Z80)) ** 2, 0)) / known.length : null;
  const count = (st) => out.filter((x) => x.status === st).length;
  return {
    objectives: out,
    summary: { horizon, examDate, mean, lo: mean == null ? null : clamp(mean - Z80 * spread), hi: mean == null ? null : clamp(mean + Z80 * spread),
      ready: count("ready"), likely: count("likely"), borderline: count("borderline"), atRisk: count("at-risk"), unknown: count("unknown"), total: out.length },
  };
}
