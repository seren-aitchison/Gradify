// School 16: Contemporary Psychology. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md), with evidence
// status (EV:) and questions at three levels in every lesson. Explanations are original; statistics carry their year and
// source; sources are pending human verification (qa.js). Level: A level to first-year undergraduate.
export default `

## Cognitive neuroscience today
LV: Intermediate · Evaluation
S: Cognitive neuroscience links mental processes to brain activity. This lesson examines current methods, large-scale studies and debates about what brain imaging can tell us.
O: Describe current methods in cognitive neuroscience
O: Explain the problem of small samples and reproducibility in brain imaging
O: Evaluate claims about localisation and brain networks
PRE: Brain imaging: EEG, MRI, fMRI and PET
H: Methods and approaches
P: Cognitive neuroscience combines **imaging** (fMRI, EEG, MEG), **brain stimulation** (TMS), **lesion** studies and **computational** modelling. Research has shifted from finding single brain "centres" for functions towards studying **networks**: distributed sets of regions that work together, such as the default mode network and attention networks. Large projects, such as the Human Connectome Project and UK Biobank, scan thousands of people.
H: Sample size and reproducibility
P: Button et al. (2013) showed that many neuroscience studies had low **statistical power** because of small samples, making findings less likely to be true and effect sizes likely to be inflated. Marek et al. (2022) found that **brain-wide association studies**, linking individual differences in brain structure or function to traits, need thousands of participants to produce reproducible results.
X: Reverse inference
> **Reverse inference** reasons from brain activity to mental state: "the amygdala was active, so participants were afraid".
> Because most regions are involved in many functions, this reasoning is often weak.
> Poldrack (2006) argued reverse inference should be used cautiously and checked against databases of many tasks.
H: Evaluation
P: Cognitive neuroscience has advanced understanding of memory, attention and emotion, and network approaches better reflect how the brain works. But small samples, flexible analysis and reverse inference have produced unreliable claims. Larger samples, preregistration and data sharing are improving the field.
K: Cognitive neuroscience uses imaging, stimulation, lesions and models; research has moved from localisation to networks; small samples undermine reliability; reverse inference needs caution.
!: Treating brain activity as direct proof of a mental state. Most regions serve many functions.
EV: established | Marek et al. (2022) found brain-wide association studies need thousands of participants to be reproducible.
EV: contested | How far mental functions can be localised to specific brain regions is debated.
T: Statistical power | The probability that a study detects a real effect
T: Reverse inference | Inferring a mental state from observed brain activity
T: Brain network | A set of regions that work together
SUM: Methods include imaging, stimulation, lesions and models; networks over centres.
SUM: Small samples undermine reliability; reverse inference needs caution.
SRC: Button K. S. et al., "Power failure: why small sample size undermines the reliability of neuroscience", Nature Reviews Neuroscience 14(5):365–376 | primary | 2013 | https://doi.org/10.1038/nrn3475
SRC: Marek S. et al., "Reproducible brain-wide association studies require thousands of individuals", Nature 603:654–660 | primary | 2022 | https://doi.org/10.1038/s41586-022-04492-9
SRC: Poldrack R. A., "Can cognitive processes be inferred from neuroimaging data?", Trends in Cognitive Sciences 10(2):59–63 | primary | 2006 | https://doi.org/10.1016/j.tics.2005.12.004
Q: What is reverse inference? | Inferring a mental state from observed brain activity.
Q: What did Marek et al. (2022) find? | Brain-wide association studies need thousands of participants to give reproducible results.
M1#psychology-u16-01-q1@1: The probability that a study detects a real effect is its… | Statistical power | Reverse inference | Effect size | Reliability coefficient | Statistical power is the chance of detecting a real effect and depends heavily on sample size.
M2#psychology-u16-01-q2@2: A news story claims "scientists found the love centre" because one region lit up when people saw partners. This relies on… | Reverse inference | Lesion evidence | Brain stimulation | A large sample | Inferring love from activity is reverse inference.
TF2#psychology-u16-01-q3@2: Button et al. found many neuroscience studies had high statistical power. | false | They found many had low power because of small samples.
M3#psychology-u16-01-q4@3: Why has research shifted from brain "centres" to networks? | Functions depend on distributed regions working together | Each function has exactly one region | Brain networks don't exist at all | Imaging can't detect any regions | Distributed activity better explains cognition.
SA3#psychology-u16-01-q5@3: Evaluate the contribution of contemporary cognitive neuroscience. | Methods; shift to networks; large projects; power and sample size (Button, Marek); reverse inference (Poldrack); improvements; judgement. | Methods ; Reliability ; Inference ; Judgement

## Computational psychology
LV: Advanced · Evaluation
S: Computational psychology uses mathematical and computer models to explain how the mind works. This lesson examines what models are for, examples of computational models and their strengths and limits.
O: Explain the purpose of computational models in psychology
O: Describe examples of computational models of learning and decision-making
O: Evaluate the strengths and limits of computational approaches
PRE: The information-processing approach
H: Why build models?
P: A **computational model** specifies a theory precisely enough to be run as a program. This forces theories to be explicit, allows **quantitative predictions** and lets researchers compare competing explanations against data. Marr (1982) distinguished three levels of explanation: **computational** (what problem is solved and why), **algorithmic** (how it is solved) and **implementational** (how the brain does it).
H: Examples
P: **Reinforcement learning** models describe how agents learn from rewards using **prediction errors**: the difference between expected and actual outcomes. Dopamine neurons appear to signal reward prediction errors. **Drift diffusion models** describe decisions as evidence accumulating over time until it reaches a threshold, predicting both choices and reaction times.
X: A worked prediction error
> A participant expects a reward of 5 points from a choice but receives 8.
> The prediction error is 8 − 5 = +3, so the model increases the expected value of that choice.
> If the learning rate is 0.5, the new expectation is 5 + 0.5 × 3 = 6.5. This example is illustrative.
H: Evaluation
P: Models make theories precise and testable and link behaviour to brain activity. But a model that fits data well isn't necessarily true: different models can fit the same data, and complex models can **overfit**. Models also simplify, leaving out emotion, context and individual differences unless these are built in.
K: Computational models make theories precise and testable; Marr's three levels guide explanation; reinforcement learning and drift diffusion models explain learning and choice; good fit isn't proof.
!: Assuming a model that fits data must be correct. Other models may fit equally well.
EV: established | Reinforcement learning models use prediction errors to describe learning from rewards.
EV: contested | How far computational models capture real mental processes rather than just fitting data is debated.
T: Computational model | A theory specified precisely enough to run as a program
T: Prediction error | The difference between expected and actual outcomes
T: Overfitting | A model fitting noise in data rather than the underlying process
SUM: Models make theories explicit and testable; Marr's three levels.
SUM: Reinforcement learning and drift diffusion; fit isn't proof.
SRC: Marr D., Vision, W. H. Freeman | primary | 1982
SRC: Schultz W., Dayan P. and Montague P. R., "A neural substrate of prediction and reward", Science 275(5306):1593–1599 | primary | 1997 | https://doi.org/10.1126/science.275.5306.1593
SRC: Farrell S. and Lewandowsky S., Computational Modeling of Cognition and Behavior, Cambridge University Press | secondary | 2018
Q: What are Marr's three levels of explanation? | Computational, algorithmic and implementational.
Q: What is a prediction error? | The difference between an expected and an actual outcome.
M1#psychology-u16-02-q1@1: Describing decisions as evidence accumulating until a threshold is reached is a… | Drift diffusion model | Reinforcement learning model | Network model | Lesion study | Drift diffusion models describe evidence accumulation.
NUM2#psychology-u16-02-q2@2: A participant expects 4 points and receives 10. With a learning rate of 0.5, what is the new expected value? | 7 | 0 | points | Prediction error is 6; 4 + 0.5 × 6 = 7.
M2#psychology-u16-02-q3@2: A model with many parameters fits one dataset perfectly but predicts new data poorly. This is… | Overfitting | Reverse inference | Statistical power | Implementational explanation | Fitting noise reduces predictive accuracy.
TF2#psychology-u16-02-q4@2: Dopamine neurons appear to signal reward prediction errors. | true | Schultz et al. linked dopamine to prediction errors.
M3#psychology-u16-02-q5@3: Why isn't a good model fit proof that a model is correct? | Other models can fit the same data equally well | Models never fit any real data | A good fit always proves truth | Data can never test any model | Model comparison and new predictions are needed.
SA3#psychology-u16-02-q6@3: Evaluate the use of computational models in psychology. | Purpose and precision; Marr's levels; reinforcement learning and prediction errors; drift diffusion; worked example; overfitting and model mimicry; simplification; judgement. | Purpose ; Examples ; Limits ; Judgement

## Computational psychiatry
LV: Advanced · Evaluation
S: Computational psychiatry uses models of brain and behaviour to understand mental health conditions. This lesson examines its aims, examples and challenges.
SAFE: This lesson is educational and is not a guide to diagnosis or treatment. Questions about mental health should be discussed with a GP or another qualified professional.
O: Explain the aims of computational psychiatry
O: Describe examples linking model parameters to symptoms
O: Evaluate the promise and limits of computational psychiatry
PRE: Computational psychology
H: Aims
P: Huys, Maia and Frank (2016) described **computational psychiatry** as a bridge between neuroscience and clinical practice. It uses models of learning, decision-making and inference to describe how processes might differ in people with mental health conditions. Aims include better understanding of mechanisms, more precise **subtyping** of conditions and, eventually, predicting treatment response.
H: Examples
P: In reinforcement learning tasks, some studies have reported differences in **reward sensitivity** or learning rates associated with depressive symptoms. Predictive processing models suggest some experiences in psychosis may involve giving too much weight to unexpected sensory signals. Computational parameters can be more specific than questionnaire scores.
X: From symptoms to mechanisms
> Two people with the same diagnosis may differ in the processes underlying their difficulties, such as learning from rewards versus learning from punishments.
> Computational models aim to measure such differences directly.
> In principle, this could help match people to treatments, but this goal has not yet been reliably achieved in practice.
H: Evaluation
P: Computational psychiatry offers precise, testable accounts of mechanisms. But many parameters have poor **test–retest reliability**, findings often come from small samples, and links to real-world treatment remain limited. Critics warn against reducing complex, socially shaped distress to model parameters.
K: Computational psychiatry uses models of learning and inference to study mental health; it aims for mechanisms, subtypes and treatment prediction; reliability and clinical use remain challenges.
!: Assuming computational models can already diagnose or choose treatments. Clinical use is not yet established.
EV: established | Huys, Maia and Frank (2016) described computational psychiatry as a bridge from neuroscience to clinical applications.
EV: contested | Whether computational parameters will improve clinical decisions is debated.
T: Computational psychiatry | Using computational models to understand mental health conditions
T: Test–retest reliability | Consistency of a measure over time
T: Subtyping | Dividing a condition into more specific groups
SUM: Computational psychiatry links models to mechanisms of distress.
SUM: Reward learning and predictive processing examples; reliability and clinical use are limited.
SRC: Huys Q. J. M., Maia T. V. and Frank M. J., "Computational psychiatry as a bridge from neuroscience to clinical applications", Nature Neuroscience 19(3):404–413 | primary | 2016 | https://doi.org/10.1038/nn.4238
SRC: Montague P. R., Dolan R. J., Friston K. J. and Dayan P., "Computational psychiatry", Trends in Cognitive Sciences 16(1):72–80 | primary | 2012 | https://doi.org/10.1016/j.tics.2011.11.018
Q: What is computational psychiatry? | Using computational models of learning and decision-making to understand mental health conditions.
Q: Name one challenge for computational psychiatry. | Poor test–retest reliability of parameters, small samples or limited clinical use.
M1#psychology-u16-03-q1@1: Consistency of a measure over time is called… | Test–retest reliability | Statistical power | Reverse inference | Overfitting | Reliability over time is test–retest reliability.
M2#psychology-u16-03-q2@2: Researchers model how quickly people update beliefs after rewards and find different patterns among participants with the same diagnosis. This aims at… | More precise subtyping | Reverse inference | Overfitting | Diagnosis by questionnaire only | Differences in model parameters may reveal subgroups within one diagnosis.
TF2#psychology-u16-03-q3@2: Computational psychiatry is already routinely used to choose treatments in the NHS. | false | Clinical use has not yet been reliably established.
M3#psychology-u16-03-q4@3: Why do critics warn about reducing distress to model parameters? | Distress is complex and socially shaped | Parameters capture everything | Models are always reliable | Distress has no mechanisms | Social and personal context matter beyond models.
SA3#psychology-u16-03-q5@3: Evaluate the promise of computational psychiatry. | Aims (Huys et al.); examples (reward learning, predictive processing); subtyping and treatment prediction; reliability and sample limits; reductionism critique; judgement. | Aims ; Examples ; Limits ; Judgement

## Artificial intelligence and psychology
LV: Intermediate · Evaluation
S: Psychology and artificial intelligence (AI) influence each other: psychology inspired AI, and AI is now a tool and a subject for psychological research. This lesson examines that relationship and debates about whether AI systems think like people.
O: Describe how psychology and AI have influenced each other
O: Explain how psychologists study large language models
O: Evaluate claims that AI systems think like humans
PRE: Computational psychology
H: A shared history
P: Early **cognitive science** treated the mind as an information processor, inspiring AI. **Connectionist** neural network models from the 1980s were developed partly as models of human learning. Modern deep learning grew from these ideas. In turn, AI provides psychologists with new tools for analysing language, images and behaviour.
H: Studying AI with psychology
P: Psychologists apply cognitive tasks to **large language models** (LLMs). Binz and Schulz (2023) tested GPT-3 on classic tasks and found it performed well on some decision-making and reasoning problems but failed on small changes to others and showed no signs of directed exploration. Lake et al. (2017) argued that human-like intelligence requires abilities such as causal models, intuitive physics and learning from few examples, which many AI systems lacked.
X: Anthropomorphism
> People readily attribute minds, emotions and intentions to chatbots and robots, a tendency called **anthropomorphism**.
> This can increase trust and engagement but may lead people to overestimate what systems understand.
> Psychologists study how design features, such as human-like language, shape these attributions.
H: Evaluation
P: AI systems can match or exceed humans on some tasks, but success on benchmarks may reflect training data rather than human-like understanding. Comparing AI and human cognition helps clarify what intelligence involves. Psychological research on trust, bias and over-reliance is important as AI is used more widely.
K: Psychology and AI share roots in cognitive science and connectionism; psychologists test LLMs with cognitive tasks; AI performance differs from human cognition in important ways; anthropomorphism shapes how people treat AI.
!: Assuming good performance on a task means an AI understands it as humans do. Mechanisms may differ.
EV: established | Binz and Schulz (2023) found GPT-3 performed well on some cognitive tasks but failed on small changes to others.
EV: contested | Whether large language models have human-like understanding is debated.
T: Connectionism | Modelling cognition with networks of simple units
T: Large language model | An AI system trained on large amounts of text to generate language
T: Anthropomorphism | Attributing human characteristics to non-human things
SUM: Psychology and AI share roots in cognitive science and connectionism.
SUM: Psychologists test LLMs; performance differs from human cognition; anthropomorphism matters.
SRC: Binz M. and Schulz E., "Using cognitive psychology to understand GPT-3", Proceedings of the National Academy of Sciences 120(6):e2218523120 | primary | 2023 | https://doi.org/10.1073/pnas.2218523120
SRC: Lake B. M., Ullman T. D., Tenenbaum J. B. and Gershman S. J., "Building machines that learn and think like people", Behavioral and Brain Sciences 40:e253 | primary | 2017 | https://doi.org/10.1017/S0140525X16001837
SRC: Rumelhart D. E., McClelland J. L. and the PDP Research Group, Parallel Distributed Processing, MIT Press | primary | 1986
Q: What is connectionism? | Modelling cognition with networks of simple, interconnected units.
Q: What did Binz and Schulz (2023) find when testing GPT-3? | It did well on some tasks but failed on small changes to others and lacked directed exploration.
M1#psychology-u16-04-q1@1: Attributing human feelings and intentions to a chatbot is… | Anthropomorphism | Connectionism | Overfitting | Reverse inference | Anthropomorphism attributes minds to non-humans.
M2#psychology-u16-04-q2@2: An AI solves a famous logic puzzle but fails when the names and numbers are changed slightly. This suggests… | It may rely on training data, not understanding | It understands the puzzle deeply | It reasons exactly like a human | The puzzle has no correct answer | Fragility to small changes suggests memorisation.
TF2#psychology-u16-04-q3@2: Lake et al. argued human-like intelligence includes learning from few examples. | true | They listed this among key human abilities.
M3#psychology-u16-04-q4@3: Why is research on trust in AI important for psychology? | People may over-rely on systems they overestimate | AI systems never make mistakes | Trust has no effect on how AI is used | People never use AI in daily life | Over-trust in AI can lead people to accept errors and cause harm.
SA3#psychology-u16-04-q5@3: Evaluate the claim that AI systems think like humans. | Shared history (cognitive science, connectionism); testing LLMs (Binz and Schulz); Lake et al.'s criteria; anthropomorphism; benchmarks and training data; trust; judgement. | History ; Testing ; Differences ; Judgement

## Digital mental health
LV: Intermediate · Evaluation
S: Digital mental health uses apps, online therapy and other technologies to support mental health. This lesson examines the evidence, benefits and risks of digital interventions.
SAFE: This lesson is educational and is not a guide to diagnosis or treatment. Anyone needing support should speak to a GP or another qualified professional.
O: Describe forms of digital mental health support
O: Explain evidence on the effectiveness of digital interventions
O: Evaluate the risks and limitations of digital mental health
PRE: Artificial intelligence and psychology
H: Forms of digital support
P: Digital mental health includes **internet-delivered cognitive behavioural therapy** (iCBT), smartphone apps for mood tracking and self-help, online peer support, video therapy and, more recently, AI-based chatbots. In England, NHS Talking Therapies services offer some digital programmes, and the National Institute for Health and Care Excellence (NICE) has assessed some digital interventions.
H: Evidence
P: Firth et al. (2017) meta-analysed randomised controlled trials of smartphone interventions for depressive symptoms and found a small to moderate reduction compared with control conditions, with larger effects compared with inactive controls. Guided iCBT, where a practitioner supports the user, has stronger evidence than many unguided apps.
X: Engagement and quality
> Many people download mental health apps but stop using them within weeks, which limits real-world benefit.
> Many apps available in app stores have not been evaluated in trials.
> Data privacy is a concern, since apps may collect sensitive information.
H: Evaluation
P: Digital interventions can increase access, reduce waiting times and suit people who prefer self-help. But effects are often modest, engagement drops off, quality varies widely and they may not suit people with severe difficulties or limited digital access. Regulation and evaluation are developing.
K: Digital mental health includes iCBT, apps, peer support and chatbots; trials show small to moderate benefits, stronger with guidance; engagement, quality and privacy are concerns.
!: Assuming any mental health app is evidence-based. Many have not been tested.
EV: established | Firth et al. (2017) found smartphone interventions reduced depressive symptoms modestly in randomised trials.
EV: contested | Whether AI chatbots can safely provide mental health support is debated.
T: iCBT | Cognitive behavioural therapy delivered online
T: Guided intervention | A digital programme supported by a practitioner
T: Engagement | How much and how long people use an intervention
SUM: iCBT, apps, peer support and chatbots offer digital support.
SUM: Modest benefits, stronger with guidance; engagement, quality and privacy concerns.
SRC: Firth J. et al., "The efficacy of smartphone-based mental health interventions for depressive symptoms: a meta-analysis of randomized controlled trials", World Psychiatry 16(3):287–298 | primary | 2017 | https://doi.org/10.1002/wps.20472
SRC: Andersson G. and Titov N., "Advantages and limitations of Internet-based interventions for common mental disorders", World Psychiatry 13(1):4–11 | primary | 2014 | https://doi.org/10.1002/wps.20083
Q: What is iCBT? | Cognitive behavioural therapy delivered over the internet.
Q: What did Firth et al. (2017) find? | Smartphone interventions modestly reduced depressive symptoms compared with controls.
M1#psychology-u16-05-q1@1: A digital programme supported by a practitioner is a… | Guided intervention | Unguided app | Peer forum | Chatbot only | Support from a practitioner alongside the programme makes it a guided intervention.
M2#psychology-u16-05-q2@2: A student downloads a mood app, uses it daily for a week, then stops. This illustrates the problem of… | Engagement | Overfitting | Reverse inference | Anthropomorphism | Many users stop within weeks, and this drop-off limits real-world benefit.
TF2#psychology-u16-05-q3@2: Guided iCBT generally has stronger evidence than many unguided apps. | true | Support improves outcomes and engagement.
M3#psychology-u16-05-q4@3: Why are many mental health apps a concern? | Many are untested and may collect sensitive data | All apps are approved by the NHS | Apps always replace face-to-face therapy | Apps never collect any personal data | Evidence quality and data privacy vary widely between apps in app stores.
SA3#psychology-u16-05-q5@3: Evaluate digital interventions for mental health. | Forms (iCBT, apps, peer support, chatbots); Firth et al. evidence; guided vs unguided; engagement; quality and privacy; access benefits and limits; judgement. | Forms ; Evidence ; Risks ; Judgement

## Social media and psychology
LV: Intermediate · Evaluation
S: Social media are part of daily life for most young people. This lesson examines research on social media, well-being and self-presentation, and why findings are debated.
O: Describe psychological processes involved in social media use
O: Explain evidence on social media use and adolescent well-being
O: Evaluate methodological problems in social media research
PRE: Self-esteem
H: Processes
P: Social media involve **self-presentation**, **social comparison** and feedback such as likes. **Upward social comparison**, comparing oneself with people who seem better off, can lower mood and self-esteem. Social media also offer **social support**, belonging and identity exploration, especially for young people in marginalised groups.
H: Evidence on well-being
P: Orben and Przybylski (2019) analysed large datasets of adolescents and found the association between digital technology use and well-being was negative but very small, explaining at most 0.4% of the variation in well-being, comparable to the association with eating potatoes. Others argue specific uses, such as heavy use by girls or exposure to harmful content, carry larger risks than average effects suggest.
X: Methodological challenges
> Most studies are **correlational**, so they can't show whether social media cause low well-being or whether unhappy people use social media more.
> Self-reported screen time is often inaccurate compared with logged data.
> **Specification curve analysis** tests many reasonable analysis choices to show how much results depend on them.
H: Evaluation
P: Research shows average associations are small but effects may vary by person, platform and type of use. Better methods, such as longitudinal designs, experiments and data from platforms, are needed. Policy debates, such as restrictions on young people's use, often move faster than the evidence.
K: Social media involve self-presentation, comparison and support; Orben and Przybylski found very small average associations with well-being; correlational designs and self-report limit conclusions.
!: Assuming small average effects mean no one is harmed. Effects may vary across individuals and uses.
EV: established | Orben and Przybylski (2019) found the average association between digital technology use and adolescent well-being was very small.
EV: contested | Whether social media use causes declines in young people's mental health is debated.
T: Upward social comparison | Comparing oneself with people who seem better off
T: Specification curve analysis | Testing many reasonable analysis choices to see how results vary
T: Self-presentation | Managing how one appears to others
SUM: Social media involve presentation, comparison and support.
SUM: Average associations with well-being are small; methods limit causal claims.
SRC: Orben A. and Przybylski A. K., "The association between adolescent well-being and digital technology use", Nature Human Behaviour 3(2):173–182 | primary | 2019 | https://doi.org/10.1038/s41562-018-0506-1
SRC: Haidt J., The Anxious Generation, Penguin Press | secondary | 2024
Q: What is upward social comparison? | Comparing oneself with people who seem better off.
Q: What did Orben and Przybylski (2019) find? | The average association between technology use and adolescent well-being was negative but very small.
M1#psychology-u16-06-q1@1: Testing many reasonable analysis choices to see how results change is… | Specification curve analysis | Reverse inference | Overfitting | Meta-analysis only | This approach shows how results depend on choices.
M2#psychology-u16-06-q2@2: A teenager feels worse after scrolling through friends' holiday photos. This illustrates… | Upward social comparison | Social support | Anthropomorphism | Reverse inference | Comparing with better-off others can lower mood.
TF2#psychology-u16-06-q3@2: Most social media research uses experimental designs that show causation. | false | Most studies are correlational.
M3#psychology-u16-06-q4@3: Why may small average effects hide important harms? | Effects may be larger for some people or types of use | Effects are identical for everyone | Averages show every individual effect | Harms never vary | Averages can mask variation across individuals.
SA3#psychology-u16-06-q5@3: Evaluate research on social media and young people's well-being. | Processes (presentation, comparison, support); Orben and Przybylski; specific risks; correlational designs and self-report; specification curves; policy; judgement. | Processes ; Evidence ; Methods ; Judgement

## The psychology of technology
LV: Introductory · Evaluation
S: Technology changes how we remember, pay attention and relate to others. This lesson examines research on technology's effects on cognition and claims about digital distraction.
O: Describe research on technology and memory
O: Explain how technology affects attention and multitasking
O: Evaluate claims about technology's effects on the mind
PRE: Divided attention
H: Technology and memory
P: Sparrow, Liu and Wegner (2011) reported that people who expected information to be saved on a computer were less likely to remember it, but more likely to remember where it was stored, suggesting the internet acts as **transactive memory**, a shared external memory. Some of their findings did not replicate in a large replication project (Camerer et al., 2018), showing the need for caution.
H: Attention and multitasking
P: Research on **media multitasking** suggests switching between tasks has costs in speed and accuracy, because attention is limited. Notifications interrupt work and can take time to recover from. Some studies have linked heavy media multitasking with poorer performance on attention tasks, though causation and effect size are debated.
X: Cognitive offloading
> **Cognitive offloading** means using external tools, such as calendars, maps or phones, to reduce mental effort.
> Offloading can free up memory for other tasks and improve performance.
> But relying on tools may reduce practice of skills such as navigation or remembering phone numbers.
H: Evaluation
P: Technology changes how cognitive work is shared between people and tools, which isn't necessarily harmful. Claims that technology "rewires" or damages the brain are often exaggerated. Replication failures show that striking findings need confirmation.
K: The internet may act as transactive memory, though findings have not all replicated; multitasking and interruptions have costs; cognitive offloading has benefits and trade-offs.
!: Assuming technology simply damages the mind. It changes how cognition is shared with tools.
EV: established | Switching between tasks has costs in speed and accuracy because attention is limited.
EV: contested | Whether heavy technology use harms attention or memory in the long term is debated.
T: Transactive memory | A shared memory system in which others or tools store information
T: Cognitive offloading | Using external tools to reduce mental effort
T: Media multitasking | Using several media or tasks at once
SUM: The internet may act as transactive memory; some findings didn't replicate.
SUM: Multitasking has costs; offloading has benefits and trade-offs.
SRC: Sparrow B., Liu J. and Wegner D. M., "Google effects on memory: cognitive consequences of having information at our fingertips", Science 333(6043):776–778 | primary | 2011 | https://doi.org/10.1126/science.1207745
SRC: Camerer C. F. et al., "Evaluating the replicability of social science experiments in Nature and Science between 2010 and 2015", Nature Human Behaviour 2(9):637–644 | primary | 2018 | https://doi.org/10.1038/s41562-018-0399-z
SRC: Risko E. F. and Gilbert S. J., "Cognitive offloading", Trends in Cognitive Sciences 20(9):676–688 | primary | 2016 | https://doi.org/10.1016/j.tics.2016.07.002
Q: What is transactive memory? | A shared memory system in which other people or tools store information.
Q: What is cognitive offloading? | Using external tools to reduce mental effort.
M1#psychology-u16-07-q1@1: Using a phone calendar to remember appointments is an example of… | Cognitive offloading | Media multitasking | Transactive memory loss | Overfitting | Storing information in an external tool to reduce mental effort is cognitive offloading.
M2#psychology-u16-07-q2@2: A student answering messages while writing an essay takes longer and makes more errors. This illustrates… | Task-switching costs | Cognitive offloading | Transactive memory | Specification curves | Limited attention makes switching costly.
TF2#psychology-u16-07-q3@2: All of Sparrow et al.'s (2011) findings replicated successfully. | false | Some did not replicate in Camerer et al. (2018).
M3#psychology-u16-07-q4@3: Why are claims that technology "damages the brain" often criticised? | They exaggerate evidence and ignore shared cognition | They are always fully proven by research | Technology has no effects on people at all | Brains never change in any way over time | Effects are more nuanced than headlines suggest, and cognition is shared with tools.
SA2#psychology-u16-07-q5@2,3: Explain research on how technology affects cognition and assess its reliability. | Transactive memory (Sparrow et al.) and replication (Camerer et al.); multitasking and interruptions; cognitive offloading; exaggerated claims. | Memory ; Attention ; Offloading ; Evaluation

## Human–computer interaction today
LV: Intermediate · Application
S: Human–computer interaction (HCI) applies psychology to the design of technology. This lesson examines principles of usable design, dark patterns and human–AI interaction.
O: Explain psychological principles of usable design
O: Describe dark patterns and their effects
O: Evaluate challenges in designing human–AI interaction
PRE: Human factors and ergonomics
H: Usable design
P: Norman (1988) argued good design makes the right actions visible and natural, using **affordances** (what an object allows you to do), **signifiers** (cues showing how to use it), **feedback** and **mappings** between controls and effects. Designs should fit human limits on attention and memory, for example through **recognition rather than recall**, consistent layouts and clear error recovery.
H: Dark patterns
P: **Dark patterns** are design choices that steer users into actions they might not otherwise take, such as hard-to-cancel subscriptions, pre-ticked boxes or misleading buttons. They exploit known cognitive biases, such as defaults and loss aversion. Regulators in the UK and EU have taken action against some practices.
X: Human–AI interaction
> **Automation bias** is the tendency to over-rely on automated suggestions, even when they are wrong.
> In healthcare and aviation, over-reliance on automation has contributed to errors.
> Good design aims for **appropriate trust**: showing uncertainty, explaining outputs and keeping humans in control.
H: Evaluation
P: HCI shows how psychology can improve everyday technology and safety. But commercial incentives can encourage designs that exploit rather than support users. As AI systems become more capable, designing for appropriate trust and accountability becomes more important.
K: Norman's principles (affordances, signifiers, feedback, mappings) guide usable design; dark patterns exploit biases; automation bias makes appropriate trust in AI a design goal.
!: Assuming user errors always reflect user failings. Poor design often causes errors.
EV: established | Automation bias, over-reliance on automated suggestions, has been documented in fields such as aviation and healthcare.
EV: contested | How best to design AI systems to produce appropriate trust is debated.
T: Affordance | What an object allows a user to do
T: Dark pattern | A design that steers users into unintended actions
T: Automation bias | Over-reliance on automated suggestions
SUM: Norman's principles make designs usable.
SUM: Dark patterns exploit biases; automation bias challenges human–AI design.
SRC: Norman D. A., The Design of Everyday Things, Basic Books | primary | 1988
SRC: Parasuraman R. and Manzey D. H., "Complacency and bias in human use of automation: an attentional integration", Human Factors 52(3):381–410 | primary | 2010 | https://doi.org/10.1177/0018720810376055
SRC: Competition and Markets Authority, Online Choice Architecture: How digital design can harm competition and consumers | guidance | 2022 | https://www.gov.uk/government/publications/online-choice-architecture-how-digital-design-can-harm-competition-and-consumers
Q: What is a dark pattern? | A design choice that steers users into actions they might not otherwise take.
Q: What is automation bias? | The tendency to over-rely on automated suggestions, even when they are wrong.
M1#psychology-u16-08-q1@1: A cue showing how to use something, such as a "push" label on a door, is a… | Signifier | Dark pattern | Automation bias | Mapping error | Signifiers are cues, such as labels, that show users how to act.
M2#psychology-u16-08-q2@2: A website makes it easy to subscribe but hides the cancel button several menus deep. This is… | A dark pattern | Good usability | An affordance | Appropriate trust | Hiding cancellation steers users against their interests.
TF2#psychology-u16-08-q3@2: Norman argued many user errors are caused by poor design. | true | He stressed design that makes correct actions natural.
M3#psychology-u16-08-q4@3: Why is appropriate trust a design goal for AI systems? | Over-trust and under-trust both cause errors | Users should trust AI completely | Trust doesn't matter | AI never makes errors | Calibrated trust supports good decisions.
SA2#psychology-u16-08-q5@2,3: Explain how psychology informs technology design. | Norman's principles; recognition over recall; dark patterns and biases; regulation; automation bias; designing for appropriate trust. | Design ; Dark patterns ; AI ; Evaluation

## Neuroeconomics
LV: Advanced · Evaluation
S: Neuroeconomics combines neuroscience, psychology and economics to study how the brain makes decisions. This lesson examines key findings on valuation, fairness and risk.
O: Explain the aims of neuroeconomics
O: Describe findings on neural valuation and social decisions
O: Evaluate what neuroeconomics adds to understanding decisions
PRE: Decision-making
H: Aims
P: Neuroeconomics asks how the brain computes the **value** of options and chooses between them. It tests economic models, which often assume rational utility maximisation, against brain and behavioural data. Studies suggest regions such as the **ventromedial prefrontal cortex** and **ventral striatum** represent the subjective value of options across different types of reward.
H: Fairness and the Ultimatum Game
P: In the **Ultimatum Game**, one player proposes how to split money and the other accepts or rejects; rejection means both get nothing. Economic rationality predicts accepting any positive offer, but people often reject unfair offers. Sanfey et al. (2003) found unfair offers activated the **anterior insula**, associated with negative emotions such as disgust, and greater activation predicted rejection.
X: Why reject free money?
> Rejecting an unfair offer costs the responder money but punishes the proposer.
> This suggests people value fairness and are willing to pay to enforce social norms.
> Neuroeconomics links such choices to emotional as well as calculative processes.
H: Evaluation
P: Neuroeconomics has shown that decisions involve emotion and social motives as well as calculation, challenging purely rational models. But critics argue brain data rarely change economic predictions, reverse inference is common, and many studies have small samples. Its strongest contribution may be linking computational models of value to brain mechanisms.
K: Neuroeconomics studies how the brain computes value; regions such as the vmPFC and ventral striatum represent subjective value; the Ultimatum Game shows fairness concerns linked to the insula.
!: Treating brain activation as the whole explanation of a choice. Behaviour, context and models matter too.
EV: established | Sanfey et al. (2003) found anterior insula activation to unfair offers in the Ultimatum Game.
EV: contested | Whether neuroscience data improve economic predictions is debated.
T: Neuroeconomics | The study of the brain processes underlying decisions
T: Ultimatum Game | A game where a responder can reject a proposed split, leaving both with nothing
T: Subjective value | The personal worth an individual places on an option
SUM: Neuroeconomics studies neural valuation of options.
SUM: The Ultimatum Game shows fairness concerns; critics question added predictive value.
SRC: Sanfey A. G. et al., "The neural basis of economic decision-making in the Ultimatum Game", Science 300(5626):1755–1758 | primary | 2003 | https://doi.org/10.1126/science.1082976
SRC: Glimcher P. W. and Fehr E. (eds), Neuroeconomics: Decision Making and the Brain, 2nd edition, Academic Press | secondary | 2014
Q: What happens in the Ultimatum Game? | One player proposes a split; if the other rejects it, both get nothing.
Q: What did Sanfey et al. (2003) find? | Unfair offers activated the anterior insula, and greater activation predicted rejection.
M1#psychology-u16-09-q1@1: The personal worth someone places on an option is its… | Subjective value | Market price | Expected loss | Prediction error | Subjective value is the personal worth placed on an option, which varies between people.
M2#psychology-u16-09-q2@2: A responder rejects £2 out of £10, so both players get nothing. Economic rationality would predict… | Accepting the offer | Rejecting the offer | Splitting evenly | Asking for more time | A purely self-interested responder should accept, since any positive amount beats nothing.
TF2#psychology-u16-09-q3@2: People in the Ultimatum Game usually accept even very unfair offers. | false | People often reject unfair offers.
M3#psychology-u16-09-q4@3: Why do critics question the value of neuroeconomics? | Brain data rarely change economic predictions | It has no brain data | It ignores choices | It proves people are rational | Critics doubt imaging adds predictive power.
SA3#psychology-u16-09-q5@3: Evaluate the contribution of neuroeconomics to understanding decision-making. | Aims and valuation regions; Ultimatum Game and Sanfey et al.; emotion and fairness; critiques (prediction, reverse inference, samples); judgement. | Aims ; Findings ; Critiques ; Judgement

## Behavioural economics
LV: Intermediate · Application
S: Behavioural economics uses psychology to explain why people's economic decisions depart from traditional models of rational choice. This lesson examines prospect theory, framing and nudges.
O: Explain prospect theory and loss aversion
O: Describe framing effects and choice architecture
O: Evaluate the effectiveness of nudges
PRE: Biases and heuristics
H: Prospect theory
P: Kahneman and Tversky (1979) proposed **prospect theory**: people evaluate outcomes as **gains or losses** relative to a reference point, not as final states of wealth. **Loss aversion** means losses feel larger than equivalent gains. People tend to be risk-averse for gains and risk-seeking for losses.
IX: biases
H: Framing and choice architecture
P: Tversky and Kahneman (1981) showed **framing effects**: people chose differently between identical options described as lives saved or lives lost. Thaler and Sunstein (2008) described **choice architecture**: how options are presented influences choices. A **nudge** changes choice architecture without forbidding options or significantly changing incentives, such as making pension saving the **default**.
X: Do nudges work?
> Mertens et al. (2022) meta-analysed choice architecture studies and reported a small to medium average effect.
> Maier et al. (2022) re-analysed the same studies and argued that after adjusting for **publication bias**, there was no evidence of an overall effect, though some types of nudge may still work.
> Default effects, such as automatic enrolment in workplace pensions in the UK from 2012, have shown large real-world effects.
H: Evaluation
P: Behavioural economics has changed policy and shown that context shapes choice. But effects of many nudges may be smaller than early studies suggested, and critics raise ethical concerns about manipulation. Defaults appear among the most robust interventions.
K: Prospect theory explains loss aversion and reference points; framing and choice architecture shape decisions; nudge effects are debated, but defaults such as pension auto-enrolment are powerful.
!: Assuming every nudge works. Many effects shrink after correcting for publication bias.
EV: established | Kahneman and Tversky (1979) proposed prospect theory, including loss aversion.
EV: contested | How effective nudges are on average is debated after corrections for publication bias.
T: Loss aversion | Losses feeling larger than equivalent gains
T: Framing effect | Different choices depending on how identical options are described
T: Nudge | Changing choice presentation without restricting options
SUM: Prospect theory: reference points and loss aversion.
SUM: Framing and nudges; defaults are robust, average nudge effects debated.
SRC: Kahneman D. and Tversky A., "Prospect theory: an analysis of decision under risk", Econometrica 47(2):263–291 | primary | 1979 | https://doi.org/10.2307/1914185
SRC: Mertens S., Herberz M., Hahnel U. J. J. and Brosch T., "The effectiveness of nudging: a meta-analysis of choice architecture interventions across behavioral domains", PNAS 119(1):e2107346118 | primary | 2022 | https://doi.org/10.1073/pnas.2107346118
SRC: Maier M. et al., "No evidence for nudging after adjusting for publication bias", PNAS 119(31):e2200300119 | primary | 2022 | https://doi.org/10.1073/pnas.2200300119
Q: What is loss aversion? | Losses feeling larger than equivalent gains.
Q: What did Maier et al. (2022) argue about nudges? | After adjusting for publication bias, there was no evidence of an overall effect.
M1#psychology-u16-10-q1@1: Changing how options are presented without restricting them is a… | Nudge | Tax | Ban | Subsidy | Nudges alter choice architecture without banning options or changing incentives much.
M2#psychology-u16-10-q2@2: More people choose a surgery described as having a "90% survival rate" than one with a "10% mortality rate". This is… | A framing effect | Loss aversion only | A default effect | Anchoring | Identical options described differently change choices.
TF2#psychology-u16-10-q3@2: Automatic enrolment in workplace pensions is an example of a default nudge. | true | It changed the default to saving.
M3#psychology-u16-10-q4@3: Why do critics raise ethical concerns about nudges? | They may steer choices without people noticing | They ban many of people's options | They always fail to work at all | They raise taxes on all consumers | Influencing choices covertly raises autonomy concerns.
SA3#psychology-u16-10-q5@3: Evaluate the contribution of behavioural economics to policy. | Prospect theory and loss aversion; framing (Tversky and Kahneman); choice architecture and nudges; meta-analyses (Mertens, Maier); defaults and pensions; ethics; judgement. | Theory ; Framing ; Effectiveness ; Judgement

## Decision science
LV: Advanced · Evaluation
S: Decision science studies how people and organisations make decisions and how decisions can be improved. This lesson examines dual-process accounts, ecological rationality and debiasing.
O: Compare dual-process and ecological rationality accounts of decision-making
O: Describe methods for improving decisions
O: Evaluate debates about human rationality
PRE: Behavioural economics
H: Two views of rationality
P: The **heuristics and biases** programme (Kahneman and Tversky) showed that people use mental shortcuts that can lead to systematic errors. Kahneman (2011) popularised a **dual-process** account: fast, intuitive **System 1** and slow, deliberative **System 2**. Gigerenzer argued for **ecological rationality**: simple heuristics can be accurate when they fit the structure of the environment, so "less can be more".
H: Improving decisions
P: Methods include **debiasing** training, using **checklists**, considering the opposite, **pre-mortems** (imagining a plan has failed and asking why), and structured decision tools. Presenting risks as **natural frequencies** (for example, "8 out of 1,000") rather than percentages improves understanding of probabilities, including among doctors (Gigerenzer).
X: Natural frequencies
> A test detects a condition in 90% of people who have it and gives false positives in 9% of people who don't; 1% of people have the condition.
> In natural frequencies: of 1,000 people, 10 have it and 9 test positive; of 990 without it, about 89 test positive.
> So only about 9 of 98 positive results are true positives, about 9%. This example is illustrative.
H: Evaluation
P: Both views capture part of the truth: heuristics can fail in some contexts and succeed in others. Dual-process models are criticised as oversimplified, since processes may not divide neatly into two systems. Practical tools such as checklists and natural frequencies show decision science can improve real decisions.
K: Kahneman's heuristics and biases and dual-process view contrast with Gigerenzer's ecological rationality; checklists, pre-mortems and natural frequencies improve decisions.
!: Assuming heuristics are always errors. They can be accurate when they fit the environment.
EV: established | Presenting probabilities as natural frequencies improves people's understanding of risk.
EV: contested | Whether human reasoning is best described as biased or as ecologically rational is debated.
T: Dual-process theory | The view that thinking involves fast intuitive and slow deliberative systems
T: Ecological rationality | Heuristics being accurate when they fit the environment
T: Natural frequencies | Expressing probabilities as counts out of a whole number of cases
SUM: Heuristics and biases versus ecological rationality.
SUM: Checklists, pre-mortems and natural frequencies improve decisions.
SRC: Kahneman D., Thinking, Fast and Slow, Farrar, Straus and Giroux | primary | 2011
SRC: Gigerenzer G. and Hoffrage U., "How to improve Bayesian reasoning without instruction: frequency formats", Psychological Review 102(4):684–704 | primary | 1995 | https://doi.org/10.1037/0033-295X.102.4.684
SRC: Tversky A. and Kahneman D., "The framing of decisions and the psychology of choice", Science 211(4481):453–458 | primary | 1981 | https://doi.org/10.1126/science.7455683
Q: What is ecological rationality? | The idea that simple heuristics can be accurate when they fit the environment.
Q: What is a pre-mortem? | Imagining a plan has failed and asking why, to spot problems in advance.
M1#psychology-u16-11-q1@1: Fast, intuitive thinking is described by Kahneman as… | System 1 | System 2 | Ecological rationality | A pre-mortem | Kahneman describes System 1 as fast and intuitive, and System 2 as slow and deliberate.
NUM2#psychology-u16-11-q2@2: Of 1,000 people, 10 have a condition and 9 of them test positive; 89 of the 990 without it also test positive. About what percentage of positive results are true positives? | 9 | 1 | % | 9 out of 98 positives is about 9%.
M2#psychology-u16-11-q3@2: A doctor misreads a 9% false-positive rate as meaning most positive tests are correct, but understands when the figures are given as counts. This supports… | Using natural frequencies | System 1 thinking | Loss aversion | Framing effects only | Counts make base rates easier to understand.
TF2#psychology-u16-11-q4@2: Gigerenzer argued simple heuristics are always inaccurate. | false | He argued they can be accurate when they fit the environment.
M3#psychology-u16-11-q5@3: Why are dual-process models criticised? | Processes may not divide neatly into two systems | They explain everything perfectly | They ignore intuition | They reject deliberation | Thinking may involve more than two systems.
SA3#psychology-u16-11-q6@3: Evaluate competing views of human rationality in decision-making. | Heuristics and biases; dual-process (Kahneman); ecological rationality (Gigerenzer); debiasing tools; natural frequencies example; critiques; judgement. | Views ; Tools ; Evidence ; Judgement

## Predictive processing
LV: Advanced · Evaluation
S: Predictive processing proposes that the brain constantly predicts incoming sensory information and updates its predictions when errors occur. This lesson explains the framework and its applications to perception and experience.
O: Explain the core ideas of predictive processing
O: Apply predictive processing to perception and illusions
O: Evaluate the strengths and limits of the framework
PRE: Computational psychology
H: The predictive brain
P: Predictive processing (Clark, 2013) proposes that the brain is a **prediction machine**. Higher levels generate **predictions** about sensory input; lower levels send up **prediction errors** when input doesn't match. Perception is the brain's best guess about the causes of its sensory signals. Friston's (2010) **free-energy principle** frames this as the brain minimising surprise or prediction error.
H: Precision weighting
P: The brain weighs predictions and errors by their **precision** (reliability). When sensory signals are noisy, prior expectations dominate; when signals are clear, errors drive updating. This explains why expectations shape perception, as when we "hear" a word in noisy speech because we expect it.
X: Predictions and hallucinations
> Powers et al. (2017) trained people to associate a light with a tone, then presented the light alone.
> Some participants reported hearing the tone even when it wasn't played, a conditioned hallucination.
> People who hear voices showed this effect more strongly, consistent with stronger reliance on prior expectations.
H: Evaluation
P: Predictive processing unifies perception, action and learning within one framework and has inspired research on illusions, psychosis and autism. Critics argue it is so flexible that it can explain almost any result, making it hard to falsify, and that its neural mechanisms are not yet established.
K: Predictive processing sees the brain as predicting input and updating on prediction errors weighted by precision; it explains expectation effects and has been applied to hallucinations; critics question its falsifiability.
!: Treating perception as a passive recording of the world. Predictions actively shape what we perceive.
EV: established | Powers et al. (2017) induced conditioned hallucinations by pairing a light with a tone.
EV: contested | Whether predictive processing is a testable theory or a flexible framework is debated.
T: Predictive processing | The view that the brain predicts input and updates on prediction errors
T: Precision weighting | Weighting signals by their estimated reliability
T: Free-energy principle | Friston's proposal that brains minimise surprise
SUM: The brain predicts input and updates on precision-weighted errors.
SUM: Explains expectation effects and hallucinations; falsifiability is debated.
SRC: Clark A., "Whatever next? Predictive brains, situated agents, and the future of cognitive science", Behavioral and Brain Sciences 36(3):181–204 | primary | 2013 | https://doi.org/10.1017/S0140525X12000477
SRC: Friston K., "The free-energy principle: a unified brain theory?", Nature Reviews Neuroscience 11(2):127–138 | primary | 2010 | https://doi.org/10.1038/nrn2787
SRC: Powers A. R., Mathys C. and Corlett P. R., "Pavlovian conditioning–induced hallucinations result from overweighting of perceptual priors", Science 357(6351):596–600 | primary | 2017 | https://doi.org/10.1126/science.aan3458
Q: What is a prediction error in predictive processing? | A signal sent when sensory input doesn't match the brain's prediction.
Q: What did Powers et al. (2017) find? | Pairing a light with a tone led some people to hear the tone when only the light appeared.
M1#psychology-u16-12-q1@1: Friston's proposal that brains minimise surprise is the… | Free-energy principle | Dual-process theory | Prospect theory | Reverse inference | Friston framed perception as minimising free energy.
M2#psychology-u16-12-q2@2: In a noisy café, you clearly "hear" a friend say your name because you expected it. Predictive processing explains this by… | Strong priors shaping perception | Prediction errors only | Reverse inference | Loss aversion | Expectations dominate when signals are noisy.
TF2#psychology-u16-12-q3@2: In predictive processing, perception is a passive copy of sensory input. | false | Perception is the brain's best guess, shaped by predictions.
M3#psychology-u16-12-q4@3: Why is predictive processing criticised as hard to falsify? | Its flexibility lets it explain almost any result | It makes no claims about the brain | It has been fully disproved | It only ever explains vision | Very flexible frameworks are hard to test.
SA3#psychology-u16-12-q5@3: Evaluate predictive processing as an account of perception. | Predictions and errors (Clark); free-energy principle (Friston); precision weighting; expectation effects; hallucinations (Powers et al.); falsifiability and mechanisms; judgement. | Framework ; Evidence ; Critiques ; Judgement

## Embodied cognition
LV: Intermediate · Evaluation
S: Embodied cognition proposes that thinking depends on the body and its interaction with the environment, not just on abstract processing in the brain. This lesson examines the theory and evidence, including replication problems.
O: Explain the claims of embodied and grounded cognition
O: Describe evidence for and against embodiment effects
O: Evaluate the role of replication in testing embodiment claims
PRE: The cognitive approach
H: Grounded cognition
P: Traditional cognitive psychology treated the mind as manipulating abstract symbols, like a computer. **Embodied** or **grounded** cognition (Barsalou, 2008) argues that concepts are grounded in sensory and motor experience: understanding the word "kick" partly reactivates motor systems involved in kicking. Some versions go further, arguing cognition extends into the body and environment.
H: Evidence and replication
P: Evidence includes neuroimaging showing motor areas active when reading action words. Some striking behavioural findings have not replicated: a large registered replication of Strack et al.'s (1988) **facial feedback** pen study, in which holding a pen in the teeth was said to make cartoons seem funnier, found no effect (Wagenmakers et al., 2016). The later Many Smiles Collaboration (2022) found some support for facial feedback using other methods, but not robustly for the pen technique.
X: A mixed picture
> Motor and sensory system involvement in understanding language is well supported by neuroimaging.
> Some behavioural "priming" effects linked to embodiment, such as warmth or posture effects, have failed to replicate.
> This illustrates the importance of distinguishing robust core claims from fragile individual findings.
H: Evaluation
P: Embodied cognition has challenged purely abstract models of the mind and influenced robotics and education. But some claims are vague, and several high-profile findings have failed to replicate. Researchers now emphasise preregistered, large-sample studies to test specific predictions.
K: Embodied cognition grounds thinking in bodily experience (Barsalou); neuroimaging supports sensorimotor involvement; some behavioural effects, such as the pen facial feedback study, failed to replicate.
!: Assuming every embodiment finding is robust. Some have failed large replications.
EV: established | A large registered replication found no effect of the pen-in-mouth facial feedback manipulation (Wagenmakers et al., 2016).
EV: contested | How far cognition depends on the body rather than abstract representations is debated.
T: Embodied cognition | The view that thinking depends on the body and its interaction with the world
T: Facial feedback hypothesis | The idea that facial expressions influence emotional experience
T: Registered replication | A preregistered, multi-lab repeat of an earlier study
SUM: Embodied cognition grounds concepts in sensorimotor experience.
SUM: Neuroimaging supports it; some behavioural effects failed to replicate.
SRC: Barsalou L. W., "Grounded cognition", Annual Review of Psychology 59:617–645 | primary | 2008 | https://doi.org/10.1146/annurev.psych.59.103006.093639
SRC: Wagenmakers E.-J. et al., "Registered replication report: Strack, Martin, and Stepper (1988)", Perspectives on Psychological Science 11(6):917–928 | primary | 2016 | https://doi.org/10.1177/1745691616674458
SRC: Coles N. A. et al., "A multi-lab test of the facial feedback hypothesis by the Many Smiles Collaboration", Nature Human Behaviour 6:1731–1742 | primary | 2022 | https://doi.org/10.1038/s41562-022-01458-9
Q: What does grounded cognition claim? | Concepts are grounded in sensory and motor experience.
Q: What did Wagenmakers et al. (2016) find? | A large registered replication found no effect of the pen-in-mouth facial feedback manipulation.
M1#psychology-u16-13-q1@1: The idea that facial expressions influence how we feel is the… | Facial feedback hypothesis | Free-energy principle | Prospect theory | Dual-process theory | Expressions feeding back into emotion is facial feedback.
M2#psychology-u16-13-q2@2: Reading the word "grasp" activates parts of the brain involved in hand movement. This supports… | Grounded cognition | Abstract symbol processing only | Reverse inference | Loss aversion | Motor activation during reading supports grounding.
TF2#psychology-u16-13-q3@2: The Many Smiles Collaboration found robust support for the pen-in-mouth technique. | false | It found some support for facial feedback, but not robustly for the pen method.
M3#psychology-u16-13-q4@3: Why is replication important for embodiment research? | Some striking findings have failed large replications | Replication always confirms findings | Embodiment has never been tested | Small studies are most reliable | Distinguishing robust and fragile claims needs replication.
SA3#psychology-u16-13-q5@3: Evaluate the evidence for embodied cognition. | Grounded cognition (Barsalou); neuroimaging; facial feedback and its replications (Wagenmakers, Many Smiles); priming failures; vagueness; judgement. | Theory ; Evidence ; Replication ; Judgement

## Bayesian cognition
LV: Advanced · Evaluation
S: Bayesian models describe the mind as combining prior knowledge with new evidence according to probability theory. This lesson examines Bayesian accounts of perception and learning and their critics.
O: Explain Bayes' theorem in psychological terms
O: Describe evidence for Bayesian perception and learning
O: Evaluate criticisms of Bayesian models
PRE: The cognitive approach
H: Priors, likelihoods and posteriors
P: Bayesian models describe beliefs as probabilities. A **prior** is what you believe before new evidence; the **likelihood** is how well the evidence fits each hypothesis; the **posterior** is the updated belief combining both. Bayesian cognition proposes the mind approximates this rational updating, especially under uncertainty (Knill and Pouget, 2004).
H: Evidence
P: Ernst and Banks (2002) showed that when people judged an object's size using both vision and touch, they combined the two cues, weighting each by its reliability, close to the statistically optimal way. Tenenbaum et al. (2011) argued children learn words and concepts from few examples by combining structured prior knowledge with evidence.
X: Cue combination
> If vision is made blurry, people rely more on touch, and vice versa.
> This matches the Bayesian prediction that more reliable cues get more weight.
> Similar weighting appears in combining sight and sound to locate an event.
H: Evaluation
P: Bayesian models explain how people cope with uncertainty and why perception is often near-optimal. Critics such as Bowers and Davis (2012) argue many Bayesian accounts are **just-so stories**: priors and likelihoods can be chosen after the fact to fit any data. People also show systematic departures from Bayesian reasoning in explicit probability problems, such as neglecting base rates.
K: Bayesian cognition combines priors and likelihoods into posteriors; cue combination is close to optimal (Ernst and Banks); critics warn of just-so stories and note base-rate neglect.
!: Assuming "Bayesian" means people consciously calculate probabilities. Models describe processes, often unconscious.
EV: established | Ernst and Banks (2002) found people combine visual and touch cues close to the statistically optimal way.
EV: contested | Whether Bayesian models explain cognition or merely redescribe data is debated.
T: Prior | A belief held before new evidence
T: Posterior | An updated belief combining the prior with new evidence
T: Cue combination | Integrating information from several senses
SUM: Priors and likelihoods combine into posteriors.
SUM: Near-optimal cue combination; critics warn of just-so stories.
SRC: Knill D. C. and Pouget A., "The Bayesian brain: the role of uncertainty in neural coding and computation", Trends in Neurosciences 27(12):712–719 | primary | 2004 | https://doi.org/10.1016/j.tins.2004.10.007
SRC: Ernst M. O. and Banks M. S., "Humans integrate visual and haptic information in a statistically optimal fashion", Nature 415:429–433 | primary | 2002 | https://doi.org/10.1038/415429a
SRC: Bowers J. S. and Davis C. J., "Bayesian just-so stories in psychology and neuroscience", Psychological Bulletin 138(3):389–414 | primary | 2012 | https://doi.org/10.1037/a0026450
Q: What is a posterior in Bayesian terms? | An updated belief that combines the prior with new evidence.
Q: What did Ernst and Banks (2002) find? | People combined vision and touch cues close to the statistically optimal way.
M1#psychology-u16-14-q1@1: A belief held before new evidence is the… | Prior | Posterior | Likelihood | Prediction error | A prior is the belief held before new evidence is taken into account.
M2#psychology-u16-14-q2@2: When a room is dark, a person relies more on touch than sight to judge an object's size. This fits… | Reliability-weighted cue combination | Base-rate neglect in judgement | Loss aversion in choice | Reverse inference from imaging | Bayesian cue combination predicts that more reliable cues get more weight.
TF2#psychology-u16-14-q3@2: Bowers and Davis argued Bayesian models can be fitted after the fact to explain almost any data. | true | They called these just-so stories.
M3#psychology-u16-14-q4@3: Why does base-rate neglect challenge Bayesian accounts? | People often ignore priors in probability problems | People always use priors perfectly | Base rates don't exist in real life | Bayesian models ignore priors entirely | Systematic neglect departs from Bayesian updating.
SA3#psychology-u16-14-q5@3: Evaluate Bayesian models of cognition. | Priors, likelihoods, posteriors; Bayesian brain (Knill and Pouget); cue combination (Ernst and Banks); learning (Tenenbaum); just-so stories (Bowers and Davis); base-rate neglect; judgement. | Theory ; Evidence ; Critiques ; Judgement

## Network approaches to mental health
LV: Advanced · Evaluation
S: Network approaches see mental health conditions as systems of symptoms that influence each other, rather than as hidden underlying diseases. This lesson explains the approach and debates about it.
SAFE: This lesson is educational and is not a guide to diagnosis or treatment. Questions about mental health should be discussed with a GP or another qualified professional.
O: Explain the network theory of mental disorders
O: Describe how symptom networks are analysed
O: Evaluate the strengths and limitations of network approaches
PRE: Computational psychiatry
H: Symptoms as a network
P: Traditional models treat symptoms as caused by an underlying disorder, as a virus causes fever. Borsboom (2017) proposed a **network theory**: symptoms directly influence each other. For example, insomnia may cause fatigue, which causes concentration problems, which cause worry, which worsens insomnia. A disorder is a stable state of a strongly connected symptom network.
H: Analysing networks
P: Researchers use statistical methods to estimate **symptom networks** from data, where symptoms are **nodes** and associations between them are **edges**. **Central** symptoms are strongly connected and may be targets for intervention. Networks can also explain **comorbidity**, since symptoms shared by different conditions act as **bridges** between them.
X: Replicability concerns
> Forbes et al. (2017) found that symptom networks estimated in different samples often differed, raising concerns about replicability.
> Network analyses depend on sample size and estimation methods.
> Supporters responded that newer methods and larger samples improve stability.
H: Evaluation
P: Network approaches offer a fresh way to understand comorbidity and how symptoms maintain each other. But most network estimates come from cross-sectional data, which can't show causal direction, and replicability has been questioned. Whether centrality guides effective treatment remains to be tested.
K: Network theory treats disorders as interacting symptoms; central symptoms and bridges explain maintenance and comorbidity; replicability and causal inference are challenges.
!: Assuming network analysis shows that one symptom causes another. Cross-sectional associations don't show direction.
EV: established | Borsboom (2017) proposed a network theory in which symptoms directly influence each other.
EV: contested | How replicable and clinically useful symptom networks are is debated.
T: Symptom network | Symptoms as nodes connected by associations
T: Centrality | How strongly a node is connected within a network
T: Bridge symptom | A symptom linking clusters of different conditions
SUM: Symptoms influence each other in networks.
SUM: Central and bridge symptoms; replicability and causal limits.
SRC: Borsboom D., "A network theory of mental disorders", World Psychiatry 16(1):5–13 | primary | 2017 | https://doi.org/10.1002/wps.20375
SRC: Borsboom D. and Cramer A. O. J., "Network analysis: an integrative approach to the structure of psychopathology", Annual Review of Clinical Psychology 9:91–121 | primary | 2013 | https://doi.org/10.1146/annurev-clinpsy-050212-185608
SRC: Forbes M. K. et al., "Evidence that psychopathology symptom networks have limited replicability", Journal of Abnormal Psychology 126(7):969–988 | primary | 2017 | https://doi.org/10.1037/abn0000276
Q: What does network theory say about mental disorders? | They are systems of symptoms that directly influence each other.
Q: What is a bridge symptom? | A symptom linking clusters of symptoms from different conditions.
M1#psychology-u16-15-q1@1: How strongly a symptom is connected within a network is its… | Centrality | Prior | Heritability | Precision | Central symptoms have many strong connections.
M2#psychology-u16-15-q2@2: Poor sleep leads to tiredness, which leads to low mood, which worsens sleep. A network approach sees this as… | Symptoms maintaining each other | A single hidden cause | Reverse inference | Loss aversion | Mutually reinforcing symptoms form a network.
TF2#psychology-u16-15-q3@2: Forbes et al. (2017) found symptom networks replicated perfectly across samples. | false | They found networks often differed between samples.
M3#psychology-u16-15-q4@3: Why can't most network analyses show causal direction? | They often use cross-sectional data | They always use experiments | Symptoms never change | Networks have no edges | Associations at one time don't show what causes what.
SA3#psychology-u16-15-q5@3: Evaluate network approaches to mental health. | Common-cause vs network models; Borsboom; nodes, edges, centrality, bridges; comorbidity; replicability (Forbes et al.); cross-sectional limits; clinical use; judgement. | Theory ; Methods ; Critiques ; Judgement

## Psychoneuroimmunology
LV: Intermediate · Application
S: Psychoneuroimmunology (PNI) studies how psychological processes, the nervous system and the immune system interact. This lesson examines evidence that stress affects immunity and health.
O: Explain how stress can affect the immune system
O: Describe key studies on stress, wound healing and infection
O: Evaluate the strength of PNI evidence
PRE: The physiology of stress
H: Stress and immunity
P: Stress activates the **sympathetic nervous system** and the **HPA axis**, releasing hormones such as cortisol. Short-term stress can mobilise immune responses, but **chronic** stress tends to suppress some immune functions and promote inflammation (Glaser and Kiecolt-Glaser, 2005). This may increase vulnerability to infection and slow healing.
H: Key studies
P: Kiecolt-Glaser et al. (1995) found small standard wounds healed more slowly in women caring for relatives with dementia than in matched controls. Cohen, Tyrrell and Smith (1991) exposed volunteers to cold viruses and found that higher psychological stress was associated with a greater risk of developing a cold, in a dose-response pattern.
X: Interpreting the evidence
> In Cohen et al.'s study, participants were quarantined and deliberately exposed to viruses, allowing better control than observational studies.
> Caregiver studies compare naturally stressed groups, so other differences, such as sleep or age, may contribute.
> Combining experimental and naturalistic studies strengthens the overall case.
H: Evaluation
P: PNI shows that mind and body interact and supports the biopsychosocial model. Effects are real but often modest, and pathways involve behaviour (sleep, diet, smoking) as well as direct hormonal effects. Translating findings into interventions, such as stress management to improve immunity, has had mixed results.
K: Chronic stress can suppress immune function and promote inflammation; wounds heal more slowly in stressed caregivers; stress increases cold risk in a dose-response pattern; effects are modest and involve behaviour.
!: Assuming stress directly causes illness on its own. Stress raises vulnerability through several pathways.
EV: established | Cohen, Tyrrell and Smith (1991) found higher stress was associated with greater risk of developing a cold after virus exposure.
EV: contested | How large and clinically important stress effects on immunity are is debated.
T: Psychoneuroimmunology | The study of interactions between mind, nervous system and immune system
T: HPA axis | The hypothalamic–pituitary–adrenal stress response system
T: Dose-response | A pattern where more exposure produces a larger effect
SUM: Chronic stress can weaken immunity and promote inflammation.
SUM: Slower wound healing and higher cold risk; effects are modest.
SRC: Kiecolt-Glaser J. K. et al., "Slowing of wound healing by psychological stress", The Lancet 346(8984):1194–1196 | primary | 1995 | https://doi.org/10.1016/S0140-6736(95)92899-5
SRC: Cohen S., Tyrrell D. A. J. and Smith A. P., "Psychological stress and susceptibility to the common cold", New England Journal of Medicine 325(9):606–612 | primary | 1991 | https://doi.org/10.1056/NEJM199108293250903
SRC: Glaser R. and Kiecolt-Glaser J. K., "Stress-induced immune dysfunction: implications for health", Nature Reviews Immunology 5(3):243–251 | primary | 2005 | https://doi.org/10.1038/nri1571
Q: What is psychoneuroimmunology? | The study of how psychological processes, the nervous system and the immune system interact.
Q: What did Kiecolt-Glaser et al. (1995) find? | Wounds healed more slowly in dementia caregivers than in matched controls.
M1#psychology-u16-16-q1@1: A pattern in which more stress produces a larger effect is called… | Dose-response | Centrality | Precision weighting | Cue combination | A dose-response pattern means more exposure produces a larger effect.
M2#psychology-u16-16-q2@2: Students' wounds heal more slowly during exam periods than during holidays. PNI explains this through… | Stress affecting immune function | Loss aversion | Reverse inference | Ecological rationality | Stress hormones such as cortisol can suppress immune processes and slow healing.
TF2#psychology-u16-16-q3@2: Cohen et al. (1991) deliberately exposed volunteers to cold viruses. | true | Controlled exposure allowed stronger inference.
M3#psychology-u16-16-q4@3: Why are caregiver studies weaker than Cohen et al.'s study? | Naturally stressed groups may differ in other ways | Caregivers are never actually stressed | They used deliberate virus exposure | They had no comparison group at all | Confounds such as sleep or age may contribute.
SA2#psychology-u16-16-q5@2,3: Explain how stress may affect the immune system and assess the evidence. | Stress systems and immunity; Glaser and Kiecolt-Glaser; wound healing; Cohen et al.; experimental vs naturalistic; behavioural pathways; modest effects. | Mechanisms ; Studies ; Evaluation

## Behavioural genetics
LV: Intermediate · Evaluation
S: Behavioural genetics studies how genetic and environmental differences contribute to differences in behaviour. This lesson examines heritability, polygenic scores and common misunderstandings.
O: Explain heritability and how it is estimated
O: Describe polygenic scores and the missing heritability problem
O: Evaluate common misinterpretations of genetic findings
PRE: Genetics and behaviour
H: Heritability
P: **Heritability** is the proportion of variation in a trait within a population that is associated with genetic variation. Twin studies compare identical and non-identical twins. Polderman et al. (2015) meta-analysed fifty years of twin studies covering 17,804 traits and found an average heritability of about 49%: almost all traits are partly heritable, and environment matters for all of them.
H: Polygenic scores
P: Most behavioural traits are **polygenic**: influenced by thousands of genetic variants, each with tiny effects. **Genome-wide association studies** identify variants, which can be combined into **polygenic scores**. These currently predict much less variation than twin studies suggest, the **missing heritability** problem. Plomin and von Stumm (2018) discussed polygenic scores for educational attainment as early but growing predictors.
X: Heritability depends on environment
> Turkheimer et al. (2003) found that the heritability of IQ in young children was much lower in families with low socio-economic status than in wealthier families.
> In deprived environments, environmental differences may have a larger influence.
> This shows heritability is not a fixed property of a trait.
H: Evaluation
P: Behavioural genetics shows genes and environments both matter. But heritability is often misunderstood: it describes a population, not individuals; high heritability doesn't mean a trait can't change; and it doesn't explain differences between groups. Polygenic scores raise ethical concerns about prediction and discrimination.
K: Heritability is population-level variation linked to genes; twin studies suggest average heritability around 49%; polygenic scores predict less than twin studies; heritability varies with environment.
!: Treating heritability as how much of an individual's trait is caused by genes. It describes variation in a population.
EV: established | Polderman et al. (2015) found an average heritability of about 49% across 17,804 traits in twin studies.
EV: contested | How useful and ethical polygenic scores are for predicting behaviour is debated.
T: Heritability | The proportion of variation in a trait associated with genetic variation in a population
T: Polygenic score | A combined estimate of many genetic variants' effects
T: Missing heritability | The gap between twin-based heritability and variance explained by measured genes
SUM: Heritability averages about 49% across traits; environment always matters.
SUM: Polygenic scores and missing heritability; heritability varies with environment.
SRC: Polderman T. J. C. et al., "Meta-analysis of the heritability of human traits based on fifty years of twin studies", Nature Genetics 47(7):702–709 | primary | 2015 | https://doi.org/10.1038/ng.3285
SRC: Plomin R. and von Stumm S., "The new genetics of intelligence", Nature Reviews Genetics 19(3):148–159 | primary | 2018 | https://doi.org/10.1038/nrg.2017.104
SRC: Turkheimer E. et al., "Socioeconomic status modifies heritability of IQ in young children", Psychological Science 14(6):623–628 | primary | 2003 | https://doi.org/10.1046/j.0956-7976.2003.psci_1475.x
Q: What is missing heritability? | The gap between twin-based heritability estimates and the variation explained by measured genetic variants.
Q: What did Polderman et al. (2015) find? | An average heritability of about 49% across 17,804 traits.
M1#psychology-u16-17-q1@1: A combined estimate of many genetic variants' effects on a trait is a… | Polygenic score | Heritability estimate | Concordance rate | Centrality index | Polygenic scores add up many small effects.
NUM2#psychology-u16-17-q2@2: According to Polderman et al. (2015), what was the average heritability (%) across traits in twin studies? | 49 | 1 | % | Across 17,804 traits, average heritability was about 49%.
M2#psychology-u16-17-q3@2: A trait is 60% heritable in a population. A student concludes it is 60% caused by genes in each person. This is… | A misinterpretation of heritability | A correct interpretation | Missing heritability | A polygenic score | Heritability describes population variation, not individuals.
TF2#psychology-u16-17-q4@2: Turkheimer et al. found the heritability of IQ was lower in low-SES families. | true | Environment shaped how much genetic variation mattered.
M3#psychology-u16-17-q5@3: Why doesn't high heritability mean a trait can't change? | Environments can still shift the trait for everyone | Heritable traits are fixed for life | Genes determine everything about us | The environment never matters at all | Height is heritable but has risen with nutrition.
SA3#psychology-u16-17-q6@3: Evaluate what behavioural genetics can tell us about behaviour. | Heritability and twin studies (Polderman); polygenic scores and missing heritability (Plomin and von Stumm); Turkheimer; misinterpretations; ethics; judgement. | Heritability ; Genomics ; Misunderstandings ; Judgement

## Epigenetics and behaviour
LV: Advanced · Evaluation
S: Epigenetics studies changes in how genes are expressed without changes to the DNA sequence. This lesson examines evidence that experience can shape gene expression and behaviour, and the limits of current claims.
O: Explain epigenetic mechanisms such as DNA methylation
O: Describe animal and human evidence linking experience to epigenetic change
O: Evaluate claims about epigenetic inheritance in humans
PRE: Epigenetics
H: Mechanisms
P: **Epigenetic** mechanisms, such as **DNA methylation** and changes to histone proteins, affect whether genes are switched on or off. These marks can respond to the environment, offering a possible route by which experience "gets under the skin". Epigenetic patterns differ between tissues, so changes in blood may not reflect changes in the brain.
H: Evidence
P: Weaver et al. (2004) found that rat pups who received more licking and grooming from their mothers had different methylation of a stress-related gene in the hippocampus and calmer stress responses as adults; cross-fostering showed the effect followed the caregiving, not the birth mother. In humans, Heijmans et al. (2008) found people prenatally exposed to the Dutch Hunger Winter of 1944–45 had different methylation of a growth-related gene about six decades later.
X: Inheritance across generations?
> Some animal studies suggest stress effects can pass to offspring through epigenetic marks.
> In humans, evidence for **transgenerational** epigenetic inheritance, across generations not directly exposed, is limited and contested.
> Most epigenetic marks are reset during early development, which makes inheritance difficult.
H: Evaluation
P: Epigenetics shows genes and environment are intertwined, undermining simple nature–nurture divisions. But many human studies are small, correlational and measure marks in blood rather than brain. Popular claims about inherited trauma often go far beyond current evidence.
K: Epigenetic marks such as DNA methylation regulate gene expression and can respond to experience; Weaver et al. and the Dutch Hunger Winter provide evidence; transgenerational inheritance in humans is contested.
!: Assuming trauma is commonly inherited through epigenetic marks. Human evidence is limited.
EV: established | Heijmans et al. (2008) found methylation differences decades later in people prenatally exposed to the Dutch Hunger Winter.
EV: contested | Whether epigenetic effects are inherited across human generations is debated.
T: Epigenetics | Changes in gene expression without changes to the DNA sequence
T: DNA methylation | Chemical marks on DNA that affect gene expression
T: Transgenerational inheritance | Effects passing to generations not directly exposed
SUM: Epigenetic marks regulate gene expression and respond to experience.
SUM: Animal and Dutch Hunger Winter evidence; human transgenerational claims are contested.
SRC: Weaver I. C. G. et al., "Epigenetic programming by maternal behavior", Nature Neuroscience 7(8):847–854 | primary | 2004 | https://doi.org/10.1038/nn1276
SRC: Heijmans B. T. et al., "Persistent epigenetic differences associated with prenatal exposure to famine in humans", PNAS 105(44):17046–17049 | primary | 2008 | https://doi.org/10.1073/pnas.0806560105
Q: What is DNA methylation? | Chemical marks on DNA that affect whether genes are expressed.
Q: What did Weaver et al. (2004) find? | Rat pups receiving more maternal care had different methylation of a stress-related gene and calmer stress responses.
M1#psychology-u16-18-q1@1: Changes in gene expression without changes to the DNA sequence are studied in… | Epigenetics | Heritability | Polygenic scoring | Predictive processing | Epigenetics concerns gene expression, not sequence.
M2#psychology-u16-18-q2@2: Cross-fostered rat pups show stress responses matching their foster mother's care, not their birth mother's. This suggests… | Caregiving shaped gene expression | Genes alone determined behaviour | No epigenetic effect | Inheritance through DNA sequence | The stress response followed the foster mother's caregiving, not the birth mother's genes.
TF2#psychology-u16-18-q3@2: Epigenetic marks measured in blood always reflect those in the brain. | false | Epigenetic patterns differ between tissues.
M3#psychology-u16-18-q4@3: Why are popular claims about inherited trauma criticised? | Human evidence for transgenerational effects is limited | It has been proven in all families | Epigenetics doesn't exist at all | Epigenetic marks are never reset at all | Popular claims about inherited trauma often outrun the current human evidence.
SA3#psychology-u16-18-q5@3: Evaluate the evidence that experience shapes behaviour through epigenetics. | Mechanisms; Weaver et al.; Dutch Hunger Winter (Heijmans et al.); transgenerational claims; tissue and correlational limits; nature–nurture; judgement. | Mechanisms ; Evidence ; Inheritance ; Judgement

## Open science and the replication crisis
LV: Intermediate · Evaluation
S: In the 2010s, psychology faced a replication crisis when many well-known findings failed to replicate. This lesson examines the causes of the crisis and the open science reforms it inspired.
O: Describe evidence of the replication crisis
O: Explain questionable research practices that contributed to it
O: Evaluate open science reforms
PRE: Open science
H: The crisis
P: The Open Science Collaboration (2015) repeated 100 studies from three psychology journals. While 97% of the original studies reported significant results, only 36% of the replications did, and replication effect sizes were on average about half the original size. Camerer et al. (2018) replicated 21 social science experiments published in Nature and Science and found significant effects in 13.
IX: study-critique
H: Causes
P: Simmons, Nelson and Simonsohn (2011) showed how **questionable research practices**, such as collecting more data until results are significant, trying many analyses, or reporting only some measures, can make false positives very likely. **Publication bias** favours significant results, and small samples produce unstable, inflated effects. Incentives rewarded novel, positive findings over careful replication.
X: Open science reforms
> **Preregistration** records hypotheses and analysis plans before data collection.
> **Registered Reports**, introduced at the journal Cortex in 2013, are peer reviewed before results are known, and accepted regardless of outcome.
> **Data and materials sharing** and **large multi-site studies** improve transparency and power (Munafò et al., 2017).
H: Evaluation
P: The crisis prompted major reforms that are improving reliability. Some argue failures to replicate partly reflect differences in context or methods. Reforms can add workload and don't suit every kind of research, such as exploratory or qualitative work. Psychology is now a leader in developing open science practices.
K: The Open Science Collaboration found 36% of 100 studies replicated significantly; questionable research practices and publication bias contributed; preregistration, Registered Reports and data sharing are key reforms.
!: Concluding that psychology is unreliable as a whole. Many findings replicate, and reforms are improving the field.
EV: established | The Open Science Collaboration (2015) found 36% of 100 replications produced significant results.
EV: contested | How far failed replications reflect false originals rather than differences in context is debated.
T: Questionable research practices | Analytic choices that inflate false-positive rates
T: Preregistration | Recording hypotheses and analyses before collecting data
T: Registered Report | A study peer reviewed and accepted before results are known
SUM: 36% of 100 studies replicated significantly; effect sizes halved.
SUM: QRPs and publication bias contributed; preregistration and Registered Reports respond.
SRC: Open Science Collaboration, "Estimating the reproducibility of psychological science", Science 349(6251):aac4716 | primary | 2015 | https://doi.org/10.1126/science.aac4716
SRC: Simmons J. P., Nelson L. D. and Simonsohn U., "False-positive psychology: undisclosed flexibility in data collection and analysis allows presenting anything as significant", Psychological Science 22(11):1359–1366 | primary | 2011 | https://doi.org/10.1177/0956797611417632
SRC: Munafò M. R. et al., "A manifesto for reproducible science", Nature Human Behaviour 1:0021 | primary | 2017 | https://doi.org/10.1038/s41562-016-0021
SRC: Chambers C. D., "Registered Reports: a new publishing initiative at Cortex", Cortex 49(3):609–610 | primary | 2013 | https://doi.org/10.1016/j.cortex.2012.12.016
Q: What did the Open Science Collaboration (2015) find? | Only 36% of 100 replications produced significant results, with effect sizes about half the originals.
Q: What is a Registered Report? | A study peer reviewed and accepted before results are known.
M1#psychology-u16-19-q1@1: Recording hypotheses and analysis plans before collecting data is… | Preregistration | Publication bias | p-hacking | Meta-analysis | Preregistration limits flexible analysis.
NUM2#psychology-u16-19-q2@2: In the Open Science Collaboration (2015), what percentage of replications produced significant results? | 36 | 1 | % | 36% compared with 97% of the original studies.
M2#psychology-u16-19-q3@2: A researcher keeps adding participants and testing until p falls below .05, then stops. This is… | A questionable research practice | Preregistration of analyses | A Registered Report | A direct replication | Optional stopping inflates false positives.
TF2#psychology-u16-19-q4@2: Camerer et al. (2018) found all 21 Nature and Science experiments replicated. | false | Significant effects were found in 13 of 21.
M3#psychology-u16-19-q5@3: Why might some replication failures not mean the original was false? | Differences in context or methods may matter | Replications are always flawed | Originals are always right | Context never matters | Hidden moderators, such as differences in context or samples, can change results.
SA3#psychology-u16-19-q6@3: Evaluate the replication crisis and the open science response. | OSC (2015) and Camerer et al. (2018); QRPs (Simmons et al.); publication bias and small samples; preregistration, Registered Reports, data sharing (Munafò); context debate; judgement. | Evidence ; Causes ; Reforms ; Judgement

## Current debates in psychology
LV: Advanced · Evaluation
S: Psychology is a lively, contested science. This lesson examines current debates about how mental health should be classified, whose experiences psychology represents and how psychology should be used in society.
O: Describe debates about classifying mental health conditions
O: Explain debates about representation and decolonising psychology
O: Evaluate psychology's role in public policy
PRE: Open science and the replication crisis
H: Classifying mental health
P: Categorical systems such as the DSM and ICD have been criticised for **comorbidity**, **heterogeneity** (people with the same diagnosis may share few symptoms) and arbitrary thresholds. Alternatives include the **Research Domain Criteria** (RDoC; Insel et al., 2010), which studies dimensions such as threat and reward across levels from genes to behaviour, and the **Hierarchical Taxonomy of Psychopathology** (HiTOP; Kotov et al., 2017), which organises symptoms into dimensional spectra.
H: Whose psychology?
P: The WEIRD critique showed that much research uses narrow samples. Calls to **decolonise** psychology argue that theories and methods developed in Western contexts have been treated as universal, marginalising other knowledge, and that psychology was historically used to justify racism, as in early intelligence testing. Responses include global collaborations, indigenous psychologies and attention to diversity in samples and researchers.
X: Psychology and policy
> Psychological research informs policy on education, health, criminal justice and behaviour change.
> Supporters argue evidence-based policy improves lives; critics warn about over-claiming from fragile findings and about using psychology to individualise social problems.
> The replication crisis has encouraged caution in translating findings into policy.
H: Evaluation
P: Debates show psychology is self-critical and evolving. Dimensional models may better fit evidence but are harder to use clinically. Broadening whose psychology is studied improves validity. Responsible translation into policy requires robust evidence and humility about limits.
K: Categorical diagnosis faces comorbidity and heterogeneity problems; RDoC and HiTOP offer dimensional alternatives; WEIRD and decolonising critiques challenge universality; psychology's role in policy needs robust evidence.
!: Seeing debate as weakness. Critical debate is how science improves.
EV: established | HiTOP (Kotov et al., 2017) proposed a dimensional, hierarchical alternative to categorical diagnosis.
EV: contested | Whether dimensional systems should replace categorical diagnosis in clinical practice is debated.
T: Heterogeneity | People with the same diagnosis having different symptoms
T: Dimensional model | Describing difficulties along continuous spectra rather than categories
T: Decolonising psychology | Challenging the dominance of Western theories and methods
SUM: Categorical diagnosis is challenged by RDoC and HiTOP.
SUM: WEIRD and decolonising critiques; psychology in policy needs robust evidence.
SRC: Kotov R. et al., "The Hierarchical Taxonomy of Psychopathology (HiTOP): a dimensional alternative to traditional nosologies", Journal of Abnormal Psychology 126(4):454–477 | primary | 2017 | https://doi.org/10.1037/abn0000258
SRC: Insel T. et al., "Research Domain Criteria (RDoC): toward a new classification framework for research on mental disorders", American Journal of Psychiatry 167(7):748–751 | primary | 2010 | https://doi.org/10.1176/appi.ajp.2010.09091379
SRC: Henrich J., Heine S. J. and Norenzayan A., "The weirdest people in the world?", Behavioral and Brain Sciences 33(2–3):61–83 | primary | 2010 | https://doi.org/10.1017/S0140525X0999152X
Q: What is HiTOP? | A dimensional, hierarchical system organising symptoms into spectra as an alternative to categorical diagnosis.
Q: What do calls to decolonise psychology argue? | Western theories and methods have been treated as universal, marginalising other knowledge.
M1#psychology-u16-20-q1@1: Describing difficulties along continuous spectra rather than categories is a… | Dimensional model | Categorical model | Registered Report | Polygenic score | Dimensional models describe difficulties along continua rather than as categories.
M2#psychology-u16-20-q2@2: Two people diagnosed with the same condition share only one symptom. This illustrates… | Heterogeneity | Comorbidity | Preregistration | Loss aversion | Different symptom profiles within a diagnosis show heterogeneity.
TF2#psychology-u16-20-q3@2: RDoC studies dimensions such as threat and reward across levels from genes to behaviour. | true | Insel et al. proposed this research framework.
M3#psychology-u16-20-q4@3: Why has the replication crisis encouraged caution in psychology-based policy? | Fragile findings may not hold up in practice | All findings are robust | Policy never uses psychology | Replication has no relevance | Unreliable evidence can lead to ineffective policy.
SA3#psychology-u16-20-q5@3: Evaluate key debates in contemporary psychology. | Diagnostic classification (DSM/ICD, RDoC, HiTOP); WEIRD and decolonising critiques; psychology in policy; replication; judgement. | Classification ; Representation ; Policy ; Judgement

## Future directions
LV: Advanced · Evaluation
S: Psychology is changing through large-scale collaboration, new technology and broader participation. This lesson examines emerging directions and how they might shape the discipline.
O: Describe emerging directions in psychological research
O: Explain the role of big team science and global samples
O: Evaluate opportunities and risks of future directions
PRE: Current debates in psychology
H: Emerging directions
- **Big team science**: large collaborations run the same study across many countries.
- **Computational and AI methods**: modelling behaviour and analysing language, images and passive data.
- **Precision approaches**: tailoring interventions to individuals' profiles.
- **Interdisciplinary work**: combining psychology with genetics, neuroscience, economics and sociology.
- **Open and global science**: diverse samples and researchers.
H: Big team science
P: The **Psychological Science Accelerator** (Moshontz et al., 2018) is a network of laboratories worldwide that run studies together, increasing sample size, diversity and generalisability. Multi-lab projects such as the Many Labs studies test whether effects replicate across cultures and settings.
X: Opportunities and risks
> Passive data from phones and wearables could track mood and behaviour in daily life.
> This raises privacy, consent and bias concerns, especially if data are used commercially.
> Researchers argue that ethical frameworks must develop alongside technical capabilities.
H: Evaluation
P: Future directions promise more reliable, generalisable and useful psychology. But large-scale and digital approaches raise ethical questions and risk concentrating resources in wealthy institutions. Psychology's future depends on combining methodological rigour with ethical responsibility and openness to diverse perspectives.
K: Future psychology involves big team science, computational and AI methods, precision approaches, interdisciplinary work and global participation; ethical and equity challenges accompany these opportunities.
!: Assuming new technology automatically improves psychology. Rigour and ethics matter as much as tools.
EV: established | The Psychological Science Accelerator is a global network of laboratories running studies together (Moshontz et al., 2018).
EV: contested | Whether precision approaches will substantially improve psychological interventions is debated.
T: Big team science | Large collaborations running studies across many sites
T: Precision approach | Tailoring interventions to individuals' profiles
T: Passive data | Data collected automatically from devices without active input
SUM: Big team science, computation, precision and global participation shape the future.
SUM: Opportunities come with ethical and equity challenges.
SRC: Moshontz H. et al., "The Psychological Science Accelerator: advancing psychology through a distributed collaborative network", Advances in Methods and Practices in Psychological Science 1(4):501–515 | primary | 2018 | https://doi.org/10.1177/2515245918797607
SRC: Munafò M. R. et al., "A manifesto for reproducible science", Nature Human Behaviour 1:0021 | primary | 2017 | https://doi.org/10.1038/s41562-016-0021
Q: What is the Psychological Science Accelerator? | A global network of laboratories that run studies together.
Q: What are passive data? | Data collected automatically from devices without active input from the user.
M1#psychology-u16-21-q1@1: Large collaborations running the same study across many sites are called… | Big team science | Precision psychiatry | Registered Reports | Reverse inference | Big team science pools sites and samples.
M2#psychology-u16-21-q2@2: A study runs the same experiment in 40 countries to test whether an effect generalises. This illustrates… | Big team science | Reverse inference | Overfitting | Cognitive offloading | Multi-site studies test generalisability.
TF2#psychology-u16-21-q3@2: Passive data collection from phones raises no ethical concerns. | false | It raises privacy, consent and bias concerns.
M3#psychology-u16-21-q4@3: Why might big team science risk inequality? | Resources may concentrate in wealthy institutions | It always includes everyone equally | It has no costs | It uses tiny samples | Funding and leadership can remain unequal.
SA3#psychology-u16-21-q5@3: Evaluate the opportunities and risks of future directions in psychology. | Emerging directions; big team science (PSA, Many Labs); computational and AI methods; precision approaches; passive data ethics; equity; judgement. | Directions ; Collaboration ; Ethics ; Judgement
`;
