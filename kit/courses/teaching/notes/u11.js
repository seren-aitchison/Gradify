// EduGradify Teaching, School 11: Research Methods. Reused from PsychGradify Psychology School 10 (kit/courses/psychology/notes/u10.js)
// by scripts/borrow-school.mjs on 2026-11-12; question ids are this course's own. Review state as qa.js records.
// School 10: Research Methods. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md), with evidence status
// (EV:) and questions at three levels in every lesson. Worked examples describe invented studies unless a source is
// named. Sources are pending human verification (qa.js). Level: A level to first-year undergraduate.
export default `
## Scientific reasoning in psychology
LV: Introductory · Foundation
S: Scientific reasoning is the way psychologists move from ideas to evidence and back: making claims testable, collecting data systematically and drawing conclusions that go no further than the data allow. This lesson sets out the cycle of scientific reasoning and the most common reasoning errors.
O: Describe the hypothetico-deductive cycle of theory, hypothesis, data and revision
O: Distinguish inductive from deductive reasoning in research
O: Evaluate claims for common reasoning errors, including confirmation bias and overgeneralisation
PRE: Psychology as a science
H: The research cycle
- A **theory** explains a set of observations.
- From the theory, researchers **deduce** a specific, testable **hypothesis**.
- They design a study and **collect data** systematically.
- The data **support** or **fail to support** the hypothesis, and the theory is kept, revised or abandoned.
- New observations prompt new theories (**induction**), and the cycle continues.
P: **Deduction** reasons from a general theory to a specific prediction. **Induction** reasons from specific observations to a general pattern. Science uses both: induction suggests theories; deduction tests them.
X: Testing a theory of memory
> Theory: memories are stronger when information is processed for meaning (levels of processing).
> Hypothesis: people who judge whether words are pleasant will recall more than people who judge whether words are in capitals.
> Data: compare recall in the two conditions.
> Conclusion: if the "pleasant" group recalls more, the theory is supported, not proven; other explanations must still be ruled out.
K: Scientific reasoning tests specific predictions deduced from theory, and treats every conclusion as provisional.
H: Reasoning errors to avoid
P: **Confirmation bias** is looking for, or giving more weight to, evidence that supports what we already believe. **Overgeneralisation** draws broad conclusions from narrow samples. **Confusing correlation with causation** assumes that because two variables go together, one causes the other. Good research design, such as control groups, random allocation and preregistered predictions, is largely a set of defences against these errors.
!: Saying a study "proves" a theory. Evidence supports or fails to support; a later study may overturn it.
EV: established | Confirmation bias affects how people, including scientists, search for and interpret evidence.
EV: contested | How strictly psychology should follow falsificationist reasoning, rather than estimating effects, is debated.
T: Deduction | Reasoning from a general theory to a specific, testable prediction
T: Induction | Reasoning from specific observations to a general pattern or theory
T: Confirmation bias | The tendency to seek or favour evidence that supports existing beliefs
SUM: Research cycles between theory, hypothesis, data and revision, using deduction and induction.
SUM: Design features such as controls and preregistration protect against reasoning errors.
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.1 "Why is research important?" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-1-why-is-research-important
SRC: Nickerson R. S., "Confirmation bias: a ubiquitous phenomenon in many guises", Review of General Psychology 2(2):175–220 | primary | 1998 | https://doi.org/10.1037/1089-2680.2.2.175
Q: What is the difference between deduction and induction? | Deduction reasons from a general theory to a specific prediction; induction from specific observations to a general pattern.
Q: What is confirmation bias? | Seeking or favouring evidence that supports what we already believe.
M1#teaching-u11-13-q1@1: Deriving a specific prediction from a general theory is… | Deduction | Induction | Replication | Operationalisation | Deduction moves from the general to the specific.
M2#teaching-u11-13-q2@2: A researcher only reports the three participants whose results fit her theory. Which error is this? | Confirmation bias | Random allocation | Induction | Counterbalancing | Selecting supportive evidence is confirmation bias, here as selective reporting.
TF2#teaching-u11-13-q3@3: A single study whose results fit a hypothesis proves the theory behind it. | false | It supports the theory; other explanations and future studies may challenge it.
M3#teaching-u11-13-q4@3: Which design feature best protects against confirmation bias in analysis? | Preregistering predictions and analyses | Using a bigger font in questionnaires | Testing only people who agree | Analysing data before deciding the hypothesis | Committing to predictions and analyses in advance limits choosing results that fit.
SA3#teaching-u11-13-q5@2,3: Explain the hypothetico-deductive cycle using an example, and identify one reasoning error it is designed to prevent. | Theory (levels of processing) leads to a hypothesis (meaning-based processing improves recall); data are collected; results support or fail to support; theory is revised. Controls and preregistration guard against confirmation bias and against confusing correlation with causation. | Theory ; Hypothesis ; Data and conclusion ; Revision ; Reasoning error and protection

## Research questions and hypotheses
LV: Introductory · Foundation
S: A good study starts with a clear research question and a precise hypothesis. This lesson explains how to turn a topic into a question, and how to write directional, non-directional and null hypotheses.
O: Distinguish aims, research questions and hypotheses
O: Write directional, non-directional and null hypotheses for a study
O: Justify the choice between a directional and a non-directional hypothesis
PRE: Scientific reasoning in psychology
H: From topic to hypothesis
P: An **aim** is a general statement of what the study investigates ("to investigate the effect of sleep on memory"). A **research question** asks something specific ("Does a night without sleep reduce word recall?"). A **hypothesis** is a precise, testable prediction about the relationship between variables.
H: Types of hypothesis
- **Directional (one-tailed)**: predicts the direction of a difference or relationship ("Participants deprived of sleep will recall fewer words than those who slept").
- **Non-directional (two-tailed)**: predicts a difference or relationship without direction ("There will be a difference in recall between sleep-deprived and rested participants").
- **Null hypothesis**: predicts no difference or relationship ("There will be no difference in recall…"). Statistical tests assess the evidence against the null.
P: A directional hypothesis is justified when previous research or theory clearly points one way; otherwise a non-directional hypothesis is safer.
X: Writing hypotheses for a caffeine study
> Directional: participants who drink 200 mg of caffeine will have faster mean reaction times than those who drink a placebo.
> Non-directional: there will be a difference in mean reaction times between the caffeine and placebo conditions.
> Null: there will be no difference in mean reaction times between the two conditions.
P: **Investigate with the lab.** Write a directional and a non-directional hypothesis for one study in the builder.
K: A hypothesis is a precise, testable prediction naming the variables and, if justified by previous research, the direction of the effect.
!: Writing vague hypotheses such as "caffeine affects people". A hypothesis must name the operationalised variables and the predicted relationship.
EV: established | Hypotheses must be specific and testable to be evaluated with data.
EV: contested | Whether psychologists should rely on null hypothesis testing or estimate effect sizes instead is debated (see School 11).
T: Directional hypothesis | A prediction that states the direction of a difference or relationship
T: Null hypothesis | A prediction that there is no difference or relationship
SUM: Aims, questions and hypotheses move from general to specific.
SUM: Directional hypotheses need justification from previous research; the null hypothesis is what tests assess.
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.1 "Why is research important?" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-1-why-is-research-important
SRC: Coolican H., Research Methods and Statistics in Psychology, 7th edition, Routledge | secondary | 2019
Q: What is a null hypothesis? | A prediction that there is no difference or relationship between the variables.
Q: When is a directional hypothesis justified? | When previous research or theory clearly predicts the direction of the effect.
M1#teaching-u11-14-q1@1: "There will be a difference in anxiety scores between two groups" is a… | Non-directional hypothesis | Directional hypothesis | Null hypothesis | Research aim | It predicts a difference without saying which group will score higher.
M2#teaching-u11-14-q2@2: Several studies show exercise improves mood. Which hypothesis suits a new study? | Exercisers will report higher mood than non-exercisers | Exercise will affect mood somehow | There may or may not be an effect of exercise | Mood is important for everyone | Consistent previous findings justify a directional, operationalised prediction.
MATCH1#teaching-u11-14-q3@1: Match each statement to its type. | There will be no relationship between age and reaction time = Null hypothesis ; Older people will react more slowly = Directional hypothesis ; Age will be related to reaction time = Non-directional hypothesis ; To investigate age and reaction time = Aim | Aims are general; hypotheses are testable predictions.
M3#teaching-u11-14-q4@3: Why is a non-directional hypothesis sometimes preferred? | It can detect an effect in either direction | It always gives more significant results | It is easier to write than a directional one | It avoids the need for a null hypothesis | With no clear previous direction, a two-tailed test can detect effects either way.
SA2#teaching-u11-14-q5@2,3: Write a directional, a non-directional and a null hypothesis for a study of music and concentration, and justify which you would use. | Directional: students revising in silence will score higher on a comprehension test than students revising with lyrical music. Non-directional: there will be a difference in comprehension scores between the conditions. Null: there will be no difference. Justification depends on previous research; if evidence consistently shows lyrical music impairs comprehension, use the directional hypothesis. | Directional ; Non-directional ; Null ; Operationalised variables ; Justification
M2#teaching-u11-14-q6@1: What does a directional hypothesis do? | Predicts the direction of the effect | Predicts that there will be no effect | Predicts any difference without saying which way | Describes the sample | A directional, one-tailed hypothesis states which way the difference will go.

## Operationalisation
LV: Introductory · Application
S: Operationalisation turns an abstract concept, such as stress or aggression, into something that can be measured. This lesson explains how to operationalise variables well and why the choice of measure affects what a study can conclude.
O: Define operationalisation and give examples
O: Operationalise abstract variables for a study
O: Evaluate operational definitions for validity and reliability
PRE: Research questions and hypotheses
H: From concept to measure
P: Psychology studies concepts that can't be seen directly: intelligence, anxiety, memory, aggression. To study them, researchers give each an **operational definition**: a precise statement of how it will be measured or manipulated. "Stress" might be operationalised as a score on the Perceived Stress Scale, as salivary cortisol, or as heart rate during a task.
H: What makes a good operationalisation
- It is **precise**: anyone could repeat it exactly.
- It is **valid**: it captures the concept, not something else.
- It is **reliable**: it gives consistent results.
- It is **appropriate** to the population and setting.
X: Operationalising aggression in children
> Option 1: number of times a child hits a Bobo doll in 20 minutes. Precise and reliable, but hitting a toy may not be real aggression.
> Option 2: teacher ratings on a standard aggression scale. Covers everyday behaviour, but depends on teachers' judgement.
> Using both and comparing them gives a better picture than either alone.
P: Manipulated variables need operationalising too: "sleep deprivation" might mean staying awake for 24 hours under supervision, and "positive mood" might mean watching a five-minute comedy clip.
P: **Investigate with the lab.** Turn each study's vague variables into measurable ones.
K: Operationalisation makes concepts measurable; every operational definition captures only part of the concept, so the choice shapes the conclusions.
!: Treating the measure as if it were the concept. A memory test score measures performance on that test, not "memory" in every sense.
EV: established | Different operational definitions of the same concept can produce different results.
EV: contested | Whether some psychological concepts, such as happiness, can be fully captured by any measure is debated.
T: Operationalisation | Defining a variable in terms of how it will be measured or manipulated
T: Construct | An abstract concept, such as intelligence, that is inferred rather than directly observed
SUM: Operationalisation turns abstract constructs into precise measures or manipulations.
SUM: Good operational definitions are precise, valid, reliable and appropriate; each captures only part of a construct.
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
SRC: Cohen S., Kamarck T. and Mermelstein R., "A global measure of perceived stress", Journal of Health and Social Behavior 24(4):385–396 | primary | 1983 | https://doi.org/10.2307/2136404
Q: What is operationalisation? | Defining a variable in terms of exactly how it will be measured or manipulated.
Q: Give two ways to operationalise stress. | Any two of a stress questionnaire score, cortisol level, heart rate or blood pressure during a task.
M1#teaching-u11-15-q1@1: Measuring "hunger" as hours since the last meal is an example of… | Operationalisation | Counterbalancing | Debriefing | Generalisation | It defines the concept in measurable terms.
M2#teaching-u11-15-q2@2: Which is the most precise operationalisation of "helpfulness"? | Pens picked up for a stranger in five minutes | Whether someone seems helpful | A person's own feeling of kindness | Being a good person | A precise, countable behaviour can be measured and replicated.
TF2#teaching-u11-15-q3@3: Every operational definition captures the whole of the concept it measures. | false | Each captures part of a construct, which is why using several measures can help.
M3#teaching-u11-15-q4@3: Why might two studies of "anxiety" reach different conclusions? | They may have operationalised anxiety differently | Anxiety can't be studied scientifically | Both studies must have made errors | Anxiety is the same as stress | Different measures capture different aspects of a construct.
SA3#teaching-u11-15-q5@2,3: Operationalise "social media use" for a study of sleep and evaluate your choice. | Example: minutes of screen time on social apps between 9 pm and midnight, recorded by phone usage logs for one week. Strengths: objective, precise, replicable. Limitations: misses what is done (passive versus active use), one week may not be typical, privacy concerns. | Precise operational definition ; Measurement method ; Strength ; Limitation ; Alternative or improvement
M2#teaching-u11-15-q6@1: What does operationalising a variable mean? | Defining it in a measurable way | Changing it during the study | Removing it from the study | Testing it on animals | For example, aggression might be operationalised as the number of hits on a doll.

## Independent and dependent variables
LV: Introductory · Foundation
S: In an experiment, the independent variable is what the researcher changes and the dependent variable is what they measure. This lesson explains IVs, DVs, levels of the IV and how to identify them in any study.
O: Define independent and dependent variables
O: Identify the IV, its levels and the DV in a study
O: Explain why manipulating an IV allows causal conclusions
PRE: Operationalisation
H: The two key variables
P: The **independent variable (IV)** is the variable the researcher **manipulates**, setting up different **conditions** or **levels**. The **dependent variable (DV)** is the variable **measured** to see whether it changes as a result. A simple experiment has an **experimental condition** and a **control condition**, which lacks the manipulation or provides a comparison.
X: Identifying variables
> Study: participants learn words either in a quiet room or with background chatter, then recall them.
> IV: noise, with two levels (quiet, chatter).
> DV: number of words recalled.
> Control condition: quiet.
P: Studies can have more than two levels of an IV (0, 1 or 2 cups of coffee) or more than one IV (caffeine and time of day), which lets researchers test interactions between variables.
P: **Investigate with the lab.** Identify the independent and dependent variables in each study in the builder.
K: The IV is manipulated by the researcher; the DV is measured. Changing only the IV, while controlling everything else, is what lets experiments show cause and effect.
H: Why manipulation matters
P: If the researcher changes the IV and holds other variables constant, then any difference in the DV can be attributed to the IV. In correlational studies, nothing is manipulated, so causal conclusions aren't possible. Some variables, such as age or sex, can't be manipulated; studies comparing such groups are **quasi-experiments**.
!: Calling a measured characteristic like gender an IV in a true experiment. It can be a grouping variable, but it isn't manipulated, so the study is a quasi-experiment.
EV: established | Manipulating an IV while controlling other variables is the basis for causal inference in experiments.
EV: contested | How far laboratory manipulations correspond to real-world causes is debated (ecological validity).
T: Independent variable | The variable the researcher manipulates
T: Dependent variable | The variable the researcher measures
T: Control condition | A condition without the manipulation, used for comparison
SUM: The IV is manipulated and the DV is measured.
SUM: Manipulation with control of other variables allows causal conclusions; unmanipulated groupings give quasi-experiments.
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
SRC: Shadish W. R., Cook T. D. and Campbell D. T., Experimental and Quasi-Experimental Designs for Generalized Causal Inference, Houghton Mifflin | secondary | 2002
Q: What is the independent variable? | The variable the researcher manipulates.
Q: What is the dependent variable? | The variable the researcher measures to see if it changes.
M1#teaching-u11-16-q1@1: In a study of whether chewing gum improves test scores, what is the DV? | Test scores | Chewing gum | The participants | The room | Test scores are measured to see whether chewing gum changes them.
M2#teaching-u11-16-q2@2: Researchers give participants 0, 1 or 2 cups of coffee and measure typing errors. How many levels does the IV have? | Three | One | Two | Four | The IV (coffee) has three levels: 0, 1 and 2 cups.
MATCH1#teaching-u11-16-q3@2: Match each part of a study on exercise and mood to its role. | Exercise or rest = Independent variable ; Mood score after 30 minutes = Dependent variable ; Rest group = Control condition ; Room temperature kept the same = Controlled variable | Only the IV is changed; the DV is measured; other variables are held constant.
M3#teaching-u11-16-q4@3: Why can't a study comparing men's and women's memory be a true experiment? | Sex can't be randomly assigned, so the IV isn't manipulated | Memory can't be measured | Men and women can't be tested together | It has no dependent variable | Without manipulation and random allocation, group differences could reflect other factors.
SA2#teaching-u11-16-q5@1,2: Identify the IV, its levels and the DV in a study of your own design, and explain how you would control one extraneous variable. | Example: IV: revision method (self-testing or rereading); DV: score on a 20-item quiz a week later. Control: same material and study time for both groups; random allocation of participants. | IV ; Levels ; DV ; Controlled variable
M2#teaching-u11-16-q6@1: In an experiment on whether caffeine affects how quickly people respond to a light, what is the dependent variable? | Reaction time | Caffeine dose | The number of participants | The time of day | The DV is what is measured; the IV is what is changed.

## Confounding variables
LV: Intermediate · Application
S: A confounding variable changes along with the independent variable, so it offers an alternative explanation for the results. This lesson distinguishes extraneous and confounding variables and explains how researchers control them.
O: Define extraneous and confounding variables
O: Identify confounds in study descriptions
O: Explain techniques for controlling confounds, including randomisation and standardisation
PRE: Independent and dependent variables
H: Extraneous and confounding
P: An **extraneous variable** is any variable other than the IV that might affect the DV. It becomes a **confounding variable** when it varies **systematically** with the IV, so we can't tell whether the IV or the confound caused the result.
- **Participant variables**: differences between people (ability, age, motivation).
- **Situational variables**: features of the setting (noise, time of day, instructions).
- **Demand characteristics**: cues that tell participants the hypothesis (Orne, 1962).
- **Investigator effects**: the researcher's expectations influencing results.
X: Spotting a confound
> A teacher compares a new reading scheme (used in the morning class) with the old one (afternoon class).
> The morning class reads better.
> Time of day varies with the scheme, so alertness, not the scheme, might explain the result: a confound.
P: **Investigate with the lab.** Spot the confounding variables in each study design and choose a control for each.
K: A confound varies systematically with the IV and provides an alternative explanation; control techniques aim to remove or balance such variables.
H: Control techniques
- **Random allocation** spreads participant variables evenly across conditions.
- **Standardisation**: same instructions, setting and procedure for everyone.
- **Counterbalancing** controls order effects in repeated measures designs.
- **Single-blind** (participants don't know the condition) and **double-blind** (nor do researchers) procedures reduce demand characteristics and investigator effects.
!: Calling every extraneous variable a confound. It is only a confound if it changes systematically with the IV.
EV: established | Random allocation balances participant variables across conditions on average.
EV: established | Experimenters' expectations can influence results, even in animal studies (Rosenthal and Fode, 1963).
T: Confounding variable | A variable that changes systematically with the IV, offering an alternative explanation
T: Demand characteristics | Cues that reveal the study's aim and may change participants' behaviour
T: Double-blind | Neither participants nor the researchers running the study know who is in which condition
SUM: Extraneous variables may affect the DV; confounds vary with the IV and threaten causal conclusions.
SUM: Random allocation, standardisation, counterbalancing and blinding control them.
SRC: Orne M. T., "On the social psychology of the psychological experiment", American Psychologist 17(11):776–783 | primary | 1962 | https://doi.org/10.1037/h0043424
SRC: Rosenthal R. and Fode K. L., "The effect of experimenter bias on the performance of the albino rat", Behavioral Science 8(3):183–189 | primary | 1963 | https://doi.org/10.1002/bs.3830080302
Q: What is a confounding variable? | A variable that changes systematically with the IV, so it offers an alternative explanation for the results.
Q: What is a double-blind procedure? | Neither the participants nor the researchers running the study know who is in which condition.
M1#teaching-u11-17-q1@1: Which technique spreads participant variables evenly across conditions? | Random allocation | Counterbalancing | Debriefing | Operationalisation | Random allocation balances individual differences on average.
M2#teaching-u11-17-q2@2: Volunteers who chose a mindfulness course score lower on stress than those who didn't. What is the main confound? | Self-selection into the course | The stress questionnaire | The length of the course | The time of year | Without random allocation, motivation or other traits may differ between groups.
TF2#teaching-u11-17-q3@2: Demand characteristics are cues that may reveal a study's aim to participants. | true | Orne (1962) argued participants try to work out and fulfil (or resist) the study's purpose.
M3#teaching-u11-17-q4@3: Rosenthal and Fode told students their rats were "bright" or "dull" (they were the same). The "bright" rats learned faster. What does this show? | Experimenter expectations can bias results, so blinding matters | Rats differ greatly in intelligence | Students are better trainers than professors | Random allocation is unnecessary | Expectations changed handling and scoring; double-blind procedures guard against this.
SA3#teaching-u11-17-q5@2,3: Identify the confound in a study of your choice and explain how to redesign it to remove it. | Example: comparing a new reading scheme in a morning class with an old one in an afternoon class confounds scheme with time of day. Redesign: randomly allocate pupils to schemes within the same sessions, standardise teaching and timing, and keep assessors blind to condition. | Identifies confound ; Explains why it is a confound ; Random allocation ; Standardisation or blinding ; Effect on conclusions
M2#teaching-u11-17-q6@1: What is a confounding variable? | A variable other than the IV that varies with it and affects the DV | The variable the researcher deliberately changes | The variable that is measured | A variable that has no effect at all | Confounds make it unclear whether the IV caused the change.

## Experimental design
LV: Intermediate · Application
S: Experimental design is how participants are allocated to conditions: independent groups, repeated measures or matched pairs. This lesson explains each design, its strengths and weaknesses, and how to control order effects.
O: Describe independent groups, repeated measures and matched pairs designs
O: Explain order effects and how counterbalancing controls them
O: Choose and justify an experimental design for a research question
PRE: Confounding variables
H: Three designs
- **Independent groups**: different participants in each condition, ideally randomly allocated. No order effects, but participant variables may differ between groups, and more participants are needed.
- **Repeated measures**: the same participants do every condition. Controls participant variables and needs fewer people, but introduces **order effects** (practice, fatigue, boredom) and may reveal the aim.
- **Matched pairs**: participants are matched on a relevant variable (such as IQ), and one of each pair goes to each condition. Reduces participant variables without order effects, but matching is time-consuming and never perfect.
H: Order effects and counterbalancing
P: In repeated measures, performance may improve in the second condition through practice or worsen through fatigue. **Counterbalancing** gives the conditions in different orders: half the participants do A then B, half do B then A (the ABBA approach for multiple trials), so order effects are balanced across conditions.
X: Choosing a design
> Research question: does a new font improve reading speed?
> Repeated measures would control big individual differences in reading speed, with counterbalanced order and different passages of equal difficulty.
> Independent groups would avoid participants guessing the aim but need more people.
P: Whichever design is used, random allocation (for independent groups) or random ordering (for repeated measures) should still be used where possible.
P: **Investigate with the lab.** Choose a design for each study and justify it: independent groups, repeated measures or matched pairs.
K: The choice of design trades off participant variables against order effects and practicality.
!: Saying repeated measures has "no participant variables". It controls differences between conditions, but participants still differ from one another.
EV: established | Counterbalancing distributes order effects equally across conditions.
EV: contested | Which design is best depends on the research question; there is no universally superior design.
T: Independent groups design | Different participants take part in each condition
T: Repeated measures design | The same participants take part in every condition
T: Counterbalancing | Varying the order of conditions across participants to balance order effects
SUM: Independent groups, repeated measures and matched pairs differ in how participants are allocated.
SUM: Repeated measures controls participant variables but needs counterbalancing for order effects.
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
SRC: Shadish W. R., Cook T. D. and Campbell D. T., Experimental and Quasi-Experimental Designs for Generalized Causal Inference, Houghton Mifflin | secondary | 2002
Q: What is the main weakness of an independent groups design? | Participant variables may differ between the groups.
Q: What is counterbalancing? | Varying the order of conditions across participants so order effects are balanced.
M1#teaching-u11-18-q1@1: In which design does each participant take part in every condition? | Repeated measures | Independent groups | Matched pairs | Quasi-experiment | Repeated measures uses the same people throughout.
M2#teaching-u11-18-q2@2: Participants recall more words in the second condition, whichever it is. What is this, and how is it controlled? | A practice effect, controlled by counterbalancing | A confound, controlled by debriefing | Demand characteristics, controlled by matching | Random error, controlled by a bigger font | Improvement due to order is a practice effect; counterbalancing balances it.
MATCH2#teaching-u11-18-q3@1,2: Match each design to a strength. | Independent groups = No order effects ; Repeated measures = Controls participant variables ; Matched pairs = Reduces participant variables without order effects ; Counterbalanced repeated measures = Balances practice and fatigue | Each design addresses different threats.
M3#teaching-u11-18-q4@3: When is a matched pairs design most worth the effort? | When a key participant variable must be balanced | When participants are easy to find in large numbers | When there are no participant variables at all | When the IV can't be manipulated | Matching targets a key variable without the order effects of repeated measures.
SA3#teaching-u11-18-q5@3: Choose and justify a design for testing whether music impairs revision. | Repeated measures with counterbalancing and two equivalent sets of material controls large individual differences in memory; order effects handled by ABBA or half-and-half orders. Alternatively independent groups with random allocation avoids practice and demand effects but needs more participants. Justify by weighing participant variables against order effects and practicality. | Names design ; Justification ; Control of order effects ; Limitation ; Alternative considered
M2#teaching-u11-18-q6@1: What is a weakness of a repeated measures design? | Order effects such as practice or fatigue | Participant variables between groups | It needs twice as many participants | It can't use a control condition | The same participants do every condition, so order can affect results.

## Laboratory experiments
LV: Intermediate · Evaluation
S: Laboratory experiments manipulate an IV in a controlled setting, allowing strong causal conclusions at a possible cost to realism. This lesson explains their features, strengths and weaknesses, with examples.
O: Describe the features of laboratory experiments
O: Explain the strengths of laboratory control for causal inference and replication
O: Evaluate laboratory experiments, including ecological validity and demand characteristics
PRE: Experimental design
H: Features
P: In a **laboratory experiment**, the researcher manipulates the IV and measures the DV in a controlled environment, with standardised procedures and, ideally, random allocation. "Laboratory" means control, not necessarily a room full of equipment: an online experiment with standardised procedures is also a lab-type experiment.
H: Strengths and weaknesses
- **Strengths**: high control of extraneous variables, so strong causal conclusions (high internal validity); standardised procedures allow **replication**; precise measurement.
- **Weaknesses**: artificial tasks and settings may lack **ecological validity** (mundane realism); participants know they're being studied, so **demand characteristics** and social desirability may affect behaviour; samples are often students (WEIRD).
X: Loftus and Palmer (1974) as a laboratory experiment
> Participants watched films of car crashes and estimated speed after a question using "smashed", "collided", "bumped", "hit" or "contacted".
> Estimates were highest for "smashed" (about 41 mph) and lowest for "contacted" (about 32 mph).
> Strength: control showed the verb caused the difference. Weakness: watching a film isn't witnessing a real crash, where emotion and consequences differ.
P: Many classic laboratory findings, such as effects of attention and memory, have been reproduced in everyday settings, while others shrink outside the lab, so generality has to be checked case by case.
K: Laboratory experiments maximise control and causal inference, but their artificiality can limit how far findings apply to real life.
!: Assuming artificial means useless. Lab findings often generalise well when the underlying process is the same; the question is always an empirical one.
EV: established | Leading questions can alter speed estimates in laboratory conditions (Loftus and Palmer, 1974).
EV: contested | How well laboratory effects generalise to real-world settings varies by topic and is debated.
T: Laboratory experiment | An experiment in a controlled setting, with a manipulated IV and standardised procedures
T: Internal validity | The extent to which the IV, rather than other variables, caused the change in the DV
T: Ecological validity | The extent to which findings apply to real-life settings
SUM: Laboratory experiments manipulate an IV under high control, giving strong causal conclusions and replicability.
SUM: Their artificiality and demand characteristics can limit ecological validity.
SRC: Loftus E. F. and Palmer J. C., "Reconstruction of automobile destruction", Journal of Verbal Learning and Verbal Behavior 13(5):585–589 | primary | 1974 | https://doi.org/10.1016/S0022-5371(74)80011-3
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
Q: What is the main strength of a laboratory experiment? | High control of extraneous variables, so strong conclusions about cause and effect.
Q: What is ecological validity? | The extent to which findings apply to real-life settings.
M1#teaching-u11-19-q1@1: High control of extraneous variables gives a laboratory experiment high… | Internal validity | Ecological validity | Population validity | Face validity | Control lets the IV be identified as the cause.
M2#teaching-u11-19-q2@2: Participants recall nonsense syllables in a quiet testing room. What is the main criticism? | Low ecological validity | Low internal validity | No dependent variable | Too much realism | Nonsense syllables in a quiet room are unlike everyday memory.
TF1#teaching-u11-19-q3@1: A standardised online experiment can count as a laboratory-type experiment. | true | What matters is control and standardisation, not a physical laboratory.
M3#teaching-u11-19-q4@3: Which is the best evaluation of laboratory experiments? | Strong causal evidence, with generality to be checked | They are worthless because they are artificial | They are always better than every other method | They can't be replicated | Control is a real strength; generalisability is an empirical question.
SA3#teaching-u11-19-q5@3: Evaluate the use of laboratory experiments in psychology, with an example. | Example: Loftus and Palmer (1974). Strengths: control isolates the IV (verb wording), standardisation allows replication, precise measures. Weaknesses: artificial film and task (low ecological validity), demand characteristics, student samples. Findings can still generalise when processes are the same; field studies help check. | Example ; Control and causation ; Replication ; Ecological validity ; Demand or sampling

## Field experiments
LV: Intermediate · Evaluation
S: Field experiments manipulate an IV in a natural setting, often without participants knowing they are in a study. This lesson explains their strengths for realism, their loss of control, and their ethical challenges.
O: Describe the features of field experiments
O: Compare field and laboratory experiments on control and validity
O: Evaluate field experiments, including ethical issues of consent
PRE: Laboratory experiments
H: Features
P: In a **field experiment**, the researcher still manipulates the IV, but in a real-world setting such as a street, school, hospital or train. Participants often don't know they're being studied.
X: Piliavin, Rodin and Piliavin (1969)
> On New York subway trains, a confederate collapsed, carrying either a cane (appearing ill) or a bottle (appearing drunk).
> The "ill" victim received spontaneous help on the vast majority of trials; the "drunk" victim was helped much less often.
> The IV (victim type) was manipulated in a natural setting where passengers didn't know they were participants.
H: Evaluation
- **Strengths**: higher ecological validity; fewer demand characteristics, because participants don't know they're being studied.
- **Weaknesses**: less control of extraneous variables (who is on the train, how crowded it is); harder to replicate exactly; random allocation is often impossible; and ethical problems: no informed consent, no right to withdraw and sometimes distress.
P: Because participants can't consent beforehand, field experiments must keep risks very low and are often reviewed especially carefully by ethics committees.
K: Field experiments trade some control for realism and natural behaviour, and usually raise consent issues.
!: Confusing field experiments with natural experiments. In a field experiment the researcher manipulates the IV; in a natural experiment it varies naturally.
EV: established | Bystanders were more likely to help a victim who appeared ill than one who appeared drunk (Piliavin et al., 1969).
EV: contested | Whether the realism of field experiments outweighs the lack of consent is an ethical debate.
T: Field experiment | An experiment in a natural setting in which the researcher manipulates the IV
T: Confederate | A person working for the researcher who acts a part in the study
SUM: Field experiments manipulate an IV in natural settings, increasing realism and reducing demand characteristics.
SUM: They lose control and raise ethical problems of consent and distress.
SRC: Piliavin I. M., Rodin J. and Piliavin J. A., "Good Samaritanism: an underground phenomenon?", Journal of Personality and Social Psychology 13(4):289–299 | primary | 1969 | https://doi.org/10.1037/h0028433
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
Q: What distinguishes a field experiment from a natural experiment? | In a field experiment the researcher manipulates the IV; in a natural experiment it varies naturally.
Q: Give one ethical problem with field experiments. | Participants usually can't give informed consent or withdraw, and may be distressed.
M1#teaching-u11-20-q1@1: In Piliavin et al. (1969), what was the IV? | Whether the victim appeared ill or drunk | Whether passengers helped | The time of day | The length of the train journey | The researchers manipulated how the victim appeared.
M2#teaching-u11-20-q2@2: Researchers leave wallets in different streets, varying whether a baby photo is inside, and count how many are returned. This is a… | Field experiment | Laboratory experiment | Natural experiment | Case study | The IV (photo) is manipulated in a natural setting.
TF2#teaching-u11-20-q3@2: Field experiments usually have fewer demand characteristics than laboratory experiments. | true | Participants often don't know they're in a study.
M3#teaching-u11-20-q4@3: What is the main trade-off between field and laboratory experiments? | Realism versus control of extraneous variables | Cost versus the number of DVs | Ethics versus the use of statistics | Speed versus the use of an IV | Field settings increase realism but reduce control and, with it, internal validity.
SA3#teaching-u11-20-q5@2,3: Compare field and laboratory experiments using examples. | Both manipulate an IV. Laboratory (Loftus and Palmer): high control and replicability, lower ecological validity, demand characteristics. Field (Piliavin et al.): natural behaviour and setting, fewer demand characteristics, less control, hard to replicate, consent problems. Choice depends on whether control or realism matters more. | Shared feature ; Laboratory example ; Field example ; Control versus realism ; Ethics

## Natural experiments
LV: Intermediate · Evaluation
S: In a natural experiment, the independent variable changes naturally, without the researcher manipulating it, and the researcher studies its effects. This lesson explains how natural experiments let psychologists study variables that can't ethically or practically be manipulated.
O: Define a natural experiment
O: Explain why natural experiments are used, with examples
O: Evaluate natural experiments, including the lack of random allocation
PRE: Field experiments
H: Nature does the manipulation
P: Some important variables can't be manipulated by researchers: the arrival of television in a town, a natural disaster, a change in the law, institutional deprivation. A **natural experiment** studies the effects of such an IV, which varies independently of the researcher, by comparing people exposed and not exposed, or before and after.
X: Television and aggression in "Notel"
> In the 1970s, a Canadian town researchers called "Notel" received television for the first time.
> Children's aggression was measured before and two years after, and compared with two towns that already had television.
> Physical and verbal aggression increased in Notel after television arrived (Williams, 1986), an effect that couldn't ethically be produced by manipulation.
H: Evaluation
- **Strengths**: studies real, important variables that couldn't be manipulated; high ecological validity.
- **Weaknesses**: no random allocation, so groups may differ in other ways; the natural event is rare, so replication is hard; researchers have little control over extraneous variables.
P: Policy changes, such as a new school starting age or a minimum wage rise in one region but not another, are common sources of natural experiments in applied psychology and economics.
K: Natural experiments study the effects of IVs that change naturally, gaining realism and ethical acceptability at the cost of control and random allocation.
!: Calling any observational study a natural experiment. There must be an identifiable IV that varies naturally between groups or over time.
EV: established | Natural experiments, such as adoption from institutional care, provide evidence that couldn't ethically be gathered by manipulation.
EV: contested | How confidently causal conclusions can be drawn from natural experiments depends on how comparable the groups are.
T: Natural experiment | A study in which the IV varies naturally, not manipulated by the researcher
T: Comparison group | A group not exposed to the naturally varying IV, used to rule out alternative explanations
SUM: Natural experiments study the effects of naturally occurring IVs, such as new technology or historical events.
SUM: They are realistic and ethical but lack random allocation and control.
SRC: Williams T. M. (ed.), The Impact of Television: A Natural Experiment in Three Communities, Academic Press | primary | 1986
SRC: Rutter M. and the English and Romanian Adoptees Study Team, "Developmental catch-up, and deficit, following adoption after severe global early privation", Journal of Child Psychology and Psychiatry 39(4):465–476 | primary | 1998 | https://doi.org/10.1111/1469-7610.00343
Q: What is a natural experiment? | A study in which the IV varies naturally rather than being manipulated by the researcher.
Q: Why are natural experiments useful? | They allow study of variables that can't ethically or practically be manipulated.
M1#teaching-u11-21-q1@1: Studying children before and after television arrives in their town is a… | Natural experiment | Laboratory experiment | Field experiment | Case study | The IV (television) changed naturally; the researchers didn't introduce it.
M2#teaching-u11-21-q2@2: What is the main weakness of comparing adopted children from orphanages with children raised at home? | The groups may differ in ways other than early care | The study can't measure development | The variables were manipulated unethically | It has too much control | Without random allocation, other differences could explain outcomes.
TF2#teaching-u11-21-q3@1: In a natural experiment, the researcher randomly allocates participants to conditions. | false | The IV varies naturally, so random allocation isn't possible.
M3#teaching-u11-21-q4@3: Why did the Notel study include two comparison towns that already had television? | To rule out general changes over time | To increase the number of experimental conditions to five | Because Notel had too few children | To manipulate the IV directly | Comparison towns help rule out alternative explanations such as historical trends.
SA3#teaching-u11-21-q5@3: Evaluate the use of natural experiments in psychology. | Strengths: study real, important IVs that can't be manipulated (Notel, Romanian adoptees); high ecological validity; ethically acceptable. Weaknesses: no random allocation, so confounds; rare events limit replication; less control; comparison groups help but don't remove all differences. | Definition and example ; Ethical and realism strengths ; Random allocation ; Replication or control ; Use of comparison groups

## Quasi-experiments
LV: Intermediate · Application
S: A quasi-experiment compares groups that differ on a pre-existing characteristic, such as age, sex or diagnosis, which the researcher can't assign. This lesson explains how quasi-experiments differ from true and natural experiments and what they can conclude.
O: Define a quasi-experiment
O: Distinguish quasi-experiments from true and natural experiments
O: Evaluate the causal conclusions quasi-experiments can support
PRE: Natural experiments
H: Groups that already differ
P: In a **quasi-experiment**, the IV is a characteristic participants already have: age group, sex, having a diagnosis of depression, being a smoker. The researcher measures the DV under controlled conditions but can't randomly allocate people to the IV.
H: How it differs
- **True experiment**: IV manipulated, random allocation.
- **Natural experiment**: IV is an event or change that occurs naturally (television arriving).
- **Quasi-experiment**: IV is an existing difference between people.
X: Comparing memory in older and younger adults
> IV: age group (20–30 versus 65–75).
> DV: recall of a word list under identical lab conditions.
> Older adults recall fewer words, but they also differ in education history, health and familiarity with computers, any of which might explain the difference.
P: Quasi-experiments are still valuable: they show whether and how groups differ, and suggest hypotheses that other designs can test.
K: Quasi-experiments compare pre-existing groups under controlled conditions; they can show differences but can't isolate the cause, because people can't be randomly allocated.
!: Concluding that the grouping variable caused the difference. Other variables that come with it may be responsible.
EV: established | Quasi-experiments can control the testing situation but not participant variables tied to the grouping.
EV: contested | How far statistical controls can compensate for lack of random allocation is debated.
T: Quasi-experiment | A study comparing groups that differ on a pre-existing characteristic not assigned by the researcher
T: Random allocation | Assigning participants to conditions by chance, which quasi-experiments can't do
SUM: Quasi-experiments use existing characteristics as the IV.
SUM: They control testing conditions but can't establish that the characteristic itself caused the effect.
SRC: Shadish W. R., Cook T. D. and Campbell D. T., Experimental and Quasi-Experimental Designs for Generalized Causal Inference, Houghton Mifflin | secondary | 2002
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
Q: What is a quasi-experiment? | A study comparing groups that differ on a pre-existing characteristic the researcher can't assign.
Q: Why can't quasi-experiments establish cause? | Without random allocation, other variables linked to the grouping may explain differences.
M1#teaching-u11-22-q1@1: Comparing anxiety in people with and without a diagnosis of insomnia is a… | Quasi-experiment | True experiment | Field experiment | Natural experiment | Diagnosis is a pre-existing characteristic, not manipulated or naturally changing during the study.
M2#teaching-u11-22-q2@2: Women outperform men on a verbal task in a controlled study. What is the strongest conclusion? | There is a difference, but its cause isn't established | Sex causes verbal ability | Verbal ability causes sex differences | The task must be biased | A quasi-experiment shows a difference; socialisation, education and other factors may explain it.
MATCH2#teaching-u11-22-q3@1,2: Match each study to its type. | Random allocation to caffeine or placebo = True experiment ; Smokers versus non-smokers on a memory test = Quasi-experiment ; Effects of a new law on driving = Natural experiment ; Dropped wallets with different photos = Field experiment | The type depends on whether and how the IV is manipulated.
M3#teaching-u11-22-q4@3: Which addition would most strengthen a quasi-experiment comparing older and younger adults' memory? | Measuring and controlling likely confounds | Testing the groups in different rooms | Allowing older adults more time only | Removing the comparison group | Measuring and statistically controlling likely confounds reduces alternative explanations, though it can't remove them all.
SA2#teaching-u11-22-q5@2,3: Design a quasi-experiment and explain one limitation of its conclusions. | Example: compare bilingual and monolingual children's performance on a task-switching test under identical conditions. Limitation: bilingual children may differ in family income, culture or education, so differences can't be attributed to bilingualism alone; measure and control these where possible. | Pre-existing IV ; DV and controlled testing ; Limitation ; Confounds named ; Improvement

## Correlational research
LV: Intermediate · Application
S: Correlational research measures two or more variables to see whether they are related, without manipulating anything. This lesson explains positive, negative and zero correlations, the correlation coefficient, and why correlation doesn't show causation.
O: Describe positive, negative and zero correlations and the correlation coefficient
O: Explain why correlation doesn't establish causation, including the third-variable and direction problems
O: Evaluate the strengths and weaknesses of correlational research
PRE: Independent and dependent variables
H: Measuring relationships
P: A **correlation** describes the relationship between two **co-variables**. In a **positive** correlation, both increase together (height and weight). In a **negative** correlation, one increases as the other decreases (absences and exam scores). A **zero** correlation means no linear relationship. The **correlation coefficient** (r) ranges from −1 to +1; its size shows strength and its sign shows direction. Scatterplots display the pattern.
H: Correlation is not causation
- **Direction problem**: does A cause B, or B cause A? (Does stress cause poor sleep, or poor sleep cause stress?)
- **Third-variable problem**: a third variable C may cause both. Ice cream sales and drownings both rise in summer because of hot weather.
X: Screen time and wellbeing
> Large surveys find a small negative correlation between teenagers' screen time and wellbeing.
> Direction: unhappy teens may use screens more.
> Third variables: family circumstances or loneliness could affect both.
> Longitudinal and experimental studies are needed to test causal claims.
K: Correlations show whether and how strongly variables are related, but not why: direction and third variables block causal conclusions.
H: Evaluation
P: Strengths: can study variables that can't be manipulated (smoking, trauma); large samples; reveals relationships worth testing experimentally. Weaknesses: no causal conclusions; only detects linear relationships; can be distorted by outliers (Anscombe's quartet).
!: Thinking a strong correlation means causation, or that a weak one means no relationship. Strength, direction and cause are separate questions.
EV: established | Correlational data can't by themselves distinguish cause from reverse causation or third variables.
EV: contested | The causal effect of screen time on adolescent wellbeing is debated; correlations are small and causal evidence mixed.
T: Correlation coefficient | A number from −1 to +1 showing the strength and direction of a linear relationship
T: Third-variable problem | When a third variable causes both correlated variables
T: Co-variables | The two variables measured in a correlational study
SUM: Correlations can be positive, negative or zero; r gives strength and direction.
SUM: Direction and third-variable problems mean correlation doesn't show causation.
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
SRC: Orben A. and Przybylski A. K., "The association between adolescent well-being and digital technology use", Nature Human Behaviour 3:173–182 | primary | 2019 | https://doi.org/10.1038/s41562-018-0506-1
Q: What does a correlation coefficient of −0.8 show? | A strong negative relationship: as one variable increases, the other decreases.
Q: What is the third-variable problem? | A third variable may cause both correlated variables, creating a relationship without one causing the other.
M1#teaching-u11-23-q1@1: As hours of revision increase, exam scores increase. This is a… | Positive correlation | Negative correlation | Zero correlation | Causal experiment | Both variables increase together, so the relationship is positive.
M2#teaching-u11-23-q2@2: Cities with more police officers have more crime. What is the most likely explanation? | Larger or higher-crime cities employ more police | Police cause crime | Crime and police are unrelated | Crime causes police to be less effective | The direction problem and third variables (city size) explain the correlation.
TF2#teaching-u11-23-q3@1,2: A correlation of +0.3 is stronger than a correlation of −0.7. | false | Strength is shown by size, not sign; −0.7 is stronger.
M3#teaching-u11-23-q4@3: Which design would best test whether screen time causes lower wellbeing? | Randomly assigning people to reduce screen time and measuring wellbeing | A larger correlational survey of screen time | A single case study of one teenager | Asking teenagers whether screens make them unhappy | Manipulating screen time with random allocation allows causal inference.
SA3#teaching-u11-23-q5@3: Evaluate correlational research using an example. | Example: screen time and wellbeing. Strengths: studies variables that can't be manipulated; large samples; identifies relationships for further study. Weaknesses: direction and third-variable problems; only linear relationships; outliers distort r. Experiments or longitudinal designs needed for causal claims. | Example ; Strength ; Direction problem ; Third-variable problem ; Next step for causation
## Cross-sectional and longitudinal research
LV: Intermediate · Application
S: To study change over time, researchers either compare different age groups at one point (cross-sectional) or follow the same people over years (longitudinal). This lesson compares the two designs and their typical problems: cohort effects and attrition.
O: Describe cross-sectional and longitudinal designs
O: Explain cohort effects and attrition
O: Evaluate which design suits a research question about development or change
PRE: Correlational research
H: Two ways to study change
- **Cross-sectional**: compare different groups (e.g. 20-, 40- and 60-year-olds) at the same time. Quick and cheap, but differences may reflect **cohort effects**: the groups grew up in different times, with different schooling, diet and technology.
- **Longitudinal**: follow the same people over time, measuring them repeatedly. Shows individual change and the order of events, but is slow and costly, and suffers **attrition** (people drop out, often not at random).
P: **Cohort-sequential** designs combine both: several cohorts are followed for a shorter period, separating age effects from cohort effects.
X: The Dunedin Multidisciplinary Health and Development Study
> About 1,000 people born in Dunedin, New Zealand, in 1972–73 have been assessed repeatedly from birth into middle age.
> Retention has been unusually high, reducing attrition bias.
> It has shown, for example, that childhood self-control predicts adult health and wealth (Moffitt et al., 2011), though one town's cohort may not represent other places or generations.
H: Choosing a design
P: Questions about how individuals change, or what predicts later outcomes, need longitudinal data; quick descriptions of age differences can use cross-sectional data, interpreted cautiously.
K: Cross-sectional designs are fast but confound age with cohort; longitudinal designs track real change but are slow and lose participants.
!: Concluding from a cross-sectional study that people change as they age. Differences between age groups may reflect when people were born, not ageing.
EV: established | Cross-sectional age differences can reflect cohort effects rather than ageing.
EV: contested | How far findings from single-cohort longitudinal studies generalise to other cohorts is debated.
T: Cohort effect | Differences between age groups caused by the different times in which they grew up
T: Attrition | Participants dropping out of a longitudinal study
T: Longitudinal design | Studying the same participants repeatedly over time
SUM: Cross-sectional studies compare age groups at one time; longitudinal studies follow the same people.
SUM: Cohort effects threaten cross-sectional studies; attrition, cost and time threaten longitudinal studies.
SRC: Moffitt T. E. et al., "A gradient of childhood self-control predicts health, wealth, and public safety", Proceedings of the National Academy of Sciences 108(7):2693–2698 | primary | 2011 | https://doi.org/10.1073/pnas.1010076108
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 9.1 "What is lifespan development?" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/9-1-what-is-lifespan-development
Q: What is a cohort effect? | Differences between age groups caused by the different times in which they grew up.
Q: What is attrition, and why does it matter? | Participants dropping out of a longitudinal study; if dropouts differ systematically, the remaining sample is biased.
M1#teaching-u11-24-q1@1: Comparing 20-year-olds and 70-year-olds on a memory test this week is a… | Cross-sectional design | Longitudinal design | Case study | Field experiment | Different age groups are compared at one point in time.
M2#teaching-u11-24-q2@2: In a cross-sectional study, older adults score lower on a computer-based reasoning test. Which alternative explanation is most important? | Cohort effects such as less experience with computers | Attrition of younger participants | Practice effects from repeated testing | The test was given longitudinally | Older cohorts grew up with less computer use, which could explain lower scores.
TF2#teaching-u11-24-q3@2: Longitudinal studies avoid the problem of attrition. | false | Attrition is the characteristic problem of longitudinal studies.
M3#teaching-u11-24-q4@3: Which design best separates the effects of ageing from cohort effects? | A cohort-sequential design following several cohorts | A single cross-sectional study | A single case study | A one-off survey of one age group | Following several cohorts over time lets researchers compare same-age people from different cohorts.
SA3#teaching-u11-24-q5@2,3: Compare cross-sectional and longitudinal designs for studying how memory changes with age. | Cross-sectional: quick, cheap, no attrition, but confounds age with cohort (education, technology). Longitudinal: tracks real individual change and order of events, but slow, costly, attrition (often of less healthy people) and practice effects from repeated testing. Cohort-sequential combines strengths. | Cross-sectional strengths ; Cohort effects ; Longitudinal strengths ; Attrition or practice ; Combined design

## Case studies
LV: Intermediate · Evaluation
S: A case study is an in-depth investigation of one person, group or event, usually using several methods. This lesson explains what case studies have contributed to psychology, especially neuropsychology, and their limitations.
O: Describe the features of case studies
O: Explain the contribution of case studies such as HM to psychology
O: Evaluate case studies, including generalisability and researcher bias
PRE: Correlational research
H: Depth over breadth
P: A **case study** investigates a single case in depth, often over a long period, combining interviews, observation, tests, records and sometimes brain imaging. Case studies are common in clinical psychology and neuropsychology, where unusual cases reveal how the mind is organised.
X: Patient HM
> In 1953, Henry Molaison (HM) had parts of both medial temporal lobes, including much of the hippocampus, removed to treat severe epilepsy.
> Afterwards he could hold information briefly and learn new motor skills, but couldn't form new long-term declarative memories (Scoville and Milner, 1957).
> His case showed that memory isn't a single system and that the hippocampus is crucial for forming new long-term memories.
P: Case studies often combine qualitative data (interviews, observation) with quantitative data (test scores, brain scans), which allows triangulation within a single case.
K: Case studies give rich, detailed data and can challenge general theories, but findings from one case may not generalise.
H: Evaluation
- **Strengths**: rich, holistic data; can study rare phenomena that couldn't be created ethically; one well-documented case can disprove a general claim (one HM shows memory is not unitary).
- **Weaknesses**: may not generalise; often rely on retrospective information; researcher interpretation can bias conclusions; hard to replicate; ethical issues of confidentiality and consent, especially with vulnerable people.
!: Assuming a case study proves something about everyone. It can generate hypotheses or challenge theories, but group studies test generality.
EV: established | HM's case showed the hippocampus is essential for forming new declarative memories.
EV: contested | How much single-case findings should shape general theories, without group replication, is debated.
T: Case study | An in-depth investigation of a single individual, group or event
T: Retrospective data | Information about the past, gathered later, which may be inaccurate
SUM: Case studies investigate one case in depth with several methods.
SUM: They reveal rare phenomena and challenge theories, but generalisation and bias are limitations.
SRC: Scoville W. B. and Milner B., "Loss of recent memory after bilateral hippocampal lesions", Journal of Neurology, Neurosurgery and Psychiatry 20(1):11–21 | primary | 1957 | https://doi.org/10.1136/jnnp.20.1.11
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
Q: What is a case study? | An in-depth investigation of a single individual, group or event, usually using several methods.
Q: What did HM's case show about memory? | That forming new long-term declarative memories depends on the hippocampus, separate from short-term memory and skill learning.
M1#teaching-u11-25-q1@1: Which is the main strength of case studies? | Rich, detailed data about rare cases | Easy generalisation to the population | High control of variables | Very large samples | Case studies trade breadth for depth: rich detail about rare cases.
M2#teaching-u11-25-q2@2: A psychologist studies one adult who has recovered speech after a stroke, using scans, interviews and tests over two years. This is a… | Case study | Field experiment | Cross-sectional survey | Natural experiment | In-depth, multi-method study of one person is a case study.
TF2#teaching-u11-25-q3@3: A single well-documented case can disprove a claim about all humans. | true | One clear counter-example can falsify a universal claim, though it can't establish one.
M3#teaching-u11-25-q4@3: Why might a clinician's case study be biased? | The researcher selects and interprets the information | The sample size is too large to analyse | Case studies always use statistics | The participant is randomly allocated | Interpretation by one researcher, without blinding, can shape conclusions.
SA3#teaching-u11-25-q5@3: Evaluate the contribution of case studies to psychology. | Strengths: rich data, rare cases (HM), can falsify general claims, generate hypotheses, ethical way to study naturally occurring damage. Weaknesses: generalisation, retrospective data, researcher bias, hard to replicate, confidentiality. Best combined with group studies. | Example ; Contribution ; Generalisation ; Bias ; Ethical issue

## Naturalistic observation
LV: Intermediate · Application
S: Naturalistic observation records behaviour as it happens in its everyday setting, without interfering. This lesson explains how it is done, the choices observers make (overt or covert, participant or non-participant) and its strengths and weaknesses.
O: Describe naturalistic observation and the observer's choices
O: Explain observer effects and how they are reduced
O: Evaluate naturalistic observation, including ethics
PRE: Case studies
H: Watching behaviour where it happens
P: In **naturalistic observation**, researchers watch and record behaviour in its normal setting (a playground, a ward, a workplace, wild chimpanzees in Gombe) without manipulating anything. Observers choose:
- **Overt** (participants know) or **covert** (they don't).
- **Participant** (the observer joins the group) or **non-participant** (watches from outside).
X: Studying playground behaviour
> A researcher sits at the edge of a school playground over several weeks, recording episodes of cooperative and aggressive play.
> Children soon stop paying attention to her (habituation), reducing observer effects.
> Data describe real behaviour, but she can't tell why each episode happened, and other researchers can't recreate the same playground days.
K: Naturalistic observation captures real behaviour in context, at the cost of control and with risks of observer effects and bias.
H: Evaluation
- **Strengths**: high ecological validity; reveals behaviour people might not report; useful early in research or where experiments are impossible.
- **Weaknesses**: no control, so no causal conclusions; **observer effects** (people change behaviour when watched, sometimes called the Hawthorne effect) in overt observation; **observer bias** in what is recorded; hard to replicate; covert observation raises consent and privacy issues.
!: Assuming covert observation is always unethical. It can be acceptable in public places where people would expect to be observed, but private settings need consent.
EV: established | People may change their behaviour when they know they are being observed.
EV: contested | How large and common the "Hawthorne effect" is, as originally described, has been questioned by later reanalyses.
T: Naturalistic observation | Recording behaviour in its normal setting without intervention
T: Covert observation | Observation in which participants don't know they are being observed
T: Observer effect | A change in participants' behaviour because they know they are being observed
SUM: Naturalistic observation records real behaviour in its setting, overtly or covertly, as a participant or not.
SUM: It has high ecological validity but no control, and risks observer effects, bias and ethical problems.
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
SRC: McCambridge J., Witton J. and Elbourne D. R., "Systematic review of the Hawthorne effect: new concepts are needed to study research participation effects", Journal of Clinical Epidemiology 67(3):267–277 | primary | 2014 | https://doi.org/10.1016/j.jclinepi.2013.08.015
Q: What is covert observation? | Observation in which participants don't know they are being observed.
Q: What is the main weakness of naturalistic observation for explaining behaviour? | There is no manipulation or control, so causes can't be established.
M1#teaching-u11-26-q1@1: An observer joins a football team to study its culture without telling members. This is… | Covert participant observation | Overt non-participant observation | A field experiment | A structured interview | The observer is part of the group and members don't know.
M2#teaching-u11-26-q2@2: Pupils behave unusually well while a researcher is visibly observing their class. Which problem is this? | Observer effect | Cohort effect | Attrition | Order effect | Knowing they're watched changes behaviour.
TF1#teaching-u11-26-q3@2: Naturalistic observation involves manipulating an independent variable. | false | Observers record behaviour without manipulating anything.
M3#teaching-u11-26-q4@3: Which would best reduce observer effects in an overt observation? | Letting participants get used to the observer | Telling participants the hypothesis in detail | Recording only on the first day | Using a different observer every hour | Habituation to the observer reduces changes in behaviour.
SA3#teaching-u11-26-q5@2,3: Evaluate naturalistic observation as a method, with an example. | Example: playground play. Strengths: real behaviour, ecological validity, reveals what people wouldn't report. Weaknesses: no control or causation; observer effects (reduced by habituation or covert methods); observer bias (reduced by behavioural categories and two observers); ethics of covert observation; hard to replicate. | Example ; Ecological validity ; Lack of control ; Observer effects or bias ; Ethics

## Structured observation
LV: Intermediate · Application
S: Structured observation uses predefined behavioural categories and sampling methods so that observations are systematic, countable and reliable. This lesson explains how to design one and how inter-observer reliability is checked.
O: Describe behavioural categories, event sampling and time sampling
O: Design a structured observation with operationalised categories
O: Explain and evaluate inter-observer reliability
PRE: Naturalistic observation
H: Making observation systematic
P: In a **structured observation**, observers record behaviour using **behavioural categories**: precise, observable, mutually exclusive definitions (for example "hits with an open hand", "verbal insult"), often in a **controlled setting** such as Ainsworth's Strange Situation. Two sampling methods are common:
- **Event sampling**: record every occurrence of a target behaviour.
- **Time sampling**: record what happens at set intervals (e.g. every 30 seconds).
H: Inter-observer reliability
P: Two or more observers record the same sessions independently, and their records are compared. Agreement can be expressed as a percentage, a correlation, or **Cohen's kappa**, which corrects for agreement expected by chance (Cohen, 1960). Low agreement means categories need clearer definitions or observers need more training.
X: Observing nursery cooperation
> Categories: shares toy; takes turns; helps another child; refuses to share.
> Time sampling: each child observed for 10 seconds every 2 minutes.
> Two observers code 20 sessions; disagreements are discussed and definitions refined until agreement is high.
K: Structured observation uses clear categories and sampling methods, with inter-observer reliability checks, to make observation systematic and reliable.
!: Writing vague categories such as "being aggressive". Categories must be observable behaviours that observers can agree on.
EV: established | Clear operational categories and observer training improve inter-observer reliability.
EV: contested | Predefined categories may miss behaviours that matter but weren't anticipated, a trade-off between reliability and richness.
T: Behavioural categories | Precise, observable definitions of behaviours to be recorded
T: Time sampling | Recording behaviour at set intervals
T: Inter-observer reliability | Agreement between independent observers recording the same behaviour
SUM: Structured observations use behavioural categories and event or time sampling.
SUM: Inter-observer reliability, e.g. Cohen's kappa, checks consistency.
SRC: Cohen J., "A coefficient of agreement for nominal scales", Educational and Psychological Measurement 20(1):37–46 | primary | 1960 | https://doi.org/10.1177/001316446002000104
SRC: Ainsworth M. D. S. et al., Patterns of Attachment: A Psychological Study of the Strange Situation, Erlbaum | primary | 1978
Q: What is event sampling? | Recording every occurrence of a target behaviour during the observation.
Q: Why use Cohen's kappa rather than percentage agreement? | Kappa corrects for agreement expected by chance.
M1#teaching-u11-27-q1@1: Recording a child's behaviour every 30 seconds is… | Time sampling | Event sampling | Continuous recording | Self-report | Recording at set intervals is time sampling.
M2#teaching-u11-27-q2@2: Two observers agree on only 55% of their codes. What should the researchers do? | Refine category definitions and retrain observers | Use only the more confident observer | Report the data as reliable | Add more vague categories | Low agreement shows unreliable categories or observers.
SEQ2#teaching-u11-27-q3@2: Put the steps of setting up a structured observation in order. | Define behavioural categories ; Choose a sampling method ; Pilot with two observers ; Check inter-observer reliability and refine | Categories and sampling are piloted and refined before the main study.
M3#teaching-u11-27-q4@3: What is the main trade-off of using predefined behavioural categories? | Reliability gained, unlisted behaviour missed | Higher validity, but lower reliability | More ethical, but less reliable | Faster, but requires no observers | Structure improves consistency but narrows what is recorded.
SA2#teaching-u11-27-q5@2,3: Design a structured observation of helping behaviour in a school canteen. | Categories: holds door, picks up dropped item, shares food, offers to carry tray. Event sampling over lunch periods; two observers code independently; calculate agreement or kappa; refine categories; consider ethics (public setting, school permission, no identification). | Operationalised categories ; Sampling method ; Inter-observer reliability ; Ethics

## Surveys and questionnaires
LV: Intermediate · Application
S: Surveys collect self-report data from many people using questionnaires. This lesson explains question types, rating scales, common design problems and social desirability bias.
O: Describe open and closed questions and rating scales
O: Identify problems in questionnaire design
O: Evaluate questionnaires, including social desirability and response bias
PRE: Operationalisation
H: Question types
- **Closed questions** offer fixed responses (yes/no, multiple choice, rating scales). Easy to analyse quantitatively; may force answers that don't fit.
- **Open questions** let people answer in their own words. Rich qualitative data; harder to analyse and compare.
- **Rating scales**: a **Likert scale** asks how far respondents agree with a statement (e.g. 1 strongly disagree to 5 strongly agree).
H: Design problems
P: Good questions are clear and neutral. Problems include **leading** questions ("Don't you agree…"), **double-barrelled** questions (two questions in one), jargon, double negatives, and overlapping response options. Questionnaires should be **piloted** on a small sample first.
X: Fixing a question
> Draft: "How often do you exercise and eat healthily?" (double-barrelled and vague).
> Better: "On how many of the last 7 days did you do at least 30 minutes of exercise?" (one behaviour, a defined period).
K: Questionnaires gather large amounts of self-report data efficiently, but their validity depends on question design and honest answers.
H: Evaluation
P: Strengths: large samples quickly and cheaply; anonymity can encourage honesty; standardised, easily analysed. Weaknesses: **social desirability bias** (answering to look good); **acquiescence bias** (agreeing regardless, reduced by reversing some items); people may lack insight into their behaviour; low response rates can bias samples.
!: Assuming anonymity removes all bias. People may still misremember, misunderstand or present themselves favourably.
EV: established | Social desirability bias affects self-reports, especially on sensitive topics.
EV: contested | How much online questionnaire data are affected by careless responding is still being studied.
T: Likert scale | A rating scale measuring agreement with statements, often from 1 to 5 or 1 to 7
T: Social desirability bias | Answering in a way that presents oneself favourably
T: Acquiescence bias | A tendency to agree with statements regardless of content
SUM: Questionnaires use open and closed questions and rating scales to collect self-report data.
SUM: Design problems and response biases threaten validity; piloting and careful wording help.
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
SRC: Paulhus D. L., "Two-component models of socially desirable responding", Journal of Personality and Social Psychology 46(3):598–609 | primary | 1984 | https://doi.org/10.1037/0022-3514.46.3.598
Q: What is a double-barrelled question? | A question that asks about two things at once.
Q: How can acquiescence bias be reduced? | By reversing the wording of some items so agreeing doesn't always mean the same answer.
M1#teaching-u11-28-q1@1: A question allowing respondents to answer in their own words is… | An open question | A closed question | A Likert item | A leading question | Open questions let people answer in their own words, producing qualitative data.
M2#teaching-u11-28-q2@2: Many respondents report exercising more than fitness trackers show. Which bias is most likely? | Social desirability bias | Acquiescence bias | Cohort effect | Order effect | People tend to over-report socially desirable behaviours such as exercise.
TF2#teaching-u11-28-q3@2: Piloting a questionnaire helps identify unclear questions before the main study. | true | A small trial run reveals confusing wording and problems with response options.
M3#teaching-u11-28-q4@3: Which is the strongest reason to combine questionnaires with another method? | An objective measure can check biased self-reports | Questionnaires can't collect quantitative data | Questionnaires can't be used with large samples | Questionnaires never use closed questions | Triangulating with objective measures guards against reporting biases.
SA2#teaching-u11-28-q5@2,3: Write three good questionnaire items on sleep and explain how you designed them to avoid bias. | Example: "On how many nights in the last 7 did you sleep 7 hours or more?" (0–7); "I feel rested when I wake up" (1–5 Likert); reverse-scored "I find it hard to get up in the morning". Avoided leading, double-barrelled and vague wording; defined time period; reversed item reduces acquiescence; anonymity reduces social desirability; pilot first. | Clear closed item ; Likert item ; Reversed item ; Explanation of bias reduction ; Piloting or anonymity

## Interviews
LV: Intermediate · Application
S: Interviews collect self-report data through conversation, from fully structured to unstructured. This lesson explains the types of interview, interviewer effects and how interviews are analysed.
O: Describe structured, semi-structured and unstructured interviews
O: Explain interviewer effects and how they are reduced
O: Evaluate interviews compared with questionnaires
PRE: Surveys and questionnaires
H: Types of interview
- **Structured**: fixed questions in a fixed order. Comparable and reliable; little flexibility.
- **Semi-structured**: a guide of key questions, with follow-up prompts. Balances comparability and depth; common in psychology.
- **Unstructured**: a conversation around a topic. Rich, participant-led data; hard to compare and analyse.
H: Interviewer effects
P: The interviewer's characteristics (age, gender, ethnicity, manner) and expectations can influence answers. Training, a standard schedule, rapport-building and recording interviews (with consent) for later analysis reduce these effects.
X: Interviewing students about exam stress
> A semi-structured schedule asks: "Tell me about a recent exam." "How did you feel in the week before?" "What helped?"
> Prompts such as "Can you say more about that?" follow up interesting answers.
> Transcripts are analysed for themes such as fear of failure and family expectations.
K: Interviews give richer data than questionnaires and allow follow-up, but are time-consuming and open to interviewer effects.
H: Evaluation
P: Strengths: depth and meaning; clarifying misunderstandings; suitable for complex or sensitive topics with skilled interviewers. Weaknesses: time and cost limit sample size; interviewer effects and social desirability; analysis of qualitative data requires interpretation and is harder to replicate.
!: Thinking unstructured interviews are "better" because they are richer. The best type depends on whether the aim is comparison or exploration.
EV: established | Interviewer characteristics can influence participants' responses.
EV: contested | Whether qualitative interview analysis should aim for reliability between coders or embrace interpretation is debated.
T: Semi-structured interview | An interview with a guide of key questions and flexible follow-up
T: Interviewer effect | Influence of the interviewer's characteristics or behaviour on responses
SUM: Interviews range from structured to unstructured, trading comparability for depth.
SUM: They give rich data but are costly and open to interviewer effects.
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
SRC: Braun V. and Clarke V., "Using thematic analysis in psychology", Qualitative Research in Psychology 3(2):77–101 | primary | 2006 | https://doi.org/10.1191/1478088706qp063oa
Q: What is a semi-structured interview? | An interview with a guide of key questions and flexible follow-up prompts.
Q: Give one way to reduce interviewer effects. | Training, a standard schedule, building rapport or recording interviews for checking.
M1#teaching-u11-29-q1@1: An interview with fixed questions in a fixed order is… | Structured | Semi-structured | Unstructured | A focus group | Fixed questions and order define a structured interview.
M2#teaching-u11-29-q2@2: A researcher wants to explore how people experience grief, with no fixed expectations. Which interview type fits best? | Unstructured or semi-structured | Structured | A closed questionnaire | A laboratory experiment | Exploration of meaning needs flexibility.
TF1#teaching-u11-29-q3@1: Structured interviews produce data that are easier to compare across participants. | true | Everyone answers the same questions in the same way.
M3#teaching-u11-29-q4@3: When would a questionnaire be preferred to interviews? | When large, comparable samples are needed quickly | When exploring a little-understood experience | When follow-up questions are essential | When participants have low literacy | Questionnaires suit scale and comparison; interviews suit depth.
SA3#teaching-u11-29-q5@3: Compare interviews and questionnaires as methods of collecting self-report data. | Interviews: depth, follow-up, clarify misunderstandings, rapport for sensitive topics; but time, cost, small samples, interviewer effects. Questionnaires: large samples, cheap, anonymous, comparable; but fixed answers, misunderstandings, low response rates. Both affected by social desirability. Choice depends on aim. | Interview strengths ; Interview weaknesses ; Questionnaire strengths ; Questionnaire weaknesses ; Shared bias and judgement

## Focus groups
LV: Intermediate · Application
S: A focus group is a guided discussion with a small group about a topic, used to explore views and how people talk about an issue together. This lesson explains how focus groups are run and when they are useful.
O: Describe the features of focus groups and the moderator's role
O: Explain how group interaction produces data that individual interviews don't
O: Evaluate focus groups, including conformity and dominant voices
PRE: Interviews
H: Discussion as data
P: A **focus group** brings together around 6 to 10 participants with something in common to discuss a topic, guided by a **moderator** using a topic guide. Discussions are recorded and transcribed. Focus groups are used in health research, consumer research, service design and the early stages of questionnaire development.
H: What groups add
P: Participants respond to each other, so focus groups show how opinions are formed, challenged and shared, and reveal the language people use. They can be less intimidating than one-to-one interviews for some topics.
X: Designing a mental health app for students
> Three focus groups of students discuss what would make them use a wellbeing app.
> The discussion reveals concerns about privacy that individual surveys missed, and the phrases students use to describe stress.
> These findings shape the app's design and a later questionnaire.
K: Focus groups generate data from group interaction, revealing shared language and how views develop, but group dynamics can distort individual views.
H: Evaluation
P: Strengths: many views at once; interaction reveals reasoning and shared meanings; useful for exploration and design. Weaknesses: dominant participants and **conformity** may silence others; less suited to very sensitive personal topics; confidentiality can't be guaranteed because other participants hear everything; analysis is complex.
!: Treating focus group statements as each individual's private view. Opinions are shaped by the group context.
EV: established | Group discussion can shift expressed opinions through conformity and dominant members.
EV: contested | Whether online focus groups produce data as rich as face-to-face groups is debated.
T: Focus group | A guided group discussion used to explore views on a topic
T: Moderator | The person who guides a focus group discussion
SUM: Focus groups are guided discussions that reveal shared views and language.
SUM: Group dynamics and limited confidentiality are their main weaknesses.
SRC: Kitzinger J., "Qualitative research: introducing focus groups", BMJ 311(7000):299–302 | primary | 1995 | https://doi.org/10.1136/bmj.311.7000.299
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
Q: What is the role of a focus group moderator? | To guide the discussion using a topic guide, encourage all to contribute and keep the group on topic.
Q: Why can't full confidentiality be promised in a focus group? | Other participants hear what each person says.
M1#teaching-u11-30-q1@1: Focus groups typically include about… | 6 to 10 participants | 1 participant | 50 participants | 200 participants | Small groups allow everyone to contribute.
M2#teaching-u11-30-q2@2: In a focus group, one confident participant dominates and others agree with them. What is the main threat? | Conformity to the group | Attrition | Order effects | Cohort effects | Dominant voices and conformity can hide differing views.
TF2#teaching-u11-30-q3@3: Focus groups are ideal for very sensitive personal topics that participants wouldn't share with others. | false | One-to-one interviews are usually better for highly personal topics.
M3#teaching-u11-30-q4@3: What can focus groups reveal that individual interviews can't? | How opinions form and change through interaction | Each person's completely private views | Precise population percentages | Causal effects of an IV | Interaction among participants is the distinctive data.
SA2#teaching-u11-30-q5@2,3: Explain how a focus group could be used in developing a questionnaire on student wellbeing, and one limitation. | Run focus groups to explore what wellbeing means to students and the language they use; identify topics and wording for items; pilot the questionnaire. Limitation: dominant voices or conformity may skew themes, and groups aren't representative, so the questionnaire must be tested on a wider sample. | Purpose ; How findings feed design ; Language or topics ; Limitation

## Quantitative, qualitative and mixed methods
LV: Intermediate · Evaluation
S: Quantitative research measures and counts; qualitative research explores meanings in words and experiences; mixed methods combine them. This lesson compares their assumptions, strengths and uses, and introduces thematic analysis.
O: Distinguish quantitative and qualitative data and research
O: Explain how thematic analysis is carried out
O: Evaluate mixed-methods designs and triangulation
PRE: Interviews
H: Two kinds of data
- **Quantitative data** are numerical: scores, counts, reaction times. Analysed statistically; good for testing hypotheses, comparing groups and generalising.
- **Qualitative data** are non-numerical: words, images, observations. Analysed for meaning; good for exploring experiences, generating theory and understanding context.
H: Thematic analysis
P: Thematic analysis (Braun and Clarke, 2006) is a widely used qualitative method: become familiar with the data; generate initial codes; search for themes; review themes; define and name them; and write up with illustrative quotes. Researchers reflect on how their own position shapes interpretation (reflexivity).
X: A mixed-methods study of exam stress
> Quantitative: a survey of 500 students measures stress scores and links them to exam load.
> Qualitative: interviews with 20 students explore what makes exams stressful and what helps.
> Triangulation: both point to fear of letting family down, giving more confidence in the finding.
K: Quantitative and qualitative methods answer different questions; mixing them can combine generality with depth.
H: Evaluation
P: Quantitative research is reliable and generalisable but may miss meaning; qualitative research is rich and valid for experience but harder to generalise and replicate. Mixed methods can offer both, though they require more time and skills, and integrating different kinds of data can be difficult.
!: Treating qualitative research as unscientific. It follows systematic procedures and has its own quality criteria, such as transparency and reflexivity.
EV: established | Thematic analysis is a widely used, systematic method for analysing qualitative data.
EV: contested | Whether quantitative and qualitative research rest on compatible assumptions about knowledge is debated.
T: Quantitative data | Numerical data that can be analysed statistically
T: Qualitative data | Non-numerical data such as words or images, analysed for meaning
T: Triangulation | Using several methods or sources to check whether findings converge
SUM: Quantitative research measures; qualitative research explores meaning; each has strengths.
SUM: Thematic analysis is a systematic qualitative method; mixed methods combine approaches.
SRC: Braun V. and Clarke V., "Using thematic analysis in psychology", Qualitative Research in Psychology 3(2):77–101 | primary | 2006 | https://doi.org/10.1191/1478088706qp063oa
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
Q: What is triangulation? | Using several methods or data sources to check whether findings converge.
Q: Name the stages of thematic analysis. | Familiarisation, initial coding, searching for themes, reviewing themes, defining and naming themes, and writing up.
M1#teaching-u11-31-q1@1: Reaction times in milliseconds are… | Quantitative data | Qualitative data | Thematic data | Unstructured data | Numerical measures such as reaction times are quantitative data.
M2#teaching-u11-31-q2@2: A researcher wants to understand how people make sense of a new diagnosis. Which approach fits best? | Qualitative interviews analysed thematically | A laboratory reaction-time experiment | A correlational study of two scores | A national closed questionnaire only | Exploring meaning and experience suits qualitative methods.
SEQ2#teaching-u11-31-q3@2: Put the stages of thematic analysis in order. | Become familiar with the data ; Generate initial codes ; Search for themes ; Review and define themes ; Write up with quotes | Braun and Clarke describe a staged process moving from codes to themes.
M3#teaching-u11-31-q4@3: What is the main challenge of mixed-methods research? | Integrating different kinds of data | It can't produce quantitative data | It always contradicts itself | It forbids the use of interviews | Mixed methods require integration and resources, though they can give fuller answers.
SA3#teaching-u11-31-q5@3: Evaluate quantitative and qualitative approaches in psychology. | Quantitative: objective, reliable, generalisable, tests hypotheses; may miss meaning and context. Qualitative: rich, valid for experience, generates theory; harder to generalise and replicate, researcher interpretation. Mixed methods and triangulation combine strengths. | Quantitative strengths ; Quantitative limits ; Qualitative strengths ; Qualitative limits ; Mixed methods

## Random and stratified sampling
LV: Intermediate · Application
S: Sampling decides who takes part. Random and stratified sampling aim to produce samples that represent the target population. This lesson explains how each works and its strengths and limits.
O: Define target population and sample, and describe random and stratified sampling
O: Explain how to draw a random and a stratified sample
O: Evaluate the representativeness of random and stratified samples
PRE: Surveys and questionnaires
H: Population and sample
P: The **target population** is the group a study wants to draw conclusions about. A **sample** is the subset who take part. A **representative** sample resembles the population in relevant characteristics, so findings can be **generalised**.
H: Random sampling
P: In **random sampling**, every member of the target population has an equal chance of selection: list everyone (a **sampling frame**) and use a random number generator. It avoids researcher bias in choosing participants, but a small random sample can still be unrepresentative by chance, a full list may not exist, and selected people may decline.
H: Stratified sampling
P: In **stratified sampling**, the population is divided into **strata** (e.g. year groups, gender, ethnicity) and participants are randomly selected from each in proportion to their share of the population.
X: Stratifying a school sample
> A school has 600 students: 300 in Year 12 (50%) and 300 in Year 13 (50%), with 60% female overall.
> For a sample of 60, randomly select 30 from each year, with 18 girls and 12 boys in each year group to match the overall proportions.
> The sample matches the population on year group and sex by design.
K: Random sampling gives everyone an equal chance; stratified sampling guarantees key subgroups are represented in proportion.
!: Thinking random sampling guarantees a representative sample. It removes selection bias, but chance variation and refusals can still produce imbalance.
EV: established | Random selection removes researcher bias in choosing participants.
EV: contested | How much non-response undermines the representativeness of random samples in modern surveys is debated.
T: Target population | The group a study wants to draw conclusions about
T: Random sampling | A method in which every member of the population has an equal chance of selection
T: Stratified sampling | Random selection from subgroups in proportion to their share of the population
SUM: Random sampling gives every member an equal chance; stratified sampling represents subgroups proportionally.
SUM: Both need a sampling frame and are affected by refusals.
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
SRC: Coolican H., Research Methods and Statistics in Psychology, 7th edition, Routledge | secondary | 2019
Q: What is a sampling frame? | A list of all members of the target population from which a sample is drawn.
Q: How does stratified sampling work? | Divide the population into subgroups and randomly select from each in proportion to its share.
M1#teaching-u11-32-q1@1: In which method does every member of the population have an equal chance of selection? | Random sampling | Opportunity sampling | Volunteer sampling | Snowball sampling | Equal chance is the definition of random sampling.
NUM2#teaching-u11-32-q2@2: A workplace has 200 staff: 140 part-time and 60 full-time. In a proportional stratified sample of 40, how many full-time staff should be included? | 12 | 0 | staff | Full-time staff are 60/200 = 30% of the population; 30% of 40 is 12.
TF2#teaching-u11-32-q3@3: A random sample is always perfectly representative of its population. | false | Chance variation and refusals can still produce imbalance, especially in small samples.
M3#teaching-u11-32-q4@3: When is stratified sampling most valuable? | When a characteristic linked to the DV must be represented in proportion | When no list of the population exists | When the researcher wants a quick, cheap sample | When only volunteers can take part | Stratifying guarantees representation of key subgroups that affect the outcome.
SA2#teaching-u11-32-q5@2,3: Explain how you would draw a stratified sample of 100 from a university of 20,000 students, and one limitation. | Obtain a list (sampling frame); choose strata related to the topic (e.g. faculty and year); calculate each stratum's proportion; randomly select that proportion from each; limitation: requires detailed population data and those selected may refuse, reducing representativeness. | Sampling frame ; Strata chosen ; Proportional calculation ; Random selection within strata ; Limitation

## Opportunity and volunteer sampling
LV: Intermediate · Application
S: Opportunity and volunteer samples are quick and common in psychology, but they are rarely representative. This lesson explains both methods and the biases they introduce.
O: Describe opportunity and volunteer sampling
O: Explain how each method can bias a sample
O: Evaluate the use of convenience samples in psychological research
PRE: Random and stratified sampling
H: Opportunity sampling
P: **Opportunity sampling** selects whoever is available and willing at the time, such as students in a canteen. It is quick and easy, but the sample reflects where and when the researcher looked, and the researcher may approach people who seem friendly or similar to themselves (researcher bias).
H: Volunteer sampling
P: **Volunteer (self-selected) sampling** recruits people who respond to an advert or invitation. It can reach a wide range of people and participants are willing, but volunteers tend to differ from non-volunteers: often more motivated, interested in the topic, educated or with more free time (**volunteer bias**).
X: Recruiting for a study on sleep problems
> Opportunity sample: students in the library at 10 am, who may sleep differently from those still in bed.
> Volunteer sample: people answering an advert about sleep, who may have more sleep problems than average.
> Both samples could give misleading estimates of how common sleep problems are.
P: **Investigate with the lab.** Draw repeated opportunity and volunteer samples and compare their bias with random sampling.
K: Opportunity and volunteer samples are convenient but likely to be unrepresentative, so generalisation must be cautious.
H: Convenience in practice
P: Much psychological research uses university students, a convenient sample that is often WEIRD. For studying basic processes thought to be universal, this may matter less; for estimating how common something is, or for traits that vary with culture and age, it matters a great deal. Online panels widen access but bring their own biases.
!: Assuming a large volunteer sample is representative. Size doesn't fix self-selection bias.
EV: established | Volunteers differ systematically from non-volunteers on several characteristics.
EV: contested | How far findings from student samples generalise depends on the topic and is debated.
T: Opportunity sampling | Selecting whoever is available and willing at the time
T: Volunteer bias | Systematic differences between people who volunteer and those who don't
SUM: Opportunity and volunteer samples are quick and convenient but prone to bias.
SUM: Generalisation from them should be cautious, especially for prevalence estimates.
SRC: Henrich J., Heine S. J. and Norenzayan A., "The weirdest people in the world?", Behavioral and Brain Sciences 33(2–3):61–83 | primary | 2010 | https://doi.org/10.1017/S0140525X0999152X
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.2 "Approaches to research" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research
Q: What is volunteer bias? | Systematic differences between people who volunteer for research and those who don't.
Q: Give one advantage of opportunity sampling. | It is quick, cheap and easy to carry out.
M1#teaching-u11-33-q1@1: Asking people in a shopping centre to fill in a questionnaire is… | Opportunity sampling | Random sampling | Stratified sampling | Systematic sampling | Choosing whoever is available is opportunity sampling.
M2#teaching-u11-33-q2@2: An online advert recruits people for a study of anxiety, and 70% of volunteers report high anxiety. What is the most likely problem? | Volunteer bias | Random sampling error | Order effects | Cohort effects | People with anxiety may be more likely to respond to such an advert.
TF2#teaching-u11-33-q3@3: Recruiting a very large volunteer sample removes self-selection bias. | false | Size reduces random error but not systematic bias.
M3#teaching-u11-33-q4@3: When is a convenience sample of students least problematic? | When studying basic processes thought to work similarly across people | When estimating national rates of a disorder | When comparing cultures | When studying older adults' health | For universal processes it may matter less; for prevalence and cultural questions it matters a lot.
SA3#teaching-u11-33-q5@3: Evaluate the use of opportunity and volunteer samples in psychology. | Strengths: quick, cheap, accessible, willing participants. Weaknesses: unrepresentative; researcher bias in opportunity sampling; volunteer bias; WEIRD student samples; cautious generalisation, especially for prevalence. Acceptable for some basic-process research; replication with diverse samples needed. | Strengths ; Opportunity bias ; Volunteer bias ; WEIRD ; When acceptable
M2#teaching-u11-33-q6@1: Why are volunteer samples often biased? | Volunteers may differ systematically from non-volunteers | Volunteers are always too young | Volunteer samples are always too small | Volunteers never complete studies | Self-selection can over-represent certain kinds of people.

## Sample size
LV: Intermediate · Application
S: How many participants a study needs depends on the size of the effect it is looking for and how sure the researchers want to be of detecting it. This lesson explains why small samples are a problem and how power analysis sets sample size.
O: Explain why sample size affects the precision of estimates
O: Describe how power analysis is used to choose a sample size
O: Evaluate the consequences of underpowered research
PRE: Random and stratified sampling
H: Bigger samples, more precise estimates
P: Every sample differs from the population by chance (**sampling error**). Larger samples give more precise estimates: the standard error of a mean shrinks in proportion to the square root of the sample size, so quadrupling the sample halves the error. Small samples produce estimates that bounce around and may badly mislead.
H: Power analysis
P: **Statistical power** is the probability that a study will detect an effect if it really exists. Researchers use a **power analysis** before collecting data: given the expected effect size, the significance level (usually .05) and the desired power (often 80%), it calculates the sample size needed. Cohen (1992) gave simple tables: to detect a medium effect (d = 0.5) in a two-group comparison with 80% power at α = .05 needs about 64 participants per group.
X: Why small studies mislead
> A study with 15 per group has only about a one-in-four chance of detecting a medium effect.
> When such a study does find a significant result, the estimated effect is likely to be exaggerated (the winner's curse).
> Many small studies with exaggerated effects contributed to the replication crisis (Button et al., 2013).
P: Effect sizes for the power analysis should come from previous research or from the smallest effect that would matter in practice, rather than optimistic guesses.
P: **Investigate with the lab.** Draw hundreds of samples of different sizes and watch the standard error shrink.
K: Sample size should be set by power analysis; underpowered studies often miss real effects and exaggerate the ones they find.
!: Thinking a significant result from a small sample is "even more impressive". Small significant studies are more likely to overestimate effects or be false positives.
EV: established | About 64 participants per group are needed to detect a medium effect with 80% power (Cohen, 1992).
EV: established | Low statistical power is common in some areas of research and contributes to unreliable findings (Button et al., 2013).
T: Statistical power | The probability that a study detects an effect that really exists
T: Power analysis | A calculation of the sample size needed to achieve a given power
T: Sampling error | Chance differences between a sample and its population
SUM: Larger samples reduce sampling error; power analysis sets the size needed.
SUM: Underpowered studies miss real effects and exaggerate significant ones.
SRC: Cohen J., "A power primer", Psychological Bulletin 112(1):155–159 | primary | 1992 | https://doi.org/10.1037/0033-2909.112.1.155
SRC: Button K. S. et al., "Power failure: why small sample size undermines the reliability of neuroscience", Nature Reviews Neuroscience 14(5):365–376 | primary | 2013 | https://doi.org/10.1038/nrn3475
Q: What is statistical power? | The probability that a study will detect an effect that really exists.
Q: About how many participants per group are needed to detect a medium effect with 80% power? | About 64 per group (Cohen, 1992).
M1#teaching-u11-34-q1@1: Which three values are needed for a power analysis? | Effect size, alpha and power | Mean, mode and median | IV, DV and confounds | Sample, population and frame | These determine the sample size required.
NUM2#teaching-u11-34-q2@2: If quadrupling the sample halves the standard error, by what factor must the sample grow to cut the standard error to a third? | 9 | 0.5 | times | Standard error falls with √n, so a third of the error needs 3² = 9 times the sample.
TF2#teaching-u11-34-q3@3: Significant results from small studies tend to overestimate the true effect size. | true | Only large chance overestimates reach significance in small studies: the winner's curse.
M3#teaching-u11-34-q4@3: Why did low power contribute to the replication crisis? | Small studies inflated or invented effects | Large studies always find false effects | Power analysis was used too often | Replications used smaller samples | Underpowered studies inflated published effect sizes, so replications found smaller or no effects.
SA3#teaching-u11-34-q5@3: Explain how researchers should decide on sample size and the consequences of getting it wrong. | Conduct a power analysis using the expected effect size (from previous research or the smallest effect of interest), α (.05) and desired power (80% or more). Too small: low power, missed effects, exaggerated significant effects (winner's curse), contributing to replication failures. Too large: wastes resources and exposes more participants than needed. | Power analysis inputs ; Effect size source ; Underpowered consequences ; Winner's curse ; Overpowered or ethical consideration
M2#teaching-u11-34-q6@1: What happens to the standard error as sample size increases? | It decreases | It increases | It stays the same | It becomes negative | Standard error is proportional to 1 over the square root of the sample size.
## Reliability
LV: Intermediate · Application
S: Reliability is the consistency of a measure: whether it gives the same results under the same conditions. This lesson explains test–retest, inter-rater and internal reliability, and how each is assessed and improved.
O: Define reliability and distinguish test–retest, inter-rater and internal consistency
O: Explain how each type of reliability is assessed
O: Suggest ways to improve the reliability of a measure
PRE: Operationalisation
H: Types of reliability
- **Test–retest reliability**: the same people get similar scores when tested twice, some time apart (assessed by correlating the two sets of scores).
- **Inter-rater (inter-observer) reliability**: different raters or observers agree (assessed by correlation, percentage agreement or Cohen's kappa).
- **Internal consistency**: items in a scale that are meant to measure the same thing give consistent results (often assessed with Cronbach's alpha).
P: A common rule of thumb treats correlations of about .80 or higher as good test–retest reliability, though acceptable levels depend on the purpose of the measure.
X: Checking a new anxiety questionnaire
> Test–retest: 50 people complete it twice, two weeks apart; scores correlate at .85.
> Internal consistency: items correlate well with each other (alpha above .80).
> Inter-rater: not relevant for a self-report questionnaire, but essential if clinicians rate anxiety in interviews.
P: **Investigate with the lab.** See how a test's reliability sets the confidence band around a score.
K: Reliability is consistency: across time (test–retest), across raters (inter-rater) and across items (internal consistency).
H: Improving reliability
P: Clearer instructions and items, standardised procedures, training raters, clearer behavioural categories and adding more good items all improve reliability. Note that a measure can be reliable but not valid: a bathroom scale that always reads 2 kg too heavy is consistent but wrong.
!: Using a short gap for test–retest so that people just remember their answers, or a very long one in which the trait really changes. The interval must suit the construct.
EV: established | Reliability is necessary but not sufficient for validity.
EV: contested | Fixed cut-offs for "acceptable" reliability, such as .70 or .80, are conventions rather than rules.
T: Reliability | The consistency of a measure
T: Test–retest reliability | Consistency of scores when the same people are tested on two occasions
T: Internal consistency | The extent to which items in a scale measure the same construct consistently
SUM: Reliability can be assessed across time, raters and items.
SUM: It is improved by standardisation and clear items or categories; reliability doesn't guarantee validity.
SRC: Cronbach L. J., "Coefficient alpha and the internal structure of tests", Psychometrika 16(3):297–334 | primary | 1951 | https://doi.org/10.1007/BF02310555
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.3 "Analyzing findings" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-3-analyzing-findings
Q: What is test–retest reliability? | Consistency of scores when the same people are tested on two separate occasions.
Q: How is inter-rater reliability assessed? | By comparing independent raters' scores, using correlation, percentage agreement or Cohen's kappa.
M1#teaching-u11-35-q1@1: A measure that gives consistent results is… | Reliable | Valid | Generalisable | Standardised | Consistency is reliability; measuring the right thing is validity.
M2#teaching-u11-35-q2@2: Two psychologists diagnose the same 30 patients from recorded interviews and agree on only half. Which type of reliability is poor? | Inter-rater reliability | Test–retest reliability | Internal consistency | Ecological validity | Independent raters' judgements don't agree, so inter-rater reliability is poor.
TF2#teaching-u11-35-q3@3: A measure can be reliable without being valid. | true | It can consistently measure the wrong thing.
M3#teaching-u11-35-q4@3: Why is a very short interval a problem for test–retest reliability? | People may remember their answers, inflating consistency | The construct will have changed completely | It reduces the number of items | It makes the test less valid by definition | Memory for previous answers makes scores look more stable than the measure really is.
SA2#teaching-u11-35-q5@2,3: Explain how you would assess and improve the reliability of a structured observation of classroom behaviour. | Assess inter-observer reliability: two observers code the same lessons independently and compare (correlation or kappa). Improve: clearer operational categories, observer training, piloting, standardised sampling (time or event). Retest agreement after changes. | Inter-observer method ; Statistic used ; Clearer categories ; Training or piloting ; Recheck
M2#teaching-u11-35-q6@1: What does a test's reliability tell you? | How consistent its scores are | Whether it measures what it claims to | How long the test takes | How difficult the questions are | Reliability is consistency; validity is whether the test measures the right thing.

## Validity
LV: Intermediate · Evaluation
S: Validity is whether a study or measure actually captures what it claims to. This lesson distinguishes internal and external validity, and the main types of measurement validity, and explains how validity is assessed.
O: Define internal, external, ecological and population validity
O: Describe face, concurrent, predictive and construct validity of measures
O: Evaluate the validity of a study or measure and suggest improvements
PRE: Reliability
H: Validity of studies
- **Internal validity**: whether the IV, rather than something else, caused the change in the DV. Threatened by confounds, demand characteristics and investigator effects.
- **External validity**: whether findings generalise beyond the study: to other settings (**ecological validity**), other people (**population validity**) and other times (**temporal validity**).
H: Validity of measures
- **Face validity**: does the measure look as if it measures the construct? The weakest form.
- **Concurrent validity**: do scores agree with an established measure taken at the same time?
- **Predictive validity**: do scores predict future outcomes they should predict?
- **Construct validity**: does the measure behave as theory says the construct should, relating to some measures and not others (Cronbach and Meehl, 1955)?
X: Validating a new depression questionnaire
> Face: items ask about low mood and loss of interest.
> Concurrent: scores correlate strongly with an established depression scale.
> Predictive: high scores predict later contact with mental health services.
> Construct: scores relate more strongly to depression measures than to anxiety measures.
P: Validity and reliability are linked: an unreliable measure can't be valid, but a reliable one may still measure the wrong thing.
P: **Investigate with the lab.** Judge each invented study's internal and external validity.
K: Valid studies show real causes (internal validity) that generalise (external validity); valid measures capture the intended construct.
!: Treating face validity as enough. A measure that looks right can still fail to predict or relate to anything as it should.
EV: established | Construct validity requires a pattern of evidence, not a single correlation.
EV: contested | How to weigh internal against ecological validity in study design depends on research aims.
T: Internal validity | The extent to which the IV caused the change in the DV
T: External validity | The extent to which findings generalise beyond the study
T: Construct validity | The extent to which a measure behaves as the theory of the construct predicts
SUM: Internal validity concerns causation; external validity concerns generalisation.
SUM: Measures are validated through face, concurrent, predictive and construct evidence.
SRC: Cronbach L. J. and Meehl P. E., "Construct validity in psychological tests", Psychological Bulletin 52(4):281–302 | primary | 1955 | https://doi.org/10.1037/h0040957
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.3 "Analyzing findings" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-3-analyzing-findings
Q: What is internal validity? | The extent to which the IV, rather than other variables, caused the change in the DV.
Q: What is predictive validity? | The extent to which scores on a measure predict future outcomes they should predict.
M1#teaching-u11-36-q1@1: Whether findings from a 1960s study still apply today concerns… | Temporal validity | Face validity | Internal validity | Inter-rater reliability | Generalising across time is temporal validity.
M2#teaching-u11-36-q2@2: A new aptitude test correlates highly with an established test given on the same day. Which validity does this show? | Concurrent validity | Predictive validity | Face validity | Ecological validity | Agreement with an established measure at the same time is concurrent validity.
MATCH2#teaching-u11-36-q3@1,2: Match each threat or check to its type of validity. | A confound varies with the IV = Internal validity ; A study only used male students = Population validity ; Scores predict later job performance = Predictive validity ; A task is unlike real life = Ecological validity | Different validities concern causation, generalisation and measurement.
M3#teaching-u11-36-q4@3: Which would most improve the ecological validity of a laboratory memory study? | Meaningful material in an everyday setting | Using more nonsense syllables | Adding a stricter time limit | Recruiting only psychology students | Realistic materials and settings increase ecological validity, possibly at some cost to control.
SA3#teaching-u11-36-q5@3: Evaluate the validity of a laboratory study of eyewitness memory. | Internal validity: high control of verbs, random allocation. External: low ecological validity (film, no emotional stakes); population validity limited (students); temporal validity probably fine. Improvements: field studies of real witnesses, varied samples. | Internal validity ; Ecological validity ; Population validity ; Improvement ; Judgement
M2#teaching-u11-36-q6@1: What does ecological validity concern? | Whether findings generalise to real-life settings | Whether a test is consistent over time | Whether the sample is large enough | Whether the hypothesis is directional | Highly artificial tasks may not reflect everyday behaviour.

## Generalisability
LV: Intermediate · Evaluation
S: Generalisability is how far findings extend beyond the specific people, place and time studied. This lesson explains what limits generalisation, including WEIRD samples, and how researchers test it.
O: Define generalisability and identify factors that limit it
O: Explain the WEIRD sampling problem and its consequences
O: Evaluate strategies for increasing generalisability
PRE: Validity
H: How far do findings travel?
P: A finding is **generalisable** if it holds for other people (population), settings (ecological) and times (temporal). Generalisation depends on how the sample was chosen, how artificial the procedure was and whether the process studied is likely to vary across groups.
H: The WEIRD problem
P: Henrich, Heine and Norenzayan (2010) pointed out that most psychology participants come from **WEIRD** societies (Western, educated, industrialised, rich, democratic), a small and in some ways unusual slice of humanity. On several measures, including some visual illusions, fairness in economic games and how people think about the self, WEIRD samples differ from others.
X: Testing whether a finding generalises
> A finding: children in a US lab share more stickers with friends than strangers.
> Generalisation test: repeat the procedure in communities in several countries with different family structures.
> Result types: the effect may hold everywhere, vary in size, or reverse, and each tells us something.
P: **Investigate with the lab.** Look for the study with a WEIRD sample and consider who its findings apply to.
K: Findings generalise only as far as the sample, setting and process allow; cross-cultural and multi-site replication tests this directly.
H: Increasing generalisability
P: Strategies include diverse and representative sampling, multi-site collaborations across countries (such as the Many Labs projects), field studies, and stating clearly the limits of a sample ("constraints on generality"). Not every study must be universal, but claims should match the evidence.
!: Saying a finding "doesn't generalise" without evidence. Limited samples raise the question; testing answers it.
EV: established | Most psychological research has sampled people from WEIRD societies.
EV: contested | How often findings from WEIRD samples fail to generalise varies by topic and is debated.
T: Generalisability | The extent to which findings apply beyond the specific study
T: WEIRD | Western, educated, industrialised, rich and democratic populations
SUM: Generalisability depends on sample, setting, time and the process studied.
SUM: WEIRD sampling limits many claims; diverse, multi-site replication tests generality.
SRC: Henrich J., Heine S. J. and Norenzayan A., "The weirdest people in the world?", Behavioral and Brain Sciences 33(2–3):61–83 | primary | 2010 | https://doi.org/10.1017/S0140525X0999152X
SRC: Klein R. A. et al., "Many Labs 2: investigating variation in replicability across samples and settings", Advances in Methods and Practices in Psychological Science 1(4):443–490 | primary | 2018 | https://doi.org/10.1177/2515245918810225
Q: What does WEIRD stand for? | Western, educated, industrialised, rich and democratic.
Q: Name two ways to increase generalisability. | Any two of diverse sampling, multi-site or cross-cultural replication, field studies, stating constraints on generality.
M1#teaching-u11-37-q1@1: Whether findings apply to other groups of people concerns… | Population validity | Internal validity | Test–retest reliability | Face validity | Population validity is generalisation across people.
M2#teaching-u11-37-q2@2: A study of 40 undergraduates in one UK university finds a strong effect. What is the most appropriate claim? | It held here; generality needs testing | The effect is universal in humans | The effect is false | The effect applies only to psychology | Claims should match the sample; replication tests generality.
TF2#teaching-u11-37-q3@3: Multi-site replications can show whether an effect varies across samples and settings. | true | Running the same procedure in many places tests how far it generalises.
M3#teaching-u11-37-q4@3: Why does the WEIRD problem matter most for some topics more than others? | Culturally shaped processes vary more | WEIRD samples can't be tested in labs | Non-WEIRD participants can't take part in experiments | It only affects animal research | Generalisation is an empirical question that depends on whether the process varies across contexts.
SA3#teaching-u11-37-q5@3: Evaluate the claim that psychology's findings apply to all humans. | Many findings come from WEIRD samples; some differ across cultures (illusions, fairness, self-concept); others replicate widely. Multi-site replication (Many Labs) shows variation for some effects. Conclusion: generality must be tested, not assumed; claims should state constraints. | WEIRD evidence ; Examples of variation ; Examples of robustness ; Replication evidence ; Judgement
M2#teaching-u11-37-q6@1: What does WEIRD stand for in psychology? | Western, Educated, Industrialised, Rich, Democratic | Widely Examined, Independent, Reliable Data | Well Established In Research Designs | Western Experimental Investigations of Real Data | Many studies use samples unrepresentative of most people.

## Bias in research
LV: Intermediate · Evaluation
S: Bias is systematic error that pushes results in a particular direction. This lesson reviews biases at every stage of research, from sampling and measurement to analysis and publication, and the safeguards against them.
O: Identify sources of bias at each stage of research
O: Explain publication bias and its effect on the literature
O: Evaluate safeguards against bias, including blinding and registered reports
PRE: Confounding variables
H: Bias at every stage
- **Sampling bias**: the sample systematically differs from the population.
- **Measurement bias**: leading questions, social desirability, unreliable or culturally biased instruments.
- **Researcher bias**: expectations affecting how participants are treated or results recorded.
- **Participant bias**: demand characteristics and social desirability.
- **Analysis bias**: trying many analyses and reporting the ones that "work" (p-hacking).
- **Publication bias**: significant results are more likely to be published than null results.
H: Publication bias
P: If journals mainly publish significant findings, the published literature overstates how strong and how common effects are; null results sit in "file drawers". Meta-analyses can partly detect this using funnel plots, but can't fully correct it.
X: How publication bias distorts a literature
> Twenty small labs test an ineffective intervention; by chance one finds p < .05.
> That one study is published; nineteen null results aren't.
> Readers see "evidence" for the intervention that is entirely a product of selective publication.
P: **Investigate with the lab.** Find the key flaw in each invented study and name the type of bias.
K: Bias is systematic error; it can enter at sampling, measurement, analysis and publication, and good design, blinding and transparency are the safeguards.
H: Safeguards
P: Random sampling and allocation, standardised and validated measures, single- and double-blind procedures, preregistration of hypotheses and analyses, and **registered reports**, in which journals accept studies before the results are known, all reduce bias.
!: Equating bias with random error. Random error averages out with bigger samples; bias doesn't.
EV: established | Studies with significant results are more likely to be published than those with null results.
EV: contested | How large publication bias is in particular fields varies and is debated.
T: Publication bias | The tendency for significant results to be published more often than null results
T: p-hacking | Trying multiple analyses and reporting those that give significant results
T: Registered report | A study format in which a journal accepts the design before results are known
SUM: Bias can enter at every stage of research.
SUM: Publication bias distorts the literature; blinding, preregistration and registered reports reduce bias.
SRC: Simmons J. P., Nelson L. D. and Simonsohn U., "False-positive psychology: undisclosed flexibility in data collection and analysis allows presenting anything as significant", Psychological Science 22(11):1359–1366 | primary | 2011 | https://doi.org/10.1177/0956797611417632
SRC: Rosenthal R., "The file drawer problem and tolerance for null results", Psychological Bulletin 86(3):638–641 | primary | 1979 | https://doi.org/10.1037/0033-2909.86.3.638
Q: What is publication bias? | The tendency for significant results to be published more often than null results.
Q: What is a registered report? | A study accepted by a journal on the basis of its design before results are known.
M1#teaching-u11-38-q1@1: Reporting only the analyses that produced significant results is… | p-hacking | Counterbalancing | Debriefing | Triangulation | Selective analysis inflates false positives.
M2#teaching-u11-38-q2@2: A meta-analysis includes only published studies of a therapy, all positive. What is the main concern? | Unpublished null results may be missing, inflating the effect | The therapy must definitely work | Meta-analyses can't include therapy studies | The studies were too large | Publication bias can make an effect look stronger or more reliable than it is.
TF2#teaching-u11-38-q3@3: Bias, unlike random error, isn't reduced by increasing sample size. | true | Systematic error stays the same however many participants are added.
M3#teaching-u11-38-q4@3: Which safeguard directly addresses publication bias? | Registered reports | Larger font on questionnaires | Opportunity sampling | Testing participants in groups | Accepting studies on design means null results are published too.
SA3#teaching-u11-38-q5@3: Evaluate the main sources of bias in psychological research and how to reduce them. | Sources: sampling, measurement (social desirability), researcher expectations, participant demand, analysis (p-hacking), publication bias. Safeguards: random sampling and allocation, validated measures, blinding, preregistration, registered reports, data sharing. Some bias remains; transparency lets readers judge. | At least three sources ; Publication bias explained ; At least two safeguards ; Link between source and safeguard ; Judgement
M2#teaching-u11-38-q6@1: What are demand characteristics? | Cues that lead participants to guess the aim and change their behaviour | Requirements for ethical approval | The demands of the experimenter's schedule | Features of the statistical test used | Participants who work out the aim may behave unnaturally.

## Replication
LV: Intermediate · Evaluation
S: Replication means repeating a study to see whether its findings hold. This lesson explains direct and conceptual replication, the large replication projects of the 2010s and what they mean for psychology.
O: Distinguish direct and conceptual replication
O: Describe the findings of the Open Science Collaboration (2015)
O: Evaluate the causes of and responses to the replication crisis
PRE: Bias in research
H: Why replicate?
P: A single study can be wrong by chance, through bias or because of unnoticed features of its setting. **Direct (close) replication** repeats the original procedure as closely as possible with new participants. **Conceptual replication** tests the same idea with different methods or measures. Both are needed: direct replication checks the finding; conceptual replication checks the theory.
H: The replication crisis
P: In 2015 the Open Science Collaboration attempted close replications of 100 studies published in three psychology journals in 2008. About 97% of the original studies had reported significant results, but only about 36% of the replications did, and replication effect sizes were on average about half the originals. Other large projects (such as Many Labs) found that some effects replicated robustly while others didn't.
X: Why might a published effect fail to replicate?
> The original was a false positive, helped by small samples and flexible analysis.
> The original effect was real but smaller than reported (the winner's curse).
> Differences in sample, setting or procedure (hidden moderators) changed the effect.
P: **Investigate with the lab.** Find the underpowered and p-hacked studies, and consider why they might not replicate.
K: Replication tests whether findings are reliable; large projects found many published effects were weaker than reported, prompting reforms.
H: Responses
P: Reforms include larger samples and power analysis, preregistration, registered reports, open data and materials, and valuing replication studies. Some researchers argue the crisis was overstated, because replications can differ in important ways from originals; others see it as science correcting itself.
!: Concluding that a failed replication proves the original was false. It lowers confidence; several replications and meta-analysis give a clearer picture.
EV: established | About 36% of 100 replication attempts produced significant results (Open Science Collaboration, 2015).
EV: contested | How much failed replications reflect false originals rather than differences between studies is debated.
T: Direct replication | Repeating a study's procedure as closely as possible with new participants
T: Conceptual replication | Testing the same hypothesis with different methods or measures
T: Replication crisis | The discovery that many published findings failed to replicate
SUM: Direct and conceptual replication test findings and theories.
SUM: Large projects found low replication rates, prompting reforms in methods and publishing.
SRC: Open Science Collaboration, "Estimating the reproducibility of psychological science", Science 349(6251):aac4716 | primary | 2015 | https://doi.org/10.1126/science.aac4716
SRC: Klein R. A. et al., "Many Labs 2: investigating variation in replicability across samples and settings", Advances in Methods and Practices in Psychological Science 1(4):443–490 | primary | 2018 | https://doi.org/10.1177/2515245918810225
Q: What is a direct replication? | Repeating a study's procedure as closely as possible with new participants.
Q: Roughly what percentage of the 100 replications in the Open Science Collaboration (2015) were significant? | About 36%.
M1#teaching-u11-39-q1@1: Testing the same hypothesis with a different measure is a… | Conceptual replication | Direct replication | Pilot study | Meta-analysis | Changing methods while keeping the idea is conceptual replication.
M2#teaching-u11-39-q2@2: A famous priming effect fails to replicate in a large preregistered study. What is the most reasonable conclusion? | Confidence in the original effect should fall, pending further evidence | The original researchers must have committed fraud | The replication must be wrong | Priming effects can never be studied | One failure lowers confidence; patterns across studies decide.
TF2#teaching-u11-39-q3@1: In the Open Science Collaboration project, replication effect sizes were on average about half the original effect sizes. | true | Replications found effects roughly half as large on average.
M3#teaching-u11-39-q4@3: Which reform most directly reduces false positives in original studies? | Preregistration with adequate power | Publishing only significant results | Using smaller samples | Avoiding replication studies | Preregistration limits analytic flexibility and power reduces chance findings.
SA3#teaching-u11-39-q5@3: Evaluate what the replication crisis shows about psychology as a science. | Showed many effects weaker than published (OSC 2015: about 36% replicated); causes include small samples, p-hacking, publication bias, hidden moderators. Responses: preregistration, registered reports, open data, larger samples. Can be read as weakness or as self-correction; some effects robust (Many Labs). | Evidence ; Causes ; Reforms ; Robust findings ; Judgement
M2#teaching-u11-39-q6@1: Why might a study with a small sample fail to replicate? | Low power makes significant results more likely to be chance | Small samples always give exact results | Replications always use smaller samples | Small samples remove all bias | Underpowered studies that find effects often overestimate them.

## Preregistration
LV: Intermediate · Application
S: Preregistration means publicly recording a study's hypotheses, design and analysis plan before collecting or analysing data. This lesson explains how preregistration works, why it reduces bias and its limitations.
O: Define preregistration and describe what a preregistration includes
O: Explain how preregistration distinguishes confirmatory from exploratory analysis
O: Evaluate the benefits and limitations of preregistration
PRE: Replication
H: What gets preregistered
P: A **preregistration** is a time-stamped public record, often on the Open Science Framework, made before data collection or analysis. It typically states the hypotheses, design, sample size and its justification, how variables will be measured, exclusion rules and the exact analysis plan.
H: Confirmatory and exploratory
P: Preregistration makes clear which analyses were planned (**confirmatory**) and which were decided after seeing the data (**exploratory**). Both are valuable, but only confirmatory tests have the error rates their p-values claim. Without a plan, researchers can unconsciously choose analyses that produce significance (Simmons et al., 2011).
X: Preregistering a study on sleep and memory
> Hypothesis: participants who sleep after learning recall more words than those who stay awake.
> Plan: 60 per group (power analysis for d = 0.5); exclude participants who fail an attention check; independent t-test, one-tailed, α = .05.
> After data collection, an extra unplanned analysis by age is reported clearly as exploratory.
K: Preregistration records hypotheses and analyses in advance, separating confirmatory tests from exploration and reducing p-hacking.
H: Limitations
P: Preregistration doesn't prevent poor designs, may be vague, and deviations are sometimes not reported. It suits hypothesis-testing research better than exploratory or qualitative work, though adapted forms exist. Registered reports go further by having peer review before data collection.
!: Thinking preregistration forbids exploratory analysis. It allows it, as long as it is labelled as exploratory.
EV: established | Undisclosed analytic flexibility can greatly inflate false-positive rates (Simmons et al., 2011).
EV: contested | How much preregistration in practice improves research quality depends on how specific and how closely followed plans are.
T: Preregistration | A public, time-stamped record of hypotheses and analysis plans made before data collection
T: Confirmatory analysis | An analysis planned in advance to test a specific hypothesis
T: Exploratory analysis | An analysis decided after seeing the data, used to generate hypotheses
SUM: Preregistration records hypotheses, design and analysis plans in advance.
SUM: It separates confirmatory from exploratory analysis and reduces p-hacking, but isn't a cure-all.
SRC: Nosek B. A. et al., "The preregistration revolution", Proceedings of the National Academy of Sciences 115(11):2600–2606 | primary | 2018 | https://doi.org/10.1073/pnas.1708274114
SRC: Simmons J. P., Nelson L. D. and Simonsohn U., "False-positive psychology: undisclosed flexibility in data collection and analysis allows presenting anything as significant", Psychological Science 22(11):1359–1366 | primary | 2011 | https://doi.org/10.1177/0956797611417632
Q: What is preregistration? | A public, time-stamped record of a study's hypotheses, design and analysis plan made before data collection.
Q: What is the difference between confirmatory and exploratory analysis? | Confirmatory analyses are planned in advance to test hypotheses; exploratory ones are decided after seeing the data.
M1#teaching-u11-40-q1@1: Which is usually included in a preregistration? | The analysis plan and sample size | The final results | The discussion section | Participants' names | Plans, not results, are registered in advance.
M2#teaching-u11-40-q2@2: After seeing the data, a researcher tests whether the effect differs by gender, which wasn't planned. How should this be reported? | As an exploratory analysis | As the main confirmatory test | Not at all | As if it had been preregistered | Unplanned analyses are legitimate if labelled exploratory.
TF2#teaching-u11-40-q3@3: Preregistration prevents researchers from doing any exploratory analysis. | false | Exploration is allowed but must be clearly labelled.
M3#teaching-u11-40-q4@3: Why does preregistration help keep p-values meaningful? | The analysis is fixed before seeing data | It makes all results significant | It increases sample sizes automatically | It removes the need for statistics | Choosing analyses after seeing data inflates false positives beyond the nominal α.
SA2#teaching-u11-40-q5@2,3: Write a brief preregistration for a study testing whether background music affects reading comprehension. | Hypothesis: comprehension scores lower with lyrical music than silence. Design: independent groups, random allocation, 64 per group (power for d = 0.5, 80%). Measure: 20-item comprehension test. Exclusions: failed attention check. Analysis: one-tailed independent t-test at .05; any other analyses labelled exploratory. | Hypothesis ; Design and allocation ; Sample size justification ; Measures and exclusions ; Analysis plan

## Open science
LV: Intermediate · Evaluation
S: Open science is a set of practices that make research transparent, accessible and checkable: sharing data, materials, code and papers, and making plans public. This lesson explains its practices, aims and challenges.
O: Describe the main open science practices
O: Explain how open science improves the reliability of research
O: Evaluate the challenges of open science, including privacy and equity
PRE: Preregistration
H: Practices
- **Open data**: sharing anonymised datasets so others can check and reuse them.
- **Open materials and code**: sharing questionnaires, stimuli and analysis scripts so studies can be repeated exactly.
- **Preregistration and registered reports**.
- **Open access**: making papers free to read.
- **Preprints**: sharing papers publicly before peer review.
- **Transparent reporting**: following reporting guidelines and stating all measures and exclusions.
H: Why it matters
P: Openness lets others detect errors, reproduce analyses, combine data in meta-analyses and build on work efficiently. A manifesto for reproducible science (Munafò et al., 2017) argued that changes to methods, reporting, incentives and training were needed together. Many journals now award badges or require data availability statements.
X: Reproducing an analysis
> A published study shares its data and analysis code.
> Another researcher reruns the code and gets the same results (computational reproducibility).
> They notice an outlier that drives the effect and publish a comment; the field learns faster.
K: Open science makes research transparent and checkable, helping errors to be found and findings to be built on.
H: Challenges
P: Participant privacy limits what data can be shared, especially in clinical research; anonymisation must be careful. Sharing takes time and skills that aren't always rewarded. Some argue open access fees shift costs onto researchers and may disadvantage those with less funding.
!: Thinking open data means sharing everything. Data must be anonymised, and participants must have consented to sharing.
EV: established | Sharing data and code enables others to check and reproduce analyses.
EV: contested | How to balance openness with privacy and fair access to publishing is debated.
T: Open data | Research data shared publicly, after anonymisation, for checking and reuse
T: Preprint | A paper shared publicly before peer review
T: Computational reproducibility | Getting the same results by rerunning the original analysis on the original data
SUM: Open science shares data, materials, code, plans and papers.
SUM: It improves error detection and cumulative knowledge, but raises privacy and equity challenges.
SRC: Munafò M. R. et al., "A manifesto for reproducible science", Nature Human Behaviour 1:0021 | primary | 2017 | https://doi.org/10.1038/s41562-016-0021
SRC: Nosek B. A. et al., "Promoting an open research culture", Science 348(6242):1422–1425 | primary | 2015 | https://doi.org/10.1126/science.aab2374
Q: Name three open science practices. | Any three of open data, open materials and code, preregistration, registered reports, open access, preprints.
Q: What is computational reproducibility? | Getting the same results by rerunning the original analysis on the original data.
M1#teaching-u11-41-q1@1: Sharing a study's analysis scripts online is an example of… | Open code | Publication bias | p-hacking | Attrition | Sharing scripts lets others check and reproduce analyses.
M2#teaching-u11-41-q2@2: A clinical trial team wants to share data openly. What must they ensure first? | Anonymisation and consent to share | Results are significant | Only positive findings are shared | Participants' names are included | Privacy and consent come before openness.
TF2#teaching-u11-41-q3@2: Preprints have been peer reviewed by a journal. | false | Preprints are shared before peer review.
M3#teaching-u11-41-q4@3: Which is the strongest challenge to open data in psychology? | Protecting participants' privacy, especially with sensitive data | Data can't be stored digitally | Nobody would ever reuse data | Open data makes studies impossible to replicate | Privacy, consent and re-identification risks limit what can be shared.
SA3#teaching-u11-41-q5@3: Evaluate open science as a response to the replication crisis. | Benefits: transparency, error detection, reproducibility, cumulative science, reduced selective reporting (preregistration). Challenges: privacy, effort and incentives, equity of open access costs, doesn't fix weak designs alone. Overall: a necessary but not sufficient reform. | Practices ; Benefits ; Privacy ; Incentives or equity ; Judgement

## Informed consent
LV: Introductory · Foundation
S: Informed consent means participants agree to take part knowing what the research involves, its risks and their rights. This lesson explains what valid consent requires under the BPS Code of Human Research Ethics, and how consent works when full information can't be given.
O: Describe the elements of valid informed consent
O: Explain the right to withdraw and how it is protected
O: Evaluate alternatives when fully informed consent isn't possible
PRE: The aims of psychological research
H: What consent requires
P: Under the British Psychological Society's **Code of Human Research Ethics** (2021), participants should be told, in language they understand, the aims of the research, what they will be asked to do, any risks or discomfort, how their data will be used and stored, and their **right to withdraw**. Consent must be **voluntary**, without pressure or excessive incentives, and given by someone with the **capacity** to decide. It is usually recorded in writing or online.
H: The right to withdraw
P: Participants can stop at any time without giving a reason or losing any promised payment, and can usually ask for their data to be removed up to a stated point (for example, before analysis or anonymisation).
X: Consent in an online study
> An information page explains the 20-minute task, that questions cover mood, and that responses are anonymous.
> Participants tick boxes confirming they understand, are over 18, and know they can close the browser at any time.
> A participant code allows data withdrawal for two weeks, after which data are merged and can't be removed.
K: Informed consent must be informed, voluntary and given with capacity, and includes the right to withdraw.
H: When full information isn't possible
P: Sometimes telling participants the exact aim would change their behaviour. Alternatives include **prior general consent** (agreeing in advance to studies that may involve deception), **presumptive consent** (asking similar people whether they would find the study acceptable) and **retrospective consent** (asking after debriefing). Each is weaker than full consent and needs ethical approval.
!: Assuming payment means people have consented to anything. Incentives must not be so large that people feel unable to refuse.
EV: established | Voluntary informed consent is a core requirement of research ethics codes, including the BPS Code.
EV: contested | Whether presumptive and retrospective consent adequately protect participants is debated.
T: Informed consent | Voluntary agreement to take part, based on understanding what the research involves
T: Right to withdraw | Participants' right to stop taking part, and usually to remove their data, without penalty
T: Presumptive consent | Inferring consent by asking similar people whether they would agree
SUM: Valid consent is informed, voluntary and given with capacity, and includes the right to withdraw.
SUM: Alternatives such as prior general, presumptive and retrospective consent are weaker and need approval.
SRC: British Psychological Society, Code of Human Research Ethics | standard | 2021
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.4 "Ethics" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-4-ethics
Q: Name three things participants should be told before consenting. | Any three of the aims, what they'll do, risks, how data are used and stored, their right to withdraw.
Q: What is retrospective consent? | Asking participants for consent after they have taken part and been debriefed.
M1#teaching-u11-42-q1@1: Which is required for valid informed consent? | Voluntary agreement based on understanding | Agreement given under pressure | A signature only, without information | Consent from the researcher | Consent must be informed, voluntary and given with capacity to decide.
M2#teaching-u11-42-q2@2: A lecturer recruits students for their own study and says participation will boost course marks. What is the problem? | Pressure undermines voluntary consent | Students can't give consent | No information is needed | Payment is always forbidden | A power relationship and a large incentive can make refusal feel impossible.
TF1#teaching-u11-42-q3@1: Participants can withdraw from a study without giving a reason. | true | The right to withdraw doesn't require justification.
M3#teaching-u11-42-q4@3: When is presumptive consent most likely to be acceptable? | When risk is low and full information impossible | When participants are children | Whenever researchers prefer not to explain the aims | When the study involves serious distress | Weaker forms of consent need justification, low risk and approval.
SA2#teaching-u11-42-q5@2,3: Write the key points of an information sheet for a study on stress and sleep. | Aim (how stress relates to sleep); what participants do (questionnaire, one-week sleep diary); risks (thinking about stress; signposting support); data (anonymous, stored securely, used for research); right to withdraw at any time and remove data until a stated date; contact details; ethics approval. | Aim ; Procedure ; Risks and support ; Data handling ; Right to withdraw

## Confidentiality
LV: Introductory · Foundation
S: Confidentiality means protecting participants' personal information and ensuring they can't be identified in reports. This lesson explains anonymity, confidentiality, data protection law and the limits of confidentiality.
O: Distinguish confidentiality from anonymity
O: Explain how researchers protect participants' data under UK data protection law
O: Evaluate the limits of confidentiality, including risk of harm
PRE: Informed consent
H: Confidentiality and anonymity
P: **Anonymity** means no one, including the researchers, can link data to a participant (no names collected). **Confidentiality** means the researcher may know who participants are, but keeps that information private and doesn't identify them in reports. Researchers often use participant codes and store identifying information separately from data.
H: Data protection
P: In the UK, personal data are protected by the **UK GDPR** and the **Data Protection Act 2018**. Researchers must have a lawful basis for processing, collect only what is needed, store data securely, keep it no longer than necessary and tell participants how it will be used.
X: Deductive disclosure
> A report describes "a 52-year-old male head teacher in a small Cornish village".
> No name is given, but local readers could identify him.
> Researchers must remove or change details that make identification possible, especially in small populations and case studies.
K: Confidentiality protects participants' identity and data; anonymity means data can't be linked to them at all.
H: Limits of confidentiality
P: Confidentiality isn't absolute. If a participant discloses a serious risk of harm to themselves or others (such as a child at risk), researchers may need to act. The BPS Code advises that participants should be told the limits of confidentiality before taking part.
!: Thinking removing names is enough. Combinations of details can identify people.
EV: established | UK research involving personal data must comply with the UK GDPR and Data Protection Act 2018.
EV: contested | How to anonymise rich qualitative data without losing meaning is an ongoing challenge.
T: Anonymity | Data can't be linked to any individual participant
T: Confidentiality | Keeping participants' identities and personal information private
T: Deductive disclosure | Identifying a participant from a combination of details in a report
SUM: Confidentiality keeps identities private; anonymity means data can't be linked to anyone.
SUM: Data protection law governs storage and use; confidentiality has limits where there is risk of harm.
SRC: Data Protection Act 2018, c. 12 | legislation | 2018 | https://www.legislation.gov.uk/ukpga/2018/12/contents
SRC: British Psychological Society, Code of Human Research Ethics | standard | 2021
Q: What is the difference between anonymity and confidentiality? | Anonymity means data can't be linked to anyone; confidentiality means identities are known to researchers but kept private.
Q: When might confidentiality be broken? | When a participant discloses a serious risk of harm to themselves or others.
M1#teaching-u11-43-q1@1: Which UK law, alongside the UK GDPR, governs personal data in research? | The Data Protection Act 2018 | The Equality Act 2010 | The Human Tissue Act 2004 | The Mental Health Act 1983 | The Data Protection Act 2018 sits alongside the UK GDPR.
M2#teaching-u11-43-q2@2: A study names a small town and describes "the only female GP" there. What is the problem? | Deductive disclosure could identify her | It breaches the right to withdraw | It is a demand characteristic | It is a cohort effect | Combined details make identification possible.
TF2#teaching-u11-43-q3@3: Researchers should promise participants absolute confidentiality whatever they disclose. | false | Participants should be told the limits, such as serious risk of harm.
M3#teaching-u11-43-q4@3: Which practice best protects confidentiality in an interview study? | Storing consent forms separately from coded transcripts | Using participants' first names in quotes | Keeping data on an unencrypted shared drive | Sharing recordings with anyone who asks | Separating identifiers from data and storing them securely protects identity.
SA2#teaching-u11-43-q5@2,3: Explain how you would protect confidentiality in a qualitative study of young carers. | Use codes, not names; store consent forms separately and securely (encrypted); remove or change identifying details in quotes to avoid deductive disclosure; follow UK GDPR; explain limits of confidentiality (safeguarding) and how disclosures would be handled; plan data retention and deletion. | Codes and secure storage ; Anonymising quotes ; Data protection law ; Limits of confidentiality ; Safeguarding plan

## Deception and debriefing
LV: Intermediate · Evaluation
S: Deception means misleading participants about a study, and debriefing means explaining the study fully afterwards. This lesson explains when deception may be justified, what a good debrief includes and the debates around classic deceptive studies.
O: Describe the conditions under which deception may be permitted
O: Explain what a debrief should include
O: Evaluate the use of deception in psychological research
PRE: Informed consent
H: Deception
P: **Deception** includes withholding information about the aims or giving false information (for example, a cover story or a confederate). The BPS Code accepts that some studies can't be done without it, but deception should be used only when it is scientifically necessary, there is no non-deceptive alternative, the risk is low, and an ethics committee has approved it. Participants should not be deceived about anything likely to make them unwilling to take part.
H: Debriefing
P: A **debrief** at the end should explain the true aims, reveal any deception and why it was needed, check participants' wellbeing, answer questions, remind them of their right to withdraw their data, and offer support or contact details if the study could have caused distress.
X: Milgram's obedience study and its ethics
> Participants were told the study was about learning and that they were giving real shocks; neither was true.
> Many showed extreme stress (sweating, trembling, nervous laughter).
> Baumrind (1964) argued the deception and distress were unjustifiable; Milgram replied that participants were debriefed and that 84% said afterwards they were glad to have taken part.
K: Deception may be justified only when necessary, low-risk and approved, and must be followed by a full debrief.
H: Evaluation
P: Arguments for: some important behaviour (such as conformity and obedience) can't be studied if participants know the aim. Arguments against: deception undermines trust in researchers and consent, and repeated deception may make participants suspicious, reducing validity. Economics research generally bans deception for this reason, while psychology permits it under strict conditions.
!: Thinking a debrief makes any deception acceptable. Debriefing reduces harm; it doesn't justify unnecessary or harmful deception.
EV: established | Psychology ethics codes permit deception only when necessary, low risk and approved, followed by debriefing.
EV: contested | Whether deception is ever justified, and whether it harms trust in research, is debated across disciplines.
T: Deception | Withholding information or misleading participants about a study
T: Debrief | A full explanation of the study at the end, including any deception, with a wellbeing check
SUM: Deception is permitted only when necessary, low risk and approved.
SUM: A thorough debrief explains the truth, checks wellbeing and restores the right to withdraw data.
SRC: Baumrind D., "Some thoughts on ethics of research: after reading Milgram's 'Behavioral study of obedience'", American Psychologist 19(6):421–423 | primary | 1964 | https://doi.org/10.1037/h0040128
SRC: Milgram S., "Issues in the study of obedience: a reply to Baumrind", American Psychologist 19(11):848–852 | primary | 1964 | https://doi.org/10.1037/h0044954
Q: Give three conditions for using deception in research. | Any three of scientifically necessary, no non-deceptive alternative, low risk, ethics approval, followed by debriefing.
Q: What should a debrief include? | The true aims, any deception and why, a wellbeing check, answers to questions, the right to withdraw data and support details.
M1#teaching-u11-44-q1@1: Using a cover story about the study's aim is a form of… | Deception | Debriefing | Counterbalancing | Anonymity | A cover story misleads participants about the aim.
M2#teaching-u11-44-q2@2: After a study that told participants they had failed a test (they hadn't), what is essential? | A debrief explaining the deception and checking wellbeing | Nothing, if they signed a consent form | Keeping the deception secret | Testing them again immediately | False negative feedback can affect self-esteem, so a careful debrief is needed.
TF2#teaching-u11-44-q3@3: A thorough debrief makes any amount of deception acceptable. | false | Debriefing reduces harm but doesn't justify unnecessary or harmful deception.
M3#teaching-u11-44-q4@3: Which is the strongest argument against deception, beyond harm to individuals? | It can erode trust in researchers and make future participants suspicious | It always makes studies cheaper | It makes debriefing unnecessary | It increases demand characteristics in every case | Repeated deception may reduce trust and change how participants behave in future studies.
SA3#teaching-u11-44-q5@3: Evaluate the use of deception in psychological research, with reference to Milgram. | For: some behaviours can't be studied otherwise; Milgram's findings were important; debriefing; most participants glad to have taken part. Against: distress and lack of informed consent (Baumrind); erodes trust; repeated deception may reduce validity; economics bans it. Conclusion: only when necessary, low risk, approved, with full debrief. | Arguments for ; Milgram evidence ; Baumrind's critique ; Trust or validity ; Conditions for acceptable use

## Vulnerable participants
LV: Intermediate · Application
S: Some participants need extra protection because their capacity to consent is limited or they face greater risk: children, people with some cognitive impairments or mental health conditions, prisoners and others in dependent relationships. This lesson explains how research with vulnerable participants is made ethical.
O: Identify groups who may be vulnerable in research and why
O: Explain the additional safeguards required for research with children and adults lacking capacity
O: Evaluate the balance between protecting vulnerable people and including them in research
PRE: Informed consent
H: Who may be vulnerable
P: Vulnerability can come from limited **capacity to consent** (young children, some people with dementia or learning disabilities), increased **risk of harm** (people in mental health crisis), or **dependent relationships** that make refusal hard (patients asked by their clinician, students by their lecturer, prisoners).
H: Safeguards
- **Children**: consent from a parent or guardian for those under 16 (as the BPS Code advises), plus the child's own **assent** in age-appropriate language; respecting a child's wish to stop.
- **Adults who may lack capacity**: in England and Wales, research involving adults lacking capacity is governed by the **Mental Capacity Act 2005**, which requires approval by an appropriate body and consultation with someone close to the person.
- **Dependent relationships**: recruitment by someone without power over the participant.
- Additional ethical review, minimised risk and access to support.
X: Research with people with dementia
> Capacity is assessed for each decision, not assumed lost.
> Where someone lacks capacity, a personal consultee (such as a family member) is asked for advice.
> Any sign of distress or objection means stopping, whatever was agreed earlier.
K: Vulnerable participants need extra safeguards: appropriate consent or assent, approval, minimised risk and protection from pressure.
H: Protection versus inclusion
P: Excluding vulnerable groups entirely protects them from research risks but leaves them without evidence about their own needs and treatments. Ethics codes aim to include them safely rather than exclude them.
!: Assuming everyone with a diagnosis lacks capacity. Capacity is decision-specific and must be assessed, not assumed.
EV: established | Research involving adults who lack capacity in England and Wales is governed by the Mental Capacity Act 2005.
EV: contested | How to balance protection with the right of vulnerable groups to take part in research is debated.
T: Assent | A child's or vulnerable person's agreement to take part, alongside formal consent from another
T: Capacity | The ability to understand, retain and weigh information to make a particular decision
SUM: Vulnerability arises from limited capacity, higher risk or dependent relationships.
SUM: Safeguards include parental consent and child assent, legal procedures for adults lacking capacity, and independent recruitment.
SRC: Mental Capacity Act 2005, c. 9 | legislation | 2005 | https://www.legislation.gov.uk/ukpga/2005/9/contents
SRC: British Psychological Society, Code of Human Research Ethics | standard | 2021
Q: What is assent? | A child's or vulnerable person's own agreement to take part, alongside formal consent from someone else.
Q: Which law governs research with adults lacking capacity in England and Wales? | The Mental Capacity Act 2005.
M1#teaching-u11-45-q1@1: Why may prisoners be considered vulnerable participants? | They may find it hard to refuse because of their dependent situation | They are always unable to understand information | They are under 16 | They have no legal rights | Dependent relationships can undermine voluntary consent.
M2#teaching-u11-45-q2@2: A 9-year-old's parent consents, but the child says they don't want to continue. What should happen? | Stop: the child's wish to withdraw should be respected | Continue because the parent consented | Offer a larger reward to continue | Ask the parent to persuade them | Assent and the right to withdraw apply to children too.
TF2#teaching-u11-45-q3@3: Having a diagnosis of dementia means a person automatically lacks capacity to consent. | false | Capacity is decision-specific and must be assessed.
M3#teaching-u11-45-q4@3: What is the main argument for including vulnerable groups in research rather than excluding them? | Otherwise they lack evidence about their care | They are easier to recruit than other groups | Research with them needs no ethical review | They can't experience harm | Exclusion can leave groups without evidence-based care; ethics aims for safe inclusion.
SA2#teaching-u11-45-q5@2,3: Explain the safeguards needed for a study of anxiety in 12-year-olds. | Parental consent and the child's own assent in age-appropriate language; school permission; low-risk measures; right to withdraw respected; trained researchers with safeguarding checks; plan for distress or disclosures; confidentiality limits explained; ethics committee approval. | Parental consent ; Child assent ; Right to withdraw ; Safeguarding and distress ; Ethics approval

## Research governance and ethics committees
LV: Intermediate · Application
S: Research governance is the system of rules, review and accountability that oversees research. This lesson explains how ethics committees review studies, what they look for, and the wider framework of codes and law.
O: Describe the role of research ethics committees and the review process
O: Explain the frameworks that govern psychological research in the UK
O: Evaluate the strengths and limitations of ethical review
PRE: Informed consent
H: Ethics committees
P: Before a study begins, researchers submit a proposal to a **research ethics committee** (REC): a university committee for most student and staff research, or an NHS REC, coordinated by the Health Research Authority, for research involving NHS patients or staff. The committee weighs risks against benefits and checks consent procedures, confidentiality, data management, deception, debriefing and safeguards for vulnerable participants. It can approve, request changes or reject.
H: The wider framework
- **Professional codes**: the BPS Code of Human Research Ethics, based on respect, scientific integrity, social responsibility and maximising benefit while minimising harm.
- **Law**: data protection (UK GDPR and Data Protection Act 2018), the Mental Capacity Act 2005, and laws on research with human tissue.
- **International statements**: the World Medical Association's Declaration of Helsinki on medical research involving people.
X: A student project's journey
> A student plans an online survey on stress.
> They complete an ethics form: aims, procedure, information sheet, consent form, debrief and data plan.
> The committee asks them to add support contacts for distressed participants; after revision, the study is approved.
K: Ethics committees independently review research before it starts, applying professional codes and law to protect participants.
H: Evaluation
P: Strengths: independent scrutiny protects participants and researchers and maintains public trust. Limitations: review can be slow and bureaucratic; committees can be overcautious, blocking valuable research; review happens before the study, so ongoing monitoring depends on researchers; and standards differ between institutions and countries.
!: Treating ethical approval as the end of ethical responsibility. Researchers must act ethically throughout and report problems.
EV: established | NHS research ethics review in the UK is coordinated by the Health Research Authority.
EV: contested | Whether ethics review is sometimes too cautious, delaying low-risk research, is debated.
T: Research ethics committee | An independent group that reviews research proposals for ethical acceptability
T: Research governance | The framework of rules, review and accountability for conducting research
SUM: Ethics committees review proposals against professional codes and law before research begins.
SUM: Review protects participants but can be slow or overcautious, and ethical responsibility continues during the study.
SRC: Health Research Authority, "Research Ethics Committees" | guidance | 2026-11 | https://www.hra.nhs.uk/
SRC: British Psychological Society, Code of Human Research Ethics | standard | 2021
Q: What does a research ethics committee do? | Independently reviews research proposals, weighing risks and benefits and checking consent, confidentiality and safeguards.
Q: Which body coordinates NHS research ethics review in the UK? | The Health Research Authority (HRA).
M1#teaching-u11-46-q1@1: Which document sets out ethical principles for psychological research in the UK? | The BPS research ethics code | The Mental Health Act | The Equality Act | The National Curriculum | The BPS Code is the professional standard for research.
M2#teaching-u11-46-q2@2: A study involves interviewing NHS patients on a hospital ward. Which review is needed? | An NHS research ethics committee, via the HRA | No review, if the patients agree | Only the researcher's line manager | A newspaper editor | NHS patient research needs NHS ethical review.
TF2#teaching-u11-46-q3@3: Once a study is approved, researchers have no further ethical responsibilities. | false | Ethical conduct and reporting of problems continue throughout the research.
M3#teaching-u11-46-q4@3: Which is the strongest criticism of ethics review systems? | They can be slow and overcautious | They provide independent scrutiny | They protect vulnerable participants | They check consent procedures | Critics argue bureaucracy can hinder valuable research, though scrutiny is necessary.
SA3#teaching-u11-46-q5@3: Evaluate the role of ethics committees in psychological research. | Strengths: independent scrutiny, risk–benefit weighing, protecting participants and trust, applying codes and law. Limitations: delays, bureaucracy, overcaution, inconsistency between institutions, limited monitoring after approval. Conclusion: essential, but responsibility also lies with researchers. | Role ; Strength ; Limitation ; Monitoring ; Judgement
`;
