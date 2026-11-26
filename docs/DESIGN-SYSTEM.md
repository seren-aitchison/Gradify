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

**Tokens.** `kit/design/tokens.json` is the source: fonts (Inter on every platform, self-hosted with its optical-size axis, with San Francisco and the system fonts as fallbacks; Geist Mono for code and maths working only; the weights and tracking are in "Gradify typography" at the end of `kit/styles/base.css`),
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
comes from a token (status colours are AA on their own backgrounds in both themes; input borders use `--ds-field` and
focus rings `--ds-focus`, both at least 3:1 against every surface; `--ds-line` is for decorative separators only) and nothing uses `!important`;
`tests/design-tokens.test.mjs` checks both. Homepage-only overrides in `assets/styles.css` are not part of the system
and are never copied into subject sites. The review page is `labs/design-system/` (never published). How to use each component (markup, phones, light and dark, keyboard,
screen readers, error and empty states) is in `docs/DESIGN-SYSTEM-COMPONENTS.md`.

**Appearance.** Every page follows the device's light or dark setting by default (`kit/core/theme-boot.js`). The
sun/moon button picks light or dark for this device, and **Reading and accessibility → Appearance** offers
"Match my device", Light and Dark, so following the device can always be chosen again. "Reset everything" returns to
matching the device.

**The Gradify look (November 2026).** Every surface now shares one visual language: white (dark: near-black) rounded
tiles with a hairline and a soft shadow on the soft page, strong text, coloured squircle icons, the Gradify gradient
for the one bold moment on a page, and the action card (`.g-action`) wherever a page says what to do next. Search pages:
`assets/seo.css` (tokens on `main.seo`). Homepage, Pricing, Journey: `assets/styles.css`, `pricing.html`,
`kit/styles/game.css`. Subject sites: the end of `kit/styles/subsite.css` (the closing is a deep shade of the site's
colour with the gradient along its top). Study app: the end of `kit/app/app.css` (panels are solid tiles through the
glass tokens, so panels with their own colours keep them). Rules written as `:root …` are left alone by
`scripts/theme-tokens.mjs`; use that for white text on a coloured background.

**The lesson reading layer (November 2026).** How a lesson reads is set once, at the end of `kit/styles/course.css`
(scoped to `.co.co-reading .co-read`, so the 3D model pages keep their own look), and every course on every subject
site gets it. The rules:
- *Paper, not glass.* The lesson sheet is solid (`--ls-sheet`) with a hairline and a soft shadow; glass stays for the
  chrome around it (outline, lesson bar, rails).
- *The subject's own colour.* `--lc` is the site's `--accent`; `--lc-ink` mixes it towards the ink so text in it is AA on
  any accent; `--lc-wash` and `--lc-line` are its tint and edge. Goals, section numbers, bullets and the next-lesson card use it.
- *One label voice.* Every eyebrow in a lesson is `--ls-label` (sans, 13px, 650, sentence case). Mono is for code, maths
  working, keys and timers only; navigation numbers are sans with tabular figures.
- *Four callouts, one shape.* Key idea (subject colour), worked example (`--ls-ok`), common mistake (`--ls-warn`) and
  safety (`--ls-bad`): a tinted surface, a 4px rail, a labelled icon, and body text always in the ink colour. Worked
  example steps are a numbered timeline.
- *Answers are lettered rows* (A, B, C…) with hover, picked, right (✓) and wrong (✕) states that don't rely on colour alone.
- *The end of a lesson says where you are.* The topic strip (`topicStrip()` in `kit/course/course.js`) shows one segment
  per lesson in the topic on the closing panel and in the completion dialog, and fills in the one just finished.
  Previous / up / next are three even cards. While a dialog is open the phone dock steps aside.
- Checked with axe (WCAG 2 A/AA) on lessons in four subjects, light and dark, and on course home and the syllabus.

**The page (November 2026, second pass).** The page is pure white in light mode and pure black in dark: no lavender
wash and no coloured light at the edges (the aurora, the course's CSS light and the GPU glass scene are all plain).
Colour comes from the content, from the spot illustrations and from a few background motifs. Every piece of text sits
in a box (a tile, card, sheet or bar) wherever a motif could reach it. The Gradify bar is plain frosted glass in the
mode's colour with a hairline. The action card's edge gleams in pink, yellow, orange and the mode's contrast (black on
white, white on black), with a glint that runs round it, still when motion is reduced.

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
| GradifyTabs, segmented controls, GradifyAccordion | `kit/ui/disclosure.js` | `tabsHtml` + `wireTabs` (arrow keys, Home/End, remembered); `segmentedHtml` + `wireSegmented`; `wireAccordion` (open sections remembered, expand/collapse all); `wireSections` (a long page's headed sections fold, remembered per page, never by themselves, opened by a jump to them, with expand/collapse all); `wireSteps` (a worked example's steps one at a time, the last marked as the answer; every step stays in the HTML); `densityHtml` + `wireDensity` (full or compact, remembered); `wireRows` (a row's detail opens under it). `details.gx-more` is Show more / Show less |
| GradifyEmptyState, skeletons | `kit/ui/states.js` | `emptyState({ icon, title, body, actions })`; `skeleton("lesson" \| "list" \| "cards" \| "text")` |
| Keyboard shortcuts | `kit/ui/keys.js` | `shortcuts([{ keys, label, group, run, when }])`: one registry, so **?** lists every shortcut on the page |
| GradifyCommandPalette | `kit/ui/palette.js` | `createCommandPalette({ search, searchMore, suggestions, kinds, groups })`: **/** or **⌘K** anywhere |
| GradifyResourceSwitcher, intelligent course card | `kit/ui/resources.js` | `resourceSwitcher({ kicker, items })` ("What would you like to do next?"); `courseCard({ … next })` |
| Back to where I was | `kit/ui/wayfinding.js` | `offerBack(place)`: a chip back to the lesson you came from, at the same scroll position |
| Places: trail, recent, pins | `kit/ui/places.js` | The tab's trail of places with scroll positions (Back restores them), recently visited, and pins (Undo, drag to reorder, Alt+↑/↓) |
| Activity history | `kit/ui/history.js` | `logEvent({ act, href, title, subject, where })`: what the learner viewed, studied, created and edited, in the study app and every course, on this device. Repeats within half an hour are one line. Read by the app's History screen (`kit/app/history-view.js`), which filters by activity, subject and date |
| Workspace tabs | `kit/ui/workspace.js` | `mountWorkspace(host)`, then `ws.arrived(place)`: a strip of the few things a learner works between (a lesson, notes, plan, a question set, flashcards), one tab per kind of work in each course or the app, each keeping its place and scroll. Shown from two tabs; W then N / P switches |
| Lesson tools bar | `kit/ui/context-bar.js` | `mountContextBar(host, items, { label, hideWhen })`: a lesson's tools (the same items as its `resourceSwitcher`) in a bar along the bottom once you've scrolled in; on a phone, a sheet from the course dock's Tools button |
| Recent courses | `kit/ui/switcher.js` | `mountCourseSwitcher(el, { current })`: a dropdown of the courses recently opened, newest first, each with its progress and the lesson you were on, opening where you left off. In the app's top bar and every course header; G then O opens it; arrow keys, Home/End and Esc work inside it |
| Connections | `kit/ui/connections.js` | `mountConnections(el, resource)`: beside any resource, what the learner linked it to (from either end), what it was made from, its collections and the learner's note, suggestions with why (shared specification points, titles, course; another subject only with a real overlap), "Link something" over every course and the learner's own places, and a small map of its neighbours |
| Resource actions | `kit/ui/resource-actions.js` | `mountResourceActions(host, () => resource, { store })`: the same ••• menu on every resource: pin, save to a collection, Connections, schedule into the plan, add a note, share, see its history. All through the learner's record (`kit/data/learner-state.js`) |
| Sync status | `kit/ui/sync-status.js` | `mountSyncStatus(el)`: where the learner's workspace record is: on this device, saving, saved to the account, offline (saved here) or retrying, with the changes waiting; worded by `saveLabel` |
| Quick tools | `kit/ui/quick-dock.js` | `mountQuickDock({ app })`: one round button on every study page opening a timer that keeps running between pages (pause, resume; the button shows the time left), a quick note into today's page in Notes, capture (links to a Captured collection, anything else into Notes), New (kit/ui/quick-actions.js `openCreate`), search, the keyboard shortcuts and Send feedback. `startTimer(mins, label)` from anywhere |
| Quick actions | `kit/ui/quick-actions.js` | The things done again and again, in the fewest steps, the same on every page. `openCreate({ app, store })` (key C, or New in the quick tools): a Notes page, a task for today, a flashcard set, a collection, a mind map or a quiz. `setPageOps({ rename, duplicate, move, export, report, delete })`: what this screen can do with its resource, shown in its ••• menu (only what it supports) and on the keyboard (. opens the menu, where each action has its own key; F2 rename; ⌘⌫ delete; ⌘S save to a collection). `undoable(html, undo)` (a notice with Undo, and ⌘Z later), `deferredDelete({ hide, restore, commit })` (hidden at once, deleted once the notice has gone), `mountMultiSelect(list, { item, key, actions })` (Select, Shift+click for a range, ⌘A; a bar with the bulk actions), `renameInPlace(heading, name, save)`, `pickCollection()`, `reportDialog(r, { subject, lesson, question })` (to `lesson_reports`), `feedbackDialog({ about })` (to `app_feedback`); both wait on the device until they can be sent (`sendOrKeep`) |
| Remembered preferences | `kit/ui/prefs.js` | `pref(scope, key)` / `setPref(scope, key, value)`: views, filters, tabs, open sections, outline and split screen |
| Motion and long pages | `kit/ui/motion.js` | `transition()`, `jumpTo()`, `mountToTop()`, `copyLink()` |
| GradifyContinueLearning, Gradify-wide search | `kit/ui/global-nav.js` | `mountGlobalNav()` (the palette over every course and lesson) and `mountYourLearning()` (pins + course cards) for the homepage and subject sites |
| GradifyShelf (your courses as 3D spines) | `kit/ui/shelf.js` | `shelfHtml(courses, { colourOf })` and `wireShelf(el)`: each course a spine in its subject's colour that tilts with scroll and opens its next step; used by `mountYourLearning({ layout: "shelf" })` on the Gradify homepage for returning learners |
| Explore | `kit/ui/explore.js` | `mountExplore(el)` on `explore.html`: every course as site → course → chapter → topic → lesson, with topic preview cards (progress from evidence, estimated time, builds on / leads to), stage filters, remembered chapters and search |
| Pathways | `kit/ui/pathways.js` | Explore's curriculum pages (`explore.html#/pathways`): start from a subject, exam board, country, stage or profession and follow the real relationships of the curriculum graph (`kit/curriculum/graph.js`) both ways. Site-directory cards with the gleaming edge (`.gx-pw-card.g-gleam`), action cards to start each path, breadcrumbs that follow the way taken (`?from=`, collapsing on a phone), a board switcher, and empty states where the registry has nothing yet |
| Mastery map | `kit/ui/mastery-map-view.js` | `renderMasteryMap(el, map, { hrefOf, unitWord })`: a course's chapters from foundations (left) to advanced (right), lines for what builds on what, each chapter coloured by its mastery level; *Within reach* and *Holding you back* above it. Data: `kit/learning/mastery-map.js` |
| Feedback moments | `kit/ui/feel.js` | `feel("correct" \| "wrong" \| "complete" \| "levelup" \| "achievement" \| "select")`: a haptic and an optional short sound, set in the Aa panel (Sounds off by default, Haptics on) |
| Liquid Glass (GPU) | `kit/ui/liquid-gl.js` | `start()`, loaded on every page by `kit/core/theme-boot.js`: one WebGL canvas behind the page draws its light and every glass surface on screen (headers, footers, panels, plans, course cards) with refraction, dispersion, Fresnel, a specular that follows the pointer and contact shadows; floating bars carry a copy of their patch. Three tiers: `webgl` (full), `webgl-lite` (no colour split, 12 surfaces, fewer pixels: phones with little memory, no highp, few uniforms, or a full tier measured under 30fps) and `css` (no WebGL, software rendering reported by the browser through `failIfMajorPerformanceCaveat` or named by the renderer, reduced transparency, high contrast, data saver, a lost context, or lite measured slow too). Shaders compile in the background (`KHR_parallel_shader_compile`); speed is the median frame interval after warm-up, never `gl.finish()`. Lost contexts fall back to CSS and come back on restore; reduced motion keeps the light still. What happened: `<html data-glass>` and `window.gradifyGlass` in the console. `localStorage["gradify.glass"]`: `off`, `lite`, or `force` (skips the checks, for testing). `GLASS=slow-gpu node scripts/check-sync.cjs` runs the lesson journey through the step-down. Research: `labs/liquid-glass/` |
| **Action card** (the fixture for "what to do next") | `kit/core/action-card.js` + `.g-action` in `kit/styles/base.css` | `actionCard({ kicker, title, why, actions: [{ label, icon, href \| attrs, soft }] })`: one clear next step, why it matters, and buttons that do it. A white (dark: near-black) tile with a Gradify-gradient hairline, a gradient squircle icon (a spark by default), an uppercase kicker in the accent colour, a bold title, a muted reason and pill buttons (`.g-act`; `.soft` for the secondary one). Use it wherever a page tells someone what to do next; one per view. First used for the degree tracker's "Your next best action" (`assets/study-tools.js`). Inside a tool it takes the tool's tokens (`assets/seo.css`) |
| **Link tiles** | `.g-tiles` in `kit/styles/base.css` | `<ul class="g-tiles"><li><a href><span class="g-ic">svg</span><b>Name</b><span>One line</span></a></li></ul>`: white rounded tiles, each with a coloured squircle icon (indigo, pink, orange, amber in turn, or set `--k` on the `<li>`), the whole tile clickable, lifting under the pointer. First used for the homepage's free tools |
| Action card options | `actionCard({ tag, heading })`, `.g-action.compact` | `tag: "aside"` for a page's closing call to action, `heading: "h2"` to keep the title in the page outline (the search pages' closing). `.compact` is the one-sentence version under a result (the free tools' "Next step"). Buttons use `--g-btn` (#5b55ff in dark) so white text meets AA |
| Subject icon and colour | `kit/core/subject-match.js`, `kit/core/accent.js` | `subjectOf(name)` / `subjectsFor(names)`: the Gradify subject site a module or course name belongs to (its icon and brand colour), from the words of the name; unclear names take the degree's main subject. `accentOnLight(site)` / `accentOf(site)` give its colour at 5.5:1 contrast on light and dark |
| Storage helpers | `kit/ui/store.js` | Safe reads and writes (private windows, blocked storage), `esc`, and the stylesheet loader |
| **Spot illustrations** | `kit/ui/art.js` + `.g-art` in `kit/styles/base.css` | `art(name)` / `artFor(words)`: small line drawings in the lesson-diagram style (fine ink lines with round ends, duotone fills: the site's or course's colour `--art-a`, a warm neutral `--art-n` and a quiet brass `--art-c`, a soft ground shadow); the ink follows the theme. Fourteen drawings: course, modules, upload, plan, path, cards, progress, search, target, streak, done, tutor, lesson, library. Nineteen subject drawings (maths, flask, dna, atom, history, law, medicine, language, book, art, music, business, finance, computing, engineering, brain, ecology, sport, teaching); `subjectOf(name)` picks one for a site or course. `heroArt(subject)` is the large version for a page's hero (the subject drawing big on a soft blob, with smaller drawings round it): a course page's header, a subject site's course banner (white ink), the homepage hero (either side of the headline on wide screens) and the app's Today. Every action card picks one from its words (`art: "plan"` chooses, `art: false` turns it off), and so does every empty state; they also sit on subject-site step tiles, the app's welcome card, the course's empty panels and a lesson's closing panel. Decorative: always `aria-hidden` |
| **Background motifs** | `kit/ui/motifs.js` (loaded by `kit/core/theme-boot.js`) | Line ribbons at the page's edges: bands of hair-thin wavy lines whose ripples crowd into bright folds, shimmering through a tone's colours (thin-film light), with a soft glow and fading edges. Fourteen tones (`TONES`): pink, blue, lime, yellow, orange, iris, teal, violet, magenta, coral, emerald, gold, cyan and red, each with a deeper set for white and a brighter one for black; each page shuffles them so neighbouring motifs differ. Drawn once per tone and theme on a canvas, half off-screen and faded out, at most six a page, about one per screen and a half. **Never under bare text**: a motif is only placed where it covers no text that isn't inside a box (a tile, card, sheet or bar). Off for high contrast, reduced transparency, forced colours, the data saver, embeds and print; `<meta name="gradify-motifs" content="off">` turns them off for a page |
| **Gleaming edge in a site's colour** | `kit/styles/base.css` | Add `.g-gleam` to any rounded surface to give it the edge (set `--gleam` for its colour). Used on: the homepage's site directory, the free-tools tiles (each in its own colour), a subject site's steps and Where to start tiles, and a course's hero boxes (overview and course home, which also fade from a frosted sheen of the course's colour to the plain page, with the course's drawing on the plain side). Drawings can gleam too: `art(name, { gleam: true })` and every `heroArt()` run a short glint of light along their lines (`.g-glint`), still when motion is reduced. The action card's gleaming edge and glint, coloured by the site (`--gleam`, from the card's `--c` or the page's `--accent`): the homepage's site directory (`#groups .card`) and a subject site's "Where to start" tiles (`.sm-topic`). The edge runs from the site's colour to a light tint, the mode's contrast and a deep shade; start times are staggered; still for reduced motion |
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
