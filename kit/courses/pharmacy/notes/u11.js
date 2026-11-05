// School 11: Infection and Antimicrobial Stewardship. UK, as at 2026.
// Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// EDUCATION ONLY. Antimicrobial choices follow national guidance (NICE, UKHSA, the Green Book) and local
// formularies, which reflect local resistance: always check them, the BNF and the SPC. Any dose is illustrative.
export default `
## Microbiology for pharmacists
S: Choosing an antimicrobial well starts with understanding the organisms that cause infection. Bacterial structure, how organisms are identified and which are resistant all shape treatment decisions.
O: Describe how bacteria are classified and identified
O: Explain the clinical relevance of common resistant organisms
T: Gram stain | A staining method dividing bacteria into Gram-positive (thick peptidoglycan wall) and Gram-negative (thin wall with an outer membrane)
T: Culture and sensitivity | Growing an organism from a sample and testing which antimicrobials it's susceptible to
H: Classifying bacteria
- **Gram-positive**: staphylococci (including MRSA), streptococci, enterococci, clostridia.
- **Gram-negative**: E. coli and other coliforms, Pseudomonas, Haemophilus, Neisseria.
- **Atypical** organisms (Mycoplasma, Chlamydia, Legionella) lack a typical cell wall, so beta-lactams don't work on them.
- **Anaerobes** (such as Bacteroides and Clostridioides) live without oxygen and are treated with drugs like metronidazole.
H: Identification and resistance
- Take samples (blood, urine, sputum, swabs) before starting antibiotics where possible, then adjust treatment to culture results.
- Resistant organisms: MRSA (meticillin-resistant Staphylococcus aureus), ESBL-producing coliforms (resistant to many beta-lactams), carbapenemase-producing Enterobacterales (CPE), and vancomycin-resistant enterococci.
- Normal flora protect us; broad-spectrum antibiotics disrupt them, allowing infections such as C. difficile and thrush.
- Check results with the microbiology team and follow local guidance when cultures show resistant organisms.
K: Gram stain, culture and sensitivities guide treatment; take samples before antibiotics where possible and know the major resistant organisms.
!: Starting antibiotics before sending a sample, when the result would have guided better treatment.
Q: Why don't beta-lactams treat Mycoplasma? | It lacks a typical cell wall, which beta-lactams target.
Q: What is an ESBL? | An extended-spectrum beta-lactamase, making coliforms resistant to many beta-lactams.
SUM: Classify bacteria by Gram stain, shape and oxygen needs.
SUM: Cultures guide treatment; resistant organisms limit choices.
SRC: UK Health Security Agency, UK Standards for Microbiology Investigations | standard | 2025 | https://www.gov.uk/government/collections/standards-for-microbiology-investigations-smi
SRC: Joint Formulary Committee, British National Formulary: antibacterials, principles of therapy | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u11-01-q1@1: Which organism is Gram-positive? | Staphylococcus aureus | Escherichia coli | Pseudomonas aeruginosa | Klebsiella pneumoniae | Haemophilus influenzae | Staphylococci have a thick peptidoglycan wall.
M2#pharmacy-u11-01-q2@2: Why take a sample before starting antibiotics? | So culture results can guide treatment | To increase the antibiotic's effect | Because samples are always required by law | To reduce the dose needed | It doesn't matter when | Antibiotics can stop organisms growing in the sample.
M2#pharmacy-u11-01-q3@1: Which drug targets anaerobic bacteria? | Metronidazole | Trimethoprim | Nitrofurantoin | Flucloxacillin | Fosfomycin | Metronidazole is active against anaerobes.

## Antibiotic classes and mechanisms
S: Antibiotics act on bacterial cell walls, protein synthesis, nucleic acids or metabolism. Each class has a characteristic spectrum, set of adverse effects and interactions that pharmacists must know.
O: Describe the mechanisms and spectra of the main antibiotic classes
O: Identify key adverse effects, interactions and cautions for each class
T: Beta-lactam | An antibiotic with a beta-lactam ring that blocks cell wall synthesis: penicillins, cephalosporins, carbapenems
T: Beta-lactamase inhibitor | A drug (such as clavulanic acid or tazobactam) protecting a beta-lactam from bacterial enzymes
H: The main classes
- **Penicillins**: amoxicillin, flucloxacillin (staphylococci), phenoxymethylpenicillin; co-amoxiclav and piperacillin-tazobactam include beta-lactamase inhibitors. Allergy is the key caution.
- **Cephalosporins** (cefalexin, ceftriaxone) and **carbapenems** (meropenem, reserved for resistant infections); a C. difficile risk.
H: Other classes
- **Macrolides** (clarithromycin, azithromycin): QT prolongation; clarithromycin strongly inhibits CYP3A4.
- **Tetracyclines** (doxycycline): photosensitivity, oesophageal irritation, chelation with calcium and iron; avoid in pregnancy and under 12s.
- **Aminoglycosides** (gentamicin): nephrotoxicity and ototoxicity; levels monitored.
- **Glycopeptides** (vancomycin): IV levels monitored; oral for C. difficile.
- **Quinolones** (ciprofloxacin, levofloxacin): rare but disabling and long-lasting tendon, nerve and psychiatric effects, and aortic aneurysm risk; use only when other antibiotics are inappropriate (MHRA).
- **Trimethoprim** (folate antagonist: hyperkalaemia, avoid in early pregnancy), **nitrofurantoin** (renal threshold; lung and liver reactions with long-term use), **metronidazole**, **clindamycin** (high C. difficile risk).
K: Match each class to its spectrum, toxicities and interactions; quinolones are restricted because of disabling adverse effects.
!: Choosing a quinolone for an uncomplicated infection when another antibiotic would work.
Q: Name two adverse effects of gentamicin. | Nephrotoxicity and ototoxicity.
Q: Why are quinolones restricted? | Rare but disabling, long-lasting tendon, nerve and psychiatric adverse effects, and aortic aneurysm risk.
SUM: Antibiotic classes differ in mechanism, spectrum and harms.
SUM: Know the key cautions and interactions for each.
SRC: Joint Formulary Committee, British National Formulary: antibacterials | guidance | 2026 | https://bnf.nice.org.uk/
SRC: MHRA, Drug Safety Update: fluoroquinolone antibiotics, must now only be prescribed when other commonly recommended antibiotics are inappropriate | guidance | 2024-01 | https://www.gov.uk/drug-safety-update
M1#pharmacy-u11-02-q1@2: Which antibiotic is a strong CYP3A4 inhibitor? | Clarithromycin | Amoxicillin | Doxycycline | Nitrofurantoin | Gentamicin | Clarithromycin interacts with simvastatin, some DOACs and many others.
M2#pharmacy-u11-02-q2@1: Which antibiotic should be taken with water, upright, and not with milk? | Doxycycline | Amoxicillin | Metronidazole | Flucloxacillin | Cefalexin | Doxycycline causes oesophageal irritation and is chelated by calcium.
M2#pharmacy-u11-02-q3@2: Which antibiotic class is linked to tendon rupture? | Fluoroquinolones | Penicillins | Macrolides | Glycopeptides | Nitrofurans | The MHRA restricts fluoroquinolones because of tendon and other disabling effects.

## Antimicrobial resistance
S: Antimicrobial resistance (AMR) makes infections harder to treat and threatens modern medicine. Every unnecessary antibiotic adds to the problem, so pharmacists have a central role in preventing it.
O: Explain how antimicrobial resistance develops and spreads
O: Describe actions that reduce antimicrobial resistance
T: Antimicrobial resistance (AMR) | The ability of microorganisms to survive medicines that would normally kill them or stop their growth
T: Selection pressure | The advantage antimicrobial use gives to resistant organisms
H: How resistance arises
- Mutation and gene transfer (plasmids) let bacteria produce enzymes (such as beta-lactamases), change targets, pump drugs out or block entry.
- Antibiotic use, especially unnecessary or broad-spectrum use, selects resistant organisms.
- Resistance spreads between people, animals and the environment ("One Health"), through poor infection control and global travel.
H: Reducing AMR
- Prescribe antibiotics only when needed, with the narrowest effective spectrum and shortest effective duration.
- Infection prevention: hand hygiene, vaccination, sanitation.
- Surveillance and new drug development.
- The UK national action plan sets targets to reduce antimicrobial use and resistant infections.
- Public education: antibiotics don't work for viral infections such as colds and most sore throats.
- Follow NICE antimicrobial prescribing guidance and local formularies, which are updated as resistance changes.
K: AMR is driven by antibiotic use and spread; prescribe only when needed, narrow and short, and prevent infection.
!: Supplying leftover antibiotics or encouraging people to keep antibiotics "just in case".
Q: What is selection pressure? | The advantage antimicrobial use gives to resistant organisms.
Q: Name two ways to reduce AMR. | For example avoiding unnecessary antibiotics and improving infection prevention.
SUM: Resistance arises through mutation and gene transfer, and is selected by antibiotic use.
SUM: Stewardship and infection prevention reduce AMR.
SRC: Department of Health and Social Care, Confronting antimicrobial resistance 2024 to 2029: UK national action plan | guidance | 2024 | https://www.gov.uk/government/publications/uk-5-year-action-plan-for-antimicrobial-resistance-2024-to-2029
SRC: World Health Organization, Global action plan on antimicrobial resistance | guidance | 2015 | https://www.who.int/
M1#pharmacy-u11-03-q1@1: What drives antimicrobial resistance most? | Antibiotic use, especially unnecessary use | Vaccination | Hand washing | Healthy diets | Exercise | Use creates selection pressure for resistant organisms.
M2#pharmacy-u11-03-q2@2: Which approach reduces AMR? | Narrowest effective spectrum for the shortest effective time | Broad-spectrum antibiotics for everything | Longer courses as standard | Antibiotics for colds | Keeping leftovers | Targeted, short courses reduce selection pressure.
M2#pharmacy-u11-03-q3@1: What does "One Health" mean in AMR? | Human, animal and environmental health are linked | Only one antibiotic should be used | Health care in one country | Each patient has one antibiotic | A single health record | Resistance spreads between people, animals and the environment.

## Antimicrobial stewardship
S: Antimicrobial stewardship is a coordinated programme to use antimicrobials well: the right drug, dose, route and duration, reviewed regularly. Pharmacists lead much of it in hospitals and the community.
O: Describe the principles of antimicrobial stewardship in hospital and primary care
O: Apply the 48 to 72 hour review in hospital practice
T: Start Smart then Focus | UKHSA's antimicrobial stewardship toolkit for hospitals
T: TARGET toolkit | Resources to support antibiotic stewardship in primary care
H: Hospital stewardship
- **Start smart**: don't start without evidence of infection; take cultures; prescribe in line with local guidelines; document indication, duration or review date.
- **Then focus**: at 48 to 72 hours, review and decide: stop, switch IV to oral, change (de-escalate to narrower spectrum), continue, or outpatient parenteral therapy.
- Antimicrobial pharmacists audit and feed back use.
H: Primary care and pharmacy
- Use the TARGET toolkit and NICE antimicrobial guidelines; back-up (delayed) prescriptions where appropriate.
- Explain to people why antibiotics may not be needed, what to expect and when to seek help.
- Check the dose, duration and allergy status on every antibiotic prescription; query unusually long courses.
- Encourage returning unused antibiotics for safe disposal.
K: Start smart (indication, guidelines, cultures), then focus (review at 48 to 72 hours); in primary care, use guidelines, back-up prescriptions and clear advice.
!: Continuing IV antibiotics past 72 hours without review, when the person could switch to oral treatment.
Q: What decisions are made at the 48 to 72 hour review? | Stop, switch IV to oral, change, continue, or outpatient parenteral therapy.
Q: What is the TARGET toolkit? | Resources supporting antibiotic stewardship in primary care.
SUM: Stewardship means the right antimicrobial, dose, route and duration, reviewed.
SUM: Pharmacists lead stewardship across settings.
SRC: UK Health Security Agency, Start smart then focus: antimicrobial stewardship toolkit for inpatient care settings | guidance | 2023 | https://www.gov.uk/government/publications/antimicrobial-stewardship-start-smart-then-focus
SRC: Royal College of General Practitioners, TARGET antibiotics toolkit | guidance | 2025 | https://elearning.rcgp.org.uk/course/view.php?id=553
M1#pharmacy-u11-04-q1@1: When should an IV antibiotic be reviewed in hospital? | At 48 to 72 hours | After 2 weeks | Only at discharge | Never | Only if the patient complains | Start Smart then Focus sets a review at 48 to 72 hours.
M2#pharmacy-u11-04-q2@2: What is a back-up antibiotic prescription? | One to use only if symptoms don't improve or worsen | A spare course to keep at home | A double dose | A prescription for a family member | A prescription for animals | Back-up prescriptions reduce unnecessary use.
M2#pharmacy-u11-04-q3@1: What must an antibiotic prescription in hospital document? | The indication and the duration or review date | The patient's income | The price only | The prescriber's mobile number | Nothing else | Documentation supports review and stewardship.

## Choosing an antibiotic
S: Choosing an antibiotic means matching the likely organism and site of infection with the person's factors: allergy, kidney function, pregnancy, interactions and route. Local guidelines translate this into practical choices.
O: Apply a systematic approach to choosing an antibiotic
O: Assess penicillin allergy labels accurately
T: Empirical treatment | Treatment started before the organism is known, based on the likely cause and local resistance
T: Penicillin allergy label | A record of a reported penicillin allergy, often inaccurate, which limits treatment choices
H: A systematic approach
- **Infection**: site, severity, likely organisms, and whether antibiotics are needed at all.
- **Local guidance**: reflects local resistance patterns.
- **Patient factors**: allergies, renal and hepatic function, pregnancy and breastfeeding, age, interactions, ability to swallow, previous cultures.
- **Drug factors**: spectrum, penetration to the site, route, dose, duration, cost.
H: Penicillin allergy
- Around 1 in 10 people have a penicillin allergy label, but most aren't truly allergic; mislabelling leads to broader-spectrum, less effective antibiotics.
- Take a careful history: what happened, when, how severe (rash, swelling, anaphylaxis) and whether penicillins have been tolerated since.
- People with anaphylaxis or severe reactions avoid all penicillins and need care with other beta-lactams; specialist de-labelling services can test people with low-risk histories.
K: Choose by infection, local guidelines, patient factors and drug factors; take a careful allergy history, because most penicillin allergy labels are wrong.
!: Accepting "allergic to penicillin" without asking what happened, when it was nausea or diarrhoea.
Q: What does empirical treatment mean? | Treatment based on the likely organism before culture results are available.
Q: What proportion of people with a penicillin allergy label are truly allergic? | A minority: most aren't truly allergic.
SUM: Antibiotic choice combines infection, guidelines, patient and drug factors.
SUM: Accurate allergy assessment widens safe options.
SRC: NICE NG15, Antimicrobial stewardship: systems and processes for effective antimicrobial medicine use | guidance | 2015 | https://www.nice.org.uk/guidance/ng15
SRC: British Society for Allergy and Clinical Immunology, Penicillin allergy de-labelling toolkit | guidance | 2022 | https://www.bsaci.org/
M3#pharmacy-u11-05-q1@2: Which question is most useful when someone reports a penicillin allergy? | What exactly happened and how severe was it? | Which pharmacy did they use? | Do they like the taste? | How much did it cost? | Have they had a flu jab? | The reaction's nature and severity decide whether it's a true allergy.
M2#pharmacy-u11-05-q2@1: Why do local antibiotic guidelines differ between areas? | They reflect local resistance patterns | National guidance doesn't exist | To increase costs | Because bacteria are identical everywhere | Doctors prefer different colours | Resistance patterns vary by area, so local guidance reflects which antibiotics still work locally.
M3#pharmacy-u11-05-q3@2: Why does a wrong penicillin allergy label matter? | It leads to broader-spectrum, less effective antibiotics | It has no consequences | It makes penicillin cheaper | It improves outcomes | It prevents all infections | Alternatives are often broader and more likely to cause C. difficile and resistance.

## Urinary tract infections
S: Urinary tract infections are among the commonest infections managed in primary care and pharmacies. Correct diagnosis, the right antibiotic and duration, and knowing who needs referral improve outcomes and limit resistance.
O: Manage lower urinary tract infections in line with NICE guidance
O: Identify people who need referral or different treatment
T: Lower UTI | Infection of the bladder (cystitis), causing frequency, urgency and dysuria
T: Asymptomatic bacteriuria | Bacteria in urine without symptoms, usually not treated except in pregnancy
H: Treatment (NICE NG109)
- **Non-pregnant women**: nitrofurantoin (if eGFR is adequate) or trimethoprim (if low resistance risk) for 3 days; alternatives such as pivmecillinam or fosfomycin. Self-care and back-up prescriptions for some.
- **Men**: 7 days, and send a urine sample.
- **Pregnancy**: treat (including asymptomatic bacteriuria) with a suitable antibiotic for 7 days and send a culture; avoid trimethoprim in the first trimester and nitrofurantoin at term.
- **Children and catheters**: follow specific guidance.
- In England, Pharmacy First treats uncomplicated UTI in women aged 16 to 64.
H: Referral and red flags
- Signs of upper UTI (fever, loin pain, vomiting), sepsis, recurrent infections, symptoms in men or children, haematuria without infection, or failure to improve: refer.
- Pyelonephritis needs different antibiotics and longer courses (NICE NG111).
K: Uncomplicated UTI in women: 3 days of nitrofurantoin or trimethoprim; men and pregnancy need 7 days and cultures; refer upper UTI and red flags.
!: Treating a man's UTI with a 3-day course without sending a sample.
Q: How long is treatment for an uncomplicated lower UTI in a non-pregnant woman? | 3 days.
Q: Which antibiotic is avoided at term in pregnancy? | Nitrofurantoin.
SUM: Treat uncomplicated UTI briefly, following NICE.
SUM: Men, pregnancy and upper UTI need different management.
SRC: NICE NG109, Urinary tract infection (lower): antimicrobial prescribing | guidance | 2018 | https://www.nice.org.uk/guidance/ng109
SRC: NICE NG111, Pyelonephritis (acute): antimicrobial prescribing | guidance | 2018 | https://www.nice.org.uk/guidance/ng111
M1#pharmacy-u11-06-q1@1: How long should a man's lower UTI be treated? | 7 days | 1 day | 3 days | 14 days | 28 days | NICE NG109 recommends 7 days for men, with a urine sample sent for culture.
M3#pharmacy-u11-06-q2@2: A woman with UTI symptoms has fever and loin pain. What's right? | Refer: these suggest pyelonephritis | Supply nitrofurantoin for 3 days | Recommend cranberry juice | Advise more fluids only | Supply trimethoprim for 1 day | Upper UTI needs different treatment and assessment.
M3#pharmacy-u11-06-q3@1: Which antibiotic should be avoided in the first trimester? | Trimethoprim | Nitrofurantoin early in pregnancy | Amoxicillin | Cefalexin | Pivmecillinam at standard doses | Trimethoprim is a folate antagonist, so it's avoided in the first trimester.

## Respiratory tract infections
S: Most respiratory tract infections are viral and self-limiting, but pneumonia and some bacterial infections need antibiotics. Scoring tools help decide who benefits.
O: Apply NICE guidance to sore throat, sinusitis, otitis media and community-acquired pneumonia
O: Use scoring tools to guide antibiotic decisions
T: FeverPAIN score | A score (fever, purulence, attend rapidly, inflamed tonsils, no cough) predicting streptococcal sore throat
T: CRB-65 | A score for pneumonia severity: confusion, respiratory rate 30 or more, blood pressure low, age 65 or over
H: Upper respiratory infections
- **Sore throat** (NICE NG84): FeverPAIN 0 to 1 no antibiotic; 2 to 3 consider no or back-up antibiotic; 4 to 5 consider immediate antibiotic (phenoxymethylpenicillin, or clarithromycin if allergic).
- **Sinusitis** (NG79): usually viral; antibiotics only if symptoms last more than 10 days or are worsening, with a back-up approach.
- **Otitis media** (NG91): most resolve in 3 days; antibiotics for some children (for example under 2 with infection in both ears).
H: Pneumonia
- **Community-acquired pneumonia** (NG138): assess severity (CRB-65 in the community); amoxicillin first line for low severity, usually for 5 days; macrolide or doxycycline if allergic.
- Higher scores need hospital assessment.
- Self-care advice: paracetamol or ibuprofen, fluids and rest; refer anyone with breathing difficulty, confusion or symptoms that worsen.
- Durations and doses follow NICE and the BNF; children's doses are by age or weight.
K: Most respiratory infections need no antibiotic; use FeverPAIN and CRB-65 to identify those who do, and follow NICE durations.
!: Supplying antibiotics for a 4-day cold with sinus symptoms.
Q: What does the FeverPAIN score predict? | Streptococcal sore throat likely to benefit from antibiotics.
Q: What is first-line treatment for low-severity community-acquired pneumonia? | Amoxicillin, usually for 5 days.
SUM: Most respiratory infections are viral and self-limiting.
SUM: Scoring tools guide when antibiotics help.
SRC: NICE NG84, Sore throat (acute): antimicrobial prescribing | guidance | 2018 | https://www.nice.org.uk/guidance/ng84
SRC: NICE NG138, Pneumonia (community-acquired): antimicrobial prescribing | guidance | 2019 | https://www.nice.org.uk/guidance/ng138
M1#pharmacy-u11-07-q1@1: What does the "P" in FeverPAIN stand for? | Purulence | Pain | Pneumonia | Pulse | Penicillin | FeverPAIN: fever, purulence, attend rapidly, inflamed tonsils, no cough.
M2#pharmacy-u11-07-q2@2: When does NICE suggest antibiotics for sinusitis? | Symptoms lasting more than 10 days or worsening | Any sinus pain on day 1 | Only in summer | Never under any circumstances | Every time the nose is blocked | Most sinusitis is viral and resolves on its own, so antibiotics are reserved for longer or worsening illness.
M2#pharmacy-u11-07-q3@1: What does the "C" in CRB-65 stand for? | Confusion | Cough | Cyanosis | Chest pain | Culture | Confusion is a marker of severe pneumonia.

## Skin and soft tissue infections
S: Skin infections range from impetigo and minor wound infections to cellulitis and bites. Choosing between topical and oral treatment, and recognising severe infection, matter.
O: Manage impetigo, cellulitis and bites according to NICE guidance
O: Recognise severe skin infections needing referral
T: Cellulitis | A bacterial infection of the deeper skin and tissues, usually streptococcal or staphylococcal
T: Impetigo | A contagious superficial skin infection with golden crusts, common in children
H: Treatment
- **Impetigo** (NICE NG153): hydrogen peroxide cream for localised non-bullous impetigo; topical antibiotics (fusidic acid) if unsuitable; oral flucloxacillin (or clarithromycin) for widespread or bullous impetigo; hygiene to prevent spread.
- **Cellulitis** (NG141): oral flucloxacillin first line (clarithromycin or doxycycline if allergic); mark the edge to monitor spread.
- **Animal and human bites** (NG184): consider antibiotics (co-amoxiclav first line) depending on the bite, site and risk; check tetanus and, for some bites, rabies risk.
- **Infected insect bites** are included in Pharmacy First in England.
H: Referral
- Spreading redness with fever, sepsis signs, rapidly worsening pain out of proportion (possible necrotising fasciitis), infection near the eyes, or in people who are immunocompromised: urgent referral.
K: Hydrogen peroxide cream for localised impetigo, flucloxacillin for cellulitis, co-amoxiclav for bites; refer rapidly spreading or severe infections.
!: Treating rapidly spreading redness with severe pain and fever with a topical cream.
Q: What is first-line treatment for localised non-bullous impetigo? | Hydrogen peroxide cream.
Q: What is first-line oral antibiotic for cellulitis? | Flucloxacillin.
SUM: Match topical or oral treatment to the infection's extent.
SUM: Recognise and refer severe skin infections urgently.
SRC: NICE NG153, Impetigo: antimicrobial prescribing | guidance | 2020 | https://www.nice.org.uk/guidance/ng153
SRC: NICE NG141, Cellulitis and erysipelas: antimicrobial prescribing | guidance | 2019 | https://www.nice.org.uk/guidance/ng141
M1#pharmacy-u11-08-q1@1: Which antibiotic is first line for cellulitis in adults without allergy? | Flucloxacillin | Ciprofloxacin | Trimethoprim | Nitrofurantoin | Metronidazole | Flucloxacillin covers streptococci and staphylococci.
M2#pharmacy-u11-08-q2@2: Which is first line for an infected dog bite needing antibiotics? | Co-amoxiclav | Trimethoprim | Nitrofurantoin | Fusidic acid cream | Clotrimazole | Co-amoxiclav covers the mixed organisms in bites.
M2#pharmacy-u11-08-q3@1: Which sign suggests a severe skin infection needing urgent referral? | Pain out of proportion with fever and rapid spread | A small crusted patch | Mild itching | Dry skin | A healed scratch | These suggest necrotising fasciitis or sepsis.

## Sepsis
S: Sepsis is a life-threatening response to infection that damages the body's own organs. Early recognition and urgent treatment save lives, and pharmacists can be the first to spot it.
O: Recognise the signs of sepsis and refer urgently
O: Describe the hospital management of sepsis and the pharmacist's role
T: Sepsis | Life-threatening organ dysfunction caused by a dysregulated response to infection
T: NEWS2 | The National Early Warning Score, used to identify deterioration and sepsis risk in adults
H: Recognition
- Signs: high or low temperature, fast breathing, fast heart rate, low blood pressure, new confusion, mottled or bluish skin, not passing urine, feeling very unwell.
- In children: fast breathing, fitting, a non-blanching rash, being very lethargic or difficult to wake.
- In pharmacies: anyone with infection and these signs needs 999 or emergency care.
H: Management (NICE)
- Hospitals use NEWS2 and risk criteria; high-risk adults should get IV antibiotics within 1 hour, following local guidelines.
- Take blood cultures before antibiotics if this doesn't delay them; give fluids; measure lactate and urine output.
- Pharmacists: ensure prompt antibiotic availability and correct doses (renal function, allergies, levels for gentamicin and vancomycin), and support the 48 to 72 hour review.
K: Infection with signs such as confusion, fast breathing, low blood pressure or mottled skin means possible sepsis: get emergency help; hospitals give antibiotics within 1 hour.
!: Advising someone with an infection, new confusion and fast breathing to see their GP next week.
Q: How soon should high-risk adults with sepsis receive antibiotics in hospital? | Within 1 hour.
Q: Name three signs of sepsis. | For example new confusion, fast breathing and mottled skin.
SUM: Sepsis is a medical emergency needing rapid recognition.
SUM: Pharmacists support rapid, correct antibiotic treatment.
SRC: NICE NG253, Suspected sepsis in people aged 16 or over: recognition, assessment and early management | guidance | 2024 | https://www.nice.org.uk/guidance/ng253
SRC: Royal College of Physicians, National Early Warning Score (NEWS) 2 | guidance | 2017 | https://www.rcp.ac.uk/
M1#pharmacy-u11-09-q1@1: Which sign could indicate sepsis? | New confusion with an infection | A mild runny nose | A small cold sore | A dry cough for one day | Sneezing | Confusion is a sign of organ dysfunction.
M2#pharmacy-u11-09-q2@2: How quickly do high-risk adults with sepsis need antibiotics in hospital? | Within 1 hour | Within 24 hours | Within 1 week | After culture results | Only if the fever lasts 3 days | NICE sets a 1-hour target because each hour of delay increases the risk of death.
M2#pharmacy-u11-09-q3@1: What should a pharmacist do for someone with infection, mottled skin and fast breathing? | Call 999 or direct to emergency care | Supply antibiotics | Recommend paracetamol and rest | Book a GP appointment next week | Suggest vitamin C | Mottled skin and fast breathing with an infection are red flags for sepsis needing emergency care.

## Clostridioides difficile infection
S: C. difficile infection causes diarrhoea and colitis, usually after antibiotics disrupt the gut flora. It can be severe or fatal, so prevention through stewardship and correct treatment matter.
O: Identify risk factors for C. difficile infection
O: Describe its treatment and prevention
T: Clostridioides difficile | A spore-forming anaerobic bacterium causing antibiotic-associated diarrhoea and colitis
T: High-risk antibiotics | Antibiotics most associated with C. difficile: clindamycin, cephalosporins, co-amoxiclav and quinolones
H: Risk factors
- Antibiotics, especially broad-spectrum ones; older age; hospital stays; proton pump inhibitors; immunosuppression.
H: Treatment (NICE NG199)
- Review and stop the causing antibiotic where possible; review PPIs; avoid antimotility drugs (such as loperamide) and opioids.
- **First episode**: oral vancomycin for 10 days; fidaxomicin if vancomycin is ineffective; specialist advice for severe or recurrent infection.
- Isolate, use gloves and aprons, and wash hands with soap and water: alcohol gel doesn't kill spores.
- Monitor fluids, electrolytes and signs of severe disease.
- Recurrence is common: people should seek advice quickly if diarrhoea returns, and future antibiotic choices should account for previous infection.
K: Antibiotics (especially clindamycin, cephalosporins, co-amoxiclav and quinolones) cause C. difficile; treat with oral vancomycin, stop causes, avoid antimotility drugs, and wash with soap.
!: Recommending loperamide for diarrhoea in someone who has recently finished antibiotics, without considering C. difficile.
Q: What is first-line treatment for a first episode of C. difficile? | Oral vancomycin for 10 days.
Q: Why use soap and water rather than alcohol gel? | Alcohol gel doesn't kill C. difficile spores.
SUM: Broad-spectrum antibiotics and PPIs increase C. difficile risk.
SUM: Treat with oral vancomycin and prevent spread with good hygiene.
SRC: NICE NG199, Clostridioides difficile infection: antimicrobial prescribing | guidance | 2021 | https://www.nice.org.uk/guidance/ng199
SRC: UK Health Security Agency, Clostridioides difficile: guidance, data and analysis | guidance | 2024 | https://www.gov.uk/government/collections/clostridium-difficile-guidance-data-and-analysis
M1#pharmacy-u11-10-q1@1: Which antibiotic is first line for a first episode of C. difficile infection? | Oral vancomycin | Clindamycin | Ciprofloxacin | Co-amoxiclav | Ceftriaxone | NICE NG199 recommends oral vancomycin for 10 days.
M2#pharmacy-u11-10-q2@2: Which medicine should be avoided in C. difficile diarrhoea? | Loperamide | Oral rehydration salts | Paracetamol | Oral vancomycin | Fluids | Antimotility drugs may worsen toxin retention and severity.
M2#pharmacy-u11-10-q3@1: Which antibiotic carries a high risk of C. difficile? | Clindamycin | Nitrofurantoin | Doxycycline | Trimethoprim | Fosfomycin | Clindamycin is one of the highest-risk antibiotics.

## Tuberculosis
S: Tuberculosis needs months of combination treatment to cure it and prevent resistance. Adherence support, interaction checks and monitoring for toxicity are central.
O: Describe the standard treatment of active tuberculosis
O: Counsel on adverse effects and interactions of TB medicines
T: Active TB | Tuberculosis causing symptoms and disease, needing treatment
T: Directly observed therapy (DOT) | Watching people take their TB medicines to support adherence
H: Treatment (NICE NG33)
- **Standard regimen**: rifampicin, isoniazid, pyrazinamide and ethambutol for 2 months, then rifampicin and isoniazid for 4 more months (6 months in total) for drug-sensitive pulmonary TB.
- Longer for some forms (such as TB affecting the brain); drug-resistant TB needs specialist regimens.
- Latent TB infection is treated to prevent active disease in some people.
- Treatment is free in the UK, and contact tracing protects others.
H: Adverse effects and interactions
- **Rifampicin**: orange-red urine, tears and sweat (stains contact lenses); a powerful enzyme inducer, reducing hormonal contraception, warfarin, many HIV drugs and others.
- **Isoniazid**: peripheral neuropathy (pyridoxine is given to people at risk) and hepatotoxicity.
- **Pyrazinamide**: hepatotoxicity and raised uric acid.
- **Ethambutol**: visual disturbance (check vision and report changes).
- Liver function monitoring; report jaundice, nausea or vomiting.
K: Drug-sensitive TB: 6 months (four drugs for 2 months, then two for 4); rifampicin is a major enzyme inducer; support adherence.
!: Missing that rifampicin will make a combined contraceptive pill ineffective.
Q: How long is standard treatment for drug-sensitive pulmonary TB? | 6 months.
Q: Why is pyridoxine given with isoniazid? | To prevent peripheral neuropathy in people at risk.
SUM: TB needs months of combination therapy and adherence support.
SUM: Rifampicin interactions and drug toxicities need monitoring.
SRC: NICE NG33, Tuberculosis | guidance | 2019 | https://www.nice.org.uk/guidance/ng33
SRC: Joint Formulary Committee, British National Formulary: tuberculosis | guidance | 2026 | https://bnf.nice.org.uk/
M1#pharmacy-u11-11-q1@1: Which TB drug turns body fluids orange-red? | Rifampicin | Isoniazid | Pyrazinamide | Ethambutol | Streptomycin | Rifampicin discolours urine, tears and sweat.
M2#pharmacy-u11-11-q2@2: Which TB drug can affect eyesight? | Ethambutol | Rifampicin | Isoniazid | Pyridoxine | Pyrazinamide | Ethambutol can cause optic neuritis, so vision is checked and changes reported promptly.
M3#pharmacy-u11-11-q3@2: A woman starting TB treatment uses a combined pill. What's the advice? | Use a contraceptive method unaffected by enzyme inducers | Continue the pill as normal | Take two pills a day | Stop all contraception | Use the pill only at weekends | Rifampicin induces enzymes and makes hormonal contraception unreliable.

## Fungal infections
S: Fungal infections range from common skin, nail and vaginal infections to serious systemic infections in immunocompromised people. Many are treated in pharmacies, where interactions with azoles must be checked.
O: Manage common superficial fungal infections
O: Identify important interactions and cautions with antifungals
T: Dermatophyte | A fungus infecting skin, hair or nails, such as the causes of athlete's foot and ringworm
T: Azole antifungal | An antifungal inhibiting fungal ergosterol synthesis, such as clotrimazole, fluconazole and itraconazole
H: Common infections
- **Skin**: athlete's foot and ringworm with topical terbinafine or an azole; keep the area clean and dry.
- **Vaginal candidiasis**: clotrimazole pessary or cream, or oral fluconazole (OTC within its licence); refer recurrent infections, pregnancy (topical only), under 16s or over 60s, and abnormal symptoms.
- **Oral candidiasis**: miconazole oral gel or nystatin; check inhaler technique (rinsing after ICS) and denture hygiene.
- **Nail infections**: confirm before treatment; oral terbinafine is most effective; topical options are less effective.
H: Interactions and cautions
- **Miconazole oral gel** greatly increases warfarin's effect (contraindicated or needing close INR monitoring).
- **Fluconazole** inhibits CYP2C9 and 3A4 (warfarin, some statins, others); **itraconazole** is a strong CYP3A4 inhibitor and can worsen heart failure.
- Systemic fungal infections in hospital are specialist areas.
K: Topical azoles or terbinafine for skin infections; check warfarin with miconazole gel and fluconazole; refer complex vaginal thrush.
!: Selling miconazole oral gel to someone taking warfarin.
Q: Which antifungal interacts dangerously with warfarin even as an oral gel? | Miconazole.
Q: When should vaginal thrush be referred? | Recurrent infections, pregnancy (for oral treatment), under 16 or over 60, or abnormal symptoms.
SUM: Many fungal infections are managed in pharmacies.
SUM: Azole interactions, especially with warfarin, need checking.
SRC: NICE CKS, Candida: vulvovaginal | guidance | 2024 | https://cks.nice.org.uk/topics/candida-female-genital/
SRC: MHRA, Drug Safety Update: topical miconazole, including oral gel, reminder of potential for serious interactions with warfarin | guidance | 2016-06 | https://www.gov.uk/drug-safety-update
M1#pharmacy-u11-12-q1@2: Which antifungal oral gel interacts with warfarin? | Miconazole | Nystatin | Amphotericin lozenges | Terbinafine cream | Clotrimazole cream | Miconazole is absorbed and inhibits warfarin metabolism.
M2#pharmacy-u11-12-q2@1: Which treatment is most effective for confirmed fungal nail infection? | Oral terbinafine | Topical nystatin | Hydrogen peroxide | Clotrimazole cream for a week | Antibacterial soap | Oral terbinafine has the best cure rates.
M3#pharmacy-u11-12-q3@2: Which person with vaginal thrush should be referred rather than treated OTC? | Someone who is pregnant wanting oral treatment | A 30-year-old with a first episode | A 25-year-old with typical symptoms | A 40-year-old with itch only | Someone with a first episode after antibiotics | Oral fluconazole isn't used in pregnancy; specialist advice is needed.

## Antiviral drugs
S: Antivirals treat a growing range of infections, including herpes viruses, influenza and COVID-19. Timing matters, and some, especially ritonavir-boosted drugs, have major interactions.
O: Describe antivirals for herpes viruses, influenza and COVID-19
O: Identify timing requirements and key interactions
T: Neuraminidase inhibitor | An influenza antiviral such as oseltamivir that stops new virus particles leaving infected cells
T: Ritonavir boosting | Using ritonavir to inhibit CYP3A4 and raise levels of another antiviral, causing many interactions
H: Antivirals
- **Aciclovir and valaciclovir**: herpes simplex and shingles; for shingles, start within 72 hours of the rash for best effect; adjust for renal function; keep well hydrated.
- **Oseltamivir**: influenza treatment or prophylaxis for at-risk groups when flu is circulating, ideally within 48 hours, following UKHSA guidance.
- **COVID-19 antivirals** (such as nirmatrelvir with ritonavir) for eligible high-risk people early in infection; check interactions carefully.
- Shingles is included in Pharmacy First in England for adults.
H: Interactions
- Ritonavir is a strong CYP3A4 inhibitor: it raises levels of many drugs (some statins, DOACs, antiarrhythmics, sedatives); use an interaction checker (such as Liverpool's) and the SPC.
- Doses of aciclovir, valaciclovir and oseltamivir depend on the indication and renal function: check the BNF and SPC.
K: Start antivirals early (aciclovir for shingles within 72 hours, oseltamivir within 48 hours); check ritonavir-boosted regimens for interactions.
!: Missing a serious interaction between nirmatrelvir with ritonavir and a statin or DOAC.
Q: When should antivirals for shingles ideally start? | Within 72 hours of the rash appearing.
Q: Why does ritonavir cause many interactions? | It strongly inhibits CYP3A4.
SUM: Antivirals work best started early.
SUM: Ritonavir boosting causes major interactions.
SRC: UK Health Security Agency, Guidance on use of antiviral agents for the treatment and prophylaxis of seasonal influenza | guidance | 2024 | https://www.gov.uk/government/publications/influenza-treatment-and-prophylaxis-using-anti-viral-agents
SRC: University of Liverpool, COVID-19 and HIV drug interaction checkers | secondary | 2026 | https://www.hiv-druginteractions.org/
M1#pharmacy-u11-13-q1@1: Which drug treats influenza? | Oseltamivir | Aciclovir | Fluconazole | Amoxicillin | Ritonavir alone | Oseltamivir is a neuraminidase inhibitor.
M3#pharmacy-u11-13-q2@2: Why must nirmatrelvir with ritonavir be checked carefully? | Ritonavir causes major CYP3A4 interactions | It's always given IV | It has no side effects | It's a vaccine | It's only for children | Ritonavir boosts levels of many co-prescribed drugs.
M2#pharmacy-u11-13-q3@1: Within what time should antivirals for shingles ideally be started? | 72 hours of the rash | 2 weeks | 1 month | 6 months | Any time | Early treatment reduces symptoms and complications.

## HIV
S: HIV is now a manageable long-term condition: effective antiretroviral therapy (ART) gives a near-normal life expectancy and prevents transmission. Adherence and interactions are where pharmacists help most.
O: Describe the principles of antiretroviral therapy and prevention
O: Manage drug interactions and adherence in people with HIV
T: Antiretroviral therapy (ART) | Combination treatment that suppresses HIV replication
T: U=U | Undetectable equals untransmittable: people with an undetectable viral load on ART don't transmit HIV sexually
H: Treatment and prevention
- ART combines drugs from different classes; started soon after diagnosis; lifelong.
- With effective treatment, viral load becomes undetectable and HIV isn't transmitted sexually (U=U).
- **PrEP** (pre-exposure prophylaxis) prevents HIV in people at risk; **PEP** (post-exposure prophylaxis) should start as soon as possible, within 72 hours of exposure.
- Testing: HIV testing in pharmacies and elsewhere; earlier diagnosis improves outcomes.
H: Pharmacy's role
- **Interactions**: boosted regimens (ritonavir or cobicistat) and some others interact with many drugs, including OTC products (antacids and supplements with some integrase inhibitors); always check with an HIV interaction checker.
- **Adherence**: missed doses risk resistance; support with routines and reminders.
- Confidentiality and non-judgemental care.
- Refer people with possible HIV exposure to sexual health services for PEP and testing, and follow BHIVA guidance.
K: Lifelong ART suppresses HIV and prevents transmission (U=U); check every new medicine for interactions and support adherence.
!: Recommending an antacid to someone on an integrase inhibitor without checking dose timing.
Q: What does U=U mean? | People with an undetectable viral load on ART don't transmit HIV sexually.
Q: How soon must PEP be started? | As soon as possible, within 72 hours of exposure.
SUM: ART makes HIV a manageable long-term condition.
SUM: Interactions and adherence are central to pharmacy care.
SRC: British HIV Association, Guidelines for the treatment of HIV-1-positive adults with antiretroviral therapy | guidance | 2022 | https://www.bhiva.org/
SRC: University of Liverpool, HIV drug interactions checker | secondary | 2026 | https://www.hiv-druginteractions.org/
M1#pharmacy-u11-14-q1@1: What does PrEP do? | Prevents HIV in people at risk | Cures HIV | Treats influenza | Prevents hepatitis C | Treats TB | Pre-exposure prophylaxis prevents infection.
M3#pharmacy-u11-14-q2@2: Why check antacids with some HIV medicines? | They can reduce absorption of integrase inhibitors | They cause HIV | They increase viral load directly | They're always contraindicated | They have no effect | Polyvalent cations chelate some integrase inhibitors.
M2#pharmacy-u11-14-q3@1: Within what time should PEP be started? | 72 hours | 2 weeks | 1 month | 6 months | Any time | PEP is most effective started as soon as possible.

## Viral hepatitis
S: Hepatitis B and C cause chronic liver disease, but hepatitis C can now be cured with short courses of tablets and hepatitis B is preventable by vaccination. Pharmacies help with testing and treatment.
O: Describe the treatment and prevention of hepatitis B and C
O: Explain the pharmacy role in hepatitis testing and treatment
T: Direct-acting antivirals (DAAs) | Oral hepatitis C treatments that cure over 95% of people in 8 to 12 weeks
T: Hepatitis B reactivation | Flare of hepatitis B when people receive immunosuppressive treatment
H: Hepatitis C
- DAA combinations cure most people; NHS England aims to eliminate hepatitis C as a public health threat.
- Interactions are important (check with an interaction checker).
- Pharmacies offer testing, particularly alongside needle exchange and OST services.
H: Hepatitis A and B
- **Hepatitis A**: vaccine for travellers and at-risk groups.
- **Hepatitis B**: vaccine (part of the UK childhood schedule); antivirals (such as tenofovir or entecavir) for chronic infection under specialists.
- Screen for hepatitis B before immunosuppressive and some biological treatments, because reactivation can be severe.
- DAA courses are prescribed by specialist services; check every co-prescribed and OTC medicine with an interaction checker and the SPC.
- Hepatitis C is often silent for years: people who have ever injected drugs, or had transfusions before 1991 in the UK, should be offered testing.
- Refer people with abnormal liver tests or symptoms of liver disease to their GP or specialist services.
K: DAAs cure most hepatitis C; vaccinate against hepatitis A and B; screen for hepatitis B before immunosuppression.
!: Starting a biologic without hepatitis B screening.
Q: How effective are DAAs for hepatitis C? | They cure over 95% of people.
Q: Why screen for hepatitis B before immunosuppression? | To prevent severe reactivation.
SUM: Hepatitis C is curable with DAAs.
SUM: Hepatitis A and B are preventable by vaccination.
SRC: NHS England, Hepatitis C elimination programme | guidance | 2025 | https://www.england.nhs.uk/
SRC: UK Health Security Agency, Immunisation against infectious disease (the Green Book): hepatitis B | guidance | 2024 | https://www.gov.uk/government/collections/immunisation-against-infectious-disease-the-green-book
M1#pharmacy-u11-15-q1@1: Which hepatitis is now curable with short courses of tablets? | Hepatitis C | Hepatitis B in all cases | Hepatitis A only | Hepatitis E only | None | Direct-acting antivirals cure over 95% of hepatitis C infections in 8 to 12 weeks.
M2#pharmacy-u11-15-q2@2: Why screen for hepatitis B before rituximab? | Reactivation can cause severe hepatitis | It improves rituximab's effect | It's only needed for travellers | To check vaccine response only | It isn't needed | Immunosuppression can reactivate hepatitis B.
M2#pharmacy-u11-15-q3@1: Which hepatitis is part of the UK childhood vaccination schedule? | Hepatitis B | Hepatitis C | Hepatitis D | Hepatitis E | None | Hepatitis B vaccine is in the routine schedule.

## Vaccines and immunisation
S: Vaccines prevent serious diseases and pharmacies give millions of doses every year. Safe practice means following the Green Book, maintaining the cold chain, knowing contraindications and being prepared for anaphylaxis.
O: Describe the UK immunisation programme and the principles of vaccination
O: Apply safety practices for giving vaccines
T: Live vaccine | A vaccine containing weakened live organisms, generally avoided in pregnancy and immunosuppression
T: Cold chain | Keeping vaccines at 2 to 8°C from manufacture to administration
H: The programme
- The UK schedule protects children (for example against diphtheria, tetanus, pertussis, polio, Hib, hepatitis B, pneumococcus, meningococcus, measles, mumps, rubella and rotavirus) and adults (seasonal influenza and COVID-19 for eligible groups, shingles, pneumococcal and RSV vaccines for specified groups).
- The **Green Book** is the national reference for each vaccine, eligibility and contraindications.
- Pharmacies deliver seasonal and other vaccines under national protocols or PGDs.
H: Safety
- **Live vaccines** (such as MMR, varicella, BCG, oral rotavirus, nasal influenza and yellow fever) are generally contraindicated in pregnancy and significant immunosuppression.
- Valid consent, correct product and dose, and record keeping.
- **Cold chain**: store at 2 to 8°C, monitor fridge temperatures daily and act on breaks.
- **Anaphylaxis**: staff trained and adrenaline available whenever vaccines are given.
K: Follow the Green Book; avoid live vaccines in pregnancy and immunosuppression; keep the cold chain and be ready for anaphylaxis.
!: Giving a live vaccine to someone on high-dose immunosuppressive treatment.
Q: What temperature range is the vaccine cold chain? | 2 to 8°C.
Q: Name three live vaccines. | For example MMR, varicella and yellow fever.
SUM: The UK schedule protects people across their lives.
SUM: Contraindications, cold chain and anaphylaxis readiness keep vaccination safe.
SRC: UK Health Security Agency, Immunisation against infectious disease (the Green Book) | guidance | 2025 | https://www.gov.uk/government/collections/immunisation-against-infectious-disease-the-green-book
SRC: UK Health Security Agency, Vaccine incident guidance: responding to errors in vaccine storage, handling and administration | guidance | 2024 | https://www.gov.uk/government/publications/vaccine-incident-guidance-responding-to-vaccine-errors
M1#pharmacy-u11-16-q1@1: What is the national reference for UK vaccination? | The Green Book | The Orange Guide | The MEP guide only | The BNF index | The Highway Code | The Green Book covers each vaccine in detail.
M2#pharmacy-u11-16-q2@2: Which vaccine type is generally avoided in pregnancy? | Live vaccines | Inactivated influenza | Pertussis vaccine | Inactivated COVID-19 vaccines | Tetanus toxoid | Live vaccines carry a theoretical risk to the fetus.
M2#pharmacy-u11-16-q3@1: What should be available whenever vaccines are given? | Adrenaline for anaphylaxis | Antibiotics | Insulin | Paracetamol only | A defibrillator only | Anaphylaxis is rare but must be treated immediately.

## Travel health
S: Travellers may need advice on malaria, vaccines, food and water safety and existing medicines. Pharmacies provide travel clinics and supply antimalarials, so up-to-date, destination-specific advice matters.
O: Give malaria prevention advice using the ABCD approach
O: Advise on travel vaccines and general travel health
T: ABCD of malaria prevention | Awareness of risk, Bite prevention, Chemoprophylaxis, and prompt Diagnosis
T: Chemoprophylaxis | Taking medicines to prevent malaria before, during and after travel
H: Malaria
- Check current, destination-specific advice (UKHSA guidelines, TravelHealthPro).
- **Bite prevention**: DEET-based repellents, covering up, nets.
- **Chemoprophylaxis**: atovaquone-proguanil (start 1 to 2 days before, continue 7 days after), doxycycline (1 to 2 days before, 4 weeks after; photosensitivity), mefloquine (2 to 3 weeks before, 4 weeks after; neuropsychiatric effects); take with food as advised; check interactions and contraindications.
- **Diagnosis**: fever during or up to a year after travel to a malaria area needs urgent testing.
H: Other travel health
- Vaccines: hepatitis A, typhoid, and others depending on destination; yellow fever only from registered centres, with a certificate.
- Travellers' diarrhoea: food and water hygiene; oral rehydration; carry essential medicines in hand luggage with a copy of the prescription; check rules for controlled drugs abroad.
- Plan for chronic conditions, time zones (insulin), and travel insurance.
- Check the BNF and SPC for antimalarial doses, contraindications and interactions, and refer complex travellers (pregnancy, immunosuppression) to a travel clinic.
K: Use destination-specific advice; ABCD for malaria; start and continue antimalarials for the right times; fever after travel needs urgent testing.
!: Telling a traveller they can stop doxycycline as soon as they leave the malaria area.
Q: How long is atovaquone-proguanil continued after leaving a malaria area? | 7 days.
Q: What does the "D" in ABCD stand for? | Prompt Diagnosis of fever.
SUM: Malaria prevention follows ABCD with destination-specific advice.
SUM: Plan vaccines, medicines and chronic conditions before travel.
SRC: UK Health Security Agency, Malaria prevention guidelines for travellers from the UK | guidance | 2025 | https://www.gov.uk/government/publications/malaria-prevention-guidelines-for-travellers-from-the-uk
SRC: National Travel Health Network and Centre, TravelHealthPro | guidance | 2026 | https://travelhealthpro.org.uk/
M1#pharmacy-u11-17-q1@1: How long should doxycycline continue after leaving a malaria area? | 4 weeks | 1 day | 7 days | 6 months | Stop on leaving | Doxycycline is continued for 4 weeks after return.
M3#pharmacy-u11-17-q2@2: A traveller develops fever 3 months after returning from Kenya. What's right? | Urgent malaria testing | Paracetamol and rest | It's too late to be malaria | Wait two weeks | Start doxycycline again | Malaria can present up to a year after travel.
M2#pharmacy-u11-17-q3@1: Which antimalarial is linked to neuropsychiatric adverse effects? | Mefloquine | Atovaquone-proguanil | Doxycycline | Chloroquine only in children | None | Mefloquine can cause anxiety, depression and other effects.
`;
