# Gradify commercial platform plan

**Version 2.2, 6 November 2026.** This replaces version 2.1 of the same date.

**Changes in 2.2:** decision D1 is worked out in [REPOSITORY-STRATEGY.md](REPOSITORY-STRATEGY.md), checked against GitHub's documentation. It corrects §1A:
- The custom domain isn't guaranteed to move with the repository. A domain verified on the personal account blocks an organisation from publishing to it, and the `www` record must be repointed.
- The main recurring cost of going private is Actions minutes, not the plan fee: about $36 a month above Team's included amount as CI runs today, or about $7 with the deploy job on the single-CPU runner.
- Secret scanning and push protection stop on a private repository unless Secret Protection is bought. CI's own credential checks remain.
- The Claude GitHub App must be installed on the organisation.

The recommendation is unchanged (Option 3), done in stages. Nothing has been changed on GitHub.

**Changes in 2.1:** risk R2 is resolved and verified live. The site is now deployed from an allowlist (workstream 14, approved by the owner on its own). An audit of everything that had been published, and of the full git history, found no credential, key or personal data, so nothing needed rotating. Nothing else in the plan has changed.

This is a plan, not an implementation. Apart from workstream 14 (the allowlist deploy, approved separately and now live), nothing in it has been built, migrated, deployed or requested, and every milestone starts only on the owner's explicit approval.

**Evidence labels**
- **Working, live:** verified on getgradify.com.
- **Built, simulated:** tested against a stand-in backend.
- **Built, rehearsed:** tested against real PostgreSQL (PGlite) in CI.
- **Built, not live-verified:** never run against real Supabase or real payments.
- **Partial**, **Missing**.
- **Decision:** needs the owner.
- **Unverified:** an external fact that couldn't be checked; the working environment can't reach Supabase, Stripe, Paddle, GitHub's documentation, GOV.UK or the ICO.

### Changes since version 1

1. **Corrected: privacy of the repository doesn't protect anything deployed.** GitHub Pages serves the published files to everyone, whatever the repository's visibility. Premium content must be kept out of the published site altogether, not just out of a public repository (§1A).
2. **New finding: internal documents are published.** The deploy publishes `docs/`, `scripts/` and `supabase/` to getgradify.com: business plans, security posture, audits, the backend log. They need to be excluded from the site (risk R2). **Resolved in 2.1:** the allowlist deploy went live on 6 November 2026, and none of these files is reachable any more (see R2 in §11).
3. **Corrected: 131 registered interactives, not 132.** There are also ten shared practice tools outside the registries (NEWS2, drug calculations, clinical scenarios, legal reasoning, maths grapher and others) that the simulation strategy must include.
4. **Corrected: some Pro benefits work today without accounts.** Adaptive revision, mastery and Revisit already work on a single device (§5).
5. **New risk: selling unreviewed professional content.** Law, nursing and pharmacy content has no expert sign-off yet. Charging for it is a legal and reputational risk, so review becomes a launch gate for those subjects (§5, R14).
6. **Changed: test accounts.** The SQL-based creator added on 6 November contradicts the requirement to use the official Admin API. It's replaced in the plan by a temporary Edge Function that uses the Admin API (§1C), and will be removed from the tools when that's built.
7. **Changed: retention** is now set per kind of record, not a blanket six years (§1D).
8. **Changed: estimates** now include review, testing and owner time, and put the third-party lead times on the critical path (§7).
9. **Added:** dependency mapping; five work categories; revised milestones; a decisions table; a risk register; the multi-session operating model; the minimum viable launch versus the long-term vision.

---

## 1. Critical review of the audit findings

### A. Public repository and intellectual property

**What's actually exposed, and through which route:**

| Route | What it exposes | Fixed by making the repository private? |
|---|---|---|
| The live site (GitHub Pages) | Everything the deploy publishes: all course notes, the app code, **and `docs/`, `scripts/`, `supabase/`** | **No.** Pages serves the published files publicly in either case |
| The repository (GitHub) | All of the above, plus tests, the full history, every commit message, and every past version of every lesson | Yes, from the moment it becomes private |
| Copies already made | Anything already cloned, forked, cached or archived (public repositories are routinely archived by third parties, such as Software Heritage) | **No.** Nothing already public can be recalled. Rewriting git history doesn't remove copies |

**What must never be exposed, by either route:**
- secrets: none are committed, and CI enforces that
- premium lesson content
- answer keys or model answers for assessed or premium material, if those become premium
- internal business, legal and security documents
- the admin and operations tooling's internals
- learner data: never in the repository, by design

**What's fine to keep public:**
- **Free lessons.** They're the marketing.
- **The app's code.** Its security rests on row-level security and server functions, not on secrecy; the anon key is public by design.

**Options:**

| Option | Cost (unverified) | Protects | Doesn't protect |
|---|---|---|---|
| 1. Stay public; publish only site files; serve premium content from Supabase | None | Premium content, internal documents (once excluded) | The code, free content and history stay copyable; a weaker IP signal |
| 2. Private repository under the owner's personal account | GitHub Pro, about $4/month. Pages from private repositories needs a paid plan | As in 1, plus code, history and future drafts no longer readable | Ownership isn't the company's; past history already public |
| **3. Move it into a Gradify Ltd GitHub organisation, private** | GitHub Team, about $4 per user per month | As in 2, plus **the company owns the repository and its Pages site**, which helps the chain of title (§1A, workstream 11). Access can be managed per person | Past history already public |

**Recommendation: Option 3, together with Option 1's changes, which are needed in every option.**
- The deploy publishes an explicit allowlist of site files, never `docs/`, `scripts/`, `supabase/` or `tests/`.
- Premium lessons are never part of the published site.
- GitHub Pages can stay, deploying through Actions as it does now. **Corrected in 2.2:** the custom domain isn't guaranteed to move with the repository. The domain verification has to move to the organisation, the `www` record has to be repointed, and CI costs money once the repository is private. The staged runbook is in [REPOSITORY-STRATEGY.md](REPOSITORY-STRATEGY.md).

**Content separation for the future:**

| Class | Lives in | Published to Pages | Access |
|---|---|---|---|
| Public site and free lessons | The repository | Yes | Everyone |
| Premium lessons and resources | A private source (a private repository folder or separate repository), loaded by an admin pipeline into Supabase (`lesson_content`) | **Never** | Signed-in learners with an entitlement (enforced by RLS) |
| Server logic and prompts | `supabase/functions/` in the repository | Never | Server only |
| Internal documents | `docs/` in the repository | Never (after the fix) | The team |

Already-public lessons can't be withdrawn. They could still be made Pro going forward, but copies exist. **Decision:** which existing lessons become Pro. The pragmatic choice is to keep everything published so far free, and make *new* material, deeper resources and AI features the Pro value.

### B. Payment provider

None of this could be verified against current documentation or pricing. Treat it as a briefing to check, not settled facts.

| | **Paddle** (merchant of record) | **Stripe** (+ Billing, + Tax) | Lemon Squeezy (merchant of record) | FastSpring (merchant of record) | Stripe Managed Payments (merchant of record) |
|---|---|---|---|---|---|
| UK Ltd eligible | Yes (unverified) | Yes | Yes (unverified) | Yes (unverified) | Unverified; believed to be newer and limited in scope |
| Who handles VAT, GST and sales tax | **Paddle**, as the seller of record | **Gradify Ltd**: Stripe Tax calculates and collects, but Gradify registers and files where thresholds are crossed | Lemon Squeezy | FastSpring | Stripe (unverified) |
| Subscriptions, trials, upgrades and downgrades, proration | Yes | Yes (Billing) | Yes | Yes | Unverified |
| Failed payments and retries; grace periods | Yes (dunning) | Yes (Smart Retries) | Yes | Yes | Unverified |
| Refunds and chargebacks | Paddle handles disputes, as the seller | Gradify handles disputes | Provider handles | Provider handles | Unverified |
| Customer self-service (cancel, card, invoices) | Yes | Yes (Customer Portal) | Yes | Yes | Unverified |
| Webhooks | Signed; retried | Signed; retried; very mature | Signed | Signed | Unverified |
| Indicative fees (**unverified**; check current pricing) | About 5% + $0.50 per transaction, all-inclusive | About 1.5% + 20p (UK cards), more for international cards, + about 0.7% Billing + about 0.5% Tax | About 5% + $0.50 | Quote-based, typically higher | Unverified |
| Regional and local-currency pricing | Yes | Yes | Yes | Yes | Unverified |
| Fit with Gradify | Checkout overlay or hosted page, webhooks into an Edge Function: a clean fit | The same shape; more moving parts on tax | Now owned by Stripe; the product's long-term direction is a risk (unverified) | Enterprise-oriented | Too new to depend on (unverified) |

**Recommendation: Paddle.**
- It meets the owner's main requirement: international sales without Gradify registering and filing tax in each country.
- It owns disputes, and its subscription lifecycle features match the plan.
- At £15 a month, the extra fee over Stripe is roughly a few percentage points of revenue, buying away a compliance burden that would otherwise need an accountant in several jurisdictions.

**Reconsider Stripe if:** sales stay mostly in the UK for a long time, where Stripe is cheaper and tax is just UK VAT; or the owner wants maximum control and has accounting support.

**Before deciding:** confirm Paddle's current fees, its approval criteria for education subscriptions, payout currencies, and the UK consumer cancellation flow, against their documentation. That's a **decision** item.

The architecture stays provider-neutral either way: a `provider` column, one webhook function per provider, one path to entitlements.

### C. Authentication and test accounts

**Passwordless sign-in (email links and Google) is the right choice.**
- There are no passwords to leak, reset or store, and account recovery is email access.
- Add Apple sign-in later if the mobile share justifies it.
- "Password reset" is therefore out of scope.
- **Email deliverability becomes critical:** sign-in depends on email arriving, so custom SMTP is a launch requirement.

**Test accounts, compared:**

| | **A. Temporary Edge Function using the Admin API** (recommended) | B. The owner creates the accounts and runs the checks locally |
|---|---|---|
| Uses the official Admin API | Yes | Yes, through the dashboard |
| Service-role key | Stays inside Supabase: the function reads the key Supabase gives it (unverified that it's provided to functions by default; the run checks) | Not needed |
| Credentials | Passwords generated by the function, returned over TLS to the run's memory only; never logged or written | Typed by the owner on their own machine |
| Authorisation | A random one-run secret, set as a function secret, required on every call; the function refuses calls after a short expiry | The owner's dashboard sign-in |
| What it can create and delete | Only `gradify-test-<run>-{1,2}@<reserved domain>`, at most 2 per run, tagged with the run ID in app metadata. It deletes only users carrying that run's tag, created in the last 2 hours | The owner's judgement |
| Clean-up | Deletes at the end and verifies they're gone. Every run first sweeps any leftover tagged test users. The function and its secret are then deleted, and their absence verified | Manual |
| Proven against real Supabase | Yes: it signs in with each account, then checks the deletion with the Admin API | Yes |
| Extra token permissions | Deploy and delete functions; write and delete that one secret | None |
| Owner effort | Low | High: a local Node and Playwright setup, plus running the scripts |

**Recommendation: A**, with its first run treated as part of the controlled deployment: if any step fails, stop and report. B is the fallback if the token can't be scoped to include function deployment and secret writing for this project only.

### D. Logging and retention

These are proposals. **Professional verification is needed** from an accountant and a data protection adviser; the UK GDPR's storage-limitation principle applies throughout.

| Record | Contains | Proposed retention | Basis (unverified; to confirm) |
|---|---|---|---|
| Accounting and financial records (payouts, provider statements, the company's books) | Amounts, dates, provider references; no learner content | **6 years** from the end of the accounting period | HMRC record-keeping for company tax and VAT; the Companies Act minimum is shorter. With a merchant of record, the provider holds the customer invoices and Gradify holds its payout records |
| Subscription and payment records (`subscriptions`, `payments`, `payment_events`) | User reference, plan, status, amounts, dates | Active subscription period **+ 6 years**, then delete or anonymise | The contract claim limitation period (6 years, England and Wales); tax evidence |
| Security and authentication logs (`security_events`) | Event type, pseudonymous user reference, time, outcome; **no IP address** unless needed for an active investigation | **12 months** | No fixed rule; proportionate for investigating account compromise |
| Operational application logs (`ops_events`) | Failure kind, request ID, function, redacted detail | **30 days** | Diagnosis only |
| Error and diagnostic logs (browser and function errors) | Stack traces, redacted | **14–30 days** | Diagnosis only |
| Analytics and usage (`page_events`, already anonymous; `tutor_usage`) | No identifiers (`page_events`); user reference and token counts (`tutor_usage`) | Raw `page_events` **13 months**, then aggregated. `tutor_usage` **90 days** (limits need only 24 hours; costs need monthly totals) | Minimisation |
| Learning data (progress, answers, notes, cards) | The learner's own work | While the account exists; **deleted with the account** (already implemented: deleting the user cascades) | Contract performance |
| Backups | Everything above | Supabase's plan retention (unverified); deletions take effect in backups as they age out | Disclosed in the privacy policy |

Never logged:
- passwords, tokens or keys
- card data
- notes and answer text
- email addresses (the logs use a pseudonymous reference)
- raw IP addresses (the country suggestion uses none)

---

## 2. Master roadmap: workstreams and dependencies

Effort is in focused engineering days, including tests and review rounds. Owner time and third-party waits are listed separately in §7.

| # | Workstream | Exists | Partial | Missing | Must happen first | Blocks | Independent? | Main risks | Acceptance | Effort | Decision? |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Production backend and Supabase security** | 10 migrations, 2 functions, RLS, the deployment tooling (rehearsed on real PostgreSQL), the isolation matrix including forged writes | Preflight (needs storage, extensions, schemas, cron, webhooks, publications, grants, auth settings); the schema diff; data-change manifests | The live project and run; the Admin API helper | Decisions D1, D3, D4; the project created | 2–6, 12, 14 | No: it's the critical path | Token too broad; migration damage; auth table misuse | Every runbook step passes live; evidence in `BACKEND-LOG.md`; token revoked | 4–6 | Yes (D3, D4) |
| 2 | **Accounts, authentication, profiles** | Passwordless sign-in in the app; the shared store across all sites (same origin, so one session works everywhere); profile and set-up; device-to-account sync (simulated) | Onboarding in the app only | Registration and account pages on every site; email settings; profile fields (country, programme, year, theme); custom SMTP | 1 | 3, 7, 9 (sync), 6 | No | Email deliverability; site-to-site inconsistency | A real learner registers, verifies, signs in and out, edits the profile, and sees the same account on every site, live | 6–9 | D5 (SMTP provider) |
| 3 | **Memberships and entitlements** | — | — | Plans, entitlements, `has_entitlement()`, tier-aware AI limits, institutional tier (schema only) | 1, 2; D6 | 5, 6, 4 (entitlement writes) | No | Client-side bypass; RLS gaps | A free learner can't read Pro content or exceed free AI limits through any request; the isolation matrix is extended; live | 5–7 | D6 |
| 4 | **Payment provider integration** | — | — | Checkout, webhook, portal, payment history, lifecycle (renewal, dunning, grace, refunds, chargebacks), idempotency | 3; D2; the provider account approved; legal terms drafted (11) | 6 (live checkout) | Partly: code against the provider's sandbox once D2 is settled | Webhook spoofing or replay; lost events; refund policy | In the provider's sandbox: every lifecycle event produces the right entitlement, replays are ignored, unsigned events are rejected; then one real live payment and refund | 8–12 | D2, D7 |
| 5 | **Free and Pro content separation** | Course engine with permanent lesson IDs; status chips | — | An allowlist-based deploy; the premium content pipeline into `lesson_content`; the locked-content panel; the service worker never caching premium content | D1, D6; 3 | 6 | The deploy allowlist can start now | Premium content leaking into Pages or caches; breaking offline mode | A premium lesson is unreachable signed out, as a free learner, by direct URL or from the cache; free lessons are unaffected | 5–8 | D1, D6 |
| 6 | **Plans, pricing, checkout, conversion** | Honest status badges; privacy page | — | `plans.html`; the shared price module and table; homepage calls to action; upgrade routes; account billing page | 3, 4, 5; D7, D8; 9 (both themes) | Commercial launch | Design and copy can start now (unpublished) | Misleading claims; prices differing between pages | Every claim is live for that learner; one price source; tested in both themes, on desktop and mobile | 5–7 | D7, D8 |
| 7 | **International country and curriculum architecture** | Courses, schools, modules, lessons; paths; framework mappings | UK-only pathways | The curriculum graph; country suggestion and confirmation; routing | 2 (profile); D9, D10 | 8, regional pricing display | The model and research can start now; tables wait for 1 | A rigid hierarchy; mixing up the three countries | UK nations' systems modelled and routed; country change doesn't touch billing | 6–9 | D9, D10 |
| 8 | **University years and course expansion** | 9 courses (Physics 1,308 lessons, Law 480 and Nursing 497 complete; others partial); University Year 1 paths | Partly written courses | Year 2+ and school-year pathways; non-UK variants | 7 (structure); experts; D11 | Pro value; international claims | Writing can continue now in the existing course format; mapping to years waits for 7 | Placeholders; unreviewed content sold | Each year published only when written to the standard and reviewed | Long-running (§7) | D11 |
| 9 | **Dark/light theme system** | Dark design; set-up settings already applied site-wide | — | Colour variables everywhere (about 1,350 in CSS, 360 in canvas code); light palette; no flash of the wrong theme; first-visit prompt; account sync | Nothing (sync waits for 2) | 6, 10 (theme support) | **Yes, can start now** | A light theme that's an inverted afterthought; broken contrast | Both themes pass the contrast and focus checks on every page; no flash of the wrong theme; the preference syncs | 6–10 | D12 (light palette sign-off) |
| 10 | **Simulations and visualisation** | 131 registered interactives + 10 shared tools + 3D anatomy; science values pinned in tests | Metadata (kind, note, lessons) | Learning outcomes; QA and accuracy records; Physics; theme-aware colours; accessibility | 9's colour variables (for theming); experts for accuracy | Pro claim "understand visually" | The audit can start now | Decorative rather than educational; inaccuracy | Each has an outcome, an expert accuracy sign-off, both themes, keyboard use, mobile, and a performance budget | Audit 2; then per simulation | — |
| 11 | **IP, licensing, ownership** | Vendor licences; anatomy attribution; dated sources | Privacy draft | The register; chain-of-title documents; terms; trademark search | D1; a solicitor | 4 (terms), 6 (launch) | **The register can start now** | Unclear ownership of AI-assisted content; reproduced source material | Register complete; every third-party item licensed; assignments signed; documents reviewed | 2–3 prep, then legal | D13, D14 |
| 12 | **Logging, monitoring, administration** | CI history; deploy gate; `BACKEND-LOG.md`; anonymous usage | AI usage counts | Operational, security and commercial events; request IDs; redaction; retention jobs; alerts; admin role and dashboard | 1; D15 | Launch readiness | The design and redaction helper can start now | Logging personal data; admin access leaks | Every failure is findable by request ID; learners can't read any log; retention jobs run | 5–8 | D15 |
| 13 | **Shared architecture across sites** | The shared kit; the same origin, so one sign-in; the sites registry; course engine | — | `kit/commerce/`, `kit/core/theme.js`, a shared account menu; the guard tests in §8 | Nothing | Every other workstream | **Yes, can start now** (the guard tests) | Parallel sessions duplicating components | One module per concern, enforced by tests | 2–3 | — |
| 14 | **Testing, deployment, verification** | Tests on every push; deploy gate; credential scan; real-PostgreSQL rehearsals; browser checks against a stand-in; the live check script | — | The allowlist-based deploy; live checks for payments and entitlements; synthetic monitoring after launch | Nothing for the allowlist | Launch | **The allowlist can start now** | Gaps between simulated and live | Every critical journey has an automated live check; launch evidence recorded | Ongoing, 3–5 | — |

---

## 3. Five categories: what can happen when

**Category 1: can start now, without Supabase or decisions.** All local; none touches the database.
- Workstream 9: the theme architecture and light-mode refactor.
- Workstream 11: the IP and third-party licence register, and the legal document checklist.
- Workstream 10: the simulation and interactive audit, including adding outcome and QA fields to the registries.
- Workstream 8: the curriculum coverage matrix (country × level × qualification × year × subject).
- Workstream 13: the shared-architecture audit and the guard tests (§8).
- Workstream 14: the **allowlist-based deploy**, which stops publishing internal documents. **Done and verified live, 6 November 2026** (R2 resolved).
- Workstream 6: the plans page design and copy, unpublished.
- Workstream 7: researching education systems (England, Wales, Scotland, Northern Ireland first) from official sources.
- Workstream 1 (Part A tooling): the extended preflight inventory, the schema diff, data-change manifests, the Admin API helper code. Tested locally and on real PostgreSQL; not run live.
- Workstream 12: the logging design and the redaction helper, tested locally.

**Category 2: needs decisions first.**
- **Blocking now:** D1 (repository and content storage), D2 (payment provider), D3 (test-account method), D4 (token scope and plan), D6 (membership model and free rules).
- **Needed before their workstream starts:** D5 (email provider), D7 (prices and annual discount), D9 and D10 (first countries; country suggestion).
- **Can wait:** D11 (curriculum priorities beyond the UK), D12 (light palette sign-off, at review time), D13–D15 (legal and retention, before launch).

**Category 3: needs live Supabase.**
- The controlled deployment and live verification.
- Every new migration: profile v2, curriculum graph, membership, premium content, billing, institutions, logs, plan-based AI limits.
- RLS on all of them, and the extended isolation matrix.
- Registration and email.
- Entitlement enforcement, and the premium content pipeline.
- Edge Functions: checkout, webhook, the admin helper, log ingest, retention jobs, alerts.
- The admin dashboard data.
- Syncing the theme to the account.

**Category 4: needs the payment provider.**
1. Business verification of Gradify Ltd.
2. Product and price configuration: Pro monthly at £15 in the UK, annual, regional prices.
3. Sandbox webhooks, then the full lifecycle test suite in sandbox.
4. Live webhooks; tax settings, confirmed with the provider.
5. One real live payment, then a refund, as the go-live check.

Steps 1 and 2 can start as soon as D2 is decided. Verification can take days to weeks (unverified).

**Category 5: long-running, in parallel.**
- **Curriculum expansion**, including University Years 2+ and school years. Content can be written now in the existing course format; pathway mapping waits for the curriculum graph.
- **Simulation development**: the audit and outcome fields now; theme support after the colour variables.
- **Expert content review**, which becomes a launch gate for paid professional content.
- **IP documentation.**
- **Additional countries and subjects**, after the first non-UK system has been modelled and reviewed.

---

## 4. Milestones

There are three levels of readiness:
- **Technically functional** (end of M3): real accounts, sync, AI and entitlements work live.
- **Commercially launchable** (M7): a UK learner can pay, receive Pro, cancel and be refunded, under reviewed terms, with honest claims.
- **Mature international platform** (M8 onwards): several countries' curricula, years and simulations, reviewed.

| Milestone | Deliverables | Prerequisites | Acceptance and tests | Done when | Don't start until done |
|---|---|---|---|---|---|
| **M0 Decisions and safe groundwork** | Decisions D1–D6 recorded; the deploy allowlist; the guard tests; the IP register started; the audits | — | The deploy publishes only site files (checked by a test listing the artifact); guard tests in CI | D1–D6 written into `docs/DECISIONS.md` | M1's live run |
| **M1 Production backend** | The controlled deployment: preflight, verified backups, the 10 migrations, RLS audit, the functions, the Admin API helper, live verification, the site connected | M0; the project; the token | Every runbook check passes live; the isolation matrix including forgery; the live journey per flow | `BACKEND-LOG.md` shows every step passed; token revoked | Any new migration |
| **M2 Accounts and profiles** | Registration and account pages on every site; profile v2; custom SMTP; theme preference sync (if the theme work has landed) | M1; D5 | Live: register, verify, sign in and out on two devices and three sites; a profile edit appears everywhere | The live check passes | M3 |
| **M3 Memberships and premium content** | Plans, entitlements, `has_entitlement()`; plan-based AI limits; the premium pipeline and locked panel; service worker exclusions | M2; D1, D6 | Live: a free learner is denied Pro content and premium AI via the page, direct requests, edited requests, local-storage tampering and the cache; granting Pro manually (admin) unlocks it, revoking it removes it | All denial tests pass live. **This is "technically functional"** | M4's live checkout |
| **M4 Payments and subscription lifecycle** | Checkout, webhook, portal, history, dunning and grace, refunds, chargebacks | M3; D2, D7; provider approved; terms drafted | Sandbox: every lifecycle event; replayed and unsigned events; out-of-order delivery. Live: one real payment and refund | All sandbox tests pass; the live payment and refund are reconciled | M5 publishing |
| **M5 Commercial website and conversion** | Homepage calls to action; `plans.html`; Free/Pro markers; upgrade routes; account billing page | M4; theme work done; D8 | Every claim checked against live features for a fresh learner; one price source; both themes; accessibility checks | Owner sign-off on the page and copy | M7 |
| **M6 UK curriculum structure and launch content** | The curriculum graph; UK nations' systems; country suggestion and confirmation; routing; Pro content for the launch subjects reviewed by experts | M2; D9–D11; experts | The routing tests; reviews recorded in the quality records; no placeholders | The launch subjects' Pro content is reviewed | Non-UK countries |
| **M7 Production verification and UK launch** | Full live verification; legal documents live; logging, alerts and admin minimum; backup and restore drill; launch checklist | M1–M6; D13–D15 | The end-to-end journey from registration to payment, Pro, cancellation and refund, live, on desktop and mobile; incident drill | The owner approves the launch. **This is "commercially launchable"** | — |
| **M8 onwards: international expansion** | The second country (systems, pathways, regional prices); University Years 2+; the simulation programme; institutional tier | M7 | Each country and year is reviewed before it's marked available | Continuous. **This is the "mature international" vision** | — |

---

## 5. The £15/month Pro proposition

| Proposed benefit | Status today | At launch (M7)? |
|---|---|---|
| Your entire course, unlocked | **Not yet built** (needs M3). Courses are complete for Physics, Law and Nursing; partial elsewhere (Pharmacy 275/318, Psychology 296/393, Sociology 306/438, Maths 198/1,077, Biology 50/391, Chemistry 45/460) | **Yes, but per subject and honest**: "the full course" only where it's written and reviewed; otherwise "N lessons available, more being added" |
| A personal AI study tutor | **Built, not live-verified.** Ten modes, grounded in the lessons, in every course | Yes, once verified live, with the plan's real usage limits stated. **Never "unlimited"** |
| Revision that adapts to you | **Working on one device** (mastery, Revisit, plans) | Yes, once sync is verified live |
| Understand the difficult stuff visually | **Partial**: strong in Biology, Chemistry, Psychology and Sociology; little in Law, Nursing, Pharmacy and Maths; **none in Physics**; no expert accuracy review | Only for the subjects that have them, and say which. Not as a blanket claim |
| Study smarter, not longer (progress insights) | **Working on one device** | Yes |
| Everything in one learning environment, synced | **Built, simulated** (the stand-in browser check passes) | Yes, after the live verification |
| A growing international course library | **Not yet**: UK only | **No.** Not until a non-UK curriculum is published. "A growing course library" (without "international") is accurate |

**Can it justify £15 a month?**
- **For professional learners** (SQE, nursing, pharmacy), yes on value, if the content is expert-reviewed. Unreviewed professional content shouldn't be sold.
- **For GCSE and A level learners**, it's a premium price: justified only with the AI tutor working well, complete specification-mapped content, and strong interactives.
- **Recommendation:** launch Pro on the subjects that are both complete and reviewed, list exactly what Pro includes for each, and add subjects as they pass review.

---

## 6. Simulations and educational quality

A visual is built only where manipulating something changes understanding. Otherwise a static diagram, graph, timeline or worked example is better, and cheaper to get right.

| Subject | High educational value (simulate) | Better as diagrams, graphs, timelines or worked examples | Existing: needs accuracy review | Biggest gaps |
|---|---|---|---|---|
| Physics | Projectile motion and forces; oscillations and SHM; wave superposition and interference; circuits (series and parallel, internal resistance); electric and magnetic fields; gas laws and kinetic theory; photoelectric effect; particle in a box | Derivations, history of physics, units, measurement | — (none exist) | **The whole subject.** Start with mechanics, waves and circuits, which have the most-taught outcomes |
| Biology | Already covered: transcription and translation, replication, membrane transport, action potential, cardiac cycle, enzyme kinetics, natural selection | Classification, cell theory, ecology definitions | All 30. Priority: cardiac cycle, action potential, kidney (physiological numbers); immune response (a descriptive model, labelled) | Meiosis detail; photosynthesis light reactions; hormone feedback |
| Chemistry | Covered: orbitals, VSEPR, mechanisms, SN1/SN2, equilibrium, titration, electrochemistry, spectroscopy | Nomenclature, safety, history | All 30. Priority: mechanism builder (curly-arrow correctness), spectroscopy (simulated spectra), equilibrium (illustrative constants) | Hybridisation; electrophilic aromatic substitution step-through; kinetics with real data |
| Psychology | Covered: memory paradigms, Stroop, signal detection, conditioning | Theories, ethics, approaches (timelines and comparisons) | All 34. Check the replication status of the classic effects in the copy | Research methods: statistical power, p-hacking demonstrations |
| Sociology | Covered: Lorenz and Gini, mobility, demographic transition, networks | Theorists and movements (timelines already exist) | The data explorers: check their datasets' sources and dates | Up-to-date data refresh process |
| Law | Decision trees for contract formation, statutory interpretation and court routes; the reasoning workspace exists | Most doctrine: flowcharts and worked problem answers | The 2 registered + the reasoning tool | Court structure maps; offer and acceptance timelines; problem-question builder |
| Nursing | NEWS2 deterioration, clinical scenarios, drug calculations exist; 3D anatomy exists | Communication, ethics, the NMC Code | The 3 + the shared tools; **clinical review essential** | Fluid balance; oxygen therapy; pharmacokinetics in practice |
| Pharmacy | Calculations trainer exists; pharmacokinetics curves; dose-response; drug interaction mechanisms | Law and ethics, BNF navigation | 1 + the calculations tool; **pharmacist review essential** | PK (half-life, steady state, loading dose) interactive |
| Maths | The grapher exists; transformations; distributions; vectors; calculus visualisers | Proof, algebra drills (worked examples) | 2 + grapher | Probability simulations; calculus (limits, area under curves) |
| TechGradify | Algorithm and data-structure visualisers; networking; databases | — | — (no course in this repository) | Depends on the TechGradify plan |

**Every simulation gets a QA record:**
- the learning outcome and the lesson IDs it serves
- the model and what it simplifies (already present)
- expert accuracy review (reviewer and date)
- light and dark themes
- keyboard operation and a text alternative
- mobile layout
- a performance budget
- interaction (cause and effect, not just playback)

A simulation is "complete" only when every field passes. The priority is educational impact weighted by how many learners reach the topic: Physics' core topics first, then accuracy reviews of the existing 131, then the gaps.

---

## 7. Estimates

### Engineering days (focused, including tests and review rounds)

| | Critical path to UK launch | Parallel |
|---|---|---|
| M0 safe groundwork (allowlist deploy, guard tests) | 2 | — |
| M1 live backend, including the Part A additions | 4–6 | — |
| M2 accounts and profiles | 6–9 | — |
| M3 memberships and premium content | 10–15 | — |
| M4 payments | 8–12 | — |
| M5 commercial site | 5–7 | — |
| M6 UK curriculum structure | 6–9 | — |
| M7 verification, logging, admin minimum, launch | 6–9 | — |
| Theme system | — | 6–10 (must finish before M5) |
| IP register and licence audit | — | 2–3 |
| Simulation audit | — | 2 |
| Curriculum and university years | — | Each university year per subject is about 200–500 lessons. At the pace of recent sessions, writing is roughly 1–2 days per 30–50 lessons, **plus expert review**, the true bottleneck |
| **Total** | **About 45–70 days** | — |

### Owner and third-party time on the critical path (unverified durations)
- Decisions D1–D6: about 1–2 sessions.
- Provider business verification: days to weeks.
- Solicitor's drafting and review of the terms, privacy, refund policy and IP assignments: weeks.
- Expert review of the launch subjects' Pro content: weeks, depending on availability.
- **These are likely to be the real limits on the launch date, not engineering.**

---

## 8. Running this across several Claude sessions

**One source of truth.** Proposed files; create them only once approved:

| File | Holds | Who writes it |
|---|---|---|
| `docs/COMMERCIAL-PLATFORM-PLAN.md` (this file) | The plan and roadmap | Lead session |
| `docs/DECISIONS.md` | One entry per decision (ID, date, decision, why, consequences), decided by the owner | Lead session records the owner's decisions |
| `docs/WORKSTREAMS.md` | Each workstream's owner session, status, current task, the paths it may change, and its blockers | Each session updates its own row |
| `supabase/MIGRATIONS.md` | **Reserved** migration timestamps and names, in order. A session claims a slot before writing a migration | Lead session approves |

**Ownership of paths:**

| Area | Owner |
|---|---|
| `supabase/`, `kit/data/`, `kit/commerce/` (new), `kit/core/theme.js` (new), `.github/`, `scripts/supabase-admin.mjs` and the deployment tools, `gradify.config.js` | **One lead platform session only** |
| `kit/styles/` and colour-variable conversion | The theme session, coordinated with the lead for shared files |
| `kit/courses/<slug>/` | One content session per course (as today) |
| `kit/labs/<subject>/`, `kit/interactive/` | One simulation session per subject |
| `docs/` (planning) | Lead session; content and simulation sessions keep their own subject docs |

**Guard tests** (cheap, in CI) stop the concrete collisions:
1. **Migrations:** timestamps unique and increasing, and every file listed in `supabase/MIGRATIONS.md`.
2. **Pricing:** no price literal (such as `£15` or `15.00`) outside `kit/commerce/`.
3. **Theme:** no theme switching or storage outside `kit/core/theme.js`; no new hard-coded colours in CSS outside the token files, using a ratchet so the count can only fall.
4. **Entitlements:** no client-side Pro checks; Pro access only through the shared module, which asks the server.
5. **Premium content:** no premium lesson files in the published site (the deploy allowlist test).
6. **Shared components:** no duplicate account menu or paywall implementations; one module each.

**Process:**
- Platform work (workstreams 1–7 and 12–14) goes through feature branches and pull requests into `main`, with CI required.
- Content and simulation sessions can keep pushing to `main` within their own paths. That's today's practice, and the guard tests protect it.
- **Branch protection** (requiring CI before merging) is a GitHub setting for the owner to switch on: decision D16.

**In parallel, safely:**
- the theme session
- the IP register
- the curriculum and simulation audits
- content sessions (one per course)
- simulation sessions (one per subject, after the theme colour variables)

**One lead session, in sequence:** M1 → M2 → M3 → M4, plus all migrations, the commerce module and the deploy pipeline.

---

## 9. Minimum viable commercial launch versus the long-term vision

| | Minimum viable commercial launch (UK) | Long-term vision |
|---|---|---|
| Countries | UK only, stated honestly; other visitors can use Gradify free and see "UK curricula" | Several countries' systems, with regional pricing |
| Accounts | Passwordless, on every site; custom SMTP | + Apple sign-in; institution SSO |
| Membership | Free and Pro (monthly £15, annual); institutional tier in the schema only | Institutional and university tiers |
| Content | Pro on the subjects that are complete and reviewed, each listed | All subjects, school years, University Years 1 to the final year, country variants |
| AI | The tutor live, with the plan's limits stated | Tutor memory, deeper subject-specific reasoning |
| Simulations | The existing ones, labelled honestly; Physics core started | Every high-value topic simulated and reviewed |
| Themes | Dark and light | — |
| Legal | Reviewed terms, privacy, cookies, subscription and refund terms, disclaimers; IP assignments signed | Trademarks registered; institution contracts |
| Operations | Operational and commercial logs, alerts, minimal admin, tested restore | Full admin dashboard; synthetic monitoring |

---

## 10. Decisions needed from the owner

| ID | Decision | Urgency | Consequence of each choice |
|---|---|---|---|
| D1 | Repository visibility and where content lives | **Deferred by the owner (6 Nov), to be revisited in about two weeks**, along with Secret Protection and formalising Gradify Ltd's ownership | Private under a Gradify Ltd organisation (recommended), in stages: transfer while public, then Team, then private. GitHub Team is about $4 per user per month (unverified), plus Actions minutes (about $7 a month over the included amount with the cheaper deploy runner). Company ownership; Pages kept. Sub-decisions O1–O6 and the runbook are in [REPOSITORY-STRATEGY.md](REPOSITORY-STRATEGY.md). The allowlist deploy is done (R2) |
| D2 | Payment provider | **Blocking for M4** (account set-up takes time) | Paddle (recommended): merchant of record, about 5% + $0.50 (unverified). Stripe: lower fees, but Gradify handles tax |
| D3 | Test-account method | **Blocking for M1** | The temporary Admin API function (recommended): the token needs function and secret permissions for this project. Or the owner runs the checks locally |
| D4 | Token scope, plan and region | **Blocking for M1** | London; a paid plan for no pausing and platform backups (unverified); allowing documentation access lets the token matrix be finished against Supabase's current scope names |
| D5 | Email (SMTP) provider | Before M2 | Needed for reliable sign-in emails |
| D6 | Membership model and free rules | **Blocking for M3** | For example, the first school free plus a sample from each school; all lessons published so far free (recommended, given they're public) |
| D7 | Prices: annual discount; regions | Before M4 | UK monthly is £15 (decided) |
| D8 | Plans page copy and claims sign-off | Before M5 | — |
| D9 | First countries after the UK | Before M6 | — |
| D10 | Country suggestion method | Before M6 | Time zone and language (recommended: no IP); or IP lookup in a function |
| D11 | Curriculum priorities and expert reviewers | Ongoing; gates paid professional content | Unreviewed professional content isn't sold |
| D12 | Light palette sign-off | At theme review | — |
| D13 | Solicitor for the legal documents and IP assignments | Before M4 and M7 | — |
| D14 | Trademark search and filing | Before M7 (recommended) | — |
| D15 | Retention periods (§1D), confirmed with professionals | Before M7 | — |
| D16 | Branch protection on `main` | Soon | Requires CI before merging; enables the session model in §8 |

---

## 11. Risk register

| ID | Risk | Area | Likelihood | Impact | Mitigation |
|---|---|---|---|---|---|
| R1 | Premium content leaks through the published site, caches or history | IP, commercial | High without M3 and the allowlist | High | Allowlist deploy; Supabase-held premium content; service worker exclusions; keep past content free |
| R2 | Internal documents published on getgradify.com | Security, IP | **Resolved 6 Nov 2026, verified live** | — | The deploy publishes only allowlisted files (`scripts/build-site.mjs`), and CI fails if anything else would be published. Live: every excluded path answers 404, and all 150 pages, 131 interactives, 18 workspace cases and offline mode still work. The audit found no credential or personal data; nothing to rotate. The files were public for some time, and the repository itself is still public (§1A), so treat their contents as already seen |
| R3 | Token broader than needed | Security | Medium | High | Scope check in preflight; shortest expiry; revoke after |
| R4 | A migration damages data | Data | Low (allowlist, rehearsal, checksums) | High | Verified backups; restore rehearsal; one migration at a time |
| R5 | Entitlement bypass on the client | Commercial, security | Medium if rushed | High | Server-side `has_entitlement()`; RLS; denial tests in the isolation matrix |
| R6 | Webhook spoofing, replay or lost events | Payments | Medium | High | Signature verification; idempotency by event ID; reconciliation job |
| R7 | Tax non-compliance (if Stripe) | Payments, legal | Medium | High | A merchant of record, or an accountant plus Stripe Tax |
| R8 | Unclear ownership of AI-assisted content | IP | Medium | High (investment, sale) | The register; legal advice; assignments; recorded authorship |
| R9 | Reproduced copyrighted source material | IP, legal | Low to medium | High | Audit lessons against their sources; quotes only within limits |
| R10 | Personal data in logs | Data, legal | Medium | Medium | Redaction helper; pseudonymous references; retention jobs |
| R11 | Sign-in emails not delivered | Commercial | High without custom SMTP | High | Custom SMTP before M2 |
| R12 | Parallel sessions conflicting | Architecture | **High** | Medium | Path ownership; migration reservations; guard tests; branch protection |
| R13 | Misleading plans claims | Legal, commercial | Medium | High | Every claim tied to live status; owner sign-off (D8) |
| R14 | Selling unreviewed professional content (law, nursing, pharmacy) | Legal, reputational | **High if launched as-is** | High | Expert review gates Pro for those subjects |
| R15 | Free-tier projects pausing, or missing platform backups | Operations | Depends on plan | High | A paid plan (D4, unverified) |
| R16 | Light theme breaks contrast or the interactives | UX, accessibility | Medium | Medium | Colour variables; contrast checks in both themes; simulation QA record |
| R17 | Over-scoping the launch (international at launch) | Commercial | Medium | Medium | UK-first MVP (§9) |
| R18 | Provider approval delay or refusal | Payments | Low to medium | High | Apply early; Stripe as the fallback |

---

## 12. Can begin immediately, without production access

Each is local and tested in CI, and needs only the owner's go-ahead.

1. ~~**The allowlist-based deploy**, which stops publishing `docs/`, `scripts/` and `supabase/`.~~ **Done, 6 November 2026; R2 closed.**
2. Guard tests: migrations, prices, theme, entitlements, premium content, shared components.
3. The theme architecture and light-mode refactor.
4. The IP and third-party licence register, plus the legal document checklist.
5. The simulation audit, and the outcome and QA fields on every registry entry.
6. The curriculum coverage matrix, and research into the UK nations' education systems.
7. The plans page design and copy, unpublished.
8. The Part A tool changes: the extended preflight, the schema diff, data-change manifests, the Admin API helper code.
9. The logging design and redaction helper, tested locally.
10. Expert review queues for the launch subjects' Pro candidates.
