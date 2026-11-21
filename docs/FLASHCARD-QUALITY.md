# Flashcard quality: the "10 more per lesson" run

Every lesson gets 10 new `Q:` flashcards, appended at the end of the lesson. Two checks gate every file
before it is committed, and a sampled rubric review runs across every subject and level.

## 1. Structural checker (hard gate)

`node scripts/check-flashcard-additions.mjs [files]` compares each file with the pinned baseline
(main at `3719ed3`) and fails if:

- any baseline line is removed or changed, or any added line is not a `Q:` card
- lessons change in number or title
- an existing card changes index. Review progress is keyed `${lessonId}#c${index}`
  (`kit/course/course.js`), so moving a card would hand a learner's schedule to a different card.
  `CASE:`, `LAW:` and `DRUG:` lines also make cards, in line order, so new `Q:` lines go after them,
  at the very end of the lesson.
- a lesson has anything other than 0 or exactly 10 new cards
- an answer is over 40 words, a card repeats another in the same lesson, or the file does not load

## 2. Heuristic audit (gate plus review queue)

`node scripts/audit-flashcard-quality.mjs [files]` flags new cards:

| Flag | Meaning | Gate |
|---|---|---|
| `yes-no` | Answerable yes/no: tests recognition, not recall. Rewrite as an open question. | blocks |
| `list-count` | "Name three…" with fewer items in the answer | blocks |
| `too-thin` | A why/how/explain question with a one- or two-word answer | blocks |
| `ungrounded` | Few of the answer's content words appear in the lesson: check the fact is in the lesson | review |
| `number-drift` | A number in the answer that is not in the lesson | review |
| `near-dup` | Very similar to another card in the lesson | review |
| `echo` | Answer mostly repeats the question | review |
| `vague` | No clear single target | review |

"Review" flags must each be looked at against the lesson. Keep the card only if the lesson supports it.

## 3. Rubric (writers apply it; the sampled review scores it)

Each card is scored pass / fix / drop on:

1. **Factual accuracy against the source lesson.** The answer is stated or directly implied by the lesson
   text. No outside facts, dates, numbers or names the lesson doesn't contain, even true ones.
2. **Meaningful recall.** It asks for something worth remembering (a definition, mechanism, rule,
   distinction, step, cause, authority or value), not trivia or wording.
3. **Question clarity.** One clear target; a learner who knows the material knows what is being asked.
4. **Answer completeness.** The answer fully answers the question (all items a list asks for), in 40
   words or fewer.
5. **No ambiguity.** Only one reasonable correct answer, or the question says which one it wants.
6. **No duplication.** Not a restatement of an existing card, check question or another new card.
7. **Appropriate difficulty.** Matches the lesson's level (`LV:` line and course stage): no university
   detail on a primary lesson, no trivial cards on a postgraduate one. The 10 should span the lesson,
   not cluster on its first section.

## 4. Sampled review

`scripts/audit-flashcard-quality.mjs` writes a fixed-seed stratified sample (3 cards per subject × level)
to `docs/flashcard-audit/sample.json`. Reviewers score each sampled card against its lesson using the
rubric. The results go in `docs/flashcard-audit/review.md`, and any fix-or-drop card is rewritten in place
(same lesson, same position), so the count of 10 and every index stay valid.

## 5. Commit gate

`node scripts/fc-done.mjs <file>` runs both checks on one file and commits it only if the structural
checker passes with every lesson at 10, and the audit has no blocking flags. `--checkpoint` commits a partly
done file on the same terms (every started lesson at 10, no checker errors, no blocking flags), so a usage
limit loses at most the lessons in hand. After each commit, `scripts/fc-publish.mjs` publishes to main (the
live site) in the background: in a clean checkout of main it merges the branch, regenerates the course
registries and content API, and pushes only if `npm test` passes. Its log is `.git/fc-publish.log`.
