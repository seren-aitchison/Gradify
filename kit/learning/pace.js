// A personal pace for a course: what to do today, and whether the learner is on track for their
// exam, from the shared profile (exam date, daily minutes, prior knowledge) and their progress.
// Pure, so Node can test it. Minutes are estimates and are presented as estimates.
const DAY = 864e5;
export const MIN_PER_LESSON = 12, MIN_PER_CARD = 0.4, MIN_PER_QUESTION = 1.5;

/**
 * @param {{ examDate?: string|null, dailyMinutes?: number, remaining: number, dueCards?: number, dueQuestions?: number, prior?: string, now?: number }} o
 * remaining: lessons still to do (written ones, on the learner's path)
 */
export function paceFor({ examDate = null, dailyMinutes = 20, remaining, dueCards = 0, dueQuestions = 0, prior = "new", now = Date.now() }) {
  const budget = Math.max(5, dailyMinutes || 20);
  // lessons the learner already partly knows go faster
  const perLesson = MIN_PER_LESSON * (prior === "confident" ? 0.6 : prior === "some" ? 0.8 : 1);
  // today: due reviews first (they're what keeps knowledge), then new lessons with what's left
  const reviewMins = Math.min(budget * 0.6, dueCards * MIN_PER_CARD + dueQuestions * MIN_PER_QUESTION);
  const cards = Math.min(dueCards, Math.floor(reviewMins / MIN_PER_CARD));
  const questions = Math.min(dueQuestions, Math.floor(Math.max(0, reviewMins - cards * MIN_PER_CARD) / MIN_PER_QUESTION));
  const lessons = Math.min(remaining, Math.max(remaining ? 1 : 0, Math.floor((budget - reviewMins) / perLesson)));
  const today = { cards, questions, lessons, minutes: Math.round(cards * MIN_PER_CARD + questions * MIN_PER_QUESTION + lessons * perLesson) };
  // about a fifth of study time goes on review over a course, so new lessons get the rest
  const lessonsPerDay = (budget * 0.8) / perLesson;
  const daysNeeded = remaining ? Math.ceil(remaining / lessonsPerDay) : 0;
  const finish = new Date(now + daysNeeded * DAY).toISOString().slice(0, 10);
  if (!examDate) return { status: remaining ? "no-date" : "done", today, daysNeeded, finish, lessonsPerDay };
  // count whole days up to the exam, keeping the last few for revision rather than new lessons
  const days = Math.ceil((Date.parse(`${examDate}T00:00:00Z`) - Date.parse(new Date(now).toISOString().slice(0, 10) + "T00:00:00Z")) / DAY);
  if (days < 0) return { status: "past", today, days, daysNeeded, finish, lessonsPerDay };
  const study = Math.max(1, days - Math.min(7, Math.floor(days / 5)));
  const needPerDay = remaining / study;
  const minutesNeeded = Math.ceil((needPerDay * perLesson) / 0.8);
  const status = !remaining ? "done" : needPerDay <= lessonsPerDay ? "on-track" : needPerDay <= lessonsPerDay * 1.5 ? "tight" : "behind";
  return { status, today, days, studyDays: study, needPerDay, minutesNeeded, daysNeeded, finish, lessonsPerDay };
}
