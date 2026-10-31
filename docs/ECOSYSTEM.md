# The Gradify ecosystem: shared foundations

Gradify is one product with several specialist environments: **Learn, Sport, Mind (including Astrology), News, Culture, Life and Visual Studio**. They are not separate applications. This document lists what they share, what already exists and how each new environment plugs in. It follows the decisions in `docs/VISUAL-STUDIO-AND-ECOSYSTEM-PLAN.md`: stay on the static site + Three.js + GitHub Pages + Supabase, and add backend services only where they are genuinely needed.

## Shared layers

| Layer | Status | How environments use it |
|---|---|---|
| **Account and sign-in** | Built: Supabase auth (email link, Google), one session across getgradify.com and every sub-site | Every page opens the shared client through `kit/data/store.js` (`CloudStore.create()`), and falls back to this browser when signed out |
| **Profile** | Built: `public.profiles` (display name, goal, level, chosen site, daily minutes, XP) | Shared by all environments; environment-specific settings go in their own tables keyed by `user_id`, not new profile columns |
| **Personal development system (XP, streaks, activity)** | Built: `public.activity` with a `site` column; XP only changes through activity rows (`guard_xp` trigger) | Each environment logs meaningful actions with its own `site` value: `SportGradify` (workouts, tests, check-ins, live), later `GradifyMind`, `GradifyAstrology`, `GradifyCulture`, `GradifyNews`, `GradifyLife`, `GradifyStudio`. One XP total, one streak, one activity heatmap |
| **Storage pattern** | Built: `LocalStore`/`CloudStore` with the same async API; browser data moves to the account on first sign-in | New features follow it (`kit/sport/body-store.js` is the example): works signed-out, syncs signed-in, owner-only RLS on every table |
| **AI infrastructure** | Built (first function): Supabase Edge Function `study-pack` holds the Anthropic key as a secret; the browser never sees it | New AI features are Edge Functions behind one model-agnostic adapter (`plan`/`generate`/`interpret` interfaces), with shared rate limits and daily quotas per account. Claude is the first provider |
| **3D engine** | Built: vendored Three.js, `kit/models/engine.js` + `viewer.js`, the BodyParts3D anatomy model | Body Intelligence (live) and Visual Studio's interactive viewer reuse it; Learn's subject models already do |
| **Shared UI kit** | Built: `kit/styles`, `kit/core` (site shell, colours, icons) | All environments use it for one visual identity |
| **Subscriptions and entitlements** | **Not built** | Plan: a payment provider's webhook writes `subscriptions` and `entitlements` rows through an Edge Function using the service role; browsers can read their own rows but never write them. Features check entitlements (`studio.render_credits`, `pro`, `institution`). Free tiers keep working without it |
| **Search and discovery** | **Not built** | Plan: one index over Learn topics, Culture entities and News stories, so a story or essay can link to a course and back |

## Rules for every new environment

1. Reuse the account, profile, activity/XP, storage pattern and UI kit; don't create a parallel system.
2. Every new table has `user_id default auth.uid()` and owner-only RLS, unless it is editorial content (public read, editor-role write).
3. Keys and paid APIs only live in Edge Functions or isolated workers, never in site code.
4. Sensitive data (Mind check-ins, journals, birth data) is private by default and never shared without explicit consent; journals should be encrypted client-side.
5. Label what's measured, estimated and interpretive. No feature presents a guess as a measurement.
6. Document the service in `docs/` alongside the code.

## Environments

| Environment | Status | Notes |
|---|---|---|
| Learn | Live | 31 subject sites, course engine (e.g. the 54-unit physics course), notes studio, SRS, Life OS |
| Sport: Body Intelligence | **Live (MVP)** | `docs/BODY-INTELLIGENCE.md` |
| Mind | Planned next | Check-ins, private journal, browser-generated ambient sound, investigation of original AI-generated meditation audio, tracker, crisis signposting |
| Astrology (in Mind) | Investigation | Swiss Ephemeris commercial licence: present costs and conditions before implementation (decision 3) |
| Visual Studio | Investigation | RunPod vs Modal on-demand GPU tests within £100–£250/month; measure real cost per generation before the H–F proof of concept is scaled |
| News | Framework first | Impartiality charter, source transparency, corrections log, independent editorial review; no claim of absolute neutrality |
| Culture | Editorial first | Curated, researched content and design, not automatically generated articles |
| Life | Partly live | Life OS (plan, calendar, assistant) inside each site |
