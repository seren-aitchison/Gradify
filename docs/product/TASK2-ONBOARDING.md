# Task 2: set-up never interrupts a student

Product Excellence Sprint, 23 November 2026. Fixes problem 3 of the Week 1 ecosystem audit: the first-run goal question
("What do you want to achieve?") was put in front of whatever a new student opened in the app, and after "Skip for now"
they landed on Today rather than where they were going.

## The problem, precisely

In `kit/app/main.js`, `route()` sent anyone without a goal to `#/start` unless the screen they asked for was set-up,
Account, Add notes, a study pack, Study or the library. So a first-time student who opened Notes, Progress, Tools, Smart
Plan, Learn or any other screen saw the set-up question instead. That included 7 topic cards from Task 1 (Progress on
four sites; Tools, Audio and Convert on EduGradify).

## What changed (1 file)

`kit/app/main.js`:
- **The redirect to `#/start` is removed.** Every screen opens directly. Opening the bare app still lands someone new on
  Add notes, a starting page rather than an interruption.
- **Set-up is offered, not imposed.** Today shows the "Want Gradify to plan your revision?" card, with a Plan my
  revision button, to anyone who hasn't set a goal. The same card already appeared under a new study pack, and the two
  now share one helper. Set-up is still reachable from Account ("Run set-up") and at `#/start`.

Nothing else changes: set-up itself, what Skip and Done do, saved profiles, and learners who've already answered.

## Checks

`scripts/product/first-visit.cjs` uses a brand-new browser for every check, so each is a true first visit. 38 of 38 pass:
- **Every app screen opens directly**, with content and no page errors. That's 20 screens (Today, Smart Plan, Study,
  Notes, Learn, Add notes, Library, Revision Centre, My Knowledge, Progress, Path, Intelligence, Gradify AI, Earth, Tools,
  Convert, Audio, Flashcard maker, Community and Account) on desktop, 6 of them on a phone as well.
- **Every topic card that leads into the app** lands on its screen for a first-time visitor: the 7 that used to be
  interrupted, and the 2 Add notes cards that never were.
- **Creating a folder, first visit: 3 clicks** (Open Gradify → Notes → New folder), down from 5. The UX spec's 2-click
  target needs the Library work (Tasks 4 and 7).
- **Today offers set-up as a card**, and `#/start` still opens when asked for.

Before and after, the same first visits on `main`: `#/progress`, `#/tools` and `#/notes` all became `#/start` and showed
the set-up question. With this change, each opens its own screen.

- `npm test`: 1,132 / 1,132. `build-site --check` passes.
