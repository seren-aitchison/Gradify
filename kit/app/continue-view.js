// "Pick up where you left off" on Today (and the Continue group in ⌘K): one tile for each thing the learner was in
// the middle of, each one click back to exactly where they were. Nothing shows for something they haven't started.
//
//   Study session     a session from the planner that isn't finished (gradify.session)
//   Last lesson       the course they were last in, at the lesson and section they left (gradify.recent)
//   Flashcards        the last flashcard set they opened or revised
//   Questions         a quiz or target test with at least one answer submitted and not finished ("in progress"),
//                     or one finished under its pass mark in the last fortnight ("available to retry"). Opening one
//                     and answering nothing is "not started" and isn't offered; a pass is "completed" and isn't either.
//   Today's plan      study blocks still to do today
//   Notes             the last page or folder they opened in Notes
//   Last subject      the subject they were last in, if it isn't the last lesson's
//
// Sources: kit/ui/history.js (what they viewed and studied), the courses' shared list, the session and the plan.
// continueItems is pure (tests/continue.test.mjs).
import { esc } from "../core/text.js";
import { uiIcon } from "../ui/icons.js";

const RETRY_FOR = 14 * 864e5;

/**
 * A quiz or test's status from its newest history entry (kit/course/course.js assessState): "not-started" (no
 * answer yet, only opened), "in-progress" (at least one answer submitted), "completed" (finished at or over the pass
 * mark) or "retry" (finished under it). Pure.
 */
export function assessmentStatus(entry) {
  if (!entry?.state) return "not-started";
  if (entry.state === "in-progress") return entry.answered > 0 ? "in-progress" : "not-started";
  if (entry.state === "completed") return entry.pass === false ? "retry" : "completed";
  return "not-started";
}
const CARD_KINDS = new Set(["deck", "flashcards", "review", "revise"]);
const NOTES_PAGE = /#\/notes\/(?!daily\b|tasks\b|tag\/|cards\b|exams?\b|help\b|ask\b|io\b)[^/?]+/;
// blocks from the learner's own calendar (lectures, being away) aren't Gradify's to finish
const EXT = ["external", "away", "allday", "ext-exam", "ext-deadline", "exam", "deadline"];
const mine = (b) => !EXT.includes(b.cal);
const hm = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/**
 * The tiles, most pressing first: a session in progress, then today's plan, then everything else newest first.
 * course: the courses' list's newest entry ({ title, href, course, site, course_pct, t }); hist: kit/ui/history.js
 * entries, newest first; session: { steps, i } or null; blocks: today's plan blocks; now: for "today".
 */
export function continueItems({ course = null, hist = [], session = null, blocks = [], limit = 6, now = Date.now() } = {}) {
  const out = [], seen = new Set();
  const add = (x) => { if (!x?.href || seen.has(x.href)) return; seen.add(x.href); out.push(x); };
  if (session && session.i < session.steps?.length) {
    const step = session.steps[session.i];
    add({ kind: "session", icon: "play", label: "Study session", title: `Step ${session.i + 1} of ${session.steps.length}${step?.title ? `: ${step.title}` : ""}`, sub: "Carry on where you stopped", href: "#/session", t: Infinity });
  }
  const total = blocks.filter(mine), left = total.filter((b) => !b.done);
  if (left.length) {
    const nx = [...left].sort((a, b) => a.start_min - b.start_min)[0];
    add({ kind: "plan", icon: "clock", label: "Today's plan", title: `${left.length} of ${total.length} ${total.length === 1 ? "block" : "blocks"} left today`, sub: nx ? `Next: ${nx.title}${nx.start_min != null ? ` at ${hm(nx.start_min)}` : ""}` : "", href: "#/plan", t: Infinity - 1 });
  }
  const rest = [];
  if (course?.href) rest.push({ kind: "lesson", icon: "book", label: "Last lesson", title: course.title, sub: [course.course, course.course_pct != null ? `${Math.round(course.course_pct * 100)}% through` : ""].filter(Boolean).join(" · "), href: course.href, t: course.t || 0 });
  const first = (f) => hist.find(f);
  const cards = first((h) => (h.act === "viewed" || h.act === "studied") && (CARD_KINDS.has(h.kind) || (h.kind === "study" && /#\/study\/./.test(h.href))));
  if (cards) rest.push({ kind: "flashcards", icon: "cards", label: "Flashcards", title: cards.title, sub: cards.where || "", href: cards.href, t: cards.t });
  // quizzes and tests: the newest state of each; in progress first, then ones worth another go
  const latest = new Map();
  for (const h of hist) if (h.act === "studied" && h.state && !latest.has(h.href)) latest.set(h.href, h);
  const qs = [...latest.values()];
  const going = qs.find((h) => assessmentStatus(h) === "in-progress");
  if (going) rest.push({ kind: "questions", icon: "target", label: "Questions in progress", title: going.title, sub: [`${going.answered} of ${going.total} answered`, going.where].filter(Boolean).join(" · "), href: going.href, t: going.t });
  const again = qs.find((h) => assessmentStatus(h) === "retry" && now - h.t < RETRY_FOR);
  if (again) rest.push({ kind: "retry", icon: "undo", label: "Available to retry", title: again.title, sub: [`${again.score}% last time`, again.where].filter(Boolean).join(" · "), href: again.href, t: again.t - 1 });
  const notes = first((h) => h.act === "viewed" && NOTES_PAGE.test(h.href));
  if (notes) rest.push({ kind: "notes", icon: "notes", label: "Last opened in Notes", title: notes.title, sub: "Notes", href: notes.href, t: notes.t });
  const subj = first((h) => h.subject);
  if (subj && subj.subject !== course?.course) {
    const base = subj.href.split("#")[0];
    rest.push({ kind: "subject", icon: "flag", label: "Last subject", title: subj.subject, sub: subj.where || "", href: `${base}#/home`, t: subj.t });
  }
  rest.sort((a, b) => b.t - a.t).forEach(add);
  return out.slice(0, limit);
}

/** the row of tiles; appPath turns this app's own links into in-app ones */
export function continueHtml(items, { appPath = "" } = {}) {
  if (!items.length) return "";
  const local = (h) => (appPath && h.startsWith(`${appPath}#`) ? h.slice(appPath.length) : h);
  return `<section class="ct-row" data-pane="overview" aria-label="Pick up where you left off"><h2 class="lo-h">Pick up where you left off</h2>
    <ul>${items.map((x) => `<li><a class="ct-tile k-${esc(x.kind)}" href="${esc(local(x.href))}"><span class="ct-ic" aria-hidden="true">${uiIcon(x.icon)}</span><span class="ct-tx"><small>${esc(x.label)}</small><b>${esc(x.title)}</b>${x.sub ? `<em>${esc(x.sub)}</em>` : ""}</span><span class="ct-go" aria-hidden="true">${uiIcon("right")}</span></a></li>`).join("")}</ul></section>`;
}
