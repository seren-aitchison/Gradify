// "Continue learning", anywhere in Gradify: every course (kit/course/course.js shareProgress) writes where the learner
// is, how far through and the recommended next step to one list on this device ("gradify.recent"), and this offers
// it back as intelligent course cards, with the learner's pins, on the Gradify homepage (every course) and on each
// subject site's homepage (that site's courses). Nothing shows for someone who hasn't started a course, so a first
// visit looks exactly as before. The component itself is the shared one: kit/ui/global-nav.js mountYourLearning.
//
//   import { mountContinue } from "/kit/core/continue.js";
//   mountContinue(el, { site: "SciGradify" });          // site: optional, limits it to one site's courses
import { mountYourLearning, myCourses } from "../ui/global-nav.js";
import { esc } from "../ui/store.js";

// one big button at the top of the page for someone coming back: where they left off, a single tap away, above the
// marketing. Nothing for a first visit.
export function resumeBar({ site = null } = {}) {
  const r = myCourses({ site })[0]; if (!r || document.querySelector(".gx-resume")) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(r.href) && !r.href.startsWith(location.origin)) return null;   // only links within Gradify
  // the recommended next step when the course gave one (the next lesson once this one is done), else where they were
  const nx = r.next?.href && !/^[a-z][a-z0-9+.-]*:/i.test(r.next.href) ? r.next : null;
  const href = nx ? nx.href : r.href, lesson = nx?.label || r.title, course = [r.site && !site ? r.site : "", r.course].filter(Boolean).join(" · ");
  const bar = document.createElement("aside"); bar.className = "gx-resume glass"; bar.setAttribute("aria-label", "Pick up where you left off");
  bar.innerHTML = `<div><small>Pick up where you left off${course ? ` · ${esc(course)}` : ""}</small><b>${esc(lesson)}</b></div><a class="btn btn-light lg" href="${esc(href)}"><span>Continue →</span></a>`;
  const after = document.querySelector("header.hub-bar, header.sub-nav");
  (after?.parentElement || document.body).insertBefore(bar, after ? after.nextSibling : document.body.firstChild);
  if (!document.getElementById("gx-resume-css")) document.head.insertAdjacentHTML("beforeend", `<style id="gx-resume-css">
    .gx-resume { display: flex; align-items: center; gap: 16px; margin: 14px 0 0; padding: 14px 14px 14px 20px; border-radius: 24px; }
    .gx-resume > div { flex: 1; min-width: 0; display: grid; gap: 2px; }
    .gx-resume small { font-size: 13px; color: var(--mute); }
    .gx-resume b { font-size: 18px; letter-spacing: -.01em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .gx-resume .btn { flex: none; }
    @media (max-width: 560px) { .gx-resume { flex-direction: column; align-items: stretch; padding: 16px; } .gx-resume b { white-space: normal; } .gx-resume .btn { width: 100%; } }
  </style>`);
  return bar;
}

export function recentLearning({ site = null, limit = 3 } = {}) {
  return myCourses({ site }).slice(0, limit);
}

export function mountContinue(el, { site = null, title = "Your learning" } = {}) {
  if (!el) return null;
  resumeBar({ site });
  const view = mountYourLearning(el, { site, title });
  return el.hidden ? null : view;
}
