# The Gradify UX system

One set of interface components for every Gradify page: each course (`kit/course/course.js`), each subject site's
homepage (`kit/core/subsite-home.js`), the Gradify homepage (`index.html`), the study app (`kit/app/main.js`) and the
Journey page. They live in `kit/ui/` with their styles in `kit/styles/ui.css`, and they're tested once
(`tests/ui.test.mjs`) instead of being rewritten slightly differently for each site.

The aim: a learner never has to ask "Where do I find that?", "Where was I?" or "What should I do next?".

## Foundations: the Gradify Design System

**Apple-first.** Generous whitespace, large confident type, one accent colour, calm motion and very clear navigation
are the base for every page. The other influences are used selectively, where they earn their place:

| Where | Approach |
| --- | --- |
| Marketing homepage, subject landing pages | Apple editorial: centred headlines, white and soft-grey bands, big product shots, one cinematic moment per page |
| LifeOS dashboard, the study app | Apple + Linear: dense but calm; cards, sidebars, hairline borders, keyboard-first |
| Progress and analytics | Stripe-style charts: clear axes, one highlight colour, animated only on first view |
| Flashcards, quizzes, habits | Duolingo-style feedback: instant, rewarding, never noisy |
| 3D anatomy, 3D Earth, the course shelf | Three.js and 3D CSS, used for memorable moments only |
| Course content | Minimal and highly readable |

**Tokens.** `kit/design/tokens.json` is the source: fonts (the system San Francisco on Apple devices, Geist elsewhere),
a seven-step type scale (hero, title, heading, lead, body, eyebrow, caption), spacing (4 → 128px and a fluid section
gap), radii, content widths, colour for both themes, and motion (Apple's ease, 180 / 320 / 700ms). `kit/styles/system.css`
is the same values as CSS custom properties (`--ds-*`), and `tests/design-tokens.test.mjs` fails if the two drift. The
accent is Gradify indigo (#4641ff light, #5b55ff dark), checked for WCAG AA with white text. The brand spectrum is
used on one phrase per page at most.

**Components** (`kit/styles/system.css`, opt in with `<body class="ds">`): `.ds-section` (`.alt` for the grey band),
`.ds-eyebrow`, `.ds-hero`, `.ds-title`, `.ds-heading`, `.ds-lead`, `.ds-spectrum`, `.ds-actions`, `.ds-btn`
(`.secondary`), `.ds-more` ("Learn more ›"), `.ds-tiles` / `.ds-tile`, `.ds-shot` (`.ds-zoom` opens up as it
scrolls), `.ds-stats`, and `.ds-reveal` (a calm fade-up, `kit/ui/reveal.js`). Everything still for reduced motion.

**Interface components** (same file, plain class names that work on any page, with or without `body.ds`):
`.ds-header` (translucent sticky bar; on phones the links get their own scrolling row), `.ds-footer`, `.ds-card` /
`.ds-cards` (a `.ds-card-link` makes the whole card clickable, with the focus ring on the card), `.ds-badge`
(`.accent`, `.success`, `.warning`, `.danger`), `.ds-field` / `.ds-input` / `.ds-hint` / `.ds-error` / `.ds-search`,
`.ds-stat` / `.ds-stat-row`, `.ds-notice` (`.info`, `.success`, `.warning`, `.danger`) and `.ds-empty`. Every colour
comes from a token (status colours are AA on their own backgrounds in both themes) and nothing uses `!important`;
`tests/design-tokens.test.mjs` checks both. Homepage-only overrides in `assets/styles.css` are not part of the system
and are never copied into subject sites. The review page is `labs/design-system/` (never published).

**Appearance.** Every page follows the device's light or dark setting by default (`kit/core/theme-boot.js`). The
sun/moon button picks light or dark for this device, and **Reading and accessibility → Appearance** offers
"Match my device", Light and Dark, so following the device can always be chosen again. "Reset everything" returns to
matching the device.

**Rollout.** The Gradify homepage is on the system now. Subject sites move only after the shared components are
reviewed and approved. Next: subject site homepages (`kit/core/subsite-home.js`),
pricing, Explore and Journey, then the study app and courses, one surface at a time. The same tokens become the
Tailwind theme if Gradify moves to Next.js (`docs/NEXTJS-MIGRATION.md`).

## The rules

1. **No unnecessary reloads.** Courses are single pages (hash routes); moving around keeps the outline, the header
   and the scroll position of the place you came from.
2. **Every important action gets feedback.** A toast for what just happened; the save indicator for where your work is.
3. **Reversible beats confirmed.** Bookmarking, pinning, unpinning and similar changes happen at once and offer
   **Undo** (button, or ⌘Z / Ctrl+Z while the toast shows). No "Are you sure?" for anything Undo can reverse.
4. **Every state is designed.** Loading shows a skeleton of what's coming; empty says why and offers the next step;
   offline, sign-in expired and sync failures are said plainly, with the reassurance that work is saved on the device.
5. **Every input method works.** Keyboard (shortcuts, visible focus, arrow keys in tabs and menus, Escape closes),
   touch (44px targets on coarse pointers) and screen readers (labels, live regions, `aria-current`, inert backgrounds
   behind dialogs).
6. **Saved reliably, not held in memory.** Progress and reading positions sync with the account
   (`kit/course/progress.js`); interface preferences and pins are kept on the device (see *Storage*).
7. **Motion is subtle and optional.** Short fades and slides only; all of it stops for reduced motion (the learner's
   own setting, `html[data-motion="reduce"]`, or the system's).
8. **Accordions don't nest past two levels.** Unit → module is fine; deeper is a maze. The one containing the
   learner's current position opens by default.
9. **One icon, one meaning** (`kit/ui/icons.js`): bookmark = save for later, pin = keep at the top of your Gradify
   home, undo = reverse the last change, link = copy a link, split = notes beside questions.

## Components

| Component (as named in the brief) | Module | What it is |
| --- | --- | --- |
| GradifyIcons | `kit/ui/icons.js` | The one icon set (`uiIcon(name)`); courses use it too |
| GradifyToast | `kit/ui/feedback.js` | `toast(message, { undo, action, tone, key })`: polite, at most three, longer while hovered or focused; `recentNotices()` is this tab's inbox |
| GradifyProgress (save state) | `kit/ui/feedback.js` | `mountSaveState(el).set("saving" \| "saved" \| "local" \| "offline" \| "signed-out" \| "error")` |
| GradifyModal, GradifyDrawer | `kit/ui/overlay.js` | `openModal({ title, body, actions })`, `openDrawer({ side, title, body })`: focus trapped and restored, Escape and backdrop close, background inert |
| GradifyTabs, segmented controls, GradifyAccordion | `kit/ui/disclosure.js` | `tabsHtml` + `wireTabs` (arrow keys, Home/End, remembered); `segmentedHtml` + `wireSegmented`; `wireAccordion` (open sections remembered, expand/collapse all) |
| GradifyEmptyState, skeletons | `kit/ui/states.js` | `emptyState({ icon, title, body, actions })`; `skeleton("lesson" \| "list" \| "cards" \| "text")` |
| Keyboard shortcuts | `kit/ui/keys.js` | `shortcuts([{ keys, label, group, run, when }])`: one registry, so **?** lists every shortcut on the page |
| GradifyCommandPalette | `kit/ui/palette.js` | `createCommandPalette({ search, searchMore, suggestions, kinds, groups })`: **/** or **⌘K** anywhere |
| GradifyResourceSwitcher, intelligent course card | `kit/ui/resources.js` | `resourceSwitcher({ kicker, items })` ("What would you like to do next?"); `courseCard({ … next })` |
| Back to where I was | `kit/ui/wayfinding.js` | `offerBack(place)`: a chip back to the lesson you came from, at the same scroll position |
| Places: trail, recent, pins | `kit/ui/places.js` | The tab's trail of places with scroll positions (Back restores them), recently visited, and pins (Undo, drag to reorder, Alt+↑/↓) |
| Remembered preferences | `kit/ui/prefs.js` | `pref(scope, key)` / `setPref(scope, key, value)`: views, filters, tabs, open sections, outline and split screen |
| Motion and long pages | `kit/ui/motion.js` | `transition()`, `jumpTo()`, `mountToTop()`, `copyLink()` |
| GradifyContinueLearning, Gradify-wide search | `kit/ui/global-nav.js` | `mountGlobalNav()` (the palette over every course and lesson) and `mountYourLearning()` (pins + course cards) for the homepage and subject sites |
| GradifyShelf (your courses as 3D spines) | `kit/ui/shelf.js` | `shelfHtml(courses, { colourOf })` and `wireShelf(el)`: each course a spine in its subject's colour that tilts with scroll and opens its next step; used by `mountYourLearning({ layout: "shelf" })` on the Gradify homepage for returning learners |
| Explore | `kit/ui/explore.js` | `mountExplore(el)` on `explore.html`: every course as site → course → chapter → topic → lesson, with topic preview cards (progress from evidence, estimated time, builds on / leads to), stage filters, remembered chapters and search |
| Mastery map | `kit/ui/mastery-map-view.js` | `renderMasteryMap(el, map, { hrefOf, unitWord })`: a course's chapters from foundations (left) to advanced (right), lines for what builds on what, each chapter coloured by its mastery level; *Within reach* and *Holding you back* above it. Data: `kit/learning/mastery-map.js` |
| Feedback moments | `kit/ui/feel.js` | `feel("correct" \| "wrong" \| "complete" \| "levelup" \| "achievement" \| "select")`: a haptic and an optional short sound, set in the Aa panel (Sounds off by default, Haptics on) |
| Liquid Glass (GPU) | `kit/ui/liquid-gl.js` | `start()`, loaded on every page by `kit/core/theme-boot.js`: one WebGL canvas behind the page draws its light and every glass surface on screen (headers, footers, panels, plans, course cards) with refraction, dispersion, Fresnel, a specular that follows the pointer and contact shadows; floating bars carry a copy of their patch. Three tiers: `webgl` (full), `webgl-lite` (no colour split, 12 surfaces, fewer pixels: phones with little memory, no highp, few uniforms, or a full tier measured under 30fps) and `css` (no WebGL, software rendering reported by the browser through `failIfMajorPerformanceCaveat` or named by the renderer, reduced transparency, high contrast, data saver, a lost context, or lite measured slow too). Shaders compile in the background (`KHR_parallel_shader_compile`); speed is the median frame interval after warm-up, never `gl.finish()`. Lost contexts fall back to CSS and come back on restore; reduced motion keeps the light still. What happened: `<html data-glass>` and `window.gradifyGlass` in the console. `localStorage["gradify.glass"]`: `off`, `lite`, or `force` (skips the checks, for testing). `GLASS=slow-gpu node scripts/check-sync.cjs` runs the lesson journey through the step-down. Research: `labs/liquid-glass/` |
| Storage helpers | `kit/ui/store.js` | Safe reads and writes (private windows, blocked storage), `esc`, and the stylesheet loader |
| Everything at once | `kit/ui/index.js` | Re-exports the above |

Pages need no extra `<link>`: the first component used loads `kit/styles/ui.css` itself. Colours are theme tokens from
`kit/styles/base.css`, so light and dark both work (`tests/theme.test.mjs` checks it). Class prefix: `gx-`.

## Where each part of the brief is

**Navigation**
- Accordion outline that remembers what's open and opens the current lesson's unit: the course outline
  (`kit/course/navigator.js`) and the Syllabus, which now has *Expand all / Collapse all*.
- Breadcrumbs, every level clickable: Gradify › site › course in the course header; course › unit › module › lesson in
  a lesson's sticky bar, which also shows the section you're reading.
- Persistent outline: beside every lesson on wide screens, a drawer on smaller ones, and on wide screens it can be put
  away (×, or **O**) to give the lesson room (remembered).
- Previous / Up / Next at the end of each lesson. Next is the *logical* next activity: the last lesson of a unit leads
  to its quiz until it's passed.
- Command palette: **/** or **⌘K** in a course (its lessons, topics and the text of its notes) and on the homepage and
  subject sites (every course, unit, module and lesson, every site, pins, recent places and quick actions). The
  Gradify-wide index is `kit/data/search-index.json`, built by `node scripts/build-search-index.mjs` (a test fails if
  it's out of date) and fetched the first time someone searches.

**Smart buttons**
- *Continue learning* goes to the exact place: the lesson, at the section you were reading (`#/lesson/<id>/<section>/resume`),
  with a toast that offers "Start from the top". Reading positions sync with the account, so another device picks up there.
- *What would you like to do next?* at the end of every lesson: revision notes, flashcards, exam-style questions, a
  target test, *Ask AI to explain* (the tutor, focused), the unit quiz and the next lesson, with the most useful one
  highlighted (**N** opens it).
- *Back to where I was*: going from a lesson to an activity (quiz, target test, flashcards…) offers the way back; the
  browser's Back returns to the same scroll position; **G B** from the keyboard.
- *Go to weak topics*, *Resume revision*, *One-click revision*: the Revise hub and Home (previous release), plus the
  *Next up* view below.
- *Back to course*: course cards and pins on the homepage go to the course, not the homepage.

**Effortless pages**
- Skeletons while a lesson's notes, the question bank, cards or a case load (only after 120ms, so cached pages never flash).
- Undo for bookmarks, pins and unpins.
- Save indicator: in the course header ("Saved", "Saved on this device", "Offline · saved here", "Sign in to sync",
  "Will retry") and, as a quiet tick, in a lesson's bar.
- Toasts are the shared ones everywhere: courses, the study app and the Journey.
- Empty states with a next step (flashcard review, syllabus filters, Next up).
- Preferences remembered: syllabus view and filter, open units, outline hidden, split screen and its tab, focus mode.

**Learning progress**
- *Next up*: the syllabus simplified to what this learner should do now (continue, needs revision with a target test on
  those lessons, units ready for their quiz, cards due, the next few lessons). *Outline* is the full syllabus; *Road* the map.
- Course cards on the homepage and subject sites: status, % complete, lessons done, and the recommended next step from
  the course's own evidence (`shareProgress` in `kit/course/course.js`).
- Revision notes (**R**): what you can now do, the key ideas, key terms and the lesson's sections, made from the
  lesson's own notes.

**Exploring**
- `explore.html` (linked from the homepage, Journey and the search's quick actions): browse by stage of life, profession or
  subject, open a course's chapters and topics, see what each topic builds on and leads to (where the course has a
  concept graph), start or revise any topic. Nothing is locked.
- *Explore related topics* in every lesson (**E**, and in "What would you like to do next?"): what the lesson builds on,
  lessons named after its key terms and the rest of its topic, each previewable in the drawer. Opening one offers a
  *Back to* link to the exact place in the lesson you left.

**Mastery** (the Gradify Mastery System)
- Every chapter of every course has its prerequisites (`kit/learning/chapter-map.js`: authored for 33 courses, derived
  from the concept graph for Maths; a test rejects unknown chapters, cycles and redundant links).
- One mastery scale everywhere: Not started → Learning → Practising → Proficient → Mastered, plus Needs revision, from
  answers only (`kit/learning/mastery-map.js`).
- The mastery map: on Explore (Chapters / Mastery map) and at the top of each course's Progress page.
- The course world: on each subject site's map, the course's stages are regions and its chapters are places. They
  light up from real mastery, mastered chapters become landmarks, and the roads are the prerequisites.
- Today's topic quest: Understand / Remember / Apply on the topic the learner is in (`kit/game/quests.js`), on course
  Home and the Journey.

**Premium**
- Split screen (**S**, 1100px and wider): notes on the left; questions, flashcards, the AI tutor and the lesson's
  diagrams on the right, in tabs. The sections move across with their state (answers, the tutor conversation).
- Focus mode (**F**), keyboard shortcuts everywhere (**?** lists them), subtle view transitions, copy a link to any
  section (the link icon beside its heading), back to top on long pages.

## Keyboard shortcuts in a course

| Keys | Does |
| --- | --- |
| / or ⌘K / Ctrl+K | Search |
| ? | All shortcuts |
| ← → | Previous / next lesson |
| N | The recommended next step |
| B, F, S, R, E, O, U | Bookmark, focus mode, split screen, revision notes, explore related topics, outline, up to the unit |
| G then H / S / R / P / E / B | Course home, Syllabus, Revise, Progress, Exams, back to where I was |
| Esc | Close a menu, dialog or the search |

Shortcuts pause while typing and while a dialog is open.

## Storage

| Key | Where | What |
| --- | --- | --- |
| `gradify.course.<slug>` → `pos` | device, synced to the account | Where each lesson was being read (60 most recent; newest wins on merge) |
| `gradify.recent` | device | Each course's current lesson, progress and recommended next step (the course cards) |
| `gradify.pins` | device | Pinned courses, in the learner's order |
| `gradify.visited` | device | Recently visited places outside courses |
| `gradify.ui` | device | Interface preferences, by scope |
| `gradify.places` | this tab (session) | The trail of places and their scroll positions |

## The native Apple app

The app should implement the same components with the same names, behaviour and storage meanings, so a learner moving
between devices finds the same thing in the same place: `GradifyToast` with Undo (UndoManager), `GradifySaveState`
from the same six states (`saveLabel` in `kit/ui/feedback.js` is the wording), the palette as a `.searchable` sheet
over the same index (`kit/data/search-index.json`), the resource switcher as the lesson's last section, split screen as
`NavigationSplitView` on iPad, and reading positions read from and written to the same `pos` field of the course
progress the web syncs. That last one is what makes "start on a laptop, finish on an iPhone" land on the same section.

## Not done yet

- Pins, recent places and interface preferences are kept per device; they don't sync with the account yet.
- A notifications inbox page: toasts keep a per-tab history (`recentNotices()`), but nothing shows it yet.
- Drag-and-drop and bulk actions exist for pins only, not for flashcards or notes in the study app.
- The study app (`kit/app/`) uses the shared toast; its other screens don't use the shared modals, tabs and empty
  states yet.
