# Non-negotiable rules

From the Gradify Knowledge Engine Master Plan (24 Nov 2026), word for word. They apply in every milestone and every session.

1. **Approval boundaries.** No merge or deployment without explicit owner approval. No changes to auth, billing, user data or unrelated production systems.
2. **Never invent structure.** Don't create exam boards, qualifications or official requirements where none exist. Model each system as it really is. If a framework is missing, report it as missing.
3. **Label every requirement's status.** Statutory, official expectation, attainment, developmental indicator, recommended, or Gradify supplementary. Never present a supplementary objective as compulsory.
4. **Age equivalence is not curriculum equivalence.** England Year 9 and US Grade 8 resolve to their own requirements, even when one lesson serves both.
5. **Keep layers separate.** Requirements live in the registry, content lives in lesson files, and presentation lives in the renderer. A lesson never edits a requirement, and a simplified lesson for one level never replaces the lesson for another.
6. **Evidence and licence gate.** Lessons cite what they were checked against in SRC: lines. A specification proves a requirement exists, not that an explanation is correct. Similarity checks are warnings, never permission. Nothing derived from a source without adaptation rights gets published. Write original content and use sources to verify facts.
7. **Two publishing tiers.** AI-verified content can go live only after independent model verification and every deterministic check pass, and students see that label. Expert-approved needs a named reviewer. High-risk content (calculations, required practicals, safety, health topics, anything flagged or reported) must be expert-approved before it goes live. Automated QA alone never publishes anything.
8. **Coverage stays honest.** Unknown stays unknown. Coverage reports split frameworks found, requirements extracted, AI-verified and expert-approved.
9. **Reuse first.** Map existing lessons before writing. Generate only the gap. Never write the same explanation again for a different format or board.
10. **The repository is the source of truth.** Handovers name an exact branch and commit. Each session checks the repo state before editing.
11. **Spend tokens only on reasoning.** Content is written by non-coding AI in the notes format; Claude Code changes only engine code. Scripts handle parsing, checking, filing and rendering. Bulk drafting goes through the Batch API.
12. **Keep what works.** Use the existing Gradify lesson renderer, diagram library and course engine. No parallel lesson formats.
13. **One lesson, many requirements.** A lesson carries a REQ: line for every equivalent requirement it teaches, across boards and countries. Board differences go in a short section of the same lesson. Each requirement's page is built from the lessons that list it.
14. **Approve files, not claims.** Approval is per lesson file. Any edit to the file resets its tier until the gates and review pass again.
15. **Claude Code by exception.** Coding sessions change engine code only when a gate fails systematically. Every coding prompt names the files to read; no exploring or auditing.
16. **Write from briefs only.** Lessons are written from the topic's cited brief, never from the open web or memory alone. Every brief uses at least three independent sources, and conflicts go to an expert.

Also from the plan: new ideas go into the Deferred list, not the active brief, until the milestone in progress ships. Optimise for the least wasted effort and the most verified content, never fewer tokens at the cost of accuracy.

## Fixed decisions (25 Nov 2026, added to the Master Plan; rules 1–16 stand)

- **A. Canonical content** is the research briefs plus the lesson files. The knowledge items from #201 (`kit/knowledge/`) are a seed for briefs. There is no second licence gate or QA path for content.
- **B. Requirement records** carry a status (statutory, official, attainment, developmental, recommended or supplementary), a type (spec-bullet, assessment-objective, practical or guidance), the specification's version, publication date and applicable period. The queue refuses an index without them (`checkIndex`, `scripts/curriculum/engine.mjs`).
- **C. `PRE:`** lines name prerequisites: a lesson title in the course or unit, or a requirement id. They are parsed and checked by the coverage gate. There is no graph store.
- **D. Each filed lesson records** its brief fingerprint, a hash of each prompt file, its models and its template (`scripts/content/build.mjs`). A change to any of them requeues only the lessons that used it.
- **E. Flashcards, the specification explorer, the glossary and the question bank** are views generated from the notes. They are never authored separately.
- **F. The status ladder** in the report runs: not researched, framework found, spec imported, mapped, drafted, gates passed, AI-verified, expert-required, expert-approved, published, needs update.
- **G. Source conflicts and background** (owner's decision, 25 Nov 2026). Expert review is for unresolved or high-risk material, not the default outcome of a cautious brief.
  - A brief `CONFLICT:` sends a lesson to an expert only if the lesson relies on it and doesn't resolve it. It's resolved when the reviewer names the `!:` line that identifies the disagreement, represents each account accurately, explains why they differ or that it's unsettled, and presents no disputed point as fact (`Cn=L<n>`). The engine must also confirm that the Researcher marked it `stakes=low`, that it names no high-risk keyword, that the line is a `!:` line, and that the lesson cites at least two of its sources (`conflictsOf`, `scripts/content/loop.mjs`). An unmarked, high-stakes or unverified conflict still goes to an expert, and merely mentioning one isn't enough.
  - Briefs carry the sourced background a complete lesson needs (`BG:` lines, held to the same sourcing as `F:`), kept separate from the core facts the requirements teach. Writers still use only the brief, and background never becomes an objective or an assessed point.
- **Sources:** briefs cite only publications on the allowlist (`kit/curriculum/sources.js`). Each source's licence class comes from its row there. Nothing gets "adapt" without a named person's confirmation.
