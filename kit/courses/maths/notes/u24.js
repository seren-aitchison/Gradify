// School 24: Mathematics for Machine Learning and AI. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Foundations, probabilistic models, classical methods, deep learning, and learning to act and explain.
export default `
## Mathematics for Machine Learning
S: Machine learning builds models that improve from data, and it rests on four mathematical pillars: linear algebra, calculus, probability and optimisation. Understanding them explains why algorithms work, when they fail and how to improve them.
O: Identify the mathematics behind common machine learning tasks
O: Formulate learning as minimising a loss over model parameters
T: Empirical risk | (1/n) Σ L(f(xᵢ), yᵢ), the average loss of model f on the training data
T: Generalisation | How well a model performs on new data drawn from the same distribution as the training data
H: The four pillars
- Linear algebra: data as matrices, models as linear maps, eigen and singular value decompositions.
- Calculus: gradients and the chain rule for training.
- Probability and statistics: uncertainty, likelihood, Bayesian inference.
- Optimisation: minimising losses, often by gradient descent.
H: The learning problem
- Supervised (labelled data), unsupervised (structure) and reinforcement learning (rewards).
- Choose a model class, a loss and an optimiser.
- Minimise empirical risk, plus regularisation to control complexity.
H: Generalisation
- Training error underestimates test error.
- Bias–variance trade-off.
- Validation sets and cross-validation.
- Distribution shift breaks the i.i.d. assumption.
X: A model predicts 3, 5 and 7 for targets 2, 5 and 9. Find the mean squared error.
> Errors: 1, 0 and −2
> Squares: 1, 0 and 4
> MSE = 5/3 ≈ 1.67
K: ML combines linear algebra, calculus, probability and optimisation; learning minimises empirical risk with regularisation; generalisation to new data is the real goal.
!: Judging a model by its training error alone.
Q: What is empirical risk? | The average loss on the training data.
Q: Name the three main types of machine learning. | Supervised, unsupervised and reinforcement learning.
SUM: Four branches of maths underpin ML.
SUM: Generalisation is the goal.
SRC: Deisenroth MP, Faisal AA, Ong CS, Mathematics for Machine Learning (Cambridge University Press 2020) | textbook | 2020 | https://mml-book.github.io/
SRC: Hastie T, Tibshirani R, Friedman J, The Elements of Statistical Learning (2nd edn, Springer 2009) | textbook | 2009 | https://hastie.su.domains/ElemStatLearn/
NUM1#maths-u24-01-q1@1: Predictions are 10 and 14 for targets 12 and 13. What is the mean absolute error? | 1.5 | 0.001 |  | Absolute errors are 2 and 1, so the mean is 1.5.
M1#maths-u24-01-q2@1: Which branch of mathematics provides gradients for training models? | Calculus | Number theory | Topology | Combinatorics | Logic | Gradients come from differentiation via the chain rule.
M2#maths-u24-01-q3@2: Why is training error usually lower than test error? | The model's parameters were chosen to fit the training data, including some of its noise | Test data are always harder by design, with noisier labels than training data | Training sets are always larger, which mechanically lowers the measured error | Test error is computed with a different, stricter formula than training error | It is always higher, because training error includes a regularisation penalty | Optimising on a sample tailors the model to that sample.

## Statistical Learning Theory
S: Statistical learning theory asks when and why learning from finite data works. It bounds the gap between training and test error using the complexity of the model class, through ideas such as VC dimension, PAC learning and the bias–variance decomposition.
O: Explain the bias–variance decomposition and overfitting
O: Describe VC dimension and PAC generalisation bounds
T: VC dimension | The largest number of points a model class can label in every possible way (shatter)
T: PAC learning | Probably Approximately Correct: with probability at least 1 − δ, the learned model has error at most ε, given enough samples
H: Bias and variance
- Expected squared error = bias^{2} + variance + irreducible noise.
- Simple models: high bias, low variance. Complex models: low bias, high variance.
- Regularisation, more data and ensembles reduce variance.
H: Complexity and bounds
- Linear classifiers in d dimensions have VC dimension d + 1.
- With probability 1 − δ, test error ≤ training error + O(√((VC log n + log(1/δ))/n)).
- Rademacher complexity gives data-dependent bounds.
- No free lunch: no learner is best for all problems.
H: Modern puzzles
- Deep networks have huge capacity yet generalise.
- Double descent: test error can fall again past the interpolation threshold.
- Implicit regularisation by optimisers.
- Bounds are often loose but explain trends.
X: How many points can a straight line in the plane shatter?
> Any 3 points not on a line can be split in all 2^{3} = 8 ways by a line
> No set of 4 points can be split in all 16 ways (the XOR pattern fails)
> So the VC dimension of lines in ℝ^{2} is 3
K: Learning theory bounds generalisation by model complexity; bias–variance explains over- and under-fitting; VC dimension and PAC bounds formalise sample needs; deep learning raises open questions.
!: Assuming more parameters always means worse generalisation.
Q: What is the VC dimension of linear classifiers in d dimensions? | d + 1.
Q: What three parts make up expected squared error? | Bias squared, variance and irreducible noise.
SUM: Complexity controls generalisation.
SUM: Bias and variance trade off.
SRC: Vapnik VN, Statistical Learning Theory (Wiley 1998) | textbook | 1998 | https://www.wiley.com/
SRC: Shalev-Shwartz S, Ben-David S, Understanding Machine Learning: From Theory to Algorithms (Cambridge University Press 2014) | textbook | 2014 | https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/
NUM1#maths-u24-02-q1@1: A model's expected squared error has bias^{2} = 0.04, variance 0.09 and noise variance 0.25. What is the expected squared error? | 0.38 | 0.001 |  | 0.04 + 0.09 + 0.25 = 0.38.
M1#maths-u24-02-q2@1: Which change usually reduces a model's variance? | Adding regularisation | Adding many more parameters | Training on less data | Removing all constraints | Increasing polynomial degree | Regularisation restricts flexibility, reducing sensitivity to the training sample.
M3#maths-u24-02-q3@2: Why can't any set of 4 points in the plane be shattered by straight lines? | Some labelling, such as the XOR pattern, always needs a non-linear boundary | Lines can only ever label two points correctly, whatever their arrangement | Any four points in the plane always lie on a single straight line | Lines can shatter any number of points if they're placed carefully | They can be shattered; the VC dimension of lines in the plane is 4 | Radon's theorem guarantees a partition of 4 points that no line separates.

## Linear Models
S: Linear models predict outputs as weighted sums of inputs. Linear and logistic regression are fast, interpretable and surprisingly powerful, and ridge and lasso regularisation make them work even with many correlated features.
O: Fit linear regression by least squares and interpret coefficients
O: Use logistic regression and ridge and lasso regularisation
T: Logistic regression | P(y = 1 | x) = σ(wᵀx + b) with sigmoid σ(z) = 1/(1 + e^{−z}), fitted by maximising likelihood
T: Lasso | Least squares with an L1 penalty λΣ|wⱼ|, which sets some coefficients exactly to zero
H: Linear regression
- Minimise ‖y − Xw‖^{2}: w = (XᵀX)^{−1}Xᵀy (normal equations).
- Probabilistic view: Gaussian noise gives least squares as maximum likelihood.
- Features can be non-linear transforms (polynomials, splines).
H: Regularisation
- Ridge (L2): w = (XᵀX + λI)^{−1}Xᵀy, shrinks coefficients, handles collinearity.
- Lasso (L1): sparse solutions, feature selection.
- Elastic net combines both.
- λ chosen by cross-validation.
H: Classification
- Logistic regression: log-odds linear in x; cross-entropy loss.
- Decision boundary wᵀx + b = 0 is a hyperplane.
- Coefficients: e^{w} is an odds ratio.
- Softmax regression for many classes.
X: A logistic model has w = 2 and b = −4. Find P(y = 1) at x = 3.
> z = 2 × 3 − 4 = 2
> σ(2) = 1/(1 + e^{−2}) = 1/(1 + 0.135)
> ≈ 0.881
P: **Investigate with the lab.** Add points and watch the least-squares line, which minimises the sum of squared residuals, update with each point.
IX: regression
K: Linear regression minimises squared error via the normal equations; ridge and lasso regularise; logistic regression models probabilities through the sigmoid; coefficients are interpretable.
!: Using linear regression for a binary outcome, which can predict probabilities outside [0, 1].
Q: Which penalty produces sparse coefficients? | The L1 (lasso) penalty.
Q: What does e^{w} mean in logistic regression? | The odds ratio for a one-unit increase in x.
SUM: Weighted sums make strong baselines.
SUM: Regularisation controls complexity.
SRC: Tibshirani R, Regression shrinkage and selection via the lasso, Journal of the Royal Statistical Society B 58(1), 267 | journal | 1996 | https://doi.org/10.1111/j.2517-6161.1996.tb02080.x
SRC: James G, Witten D, Hastie T, Tibshirani R, An Introduction to Statistical Learning (2nd edn, Springer 2021) | textbook | 2021 | https://www.statlearning.com/
NUM1#maths-u24-03-q1@1: What is σ(0) for the sigmoid function? | 0.5 | 0 |  | 1/(1 + e^{0}) = 1/2.
M1#maths-u24-03-q2@1: A logistic coefficient is w = ln 3. What happens to the odds when x rises by 1? | They triple | They rise by 3 percentage points | They halve | They stay the same | They rise by ln 3 | In logistic regression the odds ratio for a one-unit rise in x is e^{w} = e^{ln 3} = 3, so the odds triple.
M2#maths-u24-03-q3@2: Why does ridge regression help when features are highly correlated? | Adding λI makes XᵀX + λI well conditioned, stabilising coefficient estimates | It removes the correlated features from the model before fitting | It increases the variance of the coefficients to explore more values | It ignores the data and shrinks every coefficient exactly to zero | It doesn't help; ridge only matters when features are independent | Near-singular XᵀX makes ordinary least squares unstable.
M2#maths-u24-03-q4@2: What does ordinary least squares minimise? | The sum of squared vertical residuals | The sum of absolute x-values | The number of points off the line | The correlation coefficient | The largest residual only | OLS chooses coefficients minimising Σ(yᵢ − ŷᵢ)^{2}.

## Optimisation Algorithms
S: Training a machine learning model means minimising a loss function, often with millions of parameters. First-order methods such as gradient descent with momentum and Adam dominate because they scale, while second-order and coordinate methods suit smaller or structured problems.
O: Describe gradient descent, momentum and adaptive methods
O: Explain learning-rate schedules and convergence behaviour
T: Momentum | v ← βv + ∇L, w ← w − ηv: accumulating past gradients to speed progress along consistent directions
T: Adam | An adaptive method combining momentum with per-parameter step sizes from running averages of squared gradients
H: First-order methods
- Gradient descent: w ← w − η∇L.
- Momentum and Nesterov acceleration damp oscillations.
- AdaGrad, RMSProp and Adam adapt step sizes per parameter.
- AdamW decouples weight decay.
H: Learning rates
- Too large: divergence; too small: slow training.
- Schedules: step decay, cosine annealing, warm-up.
- Learning-rate range tests to choose η.
H: Other methods
- Coordinate descent for lasso.
- L-BFGS for smooth, moderate-sized problems.
- Second-order approximations (K-FAC, Shampoo).
- Convexity guarantees global optima; neural losses are non-convex.
X: With momentum β = 0.9 and η = 0.1, a constant gradient of 1 is applied for three steps from v = 0. Find v after three steps.
> v₁ = 0.9 × 0 + 1 = 1
> v₂ = 0.9 × 1 + 1 = 1.9
> v₃ = 0.9 × 1.9 + 1 = 2.71: momentum builds up, approaching 1/(1 − 0.9) = 10
P: **Investigate with the lab.** Compare several learning rates on the narrow valley: too small is slow, too large zigzags or diverges, and a well-chosen rate converges smoothly.
IX: descent
K: ML training uses gradient-based optimisers; momentum accelerates; Adam adapts step sizes; learning-rate schedules matter greatly; second-order methods help in some settings.
!: Keeping a fixed large learning rate throughout training, which prevents fine convergence.
Q: What does Adam combine? | Momentum and adaptive per-parameter step sizes.
Q: What is learning-rate warm-up? | Starting with a small learning rate and increasing it over early steps.
SUM: Optimisers drive training.
SUM: Learning rates matter most.
SRC: Kingma DP, Ba J, Adam: a method for stochastic optimization, arXiv:1412.6980 | journal | 2014 | https://arxiv.org/abs/1412.6980
SRC: Bottou L, Curtis FE, Nocedal J, Optimization methods for large-scale machine learning, SIAM Review 60(2), 223 | journal | 2018 | https://doi.org/10.1137/16M1080173
NUM1#maths-u24-04-q1@1: With momentum β = 0.9 and a constant gradient g, what multiple of g does the velocity approach? | 10 | 0 |  | The steady state v = βv + g gives v = g/(1 − β) = 10g.
M1#maths-u24-04-q2@1: Which optimiser adapts a separate step size for each parameter? | Adam | Plain gradient descent | Newton's method with fixed steps | Bisection | Simulated annealing | Adam scales steps by running estimates of squared gradients.
M2#maths-u24-04-q3@2: Why is cosine annealing of the learning rate helpful near the end of training? | Smaller steps let the optimiser settle into a minimum instead of bouncing around it | Larger steps near the end always help the optimiser escape bad regions | It removes the need to compute gradients in the final epochs of training | It increases the training loss deliberately to prevent overfitting | It isn't helpful; a constant learning rate always converges faster | Decaying η reduces noise-driven oscillation as training converges.
M2#maths-u24-04-q4@2: What does the narrow valley in the lab show about choosing a learning rate? | One fixed rate must suit both the steep and the shallow directions, which forces a compromise | Any rate works equally well | Larger rates are always better | The learning rate doesn't matter | Only negative rates converge | Ill-conditioning is why adaptive methods like Adam rescale each direction.

## Stochastic Gradient Descent
S: Stochastic gradient descent updates a model using the gradient on a small random batch of data rather than the whole dataset. Each step is noisy but cheap, so SGD scales to billions of examples, and its noise can even help find solutions that generalise well.
O: Explain mini-batch gradients and their unbiasedness
O: Describe how batch size and learning rate affect SGD
T: Mini-batch gradient | (1/B) Σ_{i∈batch} ∇Lᵢ(w), an unbiased estimate of the full gradient from B random examples
T: Epoch | One full pass through the training data
H: The algorithm
- Shuffle data; for each batch, compute the gradient and step.
- Gradient noise variance falls like 1/B.
- Converges for decreasing learning rates (Robbins–Monro conditions).
H: Batch size and learning rate
- Larger batches: smoother gradients, better hardware use.
- Linear scaling rule: increase η with batch size (with warm-up).
- Very large batches can generalise worse.
- Gradient accumulation simulates big batches.
H: Why it works well
- Cheap steps make rapid early progress.
- Noise helps escape saddle points.
- Implicit bias towards flat minima (a debated explanation of generalisation).
- Variants: SGD with momentum, Adam.
X: A dataset has 50,000 examples and batch size 100. How many SGD steps are in one epoch, and how does gradient noise compare with batch size 25?
> Steps per epoch = 50,000/100 = 500
> Noise variance scales like 1/B
> Batch 100 has a quarter of the gradient variance of batch 25
P: **Investigate with the lab.** Use different learning rates and compare runs. SGD adds noise to each step, but the same learning-rate trade-off between speed and stability applies.
IX: descent
K: SGD uses unbiased mini-batch gradients; noise falls with batch size; batch size and learning rate interact; SGD scales to huge datasets and its noise can aid generalisation.
!: Forgetting to shuffle data between epochs, which can bias the gradient sequence.
Q: Is the mini-batch gradient an unbiased estimate of the full gradient? | Yes, for uniformly sampled batches.
Q: What is an epoch? | One pass through the whole training set.
SUM: Small random batches, many steps.
SUM: Noise can help.
SRC: Robbins H, Monro S, A stochastic approximation method, Annals of Mathematical Statistics 22(3), 400 | journal | 1951 | https://doi.org/10.1214/aoms/1177729586
SRC: Goyal P et al., Accurate, large minibatch SGD: training ImageNet in 1 hour, arXiv:1706.02677 | journal | 2017 | https://arxiv.org/abs/1706.02677
NUM1#maths-u24-05-q1@1: Training uses 1,200,000 images with batch size 256 for 90 epochs. How many steps is that, to the nearest whole number? | 421875 | 1 | steps | 1,200,000/256 = 4687.5 steps per epoch; × 90 = 421,875.
M1#maths-u24-05-q2@1: How does gradient noise variance change if the batch size quadruples? | It falls to a quarter | It quadruples | It doubles | It halves | It stays the same | Averaging B independent gradients divides variance by B.
M3#maths-u24-05-q3@2: Why can SGD's gradient noise help training of neural networks? | It perturbs the parameters out of saddle points and sharp minima, favouring flatter solutions | Noise always makes training fail unless the batch is the full dataset | It makes the loss landscape convex, so any minimum found is global | It removes the need for a learning rate, since noise sets the step size | It never helps; exact full-batch gradients always generalise better | Exact gradients can stall at saddles that stochastic steps escape.
M2#maths-u24-05-q4@2: In SGD, what does a smaller learning rate usually trade for stability? | Slower progress per step | Larger gradient noise | Divergence | Lower accuracy at convergence | Nothing | Smaller steps are more stable but need more iterations.

## Backpropagation Mathematics
S: Backpropagation computes the gradient of a neural network's loss with respect to every weight by applying the chain rule backwards through the network. It's reverse-mode automatic differentiation, costing about as much as one forward pass.
O: Derive gradients for a small network using the chain rule
O: Explain vanishing and exploding gradients
T: Backpropagation | Computing ∂L/∂w for all weights by propagating error signals δ backwards layer by layer
T: Vanishing gradient | Gradients shrinking exponentially through many layers, slowing learning in early layers
H: The chain rule in networks
- Layer: a = Wx + b, h = φ(a).
- Output error δ_{L} = ∂L/∂a_{L}.
- Backward: δ_{l} = (W_{l+1}ᵀδ_{l+1}) ⊙ φ′(a_{l}).
- Weight gradient ∂L/∂W_{l} = δ_{l}h_{l−1}ᵀ.
H: Cost and implementation
- One forward and one backward pass: a small constant times forward cost.
- Stores activations (memory cost); checkpointing trades compute for memory.
- Frameworks (PyTorch, JAX) build computation graphs automatically.
- Rumelhart, Hinton and Williams (1986) popularised it.
H: Gradient problems
- Sigmoid derivatives ≤ 0.25 cause vanishing gradients in deep stacks.
- ReLU, residual connections and normalisation help.
- Exploding gradients: gradient clipping.
- Careful initialisation (Xavier, He).
X: For L = (wx − y)^{2} with w = 2, x = 3, y = 5, find ∂L/∂w.
> Prediction wx = 6; error 6 − 5 = 1
> ∂L/∂w = 2(wx − y) × x
> = 2 × 1 × 3 = 6
K: Backpropagation applies the chain rule backwards to get all weight gradients in one pass; it's reverse-mode AD; deep networks suffer vanishing or exploding gradients, eased by ReLU, residuals, normalisation and initialisation.
!: Using sigmoid activations in very deep networks without residual connections or normalisation.
Q: What is the maximum derivative of the sigmoid function? | 0.25.
Q: What does gradient clipping prevent? | Exploding gradients.
SUM: Chain rule backwards through layers.
SUM: Watch for vanishing gradients.
SRC: Rumelhart DE, Hinton GE, Williams RJ, Learning representations by back-propagating errors, Nature 323, 533 | journal | 1986 | https://doi.org/10.1038/323533a0
SRC: Goodfellow I, Bengio Y, Courville A, Deep Learning (MIT Press 2016) | textbook | 2016 | https://www.deeplearningbook.org/
NUM1#maths-u24-06-q1@1: If each of 10 sigmoid layers multiplies the gradient by at most 0.25, what is the largest possible overall factor, in scientific form 10^{−k}? Give k to 1 decimal place. | 6 | 0.1 |  | 0.25^{10} ≈ 9.5 × 10^{−7} ≈ 10^{−6.0}, so gradients can shrink a millionfold.
M1#maths-u24-06-q2@1: For h = ReLU(a), what is ∂h/∂a when a = 3? | 1 | 0 | 3 | 0.25 | −1 | ReLU is the identity for positive inputs, so its derivative there is 1.
M2#maths-u24-06-q3@2: Why do residual connections ease training of very deep networks? | They give gradients an identity path backwards, so they don't shrink through every layer | They remove all non-linearities, making the network a linear model | They make the network shallower by skipping most of its layers entirely | They increase vanishing gradients, which stabilises the early layers | They don't help; residual networks train no better than plain ones | y = x + F(x) has ∂y/∂x = I + ∂F/∂x, preserving gradient flow.

## Probability Models
S: Probability models describe data as generated by random processes with parameters to learn. Choosing a distribution, writing the likelihood and maximising it, or combining it with a prior, is the common thread behind many learning algorithms.
O: Write likelihoods for common distributions and find maximum likelihood estimates
O: Connect losses in machine learning to probabilistic assumptions
T: Likelihood | L(θ) = Π p(xᵢ | θ), the probability of the observed data as a function of the parameters
T: Generative model | A model of the joint distribution p(x, y) or p(x), from which data can be sampled
H: Distributions
- Bernoulli and categorical for labels.
- Gaussian for continuous values; multivariate Gaussian with covariance Σ.
- Poisson for counts; exponential families in general.
- Mixture models for multimodal data.
H: Maximum likelihood
- Maximise log L(θ) = Σ log p(xᵢ | θ).
- Gaussian noise ⇒ squared error loss; Bernoulli ⇒ cross-entropy.
- Laplace noise ⇒ absolute error loss.
- EM algorithm for latent-variable models.
H: Generative versus discriminative
- Generative: model p(x | y)p(y) (naive Bayes).
- Discriminative: model p(y | x) directly (logistic regression).
- Generative models create data (VAEs, diffusion models).
X: Coin tosses give 7 heads in 10. Find the maximum likelihood estimate of p.
> L(p) = p^{7}(1 − p)^{3}
> log L = 7 log p + 3 log(1 − p); derivative 7/p − 3/(1 − p) = 0
> p̂ = 0.7
K: Probability models specify data-generating distributions; maximum likelihood fits them; common losses correspond to noise assumptions; generative models capture p(x) and can sample new data.
!: Using squared error for heavy-tailed noise, where absolute error (Laplace) is more robust.
Q: Which loss corresponds to Gaussian noise? | Squared error.
Q: What does a generative model describe? | The distribution of the data itself, p(x) or p(x, y).
SUM: Models generate data randomly.
SUM: Losses reflect noise assumptions.
SRC: Murphy KP, Probabilistic Machine Learning: An Introduction (MIT Press 2022) | textbook | 2022 | https://probml.github.io/pml-book/
SRC: Bishop CM, Pattern Recognition and Machine Learning (Springer 2006) | textbook | 2006 | https://link.springer.com/
NUM1#maths-u24-07-q1@1: Counts 2, 4, 3, 5 and 6 are modelled as Poisson. What is the maximum likelihood estimate of λ? | 4 | 0 |  | The Poisson MLE is the sample mean: 20/5 = 4.
M1#maths-u24-07-q2@1: Which noise assumption makes mean absolute error the maximum likelihood loss? | Laplace (double exponential) noise | Gaussian (normal) noise | Uniform noise on an interval | Poisson count noise | No noise at all | The Laplace log-density is −|error|/b plus a constant.
M2#maths-u24-07-q3@2: What distinguishes a discriminative model from a generative one? | It models p(y | x) directly rather than how the inputs themselves are distributed | It always performs worse | It models only p(x) | It can generate new inputs | There's no difference | Logistic regression is discriminative; naive Bayes is generative.

## Bayesian Learning
S: Bayesian learning treats model parameters as uncertain, updating a prior distribution with data to get a posterior. It gives principled uncertainty, natural regularisation and model comparison, at the cost of computing or approximating posteriors.
O: Apply Bayes' theorem to update beliefs about parameters
O: Describe conjugate priors, MAP estimation and approximate inference
T: Posterior | p(θ | D) ∝ p(D | θ)p(θ): the prior updated by the likelihood of the data
T: Conjugate prior | A prior that gives a posterior in the same family, such as Beta for Bernoulli data
H: Updating
- Beta(a, b) prior + k heads in n tosses ⇒ Beta(a + k, b + n − k) posterior.
- Posterior mean blends prior and data.
- More data swamps the prior.
H: Point estimates and prediction
- MAP: maximise the posterior; a Gaussian prior gives ridge regression.
- Posterior predictive integrates over θ, giving honest uncertainty.
- Marginal likelihood p(D) compares models (Bayes factors).
H: Computing posteriors
- MCMC (Metropolis–Hastings, Hamiltonian Monte Carlo).
- Variational inference: fit a simpler distribution by minimising KL.
- Laplace approximation.
- Bayesian neural networks and deep ensembles.
X: A Beta(2, 2) prior is updated with 8 heads in 10 tosses. Find the posterior and its mean.
> Posterior Beta(2 + 8, 2 + 2) = Beta(10, 4)
> Mean = 10/(10 + 4)
> ≈ 0.714, between the prior mean 0.5 and the data 0.8
K: Bayesian learning updates priors to posteriors; conjugate priors give closed forms; MAP links priors to regularisation; MCMC and variational inference approximate posteriors.
!: Choosing a very strong prior without justification and letting it dominate the data.
Q: What is the posterior for a Beta(a, b) prior after k successes in n trials? | Beta(a + k, b + n − k).
Q: What prior makes MAP estimation equal to ridge regression? | A zero-mean Gaussian prior on the weights.
SUM: Update beliefs with data.
SUM: Uncertainty comes built in.
SRC: Gelman A et al., Bayesian Data Analysis (3rd edn, CRC Press 2013) | textbook | 2013 | https://sites.stat.columbia.edu/gelman/book/
SRC: Blei DM, Kucukelbir A, McAuliffe JD, Variational inference: a review for statisticians, Journal of the American Statistical Association 112(518), 859 | journal | 2017 | https://doi.org/10.1080/01621459.2017.1285773
NUM1#maths-u24-08-q1@1: A Beta(1, 1) prior is updated with 3 successes in 4 trials. What is the posterior mean? | 0.667 | 0.001 |  | Posterior Beta(4, 2) has mean 4/6 ≈ 0.667.
M1#maths-u24-08-q2@1: Which method samples from posterior distributions? | Markov chain Monte Carlo | Gradient descent on the loss | The simplex method | k-means clustering | Principal component analysis | MCMC builds a Markov chain whose stationary distribution is the posterior.
M2#maths-u24-08-q3@2: Why does the influence of the prior fade as data accumulate? | The likelihood grows sharper with more data, dominating the fixed prior | Priors are deleted after the first update, so only data remain | The posterior ignores the data and keeps only the prior | Priors become stronger as more data are collected | It doesn't fade; the prior always dominates the posterior | Log-likelihood grows with n while the log-prior stays fixed.

## Bayesian Networks
S: A Bayesian network represents a joint probability distribution with a directed acyclic graph, where each variable depends only on its parents. It makes large distributions compact, supports reasoning under uncertainty and encodes conditional independences visibly.
O: Factorise joint distributions using a Bayesian network
O: Read conditional independences with d-separation and perform simple inference
T: Directed acyclic graph | A graph with directed edges and no cycles, used to show which variables influence which
T: d-separation | A graphical criterion that tells whether two sets of variables are conditionally independent given a third
H: Factorisation
- p(x₁, …, xₙ) = Π p(xᵢ | parents(xᵢ)).
- Far fewer parameters than a full table.
- Example: Burglary → Alarm ← Earthquake; Alarm → Calls.
H: Independence
- Chains A → B → C and forks A ← B → C: A ⊥ C given B.
- Colliders A → B ← C: A and C independent, but dependent given B (explaining away).
- d-separation generalises these.
H: Inference and learning
- Exact inference: variable elimination, junction trees (NP-hard in general).
- Approximate: sampling, belief propagation.
- Structure learning from data.
- Causal Bayesian networks support interventions (Pearl).
X: Rain (R) and Sprinkler (S) both cause Wet grass (W). P(R) = 0.2, P(S) = 0.4, independent. Are R and S independent once you know W?
> R → W ← S is a collider
> Unconditionally R and S are independent
> Given W, they become dependent: learning it rained "explains away" the sprinkler
K: Bayesian networks factorise joints by parents in a DAG; d-separation reads independences; colliders create explaining away; inference is exact for small graphs and approximate otherwise.
!: Assuming two causes stay independent after conditioning on their common effect.
Q: How does a Bayesian network factorise the joint distribution? | As the product of each variable given its parents.
Q: What is explaining away? | Two independent causes becoming dependent once their common effect is observed.
SUM: Graphs encode dependence.
SUM: Colliders behave differently.
SRC: Pearl J, Probabilistic Reasoning in Intelligent Systems (Morgan Kaufmann 1988) | textbook | 1988 | https://www.elsevier.com/
SRC: Koller D, Friedman N, Probabilistic Graphical Models: Principles and Techniques (MIT Press 2009) | textbook | 2009 | https://mitpress.mit.edu/
NUM1#maths-u24-09-q1@1: Five binary variables form a chain A → B → C → D → E. How many free parameters does the network need? | 9 | 0 | parameters | A needs 1; each of the other four needs 2 (one per parent value): 1 + 4 × 2 = 9, versus 31 for a full table.
M1#maths-u24-09-q2@1: In the chain A → B → C, which statement holds? | A and C are independent given B | A and C are always independent | B and C are independent | A causes nothing | A and C are dependent given B | Conditioning on the middle of a chain blocks the path.
M3#maths-u24-09-q3@2: Why does observing a common effect make its two independent causes dependent? | Learning one cause occurred lowers the need for the other to explain the effect | Observing effects always makes variables independent | Causes become identical | The graph gains a new edge | It doesn't | In a collider, conditioning on the child opens the path between the parents.

## Probabilistic Graphical Models
S: Probabilistic graphical models use graphs to represent dependencies among many random variables. Directed models (Bayesian networks) and undirected models (Markov random fields) unify methods from image segmentation to error-correcting codes.
O: Compare directed and undirected graphical models
O: Describe factor graphs, belief propagation and the Hammersley–Clifford theorem
T: Markov random field | An undirected graphical model where the joint distribution factorises over cliques: p(x) = (1/Z) Π ψ_{C}(x_{C})
T: Belief propagation | A message-passing algorithm computing marginals exactly on trees and approximately on graphs with loops
H: Undirected models
- Potentials ψ on cliques; normalising constant Z (the partition function).
- Markov property: a node is independent of the rest given its neighbours.
- Hammersley–Clifford: positive distributions with the Markov property factorise over cliques.
- Ising model and conditional random fields.
H: Factor graphs and inference
- Bipartite graphs of variables and factors.
- Sum-product algorithm for marginals; max-product for MAP.
- Loopy belief propagation decodes LDPC and turbo codes.
- Variational methods (mean field).
H: Uses
- Image denoising and segmentation.
- Speech and sequence labelling (CRFs).
- Computational biology.
- Combining with deep learning (structured prediction).
X: In an undirected chain A − B − C, write the factorisation and one conditional independence.
> Cliques are {A, B} and {B, C}
> p(a, b, c) = (1/Z) ψ₁(a, b)ψ₂(b, c)
> A ⊥ C given B, since B separates them
K: Graphical models encode dependence via directed or undirected graphs; MRFs factorise over cliques with a partition function; belief propagation computes marginals on trees and approximately on loopy graphs.
!: Treating undirected potentials as probabilities without normalising by Z.
Q: What does the Hammersley–Clifford theorem state? | Positive distributions satisfying the Markov property factorise over cliques.
Q: Where is belief propagation exact? | On tree-structured graphs.
SUM: Graphs represent dependence.
SUM: Message passing computes marginals.
SRC: Koller D, Friedman N, Probabilistic Graphical Models: Principles and Techniques (MIT Press 2009) | textbook | 2009 | https://mitpress.mit.edu/
SRC: Kschischang FR, Frey BJ, Loeliger HA, Factor graphs and the sum-product algorithm, IEEE Transactions on Information Theory 47(2), 498 | journal | 2001 | https://doi.org/10.1109/18.910572
NUM1#maths-u24-10-q1@1: Unnormalised potentials over two binary variables give scores 1, 2, 3 and 4. What is the probability of the configuration scoring 4? | 0.4 | 0.001 |  | Z = 1 + 2 + 3 + 4 = 10, so p = 4/10 = 0.4.
M1#maths-u24-10-q2@1: Which statement about Markov random fields is true? | A node is independent of all others given its neighbours | Edges have directions | They can't have cycles | They need no normalisation | Every node depends on every other given its neighbours | The local Markov property holds with the neighbourhood as a blanket.
M2#maths-u24-10-q3@2: Why is computing the partition function Z often hard? | It sums over exponentially many configurations of all variables | Z is always equal to 1, so it never needs computing | It needs only the single most likely configuration | It's computed by sorting the variables by their values | It's never hard, even for very large graphs | Z sums the unnormalised scores over every joint configuration, and 100 binary variables already give 2^{100} terms.

## Markov Models
S: Markov models assume the future depends on the present but not the past beyond it. Markov chains model text, weather and web browsing; their stationary distributions underpin PageRank and MCMC; and hidden Markov models add unobserved states.
O: Use transition matrices and find stationary distributions
O: Apply Markov chains to PageRank, language models and MCMC
T: Stationary distribution | A distribution π with πP = π, unchanged by one step of the chain
T: Ergodic chain | An irreducible, aperiodic chain that converges to a unique stationary distribution from any start
H: Markov chains
- Transition matrix P with rows summing to 1.
- n-step probabilities from Pⁿ.
- Stationary π solves πP = π, Σπᵢ = 1.
- Mixing time: how quickly the chain approaches π.
H: Applications
- PageRank: stationary distribution of a random surfer with teleportation.
- n-gram language models: next word depends on the previous n − 1.
- MCMC: design chains whose stationary distribution is the target.
- Queueing and reliability models.
H: Extensions
- Hidden Markov models (latent states).
- Continuous-time Markov chains.
- Markov decision processes add actions and rewards.
- Higher-order Markov models.
X: A two-state chain has P = [[0.9, 0.1], [0.5, 0.5]]. Find its stationary distribution.
> Balance: π₁ × 0.1 = π₂ × 0.5, so π₁ = 5π₂
> π₁ + π₂ = 1 gives π₂ = 1/6
> π = (5/6, 1/6)
K: Markov chains move by transition matrices; ergodic chains converge to a unique stationary distribution; PageRank, n-gram models and MCMC rely on them; extensions add hidden states or actions.
!: Assuming every Markov chain converges to a unique distribution (periodic or reducible ones may not).
Q: What equation defines a stationary distribution? | πP = π.
Q: What is PageRank? | The stationary distribution of a random web surfer.
SUM: The future depends only on the present.
SUM: Stationary distributions describe the long run.
SRC: Norris JR, Markov Chains (Cambridge University Press 1997) | textbook | 1997 | https://www.cambridge.org/
SRC: Brin S, Page L, The anatomy of a large-scale hypertextual web search engine, Computer Networks and ISDN Systems 30(1–7), 107 | journal | 1998 | https://doi.org/10.1016/S0169-7552(98)00110-X
NUM1#maths-u24-11-q1@1: For P = [[0.8, 0.2], [0.4, 0.6]], what is the stationary probability of state 1, to 3 decimal places? | 0.667 | 0.001 |  | 0.2π₁ = 0.4π₂ gives π₁ = 2π₂, so π₁ = 2/3.
M1#maths-u24-11-q2@1: What must each row of a transition matrix sum to? | 1 | 0 | The number of states | Any positive number | −1 | Each row is a probability distribution over next states.
M2#maths-u24-11-q3@2: Why does PageRank include a random "teleportation" step? | It makes the chain irreducible and aperiodic, guaranteeing a unique stationary distribution | It removes all the links between pages, so every page ranks equally | It makes all page ranks exactly equal, which is fairer to small sites | It speeds up how quickly web pages load for the random surfer | It has no mathematical purpose; it was added only for marketing | Dangling pages and disconnected parts would otherwise break convergence.

## Gaussian Processes
S: A Gaussian process is a probability distribution over functions, where any finite set of function values has a joint Gaussian distribution. GP regression gives flexible predictions with built-in uncertainty, ideal for small datasets and Bayesian optimisation.
O: Define Gaussian processes by mean and covariance (kernel) functions
O: Compute GP posterior predictions and interpret uncertainty
T: Gaussian process | f ~ GP(m, k): any finite collection f(x₁), …, f(xₙ) is jointly Gaussian with mean m and covariance kᵢⱼ = k(xᵢ, xⱼ)
T: Squared exponential kernel | k(x, x′) = σ^{2} exp(−‖x − x′‖^{2}/(2ℓ^{2})), with length scale ℓ controlling smoothness
H: Regression
- Posterior mean μ* = k*ᵀ(K + σₙ^{2}I)^{−1}y.
- Posterior variance k** − k*ᵀ(K + σₙ^{2}I)^{−1}k*.
- Uncertainty grows away from data points.
- Hyperparameters fitted by maximising the marginal likelihood.
H: Kernels
- Squared exponential (very smooth), Matérn (rougher), periodic, linear.
- Sums and products build new kernels.
- The kernel encodes assumptions about the function.
H: Practicalities
- Cost O(n^{3}) from inverting K; sparse and inducing-point approximations scale up.
- Classification needs approximations (non-Gaussian likelihood).
- Infinitely wide neural networks behave like GPs.
- Uses: Bayesian optimisation, geostatistics (kriging), surrogate models.
X: For the squared exponential kernel with σ = 1 and ℓ = 1, find k(0, 1) and k(0, 3).
> k(0, 1) = exp(−1/2) ≈ 0.607
> k(0, 3) = exp(−9/2) ≈ 0.011
> Distant points are almost uncorrelated, so predictions far from data revert to the prior
K: GPs define distributions over functions by kernels; posterior mean and variance come in closed form; kernels encode smoothness; cost is O(n^{3}) without approximations.
!: Ignoring the O(n^{3}) cost and applying exact GPs to hundreds of thousands of points.
Q: What does the length scale ℓ control? | How quickly correlation between function values decays with distance.
Q: What is the computational cost of exact GP regression? | O(n^{3}).
SUM: Distributions over functions.
SUM: Uncertainty comes free.
SRC: Rasmussen CE, Williams CKI, Gaussian Processes for Machine Learning (MIT Press 2006) | textbook | 2006 | https://gaussianprocess.org/gpml/
SRC: Matheron G, Principles of geostatistics, Economic Geology 58(8), 1246 | journal | 1963 | https://doi.org/10.2113/gsecongeo.58.8.1246
NUM1#maths-u24-12-q1@1: For a squared exponential kernel with σ^{2} = 1 and ℓ = 2, what is k(0, 2), to 3 decimal places? | 0.607 | 0.001 |  | exp(−4/(2 × 4)) = exp(−0.5) ≈ 0.607.
M1#maths-u24-12-q2@1: Where is a GP's predictive uncertainty largest? | Far from any training points | Exactly at training points | Where the data are densest | At the mean of the inputs | It's the same everywhere | Without nearby observations the posterior reverts to the prior variance.
M3#maths-u24-12-q3@2: Why does choosing a kernel matter so much in GP regression? | The kernel encodes assumptions such as smoothness, periodicity and scale, which shape every prediction | Kernels don't affect GP predictions at all, only the computation time | Any kernel gives the same posterior once there's enough training data | Kernels only change the speed of training, never the predictions | It doesn't matter; GP regression works the same with every kernel | Different kernels define different priors over functions.

## Uncertainty Estimation
S: Machine learning models should know what they don't know. Uncertainty estimation separates noise in the data (aleatoric) from uncertainty in the model (epistemic), and methods such as ensembles, Bayesian approximations and calibration help predictions be trusted.
O: Distinguish aleatoric and epistemic uncertainty
O: Describe ensembles, Monte Carlo dropout and calibration
T: Aleatoric uncertainty | Irreducible noise in the data, such as label ambiguity or measurement error
T: Expected calibration error | ECE, the average gap between predicted confidence and observed accuracy across confidence bins
H: Types
- Aleatoric: remains however much data you collect.
- Epistemic: from limited data or model knowledge; shrinks with more data.
- Out-of-distribution inputs raise epistemic uncertainty.
H: Methods
- Deep ensembles: train several models; spread of predictions measures uncertainty.
- Monte Carlo dropout as approximate Bayesian inference.
- Bayesian neural networks and Laplace approximations.
- Heteroscedastic outputs predict a variance as well as a mean.
H: Calibration
- Modern networks are often over-confident.
- Reliability diagrams compare confidence and accuracy.
- Temperature scaling fixes calibration cheaply.
- Conformal prediction gives guaranteed coverage (next lesson).
X: A classifier predicts 90% confidence on 100 test images and gets 72 right. What is the calibration gap in that bin?
> Average confidence = 0.9
> Accuracy = 0.72
> Gap = 0.18: the model is over-confident
K: Aleatoric uncertainty is data noise; epistemic is model ignorance; ensembles, MC dropout and Bayesian methods estimate it; calibration aligns confidence with accuracy; temperature scaling is a simple fix.
!: Treating a softmax probability as a calibrated measure of confidence without checking.
Q: Which uncertainty shrinks with more data? | Epistemic uncertainty.
Q: What does temperature scaling adjust? | The sharpness of softmax probabilities, to improve calibration.
SUM: Know what the model doesn't know.
SUM: Calibrate confidence.
SRC: Lakshminarayanan B, Pritzel A, Blundell C, Simple and scalable predictive uncertainty estimation using deep ensembles, NeurIPS 30 | journal | 2017 | https://arxiv.org/abs/1612.01474
SRC: Guo C, Pleiss G, Sun Y, Weinberger KQ, On calibration of modern neural networks, ICML 2017 | journal | 2017 | https://arxiv.org/abs/1706.04599
NUM1#maths-u24-13-q1@1: Five ensemble members predict 0.62, 0.58, 0.60, 0.61 and 0.59. What is their mean prediction? | 0.6 | 0.001 |  | (0.62 + 0.58 + 0.60 + 0.61 + 0.59)/5 = 3.0/5 = 0.6; their small spread signals low epistemic uncertainty.
M1#maths-u24-13-q2@1: Which source of uncertainty can't be reduced by collecting more data? | Aleatoric uncertainty from noise in the labels | Epistemic uncertainty about parameters | Uncertainty from a tiny training set | Uncertainty about model weights | Uncertainty about unseen regions | Noise inherent in the data remains whatever the sample size.
M2#maths-u24-13-q3@2: Why do deep ensembles give useful uncertainty estimates? | Independently trained models disagree more on unfamiliar inputs, so their spread reflects epistemic uncertainty | Ensemble members always agree exactly, which proves they're certain | They remove all uncertainty by averaging the members' predictions | They need no training, since members are random initialisations | They don't; ensembles only improve accuracy, never uncertainty | Different random initialisations converge to different solutions away from the data.

## Conformal Prediction
S: Conformal prediction wraps any machine learning model to produce prediction sets or intervals with a guaranteed coverage rate, such as 90%, assuming only that data are exchangeable. It's simple, distribution-free and increasingly used where errors are costly.
O: Construct split conformal prediction intervals
O: Explain the coverage guarantee and its assumptions
T: Nonconformity score | A measure of how unusual an example is under the model, such as |y − ŷ| for regression
T: Marginal coverage | The guarantee P(Y_{new} ∈ C(X_{new})) ≥ 1 − α, averaged over data, not conditional on each x
H: Split conformal method
- Train a model on one part of the data.
- Compute scores on a calibration set of size n.
- Take the ⌈(n + 1)(1 − α)⌉-th smallest score as q̂.
- Interval: ŷ ± q̂ (regression) or classes with score ≤ q̂.
H: Guarantees
- Holds in finite samples for any model and distribution if data are exchangeable.
- Coverage is marginal, not per-subgroup.
- Wider intervals where the model is worse (with adaptive scores).
H: Extensions and limits
- Conformalised quantile regression adapts width.
- Covariate shift needs weighting.
- Time series break exchangeability.
- Vovk, Gammerman and Shafer (2005).
X: Calibration residuals (n = 9) sorted are 1, 2, 2, 3, 4, 5, 6, 8, 10. Find the 80% split conformal interval for a prediction ŷ = 50.
> Rank needed: ⌈(9 + 1) × 0.8⌉ = 8
> The 8th smallest residual is 8
> Interval 50 ± 8 = [42, 58], with at least 80% coverage
K: Conformal prediction calibrates any model to give sets with guaranteed marginal coverage under exchangeability; split conformal uses a calibration quantile; coverage isn't conditional on each input.
!: Claiming conformal intervals cover each individual subgroup at the stated level.
Q: What assumption does conformal prediction need? | Exchangeable data.
Q: Is conformal coverage conditional on each input? | No, it's marginal.
SUM: Wrap any model with guaranteed coverage.
SUM: Exchangeability is the key assumption.
SRC: Vovk V, Gammerman A, Shafer G, Algorithmic Learning in a Random World (Springer 2005) | textbook | 2005 | https://link.springer.com/
SRC: Angelopoulos AN, Bates S, A gentle introduction to conformal prediction and distribution-free uncertainty quantification, arXiv:2107.07511 | review | 2021 | https://arxiv.org/abs/2107.07511
NUM1#maths-u24-14-q1@1: With n = 19 calibration points and α = 0.1, which rank of sorted scores gives q̂? | 18 | 0 |  | ⌈(19 + 1) × 0.9⌉ = ⌈18⌉ = 18.
M1#maths-u24-14-q2@1: Which models can conformal prediction be applied to? | Any model that produces predictions | Only linear regression | Only Bayesian models | Only Gaussian processes | Only models with calibrated probabilities | It treats the model as a black box and calibrates its errors.
M3#maths-u24-14-q3@2: Why does conformal prediction fail to guarantee coverage for time series? | Observations aren't exchangeable, since order and dependence matter | Time series have no predictions | The quantile can't be computed | Coverage is always perfect for time series | It doesn't fail | The finite-sample guarantee relies on exchangeability of calibration and test points.

## Kernel Methods
S: Kernel methods let linear algorithms learn non-linear patterns by implicitly mapping data into a high-dimensional feature space. The kernel trick computes inner products there without ever building the features, powering support vector machines, kernel ridge regression and Gaussian processes.
O: Explain the kernel trick and valid (positive semidefinite) kernels
O: Apply kernel ridge regression and the representer theorem
T: Kernel trick | Replacing inner products ⟨φ(x), φ(x′)⟩ by a kernel k(x, x′), so algorithms work in feature space without computing φ
T: Mercer kernel | A symmetric function whose Gram matrices are always positive semidefinite, guaranteeing it's an inner product in some feature space
H: Kernels
- Linear k = xᵀx′; polynomial (xᵀx′ + c)^{d}; Gaussian (RBF) exp(−‖x − x′‖^{2}/2σ^{2}).
- The RBF kernel corresponds to an infinite-dimensional feature space.
- Sums, products and positive scalings of kernels are kernels.
H: The representer theorem
- Regularised solutions take the form f(x) = Σ αᵢk(xᵢ, x).
- Kernel ridge regression: α = (K + λI)^{−1}y.
- Reproducing kernel Hilbert spaces (RKHS) give the theory.
H: Trade-offs
- Cost O(n^{2}) memory and O(n^{3}) time in the number of examples.
- Random Fourier features and Nyström approximations scale up.
- Kernel choice encodes prior knowledge (strings, graphs).
X: Show that k(x, y) = (xy)^{2} for scalars is an inner product of features.
> (xy)^{2} = x^{2}y^{2}
> Take φ(x) = x^{2}
> Then ⟨φ(x), φ(y)⟩ = x^{2}y^{2} = k(x, y), so k is a valid kernel
K: Kernels compute feature-space inner products implicitly; Mercer kernels are positive semidefinite; the representer theorem gives solutions as kernel expansions; costs scale with n^{2} to n^{3}.
!: Using a "kernel" that isn't positive semidefinite, which breaks the optimisation's guarantees.
Q: What does the representer theorem say? | Regularised solutions are combinations of kernels at the training points.
Q: What feature space does the RBF kernel correspond to? | An infinite-dimensional one.
SUM: Linear methods, non-linear features.
SUM: The kernel does the work.
SRC: Schölkopf B, Smola AJ, Learning with Kernels (MIT Press 2002) | textbook | 2002 | https://mitpress.mit.edu/
SRC: Rahimi A, Recht B, Random features for large-scale kernel machines, NeurIPS 20 | journal | 2007 | https://papers.nips.cc/
NUM1#maths-u24-15-q1@1: For the polynomial kernel k(x, y) = (xᵀy + 1)^{2}, what is k([1, 2], [3, 1])? | 36 | 0 |  | xᵀy = 3 + 2 = 5, so (5 + 1)^{2} = 36.
M1#maths-u24-15-q2@1: Which function is a valid kernel? | k(x, y) = exp(−‖x − y‖^{2}) | k(x, y) = −‖x − y‖^{2} only | k(x, y) = x − y | k(x, y) = sin(x + y) | k(x, y) = −1 | The Gaussian kernel is positive definite for all inputs.
M2#maths-u24-15-q3@2: Why can kernel methods be slow on very large datasets? | They need the n × n kernel matrix, costing O(n^{2}) memory and up to O(n^{3}) time | Kernels are always linear, which makes them slow on big data | They ignore most of the data, which wastes computation | They need gradients for every pair of examples at each step | They aren't slow; kernel methods scale linearly with n | A million examples give a 10^{12}-entry Gram matrix.

## Support Vector Machines
S: Support vector machines find the boundary that separates two classes with the widest possible margin. Only the closest points, the support vectors, determine it, and with kernels and soft margins SVMs classify non-linear, noisy data effectively.
O: Formulate the maximum-margin classifier and soft margins
O: Interpret support vectors, the hinge loss and kernel SVMs
T: Margin | The distance from the decision boundary to the nearest training points, 2/‖w‖ for a hard-margin SVM
T: Hinge loss | max(0, 1 − y f(x)), penalising points on the wrong side of the margin
H: Hard margin
- Minimise ½‖w‖^{2} subject to yᵢ(wᵀxᵢ + b) ≥ 1.
- A convex quadratic program.
- Solution depends only on support vectors.
H: Soft margin
- Minimise ½‖w‖^{2} + C Σ ξᵢ with slack ξᵢ ≥ 0.
- Equivalent to hinge loss plus L2 regularisation.
- C trades margin width against training errors.
H: Kernels and practice
- The dual uses only inner products, so kernels apply.
- RBF kernel SVMs were state of the art before deep learning for many tasks.
- Scale features before training.
- Vapnik and Cortes (1995).
X: A trained SVM has w = (3, 4). What is its margin width?
> ‖w‖ = √(9 + 16) = 5
> Margin = 2/‖w‖
> = 0.4
- Multi-class SVMs combine binary classifiers (one-vs-rest or one-vs-one).
- Support vector regression uses an ε-insensitive loss.
K: SVMs maximise the margin; support vectors define the boundary; soft margins use hinge loss with trade-off C; the dual allows kernels for non-linear classification.
!: Forgetting to scale features, which distorts distances and the margin.
Q: Which points determine an SVM's boundary? | The support vectors.
Q: What does a large C do in a soft-margin SVM? | Penalises training errors more, giving a narrower margin.
SUM: Widest margin wins.
SUM: Support vectors decide.
SRC: Cortes C, Vapnik V, Support-vector networks, Machine Learning 20(3), 273 | journal | 1995 | https://doi.org/10.1007/BF00994018
SRC: Burges CJC, A tutorial on support vector machines for pattern recognition, Data Mining and Knowledge Discovery 2(2), 121 | journal | 1998 | https://doi.org/10.1023/A:1009715923555
NUM1#maths-u24-16-q1@1: A point with label y = 1 has SVM score f(x) = 0.4. What is its hinge loss? | 0.6 | 0.001 |  | max(0, 1 − 1 × 0.4) = 0.6: it's inside the margin.
M1#maths-u24-16-q2@1: What happens to a training point far from the boundary on the correct side when it's removed? | The SVM solution doesn't change | The boundary shifts greatly | The margin doubles | All support vectors change | The SVM fails | Only support vectors affect the solution.
M2#maths-u24-16-q3@2: Why does the SVM dual formulation allow kernels? | The data appear only through inner products xᵢᵀxⱼ, which a kernel can replace | The dual problem contains no data at all, only the labels | Kernels change the labels into a form the dual can use | The primal is easier, so kernels are applied there instead | It doesn't; kernels can only be used in the primal problem | Replacing inner products with k(xᵢ, xⱼ) works in feature space implicitly.

## Decision Trees
S: Decision trees predict by asking a sequence of yes/no questions about features, splitting the data into regions. They're easy to interpret and handle mixed data types, and choosing each split to reduce impurity most is the core mathematics.
O: Calculate Gini impurity, entropy and information gain for splits
O: Explain overfitting and pruning in trees
T: Gini impurity | G = 1 − Σ pₖ^{2}, the probability of misclassifying a random item if labelled by the node's class proportions
T: Information gain | The reduction in entropy from a split: H(parent) − weighted average H(children)
H: Building trees
- Choose the feature and threshold that most reduce impurity (CART, ID3, C4.5).
- Regression trees minimise squared error in each leaf.
- Recursive splitting until stopping criteria.
- Greedy: each split optimised locally.
H: Overfitting and pruning
- Deep trees memorise training data.
- Limit depth, minimum leaf size.
- Cost-complexity pruning: minimise error + α × leaves.
- High variance: small data changes alter the tree.
H: Strengths and uses
- Interpretable rules; no scaling needed.
- Handle interactions and missing values.
- Building blocks of random forests and boosting.
- Axis-aligned splits struggle with diagonal boundaries.
X: A node has 10 positives and 10 negatives. A split gives children (8 positive, 2 negative) and (2 positive, 8 negative). Find the Gini decrease.
> Parent Gini = 1 − (0.5^{2} + 0.5^{2}) = 0.5
> Each child: 1 − (0.8^{2} + 0.2^{2}) = 0.32, weighted average 0.32
> Decrease = 0.5 − 0.32 = 0.18
K: Trees split to reduce Gini or entropy; information gain measures improvement; deep trees overfit, so pruning and limits are used; they're interpretable and form the base of ensembles.
!: Growing a single tree to full depth and trusting its training accuracy.
Q: What is the Gini impurity of a pure node? | 0.
Q: What does cost-complexity pruning penalise? | The number of leaves.
SUM: Ask questions to split data.
SUM: Prune to avoid overfitting.
SRC: Breiman L, Friedman JH, Olshen RA, Stone CJ, Classification and Regression Trees (Wadsworth 1984) | textbook | 1984 | https://www.routledge.com/
SRC: Quinlan JR, Induction of decision trees, Machine Learning 1(1), 81 | journal | 1986 | https://doi.org/10.1007/BF00116251
NUM1#maths-u24-17-q1@1: What is the Gini impurity of a node with class proportions 0.7 and 0.3? | 0.42 | 0.001 |  | 1 − (0.49 + 0.09) = 0.42.
M1#maths-u24-17-q2@1: What is the entropy in bits of a node with equal numbers of two classes? | 1 | 0 | 0.5 | 2 | 0.25 | −2 × 0.5 log₂ 0.5 = 1 bit, the maximum for two classes.
M3#maths-u24-17-q3@2: Why are single decision trees said to have high variance? | Small changes in the training data can change early splits and so the whole tree | Trees always predict the mean, so their predictions never vary | Trees have too few parameters, which makes them unstable | Trees can't fit training data closely, so their errors vary | They have low variance; single trees are very stable models | Greedy top-down splitting propagates early differences through the structure.

## Ensemble Learning Mathematics
S: Ensemble methods combine many models to get better predictions than any one alone. Averaging reduces variance when models' errors aren't perfectly correlated, while boosting reduces bias by focusing on mistakes, and stacking learns how to combine them.
O: Calculate how averaging reduces variance for correlated models
O: Compare bagging, boosting and stacking
T: Bagging | Bootstrap aggregating: training models on bootstrap resamples and averaging their predictions
T: Stacking | Training a meta-model to combine the predictions of several base models
H: Why averaging works
- Average of B models with variance σ^{2} and pairwise correlation ρ: variance ρσ^{2} + (1 − ρ)σ^{2}/B.
- Lower correlation gives more benefit.
- Bias stays about the same.
H: Methods
- Bagging: bootstrap samples, average (regression) or vote (classification).
- Random forests decorrelate trees further.
- Boosting: sequential models correcting predecessors.
- Stacking and blending.
H: Theory and practice
- Condorcet: majority of independent voters with accuracy > 0.5 improves as the group grows.
- Out-of-bag error estimates for bagging.
- Diversity versus accuracy trade-off.
- Ensembles win many prediction competitions.
X: Ten models each have variance 1 and pairwise correlation 0.2. Find the variance of their average.
> ρσ^{2} = 0.2
> (1 − ρ)σ^{2}/B = 0.8/10 = 0.08
> Total = 0.28, about a quarter of a single model's variance
K: Ensembles reduce variance (bagging) or bias (boosting); the benefit depends on correlation between models; stacking learns combinations; diversity matters.
!: Averaging many near-identical models and expecting a large improvement.
Q: What limits the variance reduction from averaging models? | Their correlation.
Q: What does bagging stand for? | Bootstrap aggregating.
SUM: Many models beat one.
SUM: Diversity drives the gain.
SRC: Breiman L, Bagging predictors, Machine Learning 24(2), 123 | journal | 1996 | https://doi.org/10.1007/BF00058655
SRC: Wolpert DH, Stacked generalization, Neural Networks 5(2), 241 | journal | 1992 | https://doi.org/10.1016/S0893-6080(05)80023-1
NUM1#maths-u24-18-q1@1: With infinitely many models of variance 4 and correlation 0.25, what does the variance of their average approach? | 1 | 0 |  | As B → ∞, the variance tends to ρσ^{2} = 0.25 × 4 = 1.
M1#maths-u24-18-q2@1: Which method trains models sequentially, each focusing on the previous ones' errors? | Boosting | Bagging | Stacking with a fixed blend | Random subspace averaging | Simple voting | Boosting reweights or fits residuals of earlier models.
M2#maths-u24-18-q3@2: Why does bagging help unstable models like deep trees most? | They have high variance, which averaging over bootstrap resamples reduces | Stable models have high variance, so bagging helps them more | Bagging reduces bias mainly, which unstable models suffer from | Trees have no variance, so bagging works by reducing bias | It doesn't help; bagging only works for linear models | Low-variance models like linear regression gain little.

## Random Forest Theory
S: Random forests average many decision trees, each grown on a bootstrap sample and choosing splits from a random subset of features. The extra randomness decorrelates the trees, making forests accurate, robust and hard to overfit.
O: Explain how bootstrap sampling and feature subsampling decorrelate trees
O: Use out-of-bag error and feature importance
T: Feature subsampling | Considering only m randomly chosen features at each split (often √p for classification)
T: Out-of-bag error | Error estimated on the ~36.8% of examples left out of each tree's bootstrap sample
H: The algorithm
- For each tree: draw a bootstrap sample; grow a deep tree with random feature subsets at each split.
- Predict by majority vote or average.
- Breiman (2001).
H: Why it works
- Deep trees: low bias, high variance.
- Feature subsampling lowers correlation ρ between trees.
- Averaging reduces variance towards ρσ^{2}.
- Adding trees doesn't cause overfitting; error converges.
H: Practical tools
- OOB error: free validation estimate.
- Feature importance: impurity decrease or permutation importance.
- Few hyperparameters: number of trees, m, leaf size.
- Extra-trees randomise thresholds too.
X: What fraction of examples is left out of a bootstrap sample of size n, for large n?
> Each example is missed with probability (1 − 1/n)ⁿ
> As n → ∞ this tends to e^{−1}
> ≈ 0.368, so about 36.8% are out of bag for each tree
K: Random forests combine bootstrap samples and random feature subsets to decorrelate deep trees; averaging cuts variance; OOB error gives free validation; permutation importance ranks features.
!: Trusting impurity-based importance for features with many categories, which it overrates.
Q: What fraction of data is out of bag for each tree? | About 36.8%.
Q: What is a typical number of features tried per split for classification? | About √p.
SUM: Randomness decorrelates trees.
SUM: OOB error validates for free.
SRC: Breiman L, Random forests, Machine Learning 45(1), 5 | journal | 2001 | https://doi.org/10.1023/A:1010933404324
SRC: Strobl C, Boulesteix AL, Zeileis A, Hothorn T, Bias in random forest variable importance measures, BMC Bioinformatics 8, 25 | journal | 2007 | https://doi.org/10.1186/1471-2105-8-25
NUM1#maths-u24-19-q1@1: A classification forest uses p = 100 features. How many are typically tried at each split with the √p rule? | 10 | 0 | features | √100 = 10.
M1#maths-u24-19-q2@1: Why does adding more trees to a random forest not cause overfitting? | The prediction converges to the average over the tree distribution, so extra trees only reduce noise | More trees always overfit, so forests must be kept small | Trees are pruned automatically as more are added | Each new tree uses all the data, cancelling the others | It does cause overfitting beyond about 50 trees | Breiman showed the generalisation error converges as trees are added.
M2#maths-u24-19-q3@2: How does feature subsampling improve a random forest? | It forces trees to use different features, lowering their correlation so averaging helps more | It makes each individual tree far more accurate on its own | It reduces the number of trees needed to just one or two | It removes all bias from each tree in the forest | It doesn't help; it only speeds up the training | Without it, strong features would dominate every tree's top splits.

## Boosting Theory
S: Boosting builds a strong model by adding weak learners one at a time, each correcting the errors of the current ensemble. AdaBoost reweights misclassified examples; gradient boosting fits each new model to the gradient of the loss, and tools like XGBoost dominate tabular data.
O: Describe AdaBoost's reweighting and learner weights
O: Explain gradient boosting as functional gradient descent
T: Weak learner | A model only slightly better than random guessing, such as a decision stump
T: Gradient boosting | Adding models fitted to the negative gradient of the loss (pseudo-residuals) with a learning rate
H: AdaBoost
- Weight each example; fit a weak learner; compute its weighted error ε.
- Learner weight α = ½ ln((1 − ε)/ε).
- Increase weights of misclassified examples.
- Equivalent to minimising exponential loss.
H: Gradient boosting
- F_{m} = F_{m−1} + ν h_{m}, with h_{m} fitted to pseudo-residuals −∂L/∂F.
- Squared loss: pseudo-residuals are ordinary residuals.
- Shrinkage ν (0.01–0.1) and subsampling regularise.
- XGBoost, LightGBM, CatBoost.
H: Theory
- Schapire (1990): weak learnability implies strong learnability.
- Margin theory explains continued improvement after zero training error.
- Boosting reduces bias, unlike bagging.
- Can overfit noisy labels without regularisation.
X: A weak learner has weighted error ε = 0.2 in AdaBoost. Find its weight α.
> α = ½ ln((1 − 0.2)/0.2)
> = ½ ln 4
> ≈ 0.693
K: Boosting adds weak learners sequentially; AdaBoost reweights examples with α = ½ ln((1 − ε)/ε); gradient boosting fits pseudo-residuals; shrinkage and subsampling prevent overfitting.
!: Using a large learning rate in gradient boosting, which overfits quickly.
Q: What are pseudo-residuals for squared loss? | The ordinary residuals y − F(x).
Q: What does AdaBoost do to misclassified examples? | Increases their weights.
SUM: Weak learners add up to strong ones.
SUM: Each step corrects errors.
SRC: Freund Y, Schapire RE, A decision-theoretic generalization of on-line learning and an application to boosting, Journal of Computer and System Sciences 55(1), 119 | journal | 1997 | https://doi.org/10.1006/jcss.1997.1504
SRC: Friedman JH, Greedy function approximation: a gradient boosting machine, Annals of Statistics 29(5), 1189 | journal | 2001 | https://doi.org/10.1214/aos/1013203451
NUM1#maths-u24-20-q1@1: A weak learner has error ε = 0.5 in AdaBoost. What weight α does it receive? | 0 | 0 |  | α = ½ ln(0.5/0.5) = ½ ln 1 = 0: random guessing contributes nothing.
M1#maths-u24-20-q2@1: In gradient boosting with squared loss, what does each new tree fit? | The residuals of the current ensemble | The original targets, ignoring earlier trees | Random noise added to the targets | The squared values of the targets | The class labels only, not residuals | The negative gradient of ½(y − F)^{2} is y − F.
M3#maths-u24-20-q3@2: Why can boosting overfit noisy labels while bagging rarely does? | Boosting keeps increasing focus on hard examples, including mislabelled ones, while bagging averages them out | Bagging fits noise more strongly because it averages many deep trees | Boosting ignores errors once training accuracy reaches 100% | Both methods always overfit noisy labels to the same degree | Boosting never overfits, whatever the level of label noise | Reweighting concentrates effort on points that may simply be wrong.

## Clustering Mathematics
S: Clustering groups data points so that points in a cluster are more similar to each other than to those in other clusters. k-means, hierarchical clustering, Gaussian mixtures and density-based methods each define "similar" differently and suit different data.
O: Apply the k-means algorithm and its objective
O: Compare hierarchical, mixture-model and density-based clustering
T: k-means objective | Minimise Σ ‖xᵢ − μ_{c(i)}‖^{2}, the within-cluster sum of squared distances to centroids
T: Silhouette score | s = (b − a)/max(a, b), comparing a point's mean distance to its own cluster (a) and the nearest other cluster (b)
H: k-means
- Alternate: assign points to nearest centroid; recompute centroids.
- Converges to a local minimum; use k-means++ initialisation.
- Assumes roughly spherical, similar-sized clusters.
- Choose k by elbow plots, silhouettes or gap statistics.
H: Other methods
- Hierarchical: agglomerative merging (single, complete, average, Ward linkage); dendrograms.
- Gaussian mixture models fitted by EM: soft assignments, elliptical clusters.
- DBSCAN: dense regions, finds arbitrary shapes and noise.
- Spectral clustering via graph Laplacian eigenvectors.
H: Cautions
- Results depend on scaling and distance measure.
- Clustering always finds clusters, even in random data.
- Validate with domain knowledge.
X: Points 1, 2, 9 and 10 with initial centroids 1 and 10. Run one k-means iteration.
> Assign: {1, 2} to centroid 1; {9, 10} to centroid 10
> New centroids: 1.5 and 9.5
> Reassigning gives the same groups, so it has converged
K: k-means minimises within-cluster squared distance by alternating steps; hierarchical, GMM, DBSCAN and spectral methods suit other shapes; scaling and validation matter.
!: Using k-means on clusters with very different shapes or densities.
Q: What does k-means++ improve? | The choice of initial centroids.
Q: Which method can find clusters of arbitrary shape and label noise? | DBSCAN.
SUM: Group similar points.
SUM: Choose the method for the cluster shape.
SRC: Lloyd SP, Least squares quantization in PCM, IEEE Transactions on Information Theory 28(2), 129 | journal | 1982 | https://doi.org/10.1109/TIT.1982.1056489
SRC: Ester M, Kriegel HP, Sander J, Xu X, A density-based algorithm for discovering clusters in large spatial databases with noise, KDD-96, 226 | journal | 1996 | https://dl.acm.org/
NUM1#maths-u24-21-q1@1: A point has mean distance 2 to its own cluster and 6 to the nearest other cluster. What is its silhouette score, to 3 decimal places? | 0.667 | 0.001 |  | (6 − 2)/6 ≈ 0.667, indicating a good assignment.
M1#maths-u24-21-q2@1: What is the centroid of the points (0, 0), (2, 0) and (1, 3)? | (1, 1) | (1, 0) | (2, 3) | (0, 3) | (1, 1.5) | The centroid averages each coordinate: x = (0 + 2 + 1)/3 = 1 and y = (0 + 0 + 3)/3 = 1, giving (1, 1).
M2#maths-u24-21-q3@2: Why must features usually be standardised before k-means? | Distances are dominated by features with large scales, distorting the clusters | k-means ignores feature scale, so standardising is only a habit | Standardising changes the number of clusters k-means will find | Centroids can't be computed for features with different units | It isn't needed, since k-means uses correlations, not distances | A variable in metres would swamp one in kilometres.

## Dimensionality Reduction
S: Dimensionality reduction represents high-dimensional data with fewer variables while keeping its important structure. Principal component analysis finds directions of maximum variance, and the singular value decomposition makes it computable; other methods preserve neighbourhoods or independence.
O: Compute principal components and explained variance
O: Compare PCA with other linear and non-linear methods
T: Principal component analysis | Finding orthogonal directions (eigenvectors of the covariance matrix) that capture the most variance
T: Explained variance ratio | λₖ/Σλⱼ, the fraction of total variance captured by component k
H: PCA
- Centre the data; compute the covariance matrix or the SVD X = UΣVᵀ.
- Components are columns of V; variances λₖ = σₖ^{2}/(n − 1).
- Keep enough components for, say, 90–95% of variance.
- Projections give the best low-rank approximation (Eckart–Young).
H: Other methods
- Factor analysis: models noise separately.
- ICA: statistically independent components (cocktail party problem).
- Random projections: Johnson–Lindenstrauss lemma preserves distances.
- Autoencoders: non-linear neural compression.
H: Uses and cautions
- Visualisation, noise reduction, compression.
- Speeding up downstream models.
- Standardise variables if units differ.
- High-variance directions aren't always the informative ones for prediction.
X: A covariance matrix has eigenvalues 6, 3 and 1. How much variance do the first two components explain?
> Total variance = 6 + 3 + 1 = 10
> First two: 6 + 3 = 9
> 90% of the variance
K: PCA finds orthogonal directions of maximal variance via eigen- or singular value decomposition; explained variance guides how many to keep; ICA, random projections and autoencoders offer alternatives.
!: Running PCA on unstandardised data with very different units.
Q: What do the principal components of data correspond to? | Eigenvectors of the covariance matrix.
Q: What does the Johnson–Lindenstrauss lemma guarantee? | Random projections approximately preserve pairwise distances.
SUM: Keep the directions that matter.
SUM: PCA maximises variance.
SRC: Jolliffe IT, Cadima J, Principal component analysis: a review and recent developments, Philosophical Transactions of the Royal Society A 374, 20150202 | review | 2016 | https://doi.org/10.1098/rsta.2015.0202
SRC: Eckart C, Young G, The approximation of one matrix by another of lower rank, Psychometrika 1(3), 211 | journal | 1936 | https://doi.org/10.1007/BF02288367
NUM1#maths-u24-22-q1@1: Eigenvalues are 8, 4, 2, 1 and 1. What fraction of variance does the first component explain, as a decimal? | 0.5 | 0.001 |  | 8/16 = 0.5.
M1#maths-u24-22-q2@1: Which decomposition is used to compute PCA stably? | The singular value decomposition | LU decomposition | Cholesky decomposition only | QR without pivoting | The Fourier transform | The SVD of the centred data matrix gives components and variances directly.
M3#maths-u24-22-q3@2: Why can PCA discard information useful for prediction? | It keeps directions of high variance, but the target may depend on a low-variance direction | PCA always keeps all the information in the original data | PCA uses the target variable to choose its components | Low-variance directions are always pure noise, so nothing is lost | It can't discard anything; components are just rotations | PCA is unsupervised; variance isn't the same as relevance.

## Manifold Learning
S: Manifold learning assumes high-dimensional data lie near a lower-dimensional curved surface and tries to unroll it. Methods such as Isomap, locally linear embedding, t-SNE and UMAP preserve local neighbourhoods and are widely used to visualise complex data like single-cell genomics.
O: Explain the manifold hypothesis
O: Compare Isomap, LLE, t-SNE and UMAP and their pitfalls
T: Manifold hypothesis | The idea that real high-dimensional data concentrate near a low-dimensional manifold
T: t-SNE | t-distributed stochastic neighbour embedding: matching neighbour probabilities in high and low dimensions by minimising KL divergence
H: Methods
- Isomap: geodesic distances along a neighbourhood graph, then MDS.
- LLE: reconstruct each point from neighbours, preserve weights.
- Laplacian eigenmaps: graph Laplacian eigenvectors.
- t-SNE (van der Maaten and Hinton 2008) and UMAP (McInnes et al. 2018) for visualisation.
H: Behaviour
- Preserve local structure, often at the expense of global distances.
- Perplexity (t-SNE) and n_neighbors (UMAP) control neighbourhood size.
- Results vary with random seeds.
H: Pitfalls
- Cluster sizes and gaps in t-SNE plots aren't meaningful distances.
- Apparent clusters can appear in noise with poor settings.
- Use for exploration, not inference.
- Swiss roll example: PCA fails, Isomap unrolls it.
X: Why does PCA fail on a "Swiss roll" dataset while Isomap succeeds?
> The data lie on a rolled-up 2D sheet in 3D
> PCA's straight-line projection squashes distant layers together
> Isomap follows distances along the sheet (geodesics), unrolling it into a flat rectangle
K: Manifold learning unrolls curved low-dimensional structure; Isomap, LLE and eigenmaps preserve geometry; t-SNE and UMAP visualise neighbourhoods; global distances and cluster sizes in plots can mislead.
!: Interpreting distances between clusters in a t-SNE plot as meaningful.
Q: What does Isomap preserve? | Geodesic distances along the data manifold.
Q: Which parameter controls neighbourhood size in t-SNE? | Perplexity.
SUM: Data lie on curved surfaces.
SUM: Local structure is preserved.
SRC: Tenenbaum JB, de Silva V, Langford JC, A global geometric framework for nonlinear dimensionality reduction, Science 290(5500), 2319 | journal | 2000 | https://doi.org/10.1126/science.290.5500.2319
SRC: van der Maaten L, Hinton G, Visualizing data using t-SNE, Journal of Machine Learning Research 9, 2579 | journal | 2008 | https://jmlr.org/papers/v9/vandermaaten08a.html
NUM1#maths-u24-23-q1@1: A Swiss roll lives in 3D but is intrinsically a 2D sheet. What is its intrinsic dimension? | 2 | 0 |  | It's a rolled-up surface, so two coordinates describe position on it.
M1#maths-u24-23-q2@1: Which method is designed mainly for visualising high-dimensional data in 2D or 3D? | t-SNE | Linear regression | k-means | Ridge regression | Logistic regression | t-SNE embeds neighbourhoods into low dimensions for plotting.
M2#maths-u24-23-q3@2: Why shouldn't gaps between clusters in a t-SNE plot be read as true distances? | t-SNE preserves local neighbourhoods and can stretch or shrink global distances arbitrarily | t-SNE preserves every pairwise distance exactly, so gaps are accurate | Gaps are always zero in t-SNE plots, so there's nothing to read | Clusters never appear in t-SNE plots unless they're in the data | They should be read literally as distances between cluster centres | Its heavy-tailed low-dimensional kernel exaggerates separation between groups.

## Neural Network Theory
S: Neural network theory explains what networks can represent and why they learn. The universal approximation theorem shows one hidden layer can approximate any continuous function, depth makes some functions exponentially cheaper to represent, and the neural tangent kernel describes very wide networks.
O: State the universal approximation theorem and its limits
O: Explain the role of depth, width and over-parameterisation
T: Universal approximation theorem | A network with one hidden layer and a non-polynomial activation can approximate any continuous function on a compact set arbitrarily well, given enough units
T: Neural tangent kernel | A kernel describing how infinitely wide networks evolve under gradient descent, behaving like kernel regression
H: Expressiveness
- Cybenko (1989), Hornik (1991): universal approximation.
- The theorem says nothing about how many units or how to find the weights.
- Depth: some functions need exponentially many units in shallow networks.
- ReLU networks are piecewise linear with many regions.
H: Learning
- Losses are non-convex, yet gradient descent finds good minima.
- Over-parameterised networks can interpolate training data and still generalise.
- Neural tangent kernel and mean-field limits describe wide networks.
- Lottery ticket hypothesis: sparse subnetworks train well.
H: Open questions
- Why implicit regularisation works.
- Double descent and benign overfitting.
- Scaling laws: loss falls as a power law in data and parameters.
X: How many weights (excluding biases) does a network with layers of size 784, 100 and 10 have?
> First layer: 784 × 100 = 78,400
> Second layer: 100 × 10 = 1,000
> Total 79,400 weights
K: Universal approximation guarantees expressiveness but not efficiency or learnability; depth adds power; over-parameterised networks generalise surprisingly; NTK and scaling laws describe behaviour.
!: Reading the universal approximation theorem as a guarantee that training will find a good network.
Q: Who proved an early universal approximation theorem in 1989? | George Cybenko.
Q: Does universal approximation say how many neurons are needed? | No.
SUM: Networks can approximate anything.
SUM: Learning them is the harder question.
SRC: Cybenko G, Approximation by superpositions of a sigmoidal function, Mathematics of Control, Signals and Systems 2(4), 303 | journal | 1989 | https://doi.org/10.1007/BF02551274
SRC: Jacot A, Gabriel F, Hongler C, Neural tangent kernel: convergence and generalization in neural networks, NeurIPS 31 | journal | 2018 | https://arxiv.org/abs/1806.07572
NUM1#maths-u24-24-q1@1: A layer maps 512 inputs to 256 outputs with biases. How many parameters does it have? | 131328 | 0 | parameters | 512 × 256 + 256 = 131,072 + 256 = 131,328.
M1#maths-u24-24-q2@1: What does the universal approximation theorem guarantee? | Existence of a one-hidden-layer network approximating any continuous function on a compact set | That gradient descent always finds the best network | That small networks suffice for any function | That neural networks never overfit training data | That deep networks are never necessary in practice | It's an existence result, saying nothing about size or training.
M3#maths-u24-24-q3@2: Why can deeper networks be more efficient than wide shallow ones? | Composing layers reuses features, so some functions need exponentially fewer units with depth | Depth reduces the number of parameters to zero | Shallow networks can't approximate any function | Depth removes the need for non-linear activations | They can't be more efficient than shallow networks | Results by Telgarsky and others show depth separations for certain functions.

## Deep Learning Mathematics
S: Deep learning mathematics covers the building blocks of modern networks: convolutions, activation functions, normalisation, initialisation and regularisation. Each choice has a mathematical reason, such as keeping signal variance stable or encoding symmetry.
O: Explain convolutional layers, activations and normalisation
O: Describe initialisation and regularisation methods mathematically
T: Convolutional layer | A layer applying shared filters across positions, giving translation equivariance and far fewer parameters
T: Batch normalisation | Normalising each feature over a mini-batch to zero mean and unit variance, then rescaling with learned parameters
H: Building blocks
- Convolutions: weight sharing, local receptive fields; output size (n − k + 2p)/s + 1.
- Activations: ReLU max(0, x), GELU, softmax for outputs.
- Pooling and strides reduce resolution.
- Residual connections enable very deep networks.
H: Keeping signals stable
- Xavier/Glorot initialisation: variance 2/(n_{in} + n_{out}).
- He initialisation for ReLU: variance 2/n_{in}.
- Batch, layer and group normalisation.
H: Regularisation
- Weight decay (L2).
- Dropout: randomly zero units during training.
- Data augmentation encodes invariances.
- Early stopping.
X: A 32 × 32 image passes through a 5 × 5 convolution with no padding and stride 1. What is the output size?
> Output = (32 − 5 + 0)/1 + 1
> = 28
> A 28 × 28 feature map per filter
K: CNNs use shared filters for equivariance; activations add non-linearity; careful initialisation and normalisation keep signals stable; dropout, weight decay and augmentation regularise.
!: Initialising all weights to the same value, which makes units identical and stops learning.
Q: What variance does He initialisation use? | 2/n_{in}.
Q: What does dropout do during training? | Randomly sets some units to zero.
SUM: Each design choice has a mathematical reason.
SUM: Keep signal variance stable.
SRC: He K, Zhang X, Ren S, Sun J, Delving deep into rectifiers: surpassing human-level performance on ImageNet classification, ICCV 2015 | journal | 2015 | https://arxiv.org/abs/1502.01852
SRC: Ioffe S, Szegedy C, Batch normalization: accelerating deep network training by reducing internal covariate shift, ICML 2015 | journal | 2015 | https://arxiv.org/abs/1502.03167
NUM1#maths-u24-25-q1@1: A 64 × 64 input is convolved with a 3 × 3 kernel, padding 1 and stride 2. What is the output width? | 32 | 0 |  | Output width = ⌊(n − k + 2p)/s⌋ + 1 = ⌊(64 − 3 + 2)/2⌋ + 1 = ⌊31.5⌋ + 1 = 32.
M1#maths-u24-25-q2@1: How many weights does a 3 × 3 convolution with 16 input and 32 output channels have (excluding biases)? | 4608 | 288 | 512 | 9 | 147,456 | 3 × 3 × 16 × 32 = 4,608, independent of image size.
M2#maths-u24-25-q3@2: Why does weight sharing in convolutions suit images? | The same pattern (such as an edge) can appear anywhere, so one filter detects it at all positions | Images have no spatial structure, so sharing loses nothing | It increases the number of parameters to fit more detail | It removes the effect of where objects appear in the image | It doesn't suit images; fully connected layers work better | Translation equivariance matches how visual features recur across an image.

## Representation Learning
S: Representation learning discovers useful features of data automatically rather than designing them by hand. Good representations make downstream tasks easy, and methods such as autoencoders, contrastive learning and pretraining learn them from unlabelled data.
O: Describe autoencoders and contrastive learning objectives
O: Explain embeddings, transfer learning and what makes a good representation
T: Autoencoder | A network trained to reconstruct its input through a narrow bottleneck, learning a compressed representation
T: Contrastive learning | Training representations so that similar pairs (such as two augmentations of one image) are close and dissimilar pairs far apart
H: Methods
- Autoencoders and variational autoencoders (latent variable models).
- Contrastive learning (SimCLR, InfoNCE loss).
- Masked prediction (BERT, masked autoencoders).
- Word embeddings (word2vec): king − man + woman ≈ queen.
H: Good representations
- Disentangled factors of variation.
- Invariance to nuisance changes, sensitivity to meaning.
- Linear separability for downstream tasks.
- Measured by linear probes and transfer performance.
H: Transfer learning
- Pretrain on large data, fine-tune on small tasks.
- Foundation models share representations across tasks.
- Cosine similarity compares embeddings.
- Risks: biases learned from training data.
X: Two embeddings are u = (1, 2, 2) and v = (2, 1, 2). Find their cosine similarity.
> u·v = 2 + 2 + 4 = 8
> ‖u‖ = ‖v‖ = 3
> cos θ = 8/9 ≈ 0.889: quite similar
K: Representation learning finds features automatically; autoencoders, contrastive and masked objectives learn from unlabelled data; good representations transfer; embeddings are compared by cosine similarity.
!: Assuming learned embeddings are free of the biases in their training data.
Q: What does an autoencoder's bottleneck force? | A compressed representation of the input.
Q: What does contrastive learning pull together? | Representations of similar (positive) pairs.
SUM: Learn features, don't hand-craft them.
SUM: Good representations transfer.
SRC: Bengio Y, Courville A, Vincent P, Representation learning: a review and new perspectives, IEEE Transactions on Pattern Analysis and Machine Intelligence 35(8), 1798 | review | 2013 | https://doi.org/10.1109/TPAMI.2013.50
SRC: Chen T, Kornblith S, Norouzi M, Hinton G, A simple framework for contrastive learning of visual representations, ICML 2020 | journal | 2020 | https://arxiv.org/abs/2002.05709
NUM1#maths-u24-26-q1@1: Find the cosine similarity of u = (1, 0) and v = (1, 1), to 3 decimal places. | 0.707 | 0.001 |  | u·v = 1 and ‖u‖‖v‖ = √2, so cos θ = 1/√2 ≈ 0.707.
M1#maths-u24-26-q2@1: What is the training target of a standard autoencoder? | Its own input | A class label | The next word in a sentence | A random vector | Nothing | It learns to reconstruct x from its compressed code.
M2#maths-u24-26-q3@2: Why does pretraining on large unlabelled data help small labelled tasks? | It learns general features that make the small task easier to fit with few labels | Unlabelled data secretly contain the labels for the small task | It removes the need for any labelled data in the small task | It makes the model overfit the small task less by ignoring it | It doesn't help; small tasks should be trained from scratch | Transferred representations reduce how much must be learned from scarce labels.

## Attention Mechanisms
S: Attention lets a model weigh different parts of its input when producing each output, focusing on what's relevant. Scaled dot-product attention compares queries with keys and mixes values accordingly, and it's the core operation of transformers.
O: Compute scaled dot-product attention
O: Explain queries, keys, values and multi-head attention
T: Scaled dot-product attention | Attention(Q, K, V) = softmax(QKᵀ/√d_{k})V
T: Self-attention | Attention where queries, keys and values all come from the same sequence
H: The computation
- Scores: qᵀk for each query–key pair, divided by √d_{k}.
- Softmax turns scores into weights summing to 1.
- Output: weighted sum of values.
- Dividing by √d_{k} keeps scores from growing with dimension, so softmax doesn't saturate.
H: Variants
- Multi-head attention: several attention operations in parallel subspaces.
- Cross-attention: queries from one sequence, keys and values from another (translation).
- Masked (causal) attention for generation.
- Bahdanau (2014) introduced attention for translation.
H: Cost
- O(n^{2}) time and memory in sequence length n.
- Efficient variants: sparse, linear and FlashAttention (memory-efficient exact).
- Attention weights aren't always faithful explanations.
X: A query q = (1, 0) attends to keys k₁ = (1, 0) and k₂ = (0, 1) with values 10 and 20, d_{k} = 1 (no scaling change). Find the output.
> Scores: q·k₁ = 1, q·k₂ = 0
> Softmax: e/(e + 1) ≈ 0.731 and 1/(e + 1) ≈ 0.269
> Output ≈ 0.731 × 10 + 0.269 × 20 ≈ 12.7
K: Attention weights values by softmax of query–key similarity scaled by √d_{k}; self-attention, multi-head and cross-attention are variants; cost is quadratic in sequence length.
!: Treating attention weights as reliable explanations of a model's reasoning.
Q: Why divide attention scores by √d_{k}? | To stop large dot products saturating the softmax.
Q: What is the cost of self-attention in sequence length n? | O(n^{2}).
SUM: Weigh inputs by relevance.
SUM: Queries match keys to mix values.
SRC: Vaswani A et al., Attention is all you need, NeurIPS 30 | journal | 2017 | https://arxiv.org/abs/1706.03762
SRC: Bahdanau D, Cho K, Bengio Y, Neural machine translation by jointly learning to align and translate, arXiv:1409.0473 | journal | 2014 | https://arxiv.org/abs/1409.0473
NUM1#maths-u24-27-q1@1: Two attention scores are equal. What weight does each value receive? | 0.5 | 0 |  | Softmax of equal scores gives equal weights summing to 1.
M1#maths-u24-27-q2@1: How does self-attention's memory grow if the sequence length doubles? | It roughly quadruples | It doubles | It stays the same | It halves | It grows eightfold | The attention matrix is n × n, so its size scales with n^{2}.
M3#maths-u24-27-q3@2: Why are attention scores scaled by 1/√d_{k}? | Dot products of random d_{k}-dimensional vectors have variance ~d_{k}, so unscaled scores saturate the softmax and kill gradients | It makes the softmax linear, which simplifies the gradient computation | It reduces the memory needed to store the attention matrix | It's required so that several attention heads can run in parallel | It isn't necessary; unscaled scores train just as well at any size | Scaling keeps score variance about 1 regardless of dimension.

## Transformer Mathematics
S: Transformers stack attention and feed-forward layers with residual connections and normalisation. Positional encodings give order information, and the architecture scales smoothly, which is why it powers large language models and much of modern AI.
O: Describe the transformer block and positional encodings
O: Count parameters and explain scaling and autoregressive generation
T: Transformer block | Multi-head self-attention and a position-wise feed-forward network, each wrapped with residual connections and layer normalisation
T: Positional encoding | Information added to token embeddings to represent position, such as sinusoids or rotary embeddings
H: Architecture
- Embeddings plus positional encodings.
- Block: x + MHA(LN(x)), then x + FFN(LN(x)) (pre-norm).
- FFN usually expands width by 4 (d → 4d → d).
- Encoder-only (BERT), decoder-only (GPT), encoder–decoder (T5).
H: Parameters and compute
- Per layer roughly 12d^{2} parameters (4d^{2} attention, 8d^{2} FFN).
- Training compute ≈ 6 × parameters × tokens.
- Scaling laws: loss falls as a power law in parameters, data and compute.
H: Generation
- Autoregressive: predict the next token from previous ones (causal mask).
- Softmax over the vocabulary; temperature and top-p sampling.
- Key–value caching speeds generation.
- Context length limited by quadratic attention cost.
X: Estimate the parameters in one layer with d = 1024 using 12d^{2}.
> d^{2} = 1,048,576
> 12d^{2} ≈ 12.6 million
> A 24-layer model has about 300 million parameters in its blocks
K: Transformers combine attention and FFN blocks with residuals and normalisation; positional encodings provide order; parameters scale as 12d^{2} per layer; compute and loss follow scaling laws.
!: Forgetting positional information, without which attention treats input as an unordered set.
Q: What does a causal mask prevent? | Positions attending to future tokens.
Q: What is the approximate training compute for N parameters and D tokens? | About 6ND floating-point operations.
SUM: Attention plus feed-forward, stacked.
SUM: Scales predictably.
SRC: Vaswani A et al., Attention is all you need, NeurIPS 30 | journal | 2017 | https://arxiv.org/abs/1706.03762
SRC: Kaplan J et al., Scaling laws for neural language models, arXiv:2001.08361 | journal | 2020 | https://arxiv.org/abs/2001.08361
NUM1#maths-u24-28-q1@1: Using compute ≈ 6ND, how many FLOPs does training a 10^{9}-parameter model on 2 × 10^{10} tokens need, in units of 10^{20}? | 1.2 | 0.001 |  | 6 × 10^{9} × 2 × 10^{10} = 1.2 × 10^{20}.
M1#maths-u24-28-q2@1: Why do transformers need positional encodings? | Self-attention alone is permutation-invariant, so order must be supplied | Tokens already contain their positions | Attention can't process words without them | They make transformer models smaller | They don't need them at all | Without them, shuffled inputs would give the same representations.
M2#maths-u24-28-q3@2: Why does lowering the sampling temperature make generated text more predictable? | Dividing logits by T < 1 sharpens the softmax, concentrating probability on top tokens | It adds randomness to every token choice | It changes the size of the vocabulary | It removes the softmax from the model | It doesn't affect predictability | As T → 0 sampling approaches always picking the most likely token.

## Information-Theoretic Learning
S: Information theory gives machine learning its common losses and many of its explanations. Cross-entropy trains classifiers, KL divergence regularises variational models, mutual information drives representation learning, and compression links directly to generalisation.
O: Connect ML objectives to entropy, KL divergence and mutual information
O: Describe the information bottleneck and the ELBO
T: Evidence lower bound | ELBO = E_{q}[log p(x | z)] − D_{KL}(q(z | x) ‖ p(z)), maximised to train variational autoencoders
T: Information bottleneck | Learning a representation T of X that keeps information about Y while compressing X: maximise I(T; Y) − βI(T; X)
H: Losses as information
- Cross-entropy = entropy + KL: training minimises KL to the data.
- Log-likelihood and bits-per-character for language models.
- Label smoothing raises target entropy.
H: Variational and contrastive learning
- VAEs maximise the ELBO: reconstruction minus KL to the prior.
- InfoNCE contrastive loss lower-bounds mutual information.
- β-VAE weights the KL term to encourage disentangling.
H: Generalisation and compression
- PAC-Bayes bounds involve KL between posterior and prior.
- MDL: models that compress well generalise well.
- Information bottleneck theory of deep learning (debated).
- Language modelling as compression.
X: A VAE has reconstruction term −95 nats and KL term 5 nats for an input. Find the ELBO.
> ELBO = E[log p(x | z)] − KL
> = −95 − 5
> = −100 nats, a lower bound on log p(x)
K: ML losses are information-theoretic: cross-entropy, KL and mutual information; VAEs maximise the ELBO; contrastive losses bound MI; compression links to generalisation.
!: Treating the ELBO as the exact log-likelihood rather than a lower bound.
Q: What two terms make up the ELBO? | Expected reconstruction log-likelihood minus KL to the prior.
Q: What does InfoNCE bound? | Mutual information (from below).
SUM: Information theory shapes ML losses.
SUM: Compression links to generalisation.
SRC: Kingma DP, Welling M, Auto-encoding variational Bayes, arXiv:1312.6114 | journal | 2013 | https://arxiv.org/abs/1312.6114
SRC: Tishby N, Pereira FC, Bialek W, The information bottleneck method, arXiv:physics/0004057 | journal | 2000 | https://arxiv.org/abs/physics/0004057
NUM1#maths-u24-29-q1@1: A model achieves cross-entropy 1.2 bits per character on text whose true entropy is 1.0 bits per character. What is the KL divergence in bits per character? | 0.2 | 0.001 | bits | KL = cross-entropy − entropy = 1.2 − 1.0 = 0.2.
M1#maths-u24-29-q2@1: What does the KL term in a VAE's ELBO encourage? | The approximate posterior to stay close to the prior | Perfect reconstruction of every input | Larger latent codes for each input | Zero entropy in the latent space | Random outputs unrelated to inputs | Penalising KL keeps the latent space regular and samplable.
M2#maths-u24-29-q3@2: Why is the ELBO a lower bound on log p(x)? | log p(x) = ELBO + D_{KL}(q ‖ true posterior), and KL is non-negative | The ELBO is always zero, which is below any log-likelihood | It equals log p(x) exactly when the decoder is trained | It's actually an upper bound on the log-likelihood | It isn't a bound; it's an unrelated training heuristic | The gap is precisely the KL divergence from the true posterior.

## Reinforcement Learning
S: Reinforcement learning trains agents to make sequences of decisions by trial and error, maximising cumulative reward. Combined with deep networks it has mastered games such as Go and is used to fine-tune language models from human feedback.
O: Describe the agent–environment loop, returns and discounting
O: Distinguish model-based, value-based and policy-based approaches
T: Return | G_{t} = Σ γᵏ r_{t+k+1}, the discounted sum of future rewards
T: Exploration–exploitation trade-off | Balancing trying new actions to learn about them against choosing actions known to be good
H: The setting
- States, actions, rewards, transitions: a Markov decision process.
- Policy π(a | s) chooses actions.
- Value functions V^{π}(s) and Q^{π}(s, a) measure expected return.
- Discount γ < 1 values near rewards more.
H: Approaches
- Value-based: Q-learning, deep Q-networks (DQN).
- Policy-based: policy gradients, PPO.
- Actor–critic: both together.
- Model-based: learn transitions and plan (MuZero).
H: Achievements and challenges
- AlphaGo (2016), AlphaZero, robotics, chip design.
- RLHF aligns language models with human preferences.
- Sample inefficiency, reward hacking and safety.
- Off-policy learning from logged data.
X: Rewards 1, 1, 1 arrive in three steps with γ = 0.9. Find the return G₀.
> G₀ = 1 + 0.9 × 1 + 0.81 × 1
> = 1 + 0.9 + 0.81
> = 2.71
K: RL maximises discounted return in an MDP; value-based, policy-based, actor–critic and model-based methods exist; deep RL achieved landmark results; exploration and sample efficiency remain challenges.
!: Designing a reward that the agent can exploit without achieving the intended goal (reward hacking).
Q: What does the discount factor γ control? | How much future rewards count compared with immediate ones.
Q: What is RLHF? | Reinforcement learning from human feedback.
SUM: Learn by trial and error.
SUM: Maximise discounted reward.
SRC: Sutton RS, Barto AG, Reinforcement Learning: An Introduction (2nd edn, MIT Press 2018) | textbook | 2018 | http://incompleteideas.net/book/the-book-2nd.html
SRC: Silver D et al., Mastering the game of Go with deep neural networks and tree search, Nature 529, 484 | journal | 2016 | https://doi.org/10.1038/nature16961
NUM1#maths-u24-30-q1@1: An agent gets reward 10 at every step forever with γ = 0.95. What is its return? | 200 | 0 |  | 10/(1 − 0.95) = 200.
M1#maths-u24-30-q2@1: Which approach learns a model of the environment and plans with it? | Model-based reinforcement learning | Pure Q-learning | REINFORCE without a model | Random search | Supervised classification | Model-based methods learn transitions and rewards, then simulate.
M2#maths-u24-30-q3@2: Why is exploration necessary in reinforcement learning? | Without trying unfamiliar actions, the agent can't discover that they might be better | Exploration always lowers the agent's total reward | Agents know all action values in advance | It's only needed in board games like Go | It isn't necessary once training starts | Greedy agents can lock into suboptimal habits.

## Bellman Equations
S: The Bellman equations express the value of a state as immediate reward plus the discounted value of what comes next. They turn sequential decision problems into recursive equations, and solving or approximating them underlies dynamic programming and most reinforcement learning.
O: Write Bellman expectation and optimality equations
O: Solve small problems by policy evaluation and value iteration
T: Bellman expectation equation | V^{π}(s) = Σₐ π(a | s) Σₛ′ P(s′ | s, a)[r + γV^{π}(s′)]
T: Bellman optimality equation | Q*(s, a) = Σₛ′ P(s′ | s, a)[r + γ maxₐ′ Q*(s′, a′)]
H: Expectation equations
- Linear in V^{π}: V = R^{π} + γP^{π}V.
- Solve directly: V = (I − γP^{π})^{−1}R^{π}.
- Or iteratively (policy evaluation).
H: Optimality equations
- Non-linear because of the max.
- Value iteration: repeatedly apply the Bellman optimality operator.
- The operator is a γ-contraction, so iteration converges to a unique fixed point.
- Greedy policy with respect to Q* is optimal.
H: In learning
- Q-learning samples the optimality equation.
- TD learning samples the expectation equation.
- Deep RL approximates value functions with networks.
- Bootstrapping: estimates built from other estimates.
X: In a single state with reward 2 per step and γ = 0.5, solve V = 2 + γV.
> V = 2 + 0.5V
> 0.5V = 2
> V = 4
K: Bellman equations make values recursive; expectation equations are linear in V; optimality equations involve a max; value iteration converges by contraction; RL samples these equations.
!: Forgetting that the optimality equation's max makes it non-linear, so it can't be solved by one matrix inversion.
Q: Why does value iteration converge? | The Bellman operator is a contraction for γ < 1.
Q: How is V^{π} found directly? | V = (I − γP^{π})^{−1}R^{π}.
SUM: Value = reward + discounted next value.
SUM: Contraction guarantees convergence.
SRC: Bellman R, Dynamic Programming (Princeton University Press 1957) | textbook | 1957 | https://press.princeton.edu/
SRC: Bertsekas DP, Reinforcement Learning and Optimal Control (Athena Scientific 2019) | textbook | 2019 | http://www.athenasc.com/
NUM1#maths-u24-31-q1@1: In a single-state problem with reward 3 per step and γ = 0.9, what is V? | 30 | 0 |  | V = 3 + 0.9V gives V = 3/0.1 = 30.
M1#maths-u24-31-q2@1: Which equation includes a maximum over actions? | The Bellman optimality equation | The Bellman expectation equation for a fixed policy | The definition of the return | The policy gradient theorem | The softmax function | Optimal values take the best action at each step.
M3#maths-u24-31-q3@2: Why does bootstrapping in TD learning introduce bias but reduce variance? | It updates from current value estimates, which may be wrong, instead of waiting for noisy full returns | It uses no estimates at all, only observed rewards | It removes all randomness from the learning targets | It always increases variance compared with full returns | It has no effect on bias or variance in practice | One-step targets depend on one reward plus an estimate, not many random rewards.

## Policy Optimisation
S: Policy optimisation improves a parameterised policy directly by following the gradient of expected return. The policy gradient theorem makes this possible from sampled trajectories, and methods such as actor–critic, TRPO and PPO make it stable enough to train robots and language models.
O: State the policy gradient theorem and the REINFORCE estimator
O: Explain baselines, advantages and trust-region methods such as PPO
T: Policy gradient theorem | ∇J(θ) = E[∇ log πθ(a | s) Q^{π}(s, a)]: the gradient of expected return can be estimated from samples
T: Advantage function | A(s, a) = Q(s, a) − V(s), how much better an action is than average in that state
H: REINFORCE and baselines
- Estimate ∇J ≈ Σ ∇ log πθ(aₜ | sₜ) Gₜ.
- High variance; subtract a baseline b(s) without adding bias.
- Using V(s) as the baseline gives advantage estimates.
H: Actor–critic and stability
- Critic estimates V or Q; actor updates the policy.
- Generalised advantage estimation (GAE) trades bias and variance.
- TRPO: constrain KL divergence between old and new policies.
- PPO: clip the probability ratio to [1 − ε, 1 + ε].
H: Uses
- Continuous control in robotics.
- Game playing (OpenAI Five).
- RLHF fine-tuning of language models with PPO.
- Entropy bonuses encourage exploration.
X: PPO's ratio is r = π_{new}/π_{old} = 1.3 with ε = 0.2 and positive advantage A = 2. What clipped objective contributes?
> Unclipped: rA = 1.3 × 2 = 2.6
> Clipped ratio: min(1.3, 1.2) = 1.2, giving 1.2 × 2 = 2.4
> PPO takes the minimum, 2.4, limiting how far one update moves the policy
K: Policy gradients optimise policies directly from samples; baselines and advantages reduce variance; actor–critic adds a learned critic; TRPO and PPO keep updates stable.
!: Using raw returns without a baseline, giving very noisy gradient estimates.
Q: What does subtracting a baseline do to the policy gradient? | Reduces variance without adding bias.
Q: What does PPO clip? | The probability ratio between new and old policies.
SUM: Climb the gradient of expected return.
SUM: Keep updates small and stable.
SRC: Williams RJ, Simple statistical gradient-following algorithms for connectionist reinforcement learning, Machine Learning 8, 229 | journal | 1992 | https://doi.org/10.1007/BF00992696
SRC: Schulman J, Wolski F, Dhariwal P, Radford A, Klimov O, Proximal policy optimization algorithms, arXiv:1707.06347 | journal | 2017 | https://arxiv.org/abs/1707.06347
NUM1#maths-u24-32-q1@1: In a state, Q(s, a) = 8 and V(s) = 5. What is the advantage of action a? | 3 | 0 |  | A = Q − V = 8 − 5 = 3.
M1#maths-u24-32-q2@1: What is the role of the critic in actor–critic methods? | Estimating values to give lower-variance learning signals for the actor | Choosing the actions directly | Generating the environment's rewards | Storing a model of the environment | Nothing; it's an unused component | The critic supplies baselines or advantage estimates.
M2#maths-u24-32-q3@2: Why do TRPO and PPO limit how much the policy changes per update? | Large policy changes can collapse performance, since gradient estimates are only valid near the old policy | Small changes always slow learning, so limits are a compromise for speed | Limits remove exploration, which makes training more stable | Policies can't change by more than a fixed amount in any RL method | They don't limit it; PPO allows unrestricted policy updates | Trust regions keep updates where the surrogate objective is reliable.

## Multi-Armed Bandits
S: A multi-armed bandit chooses repeatedly among options with unknown rewards, balancing exploring uncertain arms with exploiting the best so far. Bandit algorithms run online experiments, recommend content and allocate patients adaptively in clinical trials.
O: Apply ε-greedy, UCB and Thompson sampling
O: Explain regret and its logarithmic lower bound
T: Regret | The total reward lost compared with always playing the best arm: R_{T} = Tμ* − Σ E[r_{t}]
T: Upper confidence bound | UCB1 chooses the arm maximising x̄ᵢ + √(2 ln t/nᵢ): optimism in the face of uncertainty
H: Algorithms
- ε-greedy: explore randomly with probability ε.
- UCB1 (Auer et al. 2002): bonus for rarely tried arms.
- Thompson sampling: sample each arm's mean from its posterior and play the best sample.
- Gittins index: optimal for discounted Bayesian bandits.
H: Regret
- Lai–Robbins lower bound: regret grows at least like log T.
- UCB and Thompson achieve O(log T).
- Fixed ε-greedy has linear regret.
H: Extensions and uses
- Contextual bandits use features (news recommendation).
- Adaptive A/B testing.
- Adaptive clinical trial designs.
- Adversarial bandits (EXP3).
X: At t = 100, arm A has mean 0.6 from 50 plays and arm B has mean 0.5 from 10 plays. Which does UCB1 pick?
> Bonus √(2 ln 100/n): ln 100 ≈ 4.605
> A: 0.6 + √(9.21/50) ≈ 0.6 + 0.429 = 1.029
> B: 0.5 + √(9.21/10) ≈ 0.5 + 0.960 = 1.460, so UCB1 explores arm B
K: Bandits balance exploration and exploitation; ε-greedy, UCB and Thompson sampling are standard; good algorithms achieve logarithmic regret; contextual bandits personalise choices.
!: Using a fixed exploration rate forever, which wastes plays on known poor arms.
Q: How does the best achievable regret grow with time? | Logarithmically.
Q: What does Thompson sampling sample? | Each arm's mean reward from its posterior.
SUM: Explore uncertain options, exploit good ones.
SUM: Regret measures the cost of learning.
SRC: Lai TL, Robbins H, Asymptotically efficient adaptive allocation rules, Advances in Applied Mathematics 6(1), 4 | journal | 1985 | https://doi.org/10.1016/0196-8858(85)90002-8
SRC: Lattimore T, Szepesvári C, Bandit Algorithms (Cambridge University Press 2020) | textbook | 2020 | https://tor-lattimore.com/downloads/book/book.pdf
NUM1#maths-u24-33-q1@1: The best arm pays 0.7 on average. An algorithm earns an expected 650 over 1000 plays. What is its regret? | 50 | 0 |  | Tμ* − earned = 700 − 650 = 50.
M1#maths-u24-33-q2@1: Which algorithm chooses arms by sampling from posterior distributions of their rewards? | Thompson sampling | UCB1 | ε-greedy | Round robin | Pure exploitation | It plays the arm whose sampled mean is highest.
M3#maths-u24-33-q3@2: Why does ε-greedy with fixed ε have regret growing linearly in time? | It keeps exploring at a constant rate forever, losing reward on bad arms in every period | It never explores, so it can't find the best arm | Its regret is always zero once the best arm is known | It finds the best arm immediately and stops exploring | It has logarithmic regret like UCB and Thompson sampling | A constant fraction ε of plays go to random arms however much is known.

## Causal Machine Learning
S: Causal machine learning combines causal inference with flexible models to estimate what would happen under interventions, such as a treatment's effect, rather than mere associations. It relies on assumptions made explicit through graphs or potential outcomes.
O: Distinguish prediction from causal effect estimation
O: Describe potential outcomes, confounding adjustment and heterogeneous treatment effects
T: Average treatment effect | ATE = E[Y(1) − Y(0)], the mean difference between outcomes with and without treatment
T: Confounder | A variable that affects both treatment and outcome, biasing naive comparisons
H: Frameworks
- Potential outcomes (Rubin): each unit has Y(1) and Y(0); we see only one.
- Causal graphs and do-calculus (Pearl).
- Identification needs assumptions: no unmeasured confounding, positivity.
- Randomised experiments identify effects by design.
H: Estimation with ML
- Propensity scores e(x) = P(T = 1 | x) and inverse probability weighting.
- Double/debiased machine learning (Chernozhukov et al.) for valid inference.
- Causal forests and meta-learners (T-, S-, X-learners) for heterogeneous effects.
- Instrumental variables and difference-in-differences.
H: Cautions
- Good prediction doesn't imply causal validity.
- Adjusting for colliders or mediators can introduce bias.
- Sensitivity analysis for unmeasured confounding.
- Transportability to new populations.
X: Treated patients have 20% recovery and untreated 30%, but sicker patients were more likely to be treated. What's the problem?
> Severity affects both treatment and recovery: a confounder
> The naive difference (−10%) mixes the treatment effect with severity
> Adjust for severity (stratify, weight or model) before estimating the effect
K: Causal ML estimates intervention effects using potential outcomes or graphs; identification needs assumptions; propensity weighting, double ML and causal forests estimate average and heterogeneous effects.
!: Interpreting a feature's importance in a predictive model as its causal effect.
Q: What is the fundamental problem of causal inference? | Each unit's outcome is observed under only one treatment.
Q: What is a propensity score? | The probability of receiving treatment given covariates.
SUM: Estimate effects of interventions.
SUM: Assumptions must be explicit.
SRC: Pearl J, Causality: Models, Reasoning, and Inference (2nd edn, Cambridge University Press 2009) | textbook | 2009 | https://www.cambridge.org/
SRC: Chernozhukov V et al., Double/debiased machine learning for treatment and structural parameters, Econometrics Journal 21(1), C1 | journal | 2018 | https://doi.org/10.1111/ectj.12097
NUM1#maths-u24-34-q1@1: A patient with propensity score 0.25 is treated. What inverse probability weight do they receive? | 4 | 0 |  | Weight = 1/e(x) = 1/0.25 = 4.
M1#maths-u24-34-q2@1: Which design identifies causal effects without assuming no unmeasured confounders? | A randomised controlled trial | A purely observational regression | Correlation analysis | A predictive neural network | A cross-sectional survey | Randomisation makes treatment independent of all confounders, measured or not.
M2#maths-u24-34-q3@2: Why can adjusting for a variable caused by both treatment and outcome bias the estimate? | It's a collider, and conditioning on it creates a spurious association | Adjusting for any variable always removes bias | Such a variable is a confounder that must be adjusted for | Adjusting for it has no effect on the estimate | It can't bias estimates if the sample is large | Conditioning on a common effect opens a non-causal path.

## Explainable AI Mathematics
S: Explainable AI develops mathematical tools to show why a model made a prediction. Shapley values, gradients, local surrogate models and counterfactuals each give a different kind of explanation, with different guarantees and pitfalls.
O: Compute Shapley values for a small model
O: Compare gradient, surrogate and counterfactual explanations
T: Shapley value | φᵢ, the average marginal contribution of feature i over all orders of adding features, the unique attribution with efficiency, symmetry, dummy and additivity properties
T: Counterfactual explanation | The smallest change to an input that would change the model's decision
H: Attribution methods
- SHAP: Shapley values with feature contributions summing to prediction minus baseline.
- Integrated gradients: integrate gradients along a path from a baseline.
- Saliency maps for images.
- Permutation importance (global).
H: Local surrogates and examples
- LIME: fit a simple model near the input.
- Counterfactuals: "loan approved if income were £5k higher".
- Prototypes and influence functions.
- Inherently interpretable models (sparse linear, small trees).
H: Pitfalls
- Correlated features make attributions ambiguous.
- Explanations can be unstable or manipulated.
- Different methods disagree.
- Explanations aren't causal claims about the world.
X: A model f(x₁, x₂) = 3x₁ + 2x₂ with baseline (0, 0) is applied at (1, 1). Find the Shapley values.
> For a linear model with independent baseline, φᵢ = wᵢ(xᵢ − baselineᵢ)
> φ₁ = 3 × 1 = 3, φ₂ = 2 × 1 = 2
> They sum to f(1, 1) − f(0, 0) = 5 (efficiency)
K: Shapley values fairly attribute predictions and sum to the difference from a baseline; gradients, LIME and counterfactuals give other views; correlated features and instability limit explanations.
!: Treating a feature attribution as proof of a causal effect.
Q: What property makes Shapley values sum to the prediction minus the baseline? | Efficiency.
Q: What is a counterfactual explanation? | The smallest input change that alters the decision.
SUM: Explain individual predictions.
SUM: Methods differ and can disagree.
SRC: Lundberg SM, Lee SI, A unified approach to interpreting model predictions, NeurIPS 30 | journal | 2017 | https://arxiv.org/abs/1705.07874
SRC: Wachter S, Mittelstadt B, Russell C, Counterfactual explanations without opening the black box, Harvard Journal of Law and Technology 31(2), 841 | journal | 2018 | https://doi.org/10.2139/ssrn.3063289
NUM1#maths-u24-35-q1@1: For f(x₁, x₂) = 4x₁ − x₂ with baseline (0, 0) at input (2, 3), what is the Shapley value of x₂? | -3 | 0 |  | For a linear model φ₂ = w₂(x₂ − 0) = −1 × 3 = −3.
M1#maths-u24-35-q2@1: Which explanation method fits a simple model to perturbations around one input? | LIME | Permutation importance across the dataset | Integrated gradients | A global decision tree | PCA | LIME builds a local surrogate weighted by proximity.
M3#maths-u24-35-q3@2: Why can Shapley attributions be misleading when features are strongly correlated? | Evaluating a feature's absence by sampling it independently creates unrealistic inputs, splitting credit arbitrarily | Shapley values ignore features that are correlated with others | Correlation makes all Shapley values exactly zero | Shapley values are always causal, so correlation can't affect them | They can't be misleading, since they satisfy the fairness axioms | Off-manifold perturbations make attributions depend on the chosen conditioning scheme.
`;
