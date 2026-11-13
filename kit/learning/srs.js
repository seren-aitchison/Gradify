// Spaced repetition: FSRS-5 (Free Spaced Repetition Scheduler, the open algorithm used by Anki), with its published
// default parameters. Each card has a memory model:
//   stability S   days until recall probability falls to 90%
//   difficulty D  1 (easy) to 10 (hard), how hard this card is for this learner
//   retrievability R(t) = (1 + 19/81 · t/S)^-0.5, the chance of recalling it t days after the last review
// Every answer updates S and D from the rating and from R at the moment of review (so a card remembered after it
// had started to fade gains more stability than one reviewed early). The next review is placed where R falls to the
// learner's desired retention (90% by default), and never after an exam: if the exam comes first, the card is due
// the day before it.
//
// Storage uses the existing card columns, so FSRS works without a database change:
//   interval_days = S · ease = 10 + D (values above 10 mark an FSRS card; SM-2 cards kept 1.3–3.2) · updated_at = last
//   review · due_at = the scheduled review · reps, lapses, last_rating as before.
// Cards scheduled by the old SM-2 code are read as FSRS cards (S from their interval, D from their ease) and become
// FSRS cards on their next review. Pure, so Node can test it (tests/srs.test.mjs).
const DAY = 864e5;
export const RATINGS = ["again", "hard", "good", "easy"];
const G = { again: 1, hard: 2, good: 3, easy: 4 };
export const W = [0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575, 0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621];
const DECAY = -0.5, FACTOR = 19 / 81;
const RELEARN_DAYS = 10 / 1440;   // a forgotten card comes back in ten minutes, in the same session
const clampD = (d) => Math.min(10, Math.max(1, d));

export const retrievability = (elapsedDays, S) => (S > 0 ? Math.pow(1 + (FACTOR * Math.max(0, elapsedDays)) / S, DECAY) : 0);
export const intervalFor = (S, retention = 0.9) => (S / FACTOR) * (Math.pow(retention, 1 / DECAY) - 1);
const initS = (g) => W[g - 1];
const initD = (g) => clampD(W[4] - Math.exp(W[5] * (g - 1)) + 1);

// the card's memory state, whichever scheduler last wrote it
export function memoryOf(card) {
  if (!card?.reps) return null;
  const fsrs = (card.ease ?? 0) > 10;
  const S = Math.max(0.01, card.interval_days || (card.last_rating === "again" ? 0.4 : 1));
  const D = fsrs ? clampD(card.ease - 10) : clampD(1 + ((3.2 - Math.min(3.2, Math.max(1.3, card.ease ?? 2.5))) / 1.9) * 9);
  const due = Date.parse(card.due_at);
  const last = fsrs && card.updated_at ? Date.parse(card.updated_at) : Number.isFinite(due) ? due - S * DAY : Date.now();
  return { S, D, last, fsrs };
}
/** The chance of recalling this card now (null if it's never been answered). */
export function recallNow(card, now = Date.now()) {
  const m = memoryOf(card);
  if (!m) return null;
  if (card.last_rating === "again" && now - m.last < DAY) return 0.3;   // just forgotten: relearning
  return retrievability((now - m.last) / DAY, m.S);
}

// the new memory state after an answer
function next(card, g, now) {
  const m = memoryOf(card);
  if (!m) return { S: initS(g), D: initD(g) };
  const t = (now - m.last) / DAY, R = retrievability(t, m.S);
  const D = clampD(W[7] * initD(4) + (1 - W[7]) * (m.D + (-W[6] * (g - 3) * (10 - m.D)) / 9));
  let S;
  if (t < 1) S = m.S * Math.exp(W[17] * (g - 3 + W[18]));            // a second look the same day
  else if (g === 1) S = Math.min(m.S, W[11] * Math.pow(D, -W[12]) * (Math.pow(m.S + 1, W[13]) - 1) * Math.exp(W[14] * (1 - R)));
  else S = m.S * (Math.exp(W[8]) * (11 - D) * Math.pow(m.S, -W[9]) * (Math.exp(W[10] * (1 - R)) - 1) * (g === 2 ? W[15] : 1) * (g === 4 ? W[16] : 1) + 1);
  return { S: Math.max(0.01, S), D };
}

/**
 * When each rating would bring the card back, in days, for the rating buttons.
 * @param {{ retention?: number, examDate?: string|null, now?: number }} o
 */
export function preview(card, o = {}) {
  const now = o.now ?? Date.now();
  return Object.fromEntries(RATINGS.map((r) => [r, plan(card, r, { ...o, now }).days]));
}
function plan(card, rating, { retention = 0.9, examDate = null, now = Date.now() } = {}) {
  const g = G[rating], st = next(card, g, now);
  let days = g === 1 ? RELEARN_DAYS : Math.max(1, Math.round(intervalFor(st.S, retention)));
  // an exam ahead: the last review lands before it, not after
  if (examDate && g > 1) {
    const d = new Date(now), today = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const toExam = Math.round((Date.parse(`${examDate}T00:00:00`) - today) / DAY);   // calendar days, not hours
    if (toExam >= 2 && days >= toExam) days = toExam - 1;
  }
  return { ...st, days };
}

/** The card's new state after an answer, as card columns. */
export function schedule(card, rating, o = {}) {
  const now = o.now ?? Date.now();
  const p = plan(card, rating, { ...o, now });
  return {
    reps: (card.reps || 0) + 1,
    lapses: (card.lapses || 0) + (rating === "again" && card.reps ? 1 : 0),
    ease: Math.round((10 + p.D) * 1000) / 1000,
    interval_days: Math.round(p.S * 1000) / 1000,
    due_at: new Date(now + p.days * DAY).toISOString(),
    updated_at: new Date(now).toISOString(),
    last_rating: rating,
  };
}

export const isDue = (card, now = Date.now()) => !card.suspended && new Date(card.due_at).getTime() <= now;
// "Learned": answered well at least twice and not just forgotten
export const isLearned = (card) => card.reps >= 2 && (card.last_rating === "good" || card.last_rating === "easy");
// 0–1 strength used for topic mastery bars: how long the memory lasts, on a log scale (a month or more is full)
export const strength = (card) => { const m = memoryOf(card); return !m ? 0 : card.last_rating === "again" ? 0.1 : Math.min(1, 0.25 + Math.log2(1 + m.S) / 5); };

export function fmtInterval(days) {
  if (days < 1 / 24) return "<10 min";
  if (days < 1) return `${Math.round(days * 24)} h`;
  if (days < 30) return `${Math.round(days)} ${Math.round(days) === 1 ? "day" : "days"}`;
  if (days < 365) return `${Math.round(days / 30)} mo`;
  return `${(days / 365).toFixed(1)} yr`;
}
