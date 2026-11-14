// Adaptive card generation: what kind of card each concept needs next, from the learner's own evidence, and the
// cards Gradify can safely write itself.
//
// Gradify never invents subject knowledge here. It writes a card only by rearranging what the learner's own cards
// already say:
//   reverse     a definition they know well, turned round ("Which term means: …?"), so recall works both ways
//   compare     two terms they keep confusing (similar names, at least one answered wrong), side by side
// Other needs are flagged, not written, because they'd need new content:
//   apply       recall is strong but nothing tests using the idea
//   explain     recall is strong but nothing asks why
//   rephrase    one card keeps being forgotten: it's probably too big or unclear; split or reword it
// Every suggestion is checked against the deck so it never duplicates a card the learner already has.
// Pure, so Node can test it (tests/intel3.test.mjs).
import { definedTerm } from "./debt.js";

const keyOf = (c) => `${c.document_id}|${c.topic || "Cards"}`;
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
const tokens = (s) => new Set(norm(s).split(" ").filter((w) => w.length > 2));
const jaccard = (a, b) => { const A = tokens(a), B = tokens(b); if (!A.size || !B.size) return 0; let n = 0; for (const w of A) if (B.has(w)) n++; return n / (A.size + B.size - n); };
const STOP = new Set(["what", "which", "with", "from", "that", "this", "their", "there", "about", "into"]);

/** True if a card with this front (or one very like it) is already in the list. */
export function isDuplicate(front, cards) {
  const f = norm(front);
  return cards.some((c) => norm(c.front) === f || jaccard(c.front, front) >= 0.8);
}

/**
 * @param {{ concepts?: object[], cards?: object[], limit?: number }} o concepts: learner memory (kit/intel/memory.js)
 * @returns {{ key, topic, need, why, card?: object, cards?: object[], href }[]}
 */
export function cardNeeds({ concepts = [], cards = [], limit = 8 } = {}) {
  const live = cards.filter((c) => !c.suspended);
  const out = [], made = [];
  const add = (x) => { if (x.card) { if (isDuplicate(x.card.front, [...live, ...made])) return; made.push(x.card); } out.push(x); };
  const byTopic = new Map();
  for (const c of live) { const k = keyOf(c); if (!byTopic.has(k)) byTopic.set(k, []); byTopic.get(k).push(c); }

  // two terms the learner confuses: same deck, a shared distinctive word, and at least one answered wrong
  // only cards that plainly define a term ("What is…", "Define…"), so the term is exactly what the learner wrote
  const defs = live.filter((c) => /^\s*(?:what\s+(?:is|are)|define)\b/i.test(c.front || "")).map((c) => ({ c, term: definedTerm(c) })).filter((x) => x.term && x.c.back);
  for (let i = 0; i < defs.length; i++) for (let j = i + 1; j < defs.length; j++) {
    const a = defs[i], b = defs[j];
    if (a.c.document_id !== b.c.document_id || a.term === b.term) continue;
    // they must share their head noun ("end-diastolic volume" / "end-systolic volume"), not just a modifier
    // ("cardiac cycle" / "cardiac output" are different kinds of thing, rarely confused)
    const head = (t) => norm(t).split(" ").pop();
    const shared = head(a.term) === head(b.term) && head(a.term).length >= 4 && !STOP.has(head(a.term)) ? [head(a.term)] : [];
    const wrong = a.c.last_rating === "again" || b.c.last_rating === "again" || (a.c.lapses || 0) + (b.c.lapses || 0) > 0;
    if (!shared.length || !wrong) continue;
    add({ key: keyOf(a.c), topic: a.c.topic || "Cards", need: "compare", why: `“${a.term}” and “${b.term}” are both kinds of “${shared[0]}”, and one of them has been answered wrong. Seeing them side by side helps tell them apart.`,
      card: { document_id: a.c.document_id, topic: a.c.topic, kind: "why", front: `What's the difference between ${a.term} and ${b.term}?`, back: `${cap(a.term)}: ${a.c.back}\n${cap(b.term)}: ${b.c.back}`, source_quote: null } });
  }
  for (const con of concepts) {
    const list = byTopic.get(con.key) || [];
    if (!list.length) continue;
    const kinds = new Set(list.map((c) => c.kind || "definition"));
    // reverse: definitions answered well at least twice, with no card asking the other way
    for (const c of list) {
      const term = definedTerm(c);
      if (!term || c.reps < 2 || !["good", "easy"].includes(c.last_rating) || kinds.has("reverse") || String(c.back).length > 160) continue;
      add({ key: con.key, topic: con.name, need: "reverse", why: `You know what “${term}” means. Asking it the other way round makes the recall work in both directions.`,
        card: { document_id: c.document_id, topic: c.topic, kind: "reverse", front: `Which term means: ${String(c.back).replace(/\.$/, "")}?`, back: cap(term), source_quote: null } });
      break;
    }
    const rec = con.dims?.recall;
    if (rec?.n >= 3 && rec.value >= 0.7) {
      if (!kinds.has("apply")) add({ key: con.key, topic: con.name, need: "apply", why: `Your recall of ${con.name} is ${Math.round(rec.value * 100)}%, but nothing tests using it on a new problem, which is what exams ask.` });
      else if (!kinds.has("why")) add({ key: con.key, topic: con.name, need: "explain", why: `You recall ${con.name} well. A card asking why it works deepens it and makes it last.` });
    }
    const stuck = list.filter((c) => (c.lapses || 0) >= 3).sort((a, b) => b.lapses - a.lapses)[0];
    if (stuck) add({ key: con.key, topic: con.name, need: "rephrase", why: `“${stuck.front}” has been forgotten ${stuck.lapses} times. Cards that keep slipping are usually too big or unclear: split it in two, or reword it.`, cardId: stuck.id });
  }
  const rank = { compare: 0, rephrase: 1, apply: 2, explain: 3, reverse: 4 };
  return out.sort((a, b) => rank[a.need] - rank[b.need]).slice(0, limit).map((x) => ({ ...x, href: `#/deck/${encodeURIComponent(x.key.split("|")[0])}` }));
}
const cap = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);
