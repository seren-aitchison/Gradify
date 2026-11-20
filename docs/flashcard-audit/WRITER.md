# Writer brief: 10 more flashcards per lesson

You are one of several writers working in the same checkout, /home/user/Gradify, on branch
claude/funny-johnson-jzpit1. Read docs/FLASHCARD-QUALITY.md first: it is the standard.

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
   `node scripts/fc-insert.mjs <file> <json>`. Do several lessons per JSON to save effort.
   To rewrite a lesson's new cards, put just that lesson in a JSON and add --replace.
4. `node scripts/fc-done.mjs <file>`. It runs the checker and the audit gate, then commits and pushes
   that file alone. Fix every BLOCKING card (rewrite it, --replace that lesson). For each REVIEW card,
   check it against the lesson: rewrite it if the lesson does not support it. Then run fc-done again.
   A file only counts as done when fc-done prints COMMITTED.

Rules: edit only notes files in your batch. Never run git checkout, reset, stash, rebase, merge or
`git add -A`/`git add .`, and never commit other people's files; fc-done commits for you. Don't touch main.
If fc-done reports a push failure, carry on (the commit is safe and the lead will push).
When finished (or if you stop), reply with: files committed, lessons, cards, and anything left unfinished.
