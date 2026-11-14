// Intelligent card ordering, and the learning opportunity engine: what to do with any free window.
//
// Card order. A plain scheduler shows due cards oldest first. Gradify orders a session by what each card is worth
// now, and says why:
//   forgetting     1 − recall now (FSRS retrievability): a card about to be lost is worth more than one still fresh
//   importance     how many topics rest on its topic (usable links in the knowledge graph), and an exam close by
//   foundations    a prerequisite's cards come before the cards that build on them
//   confidence     a card answered wrong while sure (a misconception) is worth fixing first
//   time           the session fits the learner's minutes, using their own measured seconds per card
// New cards are capped at a third of the session, and no topic runs more than three cards in a row (interleaving
// helps memory and keeps a session from being one topic's slog). Pure, so Node can test it (tests/intel3.test.mjs).
import { recallNow } from "../learning/srs.js";
import { depthOf } from "./graph.js";
import { SEC_PER_CARD } from "./memory.js";

const keyOf = (c) => `${c.document_id}|${c.topic || "Cards"}`;
const DAY = 864e5;

/**
 * @param {object[]} cards candidate cards (due and new)
 * @param {{ concepts?: object[], edges?: object[], reviews?: object[], examDate?: string|null, minutes?: number, now?: number }} o
 *   edges: usable links (kit/intel/graph.js usable())
 * @returns {{ queue: object[], why: Map<string, string[]>, seconds: number, left: number }}
 */
export function orderCards(cards, { concepts = [], edges = [], reviews = [], examDate = null, minutes = 20, now = Date.now() } = {}) {
  const byKey = new Map(concepts.map((c) => [c.key, c]));
  const under = new Map();
  for (const e of edges) under.set(e.from, (under.get(e.from) || 0) + 1);
  const depth = depthOf(edges), maxDepth = Math.max(1, ...cards.map((c) => depth(keyOf(c))));
  // the learner's own pace: median seconds per answer, from their answers' response times
  const ms = reviews.map((r) => r.ms).filter((x) => x > 1000 && x < 180000).sort((a, b) => a - b);
  const secs = ms.length >= 10 ? Math.round(ms[Math.floor(ms.length / 2)] / 1000) + 4 : SEC_PER_CARD;
  const sureWrong = new Set(reviews.filter((r) => r.rating === "again" && r.confidence === "sure" && now - Date.parse(r.reviewed_at) < 21 * DAY).map((r) => r.card_id));
  const examIn = examDate ? (Date.parse(`${examDate}T00:00:00`) - now) / DAY : null;
  const why = new Map();
  const scored = cards.filter((c) => !c.suspended).map((c) => {
    const k = keyOf(c), con = byKey.get(k), r = c.reps ? recallNow(c, now) : null, reasons = [];
    let s = 0;
    if (r != null) { s += (1 - r) * 3; if (r < 0.8) reasons.push(`${Math.round(r * 100)}% chance you'd recall it now`); }
    else { s += 0.9; reasons.push("new"); }
    const n = under.get(k) || 0;
    if (n) { s += Math.min(1.2, n * 0.4); reasons.push(`${n} ${n === 1 ? "topic rests" : "topics rest"} on ${con?.name || "this topic"}`); }
    const d = depth(k);
    s += ((maxDepth - d) / maxDepth) * 0.6;
    if (d === 0 && n) reasons.push("a foundation, so it comes early");
    if (sureWrong.has(c.id)) { s += 1.5; reasons.push("you were sure but wrong last time"); }
    if (con?.certaintyLabel === "low" && c.reps) { s += 0.3; reasons.push("Gradify needs more evidence on this topic"); }
    if (examIn != null && examIn >= 0 && examIn <= 21) s += 0.4;
    why.set(c.id, reasons);
    return { c, s, k, d, isNew: !c.reps };
  });
  // foundations first among cards of similar worth: a prerequisite's card is lifted above its dependants' cards
  scored.sort((a, b) => b.s - a.s || a.d - b.d);
  const budget = Math.max(60, minutes * 60), maxNew = Math.max(1, Math.floor(budget / secs / 3));
  const picked = [];
  let used = 0, fresh = 0;
  for (const x of scored) {
    if (used + secs > budget) break;
    if (x.isNew && fresh >= maxNew) continue;
    picked.push(x); used += secs; if (x.isNew) fresh++;
  }
  // a dependant's card never comes before its prerequisite's in the session
  const pre = new Set(edges.map((e) => `${e.from}>${e.to}`));
  for (let i = 0, guard = 0; i < picked.length && guard < picked.length * picked.length; i++, guard++) {
    const j = picked.findIndex((y, n) => n > i && pre.has(`${y.k}>${picked[i].k}`));
    if (j > i) { picked.splice(i, 0, picked.splice(j, 1)[0]); i--; }
  }
  const queue = interleave(picked, 3, pre);
  return { queue: queue.map((x) => x.c), why, seconds: secs, left: scored.length - picked.length };
}

// no more than three cards from one topic in a row, keeping the order otherwise
// (and never pulling a card ahead of its own topic's prerequisite)
export function interleave(list, max = 3, pre = new Set()) {
  const out = [], rest = [...list];
  while (rest.length) {
    const run = out.slice(-max), stuck = run.length === max && run.every((x) => x.k === run[0].k);
    const ok = (x, n) => x.k !== run[0].k && !rest.slice(0, n).some((y) => pre.has(`${y.k}>${x.k}`));
    const i = stuck ? rest.findIndex(ok) : 0;
    out.push(rest.splice(i < 0 ? 0 : i, 1)[0]);
  }
  return out;
}

// ---------- the learning opportunity engine ----------
// For any free window, the best use of exactly that time. Short windows suit quick retrieval (it's what fits, and
// fading cards are cheap to save); medium ones suit fixing a root cause or a weak spot; long ones suit new material,
// which needs focus. Within that, the priority engine's own ranking decides. One item of each kind at most, so a
// window isn't all one sort of work.
const SUIT = {
  short: { review: 1.3, misconception: 1.2, weak: 1, root: 0.5, deadline: 0.6, course: 0.6, lesson: 0.3, learn: 0.5, stretch: 0.6 },
  medium: { root: 1.25, misconception: 1.2, weak: 1.1, review: 1, deadline: 1, course: 0.9, lesson: 0.8, learn: 0.9, stretch: 0.9 },
  long: { lesson: 1.2, learn: 1.15, root: 1.1, deadline: 1.1, stretch: 1.05, course: 1, misconception: 1, weak: 1, review: 0.85 },
};
export const windowSize = (min) => (min < 12 ? "short" : min < 30 ? "medium" : "long");

/**
 * @param {{ prio: { items: object[] } }} m the model (kit/intel/model.js)
 * @param {number} minutes the free window
 * @returns {{ minutes, size, items: object[], used: number, headline: string, note: string }}
 */
export function forWindow(m, minutes) {
  const size = windowSize(minutes);
  if (minutes < 3) return { minutes, size, items: [], used: 0, headline: "Too short to start something", note: "Under three minutes, a breather is the better use." };
  const items = m.prio?.items || [];
  const ranked = items.map((x, i) => ({ x, v: (x.score || 50 - i) * (SUIT[size][x.kind] ?? 0.8) })).sort((a, b) => b.v - a.v);
  const out = [], kinds = new Set();
  let left = minutes;
  for (const { x } of ranked) {
    if (kinds.has(x.kind) || left < 3) continue;
    // reviews shrink to fit: ten minutes of a twenty-minute review is still worth doing
    const mins = x.kind === "review" ? Math.min(x.mins || 5, left) : x.mins || 10;
    if (mins > left) continue;
    out.push({ ...x, mins }); kinds.add(x.kind); left -= mins;
  }
  const fixing = out.some((x) => ["root", "misconception", "weak"].includes(x.kind)), learning = out.some((x) => ["lesson", "learn"].includes(x.kind));
  const note = size === "short" ? "Quick retrieval fits a short window best: it saves what's fading for little time."
    : size === "medium" ? (fixing ? "Enough time to fix something properly, so the root of a weak spot comes first." : "Nothing needs fixing at the root, so the time goes on what's fading and what's next.")
    : learning ? "Long enough for new material, which needs focus, alongside what's fading." : "Long enough for deeper work, with nothing new waiting.";
  return { minutes, size, items: out, used: minutes - left, headline: out.length ? out.map((x) => x.title).join(", then ") : "Nothing needs doing: you're up to date", note };
}
