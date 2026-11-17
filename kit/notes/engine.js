// Turning notes into a study pack. With a Gradify account, Claude does it on the server
// (supabase/functions/study-pack). Otherwise the browser extractor from Notes Studio runs
// locally. Both return the same shape, and both are fact-checked against the notes.
import { callFunction } from "../data/functions.js";
import { analyseNotes, normaliseNotes, deeperQuestions, browserPack } from "./studio.js";
import { cardsFromPack, packStats, questionCards } from "./pack.js";

export async function generate({ text, pdfBase64, title, site, level, store }) {
  const session = store.mode === "cloud" ? await store.session().catch(() => null) : null;
  if (session) {
    const body = await callFunction(store, "study-pack", { mode: "pack", text, pdfBase64, title, site, level }, { fallback: "Gradify AI couldn't make a pack from these notes." });
    return { engine: "claude", model: body.model || null, packId: body.packId, pack: body.pack, cards: body.cards, stats: body.stats };
  }
  if (!text.trim()) throw new Error("This PDF has no text layer (it's probably scanned or handwritten). Sign in to use Gradify AI, which can read scans.");
  const pack = browserPack(text, title);
  const cards = cardsFromPack(pack, normaliseNotes(text));
  return { engine: "browser", model: null, pack, cards, stats: packStats(pack, cards) };
}

// Why and application questions for a deck made before they existed. With an account, Claude
// writes them; otherwise the browser extractor does what the notes allow.
export async function generateQuestions({ text, title, site, level, topics, store }) {
  const session = store.mode === "cloud" ? await store.session().catch(() => null) : null;
  if (session) return (await callFunction(store, "study-pack", { mode: "questions", text, title, site, level, topics }, { fallback: "Gradify AI couldn't write questions for these notes." })).cards;
  if (!text?.trim()) throw new Error("These notes have no text Gradify can read on this device. Sign in to use Gradify AI.");
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
    const body = await callFunction(store, "study-pack", { mode: "card", fact: `${card.front} → ${card.back}`, notes: card.source_quote || notes.slice(0, 2000), avoid: [card.front], kind: card.kind }, { fallback: "Couldn't regenerate this card." });
    return { front: body.card.front, back: body.card.back, kind: body.card.type };
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
