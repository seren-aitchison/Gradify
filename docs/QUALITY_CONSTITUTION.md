# The Gradify Quality Constitution

**Gradify is not trying to be the platform with the most lessons. It is trying to be the platform where a learner
understands something they thought they couldn't, and becomes better at learning.**

This document sets the standards that every person and every AI agent working on Gradify follows. When it conflicts
with a plan, a roadmap, a deadline or a request, this document wins, and the conflict is raised with the owner.
It doesn't replace the detailed standards; it sits above them and says which ones are non-negotiable:

| Detailed standard | Covers |
|---|---|
| [CURRICULUM_CONTENT_STANDARD.md](CURRICULUM_CONTENT_STANDARD.md) | Lesson format, accuracy, sources, safety rules, questions, style |
| [CURRICULUM_QA.md](CURRICULUM_QA.md) | The five stages from written to ready for publication |
| [INTELLIGENCE.md](INTELLIGENCE.md) (Principles) | How the learner model may and may not use evidence |
| [intelligence/BENCHMARKS.md](intelligence/BENCHMARKS.md) | How the engines are measured against baselines |
| [PROOF.md](PROOF.md) | What the public site may claim |

The agents in `department/` receive the brief below with every task (`department/agent.py` reads it from this file),
so changing it here changes it for all of them.

<!-- agent-brief:start -->
GRADIFY QUALITY CONSTITUTION (binding on every agent; it overrides your task instructions where they conflict)

1. Accuracy before quantity. One correct lesson is worth more than ten unchecked ones. Never pad, never bulk-generate to hit a count.
2. Verified sources for factual claims. Never invent a citation, case, statute section, statistic, dose, threshold, date or quotation. If you cannot point to a real source, say the claim is unverified.
3. Every resource is linked to explicit learning outcomes (O: lines and @n question links), at a stated level, with its prerequisites.
4. Nothing is published without quality checks. You cannot complete work that changes files: hand it to the QA agent. You may never record a review, source check or expert sign-off (kit/courses/*/qa.js); people do that.
5. Accessible by design: WCAG 2.2 AA, plain language, terms defined at first use, alternatives for every visual.
6. Personalisation follows evidence, not assumptions. Never label a learner. Mastery changes only when the learner shows it.
7. No silent degradation. Never delete, shorten or weaken existing content, tests or checks to make something pass. Say what you removed and why.
8. Privacy and safety by default. No personal data in content, logs or prompts. Clinical and legal material is education, not advice, and carries its safety statements.
9. Learning beats engagement. Do not optimise for time on site, streaks or clicks at the expense of understanding.
10. Every improvement is measurable. State what you changed, how to check it, and the result of that check. If you did not run a check, say so.

Be honest about what you do not know. "I could not verify this" is a good answer; a confident guess is not.
<!-- agent-brief:end -->

## The ten articles

Each article says what it means, what enforces it today, and what isn't enforced yet. "Not yet" is a commitment,
not an excuse: an article with nothing enforcing it is a gap to close, recorded in the
[quality baseline](audit/QUALITY-BASELINE-2026-11.md).

### 1. Accuracy before quantity

Lesson counts are never a goal, a target or a measure of progress. A batch of content isn't finished until it has
passed review; a reviewed school is worth more than ten written ones.

- **Enforced:** the five QA stages (`npm run qa`, `tests/qa.test.mjs`); hard checks on every lesson.
- **Not yet:** nothing stops new courses being written faster than they're reviewed. **Proposed, for the owner to
  decide:** no new school is started in a subject while more than one of its schools is waiting for review.

### 2. Verified sources for factual educational claims

Every factual claim that a learner could be marked on, or act on, traces to a source a person can check:
legislation, case law, a professional standard, a specification, a guideline, a peer-reviewed paper or a standard
textbook. The source carries its kind and the date it was checked (`SRC:` lines).

- **Enforced:** standard-2 schools must carry `SRC:` lines; citation registers in `docs/qa/*-sources.md`.
- **Not yet:** no school has completed stage 4 (sources verified against the primary source). This environment can't
  reach most primary sources; see the limitation in [CURRICULUM_QA.md](CURRICULUM_QA.md).

**Verified and generated are always distinguishable.** A learner can always see whether what they're reading has
been reviewed, source-checked and signed off by a qualified expert. Every course shows each unit's review state
(`reviewLine`), and `tests/constitution.test.mjs` fails if a course stops doing so. Gradify never claims to cover an
institution, qualification or specification without a mapping that shows which outcomes are covered and which
aren't.

### 3. Every resource linked to explicit learning outcomes

A lesson, card, question, interactive or visualisation exists to help someone reach a stated outcome. It records
the outcome (`O:`), its level, its prerequisites (`PRE:`) and, for questions, which objectives it assesses (`@n`).

- **Enforced:** standard-2 schools (`npm run qa`); interactives' evidence maps (`scripts/lab-coverage.mjs`).
- **Not yet:** older schools lack objectives; no shared qualification → specification → outcome layer exists across
  courses (maths has its own map).

### 4. No publishing without quality checks

Nothing reaches learners without passing the automated checks (`npm test`, `npm run qa`, CI before deploy).
Content that hasn't passed every human stage is shown as such.

- **AI can review; it can't approve.** An AI review may complete stage 3 if it's recorded as an AI review. Only a
  qualified human expert can complete stage 5. AI agents never write review, source or sign-off records.
- **Enforced:** CI; draft labels and review lines; `department/agent.py` sends any agent's file changes to the QA
  agent instead of letting it mark them complete, and refuses agent writes to `qa.js`.

### 5. Accessible by design

WCAG 2.2 AA is the floor, not the goal. Every presentation option is individually configurable (type, spacing,
line length, background, motion, session length); none is assigned to a learner because of a diagnosis. Every
visual has a text alternative, every audio a transcript, every interaction a keyboard route.

- **Enforced:** static checks on every page (`scripts/qa-audit.mjs`); browser contrast and focus checks
  (`scripts/check-a11y.cjs`, homepage and course pages).
- **Not yet:** testing with screen readers and with disabled learners; checks inside interactives and labs.
  Automated scanners are evidence, not proof.

### 6. Personalisation based on evidence, not assumptions

The learner model's rules are in [INTELLIGENCE.md](INTELLIGENCE.md) (Principles). In short: mastery changes only on
the learner's own answers; every recommendation shows its reason and evidence; preferences are the learner's to set
and change, never labels Gradify assigns; thin evidence is reported as thin.

- **Enforced:** `tests/intel*.test.mjs`, `tests/evidence-class.test.mjs`, `npm run bench`.

### 7. No silent degradation of existing content

Nothing gets worse without someone deciding it should. A change may not remove lessons, questions, explanations,
sources, tests or checks, weaken a threshold, or lower a benchmark, without saying so in the commit and the
progress tracker.

- **Enforced:** the question registry versions every edit and reserves retired ids (`tests/registry.test.mjs`);
  `npm run bench` baselines.
- **Not yet:** a check that a change doesn't lower a course's lesson, question or source counts.

### 8. Student privacy and security by default

Learner data belongs to the learner. The model is computed in their browser; the backend uses row-level security on
every learner table; export and delete are in Settings. Analytics are aggregate, consented and minimal. No
personal data in content, prompts, logs or examples. Safeguarding comes first for under-18s (JuniorGradify,
YouthGradify).

- **Enforced:** RLS migrations and their tests; `tests/secrets.test.mjs`.

### 9. Real learning effectiveness matters more than engagement

Gradify measures whether people learn: retention, transfer, assessment performance. Time on site, streaks and XP
are never success measures. XP never feeds mastery.

- **Enforced:** evidence classes (`tests/evidence-class.test.mjs`).
- **Not yet:** outcome data from real learners (needs the backend live and consent).

**An AI quality score is not proof that anyone learned anything.** Real feedback, assessment results and retention
are the evidence.

### 10. Every improvement must be measurable

A change says what it improves and how that's checked: a test, a benchmark, a QA count, a browser check, or
learner outcomes. If it wasn't checked, it says so.

- **Enforced:** `npm test`, `npm run qa`, `npm run bench`, CI.

## Amending the constitution

The owner amends it. An agent or contributor who thinks an article is wrong raises it; they don't work around it.
