// School 26: Mathematical Reasoning and Research Methods. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Reasoning, approximation and uncertainty, research practice and communication.
export default `
## Mathematical Reasoning
S: Mathematical reasoning is the disciplined thinking that turns observations into conjectures and conjectures into proofs. It combines intuition, pattern-spotting and logical rigour, and it's a skill that can be practised and improved like any other.
O: Describe the cycle of exploring, conjecturing and proving
O: Use specialising, generalising and counterexamples to reason about problems
T: Conjecture | A statement believed to be true, supported by evidence but not yet proved
T: Specialising | Trying particular cases to understand a problem before tackling it in general
H: The cycle
- Explore: try examples, draw pictures, compute small cases.
- Conjecture: state a precise claim that fits the evidence.
- Test: look hard for counterexamples.
- Prove or refine the conjecture.
H: Habits of mind
- Specialise then generalise (Pólya, Mason).
- Ask "what if?" by changing hypotheses.
- Look for invariants and symmetries.
- Keep track of what's assumed and what's shown.
H: Rigour and intuition
- Intuition suggests; proof confirms.
- Pictures help but can mislead (proofs without words still need checking).
- Precise definitions remove ambiguity.
- Mistakes are normal; checking catches them.
X: Explore the sums 1, 1 + 3, 1 + 3 + 5, … and form a conjecture.
> Values: 1, 4, 9, 16, 25
> These are perfect squares: the sum of the first n odd numbers seems to be n^{2}
> Test more cases, then prove it (by induction or by arranging dots in a square)
K: Mathematical reasoning cycles through exploring, conjecturing, testing and proving; specialising, generalising, invariants and counterexamples are key habits; intuition and rigour work together.
!: Treating a pattern that fits several cases as proved.
Q: What is a conjecture? | A statement believed true but not yet proved.
Q: What does specialising mean? | Trying particular cases to understand a problem.
SUM: Explore, conjecture, test, prove.
SUM: Habits of mind can be practised.
SRC: Pólya G, How to Solve It (Princeton University Press 1945; 2nd edn 1957) | textbook | 1957 | https://press.princeton.edu/
SRC: Mason J, Burton L, Stacey K, Thinking Mathematically (2nd edn, Pearson 2010) | textbook | 2010 | https://www.pearson.com/
NUM1#maths-u26-01-q1@1: Using the pattern that the first n odd numbers sum to n^{2}, what is 1 + 3 + 5 + … + 39? | 400 | 0 |  | There are 20 odd numbers up to 39, so the sum is 20^{2} = 400.
M1#maths-u26-01-q2@1: What is the best response to a conjecture that holds for the first ten cases? | Look for counterexamples and then try to prove it | Accept it as proved, since ten cases is plenty | Check one more case, then call it a theorem | Abandon it, since patterns usually break | Publish it as a theorem without proof | Patterns can fail later, so the conjecture needs testing and proof.
M2#maths-u26-01-q3@2: Why do mathematicians specialise before generalising? | Particular cases reveal structure and suggest what the general statement and proof should be | Special cases are always enough, so no general statement is ever needed | Generalising is never useful until every special case has been checked | It avoids the need for a proof, since examples settle the question | They don't; mathematicians always begin with the most general case | Working examples builds the intuition that guides a general argument.

## Mathematical Proofs
S: A mathematical proof is a convincing argument that a statement follows from definitions, axioms and accepted results. Writing a good proof means choosing a strategy, laying out steps clearly and checking that nothing is assumed that hasn't been shown.
O: Structure proofs with clear hypotheses, steps and conclusions
O: Read and check proofs critically
T: Lemma | A smaller result proved to help prove a larger theorem
T: Corollary | A result that follows readily from a theorem just proved
H: Structure
- State what's given and what's to be proved.
- Choose a strategy: direct, contrapositive, contradiction, induction, cases, construction.
- Justify each step by definitions or earlier results.
- End by clearly concluding the statement.
H: Organisation
- Break long arguments into lemmas.
- Use notation consistently and define it before use.
- Separate the main idea from routine detail.
- Corollaries record useful consequences.
H: Checking proofs
- Does every step follow? Are all cases covered?
- Are hypotheses actually used? (If not, maybe the result is stronger, or the proof is wrong.)
- Test the argument on an example.
- Peer review and formal verification catch errors.
X: Check the "proof" that 1 = 2: let a = b; then a^{2} = ab, a^{2} − b^{2} = ab − b^{2}, (a + b)(a − b) = b(a − b), so a + b = b, giving 2b = b and 2 = 1.
> Every step is valid algebra except one
> Dividing both sides by (a − b) is dividing by zero, since a = b
> That single invalid step breaks the whole argument
K: Proofs state hypotheses, follow a strategy and justify each step; lemmas organise long proofs; critical reading checks every step, case and hypothesis.
!: Dividing by an expression without checking that it can't be zero.
Q: What is a lemma? | A helping result used to prove a theorem.
Q: What should you suspect if a proof never uses one of its hypotheses? | Either the result is stronger than stated or the proof has a gap.
SUM: Proofs justify every step.
SUM: Read them critically.
SRC: Velleman DJ, How to Prove It: A Structured Approach (3rd edn, Cambridge University Press 2019) | textbook | 2019 | https://www.cambridge.org/
SRC: Houston K, How to Think Like a Mathematician (Cambridge University Press 2009) | textbook | 2009 | https://www.cambridge.org/
NUM1#maths-u26-02-q1@1: In the faulty proof that 1 = 2, which step number (counting a = b as step 1, a^{2} = ab as step 2, a^{2} − b^{2} = ab − b^{2} as step 3, the factorisation as step 4 and a + b = b as step 5) contains the error? | 5 | 0 |  | Getting from step 4 to step 5 divides by a − b = 0.
M1#maths-u26-02-q2@1: What is a corollary? | A result that follows readily from a theorem | An unproved conjecture awaiting proof | A definition introduced before a theorem | An axiom accepted without any proof | A counterexample to a general claim | Corollaries are quick consequences of a main result.
M2#maths-u26-02-q3@2: Why should a proof be tested on a specific example? | Seeing the steps work on a concrete case can expose hidden errors or gaps | Examples prove the general case, so testing completes the proof | It replaces the proof entirely once one example works | Examples are never useful for checking a proof's steps | It shouldn't be; examples only confuse the reader | A step that fails on an example can't be valid in general.

## Deductive Reasoning
S: Deductive reasoning draws conclusions that must be true if the premises are true. It's the logic of proof, and valid argument forms such as modus ponens guarantee correctness, while common fallacies look similar but don't.
O: Distinguish valid and invalid argument forms
O: Separate validity from soundness
T: Valid argument | An argument where the conclusion must be true whenever all premises are true
T: Sound argument | A valid argument whose premises are actually true
H: Valid forms
- Modus ponens: P → Q, P; therefore Q.
- Modus tollens: P → Q, not Q; therefore not P.
- Hypothetical syllogism: P → Q, Q → R; therefore P → R.
- Disjunctive syllogism: P or Q, not P; therefore Q.
H: Fallacies
- Affirming the consequent: P → Q, Q; therefore P (invalid).
- Denying the antecedent: P → Q, not P; therefore not Q (invalid).
- Circular reasoning: assuming the conclusion.
- Equivocation: shifting the meaning of a term.
H: Validity and truth
- Valid arguments can have false conclusions if a premise is false.
- Invalid arguments can have true conclusions by luck.
- Soundness needs both validity and true premises.
- Truth tables check propositional validity.
X: "If it's a square, it has four sides. This shape has four sides. So it's a square." Is the argument valid?
> Form: P → Q, Q; therefore P
> This is affirming the consequent
> Invalid: a rectangle or rhombus has four sides without being a square
K: Deduction guarantees conclusions from true premises; modus ponens and tollens are valid; affirming the consequent and denying the antecedent are fallacies; soundness adds true premises.
!: Affirming the consequent: reasoning from Q back to P.
Q: What does modus tollens conclude from P → Q and not Q? | Not P.
Q: What makes an argument sound? | It is valid and its premises are true.
SUM: Valid forms guarantee conclusions.
SUM: Watch for look-alike fallacies.
SRC: Hurley PJ, Watson L, A Concise Introduction to Logic (13th edn, Cengage 2018) | textbook | 2018 | https://www.cengage.com/
SRC: Enderton HB, A Mathematical Introduction to Logic (2nd edn, Academic Press 2001) | textbook | 2001 | https://www.elsevier.com/
NUM1#maths-u26-03-q1@1: How many rows of a truth table must be checked to test the validity of an argument with 3 propositional variables? | 8 | 0 | rows | Each variable is true or false, giving 2^{3} = 8 rows.
M1#maths-u26-03-q2@1: Which argument form is valid? | If P then Q; not Q; therefore not P | If P then Q; Q; therefore P | If P then Q; not P; therefore not Q | P or Q; P; therefore not Q | If P then Q; therefore Q | Modus tollens is valid; the others are fallacies or unwarranted.
M2#maths-u26-03-q3@2: Why can a valid argument have a false conclusion? | Validity guarantees truth only when every premise is true; a false premise can lead to a false conclusion | Valid arguments always have true conclusions, whatever their premises | Validity depends on whether the conclusion turns out to be true | A false conclusion automatically makes the argument invalid | It can't; validity and truth are the same property | Validity is about form, not the actual truth of premises.

## Inductive Reasoning
S: Inductive reasoning generalises from examples to broader claims. It's how conjectures, scientific laws and statistical inferences arise, but its conclusions are probable rather than certain, unlike mathematical induction, which is a form of deduction.
O: Distinguish inductive reasoning from mathematical induction
O: Judge the strength of inductive generalisations
T: Inductive generalisation | Inferring a general rule from observed cases, such as "all observed swans are white, so all swans are white"
T: Strength of induction | How strongly the evidence supports the conclusion, depending on sample size, variety and representativeness
H: In mathematics
- Patterns in data suggest conjectures (Gauss and the primes).
- Numerical experiments test them.
- Proof is still required: patterns can break.
- Mathematical induction is deductive, despite its name.
H: Famous failures
- n^{2} + n + 41 is prime for n = 0 to 39, but not for n = 40.
- Pólya's conjecture held up to about 9 × 10^{8} before failing.
- Points on a circle joined by chords: regions 1, 2, 4, 8, 16, then 31 (not 32).
H: Judging strength
- Larger, more varied samples give stronger support.
- Look for mechanisms that explain the pattern.
- Consider alternative explanations.
- Bayesian reasoning quantifies support.
X: Joining n points on a circle with all chords gives 1, 2, 4, 8, 16 regions for n = 1 to 5. Predict n = 6, then check.
> The pattern suggests 2^{5} = 32 regions
> Counting carefully (points in general position) gives 31
> The doubling pattern fails, showing why proofs are needed
K: Inductive reasoning generalises from cases to probable conclusions; it suggests conjectures; famous patterns fail later; mathematical induction is deductive; strength depends on evidence quality.
!: Confusing inductive generalisation with mathematical induction.
Q: Is mathematical induction a form of inductive reasoning? | No, it's deductive.
Q: How many regions do 6 points on a circle give with all chords? | 31.
SUM: Patterns suggest; proofs confirm.
SUM: Inductive conclusions are probable.
SRC: Pólya G, Mathematics and Plausible Reasoning, Volume 1: Induction and Analogy in Mathematics (Princeton University Press 1954) | textbook | 1954 | https://press.princeton.edu/
SRC: Guy RK, The strong law of small numbers, American Mathematical Monthly 95(8), 697 | journal | 1988 | https://doi.org/10.1080/00029890.1988.11972074
NUM1#maths-u26-04-q1@1: For the circle-chord problem, the number of regions for n points is 1 + C(n, 2) + C(n, 4). What is it for n = 7? | 57 | 0 | regions | 1 + 21 + 35 = 57.
M1#maths-u26-04-q2@1: Which conclusion comes from inductive reasoning? | The Sun has risen every day observed, so it will rise tomorrow | 2 + 2 = 4 from the axioms | All squares have four sides by definition | A proof by mathematical induction | A valid syllogism | It generalises from past observations, so it's probable rather than certain.
M3#maths-u26-04-q3@2: What does Guy's "strong law of small numbers" warn about? | Small numbers are too few for all the patterns asked of them, so coincidences pose as rules | Small numbers are always prime, so patterns among them are rules | Patterns found in small numbers are always true for large ones | Large numbers behave randomly, so only small cases matter | It warns about nothing; it's a joke with no mathematical content | Many early patterns are coincidences that break down later.

## Abstract Reasoning
S: Abstract reasoning strips away specific details to reveal common structure, so one argument applies to many situations. Groups, vector spaces and metric spaces are abstractions that unify arithmetic, geometry and analysis.
O: Identify common structure across different examples
O: Explain the benefits and costs of abstraction
T: Abstraction | Isolating the essential properties shared by many examples and studying them in general
T: Structure-preserving map | A function respecting the relevant operations, such as a homomorphism or continuous map
H: Examples of abstraction
- Groups: integers under addition, rotations of a square, permutations.
- Vector spaces: arrows, polynomials, signals.
- Graphs: road networks, friendships, molecules.
- Metric spaces: any setting with a notion of distance.
H: Benefits
- Prove once, apply everywhere.
- Reveal hidden connections (topology and algebra, number theory and geometry).
- Simplify by removing irrelevant details.
- Enable classification of all structures of a kind.
H: Costs and balance
- Abstract definitions can feel unmotivated without examples.
- Move between examples and theory.
- Category theory as abstraction of abstraction.
- Good notation helps manage complexity.
X: What do addition of integers, multiplication of non-zero reals and composition of rotations have in common?
> Each combines two elements to give another of the same kind
> Each is associative, has an identity (0, 1, the zero rotation) and inverses
> They are all groups, so every theorem about groups applies to all three
K: Abstraction isolates shared structure; groups, vector spaces, graphs and metric spaces unify many examples; one proof covers all instances; balance theory with concrete examples.
!: Learning abstract definitions without connecting them to concrete examples.
Q: What is the payoff of proving a theorem for all groups? | It applies to every specific group at once.
Q: What is a structure-preserving map? | A map respecting the relevant operations or relations.
SUM: Abstraction reveals common structure.
SUM: Examples keep it grounded.
SRC: Gowers T (ed), The Princeton Companion to Mathematics (Princeton University Press 2008) | textbook | 2008 | https://press.princeton.edu/
SRC: Cheng E, How to Bake Pi: An Edible Exploration of the Mathematics of Mathematics (Basic Books 2015) | textbook | 2015 | https://www.basicbooks.com/
NUM1#maths-u26-05-q1@1: The rotations of a square form a group. How many elements does it have? | 4 | 0 | elements | Rotations by 0°, 90°, 180° and 270°.
M1#maths-u26-05-q2@1: Which collection forms a group under the stated operation? | The integers under addition | The natural numbers under subtraction | The integers under multiplication | The positive integers under addition | All real numbers under multiplication | Integers under addition have an identity (0) and inverses; the others lack inverses or closure.
M2#maths-u26-05-q3@2: Why does abstraction make mathematics more efficient? | A result proved for the structure holds in every example of it | Abstraction makes every proof longer, but easier to read | Examples become unnecessary once a structure is defined | It removes all theorems, leaving only definitions | It doesn't; each example still needs its own proof | Lagrange's theorem, proved once for groups, applies to every finite group.

## Quantitative Reasoning
S: Quantitative reasoning uses numbers, units, proportions and data to understand and decide. It underpins everyday judgements, from comparing risks and prices to reading statistics in the news, and it guards against common numerical fallacies.
O: Reason with proportions, percentages, rates and units
O: Recognise misleading uses of numbers and statistics
T: Percentage point | An absolute difference between percentages, such as 10% to 12% being a rise of 2 percentage points (20% relative)
T: Base rate | The background frequency of something in a population, essential for interpreting test results
H: Core tools
- Proportions and rates; units and dimensional checks.
- Percentages: relative versus absolute changes.
- Orders of magnitude and estimation.
- Weighted averages.
H: Common traps
- Base-rate neglect in medical tests.
- Relative risk sounds bigger than absolute risk.
- Simpson's paradox: trends reverse when groups combine.
- Misleading graphs with truncated axes.
H: Good practice
- Ask "compared with what?" and "per what?"
- Convert to natural frequencies ("10 in 1000").
- Check units and plausibility.
- Look for the denominator.
X: A test is 90% sensitive and 90% specific for a disease with prevalence 1%. What fraction of positive results are true positives?
> Of 1000 people: 10 have the disease, 9 test positive
> Of 990 without it, 10% (99) test positive
> True positives 9/(9 + 99) ≈ 8%: most positives are false
K: Quantitative reasoning uses proportions, rates, units and estimation; base rates, relative versus absolute risk and Simpson's paradox are classic traps; natural frequencies clarify reasoning.
!: Reporting only relative risk, which can make tiny absolute changes sound dramatic.
Q: What's the difference between a percentage-point and a percentage change? | Percentage points are absolute differences; percentage change is relative.
Q: What is base-rate neglect? | Ignoring how common something is when interpreting evidence.
SUM: Numbers need context.
SUM: Use natural frequencies.
SRC: Gigerenzer G, Reckoning with Risk: Learning to Live with Uncertainty (Penguin 2003) | textbook | 2003 | https://www.penguin.co.uk/
SRC: Spiegelhalter D, The Art of Statistics: Learning from Data (Pelican 2019) | textbook | 2019 | https://www.penguin.co.uk/
NUM1#maths-u26-06-q1@1: A risk rises from 2 in 1000 to 3 in 1000. What is the relative increase in %? | 50 | 0 | % | (3 − 2)/2 = 0.5, a 50% relative rise but only 1 in 1000 in absolute terms.
M1#maths-u26-06-q2@1: An interest rate rises from 4% to 5%. Which description is correct? | A rise of 1 percentage point, or 25% in relative terms | A rise of 1% in relative terms only | A rise of 25 percentage points | A rise of 5% in absolute terms | No change, since both are small | The absolute change is 5 − 4 = 1 percentage point, while the relative change is 1/4 = 25%, which is why the two descriptions sound so different.
M3#maths-u26-06-q3@2: What does Simpson's paradox show? | A trend in every subgroup can reverse when unequal groups are combined | Averages always agree across subgroups and combined groups | Combining groups never changes the direction of a trend | Subgroups are always misleading compared with totals | It shows nothing beyond ordinary sampling error | Unequal group weights can flip the aggregate comparison.

## Problem Solving
S: Mathematical problem solving is the art of tackling unfamiliar problems without a ready-made method. Pólya's four steps, understand, plan, carry out and look back, and a toolkit of heuristics make it a learnable skill.
O: Apply Pólya's four-step problem-solving process
O: Use heuristics such as working backwards, simplifying and looking for invariants
T: Heuristic | A rule of thumb that often helps find a solution, such as drawing a diagram or solving a simpler problem
T: Invariant | A quantity that doesn't change under the allowed moves, used to prove some outcomes impossible
H: Pólya's steps
- Understand the problem: what's known, unknown, the conditions?
- Devise a plan: related problems, heuristics.
- Carry out the plan, checking each step.
- Look back: check, generalise, find another method.
H: Heuristics
- Draw a diagram; introduce notation.
- Try small cases; look for patterns.
- Work backwards from the goal.
- Use symmetry, extreme cases, the pigeonhole principle, invariants.
H: Mindset
- Getting stuck is part of the process.
- Record attempts; change representation.
- Take breaks: incubation helps.
- Collaborate and explain ideas aloud.
X: A chessboard has two opposite corners removed. Can it be covered by 31 dominoes?
> Each domino covers one black and one white square
> Opposite corners are the same colour, so 32 of one colour and 30 of the other remain
> 31 dominoes cover 31 of each, so it's impossible (a colouring invariant)
K: Pólya's four steps structure problem solving; heuristics include diagrams, small cases, working backwards, symmetry and invariants; persistence and reflection matter.
!: Skipping the "look back" step, missing errors and generalisations.
Q: What are Pólya's four steps? | Understand, plan, carry out, look back.
Q: What is an invariant? | A quantity unchanged by allowed moves.
SUM: Problem solving can be learned.
SUM: Heuristics open doors.
SRC: Pólya G, How to Solve It (Princeton University Press 1945; 2nd edn 1957) | textbook | 1957 | https://press.princeton.edu/
SRC: Zeitz P, The Art and Craft of Problem Solving (3rd edn, Wiley 2017) | textbook | 2017 | https://www.wiley.com/
NUM1#maths-u26-07-q1@1: By the pigeonhole principle, how many people guarantee two share a birth month? | 13 | 0 | people | With 12 months, 13 people force at least two into the same month.
M1#maths-u26-07-q2@1: Which heuristic suits a problem that asks how to reach a known final state? | Working backwards from the goal | Guessing randomly | Ignoring the conditions | Adding more unknowns | Skipping the plan | Reversing steps from the end often reveals the path.
M2#maths-u26-07-q3@2: Why are invariants useful for proving something impossible? | If moves preserve a quantity, states with another value are unreachable | Invariants always change with each move, tracking progress | They only show what is possible, never what is impossible | They replace calculation entirely in every problem | They aren't useful for impossibility, only for counting | The domino colouring argument rules out a tiling without trying every arrangement.

## Estimation
S: Estimation finds approximate answers quickly using rounding, known reference values and sensible assumptions. Fermi problems, such as estimating the number of piano tuners in a city, show how to get within a factor of a few with almost no data.
O: Solve Fermi problems by breaking them into estimable parts
O: Use orders of magnitude and sanity checks
T: Order of magnitude | The power of 10 nearest a quantity, such as 10^{3} for 2500
T: Fermi problem | A question answered by chaining rough estimates of factors whose product gives the result
H: Techniques
- Break the quantity into factors you can estimate.
- Round to one significant figure or powers of 10.
- Use known anchors: UK population about 68 million, a year about 3 × 10^{7} s.
- Errors in factors often partly cancel.
H: Checking
- Does the answer have the right units?
- Is it plausible against known facts?
- Bound it above and below.
- Compare with a different estimation route.
H: Uses
- Planning and feasibility checks.
- Spotting errors in calculations and reports.
- Interviews and science communication.
- Physics: estimates before detailed models.
X: Estimate how many heartbeats a person has in a lifetime.
> About 70 beats a minute ≈ 10^{2} per minute ≈ 10^{5} per day (1440 minutes)
> About 80 years ≈ 3 × 10^{4} days
> Total ≈ 70 × 1440 × 29,000 ≈ 3 × 10^{9} heartbeats
K: Estimation breaks problems into factors, rounds sensibly and uses anchors; orders of magnitude and sanity checks catch errors; Fermi problems show how far rough reasoning goes.
!: Giving an estimate with false precision, such as "3,014,567,200 heartbeats".
Q: About how many seconds are in a year? | About 3 × 10^{7}.
Q: What is a Fermi problem? | An estimate built from chaining rough factors.
SUM: Rough answers fast.
SUM: Check plausibility.
SRC: Weinstein L, Adam JA, Guesstimation: Solving the World's Problems on the Back of a Cocktail Napkin (Princeton University Press 2008) | textbook | 2008 | https://press.princeton.edu/
SRC: Mahajan S, Street-Fighting Mathematics (MIT Press 2010) | textbook | 2010 | https://mitpress.mit.edu/
NUM1#maths-u26-08-q1@1: To the nearest power of 10, how many minutes are in a year (give the exponent)? | 6 | 0 |  | 365 × 24 × 60 = 525,600, and log₁₀ 525,600 ≈ 5.72, which is nearer 6 than 5, so the nearest power of 10 is 10^{6}.
M1#maths-u26-08-q2@1: What is the order of magnitude of 4700? | 10^{4} | 10^{3} | 10^{2} | 10^{5} | 10^{1} | 4700 is closer to 10^{4} than 10^{3} on a logarithmic scale (log₁₀ 4700 ≈ 3.67).
M2#maths-u26-08-q3@2: Why do Fermi estimates often land within a factor of a few of the truth? | Over- and under-estimates in independent factors tend to partly cancel | Every factor in a Fermi estimate is known exactly | Rounding always errs in the same direction, which helps | They're never close; Fermi estimates are just guesses | They use precise data from official statistics | Multiplying several rough factors averages their errors in log terms.

## Approximation
S: Approximation replaces exact quantities or functions by simpler ones that are close enough for the purpose. Linearisation, truncated series, small-angle rules and asymptotic forms make problems tractable, provided you know how big the error is.
O: Use linear and series approximations with error bounds
O: Choose approximations appropriate to the accuracy needed
T: Linear approximation | f(a + h) ≈ f(a) + f′(a)h for small h
T: Small-angle approximation | sin θ ≈ θ, tan θ ≈ θ and cos θ ≈ 1 − θ^{2}/2 for θ in radians near 0
H: Techniques
- Taylor polynomials with remainder bounds.
- Binomial approximation (1 + x)ⁿ ≈ 1 + nx for small x.
- Leading-order asymptotics for large or small parameters.
- Replacing sums by integrals.
H: Error awareness
- Remainder term: error ≤ M|h|^{n+1}/(n + 1)! for Taylor degree n.
- Relative versus absolute accuracy.
- Approximations valid only in a range.
- Check against an exact value where possible.
H: Uses
- Engineering rules of thumb.
- Physics models (pendulums, optics).
- Mental arithmetic: √101 ≈ 10.05.
- Numerical methods build on approximations.
X: Approximate √101 using linearisation at 100.
> f(x) = √x, f′(x) = 1/(2√x)
> √101 ≈ 10 + (1/20) × 1 = 10.05
> The true value is 10.0499, so the error is about 0.0001
- Stirling's formula approximates n! for large n with a small relative error.
K: Approximations replace hard quantities with simpler ones; linear, Taylor, binomial and small-angle forms are standard; error bounds and valid ranges must be known.
!: Using a small-angle approximation with degrees instead of radians.
Q: What is the binomial approximation for (1 + x)ⁿ? | 1 + nx for small x.
Q: For which unit is sin θ ≈ θ valid? | Radians.
SUM: Approximate with known error.
SUM: Know the valid range.
SRC: Stewart J, Calculus: Early Transcendentals (9th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.com/
SRC: Bender CM, Orszag SA, Advanced Mathematical Methods for Scientists and Engineers (McGraw-Hill 1978; Springer 1999) | textbook | 1999 | https://link.springer.com/
NUM1#maths-u26-09-q1@1: Use the binomial approximation to estimate 1.02^{10}, to 2 decimal places. | 1.2 | 0.001 |  | (1 + 0.02)^{10} ≈ 1 + 10 × 0.02 = 1.20 (the true value is 1.219).
M1#maths-u26-09-q2@1: What is the small-angle approximation for sin(0.1 rad)? | 0.1 | 0.01 | 1 | 0.9 | 10 | sin θ ≈ θ for small θ in radians; sin 0.1 ≈ 0.0998.
M3#maths-u26-09-q3@2: Why does the binomial approximation (1 + x)ⁿ ≈ 1 + nx get worse for large n even with small x? | The neglected term n(n − 1)x^{2}/2 grows with n^{2}, so it stops being small when nx isn't small | The approximation improves as n grows for fixed x | x itself becomes large when n increases | The formula changes form for large n | It doesn't get worse for any n | The first neglected term is n(n − 1)x^{2}/2, roughly (nx)^{2}/2, so the approximation needs nx to be small, not just x.

## Error Propagation
S: Error propagation tracks how uncertainties in measured inputs carry through a calculation into uncertainty in the result. Simple rules handle sums and products, and the general linearised formula uses partial derivatives.
O: Propagate uncertainties through sums, products and powers
O: Apply the general formula with partial derivatives
T: Absolute uncertainty | ±δx, the likely size of the error in a measured quantity x
T: Relative uncertainty | δx/|x|, the uncertainty as a fraction of the value
H: Rules (independent errors)
- Sums and differences: δ(x ± y) = √(δx^{2} + δy^{2}).
- Products and quotients: relative uncertainties add in quadrature.
- Powers: δ(xⁿ)/|xⁿ| = |n| δx/|x|.
- Worst-case bounds add without squaring.
H: General formula
- For f(x, y): δf^{2} ≈ (∂f/∂x)^{2}δx^{2} + (∂f/∂y)^{2}δy^{2}.
- Add covariance terms for correlated errors.
- Valid for small errors (linearisation).
- Monte Carlo for large or non-linear cases.
H: Practice
- Report results with sensible significant figures.
- Identify the dominant source of error.
- Differences of nearly equal values amplify relative error.
- GUM (Guide to the Expression of Uncertainty in Measurement) standards.
X: A rectangle measures 10.0 ± 0.1 cm by 5.0 ± 0.1 cm. Find its area and uncertainty.
> Area = 50.0 cm^{2}
> Relative uncertainties: 0.1/10 = 1% and 0.1/5 = 2%; combined √(1^{2} + 2^{2}) ≈ 2.24%
> δA ≈ 0.0224 × 50 ≈ 1.1 cm^{2}, so A = 50 ± 1 cm^{2}
K: Uncertainties add in quadrature for independent sums (absolute) and products (relative); powers multiply relative error; the partial-derivative formula is general; correlations and non-linearity need care.
!: Adding uncertainties linearly for independent errors, which overstates the combined uncertainty.
Q: How do relative uncertainties combine for a product of independent quantities? | In quadrature (square root of the sum of squares).
Q: What happens to relative uncertainty when a quantity is squared? | It doubles.
SUM: Track how errors spread.
SUM: Use quadrature for independent errors.
SRC: Taylor JR, An Introduction to Error Analysis (2nd edn, University Science Books 1997) | textbook | 1997 | https://uscibooks.aip.org/
SRC: Joint Committee for Guides in Metrology, Evaluation of measurement data: Guide to the expression of uncertainty in measurement (JCGM 100:2008) | guideline | 2008 | https://www.bipm.org/en/committees/jc/jcgm/publications
NUM1#maths-u26-10-q1@1: A radius is 2.00 ± 0.02 m. What is the relative uncertainty in the area πr^{2}, in %? | 2 | 0 | % | Relative uncertainty in r is 1%, doubled for the square: 2%.
M1#maths-u26-10-q2@1: Two independent lengths 4.0 ± 0.3 and 6.0 ± 0.4 are added. What is the uncertainty of the sum? | ±0.5 | ±0.7 | ±0.1 | ±0.35 | ±0.12 | Independent absolute uncertainties add in quadrature for a sum: √(0.3^{2} + 0.4^{2}) = √0.25 = 0.5, so the sum is 10.0 ± 0.5.
M3#maths-u26-10-q3@2: Why does subtracting two nearly equal measured values give a large relative uncertainty? | The absolute uncertainties combine while the difference itself is small | Subtraction removes the uncertainty from both values | The relative errors of the two values cancel exactly | The difference becomes exact when values are close | It doesn't; subtraction always reduces uncertainty | (10.0 ± 0.1) − (9.8 ± 0.1) = 0.2 ± 0.14, a 70% relative uncertainty.

## Research Methodology
S: Research methodology is the systematic approach to asking and answering questions. In mathematics it means choosing problems, exploring examples, building on the literature and validating results; in applied work it adds data, models and experiments.
O: Describe the stages of a mathematical research project
O: Compare theoretical, computational and empirical approaches
T: Research question | A precise, answerable question that defines the aim of a study
T: Methodology | The overall strategy and justification for how a question will be investigated
H: Stages
- Choose and refine a question; check what's known.
- Explore: examples, computations, special cases.
- Develop results: conjectures, proofs, models.
- Validate, write up and share.
H: Approaches
- Theoretical: definitions, theorems, proofs.
- Computational: experiments, simulations, algorithms.
- Empirical and applied: data, models, validation against reality.
- Mixed approaches are common.
H: Practicalities
- Keep a research log of attempts, including failures.
- Discuss with supervisors and peers.
- Plan time; expect dead ends.
- Ethics: data protection, honest reporting, credit.
X: Turn "something about primes in sequences" into a research question.
> Specify the sequence: primes of the form n^{2} + 1
> Specify what to find: how many below x, or whether there are infinitely many
> "Estimate π(x) for primes n^{2} + 1 ≤ x computationally and compare with the Hardy–Littlewood prediction" is precise and answerable
K: Research moves from precise questions through exploration and development to validation and dissemination; theoretical, computational and empirical approaches complement each other; logs and discussion help.
!: Starting work with a vague question that can't be answered or tested.
Q: What makes a good research question? | It is precise and answerable.
Q: Why keep a research log? | To record attempts, ideas and failures for later reference.
SUM: Research is systematic enquiry.
SUM: Start with a precise question.
SRC: Thomas G, How to Do Your Research Project (4th edn, SAGE 2022) | textbook | 2022 | https://uk.sagepub.com/
SRC: Tao T, Career advice: work hard; ask yourself dumb questions (blog, What's New) | review | 2007 | https://terrytao.wordpress.com/career-advice/
NUM1#maths-u26-11-q1@1: How many of the stages question, explore, develop, validate and disseminate come before results are developed? | 2 | 0 |  | Choosing the question and exploring come before developing results.
M1#maths-u26-11-q2@1: Which is the most precise research question? | Does the sequence aₙ = n^{2} + 1 contain infinitely many primes? | Are prime numbers interesting? | What about numbers in general? | Is mathematics useful to society? | How do sequences work? | It names a specific object and a yes/no property to establish.
M2#maths-u26-11-q3@2: Why are computational experiments valuable even in pure mathematics research? | They generate data that suggest conjectures and test them before proof attempts | They replace proofs, since computers don't make mistakes | They are always conclusive about infinite questions | They aren't valuable in pure mathematics, only in applied | They're only used in statistics, never in proof-based work | Experiments guided conjectures from Gauss's prime tables to the Birch–Swinnerton-Dyer conjecture.

## Literature Review
S: A literature review surveys what's already known about a topic, finding the key results, methods and open questions. It prevents reinventing work, positions new research and gives credit, using databases such as MathSciNet, zbMATH and arXiv.
O: Search and organise mathematical literature effectively
O: Write a review that synthesises rather than lists sources
T: Primary source | An original research article reporting new results
T: Citation chaining | Finding sources by following a paper's references (backwards) and the papers that cite it (forwards)
H: Finding sources
- Databases: MathSciNet, zbMATH Open, Web of Science, Google Scholar.
- Preprints: arXiv.
- Survey articles and books for overviews.
- Citation chaining and keyword search (MSC classification codes).
H: Reading and organising
- Skim abstracts and introductions first.
- Take structured notes: result, method, assumptions, limitations.
- Reference managers (Zotero, BibTeX).
- Track the history and key open problems.
H: Writing the review
- Synthesise themes and gaps, don't just summarise each paper.
- Compare methods and results critically.
- Cite accurately and fairly.
- Show how your work fits.
X: You find one key 2015 paper on your topic. How can you find related work efficiently?
> Backwards: read its reference list for earlier foundations
> Forwards: use Google Scholar's "cited by" for later developments
> Check its MSC codes and search zbMATH or MathSciNet for the same classification
K: Literature reviews map existing knowledge; databases, preprints and citation chaining find sources; structured notes and reference managers organise them; good reviews synthesise and identify gaps.
!: Writing a review that lists papers one by one without comparing or synthesising them.
Q: What is forward citation chaining? | Finding later papers that cite a given paper.
Q: Name two databases for mathematical literature. | MathSciNet and zbMATH Open.
SUM: Know what's already known.
SUM: Synthesise, don't just list.
SRC: Booth WC et al., The Craft of Research (4th edn, University of Chicago Press 2016) | textbook | 2016 | https://press.uchicago.edu/
SRC: zbMATH Open, The first resource for mathematics | dataset | 2024 | https://zbmath.org/
NUM1#maths-u26-12-q1@1: A paper has 40 references and 25 citing papers. How many sources do one round of backward and forward chaining reveal? | 65 | 0 | sources | 40 backward plus 25 forward gives 65 candidates to screen.
M1#maths-u26-12-q2@1: Which source is a preprint server widely used by mathematicians? | arXiv | MathSciNet reviews only | A dictionary | A citation style guide | A spreadsheet | arXiv hosts preprints before or alongside journal publication.
M2#maths-u26-12-q3@2: Why should a literature review synthesise rather than list sources? | Synthesis shows how results connect, conflict and leave gaps, which motivates new work | Lists are always better, since they're easier to check | Synthesis hides the original sources from readers | Reviewers and examiners prefer simple lists of papers | It shouldn't; summaries of each paper are the standard | A list of summaries doesn't explain the state of knowledge.

## Hypothesis Formulation
S: A hypothesis is a precise, testable statement about what you expect to find. In mathematics it may be a conjecture to prove; in applied work it's a claim tested against data, and good hypotheses are specific, falsifiable and grounded in theory.
O: Write precise, testable hypotheses and null hypotheses
O: Explain falsifiability and pre-registration
T: Falsifiable | Capable of being shown false by some possible observation or counterexample
T: Null hypothesis | A default statement of no effect or no difference, tested against an alternative
H: Good hypotheses
- Specific: name variables, populations and expected direction or size.
- Testable: say what result would count against it.
- Grounded: based on theory or prior evidence.
- Simple enough to test with available methods.
H: In mathematics and science
- Mathematical conjectures are falsified by counterexamples.
- Statistical hypotheses: H₀ versus H₁ with a pre-set significance level.
- Popper: scientific claims must be falsifiable.
H: Avoiding pitfalls
- HARKing: hypothesising after results are known.
- Pre-registration fixes hypotheses and analyses in advance.
- Multiple hypotheses need correction for multiple testing.
- Distinguish exploratory from confirmatory work.
X: Make "screen time affects sleep" into a testable hypothesis.
> Specify variables: daily screen time after 9 pm and sleep duration in teenagers
> State direction: each extra hour reduces sleep by at least 15 minutes on average
> Null: no association; the claim is falsified if the estimated effect is near zero with a tight interval
K: Hypotheses must be specific, falsifiable and grounded; nulls state no effect; counterexamples falsify conjectures; pre-registration and separating exploration from confirmation prevent HARKing.
!: Forming hypotheses after seeing the data and testing them on the same data.
Q: What is HARKing? | Hypothesising after the results are known.
Q: What makes a hypothesis falsifiable? | Some possible outcome would show it false.
SUM: State clearly what you expect.
SUM: Make it possible to be wrong.
SRC: Popper K, The Logic of Scientific Discovery (Hutchinson 1959; Routledge 2002) | textbook | 2002 | https://www.routledge.com/
SRC: Nosek BA et al., The preregistration revolution, Proceedings of the National Academy of Sciences 115(11), 2600 | journal | 2018 | https://doi.org/10.1073/pnas.1708274114
NUM1#maths-u26-13-q1@1: Testing 20 independent true null hypotheses at the 5% level, how many false positives are expected? | 1 | 0 |  | 20 × 0.05 = 1 expected false positive.
M1#maths-u26-13-q2@1: Which hypothesis is falsifiable? | Adding a fertiliser raises wheat yield by at least 5% | Fertiliser works in mysterious ways | Some things affect yield | Yield might change | Fertiliser is good | It predicts a measurable effect that experiments could contradict.
M2#maths-u26-13-q3@2: Why does pre-registration improve research credibility? | Fixing hypotheses and analyses in advance stops them being tuned to the results | It guarantees that every study finds a positive result | It replaces peer review with an automatic approval | It makes studies shorter by skipping data collection | It doesn't improve credibility in any measurable way | It separates confirmatory tests from exploratory findings.

## Model Validation
S: Model validation checks whether a model represents the real system well enough for its intended use. It compares predictions with independent data, tests assumptions and examines where the model fails, and it's distinct from verifying that the code is correct.
O: Plan validation using independent data and appropriate metrics
O: Distinguish calibration, validation and verification
T: Out-of-sample validation | Testing a model on data not used to build or fit it
T: Calibration (of a model) | Adjusting parameters so that model outputs match observed data
H: Strategies
- Hold-out and cross-validation.
- Compare against independent experiments or historical events.
- Test qualitative behaviour (trends, limits, conservation).
- Expert review of assumptions (face validity).
H: Metrics and diagnostics
- Error measures suited to the purpose (RMSE, bias, coverage).
- Residual plots for systematic errors.
- Sensitivity analysis to key assumptions.
- Benchmarks against simpler models.
H: Limits
- Validation is always relative to a purpose and range of conditions.
- A model can match past data and still fail under new conditions.
- Document the validity domain.
- Update validation as conditions change.
X: An epidemic model is calibrated to the first 30 days of data. How should it be validated?
> Calibration used days 1–30, so those can't validate it
> Compare predictions for days 31–60 (out of sample) with observations
> Check coverage of prediction intervals and whether errors are systematic
K: Validation tests a model against independent data for its purpose; calibration fits parameters; verification checks the code; residuals, benchmarks and sensitivity analysis reveal weaknesses; validity is limited to conditions tested.
!: Claiming a model is validated using the same data it was calibrated on.
Q: What is out-of-sample validation? | Testing a model on data not used to fit it.
Q: How does calibration differ from validation? | Calibration fits parameters to data; validation tests predictions on independent data.
SUM: Test against independent data.
SUM: Validity depends on purpose.
SRC: Oberkampf WL, Roy CJ, Verification and Validation in Scientific Computing (Cambridge University Press 2010) | textbook | 2010 | https://www.cambridge.org/
SRC: Sargent RG, Verification and validation of simulation models, Journal of Simulation 7(1), 12 | journal | 2013 | https://doi.org/10.1057/jos.2012.20
NUM1#maths-u26-14-q1@1: Of 50 validation points, 43 fall inside the model's 90% prediction intervals. What is the observed coverage in %? | 86 | 0 | % | 43/50 = 0.86, slightly below the nominal 90%.
M1#maths-u26-14-q2@1: Which data should be used to validate a model? | Data not used in building or calibrating it | The calibration data | Any data at random, including training data | Data invented to match | No data | Independent data test genuine predictive ability.
M3#maths-u26-14-q3@2: Why must a model's validity domain be documented? | A model validated under some conditions may fail under others, so users need to know its limits | Models validated once are valid everywhere, so it's a formality | Documentation replaces the need for any validation | It isn't necessary when the model is mathematically correct | Validity never changes once a model has been calibrated | Extrapolation beyond tested conditions is a common source of failure.

## Model Verification
S: Model verification checks that a computational model correctly implements its intended mathematics: the code solves the equations right. Testing against exact solutions, convergence studies and code review catch the bugs that would otherwise silently corrupt results.
O: Use convergence tests and manufactured solutions to verify code
O: Apply software testing practices to mathematical models
T: Code verification | Confirming that software correctly solves the mathematical model it implements
T: Method of manufactured solutions | Choosing an exact solution, deriving the source terms it needs, and checking the code recovers it at the expected convergence rate
H: Techniques
- Compare with analytical solutions for simple cases.
- Convergence studies: error should fall at the theoretical order as the mesh is refined.
- Manufactured solutions for complex PDE codes.
- Conservation checks (mass, energy).
H: Software practice
- Unit tests for components; regression tests against previous results.
- Version control and code review.
- Continuous integration running tests automatically.
- Independent re-implementation of key calculations.
H: Solution verification
- Estimate numerical error in each production run (Richardson extrapolation).
- Check sensitivity to tolerances and time steps.
- Verification comes before validation.
X: A second-order code gives errors 0.016 at h = 0.1 and 0.004 at h = 0.05. Does this verify the expected order?
> Ratio of errors = 0.016/0.004 = 4
> 4 = 2^{p} gives p = 2
> The observed order matches the theoretical second order
K: Verification checks code solves its equations correctly; convergence tests, manufactured solutions and conservation checks are core; software practices such as unit tests and CI support it; verify before validating.
!: Trusting a code because it produces plausible-looking output.
Q: What does code verification check? | That software correctly solves its mathematical model.
Q: What should happen to errors in a convergence test? | They should fall at the theoretical rate as the mesh is refined.
SUM: Solve the equations right.
SUM: Test systematically.
SRC: Roache PJ, Code verification by the method of manufactured solutions, Journal of Fluids Engineering 124(1), 4 | journal | 2002 | https://doi.org/10.1115/1.1436090
SRC: Wilson G et al., Best practices for scientific computing, PLOS Biology 12(1), e1001745 | journal | 2014 | https://doi.org/10.1371/journal.pbio.1001745
NUM1#maths-u26-15-q1@1: A code's errors are 0.08 at h and 0.01 at h/2. What observed order of accuracy does this give? | 3 | 0 |  | Ratio 8 = 2^{p} gives p = 3.
M1#maths-u26-15-q2@1: Which activity is verification rather than validation? | Checking a solver against an exact analytical solution | Comparing predictions with field measurements | Asking users whether results look realistic | Collecting new experimental data | Choosing which physics to model | Exact-solution tests check the code, not the model's realism.
M3#maths-u26-15-q3@2: Why are manufactured solutions useful for verifying PDE codes? | They give exact solutions for complex equations, so every term can be tested | They replace the need for any convergence study | They model reality exactly, so validation is complete | They need no source terms in the equations | They aren't useful for codes that solve PDEs | Real problems rarely have exact solutions, but manufactured ones always do.

## Computational Experiments
S: Computational experiments use computers to explore mathematical questions, test conjectures and simulate systems. Designed well, they're like laboratory experiments: with clear questions, controlled parameters, replication and honest reporting of all results.
O: Design computational experiments with clear questions and controls
O: Analyse and report results, including variability and failures
T: Parameter sweep | Running a computation over a grid of parameter values to see how results change
T: Random seed | The starting value for a pseudo-random number generator; fixing it makes stochastic runs reproducible
H: Design
- State the question and hypothesis.
- Choose parameters and ranges; vary one factor at a time or use factorial designs.
- Use enough repetitions for stochastic methods.
- Include baselines and known cases.
H: Running
- Record versions, parameters and seeds.
- Automate with scripts, not manual steps.
- Monitor resources and failures.
- Store raw outputs.
H: Analysing and reporting
- Show variability (error bars, distributions).
- Report all runs, including failures.
- Distinguish exploration from confirmation.
- Beware of over-tuning to particular test cases.
X: You test whether a new algorithm is faster on random graphs. How should the experiment be set up?
> Fix graph sizes (say 10^{3}, 10^{4}, 10^{5}) and generate 30 random graphs at each size with recorded seeds
> Run both algorithms on the same graphs on the same machine
> Report median and spread of run times, and how the advantage scales with size
K: Computational experiments need clear questions, controlled parameters, replication and baselines; record seeds and versions; report variability and failures honestly.
!: Reporting only the best run of a stochastic algorithm.
Q: Why fix a random seed? | To make stochastic runs reproducible.
Q: What is a parameter sweep? | Running a computation over a range of parameter values.
SUM: Experiment with computers carefully.
SUM: Replicate and report honestly.
SRC: Johnson DS, A theoretician's guide to the experimental analysis of algorithms, DIMACS Series in Discrete Mathematics 59, 215 | journal | 2002 | https://www.ams.org/
SRC: Borwein J, Bailey D, Mathematics by Experiment: Plausible Reasoning in the 21st Century (2nd edn, A K Peters 2008) | textbook | 2008 | https://www.routledge.com/
NUM1#maths-u26-16-q1@1: A full factorial experiment varies 3 parameters at 4 levels each. How many configurations are there? | 64 | 0 | configurations | 4^{3} = 64 combinations.
M1#maths-u26-16-q2@1: Which practice makes a stochastic computational experiment reproducible? | Recording random seeds and software versions | Running it once only | Changing parameters without notes | Deleting failed runs | Using different machines randomly | Seeds and versions let others regenerate the same results.
M2#maths-u26-16-q3@2: Why should failed or unfavourable runs be reported? | Hiding them biases conclusions and misleads others about reliability | Failures are irrelevant to the conclusions of a study | Only successful runs count as genuine results | Reporting failures breaks the reproducibility of a study | They shouldn't be; failed runs only confuse readers | Selective reporting inflates apparent performance.

## Reproducible Research
S: Reproducible research means others can regenerate your results from your data and code. It requires sharing materials, documenting steps and automating analyses, and it builds trust in results at a time when many published findings have failed to replicate.
O: Distinguish reproducibility from replicability
O: Apply practical tools for reproducible mathematical and computational work
T: Reproducibility | Obtaining the same results using the same data and code
T: Replicability | Obtaining consistent results in a new study with new data
H: Why it matters
- Replication crises in psychology and medicine.
- Errors found by re-running code (Reinhart–Rogoff spreadsheet error).
- Funders and journals increasingly require data and code sharing.
H: Practices
- Version control (Git) and public repositories.
- Literate programming: notebooks, R Markdown, Quarto.
- Environment capture: requirements files, containers.
- Persistent identifiers for data and code (DOIs via Zenodo).
H: FAIR principles
- Findable, Accessible, Interoperable, Reusable.
- Clear licences and documentation.
- Data protection for personal data.
- Formal proofs in proof assistants as fully reproducible mathematics.
X: A collaborator can't reproduce your figure. What should you check first?
> Software and package versions (were defaults changed?)
> Random seeds and data versions
> Undocumented manual steps: automate them in a script
K: Reproducibility re-runs the same data and code; replicability repeats studies; version control, notebooks, containers and FAIR data sharing make work reproducible and trustworthy.
!: Relying on undocumented manual steps that nobody else can repeat.
Q: What does FAIR stand for? | Findable, Accessible, Interoperable, Reusable.
Q: What's the difference between reproducibility and replicability? | Same data and code versus a new study with new data.
SUM: Others should be able to re-run your work.
SUM: Share code, data and environments.
SRC: Wilkinson MD et al., The FAIR Guiding Principles for scientific data management and stewardship, Scientific Data 3, 160018 | journal | 2016 | https://doi.org/10.1038/sdata.2016.18
SRC: National Academies of Sciences, Engineering, and Medicine, Reproducibility and Replicability in Science (National Academies Press 2019) | report | 2019 | https://doi.org/10.17226/25303
NUM1#maths-u26-17-q1@1: How many letters are there in the acronym FAIR, each standing for one principle? | 4 | 0 | principles | Findable, Accessible, Interoperable and Reusable.
M1#maths-u26-17-q2@1: Which tool records every change to code and lets others retrieve exact versions? | Version control such as Git | A word processor | Email attachments | A spreadsheet of notes | Memory | Git tracks history and allows exact versions to be shared and restored.
M2#maths-u26-17-q3@2: Why do containers help reproducibility? | They package the software environment so code runs with the same versions anywhere | They make code run much faster | They replace version control entirely | They hide the code from other users | They don't help reproducibility at all | Library version differences are a common cause of non-reproducible results.

## Mathematical Visualisation
S: Mathematical visualisation turns functions, data and abstract structures into pictures that reveal patterns, guide intuition and communicate results. Good visualisations are honest, clear and chosen to fit the question being asked.
O: Choose appropriate plots for functions, data and structures
O: Apply principles of clear and honest visual design
T: Log–log plot | A plot with logarithmic scales on both axes, turning power laws into straight lines
T: Data–ink ratio | Tufte's idea that most ink in a chart should present data rather than decoration
H: Choosing visuals
- Functions: graphs, contour plots, surface plots, phase portraits.
- Data: scatter plots, histograms, box plots, time series.
- Structures: graphs and networks, Hasse diagrams, Cayley graphs.
- Log scales for wide ranges and power laws.
H: Design principles
- Label axes and units; give clear titles and legends.
- Avoid misleading truncated axes, 3D effects and dual axes.
- Use colour-blind-safe palettes and sufficient contrast.
- Show uncertainty (error bars, bands).
H: Tools and uses
- Matplotlib, ggplot2, Desmos, GeoGebra, Mathematica.
- Interactive visualisations for exploration.
- Visualisation has suggested theorems (Mandelbrot set, sphere eversion).
- Proofs without words, used with care.
X: Data follow y = 3x^{2}. How would a log–log plot help confirm this?
> Taking logs: log y = log 3 + 2 log x
> A log–log plot is a straight line with slope 2
> Reading the slope confirms the exponent, and the intercept gives the constant
K: Visualisation reveals patterns and communicates; match the plot type to the question; label clearly, avoid distortion and show uncertainty; log scales reveal power laws.
!: Truncating a bar chart's axis so small differences look dramatic.
Q: What does a straight line on a log–log plot indicate? | A power law relationship.
Q: Why use colour-blind-safe palettes? | So all readers can distinguish the categories.
SUM: Pictures reveal patterns.
SUM: Design honestly and clearly.
SRC: Tufte ER, The Visual Display of Quantitative Information (2nd edn, Graphics Press 2001) | textbook | 2001 | https://www.edwardtufte.com/
SRC: Wilke CO, Fundamentals of Data Visualization (O'Reilly 2019) | textbook | 2019 | https://clauswilke.com/dataviz/
NUM1#maths-u26-18-q1@1: On a log–log plot, data from y = 5x^{3} form a line. What is its slope? | 3 | 0 |  | log y = log 5 + 3 log x, so the slope is 3.
M1#maths-u26-18-q2@1: Which plot best shows the distribution of a single continuous variable? | A histogram | A pie chart | A line graph of categories | A scatter plot of one variable against itself | A table of totals | Histograms show how values are spread across ranges.
M2#maths-u26-18-q3@2: Why can a truncated y-axis on a bar chart mislead? | Bar lengths no longer represent values proportionally, exaggerating differences | It always makes data clearer to read | It shows the uncertainty in each bar | It improves the accuracy of the data | It can't mislead if the axis is labelled | A bar starting at 90 instead of 0 makes 92 versus 95 look like a huge gap.

## Mathematical Communication
S: Mathematical communication shares ideas so that others can understand, check and use them. Whether talking, writing or presenting, it means knowing your audience, explaining why as well as what, and balancing precision with accessibility.
O: Adapt mathematical explanations to different audiences
O: Use examples, diagrams and structure to communicate clearly
T: Audience | The people a communication is for, whose background determines the right level of detail and notation
T: Signposting | Telling readers or listeners where an explanation is going and why each part matters
H: Knowing the audience
- Specialists: concise, technical, with full rigour.
- Students: motivation, examples, gradual build-up.
- The public: intuition, analogies, minimal notation.
- Decision-makers: key findings, uncertainty and implications.
H: Techniques
- Lead with the main idea, then details.
- Use concrete examples before generalities.
- Diagrams and visual intuition.
- Define notation and terms when first used.
H: Talks and discussion
- One main message per slide; don't read slides aloud.
- Rehearse timing.
- Invite and answer questions honestly, including "I don't know".
- Listening carefully is part of communication.
X: Explain why there are infinitely many primes to a non-specialist in three sentences.
> Suppose you had a complete list of primes; multiply them all and add 1
> The new number leaves remainder 1 when divided by any prime on the list, so its prime factors aren't on the list
> So no finite list can contain every prime
K: Good mathematical communication fits its audience, leads with the main idea, uses examples and diagrams, defines terms and signposts the structure; talks need focus, rehearsal and honest answers.
!: Using unexplained notation and jargon with a non-specialist audience.
Q: What should a talk to decision-makers emphasise? | Key findings, uncertainty and implications.
Q: What is signposting? | Telling the audience where an explanation is going and why.
SUM: Know your audience.
SUM: Explain why, not just what.
SRC: Higham NJ, Handbook of Writing for the Mathematical Sciences (3rd edn, SIAM 2020) | textbook | 2020 | https://epubs.siam.org/
SRC: Alley M, The Craft of Scientific Presentations (2nd edn, Springer 2013) | textbook | 2013 | https://link.springer.com/
NUM1#maths-u26-19-q1@1: A 20-minute talk allows about 1 slide per minute, leaving 5 minutes for questions. How many slides should it have? | 15 | 0 | slides | 20 − 5 = 15 minutes of talking at about one slide a minute.
M1#maths-u26-19-q2@1: When explaining a new idea to students, what usually works best first? | A concrete example | The most general abstract definition | A long list of notation | The full proof with no motivation | Historical dates only | Examples motivate and ground the abstract statement.
M2#maths-u26-19-q3@2: Why is saying "I don't know" acceptable when answering questions after a talk? | Honest uncertainty is better than a wrong or invented answer, and you can follow up later | It always looks unprofessional and should be avoided | It ends the discussion and stops further questions | Audiences expect certainty on every topic raised | It isn't acceptable for a speaker giving a talk | Credibility depends on accuracy, not on appearing to know everything.

## Mathematical Writing
S: Mathematical writing presents definitions, results and arguments in clear, precise prose with well-chosen notation. Good writing helps readers follow and check the reasoning, and conventions such as LaTeX typesetting and the theorem–proof structure make it effective.
O: Write clear mathematical prose with consistent notation
O: Structure documents with definitions, theorems, proofs and examples
T: LaTeX | A typesetting system widely used for mathematics, producing high-quality formulae and documents
T: Theorem–proof structure | Presenting results as clearly labelled statements followed by their proofs
H: Clarity
- Write full sentences; formulae are part of sentences.
- Don't start sentences with symbols.
- Prefer "we" and active voice in mathematical prose.
- Say what a calculation shows, not just do it.
H: Notation
- Introduce symbols before use; keep them consistent.
- Avoid overloading symbols.
- Number only equations you refer to.
- Use standard notation where it exists.
H: Structure and tools
- Introduction with motivation and main results.
- Definitions, lemmas, theorems, proofs, examples.
- LaTeX, BibTeX and version control.
- Revise: read aloud, ask others, check every formula.
X: Improve: "x^{2} − 4 = 0 ⇒ x = ±2. x > 0 ⇒ x = 2."
> Write in sentences: "Since x^{2} − 4 = 0, we have x = 2 or x = −2."
> Add the condition: "As x is positive, x = 2."
> The meaning is clearer, and the role of each fact is explicit
K: Clear mathematical writing uses sentences with formulae, consistent notation and a theorem–proof structure; LaTeX is the standard tool; revision and feedback improve drafts.
!: Starting a sentence with a symbol, as in "x > 0, so the root is 2", instead of "Since x is positive, the root is 2".
Q: What typesetting system is standard in mathematics? | LaTeX.
Q: Should equations be part of sentences? | Yes, with punctuation.
SUM: Write sentences, not just symbols.
SUM: Keep notation consistent.
SRC: Higham NJ, Handbook of Writing for the Mathematical Sciences (3rd edn, SIAM 2020) | textbook | 2020 | https://epubs.siam.org/
SRC: Knuth DE, Larrabee T, Roberts PM, Mathematical Writing (Mathematical Association of America 1989) | textbook | 1989 | https://www.maa.org/
NUM1#maths-u26-20-q1@1: A section has 5 displayed equations, and only 2 of them are referred to later in the text. How many should be numbered? | 2 | 0 |  | Number only the equations you refer to; numbering the rest adds clutter without helping the reader.
M1#maths-u26-20-q2@1: Which sentence follows good mathematical writing practice? | Let f be continuous on [a, b]; then f attains a maximum | f continuous ⇒ max on [a, b] attained | Continuous f, max exists, [a, b] closed | max f if cont. on closed bounded int. | ∃ max since f cts and [a, b] cpt | It uses full words, defines f and states the conclusion clearly.
M2#maths-u26-20-q3@2: Why should new notation be introduced before it's used? | Readers can't follow an argument whose symbols haven't been defined | It makes the document shorter overall | Notation is always obvious from context | Definitions belong at the end of a paper | It shouldn't; readers can guess meanings | Undefined symbols force readers to guess meanings.

## Scientific Reporting
S: Scientific reporting presents research so that others can understand, evaluate and reproduce it. Standard structures such as IMRaD, honest reporting of methods and uncertainty, and peer review together make the scientific record reliable.
O: Structure a scientific report using IMRaD
O: Report methods, results and uncertainty transparently
T: IMRaD | The standard structure Introduction, Methods, Results and Discussion
T: Peer review | Evaluation of a manuscript by independent experts before publication
H: Structure
- Abstract: question, approach, main result, significance.
- Introduction: context, gap, aim.
- Methods: enough detail to reproduce.
- Results: findings with uncertainty; Discussion: interpretation, limitations, implications.
H: Transparent reporting
- Report effect sizes and intervals, not just p-values.
- Describe all analyses, including those not significant.
- Follow reporting guidelines (CONSORT, PRISMA).
- Share data and code where possible.
H: Publishing
- Choose an appropriate journal; preprints for speed.
- Respond to reviewers constructively.
- Authorship and acknowledgement norms.
- Corrections and retractions keep the record honest.
X: Which details must a Methods section include for a simulation study?
> The model equations and assumptions
> Numerical methods, parameters, software versions and random seeds
> Enough detail that another researcher could reproduce the results
K: Scientific reports follow IMRaD; methods must allow reproduction; results report effects with uncertainty; discussion covers limitations; peer review and transparency maintain trust.
!: Reporting only statistically significant results and omitting the rest.
Q: What does IMRaD stand for? | Introduction, Methods, Results and Discussion.
Q: What should be reported alongside a p-value? | An effect size with a confidence interval.
SUM: Structure reports for readers.
SUM: Be transparent about methods and limits.
SRC: Day RA, Gastel B, How to Write and Publish a Scientific Paper (9th edn, Cambridge University Press 2022) | textbook | 2022 | https://www.cambridge.org/
SRC: EQUATOR Network, Enhancing the QUAlity and Transparency Of health Research: reporting guidelines | guideline | 2024 | https://www.equator-network.org/
NUM1#maths-u26-21-q1@1: How many main sections does the IMRaD structure have? | 4 | 0 | sections | Introduction, Methods, Results and Discussion.
M1#maths-u26-21-q2@1: Which section of a report should describe limitations of the study? | The Discussion | The Abstract only | The Methods | The title | The references | The Discussion interprets results and acknowledges limits.
M2#maths-u26-21-q3@2: Why should a Methods section give enough detail to reproduce the work? | Others must be able to check and build on the results | It makes papers longer for reviewers | Methods are rarely read | Reproduction is unnecessary | It shouldn't | Reproducibility is how science verifies and corrects findings.
`;
