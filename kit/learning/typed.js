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

const STOP = new Set("a an the of to in on at by for with from into and or is are was were be it its this that as".split(" "));
const norm = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9×+=\-−÷%.]+/g, " ").replace(/\s\.|\.(\s|$)/g, " ").trim();
const content = (s) => norm(s).split(" ").filter((w) => w && !STOP.has(w));

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
