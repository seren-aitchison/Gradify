// MathGradify: mathematics as schools and lessons, from number and everyday maths through GCSE, A level and
// Further Maths to university and research-level topics, data science, finance, modelling and software.
// Each "* topic" becomes a lesson on its school's path; its notes are in notes/uNN.js (format:
// kit/course/notes.js). The course engine calls a school a "unit" internally (ids u01…).
// Frameworks: the DfE subject content for GCSE mathematics (2013), A level mathematics and AS and A level
// further mathematics (2016), mapped in map.js; university and specialist topics follow standard
// undergraduate and postgraduate curricula. Topics that belong to several areas are taught once and shared
// between pathways.
// Hierarchy: school (numbered) → module ("> ") → lesson ("* ").
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";

export const SYLLABUS = `
1. Number and Arithmetic
> Number systems
* Arithmetic
* Order of Operations
* Number Systems
* Natural Numbers
* Integers
* Rational Numbers
* Irrational Numbers
* Real Numbers
> Factors and primes
* Factors and Multiples
* Divisibility
* Prime Numbers
* Composite Numbers
* Prime Factorisation
* Greatest Common Divisor (GCD)
* Least Common Multiple (LCM)
> Fractions, decimals and percentages
* Fractions
* Decimals
* Percentages
* Percentage Change and Reverse Percentages
* Ratios and Proportions
> Powers, roots and standard form
* Exponents and Powers
* Roots and Radicals
* Scientific Notation
> Accuracy and estimation
* Rounding and Estimation
* Significant Figures
> Patterns and bases
* Sequences of Numbers
* Number Patterns
* Number Bases
* Binary Arithmetic

2. Number Theory and Cryptography
> Elementary number theory
* Elementary Number Theory
* Modular Arithmetic
* Congruences
* Euclidean Algorithm
* Extended Euclidean Algorithm
* Diophantine Equations
* Divisor Functions
* Perfect Numbers
* Fibonacci Numbers
* Continued Fractions
* Prime Number Theory
> Classical theorems
* Fermat's Little Theorem
* Euler's Totient Function
* Euler's Theorem
* Chinese Remainder Theorem
* Quadratic Residues
* Primitive Roots
* Pell's Equation
* Diophantine Approximation
> Advanced number theory
* Analytic Number Theory
* Algebraic Number Theory
* Computational Number Theory
* Elliptic Curves
* Arithmetic Geometry
> Cryptography
* Cryptography
* Public-Key Cryptography
* Modular Exponentiation
* RSA Cryptography
* Discrete Logarithm Problem
* Elliptic Curve Cryptography
* Cryptographic Hash Functions
* Primality Testing
* Integer Factorisation
* Prime Factorisation Algorithms
* Lattice-Based Cryptography
* Post-Quantum Cryptography

3. Algebra
> Foundations
* Basic Algebra
* Elementary Algebra
* Algebraic Expressions
* Simplifying Expressions
* Expanding Brackets
* Factorisation
* Algebraic Manipulation
* Algebraic Fractions
> Equations and inequalities
* Linear Equations
* Simultaneous Equations
* Quadratic Equations
* Completing the Square
* The Quadratic Formula
* Cubic Equations
* Polynomial Equations
* Inequalities
* Simultaneous Inequalities
* Absolute Value Equations
* Rational Equations
> Surds, exponentials and logarithms
* Surds
* Logarithms
* Exponential Equations
* Logarithmic Equations
> Polynomials
* Polynomials
* Polynomial Algebra
* Polynomial Division
* Remainder Theorem
* Factor Theorem
* Roots of Polynomials
* Vieta's Formulas
* Symmetric Polynomials
* Partial Fractions
> Functions
* Functions
* Domain and Range
* Composite Functions
* Inverse Functions
* Transformations of Functions
* Piecewise Functions
* Parametric Equations
* Implicit Equations
* Recurrence Relations
> Further algebra
* Intermediate Algebra
* Advanced Algebra
* Complex Numbers
* Boolean Algebra

4. Abstract Algebra
> Groups
* Abstract Algebra
* Algebraic Structures
* Group Theory
* Homomorphisms
* Isomorphisms
* Automorphisms
* Quotient Structures
* Direct Products
* Free Groups
> Rings, fields and modules
* Ring Theory
* Field Theory
* Modules
* Algebras
* Commutative Algebra
* Galois Theory
* Homological Algebra
* Universal Algebra
> Representations and Lie theory
* Representation Theory
* Group Representations
* Ring Representations
* Lie Groups
* Lie Algebras

5. Geometry
> Euclidean geometry
* Euclidean Geometry
* Plane Geometry
* Points, Lines and Planes
* Angles
* Parallel and Perpendicular Lines
* Triangles
* Congruence and Similarity
* Quadrilaterals
* Polygons
* Pythagorean Theorem
* Circles
* Chords and Tangents
* Circle Theorems
* Constructions
* Loci
* Bearings
> Measurement
* Perimeter
* Area
* Arc Length
* Solid Geometry
* Polyhedra
* Surface Area
* Volume
> Transformations and symmetry
* Geometric Transformations
* Transformations and Symmetry
* Tessellations
> Coordinate and vector geometry
* Coordinate Geometry
* Analytic Geometry
* Vectors in Geometry
* 3D Coordinate Geometry
* Conic Sections
* Parabolas
* Ellipses
* Hyperbolas
> Further geometries
* Non-Euclidean Geometry
* Spherical Geometry
* Hyperbolic Geometry
* Affine Geometry
* Projective Geometry
* Fractal Geometry
* Discrete Geometry
* Convex Geometry
* Computational Geometry
* Integral Geometry
* Differential Geometry
* Riemannian Geometry
* Symplectic Geometry
* Algebraic Geometry
* Topological Geometry
* Knot Theory

6. Trigonometry
> Foundations
* Basic Trigonometry
* Trigonometric Ratios
* Sine
* Cosine
* Tangent
* Radians and Degrees
* Unit Circle
* Trigonometric Geometry
> Triangles
* Sine Rule
* Cosine Rule
* Area of a Triangle
* Spherical Trigonometry
> Functions and graphs
* Trigonometric Graphs
* Periodic Functions
* Cosecant
* Secant
* Cotangent
* Inverse Trigonometric Functions
* Sinusoidal Modelling
* Harmonic Functions
> Identities and equations
* Trigonometric Identities
* Compound Angle Formulas
* Double Angle Formulas
* Half Angle Formulas
* Trigonometric Equations
* Trigonometric Inequalities
> Hyperbolic functions and Fourier series
* Hyperbolic Functions
* Inverse Hyperbolic Functions
* Fourier Series
* Fourier Analysis

7. Calculus
> Limits and continuity
* Precalculus
* Infinitesimal Calculus
* Limits
* Continuity
* Differentiability
> Differentiation
* Differential Calculus
* Derivatives
* First Derivatives
* Higher-Order Derivatives
* Chain Rule
* Product Rule
* Quotient Rule
* Implicit Differentiation
* Logarithmic Differentiation
* Parametric Differentiation
* Rates of Change
* Related Rates
* L'Hôpital's Rule
> Applications of differentiation
* Stationary Points
* Critical Points
* Local Maxima and Minima
* Global Optimisation
* Concavity and Convexity
* Points of Inflection
* Curve Sketching
> Integration
* Integral Calculus
* Indefinite Integrals
* Riemann Sums
* Definite Integrals
* Fundamental Theorem of Calculus
* Integration by Substitution
* Integration by Parts
* Partial Fraction Integration
* Trigonometric Integration
* Improper Integrals
* Numerical Integration
* Arc Length and Surface Area
* Volumes of Revolution
> Sequences and series
* Sequences and Series
* Infinite Series
* Convergence and Divergence
* Power Series
* Taylor Series
* Maclaurin Series

8. Multivariable and Vector Calculus
> Multivariable calculus
* Multivariable Calculus
* Directional Derivatives
* Gradient
* Multiple Integrals
* Double Integrals
* Triple Integrals
* Jacobians
* Change of Variables
> Vector calculus
* Vector Calculus
* Divergence
* Curl
* Laplacian Operator
* Line Integrals
* Surface Integrals
* Volume Integrals
* Green's Theorem
* Stokes' Theorem
* Divergence Theorem
> Further calculus
* Matrix Calculus
* Tensor Calculus
* Calculus of Variations
* Fractional Calculus

9. Analysis
> Real and complex analysis
* Real Analysis
* Complex Analysis
* Harmonic Analysis
* Measure Theory
* Lebesgue Integration
* Distribution Theory
> Functional analysis
* Functional Analysis
* Banach Spaces
* Hilbert Spaces
* Operator Theory
* Spectral Theory
* Banach Algebras
* C*-Algebras
* Operator Algebras

10. Differential Equations
> Ordinary differential equations
* Ordinary Differential Equations (ODEs)
* First-Order Differential Equations
* Separable Differential Equations
* Linear Differential Equations
* Exact Differential Equations
* Homogeneous Differential Equations
* Bernoulli Equations
* Second-Order Differential Equations
* Higher-Order Differential Equations
* Nonlinear Differential Equations
* Autonomous Differential Equations
* Systems of Differential Equations
* Initial Value Problems
* Boundary Value Problems
> Transform and analytical methods
* Laplace Transforms
* Inverse Laplace Transforms
* Fourier Transform Methods
* Green's Functions
* Sturm–Liouville Theory
> Partial differential equations
* Partial Differential Equations (PDEs)
* Heat Equation
* Wave Equation
* Laplace Equation
* Poisson Equation
* Diffusion Equations
* Reaction-Diffusion Equations
* Transport Equations
* Advection Equations
* Fluid Dynamics Equations
* Navier–Stokes Equations
* Maxwell's Equations
* Schrödinger Equation
> Numerical solutions
* Numerical Solutions of ODEs
* Numerical Solutions of PDEs
* Finite Difference Methods
* Finite Element Methods
* Finite Volume Methods
* Spectral Methods
> Dynamical systems
* Dynamical Systems
* Stability Analysis
* Bifurcation Theory
* Chaos Theory
* Solitons
* Delay Differential Equations
* Stochastic Differential Equations
* Fractional Differential Equations

11. Linear Algebra and Matrices
> Vectors and vector spaces
* Vectors
* Vector Algebra
* Vector Spaces
* Subspaces
* Linear Combinations
* Span
* Linear Independence
* Basis and Dimension
> Matrices
* Matrices
* Matrix Algebra
* Matrix Operations
* Matrix Multiplication
* Matrix Transposition
* Matrix Inversion
* Determinants
* Rank of a Matrix
* Column Space
* Row Space
* Null Space
* Systems of Linear Equations
> Linear maps
* Linear Transformations
* Change of Basis
* Similarity Transformations
> Eigenvalues and diagonalisation
* Eigenvalues
* Eigenvectors
* Eigenspaces
* Characteristic Polynomials
* Diagonalisation
* Jordan Normal Form
* Symmetric Matrices
* Hermitian Matrices
* Positive Definite Matrices
> Orthogonality
* Inner Product Spaces
* Norms
* Orthogonality
* Orthogonal Projections
* Gram–Schmidt Process
> Decompositions and computation
* Matrix Decomposition
* LU Decomposition
* QR Decomposition
* Cholesky Decomposition
* Singular Value Decomposition (SVD)
* Principal Component Analysis (PCA)
* Sparse Matrices
* Block Matrices
* Numerical Linear Algebra
> Multilinear algebra
* Multilinear Algebra
* Tensor Products
* Tensor Algebra
* Exterior Algebra

12. Probability
> Foundations of probability
* Probability Theory
* Foundations of Probability
* Independent Events
* Conditional Probability
* Joint Probability
* Bayes' Theorem
> Random variables
* Random Variables
* Discrete Random Variables
* Continuous Random Variables
* Probability Distributions
* Probability Mass Functions
* Probability Density Functions
* Cumulative Distribution Functions
* Expected Value
* Variance
* Standard Deviation
* Covariance
* Moments and Moment-Generating Functions
* Law of Large Numbers
* Central Limit Theorem
> Discrete distributions
* Bernoulli Distribution
* Binomial Distribution
* Geometric Distribution
* Negative Binomial Distribution
* Hypergeometric Distribution
* Poisson Distribution
* Multinomial Distribution
* Beta-Binomial Distribution
> Continuous distributions
* Uniform Distribution
* Normal Distribution
* Standard Normal Distribution
* Exponential Distribution
* Gamma Distribution
* Beta Distribution
* Chi-Squared Distribution
* Student's T-Distribution
* F-Distribution
* Weibull Distribution
* Log-Normal Distribution
* Pareto Distribution
* Cauchy Distribution
> Multivariate and specialist distributions
* Multivariate Normal Distribution
* Student's T Multivariate Distribution
* Dirichlet Distribution
* Wishart Distribution
* Mixture Distributions
* Empirical Distributions
* Heavy-Tailed Distributions
* Stable Distributions
* Extreme Value Distributions

13. Statistics
> Descriptive statistics
* Descriptive Statistics
* Correlation
* Data Interpretation
* Statistics in Everyday Life
> Sampling and estimation
* Inferential Statistics
* Statistical Inference
* Sampling Theory
* Sampling Distributions
* Sampling Bias
* Confidence Intervals
* Maximum Likelihood Estimation
* Method of Moments
> Hypothesis testing
* Hypothesis Testing
* Null Hypothesis Significance Testing
* P-Values
* Type I and Type II Errors
* Statistical Power
* Effect Sizes
* Multiple Testing Correction
* False Discovery Rate
> Statistical tests
* Parametric Statistics
* Nonparametric Statistics
* Z-Tests
* T-Tests
* Chi-Squared Tests
* Fisher's Exact Test
* Mann–Whitney U Test
* Wilcoxon Signed-Rank Test
* Kruskal–Wallis Test
* Kolmogorov–Smirnov Test
* Analysis of Variance (ANOVA)
* Analysis of Covariance (ANCOVA)
* Categorical Data Analysis
* Contingency Tables
> Regression and models
* Regression Analysis
* Linear Regression
* Multiple Linear Regression
* Logistic Regression
* Poisson Regression
* Nonlinear Regression
* Robust Regression
* Quantile Regression
* Ridge Regression
* Lasso Regression
* Generalised Linear Models (GLMs)
* Mixed-Effects Models
* Generalised Additive Models
* Statistical Modelling
> Multivariate statistics
* Multivariate Statistics
* Multivariate Analysis
* Factor Analysis
* Discriminant Analysis
* Cluster Analysis
> Bayesian and computational statistics
* Frequentist Statistics
* Bayesian Statistics
* Bayesian Inference
* Prior and Posterior Distributions
* Bootstrap Methods
* Permutation Tests
* Monte Carlo Methods
* Markov Chain Monte Carlo (MCMC)
* Statistical Computing
> Design, causation and evidence
* Experimental Design
* Design of Experiments
* Causal Inference
* Structural Equation Modelling
* Meta-Analysis
* Missing Data Analysis
* Imputation Methods
> Specialist methods
* Survival Analysis
* Spatial Statistics
* Reliability Analysis
* Extreme Value Theory
* Decision Theory
* Statistical Learning

14. Discrete Mathematics and Combinatorics
> Counting
* Discrete Mathematics
* Combinatorics
* Counting Principles
* Permutations
* Combinations
* Binomial Theorem
* Pigeonhole Principle
* Inclusion–Exclusion Principle
* Generating Functions
* Enumerative Combinatorics
> Advanced combinatorics
* Extremal Combinatorics
* Ramsey Theory
* Design Theory
* Block Designs
* Invariants
> Codes, algorithms and computation
* Coding Theory
* Boolean Functions
* Algorithms and Complexity
* Computational Complexity Theory
* Automata Theory
* Formal Languages
* Cellular Automata
* Game Theory

15. Graph Theory and Networks
> Graphs
* Graph Theory
* Undirected Graphs
* Directed Graphs
* Weighted Graphs
* Degree Sequences
* Paths and Cycles
* Graph Connectivity
* Trees
* Trees and Forests
* Spanning Trees
* Directed Acyclic Graphs
* Bipartite Graphs
* Planar Graphs
* Planarity
> Classic problems
* Eulerian Paths
* Hamiltonian Paths
* Graph Colouring
* Chromatic Polynomials
* Matching Theory
* Matching and Vertex Covers
* Shortest Path Algorithms
* Shortest Path Problems
* Minimum Spanning Trees
* Network Flows
* Maximum Flow
* Minimum Cut
> Networks
* Weighted Networks
* Network Centrality
* Betweenness Centrality
* Closeness Centrality
* Eigenvector Centrality
* PageRank Mathematics
* Community Detection
* Network Clustering
* Spectral Graph Theory
* Random Graphs
* Small-World Networks
* Scale-Free Networks
* Network Science
* Percolation Theory
* Social Network Analysis
* Biological Network Analysis
* Network Epidemiology
* Graph Neural Network Mathematics

16. Logic, Sets and Foundations
> Sets
* Elementary Set Theory
* Set Theory
* Set Operations
* Union and Intersection
* Complements
* Cartesian Products
* Power Sets
* Countability
* Countable and Uncountable Sets
> Relations and orders
* Relations
* Relations and Functions
* Functions and Mappings
* Equivalence Relations
* Equivalence Classes
* Partial Orders
* Partially Ordered Sets
* Totally Ordered Sets
* Lattices
* Boolean Lattices
> Logic
* Mathematical Logic
* Propositional Logic
* Predicate Logic
* First-Order Logic
* Higher-Order Logic
* Modal Logic
* Intuitionistic Logic
* Fuzzy Logic
* Temporal Logic
> Proof
* Proof Techniques
* Direct Proof
* Proof by Contraposition
* Proof by Contradiction
* Mathematical Induction
* Formal Proofs
> Foundations
* Axiomatic Systems
* Axiomatic Set Theory
* Zermelo–Fraenkel Set Theory
* Axiom of Choice
* Set-Theoretic Mathematics
* Ordinal Arithmetic
* Cardinal Arithmetic
* Large Cardinal Theory
* Proof Theory
* Model Theory
* Gödel's Incompleteness Theorems
* Computability Theory
* Recursive Functions
* Lambda Calculus
* Type Theory
* Constructive Mathematics
* Category-Theoretic Foundations
* Philosophy of Mathematics

17. Topology and Advanced Pure Mathematics
> Point-set topology
* General Topology
* Point-Set Topology
* Topological Spaces
* Metric Spaces
* Continuity in Topology
* Homeomorphisms
* Compactness
* Connectedness
> Algebraic topology
* Algebraic Topology
* Fundamental Groups
* Homotopy Theory
* Homology
* Cohomology
> Manifolds and geometry
* Differential Topology
* Geometric Topology
* Manifold Theory
* Differential Forms
* Fibre Bundles
* Complex Manifolds
* Riemann Surfaces
* Scheme Theory
> Category theory
* Category Theory

18. Optimisation and Operations Research
> Optimisation
* Mathematical Optimisation
* Unconstrained Optimisation
* Constrained Optimisation
* Lagrange Multipliers
* Karush–Kuhn–Tucker Conditions
* Convex Optimisation
* Nonconvex Optimisation
* Nonlinear Programming
* Quadratic Programming
* Multiobjective Optimisation
* Stochastic Optimisation
* Robust Optimisation
* Optimal Control
> Linear and integer programming
* Linear Programming
* Simplex Algorithm
* Interior-Point Methods
* Integer Programming
* Mixed-Integer Programming
* Branch and Bound
* Combinatorial Optimisation
* Dynamic Programming
> Algorithms
* Gradient Descent
* Newton's Method
* Quasi-Newton Methods
* Heuristic Optimisation
* Metaheuristic Algorithms
* Genetic Algorithms
* Simulated Annealing
* Particle Swarm Optimisation
* Bayesian Optimisation
> Operations research
* Operations Research
* Decision Analysis
* Queueing Theory
* Inventory Theory
* Scheduling Theory
* Supply Chain Optimisation
* Network Optimisation
* Facility Location
* Transportation Problems
* Assignment Problems
* Resource Allocation
* Markov Decision Processes
* Reinforcement Learning Mathematics

19. Numerical Analysis and Scientific Computing
> Errors and stability
* Numerical Analysis
* Numerical Methods
* Numerical Approximation
* Error Analysis
* Floating-Point Arithmetic
* Numerical Stability
* Numerical Conditioning
* Interval Arithmetic
> Roots and interpolation
* Root-Finding Algorithms
* Bisection Method
* Newton–Raphson Method
* Secant Method
* Fixed-Point Iteration
* Polynomial Interpolation
* Lagrange Interpolation
* Newton Interpolation
* Spline Interpolation
> Numerical calculus and linear algebra
* Numerical Differentiation
* Gaussian Quadrature
* Iterative Solvers
* Conjugate Gradient Method
* Gradient-Based Methods
* Numerical Optimisation
> Scientific computing
* Numerical Solutions of Differential Equations
* Finite Element Analysis
* Mesh Generation
* Adaptive Mesh Refinement
* Computational Mathematics
* High-Performance Computing
* Parallel Numerical Algorithms
* Symbolic Computation
* Computer Algebra Systems
* Uncertainty Quantification
* Sensitivity Analysis
* Surrogate Modelling
* Scientific Simulation
* Mathematical Software

20. Mathematical Modelling and Applied Mathematics
> Modelling
* Applied Mathematics
* Mathematical Modelling
* Dimensional Analysis
* Similarity Analysis
* Scaling Laws
* Asymptotic Analysis
* Perturbation Theory
* Sensitivity and Uncertainty Analysis
> Life sciences
* Biological Modelling
* Mathematical Biology
* Biomathematics
* Population Dynamics
* Ecological Modelling
* Epidemiological Modelling
* Mathematical Epidemiology
* Compartmental Models
* Compartmental Modelling
* Pharmacokinetic Modelling
* Pharmacodynamic Modelling
* Systems Biology
> Chemistry
* Chemical Modelling
* Reaction Kinetics
* Chemical Kinetics
* Reaction Network Theory
* Reaction-Diffusion Systems
> Physics and engineering
* Physical Modelling
* Mathematical Physics
* Mathematical Physics Equations
* Classical Mechanics
* Continuum Mechanics
* Solid Mechanics
* Elasticity Theory
* Plasticity Theory
* Fluid Mechanics
* Fluid Dynamics
* Aerodynamics
* Wave Mechanics
* Acoustics
* Thermodynamics
* Heat Transfer
* Mass Transfer
* Transport Phenomena
* Diffusion Processes
* Electromagnetism
* Quantum Mechanics
* Statistical Mechanics
> Complex systems
* Nonlinear Dynamics
* Chaos and Complex Systems
* Agent-Based Modelling
* Cellular Automata Modelling
* Systems Theory

21. Financial Mathematics and Economics
> Interest and the time value of money
* Financial Mathematics
* Simple Interest
* Compound Interest
* Time Value of Money
* Present Value
* Future Value
* Annuities
* Loan Amortisation
* Mortgage Mathematics
* Discounted Cash Flow
* Net Present Value (NPV)
* Internal Rate of Return (IRR)
> Investments and valuation
* Bond Pricing
* Equity Valuation
* Portfolio Theory
* Modern Portfolio Theory
* Capital Asset Pricing Model (CAPM)
* Arbitrage Pricing Theory
> Quantitative finance
* Quantitative Finance
* Mathematical Finance
* Financial Modelling
* Stochastic Calculus
* Geometric Brownian Motion
* Derivatives Pricing
* Options Pricing
* Binomial Options Pricing
* Black–Scholes Model
* Interest Rate Models
> Risk and actuarial mathematics
* Risk Theory
* Market Risk Modelling
* Credit Risk Modelling
* Value at Risk (VaR)
* Expected Shortfall
* Actuarial Mathematics
* Insurance Mathematics
* Survival Models
* Pension Mathematics
> Economics
* Mathematical Economics
* Econometrics
* Microeconomic Modelling
* Macroeconomic Modelling
* Game-Theoretic Economics
* Cost-Benefit Analysis
* Forecasting
* Financial Time Series

22. Time Series and Forecasting
> Foundations
* Time Series Analysis
* Time Series Decomposition
* Trend Analysis
* Seasonality
* Stationarity
* Differencing
* Autocorrelation
* Partial Autocorrelation
> Smoothing and ARIMA models
* Moving Averages
* Exponential Smoothing
* AR Models
* MA Models
* ARMA Models
* ARIMA Models
* SARIMA Models
> Multivariate and state-space models
* Multivariate Time Series
* Vector Autoregression (VAR)
* Vector Error Correction Models
* State-Space Models
* Kalman Filters
* Hidden Markov Models
* Functional Time Series
> Volatility and change
* ARCH Models
* GARCH Models
* Volatility Modelling
* Change-Point Detection
* Structural Break Analysis
* Spectral Analysis
* Frequency-Domain Analysis
> Forecasting in practice
* Forecast Evaluation
* Prediction Intervals
* Probabilistic Forecasting
* Intermittent Demand Forecasting
* Causal Forecasting

23. Information Theory and Signal Processing
> Information theory
* Information Theory
* Entropy
* Conditional Entropy
* Mutual Information
* Kullback–Leibler Divergence
* Cross-Entropy
* Fisher Information
* Minimum Description Length
* Shannon's Theorems
> Coding
* Compression Theory
* Source Coding
* Channel Coding
* Error-Correcting Codes
> Signal processing
* Signal Processing Mathematics
* Convolution
* Correlation Functions
* Sampling Theory (Signals)
* Nyquist–Shannon Sampling Theorem
* Digital Signal Processing
* Filtering Theory
* Spectral Estimation
* Wavelet Analysis
* Image Processing Mathematics
* Statistical Signal Processing

24. Mathematics for Machine Learning and AI
> Foundations
* Mathematics for Machine Learning
* Statistical Learning Theory
* Linear Models
* Optimisation Algorithms
* Stochastic Gradient Descent
* Backpropagation Mathematics
> Probabilistic models
* Probability Models
* Bayesian Learning
* Bayesian Networks
* Probabilistic Graphical Models
* Markov Models
* Gaussian Processes
* Uncertainty Estimation
* Conformal Prediction
> Classical methods
* Kernel Methods
* Support Vector Machines
* Decision Trees
* Ensemble Learning Mathematics
* Random Forest Theory
* Boosting Theory
* Clustering Mathematics
* Dimensionality Reduction
* Manifold Learning
> Deep learning
* Neural Network Theory
* Deep Learning Mathematics
* Representation Learning
* Attention Mechanisms
* Transformer Mathematics
* Information-Theoretic Learning
> Learning to act, and explaining
* Reinforcement Learning
* Bellman Equations
* Policy Optimisation
* Multi-Armed Bandits
* Causal Machine Learning
* Explainable AI Mathematics

25. Control Theory and Systems
> Systems
* Control Theory
* Linear Systems
* Nonlinear Systems
* State-Space Representation
* Transfer Functions
* Hybrid Systems
* Switched Systems
> Feedback and stability
* Open-Loop Control
* Closed-Loop Control
* Feedback Control
* PID Control
* Stability Theory
* Lyapunov Stability
* Controllability
* Observability
> Frequency methods
* Frequency Response
* Bode Plots
* Nyquist Stability Criterion
* Root Locus
> Advanced control
* State Estimation
* Kalman Filtering
* System Identification
* Linear Quadratic Regulation
* Model Predictive Control
* Robust Control
* Adaptive Control
* Stochastic Control
* Nonlinear Control
* Distributed Control
* Networked Control Systems

26. Mathematical Reasoning and Research Methods
> Reasoning
* Mathematical Reasoning
* Mathematical Proofs
* Deductive Reasoning
* Inductive Reasoning
* Abstract Reasoning
* Quantitative Reasoning
* Problem Solving
> Approximation and uncertainty
* Estimation
* Approximation
* Error Propagation
> Research practice
* Research Methodology
* Literature Review
* Hypothesis Formulation
* Model Validation
* Model Verification
* Computational Experiments
* Reproducible Research
* Mathematical Visualisation
> Communication
* Mathematical Communication
* Mathematical Writing
* Scientific Reporting

27. Mathematical Software and Tools
> Computer algebra and notebooks
* Mathematica
* Wolfram Language
* Wolfram Alpha
* Mathematica Notebooks
* Maple
* Maxima
* SageMath
* Jupyter Notebook
> Numerical and scientific programming
* MATLAB
* GNU Octave
* Julia
* Python for Mathematics
* NumPy
* SciPy
* SymPy
* JAX
> Statistics and data
* R
* RStudio
* pandas
* statsmodels
* scikit-learn
* SPSS
* SAS
* Stata
* Minitab
* Stan
* PyMC
* BUGS
> Machine learning frameworks
* PyTorch
* TensorFlow
> Spreadsheets and visual tools
* Excel
* Solver in Excel
* Spreadsheet Calculations
* GeoGebra
* Desmos
> Typesetting
* LaTeX
* MathJax
> Specialist systems
* GAP
* Magma
* PARI/GP
* FEniCS
* COMSOL Multiphysics
* ANSYS
* OpenFOAM
* MapleSim
* Simulink
> Optimisation solvers
* Gurobi
* IBM ILOG CPLEX
* OR-Tools
* CVXPY

28. School and Examination Mathematics
> Qualifications
* Primary Mathematics
* Functional Skills Mathematics
* Foundation Mathematics
* GCSE Mathematics
* Core Mathematics
* A-Level Mathematics
* Pure Mathematics
* Mechanics
* Statistics (A level)
* Further Mathematics
* International Baccalaureate Mathematics
* University Entrance Mathematics
* SAT Mathematics
* ACT Mathematics
* GRE Quantitative Reasoning
> Exam skills
* Word Problems
* Graph Interpretation
* Percentages and Interest
* Speed, Distance and Time
* Probability Problems
* Mathematical Problem Solving
* Exam Techniques
* Mental Arithmetic
* Calculator Skills
* Estimation and Checking

29. Everyday and Practical Mathematics
> Money
* Financial Literacy
* Personal Budgeting
* Household Budgeting
* Tax Calculations
* VAT Calculations
* Discounts
* Profit and Loss
* Currency Conversion
* Currency and Exchange Rates
* Percent Change
* Compound Growth
* Inflation Calculations
* Loan Repayments
* Mortgage Calculations
* Investment Returns
> Measures and time
* Measurement
* Unit Conversion
* Time Calculations
* Speed and Distance
* Ratios in Recipes
* Scaling and Proportions
* Area and Volume Calculations
* Construction Mathematics
* Surveying Mathematics
> Data and risk
* Reading Graphs
* Reading Tables
* Risk and Probability
* Estimation and Mental Maths
`;

export const TRACKS = [
  { name: "Foundations", units: [1, 3, 5, 6, 28, 29], from: "#70a7dc", to: "#7ee0ff" },
  { name: "Calculus and analysis", units: [7, 8, 9, 10], from: "#6a60ff", to: "#b38cff" },
  { name: "Algebra and structure", units: [2, 4, 11, 16, 17], from: "#f055dd", to: "#ff8ac1" },
  { name: "Probability and statistics", units: [12, 13, 22], from: "#16c784", to: "#7ee0ff" },
  { name: "Discrete maths and computing", units: [14, 15, 19, 23, 27], from: "#ffc002", to: "#ff8a3d" },
  { name: "Applied mathematics", units: [18, 20, 21, 24, 25], from: "#ff3d6e", to: "#ff9f40" },
  { name: "Reasoning and research", units: [26], from: "#0aa4c9", to: "#40d4b1" },
];

// Paths list schools in study order. `select` limits a shared school to the modules that pathway needs
// (by module title); schools not in `select` are taken whole.
export const PATHS = [
  { id: "everyday", name: "Everyday maths and Functional Skills", sub: "Money, measures, time, data and risk, with the number skills behind them: for adult learners, Functional Skills and anyone rebuilding confidence.", units: [29, 1, 28],
    select: { 1: ["Number systems", "Factors and primes", "Fractions, decimals and percentages", "Accuracy and estimation"], 28: ["Exam skills"] } },
  { id: "gcse", name: "GCSE Mathematics", sub: "Number, algebra, ratio, geometry and measures, probability and statistics, with exam technique: Foundation and Higher tier.", units: [1, 3, 5, 6, 12, 13, 28],
    select: { 3: ["Foundations", "Equations and inequalities", "Surds, exponentials and logarithms", "Functions"], 5: ["Euclidean geometry", "Measurement", "Transformations and symmetry", "Coordinate and vector geometry"], 6: ["Foundations", "Triangles"], 12: ["Foundations of probability"], 13: ["Descriptive statistics"], 28: ["Exam skills"] } },
  { id: "a-level", name: "A level Mathematics", sub: "Proof, algebra and functions, coordinate geometry, sequences, trigonometry, exponentials and logarithms, calculus, vectors, numerical methods, statistics and mechanics.", units: [16, 3, 6, 7, 11, 19, 12, 13, 20, 28],
    select: { 16: ["Proof"], 6: ["Foundations", "Triangles", "Functions and graphs", "Identities and equations"], 7: ["Limits and continuity", "Differentiation", "Applications of differentiation", "Integration", "Sequences and series"], 11: ["Vectors and vector spaces"], 19: ["Roots and interpolation"], 12: ["Foundations of probability", "Random variables", "Discrete distributions", "Continuous distributions"], 13: ["Sampling and estimation", "Hypothesis testing", "Regression and models"], 20: ["Physics and engineering"], 28: ["Qualifications", "Exam skills"] } },
  { id: "further", name: "A level Further Mathematics", sub: "Complex numbers, matrices, proof by induction, further calculus and vectors, polar coordinates, hyperbolic functions, differential equations and further statistics.", units: [3, 11, 16, 6, 7, 8, 10, 12, 14],
    select: { 3: ["Polynomials", "Further algebra"], 11: ["Matrices", "Linear maps", "Eigenvalues and diagonalisation"], 16: ["Proof"], 6: ["Hyperbolic functions and Fourier series"], 10: ["Ordinary differential equations"], 12: ["Random variables", "Discrete distributions", "Continuous distributions"], 14: ["Counting"] } },
  { id: "university-1", name: "University mathematics: first year", sub: "The bridge to degree-level maths: proof and logic, sets, calculus and analysis, linear algebra, differential equations, probability and an introduction to groups.", units: [16, 7, 9, 11, 10, 12, 4],
    select: { 16: ["Sets", "Relations and orders", "Logic", "Proof"], 9: ["Real and complex analysis"], 10: ["Ordinary differential equations"], 4: ["Groups"] } },
  { id: "pure", name: "Pure mathematics: degree and beyond", sub: "Abstract algebra, analysis, topology, number theory, geometry, logic and foundations.", units: [4, 9, 17, 2, 5, 16] },
  { id: "applied", name: "Applied mathematics and engineering", sub: "Calculus, vector calculus, differential equations, linear algebra, numerical methods, modelling and control.", units: [7, 8, 10, 11, 19, 20, 25, 18] },
  { id: "data-science", name: "Mathematics for data science and AI", sub: "Linear algebra, probability, statistics, optimisation, time series, information theory and the mathematics of machine learning, with the software to apply it.", units: [11, 12, 13, 18, 22, 23, 24, 27],
    select: { 18: ["Optimisation", "Algorithms"], 27: ["Numerical and scientific programming", "Statistics and data", "Machine learning frameworks"] } },
  { id: "finance", name: "Financial and actuarial mathematics", sub: "Interest and valuation, probability and statistics, stochastic models, risk, time series and optimisation.", units: [21, 12, 13, 22, 18],
    select: { 18: ["Optimisation", "Linear and integer programming"] } },
  { id: "discrete", name: "Discrete mathematics and computer science", sub: "Logic, sets and proof, combinatorics, graphs and networks, number theory and cryptography, information and coding.", units: [16, 14, 15, 2, 23] },
  { id: "entrance", name: "University entrance tests (MAT, TMUA, STEP)", sub: "Problem solving and proof on top of A level content, for Oxford, Cambridge and other competitive courses.", units: [26, 16, 3, 7, 14, 28],
    select: { 16: ["Logic", "Proof"], 7: ["Differentiation", "Applications of differentiation", "Integration", "Sequences and series"], 28: ["Exam skills"] } },
];

// the syllabus as schools, modules and lessons; lesson ids are u01-01 style
export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
