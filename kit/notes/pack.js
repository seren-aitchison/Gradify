// Shared, dependency-free logic (plain JavaScript, so the browser can import it too) for the study-pack pipeline: the knowledge-pack schema sent
// to Claude, the prompt, grounding checks against the learner's own notes, and conversion
// to flashcards. Used by the browser, the Supabase function (Deno) and the eval script (Node).
// This is the source: supabase/functions/_shared/pack.js is a copy made by `npm run sync`.

export const MODEL = "claude-opus-5-5";

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
              required: ["term", "abbreviation", "statement", "kind", "importance", "quote", "page", "card"],
              properties: {
                term: nstr,
                abbreviation: nstr,
                statement: str,
                kind: { type: "string", enum: ["definition", "cause", "process", "equation", "example", "list", "other"] },
                importance: { type: "string", enum: ["core", "supporting", "bonus"] },
                quote: nstr,
                page: { type: ["integer", "null"] },
                card: {
                  type: "object",
                  additionalProperties: false,
                  required: ["type", "front", "back"],
                  properties: { type: { type: "string", enum: ["definition", "cloze", "why", "reverse"] }, front: str, back: str },
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
- "card" is one flashcard that tests the fact. Prefer questions that make the learner recall or explain, not recognise. Keep fronts under 25 words and backs under 40 words. Use "cloze" for lists and key phrases (put _____ in the front), "why" for causes and processes, "definition" for terms, "reverse" when the learner should recall a term from its definition. Never put the answer in the question.

Deeper questions: for every topic, write up to three "questions" that go beyond recall.
- "why": ask the learner to explain a cause, mechanism, difference or consequence that the notes support ("Explain why...", "Explain the difference between..."). The answer is the explanation a good student would give, in 2 to 4 sentences.
- "apply": a short, realistic situation or problem that needs the idea to solve: a change to one variable, a case, a prediction, a worked number. The situation can be new, but the reasoning and every fact in the answer must come from the notes. The answer gives the result and the reasoning in 2 to 4 sentences.
- Aim for at least one of each per topic. If the notes don't support an application question for a topic, leave it out rather than inventing facts.
- "quote" is the exact phrase from the notes the answer relies on, as for facts; "page" as for facts.

Dates: list exams, deadlines and classes mentioned in the notes. Give "date" as YYYY-MM-DD when the notes say a specific date and the reference date makes the year clear, otherwise null and keep the wording in "what".

Write in clear British English at the learner's level.`;

/** @param {{ title: string, site: string, level: string, text: string, today: string }} o */
export function userPrompt(o) {
  return `Learner: studying on ${o.site}, level: ${o.level}. Reference date: ${o.today}.
Document title: ${o.title}

<notes>
${o.text}
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
const COMMON = new Set("that this with from into when what which their there they them than then have been were will would could should about also because between other some more most only very each such these those where while your".split(" "));
/** @param {string} answer @param {string} notes @param {string} [kind] @returns {number} */
export function answerSupport(answer, notes, kind) {
  const n = ` ${norm(notes)} `, a = norm(answer);
  if (!a) return 0;
  if (kind === "cloze") return n.includes(` ${a} `) ? 1 : 0;
  const w = a.split(" ").filter((x) => x.length > 3 && !COMMON.has(x));
  if (!w.length) return 1;
  return w.filter((x) => n.includes(` ${x.length > 5 ? x.slice(0, x.length - 2) : x}`)).length / w.length;
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
/** @param {Card} card @returns {string[]} what's wrong with it, if anything */
export function reviewCard(card) {
  const issues = [], f = card.front, b = card.back, fw = f.split(/\s+/).length, bw = b.split(/\s+/).length;
  const nb = norm(b);
  if (!nb || !nb.split(" ").some((w) => w.length > 1 || /\d/.test(w))) issues.push("empty");
  if (card.kind !== "cloze" && nb.length >= 2 && ` ${norm(f)} `.includes(` ${nb} `)) issues.push("leak");
  if (card.kind === "cloze" && !f.includes("_____")) issues.push("no-blank");
  if (/^(it|this|they|these|those|he|she)\b/i.test(f.trim())) issues.push("vague");
  if (fw > 30) issues.push("long-front");
  if (bw > (DEEP.has(card.kind) ? 80 : 40)) issues.push("long-back");
  if (!DEEP.has(card.kind) && /^(is|are|does|do|did|can|could|was|were|has|have|will|should)\b/i.test(f.trim())) issues.push("yes-no");
  if (/\b(not|never|except|isn't|aren't|doesn't)\b/i.test(f) && !DEEP.has(card.kind) && card.kind !== "cloze") issues.push("negative");
  return issues;
}
// issues that make a card unusable, or that a learner should look at before revising it
const DROP = new Set(["empty", "no-blank"]), CHECK = new Set(["leak", "vague"]);

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

/** @typedef {{ topic: string, front: string, back: string, kind: string, importance: string,
 *   sourceQuote: string | null, sourcePage: number | null, grounded: "yes" | "partly" | "no" | "bonus", issues?: string[] }} Card */

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
        sourceQuote: f.quote, sourcePage: f.page ?? null,
        grounded: g < 0 ? "bonus" : g >= 0.85 && backed ? "yes" : g >= 0.5 ? "partly" : "no",
      });
    }
    out.push(...questionCards(t, notes, seen));
  }
  return refineCards(out, notes);
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
      topic: topic.name, front: q.question.trim(), back: q.answer.trim(), kind: q.type, importance: "core",
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
  };
}
