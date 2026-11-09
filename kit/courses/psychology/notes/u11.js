// School 11: Statistics. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md), with evidence status (EV:)
// and questions at three levels in every lesson. Worked examples use small invented data sets so the arithmetic can be
// followed; calculations were checked against kit/labs/social/stats.js. Sources are pending human verification (qa.js).
// Level: A level to first-year undergraduate.
export default `
## Levels of measurement
LV: Introductory · Foundation
S: Data come at different levels of measurement: nominal, ordinal, interval and ratio. The level decides which averages, graphs and statistical tests are appropriate. This lesson explains each level with psychological examples.
O: Define nominal, ordinal, interval and ratio data
O: Classify variables by their level of measurement
O: Explain how the level of measurement constrains the choice of statistics
H: Four levels
- **Nominal**: categories with no order (diagnosis, eye colour, which condition someone chose). You can only count frequencies.
- **Ordinal**: ordered categories or ranks, with unequal or unknown gaps (finishing position in a race, ratings from "never" to "always").
- **Interval**: equal intervals between values but no true zero (temperature in degrees Celsius; many standardised test scores).
- **Ratio**: equal intervals and a true zero, so ratios make sense (reaction time, number of words recalled, age).
P: The scheme was proposed by Stevens (1946). The mnemonic NOIR lists the levels in order of increasing information.
H: Why it matters
P: The level decides which descriptive statistics are meaningful: the mode for nominal data, the median for ordinal, the mean for interval and ratio. It also guides the choice of inferential test: **parametric** tests such as the t-test assume at least interval data, while **non-parametric** tests suit ordinal data.
X: Classifying a questionnaire study
> Gender identity recorded as categories: nominal.
> Agreement rated 1 (strongly disagree) to 5 (strongly agree): ordinal for a single item.
> Total anxiety score summed across 20 items: often treated as interval.
> Minutes spent on social media: ratio.
P: **Investigate with the lab.** Enter counts into a two-by-two table and see that chi-square works with nominal data.
IX: crosstab
K: Nominal, ordinal, interval and ratio data carry increasing information, and the level determines which averages and tests are appropriate.
H: Grey areas
P: Whether summed rating scales can be treated as interval data is debated. Many researchers analyse them with parametric tests, arguing the results are robust; others insist on non-parametric methods for anything built from ordinal items.
!: Calculating a mean for nominal data, such as an "average diagnosis". Categories without order can only be counted.
EV: established | Stevens (1946) proposed the nominal, ordinal, interval and ratio scheme.
EV: contested | Whether scores summed from Likert items can be treated as interval data is debated.
T: Nominal data | Categories with no inherent order
T: Ordinal data | Ordered categories or ranks without equal intervals
T: Ratio data | Data with equal intervals and a true zero point
SUM: Levels of measurement are nominal, ordinal, interval and ratio (NOIR).
SUM: The level determines the appropriate averages, graphs and tests.
SRC: Stevens S. S., "On the theory of scales of measurement", Science 103(2684):677–680 | primary | 1946 | https://doi.org/10.1126/science.103.2684.677
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
Q: What is ordinal data? | Ordered categories or ranks where the gaps between values are not equal or known.
Q: What distinguishes ratio from interval data? | Ratio data have a true zero point, so ratios between values are meaningful.
M1#psychology-u11-01-q1@1: Reaction time in milliseconds is… | Ratio data | Nominal data | Ordinal data | Interval data only | It has equal intervals and a true zero, so ratios (twice as slow) make sense.
M2#psychology-u11-01-q2@2: A researcher records which of four therapy types each client received. Which average is appropriate? | The mode | The mean | The median | The standard deviation | Therapy type is nominal, so only the most frequent category (mode) makes sense.
MATCH1#psychology-u11-01-q3@1: Match each variable to its level of measurement. | Blood type = Nominal ; Position in a race = Ordinal ; Temperature in Celsius = Interval ; Number of words recalled = Ratio | NOIR orders the levels by the information they carry.
M3#psychology-u11-01-q4@3: Why is the level of measurement relevant to choosing between a t-test and a Mann–Whitney test? | Parametric tests assume at least interval data | Non-parametric tests need ratio data | The t-test is only for nominal data | The level makes no difference to test choice | Ordinal data suit non-parametric tests; interval or ratio data allow parametric tests if other assumptions hold.
SA2#psychology-u11-01-q5@2,3: Classify four variables from a study of exam stress by level of measurement and say which average suits each. | Year group (nominal or ordinal), mode or median; stress rating on a single 1–5 item (ordinal), median; total score on a 20-item stress scale (treated as interval), mean; hours of sleep (ratio), mean. Note the debate over summed scales. | Four variables classified ; Correct levels ; Matching averages ; Grey area noted
M2#psychology-u11-01-q6@1: Which level of measurement is data on whether people did or didn't help? | Nominal | Ordinal | Interval | Ratio | Categories with no order are nominal, which suits chi-square.

## Measures of central tendency
LV: Introductory · Foundation
S: Measures of central tendency summarise the typical value of a data set: the mean, median and mode. This lesson shows how to calculate each, when each is appropriate and how outliers affect them.
O: Calculate the mean, median and mode
O: Explain how outliers and skew affect each measure
O: Choose the most appropriate measure for a data set
PRE: Levels of measurement
H: Three averages
- **Mean**: add all the values and divide by how many there are. Uses every value; sensitive to outliers.
- **Median**: the middle value when the data are in order (the average of the two middle values if there is an even number). Not affected by extreme values.
- **Mode**: the most frequent value. The only average for nominal data; there can be more than one, or none.
IX: stats-describe
X: Calculating averages for recall scores
> Scores: 4, 6, 6, 7, 8, 9, 30.
> Mean = 70 ÷ 7 = 10. Median = 7 (the fourth of seven ordered values). Mode = 6.
> The single score of 30 pulls the mean above six of the seven scores; the median better represents a typical participant.
P: Reporting the mean and median together is a quick check on skew: if they differ a lot, look at the distribution before choosing which to emphasise.
K: The mean uses all the data but is pulled by outliers; the median resists outliers; the mode suits nominal data.
H: Choosing a measure
P: For roughly symmetrical interval or ratio data, the mean is best because it uses all the information. For skewed data or data with outliers (such as income or reaction times), the median is usually more representative. For nominal data, use the mode. In a positively skewed distribution, the mean is usually higher than the median.
!: Reporting only the mean for heavily skewed data. Always look at the distribution first.
EV: established | The median is less affected by outliers than the mean.
EV: established | In positively skewed distributions the mean is typically greater than the median.
T: Mean | The sum of all values divided by the number of values
T: Median | The middle value of ordered data
T: Mode | The most frequently occurring value
SUM: The mean, median and mode summarise typical values in different ways.
SUM: Choose by level of measurement and distribution; outliers distort the mean.
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.3 "Analyzing findings" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-3-analyzing-findings
Q: How is the median found for an even number of values? | Order the values and take the mean of the two middle values.
Q: Which average is most affected by outliers? | The mean.
M1#psychology-u11-02-q1@1: Which average is the only one appropriate for nominal data? | The mode | The mean | The median | The range | Categories without order can only be described by the most frequent one.
NUM2#psychology-u11-02-q2@2: Calculate the mean of these reaction times in milliseconds: 300, 320, 340, 360, 380. | 340 | 0 | ms | Sum = 1,700; divided by 5 values = 340 ms.
M2#psychology-u11-02-q3@2: Household incomes in a sample include one billionaire. Which average best describes a typical household? | The median | The mean | The mode | The total | The median isn't pulled up by the extreme value.
M3#psychology-u11-02-q4@3: In a distribution where the mean is much higher than the median, the data are most likely… | Positively skewed | Negatively skewed | Perfectly symmetrical | Nominal | A long right tail pulls the mean above the median.
SA2#psychology-u11-02-q5@1,2: For the scores 2, 3, 3, 5, 7, 10, calculate the mean, median and mode, and say which best summarises the data. | Mean = 30 ÷ 6 = 5; median = (3 + 5) ÷ 2 = 4; mode = 3. The data are slightly positively skewed, so the median (4) is a reasonable summary, though with no extreme outliers the mean is also acceptable. | Mean correct ; Median correct ; Mode correct ; Justified choice

## Measures of dispersion: range, variance and standard deviation
LV: Intermediate · Application
S: Measures of dispersion describe how spread out the data are. This lesson explains the range, interquartile range, variance and standard deviation, with a worked calculation.
O: Calculate the range and standard deviation of a small data set
O: Explain what variance and standard deviation represent
O: Interpret differences in spread between two data sets
PRE: Measures of central tendency
H: Measures of spread
- **Range**: highest minus lowest value. Easy, but based on two values and very sensitive to outliers.
- **Interquartile range (IQR)**: the spread of the middle 50% (third quartile minus first quartile). Resistant to outliers; pairs with the median.
- **Variance**: the average squared distance of values from the mean. For a sample, divide the sum of squared deviations by n − 1.
- **Standard deviation (SD)**: the square root of the variance, in the original units. Pairs with the mean.
X: Calculating a sample SD
> Scores: 2, 4, 6, 8, 10. Mean = 6.
> Deviations: −4, −2, 0, 2, 4. Squared: 16, 4, 0, 4, 16. Sum = 40.
> Sample variance = 40 ÷ (5 − 1) = 10. SD = √10 ≈ 3.16.
> A typical score lies about 3 points from the mean.
P: **Investigate with the lab.** Generate a data set and compare its range and standard deviation; then add an outlier.
IX: stats-describe
K: The standard deviation is the typical distance of scores from the mean; the IQR is a robust alternative for skewed data.
H: Interpreting spread
P: Two groups can have the same mean but very different spreads. If therapy group A has a mean anxiety score of 20 (SD 2) and group B 20 (SD 8), group A responded consistently while group B varied widely. In roughly normal data, about 68% of scores fall within 1 SD of the mean and about 95% within 2 SDs.
P: Sample variance uses n − 1 rather than n because a sample tends to underestimate the population's spread; dividing by n − 1 corrects this bias.
!: Reporting a mean without a measure of spread. Without the SD or IQR, readers can't judge how typical the mean is.
EV: established | Dividing by n − 1 gives an unbiased estimate of the population variance.
EV: established | In a normal distribution about 68% of values fall within one standard deviation of the mean.
T: Standard deviation | The square root of the variance; the typical distance of scores from the mean
T: Variance | The average squared deviation from the mean (divided by n − 1 for a sample)
T: Interquartile range | The range of the middle 50% of the data
SUM: Range, IQR, variance and SD describe spread; SD pairs with the mean and IQR with the median.
SUM: Groups with the same mean can differ greatly in spread.
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 2.3 "Analyzing findings" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/2-3-analyzing-findings
Q: What does the standard deviation tell you? | The typical distance of scores from the mean.
Q: Why is the IQR preferred to the range for skewed data? | It uses the middle 50% of the data, so extreme values don't distort it.
M1#psychology-u11-03-q1@1: The range of 3, 7, 8, 12, 20 is… | 17 | 20 | 10 | 8 | Range = highest − lowest = 20 − 3 = 17; it uses only the two extreme values.
NUM2#psychology-u11-03-q2@2: Calculate the sample variance of 1, 3, 5. | 4 | 0.01 | squared units | Mean = 3; squared deviations 4, 0, 4 sum to 8; 8 ÷ (3 − 1) = 4.
M2#psychology-u11-03-q3@2: Two classes have the same mean test score, but class A has SD 3 and class B has SD 12. What does this show? | Class B's scores are much more spread out | Class B scored higher on average | Class A has more students | The tests were different | Same mean, larger SD means more variable scores.
M3#psychology-u11-03-q4@3: Why divide by n − 1 when calculating sample variance? | A sample tends to underestimate population spread | It makes calculations quicker | It removes outliers automatically | It converts the units back to the original scale | n − 1 corrects the bias of using the sample mean.
SA2#psychology-u11-03-q5@1,2: Calculate the mean and sample SD of 5, 7, 9, 11, 13, and interpret the SD. | Mean = 45 ÷ 5 = 9; deviations −4, −2, 0, 2, 4; squares sum to 40; variance = 40 ÷ 4 = 10; SD ≈ 3.16. A typical score lies about 3 points from the mean. | Mean ; Squared deviations ; Variance with n − 1 ; SD ; Interpretation
M2#psychology-u11-03-q6@1: Which measure of dispersion is most affected by one extreme score? | The range | The standard deviation | The interquartile range | The median | The range uses only the highest and lowest values.

## Distributions: normal, skew and kurtosis
LV: Intermediate · Application
S: The shape of a distribution matters for which statistics are appropriate. This lesson explains the normal distribution, skew, kurtosis and z-scores.
O: Describe the features of the normal distribution
O: Identify positive and negative skew and their effect on the mean and median
O: Calculate and interpret z-scores
PRE: Measures of dispersion: range, variance and standard deviation
H: The normal distribution
P: Many measures (height, many test scores) are roughly **normally distributed**: symmetrical and bell-shaped, with the mean, median and mode equal. About 68% of values lie within 1 SD of the mean, 95% within about 1.96 SDs and 99.7% within 3 SDs.
H: Skew and kurtosis
- **Positive skew**: a long tail to the right (reaction times, income). Mean > median > mode.
- **Negative skew**: a long tail to the left (scores on an easy test). Mean < median < mode.
- **Kurtosis** describes the weight of the tails: heavier tails than normal (positive excess kurtosis) mean more extreme values.
H: z-scores
P: A **z-score** shows how many SDs a value lies from the mean: z = (score − mean) ÷ SD. z-scores put different measures on one scale and, for normal data, convert to percentiles.
X: Comparing two test results
> Ana scores 65 in maths (mean 50, SD 10): z = 1.5.
> She scores 70 in English (mean 60, SD 20): z = 0.5.
> Relative to classmates, her maths result is better, though the raw English score is higher.
IX: psychometrics
P: **Investigate with the lab.** Generate skewed data and see where the mean, median and mode fall.
IX: stats-describe
K: The normal distribution is symmetrical with known proportions within each SD; skew pulls the mean towards the tail; z-scores standardise values.
!: Assuming all psychological data are normal. Reaction times, counts and many clinical measures are skewed.
EV: established | About 95% of values in a normal distribution lie within 1.96 standard deviations of the mean.
EV: contested | How strictly normality matters for tests such as the t-test with large samples is debated; many are robust.
T: Normal distribution | A symmetrical, bell-shaped distribution in which mean, median and mode are equal
T: Positive skew | A distribution with a long tail to the right
T: z-score | The number of standard deviations a value lies from the mean
SUM: Normal distributions are symmetrical with known proportions; skewed distributions pull the mean towards the tail.
SUM: z-scores standardise values so they can be compared.
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 7.5 "Measures of intelligence" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/7-5-measures-of-intelligence
Q: What percentage of values in a normal distribution lie within one SD of the mean? | About 68%.
Q: What is the formula for a z-score? | z = (score − mean) ÷ standard deviation.
M1#psychology-u11-04-q1@1: In a normal distribution, how do the mean, median and mode compare? | They are equal | The mean is highest | The mode is highest | The median is lowest | A normal distribution is symmetrical, so the mean, median and mode coincide at the centre.
NUM2#psychology-u11-04-q2@2: A score of 130 on a test with mean 100 and SD 15 has what z-score? | 2 | 0.01 | standard deviations | z = (130 − 100) ÷ 15 = 2.
M2#psychology-u11-04-q3@2: Most students score highly on an easy test, with a few low scores. The distribution is… | Negatively skewed | Positively skewed | Normal | Bimodal | A tail of low scores to the left is negative skew.
M3#psychology-u11-04-q4@3: Why are reaction times usually positively skewed? | A floor on speed, but no ceiling on slow lapses | They are nominal data | Participants respond at random | The mean is always zero | There is a floor on how fast people can respond but no ceiling on lapses.
SA2#psychology-u11-04-q5@2,3: A student scores 72 in psychology (mean 60, SD 8) and 81 in biology (mean 75, SD 12). Which is the better relative performance? | Psychology z = (72 − 60) ÷ 8 = 1.5; biology z = (81 − 75) ÷ 12 = 0.5. The psychology result is better relative to the class, despite the lower raw score. | Psychology z ; Biology z ; Comparison ; Interpretation
M2#psychology-u11-04-q6@1: In a positively skewed distribution, which is usually largest? | The mean | The median | The mode | They are all equal | The long tail of high scores pulls the mean upwards.

## Data visualisation
LV: Introductory · Application
S: Good graphs show the shape of the data, not just the averages. This lesson explains which graph suits which data, and how graphs can mislead.
O: Choose an appropriate graph for different types of data
O: Interpret histograms, box plots and scatterplots
O: Evaluate graphs for misleading features
PRE: Measures of central tendency
H: Choosing a graph
- **Bar chart**: categories (nominal data) or comparing group means, with error bars.
- **Histogram**: the distribution of a continuous variable, bars touching.
- **Box plot**: median, IQR and outliers; good for comparing distributions.
- **Scatterplot**: the relationship between two continuous variables.
- **Line graph**: change over time or across ordered conditions.
H: Show the data
P: Bar charts of means hide the distribution: very different data sets can produce the same bars. Plotting individual data points, or using box or violin plots, lets readers see spread, skew and outliers. Anscombe's quartet (1973) showed four data sets with near-identical summary statistics but very different scatterplots.
IX: correlation
X: Two bar charts, one story
> Group A: all participants score 50. Group B: half score 20, half score 80.
> Both have a mean of 50, so the bar chart looks identical.
> A dot plot reveals that Group B is split into two clusters, which may matter more than the mean.
P: **Investigate with the lab.** Paste in a data set and look at its histogram; then think about which graph suits each kind of data.
IX: stats-describe
K: Choose graphs that match the data and show distributions, not just means; always check scales and axes.
H: How graphs mislead
P: Truncated y-axes exaggerate small differences; missing error bars hide uncertainty; 3D effects distort size; and cherry-picked time ranges create false trends. Readers should check axis labels, scales and what the bars or error bars represent.
!: Starting a bar chart's y-axis well above zero. It makes small differences look large.
EV: established | Data sets with identical summary statistics can have very different distributions (Anscombe, 1973).
EV: contested | Which graph types communicate uncertainty best to non-specialists is still researched.
T: Histogram | A graph showing the distribution of a continuous variable, with touching bars
T: Box plot | A graph showing the median, interquartile range and outliers
T: Scatterplot | A graph of pairs of values showing the relationship between two variables
SUM: Bar charts suit categories; histograms distributions; box plots comparisons; scatterplots relationships.
SUM: Showing individual data and checking axes prevent misleading impressions.
SRC: Anscombe F. J., "Graphs in statistical analysis", The American Statistician 27(1):17–21 | primary | 1973 | https://doi.org/10.1080/00031305.1973.10478966
SRC: Weissgerber T. L. et al., "Beyond bar and line graphs: time for a new data presentation paradigm", PLoS Biology 13(4):e1002128 | primary | 2015 | https://doi.org/10.1371/journal.pbio.1002128
Q: Which graph shows the relationship between two continuous variables? | A scatterplot.
Q: What does a box plot show? | The median, interquartile range, range and any outliers.
M1#psychology-u11-05-q1@1: Which graph best shows the distribution of reaction times? | A histogram | A pie chart | A scatterplot | A table of means | Histograms show the shape of a continuous distribution.
M2#psychology-u11-05-q2@2: A bar chart's y-axis runs from 48 to 52, making a difference of 1 point look huge. What is the problem? | A truncated axis | Error bars are too large | It should be a scatterplot | The bars should be 3D | Starting the axis far above zero magnifies small differences.
TF2#psychology-u11-05-q3@3: Two data sets with the same mean, SD and correlation must look the same on a scatterplot. | false | Anscombe's quartet shows identical statistics with very different patterns.
M3#psychology-u11-05-q4@3: Why do critics argue against bar charts of means for continuous data? | They hide distributions, outliers and sample size | They are hard to draw | They can't show more than two groups | They always use a truncated axis | Plotting points or distributions reveals what bars conceal.
SA2#psychology-u11-05-q5@2,3: Describe how you would visualise reaction times in two conditions and explain your choice. | Use box plots or violin plots with individual points for each condition: they show medians, spread, skew (reaction times are usually positively skewed) and outliers, unlike a bar chart of means. Label axes with units, start at a sensible value and show sample sizes. | Graph choice ; Shows distribution ; Skew or outliers ; Labelling and scales
M2#psychology-u11-05-q6@1: Which graph suits continuous data such as reaction times? | A histogram | A bar chart of categories | A pie chart | A scattergram of one variable | Histograms show the distribution of continuous data.

## Probability
LV: Introductory · Foundation
S: Probability is the language of uncertainty that underlies statistical inference. This lesson covers basic probability rules, conditional probability and why intuition about probability often fails.
O: Calculate simple and combined probabilities
O: Explain conditional probability and base rates
O: Apply probability to interpret a diagnostic test result
H: Basic rules
P: A probability is a number from 0 (impossible) to 1 (certain). For equally likely outcomes, p = favourable outcomes ÷ total outcomes.
- **Addition rule** (mutually exclusive events): p(A or B) = p(A) + p(B).
- **Multiplication rule** (independent events): p(A and B) = p(A) × p(B).
- **Complement**: p(not A) = 1 − p(A).
H: Conditional probability and base rates
P: **Conditional probability** is the probability of A given that B has happened, written p(A ∣ B). People often confuse p(A ∣ B) with p(B ∣ A), and neglect **base rates**, how common something is to begin with. Bayes' theorem combines base rates with new evidence.
X: A screening test result
> A condition affects 1% of people. A test detects 90% of true cases and gives a false positive for 9% of people without the condition.
> In 1,000 people: 10 have the condition, and 9 test positive. Of the 990 without it, about 89 test positive.
> So of about 98 positive results, only 9 are true: a positive result means about a 9% chance of having the condition.
K: Probabilities combine by simple rules; conditional probabilities depend heavily on base rates, which intuition tends to ignore.
!: Confusing p(positive test | condition) with p(condition | positive test). They can differ enormously when the condition is rare.
EV: established | People often neglect base rates when judging conditional probabilities.
EV: contested | How best to teach probability reasoning (natural frequencies or percentages) is debated, though natural frequencies often help.
T: Probability | A number from 0 to 1 expressing how likely an event is
T: Conditional probability | The probability of one event given that another has occurred
T: Base rate | How common an event or condition is in the population
SUM: Probabilities follow addition, multiplication and complement rules.
SUM: Conditional probabilities depend on base rates; natural frequencies make them easier to reason about.
SRC: Gigerenzer G. and Hoffrage U., "How to improve Bayesian reasoning without instruction: frequency formats", Psychological Review 102(4):684–704 | primary | 1995 | https://doi.org/10.1037/0033-295X.102.4.684
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
Q: What is the multiplication rule for independent events? | p(A and B) = p(A) × p(B).
Q: What is a base rate? | How common an event or condition is in the population before any new evidence.
M1#psychology-u11-06-q1@1: The probability of rolling a 6 on a fair die is… | 1/6 | 1/2 | 1/3 | 6 | One favourable outcome out of six equally likely ones.
NUM2#psychology-u11-06-q2@2: Two fair coins are tossed. What is the probability (as a decimal) of two heads? | 0.25 | 0.001 | probability | Independent events multiply: 0.5 × 0.5 = 0.25.
M2#psychology-u11-06-q3@2: A rare condition affects 1 in 1,000 people. A test is 99% accurate for both positive and negative cases. Someone tests positive. What is most likely? | They probably don't have the condition | They almost certainly have it | They have a 99% chance of having it | The test must be broken | False positives from the many unaffected people far outnumber true positives.
M3#psychology-u11-06-q4@3: Why do natural frequencies (such as "9 out of 98") help people reason about test results? | They show base rates as counts | They change the true probabilities | They remove the need for a base rate | They make tests more accurate | Gigerenzer and Hoffrage found frequency formats improve Bayesian reasoning.
SA3#psychology-u11-06-q5@2,3: Use natural frequencies to explain why a positive result on a screening test for a rare condition may not mean the person has it. | Take 1,000 people with 1% base rate: 10 have the condition; with 90% sensitivity, 9 test positive. Of 990 without it, a 9% false-positive rate gives about 89 positives. So about 9 of 98 positives are true (about 9%). Rarity plus false positives make most positives false. | Base rate in counts ; True positives ; False positives ; Proportion true ; Interpretation

## Sampling distributions and standard error
LV: Intermediate · Application
S: If you repeated a study many times, the sample means would vary. The pattern of that variation, the sampling distribution, is the foundation of inferential statistics. This lesson explains sampling distributions and the standard error.
O: Describe a sampling distribution of the mean
O: Calculate and interpret the standard error of the mean
O: Explain the central limit theorem and its importance
PRE: Distributions: normal, skew and kurtosis
H: Many samples, many means
P: Each sample from a population gives a slightly different mean, because of **sampling error**. If we took every possible sample of the same size and plotted their means, we would get the **sampling distribution of the mean**. Its centre is the population mean; its spread is the **standard error (SE)**.
H: Standard error
P: The standard error of the mean is SE = SD ÷ √n. It shrinks as the sample grows: quadrupling the sample halves the SE. A small SE means a sample mean is likely to be close to the population mean.
X: Calculating a standard error
> Anxiety scores: SD = 12, n = 36.
> SE = 12 ÷ √36 = 12 ÷ 6 = 2.
> Sample means from studies of this size would typically differ from the population mean by about 2 points.
IX: sampling
H: The central limit theorem
P: The **central limit theorem** says that, for reasonably large samples (often about 30 or more), the sampling distribution of the mean is approximately normal even if the population is not. This is why many tests based on the normal or t distribution work for skewed data with large enough samples.
K: The standard error measures how much sample means vary from sample to sample; it shrinks with larger samples.
!: Confusing the SD with the SE. The SD describes spread of individual scores; the SE describes spread of sample means.
EV: established | The standard error of the mean equals the SD divided by the square root of n.
EV: established | The sampling distribution of the mean approaches normality as sample size increases (central limit theorem).
T: Sampling distribution | The distribution of a statistic, such as the mean, across all possible samples of a given size
T: Standard error | The standard deviation of a sampling distribution; for the mean, SD ÷ √n
T: Central limit theorem | The principle that sample means are approximately normally distributed for large samples
SUM: Sample means vary; their distribution is the sampling distribution.
SUM: SE = SD ÷ √n; the central limit theorem justifies many common tests.
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
SRC: Cumming G., "The new statistics: why and how", Psychological Science 25(1):7–29 | primary | 2014 | https://doi.org/10.1177/0956797613504966
Q: What is the standard error of the mean? | The standard deviation of sample means; calculated as SD ÷ √n.
Q: What does the central limit theorem state? | For reasonably large samples, sample means are approximately normally distributed, whatever the population shape.
M1#psychology-u11-07-q1@1: As sample size increases, the standard error… | Decreases | Increases | Stays the same | Becomes zero immediately | SE = SD ÷ √n, so larger n gives a smaller SE.
NUM2#psychology-u11-07-q2@2: Scores have SD 20 and the sample size is 100. What is the standard error of the mean? | 2 | 0.01 | points | SE = 20 ÷ √100 = 20 ÷ 10 = 2.
M2#psychology-u11-07-q3@2: A researcher wants to halve the standard error of a study with 50 participants. How many are needed? | 200 | 100 | 75 | 25 | Halving SE needs four times the sample, because SE depends on √n.
M3#psychology-u11-07-q4@3: Why can a t-test be used on skewed data when samples are large? | The sampling distribution of the mean is approximately normal | Skewed data become normal when collected | Large samples remove all outliers | The t-test doesn't use means | The central limit theorem applies to the distribution of means, not the raw data.
SA2#psychology-u11-07-q5@1,2: Explain the difference between the standard deviation and the standard error, using a calculation. | SD describes how individual scores vary around their mean; SE describes how sample means would vary across repeated samples. With SD = 15 and n = 25, SE = 15 ÷ 5 = 3: individual scores vary by about 15, but means of samples of 25 vary by about 3. | Defines SD ; Defines SE ; Calculation ; Interpretation

## Confidence intervals
LV: Intermediate · Application
S: A confidence interval gives a range of plausible values for a population parameter, showing the precision of an estimate. This lesson explains how 95% confidence intervals are calculated and interpreted, and their common misinterpretations.
O: Calculate an approximate 95% confidence interval for a mean
O: Interpret confidence intervals correctly
O: Explain why confidence intervals are more informative than p-values alone
PRE: Sampling distributions and standard error
H: Estimating with uncertainty
P: A **95% confidence interval (CI)** for a mean is approximately mean ± 1.96 × SE for large samples; for smaller samples, the multiplier comes from the t distribution and is a little larger (for example about 2.09 with 20 participants). A narrow interval means a precise estimate; a wide one means great uncertainty.
X: Calculating a 95% CI
> A sample of 100 has mean recall 20 words, SD 5. SE = 5 ÷ 10 = 0.5.
> 95% CI ≈ 20 ± 1.96 × 0.5 = 20 ± 0.98, so about 19.0 to 21.0 words.
> With only 25 participants, SE = 1 and the interval widens to about 17.9 to 22.1.
H: What it means
P: The correct interpretation: if we repeated the study many times and calculated a 95% CI each time, about 95% of those intervals would contain the true population mean. Informally, the interval shows the range of values reasonably compatible with the data. For a difference between groups, an interval that excludes zero corresponds to a significant result at α = .05.
P: Intervals for two group means that overlap slightly can still come from a significant difference; to compare groups, use the interval for the difference itself.
K: A confidence interval shows the precision of an estimate; it is more informative than a p-value because it shows both the size of an effect and the uncertainty around it.
!: Saying "there is a 95% probability the true mean is in this particular interval". Strictly, 95% describes the procedure across repetitions.
EV: established | Approximately 95% of 95% confidence intervals from repeated sampling contain the population value.
EV: contested | How confidence intervals should be interpreted informally, and whether Bayesian intervals are preferable, is debated.
T: Confidence interval | A range of plausible values for a population parameter, calculated from a sample
T: Precision | How narrow an estimate's interval is; greater precision means less uncertainty
SUM: A 95% CI is roughly the estimate ± 1.96 standard errors.
SUM: CIs show effect size and uncertainty together, which p-values alone don't.
SRC: Cumming G., "The new statistics: why and how", Psychological Science 25(1):7–29 | primary | 2014 | https://doi.org/10.1177/0956797613504966
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
Q: How is an approximate 95% CI for a mean calculated in a large sample? | Mean ± 1.96 × standard error.
Q: What does a wide confidence interval indicate? | An imprecise estimate with a lot of uncertainty.
M1#psychology-u11-08-q1@1: Which change makes a confidence interval narrower? | A larger sample | A smaller sample | Higher variability | A higher confidence level | Larger samples reduce the SE and so narrow the interval.
NUM2#psychology-u11-08-q2@2: A mean is 50 with standard error 2. Using 1.96, what is the upper limit of the 95% CI? | 53.92 | 0.01 | points | 50 + 1.96 × 2 = 53.92.
M2#psychology-u11-08-q3@2: The 95% CI for a difference between two therapies is −1 to 7 points. What does this suggest? | It could be zero, or small, or moderate | One therapy is definitely better | The therapies are identical | The study had no participants | An interval including zero is compatible with no difference.
M3#psychology-u11-08-q4@3: Why do many statisticians recommend reporting confidence intervals alongside p-values? | CIs show the likely size of an effect and its uncertainty | CIs are always narrower than p-values | CIs make results significant | CIs remove the need for a sample | Effect estimates with uncertainty are more informative than a binary significance decision.
SA2#psychology-u11-08-q5@2,3: A study finds mean improvement of 6 points (SE 2) after an intervention. Calculate and interpret the 95% CI. | 95% CI ≈ 6 ± 1.96 × 2 = 2.08 to 9.92. Plausible improvements range from about 2 to 10 points; the interval excludes zero, so the improvement is significant at .05, but the true effect could be small or fairly large. | Calculation ; Lower limit ; Upper limit ; Interpretation of range ; Excludes zero

## Null and alternative hypotheses
LV: Introductory · Foundation
S: Null hypothesis significance testing compares data against a null hypothesis of no effect. This lesson explains the null and alternative hypotheses, one- and two-tailed tests, and the logic of testing.
O: Define the null and alternative hypotheses
O: Explain the logic of null hypothesis significance testing
O: Distinguish one-tailed and two-tailed tests and when each is justified
PRE: Research questions and hypotheses
H: Two hypotheses
- The **null hypothesis (H0)** states there is no effect, difference or relationship in the population.
- The **alternative hypothesis (H1)** states there is an effect. It can be **directional** (one-tailed) or **non-directional** (two-tailed).
H: The logic of testing
P: Statistical tests ask: if the null hypothesis were true, how surprising would data like these (or more extreme) be? If very surprising, below a chosen threshold (α, usually .05), we **reject the null**. If not, we **fail to reject** it. We never prove the null true, and rejecting it doesn't prove the alternative; it only says the data are unlikely under the null.
X: Testing a memory intervention
> H0: mean recall is the same with and without the intervention.
> H1 (one-tailed): mean recall is higher with the intervention.
> The data show a difference that would occur less than 5% of the time if H0 were true, so H0 is rejected and H1 supported.
K: Significance testing assesses how surprising the data are if the null hypothesis is true; we reject or fail to reject the null, never prove it.
H: One- or two-tailed?
P: A one-tailed test puts all of α in one direction, making it easier to detect an effect in that direction but impossible to detect one in the other. It must be justified before seeing the data by theory or previous research; choosing it after seeing the data inflates false positives.
!: Saying "we accepted the null hypothesis, so there is no effect". A non-significant result may reflect low power.
EV: established | Failing to reject the null hypothesis isn't evidence that the null is true.
EV: contested | Whether null hypothesis significance testing should remain psychology's main inferential framework is debated.
T: Null hypothesis | The hypothesis that there is no effect, difference or relationship in the population
T: Alternative hypothesis | The hypothesis that there is an effect, difference or relationship
T: Significance level (α) | The threshold probability for rejecting the null, usually .05
SUM: H0 states no effect; H1 states an effect, one- or two-tailed.
SUM: Tests ask how surprising the data are under H0; we reject or fail to reject it.
SRC: Wasserstein R. L. and Lazar N. A., "The ASA statement on p-values: context, process, and purpose", The American Statistician 70(2):129–133 | primary | 2016 | https://doi.org/10.1080/00031305.2016.1154108
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
Q: What does the null hypothesis state? | That there is no effect, difference or relationship in the population.
Q: When is a one-tailed test justified? | When theory or previous research predicts a direction, decided before seeing the data.
M1#psychology-u11-09-q1@1: If data are very unlikely under the null hypothesis, the researcher… | Rejects the null hypothesis | Proves the alternative hypothesis | Accepts the null hypothesis | Changes the significance level | Unlikely data lead to rejecting H0, not proving H1.
M2#psychology-u11-09-q2@2: A result is not significant at .05. What is the correct conclusion? | There is insufficient evidence to reject the null | The null hypothesis is proven true | There is definitely no effect | The study was unethical | Non-significance can reflect a small effect or low power.
TF2#psychology-u11-09-q3@3: Choosing a one-tailed test after seeing which direction the data went is acceptable. | false | It inflates the false-positive rate; the choice must be made in advance.
M3#psychology-u11-09-q4@3: What is the main criticism of treating p < .05 as a strict dividing line? | It turns evidence into a yes-or-no | It makes tests too slow to run | It is only used in physics | It always gives the correct answer | Results just above and below .05 provide similar evidence; dichotomising encourages misinterpretation.
SA2#psychology-u11-09-q5@2,3: Write H0 and a two-tailed H1 for a study comparing sleep in students who use phones in bed and those who don't, and explain what rejecting H0 would and wouldn't mean. | H0: there is no difference in mean sleep duration between the groups. H1: there is a difference. Rejecting H0 means the difference observed would be unlikely if there were no population difference; it doesn't prove phones cause less sleep (no random allocation) or tell us how large the effect is. | H0 ; Two-tailed H1 ; Meaning of rejection ; Not proof or causation ; Effect size needed

## p-values and statistical significance
LV: Intermediate · Evaluation
S: The p-value is the most reported and most misunderstood number in psychology. This lesson explains what a p-value is, what it isn't, and how to interpret significance sensibly.
O: Define a p-value correctly
O: Identify common misinterpretations of p-values
O: Evaluate the use of statistical significance in research
PRE: Null and alternative hypotheses
H: What a p-value is
P: A **p-value** is the probability of obtaining data at least as extreme as those observed, **if the null hypothesis were true**. A small p-value means the data would be surprising under the null. If p is below α (usually .05), the result is called **statistically significant**.
H: What a p-value is not
- It is **not** the probability that the null hypothesis is true.
- It is **not** the probability that the result happened "by chance".
- It does **not** measure the size or importance of an effect.
- p = .049 and p = .051 are not meaningfully different evidence.
P: The American Statistical Association's 2016 statement warned that scientific conclusions shouldn't rest only on whether p passes a threshold, and that p-values should be reported with effect sizes and confidence intervals.
IX: hypothesis-test
X: Significant but trivial
> A survey of 100,000 people finds that one group sleeps 2 minutes more per night, p < .001.
> The tiny p-value reflects the huge sample, not an important effect.
> The effect size (2 minutes) shows the finding has little practical significance.
K: A p-value is the probability of data this extreme if the null is true; it isn't the probability the null is true, and it doesn't measure importance.
!: Writing "p = .03, so there is a 97% chance the hypothesis is true". p-values don't give the probability of hypotheses.
EV: established | p-values don't measure the probability that the null hypothesis is true (Wasserstein and Lazar, 2016).
EV: contested | Proposals to lower the threshold to .005 or abandon significance thresholds are debated.
T: p-value | The probability of data at least as extreme as those observed, if the null hypothesis were true
T: Statistical significance | A p-value below the chosen threshold α
T: Practical significance | Whether an effect is large enough to matter in the real world
SUM: The p-value measures how surprising the data are under the null.
SUM: It isn't the probability of a hypothesis, nor a measure of effect size; report effects and intervals too.
SRC: Wasserstein R. L. and Lazar N. A., "The ASA statement on p-values: context, process, and purpose", The American Statistician 70(2):129–133 | primary | 2016 | https://doi.org/10.1080/00031305.2016.1154108
SRC: Gigerenzer G., "Mindless statistics", The Journal of Socio-Economics 33(5):587–606 | primary | 2004 | https://doi.org/10.1016/j.socec.2004.09.033
Q: What is a p-value? | The probability of obtaining data at least as extreme as observed, if the null hypothesis were true.
Q: What is the difference between statistical and practical significance? | Statistical significance concerns p below α; practical significance concerns whether the effect is large enough to matter.
M1#psychology-u11-10-q1@1: A result is usually called statistically significant when… | p is less than .05 | p is greater than .05 | The effect is large | The sample is small | By convention, results with p below .05 are called statistically significant.
M2#psychology-u11-10-q2@2: A study reports p = .002 with 50,000 participants and a tiny difference between groups. What should a reader conclude? | The effect is detectable but may be too small to matter | The effect must be large and important | The null hypothesis has a 0.2% chance of being true | The study was badly designed | Large samples make small effects significant; check effect size.
TF2#psychology-u11-10-q3@1: A p-value of .04 means there is a 4% chance the null hypothesis is true. | false | p is calculated assuming the null is true; it isn't the probability of the null.
M3#psychology-u11-10-q4@3: Which practice best addresses problems with p-values? | Reporting effect sizes and confidence intervals with p | Reporting only whether p < .05 | Using p-values only for large samples | Removing all statistics from papers | Estimates with uncertainty give fuller information than a threshold decision.
SA3#psychology-u11-10-q5@3: Evaluate the use of p-values and significance testing in psychology. | Useful as a measure of how surprising data are under H0 and as a common standard. Problems: widely misinterpreted (not P(H0)), dichotomous thinking, confuses statistical and practical significance, vulnerable to p-hacking; ASA statement. Remedies: effect sizes, CIs, preregistration, Bayesian or estimation approaches. | Correct definition ; Misinterpretations ; Practical significance ; p-hacking ; Remedies

## Effect sizes
LV: Intermediate · Application
S: An effect size measures how big an effect is, independently of sample size. This lesson explains Cohen's d, r and eta squared, how to calculate d and how to interpret effect sizes in context.
O: Define effect size and explain why it is reported alongside p-values
O: Calculate Cohen's d for two groups
O: Interpret effect sizes using conventions and real-world context
PRE: p-values and statistical significance
H: Size, not just significance
P: An **effect size** quantifies the magnitude of a difference or relationship. Unlike p, it doesn't depend on sample size, so it lets researchers compare results across studies and judge practical importance. Effect sizes are essential for meta-analysis and for power analysis.
H: Common effect sizes
- **Cohen's d**: the difference between two means divided by the pooled standard deviation. Cohen's (1988) rough benchmarks: 0.2 small, 0.5 medium, 0.8 large.
- **r**: the correlation coefficient; roughly .1 small, .3 medium, .5 large.
- **Eta squared (η²)**: the proportion of variance explained in ANOVA.
X: Calculating Cohen's d
> Therapy group mean wellbeing = 60; control = 54; pooled SD = 12.
> d = (60 − 54) ÷ 12 = 0.5: a medium effect by Cohen's benchmarks.
> The average person in the therapy group scores higher than about 69% of the control group.
P: **Investigate with the lab.** Run studies with small and large effects and compare their p-values and effect sizes.
IX: hypothesis-test
K: Effect sizes measure how large an effect is, independent of sample size, and should be interpreted in context rather than only by benchmarks.
H: Context matters
P: Cohen intended his benchmarks as a last resort. A "small" effect of a cheap intervention delivered to millions may matter a lot; a "large" effect in a tiny, uncontrolled study may be inflated. Many real effects in psychology are smaller than the benchmarks suggest.
!: Treating a "small" effect as unimportant. Importance depends on context, cost and how many people are affected.
EV: established | Cohen proposed d = 0.2, 0.5 and 0.8 as rough benchmarks for small, medium and large effects.
EV: contested | Whether general benchmarks should be used at all, rather than field-specific comparisons, is debated.
T: Effect size | A measure of the magnitude of a difference or relationship
T: Cohen's d | The standardised difference between two means: mean difference divided by pooled SD
T: Eta squared | The proportion of variance in the DV explained by the IV in ANOVA
SUM: Effect sizes measure magnitude independently of sample size.
SUM: Cohen's d, r and η² are common; interpret them in context.
SRC: Cohen J., "A power primer", Psychological Bulletin 112(1):155–159 | primary | 1992 | https://doi.org/10.1037/0033-2909.112.1.155
SRC: Lakens D., "Calculating and reporting effect sizes to facilitate cumulative science: a practical primer for t-tests and ANOVAs", Frontiers in Psychology 4:863 | primary | 2013 | https://doi.org/10.3389/fpsyg.2013.00863
Q: How is Cohen's d calculated? | The difference between two means divided by the pooled standard deviation.
Q: Why are effect sizes needed alongside p-values? | p-values depend on sample size; effect sizes show how large the effect is.
M1#psychology-u11-11-q1@1: By Cohen's benchmarks, d = 0.8 is… | Large | Small | Medium | Negligible | Cohen suggested 0.2 small, 0.5 medium, 0.8 large.
NUM2#psychology-u11-11-q2@2: Group means are 25 and 19, with a pooled SD of 4. Calculate Cohen's d. | 1.5 | 0.01 | standard deviations | d = (25 − 19) ÷ 4 = 1.5.
M2#psychology-u11-11-q3@2: A cheap reading intervention used nationally has d = 0.15. How should this be judged? | Small but valuable at scale | Useless because it is below 0.2 | Large because it is significant | Impossible to interpret | Small effects can matter at scale; context determines importance.
M3#psychology-u11-11-q4@3: Why might effect sizes from small published studies be overestimates? | Only inflated effects reach significance | Small studies always measure badly | Effect sizes increase with sample size | Large studies are never published | Publication bias and the winner's curse inflate published effects from small studies.
SA2#psychology-u11-11-q5@2,3: Calculate and interpret Cohen's d for a study where mindfulness participants score 32 on stress and controls 38, with pooled SD 10. | d = (38 − 32) ÷ 10 = 0.6 (stress lower in the mindfulness group): a medium-to-large effect by Cohen's benchmarks. Interpretation depends on context: cost, durability, sample size and whether the study was well controlled; small studies may overestimate. | Calculation ; Direction ; Benchmark ; Context ; Caution
M2#psychology-u11-11-q6@1: Why report an effect size as well as a p-value? | It shows how large the effect is, not just whether it is significant | It replaces the need for a sample | It proves the effect is causal | It makes the result significant | With large samples, tiny effects can be significant; effect size shows their importance.

## Statistical power
LV: Intermediate · Application
S: Statistical power is the probability that a study detects an effect if it exists. This lesson explains what determines power and why underpowered studies are a problem.
O: Define statistical power and list the factors that affect it
O: Use a power estimate to judge whether a study was adequately powered
O: Evaluate the consequences of low power for a research literature
PRE: Effect sizes
H: What power depends on
P: **Power** = 1 − β, where β is the probability of a Type II error (missing a real effect). Power increases with:
- a larger **effect size**;
- a larger **sample**;
- a less strict **α** (e.g. .05 rather than .01);
- a **one-tailed** test (when justified);
- **less noise**: reliable measures and within-subject designs.
P: A common target is 80% power. To detect d = 0.5 with 80% power at α = .05 (two-tailed, two independent groups) needs about 64 per group; for d = 0.2, about 393 per group (Cohen, 1992).
IX: hypothesis-test
X: Judging a published study
> A study compares two therapies with 20 participants per group and finds no significant difference.
> With 20 per group, power to detect a medium effect (d = 0.5) is only about 34%.
> So the study had a two-in-three chance of missing a real medium effect: its null result tells us little.
H: Planning power
K: Power is the chance of detecting a real effect; it depends mainly on effect size and sample size, and should be planned before data collection.
!: Calculating "observed power" after a study from its own result. Post-hoc power adds nothing beyond the p-value; power should be planned in advance.
EV: established | About 64 participants per group give 80% power to detect d = 0.5 at α = .05 (Cohen, 1992).
EV: established | Many published studies in psychology and neuroscience have had low power (Button et al., 2013).
T: Statistical power | The probability of detecting an effect that really exists (1 − β)
T: Type II error rate (β) | The probability of failing to detect a real effect
SUM: Power depends on effect size, sample size, α, tails and noise.
SUM: Low power wastes resources, misses effects and inflates published effects.
SRC: Cohen J., "A power primer", Psychological Bulletin 112(1):155–159 | primary | 1992 | https://doi.org/10.1037/0033-2909.112.1.155
SRC: Button K. S. et al., "Power failure: why small sample size undermines the reliability of neuroscience", Nature Reviews Neuroscience 14(5):365–376 | primary | 2013 | https://doi.org/10.1038/nrn3475
Q: How is power related to β? | Power = 1 − β, where β is the probability of a Type II error.
Q: Name three factors that increase power. | Any three of larger effect size, larger sample, less strict α, one-tailed test, less measurement noise.
M1#psychology-u11-12-q1@1: A common target for statistical power is… | 80% | 5% | 20% | 100% | 80% is a widely used convention, giving a 20% chance of a Type II error.
M2#psychology-u11-12-q2@2: A researcher expects a small effect (d = 0.2). Which plan is most appropriate? | Recruit several hundred participants per group | Recruit 15 per group | Use a stricter α of .001 | Run the study without a power analysis | Small effects need large samples (about 393 per group for 80% power).
TF2#psychology-u11-12-q3@3: Calculating "observed power" from a study's own result after the study is a good way to interpret a non-significant finding. | false | Post-hoc observed power is determined by the p-value and adds no information.
M3#psychology-u11-12-q4@3: How does widespread low power distort a research literature? | Significant results overestimate effects and replications often fail | It makes every published effect smaller than reality | It guarantees all findings are true | It has no effect on published results | Underpowered studies that reach significance tend to exaggerate effects.
SA3#psychology-u11-12-q5@2,3: Explain why a non-significant result from a study of 20 per group comparing two therapies should be interpreted cautiously. | With 20 per group, power for a medium effect is only about a third, so a real difference could easily be missed (Type II error). The confidence interval would be wide, compatible with no effect or a meaningful one. Conclusion: inconclusive; a larger, properly powered study or equivalence test is needed. | Power estimate ; Type II error ; Wide CI ; Inconclusive ; Better design

## Type I and Type II errors
LV: Intermediate · Application
S: Every significance test risks two kinds of error: a false positive (Type I) or a false negative (Type II). This lesson explains both, how α and power control them and the trade-off between them.
O: Define Type I and Type II errors
O: Explain how α and power relate to each error
O: Analyse the consequences of each error in different research contexts
PRE: Statistical power
H: Two errors
- **Type I error (false positive)**: rejecting a true null hypothesis, concluding there's an effect when there isn't. Its probability is α.
- **Type II error (false negative)**: failing to reject a false null hypothesis, missing a real effect. Its probability is β (1 − power).
H: The trade-off
P: Making α stricter (say .01) reduces Type I errors but, for a given sample, increases Type II errors. Increasing the sample reduces Type II errors without raising Type I errors. With many tests, Type I errors accumulate: with 20 independent tests of true nulls at α = .05, the chance of at least one false positive is 1 − 0.95²⁰ ≈ 64%. Corrections such as Bonferroni (dividing α by the number of tests) control this.
X: Which error matters more?
> Testing a new drug's harmful side effect: a Type II error (missing real harm) could be dangerous.
> Claiming a new therapy works: a Type I error could lead to an ineffective therapy being adopted.
> The acceptable balance depends on the costs of each mistake.
P: Preregistering a primary outcome, and treating other outcomes as secondary, is a simple way to stop false positives from accumulating across many measures.
P: **Investigate with the lab.** Run a thousand studies with no real effect and count how often p falls below 0.05.
IX: hypothesis-test
K: Type I errors are false positives (controlled by α); Type II errors are false negatives (controlled by power); there is a trade-off for a fixed sample.
!: Thinking a significant result means a Type I error is impossible. At α = .05, about 1 in 20 tests of true nulls will be significant by chance.
EV: established | Testing many hypotheses at α = .05 raises the chance of at least one false positive.
EV: contested | Which multiple-comparison correction is most appropriate depends on the research context and is debated.
T: Type I error | Rejecting a true null hypothesis: a false positive
T: Type II error | Failing to reject a false null hypothesis: a false negative
T: Bonferroni correction | Dividing α by the number of tests to control false positives
SUM: Type I errors are false positives (α); Type II errors are false negatives (β).
SUM: Stricter α reduces Type I errors but raises Type II errors unless the sample grows.
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
SRC: Ioannidis J. P. A., "Why most published research findings are false", PLoS Medicine 2(8):e124 | primary | 2005 | https://doi.org/10.1371/journal.pmed.0020124
Q: What is a Type I error? | Rejecting a true null hypothesis: concluding there is an effect when there isn't.
Q: What is a Type II error? | Failing to reject a false null hypothesis: missing a real effect.
M1#psychology-u11-13-q1@1: The probability of a Type I error equals… | α | β | Power | The effect size | α is the rate of false positives when the null is true.
NUM2#psychology-u11-13-q2@2: Five tests are run with a Bonferroni correction for an overall α of .05. What α should each test use? | 0.01 | 0.0001 | per test | .05 ÷ 5 = .01 per test.
M2#psychology-u11-13-q3@2: A study concludes a new teaching method works, but the effect isn't real. This is… | A Type I error | A Type II error | Correct rejection | Low ecological validity | Concluding there is an effect when there isn't is a false positive: a Type I error.
M3#psychology-u11-13-q4@3: In a study of whether a medicine causes a serious side effect, which error is most worrying? | A Type II error, missing real harm | A Type I error, a false alarm | Neither type of error | Errors in the literature review | Missing real harm could put patients at risk, so high power matters.
SA2#psychology-u11-13-q5@2,3: Explain the trade-off between Type I and Type II errors and how researchers can reduce both. | Lowering α reduces false positives but, for a fixed sample, raises the chance of missing real effects. Increasing sample size (or reducing measurement noise) increases power, reducing Type II errors without raising α. Preregistration and multiple-comparison corrections control Type I errors across many tests. | Trade-off explained ; Sample size ; Noise or design ; Multiple comparisons ; Context of costs
M2#psychology-u11-13-q6@1: What is a Type I error? | Rejecting the null hypothesis when it is true | Accepting the null hypothesis when it is false | Using the wrong statistical test | Choosing too small a sample | A false positive; at α = 0.05 it happens about 5% of the time when there is no effect.
## Correlation: Pearson and Spearman
LV: Intermediate · Application
S: Correlation coefficients measure the strength and direction of a relationship between two variables. This lesson explains Pearson's r and Spearman's rho, when to use each and how to test them for significance.
O: Distinguish Pearson's r and Spearman's rho and when each is used
O: Interpret a correlation coefficient, its significance and r²
O: Evaluate correlational findings, including outliers and restricted range
PRE: Correlational research
H: Two coefficients
- **Pearson's r** measures the strength of a **linear** relationship between two interval or ratio variables, assuming roughly normal data without extreme outliers.
- **Spearman's rho (ρ)** correlates the **ranks** of the data, so it suits ordinal data or non-normal data and measures any **monotonic** relationship (consistently increasing or decreasing). It is less affected by outliers.
P: Both range from −1 to +1. **r²** is the proportion of variance in one variable shared with the other: r = .5 means 25% shared variance.
IX: correlation
X: A small worked example
> Revision hours (x): 1, 2, 3, 4, 5. Test scores (y): 2, 4, 5, 4, 5.
> Pearson's r ≈ .77, so r² ≈ .60: 60% of the variance in scores is shared with revision hours.
> With only five participants, t(3) ≈ 2.12 and p ≈ .12 (two-tailed): a strong-looking correlation isn't significant in such a small sample.
K: Pearson's r measures linear relationships between interval data; Spearman's rho measures monotonic relationships using ranks; neither shows causation.
H: Things that distort correlations
P: **Outliers** can create or destroy a correlation. **Restricted range** (studying only high achievers, say) weakens correlations. **Non-linear** relationships (such as the inverted U between arousal and performance) can give r near zero even when variables are strongly related. Always plot the data.
!: Interpreting r = .3 as "30% shared". The shared variance is r², so 9%.
EV: established | Restricting the range of a variable reduces the observed correlation.
EV: established | Small samples can produce large but unreliable correlation coefficients.
T: Pearson's r | A correlation coefficient measuring linear relationships between interval or ratio variables
T: Spearman's rho | A rank-based correlation coefficient measuring monotonic relationships
T: Coefficient of determination (r²) | The proportion of variance shared by two variables
SUM: Pearson's r suits linear relationships between interval data; Spearman's rho suits ranks or non-normal data.
SUM: r² gives shared variance; outliers, restricted range and non-linearity distort correlations.
SRC: Spearman C., "The proof and measurement of association between two things", American Journal of Psychology 15(1):72–101 | primary | 1904 | https://doi.org/10.2307/1412159
SRC: Anscombe F. J., "Graphs in statistical analysis", The American Statistician 27(1):17–21 | primary | 1973 | https://doi.org/10.1080/00031305.1973.10478966
Q: When should Spearman's rho be used instead of Pearson's r? | With ordinal data, non-normal data, outliers, or relationships that are monotonic but not linear.
Q: What does r² represent? | The proportion of variance in one variable shared with the other.
M1#psychology-u11-14-q1@1: Which coefficient is calculated on ranks? | Spearman's rho | Pearson's r | Cohen's d | Eta squared | Spearman's rho correlates the ranks of the data.
NUM2#psychology-u11-14-q2@2: A correlation of r = .6 is found. What proportion of variance is shared (as a decimal)? | 0.36 | 0.001 | proportion | r² = .6 × .6 = .36, or 36% shared variance.
M2#psychology-u11-14-q3@2: A study finds r = .05 between arousal and performance, but the scatterplot shows an inverted U. What should be concluded? | There is a strong non-linear relationship that r misses | There is no relationship of any kind | Arousal causes poor performance | The data must be wrong | Pearson's r only captures linear relationships.
M3#psychology-u11-14-q4@3: A university finds only a weak correlation between entrance test scores and degree results among admitted students. Why might this underestimate the test's predictive value? | Restricted range: only high scorers were admitted | The test has too many items | Degree results are nominal data | Correlations can't be calculated for students | Excluding low scorers narrows the range and weakens the correlation.
SA2#psychology-u11-14-q5@2,3: A study of 200 people finds r = −.25 (p < .001) between screen time and sleep quality. Interpret this finding. | A weak negative correlation: more screen time goes with poorer sleep. r² = .0625, so about 6% shared variance. Significant because of the large sample, but small. Correlation doesn't show causation (direction: poor sleepers may use screens; third variables such as stress). | Direction and strength ; r² ; Significance and sample size ; Causation caution

## Simple linear regression
LV: Intermediate · Application
S: Simple linear regression fits a straight line that predicts one variable from another. This lesson explains the regression equation, the slope and intercept, residuals and R².
O: Describe the regression equation and the meaning of its slope and intercept
O: Use a regression equation to make a prediction
O: Evaluate regression predictions, including extrapolation and causation
PRE: Correlation: Pearson and Spearman
H: The regression line
P: Regression finds the line ŷ = a + bx that best predicts the outcome (y) from the predictor (x), by minimising the squared distances of the points from the line (**least squares**). The **slope** (b) is the predicted change in y for each one-unit increase in x. The **intercept** (a) is the predicted y when x = 0. **Residuals** are the differences between actual and predicted values.
X: Predicting test scores from revision
> With the data 1–5 revision hours and scores 2, 4, 5, 4, 5, the least-squares line is ŷ = 2.2 + 0.6x.
> Each extra hour predicts 0.6 more marks; the intercept 2.2 is the predicted score with no revision.
> For 3.5 hours: ŷ = 2.2 + 0.6 × 3.5 = 4.3. R² = .60: the line accounts for 60% of the variance.
P: R² in simple regression equals r² from the correlation of the same two variables, so the two analyses tell the same story about strength.
P: **Investigate with the lab.** Add your own points and watch the regression line and R² change.
IX: correlation
K: Regression predicts an outcome from a predictor with ŷ = a + bx; the slope gives the change per unit, and R² the proportion of variance explained.
H: Cautions
P: Predictions are reliable only within the range of the data: **extrapolating** (predicting a score for 40 hours of revision) can be absurd. A regression slope doesn't show causation unless the predictor was manipulated. Residual plots should be checked for curves, outliers and uneven spread. The term "regression" comes from Galton's (1886) observation that children of very tall parents tend to be less extreme: regression towards the mean.
!: Treating the predictor as a cause. Regression describes prediction; causation needs a suitable design.
EV: established | Least-squares regression minimises the sum of squared residuals.
EV: established | Extreme scores tend to be followed by less extreme ones (regression towards the mean).
T: Slope | The predicted change in the outcome for each one-unit increase in the predictor
T: Intercept | The predicted outcome when the predictor equals zero
T: Residual | The difference between an observed value and the value predicted by the regression line
SUM: Regression fits ŷ = a + bx by least squares; the slope and intercept make predictions.
SUM: R² shows variance explained; avoid extrapolation and causal claims without a suitable design.
SRC: Galton F., "Regression towards mediocrity in hereditary stature", Journal of the Anthropological Institute of Great Britain and Ireland 15:246–263 | primary | 1886 | https://doi.org/10.2307/2841583
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
Q: What does the slope of a regression line mean? | The predicted change in the outcome for each one-unit increase in the predictor.
Q: What is a residual? | The difference between an observed value and the predicted value.
M1#psychology-u11-15-q1@1: In ŷ = 10 + 3x, what is the intercept? | 10 | 3 | 13 | x | The intercept is the constant term, the prediction when x = 0.
NUM2#psychology-u11-15-q2@2: Using ŷ = 2.2 + 0.6x, predict the score for 4 hours of revision. | 4.6 | 0.01 | marks | Substitute x = 4: 2.2 + 0.6 × 4 = 2.2 + 2.4 = 4.6 marks.
M2#psychology-u11-15-q3@2: A regression of happiness on income is based on incomes from £15,000 to £60,000. Why shouldn't it be used to predict happiness at £2 million? | That is extrapolation beyond the data | The slope would be negative | Regression can't use money | The intercept would be zero | Predictions outside the observed range may not follow the same line.
M3#psychology-u11-15-q4@3: Pupils with the lowest test scores improve most on retest, with no intervention. What explains this? | Regression towards the mean | A strong treatment effect | Restricted range | A Type II error | Extreme scores partly reflect chance and tend to be less extreme next time.
SA2#psychology-u11-15-q5@2,3: Interpret the regression equation ŷ = 50 − 2x, where ŷ is wellbeing score and x is hours of daily social media use. | Intercept 50: predicted wellbeing with zero hours. Slope −2: each additional hour predicts wellbeing 2 points lower. Use only within the observed range; correlational data can't show social media causes lower wellbeing; check R² for how much variance is explained. | Intercept ; Slope ; Range limitation ; Causation caution ; R² or fit
M2#psychology-u11-15-q6@1: What does R² tell you in simple linear regression? | The proportion of variance in one variable explained by the other | The slope of the regression line | The number of data points | Whether the relationship is causal | R² of 0.64 means 64% of the variance is explained.

## Multiple regression
LV: Advanced · Application
S: Multiple regression predicts an outcome from several predictors at once, estimating each predictor's contribution while holding the others constant. This lesson explains the model, its coefficients and its main pitfalls.
O: Describe the multiple regression model and the meaning of its coefficients
O: Interpret R², adjusted R² and individual coefficients
O: Evaluate multiple regression, including multicollinearity and causal interpretation
PRE: Simple linear regression
H: Several predictors
P: Multiple regression fits ŷ = a + b₁x₁ + b₂x₂ + … Each coefficient (b) is the predicted change in y for a one-unit increase in that predictor, **holding the other predictors constant**. This lets researchers ask, for example, whether sleep predicts exam performance once revision time is taken into account.
H: Judging the model
P: **R²** is the proportion of variance explained by all predictors together. **Adjusted R²** corrects for the number of predictors, since adding predictors always raises R² a little. **Standardised coefficients** (β) allow predictors measured in different units to be compared.
X: Predicting exam scores
> Predictors: hours of revision, hours of sleep and anxiety score.
> Results: revision b = 1.5 (p < .001), sleep b = 2.0 (p = .01), anxiety b = −0.4 (p = .03); R² = .35.
> Each extra hour of sleep predicts 2 more marks, holding revision and anxiety constant. Together the predictors explain 35% of the variance.
K: Multiple regression estimates each predictor's unique contribution, holding the others constant; R² shows how much variance the model explains.
H: Pitfalls
- **Multicollinearity**: when predictors are highly correlated with each other, their individual coefficients become unstable and hard to interpret.
- **Overfitting**: many predictors and few participants produce models that fit this sample but not others.
- **Causation**: "holding constant" statistically isn't the same as controlling experimentally; unmeasured confounds remain.
!: Concluding that a predictor has "no effect" because it isn't significant in a multiple regression. It may be collinear with another predictor.
EV: established | Adding predictors never decreases R², so adjusted R² is used to compare models.
EV: contested | How far statistical control in regression can substitute for experimental control is debated.
T: Multiple regression | Predicting an outcome from two or more predictors simultaneously
T: Multicollinearity | High correlation between predictors, making individual coefficients unstable
T: Adjusted R² | R² corrected for the number of predictors in the model
SUM: Multiple regression estimates each predictor's contribution holding others constant.
SUM: Watch for multicollinearity, overfitting and over-causal interpretation.
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, SAGE | secondary | 2018
Q: What does a coefficient in multiple regression mean? | The predicted change in the outcome for a one-unit increase in that predictor, holding the other predictors constant.
Q: What is multicollinearity? | High correlation between predictors, which makes individual coefficients unstable.
M1#psychology-u11-16-q1@1: Why is adjusted R² used? | It corrects for the number of predictors | It makes R² larger | It removes outliers | It tests one predictor alone | Adding predictors inflates R²; adjusted R² penalises this.
M2#psychology-u11-16-q2@2: In a model predicting wellbeing, income b = 0.002 and friendship score b = 0.8, measured in different units. How can their importance be compared? | Compare standardised coefficients | Compare the raw b values directly | Compare the intercepts | Compare their p-values only | Standardised coefficients put predictors on the same scale.
TF2#psychology-u11-16-q3@3: Holding variables constant in regression is equivalent to random allocation in an experiment. | false | Statistical control can only adjust for measured variables; unmeasured confounds remain.
M3#psychology-u11-16-q4@3: Two predictors correlate at .95 and neither is significant, though the model R² is high. What is the likely explanation? | Multicollinearity | Restricted range | A Type I error | Too few predictors | Highly correlated predictors share variance, making each coefficient unstable.
SA3#psychology-u11-16-q5@2,3: Interpret a multiple regression in which sleep (b = 2.0, p = .01) and revision (b = 1.5, p < .001) predict exam scores, R² = .30. | Each extra hour of sleep predicts 2 more marks holding revision constant; each extra revision hour predicts 1.5 marks holding sleep constant; together they explain 30% of variance (70% unexplained). Correlational: can't conclude causation; unmeasured confounds (motivation); check multicollinearity and sample size. | Sleep coefficient ; Revision coefficient ; R² ; Causation caution ; Other checks

## Independent t-tests
LV: Intermediate · Application
S: The independent t-test compares the means of two separate groups. This lesson explains when to use it, its assumptions, Welch's version and how to report the result.
O: Identify when an independent t-test is appropriate
O: Interpret and report a t-test result with degrees of freedom, p and effect size
O: Evaluate the assumptions of the t-test and the case for Welch's test
PRE: p-values and statistical significance
H: When to use it
P: Use an **independent t-test** when comparing the means of **two independent groups** (different participants in each) on an interval or ratio DV. The test, devised by W. S. Gosset writing as "Student" (1908), calculates t: the difference between the means divided by the standard error of the difference. Larger |t| means the difference is large relative to the variability.
H: Assumptions
- Independent observations.
- Interval or ratio DV.
- Approximately normal distributions within groups (less important with larger samples).
- Equal variances (Student's version). **Welch's t-test** doesn't assume equal variances; many methodologists recommend it as the default (Delacre, Lakens and Leys, 2017).
X: A worked example
> Condition A scores: 5, 6, 7, 8, 9 (mean 7). Condition B: 3, 4, 5, 6, 7 (mean 5). Both SDs ≈ 1.58.
> Student's t(8) = 2.00, p = .081 two-tailed; Cohen's d ≈ 1.26.
> Report: "Condition A (M = 7.0, SD = 1.58) scored higher than condition B (M = 5.0, SD = 1.58), but the difference was not significant, t(8) = 2.00, p = .081, d = 1.26." The large d with a non-significant p shows how little information five per group provides.
P: Reporting the confidence interval for the difference between means shows the range of plausible effects, which is especially useful when p is close to .05.
P: **Investigate with the lab.** Run an independent t-test simulation and see how sample size changes the power to detect a real difference.
IX: hypothesis-test
K: The independent t-test compares two group means; report t, degrees of freedom, p and an effect size, and prefer Welch's version when variances may differ.
!: Using an independent t-test on repeated measures data. The same people in both conditions need a paired t-test.
EV: established | Welch's t-test controls Type I errors better than Student's when group variances and sizes differ.
EV: contested | Whether Welch's test should always be the default is debated, though it loses little when variances are equal.
T: Independent t-test | A test comparing the means of two independent groups
T: Degrees of freedom | The number of values free to vary; for an independent t-test, n₁ + n₂ − 2
T: Welch's t-test | A version of the t-test that doesn't assume equal variances
SUM: The independent t-test compares two separate groups' means.
SUM: Report t, df, p and d; check assumptions and consider Welch's test.
SRC: Student, "The probable error of a mean", Biometrika 6(1):1–25 | primary | 1908 | https://doi.org/10.1093/biomet/6.1.1
SRC: Delacre M., Lakens D. and Leys C., "Why psychologists should by default use Welch's t-test instead of Student's t-test", International Review of Social Psychology 30(1):92–101 | primary | 2017 | https://doi.org/10.5334/irsp.82
Q: When is an independent t-test used? | To compare the means of two independent groups on an interval or ratio DV.
Q: What are the degrees of freedom for an independent t-test with groups of 12 and 15? | 25 (12 + 15 − 2).
M1#psychology-u11-17-q1@1: Who first published the t-test? | W. S. Gosset ("Student") | Ronald Fisher | Karl Pearson | Jacob Cohen | Gosset published it in 1908 under the pen name Student.
NUM2#psychology-u11-17-q2@2: An independent t-test compares groups of 20 and 22 participants. How many degrees of freedom are there? | 40 | 0 | df | df = n₁ + n₂ − 2 = 20 + 22 − 2 = 40.
M2#psychology-u11-17-q3@2: Which test fits comparing anxiety scores of 30 therapy clients with 30 waiting-list controls? | Independent t-test | Paired t-test | Chi-square test | Pearson's r | Two separate groups compared on an interval DV call for an independent t-test.
M3#psychology-u11-17-q4@3: Group A has 10 participants with SD 2; group B has 40 with SD 9. Which test is most appropriate? | Welch's t-test | Student's t-test | Paired t-test | Spearman's rho | Unequal variances and group sizes make Welch's test safer.
SA2#psychology-u11-17-q5@2,3: Report and interpret: caffeine group M = 310 ms (SD = 30), placebo M = 335 ms (SD = 32), t(58) = 3.12, p = .003, d = 0.81. | "Participants who had caffeine responded faster (M = 310 ms, SD = 30) than placebo participants (M = 335 ms, SD = 32), t(58) = 3.12, p = .003, d = 0.81." The difference is significant and large; with random allocation it suggests caffeine speeds responses; check replication and generalisation. | Report format ; Direction ; Significance ; Effect size ; Interpretation
M2#psychology-u11-17-q6@1: When is an independent t-test appropriate? | Comparing two separate groups on interval data | Comparing the same group twice | Testing an association between categories | Comparing more than two groups at once | It compares the means of two independent groups.

## Paired t-tests
LV: Intermediate · Application
S: The paired (related) t-test compares two means from the same participants, or matched pairs, by analysing the differences within each pair. This lesson explains how it works and why it is often more powerful than an independent test.
O: Identify when a paired t-test is appropriate
O: Explain how the paired t-test uses difference scores
O: Compare the power of paired and independent designs
PRE: Independent t-tests
H: Analysing differences
P: When the same people provide both scores (repeated measures) or pairs are matched, the **paired t-test** first calculates a **difference score** for each person, then tests whether the mean difference is zero: t = mean difference ÷ (SD of differences ÷ √n), with n − 1 degrees of freedom.
X: Memory before and after training
> Before: 10, 12, 13, 15. After: 8, 11, 11, 12 (a task where lower is better: errors).
> Differences: 2, 1, 2, 3; mean = 2, SD ≈ 0.82.
> t(3) = 2 ÷ (0.82 ÷ 2) ≈ 4.90, p ≈ .016 two-tailed: errors fell significantly after training.
P: The effect size for paired data is often reported as dz, the mean difference divided by the SD of the differences, which differs from d for independent groups.
K: The paired t-test analyses within-person differences, removing stable individual differences from the error term.
H: Why it is powerful
P: Because each person is compared with themselves, stable differences between people (some just make more errors) don't add noise. When scores are strongly correlated across conditions, a paired design can detect an effect with far fewer participants than an independent design. The trade-off is the risk of order effects, which counterbalancing addresses.
!: Running an independent t-test on paired data. It ignores the pairing, inflates the error term and loses power.
EV: established | Paired designs remove between-person variability from the comparison, increasing power when scores are correlated.
EV: established | Order effects in repeated measures designs must be controlled, usually by counterbalancing.
T: Paired t-test | A test of whether the mean of within-pair difference scores differs from zero
T: Difference score | One participant's score in one condition minus their score in the other
SUM: The paired t-test analyses difference scores from the same or matched participants.
SUM: It is usually more powerful than an independent test but needs control of order effects.
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
SRC: Lakens D., "Calculating and reporting effect sizes to facilitate cumulative science: a practical primer for t-tests and ANOVAs", Frontiers in Psychology 4:863 | primary | 2013 | https://doi.org/10.3389/fpsyg.2013.00863
Q: What does a paired t-test analyse? | The difference scores between two related measurements for each participant or pair.
Q: How many degrees of freedom does a paired t-test with 25 participants have? | 24 (n − 1).
M1#psychology-u11-18-q1@1: A paired t-test is appropriate for… | The same participants tested in two conditions | Two separate groups of different people | Frequencies in categories | The relationship between two variables | Repeated measures or matched pairs need a paired test.
NUM2#psychology-u11-18-q2@2: Difference scores have mean 3, SD 4 and n = 16. Calculate t. | 3 | 0.01 | t | t = 3 ÷ (4 ÷ √16) = 3 ÷ 1 = 3.
M2#psychology-u11-18-q3@2: Why might a paired design detect an effect that an independent design misses with the same total sample? | Individual differences are removed | It always has larger effects | It uses a stricter α | It doesn't need a DV | Comparing people with themselves reduces noise.
M3#psychology-u11-18-q4@3: A researcher runs an independent t-test on before-and-after scores from the same 20 people. What is the consequence? | Lost power, because the pairing is ignored | A guaranteed Type I error | No consequence at all | The degrees of freedom become zero | Ignoring correlated scores inflates the error term.
SA2#psychology-u11-18-q5@2,3: Explain how to analyse a study where 15 people rate their mood before and after a walk, and how to report it. | Compute each person's after-minus-before difference; run a paired t-test, df = 14; report mean difference, SD, t(14), p and an effect size (dz = mean difference ÷ SD of differences). Consider order or expectancy effects and the lack of a control group. | Difference scores ; Paired t-test ; Degrees of freedom ; Report and effect size ; Limitation

## Analysis of variance (ANOVA)
LV: Intermediate · Application
S: ANOVA compares the means of three or more groups at once, avoiding the inflated error rate of many t-tests. This lesson explains the logic of the F ratio, post hoc tests and effect size.
O: Explain why ANOVA is used instead of multiple t-tests
O: Interpret an F ratio, its degrees of freedom and eta squared
O: Explain the role of post hoc tests and factorial designs
PRE: Independent t-tests
H: The logic of ANOVA
P: Running many t-tests inflates the chance of a false positive. **Analysis of variance** tests all group means in one test. It compares **between-groups variance** (how much group means differ) with **within-groups variance** (how much individuals vary inside groups). The ratio is **F**: if groups differ more than chance variation predicts, F is large.
X: A worked one-way ANOVA
> Three groups score 1, 2, 3; 4, 5, 6; and 7, 8, 9 (means 2, 5, 8).
> Between-groups sum of squares = 54; within-groups = 6.
> F(2, 6) = (54 ÷ 2) ÷ (6 ÷ 6) = 27, p ≈ .001; η² = 54 ÷ 60 = .90.
> A significant F says at least one mean differs, not which.
P: Repeated measures ANOVA extends the paired t-test to three or more conditions with the same participants, removing individual differences from the error term.
K: ANOVA compares several means with one F test; a significant F needs post hoc tests to locate the differences, and η² gives the effect size.
H: After a significant F
P: **Post hoc tests** (such as Tukey's HSD) compare pairs of groups while controlling the overall error rate; **planned contrasts** test specific comparisons decided in advance. **Factorial ANOVA** tests two or more IVs at once and their **interaction**: whether the effect of one IV depends on the level of another.
!: Concluding from a significant F that every group differs from every other. F only shows that the means aren't all equal.
EV: established | Multiple t-tests inflate the familywise Type I error rate; ANOVA tests group means together.
EV: established | A significant omnibus F doesn't show which specific means differ.
T: F ratio | Between-groups variance divided by within-groups variance
T: Post hoc test | A test comparing pairs of groups after a significant ANOVA, controlling error rate
T: Interaction | When the effect of one IV depends on the level of another IV
SUM: ANOVA compares three or more means using the F ratio.
SUM: Post hoc tests locate differences; factorial ANOVA tests interactions.
SRC: Fisher R. A., Statistical Methods for Research Workers, Oliver and Boyd | primary | 1925
SRC: Lakens D., "Calculating and reporting effect sizes to facilitate cumulative science: a practical primer for t-tests and ANOVAs", Frontiers in Psychology 4:863 | primary | 2013 | https://doi.org/10.3389/fpsyg.2013.00863
Q: What does the F ratio compare? | Between-groups variance with within-groups variance.
Q: What does a significant interaction mean in factorial ANOVA? | The effect of one IV depends on the level of another IV.
M1#psychology-u11-19-q1@1: Why use ANOVA rather than several t-tests for four groups? | It controls the overall Type I error rate | It always gives larger effects | It needs no assumptions | It works only with two groups | Many t-tests inflate the chance of a false positive.
NUM2#psychology-u11-19-q2@2: In a one-way ANOVA, the between-groups sum of squares is 30 and the total is 120. Calculate eta squared. | 0.25 | 0.001 | proportion | η² = between-groups SS ÷ total SS = 30 ÷ 120 = .25 (25% of variance).
M2#psychology-u11-19-q3@2: A three-group ANOVA gives F(2, 57) = 6.4, p = .003. What is the next step? | Run post hoc tests to find which groups differ | Conclude all three groups differ | Conclude no groups differ | Run a chi-square test | A significant omnibus F needs follow-up comparisons.
M3#psychology-u11-19-q4@3: A drug improves memory in young adults but not older adults. In a factorial design this is… | An interaction between drug and age | A main effect of age only | A Type II error | Multicollinearity | The drug's effect depends on age group, which is the definition of an interaction.
SA2#psychology-u11-19-q5@2,3: Explain how you would analyse a study comparing anxiety across three types of therapy and a waiting list. | One-way between-groups ANOVA with four levels; check assumptions; report F(3, df), p and η²; if significant, Tukey post hoc tests or planned contrasts (each therapy versus waiting list); report means, SDs and confidence intervals. | ANOVA type ; Report F and effect size ; Post hoc or planned contrasts ; Assumptions ; Means and intervals

## Chi-square tests
LV: Intermediate · Application
S: Chi-square tests analyse frequencies in categories: whether observed counts differ from those expected, or whether two categorical variables are associated. This lesson explains the test of independence, expected frequencies and effect size.
O: Identify when a chi-square test is appropriate
O: Calculate expected frequencies for a contingency table
O: Interpret a chi-square result with Cramér's V
PRE: Levels of measurement
H: Counting in categories
P: When both variables are **nominal**, data are frequencies: how many people fall in each category. The **chi-square (χ²) test of independence** asks whether the pattern of counts in a **contingency table** differs from what we'd expect if the variables were unrelated. The **goodness-of-fit** test compares counts in one variable with expected proportions. Pearson introduced the test in 1900.
H: Expected frequencies
P: For each cell, expected = (row total × column total) ÷ grand total. χ² = Σ (observed − expected)² ÷ expected. Degrees of freedom = (rows − 1) × (columns − 1). Expected frequencies should generally be at least 5 per cell.
IX: crosstab
X: Helping and gender of the person in need
> Observed: helped a woman 20 of 30 times, a man 10 of 30 times; did not help: 10 and 20.
> Each expected count = (30 × 30) ÷ 60 = 15.
> χ² = 4 × (5² ÷ 15) ≈ 6.67, df = 1, p ≈ .010; Cramér's V ≈ .33, a moderate association.
P: Reporting the percentages in each row alongside χ² shows the direction and size of the association, which the test statistic alone doesn't.
K: Chi-square tests compare observed and expected frequencies for nominal data; report χ², df, p and Cramér's V.
!: Running chi-square on percentages or means. It must use raw frequencies, and each person must appear in only one cell.
EV: established | The chi-square test requires independent observations and adequate expected frequencies.
EV: contested | The minimum acceptable expected frequency (often 5) is a guideline; Fisher's exact test is used for small counts.
T: Chi-square test | A test comparing observed frequencies with expected frequencies
T: Contingency table | A table of frequencies cross-classified by two categorical variables
T: Cramér's V | An effect size for chi-square, from 0 (no association) to 1
SUM: Chi-square tests analyse frequencies in categories against expected counts.
SUM: Use raw counts, check expected frequencies, and report Cramér's V.
SRC: Pearson K., "On the criterion that a given system of deviations from the probable in the case of a correlated system of variables is such that it can be reasonably supposed to have arisen from random sampling", Philosophical Magazine 50(302):157–175 | primary | 1900 | https://doi.org/10.1080/14786440009463897
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
Q: How is an expected frequency calculated in a contingency table? | (Row total × column total) ÷ grand total.
Q: What are the degrees of freedom for a 3 × 2 chi-square test? | 2, because (3 − 1) × (2 − 1) = 2.
M1#psychology-u11-20-q1@1: Chi-square tests are used for… | Frequency data in categories | Comparing two means | Ranked correlations | Repeated measures scores | Chi-square analyses counts of nominal data.
NUM2#psychology-u11-20-q2@2: A 2 × 2 table has row totals 40 and 60, column totals 50 and 50, and a grand total of 100. What is the expected count for the cell in row 1, column 1? | 20 | 0 | people | (40 × 50) ÷ 100 = 20.
M2#psychology-u11-20-q3@2: Researchers record whether 80 students chose science or arts and whether they attended a state or private school. Which test fits? | Chi-square test | Independent t-test | Pearson's r | Paired t-test | Both variables are categorical, so the data are frequencies suited to chi-square.
M3#psychology-u11-20-q4@3: Why must each participant contribute to only one cell? | The test assumes independent observations | It makes the table smaller | Expected counts must be zero | It increases the degrees of freedom | Counting the same person twice violates independence.
SA2#psychology-u11-20-q5@2,3: Interpret: χ²(1, N = 120) = 9.2, p = .002, Cramér's V = .28, for whether people who volunteer also donate to charity. | There is a significant association between volunteering and donating; V = .28 indicates a small-to-moderate association; this is correlational, so it doesn't show one causes the other; check expected counts and report percentages for each group. | Association ; Significance ; Effect size ; Causation caution ; Descriptive percentages

## Non-parametric tests
LV: Intermediate · Application
S: Non-parametric tests make fewer assumptions about distributions, working with ranks instead of raw scores. This lesson explains the Mann–Whitney, Wilcoxon and related tests and when to use them.
O: Match non-parametric tests to their parametric equivalents
O: Explain when non-parametric tests are appropriate
O: Evaluate the trade-offs between parametric and non-parametric tests
PRE: Independent t-tests
H: Tests on ranks
- **Mann–Whitney U**: two independent groups (equivalent to the independent t-test).
- **Wilcoxon signed-rank**: two related conditions (equivalent to the paired t-test).
- **Kruskal–Wallis**: three or more independent groups (equivalent to one-way ANOVA).
- **Friedman**: three or more related conditions (equivalent to repeated measures ANOVA).
- **Spearman's rho**: correlation (equivalent to Pearson's r).
P: These tests replace scores with **ranks**, so they suit ordinal data and data with outliers or heavy skew, and don't assume normality.
X: Choosing a test for pain ratings
> Pain is rated 0–10 by two independent groups after different treatments; the ratings are ordinal and skewed.
> Mann–Whitney U compares the groups' rank distributions.
> Report U, z or exact p, the medians and an effect size such as r = z ÷ √N.
K: Non-parametric tests use ranks and suit ordinal, skewed or outlier-prone data; each has a parametric equivalent.
H: Trade-offs
P: When parametric assumptions hold, parametric tests are a little more powerful. When they don't, non-parametric tests can be more powerful and more robust. With large samples, the t-test is often robust to non-normality, so the choice depends on the level of measurement, sample size and outliers more than on normality alone.
!: Thinking non-parametric tests compare medians exactly. Mann–Whitney tests whether values in one group tend to be larger, which only equals a median comparison under extra assumptions.
EV: established | Rank-based tests are less affected by outliers than tests on raw scores.
EV: contested | Whether to switch to non-parametric tests based on normality tests is debated; many statisticians advise against it.
T: Non-parametric test | A test that makes few assumptions about the population distribution, often using ranks
T: Mann–Whitney U | A non-parametric test comparing two independent groups
T: Wilcoxon signed-rank test | A non-parametric test comparing two related conditions
SUM: Non-parametric tests use ranks and match parametric tests one to one.
SUM: Use them for ordinal, skewed or outlier-prone data; parametric tests are slightly more powerful when assumptions hold.
SRC: Mann H. B. and Whitney D. R., "On a test of whether one of two random variables is stochastically larger than the other", Annals of Mathematical Statistics 18(1):50–60 | primary | 1947 | https://doi.org/10.1214/aoms/1177730491
SRC: Wilcoxon F., "Individual comparisons by ranking methods", Biometrics Bulletin 1(6):80–83 | primary | 1945 | https://doi.org/10.2307/3001968
Q: What is the non-parametric equivalent of the paired t-test? | The Wilcoxon signed-rank test.
Q: Why do non-parametric tests suit data with outliers? | They use ranks, so extreme values don't have disproportionate influence.
M1#psychology-u11-21-q1@1: The non-parametric equivalent of one-way independent ANOVA is… | Kruskal–Wallis | Friedman | Wilcoxon | Mann–Whitney | Kruskal–Wallis compares three or more independent groups on ranks.
M2#psychology-u11-21-q2@2: Twelve patients rate fatigue (1–7) before and after treatment. Which test fits best? | Wilcoxon signed-rank | Mann–Whitney U | Independent t-test | Chi-square | Related ordinal ratings suit the Wilcoxon test.
MATCH2#psychology-u11-21-q3@1,2: Match each parametric test to its non-parametric equivalent. | Independent t-test = Mann–Whitney U ; Paired t-test = Wilcoxon signed-rank ; One-way ANOVA = Kruskal–Wallis ; Pearson's r = Spearman's rho | Each non-parametric test answers a similar question using ranks.
M3#psychology-u11-21-q4@3: With 200 participants per group and mildly skewed data, why might a t-test still be acceptable? | The sampling distribution of the mean is close to normal | Non-parametric tests can't handle large samples | Skew disappears with large samples | Ranks can't be calculated for 200 people | The central limit theorem makes the t-test robust with large samples.
SA2#psychology-u11-21-q5@2,3: Explain how you would choose between a t-test and a Mann–Whitney test for two groups' reaction times. | Consider level of measurement (ratio, so either possible), distribution (reaction times are positively skewed with outliers), sample size (large samples make the t-test robust). With small samples or strong skew and outliers, Mann–Whitney; otherwise Welch's t-test, perhaps on log-transformed data. Decide in advance and report both if unsure. | Measurement level ; Skew and outliers ; Sample size ; Justified choice ; Decide in advance

## Meta-analysis
LV: Advanced · Evaluation
S: Meta-analysis statistically combines the results of many studies to estimate an overall effect and explain variation between studies. This lesson explains how meta-analyses are done and their strengths and limits.
O: Describe the steps of a systematic review and meta-analysis
O: Interpret a forest plot and measures of heterogeneity
O: Evaluate meta-analysis, including publication bias and study quality
PRE: Effect sizes
H: Combining studies
P: Glass (1976) coined "meta-analysis" for the statistical analysis of a collection of studies. Smith and Glass (1977) combined 375 studies of psychotherapy and estimated an average effect of about two-thirds of a standard deviation over untreated controls. A meta-analysis follows a **systematic review**: a pre-specified search, explicit inclusion criteria, data extraction and quality assessment, often reported using the PRISMA guidelines.
H: The analysis
P: Each study's effect size is weighted by its precision (larger, more precise studies count more), and the weighted average is calculated. A **forest plot** shows each study's effect and confidence interval, plus the pooled estimate. **Heterogeneity** (e.g. the I² statistic) shows how much effects vary beyond chance; **moderator analyses** ask why.
X: Reading a forest plot
> Twelve studies of an intervention: most show small positive effects, two show none.
> The pooled effect is d = 0.3, 95% CI 0.2 to 0.4; I² = 60% indicates substantial heterogeneity.
> Moderator analysis finds larger effects in studies with lower quality ratings, a warning sign.
K: Meta-analysis pools effect sizes from many studies to estimate an overall effect and explore why results differ.
H: Limitations
P: "Garbage in, garbage out": pooling biased studies gives a precise biased answer. **Publication bias** can inflate pooled effects; funnel plots and other tests help detect it but can't fully correct it. Combining very different studies ("apples and oranges") can obscure important differences.
!: Treating a meta-analysis as automatically definitive. Its conclusions are only as good as the studies and methods it includes.
EV: established | Smith and Glass (1977) found an average psychotherapy effect of roughly two-thirds of a standard deviation.
EV: contested | How much meta-analytic estimates in psychology are inflated by publication bias is debated.
T: Meta-analysis | The statistical combination of results from many studies to estimate an overall effect
T: Forest plot | A graph showing each study's effect size and confidence interval, and the pooled estimate
T: Heterogeneity | Variation in effect sizes between studies beyond what chance would produce
SUM: Meta-analysis pools weighted effect sizes from a systematic review.
SUM: Forest plots, heterogeneity and moderators aid interpretation; bias and study quality limit conclusions.
SRC: Smith M. L. and Glass G. V., "Meta-analysis of psychotherapy outcome studies", American Psychologist 32(9):752–760 | primary | 1977 | https://doi.org/10.1037/0003-066X.32.9.752
SRC: Page M. J. et al., "The PRISMA 2020 statement: an updated guideline for reporting systematic reviews", BMJ 372:n71 | guidance | 2021 | https://doi.org/10.1136/bmj.n71
Q: What is a forest plot? | A graph showing each study's effect size with its confidence interval, plus the pooled estimate.
Q: What does heterogeneity mean in meta-analysis? | Variation in effect sizes between studies beyond what chance would produce.
M1#psychology-u11-22-q1@1: Who coined the term "meta-analysis"? | Gene Glass | Jacob Cohen | Karl Pearson | John Ioannidis | Gene Glass introduced the term in 1976 in Educational Researcher.
M2#psychology-u11-22-q2@2: A meta-analysis gives larger studies more weight. Why? | Their estimates are more precise | They are always better designed | They were published earlier | They have larger effects | Weighting by precision gives more influence to less noisy estimates.
TF2#psychology-u11-22-q3@3: Combining many biased studies in a meta-analysis removes their bias. | false | Pooling biased studies produces a precise but still biased estimate.
M3#psychology-u11-22-q4@3: A funnel plot is asymmetrical, with small studies showing only large positive effects. What does this suggest? | Possible publication bias | Perfect consistency between studies | That small studies are more accurate | No heterogeneity | Missing small null studies suggest selective publication.
SA3#psychology-u11-22-q5@3: Evaluate meta-analysis as a way to answer research questions in psychology. | Strengths: pools evidence, greater precision, explores heterogeneity and moderators, systematic and transparent (PRISMA). Limitations: publication bias, garbage in garbage out, apples and oranges, depends on reporting quality; funnel plots only partly help. Pre-registered meta-analyses and including unpublished studies improve them. | Strengths ; Heterogeneity or moderators ; Publication bias ; Study quality ; Improvements

## Reproducible analysis
LV: Intermediate · Application
S: A reproducible analysis can be rerun by someone else, from the raw data to the final numbers, and give the same result. This lesson explains the practices that make analyses reproducible and why they matter.
O: Define reproducibility and distinguish it from replication
O: Describe practices that make an analysis reproducible
O: Evaluate the benefits and costs of reproducible workflows
PRE: Open science
H: Reproducible versus replicable
P: **Reproducibility** means getting the same results from the same data and analysis. **Replicability** means getting consistent results from new data. Reproducibility is the minimum standard: if an analysis can't be reproduced, its results can't be checked.
H: Practices
- **Script the analysis** in code (R, Python) or saved syntax rather than point-and-click steps.
- **Never edit raw data**: keep it untouched and record every cleaning step in code.
- **Version control** (such as Git) records every change.
- **Document** variables, exclusions and decisions.
- **Share** data (where ethical), code and software versions.
X: A reproducible workflow
> Raw survey data are saved read-only.
> A script cleans the data (removing failed attention checks as preregistered), computes scale scores and runs the planned t-test.
> The script, a codebook and the anonymised data are shared; another researcher reruns it and gets identical results.
K: Reproducible analysis scripts every step from raw data to results, so others can check and build on the work.
H: Benefits and costs
P: Benefits: errors are easier to find and fix, analyses can be updated quickly, and others can verify and reuse the work. Costs: learning to code and documenting take time, and incentives don't always reward it. Studies that tried to reproduce published results from shared data have found many could not be reproduced exactly, often because of undocumented steps.
!: Relying on memory of which menu options were clicked. Unscripted analyses are hard even for the original researcher to reproduce.
EV: established | Scripted analyses and shared code make results easier to check and reproduce.
EV: contested | How to reward and resource reproducible practices in research careers is debated.
T: Reproducibility | Obtaining the same results from the same data and analysis
T: Version control | Software that records every change to files, such as Git
SUM: Reproducibility means the same data and code give the same results.
SUM: Scripting, documenting, version control and sharing make analyses reproducible.
SRC: Peng R. D., "Reproducible research in computational science", Science 334(6060):1226–1227 | primary | 2011 | https://doi.org/10.1126/science.1213847
SRC: Sandve G. K. et al., "Ten simple rules for reproducible computational research", PLoS Computational Biology 9(10):e1003285 | primary | 2013 | https://doi.org/10.1371/journal.pcbi.1003285
Q: What is the difference between reproducibility and replicability? | Reproducibility: same data and analysis give the same results; replicability: new data give consistent results.
Q: Why should raw data never be edited directly? | So every change is recorded in code and the analysis can be traced and rerun.
M1#psychology-u11-23-q1@1: Which practice most directly supports reproducibility? | Scripting the analysis in code | Using a bigger sample | Choosing a one-tailed test | Increasing α | A script records every step so the analysis can be rerun.
M2#psychology-u11-23-q2@2: A researcher deletes outliers by hand in a spreadsheet and saves over the original file. What is the main problem? | The deletions can't be traced or reproduced | The sample becomes too large | The p-value becomes invalid automatically | The study can't be published | Unrecorded edits to raw data make results impossible to check.
TF2#psychology-u11-23-q3@1: Version control software records every change made to analysis files. | true | Tools such as Git keep a full history of changes.
M3#psychology-u11-23-q4@3: Why might a published result fail to reproduce from the authors' own shared data? | Undocumented cleaning or analysis steps | The data were too reliable | The sample was too large | The study was preregistered | Hidden steps between raw data and results are a common cause.
SA2#psychology-u11-23-q5@2,3: Describe a reproducible workflow for analysing a questionnaire study. | Keep raw data read-only; write a script for cleaning (preregistered exclusions), scoring, analysis and figures; use version control; write a codebook; record software versions; share anonymised data and code with the paper; check by rerunning from scratch. | Raw data preserved ; Scripted steps ; Version control ; Documentation ; Sharing and rerunning

## Statistical software
LV: Introductory · Application
S: Psychologists analyse data with software ranging from point-and-click programs to programming languages. This lesson compares the main options and the skills each requires.
O: Describe the main types of statistical software used in psychology
O: Compare point-and-click and code-based software
O: Choose appropriate software for a given research task
PRE: Reproducible analysis
H: The main options
- **SPSS**: long the standard in psychology teaching; menus and syntax; commercial licence.
- **R**: a free, open-source programming language with thousands of packages, widely used in research.
- **Python**: a general programming language with strong data science libraries.
- **JASP** and **jamovi**: free, menu-driven programs built on R, offering both classical and Bayesian analyses.
- **Spreadsheets**: useful for simple tasks and data entry, but error-prone for analysis.
H: Menus versus code
P: Point-and-click software is quick to learn but harder to reproduce unless the syntax is saved. Code-based tools take longer to learn but make every step explicit, repeatable and shareable, and offer more flexibility for graphics and advanced models. Many departments now teach R or use jamovi and JASP as bridges.
X: Choosing software for a project
> A first-year student running a single t-test: jamovi or JASP is quick and free.
> A dissertation with data cleaning, many models and figures: R or Python scripts make the work reproducible.
> A clinic analysing routine outcome data: whatever the team can maintain, with saved syntax or scripts.
P: Whatever the software, analysis plans should be decided before looking at results, and output checked against the data with simple descriptive statistics and graphs.
K: Software choice trades ease of learning against reproducibility and flexibility; code-based tools make analyses transparent and repeatable.
!: Assuming software output is always correct. Analyses are only as good as the data and the choices made; software also has defaults that may not suit the design.
EV: established | Free, open-source tools such as R are widely used in psychological research.
EV: contested | Which software is best for teaching psychology students is debated.
T: Syntax | The written commands behind a menu-based analysis, which can be saved and rerun
T: Open-source software | Software whose code is freely available to use and modify, such as R
SUM: SPSS, R, Python, JASP and jamovi are common tools.
SUM: Code-based tools favour reproducibility; menu tools favour ease of learning.
SRC: R Core Team, R: A Language and Environment for Statistical Computing, R Foundation for Statistical Computing | primary | 2026-11 | https://www.r-project.org/
SRC: JASP Team, JASP (software) | primary | 2026-11 | https://jasp-stats.org/
Q: Name two free statistical programs used in psychology. | Any two of R, Python, JASP, jamovi.
Q: Why save syntax when using menu-based software? | So the analysis can be rerun and checked later.
M1#psychology-u11-24-q1@1: Which is a free, open-source programming language for statistics? | R | SPSS | Excel | PowerPoint | R is a free, open-source language with thousands of statistical packages.
M2#psychology-u11-24-q2@2: A researcher needs to rerun the same 40-step analysis on updated data every month. Which approach suits best? | A script in R or Python | Clicking through menus each time | Calculating by hand | Copying numbers into a slide deck | Scripts automate and document repeated analyses.
TF2#psychology-u11-24-q3@3: Statistical software always chooses the right test and settings automatically. | false | Researchers must choose analyses and check defaults suit the design.
M3#psychology-u11-24-q4@3: What is the main advantage of code-based analysis for science? | Every step is explicit, repeatable and shareable | It always gives smaller p-values | It needs no statistical knowledge | It removes the need for data | Transparency and reproducibility are the key benefits.
SA2#psychology-u11-24-q5@2,3: Compare SPSS and R for a psychology student's dissertation. | SPSS: menu-driven, familiar, quick for standard tests, syntax can be saved, licence needed, less flexible graphics. R: free, scripts make analysis reproducible and flexible, huge package ecosystem, steeper learning curve. Choice depends on skills, support and need for reproducibility. | SPSS strengths ; SPSS limits ; R strengths ; R limits ; Justified choice

## Interpreting and reporting results
LV: Intermediate · Evaluation
S: Results must be reported fully and interpreted carefully: what was found, how large and how certain, and what it does and doesn't show. This lesson covers APA-style reporting and the most common interpretation errors.
O: Report statistical results in APA style
O: Interpret results in terms of effect size, uncertainty and design
O: Evaluate conclusions for over-interpretation
PRE: Effect sizes
H: Reporting
P: APA style (7th edition) reports descriptive statistics (M, SD), the test statistic with degrees of freedom, the exact p-value (to two or three decimals, or p < .001), an effect size and, ideally, a confidence interval. For example: "Participants who slept recalled more words (M = 14.2, SD = 3.1) than those who stayed awake (M = 11.8, SD = 3.4), t(58) = 2.86, p = .006, d = 0.74, 95% CI for the difference [0.7, 4.1]."
H: Interpreting
- **Size**: is the effect large enough to matter?
- **Uncertainty**: how wide is the interval?
- **Design**: does the design support causal claims?
- **Generality**: who were the participants, and how far might results extend?
- **Consistency**: does it fit or contradict previous evidence?
X: Over-interpreting a correlation
> A survey finds r = .20 between daily gratitude journalling and wellbeing, p = .01.
> Headline: "Gratitude makes you happier."
> Better: "People who journal gratitude report slightly higher wellbeing; the association is small and doesn't show causation. Randomised trials are needed."
K: Good reporting gives descriptives, test statistics, exact p, effect sizes and intervals; good interpretation matches claims to the design and evidence.
H: Common errors
P: Treating non-significance as proof of no effect; ignoring effect size; inferring causation from correlation; generalising beyond the sample; and selectively reporting significant outcomes. Reporting all planned analyses, including null results, helps the field build an accurate picture.
!: Writing "the results prove…". Data support or fail to support hypotheses; they don't prove them.
EV: established | APA style asks for effect sizes and exact p-values alongside test statistics.
EV: contested | How much to emphasise p-values versus estimation and Bayesian evidence in reporting is debated.
T: APA style | The American Psychological Association's standard format for reporting research
T: Over-interpretation | Drawing conclusions stronger than the design and data support
SUM: Report descriptives, test statistics, exact p, effect sizes and confidence intervals.
SUM: Interpret size, uncertainty, design and generality; avoid causal and universal over-claims.
SRC: American Psychological Association, Publication Manual of the American Psychological Association, 7th edition | standard | 2020 | https://apastyle.apa.org/
SRC: Cumming G., "The new statistics: why and how", Psychological Science 25(1):7–29 | primary | 2014 | https://doi.org/10.1177/0956797613504966
Q: What should a full APA-style report of a t-test include? | Means and SDs, t with degrees of freedom, the exact p-value, an effect size and ideally a confidence interval.
Q: Why should null results be reported? | Omitting them distorts the literature and overstates effects.
M1#psychology-u11-25-q1@1: Which is a correctly formatted APA result? | t(28) = 2.45, p = .021, d = 0.89 | t = 2.45 (significant) | p < 0.05!!! | The t-test worked | APA style gives the statistic, df, exact p and an effect size.
M2#psychology-u11-25-q2@2: A study finds no significant difference between two teaching methods, p = .30, with 15 per group. Which conclusion is best? | The evidence is inconclusive given the small sample | The methods are equally effective | Method A is better | The study proves teaching doesn't matter | Low power means the result can't establish equivalence.
TF2#psychology-u11-25-q3@3: A statistically significant result from a correlational survey can show that one variable causes the other. | false | Significance concerns chance, not causal direction or third variables.
M3#psychology-u11-25-q4@3: A headline says "Video games cause aggression" based on r = .08 in a large survey. What is the strongest correction? | It is tiny and only correlational | The result is not statistically significant | Video games reduce aggression | The sample is too large to trust | Small effect size and a correlational design both limit the claim.
SA3#psychology-u11-25-q5@3: Rewrite this conclusion appropriately: "Our study of 40 students proves that mindfulness reduces exam stress in everyone." | "In this sample of 40 students, those randomly allocated to mindfulness reported lower exam stress (report M, SD, t, p, d, CI). The effect was moderate, but the sample was small and drawn from one university, so replication in larger, more diverse samples is needed before generalising." | Removes "proves" ; Reports statistics ; Effect size and uncertainty ; Sample limitations ; Need for replication
`;
