// ProGradify Professional Skills: the full curriculum, 10 schools. Modelled on the CMI Level 5 Management and
// Leadership units, the CIPD Profession Map core behaviours, the APM Body of Knowledge (7th edition), PRINCE2 and
// Agile principles, and the Skills Builder Universal Framework of essential skills. Each topic is taught as one
// lesson, grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent (ids.js, written by
// node scripts/new-course.mjs lock professional): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Professional Communication
> Foundations of communication
* Communication at work: purpose and audience
* Active listening
* Questioning skills
* Non-verbal communication
> Writing at work
* Plain English and clear writing
* Structuring reports and briefings
* Writing effective emails
* Tone, etiquette and choosing the channel
> Meetings and presenting
* Running effective meetings
* Minutes, decisions and action points
* Planning a presentation
* Delivering a presentation
* Communicating in virtual and hybrid teams
* Giving and receiving feedback
2. Working with People
> Teams
* What makes an effective team
* Team development: Tuckman's stages
* Team roles: Belbin
* Psychological safety
* Collaboration across boundaries
> Influence and relationships
* Building professional relationships
* Power and influence
* Influencing without authority
* Stakeholder mapping
* Emotional intelligence at work
> Negotiation and conflict
* Principled negotiation
* Preparing to negotiate: BATNA and the bargaining zone
* Sources of workplace conflict
* Conflict-handling styles
* Difficult conversations
* Resolving conflict: mediation and escalation
3. Management and Organisational Behaviour
> What managers do
* What is management?
* Classical management theory: Taylor and Fayol
* Mintzberg's managerial roles
* The human relations movement
> Organisational structure
* Organisational structure
* Centralisation and decentralisation
* Bureaucracy and Weber
* Contingency theory and organisational design
> People at work
* Motivation: content theories
* Motivation: process theories
* Leadership theories
* Leadership styles
* Teams and group working
* Communication in organisations
> Culture, power and change
* Organisational culture
* Power and politics in organisations
* Managing change
* Decision-making in organisations
4. Project Management
> Project foundations
* What a project is
* Project life cycles
* Project roles and governance
* The business case
> Planning
* Scope and requirements
* The work breakdown structure
* Scheduling and the critical path
* Estimating and budgeting
* Risk management
* Stakeholders and communication in projects
> Methods
* PRINCE2 principles
* Agile and the Agile Manifesto
* Scrum
* Kanban
* Choosing a delivery approach
> Delivery and closure
* Monitoring and controlling progress
* Closing a project and learning lessons
5. Productivity and Personal Effectiveness
> Goals and priorities
* Setting goals: SMART objectives and OKRs
* Prioritisation: urgency and importance
* Planning your week
* Focus, interruptions and deep work
* Procrastination
> Working habits
* Managing email and information overload
* Task management systems
* Saying no and managing expectations
* Working remotely and flexibly
> Learning at work
* How adults learn
* Reflective practice
* Learning from mistakes
6. Problem Solving and Decision Making
> Defining problems
* Defining the problem
* Root cause analysis
* Systems thinking
> Generating and evaluating options
* Creative thinking techniques
* Evaluating options: criteria and weighting
* Cost-benefit analysis
> Making decisions
* Rational choice and bounded rationality
* Heuristics and biases in decisions
* Group decisions and groupthink
* Deciding under uncertainty
* Evidence-based management
> Critical thinking
* Evaluating arguments and evidence
* Logical fallacies at work
* Making a recommendation
7. Data and Digital Skills at Work
> Working with data
* Data literacy
* Spreadsheet essentials
* Descriptive statistics for work
* Charts and data visualisation
* Telling a story with data
* Spotting misleading statistics
> Digital working
* Digital collaboration tools
* Information management and version control
* Cyber security at work
* Data protection: UK GDPR basics
* Artificial intelligence at work
* Digital accessibility
> Digital professionalism
* Your online professional presence
* Digital wellbeing
8. The Business Environment
> What business is
* What is a business?
* Business purpose and objectives
* Stakeholders
* The private, public and third sectors
> Legal forms and ownership
* Sole traders and partnerships
* Private and public limited companies
* Social enterprises and co-operatives
* Franchising
> The external environment
* PESTLE analysis
* Markets and competition
* The economic environment
* The legal and regulatory environment
* Technology and social change
* Globalisation and international business
> Size, growth and failure
* Business size and growth
* Why businesses fail
9. Ethics, Professionalism and Employment Rights
> Professionalism and ethics
* What professionalism means
* Professional codes of conduct
* Ethical decision making
* Integrity and conflicts of interest
* Whistleblowing
> Fairness at work
* The Equality Act 2010
* Discrimination, harassment and victimisation
* Reasonable adjustments
* Inclusion and unconscious bias
> Employment rights basics
* Employment status
* The contract of employment
* Working time, pay and holiday
* Family-friendly rights
* Discipline and grievance: the ACAS Code
* Dismissal and redundancy basics
* Getting help: ACAS and advice services
10. Motivation, Emotion and Wellbeing
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
`;

export const TRACKS = [
  { name: "Stage 1 · Core professional skills", units: [1, 5], from: "#e69138", to: "#f6b26b" },
  { name: "Stage 2 · Working with others", units: [2, 3], from: "#f6b26b", to: "#e06666" },
  { name: "Stage 3 · Getting things done", units: [4, 6, 7], from: "#e69138", to: "#22d3ee" },
  { name: "Stage 4 · The organisation", units: [8, 9], from: "#cc7a29", to: "#a78bfa" },
  { name: "Stage 5 · Your career", units: [10], from: "#f6b26b", to: "#22d3ee" },
];

export const PATHS = [
  { id: "graduate", name: "Starting your career", sub: "The essential skills of a first professional job: communication, teamwork, productivity, problem solving and career growth.", units: [1, 2, 5, 6, 10] },
  { id: "manager", name: "New manager", sub: "The CMI Level 5 core: leading and managing people, change, decisions, projects, ethics and employment basics.", units: [3, 2, 1, 6, 4, 9] },
  { id: "projects", name: "Project delivery", sub: "Planning and delivering projects with APM, PRINCE2 and Agile principles, backed by data and decision skills.", units: [4, 6, 7, 2, 5] },
  { id: "business", name: "Business and commercial", sub: "How organisations make money, measure success and stay on the right side of ethics and the law.", units: [8, 7, 6, 9] },
  { id: "skills-builder", name: "Essential skills", sub: "The eight Skills Builder essential skills: listening, speaking, problem solving, creativity, staying positive, aiming high, leadership and teamwork.", units: [1, 6, 10, 5, 2, 3] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "Listening, questioning, plain-English writing, emails, reports, meetings, presentations and feedback that lands.",
  2: "Effective teams, psychological safety, influence, stakeholders, emotional intelligence, negotiation and conflict.",
  3: "What managers do, how organisations are structured, and how motivation, leadership, culture and change work.",
  4: "Projects from business case to closure: scope, schedules, risk, PRINCE2, Agile, Scrum and Kanban.",
  5: "Goals, priorities, focus, procrastination, task systems, remote working and learning from experience.",
  6: "Defining problems, finding root causes, weighing options, avoiding bias and making a sound recommendation.",
  7: "Data literacy, spreadsheets, charts, honest statistics, cyber security, UK GDPR, AI and accessibility at work.",
  8: "What a business is, who it serves, the legal forms it can take and the external forces it must read.",
  9: "Professional ethics and integrity, the Equality Act 2010 and the basics of UK employment rights.",
  10: "Why we act, what emotions are, how stress works and what the science of wellbeing has found.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
