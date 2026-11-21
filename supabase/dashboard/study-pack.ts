// Gradify study-pack function: SINGLE-FILE VERSION for pasting into the Supabase dashboard.
// Generated from supabase/functions/study-pack/index.ts + kit/notes/pack.js.
// Don't edit this file by hand; edit those two and run: npm run sync
import Anthropic from "npm:@anthropic-ai/sdk@0.133.0";
import { createClient } from "npm:@supabase/supabase-js@2.117.0";
import { runAi, ledger, estimateTokens, sha256, fail } from "../_shared/ai.js";

// ---------- Shared pack logic ----------
// Shared, dependency-free logic (plain JavaScript, so the browser can import it too) for the study-pack pipeline: the knowledge-pack schema sent
// to Claude, the prompt, grounding checks against the learner's own notes, and conversion
// to flashcards. Used by the browser, the Supabase function (Deno) and the eval script (Node).
// This is the source: supabase/functions/_shared/pack.js is a copy made by `npm run sync`.

const MODEL = "claude-opus-5-5";

// Bloom's taxonomy, the levels a card can test: recalling a fact is not the same as using it. Evaluating is left to
// the deeper questions and the tutor, since a flashcard rarely tests it well.
const LEVELS = ["remember", "understand", "apply", "analyse"];
// The card types Gradify AI can write; the browser extractor writes definition and cloze cards
const CARD_TYPES = ["definition", "cloze", "why", "reverse", "compare", "sequence", "misconception"];

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
const QUESTIONS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["topics"],
  properties: {
    topics: { type: "array", items: { type: "object", additionalProperties: false, required: ["name", "questions"], properties: { name: str, questions: QUESTIONS } } },
  },
};

const PACK_SCHEMA = {
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

const SYSTEM_PROMPT = `You turn a learner's own study notes into a knowledge pack for Gradify, a learning app. The pack becomes clean notes, flashcards, a spidermap and other study materials, so accuracy matters more than anything else.

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
const FOCUS = {
  apply: "Their recall is strong but they struggle to apply ideas: write an \"apply\" question for every topic the notes support.",
  explain: "They recall facts but struggle to explain them: favour \"why\" cards and \"why\" questions.",
  recall: "They're still learning the basics: favour short definition and cloze cards for every core fact.",
  compare: "They confuse similar terms: write \"compare\" cards wherever the notes contrast two things.",
};
/** @param {unknown} focus @returns {string[]} the known focus values only */
const focusOf = (focus) => (Array.isArray(focus) ? [...new Set(focus.filter((f) => typeof f === "string" && f in FOCUS))].slice(0, 3) : []);

/** @param {{ title: string, site: string, level: string, text: string, today: string, focus?: string[] }} o */
function userPrompt(o) {
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
function groundingScore(quote, notes) {
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
function answerSupport(answer, notes, kind) {
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
function similarity(a, b) {
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
function splitList(card, notes) {
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
function reviewCard(card) {
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
function refineCards(cards, notes) {
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
const REVIEW_SCHEMA = {
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

const REVIEW_PROMPT = `You review flashcards that were written from a learner's own notes, before the learner sees them. You didn't write them. Judge every card against the notes, and only against the notes.

For each card give one verdict:
- "keep": accurate to the notes, one clear question with one right answer, and worth learning.
- "revise": worth keeping but flawed (unclear, gives the answer away, tests two things, a slightly wrong detail). Give the corrected "front" and "back", using only what the notes say.
- "reject": the notes don't support it, it's wrong, more than one answer could fairly be right and that can't be fixed, it's trivial, or it repeats another card.

Cards marked [extra] were deliberately added beyond the notes: keep them unless they're wrong.
"reason" is a few words saying what's wrong, for revise and reject; null for keep. "front" and "back" are null unless the verdict is revise.
Be strict about accuracy and clarity, not about style. Return a verdict for every card, using its id.`;

/** The reviewer's request: the cards, each with an id, and the notes they must match. */
function reviewRequest(cards, notes) {
  const list = cards.map((c, i) => `[c${i + 1}]${c.grounded === "bonus" ? " [extra]" : ""} (${c.kind}) Q: ${c.front}\n      A: ${c.back}`).join("\n");
  return `<notes>\n${notes}\n</notes>\n\n<cards>\n${list}\n</cards>\n\nReview every card.`;
}

/** The reviewer's verdicts applied to the cards they were given: rejected cards removed, corrections checked again.
 * @param {Card[]} cards @param {{ id: string, verdict: string, reason: string | null, front: string | null, back: string | null }[]} verdicts
 * @returns {{ cards: Card[], rejected: { front: string, reason: string | null }[], revised: number }} */
function applyReview(cards, verdicts, notes) {
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
function coverage(pack, cards) {
  const core = (pack.topics || []).flatMap((t) => t.facts || []).filter((f) => f.importance === "core" && f.statement);
  const tested = new Set(cards.map((c) => c.fact).filter(Boolean));
  const missed = core.filter((f) => !tested.has(f.statement));
  return { core: core.length, covered: core.length - missed.length, share: core.length ? (core.length - missed.length) / core.length : 1, uncovered: missed.slice(0, 10).map((f) => f.statement) };
}

/** @typedef {{ topic: string, front: string, back: string, kind: string, importance: string,
 *   sourceQuote: string | null, sourcePage: number | null, grounded: "yes" | "partly" | "no" | "bonus", issues?: string[],
 *   level?: string, prerequisites?: string[] }} Card */

/** The Bloom level a card type tests when nothing more specific is known (browser cards, older packs). */
const levelOf = (kind) => ({ why: "understand", apply: "apply", compare: "analyse", misconception: "analyse", sequence: "understand" })[kind] || "remember";

// Turn a pack into flashcards, flagging any whose quote can't be found in the notes.
/** @returns {Card[]} */
function cardsFromPack(pack, notes) {
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
function questionCards(topic, notes, seen = new Set()) {
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
function packStats(pack, cards) {
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

// ---------- Function ----------
// Supabase Edge Function: study-pack
// POST { mode: "pack", title, site, level, text, pdfBase64?, images?, documentId? }  → { pack, cards, stats, packId, reused? }
//      images: up to 5 photos of notes (handwritten or printed pages), [{ data: base64, type: "image/jpeg" | "image/png" |
//      "image/webp" }], read by Claude like a scanned PDF (Gradify Ultra's photo-to-cards, kit/tools/cardmaker.js)
// POST { mode: "card", fact, notes, avoid, kind? }                         → { card }   (regenerate one card)
// POST { mode: "questions", title, site, level, text, topics }              → { cards, reused? } (why and application
//      questions for a deck made before they existed)
// Every reply also carries { usage }; a refusal carries { error, reason, ... } (docs/APP-API.md).
// Saved packs are never paid for twice: a pack or question set for exactly the same notes is copied from the
// learner's own saved one, with no Claude call and no use of their allowance. Reopening a deck reads its saved
// pack from the database (kit/data/store.js getPack) and never reaches this function.
// Controls (allowances, rate limits, spending caps, cost tracking) are in _shared/ai.js and public.ai_claim_for /
// ai_settle_for; the service role is used for those ledger calls only. Packs are read and saved with the learner's
// own token, so row-level security applies. The Claude API key stays here as a server secret.

const MAX_OUTPUT = { pack: 32000, questions: 16000, card: 2000, review: 8000 };
// The independent card review (about a quarter more per pack: docs/FLASHCARD-ENGINE.md). On unless this secret is "off".
const REVIEW_ON = (Deno.env.get("GRADIFY_PACK_REVIEW") ?? "on") !== "off";
const ALLOWED = (Deno.env.get("GRADIFY_ALLOWED_ORIGINS") ?? "https://getgradify.com,http://localhost:8080").split(",");

// created on first use: without ANTHROPIC_API_KEY the SDK throws, and a request refused before any Claude call
// (AI off, allowance used) must still get its proper answer
let client: Anthropic | null = null;
const anthropic = () => (client ??= new Anthropic()); // reads ANTHROPIC_API_KEY

function cors(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ALLOWED.includes(origin) ? origin : ALLOWED[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}
const json = (req: Request, body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors(req), "Content-Type": "application/json" } });

// One Claude call with structured output. Streams so long packs don't hit HTTP timeouts,
// and opts into server-side fallback so a rare false-positive safety decline is retried.
// The model comes from the claim (public.ai_feature_models): Sonnet for packs and quizzes, Opus for card rewrites.
const ask = (model: string, system: string, content: Anthropic.Beta.BetaContentBlockParam[], schema: Record<string, unknown>, effort: "low" | "medium" | "high", maxTokens: number) =>
  anthropic().beta.messages.stream({
    model,
    max_tokens: maxTokens,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort, format: { type: "json_schema", schema } },
    system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content }],
  }).finalMessage();
const textOf = (msg: Anthropic.Beta.BetaMessage) => msg.content.filter((b) => b.type === "text").map((b) => (b as { text: string }).text).join("");

const CARD_SCHEMA: Record<string, unknown> = {
  type: "object", additionalProperties: false, required: ["type", "front", "back"],
  properties: { type: { type: "string", enum: ["definition", "cloze", "why", "reverse", "apply"] }, front: { type: "string" }, back: { type: "string" } },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(req) });
  if (req.method !== "POST") return json(req, { error: "Use POST." }, 405);

  // Who is asking? Their own token, so row-level security applies to every pack read and write.
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } } });
  const { data: { user } } = await db.auth.getUser();
  if (!user) return json(req, { error: "Please sign in to use Gradify AI.", reason: "signed_out" }, 401);

  let body: any;
  try { body = await req.json(); } catch { return json(req, { error: "Bad request." }, 400); }
  const mode = body.mode === "card" ? "card" : body.mode === "questions" ? "questions" : "pack";
  const site = String(body.site ?? "").slice(0, 40) || null;
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const deps = ledger(admin, user.id);
  const send = (out: { status: number; body: unknown }) => json(req, out.body, out.status);

  try {
    if (mode === "card") {
      const prompt = `Write one new flashcard for this fact from a learner's notes. Make it different from these existing versions: ${JSON.stringify(body.avoid ?? []).slice(0, 2000)}.
Fact: ${String(body.fact ?? "").slice(0, 2000)}
Supporting notes: ${String(body.notes ?? "").slice(0, 4000)}
Use only what the fact and notes say. Front under 25 words, back under 40. Never put the answer in the question.${["why", "apply"].includes(body.kind) ? ` Keep it a "${body.kind}" question: ${body.kind === "why" ? "the learner must explain a cause, mechanism or difference" : "the learner must use the idea on a situation or problem"}. Backs for these can run to 60 words.` : ""}`;
      return send(await runAi(deps, {
        mode, site, estInput: estimateTokens(SYSTEM_PROMPT, prompt), maxOutput: MAX_OUTPUT.card,
        model: MODEL, call: (model: string) => ask(model, SYSTEM_PROMPT, [{ type: "text", text: prompt }], CARD_SCHEMA, "medium", MAX_OUTPUT.card),
        parse: (msg: Anthropic.Beta.BetaMessage) => ({ card: JSON.parse(textOf(msg)) }),
      }));
    }

    const text = String(body.text ?? "");
    const hasPdf = typeof body.pdfBase64 === "string" && body.pdfBase64.length > 0;
    // photos of notes: at most 5, each a JPEG, PNG or WebP of at most about 5 MB (Claude's limit per image)
    const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
    const images = (Array.isArray(body.images) ? body.images : []).filter((im: { data?: unknown; type?: unknown }) => typeof im?.data === "string" && im.data.length > 0 && IMAGE_TYPES.includes(String(im.type)));
    if (Array.isArray(body.images) && images.length !== body.images.length) return json(req, { error: "Photos must be JPEG, PNG or WebP images." }, 400);
    if (images.length > 5) return json(req, { error: "Send at most 5 photos at a time." }, 400);
    if (images.some((im: { data: string }) => im.data.length > 6_900_000)) return json(req, { error: "One of those photos is too large. Try a smaller photo." }, 413);
    const hasImages = images.length > 0;
    if (!text.trim() && !hasPdf && !hasImages) return json(req, { error: "No notes were sent." }, 400);
    if (hasPdf && body.pdfBase64.length > 30_000_000) return json(req, { error: "That PDF is too large." }, 413);
    if (mode === "questions" && !text.trim()) return json(req, { error: "These notes have no text to write questions from." }, 400);
    const topics = (Array.isArray(body.topics) ? body.topics : []).map(String).slice(0, 20);
    // the learner's focus changes what's written, so it's part of what makes a request the same as an earlier one
    const notesHash = await sha256(JSON.stringify([mode, text, hasPdf ? await sha256(body.pdfBase64) : null, ...(hasImages ? [await Promise.all(images.map((im: { data: string }) => sha256(im.data)))] : []), mode === "questions" ? topics : null, ...(mode === "pack" && focusOf(body.focus).length ? [focusOf(body.focus)] : [])]));
    const engine = mode === "pack" ? "claude" : "claude-questions";

    // the same notes again: copy the learner's saved result (a copy, so linking it to a new deck never takes it from
    // the old one). No Claude call, no allowance, no cost.
    const { data: prior } = await db.from("packs").select("pack, stats, model").eq("notes_sha256", notesHash).eq("engine", engine).order("created_at", { ascending: false }).limit(1);
    if (prior?.length) {
      const p = prior[0];
      const { data: copy, error } = await db.from("packs").insert({ user_id: user.id, document_id: mode === "pack" ? body.documentId ?? null : null, engine, model: p.model, pack: p.pack, stats: p.stats, notes_sha256: notesHash, input_tokens: 0, output_tokens: 0 }).select("id").single();
      if (error) throw error;
      if (mode === "questions") { const seen = new Set<string>(); return json(req, { cards: (p.pack.topics ?? []).flatMap((t: { name: string; questions: unknown[] }) => questionCards(t, text, seen)), reused: true }); }
      const cards = cardsFromPack(p.pack, text);
      return json(req, { packId: copy.id, pack: p.pack, cards, stats: p.stats ?? packStats(p.pack, cards), model: p.model, reused: true });
    }

    const prompt = userPrompt({ title: String(body.title ?? "My notes").slice(0, 200), site: String(body.site ?? "Gradify"), level: String(body.level ?? "undergraduate"), text, today: new Date().toISOString().slice(0, 10), focus: focusOf(body.focus), attached: !text.trim() && (hasImages || hasPdf) });
    // notes longer than the learner's plan allows are refused before any Claude call (the use is given back)
    const check = async (claim: { plan: string }) => {
      const { data } = await db.from("ai_plan_caps").select("pack_chars").eq("plan", claim.plan).maybeSingle();
      const limit = data?.pack_chars ?? 40_000;
      if (text.length > limit) fail(413, `These notes are too long for one ${mode === "questions" ? "question set" : "study pack"} (${Math.round(text.length / 1000)}k characters; the ${claim.plan === "pro" ? "Ultra" : "Free"} limit is ${Math.round(limit / 1000)}k). Try one lecture at a time.`, "too_long");
    };

    if (mode === "questions") {
      const ask_ = `${prompt}

The learner already has recall flashcards for these notes. Write only the deeper questions ("why" and "apply"), following the rules for deeper questions. Use exactly these topic names: ${JSON.stringify(topics)}.`;
      return send(await runAi(deps, {
        mode, site, estInput: estimateTokens(SYSTEM_PROMPT, ask_), maxOutput: MAX_OUTPUT.questions, check,
        model: MODEL, call: (model: string) => ask(model, SYSTEM_PROMPT, [{ type: "text", text: ask_ }], QUESTIONS_SCHEMA, "high", MAX_OUTPUT.questions),
        parse: async (msg: Anthropic.Beta.BetaMessage) => {
          const data = JSON.parse(textOf(msg));
          const seen = new Set<string>();
          const cards = (data.topics ?? []).flatMap((t: { name: string; questions: unknown[] }) => questionCards(t, text, seen));
          // saved without a document, so it never replaces the deck's pack, and so the same request isn't paid for twice
          await db.from("packs").insert({ user_id: user.id, document_id: null, engine, model: msg.model, pack: data, notes_sha256: notesHash, stats: { why: cards.filter((c: { kind: string }) => c.kind === "why").length, apply: cards.filter((c: { kind: string }) => c.kind === "apply").length }, input_tokens: msg.usage.input_tokens, output_tokens: msg.usage.output_tokens });
          return { cards };
        },
      }));
    }

    const content: Anthropic.Beta.BetaContentBlockParam[] = [];
    // Scanned or handwritten PDFs have no text layer: send the pages for Claude to read.
    const sendPdf = hasPdf && text.trim().length < 200;
    if (sendPdf) content.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: body.pdfBase64 } });
    // photos of notes come before the instructions, in the order taken, like the pages of a scanned PDF
    for (const im of images) content.push({ type: "image", source: { type: "base64", media_type: im.type as "image/jpeg" | "image/png" | "image/webp", data: im.data } });
    content.push({ type: "text", text: prompt });
    // Two calls under one claim: Claude writes the pack, then a separate request reviews every card against the notes
    // (kit/notes/pack.js: REVIEW_PROMPT). Their token counts are added together, so the ledger and allowance see one
    // request at its real cost. If the review fails, the pack is still returned, with every card checked in code.
    const generateAndReview = async (model: string) => {
      const gen = await ask(model, SYSTEM_PROMPT, content, PACK_SCHEMA, "high", MAX_OUTPUT.pack);
      if (gen.stop_reason !== "end_turn") return gen;
      const pack = JSON.parse(textOf(gen));
      try {
        // reviewed against the notes' text; a scanned PDF has none, so its cards are checked in code only
        if (REVIEW_ON && text.trim().length >= 200) {
          const rev = await ask(model, REVIEW_PROMPT, [{ type: "text", text: reviewRequest(cardsFromPack(pack, text), text) }], REVIEW_SCHEMA, "medium", MAX_OUTPUT.review);
          if (rev.stop_reason === "end_turn") pack.review = { verdicts: JSON.parse(textOf(rev)).verdicts, model: rev.model };
          gen.usage = { ...gen.usage, input_tokens: gen.usage.input_tokens + rev.usage.input_tokens, output_tokens: gen.usage.output_tokens + rev.usage.output_tokens,
            cache_read_input_tokens: (gen.usage.cache_read_input_tokens ?? 0) + (rev.usage.cache_read_input_tokens ?? 0),
            cache_creation_input_tokens: (gen.usage.cache_creation_input_tokens ?? 0) + (rev.usage.cache_creation_input_tokens ?? 0) };
        }
      } catch (e) { console.error("study-pack review", (e as Error)?.message); }
      return { ...gen, content: [{ type: "text", text: JSON.stringify(pack), citations: null }] } as Anthropic.Beta.BetaMessage;
    };
    return send(await runAi(deps, {
      mode, site, check, maxOutput: MAX_OUTPUT.pack + (REVIEW_ON ? MAX_OUTPUT.review : 0),
      // a scanned page costs roughly 1,500 to 3,000 tokens; reserve generously. The review reads the notes again.
      estInput: estimateTokens(SYSTEM_PROMPT, prompt) * (REVIEW_ON ? 2 : 1) + (REVIEW_ON ? estimateTokens(REVIEW_PROMPT) : 0) + (sendPdf ? Math.ceil(body.pdfBase64.length / 40) : 0) + images.length * 1800,
      model: MODEL, call: generateAndReview,
      parse: async (msg: Anthropic.Beta.BetaMessage) => {
        const pack = JSON.parse(textOf(msg));
        const cards = cardsFromPack(pack, text);
        const stats = packStats(pack, cards);
        // Saved with the learner's token, so RLS enforces ownership.
        const { data: saved, error } = await db.from("packs").insert({
          user_id: user.id, document_id: body.documentId ?? null, engine, model: msg.model, pack, stats, notes_sha256: notesHash,
          input_tokens: msg.usage.input_tokens, output_tokens: msg.usage.output_tokens,
        }).select("id").single();
        if (error) throw error;
        return { packId: saved.id, pack, cards, stats, model: msg.model };
      },
    }));
  } catch (e) {
    console.error("study-pack", e);
    return json(req, { error: "Something went wrong. Please try again." }, 500);
  }
});
