// Shared, dependency-free logic (plain JavaScript, so the browser can import it too) for the study-pack pipeline: the knowledge-pack schema sent
// to Claude, the prompt, grounding checks against the learner's own notes, and conversion
// to flashcards. Used by the browser, the Supabase function (Deno) and the eval script (Node).
// This is the source: supabase/functions/_shared/pack.js is a copy made by `npm run sync`.

export const MODEL = "claude-opus-5-5";

// Bloom's taxonomy, the levels a card can test: recalling a fact is not the same as using it. Evaluating is left to
// the deeper questions and the tutor, since a flashcard rarely tests it well.
export const LEVELS = ["remember", "understand", "apply", "analyse"];
// The card types Gradify AI can write; the browser extractor writes definition and cloze cards
export const CARD_TYPES = ["definition", "cloze", "why", "reverse", "compare", "sequence", "misconception"];

// JSON schema for structured outputs. Every object closes with additionalProperties: false
// and lists every key in `required`; optional values are nullable instead.
const str = { type: "string" };
const nstr = { type: ["string", "null"] };
// Deeper questions for a topic: "why" (explain a cause or mechanism) and "apply" (use the idea
// on a situation the notes don't spell out). They feed the Mastery Engine's explanation and
// application evidence.
const QUESTIONS = {
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    required: ["type", "question", "answer", "quote", "page"],
    properties: {
      type: { type: "string", enum: ["why", "apply"] },
      question: str,
      answer: str,
      quote: nstr,
      page: { type: ["integer", "null"] },
    },
  },
};
// Just the deeper questions, for adding them to a deck made before they existed
export const QUESTIONS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["topics"],
  properties: {
    topics: { type: "array", items: { type: "object", additionalProperties: false, required: ["name", "questions"], properties: { name: str, questions: QUESTIONS } } },
  },
};

export const PACK_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["title", "summary", "topics", "equations", "dates", "unclear"],
  properties: {
    title: str,
    summary: str,
    topics: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "theme", "mnemonic", "facts", "questions"],
        properties: {
          name: str,
          theme: str,
          mnemonic: nstr,
          questions: QUESTIONS,
          facts: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["term", "abbreviation", "statement", "kind", "importance", "level", "prerequisites", "quote", "page", "card"],
              properties: {
                term: nstr,
                abbreviation: nstr,
                statement: str,
                kind: { type: "string", enum: ["definition", "cause", "process", "equation", "example", "list", "other"] },
                importance: { type: "string", enum: ["core", "supporting", "bonus"] },
                level: { type: "string", enum: LEVELS },
                prerequisites: { type: "array", items: str },
                quote: nstr,
                page: { type: ["integer", "null"] },
                card: {
                  type: "object",
                  additionalProperties: false,
                  required: ["type", "front", "back"],
                  properties: { type: { type: "string", enum: CARD_TYPES }, front: str, back: str },
                },
              },
            },
          },
        },
      },
    },
    equations: {
      type: "array",
      items: { type: "object", additionalProperties: false, required: ["symbolic", "spoken"], properties: { symbolic: str, spoken: str } },
    },
    dates: {
      type: "array",
      items: { type: "object", additionalProperties: false, required: ["what", "date", "kind"], properties: { what: str, date: nstr, kind: { type: "string", enum: ["exam", "deadline", "class", "other"] } } },
    },
    unclear: { type: "array", items: str },
  },
};

export const SYSTEM_PROMPT = `You turn a learner's own study notes into a knowledge pack for Gradify, a learning app. The pack becomes clean notes, flashcards, a spidermap and other study materials, so accuracy matters more than anything else.

How to read the notes:
- Notes are often messy: shorthand, arrows, typos, half sentences, bullet fragments. Work out what the learner meant.
- Use only what the notes contain. Rewrite each fact clearly, but do not add facts, numbers or examples that are not in the notes. If something important is clearly missing or a fact looks wrong, do not fix it silently: add a short note to "unclear" saying what looks wrong and what the usual answer is.
- If you add anything beyond the notes (a helpful example, a memory hook), mark that fact "bonus" and set its quote to null.
- Group facts into a handful of topics (usually 2 to 6) that a teacher would recognise. "theme" is one or two words for the topic's bubble on a mind map. Give a mnemonic only when it genuinely helps; otherwise null.

For every fact:
- "quote" is a short phrase copied exactly, character for character, from the notes that supports the fact (6 to 15 words is ideal). Do not tidy the spelling inside the quote. Use null only for bonus facts.
- "page" is the page number the quote comes from when the notes are split into pages ("--- page N ---" markers), otherwise null.
- "card" is one flashcard that tests the fact. Prefer questions that make the learner recall or explain, not recognise. Keep fronts under 25 words and backs under 40 words. Never put the answer in the question.
  Choose the card type from what the fact is, not by habit:
  "definition" for a term; "reverse" when the learner should recall a term from its meaning; "cloze" for a key phrase, value or step (put _____ in the front, one blank); "why" for a cause or mechanism; "compare" for the difference between two things the notes contrast (the back gives the deciding difference); "sequence" for the order of steps in a process (ask what comes before or after a named step, not for the whole list); "misconception" when the notes correct a common mistake (ask the learner to spot what's wrong with a plausible wrong statement).
  One fact per card: a card must test one thing, and a learner must be able to say clearly whether they got it right. If a fact is a list of more than three items, test each item, not the whole list.
- "level" is the Bloom level the card tests: "remember" (recall a fact), "understand" (explain or put it in their own words), "apply" (use it on a case), "analyse" (break down or compare). Most cards are "remember" or "understand"; that's right for flashcards.
- "prerequisites" names up to three other concepts in these notes the learner must already know to answer, using those concepts' terms. Empty when none.

Deeper questions: for every topic, write up to three "questions" that go beyond recall.
- "why": ask the learner to explain a cause, mechanism, difference or consequence that the notes support ("Explain why...", "Explain the difference between..."). The answer is the explanation a good student would give, in 2 to 4 sentences.
- "apply": a short, realistic situation or problem that needs the idea to solve: a change to one variable, a case, a prediction, a worked number. The situation can be new, but the reasoning and every fact in the answer must come from the notes. The answer gives the result and the reasoning in 2 to 4 sentences.
- Aim for at least one of each per topic. If the notes don't support an application question for a topic, leave it out rather than inventing facts.
- "quote" is the exact phrase from the notes the answer relies on, as for facts; "page" as for facts.

Dates: list exams, deadlines and classes mentioned in the notes. Give "date" as YYYY-MM-DD when the notes say a specific date and the reference date makes the year clear, otherwise null and keep the wording in "what".

Write in clear British English at the learner's level.`;

// What a learner's own evidence says they need more of (kit/learning/mastery.js), as a line for the prompt. Only these
// fixed values are accepted from the client, so nothing a learner types reaches the prompt this way.
export const FOCUS = {
  apply: "Their recall is strong but they struggle to apply ideas: write an \"apply\" question for every topic the notes support.",
  explain: "They recall facts but struggle to explain them: favour \"why\" cards and \"why\" questions.",
  recall: "They're still learning the basics: favour short definition and cloze cards for every core fact.",
  compare: "They confuse similar terms: write \"compare\" cards wherever the notes contrast two things.",
};
/** @param {unknown} focus @returns {string[]} the known focus values only */
export const focusOf = (focus) => (Array.isArray(focus) ? [...new Set(focus.filter((f) => typeof f === "string" && f in FOCUS))].slice(0, 3) : []);

/** @param {{ title: string, site: string, level: string, text: string, today: string, focus?: string[] }} o */
export function userPrompt(o) {
  const focus = focusOf(o.focus);
  return `Learner: studying on ${o.site}, level: ${o.level}. Reference date: ${o.today}.${focus.length ? `\nWhat this learner's results show: ${focus.map((f) => FOCUS[f]).join(" ")}` : ""}
Document title: ${o.title}

<notes>
${o.text || (o.attached ? "(The notes are in the attached pages above, photographed or scanned. Read every page, including handwriting, arrows, diagrams and margin notes; quote the notes as they are written; and where a word can't be read, leave it out rather than guess.)" : "")}
</notes>

Build the knowledge pack for these notes.`;
}

// ---------- Grounding: does each quote really appear in the notes? ----------
const norm = (/** @type {string} */ s) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

// Exact match after normalising; otherwise the share of the quote's words that appear in
// order within a window of the notes. 0.85 or above counts as grounded.
/** @param {string | null} quote @param {string} notes @returns {number} */
export function groundingScore(quote, notes) {
  if (!quote) return 0;
  const q = norm(quote), n = norm(notes);
  if (!q) return 0;
  if (n.includes(q)) return 1;
  const qw = q.split(" "), nw = n.split(" ");
  let best = 0;
  for (let i = 0; i < nw.length; i++) {
    if (nw[i] !== qw[0] && nw[i] !== qw[1]) continue;
    let j = 0, k = i, hit = 0;
    while (j < qw.length && k < nw.length && k < i + qw.length * 2) {
      if (nw[k] === qw[j]) { hit++; j++; k++; } else if (nw[k + 1] === qw[j]) k++; else j++;
    }
    best = Math.max(best, hit / qw.length);
  }
  return best;
}

// The quote proves the notes say something; this checks the card's answer says the same thing.
// The share of the answer's content words (or close forms of them) that appear in the notes.
// A fill-in-the-blank answer has to appear in the notes as it is.
const SHORT_COMMON = new Set("a an the and or of to in on at by for is are was its it as be has had not but can may per via all any one two how who why use our out off".split(" "));
const COMMON = new Set("that this with from into when what which their there they them than then have been were will would could should about also because between other some more most only very each such these those where while your".split(" "));
/** @param {string} answer @param {string} notes @param {string} [kind] @returns {number} */
export function answerSupport(answer, notes, kind) {
  const n = ` ${norm(notes)} `, a = norm(answer);
  if (!a) return 0;
  if (kind === "cloze") return n.includes(` ${a} `) ? 1 : 0;
  // numbers and short terms (ATP, CO2, 4) count, and must appear exactly: "5 chambers" isn't "4 chambers"
  const short = (x) => /\d/.test(x) || (x.length >= 2 && x.length <= 3 && !SHORT_COMMON.has(x));
  const w = a.split(" ").filter((x) => short(x) || (x.length > 3 && !COMMON.has(x)));
  // nothing to check isn't proof of support: the whole answer must then be in the notes
  if (!w.length) return n.includes(` ${a} `) ? 1 : 0;
  return w.filter((x) => (short(x) ? n.includes(` ${x} `) : n.includes(` ${x.length > 5 ? x.slice(0, x.length - 2) : x}`))).length / w.length;
}

// ---------- Card quality: one fact per card, no near-duplicates, and a reviewer's checks ----------
// Ideas from pdf2anki (github.com/NicholasMcCarthy/pdf2anki, MIT licence): splitting list answers into one card
// per item, fuzzy duplicate detection, and a reviewer that checks every card before a learner sees it. Written
// for Gradify from scratch, dependency-free, and applied to cards from both engines.

// Character-bigram (Dice) similarity of two strings after normalising: 1 is identical, 0 shares nothing.
/** @param {string} a @param {string} b @returns {number} */
export function similarity(a, b) {
  const x = norm(a), y = norm(b);
  if (x === y) return 1;
  if (x.length < 2 || y.length < 2) return 0;
  const grams = (s) => { const m = new Map(); for (let i = 0; i < s.length - 1; i++) { const g = s.slice(i, i + 2); m.set(g, (m.get(g) || 0) + 1); } return m; };
  const gx = grams(x), gy = grams(y);
  let hit = 0;
  for (const [g, n] of gx) hit += Math.min(n, gy.get(g) || 0);
  return (2 * hit) / (x.length - 1 + y.length - 1);
}

// "Light intensity, CO2 concentration and temperature" → three items; null unless it's a short list of short items
function listItems(back) {
  const t = back.trim().replace(/\.$/, "");
  if (t.split(/\s+/).length > 30 || /[.;:?]/.test(t) || !t.includes(",")) return null;
  // a quantity with its margin ("about seven items, plus or minus two") or a range is one answer, not a list
  if (/\b(plus or minus|give or take|more or less)\b|±|\bto within\b/i.test(t)) return null;
  const items = t.split(/,\s*(?:and\s+|or\s+)?|\s+(?:and|or)\s+(?=[^,]*$)/).map((x) => x.trim()).filter(Boolean);
  if (items.length < 3 || items.length > 8 || items.some((x) => x.split(/\s+/).length > 5)) return null;
  return items;
}
const joinList = (xs) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs.at(-1)}` : xs[0]);

// A card asking for a whole list ("What are the limiting factors?") becomes one fill-in-the-blank card per item:
// each item is a separate fact to remember, and a learner who knows two of three can say so.
/** @param {Card} card @param {string} notes @returns {Card[]} */
export function splitList(card, notes) {
  if (!["definition", "reverse"].includes(card.kind)) return [card];
  const m = card.front.match(/^(?:what|name|list)\s+(?:are|is|were)?\s*(?:the\s+)?(.+?)\??$/i);
  const items = m && listItems(card.back);
  if (!items) return [card];
  const subject = m[1][0].toUpperCase() + m[1].slice(1);
  // the answer was capitalised as a sentence; the notes say whether its first item really starts with a capital
  const low = items[0][0].toLowerCase() + items[0].slice(1);
  if (low !== items[0] && notes.includes(low)) items[0] = low;
  return items.map((item, i) => {
    const shown = items.map((x, j) => (j === i ? "_____" : x));
    return { ...card, front: `${subject}: ${joinList(shown)}.`, back: item, kind: "cloze",
      grounded: card.grounded === "yes" && answerSupport(item, notes, "cloze") < 1 ? "partly" : card.grounded };
  });
}

// The reviewer's checks, from the rules for good flashcards: one clear question, an answer the question doesn't
// give away, short enough to recall in one go.
const DEEP = new Set(["why", "apply"]);
const CONTRAST = new Set(["why", "apply", "compare", "misconception"]);   // may fairly ask what isn't so
/** @param {Card} card @returns {string[]} what's wrong with it, if anything */
export function reviewCard(card) {
  const issues = [], f = card.front, b = card.back, fw = f.split(/\s+/).length, bw = b.split(/\s+/).length;
  const nb = norm(b);
  // empty only when there's nothing to recall: no letter or digit at all. Notation made of single letters and
  // symbols ("O(n)", "f'(g(x)) g'(x)", "x = y") is a real answer, and maths and computing depend on it.
  if (!/[\p{L}\p{N}]/u.test(b) || (!nb && !/[=+\-×÷^()'′<>≤≥∑∫√]/.test(b))) issues.push("empty");
  if (card.kind !== "cloze" && nb.length >= 2 && ` ${norm(f)} `.includes(` ${nb} `)) issues.push("leak");
  // a one-character answer ("C") is usually notation trivia, not an idea: worth a look, not worth deleting
  if (card.kind !== "cloze" && /^\S$/u.test(b.trim())) issues.push("trivial");
  if (card.kind === "cloze" && !f.includes("_____")) issues.push("no-blank");
  if (/^(it|this|they|these|those|he|she)\b/i.test(f.trim())) issues.push("vague");
  if (fw > 30) issues.push("long-front");
  if (bw > (DEEP.has(card.kind) ? 80 : 40)) issues.push("long-back");
  if (!DEEP.has(card.kind) && /^(is|are|does|do|did|can|could|was|were|has|have|will|should)\b/i.test(f.trim())) issues.push("yes-no");
  if (/\b(not|never|except|isn't|aren't|doesn't)\b/i.test(f) && !CONTRAST.has(card.kind) && card.kind !== "cloze") issues.push("negative");
  return issues;
}
// issues that make a card unusable, or that a learner should look at before revising it
const DROP = new Set(["empty", "no-blank"]), CHECK = new Set(["leak", "vague", "trivial"]);

/** One fact per card, near-duplicates removed (the better-checked copy kept), and each card reviewed.
 * @param {Card[]} cards @param {string} notes @returns {Card[]} */
export function refineCards(cards, notes) {
  const rank = { yes: 3, bonus: 2, partly: 1, no: 0 };
  /** @type {Card[]} */
  const out = [];
  for (const c of cards.flatMap((c) => splitList(c, notes))) {
    const issues = reviewCard(c);
    if (issues.some((i) => DROP.has(i))) continue;
    const card = { ...c, issues, grounded: c.grounded === "yes" && issues.some((i) => CHECK.has(i)) ? "partly" : c.grounded };
    // the same question with the same answer, worded a little differently (cards from one list differ in their answer)
    const k = out.findIndex((o) => similarity(o.back, card.back) >= 0.8 && similarity(`${o.front} ${o.back}`, `${card.front} ${card.back}`) >= 0.88
      || (norm(o.back) === norm(card.back) && similarity(o.front, card.front) >= 0.75));
    if (k < 0) out.push(card);
    else if (rank[card.grounded] > rank[out[k].grounded]) out[k] = card;
  }
  return out;
}

// ---------- The reviewer: a second, independent read of every card against the notes ----------
// After Gradify AI writes a pack, a separate request reviews the cards, and can keep, correct or reject each one.
// Its verdicts are saved in the pack (pack.review), so a pack reused for the same notes gets the same cards. The
// reviewer's word isn't final either: a corrected card goes through the same checks in code as any other, so a
// correction that strays from the notes is marked to check. (The reviewer is the idea from pdf2anki; the prompt and
// the checks are Gradify's.)
export const REVIEW_SCHEMA = {
  type: "object", additionalProperties: false, required: ["verdicts"],
  properties: {
    verdicts: {
      type: "array",
      items: {
        type: "object", additionalProperties: false, required: ["id", "verdict", "reason", "front", "back"],
        properties: { id: str, verdict: { type: "string", enum: ["keep", "revise", "reject"] }, reason: nstr, front: nstr, back: nstr },
      },
    },
  },
};

export const REVIEW_PROMPT = `You review flashcards that were written from a learner's own notes, before the learner sees them. You didn't write them. Judge every card against the notes, and only against the notes.

For each card give one verdict:
- "keep": accurate to the notes, one clear question with one right answer, and worth learning.
- "revise": worth keeping but flawed (unclear, gives the answer away, tests two things, a slightly wrong detail). Give the corrected "front" and "back", using only what the notes say.
- "reject": the notes don't support it, it's wrong, more than one answer could fairly be right and that can't be fixed, it's trivial, or it repeats another card.

Cards marked [extra] were deliberately added beyond the notes: keep them unless they're wrong.
"reason" is a few words saying what's wrong, for revise and reject; null for keep. "front" and "back" are null unless the verdict is revise.
Be strict about accuracy and clarity, not about style. Return a verdict for every card, using its id.`;

/** The reviewer's request: the cards, each with an id, and the notes they must match. */
export function reviewRequest(cards, notes) {
  const list = cards.map((c, i) => `[c${i + 1}]${c.grounded === "bonus" ? " [extra]" : ""} (${c.kind}) Q: ${c.front}\n      A: ${c.back}`).join("\n");
  return `<notes>\n${notes}\n</notes>\n\n<cards>\n${list}\n</cards>\n\nReview every card.`;
}

/** The reviewer's verdicts applied to the cards they were given: rejected cards removed, corrections checked again.
 * @param {Card[]} cards @param {{ id: string, verdict: string, reason: string | null, front: string | null, back: string | null }[]} verdicts
 * @returns {{ cards: Card[], rejected: { front: string, reason: string | null }[], revised: number }} */
export function applyReview(cards, verdicts, notes) {
  const by = new Map((verdicts || []).map((v) => [v.id, v]));
  const out = [], rejected = [];
  let revised = 0;
  cards.forEach((c, i) => {
    const v = by.get(`c${i + 1}`);
    if (!v || v.verdict === "keep") { out.push(c); return; }
    if (v.verdict === "reject") { rejected.push({ front: c.front, reason: v.reason ?? null }); return; }
    const front = (v.front || "").trim(), back = (v.back || "").trim();
    if (!front || !back) { out.push(c); return; }
    revised++;
    const card = { ...c, front, back, revisedBy: "reviewer" };
    const issues = reviewCard(card);
    if (issues.some((x) => DROP.has(x))) { rejected.push({ front: c.front, reason: "the correction wasn't usable" }); return; }
    const backed = c.grounded === "bonus" || answerSupport(back, notes, card.kind) >= 0.6;
    out.push({ ...card, issues, grounded: c.grounded === "bonus" ? "bonus" : c.grounded === "yes" && backed && !issues.some((x) => CHECK.has(x)) ? "yes" : c.grounded === "no" ? "no" : "partly" });
  });
  return { cards: out, rejected, revised };
}

/** Coverage: the core facts in a pack that no card tests (after checks and review removed some), so nothing
 * important is silently missed. @returns {{ core: number, covered: number, share: number, uncovered: string[] }} */
export function coverage(pack, cards) {
  const core = (pack.topics || []).flatMap((t) => t.facts || []).filter((f) => f.importance === "core" && f.statement);
  const tested = new Set(cards.map((c) => c.fact).filter(Boolean));
  const missed = core.filter((f) => !tested.has(f.statement));
  return { core: core.length, covered: core.length - missed.length, share: core.length ? (core.length - missed.length) / core.length : 1, uncovered: missed.slice(0, 10).map((f) => f.statement) };
}

/** @typedef {{ topic: string, front: string, back: string, kind: string, importance: string,
 *   sourceQuote: string | null, sourcePage: number | null, grounded: "yes" | "partly" | "no" | "bonus", issues?: string[],
 *   level?: string, prerequisites?: string[] }} Card */

/** The Bloom level a card type tests when nothing more specific is known (browser cards, older packs). */
export const levelOf = (kind) => ({ why: "understand", apply: "apply", compare: "analyse", misconception: "analyse", sequence: "understand" })[kind] || "remember";

// Turn a pack into flashcards, flagging any whose quote can't be found in the notes.
/** @returns {Card[]} */
export function cardsFromPack(pack, notes) {
  /** @type {Card[]} */
  const out = [];
  const seen = new Set();
  for (const t of pack.topics || []) {
    for (const f of t.facts || []) {
      const c = f.card;
      if (!c || !c.front?.trim() || !c.back?.trim()) continue;
      const key = norm(c.front);
      if (seen.has(key)) continue;
      seen.add(key);
      const g = f.importance === "bonus" ? -1 : groundingScore(f.quote, notes);
      // a real quote isn't enough: the answer must say what the notes say, or the card is "to check"
      const backed = g < 0 || answerSupport(c.back, notes, c.type) >= 0.6;
      out.push({
        topic: t.name, front: c.front.trim(), back: c.back.trim(), kind: c.type, importance: f.importance,
        sourceQuote: f.quote, sourcePage: f.page ?? null, level: LEVELS.includes(f.level) ? f.level : levelOf(c.type),
        prerequisites: Array.isArray(f.prerequisites) ? f.prerequisites.slice(0, 3) : [], fact: f.statement ?? null,
        grounded: g < 0 ? "bonus" : g >= 0.85 && backed ? "yes" : g >= 0.5 ? "partly" : "no",
      });
    }
    out.push(...questionCards(t, notes, seen));
  }
  const refined = refineCards(out, notes);
  return pack.review?.verdicts ? applyReview(refined, pack.review.verdicts, notes).cards : refined;
}

// A topic's deeper questions as cards (kind "why" or "apply"), checked against the notes like facts
/** @returns {Card[]} */
export function questionCards(topic, notes, seen = new Set()) {
  /** @type {Card[]} */
  const out = [];
  for (const q of topic.questions || []) {
    if (!q.question?.trim() || !q.answer?.trim()) continue;
    const key = norm(q.question);
    if (seen.has(key)) continue;
    seen.add(key);
    const g = groundingScore(q.quote, notes);
    out.push({
      topic: topic.name, front: q.question.trim(), back: q.answer.trim(), kind: q.type, importance: "core", level: levelOf(q.type),
      sourceQuote: q.quote, sourcePage: q.page ?? null, grounded: g >= 0.85 ? "yes" : g >= 0.5 ? "partly" : "no",
    });
  }
  return out;
}

// Quality numbers for a pack, used by the eval script and stored with each pack.
/** @param {Card[]} cards */
export function packStats(pack, cards) {
  const facts = (pack.topics || []).flatMap((t) => t.facts || []);
  const nonBonus = cards.filter((c) => c.grounded !== "bonus");
  // the whole answer appears, as whole words, inside the question
  const leaks = cards.filter((c) => { const b = norm(c.back); return c.kind !== "cloze" && b.length >= 2 && ` ${norm(c.front)} `.includes(` ${b} `); }).length;
  return {
    topics: (pack.topics || []).length,
    facts: facts.length,
    cards: cards.length,
    grounded: nonBonus.length ? nonBonus.filter((c) => c.grounded === "yes").length / nonBonus.length : 1,
    ungrounded: nonBonus.filter((c) => c.grounded === "no").length,
    bonus: cards.length - nonBonus.length,
    answerLeaks: leaks,
    longFronts: cards.filter((c) => c.front.split(/\s+/).length > 30).length,
    unclear: (pack.unclear || []).length,
    why: cards.filter((c) => c.kind === "why").length,
    apply: cards.filter((c) => c.kind === "apply").length,
    flagged: cards.filter((c) => (c.issues || reviewCard(c)).length).length,
    levels: Object.fromEntries(LEVELS.map((l) => [l, cards.filter((c) => (c.level || levelOf(c.kind)) === l).length])),
    factCoverage: coverage(pack, cards).share,
    reviewed: Boolean(pack.review?.verdicts),
    rejected: pack.review?.verdicts ? pack.review.verdicts.filter((v) => v.verdict === "reject").length : 0,
  };
}
