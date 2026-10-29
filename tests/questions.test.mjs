import { test } from "node:test";
import assert from "node:assert/strict";
import { cardsFromPack, questionCards, packStats, PACK_SCHEMA, QUESTIONS_SCHEMA } from "../supabase/functions/_shared/pack.js";
import { SAMPLE, analyseNotes, deeperQuestions, normaliseNotes } from "../assets/studio.js";
import { topicProfiles } from "../assets/app/mastery.js";

const NOTES = "Cardiac output equals stroke volume multiplied by heart rate. S1 is caused by closure of the mitral and tricuspid valves.";

test("every topic in the schema asks for deeper questions, and the questions-only schema is closed", () => {
  const topic = PACK_SCHEMA.properties.topics.items;
  assert.ok(topic.required.includes("questions"));
  assert.deepEqual(topic.properties.questions.items.properties.type.enum, ["why", "apply"]);
  assert.equal(QUESTIONS_SCHEMA.additionalProperties, false);
});

test("deeper questions become why and apply cards after the topic's fact cards, checked against the notes", () => {
  const pack = { topics: [{ name: "Heart", facts: [{ statement: "x", importance: "core", quote: "Cardiac output equals stroke volume", card: { type: "definition", front: "What does cardiac output equal?", back: "SV × HR" } }],
    questions: [
      { type: "apply", question: "Heart rate rises and stroke volume is unchanged. What happens to cardiac output?", answer: "It rises, because CO = SV × HR.", quote: "stroke volume multiplied by heart rate", page: null },
      { type: "why", question: "Explain what produces S1.", answer: "Closure of the mitral and tricuspid valves.", quote: "something the notes never say", page: null },
    ] }] };
  const cards = cardsFromPack(pack, NOTES);
  assert.deepEqual(cards.map((c) => c.kind), ["definition", "apply", "why"]);
  assert.equal(cards[1].grounded, "yes");
  assert.equal(cards[2].grounded, "no", "an invented quote is flagged for checking");
  const st = packStats(pack, cards);
  assert.equal(st.why, 1); assert.equal(st.apply, 1);
  assert.equal(questionCards({ name: "T", questions: [{ type: "why", question: " ", answer: "a", quote: null }] }, NOTES).length, 0);
});

test("without the AI, the extractor writes why questions from contrasts and causes, and apply questions from equations", () => {
  const a = analyseNotes(SAMPLE);
  const qs = deeperQuestions(a);
  assert.ok(qs.some((q) => q.type === "why" && /difference between systole and diastole/i.test(q.question)));
  assert.ok(qs.some((q) => q.type === "why" && /first heart sound \(S1\)/.test(q.question)));
  const apply = qs.filter((q) => q.type === "apply");
  assert.equal(apply.length, 2);
  assert.match(apply[0].answer, /^Cardiac output rises/);
  assert.match(apply[1].answer, /^It stays the same/);
  // and every one is grounded in the notes
  const notes = normaliseNotes(SAMPLE);
  const cards = a.groups.flatMap((g, gi) => questionCards({ name: g.label, questions: qs.filter((q) => q.group === gi) }, notes));
  assert.ok(cards.every((c) => c.grounded === "yes"), JSON.stringify(cards.filter((c) => c.grounded !== "yes")));
});

test("apply answers feed the Mastery Engine's application score, and strong topics without them are told to add some", () => {
  const NOW = Date.parse("2026-10-29T12:00:00Z"), DAY = 864e5;
  const c = (id, kind) => ({ id, kind, topic: "T", document_id: "d", reps: 3, interval_days: 10, last_rating: "good", due_at: new Date(NOW + 9 * DAY).toISOString() });
  const rv = (id, rating) => ({ card_id: id, rating, reviewed_at: new Date(NOW - DAY).toISOString() });
  const [p] = topicProfiles([c("a", "definition"), c("b", "apply")], [rv("a", "good"), rv("b", "hard")], { now: NOW });
  assert.equal(p.dims.apply.n, 1);
  assert.ok(p.dims.apply.value < p.dims.recall.value);
  const [q] = topicProfiles([c("a", "definition"), c("x", "definition")], [rv("a", "good"), rv("a", "good"), rv("x", "good"), rv("x", "easy")], { now: NOW });
  assert.equal(q.next.kind, "deepen");
});
