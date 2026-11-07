// School 12: Probability. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// From the axioms and Bayes' theorem to random variables, limit theorems and the main distribution families.
export default `
## Probability Theory
S: Probability theory is the mathematics of uncertainty. It gives every possible outcome of an experiment a number between 0 and 1, and it provides the rules for combining those numbers, the basis for statistics, risk, insurance, physics and machine learning.
O: Describe experiments using sample spaces and events
O: Calculate probabilities for equally likely outcomes and complements
T: Sample space | The set of all possible outcomes of an experiment, often written Ω or S
T: Event | A set of outcomes; an event happens if the outcome is one of its members
H: Outcomes and events
- Rolling a die: Ω = {1, 2, 3, 4, 5, 6}; the event "even" is {2, 4, 6}.
- Probabilities lie between 0 (impossible) and 1 (certain), and the probabilities of all outcomes add to 1.
- The complement A′ ("not A") has P(A′) = 1 − P(A), often the quickest route to an answer.
- Events can be combined: A ∪ B ("A or B"), A ∩ B ("A and B").
H: Assigning probabilities
- Classical: if all outcomes are equally likely, P(A) = (number of outcomes in A)/(number of outcomes).
- Relative frequency: estimate P(A) by the proportion of times A happens in many trials.
- Subjective: a degree of belief, updated with evidence (Bayes' theorem, later in this school).
H: History
- Pascal and Fermat's letters of 1654 on dividing the stakes of an unfinished game founded the subject.
- Kolmogorov's axioms (1933) made it a branch of rigorous mathematics.
- Today it underpins statistics, quantum mechanics, finance, weather forecasting and AI.
X: Two fair dice are rolled. Find the probability that the total is 7, and that the total is not 7.
> There are 6 × 6 = 36 equally likely outcomes
> Totals of 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1), six outcomes, so P = 6/36 = 1/6
> P(not 7) = 1 − 1/6 = 5/6
P: **Investigate with the lab.** Compare long-run proportions for a coin and a die. The proportions approach the probabilities, which is why probability can be read as long-run frequency.
IX: lln
K: Probabilities run from 0 to 1 and sum to 1 over the sample space; for equally likely outcomes, count; use complements.
!: Treating outcomes as equally likely when they aren't, such as the totals 2 to 12 on two dice.
Q: What is P(A′) if P(A) = 0.35? | 0.65.
Q: What is the sample space for tossing one coin twice? | {HH, HT, TH, TT}.
SUM: Probability measures uncertainty from 0 to 1.
SUM: Count equally likely outcomes or use complements.
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
NUM1#maths-u12-01-q1@1: A card is drawn from a standard 52-card pack. What is the probability it's a heart or a king, as a decimal to 4 decimal places? | 0.3077 | 0.0001 |  | 13 hearts + 4 kings − 1 king of hearts = 16 cards, and 16/52 ≈ 0.3077.
M1#maths-u12-01-q2@1: Which value can't be a probability? | 1.2 | 0 | 1 | 0.999 | 1/3 | Probabilities lie between 0 and 1 inclusive, so 1.2 is impossible.
M2#maths-u12-01-q3@2: Two dice are rolled. Why isn't P(total = 12) equal to 1/11? | The 11 totals aren't equally likely | There are 12 possible totals | Dice are biased | Totals can't be 12 | It is equal to 1/11 | Only (6,6) gives 12, so P = 1/36; middle totals have more combinations.
NUM1#maths-u12-01-q4@1: In 6,000 die rolls, about how many sixes would you expect? | 1000 | 0 | sixes | 6000 × 1/6 = 1000; the actual count will vary around this.

## Foundations of Probability
S: Modern probability rests on three axioms set out by Andrey Kolmogorov in 1933. From them follow the addition rule, inclusion–exclusion and every other rule, whichever interpretation of probability you prefer.
O: State Kolmogorov's axioms and derive basic consequences
O: Use the addition rule and inclusion–exclusion
T: Kolmogorov's axioms | P(A) ≥ 0; P(Ω) = 1; for mutually exclusive A₁, A₂, …, P(A₁ ∪ A₂ ∪ …) = P(A₁) + P(A₂) + …
T: Mutually exclusive | Events that can't happen together: A ∩ B = ∅
H: The axioms and their consequences
- From the axioms: P(∅) = 0; P(A′) = 1 − P(A); if A ⊆ B then P(A) ≤ P(B); P(A) ≤ 1.
- Addition rule: P(A ∪ B) = P(A) + P(B) − P(A ∩ B); the overlap would otherwise be counted twice.
- For mutually exclusive events the overlap is 0 and the probabilities simply add.
H: Inclusion–exclusion
- Three events: P(A ∪ B ∪ C) = P(A) + P(B) + P(C) − P(A ∩ B) − P(A ∩ C) − P(B ∩ C) + P(A ∩ B ∩ C).
- Venn diagrams make the regions visible: fill in the intersection first and work outwards.
- The derangement problem (no letter in the right envelope, probability about 1/e) is a famous application.
H: Interpretations
- Frequentist: probability is a long-run relative frequency.
- Bayesian: probability is a degree of belief, updated by evidence.
- Both obey the same axioms, so the mathematics is the same; they differ in what the numbers mean.
X: P(A) = 0.5, P(B) = 0.4 and P(A ∩ B) = 0.2. Find P(A ∪ B) and the probability of neither.
> P(A ∪ B) = 0.5 + 0.4 − 0.2 = 0.7
> Neither is the complement of A ∪ B
> P(neither) = 1 − 0.7 = 0.3
P: **Investigate with the lab.** Run small and large numbers of trials. Small runs can be far from the probability, which is why probabilities are long-run statements, not guarantees.
IX: lln
K: Three axioms imply every rule; P(A ∪ B) = P(A) + P(B) − P(A ∩ B); draw Venn diagrams from the centre out.
!: Adding P(A) and P(B) for events that overlap.
Q: What is P(A ∪ B) for mutually exclusive A and B? | P(A) + P(B).
Q: What does Kolmogorov's second axiom say? | P(Ω) = 1: something in the sample space happens.
SUM: Three axioms underpin all of probability.
SUM: Subtract the overlap when adding.
SRC: Kolmogorov AN, Foundations of the Theory of Probability (2nd English edn, Chelsea 1956) | textbook | 1956 | https://archive.org/
SRC: Grimmett G, Stirzaker D, Probability and Random Processes (4th edn, Oxford University Press 2020) | textbook | 2020 | https://global.oup.com/
NUM1#maths-u12-02-q1@1: P(A) = 0.6, P(B) = 0.5 and P(A ∪ B) = 0.8. Find P(A ∩ B). | 0.3 | 0.001 |  | Rearrange the addition rule: 0.6 + 0.5 − 0.8 = 0.3.
M1#maths-u12-02-q2@1: Which follows directly from Kolmogorov's axioms? | P(∅) = 0 | P(A ∩ B) = P(A)P(B) | P(A ∣ B) = P(A) | All outcomes are equally likely | P(A) = 0.5 | Ω and ∅ are mutually exclusive and Ω ∪ ∅ = Ω, so P(∅) must be 0.
M3#maths-u12-02-q3@2: Can P(A) = 0.7 and P(B) = 0.6 for mutually exclusive events A and B? | No: their probabilities would add to 1.3 | Yes, always | Yes, if they're independent | Only if Ω is infinite | Only if P(A ∩ B) = 0.3 | Mutually exclusive means P(A ∪ B) = P(A) + P(B), which can't exceed 1.
M2#maths-u12-02-q4@2: After 5 heads in a row with a fair coin, what is the probability the next flip is heads? | 0.5, since flips are independent | Less than 0.5, since tails is due | More than 0.5, since heads is on a streak | 0, since six heads is impossible | It depends on earlier flips | Independence means past results don't change the next probability (the gambler's fallacy).

## Independent Events
S: Two events are independent when knowing that one has happened doesn't change the probability of the other. Independence lets us multiply probabilities, and wrongly assuming it is one of the most common errors in risk assessment.
O: Test whether events are independent
O: Use the multiplication rule for independent events
T: Independent events | Events with P(A ∩ B) = P(A)P(B), equivalently P(A ∣ B) = P(A)
T: Mutual independence | Every subcollection of the events satisfies the product rule, not just each pair
H: The definition
- A and B are independent if P(A ∩ B) = P(A) × P(B).
- Equivalently, P(A | B) = P(A): learning B tells you nothing about A.
- Coin tosses and dice rolls are modelled as independent; drawing cards without replacement isn't.
- Test independence by checking the product rule with the numbers given.
H: Independent versus mutually exclusive
- Mutually exclusive events with positive probability can't be independent: if A happens, B certainly doesn't.
- Pairwise independence doesn't imply mutual independence: toss two coins; A = first is heads, B = second is heads, C = they match. Each pair is independent, but all three aren't.
H: Using independence
- "At least one" problems: P(at least one) = 1 − P(none) = 1 − product of the probabilities of failure.
- The gambler's fallacy: after five reds, the next spin is still equally likely to be red, because spins are independent.
- The Sally Clark case (1999) showed the danger of multiplying probabilities for events (two cot deaths in one family) that weren't independent.
X: A fair die is rolled four times. Find the probability of at least one six.
> P(no six in one roll) = 5/6, and rolls are independent
> P(no sixes in four rolls) = (5/6)^{4} = 625/1296
> P(at least one six) = 1 − 625/1296 = 671/1296 ≈ 0.518
K: Independence means P(A ∩ B) = P(A)P(B); it's different from mutual exclusivity; use 1 − P(none) for "at least one".
!: Confusing independent with mutually exclusive.
Q: If A and B are independent with P(A) = 0.3 and P(B) = 0.5, what is P(A ∩ B)? | 0.15.
Q: What is the gambler's fallacy? | Believing independent outcomes become "due" after a run of the other result.
SUM: Independent events multiply.
SUM: Independence isn't mutual exclusivity.
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: Royal Statistical Society, Statement regarding statistical issues in the Sally Clark case | guidance | 2001 | https://rss.org.uk/
NUM1#maths-u12-03-q1@1: A system has three independent components, each working with probability 0.9. It works only if all three work. Find the probability it works. | 0.729 | 0.0001 |  | Multiply the independent probabilities: 0.9^{3} = 0.729.
M1#maths-u12-03-q2@1: Events A and B satisfy P(A) = 0.4, P(B) = 0.5 and P(A ∩ B) = 0.2. Are they independent? | Yes, because 0.4 × 0.5 = 0.2 | No, because they overlap | No, because 0.4 + 0.5 ≠ 1 | Yes, because P(A) < P(B) | It can't be determined | The product rule holds exactly, which is the definition of independence.
M3#maths-u12-03-q3@2: Mutually exclusive events A and B each have positive probability. What can you say? | They're dependent | They're independent | P(A ∩ B) = P(A)P(B) | P(A ∪ B) = 1 | P(A ∣ B) = P(A) | P(A ∩ B) = 0 but P(A)P(B) > 0, so the product rule fails: B happening rules A out.

## Conditional Probability
S: Conditional probability is the probability of an event given that another has happened. It's how probabilities update when information arrives, and confusing P(A ∣ B) with P(B ∣ A) causes serious errors in medicine and law.
O: Calculate conditional probabilities from definitions, tables and trees
O: Use the multiplication rule for dependent events
T: Conditional probability | P(A ∣ B) = P(A ∩ B)/P(B), defined when P(B) > 0
T: Tree diagram | A diagram whose branches carry conditional probabilities, multiplied along paths
H: The definition
- Given B, the sample space shrinks to B: P(A | B) is the fraction of B's probability that lies in A.
- Rearranged: P(A ∩ B) = P(B) × P(A | B), the multiplication rule.
- From a two-way table: P(A | B) = (count in A and B)/(count in B).
H: Trees and sampling without replacement
- On a tree, the second set of branches carries conditional probabilities; multiply along each path and add the paths you want.
- Without replacement, the probabilities change after each draw.
- Law of total probability: P(A) = P(A | B)P(B) + P(A | B′)P(B′).
H: Common confusions
- P(A | B) ≠ P(B | A): most professional footballers are men, but few men are professional footballers.
- The prosecutor's fallacy: confusing P(evidence | innocent) with P(innocent | evidence).
- Simpson's paradox: a trend in every group can reverse when the groups are combined.
X: A bag has 5 red and 3 blue counters. Two are taken without replacement. Find P(both red) and P(second is red ∣ first is blue).
> P(first red) = 5/8, then P(second red | first red) = 4/7
> P(both red) = 5/8 × 4/7 = 20/56 = 5/14 ≈ 0.357
> After a blue is taken, 5 red of 7 remain: P(second red | first blue) = 5/7
K: P(A ∣ B) = P(A ∩ B)/P(B); multiply along tree branches; don't swap the order of conditioning.
!: Using the same probabilities for the second draw when sampling without replacement.
Q: What is P(A ∣ B) if P(A ∩ B) = 0.12 and P(B) = 0.4? | 0.3.
Q: Is P(A ∣ B) generally equal to P(B ∣ A)? | No: they're equal only if P(A) = P(B) (or both are zero).
SUM: Conditioning shrinks the sample space.
SUM: Multiply along trees, add across paths.
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: Department for Education, Mathematics AS and A level subject content: statistics | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u12-04-q1@1: In a class, 60% study French, and 25% study both French and Spanish. What is P(Spanish ∣ French), to 4 decimal places? | 0.4167 | 0.0001 |  | P(S ∣ F) = 0.25/0.6 ≈ 0.4167.
M1#maths-u12-04-q2@1: Two cards are drawn without replacement from a 52-card pack. What is P(both aces)? | 1/221 | 1/169 | 1/26 | 4/52 | 2/13 | Multiply along the tree, with one fewer ace for the second draw: (4/52) × (3/51) = 1/221.
M2#maths-u12-04-q3@2: What does the law of total probability calculate? | An overall probability by splitting into cases | A conditional probability only | The probability of independence | The number of outcomes | A variance | P(A) = Σ P(A ∣ Bᵢ)P(Bᵢ) over a partition B₁, B₂, … of the sample space.

## Joint Probability
S: A joint probability is the probability that two or more events, or random variables, take particular values together. Joint distributions show how variables relate, and summing them out gives each variable's own (marginal) distribution.
O: Read joint, marginal and conditional probabilities from a joint table
O: Test two random variables for independence
T: Joint distribution | A table or function giving P(X = x, Y = y) for every pair of values
T: Marginal distribution | The distribution of one variable alone, found by summing (or integrating) the joint distribution over the other
H: Joint tables
- Rows for one variable, columns for the other; all entries add to 1.
- Marginal: add along a row or column. P(X = x) = Σ_{y} P(X = x, Y = y).
- Conditional: divide a cell by its marginal: P(Y = y | X = x) = P(X = x, Y = y)/P(X = x).
H: Independence and dependence
- X and Y are independent if every cell equals the product of its row and column marginals.
- One failing cell is enough to show dependence.
- Covariance and correlation (later in this school) measure the strength of linear dependence.
H: Continuous variables
- A joint density f(x, y) gives probabilities as volumes: P((X, Y) ∈ R) = ∬_{R} f(x, y) dx dy.
- Marginal density: f_{X}(x) = ∫ f(x, y) dy.
- Independence: f(x, y) = f_{X}(x) f_{Y}(y) for all x and y.
X: X and Y take values 0 and 1, with P(0,0) = 0.3, P(0,1) = 0.2, P(1,0) = 0.1 and P(1,1) = 0.4. Are they independent?
> Marginals: P(X = 1) = 0.1 + 0.4 = 0.5; P(Y = 1) = 0.2 + 0.4 = 0.6
> If independent, P(1,1) would be 0.5 × 0.6 = 0.3
> It's 0.4, so X and Y are dependent (they tend to agree)
K: Sum out a variable for its marginal; divide by a marginal for a conditional; independence needs every cell to factorise.
!: Checking only one cell and concluding independence: every cell must factorise.
Q: How do you find P(X = 2) from a joint table? | Add the row (or column) for X = 2.
Q: What must all the entries of a joint probability table sum to? | 1.
SUM: Joint distributions describe variables together.
SUM: Marginals sum out; conditionals divide.
SRC: Grimmett G, Stirzaker D, Probability and Random Processes (4th edn, Oxford University Press 2020) | textbook | 2020 | https://global.oup.com/
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
NUM1#maths-u12-05-q1@1: Using the joint table P(0,0) = 0.3, P(0,1) = 0.2, P(1,0) = 0.1, P(1,1) = 0.4, find P(Y = 1 ∣ X = 1). | 0.8 | 0.001 |  | P(X = 1) = 0.5, so P(Y = 1 ∣ X = 1) = 0.4/0.5 = 0.8.
M1#maths-u12-05-q2@1: What is a marginal distribution? | The distribution of one variable, summed over the others | The edge of a probability table that's always zero | The most likely value | A conditional distribution | The joint distribution itself | Summing the joint probabilities over the other variable leaves one variable's distribution.
M2#maths-u12-05-q3@2: A joint density factorises as f(x, y) = g(x)h(y) on a rectangle. What does that show? | X and Y are independent | X and Y are equal | X and Y are perfectly correlated | The density is invalid | Nothing about dependence | A product form on a rectangular support means the joint density is the product of the marginals.

## Bayes' Theorem
S: Bayes' theorem reverses conditional probabilities: from P(evidence ∣ cause) it gives P(cause ∣ evidence). It's the logic of diagnosis, spam filters and learning from data, and it explains why a positive test for a rare disease is often a false alarm.
O: Apply Bayes' theorem with the law of total probability
O: Explain base-rate neglect and Bayesian updating
T: Bayes' theorem | P(A ∣ B) = P(B ∣ A)P(A)/P(B)
T: Prior and posterior | The probability before seeing evidence, and the updated probability afterwards
H: The theorem
E: P(A ∣ B) = P(B ∣ A)P(A)/[P(B ∣ A)P(A) + P(B ∣ A′)P(A′)]
- The denominator is P(B) from the law of total probability.
- It follows in one line from P(A ∩ B) = P(A | B)P(B) = P(B | A)P(A).
- Named after Thomas Bayes (published 1763); Laplace developed it into a general method.
H: Diagnostic tests
- Sensitivity: P(positive | disease). Specificity: P(negative | no disease).
- For a rare disease, false positives from the many healthy people can outnumber true positives.
- Base-rate neglect: ignoring the prior (prevalence) and trusting the test's accuracy alone.
- Natural frequencies help: "of 1,000 people, 10 have the disease…".
H: Updating
- Posterior ∝ likelihood × prior.
- Today's posterior becomes tomorrow's prior as more evidence arrives.
- Spam filters, medical decision tools and Bayesian statistics (School 13) all work this way.
X: A disease affects 1% of people. A test detects 90% of cases but also gives positives for 5% of healthy people. Find P(disease ∣ positive).
> P(positive) = 0.9 × 0.01 + 0.05 × 0.99 = 0.009 + 0.0495 = 0.0585
> P(disease | positive) = 0.009/0.0585
> ≈ 0.154: only about 15% of positives have the disease
K: Bayes' theorem reverses conditioning; always include the base rate; posterior ∝ likelihood × prior.
!: Assuming a 90%-accurate test means a positive result is 90% likely to be right.
Q: What is the prior in a diagnostic test problem? | The prevalence: P(disease) before testing.
Q: What is specificity? | P(negative test ∣ no disease).
SUM: Bayes' theorem turns P(B ∣ A) into P(A ∣ B).
SUM: Base rates matter.
SRC: Gigerenzer G, Reckoning with Risk: Learning to Live with Uncertainty (Penguin 2003) | textbook | 2003 | https://www.penguin.co.uk/
SRC: Bayes T, An essay towards solving a problem in the doctrine of chances, Philosophical Transactions of the Royal Society 53, 370 | journal | 1763 | https://doi.org/10.1098/rstl.1763.0053
NUM1#maths-u12-06-q1@1: A factory's machine A makes 60% of items with 2% faulty; machine B makes 40% with 5% faulty. An item is faulty. Find P(it came from A), to 4 decimal places. | 0.375 | 0.001 |  | P(faulty) = 0.012 + 0.02 = 0.032, so P(A ∣ faulty) = 0.012/0.032 = 0.375.
M1#maths-u12-06-q2@1: What does Bayes' theorem calculate from P(B ∣ A), P(A) and P(B)? | P(A ∣ B) | P(A ∩ B) only | P(A ∪ B) | P(A′) | P(B′) | It reverses the direction of conditioning.
M3#maths-u12-06-q3@2: A rare condition (1 in 10,000) has a test with 99% sensitivity and 99% specificity. Roughly what fraction of positives are true positives? | About 1% | About 99% | About 50% | About 90% | About 10% | Per million: 99 true positives against about 10,000 false positives, so roughly 1%.

## Random Variables
S: A random variable assigns a number to each outcome of an experiment: the number of heads, the waiting time, the profit. Turning outcomes into numbers lets us calculate averages, spreads and distributions.
O: Define a random variable and list its distribution
O: Distinguish discrete and continuous random variables
T: Random variable | A function X from the sample space to the real numbers
T: Indicator variable | A variable equal to 1 if an event happens and 0 otherwise
H: The idea
- Toss three coins and let X be the number of heads: X takes values 0, 1, 2, 3 with probabilities 1/8, 3/8, 3/8, 1/8.
- Capital X is the variable; lower-case x is a value it takes; P(X = x) is the probability of that value.
- Discrete: countable values (counts). Continuous: any value in an interval (measurements).
H: Functions of random variables
- If X is a random variable, so are 2X + 3, X^{2} and e^{X}.
- Y = g(X): find its distribution by working out which X values give each Y value.
- Several variables on the same experiment can be combined: the total score on two dice is X₁ + X₂.
H: Indicators
- An indicator I_{A} has E(I_{A}) = P(A).
- Counts can be written as sums of indicators, which makes expectations easy: the expected number of fixed points in a random shuffle is 1.
- Random variables are the bridge from probability to statistics.
X: Two dice are rolled and X is the larger score. Find P(X = 6).
> P(X ≤ 5) means both dice are at most 5: (5/6)^{2} = 25/36
> P(X ≤ 6) = 1
> P(X = 6) = 1 − 25/36 = 11/36
P: **Investigate with the lab.** Treat each sample mean as a random variable: run the simulation twice with the same settings and compare the two histograms.
IX: clt
K: A random variable turns outcomes into numbers; list values and probabilities; indicators have expectation equal to the probability.
!: Confusing the random variable X with a particular value x.
Q: Is the time until a bus arrives discrete or continuous? | Continuous.
Q: What is the expected value of an indicator of event A? | P(A).
SUM: Random variables map outcomes to numbers.
SUM: Discrete variables count; continuous ones measure.
SRC: Grimmett G, Stirzaker D, Probability and Random Processes (4th edn, Oxford University Press 2020) | textbook | 2020 | https://global.oup.com/
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
M1#maths-u12-07-q1@1: Which is a discrete random variable? | The number of emails received in an hour | A person's height | The time to run 100 m | The temperature at noon | The mass of an apple | Counts take separate, countable values, unlike measurements.
M2#maths-u12-07-q2@2: Three coins are tossed and X counts heads. What is P(X ≥ 2)? | 1/2 | 3/8 | 1/8 | 7/8 | 3/4 | Add the probabilities of 2 and 3 heads: P(X = 2) + P(X = 3) = 3/8 + 1/8 = 1/2.
M2#maths-u12-07-q3@2: Why is a sample mean a random variable? | It depends on which values happen to be sampled, so it varies from sample to sample | It is always equal to the population mean | It has no distribution | It is a fixed number | It only varies for normal populations | Each new random sample gives a different mean, with its own distribution.

## Discrete Random Variables
S: A discrete random variable takes a countable set of values, each with a positive probability. Its distribution is a list or formula of probabilities, from which its mean, spread and other probabilities follow.
O: Find unknown constants in a discrete distribution
O: Calculate probabilities and expectations from a distribution
T: Probability distribution (discrete) | The list of values x with their probabilities P(X = x), adding to 1
T: Support | The set of values a random variable can take with positive probability
H: Valid distributions
- Every probability is between 0 and 1 and they add to 1.
- To find a constant k, set the sum equal to 1 and solve.
- Probabilities over ranges: add the relevant values. P(2 ≤ X ≤ 4) = P(2) + P(3) + P(4).
- Take care with strict and non-strict inequalities: P(X < 3) excludes 3.
H: Summaries
- Mean: E(X) = Σ x P(X = x). Variance: E(X^{2}) − [E(X)]^{2}.
- Mode: the most likely value.
- Linear changes: E(aX + b) = aE(X) + b and Var(aX + b) = a^{2} Var(X).
H: Standard families
- Bernoulli and binomial (successes in trials), geometric (trials until the first success), Poisson (events in an interval), hypergeometric (sampling without replacement).
- Each has a formula for P(X = x) and known mean and variance (later in this school).
X: P(X = x) = kx for x = 1, 2, 3, 4. Find k and E(X).
> k(1 + 2 + 3 + 4) = 10k = 1, so k = 0.1
> E(X) = Σ x × 0.1x = 0.1(1 + 4 + 9 + 16)
> = 0.1 × 30 = 3
K: Probabilities sum to 1, which fixes unknown constants; E(X) = Σ x P(X = x); watch < versus ≤ for discrete variables.
!: Treating P(X < 3) and P(X ≤ 3) as the same for a discrete variable.
Q: If P(X = 0) = 0.2 and P(X = 1) = 0.5 and X takes only 0, 1, 2, what is P(X = 2)? | 0.3.
Q: What is E(3X − 1) if E(X) = 4? | 11.
SUM: Discrete distributions list values and probabilities.
SUM: Sums give probabilities and means.
SRC: Department for Education, Mathematics AS and A level subject content: statistics | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
NUM1#maths-u12-08-q1@1: X takes values 1, 2 and 3 with probabilities 0.2, 0.5 and 0.3. Find E(X). | 2.1 | 0.001 |  | E(X) = 0.2 + 1.0 + 0.9 = 2.1.
M1#maths-u12-08-q2@1: Which of these is a valid probability distribution for X = 0, 1, 2? | 0.25, 0.5, 0.25 | 0.5, 0.5, 0.5 | 0.2, 0.3, 0.4 | −0.1, 0.6, 0.5 | 1, 1, 1 | Only 0.25, 0.5, 0.25 is non-negative and adds to exactly 1.
M2#maths-u12-08-q3@2: If Var(X) = 4, what is Var(3X + 7)? | 36 | 12 | 19 | 43 | 4 | Adding 7 doesn't change spread; multiplying by 3 multiplies the variance by 9.

## Continuous Random Variables
S: A continuous random variable can take any value in an interval: heights, times, temperatures. Single values have probability zero; instead, probabilities are areas under a density curve.
O: Calculate probabilities, means and medians for continuous variables
O: Explain why P(X = x) = 0 for a continuous variable
T: Continuous random variable | A variable with P(a ≤ X ≤ b) = ∫_{a}^{b} f(x) dx for a density f
T: Median (continuous) | The value m with P(X ≤ m) = 0.5
H: Probability as area
- P(a < X < b) = ∫_{a}^{b} f(x) dx; whether the ends are included makes no difference.
- P(X = x) = 0 for every single value: a height of exactly 1.7500… m has probability zero.
- The total area under f is 1.
H: Summaries
- Mean: E(X) = ∫ x f(x) dx. Variance: ∫ x^{2} f(x) dx − μ^{2}.
- Median m: solve ∫_{−∞}^{m} f(x) dx = 0.5. Quartiles use 0.25 and 0.75.
- Mode: where f is largest.
H: Modelling
- Real measurements are rounded, so continuous models are idealisations that work well.
- Normal, exponential and uniform models are the commonest (later in this school).
- Simulation turns uniform random numbers into any continuous distribution (inverse transform, see Cumulative Distribution Functions).
X: X has density f(x) = 3x^{2} for 0 ≤ x ≤ 1. Find P(X < 0.5), E(X) and the median.
> P(X < 0.5) = [x^{3}]_{0}^{0.5} = 0.125
> E(X) = ∫_{0}^{1} 3x^{3} dx = 3/4
> Median: m^{3} = 0.5, so m = 0.5^{1/3} ≈ 0.794
K: Probabilities are areas under the density; single values have probability zero; integrate for means and solve for medians.
!: Evaluating f(x) at a point and calling it a probability.
Q: What is P(X = 2) for a continuous random variable? | 0.
Q: How do you find E(X) for a continuous variable? | ∫ x f(x) dx over the support.
SUM: Continuous probabilities are areas.
SUM: Integrals give means; equations give medians.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
NUM1#maths-u12-09-q1@1: X has density f(x) = x/2 on 0 ≤ x ≤ 2. Find E(X), to 4 decimal places. | 1.3333 | 0.0001 |  | E(X) = ∫_{0}^{2} x^{2}/2 dx = [x^{3}/6]_{0}^{2} = 8/6 ≈ 1.3333.
M1#maths-u12-09-q2@1: Why is P(X = 3) zero for a continuous X? | A single point has no width, so its area is zero | Because 3 is outside the support | Because densities are always below 1 | It isn't zero | Because continuous variables can't equal whole numbers | An integral over an interval of length zero is zero.
M3#maths-u12-09-q3@2: X has density f(x) = 2x on [0, 1]. What is its median? | 1/√2 ≈ 0.707 | 0.5 | 2/3 | 0.25 | 0.75 | The CDF is F(x) = x^{2}; setting F(m) = 0.5 gives m = √0.5 ≈ 0.707.

## Probability Distributions
S: A probability distribution describes how probability is spread over the values of a random variable. Standard families, each controlled by a few parameters, model counts, waiting times, measurements and extremes.
O: Choose an appropriate distribution for a situation
O: Explain the role of parameters and modelling assumptions
T: Parameter | A constant that picks one member of a family, such as n and p for the binomial
T: Distribution family | A set of distributions with the same formula and different parameter values
H: Matching situations to models
- Number of successes in n independent trials with fixed p: binomial.
- Number of events in a fixed interval at a constant rate: Poisson.
- Trials until the first success: geometric. Waiting time to the next event: exponential.
- Sums and averages of many small effects: normal.
- Sizes with a heavy right tail (incomes, file sizes): log-normal or Pareto.
H: Assumptions and checking
- Each model has assumptions (independence, constant probability, constant rate) to check against the context.
- Compare model predictions with data: frequency tables, histograms, Q–Q plots, goodness-of-fit tests (School 13).
- "All models are wrong, but some are useful" (George Box).
H: Describing a distribution
- Shape (symmetric, skewed, heavy-tailed), centre (mean, median), spread (variance, interquartile range).
- Discrete distributions have mass functions; continuous ones have densities; both have distribution functions.
X: A call centre receives an average of 3 calls per minute, at random. Choose a model and find the probability of no calls in a minute.
> Events occur randomly at a constant average rate: Poisson with λ = 3
> P(X = 0) = e^{−3} × 3^{0}/0!
> = e^{−3} ≈ 0.0498
K: Match the story to the family (counts, waits, sums, extremes); parameters select the member; check assumptions against data.
!: Using a binomial model when trials aren't independent or p changes.
Q: Which distribution models the number of sixes in 20 rolls? | Binomial with n = 20, p = 1/6.
Q: Which distribution models the time until the next radioactive decay? | Exponential.
SUM: Families of distributions model common situations.
SUM: Check the assumptions.
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods, section 1.3.6: Probability distributions | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
SRC: Box GEP, Science and statistics, Journal of the American Statistical Association 71(356), 791 | journal | 1976 | https://doi.org/10.1080/01621459.1976.10480949
M1#maths-u12-10-q1@1: Which distribution best models the number of typing errors on a page, at a known average rate? | Poisson | Binomial with n = 2 | Uniform | Normal with mean 0 | Geometric | Errors occur randomly in a fixed "interval" (a page) at a constant rate.
M2#maths-u12-10-q2@2: A model assumes trials are independent with constant success probability. Which family is that? | Binomial | Poisson | Hypergeometric | Exponential | Uniform | Independence and fixed p over n trials define the binomial; the hypergeometric drops independence.

## Probability Mass Functions
S: A probability mass function (pmf) gives the probability of each value of a discrete random variable. It's the complete description of the distribution, from which every probability, mean and variance can be calculated.
O: Check that a function is a valid pmf
O: Use a pmf to find probabilities, modes and the distribution function
T: Probability mass function | p(x) = P(X = x) for a discrete random variable X
T: Mode | The value with the largest probability
H: Validity
- p(x) ≥ 0 for every x, and Σ p(x) = 1 over the support.
- A pmf can be a table, a formula or a bar chart.
- An infinite support is allowed if the sum converges: p(x) = (½)^{x} for x = 1, 2, 3, … sums to 1.
H: Using a pmf
- Probabilities of sets: add the masses. P(X is even) = p(2) + p(4) + ….
- Cumulative: F(x) = Σ_{t ≤ x} p(t), a step function.
- Mean and variance: weighted sums of x and x^{2}.
H: Shape
- Symmetric, left-skewed or right-skewed; one mode or several.
- The Poisson pmf with small λ is right-skewed; with large λ it's nearly symmetric.
- Bar charts, not histograms, show pmfs: the bars sit on single values.
X: P(X = x) = c/x for x = 1, 2, 3. Find c and P(X = 1).
> c(1 + 1/2 + 1/3) = c × 11/6 = 1
> c = 6/11
> P(X = 1) = 6/11 ≈ 0.545
- Software and calculators give binomial and Poisson pmfs directly, but writing out a small table is the best check.
K: A pmf is non-negative and sums to 1; add masses for probabilities; cumulative sums give the step-shaped CDF.
!: Forgetting to check that the masses sum to 1 when a constant is involved.
Q: What does p(3) mean for a pmf p? | P(X = 3).
Q: Can a pmf have infinitely many values? | Yes, if the masses sum to 1, as in the geometric and Poisson distributions.
SUM: A pmf lists the probability of each value.
SUM: It determines everything about X.
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: Department for Education, Mathematics AS and A level subject content: statistics | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u12-11-q1@1: p(x) = k(x + 1) for x = 0, 1, 2, 3. Find k. | 0.1 | 0.0001 |  | k(1 + 2 + 3 + 4) = 10k = 1, so k = 0.1.
M1#maths-u12-11-q2@1: For p(x) = (1/2)^{x}, x = 1, 2, 3, …, what is P(X ≤ 2)? | 3/4 | 1/2 | 1/4 | 7/8 | 1 | P(X ≤ 2) adds the masses at 1 and 2: p(1) + p(2) = 1/2 + 1/4 = 3/4.
M2#maths-u12-11-q3@2: What does the graph of a discrete CDF look like? | A step function that jumps at each value | A smooth S-shaped curve | A bell curve | A straight line | A set of bars | F only increases at values with positive mass, by the size of that mass.

## Probability Density Functions
S: A probability density function (pdf) describes a continuous random variable: probabilities are areas under it. Unlike a pmf, a density can exceed 1, because it measures probability per unit, not probability itself.
O: Check that a function is a valid pdf and find unknown constants
O: Interpret density values correctly
T: Probability density function | A function f ≥ 0 with ∫ f(x) dx = 1, giving P(a < X < b) = ∫_{a}^{b} f(x) dx
T: Support | The interval where f(x) > 0
H: Validity
- f(x) ≥ 0 everywhere, and the total area is 1.
- A density can be larger than 1: uniform on [0, 0.5] has f(x) = 2.
- f(x) dx ≈ P(x < X < x + dx) for small dx: density × width ≈ probability.
H: Working with densities
- Piecewise densities: integrate each piece over its own interval.
- Unknown constants: set the total integral to 1.
- The mode is where f is highest; for a skewed density, mode, median and mean differ.
H: Transformations
- If Y = g(X) with g increasing, f_{Y}(y) = f_{X}(g^{−1}(y)) × d/dy g^{−1}(y).
- Or find the CDF of Y first and differentiate, which is usually safer.
- Example: if X is uniform on (0, 1), then −ln X is exponential with rate 1.
X: f(x) = kx(2 − x) for 0 ≤ x ≤ 2. Find k and P(X < 1).
> ∫_{0}^{2} kx(2 − x) dx = k[x^{2} − x^{3}/3]_{0}^{2} = k(4 − 8/3) = 4k/3 = 1, so k = 3/4
> P(X < 1) = (3/4)[x^{2} − x^{3}/3]_{0}^{1} = (3/4)(2/3)
> = 1/2 (as expected by symmetry about x = 1)
K: A pdf is non-negative with total area 1; it can exceed 1; integrate to get probabilities and to fix constants.
!: Thinking a density value above 1 means something went wrong.
Q: Can a probability density be greater than 1? | Yes, as long as the total area is 1.
Q: How do you find an unknown constant in a pdf? | Set the integral over the support equal to 1.
SUM: Densities give probability per unit.
SUM: Areas under them are probabilities.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Grimmett G, Stirzaker D, Probability and Random Processes (4th edn, Oxford University Press 2020) | textbook | 2020 | https://global.oup.com/
NUM1#maths-u12-12-q1@1: f(x) = c on 2 ≤ x ≤ 6 (and 0 elsewhere). Find c. | 0.25 | 0.0001 |  | The rectangle has width 4, so c × 4 = 1 and c = 0.25.
M1#maths-u12-12-q2@1: Which function could be a pdf on [0, 1]? | f(x) = 2x | f(x) = x | f(x) = x − 0.5 | f(x) = 3 | f(x) = −2x | ∫_{0}^{1} 2x dx = 1 and 2x ≥ 0; the others fail positivity or the area condition.
M3#maths-u12-12-q3@2: X is uniform on (0, 1). What is the distribution of Y = −ln X? | Exponential with rate 1 | Uniform on (0, 1) | Normal | Poisson with mean 1 | Uniform on (−1, 0) | P(Y > y) = P(X < e^{−y}) = e^{−y}, the exponential survival function.

## Cumulative Distribution Functions
S: The cumulative distribution function (CDF) F(x) = P(X ≤ x) works for every random variable, discrete or continuous. It gives probabilities of intervals, defines medians and quantiles, and lets computers simulate any distribution.
O: Find and use CDFs for discrete and continuous variables
O: Find quantiles and explain inverse transform sampling
T: Cumulative distribution function | F(x) = P(X ≤ x)
T: Quantile function | F^{−1}(p), the value below which a proportion p of the distribution lies
H: Properties
- F is non-decreasing, with F(x) → 0 as x → −∞ and F(x) → 1 as x → ∞.
- P(a < X ≤ b) = F(b) − F(a).
- Continuous: F is continuous and f(x) = F′(x). Discrete: F is a step function.
H: Quantiles
- Median: F(m) = 0.5. Lower and upper quartiles: F = 0.25 and 0.75. Percentiles similarly.
- Value at Risk in finance is a quantile of the loss distribution (School 21).
- Survival function: S(x) = 1 − F(x) = P(X > x), used for lifetimes and reliability.
H: Simulation
- Inverse transform: if U is uniform on (0, 1), then X = F^{−1}(U) has CDF F.
- For the exponential, F^{−1}(u) = −ln(1 − u)/λ.
- This is how software generates random numbers from many distributions.
X: X has CDF F(x) = 1 − e^{−2x} for x ≥ 0. Find P(1 < X ≤ 2) and the median.
> P(1 < X ≤ 2) = F(2) − F(1) = e^{−2} − e^{−4}
> ≈ 0.1353 − 0.0183 = 0.1170
> Median: 1 − e^{−2m} = 0.5, so m = (ln 2)/2 ≈ 0.347
K: F(x) = P(X ≤ x); differences give interval probabilities; solve F = p for quantiles; F^{−1}(U) simulates X.
!: Forgetting that F must reach 1 and never decrease when checking a proposed CDF.
Q: How do you get the pdf from a continuous CDF? | Differentiate: f(x) = F′(x).
Q: What is P(X > a) in terms of F? | 1 − F(a).
SUM: The CDF works for every random variable.
SUM: Inverting it gives quantiles and simulations.
SRC: Grimmett G, Stirzaker D, Probability and Random Processes (4th edn, Oxford University Press 2020) | textbook | 2020 | https://global.oup.com/
SRC: Devroye L, Non-Uniform Random Variate Generation (Springer 1986) | textbook | 1986 | https://luc.devroye.org/rnbookindex.html
NUM1#maths-u12-13-q1@1: F(x) = x^{2}/16 for 0 ≤ x ≤ 4. Find the upper quartile. | 3.4641 | 0.001 |  | x^{2}/16 = 0.75, so x^{2} = 12 and x = √12 ≈ 3.464.
M1#maths-u12-13-q2@1: Which property must every CDF have? | It never decreases | It's always continuous | It's always differentiable | It's symmetric about 0 | It can exceed 1 | F(x) = P(X ≤ x) accumulates probability, so it can only stay level or rise.
M2#maths-u12-13-q3@2: How does inverse transform sampling produce an exponential(λ) value from a uniform U? | X = −ln(1 − U)/λ | X = λU | X = e^{U} | X = U/λ | X = ln U × λ | Solving 1 − e^{−λx} = U for x gives the exponential quantile function.

## Expected Value
S: The expected value of a random variable is its long-run average: the probability-weighted mean of its values. It prices insurance and bets, guides decisions under uncertainty, and is the starting point for every summary of a distribution.
O: Calculate expected values of discrete and continuous random variables
O: Use linearity of expectation to simplify problems
T: Expected value | E(X) = Σ x P(X = x) (discrete) or ∫ x f(x) dx (continuous)
T: Linearity of expectation | E(aX + bY + c) = aE(X) + bE(Y) + c, for any X and Y, independent or not
H: Calculating
- A fair die: E(X) = (1 + 2 + … + 6)/6 = 3.5, a value the die can't actually show.
- Functions: E(g(X)) = Σ g(x) P(X = x); E(X^{2}) is needed for the variance.
- In general E(g(X)) ≠ g(E(X)): E(X^{2}) ≥ [E(X)]^{2} (a case of Jensen's inequality).
H: Linearity
- E(X + Y) = E(X) + E(Y) always, even for dependent variables.
- Expected number of heads in 100 tosses: 100 × 0.5 = 50, using indicators.
- E(XY) = E(X)E(Y) needs independence (or zero covariance).
H: Decisions
- A game is fair if the expected gain is zero; casinos and lotteries have negative expected value for players.
- Insurers set premiums above the expected claim to cover costs and risk.
- The St Petersburg paradox: a game with infinite expected value that no one would pay much to play, which led Bernoulli to expected utility.
X: You pay £2 to roll a die and win £10 if it shows a six. Find your expected gain.
> P(six) = 1/6, so expected winnings = 10 × 1/6 = £1.67 (to the nearest penny)
> Expected gain = 10/6 − 2 = −1/3
> About −£0.33 per game: on average you lose 33p
K: E(X) is the probability-weighted mean; expectation is linear for any variables; E(XY) = E(X)E(Y) only under independence.
!: Assuming E(X^{2}) = [E(X)]^{2}.
Q: What is E(X + Y) if E(X) = 3 and E(Y) = 5? | 8, whether or not they're independent.
Q: What is the expected score on a fair four-sided die (1 to 4)? | 2.5.
SUM: Expected value is the long-run average.
SUM: It's linear, which simplifies many problems.
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: Department for Education, Mathematics AS and A level subject content: statistics | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u12-14-q1@1: A raffle has 500 tickets at £1 each; one prize of £200 and two of £50. What is the expected gain per ticket, in pounds? | -0.4 | 0.001 | £ | Expected winnings are (200 + 100)/500 = £0.60, minus the £1 cost, giving −£0.40.
M1#maths-u12-14-q2@1: Which statement about expectation is always true? | E(X + Y) = E(X) + E(Y) | E(XY) = E(X)E(Y) | E(X^{2}) = [E(X)]^{2} | E(1/X) = 1/E(X) | E(X) is a possible value of X | Linearity needs no independence; the others fail in general.
M2#maths-u12-14-q3@2: A letter-shuffling machine puts n letters in n envelopes at random. What is the expected number in the correct envelope? | 1 | n | n/2 | 1/n | 0 | Each letter is correct with probability 1/n; by linearity the expected total is n × 1/n = 1.

## Variance
S: Variance measures how far a random variable typically strays from its mean: the expected squared deviation. It quantifies risk, measurement error and uncertainty, and it adds neatly for independent variables.
O: Calculate variance using E(X^{2}) − [E(X)]^{2}
O: Apply the rules for the variance of linear combinations
T: Variance | Var(X) = E[(X − μ)^{2}] = E(X^{2}) − μ^{2}
T: Independence rule | Var(X ± Y) = Var(X) + Var(Y) for independent X and Y
H: Calculating
- Use the computational form: Var(X) = E(X^{2}) − [E(X)]^{2}.
- Variance is never negative, and is zero only for a constant.
- Units are squared: a variance of a length in metres is in m^{2}.
H: Rules
- Var(aX + b) = a^{2} Var(X): shifting doesn't change spread; scaling multiplies the variance by a^{2}.
- Var(X + Y) = Var(X) + Var(Y) + 2 Cov(X, Y); the covariance term vanishes under independence.
- Var(X − Y) = Var(X) + Var(Y) for independent variables: uncertainties add even when you subtract.
- The mean of n independent copies has variance σ^{2}/n, which is why averaging reduces noise.
H: Uses
- Finance: variance of returns measures risk.
- Manufacturing: tolerances are set from the variance of part dimensions.
- Measurement: combined uncertainty from independent sources adds in quadrature (variances add).
X: Find the variance of the score on a fair die.
> E(X) = 3.5, E(X^{2}) = (1 + 4 + 9 + 16 + 25 + 36)/6 = 91/6
> Var(X) = 91/6 − 3.5^{2} = 91/6 − 49/4
> = 35/12 ≈ 2.917
K: Var(X) = E(X^{2}) − μ^{2}; Var(aX + b) = a^{2}Var(X); independent variances add, even for differences.
!: Writing Var(X − Y) = Var(X) − Var(Y) for independent X and Y.
Q: What is Var(5) for the constant 5? | 0.
Q: If Var(X) = 3, what is Var(−2X)? | 12.
SUM: Variance is the expected squared deviation.
SUM: Independent variances add.
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: Joint Committee for Guides in Metrology, Evaluation of measurement data: Guide to the expression of uncertainty in measurement (JCGM 100:2008) | standard | 2008 | https://www.bipm.org/en/committees/jc/jcgm/publications
NUM1#maths-u12-15-q1@1: X has E(X) = 4 and E(X^{2}) = 20. Find Var(X). | 4 | 0 |  | Var(X) = 20 − 4^{2} = 4.
M1#maths-u12-15-q2@1: Independent X and Y have variances 4 and 9. What is Var(X − Y)? | 13 | 5 | −5 | 36 | √13 | Variances of independent variables add for sums and differences: 4 + 9 = 13.
M3#maths-u12-15-q3@2: What is the variance of the mean of 25 independent measurements, each with variance 100? | 4 | 100 | 20 | 2,500 | 10 | Averaging n independent values divides the variance by n: Var(X̄) = 100/25 = 4.

## Standard Deviation
S: The standard deviation is the square root of the variance, which puts spread back into the original units. It's the most common measure of spread, and it sets the scale for z-scores, error bars and statements like "within two standard deviations".
O: Calculate and interpret standard deviation
O: Use Chebyshev's inequality and the normal 68–95–99.7 rule
T: Standard deviation | σ = √Var(X)
T: Chebyshev's inequality | P(|X − μ| ≥ kσ) ≤ 1/k^{2} for any distribution with finite variance
H: Calculating and interpreting
- σ is in the same units as X.
- SD(aX + b) = |a| σ: scaling by a multiplies the SD by |a|.
- Standard deviations don't add for independent variables; variances do: SD(X + Y) = √(σ_{X}^{2} + σ_{Y}^{2}).
H: How much lies within kσ?
- Chebyshev (any distribution): at least 75% within 2σ, at least 89% within 3σ.
- Normal distribution: about 68% within 1σ, 95% within 2σ, 99.7% within 3σ.
- z-score: z = (x − μ)/σ measures how many SDs a value lies from the mean.
H: Uses
- Quality control: "six sigma" processes aim for very few defects per million.
- Error bars on graphs often show ±1 standard deviation or ±1 standard error (σ/√n).
- Investment volatility is the standard deviation of returns.
X: X has mean 50 and standard deviation 5. What does Chebyshev's inequality say about P(40 < X < 60)?
> 40 and 60 are 2 standard deviations from the mean, so k = 2
> P(|X − 50| ≥ 10) ≤ 1/4
> So P(40 < X < 60) ≥ 3/4, whatever the distribution
K: σ = √variance, in the original units; Chebyshev gives a guaranteed bound; the normal 68–95–99.7 rule is sharper but needs normality.
!: Adding standard deviations of independent variables instead of adding variances.
Q: What is SD(3X) if SD(X) = 2? | 6.
Q: For a normal distribution, roughly what percentage lies within 2σ of the mean? | About 95%.
SUM: Standard deviation is spread in the original units.
SUM: Chebyshev and the normal rule describe concentration.
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods, section 1.3.5: Quantitative techniques | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
NUM1#maths-u12-16-q1@1: Independent X and Y have standard deviations 3 and 4. Find SD(X + Y). | 5 | 0 |  | Add the variances: 9 + 16 = 25, then take the square root to get 5.
M1#maths-u12-16-q2@1: By Chebyshev, at least what proportion of any distribution lies within 3 standard deviations of the mean? | 8/9 | 1/9 | 3/4 | 99.7% | 2/3 | Chebyshev bounds the outside by 1/k^{2}, so the inside is at least 1 − 1/9 = 8/9 ≈ 89%.
M2#maths-u12-16-q3@2: A value has z-score −1.5 in a distribution with mean 80 and SD 6. What is the value? | 71 | 89 | 78.5 | 74 | 86 | Reverse the standardisation: x = μ + zσ = 80 − 1.5 × 6 = 71.

## Covariance
S: Covariance measures how two random variables vary together: positive when they rise together, negative when one rises as the other falls. Scaled into correlation, it's central to statistics, portfolio theory and machine learning.
O: Calculate covariance and correlation
O: Explain why zero covariance doesn't imply independence
T: Covariance | Cov(X, Y) = E[(X − μ_{X})(Y − μ_{Y})] = E(XY) − E(X)E(Y)
T: Correlation coefficient | ρ = Cov(X, Y)/(σ_{X} σ_{Y}), between −1 and 1
H: Calculating
- Use Cov(X, Y) = E(XY) − E(X)E(Y).
- Cov(X, X) = Var(X); Cov(aX + b, cY + d) = ac Cov(X, Y).
- Correlation is unit-free: ρ = ±1 only for exact linear relationships.
H: Covariance and independence
- Independence implies Cov = 0.
- The converse fails: X uniform on {−1, 0, 1} and Y = X^{2} have Cov = 0, yet Y is completely determined by X.
- Correlation measures only linear association.
H: Sums and portfolios
- Var(X + Y) = Var(X) + Var(Y) + 2 Cov(X, Y).
- Negatively correlated investments reduce portfolio variance: the basis of diversification (School 21).
- The covariance matrix of a random vector is the starting point for PCA and the multivariate normal.
X: From the joint table P(0,0) = 0.3, P(0,1) = 0.2, P(1,0) = 0.1, P(1,1) = 0.4, find Cov(X, Y).
> E(X) = 0.5, E(Y) = 0.6
> E(XY) = 1 × 1 × 0.4 = 0.4 (other cells have XY = 0)
> Cov(X, Y) = 0.4 − 0.5 × 0.6 = 0.1
K: Cov(X, Y) = E(XY) − E(X)E(Y); correlation scales it to [−1, 1]; zero covariance doesn't mean independence.
!: Concluding independence from zero correlation.
Q: What is Cov(X, X)? | Var(X).
Q: What does a correlation of −1 mean? | An exact decreasing linear relationship.
SUM: Covariance measures joint variation.
SUM: Correlation is its unit-free version.
SRC: Grimmett G, Stirzaker D, Probability and Random Processes (4th edn, Oxford University Press 2020) | textbook | 2020 | https://global.oup.com/
SRC: Markowitz H, Portfolio selection, Journal of Finance 7(1), 77 | journal | 1952 | https://doi.org/10.1111/j.1540-6261.1952.tb01525.x
NUM1#maths-u12-17-q1@1: Var(X) = 4, Var(Y) = 9 and Cov(X, Y) = 3. Find Var(X + Y). | 19 | 0 |  | Var(X + Y) = 4 + 9 + 2 × 3 = 19.
M1#maths-u12-17-q2@1: If Cov(X, Y) = 6, σ_{X} = 2 and σ_{Y} = 5, what is the correlation? | 0.6 | 6 | 0.3 | 1.2 | 0.06 | Divide the covariance by both standard deviations: ρ = 6/(2 × 5) = 0.6.
M3#maths-u12-17-q3@2: X is uniform on {−1, 0, 1} and Y = X^{2}. What is Cov(X, Y)? | 0, even though Y depends on X | 1 | −1 | 2/3 | It's undefined | E(XY) = E(X^{3}) = 0 and E(X) = 0, so Cov = 0 despite total dependence.

## Moments and Moment-Generating Functions
S: Moments summarise a distribution's shape: the first gives the mean, the second the spread, the third the skewness, the fourth the tail weight. The moment-generating function packages them all into one function and identifies the distribution.
O: Calculate moments, skewness and kurtosis
O: Use moment-generating functions to find moments and identify distributions
T: Moment | The kth moment is E(X^{k}); the kth central moment is E[(X − μ)^{k}]
T: Moment-generating function | M_{X}(t) = E(e^{tX}), when it exists near t = 0
H: Moments and shape
- First moment: mean. Second central moment: variance.
- Skewness = E[(X − μ)^{3}]/σ^{3}: positive for a long right tail.
- Kurtosis = E[(X − μ)^{4}]/σ^{4}: 3 for the normal; excess kurtosis above 0 means heavier tails.
H: Moment-generating functions
- Expand e^{tX} = 1 + tX + t^{2}X^{2}/2! + …, so M(t) = 1 + tE(X) + t^{2}E(X^{2})/2! + ….
- So M′(0) = E(X), M″(0) = E(X^{2}), and so on.
- If two variables have the same MGF near 0, they have the same distribution.
H: Sums
- For independent X and Y: M_{X+Y}(t) = M_{X}(t)M_{Y}(t).
- Poisson: M(t) = exp(λ(e^{t} − 1)); the product of two such is Poisson with λ₁ + λ₂.
- Some distributions (Cauchy, log-normal) have no MGF; the characteristic function E(e^{itX}) always exists.
X: Find the MGF of a Bernoulli(p) variable and use it to find the mean and variance.
> M(t) = (1 − p)e^{0} + pe^{t} = 1 − p + pe^{t}
> M′(0) = p and M″(0) = p, so E(X) = p and E(X^{2}) = p
> Var(X) = p − p^{2} = p(1 − p)
K: Moments describe location, spread, skew and tails; M^{(k)}(0) = E(X^{k}); independent sums multiply MGFs.
!: Assuming every distribution has an MGF.
Q: What is M(0) for any MGF? | 1.
Q: What is the excess kurtosis of a normal distribution? | 0.
SUM: Moments describe shape.
SUM: MGFs generate moments and identify distributions.
SRC: Casella G, Berger RL, Statistical Inference (2nd edn, Duxbury 2002) | textbook | 2002 | https://www.cengage.com/
SRC: Grimmett G, Stirzaker D, Probability and Random Processes (4th edn, Oxford University Press 2020) | textbook | 2020 | https://global.oup.com/
NUM1#maths-u12-18-q1@1: X has MGF M(t) = e^{3t + 2t^{2}}. Find E(X). | 3 | 0 |  | M′(t) = (3 + 4t)e^{3t + 2t^{2}}, so M′(0) = 3 (this is a normal with mean 3, variance 4).
M1#maths-u12-18-q2@1: What does positive skewness indicate? | A longer tail to the right | A longer tail to the left | A symmetric distribution | Light tails | A negative mean | Large values far above the mean make the third central moment positive.
M2#maths-u12-18-q3@2: X and Y are independent with MGFs M_{X} and M_{Y}. What is the MGF of X + Y? | M_{X}(t)M_{Y}(t) | M_{X}(t) + M_{Y}(t) | M_{X}(t)/M_{Y}(t) | M_{X}(M_{Y}(t)) | M_{X}(2t) | E(e^{t(X+Y)}) = E(e^{tX})E(e^{tY}) by independence.

## Law of Large Numbers
S: The law of large numbers says that the average of many independent repetitions settles down to the expected value. It's why casinos and insurers can rely on averages, and why frequencies estimate probabilities.
O: State the weak and strong laws of large numbers
O: Explain what the law does and doesn't say about streaks
T: Weak law of large numbers | For any ε > 0, P(|X̄_{n} − μ| > ε) → 0 as n → ∞
T: Strong law of large numbers | X̄_{n} → μ with probability 1
H: The statements
- X₁, X₂, … independent and identically distributed with mean μ; X̄_{n} is their average.
- Weak law: the average is unlikely to be far from μ when n is large.
- Strong law: the sequence of averages converges to μ for almost every sequence of outcomes.
- Jacob Bernoulli proved the first version (1713); Kolmogorov proved the strong law in general.
H: Why it works
- Var(X̄_{n}) = σ^{2}/n → 0, and Chebyshev's inequality gives the weak law directly.
- Frequencies: the proportion of heads converges to P(heads).
- Monte Carlo methods estimate integrals and probabilities by averaging simulations.
H: What it doesn't say
- It doesn't say outcomes "balance out": after 10 extra heads, the expected excess stays 10; it's diluted by later tosses, not cancelled.
- It needs a finite mean: averages of Cauchy variables never settle down.
- It says nothing about how fast; the central limit theorem gives the scale of fluctuations.
X: Using Chebyshev, how many tosses of a fair coin ensure P(|p̂ − 0.5| ≥ 0.05) ≤ 0.05?
> Var(p̂) = 0.25/n
> Chebyshev: P(|p̂ − 0.5| ≥ 0.05) ≤ (0.25/n)/0.05^{2} = 100/n
> 100/n ≤ 0.05 needs n ≥ 2,000 (a conservative bound)
P: **Investigate with the lab.** Run 10,000 coin flips and get within 0.01 of the true probability (the lab's challenge). Watch the raw count of heads minus n/2 keep wandering even as the proportion settles.
IX: lln
K: Averages converge to the mean; variance σ^{2}/n shrinks; the law dilutes streaks rather than correcting them.
!: Believing the law of large numbers means a run of losses must be followed by wins.
Q: What does the sample proportion of heads converge to? | The probability of heads.
Q: Which distribution's sample means don't converge? | The Cauchy (it has no mean).
SUM: Averages converge to expected values.
SUM: Streaks are diluted, not corrected.
SRC: Grimmett G, Stirzaker D, Probability and Random Processes (4th edn, Oxford University Press 2020) | textbook | 2020 | https://global.oup.com/
SRC: Bernoulli J, Ars Conjectandi (Basel 1713), trans. Sylla ED, The Art of Conjecturing (Johns Hopkins University Press 2006) | textbook | 2006 | https://www.press.jhu.edu/
NUM1#maths-u12-19-q1@1: Each simulation result has variance 4. What is the variance of the mean of 400 results? | 0.01 | 0.0001 |  | Var(X̄) = σ^{2}/n = 4/400 = 0.01.
M1#maths-u12-19-q2@1: What does the law of large numbers guarantee? | The sample mean approaches the population mean as n grows | Each outcome becomes more predictable | Streaks are followed by opposite streaks | The sample mean equals μ after 30 trials | The distribution becomes normal | It's about averages, not about individual outcomes or the shape of the distribution.
M2#maths-u12-19-q3@2: After 100 tosses, a fair coin shows 60 heads. What is the expected number of heads after 1,000 tosses in total? | 510 | 500 | 490 | 600 | 550 | The next 900 tosses are expected to give 450 heads; the earlier excess is diluted, not reversed.
M2#maths-u12-19-q4@2: As the number of fair coin flips grows, what settles down? | The proportion of heads, towards 0.5 | The difference between heads and tails, towards 0 | The number of heads, towards a fixed value | Nothing settles | The next flip becomes predictable | The law of large numbers concerns averages; the raw difference typically grows like √n.

## Central Limit Theorem
S: The central limit theorem says that sums and averages of many independent random variables are approximately normally distributed, whatever the original distribution. It explains why the normal curve is everywhere and justifies most of classical statistics.
O: State the central limit theorem and its conditions
O: Use the normal approximation for sums and means
T: Central limit theorem | For iid X₁, …, X_{n} with mean μ and variance σ^{2}, (X̄ − μ)/(σ/√n) is approximately N(0, 1) for large n
T: Standard error | σ/√n, the standard deviation of the sample mean
H: The theorem
- X̄ ≈ N(μ, σ^{2}/n) and the sum ΣX_{i} ≈ N(nμ, nσ^{2}).
- It needs independence and finite variance; the original distribution can be skewed or discrete.
- How large n must be depends on skewness: n ≥ 30 is a common rule of thumb, not a law.
H: Using it
- Standardise: z = (x̄ − μ)/(σ/√n) and use normal tables.
- Discrete sums: use a continuity correction (add or subtract 0.5).
- Confidence intervals and hypothesis tests for means rest on it (School 13).
H: Why it matters
- Measurement errors, heights and test scores are sums of many small effects, so they look normal.
- De Moivre (1733) found it for coin tossing; Laplace generalised it; Lyapunov proved general conditions (1901).
- It fails for heavy tails with infinite variance; stable distributions take over (later in this school).
X: A fair die is rolled 100 times. Estimate the probability that the total exceeds 370.
> Each roll has μ = 3.5 and σ^{2} = 35/12; the total has mean 350 and variance 291.7, SD ≈ 17.08
> With continuity correction: z = (370.5 − 350)/17.08 ≈ 1.20
> P(Z > 1.20) ≈ 0.115
P: **Investigate with the lab.** With n = 30 from the skewed population, plot 1,000 sample means and see a bell curve (the lab's challenge). Then check the spread is close to σ/√n.
IX: clt
K: Sums and means are approximately normal for large n; the standard error is σ/√n; use continuity corrections for discrete sums.
!: Thinking the CLT makes the individual observations normal: it's about sums and means.
Q: What is the standard error of the mean of 64 values with σ = 16? | 2.
Q: What condition does the CLT need besides independence? | A finite variance.
SUM: Sums of many effects are approximately normal.
SUM: The standard error shrinks like 1/√n.
SRC: Grimmett G, Stirzaker D, Probability and Random Processes (4th edn, Oxford University Press 2020) | textbook | 2020 | https://global.oup.com/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u12-20-q1@1: Bags of flour have mean mass 1,000 g and SD 20 g. What is the SD of the mean mass of 16 bags, in grams? | 5 | 0 | g | σ/√n = 20/√16 = 5 g.
M1#maths-u12-20-q2@1: What does the central limit theorem describe? | The approximate normality of sums and means | The convergence of probabilities to 0.5 | The exact distribution of every variable | Why variances add | How to calculate medians | It concerns the distribution of sums and averages of many independent variables.
M3#maths-u12-20-q3@2: The waiting times in a queue are strongly right-skewed. What is the distribution of the mean of 200 waiting times? | Approximately normal | Strongly right-skewed | Uniform | Exponential | Impossible to approximate | With n = 200 and finite variance, the CLT makes the sample mean approximately normal.
NUM1#maths-u12-20-q4@1: A population has σ = 12. What is the standard deviation of means of samples of size 36? | 2 | 0 |  | σ/√n = 12/6 = 2.

## Bernoulli Distribution
S: The Bernoulli distribution describes a single trial with two outcomes: success with probability p, failure with probability 1 − p. It's the simplest random variable and the building block of the binomial, geometric and many other distributions.
O: State the Bernoulli distribution and its mean and variance
O: Use Bernoulli variables to build other distributions
T: Bernoulli distribution | X = 1 with probability p and X = 0 with probability 1 − p
T: Bernoulli trial | A single experiment with two outcomes, success and failure
H: Properties
- E(X) = p; E(X^{2}) = p; Var(X) = p(1 − p).
- The variance is largest, 0.25, when p = 0.5: a fair coin is the most uncertain trial.
- pmf: P(X = x) = p^{x}(1 − p)^{1−x} for x = 0, 1.
H: Building block
- A sum of n independent Bernoulli(p) variables is binomial(n, p).
- The number of trials until the first success is geometric.
- Indicator variables for events are Bernoulli, with p = P(event).
H: Examples
- A patient responds to treatment or not; a component works or fails; a voter supports a candidate or not.
- Logistic regression (School 24) models p as a function of predictors.
- Named after Jacob Bernoulli, whose Ars Conjectandi (1713) studied repeated such trials.
X: A free kick is scored with probability 0.3. Let X = 1 if scored. Find the mean and standard deviation of X.
> E(X) = p = 0.3
> Var(X) = 0.3 × 0.7 = 0.21
> SD = √0.21 ≈ 0.458
K: Bernoulli: one trial, P(1) = p; mean p, variance p(1 − p), largest at p = 0.5; sums give the binomial.
!: Using Var(X) = p instead of p(1 − p).
Q: What is the variance of a Bernoulli(0.5) variable? | 0.25.
Q: What do you get by adding n independent Bernoulli(p) variables? | A binomial(n, p) variable.
SUM: Bernoulli trials have two outcomes.
SUM: They build many other distributions.
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: Bernoulli J, Ars Conjectandi (Basel 1713), trans. Sylla ED, The Art of Conjecturing (Johns Hopkins University Press 2006) | textbook | 2006 | https://www.press.jhu.edu/
NUM1#maths-u12-21-q1@1: X is Bernoulli with p = 0.8. Find Var(X). | 0.16 | 0.0001 |  | Var(X) = 0.8 × 0.2 = 0.16.
M1#maths-u12-21-q2@1: For which p is a Bernoulli variable's variance largest? | 0.5 | 0 | 1 | 0.25 | 0.75 | p(1 − p) is a downward parabola with its peak at p = 0.5.
M2#maths-u12-21-q3@2: What is E(X^{5}) for a Bernoulli(p) variable? | p | p^{5} | 5p | 1 | 0 | X only takes 0 and 1, so X^{5} = X and E(X^{5}) = p.

## Binomial Distribution
S: The binomial distribution counts successes in a fixed number of independent trials with the same probability of success. It models defective items, survey responses, correct guesses and much more.
O: State the conditions for a binomial model
O: Calculate binomial probabilities, mean and variance
T: Binomial distribution | X ~ B(n, p): P(X = r) = C(n, r) p^{r}(1 − p)^{n−r}, r = 0, 1, …, n
T: Binomial coefficient | C(n, r) = n!/(r!(n − r)!), the number of ways to choose which r trials succeed
H: Conditions
- A fixed number n of trials.
- Two outcomes per trial.
- Independent trials with the same probability p.
- Sampling without replacement from a small population breaks independence: use the hypergeometric instead.
H: Calculating
- Mean np; variance np(1 − p).
- Cumulative probabilities P(X ≤ r) come from tables or a calculator's binomial CDF function.
- P(X ≥ r) = 1 − P(X ≤ r − 1): careful with the boundary.
- The shape is symmetric when p = 0.5, right-skewed for small p.
H: Approximations
- Large n with np and n(1 − p) both above about 5: normal approximation N(np, np(1 − p)) with continuity correction.
- Large n and small p: Poisson with λ = np.
X: X ~ B(10, 0.2). Find P(X = 2) and P(X ≤ 1).
> P(X = 2) = C(10, 2)(0.2)^{2}(0.8)^{8} = 45 × 0.04 × 0.1678 ≈ 0.302
> P(X = 0) = 0.8^{10} ≈ 0.1074; P(X = 1) = 10 × 0.2 × 0.8^{9} ≈ 0.2684
> P(X ≤ 1) ≈ 0.376
K: Binomial needs fixed n, two outcomes, independence and constant p; mean np, variance np(1 − p); use the CDF for ranges.
!: Using a binomial model for sampling without replacement from a small group.
Q: What are the mean and variance of B(20, 0.25)? | Mean 5, variance 3.75.
Q: How do you find P(X ≥ 4) from a cumulative table? | 1 − P(X ≤ 3).
SUM: Binomial counts successes in n trials.
SUM: Mean np, variance np(1 − p).
SRC: Department for Education, Mathematics AS and A level subject content: statistics | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
NUM1#maths-u12-22-q1@1: A fair coin is tossed 5 times. Find P(exactly 3 heads). | 0.3125 | 0.0001 |  | C(5, 3) × 0.5^{5} = 10/32 = 0.3125.
M1#maths-u12-22-q2@1: Which situation is binomial? | Number of sixes in 30 rolls of a die | Number of rolls until the first six | Height of a student | Number of aces in a 5-card hand | Time between buses | Fixed n, independent rolls, constant p = 1/6; the hand of cards is without replacement.
M2#maths-u12-22-q3@2: X ~ B(n, p) has mean 6 and variance 4.2. What is n? | 20 | 10 | 30 | 15 | 6 | 1 − p = 4.2/6 = 0.7, so p = 0.3 and n = 6/0.3 = 20.

## Geometric Distribution
S: The geometric distribution models the number of trials until the first success. It's the discrete waiting-time distribution, and it's memoryless: past failures don't make success any more likely.
O: Calculate geometric probabilities and the mean
O: Explain the memoryless property
T: Geometric distribution | X ~ Geo(p): P(X = k) = (1 − p)^{k−1}p for k = 1, 2, 3, …
T: Memoryless property | P(X > m + n ∣ X > m) = P(X > n)
H: Formulas
- Mean 1/p; variance (1 − p)/p^{2}.
- P(X > k) = (1 − p)^{k}: the first k trials all fail.
- P(X ≤ k) = 1 − (1 − p)^{k}.
- Some books count failures before the first success (values 0, 1, 2, …, mean (1 − p)/p): check the convention.
H: Memorylessness
- If you've already failed m times, the number of further trials needed has the same distribution as at the start.
- It's the only memoryless discrete distribution; the exponential is the continuous one.
- That's the mathematical reason the gambler's fallacy is wrong for independent trials.
H: Examples
- Rolling until a six: mean 6 rolls.
- Number of calls until a sale; attempts until a password is guessed.
- The coupon collector's problem is a sum of geometric variables.
X: A die is rolled until a six appears. Find P(the first six is on the 4th roll) and the expected number of rolls.
> Three failures then a success: (5/6)^{3} × (1/6) = 125/1296
> ≈ 0.0965
> E(X) = 1/p = 6 rolls
K: P(X = k) = (1 − p)^{k−1}p; mean 1/p; P(X > k) = (1 − p)^{k}; it's memoryless.
!: Mixing up the "trials" and "failures" conventions, which shift the mean by 1.
Q: What is the mean number of tosses of a fair coin until the first head? | 2.
Q: What is P(X > 5) for a geometric variable with p = 0.1? | 0.9^{5} ≈ 0.590.
SUM: Geometric counts trials to the first success.
SUM: It forgets the past.
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u12-23-q1@1: X ~ Geo(0.2). Find P(X > 3). | 0.512 | 0.0001 |  | The first three trials must all fail: 0.8^{3} = 0.512.
M1#maths-u12-23-q2@1: Which distribution is the discrete counterpart of the exponential? | Geometric | Binomial | Poisson | Hypergeometric | Uniform | Both model waiting times and both are memoryless.
M3#maths-u12-23-q3@2: A player has failed 10 times at a game with p = 0.1 per attempt. What is the expected number of further attempts? | 10 | 0 | 1 | 9 | 20 | Memorylessness: the remaining wait has the original distribution, with mean 1/p = 10.

## Negative Binomial Distribution
S: The negative binomial distribution counts the number of trials needed to get r successes. It generalises the geometric distribution, and in a second form it's the standard model for count data that are more variable than the Poisson allows.
O: Calculate negative binomial probabilities, mean and variance
O: Explain its use for overdispersed counts
T: Negative binomial distribution | P(X = k) = C(k − 1, r − 1) p^{r}(1 − p)^{k−r}, k = r, r + 1, …
T: Overdispersion | Variance larger than the mean in count data
H: Trials until the rth success
- The last trial must be the rth success; the other r − 1 successes fall anywhere among the first k − 1 trials.
- Mean r/p; variance r(1 − p)/p^{2}.
- It's a sum of r independent geometric variables, which gives the mean and variance at once.
H: Counting failures
- An alternative form counts failures before the rth success: values 0, 1, 2, …, mean r(1 − p)/p.
- Written with mean μ and dispersion parameter, its variance is μ + μ^{2}/r, always above the mean.
H: Overdispersed counts
- Poisson counts have variance equal to the mean; real counts (insurance claims, species, gene reads) often vary more.
- The negative binomial arises as a Poisson whose rate is itself gamma-distributed: a mixture (later in this school).
- It's widely used in ecology, epidemiology and RNA sequencing analysis.
X: A fair coin is tossed until 3 heads appear. Find P(exactly 5 tosses are needed).
> The 5th toss is the 3rd head, so 2 heads fall among the first 4 tosses
> C(4, 2) × 0.5^{3} × 0.5^{2} = 6 × 1/32
> = 6/32 = 0.1875
K: Negative binomial: trials to the rth success; mean r/p; as a count model it handles variance above the mean.
!: Forgetting that the final trial must be a success, using C(k, r) instead of C(k − 1, r − 1).
Q: What is the negative binomial with r = 1? | The geometric distribution.
Q: What is overdispersion? | Count data with variance larger than the mean.
SUM: Negative binomial waits for r successes.
SUM: It models overdispersed counts.
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: Hilbe JM, Negative Binomial Regression (2nd edn, Cambridge University Press 2011) | textbook | 2011 | https://www.cambridge.org/
NUM1#maths-u12-24-q1@1: What is the mean number of trials to get 4 successes when p = 0.25? | 16 | 0 |  | E(X) = r/p = 4/0.25 = 16.
M1#maths-u12-24-q2@1: Why might an analyst choose a negative binomial model over a Poisson for counts? | The counts' variance is well above their mean | The counts are negative | There are only two outcomes | The counts are continuous | The mean is zero | The Poisson forces variance = mean; the negative binomial allows extra variation.
M2#maths-u12-24-q3@2: For trials to the 2nd success with p = 0.5, what is P(X = 2)? | 0.25 | 0.5 | 0.125 | 0.75 | 1 | Both first trials must succeed: 0.5^{2} = 0.25.

## Hypergeometric Distribution
S: The hypergeometric distribution counts successes when sampling without replacement from a finite population. It's the right model for card hands, lottery draws, quality inspection and Fisher's exact test.
O: Calculate hypergeometric probabilities
O: Compare the hypergeometric and binomial models
T: Hypergeometric distribution | Choosing n from N items of which K are successes: P(X = k) = C(K, k) C(N − K, n − k)/C(N, n)
T: Finite population correction | The factor (N − n)/(N − 1) that reduces the variance compared with the binomial
H: The formula
- Count ways to choose k successes from K and n − k failures from N − K, then divide by all ways to choose n from N.
- Mean nK/N, the same as a binomial with p = K/N.
- Variance n(K/N)(1 − K/N)(N − n)/(N − 1), smaller than the binomial's.
H: When to use it
- Draws without replacement from a small population: the trials aren't independent.
- If N is much larger than n (say n < 5% of N), the binomial is a good approximation.
- Quality control: inspecting a sample from a batch to decide whether to accept it.
H: Applications
- UK Lotto (6 numbers from 59): P(all 6) = 1/C(59, 6) = 1/45,057,474.
- Fisher's exact test for 2 × 2 tables uses the hypergeometric distribution (School 13).
- Capture–recapture estimates of animal populations.
X: A box has 5 red and 7 blue balls. Four are chosen without replacement. Find P(exactly 2 red).
> C(5, 2) × C(7, 2) = 10 × 21 = 210
> C(12, 4) = 495
> P = 210/495 ≈ 0.424
K: Hypergeometric = sampling without replacement; mean nK/N; smaller variance than the binomial; binomial approximates it for large N.
!: Using the binomial with p = K/N for a small population without replacement.
Q: What is the mean number of aces in a 5-card hand? | 5 × 4/52 ≈ 0.385.
Q: When is the binomial a good approximation to the hypergeometric? | When the population is large compared with the sample.
SUM: Hypergeometric handles sampling without replacement.
SUM: It underlies lotteries and exact tests.
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: The National Lottery, Lotto: how to play and odds | data | 2025 | https://www.national-lottery.co.uk/games/lotto
NUM1#maths-u12-25-q1@1: A committee of 3 is chosen at random from 4 women and 6 men. Find P(all 3 are women), to 4 decimal places. | 0.0333 | 0.0001 |  | C(4, 3)/C(10, 3) = 4/120 ≈ 0.0333.
M1#maths-u12-25-q2@1: Which situation calls for the hypergeometric distribution? | Counting hearts in a 5-card hand | Counting heads in 10 tosses | Counting calls in an hour | Rolling until a six | Measuring a height | Cards are dealt without replacement from a finite pack.
M3#maths-u12-25-q3@2: How does the variance of a hypergeometric count compare with a binomial of the same n and p = K/N? | It's smaller, by the factor (N − n)/(N − 1) | It's larger | It's the same | It's zero | It's n times larger | Without replacement, each draw gives information about the rest, which reduces variability.

## Poisson Distribution
S: The Poisson distribution counts events that happen randomly and independently at a constant average rate: calls per minute, decays per second, accidents per year. Its mean and variance are equal, a quick check on whether it fits.
O: Calculate Poisson probabilities
O: Use the Poisson as an approximation to the binomial
T: Poisson distribution | X ~ Po(λ): P(X = k) = e^{−λ}λ^{k}/k!, k = 0, 1, 2, …
T: Rate | λ, the mean number of events in the interval; it scales with the interval length
H: Conditions and properties
- Events occur singly, independently and at a constant average rate.
- Mean = variance = λ.
- Scaling: if there are 3 per minute on average, there are 15 per 5 minutes.
- Sums of independent Poissons are Poisson: Po(λ₁) + Po(λ₂) = Po(λ₁ + λ₂).
H: Approximating the binomial
- B(n, p) with n large and p small is close to Po(np).
- Rule of thumb: n > 50 and np < 5.
- Rare events: misprints, mutations, rare diseases in large populations.
H: History and checks
- Bortkiewicz (1898) fitted deaths from horse kicks in the Prussian army with a Poisson model.
- If the variance of observed counts is much greater than their mean, consider the negative binomial.
- The time between Poisson events is exponential (later in this school).
X: Emails arrive at a rate of 2.5 per hour. Find P(exactly 3 in an hour) and P(at least 1).
> P(X = 3) = e^{−2.5} × 2.5^{3}/3! = 0.0821 × 15.625/6
> ≈ 0.214
> P(X ≥ 1) = 1 − e^{−2.5} ≈ 0.918
K: Poisson models random events at a constant rate; mean = variance = λ; rates scale with the interval; it approximates rare binomials.
!: Forgetting to rescale λ when the interval changes.
Q: What are the mean and variance of Po(4)? | Both 4.
Q: Calls arrive at 6 per hour. What is λ for a 20-minute period? | 2.
SUM: Poisson counts random events.
SUM: Mean equals variance.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Bortkiewicz L von, Das Gesetz der kleinen Zahlen (Teubner 1898) | textbook | 1898 | https://archive.org/
NUM1#maths-u12-26-q1@1: X ~ Po(4). Find P(X = 0), to 4 decimal places. | 0.0183 | 0.0001 |  | P(X = 0) = e^{−4} ≈ 0.0183.
M1#maths-u12-26-q2@1: A batch of 2,000 items has a defect rate of 0.1%. Which model approximates the number of defects? | Po(2) | Po(0.001) | B(2000, 0.5) | N(0, 1) | Geo(0.001) | n is large and p small, so Po(np) = Po(2) works well.
M2#maths-u12-26-q3@2: Observed counts have mean 3.1 and variance 9.4. What does that suggest? | A Poisson model doesn't fit: the data are overdispersed | A Poisson model fits perfectly | The data are binomial | The mean must be wrong | Variance can't exceed the mean | A Poisson needs variance ≈ mean; here it's three times larger.

## Multinomial Distribution
S: The multinomial distribution generalises the binomial to more than two outcomes. It describes how n independent trials fall into k categories, such as dice faces, blood groups or votes for several parties.
O: Calculate multinomial probabilities
O: Describe the marginal distributions and covariances
T: Multinomial distribution | For n trials with category probabilities p₁, …, p_{k}: P(X₁ = x₁, …, X_{k} = x_{k}) = n!/(x₁! … x_{k}!) × p₁^{x₁} … p_{k}^{x_{k}}
T: Multinomial coefficient | n!/(x₁! x₂! … x_{k}!), the number of ways to arrange the outcomes
H: The formula
- The counts add to n and the probabilities add to 1.
- The coefficient counts arrangements; the product of powers is the probability of any one arrangement.
- With k = 2 it's the binomial.
H: Properties
- Each count X_{i} on its own is binomial(n, p_{i}): mean np_{i}, variance np_{i}(1 − p_{i}).
- Counts are negatively correlated: Cov(X_{i}, X_{j}) = −np_{i}p_{j}, because more in one category leaves fewer for others.
- Grouping categories keeps it multinomial.
H: Uses
- The chi-squared goodness-of-fit test compares observed category counts with multinomial expectations (School 13).
- Language models give a multinomial distribution over the next word; text classification often uses multinomial models.
- Genetics: genotype counts in a sample.
X: A fair die is rolled 6 times. Find the probability that each face appears exactly once.
> n!/(1! × … × 1!) = 6! = 720 arrangements
> Each arrangement has probability (1/6)^{6} = 1/46,656
> P = 720/46,656 ≈ 0.0154
K: Multinomial: n trials over k categories; coefficient × product of powers; each count is binomial; counts are negatively correlated.
!: Forgetting the multinomial coefficient and giving the probability of just one ordering.
Q: What is the marginal distribution of one multinomial count? | Binomial(n, p_{i}).
Q: Why are multinomial counts negatively correlated? | They share a fixed total n.
SUM: Multinomial extends the binomial.
SUM: It underlies goodness-of-fit tests.
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: Agresti A, Categorical Data Analysis (3rd edn, Wiley 2013) | textbook | 2013 | https://www.wiley.com/
NUM1#maths-u12-27-q1@1: Blood groups O, A, B, AB occur with probabilities 0.45, 0.4, 0.1, 0.05. In a sample of 20, what is the expected number with group A? | 8 | 0 |  | The count for A is binomial with n = 20, p = 0.4, mean 8.
M1#maths-u12-27-q2@1: A multinomial has n = 10 and p₁ = 0.3, p₂ = 0.5. What is Cov(X₁, X₂)? | −1.5 | 1.5 | 0 | −0.15 | 2.1 | Multinomial counts covary negatively: Cov = −np₁p₂ = −10 × 0.3 × 0.5 = −1.5.
M2#maths-u12-27-q3@2: Which distribution is the multinomial with exactly two categories? | Binomial | Poisson | Geometric | Hypergeometric | Normal | Two categories, success and failure, give the binomial.

## Beta-Binomial Distribution
S: The beta-binomial distribution is a binomial whose success probability is itself random, drawn from a beta distribution. It models clustered or heterogeneous yes/no data with more spread than the binomial, and it's the predictive distribution in Bayesian analysis of proportions.
O: Describe the beta-binomial as a mixture
O: Calculate its mean and explain its extra variance
T: Beta-binomial distribution | X given p is B(n, p), with p ~ Beta(α, β)
T: Compound (mixture) distribution | A distribution whose parameter is itself random
H: Construction
- First draw p from Beta(α, β), then draw X from B(n, p).
- P(X = k) = C(n, k) B(k + α, n − k + β)/B(α, β), where B is the beta function.
- Mean nα/(α + β), the same as a binomial with p = α/(α + β).
H: Extra variance
- Variance = np(1 − p) × (α + β + n)/(α + β + 1), larger than the binomial's when n > 1.
- It suits litters of animals, students in classes, or patients in hospitals, where units within a cluster share a success probability.
- As α + β grows, p becomes less variable and the beta-binomial approaches the binomial.
H: Bayesian prediction
- With a Beta(α, β) prior for p, the predicted number of successes in n new trials is beta-binomial.
- α = β = 1 (a uniform prior) gives a uniform distribution over 0, 1, …, n.
- After seeing s successes in m trials the prior updates to Beta(α + s, β + m − s) (School 13).
X: With α = β = 1 and n = 2, find the distribution of X.
> p is uniform on (0, 1); P(X = 0) = ∫₀¹ (1 − p)^{2} dp = 1/3
> P(X = 2) = ∫₀¹ p^{2} dp = 1/3
> So P(X = 1) = 1/3: X is uniform on {0, 1, 2}
K: Beta-binomial: binomial with a beta-distributed p; same mean as the binomial, larger variance; it's the Bayesian predictive distribution.
!: Using a plain binomial for clustered data, which understates the variability.
Q: What is the mean of a beta-binomial with n = 10, α = 2, β = 3? | 10 × 2/5 = 4.
Q: What does α = β = 1 give for the beta-binomial? | A uniform distribution on 0, 1, …, n.
SUM: Beta-binomial mixes binomials over p.
SUM: It captures extra-binomial variation.
SRC: Gelman A, Carlin JB, Stern HS, Dunson DB, Vehtari A, Rubin DB, Bayesian Data Analysis (3rd edn, CRC Press 2013) | textbook | 2013 | https://sites.stat.columbia.edu/gelman/book/
SRC: Johnson NL, Kemp AW, Kotz S, Univariate Discrete Distributions (3rd edn, Wiley 2005) | textbook | 2005 | https://www.wiley.com/
NUM1#maths-u12-28-q1@1: A beta-binomial has n = 20, α = 3 and β = 7. Find its mean. | 6 | 0 |  | nα/(α + β) = 20 × 3/10 = 6.
M1#maths-u12-28-q2@1: Why does a beta-binomial have more variance than a binomial with the same mean? | Its success probability varies as well as the outcomes | It has more trials | It's continuous | Its mean is larger | It doesn't | Variation in p adds to the ordinary binomial variation.
M2#maths-u12-28-q3@2: As α + β becomes very large with α/(α + β) fixed, what does the beta-binomial approach? | The binomial | The Poisson | The normal with mean 0 | The uniform | The geometric | The beta distribution concentrates at one value of p, removing the extra variation.

## Uniform Distribution
S: The uniform distribution spreads probability evenly: every value in an interval is equally likely. It models rounding errors and random arrival within a cycle, and it's the raw material of computer simulation.
O: Calculate probabilities, mean and variance for continuous and discrete uniforms
O: Explain the role of the uniform distribution in simulation
T: Continuous uniform | X ~ U(a, b): f(x) = 1/(b − a) for a ≤ x ≤ b
T: Discrete uniform | Each of n values has probability 1/n, like a fair die
H: Formulas
- Probabilities are proportional to length: P(c < X < d) = (d − c)/(b − a) for a ≤ c < d ≤ b.
- Mean (a + b)/2; variance (b − a)^{2}/12.
- The CDF is a straight line from 0 at a to 1 at b.
H: Examples
- Waiting for a bus that comes every 12 minutes, arriving at a random time: U(0, 12).
- Rounding error when rounding to the nearest whole number: U(−0.5, 0.5).
- A fair die is the discrete uniform on {1, …, 6}: mean 3.5, variance (6^{2} − 1)/12 = 35/12.
H: Simulation
- Random number generators produce (pseudo-)random U(0, 1) values.
- Inverse transform sampling turns them into any distribution: X = F^{−1}(U).
- Monte Carlo integration averages a function at uniform random points.
X: A bus arrives every 12 minutes and you turn up at a random time. Find P(wait > 8 minutes), the mean and the SD of your wait.
> W ~ U(0, 12): P(W > 8) = 4/12 = 1/3
> Mean = 6 minutes
> SD = 12/√12 = √12 ≈ 3.46 minutes
K: Uniform probabilities are proportional to length; mean is the midpoint; variance (b − a)^{2}/12; U(0, 1) drives simulation.
!: Using (b − a)/12 for the variance instead of (b − a)^{2}/12.
Q: What is the mean of U(2, 10)? | 6.
Q: What is the density of U(0, 4)? | 1/4 on [0, 4].
SUM: Uniform means equally likely across an interval.
SUM: It's the basis of random number generation.
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: Devroye L, Non-Uniform Random Variate Generation (Springer 1986) | textbook | 1986 | https://luc.devroye.org/rnbookindex.html
NUM1#maths-u12-29-q1@1: Find the variance of U(0, 6). | 3 | 0 |  | (b − a)^{2}/12 = 36/12 = 3.
M1#maths-u12-29-q2@1: X ~ U(10, 30). What is P(X < 15)? | 0.25 | 0.5 | 0.15 | 0.75 | 0.05 | The interval from 10 to 15 is 5 out of a total length of 20.
M2#maths-u12-29-q3@2: Which distribution describes the error from rounding to the nearest integer? | U(−0.5, 0.5) | N(0, 1) | U(0, 1) | Po(0.5) | Exponential with mean 0.5 | Any value between −0.5 and 0.5 is equally likely if the original value is spread smoothly.

## Normal Distribution
S: The normal (Gaussian) distribution is the bell-shaped curve defined by its mean and standard deviation. Thanks to the central limit theorem it describes heights, measurement errors and averages, and it's the basis of much of statistics.
O: Calculate normal probabilities and percentiles by standardising
O: Combine independent normal variables
T: Normal distribution | X ~ N(μ, σ^{2}): f(x) = (1/(σ√(2π))) exp(−(x − μ)^{2}/(2σ^{2}))
T: Standardising | z = (x − μ)/σ converts X to the standard normal Z
H: Shape
- Symmetric about μ; mean = median = mode.
- Points of inflection at μ ± σ.
- About 68% within 1σ, 95% within 2σ (more precisely 1.96σ), 99.7% within 3σ.
- Tails extend forever but fall off very fast.
H: Calculating
- P(X < x) = Φ((x − μ)/σ), using tables or a calculator.
- Inverse: x = μ + zσ, where z is the required percentile of Z.
- Normal approximation to the binomial: N(np, np(1 − p)) with a continuity correction.
H: Combining
- Linear combinations of independent normals are normal: X + Y ~ N(μ_{X} + μ_{Y}, σ_{X}^{2} + σ_{Y}^{2}).
- aX + b ~ N(aμ + b, a^{2}σ^{2}).
- Gauss used it for errors in astronomy (1809); de Moivre found it as a limit of binomials (1733).
X: Adult heights are N(170, 8^{2}) cm. Find P(height > 180) and the 90th percentile.
> z = (180 − 170)/8 = 1.25, so P(X > 180) = 1 − Φ(1.25) ≈ 1 − 0.8944 = 0.1056
> The 90th percentile of Z is 1.2816
> x = 170 + 1.2816 × 8 ≈ 180.3 cm
P: **Investigate with the lab.** Increase n and watch the histogram of sample means become symmetric and bell-shaped, even though the population is skewed.
IX: clt
K: Standardise with z = (x − μ)/σ; reverse with x = μ + zσ; independent normals combine with means and variances adding.
!: Dividing by the variance instead of the standard deviation when standardising.
Q: What fraction of a normal distribution lies within 1.96σ of the mean? | 95%.
Q: X ~ N(10, 4) and Y ~ N(5, 9) are independent. What is the distribution of X + Y? | N(15, 13).
SUM: The normal is defined by μ and σ.
SUM: Standardise to calculate.
SRC: Department for Education, Mathematics AS and A level subject content: statistics | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods, section 1.3.6.6.1: Normal distribution | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
NUM1#maths-u12-30-q1@1: X ~ N(170, 8^{2}). Find P(X < 186), to 4 decimal places. | 0.9772 | 0.0005 |  | z = 16/8 = 2, and Φ(2) ≈ 0.9772.
M1#maths-u12-30-q2@1: For a normal distribution, which statement is true? | Mean, median and mode are equal | The mean exceeds the median | It's skewed to the right | It has a maximum value | Its variance is always 1 | The bell curve is symmetric about μ, so its mean, median and mode coincide.
M3#maths-u12-30-q3@2: Bags have mass X ~ N(500, 4^{2}) g and boxes hold 10 independent bags. What is the SD of a box's total mass? | 12.6 g | 40 g | 4 g | 160 g | 1.26 g | The variance is 10 × 16 = 160, so the SD is √160 ≈ 12.6 g.
M2#maths-u12-30-q4@2: About what proportion of a normal distribution lies within one standard deviation of the mean? | About 68% | About 50% | About 95% | About 99.7% | About 34% | The 68–95–99.7 rule gives about 68% within ±1σ.

## Standard Normal Distribution
S: The standard normal distribution Z ~ N(0, 1) is the normal with mean 0 and standard deviation 1. Every normal calculation reduces to it, and its tables and critical values are used throughout statistics.
O: Use Φ and its symmetry to find probabilities
O: Recall and use common critical values
T: Standard normal | Z ~ N(0, 1), with density φ(z) = e^{−z^{2}/2}/√(2π)
T: Φ(z) | The CDF of Z: P(Z ≤ z)
H: Using Φ
- Φ(0) = 0.5; Φ(1) ≈ 0.8413; Φ(2) ≈ 0.9772.
- Symmetry: Φ(−z) = 1 − Φ(z).
- P(a < Z < b) = Φ(b) − Φ(a).
- P(|Z| < z) = 2Φ(z) − 1.
H: Critical values
- 1.645: 5% in the upper tail (or 90% central).
- 1.96: 2.5% in each tail (95% central).
- 2.576: 0.5% in each tail (99% central).
- These appear in confidence intervals and hypothesis tests (School 13).
H: Facts
- Φ has no formula in elementary functions; it's computed numerically (it's related to the error function).
- Z^{2} has a chi-squared distribution with 1 degree of freedom.
- Z-scores compare values from different distributions on one scale.
X: Find P(−1.5 < Z < 1).
> Φ(1) ≈ 0.8413
> Φ(−1.5) = 1 − Φ(1.5) ≈ 1 − 0.9332 = 0.0668
> P = 0.8413 − 0.0668 = 0.7745
- Example: a test score with z = 1.5 is higher, relative to its group, than one with z = 1.2 in another group.
- Before calculators, Φ was read from printed tables, still given in exam formula booklets.
K: Φ(−z) = 1 − Φ(z); interval probabilities are differences of Φ; know 1.645, 1.96 and 2.576.
!: Reading Φ(z) as the upper tail probability rather than the lower.
Q: What is Φ(0)? | 0.5.
Q: Which z cuts off the top 2.5%? | 1.96.
SUM: The standard normal underlies all normal calculations.
SUM: Learn the key critical values.
SRC: Department for Education, Mathematics AS and A level subject content: statistics | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods, section 1.3.6.7.1: Cumulative distribution function of the standard normal | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
NUM1#maths-u12-31-q1@1: Find P(Z > 1.645), to 3 decimal places. | 0.05 | 0.001 |  | 1.645 is the upper 5% point of the standard normal.
M1#maths-u12-31-q2@1: What is P(Z < −1) if Φ(1) = 0.8413? | 0.1587 | 0.8413 | −0.8413 | 0.3413 | 0.5 | By symmetry, Φ(−1) = 1 − 0.8413 = 0.1587.
M2#maths-u12-31-q3@2: What is P(|Z| < 2), given Φ(2) = 0.9772? | 0.9544 | 0.9772 | 0.0228 | 0.0456 | 0.4772 | Subtract both tails: P(|Z| < 2) = 2Φ(2) − 1 = 2 × 0.9772 − 1 = 0.9544.

## Exponential Distribution
S: The exponential distribution models the waiting time until the next event in a Poisson process: the next customer, decay or failure. It's the only memoryless continuous distribution.
O: Calculate exponential probabilities, mean and median
O: Link the exponential to the Poisson process and half-lives
T: Exponential distribution | X ~ Exp(λ): f(x) = λe^{−λx} for x ≥ 0
T: Rate parameter | λ, the average number of events per unit time; the mean wait is 1/λ
H: Formulas
- P(X > x) = e^{−λx}; F(x) = 1 − e^{−λx}.
- Mean 1/λ; variance 1/λ^{2}; median ln 2/λ, below the mean (right skew).
- Memoryless: P(X > s + t | X > s) = P(X > t).
H: Links
- In a Poisson process with rate λ, the gaps between events are independent Exp(λ).
- Radioactive decay: the half-life is the median, ln 2/λ.
- Components with constant failure rate (no wear) have exponential lifetimes.
H: Limitations
- Real components often wear out (increasing failure rate) or have early failures; the Weibull handles both.
- The minimum of independent exponentials is exponential with the sum of the rates, which helps in reliability.
- Queueing models (School 18) use exponential service and arrival times.
X: Bulbs have exponential lifetimes with mean 1,000 hours. Find P(a bulb lasts more than 1,500 hours) and the median.
> λ = 1/1000 per hour
> P(X > 1500) = e^{−1.5} ≈ 0.223
> Median = 1000 ln 2 ≈ 693 hours
K: P(X > x) = e^{−λx}; mean 1/λ; median ln 2/λ; memoryless; gaps in a Poisson process.
!: Using λ as the mean instead of the rate (the mean is 1/λ).
Q: What is the variance of Exp(2)? | 1/4.
Q: What is the half-life of a substance with decay rate λ? | ln 2/λ.
SUM: The exponential models waiting times.
SUM: It's memoryless.
SRC: Ross SM, A First Course in Probability (10th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods, section 8.1.6.1: Exponential distribution | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
NUM1#maths-u12-32-q1@1: X ~ Exp(0.5). Find the median, to 3 decimal places. | 1.386 | 0.001 |  | ln 2/0.5 = 2 ln 2 ≈ 1.386.
M1#maths-u12-32-q2@1: Machines A and B fail independently at rates 0.1 and 0.3 per year. What is the distribution of the time to the first failure? | Exponential with rate 0.4 | Exponential with rate 0.03 | Exponential with rate 0.2 | Normal | Poisson with mean 0.4 | The minimum of independent exponentials is exponential with the rates added.
M2#maths-u12-32-q3@2: Calls arrive as a Poisson process at 4 per hour. What is the mean time between calls? | 15 minutes | 4 minutes | 4 hours | 30 minutes | 1 hour | The gaps are Exp(4) per hour, with mean 1/4 hour.

## Gamma Distribution
S: The gamma distribution models the waiting time until the kth event in a Poisson process, and more generally any positive, right-skewed quantity. The exponential and chi-squared distributions are special cases.
O: State the gamma density, mean and variance
O: Use the gamma as a sum of exponentials and as a Bayesian prior
T: Gamma distribution | X ~ Gamma(k, λ): f(x) = λ^{k}x^{k−1}e^{−λx}/Γ(k) for x > 0
T: Gamma function | Γ(k) = ∫₀^∞ x^{k−1}e^{−x} dx; Γ(n) = (n − 1)! for whole numbers n
H: Properties
- Shape k, rate λ: mean k/λ, variance k/λ^{2}.
- k = 1 is the exponential; chi-squared with ν degrees of freedom is Gamma(ν/2, 1/2).
- Some books use a scale θ = 1/λ instead: mean kθ, variance kθ^{2}.
H: Sums
- The sum of k independent Exp(λ) variables is Gamma(k, λ) (the Erlang distribution).
- Sums of independent gammas with the same rate are gamma: shapes add.
- Link to Poisson: P(time to kth event > t) = P(fewer than k events by t).
H: Uses
- Rainfall amounts, insurance claim sizes, service times.
- In Bayesian statistics, the gamma is the conjugate prior for a Poisson rate.
- Mixing a Poisson over a gamma-distributed rate gives the negative binomial.
X: Calls arrive at 2 per minute. Let T be the time until the 3rd call. Find E(T) and P(T > 1).
> T ~ Gamma(3, 2): E(T) = 3/2 = 1.5 minutes
> T > 1 means fewer than 3 calls in the first minute, with N ~ Po(2)
> P(N ≤ 2) = e^{−2}(1 + 2 + 2) = 5e^{−2} ≈ 0.677
K: Gamma(k, λ): mean k/λ, variance k/λ^{2}; sums of exponentials; links to Poisson counts; conjugate prior for Poisson rates.
!: Mixing up the rate and scale parameterisations.
Q: What is Γ(5)? | 4! = 24.
Q: Which gamma distribution is the exponential? | Shape k = 1.
SUM: Gamma generalises the exponential.
SUM: It waits for the kth event.
SRC: Johnson NL, Kotz S, Balakrishnan N, Continuous Univariate Distributions, vol 1 (2nd edn, Wiley 1994) | textbook | 1994 | https://www.wiley.com/
SRC: Casella G, Berger RL, Statistical Inference (2nd edn, Duxbury 2002) | textbook | 2002 | https://www.cengage.com/
NUM1#maths-u12-33-q1@1: X ~ Gamma(4, 0.5) (shape 4, rate 0.5). Find Var(X). | 16 | 0 |  | k/λ^{2} = 4/0.25 = 16.
M1#maths-u12-33-q2@1: What is the sum of 5 independent Exp(3) variables? | Gamma(5, 3) | Exp(15) | Exp(3/5) | Po(15) | N(5, 3) | Summing k independent exponentials with rate λ gives Gamma(k, λ).
M2#maths-u12-33-q3@2: What is Γ(1/2)? | √π | 1/2 | 1 | π | 0 | A classic result: Γ(1/2) = √π, linked to the normal density's constant.

## Beta Distribution
S: The beta distribution lives on [0, 1], so it naturally models proportions and probabilities. Its two shape parameters make it flexible, and it's the standard prior for an unknown probability in Bayesian statistics.
O: State the beta density, mean and variance
O: Update a beta prior with binomial data
T: Beta distribution | X ~ Beta(α, β): f(x) = x^{α−1}(1 − x)^{β−1}/B(α, β) on [0, 1]
T: Conjugate prior | A prior that gives a posterior in the same family; the beta is conjugate to the binomial
H: Shapes and formulas
- Mean α/(α + β); variance αβ/[(α + β)^{2}(α + β + 1)].
- α = β = 1: uniform. α = β > 1: symmetric hump. α < β: skewed towards 0.
- B(α, β) = Γ(α)Γ(β)/Γ(α + β) is the normalising constant.
H: Bayesian updating
- Prior Beta(α, β); observe s successes and f failures; posterior Beta(α + s, β + f).
- The parameters act like prior counts of successes and failures.
- The posterior mean (α + s)/(α + β + s + f) moves from the prior mean towards the observed proportion.
H: Other uses
- Order statistics: the kth smallest of n uniform values is Beta(k, n − k + 1).
- Project management (PERT) models task durations with a scaled beta.
- Proportions such as allele frequencies or the fraction of a day spent active.
X: A prior Beta(2, 2) is used for a coin's probability of heads. In 10 tosses there are 7 heads. Find the posterior and its mean.
> Posterior: Beta(2 + 7, 2 + 3) = Beta(9, 5)
> Mean = 9/14
> ≈ 0.643, between the prior mean 0.5 and the data's 0.7
K: Beta lives on [0, 1]; mean α/(α + β); prior Beta(α, β) plus s successes and f failures gives Beta(α + s, β + f).
!: Adding the number of trials, rather than the number of failures, to β.
Q: What is Beta(1, 1)? | The uniform distribution on [0, 1].
Q: What is the mean of Beta(3, 7)? | 0.3.
SUM: Beta models proportions.
SUM: It updates neatly with binomial data.
SRC: Gelman A, Carlin JB, Stern HS, Dunson DB, Vehtari A, Rubin DB, Bayesian Data Analysis (3rd edn, CRC Press 2013) | textbook | 2013 | https://sites.stat.columbia.edu/gelman/book/
SRC: Johnson NL, Kotz S, Balakrishnan N, Continuous Univariate Distributions, vol 2 (2nd edn, Wiley 1995) | textbook | 1995 | https://www.wiley.com/
NUM1#maths-u12-34-q1@1: A prior Beta(1, 1) is updated with 3 successes and 1 failure. What is the posterior mean? | 0.6667 | 0.0005 |  | Posterior Beta(4, 2), with mean 4/6 ≈ 0.667.
M1#maths-u12-34-q2@1: Which beta distribution is skewed towards 1? | Beta(5, 2) | Beta(2, 5) | Beta(1, 1) | Beta(3, 3) | Beta(1, 4) | With α > β the mass sits nearer 1; the mean is 5/7.
M3#maths-u12-34-q3@2: What is the distribution of the largest of 4 independent U(0, 1) values? | Beta(4, 1) | Beta(1, 4) | U(0, 1) | Beta(2, 2) | Exp(4) | P(max ≤ x) = x^{4}, whose density 4x^{3} is Beta(4, 1).

## Chi-Squared Distribution
S: The chi-squared distribution is the distribution of a sum of squared independent standard normal variables. It's the basis of goodness-of-fit tests, tests of independence in tables, and confidence intervals for variances.
O: Define the chi-squared distribution and state its mean and variance
O: Describe its main uses in statistics
T: Chi-squared distribution | χ^{2}_{ν} = Z₁^{2} + … + Z_{ν}^{2} for independent standard normals Z_{i}
T: Degrees of freedom | ν, the number of independent squared normals (or free cells in a table)
H: Properties
- Mean ν; variance 2ν; it's Gamma(ν/2, 1/2).
- Right-skewed, becoming more symmetric as ν grows.
- Sums of independent chi-squareds are chi-squared: degrees of freedom add.
- χ^{2}₁ = Z^{2}: P(Z^{2} > 3.841) = P(|Z| > 1.96) = 0.05.
H: Uses
- Goodness of fit: Σ (O − E)^{2}/E compares observed and expected counts.
- Independence in contingency tables, with (r − 1)(c − 1) degrees of freedom.
- Variance: (n − 1)S^{2}/σ^{2} ~ χ^{2}_{n−1} for normal samples, which gives confidence intervals for σ^{2}.
H: History
- Karl Pearson introduced the chi-squared test in 1900.
- Fisher corrected the degrees of freedom for tables in the 1920s.
- Critical values come from tables or software.
X: Find the mean and variance of χ^{2}₁₀, and explain why χ^{2}₁ has 5% upper critical value 3.841.
> Mean ν = 10; variance 2ν = 20
> χ^{2}₁ = Z^{2}, and Z^{2} > c exactly when |Z| > √c
> P(|Z| > 1.96) = 0.05 and 1.96^{2} ≈ 3.841
K: χ^{2}_{ν} is a sum of ν squared standard normals; mean ν, variance 2ν; used for counts, tables and variances.
!: Using the number of categories as the degrees of freedom without subtracting constraints.
Q: What are the mean and variance of χ^{2}₄? | 4 and 8.
Q: How many degrees of freedom for a 3 × 4 contingency table test? | (3 − 1)(4 − 1) = 6.
SUM: Chi-squared sums squared normals.
SUM: It tests counts and variances.
SRC: Pearson K, On the criterion that a given system of deviations…, Philosophical Magazine 50(302), 157 | journal | 1900 | https://doi.org/10.1080/14786440009463897
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods, section 1.3.6.6.6: Chi-square distribution | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
NUM1#maths-u12-35-q1@1: What is the variance of a chi-squared variable with 12 degrees of freedom? | 24 | 0 |  | Variance = 2ν = 24.
M1#maths-u12-35-q2@1: Which statement about χ^{2}_{ν} is correct? | It's the sum of ν squared independent standard normals | It can be negative | It's symmetric | Its mean is 0 | Its variance is ν | A sum of squares is non-negative, with mean ν and variance 2ν.
M2#maths-u12-35-q3@2: Independent χ^{2}₃ and χ^{2}₅ variables are added. What is the distribution of the sum? | χ^{2}₈ | χ^{2}₁₅ | χ^{2}₂ | N(8, 16) | χ^{2}₄ | Degrees of freedom add for independent chi-squared variables.

## Student's T-Distribution
S: Student's t-distribution is like the standard normal but with heavier tails. It's used for means when the population standard deviation is unknown and estimated from a small sample.
O: Describe the t-distribution and how it depends on degrees of freedom
O: Use t critical values in confidence intervals for a mean
T: t-distribution | T = Z/√(V/ν) with Z standard normal and V ~ χ^{2}_{ν} independent
T: Degrees of freedom | ν; for one sample of size n, ν = n − 1
H: Shape
- Symmetric about 0, bell-shaped, but with heavier tails than the normal.
- As ν → ∞ it approaches N(0, 1); by ν = 30 it's close.
- Variance ν/(ν − 2) for ν > 2; with ν = 1 it's the Cauchy, with no mean.
H: Using it
- For a normal sample, (X̄ − μ)/(S/√n) ~ t_{n−1}.
- Confidence interval: x̄ ± t* × s/√n, with t* from tables.
- With 9 degrees of freedom, the 97.5% point is 2.262 (compare 1.96 for the normal).
H: History
- William Sealy Gosset published it in 1908 as "Student", because Guinness, his employer, restricted publication.
- He needed it for small-sample quality control of barley and beer.
- Fisher later put it on a rigorous footing and named the variable t.
X: A sample of 10 has x̄ = 52 and s = 4. Find a 95% confidence interval for μ (t₉ critical value 2.262).
> Standard error = 4/√10 ≈ 1.265
> Margin = 2.262 × 1.265 ≈ 2.86
> Interval ≈ (49.14, 54.86)
K: t has heavier tails than the normal and tends to it as ν grows; use t_{n−1} when σ is estimated by s.
!: Using normal critical values with a small sample and unknown σ.
Q: How many degrees of freedom does a one-sample t-interval with n = 15 use? | 14.
Q: What does the t-distribution approach as ν → ∞? | The standard normal.
SUM: The t-distribution handles unknown σ.
SUM: Heavier tails reflect extra uncertainty.
SRC: Student, The probable error of a mean, Biometrika 6(1), 1 | journal | 1908 | https://doi.org/10.1093/biomet/6.1.1
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods, section 1.3.6.6.4: t distribution | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
NUM1#maths-u12-36-q1@1: What is the variance of a t-distribution with 6 degrees of freedom? | 1.5 | 0.001 |  | ν/(ν − 2) = 6/4 = 1.5.
M1#maths-u12-36-q2@1: Compared with the standard normal, the t-distribution has… | heavier tails | lighter tails | a larger mean | a skew to the right | no symmetry | Estimating σ adds uncertainty, which spreads probability into the tails.
M3#maths-u12-36-q3@2: Which t-distribution has no finite mean? | t with 1 degree of freedom | t with 30 degrees of freedom | t with 3 degrees of freedom | t with 100 degrees of freedom | All t-distributions | With ν = 1 the t-distribution is the Cauchy, whose tails are too heavy for a mean.

## F-Distribution
S: The F-distribution is the ratio of two independent chi-squared variables, each divided by its degrees of freedom. It's used to compare variances and is the engine of analysis of variance (ANOVA) and regression tests.
O: Define the F-distribution and its degrees of freedom
O: Describe its use in comparing variances and in ANOVA
T: F-distribution | F = (U/d₁)/(V/d₂) with U ~ χ^{2}_{d₁} and V ~ χ^{2}_{d₂} independent
T: ANOVA | Analysis of variance: comparing group means by comparing between-group and within-group variation
H: Properties
- Two degrees of freedom: d₁ (numerator) and d₂ (denominator); order matters.
- Positive and right-skewed; mean d₂/(d₂ − 2) for d₂ > 2, close to 1.
- 1/F has the F(d₂, d₁) distribution, which gives lower critical values from upper tables.
- If T ~ t_{ν}, then T^{2} ~ F(1, ν).
H: Uses
- Comparing two normal variances: F = s₁^{2}/s₂^{2} with (n₁ − 1, n₂ − 1) degrees of freedom.
- ANOVA: F = (between-group mean square)/(within-group mean square); a large F suggests the means differ.
- Regression: the overall F-test asks whether the predictors explain anything (School 13).
H: Cautions
- The variance-ratio test is very sensitive to non-normality; Levene's test is more robust.
- Named by Snedecor in honour of Fisher.
X: Samples of sizes 11 and 16 have variances 25 and 10. Compute the F statistic for comparing the variances.
> F = 25/10 = 2.5
> Degrees of freedom (10, 15)
> The upper 5% point of F(10, 15) is about 2.54, so at the 5% level (one-tailed) this is not quite significant
K: F is a ratio of scaled chi-squareds; degrees of freedom (d₁, d₂) in order; it compares variances and drives ANOVA.
!: Swapping the numerator and denominator degrees of freedom.
Q: What is the distribution of T^{2} if T ~ t₁₂? | F(1, 12).
Q: In ANOVA, what does a large F statistic suggest? | The group means differ more than chance would explain.
SUM: F compares variances.
SUM: It's the test statistic of ANOVA.
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods, section 1.3.6.6.5: F distribution | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
SRC: Casella G, Berger RL, Statistical Inference (2nd edn, Duxbury 2002) | textbook | 2002 | https://www.cengage.com/
NUM1#maths-u12-37-q1@1: What is the mean of an F(5, 12) distribution, to 3 decimal places? | 1.2 | 0.001 |  | d₂/(d₂ − 2) = 12/10 = 1.2.
M1#maths-u12-37-q2@1: Which test statistic follows an F-distribution under the null hypothesis? | The ratio of two sample variances from normal populations | A sample mean | A sample proportion | A count of successes | A correlation of exactly 1 | Each scaled sample variance is chi-squared, and their ratio is F.
M2#maths-u12-37-q3@2: If X ~ F(4, 9), what is the distribution of 1/X? | F(9, 4) | F(4, 9) | t₉ | χ^{2}₄ | F(1, 9) | Inverting the ratio swaps the numerator and denominator degrees of freedom.

## Weibull Distribution
S: The Weibull distribution models lifetimes and strengths. Its shape parameter captures whether failures become more likely, less likely or stay constant with age, which makes it the workhorse of reliability engineering.
O: Use the Weibull CDF to find survival probabilities and medians
O: Interpret the shape parameter in terms of failure rates
T: Weibull distribution | F(x) = 1 − exp(−(x/λ)^{k}) for x ≥ 0, with scale λ and shape k
T: Hazard rate | The instantaneous failure rate given survival so far: h(x) = f(x)/(1 − F(x))
H: Shape and hazard
- k < 1: decreasing hazard (early "infant mortality" failures).
- k = 1: constant hazard, the exponential distribution.
- k > 1: increasing hazard (wear-out).
- Together these form the "bathtub curve" of many products' life cycles.
H: Formulas
- Survival S(x) = exp(−(x/λ)^{k}).
- Median λ(ln 2)^{1/k}; mean λΓ(1 + 1/k).
- Fit by plotting ln(−ln(1 − F)) against ln x: a straight line with gradient k (a Weibull plot).
H: Uses
- Reliability of bearings, electronics and engines; warranty analysis.
- Wind speeds (k about 2, the Rayleigh case) for estimating wind farm output.
- Strength of materials: weakest-link failure (Weibull's own 1951 application).
X: Bearings have Weibull lifetimes with λ = 1,000 hours and k = 2. Find P(a bearing survives 500 hours) and the median life.
> S(500) = exp(−(0.5)^{2}) = e^{−0.25} ≈ 0.779
> Median = 1000 × (ln 2)^{1/2}
> ≈ 1000 × 0.8326 ≈ 833 hours
K: Weibull survival is exp(−(x/λ)^{k}); k < 1, = 1 or > 1 means falling, constant or rising hazard.
!: Assuming constant failure rates (exponential) for parts that wear out.
Q: Which Weibull shape gives the exponential distribution? | k = 1.
Q: What does k > 1 indicate about failures? | An increasing failure rate: wear-out.
SUM: Weibull models lifetimes.
SUM: Its shape sets the failure pattern.
SRC: Weibull W, A statistical distribution function of wide applicability, Journal of Applied Mechanics 18, 293 | journal | 1951 | https://doi.org/10.1115/1.4010337
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods, section 8.1.6.2: Weibull distribution | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
NUM1#maths-u12-38-q1@1: A Weibull distribution has λ = 10 and k = 1. Find its median, to 3 decimal places. | 6.931 | 0.001 |  | With k = 1 it's exponential: the median is 10 ln 2 ≈ 6.931.
M1#maths-u12-38-q2@1: A Weibull fit to early failures of new electronics gives k = 0.6. What does that suggest? | Failure rates fall with age: early defects | Parts wear out | The failure rate is constant | The model is invalid | Failures are normally distributed | k < 1 means a decreasing hazard, typical of manufacturing defects.
M2#maths-u12-38-q3@2: On a Weibull plot of ln(−ln(1 − F)) against ln x, what does the gradient give? | The shape parameter k | The scale λ | The mean | The median | The hazard at zero | ln(−ln S) = k ln x − k ln λ is linear in ln x with gradient k.

## Log-Normal Distribution
S: A variable is log-normal when its logarithm is normally distributed. Quantities formed by multiplying many positive factors, such as incomes, particle sizes, share prices and incubation periods, are often log-normal: positive and right-skewed.
O: Calculate log-normal probabilities, medians and means
O: Explain why multiplicative processes give log-normal distributions
T: Log-normal distribution | X is log-normal if ln X ~ N(μ, σ^{2})
T: Multiplicative central limit theorem | The product of many independent positive factors is approximately log-normal
H: Formulas
- Median e^{μ}; mean e^{μ + σ^{2}/2}, larger than the median (right skew).
- Variance (e^{σ^{2}} − 1)e^{2μ + σ^{2}}.
- P(X < x) = Φ((ln x − μ)/σ): take logs and use normal tables.
H: Why it arises
- ln(product) = sum of logs, so the CLT makes the log approximately normal.
- Growth by random percentages over time gives log-normal sizes.
- The Black–Scholes model (School 21) assumes log-normal share prices.
H: Working with it
- Analyse ln X with normal methods, then transform back.
- Report the geometric mean e^{mean of ln x} and geometric SD.
- Distinguishing log-normal from power-law tails needs care with data.
X: ln X ~ N(0, 1). Find the median, the mean and P(X > e).
> Median = e^{0} = 1
> Mean = e^{0 + 1/2} = e^{0.5} ≈ 1.649
> P(X > e) = P(ln X > 1) = P(Z > 1) ≈ 0.159
- Example: incubation periods of many infectious diseases are well described by log-normal distributions.
K: Log-normal means ln X is normal; median e^{μ}, mean e^{μ + σ^{2}/2}; take logs to calculate.
!: Using e^{μ} as the mean (it's the median).
Q: If ln X ~ N(2, 0.5^{2}), what is the median of X? | e^{2} ≈ 7.39.
Q: Why are incomes often log-normal? | They grow by multiplicative (percentage) changes.
SUM: Log-normal is normal on a log scale.
SUM: It suits products and growth.
SRC: Limpert E, Stahel WA, Abbt M, Log-normal distributions across the sciences: keys and clues, BioScience 51(5), 341 | journal | 2001 | https://doi.org/10.1641/0006-3568(2001)051[0341:LNDATS]2.0.CO;2
SRC: Johnson NL, Kotz S, Balakrishnan N, Continuous Univariate Distributions, vol 1 (2nd edn, Wiley 1994) | textbook | 1994 | https://www.wiley.com/
NUM1#maths-u12-39-q1@1: ln X ~ N(1, 0.4). Find E(X), to 3 decimal places. | 3.32 | 0.002 |  | e^{1 + 0.4/2} = e^{1.2} ≈ 3.320.
M1#maths-u12-39-q2@1: For a log-normal distribution, how do the mean and median compare? | The mean is larger than the median | The mean equals the median | The median is larger | Either could be larger | Both are zero | Right skew pulls the mean e^{μ + σ^{2}/2} above the median e^{μ}.
M2#maths-u12-39-q3@2: Which process naturally produces a log-normal distribution? | Repeated growth by random percentages | Counting rare events | Adding many small errors | Waiting for the first success | Drawing without replacement | Logs turn a product of factors into a sum, which the CLT makes normal.

## Pareto Distribution
S: The Pareto distribution is a power law: the probability of exceeding x falls like x^{−α}. It describes wealth, city sizes, insurance losses and file sizes, where a few huge values dominate the total, and it's the source of the "80–20 rule".
O: Calculate Pareto probabilities and the mean
O: Explain how the tail index controls which moments exist
T: Pareto distribution | P(X > x) = (x_{m}/x)^{α} for x ≥ x_{m}, with minimum x_{m} and tail index α
T: Tail index | α; smaller α means a heavier tail
H: Formulas
- Density f(x) = αx_{m}^{α}/x^{α+1} for x ≥ x_{m}.
- Mean αx_{m}/(α − 1) if α > 1; infinite if α ≤ 1.
- Variance finite only if α > 2.
- Median x_{m} × 2^{1/α}.
H: Scale invariance
- Conditional on exceeding a threshold u, X/u has the same Pareto shape: big values look the same at every scale.
- On a log–log plot, P(X > x) is a straight line with gradient −α.
- Vilfredo Pareto observed it in Italian landholding around 1896.
H: The 80–20 rule and risk
- With α ≈ 1.16, the top 20% hold about 80% of the total.
- Insurance and reinsurance price large losses with Pareto tails.
- Averages of heavy-tailed data converge slowly or not at all: one observation can dominate.
X: X is Pareto with x_{m} = 1 and α = 2. Find P(X > 4), the mean and the median.
> P(X > 4) = (1/4)^{2} = 1/16
> Mean = 2 × 1/(2 − 1) = 2
> Median = 2^{1/2} ≈ 1.414
K: Pareto tails fall as x^{−α}; mean finite only for α > 1 and variance only for α > 2; straight lines on log–log plots.
!: Computing a sample variance for Pareto data with α ≤ 2 and treating it as meaningful.
Q: Which Pareto distributions have a finite variance? | Those with α > 2.
Q: What does a Pareto tail look like on a log–log plot? | A straight line with gradient −α.
SUM: Pareto is the classic power law.
SUM: Its tail index sets which moments exist.
SRC: Newman MEJ, Power laws, Pareto distributions and Zipf's law, Contemporary Physics 46(5), 323 | journal | 2005 | https://doi.org/10.1080/00107510500052444
SRC: Clauset A, Shalizi CR, Newman MEJ, Power-law distributions in empirical data, SIAM Review 51(4), 661 | journal | 2009 | https://doi.org/10.1137/070710111
NUM1#maths-u12-40-q1@1: X is Pareto with x_{m} = 10 and α = 3. Find P(X > 20). | 0.125 | 0.0001 |  | (10/20)^{3} = 1/8 = 0.125.
M1#maths-u12-40-q2@1: A Pareto distribution has α = 1.5. Which statement is true? | Its mean is finite but its variance is infinite | Both mean and variance are finite | Neither exists | Its variance is finite but its mean isn't | It's normal | The mean needs α > 1; the variance needs α > 2.
M3#maths-u12-40-q3@2: For Pareto losses with α = 2 and x_{m} = 1, how does P(X > 100) compare with P(X > 10)? | It's 100 times smaller | It's 10 times smaller | It's the same | It's e^{−90} times smaller | It's 2 times smaller | Multiplying x by 10 divides the tail by 10^{α} = 100: a power law, not an exponential drop.

## Cauchy Distribution
S: The Cauchy distribution looks like a bell curve but has such heavy tails that it has no mean or variance. Averaging Cauchy data doesn't help at all, which makes it the standard counterexample to the law of large numbers and the central limit theorem.
O: State the Cauchy density and CDF
O: Explain why the law of large numbers fails for it
T: Cauchy distribution | Standard form: f(x) = 1/(π(1 + x^{2})); with location x₀ and scale γ: f(x) = γ/(π(γ^{2} + (x − x₀)^{2}))
T: Location and scale | x₀ is the median and mode; γ is half the interquartile range
H: Properties
- CDF F(x) = 1/2 + arctan(x)/π.
- Median 0, quartiles ±1, but ∫ |x| f(x) dx diverges: no mean.
- The ratio of two independent standard normals is standard Cauchy.
- It's the t-distribution with 1 degree of freedom.
H: Averages don't help
- The mean of n independent standard Cauchy variables is again standard Cauchy.
- So the sample mean is no more accurate than a single observation; use the median instead.
- It's a stable distribution with index α = 1 (later in this school).
H: Where it appears
- Physics: the Lorentzian line shape of spectral lines and resonance curves.
- Geometry: a light rotating at a random angle hits a wall at a Cauchy-distributed point.
- Robust statistics uses it to test methods against outliers.
X: For the standard Cauchy, find P(X > 1) and P(|X| < 1).
> F(1) = 1/2 + arctan(1)/π = 1/2 + 1/4 = 3/4
> P(X > 1) = 1/4
> P(|X| < 1) = F(1) − F(−1) = 3/4 − 1/4 = 1/2
K: Cauchy has a median but no mean or variance; averaging doesn't reduce its spread; it's t₁ and a ratio of normals.
!: Reporting a sample mean for Cauchy-like data and expecting it to settle.
Q: What is the median of the standard Cauchy? | 0.
Q: What is the distribution of the ratio of two independent standard normals? | Standard Cauchy.
SUM: Cauchy has no mean or variance.
SUM: Averages of Cauchy data don't converge.
SRC: Johnson NL, Kotz S, Balakrishnan N, Continuous Univariate Distributions, vol 1 (2nd edn, Wiley 1994) | textbook | 1994 | https://www.wiley.com/
SRC: Grimmett G, Stirzaker D, Probability and Random Processes (4th edn, Oxford University Press 2020) | textbook | 2020 | https://global.oup.com/
NUM1#maths-u12-41-q1@1: For the standard Cauchy, find P(X < √3), to 4 decimal places. | 0.8333 | 0.0005 |  | F(√3) = 1/2 + arctan(√3)/π = 1/2 + (π/3)/π = 5/6 ≈ 0.8333.
M1#maths-u12-41-q2@1: What is the distribution of the mean of 100 independent standard Cauchy variables? | Exactly the same as one observation's | Approximately normal | Cauchy with scale 1/10 | Degenerate at 0 | Uniform | Cauchy averages keep the same distribution; the CLT's finite-variance condition fails.
M2#maths-u12-41-q3@2: Which estimator of the centre should you use for Cauchy data? | The sample median | The sample mean | The sample maximum | The sample variance | The range | The median is consistent for the location; the mean never settles.

## Multivariate Normal Distribution
S: The multivariate normal extends the bell curve to several correlated variables, described by a mean vector and a covariance matrix. It's the foundation of multivariate statistics, regression, Kalman filters, Gaussian processes and much of machine learning.
O: Describe the multivariate normal by its mean vector and covariance matrix
O: Find marginal and conditional distributions in the bivariate case
T: Multivariate normal | X ~ N_{k}(μ, Σ) with density (2π)^{−k/2}|Σ|^{−1/2} exp(−½(x − μ)ᵀΣ^{−1}(x − μ))
T: Covariance matrix | Σ, with variances on the diagonal and covariances off it; symmetric and positive semi-definite
H: Properties
- Every marginal is normal; every linear combination aᵀX is normal.
- Linear transformations: AX + b ~ N(Aμ + b, AΣAᵀ).
- Contours of constant density are ellipses (ellipsoids), aligned with Σ's eigenvectors.
- For jointly normal variables, uncorrelated means independent: a property special to the normal.
H: Bivariate conditionals
- E(Y | X = x) = μ_{Y} + ρ(σ_{Y}/σ_{X})(x − μ_{X}): a straight-line regression.
- Var(Y | X = x) = σ_{Y}^{2}(1 − ρ^{2}), the same for every x.
- Regression to the mean: with |ρ| < 1, predictions are pulled towards the average (Galton's heights).
H: Uses
- Principal component analysis diagonalises Σ (School 11).
- Kalman filters track positions with multivariate normal uncertainty (School 25).
- Mahalanobis distance (x − μ)ᵀΣ^{−1}(x − μ) measures how unusual a point is, allowing for correlation.
X: Fathers' and sons' heights are bivariate normal with both means 175 cm, both SDs 7 cm and ρ = 0.5. Predict a son's height if his father is 189 cm.
> The father is (189 − 175)/7 = 2 SDs above the mean
> E(son | father = 189) = 175 + 0.5 × 7 × 2 = 182 cm
> Only 1 SD above average: regression to the mean
K: N(μ, Σ) has normal marginals and linear combinations; conditionals are linear in x with reduced variance; uncorrelated jointly normal variables are independent.
!: Assuming uncorrelated variables are independent when they aren't jointly normal.
Q: What shape are the density contours of a bivariate normal? | Ellipses.
Q: What is Var(Y ∣ X = x) in a bivariate normal? | σ_{Y}^{2}(1 − ρ^{2}).
SUM: The multivariate normal is defined by μ and Σ.
SUM: Its conditionals give linear regression.
SRC: Anderson TW, An Introduction to Multivariate Statistical Analysis (3rd edn, Wiley 2003) | textbook | 2003 | https://www.wiley.com/
SRC: Galton F, Regression towards mediocrity in hereditary stature, Journal of the Anthropological Institute 15, 246 | journal | 1886 | https://doi.org/10.2307/2841583
NUM1#maths-u12-42-q1@1: In the heights example (SDs 7, ρ = 0.5), find Var(son's height ∣ father's height). | 36.75 | 0.01 | cm² | σ^{2}(1 − ρ^{2}) = 49 × 0.75 = 36.75 cm^{2}.
M1#maths-u12-42-q2@1: X ~ N₂(μ, Σ). What is the distribution of X₁ + X₂? | Normal | Chi-squared | Uniform | Bivariate normal | Unknown without more information | Any linear combination of a multivariate normal vector is normal.
M3#maths-u12-42-q3@2: Two variables each have a normal marginal and zero correlation. Must they be independent? | No, unless they're jointly normal | Yes, always | Yes, because both are normal | Only if their means are 0 | Only if their variances are equal | Normal marginals don't make the pair jointly normal; only joint normality turns zero correlation into independence.

## Student's T Multivariate Distribution
S: The multivariate t-distribution is a heavy-tailed version of the multivariate normal. It describes data where extreme values, and extreme values in several variables at once, are more common than the normal allows, as in financial returns.
O: Describe the multivariate t as a scaled multivariate normal
O: Explain its tail dependence and uses
T: Multivariate t-distribution | X = μ + Z/√(W/ν), with Z ~ N_{k}(0, Σ) and W ~ χ^{2}_{ν} independent
T: Tail dependence | The tendency of variables to be extreme together
H: Construction
- One shared random scale factor multiplies every component.
- Parameters: location μ, scale matrix Σ and degrees of freedom ν.
- Covariance νΣ/(ν − 2) for ν > 2; mean μ for ν > 1.
- As ν → ∞ it becomes N(μ, Σ).
H: Properties
- Marginals are univariate t with the same ν.
- Uncorrelated components (Σ diagonal) are still dependent, because they share the scale factor.
- It has tail dependence: when one variable is extreme, others tend to be extreme too.
H: Uses
- Finance: joint crashes across markets are more common than a multivariate normal predicts.
- Robust statistics: estimates under a t model down-weight outliers.
- Bayesian analysis: the predictive distribution for normal data with unknown variance is multivariate t.
X: A bivariate t has ν = 5 and Σ = I (the identity). Find its covariance matrix and say whether the components are independent.
> Covariance = νΣ/(ν − 2) = (5/3)I
> The components are uncorrelated
> But they share the factor √(W/ν), so they're not independent: large values tend to occur together
K: Multivariate t = normal divided by a shared random scale; heavier tails and tail dependence; approaches the normal as ν grows.
!: Concluding independence from a diagonal scale matrix.
Q: What does the multivariate t approach as ν → ∞? | The multivariate normal.
Q: What distribution are the marginals of a multivariate t? | Univariate t with the same degrees of freedom.
SUM: Multivariate t has heavy joint tails.
SUM: It models simultaneous extremes.
SRC: Kotz S, Nadarajah S, Multivariate t Distributions and Their Applications (Cambridge University Press 2004) | textbook | 2004 | https://www.cambridge.org/
SRC: McNeil AJ, Frey R, Embrechts P, Quantitative Risk Management (revised edn, Princeton University Press 2015) | textbook | 2015 | https://press.princeton.edu/
NUM1#maths-u12-43-q1@1: A multivariate t has ν = 4 and scale matrix entry Σ₁₁ = 3. Find Var(X₁). | 6 | 0 |  | Var = ν/(ν − 2) × Σ₁₁ = 2 × 3 = 6.
M1#maths-u12-43-q2@1: Why do risk managers use a multivariate t rather than a normal for asset returns? | It allows more frequent joint extremes | It has lighter tails | It's easier to compute | It ignores correlation | Returns are always positive | Market crashes hit many assets at once, which normal models understate.
M2#maths-u12-43-q3@2: In a multivariate t with diagonal Σ, are the components independent? | No: they share a random scale factor | Yes, always | Only when ν = 1 | Only when the means are zero | Yes, because they're uncorrelated | The common divisor √(W/ν) links their sizes.

## Dirichlet Distribution
S: The Dirichlet distribution is a distribution over probability vectors: sets of non-negative numbers adding to 1. It generalises the beta distribution to several categories and is the standard prior for multinomial probabilities.
O: Describe the Dirichlet distribution and its mean
O: Update a Dirichlet prior with multinomial counts
T: Dirichlet distribution | (p₁, …, p_{k}) ~ Dir(α₁, …, α_{k}), with density ∝ Π p_{i}^{α_{i}−1} on the simplex Σp_{i} = 1
T: Simplex | The set of vectors with non-negative entries adding to 1
H: Properties
- Mean of p_{i}: α_{i}/α₀, where α₀ = Σα_{i}.
- Larger α₀ concentrates the distribution around its mean.
- Each p_{i} on its own is Beta(α_{i}, α₀ − α_{i}).
- With k = 2 it's the beta distribution.
H: Bayesian updating
- Prior Dir(α₁, …, α_{k}); observe counts n₁, …, n_{k}; posterior Dir(α₁ + n₁, …, α_{k} + n_{k}).
- The α_{i} act as pseudo-counts.
- Dir(1, …, 1) is uniform over the simplex.
H: Uses
- Topic models (latent Dirichlet allocation): each document is a Dirichlet mixture of topics.
- Population genetics: allele frequencies across several alleles.
- Compositional data: proportions of a budget, rock composition.
- It can be simulated by normalising independent gamma variables.
X: A prior Dir(1, 1, 1) is used for a three-sided die. Rolls give counts (5, 3, 2). Find the posterior and the posterior mean of p₁.
> Posterior: Dir(1 + 5, 1 + 3, 1 + 2) = Dir(6, 4, 3)
> α₀ = 13
> E(p₁) = 6/13 ≈ 0.462
K: Dirichlet is a distribution on probability vectors; mean α_{i}/α₀; add observed counts to update; k = 2 gives the beta.
!: Forgetting that the components are constrained to add to 1, so they're negatively related.
Q: What is the Dirichlet with two categories? | The beta distribution.
Q: What is the posterior after a Dir(2, 2, 2) prior and counts (1, 0, 3)? | Dir(3, 2, 5).
SUM: Dirichlet distributions generate probability vectors.
SUM: They're conjugate to the multinomial.
SRC: Gelman A, Carlin JB, Stern HS, Dunson DB, Vehtari A, Rubin DB, Bayesian Data Analysis (3rd edn, CRC Press 2013) | textbook | 2013 | https://sites.stat.columbia.edu/gelman/book/
SRC: Blei DM, Ng AY, Jordan MI, Latent Dirichlet allocation, Journal of Machine Learning Research 3, 993 | journal | 2003 | https://www.jmlr.org/papers/v3/blei03a.html
NUM1#maths-u12-44-q1@1: For Dir(2, 3, 5), find E(p₃). | 0.5 | 0.001 |  | α₃/α₀ = 5/10 = 0.5.
M1#maths-u12-44-q2@1: Which vectors can a Dirichlet distribution produce? | Non-negative vectors whose entries add to 1 | Any real vectors | Integer vectors | Vectors of length 1 in Euclidean norm | Vectors of zeros | Its support is the probability simplex: non-negative entries with total 1.
M2#maths-u12-44-q3@2: How does increasing all α_{i} by the same factor change a Dirichlet distribution? | It keeps the mean and reduces the spread | It changes the mean | It increases the spread | It makes it uniform | It has no effect | The mean α_{i}/α₀ is unchanged, but a larger α₀ concentrates the probability.

## Wishart Distribution
S: The Wishart distribution is the distribution of a sample covariance (scatter) matrix from multivariate normal data. It generalises the chi-squared distribution to matrices and is the standard prior for covariance and precision matrices.
O: Define the Wishart distribution and state its mean
O: Explain its link to chi-squared and its Bayesian uses
T: Wishart distribution | W = Σ_{i=1}^{n} X_{i}X_{i}ᵀ with X_{i} ~ N_{p}(0, Σ) independent: W ~ W_{p}(Σ, n)
T: Inverse-Wishart | The distribution of W^{−1}, used as a prior for covariance matrices
H: Properties
- Mean E(W) = nΣ; n is the degrees of freedom, p the dimension.
- With p = 1 and Σ = σ^{2}: W = σ^{2}χ^{2}_{n}.
- For a normal sample, (n − 1)S ~ W_{p}(Σ, n − 1), with S the sample covariance matrix.
- W is symmetric and, for n ≥ p, positive definite with probability 1.
H: Uses
- Sampling theory for multivariate statistics: Hotelling's T^{2} test, MANOVA.
- Bayesian: the Wishart is conjugate for the precision matrix of a normal, and the inverse-Wishart for the covariance.
- Random matrix theory studies eigenvalues of large Wishart matrices (the Marchenko–Pastur law).
H: History and cautions
- John Wishart derived it in 1928.
- The inverse-Wishart prior ties variances and correlations together, which can be restrictive; alternatives like the LKJ prior separate them.
X: For p = 1, Σ = 4 and n = 10, describe W and find its mean.
> W = Σ X_{i}^{2} with X_{i} ~ N(0, 4), so W = 4χ^{2}₁₀
> E(W) = 4 × 10 = 40
> This matches E(W) = nΣ
K: Wishart is the distribution of a scatter matrix of normal data; mean nΣ; it's a matrix chi-squared; conjugate for normal precision.
!: Using the Wishart for a covariance prior when the inverse-Wishart is meant (or the reverse).
Q: What is the Wishart distribution with p = 1? | A scaled chi-squared: σ^{2}χ^{2}_{n}.
Q: What is E(W) for W ~ W_{p}(Σ, n)? | nΣ.
SUM: Wishart describes random covariance matrices.
SUM: It generalises chi-squared.
SRC: Wishart J, The generalised product moment distribution in samples from a normal multivariate population, Biometrika 20A(1–2), 32 | journal | 1928 | https://doi.org/10.1093/biomet/20A.1-2.32
SRC: Anderson TW, An Introduction to Multivariate Statistical Analysis (3rd edn, Wiley 2003) | textbook | 2003 | https://www.wiley.com/
NUM1#maths-u12-45-q1@1: W ~ W₂(Σ, 8) where Σ has diagonal entries 3 and 5. Find E(W₂₂). | 40 | 0 |  | E(W) = nΣ, so E(W₂₂) = 8 × 5 = 40.
M1#maths-u12-45-q2@1: Which distribution does the Wishart generalise? | Chi-squared | Poisson | Cauchy | Uniform | Bernoulli | With one dimension it's a scaled chi-squared: a sum of squared normals.
M2#maths-u12-45-q3@2: In Bayesian analysis of normal data, which prior is conjugate for the precision matrix? | Wishart | Dirichlet | Beta | Poisson | Cauchy | The Wishart prior on Σ^{−1} gives a Wishart posterior.

## Mixture Distributions
S: A mixture distribution combines several distributions, each chosen with some probability. Mixtures model populations made of subgroups, produce multiple peaks, and are the basis of clustering with Gaussian mixture models.
O: Calculate the mean and variance of a mixture
O: Describe how mixtures model subpopulations and clustering
T: Mixture distribution | f(x) = Σ w_{i} f_{i}(x), with weights w_{i} ≥ 0 adding to 1
T: Gaussian mixture model | A mixture of normal distributions, fitted to data to find clusters
H: Mean and variance
- Mean μ = Σ w_{i}μ_{i}.
- Variance = Σ w_{i}(σ_{i}^{2} + μ_{i}^{2}) − μ^{2}: within-group variance plus between-group variance.
- The law of total variance: Var(X) = E[Var(X | group)] + Var[E(X | group)].
H: Shapes
- Well-separated components give several peaks (multimodality).
- Heights of a mixed adult population: a mixture of male and female distributions.
- Continuous mixtures: a Poisson with gamma-distributed rate gives the negative binomial; a normal with random variance gives the t.
H: Fitting
- The EM algorithm alternates between assigning points to components (softly) and re-estimating each component.
- The number of components is chosen by criteria like BIC.
- Mixtures can approximate almost any density with enough components.
X: X is a 50:50 mixture of N(0, 1) and N(4, 1). Find its mean and variance.
> Mean = 0.5 × 0 + 0.5 × 4 = 2
> E(X^{2}) = 0.5(1 + 0) + 0.5(1 + 16) = 9
> Var(X) = 9 − 4 = 5 (within-group 1 plus between-group 4)
K: Mixture density = weighted sum; mean = weighted mean; variance = within plus between; fitted by EM.
!: Averaging the component variances and ignoring the spread between their means.
Q: What does the law of total variance split variance into? | Within-group (average conditional variance) and between-group (variance of conditional means).
Q: Which algorithm usually fits Gaussian mixture models? | The EM (expectation–maximisation) algorithm.
SUM: Mixtures combine subpopulations.
SUM: Variance includes between-group spread.
SRC: McLachlan G, Peel D, Finite Mixture Models (Wiley 2000) | textbook | 2000 | https://www.wiley.com/
SRC: Dempster AP, Laird NM, Rubin DB, Maximum likelihood from incomplete data via the EM algorithm, Journal of the Royal Statistical Society B 39(1), 1 | journal | 1977 | https://doi.org/10.1111/j.2517-6161.1977.tb01600.x
NUM1#maths-u12-46-q1@1: A 30:70 mixture of N(10, 4) and N(20, 4). Find the mean. | 17 | 0 |  | 0.3 × 10 + 0.7 × 20 = 17.
M1#maths-u12-46-q2@1: Which feature often reveals a mixture in a histogram? | Two or more peaks | A perfect bell shape | A flat top | No tails | Negative values | Separate subpopulations create separate modes.
M3#maths-u12-46-q3@2: A Poisson count has a gamma-distributed rate. What is the resulting mixture? | Negative binomial | Poisson | Normal | Binomial | Exponential | Mixing Poisson over a gamma rate produces the overdispersed negative binomial.

## Empirical Distributions
S: The empirical distribution puts equal probability on each observed data point. Its CDF is a staircase built straight from the data, and it converges to the true distribution, which justifies the bootstrap and many non-parametric methods.
O: Construct the empirical distribution function from data
O: Explain the Glivenko–Cantelli theorem and the bootstrap
T: Empirical distribution function | F_{n}(x) = (number of observations ≤ x)/n
T: Bootstrap | Estimating the sampling variability of a statistic by resampling the data with replacement
H: Constructing it
- Sort the data; F_{n} jumps by 1/n at each observation (more for ties).
- Empirical quantiles are read from F_{n}.
- No assumptions about the distribution's shape are needed.
H: Convergence
- Glivenko–Cantelli: sup_{x} |F_{n}(x) − F(x)| → 0 with probability 1.
- The DKW inequality bounds how far F_{n} can be from F: P(sup |F_{n} − F| > ε) ≤ 2e^{−2nε^{2}}.
- The Kolmogorov–Smirnov test compares F_{n} with a hypothesised F, or two samples' F_{n}.
H: The bootstrap
- Treat F_{n} as the population: draw many samples of size n with replacement and recompute the statistic.
- The spread of the recomputed values estimates the standard error and gives confidence intervals.
- Introduced by Bradley Efron in 1979; now standard in data science.
X: Data: 2, 3, 3, 5, 8. Find F₅(3), F₅(4) and F₅(5).
> Three values are ≤ 3: F₅(3) = 3/5 = 0.6
> No new values between 3 and 4: F₅(4) = 0.6
> Four values are ≤ 5: F₅(5) = 0.8
K: F_{n}(x) is the proportion of data ≤ x; it converges uniformly to F; resampling from it is the bootstrap.
!: Drawing bootstrap samples without replacement, which just reproduces the original data.
Q: By how much does F_{n} jump at a single (untied) observation? | 1/n.
Q: What does the Glivenko–Cantelli theorem say? | The empirical CDF converges uniformly to the true CDF.
SUM: The empirical distribution comes straight from data.
SUM: It underpins the bootstrap.
SRC: Efron B, Tibshirani RJ, An Introduction to the Bootstrap (Chapman & Hall 1993) | textbook | 1993 | https://www.routledge.com/
SRC: van der Vaart AW, Asymptotic Statistics (Cambridge University Press 1998) | textbook | 1998 | https://www.cambridge.org/
NUM1#maths-u12-47-q1@1: Data: 1, 4, 4, 6, 7, 9, 10, 12. Find F₈(6.5). | 0.5 | 0.001 |  | Four of the eight values (1, 4, 4, 6) are ≤ 6.5, giving 4/8 = 0.5.
M1#maths-u12-47-q2@1: How are bootstrap samples drawn? | With replacement from the data, of the same size n | Without replacement, of size n | From a normal distribution | From a uniform distribution | One observation at a time without replacement | Sampling with replacement from F_{n} mimics sampling from the population.
M2#maths-u12-47-q3@2: Which test compares a sample's empirical CDF with a hypothesised continuous CDF? | Kolmogorov–Smirnov | Student's t | F-test | Chi-squared for variances | Fisher's exact | The KS statistic is the largest vertical gap between F_{n} and F.

## Heavy-Tailed Distributions
S: Heavy-tailed distributions give extreme values far more probability than the normal does. Market crashes, mega-earthquakes, viral posts and huge insurance claims all come from heavy tails, where a single observation can outweigh all the rest.
O: Recognise heavy tails and power-law behaviour
O: Explain the consequences for averages, risk and inference
T: Heavy-tailed distribution | A distribution whose tail decays more slowly than any exponential: P(X > x)e^{λx} → ∞ for every λ > 0
T: Power-law tail | P(X > x) ≈ Cx^{−α} for large x
H: Examples
- Power laws: Pareto, Student's t, Cauchy (α = 1).
- Subexponential but not power-law: log-normal, Weibull with k < 1.
- Light tails for comparison: normal, exponential.
H: Consequences
- Moments of order α and above are infinite: averages and variances can be unstable or meaningless.
- The catastrophe principle: a large total is usually caused by one huge value, not many moderate ones.
- Normal models badly understate extreme risks: a 5σ daily move has normal probability about 6 × 10^{−7}, yet markets see such moves.
H: Detecting and estimating
- Plot the survival function on log–log axes: a straight tail suggests a power law.
- The Hill estimator estimates α from the largest observations.
- Be careful: log-normal and power-law tails can look similar, and fitting needs rigorous methods (Clauset et al.).
X: Losses follow a Pareto tail with α = 2. Compare the probability of exceeding 10 times a threshold with exceeding 100 times it.
> P(X > 10u)/P(X > u) = 10^{−2} = 0.01
> P(X > 100u)/P(X > u) = 100^{−2} = 0.0001
> Each tenfold increase in size only divides the probability by 100, compared with an astronomically fast fall for the normal
K: Heavy tails decay slower than exponentially; moments can be infinite; single extremes dominate totals; check log–log plots.
!: Using normal-based risk measures for heavy-tailed data.
Q: What does a power-law tail look like on a log–log survival plot? | A straight line.
Q: What is the catastrophe principle? | Large totals of heavy-tailed variables are driven by a single huge value.
SUM: Heavy tails make extremes common.
SUM: They break normal-based intuitions.
SRC: Clauset A, Shalizi CR, Newman MEJ, Power-law distributions in empirical data, SIAM Review 51(4), 661 | journal | 2009 | https://doi.org/10.1137/070710111
SRC: Embrechts P, Klüppelberg C, Mikosch T, Modelling Extremal Events for Insurance and Finance (Springer 1997) | textbook | 1997 | https://link.springer.com/
NUM1#maths-u12-48-q1@1: A power-law tail has α = 3. By what factor does P(X > x) fall when x doubles? | 8 | 0 |  | P scales as x^{−3}, so doubling x divides the tail probability by 2^{3} = 8.
M1#maths-u12-48-q2@1: Which distribution is heavy-tailed? | Pareto | Normal | Exponential | Uniform | Binomial | Its tail falls as a power of x, slower than any exponential.
M2#maths-u12-48-q3@2: For a power-law tail with α = 1.5, which moments exist? | The mean but not the variance | Both mean and variance | Neither | The variance but not the mean | All moments | Moments of order below α (here, order 1) exist; order 2 doesn't.

## Stable Distributions
S: Stable distributions keep their shape when independent copies are added: the sum is the same type, just shifted and rescaled. The normal is the only one with finite variance; the others are heavy-tailed and are the limits for sums of heavy-tailed variables.
O: Define stability and the stability index
O: State the generalised central limit theorem
T: Stable distribution | X is stable if, for independent copies X₁ and X₂, aX₁ + bX₂ has the same type as X (equal in distribution to cX + d)
T: Stability index | α ∈ (0, 2]; tails decay like x^{−α} for α < 2
H: The family
- α = 2: normal. α = 1 (symmetric): Cauchy. α = 1/2 (one-sided): Lévy.
- Sums of n independent copies scale like n^{1/α}: √n for the normal, n for the Cauchy.
- Apart from these three, there's no closed-form density; they're defined through their characteristic functions.
- Four parameters: index α, skewness β, scale and location.
H: Generalised central limit theorem
- Sums of iid variables with finite variance tend to the normal.
- Sums of iid variables with power-law tails of index α < 2 tend, after scaling, to a stable law with that α.
- So stable laws are the only possible limits of scaled sums.
H: Uses
- Mandelbrot (1963) proposed stable laws for cotton price changes, starting the study of heavy tails in finance.
- Physics: Lévy flights in anomalous diffusion and animal foraging.
- Signal processing with impulsive noise.
X: For iid standard Cauchy variables, show that the mean of 100 has the same distribution as one.
> For α = 1 the sum of n copies scales like n^{1/α} = n
> So the sum of 100 is distributed as 100X
> Dividing by 100 gives the mean distributed as X: averaging achieves nothing
K: Stable laws are closed under addition; index α ≤ 2; α = 2 is normal; they're the limits of heavy-tailed sums.
!: Assuming every sum of many random variables tends to the normal.
Q: Which stable distribution has finite variance? | The normal (α = 2).
Q: How does the sum of n iid stable(α) variables scale? | Like n^{1/α}.
SUM: Stable laws reproduce under addition.
SUM: They generalise the CLT to heavy tails.
SRC: Nolan JP, Univariate Stable Distributions (Springer 2020) | textbook | 2020 | https://link.springer.com/
SRC: Mandelbrot B, The variation of certain speculative prices, Journal of Business 36(4), 394 | journal | 1963 | https://doi.org/10.1086/294632
NUM1#maths-u12-49-q1@1: For a stable law with α = 0.5, by what factor is the sum of 4 iid copies scaled relative to one? | 16 | 0 |  | n^{1/α} = 4^{2} = 16.
M1#maths-u12-49-q2@1: Which value of the stability index gives the normal distribution? | 2 | 1 | 0.5 | 0 | 3 | α = 2 is the only stable case with finite variance: the normal.
M3#maths-u12-49-q3@2: Sums of iid variables with tail index α = 1.5 are suitably scaled. What is their limit? | A stable law with α = 1.5 | The normal | The Cauchy | No limit exists | The exponential | Infinite variance rules out the normal; the generalised CLT gives a stable limit with the same α.

## Extreme Value Distributions
S: Extreme value distributions describe the largest (or smallest) values in a sample: the highest flood, the strongest gust, the biggest daily loss. Just as the normal arises for sums, three types arise for maxima, unified as the generalised extreme value distribution.
O: State the Fisher–Tippett–Gnedenko theorem and the three types
O: Calculate return levels and exceedance probabilities
T: Generalised extreme value (GEV) distribution | F(x) = exp(−[1 + ξ(x − μ)/σ]^{−1/ξ}), with shape ξ
T: Return level | The level exceeded on average once every T years: the (1 − 1/T) quantile of the annual maximum
H: The three types
- Fisher–Tippett–Gnedenko: suitably normalised maxima can only converge to a GEV.
- ξ = 0, Gumbel: from light tails (normal, exponential). F(x) = exp(−e^{−(x−μ)/β}).
- ξ > 0, Fréchet: from heavy tails (Pareto, t).
- ξ < 0, reversed Weibull: from bounded tails (uniform, beta).
H: Return levels
- For the Gumbel: x_{T} = μ − β ln(−ln(1 − 1/T)).
- A "100-year flood" has a 1% chance each year, so over 30 years the chance of at least one is 1 − 0.99^{30} ≈ 26%.
- Peaks over threshold: exceedances above a high level follow a generalised Pareto distribution.
H: Uses
- Flood defences and the Thames Barrier, sea walls, dam spillways.
- Wind loads on buildings, wave heights for offshore platforms.
- Financial risk: extreme daily losses and expected shortfall.
- Climate change complicates estimates because the distribution may shift over time.
X: Annual maximum river levels are Gumbel with μ = 3 m and β = 0.5 m. Find the 100-year return level.
> Solve F(x) = 0.99: x = 3 − 0.5 ln(−ln 0.99)
> −ln 0.99 ≈ 0.01005, and ln(0.01005) ≈ −4.600
> x ≈ 3 + 0.5 × 4.600 ≈ 5.30 m
K: Maxima converge to the GEV (Gumbel, Fréchet or reversed Weibull); return levels are high quantiles; a T-year event has probability 1/T each year.
!: Thinking a 100-year flood can only happen once in a century.
Q: What is the probability of a 50-year event in any given year? | 1/50 = 2%.
Q: Which extreme value type arises from heavy-tailed data? | Fréchet (ξ > 0).
SUM: Maxima follow extreme value laws.
SUM: Return levels guide flood and wind design.
SRC: Coles S, An Introduction to Statistical Modeling of Extreme Values (Springer 2001) | textbook | 2001 | https://link.springer.com/
SRC: Environment Agency, Flood estimation guidelines (LIT 11832) | guidance | 2022 | https://www.gov.uk/government/organisations/environment-agency
NUM1#maths-u12-50-q1@1: A 100-year flood has a 1% chance each year. Find the probability of at least one in 30 years, to 3 decimal places. | 0.26 | 0.002 |  | 1 − 0.99^{30} ≈ 1 − 0.740 = 0.260.
M1#maths-u12-50-q2@1: Which extreme value type arises from maxima of normal data? | Gumbel | Fréchet | Reversed Weibull | Cauchy | Pareto | Light, exponential-type tails give the Gumbel (ξ = 0).
M2#maths-u12-50-q3@2: Which distribution models exceedances over a high threshold? | Generalised Pareto | Poisson | Normal | Beta | Uniform | The Pickands–Balkema–de Haan theorem gives the generalised Pareto for threshold exceedances.
`;
