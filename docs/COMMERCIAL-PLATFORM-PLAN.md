# Gradify commercial platform plan

This is the audit and plan for turning Gradify into an international, commercial education platform. It covers Parts A–I of the owner's requirements of 6 November 2026.

It is a plan, not an implementation. **Nothing here has been built.** No access has been requested, no migrations written, and nothing deployed. It is for review, and every phase starts only on the owner's explicit approval.

**Status labels**
- **Working:** verified on the live site.
- **Built, not live-verified:** exists and passes automated tests, but has never run against real Supabase or payments.
- **Partial:** some of it exists.
- **Missing:** doesn't exist.
- **Decision:** needs a business or legal decision from the owner.

---

## 1. Audit: what the repository is today

Gradify is a static site on GitHub Pages: plain HTML and ES modules, with no build step. It uses a shared feature kit (`kit/`), 31 site folders and 9 courses. A Supabase backend (10 migrations and 2 Edge Functions) is written, but no project has been connected yet. CI tests every push and publishes only if the tests pass.

### Findings that shape the whole plan

| # | Finding | Why it matters |
|---|---|---|
| F1 | **The repository is public.** Every lesson's notes can be downloaded without signing in (checked: `raw.githubusercontent.com/…/law/notes/u01.js` returned HTTP 200) | Nothing in this repository can be a paid lesson. Premium content has to be held where access is checked: Supabase, behind row-level security. Lessons that are already public stay public in the git history whatever happens next. This is also an IP exposure: the content is "all rights reserved" (there's no licence file) but anyone can read and copy it |
| F2 | **There is no server of our own.** GitHub Pages serves files and nothing else | Entitlements, payments and premium content must be enforced in Supabase: row-level security, Edge Functions and private storage. They can't be enforced in the page, which is what the requirements ask for anyway |
| F3 | **Sign-in is passwordless**: email links and Google | "Password reset" doesn't apply unless passwords are added. Account recovery is access to your email. **Decision:** stay passwordless (recommended: simpler and safer) or add passwords |
| F4 | **The profile has no country, institution, year or membership.** It has goal, site, level (school / university / postgraduate / professional), exam date, daily minutes, name, and the set-up object | All of these are additions; nothing needs to be rebuilt |
| F5 | **All curricula are UK-framed**: GCSE, A level, SQE, NMC and MPharm | The international model has to be added around the existing courses, not inside them |
| F6 | **"University year 1" is the only university pathway in any course.** It exists in Biology, Chemistry, Physics, Psychology, Sociology, Maths and Nursing | Years 2, 3 and beyond are missing everywhere, as the owner said. Law and Pharmacy are organised by qualification (LLB, SQE, MPharm), not by year |
| F7 | **The site is dark-only.** It has about 1,350 hard-coded colours in CSS and about 360 in the interactives' canvas code | A real light theme means first moving every colour onto shared variables. That's a refactor, not a toggle |
| F8 | **No pricing, membership, entitlement or payment code exists.** The homepage says "Pricing hasn't been decided yet" | Everything in Part B is new |
| F9 | **Logging** is limited to anonymous usage counts (`page_events`), AI usage counts (`tutor_usage`) and the deployment evidence file | There are no operational, security or commercial event logs |
| F10 | **Supabase's official way to create users needs the service-role key** (the Auth Admin API) | This conflicts with "no service-role key". Section 2 (Part A) proposes keeping the key inside Supabase |
| F11 | **TechGradify (ForgeLab) has no course in this repository.** It's listed as "coming soon", described as "the future of TechGradify" | It can't be audited for content or simulations yet |
| F12 | **Physics has 1,308 written lessons and no registered interactives at all** | It's the biggest simulation gap |

---

## 2. What exists, what's partial, what's missing

### Part A: security and Supabase

| Requirement | State | Notes |
|---|---|---|
| Endpoint-by-endpoint token permission matrix | **Partial** | The operations the run uses are listed in `PRODUCTION-READINESS.md`, and preflight checks reach by status code. The matrix against Supabase's real scope names needs their documentation, which this environment can't reach. **Decision:** allow read-only access to `supabase.com` documentation |
| Official Auth Admin API for test accounts | **Missing** | Accounts are currently created by SQL. Proposed replacement: a short-lived, server-side helper function (below) |
| Empty-project preflight beyond learner tables | **Partial** | Preflight checks accounts and public tables. It needs storage buckets, extensions, schemas, functions, secrets, cron jobs, webhooks, publications, roles and grants, and auth settings |
| Separating schema changes from data changes | **Partial** | Checksums cover every pre-existing value, and the allowlist blocks data statements. Missing: a full schema diff (any change not declared by the migration stops the run), and a declared manifest for intentional data migrations |
| Backup restore rehearsals, allowlist, checksums, RLS matrix, forged-write tests | **Built, not live-verified** | Tested against real PostgreSQL (PGlite) in CI on every push |
| Distinguishing simulated, rehearsed and live evidence | **Built** | Four evidence levels in `PRODUCTION-READINESS.md`; live entries go only in `BACKEND-LOG.md` |

**Proposed test-account mechanism (F10).** Deploy a temporary Edge Function, `gradify-run-helper`, for the verification run only:
- It calls the official Auth Admin API to create and delete the two test users, using the service-role key that Supabase provides to functions. The key never leaves Supabase.
- It accepts calls only with a random one-run secret, set as a function secret by the run and deleted afterwards.
- It returns the generated passwords over TLS to the run's memory only.
- It is deleted at the end, and the run checks that the function and its secret are both gone.

This needs the token to be able to deploy and delete functions and write that one secret. **Decision:** accept that, or create the accounts yourself in the dashboard and run the live checks from your own computer.

### Parts B–I: the commercial platform

| Area | Exists | Partial | Missing |
|---|---|---|---|
| **Accounts** | One account model shared across every site (`kit/data/store.js`); email-link and Google sign-in; profile; cross-device course sync (built, not live-verified); sign-out; delete and export my data | Profile (no country, institution, year); onboarding in the app only, not on the sub-sites | Email verification flow and settings; account recovery page; registration as a first-class page ("Get started"); an account page on every sub-site; profile fields for country, institution, programme and year |
| **Membership** | None | None | Plans; entitlements; backend enforcement; tier-aware AI limits (today's limits are flat per mode); institutional tier |
| **Payments** | None | None | All of it |
| **Plans page** | None | The homepage has an FAQ entry saying pricing isn't decided | `plans.html` and every journey to it |
| **Homepage conversion** | Clear site directory, honest status badges, LifeOS tour, privacy link | "Open the Gradify app" button | Get started, See plans, Sign in in the navigation; the Free/Pro explanation |
| **Free vs Pro content** | Draft notices and status chips (a pattern to reuse) | None | Lesson tiers; the locked-content panel; server-side delivery of premium content (F1, F2) |
| **Country** | None | None | Suggestion, confirmation and storage; the three separate country concepts (see section 4) |
| **Curriculum structure** | Courses → schools → modules → lessons, with permanent IDs; paths; framework mappings (SQE, NMC, GPhC, maths specifications); a quality record per school | "University year 1" paths; UK pathways | An international model of country, system, qualification and year; Years 2 and beyond; school years; non-UK systems; institution-specific pathways |
| **Curriculum coverage matrix** | `ECOSYSTEM-STATUS.md`: per course, written versus planned | None | A matrix by country, level, qualification, year and subject |
| **Regional pricing** | None | None | All of it |
| **IP and licensing** | Vendor licence files (three.js, pdf.js, supabase-js); anatomy model attribution and licence notes; dated sources on every lesson | `privacy.html`, flagged as not legally reviewed | The IP register; chain-of-title documents; terms; cookie policy; subscription and refund terms; trademark search |
| **Logging and monitoring** | CI history; deployment gate; `BACKEND-LOG.md`; anonymous usage counts | AI usage counts | Operational, security and commercial event logs; request IDs; retention; alerts; an admin dashboard and admin role |
| **Light and dark themes** | Dark theme; reduce-motion and larger-text settings, applied site-wide from the shared profile | The settings mechanism the theme can reuse | Colour variables everywhere, the light palette, the first-visit prompt, account sync, theme-aware interactives |
| **£15 Pro positioning** | None | None | The plans page and copy, with every claim tied to a feature that's really live (section 5) |
| **Educational simulations** | 132 registered interactives with kind, model note and linked lessons (Biology 30, Chemistry 30, Psychology 34, Sociology 29, Law 2, Nursing 3, Pharmacy 1, Maths 2, Physics **0**); 3D anatomy viewers; chemistry tests pinned to known values | The metadata (no learning-outcome field, no accuracy-review record, dark-only colours) | The simulation coverage audit; Physics; per-lesson outcome mapping; light-theme support; a QA record per simulation |

---

## 3. Proposed database schema

All tables have row-level security. Learners can read their own rows, and **only server functions can write commercial records**. Payment card data is never stored; it stays with the payment provider.

### Identity and profile (extends `profiles`)

```
profiles (existing) + country_code text            -- the confirmed curriculum country (ISO 3166-1, e.g. GB, AU, US)
                    + country_source text          -- 'suggested' | 'confirmed'
                    + region_code text             -- e.g. GB-SCT, AU-NSW, US-CA, where the system differs by region
                    + education_level text         -- existing 'level', made consistent: school | university | postgraduate | professional
                    + programme_id uuid → programmes
                    + academic_year smallint
                    + theme text                   -- 'dark' | 'light' (also mirrored in the device copy)
```

### Curriculum (a graph, not a fixed hierarchy)

```
countries           (code pk, name, default_currency, active)
education_systems   (id, country_code, region_code null, name, kind 'school'|'university'|'professional', source_url, reviewed_at)
stages              (id, system_id, code, label, ordinal)              -- 'eng-ks4-y10', 'sco-s4', 'us-grade-10', 'uni-y2'
qualifications      (id, system_id, name, awarding_body, level, source_url)   -- GCSE (AQA), A level (OCR), Scottish Higher (SQA), SQE (SRA), MPharm
institutions        (id, country_code, name, kind)                     -- seeded only where institution pathways exist
programmes          (id, qualification_id, institution_id null, subject, name, years smallint)
pathways            (id, programme_id | qualification_id, stage_id, course_slug, title, status 'planned'|'written'|'reviewed', source_url)
pathway_items       (pathway_id, position, lesson_id | unit_id | module, outcome_ref, required bool)
lesson_variants     (lesson_id, system_id | country_code, notes_ref, reason)  -- e.g. Scots law, US drug names
```

- Content stays in the courses, under its permanent lesson IDs, and pathways **select and order** it. A UK and an Australian medicinal chemistry degree can share most lessons and differ where they really differ, through variants. Nothing is duplicated.
- Not every system fits one shape, so stages and qualifications are optional links, not required levels.

### Membership and entitlements

```
plans          (id pk 'free'|'pro'|'institutional', name, features jsonb, ai_limits jsonb, content_tier text, active)
prices         (id, plan_id, interval 'month'|'year', region text, currency, amount_minor int, provider, provider_price_id,
                active, effective_from)                       -- edited by admins; the payment provider charges what it holds
entitlements   (id, user_id, plan_id, source 'subscription'|'institution'|'grant', source_id, valid_from, valid_until)
                                                              -- written only by server functions; learners read their own
function has_entitlement(uid, plan) → boolean                 -- security definer; used by RLS policies and Edge Functions
content_access (course_slug, unit_id | lesson_id, tier 'free'|'pro')   -- which lessons are free (owner-configured rules)
lesson_content (course_slug, unit_id, version, body text)     -- premium notes, readable only when has_entitlement() allows (F1)
```

### Payments

These are kept separate from membership and progress.

```
billing_customers (user_id pk, provider, provider_customer_id unique, billing_country, created_at)
subscriptions     (id, user_id, provider, provider_subscription_id unique, plan_id, price_id, status, currency,
                   current_period_end, cancel_at_period_end, grace_until, billing_country, created_at, updated_at)
payments          (id, user_id, provider_invoice_id unique, amount_minor, currency, status, receipt_url, paid_at)  -- payment history
payment_events    (provider_event_id pk, type, received_at, processed_at, result, payload_sha256)              -- idempotency + audit
```

Learners can read their own `subscriptions` and `payments` rows; nobody writes them except the webhook function. Card data is never present.

### Institutions (designed now, launched later)

```
organizations (id, name, country_code, kind), organization_members (org_id, user_id, role), organization_seats (org_id, plan_id, seats, valid_until)
```

### Logging

```
ops_events      (id, at, request_id, source, level, kind, user_ref, detail jsonb)   -- append-only; admins only
security_events (id, at, request_id, kind, user_ref, actor_ref, detail jsonb)       -- append-only; admins only
commerce_events (id, at, request_id, kind, user_ref, subscription_id, detail jsonb) -- append-only; admins only
admins          (user_id pk, role 'owner'|'support'|'auditor', granted_by, granted_at)
```

---

## 4. Country and curriculum architecture

**Three separate countries**, never confused with each other:

| Concept | Source | Used for | Stored |
|---|---|---|---|
| **Curriculum country** | Suggested, then **confirmed by the learner** at registration; changeable in settings | Which pathways, education stages and terminology they see | `profiles.country_code` (+ region) |
| **Billing country** | The payment provider's checkout (card and address evidence, as tax rules need) | The price region, currency and tax | `billing_customers.billing_country`, set by the webhook only |
| **Current location** | — | Nothing; it only feeds the first suggestion | **Never stored** |

Changing the curriculum country changes what they study, **never their subscription**. A repriced subscription only happens as an explicit plan change through checkout.

**Country suggestion.** The recommended first version uses **no IP address at all**. It suggests from the browser's time zone and language: `Europe/London` + `en-GB` gives GB, and `Australia/Sydney` gives AU. It's private, has no provider to document, and is accurate enough for a suggestion the learner confirms.

If that isn't enough later, an Edge Function can look up the country from the request IP using an offline database, keep only the two-letter country code, and discard the IP. **Decision.** Either way, the suggestion is shown quietly in the registration form ("Studying in the United Kingdom? Change"), never as a pop-up.

**Launch priorities.**
- **School:** England first (Key Stage 3, GCSE Years 10–11, A level Years 12–13), mapped to the real specifications by exam board. Then Wales, Scotland and Northern Ireland, which are separate systems, not variants.
- **University:** UK degrees, Year 1 to the final year, for the existing subjects.
- **Professional:** the existing UK frameworks, which are UK-specific by nature: SQE (law), NMC (nursing), GPhC (pharmacy).
- A second country (Australia or the US) is added only once the UK structure is complete and reviewed. **Decision:** which country, and when.

Year mappings are researched from the official sources: DfE, CCEA, SQA, the Welsh Government, ACARA and state authorities, the Common Core and state standards, university module catalogues. **No placeholder lessons:** a year is "planned" until its real lessons are written and reviewed.

---

## 5. Payments and subscriptions

### Provider

This is a **decision**. Current fees and regional availability need checking on each provider's site.

| | Stripe (Billing, Checkout, Customer Portal, Stripe Tax) | A merchant of record (Paddle, Lemon Squeezy) |
|---|---|---|
| Who is legally the seller | Gradify Ltd | The provider resells to the customer |
| VAT, GST and sales tax | Stripe Tax calculates and collects; **Gradify Ltd registers and files** wherever thresholds are crossed (UK VAT, EU OSS, Australian GST…) | **The provider registers, collects and files** worldwide |
| Fees | Lower | Higher, because tax compliance is included |
| Local currency and regional prices | Yes: multiple currencies per price | Yes |
| Control and flexibility | Most | Less |

**Recommendation:** for a small UK company selling consumer subscriptions in several countries from the start, a **merchant of record removes the biggest compliance burden**. Choose Stripe if you'd rather keep control and pay lower fees, and you're prepared to handle tax registration with an accountant. The architecture is provider-neutral either way: a `provider` column, one webhook function per provider, one entitlement path.

### How it works

| Flow | Design |
|---|---|
| Checkout | The learner clicks Upgrade. An Edge Function checks they're signed in and asks the provider for a checkout session at the price for their billing region (server-side secret key). The provider hosts the card form. |
| Confirmation | The provider's **signed webhook** goes to a `billing-webhook` function. It verifies the signature, ignores repeats (`payment_events` is keyed by event ID), updates `subscriptions`, recomputes `entitlements`, and writes `commerce_events`. The success page only *waits* for the entitlement; it never grants one. |
| Renewal, failed payment, grace | Renewal events extend `valid_until`. A failed payment sets `past_due` and Pro continues until `grace_until` (configurable, for example 7 days), then lapses. |
| Cancel, upgrade, downgrade, card, invoices | The provider's customer portal; their webhooks update our records |
| Refunds | Issued in the provider's dashboard; the webhook records them and applies the refund policy to the entitlement (a **decision**: immediate or at period end) |
| Expiry | Entitlements end at `valid_until`; there is no client-side state to manipulate |

### Enforcement

- `has_entitlement()` is used by the RLS policy on `lesson_content`, so a free learner's request for a premium lesson returns nothing, whatever the page does.
- The AI functions read AI limits from the learner's plan, instead of today's flat limits.
- Local storage, URL changes and edited requests can't grant anything.

### Prices

`prices` is edited centrally, and every page reads one price source (`kit/commerce/prices.js`, backed by the table), so sub-sites can't show conflicting prices. **UK Pro: £15 a month.** Annual pricing and other regions are a **decision**, set by purchasing power and market, not exchange rates.

### Plans page claims

Every claim on the plans page must be **implemented and available to that learner on the day the page goes live**. Today:

| Proposed benefit | Can be advertised when |
|---|---|
| Your entire course, unlocked | The paywall and premium content delivery are live |
| A personal AI study tutor | The course tutor is live-verified (built, not yet live) |
| Revision that adapts to you | Live once accounts are (built: mastery, Revisit, plans) |
| Understand the difficult stuff visually | Already true for Biology, Chemistry, Psychology and Sociology; not for Physics yet |
| Study smarter: progress insights | Live once accounts are (built) |
| Synchronised across devices | After the live sync verification |
| A growing international library | Only once a non-UK curriculum exists. **Not yet** |

---

## 6. IP ownership and licensing audit

### First findings from the repository

These are to be confirmed in a full register.

| Component | Origin | Licence | Commercial use | Attribution | Action |
|---|---|---|---|---|---|
| Site code, the shared kit, course engine, labs, scripts | Written for Gradify (by the owner and Claude sessions on the owner's account) | None declared (all rights reserved by default) | — | — | Assign to Gradify Ltd; decide on public vs private repository (F1); add a proprietary notice |
| Lesson notes, questions, explanations | Written for Gradify, mostly AI-assisted, citing sources | None declared | — | — | Record the authorship method per school. **Legal advice needed** on UK copyright in AI-assisted works (CDPA s.9(3), computer-generated works) and on the AI provider's output terms. Check no source text is reproduced beyond quotation |
| three.js, OrbitControls | Third-party | MIT (`kit/vendor/three/LICENSE`) | Yes | Keep the licence notice | Record |
| pdf.js | Third-party | Apache-2.0 (`kit/vendor/pdfjs/LICENSE`) | Yes | Licence and notice | Record |
| supabase-js | Third-party | MIT | Yes | Licence notice | Record |
| Anatomy models (BodyParts3D, DBCLS, via open-anatomy-3d) | Third-party, modified | CC BY 4.0 (`kit/vendor/anatomy/`) | Yes | **Required**, as shown in the viewer | Check upstream terms; record the modifications |
| PGlite, bcryptjs (tests only) | Third-party | Check each package's licence | Expected yes | — | Record (not shipped to learners) |
| Geist fonts (Google Fonts) | Third-party | SIL Open Font License | Yes | — | Record |
| Cited sources (OpenStax CC BY 4.0, legislation, NMC/GPhC/SRA standards, NICE/BNF, ONS data) | Third-party | Various (CC BY, Open Government Licence, publishers' terms) | Reference and citation yes; reproduction depends | As each requires | Audit lessons and datasets for reproduced text and figures |
| The Gradify name, logo, site names, "LifeOS" | Original | — | — | — | Trademark search and filing (UK IPO; classes 9, 41, 42 are likely). "Gradify™" is used on the site, but no registration is recorded |
| getgradify.com | — | Domain registration | — | — | Confirm the registrant is Gradify Ltd |

### Chain of title for Gradify Ltd

- A founder's assignment to Gradify Ltd of everything made before incorporation and outside employment.
- Employee IP clauses, and **contractor assignment deeds** for any past or future contributors.
- The AI tools' terms of service as they stood when content was produced, kept on file.
- The register itself: component, author, date, method (human, AI-assisted, AI-generated, third-party), licence, evidence link and assignment status.

The register will keep **verified**, **assignment still required** and **third-party licensed** separate. **No ownership is claimed just because a document exists.**

### Legal documents to obtain or review (a solicitor is needed)

- website terms
- privacy policy (the draft exists)
- cookie policy (currently there are no cookies; local storage needs describing)
- membership and subscription terms
- refund and cancellation policy, including consumer cancellation rights
- educational and professional disclaimers (law, nursing and pharmacy already carry on-page notices)
- IP assignment agreements
- a data processing record and agreements with Supabase, the payment provider and Anthropic
- a trademark clearance search

---

## 7. Logging and monitoring

| Log | What | Where | Who can read it | Retention (**decision**) |
|---|---|---|---|---|
| Development and deployment | Commits, test results, CI runs, deployed versions, failed deploys, migration history | GitHub Actions (exists), the migration ledger, `BACKEND-LOG.md` (exists) | Repository maintainers | Indefinite |
| Operational | Auth, sync, AI, webhook, database and API failures | `ops_events`, written by Edge Functions; browser errors reported through a small function | Admins | 30–90 days |
| Security | Sign-ins and failures, permission and admin changes, refused access attempts (from function checks), account security events | `security_events` | Owner and auditor roles | About 1 year |
| Commercial | Subscription created, upgraded, downgraded, cancelled, renewed; payment failures; refunds | `commerce_events` | Owner and auditor roles | UK accounting records: **6 years** |

- **Tracing.** Every browser action that calls the backend gets an `x-request-id`. Functions log it, and pass it to the payment provider as metadata, so a failure can be followed across the browser, function, database and provider.
- **Redaction.** Functions log through one helper that drops passwords, tokens, keys, card data, notes text and email addresses. Users are recorded as a stable pseudonymous reference, not an email.
- **Append-only.** No update or delete policies exist on the log tables, for anyone.
- **Admin dashboard.** An `admin.html` built on the shared kit, which reads only through `security definer` functions that check the `admins` table. It shows recent failures by kind, the webhook backlog, subscription states and a request-ID search.
- **Alerts.** A scheduled function emails the owner a digest, plus an immediate alert on webhook failures and error spikes. Supabase's own log drains are plan-dependent (**decision**).

---

## 8. Phased plan

The order is changed from the brief in three places, each for a dependency:

1. **The public-repository decision (F1) comes first.** Paid content can't be designed until we know where it lives.
2. **The theme system moves into Phase 1.** Every page in Phases 2–5 (registration, account, plans, paywall, admin) would otherwise be built twice, once dark-only and again with variables.
3. **The curriculum schema precedes regional pricing display and content expansion,** since both hang off the confirmed country and pathway.

| Phase | Contents | Depends on | Needs Supabase? |
|---|---|---|---|
| **0. Decisions** (owner) | Repository visibility (F1); payment provider; passwordless or passwords; free-lesson rules; annual discount; first non-UK country; retention periods; test-account mechanism (F10); documentation access for Supabase and the payment provider | — | No |
| **1a. Production infrastructure** | The controlled deployment (already prepared), plus: the Part A additions (full preflight inventory, schema diff, data-change manifests, the Admin API helper); backups, recovery and restore rehearsal; live verification | 0 | **Yes** |
| **1b. Shared theme system** (in parallel with 1a) | Colour variables in all CSS and interactives; the designed light palette; no flash of the wrong theme; first-visit prompt; theme in the profile | — | No (sync to the account waits for 1a) |
| **2. Accounts and membership** | Registration, account and recovery pages on every site; profile fields; `plans`, `prices`, `entitlements`, `has_entitlement()`; tier-aware AI limits; premium content moved into `lesson_content` with RLS; the locked-content panel | 1a, 0 (F1, free rules) | **Yes** |
| **3. Payments** | Checkout, webhook, customer portal, payment history, grace and refund handling; the provider's test mode first, then live | 2, 0 (provider), legal terms drafted | **Yes**, plus the provider account |
| **4. International onboarding** | Country suggestion, confirmation and settings; the curriculum graph tables and seed data for the UK nations; pathway routing in courses; regional price display | 2 (profile), 3 (billing country) | **Yes** |
| **5. Conversion and UX** | Homepage (Get started, Explore courses, See plans, Sign in); `plans.html` with only live claims (section 5); Free/Pro markers in every course; consistent navigation and account menu | 2, 3, 1b | Partly (the page can be designed earlier and published only when claims are true) |
| **6. Compliance and operations** | IP register and chain-of-title checklist (can start now); licence audit (can start now); legal documents (solicitor); operational, security and commercial logs; alerts; admin dashboard | Logs need 1a; the register doesn't | Partly |
| **7. Curriculum expansion** (continuous, after 4) | The coverage matrix (can start now from the repository); University Years 2+ and school years in priority order; expert review queues | 4 (structure), subject experts | No for writing; yes for premium storage |
| **8. Educational simulations** (continuous) | The simulation coverage audit (can start now); learning outcome and QA fields on every interactive; theme-aware rendering (with 1b); Physics first, then the gaps the audit finds | 1b for theming | No |

### Can start now, without Supabase

- Phase 0 decisions
- 1b (themes)
- the IP register and licence audit
- the curriculum coverage matrix
- the simulation coverage audit
- the Part A tool changes
- the plans page design (not published)
- the Admin API helper function code

### Must wait for Supabase

- the 1a live run
- everything that stores or enforces entitlements, payments or profile fields
- logs

---

## 9. Anticipated migrations and their security implications

Each is applied through the controlled process: allowlist, rehearsal, checksums, and the isolation matrix extended to the new tables.

| Migration | Adds | Security implications |
|---|---|---|
| `learner_profile_v2` | Profile country, region, programme, year, theme | Learners can edit their own curriculum fields. Membership is never a profile column, so it can't be self-edited |
| `curriculum_graph` | Countries, systems, stages, qualifications, institutions, programmes, pathways, items, variants | Publicly readable reference data; writable by admins only |
| `membership` | Plans, prices, entitlements, `has_entitlement()`, content access | Entitlements readable by their owner and writable only by functions. `has_entitlement` is `security definer` with a fixed `search_path`. Prices are public, admin-writable |
| `premium_content` | `lesson_content` | RLS `using (tier = 'free' or has_entitlement(auth.uid(), 'pro'))`. The isolation matrix gains "a free learner can't read Pro content" and "a lapsed subscription loses access" |
| `billing` | Billing customers, subscriptions, payments, payment events | Never writable by learners. The webhook verifies the provider's signature, and event IDs make it idempotent |
| `institutions` | Organisations, members, seats | Org admins manage only their own organisation |
| `audit_logs` | Ops, security and commerce events; admins | Append-only; no learner read; admin read through checked functions; a redaction helper |
| `ai_limits_by_plan` | Usage counted against the plan's limits | Limits are read server-side; the client value is ignored |

---

## 10. Effort and critical path

These are rough estimates: focused engineering days, plus the owner's review time, excluding waiting on third parties. They will be refined after Phase 0.

| Work | Estimate | Waits on |
|---|---|---|
| Phase 0 decisions | — | The owner (1–2 sessions) |
| 1a: Part A additions and the live run | 3–5 days | Supabase project, token, approvals |
| 1b: theme system (about 1,700 colours, every component, interactives) | 6–10 days | — |
| 2: accounts and membership, including moving premium content | 8–12 days | 1a, decisions |
| 3: payments, test mode to live | 6–10 days | Provider account and verification, legal terms |
| 4: international onboarding and the curriculum graph, UK-nations seed | 6–9 days | 2, 3 |
| 5: homepage, plans page, paywall UI | 4–6 days | 2, 3, 1b |
| 6: logging, alerts, admin dashboard | 5–8 days | 1a |
| 6: IP register, licence audit, legal checklist | 2–3 days of preparation | A solicitor for the documents themselves |
| 7: curriculum expansion | **The dominant cost by far.** Each university year per subject is roughly 200–500 lessons to write, and every one needs expert review | Subject experts |
| 8: simulation audit; Physics and the gaps found | 2 days for the audit; then about 1–3 days per substantial simulation | Expert accuracy review |

**Critical path to a paying learner:** Phase 0 decisions → 1a live run → 2 (membership and premium content) → 3 (payments in test mode, then live) → 5 (plans page and paywall), with the legal terms and the provider account running alongside. That is roughly 25–40 engineering days plus the third-party waits. Themes, the IP register and the coverage audits run in parallel and aren't on the path.

### Status summary

- **Working live:** the deploy-only-after-tests gate; honest status and wording; the browser-only learning experience.
- **Built, not live-verified:** accounts, sync, AI tutor, the controlled deployment tooling.
- **Missing:** membership, payments, plans page, international model, school years and University Years 2+, light theme, logs, IP register.
- **Needs owner decisions:** the Phase 0 list above.
