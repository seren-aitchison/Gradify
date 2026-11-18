// Notes, in any format, into study material: a mind map, flashcards, a chant to say or sing along to, and a
// cheatsheet. Everything comes from Gradify's browser extractor (kit/notes/studio.js browserPack), so it works on
// any device with no AI and nothing leaves the browser, and everything it makes is the learner's own words.
// Pure, so Node tests it (tests/tools.test.mjs).
import { browserPack } from "../notes/studio.js";

const tidy = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
// a fact's definition part: "Systole: phase when…" → "phase when…", "X is caused by Y" → "caused by Y"
const defOf = (f) => {
  const s = tidy(f.statement).replace(/\.$/, "");
  if (!f.term) return s;
  const rest = s.slice(s.toLowerCase().indexOf(f.term.toLowerCase()) + f.term.length).replace(/^\s*(\([^)]*\))?\s*[:–—-]?\s*(is|are|was|were|means)?\s*/i, "");
  return rest || s;
};
const words = (s, n) => { const w = tidy(s).split(" "); return w.length <= n ? w.join(" ") : `${w.slice(0, n).join(" ")}…`; };

/** What the notes hold: Gradify's study pack (topics, facts, equations), with a title. */
export function packOf(text, title = "My notes") {
  const p = browserPack(String(text ?? ""), title);
  p.topics = p.topics.filter((t) => t.facts.length);
  return p;
}

/** A mind map (Mind Elixir node data): the title in the centre, a branch per topic, a bubble per fact. */
export function mapOf(p) {
  let n = 0; const id = () => `c${(n++).toString(36)}`;
  return {
    id: id(), topic: p.title,
    children: [
      ...p.topics.map((t) => ({ id: id(), topic: t.name, children: t.facts.map((f) => ({ id: id(), topic: f.term ? `${f.term}: ${words(defOf(f), 10)}` : words(f.statement, 14) })) })),
      ...(p.equations.length ? [{ id: id(), topic: "Equations", children: p.equations.map((e) => ({ id: id(), topic: e.symbolic })) }] : []),
    ],
  };
}

/** Flashcards in the flashcard creator's syntax (kit/tools/cards.js): concepts both ways, everything else front to back. */
export function deckOf(p) {
  const out = [`# ${p.title}`];
  for (const t of p.topics) {
    out.push("", `# ${t.name}`);
    for (const f of t.facts) {
      if (f.term && f.kind === "definition") out.push(`${f.term} :: ${defOf(f)}`);
      // a cloze card (Gradify AI writes {{c1::…}}) stays a cloze line; any other card goes front to back
      else if (f.card && /\{\{/.test(f.card.front)) out.push(tidy(f.card.front));
      else if (f.card) out.push(`${tidy(f.card.front)} >> ${tidy(f.card.back)}`);
      else if (f.term) out.push(`${f.term} >> ${defOf(f)}`);
    }
  }
  for (const e of p.equations) out.push(`${e.symbolic.split("=")[0].trim()} = {{${e.symbolic.split("=").slice(1).join("=").trim()}}}`);
  return out.join("\n");
}

/**
 * A chant: a verse per topic (each line a term and a few words that pin it down, said twice for the terms that
 * matter most), and a chorus of the topics, with each topic's first-letter mnemonic. Lines are short so they fall
 * on a beat.
 */
export function chantOf(p) {
  const hook = (t) => { const terms = t.facts.filter((f) => f.term).map((f) => f.term); return t.mnemonic && terms.length > 1 ? `${t.mnemonic.split("").join("-")}: ${terms.slice(0, 4).join(", ")}` : null; };
  const verses = p.topics.map((t) => ({
    name: t.name, hook: hook(t),
    lines: t.facts.slice(0, 8).flatMap((f, i) => {
      const line = f.term ? `${f.term}: ${words(defOf(f), 8)}` : words(f.statement, 10);
      return i === 0 && f.term ? [line, `${f.term}, ${f.term}!`] : [line];
    }),
  }));
  const chorus = [...verses.map((v) => v.hook).filter(Boolean).slice(0, 4), `That's ${p.title}, say it again!`];
  return { title: p.title, verses, chorus };
}
/** The chant as the lines to say, in order: each verse with its mnemonic hook, then the chorus. */
export const chantLines = (c) => [
  ...c.verses.flatMap((v) => [...v.lines.map((text) => ({ text, part: v.name })), ...(v.hook ? [{ text: v.hook, part: "Hook" }] : [])]),
  ...c.chorus.map((text) => ({ text, part: "Chorus" })),
];

/** A cheatsheet: a tile per topic with its terms and short definitions, then the equations. */
export function cheatsheetOf(p) {
  return {
    title: p.title,
    tiles: [
      ...p.topics.map((t) => ({ name: t.name, mnemonic: t.mnemonic, items: t.facts.map((f) => ({ term: f.term, text: f.term ? words(defOf(f), 16) : words(f.statement, 20) })) })),
      ...(p.equations.length ? [{ name: "Equations", items: p.equations.map((e) => ({ term: null, text: e.symbolic, mono: true })) }] : []),
    ],
  };
}
