// DentalGradify Dentistry, School 6: Clinical Method and Reasoning. Reused from MedGradify Medicine School 2 (kit/courses/medicine/notes/u02.js)
// by scripts/borrow-school.mjs on 2026-11-12; question ids are this course's own. Review state as qa.js records.
// School 2: Clinical Method and Reasoning. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md):
// objectives, key terms, summaries, typed and dated sources, evidence status (EV:) and questions at three levels
// (Foundation, Application, Evaluation) in every lesson. Explanations are original; sources are those used and cited
// for checking, pending human verification (qa.js records the review stages). Level: clinical years of a UK medical
// degree and UKMLA revision. Patients in examples are fictional; this is education, not clinical guidance.
export default `
## The medical history
LV: Clinical · Foundation
S: Most diagnoses are made, or strongly suggested, by the history. This lesson sets out the structure of a medical history, how to explore a symptom, the drug, family and social history, and how to quantify smoking and alcohol.
O: Describe the structure and purpose of each part of a medical history
O: Explore a presenting symptom systematically, including pain with SOCRATES and the patient's ideas, concerns and expectations
O: Quantify smoking in pack-years and alcohol in units and judge which details change management
H: The structure
- **Presenting complaint (PC)**: the problem in the patient's own words.
- **History of presenting complaint (HPC)**: onset, course, character and associated symptoms, red flags and relevant negatives, and the patient's **ideas, concerns and expectations** (ICE).
- **Past medical and surgical history (PMH)**: conditions, operations, admissions, and how each is controlled.
- **Drug history (DH)**: prescribed, over-the-counter and herbal medicines and recreational drugs, with dose, timing and adherence; **allergies with the reaction** (rash, anaphylaxis, or intolerance such as nausea).
- **Family history (FH)**: illness in first-degree relatives and age at onset; draw a pedigree when inheritance is relevant.
- **Social history (SH)**: smoking, alcohol, drugs, occupation and exposures, home, function and support, driving, travel.
- **Systems review**: brief screening questions about each system to catch what the patient didn't mention.
H: Exploring a symptom
P: Start with an open question and listen without interrupting; then focus. For pain, **SOCRATES** structures the questions: **S**ite, **O**nset (sudden or gradual, what was the patient doing), **C**haracter, **R**adiation, **A**ssociated symptoms, **T**ime course (constant or intermittent, getting better or worse), **E**xacerbating and relieving factors, **S**everity (0–10, and the effect on function). For any symptom, ask about **red flags**: features that suggest a serious cause, such as weight loss, night sweats, bleeding, or new neurological deficits.
X: A 58-year-old says, "I get this tightness when I walk up the hill to the shop."
> Character and site: central chest tightness. Radiation: to the left arm and jaw. Onset: on exertion, within 2 minutes of walking uphill.
> Relief: settles within 5 minutes of rest. Time course: started 6 weeks ago, now happening at shorter distances.
> Associated features: breathlessness, no syncope. Risk factors: smoker of 30 pack-years, father had an MI at 52.
> Concerns: worried it's his heart because of his father. This history alone makes stable angina likely and the worsening pattern deserves prompt assessment.
K: The history is a diagnostic test with a high yield. Each question should either raise or lower the probability of a specific diagnosis, so learn which features discriminate, not just a list of questions.
H: Quantifying exposures
E: Pack-years = (cigarettes per day ÷ 20) × years smoked :: one pack-year is 20 cigarettes a day for a year
E: Units of alcohol = volume (mL) × ABV (%) ÷ 1000 :: one UK unit is 10 mL (8 g) of pure alcohol
P: The UK Chief Medical Officers advise that, to keep health risks low, men and women should not regularly drink more than 14 units a week, spread over three or more days. Screen for harmful drinking with a validated tool such as AUDIT-C, and ask about withdrawal symptoms before a patient is admitted.
!: Recording "allergic to penicillin" without the reaction. Diarrhoea or nausea is an intolerance; a rash or anaphylaxis is an allergy. The difference decides whether a patient can safely receive a whole class of antibiotics, and unverified labels lead to broader, less effective prescribing.
EV: established | In general medical clinics, the history alone leads to the final diagnosis in a large majority of patients, more often than examination or investigation (for example Hampton et al., 1975).
EV: established | Doctors often interrupt patients' opening statements within seconds, and uninterrupted openings are usually short (Beckman and Frankel, 1984).
T: ICE | The patient's ideas about the cause, their concerns and their expectations of the consultation
T: Pack-year | A measure of tobacco exposure: 20 cigarettes a day for one year
SUM: A structured history covers PC, HPC with ICE, PMH, DH with allergy reactions, FH, SH and a systems review.
SUM: Explore symptoms with discriminating questions and red flags; quantify smoking in pack-years and alcohol in units.
SRC: Hampton J. R. et al., "Relative contributions of history-taking, physical examination, and laboratory investigation to diagnosis and management of medical outpatients", BMJ 2(5969):486–489 | primary | 1975 | https://doi.org/10.1136/bmj.2.5969.486
SRC: Innes J. A., Dover A. R., Fairhurst K. (eds), Macleod's Clinical Examination, 14th edn, Elsevier, chapter 1 | secondary | 2018
SRC: UK Chief Medical Officers, UK Chief Medical Officers' Low Risk Drinking Guidelines, Department of Health | guidance | 2016
Q: What does SOCRATES stand for? | Site, Onset, Character, Radiation, Associated symptoms, Time course, Exacerbating and relieving factors, Severity.
Q: How many units are in 500 mL of 5% ABV beer? | 500 × 5 ÷ 1000 = 2.5 units.
M1#dentistry-u06-19-q1@1: Which part of the history records the reaction a patient had to a drug? | Drug history, as the allergy and its reaction | Family history | Systems review | Past surgical history | Allergies are documented with the drug history, always with the nature of the reaction so allergy can be distinguished from intolerance.
NUM2#dentistry-u06-19-q2@3: A patient has smoked 30 cigarettes a day for 20 years. How many pack-years is this? | 30 | 0 | pack-years | (30 ÷ 20) × 20 = 1.5 × 20 = 30 pack-years.
M2#dentistry-u06-19-q3@2: A patient says she is "allergic to amoxicillin" because it gave her loose stools. How should this be recorded? | As an intolerance (diarrhoea), not an allergy, with the reaction described | As a penicillin allergy, so all penicillins are avoided | As anaphylaxis to be safe | It needn't be recorded at all | Gastrointestinal upset is a predictable side effect, not an immune reaction. Labelling it as allergy would needlessly exclude penicillins; recording the reaction lets prescribers decide.
M3#dentistry-u06-19-q4@2,3: Which question adds the most diagnostic value in a patient with a headache? | Did it reach its maximum intensity within a minute or so? | Have you ever had a headache before? | Do you drink coffee? | Is there anyone else at home? | A thunderclap onset is a red flag for subarachnoid haemorrhage and changes management immediately. Discriminating questions shift probability; generic ones rarely do.
SA3#dentistry-u06-19-q5@2,3: Explain why asking about a patient's ideas, concerns and expectations is part of an effective history, not an optional extra. | ICE reveals what the patient thinks is wrong and what they fear, which may differ from the doctor's view and can be the real reason they came. It improves diagnostic accuracy (patients offer clues), allows explanation to address their specific worry, makes shared decisions possible, improves adherence and satisfaction, and can prevent repeat attendance. Ignoring it risks reassuring about the wrong thing. | Defines ideas, concerns and expectations ; Hidden agenda or real reason for attending ; Tailored explanation ; Shared decision-making or adherence ; Risk of missing the concern

## Consultation models and patient-centred care
LV: Clinical · Foundation
S: Consultation models turn communication into teachable, observable skills. This lesson describes the Calgary–Cambridge guide and Neighbour's model, the biopsychosocial approach, and practical skills: opening, listening, summarising, safety-netting and working with interpreters.
O: Describe the stages of the Calgary–Cambridge guide and Neighbour's checkpoints
O: Apply core consultation skills, including summarising, signposting and safety-netting, to a clinical encounter
O: Evaluate the strengths and limits of patient-centred consultation models
PRE: The medical history
H: The Calgary–Cambridge guide
P: The Calgary–Cambridge guide (Kurtz and Silverman, 1996) divides the consultation into five sequential tasks, held together by two threads that run throughout.
- **Initiating the session**: preparation, rapport, identifying all the reasons for attending ("Is there anything else?").
- **Gathering information**: patient's story, then clinician-led questions; the biomedical history and the patient's perspective.
- **Physical examination**.
- **Explanation and planning**: the right amount and type of information, checking understanding, shared decisions.
- **Closing the session**: summary, next steps, safety-netting.
- Running throughout: **providing structure** (summarising, signposting) and **building the relationship** (non-verbal behaviour, empathy, involving the patient).
H: Neighbour and the biopsychosocial model
P: Roger Neighbour's *The Inner Consultation* (1987), written for general practice, describes five checkpoints: **connecting**, **summarising**, **handing over**, **safety-netting** and **housekeeping** (looking after one's own state before the next patient). Engel's **biopsychosocial model** (1977) argued that illness can't be understood through biology alone: beliefs, mood, relationships, work and culture shape how disease is experienced, presented and managed.
X: A 42-year-old attends with back pain and, as the consultation closes, says, "While I'm here, I've been getting chest pains."
> This is a "doorknob" or "by the way" comment, often the patient's real concern, raised when they finally feel safe or when time is running out.
> Calgary–Cambridge would have screened for it at the start ("What else would you like to discuss today?").
> Acknowledge it, assess for red flags now (chest pain may need urgent assessment), and agree how to address it safely, today or with a clear plan.
K: Safety-netting closes every consultation: tell the patient what to expect, which symptoms mean they should seek help, how urgently and where, and when they'll next be reviewed.
H: Practical skills
- **Open to closed**: start open, then focus with closed questions ("the cone").
- **Active listening**: silence, facilitation, picking up verbal and non-verbal cues.
- **Summarising** checks accuracy and shows you listened; **signposting** tells the patient where the consultation is going.
- **Chunk and check**: give information in small amounts and check understanding (teach-back: "Could you tell me how you'll take this?").
- **Interpreters**: use a professional interpreter, not family (especially children), to protect accuracy and confidentiality; speak to the patient, not the interpreter.
!: Thinking patient-centred means doing whatever the patient asks. It means understanding the patient's perspective and involving them in decisions; the doctor still gives honest advice and may decline requests that aren't in the patient's interest, such as antibiotics for a viral illness.
EV: established | Communication skills can be taught and improve with structured feedback, and the Calgary–Cambridge guide is widely used in UK medical schools.
EV: contested | How strongly patient-centred consultation styles improve hard clinical outcomes, as opposed to satisfaction, adherence and understanding, is debated because trial results are mixed.
T: Safety-netting | Advising the patient which symptoms or changes should prompt them to seek help, where and how quickly
T: Signposting | Explicitly telling the patient what will happen next in the consultation
SUM: Calgary–Cambridge structures the consultation into five tasks with structure and relationship running throughout.
SUM: Key skills are open questions, active listening, summarising, chunk-and-check, safety-netting and professional interpreting.
SRC: Kurtz S. M., Silverman J. D., "The Calgary–Cambridge Referenced Observation Guides: an aid to defining the curriculum and organizing the teaching in communication training programmes", Medical Education 30(2):83–89 | primary | 1996 | https://doi.org/10.1111/j.1365-2923.1996.tb00724.x
SRC: Engel G. L., "The need for a new medical model: a challenge for biomedicine", Science 196(4286):129–136 | primary | 1977 | https://doi.org/10.1126/science.847460
SRC: Silverman J., Kurtz S., Draper J., Skills for Communicating with Patients, 3rd edn, CRC Press | secondary | 2013
Q: Name the five stages of the Calgary–Cambridge guide. | Initiating the session, gathering information, physical examination, explanation and planning, closing the session.
Q: What are Neighbour's five checkpoints? | Connecting, summarising, handing over, safety-netting and housekeeping.
M1#dentistry-u06-20-q1@1: Which of these is part of closing a consultation? | Safety-netting | Initiating rapport | Screening for other problems at the start | Taking the drug history | Closing includes a summary, the plan and safety-netting advice about what to do if things change.
M2#dentistry-u06-20-q2@2: A patient speaks little English and has brought her 12-year-old son to translate. What should you do? | Arrange a professional interpreter | Use the son, as he's available | Speak slowly and loudly in English | Defer all consultations until she learns English | Family members, and especially children, may filter information, be distressed by it and compromise confidentiality; professional interpreting is the standard.
TF1#dentistry-u06-20-q3@2: Teach-back means asking the patient to explain the plan back in their own words. | true | Asking patients to restate the plan checks understanding without testing them, and lets you correct misunderstandings before they leave.
M3#dentistry-u06-20-q4@3: Which is the best criticism of applying consultation models as rigid checklists in assessments? | Students may perform the steps mechanically without genuinely responding to the patient | The models have no stages, so they can't be assessed | Consultation models were designed only for surgery | Checklists make consultations longer than they need to be in every case | The models describe skills to be used flexibly; ticking stages can produce formulaic empathy. Good assessment looks at whether the skills achieved their purpose.
SA3#dentistry-u06-20-q5@2,3: Using the biopsychosocial model, explain why two patients with the same lumbar disc prolapse may have very different outcomes. | Biologically, the lesion may be similar. But psychological factors (fear-avoidance beliefs, catastrophising, low mood) predict pain and disability, and social factors (manual work, job insecurity, compensation claims, support at home) affect return to activity. A patient with reassurance, low fear and supportive work may recover quickly, whereas another with high distress and difficult work may develop chronic disability. Management therefore addresses beliefs, mood and work as well as the spine. | Biological lesion similar ; Psychological factors named ; Social factors named ; Effect on outcome explained ; Management implication

## Communicating risk and shared decision-making
LV: Clinical · Application
S: Patients can only decide well if risks are explained in ways they understand. This lesson covers absolute and relative risk, number needed to treat, natural frequencies and framing, and how shared decision-making and the Montgomery judgment shape consent in the UK.
O: Calculate absolute risk reduction, relative risk reduction and number needed to treat
O: Present risk in ways that are accurate and understandable, avoiding framing bias
O: Explain shared decision-making and the legal duty to disclose material risks after Montgomery
H: Absolute and relative risk
E: ARR = control event rate − treatment event rate :: absolute risk reduction
E: RRR = ARR ÷ control event rate :: relative risk reduction
E: NNT = 1 ÷ ARR :: number needed to treat to prevent one event (round up)
X: A medicine reduces the 5-year risk of stroke from 4% to 3%. Express the benefit three ways.
> ARR = 4% − 3% = 1 percentage point.
> RRR = 1 ÷ 4 = 25%: "cuts the risk of stroke by a quarter".
> NNT = 1 ÷ 0.01 = 100: 100 people take it for 5 years to prevent one stroke; 99 gain no stroke benefit and all are exposed to side effects.
K: Relative risk reductions sound large and stay the same whatever the baseline risk; absolute risks and NNT show how much difference treatment makes to this patient. Always give absolute figures.
H: Making numbers understandable
- Use **natural frequencies** ("3 in 100 people like you") rather than percentages or odds, and keep the **same denominator** when comparing.
- Give a time frame ("over the next 10 years").
- Use **icon arrays** or other visual aids.
- Avoid **framing** bias: give both "97 in 100 will survive" and "3 in 100 will die".
- Avoid vague words: "rare" and "common" are interpreted very differently by different people.
H: Shared decision-making and the law
P: Shared decision-making brings together the clinician's expertise on options, benefits and harms with the patient's values and preferences. Elwyn and colleagues (2012) describe three steps: **team talk** (there is a choice, and we'll make it together), **option talk** (the options, including doing nothing, with their pros and cons) and **decision talk** (exploring preferences and reaching a decision). NICE guideline NG197 (2021) sets out how to embed it, including decision aids.
P: In ***Montgomery v Lanarkshire Health Board*** [2015] UKSC 11, the Supreme Court held that doctors must take reasonable care to ensure the patient is aware of any **material risks** of a treatment and of **reasonable alternatives**. A risk is material if a reasonable person in the patient's position would be likely to attach significance to it, or the doctor is or should reasonably be aware that this particular patient would. This replaced the Bolam-based test for disclosure.
!: Thinking consent is a signature on a form. Consent is a process of dialogue in which the patient understands the options, material risks and alternatives; the form only records it.
EV: established | Presenting risks as natural frequencies improves both patients' and clinicians' understanding compared with conditional probabilities.
EV: established | Decision aids increase patients' knowledge and the accuracy of their risk perceptions and reduce decisional conflict (Cochrane review, Stacey et al.).
T: Number needed to treat | The number of patients who must be treated for a stated time to prevent one additional adverse outcome
T: Material risk | A risk that a reasonable person in the patient's position, or this patient, would likely consider significant (Montgomery)
SUM: Give absolute risks and NNT with a time frame, as natural frequencies, framed both ways.
SUM: Shared decision-making combines evidence with the patient's values; Montgomery requires disclosure of material risks and reasonable alternatives.
SRC: Montgomery v Lanarkshire Health Board [2015] UKSC 11 | case | 2015 | https://www.supremecourt.uk/cases/uksc-2013-0136
SRC: Elwyn G. et al., "Shared decision making: a model for clinical practice", Journal of General Internal Medicine 27(10):1361–1367 | primary | 2012 | https://doi.org/10.1007/s11606-012-2077-6
SRC: Gigerenzer G., Edwards A., "Simple tools for understanding risks: from innumeracy to insight", BMJ 327(7417):741–744 | secondary | 2003 | https://doi.org/10.1136/bmj.327.7417.741
SRC: National Institute for Health and Care Excellence, Shared decision making (NG197) | guidance | 2021 | https://www.nice.org.uk/guidance/ng197
Q: How is the number needed to treat calculated? | 1 ÷ absolute risk reduction (as a proportion), rounded up.
Q: What did Montgomery v Lanarkshire establish? | Doctors must take reasonable care to disclose material risks and reasonable alternatives; materiality is judged from the patient's perspective.
M1#dentistry-u06-21-q1@1: Which three steps make up Elwyn's model of shared decision-making? | Team talk, option talk, decision talk | History, examination, investigation | Situation, background, recommendation | Setting, perception, invitation | Elwyn et al. describe team talk, option talk and decision talk; the others are history-taking, SBAR and SPIKES.
NUM2#dentistry-u06-21-q2@2: A treatment lowers the 10-year risk of a heart attack from 10% to 8%. What is the number needed to treat for 10 years to prevent one heart attack? | 50 | 0 | patients | ARR = 10% − 8% = 2% = 0.02; NNT = 1 ÷ 0.02 = 50.
M2#dentistry-u06-21-q3@2: A drug "halves the risk" of an event whose baseline risk is 2 in 1,000 over 5 years. What is the best way to explain this to a patient? | Without it about 2 in 1,000 people have the event over 5 years, and with it about 1 in 1,000 | It cuts your risk by 50%, so it's clearly worth taking | It gives you a 50% chance of avoiding the event | It reduces your risk by a large amount | Absolute figures with a time frame and same denominator show the real benefit (ARR 0.1%, NNT 1,000), which the relative figure hides.
M3#dentistry-u06-21-q4@3: After Montgomery, which statement about disclosing a 1 in 10,000 risk of a serious complication is most accurate? | It must be disclosed if a reasonable person in the patient's position, or this patient, would attach significance to it | It never needs disclosing because it is under 1% | It needs disclosing only if a responsible body of doctors would disclose it | It is the patient's job to ask about rare risks | Materiality depends on significance to the patient, not on a percentage threshold or professional practice; serious rare risks may well be material.
SA3#dentistry-u06-21-q5@2,3: A patient asks whether to take a statin. Explain how you would present the benefit and harms to support a shared decision. | Begin with team talk: there is a real choice. Using their estimated 10-year cardiovascular risk, give absolute figures as natural frequencies with the same denominator, for example how many in 100 people like them would have a heart attack or stroke in 10 years with and without the statin, ideally with an icon array. Present harms the same way (muscle symptoms, small diabetes risk) and the option of lifestyle change alone. Avoid relative-only figures and framing bias, check understanding with teach-back, explore what matters to them and agree a decision, which they may revisit. | Team talk or acknowledgement of choice ; Absolute risks as natural frequencies with time frame ; Harms in the same format ; Alternatives including no treatment ; Explores values and checks understanding

## Breaking bad news
LV: Clinical · Application
S: How bad news is given affects patients for years. This lesson teaches the SPIKES framework, how to respond to emotion, how to handle requests from relatives not to tell the patient, and what to do afterwards.
O: Describe the six steps of the SPIKES protocol
O: Apply empathic responses to emotion and pace information to the patient's needs
O: Evaluate ethical and legal issues when relatives ask for information to be withheld
PRE: Consultation models and patient-centred care
H: SPIKES
- **S, Setting up**: a private room, enough time, phone handed over, the right people present (a relative if the patient wishes, a nurse who will follow up), sitting down.
- **P, Perception**: find out what the patient already knows or suspects ("What have you been told about why we did the scan?").
- **I, Invitation**: ask how much they want to know and how ("Would you like me to go through the results in detail?").
- **K, Knowledge**: give a **warning shot** ("I'm afraid the results are not what we hoped"), then the news in plain language, in small chunks, checking understanding.
- **E, Emotions**: notice and respond with empathy; allow silence.
- **S, Strategy and summary**: agree a plan and next steps, summarise, and arrange follow-up and contact details.
X: How would you respond when a patient told she has cancer falls silent and then says, "But my daughter's wedding is in June"?
> Don't rush to fill the silence with facts; she is processing the news.
> Name and validate the emotion: "That's clearly so important to you. This must be a lot to take in."
> Explore before answering: "What are you most worried about with the wedding?"
> Then give honest information about what is and isn't known, without false reassurance or premature detail, and make a plan to return to her questions.
K: Patients remember how they were told long after they forget the details. Pace information to the patient, respond to emotion before giving more facts, and never leave without a plan and a named contact.
H: Difficult situations
P: Relatives sometimes ask doctors not to tell a patient their diagnosis (**collusion**). Explore their fears, which are usually protective; explain that the patient has a right to information and to make decisions, and that most people want to know. A patient may themselves choose not to know details, and that wish should be respected and recorded. The GMC's decision-making guidance allows withholding information only if giving it would cause the patient serious harm, meaning more than becoming upset; this exception is narrow.
P: Use clear words ("cancer", "died"), not euphemisms ("a growth", "passed on") that may be misunderstood. Don't give exact prognostic figures unless asked, and then give ranges with honest uncertainty. Afterwards, document what was said and the patient's understanding, and inform the GP and the team.
!: Giving false reassurance to soften the blow ("I'm sure it will be fine"). It damages trust when the truth emerges and prevents patients planning; hope can be honest ("We'll do everything we can to control this").
EV: established | Training in structured approaches such as SPIKES improves clinicians' confidence and observed communication when giving bad news.
EV: contested | Whether communication training for bad news improves patients' long-term psychological outcomes, as distinct from their satisfaction, is uncertain.
T: Warning shot | A brief statement that prepares the patient for bad news before it is given
T: Collusion | A request, usually from relatives, to keep information from the patient
SUM: SPIKES: Setting, Perception, Invitation, Knowledge (with a warning shot), Emotions, Strategy and summary.
SUM: Respond to emotion before facts, avoid euphemism and false reassurance, and withhold information only in narrow circumstances.
SRC: Baile W. F. et al., "SPIKES: a six-step protocol for delivering bad news: application to the patient with cancer", The Oncologist 5(4):302–311 | primary | 2000 | https://doi.org/10.1634/theoncologist.5-4-302
SRC: General Medical Council, Decision making and consent | guidance | 2020
Q: What does SPIKES stand for? | Setting, Perception, Invitation, Knowledge, Emotions (empathy), Strategy and summary.
Q: When may information be withheld from a patient under GMC guidance? | Only if giving it would cause the patient serious harm (more than becoming upset), or if the patient chooses not to know; this exception is narrow.
M1#dentistry-u06-22-q1@1: In SPIKES, what is the purpose of the "Perception" step? | To find out what the patient already knows or suspects | To ask permission to share the news | To give the diagnosis | To agree a treatment plan | Perception assesses understanding first, so you can correct misconceptions and start where the patient is.
M2#dentistry-u06-22-q2@2: A son asks you not to tell his father that he has terminal cancer, because "it will kill him". What is the best first response? | Explore the son's concerns, and explain that his father has a right to information about his own health | Agree, because the family knows him best | Tell the father immediately without speaking to the son further | Refuse to discuss anything with the son because of confidentiality | Exploring the relative's fears respects their intent while upholding the patient's rights. Find out what the father wants to know; withholding is justified only if disclosure would cause serious harm.
TF1#dentistry-u06-22-q3@1: A warning shot is given just before the bad news itself. | true | It prepares the person for what is coming, giving them a moment to brace and to signal how much they want to hear.
M3#dentistry-u06-22-q4@3: Which is the best reason to avoid the phrase "a shadow on the scan" when telling someone they have lung cancer? | Euphemisms may be misunderstood, so the patient may leave not knowing they have cancer | It is too technical for most patients | It would breach confidentiality | It is legally prohibited | Clear words prevent misunderstanding; patients told about a "shadow" or "growth" may not realise the seriousness and so can't make informed decisions.
SA3#dentistry-u06-22-q5@2,3: Describe how you would end a consultation in which you have told a patient their biopsy shows cancer. | Check what they've understood and what they want to know now. Summarise the key points in plain language. Agree the next steps: further tests, a multidisciplinary meeting, an appointment date with a named clinician. Offer written information and support (a specialist nurse with contact numbers). Ask whether they have someone to be with them and how they'll get home. Safety-net and confirm follow-up. Then document the conversation and inform the GP and team. | Checks understanding ; Summary ; Clear plan with named contact ; Support and written information ; Documentation and communication with GP

## Principles of physical examination
LV: Clinical · Foundation
S: Examination is a skill of observation, technique and interpretation, built on consent and dignity. This lesson covers preparing for an examination, chaperones, the inspect–palpate–percuss–auscultate sequence, general signs, and how reliable signs really are.
O: Describe the preparation for an examination, including consent, chaperones, hand hygiene and positioning
O: Perform a general inspection and identify important general signs and their causes
O: Evaluate the reliability and diagnostic value of physical signs
PRE: The medical history
H: Before you touch the patient
- **Introduce** yourself with your name and role, confirm the patient's identity, explain what you'd like to do and why, and gain **consent**.
- **Hand hygiene**: the WHO's five moments (before touching a patient, before a clean or aseptic procedure, after body fluid exposure risk, after touching a patient, after touching their surroundings).
- **Chaperone**: offer one for any intimate examination (breasts, genitalia, rectum) and whenever the patient or you would feel more comfortable; record the offer, the name of the chaperone or the patient's decision.
- **Position and exposure**: for example 45° for cardiovascular and respiratory examination, flat for the abdomen; expose what you need while preserving dignity.
- **Pain**: ask about it first and watch the patient's face during palpation.
H: The sequence and general signs
P: Most system examinations follow **inspection, palpation, percussion and auscultation**, often from the hands upwards: general appearance first, then hands, face and neck, then the region itself. Compare sides. At the end of the bed, look for distress, breathlessness, pallor, cyanosis, jaundice, cachexia, oedema, and clues around the bed (oxygen, inhalers, walking aids, catheter bags, sputum pots).
- **Clubbing**: loss of the angle between nail and nail fold. Causes: lung cancer, bronchiectasis, cystic fibrosis, idiopathic pulmonary fibrosis, cyanotic congenital heart disease, infective endocarditis, inflammatory bowel disease, cirrhosis. Not caused by COPD alone: new clubbing in COPD suggests cancer.
- **Central cyanosis** (blue tongue): deoxyhaemoglobin above about 50 g/L, hard to see in anaemia.
- **Pallor** of the conjunctivae: suggests anaemia but is insensitive.
- **Lymphadenopathy**: size, consistency, tenderness, fixation; hard, fixed, painless nodes suggest malignancy.
X: A 64-year-old smoker with COPD has new clubbing. What does this suggest, and what next?
> COPD doesn't cause clubbing, so a new cause must be sought.
> The most important in a smoker is lung cancer (especially non-small cell); others include bronchiectasis and pulmonary fibrosis.
> Examine for lymphadenopathy and focal chest signs, and request a chest X-ray urgently (and follow local suspected-cancer pathways).
K: Examination is targeted by the history: examine to confirm or refute your leading diagnoses, and always look for the signs that would change management.
H: How good are signs?
P: Many signs have modest **inter-observer reliability** (two examiners often disagree, measured by the kappa statistic) and modest sensitivity. Their value depends on the pre-test probability: a sign that is specific (such as a pericardial rub) raises the probability greatly when present; a sensitive sign that is absent helps rule a diagnosis out. Evidence-based physical diagnosis (McGee) expresses signs as likelihood ratios to show how much each one shifts the probability.
!: Examining by rote without thinking. A complete routine examination is useful to learn, but in practice the purpose is to test hypotheses; findings should be interpreted against the history, not recorded and forgotten.
EV: established | Agreement between clinicians on many physical signs is only fair to moderate, which limits their diagnostic value when used alone.
T: Chaperone | An impartial observer present during an intimate examination, for the patient's support and both parties' protection
T: Clubbing | Loss of the normal angle between the nail plate and proximal nail fold, with bulbous fingertips
SUM: Prepare with introduction, consent, hand hygiene, chaperone where appropriate, positioning and dignity.
SUM: Inspect, palpate, percuss and auscultate; interpret signs by their reliability and likelihood ratios.
SRC: McGee S., Evidence-Based Physical Diagnosis, 4th edn, Elsevier | secondary | 2018
SRC: General Medical Council, Intimate examinations and chaperones | guidance | 2013
SRC: World Health Organization, WHO Guidelines on Hand Hygiene in Health Care | guidance | 2009
Q: List the WHO's five moments for hand hygiene. | Before touching a patient; before a clean or aseptic procedure; after body fluid exposure risk; after touching a patient; after touching patient surroundings.
Q: Give five causes of finger clubbing. | Any five of: lung cancer, bronchiectasis, cystic fibrosis, idiopathic pulmonary fibrosis, lung abscess or empyema, cyanotic congenital heart disease, infective endocarditis, inflammatory bowel disease, cirrhosis.
M1#dentistry-u06-23-q1@1: When should a chaperone be offered? | For any intimate examination, and whenever the patient or doctor would prefer one | Only when examining patients under 18 | Only if the doctor and patient are of different sexes | Only for rectal examinations in a hospital | GMC guidance applies regardless of sex; the offer and the outcome should be recorded.
M2#dentistry-u06-23-q2@2: A patient with long-standing COPD develops clubbing. Which is the most important cause to exclude? | Lung cancer | Worsening COPD | Asthma | Iron deficiency | COPD doesn't cause clubbing, so new clubbing in a smoker raises concern for bronchial carcinoma.
TF1#dentistry-u06-23-q3@2: Central cyanosis is easier to detect in a patient with severe anaemia. | false | Cyanosis depends on the absolute amount of deoxygenated haemoglobin (about 50 g/L); with little haemoglobin, a patient can be severely hypoxic without looking blue.
M3#dentistry-u06-23-q4@3: A sign has a positive likelihood ratio of 10 and a negative likelihood ratio of 0.9. Which statement is correct? | It is useful when present but its absence barely changes the probability | It is useful to rule a diagnosis out when absent | It is useless in all circumstances | It is equally useful present or absent | An LR+ of 10 raises the probability substantially; an LR− near 1 means its absence tells you little. Many specific signs behave like this.
SA3#dentistry-u06-23-q5@2,3: Explain why examination should be guided by the history and pre-test probability rather than performed as a complete routine in every patient. | Signs vary in sensitivity, specificity and reliability, so their meaning depends on the pre-test probability set by the history. Targeted examination tests specific hypotheses and looks for signs that change management, which is more efficient and more accurate. A blind routine produces incidental and false-positive findings, which can lead to unnecessary tests, while key signs may be missed through lack of focus. A competent routine is still useful when the diagnosis is unclear or for screening. | Signs vary in reliability and accuracy ; Pre-test probability determines meaning ; Hypothesis-testing efficiency ; Risk of false positives or missed key signs ; Role for routine when unclear

## Vital signs and the early warning score (NEWS2)
LV: Clinical · Application
S: Deterioration is usually preceded by hours of abnormal observations. This lesson covers the vital signs, the National Early Warning Score 2 (NEWS2) used across the NHS, how to score it and what each score demands.
O: Describe the six physiological parameters of NEWS2 and the normal adult range of each
O: Calculate a NEWS2 score from a set of observations and state the clinical response
O: Evaluate the strengths and limitations of early warning scores
PRE: Principles of physical examination
H: The parameters
P: NEWS2 (Royal College of Physicians, 2017) scores six physiological parameters from 0 to 3 and adds 2 if the patient is receiving supplemental oxygen. The zero-score ranges are:
- **Respiratory rate** 12–20 breaths/min (≤8 or ≥25 scores 3). The most sensitive early sign of deterioration, and the most often guessed.
- **Oxygen saturation** ≥96% on scale 1. **Scale 2** is used for patients with confirmed hypercapnic respiratory failure and a prescribed target of 88–92%, so they aren't scored for saturations in their target range.
- **Systolic blood pressure** 111–219 mmHg (≤90 scores 3).
- **Pulse** 51–90/min (≤40 or ≥131 scores 3).
- **Consciousness**: alert scores 0; **new confusion**, or response only to voice or pain, or unresponsive (ACVPU), scores 3.
- **Temperature** 36.1–38.0 °C (≤35.0 scores 3).
H: Scores and responses
- **0**: routine monitoring, at least 12-hourly.
- **1–4**: at least 4–6-hourly; the registered nurse assesses and decides on escalation.
- **3 in any single parameter**: urgent ward-based review by a clinician.
- **5–6**: urgent response: at least hourly observations and urgent review by a clinician competent in assessing acutely ill patients (a key threshold for possible sepsis).
- **7 or more**: emergency response: continuous monitoring and emergency assessment by a team with critical care competencies, usually with transfer to a higher level of care.
X: A 70-year-old on a surgical ward: RR 24, SpO₂ 95% on air, BP 105/60, pulse 112, alert, temperature 38.4 °C. Calculate NEWS2.
> RR 24 → 2. SpO₂ 95% (scale 1) → 1. Air → 0.
> Systolic 105 → 1. Pulse 112 → 2. Alert → 0. Temperature 38.4 → 1.
> Total 7: emergency response. Assess with ABCDE, consider sepsis, call for senior help immediately and increase monitoring.
K: NEWS2 is a trigger to look at the patient, not a diagnosis. A high score demands urgent senior assessment; a low score doesn't override clinical concern, and staff or relatives' worry is itself a reason to escalate.
!: Missing the extra 2 points for oxygen, or using scale 2 for patients without confirmed hypercapnic respiratory failure. Scale 2 must be prescribed by a clinician; using it inappropriately hides hypoxaemia.
EV: established | Aggregate early warning scores such as NEWS predict cardiac arrest, unplanned intensive care admission and death within 24 hours in hospital patients.
EV: contested | Whether introducing early warning scores, by itself, reduces mortality is less certain than their predictive accuracy, because outcomes depend on the response they trigger.
T: NEWS2 | The National Early Warning Score 2, an aggregate score of six physiological parameters plus oxygen use
T: ACVPU | Alert, new Confusion, responds to Voice, responds to Pain, Unresponsive: the NEWS2 consciousness scale
SUM: NEWS2 scores respiratory rate, saturations, oxygen, blood pressure, pulse, consciousness and temperature.
SUM: Scores of 5–6, or 3 in one parameter, need urgent review; 7 or more an emergency response; clinical concern always counts.
SRC: Royal College of Physicians, National Early Warning Score (NEWS) 2: standardising the assessment of acute-illness severity in the NHS | standard | 2017
SRC: Smith G. B. et al., "The ability of the National Early Warning Score (NEWS) to discriminate patients at risk of early cardiac arrest, unanticipated intensive care unit admission, and death", Resuscitation 84(4):465–470 | primary | 2013 | https://doi.org/10.1016/j.resuscitation.2012.12.016
Q: What NEWS2 score triggers an emergency response? | 7 or more.
Q: When is NEWS2 SpO₂ scale 2 used? | For patients with confirmed hypercapnic respiratory failure with a clinician-prescribed target of 88–92%.
M1#dentistry-u06-24-q1@1: Which observation scores 3 points on its own in NEWS2? | Respiratory rate of 26/min | Pulse of 95/min | Temperature of 37.9 °C | Systolic blood pressure of 115 mmHg | A respiratory rate of 25 or more scores 3. A pulse of 91–110 scores 1, and the temperature and blood pressure given score 0.
NUM2#dentistry-u06-24-q2@2: Calculate NEWS2: RR 22, SpO₂ 93% on 2 L/min oxygen (scale 1), systolic BP 98, pulse 104, new confusion, temperature 36.0 °C. | 13 | 0 | points | RR 21–24 → 2; SpO₂ 92–93 → 2; oxygen → 2; systolic 91–100 → 2; pulse 91–110 → 1; new confusion → 3; temperature 35.1–36.0 → 1. Total 13.
M2#dentistry-u06-24-q3@2: A patient scores NEWS2 2 overall, but the nurse is worried because "he just isn't himself". What should happen? | Escalate for clinical review, because clinical concern overrides a low score | Wait until the score reaches 5 | Repeat observations in 12 hours | Reassure the nurse that a low score excludes deterioration | Early warning scores support, not replace, clinical judgement; concern from staff or relatives should prompt review.
M3#dentistry-u06-24-q4@3: Which is the strongest limitation of relying on NEWS2 alone? | Patients on beta-blockers, with chronic conditions or at the extremes of age may not mount typical physiological changes | It hasn't been validated in any adult population | It doesn't include respiratory rate | It is too complicated to calculate at the bedside | Drugs (beta-blockers blunting tachycardia), chronic disease and frailty can mask deterioration; the score also isn't validated for children or pregnancy, which use their own charts.
SA3#dentistry-u06-24-q5@2,3: Explain why respiratory rate is considered the most important vital sign for detecting deterioration, and why it is often recorded inaccurately. | Respiratory rate rises early in many forms of deterioration (sepsis, metabolic acidosis, hypoxaemia, pulmonary embolism, heart failure) as the body compensates, often before blood pressure falls. It is also scored heavily in NEWS2. It is often estimated rather than counted for a full minute, and recorded values cluster around 16–20, so early rises are missed. Counting for 60 seconds without the patient's awareness improves accuracy. | Early marker of physiological stress ; Examples of conditions ; Precedes hypotension ; Often estimated not counted ; Counting for a full minute

## The cardiovascular examination
LV: Clinical · Application
S: The cardiovascular examination looks for the signs of heart failure, valve disease, endocarditis and vascular disease, from the hands to the heart. This lesson covers the sequence, the pulse and JVP, the apex beat, the auscultation areas and how to recognise the commonest murmurs.
O: Describe the sequence of a cardiovascular examination and the significance of each peripheral sign
O: Locate the apex beat and the four auscultation areas and time a murmur against the pulse
O: Interpret combinations of signs to distinguish common valve lesions and heart failure
PRE: Principles of physical examination
H: Peripheral signs
- **Hands**: clubbing, splinter haemorrhages, Janeway lesions and Osler's nodes (infective endocarditis), tar staining, xanthomata, peripheral cyanosis, capillary refill.
- **Pulse**: rate, rhythm (irregularly irregular in atrial fibrillation), character (slow-rising in aortic stenosis, collapsing in aortic regurgitation), radio-radial and radio-femoral delay (coarctation).
- **Blood pressure**, in both arms if aortic dissection is possible; narrow pulse pressure in severe aortic stenosis, wide in aortic regurgitation.
- **Face**: conjunctival pallor, malar flush (mitral stenosis), xanthelasma, central cyanosis, dental hygiene (endocarditis source).
- **JVP**: with the patient at 45°, the vertical height of the internal jugular pulsation above the sternal angle; normally up to about 3 cm. Raised in right heart failure, fluid overload, tricuspid regurgitation, pericardial constriction and tamponade.
H: The praecordium
P: Inspect for scars (median sternotomy, left thoracotomy for mitral valvotomy), pacemaker boxes and visible pulsations. Palpate the **apex beat**: normally the 5th intercostal space in the mid-clavicular line. A displaced apex suggests a dilated left ventricle; a heaving apex suggests hypertrophy. Feel for a parasternal heave (right ventricular hypertrophy) and thrills (palpable murmurs).
- **Aortic area**: 2nd right intercostal space at the sternal edge.
- **Pulmonary area**: 2nd left intercostal space.
- **Tricuspid area**: 4th left intercostal space at the lower left sternal edge.
- **Mitral area**: the apex.
P: Time each sound against the carotid pulse: the first heart sound (mitral and tricuspid closure) comes just before it, the second (aortic and pulmonary closure) after. Listen with the bell and the diaphragm, then with manoeuvres: left lateral position with the bell at the apex for mitral stenosis; sitting forward in expiration at the lower left sternal edge for aortic regurgitation. Finish with the lung bases (crackles), sacral and ankle oedema, and peripheral pulses.
H: Common murmurs
- **Aortic stenosis**: ejection systolic, loudest in the aortic area, radiating to the carotids; slow-rising pulse; soft second sound in severe disease.
- **Mitral regurgitation**: pansystolic at the apex, radiating to the axilla.
- **Aortic regurgitation**: early diastolic, at the lower left sternal edge, heard best sitting forward in expiration; collapsing pulse.
- **Mitral stenosis**: mid-diastolic rumble at the apex, best with the bell in the left lateral position; often with atrial fibrillation and malar flush.
X: An 80-year-old has exertional breathlessness and presyncope. The pulse is slow-rising, BP 110/90, and there is a harsh ejection systolic murmur at the right second intercostal space radiating to the neck, with a quiet second heart sound. Interpret.
> Ejection systolic murmur in the aortic area radiating to the carotids: aortic stenosis.
> Slow-rising pulse, narrow pulse pressure (20 mmHg) and a soft second sound suggest severe disease.
> Breathlessness, syncope and angina are the classic symptoms of severe aortic stenosis, which carries a poor prognosis untreated: arrange echocardiography and cardiology review promptly.
K: Murmurs are described by timing, site of maximal intensity, radiation, character, loudness and response to manoeuvres; the peripheral signs (pulse character, pulse pressure, apex) often tell you the severity.
!: Assuming loudness reflects severity. In aortic stenosis the murmur may become quieter as the valve becomes critically narrow and cardiac output falls; signs such as a slow-rising pulse and soft second sound are better guides.
EV: established | Echocardiography, not auscultation, is the reference standard for diagnosing and grading valve disease; examination identifies who needs it.
T: Apex beat | The lowest and most lateral point at which the cardiac impulse can be felt, normally the 5th intercostal space in the mid-clavicular line
T: Jugular venous pressure | The vertical height of the internal jugular pulsation above the sternal angle, reflecting right atrial pressure
SUM: Examine from the hands to the heart: endocarditis stigmata, pulse character, BP, JVP, apex, heaves and thrills, then auscultation with manoeuvres.
SUM: Aortic stenosis is ejection systolic to the carotids; mitral regurgitation pansystolic to the axilla; aortic regurgitation early diastolic; mitral stenosis mid-diastolic.
SRC: Innes J. A., Dover A. R., Fairhurst K. (eds), Macleod's Clinical Examination, 14th edn, Elsevier, chapter 4 | secondary | 2018
SRC: McGee S., Evidence-Based Physical Diagnosis, 4th edn, Elsevier, chapters on heart murmurs | secondary | 2018
Q: Where are the four classic auscultation areas? | Aortic: 2nd right intercostal space; pulmonary: 2nd left intercostal space; tricuspid: lower left sternal edge (4th space); mitral: the apex.
Q: Which murmur is heard best with the patient sitting forward in expiration? | Aortic regurgitation (early diastolic, lower left sternal edge).
M1#dentistry-u06-25-q1@1: Where is the apex beat normally palpated? | 5th intercostal space, mid-clavicular line | 2nd intercostal space, right sternal edge | 4th intercostal space, anterior axillary line | 7th intercostal space, mid-axillary line | The normal apex is in the 5th intercostal space in the mid-clavicular line; displacement laterally suggests left ventricular dilatation.
M2#dentistry-u06-25-q2@2: A pansystolic murmur at the apex radiating to the axilla is most consistent with which lesion? | Mitral regurgitation | Aortic stenosis | Aortic regurgitation | Mitral stenosis | Mitral regurgitation produces a pansystolic apical murmur radiating to the axilla.
MS2#dentistry-u06-25-q3@1,2: Which are peripheral signs of infective endocarditis? Choose all that apply. | Splinter haemorrhages ; Janeway lesions ; Osler's nodes | Xanthelasma ; Malar flush | Embolic and immune phenomena of endocarditis appear in the hands; xanthelasma suggests hyperlipidaemia and malar flush mitral stenosis.
M3#dentistry-u06-25-q4@3: A patient has a collapsing pulse, a wide pulse pressure (BP 170/40) and a displaced apex. Which murmur would you expect? | An early diastolic murmur at the lower left sternal edge | A mid-diastolic rumble at the apex | An ejection systolic murmur radiating to the carotids | No murmur, as these signs are normal in older people | Regurgitation back into the ventricle in diastole lowers diastolic pressure and enlarges the ventricle: aortic regurgitation.
SA3#dentistry-u06-25-q5@2,3: A patient has a raised JVP, bibasal crackles, a displaced apex beat and pitting ankle oedema. Explain what each sign indicates and what the combination suggests. | A raised JVP reflects increased right atrial pressure from fluid overload or right ventricular failure. Bibasal crackles suggest pulmonary oedema from raised left atrial and pulmonary venous pressure. A displaced apex indicates left ventricular dilatation. Pitting ankle oedema reflects raised venous pressure and salt and water retention. Together they suggest congestive (biventricular) heart failure, which needs confirmation with natriuretic peptide and echocardiography. | Raised JVP and right-sided pressure ; Crackles and pulmonary oedema ; Displaced apex and LV dilatation ; Oedema and fluid retention ; Heart failure with confirmatory tests

## The respiratory examination
LV: Clinical · Application
S: The respiratory examination combines inspection, palpation, percussion and auscultation to locate disease in the airways, lung tissue or pleura. This lesson covers the sequence, the meaning of each sign, and the patterns of consolidation, effusion, collapse, pneumothorax and fibrosis.
O: Describe the sequence of a respiratory examination and the significance of peripheral signs
O: Interpret percussion notes, breath sounds and added sounds
O: Distinguish consolidation, pleural effusion, collapse, pneumothorax and fibrosis from combinations of signs
PRE: Principles of physical examination
H: Inspection and peripheral signs
- **General**: respiratory rate, use of accessory muscles, pursed-lip breathing, cachexia, oxygen, inhalers and sputum pot.
- **Hands**: clubbing, tar staining, peripheral cyanosis, the flapping tremor of CO₂ retention, fine tremor from β-agonists.
- **Face and neck**: central cyanosis, Horner's syndrome (apical lung tumour), raised JVP (cor pulmonale), lymphadenopathy.
- **Chest**: shape (hyperexpanded barrel chest in COPD), scars, deformity, asymmetry of movement.
H: Palpation, percussion and auscultation
P: Feel the **trachea** in the suprasternal notch: it moves *away* from a tension pneumothorax or large effusion and *towards* collapse or fibrosis. Assess **chest expansion**, which is reduced on the side of the pathology. **Percussion**: resonant is normal; **dull** over consolidation, collapse and fibrosis; **stony dull** over a pleural effusion; **hyper-resonant** over a pneumothorax.
P: **Breath sounds** are vesicular normally; **bronchial** (harsh, with a gap between inspiration and expiration) over consolidation, because solid lung conducts sound from the bronchi well; reduced over effusion, pneumothorax and collapse. **Added sounds**: wheeze (narrowed airways), fine late inspiratory crackles (pulmonary fibrosis), coarse crackles (bronchiectasis, infection, pulmonary oedema), pleural rub. **Vocal resonance** is increased over consolidation and reduced over fluid or air.
H: The classic patterns
- **Consolidation** (pneumonia): reduced expansion, dull, bronchial breathing, crackles, increased vocal resonance; trachea central.
- **Pleural effusion**: reduced expansion, stony dull, reduced breath sounds and vocal resonance; trachea away if large.
- **Pneumothorax**: reduced expansion, hyper-resonant, reduced breath sounds; trachea away if tension.
- **Lobar collapse**: dull, reduced breath sounds; trachea pulled towards.
- **Pulmonary fibrosis**: bilateral fine end-inspiratory crackles at the bases, often with clubbing.
X: A 70-year-old has breathlessness; the right base is stony dull with absent breath sounds and reduced vocal resonance, and the trachea is deviated to the left. Interpret.
> Stony dullness with reduced breath sounds and vocal resonance means fluid between lung and chest wall: a right pleural effusion.
> Tracheal deviation away from the dull side suggests a large effusion pushing the mediastinum.
> Next: chest X-ray, ultrasound-guided pleural aspiration for protein, LDH, pH, microbiology and cytology to find the cause.
K: Two signs separate most patterns: the percussion note (dull, stony dull or hyper-resonant) and the trachea (towards collapse and fibrosis, away from tension and large effusions).
!: Calling every dull base an effusion. Consolidation and collapse are also dull; bronchial breathing and increased vocal resonance point to consolidation, and a trachea pulled towards the side points to collapse.
EV: established | Bedside chest signs have limited sensitivity for pneumonia, so chest radiography is used to confirm it when the diagnosis is uncertain.
T: Bronchial breathing | Harsh breath sounds with a gap between inspiration and expiration, heard over consolidated lung
T: Vocal resonance | Transmission of the patient's voice to the stethoscope, increased by consolidation and reduced by fluid or air
SUM: Inspect, then trachea and expansion, percussion, breath sounds, added sounds and vocal resonance.
SUM: Consolidation, effusion, pneumothorax, collapse and fibrosis each give a characteristic pattern of signs.
SRC: Innes J. A., Dover A. R., Fairhurst K. (eds), Macleod's Clinical Examination, 14th edn, Elsevier, chapter 5 | secondary | 2018
SRC: Metlay J. P., Kapoor W. N., Fine M. J., "Does this patient have community-acquired pneumonia? Diagnosing pneumonia by history and physical examination", JAMA 278(17):1440–1445 | secondary | 1997 | https://doi.org/10.1001/jama.1997.03550170070035
Q: Which way does the trachea move in lobar collapse? | Towards the side of the collapse.
Q: What do fine, late inspiratory crackles at both bases suggest? | Pulmonary fibrosis (interstitial lung disease).
M1#dentistry-u06-26-q1@1: What percussion note is heard over a pneumothorax? | Hyper-resonant | Stony dull | Dull | Resonant | Air in the pleural space gives a hyper-resonant note; fluid gives stony dullness.
M2#dentistry-u06-26-q2@2: Which combination best fits lobar pneumonia? | Dull percussion, bronchial breathing and increased vocal resonance | Stony dull percussion and absent breath sounds | Hyper-resonance and reduced breath sounds | Trachea deviated away with absent breath sounds | Consolidated lung conducts sound from the airways, producing bronchial breathing and increased vocal resonance over a dull area.
TF1#dentistry-u06-26-q3@2: A large pleural effusion pushes the trachea away from the affected side. | true | Fluid occupying the hemithorax displaces the mediastinum to the opposite side; collapse pulls it towards.
M3#dentistry-u06-26-q4@3: A patient has sudden breathlessness, hypotension, a hyper-resonant left chest with absent breath sounds and a trachea deviated to the right. What is the priority? | Immediate decompression of a suspected tension pneumothorax | A chest X-ray to confirm before any intervention | Nebulised bronchodilators | Diuretics for pulmonary oedema | Tension pneumothorax is a clinical diagnosis; haemodynamic compromise means immediate decompression without waiting for imaging.
SA3#dentistry-u06-26-q5@2,3: Explain why consolidation produces bronchial breathing and increased vocal resonance, whereas a pleural effusion reduces both. | Normal air-filled lung filters high-frequency sounds, giving soft vesicular breath sounds. Consolidated lung is solid and airless but the bronchi remain open, so it conducts the harsh sounds of airflow in the large airways and the patient's voice to the chest wall efficiently: bronchial breathing and increased vocal resonance. In an effusion, fluid separates lung from chest wall and reflects and damps sound, so breath sounds and vocal resonance are reduced. | Air-filled lung filters sound ; Solid lung conducts sound well ; Patent bronchi needed ; Fluid separates lung from chest wall ; Fluid damps transmission

## The abdominal examination
LV: Clinical · Application
S: The abdominal examination detects organ enlargement, masses, fluid, tenderness and the signs of chronic liver disease. This lesson covers the peripheral stigmata, the nine regions, palpation of the liver, spleen and kidneys, ascites, and when rectal and hernial examination are needed.
O: Describe the sequence of an abdominal examination and the peripheral signs of chronic liver disease
O: Palpate for the liver, spleen and kidneys and distinguish a splenomegaly from an enlarged left kidney
O: Interpret tenderness, guarding, ascites and bowel sounds in the context of acute and chronic presentations
PRE: Principles of physical examination
H: Peripheral signs
- **Hands**: leukonychia (hypoalbuminaemia), clubbing, palmar erythema, Dupuytren's contracture, asterixis (liver flap of hepatic encephalopathy).
- **Face and eyes**: jaundice (sclerae), pallor, Kayser–Fleischer rings (Wilson's disease), xanthelasma, angular stomatitis.
- **Chest and body**: spider naevi (more than about five is significant), gynaecomastia, loss of body hair, bruising, Virchow's node in the left supraclavicular fossa (Troisier's sign of gastric cancer).
H: The abdomen
P: Lie the patient flat with one pillow and arms by their sides, expose from nipples to groin (preserving dignity), and inspect for distension, scars, stomas, visible peristalsis and caput medusae. Ask about pain and palpate the tender area last, watching the face. **Light palpation** of all nine regions detects tenderness and guarding; **deep palpation** detects masses.
- **Liver**: start in the right iliac fossa and move up with each breath; the edge descends to meet the hand on inspiration. Percuss the upper and lower borders.
- **Spleen**: start in the right iliac fossa and move towards the left costal margin, because it enlarges diagonally.
- **Kidneys**: ballot bimanually in each flank.
- **Ascites**: shifting dullness: percuss from the midline to the dull flank, keep your finger there, roll the patient towards you and wait; resonance at that point means fluid has shifted.
- **Auscultation**: bowel sounds (absent in ileus or peritonitis, high-pitched and tinkling in obstruction), renal bruits.
P: Complete the examination with the hernial orifices and external genitalia, and a digital rectal examination when clinically indicated, with consent and a chaperone offered.
X: How do you tell a large spleen from an enlarged left kidney on examination?
> The spleen has a notch on its medial border; the kidney doesn't.
> You can't get above the spleen (it emerges from under the costal margin); you can feel above a kidney.
> The spleen moves down with inspiration towards the right iliac fossa and isn't ballotable; the kidney is ballotable.
> Percussion over the spleen is dull; over a kidney it is often resonant because of overlying bowel gas.
K: Signs of peritonitis are guarding, rigidity and rebound or percussion tenderness, with a patient who lies still because movement hurts. They point to a surgical cause needing urgent senior review.
!: Starting palpation of the liver or spleen in the upper abdomen. A massively enlarged organ can extend to the iliac fossa, and starting high means missing its edge entirely.
EV: established | Shifting dullness is a moderately sensitive bedside sign of ascites but needs roughly 500 mL or more of fluid; ultrasound detects much smaller volumes.
T: Asterixis | A flapping tremor of the outstretched hands, seen in hepatic encephalopathy, CO₂ retention and uraemia
T: Shifting dullness | A change in the percussion note with position, indicating free peritoneal fluid
SUM: Peripheral signs of chronic liver disease include leukonychia, palmar erythema, spider naevi, gynaecomastia, jaundice and asterixis.
SUM: Palpate from the right iliac fossa for liver and spleen, ballot the kidneys, test for shifting dullness, and complete with hernias, genitalia and rectal examination when indicated.
SRC: Innes J. A., Dover A. R., Fairhurst K. (eds), Macleod's Clinical Examination, 14th edn, Elsevier, chapter 6 | secondary | 2018
SRC: Williams J. W., Simel D. L., "Does this patient have ascites? How to divine fluid in the abdomen", JAMA 267(19):2645–2648 | secondary | 1992 | https://doi.org/10.1001/jama.1992.03480190087039
Q: Give five peripheral signs of chronic liver disease. | Any five of: leukonychia, clubbing, palmar erythema, Dupuytren's contracture, asterixis, jaundice, spider naevi, gynaecomastia, loss of body hair, bruising, caput medusae.
Q: Why is palpation for the spleen started in the right iliac fossa? | It enlarges diagonally towards the right iliac fossa, so a massive spleen would be missed if you started high.
M1#dentistry-u06-27-q1@1: How many spider naevi are usually considered significant? | More than about five | Any single one | More than twenty | Only those on the abdomen | A few spider naevi can be normal (and occur in pregnancy); more than about five in the distribution of the superior vena cava suggests chronic liver disease.
M2#dentistry-u06-27-q2@2: Which feature distinguishes splenomegaly from an enlarged left kidney? | You can't get above the spleen with your hand | The spleen is ballotable | The spleen is resonant to percussion | The spleen doesn't move with respiration | The spleen emerges from under the costal margin and has a notch; the kidney is ballotable and you can usually palpate above it.
TF1#dentistry-u06-27-q3@1: Asterixis can occur in CO₂ retention and uraemia as well as hepatic encephalopathy. | true | A flapping tremor is a sign of metabolic encephalopathy from several causes, not only liver failure.
M3#dentistry-u06-27-q4@3: A patient lies very still with a board-like rigid abdomen and absent bowel sounds. What is the most likely process? | Generalised peritonitis, for example from a perforated viscus | Small bowel obstruction in its early stage | Irritable bowel syndrome | Constipation | Rigidity and immobility (because movement hurts), with a silent abdomen, indicate generalised peritonitis: a surgical emergency.
SA3#dentistry-u06-27-q5@2,3: A patient with alcohol-related cirrhosis has a distended abdomen. Describe how you would show that the distension is due to ascites and what other signs you would look for. | Inspect for distension with everted umbilicus and flank fullness. Percuss from the umbilicus towards the flank until the note becomes dull, mark the point, roll the patient onto the opposite side, wait about 30 seconds and re-percuss: a change from dull to resonant indicates shifting dullness, so free fluid. A fluid thrill helps if the ascites is tense. Look for other signs of portal hypertension and decompensation: caput medusae, splenomegaly, jaundice, asterixis, peripheral oedema and stigmata of chronic liver disease. Confirm with ultrasound and diagnostic paracentesis. | Inspection features ; Shifting dullness technique ; Fluid thrill for tense ascites ; Signs of portal hypertension or decompensation ; Confirmation by ultrasound or paracentesis

## The neurological examination
LV: Clinical · Application
S: The neurological examination localises a lesion, which narrows the causes dramatically. This lesson covers tone, power, reflexes, coordination and sensation, the patterns of upper and lower motor neurone lesions, the root values of reflexes and key dermatomes.
O: Describe the components of a limb neurological examination and the MRC power scale
O: Distinguish upper from lower motor neurone lesions and identify cerebellar signs
O: Use reflex root values and dermatomes to localise a lesion to the brain, spinal cord, root, nerve, junction or muscle
PRE: Principles of physical examination
H: The limb examination
- **Inspection**: wasting, fasciculation, tremor, posture, abnormal movements.
- **Tone**: spasticity (velocity-dependent, "clasp-knife") in upper motor neurone lesions; rigidity ("lead-pipe", or "cogwheel" with tremor) in parkinsonism; reduced in lower motor neurone lesions.
- **Power**: MRC scale 0–5 (0 no contraction; 1 flicker; 2 movement with gravity eliminated; 3 against gravity; 4 against some resistance; 5 normal).
- **Reflexes** with root values: biceps C5–6, supinator C5–6, triceps C7, knee L3–4, ankle S1; plantar responses.
- **Coordination**: finger–nose, heel–shin, rapid alternating movements.
- **Sensation**: light touch, pin prick (spinothalamic), vibration and joint position sense (dorsal columns), mapped to dermatomes or nerves: C6 thumb, C7 middle finger, C8 little finger, T4 nipple, T10 umbilicus, L4 medial shin, L5 dorsum of the foot and big toe, S1 lateral foot and sole.
H: Upper or lower motor neurone
- **Upper motor neurone** (brain, brainstem or spinal cord): spasticity, weakness in a pyramidal pattern (extensors weaker in the arms, flexors in the legs), hyperreflexia, clonus, upgoing plantars, little wasting.
- **Lower motor neurone** (anterior horn cell, root, plexus, nerve): wasting, fasciculation, reduced tone, reduced or absent reflexes, downgoing plantars, weakness in the distribution of the affected root or nerve.
- **Neuromuscular junction** (myasthenia gravis): fatigable weakness, normal reflexes and sensation.
- **Muscle** (myopathy): proximal weakness, normal sensation, reflexes preserved until late.
- **Cerebellar** signs (**DANISH**): dysdiadochokinesia, ataxia, nystagmus, intention tremor, slurred (scanning) speech, hypotonia; signs are on the same side as the lesion.
P: Once the site is known, the **tempo** suggests the pathology: sudden onset (minutes) suggests a vascular cause such as stroke; hours to days suggests inflammation, infection or compression; weeks to months suggests a tumour or degeneration; relapsing and remitting episodes suggest demyelination. Gradual symmetrical distal sensory loss in the feet ("glove and stocking") points to a length-dependent peripheral neuropathy, commonly from diabetes, alcohol or vitamin B12 deficiency.
X: A 45-year-old has weak legs. Tone is increased, power 4/5 with flexors weaker than extensors, knee and ankle reflexes brisk with clonus, plantars upgoing, and a sensory level at the umbilicus. Arms are normal. Localise.
> Bilateral upper motor neurone signs in the legs only: the lesion is in the spinal cord below the arms' supply, or (less likely, given the sensory level) bilateral cerebral.
> A sensory level at the umbilicus (T10) places the lesion at or above T10 in the thoracic cord (the level is often a few segments below the lesion).
> This is a myelopathy: suspect cord compression and arrange urgent MRI of the whole spine.
K: Localise first, then think of causes. The pattern (UMN or LMN, distribution, sensory level, cerebellar signs, fatigability) tells you where; the history's tempo tells you what.
!: Expecting immediate spasticity and brisk reflexes after an acute upper motor neurone lesion. In the first hours to days after a stroke or cord injury, tone and reflexes may be reduced ("spinal shock" or cerebral shock), developing spasticity later.
EV: established | The extensor plantar response (Babinski sign) indicates dysfunction of the corticospinal tract, though its inter-observer reliability is only moderate.
T: Upper motor neurone | A neurone whose cell body is in the motor cortex and whose axon runs in the corticospinal tract to the anterior horn
T: Dermatome | The area of skin supplied by a single spinal nerve root
SUM: Examine tone, power (MRC 0–5), reflexes, coordination and sensation, using root values and dermatomes.
SUM: UMN lesions give spasticity, hyperreflexia and upgoing plantars; LMN lesions give wasting, fasciculation and reduced reflexes; cerebellar lesions give ipsilateral DANISH signs.
SRC: Fuller G., Neurological Examination Made Easy, 6th edn, Elsevier | secondary | 2019
SRC: Medical Research Council, Aids to the Examination of the Peripheral Nervous System (Memorandum no. 45), HMSO | standard | 1976
Q: Give the root values of the biceps, triceps, knee and ankle reflexes. | Biceps C5–6, triceps C7, knee L3–4, ankle S1.
Q: What is MRC power grade 3? | Movement against gravity but not against any resistance.
M1#dentistry-u06-28-q1@1: Which dermatome supplies the little finger? | C8 | C6 | C7 | T1 | C6 supplies the thumb, C7 the middle finger and C8 the little finger.
M2#dentistry-u06-28-q2@2: Which combination indicates a lower motor neurone lesion? | Wasting, fasciculation, reduced tone and absent reflexes | Spasticity, clonus and upgoing plantars | Fatigable ptosis with normal reflexes | Intention tremor and nystagmus | LMN lesions denervate muscle, causing wasting, fasciculation, hypotonia and loss of reflexes.
MS2#dentistry-u06-28-q3@2: Which are cerebellar signs? Choose all that apply. | Dysdiadochokinesia ; Intention tremor ; Nystagmus ; Ataxia | Resting tremor ; Upgoing plantar | DANISH signs are cerebellar; a resting tremor suggests parkinsonism and an upgoing plantar an upper motor neurone lesion.
M3#dentistry-u06-28-q4@3: A patient has wasting and fasciculation in the hands with brisk reflexes and upgoing plantars in the legs, and normal sensation. Which diagnosis best explains this mix? | Motor neurone disease | Multiple sclerosis | Peripheral neuropathy | Myasthenia gravis | Coexisting upper and lower motor neurone signs with no sensory loss is characteristic of motor neurone disease (cervical myelopathy with radiculopathy is the main alternative to exclude).
SA3#dentistry-u06-28-q5@2,3: A patient has left-sided weakness of arm and leg with increased tone, brisk reflexes and an upgoing left plantar, and a left homonymous hemianopia. Localise the lesion and explain your reasoning. | Unilateral arm and leg weakness with UMN signs indicates a lesion of the corticospinal tract above the arm's supply. It is on the left side of the body, so the lesion is in the right hemisphere (the tract crosses in the medulla). A left homonymous hemianopia indicates a lesion of the right optic radiation or occipital cortex, which supports a right cerebral hemisphere lesion, such as a right middle cerebral artery territory stroke. | UMN pattern identified ; Contralateral hemisphere ; Decussation explained ; Visual field defect localised ; Right hemisphere lesion with plausible cause

## Clinical reasoning and diagnostic error
LV: Clinical · Evaluation
S: Diagnosis is a reasoning process that can be studied and improved. This lesson describes intuitive and analytical reasoning, how to build a differential diagnosis, the cognitive biases that cause error, and practical strategies to reduce it.
O: Describe dual-process theory and the use of illness scripts and pattern recognition in diagnosis
O: Construct a differential diagnosis using problem representation, anatomy and a surgical sieve
O: Evaluate the main cognitive biases and strategies for reducing diagnostic error
H: How clinicians reason
P: **Dual-process theory** describes two modes. **System 1** is fast, intuitive pattern recognition, matching a patient to stored **illness scripts** (typical patient, timing, features, mechanism). **System 2** is slow, deliberate and analytical: systematically considering possibilities and testing them. Experts rely heavily on System 1 for familiar problems and switch to System 2 when something doesn't fit; novices need System 2 more often because they have fewer scripts.
P: A **problem representation** is a one-sentence summary using abstract qualifiers: "a 67-year-old smoker with acute, pleuritic chest pain and hypoxia after a long flight". It helps retrieve the right scripts.
H: Building a differential
- Think **anatomically**: what structures lie where the symptom arises?
- Use a **surgical sieve** for causes: vascular, infective, traumatic, autoimmune, metabolic, iatrogenic, neoplastic, congenital, degenerative (VITAMIN CD).
- Rank by **probability** and separately list **can't-miss** diagnoses: those that are dangerous and treatable (aortic dissection, pulmonary embolism, meningitis, ectopic pregnancy).
- Decide what result would **change** your ranking; that's the test to order.
X: A 30-year-old woman presents with "anxiety", palpitations and breathlessness; she had a panic attack last year. The triage note says "anxiety". What could go wrong?
> **Framing and diagnostic momentum**: the label "anxiety" travels with the patient and narrows thinking.
> **Anchoring** on the past history and **premature closure** may stop the search.
> Can't-miss alternatives include pulmonary embolism (is she on the combined pill, recently immobile?), arrhythmia, thyrotoxicosis and asthma.
> A diagnostic time-out ("What else could this be? What doesn't fit?"), checking SpO₂, an ECG and appropriate tests protects against error.
K: Most diagnostic errors involve both system factors and cognitive factors, particularly premature closure. The defences are a differential that includes can't-miss diagnoses, a pause to ask "what else?", and safety-netting with follow-up.
H: Biases and how to counter them
- **Anchoring**: sticking with the first impression despite new information.
- **Premature closure**: accepting a diagnosis before it is verified; the commonest bias in error studies.
- **Availability**: judging likelihood by how easily cases come to mind (a recent memorable case).
- **Confirmation bias**: seeking evidence that supports, not tests, a hypothesis.
- **Diagnostic momentum and framing**: labels passed on and accepted uncritically.
- **Overconfidence** and **base-rate neglect**.
P: Strategies: explicit consideration of alternatives, checklists for high-risk presentations, second opinions, feedback on outcomes, attention to fatigue and workload, and systems that make test results and follow-up reliable.
!: Believing that thinking harder in every case eliminates error. Many errors arise from system failures (missed results, poor handover) and from conditions (fatigue, interruption) as much as from individual reasoning.
EV: established | In a study of 100 diagnostic errors in internal medicine, cognitive factors contributed to 74% and system factors to 65%, with premature closure the most common cognitive problem (Graber et al., 2005).
EV: contested | Whether teaching clinicians about cognitive biases ("debiasing") reduces diagnostic error is uncertain; knowledge-based interventions and system changes have stronger support in some studies.
T: Illness script | A clinician's stored mental model of a disease: who gets it, how it presents and why
T: Premature closure | Accepting a diagnosis before it has been fully verified, so alternatives are not considered
SUM: Clinicians combine fast pattern recognition with slow analysis; good problem representation retrieves the right illness scripts.
SUM: Errors arise from biases such as premature closure and anchoring and from system failures; counter both.
SRC: Graber M. L., Franklin N., Gordon R., "Diagnostic error in internal medicine", Archives of Internal Medicine 165(13):1493–1499 | primary | 2005 | https://doi.org/10.1001/archinte.165.13.1493
SRC: Croskerry P., "The importance of cognitive errors in diagnosis and strategies to minimize them", Academic Medicine 78(8):775–780 | secondary | 2003 | https://doi.org/10.1097/00001888-200308000-00003
SRC: National Academies of Sciences, Engineering, and Medicine, Improving Diagnosis in Health Care, National Academies Press | secondary | 2015 | https://doi.org/10.17226/21794
Q: What is premature closure? | Accepting a diagnosis before it is verified, so other possibilities aren't considered: the most common cognitive cause of diagnostic error.
Q: What are "can't-miss" diagnoses? | Diagnoses that are dangerous and treatable, which must be considered and excluded even when they aren't the most likely.
M1#dentistry-u06-29-q1@1: In dual-process theory, which system describes fast, intuitive pattern recognition? | System 1 | System 2 | System 3 | The analytical system | System 1 is fast and intuitive; System 2 is slow and analytical.
M2#dentistry-u06-29-q2@2: A doctor diagnoses gastritis in a patient labelled "dyspepsia" at triage, without considering an inferior MI. Which bias is most evident? | Diagnostic momentum or framing | Availability bias | Base-rate neglect | Overconfidence in a test result | The label carried from triage framed the problem and was accepted uncritically; an ECG and troponin would test the can't-miss alternative.
TF1#dentistry-u06-29-q3@1: Most diagnostic errors are caused by rare diseases that the doctor has never heard of. | false | Errors mostly involve common conditions and arise from cognitive processes such as premature closure, often combined with system failures.
M3#dentistry-u06-29-q4@3: Which intervention is best supported for reducing diagnostic error in a hospital? | Combining reliable systems for test-result follow-up with prompts to consider alternatives in high-risk presentations | Teaching a list of bias names once in medical school | Ordering every available test on every patient | Removing clinical judgement in favour of algorithms in all cases | Because errors are multifactorial, system fixes (closing the loop on results) and targeted cognitive prompts are more promising than bias-naming alone; blanket testing creates false positives and harm.
SA3#dentistry-u06-29-q5@2,3: A patient was discharged with "musculoskeletal back pain" and returned with a ruptured abdominal aortic aneurysm. Analyse how cognitive and system factors might have contributed and how the error could have been prevented. | Cognitive: anchoring on the common diagnosis, premature closure, availability (back pain is common), failing to consider a can't-miss diagnosis in an older man with vascular risk factors, and perhaps not examining the abdomen. System: time pressure, crowding, interruptions, lack of access to bedside ultrasound or senior review, poor safety-netting. Prevention: a differential with can't-miss diagnoses for back pain in older patients (AAA, cord compression, infection, malignancy), abdominal examination and ultrasound, a diagnostic time-out, senior review and explicit safety-netting advice about worsening pain or collapse. | Cognitive biases named and applied ; Can't-miss diagnosis omitted ; System factors ; Specific prevention steps ; Safety-netting

## Interpreting tests: sensitivity, specificity and predictive values
LV: Clinical · Application
S: No test is perfect, and the same result means different things in different patients. This lesson covers sensitivity, specificity, predictive values and likelihood ratios, how prevalence changes the meaning of a result, and when a test should and shouldn't be ordered.
O: Calculate sensitivity, specificity and predictive values from a 2×2 table
O: Explain how pre-test probability and prevalence change predictive values, and apply likelihood ratios
O: Evaluate when testing is helpful, using rule-in, rule-out and treatment thresholds
PRE: Clinical reasoning and diagnostic error
H: The 2×2 table
E: Sensitivity = TP ÷ (TP + FN) :: the proportion of people with the disease who test positive
E: Specificity = TN ÷ (TN + FP) :: the proportion of people without the disease who test negative
E: PPV = TP ÷ (TP + FP) :: the probability of disease given a positive test
E: NPV = TN ÷ (TN + FN) :: the probability of no disease given a negative test
E: LR+ = sensitivity ÷ (1 − specificity) ; LR− = (1 − sensitivity) ÷ specificity :: how much a result changes the odds of disease
P: A highly **sensitive** test, when negative, helps rule a disease **out** (SnNout); a highly **specific** test, when positive, helps rule it **in** (SpPin). Sensitivity and specificity are properties of the test; predictive values depend on prevalence.
H: Why prevalence matters
X: A test has sensitivity 90% and specificity 95%. What is the PPV in a population where 1% have the disease?
> Take 10,000 people: 100 have the disease, 9,900 don't.
> True positives = 90% of 100 = 90. False positives = 5% of 9,900 = 495.
> PPV = 90 ÷ (90 + 495) = 15%. Even a good test gives mostly false positives when the disease is rare.
> In a clinic where 30% have the disease (3,000 of 10,000): TP 2,700, FP 350, PPV about 89%.
K: The same positive result can mean a 15% or an 89% chance of disease, depending on who was tested. Think about pre-test probability before ordering a test and when interpreting it.
H: Using likelihood ratios and thresholds
P: Post-test odds = pre-test odds × likelihood ratio. LRs above 10 or below 0.1 change probability a lot; LRs between 0.5 and 2 barely change it. Testing is useful only if the result could move the probability across a **threshold**: below the **test threshold**, the diagnosis is unlikely enough to stop; above the **treatment threshold**, treat without further testing. D-dimer is useful to rule out venous thromboembolism in patients with low clinical probability, but a positive result in a high-probability patient adds nothing, because imaging is needed anyway.
!: Ordering tests "just to be sure" in patients with a very low probability of disease. Positive results will mostly be false, leading to further tests, anxiety, cost and sometimes harm from investigation or treatment.
EV: established | Predictive values vary with prevalence, while sensitivity and specificity are relatively stable, though they can also vary with disease severity and the population tested (spectrum bias).
T: Sensitivity | The proportion of people with the condition correctly identified by a positive test
T: Positive predictive value | The proportion of people with a positive test who actually have the condition
SUM: Sensitivity and specificity describe the test; predictive values depend on prevalence and pre-test probability.
SUM: Likelihood ratios convert pre-test into post-test odds; order a test only if the result could change management.
SRC: Altman D. G., Bland J. M., "Diagnostic tests 1: sensitivity and specificity", BMJ 308(6943):1552 | secondary | 1994 | https://doi.org/10.1136/bmj.308.6943.1552
SRC: Altman D. G., Bland J. M., "Diagnostic tests 2: predictive values", BMJ 309(6947):102 | secondary | 1994 | https://doi.org/10.1136/bmj.309.6947.102
Q: What does SnNout mean? | A highly Sensitive test, when Negative, rules the disease out.
Q: How is the positive likelihood ratio calculated? | Sensitivity ÷ (1 − specificity).
M1#dentistry-u06-30-q1@1: Which test property is affected by the prevalence of disease in the population tested? | Positive predictive value | Sensitivity | Specificity | The positive likelihood ratio | Predictive values change with prevalence; sensitivity, specificity and likelihood ratios are properties of the test (within a similar spectrum of patients).
NUM2#dentistry-u06-30-q2@2: A test was used in 1,000 people: 80 true positives, 20 false negatives, 60 false positives and 840 true negatives. What is its sensitivity, as a percentage? | 80 | 0 | % | Sensitivity = TP ÷ (TP + FN) = 80 ÷ 100 = 80%.
M2#dentistry-u06-30-q3@2: In the same 1,000 people (80 TP, 20 FN, 60 FP, 840 TN), what is the positive predictive value? | About 57% | 80% | About 93% | About 98% | PPV = 80 ÷ (80 + 60) = 57%. Specificity is 840 ÷ 900 = 93% and NPV 840 ÷ 860 = 98%.
M3#dentistry-u06-30-q4@3: A young woman with pleuritic chest pain has a low clinical probability of pulmonary embolism and a negative D-dimer. A colleague suggests a CT pulmonary angiogram "to be safe". What is the best response? | A negative sensitive test in a low-probability patient makes PE very unlikely, and CT would add radiation and false-positive risk | CT is always needed because D-dimer is unreliable | The D-dimer should be repeated until it is positive | A positive D-dimer would have confirmed PE, so a negative one is meaningless | Low pre-test probability plus a negative highly sensitive test puts the post-test probability below the test threshold; further imaging adds harm without benefit.
SA3#dentistry-u06-30-q5@2,3: Explain why a screening test with high sensitivity and specificity can still produce more false positives than true positives, and what this means for screening programmes. | When a condition is rare in the screened population, even a small false-positive rate applied to the many people without the disease yields more false positives than the true positives from the few with it, so the PPV is low. Screening programmes therefore need tests with very high specificity, confirmatory diagnostic tests after a positive screen, clear information for participants about false positives, and targeting of groups with higher prevalence where appropriate. Harms of false positives (anxiety, invasive tests) must be weighed against benefits. | Low prevalence ; Specificity applied to many unaffected people ; Low PPV explained ; Confirmatory testing or high specificity needed ; Harms of false positives or targeting

## Interpreting a full blood count and electrolytes
LV: Clinical · Application
S: The full blood count and urea and electrolytes are the most requested tests in hospital. This lesson covers their components and typical adult reference ranges, how to classify anaemia by red cell size, what the white cell differential suggests, and how to read the renal profile.
O: State the components of a full blood count and renal profile with approximate adult reference ranges
O: Classify anaemia by mean cell volume and list the causes in each group
O: Interpret common patterns in the white cell count, platelets, urea, creatinine and electrolytes in clinical context
PRE: Body fluids, osmolality and electrolytes
H: The full blood count
P: Reference ranges vary between laboratories; approximate adult values are: haemoglobin about 130–170 g/L in men and 120–150 g/L in women; mean cell volume (MCV) 80–100 fL; white cell count 4–11 × 10⁹/L (neutrophils 2.0–7.5, lymphocytes 1.0–4.0); platelets 150–400 × 10⁹/L.
- **Microcytic anaemia** (MCV under 80): iron deficiency (the commonest; in an adult man or post-menopausal woman, look for gastrointestinal blood loss), thalassaemia trait (microcytosis out of proportion to the anaemia, normal ferritin), anaemia of chronic disease (sometimes), sideroblastic anaemia.
- **Normocytic anaemia**: acute blood loss, anaemia of chronic disease, chronic kidney disease, haemolysis, marrow infiltration, mixed deficiency.
- **Macrocytic anaemia** (MCV over 100): vitamin B12 or folate deficiency (megaloblastic), alcohol, liver disease, hypothyroidism, reticulocytosis (haemolysis, bleeding), drugs (methotrexate, hydroxycarbamide), myelodysplasia.
- **White cells**: neutrophilia (bacterial infection, steroids, inflammation, tissue necrosis), lymphocytosis (viral infection, chronic lymphocytic leukaemia), eosinophilia (allergy, asthma, parasites, drug reactions), neutropenia (chemotherapy, drugs such as clozapine and carbimazole, viral infection, marrow failure).
- **Platelets**: thrombocytopenia (immune, marrow failure, sepsis and DIC, liver disease with hypersplenism, heparin-induced); thrombocytosis (reactive to inflammation, bleeding, iron deficiency; or myeloproliferative).
H: The renal profile
P: Approximate adult ranges: sodium 135–145 mmol/L, potassium 3.5–5.3 mmol/L, urea 2.5–7.8 mmol/L, creatinine about 60–110 µmol/L (depends on muscle mass). The **eGFR** is calculated from creatinine, age and sex; it assumes stable function, so it is unreliable in acute kidney injury. **Urea rises disproportionately to creatinine** in dehydration, upper gastrointestinal bleeding (digested blood is a protein load) and high protein intake or catabolism (steroids).
X: A 68-year-old man has Hb 92 g/L, MCV 71 fL, platelets 480 × 10⁹/L and ferritin 8 µg/L. Interpret and plan.
> Microcytic anaemia with very low ferritin: iron-deficiency anaemia. The raised platelets are a reactive feature.
> In a man of this age, the most important cause is occult gastrointestinal blood loss, including colorectal and gastric cancer.
> Plan: check coeliac serology, ask about bleeding and diet, refer for urgent investigation of the gut (upper and lower), and replace iron.
K: Always interpret results against the patient and their previous values. A trend (creatinine rising from 80 to 160 µmol/L) can matter more than a single value, and a "normal" result can be abnormal for that patient.
!: Accepting a normal ferritin as excluding iron deficiency in an unwell patient. Ferritin is an acute-phase protein and rises with inflammation, infection and liver disease, so it can be falsely reassuring; transferrin saturation helps.
EV: established | Iron-deficiency anaemia in men and post-menopausal women warrants gastrointestinal investigation because of the risk of underlying malignancy (British Society of Gastroenterology guidance).
T: Mean cell volume | The average volume of red cells, used to classify anaemia as microcytic, normocytic or macrocytic
T: eGFR | Estimated glomerular filtration rate calculated from serum creatinine, age and sex, valid only when function is stable
SUM: Classify anaemia by MCV; read the white cell differential and platelets against the clinical picture.
SUM: Interpret urea, creatinine and electrolytes as trends, remembering eGFR is invalid in acute kidney injury.
SRC: Hoffbrand A. V., Moss P. A. H., Hoffbrand's Essential Haematology, 8th edn, Wiley-Blackwell | secondary | 2019
SRC: Snook J. et al., "British Society of Gastroenterology guidelines for the management of iron deficiency anaemia in adults", Gut 70(11):2030–2051 | guidance | 2021 | https://doi.org/10.1136/gutjnl-2021-325210
Q: Give four causes of a macrocytic anaemia. | Any four of: vitamin B12 deficiency, folate deficiency, alcohol, liver disease, hypothyroidism, reticulocytosis, drugs (methotrexate, hydroxycarbamide), myelodysplasia.
Q: Why can the urea rise more than the creatinine in an upper GI bleed? | Blood in the gut is digested and absorbed as a protein load, increasing urea production.
M1#dentistry-u06-31-q1@1: What MCV defines a microcytic anaemia? | Below about 80 fL | Above 100 fL | Between 80 and 100 fL | Exactly 90 fL | Microcytosis is an MCV under about 80 fL; iron deficiency and thalassaemia trait are the common causes.
M2#dentistry-u06-31-q2@2: A patient has Hb 100 g/L, MCV 64 fL, a normal ferritin and a red cell count at the top of the normal range. What is the most likely diagnosis? | Thalassaemia trait | Iron-deficiency anaemia | Vitamin B12 deficiency | Anaemia of chronic kidney disease | Marked microcytosis with mild anaemia, a high red cell count and normal iron stores suggests thalassaemia trait; haemoglobin electrophoresis confirms it.
TF1#dentistry-u06-31-q3@1: The eGFR is a reliable measure of kidney function during acute kidney injury. | false | eGFR assumes steady-state creatinine; in AKI creatinine lags behind the fall in filtration, so eGFR overestimates function.
M3#dentistry-u06-31-q4@3: A patient on clozapine has a neutrophil count of 0.8 × 10⁹/L and a sore throat. What is the most important concern? | Clozapine-induced neutropenia, which can progress to agranulocytosis and sepsis | Normal variation in neutrophils | A viral infection, so no action is needed | Thalassaemia trait | Clozapine can cause agranulocytosis, which is why it requires mandatory blood monitoring; a low neutrophil count with infection needs urgent action under the monitoring protocol.
SA3#dentistry-u06-31-q5@2,3: A 75-year-old has Hb 88 g/L and MCV 108 fL. Outline a structured approach to the cause. | This is a macrocytic anaemia. Check the reticulocyte count (raised in haemolysis or bleeding), vitamin B12 and folate, liver function, thyroid function and alcohol intake, and review drugs (methotrexate, hydroxycarbamide, some antiretrovirals). A blood film can show hypersegmented neutrophils (megaloblastic) or dysplastic features. If B12 is low, test for intrinsic factor antibodies (pernicious anaemia). If no cause is found, especially with other cytopenias, consider myelodysplasia and a haematology referral for marrow examination. | Identifies macrocytic anaemia ; Reticulocytes and B12 or folate ; Liver, thyroid, alcohol and drugs ; Blood film ; Myelodysplasia or haematology referral

## Arterial blood gas interpretation
LV: Clinical · Application
S: An arterial blood gas tells you about oxygenation, ventilation and acid–base status within minutes. This lesson sets out a systematic approach, the types of respiratory failure, the A–a gradient, and the difference between arterial and venous samples.
O: Interpret oxygenation on an arterial blood gas in relation to the inspired oxygen
O: Classify type 1 and type 2 respiratory failure and identify acute, chronic and acute-on-chronic hypercapnia
O: Apply a systematic approach to a full gas, including acid–base status and lactate
PRE: Acid–base physiology
H: A systematic approach
- **1. The patient and the oxygen**: how unwell, and what FiO₂ were they breathing?
- **2. Oxygenation**: PaO₂ on air is normally about 10–13 kPa. A rough rule: the expected PaO₂ is about 10 kPa less than the inspired oxygen percentage (on 40% oxygen, about 30 kPa). A PaO₂ of 11 kPa on 60% oxygen is therefore severely impaired gas exchange.
- **3. pH**: acidaemia under 7.35, alkalaemia over 7.45.
- **4. PaCO₂** (4.7–6.0 kPa): reflects ventilation.
- **5. Bicarbonate and base excess**: metabolic component and compensation.
- **6. Anion gap, lactate, glucose and electrolytes**, which most blood gas machines also report.
H: Respiratory failure
- **Type 1**: PaO₂ under 8 kPa with a normal or low PaCO₂. A problem of gas exchange (ventilation–perfusion mismatch or shunt): pneumonia, pulmonary embolism, pulmonary oedema, asthma, ARDS.
- **Type 2**: PaO₂ under 8 kPa with PaCO₂ over 6.0 kPa. A problem of ventilation: COPD, neuromuscular weakness, chest wall disease, opioid or sedative excess, exhaustion in severe asthma.
P: In type 2 failure, check the pH and bicarbonate. **Acute** hypercapnia lowers the pH with a normal bicarbonate; **chronic** hypercapnia has a near-normal pH with a raised bicarbonate (renal compensation); **acute-on-chronic** has a raised bicarbonate and a low pH, as in an exacerbation of COPD. Acidotic hypercapnic respiratory failure that persists despite treatment is an indication to consider non-invasive ventilation.
E: A–a gradient = PAO₂ − PaO₂, with PAO₂ ≈ FiO₂ × (101.3 − 6.3) − PaCO₂ ÷ 0.8 (kPa) :: normal is under about 2 kPa in a young adult, rising with age
P: A raised A–a gradient means a problem of gas exchange in the lung; a normal gradient with low PaO₂ means hypoventilation (or low inspired oxygen).
X: A 68-year-old with COPD on 28% oxygen: pH 7.28, PaO₂ 7.6 kPa, PaCO₂ 8.9 kPa, HCO₃⁻ 33 mmol/L. Interpret.
> Oxygenation: PaO₂ 7.6 kPa, low, on 28% oxygen.
> pH 7.28: acidaemia. PaCO₂ high: respiratory acidosis. Bicarbonate high: chronic renal compensation.
> Raised bicarbonate with acidaemia = acute-on-chronic type 2 respiratory failure, typical of a COPD exacerbation.
> Target saturations of 88–92%, treat the exacerbation, and if the acidosis persists after initial treatment, discuss non-invasive ventilation.
K: Never interpret a PaO₂ without the FiO₂. A "normal" PaO₂ on high-flow oxygen can hide severe lung disease.
!: Withholding oxygen from a hypoxaemic patient for fear of CO₂ retention. Hypoxaemia kills faster; in patients at risk of hypercapnic failure, give controlled oxygen to a target of 88–92% and recheck the gas.
EV: established | In patients at risk of hypercapnic respiratory failure, oxygen targeted to saturations of 88–92% is safer than high-flow oxygen (BTS guideline; Austin et al., 2010).
EV: established | Peripheral venous pH and bicarbonate agree reasonably with arterial values in many acute patients, but venous PO₂ can't assess oxygenation.
T: Type 2 respiratory failure | PaO₂ below 8 kPa with PaCO₂ above 6.0 kPa, from inadequate ventilation
T: A–a gradient | The difference between calculated alveolar and measured arterial oxygen tension, raised by gas-exchange disease
SUM: Always read PaO₂ against FiO₂; type 1 failure is a gas-exchange problem, type 2 a ventilation problem.
SUM: Bicarbonate distinguishes acute, chronic and acute-on-chronic hypercapnia; controlled oxygen for patients at risk of CO₂ retention.
SRC: O'Driscoll B. R. et al., "BTS guideline for oxygen use in adults in healthcare and emergency settings", Thorax 72(Suppl 1):ii1–ii90 | guidance | 2017 | https://doi.org/10.1136/thoraxjnl-2016-209729
SRC: Austin M. A. et al., "Effect of high flow oxygen on mortality in chronic obstructive pulmonary disease patients in prehospital setting: randomised controlled trial", BMJ 341:c5462 | primary | 2010 | https://doi.org/10.1136/bmj.c5462
Q: Define type 1 respiratory failure. | PaO₂ below 8 kPa with a normal or low PaCO₂.
Q: What is the approximate expected PaO₂ on 40% inspired oxygen? | About 30 kPa (roughly FiO₂ % minus 10).
M1#dentistry-u06-32-q1@1: Which value distinguishes type 2 from type 1 respiratory failure? | A PaCO₂ above 6.0 kPa | A PaO₂ below 8 kPa | A pH below 7.35 | A bicarbonate above 26 mmol/L | Both types have PaO₂ under 8 kPa; type 2 adds hypercapnia, PaCO₂ over 6.0 kPa.
M2#dentistry-u06-32-q2@2: pH 7.22, PaCO₂ 9.0 kPa, HCO₃⁻ 26 mmol/L in a patient found drowsy after opioids. What does this show? | Acute respiratory acidosis without time for renal compensation | Chronic compensated respiratory acidosis | Metabolic acidosis with respiratory compensation | Acute-on-chronic respiratory acidosis | High CO₂ with a normal bicarbonate and low pH indicates acute hypoventilation, as from opioid toxicity.
M2#dentistry-u06-32-q3@3: A patient on 60% oxygen has a PaO₂ of 12 kPa. Which statement is correct? | Gas exchange is severely impaired despite the normal-looking PaO₂ | Oxygenation is normal | The oxygen can be stopped | The sample must be venous | On 60% oxygen the expected PaO₂ is about 50 kPa; 12 kPa reflects a large A–a gradient.
TF1#dentistry-u06-32-q4@1: A peripheral venous blood gas can reliably assess a patient's oxygenation. | false | Venous PO₂ reflects tissue extraction, not lung function; pulse oximetry or an arterial sample is needed for oxygenation.
SA3#dentistry-u06-32-q5@2,3: A young woman with asthma has a PaCO₂ of 5.8 kPa during a severe attack. Explain why this is a worrying result. | In acute asthma, breathlessness drives hyperventilation, so the PaCO₂ is usually low. A "normal" PaCO₂ means ventilation is no longer keeping up, from exhaustion and severe airflow obstruction, and is a marker of life-threatening asthma. It may herald rising CO₂, respiratory acidosis and arrest. She needs immediate senior and critical care review alongside maximal treatment. | Expected low CO₂ from hyperventilation ; Normal CO₂ indicates tiring or severe obstruction ; Life-threatening feature ; Risk of deterioration ; Urgent senior or critical care escalation

## The 12-lead ECG: a systematic approach
LV: Clinical · Application
S: The ECG is cheap, fast and diagnostic for arrhythmias, ischaemia and electrolyte disturbance. This lesson teaches a systematic method: rate, rhythm, axis, intervals, morphology and ST–T changes, with the coronary territories and the criteria for ST-elevation myocardial infarction.
O: Describe the leads of a 12-lead ECG and the normal waves and intervals
O: Apply a systematic method to determine rate, rhythm, axis and intervals
O: Recognise ST elevation by territory, and the ECG features of hyperkalaemia, and relate them to urgent action
PRE: Membranes, transport and the resting potential
H: Leads and paper
P: Six limb leads (I, II, III, aVR, aVL, aVF) view the heart in the frontal plane; six chest leads (V1–V6) in the horizontal plane. At the standard 25 mm/s, a small square is 0.04 s and a large square 0.2 s. The **P wave** is atrial depolarisation, the **QRS** ventricular depolarisation, the **T wave** ventricular repolarisation.
H: The system
- **Rate**: 300 ÷ the number of large squares between R waves (regular rhythm), or the number of QRS complexes on a 10-second strip × 6 (any rhythm).
- **Rhythm**: regular or irregular; a P wave before every QRS and a QRS after every P? Sinus rhythm has upright P waves in lead II.
- **Axis**: normal between −30° and +90°. A quick check: QRS mainly positive in I and aVF is normal; positive in I and negative in II suggests left axis deviation (left anterior fascicular block); negative in I and positive in aVF suggests right axis deviation.
- **PR interval**: 0.12–0.20 s (3–5 small squares). Long: first-degree heart block. Short: pre-excitation (Wolff–Parkinson–White, with a delta wave).
- **QRS duration**: under 0.12 s. Broad: bundle branch block, ventricular rhythm, hyperkalaemia, pacing.
- **QT interval**, corrected for rate (QTc): prolonged by drugs (some antiarrhythmics, antipsychotics, macrolides), hypokalaemia, hypomagnesaemia and hypocalcaemia, with risk of torsades de pointes.
- **ST segments and T waves**: elevation, depression, inversion.
H: Ischaemia and territories
- **Inferior** (II, III, aVF): usually the right coronary artery.
- **Anterior** (V1–V4): the left anterior descending artery; **septal** V1–V2.
- **Lateral** (I, aVL, V5–V6): the circumflex or diagonal branches.
- **Posterior**: ST depression with tall R waves in V1–V3 (reciprocal); confirm with V7–V9.
P: The Fourth Universal Definition of MI gives ST-elevation thresholds at the J point in two contiguous leads: at least 1 mm in most leads, but in V2–V3 at least 2 mm in men aged 40 or over, 2.5 mm in men under 40, and 1.5 mm in women. New left bundle branch block with symptoms of ischaemia also needs urgent specialist assessment. Pathological Q waves indicate established infarction.
X: A 62-year-old with 40 minutes of central chest pain has 3 mm ST elevation in II, III and aVF and ST depression in I and aVL. Interpret.
> Rate and rhythm: sinus at 60/min. ST elevation in the contiguous inferior leads above threshold: inferior STEMI, usually right coronary artery.
> ST depression in I and aVL is reciprocal change, supporting a true STEMI.
> Record right-sided leads (V4R) for right ventricular infarction, which makes patients sensitive to nitrates, and activate the primary PCI pathway immediately.
K: Read every ECG the same way, every time, and compare with an old one. STEMI is a time-critical diagnosis made on the ECG and the history, without waiting for troponin.
H: Electrolytes
P: **Hyperkalaemia** progresses from peaked T waves to flattened P waves, a long PR, broad QRS and a sine-wave pattern before ventricular fibrillation or asystole; ECG changes mandate urgent treatment. **Hypokalaemia** gives flattened T waves, ST depression, prominent U waves and a long QT interval.
!: Diagnosing an MI from ST elevation alone without considering mimics: pericarditis (widespread saddle-shaped elevation with PR depression), benign early repolarisation, left ventricular hypertrophy, left bundle branch block and ventricular aneurysm. Context and serial ECGs matter.
EV: established | ST-elevation thresholds in the Fourth Universal Definition of Myocardial Infarction vary by lead, sex and age because normal J-point elevation varies between these groups.
T: QTc | The QT interval corrected for heart rate; prolongation increases the risk of torsades de pointes
T: Reciprocal change | ST depression in leads facing away from an area of ST elevation, supporting acute infarction
SUM: Use one system: rate, rhythm, axis, PR, QRS, QT, ST and T, then compare with previous ECGs.
SUM: ST elevation in contiguous leads above threshold localises infarction by territory; hyperkalaemia and hypokalaemia have characteristic patterns.
SRC: Thygesen K. et al., "Fourth universal definition of myocardial infarction (2018)", European Heart Journal 40(3):237–269 | guidance | 2019 | https://doi.org/10.1093/eurheartj/ehy462
SRC: Hampton J., Hampton J., The ECG Made Easy, 9th edn, Elsevier | secondary | 2019
Q: Which leads look at the inferior wall of the heart? | II, III and aVF.
Q: How do you calculate heart rate from an irregular ECG? | Count the QRS complexes on the 10-second rhythm strip and multiply by 6.
M1#dentistry-u06-33-q1@1: What is the normal PR interval? | 0.12–0.20 seconds (3–5 small squares) | 0.04–0.08 seconds | 0.20–0.40 seconds | Under 0.12 seconds in all adults | The PR interval normally lasts 3–5 small squares; longer suggests first-degree heart block, shorter suggests pre-excitation.
NUM2#dentistry-u06-33-q2@2: On a regular ECG at 25 mm/s, there are 4 large squares between consecutive R waves. What is the heart rate? | 75 | 0 | beats/min | 300 ÷ 4 = 75 beats per minute.
M2#dentistry-u06-33-q3@2: ST elevation is seen in V1–V4. Which artery is most likely occluded? | The left anterior descending artery | The right coronary artery | The circumflex artery | The left subclavian artery | V1–V4 face the anterior and septal walls, supplied by the left anterior descending artery.
M3#dentistry-u06-33-q4@3: A patient with renal failure has tall peaked T waves and a QRS of 0.14 s. What is the priority? | Immediate IV calcium for membrane stabilisation alongside treatment to lower potassium | Repeat the ECG tomorrow | Start a beta-blocker | Arrange outpatient echocardiography | A broad QRS with peaked T waves suggests severe hyperkalaemia with imminent arrhythmia risk; calcium protects the myocardium while insulin–glucose and other measures lower potassium.
SA3#dentistry-u06-33-q5@2,3: Explain why widespread ST elevation with PR depression in a young person with pleuritic chest pain is unlikely to be a STEMI, and what else it could be. | STEMI produces ST elevation in a coronary territory, usually with reciprocal depression, and is often convex. Acute pericarditis inflames the epicardium widely, so ST elevation is diffuse across territories, often concave (saddle-shaped), without reciprocal change except in aVR and V1, and with PR depression from atrial injury. Pleuritic pain relieved by sitting forward and a pericardial rub support it. Echocardiography for effusion and troponin (myopericarditis) help. | Territorial versus widespread elevation ; Reciprocal change ; PR depression ; Clinical features of pericarditis ; Further tests

## Chest X-ray interpretation
LV: Clinical · Application
S: The chest X-ray is the most common imaging test in medicine. This lesson provides a systematic approach: checking the film's details and quality, then airways, lungs, heart, diaphragm and everything else, with the classic appearances of common pathology.
O: Assess the details and technical quality of a chest radiograph
O: Apply a systematic ABCDE approach to describe a chest X-ray
O: Recognise the appearances of consolidation, effusion, pneumothorax, collapse, pulmonary oedema and free subdiaphragmatic gas
PRE: The respiratory examination
H: Before you look at the lungs
- **Details**: right patient, date and time, comparison with previous films.
- **Projection**: PA (standard, standing) or AP (portable, often supine). The heart looks larger on AP films, so cardiac size can't be judged reliably.
- **Rotation**: the medial ends of the clavicles should be equidistant from the spinous processes.
- **Inspiration**: about 5–6 anterior ribs or 9–10 posterior ribs above the diaphragm at the mid-clavicular line.
- **Penetration**: the vertebral bodies should just be visible behind the heart.
H: ABCDE
- **A, Airway**: trachea central, carina, main bronchi.
- **B, Breathing**: compare the lung zones, look for opacity or lucency, check the pleural edges and costophrenic angles.
- **C, Circulation (cardiac)**: heart size (cardiothoracic ratio under 0.5 on a PA film), borders, mediastinal width, hila.
- **D, Diaphragm**: right usually higher than left, free gas beneath (pneumoperitoneum), costophrenic angles.
- **E, Everything else**: bones (fractures, metastases), soft tissues (surgical emphysema), lines, tubes and devices (nasogastric tube position, central lines, pacemakers).
H: Common appearances
- **Consolidation**: airspace opacity, often with **air bronchograms**; loss of a heart or diaphragm border shows where it is (**silhouette sign**: right heart border → right middle lobe; left heart border → lingula).
- **Pleural effusion**: blunted costophrenic angle with a meniscus; a large one causes a "white-out" with mediastinal shift away.
- **Pneumothorax**: a visible lung edge with no lung markings beyond it. Tension pneumothorax is a clinical diagnosis and shouldn't wait for an X-ray.
- **Lobar collapse**: volume loss with shift of fissures, hila or trachea towards the collapse (left lower lobe collapse gives a "sail sign" behind the heart).
- **Pulmonary oedema**: cardiomegaly, upper lobe venous diversion, interstitial (Kerley B) lines, bat's-wing alveolar shadowing, effusions.
- **Free gas under the diaphragm** on an erect film: perforated viscus until proven otherwise (or recent surgery).
X: A patient with fever and cough has an opacity in the right lower zone; the right heart border is clearly visible but the right hemidiaphragm is lost. Where is the pneumonia?
> The silhouette sign: a structure's edge disappears when opacity lies against it.
> The right heart border is formed by the right middle lobe; it is preserved, so the middle lobe is clear.
> The right hemidiaphragm is lost, so the opacity lies against it: right lower lobe consolidation.
K: Describe what you see before you name it: location, size, density and borders, then compare with previous films. A systematic routine prevents "satisfaction of search", stopping after the first abnormality.
!: Stopping after finding one abnormality. A second finding (a rib metastasis, a misplaced nasogastric tube, a small pneumothorax) is often missed once the obvious one has been seen.
EV: established | The chest X-ray has limited sensitivity for early lung cancer and small pneumothoraces; CT is more sensitive when clinical suspicion persists.
T: Silhouette sign | Loss of a normal border between soft tissue and lung when an adjacent area of lung becomes opaque
T: Air bronchogram | Air-filled bronchi made visible against surrounding opaque (consolidated) lung
SUM: Check patient, date, projection, rotation, inspiration and penetration before interpreting.
SUM: Use ABCDE and recognise consolidation, effusion, pneumothorax, collapse, oedema and free gas; complete the search after the first finding.
SRC: Corne J., Kumaran M., Chest X-Ray Made Easy, 4th edn, Elsevier | secondary | 2016
SRC: Felson B., Felson L. S., "Localization of intrathoracic lesions by means of the postero-anterior roentgenogram: the silhouette sign", Radiology 55(3):363–374 | primary | 1950 | https://doi.org/10.1148/55.3.363
Q: What is a normal cardiothoracic ratio on a PA chest X-ray? | Less than 0.5.
Q: Which lobe is involved when the right heart border is lost? | The right middle lobe.
M1#dentistry-u06-34-q1@1: Why can't heart size be reliably assessed on an AP chest X-ray? | The heart is further from the detector, so it is magnified | AP films are always over-penetrated | AP films don't show the heart | The cardiothoracic ratio is only valid in children | In the AP projection the heart is anterior and further from the detector, so it appears enlarged.
M2#dentistry-u06-34-q2@2: An erect chest X-ray shows a crescent of gas beneath the right hemidiaphragm in a patient with acute abdominal pain. What does this suggest? | A perforated abdominal viscus | Right lower lobe pneumonia | A large pleural effusion | Normal stomach gas | Free subdiaphragmatic gas (pneumoperitoneum) indicates perforation unless the patient has recently had abdominal surgery; it needs urgent surgical review.
TF1#dentistry-u06-34-q3@1: The medial ends of the clavicles should be equidistant from the spinous processes on a well-centred film. | true | Asymmetry indicates rotation, which can make the mediastinum look widened and the lung zones unequal in density.
M3#dentistry-u06-34-q4@3: A ventilated patient's X-ray shows complete opacification of the left hemithorax with the trachea and mediastinum pulled to the left. What is the most likely cause? | Collapse of the left lung, for example from a mucus plug or a misplaced endotracheal tube | A large left pleural effusion | A left tension pneumothorax | Left lower lobe pneumonia alone | Volume loss pulls the mediastinum towards the opacity; an effusion would push it away. Check the tube position (too far down the right main bronchus) and for mucus plugging.
SA3#dentistry-u06-34-q5@2,3: Describe the chest X-ray features of cardiogenic pulmonary oedema and explain the mechanism of each. | Cardiomegaly reflects a dilated failing heart. Raised pulmonary venous pressure first diverts blood to the upper lobes (upper lobe venous diversion). As pressure rises further, fluid enters the interstitium, thickening the interlobular septa (Kerley B lines) and peribronchial cuffing. Then fluid floods the alveoli, producing bilateral perihilar ("bat's wing") airspace shadowing. Raised pressures also cause pleural effusions. | Cardiomegaly ; Upper lobe diversion ; Interstitial lines from raised pressure ; Alveolar shadowing ; Pleural effusions

## Presenting a patient and documenting care
LV: Clinical · Foundation
S: Clinical information only helps patients if it is communicated clearly. This lesson covers the structure of a case presentation, SBAR for urgent communication, and the professional standards for medical records.
O: Structure an oral case presentation for a ward round or a senior colleague
O: Use SBAR to communicate an urgent concern about a deteriorating patient
O: Apply professional standards to written clinical records and explain why they matter
PRE: The medical history
H: The case presentation
P: A good presentation tells a story that leads to your assessment. Open with a summary sentence (age, key background, presenting problem and duration), then the relevant history including pertinent positives and negatives, examination findings, results, your **assessment** (the most likely diagnosis and important differentials) and your **plan**. Tailor the length: a full presentation for a new patient on a post-take ward round, a few sentences for a review.
X: Present a new admission in one opening sentence.
> "Mrs Ahmed is a 74-year-old woman with type 2 diabetes and chronic kidney disease who presents with a 3-day history of fever, productive cough and increasing breathlessness."
> It gives the listener a frame (who, background, problem, tempo) before the detail.
> End with: "My impression is community-acquired pneumonia with a CURB-65 of 3; differentials include a pulmonary embolism. I'd like to discuss escalation and antibiotics."
H: SBAR for urgent communication
- **Situation**: who you are, where you are, the patient, and the problem in one line ("I'm calling about Mr Jones in bed 12; his NEWS2 is 8 and I'm worried he's septic").
- **Background**: relevant history, admission reason, current treatment.
- **Assessment**: your ABCDE findings and what you think is happening.
- **Recommendation**: what you need ("Please could you review him within 15 minutes?"), and agree what happens meanwhile.
P: SBAR was adapted from military communication and is widely used in the NHS because it puts the request up front and reduces ambiguity across hierarchies. Read back and document the advice you're given.
K: State your concern and your request explicitly. "I'm worried and I need you to come now" is clearer, and safer, than a list of observations that leaves the listener to guess.
H: Medical records
P: Records are for continuity of care, communication between professionals, legal protection and audit. Good medical practice requires records to be clear, accurate and legible, made at the time or as soon as possible after, and to include relevant findings, decisions, information given to patients, drugs prescribed and who is making the record. Each entry should have the date and time, the author's printed name, role and registration number (GMC number), and a clear plan. Never alter a previous entry; add a dated correction instead.
!: Writing "chest clear" or "NAD" when an examination wasn't performed, or copying forward old entries without checking. Records must reflect what was actually done and found; inaccurate notes mislead colleagues and are a probity issue.
EV: established | Structured communication tools such as SBAR improve the clarity of handover and escalation calls in simulation and observational studies.
EV: contested | The effect of SBAR alone on hard patient outcomes, such as mortality, is uncertain because it is usually introduced with other safety measures.
T: SBAR | Situation, Background, Assessment, Recommendation: a structure for clear clinical communication
T: Contemporaneous record | A record made at the time of the events or as soon as possible afterwards
SUM: A case presentation opens with a summary sentence and ends with an assessment and plan.
SUM: Use SBAR to escalate with an explicit request; keep records clear, timed, signed, accurate and contemporaneous.
SRC: General Medical Council, Good medical practice | standard | 2024
SRC: NHS Institute for Innovation and Improvement, SBAR: Situation, Background, Assessment, Recommendation (implementation and training guide) | guidance | 2008
Q: What does SBAR stand for? | Situation, Background, Assessment, Recommendation.
Q: What should every entry in the medical notes include to identify its author? | Date and time, the author's signature, printed name, role and registration (GMC) number.
M1#dentistry-u06-35-q1@1: Which part of SBAR contains your request to the person you are calling? | Recommendation | Situation | Background | Assessment | The Recommendation says what you need (for example review within 15 minutes) and what should happen meanwhile.
M2#dentistry-u06-35-q2@2: You realise an entry you wrote yesterday contains a wrong drug dose. What should you do? | Add a new dated, signed entry correcting the error, leaving the original legible | Erase the original and rewrite it | Remove the page from the notes | Leave it, because it was yesterday | Records must never be altered in a way that conceals the original; a dated correction keeps the record honest and traceable.
TF1#dentistry-u06-35-q3@1: A case presentation should open with a one-sentence summary of the patient and their presenting problem. | true | The opening sentence frames the problem so the listener can interpret what follows.
M3#dentistry-u06-35-q4@3: A junior doctor calls a registrar and lists 10 minutes of observations without saying what they want. What is the main risk? | The urgency and the request are unclear, so the registrar may not attend in time | The registrar will have too much information to make a diagnosis | Observations should never be shared by phone | There is no risk if all observations are correct | Without a clear assessment and recommendation the listener has to infer the concern, and escalation can fail; SBAR puts the request explicitly.
SA3#dentistry-u06-35-q5@2,3: Write an SBAR call for a 70-year-old surgical patient with a NEWS2 of 7, suspected sepsis and falling urine output, and explain why each part matters. | Situation: "I'm Dr X, FY1 on ward 5. I'm calling about Mr Y, 70, two days after bowel resection; his NEWS2 is 7 and I think he has sepsis." Background: surgery, comorbidities, current fluids and antibiotics. Assessment: RR 26, SpO₂ 93% on air, BP 92/60, HR 118, temperature 38.6, lactate 3.2, urine output under 0.5 mL/kg/h for 3 hours, abdomen tender; likely intra-abdominal sepsis or anastomotic leak. Recommendation: "Please review him within 15 minutes; I've started the sepsis pathway; should I request a CT?" Each part frames the problem, supplies context, shares your reasoning and states an explicit, time-bound request that is read back. | Situation with concern stated ; Relevant background ; Assessment with key findings and impression ; Explicit time-bound recommendation ; Explains purpose of each part
`;
