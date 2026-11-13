// Gradify Intelligence: the priority engine. "Given everything Gradify knows about your learning, what is the
// most valuable thing to do next, and why?" Every candidate carries the reason in plain words and the evidence it
// came from. Two guards keep it honest: it separates urgent from important (a deadline doesn't crowd out a
// foundation topic), and it always keeps some new material in the mix so revision never becomes a filter bubble.
// Pure, so Node can test it.
import { DAY, SEC_PER_CARD, dayKey } from "./memory.js";

const enc = encodeURIComponent;
const when = (iso, now) => { const d = Math.round((now - Date.parse(iso)) / DAY); return d <= 0 ? "today" : d === 1 ? "yesterday" : `${d} days ago`; };

/**
 * @param {{ concepts: object[], preds: object, courseNext?: object[], deadlines?: {day:string,title:string,kind:string}[], dailyMinutes?: number, now?: number }} o
 * @returns {{ items: object[], stop: object[] }} ranked activities, and concepts that need nothing now
 */
export function prioritise({ concepts = [], preds, courseNext = [], deadlines = [], dailyMinutes = 20, now = Date.now() } = {}) {
  const items = [];
  const add = (x) => items.push({ weight: "hard", isNew: false, ...x });

  for (const c of concepts) {
    if (c.level === "shaky") {
      const ev = c.evidence.find((e) => e.rating === "again" && e.confidence === "sure");
      add({ id: `fix:${c.key}`, kind: "misconception", tag: "High priority", score: 100 + c.misconceptions.length * 4 + (c.errors.repeated.length ? 6 : 0),
        title: `Revisit ${c.name}`, mins: Math.max(5, c.misconceptions.length * 3),
        why: `You were sure about ${c.misconceptions.length === 1 ? "an answer" : `${c.misconceptions.length} answers`} here that turned out wrong. A misunderstanding spreads to later topics if it isn't fixed early.`,
        because: ev ? `“${ev.front}”, answered wrong while sure, ${when(ev.at, now)}.` : "Confident wrong answers in the last three weeks.",
        href: `#/study/t:${enc(c.key)}` });
    } else if (c.errors.repeated.length) {
      add({ id: `rep:${c.key}`, kind: "weak", tag: "Repeated mistake", score: 82 + c.errors.repeated.length * 3,
        title: `Target ${c.name}`, mins: Math.max(5, c.errors.repeated.length * 3),
        why: `${c.errors.repeated.length === 1 ? "One card keeps" : `${c.errors.repeated.length} cards keep`} coming back wrong. Practising them on their own, then explaining them, breaks the loop.`,
        because: `“${c.errors.repeated[0]}”, wrong twice or more in two weeks.`, href: `#/study/t:${enc(c.key)}` });
    }
    if (c.level !== "shaky" && c.forgetInDays != null && c.forgetInDays <= 1 && c.seen && c.level !== "new") {
      add({ id: `fade:${c.key}`, kind: "review", tag: "Fading", weight: "light", score: 74 + (c.mastery > 0.5 ? 6 : 0),
        title: `Refresh ${c.name}`, mins: Math.max(3, Math.ceil((Math.max(c.due, 4) * SEC_PER_CARD) / 60)),
        why: c.retention != null ? `You'd remember about ${Math.round(c.retention * 100)}% of it if tested now. A short review costs far less than relearning it.` : "It's about to slip.",
        because: c.lastTested ? `Last tested ${when(c.lastTested, now)}.` : "", href: `#/study/t:${enc(c.key)}` });
    }
  }

  const due = preds?.dueCards || 0;
  if (due) add({ id: "due", kind: "review", tag: "Due today", weight: "light", score: 62 + Math.min(18, due / 2),
    title: `Review ${due} due ${due === 1 ? "card" : "cards"}`, mins: Math.max(3, Math.ceil((due * SEC_PER_CARD) / 60)),
    why: "These are the cards you're about to forget. Reviewing them now is what makes memory last.", because: "Scheduled by spaced repetition from your past answers.", href: "#/study" });

  // course steps from every Gradify site (kit/learning/learner-data.js recommend)
  for (const x of courseNext) {
    const isNew = /^Continue /.test(x.label);
    add({ id: `course:${x.label}`, kind: isNew ? "lesson" : "course", tag: isNew ? "New material" : x.site || "Course", isNew, weight: isNew ? "hard" : "light",
      score: Math.round((x.p || 0.5) * 80), title: x.label, mins: isNew ? 12 : 10, why: x.why, because: x.site ? `From ${x.site}.` : "", href: x.href });
  }

  // deadlines: urgent, but only ahead of important work when they're close
  const today = dayKey(now);
  for (const d of deadlines) {
    const days = Math.round((Date.parse(`${d.day}T00:00:00`) - Date.parse(`${today}T00:00:00`)) / DAY);
    if (days < 0 || days > 14) continue;
    add({ id: `dl:${d.day}:${d.title}`, kind: "deadline", tag: "Deadline priority", score: 90 - days * 4, mins: 30,
      title: d.kind === "exam" ? `Prepare for ${d.title}` : `Work on ${d.title}`,
      why: `${d.kind === "exam" ? "Exam" : "Due"} ${days === 0 ? "today" : days === 1 ? "tomorrow" : `in ${days} days`}. Steady progress now avoids a last-minute cram.`, because: "From your calendar.", href: "#/plan" });
  }

  // new cards and deeper questions: new material keeps learning moving forward
  for (const c of concepts) {
    if (c.level === "new") add({ id: `new:${c.key}`, kind: "learn", tag: "New material", isNew: true, score: 48, title: `Start ${c.name}`, mins: Math.max(3, Math.ceil((Math.min(c.fresh, 10) * SEC_PER_CARD) / 60)),
      why: "You haven't been tested on it yet, so Gradify can't tell what you know.", because: `${c.cards} cards from ${c.pack || "your notes"}.`, href: `#/study/t:${enc(c.key)}` });
    else if ((c.level === "strong" || c.level === "mastered") && !c.stages.applied) add({ id: `apply:${c.key}`, kind: "stretch", tag: "Stretch", isNew: true, score: 40, title: `Apply ${c.name}`, mins: 6,
      why: "You recall it well. Using it on a problem you haven't seen is the next level, and it's what exams test.", because: `Recall at ${Math.round((c.dims.recall.value ?? 0) * 100)}%, no application evidence yet.`, href: `#/deck/${enc(c.documentId)}` });
  }

  // one item per id, best first
  const seen = new Set();
  let ranked = items.sort((a, b) => b.score - a.score).filter((x) => (seen.has(x.id) ? false : seen.add(x.id)));
  // anti filter bubble: if the top four are all revision, lift the best new-material item into fourth place
  const top = ranked.slice(0, 4);
  if (top.length === 4 && !top.some((x) => x.isNew)) {
    const fresh = ranked.find((x) => x.isNew);
    if (fresh) ranked = [...ranked.slice(0, 3), { ...fresh, why: `${fresh.why} Gradify mixes in new material so revision doesn't crowd out progress.` }, ...ranked.slice(3).filter((x) => x !== fresh)];
  }
  const stop = concepts.filter((c) => c.level === "mastered" || (c.level === "strong" && (c.forgetInDays ?? 0) > 14)).map((c) => ({ key: c.key, name: c.name, nextReview: c.nextReview }));
  return { items: ranked, stop, budget: dailyMinutes };
}
