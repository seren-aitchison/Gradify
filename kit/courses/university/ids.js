// Permanent lesson ids for university (see kit/course/syllabus.js). Never delete or reuse an id: saved progress, notes,
// flashcards and attempts depend on them. To rename a lesson, change its title here and in the syllabus. To remove
// one, move its id to RETIRED: retired ids are reserved forever. Written by node scripts/new-course.mjs lock university.
export const IDS = {
  "u01-01": "What is different about university study",
  "u01-02": "Independent learning",
  "u01-03": "How degrees are structured: credits, levels and modules",
  "u01-04": "Learning outcomes and the QAA level descriptors",
  "u01-05": "Assessment at university: types, criteria and marks",
  "u01-06": "Academic regulations and the student handbook",
  "u01-07": "Teaching formats: lectures, seminars, labs and tutorials",
  "u01-08": "Personal tutors and academic staff",
  "u01-09": "Writing to academic staff",
  "u01-10": "The virtual learning environment and digital study",
  "u01-11": "The university library",
  "u01-12": "Support services and reasonable adjustments",
  "u01-13": "Self-assessment of study skills",
  "u01-14": "Setting goals for your degree",
  "u01-15": "Motivation and self-efficacy",
  "u01-16": "Self-regulated learning",
  "u01-17": "Building study habits",
  "u01-18": "Peer learning and study groups",
  "u01-19": "Belonging and the transition to university",
  "u02-20": "Learning as a change in long-term memory",
  "u02-21": "Working memory and its limits",
  "u02-22": "Long-term memory and schemas",
  "u02-23": "Prior knowledge and how it shapes learning",
  "u02-24": "Misconceptions and conceptual change",
  "u02-25": "Cognitive load theory: Sweller 1988",
  "u02-26": "Intrinsic and extraneous load",
  "u02-27": "The worked example effect",
  "u02-28": "The expertise reversal effect",
  "u02-29": "Split attention and redundancy",
  "u02-30": "Dual coding",
  "u02-31": "Retrieval practice",
  "u02-32": "Spaced practice",
  "u02-33": "Interleaving",
  "u02-34": "Elaboration and generative learning",
  "u02-35": "Forgetting and desirable difficulties",
  "u02-36": "Motivation and self-efficacy in learning",
  "u02-37": "Metacognition and self-regulated learning",
  "u02-38": "Learning styles and other neuromyths",
  "u03-01": "How students use their time",
  "u03-02": "Semester and weekly planning",
  "u03-03": "Prioritising tasks",
  "u03-04": "Procrastination",
  "u03-05": "Focus and distraction",
  "u03-06": "Balancing study, work and life",
  "u03-07": "Preparing for lectures",
  "u03-08": "Active listening in lectures",
  "u03-09": "Note-making methods: linear, Cornell and maps",
  "u03-10": "Handwriting or typing notes",
  "u03-11": "Using lecture recordings and slides",
  "u03-12": "Reviewing and consolidating notes",
  "u03-13": "Seminars and discussion",
  "u03-14": "Practical classes and lab notebooks",
  "u04-01": "Types of academic text",
  "u04-02": "Reading strategically: purpose and selection",
  "u04-03": "Reading a journal article",
  "u04-04": "Reading actively: SQ3R and questioning",
  "u04-05": "Making notes from reading",
  "u04-06": "Paraphrasing and summarising",
  "u04-07": "Reading difficult texts",
  "u04-08": "What critical thinking is",
  "u04-09": "Arguments: claims, reasons and conclusions",
  "u04-10": "Identifying assumptions",
  "u04-11": "Evaluating evidence",
  "u04-12": "Flaws in reasoning",
  "u04-13": "Cognitive biases in reasoning",
  "u04-14": "Comparing perspectives",
  "u04-15": "Moving from description to analysis",
  "u04-16": "Building your own argument",
  "u05-01": "What academic writing is",
  "u05-02": "Analysing the question",
  "u05-03": "Planning and outlining",
  "u05-04": "Drafting",
  "u05-05": "Editing and proofreading",
  "u05-06": "Essay structure",
  "u05-07": "Introductions and conclusions",
  "u05-08": "Paragraphs and the PEEL model",
  "u05-09": "Report structure",
  "u05-10": "Writing a literature review",
  "u05-11": "Reflective writing",
  "u05-12": "Abstracts and summaries",
  "u05-13": "Academic style and register",
  "u05-14": "Clarity and concision",
  "u05-15": "Hedging and stance",
  "u05-16": "Using sources in your writing",
  "u05-17": "Signposting and cohesion",
  "u05-18": "Grammar and punctuation for academic writing",
  "u05-19": "Writing in your discipline",
  "u06-01": "Why we reference",
  "u06-02": "What needs a reference",
  "u06-03": "Referencing styles: an overview",
  "u06-04": "Harvard referencing",
  "u06-05": "APA style",
  "u06-06": "Numeric styles: Vancouver and IEEE",
  "u06-07": "Footnote styles: OSCOLA and Chicago",
  "u06-08": "Secondary referencing",
  "u06-09": "Reference management software",
  "u06-10": "Academic integrity and its values",
  "u06-11": "Plagiarism and how to avoid it",
  "u06-12": "Collusion and group work boundaries",
  "u06-13": "Contract cheating and essay mills",
  "u06-14": "Text-matching software",
  "u06-15": "Generative AI and academic integrity",
  "u06-16": "Using generative AI responsibly in study",
  "u06-17": "Academic misconduct procedures",
  "u07-01": "Information literacy",
  "u07-02": "Defining a research question",
  "u07-03": "Search strategies: keywords and Boolean operators",
  "u07-04": "Library catalogues and discovery tools",
  "u07-05": "Subject databases",
  "u07-06": "Google Scholar and the open web",
  "u07-07": "Grey literature and official statistics",
  "u07-08": "Evaluating sources",
  "u07-09": "Peer review and the publication process",
  "u07-10": "Primary and secondary sources",
  "u07-11": "Recognising misinformation",
  "u07-12": "Open access",
  "u07-13": "Organising your research",
  "u07-14": "Research ethics for students",
  "u07-15": "Designing a small project",
  "u07-16": "Collecting data: surveys and interviews",
  "u07-17": "Writing up a project",
  "u08-01": "Maths anxiety and number confidence",
  "u08-02": "Percentages, ratios and proportions",
  "u08-03": "Rounding, significant figures and estimation",
  "u08-04": "Units and conversions",
  "u08-05": "Using formulae",
  "u08-06": "Types of data",
  "u08-07": "Descriptive statistics",
  "u08-08": "Tables and charts",
  "u08-09": "Reading graphs critically",
  "u08-10": "Correlation and causation",
  "u08-11": "Probability and risk",
  "u08-12": "Statistical significance in plain terms",
  "u08-13": "Spreadsheets for students",
  "u08-14": "Presenting numbers in writing",
  "u09-15": "Communication at work: purpose and audience",
  "u09-16": "Active listening",
  "u09-17": "Questioning skills",
  "u09-18": "Non-verbal communication",
  "u09-19": "Plain English and clear writing",
  "u09-20": "Structuring reports and briefings",
  "u09-21": "Writing effective emails",
  "u09-22": "Tone, etiquette and choosing the channel",
  "u09-23": "Running effective meetings",
  "u09-24": "Minutes, decisions and action points",
  "u09-25": "Planning a presentation",
  "u09-26": "Delivering a presentation",
  "u09-27": "Communicating in virtual and hybrid teams",
  "u09-28": "Giving and receiving feedback",
  "u10-01": "Types of exam",
  "u10-02": "Planning revision",
  "u10-03": "Revision techniques that work",
  "u10-04": "Past papers and practice questions",
  "u10-05": "Revising for different subjects",
  "u10-06": "Exam technique: before and on the day",
  "u10-07": "Answering essay questions in exams",
  "u10-08": "Multiple-choice and short-answer questions",
  "u10-09": "Problem-solving and calculation exams",
  "u10-10": "Open-book and online exams",
  "u10-11": "Managing exam anxiety",
  "u10-12": "Results, resits and progression",
  "u10-13": "Extenuating circumstances",
  "u10-14": "Learning from exam feedback",
  "u11-17": "Why we sleep",
  "u11-18": "Sleep stages and cycles",
  "u11-19": "Circadian rhythms",
  "u11-20": "How much sleep we need",
  "u11-21": "Sleep across the lifespan",
  "u11-22": "Insomnia",
  "u11-23": "Improving sleep",
  "u11-24": "Shift work and sleep",
  "u11-25": "Sleep disorders beyond insomnia",
  "u11-26": "What stress is",
  "u11-27": "The stress response",
  "u11-28": "Stress and health",
  "u11-29": "Coping and stress management",
  "u11-30": "Work-related stress and burnout",
  "u12-15": "What career development is",
  "u12-16": "Career theories: matching, development and chance",
  "u12-17": "The Gatsby Benchmarks and careers support",
  "u12-18": "Identifying your skills",
  "u12-19": "Transferable skills and graduate attributes",
  "u12-20": "Values and what matters to you at work",
  "u12-21": "Strengths and how to use them",
  "u12-22": "Interests and personality tools: uses and limits",
  "u12-23": "Reflective practice and the skills audit",
  "u12-24": "Motivations and work-life priorities",
  "u12-25": "Your career story and personal brand",
  "u12-26": "Setting career goals",
};
export const RETIRED = {
  "u02-01": {
    "title": "What learning is: memory and understanding",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-02": {
    "title": "Working memory and cognitive load",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-03": {
    "title": "Encoding and levels of processing",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-04": {
    "title": "Forgetting and the forgetting curve",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-05": {
    "title": "Desirable difficulties",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-06": {
    "title": "Rating study techniques: the evidence",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-07": {
    "title": "Retrieval practice",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-08": {
    "title": "Spaced practice",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-09": {
    "title": "Interleaving",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-10": {
    "title": "Elaboration and self-explanation",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-11": {
    "title": "Concrete examples and dual coding",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-12": {
    "title": "Flashcards and spaced repetition systems",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-13": {
    "title": "Rereading, highlighting and summarising",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-14": {
    "title": "Metacognition: thinking about your thinking",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-15": {
    "title": "Judgements of learning and the illusion of competence",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-16": {
    "title": "Planning, monitoring and evaluating your learning",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-17": {
    "title": "Learning styles and other myths",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-18": {
    "title": "Sleep, attention and learning",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u02-19": {
    "title": "Putting it together: a study system",
    "retired": "2026-11-12",
    "reason": "school 2 replaced by teaching school 1 before it was written"
  },
  "u09-01": {
    "title": "Planning a presentation",
    "retired": "2026-11-12",
    "reason": "school 9 replaced by professional school 1 before it was written"
  },
  "u09-02": {
    "title": "Designing slides",
    "retired": "2026-11-12",
    "reason": "school 9 replaced by professional school 1 before it was written"
  },
  "u09-03": {
    "title": "Delivering a presentation",
    "retired": "2026-11-12",
    "reason": "school 9 replaced by professional school 1 before it was written"
  },
  "u09-04": {
    "title": "Managing presentation nerves",
    "retired": "2026-11-12",
    "reason": "school 9 replaced by professional school 1 before it was written"
  },
  "u09-05": {
    "title": "Posters",
    "retired": "2026-11-12",
    "reason": "school 9 replaced by professional school 1 before it was written"
  },
  "u09-06": {
    "title": "Answering questions",
    "retired": "2026-11-12",
    "reason": "school 9 replaced by professional school 1 before it was written"
  },
  "u09-07": {
    "title": "Online presentations",
    "retired": "2026-11-12",
    "reason": "school 9 replaced by professional school 1 before it was written"
  },
  "u09-08": {
    "title": "Why universities set group work",
    "retired": "2026-11-12",
    "reason": "school 9 replaced by professional school 1 before it was written"
  },
  "u09-09": {
    "title": "Forming a team and agreeing ways of working",
    "retired": "2026-11-12",
    "reason": "school 9 replaced by professional school 1 before it was written"
  },
  "u09-10": {
    "title": "Team roles",
    "retired": "2026-11-12",
    "reason": "school 9 replaced by professional school 1 before it was written"
  },
  "u09-11": {
    "title": "Communication and online collaboration",
    "retired": "2026-11-12",
    "reason": "school 9 replaced by professional school 1 before it was written"
  },
  "u09-12": {
    "title": "Managing conflict",
    "retired": "2026-11-12",
    "reason": "school 9 replaced by professional school 1 before it was written"
  },
  "u09-13": {
    "title": "Contributing fairly and peer assessment",
    "retired": "2026-11-12",
    "reason": "school 9 replaced by professional school 1 before it was written"
  },
  "u09-14": {
    "title": "Inclusive group work",
    "retired": "2026-11-12",
    "reason": "school 9 replaced by professional school 1 before it was written"
  },
  "u12-01": {
    "title": "What employability means",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by careers school 1 before it was written"
  },
  "u12-02": {
    "title": "Graduate attributes and transferable skills",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by careers school 1 before it was written"
  },
  "u12-03": {
    "title": "Recognising and recording your skills",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by careers school 1 before it was written"
  },
  "u12-04": {
    "title": "Careers services and planning",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by careers school 1 before it was written"
  },
  "u12-05": {
    "title": "Part-time work and volunteering",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by careers school 1 before it was written"
  },
  "u12-06": {
    "title": "CVs and cover letters",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by careers school 1 before it was written"
  },
  "u12-07": {
    "title": "Applications and personal statements",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by careers school 1 before it was written"
  },
  "u12-08": {
    "title": "Interviews and assessment centres",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by careers school 1 before it was written"
  },
  "u12-09": {
    "title": "Placements and internships",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by careers school 1 before it was written"
  },
  "u12-10": {
    "title": "Learning on placement",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by careers school 1 before it was written"
  },
  "u12-11": {
    "title": "Professional behaviour and online presence",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by careers school 1 before it was written"
  },
  "u12-12": {
    "title": "Further study and postgraduate options",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by careers school 1 before it was written"
  },
  "u12-13": {
    "title": "Your degree outcome and the HEAR",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by careers school 1 before it was written"
  },
  "u12-14": {
    "title": "Lifelong learning",
    "retired": "2026-11-12",
    "reason": "school 12 replaced by careers school 1 before it was written"
  },
  "u11-01": {
    "title": "What feedback is for",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-02": {
    "title": "Feedback literacy",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-03": {
    "title": "Reading and acting on feedback",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-04": {
    "title": "Asking for feedback",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-05": {
    "title": "Peer and self-assessment",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-06": {
    "title": "Reflective practice",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-07": {
    "title": "Models of reflection: Kolb and Gibbs",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-08": {
    "title": "Personal development planning",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-09": {
    "title": "Learning journals and e-portfolios",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-10": {
    "title": "Student wellbeing",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-11": {
    "title": "Stress and resilience",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-12": {
    "title": "Perfectionism and impostor feelings",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-13": {
    "title": "Sleep, activity and routine",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-14": {
    "title": "Money and student life",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-15": {
    "title": "Disability, neurodivergence and study",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  },
  "u11-16": {
    "title": "Getting help: university and NHS support",
    "retired": "2026-11-12",
    "reason": "school 11 replaced by health school 5 before it was written"
  }
};
