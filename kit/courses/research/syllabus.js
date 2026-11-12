// PostGradify Research and the Dissertation: the full curriculum, 12 schools, modelled on the Vitae Researcher
// Development Framework (RDF, 2010) and UKRI/ESRC postgraduate research training (the ESRC Postgraduate Training and
// Development Guidelines), at the Master's (FHEQ level 7) and doctoral (FHEQ level 8) levels. Each topic is taught as
// one lesson, grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent (ids.js, written by
// node scripts/new-course.mjs lock research): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. The Research Landscape and Research Degrees
> What research is
* What is research?
* An original contribution to knowledge
* Disciplines and interdisciplinarity
* The UK research system and its funders
> Research degrees
* Research degrees: Master's, MPhil and PhD
* Professional doctorates and the PhD by publication
* Doctoral training: DTPs, CDTs and studentships
* Progression: upgrade and confirmation
* Researcher development and the Vitae RDF
> Supervision and the research student
* The supervisory relationship
* Managing your supervisor
* Regulations, responsibilities and expectations
* Research culture and community
> Planning a research project
* Research project management
* Writing a research proposal
* Planning time: milestones and Gantt charts
* Wellbeing and resilience in research
2. Research Questions and the Literature Review
> From topic to question
* Choosing a research topic
* Formulating research questions
* Aims, objectives and hypotheses
* Finding the gap: gap-spotting and problematisation
> Searching the literature
* Searching databases
* Search strategies: Boolean operators and subject headings
* Grey literature
* Reference management
> Reading critically
* Critical reading
* Evaluating sources
* Critical appraisal tools
> Writing the review
* Types of literature review
* Systematic reviews and PRISMA
* Scoping reviews
* Synthesising the literature
* Structuring a literature review
* Theoretical and conceptual frameworks
3. Philosophy of Research
> Ontology and epistemology
* Ontology
* Epistemology
* Research paradigms
> Paradigms
* Positivism
* Post-positivism
* Interpretivism
* Social constructionism
* Critical realism
* Pragmatism
* Critical and transformative paradigms
> Reasoning and theory
* Deduction, induction and abduction
* The role of theory in research
* Popper and falsification
* Kuhn and paradigm shifts
* Reflexivity and positionality
4. Research Design
> Foundations of design
* What is research design?
* Aligning question, philosophy and method
* Quantitative, qualitative and mixed approaches
> Designs
* Experimental designs
* Quasi-experimental designs
* Survey research design
* Cross-sectional and longitudinal designs
* Case study research
* Ethnography
* Action research
* Evaluation research
> Sampling and quality
* Sampling strategies
* Sample size and saturation
* Validity and reliability
* Trustworthiness in qualitative research
* Pilot studies
5. Quantitative Methods and Statistics
> Measurement and data
* Variables and levels of measurement
* Questionnaire design
* Measurement scales and psychometrics
* Data screening and cleaning
* Missing data
> Describing data
* Descriptive statistics
* Distributions and the normal curve
* Visualising data
> Inference
* Sampling distributions and confidence intervals
* Null hypothesis significance testing
* Effect sizes
* Statistical power and sample size
* Type I and Type II errors
> Tests and models
* t-tests
* Analysis of variance (ANOVA)
* Chi-square tests
* Correlation
* Linear regression
* Multiple regression
* Logistic regression
* Non-parametric tests
* Bayesian statistics
> Statistics in practice
* Statistical software: SPSS, R and Stata
* Reporting statistics
6. Qualitative Methods
> Qualitative foundations
* What is qualitative research?
* Qualitative research designs
* Purposive and theoretical sampling
> Generating data
* Semi-structured interviews
* Interviewing skills
* Focus groups
* Participant observation
* Documents and visual methods
* Online and remote qualitative research
> Analysis
* Transcription
* Coding qualitative data
* Thematic analysis: Braun and Clarke
* Reflexive thematic analysis
* Grounded theory
* Interpretative phenomenological analysis
* Discourse analysis
* Narrative analysis
* Framework analysis
* Qualitative data analysis software
> Quality and reporting
* Rigour in qualitative research
* Writing up qualitative findings
7. Mixed Methods and Evidence Synthesis
> Mixed methods
* What is mixed methods research?
* Convergent designs
* Explanatory sequential designs
* Exploratory sequential designs
* Integration and joint displays
* Quality in mixed methods research
> Evidence synthesis
* Meta-analysis
* Qualitative evidence synthesis
* Realist reviews
> Secondary and digital research
* Secondary data analysis
* Big data and computational methods
* Using AI tools in research
8. Research Ethics and Integrity
> Ethical principles
* Principles of research ethics
* The history of research ethics
* Informed consent
* Confidentiality and anonymity
* Avoiding harm
* Vulnerable participants
* Deception and covert research
> Ethics governance
* Research ethics committees
* Applying for ethical approval
* Health research: HRA approval
* Ethics in online research
> Research integrity
* The Concordat to Support Research Integrity
* The UKRIO Code of Practice for Research
* Research misconduct
* Questionable research practices
* Authorship and plagiarism
* Conflicts of interest
> Data protection
* UK GDPR and the Data Protection Act 2018
* Special category data and research
9. Research Data Management and Open Research
> Managing data
* Research data management
* Data management plans
* File organisation and version control
* Secure storage and backup
* Anonymising and pseudonymising data
* Archiving and data sharing
* The FAIR principles
> Open research
* Open access publishing
* Preregistration and registered reports
* Reproducibility and the replication crisis
* Open data and open code
* Reproducible workflows
* Persistent identifiers: ORCID and DOIs
* Copyright and licensing
10. Academic Writing and the Thesis
> Writing as research
* Academic writing style
* Writing habits and productivity
* Building an argument
* Paragraphs and signposting
> The thesis
* The structure of a thesis
* Writing the introduction
* Writing the methodology chapter
* Writing results and findings
* Writing the discussion
* Writing the conclusion
* Writing the abstract
> Craft and revision
* Referencing and citation styles
* Using sources and avoiding plagiarism
* Editing and revising
* Working with feedback
* Writing in English as an additional language
11. Publishing, Presenting and Impact
> Publishing
* The academic publishing system
* Choosing a journal
* Writing a journal article
* Peer review
* Responding to reviewers
* Predatory journals
* Research metrics
> Presenting
* Conference presentations
* Academic posters
* Public engagement
> Impact
* Research impact
* The Research Excellence Framework
* Knowledge exchange and policy engagement
* Communicating research online
12. The Viva and Beyond
> Submission and examination
* Preparing to submit
* Examiners and the viva
* Preparing for the viva
* In the viva
* Viva outcomes and corrections
> Careers
* Academic careers
* Postdoctoral research
* Fellowships and grant writing
* Careers beyond academia
* Transferable skills and the RDF
* Teaching in higher education
* Networking and your research profile
`;

// stages on the map; PostGradify's colours run from leaf green to teal
export const TRACKS = [
  { name: "Stage 1 · Starting research", units: [1, 2], from: "#5aa63a", to: "#2e5e18" },
  { name: "Stage 2 · Thinking about research", units: [3, 4], from: "#7cc35a", to: "#3b8a2a" },
  { name: "Stage 3 · Methods", units: [5, 6, 7], from: "#5aa63a", to: "#14b8a6" },
  { name: "Stage 4 · Doing research responsibly", units: [8, 9], from: "#84cc16", to: "#16a34a" },
  { name: "Stage 5 · Writing, publishing and beyond", units: [10, 11, 12], from: "#4ade80", to: "#22d3ee" },
];

export const PATHS = [
  { id: "masters", name: "Master's dissertation", sub: "From a question to a submitted dissertation: the literature review, design, methods, ethics and writing up.", units: [2, 4, 8, 10, 5, 6] },
  { id: "phd", name: "The doctoral journey", sub: "Everything a new PhD or MPhil researcher meets, in the order they meet it: supervision, philosophy, design, integrity, the thesis and the viva.", units: [1, 2, 3, 4, 8, 9, 10, 11, 12] },
  { id: "quant", name: "Quantitative researcher", sub: "Design, measurement, inference and statistical models, reported and shared reproducibly.", units: [4, 5, 7, 9] },
  { id: "qual", name: "Qualitative researcher", sub: "Paradigms, reflexivity, interviews, observation and the main analytic approaches, from thematic analysis to grounded theory.", units: [3, 4, 6, 7] },
  { id: "integrity", name: "Ethics, integrity and open research", sub: "Ethical approval, the UK integrity framework, data protection and open, reproducible research.", units: [8, 9] },
  { id: "careers", name: "Publishing and careers", sub: "Getting work published, presented and used, and the careers a research degree leads to.", units: [11, 12, 10] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "What research is, the UK research system, research degrees, supervision, the Vitae RDF and planning a project.",
  2: "Turning a topic into answerable questions, searching and appraising the literature, and writing the review.",
  3: "Ontology, epistemology and the paradigms (positivism, interpretivism, critical realism, pragmatism) behind methods.",
  4: "Choosing and justifying a design: experiments, surveys, case studies, ethnography, sampling and quality.",
  5: "Measurement, questionnaires, inference, effect sizes, power, the main tests and models, and reporting.",
  6: "Interviews, focus groups, observation and the main analytic approaches, from thematic analysis to IPA.",
  7: "Mixed methods designs and integration, meta-analysis, qualitative synthesis, secondary data and AI tools.",
  8: "Consent, harm, ethics review, the Concordat, the UKRIO Code, misconduct and data protection law.",
  9: "Data management plans, secure storage, anonymisation, FAIR data, open access and reproducibility.",
  10: "Academic style, argument, the thesis chapter by chapter, referencing, revision and feedback.",
  11: "Journals, peer review, posters and talks, public engagement, impact and the REF.",
  12: "Submission, examiners, the viva and its outcomes, and careers in and beyond academia.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
