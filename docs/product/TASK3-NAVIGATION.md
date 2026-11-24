# Task 3: the app's 15 destinations as five sections

Product Excellence Sprint, 23 November 2026. Fixes problem 4 of the Week 1 ecosystem audit: 15 destinations with
overlapping names, 9 of them behind "More", including Progress and the Revision Centre.

## The problem, precisely

- **Desktop:** the sidebar was a flat list. It showed six items (Today, Smart Plan, Study, Notes, Learn, Settings), and
  the other nine sat behind "More" until each had been opened once.
- **Phone:** the tab bar had Today, Plan, Study, Notes and More.
- **Tablet and small-laptop widths (861 to 1099px):** the app had **no navigation at all**, neither sidebar nor tab bar,
  only the top bar.

## What changed (2 files)

`kit/app/main.js` now has one list of five sections, each holding the screens that belong together:

| Section | Screens |
|---|---|
| **Today**: what to do now and when | Today, Smart Plan, Path |
| **Learn**: what you study from | Courses, My Knowledge, Earth |
| **Study**: what you practise with | Flashcards, Revision Centre, Tools, Gradify AI |
| **Library**: what you keep | Notes, Your library, Add notes, Community |
| **Progress**: how it's going | Progress, Intelligence |

Settings sits on its own at the end of the sidebar, and behind the account button in the top bar on every screen.

- **Desktop (1100px and wider):** the sidebar shows the five sections as labelled groups, with every screen listed
  under its section. Every screen is one click away and nothing is behind "More". If the sidebar is taller than the
  window, it scrolls on its own.
- **Tablet and phone (below 1100px):** the tab bar shows the five sections, each opening its first screen. Above the
  page, a row of pills shows the open section's screens, so any sibling is one more tap. This also gives the
  861–1099px range its navigation back.
- **Unchanged:** every screen keeps its URL and route, deep links work and mark the right section, saved data is
  untouched, and the Pro lock on Intelligence still shows.

`kit/app/app.css` adds the section groups, the screen row, the tab bar below 1100px and the sidebar scroll. The unused
"More" styles are removed.

## Clicks to reach each screen, before and after

| | Before | After |
|---|---|---|
| Desktop | 6 screens 1 click; 9 screens 2 (More, then the screen) for anyone who hadn't opened them before | **All 17 destinations: 1 click** |
| Phone | Today, Plan, Study, Notes 1 tap; the rest 2 (More, then the screen) | Today, Courses, Flashcards, Notes, Progress 1 tap; every other screen 2 (section, then screen) |
| Tablet (861–1099px) | No navigation | Same as phone |
| Settings | 1 (account button) | 1 (account button) |

One common task got slower: on a phone, **Smart Plan** goes from 1 tap to 2, because the bar now holds sections rather
than individual screens. Notes stays at 1 tap because it opens first in Library.

## Checks

- `scripts/product/app-nav.cjs`: 75 / 75. It reaches every screen from Today the way a student would, on desktop
  (1280px), tablet (1000px) and phone (390px), and checks:
  - the screen opens with content;
  - its link and section are marked as current;
  - there's no "More" anywhere;
  - Settings is 1 click away;
  - deep links (`#/tools/audio`, `#/tools/convert`, `#/community/groups`, `#/topic/…`, `#/plan`, `#/account`) open and
    mark the right section;
  - there are no page errors.
- **Accessibility** (the repo's contrast method, light and dark, desktop and phone): no navigation text fails. Every
  navigation link shows a visible focus ring from the keyboard: 17 stops on desktop (was 7) and 8 on a phone. The only
  contrast failures on the page are the existing "Pro" badge in light mode (3.93:1), which is also on `main`.
- `scripts/product/first-visit.cjs` (Task 2): still 38 / 38.
- `npm test`: 1,144 / 1,144. `build-site --check` and `theme-tokens --check` pass.
