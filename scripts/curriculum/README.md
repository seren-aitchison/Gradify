# Curriculum mapping pipeline

Maps a Gradify course's lessons and resources to official curriculum requirements, statement by statement. The pilot covers SciGradify Biology against England, years 1 to 11. The audit and findings are in `docs/curriculum/BIOLOGY_ENGLAND_AUDIT.md`. The generated coverage report is `docs/curriculum/biology-england-coverage.md`.

Four datasets stay separate, and each is written by one step:

| Dataset | File | Written by |
|---|---|---|
| Official requirements | `data/curriculum/requirements/england-biology.json` | `extract-specs.py` (from the published documents) |
| The course's own syllabus and resources | `data/curriculum/inventory/<slug>.json` | `inventory.mjs` (from `kit/courses/<slug>/`) |
| Lesson → requirement mapping (judged) | `data/curriculum/mapping/<slug>-england.map`, the source you edit, built into `<slug>-england.json` | a person or AI mapper, then `build-mapping.mjs` |
| Resource mapping, coverage, progress | `…-england-resources.json`, `data/curriculum/reports/…`, `data/curriculum/progress.json`, `docs/curriculum/…-coverage.md` | `report.mjs` |

The review status lives in the mapping file (`review`). It stays `ai-drafted` until a named subject specialist checks the links. The tests fail if anything is marked verified without one.

## Running it

```bash
node scripts/curriculum/inventory.mjs biology
node scripts/curriculum/build-mapping.mjs biology --review
node scripts/curriculum/report.mjs biology
node scripts/curriculum/review-queue.mjs biology
node --test tests/curriculum-mapping.test.mjs
```

Re-run `inventory.mjs` whenever lesson notes change, then rebuild and re-run the report. The test fails when any of these files is stale.

To re-extract the requirements (only when a source document changes), download the documents listed in `SOURCES` in `extract-specs.py` into one folder, then convert them:

- PDFs: `pdftotext -layout aqa.pdf aqa.txt`, and the same for `edexcel`, `ocrA` and `eduqas`. `ocrB.pdf` is read directly with pdfplumber.
- The GOV.UK page: `python3 -I scripts/curriculum/html2txt.py ncsci.html > ncsci.txt`.

Then run:

```bash
python3 -I scripts/curriculum/extract-specs.py <folder> data/curriculum/requirements/england-biology.json
```

Don't commit the documents: they are the boards' and the DfE's copyright. Requirement ids come from each document's own references (`eng-aqa8461-4.1.1.2`, `eng-ocrj247-B1.1a`, `eng-nc-ks3-cells-and-organisation-01`), so they survive re-extraction. Diff the old and new files before committing.

## Review and states

The validation queue (`review-queue.mjs`) puts every undecided link in risk order:

1. links with no shared wording
2. the statutory key stage 4 programme
3. the GCSE specifications, board-unique statements first
4. practical skills
5. key stages 1–2
6. the rest

A reviewer is listed once in `data/curriculum/review/<slug>-england-decisions.json`, with name and qualifications. Each decision is `confirmed`, `changed` or `rejected`. A changed or rejected link must also be corrected in the `.map` file, and the build fails until the two agree.

The mapping's overall status follows the decisions: `ai-drafted`, then `partly-reviewed`, then `reviewed`.

The course's state in `kit/curriculum/coverage.js` (`mapping`) moves by hand: none → drafted → reviewed → sources-verified → approved. `check()` requires the reviewer, the source checker and the sign-off for each step. The mapping state never changes the learner-facing claim (`serves`).

## Importing an existing dataset

Don't re-extract documents someone has already extracted. Put the dataset in the record shape of `kit/curriculum/requirements.js` (`{ sources, requirements }`), then dry-run:

```bash
node scripts/curriculum/import-requirements.mjs <dataset.json>
```

Add `--write` to merge. Records keep their ids and gain `importedFrom`. Anything already present (same id, or same source and reference) is reported for a person to reconcile, never overwritten.

## Writing mappings

One line per requirement in the `.map` file (format in its header):

```
ocrj247-B3.3e = u07-23 F h; u10-23 P h
aqa8461-4.5.2.3 = none | No lesson teaches the structure of the eye, accommodation or the correction of myopia and hyperopia.
nc-ks3-cellular-respiration-03 = u08-18 P m; u09-29 P m | Anaerobic respiration in plants and fermentation by microbes are taught; anaerobic respiration in humans (lactic acid) is not.
```

- `F` full: one lesson teaches all of it. `P` partial. `I` indirect: touched on, or only a prerequisite.
- Confidence is `h`, `m` or `l`.
- A requirement without a full match must say what is missing. A note starting `above:` means the idea is taught at a level well above that stage.
- Judge from the lesson's objectives and headings first. Search the notes only when that is ambiguous. Never match on titles alone.

Use `candidates.mjs` (a BM25 shortlist) and a notes search to find lessons. `build-mapping.mjs` attaches the best-matching objective, heading, key term or notes sentence as evidence. `--review` lists links whose wording doesn't overlap the requirement at all, so title-only matches get checked.

## Counting rules

- A requirement counts once, at its strongest single lesson link.
- Partial lessons never add up to a full match, and resources never add to a requirement's count.
- Full, partial, indirect and uncovered are reported as separate figures, never combined into one percentage.
- Gaps are kinds, not just counts: **missing** (no lesson), **depth** (part taught) or **age-level** (primary content at secondary depth). They are prioritised GCSE, then key stage 3, then practical, then primary.
- Each source's `notExtracted` list blocks any claim of comprehensive coverage until it is empty.
- Resources inherit their lesson's links. A resource is "specific" when its own wording matches the requirement.
- Level-3 questions under key stage 1 to 3 requirements are flagged as above stage.

## Adding a subject or country

1. Extract that curriculum's requirements into a new `data/curriculum/requirements/<system>-<subject>.json` with the same record shape.
2. Run `inventory.mjs <slug>`.
3. Write `<slug>-<system>.map`.

The scripts take the slug as an argument. The requirements file name is still fixed to `england-biology`, so generalise it in the next subject's first change.
