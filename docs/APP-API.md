# Gradify content API (for the native apps)

The iPhone, iPad and Mac apps read the same courses as the website, so a new subject or lesson needs no app update.

| What | Where | Changes when |
|---|---|---|
| Catalogue: every course, its site, status, accent, page and lesson counts | `https://getgradify.com/kit/api/v1/catalogue.json` | a course is added or its syllabus changes |
| A course: schools, modules and lessons (id, title, module), which schools are written, tracks, paths, mock exams, difficulty level names, the course notice | `…/kit/api/v1/courses/<slug>.json` | its syllabus or config changes |
| Labs: each course's interactive labs (id, title, kind, description, what it simplifies, number of challenges, the lessons it serves) and a `url` that opens the lab on its own | `interactives` in `…/kit/api/v1/courses/<slug>.json` | a lab is added or linked to more lessons |
| Lesson text, check questions, flashcards, worked examples, sources | the course's notes files: `notes` in the course file, e.g. `/kit/courses/maths/notes/u07.js` | a lesson is written or edited |

- **Generated, not hand-written:** `node scripts/build-api.mjs` writes `kit/api/v1/` from `kit/courses/*/course.js`. CI fails if it's out of date, and `tests/api.test.mjs` checks every course has a page, a syllabus and a notes file for each written unit.
- **Notes files** are ES modules whose default export is one template literal in the format in `kit/course/notes.js`. Read them as text, never run them: `kit/assess/canon.js` shows how (cut out the literal, decode its escapes, split lessons at `## Title`, read the tagged lines). The Swift client does the same.
- **Versioning:** `api` is 1. Fields are only added within a version; a breaking change gets `/v2/` alongside `/v1/`.
- **Syncing with the native apps:** the plan, the proposed migrations (not applied) and the release checklist are in [APP-DB-INTEGRATION-REVIEW.md](APP-DB-INTEGRATION-REVIEW.md).
- **Accounts and progress** come from Supabase, as on the website (`docs/SETUP.md`, `supabase/migrations/`): `course_progress` holds a course's progress object, `assessment_attempts` one row per answer, with the evidence classes in `kit/learning/evidence-class.js`. Until the project is connected, apps keep progress on the device, as the website does.

## Labs in lessons

A lesson's notes place a lab with a line `IX: <id>` at the point it's taught (the app's parser already reads it as an activity block). Look the id up in the course's `interactives` and show it by opening its `url` in a web view (`WKWebView` on Apple platforms): the URL is the course page at `#/practice/<id>`, which shows that one lab, works at phone width and needs no sign-in. Challenges completed in the web view count on the website's progress on that device; recording them in the app's own progress waits for accounts. An unknown id is skipped, never a crash. Added 9 November 2026 as an additive v1 field.

## Gradify AI (tutor and study packs)

The website and the apps call the same two Supabase Edge Functions with the learner's Supabase access token, so a
learner's allowance, history and spend are one account-wide ledger: a use on iPhone counts on the website and the
other way round. Never call Claude from an app and never ship an Anthropic key: only these functions hold it.

```
POST {SUPABASE_URL}/functions/v1/course-tutor     Authorization: Bearer <access token>, apikey: <publishable key>
POST {SUPABASE_URL}/functions/v1/study-pack
```

Request bodies are documented at the top of each function (`supabase/functions/course-tutor/index.ts`,
`supabase/functions/study-pack/index.ts`). Two additions matter to clients:

- **`conversationId`** (a UUID) on `socratic`, `examiner` and `roleplay` turns. Make one per conversation and send it
  with every turn: the turns then share one use of the learner's tutor allowance (up to 12 turns on Free, 30 on Pro,
  within a day). Without it every turn counts as a new conversation.
- **Saved packs.** Reopen a deck from the learner's `packs` rows (row-level security returns only theirs); never ask
  `study-pack` again for the same deck. Sending exactly the same notes again returns a copy of the saved pack with
  `reused: true`, free.

Every successful reply carries the learner's position:

```json
{ "...": "the mode's fields", "usage": { "feature": "tutor", "plan": "free", "used": 3, "allowance": 5, "resetsAt": "2026-12-01T00:00:00Z", "counted": true } }
```

`cached: true` means the answer came from the response cache (no use was taken). A refusal has an HTTP status and:

```json
{ "error": "You've used your 5 free AI tutor conversations this month. They reset on 1 December. Gradify Pro has many more.",
  "reason": "allowance", "feature": "tutor", "plan": "free", "used": 5, "allowance": 5, "resetsAt": "2026-12-01T00:00:00Z", "upgrade": true }
```

| `reason` | Status | Meaning | What the app should do |
|---|---|---|---|
| `signed_out` | 401 | no or expired token | refresh the session once, then ask the learner to sign in |
| `ai_off` | 503 | Gradify AI isn't switched on (or not for this learner yet) | hide or disable AI features |
| `allowance` | 429 | this feature's monthly allowance is used | show `error`; if `upgrade`, offer Gradify Pro |
| `conversation_long` | 429 | the conversation reached its turn limit | offer to start a new conversation |
| `fair_use` | 429 | the learner's monthly fair-use limit is reached | show `error` (says when it resets) |
| `rate` | 429 | too many requests in a minute or an hour | ask the learner to wait a minute |
| `busy`, `budget` | 503 | Gradify AI is paused or overloaded for everyone | show `error`, try later |
| (none) | 4xx/5xx | the request itself failed (too long, Claude unavailable) | show `error`; the use was given back |

Show `error` as written: it is plain English for learners. To show allowances before a request, call the
`my_ai_allowance` database function (`POST {SUPABASE_URL}/rest/v1/rpc/my_ai_allowance`, learner's token): one row per
feature with `feature, plan, used, allowance, period_end, enabled`. Allowances are monthly on both plans; Free resets on
the 1st of each month, Pro on the monthly anniversary of its billing period.
