// Backward compatibility of the new assessment library with existing content and saved progress.
// Physics notes were written before question ids, options-with-explanations and new question types.
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseNotes } from "../kit/course/notes.js";
import { markQuestion, normalize, renderQuestion } from "../kit/assess/questions.js";
import physics from "../kit/courses/physics/course.js";

// the parser as it was before the library (commit cdd837e), frozen in tests/fixtures/legacy-parser
import * as old from "./fixtures/legacy-parser/kit/course/notes.js";

// Physics questions have no permanent ids: saved answers and progress are keyed by lesson and question position
// ("p-u01-l01#0"). The original questions are frozen as fingerprints in tests/fixtures/physics-questions-2026-11-19.json
// (taken from the notes before the content standard 2 upgrade, read by the old parser). The upgrade may add questions
// after them, add objective links, and correct a question's wording in its own slot; it must never remove an original
// question, move one, or insert a new one before it, or saved progress would point at the wrong question.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
const ORIGINAL = JSON.parse(readFileSync(new URL("./fixtures/physics-questions-2026-11-19.json", import.meta.url), "utf8"));
const fp = (s) => createHash("sha256").update(s).digest("hex").slice(0, 10);

test("physics: every original check question and flashcard keeps its position, so saved progress still lines up", async () => {
  for (const id of physics.written) {
    const lessons = parseNotes(await physics.notes(id)), before = ORIGINAL[id] || {};
    for (const [title, was] of Object.entries(before)) {
      const L = lessons.find((x) => x.title === title);
      assert.ok(L, `${id} ${title}: lesson still present`);
      // a question is recognised by its stem or by its right answer, so a corrected wording still counts as itself
      const qs = L.mcq.map((m) => [fp(m.q), fp(m.right)]);
      assert.ok(qs.length >= was.q.length, `${id} ${title}: no original question removed`);
      was.q.forEach((h, j) => {
        const at = qs.findIndex(([q, a]) => q === h || a === was.a[j]);
        assert.ok(at === -1 || at === j || qs[j][0] === h || qs[j][1] === was.a[j], `${id} ${title}: original question ${j} moved to ${at}`);
      });
      const cards = L.cards.map((c) => fp(c[0]));
      assert.ok(cards.length >= was.cards.length, `${id} ${title}: no original flashcard removed`);
      was.cards.forEach((h, j) => { const at = cards.indexOf(h); assert.ok(at === -1 || at === j, `${id} ${title}: original flashcard ${j} moved to ${at}`); });
    }
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
