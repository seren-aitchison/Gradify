// UnderGradify University Study Skills: the full curriculum, twelve schools. It follows UK academic skills and
// learning development provision (ALDinHE's learning development field, university library and study-skills
// centres) and the QAA Frameworks for Higher Education Qualifications level descriptors, which set out what an
// honours graduate can do. Each topic is taught as one lesson, grouped into modules ("> " lines) and stages
// (TRACKS). Lesson ids are permanent (ids.js, written by node scripts/new-course.mjs lock university): never
// renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Starting University and Independent Learning
> The move to university
* What is different about university study
* Independent learning
* How degrees are structured: credits, levels and modules
* Learning outcomes and the QAA level descriptors
* Assessment at university: types, criteria and marks
* Academic regulations and the student handbook
> Learning in a university
* Teaching formats: lectures, seminars, labs and tutorials
* Personal tutors and academic staff
* Writing to academic staff
* The virtual learning environment and digital study
* The university library
* Support services and reasonable adjustments
> Becoming an independent learner
* Self-assessment of study skills
* Setting goals for your degree
* Motivation and self-efficacy
* Self-regulated learning
* Building study habits
* Peer learning and study groups
* Belonging and the transition to university
2. How Pupils Learn
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
3. Time Management, Lectures and Note-making
> Time and planning
* How students use their time
* Semester and weekly planning
* Prioritising tasks
* Procrastination
* Focus and distraction
* Balancing study, work and life
> Lectures and note-making
* Preparing for lectures
* Active listening in lectures
* Note-making methods: linear, Cornell and maps
* Handwriting or typing notes
* Using lecture recordings and slides
* Reviewing and consolidating notes
* Seminars and discussion
* Practical classes and lab notebooks
4. Reading Academic Texts and Critical Thinking
> Reading academic texts
* Types of academic text
* Reading strategically: purpose and selection
* Reading a journal article
* Reading actively: SQ3R and questioning
* Making notes from reading
* Paraphrasing and summarising
* Reading difficult texts
> Critical thinking and argument
* What critical thinking is
* Arguments: claims, reasons and conclusions
* Identifying assumptions
* Evaluating evidence
* Flaws in reasoning
* Cognitive biases in reasoning
* Comparing perspectives
* Moving from description to analysis
* Building your own argument
5. Academic Writing
> The writing process
* What academic writing is
* Analysing the question
* Planning and outlining
* Drafting
* Editing and proofreading
> Structure
* Essay structure
* Introductions and conclusions
* Paragraphs and the PEEL model
* Report structure
* Writing a literature review
* Reflective writing
* Abstracts and summaries
> Style
* Academic style and register
* Clarity and concision
* Hedging and stance
* Using sources in your writing
* Signposting and cohesion
* Grammar and punctuation for academic writing
* Writing in your discipline
6. Referencing and Academic Integrity
> Why and how to reference
* Why we reference
* What needs a reference
* Referencing styles: an overview
* Harvard referencing
* APA style
* Numeric styles: Vancouver and IEEE
* Footnote styles: OSCOLA and Chicago
* Secondary referencing
* Reference management software
> Academic integrity
* Academic integrity and its values
* Plagiarism and how to avoid it
* Collusion and group work boundaries
* Contract cheating and essay mills
* Text-matching software
* Generative AI and academic integrity
* Using generative AI responsibly in study
* Academic misconduct procedures
7. Research and Information Literacy
> Finding information
* Information literacy
* Defining a research question
* Search strategies: keywords and Boolean operators
* Library catalogues and discovery tools
* Subject databases
* Google Scholar and the open web
* Grey literature and official statistics
> Evaluating and managing information
* Evaluating sources
* Peer review and the publication process
* Primary and secondary sources
* Recognising misinformation
* Open access
* Organising your research
> Research skills
* Research ethics for students
* Designing a small project
* Collecting data: surveys and interviews
* Writing up a project
8. Numeracy and Data Skills
> Number confidence
* Maths anxiety and number confidence
* Percentages, ratios and proportions
* Rounding, significant figures and estimation
* Units and conversions
* Using formulae
> Working with data
* Types of data
* Descriptive statistics
* Tables and charts
* Reading graphs critically
* Correlation and causation
* Probability and risk
* Statistical significance in plain terms
* Spreadsheets for students
* Presenting numbers in writing
9. Presentations and Group Work
> Presentations
* Planning a presentation
* Designing slides
* Delivering a presentation
* Managing presentation nerves
* Posters
* Answering questions
* Online presentations
> Group work
* Why universities set group work
* Forming a team and agreeing ways of working
* Team roles
* Communication and online collaboration
* Managing conflict
* Contributing fairly and peer assessment
* Inclusive group work
10. Exams and Revision
> Preparing for exams
* Types of exam
* Planning revision
* Revision techniques that work
* Past papers and practice questions
* Revising for different subjects
> In the exam
* Exam technique: before and on the day
* Answering essay questions in exams
* Multiple-choice and short-answer questions
* Problem-solving and calculation exams
* Open-book and online exams
* Managing exam anxiety
> After the exam
* Results, resits and progression
* Extenuating circumstances
* Learning from exam feedback
11. Feedback, Reflection and Wellbeing
> Feedback
* What feedback is for
* Feedback literacy
* Reading and acting on feedback
* Asking for feedback
* Peer and self-assessment
> Reflection
* Reflective practice
* Models of reflection: Kolb and Gibbs
* Personal development planning
* Learning journals and e-portfolios
> Wellbeing and support
* Student wellbeing
* Stress and resilience
* Perfectionism and impostor feelings
* Sleep, activity and routine
* Money and student life
* Disability, neurodivergence and study
* Getting help: university and NHS support
12. Employability and Placements
> Employability
* What employability means
* Graduate attributes and transferable skills
* Recognising and recording your skills
* Careers services and planning
* Part-time work and volunteering
> Applications and placements
* CVs and cover letters
* Applications and personal statements
* Interviews and assessment centres
* Placements and internships
* Learning on placement
* Professional behaviour and online presence
> Beyond the degree
* Further study and postgraduate options
* Your degree outcome and the HEAR
* Lifelong learning
`;

// stages on the map; UnderGradify's colours run from cornflower blue to teal
export const TRACKS = [
  { name: "Stage 1 · Getting started", units: [1, 2, 3], from: "#5b8fe0", to: "#3c78d8" },
  { name: "Stage 2 · Reading, thinking and writing", units: [4, 5, 6], from: "#6ea0f0", to: "#4f6fd8" },
  { name: "Stage 3 · Research and numbers", units: [7, 8], from: "#5b8fe0", to: "#38bdf8" },
  { name: "Stage 4 · Performing and assessment", units: [9, 10], from: "#7aa7f0", to: "#22d3ee" },
  { name: "Stage 5 · Growing through your degree", units: [11, 12], from: "#5b8fe0", to: "#2dd4bf" },
];

export const PATHS = [
  { id: "first-year", name: "First-year essentials", sub: "Everything a new undergraduate needs in the first semester: how university works, how to learn, time, lectures, reading, writing and referencing.", units: [1, 2, 3, 4, 5, 6] },
  { id: "learn-better", name: "Learn better", sub: "The science of learning applied: memory, retrieval and spacing, time and focus, revision and exams, feedback and reflection.", units: [2, 3, 10, 11] },
  { id: "essays", name: "Essays and assignments", sub: "From reading and critical thinking to planning, writing, referencing and acting on feedback.", units: [4, 5, 6, 11] },
  { id: "research", name: "Research and data", sub: "Finding and judging information, small research projects, numeracy and statistics for coursework and dissertations.", units: [7, 8, 4] },
  { id: "career", name: "Beyond the degree", sub: "Presentations, teamwork, reflection and employability: building and evidencing the skills employers ask for.", units: [9, 11, 12] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "How university study works: credits, levels, assessment and regulations, the people and services that support you, and becoming an independent learner.",
  2: "Working and long-term memory, cognitive load, retrieval, spacing and interleaving, motivation and metacognition: what the evidence says about how pupils learn.",
  3: "Planning a semester and a week, beating procrastination and distraction, and getting the most from lectures, seminars and labs.",
  4: "Reading academic texts with purpose, and the critical thinking that turns reading into argument and analysis.",
  5: "The writing process, essay and report structure, and an academic style that is clear, careful and your own.",
  6: "Why and how to reference, the main styles, and academic integrity, including contract cheating and generative AI.",
  7: "Searching libraries and databases, judging sources, managing information and carrying out a small research project ethically.",
  8: "Number confidence and data skills: percentages, units, descriptive statistics, charts, risk and significance in plain terms.",
  9: "Planning and delivering presentations and posters, and working well in groups, including conflict and peer assessment.",
  10: "Planning revision with evidence-based techniques, exam technique for every format, and what happens after results.",
  11: "Using feedback, reflecting on your learning, and looking after your wellbeing with the support available at university.",
  12: "Employability, skills evidence, applications, interviews and placements, and options after graduation.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
