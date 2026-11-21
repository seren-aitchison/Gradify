// Typed recall: the learner types their answer before seeing the card's, and Gradify says how close it was and
// suggests a rating. Typing makes recall honest (it's easy to "know" an answer you only recognise). The idea is
// from FlashMind's typed-recall mode; this is Gradify's own implementation. Pure, so Node can test it
// (tests/typed.test.mjs).
//
//   right    the answer, allowing case, punctuation, word order and a leading "the/a"  → suggests Good
//   close    a letter or two out (a typo in a long word suggests Good), or most of a
//            longer answer's key words                                                → suggests Hard
//   partial  some of a longer answer's key words                                       → suggests Hard
//   wrong    little of it                                                              → suggests Again
// Easy is never suggested: only the learner knows it was effortless.
// A typed answer that negates what the card says ("not vector" for "vector", "vector" for "not a vector", "neither
// mass nor charge" for "mass and charge") says the opposite, however many words match: a short answer is then wrong,
// and a longer one partial (wrong if half its key words are flipped). Negating something else is fine: "stroma, not
// thylakoid" is still right for "stroma", and so is a reordered answer ("in water, it does not dissolve").

const STOP = new Set("a an the of to in on at by for with from into and or is are was were be it its this that as".split(" "));
const norm = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9×+=\-−÷%.]+/g, " ").replace(/\s\.|\.(\s|$)/g, " ").trim();
const content = (s) => norm(s).split(" ").filter((w) => w && !STOP.has(w));

// What each negation applies to: the next key word after it in the same clause, which is usually what's negated
// ("does not dissolve", "neither mass nor charge", "not (a vector)"). "not only … but also" adds rather than negates.
// A clause ends at a comma, semicolon, sentence end or "but"/"whereas"/…, so a "not" at the end of one reaches nothing
// in the next. Two negations in a row cancel. Contractions are expanded first ("isn't" → "is not"). Returns the key words, each marked negated or not;
// the negation words themselves aren't key words here.
const NEG = new Set(["not", "no", "never", "none", "neither", "nor", "cannot", "nothing", "nobody", "nowhere"]);
const CLAUSE = /[,;:!?]|\.(?:\s|$)|\b(?:but|whereas|although|though|however|instead)\b/g;
function scoped(s) {
  const text = String(s || "").toLowerCase().replace(/\bcan['’]t\b/g, "cannot").replace(/\bwon['’]t\b/g, "will not").replace(/n['’]t\b/g, " not");
  const out = [];
  for (const [c, clause] of text.split(CLAUSE).entries()) {
    let pending = false;
    for (const w of content(clause || "")) {
      if (NEG.has(w)) { pending = !pending; continue; }   // two in a row cancel ("not not X"); "neither X nor Y" negates both
      if (pending && w === "only") { pending = false; continue; }   // "not only X but also Y" affirms X
      out.push({ w, neg: pending, c });
      pending = false;
    }
  }
  return out;
}
// The share of the card's key words that the typed answer has with the opposite sense (negated on one side only).
// A word that appears more than once is paired with the occurrence in the most similar clause (the share of their
// distinct key words they have in common: "cats are mammals" with "cats are not mammals"), so a match in another claim
// can't clear a flipped one, and reordered claims still pair up; ties go in order (the first with the first).
function flipped(typed, expected) {
  const T = scoped(typed), E = scoped(expected);
  if (!E.length) return 0;
  // the same key words with the same negations in the same order: nothing can be flipped
  if (T.length === E.length && T.every((t, i) => t.w === E[i].w && t.neg === E[i].neg)) return 0;
  const words = (L, c) => [...new Set(L.filter((x) => x.c === c).map((x) => x.w))];   // distinct, so a repeat can't outweigh
  const seen = new Map();
  const n = E.filter((e) => {
    const m = T.filter((t) => wordMatch(t.w, e.w));
    if (!m.length) return false;
    const i = seen.get(e.w) || 0; seen.set(e.w, i + 1);
    const ctx = words(E, e.c);
    const overlap = (t) => { const tw = words(T, t.c), shared = tw.filter((w) => ctx.some((x) => wordMatch(w, x))).length; return shared / (tw.length + ctx.length - shared); };
    const best = Math.max(...m.map(overlap));
    const top = m.filter((t) => overlap(t) === best);
    // the in-order occurrence if it's among the best matches, else the first best
    const pick = top.includes(m[Math.min(i, m.length - 1)]) ? m[Math.min(i, m.length - 1)] : top[0];
    return pick.neg !== e.neg;
  }).length;
  return n / E.length;
}

// edit distance, for typos in short answers
function distance(a, b) {
  if (a === b) return 0;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}
// a typed word matches an expected one exactly, by stem ("contracts"/"contraction"), or within a typo
const wordMatch = (t, e) => t === e || (e.length > 5 && t.length > 5 && t.slice(0, e.length - 2) === e.slice(0, e.length - 2)) || (e.length >= 5 && distance(t, e) <= 1);

/**
 * @param {string} typed     what the learner typed
 * @param {string} expected  the card's answer
 * @returns {{ verdict: "right" | "close" | "partial" | "wrong", suggest: "good" | "hard" | "again", score: number } | null}
 *   null when nothing was typed
 */
export function gradeTyped(typed, expected) {
  const r = grade(typed, expected);
  const f = r ? flipped(typed, expected) : 0;
  if (!f) return r;
  // part of the card's answer is negated on one side only: the opposite, whatever words they share
  if (content(expected).length <= 3 || f >= 0.5) return { verdict: "wrong", suggest: "again", score: 0 };
  return r.verdict === "right" || r.verdict === "close" ? { verdict: "partial", suggest: "hard", score: Math.min(r.score, 0.5) } : r;
}

function grade(typed, expected) {
  const t = content(typed), e = content(expected);
  if (!t.length) return null;
  if (!e.length) return null;
  const tj = t.join(" "), ej = e.join(" ");
  if (tj === ej || [...e].sort().join(" ") === [...t].sort().join(" ")) return { verdict: "right", suggest: "good", score: 1 };
  // short answers (a term, a name, a number): spelling counts, a slip of a letter or two doesn't
  if (e.length <= 3) {
    const d = distance(tj, ej), allowed = ej.length >= 12 ? 3 : ej.length >= 6 ? 2 : ej.length >= 4 ? 1 : 0;
    // a number must be exact
    if (/\d/.test(ej) && tj !== ej) return { verdict: "wrong", suggest: "again", score: 0 };
    // a slip is "nearly", never "right": one letter can make a different word (stoma, stroma). In a long word a
    // single slip is almost always a typo, so it still suggests Good.
    if (d <= allowed) return { verdict: "close", suggest: d === 1 && ej.length >= 8 ? "good" : "hard", score: 1 - d / Math.max(ej.length, 1) };
    // the answer is in there, with a little extra ("the stroma of the chloroplast" for "stroma")
    if (` ${tj} `.includes(` ${ej} `) && t.length <= e.length + 3) return { verdict: "right", suggest: "good", score: 0.95 };
    const hit = e.filter((w) => t.some((x) => wordMatch(x, w))).length / e.length;
    return hit >= 0.5 ? { verdict: "partial", suggest: "hard", score: hit } : { verdict: "wrong", suggest: "again", score: hit };
  }
  // longer answers: how many of the answer's key words the learner recalled
  const hit = e.filter((w) => t.some((x) => wordMatch(x, w))).length / e.length;
  if (hit >= 0.85) return { verdict: "right", suggest: "good", score: hit };
  if (hit >= 0.6) return { verdict: "close", suggest: "hard", score: hit };
  if (hit >= 0.3) return { verdict: "partial", suggest: "hard", score: hit };
  return { verdict: "wrong", suggest: "again", score: hit };
}

export const VERDICT_TEXT = { right: "Right", close: "Nearly", partial: "Partly", wrong: "Not quite" };
