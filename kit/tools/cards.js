// The flashcard creator's engine: a learner's own notes, written in a RemNote-style syntax, become flashcards.
// Pure (no page, no storage), so Node tests it (tests/tools.test.mjs).
//
//   Front >> Back            a card, front to back                (inline)
//   Back << Front            a card, back to front
//   Front <> Back            two cards, one each way
//   Term :: Definition       a concept: two cards, one each way
//   The {{mitochondria}} make ATP     a cloze: one card for each {{…}} (Anki's {{c1::…}} works too)
//   Question >>>             a multi-line card (rectangular): the lines indented under it are the answer
//     first line of the answer
//     second line
//   ![a label](img:abc123)   an image the learner added, on either side of any card
//
// Every card has an id from its own text, so editing one line never resets the schedule of the others.

const hash = (s) => { let h = 2166136261; for (const ch of String(s)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return (h >>> 0).toString(36); };
const tidy = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
const CLOZE = /\{\{(?:c\d+::)?([\s\S]+?)\}\}/g;
const INDENTED = /^(\s{2,}|\t)|^\s*[-•*]\s/;

/**
 * The cards in a deck's text.
 * @returns {{ id, type, front, back, line }[]}  type: "basic" | "reverse" | "concept" | "cloze" | "multi"
 */
export function parseDeck(text) {
  const lines = String(text ?? "").replace(/\r\n?/g, "\n").split("\n"), cards = [];
  const add = (type, front, back, line, k = 0) => {
    front = tidy(front); back = String(back).trim();
    if (!front || !back) return;
    cards.push({ id: `${type[0]}${hash(`${type}|${front}|${k}`)}`, type, front, back, line });
  };
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i], t = raw.trim();
    if (!t || /^#/.test(t) && !/>>|<<|::|<>|\{\{/.test(t)) continue;
    // a multi-line card: "Question >>>" and the indented lines under it
    let m = t.match(/^(.+?)\s*>>>\s*$/);
    if (m) {
      const answer = [];
      while (i + 1 < lines.length && lines[i + 1].trim() && INDENTED.test(lines[i + 1])) answer.push(lines[++i].trim().replace(/^[-•*]\s*/, "• "));
      add("multi", m[1], answer.join("\n"), i - answer.length);
      continue;
    }
    if (INDENTED.test(raw) && !/>>|<<|::|<>|\{\{/.test(t)) continue;   // an indented line on its own is a note, not a card
    const body = t.replace(/^[-•*]\s+/, "");
    if ((m = body.match(/^(.+?)\s*<>\s*(.+)$/))) { add("basic", m[1], m[2], i); add("reverse", m[2], m[1], i); continue; }
    if ((m = body.match(/^(.+?)\s*::\s*(.+)$/)) && !CLOZE.test(body)) { add("concept", m[1], m[2], i); add("concept", m[2], m[1], i, 1); continue; }
    CLOZE.lastIndex = 0;
    if ((m = body.match(/^(.+?)\s*>>\s*(.+)$/))) { add("basic", m[1], m[2], i); continue; }
    if ((m = body.match(/^(.+?)\s*<<\s*(.+)$/))) { add("reverse", m[2], m[1], i); continue; }
    const gaps = [...body.matchAll(CLOZE)];
    gaps.forEach((g, k) => {
      let n = 0;
      // this gap hidden, the others shown
      const front = body.replace(CLOZE, (_, x) => (n++ === k ? "{{…}}" : x));
      n = 0;
      const back = body.replace(CLOZE, (_, x) => (n++ === k ? `**${x}**` : x));
      add("cloze", front, back, i, k);
    });
  }
  // the same card written twice is one card
  const seen = new Set();
  return cards.filter((c) => (seen.has(c.id) ? false : (seen.add(c.id), true)));
}

/** Image ids used in a deck's text (so unused images can be tidied away). */
export const imagesIn = (text) => [...String(text ?? "").matchAll(/!\[[^\]]*\]\(img:([a-z0-9-]+)\)/gi)].map((m) => m[1]);

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
/**
 * A side of a card as HTML: bold, italic, line breaks, images (`src(id)` gives each image's URL) and the cloze gap.
 */
export function cardHtml(s, src = () => "") {
  return esc(s)
    .replace(/!\[([^\]]*)\]\(img:([a-z0-9-]+)\)/gi, (_, alt, id) => { const u = src(id); return u ? `<img class="tc-img" src="${esc(u)}" alt="${alt}">` : `<span class="tc-noimg">[${alt || "image"}]</span>`; })
    .replace(/\{\{…\}\}/g, '<span class="tc-gap" aria-label="hidden">…</span>')
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<i>$2</i>")
    .replace(/\n/g, "<br>");
}

/**
 * Suggested cards for the lines of a deck that aren't cards yet (the automation: definitions become concept cards,
 * "X is Y" statements become cloze cards on X), from Gradify's browser extractor (kit/notes/studio.js analyseNotes).
 * Returns lines in the deck's own syntax, ready to add.
 */
export async function suggestCards(text) {
  const { analyseNotes } = await import("../notes/studio.js");
  const loose = String(text ?? "").split("\n").filter((l) => l.trim() && !/>>|<<|::|<>|\{\{/.test(l) && !/^\s*#/.test(l)).join("\n");
  if (loose.trim().length < 12) return [];
  const a = analyseNotes(loose), out = [], have = new Set(parseDeck(text).map((c) => c.front.toLowerCase()));
  for (const f of a.facts) {
    if (f.term && f.def) { const line = `${f.term} :: ${tidy(f.def).replace(/\.$/, "")}`; if (!have.has(f.term.toLowerCase())) out.push(line); }
    else if (f.card?.q && f.card?.a) out.push(`${tidy(f.card.q)} >> ${tidy(f.card.a)}`);
  }
  return [...new Set(out)].slice(0, 40);
}

/** Wrap the selection [a, b) of `text` in a cloze. */
export const clozeAt = (text, a, b) => (a < b ? `${text.slice(0, a)}{{${text.slice(a, b)}}}${text.slice(b)}` : text);
