// School 27: Mathematical Software and Tools. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Computer algebra, numerical programming, statistics, machine learning, spreadsheets, typesetting, specialist systems and solvers.
// Product details change between versions: check the vendor's current documentation before relying on any specific feature.
export default `
## Mathematica
S: Mathematica is a commercial technical computing system from Wolfram Research, first released in 1988. It combines symbolic algebra, numerical computation, visualisation and a huge built-in library in one notebook environment, and it's widely used in research, engineering and teaching.
O: Describe what Mathematica does and where it's used
O: Recognise its symbolic, numerical and visual capabilities
T: Computer algebra system | Software that manipulates mathematical expressions exactly, such as expanding, factorising, differentiating and integrating
T: Exact versus numerical evaluation | Keeping results as exact symbols (√2, π) or converting them to floating-point approximations with N[]
H: Capabilities
- Symbolic: Simplify, Factor, Solve, D (derivatives), Integrate, Series.
- Numerical: NSolve, NIntegrate, NDSolve, arbitrary-precision arithmetic.
- Visualisation: Plot, Plot3D, ListPlot, Manipulate for interactive sliders.
- Large curated data and specialised functions (number theory, graphs, image processing).
H: Working style
- Code in the Wolfram Language inside notebooks.
- Exact results by default; N[expr, digits] for numbers.
- Functions are capitalised with square brackets: Sin[x], not sin(x).
- Documentation centre with worked examples for each function.
H: Use and cautions
- Research, engineering, finance and education.
- Proprietary and licensed; some institutions provide site licences.
- Check symbolic results (branch cuts, assumptions on variables).
- Use Assumptions → x > 0 when simplifying expressions like √(x^{2}).
X: Solve x^{2} − 2 = 0 exactly and numerically in Mathematica.
> Solve[x^2 - 2 == 0, x] returns {{x -> -Sqrt[2]}, {x -> Sqrt[2]}}, exact roots
> N[Sqrt[2], 10] gives 1.414213562
> NSolve gives the decimals directly; Solve keeps exact forms
K: Mathematica is a commercial system for symbolic, numerical and visual mathematics in notebooks; it returns exact results by default; assumptions and checks matter for symbolic answers.
!: Expecting Simplify[Sqrt[x^2]] to return x without stating that x is positive.
Q: Who makes Mathematica? | Wolfram Research.
Q: How do you get a numerical value of π to 20 digits? | N[Pi, 20].
SUM: Symbolic, numeric and visual in one system.
SUM: Exact by default; check assumptions.
SRC: Wolfram Research, Wolfram Mathematica documentation | primary | 2025 | https://reference.wolfram.com/language/
SRC: Wolfram S, The Mathematica Book (5th edn, Wolfram Media 2003) | textbook | 2003 | https://www.wolfram-media.com/
NUM1#maths-u27-01-q1@1: Mathematica's Expand[(x + 1)^3] returns a polynomial. What is the coefficient of x^{2}? | 3 | 0 |  | (x + 1)^{3} = x^{3} + 3x^{2} + 3x + 1, so the coefficient is 3.
M1#maths-u27-01-q2@1: How does Mathematica write the sine of x? | Sin[x] | sin(x) | SIN x | sine{x} | math.sin(x) | Built-in functions are capitalised and take square brackets.
M3#maths-u27-01-q3@2: Why might Simplify[Sqrt[x^2]] not return x? | For general complex or negative x, √(x^{2}) isn't x, so an assumption like x > 0 is needed | Mathematica can't simplify square roots of symbolic expressions at all | Simplify only works on explicit numbers, never on symbols like x | It always returns x, since squaring and rooting cancel exactly | It returns an error because x hasn't been given a numerical value | Without assumptions the system must keep results valid for all x.

## Wolfram Language
S: The Wolfram Language is the programming language behind Mathematica, Wolfram|Alpha and the Wolfram Cloud. Everything is a symbolic expression, and its pattern matching, rules and functional style make it unusually concise for mathematical work.
O: Read basic Wolfram Language syntax: expressions, rules and patterns
O: Use functional constructs such as Map, Table and pure functions
T: Expression | The universal data structure head[arg₁, arg₂, …]; for example x + y is Plus[x, y]
T: Replacement rule | lhs -> rhs, applied with /. to substitute values or transform expressions
H: Core ideas
- Everything is an expression; FullForm shows the internal structure.
- Lists in curly braces {1, 2, 3}; indexing with [[ ]] starting at 1.
- Assignment = (immediate) versus := (delayed).
- Patterns: f[x_] := x^2 defines a function for any argument.
H: Functional style
- Map: f /@ {1, 2, 3} gives {f[1], f[2], f[3]}.
- Pure functions: #^2 & /@ {1, 2, 3} gives {1, 4, 9}.
- Table[i^2, {i, 1, 5}] builds lists.
- Apply, Fold, Nest for repeated operations.
H: Rules and transformations
- x^2 + 1 /. x -> 3 gives 10.
- Rules return results without changing definitions.
- ReplaceAll and pattern-based rewriting.
- Associations for key–value data.
X: Square each element of {1, 2, 3, 4} and keep only the even results.
> Map a pure function: #^2 & /@ {1, 2, 3, 4} gives {1, 4, 9, 16}
> Select[{1, 4, 9, 16}, EvenQ] gives {4, 16}
> Combined: Select[#^2 & /@ Range[4], EvenQ], with no explicit loop
K: The Wolfram Language treats everything as symbolic expressions; patterns define functions; rules substitute values; functional constructs like Map and pure functions make code concise.
!: Using = when a delayed definition := is needed, so the right-hand side is evaluated too early.
Q: What does f /@ {a, b} return? | {f[a], f[b]}.
Q: What index does the first element of a Wolfram Language list have? | 1.
SUM: Everything is an expression.
SUM: Patterns and rules transform them.
SRC: Wolfram S, An Elementary Introduction to the Wolfram Language (3rd edn, Wolfram Media 2023) | textbook | 2023 | https://www.wolfram.com/language/elementary-introduction/
SRC: Wolfram Research, Wolfram Language documentation | primary | 2025 | https://reference.wolfram.com/language/
NUM1#maths-u27-02-q1@1: What does x^2 + 1 /. x -> 4 evaluate to? | 17 | 0 |  | Substituting x = 4 gives 16 + 1 = 17.
M1#maths-u27-02-q2@1: What does Table[i^2, {i, 1, 4}] return? | {1, 4, 9, 16} | {0, 1, 4, 9} | {2, 4, 6, 8} | 30 | {1, 2, 3, 4} | i runs from 1 to 4 and each value is squared.
M2#maths-u27-02-q3@2: What is the difference between f[x_] = Random[] and f[x_] := Random[]? | With = the random value is computed once and reused; with := it's recomputed at every call | They're identical, since both define f with a pattern argument | Using := is a syntax error when the right side has no x | With = the value is recomputed each call; with := it's fixed | Neither defines a function, since Random[] takes no argument | Immediate assignment evaluates the right side once; delayed assignment evaluates it each time.

## Wolfram Alpha
S: Wolfram|Alpha, launched in 2009, is a computational knowledge engine that answers questions typed in plain language by computing results rather than searching web pages. It solves equations, plots functions, gives step-by-step solutions and draws on curated data.
O: Use Wolfram|Alpha for computation and checking
O: Recognise its strengths and limits as a learning tool
T: Computational knowledge engine | A system that interprets queries and computes answers from algorithms and curated data
T: Step-by-step solution | A worked derivation showing intermediate steps (a Pro feature for many problem types)
H: What it does
- Algebra and calculus: "solve x^2 − 5x + 6 = 0", "integrate x e^x".
- Plots and properties of functions.
- Unit conversions and physical constants.
- Data: statistics, finance, geography, chemistry.
H: Using it well
- Phrase queries clearly; check its interpretation shown at the top.
- Use standard notation or Wolfram Language input.
- Verify results independently for important work.
- Cite it if used in published work.
H: Learning and integrity
- Useful for checking answers and exploring.
- Step-by-step solutions can short-cut learning if overused.
- Follow course rules on calculator and AI tool use.
- It powers parts of other assistants through its API.
X: Use Wolfram|Alpha to check a derivative you worked out by hand.
> Type "derivative of x^2 sin x"
> It returns 2x sin x + x^{2} cos x, matching the product rule
> Check the interpretation line shows d/dx(x^{2} sin x), not something else
K: Wolfram|Alpha computes answers from natural-language queries using algorithms and curated data; check its interpretation; use it to check and explore rather than replace understanding.
!: Accepting an answer without checking how Wolfram|Alpha interpreted the query.
Q: When was Wolfram|Alpha launched? | 2009.
Q: What should you check first in a Wolfram|Alpha result? | Its interpretation of your input.
SUM: Ask in plain language, get computed answers.
SUM: Check the interpretation.
SRC: Wolfram Alpha LLC, Wolfram|Alpha: computational intelligence | primary | 2025 | https://www.wolframalpha.com/
SRC: Wolfram Research, Wolfram|Alpha Webservice API documentation | primary | 2025 | https://products.wolframalpha.com/api/
NUM1#maths-u27-03-q1@1: Wolfram|Alpha solves x^2 − 5x + 6 = 0. What is the sum of the solutions? | 5 | 0 |  | The roots are 2 and 3, summing to 5.
M1#maths-u27-03-q2@1: How does Wolfram|Alpha differ from a web search engine? | It computes answers from algorithms and curated data rather than listing web pages | It only lists web pages ranked by how popular they are | It can't do any mathematics, only look up facts | It needs users to write code in a programming language | It stores users' files and searches within them | It's a computational engine, not an index of documents.
M2#maths-u27-03-q3@2: Why should students use step-by-step solutions sparingly? | Relying on them can skip the effort that builds understanding and may break assessment rules | Step-by-step solutions are always wrong, so they mislead students | They hide the final answer, so students can't check their work | They're unavailable for every problem type in the service | There's no reason; using them for every problem is ideal practice | Checking work is useful; copying steps undermines learning.

## Mathematica Notebooks
S: Mathematica notebooks are interactive documents that mix input code, output results, text and graphics in cells. They support exploration, teaching and reproducible reports, and they can be shared as files, PDFs or in the Wolfram Cloud.
O: Navigate notebook cells, evaluation and kernels
O: Organise notebooks for clarity and reproducibility
T: Cell | A unit of a notebook holding input, output, text or graphics; input cells are evaluated with Shift+Enter
T: Kernel | The computation engine that evaluates notebook inputs and keeps the current definitions in memory
H: Structure
- Input and output cells numbered In[n] and Out[n].
- Text, section and title cells for documentation.
- Graphics and dynamic interactive content (Manipulate).
- Notebooks are saved as .nb files.
H: Evaluation and state
- The kernel remembers definitions from earlier cells.
- Evaluating cells out of order can leave confusing state.
- Quit the kernel and re-evaluate all to check reproducibility.
- Clear[] removes definitions.
H: Sharing
- Export to PDF or HTML.
- Wolfram Cloud and Wolfram Player for viewing.
- Computable Document Format (CDF) for interactive content.
- Version control works better with plain-text .wl package files.
X: A notebook defines f[x_] := x^2 in one cell and evaluates f[3] in another. What happens after Quit[]?
> Before quitting, f[3] returns 9 from the kernel's stored definition
> After Quit[], the kernel forgets f, so f[3] returns unevaluated
> Re-evaluating the notebook from the top restores the definition
K: Notebooks combine code, results, text and graphics in cells; the kernel holds state, so re-evaluating from scratch checks reproducibility; export and cloud options share work.
!: Relying on definitions from cells that were deleted or evaluated out of order.
Q: Which keys evaluate an input cell? | Shift+Enter.
Q: What file extension do Mathematica notebooks use? | .nb.
SUM: Cells mix code, output and explanation.
SUM: Restart the kernel to check reproducibility.
SRC: Wolfram Research, Notebooks and documents (Wolfram Language documentation) | primary | 2025 | https://reference.wolfram.com/language/guide/NotebookBasics.html
SRC: Wolfram S, An Elementary Introduction to the Wolfram Language (3rd edn, Wolfram Media 2023) | textbook | 2023 | https://www.wolfram.com/language/elementary-introduction/
NUM1#maths-u27-04-q1@1: A notebook evaluates In[1] := a = 3 and then In[2] := a^2 + a. What is Out[2]? | 12 | 0 |  | 3^{2} + 3 = 12, using the kernel's stored value of a.
M1#maths-u27-04-q2@1: What stores the definitions made in a notebook session? | The kernel | The front end's text cells | The file name | The output cells only | The operating system | The kernel performs evaluations and holds definitions in memory.
M3#maths-u27-04-q3@2: Why should you quit the kernel and re-evaluate the whole notebook before sharing it? | It confirms the results don't depend on hidden state from deleted or out-of-order cells | It makes the notebook file much smaller for emailing | It deletes all outputs permanently from the notebook | It changes the results randomly to test robustness | There's no need, since notebooks always rerun identically | Others will run the notebook from scratch, so it must work that way.

## Maple
S: Maple is a commercial computer algebra system from Maplesoft, originating at the University of Waterloo in the early 1980s. It's known for strong symbolic computation, a math-friendly document interface and wide use in teaching engineering and mathematics.
O: Describe Maple's symbolic and numerical capabilities
O: Use basic Maple syntax for solving and calculus
T: Worksheet | A Maple document containing commands, results and text, in document or worksheet mode
T: evalf | Maple's command for evaluating an expression to floating-point, such as evalf(Pi, 20)
H: Capabilities
- Symbolic: solve, factor, simplify, diff, int, dsolve for ODEs.
- Numerical: fsolve, numerical ODEs, linear algebra packages.
- Plotting in 2D and 3D, animations.
- Packages: LinearAlgebra, Statistics, plots.
H: Syntax basics
- Statements end with ; (show output) or : (suppress).
- Assignment with :=.
- diff(x^3, x) gives 3x^{2}; int(x, x = 0 .. 1) gives 1/2.
- Lists [ ] and sets { }.
H: Use and cautions
- Teaching, engineering and research.
- Related product MapleSim for physical modelling.
- Proprietary licensing.
- Check assumptions with assume() for symbolic results.
X: Solve x^{2} − 5x + 6 = 0 and differentiate x^{3} in Maple.
> solve(x^2 - 5*x + 6 = 0, x); returns 2, 3
> diff(x^3, x); returns 3x^{2}
> evalf(sqrt(2), 10); gives 1.414213562
K: Maple is a commercial CAS with strong symbolic tools, document-style worksheets and packages; := assigns, evalf gives decimals; assumptions matter for symbolic answers.
!: Using = instead of := for assignment in Maple.
Q: What Maple command evaluates numerically? | evalf.
Q: What does int(x, x = 0 .. 1) return? | 1/2.
SUM: Strong symbolic algebra in worksheets.
SUM: := assigns; evalf gives numbers.
SRC: Maplesoft, Maple online help | primary | 2025 | https://www.maplesoft.com/support/help/
SRC: Char BW et al., Maple V Language Reference Manual (Springer 1991) | textbook | 1991 | https://link.springer.com/
NUM1#maths-u27-05-q1@1: In Maple, diff(x^4, x) returns ax^{3}. What is a? | 4 | 0 |  | The derivative of x^{4} is 4x^{3}.
M1#maths-u27-05-q2@1: Which Maple statement assigns 5 to a? | a := 5; | a = 5; | let a be 5 | 5 -> a | a == 5 | Maple uses := for assignment; = forms an equation.
M2#maths-u27-05-q3@2: Why does Maple distinguish ending a statement with ; and :? | A semicolon shows the result; a colon hides it, handy for long outputs | They are identical, since both end a statement the same way | A colon causes an error unless the statement is an assignment | Only semicolons are allowed in Maple worksheets | Colons assign values, while semicolons compare them | Suppressing output keeps worksheets readable.

## Maxima
S: Maxima is a free, open-source computer algebra system descended from Macsyma, developed at MIT from the late 1960s. Written in Lisp, it handles symbolic algebra and calculus and is available with graphical front ends such as wxMaxima.
O: Use basic Maxima commands for algebra and calculus
O: Compare free and commercial CAS options
T: Macsyma | An early computer algebra system developed at MIT in the 1960s–70s, ancestor of Maxima
T: wxMaxima | A graphical notebook-style interface for Maxima
H: Capabilities
- expand, factor, ratsimp, solve.
- diff, integrate, limit, taylor.
- Matrices and linear algebra.
- Plotting via gnuplot.
H: Syntax basics
- Statements end with ; or $ (suppress output).
- Assignment with :; function definition with :=.
- %pi, %e and %i for constants.
- float() gives decimals.
H: Place among tools
- Free and open source (GPL).
- Lighter than Mathematica or Maple, good for teaching.
- Used inside SageMath for some symbolic tasks.
- Active community maintenance since 1998.
X: Expand (x + 1)^{3}, differentiate it and evaluate at x = 2 in Maxima.
> expand((x+1)^3); gives x^3 + 3*x^2 + 3*x + 1
> diff(%, x); gives 3*x^2 + 6*x + 3, where % means the previous result
> subst(2, x, %); gives 12 + 12 + 3 = 27
> float(%pi); gives 3.141592653589793 for comparison
K: Maxima is a free CAS descended from MIT's Macsyma; it uses : for assignment and := for functions; wxMaxima gives a notebook interface; it underpins parts of SageMath.
!: Writing pi instead of %pi, which Maxima treats as an unknown symbol.
Q: What system is Maxima descended from? | Macsyma, developed at MIT.
Q: How is π written in Maxima? | %pi.
SUM: Free symbolic algebra.
SUM: Constants use % prefixes.
SRC: Maxima project, Maxima reference manual | primary | 2025 | https://maxima.sourceforge.io/docs/manual/
SRC: Moses J, Macsyma: a personal history, Journal of Symbolic Computation 47(2), 123 | journal | 2012 | https://doi.org/10.1016/j.jsc.2010.08.018
NUM1#maths-u27-06-q1@1: In Maxima, integrate(2*x, x, 0, 3) gives what value? | 9 | 0 |  | ∫₀^{3} 2x dx = [x^{2}]₀^{3} = 9.
M1#maths-u27-06-q2@1: Which Maxima statement defines a function f(x) = x^{2}? | f(x) := x^2; | f(x) = x^2; | f: x^2 | def f(x): x^2 | f[x_] := x^2 | In Maxima, := defines a function, so f(x) := x^2; makes f(3) return 9; a single colon assigns a value instead.
M2#maths-u27-06-q3@2: Why do some teachers prefer Maxima for courses? | It's free and open source, so every student can install it without licences | It's faster than every commercial system for all problems | It has no syntax, so students needn't learn commands | It only works online, so nothing needs installing | There's no reason; teachers always prefer commercial tools | Cost and access matter when students need their own copies.

## SageMath
S: SageMath is a free, open-source mathematics system started by William Stein in 2005. It combines many existing packages, such as Maxima, GAP, PARI and NumPy, behind a Python-based interface, aiming to be a viable alternative to commercial systems.
O: Describe SageMath's design as an integrating system
O: Use basic SageMath commands for algebra, number theory and plotting
T: Parent and element | Sage's way of tracking which structure a number belongs to, such as ZZ (integers), QQ (rationals) or GF(7)
T: Integrating system | Software that provides one interface to many specialised packages
H: Components
- Python syntax with mathematical extensions.
- Symbolic calculus (via Maxima and SymPy), group theory (GAP), number theory (PARI).
- Numerics (NumPy, SciPy), plotting (Matplotlib).
- Runs in Jupyter notebooks and CoCalc.
H: Examples
- factor(2^32 + 1) gives 641 × 6700417.
- R.<x> = QQ[] creates a polynomial ring.
- GF(7)(3)^{−1} computes inverses in finite fields.
- Elliptic curves, graphs, combinatorics.
H: Strengths and cautions
- Free and transparent: source code can be inspected.
- Strong in number theory, algebra and combinatorics.
- Installation can be heavy; cloud options help.
- Know which underlying package does a computation.
X: Factor 2^{32} + 1 and check primality of a factor in SageMath.
> factor(2^32 + 1) returns 641 * 6700417 (Euler's discovery about Fermat numbers)
> is_prime(641) returns True
> Sage's preparser turns ^ into exponentiation, unlike plain Python
K: SageMath unites many open-source maths packages under a Python interface; it tracks algebraic structures (parents); it's strong in algebra and number theory and free to inspect and use.
!: Using Python's ^ (bitwise XOR) when expecting exponentiation outside Sage's preparser.
Q: Who started SageMath? | William Stein (2005).
Q: What does factor(2^32 + 1) return? | 641 × 6700417.
SUM: One interface to many packages.
SUM: Free and open.
SRC: The Sage Developers, SageMath documentation | primary | 2025 | https://doc.sagemath.org/
SRC: Zimmermann P et al., Computational Mathematics with SageMath (SIAM 2018) | textbook | 2018 | https://epubs.siam.org/
NUM1#maths-u27-07-q1@1: In SageMath, what is the inverse of 3 in GF(7)? | 5 | 0 |  | 3 × 5 = 15 = 2 × 7 + 1, so 3^{−1} = 5 mod 7.
M1#maths-u27-07-q2@1: Which package does SageMath use for computational group theory? | GAP | MATLAB | Excel | Stata | SPSS | SageMath calls GAP for group computations.
M2#maths-u27-07-q3@2: Why does SageMath track parents such as ZZ, QQ and GF(p)? | The same symbol means different things in different rings, like 1/3 in GF(7) | Parents only affect how results are printed on screen | All numbers are stored as floats, so parents are labels | It doesn't track them; every number is treated the same | Parents slow everything down without changing any results | Correct arithmetic depends on which ring the elements live in.

## Jupyter Notebook
S: Jupyter notebooks are web-based documents that combine live code, results, equations, text and plots. Grown from IPython in 2014, they support many languages (Julia, Python and R gave the name) and have become standard for data science, teaching and reproducible analysis.
O: Use notebook cells, kernels and Markdown with LaTeX
O: Apply good practice for reproducible notebooks
T: Kernel (Jupyter) | The process running code for a notebook in a particular language, such as Python or R
T: .ipynb | The notebook file format, a JSON document storing cells, outputs and metadata
H: Features
- Code cells and Markdown cells (with LaTeX maths via MathJax).
- Inline plots and rich output.
- Kernels for Python, R, Julia and many others.
- JupyterLab and JupyterHub for multiple users.
H: Pitfalls
- Hidden state from cells run out of order.
- Large outputs bloat files and version control diffs.
- Restart and run all before sharing.
- Tools: nbstripout, Jupytext for plain-text versions.
H: Uses
- Data analysis and visualisation.
- Teaching with executable examples.
- Reports and books (Jupyter Book).
- Cloud services: Google Colab, Binder.
X: A notebook cell sets x = 5, a later cell sets x = 10, and then the first result cell is re-run. What prints?
> Cells run in the order executed, not the order shown
> x now holds 10, so the re-run prints results based on 10
> Restart Kernel and Run All gives the top-to-bottom result
K: Jupyter notebooks mix code, text, maths and output; kernels run many languages; hidden state is the main pitfall; restart-and-run-all and clean version control keep them reproducible.
!: Sharing a notebook whose cells only work in the order you happened to run them.
Q: Which three languages inspired the name Jupyter? | Julia, Python and R.
Q: What format does a .ipynb file use? | JSON.
SUM: Live documents of code and explanation.
SUM: Restart and run all before sharing.
SRC: Kluyver T et al., Jupyter Notebooks: a publishing format for reproducible computational workflows, Positioning and Power in Academic Publishing, 87 | journal | 2016 | https://doi.org/10.3233/978-1-61499-649-1-87
SRC: Project Jupyter, Jupyter documentation | primary | 2025 | https://docs.jupyter.org/
NUM1#maths-u27-08-q1@1: A Markdown cell contains $x^2$ and $$\\int_0^1 x\\,dx$$. How many maths expressions will be rendered? | 2 | 0 |  | One inline expression and one display expression.
M1#maths-u27-08-q2@1: What does a Jupyter kernel do? | Runs the code in the notebook's language and keeps its state | Renders the Markdown cells into formatted text | Stores notebook files on the computer's disk | Formats LaTeX documents into PDFs for printing | Manages passwords for the notebook server | The kernel executes cells and holds variables.
M3#maths-u27-08-q3@2: Why can a notebook give different results when rerun from the top? | Cells may have been run out of order or edited, leaving hidden state that a fresh run doesn't recreate | Notebooks are always deterministic, so results never change on rerun | Kernels randomise outputs deliberately to test the code each time | Markdown cells change the code when the notebook is reopened | It can't; rerunning a notebook always reproduces earlier results | Restart-and-run-all exposes dependence on execution history.

## MATLAB
S: MATLAB, from MathWorks, is a commercial environment for numerical computing built around matrices; its name means "matrix laboratory". Cleve Moler created the original in the 1970s, and today it's widely used in engineering, control, signal processing and teaching.
O: Use MATLAB's matrix-oriented syntax and indexing
O: Describe toolboxes and good vectorised practice
T: Vectorisation | Writing operations on whole arrays instead of loops, such as y = x.^2
T: Element-wise operator | Operators with a dot, such as .* and .^, that act entry by entry rather than as matrix operations
H: Basics
- Everything is a matrix; scalars are 1 × 1.
- Indexing starts at 1: A(2, 3) is row 2, column 3.
- A * B is matrix multiplication; A .* B is element-wise.
- A \\ b solves linear systems.
H: Tools
- Toolboxes: Control System, Signal Processing, Optimization, Statistics.
- Plotting: plot, surf, contour.
- Live Scripts combine code and formatted text.
- Simulink for block-diagram modelling.
H: Practice
- Preallocate arrays; vectorise loops.
- Use functions and scripts in .m files.
- Avoid inv(A) * b; use A \\ b.
- Proprietary licences; Octave and Julia as alternatives.
X: Solve the system 2x + y = 5, x + 3y = 10 in MATLAB.
> A = [2 1; 1 3]; b = [5; 10];
> x = A \\ b returns [1; 3]
> Check: A*x reproduces b, confirming the solution
- The Command Window, Editor and Workspace panes organise interactive work.
K: MATLAB is a matrix-based numerical environment; indexing starts at 1; * is matrix multiplication and .* element-wise; A \\ b solves systems; toolboxes extend it.
!: Using * when element-wise multiplication .* was intended.
Q: What does MATLAB's name stand for? | Matrix laboratory.
Q: How should Ax = b be solved in MATLAB? | x = A \\ b.
SUM: Matrices are the core data type.
SUM: Vectorise and use backslash.
SRC: MathWorks, MATLAB documentation | primary | 2025 | https://www.mathworks.com/help/matlab/
SRC: Moler C, Numerical Computing with MATLAB (SIAM 2004) | textbook | 2004 | https://www.mathworks.com/moler/chapters.html
NUM1#maths-u27-09-q1@1: In MATLAB, x = [1 2 3]; what is sum(x.^2)? | 14 | 0 |  | Element-wise squares are 1, 4 and 9, which sum to 14.
M1#maths-u27-09-q2@1: What does A(2, 1) refer to in MATLAB? | The entry in row 2, column 1 | The entry in row 1, column 2 | The second element of a 0-based array | The whole second row | An error | MATLAB indexes rows then columns, starting at 1.
M3#maths-u27-09-q3@2: Why is x = A \\ b preferred to x = inv(A) * b? | Backslash uses a factorisation directly, which is faster and more accurate than forming the inverse | They're identical in speed and accuracy, so either can be used | inv is always more accurate, though backslash is slightly faster | Backslash only works for scalars, so inv is needed for matrices | It isn't preferred; MATLAB's documentation recommends inv(A) * b | Explicit inversion costs more and amplifies rounding error.

## GNU Octave
S: GNU Octave is a free, open-source numerical computing environment largely compatible with MATLAB. Started by John W. Eaton around 1988, it runs most MATLAB scripts and is popular in teaching and for users without MATLAB licences.
O: Use Octave for MATLAB-style numerical work
O: Recognise compatibility differences and extensions
T: MATLAB compatibility | Octave's aim of running MATLAB code with little or no change
T: Octave Forge packages | Community packages adding functionality such as signal processing and statistics
H: Using Octave
- Same matrix syntax, 1-based indexing, .m files.
- A \\ b, plot, functions and scripts work as in MATLAB.
- GUI and command-line interfaces.
- Packages via pkg install -forge name.
H: Differences
- Some toolboxes and Simulink aren't available.
- Extra syntax: comments with # as well as %, operators like +=.
- Performance differs for some operations.
- Graphics back ends differ in details.
H: Uses
- Teaching numerical methods.
- Running legacy MATLAB code freely.
- Batch scripts on servers.
- GPL licence: free to share and modify.
X: Run a MATLAB-style script in Octave to find the mean of squares of 1 to 4.
> x = 1:4; y = x.^2; gives [1 4 9 16]
> mean(y) returns 7.5
> The same lines run unchanged in MATLAB
- Octave scripts can be called from the shell for automated batch jobs.
- The Octave GUI shows variables, history and files like MATLAB's desktop.
K: Octave is a free MATLAB-compatible environment; most scripts run unchanged; some toolboxes and Simulink are missing; Octave adds conveniences such as # comments and +=.
!: Assuming every MATLAB toolbox function exists in Octave.
Q: Who started GNU Octave? | John W. Eaton.
Q: Which MATLAB product has no direct Octave equivalent? | Simulink.
SUM: Free MATLAB-style computing.
SUM: Check toolbox availability.
SRC: Eaton JW et al., GNU Octave manual | primary | 2025 | https://docs.octave.org/
SRC: Octave project, Differences between Octave and MATLAB (Octave wiki) | primary | 2025 | https://wiki.octave.org/Differences_between_Octave_and_Matlab
NUM1#maths-u27-10-q1@1: In Octave, x = 1:5; what is the value of x(end)? | 5 | 0 |  | 1:5 creates [1 2 3 4 5], and end indexes the last element.
M1#maths-u27-10-q2@1: Which comment syntax works in Octave but not in MATLAB? | # comment | % comment | %% section | a ; at the end | None | Octave accepts # as a comment character as well as %.
M2#maths-u27-10-q3@2: Why do universities often provide Octave alongside MATLAB? | It lets students run MATLAB-style code freely on their own machines | It's always faster than MATLAB for every program | It replaces every MATLAB toolbox and Simulink | MATLAB can't run on university computers | They never provide it alongside MATLAB | Free software avoids licence limits for personal use.

## Julia
S: Julia is a high-level, high-performance language for technical computing, publicly launched in 2012. It uses just-in-time compilation and multiple dispatch to give code that reads like Python or MATLAB but runs close to C speed, addressing the "two-language problem".
O: Describe Julia's design: JIT compilation, multiple dispatch and types
O: Write basic Julia code for numerical tasks
T: Multiple dispatch | Choosing which method of a function to run based on the types of all its arguments
T: Two-language problem | Prototyping in a slow, easy language and rewriting in a fast, hard one, which Julia aims to avoid
H: Design
- JIT compilation via LLVM.
- Multiple dispatch as the core paradigm.
- Optional type annotations; parametric types.
- 1-based indexing like MATLAB.
H: Basics
- f(x) = x^2 defines a function; broadcast with f.(v).
- Unicode identifiers: α = 0.5.
- Packages via Pkg: DifferentialEquations.jl, JuMP, Flux.
- REPL, Jupyter and VS Code.
H: Performance tips
- Put code in functions, not global scope.
- Keep types stable.
- First call includes compile time ("time to first plot").
- Use @time and BenchmarkTools to measure.
X: Define a function with multiple dispatch in Julia.
> area(r::Real) = π * r^2 for circles; area(w::Real, h::Real) = w * h for rectangles
> area(1) returns 3.14159…; area(2, 3) returns 6
> Julia picks the method from the number and types of arguments
K: Julia combines dynamic syntax with JIT-compiled speed through multiple dispatch; it's 1-based; broadcasting uses dots; performance needs functions and type stability; first calls include compilation.
!: Benchmarking Julia with the first call, which includes compilation time.
Q: What does f.(v) do in Julia? | Applies f element-wise to v (broadcasting).
Q: What is multiple dispatch? | Selecting a method by the types of all arguments.
SUM: Fast and expressive.
SUM: Dispatch on types.
SRC: Bezanson J, Edelman A, Karpinski S, Shah VB, Julia: a fresh approach to numerical computing, SIAM Review 59(1), 65 | journal | 2017 | https://doi.org/10.1137/141000671
SRC: The Julia Project, Julia documentation | primary | 2025 | https://docs.julialang.org/
NUM1#maths-u27-11-q1@1: In Julia, v = [1, 2, 3]; what is sum(v .^ 2)? | 14 | 0 |  | Broadcasting squares each entry: 1 + 4 + 9 = 14.
M1#maths-u27-11-q2@1: Which index does the first element of a Julia array have? | 1 | 0 | −1 | It depends on the type | 2 | Julia arrays are 1-based by default, like MATLAB and R, so v[1] is the first element (unlike Python's v[0]).
M3#maths-u27-11-q3@2: Why is the first call of a Julia function slower than later calls? | The function is compiled for the argument types on first use, and later calls reuse the compiled code | Julia interprets code from scratch on every single call | Later calls skip the computation and return cached answers | Memory is cleared after the first call, which slows it down | It isn't slower; every call of a Julia function takes equal time | JIT compilation happens once per method and type signature.

## Python for Mathematics
S: Python is a general-purpose language whose clear syntax and huge ecosystem make it a leading tool for mathematics, science and data. Core features such as arbitrary-precision integers and the fractions module, plus libraries like NumPy and SymPy, cover most mathematical needs.
O: Use core Python types for exact and approximate arithmetic
O: Recognise common pitfalls with floats, integer division and indexing
T: Arbitrary-precision integer | Python's int type, which grows as needed, so 2**100 is exact
T: Floor division | a // b, the largest integer not exceeding a/b; for negative numbers −7 // 2 = −4
H: Arithmetic
- int (exact, unbounded) and float (IEEE double).
- / is true division; // is floor division; % is remainder; ** is power.
- fractions.Fraction for exact rationals; decimal for decimal arithmetic.
- math and cmath modules for functions.
H: Pitfalls
- 0.1 + 0.2 == 0.3 is False; use math.isclose.
- ^ is bitwise XOR, not power.
- Indexing starts at 0; range(n) is 0 … n − 1.
- Mutable default arguments and aliasing of lists.
H: Ecosystem
- NumPy, SciPy, SymPy, pandas, Matplotlib.
- Jupyter notebooks.
- Virtual environments and pip or conda.
- Readability and testing (pytest).
X: Compute 2^{100} exactly and add 1/3 and 1/6 exactly in Python.
> 2**100 returns 1267650600228229401496703205376, an exact int
> from fractions import Fraction; Fraction(1, 3) + Fraction(1, 6) returns Fraction(1, 2)
> By contrast 1/3 + 1/6 as floats gives 0.5 only approximately
K: Python offers exact big integers, true and floor division and Fraction for rationals; floats need tolerance comparisons; ** is power; indexing is 0-based; libraries extend it for mathematics.
!: Writing 2^3 expecting 8 (it's bitwise XOR, giving 1).
Q: What does 7 // 2 give in Python? | 3.
Q: Is 0.1 + 0.2 == 0.3 True in Python? | No.
SUM: Exact integers, IEEE floats.
SUM: Know the operators.
SRC: Python Software Foundation, The Python Language Reference | primary | 2025 | https://docs.python.org/3/reference/
SRC: Python Software Foundation, fractions — Rational numbers | primary | 2025 | https://docs.python.org/3/library/fractions.html
NUM1#maths-u27-12-q1@1: In Python, what is len(range(3, 20, 4))? | 5 | 0 |  | The values are 3, 7, 11, 15 and 19.
M1#maths-u27-12-q2@1: What does −7 // 2 evaluate to in Python? | −4 | −3 | −3.5 | 3 | 4 | Floor division rounds down towards −∞, so −7/2 = −3.5 becomes −4, not −3.
M2#maths-u27-12-q3@2: Why does Fraction(1, 3) + Fraction(1, 6) give an exact answer? | Fractions store integer numerators and denominators, avoiding floating-point rounding | It uses higher-precision floats that hide the rounding | It rounds the result to ten decimal places | The result is approximate, like ordinary floats | It gives an error, since fractions can't be added | 1/3 + 1/6 = 1/2 exactly with rational arithmetic.

## NumPy
S: NumPy is Python's fundamental package for numerical arrays. Its n-dimensional array, vectorised operations and broadcasting rules make numerical code fast and concise, and almost every scientific Python library builds on it.
O: Create and manipulate NumPy arrays with vectorised operations
O: Apply broadcasting rules and avoid common pitfalls
T: ndarray | NumPy's n-dimensional array of elements of one data type, stored contiguously for fast computation
T: Broadcasting | Rules that let arrays of different shapes combine by stretching dimensions of size 1
H: Arrays
- np.array, np.zeros, np.arange, np.linspace.
- Shape, dtype and reshape.
- Indexing and slicing (0-based), boolean masks.
- Views versus copies: slices share memory.
H: Operations
- Element-wise arithmetic: a * b, a ** 2.
- Matrix multiplication: a @ b.
- Reductions: sum, mean, max with axis arguments.
- np.linalg for solve, eig, svd.
H: Broadcasting and speed
- Shapes are compared from the right; sizes must match or be 1.
- (3, 1) + (1, 4) gives (3, 4).
- Vectorised code avoids slow Python loops.
- Watch integer overflow in fixed-size dtypes.
X: Broadcast a column vector against a row vector to make a multiplication table.
> a = np.arange(1, 4).reshape(3, 1) has shape (3, 1); b = np.arange(1, 4) has shape (3,)
> a * b broadcasts to shape (3, 3): [[1, 2, 3], [2, 4, 6], [3, 6, 9]]
> No loops are needed
K: NumPy's ndarray enables fast vectorised numerics; @ multiplies matrices; broadcasting combines compatible shapes; slices are views; linalg provides core linear algebra.
!: Modifying a slice and being surprised that the original array changed.
Q: What operator multiplies matrices in NumPy? | @.
Q: What shape results from broadcasting (3, 1) with (1, 4)? | (3, 4).
SUM: Arrays make numerics fast.
SUM: Broadcasting combines shapes.
SRC: Harris CR et al., Array programming with NumPy, Nature 585, 357 | journal | 2020 | https://doi.org/10.1038/s41586-020-2649-2
SRC: NumPy Developers, NumPy documentation | primary | 2025 | https://numpy.org/doc/stable/
NUM1#maths-u27-13-q1@1: What is the size of np.linspace(0, 1, 11)? | 11 | 0 | elements | linspace includes both endpoints and returns the requested 11 points.
M1#maths-u27-13-q2@1: What does np.arange(0, 10, 3) return? | [0, 3, 6, 9] | [0, 3, 6, 9, 12] | [3, 6, 9] | [0, 10, 3] | [1, 4, 7, 10] | arange starts at 0 and steps by 3 but stops before the end value 10, giving 0, 3, 6 and 9.
M2#maths-u27-13-q3@2: Why are vectorised NumPy operations much faster than Python loops? | The loops run in compiled code over contiguous memory instead of interpreting each element in Python | Python loops are compiled too, so vectorisation adds only convenience | Vectorisation uses less accurate arithmetic, which saves time | They aren't faster; vectorised code only looks shorter on the page | NumPy skips elements it predicts won't change the result | Interpreter overhead per element disappears.

## SciPy
S: SciPy builds on NumPy with algorithms for integration, optimisation, interpolation, linear algebra, statistics and signal processing. It wraps decades-old, well-tested libraries such as LAPACK and QUADPACK in a convenient Python interface.
O: Use SciPy submodules for integration, optimisation and ODEs
O: Interpret solver outputs and tolerances
T: scipy.integrate | Routines such as quad for definite integrals and solve_ivp for ODE initial value problems
T: scipy.optimize | Routines such as minimize, root and curve_fit for optimisation, root-finding and fitting
H: Main submodules
- integrate: quad, solve_ivp.
- optimize: minimize, root_scalar, linprog, curve_fit.
- linalg, sparse, interpolate.
- stats, signal, fft, spatial.
H: Using results
- quad returns the integral and an error estimate.
- minimize returns an object with x, fun, success and message.
- Check success flags and tolerances.
- Choose methods (BFGS, Nelder–Mead, SLSQP) to suit the problem.
H: Practice
- Provide gradients when available.
- Scale variables.
- Prefer sparse matrices for large sparse systems.
- SciPy 1.0 (2017) after 16 years of development.
X: Find the minimum of f(x) = (x − 2)^{2} + 1 with SciPy.
> from scipy.optimize import minimize_scalar; res = minimize_scalar(lambda x: (x - 2)**2 + 1)
> res.x ≈ 2.0 and res.fun ≈ 1.0
> Check res.success before using the answer
K: SciPy provides integration, optimisation, linear algebra, statistics and signal tools on top of NumPy; results include error estimates and success flags; choose methods and tolerances carefully.
!: Using an optimiser's result without checking its success flag.
Q: What does scipy.integrate.quad return? | The integral value and an error estimate.
Q: Which SciPy function fits a model curve to data? | scipy.optimize.curve_fit.
SUM: Tested algorithms with a Python interface.
SUM: Check success flags.
SRC: Virtanen P et al., SciPy 1.0: fundamental algorithms for scientific computing in Python, Nature Methods 17, 261 | journal | 2020 | https://doi.org/10.1038/s41592-019-0686-2
SRC: SciPy Developers, SciPy documentation | primary | 2025 | https://docs.scipy.org/doc/scipy/
NUM1#maths-u27-14-q1@1: scipy.integrate.quad(lambda x: 3*x**2, 0, 2) returns an integral value of what? | 8 | 0.000001 |  | ∫₀^{2} 3x^{2} dx = [x^{3}]₀^{2} = 8.
M1#maths-u27-14-q2@1: Which SciPy function solves an ODE initial value problem? | scipy.integrate.solve_ivp | scipy.optimize.minimize | scipy.stats.norm | scipy.fft.fft | scipy.linalg.svd | solve_ivp integrates dy/dt = f(t, y) from initial conditions.
M2#maths-u27-14-q3@2: Why should you check result.success after scipy.optimize.minimize? | The routine may stop without converging, and the returned x may not be a minimum | The optimiser always converges, so the flag is decorative | Success means the global minimum has been found | The flag only reports how long the run took | There's no success flag in SciPy optimisation results | Iteration limits or poor conditioning can end the search early.

## SymPy
S: SymPy is a free computer algebra library written entirely in Python. It does symbolic algebra, calculus, equation solving and more inside ordinary Python code, and it can generate numerical functions and code from symbolic expressions.
O: Use SymPy to manipulate, differentiate and solve expressions
O: Convert symbolic results to fast numerical functions
T: Symbol | A SymPy object representing a mathematical variable, created with symbols('x y')
T: lambdify | A SymPy function that turns a symbolic expression into a fast numerical function using NumPy or similar
H: Basics
- x = symbols('x'); expressions like x**2 + 2*x + 1.
- simplify, expand, factor.
- diff, integrate, limit, series.
- solve and solveset for equations.
H: Exactness and assumptions
- Rational(1, 3) for exact fractions; integers stay exact.
- symbols('x', positive=True) adds assumptions.
- sqrt(x**2) simplifies to x only with positive x.
- evalf() for decimals.
H: Integration with numerics
- lambdify for vectorised evaluation.
- Code generation (C, Fortran).
- Pretty printing and LaTeX output with latex().
- Pure Python: slower than commercial systems for huge problems.
X: Differentiate and integrate x sin x symbolically in SymPy.
> x = symbols('x'); diff(x*sin(x), x) returns x*cos(x) + sin(x)
> integrate(x*sin(x), x) returns -x*cos(x) + sin(x)
> Differentiating the result gives back x sin x, a quick check
K: SymPy does symbolic mathematics in Python with exact numbers and assumptions; diff, integrate and solve cover calculus and algebra; lambdify and code generation bridge to numerics.
!: Writing 1/3 in SymPy expressions, which Python evaluates as a float before SymPy sees it.
Q: How do you create a symbol x in SymPy? | x = symbols('x').
Q: What does lambdify do? | Converts a symbolic expression into a numerical function.
SUM: Symbolic maths in plain Python.
SUM: Use Rational for exact fractions.
SRC: Meurer A et al., SymPy: symbolic computing in Python, PeerJ Computer Science 3, e103 | journal | 2017 | https://doi.org/10.7717/peerj-cs.103
SRC: SymPy Development Team, SymPy documentation | primary | 2025 | https://docs.sympy.org/
NUM1#maths-u27-15-q1@1: SymPy's integrate(x**3, (x, 0, 2)) returns what value? | 4 | 0 |  | ∫₀^{2} x^{3} dx = 2^{4}/4 = 4.
M1#maths-u27-15-q2@1: What does factor(x**2 − 5*x + 6) return in SymPy? | (x − 3)*(x − 2) | x**2 − 5*x + 6 | (x + 2)*(x + 3) | x − 5 | 6 | The roots of x^{2} − 5x + 6 are 2 and 3, so SymPy factors it as (x − 3)(x − 2).
M3#maths-u27-15-q3@2: Why does sqrt(x**2) not simplify to x for a plain SymPy symbol? | Without assumptions x could be negative or complex, where √(x^{2}) ≠ x | SymPy can't take square roots of symbols at all | It always simplifies to x in SymPy | It returns an error for undefined symbols | It returns −x unless x is declared negative | Declaring x positive allows the simplification.

## JAX
S: JAX is a Google library that combines a NumPy-like interface with automatic differentiation and compilation to accelerators. Its composable transformations, grad, jit and vmap, make it popular for machine learning research and scientific computing.
O: Use grad, jit and vmap transformations
O: Explain JAX's functional style and its constraints
T: grad | A JAX transformation returning a function that computes the gradient of a scalar function
T: jit | Just-in-time compilation of a function with XLA for fast execution on CPUs, GPUs and TPUs
H: Transformations
- grad(f): derivatives by reverse-mode autodiff.
- jit(f): compile for speed.
- vmap(f): vectorise over a batch dimension automatically.
- Transformations compose: jit(grad(f)).
H: Functional style
- Arrays are immutable: use x.at[i].set(v) instead of x[i] = v.
- Functions should be pure (no side effects).
- Explicit random keys: jax.random.PRNGKey and split.
- Python control flow inside jit needs care (lax.cond, lax.scan).
H: Ecosystem
- Flax and Equinox for neural networks; Optax for optimisers.
- Scientific uses: differentiable simulation, physics.
- jax.numpy mirrors NumPy.
- Compilation cost on first call.
X: Compute the gradient of f(w) = sum(w^{2}) at w = [1, 2, 3] with JAX.
> grad(lambda w: jnp.sum(w**2)) gives a function computing 2w
> At [1, 2, 3] it returns [2, 4, 6]
> Wrapping with jit compiles it for repeated fast use
K: JAX offers NumPy-like arrays with composable grad, jit and vmap; it needs pure functions and immutable arrays; explicit random keys; it targets GPUs and TPUs via XLA.
!: Mutating arrays in place, which JAX arrays don't allow.
Q: What does vmap do? | Vectorises a function over a batch dimension.
Q: How do you update element i of a JAX array? | x = x.at[i].set(v).
SUM: Transform functions: grad, jit, vmap.
SUM: Keep code pure.
SRC: Bradbury J et al., JAX: composable transformations of Python+NumPy programs (software, Google) | primary | 2018 | https://github.com/jax-ml/jax
SRC: JAX Developers, JAX documentation | primary | 2025 | https://jax.readthedocs.io/
NUM1#maths-u27-16-q1@1: For f(x) = x^{3}, what does grad(f)(2.0) return? | 12 | 0 |  | f′(x) = 3x^{2}, so f′(2) = 12.
M1#maths-u27-16-q2@1: Which JAX transformation compiles a function for speed? | jit | grad | vmap | pmap only | print | jit traces the function and compiles it with XLA, so repeated calls run much faster on CPUs, GPUs or TPUs.
M2#maths-u27-16-q3@2: Why does JAX require explicit random keys? | Pure functions can't use hidden global random state, so keys are passed in | Random numbers are unavailable in JAX without a key | Keys make the code slower deliberately for safety | NumPy also requires keys, so JAX copies the convention | It doesn't; JAX uses a hidden global random state | Explicit keys make random computations reproducible and parallel-safe.

## R
S: R is a free language and environment for statistical computing and graphics, created by Ross Ihaka and Robert Gentleman in the 1990s. Its vast package repository, CRAN, and strong graphics make it a standard tool for statisticians and data scientists.
O: Use R vectors, data frames and model formulas
O: Fit and summarise statistical models in R
T: Vector (R) | R's basic data structure; even single numbers are vectors of length 1, and operations are vectorised
T: Model formula | Syntax such as y ~ x1 + x2 describing a model's response and predictors
H: Basics
- Assignment with <-; vectors with c(1, 2, 3).
- 1-based indexing; NA for missing values.
- Data frames for tables; factors for categories.
- Functions such as mean, sd, summary.
H: Modelling
- lm(y ~ x, data = df) for linear regression.
- glm for generalised linear models.
- summary() shows coefficients and tests.
- predict() for new data.
H: Ecosystem
- CRAN with over 20,000 packages.
- tidyverse (dplyr, ggplot2) for data handling and plots.
- R Markdown and Quarto for reports.
- Bioconductor for genomics.
X: Fit a straight line to x = 1:5, y = c(2, 4, 6, 8, 10) in R.
> fit <- lm(y ~ x)
> coef(fit) gives intercept 0 and slope 2
> summary(fit) adds standard errors and R^{2} (here a perfect fit)
- Functions in packages are loaded with library(name) after install.packages(name).
K: R is a free statistical language with vectorised operations, data frames and model formulas; lm and glm fit models; CRAN and the tidyverse extend it; reports via R Markdown.
!: Forgetting that NA values propagate, so mean(x) returns NA unless na.rm = TRUE.
Q: Who created R? | Ross Ihaka and Robert Gentleman.
Q: What does y ~ x mean in R? | A model formula with response y and predictor x.
SUM: Built for statistics.
SUM: Formulas describe models.
SRC: R Core Team, R: A Language and Environment for Statistical Computing (R Foundation) | primary | 2025 | https://www.r-project.org/
SRC: Ihaka R, Gentleman R, R: a language for data analysis and graphics, Journal of Computational and Graphical Statistics 5(3), 299 | journal | 1996 | https://doi.org/10.1080/10618600.1996.10474713
NUM1#maths-u27-17-q1@1: In R, x <- c(2, 4, 6, 8); what is mean(x)? | 5 | 0 |  | (2 + 4 + 6 + 8)/4 = 5.
M1#maths-u27-17-q2@1: What does x[1] return for x <- c(10, 20, 30) in R? | 10 | 20 | 30 | An error | NULL | R vectors are 1-based, so x[1] is the first element, 10; x[0] would return an empty vector.
M2#maths-u27-17-q3@2: Why does mean(c(1, 2, NA)) return NA in R? | Missing values propagate unless removed with na.rm = TRUE | R can't average three numbers | NA counts as zero in the sum | It returns 1.5 by default | It returns an error message | R refuses to guess a value for missing data by default.

## RStudio
S: RStudio is an integrated development environment for R, providing an editor, console, plots, help and project management in one window. Developed by the company now called Posit, it supports R Markdown and Quarto reports and also works with Python.
O: Use RStudio's panes, projects and scripts effectively
O: Produce reproducible reports with R Markdown or Quarto
T: RStudio Project | A folder-based workspace (.Rproj) that sets the working directory and keeps files together
T: Quarto | A publishing system that turns documents mixing text and code (R, Python, Julia) into HTML, PDF or Word
H: Interface
- Source editor, console, environment/history, files/plots/help panes.
- Code completion, debugging and syntax highlighting.
- Package installation and update tools.
- Git integration.
H: Good practice
- Use Projects rather than setwd().
- Write scripts, not console-only work.
- Restart R regularly to clear state.
- Use renv for reproducible package versions.
H: Reporting
- R Markdown (.Rmd) and Quarto (.qmd) documents.
- Code chunks run and insert results automatically.
- Parameterised reports.
- Shiny for interactive web apps.
X: Set up a reproducible analysis in RStudio.
> Create a new Project so the working directory is the project folder
> Write the analysis in a script or Quarto document with relative paths like data/survey.csv
> Use renv to record package versions and commit everything to Git
K: RStudio integrates editing, console, plots and help for R; Projects organise work; R Markdown and Quarto weave code and text into reports; renv and Git support reproducibility.
!: Using setwd() with absolute paths, which breaks when others run the code.
Q: What company develops RStudio? | Posit (formerly RStudio, PBC).
Q: What file extension do Quarto documents use? | .qmd.
SUM: An IDE built around R.
SUM: Projects and reports aid reproducibility.
SRC: Posit, RStudio IDE user guide | primary | 2025 | https://docs.posit.co/ide/user/
SRC: Posit, Quarto documentation | primary | 2025 | https://quarto.org/docs/
NUM1#maths-u27-18-q1@1: An R Markdown file has 3 code chunks producing one plot each, plus 1 chunk producing a table. How many output objects appear in the report? | 4 | 0 | objects | Three plots plus one table.
M1#maths-u27-18-q2@1: Which RStudio feature keeps a project's files and working directory together? | An RStudio Project (.Rproj) | The console history | A plot pane | The help viewer | A global setwd() call | Projects set the working directory automatically for that folder.
M2#maths-u27-18-q3@2: Why are Quarto or R Markdown reports more reproducible than copying results into Word? | The document reruns the code, so results always match the data and analysis | They're harder to edit, so nobody changes the results | They hide the code, so readers can't alter it | Copying results into Word is always more accurate | They aren't more reproducible than a Word document | Manual copying risks stale or mistyped numbers.

## pandas
S: pandas is Python's main library for tabular data, created by Wes McKinney in 2008. Its DataFrame and Series objects make it easy to load, clean, reshape, group and summarise data, and it's the starting point for most data analysis in Python.
O: Load, select, filter and summarise data with pandas
O: Use groupby, merges and handling of missing values
T: DataFrame | A two-dimensional labelled table with columns of possibly different types
T: groupby | Splitting data into groups by a key, applying a function to each, and combining results
H: Basics
- pd.read_csv, df.head, df.info, df.describe.
- Select columns df['col']; rows with .loc (labels) and .iloc (positions).
- Boolean filtering df[df['x'] > 5].
- New columns from vectorised expressions.
H: Transforming
- groupby('key').agg(['mean', 'count']).
- merge and join like SQL.
- pivot_table and melt for reshaping.
- Time series: date indices, resample.
H: Missing data and pitfalls
- NaN for missing values; isna, dropna, fillna.
- Chained indexing can modify copies (use .loc).
- Watch data types (strings read as objects).
- Polars and DuckDB as faster alternatives for very large data.
X: Find the average score per class from a pandas DataFrame.
> df = pd.DataFrame({'cls': ['A', 'A', 'B'], 'score': [70, 80, 90]})
> df.groupby('cls')['score'].mean() gives A: 75, B: 90
> Split by class, average each group, combine the results
K: pandas DataFrames store labelled tables; .loc and .iloc select; groupby, merge and pivot transform; NaN handles missing values; avoid chained assignment pitfalls.
!: Using chained indexing like df[df.x > 0]['y'] = 1, which may not change df.
Q: What's the difference between .loc and .iloc? | .loc selects by labels; .iloc by integer positions.
Q: What value does pandas use for missing numbers? | NaN.
SUM: Tables in Python.
SUM: Split, apply, combine.
SRC: McKinney W, Data structures for statistical computing in Python, Proceedings of the 9th Python in Science Conference, 56 | journal | 2010 | https://doi.org/10.25080/Majora-92bf1922-00a
SRC: pandas Development Team, pandas documentation | primary | 2025 | https://pandas.pydata.org/docs/
NUM1#maths-u27-19-q1@1: A DataFrame has a column with values 3, 5, NaN and 7. What does .mean() return? | 5 | 0 |  | pandas skips NaN by default: (3 + 5 + 7)/3 = 5.
M1#maths-u27-19-q2@1: Which pandas method computes group averages by category? | df.groupby('cat').mean() | df.mean('cat') | df.sort('cat') | df.pivot() only | df.merge('cat') | groupby splits rows by category, then mean aggregates each group.
M3#maths-u27-19-q3@2: Why does pandas warn about chained assignment? | An intermediate step may return a copy, so the assignment might not change the original DataFrame | Chained assignment is always faster, so pandas suggests it | It deletes the original data whenever it's used | It's a syntax error that stops the code from running | It doesn't warn; chained assignment always works correctly | Using .loc in one step guarantees the original is modified.

## statsmodels
S: statsmodels is a Python library for statistical modelling and econometrics. It fits linear and generalised linear models, time-series models and statistical tests, with output that reports standard errors, confidence intervals and diagnostics in the style statisticians expect.
O: Fit regression and GLM models with statsmodels
O: Interpret summaries and use time-series and testing tools
T: Formula API | statsmodels.formula.api, which fits models from R-style formulas such as 'y ~ x1 + x2'
T: Summary table | Output listing coefficients, standard errors, t-statistics, p-values, confidence intervals and fit statistics
H: Models
- OLS and WLS regression; robust standard errors.
- GLMs: logistic, Poisson and more.
- Mixed models and survival models.
- Time series: ARIMA, SARIMAX, VAR, exponential smoothing.
H: Workflow
- smf.ols('y ~ x', data=df).fit().
- result.summary(), result.params, result.conf_int().
- Diagnostics: residual plots, tests for heteroscedasticity.
- Predictions with get_prediction.
H: Compared with scikit-learn
- statsmodels emphasises inference and diagnostics.
- scikit-learn emphasises prediction and pipelines.
- Note: OLS without formulas needs an explicit constant (add_constant).
- Open source, BSD licence.
X: Fit a linear regression with a formula in statsmodels.
> import statsmodels.formula.api as smf; res = smf.ols('y ~ x', data=df).fit()
> res.params gives the intercept and slope
> res.conf_int() gives 95% confidence intervals for both
K: statsmodels fits regression, GLMs and time-series models with inference-focused output; the formula API mirrors R; summaries give standard errors and intervals; add constants explicitly without formulas.
!: Forgetting add_constant with sm.OLS, which fits a regression through the origin.
Q: Which statsmodels interface uses R-style formulas? | statsmodels.formula.api.
Q: How does statsmodels differ from scikit-learn in emphasis? | It focuses on inference and diagnostics rather than prediction pipelines.
SUM: Statistical inference in Python.
SUM: Summaries report uncertainty.
SRC: Seabold S, Perktold J, Statsmodels: econometric and statistical modeling with Python, Proceedings of the 9th Python in Science Conference, 92 | journal | 2010 | https://doi.org/10.25080/Majora-92bf1922-011
SRC: statsmodels Developers, statsmodels documentation | primary | 2025 | https://www.statsmodels.org/stable/
NUM1#maths-u27-20-q1@1: An OLS fit reports a coefficient 2.4 with standard error 0.6. What is its t-statistic? | 4 | 0 |  | t = 2.4/0.6 = 4.
M1#maths-u27-20-q2@1: Which statsmodels call fits a logistic regression with a formula? | smf.logit('y ~ x', data=df).fit() | smf.ols('y ~ x').predict() | sm.add_constant(df) | pd.read_csv('y ~ x') | np.linalg.solve | logit fits a binary logistic model from the formula.
M2#maths-u27-20-q3@2: What happens if you fit sm.OLS(y, X) without adding a constant column to X? | The model has no intercept and is forced through the origin | statsmodels adds an intercept automatically | The fit fails with an error message | All the coefficients are doubled | Nothing changes in the fitted model | The array interface uses exactly the columns supplied.

## scikit-learn
S: scikit-learn is Python's standard library for classical machine learning, started in 2007. Its consistent fit–predict API, pipelines and model selection tools make it easy to compare algorithms such as regression, random forests, SVMs and clustering fairly.
O: Use the estimator API, pipelines and cross-validation
O: Avoid data leakage and choose evaluation metrics
T: Estimator | An object with fit(X, y) to learn from data and predict(X) or transform(X) to apply what was learned
T: Data leakage | Information from the test set influencing training, giving over-optimistic performance
H: The API
- model = RandomForestClassifier(); model.fit(X_train, y_train); model.predict(X_test).
- Transformers: StandardScaler, PCA with fit and transform.
- Pipelines chain preprocessing and models.
- Hyperparameters set at construction.
H: Model selection
- train_test_split, cross_val_score, KFold.
- GridSearchCV and RandomizedSearchCV for tuning.
- Metrics: accuracy, F1, ROC AUC, mean squared error.
- Stratified splits for imbalanced classes.
H: Avoiding leakage
- Fit scalers inside the pipeline so cross-validation refits them on each fold.
- Keep a final untouched test set.
- Time series: TimeSeriesSplit, not random splits.
- Beware target information in features.
X: Evaluate a scaled logistic regression with 5-fold cross-validation.
> pipe = make_pipeline(StandardScaler(), LogisticRegression())
> scores = cross_val_score(pipe, X, y, cv=5)
> scores.mean() estimates accuracy, with the scaler refitted inside each fold
K: scikit-learn provides a consistent estimator API, pipelines, cross-validation and tuning; pipelines prevent leakage; choose metrics and splits to suit the problem.
!: Scaling the whole dataset before splitting, which leaks test-set information.
Q: What two methods does every scikit-learn estimator have? | fit and predict (or transform).
Q: Why use a Pipeline? | To chain preprocessing and model steps and avoid leakage.
SUM: One API for many models.
SUM: Pipelines prevent leakage.
SRC: Pedregosa F et al., Scikit-learn: machine learning in Python, Journal of Machine Learning Research 12, 2825 | journal | 2011 | https://jmlr.org/papers/v12/pedregosa11a.html
SRC: scikit-learn Developers, scikit-learn user guide | primary | 2025 | https://scikit-learn.org/stable/user_guide.html
NUM1#maths-u27-21-q1@1: 5-fold cross-validation on 1000 examples uses how many examples for testing in each fold? | 200 | 0 | examples | Each fold holds out 1000/5 = 200 examples.
M1#maths-u27-21-q2@1: Which scikit-learn tool searches hyperparameters with cross-validation? | GridSearchCV | StandardScaler | train_test_split alone | LabelEncoder | numpy.mean | It fits the model for each parameter combination on CV folds.
M3#maths-u27-21-q3@2: Why should a scaler be inside a Pipeline when cross-validating? | So it's refitted on each training fold, preventing test-fold statistics from leaking into training | Pipelines make scaling optional, so the model trains faster | Scalers can't run outside a Pipeline in scikit-learn | It speeds up prediction but doesn't affect evaluation | It doesn't matter where the scaler is fitted during cross-validation | Fitting on all data lets validation folds influence preprocessing.

## SPSS
S: IBM SPSS Statistics is a commercial package for statistical analysis, widely used in social sciences, psychology, health and market research. First released in 1968, it offers menu-driven analysis alongside a syntax language for reproducible work.
O: Describe SPSS's interface and typical analyses
O: Use syntax for reproducibility
T: Data View and Variable View | SPSS's two spreadsheet views: cases and values, and variable definitions (type, labels, measurement level)
T: SPSS syntax | Command language that records analyses as text, so they can be rerun and audited
H: Interface
- Menus for descriptive statistics, t-tests, ANOVA, regression, chi-squared.
- Variable labels, value labels and measurement levels (nominal, ordinal, scale).
- Output Viewer with tables and charts.
- Paste button generates syntax from menu choices.
H: Analyses
- Descriptives and crosstabs.
- Compare Means, General Linear Model, Regression.
- Nonparametric tests.
- Factor analysis and reliability (Cronbach's alpha).
H: Good practice
- Save syntax files (.sps) alongside data (.sav).
- Document recodes and filters.
- Check assumptions, not just p-values.
- Commercial licensing; PSPP is a free alternative.
X: Run an independent-samples t-test in SPSS reproducibly.
> Analyze → Compare Means → Independent-Samples T Test, choose variables
> Click Paste instead of OK to write the T-TEST syntax to a .sps file
> Run the syntax; save it with the data so the test can be repeated
K: SPSS offers menu-driven statistics with Data and Variable Views; syntax records analyses for reproducibility; it's common in social and health sciences; PSPP is a free alternative.
!: Running analyses only through menus without saving syntax, so they can't be reproduced.
Q: Which SPSS feature turns menu choices into reusable commands? | The Paste button (syntax).
Q: What file extension do SPSS data files use? | .sav.
SUM: Menu-driven statistics.
SUM: Save syntax for reproducibility.
SRC: IBM, IBM SPSS Statistics documentation | primary | 2025 | https://www.ibm.com/docs/en/spss-statistics
SRC: Field A, Discovering Statistics Using IBM SPSS Statistics (6th edn, SAGE 2024) | textbook | 2024 | https://uk.sagepub.com/
NUM1#maths-u27-22-q1@1: An SPSS crosstab has 3 rows and 4 columns. How many degrees of freedom does the chi-squared test have? | 6 | 0 |  | (3 − 1)(4 − 1) = 6.
M1#maths-u27-22-q2@1: In SPSS, where do you set a variable's measurement level? | Variable View | Data View | Output Viewer | Syntax Editor only | Chart Builder | Variable View holds each variable's type, labels and level.
M2#maths-u27-22-q3@2: Why should SPSS users save syntax rather than rely on menus? | Syntax records every step exactly, so analyses can be rerun, checked and shared | Menus are much slower than typing syntax | Syntax is required to open any data file | Menus give wrong answers for most tests | There's no reason; menus record everything | Menu clicks leave no reproducible record.

## SAS
S: SAS is a long-established commercial software suite for data management, statistics and analytics, originating at North Carolina State University and sold by SAS Institute since 1976. It's widely used in pharmaceuticals, banking and government, where validated, auditable analyses matter.
O: Describe SAS's DATA and PROC step structure
O: Recognise SAS's role in regulated industries
T: DATA step | SAS code that reads, creates and transforms datasets row by row
T: PROC step | A SAS procedure that analyses or reports on data, such as PROC MEANS or PROC REG
H: Program structure
- DATA steps build datasets; PROC steps analyse them.
- Statements end with semicolons.
- Libraries (LIBNAME) point to data locations.
- Macros automate repeated code.
H: Procedures
- PROC MEANS, FREQ, UNIVARIATE for description.
- PROC REG, GLM, LOGISTIC, MIXED for modelling.
- PROC SQL for queries.
- PROC SGPLOT for graphics.
H: Use
- Clinical trial analysis and submissions (CDISC standards).
- Banking risk models and regulatory reporting.
- Large-scale data processing.
- SAS OnDemand for Academics offers free access for learning.
X: Create a dataset and summarise it in SAS.
> data scores; input name $ mark; datalines; (then the data lines and ;)
> proc means data=scores mean std; var mark; run;
> PROC MEANS prints the mean and standard deviation of mark
K: SAS programs combine DATA steps for data preparation with PROC steps for analysis; it's prominent in pharmaceuticals and banking for auditable work; macros and SQL extend it.
!: Forgetting the semicolon at the end of a SAS statement, which causes confusing errors.
Q: What do SAS PROC steps do? | Run procedures that analyse or report on data.
Q: Which industry relies heavily on SAS for regulatory submissions? | Pharmaceuticals (clinical trials).
SUM: DATA steps prepare; PROC steps analyse.
SUM: Valued for auditable analytics.
SRC: SAS Institute, SAS documentation | primary | 2025 | https://documentation.sas.com/
SRC: Delwiche LD, Slaughter SJ, The Little SAS Book (6th edn, SAS Institute 2019) | textbook | 2019 | https://support.sas.com/
NUM1#maths-u27-23-q1@1: PROC MEANS on values 4, 8, 15, 16 and 23 reports the mean. What is it, to 1 decimal place? | 13.2 | 0.01 |  | (4 + 8 + 15 + 16 + 23)/5 = 66/5 = 13.2.
M1#maths-u27-23-q2@1: Which SAS step reads and transforms data row by row? | The DATA step | PROC MEANS | PROC SGPLOT | PROC PRINT | The LIBNAME statement | The DATA step builds or modifies a dataset one observation at a time, before PROC steps analyse it.
M2#maths-u27-23-q3@2: Why is SAS common in clinical trial reporting? | Its validated procedures and audit trails suit strict regulatory submissions | It's the only statistics software regulators have heard of | It's free for all companies, which keeps costs down | Regulators forbid any other software for submissions | It isn't common in clinical trials at all | Regulated environments value stability and documentation.

## Stata
S: Stata is a commercial statistics package from StataCorp, first released in 1985 and especially popular in economics, epidemiology and political science. Its concise command language, do-files and strong econometrics make reproducible analysis straightforward.
O: Use Stata commands, do-files and factor-variable notation
O: Fit common econometric and epidemiological models
T: Do-file | A text file of Stata commands that can be run to reproduce an entire analysis
T: Factor-variable notation | Prefixes like i. and c. marking variables as categorical or continuous, with ## for interactions
H: Basics
- Commands: use, summarize, tabulate, regress.
- if and in qualifiers restrict observations.
- One dataset in memory at a time (frames allow more in recent versions).
- Log files record output.
H: Modelling
- regress y x1 x2, robust (heteroscedasticity-robust errors).
- logit, probit, poisson; xtreg for panel data.
- ivregress for instrumental variables.
- stset and stcox for survival analysis.
H: Good practice
- Write do-files; never rely on interactive commands alone.
- Version control do-files.
- User-written packages from SSC (ssc install).
- Margins and marginsplot for interpretation.
X: Fit a regression with robust standard errors and a categorical variable in Stata.
> use survey.dta, clear
> regress income age i.region, robust
> Save these lines in analysis.do and run do analysis.do to reproduce
K: Stata uses concise commands in do-files for reproducible analysis; it's strong in econometrics and epidemiology; factor-variable notation handles categories and interactions; SSC adds packages.
!: Running commands interactively without saving a do-file, so the analysis can't be reproduced.
Q: What is a do-file? | A script of Stata commands that reproduces an analysis.
Q: What does i.region mean in a Stata model? | Treat region as a categorical variable.
SUM: Concise commands, reproducible do-files.
SUM: Strong econometrics.
SRC: StataCorp, Stata documentation | primary | 2025 | https://www.stata.com/features/documentation/
SRC: Cameron AC, Trivedi PK, Microeconometrics Using Stata (2nd edn, Stata Press 2022) | textbook | 2022 | https://www.stata-press.com/
NUM1#maths-u27-24-q1@1: A Stata model includes i.region where region has 5 categories. How many region dummy coefficients are estimated (with an intercept)? | 4 | 0 |  | One category is the base, so 5 − 1 = 4 dummies.
M1#maths-u27-24-q2@1: Which Stata option gives heteroscedasticity-robust standard errors? | , robust | , cluster only | , noconstant | , beta | , level(90) | regress y x, robust uses Huber–White standard errors.
M2#maths-u27-24-q3@2: Why do economists value Stata's do-files? | They record every command so results can be reproduced and checked by others | They run much faster than typed commands | They hide the analysis from journal referees | They're required to open any Stata dataset | They don't; economists rarely use do-files | Replication packages in economics are usually do-files plus data.

## Minitab
S: Minitab is a commercial statistics package designed for ease of use, developed at Penn State University in 1972. It's widely used in teaching introductory statistics and in industry for quality improvement methods such as Six Sigma and statistical process control.
O: Describe Minitab's interface and typical uses
O: Recognise quality-improvement tools such as control charts and capability analysis
T: Control chart | A time-ordered plot of a process statistic with control limits, used to detect unusual variation
T: Process capability index | Cp = (USL − LSL)/(6σ), comparing specification width with natural process variation
H: Interface
- Worksheet of columns (C1, C2, …).
- Menus for basic statistics, regression, ANOVA, DOE.
- Assistant guides users through analysis choices.
- Graphs update with data.
H: Quality tools
- Control charts: X̄-R, individuals, p-charts.
- Capability analysis (Cp, Cpk).
- Design of experiments (factorial, response surface).
- Measurement system analysis (gauge R&R).
H: Use
- Introductory statistics teaching.
- Manufacturing and Six Sigma projects.
- Commercial licensing.
- Session commands can record analyses.
X: Check a filling process with an individuals control chart in Minitab.
> Enter fill weights in column C1
> Stat → Control Charts → Variables Charts for Individuals → I-MR
> Points beyond the limits or long runs on one side signal special causes to investigate
K: Minitab is an easy-to-use statistics package popular in teaching and quality improvement; it offers control charts, capability analysis and designed experiments; the Assistant guides choices.
!: Treating every point outside control limits as a defect rather than investigating the cause.
Q: Where was Minitab developed? | Penn State University (1972).
Q: What does a process capability index compare? | Specification width with natural process variation.
SUM: Easy statistics for teaching and industry.
SUM: Quality tools built in.
SRC: Minitab LLC, Minitab support documentation | primary | 2025 | https://support.minitab.com/
SRC: Montgomery DC, Introduction to Statistical Quality Control (8th edn, Wiley 2019) | textbook | 2019 | https://www.wiley.com/
NUM1#maths-u27-25-q1@1: A process has USL = 10.6, LSL = 9.4 and σ = 0.1. What is Cp? | 2 | 0 |  | Cp = (10.6 − 9.4)/(6 × 0.1) = 1.2/0.6 = 2.
M1#maths-u27-25-q2@1: Which tool detects unusual variation in a process over time? | A control chart | A pie chart | A word cloud | A Gantt chart | A Venn diagram | Control charts flag points beyond limits or non-random patterns.
M2#maths-u27-25-q3@2: Why might a process with Cp = 2 still produce defects? | Cp ignores centring; if the mean is off target, Cpk can be much lower | Cp guarantees zero defects whatever the mean | Cp measures the defect rate directly | Higher Cp always means more defects | It can't produce defects with Cp above 1 | Cpk accounts for the distance of the mean from the nearer limit.

## Stan
S: Stan is an open-source probabilistic programming language for Bayesian statistical modelling, released in 2012. It uses Hamiltonian Monte Carlo with the No-U-Turn Sampler to fit complex models efficiently, and it interfaces with R, Python, Julia and more.
O: Write the blocks of a Stan model
O: Diagnose MCMC fits with R̂ and effective sample size
T: Hamiltonian Monte Carlo | An MCMC method that uses gradients of the log posterior to make long, efficient moves
T: R̂ (R-hat) | A convergence diagnostic comparing variation within and between chains; values near 1 indicate convergence
H: Model blocks
- data: inputs; parameters: unknowns; model: priors and likelihood.
- Optional transformed parameters and generated quantities.
- Vectorised statements: y ~ normal(mu, sigma).
- Compiled to C++.
H: Inference
- NUTS (No-U-Turn Sampler) tunes path length automatically.
- Variational inference and optimisation also available.
- Interfaces: CmdStanR, CmdStanPy, brms, rstanarm.
H: Diagnostics
- R̂ < 1.01; bulk and tail effective sample sizes.
- Divergent transitions signal problematic geometry (reparameterise).
- Posterior predictive checks.
- Named after Stanisław Ulam, a pioneer of Monte Carlo.
X: Write a Stan model for normal data with unknown mean and standard deviation.
> data { int N; vector[N] y; }
> parameters { real mu; real<lower=0> sigma; }
> model { mu ~ normal(0, 10); sigma ~ exponential(1); y ~ normal(mu, sigma); }
K: Stan writes Bayesian models in data, parameters and model blocks; NUTS-based HMC samples efficiently; R̂, effective sample size and divergences diagnose fits; many interfaces exist.
!: Ignoring divergent transitions, which can mean the posterior isn't explored properly.
Q: Which sampler does Stan use by default? | NUTS (No-U-Turn Sampler), a form of HMC.
Q: What R̂ value indicates convergence? | Close to 1 (below about 1.01).
SUM: Bayesian models in a dedicated language.
SUM: Check R̂ and divergences.
SRC: Carpenter B et al., Stan: a probabilistic programming language, Journal of Statistical Software 76(1), 1 | journal | 2017 | https://doi.org/10.18637/jss.v076.i01
SRC: Hoffman MD, Gelman A, The No-U-Turn Sampler, Journal of Machine Learning Research 15, 1593 | journal | 2014 | https://jmlr.org/papers/v15/hoffman14a.html
NUM1#maths-u27-26-q1@1: Four chains each draw 1000 post-warmup samples. How many posterior draws are there in total? | 4000 | 0 | draws | 4 × 1000 = 4000.
M1#maths-u27-26-q2@1: Which Stan block declares the unknowns to be estimated? | parameters | data | generated quantities | functions | transformed data | The parameters block lists quantities given priors and sampled.
M3#maths-u27-26-q3@2: Why do divergent transitions in Stan matter? | The sampler couldn't follow the posterior's geometry, so estimates may be biased | They speed up sampling by skipping regions | They're harmless warnings that can be ignored | They show that the model has converged | They never occur with well-written models | Regions of high curvature (such as funnels) may be under-explored.

## PyMC
S: PyMC is an open-source Python library for Bayesian modelling and probabilistic programming. Models are written as ordinary Python code, and PyMC samples their posteriors with NUTS and other methods, with ArviZ providing diagnostics and plots.
O: Build simple Bayesian models in PyMC
O: Run sampling and inspect results with ArviZ
T: Model context | The with pm.Model(): block in which random variables and likelihoods are declared
T: ArviZ | A Python library for exploratory analysis of Bayesian models: diagnostics, summaries and plots
H: Writing models
- Priors: mu = pm.Normal('mu', 0, 10).
- Likelihood with observed data: pm.Normal('y', mu, sigma, observed=data).
- Deterministic quantities with pm.Deterministic.
- Hierarchical models with group-level parameters.
H: Inference
- pm.sample() uses NUTS by default.
- Variational inference (ADVI) for speed.
- Posterior predictive sampling for checks.
- Backends based on PyTensor; JAX samplers available.
H: Diagnostics with ArviZ
- az.summary: means, intervals, R̂, ESS.
- Trace and rank plots.
- Model comparison with LOO and WAIC.
- InferenceData format stores everything.
X: Estimate a coin's bias from 7 heads in 10 tosses with PyMC.
> with pm.Model(): p = pm.Beta('p', 1, 1); pm.Binomial('k', n=10, p=p, observed=7)
> idata = pm.sample() draws from the posterior
> az.summary(idata) shows a mean near 8/12 ≈ 0.67, the Beta(8, 4) mean
K: PyMC writes Bayesian models in Python; NUTS samples posteriors; ArviZ summarises and diagnoses; posterior predictive checks and LOO compare models.
!: Interpreting results before checking R̂, effective sample size and divergences.
Q: What sampler does pm.sample() use by default for continuous models? | NUTS.
Q: What does ArviZ provide? | Diagnostics, summaries and plots for Bayesian models.
SUM: Bayesian models in Python.
SUM: Diagnose with ArviZ.
SRC: Abril-Pla O et al., PyMC: a modern, and comprehensive probabilistic programming framework in Python, PeerJ Computer Science 9, e1516 | journal | 2023 | https://doi.org/10.7717/peerj-cs.1516
SRC: Kumar R et al., ArviZ: a unified library for exploratory analysis of Bayesian models in Python, Journal of Open Source Software 4(33), 1143 | journal | 2019 | https://doi.org/10.21105/joss.01143
NUM1#maths-u27-27-q1@1: A PyMC posterior for p has mean 0.62 and 94% HDI [0.48, 0.75]. What is the HDI width? | 0.27 | 0.001 |  | 0.75 − 0.48 = 0.27.
M1#maths-u27-27-q2@1: How is observed data attached to a likelihood in PyMC? | With the observed= argument | With a separate fit() call | With pm.data_only() | It can't be | By renaming the variable | observed=data conditions the model on the data.
M2#maths-u27-27-q3@2: Why are posterior predictive checks useful? | Simulating data from the fitted model shows whether it reproduces key features of the real data | They prove the model is true | They replace the need for priors | They speed up the sampler | They aren't useful in practice | Systematic mismatches reveal model misspecification.

## BUGS
S: BUGS (Bayesian inference Using Gibbs Sampling) was developed at the MRC Biostatistics Unit in Cambridge from 1989. With WinBUGS, OpenBUGS and the compatible JAGS, it made Bayesian modelling practical for applied statisticians, especially in epidemiology and medicine.
O: Describe BUGS model specification and Gibbs sampling
O: Compare BUGS-family tools with modern samplers
T: Gibbs sampling | MCMC that samples each parameter in turn from its conditional distribution given the others
T: Directed graphical model | A model specified by declaring each variable's distribution given its parents, as BUGS code does
H: The BUGS language
- Stochastic nodes: y[i] ~ dnorm(mu, tau) (precision, not variance).
- Deterministic nodes: mu <- a + b * x[i].
- Loops over data indices.
- Declarative: order of statements doesn't matter.
H: Implementations
- WinBUGS (1990s), OpenBUGS (open source), MultiBUGS (parallel).
- JAGS (Just Another Gibbs Sampler, Plummer) runs BUGS-style models cross-platform.
- Interfaces: R2jags, rjags.
H: Strengths and limits
- Huge legacy of models in medical statistics.
- Gibbs sampling can mix slowly with correlated parameters.
- Stan and PyMC use HMC for faster mixing in many models.
- Note the precision parameterisation: tau = 1/σ^{2}.
X: Write a BUGS model for the mean of normal data.
> model { for (i in 1:N) { y[i] ~ dnorm(mu, tau) }
> mu ~ dnorm(0, 0.001); tau ~ dgamma(0.001, 0.001); sigma <- 1/sqrt(tau) }
> Note the precision tau, with sigma derived from it
K: BUGS specifies Bayesian models as graphs and samples them with Gibbs-type MCMC; WinBUGS, OpenBUGS and JAGS implement it; normal distributions use precision; HMC tools often mix faster today.
!: Supplying a variance where BUGS's dnorm expects a precision.
Q: What does BUGS stand for? | Bayesian inference Using Gibbs Sampling.
Q: In BUGS, what is the second parameter of dnorm? | The precision (1/variance).
SUM: Bayesian modelling made practical.
SUM: Watch the precision parameterisation.
SRC: Lunn DJ, Thomas A, Best N, Spiegelhalter D, WinBUGS — a Bayesian modelling framework, Statistics and Computing 10, 325 | journal | 2000 | https://doi.org/10.1023/A:1008929526011
SRC: Plummer M, JAGS: a program for analysis of Bayesian graphical models using Gibbs sampling, Proceedings of DSC 2003 | journal | 2003 | https://mcmc-jags.sourceforge.io/
NUM1#maths-u27-28-q1@1: In BUGS, dnorm(0, 0.25) has precision 0.25. What is its standard deviation? | 2 | 0 |  | Variance = 1/0.25 = 4, so σ = 2.
M1#maths-u27-28-q2@1: Which program runs BUGS-language models and is cross-platform? | JAGS | SPSS | Excel | Stata | MATLAB | JAGS (Just Another Gibbs Sampler) reads BUGS-style models.
M2#maths-u27-28-q3@2: Why can Gibbs sampling mix slowly for some models? | Updating one parameter at a time moves slowly when parameters are strongly correlated | It uses gradients, which slow it down | It never converges for any model | It samples all parameters jointly | It always mixes fast for every model | Narrow diagonal posteriors force small coordinate-wise steps.

## PyTorch
S: PyTorch is an open-source deep learning framework first released by Facebook (now Meta) AI Research in 2016 and now governed by the PyTorch Foundation. Its tensors, automatic differentiation and Python-first "eager" style make it the most widely used framework in machine learning research.
O: Use tensors, autograd and modules to build and train models
O: Write a basic training loop
T: Tensor | PyTorch's n-dimensional array, which can live on CPU or GPU and track gradients
T: Autograd | PyTorch's automatic differentiation: operations on tensors with requires_grad=True build a graph, and backward() computes gradients
H: Building blocks
- torch.tensor, operations and broadcasting like NumPy.
- nn.Module for models; layers such as nn.Linear, nn.Conv2d.
- Loss functions (nn.CrossEntropyLoss) and optimisers (torch.optim.Adam).
- .to('cuda') moves data and models to a GPU.
H: Training loop
- Forward pass: predictions = model(x).
- loss = loss_fn(predictions, y).
- optimizer.zero_grad(); loss.backward(); optimizer.step().
- DataLoader for batches and shuffling.
H: Ecosystem and practice
- torch.compile for speed; TorchScript for deployment.
- Libraries: torchvision, Hugging Face Transformers, PyTorch Lightning.
- Set seeds and deterministic flags for reproducibility.
- model.eval() and torch.no_grad() for evaluation.
X: Write one training step for a linear model in PyTorch.
> pred = model(x); loss = nn.functional.mse_loss(pred, y)
> optimizer.zero_grad(); loss.backward(); optimizer.step()
> Repeating this over batches trains the model
K: PyTorch provides GPU tensors, autograd and modules; training loops zero gradients, compute loss, backpropagate and step; eval mode and no_grad are used for evaluation.
!: Forgetting optimizer.zero_grad(), so gradients accumulate across batches.
Q: What does loss.backward() do? | Computes gradients of the loss with respect to parameters.
Q: Why call model.eval() before evaluating? | It switches layers like dropout and batch norm to inference behaviour.
SUM: Tensors plus autograd.
SUM: Zero, backward, step.
SRC: Paszke A et al., PyTorch: an imperative style, high-performance deep learning library, NeurIPS 32 | journal | 2019 | https://arxiv.org/abs/1912.01703
SRC: PyTorch Foundation, PyTorch documentation | primary | 2025 | https://pytorch.org/docs/stable/
NUM1#maths-u27-29-q1@1: With x = torch.tensor(3.0, requires_grad=True) and y = x**2 + 2*x, what is x.grad after y.backward()? | 8 | 0 |  | dy/dx = 2x + 2 = 8 at x = 3.
M1#maths-u27-29-q2@1: How many parameters does nn.Linear(10, 5) have (with bias)? | 55 | 50 | 15 | 10 | 5 | nn.Linear(10, 5) has a 5 × 10 weight matrix (50 parameters) plus 5 biases, giving 55.
M2#maths-u27-29-q3@2: Why must gradients be zeroed before each backward pass? | PyTorch accumulates gradients by default, so old gradients would add to new ones | Gradients are deleted automatically after each step anyway | It speeds up the forward pass on the next batch | It changes the learning rate to a sensible value | It isn't necessary; PyTorch overwrites old gradients | Accumulation is useful for some tricks but wrong by default in a loop.

## TensorFlow
S: TensorFlow is Google's open-source machine learning platform, released in 2015. With its high-level Keras API, eager execution since version 2.0 and strong deployment tools for servers, phones and browsers, it's widely used in production systems.
O: Build and train models with the Keras API
O: Describe graphs, tf.function and deployment options
T: Keras | TensorFlow's high-level API for defining, compiling and training neural networks
T: tf.function | A decorator that traces Python code into a TensorFlow graph for faster, portable execution
H: Keras workflow
- model = keras.Sequential([layers.Dense(64, activation='relu'), layers.Dense(10)]).
- model.compile(optimizer='adam', loss=..., metrics=['accuracy']).
- model.fit(x, y, epochs=10, validation_split=0.2).
- model.evaluate and model.predict.
H: Under the hood
- Tensors and automatic differentiation with tf.GradientTape.
- Eager by default (TF 2.x); graphs via tf.function.
- Accelerators: GPUs and TPUs.
- tf.data pipelines for input.
H: Deployment
- SavedModel format; TensorFlow Serving.
- TensorFlow Lite (LiteRT) for mobile and embedded devices.
- TensorFlow.js in browsers.
- TensorBoard for visualising training.
X: Build and train a small classifier with Keras.
> model = keras.Sequential([keras.layers.Dense(32, activation='relu'), keras.layers.Dense(3, activation='softmax')])
> model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
> model.fit(X, y, epochs=20, validation_split=0.2) trains with a validation check
K: TensorFlow pairs low-level tensors and GradientTape with the Keras high-level API; tf.function builds graphs for speed; strong deployment tools target servers, mobile and web.
!: Calling model.fit without a validation split and judging the model by training accuracy alone.
Q: What is Keras? | TensorFlow's high-level neural network API.
Q: What does tf.GradientTape do? | Records operations to compute gradients.
SUM: Production-ready ML platform.
SUM: Keras for quick models.
SRC: Abadi M et al., TensorFlow: a system for large-scale machine learning, OSDI 2016, 265 | journal | 2016 | https://www.usenix.org/conference/osdi16/technical-sessions/presentation/abadi
SRC: Google, TensorFlow documentation | primary | 2025 | https://www.tensorflow.org/api_docs
NUM1#maths-u27-30-q1@1: A Keras Dense(64) layer receives 784 inputs. How many parameters does it have? | 50240 | 0 | parameters | 784 × 64 + 64 = 50,176 + 64 = 50,240.
M1#maths-u27-30-q2@1: Which call trains a compiled Keras model? | model.fit(x, y) | model.train_now() | model.compile(x, y) | model.predict(y) | keras.run() | After compile sets the optimiser and loss, model.fit(x, y) runs the training loop over the requested epochs.
M2#maths-u27-30-q3@2: Why use tf.function on a Python training step? | Tracing it into a graph lets TensorFlow optimise and run it faster and export it | It makes the code run more slowly but more safely | It removes the gradients from the computation | It's required before any Keras model can train | It doesn't change anything about how the code runs | Graphs allow fusion and deployment without Python.

## Excel
S: Microsoft Excel is the world's most widely used spreadsheet, first released in 1985. It handles calculations, data analysis, charts and simple models through cell formulas, and it's powerful for quick work but error-prone for complex or large analyses.
O: Write formulas with relative and absolute references
O: Use common functions and recognise spreadsheet risks
T: Absolute reference | A cell reference fixed with $, such as $A$1, which doesn't change when the formula is copied
T: Array formula | A formula operating on ranges at once; dynamic arrays spill results into neighbouring cells
H: Formulas
- Start with =; relative references (A1) shift when copied, absolute ($A$1) don't.
- SUM, AVERAGE, COUNTIF, SUMIFS.
- IF, XLOOKUP (or VLOOKUP), INDEX/MATCH.
- Statistical and financial functions: STDEV.S, NORM.DIST, PMT, NPV.
H: Analysis
- Charts and pivot tables.
- Data Analysis ToolPak for regression and tests.
- What-if analysis: Goal Seek, data tables, Solver.
- Power Query for cleaning and importing.
H: Risks
- Studies find errors in many real spreadsheets.
- Gene names auto-converted to dates (SEPT2) in genomics data.
- Row limit of 1,048,576 (COVID-19 test results lost in 2020 with old .xls limits).
- Floating-point display can hide rounding.
X: Compute monthly repayments on a £10,000 loan at 6% a year over 5 years in Excel.
> =PMT(6%/12, 60, -10000)
> returns about £193.33
> Put the rate, term and amount in separate input cells and refer to them
K: Excel computes with cell formulas; relative and absolute references control copying; functions cover statistics and finance; pivot tables and Solver add analysis; error and data-limit risks are real.
!: Copying a formula that should refer to a fixed cell without making the reference absolute.
Q: What does $A$1 mean in Excel? | An absolute reference that doesn't change when copied.
Q: What function calculates a loan payment in Excel? | PMT.
SUM: Formulas in cells.
SUM: Powerful but error-prone.
SRC: Microsoft, Excel functions (by category) | primary | 2025 | https://support.microsoft.com/en-us/excel
SRC: Ziemann M, Eren Y, El-Osta A, Gene name errors are widespread in the scientific literature, Genome Biology 17, 177 | journal | 2016 | https://doi.org/10.1186/s13059-016-1044-7
NUM1#maths-u27-31-q1@1: Cells A1:A4 hold 2, 5, 8 and 11. What does =AVERAGE(A1:A4) return? | 6.5 | 0.001 |  | (2 + 5 + 8 + 11)/4 = 26/4 = 6.5.
M1#maths-u27-31-q2@1: =B2*$C$1 is copied from D2 to D3. What does D3 contain? | =B3*$C$1 | =B2*$C$1 | =B3*$C$2 | =C3*$D$1 | =B3*C1 | The relative reference shifts down a row; the absolute one stays fixed.
M2#maths-u27-31-q3@2: Why did Public Health England lose COVID-19 test records in 2020? | Data were handled in the old .xls format, whose row limit truncated the files | Excel deleted the records deliberately as duplicates | The records were encrypted and couldn't be opened | Formulas in the sheet calculated the totals wrongly | It didn't happen; no records were lost | The legacy format holds about 65,000 rows, so excess rows were dropped.

## Solver in Excel
S: Excel's Solver add-in finds values of decision cells that optimise a target cell subject to constraints. It handles linear, nonlinear and integer problems with its Simplex LP, GRG Nonlinear and Evolutionary methods, making optimisation accessible to non-programmers.
O: Set up a Solver model with objective, variables and constraints
O: Choose the right solving method and interpret reports
T: Decision variable cells | The cells Solver changes to find the best solution
T: GRG Nonlinear | Solver's Generalised Reduced Gradient method for smooth nonlinear problems, which finds local optima
H: Setting up
- Enable the Solver add-in.
- Set objective: Max, Min or Value Of.
- By changing variable cells.
- Add constraints: ≤, =, ≥, int, bin.
H: Methods
- Simplex LP: linear problems, global optimum.
- GRG Nonlinear: smooth problems, local optimum (try several starts).
- Evolutionary: non-smooth problems, heuristic.
- Tick "Make unconstrained variables non-negative" if appropriate.
H: Interpreting
- Answer, Sensitivity and Limits reports.
- Shadow prices in the sensitivity report (linear models).
- Check that the model is linear before choosing Simplex.
- Size limits in the free version (about 200 variables).
X: Set up Solver to maximise profit 3x + 2y with x + y ≤ 4 and x + 3y ≤ 6.
> Put x and y in cells B1 and B2; objective =3*B1+2*B2 in B4
> Constraints: =B1+B2 ≤ 4 and =B1+3*B2 ≤ 6, with non-negativity
> Simplex LP finds x = 4, y = 0 with profit 12
K: Solver optimises a target cell by changing variable cells under constraints; Simplex LP handles linear models globally; GRG Nonlinear finds local optima; reports give sensitivity information.
!: Using GRG Nonlinear on a nonconvex model and assuming the answer is the global optimum.
Q: Which Solver method guarantees a global optimum for linear models? | Simplex LP.
Q: What does the Sensitivity Report give for linear models? | Shadow prices and allowable ranges.
SUM: Optimisation inside a spreadsheet.
SUM: Match the method to the model.
SRC: Microsoft, Define and solve a problem by using Solver | primary | 2025 | https://support.microsoft.com/en-us/office/define-and-solve-a-problem-by-using-solver-5d1a388f-079d-43ac-a7eb-f63e45925040
SRC: Ragsdale CT, Spreadsheet Modeling and Decision Analysis (9th edn, Cengage 2021) | textbook | 2021 | https://www.cengage.com/
NUM1#maths-u27-32-q1@1: In the example, what is the optimal profit Solver reports? | 12 | 0 |  | At x = 4, y = 0 the objective is 3 × 4 = 12.
M1#maths-u27-32-q2@1: Which Solver method suits a model with IF statements and discontinuities? | Evolutionary | Simplex LP | GRG Nonlinear only | Goal Seek | None | Evolutionary search doesn't need smoothness.
M2#maths-u27-32-q3@2: Why should GRG Nonlinear be run from several starting values? | It finds local optima, so different starts may reveal a better solution | It always finds the global optimum from any start | Starting values make no difference to the result | It needs integer starting values to work at all | It shouldn't be; one start is always sufficient | Multistart reduces the risk of stopping at a poor local optimum.

## Spreadsheet Calculations
S: Spreadsheets are used for budgets, statistics, engineering calculations and models of all kinds. Building them well, with clear inputs, consistent formulas, checks and documentation, makes the difference between a reliable tool and a source of costly errors.
O: Design spreadsheets with separated inputs, calculations and outputs
O: Use checks, named ranges and testing to reduce errors
T: Named range | A descriptive name for a cell or range, such as InterestRate, making formulas easier to read
T: Circular reference | A formula that depends on its own result, directly or indirectly, often an error
H: Good structure
- Separate inputs (assumptions), calculations and outputs.
- One formula per row or column, copied consistently.
- No hard-coded numbers inside formulas.
- Colour-code input cells.
H: Checks and testing
- Totals that must balance; flags for unexpected values.
- Test with simple inputs whose answers are known.
- Trace precedents and dependents.
- Peer review by someone else.
H: Common calculations
- Compound growth: =P*(1+r)^n.
- Loan schedules with PMT.
- Weighted averages with SUMPRODUCT.
- Descriptive statistics and simple regression (LINEST).
X: Calculate the weighted average of scores 70, 80 and 90 with weights 0.2, 0.3 and 0.5 using SUMPRODUCT.
> =SUMPRODUCT(A1:A3, B1:B3)/SUM(B1:B3)
> = (14 + 24 + 45)/1.0
> = 83
K: Good spreadsheets separate inputs from calculations, keep formulas consistent and avoid hard-coded numbers; checks, tests and reviews catch errors; named ranges and functions like SUMPRODUCT help.
!: Hard-coding a number like 0.2 inside many formulas instead of referring to one input cell.
Q: What is a circular reference? | A formula that depends on its own result.
Q: What does SUMPRODUCT compute? | The sum of products of corresponding entries.
SUM: Structure prevents errors.
SUM: Check and test.
SRC: Panko RR, What we know about spreadsheet errors, Journal of End User Computing 10(2), 15 | journal | 1998 | https://doi.org/10.4018/joeuc.1998040102
SRC: FAST Standard Organisation, The FAST Standard for financial modelling | guideline | 2023 | https://www.fast-standard.org/
NUM1#maths-u27-33-q1@1: =1000*(1+0.05)^3 returns what value, to 2 decimal places? | 1157.63 | 0.01 |  | 1000 × 1.157625 = 1157.625, displayed as 1157.63.
M1#maths-u27-33-q2@1: Which practice makes spreadsheet assumptions easiest to check and change? | Putting each assumption in its own labelled input cell | Typing numbers inside every formula | Hiding columns with inputs | Using different formulas in each row | Avoiding labels | Visible, single-source inputs make changes safe.
M2#maths-u27-33-q3@2: Why test a spreadsheet with simple inputs whose answers you already know? | It shows whether formulas work as intended before real data are used | It replaces the need for formulas in the sheet | Simple inputs always break spreadsheets | It's only done to make the sheet look tidy | It isn't useful for finding mistakes | Known-answer tests catch logic errors that plausible-looking outputs hide.

## GeoGebra
S: GeoGebra is free dynamic mathematics software created by Markus Hohenwarter in 2001. It links geometry, algebra, graphing, spreadsheets and statistics, so that dragging a point updates every related object, and it's used by millions of students and teachers.
O: Construct dynamic geometry and graphs in GeoGebra
O: Use sliders and linked views to explore mathematics
T: Dynamic geometry | Geometry software where constructions keep their defining relationships when points are dragged
T: Slider | A control that varies a parameter continuously, updating all dependent objects
H: Features
- Geometry tools: points, lines, circles, perpendicular bisectors, transformations.
- Algebra view shows coordinates and equations live.
- Graphing, 3D, CAS and probability apps.
- Spreadsheet and statistics views.
H: Teaching uses
- Explore theorems by dragging (circle theorems stay true).
- Sliders to show effects of parameters (y = ax^{2} + bx + c).
- Classroom activities and GeoGebra Classroom.
- Shared resources on geogebra.org.
H: Cautions
- Dragging gives evidence, not proof.
- Numerical rounding in displayed values.
- Distinguish free objects from dependent ones.
- Exam rules vary on its use.
X: Construct a triangle and its three perpendicular bisectors in GeoGebra. What do you observe when dragging vertices?
> The three bisectors always meet at one point (the circumcentre)
> A circle centred there passes through all three vertices
> Dragging gives strong evidence; a proof shows why it's always true
K: GeoGebra links dynamic geometry, algebra, graphs and statistics; sliders and dragging support exploration; observations suggest theorems but don't prove them.
!: Treating a dragging experiment as a proof of a geometric theorem.
Q: Who created GeoGebra? | Markus Hohenwarter (2001).
Q: What does a slider do in GeoGebra? | Varies a parameter and updates dependent objects.
SUM: Dynamic, linked mathematics.
SUM: Exploration suggests, proof confirms.
SRC: Hohenwarter M, Jones K, Ways of linking geometry and algebra: the case of GeoGebra, Proceedings of the British Society for Research into Learning Mathematics 27(3), 126 | journal | 2007 | https://bsrlm.org.uk/
SRC: GeoGebra GmbH, GeoGebra manual | primary | 2025 | https://geogebra.github.io/docs/manual/en/
NUM1#maths-u27-34-q1@1: In GeoGebra, a slider a runs from −5 to 5 with step 0.5. How many values can it take? | 21 | 0 | values | (5 − (−5))/0.5 + 1 = 21.
M1#maths-u27-34-q2@1: Where do a triangle's perpendicular bisectors meet? | At the circumcentre | At the centroid | At the incentre | At the orthocentre always | They never meet | The circumcentre is equidistant from all three vertices.
M2#maths-u27-34-q3@2: Why isn't dragging a GeoGebra construction a proof? | It checks many cases but can't cover all of them or explain why it holds | GeoGebra is always wrong about geometry | Dragging changes the theorem being tested | Proofs never use diagrams of any kind | It is a proof when enough positions are tried | Infinitely many configurations need a general argument.

## Desmos
S: Desmos is a free online graphing calculator launched in 2011. Typing equations, inequalities and tables produces instant graphs, and sliders, lists and regressions make it a favourite for exploring functions in classrooms and approved exams.
O: Graph functions, inequalities and parametric curves in Desmos
O: Use sliders, lists and regression to explore data
T: Regression in Desmos | Fitting a model to table data with ~, such as y₁ ~ mx₁ + b
T: Restriction | A domain or range condition in braces, such as y = x^{2} {0 < x < 2}
H: Graphing
- Functions y = f(x), implicit equations, inequalities.
- Parametric (cos t, sin t) and polar r = 1 + cos θ.
- Restrictions with { } and piecewise definitions.
- Points of interest: intercepts, maxima, intersections.
H: Exploration
- Sliders for undefined parameters (type y = ax + b).
- Lists and tables of points.
- Regression with ~ for linear, quadratic, exponential models.
- Animations by playing sliders.
H: Classroom and exams
- Activity Builder for teachers.
- Test mode approved in some exams.
- 3D and geometry calculators.
- Accessible audio trace for visually impaired users.
X: How would you show in Desmos how a changes the graph y = a(x − 2)^{2} + 1?
> Type y = a(x − 2)^{2} + 1 and accept the slider for a
> Drag a: positive a opens upwards, negative downwards, larger |a| narrows the curve
> The vertex stays at (2, 1) throughout
K: Desmos graphs functions, inequalities, parametric and polar curves instantly; sliders and restrictions support exploration; tables and ~ fit regressions; it's widely used in teaching.
!: Forgetting that Desmos's regression fit is only as good as the model form you choose.
Q: How do you fit a regression in Desmos? | Use ~, such as y₁ ~ mx₁ + b.
Q: How do you restrict a graph's domain? | Add a condition in braces, like {0 < x < 2}.
SUM: Instant graphs and sliders.
SUM: Great for exploring functions.
SRC: Desmos Studio PBC, Desmos user guide | primary | 2025 | https://help.desmos.com/
SRC: Ebert D, Graphing projects with Desmos, Mathematics Teacher 108(5), 388 | journal | 2015 | https://doi.org/10.5951/mathteacher.108.5.0388
NUM1#maths-u27-35-q1@1: Desmos fits y₁ ~ mx₁ + b to points (0, 1), (1, 3) and (2, 5). What value of m does it find? | 2 | 0 |  | The points lie exactly on y = 2x + 1, so m = 2.
M1#maths-u27-35-q2@1: What happens when you type y = ax + b into Desmos? | It offers sliders for a and b | It gives an error | It solves for a | It plots nothing | It asks for a table | Undefined parameters become adjustable sliders.
M2#maths-u27-35-q3@2: Why must you still choose a sensible model form when using Desmos regression? | It fits whatever form you type, so a wrong form gives a misleading best fit | Desmos chooses the true model automatically from the data | Regression in Desmos ignores the data points entirely | All model forms fit any data equally well in Desmos | It doesn't matter which form is typed into the regression | A straight line can fit curved data badly yet still report parameters.

## LaTeX
S: LaTeX is the standard system for typesetting mathematics, created by Leslie Lamport in the 1980s on top of Donald Knuth's TeX. It produces high-quality formulae and documents from plain-text source, handling numbering, references and bibliographies automatically.
O: Write basic LaTeX documents with maths, structure and references
O: Use packages and good practice for mathematical documents
T: Math mode | The LaTeX mode for formulae, entered with $…$ (inline) or display environments like equation and align
T: Package | An extension loaded with \\usepackage, such as amsmath for advanced maths or graphicx for images
H: Basics
- \\documentclass{article}, \\begin{document} … \\end{document}.
- Sections, lists, figures and tables.
- Inline maths $x^2$ and displays \\[ \\int_0^1 f(x)\\,dx \\].
- Fractions \\frac{a}{b}, roots \\sqrt{x}, Greek letters \\alpha.
H: Structure and references
- \\label and \\ref for automatic numbering.
- equation, align (amsmath) environments.
- theorem environments (amsthm).
- BibTeX or biblatex for citations.
H: Practice
- Compile with pdflatex, xelatex or lualatex; Overleaf online.
- Keep notation consistent with macros (\\newcommand).
- Version control the .tex source.
- Read error messages from the first one.
X: Typeset a numbered equation and refer to it in LaTeX.
> \\begin{equation} E = mc^2 \\label{eq:energy} \\end{equation}
> In the text: as equation~\\ref{eq:energy} shows
> LaTeX inserts the correct number automatically after compiling twice
K: LaTeX typesets mathematics from plain text; math mode handles formulae; amsmath and amsthm add structure; labels, references and BibTeX automate numbering and citations.
!: Typing words in math mode, which sets them as italic variables (use \\text{}).
Q: Who created LaTeX? | Leslie Lamport.
Q: Which package provides the align environment? | amsmath.
SUM: Plain text in, beautiful maths out.
SUM: Labels and references number automatically.
SRC: Lamport L, LaTeX: A Document Preparation System (2nd edn, Addison-Wesley 1994) | textbook | 1994 | https://www.pearson.com/
SRC: Knuth DE, The TeXbook (Addison-Wesley 1984) | textbook | 1984 | https://www-cs-faculty.stanford.edu/~knuth/abcde.html
NUM1#maths-u27-36-q1@1: A LaTeX document has 3 equation environments before the one labelled eq:main, all numbered. What number does \\ref{eq:main} print? | 4 | 0 |  | Automatic numbering makes it the 4th equation.
M1#maths-u27-36-q2@1: Which LaTeX code produces a fraction a over b? | \\frac{a}{b} | a/b in text mode | \\over{a,b} | \\fraction(a b) | [a|b] | \\frac takes numerator and denominator arguments.
M2#maths-u27-36-q3@2: Why use \\label and \\ref instead of typing equation numbers? | Numbers update automatically when equations are added or moved | It's faster to type than writing a number | Typed equation numbers are forbidden in LaTeX | Labels change the mathematics in the equation | There's no reason to prefer labels | Manual numbering breaks whenever the document changes.

## MathJax
S: MathJax is an open-source JavaScript library that displays mathematical notation in web browsers. Writers type LaTeX or MathML, and MathJax renders it as clear, scalable and accessible maths, used by sites such as Stack Exchange and many online courses.
O: Embed mathematics in web pages with MathJax
O: Explain accessibility and rendering options
T: MathML | An XML language for describing mathematical notation and structure on the web
T: Delimiters | Markers such as \\( … \\) for inline and \\[ … \\] or $$ … $$ for display maths that MathJax recognises
H: Using MathJax
- Load the script from a CDN or host it locally.
- Write LaTeX between delimiters in HTML or Markdown.
- Configure delimiters and extensions.
- Output as SVG or HTML with CSS (CHTML).
H: Accessibility
- Screen readers can speak maths via assistive MathML and speech rules.
- Expression explorer for navigating formulae.
- Scales cleanly when zoomed.
- Copy as LaTeX or MathML.
H: Context
- Jupyter notebooks use MathJax for Markdown maths.
- Alternatives: KaTeX (fast, smaller subset).
- Browsers' native MathML support has improved.
- Supports a large subset of LaTeX maths, not full documents.
X: Show the quadratic formula on a web page with MathJax.
> Load the MathJax script in the page header
> Write \\[ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\] in the HTML
> MathJax renders it as display maths that scales and can be read by screen readers
K: MathJax renders LaTeX or MathML maths in browsers; delimiters mark maths; output is scalable and accessible to screen readers; KaTeX is a faster alternative with fewer features.
!: Expecting MathJax to compile entire LaTeX documents rather than just maths expressions.
Q: What does MathJax render? | LaTeX and MathML mathematics in web pages.
Q: Name a faster alternative to MathJax. | KaTeX.
SUM: Maths on the web.
SUM: Accessible and scalable.
SRC: Cervone D, MathJax: a platform for mathematics on the web, Notices of the AMS 59(2), 312 | journal | 2012 | https://www.ams.org/notices/201202/rtx120200312p.pdf
SRC: MathJax Consortium, MathJax documentation | primary | 2025 | https://docs.mathjax.org/
NUM1#maths-u27-37-q1@1: A web page contains the text \\(a^2\\), \\(b^2\\) and \\[c^2\\]. How many expressions will MathJax render as display (block) maths? | 1 | 0 |  | Only \\[c^2\\] uses display delimiters; the other two are inline.
M1#maths-u27-37-q2@1: Which tool renders LaTeX maths in Jupyter Markdown cells? | MathJax | Excel | SPSS | Gurobi | OpenFOAM | Jupyter uses MathJax to typeset maths in the browser.
M2#maths-u27-37-q3@2: Why is MathJax output more accessible than an image of an equation? | It keeps the maths structure, so screen readers can speak and navigate it | Images of equations are always clearer for every reader | It hides the mathematics from screen readers deliberately | It's smaller than plain text, so it loads faster | It isn't more accessible than a well-made image | Images carry no structure for assistive technology.

## GAP
S: GAP (Groups, Algorithms, Programming) is a free system for computational discrete algebra, especially group theory, begun at RWTH Aachen in 1986. It computes with permutation groups, finite fields and representations, and includes huge libraries such as all small groups.
O: Use GAP to compute with permutation groups
O: Describe GAP's libraries and role in research
T: Permutation group | A group of permutations of a set, such as Group((1,2,3), (1,2)) ≅ S₃
T: SmallGroups library | A GAP database of all groups of small order (for example, all groups of order up to 2000 except 1024)
H: Basics
- G := SymmetricGroup(4); Size(G) returns 24.
- Permutations in cycle notation: (1,2,3).
- IsAbelian, Centre, ConjugacyClasses, NormalSubgroups.
- StructureDescription names small groups.
H: Libraries
- SmallGroups, transitive groups, primitive groups.
- Character tables (CTblLib).
- Packages for representation theory, semigroups, graphs.
H: Use
- Group theory research and teaching.
- Built into SageMath.
- Free (GPL) and community developed.
- Programming language with functions and loops.
X: Use GAP reasoning to find the order of the group generated by (1,2,3,4) and (1,3).
> (1,2,3,4) generates a cyclic group of order 4 (rotations of a square's vertices)
> Adding the reflection (1,3) gives the dihedral group of order 8
> GAP's Size(Group((1,2,3,4),(1,3))) returns 8
X: Find the order and centre of the dihedral group of order 8 in GAP.
> G := DihedralGroup(8);
> Size(G); returns 8
> Size(Centre(G)); returns 2, the identity and the 180° rotation
K: GAP computes with groups, especially permutation groups; it holds libraries such as all small groups and character tables; it's free, programmable and built into SageMath.
!: Mixing up cycle notation conventions for composing permutations (GAP composes left to right).
Q: What does GAP stand for? | Groups, Algorithms, Programming.
Q: What does Size(SymmetricGroup(5)) return? | 120.
SUM: Computational group theory.
SUM: Vast libraries of groups.
SRC: The GAP Group, GAP — Groups, Algorithms, and Programming, reference manual | primary | 2025 | https://www.gap-system.org/
SRC: Holt DF, Eick B, O'Brien EA, Handbook of Computational Group Theory (CRC Press 2005) | textbook | 2005 | https://www.routledge.com/
NUM1#maths-u27-38-q1@1: What does GAP return for Size(SymmetricGroup(4))? | 24 | 0 |  | |S₄| = 4! = 24.
M1#maths-u27-38-q2@1: Which GAP library contains all groups of small order? | SmallGroups | CRAN | NumPy | CPLEX | SPSS | The SmallGroups library enumerates groups by order.
M2#maths-u27-38-q3@2: Why do group theorists rely on systems like GAP? | Many questions about specific groups need huge exact computations impossible by hand | GAP proves all theorems automatically for them | Groups can't be studied by hand at all | Using GAP is required for publication | They don't rely on computer systems | Classifying subgroups or characters of large groups needs computer algebra.

## Magma
S: Magma is a commercial computer algebra system from the University of Sydney, first released in 1993 as a successor to Cayley. It's renowned for high-performance algorithms in algebra, number theory, algebraic geometry and cryptography.
O: Describe Magma's strengths and typical research uses
O: Read basic Magma syntax
T: Algebraic structure (Magma) | Magma's central concept: every object belongs to a structure such as a group, ring, field or module
T: Elliptic curve computation | Calculations of ranks, torsion and points on elliptic curves, a Magma speciality
H: Strengths
- Groups, rings, fields, modules and algebras.
- Number theory: number fields, elliptic curves, modular forms.
- Algebraic geometry and Gröbner bases.
- Coding theory and cryptography.
H: Syntax
- Assignment with :=; statements end with ;.
- Structures created first: Q := Rationals(); R<x> := PolynomialRing(Q);.
- Factorisation(x^4 − 1) factors polynomials.
- Online calculator for small free computations.
H: Context
- Successor of the Cayley system (John Cannon).
- Proprietary; licences mainly for academic institutions.
- Used in proofs of research results and cryptographic analysis.
- SageMath, GAP and PARI as open alternatives.
X: Count points on the elliptic curve y^{2} = x^{3} + x + 1 over GF(5) in Magma.
> E := EllipticCurve([GF(5) | 1, 1]);
> #E; returns 9, including the point at infinity
> Hasse's bound |#E − 6| ≤ 2√5 ≈ 4.47 is satisfied
K: Magma is a commercial algebra system strong in groups, number theory and geometry; objects live in algebraic structures; syntax uses := and semicolons; it's widely used in research.
!: Assuming Magma is free; it requires a licence apart from the limited online calculator.
Q: Where was Magma developed? | The University of Sydney.
Q: What system preceded Magma? | Cayley.
SUM: High-performance algebra.
SUM: Structures organise everything.
SRC: Bosma W, Cannon J, Playoust C, The Magma algebra system I: the user language, Journal of Symbolic Computation 24(3–4), 235 | journal | 1997 | https://doi.org/10.1006/jsco.1996.0125
SRC: Computational Algebra Group, Magma handbook (University of Sydney) | primary | 2025 | https://magma.maths.usyd.edu.au/magma/handbook/
NUM1#maths-u27-39-q1@1: Magma's Factorisation(x^4 − 1) over ℚ returns how many irreducible factors? | 3 | 0 | factors | x^{4} − 1 = (x − 1)(x + 1)(x^{2} + 1).
M1#maths-u27-39-q2@1: Which area is a particular strength of Magma? | Number theory and elliptic curves | Word processing and layout | Video editing | Spreadsheet macros | Web design | Magma's algorithms for elliptic curves and number fields are state of the art.
M2#maths-u27-39-q3@2: Why must structures be created first in Magma, such as R<x> := PolynomialRing(Q)? | Every object lives in a structure, which fixes how its arithmetic works | It's a cosmetic convention with no effect on results | Structures are optional and only change printing | It speeds up typing for long sessions | It doesn't need them; Magma guesses the structure | The same symbol can mean different things in different rings.

## PARI/GP
S: PARI/GP is a free computer algebra system specialising in number theory, started by Henri Cohen and colleagues at Bordeaux in 1985. PARI is the fast C library; GP is the interactive shell and scripting language, used worldwide for computations with integers, number fields and elliptic curves.
O: Use GP for number-theoretic computations
O: Describe PARI/GP's role in research and other systems
T: PARI | The C library of number-theoretic algorithms underlying the system
T: GP | The interactive calculator and scripting language built on PARI
H: Capabilities
- factor, isprime, nextprime, eulerphi.
- Modular arithmetic: Mod(3, 7)^{−1}.
- Number fields: nfinit, class groups.
- Elliptic curves: ellinit, ellrank (in recent versions), L-functions.
H: Usage
- Interactive GP sessions; scripts in .gp files.
- Arbitrary precision: \\p 50 sets 50 digits.
- Fast for large integers and series.
- Called from SageMath and other systems.
H: Context
- Free (GPL) and actively developed.
- Used for the LMFDB database of L-functions and modular forms.
- Strong documentation and tutorials.
- Lightweight to install.
X: Factor an integer and compute Euler's totient in GP.
> factor(360) returns the matrix [2, 3; 3, 2; 5, 1], meaning 2^{3} × 3^{2} × 5
> eulerphi(360) returns 96
> Check: 360 × (1/2)(2/3)(4/5) = 96
K: PARI/GP is a free, fast number theory system: PARI is the C library and GP the shell; it handles factorisation, modular arithmetic, number fields and elliptic curves; SageMath uses it.
!: Forgetting to set enough precision with \\p for high-precision real computations.
Q: Who started PARI/GP? | Henri Cohen and colleagues at Bordeaux (1985).
Q: What does eulerphi(12) return? | 4.
SUM: Fast number theory.
SUM: Library plus shell.
SRC: The PARI Group, PARI/GP User's Guide (Université de Bordeaux) | primary | 2025 | https://pari.math.u-bordeaux.fr/doc.html
SRC: Cohen H, A Course in Computational Algebraic Number Theory (Springer 1993) | textbook | 1993 | https://link.springer.com/
NUM1#maths-u27-40-q1@1: What does GP's Mod(3, 7)^-1 return as a residue? | 5 | 0 |  | 3 × 5 = 15 ≡ 1 (mod 7), so the inverse is 5.
M1#maths-u27-40-q2@1: What does eulerphi(10) return in GP? | 4 | 10 | 5 | 2 | 9 | The numbers 1, 3, 7 and 9 are coprime to 10.
M2#maths-u27-40-q3@2: Why is PARI/GP split into a library and a shell? | Other programs such as SageMath can call the C library, while GP is interactive | It makes installation deliberately harder | The shell is faster than the C library | They're unrelated programs sharing a name | It isn't split; PARI and GP are one program | Separating them lets many systems reuse the same fast algorithms.

## FEniCS
S: FEniCS is an open-source platform for solving partial differential equations with the finite element method. Users write the weak form of a PDE in near-mathematical notation in Python, and FEniCS generates efficient code automatically, making advanced simulation accessible.
O: Express PDE weak forms in FEniCS's Unified Form Language
O: Describe the FEniCS workflow from mesh to solution
T: Unified Form Language | UFL, a domain-specific language for writing variational (weak) forms close to mathematical notation
T: Function space | The finite element space, such as continuous piecewise linear (Lagrange P1), in which the solution is sought
H: Workflow
- Create or import a mesh.
- Define a function space (element type and degree).
- Write the weak form a(u, v) = L(v) in UFL.
- Apply boundary conditions and solve.
H: Example (Poisson)
- −∇^{2}u = f becomes ∫ ∇u·∇v dx = ∫ fv dx.
- In UFL: a = inner(grad(u), grad(v))*dx; L = f*v*dx.
- Dirichlet conditions on the boundary.
- Solve and visualise (ParaView).
H: Context
- Started in 2003 (Chicago and Simula, Norway).
- DOLFINx is the current library generation.
- Scales to parallel computers with PETSc.
- Firedrake is a related project.
X: Outline solving −∇^{2}u = 1 on the unit square with u = 0 on the boundary in FEniCS.
> Create a mesh and a P1 function space
> Define a = inner(grad(u), grad(v))*dx and L = 1*v*dx
> Apply the zero Dirichlet condition and solve; the maximum is about 0.0737 at the centre
K: FEniCS solves PDEs by finite elements from weak forms written in UFL; the workflow is mesh, function space, variational form, boundary conditions, solve; DOLFINx runs in parallel via PETSc.
!: Writing the strong form of the PDE in FEniCS instead of deriving the weak form first.
Q: What does UFL describe? | Variational (weak) forms of PDEs.
Q: Which library handles parallel linear algebra in FEniCS? | PETSc.
SUM: Weak forms in, simulations out.
SUM: Code generated automatically.
SRC: Logg A, Mardal KA, Wells GN (eds), Automated Solution of Differential Equations by the Finite Element Method: The FEniCS Book (Springer 2012) | textbook | 2012 | https://link.springer.com/
SRC: FEniCS Project, DOLFINx documentation | primary | 2025 | https://docs.fenicsproject.org/
NUM1#maths-u27-41-q1@1: A P1 (piecewise linear) element on a triangle has one degree of freedom per vertex. How many degrees of freedom does one triangle element have? | 3 | 0 |  | Three vertices give three local basis functions.
M1#maths-u27-41-q2@1: In FEniCS, which UFL line expresses the Poisson bilinear form? | a = inner(grad(u), grad(v))*dx | a = u + v | a = solve(u) | a = div(u)*f | a = mesh*dx | The weak form of −∇^{2}u = f is ∫ ∇u·∇v dx = ∫ fv dx, written in UFL as inner(grad(u), grad(v))*dx.
M2#maths-u27-41-q3@2: Why does FEniCS ask for the weak form rather than the strong PDE? | FEM is built on variational forms, which need fewer derivatives | Strong forms are always wrong for PDEs, so FEniCS forbids them | Weak forms are shorter to type, which is the only reason | It doesn't ask for it; FEniCS takes the strong form directly | Weak forms need no boundary conditions at all, which saves effort | Integration by parts moves derivatives onto test functions.

## COMSOL Multiphysics
S: COMSOL Multiphysics is a commercial simulation package, originally released in 1998 as FEMLAB, for finite element modelling of coupled physical phenomena. Users combine physics interfaces, such as heat transfer, structural mechanics and electromagnetics, in one model with a graphical workflow.
O: Describe COMSOL's multiphysics modelling workflow
O: Recognise good practice in setting up and checking simulations
T: Multiphysics | Simulation of several interacting physical processes, such as Joule heating combining electric current and heat flow
T: Physics interface | A predefined set of equations and boundary conditions for one physical phenomenon in COMSOL
H: Workflow
- Geometry: draw or import CAD.
- Materials: properties from libraries.
- Physics interfaces and coupling.
- Mesh, study (stationary, time-dependent, eigenfrequency), results.
H: Capabilities
- Structural, thermal, fluid, electromagnetic, acoustic, chemical modules.
- Custom equations through PDE interfaces.
- Parametric sweeps and optimisation.
- Applications built for non-experts (Application Builder).
H: Good practice
- Mesh convergence studies.
- Check units and material data.
- Validate against analytical solutions or experiments.
- Simplify geometry where details don't matter.
X: Set up a Joule heating model of a resistor in COMSOL.
> Draw the geometry and assign copper and ceramic materials
> Add Electric Currents and Heat Transfer interfaces coupled by Electromagnetic Heating
> Apply a voltage, mesh, solve a stationary study and refine the mesh to check the peak temperature
K: COMSOL couples multiple physics in finite element models through a geometry–materials–physics–mesh–study workflow; it supports custom PDEs and sweeps; convergence checks and validation remain essential.
!: Reporting results from a single coarse mesh without a convergence study.
Q: What was COMSOL Multiphysics originally called? | FEMLAB.
Q: What is a multiphysics simulation? | One that couples several interacting physical processes.
SUM: Coupled physics in one model.
SUM: Check mesh convergence.
SRC: COMSOL AB, COMSOL Multiphysics reference manual | primary | 2025 | https://doc.comsol.com/
SRC: Zimmerman WBJ, Multiphysics Modeling with Finite Element Methods (World Scientific 2006) | textbook | 2006 | https://www.worldscientific.com/
NUM1#maths-u27-42-q1@1: A mesh study gives peak temperatures 351.0, 352.6 and 352.9 K for successively finer meshes. By how many kelvin did the last refinement change the result? | 0.3 | 0.001 | K | 352.9 − 352.6 = 0.3 K, a sign of convergence.
M1#maths-u27-42-q2@1: Which phenomenon is a classic multiphysics problem? | Joule heating, coupling electric current with heat transfer | A single linear spring at rest | Pure arithmetic on whole numbers | A static bar chart of data | A list of material names | Current generates heat, and temperature changes electrical properties.
M2#maths-u27-42-q3@2: Why run a mesh convergence study in COMSOL? | To confirm results don't change significantly with a finer mesh, so discretisation error is small | It makes the model run faster on the final mesh | It replaces the need for any validation | It's optional decoration for reports | It's never needed with automatic meshing | Results that still change with refinement aren't yet trustworthy.

## ANSYS
S: ANSYS is a widely used commercial suite for engineering simulation, founded by John Swanson in 1970. It includes finite element analysis for structures, computational fluid dynamics (such as Fluent) and electromagnetics, used across aerospace, automotive and energy industries.
O: Describe the main ANSYS simulation tools and workflow
O: Apply good practice in structural and CFD simulation
T: Finite element analysis | Numerical analysis of stress, deformation, heat and vibration by dividing a structure into elements
T: Boundary conditions (engineering) | Supports, loads and constraints applied to a simulation model, which strongly determine results
H: Tools
- Mechanical: structural, thermal, modal and fatigue analysis.
- Fluent and CFX: computational fluid dynamics.
- Electromagnetics (HFSS, Maxwell).
- Workbench to link geometry, meshing and solvers.
H: Workflow
- Geometry (CAD) and simplification.
- Meshing with quality checks.
- Materials, loads and boundary conditions.
- Solve, post-process and verify.
H: Good practice
- Hand calculations to check orders of magnitude.
- Mesh refinement at stress concentrations.
- Avoid singularities from point loads and sharp corners.
- Validate against tests; follow verification standards.
X: Check an ANSYS cantilever model with a hand calculation.
> A 1 m steel cantilever (E = 200 GPa, I = 10^{−6} m^{4}) carries 1 kN at the tip
> Hand deflection PL^{3}/(3EI) = 1000/(6 × 10^{5}) ≈ 1.67 mm
> If ANSYS reports about 1.7 mm, the setup is likely correct; 1.7 m would signal a units error
K: ANSYS provides structural FEA, CFD and electromagnetics in linked workflows; results depend on geometry, mesh and boundary conditions; hand checks, refinement and validation ensure reliability.
!: Trusting peak stresses at sharp re-entrant corners, which grow without bound as the mesh is refined.
Q: Who founded ANSYS? | John Swanson (1970).
Q: Which ANSYS product is known for CFD? | Fluent.
SUM: Engineering simulation suite.
SUM: Inputs determine outputs.
SRC: Ansys Inc, Ansys documentation | primary | 2025 | https://www.ansys.com/
SRC: Madenci E, Guven I, The Finite Element Method and Applications in Engineering Using ANSYS (2nd edn, Springer 2015) | textbook | 2015 | https://link.springer.com/
NUM1#maths-u27-43-q1@1: A hand calculation gives a beam stress of 50 MPa, and ANSYS reports 52 MPa away from stress concentrations. What is the percentage difference relative to the hand value? | 4 | 0 | % | (52 − 50)/50 = 0.04 = 4%, a reassuring match.
M3#maths-u27-43-q2@1: Why do stresses at a sharp re-entrant corner keep rising as the mesh is refined? | The corner is a geometric singularity where elastic stress is theoretically infinite | The solver is broken and must be reinstalled | Mesh refinement always lowers peak stress | Materials soften at corners in the model | They don't rise; corner stresses converge quickly | Real parts have fillets; a perfectly sharp corner gives a singular stress field.
M2#maths-u27-43-q3@2: Why should engineers do a hand calculation before running an FEA model? | It gives an independent order-of-magnitude check that catches unit and setup errors | Hand calculations are always more accurate than FEA | FEA needs hand results as inputs to run | It's only required in university exams | It's unnecessary with modern software | Large disagreements reveal mistakes in loads, units or constraints.

## OpenFOAM
S: OpenFOAM is a free, open-source C++ toolbox for computational fluid dynamics, released as open source in 2004. It uses the finite volume method and includes solvers for incompressible, compressible, multiphase and reacting flows, with no licence costs for large parallel runs.
O: Describe OpenFOAM's case structure and solvers
O: Recognise good CFD practice in OpenFOAM
T: Finite volume method | A discretisation that integrates conservation laws over control volumes, conserving mass, momentum and energy exactly at the discrete level
T: Case directory | An OpenFOAM simulation folder with 0/ (initial and boundary conditions), constant/ (mesh and properties) and system/ (settings)
H: Structure
- 0/: fields such as U (velocity) and p (pressure).
- constant/: mesh (polyMesh) and physical properties.
- system/: controlDict, fvSchemes, fvSolution.
- Utilities: blockMesh, snappyHexMesh, checkMesh.
H: Solvers
- simpleFoam (steady incompressible), pimpleFoam (transient).
- interFoam (two-phase with free surfaces).
- rhoCentralFoam (compressible), reactingFoam.
- Turbulence models: k–ε, k–ω SST, LES.
H: Practice
- Check mesh quality and y⁺ near walls.
- Monitor residuals and physical quantities for convergence.
- Grid independence studies.
- Runs in parallel with decomposePar and MPI.
X: Run the lid-driven cavity tutorial in OpenFOAM.
> Copy the cavity case; blockMesh builds the mesh from system/blockMeshDict
> icoFoam solves the transient incompressible flow
> View results in ParaView with paraFoam and check the vortex forms
K: OpenFOAM is open-source finite volume CFD in C++; cases have 0, constant and system folders; many solvers cover flow types; mesh quality, convergence monitoring and grid studies are essential.
!: Judging convergence from falling residuals alone without checking quantities like drag or flow rate.
Q: Which folder holds initial and boundary conditions in an OpenFOAM case? | 0/.
Q: Which method does OpenFOAM use to discretise equations? | The finite volume method.
SUM: Open-source CFD toolbox.
SUM: Check mesh and convergence.
SRC: Weller HG, Tabor G, Jasak H, Fureby C, A tensorial approach to computational continuum mechanics using object-oriented techniques, Computers in Physics 12(6), 620 | journal | 1998 | https://doi.org/10.1063/1.168744
SRC: OpenFOAM Foundation, OpenFOAM user guide | primary | 2025 | https://doc.cfd.direct/openfoam/user-guide-v12/
NUM1#maths-u27-44-q1@1: An OpenFOAM case is decomposed over 4 × 4 × 2 processors. How many MPI processes run? | 32 | 0 | processes | 4 × 4 × 2 = 32 subdomains, one per process.
M1#maths-u27-44-q2@1: Which OpenFOAM solver suits steady incompressible turbulent flow? | simpleFoam | interFoam | rhoCentralFoam | reactingFoam | blockMesh | simpleFoam uses the SIMPLE algorithm for steady incompressible flow.
M2#maths-u27-44-q3@2: Why is the finite volume method popular for fluid dynamics? | It conserves mass, momentum and energy exactly across control volumes | It needs no mesh, which saves setup time for fluids | It's always more accurate than finite elements for any flow | It ignores boundary conditions, which simplifies the setup | It isn't popular for fluid dynamics; finite elements dominate | Fluxes leaving one cell enter its neighbour exactly.

## MapleSim
S: MapleSim is a commercial physical modelling tool from Maplesoft, released in 2008 and built on the Modelica language and Maple's symbolic engine. Engineers connect components such as masses, motors and circuits, and MapleSim derives and simplifies the system equations automatically.
O: Describe acausal, component-based modelling in MapleSim
O: Explain how symbolic simplification helps simulation
T: Acausal modelling | Connecting components by physical ports (forces, currents) without fixing input–output direction, so equations are solved together
T: Modelica | An open standard language for modelling physical systems with equations, used by MapleSim and other tools
H: Modelling
- Drag components from libraries: mechanical, electrical, hydraulic, thermal.
- Connect physical ports; equations are assembled automatically.
- Multibody mechanics in 3D.
- Parameters and custom components.
H: Under the hood
- Builds differential–algebraic equations (DAEs).
- Maple symbolic engine simplifies and reduces index.
- Generates efficient code for simulation and real-time use.
- Exports models to other tools (FMI standard).
H: Uses
- Robotics, vehicles, motors and machines.
- Control design and digital twins.
- Hardware-in-the-loop testing.
- Compared with Simulink's causal block diagrams.
X: Model a mass–spring–damper in MapleSim.
> Connect a Fixed frame, Spring (k = 100 N/m), Damper (c = 2 N·s/m) and Mass (1 kg)
> MapleSim assembles mẍ + cẋ + kx = 0 automatically
> Simulating a displaced start shows decaying oscillation at about √100 = 10 rad/s
K: MapleSim builds models from physical components using acausal Modelica-based connections; it derives and simplifies DAEs symbolically and generates fast code; it complements causal block-diagram tools.
!: Confusing acausal physical connections with causal signal-flow block diagrams.
Q: What modelling language underlies MapleSim? | Modelica.
Q: What kind of equations does MapleSim build from connected components? | Differential–algebraic equations (DAEs).
SUM: Physical components, automatic equations.
SUM: Symbolic simplification speeds simulation.
SRC: Maplesoft, MapleSim documentation | primary | 2025 | https://www.maplesoft.com/products/maplesim/
SRC: Fritzson P, Principles of Object-Oriented Modeling and Simulation with Modelica 3.3 (Wiley 2014) | textbook | 2014 | https://www.wiley.com/
NUM1#maths-u27-45-q1@1: A MapleSim model connects a 2 kg mass to a spring of stiffness 200 N/m. What is the natural angular frequency in rad/s? | 10 | 0 | rad/s | ω = √(k/m) = √100 = 10 rad/s.
M1#maths-u27-45-q2@1: What characterises acausal modelling? | Components connect through physical ports without fixed input–output directions | Every block has a fixed input and output signal | All the equations must be written by hand | Only electrical systems can be modelled this way | It needs no equations, only diagrams | Physical connections impose conservation laws solved simultaneously.
M2#maths-u27-45-q3@2: Why does symbolic simplification help physical simulation? | Reducing and simplifying the DAEs before solving makes simulation faster and more robust | It changes the physics so the model runs faster | It removes all equations, leaving only parameters | It's only cosmetic and doesn't affect solving | It doesn't help; numerical solvers handle everything | Index reduction and elimination give smaller, better-conditioned systems.

## Simulink
S: Simulink, from MathWorks, is a graphical environment for modelling, simulating and analysing dynamic systems with block diagrams. Engineers build controllers, signal processing chains and plant models, then generate code for embedded hardware.
O: Build and simulate block-diagram models in Simulink
O: Choose solvers and describe code generation workflows
T: Block diagram | A model made of connected blocks, each transforming input signals into output signals over time
T: Variable-step solver | An ODE solver that adjusts its time step to meet error tolerances, such as ode45
H: Modelling
- Blocks: Gain, Sum, Integrator, Transfer Fcn, Scope.
- Signals flow along lines (causal modelling).
- Subsystems for hierarchy; libraries of blocks.
- Simscape for acausal physical modelling.
H: Simulation
- Fixed-step versus variable-step solvers.
- Stiff solvers (ode15s) for stiff systems.
- Algebraic loops need care.
- Logging and Scope for viewing results.
H: Engineering workflow
- Model-based design: simulate before building hardware.
- Automatic code generation (Embedded Coder) for microcontrollers.
- Hardware-in-the-loop testing.
- Used in automotive and aerospace control.
X: Model a first-order system with time constant 2 s in Simulink.
> Use a Step input feeding a Transfer Fcn block 1/(2s + 1)
> Connect a Scope to the output
> The response reaches about 63% of the final value at t = 2 s
K: Simulink models dynamic systems as causal block diagrams; solvers simulate them with fixed or variable steps; Simscape adds physical modelling; code generation supports model-based design.
!: Using a non-stiff solver on a stiff model, making simulation extremely slow.
Q: Which Simulink block integrates a signal over time? | The Integrator block.
Q: Which solver suits stiff systems? | A stiff solver such as ode15s.
SUM: Dynamic systems as block diagrams.
SUM: Simulate, then generate code.
SRC: MathWorks, Simulink documentation | primary | 2025 | https://www.mathworks.com/help/simulink/
SRC: Karris ST, Introduction to Simulink with Engineering Applications (3rd edn, Orchard Publications 2011) | textbook | 2011 | https://www.orchardpublications.com/
NUM1#maths-u27-46-q1@1: A Simulink model of ẋ = −2x uses one Integrator, one Gain of −2 and a feedback line. Starting from x = 1, what is x at t = 0.5 s, to 3 decimal places? | 0.368 | 0.001 |  | x(t) = e^{−2t}, so x(0.5) = e^{−1} ≈ 0.368.
M1#maths-u27-46-q2@1: Which Simulink block multiplies a signal by a constant? | Gain | Scope | Integrator | Mux | Clock | The Gain block multiplies its input by a constant factor, the basic building block for scaling signals.
M2#maths-u27-46-q3@2: What is an algebraic loop in Simulink? | A feedback loop with no delay or integrator, so a block's output depends instantly on itself | A feedback loop containing an Integrator block | A plotting error in the Scope block | A type of variable-step ODE solver | It doesn't exist in Simulink models | Without dynamics in the loop, Simulink must solve an implicit equation each step.

## Gurobi
S: Gurobi is a commercial optimisation solver for linear, quadratic and mixed-integer programming, founded in 2008 by Zonghao Gu, Edward Rothberg and Robert Bixby. It's among the fastest solvers available and is used in logistics, energy, finance and scheduling.
O: Formulate and solve models with Gurobi's Python API
O: Interpret solver logs, MIP gaps and parameters
T: MIP gap | The relative difference between the best solution found and the best bound; Gurobi stops when it falls below MIPGap
T: Presolve | Automatic simplification of a model before solving, removing redundant constraints and tightening bounds
H: Modelling
- gurobipy: m = gp.Model(); x = m.addVar(); m.addConstr(...); m.setObjective(...); m.optimize().
- Linear, quadratic and integer variables.
- Also accessed via AMPL, JuMP, Pyomo and other tools.
- Academic licences are free.
H: Inside the solver
- Presolve, LP relaxations (simplex and barrier).
- Branch and cut with cutting planes.
- Primal heuristics for early solutions.
- Parallel search on many cores.
H: Reading results
- Status codes: OPTIMAL, INFEASIBLE, TIME_LIMIT.
- Log shows incumbent, bound and gap over time.
- Parameters: TimeLimit, MIPGap, Threads.
- IIS (irreducible infeasible subsystem) to diagnose infeasibility.
X: Solve a small knapsack problem with gurobipy.
> x = m.addVars(3, vtype=GRB.BINARY); m.setObjective(6*x[0] + 5*x[1] + 4*x[2], GRB.MAXIMIZE)
> m.addConstr(4*x[0] + 3*x[1] + 2*x[2] <= 6); m.optimize()
> Gurobi chooses items 0 and 2 with value 10 and reports a 0% gap
K: Gurobi solves LP, QP and MIP models quickly using presolve, relaxations, branch and cut and heuristics; models are built with gurobipy or modelling languages; logs show the MIP gap; IIS diagnoses infeasibility.
!: Treating a time-limited MIP solution as optimal without checking the reported gap.
Q: What does the MIP gap measure? | The relative difference between the best solution and the best bound.
Q: What tool finds the cause of infeasibility in Gurobi? | The irreducible infeasible subsystem (IIS).
SUM: Fast commercial MIP solving.
SUM: Read the gap and status.
SRC: Gurobi Optimization LLC, Gurobi Optimizer reference manual | primary | 2025 | https://docs.gurobi.com/
SRC: Bixby RE, A brief history of linear and mixed-integer programming computation, Documenta Mathematica Extra Volume ISMP, 107 | journal | 2012 | https://www.math.uni-bielefeld.de/documenta/
NUM1#maths-u27-47-q1@1: Gurobi reports incumbent 950 and best bound 1000 in a maximisation. What is the gap relative to the incumbent, in %, to 2 decimal places? | 5.26 | 0.01 | % | (1000 − 950)/950 ≈ 0.0526.
M1#maths-u27-47-q2@1: Which Gurobi status means the time limit stopped the solve before proving optimality? | TIME_LIMIT | OPTIMAL | INFEASIBLE | UNBOUNDED | LOADED | The best solution so far is returned with a remaining gap.
M3#maths-u27-47-q3@2: Why compute an IIS when a model is infeasible? | It isolates a minimal set of conflicting constraints, showing where the formulation is wrong | It makes the model feasible automatically | It speeds up solving of feasible models | It deletes constraints at random until feasible | It isn't useful for debugging infeasibility | Large models are hard to debug without knowing which constraints clash.

## IBM ILOG CPLEX
S: CPLEX is a commercial optimisation solver for linear, quadratic and mixed-integer programming, originally developed by Robert Bixby from 1988 and now owned by IBM. One of the first high-performance MIP solvers, it remains widely used in industry and research.
O: Describe CPLEX's capabilities and interfaces
O: Compare commercial and open-source optimisation solvers
T: OPL | Optimization Programming Language, IBM's modelling language for CPLEX and its constraint programming solver
T: Barrier method | CPLEX's interior-point algorithm for large linear and quadratic programs
H: Capabilities
- LP (primal and dual simplex, barrier), QP, QCP.
- MIP with branch and cut.
- Constraint programming via CP Optimizer.
- Python (docplex), C, C++, Java and MATLAB APIs.
H: History
- Named after the simplex method and the C language.
- CPLEX Optimization Inc. (1988) → ILOG (1997) → IBM (2009).
- Speed-ups of many orders of magnitude since the 1990s.
H: Choosing solvers
- Commercial: CPLEX, Gurobi, Xpress (free academic licences).
- Open source: HiGHS, SCIP, CBC.
- Benchmarks (Mittelmann) compare performance.
- Modelling layers allow switching solvers easily.
X: Solve a linear program with CPLEX through docplex.
> mdl = Model(); x = mdl.continuous_var(); y = mdl.continuous_var()
> mdl.maximize(3*x + 2*y); mdl.add_constraint(x + y <= 4); mdl.add_constraint(x + 3*y <= 6)
> mdl.solve() returns x = 4, y = 0 with objective 12
K: CPLEX solves LP, QP and MIP problems with simplex, barrier and branch and cut, plus constraint programming; OPL and many APIs access it; open-source solvers like HiGHS and SCIP are alternatives.
!: Locking a model to one solver's API when a modelling layer would allow comparing solvers.
Q: Who owns CPLEX today? | IBM.
Q: Name an open-source alternative to CPLEX. | HiGHS (or SCIP, CBC).
SUM: A pioneering MIP solver.
SUM: Compare solvers on your problems.
SRC: IBM, IBM ILOG CPLEX Optimization Studio documentation | primary | 2025 | https://www.ibm.com/docs/en/icos
SRC: Bixby RE, Solving real-world linear programs: a decade and more of progress, Operations Research 50(1), 3 | journal | 2002 | https://doi.org/10.1287/opre.50.1.3.17780
NUM1#maths-u27-48-q1@1: A solver improves 10× every 5 years. What total speed-up does that give over 20 years? | 10000 | 0 | times | Four periods of 10× give 10^{4} = 10,000.
M1#maths-u27-48-q2@1: Which CPLEX algorithm is an interior-point method? | The barrier method | Primal simplex | Dual simplex | Branch and bound | Gomory cuts only | Barrier methods follow the central path through the interior.
M2#maths-u27-48-q3@2: Why use a modelling layer such as Pyomo or JuMP with CPLEX? | It lets the same model run on different solvers, making comparison and switching easy | It makes CPLEX free for commercial use | It replaces the solver with its own algorithm | It removes constraints the solver can't handle | There's no reason to use a modelling layer | Solver performance varies by problem, so portability helps.

## OR-Tools
S: Google OR-Tools is a free, open-source software suite for combinatorial optimisation. It includes the award-winning CP-SAT constraint solver, vehicle routing tools, network flow algorithms and wrappers for linear and integer programming solvers.
O: Model scheduling and assignment problems with CP-SAT
O: Use OR-Tools for routing and linear optimisation
T: CP-SAT | OR-Tools' constraint programming solver built on SAT techniques, strong for scheduling and integer problems
T: Vehicle routing problem | Finding routes for a fleet to serve customers at least cost, subject to capacities and time windows
H: Components
- CP-SAT for constraint programming and integer models.
- Routing library for TSP and VRP with time windows.
- Graph algorithms: max flow, min-cost flow, assignment.
- Linear solver wrapper (GLOP, SCIP, HiGHS, Gurobi).
H: Modelling with CP-SAT
- model = cp_model.CpModel(); integer variables with bounds.
- Constraints: linear, AllDifferent, NoOverlap (scheduling), interval variables.
- Objective and solver.Solve(model).
- Integer-only: scale decimals.
H: Context
- Won many MiniZinc Challenge medals.
- Python, C++, Java and C# APIs.
- Apache 2.0 licence.
- Good for prototyping and production.
X: Assign 3 workers to 3 tasks with CP-SAT so that each worker does one task.
> Create Boolean variables x[w, t] and require Σ_{t} x[w, t] = 1 and Σ_{w} x[w, t] = 1
> Minimise Σ cost[w][t] × x[w, t]
> solver.Solve(model) returns an optimal assignment and its cost
K: OR-Tools offers CP-SAT for constraint and integer problems, routing tools for VRPs, graph algorithms and LP wrappers; CP-SAT needs integer models; it's free and widely used.
!: Passing non-integer coefficients to CP-SAT, which requires integers (scale them first).
Q: What is CP-SAT? | OR-Tools' constraint programming solver based on SAT techniques.
Q: What problem does the OR-Tools routing library solve? | Vehicle routing problems, including the TSP.
SUM: Free combinatorial optimisation.
SUM: CP-SAT shines at scheduling.
SRC: Google, OR-Tools documentation | primary | 2025 | https://developers.google.com/optimization
SRC: Perron L, Didier F, CP-SAT (Google OR-Tools) | primary | 2024 | https://github.com/google/or-tools
NUM1#maths-u27-49-q1@1: An AllDifferent constraint assigns 4 workers to 4 distinct shifts. How many assignments satisfy it? | 24 | 0 | assignments | 4! = 24 permutations.
M1#maths-u27-49-q2@1: Which OR-Tools constraint keeps scheduled tasks on one machine from overlapping? | NoOverlap | AllDifferent only | LinearEquality | Max flow | Minimise | NoOverlap applies to interval variables representing tasks.
M2#maths-u27-49-q3@2: Why must CP-SAT models use integers? | The solver works over integer domains, so fractional data must be scaled to integers | Integers are faster to type than decimals | Decimals always make the model infeasible | It doesn't need integers; any number works | It converts decimals to integers by itself | Multiplying by 100 turns £12.34 into 1234 for an exact integer model.

## CVXPY
S: CVXPY is an open-source Python library for convex optimisation using disciplined convex programming. You write the problem in natural mathematical form, CVXPY verifies convexity by construction rules and passes it to a suitable solver.
O: Formulate convex problems in CVXPY
O: Explain disciplined convex programming rules and DCP errors
T: Disciplined convex programming | A rule set for building expressions from known convex and concave atoms so convexity is guaranteed and checkable
T: Atom | A function with known curvature and monotonicity, such as norm, square, log or sum
H: Writing problems
- x = cp.Variable(n); objective = cp.Minimize(cp.sum_squares(A @ x − b)).
- constraints = [x >= 0, cp.sum(x) == 1].
- prob = cp.Problem(objective, constraints); prob.solve().
- Results in x.value and prob.value.
H: DCP rules
- Minimise convex or maximise concave objectives.
- Constraints: convex ≤ concave, affine == affine.
- Composition rules check curvature (convex non-decreasing of convex is convex).
- A DCPError means the expression's convexity can't be verified, even if it's convex.
H: Solvers and uses
- Solvers: OSQP, SCS, ECOS, Clarabel, commercial ones.
- Portfolio optimisation, signal recovery, control (MPC).
- Parameters for fast re-solving.
- Diamond and Boyd (2016).
X: Find non-negative weights summing to 1 that minimise ‖Ax − b‖ with CVXPY.
> x = cp.Variable(n); prob = cp.Problem(cp.Minimize(cp.norm(A @ x - b)), [x >= 0, cp.sum(x) == 1])
> prob.solve() checks DCP rules and calls a conic solver
> x.value holds the optimal weights
K: CVXPY expresses convex problems in mathematical form; DCP rules guarantee convexity; it dispatches to suitable solvers; DCP errors flag unverifiable formulations.
!: Writing x*y or sqrt(x)^2 forms that break DCP rules, causing DCPError despite a convex intent.
Q: What does DCP guarantee? | That the problem built from the rules is convex.
Q: Where does CVXPY store the optimal variable values? | In variable.value.
SUM: Convex problems in natural notation.
SUM: DCP rules certify convexity.
SRC: Diamond S, Boyd S, CVXPY: a Python-embedded modeling language for convex optimization, Journal of Machine Learning Research 17(83), 1 | journal | 2016 | https://jmlr.org/papers/v17/15-408.html
SRC: Grant M, Boyd S, Ye Y, Disciplined convex programming, in Global Optimization: From Theory to Implementation (Springer 2006), 155 | textbook | 2006 | https://link.springer.com/
NUM1#maths-u27-50-q1@1: CVXPY minimises (x − 3)^{2} subject to x ≤ 1. What is the optimal value prob.value? | 4 | 0 |  | The constrained optimum is at x = 1, giving (1 − 3)^{2} = 4.
M1#maths-u27-50-q2@1: Which objective follows DCP rules? | Minimise cp.norm(x, 2) | Maximise cp.norm(x, 2) | Minimise cp.log(x) | Maximise cp.square(x) | Minimise cp.sqrt(x) | Minimising a convex norm is DCP; the others minimise concave or maximise convex expressions.
M3#maths-u27-50-q3@2: Why can CVXPY reject a problem that is actually convex? | DCP verifies convexity only via its rules, so non-DCP forms of convex expressions fail | CVXPY can't solve any convex problem, only linear ones | All convex problems are rejected unless written as LPs | DCP proves the problem isn't convex when it rejects it | It never rejects convex problems written in any form | Rewriting the expression with suitable atoms (such as norm instead of sqrt of a sum of squares) fixes it.
`;
