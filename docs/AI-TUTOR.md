# Gradify AI tutor

There is one tutor service for every course, the `course-tutor` Edge Function. Its requests are built by `kit/assess/tutor.js`, which is shared by the browser and the server; `npm run sync` copies it to `supabase/functions/_shared/tutor.js`, and a test checks that the two match.

## Status

| | State |
|---|---|
| Code | In the repository, tested: request building, safety rules and the reply checks (`tests/tutor-modes.test.mjs` and the existing tutor tests) |
| Deployed | **Not verified.** The site isn't connected to Supabase (see `docs/BACKEND-STATUS.md`), so no learner can use it yet |
| On the site | Every AI action says "Gradify AI isn't switched on yet: it arrives with Gradify accounts" until `gradify.config.js` is filled in. After that, it asks learners to sign in |

The floating assistant on getgradify.com and in LifeOS (`kit/lifeos/assistant.js`) is still a scripted preview and is labelled as one. It doesn't use this service yet.

## Modes

| Mode | Where | Grounded in | Daily limit |
|---|---|---|---|
| `explain` | Lesson: **Ask** | The lesson's notes | 40 |
| `socratic` | Lesson: **Talk it through**. Guiding questions, one at a time, without giving the answer away | The lesson's notes | 120 turns |
| `examiner` | Lesson: **Viva**. Five exam-style questions, a verdict on each answer, then an overall verdict | The lesson's notes | 100 turns |
| `challenge` | Lesson: **Challenge me**. Two choice questions and one short question, aimed at the learner's weakest dimension in that lesson (from six-dimension mastery) | The lesson's notes | 15 |
| `connect` | Lesson: **Connections**. Up to five links to other lessons | The lesson's notes, plus up to 400 lesson titles from the course, nearest schools first | 20 |
| `diagnose` | **Why was I wrong?**, after a wrong choice answer in a lesson, the problem bank or Revisit | The question, the options, the answer chosen, the course's explanation and the lesson's notes | 40 |
| `director` | My progress: **Plan my next session** | The learner's mastery summary (six dimensions, calibration, weakest lessons, due cards and questions, daily minutes, exam date) and up to 40 lesson ids it may name | 6 |
| `mark`, `roleplay`, `debrief` | Written practice and client interviews (Law, Nursing) | The task's rubric and model answer, or the case file | 20, 150, 10 |

Each subject's safety rules come first in every prompt:
- **Law:** study material, not legal advice.
- **Nursing and Pharmacy:** education, not clinical advice.
- **Every other subject:** study material.

### Labs

`explain` and `socratic` can carry `lab: { title, state }`: what an interactive lab on the page shows right now. `kit/course/lab-state.js` reads it from the lab's controls, readout, tables and challenges, capped at 2,000 characters. The prompt marks it as data, not instructions, and asks the tutor to explain what the learner sees using those values. The panel says when the tutor can see a lab. On a lab page, the panel offers only Ask and Talk it through, grounded in the first of the lab's lessons that has notes. On a lesson page, the tutor is told about the lab the learner last touched.

## What's checked on the server

`checkReply`, in the function, runs before anything is returned:
- `connect` and `director` can only name lesson ids that the request offered. Other ids are dropped or blanked.
- A director plan is cut to the learner's daily minutes (plus 5) and to five steps.
- A `challenge` choice question must have 3 to 6 options with exactly one correct. Malformed questions are dropped.

The browser escapes everything the model returns (`kit/assess/tutor-view.js`, `kit/course/tutor-panel.js`).

Challenge questions are shown as practice and **not recorded as mastery evidence**, because nobody has checked them. Diagnoses and director plans are labelled as coming from Gradify AI, which can be wrong.

## Not built

- **Research mode.** It needs live sources that the tutor can cite and that Gradify can check. Until then, the tutor points to authoritative sources and doesn't name specifics it can't see.
- **Tutor memory across sessions.** Each request carries what it needs: the notes, the conversation so far, or the mastery summary. Nothing the learner writes is stored. `tutor_usage` keeps only the mode, the site and token counts.

## Switching it on

1. Run `supabase/migrations/20261106130000_tutor_modes.sql` after `20261105130000_tutor_usage.sql`.
2. Deploy the function with `supabase functions deploy course-tutor`, as `docs/SETUP.md` describes.
3. Then check it from the live site, signed in: ask a question on any lesson, and plan a session from My progress.
