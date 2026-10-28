// Spaced repetition: a simplified SM-2. Each rating sets the next interval and adjusts
// how quickly that card's intervals grow.
const DAY = 864e5;

export const RATINGS = ["again", "hard", "good", "easy"];

// What each rating would schedule, for the buttons' labels
export function preview(card) {
  const i = card.interval_days || 0, e = card.ease || 2.5;
  if (!card.reps) return { again: 1 / 144, hard: 1, good: 1, easy: 4 };
  return { again: 1 / 144, hard: Math.max(1, i * 1.2), good: Math.max(1, i * e), easy: Math.max(4, i * e * 1.3) };
}

export function schedule(card, rating, now = Date.now()) {
  const next = preview(card)[rating];
  const ease = Math.min(3.2, Math.max(1.3, (card.ease || 2.5) + { again: -0.2, hard: -0.15, good: 0, easy: 0.15 }[rating]));
  return {
    reps: (card.reps || 0) + 1,
    lapses: (card.lapses || 0) + (rating === "again" ? 1 : 0),
    ease,
    interval_days: rating === "again" ? 0 : next,
    due_at: new Date(now + next * DAY).toISOString(),
    last_rating: rating,
  };
}

export const isDue = (card, now = Date.now()) => !card.suspended && new Date(card.due_at).getTime() <= now;
// "Learned": answered well at least twice and not just forgotten
export const isLearned = (card) => card.reps >= 2 && (card.last_rating === "good" || card.last_rating === "easy");
// 0–1 strength used for topic mastery bars
export const strength = (card) => (!card.reps ? 0 : card.last_rating === "again" ? 0.1 : Math.min(1, 0.25 + Math.log2(1 + (card.interval_days || 0)) / 5));

export function fmtInterval(days) {
  if (days < 1 / 24) return "<10 min";
  if (days < 1) return `${Math.round(days * 24)} h`;
  if (days < 30) return `${Math.round(days)} ${Math.round(days) === 1 ? "day" : "days"}`;
  if (days < 365) return `${Math.round(days / 30)} mo`;
  return `${(days / 365).toFixed(1)} yr`;
}
