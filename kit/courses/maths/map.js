// MathGradify curriculum mapping: what each school covers against the DfE subject content for GCSE
// mathematics and A level mathematics, with the provenance of each framework. `npm run qa` reads this to
// report coverage. Every school is also classified by the top-level areas of the Mathematics Subject
// Classification (MSC2020), so university and specialist schools are mapped too.
export const FRAMEWORKS = {
  gcse: {
    name: "GCSE mathematics: subject content areas", owner: "Department for Education",
    url: "https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives",
    version: "Subject content published November 2013, as known up to 2025–26", verified: null, // set to { date, by } once checked
    items: ["Number", "Algebra", "Ratio, proportion and rates of change", "Geometry and measures", "Probability", "Statistics"],
  },
  alevel: {
    name: "A level mathematics: subject content areas", owner: "Department for Education",
    url: "https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics",
    version: "Subject content published December 2014 (first teaching 2017), as known up to 2025–26", verified: null,
    items: ["Proof", "Algebra and functions", "Coordinate geometry", "Sequences and series", "Trigonometry", "Exponentials and logarithms", "Differentiation", "Integration", "Numerical methods", "Vectors", "Statistical sampling", "Data presentation and interpretation", "Probability", "Statistical distributions", "Statistical hypothesis testing", "Quantities and units in mechanics", "Kinematics", "Forces and Newton's laws", "Moments"],
  },
  msc: {
    name: "Mathematics Subject Classification: top-level areas", owner: "American Mathematical Society and zbMATH Open",
    url: "https://msc2020.org/",
    version: "MSC2020", verified: null,
    items: ["Mathematical logic and foundations", "Combinatorics", "Order, lattices, ordered algebraic structures", "General algebraic systems", "Number theory", "Field theory and polynomials", "Commutative algebra", "Linear and multilinear algebra; matrix theory", "Group theory and generalizations", "Topological groups, Lie groups", "Real functions", "Measure and integration", "Functions of a complex variable", "Ordinary differential equations", "Partial differential equations", "Dynamical systems and ergodic theory", "Harmonic analysis on Euclidean spaces", "Functional analysis", "Operator theory", "Calculus of variations and optimal control; optimization", "Geometry", "Convex and discrete geometry", "Differential geometry", "General topology", "Algebraic topology", "Manifolds and cell complexes", "Probability theory and stochastic processes", "Statistics", "Numerical analysis", "Computer science", "Mechanics of particles and systems", "Fluid mechanics", "Operations research, mathematical programming", "Game theory, economics, finance, and other social and behavioral sciences", "Biology and other natural sciences", "Systems theory; control", "Information and communication theory, circuits", "Mathematics education"],
  },
};
export const MAP = {
  u01: { gcse: ["Number", "Ratio, proportion and rates of change"], msc: ["Number theory", "Mathematics education"] },
  u02: { msc: ["Number theory", "Information and communication theory, circuits", "Computer science"] },
  u03: { gcse: ["Algebra"], alevel: ["Algebra and functions", "Exponentials and logarithms", "Sequences and series"], msc: ["Field theory and polynomials", "Real functions"] },
  u04: { msc: ["Group theory and generalizations", "General algebraic systems", "Commutative algebra", "Field theory and polynomials", "Topological groups, Lie groups"] },
  u05: { gcse: ["Geometry and measures"], alevel: ["Coordinate geometry", "Vectors"], msc: ["Geometry", "Convex and discrete geometry", "Differential geometry"] },
  u06: { gcse: ["Geometry and measures"], alevel: ["Trigonometry"], msc: ["Real functions", "Harmonic analysis on Euclidean spaces"] },
  u07: { alevel: ["Differentiation", "Integration", "Sequences and series"], msc: ["Real functions", "Measure and integration"] },
  u08: { msc: ["Real functions", "Measure and integration", "Calculus of variations and optimal control; optimization"] },
  u09: { msc: ["Real functions", "Functions of a complex variable", "Measure and integration", "Functional analysis", "Operator theory", "Harmonic analysis on Euclidean spaces"] },
  u10: { msc: ["Ordinary differential equations", "Partial differential equations", "Dynamical systems and ergodic theory", "Numerical analysis"] },
  u11: { alevel: ["Vectors"], msc: ["Linear and multilinear algebra; matrix theory"] },
  u12: { gcse: ["Probability"], alevel: ["Probability", "Statistical distributions"], msc: ["Probability theory and stochastic processes"] },
  u13: { gcse: ["Statistics"], alevel: ["Statistical sampling", "Data presentation and interpretation", "Statistical hypothesis testing"], msc: ["Statistics"] },
  u14: { msc: ["Combinatorics", "Computer science", "Game theory, economics, finance, and other social and behavioral sciences"] },
  u15: { msc: ["Combinatorics", "Computer science", "Operations research, mathematical programming"] },
  u16: { alevel: ["Proof"], msc: ["Mathematical logic and foundations", "Order, lattices, ordered algebraic structures"] },
  u17: { msc: ["General topology", "Algebraic topology", "Manifolds and cell complexes", "Differential geometry"] },
  u18: { msc: ["Operations research, mathematical programming", "Calculus of variations and optimal control; optimization"] },
  u19: { alevel: ["Numerical methods"], msc: ["Numerical analysis"] },
  u20: { alevel: ["Quantities and units in mechanics", "Kinematics", "Forces and Newton's laws", "Moments"], msc: ["Mechanics of particles and systems", "Fluid mechanics", "Biology and other natural sciences", "Dynamical systems and ergodic theory"] },
  u21: { msc: ["Game theory, economics, finance, and other social and behavioral sciences", "Probability theory and stochastic processes"] },
  u22: { msc: ["Statistics", "Probability theory and stochastic processes"] },
  u23: { msc: ["Information and communication theory, circuits"] },
  u24: { msc: ["Computer science", "Statistics", "Calculus of variations and optimal control; optimization"] },
  u25: { msc: ["Systems theory; control"] },
  u26: { msc: ["Mathematical logic and foundations", "Mathematics education"] },
  u27: { msc: ["Computer science", "Numerical analysis"] },
  u28: { gcse: ["Number", "Algebra", "Ratio, proportion and rates of change", "Geometry and measures", "Probability", "Statistics"], msc: ["Mathematics education"] },
  u29: { gcse: ["Number", "Ratio, proportion and rates of change", "Geometry and measures", "Statistics"], msc: ["Mathematics education"] },
};
