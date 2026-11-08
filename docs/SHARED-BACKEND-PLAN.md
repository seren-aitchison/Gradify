# One Gradify backend: connection plan, sync fix and lesson blocks

**Version 1, 8 November 2026. Status: approved in principle by the owner (8 November). Nothing here has been
implemented.** Superseded in detail by: [SUPABASE-CONNECT.md](SUPABASE-CONNECT.md) (the owner's step-by-step
guide; replaces A3 and A4), [PROGRESS-SYNC.md](PROGRESS-SYNC.md) (replaces Part B) and
[LESSON-BLOCKS.md](LESSON-BLOCKS.md) (replaces Part C).
No production configuration, table or migration has been changed.

One Supabase project serves getgradify.com, every sub-site, and the iPhone, iPad and Mac apps: one account
system (Supabase Auth), one progress system (the learner tables), one content system (`kit/api/v1/`).

---

## Part A. Connecting Supabase

### A1. What exists

| Item | Where | State |
|---|---|---|
| 11 migrations | `supabase/migrations/` | In the repository. Whether they've been run is unknown |
| Edge Functions `study-pack`, `course-tutor` | `supabase/functions/` | In the repository. Whether they're deployed is unknown |
| Browser client | `kit/data/store.js` | Uses `SUPABASE_URL` and `SUPABASE_ANON_KEY` from `gradify.config.js`; falls back to this-device mode when they're empty |
| Site config | `gradify.config.js` | Both values empty on `main`, which is what's deployed (checked through GitHub, 8 November) |
| Deploy workflow | `.github/workflows/` "Test and deploy" | Copies allowlisted files to GitHub Pages. Uses **no** secrets or variables, and needs none |
| Project ref `ezlohntrnassgsbofcfc` | `.mcp.json` only | Added on 7 November in commit `731ec2f` (Supabase MCP config). Not used by the site, and in no other file |
| Checker | `scripts/verify-backend.mjs` → `kit/data/backend-check.js` | Accepts `sb_publishable_…` and legacy `eyJ…` anon keys; refuses `sb_secret_…` and `service_role` keys |

**Is `ezlohntrnassgsbofcfc` the right project?** It's the only project named anywhere in the repository, and it
was added yesterday, so it's probably the one you created. But this session can't reach `*.supabase.co`, so whether
it exists, which account owns it and which migrations have run can only be confirmed by you (step A3.1 and A3.4).

### A2. Every setting and credential, and where it goes

| What | Secret? | Where you find it | Where it goes |
|---|---|---|---|
| Project URL (`https://ezlohntrnassgsbofcfc.supabase.co`) | No | Project Settings → Data API (or the project's Connect dialog) | `gradify.config.js` → `SUPABASE_URL`; later the apps' build config |
| Publishable key (`sb_publishable_…`) | No | Project Settings → API Keys → Publishable key | `gradify.config.js` → `SUPABASE_ANON_KEY`; later the apps' build config |
| Secret key (`sb_secret_…`) or legacy `service_role` | **Yes** | Project Settings → API Keys | **Nowhere in Gradify.** Not the site, not GitHub, not the apps, not Claude. Nothing in Gradify needs it |
| Anthropic API key (`sk-ant-…`) | **Yes** | console.anthropic.com → API Keys | Supabase only: Edge Functions → Secrets → `ANTHROPIC_API_KEY` |
| Database password | **Yes** | Set when the project was created | Only your own Supabase CLI prompt, if you use `supabase link` |
| Test learners' passwords | **Yes** | You choose them (A3.5) | Typed into your own terminal at a hidden prompt (A4). Never in a file or in Claude |
| Site URL, redirect URLs | No | Authentication → URL Configuration | Supabase dashboard (A3.3) |
| Optional function settings (`GRADIFY_ALLOWED_ORIGINS`, `GRADIFY_SITE_URL`, `GRADIFY_DAILY_PACKS`, `GRADIFY_MAX_CHARS`) | No | `docs/SETUP.md` §4 | Edge Functions → Secrets |

### A3. The simplest secure configuration

**GitHub needs nothing: no Actions secrets, no Actions variables.** The site is static, and the only two values
the browser needs (URL and publishable key) are public by design. Row-level security, which every learner table
has, is what keeps data private. Committing them directly to `gradify.config.js` is the simplest option and
the one the existing tests already check (`tests/secrets.test.mjs` allows only a publishable/anon key there and
fails on anything secret; `build-site.mjs` refuses to publish an `sb_secret_` key). Injecting them at build time
from Actions variables would add moving parts and make the repository's config differ from the live one,
for no security gain.

Steps, in order (yours, in the Supabase dashboard):

1. **Confirm the project.** supabase.com → Dashboard. Open the project whose URL contains `ezlohntrnassgsbofcfc`.
   If it isn't in your list, stop and tell Claude: the `.mcp.json` ref is wrong.
2. **Region and plan.** Project Settings → General: note the region (London is right for UK learners). On the Free
   plan a project pauses after a week without use; that's fine for testing, not for launch.
3. **Auth URLs.** Authentication → URL Configuration:
   - Site URL: `https://getgradify.com/app.html`
   - Redirect URLs → Add URL: `https://getgradify.com/**`
   - (Later, for the apps: a custom scheme such as `gradify://auth-callback`. Not now.)
4. **See which migrations have run.** Table Editor. Tick off which of these tables exist:
   `profiles, documents, packs, cards, reviews, activity, plan_blocks, waitlist` (core), `workouts, body_checkins,
   fitness_tests`, `assessment_attempts`, `course_progress`, `tutor_usage`, `revalidation_entries`,
   `page_events`. The learner profile, tutor modes and game rewards migrations change existing tables, so step A4.1
   checks those for you.
   **Tell Claude the list (table names only).** If none exist, the plan is to run all 11 in date order. If some
   exist, Claude will tell you exactly which files to run, so nothing is run twice.
5. **Create two test learners.** Authentication → Users → Add user → Create new user. Email `test-a@<your domain>`,
   a long password, tick **Auto Confirm User**. Repeat for `test-b@…`. Keep the passwords in your password manager.
6. **Copy the two public values.** Project Settings → API Keys. Copy the **Publishable key**. You'll paste it at a
   prompt in A4. It's public, so it's also fine to give Claude, who will commit it to `gradify.config.js` once the
   check passes (A5).

### A4. Running the check on your Mac (no secrets in files, history or chat)

From a clone of the repository on your Mac (`git clone https://github.com/seren-aitchison/Gradify.git`, then
`cd Gradify`, `npm ci`), paste this block. It asks for each value at a prompt; passwords aren't shown or saved in
shell history:

```bash
read -r -p "Project URL: " GRADIFY_SUPABASE_URL
read -r -p "Publishable key: " GRADIFY_SUPABASE_ANON_KEY
read -r -p "Test learner A email: " GRADIFY_TEST_EMAIL
read -r -s -p "Test learner A password: " GRADIFY_TEST_PASSWORD; echo
read -r -p "Test learner B email: " GRADIFY_TEST_EMAIL_B
read -r -s -p "Test learner B password: " GRADIFY_TEST_PASSWORD_B; echo
export GRADIFY_SUPABASE_URL GRADIFY_SUPABASE_ANON_KEY GRADIFY_TEST_EMAIL GRADIFY_TEST_PASSWORD GRADIFY_TEST_EMAIL_B GRADIFY_TEST_PASSWORD_B
```

1. **Project and tables:** `node scripts/verify-backend.mjs`. It lists each migration's tables as present or
   missing, and confirms signed-out visitors can't read learner data.
2. **Run the missing migrations** (only after Claude confirms which): SQL Editor → New query → paste one file →
   Run, in date order. Then re-run step 1.
3. **Accounts and saving:** the same command, now with the test learners in the environment. It checks:
   A signs in; A's profile was created by the sign-up trigger; XP can't be set from the browser; progress and an
   answer save; **progress reads back in a second, independent session** (the cross-device check); B signs in;
   B can't read, change or delete A's rows in every learner table; signed-out visitors can't either. Everything
   it writes is deleted at the end.
4. **Paste the output to Claude.** It contains no keys or passwords, only ✓/✗ lines.
5. Close the terminal window when done, so the exported values go with it.

**What it doesn't check:** sign-*up* through the real email link (the test learners are created in the dashboard).
That's checked by hand in A5 step 3.

### A5. Going live (after A4 passes)

1. Claude commits the URL and publishable key to `gradify.config.js` on a branch; CI's secret checks run; you
   approve the merge to `main`. The site switches from this-device mode to accounts within a few minutes.
2. You run `node scripts/verify-backend.mjs --site https://getgradify.com --write` (same prompts), which also
   confirms the live config matches and records the result in `docs/BACKEND-STATUS.md`.
3. By hand: sign up at getgradify.com/app.html with a real email link on your phone and your laptop; finish a
   lesson on one, reload the other, see it; open getgradify.com/status.html on both.
4. Gradify AI is a separate step (deploy the two functions and set `ANTHROPIC_API_KEY` in Edge Functions →
   Secrets, `docs/SETUP.md` §4), then re-run with `--ai`.

**Before A5 step 1:** fix the sync problem in Part B, because switching on accounts is what exposes it.

---

## Part B. Progress conflicts between devices (investigated)

### B1. How it works now

- Each device keeps the course state in `localStorage` and, when signed in, saves a copy to `course_progress`
  (one row per learner per course: `kit/course/course.js` `pushProgress` → `store.js` `saveCourseProgress`).
- The save is a **plain upsert: it replaces the whole row**. The page-close save (`beaconCourseProgress`) does the
  same.
- Merging (`kit/course/progress.js` `mergeProgress`) is well designed (completions are unions, the earliest time
  kept; best quiz scores win; the card reviewed more wins) but it **runs only when a course page loads**
  (`pullProgress`).
- Answers (`assessment_attempts`), cards and reviews are one row each with unique ids, so they never overwrite each
  other. **Only `course_progress` is at risk.**

### B2. The failure (reproduced)

With the real `mergeProgress`, simulating the row as an upsert:

1. Laptop and phone both have the course open.
2. Phone finishes lesson 1 and saves: the row holds {lesson 1}.
3. Laptop, which hasn't reloaded, finishes lesson 2 and saves its copy: the row now holds **{lesson 2} only**.
4. A fresh device (a new phone, a reinstalled app, a cleared browser) sees lesson 2 only.
5. Lesson 1 comes back only if the original phone reopens the course with its local storage intact.

So today nothing is lost *as long as the device that did the work comes back with its storage*. That isn't safe
to rely on: Safari on iPhone deletes a site's storage after 7 days without a visit (unless it's added to the
Home Screen), people clear browsers, and phones get replaced. A second problem: settings (goal, path, open
sections) pick the copy with the later `updated` time, which comes from each device's own clock.

### B3. Proposed fix (needs your approval)

**Never replace the row blindly: save only if nobody else has saved since you last read it.**

1. Migration: add `version bigint not null default 0` to `course_progress`, and a function
   `save_course_progress(subject, site, state, expected_version)` that updates the row only if its version still
   equals `expected_version` (incrementing it), and otherwise returns the current row, without saving. It runs as
   the signed-in learner, so row-level security still applies.
2. Clients (website now, apps later): on a conflict, merge the returned row into the device copy with
   `mergeProgress`, then save again. The account copy is then always the union of every device's work.
3. The page-close beacon sends the same function call, so it can't overwrite either. If it conflicts, the device
   copy syncs on the next visit, as now.
4. Use the server's time (`updated_at`), not the device clock, to decide whose settings win.
5. Test it: a test that runs the step-B2 sequence against PGlite (already a dev dependency) and requires both
   lessons in the row. The merge rules move into a shared fixtures file (`tests/fixtures/progress-merge.json`) that
   the Swift app's tests also run, so the website and the app can't merge differently.

Why not merge inside the database instead? The merge rules (cards, quizzes, workspace cases) would have to be
written a second time in SQL and kept in step with the JavaScript. Merging stays in one tested place per client,
with shared fixtures, and the database only guarantees nobody saves over a version they haven't seen.

---

## Part C. Lesson blocks for the apps (draft specification, v1)

Generated by `build-api.mjs` from the same notes files the website uses, so the apps never parse JavaScript.

### C1. Files

- `kit/api/v1/courses/<slug>/units/<unit>.json`, one per *written* unit.
- The course file (`courses/<slug>.json`) gains `unitFile: "/kit/api/v1/courses/<slug>/units/{unit}.json"`
  (an added field, so v1 stays compatible).
- Each unit file: `{ "api": 1, "course": "law", "unit": "u03", "hash": "<sha256 of the notes file>",
  "lessons": [ … ] }`. The app re-downloads a unit only when its `hash` changes.

### C2. A lesson

```json
{
  "id": "u03-05", "title": "Offer and acceptance", "module": "Formation",
  "level": "Introductory · Foundation",
  "lead": "What makes a valid offer, and when it's accepted.",
  "objectives": ["…"], "prerequisites": ["…"],
  "blocks": [ … ],
  "flashcards": [ … ], "questions": [ … ],
  "terms": [{ "term": "…", "definition": "…" }],
  "summary": ["…"], "sources": [ … ], "reading": ["…"], "evidence": [ … ]
}
```

Teaching content is in `blocks`, in page order. Practice (`flashcards`, `questions`) is kept separate, because the
app uses it in review and quizzes as well as on the lesson page.

### C3. Block types

| `type` | From tag | Fields |
|---|---|---|
| `heading` | `H:` | `text` |
| `paragraph` | `P:` or untagged line | `text` |
| `list` | consecutive `- ` lines | `items: [text]` |
| `equation` | `E:` | `tex`, `meaning?` |
| `example` | `X:` + `> ` lines | `text`, `steps: [text]` |
| `key` | `K:` | `text` |
| `pitfall` | `!:` | `text` |
| `safety` | `SAFE:` | `text` |
| `case` | `CASE:` | `name`, `facts`, `held`, `principle` |
| `statute` | `LAW:` | `provision`, `provides` |
| `drug` | `DRUG:` | `name`, `mechanism`, `uses`, `adverse`, `monitoring` |
| `interactive` | `IX:` | `id`, `web` (link to the lesson page): the app opens it on the web until it has a native version |

`text` fields keep the inline marks the website uses (`**bold**`, `*italic*`, `` `code` ``, `x^{2}`, `v_{0}`), as
one small documented markup, so the app renders them the same.

**Rule for the apps:** a block with a `type` the app doesn't know is skipped, never an error, so new block types
can be added without breaking installed apps. The course file lists `blockTypes` the content uses, so an app can
show "update the app to see everything in this lesson" when it meets one.

### C4. Questions and flashcards

- `flashcards`: `{ id, front, back, from? }`; `from` is `case`, `statute` or `drug` for the cards generated from those
  blocks.
- `questions`: `{ id, kind, level, objectives, prompt, … }` with `kind` one of `mcq` (`answer`, `distractors`,
  `why`), `truefalse`, `multi`, `order`, `match`, `short`, `numeric`. The field layout for each follows
  `kit/assess/model.js`, which already parses these; the export uses that parser rather than a new one.
- `id` is the permanent question id where the notes have one (`M2#law-u03-05-q2@1`), so an answer given in the app
  is recorded in `assessment_attempts` against the same question as on the website.

### C5. Checks

- CI regenerates the unit files and fails if they're out of date, as it does for the rest of `kit/api/`.
- A test checks every lesson in every written unit appears, every block has a known type, and every question id
  is unique within its course.
- Size: the notes total about 16 MB today; JSON will be somewhat larger. GitHub Pages compresses it.

---

## Decisions needed

1. Part A: confirm `ezlohntrnassgsbofcfc` is your project, and send the table list from A3.4.
2. Part B: approve the version-checked save (B3) before accounts are switched on.
3. Part C: approve the block types and file layout, or mark changes.
