// MathGradify's concept graph: what each module builds on (kit/learning/concepts.js reads it). Keys and values are
// "<school id>/<module>"; a bare school id stands for all its modules. A prerequisite is listed only where a learner
// genuinely needs it to follow the module, not wherever it's mentioned. Written from the lessons' content; like the
// lessons, it awaits review by a mathematics teacher or lecturer.
//
// Schools 28 and 29 (exam and everyday maths) come late in the course but rest on School 1: the graph records that,
// and the sequencing report (docs/qa/maths-concepts.md) lists every such forward link.
const N = "u01/Number systems", FP = "u01/Factors and primes", FDP = "u01/Fractions, decimals and percentages", POW = "u01/Powers, roots and standard form", ACC = "u01/Accuracy and estimation";
const ALG = "u03/Foundations", EQ = "u03/Equations and inequalities", LOG = "u03/Surds, exponentials and logarithms", POLY = "u03/Polynomials", FN = "u03/Functions", FA = "u03/Further algebra";
const LIM = "u07/Limits and continuity", DIFF = "u07/Differentiation", APPD = "u07/Applications of differentiation", INT = "u07/Integration", SER = "u07/Sequences and series";
const MV = "u08/Multivariable calculus", VC = "u08/Vector calculus";
const VEC = "u11/Vectors and vector spaces", MAT = "u11/Matrices", LMAP = "u11/Linear maps", EIG = "u11/Eigenvalues and diagonalisation", ORTH = "u11/Orthogonality", DEC = "u11/Decompositions and computation";
const PF = "u12/Foundations of probability", RV = "u12/Random variables", DD = "u12/Discrete distributions", CD = "u12/Continuous distributions", MVD = "u12/Multivariate and specialist distributions";
const DESC = "u13/Descriptive statistics", SAMP = "u13/Sampling and estimation", HT = "u13/Hypothesis testing", TESTS = "u13/Statistical tests", REG = "u13/Regression and models", BAYES = "u13/Bayesian and computational statistics";
const ODE = "u10/Ordinary differential equations", TRANS = "u10/Transform and analytical methods", PDE = "u10/Partial differential equations", DYN = "u10/Dynamical systems";
const SETS = "u16/Sets", REL = "u16/Relations and orders", LOGIC = "u16/Logic", PROOF = "u16/Proof";
const TRIG = "u06/Foundations", TGRAPH = "u06/Functions and graphs", TID = "u06/Identities and equations";
const OPT = "u18/Optimisation", LP = "u18/Linear and integer programming", OALG = "u18/Algorithms";
const NERR = "u19/Errors and stability", ROOTS = "u19/Roots and interpolation", NCALC = "u19/Numerical calculus and linear algebra";
const COUNT = "u14/Counting", GRAPHS = "u15/Graphs", INFO = "u23/Information theory", SIG = "u23/Signal processing";
const TSF = "u22/Foundations", ARIMA = "u22/Smoothing and ARIMA models", ML = "u24/Foundations", PM = "u24/Probabilistic models";
const MOD = "u20/Modelling", TVM = "u21/Interest and the time value of money", GROUPS = "u04/Groups", RINGS = "u04/Rings, fields and modules";
const EUC = "u05/Euclidean geometry", MEAS = "u05/Measurement", COORD = "u05/Coordinate and vector geometry", PST = "u17/Point-set topology", RCA = "u09/Real and complex analysis";
const CTRL = "u25/Systems", FB = "u25/Feedback and stability";

export const CONCEPTS = {
  modules: {
    // School 1: number
    [FP]: [N],
    [FDP]: [N, FP],
    [POW]: [N, FDP],
    [ACC]: [FDP, POW],
    "u01/Patterns and bases": [N, POW],
    // School 2: number theory and cryptography
    "u02/Elementary number theory": [FP, ALG],
    "u02/Classical theorems": ["u02/Elementary number theory"],
    "u02/Advanced number theory": ["u02/Classical theorems", RINGS],
    "u02/Cryptography": ["u02/Classical theorems"],
    // School 3: algebra
    [ALG]: [N, FDP],
    [EQ]: [ALG],
    [LOG]: [POW, EQ],
    [POLY]: [EQ],
    [FN]: [ALG, EQ],
    [FA]: [EQ, POLY],
    // School 4: abstract algebra
    [GROUPS]: [SETS, REL, PROOF],
    [RINGS]: [GROUPS, POLY],
    "u04/Representations and Lie theory": [GROUPS, LMAP],
    // School 5: geometry
    [EUC]: [N],
    [MEAS]: [EUC, FDP],
    "u05/Transformations and symmetry": [EUC, COORD],
    [COORD]: [EUC, ALG, EQ],
    "u05/Further geometries": [EUC, COORD],
    // School 6: trigonometry
    [TRIG]: [EUC, FDP],
    "u06/Triangles": [TRIG],
    [TGRAPH]: [TRIG, FN],
    [TID]: [TRIG, EQ],
    "u06/Hyperbolic functions and Fourier series": [TGRAPH, LOG, INT, SER],
    // School 7: calculus
    [LIM]: [FN],
    [DIFF]: [LIM, POW],
    [APPD]: [DIFF],
    [INT]: [DIFF],
    [SER]: [LIM, DIFF],
    // School 8: multivariable and vector calculus
    [MV]: [DIFF, INT, VEC],
    [VC]: [MV],
    "u08/Further calculus": [MV, MAT],
    // School 9: analysis
    [RCA]: [LIM, SER, PROOF, FA],
    "u09/Functional analysis": [RCA, VEC, ORTH],
    // School 10: differential equations
    [ODE]: [DIFF, INT],
    [TRANS]: [ODE, INT],
    [PDE]: [ODE, MV],
    "u10/Numerical solutions": [ODE, NERR],
    [DYN]: [ODE, EIG],
    // School 11: linear algebra
    [VEC]: [COORD, ALG],
    [MAT]: [VEC],
    [LMAP]: [MAT],
    [EIG]: [MAT, POLY],
    [ORTH]: [VEC],
    [DEC]: [EIG, ORTH],
    "u11/Multilinear algebra": [LMAP],
    // School 12: probability
    [PF]: [FDP, SETS],
    [RV]: [PF],
    [DD]: [RV, COUNT],
    [CD]: [RV, INT],
    [MVD]: [CD, MAT],
    // School 13: statistics
    [DESC]: [FDP],
    [SAMP]: [DESC, RV, CD],
    [HT]: [SAMP],
    [TESTS]: [HT, DD],
    [REG]: [DESC, HT, MAT],
    "u13/Multivariate statistics": [REG, EIG],
    [BAYES]: [SAMP, "u12/Foundations of probability"],
    "u13/Design, causation and evidence": [HT],
    "u13/Specialist methods": [SAMP, CD],
    // School 14: discrete mathematics
    [COUNT]: [N, SETS],
    "u14/Advanced combinatorics": [COUNT, GRAPHS],
    "u14/Codes, algorithms and computation": [COUNT, LOGIC],
    // School 15: graphs and networks
    [GRAPHS]: [SETS],
    "u15/Classic problems": [GRAPHS],
    "u15/Networks": [GRAPHS, MAT],
    // School 16: logic, sets and foundations
    [SETS]: [N],
    [REL]: [SETS],
    [LOGIC]: [SETS],
    [PROOF]: [LOGIC, ALG],
    "u16/Foundations": [LOGIC, REL, PROOF],
    // School 17: topology
    [PST]: [SETS, RCA],
    "u17/Algebraic topology": [PST, GROUPS],
    "u17/Manifolds and geometry": [PST, MV, LMAP],
    "u17/Category theory": [GROUPS, REL],
    // School 18: optimisation
    [OPT]: [APPD, MV],
    [LP]: [MAT, EQ],
    [OALG]: [OPT],
    "u18/Operations research": [LP, PF],
    // School 19: numerical analysis
    [NERR]: [ACC, SER],
    [ROOTS]: [NERR, DIFF, POLY],
    [NCALC]: [NERR, INT, MAT],
    "u19/Scientific computing": [NCALC, ODE],
    // School 20: modelling
    [MOD]: [FN, DIFF],
    "u20/Life sciences": [MOD, ODE],
    "u20/Chemistry": [MOD, ODE],
    "u20/Physics and engineering": [MOD, ODE, VC],
    "u20/Complex systems": [MOD, DYN],
    // School 21: finance and economics
    [TVM]: [FDP, LOG, "u01/Patterns and bases"],
    "u21/Investments and valuation": [TVM, RV],
    "u21/Quantitative finance": ["u21/Investments and valuation", CD, ODE],
    "u21/Risk and actuarial mathematics": [CD, TVM],
    "u21/Economics": [APPD, REG],
    // School 22: time series
    [TSF]: [DESC, RV],
    [ARIMA]: [TSF],
    "u22/Multivariate and state-space models": [ARIMA, MAT],
    "u22/Volatility and change": [ARIMA],
    "u22/Forecasting in practice": [ARIMA, SAMP],
    // School 23: information and signals
    [INFO]: [PF, LOG],
    "u23/Coding": [INFO],
    [SIG]: [TGRAPH, INT, "u06/Hyperbolic functions and Fourier series"],
    // School 24: machine learning
    [ML]: [REG, OPT, MV],
    [PM]: [ML, BAYES],
    "u24/Classical methods": [ML],
    "u24/Deep learning": [ML, DIFF],
    "u24/Learning to act, and explaining": [ML, "u12/Random variables"],
    // School 25: control
    [CTRL]: [ODE, MAT, TRANS],
    [FB]: [CTRL, EIG],
    "u25/Frequency methods": [FB, TRANS],
    "u25/Advanced control": [FB, BAYES],
    // School 26: reasoning and research
    "u26/Reasoning": [LOGIC],
    "u26/Approximation and uncertainty": [ACC, DIFF],
    "u26/Research practice": [HT],
    "u26/Communication": ["u26/Reasoning"],
    // School 27: software
    "u27/Computer algebra and notebooks": [ALG, DIFF],
    "u27/Numerical and scientific programming": [MAT, NERR],
    "u27/Statistics and data": [DESC, REG],
    "u27/Machine learning frameworks": [ML],
    "u27/Spreadsheets and visual tools": [FDP, FN],
    "u27/Typesetting": [ALG],
    "u27/Specialist systems": [GROUPS, PDE],
    "u27/Optimisation solvers": [LP],
    // Schools 28 and 29: exam and everyday maths
    "u28/Qualifications": [N, ALG],
    "u28/Exam skills": [FDP, EQ, PF],
    "u29/Money": [FDP],
    "u29/Measures and time": [FDP, MEAS],
    "u29/Data and risk": [FDP, PF],
  },
};
