// The onboarding questionnaire's choices and the profile patch its answers make (kit/app/main.js renderStart).
// Pure, so tests check it saves the same fields the old setup saved: goal, site, level, exam_date, daily_minutes.
export const ONB_LEVELS = [["school", "School", "Key Stage 3, GCSE, A level or equivalent", "pencil"], ["undergraduate", "University", "An undergraduate degree", "cap"], ["postgraduate", "Postgraduate", "A master's or a PhD", "book"], ["professional", "Professional", "Training or a qualification for work", "briefcase"]];
export const WEEK = [["1", "About an hour", "A little and often", 10], ["3", "2 to 3 hours", "A steady habit", 25], ["5", "4 to 6 hours", "Serious progress", 45], ["8", "7 hours or more", "Full revision mode", 60]];
export const levelFor = (site, p) => p.level || (/^(JuniorGradify|YouthGradify)$/.test(site || "") ? "school" : site === "PostGradify" ? "postgraduate" : site === "ProGradify" ? "professional" : "undergraduate");
/** the profile patch the answers make (pure: tests check it saves the fields the old setup saved) */
export function onboardingPatch({ site, level, deadline, week }) {
  const minutes = (WEEK.find((w) => w[0] === week) || WEEK[1])[3];
  const goal = deadline ? (level === "professional" ? "qualification" : "exam") : level === "undergraduate" || level === "postgraduate" ? "course" : "curious";
  return { goal, site, level, exam_date: deadline || null, daily_minutes: minutes };
}
