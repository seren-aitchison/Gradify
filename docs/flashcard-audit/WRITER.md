# Writer brief: 10 more flashcards per lesson

You are one of several writers working in the same checkout, /home/user/Gradify, on branch
claude/practical-galileo-m0kuia. Read docs/FLASHCARD-QUALITY.md first: it is the standard.

Your batch is listed in docs/flashcard-audit/plan.json (find your batch id; work through its "files" in order,
finishing one file completely before starting the next).

For each file:
1. `node scripts/check-flashcard-additions.mjs <file>`. If it is already "complete" and
   `node scripts/fc-done.mjs <file> --check-only` passes, skip it (it is done).
   If some lessons already have their 10 new cards, only write the lessons with 0.
2. Read the file. For each lesson (each "## " heading, numbered from 1), write 10 new cards drawn ONLY from
   that lesson's own text (lead, sections, bullets, examples, key ideas, pitfalls, terms, summary, cases).
   - Spread the 10 across the whole lesson, not just its first section.
   - Do not repeat an existing Q:, CASE:, DRUG: or LAW: card, a check question, or each other.
   - Open questions only. Never yes/no ("Is…", "Does…", "Can…" questions are rejected). Ask "What…",
     "Why…", "How…", "Which…", "Name…", "State…", "Define…".
   - One clear target per question. If it asks for "three", the answer gives three.
   - Answers: complete, 40 words or fewer (aim for under 25), no new facts, dates, numbers or names that
     the lesson does not contain, even if true.
   - Match the lesson's level (LV: line and course stage).
   - No backticks, no "${", no " | " inside a question or answer. Write maths as the file does.
3. Write the cards to a JSON file in your own scratch directory (mktemp -d), shaped
   {"1": [["question","answer"], ... 10], "2": [...], ...}, then run
   `node scripts/fc-insert.mjs <file> <json>`. Put 3 to 5 lessons in each JSON.
   To rewrite a lesson's new cards, put just that lesson in a JSON and add --replace.
4. Save as you go: after every fc-insert, run `node scripts/fc-done.mjs <file> --checkpoint`. It runs the
   checker and the audit gate and, if they pass, commits and pushes the lessons finished so far, so a usage
   limit can't lose them. Fix every BLOCKING card (rewrite it, --replace that lesson). For each REVIEW card,
   check it against the lesson: rewrite it if the lesson does not support it. Then run it again. Don't start
   the next JSON until the checkpoint prints CHECKPOINT COMMITTED (or COMMITTED).
5. When every lesson is written, `node scripts/fc-done.mjs <file>`. The file only counts as done when it
   prints COMMITTED. Every commit (checkpoint or final) is published to the live site automatically in the
   background once the full test suite passes; you don't need to do anything for that.

Rules: edit only notes files in your batch. Never run git checkout, reset, stash, rebase, merge or
`git add -A`/`git add .`, and never commit other people's files; fc-done commits for you. Don't touch main.
If fc-done reports a push failure, carry on (the commit is safe and the lead will push).
When finished (or if you stop), reply with: files committed, lessons, cards, and anything left unfinished.

Skip these files: the course content job is rewriting their lessons, so cards written now would be against
stale text. They get their cards after that work is merged.
- kit/courses/biology/notes/u01.js
- kit/courses/biology/notes/u02.js
- kit/courses/chemistry/notes/u01.js
- kit/courses/chemistry/notes/u02.js
- kit/courses/law/notes/u03.js
- kit/courses/maths/notes/u02.js
- kit/courses/maths/notes/u03.js
- kit/courses/maths/notes/u04.js
- kit/courses/maths/notes/u05.js
- kit/courses/maths/notes/u06.js
- kit/courses/maths/notes/u10.js
- kit/courses/maths/notes/u11.js
- kit/courses/maths/notes/u12.js
- kit/courses/maths/notes/u13.js
- kit/courses/maths/notes/u16.js
- kit/courses/maths/notes/u17.js
- kit/courses/maths/notes/u18.js
- kit/courses/maths/notes/u19.js
- kit/courses/maths/notes/u20.js
- kit/courses/maths/notes/u24.js
- kit/courses/maths/notes/u25.js
- kit/courses/maths/notes/u26.js
- kit/courses/maths/notes/u27.js
- kit/courses/maths/notes/u28.js
- kit/courses/nursing/notes/u02.js
- kit/courses/nursing/notes/u16.js
- kit/courses/pharmacy/notes/u02.js
- kit/courses/pharmacy/notes/u06.js
- kit/courses/pharmacy/notes/u15.js
- kit/courses/pharmacy/notes/u18.js
- kit/courses/pharmacy/notes/u19.js
- kit/courses/physics/notes/u10.js
- kit/courses/physics/notes/u12.js
- kit/courses/physics/notes/u15.js
- kit/courses/physics/notes/u16.js
- kit/courses/physics/notes/u17.js
- kit/courses/physics/notes/u19.js
- kit/courses/physics/notes/u21.js
- kit/courses/physics/notes/u23.js
