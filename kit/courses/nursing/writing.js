// NurseGradify written practice (#/write): reflective accounts, care plans, handovers, documentation and
// explaining care to patients. Each task has a rubric and a model answer: learners can always self-assess
// against them, and when signed in can ask the Gradify AI tutor for provisional feedback (kit/assess/tutor.js).
// Patients and numbers are fictional and illustrative. These are writing practice, not clinical guidance:
// real care follows the person's assessment, local policy, prescriptions and the advice of supervisors.
export const WRITING = [
  {
    id: "nursing-w-reflection-gibbs", unit: "u01", kind: "Reflective account", minutes: 30,
    title: "Reflecting on a missed observation",
    brief: "Write a structured reflection using Gibbs' reflective cycle, as you might for your portfolio or NMC revalidation.",
    prompt: "On placement, you were asked to record a patient's observations at 14:00. You were busy helping another patient and recorded them at 14:50. The patient's NEWS2 score had risen from 1 to 4. Your practice supervisor escalated it, and the patient was reviewed and treated for a urinary tract infection. Write a reflective account of this event using Gibbs' cycle. Don't include any information that could identify the patient or the setting.",
    rubric: [
      "Follows the six stages of Gibbs' cycle (description, feelings, evaluation, analysis, conclusion, action plan)",
      "Describes the event concisely and keeps it anonymous and confidential",
      "Is honest about feelings and evaluates what went well and what didn't",
      "Analyses why it happened, drawing on knowledge (prioritisation, delegation, communication, the purpose of timely observations and NEWS2 escalation) and the NMC Code",
      "Ends with specific, realistic actions (SMART), including what to do when tasks clash and when to ask for help",
    ],
    model: "Description: On a busy shift I was asked to record a patient's observations at 14:00 but was helping another patient and recorded them at 14:50. The score had risen from 1 to 4; my supervisor escalated it and the patient was reviewed and treated. Feelings: I felt anxious and guilty that the delay could have harmed the patient, and relieved that it was escalated promptly once found. Evaluation: Good: I recorded accurate observations and reported the score immediately, and the escalation worked. Not good: the observations were 50 minutes late, and I didn't tell anyone I couldn't do them on time. Analysis: Timely observations matter because NEWS2 depends on detecting change early; a delay can mean deterioration, such as developing sepsis, is missed. The NMC Code asks me to prioritise people, work within my competence and communicate effectively, including saying when I can't complete a task. I didn't prioritise or hand the task back. Conclusion: I should have told my supervisor at 14:00 that I was delayed so the task could be reallocated. Action plan: From my next shift I will (1) tell my supervisor at once when I can't complete a timed task; (2) review my patients' observation times at the start of each shift with my supervisor; (3) complete the deteriorating patient e-learning and discuss NEWS2 escalation with my practice assessor within two weeks.",
  },
  {
    id: "nursing-w-care-plan-pressure", unit: "u06", kind: "Care plan", minutes: 30,
    title: "Care plan: preventing pressure ulcers",
    brief: "Write a person-centred care plan for one problem, with a goal, interventions and rationales, and an evaluation date.",
    prompt: "Mrs Eileen Moss, 84, has been admitted after a fall at home. She has reduced mobility, mild dementia, eats little, and has urinary incontinence. Her skin is intact but red over the sacrum, and the redness fades when pressed. Write a care plan for the problem 'at risk of pressure damage'.",
    rubric: [
      "States the problem and a clear, measurable, person-centred goal (for example skin intact at review)",
      "Includes a structured risk assessment (a validated tool such as Waterlow or PURPOSE-T, and skin inspection using the SSKIN or aSSKINg approach)",
      "Gives specific interventions with rationales: surface, repositioning schedule, skin care and continence management, nutrition and hydration, involving Mrs Moss and family",
      "Recognises the dementia (communication, consent and best interests, capacity) and when to refer (tissue viability, dietitian)",
      "Sets evaluation dates and what to record and escalate",
    ],
    model: "Problem: Mrs Moss is at high risk of pressure damage because of reduced mobility, incontinence, poor nutritional intake and age; blanching redness over the sacrum shows early pressure effect. Goal: Mrs Moss's skin will remain intact, with the sacral redness resolved, at review in 72 hours. Interventions and rationales: (1) Complete a validated risk assessment (for example PURPOSE-T or Waterlow) on admission and as her condition changes, and inspect her skin at each repositioning using aSSKINg, recording findings, to detect change early. (2) Provide a pressure-redistributing mattress and cushion as per local policy, to reduce pressure on bony prominences. (3) Encourage and help her to change position regularly, following a documented schedule agreed with her (for example every 2 to 4 hours, more often if redness persists), avoiding lying on the red area, to relieve pressure and shear. (4) Manage continence: offer the toilet regularly, use breathable pads and clean and dry the skin promptly with a pH-balanced cleanser and barrier product, as moisture damages skin. (5) Screen nutrition (MUST), encourage food and fluids with preferences and support at mealtimes, record intake and refer to the dietitian, because poor nutrition impairs skin integrity. (6) Mrs Moss has mild dementia: explain simply, check understanding, involve her family, and act in her best interests under the Mental Capacity Act 2005 if she lacks capacity for a decision. Refer to tissue viability if the skin breaks or redness doesn't fade. Evaluation: review the skin at each repositioning, and the plan daily and formally in 72 hours; record findings and escalate any non-blanching redness or broken skin promptly according to local policy.",
  },
  {
    id: "nursing-w-sbar-handover", unit: "u03", kind: "SBAR handover", minutes: 20,
    title: "SBAR: a patient becoming unwell",
    brief: "Write the SBAR you would use to escalate a concern by phone. The numbers are illustrative.",
    prompt: "You are caring for Mr Daniel Hughes, 67, day 2 after bowel surgery. At 03:00: respiratory rate 24, SpO2 95% on room air (scale 1), BP 98/60 (usually 135/80), heart rate 112, temperature 38.4°C, new confusion. He's passed 60 mL of urine in the last 4 hours. Calculate his NEWS2 score. Write an SBAR to the on-call doctor.",
    rubric: [
      "Situation: who you are, who the patient is, and the concern stated clearly at the start, including the correct NEWS2 score (11: respiration 2, SpO2 1, air 0, systolic BP 2, pulse 2, new confusion 3, temperature 1)",
      "Background: relevant history (operation, day 2, usual BP) concisely",
      "Assessment: the observations in a structured way (ABCDE), the urine output and your judgement that the patient may have sepsis and is deteriorating",
      "Recommendation: a clear, specific request (urgent review within a stated time, which is immediate for NEWS2 of 7 or more) and checks what to do meanwhile",
      "Uses closed-loop communication and records the call and plan",
    ],
    model: "S: This is [name], staff nurse on [ward]. I'm calling about Daniel Hughes, 67, in bed 4. I'm concerned he's deteriorating and may have sepsis: his NEWS2 is 11. B: He's day 2 after bowel surgery. His blood pressure is usually around 135/80. A: Airway clear. Breathing: respiratory rate 24, SpO2 95% on air. Circulation: heart rate 112, BP 98/60, urine output 60 mL in 4 hours. Disability: new confusion. Exposure: temperature 38.4°C. I think he may have sepsis, possibly from an abdominal source, and he's deteriorating. R: Please come and review him now (NEWS2 of 7 or more needs an emergency assessment). Should I start the sepsis screening and take blood cultures, and is there anything else you want me to do before you arrive? Could you confirm when you'll be here? [Read back the plan; increase observations; document the call, time and agreed plan; escalate further, including to the critical care outreach team, as local policy says if there is no review in time.]",
  },
  {
    id: "nursing-w-documentation-fall", unit: "u06", kind: "Documentation", minutes: 15,
    title: "Record of an inpatient fall",
    brief: "Write the nursing record after a fall. All details are invented.",
    prompt: "At 22:10 you found Mr Ray Ellis, 78, sitting on the floor beside his bed. He says he tried to walk to the toilet without his frame. He hit his head on the locker. He is on apixaban. Write the nursing record entry for this fall.",
    rubric: [
      "Factual, contemporaneous, dated, timed and signed, with no opinion presented as fact and no abbreviations that could be misread",
      "Records what was found and what the patient said (in his words where useful)",
      "Records the post-fall assessment before moving him (checks for injury, observations including neurological observations) and safe moving",
      "Recognises the head injury on an anticoagulant as needing urgent medical review (and likely a CT under NICE guidance) and records escalation, family notification, an incident report and the falls care plan review",
      "Records the plan and who was informed",
    ],
    model: "5 November, 22:25. Mr Ellis was found at 22:10 sitting on the floor beside his bed. He said, 'I was going to the toilet and didn't take my frame.' He reported hitting the left side of his head on the bedside locker. On assessment before moving: alert and orientated, GCS 15, no loss of consciousness reported, small swelling to the left temple, no other visible injury, moving all limbs, no new pain in hips or limbs. Observations: within his usual range (NEWS2 0). He is on apixaban, so this is a head injury in a person on an anticoagulant. Moved back to bed using a hoist following the post-fall procedure. Dr [name] (FY2) informed at 22:15 and asked to review urgently because of the head injury and anticoagulant (likely CT head per NICE guidance); neurological observations started as per local post-fall protocol. Daughter informed by phone at 22:20 with Mr Ellis's agreement. Incident report submitted (ref [number]). Falls risk assessment and care plan to be reviewed; call bell and frame placed within reach and use explained. [Signature, printed name, designation].",
  },
  {
    id: "nursing-w-explain-procedure", unit: "u01", kind: "Explaining care", minutes: 15,
    title: "Explaining a procedure and gaining consent",
    brief: "Write what you would say to explain a procedure in plain English and check consent.",
    prompt: "You need to take a blood glucose reading from Ms Amira Said, 45, who has just been diagnosed with type 2 diabetes and is anxious about needles. Write what you would say to explain the test, gain her consent and support her, in plain English.",
    rubric: [
      "Introduces self and checks identity, using plain, kind language without jargon",
      "Explains what the test involves, why it's needed and what the result will be used for",
      "Acknowledges her anxiety and offers practical support and choices",
      "Seeks valid consent: informed, voluntary, with the chance to ask questions and to decline",
      "Checks understanding and explains what happens next",
    ],
    model: "Hello, I'm [name], one of the student nurses looking after you today. Can I check your full name and date of birth, please? Thank you. I'd like to check your blood sugar level. It helps us see how your body is handling sugar and makes sure your treatment is right for you. I'd use a tiny finger prick to get a drop of blood, which goes on a test strip in this small machine. It takes a few seconds and feels like a quick sharp scratch. I understand you're worried about needles, and that's very common. You can look away, sit or lie however you're comfortable, and choose which finger. I'll tell you before I do it, and we can stop at any time. Do you have any questions? Are you happy for me to go ahead? [If she agrees:] Thank you. [Afterwards:] All done. Your reading is [result]; I'll record it and let the team know, and we'll talk about what it means for you. How are you feeling? We'll go through how to check your own blood sugar later, if you'd like.",
  },
  {
    id: "nursing-w-discharge", unit: "u07", kind: "Discharge planning", minutes: 25,
    title: "Planning a safe discharge",
    brief: "Write a discharge plan summary for an older adult going home.",
    prompt: "Mr George Barnes, 81, lives alone and is ready for discharge after treatment for pneumonia. He walks with a stick and has slowed down since admission. He takes six regular medicines, one of which has changed. His daughter lives 40 minutes away. Write a discharge plan summary covering what needs to be in place for a safe discharge.",
    rubric: [
      "Starts from the person: his views, goals and capacity to make decisions about going home",
      "Covers functional and safety needs: therapy assessment (mobility, home environment), equipment, and care or reablement support",
      "Covers medicines: reconciliation, the changed medicine explained, supply, compliance aids if needed, and information to the GP and community pharmacist",
      "Covers communication: discharge summary to the GP, community services, and the daughter (with his consent), follow-up and safety-netting advice",
      "Covers timing, transport, and who to contact if things go wrong",
    ],
    model: "Mr Barnes's goal is to return home, and he has capacity to make this decision; his daughter is to be involved with his agreement. Function and safety: physiotherapy and occupational therapy assessments of his mobility and transfers, and a home assessment if needed, because he has slowed down since admission; equipment (for example a walking frame, perching stool, raised toilet seat) in place before discharge; reablement support or a package of care discussed with him and arranged through the discharge team; a pendant alarm considered as he lives alone. Medicines: full medicines reconciliation; the changed medicine explained to him and his daughter, with written information, including what has stopped; enough supply; a check that he can manage his medicines (a compliance aid or community pharmacy discharge referral if needed); the change communicated in the discharge summary. Communication: discharge summary to the GP on the day of discharge, referrals to community nursing or therapy as needed, follow-up appointments (for example a chest X-ray if planned) explained. Safety-netting: he and his daughter know what to watch for (worsening breathlessness, fever, confusion, not eating or drinking) and who to call, including out of hours. Practical: discharge time agreed early, transport booked, food and heating at home checked, house keys, and a follow-up phone call the next day if the service offers one.",
  },
];
