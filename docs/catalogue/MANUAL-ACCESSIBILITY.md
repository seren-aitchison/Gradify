# Catalogue search: manual screen-reader checks

Automated checks (axe-core, keyboard) run in CI (`scripts/catalogue/harness.cjs`). **Screen readers have to be checked
by a person.** These procedures use the reference search box; Stage 5's real onboarding repeats them before release.

## Setup

1. Run `node scripts/catalogue/harness.cjs` once to confirm everything builds.
2. Serve the harness (any static server whose root is the repository, with `/catalogue-build/fixtures/` pointing at a
   build of `data/catalogue/fixtures/bundle.json`). Then open `/scripts/catalogue/harness/index.html?ds=fixtures`.

## Procedure (repeat for each screen reader)

| # | Do | Expect to hear |
|---|---|---|
| 1 | Tab to the search box | "School, college or university, combo box, collapsed, edit text" (wording varies by reader) |
| 2 | Type `north` | The list opens; "2 suggestions. Use the arrow keys to choose." |
| 3 | Press ↓ | "Northmoor College" or "Northmoor University", with its town; position in the list (e.g. "1 of 3") |
| 4 | Press ↓ until "Not listed" | "Not listed: use 'north'. Links nothing; you can import a handbook later" |
| 5 | Press Escape | The list closes; "collapsed"; the text stays |
| 6 | Type `fernbridge`, press ↓ twice | "Old Tannery School, Fernbridge · Closed" (closed is spoken, not just shown) |
| 7 | Press Enter | "Chosen: Old Tannery School" is announced |
| 8 | Clear the box, type `Zzyzx`, then ↓ and Enter | "No matches. You can use what you typed."; then "Using 'Zzyzx' (not linked to the catalogue)" |
| 9 | Turn on reduced motion and dark mode, and repeat 2–3 | Same speech; highlight visible |
| 10 | Zoom to 200% | No clipped text; the list stays usable |

## Results

| Reader and platform | Version | Tester | Date | Steps passed | Issues |
|---|---|---|---|---|---|
| VoiceOver, macOS (Safari) | — | — | **Not yet run** | — | — |
| VoiceOver, iOS (Safari) | — | — | **Not yet run** | — | — |
| NVDA, Windows (Firefox or Chrome) | — | — | **Not yet run** | — | — |

These need a person with each device. Nothing here is claimed as passed until a row is filled in.
