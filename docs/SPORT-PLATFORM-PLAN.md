# Gradify Sport: the connected fitness and nutrition platform

**Status:** plan. Body Intelligence is live (`docs/BODY-INTELLIGENCE.md`); everything else here is design, not built. It follows `docs/ECOSYSTEM.md`: one account, one profile, one database, one XP system, browser storage when signed out, Supabase when signed in, AI only through Edge Functions.

## The principle: one record of the person, many views

Gradify Sport is not six dashboards. It is **one shared record** (what the person did, ate, measured and felt) and **one intelligence layer** that turns that record into estimates. Each "Intelligence" is a view onto the same data, and the anatomy model is the shared visual language across them.

```
            the shared record (Supabase, owner-only RLS)
  workouts · food_logs · body_checkins · sleep_logs · fitness_tests · measurements · goals
                                  │
                  intelligence layer (pure JS modules, tested; shared by web and apps)
   body-intel.js   recovery.js   nutrition.js   performance.js   progress.js   recommend.js
                                  │
   Body · Training · Nutrition · Recovery · Performance · Progress  ← views, all reading the same estimates
```

## How the six fit together

| Intelligence | Owns (new tables) | Reads from the others | Writes into the shared picture |
|---|---|---|---|
| **Body** (live) | none of its own | workouts, checkins, tests | Per-muscle stimulus, development, recovery, imbalances: the anatomy heat map every other view can show |
| **Training** | `exercises_custom`, `programmes`, `programme_days`, workout templates | Body (what's under-trained or fatigued), Recovery (readiness), Progress (goals) | Workouts (already the shared table): logging updates Body instantly |
| **Nutrition** | `food_logs`, `foods_custom`, `recipes`, `meal_plans`, `nutrition_targets` | Training load (energy and protein needs), Progress (body-weight trend, goal) | Daily energy and protein adequacy, fed into Recovery and Progress |
| **Recovery** | `sleep_logs` (or imported) | Body checkins, training load, nutrition adequacy | One readiness estimate per day and per muscle, used by Training and Body |
| **Performance** | `fitness_tests` (live), `cardio_sessions` | Training, Recovery | Measured fitness: heart and lungs on the model, endurance trends |
| **Progress** | `measurements` (weight, girths, body-fat estimates), `goals`, `achievements` | all of the above | Long-term trends, goal tracking, XP and milestones in the shared activity table |

Examples of the connections:
- **Logging a workout** updates muscle stimulus and recovery (live today), adds to the day's energy expenditure estimate (Nutrition), moves programme progress (Training) and earns XP (Progress, live today).
- **Logging food** updates energy and protein against targets. Low protein or energy over a hard training week lowers the recovery estimate's confidence and appears as a recommendation in Training.
- **A check-in** (soreness, live; sleep, mood planned) updates recovery per muscle and overall readiness, which Training uses to suggest which session to do.
- **A test result** colours the heart and lungs (live) and updates Performance trends and goals.

## Nutrition Intelligence (the biggest new piece)

- **Logging:** search a food database, scan a barcode, or **photograph a meal**. Photos go to a Supabase Edge Function that calls Claude's vision model with a strict output schema: the foods identified, an estimated portion in grams with a range, and a confidence level. The user confirms or edits before anything is saved. Photo estimates are always labelled as estimates; portion size is the largest source of error.
- **Food data (licences must be confirmed before use):**
  - USDA FoodData Central: US government data, generally public domain.
  - UK CoFID (McCance & Widdowson's composition of foods integrated dataset): published by the UK government; check the exact licence terms.
  - Open Food Facts: barcoded products under the Open Database Licence (ODbL), which requires attribution and share-alike for the database.
- **Targets:**
  - Energy expenditure: Mifflin–St Jeor resting energy, plus activity from logged training and steps.
  - Protein: about 1.6 g per kg per day is the commonly cited level for those training for muscle gain, with a range.
  - Everything is shown as targets with ranges, never prescriptions.
- **Recipes and meal plans:** Claude generates recipes and weekly plans against the user's targets, preferences, allergies and budget, with structured output so every recipe's macros are recomputed from the food database rather than trusted from the model's text.
- **Safety:** users can turn off calorie numbers entirely. There are no extreme deficits (floors on energy targets). Wording is non-judgemental. Eating-disorder signposting (e.g. Beat in the UK) appears in settings and when logging patterns suggest severe restriction. Not a medical or dietetic service; medical conditions mean "talk to a professional".

## Recovery, Performance, Progress

- **Recovery:**
  - Combines training load (live), soreness (live), and sleep duration and quality (manual first, then Apple Health or Google Health Connect import in the apps), plus nutrition adequacy.
  - The output is a readiness band with the reasons shown ("short sleep, heavy legs session yesterday").
  - Always labelled as an estimate, never a diagnosis.
- **Performance:**
  - Cardio sessions (distance, time, heart rate if available), with VO₂max estimates from tests or watch imports.
  - Mobility and balance tests (live) and endurance trends.
  - Measured values are kept separate from estimated ones.
- **Progress:**
  - Weight trend: smoothed, so daily fluctuation isn't mistaken for change.
  - Girth measurements, optional progress photos stored privately in Supabase Storage, and goals with deadlines.
  - Achievements and XP through the existing activity table.

## Data and engineering rules

1. Every new table: `user_id default auth.uid()`, owner-only RLS, value checks (the Body Intelligence migration is the template). It is verified on Postgres with RLS tests before release.
2. Intelligence lives in pure, tested JS modules (`kit/sport/*.js`) that run in the browser and can be reused by the iOS and macOS apps (via a JS runtime or a port with the same tests).
3. Each number carries its provenance (logged, calculated, estimated, measured), as Body Intelligence already does.
4. AI (food photos, recipes, coaching text) only via Edge Functions with schema-validated output, per-user daily limits and no keys in the browser.
5. Health data is sensitive (UK GDPR special category for health): explicit consent, export and delete, a data protection impact assessment before launch, and no sharing without opt-in.

## Build order

1. **Training:** exercise library pages (reusing `EXERCISES` and the anatomy preview), editing past workouts, templates, then programmes with progression rules. It builds directly on the live workouts table.
2. **Recovery v1:** add sleep and overall-fatigue check-ins to the existing check-in, and a daily readiness card fed by the live recovery model.
3. **Nutrition v1:** food search (licensed database), manual logging, targets; then barcode; then photo recognition via an Edge Function (needs the Anthropic key in Supabase secrets and a per-user limit).
4. **Progress:** measurements, goals and a unified timeline across all of the above.
5. **Performance:** cardio logging and watch or health-app imports with the iOS app.
6. **Anatomy data upgrade:** import BodyParts3D per-muscle meshes (`docs/ANATOMY-AUDIT.md`, option 1) so back, calves and forearms become individually selectable too.
