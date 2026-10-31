# NurseGradify: NMC standards and fields of nursing mapping

Maps the NMC's *Future nurse: standards of proficiency for registered nurses* (2018) and the four fields of nursing to NurseGradify schools, and shows the gaps.

> **Verification status: not yet checked against the published standards.** The NMC website couldn't be reached from the development environment. This mapping uses the platform and annexe structure as known up to 2025–26, at platform level rather than outcome by outcome. Before relying on it, compare it with the current standards document, add the numbered outcomes, update this file and record the check in `kit/courses/nursing/qa.js`.

Status key: **W** = notes written (draft until reviewed; see `docs/CURRICULUM_PROGRESS.md`), **Gap** = not yet in the curriculum, **Pending** = depends on School 6 onwards, which the brief hasn't listed yet.

## The seven platforms

| Platform | What it covers (summary) | NurseGradify coverage | Status |
|---|---|---|---|
| 1. Being an accountable professional | The Code; accountability; candour; consent and capacity; confidentiality; equality; evidence-based practice; reflection; resilience; CPD | School 1 (lessons 1–17, 19–30) | W |
| 2. Promoting health and preventing ill health | Public health; determinants of health and inequalities; health promotion; screening; vaccination; behaviour change | Partly: School 5 lessons on CVD, diabetes, cancer, COPD (prevention and education sections); School 4 lesson 35 | W (partial), **Gap** for a dedicated public health set |
| 3. Assessing needs and planning care | Person-centred assessment; history; physical, mental and social assessment; risk assessment; care planning | School 3 (all 30), School 2 (physiology underpinning) | W (School 3); School 2 not yet written |
| 4. Providing and evaluating care | Evidence-based interventions; medicines; symptom management; end-of-life care; evaluation | School 4 (all 37), School 5 (all 37), School 3 lesson 30 | W |
| 5. Leading and managing nursing care and working in teams | Delegation; supervision; prioritisation; teamwork; leadership | School 1 lessons 18–20, 29 | W (partial), **Gap**: prioritising and managing a caseload, leadership styles |
| 6. Improving safety and quality of care | Risk; incident reporting; learning from errors; quality improvement; infection prevention | School 4 lessons 33–34, School 3 lessons 27–28, School 5 lesson 3 | W (partial), **Gap**: quality improvement methods (PDSA, audit) |
| 7. Coordinating care | Care across services and settings; discharge; complex needs; end of life | School 5 lessons 35–37, School 4 lesson 36 | W (partial), **Gap**: discharge planning, integrated and community care |

## Annexe A: communication and relationship management skills

Covered in part by School 1 (professional identity, advocacy, boundaries), School 3 (history taking, person-centred assessment, handover) and patient-education lessons. **Gap**: a dedicated set on therapeutic communication, breaking bad news, de-escalation, and communicating with people with communication difficulties, with field-specific skills.

## Annexe B: nursing procedures

| Annexe B area (summary) | Coverage | Status |
|---|---|---|
| Assessment skills (observations, examination, mental state, risk tools) | School 3 | W |
| Procedural competencies: hygiene and skin, nutrition and hydration, bladder and bowel, mobility, respiratory care, infection prevention, medicines administration and optimisation, end-of-life care | School 4 (medicines, as education only); School 6 "Core Nursing Procedures and Clinical Skills" | **Pending**: School 6's topics weren't included in the brief |

## The four fields of nursing

| Field | Current coverage | Gaps |
|---|---|---|
| **Adult** | Most of Schools 3–5 is written from an adult perspective | Field-specific content is largely complete for the topics covered |
| **Children's** | Consent and Gillick competence (School 1), PEWS mention and FLACC (School 3), a few paediatric safety points | **Gap**: child development, paediatric assessment and normal values, paediatric medicines and weight-based dosing principles, safeguarding children in depth, family-centred care, common childhood conditions |
| **Learning disabilities** | Reasonable adjustments, hospital passports, diagnostic overshadowing (Schools 1 and 3) | **Gap**: learning disability health inequalities and annual health checks, communication approaches, positive behaviour support, epilepsy and dysphagia in learning disability, the LeDeR programme |
| **Mental health** | Mental state examination, risk and suicide, delirium (School 3); psychiatric medicines (School 4); dementia (School 5) | **Gap**: mental health law by nation (Mental Health Act 1983 in England and Wales; the Scottish and Northern Ireland frameworks), therapeutic engagement, common mental health conditions, de-escalation and restrictive practice, recovery models |

**Recommendation:** add a field-specific school for each of the children's, learning disabilities and mental health fields (or field "lenses" inside Schools 3–6), once School 6 onwards is specified.

## Nursing associates

Nursing associates work to the NMC's separate *Standards of proficiency for nursing associates* (six platforms). The "Nursing associates" path currently reuses Schools 1–3. **Gap**: map those standards and mark where the nursing associate scope differs (for example, in assessment and care planning, and medicines).

## Clinical guidance referenced

Clinical lessons cite NICE guidelines (for example NG51 sepsis, NG5 medicines optimisation, NG148 acute kidney injury, NG56 multimorbidity, NG217 epilepsy, NG136 hypertension), the RCP's NEWS2, the Resuscitation Council UK, BTS oxygen guidance, BTS/NICE/SIGN asthma guidance, MHRA safety advice, and the RPS/RCN medicines administration guidance. All are listed in `docs/qa/nursing-sources.md`, and **none has yet been verified against the current published version**. That is the stage 4 task for each school.
