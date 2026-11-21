# Gradify Notes

`app.html#/notes` (code in `kit/notes/kb/`). An outliner knowledge base where notes and flashcards are the same thing. The old study-pack library moved to `#/library`.

| File | What it does |
|---|---|
| `model.js` | The knowledge base: rems (bullets), documents, folders, references by id, tags and properties, portals, templates, daily documents, to-dos, card extraction, search, undo, and the device/account merge. Pure, tested |
| `exam.js` | Exam plans: learning, catch-up, review and final-review periods, daily load, readiness. Pure, tested |
| `io.js` | Import (Markdown/Obsidian, OPML, CSV, Anki text, Tools notebook, native) and export (Markdown, OPML, HTML, text, Anki, CSV, native). Pure, tested |
| `ask.js` | Ask your notes: BM25 retrieval over notes and PDF text, with quoted answers and sources. Pure, tested |
| `store.js` | localStorage + IndexedDB (PDFs and their text), sync to `tool_items` (kind `kb`), shared snapshots (`kb_shares`) |
| `bridge.js` | Notes cards → the app's `cards` table (one `documents` row per notes document, `file_name` `kb:<rem id>`), so they're in Today, Revise, Progress and the Mastery Engine |
| `view*.js`, `kb.css` | The screens: editor, blocks and PDF reader, flashcards and exams, learning tools |

## Writing cards

`Front >> Back`, `Back << Front`, `Front <> Back`, `Term :: Definition` (both ways; direction adjustable), `Attribute ;; Value` (descriptor, asked with its parent), `Question >>>` (children are the answer), `Steps >>1.` (list answer), `Question >>A)` (multiple choice: first child right), `{{cloze}}` / `{{c1::grouped}}` / `{{word::hint}}`, image occlusion on any image, and tags with "make cards" for table-generated cards. Card ids come from the bullet, so rewording keeps the schedule; deleting a bullet suspends its card rather than losing its history.

## Deploying

Apply `supabase/migrations/20261120120000_notes_knowledge_base.sql` (allows `tool_items.kind = 'kb'` and adds `kb_shares`). Until then, notes work on the device and sharing says it isn't switched on.

**Sharing and privacy.** Only a share's owner can read, change or delete its `kb_shares` row. A visitor or another learner can't select from the table at all. A share link is opened with `kb_share(id)`, a security-definer function that returns that one share's title, snapshot and date while it's public, and never the sharer's user id or the note's id. Unsharing deletes the row, so the link stops working at once; an unknown, private or malformed id opens nothing. `tests/kb-db.test.mjs` checks all of this on real PostgreSQL with Supabase's default privileges.

**Sync cost.** `merge()` is linear (about 170 ms for 10,000 bullets; it was 29.6 s before the fix), and a sync only downloads and merges the account's copy when another device has changed it since this one last saved.

## Known limits

- The whole knowledge base syncs as one row (merged bullet by bullet). Past about 1.9 MB it stays on the device and the sidebar says so. Per-document rows are the next step.
- PDFs stay on the device they were added on (their highlights and notes sync).
- Ask your notes quotes the notes; it doesn't generate answers. A grounded AI answer needs a new `course-tutor` mode that accepts the learner's own passages (the current one fetches canonical lesson notes only).
- Not yet: real-time collaborative editing and group knowledge bases, `.apkg` import with review history, audio recording storage (dictation works), and reminders for dated to-dos.
