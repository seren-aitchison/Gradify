# Blended learning, Classroom, Community, Institutions and Enterprise: Stage 0 audit

**Status:** Stage 0 of the programme in the *Blended Learning, Classroom, Community & Enterprise* specification (v1.0, 19 November 2026). This is an audit and design only. Nothing is applied, deployed or changed in the product. The proposed schema is [`proposed/classroom_v1.sql`](proposed/classroom_v1.sql), outside `supabase/migrations/`, so no tool runs it.

**Scope:** this repository (`seren-aitchison/Gradify`) at `main` (`fb22166`), plus Gradify Notes in PR #116, which isn't merged yet. The `gradify-apple` repository isn't accessible from this session, so §2.13 describes its boundary only from this repository's side.

**Confirmed product decisions** (from the specification):
- universal scope, covering every education sector and employers;
- community integrated with classrooms, courses and independent learning;
- both independent-teacher and organisation-managed accounts;
- one learning engine for everything.

Contents:
1. Corrections to the specification's assumptions
2. What exists: the 13 audit questions
3. Reuse, extend, create
4. Findings that change the plan
5. Proposed architecture for Stages 1–4
6. Permissions and security
7. Database implications and migration policy
8. Tests to establish
9. Decisions needed before Stage 1
10. Stage plan for the first release (Classroom 1.0)

---

## 1. Corrections to the specification's assumptions

| The specification says | What the repository shows |
|---|---|
| "The existing test suite previously passed 413 tests" | `main` has **875** tests passing (`npm test`, `node:test`), and Notes (#116) brings it to 896. They include real-PostgreSQL tests through `@electric-sql/pglite` (`scripts/pg-rehearsal.mjs`) and Playwright checks |
| "Supabase is the connected backend" | **Correct.** *(This audit first said the opposite, from the out-of-date top section of `docs/BACKEND-STATUS.md`; corrected 19 November.)* `gradify.config.js` on `main` points at production project **`ezlohntrnassgsbofcfc`** with its publishable key, which is public by design. `docs/BACKEND-LOG.md` records the migrations, backups and row-level security audits up to the goals release on 10 November, when there were 7 accounts. **Migrations `20261113…` to `20261119…` have no record of being applied**, and `20261113120000_client_privileges.sql` says it isn't. **There's no staging project** (D1) |
| The framework is uncertain (Next.js, static…) | **Static ES modules, no framework, no build step**, served by GitHub Pages from `main` (§2.1) |
| `study-pack` and `course-tutor` not yet deployed | Still unverified (`docs/BACKEND-STATUS.md`, `docs/AI-TUTOR.md`). The code and tests are in the repository |

## 2. What exists: the 13 audit questions

**2.1 Frontend and entry points.**
- Plain HTML pages with ES modules and CSS, and no bundler. Push to `main` and it's live (`CNAME` is getgradify.com).
- There are 33 sub-sites in folders (`/medgradify/`, `/lawgradify/` …). Each has an `app.html`, and they all share `kit/`.
- The app is `app.html` → `kit/app/main.js`. Courses live at `/<site>/course/`, run by `kit/course/course.js`.
- `sw.js` is a network-first service worker with an explicit `SHELL` list, so it works offline.

**2.2 Routing and navigation.**
- Hash routes (`#/today`, `#/notes`, …). `route()` in `kit/app/main.js` splits the hash on `/` and passes the first argument on.
- Navigation is one fixed array, `NAV`, of 15 LifeOS sections, plus a 4-item phone tab bar (`TABS`). Locked sections come from `ACCESS` (`kit/data/plan.js`).
- **Nothing is role-aware.** A workspace switcher and contextual navigation (spec §16) need `NAV` to become data, chosen per context.

**2.3 Authentication.**
- Supabase Auth with an email link, and Google when enabled (`CloudStore`, `kit/data/store.js`).
- A `LocalStore` with the same API works signed out, and data moves into the account on first sign-in.
- One account works across all sites, because everything is on getgradify.com.
- There are no SSO, SAML or SCIM hooks.

**2.4 Database schema.** There are 23 migrations, and every table has row-level security. The main groups:

| Domain | Tables |
|---|---|
| Learning | `profiles` (with `learner jsonb`), `documents`, `packs`, `cards`, `reviews`, `course_progress` (jsonb per course), `assessment_attempts` (one row per answer: `marking_method auto/self/human/ai-assisted`, `marking_status final/provisional`), `learning_events` (append-only ledger, fixed event list), `goals`, `plan_blocks`, `revalidation_entries` |
| AI and billing | `tutor_usage`, `subscriptions`, `billing_events`, `billing_settings`, `ai_limits`, `ai_settings`, `ai_prices`, `ai_plan_caps`, `ai_feature_models`, `ai_testers`, `ai_admins`, `ai_cache`, `free_usage`, `study_devices` |
| Community | `community_profiles`, `follows`, `study_groups`, `group_members`, `chat_messages`, `chat_reports`, `help_requests` |
| Other | `tool_items`, `tool_images`, `push_subscriptions`, `page_events`, `waitlist`, Sport's `workouts` / `body_checkins` / `fitness_tests` |

There are **no** organisation, membership, role, classroom, assignment, submission, grade, notification or audit tables.

**2.5 Row-level security.**
- Almost every learner table is **owner-only** (`user_id = auth.uid()`).
- Study tables also carry restrictive "active device" policies through `may_write()`, which enforces Free's one-device rule.
- Community uses `security definer` functions to show others only selected fields (`community_directory`, `my_friends`, `is_group_member`).
- `docs/PRODUCTION-READINESS.md` and `20261113120000_client_privileges.sql` (a proposal, not yet applied) tighten the grants.
- **Consequence:** today no one can read another person's learning data. That's the right default. Classroom has to add *narrow, scoped* exceptions (§6), not loosen it.

**2.6 Lessons and courses.**
- There are 34 courses in `kit/courses/<slug>/`: `course.js`, `syllabus.js`, `ids.js` (**permanent lesson ids**, never reused) and `notes/uNN.js`.
- Content is **static files, not database rows**. `kit/api/v1/` publishes generated JSON (catalogue, courses, lessons) for the Apple apps.
- This already gives the specification's "one canonical resource referenced by id": `lesson:biology/u01-03` needs no content table.

**2.7 Quizzes, flashcards and exams.**
- `kit/assess/` holds the question model and text format, with 8 types:
  - single best answer and multiple choice
  - true or false
  - choose all that apply
  - put in order
  - match the pairs
  - short answer
  - calculation
- Questions have permanent ids, versions, difficulty and objectives, and question banks per lesson.
- `exam.js` builds and marks timed exams from formats. `attempts.js` has the attempt model and analysis.
- Flashcards come from notes, study packs, Tools decks and Notes (#116), all scheduled with FSRS (`kit/learning/srs.js`).
- **Every course question's answer is in its public notes file** (`Q: … | answer`, `M2#id: … | right | wrong …`).

**2.8 Learner progress.**
- `course_progress` (one jsonb per course: done, cards, attempts), `assessment_attempts`, `reviews` and `learning_events`.
- These feed the Mastery Engine (`kit/learning/mastery.js`), six-dimension mastery and Intelligence (`kit/intel/`).
- All of it is written by the learner's own browser. XP is too (`docs/GRADIFY_ARCHITECTURE.md` notes it can be inflated).

**2.9 AI.**
- Two Edge Functions, `study-pack` and `course-tutor` (12 modes), share `_shared/ai.js`, which handles the claim, cache, Claude call, settle step and allowances.
- **Allowances and spending caps are per user.** There's no organisation-level allowance or pooled spend.
- The server reads lesson notes by id (`canon.js`) and ignores any notes text sent from the browser. Nothing a learner says to the tutor is stored.

**2.10 Design system.**
- `kit/styles/base.css` (tokens, glass, buttons), `components.css` (panels, rings, charts, chips), `kit/app/app.css`, and themes in `docs/THEMES.md`.
- Shared helpers: `icon()`, glass 3D icons, `toast`, the `.panel.glass` pattern and the `deck-head` page header.
- New environments should use these. Notes (#116) shows the pattern: one stylesheet loaded on demand.

**2.11 Testing.** `node --test tests/*.mjs` covers:
- unit tests;
- **database tests on real PostgreSQL with Supabase's default privileges** (`tests/*-db.test.mjs`, `tests/goals.test.mjs`);
- a migration rehearsal with a statement allowlist and checks that existing values are unchanged;
- Playwright journeys in `tests/play/` and `scripts/check-*.cjs`.

This harness is exactly what the specification's row-level security and permission tests need.

**2.12 Deployment.**
- The site deploys from `main` through GitHub Pages. Edge Functions deploy through Supabase.
- Migrations are run by `scripts/supabase-admin.mjs`, which has rehearsal and backup steps (`docs/RECOVERY.md`), with owner approval.
- There's no staging project in the repository.

**2.13 The Apple app boundary.**
- From this side, the apps read `kit/api/v1/*.json` and the courses' notes files as text, and use the same Supabase tables (`docs/APP-API.md`). The API is versioned: fields are only added within a version.
- New Classroom features should be **tables plus RPCs** that both clients call, never logic that lives only in the website.
- *Not verified:* the `gradify-apple` code itself, because it's outside this session's access.

## 3. Reuse, extend, create

| Need (spec) | Reuse as it is | Extend | Create |
|---|---|---|---|
| One account, many roles | Supabase Auth, `profiles` | `profiles.learner` (age band, §4.2) | memberships per context (orgs, classrooms) |
| Content references | permanent lesson ids, question ids, `kit/api/v1` | a `content_ref` string scheme (`lesson:`, `quiz:`, `deck:`, `notes:`, `lab:`) | teacher and organisation content tables, private (§5.3) |
| Assignment activities | lessons, labs, flashcards, `kit/assess` question types, `exam.js` | the course runner reports completion of *assigned* items | assignments, items, targets, submissions |
| Marking | `marking_method` / `marking_status` vocabulary, `tutor.js` `mark` mode (rubric feedback, labelled provisional) | rubric reuse; AI suggestions saved as provisional | grades, feedback, rubrics tables, a human-confirm step |
| Analytics | Mastery Engine, `analyse(attempts)`, `learning_events` | events gain `assignment_id` context | classroom-scoped evidence (§6.3), not teacher access to raw learner tables |
| Community | `study_groups`, `group_members`, `chat_messages`, `chat_reports`, `community_profiles` | scopes (classroom, course, organisation), moderator roles, threads | discussions with threads, moderation actions, audit |
| Notifications | `push_subscriptions` + `push-send`, `kit/app/notify-views.js` | — | `notifications` (in-app) and preferences; email needs a provider (none exists) |
| Calendar and blended schedule | `plan_blocks`, `kit/lifeos/calendar.js`, iCal import (`kit/intel/ical.js`) | classroom events shown in the learner's calendar | `class_events` |
| Plans and entitlements | `subscriptions`, `plan_of()`, `may_write()`, `ai_limits` | organisation-sponsored access in `plan_of()` | organisation subscriptions and seats |
| Notes (#116) | `kb` references and portals | a `[[lesson:…]]` reference (Notes review §4); notes shared with a classroom | — |

## 4. Findings that change the plan

These come from the code, not from the specification. Each one needs a decision or a design response before Stage 1.

**F1. Production is live, its migration history is behind the repository, and there's no staging project** *(corrected 19 November)*. Classroom is the first feature that *only* works with accounts, and it would be tried against real learners' data if there were nowhere else to test it. Before Classroom 1.0:
- a **staging** project has to exist, with synthetic accounts only;
- the live migration history has to be read (with a project-scoped credential, by the owner) and compared with the repository's 23 migrations plus #116's;
- `docs/BACKEND-STATUS.md` has to be updated: its top section still says the site isn't connected.

**F2. Course answer keys are public.** Graded classroom assessments can't use course questions as they are:
- anyone can read the answer in the published notes file;
- a client-marked score can be forged, as XP can today.

So:
- *Formative* use of course quizzes, where completion and score are practice evidence, is fine. Label it "self-marked practice".
- *Graded* quizzes and exams need **server-held question banks** whose answer fields only teachers can read, and **marking in the database or an Edge Function** (`submit_answer` RPC → `marking_method = 'auto'`, server-side).

This is the single biggest design consequence for Stage 3–4.

**F3. All learner records are written by the learner.** A teacher's view of "completed the lesson" or "studied 30 flashcards" is self-reported by the student's browser. That's acceptable for homework completion, as long as it's labelled. It must never be presented as proctored evidence. Only server-marked items (F2) and teacher-marked submissions are authoritative grades.

**F4. The existing community mixes adults and minors with weak safeguards.** Today:
- `over_13` is a self-declared checkbox;
- subject chat rooms are open to every community member;
- learners can advertise **paid tutoring** (`is_tutor`, `tutor_rate`) and receive `help_requests` from strangers;
- moderation is "hidden after 3 reports", with no moderator role, no audit trail and no appeals.

That isn't safe to connect to school classrooms. Recommendation:
- classroom and organisation communities are **separate scopes** with teacher or organisation moderators;
- learners under 18 in an organisation get organisation-scoped community only by default, with no access to the public tutor directory;
- a safeguarding review of the existing tutor and help features happens before schools are onboarded.

See decision D3.

**F5. Under-13s.** The UK Children's Code and GDPR Article 8 apply. Recommendation for Classroom 1.0:
- **independent teachers can enrol learners aged 13 and over only**;
- under-13s only through a **verified organisation** that acts as controller, has a DPIA and has a data-processing agreement in place (Stage 6).

This needs an age band on the profile, and an organisation flag for whether it manages under-13 accounts. See D2.

**F6. Allowances, the one-device rule and plans are per user.** A teacher on Free can't mark from both laptop and phone (`may_write()`), and AI marking assistance would draw on the teacher's personal tutor allowance. Organisations need:
- seats and sponsored access (`plan_of()` returns the organisation's plan for sponsored members);
- pooled AI allowances, so a university can give students access without each person subscribing (spec §20).

**F7. No audit trail, notification store, email sender or Realtime use exists.** All four are platform pieces Stage 1 has to build: audit log, in-app notifications, email through a provider chosen in D6, and narrowly scoped Realtime channels.

**F8. Content in files, not tables, is a strength.** It keeps one canonical copy of every lesson. Organisation-private content needs its own tables with row-level security (§5.3), and must never be published into the public `kit/` tree.

## 5. Proposed architecture for Stages 1–4

### 5.1 Identity and context

- **One `auth.users` / `profiles` row per person**, as now. **No global role field** (spec §2). Platform staff stay in the existing `ai_admins`-style allowlists.
- **Contexts** a person can act in:
  - *Personal*: what exists now;
  - an **organisation**, through `org_members` (role per organisation unit);
  - an **independent classroom**, through `classroom_members` (owner, teacher, assistant or student).
- The app's workspace switcher lists these. Switching changes the navigation (`NAV` chosen per context) and the `context` passed to RPCs. It never changes the account.

### 5.2 Organisations (flexible, not school-shaped)

- `organisations`:
  - `kind` from the specification's list;
  - `verified_at`;
  - `manages_minors`;
  - `sponsor_plan`;
  - settings in jsonb (configuration only).
- `org_units`: a tree (`parent_id`) with a free-text `kind` label (faculty, department, year group, team). **No school-specific columns.**
- `org_members (org, user, unit nullable, role)`.
- Roles map to **permissions** through `role_permissions (role, permission)`. Seed roles: owner, admin, unit_head, academic_lead, teacher, assistant, student, guardian, auditor. Permissions are strings like `classroom.create`, `assignment.publish`, `grade.release`, `members.manage`, `reports.read`.
- One check function, `has_perm(p_perm text, p_org uuid, p_unit uuid default null)`, walks the unit tree. Row-level security policies and RPCs call it, so permissions are **checked in the database, in context**.
- Invitations:
  - `org_invitations` stores a hashed token, with expiry, maximum uses, revocation, the role it grants and who created it;
  - redeeming goes through `accept_invitation(token)` (a `security definer` function, rate-limited).

### 5.3 Content references

- `content_ref` is a text field that always means **pointing at** content, never copying it:
  - `lesson:<course>/<lesson id>`
  - `quiz:<course>/<lesson id>` (that lesson's questions)
  - `lab:<course>/<lab id>`
  - `deck:<tool deck id>`
  - `notes:<rem id>` (a shared snapshot)
  - `bank:<question bank id>`
  - `res:<resource id>`
  - `url:<https…>`
- Private content goes in `content_items`: owner (user or organisation), visibility, version, licence and source attribution, publication state. It's for teacher- and organisation-authored lessons and resources.
- `question_banks` and `bank_questions` hold the server-side questions (F2). Answer fields sit in a column only users with permission to manage the bank can read; students get questions through `bank_paper(assignment item)`, which leaves the answers out.

### 5.4 Classrooms

- `classrooms`:
  - `org_id`, **nullable**, for independent teachers;
  - `unit_id`;
  - name, subject, level, description, dates, visibility, enrolment method;
  - `course_ref`, the linked Gradify course;
  - `min_age_band`;
  - `archived_at`.
- `classroom_members (classroom, user, role: owner | teacher | assistant | student, status: active | suspended | removed, joined_at)`.
- `classroom_codes`:
  - stores a **hash** of the code;
  - has an expiry, a maximum number of uses and a `revoked_at`;
  - is joined through `join_classroom(code)`, which is rate-limited per user and per IP through the existing `ai`-style limiter pattern, and checks the age band (F5).
- `classroom_groups` and `classroom_group_members` (subgroups).
- `announcements` (classroom, author, body, `published_at`).
- `class_events` (classroom, kind, `starts_at`, `ends_at`, place: `in_person` | `online` | `gradify`, `content_ref`, `assignment_id`) for the blended schedule (spec §17).

### 5.5 Assignments (one engine for every activity)

- `assignments`:
  - classroom, title, description;
  - `status: draft | scheduled | published | closed | archived`;
  - `opens_at`, `due_at`, `closes_at`, `late_policy`;
  - `current_version`.
- `assignment_versions (assignment, version, snapshot jsonb, published_at, published_by)`: **immutable once published**. A submission records the version it was made against, so editing never rewrites a submitted attempt (spec §4.5).
- `assignment_items`:
  - assignment, version, position;
  - `kind` (lesson, flashcards, quiz, exam, written, file, lab, pathway, discussion, external, custom);
  - `content_ref`;
  - `required`;
  - `requirements jsonb` (pass mark, card count, word limit, time limit, attempts), checked against a schema per kind;
  - `marking: auto_server | self | teacher`;
  - `rubric_id`.
- `assignment_targets (assignment, classroom | group | user)` and `assignment_extensions (assignment, user, due_at, reason, granted_by)`.
- **State changes only go through RPCs:** `publish_assignment`, `schedule_assignment`, `close_assignment`, `reopen_for(user)` and `extend_for(user)`. Each runs in **one transaction**, checks `has_perm`, writes the version snapshot and the targets, and writes the audit row. Clients get no `update` privilege on `status` columns.

### 5.6 Submissions, marking and grades

- `submissions (assignment, student, version, status: not_started | in_progress | submitted | under_review | returned | resubmitted | graded, submitted_at, late)`.
- `submission_items` holds the progress of each item: `evidence`, `source: self_reported | server_marked | teacher`, score, `completed_at` (F3).
- `submission_attempts` keeps every attempt at a written, file or exam item. Rows are append-only.
- `submission_files` are entries in a private Storage bucket: `<org or classroom>/<assignment>/<student>/…`, with signed URLs and malware scanning before teachers can open them (spec §13.5; an owner action, as in the Notes review §6).
- `rubrics` and `rubric_criteria`, shared within an organisation or by a teacher.
- `feedback (submission, item, author, kind: teacher | ai_suggestion, body, rubric_scores jsonb, released_at)`. AI suggestions are **never released** until a teacher accepts or edits them, and that change is recorded.
- `grades (submission, item nullable, score, max, method: auto_server | teacher | teacher_from_ai, graded_by, released_at)`.
- `return_submission` and `release_grades` are RPCs. Students see feedback and grades only once they're released.
- `review_requests`: a student can ask for marking to be reviewed (spec §10).

### 5.7 Classroom analytics without exposing personal learning

- Teachers read **only** classroom-scoped records: `submissions`, `submission_items`, `grades`, `feedback`, and events tagged with an assignment.
- A learner's personal tables (`course_progress`, `reviews`, `cards`, `assessment_attempts`, `learning_events`, notes) stay **owner-only**.
- When a student works on an assigned item, the browser writes that item's evidence to `submission_items` (self-reported) or calls the server-marking RPC. The Mastery Engine runs on the student's side for the student's own view.
- For the teacher, a `class_insights(classroom)` RPC aggregates *only* assignment evidence: misconceptions on assigned questions, completion, and students below a threshold. Expensive aggregates become materialised summaries only when real usage justifies them (spec §21).

### 5.8 Community (design now, build in Stage 5)

- Generalise rather than replace:
  - `communities (scope: public | course | classroom | organisation, scope_id, min_age_band, moderation policy)`;
  - existing `study_groups` become `scope = 'group'` communities through a compatibility view, keeping their ids.
- `discussions` and `posts` with threads, accepted answers, pins, reactions and reports.
- `moderation_actions` is append-only and scoped to a community. `community_roles` sets moderators per scope.
- The subject chat and group chat rules carry over: link, email and phone filters and rate limits.

### 5.9 Platform services

- `audit_log`:
  - append-only, holding actor, context, action, target, a before/after hash and the time;
  - written **only** by `security definer` RPCs;
  - readable by `has_perm('audit.read')` within the organisation.
- `notifications (user, kind, context, payload, read_at)`:
  - with a dedupe key per `(user, kind, target)`, so one event never sends twice;
  - `notification_prefs`;
  - delivered in-app, by push (the existing `push-send`), and by email (D6).
- Realtime: narrowly scoped channels per classroom (announcements, submission status) and per discussion. Never a stream of all events (spec §15).

## 6. Permissions and security

1. **Default deny.** Every new table gets row-level security and an explicit `revoke all from anon`. Grants are checked as well as policies, following Supabase's guidance and the pattern in #116's `kb_shares` fix.
2. **Membership-scoped policies** through `has_perm()` and `is_classroom_role(classroom, roles[])`. These are `security definer`, `stable`, with a fixed `search_path`, and are tested on their own.
3. **No access by organisation membership alone.** Being an organisation admin grants `members.manage`, not `submissions.read`. Reading submissions needs a teacher role on that classroom, or an explicit organisation permission that's audited.
4. **Writes through RPCs** for every workflow transition, grade, role change and publication. Clients get no `update` on status or role columns.
5. **Removed or suspended members** lose access at once: policies check `status = 'active'`.
6. **Expired, revoked and over-used codes and invitations** are refused inside the RPC.
7. **Storage** uses the same boundaries: bucket policies call the same functions (§5.6).
8. **Secrets:** only the public anon key in the client. AI keys and integration credentials stay server-side. No tokens in logs, as now.
9. **AI acts as the person asking it.** Edge Functions call the database with the caller's token, never with the service role for reads, so a teacher's AI analysis sees only what that teacher can see.

## 7. Database implications and migration policy

- **Additive only.** All of this is new tables, new functions and an extended `plan_of()`. No existing table's data changes. The community generalisation is a *view* over the existing tables first; any move of data is a later, separately approved step.
- **One domain per migration**, so each can be reviewed and rolled back on its own:
  1. organisations and permissions
  2. classrooms
  3. assignments
  4. submissions and grades
  5. platform (audit and notifications)
- **Each migration passes** the existing rehearsal (`scripts/pg-rehearsal.mjs`: statement allowlist, existing values unchanged) and its own row-level security test file **before** it's proposed.
- **Nothing is applied to production** without the owner's approval, a check of the live migration history and a verified backup (`docs/RECOVERY.md`). A staging Supabase project is strongly recommended before Stage 2 (D1).
- New migrations get timestamps after the last one in the live history, checked at the time of proposal.

## 8. Tests to establish

Every test below runs in the existing `node --test` + pglite harness. Each is a new `tests/<domain>-db.test.mjs`, acting as signed out, student A, student B, teacher of class X, teacher of class Y, organisation admin and a removed member.

- **Isolation:**
  - signed-out users read nothing;
  - student A can't read B's submissions, files or grades;
  - the teacher of X can't read Y;
  - organisation 1 can't read organisation 2;
  - an organisation admin can't read submissions without `submissions.read`;
  - personal learner tables stay owner-only after every migration.
- **Membership:**
  - a removed or suspended member loses access at once;
  - expired, revoked and over-used codes are refused;
  - joining is rate-limited;
  - the age band is enforced (F5).
- **Workflow:**
  - draft and scheduled assignments are invisible to students;
  - publishing is atomic (version, targets and audit row together);
  - editing after a submission doesn't change it;
  - late submissions are flagged;
  - an extension applies to one student only;
  - reopening keeps earlier attempts;
  - grades and feedback are invisible until released;
  - an AI suggestion can't be released without a teacher.
- **Server marking (F2):**
  - students can't read answer columns;
  - `submit_answer` marks on the server and ignores any score the client sends.
- **Audit:** every RPC writes exactly one audit row; the audit log can't be changed by any client.
- **Notifications:** one event sends one notification (dedupe).
- **Regression:** the existing tests (875 on `main`, 896 with #116) keep passing at every stage.
- **End to end (Playwright):** the specification's 15-step scenario (§23), run against a local Supabase.

## 9. Decisions needed before Stage 1

| # | Decision | Recommendation |
|---|---|---|
| D1 | Connect a Supabase project, and add a **staging** project for this programme | Yes, both, before Stage 2. Classroom can't be tried without them (F1) |
| D2 | Under-13 learners | Independent classrooms 13+ only. Under-13s only through verified organisations with a DPIA and a data-processing agreement, from Stage 6 (F5) |
| D3 | The existing public community (open subject chats, paid tutor listings, help requests from strangers) | A safeguarding review before schools join. Hide the tutor directory and public subject chats from under-18 organisation members by default (F4) |
| D4 | Graded assessments | Server-held question banks and server marking for anything graded. Course quizzes stay formative, labelled self-marked (F2) |
| D5 | Organisation-sponsored access and pooled AI allowances | Design it in Stage 1 (`plan_of()` and organisation allowances). Billing integration later (F6) |
| D6 | An email provider for invitations and notifications | Pick one (for example Resend or Postmark through an Edge Function). Until then: invitation links and codes, push and in-app notifications only |
| D7 | Data roles | Gradify acts as **processor** for organisation-managed data and **controller** for personal accounts. Needs a DPA template and updates to the privacy page before the first school |
| D8 | Multi-agent development (spec §24) | Fine within the stage plan, but **one owner for the shared schema and `has_perm()`**: domain migrations land in order, never in parallel |

## 9a. Decisions made (19 November 2026)

| # | Decision |
|---|---|
| D1 | **Separate production and staging projects.** Production is `ezlohntrnassgsbofcfc` (from `gradify.config.js` and `docs/BACKEND-LOG.md`). Staging is to be created by the owner, with synthetic accounts only. No production learner data in development, no automatic promotion of migrations, separate credentials, and explicit approval for any production change |
| D2 | **Independent classrooms are 13+.** Under-13s only through verified organisations, with a DPIA, a data-processing agreement and safeguarding controls. Designed for, not switched on |
| D3 | **A safeguarding review of the existing community is a prerequisite for school access**, covering: age declarations, profiles, paid tutoring listings, adult/minor contact, messaging, moderation, suspension, visibility, retention, and guardian and organisation controls. Assess the effect on current users before removing anything |
| D4 | **Anything that contributes to an official grade is server-authoritative:** server-held banks, protected keys, server scoring, attempt records, versions, tamper-resistant submissions, teacher-released grades and an audit trail. Public quizzes stay practice |
| D5 | **Entitlements in the foundations:** personal and organisation subscriptions, sponsored seats, individual and shared organisation AI allowances, feature entitlements and usage records. Billing later |
| D6 | **Resend**, behind a server-side, provider-independent `EmailService`. Never from the browser |
| D7 | **Controller or processor arrangements are set per processing activity and organisation**, not as a blanket rule. Access, retention and deletion are configurable by context. Legal review before any institutional deployment |
| D8 | **One accountable owner** (Lead / Architect) for the shared schema, migrations, permissions and row-level security. Other agents propose |
| D9 | **Every learning record carries its evidence class:** `self_reported`, `client_recorded`, `server_assessed`, `teacher_assessed`, `formally_verified`. Self-reported activity is never shown as a verified result |
| D10 | **Personal learning stays personal.** Organisation membership never exposes unrelated personal history, notes, independent study or conversations. Access is scoped to authorised organisational activity |

## 10. Stage plan for the first release (Classroom 1.0)

Each step stands alone: its own branch, its own reviewable migration, its own tests. **Nothing applied, deployed or merged without approval.**

| Stage | Delivers | Migration |
|---|---|---|
| 1a | Permissions core: `organisations`, `org_units`, `org_members`, `role_permissions`, `has_perm()`, invitations, `audit_log`, `notifications`; the workspace switcher and contextual `NAV` in the app | 1 (identity and organisations) + 1 (platform) |
| 1b | Independent teacher mode: "Become a teacher" from Settings, using the same account | none |
| 2 | Classrooms: create (guided flow), codes and links, co-teachers and assistants, students, subgroups, announcements, class schedule; the teacher dashboard (overview, classrooms, students, calendar); "My classes" for students | 1 (classrooms) |
| 3 | The assignment engine: builder (lessons, labs, flashcards, course quizzes as formative, written work, external links), versions, targets, extensions, the student workspace, self-reported evidence, written submissions | 1 (assignments) |
| 4 | Marking and gradebook: queue, rubrics, feedback, grades, release, review requests, server-held question banks and server-marked quizzes and exams, CSV export; AI rubric suggestions as provisional | 1 (submissions and grades) |
| Later | Stage 5 Community scopes; Stage 6 Institutions (curriculum editor, bulk and OneRoster CSV, guardians, under-13s); Stage 7 Enterprise (programmes, certificates); Stage 8 Teacher and Institution AI; Stage 9 LTI 1.3, OneRoster REST, SSO, SCIM | per stage |

The specification's 15-step scenario is the acceptance test for the end of Stage 4. Its step 13, the classroom discussion, uses the scoped community table from §5.8 in its simplest form: one teacher-moderated board per classroom.
