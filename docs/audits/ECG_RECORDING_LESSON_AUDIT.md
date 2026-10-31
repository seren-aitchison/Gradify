# Lesson format audit: ECG recording (NurseGradify, School 6, lesson u06-24)

**Purpose.** An audit of the current lesson format, using *ECG recording* as the worked example. It identifies where diagrams, interactive visualisations and progressive assessment should go, how the lesson reads on a phone, and what the clinical safety review found. **No interface was rebuilt.** One small bug was fixed (see 3.4). Everything here is a recommendation for later, staged batches.

**Method.** I read the lesson source (`kit/courses/nursing/notes/u06.js`) and rendered it in Chromium at 390 px (phone) and 1280 px (desktop). I measured page height, section positions, tap-target sizes and sticky elements, and reviewed the content against the brief's clinical skills rules. **I could not check the primary guidance online**: SCST, Resuscitation Council UK, NICE and NMC are blocked by this environment's network policy. Every point marked **[verify]** needs checking against the current document before anything changes.

---

## 1. Summary

| # | Finding | Severity | Fix type |
|---|---|---|---|
| 1 | The lesson doesn't clearly separate **recording** an ECG, **recognising** that something needs urgent attention, and **interpreting** or diagnosing. It says interpretation is "a separate skill" only once, in the Urgency paragraph and the safety box | High (safety) | Content |
| 2 | **Infection prevention is missing** (single-use electrodes, cleaning leads and the machine, hand hygiene). The brief requires IPC for every clinical skill | High | Content |
| 3 | The **most common error the lesson names** (V1 and V2 placed too high) isn't taught. There's no guidance on finding the 4th intercostal space from the sternal angle | High | Content and diagram |
| 4 | **Limb electrodes are vague** ("as the machine and local practice specify"): no names (RA, LA, LL, RL), no colour codes, no warning that the two colour systems (IEC and AHA) differ, no check for limb lead reversal | Medium | Content and diagram |
| 5 | The lesson doesn't say **not to rely on the machine's automated interpretation statement** | Medium (safety) | Content |
| 6 | **Learning objective 2 (quality and labelling) has no question.** Found by the new objective links: q1 → 1, q2 → 3, q3 → 1 | Medium | Assessment |
| 7 | Assessment covers only Foundation and Application. There's **no Clinical reasoning item**, and the wrong options have no per-option explanations | Medium | Assessment |
| 8 | On a phone the lesson is **9 screens long**. The notes take about 2.5 of them and *Check yourself* about 3.5. Nothing collapses, and there's no in-lesson navigation | Medium (usability) | Interface, later |
| 9 | Small tap targets: the 35 lesson-progress dots are 6 px tall and the reorder buttons 36 px, against a 44–48 px minimum | Medium (accessibility) | Interface, later |
| 10 | The source is dated 2020 and needs checking against the current SCST guideline. Two specific statements also need checking: the breast tissue placement advice, and the order V1, V2, V4, V3, V5, V6 | **[verify]** | Sources |

The lesson is accurate as far as it goes, its tone is right, and it has a clear competence statement. The gaps are mainly omissions, and they sit in the parts of practice where errors happen.

---

## 2. The lesson format today (as rendered)

At 390 px, from the top of the page (page height 7,563 px, about 9 screens of 844 px):

| Position | Component | Source tag | Notes |
|---|---|---|---|
| 0–650 | Site header, course title, XP and level, standing notice, tabs | engine | The notice ("Education, not clinical authorisation") takes about 230 px on **every** lesson |
| 650–1,080 | Kicker (track · school · module), title, lead, chips (XP, question count, flashcards) | `S:` | The kicker wraps to **3 lines** of uppercase mono text |
| 1,090–1,190 | Draft notice | `cfg.qa` | Correct and needed until sign-off |
| 1,210–1,600 | Objectives and prerequisites panel | `O:` `PRE:` | Always expanded |
| 1,630–2,680 | Notes: four `H:` sections with bullet lists | `H:` `-` `P:` | Readable: 17 px type with a 27 px line height |
| 2,680–3,250 | Key point, safety box, common mistake | `K:` `SAFE:` `!:` | Three boxed callouts in a row, all of similar visual weight |
| 3,330–4,000 | Summary, key terms, sources | `SUM:` `T:` `SRC:` | Always expanded |
| 4,040–6,500 | Check yourself: 3 questions | `M1` `M2` `SEQ2` | Each question with the confidence rating is about 600–1,000 px. The ordering question alone is about 1,000 px |
| 6,500–6,900 | Complete lesson, Flashcards, Save notes and cards, prev/next | engine | |
| 6,900– | Sidebar content stacked below (XP, daily goal, milestone) | engine | |

There are **no diagrams, no `<details>` sections and no in-lesson navigation**. The only sticky elements are the tab bar and the exam results bar.

---

## 3. Content and clinical safety review

### 3.1 Recording, recognising and diagnosing

This is the most important change. The lesson should open with a short, boxed scope statement, and every later section, diagram and question should stay inside it.

| Level | What it means here | Who | In this lesson? |
|---|---|---|---|
| **Recording** | Preparing the person, placing electrodes accurately, obtaining a technically good trace, labelling, cleaning and handing over | Nurses and others who are trained and assessed as competent, under local policy | **Yes: the core of the lesson** |
| **Recognising that it needs attention now** | Escalating because of the **person's condition** (chest pain, collapse, new symptoms) or a **technical problem** (artefact, a reversed lead, a missing lead), not reading the rhythm. Recognising life-threatening monitor rhythms in a cardiac arrest is taught in resuscitation training (ILS/ALS), not here | All staff (clinical triggers); staff with resuscitation training (arrest rhythms) | **Yes, limited to clinical triggers and trace quality.** Arrest rhythms belong to *Basic life support* and later training |
| **Interpreting and diagnosing** | Reading the ECG, naming rhythms and abnormalities, deciding on treatment | Appropriately trained clinicians | **No.** Say so explicitly, and point to *Arrhythmias* (School 5) for background knowledge without implying the learner can interpret |

Suggested wording for a new scope box (as a `SAFE:` line at the top of the lesson): *"This lesson teaches how to record a good-quality 12-lead ECG. It doesn't teach you to interpret one. Escalate based on how the person is and on your local pathway, not on what you think the trace shows, and never delay showing an urgent ECG to a clinician."*

### 3.2 Gaps to fill (content only; each point **[verify]** before writing)

- **Infection prevention**: hand hygiene before and after; single-use electrodes; cleaning leads, clips and the machine between patients according to the manufacturer and local policy; standard precautions.
- **Finding the landmarks**: find the sternal angle (angle of Louis), then the 2nd rib beside it; the 2nd intercostal space lies below it; count down to the 4th. Say why V1 and V2 placed too high matters, without naming the patterns it mimics (that's interpretation).
- **Limb electrodes**: RA, LA, LL and RL; the IEC colour code (red, yellow, green, black) and the AHA code (white, black, red, green), with a warning that equipment differs, so check the labels; placed on the limbs, not the torso, for a standard diagnostic ECG; torso placement (as used for monitoring or exercise tests) must be labelled. A note on limb lead reversal as a technical check to report.
- **The automated statement**: the printout's computer interpretation must not be relied on, and must not delay escalation or replace clinical review.
- **Before removing electrodes**: check that the trace is complete, all 12 leads are present, the calibration mark is shown and artefact is minimal; repeat if not.
- **Serial ECGs**: use consistent positions so recordings can be compared. Local policy may allow marking positions.
- **Special situations**: additional leads (right-sided, posterior) only when requested, and clearly labelled; amputations, dressings, burns or wounds, and modified positions labelled; implanted devices noted on the request.
- **Consent and capacity**: what to do if the person lacks capacity (best interests, Mental Capacity Act 2005 in England and Wales; different law in Scotland and Northern Ireland, labelled). Chaperone and dignity are already covered.
- **Documentation and handover**: who the ECG was shown to, when, and what was done next.
- **Chest pain timing**: cite NICE guidance on acute chest pain and the local pathway, rather than an unsourced time.

### 3.3 Statements to verify against the current guidance

- The SCST recording guideline: confirm the current version and its date (the lesson cites 2020).
- Advice on breast tissue (beneath versus on the breast, at the correct anatomical level).
- The "usual" placement order (V1, V2, V4, V3, V5, V6) used in question q3.
- Standard paper speed and gain (25 mm/s, 10 mm/mV) and the filter settings to record.
- V5 and V6 level with V4 (horizontal plane), not following the intercostal space.

### 3.4 Bug fixed during the audit

The lesson header said "2 check questions" when the lesson has three. The count only included single-choice questions. It now counts every question type (`kit/course/course.js`).

---

## 4. Diagrams (static, accessible)

Each diagram is an inline SVG with `role="img"`, a `<title>` and `<desc>`. Each keeps the existing text list as its accessible equivalent, never conveys meaning by colour alone, and uses theme tokens so it works in light and dark. I recommend a new `FIG: id | caption` notes tag that renders a figure from `kit/figures/<course>/<id>.js`. Figures would be reusable between lessons, testable, and with no image files to cache.

| ID | Where | Shows | Level |
|---|---|---|---|
| **D1 Chest landmarks and V1–V6** | Electrode placement, before the list | Torso outline; sternal angle, 2nd–5th intercostal spaces, mid-clavicular, anterior axillary and mid-axillary lines; V1–V6 marked and numbered | Foundation |
| **D2 Limb electrodes** | Electrode placement | Figure with RA, LA, LL and RL; IEC and AHA colour codes side by side, each electrode **labelled with text** | Foundation |
| **D3 ECG paper and calibration** | Quality and labelling | Small and large squares; what 25 mm/s and 10 mm/mV mean; the calibration mark; where the label goes | Foundation |
| **D4 Labelled waveform (orientation only)** | New short section, "What the trace shows" | One normal complex: P wave, QRS complex, T wave, PR interval and QT interval, labelled. **Framed as orientation, not interpretation.** No normal ranges in this lesson; those belong to the interpretation content and need a verified source | Foundation |
| **D5 Common artefacts** | Quality and labelling | Clean trace beside movement, shivering, mains interference, wandering baseline and a detached lead. All are **recording problems with a recording fix** | Application |
| **D6 12-lead layout** | Quality and labelling | Where each lead sits on a standard printout, so a missing or flat lead is noticed | Application |

Traces in D4–D6 should be **generated from code** (a small waveform model in `kit/interactive/ecg.js`), not copied from published images. That avoids copyright issues, keeps them scalable and makes them unit-testable. They must be labelled *"illustrative, generated trace"* and reviewed by a cardiac physiologist or clinician before publication.

---

## 5. Interactive visualisations

All of these would use the existing `kit/interactive/` foundations (the trainer pattern in `trainers.js` and the branching engine in `scenario.js`). Each would record attempts in the new schema, with `context: "practice"`. Each needs a keyboard and screen reader route that doesn't depend on dragging or precise tapping.

| ID | What the learner does | Teaches | Accessible route | Placement |
|---|---|---|---|---|
| **I1 Electrode placement trainer** | Tap where V1–V6 go on D1; feedback names the landmark ("one intercostal space too high: find the sternal angle first") | Objective 1 | Choose an intercostal space and line from two selects for each electrode | Inline in the lesson and on the Practice tab |
| **I2 Waveform explorer** | Tap or step through P, QRS, T, PR and QT on D4; each part highlights with a one-line plain description | Orientation (no interpretation) | Previous and next buttons with a live description | Inline |
| **I3 Artefact spotter** | See a generated 12-lead with one problem (movement, a detached lead, a reversed lead, the wrong speed or gain, a missing label), identify it and choose the fix | Objective 2 | Single best answer over the image, with a full text description of the trace | Practice tab; Application level |
| **I4 "Record and escalate" scenario** | Branching case: a person reports chest pain on the ward. Prepare, consent, record, check quality, recognise that this needs immediate clinical review, hand over with SBAR, document. Includes a distractor where the machine's statement says "normal ECG" | Objective 3 and the scope boundary | Already accessible (`scenario.js`) | Practice tab; Clinical reasoning |
| **I5 Rhythm examples and identification** | Generated strips: sinus rhythm, AF, VT, VF, asystole | **Not in this lesson.** Belongs in *Arrhythmias* (School 5) and resuscitation training, with interpretation clearly marked as beyond the recording role | Text descriptions | Later, after expert review |

I5 is listed because the feedback asked for rhythm identification. Placing it in *ECG recording* would blur the very distinction the clinical safety review asks for, so I recommend keeping it out of this lesson.

---

## 6. Progressive assessment: Foundation, Application, Clinical reasoning

The levels already exist in the engine (`levels` in the course config) and are shown on every question. What's missing is enough questions at each level, and a way to work through them in order.

**Current set:** q1 Foundation (V4 position, objective 1); q2 Application (chest pain, objective 3); q3 Application (placement order, objective 1). There's no question on objective 2 and no Clinical reasoning question. No option has a per-option explanation.

**Proposed set** (drafts to write and review; uses the new question types):

| Level | Item | Type | Objective |
|---|---|---|---|
| Foundation | Where is V1 placed? (keep the flashcard; add as a question with per-option explanations) | M | 1 |
| Foundation | Match each limb electrode to its IEC colour | MATCH | 1 |
| Foundation | "The machine's automated interpretation can be used instead of clinical review." | TF (false) | 3 |
| Foundation | What must be on the ECG label? | MS | 2 |
| Application | V1 and V2 have been placed in the 2nd intercostal space. What should you do? | M | 1, 2 |
| Application | The trace shows a wandering baseline in a shivering person. Best action? | M | 2 |
| Application | Put the steps in order: identify, consent, position, skin prep, place electrodes, record, check quality, label, show or hand over, clean, document | SEQ | 1, 2 |
| Clinical reasoning | A person with chest pain has an ECG the machine reports as "normal". Their pain continues. What do you do? | M (5 options) | 3 |
| Clinical reasoning | You're asked to "pop an ECG on" a person who has become clammy and pale. Their NEWS2 has risen. Prioritise. | M or SEQ | 3 |
| Clinical reasoning | Write a short handover of an urgent ECG using SBAR | SA (self-assessed, provisional) | 2, 3 |

**How to present the levels later (interface work, not done now):**
- In *Check yourself*, group questions by level, with Foundation shown first and Application and Clinical reasoning following.
- Suggest the next level once the learner scores 80% or more at the current one. **Never lock content.** A learner may go straight to Clinical reasoning.
- Per-level results go into the analytics (`byLevel` in `analyse()` already exists), so *My progress* can say "Strong at recall, weaker at application".

---

## 7. Mobile density

Measured at 390 px: 9 screens; body text 17 px with a 27 px line height (good); 81 targets under 44 px, mostly the lesson-progress dots (6 px) and the reorder buttons (36 px). No collapsible sections.

Recommendations, in order of value against effort. **None is implemented yet.**

1. **Essential versus additional detail**: add a notes tag for "Go deeper" material (for example `MORE: Title` followed by lines), rendered as a closed `<details>`. In this lesson, special situations, serial ECGs and the colour-code comparison would be additional; landmarks, placement, quality, labelling, IPC and escalation stay essential.
2. **Collapse the reference blocks on phones**: objectives and prerequisites open on first visit and closed after; Summary, Key terms and Sources closed by default (with an "Expand all" link for revision).
3. **One question at a time** in *Check yourself* on phones, with "Question 1 of 3" and previous and next buttons. The exam engine already does this, so the pattern exists.
4. **A compact confidence control**: one row of three equal segments instead of wrapping pills. That saves about 50 px per question.
5. **An in-lesson section bar** (sticky, horizontally scrollable chips: Before · Placement · Quality · Urgency · Check) on phones only.
6. **Larger controls**: reorder buttons to 44 px; make the lesson-progress dots decorative (`aria-hidden`) and keep "Lesson 24 of 35" with previous and next as the real controls.
7. **Shorter kicker on phones**: module name only (the track and school are already in the breadcrumb).
8. **Callout weight**: give the safety box the strongest style, and make the key point and common mistake lighter, so three equal boxes don't compete.
9. **The standing notice**: show it in full on the course home and first lesson visit, and as a one-line link afterwards. Needs a decision, because it's a deliberate safety statement.

---

## 8. Clinical Simulation Studio (future)

The foundations exist: `scenario.js` (branching, scored decisions, safety-critical flags, debrief), `news2.js` (scoring that has been tested), and the attempt records. A studio would add:
- a patient state that changes over time (vital signs, a monitor display);
- `ecg.js` generated traces, used in I3, I4 and, later, in resuscitation scenarios where recognising a shockable rhythm is part of the ILS-level task;
- a scenario library tagged by field (adult, children's, mental health, learning disability) and by objective.

Every scenario would keep the statement that it doesn't assess or authorise competence, and each would need clinical review before publication. I recommend starting the studio only after the diagram and figure foundations (D1–D6, `ecg.js`) are built and reviewed, because the studio depends on them.

---

## 9. Recommended sequence

| Phase | Work | Needs interface change? |
|---|---|---|
| 1 | Content: scope box, IPC, landmarks, limb electrodes, automated statement, quality check, documentation; per-option explanations; objective 2 questions; Clinical reasoning items | No |
| 2 | `FIG:` tag and D1–D3 (static SVG); `ecg.js` waveform model with tests; D4–D6 | Small (one notes tag) |
| 3 | I1 and I3 as trainers; I4 as a scenario; inline embedding of a practice item in a lesson | Small |
| 4 | Mobile density items 1–7 and the level-grouped check | Yes: **awaits your go-ahead** |
| 5 | Clinical Simulation Studio | Yes |

Phases 1–3 fit the existing architecture, with no redesign. Phase 4 is the interface work you said not to start yet.

---

## 10. Needs expert review

- All of 3.2 and 3.3 against the current SCST guideline, local trust policy examples, and NICE guidance on chest pain.
- Every generated trace (D4–D6, I3, I5) by a cardiac physiologist or clinician.
- The scope statement in 3.1 by a registered nurse educator, so the role boundary matches UK practice and the NMC standards.
- The capacity and consent wording for Scotland and Northern Ireland.

## 11. Applying this audit to other clinical skills lessons

For each lesson, check:
- **scope** (do, recognise, interpret);
- **IPC**;
- **consent and capacity**;
- **landmarks or technique**, taught and not just named;
- **common errors and how to avoid them**;
- **equipment and settings** that vary between organisations, flagged;
- **escalation triggers** based on the person's condition;
- **documentation**;
- **a competence statement**;
- **one diagram that removes the most text**;
- **one interactive item that practises the most error-prone step**;
- **every objective assessed at least once**;
- **at least one Clinical reasoning item**;
- **per-option explanations**.
