// School 16: Research, Evidence-Based Practice and Nursing Leadership. UK, as at 2026. Written to standard 2
// (docs/CURRICULUM_CONTENT_STANDARD.md). Schools 7, 14 and 17 introduce evidence-based care, epidemiology,
// accountability and raising concerns; this school covers research methods, appraisal and ethics in depth,
// then quality, safety, leadership, governance, policy and digital health. Health policy and NHS structures
// change frequently and differ across the four nations; check the current position. Sources are listed with
// the edition known when written and are pending verification (docs/qa/nursing-sources.md).
export default `
## Research literacy
S: Research literacy is the ability to find, understand, judge and use research. It lets nurses question practice, explain the evidence to patients and contribute to research. The NMC expects every registrant to practise in line with the best available evidence.
O: Explain why research literacy matters for nursing practice
O: Formulate a focused clinical question using PICO and search databases systematically
O: Recognise the main types of evidence and where they sit in hierarchies of evidence
PRE: Evidence-based care (School 7)
H: Why it matters
- Practice changes as evidence develops; habits and tradition can be wrong or harmful.
- Patients increasingly read research and ask questions.
- Nurses lead and take part in research; NHS organisations are expected to support research activity, and nurse researchers are a growing part of the workforce.
H: Asking a focused question: PICO
- **P**opulation or problem (such as adults with venous leg ulcers).
- **I**ntervention (such as four-layer compression).
- **C**omparison (such as short-stretch bandaging).
- **O**utcome (such as healing at 12 weeks).
- Variations add **T**ime or **S**tudy type; **SPIDER** suits qualitative questions (sample, phenomenon of interest, design, evaluation, research type).
H: Searching
- Databases: **CINAHL** (nursing and allied health), **MEDLINE/PubMed**, **Embase**, **PsycINFO**, the **Cochrane Library**, and NICE Evidence resources.
- Use keywords and subject headings, synonyms, **Boolean operators** (AND narrows, OR widens, NOT excludes), truncation and filters.
- Keep a record of searches; librarians can help.
H: Hierarchies of evidence
- For **questions about effectiveness**, a common hierarchy places systematic reviews and meta-analyses of randomised controlled trials at the top, then individual RCTs, cohort studies, case-control studies, case series, and expert opinion.
- Hierarchies are a guide only: the best design depends on the question (qualitative studies are best for understanding experiences), and a well-conducted study lower in the hierarchy can be more trustworthy than a poor one higher up.
K: Research literacy means asking focused PICO questions, searching systematically, and judging evidence by design and quality rather than hierarchy alone.
!: Assuming any published study is trustworthy. Publication doesn't guarantee quality; appraise it.
T: PICO | Population, intervention, comparison, outcome: a framework for focused clinical questions
T: Boolean operators | AND, OR and NOT, used to combine search terms
T: Hierarchy of evidence | A ranking of study designs by their typical strength for answering effectiveness questions
SUM: Research literacy supports safe, current practice.
SUM: Use PICO (or SPIDER) and systematic searching of databases such as CINAHL.
SUM: Hierarchies guide but don't replace appraisal.
SRC: Nursing and Midwifery Council, The Code, standard 6: always practise in line with the best available evidence | standard | 2018 | https://www.nmc.org.uk/standards/code/
SRC: Polit DF, Beck CT, Nursing Research: generating and assessing evidence for nursing practice, 11th edition, Wolters Kluwer | secondary | 2021
SRC: National Institute for Health and Care Research, Nursing and midwifery research resources | guidance | 2024 | https://www.nihr.ac.uk/
Q: What does PICO stand for? | Population, intervention, comparison and outcome.
Q: Which Boolean operator widens a search? | OR.
M1#nursing-u16-01-q1@1: Which database focuses on nursing and allied health literature? | CINAHL | The BNF | The Green Book | NEWS2 | CINAHL indexes nursing and allied health research.
M2#nursing-u16-01-q2@2: In PICO, what is "C"? | The comparison | The cost | The country | The conclusion | C is the comparison intervention or control.
M2#nursing-u16-01-q3@3: Which design is usually best for understanding patients' experiences of living with a condition? | Qualitative research | A randomised controlled trial | A meta-analysis of drug trials | A case-control study | Qualitative designs explore meaning and experience.
TF2#nursing-u16-01-q4@1: A study published in a journal is always trustworthy. | False | Publication doesn't guarantee quality; all studies need appraisal.

## Quantitative research
S: Quantitative research uses numerical data to measure, compare and test relationships. Understanding its concepts, including sampling, validity, reliability and basic statistics, lets nurses interpret results correctly.
O: Describe key features of quantitative research, including variables, sampling and measurement
O: Explain validity and reliability
O: Interpret common statistics, including p-values, confidence intervals and effect sizes
PRE: Research literacy
H: Key features
- Starts with a hypothesis or question about relationships between **variables**: the **independent variable** (the presumed cause or intervention) and the **dependent variable** (the outcome).
- **Sampling**: **probability** sampling (such as random sampling) supports generalisation; **non-probability** sampling (convenience, purposive) is common but less generalisable.
- **Sample size** calculations (power) help detect a real effect if one exists.
H: Validity and reliability
- **Reliability**: the consistency of a measure (does it give the same result under the same conditions?).
- **Validity**: whether a measure assesses what it claims to.
- **Internal validity**: whether the results are due to the intervention rather than bias or confounding.
- **External validity** (generalisability): whether the findings apply to other people and settings.
H: Statistics
- **Descriptive statistics**: mean, median, mode, range, standard deviation.
- **p-value**: the probability of results at least as extreme as those observed if there were truly no effect; p below 0.05 is conventionally called "statistically significant", but it doesn't show the size or importance of an effect.
- **Confidence interval**: a range likely to contain the true value; a 95% confidence interval that excludes no effect (such as a relative risk of 1) indicates statistical significance, and its width shows precision.
- **Effect size**, **absolute risk reduction** and **number needed to treat** show how large and meaningful a difference is.
- **Clinical significance** asks whether the difference matters to patients.
H: Errors
- **Type I error**: concluding there is an effect when there isn't (a false positive).
- **Type II error**: missing a real effect (a false negative), often from a small sample.
K: Quantitative research measures variables in samples; judge validity and reliability, and interpret p-values with confidence intervals, effect sizes and clinical significance.
!: Treating "statistically significant" as meaning "clinically important". A tiny difference can be statistically significant in a large study.
T: Reliability | The consistency of a measurement
T: Confidence interval | A range of values likely to contain the true effect, showing precision
T: Number needed to treat | The number of people who need treatment for one extra person to benefit
SUM: Quantitative research tests relationships between variables in samples.
SUM: Validity and reliability determine trust in measures and findings.
SUM: Interpret p-values alongside confidence intervals, effect sizes and clinical significance.
SRC: Polit DF, Beck CT, Nursing Research: generating and assessing evidence for nursing practice, 11th edition, Wolters Kluwer | secondary | 2021
SRC: Greenhalgh T, How to Read a Paper: the basics of evidence-based medicine and healthcare, 6th edition, Wiley-Blackwell | secondary | 2019
SRC: Wasserstein RL, Lazar NA, The ASA statement on p-values: context, process, and purpose, The American Statistician 70(2):129–133 | primary | 2016
Q: What is the difference between reliability and validity? | Reliability is consistency; validity is whether a measure assesses what it claims to.
Q: What does a 95% confidence interval show? | A range likely to contain the true effect, and how precise the estimate is.
M1#nursing-u16-02-q1@1: In a trial of a new dressing, healing rate is which variable? | The dependent variable | The independent variable | The control variable | The confounding variable | Healing rate is the outcome being measured, so it is the dependent variable.
M2#nursing-u16-02-q2@2: A study reports a relative risk of 0.8 with a 95% confidence interval of 0.6 to 1.1. What does this suggest? | The result isn't statistically significant, as the interval includes 1 | The treatment definitely works | The treatment is harmful | The sample was too large | An interval crossing 1 (no effect) means the result isn't statistically significant.
M3#nursing-u16-02-q3@3: A very large trial finds a statistically significant reduction in blood pressure of 1 mmHg. How should a nurse interpret this? | Statistically significant but probably not clinically important | A major clinical breakthrough | Proof that the study is flawed | A Type II error | Large samples can detect tiny differences; clinical significance matters.
MATCH1#nursing-u16-02-q4@2: Match each term to its meaning. | Type I error = A false positive finding ; Type II error = Missing a real effect ; Internal validity = Results reflect the intervention, not bias ; External validity = Findings apply to other settings | These concepts help judge research findings.

## Qualitative research
S: Qualitative research explores people's experiences, meanings and perspectives in depth, using words rather than numbers. It is essential for understanding what it is like to be a patient, carer or nurse, and for designing person-centred care.
O: Describe the main qualitative approaches and when each is used
O: Explain qualitative data collection, sampling and analysis, including thematic analysis
O: Judge the quality of qualitative research using the concept of trustworthiness
PRE: Research literacy
H: Approaches
- **Phenomenology**: explores lived experience (such as what it is like to live with chronic pain).
- **Grounded theory**: develops theory from data (such as how nurses make decisions about escalation).
- **Ethnography**: studies cultures and groups through observation (such as the culture of a ward).
- **Narrative inquiry**: explores people's stories.
- **Descriptive qualitative** studies describe experiences without a specific philosophical tradition.
H: Data collection and sampling
- **Interviews** (semi-structured or in-depth), **focus groups**, **observation**, and documents.
- **Purposive sampling** selects people who can give rich insights; **theoretical sampling** is used in grounded theory.
- Sample size is guided by **data saturation** or information power rather than statistical calculation.
H: Analysis
- **Thematic analysis** (such as Braun and Clarke's approach): familiarisation, coding, generating and reviewing themes, defining and naming themes, and writing up.
- **Reflexivity**: researchers reflect on how their own background and assumptions influence the research.
H: Quality: trustworthiness
- Lincoln and Guba's criteria: **credibility** (are findings believable?), **transferability** (could they apply elsewhere?), **dependability** (is the process consistent and documented?) and **confirmability** (are findings grounded in the data rather than researcher bias?).
- Strategies: member checking, thick description, audit trails, triangulation and reflexive accounts.
- Reporting guidelines such as **COREQ** support transparency.
K: Qualitative research explores meaning through approaches such as phenomenology and grounded theory, uses purposive sampling and thematic analysis, and is judged by trustworthiness.
!: Criticising a qualitative study for having a small sample that isn't statistically representative. Qualitative research aims for depth, not statistical generalisation.
T: Phenomenology | A qualitative approach exploring people's lived experience
T: Thematic analysis | A method for identifying patterns of meaning (themes) in qualitative data
T: Trustworthiness | The quality of qualitative research, judged by credibility, transferability, dependability and confirmability
SUM: Phenomenology, grounded theory and ethnography answer different questions.
SUM: Purposive sampling and thematic analysis are common; reflexivity matters.
SUM: Trustworthiness replaces validity and reliability as quality criteria.
SRC: Braun V, Clarke V, Using thematic analysis in psychology, Qualitative Research in Psychology 3(2):77–101 | primary | 2006
SRC: Lincoln YS, Guba EG, Naturalistic Inquiry, Sage | secondary | 1985
SRC: Tong A, Sainsbury P, Craig J, Consolidated criteria for reporting qualitative research (COREQ), International Journal for Quality in Health Care 19(6):349–357 | primary | 2007
Q: What does phenomenology explore? | People's lived experience.
Q: Name Lincoln and Guba's four criteria for trustworthiness. | Credibility, transferability, dependability and confirmability.
M1#nursing-u16-03-q1@1: Which qualitative approach develops theory from data? | Grounded theory | Phenomenology | Ethnography | Randomised trial | Grounded theory builds theory inductively from data.
M2#nursing-u16-03-q2@2: What is purposive sampling? | Selecting participants who can give rich insight into the topic | Selecting participants entirely at random | Recruiting as many people as possible | Using only hospital staff | Qualitative studies select information-rich participants.
M2#nursing-u16-03-q3@3: A researcher keeps a journal reflecting on how her nursing background shapes her interpretations. What is this? | Reflexivity | Randomisation | Blinding | Statistical analysis | Reflexivity improves the trustworthiness of qualitative research.
MATCH2#nursing-u16-03-q4@3: Match each trustworthiness criterion to a strategy. | Credibility = Member checking ; Transferability = Thick description ; Dependability = Audit trail ; Confirmability = Reflexive accounts | Specific strategies such as member checking and audit trails support each trustworthiness criterion.

## Mixed methods
S: Mixed methods research combines quantitative and qualitative approaches in one study, so that each answers questions the other can't. It is widely used in nursing and health services research.
O: Explain the rationale for mixed methods research
O: Describe the main mixed methods designs
O: Appraise how well quantitative and qualitative components are integrated
PRE: Qualitative research
H: Rationale
- Complex health problems often need both measurement (how much, how often, does it work?) and understanding (why, how, what is it like?).
- Mixed methods can explain unexpected results, inform intervention design, or test whether qualitative findings generalise.
H: Main designs
- **Convergent (parallel)**: quantitative and qualitative data collected at the same time and compared or merged.
- **Explanatory sequential**: quantitative first, then qualitative to explain the results (such as interviewing staff after a trial showed mixed effects).
- **Exploratory sequential**: qualitative first, then quantitative to test or measure (such as developing a questionnaire from interview findings).
- **Embedded** designs, such as a qualitative process evaluation within a randomised trial.
H: Integration
- The strength of mixed methods lies in **integration**: connecting, building on or merging the findings.
- Weak studies simply report two separate studies side by side.
- Tools such as joint displays help show how findings fit together.
H: Appraisal
P: Ask whether mixed methods were justified, whether each component was done well by its own standards, and whether integration added insight. The Mixed Methods Appraisal Tool (MMAT) can help.
K: Mixed methods combine numbers and meaning in convergent, explanatory sequential or exploratory sequential designs; their value depends on integration.
!: Assuming mixed methods are automatically better. They add value only when integration answers the question better than one method alone.
T: Mixed methods | Research combining quantitative and qualitative approaches in one study
T: Explanatory sequential design | Quantitative data collected first, then qualitative data to explain the results
T: Integration | Combining or connecting quantitative and qualitative findings
SUM: Mixed methods answer complex questions needing measurement and understanding.
SUM: Designs include convergent, explanatory sequential and exploratory sequential.
SUM: Appraise each component and the quality of integration.
SRC: Creswell JW, Plano Clark VL, Designing and Conducting Mixed Methods Research, 3rd edition, Sage | secondary | 2018
SRC: Hong QN and others, The Mixed Methods Appraisal Tool (MMAT) version 2018 | guidance | 2018 | http://mixedmethodsappraisaltoolpublic.pbworks.com/
SRC: Skivington K and others, A new framework for developing and evaluating complex interventions: update of Medical Research Council guidance, BMJ 374:n2061 | guidance | 2021 | https://www.bmj.com/content/374/bmj.n2061
Q: What is an explanatory sequential design? | Quantitative data collected first, then qualitative data to explain the results.
Q: Where does the strength of mixed methods lie? | In the integration of quantitative and qualitative findings.
M1#nursing-u16-04-q1@1: Which design collects qualitative data first, then quantitative data? | Exploratory sequential | Explanatory sequential | Convergent | Cross-sectional | Exploratory sequential designs build from qualitative findings.
M2#nursing-u16-04-q2@2: A trial of a falls intervention shows no effect, so researchers interview staff about how it was delivered. Which design is this? | Explanatory sequential | Exploratory sequential | Convergent | Case-control | Qualitative data explains the quantitative results.
M2#nursing-u16-04-q3@3: What weakens a mixed methods study? | Reporting the two components separately without integration | Combining findings in a joint display | Justifying why both methods are needed | Doing each component well | Without integration, the study adds little.
TF2#nursing-u16-04-q4@3: A qualitative process evaluation can be embedded within a randomised controlled trial. | True | Embedded designs help explain how and why interventions work.

## Study design
S: The design of a study determines what questions it can answer and how much its results can be trusted. Matching design to question is the first step in both doing and appraising research.
O: Match research questions to appropriate study designs
O: Distinguish experimental, quasi-experimental and observational designs
O: Identify common sources of bias in different designs
PRE: Quantitative research
H: Matching question to design
- **Effectiveness of an intervention**: randomised controlled trial, or systematic review of trials.
- **Causes, risk factors or harms**: cohort or case-control studies (randomising harms would be unethical).
- **Prevalence**: cross-sectional surveys.
- **Diagnostic accuracy**: cross-sectional studies comparing a test with a reference standard.
- **Experiences and meanings**: qualitative studies.
- **Prognosis**: cohort studies.
H: Types of design
- **Experimental**: the researcher allocates an intervention, ideally at random (RCTs).
- **Quasi-experimental**: an intervention without randomisation (such as before-and-after studies or non-randomised comparisons); more vulnerable to bias.
- **Observational**: the researcher observes without intervening (cohort, case-control, cross-sectional).
H: Common biases
- **Selection bias**: differences between groups at the start.
- **Performance bias**: differences in care apart from the intervention.
- **Detection or measurement bias**: differences in how outcomes are measured.
- **Attrition bias**: differences in dropouts.
- **Reporting bias**: selective reporting of outcomes or publication of positive results.
- **Confounding**: a third factor linked to both exposure and outcome.
H: Before-and-after studies
P: Many service evaluations compare outcomes before and after a change. They are useful but can't rule out other changes over time (such as seasonal variation or other initiatives). Interrupted time series designs and control groups strengthen them.
K: Choose the design that fits the question: trials for effectiveness, cohort and case-control for risk, cross-sectional for prevalence, qualitative for experience; watch for bias in each.
!: Concluding that a change caused an improvement from a simple before-and-after comparison. Other changes over time may explain it.
T: Quasi-experimental design | A study testing an intervention without random allocation
T: Selection bias | Systematic differences between groups at the start of a study
T: Attrition bias | Bias from differences in who drops out of a study
SUM: The research question determines the best study design.
SUM: Experimental, quasi-experimental and observational designs differ in control and bias.
SUM: Recognise selection, performance, detection, attrition and reporting bias.
SRC: Greenhalgh T, How to Read a Paper: the basics of evidence-based medicine and healthcare, 6th edition, Wiley-Blackwell | secondary | 2019
SRC: Higgins JPT and others (eds), Cochrane Handbook for Systematic Reviews of Interventions, version 6 | guidance | 2023 | https://training.cochrane.org/handbook
SRC: Polit DF, Beck CT, Nursing Research, 11th edition, Wolters Kluwer | secondary | 2021
Q: Which design best answers questions about the effectiveness of an intervention? | A randomised controlled trial, or a systematic review of trials.
Q: What is attrition bias? | Bias from differences in who drops out of a study.
M1#nursing-u16-05-q1@1: Which design is best for estimating how common a condition is at one point in time? | A cross-sectional survey | A randomised controlled trial | A case-control study | A meta-analysis of treatments | Cross-sectional studies measure prevalence.
M2#nursing-u16-05-q2@2: Why are harms of smoking studied with cohort or case-control designs rather than trials? | Randomly allocating people to smoke would be unethical | Trials are always cheaper | Cohort studies are always unbiased | Smoking can't be measured | Ethics rule out randomising harmful exposures.
M3#nursing-u16-05-q3@3: A ward's falls fell after a new initiative, but winter staffing also improved at the same time. What is the main limitation of concluding the initiative worked? | Other changes over time may explain the improvement | The sample was randomised | There was no data at all | Falls can't be measured | Before-and-after designs can't separate the intervention from other changes.
MS2#nursing-u16-05-q4@2: Which are types of bias? | Selection bias ; Attrition bias ; Reporting bias | Randomisation bias ; Saturation bias | These biases can distort study findings.

## Clinical trials
S: Clinical trials test whether interventions work and are safe. Randomised controlled trials are the most reliable way to compare treatments, and nurses often recruit, care for and collect data from trial participants.
O: Describe the features of a well-designed randomised controlled trial
O: Explain the phases of clinical trials of medicines
O: Describe nurses' roles in clinical research and the regulation of trials
PRE: Study design
H: Features of a good RCT
- **Randomisation**: participants are randomly allocated, so groups are similar in known and unknown factors.
- **Allocation concealment**: those recruiting can't predict the next allocation, preventing selection bias.
- **Blinding** (masking) of participants, clinicians and outcome assessors where possible.
- **Intention-to-treat analysis**: analysing participants in the groups they were allocated to, regardless of what they actually received, which preserves randomisation.
- **Adequate sample size** and **pre-registered** protocol and outcomes.
- **CONSORT** guidelines for reporting.
H: Phases of medicine trials
- **Phase I**: first in humans, small numbers, safety and dosing.
- **Phase II**: effectiveness and side effects in people with the condition.
- **Phase III**: larger trials comparing with standard treatment; supports licensing.
- **Phase IV**: post-marketing surveillance of long-term effects and rare side effects.
H: Regulation
- Clinical trials of medicines in the UK are regulated by the **MHRA** under the Medicines for Human Use (Clinical Trials) Regulations, with ethical approval from a **research ethics committee** and **Health Research Authority** approval in England and Wales.
- **Good Clinical Practice (GCP)** training is required for staff involved in trials.
H: Nurses in trials
P: Research nurses identify and recruit participants, obtain consent (where delegated and trained), deliver interventions, monitor for adverse events, collect data and support participants. Any nurse caring for trial participants should know about the trial and report adverse events.
K: Good RCTs use randomisation, allocation concealment, blinding and intention-to-treat analysis; medicine trials progress through phases I–IV under MHRA, ethics and GCP oversight.
!: Analysing only participants who completed the treatment. Intention-to-treat analysis preserves the benefits of randomisation.
T: Allocation concealment | Preventing those recruiting from knowing the next allocation
T: Intention-to-treat analysis | Analysing participants in their allocated groups regardless of what they received
T: Good Clinical Practice | International ethical and scientific standards for conducting clinical trials
SUM: Randomisation, concealment, blinding and intention-to-treat analysis reduce bias.
SUM: Medicine trials progress through phases I–IV.
SUM: Trials are regulated by the MHRA, ethics committees and GCP; nurses play key roles.
SRC: Schulz KF, Altman DG, Moher D, CONSORT 2010 statement: updated guidelines for reporting parallel group randomised trials, BMJ 340:c332 | primary | 2010
SRC: Medicines for Human Use (Clinical Trials) Regulations 2004 (as amended) | legislation | 2004 | https://www.legislation.gov.uk/uksi/2004/1031
SRC: National Institute for Health and Care Research, Good Clinical Practice training | guidance | 2024 | https://www.nihr.ac.uk/
Q: What is intention-to-treat analysis? | Analysing participants in their allocated groups regardless of what they actually received.
Q: What is the purpose of phase I trials? | To test safety and dosing in small numbers of people, often for the first time in humans.
M1#nursing-u16-06-q1@1: What is the main purpose of randomisation? | To make groups similar in known and unknown factors | To make the trial cheaper | To choose the healthiest participants | To let clinicians pick who gets treatment | Randomisation balances confounding factors.
M2#nursing-u16-06-q2@2: Which trial phase involves monitoring rare side effects after a medicine is licensed? | Phase IV | Phase I | Phase II | Phase III | Phase IV follows licensing and detects rare or long-term adverse effects in wider use.
M2#nursing-u16-06-q3@3: A nurse caring for a patient in a drug trial notices a new rash. What should she do? | Report it as a possible adverse event to the research team | Ignore it, as trial staff will notice | Stop the trial medicine herself | Remove the patient from the trial | Adverse events must be reported promptly.
MATCH1#nursing-u16-06-q4@1: Match each feature to its purpose. | Randomisation = Balancing groups ; Allocation concealment = Preventing selection bias ; Blinding = Reducing performance and detection bias ; Intention-to-treat = Preserving randomisation | Each feature protects against bias.

## Cohort studies
S: Cohort studies follow groups of people over time to see who develops an outcome, comparing those with and without an exposure. They are a key way to study causes, risks and prognosis when trials aren't possible.
O: Distinguish prospective and retrospective cohort studies
O: Calculate and interpret relative risk from a cohort study
O: Identify strengths and limitations of cohort studies, including loss to follow-up and confounding
PRE: Study design
H: Design
- Start with people **without the outcome**, classify them by **exposure** (such as smoking), and follow them to see who develops the outcome.
- **Prospective**: participants are followed forward from now.
- **Retrospective** (historical): uses existing records to look back at exposures and forward from that point to outcomes.
- Famous examples include the British Doctors Study (smoking and lung cancer) and birth cohort studies such as the Millennium Cohort Study.
H: Measures
- **Incidence** in exposed and unexposed groups.
- **Relative risk** = incidence in the exposed divided by incidence in the unexposed. For example, if 30 of 1,000 smokers and 10 of 1,000 non-smokers develop a disease, the relative risk is 3.
- **Attributable risk** (risk difference) = incidence in exposed minus incidence in unexposed.
H: Strengths
- Can study multiple outcomes from one exposure.
- Establish that the exposure came before the outcome (temporality).
- Measure incidence directly.
H: Limitations
- Large samples and long follow-up are often needed, especially for rare outcomes; costly.
- **Loss to follow-up** can bias results if those lost differ from those who remain.
- **Confounding**: exposed and unexposed groups may differ in other ways; statistical adjustment helps but can't remove unmeasured confounders.
K: Cohort studies follow exposed and unexposed people over time to measure incidence and relative risk; they show temporality but face loss to follow-up and confounding.
!: Treating an association in a cohort study as proof of causation. Confounding may explain it.
T: Prospective cohort study | A study following people forward in time from exposure to outcome
T: Relative risk | Incidence in the exposed group divided by incidence in the unexposed group
T: Loss to follow-up | Participants leaving a study before outcomes are measured
SUM: Cohort studies follow people by exposure to see who develops outcomes.
SUM: They measure incidence and relative risk and show temporality.
SUM: Loss to follow-up and confounding are key limitations.
SRC: Doll R, Hill AB, Mortality in relation to smoking: ten years' observations of British doctors, BMJ 1(5395):1399–1410 | primary | 1964
SRC: von Elm E and others, The STROBE statement: guidelines for reporting observational studies, The Lancet 370(9596):1453–1457 | primary | 2007
SRC: Polit DF, Beck CT, Nursing Research, 11th edition, Wolters Kluwer | secondary | 2021
Q: How is relative risk calculated in a cohort study? | Incidence in the exposed group divided by incidence in the unexposed group.
Q: What is a retrospective cohort study? | A cohort study using existing records to look back at exposures and then at subsequent outcomes.
M1#nursing-u16-07-q1@1: What do participants in a cohort study have in common at the start? | They don't yet have the outcome | They all have the disease | They are all randomly allocated a treatment | They are all hospital staff | Cohort studies start with people free of the outcome.
M2#nursing-u16-07-q2@2: In a cohort study, 20 of 500 exposed people and 10 of 500 unexposed people develop a disease. What is the relative risk? | 2 | 0.5 | 10 | 30 | Risk in exposed (20/500) divided by risk in unexposed (10/500) gives a relative risk of 2.
M2#nursing-u16-07-q3@3: A cohort study loses 40% of participants, mostly those who became unwell. What is the concern? | Loss to follow-up may bias the results | The results are more reliable | It proves the exposure is harmless | It has no effect on the findings | Differential dropout can distort findings.
TF2#nursing-u16-07-q4@3: Cohort studies can show that an exposure came before an outcome. | True | Temporality is a key strength of cohort designs.

## Case-control studies
S: Case-control studies compare people who have a condition (cases) with people who don't (controls), looking back at their past exposures. They are efficient for studying rare diseases and outbreaks.
O: Describe the design of case-control studies, including selection of cases and controls
O: Calculate and interpret an odds ratio
O: Recognise recall bias, selection bias and other limitations
PRE: Cohort studies
H: Design
- Identify **cases** (people with the outcome) and **controls** (people without it) from the same population.
- Compare their past **exposures**.
- Controls may be **matched** on factors such as age and sex to reduce confounding.
- Classic examples include studies linking smoking to lung cancer, and many outbreak investigations.
H: The odds ratio
- Compare the **odds of exposure** among cases with the odds of exposure among controls.
- An **odds ratio above 1** suggests the exposure is associated with the outcome; below 1 suggests a protective association; 1 suggests no association.
- For rare diseases, the odds ratio approximates the relative risk.
H: Strengths
- Efficient and relatively quick for **rare diseases** or diseases with long latency.
- Can study multiple exposures for one outcome.
H: Limitations
- **Recall bias**: cases may remember past exposures differently from controls.
- **Selection bias**: if controls don't represent the population that produced the cases.
- **Temporality** can be unclear.
- Can't directly measure incidence or relative risk.
K: Case-control studies compare past exposures in people with and without a condition, giving odds ratios; they suit rare diseases but are prone to recall and selection bias.
!: Using hospital visitors as controls without considering whether they represent the population. Poorly chosen controls cause selection bias.
T: Case-control study | A study comparing past exposures in people with and without a condition
T: Odds ratio | The odds of exposure in cases compared with the odds in controls
T: Recall bias | Systematic differences in how cases and controls remember past exposures
SUM: Case-control studies look back from outcome to exposure.
SUM: They give odds ratios and suit rare diseases and outbreaks.
SUM: Recall and selection bias are key limitations.
SRC: Doll R, Hill AB, Smoking and carcinoma of the lung: preliminary report, BMJ 2(4682):739–748 | primary | 1950
SRC: von Elm E and others, The STROBE statement: guidelines for reporting observational studies, The Lancet 370(9596):1453–1457 | primary | 2007
SRC: Bonita R, Beaglehole R, Kjellström T, Basic Epidemiology, 2nd edition, World Health Organization | secondary | 2006
Q: What is an odds ratio? | The odds of exposure in cases compared with the odds of exposure in controls.
Q: What is recall bias? | Systematic differences in how cases and controls remember past exposures.
M1#nursing-u16-08-q1@1: Why are case-control studies useful for rare diseases? | They start with people who already have the disease | They follow huge populations for decades | They randomise exposures | They don't need controls | Starting from cases makes rare diseases efficient to study.
M2#nursing-u16-08-q2@2: A case-control study reports an odds ratio of 0.5 for an exposure. What does this suggest? | The exposure may be protective | The exposure doubles the risk | There is no association | The study is invalid | An odds ratio below 1 suggests a protective association.
M2#nursing-u16-08-q3@3: Mothers of babies with a birth defect recall medicines taken in pregnancy more thoroughly than mothers of healthy babies. What bias is this? | Recall bias | Attrition bias | Performance bias | Publication bias | Cases often search their memories harder for possible causes.
MS2#nursing-u16-08-q4@2: Which are limitations of case-control studies? | Recall bias ; Selection bias in choosing controls ; Difficulty establishing temporality | Measuring incidence directly ; Randomising participants | These limit the conclusions case-control studies can support.

## Systematic reviews
S: A systematic review uses explicit, reproducible methods to find, appraise and synthesise all relevant studies on a question. Good systematic reviews are a cornerstone of evidence-based practice and guidelines.
O: Distinguish systematic reviews from narrative reviews
O: Describe the stages of a systematic review, including protocol registration and risk of bias assessment
O: Use PRISMA and GRADE to understand how reviews are reported and how certainty is rated
PRE: Research literacy
H: Systematic and narrative reviews
- **Narrative reviews** summarise literature without explicit methods; they may be selective.
- **Systematic reviews** use a pre-specified protocol, comprehensive searches, explicit inclusion criteria, quality appraisal and transparent synthesis, reducing bias.
- Other types: **scoping reviews** (map the evidence), **rapid reviews**, **umbrella reviews** (reviews of reviews) and **qualitative evidence syntheses**.
H: Stages
- Define the question (PICO) and **register a protocol** (such as on PROSPERO).
- **Comprehensive search** of multiple databases and grey literature.
- **Screening** against inclusion criteria, usually by two reviewers independently.
- **Data extraction**.
- **Risk of bias assessment** (such as the Cochrane risk of bias tool for trials).
- **Synthesis**: narrative and, where appropriate, meta-analysis.
- **Rating certainty** of evidence and drawing conclusions.
H: Reporting and certainty
- **PRISMA** guides reporting, including a flow diagram showing records identified, screened, excluded and included.
- **GRADE** rates the certainty of evidence for each outcome as high, moderate, low or very low, considering risk of bias, inconsistency, indirectness, imprecision and publication bias.
H: Sources
P: The **Cochrane Library** publishes high-quality systematic reviews; the **JBI** (Joanna Briggs Institute) produces reviews relevant to nursing, including qualitative syntheses.
K: Systematic reviews use protocols, comprehensive searching, independent screening, risk of bias assessment and transparent synthesis, reported with PRISMA and rated with GRADE.
!: Treating a narrative review as equivalent to a systematic review. Without explicit methods, narrative reviews may be selective.
T: Systematic review | A review using explicit, reproducible methods to find, appraise and synthesise all relevant studies
T: PRISMA | Preferred Reporting Items for Systematic Reviews and Meta-Analyses
T: GRADE | A system for rating the certainty of evidence as high, moderate, low or very low
SUM: Systematic reviews reduce bias through explicit methods.
SUM: Stages include protocol, search, screening, extraction, risk of bias and synthesis.
SUM: PRISMA guides reporting; GRADE rates certainty.
SRC: Page MJ and others, The PRISMA 2020 statement: an updated guideline for reporting systematic reviews, BMJ 372:n71 | primary | 2021
SRC: Higgins JPT and others (eds), Cochrane Handbook for Systematic Reviews of Interventions, version 6 | guidance | 2023 | https://training.cochrane.org/handbook
SRC: GRADE Working Group, GRADE handbook | guidance | 2013 | https://gdt.gradepro.org/app/handbook/handbook.html
Q: What does GRADE rate? | The certainty of evidence for each outcome, as high, moderate, low or very low.
Q: Where are systematic review protocols often registered? | PROSPERO.
M1#nursing-u16-09-q1@1: What distinguishes a systematic review from a narrative review? | Explicit, reproducible methods | Being longer | Including only one study | Being written by a single author | A systematic review uses a protocol, comprehensive search and explicit methods to reduce bias.
M2#nursing-u16-09-q2@2: What does a PRISMA flow diagram show? | Records identified, screened and included | The individual results of each study | The funding sources of the review authors | The total cost of conducting the review | It makes the selection process transparent.
M2#nursing-u16-09-q3@3: Why do two reviewers usually screen studies independently? | To reduce errors and bias in study selection | To finish faster | Because one reviewer can't read | To increase the number of studies | Independent screening improves reliability.
MATCH1#nursing-u16-09-q4@2: Match each review type to its purpose. | Systematic review = Answer a focused question with explicit methods ; Scoping review = Map the extent of evidence ; Umbrella review = Review existing reviews ; Narrative review = Summarise literature without explicit methods | Review types serve different purposes.

## Meta-analysis
S: Meta-analysis statistically combines the results of several studies to give a more precise overall estimate of effect. Reading forest plots and understanding heterogeneity are essential skills for interpreting systematic reviews.
O: Explain the purpose of meta-analysis and when it is appropriate
O: Interpret a forest plot, including individual studies, the pooled estimate and the line of no effect
O: Explain heterogeneity and the difference between fixed and random effects models
PRE: Systematic reviews
H: Purpose
- Combining studies increases **statistical power** and **precision**, and can resolve uncertainty when individual studies are small or conflicting.
- Only appropriate when studies are similar enough in participants, interventions, comparisons and outcomes.
H: Forest plots
- Each **study** is shown as a square (the point estimate, sized by its weight) with a horizontal line (its confidence interval).
- The **pooled estimate** is shown as a diamond: its centre is the combined effect and its width the confidence interval.
- The **vertical line of no effect** is at 1 for ratios (such as relative risk or odds ratio) or 0 for differences (such as mean difference).
- If the diamond doesn't cross the line of no effect, the pooled result is statistically significant.
- Labels show which side favours the intervention.
H: Heterogeneity
- Variation in results between studies beyond chance.
- Assessed by looking at the plot and with statistics such as **I²** (roughly, the percentage of variation due to heterogeneity rather than chance; higher values indicate more heterogeneity).
- Explore causes with **subgroup** or **sensitivity analyses**.
H: Models
- **Fixed effect**: assumes one true effect shared by all studies.
- **Random effects**: assumes true effects vary between studies; gives wider confidence intervals when heterogeneity exists.
H: Limitations
P: A meta-analysis is only as good as the studies it includes ("garbage in, garbage out"). **Publication bias** (missing small negative studies) can exaggerate effects; **funnel plots** help detect it.
K: Meta-analysis pools results for precision; read forest plots (squares, lines, diamond, line of no effect), assess heterogeneity with I², and remember quality and publication bias.
!: Trusting a pooled estimate without checking heterogeneity and the quality of the included studies.
T: Forest plot | A graph showing each study's effect and confidence interval and the pooled estimate
T: Heterogeneity | Variation in study results beyond what chance would explain
T: Publication bias | Bias from studies with positive results being more likely to be published
SUM: Meta-analysis pools similar studies to increase precision.
SUM: In forest plots, the diamond is the pooled estimate; check whether it crosses the line of no effect.
SUM: Assess heterogeneity, choose models carefully and watch for publication bias.
SRC: Higgins JPT and others (eds), Cochrane Handbook for Systematic Reviews of Interventions, version 6, chapter 10 | guidance | 2023 | https://training.cochrane.org/handbook
SRC: Higgins JPT, Thompson SG, Deeks JJ, Altman DG, Measuring inconsistency in meta-analyses, BMJ 327(7414):557–560 | primary | 2003
SRC: Greenhalgh T, How to Read a Paper, 6th edition, Wiley-Blackwell | secondary | 2019
Q: What does the diamond represent on a forest plot? | The pooled estimate and its confidence interval.
Q: What does I² measure? | The proportion of variation between studies due to heterogeneity rather than chance.
M1#nursing-u16-10-q1@1: Where is the line of no effect for a relative risk on a forest plot? | At 1 | At 0 | At 100 | At 0.05 | A ratio of 1 means no difference between groups.
M2#nursing-u16-10-q2@2: The pooled diamond on a forest plot lies entirely to the left of 1, on the side favouring the intervention. What does this suggest? | A statistically significant benefit of the intervention | No effect | Harm from the intervention | The meta-analysis is invalid | A diamond not crossing 1 indicates a significant pooled effect.
M3#nursing-u16-10-q3@3: A meta-analysis shows an I² of 85%. What should the reader consider? | Substantial heterogeneity, so the pooled estimate should be interpreted cautiously | That all studies agree perfectly | That the result is definitely correct | That no studies were included | High I² suggests important differences between studies.
TF2#nursing-u16-10-q4@3: A funnel plot can help detect publication bias. | True | Asymmetry in a funnel plot can suggest missing small studies.

## Critical appraisal
S: Critical appraisal is the systematic assessment of a study's trustworthiness, results and relevance. It helps nurses decide whether evidence should change practice.
O: Apply structured appraisal tools such as CASP checklists
O: Assess validity, results and applicability using three core questions
O: Use reporting guidelines to recognise well-reported research
PRE: Systematic reviews
H: Three core questions
- **Are the results valid?** Was the design appropriate, was bias minimised, were participants and outcomes well defined?
- **What are the results?** How large and precise is the effect? Are results statistically and clinically significant?
- **Will the results help locally?** Are the participants and setting similar to mine? Are benefits worth harms and costs? Is it feasible?
H: Tools
- **CASP** (Critical Appraisal Skills Programme) checklists for RCTs, systematic reviews, cohort, case-control, qualitative studies and others.
- **JBI** critical appraisal tools.
- **Cochrane risk of bias** tools for trials; **AMSTAR 2** for systematic reviews.
H: Reporting guidelines
- **CONSORT** (trials), **PRISMA** (systematic reviews), **STROBE** (observational studies), **COREQ** (qualitative), **SQUIRE** (quality improvement), **SRQR**, and others, found through the **EQUATOR Network**.
- Good reporting makes appraisal possible; poor reporting is a warning sign.
H: Other considerations
- **Funding and conflicts of interest**.
- **Peer review** status (preprints aren't peer-reviewed).
- **Consistency** with other evidence.
- **Ethics approval** and consent.
H: From appraisal to practice
P: One study rarely changes practice on its own. Appraisal feeds into reviews, guidelines and local discussions. Nurses can use journal clubs to practise appraisal together.
K: Appraise validity, results and applicability using structured tools such as CASP, check reporting against guidelines, and consider funding, peer review and consistency.
!: Accepting a study's conclusions from the abstract alone. Read the methods and results to judge trustworthiness.
T: Critical appraisal | Systematically assessing a study's trustworthiness, results and relevance
T: CASP | Critical Appraisal Skills Programme checklists for different study designs
T: EQUATOR Network | A hub for health research reporting guidelines
SUM: Ask: are the results valid, what are they, and will they help locally?
SUM: Use tools such as CASP and check reporting guidelines.
SUM: Consider funding, peer review and consistency before changing practice.
SRC: Critical Appraisal Skills Programme, CASP checklists | guidance | 2024 | https://casp-uk.net/casp-tools-checklists/
SRC: EQUATOR Network, Enhancing the quality and transparency of health research: reporting guidelines | guidance | 2024 | https://www.equator-network.org/
SRC: Greenhalgh T, How to Read a Paper, 6th edition, Wiley-Blackwell | secondary | 2019
Q: What are the three core questions of critical appraisal? | Are the results valid? What are the results? Will they help locally?
Q: What does CASP stand for? | Critical Appraisal Skills Programme.
M1#nursing-u16-11-q1@1: Which reporting guideline applies to randomised controlled trials? | CONSORT | PRISMA | STROBE | COREQ | CONSORT is the reporting guideline for randomised controlled trials, including a flow diagram.
M2#nursing-u16-11-q2@2: Which question assesses applicability? | Are the participants and setting similar to mine? | Was the study published recently? | How many authors were there? | Was the paper long? | Applicability asks whether results transfer to your setting.
M2#nursing-u16-11-q3@3: A trial of a new wound product was funded by its manufacturer. What should a reader do? | Consider the potential conflict of interest while appraising the methods | Reject it automatically | Ignore the funding entirely | Assume it must be biased and stop reading | Funding is a consideration, not an automatic rejection.
MATCH1#nursing-u16-11-q4@1: Match each reporting guideline to its study type. | CONSORT = Randomised trials ; PRISMA = Systematic reviews ; STROBE = Observational studies ; COREQ = Qualitative interviews and focus groups | Reporting guidelines are specific to design.

## Research ethics
S: Research ethics protects the rights, safety, dignity and wellbeing of research participants. History shows what happens when ethics fail, and modern research is governed by ethical principles and review systems.
O: Describe the history and principles of research ethics
O: Explain the UK system of research ethics review and governance
O: Apply ethical principles to nursing research, including vulnerable groups and data
PRE: Research literacy
H: History
- The **Nuremberg Code** (1947) followed unethical experiments by Nazi doctors and established voluntary consent as essential.
- The **Declaration of Helsinki** (World Medical Association, first adopted 1964, revised regularly) sets ethical principles for medical research.
- The **Tuskegee syphilis study** (USA, 1932–1972) withheld treatment from Black men, leading to reforms in research ethics.
- UK examples, such as the retention of organs without consent revealed at Alder Hey (leading to the Human Tissue Act 2004), shaped UK law.
H: Principles
- **Respect for persons** (autonomy and protection of those with reduced autonomy).
- **Beneficence** and **non-maleficence**: maximise benefits and minimise harms.
- **Justice**: fair selection of participants and fair distribution of burdens and benefits.
- Scientific validity: poor research that can't answer its question is itself unethical.
H: UK review and governance
- **Research Ethics Committees** (RECs) review studies involving NHS patients, their data or tissue.
- The **Health Research Authority** (HRA) oversees research approvals in England (with equivalent arrangements in the other nations), through the **IRAS** application system.
- The **UK Policy Framework for Health and Social Care Research** sets responsibilities for researchers, sponsors and organisations.
- **Service evaluations** and **audits** usually don't need REC review, but research does; the HRA decision tool helps distinguish them.
H: Specific issues
- **Vulnerable groups**: children, people who lack capacity, prisoners and others need extra protection without being excluded unfairly.
- **Confidentiality and data protection**: anonymisation, secure storage, UK GDPR compliance.
- **Conflicts of interest** and **research misconduct** (fabrication, falsification, plagiarism) must be avoided and reported.
K: Research ethics grew from historical abuses; principles of respect, beneficence and justice are upheld through RECs and the HRA, with extra protection for vulnerable groups.
!: Starting a study involving NHS patients without checking whether it needs ethical approval. Use the HRA tool to check whether it is research.
T: Declaration of Helsinki | The World Medical Association's ethical principles for medical research involving humans
T: Research Ethics Committee | An independent committee reviewing research to protect participants
T: Health Research Authority | The body overseeing health research approvals in England
SUM: Historical abuses led to the Nuremberg Code and Declaration of Helsinki.
SUM: Principles include respect for persons, beneficence and justice.
SUM: RECs and the HRA review research; vulnerable groups and data need protection.
SRC: World Medical Association, Declaration of Helsinki: ethical principles for medical research involving human participants | guidance | 2024 | https://www.wma.net/policies-post/wma-declaration-of-helsinki/
SRC: Health Research Authority, UK policy framework for health and social care research | guidance | 2023 | https://www.hra.nhs.uk/planning-and-improving-research/policies-standards-legislation/uk-policy-framework-health-social-care-research/
SRC: Human Tissue Act 2004 | legislation | 2004 | https://www.legislation.gov.uk/ukpga/2004/30
Q: What does the Declaration of Helsinki set out? | Ethical principles for medical research involving human participants.
Q: Which body oversees health research approvals in England? | The Health Research Authority.
M1#nursing-u16-12-q1@1: Which code, created after the Second World War, established voluntary consent as essential in research? | The Nuremberg Code | The NMC Code | The Highway Code | The Green Book | The Nuremberg Code responded to unethical wartime experiments.
M2#nursing-u16-12-q2@2: A nurse wants to evaluate a new ward discharge leaflet using routine data only. What should she check? | Whether it is service evaluation or research, using the HRA decision tool | Nothing, as all projects need full ethics approval | That patients sign research consent forms | That the leaflet is printed in colour | Service evaluations usually don't need REC review, but research does.
M2#nursing-u16-12-q3@3: What lesson did the Tuskegee study teach research ethics? | Withholding effective treatment and deceiving participants is a grave ethical breach | Research should always use deception | Consent is unnecessary for minority groups | Long studies are always better | It led to major reforms in research protection.
MS2#nursing-u16-12-q4@2: Which are core principles of research ethics? | Respect for persons ; Beneficence ; Justice | Profit maximisation ; Speed above safety | These principles protect participants.

## Informed consent in research
S: Informed consent is the foundation of ethical research. Participants must understand what taking part involves and agree freely, and the law sets out how research can include people who can't consent for themselves.
O: Describe the elements of valid informed consent in research
O: Explain consent for children and for adults who lack capacity under UK law
O: Support participants' right to withdraw and ongoing consent
PRE: Research ethics
H: Elements
- **Information**: a participant information sheet in plain language covering the purpose, what is involved, risks and benefits, alternatives, confidentiality, data use, and the right to withdraw.
- **Understanding**: time to read, ask questions and discuss with others; checking understanding.
- **Voluntariness**: no pressure, coercion or undue inducement; care not affected by declining.
- **Capacity** to decide.
- **Documentation**: usually a signed consent form, or recorded verbal or electronic consent where approved.
H: Ongoing consent and withdrawal
- Consent is a process, not a single signature; check that participants are still willing.
- Participants can **withdraw at any time** without giving a reason and without affecting their care; the information sheet explains what happens to data already collected.
H: Children
- For medicine trials, specific legal rules apply about who can consent (people with parental responsibility), with the child's **assent** sought.
- For other research, Gillick-competent young people may consent for themselves, depending on the study and approvals.
H: Adults who lack capacity (England and Wales)
- **Sections 30–34 of the Mental Capacity Act 2005** allow research involving people who lack capacity only under strict conditions: approval by an appropriate body, the research relates to the person's condition, it can't be done as effectively with people who have capacity, and risks are minimal or justified by potential benefit.
- Researchers must consult a **consultee** (personal, such as a family member, or nominated) about the person's likely wishes.
- Any sign that the person objects must be respected.
- Clinical trials of medicines follow separate rules under the Clinical Trials Regulations (legal representatives).
- Scotland and Northern Ireland have their own legislation.
K: Valid research consent needs information, understanding, voluntariness and capacity; it is ongoing and can be withdrawn; strict legal rules govern research with children and adults who lack capacity.
!: Treating a signed consent form as the end of consent. Check ongoing willingness throughout participation.
T: Participant information sheet | A plain-language document explaining a study to potential participants
T: Consultee | A person consulted about whether someone who lacks capacity should take part in research
T: Right to withdraw | A participant's right to leave a study at any time without giving a reason
SUM: Research consent requires information, understanding, voluntariness and capacity.
SUM: Consent is ongoing; participants can withdraw without affecting their care.
SUM: Special legal rules govern children and adults who lack capacity.
SRC: Mental Capacity Act 2005, sections 30–34 (research) | legislation | 2005 | https://www.legislation.gov.uk/ukpga/2005/9
SRC: Health Research Authority, Consent and participant information guidance | guidance | 2024 | https://www.hra-decisiontools.org.uk/consent/
SRC: Medical Research Council, MRC ethics guidance: research involving adults who lack capacity, and children | guidance | 2023 | https://www.ukri.org/councils/mrc/
Q: What is a consultee in research? | A person consulted about whether someone who lacks capacity should take part.
Q: Can a research participant withdraw without giving a reason? | Yes, at any time, without affecting their care.
M1#nursing-u16-13-q1@1: Which document explains a study to potential participants? | A participant information sheet | A discharge summary letter | A medicines administration chart | The organisational risk register | The information sheet provides plain-language details.
M2#nursing-u16-13-q2@2: Which sections of the Mental Capacity Act govern research with people who lack capacity? | Sections 30–34 | Sections 1–6 only | Section 136 | Section 42 | These sections set strict conditions for such research.
M2#nursing-u16-13-q3@3: Midway through a study, a participant seems reluctant to continue but hasn't said so. What should the nurse do? | Check whether they still wish to take part, reminding them of their right to withdraw | Assume consent continues because they signed | Encourage them to keep going for the study's sake | Withdraw them without discussion | Consent is ongoing and should be checked.
MS2#nursing-u16-13-q4@2: Which are elements of valid informed consent in research? | Clear information ; Voluntariness ; Capacity | Pressure from staff ; Large payments that override judgement | Valid consent is informed, voluntary and capacitous.

## Evidence-based practice
S: Evidence-based practice integrates research evidence, clinical expertise and the person's preferences. This lesson focuses on the process of moving from a clinical question to changed practice, and on why evidence often fails to reach practice.
O: Apply the five steps of evidence-based practice
O: Identify barriers and facilitators to implementing evidence
O: Describe implementation science approaches that help evidence reach practice
PRE: Critical appraisal
H: The five steps (the "5 As")
- **Ask**: turn a clinical uncertainty into a focused question (PICO).
- **Acquire**: search for the best evidence, starting with guidelines and systematic reviews.
- **Appraise**: critically appraise validity, results and relevance.
- **Apply**: integrate evidence with clinical expertise and the person's preferences.
- **Assess** (audit): evaluate the outcome and your performance.
H: The evidence-practice gap
- It has often been estimated that research takes many years (sometimes quoted as around 17) to be adopted into routine practice, and much never is.
- **Barriers**: time, workload, access to evidence, appraisal skills, organisational culture, leadership, resources, and resistance to change.
- **Facilitators**: supportive leadership, protected time, librarians, clinical academic roles, practice development teams, and champions.
H: Implementation science
- The study of methods to promote the uptake of research into practice.
- Frameworks such as **PARIHS** (i-PARIHS) emphasise the interplay of **evidence**, **context** and **facilitation**.
- The **Consolidated Framework for Implementation Research (CFIR)** and the **Knowledge-to-Action** cycle are also used.
- Strategies: audit and feedback, education, reminders, local opinion leaders, and changes to systems and documentation.
H: Nurses leading evidence-based change
P: Nurses can lead journal clubs, question routines, contribute to guideline development, and test changes through quality improvement. Clinical academic careers and research-active roles strengthen the link between evidence and practice.
K: Follow the five As (ask, acquire, appraise, apply, assess), recognise barriers to using evidence, and use implementation frameworks that address evidence, context and facilitation.
!: Assuming that publishing good evidence is enough to change practice. Implementation needs active strategies and supportive context.
T: The 5 As | Ask, acquire, appraise, apply and assess: the steps of evidence-based practice
T: Implementation science | The study of methods to promote the uptake of research into routine practice
T: i-PARIHS | A framework explaining implementation through evidence, context, facilitation and recipients
SUM: Evidence-based practice follows five steps.
SUM: The evidence-practice gap has many barriers.
SUM: Implementation science provides frameworks and strategies to close the gap.
SRC: Sackett DL and others, Evidence-Based Medicine: how to practice and teach EBM, Churchill Livingstone | secondary | 2000
SRC: Harvey G, Kitson A, PARIHS revisited: from heuristic to integrated framework for the successful implementation of knowledge into practice, Implementation Science 11:33 | primary | 2016
SRC: Morris ZS, Wooding S, Grant J, The answer is 17 years, what is the question: understanding time lags in translational research, Journal of the Royal Society of Medicine 104(12):510–520 | primary | 2011
Q: What are the five As of evidence-based practice? | Ask, acquire, appraise, apply and assess.
Q: What is implementation science? | The study of methods to promote the uptake of research into routine practice.
M1#nursing-u16-14-q1@1: Which is the first step of evidence-based practice? | Ask a focused clinical question | Apply the evidence to patients | Audit the outcomes of care | Write a new local guideline | Asking a focused (PICO) question comes first because it shapes the search for evidence.
M2#nursing-u16-14-q2@2: Which framework emphasises evidence, context and facilitation? | i-PARIHS | SBAR | ABCDE | SMART | i-PARIHS explains successful implementation through these elements.
M2#nursing-u16-14-q3@3: A ward has strong evidence for a new practice but staff aren't using it. Which strategy is most likely to help? | Audit and feedback with local champions and leadership support | Emailing the paper once | Telling staff to read it at home | Waiting for staff to adopt it | Active implementation strategies change practice.
TF2#nursing-u16-14-q4@3: Research often takes many years to be adopted into routine practice. | True | The evidence-practice gap is well documented.

## Clinical guidelines
S: Clinical guidelines are systematically developed recommendations that help professionals and patients make decisions about care. In the UK, NICE, SIGN and professional bodies produce guidance that shapes nursing practice.
O: Describe how national guidelines are developed in the UK
O: Appraise the quality of a guideline using AGREE II
O: Apply guidelines alongside clinical judgement and the person's preferences
PRE: Evidence-based practice
H: Producers
- **NICE** (England, with many products used in Wales and Northern Ireland): guidelines, quality standards and technology appraisals.
- **SIGN** (Scotland) and Healthcare Improvement Scotland.
- **Royal colleges and professional bodies** (such as the RCN, RCP, BTS) and specialist societies.
- Local policies and procedures adapt national guidance.
H: Development
- Scoping, review questions, systematic reviews of evidence, economic evaluation, committee deliberation (including lay members), consultation and publication.
- Recommendations reflect the **strength of evidence**, often signalled by wording (such as "offer" for strong recommendations and "consider" for weaker ones in NICE guidelines).
- Guidelines are reviewed and updated as evidence changes.
H: Appraising guidelines: AGREE II
- Domains: **scope and purpose**, **stakeholder involvement**, **rigour of development**, **clarity of presentation**, **applicability** and **editorial independence**.
- High-quality guidelines are transparent about evidence, methods and conflicts of interest.
H: Using guidelines
- Guidelines support but don't replace professional judgement.
- Consider the individual's circumstances, preferences, comorbidities and values.
- Depart from guidance when justified, and record the reasons.
- Legally, guidelines can be relevant evidence of reasonable practice, but deviation can be justified.
K: UK guidelines from NICE, SIGN and professional bodies are developed systematically; appraise them with AGREE II and apply them with judgement and the person's preferences.
!: Following a guideline rigidly when it doesn't fit the individual person. Use judgement and record reasons for any departure.
T: Clinical guideline | Systematically developed recommendations to support decisions about care
T: AGREE II | An instrument for appraising the quality of clinical guidelines
T: Quality standard | A NICE set of specific, measurable statements describing high-quality care
SUM: NICE, SIGN and professional bodies produce UK guidelines.
SUM: Guidelines are developed from systematic reviews and committee deliberation; AGREE II appraises them.
SUM: Apply guidelines with judgement and record reasons for departures.
SRC: National Institute for Health and Care Excellence, Developing NICE guidelines: the manual | guidance | 2024 | https://www.nice.org.uk/process/pmg20
SRC: AGREE Next Steps Consortium, The AGREE II instrument | guidance | 2017 | https://www.agreetrust.org/
SRC: Scottish Intercollegiate Guidelines Network, SIGN 50: a guideline developer's handbook | guidance | 2019 | https://www.sign.ac.uk/
Q: What does AGREE II appraise? | The quality of clinical guidelines.
Q: What does the word "consider" usually signal in a NICE recommendation? | A weaker recommendation than "offer".
M1#nursing-u16-15-q1@1: Which body produces clinical guidelines in Scotland? | SIGN | NICE only | The MHRA | The CQC | SIGN develops Scottish national guidelines.
M2#nursing-u16-15-q2@2: Which is an AGREE II domain? | Editorial independence | Hospital car parking | Staff uniform policy | Number of pages | AGREE II assesses independence from funders and conflicts.
M2#nursing-u16-15-q3@3: A guideline recommends a treatment, but a patient with multiple conditions and different priorities declines it. What should the nurse do? | Respect the decision, discuss alternatives and record the reasons | Insist the guideline must be followed | Give the treatment anyway | Discharge the patient | Guidelines support, not replace, person-centred decisions.
MATCH1#nursing-u16-15-q4@2: Match each NICE product to its purpose. | Guideline = Recommendations on care ; Quality standard = Measurable statements of high-quality care ; Technology appraisal = Recommendations on use of new medicines and technologies | Different products serve different purposes.

## Quality improvement
S: Quality improvement (QI) uses systematic methods to make care safer, more effective, more person-centred and more efficient. Nurses at every level can lead and take part in QI projects.
O: Describe the dimensions of quality and the Model for Improvement
O: Plan and run Plan-Do-Study-Act cycles with appropriate measures
O: Interpret run charts and statistical process control charts
PRE: Evidence-based practice
H: Dimensions of quality
- The Institute of Medicine described six dimensions: care should be **safe**, **effective**, **person-centred**, **timely**, **efficient** and **equitable**.
H: The Model for Improvement
- Three questions: **What are we trying to accomplish?** (a clear, measurable aim) **How will we know that a change is an improvement?** (measures) **What changes can we make that will result in improvement?** (change ideas).
- Then test changes using **Plan-Do-Study-Act (PDSA)** cycles: small, rapid tests that build learning before scaling up.
H: Measures
- **Outcome measures**: the result for patients (such as fall rates).
- **Process measures**: whether the change is being done (such as percentage of patients with lying and standing blood pressure).
- **Balancing measures**: unintended consequences elsewhere (such as staff time).
H: Tools
- **Driver diagrams** link the aim to primary and secondary drivers and change ideas.
- **Process mapping**, **fishbone diagrams** and **5 whys** explore causes.
- **Run charts** show data over time; rules identify non-random patterns (such as shifts and trends).
- **Statistical process control (SPC) charts** add control limits to distinguish **common cause variation** (normal noise) from **special cause variation** (a signal worth investigating).
- **Lean** focuses on reducing waste; **Six Sigma** on reducing variation.
H: Making QI work
P: Involve patients and frontline staff, start small, measure frequently, share learning, and sustain changes. QI differs from research (it improves local practice rather than generating generalisable knowledge) and from audit (which checks against standards), though all can overlap. Report QI work using SQUIRE guidelines.
K: Use the Model for Improvement, small PDSA cycles and outcome, process and balancing measures, and interpret data over time with run and SPC charts.
!: Making a large change all at once without testing. Small PDSA cycles reduce risk and build learning.
T: PDSA cycle | Plan-Do-Study-Act: a small, rapid test of change
T: Balancing measure | A measure checking for unintended consequences of a change
T: Special cause variation | Variation in data signalling a real change rather than random noise
SUM: Quality has six dimensions: safe, effective, person-centred, timely, efficient and equitable.
SUM: The Model for Improvement uses an aim, measures and PDSA-tested changes.
SUM: Run and SPC charts show whether changes are improvements.
SRC: Langley GJ and others, The Improvement Guide: a practical approach to enhancing organizational performance, 2nd edition, Jossey-Bass | secondary | 2009
SRC: Institute of Medicine, Crossing the Quality Chasm: a new health system for the 21st century | primary | 2001
SRC: NHS England, Quality, service improvement and redesign (QSIR) tools | guidance | 2023 | https://www.england.nhs.uk/sustainableimprovement/qsir-programme/
Q: What are the three questions of the Model for Improvement? | What are we trying to accomplish? How will we know a change is an improvement? What changes can we make that will result in improvement?
Q: What does an SPC chart distinguish? | Common cause variation from special cause variation.
M1#nursing-u16-16-q1@1: What does PDSA stand for? | Plan, Do, Study, Act | Prepare, Deliver, Stop, Assess | Plan, Decide, Start, Audit | Practise, Do, See, Adapt | PDSA cycles test changes on a small scale.
M2#nursing-u16-16-q2@2: In a project to reduce falls, which is a balancing measure? | Staff time spent on the new checks | The number of falls | The percentage of patients assessed | The aim statement | Balancing measures check for unintended effects.
M3#nursing-u16-16-q3@3: A run chart shows falls dropping below the median for eight consecutive weeks after a change. What does this suggest? | A non-random shift, suggesting the change may be an improvement | Random variation only | That the data are wrong | That the change caused more falls | A run of points on one side of the median signals a shift.
MATCH1#nursing-u16-16-q4@1: Match each measure type to an example. | Outcome = Number of pressure ulcers ; Process = Percentage of patients repositioned on time ; Balancing = Staff overtime hours | Each measure type answers a different question.

## Clinical audit
S: Clinical audit is a quality improvement process that measures care against explicit standards and makes changes to close the gap. It checks whether best practice is being delivered.
O: Describe the audit cycle and how audit differs from research and service evaluation
O: Plan an audit with explicit criteria, standards and data collection
O: Use audit results to drive and sustain improvement, including re-audit
PRE: Quality improvement
H: The audit cycle
- **Select a topic**: important, high-risk, high-volume or a known problem.
- **Set criteria and standards** from evidence or guidance (such as "100% of patients aged 65 or over have lying and standing blood pressure recorded within 24 hours of admission").
- **Collect data** on current practice.
- **Compare** performance against the standard.
- **Implement change** to address gaps.
- **Re-audit** to check improvement and close the loop.
H: Audit, research and service evaluation
- **Research** generates new, generalisable knowledge and usually needs ethical approval.
- **Audit** measures practice against existing standards.
- **Service evaluation** judges current service quality without a standard.
- The HRA decision tool helps distinguish them.
H: Planning an audit
- Agree the question, criteria and standard; define the sample (such as consecutive patients over a period); design a data collection tool; consider data protection; register with the organisation's audit or governance team.
- Involve the team so results are trusted and acted on.
H: National audits
- The **National Clinical Audit and Patient Outcomes Programme** (managed by HQIP in England) includes audits such as the National Hip Fracture Database, the National Audit of Inpatient Falls, and the Sentinel Stroke National Audit Programme.
- Results allow organisations to compare and improve.
H: Making audit count
P: An audit without action and re-audit wastes effort. Feed back results, agree an action plan with owners and timescales, and re-audit. Combine audit with QI methods to test changes.
K: Audit measures practice against explicit standards, drives change and must be followed by re-audit; it differs from research and service evaluation.
!: Collecting audit data and never re-auditing. Closing the loop is what improves care.
T: Clinical audit | A process measuring care against explicit standards and making changes to improve
T: Re-audit | Repeating an audit to check whether changes have improved practice
T: HQIP | The Healthcare Quality Improvement Partnership, which manages national clinical audits in England
SUM: The audit cycle sets standards, measures, compares, changes and re-audits.
SUM: Audit differs from research and service evaluation.
SUM: National audits enable comparison; action and re-audit make audit worthwhile.
SRC: Healthcare Quality Improvement Partnership, Best practice in clinical audit | guidance | 2020 | https://www.hqip.org.uk/
SRC: NICE, Principles for best practice in clinical audit | guidance | 2002 | https://www.nice.org.uk/
SRC: Health Research Authority, Is my study research? decision tool | guidance | 2024 | https://www.hra-decisiontools.org.uk/research/
Q: What is the final step of the audit cycle? | Re-audit to check whether changes have improved practice.
Q: How does audit differ from research? | Audit measures practice against existing standards; research generates new knowledge.
M1#nursing-u16-17-q1@1: What is clinical audit? | Measuring care against explicit standards and making improvements | Testing a new drug | Interviewing patients about experiences only | Inspecting a hospital for registration | Audit measures current practice against explicit standards and then drives change to close gaps.
M2#nursing-u16-17-q2@2: Which is a well-written audit standard? | 100% of patients aged 65 or over have lying and standing blood pressure recorded within 24 hours | Patients should be looked after well | Staff should try harder | Falls should be reduced | Standards should be specific and measurable.
M2#nursing-u16-17-q3@3: An audit found 40% compliance. Actions were agreed but nothing was checked afterwards. What is missing? | A re-audit to close the loop | More initial data | A research ethics application | A new topic | Without re-audit the loop isn't closed, so nobody knows whether the agreed actions improved care.
SEQ1#nursing-u16-17-q4@2: Put the stages of the audit cycle in order. | Select a topic ; Set criteria and standards ; Collect data ; Compare with standards ; Implement change ; Re-audit | The cycle is completed by re-audit.

## Patient safety
S: Patient safety is the avoidance of unintended or unexpected harm to people during healthcare. Healthcare is complex and errors are common; safety science looks at how systems can be designed to make harm less likely and to learn when it happens.
O: Describe the scale of avoidable harm and the NHS approach to patient safety
O: Apply safety models such as the Swiss cheese model and Safety-I and Safety-II thinking
O: Contribute to a safety culture, including speaking up and involving patients
PRE: Clinical incidents (School 17)
H: Scale and approach
- A significant proportion of hospital admissions involve some harm from care, much of it preventable.
- The **NHS Patient Safety Strategy** (England, 2019) focuses on **insight** (learning from safety events), **involvement** (patients, families and staff, including patient safety partners and patient safety specialists) and **improvement** (programmes on medicines safety, deterioration, maternity and others).
- Other UK nations have their own safety programmes, such as the Scottish Patient Safety Programme.
H: Safety models
- **Swiss cheese model** (Reason): harm occurs when holes in multiple layers of defence line up; latent conditions (system weaknesses) combine with active failures (errors at the sharp end).
- **Safety-I**: learning from what goes wrong, to reduce failures.
- **Safety-II**: learning from what goes right, understanding how people adapt successfully to everyday variability.
- **High reliability organisations** stay preoccupied with failure, defer to expertise, and are sensitive to operations.
H: Types of error
- **Slips and lapses**: execution failures (such as picking up the wrong vial while distracted).
- **Mistakes**: planning failures (wrong decision).
- **Violations**: deliberate deviations from rules, often from workarounds in poorly designed systems.
- Responses differ: system redesign for slips, training for knowledge gaps, and understanding why violations occur.
H: Safety culture
P: A good safety culture is open, just and learning. Staff feel safe to report and speak up; patients and families are listened to; leaders act on concerns. Involving patients (for example in medicines checks and handovers) adds an extra layer of defence.
K: Avoidable harm is common; the NHS strategy focuses on insight, involvement and improvement; use the Swiss cheese model and Safety-II thinking, and build an open, just culture.
!: Responding to every error with retraining or blame. Many errors are slips arising from system design; redesign the system.
T: Swiss cheese model | Reason's model in which harm occurs when weaknesses in several defences align
T: Safety-II | An approach that learns from how things usually go right
T: Latent condition | A hidden weakness in a system that can contribute to harm when combined with other failures
SUM: Avoidable harm is common; the NHS strategy is built on insight, involvement and improvement.
SUM: The Swiss cheese model and Safety-II help understand safety.
SUM: Different error types need different responses; safety culture is open and just.
SRC: NHS England, The NHS Patient Safety Strategy: safer culture, safer systems, safer patients | guidance | 2019 | https://www.england.nhs.uk/patient-safety/the-nhs-patient-safety-strategy/
SRC: Reason J, Human error: models and management, BMJ 320(7237):768–770 | primary | 2000
SRC: Hollnagel E, Wears RL, Braithwaite J, From Safety-I to Safety-II: a white paper | primary | 2015
Q: What are the three themes of the NHS Patient Safety Strategy? | Insight, involvement and improvement.
Q: What is Safety-II? | An approach that learns from how things usually go right.
M1#nursing-u16-18-q1@1: Who developed the Swiss cheese model of accident causation? | James Reason | Florence Nightingale | Geoffrey Rose | Hildegard Peplau | Reason's model shows how layered defences can fail together.
M2#nursing-u16-18-q2@2: A nurse picks up the wrong ampoule because two look identical and she was interrupted. What type of error is this? | A slip, needing system redesign | A deliberate violation | A knowledge-based mistake needing discipline | Not an error | Look-alike packaging and interruptions cause slips; redesign helps.
M2#nursing-u16-18-q3@3: What is a latent condition? | A hidden system weakness that can contribute to harm | An error made by a nurse at the bedside | A patient's underlying medical diagnosis | A type of high-risk medicine on the ward | Latent conditions lie dormant until combined with active failures.
MS2#nursing-u16-18-q4@2: Which support a positive safety culture? | Staff feeling safe to report ; Listening to patients and families ; Leaders acting on concerns | Blaming individuals for slips ; Discouraging incident reports | Open, just cultures improve safety.

## Human factors
S: Human factors (ergonomics) is the science of designing systems, equipment and tasks around how people actually work. It treats error as a predictable result of system design rather than a personal failing.
O: Explain human factors and the systems approach to safety
O: Apply the SEIPS model to analyse work systems
O: Use design, standardisation and checklists to reduce error
PRE: Patient safety
H: What human factors means
- The study of interactions between people, the tasks they do, the tools and technology they use, and the environments and organisations they work in.
- Aims to optimise both **wellbeing** and **system performance**.
- Recognises human limits: memory, attention, fatigue, stress and the effect of interruptions.
H: The SEIPS model
- **Systems Engineering Initiative for Patient Safety**: the **work system** (person, tasks, tools and technology, physical environment, organisation, and external environment) shapes **processes** (care and other work), which produce **outcomes** for patients, staff and organisations.
- SEIPS helps teams analyse incidents and design changes that address the whole system.
H: Designing for safety
- **Hierarchy of controls**: stronger interventions remove or design out hazards (forcing functions, such as connectors that can't fit the wrong route); weaker ones rely on people (training, policies, warnings).
- **Standardisation**: common equipment, layouts and processes reduce cognitive load.
- **Checklists**: such as the WHO Surgical Safety Checklist, which supports communication and catches omissions when used properly.
- **Usability**: involve users in choosing and testing equipment and software.
- **Reducing interruptions**: protected medicine rounds and "do not disturb" tabards.
H: Fatigue and wellbeing
P: Long shifts, missed breaks and night work impair performance. Breaks, rest and manageable workload are safety measures, not luxuries. Organisations should design rotas and environments with this in mind.
K: Human factors designs work around people; use SEIPS to analyse systems, prefer strong design-based controls, and use checklists and standardisation.
!: Relying on "be more careful" or retraining as the main fix. Stronger system design changes are more effective.
T: Human factors | The science of designing systems, tasks and equipment around human capabilities and limits
T: SEIPS | A model linking the work system to care processes and outcomes
T: Forcing function | A design feature that makes an error impossible or very difficult
SUM: Human factors treats error as a product of system design.
SUM: SEIPS links work system, processes and outcomes.
SUM: Design-based controls, standardisation and checklists reduce error more than reminders.
SRC: Carayon P and others, Work system design for patient safety: the SEIPS model, Quality and Safety in Health Care 15(suppl 1):i50–i58 | primary | 2006
SRC: Clinical Human Factors Group, What is human factors? | guidance | 2023 | https://chfg.org/
SRC: World Health Organization, WHO Surgical Safety Checklist | guidance | 2009 | https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery
Q: What does SEIPS stand for? | Systems Engineering Initiative for Patient Safety.
Q: What is a forcing function? | A design feature that makes an error impossible or very difficult.
M1#nursing-u16-19-q1@1: What is the main focus of human factors? | Designing systems around human limits | Blaming individuals for errors | Increasing staff workload safely | Reducing staffing to cut costs | Human factors shapes systems to fit people.
M3#nursing-u16-19-q2@3: Which is the strongest intervention to prevent oral medicines being given intravenously? | IV-incompatible oral syringes | A warning poster in the clinic room | An email reminder to all staff | Annual medicines safety training | Incompatible connectors are a forcing function that design out the error, unlike posters or training.
M2#nursing-u16-19-q3@2: In the SEIPS model, what does the work system shape? | Care processes, which drive outcomes | Staff pay and conditions only | Building design and layout only | Patients' underlying diagnoses | The work system drives processes and outcomes.
TF2#nursing-u16-19-q4@1: Breaks and manageable workload are safety measures. | True | Fatigue impairs performance and increases error.

## Leadership
S: Leadership is about influencing and supporting others towards shared goals. Every nurse leads, whether coordinating a shift, guiding a student or advocating for a patient, and the style of leadership affects culture and care quality.
O: Compare leadership theories and styles
O: Describe compassionate and collective leadership in the NHS
O: Apply the Healthcare Leadership Model to personal development
PRE: Teamwork
H: Theories and styles
- **Trait and behavioural theories**: early approaches focused on characteristics and behaviours.
- **Situational leadership**: adapting style to the team member's competence and commitment (directing, coaching, supporting, delegating).
- **Transactional leadership**: exchanges, rewards and corrective action; good for routine tasks.
- **Transformational leadership**: inspiring vision, intellectual stimulation, individual consideration and role modelling.
- **Authentic** and **servant leadership**: values, integrity and serving the team.
- Autocratic, democratic and laissez-faire styles each fit different situations (such as a directive style in a cardiac arrest).
H: Compassionate and collective leadership
- **Compassionate leadership** (West): attending, understanding, empathising and helping team members.
- Linked to better staff wellbeing, engagement and patient care.
- **Collective leadership**: leadership is shared across the team rather than resting with one person.
H: The Healthcare Leadership Model
- Developed by the NHS Leadership Academy, with nine dimensions: inspiring shared purpose, leading with care, evaluating information, connecting our service, sharing the vision, engaging the team, holding to account, developing capability, and influencing for results.
- Useful for self-assessment and development planning.
H: Leadership in practice
P: Nurses lead by role modelling, speaking up for patients, supporting colleagues and driving improvements. The NMC Code expects nurses to provide leadership to ensure people's wellbeing is protected and to improve their experiences of care.
K: Choose leadership styles to fit the situation, practise compassionate and collective leadership, and use the Healthcare Leadership Model to develop.
!: Thinking leadership belongs only to managers. Every nurse leads in day-to-day practice.
T: Transformational leadership | Leadership that inspires and motivates through vision and individual support
T: Compassionate leadership | Leadership based on attending, understanding, empathising and helping
T: Situational leadership | Adapting leadership style to the needs of the person and task
SUM: Leadership styles include transactional, transformational and situational approaches.
SUM: Compassionate and collective leadership improve culture and care.
SUM: The Healthcare Leadership Model supports development.
SRC: West M, Compassionate Leadership: sustaining wisdom, humanity and presence in health and social care, Swirling Leaf Press | secondary | 2021
SRC: NHS Leadership Academy, Healthcare Leadership Model | guidance | 2013 | https://www.leadershipacademy.nhs.uk/resources/healthcare-leadership-model/
SRC: Nursing and Midwifery Council, The Code: professional standards of practice and behaviour for nurses, midwives and nursing associates | regulation | 2018 | https://www.nmc.org.uk/standards/code/
Q: What are the four behaviours of compassionate leadership? | Attending, understanding, empathising and helping.
Q: What is situational leadership? | Adapting leadership style to the needs of the person and task.
M1#nursing-u16-20-q1@1: Which leadership style inspires through vision and individual consideration? | Transformational | Laissez-faire | Transactional only | Autocratic | Transformational leaders inspire and motivate.
M2#nursing-u16-20-q2@2: Which leadership style best suits leading a cardiac arrest? | Directive, with clear roles | Laissez-faire | Lengthy consensus | Delegating everything | In emergencies a directive style with clear roles works best because decisions must be fast.
M2#nursing-u16-20-q3@3: A ward manager listens to staff concerns, tries to understand them and helps remove obstacles. Which approach is this? | Compassionate leadership | Transactional leadership | Autocratic leadership | Laissez-faire leadership | Attending, understanding and helping define compassionate leadership.
TF2#nursing-u16-20-q4@1: Only managers are leaders in nursing. | False | Every nurse shows leadership in practice.

## Management
S: Management is about planning, organising and controlling resources to deliver safe, effective care. Ward and team managers handle staffing, rotas, budgets and performance, and safe staffing is central to patient safety.
O: Distinguish management from leadership
O: Describe safe staffing principles, tools and legislation across the UK
O: Apply management skills in rostering, resources and performance
PRE: Leadership
H: Management and leadership
- **Management**: planning, organising, staffing, budgeting and controlling, focused on stability and delivery.
- **Leadership**: direction, vision and change.
- Effective nurse managers need both.
H: Safe staffing
- Staffing levels and skill mix affect patient outcomes, including mortality and missed care.
- **NICE SG1** (2014) on safe staffing for adult acute wards highlights red flag events (such as delays in pain relief or missed vital signs) that should prompt a response.
- **Safer Nursing Care Tool**: an evidence-based tool for assessing patient acuity and dependency to inform establishment setting.
- **Nurse Staffing Levels (Wales) Act 2016**: places duties on health boards to calculate and maintain nurse staffing levels in specified settings.
- **Health and Care (Staffing) (Scotland) Act 2019**: places duties on health and care services to ensure appropriate staffing.
- In England, the **National Quality Board** guidance sets expectations; boards review staffing regularly.
H: Day-to-day management
- **Rostering**: fair, safe rotas with appropriate skill mix; e-rostering systems; avoid excessive consecutive long shifts.
- **Budgets**: understanding establishment, temporary staffing spend and resources.
- **Performance**: appraisal, objectives, supporting development and addressing concerns fairly.
- **Escalation**: when staffing is unsafe, report, escalate and record, using incident systems.
H: Managing yourself and your time
P: Prioritisation, delegation and time management apply at every level. Managers model wellbeing practices such as taking breaks.
K: Management plans and organises resources; safe staffing relies on acuity tools, red flags and, in Wales and Scotland, legislation; escalate unsafe staffing.
!: Accepting unsafe staffing without escalation. Report it and record the impact on care.
T: Skill mix | The combination of grades and roles in a team
T: Safer Nursing Care Tool | An evidence-based tool measuring patient acuity and dependency to inform staffing
T: Red flag event | An event that should prompt an immediate staffing response, such as missed vital signs
SUM: Management focuses on planning, organising and controlling resources.
SUM: Safe staffing uses acuity tools, red flags and, in Wales and Scotland, legislation.
SUM: Escalate and record unsafe staffing.
SRC: National Institute for Health and Care Excellence, Safe staffing for nursing in adult inpatient wards in acute hospitals (SG1) | guidance | 2014 | https://www.nice.org.uk/guidance/sg1
SRC: Nurse Staffing Levels (Wales) Act 2016 | legislation | 2016 | https://www.legislation.gov.uk/anaw/2016/5
SRC: Health and Care (Staffing) (Scotland) Act 2019 | legislation | 2019 | https://www.legislation.gov.uk/asp/2019/6
Q: What is skill mix? | The combination of grades and roles in a team.
Q: Which UK nation has a Nurse Staffing Levels Act from 2016? | Wales.
M1#nursing-u16-21-q1@1: Which tool assesses acuity and dependency to inform ward staffing? | Safer Nursing Care Tool | Waterlow risk score | MUST screening tool | AUDIT-C questionnaire | The Safer Nursing Care Tool measures acuity and dependency to inform ward establishment setting.
M2#nursing-u16-21-q2@2: Under NICE SG1, which is a nursing red flag event? | Missed vital signs observations | A patient going home | A planned admission | A staff training day | Red flags signal staffing problems affecting care.
M2#nursing-u16-21-q3@3: A nurse in charge has too few staff for patient acuity. What should they do? | Escalate, report it and record the impact on care | Say nothing and cope | Leave patients unassessed without telling anyone | Send staff home | Unsafe staffing must be escalated, reported through incident systems and its impact on care recorded.
MATCH2#nursing-u16-21-q4@2: Match each nation to its staffing legislation or guidance. | Wales = Nurse Staffing Levels (Wales) Act 2016 ; Scotland = Health and Care (Staffing) (Scotland) Act 2019 ; England = National Quality Board guidance | Staffing frameworks differ across the UK.

## Teamwork
S: Healthcare is delivered by teams, and how well they work together affects safety and outcomes. Understanding team development, roles and psychological safety helps nurses build effective teams.
O: Describe stages of team development and team roles
O: Explain psychological safety and its effect on learning and safety
O: Apply strategies to build effective multidisciplinary teamwork
PRE: Communication (School 2)
H: Team development
- **Tuckman**: forming, storming, norming, performing (and later adjourning).
- Teams change often in healthcare, with rotating staff, so teams frequently "re-form".
- **Teaming** (Edmondson): working together effectively in fluid, temporary groups.
H: Team roles
- **Belbin** described team roles (such as coordinator, plant, implementer, completer-finisher, team worker and specialist); balanced teams draw on different strengths.
- In clinical teams, clear roles and responsibilities (especially in emergencies) reduce confusion.
H: Psychological safety
- **Edmondson**: a shared belief that the team is safe for interpersonal risk-taking, such as asking questions, admitting mistakes or raising concerns.
- Linked to learning, error reporting and better performance.
- Leaders build it by inviting input, responding appreciatively, and framing work as learning.
H: Effective teams
- Shared goals, clear roles, good communication (briefings, huddles and debriefs), mutual respect, trust and constructive conflict resolution.
- Civility matters: rudeness reduces performance and information sharing.
- Multidisciplinary team meetings bring together different expertise for complex decisions.
K: Teams develop through stages, benefit from balanced roles, and perform best with psychological safety, clear communication and civility.
!: Assuming silence means agreement. Low psychological safety stops people raising concerns.
T: Psychological safety | A shared belief that it's safe to take interpersonal risks in a team
T: Tuckman's stages | Forming, storming, norming and performing
T: Huddle | A short, focused team meeting to share information and plan
SUM: Tuckman describes team development; Belbin describes team roles.
SUM: Psychological safety supports learning and speaking up.
SUM: Effective teams share goals, communicate well and treat each other with civility.
SRC: Tuckman BW, Developmental sequence in small groups, Psychological Bulletin 63(6):384–399 | primary | 1965
SRC: Edmondson A, Psychological safety and learning behavior in work teams, Administrative Science Quarterly 44(2):350–383 | primary | 1999
SRC: Belbin RM, Management Teams: why they succeed or fail, Butterworth-Heinemann | secondary | 1981
Q: What are Tuckman's four original stages? | Forming, storming, norming and performing.
Q: What is psychological safety? | A shared belief that it's safe to take interpersonal risks in a team.
M1#nursing-u16-22-q1@1: Who described psychological safety in work teams? | Amy Edmondson | Bruce Tuckman | James Reason | Michael Marmot | Edmondson linked psychological safety to team learning.
M2#nursing-u16-22-q2@2: A new team is arguing over roles and approaches. Which Tuckman stage is this? | Storming | Forming | Norming | Performing | Storming involves conflict as roles are established.
M3#nursing-u16-22-q3@3: Junior staff on a unit rarely raise concerns at handover. What should the nurse leader do first? | Invite input and respond appreciatively when concerns are raised | Assume they have no concerns | Criticise those who speak up | Shorten handovers | Leaders build psychological safety through their responses.
TF2#nursing-u16-22-q4@3: Rudeness in teams can reduce clinical performance. | True | Incivility affects information sharing and performance.

## Delegation
S: Delegation transfers responsibility for a task to another person while the delegator stays accountable for the decision to delegate. Nurses delegate to nursing associates, healthcare support workers and students every shift.
O: Apply principles of safe delegation, including the "rights" of delegation
O: Describe the scope of nursing associates and support workers
O: Monitor delegated tasks and manage when delegation isn't appropriate
PRE: Professional accountability (School 7)
H: Principles
- Delegation must be **in the person's best interests** and the task must be appropriate.
- The person receiving the task must be **competent** and willing, with suitable training.
- The delegator remains **accountable for the decision to delegate**; the person accepting is accountable for carrying out the task competently.
- Provide clear instructions and **appropriate supervision**, and check the outcome.
- The NMC Code requires nurses to delegate only tasks within the other person's scope of competence and to confirm outcomes meet required standards.
H: The rights of delegation
- Right **task**, right **circumstances**, right **person**, right **directions and communication**, and right **supervision and evaluation**.
H: Roles
- **Nursing associates**: NMC-registered, working within their own proficiency standards; they deliver and monitor care but don't hold the same assessment and care planning responsibilities as registered nurses.
- **Healthcare support workers**: unregistered; guided by the Care Certificate and local competencies.
- **Students**: work under supervision according to their stage and learning.
H: When not to delegate
- When the patient is unstable or the situation is complex and needs registered nurse judgement.
- When the person isn't trained or competent, or the task needs ongoing assessment.
- When local policy doesn't allow it.
K: Delegate the right task to the right competent person with clear directions and supervision; you stay accountable for the decision and must check outcomes.
!: Delegating a task and never checking the outcome. Monitoring and evaluation are part of delegation.
T: Delegation | Transferring responsibility for a task to another person while retaining accountability for the decision
T: Nursing associate | An NMC-registered role bridging support workers and registered nurses
T: Care Certificate | A set of standards for the induction of healthcare support workers
SUM: The delegator remains accountable for the decision; the delegatee for performance.
SUM: Use the rights of delegation: task, circumstances, person, directions and supervision.
SUM: Don't delegate tasks needing registered nurse judgement or beyond competence.
SRC: Royal College of Nursing, Accountability and delegation: a guide for the nursing team | guidance | 2023 | https://www.rcn.org.uk/Professional-Development/Accountability-and-delegation
SRC: Nursing and Midwifery Council, The Code, section 11 | regulation | 2018 | https://www.nmc.org.uk/standards/code/
SRC: Nursing and Midwifery Council, Standards of proficiency for nursing associates | regulation | 2024 | https://www.nmc.org.uk/standards/standards-for-nursing-associates/
Q: Who is accountable for the decision to delegate? | The person delegating.
Q: What is the Care Certificate? | A set of standards for the induction of healthcare support workers.
M1#nursing-u16-23-q1@1: Which is one of the rights of delegation? | The right person | The right uniform | The right pay grade only | The right time of year | The right person must be competent for the task.
M3#nursing-u16-23-q2@3: A patient's condition is unstable and needs ongoing assessment. Should the nurse delegate their observations to a new support worker? | No; ongoing assessment needs registered nurse judgement | Yes, as observations are always delegable | Yes, without any checks | Yes, but only at night | Unstable patients need registered nurse assessment.
M2#nursing-u16-23-q3@2: A support worker reports a task done but the nurse hasn't checked it. Which part of delegation is missing? | Supervising and checking the outcome | Choosing an appropriate task | Giving clear instructions first | Selecting a competent person | Delegators must confirm outcomes meet standards.
MS2#nursing-u16-23-q4@1: Which should a nurse confirm before delegating? | The person is competent ; The task is appropriate ; Clear instructions are given | The person has the most free time ; The task is unpleasant | Safe delegation checks competence, task and communication.

## Supervision
S: Clinical supervision and preceptorship support practitioners to reflect, learn and stay well. Good supervision improves care quality and staff retention, and supervising students is a core registered nurse responsibility.
O: Describe models of clinical supervision, including Proctor's model and A-EQUIP
O: Explain preceptorship for newly registered practitioners
O: Describe roles in student supervision and assessment under NMC standards
PRE: Reflective practice (School 7)
H: Clinical supervision
- A formal process of professional support and learning, separate from line management.
- **Proctor's model** has three functions: **normative** (standards and accountability), **formative** (learning and skills) and **restorative** (support and wellbeing).
- Can be one-to-one or group, regular and protected.
H: A-EQUIP
- An NHS England model (originally for midwives) with the **Professional Nurse Advocate** (PNA) programme for nurses.
- PNAs offer **restorative clinical supervision** and support quality improvement and professional development.
- Components include monitoring, evaluation and quality control; personal action for quality improvement; education and development; and restorative clinical supervision.
H: Preceptorship
- A period of structured support for newly registered practitioners as they move from student to registrant.
- The **NMC Principles for preceptorship** (2022) set expectations: organisational culture, quality and oversight, the preceptee, the preceptor, and the preceptorship programme.
- Includes a named preceptor, protected time, learning objectives and regular reviews; in England a National Preceptorship Framework supports consistency.
H: Supervising students
- The **NMC Standards for student supervision and assessment** separate roles: **practice supervisors** (any registered health or social care professional who supports learning), **practice assessors** (registered nurses who assess practice and confirm proficiency) and **academic assessors** (who work with practice assessors at progression points).
- Supervisors give feedback and contribute to assessment; the practice assessor and academic assessor must be different people.
K: Use clinical supervision (normative, formative and restorative functions), access PNAs and preceptorship, and understand supervisor and assessor roles for students.
!: Treating clinical supervision as performance management. It is protected, supportive reflection separate from line management.
T: Clinical supervision | A formal process of professional support and learning in practice
T: Professional Nurse Advocate | A nurse trained to provide restorative clinical supervision under the A-EQUIP model
T: Preceptorship | Structured support for newly registered practitioners
SUM: Proctor's model has normative, formative and restorative functions.
SUM: A-EQUIP and PNAs provide restorative supervision; preceptorship supports new registrants.
SUM: NMC standards define practice supervisor, practice assessor and academic assessor roles.
SRC: Proctor B, Supervision: a co-operative exercise in accountability, in Marken M and Payne M (eds), Enabling and Ensuring | secondary | 1986
SRC: NHS England, Professional nurse advocate A-EQUIP model: a model of clinical supervision for nurses | guidance | 2021 | https://www.england.nhs.uk/publication/professional-nurse-advocate-a-equip-model-a-model-of-clinical-supervision-for-nurses/
SRC: Nursing and Midwifery Council, Principles for preceptorship | regulation | 2022 | https://www.nmc.org.uk/standards/guidance/preceptorship/
SRC: Nursing and Midwifery Council, Standards for student supervision and assessment | regulation | 2023 | https://www.nmc.org.uk/standards/standards-for-post-registration/standards-for-student-supervision-and-assessment/
Q: What are the three functions in Proctor's model? | Normative, formative and restorative.
Q: What does a Professional Nurse Advocate provide? | Restorative clinical supervision and support for quality improvement.
M1#nursing-u16-24-q1@1: Which function of Proctor's model focuses on support and wellbeing? | Restorative | Normative | Formative | Summative | The restorative function supports wellbeing.
M2#nursing-u16-24-q2@2: Who confirms a nursing student's proficiency in practice? | The practice assessor | Any healthcare assistant | The patient | The ward clerk | Practice assessors assess and confirm proficiency.
M3#nursing-u16-24-q3@3: A newly registered nurse feels overwhelmed after a difficult shift. Which support is most appropriate? | Their preceptor, with access to restorative supervision such as a PNA | A disciplinary meeting | Waiting until annual appraisal | Leaving the profession | Preceptorship and restorative supervision support new registrants.
TF2#nursing-u16-24-q4@2: The practice assessor and academic assessor for a student can be the same person. | False | NMC standards require them to be different people.

## Service improvement
S: Service improvement means redesigning how care is delivered so it works better for patients and staff. Change is as much about people as processes, so change management theories help nurses plan, lead and sustain improvements.
O: Apply change management models such as Lewin and Kotter
O: Explain how innovations spread, using diffusion of innovations theory
O: Plan for engagement, resistance and sustainability in service change
PRE: Quality improvement
H: Change models
- **Lewin's three-step model**: **unfreeze** (create readiness, show why change is needed), **change** (move to new ways of working), **refreeze** (embed and stabilise).
- **Lewin's force field analysis**: identify driving and restraining forces, and strengthen drivers or reduce restraints.
- **Kotter's eight steps**: create urgency, build a guiding coalition, form a vision, communicate it, empower action and remove barriers, generate short-term wins, sustain acceleration, and anchor changes in culture.
H: Diffusion of innovations
- **Rogers**: adopters fall into **innovators**, **early adopters**, **early majority**, **late majority** and **laggards**.
- Innovations spread faster when they have **relative advantage**, **compatibility**, low **complexity**, **trialability** and **observability**.
- Engage early adopters and opinion leaders to influence others.
H: Engagement and resistance
- Involve patients, carers and staff from the start; co-design services with people who use them.
- Resistance often reflects legitimate concerns (workload, safety, loss of valued practice); listen and adapt.
- Use stakeholder mapping to understand influence and interest.
H: Sustainability
P: Many improvements fade once attention moves on. Build changes into systems, documentation and routines; measure over time; and plan for staff turnover. The NHS Sustainability Model highlights process, staff and organisational factors.
K: Plan change with Lewin and Kotter, use diffusion of innovations to spread it, engage people and listen to resistance, and design for sustainability.
!: Dismissing resistance as obstruction. It often signals real concerns that improve the change.
T: Force field analysis | Identifying the driving and restraining forces acting on a change
T: Early adopters | People who take up innovations soon after innovators and influence others
T: Co-design | Designing services in partnership with people who use and deliver them
SUM: Lewin's model unfreezes, changes and refreezes.
SUM: Kotter's eight steps guide large-scale change.
SUM: Rogers' diffusion theory explains how innovations spread; sustainability needs planning.
SRC: Lewin K, Frontiers in group dynamics, Human Relations 1(1):5–41 | primary | 1947
SRC: Kotter JP, Leading Change, Harvard Business School Press | secondary | 1996
SRC: Rogers EM, Diffusion of Innovations, 5th edition, Free Press | secondary | 2003
Q: What are the three steps of Lewin's change model? | Unfreeze, change and refreeze.
Q: What does force field analysis identify? | Driving and restraining forces acting on a change.
M1#nursing-u16-25-q1@1: Which is the first of Kotter's eight steps? | Create a sense of urgency | Anchor changes in culture | Generate short-term wins | Remove all staff | Kotter begins by creating a sense of urgency so people understand why change is needed.
M2#nursing-u16-25-q2@2: Which characteristic helps an innovation spread quickly? | Trialability | High complexity | Poor compatibility | Hidden results | Being able to try it first encourages adoption.
M2#nursing-u16-25-q3@3: Staff resist a new handover process because they fear it takes longer. What should the nurse leading the change do? | Listen, test timings and adapt | Ignore the concerns and carry on | Discipline the staff who resist | Abandon the change permanently | Resistance often contains useful information.
SEQ1#nursing-u16-25-q4@1: Put Lewin's change stages in order. | Unfreeze ; Change ; Refreeze | Lewin's model moves from unfreezing, through change, to refreezing the new way of working.

## Clinical governance
S: Clinical governance is the framework through which healthcare organisations are accountable for continuously improving quality and safeguarding high standards of care. It brings together activities that every nurse contributes to.
O: Define clinical governance and describe its origins
O: Describe the main components of clinical governance
O: Explain the nurse's role in governance and regulation
PRE: Clinical audit
H: Origins and definition
- Introduced in the NHS in the late 1990s after high-profile failures in care.
- **Scally and Donaldson (1998)** defined it as "a system through which NHS organisations are accountable for continuously improving the quality of their services and safeguarding high standards of care by creating an environment in which excellence in clinical care will flourish".
H: Components (often called the pillars)
- **Clinical effectiveness**: evidence-based practice and guidelines.
- **Clinical audit**: measuring against standards.
- **Risk management**: identifying and reducing risks, incident reporting and learning.
- **Education and training**: competence and continuing development.
- **Patient and public involvement**: experience, feedback and complaints.
- **Information** and **staffing and staff management** are also commonly included.
- Openness and transparency run through all of them.
H: Structures
- Board-level accountability, quality and safety committees, ward-to-board reporting, and quality dashboards.
- External regulation: the **CQC** in England, **Healthcare Inspectorate Wales**, **Healthcare Improvement Scotland**, and the **RQIA** in Northern Ireland.
- Professional regulation through the **NMC**, including revalidation.
H: The nurse's role
P: Nurses contribute by following evidence-based practice, reporting incidents, taking part in audit and QI, responding to complaints, maintaining competence, keeping accurate records, and raising concerns. Governance is everyday practice, not just committees.
K: Clinical governance makes organisations accountable for quality through effectiveness, audit, risk management, education, involvement and information; every nurse contributes.
!: Thinking clinical governance is just a committee activity. It is built from everyday practice.
T: Clinical governance | A framework making organisations accountable for continuously improving care quality
T: Ward to board | Reporting that links frontline quality data to board-level oversight
T: Revalidation | The NMC process by which nurses renew registration every three years
SUM: Clinical governance was introduced in the late 1990s.
SUM: Its pillars include effectiveness, audit, risk management, education and involvement.
SUM: Regulators and boards oversee quality; nurses contribute daily.
SRC: Scally G, Donaldson LJ, Clinical governance and the drive for quality improvement in the new NHS in England, BMJ 317(7150):61–65 | primary | 1998
SRC: Care Quality Commission, Single assessment framework | regulation | 2024 | https://www.cqc.org.uk/assessment/single-assessment-framework
SRC: Nursing and Midwifery Council, Revalidation | regulation | 2019 | https://www.nmc.org.uk/revalidation/
Q: Who defined clinical governance in 1998? | Scally and Donaldson.
Q: How often do nurses revalidate with the NMC? | Every three years.
M1#nursing-u16-26-q1@1: Which is a pillar of clinical governance? | Risk management | Car parking | Catering contracts | Building maintenance | Risk management sits alongside effectiveness, audit, education and involvement as a governance pillar.
M2#nursing-u16-26-q2@2: Which body regulates health services in Wales? | Healthcare Inspectorate Wales | The CQC | The RQIA | Healthcare Improvement Scotland | Healthcare Inspectorate Wales regulates services in Wales; the CQC covers England only.
M2#nursing-u16-26-q3@3: How does a staff nurse contribute to clinical governance? | Reporting incidents and taking part in audit | Only by attending board meetings | By avoiding complaints | By ignoring guidelines | Governance is built from everyday practice.
MATCH2#nursing-u16-26-q4@2: Match each regulator to its nation. | CQC = England ; RQIA = Northern Ireland ; Healthcare Improvement Scotland = Scotland | Regulation is devolved across the UK.

## Risk management
S: Risk management is the systematic identification, assessment and control of risks to patients, staff and organisations. It ranges from individual clinical risk assessments to organisational risk registers.
O: Describe the risk management process
O: Score risks using a likelihood and consequence matrix
O: Use risk registers and proactive tools such as FMEA
PRE: Clinical governance
H: The process
- **Identify** hazards (from incidents, audits, complaints, inspections and frontline concern).
- **Assess** the risk: likelihood and consequence.
- **Control**: eliminate, reduce, transfer or accept, using the strongest feasible controls.
- **Monitor and review**: check controls work and update the assessment.
- **Communicate**: share risks with those who need to know and escalate when needed.
H: Risk scoring
- A common **5×5 matrix** scores likelihood (1 rare to 5 almost certain) and consequence (1 negligible to 5 catastrophic).
- Risk score = likelihood × consequence (1 to 25), usually rated as low, moderate, high or extreme.
- Scores guide priority and the level at which the risk is managed.
H: Risk registers
- A record of identified risks, their scores, controls, actions, owners and review dates.
- Risks escalate from ward to directorate to board registers depending on severity.
- The **board assurance framework** links key risks to strategic objectives.
H: Proactive tools
- **Failure modes and effects analysis (FMEA)**: maps a process, identifies how each step could fail, the effects, and prioritises fixes before harm occurs.
- **Clinical risk assessments** (such as falls, pressure ulcers, VTE) apply the same thinking to individual patients.
- Learning from incidents and near misses feeds the cycle.
K: Identify, assess, control, monitor and communicate risks; score with likelihood × consequence; record them on risk registers; use FMEA proactively.
!: Adding a risk to the register and never reviewing it. Registers must show actions, owners and review dates.
T: Risk register | A record of risks with scores, controls, actions, owners and review dates
T: FMEA | Failure modes and effects analysis: a proactive method of identifying how a process could fail
T: Risk score | Likelihood multiplied by consequence
SUM: The risk process identifies, assesses, controls, monitors and communicates.
SUM: A 5×5 matrix scores risks from 1 to 25.
SUM: Risk registers record and escalate risks; FMEA anticipates failure.
SRC: NHS National Patient Safety Agency, A risk matrix for risk managers | guidance | 2008
SRC: Health and Safety Executive, Managing risks and risk assessment at work | guidance | 2023 | https://www.hse.gov.uk/simple-health-safety/risk/
SRC: Institute for Healthcare Improvement, Failure modes and effects analysis (FMEA) tool | guidance | 2017 | https://www.ihi.org/resources/tools/failure-modes-and-effects-analysis-fmea-tool
Q: How is a risk score calculated on a 5×5 matrix? | Likelihood multiplied by consequence.
Q: What is FMEA? | A proactive method of identifying how a process could fail and prioritising fixes.
M1#nursing-u16-27-q1@1: What does a risk register record? | Risks, scores, controls, owners and reviews | Staff annual leave and rota requests | Patient names, addresses and next of kin | Drug prices and pharmacy stock levels | A risk register records each risk with its score, controls, actions, owner and review date.
M2#nursing-u16-27-q2@2: A risk has a likelihood of 4 and consequence of 4. What is its score? | 16 | 8 | 4 | 20 | On a 5×5 matrix the score is likelihood × consequence, so 4 × 4 gives 16, a high risk.
M3#nursing-u16-27-q3@3: A team plans a new insulin process and wants to find weak points before it goes live. Which tool fits? | Failure modes and effects analysis | Root cause analysis after harm | A staff survey on morale | A patient discharge letter | FMEA is proactive: it finds how each step could fail before harm, whereas root cause analysis follows harm.
SEQ2#nursing-u16-27-q4@1: Put the risk management steps in order. | Identify ; Assess ; Control ; Monitor and review | Risks are identified, assessed, controlled and then monitored, with communication throughout.

## Healthcare policy
S: Health policy shapes what services exist, how they are funded and organised, and what nurses are expected to do. Understanding how policy is made helps nurses influence it and adapt to change.
O: Describe how health policy is made and the policy cycle
O: Outline the structure of the NHS across the four UK nations and recent reforms
O: Identify ways nurses can influence policy
PRE: Clinical governance
H: How policy is made
- The **policy cycle**: agenda setting, policy formulation, decision-making, implementation and evaluation.
- Influences: evidence, ideology, public opinion, media, professional bodies, inquiries, economics and interest groups.
- Kingdon's **multiple streams** idea: policy changes when problems, policies and politics align ("policy windows").
H: The NHS across the UK
- Health is **devolved**: England, Scotland, Wales and Northern Ireland each organise their own health services.
- **England**: the **Health and Care Act 2022** created 42 **integrated care systems**, with integrated care boards replacing clinical commissioning groups.
- **Scotland** and **Wales**: integrated health boards plan and deliver care.
- **Northern Ireland**: integrated health and social care trusts.
H: Recent direction (England)
- The **Darzi investigation** (2024) described serious challenges facing the NHS in England, including waiting times and productivity.
- The government's **10 Year Health Plan** (2025) described three shifts: **hospital to community**, **analogue to digital**, and **sickness to prevention**.
- **Check current status**: plans, structures (such as the planned abolition of NHS England) and targets change frequently, so check the latest official sources.
H: Nurses influencing policy
P: Nurses can respond to consultations, join professional bodies and unions such as the RCN, contribute evidence, take part in local governance, and develop in policy roles such as chief nursing officer teams. Patient advocacy at the bedside connects to advocacy at system level.
K: Policy follows a cycle shaped by evidence and politics; health is devolved across the UK; recent English policy emphasises community, digital and prevention; nurses can influence policy.
!: Assuming NHS structures are identical across the UK. Health is devolved and differs between nations.
T: Policy cycle | Agenda setting, formulation, decision-making, implementation and evaluation
T: Integrated care system | A partnership of NHS and local organisations planning services for an area in England
T: Devolution | The transfer of powers, including health, to Scotland, Wales and Northern Ireland
SUM: Policy moves through a cycle shaped by evidence and politics.
SUM: Health is devolved; England uses integrated care systems after the 2022 Act.
SUM: Recent English policy focuses on three shifts; nurses can influence policy.
SRC: Health and Care Act 2022 | legislation | 2022 | https://www.legislation.gov.uk/ukpga/2022/31
SRC: Department of Health and Social Care, Independent investigation of the National Health Service in England (Darzi) | primary | 2024 | https://www.gov.uk/government/publications/independent-investigation-of-the-nhs-in-england
SRC: Department of Health and Social Care, Fit for the future: 10 Year Health Plan for England | primary | 2025 | https://www.gov.uk/government/publications/10-year-health-plan-for-england-fit-for-the-future
SAFE: Health policy and NHS structures change often. Check the latest official sources before relying on details.
Q: Which Act created integrated care boards in England? | The Health and Care Act 2022.
Q: What are the three shifts of the 10 Year Health Plan? | Hospital to community, analogue to digital, and sickness to prevention.
M1#nursing-u16-28-q1@1: Which describes the policy cycle? | Agenda setting, formulation, decision, implementation and evaluation | Assess, plan, implement, evaluate only | Plan, Do, Study, Act | Forming, storming, norming | The policy cycle describes how policy develops.
M2#nursing-u16-28-q2@2: Which body replaced clinical commissioning groups in England? | Integrated care boards | Health boards | Primary care trusts | Strategic health authorities | The Health and Care Act 2022 created ICBs.
M2#nursing-u16-28-q3@3: A nurse wants to influence a proposed national policy. Which is the most direct route? | Respond to the public consultation, alone or via the RCN | Complain on social media only | Ignore it until it's implemented | Refuse to follow it | Public consultations directly seek professional input, and the RCN collates members' views.
TF1#nursing-u16-28-q4@2: Health services are organised identically across all four UK nations. | False | Health is devolved and differs between nations.

## Digital health
S: Digital health uses technology such as electronic records, apps, remote monitoring and artificial intelligence to improve care. Nurses use digital tools daily and need to make sure they are safe, inclusive and well governed.
O: Describe the main digital health technologies used in nursing
O: Explain clinical safety and evaluation standards for digital tools
O: Address digital inclusion and the safe use of artificial intelligence
PRE: Healthcare policy
H: Technologies
- **Electronic patient records (EPR)**: documentation, observations, e-prescribing and decision support.
- **Patient-facing tools**: the NHS App, online consultations and patient portals.
- **Remote monitoring** and **virtual wards**: monitoring people at home with devices and clinical oversight.
- **Telehealth** and video consultations.
- **Artificial intelligence**: decision support, imaging, ambient voice technology for documentation, and predictive tools.
H: Safety and standards (England)
- **DCB0129** (for manufacturers) and **DCB0160** (for health organisations deploying systems) set clinical risk management requirements, with a **clinical safety officer**.
- The **Digital Technology Assessment Criteria (DTAC)** cover clinical safety, data protection, technical security, interoperability, and usability and accessibility.
- Software that meets the definition of a medical device needs regulatory approval (MHRA).
- Data protection law (UK GDPR) applies.
H: Digital inclusion
- Many people lack devices, connectivity, skills or confidence; digital exclusion is more common among older people, disabled people and those on low incomes.
- Offer non-digital alternatives and support; design services that don't widen inequalities.
H: Artificial intelligence
P: AI tools can save time and improve accuracy but can be biased, opaque or wrong. Use only approved tools, check outputs, keep human accountability for decisions, protect data, and tell patients when AI is used in their care where appropriate. Nurses remain accountable under the NMC Code.
K: Digital tools include EPRs, apps, remote monitoring and AI; they must meet clinical safety standards (DCB0129/0160, DTAC); protect inclusion and keep human accountability for AI.
!: Assuming digital-first works for everyone. Offer alternatives and support to avoid widening inequalities.
T: Virtual ward | A service that provides hospital-level monitoring and care at home
T: DCB0160 | The clinical risk management standard for health organisations deploying health IT
T: Digital exclusion | Being unable to use digital services because of lack of access, skills or confidence
SUM: Digital health includes EPRs, apps, remote monitoring and AI.
SUM: Clinical safety standards and DTAC govern digital tools.
SUM: Digital inclusion and human accountability for AI are essential.
SRC: NHS England, Digital Technology Assessment Criteria (DTAC) | guidance | 2024 | https://transform.england.nhs.uk/key-tools-and-info/digital-technology-assessment-criteria-dtac/
SRC: NHS England, DCB0129 and DCB0160 clinical risk management standards | guidance | 2018 | https://digital.nhs.uk/data-and-information/information-standards/
SRC: NHS England, Inclusive digital healthcare: a framework for NHS action on digital inclusion | guidance | 2023 | https://www.england.nhs.uk/long-read/inclusive-digital-healthcare-a-framework-for-nhs-action-on-digital-inclusion/
SAFE: Digital standards and AI guidance change quickly. Check current national and local policy before adopting tools.
Q: What is a virtual ward? | A service that provides hospital-level monitoring and care at home.
Q: Which standard covers clinical risk management for organisations deploying health IT? | DCB0160.
M1#nursing-u16-29-q1@1: Which tool lets patients in England book appointments and view records? | The NHS App | The BNF | The Waterlow score | SBAR | The NHS App is a patient-facing digital tool.
M2#nursing-u16-29-q2@2: Which role oversees clinical risk management for a health IT system? | Clinical safety officer | Ward clerk | Porter | Data entry clerk | DCB standards require a clinical safety officer.
M3#nursing-u16-29-q3@3: An older patient without a smartphone is offered only app-based follow-up. What should the nurse do? | Offer a non-digital alternative and support | Insist they buy a phone | Discharge without follow-up | Record them as non-compliant | Services shouldn't exclude people without digital access.
TF2#nursing-u16-29-q4@3: Nurses remain accountable for decisions supported by AI tools. | True | Human accountability continues under the NMC Code.

## Health informatics
S: Health informatics is the use of information, data and technology to improve health and care. Accurate, coded, shareable data underpin safe care, research and service planning, and nurses generate much of it.
O: Explain clinical coding, terminology and interoperability standards
O: Describe data quality and the uses of health data
O: Describe nursing informatics roles and leadership
PRE: Digital health
H: Terminologies and standards
- **SNOMED CT**: the clinical terminology used in UK health records, so information is coded consistently.
- **dm+d** (Dictionary of medicines and devices): the standard for identifying medicines.
- **ICD-10** and **OPCS-4**: classifications used for hospital diagnosis and procedure coding.
- **NHS number**: the unique identifier that links records safely.
H: Interoperability
- The ability of systems to exchange and use information.
- Standards such as **HL7 FHIR** allow different systems to share structured data.
- Shared care records give clinicians across organisations access to key information.
H: Data quality
- Data should be **accurate**, **complete**, **timely**, **consistent** and **valid**.
- Poor data quality causes harm (such as wrong allergies) and distorts planning and research.
- Nurses improve data quality through accurate, contemporaneous documentation and correct coding at the point of care.
H: Uses of data
- **Direct care**: supporting decisions for the individual.
- **Secondary uses**: service planning, audit, research and population health, subject to governance, the national data opt-out and data protection law.
- Trusted research environments allow analysis without data leaving secure settings.
H: Nursing informatics roles
P: Chief nursing information officers (CNIOs) and digital nurse leaders make sure systems support nursing practice and safety. Every nurse benefits from digital and data skills, and the nursing voice in system design improves usability.
K: Use standard terminologies (SNOMED CT, dm+d) and the NHS number; interoperability standards such as FHIR share data; good data quality supports care, research and planning; nurses lead informatics.
!: Using free text when a coded entry is needed. Uncoded data can't be reliably shared or searched.
T: SNOMED CT | The standard clinical terminology used in UK health records
T: Interoperability | The ability of systems to exchange and use information
T: CNIO | Chief nursing information officer: a nurse leader for digital and informatics
SUM: SNOMED CT, dm+d and the NHS number support consistent, linked records.
SUM: FHIR enables interoperability; data quality underpins safe care and planning.
SUM: Nurses lead and contribute to informatics.
SRC: NHS England, SNOMED CT | guidance | 2024 | https://digital.nhs.uk/services/terminology-and-classifications/snomed-ct
SRC: NHS England, Dictionary of medicines and devices (dm+d) | guidance | 2024 | https://digital.nhs.uk/services/terminology-and-classifications/dictionary-of-medicines-and-devices-dm-d
SRC: HL7 International, FHIR overview | guidance | 2023 | https://hl7.org/fhir/
Q: What is SNOMED CT? | The standard clinical terminology used in UK health records.
Q: What is interoperability? | The ability of systems to exchange and use information.
M1#nursing-u16-30-q1@1: Which unique identifier links a patient's NHS records? | The NHS number | A hospital bed number | A ward phone number | A GP surgery postcode | The NHS number is the unique identifier that safely links a person's records across services.
M2#nursing-u16-30-q2@2: Which standard identifies medicines in NHS systems? | dm+d | SNOMED CT only | OPCS-4 | ICD-10 | The Dictionary of medicines and devices (dm+d) is the NHS standard for identifying medicines.
M2#nursing-u16-30-q3@3: An allergy is recorded only as free text in a note. Why is this a problem? | It may not trigger alerts or be shared | It is always illegal to use free text | It deletes the existing coded record | It automatically becomes a coded entry | Coded entries support alerts and sharing.
MS2#nursing-u16-30-q4@2: Which are dimensions of data quality? | Accuracy ; Completeness ; Timeliness | Length ; Font size | High-quality data are accurate, complete and timely.
`;
