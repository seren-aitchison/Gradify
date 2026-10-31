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

## Files

| File | Role |
|---|---|
| `kit/sport/exercises.js` | The 17 muscle groups (mapped to anatomy mesh names), 40 exercises with muscle weights, 10 fitness tests |
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

Run the new migration in the Supabase SQL editor, after the two existing ones (see `docs/SETUP.md`). Until then, signed-in users fall back to browser storage, so the page keeps working.

## Known limitations and next steps

- **Muscle-weight model:** muscle weights are an educational model from standard exercise-science descriptions of each lift, not a measurement of a person's muscle activation.
- **Mesh grouping:** the anatomy mesh groups muscles (for example biceps and triceps together as "Upper arms", lats and erector spinae as "Back"). Selecting individual muscles would need a finer-grained mesh; that's part of the premium-asset assessment.
- **Visual quality:** the asset is untextured scan geometry. The materials and lighting push it as far as a procedural approach allows. The next quality steps, without buying anything, are screen-space ambient occlusion and a subtle depth of field for close-ups. Assess a premium replacement after user testing (decision 4).
- **Possible extensions:** workout templates and editing past workouts, and wearable or Apple Health import (needed for the iOS app).
