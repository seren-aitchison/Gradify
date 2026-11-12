// EduGradify Teaching: the full curriculum, 12 schools, modelled on the DfE Initial Teacher Training and Early Career
// Framework (ITTECF, 2024) and the Teachers' Standards (England), with the wider content of a PGCE. Each topic is taught
// as one lesson, grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent (ids.js, written by
// node scripts/new-course.mjs lock teaching): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. How Pupils Learn
> Memory and the architecture of learning
* Learning as a change in long-term memory
* Working memory and its limits
* Long-term memory and schemas
* Prior knowledge and how it shapes learning
* Misconceptions and conceptual change
> Cognitive load theory
* Cognitive load theory: Sweller 1988
* Intrinsic and extraneous load
* The worked example effect
* The expertise reversal effect
* Split attention and redundancy
* Dual coding
> Making learning stick
* Retrieval practice
* Spaced practice
* Interleaving
* Elaboration and generative learning
* Forgetting and desirable difficulties
> The learner
* Motivation and self-efficacy
* Metacognition and self-regulated learning
* Learning styles and other neuromyths
2. Classroom Practice
> Explicit instruction
* Rosenshine's Principles of Instruction
* Explicit instruction and its critics
* Daily, weekly and monthly review
* Presenting new material in small steps
* Modelling and thinking aloud
* Worked examples and faded guidance
> Questioning and checking understanding
* Questioning to check understanding
* Cold calling and no opt out
* Hinge questions and mini-whiteboards
* Wait time and think-pair-share
* Probing questions and extending answers
> Scaffolding and practice
* Scaffolding
* Guided practice
* Independent practice and a high success rate
* Removing scaffolds
> Talk, explanation and groupwork
* Teacher explanations and analogies
* Classroom discussion and dialogic teaching
* Collaborative learning and groupwork
3. Adaptive Teaching and SEND
> Adaptive teaching
* What adaptive teaching is
* Adaptive teaching versus differentiation by task
* Responding to pupils within the lesson
* Attainment grouping and its evidence
* Disadvantaged pupils and the Pupil Premium
* Pupils with English as an additional language
* Challenging high-attaining pupils
> SEND and the Code of Practice
* The SEND Code of Practice 2015
* The four broad areas of need
* The graduated approach: assess, plan, do, review
* The role of the SENCO
* Education, health and care plans
* Working with teaching assistants
* The Equality Act 2010 and reasonable adjustments
> Needs in the classroom
* Communication and interaction needs
* Dyslexia and specific learning difficulties
* Autism in the classroom
* ADHD in the classroom
* Social, emotional and mental health needs
* Sensory and physical needs
4. Assessment and Feedback
> Principles of assessment
* The purposes of assessment
* Formative and summative assessment
* Validity and reliability
* Assessment for learning
* Designing assessment questions
* Multiple-choice questions and diagnostic distractors
> Feedback
* Effective feedback: the EEF guidance
* Written and verbal feedback
* Marking, purpose and workload
* Peer and self-assessment
* Whole-class feedback
> Data and reporting
* Using assessment data
* Standardised tests and scaled scores
* Statutory assessment in England
* GCSEs, grading and examinations
* Reporting to parents and carers
5. Learning and Behaviour
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
6. Curriculum and Subject Knowledge
> What a curriculum is
* What a curriculum is
* Intent, implementation and impact
* The National Curriculum in England
* Powerful knowledge and knowledge-rich curricula
* Substantive and disciplinary knowledge
* Sequencing and the curriculum as progression model
> Subject knowledge for teaching
* Subject knowledge and pedagogical content knowledge
* Threshold concepts
* Anticipating misconceptions in your subject
* Core knowledge and hinterland
* Cultural capital and a diverse curriculum
> The curriculum in practice
* Curriculum mapping and coherence
* Schemes of work
* Textbooks and curriculum resources
* Spiral and mastery curricula
* Cross-curricular links
* Reviewing a curriculum
7. Planning Lessons and Sequences
> Planning sequences
* Planning backwards from outcomes
* Planning a sequence of lessons
* Learning intentions and success criteria
* Activating prior knowledge
> Planning a lesson
* The structure of a lesson
* Choosing tasks and activities
* Planning explanations and models
* Planning questions in advance
* Homework and independent study
* Planning for adaptive teaching
* Planning practical work and trips
> Evaluating and sustaining planning
* Evaluating a lesson
* Lesson observation and feedback
* Planning and workload
* Digital technology in the classroom
* Artificial intelligence and teaching
8. Literacy and Oracy Across the Curriculum
> Reading
* Literacy in every subject
* Disciplinary literacy
* Reading fluency
* Reading comprehension strategies
* Vocabulary: tiers and explicit teaching
* Systematic synthetic phonics and early reading
> Writing
* Teaching writing in subjects
* Modelling academic writing
* Spelling, punctuation and grammar
> Oracy
* What oracy is
* Learning to talk and learning through talk
* Structuring classroom talk
* Sentence stems and speaking frames
* Assessing oracy
9. Safeguarding and Pupil Welfare
> The framework
* What safeguarding means
* Keeping Children Safe in Education
* The designated safeguarding lead
* Working Together to Safeguard Children
> Recognising and responding
* The four categories of abuse
* Signs of abuse and neglect
* Responding to a disclosure
* Recording and reporting concerns
* Child-on-child abuse
* Online safety
* Child criminal and sexual exploitation
* Radicalisation and the Prevent duty
* Female genital mutilation: the mandatory reporting duty
* Children missing education
> Welfare and conduct
* Pupil mental health
* Allegations against staff and low-level concerns
* Safer working practice
* Safeguarding children with SEND
* Attendance as a safeguarding issue
10. Professional Behaviours and Wellbeing
> Professional conduct
* The Teachers' Standards Part Two
* Professional boundaries
* Teacher misconduct and the Teaching Regulation Agency
* Working with parents and carers
* Working with colleagues and support staff
> Professional development
* The Initial Teacher Training and Early Career Framework
* QTS and statutory induction
* Mentoring and instructional coaching
* Effective professional development
* Reflective practice
> Sustaining a career
* Teacher workload
* Teacher wellbeing
* Managing time and priorities
* Pay, conditions and contracts
11. Research Methods
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
12. Education
> Theories of education
* Functionalist perspectives on education
* Marxist perspectives on education
* Feminist perspectives on education
* Education, socialisation and social control
* The hidden curriculum
> Differential achievement
* Educational achievement and social class
* Educational achievement and gender
* Educational achievement and ethnicity
* Cultural capital and education
* Linguistic codes
> Processes inside schools
* Labelling in education
* Teacher expectations
* The self-fulfilling prophecy
* Selection
> Education systems
* Educational inequality
* Private education
* Higher education
* Education policy
* Global education
* Digital learning
* Educational reform
`;

export const TRACKS = [
  { name: "Stage 1 · Learning and teaching", units: [1, 2], from: "#ffc002", to: "#f59e0b" },
  { name: "Stage 2 · Every pupil", units: [3, 4, 5], from: "#fbbf24", to: "#f97316" },
  { name: "Stage 3 · Curriculum and planning", units: [6, 7, 8], from: "#facc15", to: "#84cc16" },
  { name: "Stage 4 · Safeguarding and the profession", units: [9, 10], from: "#fde047", to: "#22d3ee" },
  { name: "Stage 5 · Evidence and the system", units: [11, 12], from: "#ffc002", to: "#22d3ee" },
];

export const PATHS = [
  { id: "ittecf", name: "The ITTECF core", sub: "The Teachers' Standards in the order the Initial Teacher Training and Early Career Framework sets them out: learning, curriculum, classroom practice, adaptive teaching, assessment, behaviour and professional behaviours.", units: [1, 6, 2, 3, 4, 5, 10] },
  { id: "pgce", name: "A PGCE year", sub: "The ground a postgraduate teacher-training year covers, from how pupils learn to safeguarding, planning and the school system.", units: [1, 2, 5, 7, 9, 3, 4, 6, 8, 10, 11, 12] },
  { id: "ect", name: "Early career teacher", sub: "For the first two years in post: behaviour, assessment, adaptive teaching, workload and using evidence well.", units: [5, 4, 3, 10, 11] },
  { id: "safeguarding", name: "Safeguarding and welfare", sub: "Keeping children safe, SEND, behaviour and professional conduct. Always follow your own school's policies.", units: [9, 3, 5, 10] },
  { id: "evidence", name: "Evidence-informed practice", sub: "The science of learning, what the research does and doesn't show, and how schools put evidence to work.", units: [1, 11, 2, 12] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "Working and long-term memory, cognitive load, retrieval, spacing and interleaving, motivation and metacognition: what the evidence says about how pupils learn.",
  2: "Rosenshine's principles, explicit instruction, modelling, questioning, scaffolding, practice, explanation and classroom talk.",
  3: "Adapting teaching so every pupil succeeds, the SEND Code of Practice, the graduated approach and the needs teachers meet most often.",
  4: "Why and how we assess, validity and reliability, formative assessment, feedback that moves learning on, and the national assessment system.",
  5: "Classical and operant conditioning, social and cognitive learning, and their limits and uses.",
  6: "What a curriculum is, the National Curriculum, knowledge and its kinds, sequencing, subject knowledge for teaching and curriculum review.",
  7: "Planning backwards from what pupils should learn: sequences, lesson structure, tasks, explanations, questions, homework and evaluation.",
  8: "Reading, vocabulary, writing and talk in every subject: disciplinary literacy, fluency, comprehension, phonics and oracy.",
  9: "Keeping Children Safe in Education: recognising, responding to and reporting concerns, and the duties every member of staff has.",
  10: "The Teachers' Standards Part Two, boundaries, working with families and colleagues, induction, professional development and wellbeing.",
  11: "Designing research well: hypotheses, experiments, observation, surveys, sampling, validity, open science and ethics.",
  12: "Theories of education, differential achievement, labelling, selection and education policy.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
