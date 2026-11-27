# Search, discovery and retrieval

Search is meant to work as a way of getting around Gradify, not just a box at the top of one page. There are three
ways in, and they share one engine (`kit/search/`):

- **Quick search**: **/** or **⌘K** (Ctrl+K) anywhere. It searches what's nearest (a course's lessons and notes, or
  the app's screens and actions, every course and the learner's own things). It shows recent searches before anything
  is typed, and ends with **See all results**, which **⇧↵** also opens.
- **The Search screen**: `app.html#/search?q=…`, in the sidebar under Today. It holds every result, grouped and
  filtered, with previews and actions. The query and its filters are kept in the address, so a search can be
  bookmarked, shared, pinned, reached with Back, or saved by name.
- **Find in a lesson**: **⇧F** in a lesson, or the **In this lesson** group in a course's quick search.

## What's searched

| Source | From | Becomes |
| --- | --- | --- |
| Courses, units, modules, lessons | `kit/data/search-index.json` (`scripts/build-search-index.mjs`) | Courses, Topics, Lessons |
| Each written lesson's key terms, section headings, level, question and card counts | `kit/api/v1/lessons.json` (`scripts/build-api.mjs`, fetched on the first search) | Lessons found by what they teach, not only by their titles. Each lesson's **practice questions** and each unit's **quiz** and **course flashcards** appear as results of their own |
| Specifications | `kit/curriculum/specs/*.json`: section references and headings only, never the awarding body's text | Curriculum, with the exam board, qualification and page |
| Qualifications and exam boards | `kit/curriculum/uk.js` | Curriculum |
| The learner's own things | the store (flashcard sets and their cards), Tools (decks, mind maps, notebook pages), quick notes, Notes documents, collections and their items, plan blocks, pins and schedules | Flashcards, Notes, Mind maps, Collections, Tasks |
| The app | its screens and actions (`kit/app/app-nav.js`) | Screens, Actions |

Lesson progress (`kit/learning/course-states.js`) gives each lesson, unit and course its completion. Pins, collections
and schedules (`kit/data/learner-state.js`) give everything its status.

## The query language

Everything a filter chip does can also be typed, and the two are the same thing:

| Type | Finds |
| --- | --- |
| `equilibrium` | every word must match: whole words, their stems (equilibria ≈ equilibrium) and the starts of words |
| `"le chatelier"` | the exact phrase |
| `-industrial` | leave out anything containing that word |
| `type:flashcards` (cards, questions, notes, maps, collections, tasks, curriculum, lessons, topics, courses, actions, screens) | one kind of resource |
| `in:course:chemistry`, `in:folder:"Mock week"`, `in:lesson:u08-02` | within a course, a collection or a lesson |
| `board:aqa`, `qual:a-level` | exam board, qualification |
| `status:saved` (pinned, scheduled, completed, in-progress, draft) | resource status |
| `done:no`, `done:yes` | finished or not (`done:no` includes things whose completion isn't tracked, such as your own notes) |
| `tag:difficult` | carries one of your tags (docs/ORGANISE.md) |
| `difficulty:hard` (easy, medium, 1–3) | level |
| `after:7d`, `before:2026-11-01`, `since:month` | created or changed in a timeframe |

## Ranking

A match in the title counts most, then a key term, then where the result lives, then its text. Matching the whole
title, or the start of it, ranks higher, and so do the query's words appearing together and in order. The course the
learner is in outweighs a slightly better title in another subject. Pinned and in-progress items, things opened
recently and things changed recently get a small lift. Results are grouped in reading order: Lessons, Flashcards,
Questions, Notes, Mind maps, Curriculum, Topics, Courses, Collections, Tasks, Actions and Screens. A result that is
exactly what was typed is also shown first, as the best match.

## When nothing matches

The screen offers only options that would find something, each with how many results it gives:

- the corrected spelling;
- each filter taken off in turn;
- any of the words instead of all of them;
- fewer words.

Underneath, it offers to browse every course, ask Gradify AI, or make flashcards from the learner's notes.

## The features (126–150)

| # | Feature | Where |
| --- | --- | --- |
| 126 | Universal search | The Search screen and quick search, over every source above |
| 127 | By resource type | Type chips (each shows how many it would find) and `type:` |
| 128 | By curriculum | Specification sections by reference and title, qualifications and exam boards |
| 129 | Exact phrase | `"…"` |
| 130 | Search history | Recent searches on the screen, in quick search before typing, and in autocomplete; removable one by one or all at once |
| 131 | Saved searches | **Save** on the screen; shown in its sidebar and in autocomplete |
| 132 | Recent search suggestions | Autocomplete and quick search |
| 133 | Autocomplete | Saved searches, then past searches, then the word finished, then matching titles |
| 134 | Within a course | The screen's scope menu; a course's quick search ("See all results in Chemistry"); `in:course:` |
| 135 | Within a folder | The scope menu (a folder); `in:folder:`; "Search inside" on a folder |
| 136 | Within a lesson | **⇧F** find bar (every match marked, "3 of 12", sections listed, closed sections opened) and "In this lesson" in quick search |
| 137 | By date | Filters → Created or changed; `after:` / `before:` |
| 138 | By completion | Filters → Completion; `done:` |
| 139 | By difficulty | Filters → Difficulty (from each lesson's level line); `difficulty:` |
| 140 | By exam board | Filters → Exam board; `board:` |
| 141 | By qualification | Filters → Qualification (from course coverage and lesson level); `qual:` |
| 142 | By status | Filters → Status (saved, pinned, scheduled, completed, in progress, draft); `status:` |
| 143 | By folder | The scope menu; `in:folder:` |
| 144 | Breadcrumbs | Every result: site › course › unit › module, Notes › folder, Library, and so on |
| 145 | Previews | The expand button opens a preview beside the results, with key terms to search on |
| 146 | Result actions | Pin, Save to a collection, Schedule and Open on every result and in its preview |
| 147 | Relevance ranking | See Ranking |
| 148 | No-result recovery | See When nothing matches |
| 149 | Cross-resource search | One query finds a concept in lessons, questions, flashcards (by card text), notes (by their text), mind maps and the curriculum |
| 150 | Command actions | The app's actions and screens are results too (Actions, Screens) |

## Limits

- Lessons get an exam board only once their mapping to a specification has been verified. The current mappings in
  `kit/curriculum/maps/` are proposed and not yet reviewed, so board filters find specification sections, not lessons.
- Searching inside a lesson's full text is done by the find bar on the lesson itself. The Gradify-wide index holds
  each lesson's key terms and headings, not its full text, which keeps the index small enough to fetch once.
- Recent and saved searches are kept on this device only ("gradify.search"). Syncing them would need a new kind in
  the learner record and its table's check constraint.
