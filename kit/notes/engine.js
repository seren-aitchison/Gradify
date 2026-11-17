// Turning notes into a study pack. With a Gradify account, Claude does it on the server
// (supabase/functions/study-pack). Otherwise the browser extractor from Notes Studio runs
// locally. Both return the same shape, and both are fact-checked against the notes.
import { callFunction } from "../data/functions.js";
import { analyseNotes, normaliseNotes, deeperQuestions, browserPack } from "./studio.js";
import { cardsFromPack, packStats, questionCards } from "./pack.js";

// When Gradify AI can't help (switched off, over budget, allowance used, offline), a learner with text
// still gets a pack from the in-browser extractor, with a note saying why, instead of nothing at all.
// Only a refusal about the request itself (notes too long, bad input) or a sign-in problem is passed on.
const usable = (err) => !err?.expired && !err?.signin && !(err?.status >= 400 && err?.status < 500 && !["allowance", "fair_use", "rate"].includes(err?.reason));

export async function generate({ text, pdfBase64, title, site, level, store }) {
  const session = store.mode === "cloud" ? await store.session().catch(() => null) : null;
  let notice = null;
  if (session) {
    try {
      const body = await callFunction(store, "study-pack", { mode: "pack", text, pdfBase64, title, site, level }, { fallback: "Gradify AI couldn't make a pack from these notes." });
      return { engine: "claude", model: body.model || null, packId: body.packId, pack: body.pack, cards: body.cards, stats: body.stats };
    } catch (err) {
      if (!text.trim() || !usable(err)) throw err;
      notice = `${err.message} This pack was made on your device instead.`;
    }
  }
  if (!text.trim()) throw new Error("This PDF has no text Gradify can read on this device (it's probably scanned or handwritten). Try a PDF with selectable text, or paste your notes in.");
  const pack = browserPack(text, title);
  const cards = cardsFromPack(pack, normaliseNotes(text));
  return { engine: "browser", model: null, pack, cards, stats: packStats(pack, cards), notice };
}

// Why and application questions for a deck made before they existed. With an account, Claude
// writes them; otherwise the browser extractor does what the notes allow.
export async function generateQuestions({ text, title, site, level, topics, store }) {
  const session = store.mode === "cloud" ? await store.session().catch(() => null) : null;
  if (session) {
    try { return (await callFunction(store, "study-pack", { mode: "questions", text, title, site, level, topics }, { fallback: "Gradify AI couldn't write questions for these notes." })).cards; }
    catch (err) { if (!text?.trim() || !usable(err)) throw err; }
  }
  if (!text?.trim()) throw new Error("These notes have no text Gradify can read on this device.");
  const a = analyseNotes(text), notes = normaliseNotes(text);
  const deeper = deeperQuestions(a);
  // file each question under the existing topic that shares its source quote, else the extractor's group name
  return a.groups.flatMap((g, gi) => questionCards({ name: g.label, questions: deeper.filter((q) => q.group === gi).map((q) => ({ ...q, page: null })) }, notes))
    .map((c) => ({ ...c, topic: topics.find((t) => t === c.topic) || bestTopic(c, topics) }));
}
function bestTopic(card, topics) {
  if (!topics.length) return card.topic;
  const w = new Set((`${card.front} ${card.back}`.toLowerCase().match(/[a-z]{4,}/g) || []));
  return topics.reduce((best, t) => { const n = (t.toLowerCase().match(/[a-z]{4,}/g) || []).filter((x) => w.has(x)).length; return n > best.n ? { t, n } : best; }, { t: topics[0], n: -1 }).t;
}

// A new version of one card
export async function regenerateCard({ card, notes, store }) {
  const session = store.mode === "cloud" ? await store.session().catch(() => null) : null;
  if (session) {
    try {
      const body = await callFunction(store, "study-pack", { mode: "card", fact: `${card.front} → ${card.back}`, notes: card.source_quote || notes.slice(0, 2000), avoid: [card.front], kind: card.kind }, { fallback: "Couldn't regenerate this card." });
      return { front: body.card.front, back: body.card.back, kind: body.card.type };
    } catch (err) { if (!usable(err)) throw err; }
  }
  if (card.kind === "why" || card.kind === "apply") throw new Error("Rewriting Explain and Apply questions needs Gradify AI. You can edit this one yourself.");
  // Without the AI: flip between a question and a fill-in-the-blank version
  if (card.kind === "cloze") {
    const answer = card.back;
    return { front: `What completes this: “${card.front.replace("_____", "…")}”`, back: answer, kind: "definition" };
  }
  // blank out the most specific word of the source sentence (or the answer)
  const text = (card.source_quote || card.back).replace(/\.$/, "");
  const key = (text.match(/[A-Za-z][A-Za-z-]{3,}/g) || []).sort((a, b) => b.length - a.length)[0];
  if (!key) return { front: card.front, back: card.back, kind: card.kind };
  const sentence = text[0].toUpperCase() + text.slice(1);
  return { front: `${sentence.replace(key, "_____")}.`, back: key, kind: "cloze" };
}
