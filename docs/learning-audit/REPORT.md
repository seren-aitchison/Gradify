# Gradify learning-quality audit and Visual Learning Engine pilot

November 2026. Based on the lesson source files in `kit/courses/*/notes/`, the lesson engine in `kit/course/`, and the real lesson pages opened in a browser. The engine itself is documented in [`docs/VISUAL-LEARNING-ENGINE.md`](../VISUAL-LEARNING-ENGINE.md).

**Nothing has been deployed, merged or mass-rewritten.** The pilot diagrams are hidden from learners until a named person approves them; preview them with `?diagrams=preview`.

## 1. Headline findings

1. **The lessons are short, compressed and mass-templated.** There are 9,979 lessons in 34 courses. The median lesson has **269 words of teaching** (10th–90th percentile: 188–386), about one printed page. One skeleton (3 sections, 1 worked example of exactly 4 steps, 2 flashcards, 3 check questions) or a close variant covers most of the corpus: **4,321 lessons (43%) have exactly one worked example of exactly four steps**, and **97% have two flashcards or fewer**. That is a quota, not teaching judgement.
2. **Accuracy is generally good.** I read 14 lessons in full across chemistry, physics, maths, biology, business and law. I found no false core content. The problems were pedagogical: a fact filed as a "common mistake" (thin lenses), named concepts missing (Markovnikov's rule), absurd distractors, and summaries cut to fragments ("Inversion."). This was a sample, not a full accuracy audit (see §6).
3. **The assessment has a systematic, fixable flaw.** In **33% of single-answer questions the right answer is at least 30% longer than every distractor** (art 51%, chemistry 48%, biology 46%). Students can guess these without knowing the content. A narrow pattern search also found **107 implausible distractors**, such as "Tertiary substrates are always gases" and "Limits in a Hausdorff space are always zero".
4. **Visual teaching is the biggest gap.** About 1,800 lessons are about something that is inherently visual (mechanisms, circuits, graphs, anatomy, cycles); **92% of them have no diagram or interactive**. The lesson called *Free-body diagrams* had no diagram. *SN2 mechanisms* and *Curly arrow notation* describe curly arrows only in words.
5. **The existing "glass diagrams" are not teaching diagrams.** Every lesson gets five (`kit/core/glass-diagrams.js`), built by rearranging the lesson's own sentences into boxes: section maps, bullet hubs, formula cards, flowcharts of worked-example steps. They repeat the text rather than explaining it visually, and five per lesson is the kind of quota you warned against.
6. **The lesson page buries the teaching.** In the SN2 lesson on a phone, 254 words of teaching sit in a **13,000 px page (about 15 screens)**. The first teaching sentence is **1.7 screens down**, after four tool cards. A floating progress rail **covers the lead sentence**. Screenshot: `screens/ux-chemistry-lesson-phone.png`.

## 2. Subject-by-subject

Words = mean teaching words per lesson. Cue = % of single-answer questions where the longest option is the answer. No-ex = % of lessons without a worked example. Visual gap = % of visual-topic lessons with no diagram or interactive. Full data: `corpus-metrics.json`.

| Course | Lessons | Words | Cue | No-ex | Visual gap | Notes |
|---|---:|---:|---:|---:|---:|---|
| physics | 1,308 | 200 | 38% | 0% | 89% | Shortest lessons; **no SRC sources in any lesson**; older format with no objectives or level |
| maths | 1,077 | 221 | 32% | 0% | 91% | 59% of teaching text is bullets; most "always zero" distractors are here |
| nursing | 497 | 271 | 37% | 100% | 100% | No worked examples (vignettes appear only in questions); list-heavy |
| law | 480 | 229 | 24% | 96% | 93% | CASE cards stand in for worked examples; lowest cue rate of the big courses |
| sociology | 438 | 281 | 27% | 0% | 65% | Mostly prose (8% bullets) |
| chemistry | 410 | 219 | 48% | 2% | 89% | Accurate but mechanisms are not drawn; worst cue rate among the sciences |
| psychology | 393 | 273 | 24% | 2% | 56% | 17 implausible distractors |
| biology | 391 | 245 | 46% | 8% | 91% | 128 visual topics (cells, pathways, organs) |
| pharmacy | 318 | 199 | 30% | 80% | 98% | Short; few worked calculations |
| history | 301 | 307 | 42% | 0% | 86% | Timelines exist only as glass diagrams |
| medicine | 234 | 354 | 36% | 0% | 96% | Anatomy needs illustration, not boxes |
| other 23 courses | 3,962 | 280–407 | 9–51% | 0–1% | 63–100% | Spanish (9%) and careers (11%) have the healthiest questions |

## 3. Prioritised lessons

`priority-lessons.csv` ranks the 500 lessons with the most to gain. The score adds: a visual topic with no visual (3), no worked example (2), each answer-length cue (1), each implausible distractor (1), list-heavy text with little causal explanation (1), and two flashcards or fewer (0.5). **Treat it as a triage list, not a verdict.** The "visual topic" test is a keyword match and over-flags some lessons; for example, "Family support" is flagged because its lead mentions a model. The top of the list is nursing, pharmacy and biology.

## 4. The pilot: 11 diagrams in 10 lessons

| Lesson | Diagram | What the build checks |
|---|---|---|
| Chemistry · SN2 mechanisms | Hydroxide + (R)-2-bromobutane → TS‡ → (S)-butan-2-ol | Curly arrows run on the electrons and must give the product; R/S read from the drawn wedges |
| Chemistry · Electrophilic addition | HBr + propene via the secondary carbocation | Arrow bookkeeping across 2 steps; conservation |
| Chemistry · Electrophilic addition | Br₂ + cyclohexene → bromonium (top face) → trans-1,2-dibromide | Arrow bookkeeping; drawn product must read as trans |
| Chemistry · Reaction energy profiles | SN2 vs SN1 profiles | Maxima/minima, intermediates, rate-determining step, sign of ΔH |
| Physics · Free-body diagrams | Box pushed up a rough slope | Every force has a source; N ⟂ slope; N = mg cos θ + P sin θ reproduced; arrows to scale |
| Physics · Thin lenses | Object beyond 2F, at 2F, inside F | Drawn rays intersected; must match the lens equation and the stated image nature |
| Physics · Kirchhoff's laws | Two opposing cells in a loop | Loop law from drawn polarities; 1 A, driven by the 6 V cell |
| Maths · Transformations of functions | f, 3f(x − 1), f(2x) − 5 | Maxima at (4, 6), (5, 18), (2, 1) found numerically |
| Biology · Oxygen transport | Dissociation curves: adult, high CO₂, fetal | Saturation at lung and venous pO₂; shift directions |
| Business · Supply and equilibrium | Equilibrium, shortage, demand shift | Intersections at (60, 20) and (70, 25); shortage of 20 at P = 15 |
| Law · Duty of care | Robinson / Caparo / omissions decision tree | Every path ends in an outcome; every cited authority appears in the lesson |

**Review history, reported honestly:**

- All 11 diagrams passed every automatic check **before** the independent review.
- The independent reviewer still **rejected the law diagram** as legally oversimplified. "Not novel → duty exists" ignores precedents that deny a duty, the omissions branch was a dead end, and Q3 and Q4 put back the three-stage test.
- The reviewer also found that the Br₂ diagram claimed anti addition a flat ethene drawing cannot show, and that the free-body arrows contradicted the lesson's own point (N was drawn shorter than mg).

All of these were fixed. A **second review round approved all 11** and caught one more real error, this time in the existing lesson: the law lesson's key point said "is this an established category? If so, the duty exists", which contradicts Robinson. That line is now corrected. Every diagram is now `ai-reviewed`: shown in preview, hidden from learners until a named subject reviewer approves it. The round-by-round notes are in each spec's `review` field. **This is the main lesson of the pilot: automatic checks catch wrong electrons, numbers and geometry, but not wrong emphasis or oversimplified law. Human subject review must stay in the loop, above all for law, clinical content and mechanisms.**

Small content fixes made in the pilot lessons:
- Thin lenses: the mislabelled "common mistake" became a fact bullet, and a real misconception was added.
- Electrophilic addition: added the Markovnikov product and name.
- Replaced two implausible distractors with real misconceptions.
- Law, duty of care: corrected the key point so it no longer says an established category always means a duty exists.
- Physics, thin lenses: moved the power-addition fact under "Types".

Screenshots of every pilot diagram at desktop and phone widths are in `screens/`. One full-page phone capture (electrophilic addition) came out blank in headless Chromium, apparently because of the site's GPU glass layer at that scroll position, so it was dropped; the per-diagram phone captures of that lesson are fine.

## 5. UX and navigation (signed out; same lesson engine as signed in)

| Measure | Desktop | Phone |
|---|---|---|
| SN2 lesson page height | 9,929 px | 13,036 px |
| First teaching sentence | 1,047 px down | 1,435 px down |
| Glass diagrams per lesson | 5 | 5 |
| Controls under 32 px (sample lessons) | 61–83 | 39–57 |
| Chemistry course home | no overflow | **scrolls sideways** (top toolbar's more and search buttons extend to 587 px) |

Recommendations, in order:
1. **Teaching first.** Put the lead and the first section before the tool cards (Check yourself, Flashcards, Interactive, School quiz), and move those cards to after the notes.
2. **Fix the phone progress rail** so it never covers lesson text.
3. **Cut glass diagrams from five per lesson to none by default.** Keep only kinds that add something (timeline, compare, path), and only where the notes support them. Real diagrams replace the rest.
4. **Fix the course-home overflow** on phones.
5. **Homepage:** the "0 live · 0 in beta" you saw was placeholder text that JavaScript replaces. It now ships with the real count (30 live; the directory has 32 sites, including 2 external ones). "Directory of all 30 sites" and the Plus/Pro/Ultra wording still need a business decision on what to call things.

Not done, because there are no credentials in this environment: the signed-in dashboard, spaced-repetition review and progress screens.

## 6. What this audit did not do

- **Full accuracy review.** 14 lessons were read in full; 9,965 were not. Accuracy at this scale needs subject reviewers working through the priority list, ideally with an AI first pass per lesson that a human then confirms.
- **Comprehension testing with learners.** Whether the diagrams improve learning needs real students: A/B test the pilot lessons on check-question scores.
- **Figma.** Not connected in this session, so not tested. Its recommended role is in `VISUAL-LEARNING-ENGINE.md`.

## 7. Scaling plan

1. **Approve the pilot** (a person signs off each of the 11 diagrams), switch them on, and measure check-question results before and after.
2. **Fix the assessment flaw corpus-wide.** It is mechanical and high-value: rewrite distractors so option lengths are balanced and every wrong answer is a real misconception. Start with chemistry, biology and art.
3. **Diagram rollout, subject by subject, by value:**
   - organic mechanisms (chemistry u12–u14, about 80 lessons);
   - physics forces, circuits, optics and fields (about 400 visual topics);
   - maths graphs (about 320);
   - biology processes (needs an illustration library, where Figma helps);
   - law decision trees, with legal review every time.
   - Claude drafts the specs from the lesson, the build checks them, and a person approves.
4. **Retire the fixed template.** Let lesson length and the number of examples and flashcards follow the topic. Some lessons need 600 words and three worked examples; some need 200 words.
5. **Physics sources.** Add `SRC:` lines to the 1,308 physics lessons, the only course with none.
