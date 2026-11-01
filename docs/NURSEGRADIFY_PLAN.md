# NurseGradify plan

NurseGradify (getgradify.com/nursegradify/) is a nursing education platform built on UK nursing education and the NMC's standards. It runs on the shared Gradify Kit.

## What exists now

| Piece | Where | State |
|---|---|---|
| Homepage, study app, learning map, LifeOS link, Body 3D | `nursegradify/` | Live before this work; now links to the course |
| **Nursing course** | `nursegradify/course/` → `kit/courses/nursing/` | **New.** Schools 1–5, 164 lessons, 7 pathways, on the shared course engine |
| Notes written | `kit/courses/nursing/notes/` | See `written` in `kit/courses/nursing/course.js` |
| Tests | `tests/courses.test.mjs` | Structure, pathways, notice and content minimums |

**The brief was cut off at School 6** ("Core Nursing Procedures and Clinical Skills", with no topics listed). Schools 6 onwards will be added when their topic lists are supplied. The syllabus file says so.

## Audiences and pathways

| Audience | Pathway |
|---|---|
| Pre-registration students | **Pre-registration year 1** (Schools 1, 2, 3) |
| All nurses, acute settings | **Recognising and responding to deterioration** (3, 5, 4) |
| Students and registrants | **Medicines management** (4, 2) |
| Newly qualified nurses | **Newly qualified nurse** (1, 3, 4) |
| Internationally educated nurses | **Internationally educated nurses: UK practice** (1, 3, 4) |
| Nursing associates | **Nursing associates** (1, 2, 3), within the NMC's nursing associate standards and local scope |
| CPD and revalidation | **CPD and revalidation** (1, 4, 5) |

## Curriculum

Schools 1–5 are exactly the brief's schools and topics. Each clinical-condition lesson in School 5 follows the brief's thirteen headings (definition, epidemiology, aetiology and risk factors, pathophysiology, signs and symptoms, investigations, treatment principles, nursing assessment, nursing management, monitoring, complications, patient education, escalation and safety), grouped into readable sections.

School 2 links to the existing **Body 3D** model (the BodyParts3D anatomy used by MedGradify and SportGradify) for the brief's interactive anatomical diagrams; per-system views and labelling exercises are a next step (below).

## UK-wide versus nation-specific

Every lesson labels which level a rule comes from:
- **UK-wide professional standards:** the NMC Code, the Future Nurse standards of proficiency (the seven platforms), revalidation, the professional duty of candour.
- **Nation-specific law and policy:** mental capacity and mental health law, adult safeguarding law, the statutory duty of candour, health service structures (NHS England, NHS Scotland boards, NHS Wales health boards, Health and Social Care in Northern Ireland).

## Clinical safety

- A standing notice on every course view: education only; no NMC registration; doesn't replace approved placements or assess competence; practise skills and give medicines only within scope, under supervision where required, following local policy.
- Content rules (`docs/CURRICULUM_CONTENT_STANDARD.md`): procedures described as education with explicit reference to supervision, scope and local policy; calculation examples say real administration needs a prescription, checks and local procedure; deterioration lessons always point to local escalation; no patient-identifiable data.

## Next steps, in order

1. **Finish the notes** for Schools 1–5, one school per commit. Priority: 1, 3, 4, then 5, 2.
2. **School 6 and beyond**, once the topic lists arrive.
3. **Drug-calculation trainer**: generated questions (tablets, liquids, infusion rates, weight-based doses) with computed answers and worked method, labelled as practice for university numeracy assessments, not authorisation.
4. **Deterioration scenarios**: branching patient vignettes with changing observations, where the learner scores NEWS2, decides on escalation and writes an SBAR handover.
5. **Interactive anatomy**: per-system views of the existing 3D model with label-the-structure quizzes, linked from each School 2 lesson.
6. **AI tools** through the existing Edge Function pattern: marking of reflective accounts and care plans against a rubric, and an "explain this lesson" tutor grounded in the lesson's notes, with a hard rule against patient-specific clinical advice.
7. **Revalidation helper**: record CPD hours, reflections and feedback against the NMC's revalidation requirements (a new owner-only table).

## Risks

- **Clinical accuracy.** Mitigation: content standard, sources named (NMC, NICE, Resuscitation Council UK, RCP), dated figures, clinical review by a registered nurse educator before any pathway is promoted.
- **Implied competence.** Mitigation: the notice on every view, no certificates, safety lines in every procedure and medicines lesson.
- **Nation differences.** Mitigation: explicit labels, and the IEN pathway.

## Update: full curriculum architecture (Schools 6–17) and field pathways

The full brief arrived. Schools 6–17 are now in the syllabus with modules (497 lessons in 17 schools, 127 modules). Each field school (10–13) has an added module on placement preparation and reflective learning (and, for adult nursing, law and professional considerations), because the brief requires them in every field pathway.

**Four field pathways**, each = the shared core (Schools 1–8 and 17) + the field's own school + selected modules of shared schools:
- **Adult**: all of Schools 5, 9, 10, 14 and 15.
- **Children's**: School 11; from School 5 only disease processes and critical illness; from School 9 deterioration, resuscitation and vital functions; from School 14 prevention, community roles and maternal health.
- **Mental health**: School 12; physical health modules of School 5 relevant to serious mental illness; cognition (School 15).
- **Learning disability**: School 13; the conditions most relevant to people with learning disabilities (respiratory, neurological, gastrointestinal); public health and inequalities modules of School 14.

**Overlaps to manage when writing:** Schools 8 and 9 revisit topics from Schools 3, 5 and 6 (hand hygiene, PPE, NEWS2, sepsis), and School 17 revisits School 1. Each later school must go deeper or apply rather than repeat: School 6 is the practical skill, School 8 the science and systems, School 9 the acute response, School 17 the law in detail.

## Status after the School 6 batch

School 6 (Core Nursing Procedures and Clinical Skills, 35 lessons) is the first school written to content standard 2: learning objectives, prerequisites, competence and safety boxes, key terms, summaries, typed and dated sources, and multi-format questions (single best answer, multi-select, ordering, matching, short answer). It has passed the technical checks and an AI content review; source verification and expert clinical sign-off are outstanding, so it is labelled as a draft. Schools 1, 3, 4 and 5 need upgrading to standard 2 at their review. Schools 2 and 7–17 are not yet written. See docs/CURRICULUM_PROGRESS.md for the live status.

## Status after the School 2 batch

School 2 (Human Anatomy and Physiology, 30 lessons) is written to standard 2. Every question is linked to its lesson objectives, it passes all hard checks with no warnings, and normal values are given as typical adult reference ranges with the note that laboratories set their own. Content review, source verification and expert sign-off are outstanding, so it is labelled as a draft. Written: Schools 1–6 (199 of 497 lessons). Next, in order: Schools 7, 8 and 17 (the rest of the shared core), then the field schools 10–13, then 9, 14, 15 and 16.

## Status after the School 7 batch

School 7 (Clinical Practice and Care Planning, 27 lessons) is written to standard 2 with no QA warnings. It covers the nursing process, person-centred care, prevention and recovery, transitions and coordination, and safe practice (risk, prioritisation, delegation, escalation, advocacy, end-of-life care). Later schools go deeper rather than repeat: School 15 for palliative care, School 17 for the law on capacity and advocacy. Draft until content review, source verification and expert sign-off. Written: Schools 1–7 (226 of 497 lessons). Next: Schools 8 and 17.

## Status after the School 8 batch

School 8 (Infection Prevention and Control, 28 lessons) is written to standard 2 with no QA warnings. It builds on School 6's practical skills and School 2's microbiology with the science, evidence and organisational systems of infection prevention: transmission, standard and transmission-based precautions, decontamination (Spaulding), healthcare-associated infections, antimicrobial resistance and stewardship, outbreaks, waste, sharps, occupational exposure and surveillance. Draft until content review, source verification and expert sign-off. Written: Schools 1–8 (254 of 497 lessons). Next: School 17.

## Status after the School 17 batch

School 17 (Nursing Law, Ethics and Safeguarding, 28 lessons) is written to standard 2 with no QA warnings. It goes beyond School 1's introductions into the law in detail: the Nursing and Midwifery Order, Bolam, Bolitho, Montgomery, Gillick, Cheshire West, Bland, Aintree v James, W v Egdell, Barnett and Adomako; the Mental Capacity Act, Mental Health Act, DoLS, Care Act, Children Act, Human Rights Act, Equality Act, UK GDPR, the duty of candour and PIDA; and four-nation differences throughout. Reforms whose status changes (Mental Health Act reform, Liberty Protection Safeguards, assisted dying bills, Northern Ireland's 2016 Act) are flagged in the text for checking. Draft until legal and clinical review and sign-off. The shared core (Schools 1–8 and 17) is now complete: 282 of 497 lessons. Next: the field schools 10–13.

## Status after the School 10 batch

School 10 (Adult Nursing, 28 lessons) is written to standard 2 with no QA warnings. It covers the adult nurse's role in assessment (NEWS2 thresholds, diagnostic overshadowing), medical and surgical nursing, each systems specialty (cardiovascular, respiratory, neurological, gastrointestinal, renal, endocrine, diabetes, oncology, haematology and transfusion, musculoskeletal, dermatology, infectious disease), older adults and frailty, rehabilitation, long-term conditions and multimorbidity, palliative and end-of-life care, post-operative care, discharge (pathways 0–3, Continuing Healthcare), community nursing, adult-specific law (covert medication, restraint), placement preparation and reflection. Safety boxes mark tasks needing assessed competence (transfusion, PCA and epidurals, syringe pumps, chemotherapy, insulin and DKA protocols). Draft until clinical review and sign-off. Written: 310 of 497 lessons. Next: School 11 (children's nursing).

## Status after the School 11 batch

School 11 (Children's and Young People's Nursing, 27 lessons) is written to standard 2 and passed QA with no warnings at the first run. It covers development and growth (UK-WHO charts, corrected age), developmental assessment, family-centred care, communication and play, parental responsibility and consent across the four nations, safeguarding and child protection practice, paediatric assessment and vital signs (PEWS, NICE temperature methods), neonatal care and prematurity, congenital conditions, respiratory, cardiovascular, neurological and infectious conditions (traffic light system, non-blanching rash), emergencies (paediatric BLS, anaphylaxis, choking), medication safety (tenfold errors, codeine and aspirin restrictions), childhood diabetes (4Ts, DKA and cerebral oedema), childhood cancer, adolescent health (HEEADSSS), mental health (self-harm, MEED), transition, placement preparation and reflection. Normal ranges are referred to age-specific charts rather than reproduced. Draft until clinical review and sign-off. Written: 337 of 497 lessons. Next: School 12 (mental health nursing).
