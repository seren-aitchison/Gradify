// PharmaGradify written practice (#/write): clinical checks, counselling, interventions, records and CPD.
// Each task has a rubric and a model answer: learners can always self-assess, and when signed in can ask the
// Gradify AI tutor for provisional feedback (kit/assess/tutor.js). Patients are fictional and doses
// illustrative. Writing practice, not clinical guidance: real decisions use the current BNF, SPC, local
// guidance and professional judgement.
export const WRITING = [
  {
    id: "pharmacy-w-intervention-interaction", unit: "u17", kind: "Clinical check and intervention", minutes: 20,
    title: "A clarithromycin prescription for someone on simvastatin",
    brief: "Complete a clinical check, contact the prescriber using SBAR, and write the intervention record.",
    prompt: "Mr Derek Hale, 68, presents a new prescription for clarithromycin 500 mg twice daily for 7 days for a chest infection. His patient medication record shows simvastatin 40 mg at night, amlodipine 5 mg daily and lansoprazole 30 mg daily. He has no known allergies. Write (1) what you would say to the GP using SBAR, and (2) the intervention record.",
    rubric: [
      "Identifies the interaction: clarithromycin strongly inhibits CYP3A4, raising simvastatin levels and the risk of myopathy and rhabdomyolysis (the combination is contraindicated)",
      "Notes any other relevant issues (for example amlodipine levels may also rise) and checks the indication and allergy status",
      "Uses SBAR clearly and concisely, with a specific recommendation (such as withholding simvastatin during the course and for a short time after, or an alternative antibiotic if appropriate)",
      "Plans patient counselling: what to do with simvastatin, and to report unexplained muscle pain, tenderness or weakness, or dark urine",
      "Writes a complete intervention record: date, patient, problem, action, outcome, who was contacted and who made the record",
    ],
    model: "SBAR to the GP: S: I'm [name], pharmacist at [pharmacy], calling about Derek Hale, date of birth [x], who has a prescription for clarithromycin 500 mg twice daily for 7 days. B: He also takes simvastatin 40 mg at night, amlodipine 5 mg and lansoprazole. A: Clarithromycin is a strong CYP3A4 inhibitor and the BNF lists its use with simvastatin as contraindicated because of the risk of myopathy and rhabdomyolysis; amlodipine levels may also rise. R: I'd suggest he withholds simvastatin during the clarithromycin course (and for a short period afterwards, per the BNF), or, if clinically suitable, an antibiotic without this interaction, such as doxycycline or amoxicillin depending on the indication and local guidelines. Could you confirm which you'd prefer? Intervention record: [date/time]. Patient: Derek Hale. Problem: interaction, clarithromycin with simvastatin (contraindicated, risk of rhabdomyolysis). Action: telephoned Dr [name] at [time]; recommended withholding simvastatin during the course or an alternative antibiotic. Outcome: [for example, GP agreed simvastatin to be withheld for 7 days and resumed 2 days after the course ends; patient counselled]. Counselling: stop simvastatin as agreed, restart on [date], report unexplained muscle pain, weakness or dark urine. Recorded by: [name], pharmacist. (Illustrative: check the current BNF and SPC.)",
  },
  {
    id: "pharmacy-w-counselling-methotrexate", unit: "u17", kind: "Counselling", minutes: 15,
    title: "Counselling on weekly oral methotrexate",
    brief: "Write what you'd cover when counselling someone starting oral methotrexate for rheumatoid arthritis.",
    prompt: "Mrs Joan Price, 59, has rheumatoid arthritis and is starting oral methotrexate 7.5 mg once a week (as 2.5 mg tablets), with folic acid. Write the key points you would cover in counselling, in plain English, and how you'd check her understanding.",
    rubric: [
      "Emphasises the once-weekly dose on the same day each week, and the risks of taking it daily by mistake",
      "Explains folic acid (on a different day from methotrexate, as prescribed) and tablet strength (only the 2.5 mg strength)",
      "Covers monitoring: regular blood tests, and the patient-held monitoring record",
      "Covers warning symptoms to report urgently (sore throat, fever or infection, mouth ulcers, unexplained bruising or bleeding, breathlessness or cough) and key interactions or cautions (such as trimethoprim, NSAIDs, alcohol, pregnancy)",
      "Uses plain language and checks understanding with teach-back",
    ],
    model: "Key points: This medicine is taken once a week only, on the same day each week (for example every Monday): taking it every day by mistake can be very dangerous. Your tablets are all the same 2.5 mg strength; your dose is 3 tablets once a week. You'll also take folic acid, which helps reduce side effects: take it on the day your doctor tells you, not on your methotrexate day. You'll need regular blood tests to check your blood count, liver and kidneys; bring your monitoring booklet to every appointment and pharmacy visit. Tell your doctor straight away if you get a sore throat, fever or other signs of infection, mouth ulcers, unexplained bruising or bleeding, or new breathlessness or cough. Keep alcohol within the limits your doctor advises, and check with a pharmacist before buying medicines: some antibiotics (such as trimethoprim) and anti-inflammatory painkillers can interact. Methotrexate mustn't be taken in pregnancy and contraception is needed; ask before planning a pregnancy. Don't have live vaccines without checking. Checking understanding: \"So I know I've explained it clearly, can you tell me how often you'll take it and which day you've chosen?\" and \"What would you do if you got a sore throat and fever?\" (Illustrative: check the BNF, SPC and local shared care protocol.)",
  },
  {
    id: "pharmacy-w-medrec", unit: "u17", kind: "Medicines reconciliation", minutes: 20,
    title: "Medicines reconciliation on admission",
    brief: "Compare sources, identify discrepancies and write the reconciliation note.",
    prompt: "Mrs Ada Ross, 82, is admitted after a fall. GP record: ramipril 5 mg daily, bisoprolol 2.5 mg daily, atorvastatin 40 mg at night, alendronic acid 70 mg weekly (Mondays), apixaban 2.5 mg twice daily. Her daughter brings a box of medicines: the same, except there's no ramipril and there's an over-the-counter sleeping aid containing diphenhydramine. The admission drug chart lists everything from the GP record except apixaban and alendronic acid. Write the reconciliation note with each discrepancy and your recommendation.",
    rubric: [
      "Uses at least two sources and states them (GP record, the patient's or daughter's account and medicines, the drug chart)",
      "Identifies the omitted apixaban and alendronic acid and the risks of each omission (stroke prevention; weekly bisphosphonate timing)",
      "Identifies the ramipril discrepancy and clarifies whether she is taking it (for example, stopped for low blood pressure or kidney function)",
      "Identifies the diphenhydramine (antimuscarinic, sedating) as a likely contributor to falls and recommends stopping it",
      "Records clear recommendations for the medical team, checks relevant monitoring (such as renal function for the apixaban dose, blood pressure) and documents the sources and who was informed",
    ],
    model: "Medicines reconciliation: Ada Ross, 82, admitted after a fall. Sources: GP summary care record; discussion with daughter and her medicines; inpatient drug chart. Discrepancies: (1) Apixaban 2.5 mg twice daily omitted from the chart: confirm the indication (likely atrial fibrillation) and that the reduced dose is appropriate (check age, weight and creatinine criteria in the SPC); recommend restarting unless there's a reason to withhold (for example a head injury or bleeding after the fall, which the team should assess first). (2) Alendronic acid 70 mg weekly omitted: recommend adding on its usual day (Monday) with counselling on how to take it, if she can sit upright; consider whether the fall caused a fracture. (3) Ramipril on GP record but not in her medicines: daughter unsure; clarify with the GP whether it was stopped (for example for low blood pressure or kidney function) before continuing it, and check blood pressure and U&Es. (4) Over-the-counter diphenhydramine for sleep: sedating and antimuscarinic, increasing falls risk and confusion in older people; recommend stopping and offering sleep hygiene advice. Informed: Dr [name] at [time]. Recorded by [name], pharmacist, [date]. (Illustrative: follow local policy and check the SPC.)",
  },
  {
    id: "pharmacy-w-responding-symptoms", unit: "u17", kind: "Responding to symptoms", minutes: 15,
    title: "A cough that won't go away",
    brief: "Write the consultation record for a request for cough medicine, including your decision.",
    prompt: "A man asks for \"something strong for my cough\". On questioning (WWHAM): he is 62, a smoker for 40 years, has had the cough for 5 weeks, has noticed some blood in his phlegm on two occasions and has lost some weight without trying. He takes no regular medicines. Write your consultation record, your decision and what you would say to him.",
    rubric: [
      "Records the history systematically (who, what, how long, action taken, medicines)",
      "Recognises the red flags: cough over three weeks, haemoptysis, unexplained weight loss, age over 40 and smoking history",
      "Decides not to supply a cough medicine as treatment and refers urgently to the GP (a suspected cancer pathway referral for unexplained haemoptysis at 40 or over, in line with NICE NG12), with the urgency explained",
      "Explains the referral clearly and sensitively, without causing undue alarm, and safety-nets (for example, coughing up larger amounts of blood or breathlessness needs urgent same-day care)",
      "Documents the advice and referral",
    ],
    model: "Record: [date]. Male, 62, requested a strong cough medicine. History: cough for 5 weeks; haemoptysis on two occasions; unintentional weight loss; current smoker, about 40 years; no regular medicines; nothing tried. Red flags: persistent cough over 3 weeks, haemoptysis and weight loss in a smoker over 40, which need urgent assessment (NICE NG12 recommends a suspected cancer pathway referral for people aged 40 and over with unexplained haemoptysis). Decision: no OTC treatment supplied as this needs medical assessment. Advice given: \"A cough that has lasted this long, with blood in the phlegm and weight loss, needs to be checked by a doctor soon, so they can find out the cause and arrange tests such as a chest X-ray. Please book an urgent appointment with your GP today or tomorrow, and tell them about the blood and the weight loss. If you start coughing up more than a small amount of blood, or get very short of breath, call 999 or go to A&E.\" Offered stop smoking support and to contact the GP surgery with his consent. Referral letter or note given. Recorded by [name], pharmacist.",
  },
  {
    id: "pharmacy-w-reflective-account", unit: "u01", kind: "Reflective account", minutes: 20,
    title: "A GPhC reflective account on a near miss",
    brief: "Write a reflective account for GPhC revalidation, linked to the Standards for pharmacy professionals.",
    prompt: "During a busy afternoon, an accuracy check found that propranolol 40 mg had been picked instead of prednisolone 5 mg for a prescription. The error was corrected before it reached the patient. Write a reflective account suitable for GPhC revalidation (anonymised), describing what happened, what you learnt, how you've changed your practice and which standards it relates to.",
    rubric: [
      "Describes the event briefly and anonymously",
      "Analyses why it happened (look-alike, sound-alike names, shelf position, interruptions, workload) rather than blaming individuals",
      "Describes what was learnt and specific changes made (for example separating the products, shelf alerts, reducing interruptions during checks, near-miss logging and team learning)",
      "Links the account to relevant Standards for pharmacy professionals (for example standards 1, 5, 8 and 9)",
      "Shows the effect of the change on practice and on patients, with a plan to review it",
    ],
    model: "What happened: on a busy afternoon, a dispensed item was propranolol 40 mg instead of prednisolone 5 mg; it was found at the final accuracy check and corrected before reaching the patient. Why: the two medicines have similar names (look-alike, sound-alike) and were stored next to each other; the dispenser was interrupted twice while picking; there was a queue. What I learnt: near misses show where the system is weak; similar names and shelf positions are predictable risks; interruptions during picking and checking increase errors. Changes: we moved propranolol and prednisolone to separate shelves and added a shelf alert; we agreed a 'do not interrupt' zone for the checking bench at busy times; we logged the near miss and discussed it at our team huddle, and now review the near-miss log monthly for patterns. Standards: 1 (person-centred care: keeping patients safe); 5 (professional judgement: identifying and managing risk); 8 (speaking up when things go wrong: logging and learning); 9 (leadership: leading the team discussion and changes). Impact: no further confusion between these products in the following two months; the team reports more near misses, which helps us spot risks. I will review the shelf layout for other look-alike, sound-alike pairs.",
  },
  {
    id: "pharmacy-w-consultation-heartburn", unit: "u17", kind: "Patient consultation", minutes: 15, interview: true, who: "patient",
    title: "Consultation: \"Have you got anything for heartburn?\"",
    brief: "Take a history from a customer asking for an indigestion remedy, decide whether to supply or refer, and explain your decision. Open by introducing yourself.",
    client: "Mr Peter Walsh, 58, a taxi driver, asking for something for heartburn.",
    persona: "Friendly but in a hurry; plays it down (\"it's just indigestion\"); a bit embarrassed to talk about weight or swallowing unless asked directly.",
    facts: "Has had burning upper abdominal pain and heartburn most days for about 2 months, worse after meals. Has been buying antacids and an over-the-counter omeprazole on and off without much effect. Only if asked: food sometimes feels like it \"sticks\" on the way down (for the last few weeks); he has lost about half a stone without trying; he takes ibuprofen most days for back pain; he smokes 10 a day; no blood in vomit and no black stools; no other regular medicines; no known allergies. He wants something stronger so he can carry on working.",
    rubric: [
      "Introduces themselves, gains consent and moves to a private area if appropriate",
      "Takes a structured history (such as WWHAM: who, what symptoms, how long, action taken, medicines), including use of NSAIDs",
      "Asks about red flags and uncovers difficulty swallowing and unintentional weight loss",
      "Decides correctly: doesn't supply a stronger product as treatment, and refers urgently to the GP (dysphagia and weight loss need an urgent suspected cancer referral pathway, in line with NICE NG12), advising about the daily ibuprofen",
      "Explains the decision clearly and sensitively, safety-nets (such as vomiting blood or black stools need urgent same-day care) and checks understanding",
    ],
    model: "A strong consultation introduces the pharmacist, asks permission to ask some questions and offers the consultation room. Using WWHAM it establishes: heartburn and upper abdominal pain most days for 2 months; antacids and OTC omeprazole tried without benefit; daily ibuprofen for back pain; a smoker. Asking specifically about red flags reveals food sticking (dysphagia) and unintentional weight loss. Together with age over 55 and persistent symptoms despite treatment, these need urgent medical assessment: NICE NG12 recommends an urgent direct access endoscopy (suspected cancer pathway) for dysphagia, and for people aged 55 and over with weight loss and upper abdominal pain, reflux or dyspepsia. Decision: don't supply a stronger product as a substitute for assessment; refer urgently to the GP (book today or tomorrow), explaining why without causing panic: \"These symptoms need checking by a doctor, who may arrange a camera test. It's important not to wait.\" Advise discussing the daily ibuprofen with the GP, as NSAIDs can cause stomach problems, and consider paracetamol for back pain in the meantime if suitable. Safety-net: vomiting blood, black or tarry stools, or severe pain need urgent same-day care (999 or A&E). Offer stop smoking support and record the consultation and referral.",
  },
];
