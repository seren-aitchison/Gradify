// Past Papers: which course has a question bank (kit/papers/format.js). The banks themselves load only when a learner
// opens Past papers, so a course page stays as light as before.
const BANKS = {
  biology: () => import("./banks/aqa-gcse-biology-8461.js"),
};
/** A loader for the course's bank, or null when the course has none. */
export const papersFor = (course) => BANKS[course] || null;
export const papersCourses = () => Object.keys(BANKS);
