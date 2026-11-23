# Organic Chemistry Lab: independent chemistry review

This folder is the review pack for SciGradify's Organic Chemistry Lab. The lab's chemistry is rule-based and
deterministic (`kit/labs/chemistry/reactions/`), and it is tested against a hand-written reference set. That shows the
lab is **consistent with the reference set**, not that the set is right. This review is what moves the chemistry from
*provisional* to *reviewed*.

## What to review

| File | Rows | What each row is |
|---|---|---|
| `reference-review.csv` | 302 | a starting material, a reagent and conditions, the expected outcome, and what the lab predicts with its first reason |
| `mechanisms-review.csv` | one per mechanism step | the arrows (electron flow), what the engine says happens, and the explanation students see |

For each row, fill in **verdict** (`agree`, `disagree` or `unsure`), and for anything other than `agree` a
**correction** (the right outcome) and a **comment**, plus your name and the date. Leave rows blank if you didn't
review them.

Please pay particular attention to:

* regioselectivity (Markovnikov, Zaitsev and Hofmann, aromatic directing effects) and stereochemistry notes;
* the SN1 / SN2 / E1 / E2 competition outcomes (`competition.js`; the major/minor labels are qualitative rankings);
* carbocation stability, and cases where a rearrangement would actually happen (the lab doesn't model shifts);
* electrophilic aromatic substitution, especially rings with two substituents;
* Grignard reagents with other functional groups present;
* acid/base conditions and competing reactions in molecules with more than one functional group;
* whether each predicted product is plausible under the stated conditions;
* cases the lab predicts that it should **decline** instead (and cases it declines that are safe to predict).

The expected outcomes come from standard A-level and first-year sources. The source column gives topic pointers
(the AQA 7405 specification and Clayden's *Organic Chemistry*), which haven't been checked line by line either; please
note any that are wrong.

## Returning the review

Send back the completed `reference-review.csv`. It is imported with

```bash
node scripts/organic-review.mjs import reference-review.csv
```

which adds the verdicts to `kit/labs/chemistry/reactions/reviews.js`. Imports are cumulative: a row left blank keeps
whatever verdict that case already has (so a partial review can be returned in parts), and the verdict `clear` removes
a recorded one. If any row is invalid (an unknown case id or a verdict other than agree, disagree, unsure or clear),
nothing is written: fix the rows and import again. A file that ends inside a quoted field (a truncated
export) is refused the same way.

The verdict columns in a freshly exported pack are always empty; any verdict already recorded for a case is shown in
the read-only *recorded review* column. Only what is typed into the verdict columns is imported, so returning an older
copy of the sheet can't bring back a verdict that has since been replaced. Each verdict records the outcome it was given
for: if a case's expected outcome is edited later, an earlier *agree* no longer counts (the case goes back to
*provisional*, marked "please review again" in the pack); a *disagree* keeps the case disputed until a new verdict. A case marked `agree` becomes *reviewed*; a
`disagree` marks the case and its rule *disputed* (the lab and its tutor then show the reviewer's note) until it is fixed (to the reference set, the predictor, or both). Regenerate the
pack after changes with `node scripts/organic-review.mjs export`.

## Confidence levels

| Level | Meaning |
|---|---|
| provisional | written from standard textbook chemistry and tested; not yet independently reviewed (everything, at present) |
| reviewed | an independent chemist agreed with it |
| validated | reviewed, and confirmed against a cited source |
