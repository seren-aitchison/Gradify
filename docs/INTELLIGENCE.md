# Gradify Intelligence

**Gradify should never just ask "what do you want to study?" It should answer "given everything I know about your learning, what is the most valuable thing for you to do next, and why?"**

Gradify Intelligence is one evolving model of each learner. It's built from everything they do on every Gradify site, and every screen in LifeOS reads it. The rules are deterministic, the evidence is visible, and the learner stays in control. Claude is used to interpret notes and write material, never to decide what someone knows.

## What's built (phase 1, and most of phases 2–4)

| Engine | File | What it does |
| --- | --- | --- |
| Learner event engine | `kit/intel/memory.js` · `eventStream` | One timeline of everything: each flashcard answer (result, confidence, response time, source), packs made, sessions, plan blocks done and **missed**, quizzes, lessons. Derived from the tables Gradify already keeps, so past answers count from day one. |
| Learner memory | `kit/intel/memory.js` · `learnerMemory` | Per concept: mastery, **certainty** (separate from mastery), retention, last tested, error history (confident mistakes, repeated mistakes, slow answers), evidence trail, next review, and the stage reached: seen → understood → retained → applied. |
| Mastery engine | `kit/learning/mastery.js` (existing) | Recall, explanation, application, confidence and retention evidence per topic. Misconception = wrong while sure, cleared only by a good answer at least 12 h later. |
| Spaced repetition | `kit/learning/srs.js` (existing) | SM-2 style intervals; `recallProbability` drives the forgetting forecast. |
| Prediction engine | `kit/intel/memory.js` · `predictions` | Readiness **with an uncertainty range** and an "enough evidence?" flag, forgetting forecast (days until a concept drops below 70% recall), learning velocity (right-rate this week vs last), plan adherence (14 days), study requirement (minutes a day to reach 80% by the exam). |
| Priority engine | `kit/intel/priority.js` | Ranks misconceptions, repeated mistakes, fading concepts, due cards, deadlines, course steps from every site, new material and stretch questions. Each item has a reason and its evidence. **Urgent ≠ important**: deadlines only outrank foundations when close. **Anti filter bubble**: the top four always include new material when there is some. Also lists what the learner can stop revising. |
| Scheduling engine | `kit/intel/schedule.js` | `planDay` fits priorities into the learner's availability (weekday and weekend windows), daily time and energy preference, around existing blocks, with protected breaks and a wrap-up. `reschedule` moves **only Gradify's own blocks** (`auto: true`) that were missed, into free time within 125% of the daily budget (no cramming), and explains each move. Autonomy: *suggest* (default) or *auto*. |
| Ask Gradify | `kit/intel/ask.js` | Answers "What should I study today?", "What am I likely to forget?", "Why am I struggling?", "Am I on track?", "I've got 2 hours free", "What can I stop revising?" and "How am I doing this week?" from the model, quoting the evidence, and says so when the evidence is thin. |
| Browser model | `kit/intel/model.js` | Loads the learner's store once (this device, or their account, which is shared by every site) and builds everything above. |

### Where it shows up (`kit/app/intel-views.js`)

- **Today**: missed-session banner, "What Gradify thinks you should do next" (reason and "Recommended because…"), the learning-intelligence strip (readiness range, gaps, due, plan kept, velocity), upcoming learning, forgetting forecast, the concept pile and Ask Gradify.
- **Intelligence**: the full picture. Readiness and how it's worked out, how Gradify decides, every concept with its evidence trail, recent events, and controls (autonomy, energy, free hours, break length).
- **Smart Plan**: today's or tomorrow's generated plan, "Add this plan to my calendar", "Plan my week" (each day's due reviews plus the ranked queue, spread so nothing is planned twice), and missed-session moves.
- **Revision Centre**: every item, best first, filterable (Fix, Review, New, Stretch), plus "You can ease off these".
- **My Knowledge**: a stage funnel (not started → applied) and every concept with its ladder, mastery, certainty and when it fades.
- **Gradify AI**: Ask Gradify, plus the AI features and allowance.

Haptics (`kit/core/haptics.js`) fire on card ratings, shuffles, plan accepts and navigation. They're silent on devices without vibration, with reduced motion on, or when turned off in Settings.

## Event schema

```json
{ "event": "flashcard_answered", "at": "2026-11-13T09:14:00Z", "concept": "<document_id>|<topic>",
  "card": "What happens to cardiac output…", "result": "incorrect", "rating": "again",
  "confidence": 1, "response_ms": 14000, "source": "study_pack" }
```

Other events: `study_pack_made`, `study_session`, `plan_block_done`, `plan_block_missed`, `quiz_finished`, `lesson_completed`, `exam_finished`, `tutor_used`.

## Principles

1. **No hallucinated knowledge.** Mastery only changes when the learner shows it. A generated card is not evidence. AI can suggest a misconception, but only the learner's own answers confirm it.
2. **No filter bubble.** New material and stretch questions are always in the mix.
3. **Not controlling.** Every recommendation says why. Plans are suggestions until accepted. External or self-made blocks are never moved. Hours outside the learner's free time are protected.
4. **Private by default.** The model is computed in the browser from the learner's own data. Export and delete are in Settings.

## Next (backlog, in order)

1. **`learning_events` table** in Supabase (append-only, owner-only row-level security), written alongside the existing tables. This lets the iOS app and the analytics service read one stream, and records lesson time and skipped topics, which aren't stored today.
2. **FSRS** in place of SM-2 in `kit/learning/srs.js`. Same card fields plus `stability` and `difficulty`; `recallProbability` becomes FSRS retrievability.
3. **Course concept graph in the priority engine.** `kit/learning/concepts.js` already has prerequisites and `weakPrerequisites`. Rank "revisit the smallest useful prerequisite" for course lessons, and link note topics to course concepts with `topic-match.js`.
4. **Misconception and connection cards** written by Gradify AI for the learner's confident mistakes, using the `study-pack` function's `questions` mode, with a follow-up question to verify.
5. **Calendar sync**: ICS import of classes and work (read-only, never moved), and export of Gradify's plan.
6. **Learner-aware Gradify AI**: pass the Ask model's evidence summary into `course-tutor`'s director mode, so its answers cite the same evidence.
7. **Notifications**: a daily plan digest and "about to forget" nudges, at the learner's chosen time.
8. **Prediction service** (Python) once there's enough data: calibrated readiness by topic, learned break lengths and best times of day.

Tests: `tests/intel.test.mjs` (memory, predictions, priority, scheduler, rescheduling, events, Ask).
