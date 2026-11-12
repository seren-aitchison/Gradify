// CreateGradify Design Thinking and Creativity: the full curriculum, 12 schools, modelled on GCSE and A level Design and
// Technology (iterative design, materials, manufacture), the Design Council's Double Diamond, the IDEO and Stanford
// d.school design thinking models and HCI/UX fundamentals (Norman, Nielsen Norman Group, W3C WCAG 2.2). Each topic is
// taught as one lesson, grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent (ids.js,
// written by node scripts/new-course.mjs lock design): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Foundations of Design Thinking
> What design is
* What is design?
* A short history of design
* Design thinking defined
* Design as a process, not a product
> Process models
* The Double Diamond
* Divergent and convergent thinking
* The d.school and IDEO models
* Iterative design in Design and Technology
> Design in the world
* Designers and design disciplines
* Human-centred design
* Wicked problems
* The value of design
2. The Psychology of Creativity
> Understanding creativity
* What is creativity?
* The four Ps of creativity
* Divergent thinking and its measurement
* Stages of the creative process
> Minds and conditions
* Insight and incubation
* Knowledge, expertise and creativity
* Motivation and creativity
* Design fixation and how to break it
> Creative environments
* Creative confidence
* Constraints and creativity
* Creative climate in teams
* Myths about creativity
3. Ideation Methods
> Generating ideas
* Brainstorming and its rules
* Brainwriting and 6-3-5
* SCAMPER
* Mind mapping
* Analogies and biomimicry
* Morphological analysis
* How might we questions
* Reversal and the worst possible idea
> Selecting and developing ideas
* Clustering and affinity diagrams
* Dot voting and its limits
* Evaluation matrices
* Concept development
* TRIZ basics
* Sketching to think
4. User Research and Empathy
> Planning research
* Why research users
* Research questions and plans
* Qualitative and quantitative research
* Research ethics and consent
* Recruiting participants
> Methods
* User interviews
* Contextual inquiry and observation
* Surveys
* Diary studies
* Ethnography in design
* Desk research and competitor analysis
> Making sense
* Empathy maps
* Personas
* Customer journey maps
* Jobs to be done
* Synthesis and insight
5. Defining Problems
> Framing
* Problem framing and reframing
* Point-of-view statements
* Design briefs
* Design specifications
* Requirements and constraints
* Stakeholder mapping
> Focusing
* Root cause analysis and the five whys
* Prioritisation methods
* Assumptions and hypotheses
* Success criteria and metrics
* Scoping the problem space
* The ethics of problem choice
6. Prototyping, Testing and Iteration
> Prototyping
* Why prototype
* Prototype fidelity
* Paper prototyping
* Wireframes
* Physical models and mock-ups
* Wizard of Oz and experience prototypes
* Digital prototyping tools
> Testing
* Usability testing
* Thinking aloud
* How many users to test
* Heuristic evaluation
* A/B testing
* Analysing test results
> Iteration
* Iterating on feedback
* Minimum viable product
* Design sprints
7. The Visual Language of Art and Design
> What art and design are
* What is art and design?
* How art and design are assessed: the four assessment objectives
* Looking closely: an approach to visual analysis
> The visual elements
* Line
* Shape and form
* Tone and value
* Colour as a visual element
* Texture
* Space
* Pattern
> The principles of design
* Balance and symmetry
* Contrast and emphasis
* Rhythm, repetition and movement
* Proportion and scale
* Unity and variety
> Composition
* Composition and the picture plane
* The rule of thirds and the golden ratio
* Gestalt principles in art and design
8. Accessibility and Inclusive Design
> Principles
* Why accessibility matters
* Models of disability
* Inclusive design principles
* Universal design
> WCAG
* WCAG 2.2 and the POUR principles
* Conformance levels
* Colour contrast
* Keyboard access and focus
* Text alternatives
* Accessible forms
> Practice
* Assistive technologies
* Testing for accessibility
* Cognitive accessibility
* Accessibility and UK law
9. Product Design and Materials
> Materials
* Material properties
* Woods and manufactured boards
* Metals and alloys
* Polymers
* Textiles and composites
* Smart and modern materials
> Making
* Manufacturing processes
* Scales of production
* Design for manufacture and assembly
* Ergonomics and anthropometrics
* Tolerances and quality control
> Product thinking
* Form and function
* The product life cycle
* Influential designers and movements
10. Service and Systems Design
> Services
* What is service design?
* Service blueprints
* Touchpoints and channels
* Co-design and participatory design
* Designing public services
> Systems
* Systems thinking for designers
* Feedback loops and leverage points
* Ecosystem maps
* Designing for behaviour change
* Nudges and choice architecture
* Platforms and networks
* Measuring service outcomes
11. Sustainable and Ethical Design
> Sustainability
* Design and the environment
* Life cycle assessment
* The circular economy
* Designing out waste
* Design for disassembly and repair
* Choosing materials sustainably
* Cradle to cradle
* The waste hierarchy
> Ethics
* Design ethics
* Dark patterns
* Persuasive technology
* Privacy by design
* Bias in design and data
* Designing with AI
* Social and cultural responsibility
* Professional codes of conduct
12. Collaboration, Communication and Intellectual Property
> Collaboration
* Creative collaboration
* Workshops and facilitation
* Giving and receiving critique
* Working with stakeholders
> Communication
* Sketching and visual communication
* Storytelling in design
* Presenting and pitching
* Design portfolios
* Documentation and developer handoff
* Design systems
> Intellectual property
* Intellectual property basics
* Copyright
* Registered designs
* Patents
* Trade marks
* Protecting and licensing ideas
`;

// stages on the map; CreateGradify's colours run from coral pink to cyan
export const TRACKS = [
  { name: "Stage 1 · Foundations of design and creativity", units: [1, 2], from: "#f0466e", to: "#f97316" },
  { name: "Stage 2 · The design process", units: [3, 4, 5, 6], from: "#f43f5e", to: "#a855f7" },
  { name: "Stage 3 · Designing what people use", units: [7, 8, 9], from: "#ec4899", to: "#6366f1" },
  { name: "Stage 4 · Systems, sustainability and ethics", units: [10, 11], from: "#d946ef", to: "#14b8a6" },
  { name: "Stage 5 · Professional practice", units: [12], from: "#f0466e", to: "#22d3ee" },
];

export const PATHS = [
  { id: "gcse-alevel", name: "GCSE and A level Design and Technology", sub: "Iterative design, briefs and specifications, prototyping, materials, manufacture, sustainability and designers, as in D&T specifications.", units: [1, 3, 5, 6, 9, 11] },
  { id: "ux", name: "UX and interaction design", sub: "User research, problem definition, prototyping and usability testing, interface principles and WCAG accessibility.", units: [1, 4, 5, 6, 7, 8] },
  { id: "design-thinking", name: "Design thinking for anyone", sub: "The creative process and the Double Diamond for any problem: creativity, ideation, empathy, framing and testing.", units: [1, 2, 3, 4, 5, 6] },
  { id: "responsible", name: "Responsible design", sub: "Designing for everyone and for the planet: inclusive design, services and systems, circular design and ethics.", units: [8, 10, 11] },
  { id: "practice", name: "Working as a designer", sub: "Collaboration, critique, pitching, portfolios and protecting your ideas, with the visual and prototyping skills behind them.", units: [12, 7, 6, 2] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "What design is, where design thinking came from, the Double Diamond and other process models, and why design matters.",
  2: "What creativity is, how it is measured, insight and incubation, fixation, motivation and the conditions that help ideas flow.",
  3: "Brainstorming, brainwriting, SCAMPER, analogies, morphological charts and TRIZ, then how to select and develop ideas.",
  4: "Planning ethical research, interviews, observation, surveys and diaries, and turning findings into personas, journeys and insight.",
  5: "Framing and reframing problems, briefs and specifications, stakeholders, root causes, assumptions and success measures.",
  6: "Prototypes from paper to code, usability testing, heuristic evaluation, A/B tests, MVPs, sprints and iteration.",
  7: "The visual elements and principles of design, composition and how to look closely: the vocabulary of every later school.",
  8: "Models of disability, inclusive and universal design, WCAG 2.2 in practice, assistive technology and UK accessibility law.",
  9: "Material properties, woods, metals, polymers, textiles and smart materials, manufacturing, ergonomics and product life cycles.",
  10: "Service blueprints, touchpoints, co-design and public services, then systems thinking, feedback loops and behaviour change.",
  11: "Life cycle assessment, the circular economy and design for repair, then dark patterns, privacy, bias and design ethics.",
  12: "Collaboration, workshops and critique, storytelling, pitching and portfolios, design systems and UK intellectual property.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
