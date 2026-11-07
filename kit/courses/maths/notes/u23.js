// School 23: Information Theory and Signal Processing. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Information theory, coding, and the mathematics of signal processing.
export default `
## Information Theory
S: Information theory, founded by Claude Shannon in 1948, measures information and sets the limits of compression and communication. Its ideas, entropy, mutual information and channel capacity, now run through computing, statistics, physics and machine learning.
O: Explain information as reduction of uncertainty measured in bits
O: Describe the main questions and results of information theory
T: Bit | The unit of information: the information in one fair yes/no choice
T: Self-information | I(x) = −log₂ p(x), the surprise of an outcome with probability p(x)
H: Shannon's framework
- Source, encoder, channel (with noise), decoder, destination.
- Information depends on probabilities, not meaning.
- Rare events carry more information than common ones.
- Logarithms make information from independent events add.
H: Two central limits
- Source coding: data can't be compressed below its entropy on average.
- Channel coding: reliable communication is possible at any rate below capacity.
- Both are achievable asymptotically with long blocks.
H: Reach
- Data compression (ZIP, JPEG, MP3), mobile and deep-space communication.
- Cryptography (perfect secrecy), statistics (Fisher, MDL), machine learning (cross-entropy loss).
- Thermodynamics and the physics of computation (Landauer's principle).
- Neuroscience and genetics.
X: How much information is learned when a fair 8-sided die shows its result?
> Each face has probability 1/8
> I = −log₂(1/8) = log₂ 8
> = 3 bits: three yes/no questions identify the face
K: Information theory measures information in bits as reduction of uncertainty; Shannon's source and channel coding theorems set limits of compression and communication; its ideas reach far beyond engineering.
!: Confusing information in Shannon's sense with meaning or importance.
Q: How many bits of information does a fair coin toss give? | 1 bit.
Q: Who founded information theory? | Claude Shannon (1948).
SUM: Information is surprise measured in bits.
SUM: Shannon set the ultimate limits.
SRC: Shannon CE, A mathematical theory of communication, Bell System Technical Journal 27(3), 379 | journal | 1948 | https://doi.org/10.1002/j.1538-7305.1948.tb01338.x
SRC: Cover TM, Thomas JA, Elements of Information Theory (2nd edn, Wiley 2006) | textbook | 2006 | https://www.wiley.com/
NUM1#maths-u23-01-q1@1: What is the self-information in bits of an outcome with probability 1/32? | 5 | 0 | bits | −log₂(1/32) = log₂ 32 = 5 bits.
M1#maths-u23-01-q2@1: Which outcome carries the most information? | One with probability 0.01 | One with probability 0.5 | One with probability 0.9 | One with probability 1 | One with probability 0.25 | Self-information −log p is largest for the least likely outcome.
M2#maths-u23-01-q3@2: Why does information theory use logarithms of probabilities? | So that information from independent events adds, since their probabilities multiply | Logarithms make small probabilities larger, so rare events count more | It keeps every information value below 1, which simplifies coding | Logarithms remove randomness from the probabilities being measured | There's no reason; any increasing function of p would work equally well | −log(pq) = −log p − log q turns products into sums.

## Entropy
S: Entropy measures the average uncertainty, or information content, of a random variable. It's largest when all outcomes are equally likely and zero when the outcome is certain, and it gives the minimum average number of bits needed to describe the variable.
O: Calculate the entropy of discrete distributions
O: Use the properties and bounds of entropy
T: Shannon entropy | H(X) = −Σ p(x) log₂ p(x), measured in bits
T: Binary entropy function | h(p) = −p log₂ p − (1 − p) log₂(1 − p), the entropy of a coin with bias p
H: Properties
- H(X) ≥ 0, with equality only for a certain outcome.
- H(X) ≤ log₂ n for n outcomes, with equality for the uniform distribution.
- Concave in the probabilities.
- Independent variables: H(X, Y) = H(X) + H(Y).
H: Examples
- Fair coin: 1 bit. Coin with p = 0.9: h(0.9) ≈ 0.469 bits.
- Fair die: log₂ 6 ≈ 2.585 bits.
- English text: about 1–1.5 bits per letter (Shannon's experiments), far below log₂ 27 ≈ 4.75.
H: Interpretations
- Average number of yes/no questions needed with a good strategy.
- Compression limit (source coding theorem).
- Natural units (nats) use ln; 1 nat = 1/ln 2 ≈ 1.443 bits.
- Differential entropy for continuous variables (can be negative).
X: Find the entropy of a distribution with probabilities ½, ¼, ¼.
> H = −(½ log₂ ½ + ¼ log₂ ¼ + ¼ log₂ ¼)
> = ½ × 1 + ¼ × 2 + ¼ × 2
> = 1.5 bits
K: Entropy H = −Σ p log₂ p measures average uncertainty; it's maximised by the uniform distribution at log₂ n; it sets the average bits needed to describe outcomes.
!: Forgetting that 0 log 0 is taken as 0, so impossible outcomes add nothing.
Q: What is the entropy of a fair 4-sided die? | 2 bits.
Q: When is entropy zero? | When one outcome is certain.
SUM: Entropy is average surprise.
SUM: Uniform distributions maximise it.
SRC: Cover TM, Thomas JA, Elements of Information Theory (2nd edn, Wiley 2006) | textbook | 2006 | https://www.wiley.com/
SRC: Shannon CE, Prediction and entropy of printed English, Bell System Technical Journal 30(1), 50 | journal | 1951 | https://doi.org/10.1002/j.1538-7305.1951.tb01366.x
NUM1#maths-u23-02-q1@1: What is the entropy in bits of the distribution (½, ⅛, ⅛, ⅛, ⅛)? | 2 | 0 | bits | ½ × 1 + 4 × (⅛ × 3) = 0.5 + 1.5 = 2 bits.
M1#maths-u23-02-q2@1: Which distribution on four outcomes has the highest entropy? | (¼, ¼, ¼, ¼) | (½, ½, 0, 0) | (1, 0, 0, 0) | (0.7, 0.1, 0.1, 0.1) | (0.4, 0.4, 0.1, 0.1) | The uniform distribution maximises entropy at log₂ 4 = 2 bits.
M2#maths-u23-02-q3@2: Why is the entropy of English text far below log₂ 27 bits per letter? | Letters aren't equally likely and depend strongly on context, so each is quite predictable | English uses fewer than 27 symbols, so log₂ 27 overcounts the alphabet | Entropy ignores probabilities, so it depends only on the alphabet size | Text is completely random, so its entropy is fixed by the letter count | It isn't below that: English text has entropy close to 4.75 bits per letter | Redundancy from letter frequencies and context lowers the average surprise.

## Conditional Entropy
S: Conditional entropy measures how much uncertainty remains about one variable once another is known. It obeys a chain rule linking joint and individual entropies, and it never increases when you condition on more information.
O: Calculate conditional and joint entropies
O: Apply the chain rule and the "conditioning reduces entropy" inequality
T: Conditional entropy | H(Y ∣ X) = Σₓ p(x) H(Y ∣ X = x) = −Σ p(x, y) log₂ p(y ∣ x)
T: Chain rule for entropy | H(X, Y) = H(X) + H(Y ∣ X)
H: Definitions
- Joint entropy H(X, Y) = −Σ p(x, y) log₂ p(x, y).
- H(Y | X) averages the entropy of Y over values of X.
- If Y is a function of X, H(Y | X) = 0.
- If independent, H(Y | X) = H(Y).
H: Inequalities
- 0 ≤ H(Y | X) ≤ H(Y): conditioning can't increase entropy on average.
- A particular value X = x can increase uncertainty, but not on average.
- H(X, Y) ≤ H(X) + H(Y).
H: Uses
- Measuring predictability.
- Fano's inequality links H(X | Y) to error probability.
- Decision-tree splitting (information gain).
- Data processing arguments.
X: X is a fair coin. Y = X with probability 0.9 and flipped with probability 0.1. Find H(Y ∣ X).
> Given either value of X, Y has a 0.9/0.1 split
> H(Y | X = x) = h(0.1) ≈ 0.469 bits for each x
> H(Y | X) ≈ 0.469 bits
K: Conditional entropy is remaining uncertainty given another variable; H(X, Y) = H(X) + H(Y ∣ X); conditioning reduces entropy on average; functions of X have zero conditional entropy.
!: Thinking that observing any particular value of X must reduce uncertainty about Y.
Q: What is H(Y ∣ X) if Y is a function of X? | 0.
Q: State the chain rule for two variables. | H(X, Y) = H(X) + H(Y ∣ X).
SUM: Uncertainty left after observing.
SUM: Conditioning helps on average.
SRC: Cover TM, Thomas JA, Elements of Information Theory (2nd edn, Wiley 2006) | textbook | 2006 | https://www.wiley.com/
SRC: MacKay DJC, Information Theory, Inference, and Learning Algorithms (Cambridge University Press 2003) | textbook | 2003 | https://www.inference.org.uk/itila/
NUM1#maths-u23-03-q1@1: H(X) = 1.5 bits and H(X, Y) = 2.3 bits. What is H(Y ∣ X)? | 0.8 | 0.001 | bits | By the chain rule, H(Y ∣ X) = 2.3 − 1.5 = 0.8 bits.
M1#maths-u23-03-q2@1: X and Y are independent with H(Y) = 2 bits. What is H(Y ∣ X)? | 2 bits | 0 bits | 1 bit | 4 bits | It depends on H(X) | Knowing an independent variable tells you nothing about Y.
M3#maths-u23-03-q3@2: Why can observing a particular value of X increase uncertainty about Y, though H(Y ∣ X) ≤ H(Y)? | The inequality holds on average over x; some rare values can leave Y more uncertain than before | It never increases uncertainty | Entropy can be negative | Conditioning always gives zero entropy | The inequality is false | Averaging over all x gives the decrease; individual x can go either way.

## Mutual Information
S: Mutual information measures how much knowing one variable tells you about another. It's zero exactly when they're independent, captures nonlinear relationships that correlation misses, and is central to channel capacity, feature selection and neuroscience.
O: Calculate mutual information from entropies
O: Interpret mutual information and the data processing inequality
T: Mutual information | I(X; Y) = H(X) − H(X ∣ Y) = H(X) + H(Y) − H(X, Y)
T: Data processing inequality | If X → Y → Z is a Markov chain, then I(X; Z) ≤ I(X; Y)
H: Properties
- Symmetric: I(X; Y) = I(Y; X).
- I(X; Y) ≥ 0, with equality iff X and Y are independent.
- I(X; X) = H(X).
- Equals the KL divergence between p(x, y) and p(x)p(y).
H: Compared with correlation
- Correlation detects only linear relationships.
- Y = X^{2} with symmetric X: correlation 0 but mutual information positive.
- Harder to estimate from data (binning, k-nearest-neighbour estimators).
H: Uses
- Channel capacity: the maximum of I(X; Y) over input distributions.
- Feature selection and the information bottleneck.
- Registering medical images.
- Processing can't create information about the source (data processing inequality).
X: A binary channel copies X correctly with probability 0.9 (X fair). Find I(X; Y).
> H(Y) = 1 bit (Y is also fair by symmetry)
> H(Y | X) = h(0.1) ≈ 0.469 bits
> I(X; Y) = 1 − 0.469 ≈ 0.531 bits per use
K: Mutual information measures shared information; it's symmetric, non-negative and zero only under independence; it detects nonlinear dependence; processing can't increase it.
!: Concluding independence from zero correlation.
Q: When is I(X; Y) = 0? | When X and Y are independent.
Q: What does the data processing inequality say? | Processing data can't increase information about the source.
SUM: Shared information between variables.
SUM: Captures any dependence.
SRC: Cover TM, Thomas JA, Elements of Information Theory (2nd edn, Wiley 2006) | textbook | 2006 | https://www.wiley.com/
SRC: Kraskov A, Stögbauer H, Grassberger P, Estimating mutual information, Physical Review E 69, 066138 | journal | 2004 | https://doi.org/10.1103/PhysRevE.69.066138
NUM1#maths-u23-04-q1@1: H(X) = 2, H(Y) = 1.5 and H(X, Y) = 3 bits. What is I(X; Y) in bits? | 0.5 | 0.001 | bits | I = H(X) + H(Y) − H(X, Y) = 2 + 1.5 − 3 = 0.5.
M1#maths-u23-04-q2@1: X is uniform on {−1, 0, 1} and Y = X^{2}. Which statement is true? | Correlation is 0 but mutual information is positive | Both correlation and mutual information are 0 | Correlation is 1 | X and Y are independent | Mutual information is negative | Y is determined by X, yet the relationship is symmetric, so linear correlation vanishes.
M2#maths-u23-04-q3@2: What does the data processing inequality imply for image enhancement? | Processing an image can't add information about the original scene, only reveal or lose it | Enhancement always adds information about the scene that wasn't captured | Processing increases the entropy of the original scene being imaged | It has no implication for images, only for communication channels | Images aren't data in the information-theoretic sense, so it can't apply | For a chain scene → image → processed image, I(scene; processed) ≤ I(scene; image): processing can reveal or lose information but never add it.

## Kullback–Leibler Divergence
S: The Kullback–Leibler divergence measures how one probability distribution differs from another: the extra bits needed if you code data from P using a code designed for Q. It's not symmetric, but it underlies maximum likelihood, variational inference and model comparison.
O: Calculate KL divergence between discrete distributions
O: Interpret its asymmetry and its role in statistics and machine learning
T: KL divergence | D_{KL}(P ‖ Q) = Σ p(x) log(p(x)/q(x))
T: Gibbs' inequality | D_{KL}(P ‖ Q) ≥ 0, with equality iff P = Q
H: Properties
- Non-negative; zero only when distributions match.
- Not symmetric: D(P ‖ Q) ≠ D(Q ‖ P) in general.
- Infinite if q(x) = 0 where p(x) > 0.
- Not a metric (no triangle inequality).
H: Interpretations
- Extra coding cost from using the wrong distribution.
- Expected log-likelihood ratio.
- Information gain from prior to posterior in Bayesian updating.
H: Uses
- Maximum likelihood minimises D(data ‖ model).
- Variational inference minimises D(q ‖ posterior): mode-seeking.
- AIC derives from expected KL divergence.
- Jensen–Shannon divergence is a symmetric relative.
X: Find D_{KL}(P ‖ Q) for P = (½, ½) and Q = (¼, ¾), in bits.
> ½ log₂(0.5/0.25) = ½ × 1 = 0.5
> ½ log₂(0.5/0.75) = ½ × (−0.585) = −0.2925
> D ≈ 0.208 bits
K: KL divergence measures how P differs from Q; it's non-negative and asymmetric; it's the extra coding cost of a wrong model; maximum likelihood, variational inference and AIC use it.
!: Treating KL divergence as a symmetric distance.
Q: When is D_{KL}(P ‖ Q) zero? | Only when P = Q.
Q: Is KL divergence symmetric? | No.
SUM: KL measures distribution mismatch.
SUM: It's asymmetric.
SRC: Kullback S, Leibler RA, On information and sufficiency, Annals of Mathematical Statistics 22(1), 79 | journal | 1951 | https://doi.org/10.1214/aoms/1177729694
SRC: Bishop CM, Pattern Recognition and Machine Learning (Springer 2006) | textbook | 2006 | https://link.springer.com/
NUM1#maths-u23-05-q1@1: For P = (1, 0) and Q = (½, ½), what is D_{KL}(P ‖ Q) in bits? | 1 | 0 | bits | 1 × log₂(1/0.5) = 1 bit (the zero-probability term contributes nothing).
M1#maths-u23-05-q2@1: What happens to D_{KL}(P ‖ Q) if Q gives zero probability to an outcome P considers possible? | It becomes infinite | It becomes zero | It becomes negative | It equals one | It is unaffected | log(p/0) is infinite, heavily penalising models that rule out real outcomes.
M3#maths-u23-05-q3@2: Why does minimising D(q ‖ p) in variational inference tend to pick one mode of a multimodal posterior? | It heavily penalises q placing mass where p is small, so q concentrates on a single peak | It spreads q evenly across every mode of p, covering all the mass | It ignores p entirely and fits q to the prior distribution instead | Reverse KL is symmetric, so it behaves exactly like forward KL here | It doesn't; reverse KL always captures every mode of the posterior | Reverse KL is "mode-seeking", while D(p ‖ q) is "mass-covering".

## Cross-Entropy
S: Cross-entropy measures the average number of bits needed to encode data from distribution P using a code optimised for Q. It equals entropy plus KL divergence, and as a loss function it trains most classification models, including neural networks.
O: Calculate cross-entropy and relate it to entropy and KL divergence
O: Use cross-entropy loss in classification
T: Cross-entropy | H(P, Q) = −Σ p(x) log q(x) = H(P) + D_{KL}(P ‖ Q)
T: Log loss | The cross-entropy between one-hot true labels and predicted probabilities, −log q(true class) per example
H: Relationships
- H(P, Q) ≥ H(P), with equality iff Q = P.
- Minimising cross-entropy over Q equals minimising KL divergence (H(P) is fixed).
- Equivalent to maximising likelihood.
H: In classification
- Softmax outputs q; loss −log q_{y} for true class y.
- Confident wrong predictions are heavily penalised.
- Binary cross-entropy for two classes: −[y log q + (1 − y) log(1 − q)].
- Label smoothing and calibration.
H: Uses beyond ML
- Language models report perplexity = 2^{cross-entropy}.
- Comparing compression schemes.
- Evaluating probabilistic forecasts (log score).
X: A classifier predicts probabilities (0.7, 0.2, 0.1) and the true class is the first. Find the log loss in nats.
> Loss = −ln 0.7
> ≈ 0.357 nats
> If the true class were the third: −ln 0.1 ≈ 2.303, a much bigger penalty
K: Cross-entropy H(P, Q) = H(P) + D_{KL}(P ‖ Q); minimising it fits Q to P; it's the standard classification loss; perplexity reports it for language models.
!: Using accuracy alone to evaluate probabilistic classifiers, ignoring confidence.
Q: How is cross-entropy related to KL divergence? | H(P, Q) = H(P) + D_{KL}(P ‖ Q).
Q: What is perplexity? | 2 raised to the cross-entropy in bits.
SUM: Coding cost with the wrong model.
SUM: The standard classification loss.
SRC: Goodfellow I, Bengio Y, Courville A, Deep Learning (MIT Press 2016) | textbook | 2016 | https://www.deeplearningbook.org/
SRC: Cover TM, Thomas JA, Elements of Information Theory (2nd edn, Wiley 2006) | textbook | 2006 | https://www.wiley.com/
NUM1#maths-u23-06-q1@1: A language model has cross-entropy 3 bits per token. What is its perplexity? | 8 | 0 |  | Perplexity = 2^{3} = 8: as uncertain as choosing among 8 equally likely tokens.
M1#maths-u23-06-q2@1: Which prediction gives the largest log loss when the true class is A? | P(A) = 0.01 | P(A) = 0.5 | P(A) = 0.9 | P(A) = 0.99 | P(A) = 0.7 | −log 0.01 is far larger than −log of the other values.
M2#maths-u23-06-q3@2: Why does minimising cross-entropy fit a model to the data distribution? | H(P) is fixed, so minimising H(P, Q) minimises D_{KL}(P ‖ Q), which is zero only when Q = P | Cross-entropy ignores P, so it fits Q to a uniform distribution instead | Minimising cross-entropy maximises KL divergence, pushing Q away from P | Cross-entropy is symmetric in P and Q, so either can be optimised | It doesn't fit the model; cross-entropy only measures prediction speed | The only part depending on Q is the KL term.

## Fisher Information
S: Fisher information measures how much a sample tells you about an unknown parameter: the sharper the likelihood curve, the more information. It sets the Cramér–Rao lower bound on the variance of unbiased estimators and links statistics with geometry.
O: Calculate Fisher information for simple models
O: Apply the Cramér–Rao bound
T: Fisher information | I(θ) = E[(∂ log f(X; θ)/∂θ)^{2}] = −E[∂^{2} log f/∂θ^{2}]
T: Cramér–Rao bound | Var(θ̂) ≥ 1/(nI(θ)) for any unbiased estimator from n independent observations
H: Examples
- Normal with known σ: I(μ) = 1/σ^{2}.
- Bernoulli(p): I(p) = 1/(p(1 − p)).
- Poisson(λ): I(λ) = 1/λ.
H: Use in estimation
- Maximum likelihood estimators are asymptotically efficient: variance ≈ 1/(nI(θ)).
- Standard errors from the observed information (negative Hessian of the log-likelihood).
- Experimental design: choose experiments maximising information.
H: Wider connections
- Jeffreys prior ∝ √I(θ), invariant under reparametrisation.
- Information geometry: Fisher information as a Riemannian metric.
- Natural gradient methods in machine learning.
- Elastic weight consolidation uses it to protect important weights.
X: For Bernoulli(p) with p = 0.3 and n = 100 observations, find the Cramér–Rao bound on the variance of an unbiased estimator.
> I(p) = 1/(0.3 × 0.7) ≈ 4.762
> Bound = 1/(100 × 4.762)
> ≈ 0.0021, matching Var(p̂) = p(1 − p)/n = 0.0021
K: Fisher information measures the curvature of the log-likelihood; the Cramér–Rao bound limits unbiased estimator variance; MLEs achieve it asymptotically; it defines a geometry on models.
!: Applying the Cramér–Rao bound to biased estimators without adjustment.
Q: What is the Fisher information for the mean of a normal with variance σ^{2}? | 1/σ^{2}.
Q: What does the Cramér–Rao bound limit? | The variance of unbiased estimators.
SUM: Information about parameters.
SUM: It bounds estimator precision.
SRC: Fisher RA, Theory of statistical estimation, Mathematical Proceedings of the Cambridge Philosophical Society 22(5), 700 | journal | 1925 | https://doi.org/10.1017/S0305004100009580
SRC: Casella G, Berger RL, Statistical Inference (2nd edn, Duxbury 2002) | textbook | 2002 | https://www.cengage.com/
NUM1#maths-u23-07-q1@1: For a Poisson(λ) sample with λ = 4 and n = 50, what is the Cramér–Rao lower bound on the variance of an unbiased estimator of λ? | 0.08 | 0.001 |  | I(λ) = 1/4, so the bound is 1/(50 × 0.25) = 0.08 = λ/n.
M1#maths-u23-07-q2@1: For Bernoulli(p), at which p is the Fisher information smallest? | p = 0.5 | p = 0.1 | p = 0.9 | p = 0.01 | p = 0.99 | I(p) = 1/(p(1 − p)) is smallest where p(1 − p) is largest, at p = 0.5.
M2#maths-u23-07-q3@2: Why does a sharply peaked log-likelihood indicate high Fisher information? | Small changes in θ greatly change the likelihood, so the data pin θ down precisely | Sharp peaks mean the data are very noisy and tell us little | Peak sharpness has no relation to how much the data tell us | Flat likelihoods are more informative, since many values fit | It doesn't; Fisher information depends only on sample size | Fisher information is the expected curvature of the log-likelihood.

## Minimum Description Length
S: The minimum description length principle chooses the model that gives the shortest total description of the model plus the data encoded with it. It formalises Occam's razor: a model must earn its complexity by compressing the data enough.
O: Explain two-part codes and the MDL trade-off
O: Relate MDL to BIC, overfitting and Kolmogorov complexity
T: Two-part code | Description length L(M) + L(D ∣ M): bits to describe the model plus bits to describe the data given the model
T: Kolmogorov complexity | The length of the shortest computer program that outputs a given string (uncomputable in general)
H: The principle
- Simple models: short L(M) but poor fit, so long L(D | M).
- Complex models: long L(M) but good fit.
- Choose the model minimising the total.
- Rissanen (1978).
H: Connections
- Two-part MDL with parameters coded to precision 1/√n gives roughly BIC: −log L + (k/2) log n.
- Bayesian marginal likelihood is closely related (refined MDL, normalised maximum likelihood).
- Kolmogorov complexity gives an ideal but uncomputable version.
H: Uses
- Model order selection (polynomial degree, ARMA order).
- Clustering and change-point detection.
- Decision-tree pruning.
- Learning theory: compression implies generalisation.
X: Model A costs 20 bits with data cost 500 bits; model B costs 80 bits with data cost 430 bits. Which does MDL choose?
> A total: 20 + 500 = 520 bits
> B total: 80 + 430 = 510 bits
> B is chosen: its extra complexity is paid for by better compression
K: MDL minimises model plus data description length; it formalises Occam's razor; two-part MDL resembles BIC; Kolmogorov complexity is the ideal but uncomputable limit.
!: Ignoring the cost of describing the model's parameters when comparing fits.
Q: What does MDL minimise? | The total length of model description plus data description.
Q: Is Kolmogorov complexity computable? | No, not in general.
SUM: The best model compresses most.
SUM: Complexity must pay its way.
SRC: Rissanen J, Modeling by shortest data description, Automatica 14(5), 465 | journal | 1978 | https://doi.org/10.1016/0005-1098(78)90005-5
SRC: Grünwald PD, The Minimum Description Length Principle (MIT Press 2007) | textbook | 2007 | https://mitpress.mit.edu/
NUM1#maths-u23-08-q1@1: A model has 4 parameters fitted to n = 1024 data points. Using the BIC-like penalty (k/2) log₂ n, how many bits does describing the parameters cost? | 20 | 0 | bits | (4/2) × log₂ 1024 = 2 × 10 = 20 bits.
M1#maths-u23-08-q2@1: Under MDL, when is a more complex model preferred? | When the reduction in data description length exceeds the extra model description length | Always, because a more complex model always fits the data better | Never, because MDL always chooses the simplest available model | Only when the complex model has fewer parameters than the simple one | When its parameter values are larger, giving it more expressive power | MDL compares total description length L(M) + L(D ∣ M), so a complex model wins only if its better fit saves more data bits than its extra model bits cost.
M2#maths-u23-08-q3@2: Why can't Kolmogorov complexity be used directly for model selection? | It is uncomputable: no algorithm can find the shortest program for every string | It is always zero for any string, so it can't distinguish models | It ignores the data and depends only on the programming language | It always favours the most complex model, defeating Occam's razor | It can be used directly; it's computed routinely by compressors | By a halting-problem argument, the shortest description can't be computed in general.

## Shannon's Theorems
S: Shannon's theorems are the fundamental limits of information theory. The source coding theorem says data can be compressed to its entropy but not below; the noisy channel coding theorem says reliable communication is possible up to the channel capacity and impossible beyond it.
O: State the source coding and noisy channel coding theorems
O: Calculate capacity for the binary symmetric channel and the Shannon–Hartley limit
T: Channel capacity | C = max over input distributions of I(X; Y), the highest rate of reliable communication
T: Shannon–Hartley theorem | C = B log₂(1 + S/N) bits per second for a channel of bandwidth B and signal-to-noise ratio S/N
H: Source coding theorem
- Average code length per symbol can approach H(X) but not go below it.
- Achieved by Huffman coding blocks or by arithmetic coding.
- Lossy version: rate–distortion theory.
H: Noisy channel coding theorem
- For any rate R < C, codes exist with error probability → 0.
- For R > C, error probability is bounded away from zero.
- Binary symmetric channel with flip probability p: C = 1 − h(p).
- Shannon proved existence; practical codes (turbo, LDPC, polar) now come close.
H: Shannon–Hartley
- C = B log₂(1 + SNR) for Gaussian noise.
- SNR in dB: 10 log₁₀(S/N).
- Limits for phone lines, Wi-Fi and deep-space links.
X: A channel has bandwidth 3000 Hz and SNR 1000 (30 dB). Find its capacity.
> C = 3000 × log₂(1 + 1000)
> log₂ 1001 ≈ 9.97
> C ≈ 29,900 bits per second, roughly the limit of old dial-up modems
K: Source coding: compress to entropy, no further; channel coding: reliable communication below capacity; BSC capacity is 1 − h(p); Shannon–Hartley gives B log₂(1 + SNR).
!: Thinking error-free communication requires a noise-free channel.
Q: What is the capacity of a binary symmetric channel with p = 0.5? | 0 bits per use.
Q: What does the source coding theorem say? | Average code length can't be less than the entropy.
SUM: Entropy limits compression.
SUM: Capacity limits communication.
SRC: Shannon CE, A mathematical theory of communication, Bell System Technical Journal 27(3), 379 | journal | 1948 | https://doi.org/10.1002/j.1538-7305.1948.tb01338.x
SRC: Shannon CE, Communication in the presence of noise, Proceedings of the IRE 37(1), 10 | journal | 1949 | https://doi.org/10.1109/JRPROC.1949.232969
NUM1#maths-u23-09-q1@1: What is the capacity in bits per use of a binary symmetric channel with flip probability 0.11 (h(0.11) ≈ 0.5)? | 0.5 | 0.01 | bits | C = 1 − h(0.11) ≈ 1 − 0.5 = 0.5 bits per channel use.
M1#maths-u23-09-q2@1: What happens if data are sent faster than channel capacity? | The error probability can't be made arbitrarily small | Errors disappear entirely once codes are long enough | The channel's capacity increases automatically to match | The channel becomes noiseless at higher transmission rates | Nothing changes; capacity limits only power, not rate | The converse of the coding theorem bounds the error away from zero.
M3#maths-u23-09-q3@2: Why was Shannon's channel coding theorem surprising in 1948? | It showed noise needn't force errors: with clever coding, error rates can be made tiny at positive rates | It proved noise could be removed physically from any channel with filters | It showed channel capacity is always infinite for well-designed codes | It required zero noise for any reliable communication to take place | It wasn't surprising; engineers already knew error-free coding was possible | Engineers had assumed reducing errors meant reducing rate towards zero.

## Compression Theory
S: Compression theory studies how to represent data in fewer bits. Lossless compression preserves data exactly and is limited by entropy; lossy compression, used for images, audio and video, trades fidelity for size according to rate–distortion theory.
O: Distinguish lossless and lossy compression and their limits
O: Describe rate–distortion theory and transform coding
T: Lossless compression | Encoding that allows exact reconstruction of the original data, such as ZIP or PNG
T: Rate–distortion function | R(D), the minimum bits per symbol needed to reconstruct data within average distortion D
H: Lossless
- Limited by entropy (source coding theorem).
- Huffman, arithmetic and dictionary (Lempel–Ziv) coding.
- No method compresses every file: by counting, some files must grow.
- Compression ratio depends on redundancy.
H: Lossy
- Rate–distortion: for a Gaussian source with variance σ^{2} and squared error, R(D) = ½ log₂(σ^{2}/D).
- Each extra bit per sample cuts mean squared error by a factor of 4 (about 6 dB).
- Transform coding: DCT (JPEG), MDCT (MP3, AAC), wavelets (JPEG 2000).
- Perceptual models discard what people can't see or hear.
H: Practice
- Quantisation followed by entropy coding.
- Video codecs exploit motion between frames.
- Learned (neural) compression.
- Compression and prediction are closely linked.
X: For a Gaussian source with σ^{2} = 16, how many bits per sample are needed for mean squared error D = 1?
> R(D) = ½ log₂(σ^{2}/D) = ½ log₂ 16
> = ½ × 4
> = 2 bits per sample
K: Lossless compression is bounded by entropy; lossy compression follows rate–distortion trade-offs; transform coding plus quantisation and entropy coding underlies JPEG, MP3 and video codecs.
!: Claiming a lossless compressor can shrink every possible file.
Q: Why can't any lossless method compress all files? | There are fewer short strings than long ones (pigeonhole principle).
Q: What transform does JPEG use? | The discrete cosine transform (DCT).
SUM: Lossless is bounded by entropy.
SUM: Lossy trades bits for distortion.
SRC: Sayood K, Introduction to Data Compression (5th edn, Morgan Kaufmann 2017) | textbook | 2017 | https://www.elsevier.com/
SRC: Berger T, Rate Distortion Theory: A Mathematical Basis for Data Compression (Prentice Hall 1971) | textbook | 1971 | https://www.pearson.com/
NUM1#maths-u23-10-q1@1: For a Gaussian source, how many extra bits per sample are needed to reduce mean squared error by a factor of 16? | 2 | 0 | bits | Each bit divides distortion by 4, so 16 = 4^{2} needs 2 bits.
M1#maths-u23-10-q2@1: Which format uses lossless compression? | PNG images | JPEG photographs | MP3 audio | H.264 video | AAC audio | PNG reconstructs every pixel exactly, while JPEG, MP3, H.264 and AAC discard information that people are unlikely to notice.
M2#maths-u23-10-q3@2: Why does transform coding help compress images? | Transforms like the DCT pack most energy into a few coefficients, so the rest can be coarsely quantised | Transforms add redundancy that entropy coders can then remove | Transforms make image files larger but easier to display | They remove all fine detail from images before coding | They don't help; images are compressed in the pixel domain | Smooth image blocks have small high-frequency coefficients.

## Source Coding
S: Source coding assigns codewords to symbols so that messages are as short as possible on average while remaining decodable. Huffman coding is optimal among symbol-by-symbol prefix codes, and arithmetic coding gets arbitrarily close to the entropy.
O: Construct Huffman codes and compute their average length
O: Apply the Kraft inequality and describe arithmetic and Lempel–Ziv coding
T: Prefix code | A code in which no codeword is the start of another, so messages decode instantly
T: Kraft inequality | Σ 2^{−lᵢ} ≤ 1: a prefix code with lengths lᵢ exists if and only if this holds
H: Huffman coding (1952)
- Repeatedly merge the two least probable symbols.
- Assign 0 and 1 to branches.
- Optimal among prefix codes for known symbol probabilities.
- Average length within 1 bit of entropy: H ≤ L < H + 1.
H: Beyond Huffman
- Coding blocks of symbols brings L closer to H.
- Arithmetic coding encodes a whole message as an interval, approaching H.
- Lempel–Ziv (LZ77, LZ78) learns patterns without known probabilities: universal coding.
- Asymmetric numeral systems (ANS) in modern compressors (Zstandard).
H: Practice
- Variable-length codes need care with errors.
- Shannon–Fano coding preceded Huffman.
- Morse code is an early variable-length code.
X: Build a Huffman code for probabilities A ½, B ¼, C ⅛, D ⅛ and find the average length.
> Merge C and D (¼), then that with B (½), then with A
> Codes: A 0, B 10, C 110, D 111
> Average length = ½ × 1 + ¼ × 2 + ⅛ × 3 + ⅛ × 3 = 1.75 bits, equal to the entropy here
K: Prefix codes decode instantly; the Kraft inequality governs their lengths; Huffman coding is optimal symbol by symbol; arithmetic and Lempel–Ziv coding approach entropy and adapt to data.
!: Using a code that isn't prefix-free, making messages ambiguous to decode.
Q: What does the Kraft inequality state? | Σ 2^{−lᵢ} ≤ 1 for prefix-code lengths lᵢ.
Q: Who invented Huffman coding? | David Huffman (1952).
SUM: Short codes for common symbols.
SUM: Huffman and arithmetic coding approach entropy.
SRC: Huffman DA, A method for the construction of minimum-redundancy codes, Proceedings of the IRE 40(9), 1098 | journal | 1952 | https://doi.org/10.1109/JRPROC.1952.273898
SRC: Ziv J, Lempel A, A universal algorithm for sequential data compression, IEEE Transactions on Information Theory 23(3), 337 | journal | 1977 | https://doi.org/10.1109/TIT.1977.1055714
NUM1#maths-u23-11-q1@1: Do codeword lengths 1, 2, 3, 3 satisfy the Kraft inequality with equality? Give Σ 2^{−lᵢ}. | 1 | 0 |  | ½ + ¼ + ⅛ + ⅛ = 1, so a complete prefix code exists.
M1#maths-u23-11-q2@1: Which set of codewords is a prefix code? | {0, 10, 110, 111} | {0, 01, 11} | {1, 10, 100} | {00, 0, 1} | {01, 0, 10} | No codeword in it is the beginning of another.
M2#maths-u23-11-q3@2: Why does Lempel–Ziv coding work without knowing symbol probabilities? | It builds a dictionary of repeated patterns as it reads, adapting to the data's statistics | It assumes all symbols are equally likely, which is always nearly true | It needs the symbol probabilities to be sent first in a header | It only works on English text, where the probabilities are known | It doesn't work without probabilities; it needs a trained model | Universal codes approach the entropy rate for stationary sources.

## Channel Coding
S: Channel coding adds structured redundancy to data so that errors introduced by a noisy channel can be detected and corrected. The code rate measures how much redundancy is added, and modern codes approach Shannon's capacity limit.
O: Calculate code rates and minimum distances
O: Describe how coding gain trades rate for reliability
T: Code rate | R = k/n, for a code mapping k information bits into n coded bits
T: Minimum distance | d_{min}, the smallest Hamming distance between distinct codewords; a code corrects ⌊(d_{min} − 1)/2⌋ errors
H: Basic ideas
- Repetition code: send each bit 3 times, decode by majority (rate ⅓, corrects 1 error).
- Parity check: detects any single error.
- Detects up to d_{min} − 1 errors; corrects ⌊(d_{min} − 1)/2⌋.
H: Code families
- Block codes: Hamming, BCH, Reed–Solomon.
- Convolutional codes decoded by the Viterbi algorithm.
- Turbo codes (1993) and LDPC codes: within a fraction of a dB of capacity.
- Polar codes (Arıkan 2009): provably achieve capacity; used in 5G.
H: Trade-offs
- Lower rate gives more protection but less throughput.
- Coding gain: SNR saved for a target error rate.
- Interleaving spreads burst errors.
- Hybrid ARQ combines coding with retransmission.
X: The 3-bit repetition code is used on a channel flipping bits with probability 0.1. Find the decoded bit error probability.
> Decoding fails if 2 or 3 bits flip
> P = 3 × 0.1^{2} × 0.9 + 0.1^{3} = 0.027 + 0.001
> = 0.028, down from 0.1, at the cost of rate ⅓
K: Channel codes add redundancy to correct errors; rate k/n and minimum distance set the trade-off; turbo, LDPC and polar codes approach capacity; interleaving handles bursts.
!: Assuming a code can correct as many errors as it can detect.
Q: How many errors can a code with d_{min} = 5 correct? | 2.
Q: Which codes are used in 5G control channels? | Polar codes.
SUM: Redundancy protects against noise.
SUM: Modern codes near capacity.
SRC: Lin S, Costello DJ, Error Control Coding (2nd edn, Pearson 2004) | textbook | 2004 | https://www.pearson.com/
SRC: Arıkan E, Channel polarization: a method for constructing capacity-achieving codes, IEEE Transactions on Information Theory 55(7), 3051 | journal | 2009 | https://doi.org/10.1109/TIT.2009.2021379
NUM1#maths-u23-12-q1@1: A code maps 223 data bytes into 255 coded bytes. What is its rate, to 3 decimal places? | 0.875 | 0.001 |  | R = 223/255 ≈ 0.875 (the Reed–Solomon code used by deep-space missions).
M1#maths-u23-12-q2@1: A code has minimum distance 3. How many errors can it detect? | 2 | 1 | 3 | 0 | 6 | It detects up to d_{min} − 1 = 2 errors and corrects 1.
M2#maths-u23-12-q3@2: Why are long block lengths needed to approach channel capacity? | By the law of large numbers, noise in long blocks behaves predictably, letting codes separate codewords reliably | Short codes are always better than long ones for approaching capacity | Capacity grows with block length, so longer blocks raise the limit itself | Long blocks remove noise from the channel, making errors impossible | They aren't needed; capacity can be reached with blocks of a few bits | Shannon's random coding argument relies on long blocks.

## Error-Correcting Codes
S: Error-correcting codes protect data in QR codes, CDs, phones, spacecraft and computer memory. Linear codes use matrices over the field with two elements, and Hamming and Reed–Solomon codes show how algebra turns into reliable communication.
O: Encode and decode with the Hamming (7,4) code
O: Describe linear codes, syndromes and Reed–Solomon codes
T: Linear code | A code whose codewords form a vector subspace; codewords are c = mG for a generator matrix G
T: Syndrome | s = Hrᵀ for received word r and parity-check matrix H; s = 0 for codewords, otherwise it identifies the error
H: Hamming (7,4)
- 4 data bits, 3 parity bits; d_{min} = 3, so it corrects one error.
- The syndrome gives the position of a single-bit error in binary.
- Perfect code: every word is within distance 1 of exactly one codeword.
- Hamming (1950).
H: Reed–Solomon codes
- Work over larger finite fields (bytes).
- Correct up to (n − k)/2 symbol errors; good for bursts.
- Used in CDs, DVDs, QR codes, RAID 6 and deep-space probes.
- Based on evaluating polynomials over finite fields.
H: Other examples
- BCH codes; cyclic redundancy checks (CRC) for detection.
- ECC memory using SECDED Hamming codes.
- Quantum error-correcting codes.
- Golay code used by Voyager.
X: A Hamming (7,4) receiver computes syndrome 101 (binary). What does it do?
> A non-zero syndrome means an error occurred
> 101 in binary is 5
> Flip bit 5 to correct the single error
K: Linear codes use generator and parity-check matrices; syndromes locate errors; Hamming (7,4) corrects single errors; Reed–Solomon codes correct symbol bursts and are everywhere in storage and communication.
!: Assuming a Hamming code can correct two errors.
Q: How many errors can Hamming (7,4) correct? | One.
Q: Where are Reed–Solomon codes used? | CDs, DVDs, QR codes, RAID and spacecraft.
SUM: Algebra protects data.
SUM: Syndromes locate errors.
SRC: Hamming RW, Error detecting and error correcting codes, Bell System Technical Journal 29(2), 147 | journal | 1950 | https://doi.org/10.1002/j.1538-7305.1950.tb00463.x
SRC: Reed IS, Solomon G, Polynomial codes over certain finite fields, Journal of the Society for Industrial and Applied Mathematics 8(2), 300 | journal | 1960 | https://doi.org/10.1137/0108018
NUM1#maths-u23-13-q1@1: A Reed–Solomon code has n = 255 and k = 239 symbols. How many symbol errors can it correct? | 8 | 0 | symbols | (n − k)/2 = 16/2 = 8 symbol errors.
M1#maths-u23-13-q2@1: What does a zero syndrome indicate? | The received word is a codeword (no detectable error) | Exactly one bit error occurred | Exactly two bit errors occurred | The decoder has failed completely | All the parity bits are zero | The syndrome s = Hrᵀ is zero exactly when r is a codeword, so either no error occurred or the errors formed another codeword.
M3#maths-u23-13-q3@2: Why are Reed–Solomon codes good at correcting burst errors? | They work on multi-bit symbols, so a burst of bit errors corrupts only a few symbols | They correct infinitely many errors whatever the block length | They work on single bits only, which spreads bursts out | Burst errors never occur in storage or communications | They aren't good at bursts; they suit random single errors | A scratch on a CD hits consecutive bits, which fall into a small number of byte symbols.

## Signal Processing Mathematics
S: Signal processing analyses, transforms and extracts information from signals such as sound, images, radar returns and sensor readings. Its mathematics, linear systems, Fourier analysis and probability, lets engineers filter noise, compress data and detect patterns.
O: Describe signals, systems and the linear time-invariant model
O: Explain how Fourier methods describe system behaviour
T: Linear time-invariant system | A system whose response to a sum of inputs is the sum of responses, and whose behaviour doesn't change over time
T: Impulse response | h(t), the output of an LTI system to a unit impulse; it determines the response to any input by convolution
H: Signals
- Continuous-time x(t) and discrete-time x[n].
- Deterministic and random signals.
- Energy and power signals.
- Analogue-to-digital conversion: sampling and quantisation.
H: LTI systems
- Output y = h * x (convolution).
- In frequency: Y(f) = H(f)X(f), where H is the frequency response.
- Sinusoids are eigenfunctions: they pass through scaled and shifted.
- Stability: bounded input gives bounded output when ∫|h| < ∞.
H: Toolbox
- Fourier, Laplace and z-transforms.
- Filtering, modulation and sampling.
- Estimation and detection theory.
- Applications: audio, communications, medical imaging, radar.
X: An LTI system has frequency response H(f) with |H| = 0.5 and phase −90° at 100 Hz. What is the output for input cos(2π × 100t)?
> Sinusoids pass through LTI systems at the same frequency
> Amplitude scales by 0.5; phase shifts by −90°
> Output = 0.5 cos(2π × 100t − π/2) = 0.5 sin(2π × 100t)
K: Signal processing models systems as LTI with impulse responses and frequency responses; convolution in time is multiplication in frequency; sinusoids are eigenfunctions; transforms are the main tools.
!: Expecting an LTI system to create frequencies not present in its input.
Q: What determines an LTI system's response to any input? | Its impulse response.
Q: What happens to a sinusoid passed through an LTI system? | It comes out at the same frequency, scaled and phase-shifted.
SUM: LTI systems are described by impulse responses.
SUM: Frequency analysis simplifies them.
SRC: Oppenheim AV, Willsky AS, Signals and Systems (2nd edn, Pearson 1997) | textbook | 1997 | https://www.pearson.com/
SRC: Smith SW, The Scientist and Engineer's Guide to Digital Signal Processing (California Technical Publishing 1997) | textbook | 1997 | https://www.dspguide.com/
NUM1#maths-u23-14-q1@1: An LTI system has gain |H| = 3 at 50 Hz. An input sinusoid at 50 Hz has amplitude 2. What is the output amplitude? | 6 | 0 |  | Output amplitude = |H| × input amplitude = 3 × 2 = 6.
M1#maths-u23-14-q2@1: Which property defines a linear system? | The response to a sum of inputs is the sum of their responses | Its output never changes over time | It only passes low frequencies through | Its output is always zero for any input | It has no memory of past inputs | Superposition (additivity and scaling) defines linearity.
M2#maths-u23-14-q3@2: Why are sinusoids so useful for analysing LTI systems? | They are eigenfunctions, so each frequency is simply scaled and shifted, and any signal is a sum of them | Sinusoids are the only real signals that occur in physical systems | LTI systems can't process any other kind of signal at all | Sinusoids have no frequency, so they pass through systems unchanged | They aren't especially useful; impulse responses alone are enough | Fourier decomposition plus eigenfunction behaviour reduces analysis to multiplication by H(f).

## Convolution
S: Convolution combines two functions by sliding one across the other and integrating their product. It describes how LTI systems respond to inputs, blurs images, smooths data and appears in probability as the distribution of a sum of independent variables.
O: Compute discrete and continuous convolutions
O: Use the convolution theorem
T: Convolution | (f * g)(t) = ∫ f(τ)g(t − τ) dτ; discrete (x * h)[n] = Σ x[k]h[n − k]
T: Convolution theorem | The Fourier transform of a convolution is the product of the Fourier transforms: ℱ(f * g) = ℱ(f)ℱ(g)
H: Properties
- Commutative, associative and distributive.
- The impulse δ is the identity: f * δ = f.
- Length: convolving sequences of lengths M and N gives length M + N − 1.
H: Computing
- Direct: O(MN) operations.
- FFT-based: O(N log N) via the convolution theorem.
- Circular convolution and zero padding.
- Overlap–add for long signals.
H: Uses
- System output y = x * h.
- Image blurring and sharpening kernels.
- Probability: density of X + Y is f_{X} * f_{Y}.
- Convolutional neural networks (strictly, cross-correlation).
X: Convolve x = [1, 2, 3] with h = [1, 1].
> y[0] = 1 × 1 = 1
> y[1] = 2 × 1 + 1 × 1 = 3; y[2] = 3 + 2 = 5; y[3] = 3
> y = [1, 3, 5, 3], of length 3 + 2 − 1 = 4
- Deconvolution reverses convolution, but it's ill-posed when the kernel's spectrum has zeros.
K: Convolution slides and sums products; it describes LTI outputs, blurs and sums of random variables; the convolution theorem makes it multiplication in frequency; FFTs compute it fast.
!: Forgetting to flip one sequence (that's cross-correlation, not convolution).
Q: What is the length of the convolution of sequences of lengths 5 and 3? | 7.
Q: What is f * δ? | f.
SUM: Slide, multiply, sum.
SUM: Multiplication in frequency.
SRC: Oppenheim AV, Schafer RW, Discrete-Time Signal Processing (3rd edn, Pearson 2010) | textbook | 2010 | https://www.pearson.com/
SRC: Bracewell RN, The Fourier Transform and Its Applications (3rd edn, McGraw-Hill 2000) | textbook | 2000 | https://www.mheducation.com/
NUM1#maths-u23-15-q1@1: Convolve [1, 1, 1] with [1, 1, 1]. What is the middle value of the result? | 3 | 0 |  | The result is [1, 2, 3, 2, 1], with middle value 3.
M1#maths-u23-15-q2@1: The sum of two independent uniform(0, 1) variables has which density shape? | Triangular on [0, 2] | Uniform on [0, 2] | Normal | Exponential | Uniform on [0, 1] | Convolving two box functions gives a triangle.
M2#maths-u23-15-q3@2: Why is FFT-based convolution faster for long signals? | The convolution theorem turns convolution into pointwise multiplication, and FFTs cost O(N log N) | FFTs skip most of the samples, so there's less arithmetic to do | Direct convolution is always faster for long signals in practice | It uses less accurate arithmetic, which is quicker on hardware | It isn't faster; FFT convolution is only used for short signals | Direct convolution needs O(N^{2}) operations for long sequences.

## Correlation Functions
S: Correlation functions measure how similar a signal is to a shifted version of itself (autocorrelation) or of another signal (cross-correlation). They locate echoes and delays, reveal periodicities and link to power spectra through the Wiener–Khinchin theorem.
O: Compute and interpret autocorrelation and cross-correlation
O: Apply the Wiener–Khinchin theorem and matched filtering
T: Cross-correlation | R_{xy}(τ) = ∫ x(t)y(t + τ) dt (or E[x(t)y(t + τ)] for random signals)
T: Wiener–Khinchin theorem | The power spectral density of a wide-sense stationary process is the Fourier transform of its autocorrelation
H: Autocorrelation
- R_{xx}(0) is the signal's energy or power, the maximum value.
- Periodic signals have periodic autocorrelation.
- White noise has autocorrelation concentrated at τ = 0.
H: Cross-correlation
- Peaks at the delay that best aligns two signals.
- Time-delay estimation: radar, sonar, GPS, sound localisation.
- Normalised cross-correlation for template matching in images.
H: Matched filtering
- Correlating with a known pulse maximises signal-to-noise ratio in white noise.
- Used in radar and gravitational-wave detection (LIGO).
- Pulse compression with chirps.
X: A radar pulse returns to the antenna, and the cross-correlation with the sent pulse peaks at τ = 20 μs. How far away is the target?
> The round-trip time is 20 μs
> Distance = c × t/2 = 3 × 10^{8} × 20 × 10^{−6}/2
> = 3000 m
K: Autocorrelation measures self-similarity; cross-correlation finds delays; Wiener–Khinchin links autocorrelation and power spectrum; matched filters maximise SNR for known signals.
!: Confusing cross-correlation with convolution (correlation doesn't flip the signal).
Q: Where does autocorrelation reach its maximum? | At zero lag.
Q: What does the Wiener–Khinchin theorem relate? | Autocorrelation and the power spectral density.
SUM: Correlation finds similarity and delay.
SUM: Matched filters detect known signals.
SRC: Proakis JG, Manolakis DG, Digital Signal Processing (4th edn, Pearson 2007) | textbook | 2007 | https://www.pearson.com/
SRC: Abbott BP et al. (LIGO Scientific Collaboration and Virgo Collaboration), Observation of gravitational waves from a binary black hole merger, Physical Review Letters 116, 061102 | journal | 2016 | https://doi.org/10.1103/PhysRevLett.116.061102
NUM1#maths-u23-16-q1@1: Two microphones 0.68 m apart record a sound; cross-correlation shows a 1 ms delay. Taking sound speed 340 m/s, what extra path length in m does this imply? | 0.34 | 0.001 | m | 340 × 0.001 = 0.34 m.
M1#maths-u23-16-q2@1: What does the autocorrelation of white noise look like? | A spike at zero lag and roughly zero elsewhere | A sine wave | A constant at all lags | A slowly decaying exponential | Periodic peaks | White noise is uncorrelated with its shifted copies.
M3#maths-u23-16-q3@2: Why is a matched filter optimal for detecting a known pulse in white noise? | Correlating with the pulse shape adds signal energy coherently while noise adds incoherently, maximising SNR | It removes all the noise from the received signal before detection | It amplifies the noise most strongly, making the pulse easier to see | It ignores the pulse shape and responds to energy in any band | It isn't optimal; a simple low-pass filter always does better | By the Cauchy–Schwarz inequality, the filter matched to the signal maximises output SNR.

## Sampling Theory (Signals)
S: Sampling turns a continuous signal into a sequence of numbers taken at regular intervals. Sampling theory explains when the original can be recovered, what goes wrong with too few samples (aliasing), and how quantisation adds noise.
O: Explain sampling, aliasing and quantisation
O: Calculate alias frequencies and quantisation signal-to-noise ratios
T: Aliasing | When frequencies above half the sampling rate appear as lower frequencies in the sampled signal
T: Quantisation noise | The error from rounding samples to a finite number of levels; each extra bit improves SNR by about 6 dB
H: Sampling
- Sampling rate f_{s} samples per second; interval T = 1/f_{s}.
- Spectrum of a sampled signal repeats every f_{s}.
- Anti-aliasing filters remove frequencies above f_{s}/2 before sampling.
H: Aliasing
- A frequency f appears at |f − kf_{s}| for the integer k bringing it into [0, f_{s}/2].
- Wagon-wheel effect in films.
- Moiré patterns in images.
H: Quantisation
- N bits give 2ᴺ levels.
- SNR ≈ 6.02N + 1.76 dB for a full-scale sine.
- CD audio: 16 bits ≈ 98 dB; dither and noise shaping.
X: A 7 kHz tone is sampled at 10 kHz. At what frequency does it appear?
> Nyquist frequency = 5 kHz, so 7 kHz aliases
> Alias = |7 − 10| = 3 kHz
> The sampled signal looks exactly like a 3 kHz tone
- Higher sampling rates cost storage and bandwidth, so rates are chosen to suit the signal.
K: Sampling at f_{s} represents frequencies up to f_{s}/2; higher ones alias; anti-aliasing filters prevent this; quantisation adds noise, improving about 6 dB per bit.
!: Sampling without an anti-aliasing filter and mistaking aliases for real signals.
Q: What SNR does 16-bit quantisation give for a full-scale sine? | About 98 dB.
Q: What causes aliasing? | Sampling a signal with frequencies above half the sampling rate.
SUM: Sample fast enough.
SUM: Quantise with enough bits.
SRC: Oppenheim AV, Schafer RW, Discrete-Time Signal Processing (3rd edn, Pearson 2010) | textbook | 2010 | https://www.pearson.com/
SRC: Widrow B, Kollár I, Quantization Noise (Cambridge University Press 2008) | textbook | 2008 | https://www.cambridge.org/
NUM1#maths-u23-17-q1@1: What is the approximate quantisation SNR in dB for a 12-bit converter with a full-scale sine, to 1 decimal place? | 74 | 0.1 | dB | 6.02 × 12 + 1.76 = 72.24 + 1.76 = 74.0 dB.
M1#maths-u23-17-q2@1: A 30 kHz tone is sampled at 48 kHz. At what frequency does it appear? | 18 kHz | 30 kHz | 24 kHz | 78 kHz | 6 kHz | |30 − 48| = 18 kHz, below the 24 kHz Nyquist frequency.
M2#maths-u23-17-q3@2: Why must an anti-aliasing filter come before the sampler rather than after? | Once sampled, aliased components are indistinguishable from genuine low frequencies and can't be removed | Filters only work on digital data, so the order doesn't matter | Aliasing happens after sampling, so filtering first does nothing | It doesn't matter where the filter goes in the chain | It must come after, to clean up the sampled data | Aliases occupy the same frequencies as real content after sampling.

## Nyquist–Shannon Sampling Theorem
S: The Nyquist–Shannon sampling theorem says a signal containing no frequencies above B can be perfectly reconstructed from samples taken faster than 2B per second. It's why CDs sample at 44.1 kHz and why digital audio, video and communications work.
O: State the sampling theorem and the Nyquist rate
O: Describe ideal reconstruction and practical oversampling
T: Nyquist rate | 2B, twice the highest frequency in a band-limited signal: the minimum sampling rate for perfect reconstruction
T: Sinc interpolation | x(t) = Σ x[n] sinc((t − nT)/T), the ideal reconstruction from samples
H: The theorem
- Band-limited to B Hz ⇒ samples at f_{s} > 2B determine the signal exactly.
- Reconstruction by sinc interpolation (an ideal low-pass filter).
- Attributed to Nyquist, Shannon, Kotelnikov and Whittaker.
H: Practice
- Real signals aren't perfectly band-limited: use anti-aliasing filters.
- Oversampling eases filter design (CD: 44.1 kHz for 20 kHz audio).
- Sigma-delta converters oversample heavily and shape noise.
- Band-pass sampling for narrowband signals.
H: Beyond the theorem
- Compressed sensing recovers sparse signals from fewer samples.
- Non-uniform sampling.
- Finite rate of innovation.
X: Human hearing reaches about 20 kHz. What is the Nyquist rate, and why do CDs use 44.1 kHz?
> Nyquist rate = 2 × 20 kHz = 40 kHz
> 44.1 kHz leaves a 2.05 kHz transition band above 20 kHz
> That margin lets a realistic anti-aliasing filter roll off before 22.05 kHz
K: Band-limited signals sampled above 2B can be perfectly reconstructed by sinc interpolation; practical systems oversample and filter; compressed sensing goes further for sparse signals.
!: Sampling at exactly 2B, where a sinusoid at B may be lost (sampled at its zeros).
Q: What is the Nyquist rate for a signal band-limited to 4 kHz? | 8 kHz.
Q: What function performs ideal reconstruction? | The sinc function.
SUM: Sample above twice the bandwidth.
SUM: Sinc interpolation reconstructs.
SRC: Shannon CE, Communication in the presence of noise, Proceedings of the IRE 37(1), 10 | journal | 1949 | https://doi.org/10.1109/JRPROC.1949.232969
SRC: Unser M, Sampling—50 years after Shannon, Proceedings of the IEEE 88(4), 569 | journal | 2000 | https://doi.org/10.1109/5.843002
NUM1#maths-u23-18-q1@1: Telephone speech is limited to 3.4 kHz. What is its Nyquist rate in kHz? | 6.8 | 0.01 | kHz | 2 × 3.4 = 6.8 kHz (telephony uses 8 kHz).
M1#maths-u23-18-q2@1: A signal contains frequencies up to 15 kHz. Which sampling rate allows perfect reconstruction? | 32 kHz | 15 kHz | 20 kHz | 25 kHz | 30 kHz | Only 32 kHz exceeds the Nyquist rate of 30 kHz.
M3#maths-u23-18-q3@2: Why can a sine at exactly f_{s}/2 be lost when sampled? | Samples may fall at its zero crossings, giving all zeros regardless of amplitude | Sines can't be sampled at any rate, so they're always lost | It aliases to a higher frequency, outside the sampled band | Its amplitude doubles at that rate, causing clipping | It is never lost when sampled at exactly f_{s}/2 | At exactly two samples per cycle, phase determines whether peaks or zeros are captured.

## Digital Signal Processing
S: Digital signal processing manipulates sampled signals with computers: filtering audio, compressing images, equalising communications channels. The z-transform and the discrete Fourier transform are its main mathematical tools.
O: Use difference equations and the z-transform
O: Distinguish FIR and IIR filters and analyse stability
T: Z-transform | X(z) = Σ x[n]z^{−n}, the discrete-time counterpart of the Laplace transform
T: FIR filter | A finite impulse response filter y[n] = Σ_{k=0}^{M} b_{k}x[n − k], always stable
H: Difference equations
- y[n] = Σ b_{k}x[n − k] − Σ a_{k}y[n − k].
- Transfer function H(z) = B(z)/A(z).
- Poles inside the unit circle ⇒ stable (IIR).
- Frequency response H(e^{iω}) on the unit circle.
H: FIR versus IIR
- FIR: no feedback, always stable, can have exactly linear phase.
- IIR: feedback, fewer coefficients for sharp responses, may be unstable.
- Design: windowing, Parks–McClellan (FIR); bilinear transform of analogue filters (IIR).
H: Applications
- Audio equalisers and effects.
- Echo cancellation and channel equalisation.
- Sample-rate conversion (decimation, interpolation).
- Real-time processing on DSP chips.
X: Is the IIR filter y[n] = x[n] + 0.8y[n − 1] stable? Give its impulse response.
> H(z) = 1/(1 − 0.8z^{−1}) has a pole at z = 0.8
> |0.8| < 1, so it's stable
> Impulse response h[n] = 0.8ⁿ for n ≥ 0, decaying geometrically
K: DSP uses difference equations, z-transforms and DFTs; FIR filters are always stable and can be linear-phase; IIR filters need poles inside the unit circle; design methods target frequency responses.
!: Designing an IIR filter without checking that all poles lie inside the unit circle.
Q: Where must the poles of a stable causal IIR filter lie? | Inside the unit circle.
Q: Which filter type can have exactly linear phase? | FIR.
SUM: Process sampled signals digitally.
SUM: Poles decide stability.
SRC: Oppenheim AV, Schafer RW, Discrete-Time Signal Processing (3rd edn, Pearson 2010) | textbook | 2010 | https://www.pearson.com/
SRC: Lyons RG, Understanding Digital Signal Processing (3rd edn, Pearson 2010) | textbook | 2010 | https://www.pearson.com/
NUM1#maths-u23-19-q1@1: For y[n] = x[n] + 0.5y[n − 1], what is the impulse response value h[3]? | 0.125 | 0.001 |  | h[n] = 0.5ⁿ, so h[3] = 0.125.
M1#maths-u23-19-q2@1: Which filter is always stable? | An FIR filter | An IIR filter with a pole at z = 1.2 | An IIR filter with a pole at z = −1.5 | Any filter with feedback | An unstable recursive filter | FIR filters have no feedback, so bounded inputs give bounded outputs.
M2#maths-u23-19-q3@2: Why might an engineer choose an IIR filter despite stability concerns? | It achieves a sharp frequency response with far fewer coefficients, saving computation | IIR filters are always stable, unlike FIR filters | FIR filters can't filter signals with sharp features | IIR filters always have exactly linear phase | There's no reason, since FIR is better in every way | Feedback lets a low-order filter mimic a long FIR response.

## Filtering Theory
S: Filtering theory designs systems that separate wanted signals from noise or interference. Ideal filters pass some frequencies and block others; real filters approximate them with trade-offs, and optimal filters like the Wiener filter minimise error using signal and noise statistics.
O: Describe low-pass, high-pass, band-pass and band-stop filters
O: Explain filter specifications and the Wiener filter
T: Cut-off frequency | The frequency where a filter's response falls by 3 dB (to 1/√2 in amplitude)
T: Wiener filter | The linear filter minimising mean squared error, with frequency response S_{s}(f)/(S_{s}(f) + S_{n}(f)) for signal and noise spectra
H: Filter types
- Low-pass, high-pass, band-pass, band-stop (notch, such as 50 Hz mains hum).
- Specifications: passband ripple, stopband attenuation, transition width.
- Classical designs: Butterworth (flat), Chebyshev (ripple), elliptic (sharpest).
- Order n Butterworth roll-off: 20n dB per decade.
H: Optimal filtering
- Wiener filter (1949): minimises MSE for stationary signals.
- Passes frequencies where signal dominates, suppresses where noise dominates.
- Kalman filter extends to time-varying, state-space settings.
- Adaptive filters (LMS) learn coefficients online.
H: Uses
- Removing noise from ECGs and audio.
- Image deblurring (Wiener deconvolution).
- Channel equalisation.
- Anti-aliasing and reconstruction filters.
X: At a frequency where signal power is 9 and noise power is 1, what gain does the Wiener filter apply? What if signal power is 1 and noise 9?
> Gain = S_{s}/(S_{s} + S_{n}) = 9/10 = 0.9
> In the noisy band: 1/(1 + 9) = 0.1
> The filter keeps signal-dominated frequencies and suppresses noisy ones
K: Filters pass or block frequency bands with design trade-offs; Butterworth, Chebyshev and elliptic designs differ in flatness and sharpness; the Wiener filter minimises MSE using spectra.
!: Expecting a real filter to have a perfectly sharp, ideal brick-wall response.
Q: What does a notch filter remove? | A narrow band of frequencies, such as mains hum.
Q: How fast does an nth-order Butterworth filter roll off? | 20n dB per decade.
SUM: Filters separate signal and noise.
SUM: Wiener filters do it optimally.
SRC: Wiener N, Extrapolation, Interpolation, and Smoothing of Stationary Time Series (MIT Press 1949) | textbook | 1949 | https://mitpress.mit.edu/
SRC: Haykin S, Adaptive Filter Theory (5th edn, Pearson 2014) | textbook | 2014 | https://www.pearson.com/
NUM1#maths-u23-20-q1@1: A 4th-order Butterworth low-pass filter has cut-off 1 kHz. Approximately how many dB of attenuation does it give at 10 kHz? | 80 | 1 | dB | Roll-off is 20n = 80 dB per decade, and 10 kHz is one decade above cut-off.
M1#maths-u23-20-q2@1: Which filter type would remove 50 Hz mains hum from an ECG while keeping nearby frequencies? | A narrow band-stop (notch) filter | A low-pass filter at 10 Hz | A high-pass filter at 100 Hz | An all-pass filter | No filter | A notch removes a narrow band around 50 Hz.
M2#maths-u23-20-q3@2: Why does the Wiener filter need knowledge of signal and noise spectra? | Its gain at each frequency balances signal against noise power, which it must know or estimate | It ignores the noise and uses only the signal spectrum | It only uses time-domain data, never spectra | It works without any statistics of signal or noise | It doesn't need them; its gain is fixed at 1 | H = S_{s}/(S_{s} + S_{n}) depends directly on both spectra.

## Spectral Estimation
S: Spectral estimation determines how a signal's power is distributed across frequencies from finite, noisy data. Non-parametric methods smooth periodograms, while parametric and subspace methods achieve higher resolution when their model assumptions hold.
O: Compare periodogram, Welch, multitaper and parametric estimators
O: Explain resolution, leakage and windowing
T: Spectral leakage | Spreading of power from a frequency into neighbouring frequencies because of finite data length
T: Window function | A taper, such as Hann or Hamming, applied to data before transforming, reducing leakage at the cost of resolution
H: Non-parametric
- Periodogram: |DFT|^{2}/N; noisy, with variance not shrinking with N.
- Welch: average periodograms of overlapping windowed segments.
- Multitaper (Thomson 1982): several orthogonal tapers averaged.
- Resolution ≈ 1/(record length).
H: Parametric
- Fit an AR model; spectrum from its coefficients (Burg's method).
- Higher resolution for short records.
- Model order choice matters.
H: High-resolution methods
- MUSIC and ESPRIT for sums of sinusoids in noise.
- Used in direction-of-arrival estimation with antenna arrays.
- Time–frequency methods: short-time Fourier transform, spectrograms.
X: A 2-second recording is analysed with the FFT. What is the frequency resolution?
> Resolution ≈ 1/T = 1/2 s
> = 0.5 Hz
> Two tones closer than about 0.5 Hz can't be separated without longer data or parametric methods
K: Spectral estimation balances bias, variance and resolution; windows reduce leakage; Welch and multitaper reduce variance; parametric and subspace methods offer high resolution under model assumptions.
!: Expecting finer frequency resolution from zero-padding, which only interpolates the spectrum.
Q: What does Welch's method average? | Periodograms of overlapping windowed segments.
Q: What limits frequency resolution? | The length of the data record.
SUM: Estimate power across frequencies.
SUM: Trade resolution, bias and variance.
SRC: Stoica P, Moses R, Spectral Analysis of Signals (Prentice Hall 2005) | textbook | 2005 | https://www.pearson.com/
SRC: Thomson DJ, Spectrum estimation and harmonic analysis, Proceedings of the IEEE 70(9), 1055 | journal | 1982 | https://doi.org/10.1109/PROC.1982.12433
NUM1#maths-u23-21-q1@1: What record length in seconds is needed for 0.1 Hz frequency resolution? | 10 | 0 | s | Resolution ≈ 1/T, so T = 1/0.1 = 10 s.
M1#maths-u23-21-q2@1: Why is a Hann window applied before an FFT? | To reduce spectral leakage from the abrupt ends of the record | To increase the effective sampling rate | To remove all noise from the recording | To make the signal exactly periodic | To shift the spectrum to lower frequencies | Tapering the edges reduces the sidelobes that spread power.
M3#maths-u23-21-q3@2: Why doesn't zero-padding improve true frequency resolution? | It interpolates the same spectrum on a finer grid without adding information about the signal | It doubles the actual length of the recorded data | It removes spectral leakage from the transform entirely | It increases the sampling rate of the original signal | It does improve resolution, by adding more frequency bins | Resolution depends on the actual observation time, not the number of FFT points.

## Wavelet Analysis
S: Wavelet analysis represents signals with short, localised waves at different scales, showing both when and at what frequency features occur. Wavelets excel at analysing transients and edges, compressing images (JPEG 2000) and denoising data.
O: Compare wavelet and Fourier analysis
O: Describe the discrete wavelet transform and wavelet denoising
T: Wavelet | A localised oscillating function ψ, scaled and shifted to form ψ_{a,b}(t) = |a|^{−1/2}ψ((t − b)/a)
T: Multiresolution analysis | A nested sequence of approximation spaces, each with half the resolution of the previous, underlying fast wavelet transforms
H: Why wavelets
- Fourier basis functions last forever: poor time localisation.
- Wavelets are short: good for transients, edges and changing frequencies.
- Heisenberg trade-off: fine time resolution at high frequencies, fine frequency resolution at low frequencies.
H: Transforms
- Continuous wavelet transform: scalograms.
- Discrete wavelet transform via filter banks (Mallat), O(N).
- Haar wavelet: the simplest (averages and differences).
- Daubechies wavelets: compact support and smoothness.
H: Applications
- JPEG 2000 image compression and FBI fingerprint storage.
- Denoising by thresholding small coefficients (Donoho–Johnstone).
- Detecting singularities and edges.
- Seismic, biomedical and turbulence data.
X: Apply one level of the Haar transform (averages and differences, unnormalised) to [4, 6, 10, 2].
> Averages: (4 + 6)/2 = 5 and (10 + 2)/2 = 6
> Differences: (4 − 6)/2 = −1 and (10 − 2)/2 = 4
> Coarse approximation [5, 6], detail coefficients [−1, 4]
K: Wavelets localise in time and scale; the DWT uses filter banks in O(N); Haar and Daubechies wavelets are standard; applications include compression, denoising and edge detection.
!: Using Fourier analysis alone for signals whose frequency content changes over time.
Q: What image standard uses wavelets? | JPEG 2000.
Q: What is the simplest wavelet? | The Haar wavelet.
SUM: Wavelets localise time and frequency.
SUM: Great for transients and compression.
SRC: Daubechies I, Ten Lectures on Wavelets (SIAM 1992) | textbook | 1992 | https://epubs.siam.org/
SRC: Mallat S, A Wavelet Tour of Signal Processing (3rd edn, Academic Press 2009) | textbook | 2009 | https://www.elsevier.com/
NUM1#maths-u23-22-q1@1: Applying the unnormalised Haar step to [8, 2], what is the detail coefficient? | 3 | 0 |  | (8 − 2)/2 = 3; the average is 5.
M1#maths-u23-22-q2@1: Which signal feature are wavelets especially good at analysing? | A sudden transient spike | A pure sine wave lasting forever | A constant signal | A perfectly periodic square wave | White noise only | Localised basis functions capture short events with few coefficients.
M2#maths-u23-22-q3@2: How does wavelet thresholding remove noise? | Noise spreads into many small coefficients, while signal features give a few large ones, so small coefficients are zeroed | It removes all the large coefficients, which carry most of the noise energy | It averages the whole signal into a single coefficient and reconstructs from it | It shifts the signal in time so that the noise cancels with itself | It doesn't remove noise; wavelets are used only for compression | Sparse signal representations separate from diffuse noise.

## Image Processing Mathematics
S: Image processing treats images as functions or matrices of pixel values and applies mathematics to enhance, analyse and compress them. Convolution filters, Fourier transforms, linear algebra and optimisation underlie edge detection, deblurring and medical imaging.
O: Apply convolution kernels for smoothing and edge detection
O: Describe frequency methods, deconvolution and reconstruction
T: Kernel (mask) | A small matrix convolved with an image to compute each output pixel from its neighbourhood
T: Image gradient | ∇I = (∂I/∂x, ∂I/∂y), estimated with kernels such as Sobel; large magnitudes mark edges
H: Spatial filtering
- Box and Gaussian blur kernels.
- Sobel and Prewitt for gradients; Laplacian for second derivatives.
- Canny edge detection: smooth, gradient, non-maximum suppression, hysteresis.
- Median filters remove salt-and-pepper noise.
H: Frequency and linear algebra
- 2D FFT: low frequencies hold smooth content, high frequencies edges.
- SVD gives low-rank approximations of images.
- Deconvolution recovers sharp images from blur (Wiener, Richardson–Lucy).
- Total variation methods preserve edges while denoising.
H: Imaging science
- CT reconstruction from projections: Radon transform and filtered back-projection.
- MRI: data in Fourier space (k-space).
- Compressed sensing speeds up MRI.
- Convolutional neural networks for recognition.
X: Apply the horizontal kernel [−1, 0, 1] to the row of pixels [10, 10, 50, 90, 90] at the middle pixel.
> Neighbours of the middle pixel (50) are 10 and 90
> Response = −1 × 10 + 0 × 50 + 1 × 90
> = 80: a large gradient, marking an edge
K: Images are processed with convolution kernels for blur and edges; Fourier and SVD methods analyse structure; deconvolution and TV methods restore images; CT and MRI rely on transform mathematics.
!: Using linear smoothing on salt-and-pepper noise, which smears outliers instead of removing them.
Q: Which transform underlies CT reconstruction? | The Radon transform.
Q: Which filter removes salt-and-pepper noise well? | A median filter.
SUM: Images are mathematical functions.
SUM: Kernels, transforms and optimisation process them.
SRC: Gonzalez RC, Woods RE, Digital Image Processing (4th edn, Pearson 2018) | textbook | 2018 | https://www.pearson.com/
SRC: Rudin LI, Osher S, Fatemi E, Nonlinear total variation based noise removal algorithms, Physica D 60(1–4), 259 | journal | 1992 | https://doi.org/10.1016/0167-2789(92)90242-F
NUM1#maths-u23-23-q1@1: A 3 × 3 box blur averages 9 pixels. What value does it give if the neighbourhood sums to 1350? | 150 | 0 |  | 1350/9 = 150.
M1#maths-u23-23-q2@1: Which operation is used to find edges in an image? | Convolving with gradient kernels such as Sobel | Taking the mean of all the pixels | Increasing the image's brightness | Rotating the image by 90 degrees | Adding random noise to the image | Edges are where intensity changes quickly, so gradient magnitude is large.
M3#maths-u23-23-q3@2: Why does total variation denoising preserve edges better than Gaussian blurring? | Its penalty on the L1 norm of the gradient allows sharp jumps while flattening small noisy variations | It blurs everything equally, so edges keep their relative contrast | It ignores the gradient and works only with pixel intensities | It increases noise near edges, which makes them look sharper | It doesn't preserve edges; TV denoising blurs them like a Gaussian | Quadratic smoothing penalises jumps heavily, whereas TV tolerates them.

## Statistical Signal Processing
S: Statistical signal processing treats signals and noise as random processes and uses probability to estimate parameters and detect signals. Its tools, from maximum likelihood to Neyman–Pearson detection, power radar, communications, sonar and medical devices.
O: Formulate estimation and detection problems with noise models
O: Apply likelihood ratio tests and analyse detection trade-offs
T: Neyman–Pearson lemma | For a fixed false-alarm probability, the likelihood ratio test maximises the probability of detection
T: Receiver operating characteristic | ROC, a curve of detection probability against false-alarm probability as the threshold varies
H: Estimation
- Model: x[n] = s[n; θ] + w[n] with noise w.
- Maximum likelihood and least squares estimators.
- Cramér–Rao bound on estimator variance.
- Bayesian (MMSE, MAP) estimators with priors.
H: Detection
- Hypotheses H₀ (noise only) and H₁ (signal present).
- Likelihood ratio Λ(x) = p(x | H₁)/p(x | H₀) compared with a threshold.
- Trade-off between false alarms and missed detections.
- Detection improves with signal-to-noise ratio and integration time.
H: Applications
- Radar target detection (CFAR detectors).
- Digital communications (symbol detection, error rates).
- Sonar and seismology.
- Biomedical signals (arrhythmia detection).
X: A known DC level A is observed in N = 100 samples of white Gaussian noise with variance 4. Find the variance of the sample mean estimator and the CRLB.
> Sample mean variance = σ^{2}/N = 4/100 = 0.04
> The CRLB for A is also σ^{2}/N = 0.04
> So the sample mean is efficient
K: Statistical signal processing models signals in noise; ML and Bayesian estimators target the CRLB; the Neyman–Pearson likelihood ratio test is optimal for detection; ROC curves show trade-offs.
!: Choosing a detection threshold without considering the false-alarm rate it implies.
Q: What does the Neyman–Pearson lemma say? | The likelihood ratio test maximises detection probability for a given false-alarm rate.
Q: What does an ROC curve plot? | Detection probability against false-alarm probability.
SUM: Signals and noise as random processes.
SUM: Likelihood ratios detect optimally.
SRC: Kay SM, Fundamentals of Statistical Signal Processing, Volume I: Estimation Theory (Prentice Hall 1993) | textbook | 1993 | https://www.pearson.com/
SRC: Kay SM, Fundamentals of Statistical Signal Processing, Volume II: Detection Theory (Prentice Hall 1998) | textbook | 1998 | https://www.pearson.com/
NUM1#maths-u23-24-q1@1: White noise has variance 9. How many samples N make the sample-mean variance of a DC level equal to 0.01? | 900 | 0 | samples | σ^{2}/N = 0.01 gives N = 9/0.01 = 900.
M1#maths-u23-24-q2@1: Raising a detector's threshold has what effect? | Fewer false alarms but more missed detections | More false alarms and fewer misses | Fewer of both | More of both | No effect | A higher threshold rejects more noise but also more weak signals.
M2#maths-u23-24-q3@2: Why does integrating (averaging) a signal over more samples improve detection? | Signal adds coherently while independent noise averages down, raising the SNR | Noise grows faster than signal when samples are averaged together | It reduces the signal level, so weak signals become harder to see | It increases false alarms, since more samples mean more noise peaks | It doesn't help; detection depends only on a single sample | Averaging N samples cuts noise variance by N while keeping the signal level.
`;
