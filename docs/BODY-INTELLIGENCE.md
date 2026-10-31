# SportGradify Body Intelligence

**Live page:** `sportgradify/body.html` (getgradify.com/sportgradify/body.html), linked as **My body** in SportGradify's navigation.

The user's body in 3D, coloured by their own training data. It uses the existing BodyParts3D anatomy model; no new 3D asset was bought (decision 4 in `docs/VISUAL-STUDIO-AND-ECOSYSTEM-PLAN.md`).

## What it does

- **3D model:** the 17 tracked muscle groups (34 left/right meshes) from BodyParts3D, plus the skeleton, the heart and lungs, and a skin layer.
  - **Look:** studio lighting with key, fill and two coloured rim lights, soft shadows and ACES filmic tone mapping. Muscles use a clearcoat, sheen and muscle-fibre bump material.
  - **Controls:** drag or one finger to turn, scroll or pinch to zoom (toward the cursor), right-drag or two fingers to pan. Tap a muscle to inspect it; double-tap to fly in. Front, back, left and right views; zoom buttons; reset; slow turntable.
  - **Layers:** skeleton, heart and lungs (an x-ray view that makes the muscles see-through), and skin.
- **Four heat-map modes.** Each is labelled on screen with what it actually is:

| Mode | Source | Computation (`kit/sport/body-intel.js`) |
|---|---|---|
| Training stimulus | Logged sets | Effective sets = muscle weight × intensity (from RPE, or 0.85 when RPE isn't logged), with a 7-day half-life. The total × ln 2 reads as "effective sets per week". The top of the scale is 20, from the common evidence-based guidance of roughly 10–20 hard sets per muscle per week |
| Development | Logged sets | Best estimated 1RM (Epley, sets of 1–12 reps) or best reps for bodyweight moves, last 4 weeks vs the 8 weeks before, averaged over the exercises that load the muscle (weight ≥ 0.4). No history means grey. **Never labelled as muscle size** |
| Recovery | Logged sets + soreness check-ins | Load from the last 7 days with a 36-hour decay, plus reported soreness (0–3). Shows recovered, recovering or fatigued, with estimated hours to recover. Labelled as an estimate, not a medical assessment |
| Fitness | Measured tests only | Change from the user's own first result, in the right direction for each test (a faster 5 km is an improvement). Cardiovascular tests colour the heart and lungs |

- **Tap a muscle:**
  - anatomy and what the muscle does
  - effective sets per week, sessions in the last 4 weeks, last trained, recovery state
  - a left/right imbalance flag (from unilateral sets)
  - a 12-week bar chart, the strength trend with its evidence, and measured results
  - what trained it recently, and the exercises that train it
- **Exercise explorer:** pick an exercise and the model lights up its primary, secondary and stabiliser muscles.
- **Date slider:** shows the body as of any day in the last year; data after that day is ignored.
- **Logging:**
  - workouts (exercise, sets, reps, kg, optional RPE, side for unilateral moves)
  - soreness check-ins
  - fitness tests (10 types)
  - workout history with delete, and JSON export

## Individual muscles (added 31 October 2026)

- **What it is:** turn on **Individual muscles**, or pick one from a muscle's panel, to tap and colour single muscles, such as rectus femoris, the biceps femoris short head, the lateral deltoid, the upper trapezius, supraspinatus or the gluteus medius.
- **Where they come from:** they are the existing model's own separate surfaces, identified by geometric rules and checked visually (`docs/ANATOMY-AUDIT.md`). Groups whose surfaces can't be identified reliably stay whole.
- **How part values are estimated:** the group's sets are weighted by how each exercise loads each part (`PART_FACTORS` in `kit/sport/exercises.js`). For example, Romanian deadlifts barely load the biceps femoris short head because it doesn't cross the hip; incline pressing favours the clavicular head of the chest; lateral raises favour the lateral deltoid. These values are labelled *estimated*.

## Recommendations

`kit/sport/recommend.js` makes suggestions only from logged data, and each one shows the numbers behind it and whether it is *calculated*, *estimated* or *measured*:
- still recovering
- ready to train
- not trained for 14+ days
- below or well above the common 10–20 sets/week guidance
- about once a week (suggests splitting the sets over two sessions)
- push vs pull balance
- quadriceps vs hamstrings balance
- left vs right differences
- strength dropping, flat or rising (estimated 1RM)
- tests due for a retest

**Show** lights up the muscles a suggestion concerns.

## Provenance labels

Every number in the panel carries one of four tags:
- **logged:** what the user entered
- **calculated:** arithmetic on the logs
- **estimated:** a model on top of the logs (recovery, individual muscles, e1RM trends)
- **measured:** test results

## Files

| File | Role |
|---|---|
| `kit/sport/exercises.js` | The 17 muscle groups (mapped to anatomy mesh names), 40 exercises with muscle weights, part factors per exercise, 10 fitness tests |
| `kit/sport/anatomy-parts.js` | Individual muscles inside the group meshes: names, functions and identification rules |
| `kit/sport/recommend.js` | Recommendations from logged data |
| `kit/sport/body-intel.js` | Pure calculations (no DOM), tested in `tests/body.test.mjs` |
| `kit/sport/body-store.js` | Storage: this browser when signed out, the Gradify account (Supabase) when signed in. Browser data moves into the account on first sign-in |
| `kit/sport/body-view.js` | The Three.js view (reuses `kit/models/anatomy-glb.js` and the viewer's texture helpers) |
| `kit/sport/body-app.js` | The page UI |
| `kit/styles/body.css` | Styles, responsive down to phone width |
| `supabase/migrations/20261031120000_sport_body_intelligence.sql` | `workouts` (sets as jsonb), `body_checkins`, `fitness_tests`, all owner-only RLS |

## Shared Gradify systems it uses

- **One account:** the same Supabase sign-in as every Gradify site (`kit/data/store.js`).
- **XP and activity:** saving a workout (+15 XP), a fitness test (+10) or a check-in (+3) writes to `public.activity` with `site = 'SportGradify'`. That is the same table that drives XP, streaks and the activity heatmap for Learn, so Sport counts in the one personal development system. XP is only ever added through activity rows (the existing `guard_xp` trigger).

## Switching on account storage

Run the new migration in the Supabase SQL editor, after the two existing ones (see `docs/SETUP.md`). It has been verified on Postgres (PGlite) with a stand-in `auth` schema: the migrations apply in order, each user only sees and changes their own rows, a user can't insert rows for another, invalid values are rejected, and workouts add XP to the shared profile. **The live site has no Supabase project configured yet** (`gradify.config.js` is empty), so today everyone uses browser storage. Signed-in persistence needs the project URL and anon key added before it can be tested end to end.

## Known limitations and next steps

- **Muscle-weight model:** muscle weights are an educational model from standard exercise-science descriptions of each lift, not a measurement of a person's muscle activation.
- **Mesh grouping:** back, forearms, calves, shins, neck and the shoulder girdle are still selectable only as groups. Importing BodyParts3D's per-muscle meshes would fix that at no licence cost (`docs/ANATOMY-AUDIT.md`).
- **Visual quality:** the asset is untextured scan geometry. The materials and lighting push it as far as a procedural approach allows. The next quality steps, without buying anything, are screen-space ambient occlusion and a subtle depth of field for close-ups. Assess a premium replacement after user testing (decision 4).
- **Possible extensions:** workout templates and editing past workouts, and wearable or Apple Health import (needed for the iOS app).
