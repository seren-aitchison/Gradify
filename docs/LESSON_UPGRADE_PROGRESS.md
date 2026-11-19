# Lesson upgrade programme

Bringing every written lesson up to the [Gradify Learning Standard](CURRICULUM_CONTENT_STANDARD.md), weakest course
first, as measured by `npm run audit:quality` (`docs/quality/AUDIT.md`).

## How a unit is upgraded

1. Read the unit's notes (`kit/courses/<slug>/notes/uNN.js`): titles, leads, existing questions and their levels.
2. Write a patch file of **additions only**, one block per lesson:

   ```
   ## Lesson title (exactly as in the notes)
   LV: …            ← lines before --- go straight after the lesson's S: lead
   O: …
   PRE: …
   ---
   T: term | definition          ← lines after --- are appended at the end of the lesson
   SUM: …
   SRC: citation | kind | year | https link (only if certain)
   EV: established | …
   Q: … | …                      ← one more flashcard (the audit wants at least four)
   M3@n: …                       ← only if the lesson has no level-3 question
   SA2@n: question | model answer | point ; point ; point
   ```

3. `node scripts/upgrade-lessons.mjs kit/courses/<slug>/notes/uNN.js patch.txt` merges it and lists any lesson still
   short of the standard. **Running a patch twice appends it twice**: put follow-ups in a new patch.
4. Check the giveaway rule: the right answer may be conspicuously the longest option in at most 25% of a unit's
   questions. Write distractors as long and as plausible as the answer.
5. `git diff kit/courses/<slug>/notes | grep -c '^-[^-]'` must be **0**: nothing existing is changed or removed.
   Physics questions have no ids, so saved progress is keyed by position (`lesson#n`); new questions only ever go
   after the existing ones.
6. `npm test`, `node scripts/quality-audit.mjs` then `--check`, and the generated-files step from CI.

Accuracy rules from the content standard apply: no invented citations, numbers or thresholds; sources are real,
stable references (BIPM/SI Brochure, CODATA, GUM, OpenStax, named textbooks, primary papers with DOIs); safety lessons
carry a `SAFE:` line. Every upgraded lesson is still **unreviewed** until a subject expert signs it off; the audit
caps accuracy at 60 until then.

## Status

| Course | Units done | Lessons | Lesson scores before → after |
|---|---|---|---|
| Physics | u01–u14 (Foundations, Mathematics for Physics, Experimental Physics, Kinematics and Dynamics, Rotational Mechanics, Oscillations, Gravitation, Fluid Mechanics, Solid Mechanics, Waves, Acoustics, Thermodynamics, Statistical Mechanics, Heat Transfer) | 346 of 1,308 | ~40–45 → 83–93 |

Course score: Physics 47 → 59; all of Gradify 77 → 79 (19 November 2026).

## Next, in order

1. **Physics u15–u54** (962 lessons): the same method. The audit's "30 lessons to improve first" are all in later
   physics units (u25 relativity, u26 orbits and others; u02 statistics, u05 rotation, u07 Hohmann transfers and u09 beams are done).
2. **Law** (66), **Pharmacy** (72), **Nursing** (74): mostly missing `PRE:` and `LV:` (progression 3–47) and
   application questions; these are smaller patches (pre-block only for most lessons).
3. **Every course**: a fourth flashcard per lesson (9,711 lessons short) and `PRE:` links (6,089).
