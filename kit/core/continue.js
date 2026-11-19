// "Continue learning", anywhere in Gradify: every course (kit/course/course.js shareProgress) writes where the learner
// is, how far through and the recommended next step to one list on this device ("gradify.recent"), and this offers
// it back as intelligent course cards, with the learner's pins, on the Gradify homepage (every course) and on each
// subject site's homepage (that site's courses). Nothing shows for someone who hasn't started a course, so a first
// visit looks exactly as before. The component itself is the shared one: kit/ui/global-nav.js mountYourLearning.
//
//   import { mountContinue } from "/kit/core/continue.js";
//   mountContinue(el, { site: "SciGradify" });          // site: optional, limits it to one site's courses
import { mountYourLearning, myCourses } from "../ui/global-nav.js";

export function recentLearning({ site = null, limit = 3 } = {}) {
  return myCourses({ site }).slice(0, limit);
}

export function mountContinue(el, { site = null, title = "Your learning" } = {}) {
  if (!el) return null;
  const view = mountYourLearning(el, { site, title });
  return el.hidden ? null : view;
}
