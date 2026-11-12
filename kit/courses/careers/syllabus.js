// InternshipGradify Careers and Employability: the full curriculum, 11 schools, modelled on the CDI Career Development
// Framework (its six learning areas: grow throughout life, explore possibilities, manage career, create opportunities,
// balance life and work, see the big picture), the Gatsby Benchmarks and UK university employability provision.
// Each topic is taught as one lesson, grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent
// (ids.js, written by node scripts/new-course.mjs lock careers): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Knowing Yourself
> Career development foundations
* What career development is
* Career theories: matching, development and chance
* The Gatsby Benchmarks and careers support
> Self-assessment
* Identifying your skills
* Transferable skills and graduate attributes
* Values and what matters to you at work
* Strengths and how to use them
* Interests and personality tools: uses and limits
* Reflective practice and the skills audit
> From self-knowledge to direction
* Motivations and work-life priorities
* Your career story and personal brand
* Setting career goals
2. Exploring Sectors and Roles
> Labour market information
* What labour market information is
* Using ONS and official labour market data
* Reading job profiles: Prospects and the National Careers Service
* Skills shortages and growth areas
> Sectors and employers
* How sectors and industries are organised
* Public, private and third sector employers
* Large employers, SMEs and start-ups
* Graduate destinations: what degrees lead to
> Matching roles to you
* Job titles, job families and role descriptions
* Researching an employer
* Informational interviews
* Weighing options and making a career decision
3. Work Experience, Internships and Placements
> Kinds of experience
* Work experience and work shadowing
* Internships
* Placement years and sandwich degrees
* Insight days and spring weeks
* Volunteering
* Part-time work and its value
> Getting and using experience
* Finding opportunities: advertised and speculative
* Unpaid internships and the National Minimum Wage
* Making the most of a placement
* Virtual and remote experience
* Reflecting on and recording experience
* Turning experience into evidence
4. Networking and Your Professional Presence
> Networking
* What networking is and why it works
* Building a network from where you are
* Careers fairs and networking events
* Speculative approaches and follow-up
* Mentors and sponsors
* Alumni networks
> Online presence
* Building a LinkedIn profile
* Using LinkedIn to research and connect
* Content, engagement and visibility
* Managing your digital footprint
* Professional email communication
* Job scams and staying safe online
5. CVs and Cover Letters
> The CV
* What a CV is for
* CV structure and sections
* Writing achievement statements
* Tailoring a CV to a role
* CV formats: chronological and skills-based
* Applicant tracking systems and keywords
* Common CV mistakes
* Academic and international CVs
> Cover letters
* The purpose of a cover letter
* Structuring a cover letter
* Showing motivation and fit
* Speculative letters
6. Applications and Psychometric Tests
> Application forms
* How application forms work
* Competency-based questions
* The STAR method
* Strengths-based questions
* Motivational questions
* Supporting and personal statements
* Civil Service Success Profiles
> Psychometric and online assessments
* What psychometric tests measure
* Numerical reasoning tests
* Verbal reasoning tests
* Logical and inductive reasoning tests
* Situational judgement tests
* Personality questionnaires
* Game-based assessments
* Reasonable adjustments in assessment
7. Interviews and Assessment Centres
> Interviews
* Interview formats
* Preparing for an interview
* Answering competency and strengths questions
* Telephone and live video interviews
* Pre-recorded video interviews
* Case interviews
* Technical interviews
* Questions to ask the interviewer
* Handling nerves and difficult questions
> Assessment centres
* What happens at an assessment centre
* Group exercises
* Presentations
* In-tray and e-tray exercises
* Role-plays
* Feedback and learning from rejection
8. Graduate Schemes, Apprenticeships and Other Routes
> Graduate recruitment
* The graduate recruitment market
* Graduate schemes
* Graduate jobs outside schemes
* The recruitment calendar
* Offers, negotiation and accepting a job
> Other routes
* Degree and higher apprenticeships
* School leaver programmes
* Postgraduate study as a career step
* Working abroad and visas
* Gap years and career breaks
* Creative and portfolio careers
* Public service and fast-track routes
9. Starting Work: Contracts and Rights
> Contracts and pay
* Employment status: employee, worker and self-employed
* The written statement of employment particulars
* Pay, the minimum wage and payslips
* Tax, National Insurance and student loan repayments
* Pensions and auto-enrolment
* Working hours and holiday
> Rights and the first months
* Probation periods
* Equality and discrimination at work
* Disability, disclosure and reasonable adjustments
* Flexible working
* Raising a grievance
* Your first 90 days
* Workplace wellbeing
10. Marketing
> Marketing foundations
* What is marketing?
* Market research
* Segmentation, targeting and positioning
* Consumer behaviour
* Business-to-business marketing
> The marketing mix
* Product and the product life cycle
* Pricing strategies
* Promotion and marketing communications
* Place and distribution channels
* The extended marketing mix
> Brands and customers
* Branding and brand equity
* Customer relationship management
* Services marketing
> Modern marketing
* Digital and social media marketing
* Marketing metrics
* Sustainable and ethical marketing
* International marketing
* The marketing plan
11. Career Planning and Resilience
> Planning a career
* Career planning models
* Career management skills
* Action planning
* Lifelong learning and CPD
* Changing career
* The future of work and automation
> Resilience
* Career resilience
* Dealing with rejection
* Imposter feelings
* Uncertainty and planned happenstance
* Career wellbeing and burnout
* Getting careers guidance
`;

// stages on the map; InternshipGradify's colours run from teal to cyan
export const TRACKS = [
  { name: "Stage 1 · Know yourself and the market", units: [1, 2], from: "#0aa4c9", to: "#22d3ee" },
  { name: "Stage 2 · Experience and connections", units: [3, 4], from: "#0891b2", to: "#2dd4bf" },
  { name: "Stage 3 · Applying and being selected", units: [5, 6, 7], from: "#0e7490", to: "#38bdf8" },
  { name: "Stage 4 · Routes and starting work", units: [8, 9, 10], from: "#0aa4c9", to: "#34d399" },
  { name: "Stage 5 · A career over a lifetime", units: [11], from: "#06b6d4", to: "#818cf8" },
];

export const PATHS = [
  { id: "first-job", name: "Landing a graduate job", sub: "From self-assessment and research to CVs, applications, tests, interviews and assessment centres.", units: [1, 2, 5, 6, 7, 8] },
  { id: "placement", name: "Winning an internship or placement", sub: "Finding experience, building a network and getting through selection for a summer internship or placement year.", units: [1, 3, 4, 5, 6, 7] },
  { id: "starting-work", name: "Starting work well", sub: "Contracts, pay, rights, probation and the first months in a job, with resilience for the long run.", units: [9, 11] },
  { id: "own-path", name: "Working for yourself", sub: "Self-knowledge, freelancing, enterprise and planning a career that you build yourself.", units: [1, 10, 11] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "Career development theory, the Gatsby Benchmarks and assessing your own skills, values, strengths and goals.",
  2: "Labour market information, sectors, employers and roles, and how to research and decide between options.",
  3: "Work experience, internships, placements, insight days and volunteering, and turning them into evidence.",
  4: "Building a network in person and online, LinkedIn, professional communication and staying safe from scams.",
  5: "Writing CVs and cover letters that are tailored, evidenced and readable by people and software.",
  6: "Application forms, competency and strengths questions, STAR answers and online psychometric tests.",
  7: "Every kind of interview, from video to case, and the exercises of an assessment centre.",
  8: "Graduate schemes, the recruitment calendar, offers, apprenticeships, further study and other routes.",
  9: "Employment status, contracts, pay, tax, pensions, rights at work, probation and your first months.",
  10: "Understanding customers and markets, the marketing mix, brands, digital marketing and the marketing plan.",
  11: "Planning and managing a career for life, changing direction, and resilience through rejection and change.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
