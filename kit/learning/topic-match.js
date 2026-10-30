// Sorting a learner's own topics into a subject's areas, so the learning map shows their real
// topics in the right place. Works without AI: each area is described by its name, its one-line
// description and its subtopics; each of the learner's topics by its name and its cards' text.
// The topic goes to the area whose words it shares most (rarer words count for more), and takes
// the place of the subtopic it matches best. Topics that match nothing are returned unplaced.

const STOP = new Set("the and for with from into what when which that this these those your have has was were are its their than then them each more most other about over under after before only also does done like such many much very some any can will just how why where who".split(" "));
// crude stemming, enough to match "ventricles"/"ventricular" or "cardiac"/"cardio"
const stem = (w) => w.replace(/(ations?|ically|ical|ular|ular|ness|ment|ings?|ies|ied|es|s|ed|al|ic|y)$/, "").slice(0, 7);
export const words = (text) => (String(text).toLowerCase().match(/[a-z0-9]+/g) || []).filter((w) => w.length > 2 && !STOP.has(w)).map(stem);

/**
 * @param {{ name: string, desc?: string, subs: string[] }[]} areas
 * @param {{ key: string, topic: string, text?: string, doc?: string }[]} topics  text: the topic's cards; doc: its deck
 * @returns {{ placed: { area: number, slot: number|null, topic: object, score: number }[], unplaced: object[] }}
 */
export function matchTopics(areas, topics) {
  const areaWords = areas.map((a) => ({ all: new Set(words(`${a.name} ${a.desc || ""} ${a.subs.join(" ")}`)), subs: a.subs.map((s) => new Set(words(s))), name: new Set(words(a.name)) }));
  // how many areas use each word: a word every area shares tells us little
  const df = new Map();
  for (const a of areaWords) for (const w of a.all) df.set(w, (df.get(w) || 0) + 1);
  const weight = (w) => Math.log(1 + areas.length / (df.get(w) || areas.length));
  const scoreOf = (title, body) => areaWords.map((a) => {
    let score = 0;
    for (const w of title) if (a.all.has(w)) score += weight(w) * (a.name.has(w) ? 3 : 2);
    for (const w of body) if (a.all.has(w)) score += weight(w) * 0.25;
    return score;
  });
  const bestOf = (scores) => scores.reduce((b, s, i) => (s > b.score ? { area: i, score: s } : b), { area: -1, score: 0 });
  // a deck (one lecture's notes) usually belongs to one area: score all its topics together
  const byDoc = new Map();
  for (const t of topics) {
    const sc = scoreOf(new Set(words(t.topic)), words(t.text || ""));
    t._scores = sc;
    const d = byDoc.get(t.doc) || areas.map(() => 0);
    byDoc.set(t.doc, d.map((x, i) => x + sc[i]));
  }
  const placed = [], unplaced = [], taken = new Set();
  for (const t of topics) {
    const own = bestOf(t._scores), deck = t.doc != null ? bestOf(byDoc.get(t.doc)) : { area: -1, score: 0 };
    // a strong match of its own wins; otherwise it goes with the rest of its deck
    const best = own.score >= 3 ? own : deck.score >= 1 ? deck : own.score >= 1 ? own : null;
    delete t._scores;
    if (!best) { unplaced.push(t); continue; }
    const title = new Set(words(t.topic)), body = words(t.text || "");
    // which subtopic it stands for: the one sharing the most words, if any is free
    const all = new Set([...title, ...body]);
    const slots = areaWords[best.area].subs.map((s, j) => ({ j, n: [...s].filter((w) => all.has(w)).length })).filter((x) => x.n && !taken.has(`${best.area}-${x.j}`)).sort((x, y) => y.n - x.n);
    const slot = slots.length ? slots[0].j : null;
    if (slot != null) taken.add(`${best.area}-${slot}`);
    placed.push({ area: best.area, slot, topic: t, score: best.score });
  }
  return { placed, unplaced };
}
