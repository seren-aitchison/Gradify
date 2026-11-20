// Mappings, course → specification: which specifications each Gradify course offers a route through. This is what
// lets the engine answer "does a learner on this pathway have a lesson for this outcome?". `claim` is as in
// kit/curriculum/coverage.js, and is never stronger than that file's claim for the course.

export const COURSE_PATHWAYS = [
  // YouthGradify GCSE Core is modelled on AQA 8464 among others (kit/courses/gcse/syllabus.js); Pearson Edexcel
  // 1SC0 and OCR J250 are not modelled in the knowledge engine yet
  { course: "gcse", spec: "aqa-8464", claim: "aligned" },
  // SciGradify Biology is pitched from secondary to first-year undergraduate (its notes say so)
  { course: "biology", spec: "aqa-8461", claim: "aligned" },
  { course: "biology", spec: "aqa-7402", claim: "aligned" },
  // no Gradify course serves Key Stage 3 science yet: dfe-ks3-science is modelled so the gap is visible
];
