// Permanent lesson ids for teaching (see kit/course/syllabus.js). Never delete or reuse an id: saved progress, notes,
// flashcards and attempts depend on them. To rename a lesson, change its title here and in the syllabus. To remove
// one, move its id to RETIRED: retired ids are reserved forever. Written by node scripts/new-course.mjs lock teaching.
export const IDS = {
  "u01-01": "Learning as a change in long-term memory",
  "u01-02": "Working memory and its limits",
  "u01-03": "Long-term memory and schemas",
  "u01-04": "Prior knowledge and how it shapes learning",
  "u01-05": "Misconceptions and conceptual change",
  "u01-06": "Cognitive load theory: Sweller 1988",
  "u01-07": "Intrinsic and extraneous load",
  "u01-08": "The worked example effect",
  "u01-09": "The expertise reversal effect",
  "u01-10": "Split attention and redundancy",
  "u01-11": "Dual coding",
  "u01-12": "Retrieval practice",
  "u01-13": "Spaced practice",
  "u01-14": "Interleaving",
  "u01-15": "Elaboration and generative learning",
  "u01-16": "Forgetting and desirable difficulties",
  "u01-17": "Motivation and self-efficacy",
  "u01-18": "Metacognition and self-regulated learning",
  "u01-19": "Learning styles and other neuromyths",
  "u02-01": "Rosenshine's Principles of Instruction",
  "u02-02": "Explicit instruction and its critics",
  "u02-03": "Daily, weekly and monthly review",
  "u02-04": "Presenting new material in small steps",
  "u02-05": "Modelling and thinking aloud",
  "u02-06": "Worked examples and faded guidance",
  "u02-07": "Questioning to check understanding",
  "u02-08": "Cold calling and no opt out",
  "u02-09": "Hinge questions and mini-whiteboards",
  "u02-10": "Wait time and think-pair-share",
  "u02-11": "Probing questions and extending answers",
  "u02-12": "Scaffolding",
  "u02-13": "Guided practice",
  "u02-14": "Independent practice and a high success rate",
  "u02-15": "Removing scaffolds",
  "u02-16": "Teacher explanations and analogies",
  "u02-17": "Classroom discussion and dialogic teaching",
  "u02-18": "Collaborative learning and groupwork",
  "u03-01": "What adaptive teaching is",
  "u03-02": "Adaptive teaching versus differentiation by task",
  "u03-03": "Responding to pupils within the lesson",
  "u03-04": "Attainment grouping and its evidence",
  "u03-05": "Disadvantaged pupils and the Pupil Premium",
  "u03-06": "Pupils with English as an additional language",
  "u03-07": "Challenging high-attaining pupils",
  "u03-08": "The SEND Code of Practice 2015",
  "u03-09": "The four broad areas of need",
  "u03-10": "The graduated approach: assess, plan, do, review",
  "u03-11": "The role of the SENCO",
  "u03-12": "Education, health and care plans",
  "u03-13": "Working with teaching assistants",
  "u03-14": "The Equality Act 2010 and reasonable adjustments",
  "u03-15": "Communication and interaction needs",
  "u03-16": "Dyslexia and specific learning difficulties",
  "u03-17": "Autism in the classroom",
  "u03-18": "ADHD in the classroom",
  "u03-19": "Social, emotional and mental health needs",
  "u03-20": "Sensory and physical needs",
  "u04-01": "The purposes of assessment",
  "u04-02": "Formative and summative assessment",
  "u04-03": "Validity and reliability",
  "u04-04": "Assessment for learning",
  "u04-05": "Designing assessment questions",
  "u04-06": "Multiple-choice questions and diagnostic distractors",
  "u04-07": "Effective feedback: the EEF guidance",
  "u04-08": "Written and verbal feedback",
  "u04-09": "Marking, purpose and workload",
  "u04-10": "Peer and self-assessment",
  "u04-11": "Whole-class feedback",
  "u04-12": "Using assessment data",
  "u04-13": "Standardised tests and scaled scores",
  "u04-14": "Statutory assessment in England",
  "u04-15": "GCSEs, grading and examinations",
  "u04-16": "Reporting to parents and carers",
  "u05-18": "Classical conditioning",
  "u05-19": "Acquisition and extinction",
  "u05-20": "Spontaneous recovery",
  "u05-21": "Generalisation and discrimination",
  "u05-22": "Operant conditioning",
  "u05-23": "Positive and negative reinforcement",
  "u05-24": "Punishment",
  "u05-25": "Schedules of reinforcement",
  "u05-26": "Shaping",
  "u05-27": "Behaviour modification",
  "u05-28": "Observational learning",
  "u05-29": "Social learning theory",
  "u05-30": "Modelling and imitation",
  "u05-31": "Vicarious reinforcement",
  "u05-32": "Latent learning",
  "u05-33": "Insight learning",
  "u05-34": "Biological constraints on learning",
  "u05-35": "Habituation and sensitisation",
  "u05-36": "Habit formation",
  "u05-37": "Applications of learning theory",
  "u06-01": "What a curriculum is",
  "u06-02": "Intent, implementation and impact",
  "u06-03": "The National Curriculum in England",
  "u06-04": "Powerful knowledge and knowledge-rich curricula",
  "u06-05": "Substantive and disciplinary knowledge",
  "u06-06": "Sequencing and the curriculum as progression model",
  "u06-07": "Subject knowledge and pedagogical content knowledge",
  "u06-08": "Threshold concepts",
  "u06-09": "Anticipating misconceptions in your subject",
  "u06-10": "Core knowledge and hinterland",
  "u06-11": "Cultural capital and a diverse curriculum",
  "u06-12": "Curriculum mapping and coherence",
  "u06-13": "Schemes of work",
  "u06-14": "Textbooks and curriculum resources",
  "u06-15": "Spiral and mastery curricula",
  "u06-16": "Cross-curricular links",
  "u06-17": "Reviewing a curriculum",
  "u07-01": "Planning backwards from outcomes",
  "u07-02": "Planning a sequence of lessons",
  "u07-03": "Learning intentions and success criteria",
  "u07-04": "Activating prior knowledge",
  "u07-05": "The structure of a lesson",
  "u07-06": "Choosing tasks and activities",
  "u07-07": "Planning explanations and models",
  "u07-08": "Planning questions in advance",
  "u07-09": "Homework and independent study",
  "u07-10": "Planning for adaptive teaching",
  "u07-11": "Planning practical work and trips",
  "u07-12": "Evaluating a lesson",
  "u07-13": "Lesson observation and feedback",
  "u07-14": "Planning and workload",
  "u07-15": "Digital technology in the classroom",
  "u07-16": "Artificial intelligence and teaching",
  "u08-01": "Literacy in every subject",
  "u08-02": "Disciplinary literacy",
  "u08-03": "Reading fluency",
  "u08-04": "Reading comprehension strategies",
  "u08-05": "Vocabulary: tiers and explicit teaching",
  "u08-06": "Systematic synthetic phonics and early reading",
  "u08-07": "Teaching writing in subjects",
  "u08-08": "Modelling academic writing",
  "u08-09": "Spelling, punctuation and grammar",
  "u08-10": "What oracy is",
  "u08-11": "Learning to talk and learning through talk",
  "u08-12": "Structuring classroom talk",
  "u08-13": "Sentence stems and speaking frames",
  "u08-14": "Assessing oracy",
  "u09-01": "What safeguarding means",
  "u09-02": "Keeping Children Safe in Education",
  "u09-03": "The designated safeguarding lead",
  "u09-04": "Working Together to Safeguard Children",
  "u09-05": "The four categories of abuse",
  "u09-06": "Signs of abuse and neglect",
  "u09-07": "Responding to a disclosure",
  "u09-08": "Recording and reporting concerns",
  "u09-09": "Child-on-child abuse",
  "u09-10": "Online safety",
  "u09-11": "Child criminal and sexual exploitation",
  "u09-12": "Radicalisation and the Prevent duty",
  "u09-13": "Female genital mutilation: the mandatory reporting duty",
  "u09-14": "Children missing education",
  "u09-15": "Pupil mental health",
  "u09-16": "Allegations against staff and low-level concerns",
  "u09-17": "Safer working practice",
  "u09-18": "Safeguarding children with SEND",
  "u09-19": "Attendance as a safeguarding issue",
  "u10-15": "Why we sleep",
  "u10-16": "Sleep stages and cycles",
  "u10-17": "Circadian rhythms",
  "u10-18": "How much sleep we need",
  "u10-19": "Sleep across the lifespan",
  "u10-20": "Insomnia",
  "u10-21": "Improving sleep",
  "u10-22": "Shift work and sleep",
  "u10-23": "Sleep disorders beyond insomnia",
  "u10-24": "What stress is",
  "u10-25": "The stress response",
  "u10-26": "Stress and health",
  "u10-27": "Coping and stress management",
  "u10-28": "Work-related stress and burnout",
  "u11-13": "Scientific reasoning in psychology",
  "u11-14": "Research questions and hypotheses",
  "u11-15": "Operationalisation",
  "u11-16": "Independent and dependent variables",
  "u11-17": "Confounding variables",
  "u11-18": "Experimental design",
  "u11-19": "Laboratory experiments",
  "u11-20": "Field experiments",
  "u11-21": "Natural experiments",
  "u11-22": "Quasi-experiments",
  "u11-23": "Correlational research",
  "u11-24": "Cross-sectional and longitudinal research",
  "u11-25": "Case studies",
  "u11-26": "Naturalistic observation",
  "u11-27": "Structured observation",
  "u11-28": "Surveys and questionnaires",
  "u11-29": "Interviews",
  "u11-30": "Focus groups",
  "u11-31": "Quantitative, qualitative and mixed methods",
  "u11-32": "Random and stratified sampling",
  "u11-33": "Opportunity and volunteer sampling",
  "u11-34": "Sample size",
  "u11-35": "Reliability",
  "u11-36": "Validity",
  "u11-37": "Generalisability",
  "u11-38": "Bias in research",
  "u11-39": "Replication",
  "u11-40": "Preregistration",
  "u11-41": "Open science",
  "u11-42": "Informed consent",
  "u11-43": "Confidentiality",
  "u11-44": "Deception and debriefing",
  "u11-45": "Vulnerable participants",
  "u11-46": "Research governance and ethics committees",
  "u12-13": "Functionalist perspectives on education",
  "u12-14": "Marxist perspectives on education",
  "u12-15": "Feminist perspectives on education",
  "u12-16": "Education, socialisation and social control",
  "u12-17": "The hidden curriculum",
  "u12-18": "Educational achievement and social class",
  "u12-19": "Educational achievement and gender",
  "u12-20": "Educational achievement and ethnicity",
  "u12-21": "Cultural capital and education",
  "u12-22": "Linguistic codes",
  "u12-23": "Labelling in education",
  "u12-24": "Teacher expectations",
  "u12-25": "The self-fulfilling prophecy",
  "u12-26": "Selection",
  "u12-27": "Educational inequality",
  "u12-28": "Private education",
  "u12-29": "Higher education",
  "u12-30": "Education policy",
  "u12-31": "Global education",
  "u12-32": "Digital learning",
  "u12-33": "Educational reform",
};
export const RETIRED = {
  "u12-01": {
    "title": "The structure of education in England",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by sociology school 9 before it was written"
  },
  "u12-02": {
    "title": "Maintained schools, academies and free schools",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by sociology school 9 before it was written"
  },
  "u12-03": {
    "title": "Phases and key stages",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by sociology school 9 before it was written"
  },
  "u12-04": {
    "title": "Governance and accountability",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by sociology school 9 before it was written"
  },
  "u12-05": {
    "title": "Ofsted and school inspection",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by sociology school 9 before it was written"
  },
  "u12-06": {
    "title": "School funding",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by sociology school 9 before it was written"
  },
  "u12-07": {
    "title": "The Department for Education and policy-making",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by sociology school 9 before it was written"
  },
  "u12-08": {
    "title": "Disadvantage and the attainment gap",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by sociology school 9 before it was written"
  },
  "u12-09": {
    "title": "Curriculum and assessment reform",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by sociology school 9 before it was written"
  },
  "u12-10": {
    "title": "Post-16 education and training",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by sociology school 9 before it was written"
  },
  "u12-11": {
    "title": "Education across the four UK nations",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by sociology school 9 before it was written"
  },
  "u12-12": {
    "title": "A short history of state education in England",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by sociology school 9 before it was written"
  },
  "u11-01": {
    "title": "Why evidence matters in teaching",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by psychology school 10 before it was written"
  },
  "u11-02": {
    "title": "The EEF Teaching and Learning Toolkit",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by psychology school 10 before it was written"
  },
  "u11-03": {
    "title": "Reading an EEF guidance report",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by psychology school 10 before it was written"
  },
  "u11-04": {
    "title": "Effect sizes and months' progress",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by psychology school 10 before it was written"
  },
  "u11-05": {
    "title": "Randomised controlled trials in education",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by psychology school 10 before it was written"
  },
  "u11-06": {
    "title": "Meta-analysis and its limits",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by psychology school 10 before it was written"
  },
  "u11-07": {
    "title": "Implementation: putting evidence to work",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by psychology school 10 before it was written"
  },
  "u11-08": {
    "title": "Practitioner enquiry and action research",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by psychology school 10 before it was written"
  },
  "u11-09": {
    "title": "Evaluating an intervention",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by psychology school 10 before it was written"
  },
  "u11-10": {
    "title": "Research ethics in school",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by psychology school 10 before it was written"
  },
  "u11-11": {
    "title": "Reading educational claims critically",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by psychology school 10 before it was written"
  },
  "u11-12": {
    "title": "Cognitive science in the classroom: uses and limits",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by psychology school 10 before it was written"
  },
  "u05-01": {
    "title": "Behaviour and learning",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-02": {
    "title": "Routines and high expectations",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-03": {
    "title": "A positive classroom climate",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-04": {
    "title": "Relationships with pupils",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-05": {
    "title": "The whole-school behaviour policy",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-06": {
    "title": "Starting and ending lessons",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-07": {
    "title": "Giving clear instructions",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-08": {
    "title": "Praise and positive reinforcement",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-09": {
    "title": "Low-level disruption and the least intrusive response",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-10": {
    "title": "Consequences and sanctions",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-11": {
    "title": "De-escalation and scripted responses",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-12": {
    "title": "Restorative approaches",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-13": {
    "title": "Attendance and punctuality",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-14": {
    "title": "Suspension and permanent exclusion",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-15": {
    "title": "Behaviour and SEND",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-16": {
    "title": "Searching, screening and reasonable force",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u05-17": {
    "title": "Bullying, including online",
    "retired": "2026-11-12",
    "reason": "school 5 replaced by psychology school 4 before it was written"
  },
  "u10-01": {
    "title": "The Teachers' Standards Part Two",
    "retired": "2026-11-12",
    "reason": "school 10 replaced by health school 5 before it was written"
  },
  "u10-02": {
    "title": "Professional boundaries",
    "retired": "2026-11-12",
    "reason": "school 10 replaced by health school 5 before it was written"
  },
  "u10-03": {
    "title": "Teacher misconduct and the Teaching Regulation Agency",
    "retired": "2026-11-12",
    "reason": "school 10 replaced by health school 5 before it was written"
  },
  "u10-04": {
    "title": "Working with parents and carers",
    "retired": "2026-11-12",
    "reason": "school 10 replaced by health school 5 before it was written"
  },
  "u10-05": {
    "title": "Working with colleagues and support staff",
    "retired": "2026-11-12",
    "reason": "school 10 replaced by health school 5 before it was written"
  },
  "u10-06": {
    "title": "The Initial Teacher Training and Early Career Framework",
    "retired": "2026-11-12",
    "reason": "school 10 replaced by health school 5 before it was written"
  },
  "u10-07": {
    "title": "QTS and statutory induction",
    "retired": "2026-11-12",
    "reason": "school 10 replaced by health school 5 before it was written"
  },
  "u10-08": {
    "title": "Mentoring and instructional coaching",
    "retired": "2026-11-12",
    "reason": "school 10 replaced by health school 5 before it was written"
  },
  "u10-09": {
    "title": "Effective professional development",
    "retired": "2026-11-12",
    "reason": "school 10 replaced by health school 5 before it was written"
  },
  "u10-10": {
    "title": "Reflective practice",
    "retired": "2026-11-12",
    "reason": "school 10 replaced by health school 5 before it was written"
  },
  "u10-11": {
    "title": "Teacher workload",
    "retired": "2026-11-12",
    "reason": "school 10 replaced by health school 5 before it was written"
  },
  "u10-12": {
    "title": "Teacher wellbeing",
    "retired": "2026-11-12",
    "reason": "school 10 replaced by health school 5 before it was written"
  },
  "u10-13": {
    "title": "Managing time and priorities",
    "retired": "2026-11-12",
    "reason": "school 10 replaced by health school 5 before it was written"
  },
  "u10-14": {
    "title": "Pay, conditions and contracts",
    "retired": "2026-11-12",
    "reason": "school 10 replaced by health school 5 before it was written"
  }
};
