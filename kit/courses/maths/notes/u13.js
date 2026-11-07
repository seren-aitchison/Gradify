// School 13: Statistics. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// From summarising data to inference, testing, regression, Bayesian and computational methods, design and causation.
export default `
## Descriptive Statistics
S: Descriptive statistics summarise data with a few numbers and pictures: where the centre is, how spread out the values are, and what shape they make. Every analysis starts here, because a good summary reveals errors, outliers and patterns.
O: Calculate and choose measures of centre and spread
O: Identify outliers and describe the shape of a distribution
T: Measures of centre | Mean (sum ÷ count), median (middle value) and mode (most common value)
T: Interquartile range | IQR = Q3 − Q1, the spread of the middle half of the data
H: Centre
- The mean uses every value but is pulled by outliers; the median resists them.
- For skewed data (incomes, house prices), the median is usually the better "typical" value.
- The mode suits categorical data: the most common blood group.
H: Spread
- Range = maximum − minimum: simple but sensitive to extremes.
- IQR: robust; pairs with the median.
- Standard deviation: pairs with the mean; s = √(Σ(x − x̄)^{2}/(n − 1)) for a sample.
- An outlier rule: below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR.
H: Shape and pictures
- Histograms show shape; box plots show median, quartiles and outliers; stem-and-leaf keeps the values.
- Right skew: long tail to the right, mean > median. Left skew: the reverse.
- Always plot the data before trusting any summary.
X: Data: 2, 4, 4, 5, 7, 9, 30. Find the mean, the median and the IQR, and check for outliers.
> Mean = 61/7 ≈ 8.71; median = 5 (the 4th of 7 values)
> Q1 = 4 and Q3 = 9 (medians of 2, 4, 4 and 7, 9, 30), so IQR = 5
> Upper fence = 9 + 1.5 × 5 = 16.5, so 30 is an outlier, which is why the mean exceeds the median
K: Use median and IQR for skewed data or outliers, mean and SD for symmetric data; flag outliers with the 1.5 × IQR rule; plot first.
!: Reporting the mean alone for heavily skewed data.
Q: Which measure of centre is resistant to outliers? | The median.
Q: In right-skewed data, which is larger, the mean or the median? | The mean.
SUM: Summaries describe centre, spread and shape.
SUM: Choose robust measures when data are skewed.
SRC: Freedman D, Pisani R, Purves R, Statistics (4th edn, Norton 2007) | textbook | 2007 | https://wwnorton.com/
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
NUM1#maths-u13-01-q1@1: Find the sample standard deviation of 2, 4, 6, to 3 decimal places. | 2 | 0.001 |  | Mean 4; squared deviations 4, 0, 4 sum to 8; s = √(8/2) = 2.
M1#maths-u13-01-q2@1: Which pair of summaries suits house prices best? | Median and interquartile range | Mean and range | Mode and range | Mean and standard deviation | Maximum and minimum | House prices are right-skewed, so robust measures describe them better.
M2#maths-u13-01-q3@2: Q1 = 20 and Q3 = 30. Which value would the 1.5 × IQR rule flag as an outlier? | 46 | 44 | 35 | 15 | 21 | The upper fence is 30 + 15 = 45 and the lower is 5, so only 46 lies outside.

## Correlation
S: Correlation measures the strength and direction of a linear relationship between two variables. It's one of the most used and most misused statistics: a strong correlation doesn't show that one variable causes the other.
O: Calculate and interpret Pearson's and Spearman's correlation coefficients
O: Explain the limitations of correlation, including confounding
T: Pearson's correlation coefficient | r = S_{xy}/√(S_{xx}S_{yy}), between −1 and 1
T: Spearman's rank correlation | Pearson's r applied to the ranks of the data; measures monotonic association
H: Calculating r
- S_{xy} = Σ(x − x̄)(y − ȳ), S_{xx} = Σ(x − x̄)^{2}, S_{yy} = Σ(y − ȳ)^{2}.
- r = 1 or −1: points on a straight line; r near 0: no linear pattern.
- r^{2} is the proportion of variation in y explained by a straight-line fit.
- r has no units and is unchanged by linear rescaling of either variable.
H: Limitations
- r measures linear association only: a perfect curve can have r = 0.
- Outliers can create or destroy a correlation; Anscombe's quartet has four very different data sets with the same r.
- Correlation isn't causation: ice cream sales and drownings both rise in summer (a confounder, temperature).
- Restricting the range (only top students) weakens correlations.
H: Spearman and testing
- Spearman's ρ uses ranks: good for ordinal data or monotonic curves.
- A hypothesis test asks whether the population correlation could be zero; critical values depend on n.
X: Find r for x = 1, 2, 3, 4, 5 and y = 2, 4, 5, 4, 5.
> x̄ = 3, ȳ = 4; deviations: x: −2, −1, 0, 1, 2 and y: −2, 0, 1, 0, 1
> S_{xy} = 4 + 0 + 0 + 0 + 2 = 6; S_{xx} = 10; S_{yy} = 6
> r = 6/√60 ≈ 0.775: a fairly strong positive correlation
P: **Investigate with the lab.** Make r above 0.95, then below −0.9. Then load the curved data where r ≈ 0 although the relationship is strong.
IX: regression
K: r = S_{xy}/√(S_{xx}S_{yy}) measures linear association; r^{2} is variance explained; correlation isn't causation; plot the data.
!: Concluding that one variable causes the other from a correlation alone.
Q: What does r = −0.9 indicate? | A strong negative linear relationship.
Q: When is Spearman's coefficient preferred over Pearson's? | For ranks, ordinal data or monotonic but non-linear relationships.
SUM: Correlation measures linear association.
SUM: It doesn't establish causation.
SRC: Freedman D, Pisani R, Purves R, Statistics (4th edn, Norton 2007) | textbook | 2007 | https://wwnorton.com/
SRC: Anscombe FJ, Graphs in statistical analysis, The American Statistician 27(1), 17 | journal | 1973 | https://doi.org/10.1080/00031305.1973.10478966
NUM1#maths-u13-02-q1@1: S_{xy} = 12, S_{xx} = 16 and S_{yy} = 25. Find r. | 0.6 | 0.001 |  | r = 12/√(16 × 25) = 12/20 = 0.6.
M1#maths-u13-02-q2@1: A correlation of r = 0.8 means a straight line explains what share of the variation in y? | 64% | 80% | 8% | 40% | 89% | The proportion explained is r^{2} = 0.64.
M3#maths-u13-02-q3@2: The points lie exactly on y = x^{2} for x = −2, −1, 0, 1, 2. What is Pearson's r? | 0 | 1 | −1 | 0.5 | It's undefined | The pattern is a perfect symmetric curve with no linear trend, so r = 0.
M2#maths-u13-02-q4@2: Data lie exactly on y = x^{2} for x from −3 to 3. What is the Pearson correlation r, and why? | 0, because r measures only linear association and the pattern is symmetric | 1, because the relationship is perfect | −1, because half the points fall | 0.5 | It can't be computed | Pearson's r detects straight-line trends; a symmetric parabola has none.

## Data Interpretation
S: Data interpretation is reading charts, tables and statistics critically: what they show, what they hide and how they might mislead. It's an essential skill for citizens, journalists, managers and scientists.
O: Read and critique graphs and tables
O: Distinguish relative and absolute risk, and percentages from percentage points
T: Relative risk | The ratio of risks in two groups, such as 1.5 (a 50% increase)
T: Absolute risk | The actual chance of an outcome, such as 3 in 10,000
H: Misleading graphs
- Truncated vertical axes exaggerate small differences; check where the axis starts.
- 3D charts and unequal pictogram areas distort comparisons.
- Dual axes can suggest relationships that aren't there.
- Cumulative charts always rise, which can hide a falling rate.
H: Numbers in context
- Percentage points vs per cent: from 10% to 12% is 2 percentage points but a 20% relative rise.
- Per-capita rates: compare regions by rate, not by total, when populations differ.
- Relative risks sound dramatic; absolute risks tell you what it means for an individual.
- Ask what the denominator is: "half of accidents happen within 3 miles of home" reflects where most driving happens.
H: Hidden structure
- Simpson's paradox: a trend within every group can reverse in the combined data.
- Correlation, confounding and selection effects (later in this school).
- Look for the source, the sample size and the uncertainty.
X: A drug raises the risk of a side effect from 2 in 10,000 to 3 in 10,000. Describe the change in relative and absolute terms.
> Relative risk = 3/2 = 1.5: a 50% increase
> Absolute increase = 1 in 10,000 = 0.01 percentage points
> About 10,000 people would need to take it for one extra side effect (the number needed to harm)
K: Check axes, denominators and units; report absolute as well as relative risk; distinguish per cent from percentage points.
!: Reading a 50% relative increase as a 50% chance of harm.
Q: A rate rises from 4% to 6%. What is the rise in percentage points, and in per cent? | 2 percentage points; a 50% relative rise.
Q: Why compare crime rates per 1,000 people rather than totals? | Areas have different populations.
SUM: Read charts critically.
SUM: Absolute risks give context to relative ones.
SRC: Spiegelhalter D, The Art of Statistics: Learning from Data (Pelican 2019) | textbook | 2019 | https://www.penguin.co.uk/
SRC: Office for Statistics Regulation, Code of Practice for Statistics (edition 2.0) | standard | 2018 | https://code.statisticsauthority.gov.uk/
NUM1#maths-u13-03-q1@1: Unemployment falls from 5.0% to 4.0%. By what percentage has the rate fallen? | 20 | 0 | % | The fall is 1 percentage point, which is 1/5 = 20% of the original rate.
M1#maths-u13-03-q2@1: A bar chart's y-axis starts at 95 instead of 0. What's the risk? | Small differences look large | Bars become hidden | The data are wrong | Large differences look small | Nothing | Truncating the axis exaggerates the visual difference between bars.
M2#maths-u13-03-q3@2: Treatment cuts the risk of an illness from 4% to 3%. What is the relative risk reduction? | 25% | 1% | 3% | 75% | 4% | The fall of 1 point is a quarter of the original 4%.

## Statistics in Everyday Life
S: Statistics shape everyday decisions: inflation figures set pay rises and benefits, polls guide elections, weather forecasts plan days out, and medical risks inform treatment. Knowing how they're produced helps you use them well.
O: Interpret official statistics, polls and forecasts
O: Recognise uncertainty in everyday statistics
T: Margin of error | The likely size of sampling error, often given as ±3 percentage points for a poll of about 1,000
T: Index number | A value relative to a base period set at 100, such as the Consumer Prices Index
H: Official statistics
- Inflation: CPI and CPIH measure price changes of a basket of goods; the Office for National Statistics (ONS) publishes them monthly.
- Unemployment rates come from the Labour Force Survey, a sample, so they have margins of error.
- GDP figures are revised as more data arrive.
H: Polls and forecasts
- A random sample of 1,000 gives a 95% margin of error of about ±3 points for a proportion near 50%.
- Polls can still be wrong because of non-response and turnout, not just sampling.
- A "70% chance of rain" means it rains on about 70% of days with such a forecast: calibration.
H: Personal decisions
- Average salary figures: the mean is pulled up by high earners; the median is more typical.
- Screening tests: a positive result for a rare condition is often a false positive (School 12, Bayes).
- League tables can rank by random variation: check the uncertainty.
X: A poll of 1,000 voters finds 52% support. Find the approximate 95% margin of error.
> Standard error = √(0.52 × 0.48/1000) ≈ √0.00025 ≈ 0.0158
> Margin = 1.96 × 0.0158 ≈ 0.031
> About ±3.1 points: support between roughly 49% and 55%
K: Official figures are estimates with uncertainty; polls of 1,000 have about ±3 points of sampling error; prefer medians for skewed quantities.
!: Treating a poll lead smaller than the margin of error as decisive.
Q: Which organisation publishes UK inflation figures? | The Office for National Statistics (ONS).
Q: What does a well-calibrated "30% chance of rain" mean? | It rains on about 30% of days given that forecast.
SUM: Everyday decisions rest on statistics.
SUM: Every estimate carries uncertainty.
SRC: Office for National Statistics, Consumer price inflation, UK: methods and guidance | guidance | 2025 | https://www.ons.gov.uk/economy/inflationandpriceindices
SRC: British Polling Council, Officers' note on margin of error | guidance | 2024 | https://www.britishpollingcouncil.org/
NUM1#maths-u13-04-q1@1: For a poll of 2,500 with p = 0.5, find the 95% margin of error in percentage points, to 1 decimal place. | 2 | 0.05 | points | 1.96 × √(0.25/2500) = 1.96 × 0.01 = 0.0196, about 2.0 points.
M1#maths-u13-04-q2@1: Why do official earnings releases often quote the median rather than the mean? | Earnings are right-skewed by high earners | The median is easier to compute | The mean is always lower | The median includes more people | Law requires it | A few very high salaries pull the mean above what a typical worker earns.
M2#maths-u13-04-q3@2: A poll's margin of error is ±3 points. Party A has 41% and B 39%. What's the fairest summary? | The race is too close to call from this poll | B is really ahead, after adjusting for error | A is ahead, because 41% is larger than 39% | A leads by 3 points | The poll is wrong | The 2-point gap is within the sampling error.

## Inferential Statistics
S: Inferential statistics draws conclusions about a population from a sample, with a measure of how uncertain those conclusions are. It's how a poll of 1,000 speaks for millions, and how a trial of hundreds tells us whether a drug works.
O: Distinguish populations, samples, parameters and statistics
O: Describe the main tasks of inference: estimation, testing and prediction
T: Parameter | A fixed, usually unknown, number describing a population (such as μ or p)
T: Statistic | A number calculated from a sample (such as x̄ or p̂), used to estimate a parameter
H: Populations and samples
- The population is everything we want to know about; a sample is the part we observe.
- Random sampling lets probability describe how far a statistic is likely to be from the parameter.
- Greek letters for parameters (μ, σ, p) and Roman letters or hats for statistics (x̄, s, p̂).
H: The tasks
- Estimation: a best guess (point estimate) plus a range (confidence interval).
- Hypothesis testing: are the data consistent with a claim?
- Prediction: what will the next observation be?
- Modelling: how do variables relate (regression, later in this school)?
H: Requirements
- Inference is only as good as the sampling: a biased sample gives confident wrong answers.
- Assumptions (independence, distribution shape) should be checked.
- Uncertainty should always be reported, not just a single number.
X: In a random sample of 400 adults, 88 say they cycle weekly. Estimate the population proportion with a 95% confidence interval.
> p̂ = 88/400 = 0.22
> SE = √(0.22 × 0.78/400) ≈ 0.0207
> 0.22 ± 1.96 × 0.0207 ≈ 0.22 ± 0.041: about (0.179, 0.261)
K: Samples estimate population parameters; report estimates with uncertainty; inference relies on random sampling and checked assumptions.
!: Confusing the sample statistic with the population parameter.
Q: Is the mean height of all UK adults a parameter or a statistic? | A parameter.
Q: Name three tasks of statistical inference. | Estimation, hypothesis testing and prediction.
SUM: Inference generalises from samples.
SUM: It always comes with uncertainty.
SRC: Wasserman L, All of Statistics: A Concise Course in Statistical Inference (Springer 2004) | textbook | 2004 | https://link.springer.com/
SRC: Department for Education, Mathematics AS and A level subject content: statistics | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
NUM1#maths-u13-05-q1@1: A sample of 100 has p̂ = 0.5. Find the standard error of p̂. | 0.05 | 0.0001 |  | √(0.5 × 0.5/100) = √0.0025 = 0.05.
M1#maths-u13-05-q2@1: Which is a statistic? | The mean of 50 sampled exam marks | The mean of all exam marks nationally | The true proportion of left-handers | The population variance | The probability of heads for a coin | A statistic is calculated from sample data; the national mean and true proportions are parameters.
M2#maths-u13-05-q3@2: Why does inference need random sampling? | So probability can describe sampling error | So the sample is large | So every result is significant | To avoid calculations | So the sample equals the population | Randomness makes the sample's deviation from the population predictable in distribution.

## Statistical Inference
S: Statistical inference has several frameworks (frequentist, Bayesian and likelihood-based) and a common toolkit for judging estimators: bias, variance, consistency and efficiency. Understanding them explains why we use the formulas we do.
O: Compare estimators using bias, variance and mean squared error
O: Outline the main frameworks for inference
T: Bias | E(θ̂) − θ: how far an estimator is from the truth on average
T: Mean squared error | MSE = E[(θ̂ − θ)^{2}] = Var(θ̂) + bias^{2}
H: Properties of estimators
- Unbiased: E(θ̂) = θ. The sample mean is unbiased for μ.
- Consistent: θ̂ → θ as n → ∞.
- Efficient: smallest variance among unbiased estimators (the Cramér–Rao bound sets the limit).
- Sufficient: captures all the information in the data about θ.
H: The variance divisor
- Σ(x − x̄)^{2}/n has expectation ((n − 1)/n)σ^{2}: it's biased low.
- Dividing by n − 1 gives the unbiased sample variance s^{2}.
- The reason: deviations are measured from x̄, which is fitted to the same data.
H: Frameworks
- Frequentist: parameters are fixed; probability describes repeated sampling.
- Bayesian: parameters have distributions; inference updates a prior with data (later in this school).
- Likelihood: the likelihood function summarises the evidence (maximum likelihood, later in this school).
X: Estimator A is unbiased with variance 4; estimator B has bias 1 and variance 2. Which has the smaller MSE?
> MSE(A) = 4 + 0^{2} = 4
> MSE(B) = 2 + 1^{2} = 3
> B has smaller MSE: a little bias can be worth a big cut in variance
K: Judge estimators by bias, variance, MSE and consistency; s^{2} divides by n − 1 to remove bias; the frameworks differ in what probability means.
!: Assuming an unbiased estimator is always best.
Q: What is the MSE of an estimator with bias 2 and variance 5? | 9.
Q: Why divide by n − 1 in the sample variance? | To make it unbiased for σ^{2}.
SUM: Estimators trade bias against variance.
SUM: Frameworks differ in their meaning of probability.
SRC: Casella G, Berger RL, Statistical Inference (2nd edn, Duxbury 2002) | textbook | 2002 | https://www.cengage.com/
SRC: Wasserman L, All of Statistics: A Concise Course in Statistical Inference (Springer 2004) | textbook | 2004 | https://link.springer.com/
NUM1#maths-u13-06-q1@1: With n = 5, what is E(Σ(x − x̄)^{2}/n) as a multiple of σ^{2}? | 0.8 | 0.001 |  | (n − 1)/n = 4/5 = 0.8.
M1#maths-u13-06-q2@1: Which property means an estimator gets arbitrarily close to the truth with enough data? | Consistency | Unbiasedness | Sufficiency | Robustness | Efficiency at small n | Consistency means θ̂ → θ as n → ∞: more data bring the estimate arbitrarily close.
M2#maths-u13-06-q3@2: Which framework treats an unknown parameter as having a probability distribution? | Bayesian | Frequentist | Likelihood-free | Descriptive | Non-parametric only | Bayesians describe uncertainty about θ with a prior and posterior distribution.

## Sampling Theory
S: Sampling theory designs ways to choose samples so that they represent the population and give precise estimates for a given cost. The design decides what conclusions are possible before any data arrive.
O: Describe the main sampling methods and their uses
O: Calculate the sample size needed for a given margin of error
T: Sampling frame | The list from which a sample is drawn, ideally covering the whole population
T: Stratified sampling | Dividing the population into groups (strata) and sampling randomly within each
H: Methods
- Simple random sampling: every possible sample is equally likely.
- Stratified: sample within strata (such as regions); improves precision and guarantees coverage.
- Cluster: sample whole groups (such as schools), cheaper but less precise.
- Systematic: every kth item from a list; watch for periodic patterns.
- Quota and opportunity samples are non-random, quick and prone to bias.
H: Sample size
- For a proportion with margin of error E at 95%: n = 1.96^{2}p(1 − p)/E^{2}.
- Using p = 0.5 gives the largest (safest) n.
- Halving the margin of error needs four times the sample.
- Precision depends on the sample size, hardly at all on the population size (unless the sample is a large fraction of it).
H: Corrections
- Finite population correction √((N − n)/(N − 1)) when sampling much of a small population.
- Design effects measure how much clustering inflates variance.
- Weighting corrects for unequal selection probabilities.
X: How large a sample gives a 95% margin of error of 3 percentage points for a proportion?
> Use p = 0.5 for the worst case
> n = 1.96^{2} × 0.25/0.03^{2} = 0.9604/0.0009 ≈ 1,067.1
> Round up: n = 1,068
K: Choose the design for precision and cost; n = z^{2}p(1 − p)/E^{2}; precision depends on n, not N; quadruple n to halve the margin.
!: Thinking a sample must be a fixed percentage of the population to be accurate.
Q: What must you do to halve a margin of error? | Quadruple the sample size.
Q: Why use stratified sampling? | To guarantee each subgroup is represented and improve precision.
SUM: Sampling design decides what we can learn.
SUM: Sample size sets precision.
SRC: Lohr SL, Sampling: Design and Analysis (3rd edn, CRC Press 2021) | textbook | 2021 | https://www.routledge.com/
SRC: Cochran WG, Sampling Techniques (3rd edn, Wiley 1977) | textbook | 1977 | https://www.wiley.com/
NUM1#maths-u13-07-q1@1: Find the minimum sample size for a 95% margin of error of 5 points (use p = 0.5). | 385 | 0 |  | 0.9604/0.0025 = 384.2, rounded up to 385.
M1#maths-u13-07-q2@1: A survey picks 20 schools at random and tests every pupil in them. What design is that? | Cluster sampling | Stratified sampling | Systematic sampling | Quota sampling | Simple random sampling of pupils | Whole groups (clusters) are sampled, not individuals.
M3#maths-u13-07-q3@2: A national poll and a city poll each use 1,000 random respondents. How do their margins of error compare? | About the same | The national poll's is much larger | The city poll's is much larger | It depends only on population size | The national poll's is 100 times larger | Precision depends on the sample size, not the population size, when the sample is a small fraction.

## Sampling Distributions
S: A sampling distribution is the distribution of a statistic over all possible samples. It tells us how much an estimate would vary from sample to sample, which is the basis for standard errors, confidence intervals and tests.
O: Describe the sampling distributions of the mean and a proportion
O: Calculate probabilities for sample means using the standard error
T: Sampling distribution | The probability distribution of a statistic, such as x̄, across repeated samples
T: Standard error | The standard deviation of a sampling distribution, such as σ/√n for x̄
H: The sample mean
- E(X̄) = μ and SD(X̄) = σ/√n.
- If the population is normal, X̄ is exactly normal; otherwise the CLT makes it approximately normal for large n.
- With σ unknown, (X̄ − μ)/(S/√n) follows a t-distribution for normal data.
H: Proportions and other statistics
- p̂ has mean p and standard error √(p(1 − p)/n); approximately normal when np and n(1 − p) are both at least about 10.
- (n − 1)S^{2}/σ^{2} ~ χ^{2}_{n−1} for normal data.
- Medians, correlations and complex statistics can have their sampling distributions estimated by simulation or the bootstrap.
H: Simulation
- Drawing many samples on a computer and plotting the statistic shows its sampling distribution directly.
- This is the best way to build intuition, and it's how the bootstrap works.
X: A population has μ = 50 and σ = 12. For samples of 36, find P(X̄ > 53).
> SE = 12/√36 = 2
> z = (53 − 50)/2 = 1.5
> P(X̄ > 53) ≈ P(Z > 1.5) ≈ 0.0668
P: **Investigate with the lab.** Plot sample means for n = 1, 4 and 30 and compare their spread with σ/√n each time.
IX: clt
K: X̄ has mean μ and SE σ/√n; p̂ has SE √(p(1 − p)/n); sampling distributions underpin all inference.
!: Using σ instead of σ/√n when finding probabilities for a sample mean.
Q: What is the standard error of x̄ for σ = 10 and n = 25? | 2.
Q: What does a sampling distribution describe? | How a statistic varies across repeated samples.
SUM: Statistics vary from sample to sample.
SUM: The standard error measures that variation.
SRC: Wasserman L, All of Statistics: A Concise Course in Statistical Inference (Springer 2004) | textbook | 2004 | https://link.springer.com/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u13-08-q1@1: For p = 0.3 and n = 84, find the standard error of p̂, to 3 decimal places. | 0.05 | 0.001 |  | √(0.3 × 0.7/84) = √0.0025 = 0.05.
M1#maths-u13-08-q2@1: How does the standard error of the mean change if n increases from 25 to 100? | It halves | It quarters | It doubles | It stays the same | It falls by 75 | The standard error is proportional to 1/√n; quadrupling n divides it by √4 = 2.
M2#maths-u13-08-q3@2: When is the sampling distribution of X̄ exactly normal for any n? | When the population itself is normal | Never | Only when n > 30 | When the population is uniform | When σ is unknown | Linear combinations of normal variables are normal at every sample size.
NUM1#maths-u13-08-q4@1: Quadrupling the sample size changes the standard error of the mean by what factor? | 0.5 | 0 |  | The standard error is σ/√n, so 4n gives σ/(2√n): half as large.

## Sampling Bias
S: Sampling bias happens when the way a sample is chosen makes it unrepresentative. Unlike random error, bias doesn't shrink with a larger sample, and a huge biased sample can be confidently wrong.
O: Identify common sources of sampling bias
O: Explain why larger samples don't fix bias
T: Selection bias | Systematic differences between those sampled and the population
T: Non-response bias | Bias arising because people who respond differ from those who don't
H: Sources
- Undercoverage: the sampling frame misses groups (people without landlines, the homeless).
- Voluntary response: those with strong views are more likely to reply (phone-in polls).
- Non-response: busy or disengaged people don't answer.
- Survivorship: studying only survivors (successful firms, returning aircraft).
- Convenience: sampling whoever's easiest to reach.
H: Classic cases
- 1936: the Literary Digest polled about 2.4 million people from car and telephone lists and predicted a Landon win; Roosevelt won by a landslide.
- Second World War: Abraham Wald advised armouring where returning planes had no bullet holes, since planes hit there didn't return.
- UK 2015 general election polls overstated Labour, partly because samples had too many politically engaged people.
H: Remedies
- Random sampling from a good frame; follow-up of non-responders.
- Weighting to known population totals (age, sex, region).
- Report response rates and consider worst-case bounds.
X: 1,000 customers are surveyed; 400 respond and 60% of them are satisfied. Bound the satisfaction rate among all 1,000.
> 240 respondents are satisfied
> If all 600 non-respondents are dissatisfied: 240/1000 = 24%
> If all are satisfied: 840/1000 = 84%; non-response leaves a wide range
K: Bias comes from how the sample is chosen; it doesn't shrink with n; random selection, follow-up and weighting reduce it.
!: Believing a very large sample must be accurate.
Q: Does doubling a biased sample remove the bias? | No: it only reduces random error.
Q: What is survivorship bias? | Drawing conclusions only from cases that survived some selection.
SUM: Bias is systematic error from selection.
SUM: Large samples don't cure it.
SRC: Squire P, Why the 1936 Literary Digest poll failed, Public Opinion Quarterly 52(1), 125 | journal | 1988 | https://doi.org/10.1086/269085
SRC: Sturgis P et al, Report of the inquiry into the 2015 British general election opinion polls (British Polling Council and Market Research Society 2016) | report | 2016 | https://www.britishpollingcouncil.org/
NUM1#maths-u13-09-q1@1: 300 of 500 people respond; 50% of respondents agree. What is the lowest possible agreement rate among all 500, in per cent? | 30 | 0 | % | 150 agree; if all 200 non-respondents disagree, 150/500 = 30%.
M1#maths-u13-09-q2@1: A radio phone-in asks listeners to call with views on a policy. What's the main problem? | Voluntary response bias | Too small a sample | Stratification | Random error only | No problem | Those who choose to call tend to hold stronger views than typical listeners.
M2#maths-u13-09-q3@2: Why did Wald recommend armouring the parts of returning aircraft with no bullet holes? | Planes hit there didn't return | Those parts were heaviest | Holes were random | Pilots asked for it | The engines had holes | The returning sample was biased towards survivable hits: survivorship bias.

## Confidence Intervals
S: A confidence interval gives a range of plausible values for a parameter, with a stated confidence level. It shows both the estimate and its uncertainty, and it's more informative than a yes-or-no test.
O: Construct confidence intervals for means and proportions
O: Interpret a confidence interval correctly
T: Confidence interval | An interval, calculated from data, that would contain the parameter in a stated proportion (such as 95%) of repeated samples
T: Confidence level | The long-run proportion of such intervals that contain the parameter
H: Construction
- Estimate ± critical value × standard error.
- Mean, σ known: x̄ ± z*σ/√n. Mean, σ unknown: x̄ ± t*s/√n with n − 1 degrees of freedom.
- Proportion: p̂ ± z*√(p̂(1 − p̂)/n), adequate when n is reasonably large; better (Wilson) intervals exist.
H: Interpretation
- "95% confident" refers to the method: 95% of intervals built this way capture the true value.
- For a given interval, the parameter is either in it or not; the 95% isn't a probability about this one interval (in the frequentist view).
- Wider intervals: higher confidence or smaller samples. Width ∝ 1/√n.
H: Links
- A 95% interval excluding a value corresponds to rejecting that value in a two-sided 5% test.
- Bayesian credible intervals do have the direct probability interpretation (later in this school).
X: A sample of 50 has x̄ = 12.4 with known σ = 3. Find a 95% confidence interval for μ.
> SE = 3/√50 ≈ 0.424
> Margin = 1.96 × 0.424 ≈ 0.832
> Interval ≈ (11.57, 13.23)
K: Estimate ± critical value × SE; the confidence level describes the method's long-run success; width shrinks like 1/√n.
!: Saying "there's a 95% probability that μ lies in this particular interval" in a frequentist analysis.
Q: Which critical value is used for a 99% normal interval? | 2.576.
Q: What happens to an interval's width when n is multiplied by 4? | It halves.
SUM: Intervals show estimates with uncertainty.
SUM: Confidence describes the method.
SRC: Altman DG, Machin D, Bryant TN, Gardner MJ, Statistics with Confidence (2nd edn, BMJ Books 2000) | textbook | 2000 | https://www.wiley.com/
SRC: Wasserman L, All of Statistics: A Concise Course in Statistical Inference (Springer 2004) | textbook | 2004 | https://link.springer.com/
NUM1#maths-u13-10-q1@1: A 95% interval for a mean is (18.2, 21.8). What is the point estimate? | 20 | 0 |  | The interval is symmetric about the estimate: (18.2 + 21.8)/2 = 20.
M1#maths-u13-10-q2@1: Which change makes a confidence interval narrower? | Increasing the sample size | Raising the confidence level to 99% | Using a smaller sample | Having more variable data | Using t instead of z for small n | Width is proportional to σ/√n, so more data narrows it.
M2#maths-u13-10-q3@2: A 95% interval for a difference in means is (−1.2, 3.4). What does a two-sided 5% test of "no difference" conclude? | Don't reject: 0 is inside the interval | Reject: the interval is wide | Reject: the upper limit is positive | Accept that the difference is exactly 0 | Nothing can be said | Values inside the 95% interval are not rejected at the 5% level.

## Maximum Likelihood Estimation
S: Maximum likelihood estimation chooses the parameter values that make the observed data most probable. It's the most widely used estimation method, with excellent large-sample properties, and it underlies regression, GLMs and much of machine learning.
O: Write down a likelihood and find the maximum likelihood estimate
O: State the main properties of maximum likelihood estimators
T: Likelihood | L(θ) = Π f(x_{i}; θ), the probability (or density) of the data as a function of θ
T: Maximum likelihood estimate (MLE) | The θ̂ that maximises L(θ), usually found by setting the derivative of ln L to zero
H: Method
- Write L(θ), take logs (products become sums), differentiate, set to zero and solve; check it's a maximum.
- Binomial: x successes in n trials give p̂ = x/n.
- Poisson: λ̂ = x̄. Exponential: λ̂ = 1/x̄. Normal: μ̂ = x̄ and σ̂^{2} = Σ(x − x̄)^{2}/n.
H: Properties
- Consistent and asymptotically normal, with variance from the Fisher information: Var(θ̂) ≈ 1/I(θ).
- Asymptotically efficient: no consistent estimator does better in large samples.
- Invariant: the MLE of g(θ) is g(θ̂).
- Can be biased in small samples (the normal variance divides by n).
H: In practice
- Most models need numerical maximisation (Newton's method, gradient methods; School 18).
- Likelihood ratio tests compare models; AIC = 2k − 2 ln L penalises extra parameters.
- Fisher developed the method in the 1910s and 1920s.
X: Waiting times 2, 3 and 5 minutes are modelled as exponential(λ). Find the MLE of λ.
> L(λ) = λ^{3}e^{−10λ}, so ln L = 3 ln λ − 10λ
> d/dλ: 3/λ − 10 = 0
> λ̂ = 0.3 per minute (= 1/x̄)
K: Maximise ln L; standard results: p̂ = x/n, λ̂ = x̄ (Poisson), μ̂ = x̄; MLEs are consistent, efficient and invariant.
!: Maximising L without taking logs and getting lost in product rule algebra.
Q: What is the MLE of p after 7 successes in 20 trials? | 0.35.
Q: What does the invariance property say? | The MLE of g(θ) is g(θ̂).
SUM: MLE picks the parameter that best explains the data.
SUM: It's efficient in large samples.
SRC: Casella G, Berger RL, Statistical Inference (2nd edn, Duxbury 2002) | textbook | 2002 | https://www.cengage.com/
SRC: Fisher RA, On the mathematical foundations of theoretical statistics, Philosophical Transactions of the Royal Society A 222, 309 | journal | 1922 | https://doi.org/10.1098/rsta.1922.0009
NUM1#maths-u13-11-q1@1: Counts of 2, 5, 3 and 6 are modelled as Poisson(λ). Find the MLE of λ. | 4 | 0 |  | For the Poisson, λ̂ = x̄ = 16/4 = 4.
M1#maths-u13-11-q2@1: Why do we usually maximise the log-likelihood rather than the likelihood? | Logs turn products into sums with the same maximum | The log-likelihood is always larger | Likelihoods can't be maximised | Logs remove the parameter | It gives a different, better answer | ln is increasing, so the maximiser is unchanged and the algebra is simpler.
M3#maths-u13-11-q3@2: The MLE of a normal σ^{2} is 9. What is the MLE of σ? | 3 | 9 | 81 | 4.5 | It must be found separately | By invariance, the MLE of √(σ^{2}) is √9 = 3.

## Method of Moments
S: The method of moments estimates parameters by matching the sample's moments (mean, variance, …) to the model's theoretical moments. It's simple and often gives closed-form answers, though usually less efficient than maximum likelihood.
O: Find method of moments estimators for common distributions
O: Compare method of moments with maximum likelihood
T: Method of moments | Set E(X^{k}) = (1/n)Σx_{i}^{k} for k = 1, 2, … and solve for the parameters
T: Sample moment | (1/n)Σx_{i}^{k}, the sample version of E(X^{k})
H: Method
- One parameter: match the mean. Two parameters: match the mean and variance.
- Uniform(0, θ): E(X) = θ/2, so θ̂ = 2x̄.
- Gamma(k, λ): mean k/λ and variance k/λ^{2} give k̂ = x̄^{2}/s^{2} and λ̂ = x̄/s^{2}.
H: Strengths and weaknesses
- Quick, closed-form and a good starting point for numerical MLE.
- Usually less efficient than MLE.
- Can give impossible values: for Uniform(0, θ), 2x̄ can be below the largest observation.
H: Generalisations
- Karl Pearson introduced it in 1894 to fit mixtures of normals to crab measurements.
- The generalised method of moments (GMM) is central in econometrics (Hansen, Nobel 2013).
X: Data 1, 4 and 7 come from Uniform(0, θ). Find the method of moments estimate, and comment.
> x̄ = 4 and E(X) = θ/2
> θ̂ = 2 × 4 = 8
> It's consistent with the data (8 > 7); the MLE would be the maximum, 7
K: Match sample moments to theoretical ones and solve; simple and closed-form; often less efficient than MLE and can give impossible values.
!: Matching too few moments for the number of unknown parameters.
Q: What is the method of moments estimator of θ for Uniform(0, θ)? | 2x̄.
Q: Who introduced the method of moments? | Karl Pearson (1894).
SUM: Match moments, solve for parameters.
SUM: Quick but often less efficient.
SRC: Casella G, Berger RL, Statistical Inference (2nd edn, Duxbury 2002) | textbook | 2002 | https://www.cengage.com/
SRC: Hansen LP, Large sample properties of generalized method of moments estimators, Econometrica 50(4), 1029 | journal | 1982 | https://doi.org/10.2307/1912775
NUM1#maths-u13-12-q1@1: Data have mean 6 and variance 12 and are modelled as Gamma(k, λ). Find the method of moments estimate of k. | 3 | 0 |  | k̂ = x̄^{2}/s^{2} = 36/12 = 3 (and λ̂ = 6/12 = 0.5).
M1#maths-u13-12-q2@1: How many moment equations do you need for a two-parameter model? | Two | One | Three | As many as data points | None | Each unknown parameter needs its own equation.
M2#maths-u13-12-q3@2: Compared with maximum likelihood, the method of moments is usually… | simpler but less efficient | always more accurate | impossible for the normal | identical in every case | slower to compute | It gives easy closed forms, but MLE typically has smaller variance.

## Hypothesis Testing
S: A hypothesis test asks whether data are consistent with a claim about a population. It sets up a null hypothesis, measures how surprising the data would be if it were true, and decides whether the evidence is strong enough to reject it.
O: Set up hypotheses and carry out a test using a critical region or p-value
O: State conclusions in context with appropriate caution
T: Null hypothesis | H₀, the default claim (no effect, no difference) tested against the data
T: Significance level | α, the threshold probability of wrongly rejecting a true H₀, often 5%
H: The steps
- State H₀ and H₁ (one-tailed: p > 0.5; two-tailed: p ≠ 0.5).
- Choose α and a test statistic with a known distribution under H₀.
- Find the p-value (or critical region) and compare with α.
- Conclude in context: "there is sufficient evidence at the 5% level that…".
H: Critical regions
- The set of values of the test statistic that lead to rejection.
- For discrete tests the actual significance level is at most α, not exactly α.
- Two-tailed tests split α between the tails.
H: Language and caution
- "Fail to reject H₀" isn't "H₀ is true": absence of evidence isn't evidence of absence.
- Statistical significance isn't practical importance.
- Decide the test and α before seeing the data.
X: A coin is tossed 20 times and gives 15 heads. Test at 5% whether it's biased towards heads.
> H₀: p = 0.5, H₁: p > 0.5; X ~ B(20, 0.5) under H₀
> P(X ≥ 15) = (15,504 + 4,845 + 1,140 + 190 + 20 + 1)/2^{20} = 21,700/1,048,576 ≈ 0.0207
> 0.0207 < 0.05: reject H₀; there's evidence at the 5% level that the coin favours heads
K: State H₀ and H₁, choose α, compute the p-value or critical region, and conclude in context without overclaiming.
!: Writing "H₀ is true" when the test fails to reject it.
Q: What is a two-tailed test? | One where H₁ allows a difference in either direction.
Q: What does "significant at the 5% level" mean? | The p-value is below 0.05.
SUM: Tests weigh data against a null claim.
SUM: Conclude cautiously and in context.
SRC: Department for Education, Mathematics AS and A level subject content: statistics | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-mathematics
SRC: Casella G, Berger RL, Statistical Inference (2nd edn, Duxbury 2002) | textbook | 2002 | https://www.cengage.com/
NUM1#maths-u13-13-q1@1: Under H₀: p = 0.5 with n = 10, find P(X ≥ 9), to 4 decimal places. | 0.0107 | 0.0001 |  | (C(10, 9) + C(10, 10))/2^{10} = 11/1024 ≈ 0.0107.
M1#maths-u13-13-q2@1: A test gives p = 0.12 at α = 0.05. What is the correct conclusion? | There's insufficient evidence to reject H₀ | H₀ is proved true | H₁ is proved true | Reject H₀, since 0.12 is a small probability | The test is invalid | A p-value above α means the data aren't surprising enough to reject H₀.
M2#maths-u13-13-q3@2: For a two-tailed test at 5% using a normal statistic, what are the critical values? | ±1.96 | ±1.645 | ±2.576 | +1.96 only | ±0.05 | A two-tailed 5% test puts 2.5% in each tail, beyond ±1.96 for the standard normal.

## Null Hypothesis Significance Testing
S: Null hypothesis significance testing (NHST) is the standard ritual of declaring results "significant" when p < 0.05. Its overuse and misuse contributed to the replication crisis, so modern practice adds effect sizes, intervals and better study design.
O: Describe how NHST combines Fisher's and Neyman–Pearson's ideas
O: Explain the main criticisms of NHST and better practices
T: NHST | The practice of testing a null hypothesis and calling results significant if p < α
T: Replication crisis | The finding that many published results, especially in psychology and medicine, fail to replicate
H: Origins
- Fisher used p-values as a continuous measure of evidence against H₀.
- Neyman and Pearson framed testing as a decision between hypotheses, controlling error rates α and β.
- NHST is a hybrid of the two that neither founder fully endorsed.
H: Problems
- Dichotomising at 0.05 discards information: p = 0.049 and p = 0.051 are nearly identical evidence.
- With huge samples, trivial effects become significant; with small ones, real effects are missed.
- Publication bias and p-hacking (trying analyses until p < 0.05) inflate false positives.
- The Open Science Collaboration (2015) replicated only about 36% of 100 psychology findings at p < 0.05.
H: Better practice
- Report effect sizes and confidence intervals, not just p.
- Pre-register hypotheses and analyses; publish null results.
- Plan sample sizes with power analysis; consider Bayesian methods.
X: A one-sample z-test uses n = 1,000,000 and finds a mean difference of 0.01 standard deviations. Is it significant, and does it matter?
> z = 0.01 × √1,000,000 = 0.01 × 1000 = 10
> p is astronomically small: highly significant
> But an effect of 0.01 SD is negligible in practice: significance isn't importance
K: NHST is a hybrid ritual; a threshold p-value discards information; report effect sizes and intervals, plan power and pre-register.
!: Equating "statistically significant" with "important".
Q: What is p-hacking? | Trying multiple analyses until one gives p < 0.05.
Q: Name one practice that reduces false positives in research. | Pre-registering hypotheses and analysis plans.
SUM: NHST is widely used and widely misused.
SUM: Effect sizes and design matter more.
SRC: Wasserstein RL, Lazar NA, The ASA statement on p-values: context, process, and purpose, The American Statistician 70(2), 129 | journal | 2016 | https://doi.org/10.1080/00031305.2016.1154108
SRC: Open Science Collaboration, Estimating the reproducibility of psychological science, Science 349(6251), aac4716 | journal | 2015 | https://doi.org/10.1126/science.aac4716
M1#maths-u13-14-q1@1: What is publication bias? | Significant results are more likely to be published than null results | Peer review rejects most studies | Results are always reported accurately | Authors cite their own work | Journals prefer to publish longer, more detailed papers | Selective publication makes the literature overstate effects.
M2#maths-u13-14-q2@2: Why can a tiny effect be statistically significant? | With a very large sample, the standard error is tiny | Because α is too small | Because p-values are always small | Because the effect is large | It can't be | The test statistic grows with √n for any fixed non-zero effect.

## P-Values
S: A p-value is the probability, assuming the null hypothesis is true, of getting data at least as extreme as those observed. It measures how surprising the data are under H₀, and it's frequently misinterpreted.
O: Calculate p-values for one- and two-tailed tests
O: Interpret p-values correctly, following the ASA principles
T: p-value | P(data at least as extreme as observed | H₀ true)
T: One- and two-tailed p-values | One tail for a directional H₁; both tails (often doubled) for a two-sided H₁
H: Calculating
- z-test: one-tailed p = P(Z ≥ z); two-tailed p = 2P(Z ≥ |z|).
- Binomial and other discrete tests: add probabilities of results at least as extreme.
- Software reports p-values directly; know which tail it uses.
H: What a p-value isn't
- It isn't the probability that H₀ is true.
- It isn't the probability the result happened "by chance".
- A large p-value doesn't show H₀ is true; it may reflect a small sample.
- It doesn't measure the size or importance of an effect.
H: The ASA statement (2016)
- p-values indicate incompatibility of data with a specified model.
- Scientific conclusions shouldn't rest on a threshold alone.
- Proper inference requires full reporting and transparency.
- By itself, a p-value doesn't provide a good measure of evidence about a model or hypothesis.
X: A two-sided z-test gives z = 2.3. Find the p-value.
> P(Z ≥ 2.3) = 1 − Φ(2.3) ≈ 1 − 0.9893 = 0.0107
> Two-sided: double it
> p ≈ 0.0214: significant at 5% but not at 1%
K: A p-value is P(this extreme or more | H₀); double one tail for two-sided tests; it isn't P(H₀ true) or an effect size.
!: Reading p = 0.03 as "a 3% chance the null hypothesis is true".
Q: Which is larger for the same z, the one- or two-tailed p-value? | The two-tailed (double the one-tailed).
Q: Does p = 0.4 show that H₀ is true? | No: it shows only that the data aren't surprising under H₀.
SUM: A p-value measures surprise under H₀.
SUM: It's not the probability H₀ is true.
SRC: Wasserstein RL, Lazar NA, The ASA statement on p-values: context, process, and purpose, The American Statistician 70(2), 129 | journal | 2016 | https://doi.org/10.1080/00031305.2016.1154108
SRC: Greenland S et al, Statistical tests, P values, confidence intervals, and power: a guide to misinterpretations, European Journal of Epidemiology 31, 337 | journal | 2016 | https://doi.org/10.1007/s10654-016-0149-3
NUM1#maths-u13-15-q1@1: A one-tailed z-test gives z = 1.8. Find the p-value, to 4 decimal places. | 0.0359 | 0.0005 |  | P(Z ≥ 1.8) = 1 − 0.9641 = 0.0359.
M1#maths-u13-15-q2@1: Which statement about p = 0.02 is correct? | Data this extreme would occur 2% of the time if H₀ were true | There's a 2% chance H₀ is true | There's a 98% chance H₁ is true | The effect is large | The result will replicate 98% of the time | That's the definition: a probability computed assuming H₀.
M3#maths-u13-15-q3@2: Two studies test the same effect: A (n = 20) has p = 0.30, B (n = 2,000) has p = 0.30. Which conclusion is fairest? | Both lack evidence against H₀, but B more strongly suggests any effect is small | Both prove no effect | A proves no effect, while B is inconclusive | B shows a large effect | They contradict each other | Equal p-values with very different n mean different things about plausible effect sizes.

## Type I and Type II Errors
S: Every test can go wrong in two ways: rejecting a true null hypothesis (a Type I error, a false alarm) or failing to reject a false one (a Type II error, a missed effect). Choosing a test means balancing the two.
O: Define and calculate the probabilities of Type I and Type II errors
O: Explain the trade-off between them in real decisions
T: Type I error | Rejecting H₀ when it's true; probability α
T: Type II error | Not rejecting H₀ when it's false; probability β
H: The two errors
- α is set by the significance level; β depends on the true parameter value, the sample size and α.
- Lowering α (being stricter) raises β, unless the sample size grows.
- Power = 1 − β: the chance of detecting a real effect (next lesson).
H: Calculating
- α: P(test statistic in the critical region | H₀ true).
- β: P(test statistic not in the critical region | a specific alternative is true).
- For discrete tests, the actual α is the probability of the critical region, which may be below the nominal level.
H: Consequences
- In a criminal trial, H₀ is innocence: a Type I error convicts an innocent person; a Type II error acquits a guilty one. Courts set a very small α.
- In screening, a Type I error is a false positive (anxiety, further tests); a Type II is a missed case.
- The balance depends on the costs of each error.
X: IQ scores have σ = 15. With n = 25, we test H₀: μ = 100 against H₁: μ > 100 and reject if x̄ > 105. Find α, and β if μ = 110.
> SE = 15/5 = 3. α = P(X̄ > 105 | μ = 100) = P(Z > 1.667) ≈ 0.048
> β = P(X̄ ≤ 105 | μ = 110) = P(Z ≤ −1.667) ≈ 0.048
> So the power against μ = 110 is about 0.952
K: Type I: false rejection (α); Type II: missed effect (β); reducing one raises the other unless n increases; weigh their costs.
!: Thinking β is fixed by α: it depends on the true value and the sample size.
Q: What is a Type I error in a fire alarm? | The alarm sounds with no fire.
Q: How can both α and β be reduced? | Increase the sample size.
SUM: Tests can make false alarms or misses.
SUM: Their balance depends on costs and sample size.
SRC: Casella G, Berger RL, Statistical Inference (2nd edn, Duxbury 2002) | textbook | 2002 | https://www.cengage.com/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u13-16-q1@1: A test rejects H₀: p = 0.5 if X ≥ 9 in 10 trials. What is the actual probability of a Type I error, to 4 decimal places? | 0.0107 | 0.0001 |  | P(X ≥ 9 | p = 0.5) = 11/1024 ≈ 0.0107.
M1#maths-u13-16-q2@1: A screening test misses a patient who has the disease. Which error is that, if H₀ is "no disease"? | Type II | Type I | Both | Neither | A sampling error | Failing to reject a false H₀ (missing the disease) is a Type II error.
M2#maths-u13-16-q3@2: What happens to β if α is reduced from 5% to 1% with the same sample? | β increases | β decreases | β stays the same | β becomes 0 | β becomes 1% | A stricter rejection rule makes it harder to detect real effects.

## Statistical Power
S: Statistical power is the probability that a test detects an effect that's really there. Underpowered studies waste resources, miss real effects and, when they do find something, tend to exaggerate it.
O: Explain what affects power
O: Calculate the sample size needed for a target power
T: Power | 1 − β, the probability of rejecting H₀ when a specified alternative is true
T: Power analysis | Calculating the sample size needed to achieve a chosen power for a chosen effect size
H: What affects power
- Larger effect size: more power.
- Larger sample size: more power.
- Less variability: more power.
- Larger α or a one-tailed test (when justified): more power.
H: Sample size
- For comparing a mean with μ₀ (two-sided, known σ): n = ((z_{α/2} + z_{β})σ/δ)^{2}, where δ is the smallest effect worth detecting.
- Convention: power 80% (z_{β} = 0.8416) and α = 5% (z = 1.96).
- Two-group comparisons need roughly twice as many per group, as both means are estimated.
H: Why it matters
- Funders and ethics committees require power calculations.
- Low power plus publication bias produces exaggerated effects (the "winner's curse").
- Post hoc power calculated from the observed effect adds nothing to the p-value.
X: How many observations are needed to detect a mean difference of 5 with σ = 15, α = 5% two-sided and 80% power?
> z_{α/2} + z_{β} = 1.96 + 0.8416 = 2.8016
> (2.8016 × 15/5)^{2} = 8.405^{2} ≈ 70.6
> Round up: n = 71
K: Power rises with effect size, n and α and falls with variability; n = ((z_{α/2} + z_{β})σ/δ)^{2}; plan power before collecting data.
!: Computing "observed power" after a non-significant result and treating it as new information.
Q: What is the conventional target power? | 80%.
Q: Does power increase or decrease with more variable data? | It decreases.
SUM: Power is the chance of detecting a real effect.
SUM: Plan sample sizes to achieve it.
SRC: Cohen J, Statistical Power Analysis for the Behavioral Sciences (2nd edn, Lawrence Erlbaum 1988) | textbook | 1988 | https://www.routledge.com/
SRC: Button KS et al, Power failure: why small sample size undermines the reliability of neuroscience, Nature Reviews Neuroscience 14, 365 | journal | 2013 | https://doi.org/10.1038/nrn3475
NUM1#maths-u13-17-q1@1: Using n = ((z_{α/2} + z_{β})σ/δ)^{2} with z-values summing to 2.8, σ = 10 and δ = 4, find n (round up). | 49 | 0 |  | (2.8 × 10/4)^{2} = 7^{2} = 49.
M1#maths-u13-17-q2@1: Which change increases a test's power? | A larger sample | A smaller effect size | A smaller α | More variable data | Fewer observations | More data shrink the standard error, making a fixed effect easier to detect.
M3#maths-u13-17-q3@2: An underpowered study reports a significant effect. Why might the estimate be too large? | Only overestimates cross the significance threshold when power is low | Significant results are always exact | Significance guarantees accuracy | Power doesn't affect estimates | Small studies always overestimate every effect they measure | With low power, only the luckiest (largest) estimates reach significance: the winner's curse.

## Effect Sizes
S: An effect size measures how big a difference or relationship is, independently of sample size. It answers the question that matters in practice, "how much?", which a p-value can't.
O: Calculate Cohen's d, risk differences and numbers needed to treat
O: Interpret effect sizes with their confidence intervals
T: Cohen's d | Standardised mean difference: (x̄₁ − x̄₂)/s_{pooled}
T: Number needed to treat | NNT = 1/(absolute risk reduction), the number of people treated for one to benefit
H: Standardised differences
- Cohen's d: rough guides 0.2 small, 0.5 medium, 0.8 large (context matters more than labels).
- Correlation r and r^{2} as effect sizes for relationships.
- η^{2} (eta-squared) for ANOVA: the proportion of variance explained by groups.
H: Risk-based effect sizes
- Absolute risk reduction (ARR): control risk − treatment risk.
- Relative risk (RR) and odds ratio (OR).
- NNT = 1/ARR is intuitive for clinical decisions.
H: Reporting
- Give the effect size with a confidence interval.
- Meta-analysis combines effect sizes across studies (later in this school).
- The minimal clinically important difference sets what size of effect matters.
X: Group means are 75 and 70 with pooled SD 10. In a trial, 20% of controls and 15% of treated patients have a stroke. Find d and the NNT.
> d = (75 − 70)/10 = 0.5, a medium effect
> ARR = 0.20 − 0.15 = 0.05
> NNT = 1/0.05 = 20: treat 20 people to prevent one stroke
K: Effect sizes measure magnitude; report d, r, ARR, RR or OR with confidence intervals; NNT = 1/ARR.
!: Reporting only a p-value with no effect size.
Q: What is Cohen's d if the means differ by 3 and the pooled SD is 6? | 0.5.
Q: What is the NNT if the ARR is 2%? | 50.
SUM: Effect sizes say how big an effect is.
SUM: NNT makes risk reductions concrete.
SRC: Cohen J, Statistical Power Analysis for the Behavioral Sciences (2nd edn, Lawrence Erlbaum 1988) | textbook | 1988 | https://www.routledge.com/
SRC: Cook RJ, Sackett DL, The number needed to treat: a clinically useful measure of treatment effect, BMJ 310, 452 | journal | 1995 | https://doi.org/10.1136/bmj.310.6977.452
NUM1#maths-u13-18-q1@1: Control risk is 12% and treatment risk 8%. Find the NNT. | 25 | 0 |  | ARR = 0.04, so NNT = 1/0.04 = 25.
M1#maths-u13-18-q2@1: Why report an effect size as well as a p-value? | The p-value doesn't show how large the effect is | Effect sizes replace sample sizes | p-values are always wrong | Effect sizes prove causation | Journals require two numbers | A tiny effect can be significant with enough data; the effect size shows its magnitude.
M2#maths-u13-18-q3@2: By Cohen's rough guide, what is d = 0.8? | Large | Small | Medium | Negligible | Impossible | Cohen suggested 0.2, 0.5 and 0.8 as small, medium and large, with context mattering most.

## Multiple Testing Correction
S: When many hypotheses are tested, some will be "significant" by chance alone. Multiple testing corrections adjust the thresholds so that the chance of any false positive, or the proportion of them, stays under control.
O: Calculate the family-wise error rate for several tests
O: Apply the Bonferroni and Holm corrections
T: Family-wise error rate | FWER, the probability of at least one Type I error among all the tests
T: Bonferroni correction | Testing each of m hypotheses at α/m, which keeps the FWER ≤ α
H: The problem
- With m independent tests at α = 0.05, P(at least one false positive) = 1 − 0.95^{m}.
- 20 tests: 1 − 0.95^{20} ≈ 0.64; a "significant" finding is likely even with no real effects.
- It arises with many outcomes, subgroups, time points or variables (and with p-hacking).
H: Corrections
- Bonferroni: use α/m for each test (or multiply p-values by m). Simple, valid under any dependence, but conservative.
- Holm: order p-values; compare the smallest with α/m, the next with α/(m − 1), and so on, stopping at the first failure. Uniformly more powerful than Bonferroni.
- Tukey's method for all pairwise comparisons after ANOVA.
H: Choosing
- Control the FWER when any false positive is costly (confirmatory trials).
- Control the false discovery rate when screening many hypotheses (next lesson).
- Pre-specify the primary outcome to avoid the problem.
X: A study tests 20 independent outcomes at the 5% level with no real effects. Find the chance of at least one significant result, and the Bonferroni threshold.
> P(no false positives) = 0.95^{20} ≈ 0.358
> P(at least one) ≈ 0.642
> Bonferroni: test each at 0.05/20 = 0.0025
K: Many tests inflate false positives: FWER = 1 − (1 − α)^{m}; Bonferroni uses α/m; Holm is a more powerful step-down version.
!: Highlighting the one significant result out of 20 without any correction.
Q: What is the Bonferroni threshold for 10 tests at α = 0.05? | 0.005.
Q: Is Holm's method more or less powerful than Bonferroni's? | More powerful, with the same FWER guarantee.
SUM: Many tests produce chance findings.
SUM: Corrections control the error rate.
SRC: Bland JM, Altman DG, Multiple significance tests: the Bonferroni method, BMJ 310, 170 | journal | 1995 | https://doi.org/10.1136/bmj.310.6973.170
SRC: Holm S, A simple sequentially rejective multiple test procedure, Scandinavian Journal of Statistics 6(2), 65 | journal | 1979 | https://www.jstor.org/stable/4615733
NUM1#maths-u13-19-q1@1: Five independent tests are each run at α = 0.05 with all nulls true. Find the FWER, to 4 decimal places. | 0.2262 | 0.0005 |  | 1 − 0.95^{5} ≈ 1 − 0.7738 = 0.2262.
M1#maths-u13-19-q2@1: With Holm's method for 4 tests at α = 0.05, what threshold does the smallest p-value face? | 0.0125 | 0.05 | 0.0167 | 0.025 | 0.2 | The smallest is compared with α/m = 0.05/4.
M2#maths-u13-19-q3@2: Why is the Bonferroni correction called conservative? | It controls the FWER at or below α, often well below, losing power | It increases false positives | It ignores the number of tests | It only works for independent tests | It uses larger thresholds, so it rejects more often | Dividing α by m guarantees control but often rejects fewer than necessary.

## False Discovery Rate
S: The false discovery rate (FDR) is the expected proportion of false positives among the results declared significant. Controlling it, rather than the chance of any false positive, keeps power when thousands of hypotheses are screened, as in genomics.
O: Define the false discovery rate
O: Apply the Benjamini–Hochberg procedure
T: False discovery rate | E(V/R), the expected fraction of false rejections V among all rejections R (taken as 0 if R = 0)
T: Benjamini–Hochberg procedure | Order the m p-values; find the largest k with p₍ₖ₎ ≤ (k/m)q; reject hypotheses 1 to k
H: The idea
- FWER control asks for no false positives at all, which is very strict for thousands of tests.
- FDR control at q = 5% accepts that about 5% of discoveries may be false.
- It's much more powerful when many real effects exist.
H: Benjamini–Hochberg
- Sort p-values from smallest: p₍₁₎ ≤ … ≤ p₍ₘ₎.
- Compare p₍ₖ₎ with (k/m)q; find the largest k that passes.
- Reject all hypotheses up to that k, even if some smaller ones failed their own comparison.
- Valid for independent tests and many positively dependent ones.
H: Uses
- Gene expression studies, genome-wide association studies, brain imaging, A/B testing at scale.
- q-values report the smallest FDR at which each test would be significant.
- Benjamini and Hochberg's 1995 paper is one of the most cited in statistics.
X: Five p-values: 0.001, 0.012, 0.03, 0.04, 0.2. Apply Benjamini–Hochberg at q = 0.05, and compare with Bonferroni.
> Thresholds (k/5) × 0.05: 0.01, 0.02, 0.03, 0.04, 0.05
> 0.001, 0.012, 0.03 and 0.04 pass; 0.2 fails: the largest passing k is 4, so reject four
> Bonferroni (0.01) rejects only one: FDR control keeps more discoveries
K: FDR is the expected share of false discoveries; Benjamini–Hochberg compares p₍ₖ₎ with (k/m)q; it's more powerful than FWER control for large screens.
!: Stopping the BH procedure at the first p-value that fails, rather than finding the largest k that passes.
Q: What does FDR control at 10% mean? | On average, at most 10% of declared discoveries are false.
Q: What is the BH threshold for the 3rd smallest of 10 p-values at q = 0.05? | 0.015.
SUM: FDR controls the share of false discoveries.
SUM: Benjamini–Hochberg is the standard method.
SRC: Benjamini Y, Hochberg Y, Controlling the false discovery rate, Journal of the Royal Statistical Society B 57(1), 289 | journal | 1995 | https://doi.org/10.1111/j.2517-6161.1995.tb02031.x
SRC: Storey JD, Tibshirani R, Statistical significance for genomewide studies, PNAS 100(16), 9440 | journal | 2003 | https://doi.org/10.1073/pnas.1530509100
NUM1#maths-u13-20-q1@1: With m = 100 tests and q = 0.05, what is the BH threshold for the 20th smallest p-value? | 0.01 | 0.00001 |  | (k/m)q = (20/100) × 0.05 = 0.01.
M1#maths-u13-20-q2@1: When is FDR control preferred to FWER control? | When screening many hypotheses for follow-up | When one false positive would be disastrous | When there's only one test | Never | When p-values are large | Screening accepts a few false leads in exchange for many more true discoveries.
M2#maths-u13-20-q3@2: In Benjamini–Hochberg, p₍₂₎ fails its threshold but p₍₃₎ passes. What happens to hypothesis 2? | It's rejected too | It's not rejected | The procedure stops | It's retested | It's removed | All hypotheses up to the largest passing k are rejected.

## Parametric Statistics
S: Parametric methods assume the data come from a family of distributions described by a few parameters, usually the normal. When the assumptions hold, they're the most powerful tools available; when they don't, results can mislead.
O: Identify the assumptions of common parametric methods
O: Check assumptions and use transformations when they fail
T: Parametric method | A method that assumes a distribution family with finitely many parameters
T: Q–Q plot | A plot of sample quantiles against theoretical quantiles; a straight line suggests the model fits
H: Common methods and assumptions
- t-tests and ANOVA: independent observations, roughly normal data (or large samples), equal variances (unless using Welch's version).
- Linear regression: linearity, independent errors, constant variance, normal errors for small-sample inference.
- Parametric methods estimate meaningful parameters (means, slopes) with confidence intervals.
H: Checking
- Plots first: histograms, box plots, Q–Q plots, residual plots.
- Formal tests (Shapiro–Wilk for normality, Levene for equal variances) have low power in small samples and reject trivially in large ones.
- The CLT makes tests on means robust to non-normality when n is large and skewness moderate.
H: When assumptions fail
- Transform: logs for right-skewed positive data; square roots for counts.
- Use robust or non-parametric methods (next lesson), or the bootstrap.
- Use a model that fits the data type: GLMs for counts and proportions (later in this school).
X: Data 1, 2, 4, 8, 16 are strongly right-skewed. Suggest a transformation and show its effect.
> Take logs to base 2: 0, 1, 2, 3, 4
> The transformed values are evenly spaced and symmetric
> Analyse on the log scale and back-transform: the mean of the logs (2) gives a geometric mean of 2^{2} = 4
K: Parametric methods assume a distribution family; check with plots; transform or switch methods when assumptions fail.
!: Relying on a normality test alone rather than looking at plots and considering the sample size.
Q: What does a straight Q–Q plot suggest? | The data fit the theoretical distribution.
Q: Which transformation often helps with right-skewed positive data? | Taking logarithms.
SUM: Parametric methods assume a model.
SUM: Check assumptions before trusting results.
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods, section 1.3.3.24: Normal probability plot | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
SRC: Altman DG, Practical Statistics for Medical Research (Chapman & Hall 1991) | textbook | 1991 | https://www.routledge.com/
M1#maths-u13-21-q1@1: Which is an assumption of the pooled two-sample t-test? | Equal population variances | Equal sample sizes | Integer data | A sample size above 100 | Uniformly distributed data | The pooled version assumes a common variance; Welch's version drops it.
M2#maths-u13-21-q2@2: Why might a t-test still be reasonable for moderately skewed data with n = 200? | The CLT makes the sample mean approximately normal | Skewness doesn't exist for large samples | t-tests need no assumptions | Large samples are always normal | It isn't reasonable | Inference for means relies on the sampling distribution of x̄, which the CLT makes nearly normal.

## Nonparametric Statistics
S: Nonparametric methods make few assumptions about the shape of the population, often working with ranks or signs. They're robust to outliers and suit ordinal or skewed data, at a small cost in power when normal assumptions would have held.
O: Describe when nonparametric methods are appropriate
O: Carry out a sign test
T: Nonparametric method | A method that doesn't assume a specific parametric distribution
T: Sign test | A test of a median using only whether observations (or differences) are above or below it
H: When to use them
- Ordinal data (ratings, rankings).
- Small samples from clearly non-normal populations.
- Outliers that would dominate a mean.
- Hypotheses about medians or general distributional shifts.
H: The main tests
- Sign test and Wilcoxon signed-rank: one sample or paired data.
- Mann–Whitney U: two independent groups.
- Kruskal–Wallis: three or more groups.
- Spearman's rank correlation; Kolmogorov–Smirnov for whole distributions.
H: Trade-offs
- Ranks discard some information, but under normality the Wilcoxon tests keep about 95% of the t-test's efficiency (3/π).
- With heavy tails they can be far more powerful than t-tests.
- Permutation tests and the bootstrap are other assumption-light tools (later in this school).
X: Ten paired differences are 8 positive and 2 negative. Use a sign test, one-tailed at 5%, for a positive median difference.
> Under H₀ the number of positives is B(10, 0.5)
> P(X ≥ 8) = (C(10, 8) + C(10, 9) + C(10, 10))/1024 = (45 + 10 + 1)/1024 ≈ 0.0547
> 0.0547 > 0.05: not significant, though close; a more powerful test might use the sizes of the differences
K: Nonparametric tests use ranks or signs and few assumptions; they're robust to outliers and ordinal data, with only a small loss of power under normality.
!: Assuming nonparametric tests need no assumptions at all: they still need independence.
Q: Which nonparametric test compares two independent groups? | The Mann–Whitney U test.
Q: What information does the sign test ignore? | The sizes of the differences.
SUM: Nonparametric methods trade assumptions for robustness.
SUM: Ranks and signs carry the information.
SRC: Hollander M, Wolfe DA, Chicken E, Nonparametric Statistical Methods (3rd edn, Wiley 2014) | textbook | 2014 | https://www.wiley.com/
SRC: Altman DG, Practical Statistics for Medical Research (Chapman & Hall 1991) | textbook | 1991 | https://www.routledge.com/
NUM1#maths-u13-22-q1@1: In a sign test with 12 non-zero differences, all 12 are positive. Find the one-tailed p-value, to 5 decimal places. | 0.00024 | 0.00001 |  | (1/2)^{12} = 1/4096 ≈ 0.00024.
M1#maths-u13-22-q2@1: Which data most clearly call for a nonparametric test? | Satisfaction ratings on a 1–5 scale from 12 people | Exam marks for a large national cohort of students | Reaction times of 1,000 people | Masses of 200 machine parts | Weights of 300 newborn babies | Small samples of ordinal ratings don't suit normal-based methods.
M3#maths-u13-22-q3@2: Under perfectly normal data, how efficient is the Wilcoxon test relative to the t-test asymptotically? | About 95% | About 50% | About 64% | Exactly 100% | About 10% | The asymptotic relative efficiency is 3/π ≈ 0.955: very little is lost.

## Z-Tests
S: A z-test compares a statistic with its hypothesised value using the standard normal distribution. It's used for means with known standard deviation and for proportions with large samples.
O: Carry out one-sample and two-proportion z-tests
O: State when a z-test is appropriate
T: z statistic | (estimate − hypothesised value)/standard error, compared with N(0, 1)
T: Pooled proportion | The combined proportion of both samples, used for the standard error under H₀: p₁ = p₂
H: One-sample tests
- Mean with known σ: z = (x̄ − μ₀)/(σ/√n).
- Proportion: z = (p̂ − p₀)/√(p₀(1 − p₀)/n), using p₀ in the standard error.
- Compare with ±1.96 (two-sided 5%) or 1.645 (one-sided 5%).
H: Two proportions
- z = (p̂₁ − p̂₂)/√(p̂(1 − p̂)(1/n₁ + 1/n₂)), where p̂ is the pooled proportion.
- Used for A/B tests on websites and comparing response rates.
- Equivalent to a chi-squared test on a 2 × 2 table (z^{2} = χ^{2}).
H: When it applies
- σ known (rare in practice) or n large enough that s is a good estimate.
- Proportions: np₀ and n(1 − p₀) both at least about 10.
- Otherwise use a t-test (means) or an exact binomial test (proportions).
X: A machine fills bags with σ = 20 g. A sample of 64 has mean 505 g. Test H₀: μ = 500 g at 5%, two-sided.
> SE = 20/8 = 2.5
> z = (505 − 500)/2.5 = 2
> |z| = 2 > 1.96: reject H₀ (p ≈ 0.046); the mean appears to differ from 500 g
K: z = (estimate − null value)/SE; use σ or p₀ in the SE; z-tests need known σ or large samples.
!: Using p̂ instead of p₀ in the standard error of a one-proportion test.
Q: What critical value is used for a one-sided 5% z-test? | 1.645.
Q: How is a two-proportion z-test related to a chi-squared test? | z^{2} equals the 2 × 2 chi-squared statistic.
SUM: z-tests use the standard normal.
SUM: They need known σ or large samples.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Agresti A, Categorical Data Analysis (3rd edn, Wiley 2013) | textbook | 2013 | https://www.wiley.com/
NUM1#maths-u13-23-q1@1: Test H₀: p = 0.5 with n = 100 and p̂ = 0.6. Find z. | 2 | 0.001 |  | SE = √(0.25/100) = 0.05, so z = 0.1/0.05 = 2.
M1#maths-u13-23-q2@1: When is a z-test for a mean appropriate rather than a t-test? | When σ is known or n is large | When n is small and σ unknown | Always | Never | When data are ordinal | With σ estimated from a small sample, the extra uncertainty calls for t.
M2#maths-u13-23-q3@2: In an A/B test, which standard error does the two-proportion z-test use under H₀? | One based on the pooled proportion | The larger sample's | √(p̂₁ + p̂₂) | The difference in proportions | σ/√n | Under H₀ both groups share one p, best estimated by pooling.

## T-Tests
S: The t-test compares means when the population standard deviation is unknown and estimated from the data. One-sample, paired and two-sample versions answer the most common questions in experiments.
O: Choose and carry out one-sample, paired and two-sample t-tests
O: State the assumptions and degrees of freedom of each
T: One-sample t statistic | t = (x̄ − μ₀)/(s/√n), with n − 1 degrees of freedom
T: Welch's t-test | A two-sample t-test that doesn't assume equal variances
H: The versions
- One-sample: is the mean equal to μ₀?
- Paired: analyse the differences within pairs (before/after, twins) as one sample.
- Two-sample: compare two independent groups; Welch's version is the safe default.
- Pooled version: assumes equal variances, with n₁ + n₂ − 2 degrees of freedom.
H: Assumptions
- Independent observations (within groups, or between pairs).
- Approximately normal data or differences, especially for small n.
- For pooled tests, similar variances.
H: Reporting
- Give the mean difference, its confidence interval, t, the degrees of freedom and the p-value.
- Pairing removes between-subject variation, often giving much more power.
X: Nine patients' blood pressure falls by a mean of 2.5 with SD 3. Test at 5% (two-sided) whether the mean change is zero. (t₈ critical value 2.306)
> Paired: analyse the differences; SE = 3/√9 = 1
> t = 2.5/1 = 2.5 with 8 degrees of freedom
> 2.5 > 2.306: reject H₀; there's evidence of a mean fall
K: Use one-sample, paired or two-sample (Welch) t-tests; t = estimate/SE with the right degrees of freedom; check independence and approximate normality.
!: Analysing paired data with a two-sample test, which ignores the pairing and loses power.
Q: How many degrees of freedom does a paired t-test on 15 pairs use? | 14.
Q: Which two-sample t-test doesn't assume equal variances? | Welch's t-test.
SUM: t-tests compare means with estimated SDs.
SUM: Match the version to the design.
SRC: Student, The probable error of a mean, Biometrika 6(1), 1 | journal | 1908 | https://doi.org/10.1093/biomet/6.1.1
SRC: Altman DG, Practical Statistics for Medical Research (Chapman & Hall 1991) | textbook | 1991 | https://www.routledge.com/
NUM1#maths-u13-24-q1@1: A sample of 16 has x̄ = 54 and s = 6. Find t for H₀: μ = 50, to 3 decimal places. | 2.667 | 0.001 |  | SE = 6/4 = 1.5, so t = 4/1.5 ≈ 2.667.
M1#maths-u13-24-q2@1: Students take a test before and after a course. Which t-test fits? | Paired | Two-sample pooled | Welch two-sample | One-sample against 0 using the raw scores | None | Each student gives two linked scores, so analyse their differences.
M2#maths-u13-24-q3@2: What is the pooled two-sample t-test's degrees of freedom for groups of 12 and 15? | 25 | 27 | 26 | 11 | 14 | The pooled test loses one degree of freedom per group: n₁ + n₂ − 2 = 25.

## Chi-Squared Tests
S: Chi-squared tests compare observed counts with the counts expected under a hypothesis. They test whether data fit a distribution (goodness of fit) and whether two categorical variables are associated (independence).
O: Carry out chi-squared goodness-of-fit and independence tests
O: Find the degrees of freedom and check expected-count conditions
T: Chi-squared statistic | X^{2} = Σ (O − E)^{2}/E over all cells
T: Expected count | The count predicted by H₀, such as (row total × column total)/grand total in a table
H: Goodness of fit
- Expected counts come from the hypothesised distribution.
- Degrees of freedom: number of categories − 1 − number of parameters estimated from the data.
- Combine categories so that every expected count is at least about 5.
H: Independence
- For an r × c table, E = (row total × column total)/n.
- Degrees of freedom (r − 1)(c − 1).
- A significant result shows association, not causation, and not its strength (use Cramér's V or odds ratios).
H: Cautions
- Use counts, never percentages, in the formula.
- For small expected counts in 2 × 2 tables, use Fisher's exact test.
- Yates' continuity correction for 2 × 2 tables is conservative; many statisticians now omit it.
X: A die is rolled 60 times, giving counts 8, 9, 12, 11, 6, 14. Test at 5% whether it's fair (χ^{2}₅ critical value 11.07).
> E = 10 for each face
> X^{2} = (4 + 1 + 4 + 1 + 16 + 16)/10 = 4.2
> 4.2 < 11.07: no evidence the die is unfair
K: X^{2} = Σ(O − E)^{2}/E; degrees of freedom k − 1 − estimated parameters, or (r − 1)(c − 1); keep expected counts ≥ 5; use counts not percentages.
!: Forgetting to subtract a degree of freedom for each parameter estimated from the data.
Q: How do you find an expected count in a contingency table? | (Row total × column total)/grand total.
Q: How many degrees of freedom for testing a Poisson fit over 6 classes with λ estimated? | 6 − 1 − 1 = 4.
SUM: Chi-squared compares observed with expected counts.
SUM: It tests fit and independence.
SRC: Agresti A, Categorical Data Analysis (3rd edn, Wiley 2013) | textbook | 2013 | https://www.wiley.com/
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
NUM1#maths-u13-25-q1@1: In a 2 × 2 table, a cell has row total 40, column total 30 and grand total 100. Find its expected count. | 12 | 0 |  | 40 × 30/100 = 12.
M1#maths-u13-25-q2@1: Why should percentages never be used in place of counts in a chi-squared test? | The statistic depends on sample size, which percentages hide | Percentages are always wrong | Percentages can't be squared, so the formula fails | Counts are easier to type | It makes no difference | The same percentages from 10 or 10,000 people carry very different evidence.
M2#maths-u13-25-q3@2: What are the degrees of freedom for a 4 × 3 table test of independence? | 6 | 12 | 7 | 5 | 11 | For an r × c table the degrees of freedom are (r − 1)(c − 1) = 3 × 2 = 6.

## Fisher's Exact Test
S: Fisher's exact test analyses 2 × 2 tables using the exact hypergeometric probabilities, rather than a chi-squared approximation. It's valid for any sample size and is the standard choice when counts are small.
O: Explain the basis of Fisher's exact test
O: Calculate an exact p-value for a small table
T: Fisher's exact test | A test of association in a 2 × 2 table, conditioning on the row and column totals
T: Conditional test | A test that treats some margins as fixed, so probabilities come from the hypergeometric distribution
H: The idea
- With row and column totals fixed, the top-left count determines the whole table.
- Under independence, that count is hypergeometric.
- The p-value adds the probabilities of tables at least as extreme as the one observed.
H: The lady tasting tea
- Fisher's 1935 example: a lady claims to tell whether milk or tea was poured first. Eight cups, four of each.
- If she's guessing, the chance of identifying all four milk-first cups is 1/C(8, 4) = 1/70 ≈ 0.014.
- This example introduced randomisation and the logic of the exact test.
H: Practice
- Use when expected counts are small (below about 5).
- It's conservative for discrete data; mid-p variants reduce this.
- Extensions handle larger tables (Freeman–Halton).
X: In the tea experiment, what is the probability that a guesser gets at least three of the four milk-first cups right?
> P(exactly 3 right) = C(4, 3)C(4, 1)/C(8, 4) = 16/70
> P(all 4 right) = 1/70
> P(at least 3) = 17/70 ≈ 0.243: three right isn't convincing evidence
K: Fisher's test fixes the margins and uses hypergeometric probabilities; it's exact for small tables.
!: Using a chi-squared test when expected counts are very small.
Q: Which distribution underlies Fisher's exact test? | The hypergeometric.
Q: In the tea experiment, what is P(all four correct) by guessing? | 1/70.
SUM: Fisher's test is exact for 2 × 2 tables.
SUM: It suits small samples.
SRC: Fisher RA, The Design of Experiments (Oliver and Boyd 1935) | textbook | 1935 | https://archive.org/
SRC: Agresti A, Categorical Data Analysis (3rd edn, Wiley 2013) | textbook | 2013 | https://www.wiley.com/
NUM1#maths-u13-26-q1@1: How many ways are there to choose which 4 of 8 cups were milk-first? | 70 | 0 |  | C(8, 4) = 70.
M1#maths-u13-26-q2@1: When is Fisher's exact test preferred to the chi-squared test? | When expected counts are small | When the table is very large | When data are continuous | When the sample has thousands of observations | Never | The chi-squared approximation is poor for small expected counts.
M2#maths-u13-26-q3@2: What does Fisher's test hold fixed when computing probabilities? | Both sets of margins (row and column totals) | The difference in proportions | Only the grand total of the table | The cell counts | The odds ratio | Conditioning on the margins makes the table's distribution hypergeometric.

## Mann–Whitney U Test
S: The Mann–Whitney U test (also called the Wilcoxon rank-sum test) compares two independent groups using ranks. It tests whether values in one group tend to be larger than in the other, without assuming normality.
O: Calculate the U statistic from ranks
O: Interpret the test and state its assumptions
T: Mann–Whitney U | U₁ = R₁ − n₁(n₁ + 1)/2, where R₁ is the rank sum of group 1 in the combined ranking
T: Stochastic dominance | One group tends to give larger values: P(X > Y) > 1/2
H: Method
- Rank all observations together (average ranks for ties).
- Sum the ranks in each group; compute U₁ and U₂ = n₁n₂ − U₁.
- The test statistic is the smaller U; small values are evidence of a difference.
- Large samples: U is approximately normal with mean n₁n₂/2 and variance n₁n₂(n₁ + n₂ + 1)/12.
H: Interpretation
- U₁/(n₁n₂) estimates P(X > Y): a useful effect size.
- It's a test of medians only if the two distributions have the same shape.
- Assumes independent observations in and between groups.
H: Uses
- Comparing pain scores, waiting times or ratings between two groups.
- Robust to outliers: one huge value just gets the top rank.
X: Group A: 3, 5, 8. Group B: 1, 2, 4, 6. Find U for each group.
> Combined ranks: 1(B), 2(B), 3(A), 4(B), 5(A), 6(B), 8(A) get ranks 1 to 7
> R_{A} = 3 + 5 + 7 = 15, so U_{A} = 15 − 3 × 4/2 = 9; U_{B} = 12 − 9 = 3
> Even the most extreme U = 0 would give a two-tailed p of 2/35 ≈ 0.057, so groups this small can't be significant at 5%
K: Rank all values together, sum ranks, compute U; the smaller U is the test statistic; U/(n₁n₂) estimates P(X > Y).
!: Calling it a test of medians without the same-shape assumption.
Q: What is U₁ + U₂ always equal to? | n₁n₂.
Q: What effect size does U₁/(n₁n₂) estimate? | P(X > Y), the probability a group 1 value exceeds a group 2 value.
SUM: Mann–Whitney compares two groups by ranks.
SUM: It's robust and assumption-light.
SRC: Mann HB, Whitney DR, On a test of whether one of two random variables is stochastically larger than the other, Annals of Mathematical Statistics 18(1), 50 | journal | 1947 | https://doi.org/10.1214/aoms/1177730491
SRC: Hollander M, Wolfe DA, Chicken E, Nonparametric Statistical Methods (3rd edn, Wiley 2014) | textbook | 2014 | https://www.wiley.com/
NUM1#maths-u13-27-q1@1: Group 1 (n₁ = 5) has rank sum 40 in a combined ranking. Find U₁. | 25 | 0 |  | U₁ = 40 − 5 × 6/2 = 40 − 15 = 25.
M1#maths-u13-27-q2@1: Which situation suits a Mann–Whitney U test? | Comparing pain ratings between two independent groups | Comparing before and after scores on the same people | Comparing three groups | Testing a correlation | Testing a proportion | Two independent groups and ordinal data suit the rank-sum approach.
M2#maths-u13-27-q3@2: What is the mean of U under H₀ for groups of 10 and 12? | 60 | 120 | 11 | 22 | 66 | Under H₀ the U statistic is centred at half of n₁n₂: E(U) = 120/2 = 60.

## Wilcoxon Signed-Rank Test
S: The Wilcoxon signed-rank test compares paired data, or one sample with a hypothesised median, using the ranks of the absolute differences. It uses more information than the sign test while staying robust to outliers.
O: Calculate the signed-rank statistic
O: Choose between the sign test, signed-rank test and paired t-test
T: Signed-rank statistic | W⁺, the sum of the ranks of the positive differences (ranks of |d|)
T: Symmetry assumption | The test assumes the differences are symmetric about their median
H: Method
- Find differences; drop zeros.
- Rank the absolute differences (average ranks for ties).
- Sum ranks for positive differences (W⁺) and negative ones (W⁻); W⁺ + W⁻ = n(n + 1)/2.
- The test statistic is the smaller sum; compare with tables or a normal approximation.
H: Choosing a paired test
- Paired t-test: normally distributed differences.
- Signed-rank: symmetric differences, possibly heavy-tailed or ordinal-ish.
- Sign test: no symmetry needed, but less powerful.
H: Normal approximation
- Mean of W⁺ under H₀: n(n + 1)/4; variance n(n + 1)(2n + 1)/24.
- Adequate for n above about 20.
X: Paired differences: 3, −1, 4, 2, −5, 6. Find W⁺ and W⁻.
> Absolute values 3, 1, 4, 2, 5, 6 have ranks 3, 1, 4, 2, 5, 6
> W⁺ = 3 + 4 + 2 + 6 = 15; W⁻ = 1 + 5 = 6
> Check: 15 + 6 = 21 = 6 × 7/2. With n = 6, only W = 0 is significant at 5% two-sided, so this isn't
K: Rank |d|, sum ranks by sign; the smaller sum is the statistic; it assumes symmetric differences; it's more powerful than the sign test.
!: Ranking the signed differences instead of their absolute values.
Q: What do W⁺ and W⁻ add up to for n non-zero differences? | n(n + 1)/2.
Q: What assumption does the signed-rank test make that the sign test doesn't? | The differences are symmetric about their median.
SUM: Signed ranks use both direction and size.
SUM: It suits paired, non-normal data.
SRC: Wilcoxon F, Individual comparisons by ranking methods, Biometrics Bulletin 1(6), 80 | journal | 1945 | https://doi.org/10.2307/3001968
SRC: Hollander M, Wolfe DA, Chicken E, Nonparametric Statistical Methods (3rd edn, Wiley 2014) | textbook | 2014 | https://www.wiley.com/
NUM1#maths-u13-28-q1@1: Under H₀, what is the mean of W⁺ for n = 20 non-zero differences? | 105 | 0 |  | n(n + 1)/4 = 20 × 21/4 = 105.
M1#maths-u13-28-q2@1: What does the signed-rank test use that the sign test ignores? | The sizes of the differences, through their ranks | The order of collection | The sample mean | The variance | The order in which the pairs were collected | Ranking |d| brings in magnitude, which adds power.
M3#maths-u13-28-q3@2: Paired differences are strongly skewed. Which test is safest? | The sign test | The Wilcoxon signed-rank test | The paired t-test | A two-sample t-test | Fisher's exact test | Skewness violates the signed-rank test's symmetry assumption; the sign test needs none.

## Kruskal–Wallis Test
S: The Kruskal–Wallis test compares three or more independent groups using ranks. It's the nonparametric counterpart of one-way ANOVA, used when data are ordinal or clearly non-normal.
O: Calculate the Kruskal–Wallis H statistic
O: Interpret the test and follow it with post hoc comparisons
T: Kruskal–Wallis H | H = [12/(N(N + 1))] Σ R_{i}^{2}/n_{i} − 3(N + 1), using rank sums R_{i}
T: Post hoc test | A follow-up test identifying which groups differ, such as Dunn's test
H: Method
- Rank all N observations together.
- Compute each group's rank sum R_{i} and the statistic H.
- Under H₀, H is approximately χ^{2}_{k−1} for k groups (if groups aren't tiny).
H: Interpretation
- A significant H says at least one group tends to differ; it doesn't say which.
- Follow up with Dunn's test or pairwise Mann–Whitney tests with a multiple testing correction.
- With equal-shaped distributions, it compares medians.
H: Uses
- Comparing satisfaction scores across several hospitals.
- Comparing plant growth under three fertilisers when data are skewed.
- With two groups it's equivalent to the Mann–Whitney test.
X: Three groups of 3 have ranks A: 1, 2, 3; B: 4, 5, 6; C: 7, 8, 9. Find H (χ^{2}₂ critical value 5.991).
> N = 9; R_{A} = 6, R_{B} = 15, R_{C} = 24
> H = (12/90)(36/3 + 225/3 + 576/3) − 30 = (12/90)(279) − 30 = 37.2 − 30
> H = 7.2 > 5.991: the groups differ (the χ^{2} approximation is rough with groups this small)
K: Rank everything, compute H from rank sums, compare with χ^{2}_{k−1}; follow a significant result with corrected pairwise tests.
!: Concluding which groups differ from the overall H alone.
Q: What is the parametric counterpart of the Kruskal–Wallis test? | One-way ANOVA.
Q: How many degrees of freedom does H have for 4 groups? | 3.
SUM: Kruskal–Wallis compares several groups by ranks.
SUM: Follow up to find which differ.
SRC: Kruskal WH, Wallis WA, Use of ranks in one-criterion variance analysis, Journal of the American Statistical Association 47(260), 583 | journal | 1952 | https://doi.org/10.1080/01621459.1952.10483441
SRC: Hollander M, Wolfe DA, Chicken E, Nonparametric Statistical Methods (3rd edn, Wiley 2014) | textbook | 2014 | https://www.wiley.com/
NUM1#maths-u13-29-q1@1: For 5 groups, what is the 5% critical value of the χ^{2} approximation to H, to 2 decimal places? | 9.49 | 0.01 |  | With k − 1 = 4 degrees of freedom, the upper 5% point of χ^{2}₄ is 9.49.
M1#maths-u13-29-q2@1: Which test fits comparing pain scores across four independent treatment groups with skewed data? | Kruskal–Wallis | Paired t-test | Mann–Whitney U | Fisher's exact | Two-sample z-test | Several independent groups with non-normal data call for Kruskal–Wallis.
M2#maths-u13-29-q3@2: A Kruskal–Wallis test is significant. What should you do next? | Run corrected pairwise comparisons, such as Dunn's test | Conclude all groups differ | Conclude the largest group differs | Run another Kruskal–Wallis | Conclude that every group differs from every other | H tells you some difference exists, not where.

## Kolmogorov–Smirnov Test
S: The Kolmogorov–Smirnov test compares whole distributions: a sample with a hypothesised distribution, or two samples with each other. Its statistic is the largest vertical gap between cumulative distribution functions.
O: Calculate the KS statistic and compare it with a critical value
O: State the limitations of the KS test
T: KS statistic | D = sup_{x} |F_{n}(x) − F₀(x)|, the largest gap between the empirical and hypothesised CDFs
T: Two-sample KS test | Compares the empirical CDFs of two samples
H: Method
- One-sample: compare F_{n} with a fully specified continuous F₀.
- Large-sample 5% critical value: about 1.36/√n.
- Two-sample: D = sup |F_{n₁} − F_{n₂}|, with critical value about 1.36√((n₁ + n₂)/(n₁n₂)).
H: Strengths
- Distribution-free when F₀ is fully specified and continuous.
- Sensitive to any kind of difference: location, spread or shape.
- Gives a confidence band for the whole CDF.
H: Limitations
- Low power in the tails; Anderson–Darling gives the tails more weight.
- If parameters are estimated from the data, standard critical values are wrong: use Lilliefors' correction or simulation.
- For testing normality specifically, Shapiro–Wilk is usually more powerful.
X: A sample of 100 gives D = 0.12 against a fully specified distribution. Test at 5%.
> Critical value ≈ 1.36/√100 = 0.136
> D = 0.12 < 0.136
> Don't reject H₀: the data are consistent with the hypothesised distribution
K: D is the largest CDF gap; critical value ≈ 1.36/√n at 5%; adjust if parameters are estimated; weak in the tails.
!: Using standard KS critical values after estimating the mean and SD from the same data.
Q: What does the KS statistic measure? | The largest vertical distance between two CDFs.
Q: Which test gives more weight to the tails than KS? | The Anderson–Darling test.
SUM: KS compares entire distributions.
SUM: Watch for estimated parameters.
SRC: Massey FJ, The Kolmogorov–Smirnov test for goodness of fit, Journal of the American Statistical Association 46(253), 68 | journal | 1951 | https://doi.org/10.1080/01621459.1951.10500769
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods, section 1.3.5.16: Kolmogorov–Smirnov goodness-of-fit test | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
NUM1#maths-u13-30-q1@1: Find the approximate 5% KS critical value for n = 400, to 3 decimal places. | 0.068 | 0.001 |  | 1.36/√400 = 1.36/20 = 0.068.
M1#maths-u13-30-q2@1: What is a weakness of the KS test? | It has low power for differences in the tails | It only detects differences in means | It requires normal data | It can't compare two samples | It needs large expected counts | The CDF gap is naturally small in the tails, so tail differences are hard to detect.
M2#maths-u13-30-q3@2: A KS test for normality uses the sample mean and SD as parameters. What's the problem? | Standard critical values are too large, making the test conservative | The test becomes invalid for every sample size | It needs very large samples | It always rejects | It needs a t-distribution | Fitting parameters to the data shrinks D; Lilliefors' critical values account for that.

## Analysis of Variance (ANOVA)
S: Analysis of variance tests whether several group means are equal by comparing the variation between groups with the variation within them. It avoids the inflated error rate of many pairwise t-tests and underlies the analysis of designed experiments.
O: Partition variation into between-group and within-group sums of squares
O: Carry out a one-way ANOVA F-test
T: Between-group sum of squares | SS_{B} = Σ n_{i}(x̄_{i} − x̄)^{2}, variation of group means about the grand mean
T: Within-group sum of squares | SS_{W} = Σ Σ (x_{ij} − x̄_{i})^{2}, variation inside the groups
H: The partition
- Total SS = SS_{B} + SS_{W}.
- Mean squares: MS_{B} = SS_{B}/(k − 1) and MS_{W} = SS_{W}/(N − k).
- F = MS_{B}/MS_{W}; under H₀ (all means equal) F ~ F(k − 1, N − k).
- A large F means group means vary more than within-group noise would explain.
H: Assumptions
- Independent observations, roughly normal within groups, similar variances.
- Welch's ANOVA relaxes equal variances; Kruskal–Wallis drops normality.
- Plot residuals to check.
H: Beyond one-way
- Two-way ANOVA: two factors and their interaction.
- Post hoc tests (Tukey's HSD) identify which means differ.
- Effect size: η^{2} = SS_{B}/SS_{total}.
X: Groups A: 4, 5, 6; B: 6, 7, 8; C: 8, 9, 10. Carry out a one-way ANOVA (F(2, 6) 5% critical value 5.14).
> Means 5, 7, 9; grand mean 7. SS_{B} = 3(4 + 0 + 4) = 24; SS_{W} = 2 + 2 + 2 = 6
> MS_{B} = 24/2 = 12; MS_{W} = 6/6 = 1
> F = 12 > 5.14: reject H₀; at least one mean differs
K: Total SS = between + within; F = MS_{B}/MS_{W} with (k − 1, N − k) degrees of freedom; follow up with post hoc tests.
!: Running many t-tests instead of ANOVA, inflating the false positive rate.
Q: What are the degrees of freedom for one-way ANOVA with 4 groups and 20 observations? | (3, 16).
Q: What does a significant ANOVA F-test tell you? | At least one group mean differs.
SUM: ANOVA compares between- and within-group variation.
SUM: The F-test checks for any difference in means.
SRC: Montgomery DC, Design and Analysis of Experiments (9th edn, Wiley 2017) | textbook | 2017 | https://www.wiley.com/
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods, section 7.4.3: Are the means equal? | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
NUM1#maths-u13-31-q1@1: An ANOVA has SS_{B} = 30 with 3 groups and SS_{W} = 54 with 30 observations. Find F, to 2 decimal places. | 7.5 | 0.01 |  | MS_{B} = 30/2 = 15, MS_{W} = 54/27 = 2, F = 7.5.
M1#maths-u13-31-q2@1: Why use ANOVA rather than all pairwise t-tests for five groups? | Ten separate tests would inflate the chance of a false positive | t-tests can't compare means | t-tests need equal group sizes | ANOVA needs fewer assumptions | ANOVA gives each pair's difference with a p-value | Ten tests at 5% give a much higher family-wise error rate than one F-test.
M2#maths-u13-31-q3@2: In ANOVA, what is η^{2}? | The proportion of total variation explained by the groups | The p-value of the F-test | The ratio of between-group to within-group mean squares | The within-group variance | The number of groups | η^{2} = SS_{B}/SS_{total}, an effect size for group differences.

## Analysis of Covariance (ANCOVA)
S: Analysis of covariance combines ANOVA with regression: it compares group means after adjusting for a continuous covariate, such as a baseline score. Adjusting reduces noise and corrects for chance imbalances, so trials get more precise answers.
O: Explain how ANCOVA adjusts group comparisons for a covariate
O: Calculate an adjusted difference in means
T: Covariate | A continuous variable related to the outcome, such as a baseline measurement
T: Adjusted mean | A group mean estimated at a common value of the covariate
H: The model
- y = β₀ + τ × group + β × covariate + error.
- τ is the group difference at the same covariate value.
- Adjusted difference = raw difference − β × (difference in covariate means).
H: Why adjust
- Removes variation explained by the covariate, shrinking standard errors (more power).
- Corrects chance baseline imbalances in randomised trials.
- Regulators (EMA guidance) recommend pre-specified adjustment for strong prognostic baseline covariates.
H: Assumptions and cautions
- Homogeneity of slopes: the covariate's effect is the same in each group (test the interaction).
- The covariate should be measured before treatment; adjusting for something affected by treatment biases the result.
- In observational studies, adjusting for one covariate doesn't remove all confounding.
X: Mean outcomes are 60 (group A) and 66 (group B), with baseline means 50 and 54. The fitted covariate slope is 0.6. Find the adjusted difference.
> Raw difference = 66 − 60 = 6
> Part explained by baseline: 0.6 × (54 − 50) = 2.4
> Adjusted difference = 6 − 2.4 = 3.6
K: ANCOVA compares groups at equal covariate values; adjusted difference = raw − slope × covariate difference; check equal slopes; use pre-treatment covariates.
!: Adjusting for a variable measured after treatment, which can remove part of the real effect.
Q: What does ANCOVA add to ANOVA? | A continuous covariate in the model.
Q: Why adjust for baseline in a randomised trial? | To improve precision and correct chance imbalances.
SUM: ANCOVA adjusts comparisons for covariates.
SUM: It increases precision in trials.
SRC: European Medicines Agency, Guideline on adjustment for baseline covariates in clinical trials (EMA/CHMP/295050/2013) | guidance | 2015 | https://www.ema.europa.eu/
SRC: Vickers AJ, Altman DG, Analysing controlled trials with baseline and follow up measurements, BMJ 323, 1123 | journal | 2001 | https://doi.org/10.1136/bmj.323.7321.1123
NUM1#maths-u13-32-q1@1: Raw means differ by 10, baseline means by 5, and the covariate slope is 1.2. Find the adjusted difference. | 4 | 0 |  | 10 − 1.2 × 5 = 4.
M1#maths-u13-32-q2@1: Which ANCOVA assumption is checked by testing a group × covariate interaction? | Homogeneity of regression slopes | Normality of the covariate | Equal group sizes | Independence of groups | No missing data | Equal slopes mean the adjustment is the same in every group.
M2#maths-u13-32-q3@2: In a trial, why shouldn't you adjust for a variable measured after treatment started? | It may be affected by the treatment, biasing the estimated effect | It's always uncorrelated | It reduces sample size | It reduces the sample size available for the analysis | It makes ANCOVA impossible | Adjusting for a consequence of treatment can remove part of the treatment's real effect.

## Categorical Data Analysis
S: Categorical data analysis deals with outcomes that fall into categories: yes or no, blood group, disease stage. It uses proportions, odds and odds ratios, and models such as logistic and log-linear regression.
O: Calculate proportions, odds, odds ratios and relative risks
O: Choose methods for nominal, ordinal and paired categorical data
T: Odds | p/(1 − p): a probability of 0.2 gives odds of 0.25 (1 to 4)
T: Odds ratio | The ratio of the odds in two groups; 1 means no association
H: Measures of association
- Relative risk RR = p₁/p₂: intuitive, needs cohort or trial data.
- Odds ratio OR = [p₁/(1 − p₁)]/[p₂/(1 − p₂)]: works for case–control studies and logistic regression.
- For rare outcomes OR ≈ RR; for common outcomes OR is further from 1 than RR.
H: Types of data
- Nominal (unordered): chi-squared tests, multinomial models.
- Ordinal (ordered): trend tests, ordinal logistic regression, rank methods.
- Paired binary data (before/after on the same people): McNemar's test.
H: Models
- Logistic regression for binary outcomes (later in this school).
- Log-linear models for associations among several categorical variables.
- Report confidence intervals for ORs (computed on the log scale).
X: Among 100 exposed people, 30 develop a disease; among 100 unexposed, 10 do. Find the RR and OR.
> RR = 0.30/0.10 = 3
> OR = (30 × 90)/(70 × 10) = 2700/700 ≈ 3.86
> The outcome isn't rare, so the OR overstates the RR
K: Odds = p/(1 − p); RR and OR measure association; OR ≈ RR only for rare outcomes; match the method to nominal, ordinal or paired data.
!: Reporting an odds ratio as if it were a relative risk for a common outcome.
Q: What are the odds for a probability of 0.75? | 3 (3 to 1).
Q: Which test suits paired binary data? | McNemar's test.
SUM: Categorical outcomes use odds and proportions.
SUM: OR and RR differ for common outcomes.
SRC: Agresti A, Categorical Data Analysis (3rd edn, Wiley 2013) | textbook | 2013 | https://www.wiley.com/
SRC: Bland JM, Altman DG, The odds ratio, BMJ 320, 1468 | journal | 2000 | https://doi.org/10.1136/bmj.320.7247.1468
NUM1#maths-u13-33-q1@1: A probability of 0.2 corresponds to what odds? | 0.25 | 0.0001 |  | 0.2/0.8 = 0.25.
M1#maths-u13-33-q2@1: Which study design can estimate an odds ratio but not a relative risk directly? | Case–control study | Randomised trial | Cohort study | Census | Cross-over trial | Case–control studies fix the numbers of cases and controls, so risks can't be computed, but odds ratios can.
M2#maths-u13-33-q3@2: An outcome is rare (1%). How do the OR and RR compare? | They're nearly equal | The OR is much larger | The RR is much larger | They're unrelated | The OR is always 1 | When p is small, p/(1 − p) ≈ p, so odds and risks almost coincide.

## Contingency Tables
S: A contingency table cross-tabulates counts for two or more categorical variables. Reading it well, with row and column percentages and attention to hidden variables, reveals associations and avoids paradoxes.
O: Construct and read contingency tables with conditional percentages
O: Recognise Simpson's paradox and measure strength of association
T: Contingency table | A table of counts for combinations of categories of two or more variables
T: Simpson's paradox | An association that holds within every subgroup but reverses when the groups are combined
H: Reading tables
- Margins give each variable's totals.
- Conditional percentages (within rows or columns) answer "of those in group A, what fraction…?"
- Choose the direction that matches the question: percentages of the outcome within each exposure group.
H: Strength of association
- Chi-squared tests significance, not strength.
- Cramér's V = √(χ^{2}/(n(min(r, c) − 1))) runs from 0 to 1.
- For 2 × 2 tables, odds ratios and risk differences are clearer.
H: Simpson's paradox
- A lurking variable related to both rows and columns can reverse a comparison.
- Kidney stone treatments (Charig et al. 1986): treatment A did better for small stones (93% vs 87%) and for large stones (73% vs 69%), but worse overall (78% vs 83%).
- Reason: A was used more often for the harder, large stones.
- Always ask whether a third variable should be stratified on.
X: Check the kidney stone figures: A had 81/87 small and 192/263 large successes; B had 234/270 small and 55/80 large. Find each overall success rate.
> A: (81 + 192)/(87 + 263) = 273/350 = 78%
> B: (234 + 55)/(270 + 80) = 289/350 ≈ 83%
> A wins in both strata but loses overall because most of its patients had large stones
K: Use conditional percentages in the right direction; chi-squared tests association, Cramér's V or ORs measure it; stratify by plausible confounders.
!: Comparing overall percentages without checking for a lurking variable.
Q: What causes Simpson's paradox? | A lurking variable linked to both the grouping and the outcome.
Q: What range does Cramér's V take? | From 0 (no association) to 1.
SUM: Contingency tables cross-tabulate counts.
SUM: Lurking variables can reverse comparisons.
SRC: Charig CR, Webb DR, Payne SR, Wickham JE, Comparison of treatment of renal calculi by open surgery, PCNL and ESWL, BMJ 292, 879 | journal | 1986 | https://doi.org/10.1136/bmj.292.6524.879
SRC: Agresti A, Categorical Data Analysis (3rd edn, Wiley 2013) | textbook | 2013 | https://www.wiley.com/
NUM1#maths-u13-34-q1@1: A 2 × 2 table with n = 200 gives χ^{2} = 8. Find Cramér's V. | 0.2 | 0.001 |  | V = √(8/(200 × 1)) = √0.04 = 0.2.
M1#maths-u13-34-q2@1: Of 120 smokers, 30 have a cough; of 80 non-smokers, 8 do. What percentage of smokers have a cough? | 25% | 30% | 15% | 37.5% | 20% | 30/120 = 25%: use the smokers' row total as the denominator.
M2#maths-u13-34-q3@2: Treatment A beats B within men and within women, but B beats A overall. What's the likely explanation? | Simpson's paradox from different sex mixes in each treatment group | A data entry error | Chance alone, since paradoxes like this are random | The treatments are identical | Men and women can't be combined | Unequal mixes of an influential subgroup can reverse the combined comparison.

## Regression Analysis
S: Regression analysis models how a response variable depends on one or more predictors. It's used to predict, to estimate effects and to adjust for confounders, and its misuse (extrapolating, confusing association with causation) is just as common.
O: Describe the aims and the main types of regression
O: Recognise the dangers of extrapolation and overfitting
T: Response and predictors | The variable being modelled (y) and the variables used to explain it (x₁, x₂, …)
T: Residual | Observed minus fitted value: e = y − ŷ
H: Aims
- Prediction: forecast y for new x.
- Explanation: estimate how y changes with x, holding other predictors fixed.
- Adjustment: compare groups after allowing for other variables.
H: Choosing a model
- Continuous response: linear regression. Binary: logistic. Counts: Poisson or negative binomial. Time to event: survival models.
- Generalised linear models unify these (later in this school).
- Non-linear patterns: transformations, polynomials, splines, GAMs.
H: Dangers
- Extrapolation beyond the range of the data.
- Overfitting: too many predictors for the data; use cross-validation or penalties.
- Confounding: an omitted variable can create or hide an association.
- Regression to the mean: extreme values tend to be followed by less extreme ones, which can look like a treatment effect.
X: A model for children aged 2 to 10 gives height = 80 + 6 × age (cm). What does it predict at age 40, and why is that wrong?
> 80 + 6 × 40 = 320 cm
> No one is 3.2 m tall: growth stops in adolescence
> The model was fitted only for ages 2 to 10; extrapolating far outside that range is invalid
P: **Investigate with the lab.** Fit a line, then look at the residual pattern. A curve in the residuals means a straight line is the wrong model.
IX: regression
K: Regression models y from predictors for prediction, explanation and adjustment; choose the model by response type; beware extrapolation, overfitting and confounding.
!: Using a regression to predict far outside the range of the data.
Q: Which regression model suits a yes/no response? | Logistic regression.
Q: What is a residual? | Observed value minus fitted value.
SUM: Regression relates a response to predictors.
SUM: Respect the data's range and confounders.
SRC: Gelman A, Hill J, Vehtari A, Regression and Other Stories (Cambridge University Press 2020) | textbook | 2020 | https://avehtari.github.io/ROS-Examples/
SRC: Barnett AG, van der Pols JC, Dobson AJ, Regression to the mean: what it is and how to deal with it, International Journal of Epidemiology 34(1), 215 | journal | 2005 | https://doi.org/10.1093/ije/dyh299
M1#maths-u13-35-q1@1: Patients with the highest blood pressure readings are retested and their average falls, with no treatment. What explains it? | Regression to the mean | A placebo effect only | Measurement fraud | Extrapolation | Overfitting | Extreme readings partly reflect random variation, which tends not to repeat.
M2#maths-u13-35-q2@2: Which model suits the number of hospital admissions per day? | Poisson (or negative binomial) regression | Linear regression on raw counts only | Logistic regression | Survival analysis | Fisher's exact test | Counts are non-negative integers, suited to count models with a log link.
M2#maths-u13-35-q3@2: What does a curved pattern in the residuals suggest? | The straight-line model is missing a non-linear relationship | The model fits perfectly | The data have no errors | r must be 1 | Nothing | Residuals should look like random scatter if the model form is right.

## Linear Regression
S: Simple linear regression fits the straight line ŷ = a + bx that minimises the sum of squared residuals. It's the most widely used statistical model, giving an interpretable slope, predictions and a measure of fit.
O: Calculate the least squares regression line
O: Interpret the slope, intercept and R^{2}, and check residuals
T: Least squares | Choosing a and b to minimise Σ(y − a − bx)^{2}
T: Coefficient of determination | R^{2}, the proportion of variation in y explained by the model; r^{2} in simple regression
H: The formulas
E: b = S_{xy}/S_{xx}; a = ȳ − b x̄
- The line passes through (x̄, ȳ).
- The slope b is the expected change in y per unit increase in x.
- The intercept a is the predicted y at x = 0, meaningful only if x = 0 is in range.
H: Checking the model
- Residual plot against x or ŷ: should be patternless with constant spread.
- Curves suggest non-linearity; funnels suggest non-constant variance.
- Outliers and high-leverage points can swing the line.
H: Inference
- With normal, independent, constant-variance errors: t = b/SE(b) with n − 2 degrees of freedom tests whether the slope is zero.
- Confidence intervals for the mean response; wider prediction intervals for a new observation.
- Regress y on x to predict y; the regression of x on y is a different line.
X: For x = 1, 2, 3, 4, 5 and y = 2, 4, 5, 4, 5, find the least squares line and R^{2}.
> S_{xy} = 6, S_{xx} = 10, S_{yy} = 6; b = 0.6
> a = 4 − 0.6 × 3 = 2.2, so ŷ = 2.2 + 0.6x
> R^{2} = S_{xy}^{2}/(S_{xx}S_{yy}) = 36/60 = 0.6
P: **Investigate with the lab.** Add points along a trend, then add one outlier that changes the gradient by more than 50% (the lab's challenge). Watch the residuals change too.
IX: regression
K: b = S_{xy}/S_{xx}, a = ȳ − b x̄; interpret b as change per unit x; R^{2} measures fit; always check residual plots.
!: Interpreting the intercept when x = 0 is far outside the data.
Q: Through which point does every least squares line pass? | (x̄, ȳ).
Q: What does a funnel-shaped residual plot suggest? | Non-constant variance.
SUM: Least squares fits the best straight line.
SUM: Residuals check the fit.
SRC: Department for Education, AS and A level further mathematics subject content | standard | 2016 | https://www.gov.uk/government/publications/gce-as-and-a-level-further-mathematics
SRC: Weisberg S, Applied Linear Regression (4th edn, Wiley 2014) | textbook | 2014 | https://www.wiley.com/
NUM1#maths-u13-36-q1@1: Using ŷ = 2.2 + 0.6x, predict y at x = 3.5. | 4.3 | 0.001 |  | 2.2 + 0.6 × 3.5 = 2.2 + 2.1 = 4.3.
M1#maths-u13-36-q2@1: A regression of exam mark on hours studied has slope 3.2. What does that mean? | Each extra hour is associated with 3.2 more marks on average | Each mark needs 3.2 hours | The intercept is 3.2 | The correlation between hours and marks | Studying causes exactly 3.2% more marks per hour | The slope is the average change in y per unit of x (an association, not proof of cause).
M3#maths-u13-36-q3@2: Why is a prediction interval wider than a confidence interval for the mean response at the same x? | It includes the scatter of individual points as well as uncertainty in the line | It uses a larger significance level than the confidence interval | It ignores the slope | It uses fewer data | They're the same width | A new observation varies about the true line, adding σ^{2} to the uncertainty.
M2#maths-u13-36-q4@2: Why can one outlier change a least-squares line a lot? | Squaring residuals gives a far-away point a very large weight in the sum being minimised | Least squares ignores outliers | Outliers are removed automatically | The gradient never changes | Outliers only affect r | Minimising squared residuals pulls the line strongly towards extreme points.

## Multiple Linear Regression
S: Multiple linear regression models a response using several predictors at once. Each coefficient estimates the effect of one predictor with the others held fixed, which is how regression adjusts for confounders.
O: Interpret coefficients in a multiple regression
O: Recognise multicollinearity and use dummy variables and interactions
T: Multiple regression | y = β₀ + β₁x₁ + … + β_{p}x_{p} + ε, fitted by least squares: β̂ = (XᵀX)^{−1}Xᵀy
T: Multicollinearity | Strong correlation among predictors, which inflates the standard errors of their coefficients
H: Interpretation
- β_{j}: expected change in y per unit increase in x_{j}, holding other predictors constant.
- Coefficients can change sign when predictors are added (adjustment for confounding).
- Adjusted R^{2} penalises extra predictors; plain R^{2} never falls when one is added.
H: Building models
- Categorical predictors enter as dummy (indicator) variables, one fewer than the number of categories.
- Interactions (x₁x₂) let one predictor's effect depend on another.
- Polynomial terms (x^{2}) model curves while staying linear in the parameters.
H: Problems
- Multicollinearity: variance inflation factors (VIF) above about 10 signal trouble.
- Too many predictors: overfitting; use cross-validation, ridge or lasso (later in this school).
- Same residual checks as simple regression.
X: A model gives price (£000) = 50 + 2.5 × area (m^{2}) + 10 × bedrooms. Predict the price of an 80 m^{2}, 3-bedroom flat and interpret the bedroom coefficient.
> 50 + 2.5 × 80 + 10 × 3 = 50 + 200 + 30 = 280
> Predicted price £280,000
> An extra bedroom adds £10,000 on average for flats of the same area
K: Coefficients are effects holding others fixed; use dummies for categories and interactions for changing effects; watch multicollinearity and overfitting.
!: Interpreting a coefficient without "holding the other predictors fixed".
Q: How many dummy variables represent a factor with 4 categories? | 3.
Q: Can R^{2} decrease when a predictor is added? | No; adjusted R^{2} can.
SUM: Multiple regression adjusts for several predictors.
SUM: Check collinearity and overfitting.
SRC: Weisberg S, Applied Linear Regression (4th edn, Wiley 2014) | textbook | 2014 | https://www.wiley.com/
SRC: James G, Witten D, Hastie T, Tibshirani R, An Introduction to Statistical Learning (2nd edn, Springer 2021) | textbook | 2021 | https://www.statlearning.com/
NUM1#maths-u13-37-q1@1: Using price = 50 + 2.5 × area + 10 × bedrooms (£000), find the predicted price difference between two flats of equal size with 2 and 4 bedrooms, in £000. | 20 | 0 | £000 | Holding area fixed, 2 extra bedrooms add 2 × 10 = 20.
M1#maths-u13-37-q2@1: What does a high variance inflation factor indicate? | A predictor is highly correlated with the others | The model fits perfectly | Residuals are non-normal | The residuals are far from normally distributed | The intercept is wrong | VIF measures how much collinearity inflates a coefficient's variance.
M2#maths-u13-37-q3@2: In a model with an interaction x₁x₂, what does the interaction coefficient describe? | How the effect of x₁ changes with x₂ | The average of x₁ and x₂ | The correlation of x₁ and x₂ | The intercept | The residual variance | With an interaction, the slope for x₁ is β₁ + β₁₂x₂.

## Logistic Regression
S: Logistic regression models the probability of a binary outcome, such as disease or no disease, pass or fail, using predictors. It works on the log-odds scale, so its coefficients become odds ratios.
O: Interpret logistic regression coefficients as odds ratios
O: Calculate predicted probabilities from a fitted model
T: Logit | log(p/(1 − p)), the log-odds
T: Logistic model | logit(p) = β₀ + β₁x₁ + … + β_{k}x_{k}, so p = 1/(1 + e^{−η})
H: The model
- The linear predictor η can be any real number; the logistic function maps it to a probability between 0 and 1.
- e^{β_{j}} is the odds ratio for a one-unit increase in x_{j}, holding others fixed.
- Fitted by maximum likelihood (no closed form; iterative methods).
H: Using it
- Predicted probability: p = 1/(1 + e^{−η}).
- Classification: predict "yes" if p exceeds a threshold, chosen by the costs of errors.
- Evaluate with calibration and discrimination (the ROC curve and its AUC).
H: Cautions
- Odds ratios aren't relative risks unless the outcome is rare.
- Complete separation (a predictor perfectly predicts the outcome) makes estimates blow up.
- Roughly 10 or more events per predictor is a common rule of thumb for stable estimates.
X: A model gives logit(p) = −3 + 0.5x. Find the probability at x = 4 and the odds ratio per unit of x.
> η = −3 + 0.5 × 4 = −1
> p = 1/(1 + e^{1}) ≈ 0.269
> Odds ratio per unit = e^{0.5} ≈ 1.65: each unit multiplies the odds by 1.65
K: Logistic regression models log-odds linearly; e^{β} is an odds ratio; p = 1/(1 + e^{−η}); assess calibration and discrimination.
!: Reading a coefficient as a change in probability rather than in log-odds.
Q: What is p when η = 0? | 0.5.
Q: What does e^{β} represent in logistic regression? | The odds ratio for a one-unit increase in the predictor.
SUM: Logistic regression models binary outcomes.
SUM: Its coefficients are log odds ratios.
SRC: Hosmer DW, Lemeshow S, Sturdivant RX, Applied Logistic Regression (3rd edn, Wiley 2013) | textbook | 2013 | https://www.wiley.com/
SRC: Agresti A, Categorical Data Analysis (3rd edn, Wiley 2013) | textbook | 2013 | https://www.wiley.com/
NUM1#maths-u13-38-q1@1: logit(p) = −1 + 0.2x. Find p at x = 5. | 0.5 | 0.001 |  | η = −1 + 1 = 0, so p = 1/(1 + 1) = 0.5.
M1#maths-u13-38-q2@1: A logistic coefficient for smoking is 0.7. What is the odds ratio? | About 2.01 | 0.7 | About 1.07 | About 0.5 | About 7 | e^{0.7} ≈ 2.01: smokers have about twice the odds.
M2#maths-u13-38-q3@2: Why is logistic regression used instead of linear regression for a binary outcome? | Linear models can predict probabilities below 0 or above 1 | Linear regression can't handle two predictors | Binary data are always normal | Logistic regression is always more accurate | There's no difference | The logit link keeps predicted probabilities between 0 and 1.

## Poisson Regression
S: Poisson regression models counts, such as hospital admissions, accidents or species sightings, using a log link so predicted counts stay positive. Its coefficients become rate ratios, and an offset handles different exposure times.
O: Interpret Poisson regression coefficients as rate ratios
O: Use offsets and recognise overdispersion
T: Log-linear model | log μ = β₀ + β₁x₁ + …, so μ = e^{η}
T: Offset | A term log(exposure) with coefficient fixed at 1, so the model describes rates per unit exposure
H: The model
- Counts Y ~ Poisson(μ) with log μ = η.
- e^{β_{j}} is the rate ratio for a one-unit increase in x_{j}.
- Offsets: modelling accidents per vehicle-mile or cases per person-year.
H: Checking fit
- Poisson assumes variance = mean.
- Overdispersion (variance > mean) makes standard errors too small: use quasi-Poisson or negative binomial regression.
- Excess zeros may need zero-inflated models.
H: Uses
- Epidemiology: disease rates by age, area and exposure.
- Road safety, insurance claim frequencies, ecology.
- Log-linear models for contingency tables are Poisson regressions.
X: A model gives log μ = 0.5 + 0.2x. Find the expected count at x = 5 and the rate ratio per unit of x.
> η = 0.5 + 0.2 × 5 = 1.5
> μ = e^{1.5} ≈ 4.48
> Rate ratio = e^{0.2} ≈ 1.22: each unit raises the expected count by about 22%
K: Poisson regression uses a log link; e^{β} is a rate ratio; use offsets for exposure; check for overdispersion.
!: Ignoring overdispersion, which overstates the precision of the estimates.
Q: What does an offset of log(person-years) do? | Turns the model into one for rates per person-year.
Q: What should you use if count data are overdispersed? | Quasi-Poisson or negative binomial regression.
SUM: Poisson regression models counts and rates.
SUM: Coefficients are log rate ratios.
SRC: Agresti A, Categorical Data Analysis (3rd edn, Wiley 2013) | textbook | 2013 | https://www.wiley.com/
SRC: Hilbe JM, Negative Binomial Regression (2nd edn, Cambridge University Press 2011) | textbook | 2011 | https://www.cambridge.org/
NUM1#maths-u13-39-q1@1: A Poisson regression has coefficient −0.3 for a safety feature. Find the rate ratio, to 3 decimal places. | 0.741 | 0.001 |  | e^{−0.3} ≈ 0.741: about a 26% lower rate.
M1#maths-u13-39-q2@1: Why does Poisson regression use a log link? | It keeps predicted counts positive and makes effects multiplicative | Counts are always normal | It removes the need to check overdispersion | It removes the need for data | It makes the model linear in the response y itself | μ = e^{η} is always positive, and coefficients act as rate ratios.
M2#maths-u13-39-q3@2: Hospitals are observed for different lengths of time. How should a Poisson model account for that? | Include log(observation time) as an offset | Divide all counts by 2 to average them | Divide counts by 2 | Use logistic regression | Remove short observations | The offset turns counts into rates per unit time.

## Nonlinear Regression
S: Nonlinear regression fits models whose parameters enter non-linearly, such as exponential growth, saturation curves and enzyme kinetics. These models often come from science and have interpretable parameters, but they're fitted iteratively and need sensible starting values.
O: Distinguish models non-linear in parameters from those non-linear in x
O: Describe how nonlinear least squares is fitted
T: Nonlinear model | A model like y = θ₁(1 − e^{−θ₂x}) that isn't linear in the parameters
T: Gauss–Newton method | An iterative method that repeatedly linearises the model and solves a least squares problem
H: What counts as nonlinear
- y = a + bx + cx^{2} is linear in the parameters (a polynomial), fitted by ordinary least squares.
- y = ae^{bx} and y = V_{max}S/(K_{m} + S) are non-linear in the parameters.
- Mechanistic models (growth, decay, kinetics) give parameters with physical meaning.
H: Fitting
- Minimise Σ(y − f(x; θ))^{2} iteratively (Gauss–Newton, Levenberg–Marquardt).
- Starting values matter: poor ones may fail to converge or find a local minimum.
- Standard errors come from a local linear approximation.
H: Linearising
- Taking logs of y = ae^{bx} gives a straight line, but changes how errors behave.
- The Lineweaver–Burk plot (1/V against 1/S) distorts errors badly; direct nonlinear fitting is better.
X: A Michaelis–Menten model has V_{max} = 10 and K_{m} = 2. Find V at S = 2 and S = 6.
> V = 10S/(2 + S)
> At S = 2: 20/4 = 5 (half of V_{max}: that's what K_{m} means)
> At S = 6: 60/8 = 7.5
K: Nonlinear-in-parameters models need iterative least squares with good starting values; polynomials are still linear models; avoid error-distorting linearisations.
!: Fitting a linearised form and assuming the errors behave as in the original model.
Q: Is y = a + bx + cx^{2} a nonlinear regression model? | No: it's linear in the parameters.
Q: What does K_{m} mean in the Michaelis–Menten model? | The substrate level at which the rate is half of V_{max}.
SUM: Nonlinear regression fits scientific models.
SUM: It needs iteration and good starting values.
SRC: Bates DM, Watts DG, Nonlinear Regression Analysis and Its Applications (Wiley 1988) | textbook | 1988 | https://www.wiley.com/
SRC: Motulsky H, Christopoulos A, Fitting Models to Biological Data Using Linear and Nonlinear Regression (Oxford University Press 2004) | textbook | 2004 | https://global.oup.com/
NUM1#maths-u13-40-q1@1: For y = 20(1 − e^{−0.5x}), find y at x = 2, to 2 decimal places. | 12.64 | 0.01 |  | 20(1 − e^{−1}) ≈ 20 × 0.6321 = 12.64.
M1#maths-u13-40-q2@1: Which model is non-linear in its parameters? | y = ae^{bx} | y = a + bx | y = a + bx + cx^{2} | y = a + b log x | y = a + b/x | b sits inside the exponential, so least squares has no closed form.
M2#maths-u13-40-q3@2: What is a common practical difficulty in nonlinear regression? | The fitting algorithm may need good starting values to converge | It can't produce standard errors | It needs categorical data | It can't handle more than one x | It always has a closed-form solution that is hard to compute | Iterative methods can stall or find local minima from poor starts.

## Robust Regression
S: Robust regression fits lines that aren't thrown off by outliers or heavy-tailed errors. Ordinary least squares squares every residual, so a single wild point can drag the line; robust methods limit that influence.
O: Explain why least squares is sensitive to outliers
O: Describe M-estimation, least absolute deviations and the Theil–Sen estimator
T: Breakdown point | The fraction of contaminated data an estimator can handle before giving arbitrary results; 0% for least squares
T: Huber loss | A loss that's quadratic for small residuals and linear for large ones
H: Methods
- Least absolute deviations (LAD): minimise Σ|residual|; it's median regression.
- M-estimators: Huber or bisquare losses, fitted by iteratively reweighted least squares, down-weighting large residuals.
- Theil–Sen: the median of the slopes between all pairs of points; breakdown point about 29%.
- RANSAC (computer vision): fit to random subsets and keep the model with most inliers.
H: When to use
- Data with outliers that are errors or from a different process.
- Heavy-tailed errors (financial data).
- As a check: if robust and ordinary fits differ greatly, investigate.
H: Cautions
- Don't use robust methods to hide genuine but inconvenient observations.
- Inference is more complex; bootstrap standard errors are common.
X: Points (1, 1), (2, 2), (3, 3), (4, 4), (5, 20). Compare the least squares slope with the Theil–Sen slope.
> Least squares: S_{xy} = 40 and S_{xx} = 10, so b = 4
> Theil–Sen: the six pairs among the first four points have slope 1; pairs with (5, 20) give 4.75, 6, 8.5 and 16
> Median of the ten slopes = 1: the robust line follows the main pattern
P: **Investigate with the lab.** Add a single outlier and measure how far the least-squares line moves. This sensitivity is what robust methods are designed to reduce.
IX: regression
K: Least squares has zero breakdown; LAD, M-estimators and Theil–Sen resist outliers; compare robust and ordinary fits as a diagnostic.
!: Deleting outliers without investigating them.
Q: What is the breakdown point of ordinary least squares? | 0%: one bad point can move it arbitrarily.
Q: How is the Theil–Sen slope calculated? | The median of the slopes between all pairs of points.
SUM: Robust regression resists outliers.
SUM: Big differences from least squares are a warning.
SRC: Huber PJ, Ronchetti EM, Robust Statistics (2nd edn, Wiley 2009) | textbook | 2009 | https://www.wiley.com/
SRC: Rousseeuw PJ, Leroy AM, Robust Regression and Outlier Detection (Wiley 1987) | textbook | 1987 | https://www.wiley.com/
NUM1#maths-u13-41-q1@1: Pairwise slopes between points are 0.8, 1.1, 0.9, 1.0 and 12. Find the Theil–Sen slope. | 1 | 0 |  | The median of 0.8, 0.9, 1.0, 1.1, 12 is 1.0.
M1#maths-u13-41-q2@1: Why is least squares sensitive to outliers? | Squaring residuals gives large errors huge weight | It ignores large residuals and fits small ones only | It uses medians | It only fits horizontal lines | It isn't sensitive | A residual of 10 contributes 100 to the sum, dominating smaller ones.
M2#maths-u13-41-q3@2: Which estimator minimises the sum of absolute residuals? | Least absolute deviations (median regression) | Ridge regression | Ordinary least squares with weights | Logistic regression | The method of moments | LAD replaces squares with absolute values, limiting outliers' pull.
M2#maths-u13-41-q4@2: What problem do robust regression methods address? | Least-squares fits being dragged by a few outliers | Too few data points | Perfect multicollinearity only | Non-numeric data | Negative correlations | Methods like Huber or least absolute deviations down-weight extreme residuals.

## Quantile Regression
S: Quantile regression models how a chosen quantile of the response, such as the median or the 90th percentile, depends on predictors. It reveals effects that differ across the distribution, which mean-based regression averages away.
O: Explain what quantile regression estimates
O: Calculate the check (pinball) loss
T: Quantile regression | Estimating the τth conditional quantile of y as a linear function of x
T: Check loss | ρ_{τ}(u) = u(τ − I(u < 0)): τ|u| for positive residuals, (1 − τ)|u| for negative ones
H: The method
- Minimise Σ ρ_{τ}(y_{i} − x_{i}ᵀβ) for the chosen τ.
- τ = 0.5 gives median regression (least absolute deviations).
- Solved by linear programming; Koenker and Bassett introduced it in 1978.
H: Why use it
- Effects may differ across the distribution: education may raise high earners' wages more than low earners'.
- Robust to outliers in y.
- Handles non-constant variance naturally: different quantiles fan out.
H: Uses
- Growth charts (children's height and weight percentiles by age).
- Value at risk and other risk quantiles in finance.
- Prediction intervals in forecasting and machine learning.
X: For τ = 0.9, find the check loss for residuals of +2 and −2.
> Positive residual: 0.9 × 2 = 1.8
> Negative residual: (1 − 0.9) × 2 = 0.2
> Under-prediction costs nine times as much, pushing the fit up to the 90th percentile
K: Quantile regression fits conditional quantiles using the asymmetric check loss; τ = 0.5 is median regression; it shows effects across the whole distribution.
!: Interpreting a 90th-percentile coefficient as an effect on the mean.
Q: Which quantile regression is the same as least absolute deviations? | Median regression (τ = 0.5).
Q: Name one use of quantile regression. | Growth charts, value at risk or prediction intervals.
SUM: Quantile regression models whole distributions.
SUM: It uses an asymmetric loss.
SRC: Koenker R, Bassett G, Regression quantiles, Econometrica 46(1), 33 | journal | 1978 | https://doi.org/10.2307/1913643
SRC: Koenker R, Quantile Regression (Cambridge University Press 2005) | textbook | 2005 | https://www.cambridge.org/
NUM1#maths-u13-42-q1@1: For τ = 0.25, find the check loss for a residual of −4. | 3 | 0 |  | Negative residual: (1 − 0.25) × 4 = 3.
M1#maths-u13-42-q2@1: What does quantile regression with τ = 0.1 estimate? | The 10th percentile of y given x | The mean of y | The variance of y | The top 10% of x | The probability y > 0.1 | It targets the conditional 10th percentile.
M2#maths-u13-42-q3@2: Why might a 90th-percentile regression slope differ from a median regression slope? | The predictor affects the spread as well as the centre | Quantile regression is biased at high quantiles | Quantile slopes are always flatter | They must be equal | Because of rounding | If x widens the distribution, upper quantiles rise faster than the middle.

## Ridge Regression
S: Ridge regression adds a penalty on the size of the coefficients to least squares. It shrinks estimates towards zero, trading a little bias for a big reduction in variance, which helps with many or highly correlated predictors.
O: Write down the ridge objective and its solution
O: Explain the bias–variance trade-off and choose λ by cross-validation
T: Ridge regression | Minimise Σ(y − Xβ)^{2} + λΣβ_{j}^{2}; solution β̂ = (XᵀX + λI)^{−1}Xᵀy
T: Shrinkage | Pulling estimates towards zero to reduce variance
H: How it works
- λ = 0: ordinary least squares. λ → ∞: all coefficients → 0.
- Adding λI makes XᵀX + λI invertible even when predictors are collinear or p > n.
- Coefficients shrink but never become exactly zero.
- Standardise predictors first, so the penalty treats them equally; don't penalise the intercept.
H: Choosing λ
- k-fold cross-validation: pick λ with the smallest prediction error on held-out folds.
- The bias–variance trade-off: more shrinkage, more bias, less variance.
- Hoerl and Kennard introduced ridge regression in 1970.
H: Interpretation
- It's equivalent to a Bayesian model with a normal prior on β centred at 0.
- Good for prediction with many correlated predictors (genomics, chemometrics).
X: With one standardised predictor and no intercept, S_{xy} = 20 and S_{xx} = 10. Find the least squares and ridge (λ = 10) estimates.
> Least squares: b = 20/10 = 2
> Ridge: b = S_{xy}/(S_{xx} + λ) = 20/20
> = 1: shrunk halfway towards zero
K: Ridge penalises Σβ^{2}, shrinking coefficients (never to exactly zero); it handles collinearity; choose λ by cross-validation; standardise first.
!: Applying ridge without standardising predictors measured on different scales.
Q: What does ridge regression become when λ = 0? | Ordinary least squares.
Q: Can ridge regression set a coefficient exactly to zero? | No, it only shrinks towards zero.
SUM: Ridge shrinks coefficients to cut variance.
SUM: Cross-validation chooses λ.
SRC: Hoerl AE, Kennard RW, Ridge regression: biased estimation for nonorthogonal problems, Technometrics 12(1), 55 | journal | 1970 | https://doi.org/10.1080/00401706.1970.10488634
SRC: Hastie T, Tibshirani R, Friedman J, The Elements of Statistical Learning (2nd edn, Springer 2009) | textbook | 2009 | https://hastie.su.domains/ElemStatLearn/
NUM1#maths-u13-43-q1@1: With one predictor, S_{xy} = 30 and S_{xx} = 15. Find the ridge estimate with λ = 5. | 1.5 | 0.001 |  | 30/(15 + 5) = 1.5 (least squares would give 2).
M1#maths-u13-43-q2@1: What problem does ridge regression especially help with? | Highly correlated predictors | Missing response values | Binary outcomes | Too few predictors | Non-random sampling | Collinearity makes least squares unstable; the penalty stabilises it.
M2#maths-u13-43-q3@2: Ridge regression corresponds to which Bayesian prior on the coefficients? | Normal centred at zero | Uniform on all reals | Laplace (double exponential) | Beta | Poisson | The squared penalty is the log of a normal prior.

## Lasso Regression
S: The lasso penalises the sum of the absolute values of the coefficients. Unlike ridge, it sets some coefficients exactly to zero, so it performs variable selection and gives simpler, more interpretable models.
O: Write down the lasso objective and explain why it gives zeros
O: Compare the lasso, ridge and elastic net
T: Lasso | Minimise ½Σ(y − Xβ)^{2} + λΣ|β_{j}| (least absolute shrinkage and selection operator)
T: Soft-thresholding | For orthonormal predictors, β̂_{j} = sign(b_{j}) max(|b_{j}| − λ, 0), where b_{j} is the least squares estimate
H: Why zeros appear
- The absolute-value penalty has corners at zero; the optimum often lands exactly on them.
- Geometrically: the diamond-shaped constraint region touches the error contours at its corners.
- Larger λ: more coefficients at zero.
H: Practice
- Choose λ by cross-validation; the "one standard error rule" picks a sparser model.
- Standardise predictors.
- With correlated predictors, the lasso tends to pick one arbitrarily; the elastic net (mixing lasso and ridge penalties) handles groups better.
- Introduced by Tibshirani in 1996; fitted efficiently by coordinate descent.
H: Uses and cautions
- High-dimensional data: genetics, text, finance, with more predictors than observations.
- Selected variables aren't guaranteed to be the "true" ones; inference after selection needs special methods.
X: With orthonormal predictors, least squares estimates are 3, −0.5 and 1.2. Find the lasso estimates for λ = 1.
> Soft-threshold each by 1
> 3 → 2; −0.5 → 0 (|−0.5| < 1); 1.2 → 0.2
> Lasso estimates: 2, 0, 0.2; the second predictor is dropped
K: The lasso's |β| penalty shrinks and selects; soft-thresholding shows how; elastic net helps with correlated predictors; choose λ by cross-validation.
!: Treating the variables the lasso selects as proven to matter.
Q: Which penalty can set coefficients exactly to zero, ridge or lasso? | The lasso.
Q: What does the elastic net combine? | The lasso and ridge penalties.
SUM: The lasso shrinks and selects variables.
SUM: Elastic net handles correlated groups.
SRC: Tibshirani R, Regression shrinkage and selection via the lasso, Journal of the Royal Statistical Society B 58(1), 267 | journal | 1996 | https://doi.org/10.1111/j.2517-6161.1996.tb02080.x
SRC: Hastie T, Tibshirani R, Wainwright M, Statistical Learning with Sparsity: The Lasso and Generalizations (CRC Press 2015) | textbook | 2015 | https://hastie.su.domains/StatLearnSparsity/
NUM1#maths-u13-44-q1@1: With orthonormal predictors and λ = 0.5, a least squares estimate of −2 becomes what lasso estimate? | -1.5 | 0.001 |  | Soft-thresholding: sign(−2) × (2 − 0.5) = −1.5.
M1#maths-u13-44-q2@1: Why does the lasso produce exact zeros while ridge doesn't? | The absolute-value penalty has a corner at zero | Ridge uses absolute values of coefficients | Ridge ignores the intercept | The lasso deletes data | The lasso uses a larger λ than ridge in practice | The non-differentiable point at 0 lets the optimum sit exactly there.
M3#maths-u13-44-q3@2: Two predictors are almost perfectly correlated and both matter. What does the plain lasso tend to do? | Keep one and drop the other, somewhat arbitrarily | Keep both with equal coefficients | Drop both | Make both negative | Fail to converge | The lasso picks one from a correlated group; the elastic net tends to keep both.

## Generalised Linear Models (GLMs)
S: Generalised linear models unify linear, logistic, Poisson and other regressions in one framework: a distribution for the response, a linear predictor and a link function joining them. One theory and one fitting algorithm cover them all.
O: Identify the three components of a GLM
O: Choose a distribution and link for common response types
T: Link function | g(μ) = η, connecting the mean μ of the response to the linear predictor η = β₀ + β₁x₁ + …
T: Deviance | A measure of lack of fit, twice the log-likelihood gap to a perfect (saturated) model
H: The three components
- Random component: the response's distribution from the exponential family (normal, binomial, Poisson, gamma, …).
- Systematic component: the linear predictor η.
- Link: identity (normal), logit (binomial), log (Poisson), inverse or log (gamma).
H: Fitting and checking
- Maximum likelihood via iteratively reweighted least squares (IRLS).
- Compare nested models with likelihood ratio (deviance) tests; use AIC for non-nested ones.
- Residual checks use deviance or Pearson residuals; watch for overdispersion.
H: History and uses
- Nelder and Wedderburn (1972) unified the earlier models.
- Insurance pricing (claim frequency by Poisson, claim size by gamma), epidemiology, ecology.
- Extensions: GLMMs add random effects; GAMs replace linear terms with smooth functions (later in this school).
X: Claim sizes are modelled with a gamma GLM and log link: log μ = 2 + 0.1x. Find the mean claim at x = 10 and the multiplicative effect of one unit of x.
> η = 2 + 0.1 × 10 = 3
> μ = e^{3} ≈ 20.1
> Each unit multiplies the mean by e^{0.1} ≈ 1.105 (about 10.5% higher)
K: GLM = distribution + linear predictor + link; logit for binary, log for counts and positive skewed data; fitted by IRLS and compared by deviance.
!: Using a normal linear model for counts or proportions, which can predict impossible values.
Q: What link function does logistic regression use? | The logit.
Q: Which distribution suits positive, right-skewed claim sizes? | The gamma.
SUM: GLMs unify regression models.
SUM: Choose distribution and link by response type.
SRC: McCullagh P, Nelder JA, Generalized Linear Models (2nd edn, Chapman & Hall 1989) | textbook | 1989 | https://www.routledge.com/
SRC: Nelder JA, Wedderburn RWM, Generalized linear models, Journal of the Royal Statistical Society A 135(3), 370 | journal | 1972 | https://doi.org/10.2307/2344614
NUM1#maths-u13-45-q1@1: A Poisson GLM with log link has η = 1.2 for a case. Find the predicted mean, to 3 decimal places. | 3.32 | 0.002 |  | μ = e^{1.2} ≈ 3.320.
M1#maths-u13-45-q2@1: Which three parts make up a GLM? | A response distribution, a linear predictor and a link function | A mean, a median and a mode | A test, a p-value and an interval | Data, code and output | A prior, a likelihood and a posterior distribution | That's Nelder and Wedderburn's framework.
M2#maths-u13-45-q3@2: How are GLMs usually fitted? | Iteratively reweighted least squares (maximum likelihood) | Ordinary least squares in one step | Ordinary least squares with no weighting | The method of moments, matched to the mean only | Bootstrap only | IRLS solves the likelihood equations by repeated weighted least squares.

## Mixed-Effects Models
S: Mixed-effects (multilevel) models handle data with groups or repeated measurements: pupils in schools, patients in hospitals, measurements over time on the same person. They combine fixed effects for the questions of interest with random effects for grouping, giving honest standard errors and sensible estimates for small groups.
O: Distinguish fixed and random effects
O: Calculate the intraclass correlation and explain partial pooling
T: Random effect | A group-level term treated as drawn from a distribution, such as school intercepts u_{j} ~ N(0, σ_{u}^{2})
T: Intraclass correlation | ICC = σ_{u}^{2}/(σ_{u}^{2} + σ_{e}^{2}), the share of variance due to groups
H: The model
- Random intercept: y_{ij} = β₀ + β₁x_{ij} + u_{j} + e_{ij}, with u_{j} the effect of group j.
- Random slopes let the effect of x vary by group.
- Ignoring clustering treats correlated observations as independent, giving standard errors that are too small.
H: Partial pooling
- No pooling: estimate each group separately (noisy for small groups).
- Complete pooling: ignore groups (misses real differences).
- Partial pooling: each group's estimate is shrunk towards the overall mean, more so for small or noisy groups.
- Shrinkage weight for a group mean: w = σ_{u}^{2}/(σ_{u}^{2} + σ_{e}^{2}/n_{j}).
H: Uses
- Education (school effects), clinical trials across centres, longitudinal studies, ecology.
- Fitted by maximum likelihood or REML (software such as lme4 in R).
X: σ_{u}^{2} = 4 and σ_{e}^{2} = 12. A school with 4 sampled pupils has mean 70; the overall mean is 60. Find the ICC and the shrunken school estimate.
> ICC = 4/(4 + 12) = 0.25
> w = 4/(4 + 12/4) = 4/7 ≈ 0.571
> Estimate = 60 + 0.571 × (70 − 60) ≈ 65.7: pulled towards the overall mean
K: Random effects model grouping; ICC is the group share of variance; partial pooling shrinks small groups towards the mean; ignoring clustering understates uncertainty.
!: Analysing repeated measurements as if they were independent observations.
Q: What does an ICC of 0 mean? | Groups explain none of the variance: observations within groups are no more alike than across groups.
Q: Which groups are shrunk most in partial pooling? | Small or noisy groups.
SUM: Mixed models handle clustered data.
SUM: Partial pooling borrows strength across groups.
SRC: Gelman A, Hill J, Data Analysis Using Regression and Multilevel/Hierarchical Models (Cambridge University Press 2007) | textbook | 2007 | https://www.cambridge.org/
SRC: Bates D, Mächler M, Bolker B, Walker S, Fitting linear mixed-effects models using lme4, Journal of Statistical Software 67(1), 1 | journal | 2015 | https://doi.org/10.18637/jss.v067.i01
NUM1#maths-u13-46-q1@1: Find the ICC when σ_{u}^{2} = 2 and σ_{e}^{2} = 8. | 0.2 | 0.001 |  | 2/(2 + 8) = 0.2.
M1#maths-u13-46-q2@1: Pupils are nested in 50 schools. Why use a mixed model rather than ordinary regression? | Pupils in the same school are correlated, so ordinary standard errors are too small | Random effects remove all bias | Mixed models need fewer data | It makes all schools equal | Ordinary regression can't handle more than 20 groups | Clustering violates independence; random effects account for it.
M2#maths-u13-46-q3@2: How does partial pooling treat a school with only 2 sampled pupils? | Its estimate is shrunk strongly towards the overall mean | It's ignored | It's treated as exact | It gets the largest weight | It's pooled with the largest school | Little data means little evidence that the school differs, so shrinkage is strong.

## Generalised Additive Models
S: Generalised additive models (GAMs) replace straight-line terms in a GLM with smooth curves learned from the data. They capture non-linear relationships flexibly while staying interpretable, because each predictor's effect can be plotted on its own.
O: Describe the structure of a GAM
O: Interpret smooth terms and the role of the smoothing penalty
T: GAM | g(μ) = β₀ + f₁(x₁) + f₂(x₂) + …, with each f_{j} a smooth function
T: Effective degrees of freedom | A measure of a smooth's complexity; about 1 means a straight line
H: Structure
- Each f_{j} is built from spline basis functions.
- A penalty on wiggliness (such as λ∫f″(x)^{2} dx) prevents overfitting.
- λ is chosen automatically by generalised cross-validation or REML.
- Large λ forces a straight line; small λ allows a wiggly curve.
H: Interpretation
- Partial effect plots show how each predictor shifts the linear predictor, with confidence bands.
- With a log link, differences on the plot become ratios.
- Combine smooth and linear terms, and smooth interactions (tensor products).
H: Uses and cautions
- Environmental epidemiology: temperature and pollution effects on hospital admissions.
- Ecology: species distributions across gradients; fisheries; energy demand.
- Hastie and Tibshirani introduced GAMs (1986); Wood's mgcv package made them practical.
- Extrapolating a smooth beyond the data is especially unreliable.
X: A Poisson GAM for daily admissions with log link has smooth temperature effect f(30) − f(15) = 0.4. Interpret this.
> On the log scale, admissions at 30°C are 0.4 higher than at 15°C
> Exponentiate: e^{0.4} ≈ 1.49
> About 49% more admissions are expected at 30°C than at 15°C, other terms fixed
K: GAMs add smooth functions inside a GLM; a penalty controls wiggliness; edf ≈ 1 means linear; plot partial effects and don't extrapolate.
!: Over-interpreting wiggles at the edges of the data, where smooths are least certain.
Q: What does an effective degrees of freedom of about 1 suggest? | The effect is close to linear.
Q: What controls how wiggly a GAM smooth can be? | The smoothing penalty λ.
SUM: GAMs model non-linear effects smoothly.
SUM: Penalties keep them from overfitting.
SRC: Wood SN, Generalized Additive Models: An Introduction with R (2nd edn, CRC Press 2017) | textbook | 2017 | https://www.routledge.com/
SRC: Hastie T, Tibshirani R, Generalized additive models, Statistical Science 1(3), 297 | journal | 1986 | https://doi.org/10.1214/ss/1177013604
NUM1#maths-u13-47-q1@1: With a log link, f(x₂) − f(x₁) = −0.2. Find the ratio of expected responses, to 3 decimal places. | 0.819 | 0.001 |  | e^{−0.2} ≈ 0.819: about 18% lower.
M1#maths-u13-47-q2@1: What happens to a GAM smooth as the penalty λ becomes very large? | It becomes a straight line | It becomes more wiggly | It disappears | It passes through every point | It becomes a step function | The penalty on curvature forces f″ towards zero.
M2#maths-u13-47-q3@2: What distinguishes a GAM from a GLM? | Predictors enter through smooth functions rather than straight lines | GAMs can't be plotted | GAMs only use normal data | GLMs can't have several predictors | GAMs have no link function, so responses must be normal | The additive smooth terms replace linear terms.

## Statistical Modelling
S: Statistical modelling is the craft of building, fitting, checking and revising models that describe data and the process generating them. "All models are wrong, but some are useful": the skill is in finding one that's useful for the question.
O: Describe the cycle of model building and checking
O: Compare models with AIC, BIC and cross-validation
T: Akaike information criterion | AIC = 2k − 2 ln L; lower is better; rewards fit, penalises parameters
T: Bayesian information criterion | BIC = k ln n − 2 ln L; a heavier penalty for large n, favouring simpler models
H: The cycle
- Formulate a model from the question and subject knowledge.
- Fit it; check assumptions and fit with residuals and plots.
- Revise; compare alternatives; report uncertainty.
- Validate on new data where possible.
H: Choosing among models
- AIC targets predictive accuracy; BIC targets the "true" model among candidates.
- Cross-validation measures out-of-sample prediction directly.
- Parsimony: prefer the simpler model when performance is similar.
H: Explain or predict?
- Explanatory models aim for interpretable, causal effects; predictive models aim for accuracy.
- Breiman's "two cultures" (2001) contrasted data models with algorithmic models.
- Data dredging (testing many models and reporting the best) inflates apparent fit.
X: Model A has 3 parameters and ln L = −120; model B has 5 and ln L = −117; n = 100. Compare AIC and BIC.
> AIC: A = 6 + 240 = 246; B = 10 + 234 = 244: AIC prefers B
> BIC: A = 3 × 4.605 + 240 ≈ 253.8; B = 5 × 4.605 + 234 ≈ 257.0
> BIC prefers A: the criteria trade fit against complexity differently
K: Build, fit, check, revise; AIC favours prediction, BIC simplicity; cross-validate; match the model to the question.
!: Choosing a model only by R^{2}, which always rewards adding parameters.
Q: Is a lower or higher AIC better? | Lower.
Q: Which criterion penalises extra parameters more heavily for large n, AIC or BIC? | BIC.
SUM: Modelling is an iterative craft.
SUM: Information criteria balance fit and complexity.
SRC: Burnham KP, Anderson DR, Model Selection and Multimodel Inference (2nd edn, Springer 2002) | textbook | 2002 | https://link.springer.com/
SRC: Breiman L, Statistical modeling: the two cultures, Statistical Science 16(3), 199 | journal | 2001 | https://doi.org/10.1214/ss/1009213726
NUM1#maths-u13-48-q1@1: A model has 4 parameters and log-likelihood −50. Find its AIC. | 108 | 0 |  | AIC = 2 × 4 − 2 × (−50) = 8 + 100 = 108.
M1#maths-u13-48-q2@1: What does George Box's "all models are wrong, but some are useful" mean? | Models simplify reality, and the aim is usefulness, not perfect truth | Only complex models with many parameters are useful | Statistics is useless | Models should never be used | All models are equally good | Every model leaves things out; a good one serves its purpose.
M3#maths-u13-48-q3@2: Researchers fit 50 models and report only the one with the best fit and smallest p-value. What's the risk? | The reported fit and significance are overstated | The model will be too simple to be useful | Nothing is wrong with it | The sample becomes biased | AIC becomes negative | Searching many models capitalises on chance, so performance on new data is likely worse.

## Multivariate Statistics
S: Multivariate statistics studies several variables measured together, keeping track of how they relate. It uses mean vectors and covariance matrices, and generalises tests and distances to many dimensions.
O: Describe data with mean vectors and covariance matrices
O: Calculate a Mahalanobis distance and outline multivariate tests
T: Covariance matrix (sample) | S, with variances on the diagonal and covariances off it, estimated from data
T: Mahalanobis distance | D^{2} = (x − μ)ᵀΣ^{−1}(x − μ), distance allowing for scale and correlation
H: Describing multivariate data
- Data matrix: n rows (cases) by p columns (variables).
- Mean vector x̄ and covariance matrix S; correlation matrix R for unit-free comparisons.
- Scatterplot matrices show pairwise relationships.
H: Distances and tests
- Euclidean distance ignores scale and correlation; Mahalanobis distance accounts for both.
- Under multivariate normality, D^{2} ~ χ^{2}_{p}, so large values flag outliers.
- Hotelling's T^{2}: the multivariate t-test for mean vectors.
- MANOVA: comparing mean vectors across several groups.
H: High dimensions
- The curse of dimensionality: with many variables, points become sparse and distances less informative.
- Dimension reduction (PCA, factor analysis) is often the first step.
X: A point is (3, 4), the mean is (0, 0), and the variables are independent with variances 1 and 4. Find the Euclidean and Mahalanobis distances.
> Euclidean: √(9 + 16) = 5
> Mahalanobis: D^{2} = 3^{2}/1 + 4^{2}/4 = 9 + 4 = 13
> D ≈ 3.61: the second coordinate counts less because that variable is more spread out
K: Summarise with mean vectors and covariance matrices; Mahalanobis distance accounts for scale and correlation; Hotelling's T^{2} and MANOVA test mean vectors.
!: Using Euclidean distance on variables measured in very different units.
Q: What distribution does D^{2} follow for multivariate normal data in p dimensions? | χ^{2}_{p}.
Q: What is the multivariate generalisation of the t-test? | Hotelling's T^{2}.
SUM: Multivariate methods handle many variables at once.
SUM: Distances must allow for scale and correlation.
SRC: Johnson RA, Wichern DW, Applied Multivariate Statistical Analysis (6th edn, Pearson 2007) | textbook | 2007 | https://www.pearson.com/
SRC: Mahalanobis PC, On the generalized distance in statistics, Proceedings of the National Institute of Sciences of India 2(1), 49 | journal | 1936 | https://insa.nic.in/
NUM1#maths-u13-49-q1@1: Independent variables have variances 4 and 9. Find D^{2} for the point (2, 3) from mean (0, 0). | 2 | 0.001 |  | D^{2} = 4/4 + 9/9 = 2.
M1#maths-u13-49-q2@1: Why is Mahalanobis distance preferred to Euclidean distance for outlier detection? | It accounts for each variable's spread and the correlations | It ignores correlation but rescales by the mean | It uses absolute rather than squared differences | It needs no covariance matrix | It works only in 1D | Scaling by Σ^{−1} measures distance in standard-deviation units along the data's shape.
M2#maths-u13-49-q3@2: Which test compares mean vectors across three groups? | MANOVA | Paired t-test | Chi-squared goodness of fit | Fisher's exact test | Kolmogorov–Smirnov | MANOVA extends ANOVA to several response variables at once.

## Multivariate Analysis
S: Multivariate analysis covers techniques that find structure in many variables at once: principal components, canonical correlations, correspondence analysis and multidimensional scaling. They reduce dimension, reveal patterns and make high-dimensional data visible.
O: Interpret principal components and the variance they explain
O: Outline other multivariate techniques and their uses
T: Principal component analysis | Finding orthogonal directions (eigenvectors of the covariance matrix) of maximum variance
T: Scree plot | A plot of eigenvalues in decreasing order, used to choose how many components to keep
H: Principal components
- PC1 is the direction of greatest variance; PC2 the greatest remaining, orthogonal to PC1; and so on.
- The proportion of variance explained by PC_{i} is λ_{i}/Σλ.
- Standardise variables (use the correlation matrix) when they're on different scales.
- Loadings show how original variables combine; scores place each case.
H: Other techniques
- Canonical correlation analysis: relationships between two sets of variables.
- Correspondence analysis: maps rows and columns of a contingency table.
- Multidimensional scaling: places items in 2D so distances match given dissimilarities.
H: Uses
- Reducing many correlated measurements to a few indices (deprivation indices, body shape).
- Visualising genetic population structure.
- Pre-processing for regression and machine learning (School 24).
X: The covariance matrix of four standardised variables has eigenvalues 4.2, 1.5, 0.2 and 0.1. How much variance do the first two components explain?
> Total variance = 4.2 + 1.5 + 0.2 + 0.1 = 6
> PC1: 4.2/6 = 70%; PC2: 1.5/6 = 25%
> Together 95%: two components summarise the data well
K: PCA finds directions of maximum variance; eigenvalues give variance explained; standardise mixed-unit variables; other methods map tables and dissimilarities.
!: Running PCA on unstandardised variables measured in different units, so one variable dominates.
Q: What do the eigenvalues in PCA represent? | The variance along each principal component.
Q: Which method maps a contingency table's rows and columns? | Correspondence analysis.
SUM: Multivariate analysis finds structure.
SUM: PCA reduces dimension by variance.
SRC: Jolliffe IT, Principal Component Analysis (2nd edn, Springer 2002) | textbook | 2002 | https://link.springer.com/
SRC: Johnson RA, Wichern DW, Applied Multivariate Statistical Analysis (6th edn, Pearson 2007) | textbook | 2007 | https://www.pearson.com/
NUM1#maths-u13-50-q1@1: Eigenvalues are 3, 1.5, 0.5. What percentage of variance does PC1 explain? | 60 | 0 | % | 3/5 = 60%.
M1#maths-u13-50-q2@1: In PCA, why are the components chosen to be orthogonal? | So each captures new, uncorrelated variation | To make them equal | Because data are always orthogonal | So they're easier to name | They aren't | Orthogonal components avoid double-counting variance.
M2#maths-u13-50-q3@2: Which technique places cities on a map from a table of travel times alone? | Multidimensional scaling | Logistic regression | ANOVA | Kaplan–Meier | Lasso | MDS finds coordinates whose distances reproduce the given dissimilarities.

## Factor Analysis
S: Factor analysis explains correlations among many observed variables by a few unobserved (latent) factors, such as general intelligence or anxiety. It's central to psychology and social science measurement.
O: Interpret factor loadings, communalities and uniquenesses
O: Distinguish factor analysis from PCA, and exploratory from confirmatory analysis
T: Factor model | x = Λf + ε: observed variables are loadings times latent factors plus unique errors
T: Communality | The share of a variable's variance explained by the common factors; uniqueness is the rest
H: The model
- For standardised variables, a loading is the correlation between variable and factor (with uncorrelated factors).
- Communality h^{2} = sum of squared loadings; uniqueness = 1 − h^{2}.
- In a one-factor model, the correlation between two variables is the product of their loadings.
H: Practice
- Exploratory factor analysis (EFA) discovers structure; confirmatory (CFA) tests a specified structure.
- Rotation (varimax, oblimin) makes loadings easier to interpret without changing fit.
- Number of factors: scree plots, parallel analysis, interpretability.
H: Factor analysis vs PCA
- PCA summarises total variance; factor analysis models shared variance with a latent cause.
- Spearman (1904) introduced factor analysis to study general intelligence (g).
- Measurement scales (questionnaires) are validated with factor analysis and reliability measures.
X: In a one-factor model, two standardised test scores have loadings 0.8 and 0.7. Find each communality and the implied correlation.
> Communalities: 0.8^{2} = 0.64 and 0.7^{2} = 0.49
> Uniquenesses: 0.36 and 0.51
> Implied correlation = 0.8 × 0.7 = 0.56
K: Factors are latent causes of correlation; loadings, communalities and uniquenesses describe the fit; EFA explores, CFA tests; rotation aids interpretation.
!: Treating factor analysis and PCA as the same technique.
Q: What is the communality of a variable with loading 0.6 on one factor? | 0.36.
Q: What does factor rotation change? | The loadings' pattern, for interpretability, not the model's fit.
SUM: Factor analysis explains correlations with latent factors.
SUM: It underpins questionnaire measurement.
SRC: Spearman C, "General intelligence," objectively determined and measured, American Journal of Psychology 15(2), 201 | journal | 1904 | https://doi.org/10.2307/1412107
SRC: Fabrigar LR, Wegener DT, Exploratory Factor Analysis (Oxford University Press 2012) | textbook | 2012 | https://global.oup.com/
NUM1#maths-u13-51-q1@1: A standardised variable has loadings 0.6 and 0.3 on two uncorrelated factors. Find its uniqueness. | 0.55 | 0.001 |  | Communality = 0.36 + 0.09 = 0.45, so uniqueness = 0.55.
M1#maths-u13-51-q2@1: What is the main difference between factor analysis and PCA? | Factor analysis models shared variance through latent factors; PCA summarises total variance | PCA uses latent factors; factor analysis summarises variance | They give identical loadings after rotation | Factor analysis has no loadings | PCA needs rotation | FA posits underlying causes; PCA is a data reduction.
M2#maths-u13-51-q3@2: A researcher specifies in advance which items load on which factors and tests the fit. What is this? | Confirmatory factor analysis | Exploratory factor analysis | Cluster analysis | PCA | Discriminant analysis | Confirmatory factor analysis tests a structure specified in advance, unlike exploratory analysis.

## Discriminant Analysis
S: Discriminant analysis classifies observations into known groups using their measurements, and finds the combinations of variables that best separate the groups. Fisher introduced it in 1936 with his famous iris data.
O: Describe linear and quadratic discriminant analysis
O: Find a classification boundary in a simple case
T: Linear discriminant analysis (LDA) | Classification assuming normal classes with a common covariance matrix, giving linear boundaries
T: Quadratic discriminant analysis (QDA) | Allows each class its own covariance matrix, giving curved boundaries
H: How it works
- Model each class as normal; use Bayes' theorem with prior class probabilities to get posterior probabilities.
- Classify to the class with the highest posterior.
- With a common covariance, the boundary is linear; with different covariances, quadratic.
H: Fisher's view
- Find the projection that maximises between-class separation relative to within-class spread.
- For k classes, at most k − 1 discriminant directions: a dimension reduction tool.
- The iris data (three species, four measurements) remain a standard example.
H: In practice
- Compare with logistic regression, which makes fewer distributional assumptions.
- Estimate error rates by cross-validation, not on the training data.
- Unequal priors (or costs) shift the boundary towards the rarer class.
X: Two classes have means 10 and 16 with common σ = 2. Find the boundary with equal priors, and with priors 0.8 and 0.2.
> Equal priors: the midpoint, x = 13
> Unequal: x = 13 + σ^{2} ln(0.8/0.2)/(16 − 10) = 13 + 4 × 1.386/6
> ≈ 13.92: the boundary moves towards the rarer class's mean
K: LDA assumes normal classes with shared covariance (linear boundary); QDA allows different covariances; priors shift boundaries; validate by cross-validation.
!: Reporting the classification accuracy on the same data used to fit the model.
Q: What shape are LDA's decision boundaries? | Linear (straight lines or planes).
Q: How many discriminant directions are there for 4 classes (with enough variables)? | 3.
SUM: Discriminant analysis classifies into known groups.
SUM: Assumptions set the boundary shape.
SRC: Fisher RA, The use of multiple measurements in taxonomic problems, Annals of Eugenics 7(2), 179 | journal | 1936 | https://doi.org/10.1111/j.1469-1809.1936.tb02137.x
SRC: Hastie T, Tibshirani R, Friedman J, The Elements of Statistical Learning (2nd edn, Springer 2009) | textbook | 2009 | https://hastie.su.domains/ElemStatLearn/
NUM1#maths-u13-52-q1@1: Two equally likely normal classes with the same variance have means 4 and 10. Where is the LDA boundary? | 7 | 0 |  | With equal priors and variances, the boundary is the midpoint (4 + 10)/2.
M1#maths-u13-52-q2@1: What does QDA allow that LDA doesn't? | Different covariance matrices for each class | More than two classes | Non-normal data | More than two predictor variables | Categorical predictors in place of continuous ones | Separate covariances make the boundaries quadratic.
M2#maths-u13-52-q3@2: How should a discriminant classifier's error rate be estimated? | By cross-validation or a separate test set | On the training data used to fit the boundary | By the number of variables | It can't be estimated | From the priors alone | Training error is optimistic; held-out data give an honest estimate.

## Cluster Analysis
S: Cluster analysis groups observations so that those in a cluster are more similar to each other than to those in other clusters, without any known labels. It's used for market segmentation, gene expression patterns, image segmentation and more.
O: Carry out steps of the k-means algorithm
O: Compare k-means, hierarchical clustering and density-based methods
T: k-means | Partitioning data into k clusters to minimise the within-cluster sum of squared distances to cluster centres
T: Dendrogram | A tree diagram showing how hierarchical clustering merges observations
H: k-means
- Choose k starting centres; assign each point to the nearest; recompute centres as means; repeat until stable.
- It finds a local minimum, so run it from several starts.
- Choose k with the elbow method, silhouette scores or subject knowledge.
- Works best for compact, similarly sized, roughly spherical clusters.
H: Other methods
- Hierarchical: merge the closest clusters step by step (single, complete, average or Ward's linkage); cut the dendrogram for k clusters.
- DBSCAN: density-based; finds arbitrary shapes and labels noise points.
- Gaussian mixture models: soft, probabilistic clusters (fitted by EM).
H: Cautions
- Standardise variables so no unit dominates.
- Algorithms always return clusters, even in structureless data; check stability.
- There's no single right answer: validate with external information.
X: Points 1, 2, 3, 10, 11, 12 on a line; k = 2 with starting centres 1 and 2. Run k-means.
> Assign: 1 → centre 1; 2, 3, 10, 11, 12 → centre 2. New centres: 1 and 38/5 = 7.6
> Reassign: 1, 2, 3 → first; 10, 11, 12 → second. New centres: 2 and 11
> Reassigning changes nothing: converged with clusters {1, 2, 3} and {10, 11, 12}
K: k-means alternates assignment and averaging; use several starts and choose k carefully; hierarchical and density methods suit other shapes; standardise and validate.
!: Believing that clusters found by an algorithm must reflect real groups.
Q: What does k-means minimise? | The total within-cluster sum of squared distances.
Q: Which method can find non-spherical clusters and flag noise? | DBSCAN.
SUM: Clustering finds groups without labels.
SUM: Results depend on method, scale and k.
SRC: Kaufman L, Rousseeuw PJ, Finding Groups in Data: An Introduction to Cluster Analysis (Wiley 1990) | textbook | 1990 | https://www.wiley.com/
SRC: James G, Witten D, Hastie T, Tibshirani R, An Introduction to Statistical Learning (2nd edn, Springer 2021) | textbook | 2021 | https://www.statlearning.com/
NUM1#maths-u13-53-q1@1: A cluster contains points 2, 4 and 9. What is its k-means centre? | 5 | 0 |  | The centre is the mean: (2 + 4 + 9)/3 = 5.
M1#maths-u13-53-q2@1: Why run k-means from several random starts? | It can converge to different local minima | It always gives the same result | To increase k | To standardise the data | To remove outliers | The algorithm only guarantees a local optimum.
M3#maths-u13-53-q3@2: Data are uniformly scattered with no real groups, and k-means is run with k = 3. What happens? | It still returns three clusters | It returns an error | It finds one cluster | It finds no clusters | It finds the true groups | Clustering algorithms always partition; checking stability and validity is up to you.

## Frequentist Statistics
S: Frequentist statistics defines probability as long-run frequency and judges methods by how they perform over repeated samples: how often intervals cover the truth, how often tests err. It's the basis of most published science and regulatory decisions.
O: Explain the frequentist interpretation of probability and inference
O: Describe the strengths and limitations of frequentist methods
T: Frequentist probability | The limit of the relative frequency of an event in infinitely many repetitions
T: Coverage | The proportion of repeated-sample intervals that contain the true parameter
H: Principles
- Parameters are fixed but unknown; data are random.
- Procedures are judged by their sampling properties: unbiasedness, coverage, error rates, power.
- Key figures: Fisher (likelihood, significance), Neyman and Pearson (tests, confidence intervals).
H: Strengths
- No prior distribution is needed; results don't depend on personal beliefs.
- Error rates can be controlled and audited, which suits regulation (drug trials).
- Well-developed, standard methods with known properties.
H: Limitations
- Results can't directly state the probability that a hypothesis is true.
- Interpretation of p-values and intervals is often misunderstood.
- Some procedures depend on the experimenter's intentions (stopping rules), not just the data.
X: Twenty independent 95% confidence intervals are computed. What's the probability that all of them contain their true parameters?
> Each covers with probability 0.95
> All twenty: 0.95^{20}
> ≈ 0.358: it's more likely than not that at least one misses
K: Frequentists treat parameters as fixed and judge methods by repeated-sampling performance; strong on error control, weaker on direct probability statements.
!: Interpreting a frequentist interval as a probability statement about the parameter.
Q: In frequentist statistics, is a parameter random? | No: it's fixed but unknown.
Q: What does 95% coverage mean? | 95% of intervals from repeated samples contain the true value.
SUM: Frequentism judges methods by long-run performance.
SUM: It underpins regulatory science.
SRC: Neyman J, Outline of a theory of statistical estimation based on the classical theory of probability, Philosophical Transactions of the Royal Society A 236, 333 | journal | 1937 | https://doi.org/10.1098/rsta.1937.0005
SRC: Efron B, Hastie T, Computer Age Statistical Inference (Cambridge University Press 2016) | textbook | 2016 | https://hastie.su.domains/CASI/
NUM1#maths-u13-54-q1@1: How many of 200 independent 95% confidence intervals are expected to miss the true value? | 10 | 0 |  | 5% of 200 = 10.
M1#maths-u13-54-q2@1: How does a frequentist interpret "probability"? | As a long-run relative frequency | As a degree of personal belief | As a logical certainty | As a betting quote only | As a fixed constant | Frequentist probability describes repeated experiments.
M2#maths-u13-54-q3@2: Why do regulators often favour frequentist designs for drug trials? | They give pre-specified, controllable error rates | They need no data | They always show benefit | They're cheaper | Bayesian methods are banned in regulatory submissions | Fixed α and power make decisions auditable before results are seen.

## Bayesian Statistics
S: Bayesian statistics treats unknown quantities as having probability distributions that express uncertainty. It combines prior knowledge with data through Bayes' theorem, giving direct probability statements about parameters and hypotheses.
O: Explain the Bayesian approach and its main tools
O: Use a Bayes factor to compare two hypotheses
T: Posterior distribution | The distribution of a parameter after seeing the data: posterior ∝ likelihood × prior
T: Bayes factor | The ratio of the probabilities of the data under two hypotheses; it converts prior odds to posterior odds
H: The approach
- Probability represents degree of belief (or information).
- Start with a prior, update with the likelihood, obtain the posterior.
- Credible intervals: "there's a 95% probability the parameter lies here, given the model and data".
- Predictions average over parameter uncertainty (posterior predictive distribution).
H: Comparing hypotheses
- Posterior odds = Bayes factor × prior odds.
- Bayes factors above about 10 are often called strong evidence.
- Unlike p-values, Bayes factors can support the null hypothesis.
H: In practice
- Computation by conjugate formulas, or by MCMC for realistic models (later in this school).
- Hierarchical models share information across groups.
- Critics worry about subjective priors; proponents reply that priors are explicit and can be checked by sensitivity analysis.
X: A coin is either fair (p = 0.5) or biased (p = 0.8), equally likely a priori. It shows 8 heads in 10 tosses. Find the Bayes factor and the posterior probability of bias.
> P(data | 0.8) ∝ 0.8^{8} × 0.2^{2} ≈ 0.00671; P(data | 0.5) ∝ 0.5^{10} ≈ 0.000977
> Bayes factor ≈ 6.87, and prior odds are 1, so posterior odds ≈ 6.87
> P(biased | data) = 6.87/7.87 ≈ 0.87
K: Posterior ∝ likelihood × prior; credible intervals are direct probability statements; posterior odds = Bayes factor × prior odds.
!: Ignoring the prior odds when interpreting a Bayes factor.
Q: How do posterior odds relate to prior odds? | Posterior odds = Bayes factor × prior odds.
Q: Can a Bayes factor provide evidence for a null hypothesis? | Yes.
SUM: Bayesian statistics updates beliefs with data.
SUM: It gives direct probability statements.
SRC: Gelman A, Carlin JB, Stern HS, Dunson DB, Vehtari A, Rubin DB, Bayesian Data Analysis (3rd edn, CRC Press 2013) | textbook | 2013 | https://sites.stat.columbia.edu/gelman/book/
SRC: Kass RE, Raftery AE, Bayes factors, Journal of the American Statistical Association 90(430), 773 | journal | 1995 | https://doi.org/10.1080/01621459.1995.10476572
NUM1#maths-u13-55-q1@1: Prior odds are 1:4 for H₁ and the Bayes factor in favour of H₁ is 20. Find the posterior odds for H₁. | 5 | 0 |  | Posterior odds = 20 × 1/4 = 5 (5 to 1).
M1#maths-u13-55-q2@1: What does a Bayesian 95% credible interval mean? | Given the model and data, the parameter lies in it with probability 0.95 | 95% of repeated intervals cover the parameter | The p-value is 0.05 | The prior is 95% certain | The data are 95% accurate | Bayesian intervals are direct probability statements about the parameter.
M2#maths-u13-55-q3@2: What is the main criticism of Bayesian methods? | Results can depend on the choice of prior | They can't handle data | They never give intervals | They're always identical to frequentist results | They can't compare hypotheses | Priors bring judgement in, so sensitivity analysis is important.

## Bayesian Inference
S: Bayesian inference is the practical process of fitting a Bayesian model: choosing a likelihood and prior, computing the posterior, summarising it and checking the model. Conjugate cases show clearly how prior and data combine.
O: Update a normal prior with normal data
O: Summarise a posterior and check a model with posterior predictive checks
T: Precision | 1/variance; in normal updating, precisions add
T: Posterior predictive check | Comparing observed data with data simulated from the fitted model
H: Normal–normal updating
- Prior μ ~ N(m₀, s₀^{2}); data x₁, …, x_{n} ~ N(μ, σ^{2}) with σ known.
- Posterior precision = 1/s₀^{2} + n/σ^{2}.
- Posterior mean = precision-weighted average of m₀ and x̄.
- With lots of data, the posterior is dominated by the data.
H: Summaries
- Posterior mean, median or mode (MAP) as point estimates.
- Credible intervals: equal-tailed or highest posterior density.
- Probabilities of interest directly: P(μ > 100 | data).
H: Checking
- Simulate replicated data from the posterior predictive and compare features with the real data.
- Sensitivity analysis: does the answer change much with a different reasonable prior?
- Hierarchical models put priors on priors, sharing information across groups.
X: Prior μ ~ N(100, 10^{2}); 4 observations with σ = 10 have mean 110. Find the posterior.
> Prior precision 1/100 = 0.01; data precision 4/100 = 0.04; total 0.05, so variance 20 (SD ≈ 4.47)
> Mean = (0.01 × 100 + 0.04 × 110)/0.05 = 5.4/0.05 = 108
> Posterior N(108, 20); 95% credible interval ≈ 108 ± 8.8
K: Precisions add; the posterior mean is a precision-weighted average; summarise with means and credible intervals; check with posterior predictive simulations.
!: Forgetting to weight prior and data by their precisions.
Q: What happens to the prior's influence as n grows? | It shrinks: the data dominate.
Q: What does a posterior predictive check compare? | Observed data with data simulated from the fitted model.
SUM: Bayesian inference fits, summarises and checks.
SUM: Conjugate updates show the mechanics.
SRC: Gelman A, Carlin JB, Stern HS, Dunson DB, Vehtari A, Rubin DB, Bayesian Data Analysis (3rd edn, CRC Press 2013) | textbook | 2013 | https://sites.stat.columbia.edu/gelman/book/
SRC: McElreath R, Statistical Rethinking (2nd edn, CRC Press 2020) | textbook | 2020 | https://xcelab.net/rm/
NUM1#maths-u13-56-q1@1: Prior precision is 0.02 and data precision is 0.08. Find the posterior variance. | 10 | 0 |  | Posterior precision 0.10, so variance 1/0.1 = 10.
M1#maths-u13-56-q2@1: In normal–normal updating, which has more influence on the posterior mean? | Whichever of prior and data has the higher precision | Always the prior | Neither: they always count equally | Always the data, whatever the prior | Whichever of prior and data has the larger mean | The posterior mean weights each source by its precision.
M3#maths-u13-56-q3@2: Doubling the number of observations in a normal model does what to the data's precision? | Doubles it | Halves it | Leaves it unchanged | Squares it | Quadruples it | Data precision is n/σ^{2}, proportional to n.

## Prior and Posterior Distributions
S: The prior expresses what is believed about a parameter before the data; the posterior expresses what is believed after. Choosing priors thoughtfully, and showing how much they matter, is central to honest Bayesian analysis.
O: Describe types of prior and when to use them
O: Show how prior strength affects the posterior
T: Informative prior | A prior that carries substantial information, such as from earlier studies
T: Weakly informative prior | A prior that rules out absurd values while letting the data dominate
H: Kinds of prior
- Informative: based on previous data or expert elicitation.
- Weakly informative: gentle regularisation, such as N(0, 2.5^{2}) on a standardised logistic coefficient.
- "Non-informative": flat or Jeffreys priors; flat priors on one scale aren't flat on another.
- Conjugate priors give closed-form posteriors (beta–binomial, gamma–Poisson, normal–normal).
H: Prior strength
- In beta–binomial updating, Beta(α, β) acts like α + β previous observations.
- A strong prior needs a lot of data to move; a weak one moves quickly.
- Sensitivity analysis: report results under several reasonable priors.
H: Posteriors
- The posterior combines everything known; it becomes the prior for the next study.
- With enough data, posteriors from different reasonable priors converge.
- Improper priors are allowed only if the posterior is proper.
X: Data: 30 successes in 50 trials. Compare the posterior means from a Beta(20, 80) prior and a Beta(1, 1) prior.
> Beta(20, 80) → Beta(50, 100): mean 50/150 ≈ 0.333
> Beta(1, 1) → Beta(31, 21): mean 31/52 ≈ 0.596
> The strong prior (worth 100 observations, mean 0.2) holds the estimate down: prior choice matters with modest data
K: Priors range from informative to weakly informative; conjugate priors give closed forms; prior strength acts like extra data; always check sensitivity.
!: Calling a flat prior "objective" without checking how it behaves on other scales.
Q: How many observations is a Beta(10, 30) prior roughly worth? | 40.
Q: What is a weakly informative prior for? | Ruling out absurd values while letting the data dominate.
SUM: Priors encode existing knowledge.
SUM: Their influence should be shown, not hidden.
SRC: Gelman A, Carlin JB, Stern HS, Dunson DB, Vehtari A, Rubin DB, Bayesian Data Analysis (3rd edn, CRC Press 2013) | textbook | 2013 | https://sites.stat.columbia.edu/gelman/book/
SRC: O'Hagan A et al, Uncertain Judgements: Eliciting Experts' Probabilities (Wiley 2006) | textbook | 2006 | https://www.wiley.com/
NUM1#maths-u13-57-q1@1: A Beta(4, 6) prior is updated with 6 successes in 10 trials. Find the posterior mean. | 0.5 | 0.001 |  | Posterior Beta(10, 10), mean 10/20 = 0.5.
M1#maths-u13-57-q2@1: Which prior lets the data dominate while excluding absurd values? | A weakly informative prior | A strongly informative prior | A point-mass prior | No prior at all | An improper posterior | Weakly informative priors regularise gently without imposing strong beliefs.
M2#maths-u13-57-q3@2: Why might a flat prior on a probability p not be "uninformative" about the odds p/(1 − p)? | A flat distribution on one scale isn't flat after transformation | Flat priors are invalid for any probability | It's always uninformative | Odds don't exist | Odds are always 1 | Non-linear transformations reshape a uniform distribution.

## Bootstrap Methods
S: The bootstrap estimates the uncertainty of almost any statistic by resampling the data with replacement many times and recalculating the statistic. It replaces difficult formulas with computing power and works for medians, ratios, correlations and model outputs.
O: Carry out a bootstrap to estimate a standard error and percentile interval
O: Recognise when the basic bootstrap fails
T: Bootstrap replicate | The statistic recomputed on one resample of size n drawn with replacement
T: Percentile interval | The interval between the 2.5th and 97.5th percentiles of the bootstrap replicates
H: Procedure
- Draw B resamples (often 1,000 to 10,000) of size n, with replacement.
- Compute the statistic on each.
- The SD of the replicates estimates the standard error.
- Percentile interval: with B = 1,000, take the 25th and 975th sorted values.
H: Variants
- BCa intervals correct for bias and skewness.
- Parametric bootstrap: resample from a fitted model.
- Block bootstrap for time series, keeping dependence intact.
H: When it fails
- Extremes such as the sample maximum (the bootstrap can't exceed the observed maximum).
- Very small samples, where the data poorly represent the population.
- Dependent data resampled as if independent.
- Each resample leaves out about 37% of the original observations ((1 − 1/n)^{n} → e^{−1}).
X: You have 1,000 bootstrap medians sorted in order. How do you form a 95% percentile interval and a standard error?
> The 95% interval runs from the 25th to the 975th sorted value (2.5% in each tail)
> The standard error is the standard deviation of the 1,000 medians
> No formula for the median's sampling distribution was needed
K: Resample with replacement, recompute, and use the spread of replicates; percentile and BCa intervals; beware extremes, tiny samples and dependence.
!: Using the bootstrap for the sample maximum or other extreme statistics.
Q: Are bootstrap samples drawn with or without replacement? | With replacement.
Q: What variant of the bootstrap suits time series? | The block bootstrap.
SUM: The bootstrap estimates uncertainty by resampling.
SUM: It has known failure cases.
SRC: Efron B, Bootstrap methods: another look at the jackknife, Annals of Statistics 7(1), 1 | journal | 1979 | https://doi.org/10.1214/aos/1176344552
SRC: Efron B, Tibshirani RJ, An Introduction to the Bootstrap (Chapman & Hall 1993) | textbook | 1993 | https://www.routledge.com/
NUM1#maths-u13-58-q1@1: For n = 10, find the probability that a particular observation is absent from a bootstrap resample, to 4 decimal places. | 0.3487 | 0.0005 |  | (1 − 1/10)^{10} = 0.9^{10} ≈ 0.3487.
M1#maths-u13-58-q2@1: What does the standard deviation of bootstrap replicates estimate? | The standard error of the statistic | The population mean | The sample size | The p-value | The mean of the population being sampled | Replicates mimic repeated sampling, so their spread estimates the sampling SD.
M3#maths-u13-58-q3@2: Why does the basic bootstrap work poorly for the sample maximum? | Resamples can never exceed the observed maximum, so they understate the uncertainty | It needs normally distributed data | Bootstraps only work for means | The maximum has no sampling distribution at all | Maxima can't be resampled | The replicates pile up at the observed maximum, missing the chance that the true maximum is higher.

## Permutation Tests
S: A permutation test finds a p-value by shuffling group labels many times and seeing how often the shuffled data look as extreme as the real data. It needs only that labels are exchangeable under the null hypothesis, so it's exact and assumption-light.
O: Carry out a permutation test for a difference between groups
O: State the exchangeability assumption
T: Permutation distribution | The distribution of a test statistic over all (or many random) relabellings of the data
T: Exchangeability | Under H₀, any assignment of labels to the observed values is equally likely
H: Method
- Compute the statistic (such as the difference in means) for the real data.
- Shuffle the labels and recompute; repeat for all arrangements or many random ones.
- p-value = proportion of shuffled statistics at least as extreme as the observed one.
H: Why it works
- In a randomised experiment, H₀ (no effect) means the outcomes would be the same whatever the assignment.
- So the permutation distribution is the exact null distribution, whatever the data's shape.
- Fisher described this logic in 1935; computers made it practical.
H: Uses and limits
- Any statistic can be used: medians, trimmed means, correlations, machine learning accuracies.
- Needs exchangeability: unequal variances or dependence can invalidate it.
- With many permutations, Monte Carlo p-values approximate the exact one.
X: Group A: 7, 9; group B: 1, 3. The difference in means is 6. Find the exact one-sided permutation p-value.
> There are C(4, 2) = 6 ways to choose which two values are labelled A
> The differences (A − B) are 6, 0, −2, 2, 0, −6
> Only one arrangement (the observed one) gives 6 or more: p = 1/6 ≈ 0.167
K: Shuffle labels, recompute the statistic, and count how often shuffles are as extreme; valid under exchangeability; works for any statistic.
!: Using permutation tests when observations aren't exchangeable under H₀ (for example, very unequal variances).
Q: What assumption does a permutation test need? | Exchangeability of labels under the null hypothesis.
Q: How many ways can 6 observations be split into two groups of 3? | 20.
SUM: Permutation tests shuffle labels.
SUM: They give exact p-values under exchangeability.
SRC: Good PI, Permutation, Parametric, and Bootstrap Tests of Hypotheses (3rd edn, Springer 2005) | textbook | 2005 | https://link.springer.com/
SRC: Fisher RA, The Design of Experiments (Oliver and Boyd 1935) | textbook | 1935 | https://archive.org/
NUM1#maths-u13-59-q1@1: Of 2,000 random shuffles, 37 give a statistic at least as extreme as observed. Estimate the p-value, to 4 decimal places. | 0.0185 | 0.0001 |  | 37/2000 = 0.0185.
M1#maths-u13-59-q2@1: Why are permutation tests natural for randomised experiments? | Randomisation makes every label assignment equally likely under H₀ | They need normal data | They're always more powerful | They're faster to compute than t-tests on any data | They always reject | The random assignment itself generates the null distribution.
M2#maths-u13-59-q3@2: What is the smallest possible exact two-sided p-value with groups of 2 and 2? | 1/3 | 1/6 | 1/24 | 0.05 | 1/12 | With 6 arrangements, the two most extreme (one in each direction) give 2/6 = 1/3.

## Monte Carlo Methods
S: Monte Carlo methods use random simulation to compute quantities that are hard to find exactly: probabilities, integrals, the behaviour of complex systems. Their error shrinks like 1/√N whatever the dimension, which makes them indispensable for high-dimensional problems.
O: Estimate probabilities and integrals by simulation
O: Calculate the Monte Carlo standard error and describe variance reduction
T: Monte Carlo estimate | The average of a function over random draws, estimating its expectation
T: Monte Carlo standard error | σ/√N for an average of N independent simulations
H: The basic idea
- To estimate E[g(X)], draw X₁, …, X_{N} and average g(X_{i}).
- Probabilities: the proportion of simulations where the event happens.
- Integrals: ∫ g(x) dx over [a, b] ≈ (b − a) × average of g at uniform random points.
- The law of large numbers guarantees convergence; the CLT gives the error.
H: Accuracy
- Error ∝ 1/√N: 100 times more simulations for one extra decimal place.
- The rate doesn't depend on dimension, unlike grid-based integration.
- Variance reduction: antithetic variables, control variates, importance sampling, stratification.
H: History and uses
- Named by Ulam, von Neumann and Metropolis at Los Alamos in the 1940s.
- Uses: option pricing (School 21), particle physics, risk models, Bayesian computation (MCMC, next).
- Reproducibility: set and report random seeds.
X: 10,000 random points in the unit square give 7,850 inside the quarter circle x^{2} + y^{2} ≤ 1. Estimate π and its standard error.
> The proportion estimates π/4: 0.785, so π ≈ 3.14
> SE of the proportion = √(0.785 × 0.215/10,000) ≈ 0.0041
> SE of the π estimate ≈ 4 × 0.0041 ≈ 0.016
K: Average simulated values to estimate expectations; error ∝ 1/√N regardless of dimension; use variance reduction; record seeds.
!: Reporting a Monte Carlo estimate without its simulation error.
Q: By what factor must N grow to halve the Monte Carlo error? | 4.
Q: Name one variance reduction technique. | Antithetic variables, control variates, importance sampling or stratification.
SUM: Simulation estimates what algebra can't.
SUM: Error falls as 1/√N.
SRC: Robert CP, Casella G, Monte Carlo Statistical Methods (2nd edn, Springer 2004) | textbook | 2004 | https://link.springer.com/
SRC: Metropolis N, Ulam S, The Monte Carlo method, Journal of the American Statistical Association 44(247), 335 | journal | 1949 | https://doi.org/10.1080/01621459.1949.10483310
NUM1#maths-u13-60-q1@1: A simulation's single-run SD is 5. What is the Monte Carlo standard error of the average of 10,000 runs? | 0.05 | 0.0001 |  | 5/√10000 = 5/100 = 0.05.
M1#maths-u13-60-q2@1: Why is Monte Carlo integration attractive in high dimensions? | Its error rate doesn't depend on the dimension | It's exact, with no random error at all | It needs no random numbers | Grids are always better | It has zero variance | Grid methods need exponentially many points as dimension grows; Monte Carlo doesn't.
M2#maths-u13-60-q3@2: What does importance sampling do? | Samples more from the regions that matter most, then reweights | Removes randomness | Doubles the sample | Ignores rare events | Removes the randomness from the simulation | Concentrating draws where the integrand is large, then correcting with weights, reduces variance.

## Markov Chain Monte Carlo (MCMC)
S: Markov chain Monte Carlo draws samples from complicated distributions, especially Bayesian posteriors, by running a random walk designed to spend time in each region in proportion to its probability. It made realistic Bayesian models practical.
O: Explain how a Metropolis–Hastings sampler works
O: Diagnose convergence and mixing
T: Metropolis–Hastings | Propose a move from x to y; accept with probability min(1, π(y)q(x | y)/(π(x)q(y | x))), else stay
T: Effective sample size | The number of independent draws that the autocorrelated chain is worth
H: Algorithms
- Metropolis (symmetric proposals): accept with probability min(1, π(y)/π(x)).
- Only ratios of π are needed, so the normalising constant of the posterior is never required.
- Gibbs sampling: update each parameter from its conditional distribution in turn.
- Hamiltonian Monte Carlo (used by Stan) uses gradients to make long, efficient moves.
H: Diagnostics
- Burn-in (warm-up): discard early draws before the chain reaches its target.
- Trace plots should look like stable "hairy caterpillars".
- Run several chains from different starts; R̂ close to 1 (below about 1.01) suggests convergence.
- Autocorrelation reduces the effective sample size.
H: History
- Metropolis et al. (1953) for physics; Hastings (1970) generalised it.
- Gelfand and Smith (1990) brought Gibbs sampling to statistics, sparking the Bayesian revolution.
X: In a Metropolis sampler with a symmetric proposal, the current point has density 0.2 and the proposal 0.1. What's the acceptance probability, and what if the proposal had density 0.3?
> min(1, 0.1/0.2) = 0.5: accept half the time
> min(1, 0.3/0.2) = 1: always accept a move uphill
> So the chain moves freely uphill and sometimes downhill, matching the target in the long run
K: MCMC builds a Markov chain with the target as its stationary distribution; Metropolis needs only density ratios; check burn-in, R̂ and effective sample size.
!: Treating draws as independent and ignoring autocorrelation when computing precision.
Q: Why doesn't Metropolis–Hastings need the posterior's normalising constant? | It only uses ratios of the target density.
Q: What does an R̂ close to 1 suggest? | Multiple chains agree: likely convergence.
SUM: MCMC samples from complex distributions.
SUM: Diagnostics check that it worked.
SRC: Metropolis N et al, Equation of state calculations by fast computing machines, Journal of Chemical Physics 21(6), 1087 | journal | 1953 | https://doi.org/10.1063/1.1699114
SRC: Gelman A, Carlin JB, Stern HS, Dunson DB, Vehtari A, Rubin DB, Bayesian Data Analysis (3rd edn, CRC Press 2013) | textbook | 2013 | https://sites.stat.columbia.edu/gelman/book/
NUM1#maths-u13-61-q1@1: With a symmetric proposal, π(current) = 0.08 and π(proposed) = 0.02. Find the acceptance probability. | 0.25 | 0.001 |  | min(1, 0.02/0.08) = 0.25.
M1#maths-u13-61-q2@1: What is burn-in in MCMC? | Early draws discarded before the chain settles into its target distribution | A diagnostic statistic computed at the end | The proposal distribution | The thinning interval | The final draws, kept as the main sample | Starting values may be unrepresentative, so initial draws are dropped.
M2#maths-u13-61-q3@2: Which sampler updates each parameter in turn from its full conditional distribution? | Gibbs sampling | Rejection sampling | Bootstrap | Importance sampling | k-means | Gibbs cycles through conditionals, a special case of Metropolis–Hastings with acceptance 1.

## Statistical Computing
S: Statistical computing is the software, algorithms and numerical care that turn statistical ideas into reliable results. Floating-point pitfalls, random number generation and reproducible workflows matter as much as the formulas.
O: Recognise numerical pitfalls and stable alternatives
O: Describe reproducible statistical workflows and common tools
T: Catastrophic cancellation | Loss of precision when subtracting nearly equal floating-point numbers
T: Reproducibility | Being able to rerun an analysis and get the same results, from the same data and code
H: Numerical care
- The one-pass formula Σx^{2}/n − x̄^{2} can lose all precision for large values with small spread; use Welford's algorithm or centre the data first.
- Work with log-probabilities to avoid underflow; use the log-sum-exp trick: log(Σe^{a_{i}}) = m + log(Σe^{a_{i}−m}), with m = max a_{i}.
- Solve linear systems with QR or Cholesky decompositions rather than explicit inverses.
H: Random numbers
- Pseudo-random generators (such as the Mersenne Twister) are deterministic given a seed.
- Set and record seeds for reproducible simulations.
- Cryptographic randomness is different and needed for security, not statistics.
H: Tools and workflow
- R, Python (pandas, statsmodels, scikit-learn), Stan, Julia; SQL for data access.
- Scripts, not point-and-click: version control (Git), literate documents (R Markdown, Quarto, Jupyter).
- Test code, check data, and share code with results (School 27).
X: Compute log(e^{1000} + e^{1000}) without overflow.
> e^{1000} overflows standard floating point
> Log-sum-exp: m = 1000, so log(e^{0} + e^{0}) + 1000
> = 1000 + ln 2 ≈ 1000.693
K: Avoid catastrophic cancellation and overflow with stable algorithms (centring, log-sum-exp, QR); seed random numbers; script and version-control analyses.
!: Computing a variance by the one-pass "mean of squares minus square of mean" on large numbers.
Q: Why work with log-likelihoods instead of likelihoods? | Products of many small probabilities underflow; sums of logs don't.
Q: What makes a simulation reproducible? | Recording the random seed, code and software versions.
SUM: Numerical care prevents silent errors.
SUM: Scripts and seeds make analyses reproducible.
SRC: R Core Team, R: A language and environment for statistical computing (R Foundation for Statistical Computing 2025) | software | 2025 | https://www.r-project.org/
SRC: Higham NJ, Accuracy and Stability of Numerical Algorithms (2nd edn, SIAM 2002) | textbook | 2002 | https://epubs.siam.org/
NUM1#maths-u13-62-q1@1: Find the population variance of 1,000,000,001, 1,000,000,002 and 1,000,000,003 by subtracting 1,000,000,000 first, to 4 decimal places. | 0.6667 | 0.0005 |  | The shifted values 1, 2, 3 have variance 2/3; shifting doesn't change variance.
M1#maths-u13-62-q2@1: What is the log-sum-exp trick for? | Adding exponentials without overflow or underflow | Speeding up sorting | Sorting a list quickly | Inverting matrices | Generating random numbers on a log scale | Factoring out the maximum keeps the exponents in a safe range.
M2#maths-u13-62-q3@2: Why should a simulation study record its random seed? | So the exact results can be reproduced | To make results more random | Seeds improve accuracy | It's required by law | To speed up the code | Pseudo-random numbers are deterministic given the seed.

## Experimental Design
S: Experimental design plans how to collect data so that the comparisons of interest are fair and precise. Fisher's principles of randomisation, replication and blocking are still the foundation of agricultural trials, clinical trials and A/B tests.
O: Explain randomisation, replication, blocking and control
O: Choose an appropriate design for a simple experiment
T: Randomisation | Allocating treatments by chance, so that unknown factors balance on average
T: Blocking | Grouping similar units and comparing treatments within each group to remove known variation
H: Fisher's principles
- Randomisation: protects against bias and justifies the analysis.
- Replication: several units per treatment, to estimate variability.
- Blocking (local control): compare treatments within homogeneous blocks (fields, days, batches, patients).
H: Common designs
- Completely randomised: treatments assigned at random to all units.
- Randomised block: each block gets every treatment, in random order.
- Crossover: each participant gets several treatments in sequence, with washout periods.
- Matched pairs: units paired on key characteristics.
H: Clinical trials
- Control group (placebo or standard care); blinding of participants and assessors.
- Allocation concealment so recruiters can't predict the next assignment.
- Pre-registered protocols and analysis plans; CONSORT reporting guidelines.
X: Four fertilisers are tested on 12 plots in 3 fields (4 plots each). Design a randomised block experiment and count the possible allocations.
> Treat each field as a block; each gets all four fertilisers
> Within each field, randomly assign the four fertilisers to its plots: 4! = 24 ways
> Total allocations: 24^{3} = 13,824
K: Randomise, replicate and block; choose completely randomised, block, crossover or paired designs to match the sources of variation; blind and conceal in trials.
!: Letting researchers choose which units get which treatment, which invites selection bias.
Q: What is the purpose of blocking? | To remove known sources of variation from treatment comparisons.
Q: What is allocation concealment? | Hiding the upcoming treatment assignments from those enrolling participants.
SUM: Design makes comparisons fair and precise.
SUM: Randomise, replicate, block.
SRC: Fisher RA, The Design of Experiments (Oliver and Boyd 1935) | textbook | 1935 | https://archive.org/
SRC: Schulz KF, Altman DG, Moher D, CONSORT 2010 statement, BMJ 340, c332 | journal | 2010 | https://doi.org/10.1136/bmj.c332
NUM1#maths-u13-63-q1@1: In how many ways can 3 treatments be randomly ordered within one block? | 6 | 0 |  | 3! = 6 orderings.
M1#maths-u13-63-q2@1: Why does randomisation matter in an experiment? | It balances unknown confounders on average between groups | It makes groups identical | It makes the groups identical in every respect | It removes the need for analysis | It guarantees significance | Chance allocation prevents systematic differences other than the treatment.
M2#maths-u13-63-q3@2: Which design gives each participant every treatment in sequence? | Crossover | Completely randomised | Cluster randomised | Case–control | Cross-sectional | Each person acts as their own control, with washout between periods.

## Design of Experiments
S: Design of experiments (DoE) studies many factors at once efficiently. Factorial designs estimate main effects and interactions together, and fractional factorials and response surface methods make industrial and scientific optimisation fast.
O: Calculate main effects and interactions in a 2^{2} factorial design
O: Explain fractional factorial and response surface designs
T: Factorial design | An experiment testing every combination of factor levels
T: Interaction | When the effect of one factor depends on the level of another
H: Two-level factorials
- k factors at two levels (− and +) need 2^{k} runs.
- Main effect of A: average response at A+ minus average at A−.
- Interaction AB: half the difference between A's effect at B+ and at B−.
- One-factor-at-a-time experiments miss interactions and use runs inefficiently.
H: Fractional factorials
- A 2^{k−p} design uses a fraction of the runs, deliberately confounding (aliasing) high-order interactions with main effects.
- Resolution describes which effects are aliased.
- Screening designs (Plackett–Burman) find the few important factors among many.
H: Optimisation
- Response surface methods fit quadratic models to find optimal settings (central composite designs).
- Taguchi methods emphasise robustness to noise factors.
- Used in manufacturing, chemistry, agriculture and software performance tuning.
X: A 2^{2} experiment gives responses: (A−, B−) 10, (A+, B−) 14, (A−, B+) 12, (A+, B+) 20. Find the main effects and the interaction.
> A: (14 + 20)/2 − (10 + 12)/2 = 17 − 11 = 6
> B: (12 + 20)/2 − (10 + 14)/2 = 16 − 12 = 4
> AB: [(20 − 12) − (14 − 10)]/2 = (8 − 4)/2 = 2
K: Factorial designs estimate main effects and interactions together; 2^{k} runs for k two-level factors; fractional designs trade aliasing for fewer runs.
!: Changing one factor at a time, which can't detect interactions.
Q: How many runs does a full 2^{4} factorial need? | 16.
Q: What is aliasing in a fractional factorial? | Two effects being estimated by the same contrast, so they can't be separated.
SUM: Factorial designs study many factors efficiently.
SUM: They reveal interactions.
SRC: Montgomery DC, Design and Analysis of Experiments (9th edn, Wiley 2017) | textbook | 2017 | https://www.wiley.com/
SRC: Box GEP, Hunter JS, Hunter WG, Statistics for Experimenters (2nd edn, Wiley 2005) | textbook | 2005 | https://www.wiley.com/
NUM1#maths-u13-64-q1@1: How many runs does a half fraction of a 2^{6} factorial need? | 32 | 0 |  | 2^{6−1} = 32.
M1#maths-u13-64-q2@1: Why are factorial designs better than changing one factor at a time? | They estimate interactions and use every run for every effect | They need fewer runs because they ignore interactions | They ignore interactions | They're only for two factors | They need no randomisation | Each run contributes to every main effect estimate, and interactions become visible.
M2#maths-u13-64-q3@2: In a 2^{2} design, A's effect is 8 when B is high and 2 when B is low. What is the AB interaction? | 3 | 5 | 6 | 10 | 0 | The interaction is half the difference between A's effects at the two levels of B: (8 − 2)/2 = 3.

## Causal Inference
S: Causal inference asks whether, and how much, one thing causes another, not just whether they're associated. Randomised experiments answer it directly; with observational data, careful designs and assumptions are needed.
O: Define causal effects using potential outcomes
O: Describe methods for estimating causal effects from observational data
T: Potential outcomes | Y(1) and Y(0): a unit's outcome with and without treatment; the causal effect is their difference
T: Confounder | A variable that affects both the treatment and the outcome, creating a spurious association
H: The framework
- Only one potential outcome is ever observed for each unit: the fundamental problem of causal inference.
- Average treatment effect ATE = E[Y(1) − Y(0)].
- Randomisation makes treated and untreated groups comparable, so the difference in means estimates the ATE.
H: Observational methods
- Directed acyclic graphs (DAGs) show which variables to adjust for (the back-door criterion).
- Matching and propensity scores balance measured confounders.
- Instrumental variables, difference-in-differences and regression discontinuity exploit natural experiments.
- All rely on untestable assumptions (such as no unmeasured confounding); sensitivity analyses probe them.
H: Judging evidence
- Bradford Hill's considerations (strength, consistency, temporality, dose–response, plausibility…) for epidemiology.
- Smoking and lung cancer: causation established from consistent observational evidence.
- Don't adjust for colliders (common effects) or mediators if you want the total effect.
X: A policy starts in town A. Mean accidents fall from 50 to 40 in A, and from 52 to 48 in a similar town B without the policy. Estimate the effect by difference-in-differences.
> Change in A: 40 − 50 = −10
> Change in B: 48 − 52 = −4
> DiD estimate = −10 − (−4) = −6 accidents, assuming parallel trends without the policy
K: Causal effects compare potential outcomes; randomisation identifies them; observational methods (DAGs, propensity scores, IV, DiD, RD) need explicit assumptions.
!: Adjusting for a collider, which can create a spurious association.
Q: What is the fundamental problem of causal inference? | Only one potential outcome is observed for each unit.
Q: What key assumption does difference-in-differences make? | Parallel trends: without treatment, both groups would have changed equally.
SUM: Causation needs more than correlation.
SUM: Designs and assumptions make it estimable.
SRC: Hernán MA, Robins JM, Causal Inference: What If (CRC Press 2020) | textbook | 2020 | https://miguelhernan.org/whatifbook
SRC: Pearl J, Glymour M, Jewell NP, Causal Inference in Statistics: A Primer (Wiley 2016) | textbook | 2016 | https://www.wiley.com/
NUM1#maths-u13-65-q1@1: Treated outcomes go from 20 to 26; control outcomes from 18 to 21. Find the difference-in-differences estimate. | 3 | 0 |  | (26 − 20) − (21 − 18) = 6 − 3 = 3.
M1#maths-u13-65-q2@1: Why do randomised experiments estimate causal effects directly? | Randomisation balances confounders between groups on average | They use larger samples | They don't need statistics | They measure both potential outcomes for each person | They avoid all bias in measurement | Chance assignment makes the groups comparable except for treatment.
M3#maths-u13-65-q3@2: Hospitalised patients show a negative association between two diseases that are unrelated in the population. What's the likely cause? | Conditioning on a collider (hospitalisation) | Reverse causation between the two diseases | Confounding by age among the hospitalised patients | Measurement error | Random chance only | Both diseases cause hospitalisation; selecting on it induces a spurious association (Berkson's bias).

## Structural Equation Modelling
S: Structural equation modelling (SEM) combines factor analysis with path analysis to test networks of relationships among observed and latent variables. It's widely used in psychology, education, marketing and the social sciences.
O: Describe measurement and structural models in SEM
O: Calculate direct, indirect and total effects in a path model
T: Path analysis | A system of regressions showing direct and indirect effects among variables, drawn as a diagram
T: Mediation | An indirect effect: X affects M, which affects Y
H: Components
- Measurement model: latent variables measured by several indicators (confirmatory factor analysis).
- Structural model: regression-like paths among latent and observed variables.
- Estimated by maximum likelihood on the covariance matrix.
H: Effects
- Indirect effect along a path: the product of its coefficients.
- Total effect = direct effect + sum of indirect effects.
- Mediation claims are causal claims and need the same care as any causal inference.
H: Fit and identification
- Fit indices: χ^{2} test, CFI (above about 0.95), RMSEA (below about 0.06), SRMR.
- A model must be identified: enough information to estimate every parameter.
- Good fit doesn't prove the model: equivalent models with different arrows can fit equally well.
X: Paths: X → M has coefficient 0.5, M → Y has 0.4, and the direct X → Y path is 0.2. Find the indirect and total effects of X on Y.
> Indirect = 0.5 × 0.4 = 0.2
> Direct = 0.2
> Total = 0.2 + 0.2 = 0.4: half of X's effect runs through M
K: SEM = measurement model + structural model; indirect effects multiply along paths; check fit and identification; good fit isn't proof.
!: Treating a well-fitting SEM as proof that its causal arrows are correct.
Q: How is an indirect effect calculated in a path model? | Multiply the coefficients along the path.
Q: What does a CFI above 0.95 suggest? | Good model fit (by a common rule of thumb).
SUM: SEM tests networks of relationships.
SUM: Fit doesn't establish causation.
SRC: Kline RB, Principles and Practice of Structural Equation Modeling (4th edn, Guilford Press 2016) | textbook | 2016 | https://www.guilford.com/
SRC: Hu L, Bentler PM, Cutoff criteria for fit indexes in covariance structure analysis, Structural Equation Modeling 6(1), 1 | journal | 1999 | https://doi.org/10.1080/10705519909540118
NUM1#maths-u13-66-q1@1: Paths X → M = 0.6 and M → Y = 0.5, with direct X → Y = 0.1. Find the total effect. | 0.4 | 0.001 |  | Indirect 0.6 × 0.5 = 0.3, plus direct 0.1, gives 0.4.
M1#maths-u13-66-q2@1: What does the measurement part of an SEM do? | Links latent variables to their observed indicators | Estimates sample size | Draws the structural paths between latent variables | Removes outliers | Estimates the sample size needed | It's a confirmatory factor model for the latent constructs.
M2#maths-u13-66-q3@2: Two SEMs with opposite causal arrows fit the data equally well. What does that show? | Fit alone can't establish causal direction | The data are wrong | One must have a coding error | Both are proven | SEM is invalid | Equivalent models imply the same covariances, so data can't choose between them.

## Meta-Analysis
S: Meta-analysis combines the results of several studies to estimate an overall effect more precisely and to explore why studies differ. Systematic reviews with meta-analyses sit at the top of many evidence hierarchies.
O: Calculate a fixed-effect inverse-variance pooled estimate
O: Interpret heterogeneity, random effects and publication bias
T: Inverse-variance weighting | Weighting each study by 1/SE^{2}, so more precise studies count more
T: Heterogeneity | Variation in true effects between studies, measured by Cochran's Q, τ^{2} and I^{2}
H: Pooling
- Fixed effect: assumes one true effect; pooled = Σw_{i}θ_{i}/Σw_{i}, SE = 1/√Σw_{i}.
- Random effects: true effects vary with variance τ^{2}; weights become 1/(SE_{i}^{2} + τ^{2}).
- Forest plots show each study's estimate and interval with the pooled diamond.
H: Heterogeneity
- I^{2} = (Q − df)/Q (if positive): the share of variation due to real differences; 25%, 50%, 75% as low, moderate, high.
- Explore it with subgroups or meta-regression.
- Random-effects intervals are wider, honestly reflecting variation.
H: Bias and quality
- Funnel plots: asymmetry suggests small-study effects or publication bias.
- Risk-of-bias assessment of included studies.
- Garbage in, garbage out: pooling biased studies gives a precise biased answer.
- The Cochrane Collaboration sets standards for health research.
X: Two studies estimate an effect as 2 (SE 1) and 4 (SE 2). Find the fixed-effect pooled estimate and its SE.
> Weights: 1/1^{2} = 1 and 1/2^{2} = 0.25
> Pooled = (2 × 1 + 4 × 0.25)/1.25 = 3/1.25 = 2.4
> SE = 1/√1.25 ≈ 0.894, smaller than either study's
K: Pool with inverse-variance weights; check heterogeneity (Q, τ^{2}, I^{2}); use random effects when effects vary; look for publication bias.
!: Pooling studies of very different quality or design without examining heterogeneity and bias.
Q: Which study gets more weight in inverse-variance meta-analysis? | The more precise one (smaller SE).
Q: What might an asymmetric funnel plot indicate? | Publication bias or small-study effects.
SUM: Meta-analysis combines studies.
SUM: Heterogeneity and bias need checking.
SRC: Higgins JPT et al (eds), Cochrane Handbook for Systematic Reviews of Interventions (version 6.4, Cochrane 2023) | guidance | 2023 | https://training.cochrane.org/handbook
SRC: DerSimonian R, Laird N, Meta-analysis in clinical trials, Controlled Clinical Trials 7(3), 177 | journal | 1986 | https://doi.org/10.1016/0197-2456(86)90046-2
NUM1#maths-u13-67-q1@1: Cochran's Q = 20 with 5 studies (df = 4). Find I^{2} as a percentage. | 80 | 0 | % | (20 − 4)/20 = 0.8 = 80%: high heterogeneity.
M1#maths-u13-67-q2@1: What does the diamond at the bottom of a forest plot show? | The pooled estimate and its confidence interval | The heaviest study's weight | The publication date | The largest study, drawn at its own size | The p-value only | Its centre is the pooled effect and its width the interval.
M2#maths-u13-67-q3@2: Studies' true effects clearly differ. Which model is more appropriate? | Random effects | Fixed effect | No pooling is ever possible | Simple averaging without weights | Median of p-values | Random effects allow the true effect to vary between studies.

## Missing Data Analysis
S: Almost every real data set has missing values. How they went missing determines whether simply dropping incomplete cases gives biased answers, and which methods can rescue the analysis.
O: Classify missing data as MCAR, MAR or MNAR
O: Explain when complete case analysis is biased
T: MCAR, MAR, MNAR | Missing completely at random; missing at random (given observed data); missing not at random (depends on the missing value itself)
T: Complete case analysis | Analysing only the records with no missing values
H: Mechanisms (Rubin, 1976)
- MCAR: missingness unrelated to any data (a lab sample dropped). Complete cases are unbiased but less precise.
- MAR: missingness depends only on observed variables (older people skip an online question, and age is recorded). Methods using the observed data can correct it.
- MNAR: depends on the unobserved value (high earners hide income). Needs modelling assumptions and sensitivity analyses.
H: Consequences
- Complete case analysis can be biased under MAR and MNAR, and wastes data.
- Mean imputation shrinks variances and distorts correlations.
- The mechanism usually can't be proved from the data; use subject knowledge.
H: Good practice
- Prevent missing data through design and follow-up.
- Report the amount and pattern of missingness.
- Use multiple imputation or likelihood methods under MAR; run sensitivity analyses for MNAR.
X: 100 people: 50 earn £20,000 and 50 earn £60,000 (mean £40,000). 20 of the high earners don't report income. Find the complete-case mean.
> Observed: 50 at £20,000 and 30 at £60,000
> Mean = (50 × 20,000 + 30 × 60,000)/80 = 2,800,000/80
> = £35,000: biased £5,000 low, because missingness depends on income (MNAR)
K: Classify missingness as MCAR, MAR or MNAR; complete cases are unbiased only under MCAR (broadly); use principled methods and sensitivity analyses.
!: Dropping incomplete records without considering why they're missing.
Q: Under which mechanism is complete case analysis unbiased? | MCAR.
Q: What type of missingness occurs if depressed patients skip a depression questionnaire? | Missing not at random (MNAR).
SUM: How data go missing determines the bias.
SUM: Principled methods need the right assumptions.
SRC: Little RJA, Rubin DB, Statistical Analysis with Missing Data (3rd edn, Wiley 2019) | textbook | 2019 | https://www.wiley.com/
SRC: Rubin DB, Inference and missing data, Biometrika 63(3), 581 | journal | 1976 | https://doi.org/10.1093/biomet/63.3.581
NUM1#maths-u13-68-q1@1: A survey has 400 respondents with complete data out of 500. What percentage of cases would complete case analysis discard? | 20 | 0 | % | 100 of 500 = 20%.
M1#maths-u13-68-q2@1: Blood samples are lost when a freezer fails at random. What is the missingness mechanism? | MCAR | MAR | MNAR | Censoring | Imputation | The loss is unrelated to any patient characteristic or value.
M2#maths-u13-68-q3@2: Why is replacing missing values with the mean a poor method? | It understates variability and weakens relationships | It's too slow | It can only be used for categories | It requires MNAR | It always overestimates the mean of the variable | Every imputed value sits at the centre, shrinking the spread and diluting correlations.

## Imputation Methods
S: Imputation fills in missing values so that complete-data methods can be used. Multiple imputation does this several times with random variation, then combines the results so that the uncertainty about the missing values is reflected in the final answer.
O: Compare single imputation methods with multiple imputation
O: Combine multiply imputed results using Rubin's rules
T: Multiple imputation | Creating m completed data sets with plausible random imputations, analysing each and pooling
T: Rubin's rules | Pooled estimate Q̄ = mean of the m estimates; total variance T = W̄ + (1 + 1/m)B
H: Single imputation
- Mean imputation: biased variances and correlations.
- Last observation carried forward: assumes no change, often wrongly.
- Regression imputation: preserves relationships but understates variability.
- All single methods treat imputed values as if known, making standard errors too small.
H: Multiple imputation
- Impute each missing value m times (often 5 to 50), drawing from its predictive distribution.
- MICE (multiple imputation by chained equations) imputes each variable in turn from the others.
- Include the analysis model's variables (and the outcome) in the imputation model.
- Valid under MAR when the imputation model is good.
H: Rubin's rules
- W̄: average within-imputation variance; B: between-imputation variance of the estimates.
- T = W̄ + (1 + 1/m)B; the extra B term reflects uncertainty about the missing values.
- Fraction of missing information shows how much missingness costs.
X: Five imputed analyses give estimates 10, 11, 12, 11, 11, each with variance 4. Pool them.
> Q̄ = 55/5 = 11; W̄ = 4
> B = [(−1)^{2} + 0 + 1^{2} + 0 + 0]/4 = 0.5
> T = 4 + 1.2 × 0.5 = 4.6, so SE ≈ 2.14 (slightly larger than √4 = 2)
K: Single imputation understates uncertainty; multiple imputation draws plausible values m times; Rubin's rules add between-imputation variance.
!: Leaving the outcome variable out of the imputation model, which biases associations towards zero.
Q: What does the between-imputation variance B capture? | Uncertainty about the missing values themselves.
Q: What does MICE stand for? | Multiple imputation by chained equations.
SUM: Multiple imputation reflects uncertainty.
SUM: Rubin's rules combine the results.
SRC: van Buuren S, Flexible Imputation of Missing Data (2nd edn, CRC Press 2018) | textbook | 2018 | https://stefvanbuuren.name/fimd/
SRC: Sterne JAC et al, Multiple imputation for missing data in epidemiological and clinical research: potential and pitfalls, BMJ 338, b2393 | journal | 2009 | https://doi.org/10.1136/bmj.b2393
NUM1#maths-u13-69-q1@1: With m = 10, W̄ = 2 and B = 1, find the total variance T. | 3.1 | 0.001 |  | T = 2 + (1 + 0.1) × 1 = 3.1.
M1#maths-u13-69-q2@1: Why does single imputation give standard errors that are too small? | It treats imputed values as if they were observed | It drops cases | It always overestimates means | It uses too few variables in the imputation model | It ignores the sample size | No allowance is made for uncertainty in the filled-in values.
M2#maths-u13-69-q3@2: Which variables should a multiple imputation model include? | All variables in the analysis model, including the outcome | Only complete variables | Only the outcome | None | Only the variable being imputed, alone | Omitting analysis variables (especially the outcome) biases relationships towards zero.

## Survival Analysis
S: Survival analysis studies the time until an event (death, relapse, machine failure, customer churn), allowing for censoring, where some subjects haven't had the event by the end of follow-up. Kaplan–Meier curves and Cox models are its core tools.
O: Calculate a Kaplan–Meier survival estimate
O: Interpret hazard ratios from a Cox proportional hazards model
T: Censoring | Incomplete observation of an event time: we only know the event happened after the last follow-up
T: Hazard ratio | The ratio of instantaneous event rates between groups, assumed constant over time in the Cox model
H: Kaplan–Meier
- At each event time t, multiply the running survival by (1 − d/n), with d events among n at risk.
- Censored subjects leave the risk set without causing a drop.
- Median survival: the time where the curve crosses 0.5.
- Log-rank test compares curves between groups.
H: Cox model
- h(t | x) = h₀(t)e^{β₁x₁ + …}: covariates multiply an unspecified baseline hazard.
- e^{β} is the hazard ratio; HR 0.7 means a 30% lower event rate at any time.
- Check proportional hazards (Schoenfeld residuals, log–log plots).
H: Cautions
- Censoring must be non-informative (unrelated to prognosis).
- Competing risks (death from other causes) need special methods.
- Don't analyse survival times by ignoring censored cases.
X: Ten patients: one dies at month 2; one is censored at month 3; one dies at month 5. Find S(2) and S(5).
> At t = 2: 10 at risk, 1 death: S(2) = 1 × 9/10 = 0.9
> The censored patient leaves; at t = 5: 8 at risk, 1 death
> S(5) = 0.9 × 7/8 = 0.7875
K: KM multiplies (1 − d/n) at each event time; censored cases leave the risk set; Cox models give hazard ratios under proportional hazards.
!: Treating censored subjects as if they had the event, or dropping them.
Q: What does a hazard ratio of 0.5 mean? | Half the event rate at any time.
Q: Which test compares two Kaplan–Meier curves? | The log-rank test.
SUM: Survival analysis handles censored times.
SUM: KM curves and Cox models are the core tools.
SRC: Kaplan EL, Meier P, Nonparametric estimation from incomplete observations, Journal of the American Statistical Association 53(282), 457 | journal | 1958 | https://doi.org/10.1080/01621459.1958.10501452
SRC: Cox DR, Regression models and life-tables, Journal of the Royal Statistical Society B 34(2), 187 | journal | 1972 | https://doi.org/10.1111/j.2517-6161.1972.tb00899.x
NUM1#maths-u13-70-q1@1: A Cox coefficient for a treatment is −0.36. Find the hazard ratio, to 2 decimal places. | 0.7 | 0.005 |  | e^{−0.36} ≈ 0.698, about 0.70: a 30% lower hazard.
M1#maths-u13-70-q2@1: What does censoring mean in survival data? | The event hadn't occurred by the end of a subject's follow-up | The data were deleted | The subject's data were deleted for errors | The subject had the event during follow-up | The subject was excluded | We know only that the event time exceeds the last observation.
M3#maths-u13-70-q3@2: Patients who drop out of a trial are those becoming sicker. What assumption does that violate? | Non-informative censoring | Proportional hazards | Normality | Independence of groups | Equal sample sizes | Censoring linked to prognosis biases survival estimates upwards.

## Spatial Statistics
S: Spatial statistics analyses data where location matters: pollution readings, disease cases, mineral deposits, house prices. Nearby observations tend to be similar, and spatial methods use that structure to map, predict and test.
O: Measure spatial autocorrelation and compute an empirical semivariogram value
O: Describe kriging and point pattern analysis
T: Spatial autocorrelation | The tendency of nearby locations to have similar values (Tobler: "near things are more related than distant things")
T: Semivariogram | γ(h) = ½E[(Z(s + h) − Z(s))^{2}], describing how dissimilarity grows with distance h
H: Geostatistics
- Empirical semivariogram: average half squared differences of pairs at each distance.
- Fit a model (spherical, exponential) with nugget, sill and range.
- Kriging: optimal spatial interpolation using the semivariogram, with prediction errors (named after Danie Krige's mining work).
H: Areal and point data
- Areal data (counts by region): Moran's I measures clustering; disease mapping smooths noisy small-area rates.
- Point patterns: are locations random (complete spatial randomness), clustered or regular? Ripley's K function.
- John Snow's 1854 cholera map is an early spatial analysis.
H: Cautions
- Ignoring spatial correlation overstates precision.
- The modifiable areal unit problem: results change with how areas are drawn.
- Ecological fallacy: area-level associations needn't hold for individuals.
X: Four pairs of sites 1 km apart have differences 2, −1, 1 and 0. Find the empirical semivariance at 1 km.
> Squared differences: 4, 1, 1, 0, summing to 6
> γ(1) = (1/(2 × 4)) × 6
> = 0.75
K: Spatial data are autocorrelated; semivariograms describe it; kriging interpolates with error estimates; point patterns test clustering.
!: Treating spatially correlated observations as independent.
Q: What is kriging? | Optimal spatial interpolation based on the semivariogram.
Q: What does a positive Moran's I suggest? | Similar values cluster together.
SUM: Location matters in spatial data.
SUM: Variograms and kriging use that structure.
SRC: Cressie NAC, Statistics for Spatial Data (revised edn, Wiley 1993) | textbook | 1993 | https://www.wiley.com/
SRC: Tobler WR, A computer movie simulating urban growth in the Detroit region, Economic Geography 46, 234 | journal | 1970 | https://doi.org/10.2307/143141
NUM1#maths-u13-71-q1@1: Three pairs at distance h have differences 3, 1 and 2. Find γ(h), to 3 decimal places. | 2.333 | 0.001 |  | (9 + 1 + 4)/(2 × 3) = 14/6 ≈ 2.333.
M1#maths-u13-71-q2@1: What does the range of a semivariogram represent? | The distance beyond which observations are effectively uncorrelated | The largest value measured | The number of sites | The measurement error | The largest difference measured between any two sites | Beyond the range, the semivariogram levels off at the sill.
M2#maths-u13-71-q3@2: Disease rates for large regions are correlated with average income. Why can't we conclude the same for individuals? | The ecological fallacy | Kriging error | Spatial randomness | The nugget effect | Survivorship bias | Group-level associations needn't hold for the individuals within them.

## Reliability Analysis
S: Reliability analysis studies how long products and systems work before failing, and how design choices such as redundancy change that. It guides maintenance, warranties and safety in engineering, from aircraft to power grids.
O: Calculate the reliability of series and parallel systems
O: Use lifetime distributions and the mean time to failure
T: Reliability function | R(t) = P(T > t), the probability of working beyond time t
T: Mean time to failure | MTTF = E(T) = ∫₀^∞ R(t) dt
H: Lifetimes
- Hazard rate h(t): the instantaneous failure rate given survival so far.
- Constant hazard: exponential, MTTF = 1/λ.
- Weibull: falling, constant or rising hazard; the bathtub curve combines early failures, random failures and wear-out.
- Accelerated life testing stresses items to learn about normal lifetimes faster.
H: Systems
- Series (all must work): R = R₁R₂…R_{n}; weaker than any component.
- Parallel (one is enough): R = 1 − (1 − R₁)(1 − R₂)…(1 − R_{n}).
- k-out-of-n systems; standby redundancy; fault trees.
- Common-cause failures (fire, power loss) can defeat redundancy.
H: Related ideas
- Survival analysis methods (censoring, Kaplan–Meier) apply to field failure data.
- In psychometrics, "reliability" means consistency of measurement (Cronbach's α), a different concept.
X: A system has 3 components in series, each with reliability 0.95, and a separate system has 2 identical components in parallel, each with reliability 0.9. Find each system's reliability.
> Series: 0.95^{3} ≈ 0.857
> Parallel: 1 − 0.1^{2} = 0.99
> Series chains weaken reliability; redundancy strengthens it
K: R(t) = P(T > t); series multiply reliabilities; parallel multiply unreliabilities; MTTF = 1/λ for constant hazard; beware common-cause failures.
!: Assuming parallel components are independent when they share a failure cause.
Q: What is the MTTF for a constant failure rate of 0.002 per hour? | 500 hours.
Q: What does the bathtub curve describe? | Early failures, a period of constant random failures, then wear-out.
SUM: Reliability quantifies time to failure.
SUM: Redundancy and design change system reliability.
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods, chapter 8: Assessing product reliability | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
SRC: Meeker WQ, Escobar LA, Pascual FG, Statistical Methods for Reliability Data (2nd edn, Wiley 2022) | textbook | 2022 | https://www.wiley.com/
NUM1#maths-u13-72-q1@1: Two independent components with reliabilities 0.8 and 0.7 are in parallel. Find the system reliability. | 0.94 | 0.001 |  | 1 − 0.2 × 0.3 = 1 − 0.06 = 0.94.
M1#maths-u13-72-q2@1: What happens to a series system's reliability as components are added? | It falls | It rises | It stays the same | It becomes 1 | It becomes 0.5 | Every extra component is another way for the system to fail.
M2#maths-u13-72-q3@2: Why can redundancy fail to deliver its calculated reliability? | Common-cause failures can disable all copies at once | Parallel systems are always weaker | Redundancy reduces MTTF | Components can't be duplicated | It always delivers | The parallel formula assumes independent failures, which shared causes break.

## Extreme Value Theory
S: Extreme value theory gives the statistical methods for estimating the probabilities of rare, extreme events from limited data: floods higher than any recorded, record winds, market crashes. It extrapolates into the tail on a sound mathematical basis.
O: Describe the block maxima and peaks-over-threshold approaches
O: Estimate an exceedance probability from a fitted tail model
T: Block maxima | Fitting a GEV distribution to the maximum in each block, such as each year
T: Peaks over threshold | Fitting a generalised Pareto distribution to the amounts by which data exceed a high threshold
H: Approaches
- Block maxima: simple, but discards all but one value per block.
- Peaks over threshold (POT): uses every large value; P(X > x) = ζ_{u}(1 + ξ(x − u)/σ)^{−1/ξ} for x > u, with ζ_{u} the exceedance rate.
- With ξ = 0 the exceedances are exponential.
H: Choosing and checking
- The threshold must be high enough for the theory but leave enough data: mean residual life plots and parameter stability plots help.
- Return levels come with wide confidence intervals; profile likelihood intervals are more honest than symmetric ones.
- Declustering removes dependence between exceedances in the same storm.
H: Uses
- Flood frequency, coastal defence and the design of the Thames Barrier.
- Insurance and reinsurance pricing; financial risk (expected shortfall).
- Climate: non-stationary models let parameters drift over time.
X: Daily rainfall exceeds a threshold u = 10 mm on 5% of days. Exceedances are exponential (ξ = 0) with σ = 2 mm. Find P(rainfall > 16 mm) on a day.
> P(X > 16) = ζ_{u} × e^{−(16 − 10)/2}
> = 0.05 × e^{−3} ≈ 0.05 × 0.0498
> ≈ 0.0025: about once every 400 days
K: Use block maxima (GEV) or peaks over threshold (GPD); choose thresholds carefully; report wide intervals for return levels; consider non-stationarity.
!: Extrapolating far beyond the data with a normal model fitted to the whole distribution.
Q: Which distribution models exceedances over a high threshold? | The generalised Pareto distribution.
Q: Why might peaks over threshold be preferred to block maxima? | It uses more of the extreme data.
SUM: EVT estimates rare-event probabilities.
SUM: Tail models need careful thresholds and honest intervals.
SRC: Coles S, An Introduction to Statistical Modeling of Extreme Values (Springer 2001) | textbook | 2001 | https://link.springer.com/
SRC: Davison AC, Smith RL, Models for exceedances over high thresholds, Journal of the Royal Statistical Society B 52(3), 393 | journal | 1990 | https://doi.org/10.1111/j.2517-6161.1990.tb01796.x
NUM1#maths-u13-73-q1@1: Exceedances over u = 20 occur with rate 0.1 and are exponential with σ = 5. Find P(X > 30), to 4 decimal places. | 0.0135 | 0.0002 |  | 0.1 × e^{−10/5} = 0.1 × e^{−2} ≈ 0.0135.
M1#maths-u13-73-q2@1: What is a weakness of the block maxima method? | It discards all values in each block except the largest | It can't estimate return levels | It can't be used to estimate return levels at all | It ignores extremes | It assumes normality | Only one value per block is used, wasting other large observations.
M2#maths-u13-73-q3@2: Why are confidence intervals for a 1,000-year return level usually very wide? | Extrapolating far beyond the data magnifies parameter uncertainty | Floods follow a normal law | Extremes are normal | Data are always biased | They're calculated wrongly by standard software | Small changes in the tail shape make huge differences far out in the tail.

## Decision Theory
S: Statistical decision theory chooses actions under uncertainty by weighing the consequences of each action against the probabilities of each state of the world. It links statistics to economics, medicine and machine learning.
O: Choose an action by minimising expected loss
O: Describe Bayes and minimax decision rules and the value of information
T: Loss function | L(action, state): the cost of taking an action when a particular state is true
T: Bayes decision | The action that minimises expected loss under the current (posterior) probabilities
H: The framework
- States of the world θ, actions a, losses L(a, θ), probabilities for θ.
- Expected loss of an action: Σ L(a, θ)P(θ).
- Bayes rule: choose the action with the smallest expected loss.
- Utility is the mirror image: maximise expected utility.
H: Other criteria
- Minimax: minimise the worst-case loss (cautious, needs no probabilities).
- Estimation as decision: squared-error loss gives the posterior mean; absolute-error loss gives the posterior median.
- Hypothesis tests as decisions: the costs of Type I and II errors set the threshold.
H: Value of information
- Expected value of perfect information: how much better you'd do knowing θ.
- If it's less than the cost of collecting data, don't collect them.
- Abraham Wald (1950) founded statistical decision theory; Savage and Raiffa developed the Bayesian version.
X: P(rain) = 0.3. Carrying an umbrella costs 1 whatever happens; not carrying it costs 5 if it rains, 0 otherwise. Which action is better, and at what P(rain) are they equal?
> Umbrella: expected loss 1
> No umbrella: 5 × 0.3 = 1.5
> Carry it; they're equal when 5p = 1, so p = 0.2
K: List states, actions and losses; minimise expected loss (Bayes) or worst-case loss (minimax); compare the value of information with its cost.
!: Choosing the action that's best in the most likely state while ignoring large losses in less likely ones.
Q: Under squared-error loss, which posterior summary is the Bayes estimate? | The posterior mean.
Q: What does the minimax rule minimise? | The worst-case (maximum) loss.
SUM: Decision theory weighs consequences by probabilities.
SUM: Information is worth its expected improvement.
SRC: Berger JO, Statistical Decision Theory and Bayesian Analysis (2nd edn, Springer 1985) | textbook | 1985 | https://link.springer.com/
SRC: Wald A, Statistical Decision Functions (Wiley 1950) | textbook | 1950 | https://archive.org/
NUM1#maths-u13-74-q1@1: An action costs 100 if a state with probability 0.15 occurs and 0 otherwise. Find its expected loss. | 15 | 0 |  | 100 × 0.15 = 15.
M1#maths-u13-74-q2@1: Under absolute-error loss, which posterior summary minimises expected loss? | The posterior median | The posterior mean | The posterior mode | The prior mean | The maximum | The median minimises expected absolute deviation.
M2#maths-u13-74-q3@2: When is it not worth collecting more data before deciding? | When the expected value of the information is less than its cost | When the prior distribution is uniform | Always | When the sample is already large | When losses are equal | Information is only worth buying if it's expected to improve the decision by more than it costs.

## Statistical Learning
S: Statistical learning builds models that learn patterns from data to make predictions or find structure, bridging statistics and machine learning. Its central ideas, the bias–variance trade-off and honest validation, guard against models that fit noise.
O: Distinguish supervised and unsupervised learning and explain the bias–variance trade-off
O: Use cross-validation to estimate prediction error
T: Supervised learning | Learning to predict a labelled outcome from inputs (regression or classification)
T: Cross-validation | Estimating out-of-sample error by repeatedly training on part of the data and testing on the rest
H: Types of learning
- Supervised: regression (numeric y) and classification (categorical y).
- Unsupervised: clustering, dimension reduction (no labels).
- Methods: k-nearest neighbours, decision trees, random forests, boosting, support vector machines, neural networks (School 24).
H: Bias and variance
- Expected test error = bias^{2} + variance + irreducible noise.
- Simple models: high bias, low variance. Flexible models: low bias, high variance.
- Overfitting: training error keeps falling while test error rises.
- Regularisation (ridge, lasso) and ensembles (random forests) manage the trade-off.
H: Validation
- Hold out a test set that's never used for fitting or tuning.
- k-fold cross-validation for tuning; nested cross-validation for honest comparison.
- Watch for leakage: information from the test set sneaking into training.
X: Five-fold cross-validation gives error rates 0.12, 0.10, 0.15, 0.11 and 0.12. A model's squared bias is 4, variance 3 and noise variance 2. Find the CV error and the expected test MSE.
> CV error = (0.12 + 0.10 + 0.15 + 0.11 + 0.12)/5 = 0.60/5 = 0.12
> Expected test MSE = 4 + 3 + 2 = 9
> Reducing variance (by regularising) could lower the MSE, but the noise term 2 can't be removed
K: Supervised learning predicts labels, unsupervised finds structure; error = bias^{2} + variance + noise; validate with held-out data and cross-validation; avoid leakage.
!: Reporting accuracy on the training data as the model's performance.
Q: What is overfitting? | Fitting noise in the training data, so performance on new data is worse.
Q: Which part of the expected test error can no model reduce? | The irreducible noise.
SUM: Statistical learning predicts from data.
SUM: Validation keeps it honest.
SRC: James G, Witten D, Hastie T, Tibshirani R, An Introduction to Statistical Learning (2nd edn, Springer 2021) | textbook | 2021 | https://www.statlearning.com/
SRC: Hastie T, Tibshirani R, Friedman J, The Elements of Statistical Learning (2nd edn, Springer 2009) | textbook | 2009 | https://hastie.su.domains/ElemStatLearn/
NUM1#maths-u13-75-q1@1: A model has squared bias 1.5, variance 2.5 and noise variance 1. Find the expected test MSE. | 5 | 0 |  | 1.5 + 2.5 + 1 = 5.
M1#maths-u13-75-q2@1: Which is an unsupervised learning task? | Grouping customers by purchasing behaviour without labels | Predicting house prices | Classifying emails as spam | Forecasting sales | Diagnosing disease from labelled scans | No outcome labels are used: it's clustering.
M3#maths-u13-75-q3@2: A model's training error keeps falling as complexity grows, but its validation error starts rising. What's happening? | Overfitting: variance now outweighs the drop in bias | Underfitting: the model is still too simple | The data are too simple | The validation set is wrong | Bias is increasing as complexity grows | Beyond the optimum, extra flexibility fits noise.
`;
