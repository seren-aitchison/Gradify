# Gamification: the Gradify game engine and the Journey page

Written 7 November 2026. The engine is `kit/game/`, the page is `journey.html` (getgradify.com/journey.html), the styles are `kit/styles/game.css`, and the tests are `tests/game.test.mjs`.

## What existed

Before this, each course had its own game inside `kit/course/course.js`:
- an XP table;
- a level curve (level n needs 50·n·(n+1) XP);
- 8 badges;
- a weekly challenge;
- a day streak and a daily goal;
- a simulated league with invented rivals.

Each course kept its own log of awards (`S.log` in `gradify.course.<slug>`). Each award is paid once:
- a question only on a first-try solve;
- a lesson once;
- a quiz once per pass.

Nothing tied the courses together.

## What this adds, without a second XP system

The engine **reads the courses' own logs** as the only record of learning XP. It does not count anything twice, and it keeps no competing ledger.

Its own rewards (quests, achievements, the daily challenge) go in one separate ledger, `gradify.game`. Each reward is keyed by what it is for, and a key can be paid only once:
- `quest:2026-11-07:lessons`;
- `ach:scholar`;
- `challenge:2026-11-07`.

So reloading a page, repeating a request or opening a second tab can't pay the same reward twice. The tests check this, including after the ledger is saved and reloaded.

| Feature | Where | How it works |
|---|---|---|
| XP and levels | `engine.js` | Total XP = every course's log plus paid game rewards. It uses the course engine's own level curve; a test checks they are identical. Shows level, XP, today's gain and XP to the next level. |
| Ranks | `engine.js` `RANKS`, `RANK_TITLES` | Eight named ranks by level: Novice to Luminary. A subject can rename them without changing the thresholds. History's run Chronicler, Archivist and so on to Laureate of History; maths and law have their own titles. |
| Streaks with rest days | `engine.js` `habits` | A day counts when the learner earns learning XP; game rewards don't count. Every seven days of learning bank a rest day, up to three, which automatically covers a missed day. A longer break ends the streak quietly and keeps the best streak as a record. An empty today never breaks a streak. |
| Goals | `engine.js` | Flexible daily goal (20 to 120 XP), and a weekly goal of five days at the daily goal, so two days off are normal. |
| Learning calendar and records | `engine.js`, `journey.js` | A twelve-week heatmap with rest days marked. Records: best streak, best day, best week and consistent weeks (three or more study days). |
| Daily and weekly quests | `quests.js` | Built from the learner's courses and evidence. A quest is only offered if it can be done: no "complete two lessons" when all are done, and no weak-topic quest without a measured weakness. Weaknesses come from `kit/learning/targets.js` (Target my weaknesses), imported, not copied. After three or more days away, the quests are gentler. |
| Personalisation | `quests.js` `nextSteps` | One or two clear next steps, from evidence: a gentle route back after time away, a weak foundation first, the quiz after a finished module, a stretch when recent answers are 85% or more right, otherwise the next lesson in the most recently studied subject. |
| Achievements | `achievements.js` | A registry (`registerAchievement`) of 17 achievements in four groups, including First Steps, Curious Mind, Scholar, Consistency, Perfectionist, Comeback, Deep Focus, Explorer and Mastery. Each has a name, description, condition, XP, icon, tier and progress shown on locked ones. Mastery uses the shared mastery engine. Comeback needs early answers mostly wrong, then later ones mostly right. |
| Daily challenge | `challenges.js` | A registry (`registerChallenge`) of kinds:<br>• **Weakness recovery** comes first when there's a measured weakness. It uses `practiceSet` from `targets.js`.<br>• **Speed round:** five questions in 90 seconds, from completed lessons.<br>• **Mixed revision.**<br>• **History chronology:** four dated events to put in order, built from established, single-year evidence lines in the history notes.<br>The challenge is stable for the day and pays up to 50 XP once a day. Questions render and mark with the shared question engine. |
| Journey page | `journey.js`, `journey.html` | Level ring, XP, +today, XP to next level and rank; streak and banked rest days; daily goal ring and goals met this week; achievements; active and claimable quests; next steps; today's and this week's quests; the daily challenge; subjects with rank, level and lesson progress; next achievement; calendar; personal records; recent rewards; the full collection. |
| Reward moments | `journey.js`, `game.css` | XP toasts in one polite live region (at most three), achievement unlock animation and a level-up dialog. They are short, dismissible with Escape, and still under `prefers-reduced-motion`. |

**Anti-farming:**
- Learning XP is only what the course engine already pays, once per question, lesson or pass.
- Quests read real activity: attempts, lessons and labs.
- Achievements are computed from evidence each time.
- Game rewards don't feed streaks or goals, so they can't inflate the habit numbers.

**Tested:**
- `tests/game.test.mjs` (9 tests): level curve parity with the course engine; ranks; XP across courses; streak rest days and breaks; goals, calendar and records; pay-once, including after a reload; quest adaptation and completion; achievement conditions, progress, the registry and comeback; the history chronology challenge, stable per day and marked by the shared engine.
- **Browser:** an invented two-subject learner across ten days. Rendering, claiming and reload with no duplicate XP, achievement unlocks, the challenge, phone width, named controls, and focus visible on the first 20 tab stops.

## Social: what was decided

The course "league" is simulated: its rivals are invented, and the page says so. There is no friends graph in the backend, and many learners are under 18. I built **personal bests** (best day, best week, best streak) and no public or friends leaderboard.

A safe friends leaderboard needs:
- an opt-in setting, off by default and unavailable to under-18 accounts unless a parent or school enables it;
- a `friendships` table with mutual consent and row-level security;
- a weekly XP view that exposes only display name and weekly XP to accepted friends.

That's a backend change for the owner to approve. It isn't in this release.

## Integration to coordinate (prepared, not applied)

`kit/course/course.js` belongs to the session implementing Target my weaknesses, so it isn't edited here. When that work lands, these small changes connect the course pages to the engine:

1. **One level curve:** in `course.js`, replace the local `levelOf` with `import { levelOf } from "../game/engine.js"`. The formula is identical (tested), so nothing changes for learners.
2. **A link to the Journey:** in `paintSide()`, add a card under the daily goal:
   ```js
   `<a class="co-card" href="/journey.html"><span class="co-kicker">${ic("trophy")} Your journey</span><h3>Quests, achievements and every subject</h3></a>`
   ```
3. **Rest days in the course streak:** replace `streak()` with `habits(S.log.map((e) => ({ ...e })), { goal: S.goal })` from `kit/game/engine.js`, so a course page and the Journey always show the same streak.
4. **Account sync:** when signed in, log paid game rewards with `store.logActivity({ site: "Gradify", kind: "game-<reward key>", xp, detail: title })`, so they reach LifeOS like course XP. The ledger key keeps it idempotent.

Until then, the Journey page is complete on its own. It reads course progress from the same device.
