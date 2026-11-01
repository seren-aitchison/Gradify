// PsychGradify Psychology: the full curriculum, 16 schools, from the PsychGradify brief. Each topic in the brief is
// taught as one lesson, grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent (ids.js),
// u01-01 style, as for every Gradify course: never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Foundations of Psychology
> What psychology is
* What is psychology?
* The history of psychology
* Psychology as a science
* Psychology and its neighbouring disciplines
* The aims of psychological research
> Schools of thought
* Structuralism and functionalism
* Behaviourism
* The cognitive approach
* The psychodynamic approach
* The humanistic approach
* The biological approach
* The evolutionary approach
* The social approach
* Positive psychology
* Contemporary psychology
> Debates in psychology
* Levels of explanation
* Reductionism and holism
* The nature–nurture debate
* Individual differences
> Psychology in the world
* Psychology in everyday life
* Careers in psychology
2. Biological Psychology and Neuroscience
> The nervous system
* Organisation of the nervous system
* The central nervous system
* The peripheral nervous system: somatic and autonomic
* Sympathetic and parasympathetic divisions
> Neurones and signalling
* Neurone structure and types
* The resting potential
* Action potentials
* Synaptic transmission
* Neurotransmitters and receptors
* Excitatory and inhibitory signalling
> The brain
* Brain anatomy: an overview
* The cerebral cortex and the four lobes
* The limbic system: hippocampus and amygdala
* Hypothalamus and thalamus
* Basal ganglia and cerebellum
* Lateralisation of function
* Neuroplasticity
* Neurogenesis
> Hormones, rhythms and sleep
* Hormones and the endocrine system
* Circadian rhythms
* Sleep
> Genes and evolution
* Genetics and behaviour
* Epigenetics
* Evolution and the brain
> Methods and applications
* Brain imaging: EEG, MRI, fMRI and PET
* Lesion studies
* Psychopharmacology
* Biological explanations of mental disorders
3. Cognitive Psychology
> Information processing and attention
* The information-processing approach
* Selective attention
* Divided attention
* Sustained attention
> Perception
* Sensation and perception
* Visual perception
* Auditory perception
* Gestalt principles
* Pattern recognition
> Memory systems
* Sensory memory
* Short-term memory
* Working memory
* Long-term memory: episodic, semantic and procedural
* Encoding, storage and retrieval
> Forgetting and memory accuracy
* Forgetting
* Interference
* Retrieval failure
* Reconstructive memory and false memories
* Eyewitness testimony
> Language
* Language acquisition
* Language processing
* Speech production
> Thinking
* Problem solving
* Reasoning
* Decision-making
* Biases and heuristics
* Metacognition
> Intelligence and the lifespan
* Cognitive development
* Theories of intelligence
* Intelligence testing
* Creativity
* Cognitive ageing
4. Learning and Behaviour
> Classical conditioning
* Classical conditioning
* Acquisition and extinction
* Spontaneous recovery
* Generalisation and discrimination
> Operant conditioning
* Operant conditioning
* Positive and negative reinforcement
* Punishment
* Schedules of reinforcement
* Shaping
* Behaviour modification
> Social and cognitive learning
* Observational learning
* Social learning theory
* Modelling and imitation
* Vicarious reinforcement
* Latent learning
* Insight learning
> Limits and applications
* Biological constraints on learning
* Habituation and sensitisation
* Habit formation
* Applications of learning theory
5. Developmental Psychology
> The lifespan
* Prenatal development
* Infancy
* Childhood
* Adolescence
* Adulthood and ageing
* Lifespan perspectives
> Cognitive development
* Piaget's theory of cognitive development
* Vygotsky and sociocultural development
* Information-processing approaches to development
* Language development
> Attachment and relationships
* Emotional development
* Social development
* Bowlby's attachment theory
* Ainsworth and the Strange Situation
* Measuring attachment
* Caregivers and parenting styles
* Peers and friendship
* Family influences
> Identity and morality
* Identity development
* Erikson's psychosocial stages
* Moral development: Kohlberg
> Atypical development
* Risk and resilience
* Neurodevelopment
* Neurodevelopmental conditions
* Developmental psychopathology
> Studying development
* Developmental research methods
6. Social Psychology
> Social cognition
* Social cognition
* Social perception and impressions
* Attribution
* The fundamental attribution error and self-serving bias
> Attitudes
* Attitude formation
* Attitude change and persuasion
* Cognitive dissonance
> Social influence
* Conformity
* Obedience
* Compliance
* Social norms
> Groups
* Group dynamics
* Group decision-making
* Leadership
* Power
> Identity and intergroup relations
* Social identity theory
* Self-categorisation
* In-groups and out-groups
* Prejudice, stereotyping and discrimination
* Intergroup relations and conflict
> Helping, harming and relating
* Bystander behaviour
* Prosocial behaviour and altruism
* Aggression
* Attraction
* Close relationships
> Culture
* Culture and social behaviour
7. Personality and Individual Differences
> Trait approaches
* Trait theories of personality
* The Big Five
* Eysenck's theory
* Biological approaches to personality
> Other perspectives
* Freud's psychodynamic theory of personality
* Humanistic approaches to personality
> The self
* Self-concept
* Self-esteem
* Self-efficacy
> Development and stability
* Temperament
* Personality development
* Stability and change in personality
> Assessment
* Personality assessment: psychometric tests
* Projective tests
> Intelligence and ability
* General intelligence (g)
* Fluid and crystallised intelligence
* Multiple intelligences
* Emotional intelligence
* Cognitive differences
> Motivation and outcomes
* Motivation and individual differences
* Achievement motivation
* Personality, behaviour and mental health
* Personality across cultures
8. Psychopathology
> Understanding abnormality
* Defining abnormality
* A history of psychopathology
> Models of mental disorder
* The biological model
* The cognitive model
* The behavioural model
* The psychodynamic model
* The humanistic model
* The diathesis–stress model
* The biopsychosocial model
> Classification
* Classification: DSM and ICD
* Reliability and validity of diagnosis
> Anxiety and related disorders
* Generalised anxiety disorder
* Panic disorder
* Specific phobias
* Social anxiety disorder
* Obsessive-compulsive disorder
* Trauma and post-traumatic stress disorder
> Mood and psychotic disorders
* Depression
* Bipolar disorder
* Schizophrenia and psychosis
> Other conditions
* Personality disorders
* Eating disorders
* Substance use disorders
* Autism
* ADHD
* Sleep disorders
* Dissociative disorders
* Somatic symptom disorders
> Context
* Risk and protective factors
* Comorbidity
* Stigma
* Culture and psychopathology
9. Clinical Psychology and Interventions
> Assessment and formulation
* Clinical assessment
* Clinical interviews
* Mental state assessment
* Psychological testing in clinical practice
* Formulation
> Therapies
* Cognitive behavioural therapy (CBT)
* Behavioural therapy
* Exposure therapy
* Acceptance and commitment therapy (ACT)
* Dialectical behaviour therapy (DBT)
* Psychodynamic therapy
* Humanistic and person-centred therapy
* Family therapy
* Group therapy
* Interpersonal therapy (IPT)
* Trauma-focused therapies
> Treating specific problems
* Psychological treatment of depression
* Psychological treatment of anxiety disorders
* Psychological treatment of OCD
* Psychological treatment of PTSD
* Psychological interventions for psychosis
* Relapse prevention
> Practice and evidence
* The therapeutic relationship
* Clinical supervision
* Measuring therapy outcomes
* Evidence-based practice
* Ethics in clinical practice
* Professional boundaries
10. Research Methods
> Scientific reasoning
* Scientific reasoning in psychology
* Research questions and hypotheses
* Operationalisation
* Independent and dependent variables
* Confounding variables
> Experiments
* Experimental design
* Laboratory experiments
* Field experiments
* Natural experiments
* Quasi-experiments
> Non-experimental methods
* Correlational research
* Cross-sectional and longitudinal research
* Case studies
* Naturalistic observation
* Structured observation
* Surveys and questionnaires
* Interviews
* Focus groups
> Approaches and sampling
* Quantitative, qualitative and mixed methods
* Random and stratified sampling
* Opportunity and volunteer sampling
* Sample size
> Quality of research
* Reliability
* Validity
* Generalisability
* Bias in research
* Replication
* Preregistration
* Open science
> Research ethics
* Informed consent
* Confidentiality
* Deception and debriefing
* Vulnerable participants
* Research governance and ethics committees
11. Statistics
> Describing data
* Levels of measurement
* Measures of central tendency
* Measures of dispersion: range, variance and standard deviation
* Distributions: normal, skew and kurtosis
* Data visualisation
> Probability and inference
* Probability
* Sampling distributions and standard error
* Confidence intervals
> Hypothesis testing
* Null and alternative hypotheses
* p-values and statistical significance
* Effect sizes
* Statistical power
* Type I and Type II errors
> Relationships
* Correlation: Pearson and Spearman
* Simple linear regression
* Multiple regression
> Comparing groups
* Independent t-tests
* Paired t-tests
* Analysis of variance (ANOVA)
* Chi-square tests
* Non-parametric tests
> Doing statistics well
* Meta-analysis
* Reproducible analysis
* Statistical software
* Interpreting and reporting results
12. Evolutionary Psychology and Behavioural Ecology
> Evolutionary principles
* Adaptation
* Natural selection
* Sexual selection
> Evolved minds
* Evolution of cognition
* Evolution of emotion
> Social evolution
* Kin selection and inclusive fitness
* Reciprocal altruism
* Evolution of cooperation
* Mating strategies
* Parental investment
* Attachment in evolutionary perspective
* Aggression in evolutionary perspective
* Social behaviour in evolutionary perspective
> Wider perspectives
* Behavioural ecology
* Cultural evolution
* Evolutionary developmental psychology
* Critiques of evolutionary psychology
13. Motivation, Emotion and Wellbeing
> Motivation
* Intrinsic and extrinsic motivation
* Drive theories
* Incentive theories
* Self-determination theory
* Goal-setting theory
* Achievement motivation in context
> Emotion
* Theories of emotion: James–Lange and Cannon–Bard
* The two-factor theory: Schachter–Singer
* Emotion regulation
> Stress and coping
* Stress
* The physiology of stress
* Coping
* Resilience
> Wellbeing
* Subjective wellbeing
* Happiness
* Positive psychology in practice
* Flow
* Gratitude
* Mindfulness research
* Flourishing
14. Applied Psychology
> Educational psychology
* Educational psychology
* Achievement and motivation in education
* Behaviour in schools
* Assessment in education
* Individual differences in learning
* Inclusion and special educational needs
> Occupational psychology
* Occupational psychology
* Work motivation
* Leadership at work
* Organisational behaviour
* Job satisfaction
* Wellbeing at work
* Burnout
> Human factors
* Human factors and ergonomics
* Mental workload
* Human–computer interaction
> Other applied fields
* Consumer and marketing psychology
* Health psychology
* Behaviour change
* Psychology and public health
* Environmental psychology
* Forensic psychology
* Psychology and the law
* Sport and performance psychology
15. Cultural and Cross-Cultural Psychology
> Culture and the mind
* Culture and cognition
* Culture and perception
* Culture and emotion
* Individualism and collectivism
> Culture and identity
* Cultural identity
* Acculturation
* Cultural adaptation
> Studying culture
* Cross-cultural research methods
* Ethnocentrism and cultural relativism
> Culture across psychology
* Culture and personality
* Culture and development
* Culture and mental health
* Culture and diagnosis
* Language and thought
* Indigenous psychologies
* Globalisation and psychology
16. Contemporary Psychology
> Brains and computation
* Cognitive neuroscience today
* Computational psychology
* Computational psychiatry
* Artificial intelligence and psychology
> Technology and behaviour
* Digital mental health
* Social media and psychology
* The psychology of technology
* Human–computer interaction today
> Decisions and economics
* Neuroeconomics
* Behavioural economics
* Decision science
> New theories of mind
* Predictive processing
* Embodied cognition
* Bayesian cognition
* Network approaches to mental health
> Biology and behaviour
* Psychoneuroimmunology
* Behavioural genetics
* Epigenetics and behaviour
> The state of the field
* Open science and the replication crisis
* Current debates in psychology
* Future directions
`;

// stages on the map; PsychGradify's colours run from lilac through violet to blue
export const TRACKS = [
  { name: "Stage 1 · Foundations and methods", units: [1, 10, 11], from: "#bbabbe", to: "#8b5cf6" },
  { name: "Stage 2 · Brain, mind and learning", units: [2, 3, 4], from: "#a78bfa", to: "#6366f1" },
  { name: "Stage 3 · People in context", units: [5, 6, 7], from: "#c084fc", to: "#818cf8" },
  { name: "Stage 4 · Mental health", units: [8, 9], from: "#e879f9", to: "#8b5cf6" },
  { name: "Stage 5 · Perspectives and applications", units: [12, 13, 14, 15, 16], from: "#a5b4fc", to: "#22d3ee" },
];

export const PATHS = [
  { id: "alevel", name: "A level Psychology", sub: "The core of A level and equivalent courses: approaches, biopsychology, memory, attachment, social influence, psychopathology and research methods.", units: [1, 2, 3, 5, 6, 8, 10, 11] },
  { id: "year1", name: "University year 1", sub: "The first-year core of a psychology degree: foundations, biological, cognitive, developmental and social psychology, with methods and statistics.", units: [1, 10, 11, 2, 3, 5, 6] },
  { id: "research", name: "Research skills", sub: "From a research question to a reported result: design, ethics, measurement, statistics and open science.", units: [10, 11, 1, 16] },
  { id: "mind-brain", name: "Mind and brain", sub: "Neurones, brain systems, perception, memory, learning and the new computational theories of mind.", units: [2, 3, 4, 16] },
  { id: "mental-health", name: "Mental health", sub: "How mental disorders are understood, classified and treated, in context and across cultures. Educational, not clinical advice.", units: [8, 9, 13, 15] },
  { id: "applied", name: "Applied psychology", sub: "Psychology at school, at work, in health, sport, law and the design of technology.", units: [14, 13, 6, 7] },
  { id: "society", name: "People and society", sub: "Development, social behaviour, personality, culture and evolution: psychology's bridge to SocGradify.", units: [5, 6, 7, 12, 15] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "What psychology is, where it came from, how it works as a science and the debates that run through it.",
  2: "Neurones, synapses, brain systems, hormones, sleep, genes and the methods that study them.",
  3: "Attention, perception, memory, language, thinking, intelligence and how cognition changes with age.",
  4: "Classical and operant conditioning, social and cognitive learning, and their limits and uses.",
  5: "Development from before birth to old age: cognition, attachment, identity, morality and resilience.",
  6: "How other people shape what we think and do: attribution, attitudes, influence, groups and prejudice.",
  7: "Traits, the self, intelligence and motivation: how people differ, how we measure it and why it matters.",
  8: "How mental disorders are defined, explained and classified, from anxiety and depression to psychosis.",
  9: "How psychologists assess, formulate and treat psychological problems, and the evidence for it. Educational only.",
  10: "Designing research well: hypotheses, experiments, observation, surveys, sampling, validity, open science and ethics.",
  11: "Describing data, probability, hypothesis tests, effect sizes, correlation, regression and ANOVA.",
  12: "Adaptation, selection, cooperation, mating and culture: the evolutionary approach and its critics.",
  13: "Why we act, what emotions are, how stress works and what the science of wellbeing has found.",
  14: "Psychology at work: education, occupations, human factors, health, the environment, law and sport.",
  15: "How culture shapes cognition, emotion, identity, development and mental health.",
  16: "Computational models, AI, digital mental health, behavioural economics, predictive processing and replication.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
