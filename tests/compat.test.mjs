// Backward compatibility of the new assessment library with existing content and saved progress.
// Physics notes were written before question ids, options-with-explanations and new question types.
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseNotes } from "../kit/course/notes.js";
import { markQuestion, normalize, renderQuestion } from "../kit/assess/questions.js";
import physics from "../kit/courses/physics/course.js";

// the parser as it was before the library (commit cdd837e), frozen in tests/fixtures/legacy-parser
import * as old from "./fixtures/legacy-parser/kit/course/notes.js";

test("physics: every lesson parses to the same check questions, in the same order, as before", async () => {
  for (const id of physics.written) {
    const text = await physics.notes(id), a = old.parseNotes(text), b = parseNotes(text);
    assert.equal(b.length, a.length, id);
    a.forEach((L, i) => {
      assert.equal(b[i].mcq.length, L.mcq.length, `${id} ${L.title}: same number of questions, so saved lesson#index keys still match`);
      L.mcq.forEach((m, j) => { const n = b[i].mcq[j]; assert.equal(n.q, m.q); assert.equal(n.right, m.right); assert.deepEqual(n.wrong, m.wrong); assert.equal(n.d, m.d); });
      assert.equal(b[i].cards.length, L.cards.length, `${id} ${L.title}: flashcards unchanged`);
    });
  }
});

test("nursing and law: the old parser and the new one find the same single-choice questions (ids aside)", async () => {
  for (const slug of ["nursing", "law"]) {
    const course = (await import(`../kit/courses/${slug}/course.js`)).default;
    for (const id of course.written) {
      const text = await course.notes(id);
      const strip = text.replace(/^((?:M|TF|MS|SEQ|MATCH|SA)[123]?)(?:#[a-z0-9-]+)?(?:@[\d,]+)?:/gm, "$1:");
      const a = old.parseNotes(strip), b = parseNotes(text);
      a.forEach((L, i) => assert.equal(b[i].mcq.length, L.mcq.length, `${slug} ${id} ${L.title}`));
    }
  }
});

test("a question in the old { right, wrong } shape renders and marks", () => {
  const Q = { q: "2 + 2?", right: "4", wrong: ["3", "5", "22"], why: "Addition.", d: 1 };
  const N = normalize(Q);
  assert.equal(N.options.length, 4); assert.ok(N.options[0].correct);
  assert.match(renderQuestion(Q, "p-u01-l01#0"), /2 \+ 2\?/);
  assert.equal(markQuestion(Q, "4").correct, true);
  assert.equal(markQuestion(Q, "5").correct, false);
});

test("physics questions keep their legacy keys (no ids), so existing solved marks still apply", async () => {
  for (const id of physics.written.slice(0, 5)) for (const L of parseNotes(await physics.notes(id))) for (const m of L.mcq) assert.equal(m.id, null);
});
