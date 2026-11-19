# The Gradify UX system

One set of interface components for every Gradify page: each course (`kit/course/course.js`), each subject site's
homepage (`kit/core/subsite-home.js`), the Gradify homepage (`index.html`), the study app (`kit/app/main.js`) and the
Journey page. They live in `kit/ui/` with their styles in `kit/styles/ui.css`, and they're tested once
(`tests/ui.test.mjs`) instead of being rewritten slightly differently for each site.

The aim: a learner never has to ask "Where do I find that?", "Where was I?" or "What should I do next?".

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
| Explore | `kit/ui/explore.js` | `mountExplore(el)` on `explore.html`: every course as site → course → chapter → topic → lesson, with topic preview cards (progress from evidence, estimated time, builds on / leads to), stage filters, remembered chapters and search |
| Feedback moments | `kit/ui/feel.js` | `feel("correct" \| "wrong" \| "complete" \| "levelup" \| "achievement" \| "select")`: a haptic and an optional short sound, set in the Aa panel (Sounds off by default, Haptics on) |
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
