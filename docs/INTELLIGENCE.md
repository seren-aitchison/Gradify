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

## Intelligence 2.0: the learning memory and prediction engine

- **Learning event ledger** (`kit/intel/ledger.js`, `learning_events` table, `20261113140000_learning_events.sql`): append-only, owner-only. Events:
  - every answer (result, confidence, response time, source)
  - sessions started, finished and **abandoned**
  - **forgotten** (a learned card answered wrong)
  - **stage reached** (understood, retained, applied) and **misconception fixed**, from before-and-after snapshots
  - packs made, plans accepted, Autopilot changes and undos
  - **recommendations followed**, and mode changes

  Until the migration is applied, events are kept on the device. They move into the account at sign-in. The model reads the ledger alongside the existing tables; no LLM memory is involved.
- **Knowledge debt** (`kit/intel/debt.js`): dependencies come from evidence. A topic that *defines* a term ("What is stroke volume?") underpins topics whose cards *use* it. Course prerequisite graphs add their weak foundations. Weak topics are traced to their deepest insecure root, and the root is ranked above its symptoms, with the shared term as the evidence. It's shown in My Knowledge and in the Knowledge debt widget.
- **Importance, not just urgency** (`kit/intel/priority.js`): every item carries four factors, each with its evidence, shown as "Why this first?":
  - urgency (deadline or due)
  - importance (how many topics it underpins; misconceptions spread)
  - forgetting risk
  - evidence of a gap
- **Learning from its own recommendations** (`kit/intel/calibrate.js`):
  - **What it measures:** completion of planned sessions by length and by time of day, abandon rate from the ledger, and real seconds per card.
  - **What it changes:** the planner caps session length at what the learner actually finishes, plans first in the times that work, and rescales card estimates (0.6–1.8×).
  - **Safeguards:** it changes nothing until there's enough evidence, and says what it learned in Intelligence and the "How you study" widget.
- **One learner across sites:** every concept carries its site, My Knowledge groups by pack and site, and course weak foundations from every Gradify site join the same debt list.
- **Catch-up optimises objectives:** the recovery plan re-ranks from current evidence, so work whose objective is already met (mastered topics) isn't rescheduled.
- **Push notifications:** see `docs/NOTIFICATIONS.md`.
- **The Today board** (`kit/app/widgets.js`): 30 widgets (10 small, 10 wide, 10 big) built on the same model, a calm default of 14, and a customise gallery.

## Autopilot (`kit/intel/autopilot.js`, `kit/app/autopilot-views.js`)

Three modes, switchable any time from Today or Intelligence:

| Mode | What Gradify does on its own |
| --- | --- |
| **Copilot** | Nothing. It recommends and explains; every change is a tap. |
| **Adaptive** | Moves missed Gradify sessions into free time, fills **focus blocks** (reserved time whose task is chosen when it starts), re-plans its own blocks. |
| **Autopilot** | Adaptive, plus it keeps the next seven days planned and applies a **recovery plan** when the learner falls behind. |

The engine proposes actions and `applyChange` validates them before anything is written. It touches Gradify's own blocks only, keeps each day within the daily time, and plans only inside free hours. Every change goes in the activity log (`learner.intel.log`) with an undo, and an undone change isn't made again for 24 hours.

- **Executive briefing** on Today: what changed (with undo), the highest priority, deadlines, exam status, concepts to revisit, and the revision due over the next three days.
- **Catch-up machine**: three or more missed sessions, or three idle days with work due, gives a recovery (essential tasks, what can wait, cards due, deadlines) and a fresh seven days that doesn't cram. Missed sessions aren't repeated blindly; priorities are worked out again from the evidence.
- **Opportunity detector**: free time before the next calendar event with tasks that fit, packs ready to move on from, application lagging recall, an exam soon with no long mixed session, and plenty of free time when behind.
- **Task decomposition** (Revision Centre): "Revise cardiovascular physiology" becomes warm-up, gaps, priority cards, new material, application and a mastery check. Each step has a "done when" based on evidence, not time spent.
- **Tell Gradify** (`kit/intel/nlp.js`): plain English such as "Biology exam on 10 December, chemistry assignment due on the 4th, away this weekend" becomes exams, deadlines, away days, shifts and daily hours. **Paste an email** finds new and moved dates and matches them to existing deadlines (the academic inbox). Everything is previewed for the learner to confirm.
- **What-if** in Ask: "What happens if I take Friday off?"

## Calendar sync (`kit/intel/ical.js`, `kit/intel/calsync.js`, `supabase/functions/calendar-sync`)

- **In:** calendar links (Google's secret iCal address, iCloud public calendars, Outlook published calendars, university timetables, Moodle, Canvas, Blackboard) and .ics files. Repeats, exclusions, all-day events, cancelled and "free" events are handled.
- **How imported events are treated:** they become busy time that's never moved. All-day events block the day only when they say "away", "holiday" and so on. Titles with "exam" or "due" become deadlines.
- **Refreshing:** links re-sync in the background every six hours, and a re-sync replaces only imported events.
- **Out:** "Export my Gradify plan" downloads an .ics that any calendar app opens.
- **Time zones:** times with a time zone are read in the learner's local time (fine for their own calendars).

## Gradify AI coach (`kit/intel/coach.js`, mode `coach` in `kit/assess/tutor.js`)

Ask Gradify answers from the model straight away. When the learner is signed in, Gradify AI (Claude) then adds an answer from a structured summary of the same model. It may recommend only actions the priority engine offered, by id; `checkReply` drops anything else. It can't change the plan, scores or calendar. It counts as a tutor conversation.

## Deploying the server parts

1. Run `supabase/migrations/20261113130000_coach_mode.sql`, which allows the `coach` mode in the usage ledger and maps it to the tutor allowance.
2. Deploy the functions:

   ```bash
   supabase functions deploy course-tutor
   ```

   ```bash
   supabase functions deploy calendar-sync
   ```

Until then, everything else works. Ask Gradify answers from the learner's data, and calendar files import. Calendar links that don't allow browsers show a "sign in" or "couldn't sync" message.

## Also

- **Completion:** `kit/core/complete.js` and `kit/core/haptics.js` show an Apple Pay-style "Done" (ring, tick, double-tap haptic) on every completion. iPhone haptics use the iOS 18 switch-control haptic; Android uses the Vibration API.
- **Home Screen prompt:** `kit/core/install.js` offers "Put Gradify on your Home Screen" with steps for iPhone, iPad, Mac (Add to Dock) and Chrome or Edge (install). It shows after a finished session or pack, or on a return visit, and stays away for three weeks once dismissed. The manifest has app-icon shortcuts. Home Screen **widgets** need the native app (WidgetKit); the web app can't add them.

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

1. **Lesson events from course pages** into the ledger (time in lesson, revisits, skipped sections).
2. **FSRS** in place of SM-2 in `kit/learning/srs.js`. Same card fields plus `stability` and `difficulty`; `recallProbability` becomes FSRS retrievability.
3. **Deeper course graph use.** `kit/learning/concepts.js` already has prerequisites and `weakPrerequisites`. Rank "revisit the smallest useful prerequisite" for course lessons, and link note topics to course concepts with `topic-match.js`.
4. **Misconception and connection cards** written by Gradify AI for the learner's confident mistakes, using the `study-pack` function's `questions` mode, with a follow-up question to verify.
5. **Prediction service** (Python) once there's enough data: calibrated readiness by topic, learned break lengths and best times of day.
6. **Academic inbox connections**: read-only OAuth to Outlook or Gmail and Canvas or Moodle, feeding the same `parseInbox`.
7. **Adaptive pedagogy**: test which teaching mode (visual, worked example, Socratic) improves retention for each learner.

Tests: `tests/intel.test.mjs`, `tests/nlp.test.mjs`, `tests/ical.test.mjs`, `tests/debt.test.mjs`, `tests/calibrate.test.mjs`, `tests/nudges.test.mjs`, `tests/ledger.test.mjs`, `tests/tutor-modes.test.mjs` (coach) (memory, predictions, priority, scheduler, rescheduling, events, Ask).
