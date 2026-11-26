# The source registry: from nine rows to a global allowlist

Status: plan, owner's request of 25 Nov 2026. Nothing here is built yet. Today's registry is
`kit/curriculum/sources.js`: one row per publication, its licence quoted from the publisher, the use that licence allows
(`adapt`, `facts-only` or `none`), and a named person's confirmation before anything can be adapted. It has 9 rows:
6 OpenStax books, NCBI Bookshelf, BBC Bitesize and AQA's specifications, all effectively facts-only. Briefs may cite
only listed sources (`allowlistProblems`, `scripts/content/loop.mjs`), and lessons may cite only their brief's sources
(the sources gate, `scripts/content/gates.mjs`).

## The principle that doesn't change

Permission to use a source's facts is not permission to reuse its wording. `facts-only` means a researcher may read it
to check facts and Gradify writes everything in its own words; only `adapt`, confirmed by a named person, allows reuse of
expression. The engine can check copying against the specification (it holds that text locally) but not against every
source, so the writing rules and the review carry that check for sources.

## Two kinds of evidence, kept apart

| Kind | What it establishes | Examples | How briefs use it |
|---|---|---|---|
| **Requirement source** | What must be taught or assessed | Exam-board specifications, national curricula, regulators' standards, module handbooks | The requirement itself (`kit/curriculum/specs/`); never a source of explanations |
| **Knowledge source** | What is true, and how it's explained | Textbooks, open textbooks, peer-reviewed research, government data, reference works | `F:`, `BG:`, `DEF:`, `NUM:` lines, two sources for any non-trivial fact |

A brief needs three independent publishers. A requirement source counts towards that only for facts about the
requirement (what an exam rewards), never for subject facts.

## Fields to add to each row

Only what a real decision uses:

- `kind`: one of `curriculum` (government or national curriculum), `exam-board`, `regulator` (professional standards),
  `university` (course materials, module handbooks), `peer-reviewed` (journals), `textbook` (commercial),
  `open-textbook`, `reference` (encyclopaedias, data agencies, standards bodies), `public-service` (BBC, NHS and similar).
- `evidence`: `requirement` or `knowledge` (the table above).
- `jurisdictions`: ids from the jurisdiction registry (`gb-eng`, `us-ca`, `int`). Empty means anywhere.
- `subjects` and `levels`: where the publisher is a recognised authority, so a researcher's ALLOW list is the relevant
  rows, not the whole registry.
- `verification`: `listed` (added from its own pages), `licence-checked` (licence quoted with a date) or `confirmed` (a
  named person agreed the row). The effective use stays at most `facts-only` until `confirmed`, as today.

Owner, licence, use, commercial, text and figures, URL prefixes and holds stay as they are.

## Growing it

- **Rows by subject wave.** Each new subject or jurisdiction adds the rows its first topics need, by PR: the specification
  owner, two or three standard textbooks or open textbooks, the relevant regulator, and one reference source. Merging the
  PR is the owner's approval.
- **Publisher families**, not individual pages: one row per publication with URL prefixes, as today.
- **Peer-reviewed research** can't be listed journal by journal. Its row would allow any DOI resolver URL, as
  `facts-only`, for `BG:` and `F:` lines at undergraduate level and above.
- **The research request** lists only rows matching the topic's subject, level and jurisdiction, so a GCSE Biology
  researcher isn't handed law reports.

## What this needs in code (small)

1. Add the fields to `sources.js` and to `checkSources` (each new field validated).
2. Filter `allowLines()` by the topic's subject, level and jurisdiction.
3. Count publishers for independence by `owner`, as today, and check the requirement-versus-knowledge rule in
   `allowlistProblems`.

No database or separate service is needed: the registry stays one reviewed file, as the specification registry is.
