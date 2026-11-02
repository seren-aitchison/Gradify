// School 18: Social Statistics and Data Science. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md),
// with evidence status (EV:) and questions at three levels in every lesson. Real figures come from the World Bank data in
// kit/labs/sociology/data/ (retrieved 2026-11-01), with their year; other worked examples use small invented data sets.
// Calculations match kit/labs/social/stats.js. Sources are pending human verification (qa.js).
export default `
## Types of social data
LV: Introductory · Foundation
S: Social data come in different forms: categorical or numerical, individual or aggregate, survey or administrative, structured or unstructured. This lesson classifies social data and explains why the type of data shapes the analysis.
O: Distinguish categorical (nominal, ordinal) and numerical (interval, ratio) variables
O: Classify data as individual-level or aggregate, and as survey, administrative or digital
O: Explain how the type of data constrains appropriate analysis
PRE: Quantitative research
H: Levels of measurement
- **Nominal**: categories without order (ethnicity, religion, region, tenure).
- **Ordinal**: ordered categories (social class schemes, educational level, agree–disagree scales).
- **Interval and ratio**: numerical scales with equal intervals (income, age, hours worked; ratio scales have a true zero).
P: Much sociological data is categorical. Social class, ethnicity and religion are measured as categories, so analyses often use percentages, crosstabulations and chi-square tests rather than means.
H: Sources and units
P: **Individual-level** data describe people (a survey respondent's income); **aggregate** data describe groups or places (a country's Gini coefficient or a local authority's unemployment rate). Data may come from **surveys**, **administrative records** (tax, benefits, schools), the **census**, or **digital traces** (social media, transactions). Each has different strengths and biases.
X: Classifying variables in a survey of young adults
> Employment status (employed, unemployed, student, inactive): nominal.
> Highest qualification (none, GCSE, A level, degree): ordinal.
> Weekly hours worked: ratio.
> Local area unemployment rate attached to each respondent: aggregate data linked to individuals.
K: The type of data, its level of measurement and whether it describes individuals or groups determine which statistics and conclusions are appropriate.
P: Mixing levels can mislead: an area-level unemployment rate attached to a respondent describes their neighbourhood, not whether they are unemployed.
!: Treating class categories as numbers and averaging them. Ordinal and nominal categories aren't quantities.
EV: established | Many key sociological variables, such as class, ethnicity and religion, are categorical.
EV: contested | Whether ordinal scales such as summed attitude items can be treated as interval data is debated.
T: Aggregate data | Data describing groups or places rather than individuals
T: Administrative data | Data collected by organisations in the course of their work, such as tax or school records
SUM: Social data can be nominal, ordinal, interval or ratio, individual or aggregate.
SUM: Survey, administrative, census and digital data have different strengths and biases.
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
SRC: Office for National Statistics, The National Statistics Socio-economic Classification (NS-SEC) | standard | 2026-11 | https://www.ons.gov.uk/methodology/classificationsandstandards/otherclassifications/thenationalstatisticssocioeconomicclassificationnssecrebasedonsoc2010
Q: What is aggregate data? | Data describing groups or places, such as a country's unemployment rate, rather than individuals.
Q: Give an example of administrative data. | Tax records, benefit records, school census data or hospital records.
M1#sociology-u18-01-q1@1: Housing tenure (owner, private renter, social renter) is… | Nominal | Ordinal | Interval | Ratio | The tenure categories have no inherent order, so the variable is nominal.
M2#sociology-u18-01-q2@2: A researcher attaches each respondent's local area poverty rate to their survey record. What kind of variable is the poverty rate? | Aggregate data | Individual-level data | Nominal data | Digital trace data | It describes the area, not the individual.
MATCH1#sociology-u18-01-q3@1: Match each variable to its level of measurement. | Region of residence = Nominal ; Highest qualification = Ordinal ; Temperature in Celsius = Interval ; Annual income = Ratio | NOIR orders levels by the information they carry.
M3#sociology-u18-01-q4@3: Why shouldn't social class categories be averaged? | They are categorical, not quantities | Class has no effect on outcomes | Averages are always misleading | Class can only be measured by income | Class categories classify positions; averaging them treats labels as numbers.
SA2#sociology-u18-01-q5@2,3: Classify four variables from a study of housing and health by type and source, and say how each would be summarised. | Tenure (nominal, survey): percentages. Self-rated health (ordinal, survey): percentages or median. Household income (ratio, survey or tax records): median and IQR. Local deprivation index (aggregate, administrative): mean or deciles across areas. | Four variables ; Correct levels ; Sources ; Appropriate summaries

## Central tendency
LV: Introductory · Foundation
S: Measures of central tendency summarise typical values. In social data, especially income and wealth, the choice between mean and median changes the story. This lesson explains the three averages with social examples.
O: Calculate the mean, median and mode
O: Explain why the median is usually preferred for income and wealth
O: Choose an appropriate average for different social variables
PRE: Types of social data
H: Three averages
- **Mean**: the sum divided by the number of cases; uses every value but is pulled by extremes.
- **Median**: the middle value of ordered data; unaffected by extremes.
- **Mode**: the most common value or category; the only average for nominal data.
H: Income and wealth
P: Income and especially wealth distributions are **positively skewed**: most people have modest amounts and a few have very large amounts. The mean is pulled upwards by top incomes, so it lies above what a typical household has. Official statistics on household income therefore usually report the **median**, and the UK's relative poverty line is set at 60% of median income.
IX: stats-describe
X: Mean versus median in a small town
> Nine households earn £20k, £22k, £24k, £25k, £27k, £30k, £32k, £35k and £400k.
> Mean = £615k ÷ 9 ≈ £68,300. Median = £27,000 (the fifth value).
> Only one household earns more than the mean; the median describes the typical household far better.
K: The mean uses all values but is distorted by extremes; the median is the standard typical value for skewed social data such as income.
P: For nominal variables such as religion or tenure, the mode (most common category) is the only meaningful average.
!: Reporting "average income" without saying whether it is the mean or the median. The two can differ greatly.
EV: established | Income distributions are positively skewed, so mean income exceeds median income.
EV: established | UK poverty statistics define relative low income as below 60% of median household income.
T: Median | The middle value when data are ordered
T: Positive skew | A distribution with a long tail of high values, pulling the mean above the median
SUM: Mean, median and mode summarise typical values differently.
SUM: Use the median for skewed social data such as income; the mode for nominal categories.
SRC: Department for Work and Pensions, Households Below Average Income statistics | data | 2026-11 | https://www.gov.uk/government/collections/households-below-average-income-hbai--2
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
Q: Why is median income usually reported rather than mean income? | Income is positively skewed, so the mean is pulled up by high incomes and doesn't represent a typical household.
Q: Which average is used for nominal data such as religion? | The mode.
M1#sociology-u18-02-q1@1: In a positively skewed distribution, the mean is usually… | Higher than the median | Lower than the median | Equal to the median | Always zero | The long right tail pulls the mean upwards.
NUM2#sociology-u18-02-q2@2: Find the median of these weekly incomes in pounds: 300, 350, 400, 420, 2,000. | 400 | 0 | pounds | Ordered values: the third of five is 400.
M2#sociology-u18-02-q3@2: A news story says "the average worker earns £45,000", using the mean. What is the main problem? | High earners inflate the mean above typical pay | The mean ignores all high earners | Pay data are nominal | Means can't be calculated for pay | Skewed pay makes the mean unrepresentative of a typical worker.
M3#sociology-u18-02-q4@3: Why is the UK relative poverty line based on the median rather than the mean? | The median isn't pulled up by very high incomes | The mean is impossible to calculate | Median incomes never change | The mean is only for nominal data | Using the mean would raise the line whenever top incomes rose, even if typical incomes didn't.
SA2#sociology-u18-02-q5@1,2: For the incomes £18k, £20k, £22k, £24k, £26k, £150k, calculate the mean and median and say which better represents a typical income. | Mean = £260k ÷ 6 ≈ £43,300; median = (£22k + £24k) ÷ 2 = £23,000. The median is far more representative because one high income pulls the mean above five of the six values. | Mean ; Median ; Comparison ; Explanation of skew

## Dispersion
LV: Intermediate · Application
S: Dispersion describes how spread out values are. In sociology, spread is often the point: inequality is about how unevenly income, wealth or opportunities are distributed. This lesson covers range, quantiles, interquartile range, standard deviation and ratio measures of inequality.
O: Calculate and interpret the range, interquartile range and standard deviation
O: Explain percentile ratios such as the 90/10 ratio
O: Interpret dispersion as a measure of inequality
PRE: Central tendency
H: Measures of spread
- **Range**: maximum minus minimum; sensitive to extremes.
- **Quartiles and percentiles**: the values below which 25%, 50% or 90% of cases fall.
- **Interquartile range (IQR)**: Q3 − Q1, the spread of the middle half; robust to extremes.
- **Standard deviation**: the typical distance from the mean; best for roughly symmetrical data.
H: Ratio measures of inequality
P: Inequality researchers often compare points in a distribution. The **90/10 ratio** divides the income at the 90th percentile by the income at the 10th. The **20/20 ratio** compares the income share of the richest fifth with the poorest fifth. World Bank data show the richest fifth received about 40% of income in the UK in 2021 and the poorest fifth about 7.6%, a ratio of about 5.3.
IX: lorenz
X: Calculating an income share ratio
> South Africa, 2022 (World Bank): richest fifth's share 59.5%, poorest fifth's share 3.7%.
> Ratio = 59.5 ÷ 3.7 ≈ 16.
> Sweden, 2023: 37.2 ÷ 7.9 ≈ 4.7. The comparison shows very different degrees of inequality.
K: Measures of dispersion describe spread; ratio measures such as the 90/10 or 20/20 ratio describe inequality between parts of a distribution.
P: Different measures emphasise different parts of the distribution: the 90/10 ratio ignores the very top, while the share of the top 1% focuses on it. Using several gives a fuller picture.
!: Using the standard deviation alone to describe highly skewed income. Percentile-based measures are more informative.
EV: established | The richest fifth received about 40% and the poorest fifth about 7.6% of income in the UK in 2021 (World Bank).
EV: contested | Which inequality measure best captures what matters (the top, the bottom or the whole distribution) is debated.
T: Interquartile range | The spread of the middle 50% of values (Q3 − Q1)
T: 90/10 ratio | The value at the 90th percentile divided by the value at the 10th percentile
T: Quintile share | The share of total income received by a fifth of the population
SUM: Range, IQR and SD describe spread; IQR and percentiles suit skewed data.
SUM: Ratio measures such as the 90/10 and quintile share ratios describe inequality.
SRC: World Bank, World Development Indicators: income share held by highest and lowest 20% (SI.DST.05TH.20, SI.DST.FRST.20) | data | 2026-11-01 | https://data.worldbank.org/indicator/SI.DST.FRST.20
SRC: OECD, Income inequality indicators (oecd.org) | data | 2026-11
Q: What is the 90/10 ratio? | The income at the 90th percentile divided by the income at the 10th percentile.
Q: Why is the IQR preferred to the range for income data? | It covers the middle half of the data, so a few very high incomes don't distort it.
M1#sociology-u18-03-q1@1: The spread of the middle 50% of values is the… | The IQR | Range | Mean | Mode | The interquartile range is Q3 − Q1, the spread of the middle half of the data.
NUM2#sociology-u18-03-q2@2: In one country the richest fifth receives 48% of income and the poorest fifth 6%. What is the 20/20 ratio? | 8 | 0 | times | The 20/20 ratio is 48 ÷ 6 = 8: the top fifth gets eight times the bottom fifth's share.
M2#sociology-u18-03-q3@2: Two countries have the same median income, but one has a much larger 90/10 ratio. What does this show? | Greater income inequality in that country | Higher average incomes there | Fewer people in poverty there | Identical distributions | A larger ratio means a bigger gap between high and low incomes.
M3#sociology-u18-03-q4@3: Why might researchers report both the 90/10 ratio and the top 1% share? | They capture different parts of the distribution | They always give the same result | The 90/10 ratio includes the top 1% only | The top 1% share ignores the rich | The 90/10 ignores the very top; the top 1% share focuses on it.
SA2#sociology-u18-03-q5@2,3: Using World Bank data, compare income inequality in the UK (2021: top fifth 40%, bottom fifth 7.6%) and South Africa (2022: top fifth 59.5%, bottom fifth 3.7%). | UK ratio ≈ 40 ÷ 7.6 ≈ 5.3; South Africa ≈ 59.5 ÷ 3.7 ≈ 16. South Africa's richest fifth receives about 16 times the share of the poorest fifth, three times the UK's ratio, showing far greater inequality. Survey and measurement differences mean comparisons should be cautious. | UK ratio ; South Africa ratio ; Comparison ; Interpretation ; Caution

## Frequency distributions
LV: Introductory · Foundation
S: A frequency distribution shows how many cases fall into each category or range. This lesson explains frequency tables, percentages, cumulative percentages and grouped data, the building blocks of describing social data.
O: Construct a frequency table with percentages and cumulative percentages
O: Explain how to group continuous data into classes
O: Interpret frequency distributions of social variables
PRE: Types of social data
H: Frequency tables
P: A **frequency table** lists the categories of a variable, the **frequency** (count) in each, the **percentage** of the total and, for ordered variables, the **cumulative percentage**. Percentages make groups of different sizes comparable; valid percentages exclude missing responses.
X: Highest qualification in a sample of 200
> No qualifications: 20 (10%). GCSE or equivalent: 60 (30%). A level or equivalent: 50 (25%). Degree or above: 70 (35%).
> Cumulative: 10%, 40%, 65%, 100%.
> So 40% have GCSE-level qualifications or below, and 65% have no degree.
H: Grouping continuous data
P: Continuous variables such as income or age are grouped into **class intervals** (for example age bands 16–24, 25–34). Intervals should be mutually exclusive, cover all values and usually be equal in width; very unequal bands can mislead. Population pyramids, for example, use five-year age bands.
IX: pyramids
K: Frequency distributions summarise how cases are spread across categories, using counts, percentages and cumulative percentages.
P: Reporting the number of missing cases matters: if many people didn't answer an income question, the distribution of those who did may be biased.
!: Comparing raw counts between groups of different sizes. Use percentages.
EV: established | Percentages allow comparison between groups of different sizes.
EV: established | How continuous data are grouped can change the visual impression of a distribution.
T: Frequency distribution | A table or graph showing how many cases fall into each category or range
T: Cumulative percentage | The percentage of cases at or below a given category
T: Class interval | A range of values used to group continuous data
SUM: Frequency tables give counts, percentages and cumulative percentages.
SUM: Grouping continuous data into sensible intervals and reporting missing data aid interpretation.
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
SRC: World Bank, World Development Indicators: population ages by five-year band (SP.POP.*.5Y) | data | 2026-11-01 | https://data.worldbank.org/indicator/SP.POP.0004.FE.5Y
Q: What is a cumulative percentage? | The percentage of cases at or below a given category.
Q: Why use percentages rather than counts to compare groups? | Groups may differ in size, so percentages make them comparable.
M1#sociology-u18-04-q1@1: A table showing how many people fall into each age band is a… | Frequency distribution | Regression equation | Correlation matrix | Sampling frame | A frequency distribution counts how many cases fall in each category or band.
NUM2#sociology-u18-04-q2@2: In a sample of 250, 75 people rent privately. What percentage is this? | 30 | 0 | % | 75 ÷ 250 × 100 = 30%.
M2#sociology-u18-04-q3@2: In a survey, 40% of respondents didn't answer the income question. What is the main concern? | Those who answered may not be representative | The percentages will add to more than 100 | Income can't be grouped | Cumulative percentages are impossible | Item non-response can bias the distribution.
M3#sociology-u18-04-q4@3: Why might unequal class intervals mislead in a histogram? | Wide bands look fuller | Equal bands are illegal | Unequal bands remove all data | They change the mean | Bar areas must reflect frequencies; unequal widths distort impressions.
SA2#sociology-u18-04-q5@1,2: Construct a frequency table with percentages and cumulative percentages for 100 people: 15 aged 16–24, 30 aged 25–44, 35 aged 45–64, 20 aged 65+. | Percentages: 15%, 30%, 35%, 20%. Cumulative: 15%, 45%, 80%, 100%. So 45% are under 45, and 80% are under 65. | Percentages ; Cumulative percentages ; Correct ordering ; Interpretation

## Visualising social data
LV: Introductory · Application
S: Good charts make social patterns visible and honest. This lesson explains which chart suits which social data, how to show change over time and comparison between groups, and how charts can mislead.
O: Choose appropriate charts for categorical, numerical and time-series social data
O: Interpret population pyramids, line charts and scatterplots of social indicators
O: Identify misleading features in social data visualisations
PRE: Frequency distributions
H: Matching charts to data
- **Bar charts** compare categories (percentage in each tenure type by region).
- **Histograms** show distributions of continuous variables (household income).
- **Line charts** show change over time (unemployment rate by year).
- **Scatterplots** show relationships between two numerical variables (GDP per head and life expectancy across countries).
- **Population pyramids** show age and sex structure.
- **Maps** show geographical patterns (deprivation by area).
IX: data-inequality
X: Reading a population pyramid
> Nigeria, 2023 (World Bank): a wide base, with about 41% of the population under 15.
> Japan, 2023: a narrow base and wide top, with about 29% aged 65 and over, compared with under 6% in 1960.
> The shapes summarise fertility, mortality and population ageing at a glance.
P: Every chart should state its source, the date of the data and any definitions, so readers can check and compare it.
K: Good visualisations match chart type to data and question, and show patterns honestly with clear axes, labels and sources.
H: Misleading charts
P: Truncated axes exaggerate differences; inconsistent scales mislead comparisons; maps can overemphasise large, sparsely populated areas; and selective time periods create false trends. Charts should label units, give sources and dates, and show uncertainty where relevant.
!: Using a pie chart for many categories or for change over time. Pie charts work only for a few parts of one whole.
EV: established | Japan's share of people aged 65 and over rose from under 6% in 1960 to about 29% in 2023 (World Bank, averaging male and female shares).
EV: contested | Which visual forms best communicate uncertainty to the public is debated.
T: Population pyramid | A chart showing the age and sex structure of a population
T: Line chart | A chart showing change in a variable over time
SUM: Choose charts to match data: bars, histograms, lines, scatterplots, pyramids and maps.
SUM: Check axes, scales, time periods and sources to avoid misleading displays.
SRC: World Bank, World Development Indicators: population ages by five-year band (SP.POP.*.5Y) | data | 2026-11-01 | https://data.worldbank.org/indicator/SP.POP.0004.FE.5Y
SRC: Weissgerber T. L. et al., "Beyond bar and line graphs: time for a new data presentation paradigm", PLoS Biology 13(4):e1002128 | primary | 2015 | https://doi.org/10.1371/journal.pbio.1002128
Q: Which chart shows the age and sex structure of a population? | A population pyramid.
Q: Which chart best shows change in unemployment over 20 years? | A line chart.
M1#sociology-u18-05-q1@1: Which chart best shows the relationship between GDP per head and life expectancy across countries? | A scatterplot | A pie chart | A population pyramid | A frequency table | Two numerical variables call for a scatterplot.
M2#sociology-u18-05-q2@2: A chart of crime shows only the two years when crime rose, omitting the decade-long fall before. What is the problem? | A cherry-picked period | The axes are unlabelled | It should be a pie chart | The data are nominal | Choosing only the years that fit a story creates a misleading trend; show the full series.
TF2#sociology-u18-05-q3@1,2: A wide-based population pyramid usually indicates high fertility. | true | Many children relative to adults shows high birth rates.
M3#sociology-u18-05-q4@3: Why can choropleth maps of deprivation by local authority mislead? | Big rural areas dominate visually | Maps can't show any data | They always use truncated axes | They show only individuals | Area size, not population, drives visual impression.
SA2#sociology-u18-05-q5@2,3: Describe how you would visualise change in UK life expectancy since 1960 and compare it with other countries, and one way to avoid misleading readers. | A line chart with years on the x-axis and life expectancy on the y-axis, one line per country, labelled, with source and dates (World Bank). Avoid truncating the y-axis without marking it, use consistent scales, and note that period life expectancy summarises current mortality. | Chart type ; Axes and labels ; Comparison ; Source ; Avoiding distortion

## Probability for social research
LV: Introductory · Foundation
S: Probability underpins sampling and inference in social research. This lesson covers basic probability, conditional probability in social contexts and why base rates matter for interpreting risk.
O: Calculate simple probabilities and percentages as probabilities
O: Explain conditional probability using social examples
O: Apply base rates to interpret claims about risk
PRE: Central tendency
H: Probability basics
P: A probability (from 0 to 1) expresses how likely an event is. In social research, a proportion in a population can be read as a probability: if 20% of households rent privately, a randomly chosen household has a 0.2 probability of renting privately. Random sampling relies on known probabilities of selection.
H: Conditional probability
P: **Conditional probability** is the probability of one event given another: the probability of being unemployed given that someone has no qualifications. Comparing conditional probabilities across groups is how sociologists describe **life chances**. Confusing p(A | B) with p(B | A) is a common error.
X: Base rates and risk profiling
> Suppose 1% of young people in an area are involved in serious youth violence.
> A screening tool flags 80% of those involved, but also 10% of those not involved.
> Of 1,000 young people: 8 true flags and about 99 false flags. Only about 7% of flagged young people are actually involved.
> Using the tool to target individuals would mostly affect uninvolved young people, raising fairness concerns.
K: Probabilities and conditional probabilities describe life chances, but interpreting them requires attention to base rates.
P: These issues matter in predictive policing, welfare fraud algorithms and child protection risk tools, where rare outcomes mean many false positives fall on particular groups.
!: Concluding that because a group has a higher rate of an outcome, most of its members experience it. A higher rate can still be a small proportion.
EV: established | When an outcome is rare, even accurate screening tools produce many false positives.
EV: contested | Whether algorithmic risk tools in public services are fair across social groups is debated.
T: Conditional probability | The probability of an event given that another has occurred
T: Base rate | How common an outcome is in a population before other information is considered
T: Life chances | The probability of experiencing good or bad outcomes, depending on social position
SUM: Proportions can be read as probabilities; conditional probabilities describe life chances.
SUM: Base rates matter: rare outcomes produce many false positives in screening and profiling.
SRC: Gigerenzer G. and Hoffrage U., "How to improve Bayesian reasoning without instruction: frequency formats", Psychological Review 102(4):684–704 | primary | 1995 | https://doi.org/10.1037/0033-295X.102.4.684
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
Q: What is conditional probability? | The probability of one event given that another has occurred.
Q: Why do rare outcomes produce many false positives in screening? | Most people don't have the outcome, so even a small false-positive rate applies to a very large group.
M1#sociology-u18-06-q1@1: If 25% of adults in a town are graduates, the probability that a randomly chosen adult is a graduate is… | 0.25 | 25 | 0.025 | 2.5 | A proportion of 25% is a probability of 0.25.
NUM2#sociology-u18-06-q2@2: In a town, 30 of 600 adults are unemployed. What is the probability (as a decimal) that a randomly chosen adult is unemployed? | 0.05 | 0.001 | probability | Probability = 30 unemployed ÷ 600 adults = 0.05, or 5%.
M2#sociology-u18-06-q3@2: A group has a higher rate of school exclusion than average (5% versus 2%). Which statement is correct? | Most of the group are not excluded | Most of the group are excluded | The group causes exclusion | Exclusion is random | A higher rate can still be a small minority.
M3#sociology-u18-06-q4@3: Why might a risk algorithm for rare outcomes raise fairness concerns? | Most people it flags won't have the outcome | It never makes errors | It ignores base rates entirely | It only flags true cases | Rare outcomes mean false positives dominate, often concentrated in some groups.
SA3#sociology-u18-06-q5@2,3: Use natural frequencies to explain why a welfare fraud algorithm might mostly flag innocent claimants. | Suppose 1% of 10,000 claims are fraudulent (100). The algorithm detects 90% (90) but also flags 5% of honest claims (495). Of 585 flags, only about 15% are fraud. Rare outcomes plus false positives mean most flagged claimants are innocent, with fairness implications. | Base rate ; True positives ; False positives ; Proportion ; Fairness

## Sampling distributions
LV: Intermediate · Application
S: If a survey were repeated many times with new random samples, the results would vary. The sampling distribution describes that variation and is the basis for margins of error. This lesson explains sampling distributions, standard errors and margins of error in polls.
O: Explain what a sampling distribution is
O: Calculate the standard error and approximate margin of error for a proportion
O: Interpret margins of error in opinion polls and surveys
PRE: Probability for social research
H: Results vary from sample to sample
P: Each random sample gives a slightly different estimate. The distribution of estimates across many hypothetical samples is the **sampling distribution**. Its spread is the **standard error (SE)**. For a proportion p from a sample of n, SE ≈ √(p(1 − p) ÷ n). For large samples the sampling distribution is approximately normal.
IX: sampling
H: Margins of error
P: The **margin of error** for a 95% confidence level is about 1.96 × SE. For a poll of 1,000 people with p = 0.5, SE ≈ √(0.25 ÷ 1,000) ≈ 0.016, so the margin of error is about ±3 percentage points. This only describes **random sampling error**; it doesn't cover non-response, coverage or question wording.
X: Interpreting a poll
> A poll of 1,000 adults finds 42% support for a policy, margin of error ±3 points.
> The population figure is plausibly between about 39% and 45%.
> A rise to 44% in the next poll is within sampling error and may not be a real change.
P: Margins of error for subgroups (such as one region or age group) are larger than for the whole sample, because each subgroup has fewer respondents.
K: The sampling distribution and standard error describe how much survey estimates vary by chance; margins of error express this but don't capture bias.
!: Treating the margin of error as covering all possible error. Biased samples can be wrong by far more than the margin of error.
EV: established | A random sample of about 1,000 gives a margin of error of about ±3 percentage points for a proportion near 50%.
EV: contested | How well margins of error describe uncertainty in polls using non-probability online panels is debated.
T: Sampling distribution | The distribution of an estimate across all possible random samples of a given size
T: Margin of error | About 1.96 standard errors either side of an estimate, for 95% confidence
SUM: Estimates vary across samples; the standard error measures this.
SUM: Margins of error capture random sampling error only, not bias.
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
SRC: Sturgis P. et al., Report of the Inquiry into the 2015 British General Election Opinion Polls, British Polling Council and Market Research Society | primary | 2016
Q: What is the standard error of a proportion? | √(p(1 − p) ÷ n), the typical variation of the estimate across samples.
Q: What does a margin of error not include? | Errors from non-response, coverage and question wording (bias).
M1#sociology-u18-07-q1@1: As sample size increases, the margin of error… | Gets smaller | Gets larger | Stays the same | Becomes zero | The standard error shrinks with the square root of n, so margins of error get smaller.
NUM2#sociology-u18-07-q2@2: For a proportion of 0.5 in a sample of 2,500, calculate the standard error as a decimal. | 0.01 | 0.0005 | proportion | √(0.25 ÷ 2,500) = √0.0001 = 0.01.
M2#sociology-u18-07-q3@2: Two polls of 1,000 people show 45% and 47% support. What is the best conclusion? | The difference is within sampling error | Support has definitely risen | The second poll is biased | The first poll is wrong | A 2-point change is within a ±3-point margin of error.
M3#sociology-u18-07-q4@3: Why did some UK election polls miss by more than their margins of error? | Unrepresentative samples, not just random error | Their samples were too large | Margins of error include all bias | Polls don't use samples | The 2015 inquiry found unrepresentative samples were the main cause.
SA2#sociology-u18-07-q5@2,3: A survey of 400 people finds 30% use a food bank. Calculate an approximate 95% margin of error and interpret it. | SE = √(0.3 × 0.7 ÷ 400) = √0.000525 ≈ 0.023; margin ≈ 1.96 × 0.023 ≈ 0.045, about ±4.5 points. The population figure plausibly lies between about 25.5% and 34.5%, assuming random sampling; bias isn't included. | SE ; Margin ; Interval ; Interpretation ; Bias caveat

## Hypothesis testing
LV: Intermediate · Application
S: Hypothesis testing assesses whether patterns in sample data are strong enough to infer patterns in the population. This lesson explains null and alternative hypotheses, test statistics and decisions, with social research examples.
O: State null and alternative hypotheses for a social research question
O: Explain the steps of a hypothesis test
O: Evaluate the limits of hypothesis testing in sociology
PRE: Sampling distributions
H: The logic
P: Sample data always differ somewhat from the population. A **hypothesis test** asks whether an observed difference or association is larger than would be expected by chance if there were no difference in the population. The **null hypothesis (H0)** states no difference or association; the **alternative (H1)** states there is one.
H: Steps
- State H0 and H1.
- Choose a significance level (α, usually .05).
- Choose an appropriate test (chi-square for categorical associations, t-test for comparing means, correlation for two numerical variables).
- Calculate the test statistic and p-value.
- Reject H0 if p < α; otherwise fail to reject it.
- Interpret in context, including effect size.
X: Graduate status and voting
> H0: there is no association between having a degree and voting in the last election.
> A survey of 600 adults gives χ²(1) = 12.4, p < .001.
> Reject H0: graduates and non-graduates differ in turnout in the population, on this evidence. The test doesn't show that a degree causes voting.
K: Hypothesis tests ask whether sample patterns are larger than chance would produce if the null were true; they don't establish cause or importance.
H: Limits in sociology
P: With very large samples (such as national surveys), tiny differences become significant, so effect sizes matter more than p-values. With whole-population data (such as a census), sampling-based tests are less meaningful because there is no sampling error. Many sociologists emphasise estimation (effect sizes and confidence intervals) over yes-or-no testing.
!: Saying "we proved there is a difference". Tests support or fail to support hypotheses; they don't prove them.
EV: established | Hypothesis tests assess how surprising data are under the null hypothesis.
EV: contested | Whether significance tests are meaningful for population data such as a census is debated.
T: Null hypothesis | The hypothesis of no difference or association in the population
T: Test statistic | A number summarising how far the data depart from the null hypothesis
SUM: Hypothesis tests compare data with what the null hypothesis predicts.
SUM: Large samples make tiny effects significant; population data and estimation raise further issues.
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
SRC: Wasserstein R. L. and Lazar N. A., "The ASA statement on p-values: context, process, and purpose", The American Statistician 70(2):129–133 | primary | 2016 | https://doi.org/10.1080/00031305.2016.1154108
Q: What does a null hypothesis state in social research? | That there is no difference or association between variables in the population.
Q: Why are significance tests less meaningful for census data? | A census covers the whole population, so there is no sampling error to test against.
M1#sociology-u18-08-q1@1: Which test fits an association between two categorical variables, such as region and voting? | Chi-square test | Independent t-test | Pearson correlation | Paired t-test | Chi-square tests associations between categorical variables.
M2#sociology-u18-08-q2@2: A national survey of 40,000 finds a statistically significant but tiny difference in life satisfaction between regions. What should be emphasised? | The effect size, which shows the difference is small | That the difference is large because it is significant | That regions cause satisfaction | That the survey is biased | Large samples make small effects significant.
SEQ2#sociology-u18-08-q3@2: Put the steps of a hypothesis test in order. | State H0 and H1 ; Choose α and a test ; Calculate the statistic and p-value ; Decide and interpret | Testing moves from hypotheses to decision and interpretation.
M3#sociology-u18-08-q4@3: A significant association is found between living in social housing and poor health. What can't the test show? | That social housing causes poor health | That the association is unlikely by chance | That H0 is rejected | That the samples differ | Significance doesn't establish causation; poverty may explain both.
SA3#sociology-u18-08-q5@2,3: State hypotheses and explain how you would test whether men and women differ in hours of unpaid housework, and the limits of the test. | H0: no difference in mean weekly housework hours between men and women; H1: a difference. Use an independent t-test (or Mann–Whitney if skewed), α = .05; report means, t, p, effect size and CI. Limits: significance isn't importance; correlational (no causal claim about gender roles); sample representativeness; self-report bias. | Hypotheses ; Test choice ; Reporting ; Effect size ; Limits
## Statistical significance
LV: Intermediate · Evaluation
S: Statistical significance tells us whether a result would be surprising if there were no real effect, not whether it matters. This lesson explains p-values, significance levels and the difference between statistical and substantive significance in social research.
O: Define a p-value and statistical significance
O: Distinguish statistical significance from substantive (sociological) significance
O: Evaluate common misuses of significance in social research reporting
PRE: Hypothesis testing
H: What significance means
P: The **p-value** is the probability of getting a result at least as extreme as the one observed if the null hypothesis were true. If p is below the chosen level (α = .05 by convention), the result is **statistically significant**. This means the pattern is unlikely to be due to sampling chance alone; it doesn't mean it is large, important or causal.
H: Statistical versus substantive significance
P: **Substantive significance** asks whether a difference matters sociologically or for policy. In large surveys, trivial differences can be statistically significant; in small studies, important differences may not reach significance. Sociologists should report the size of differences, for example in percentage points, alongside p-values.
X: Two findings, two kinds of significance
> A survey of 30,000 finds that people in one region report life satisfaction 0.05 points higher on a 0–10 scale, p = .01: statistically significant, substantively trivial.
> A study of 60 people finds a 15-point difference in the percentage who feel safe at night between two estates, p = .20: not significant, but potentially important and worth a larger study.
K: Statistical significance concerns chance, not importance; always report and interpret the size of effects.
P: Multiple testing is another trap: if a report tests 40 associations at α = .05, about two will be "significant" by chance even if no real associations exist.
!: Interpreting "not significant" as "no difference". It may mean the study was too small to detect one.
EV: established | With large samples, very small differences can be statistically significant.
EV: established | Testing many associations at α = .05 produces some significant results by chance.
T: p-value | The probability of a result at least as extreme as that observed, if the null hypothesis were true
T: Substantive significance | Whether a difference is large or important enough to matter sociologically or for policy
SUM: Statistical significance assesses chance; it doesn't measure importance or show causation.
SUM: Report effect sizes; beware large samples, small samples and multiple testing.
SRC: Wasserstein R. L. and Lazar N. A., "The ASA statement on p-values: context, process, and purpose", The American Statistician 70(2):129–133 | primary | 2016 | https://doi.org/10.1080/00031305.2016.1154108
SRC: Gigerenzer G., "Mindless statistics", The Journal of Socio-Economics 33(5):587–606 | primary | 2004 | https://doi.org/10.1016/j.socec.2004.09.033
Q: What does a statistically significant result show? | That the pattern would be unlikely by sampling chance alone if the null hypothesis were true.
Q: What is substantive significance? | Whether a difference is large or important enough to matter sociologically or for policy.
M1#sociology-u18-09-q1@1: The conventional significance level in social research is… | .05 | .5 | .95 | 5 | α = .05 means a 5% threshold for chance results.
M2#sociology-u18-09-q2@2: A report tests 60 associations and finds 3 significant at .05. What is the main concern? | About 3 would be expected by chance alone | The sample must be biased | All 3 must be real | Significance proves causation | Multiple testing produces chance significant results.
TF2#sociology-u18-09-q3@3: A non-significant result shows there is no difference in the population. | false | It may reflect a small sample or small effect; absence of evidence isn't evidence of absence.
M3#sociology-u18-09-q4@3: Why should a sociologist report percentage-point differences, not just p-values? | They show how large and important differences are | They remove the need for samples | They are always significant | p-values show effect sizes already | Effect sizes convey substantive importance, which p-values don't.
SA3#sociology-u18-09-q5@3: Evaluate the use of statistical significance in sociological research. | Useful for judging whether patterns exceed sampling chance. Limits: says nothing about importance; large samples make trivial effects significant; small samples miss real effects; multiple testing; misread as proof or causation; less meaningful for population data. Report effect sizes and CIs. | Purpose ; Large-sample problem ; Small-sample problem ; Multiple testing or misreading ; Remedy

## Confidence intervals
LV: Intermediate · Application
S: Confidence intervals give a range of plausible values for a population figure, showing how precise a survey estimate is. This lesson explains how to calculate and read confidence intervals for percentages and differences.
O: Calculate an approximate 95% confidence interval for a proportion
O: Interpret overlapping and non-overlapping intervals cautiously
O: Explain why confidence intervals are more informative than significance tests alone
PRE: Sampling distributions
H: A range of plausible values
P: A **95% confidence interval** for a proportion is approximately p ± 1.96 × SE, where SE = √(p(1 − p) ÷ n). If the same survey were repeated many times, about 95% of such intervals would contain the true population value. Narrow intervals mean precise estimates; wide intervals, imprecise ones.
X: Interval for a survey estimate
> In a sample of 900, 36% say they trust the police "a great deal" or "quite a lot".
> SE = √(0.36 × 0.64 ÷ 900) = √0.000256 = 0.016.
> 95% CI ≈ 36% ± 3.1 points, about 32.9% to 39.1%.
H: Comparing groups
P: For a difference between two groups (say, trust among young and old adults), calculate the confidence interval for the **difference**. If it excludes zero, the difference is significant at the 5% level. Two separate intervals that overlap slightly can still correspond to a significant difference, so comparing overlap is only a rough guide.
K: Confidence intervals show how precise an estimate is, combining the size of a figure with its uncertainty.
P: Official statistics increasingly publish confidence intervals: the ONS, for example, reports them for many survey-based estimates such as the Labour Force Survey, so changes can be judged against uncertainty.
!: Treating overlapping intervals as proof of no difference. Calculate the interval for the difference itself.
EV: established | About 95% of 95% confidence intervals from repeated random sampling contain the population value.
EV: contested | How confidence intervals should be explained to non-specialists is debated.
T: Confidence interval | A range of plausible values for a population figure based on a sample
T: Precision | How narrow an estimate's confidence interval is
SUM: A 95% CI for a proportion is about p ± 1.96 standard errors.
SUM: Intervals show size and uncertainty; compare groups using the interval for the difference.
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
SRC: Cumming G., "The new statistics: why and how", Psychological Science 25(1):7–29 | primary | 2014 | https://doi.org/10.1177/0956797613504966
Q: How is an approximate 95% CI for a proportion calculated? | p ± 1.96 × √(p(1 − p) ÷ n).
Q: What does a wide confidence interval indicate? | An imprecise estimate, usually from a small sample.
M1#sociology-u18-10-q1@1: Which makes a confidence interval narrower? | A larger sample | A smaller sample | More variable data | A higher confidence level | Larger samples reduce the standard error.
NUM2#sociology-u18-10-q2@2: A survey estimate is 50% with a standard error of 2 percentage points. What is the upper limit of the 95% CI, in per cent? | 53.92 | 0.01 | % | 50 + 1.96 × 2 = 53.92.
M2#sociology-u18-10-q3@2: The 95% CI for the difference in support between two age groups is −2 to +8 points. What does this suggest? | The difference isn't clearly different from zero | One group definitely supports more | The groups are identical | The survey was invalid | An interval including zero is compatible with no difference.
M3#sociology-u18-10-q4@3: Why are confidence intervals more informative than "significant or not"? | They show size and uncertainty | They are always narrower | They remove sampling error | They prove causation | Intervals convey magnitude and precision together.
SA2#sociology-u18-10-q5@2,3: A sample of 400 finds 20% have used a payday loan. Calculate and interpret an approximate 95% CI. | SE = √(0.2 × 0.8 ÷ 400) = √0.0004 = 0.02; CI ≈ 20% ± 3.9 points, about 16.1% to 23.9%. The population figure plausibly lies in this range, assuming random sampling; non-response and question wording could add bias not captured here. | SE ; Interval ; Interpretation ; Bias caveat

## Effect sizes
LV: Intermediate · Application
S: Effect sizes measure how big a difference or association is. In sociology they are often expressed as percentage-point differences, ratios, odds ratios or correlation coefficients. This lesson explains common social research effect sizes and how to interpret them.
O: Calculate percentage-point differences and ratios
O: Explain odds and odds ratios
O: Interpret effect sizes in context
PRE: Statistical significance
H: Common effect sizes
- **Percentage-point differences**: if 70% of graduates vote and 55% of non-graduates, the difference is 15 percentage points.
- **Ratios (relative risk)**: 70 ÷ 55 ≈ 1.27, so graduates are 1.27 times as likely to vote.
- **Odds ratios**: odds are p ÷ (1 − p). Graduates' odds of voting are 0.7 ÷ 0.3 ≈ 2.33; non-graduates' 0.55 ÷ 0.45 ≈ 1.22; the odds ratio is about 1.9. Odds ratios are standard in mobility research and logistic regression.
- **Correlation coefficients** and **Cramér's V** for associations.
X: Percentage points or per cent?
> Child poverty falls from 30% to 27%.
> That is a fall of 3 percentage points, or a 10% relative fall (3 ÷ 30).
> Reporting both avoids confusion; headlines often mix them up.
P: Effect sizes are also needed for comparing studies and for meta-analysis, where results from different surveys are combined.
K: Effect sizes describe how large differences and associations are; percentage points, ratios and odds ratios each answer slightly different questions.
H: Interpreting effects
P: Whether an effect is large depends on context: a 1-point fall in unemployment affects hundreds of thousands of people nationally. Relative measures can make small absolute changes sound dramatic ("doubling" from 1% to 2%), so absolute and relative figures should be reported together.
!: Confusing percentage points with per cent. A rise from 10% to 15% is 5 points, but a 50% relative increase.
EV: established | Odds ratios are widely used to measure relative social mobility and in logistic regression.
EV: established | Relative changes can sound large when absolute changes are small, so both should be reported.
T: Percentage-point difference | The arithmetic difference between two percentages
T: Odds ratio | The ratio of the odds of an outcome in one group to the odds in another
T: Relative risk | The ratio of the probability of an outcome in one group to that in another
SUM: Percentage-point differences, ratios and odds ratios measure effect sizes in social research.
SUM: Report absolute and relative figures together and interpret them in context.
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
SRC: Goldthorpe J. H., Social Mobility and Class Structure in Modern Britain, Clarendon Press | primary | 1980
Q: What is the difference between a percentage-point change and a percentage change? | Percentage points are the arithmetic difference between percentages; a percentage change is relative to the starting value.
Q: How are odds calculated from a probability? | Odds = p ÷ (1 − p).
M1#sociology-u18-11-q1@1: Unemployment rises from 4% to 6%. This is a rise of… | 2 percentage points | 2 per cent | 6 percentage points | 50 percentage points | The arithmetic difference is 2 points (a 50% relative rise).
NUM2#sociology-u18-11-q2@2: A probability of 0.8 gives what odds? | 4 | 0.01 | to 1 | Odds = 0.8 ÷ 0.2 = 4.
M2#sociology-u18-11-q3@2: A headline says "risk doubles" when a rate rises from 0.5% to 1%. What should be added? | The absolute change is 0.5 percentage points | The risk is now 50% | The study proves causation | Nothing, the headline is complete | Absolute figures show the small size of the change.
M3#sociology-u18-11-q4@3: Why do mobility researchers use odds ratios rather than simple percentages? | They capture relative chances | They are always larger | They avoid the need for data | They measure absolute mobility only | Odds ratios capture relative fluidity even as the size of classes changes.
SA2#sociology-u18-11-q5@1,2: 60% of children from professional families and 20% from routine-occupation families go to university. Calculate the percentage-point difference, the ratio and the odds ratio, and interpret them. | Difference 40 points; ratio 3; odds 1.5 versus 0.25, odds ratio 6. Children from professional families are three times as likely, and have six times the odds, of going to university: a large inequality in relative chances. | Difference ; Ratio ; Odds ratio ; Interpretation

## Correlation
LV: Intermediate · Application
S: Correlation measures how strongly two numerical variables are related. In sociology, correlations are often calculated across areas or countries, which brings particular dangers. This lesson explains correlation coefficients and the ecological fallacy.
O: Interpret Pearson's r and Spearman's rho for social data
O: Explain why correlation doesn't establish causation
O: Explain the ecological fallacy in area- and country-level correlations
PRE: Types of social data
H: Measuring association
P: **Pearson's r** measures linear association between two interval or ratio variables, from −1 to +1; **Spearman's rho** uses ranks, suiting ordinal data or skewed data with outliers. r² shows the proportion of variance shared.
IX: data-inequality
H: Correlation and causation
P: Correlations can arise because one variable causes the other, because the causation runs the other way, or because a third variable drives both. Wilkinson and Pickett (2009) showed that more unequal rich countries tend to have worse health and social problems; critics argued about the choice of countries, measures and confounders, illustrating how much interpretation rests on more than the correlation itself.
X: A country-level correlation
> Across 22 countries in the World Bank data, GDP per head and life expectancy are strongly positively correlated.
> This doesn't show that richer individuals within a country live longer by the same amount, nor that income alone causes longer lives.
> Health systems, education and public health differ between countries too.
K: Correlation measures association; causal claims need more evidence, and group-level correlations don't describe individuals.
H: The ecological fallacy
P: Robinson (1950) showed that correlations between percentages across US states (such as being foreign-born and literacy) could differ in size and even sign from correlations between the same characteristics among individuals. Inferring individual relationships from aggregate data is the **ecological fallacy**.
!: Reading an area-level correlation as a fact about individuals. A correlation between deprived areas and crime doesn't show that deprived individuals commit crime.
EV: established | Correlations between groups can differ from correlations between individuals (Robinson, 1950).
EV: contested | Whether income inequality causes worse social outcomes across rich countries is debated.
T: Correlation coefficient | A number from −1 to +1 showing the strength and direction of an association
T: Ecological fallacy | Inferring relationships among individuals from relationships among groups
SUM: Pearson's r and Spearman's rho measure association; neither shows causation.
SUM: Area and country correlations can't be applied to individuals.
SRC: Robinson W. S., "Ecological correlations and the behavior of individuals", American Sociological Review 15(3):351–357 | primary | 1950 | https://doi.org/10.2307/2087176
SRC: Wilkinson R. and Pickett K., The Spirit Level: Why More Equal Societies Almost Always Do Better, Allen Lane | primary | 2009
Q: What is the ecological fallacy? | Inferring relationships among individuals from relationships observed among groups.
Q: When is Spearman's rho preferred to Pearson's r? | For ordinal or strongly skewed data, or when there are outliers.
M1#sociology-u18-12-q1@1: A correlation of r = −0.7 indicates… | A strong negative association | A weak positive association | No association | A perfect positive association | The sign gives direction and the size gives strength.
M2#sociology-u18-12-q2@2: Across local authorities, areas with more food banks have higher poverty. What is the most likely explanation? | Food banks open where need is greater | Food banks cause poverty | Poverty is unrelated to food banks | Each poor person uses a food bank | The direction of causation likely runs from need to provision.
TF2#sociology-u18-12-q3@3: A country-level correlation between inequality and crime shows that unequal individuals commit more crime. | false | Group-level patterns don't describe individuals: that is the ecological fallacy.
M3#sociology-u18-12-q4@3: Which design would best test whether area deprivation affects individuals' health? | Individual data with area measures | A correlation of area averages only | A single case study of one person | A content analysis of newspapers | Multilevel individual data can separate area and individual effects.
SA3#sociology-u18-12-q5@3: Evaluate the use of country-level correlations to support claims about inequality and social problems. | Useful for identifying patterns (Wilkinson and Pickett). Limits: correlation not causation; confounders (welfare, culture, history); choice of countries and measures; ecological fallacy for individual claims; few cases. Need individual-level and longitudinal evidence. | Pattern value ; Causation ; Confounders ; Ecological fallacy ; Better evidence

## Regression
LV: Intermediate · Application
S: Regression models how an outcome changes with one or more explanatory variables, allowing sociologists to estimate associations while holding other factors constant. This lesson explains linear and logistic regression in social research.
O: Interpret coefficients in linear regression
O: Explain how multiple regression "controls for" other variables
O: Describe logistic regression for categorical outcomes and its odds ratios
PRE: Correlation
H: Linear regression
P: **Linear regression** fits ŷ = a + bx, predicting an outcome (such as hourly pay) from a predictor (such as years of education). The coefficient b is the predicted change in the outcome per unit of the predictor. **Multiple regression** adds predictors, so each coefficient is estimated holding the others constant.
X: Estimating the gender pay gap
> Model 1: hourly pay regressed on sex: women earn £2.00 an hour less on average (illustrative).
> Model 2: adding age, hours, occupation and sector shrinks the gap to £0.80.
> Interpretation: part of the raw gap reflects differences in occupation and hours; the rest isn't explained by these variables. Whether occupational differences are themselves the result of discrimination is a sociological question the model can't answer.
H: Logistic regression
P: When the outcome is categorical (voted or not, employed or not), **logistic regression** models the odds of the outcome. Coefficients are often reported as **odds ratios**: an odds ratio of 2 for graduates means graduates' odds of voting are twice non-graduates', holding other variables constant.
K: Regression estimates how outcomes vary with predictors, holding others constant; logistic regression does this for categorical outcomes using odds ratios.
H: Cautions
P: "Controlling for" a variable is statistical, not experimental: unmeasured confounders remain. Controlling for variables that are themselves outcomes of the main predictor (such as occupation in the pay gap) can hide part of the effect of interest. Models should be guided by theory.
!: Treating an "unexplained" gap as proof of discrimination, or an "explained" gap as proof of no discrimination. Both need interpretation.
EV: established | Multiple regression estimates associations while holding measured variables constant.
EV: contested | How to interpret explained and unexplained parts of pay gaps is debated.
T: Regression coefficient | The predicted change in the outcome for a one-unit change in a predictor
T: Logistic regression | A regression model for categorical outcomes, estimating odds
T: Control variable | A variable included in a model to hold its influence constant
SUM: Linear regression models numerical outcomes; logistic regression models categorical outcomes with odds ratios.
SUM: Statistical control can't remove unmeasured confounding; models need theory.
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, SAGE | secondary | 2018
SRC: Office for National Statistics, Gender pay gap in the UK statistical bulletins | data | 2026-11 | https://www.ons.gov.uk/
Q: What does a regression coefficient show? | The predicted change in the outcome for a one-unit increase in that predictor.
Q: When is logistic regression used? | When the outcome is categorical, such as voted or did not vote.
M1#sociology-u18-13-q1@1: In ŷ = 8 + 1.5x, where ŷ is hourly pay and x is years of education, what is the predicted increase per year of education? | £1.50 | £8 | £9.50 | £0.15 | The slope gives the change per unit of x.
NUM2#sociology-u18-13-q2@2: Using ŷ = 8 + 1.5x, predict hourly pay in pounds for 12 years of education. | 26 | 0.01 | £ per hour | 8 + 1.5 × 12 = 8 + 18 = £26.
M2#sociology-u18-13-q3@2: A logistic regression gives an odds ratio of 0.5 for renters owning a car compared with owners. What does this mean? | Renters' odds are half owners' | Renters are half as many | Renters never own cars | The model is invalid | An odds ratio below 1 means lower odds in that group.
M3#sociology-u18-13-q4@3: Why might controlling for occupation underestimate the effect of gender on pay? | Occupation may itself be shaped by gender | Occupation has no effect on pay | It always overestimates the effect | Controls remove all confounding | Controlling for a variable on the causal path hides part of the effect.
SA3#sociology-u18-13-q5@2,3: Explain how regression can be used to study the ethnicity pay gap, and the limits of the analysis. | Regress hourly pay on ethnicity, then add controls (age, qualifications, region, hours, occupation) to see how much of the raw gap remains. Limits: unmeasured factors; controls may be outcomes of discrimination (occupational segregation); measurement of ethnicity; correlational; interpretation needs theory. | Model ; Controls ; Interpretation of change ; Mediator problem ; Other limits

## Categorical data
LV: Intermediate · Application
S: Much social data is categorical: class, ethnicity, tenure, voting. This lesson explains how to analyse categorical data with crosstabulations, row and column percentages and measures of association.
O: Construct and read a crosstabulation with row or column percentages
O: Explain which percentages answer which question
O: Describe measures of association for categorical data
PRE: Frequency distributions
H: Crosstabulations
P: A **crosstabulation** (contingency table) shows the joint distribution of two categorical variables. Percentages make it readable, but they must be calculated in the right direction: percentage **within** the categories of the explanatory variable, so that the outcome can be compared across groups.
IX: crosstab
X: Tenure by age group
> Of 400 people aged 18–34, 160 own their home (40%); of 600 aged 35 and over, 420 own (70%).
> Row percentages within age groups answer "how does home ownership differ by age?".
> Column percentages within tenure groups would instead answer "what is the age make-up of owners and renters?", a different question.
P: Always report the number of cases in each group alongside percentages, so readers can see when a percentage rests on a small base.
K: Crosstabulations display associations between categorical variables; percentages must be calculated within the explanatory variable's categories.
H: Measures of association
P: For two-by-two tables, the **odds ratio** is a common measure; for larger tables, **Cramér's V** (0 to 1) summarises strength. Elaborating a table by a third variable (for example tenure by age, separately for each income band) tests whether an association holds within groups or reflects a confounder.
!: Calculating percentages in the wrong direction, which answers a different question from the one asked.
EV: established | Crosstabulations with percentages are a basic tool for analysing categorical social data.
EV: established | An association between two categorical variables can change when a third variable is controlled.
T: Crosstabulation | A table showing the joint distribution of two categorical variables
T: Cramér's V | A measure of association for categorical tables, from 0 to 1
T: Elaboration | Examining whether a bivariate association holds within categories of a third variable
SUM: Crosstabulations show associations between categorical variables.
SUM: Percentage within the explanatory variable; use odds ratios or Cramér's V; elaborate by a third variable.
SRC: OpenStax, Introductory Statistics 2e | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-introduction
SRC: Agresti A., An Introduction to Categorical Data Analysis, 3rd edition, Wiley | secondary | 2018
Q: What is a crosstabulation? | A table showing the joint distribution of two categorical variables.
Q: In which direction should percentages usually be calculated? | Within categories of the explanatory (independent) variable.
M1#sociology-u18-14-q1@1: A table of voting (yes/no) by region is a… | Crosstabulation | Regression equation | Histogram | Sampling frame | It shows the joint distribution of two categorical variables.
NUM2#sociology-u18-14-q2@2: Of 250 graduates, 175 voted. What percentage voted? | 70 | 0 | % | 175 ÷ 250 × 100 = 70%.
M2#sociology-u18-14-q3@2: To compare home ownership between young and older adults, which percentages should be used? | Percentages within each age group | Percentages within owners and renters | Raw counts only | Overall totals only | Percentages within the explanatory variable (age) compare the outcome across groups.
M3#sociology-u18-14-q4@3: An association between tenure and health disappears when income is controlled. What does this suggest? | Income may explain the association | Tenure directly causes health | The original table was wrong | Income has no effect | Elaboration shows the association may be confounded by income.
SA2#sociology-u18-14-q5@2,3: Describe how you would analyse whether religious attendance differs by age group using survey data. | Create a crosstab of attendance categories by age groups; calculate row percentages within age groups; describe differences; test with chi-square; report Cramér's V; elaborate by a third variable such as ethnicity to check for confounding. | Crosstab ; Percentage direction ; Test ; Effect size ; Elaboration

## Chi-square tests
LV: Intermediate · Application
S: The chi-square test of independence checks whether an association in a crosstabulation is larger than sampling chance would produce. This lesson explains how the test works, its assumptions and how to report it.
O: Calculate expected frequencies for a crosstabulation
O: Interpret a chi-square result with degrees of freedom, p-value and Cramér's V
O: Evaluate the assumptions and limitations of chi-square tests
PRE: Categorical data
H: Observed and expected
P: The test compares the **observed** counts in each cell with the **expected** counts if the two variables were unrelated. Expected = (row total × column total) ÷ grand total. The statistic χ² = Σ (O − E)² ÷ E is larger when observed and expected differ more. Degrees of freedom = (rows − 1) × (columns − 1).
IX: crosstab
X: Voting by degree status
> Graduates: 160 voted, 40 didn't (200). Non-graduates: 210 voted, 140 didn't (350). Total 550; 370 voted.
> Expected graduates voting = 200 × 370 ÷ 550 ≈ 134.5.
> The full test gives χ²(1) ≈ 23.1, p < .001, Cramér's V ≈ .21: a significant but modest association.
P: For tables larger than two by two, look at which cells contribute most to χ² (standardised residuals) to see where the association lies.
K: Chi-square tests whether an association between categorical variables exceeds chance; Cramér's V shows its strength.
H: Assumptions and limits
P: Observations must be independent (each person counted once), and expected counts should generally be at least 5 per cell; otherwise categories can be combined or Fisher's exact test used. Chi-square is sensitive to sample size: with large samples, weak associations are significant, so Cramér's V and percentages matter. It shows association, not causation or direction.
!: Running chi-square on percentages instead of counts. The test needs raw frequencies.
EV: established | The chi-square test requires independent observations and adequate expected frequencies.
EV: established | Large samples can make weak associations statistically significant.
T: Expected frequency | The count expected in a cell if the variables were unrelated
T: Degrees of freedom | For chi-square, (rows − 1) × (columns − 1)
SUM: Chi-square compares observed and expected counts in a crosstabulation.
SUM: Check assumptions, report df, p and Cramér's V, and avoid causal claims.
SRC: Pearson K., "On the criterion that a given system of deviations from the probable in the case of a correlated system of variables is such that it can be reasonably supposed to have arisen from random sampling", Philosophical Magazine 50(302):157–175 | primary | 1900 | https://doi.org/10.1080/14786440009463897
SRC: Agresti A., An Introduction to Categorical Data Analysis, 3rd edition, Wiley | secondary | 2018
Q: How is the expected frequency for a cell calculated? | Row total × column total ÷ grand total.
Q: What are the degrees of freedom for a 4 × 3 table? | 6, because (4 − 1) × (3 − 1) = 6.
M1#sociology-u18-15-q1@1: Chi-square tests are run on… | Raw counts | Percentages | Means | Correlations | Chi-square compares observed and expected frequencies, so it needs raw counts.
NUM2#sociology-u18-15-q2@2: A table has row total 120, column total 80 and grand total 400. What is the expected frequency for that cell? | 24 | 0 | people | Expected frequency = row total × column total ÷ grand total = 120 × 80 ÷ 400 = 24.
M2#sociology-u18-15-q3@2: Several cells in a table have expected counts of 2. What should be done? | Combine cells or use Fisher's test | Ignore the problem | Use percentages instead | Run a t-test | Small expected counts make chi-square unreliable.
M3#sociology-u18-15-q4@3: A survey of 20,000 finds χ²(1) = 15, p < .001, Cramér's V = .03. How should this be interpreted? | A tiny association, made significant | A very strong association | No association at all | A causal effect | V = .03 shows the association is tiny despite significance.
SA2#sociology-u18-15-q5@2,3: Report and interpret: tenure (own, rent) by voting (yes, no), χ²(1, N = 800) = 9.6, p = .002, Cramér's V = .11. | There is a statistically significant association between tenure and voting; V = .11 indicates a weak association. Report percentages (e.g. turnout among owners and renters). It doesn't show tenure causes voting: age and class may explain both. | Significance ; Strength ; Percentages ; Causation caution ; Confounders

## Social indicators
LV: Introductory · Application
S: Social indicators are statistics used to measure social conditions and track progress, from unemployment rates to life expectancy and wellbeing. This lesson explains how indicators are built, composite indices such as the Human Development Index, and debates about measuring progress.
O: Define social indicators and give examples
O: Explain composite indicators such as the Human Development Index
O: Evaluate the use of GDP and alternative measures of progress
PRE: Types of social data
H: Measuring social conditions
P: **Social indicators** summarise aspects of society in numbers: unemployment, poverty, educational attainment, life expectancy, crime, wellbeing. Good indicators are valid (they measure what matters), reliable, comparable over time and between places, and timely. They are used to describe change, compare places and evaluate policies, such as the UN Sustainable Development Goals.
IX: data-inequality
H: Beyond GDP
P: Gross domestic product (GDP) per head measures economic output, not wellbeing or its distribution. The **Human Development Index** (HDI), published by UNDP since 1990, combines life expectancy, education and income. The Stiglitz–Sen–Fitoussi Commission (2009) argued for measuring wellbeing and sustainability alongside GDP, and the ONS now publishes measures of national wellbeing.
X: Two countries, two pictures
> Two countries have similar GDP per head.
> One has much higher life expectancy and lower inequality.
> GDP alone hides these differences; a dashboard of indicators reveals them.
K: Social indicators measure social conditions; composite indices and wellbeing measures address the limits of GDP but involve value choices.
H: Debates
P: Choosing indicators and their weights involves value judgements: what counts as progress, and whose priorities? Indicators can become targets that distort behaviour (Goodhart's or Campbell's law: when a measure becomes a target, it ceases to be a good measure). Data gaps affect poorer countries and marginalised groups.
!: Treating an indicator as the thing itself. Recorded crime, for example, is an indicator of crime, shaped by reporting and recording.
EV: established | UNDP has published the Human Development Index since 1990.
EV: contested | Which indicators and weights best measure social progress is debated.
T: Social indicator | A statistic used to measure a social condition and track change
T: Human Development Index | A UNDP index combining life expectancy, education and income
SUM: Social indicators measure conditions such as poverty, health and wellbeing.
SUM: Composite indices and wellbeing measures supplement GDP; indicator choice involves values and can distort behaviour.
SRC: United Nations Development Programme, Human Development Reports | data | 2026-11 | https://hdr.undp.org/
SRC: Stiglitz J. E., Sen A. and Fitoussi J.-P., Report by the Commission on the Measurement of Economic Performance and Social Progress | primary | 2009
Q: What does the Human Development Index combine? | Life expectancy, education and income.
Q: What is Campbell's (or Goodhart's) law? | When a measure becomes a target, it tends to distort behaviour and stops being a good measure.
M1#sociology-u18-16-q1@1: Which organisation publishes the Human Development Index? | UNDP | The ONS | The OECD only | The BSA | The UN Development Programme has published the HDI in its Human Development Reports since 1990.
M2#sociology-u18-16-q2@2: A government targets reducing recorded crime, and police record fewer minor offences. What does this illustrate? | A target distorting a measure | Improved crime prevention | Better sampling | A census effect | Targeting an indicator can change recording rather than reality.
TF2#sociology-u18-16-q3@2: GDP per head measures how evenly income is distributed in a country. | false | GDP per head is an average and says nothing about distribution.
M3#sociology-u18-16-q4@3: Why is constructing a composite index never purely technical? | Weights reflect value choices | Indices can't be calculated | All indicators have identical weights | Composite indices always use GDP only | Value judgements shape what the index measures.
SA3#sociology-u18-16-q5@3: Evaluate GDP per head as a measure of social progress. | Strengths: standardised, comparable, timely measure of economic output. Weaknesses: ignores distribution, unpaid work, environment, health and wellbeing; can rise while many are worse off. Alternatives: HDI, wellbeing measures, dashboards (Stiglitz–Sen–Fitoussi); these involve value choices and data gaps. | GDP strengths ; GDP limits ; Alternative ; Value choices ; Judgement

## Measuring inequality: the Gini coefficient
LV: Intermediate · Application
S: The Gini coefficient summarises inequality in a single number from 0 (perfect equality) to 1 (maximum inequality). This lesson explains how it relates to the Lorenz curve, how to read real Gini values and the limits of a single measure.
O: Explain the Lorenz curve and how the Gini coefficient is derived from it
O: Interpret Gini coefficients for different countries using real data
O: Evaluate the Gini coefficient as a measure of inequality
PRE: Dispersion
H: Lorenz curve and Gini
P: A **Lorenz curve** plots the cumulative share of income (y-axis) against the cumulative share of people ordered from poorest to richest (x-axis). Perfect equality gives a straight diagonal line. The **Gini coefficient** is the area between the line of equality and the Lorenz curve, divided by the whole area under the line of equality. It was proposed by Corrado Gini (1912). It is often reported on a 0–100 scale.
IX: lorenz
X: Real Gini values (World Bank)
> Sweden 29.3 (2023), United Kingdom 32.4 (2021), United States 41.8 (2024), Brazil 50.3 (2024), South Africa 54.1 (2022).
> South Africa's Lorenz curve bows furthest from equality: the poorest fifth received 3.7% of income in 2022.
> Note: these figures are based on household surveys, some measuring income and others consumption, so comparisons need care.
P: Wealth is far more unequally distributed than income in most countries, so Gini coefficients for wealth are much higher than for income.
K: The Gini coefficient summarises a whole distribution's inequality in one number derived from the Lorenz curve.
H: Limits
P: Different distributions can share a Gini: inequality at the top and at the bottom aren't distinguished. The Gini is more sensitive to changes in the middle than at the extremes, so researchers also use the **Palma ratio** (top 10% share ÷ bottom 40%; Palma, 2011) and top income shares. Results depend on the unit (individuals or households), equivalisation for household size, before or after taxes and benefits, and income versus consumption.
IX: gini
!: Comparing Gini figures from different sources without checking definitions. Income versus consumption, and before versus after tax, give different values.
EV: established | World Bank Gini estimates range from about 29 for Sweden (2023) to about 54 for South Africa (2022) among the countries in this course's data.
EV: contested | Which inequality measure (Gini, Palma or top shares) best captures socially important inequality is debated.
T: Lorenz curve | A graph of the cumulative share of income against the cumulative share of the population
T: Gini coefficient | A summary measure of inequality from 0 (equal) to 1 (or 100), derived from the Lorenz curve
T: Palma ratio | The income share of the top 10% divided by the share of the bottom 40%
SUM: The Gini coefficient measures inequality from the Lorenz curve.
SUM: It summarises a whole distribution but hides where inequality lies; definitions affect comparisons.
SRC: World Bank, World Development Indicators: Gini index, SI.POV.GINI | data | 2026-11-01 | https://data.worldbank.org/indicator/SI.POV.GINI
SRC: Palma J. G., "Homogeneous middles vs. heterogeneous tails, and the end of the 'inverted-U'", Development and Change 42(1):87–153 | primary | 2011 | https://doi.org/10.1111/j.1467-7660.2011.01694.x
SRC: Gini C., Variabilità e mutabilità | primary | 1912
Q: What does a Gini coefficient of 0 mean? | Perfect equality: everyone has the same income.
Q: What is the Palma ratio? | The income share of the richest 10% divided by the share of the poorest 40%.
M1#sociology-u18-17-q1@1: The line of equality on a Lorenz curve is… | A straight diagonal | A horizontal line | A vertical line | A circle | Perfect equality gives the diagonal where x% of people have x% of income.
M2#sociology-u18-17-q2@2: Two countries both have a Gini of 35, but in one the top 1% hold a much larger share. What does this show? | The Gini can hide where inequality lies | The countries have identical distributions | The Gini is always wrong | Top shares don't matter | A single number can't show the shape of a distribution.
TF2#sociology-u18-17-q3@3: Gini figures based on consumption and on income are directly comparable. | false | Consumption is usually more equal than income, so definitions affect comparisons.
M3#sociology-u18-17-q4@3: Why might researchers add the Palma ratio to the Gini? | It targets the extremes | It ignores the top and bottom | It replaces all data | It measures average income | The Palma ratio targets the tails, where the Gini is less sensitive.
SA3#sociology-u18-17-q5@2,3: Using World Bank data, compare inequality in Sweden (Gini 29.3, 2023) and Brazil (Gini 50.3, 2024), and evaluate the Gini as a measure. | Brazil is much more unequal: its Lorenz curve bows further from equality. The Gini summarises the whole distribution but hides where inequality lies, depends on survey definitions (income versus consumption), and should be supplemented by the Palma ratio or top shares. | Comparison ; Lorenz interpretation ; Hidden shape ; Definitions ; Supplementary measures

## Measuring poverty
LV: Intermediate · Evaluation
S: How poverty is measured shapes how much of it we see. This lesson explains absolute and relative income measures, deprivation indicators and minimum income standards, and why the choice of measure is contested.
O: Distinguish absolute and relative poverty measures
O: Explain deprivation-based and minimum income approaches
O: Evaluate the strengths and weaknesses of different poverty measures
PRE: Central tendency
H: Income-based measures
- **Absolute poverty**: income below a fixed standard adjusted only for inflation. Globally, the World Bank's extreme poverty line is $3.00 a day at 2021 purchasing-power prices.
- **Relative poverty**: income below a share of a society's median. The UK's main measure counts households below 60% of median equivalised income, before and after housing costs (DWP's Households Below Average Income).
IX: poverty
H: Beyond income
P: Townsend (1979) defined poverty as lacking the resources to participate in the activities and living conditions customary in one's society, and measured it with **deprivation** indicators. **Material deprivation** measures ask whether households can afford items most people regard as necessities. The **Minimum Income Standard**, developed for the Joseph Rowntree Foundation, asks the public what income a household needs for an acceptable standard of living.
X: When measures disagree
> In a recession, median income falls, so the relative poverty line falls too.
> Relative poverty may fall even though no one is better off, while absolute poverty and deprivation rise.
> Using several measures shows a fuller picture.
K: Poverty can be measured in absolute, relative, deprivation-based or consensual ways; each captures something different.
H: Debates
P: Relative measures are criticised as measuring inequality rather than hardship; absolute measures for ignoring how needs change with social norms. Deprivation measures depend on which items are chosen. Sen argued poverty is about capabilities, what people can do and be, not just income. Governments have often changed or emphasised the measure that suits them, so poverty measurement is political as well as technical.
!: Comparing poverty rates without checking whether the measure is absolute, relative, before or after housing costs.
EV: established | The UK's main low-income measure is below 60% of median equivalised household income.
EV: contested | Whether relative income measures capture poverty or inequality is debated.
T: Relative poverty | Income below a share (often 60%) of the median in a society
T: Absolute poverty | Income below a fixed standard adjusted only for prices
T: Material deprivation | Being unable to afford items most people regard as necessities
SUM: Poverty can be measured absolutely, relatively, through deprivation or by public consensus.
SUM: Measures can disagree, so the choice is technical and political.
SRC: Townsend P., Poverty in the United Kingdom, Penguin | primary | 1979
SRC: Department for Work and Pensions, Households Below Average Income statistics | data | 2026-11 | https://www.gov.uk/government/collections/households-below-average-income-hbai--2
SRC: Sen A., "Poor, relatively speaking", Oxford Economic Papers 35(2):153–169 | primary | 1983 | https://doi.org/10.1093/oxfordjournals.oep.a041587
Q: How is relative poverty usually defined in the UK? | Household income below 60% of median equivalised income.
Q: What is material deprivation? | Being unable to afford items most people regard as necessities.
M1#sociology-u18-18-q1@1: Who defined poverty as lacking resources to take part in customary activities? | Peter Townsend | Amartya Sen | Charles Booth | Seebohm Rowntree | Townsend's 1979 study defined relative deprivation.
M2#sociology-u18-18-q2@2: In a recession, median income falls and relative poverty falls too, while food bank use rises. What does this show? | Relative measures can miss rising hardship | Poverty has definitely fallen | Food banks cause poverty | Median income is irrelevant | A falling median lowers the relative line, so other measures are needed.
TF2#sociology-u18-18-q3@3: Poverty measurement is purely technical, with no political dimension. | false | The choice of measure affects how much poverty appears and has been politically contested.
M3#sociology-u18-18-q4@3: Why does Sen's capability approach go beyond income? | It asks what people can actually do and be | It ignores income entirely | It measures only GDP | It uses only absolute lines | Capabilities focus on real freedoms and functioning, not just resources.
SA3#sociology-u18-18-q5@3: Evaluate relative income measures of poverty. | Strengths: reflect social participation (Townsend); comparable; regularly published (HBAI). Weaknesses: move with the median (recession effect); measure inequality as much as hardship; ignore wealth and costs; equivalisation choices. Supplement with deprivation, absolute and minimum income measures. | Strengths ; Median problem ; Inequality critique ; Alternatives ; Judgement

## Demographic analysis
LV: Intermediate · Application
S: Demographic analysis measures and explains population size, structure and change through births, deaths and migration. This lesson explains key demographic rates and how to calculate and interpret them using real data.
O: Define crude birth and death rates, the total fertility rate and life expectancy
O: Calculate natural increase and interpret population change
O: Explain why age structure affects crude rates
PRE: Probability for social research
H: Key measures
- **Crude birth rate**: births per 1,000 population per year.
- **Crude death rate**: deaths per 1,000 population per year.
- **Natural increase**: birth rate minus death rate (per 1,000, or divided by 10 for a percentage).
- **Total fertility rate (TFR)**: the average number of children a woman would have at current age-specific rates; about 2.1 is replacement level in low-mortality countries.
- **Life expectancy at birth**: average years a newborn would live at current death rates.
IX: transition
X: Using World Bank data for 2023
> Nigeria: about 33 births and 12 deaths per 1,000, natural increase about 21 per 1,000 (2.1% a year).
> United Kingdom: about 10 births and 9.5 deaths per 1,000, natural increase under 0.1% a year.
> Japan: about 6 births and 13 deaths per 1,000: natural decrease.
P: Demographers project future populations by applying assumptions about fertility, mortality and migration to the current age structure; projections are scenarios, not forecasts.
K: Demographic rates describe how populations grow and age; crude rates must be interpreted alongside age structure.
H: Why age structure matters
P: Crude rates depend on age structure as well as behaviour. Japan's crude death rate is higher than Nigeria's not because health is worse, but because a much larger share of its population is old. **Age-standardised** rates and life expectancy remove this effect. Population change also depends on **migration**: the UK's population has grown mainly through net migration in recent decades.
!: Comparing crude death rates between countries with very different age structures as if they showed health.
EV: established | In 2023 Japan's crude death rate exceeded its crude birth rate (World Bank).
EV: established | Crude rates are affected by age structure, so age-standardised measures are used for comparisons.
T: Crude birth rate | Births per 1,000 population per year
T: Total fertility rate | The average number of children per woman at current age-specific fertility rates
T: Age-standardisation | Adjusting rates to remove the effect of differing age structures
SUM: Demographers use crude rates, fertility rates and life expectancy to describe populations.
SUM: Age structure distorts crude rates; migration also drives population change.
SRC: World Bank, World Development Indicators: crude birth rate (SP.DYN.CBRT.IN) and crude death rate (SP.DYN.CDRT.IN) | data | 2026-11-01 | https://data.worldbank.org/indicator/SP.DYN.CBRT.IN
SRC: United Nations, World Population Prospects | data | 2026-11 | https://population.un.org/wpp/
Q: What is the total fertility rate? | The average number of children a woman would have at current age-specific fertility rates.
Q: Why is age-standardisation used? | To remove the effect of different age structures when comparing rates.
M1#sociology-u18-19-q1@1: Births per 1,000 population per year is the… | Crude birth rate | Total fertility rate | Life expectancy | Infant mortality rate | The crude birth rate is a simple rate per 1,000 people.
NUM2#sociology-u18-19-q2@2: A country has a crude birth rate of 18 and a crude death rate of 8 per 1,000. What is the natural increase as a percentage per year? | 1 | 0.01 | % | (18 − 8) ÷ 10 = 1% per year.
M2#sociology-u18-19-q3@2: Japan's crude death rate is higher than Nigeria's. What is the best explanation? | Japan has a much older population | Japan's healthcare is worse | Nigeria has no deaths | Crude rates measure health directly | Age structure, not health, drives the difference.
M3#sociology-u18-19-q4@3: The UK's natural increase is near zero, yet its population has grown. Why? | Net migration has added to the population | Death rates are negative | The census is wrong | Fertility is above replacement | Population change depends on migration as well as natural change.
SA2#sociology-u18-19-q5@2,3: Using the 2023 figures for Nigeria and Japan, explain what their birth and death rates suggest about population structure and change. | Nigeria: high births (about 33) and lower deaths (about 12), natural increase about 2.1% a year, a young population (about 41% under 15) and rapid growth. Japan: low births (about 6) and higher deaths (about 13), natural decrease, an old population (about 29% aged 65+). Crude rates reflect age structure as well as behaviour. | Nigeria ; Japan ; Natural increase ; Age structure ; Interpretation

## Census data
LV: Introductory · Application
S: A census counts every person and household in a country at one point in time. This lesson explains how UK censuses work, what they are used for, their strengths and limitations, and debates about their future.
O: Describe the purpose and coverage of a census
O: Explain the strengths of census data for sociological research
O: Evaluate limitations of census data, including undercount and question design
PRE: Secondary data
H: Counting everyone
P: A **census** aims to collect information about every person and household. In the UK, censuses are normally held every ten years: the most recent were in England and Wales (21 March 2021) and Northern Ireland (2021), and in Scotland (2022). They ask about age, sex, household composition, ethnicity, religion, health, qualifications, work and housing.
H: Uses and strengths
P: Because it covers everyone, a census gives reliable figures for **small areas and small groups** that surveys can't, and acts as the benchmark for population estimates and survey weighting. It is used to plan services (schools, hospitals), allocate funding and study social change over decades. Anonymised samples and aggregate tables are available to researchers.
X: Asking new questions
> The 2021 census in England and Wales asked, for the first time, voluntary questions on sexual orientation and gender identity for people aged 16 and over.
> These produced the first official national estimates of these populations.
> The gender identity question's wording was debated after publication, showing how question design affects results.
K: Censuses provide comprehensive, small-area data that underpin population statistics, but are infrequent and depend on question design and response.
H: Limitations
P: Censuses are expensive and infrequent, so data date quickly. Some groups are **undercounted** (for example, highly mobile young adults, homeless people and some migrant groups), though statistical adjustment is used. Categories (such as ethnicity) reflect official choices and change between censuses, complicating comparison. The ONS has considered moving towards greater use of administrative data in future.
!: Assuming census categories are neutral. How ethnicity or religion is asked shapes the answers people can give.
EV: established | The most recent census in England and Wales took place on 21 March 2021.
EV: contested | Whether future censuses should be replaced by administrative data is debated.
T: Census | A count of every person and household in a country at a point in time
T: Undercount | Failure of a census to count some people, often in particular groups
SUM: Censuses count everyone, providing small-area data and population benchmarks.
SUM: They are infrequent, costly, subject to undercount and shaped by question design.
SRC: Office for National Statistics, Census 2021 | data | 2026-11 | https://www.ons.gov.uk/census
SRC: National Records of Scotland, Scotland's Census 2022 | data | 2026-11 | https://www.scotlandscensus.gov.uk/
Q: When was the most recent census in England and Wales? | 21 March 2021.
Q: Why are censuses valuable for small areas? | They cover everyone, so they give reliable figures for small places and groups that surveys can't.
M1#sociology-u18-20-q1@1: How often are UK censuses normally held? | Every ten years | Every year | Every five years | Every 50 years | UK censuses are normally held every ten years, most recently in 2021 (2022 in Scotland).
M2#sociology-u18-20-q2@2: A census misses many young adults who move frequently. What is this? | Undercount | Attrition | Interviewer effect | Sampling error | Failing to count some people is undercount.
TF2#sociology-u18-20-q3@2: The 2021 census in England and Wales included voluntary questions on sexual orientation and gender identity. | true | They were asked for the first time, to people aged 16 and over.
M3#sociology-u18-20-q4@3: Why is comparing ethnicity data across censuses difficult? | Categories and wording change between censuses | Ethnicity isn't asked | Censuses only count households | Data are destroyed after each census | Changing categories mean groups aren't defined identically.
SA3#sociology-u18-20-q5@3: Evaluate the census as a source of data for sociologists. | Strengths: near-complete coverage, small areas and small groups, benchmark for other data, long time series, legally required response. Weaknesses: infrequent and quickly dated, costly, undercount of some groups, official categories and changing questions, limited depth. Administrative data debate. | Coverage ; Small-area value ; Frequency ; Undercount ; Categories

## Survey data
LV: Intermediate · Application
S: Large social surveys are the workhorses of quantitative sociology. This lesson introduces key UK and international surveys, how to access them, and the techniques needed to analyse them properly, such as weighting.
O: Describe major social surveys and how researchers access them
O: Explain weighting and why it is used
O: Evaluate the use of large-scale survey data
PRE: Surveys
H: Major surveys
- **Labour Force Survey**: employment and unemployment in the UK, quarterly.
- **British Social Attitudes**: social and political attitudes since 1983.
- **Understanding Society**: a household panel from 2009.
- **Crime Survey for England and Wales**: experiences of crime.
- **European Social Survey** and **World Values Survey**: cross-national attitudes.
P: Many are available to researchers through the **UK Data Service**, usually after registration, with documentation describing sampling, questions and weights.
H: Weighting
P: **Weights** adjust a sample so it better represents the population: correcting for unequal chances of selection (design weights) and for non-response or imbalances by age, sex and region (post-stratification weights). Analyses that ignore weights can give biased estimates; analyses that ignore the survey design (clustering, stratification) can understate standard errors.
X: Using British Social Attitudes data
> A researcher downloads data on attitudes to same-sex relationships across several years.
> Using the supplied weights, they estimate the percentage saying such relationships are "not wrong at all" each year.
> They report confidence intervals and note that question wording stayed the same, so trends are comparable.
K: Large social surveys give high-quality, representative data for secondary analysis, provided weighting, survey design and question consistency are handled correctly.
H: Evaluation
P: Strengths: large, well-designed samples, long time series, rich documentation, cheap for researchers. Limitations: questions designed by others; falling response rates; changes in mode (such as moving online) can affect comparability; and surveys may miss people in institutions or without fixed addresses.
!: Analysing survey data without weights or without checking whether questions changed across years.
EV: established | Survey weights adjust for unequal selection probabilities and non-response.
EV: contested | How much changes in survey mode affect long-term trend comparisons is debated.
T: Survey weight | A value adjusting each respondent's influence so the sample better represents the population
T: Survey design | The sampling structure (strata, clusters) that affects how standard errors are calculated
SUM: Major surveys such as the LFS, BSA and Understanding Society are accessed through the UK Data Service.
SUM: Weighting, survey design and question consistency must be handled for valid analysis.
SRC: UK Data Service, data collections and guidance | data | 2026-11 | https://ukdataservice.ac.uk/
SRC: National Centre for Social Research, British Social Attitudes survey | data | 2026-11 | https://natcen.ac.uk/british-social-attitudes
Q: What is a survey weight? | A value adjusting each respondent's influence so the sample better represents the population.
Q: Name three major UK social surveys. | Any three of the Labour Force Survey, British Social Attitudes, Understanding Society, Crime Survey for England and Wales.
M1#sociology-u18-21-q1@1: Through which service do UK researchers typically access major survey data sets? | The UK Data Service | The Royal Mail | Companies House | The Met Office | The UK Data Service archives and distributes social survey data.
M2#sociology-u18-21-q2@2: A survey under-represents young men because they responded less. What should analysts do? | Apply post-stratification weights | Delete all young men | Ignore the problem | Report only raw counts | Weights adjust for known imbalances in response.
TF2#sociology-u18-21-q3@3: Changing a survey from face-to-face to online interviewing can affect comparability of trends. | true | Mode changes can alter who responds and how they answer.
M3#sociology-u18-21-q4@3: What happens if clustered survey designs are analysed as simple random samples? | Standard errors are usually understated | Estimates become unbiased | Sample size increases | Weights become unnecessary | Clustering reduces effective sample size, so ignoring it overstates precision.
SA3#sociology-u18-21-q5@3: Evaluate the use of large social surveys such as British Social Attitudes for studying changing attitudes. | Strengths: representative samples, long time series with consistent questions, weights, documentation, free access. Limits: social desirability, falling response, mode changes, questions designed by others, closed questions miss meaning, excluded groups. | Strengths ; Trend value ; Response and mode ; Measurement limits ; Judgement

## Social network analysis in practice
LV: Advanced · Application
S: This lesson takes social network analysis from concepts to practice: collecting network data, choosing measures and interpreting results, with classic and contemporary examples.
O: Describe methods of collecting whole-network and ego-network data
O: Calculate and interpret degree and density for a small network
O: Evaluate network studies, including missing data and causal inference
PRE: Social network analysis
H: Two kinds of network data
- **Whole-network** data map all ties within a bounded group (a school year, a firm), usually by asking each member to name others.
- **Ego-network** data ask a sample of individuals (egos) about their own contacts (alters) and the ties among them; suited to surveys of large populations.
P: Data can also come from records (emails, co-authorship, board memberships) and online platforms.
IX: network
H: Measures in practice
P: **Degree** counts ties; **density** = actual ties ÷ possible ties, where an undirected network of n nodes has n(n − 1) ÷ 2 possible ties; **betweenness** identifies brokers; **components** identify disconnected groups. Bearman, Moody and Stovel (2004) mapped romantic and sexual partnerships in a US high school and found a long chain-like structure linking many students, with implications for disease spread.
X: A small network calculation
> A youth club has 6 members and 9 friendship ties.
> Possible ties = 6 × 5 ÷ 2 = 15; density = 9 ÷ 15 = 0.6.
> One member with only two ties links two otherwise separate cliques, so has high betweenness: a broker.
K: Network analysis in practice requires choosing whole- or ego-network data, collecting ties carefully and interpreting measures in context.
H: Challenges
P: **Missing data** (people who don't respond) can distort whole-network measures. **Boundary specification** (who counts as inside the network) shapes results. Separating **influence** (friends change each other) from **homophily** (similar people become friends) requires longitudinal data and careful models. Network data describe third parties who didn't consent, raising ethical issues.
!: Treating a network map as complete when a fifth of members didn't respond. Missing nodes change measures substantially.
EV: established | Missing data and boundary choices substantially affect network measures.
EV: contested | Whether influence can be reliably separated from homophily in observational network data is debated.
T: Ego network | A network centred on one individual, their contacts and ties among those contacts
T: Whole network | All ties among members of a bounded group
T: Homophily | The tendency for similar people to form ties
SUM: Network data can be whole-network or ego-network, from surveys, records or digital traces.
SUM: Measures such as density and betweenness must be interpreted with attention to missing data, boundaries and homophily.
SRC: Bearman P. S., Moody J. and Stovel K., "Chains of affection: the structure of adolescent romantic and sexual networks", American Journal of Sociology 110(1):44–91 | primary | 2004 | https://doi.org/10.1086/386272
SRC: Wasserman S. and Faust K., Social Network Analysis: Methods and Applications, Cambridge University Press | secondary | 1994
Q: What is an ego network? | A network centred on one person, their contacts and the ties among those contacts.
Q: How many possible ties are there in an undirected network of n nodes? | n(n − 1) ÷ 2.
M1#sociology-u18-22-q1@1: Mapping every friendship among all pupils in one school year produces… | Whole-network data | Ego-network data | Census data | Aggregate data | All ties within a bounded group form a whole network.
NUM2#sociology-u18-22-q2@2: A network has 8 members and 14 ties. Possible ties = 8 × 7 ÷ 2 = 28. What is the density? | 0.5 | 0.001 | proportion | Density = 14 actual ties ÷ 28 possible ties = 0.5.
M2#sociology-u18-22-q3@2: In a whole-network study, 25% of members don't respond. What is the main concern? | Missing nodes distort measures | Density becomes exactly zero | The network becomes larger | Homophily disappears | Missing data can greatly change network measures.
M3#sociology-u18-22-q4@3: Why is longitudinal network data needed to study influence? | To separate influence from homophily | To increase the number of nodes | To avoid needing consent | To remove all ties | Timing helps distinguish influence from homophily.
SA3#sociology-u18-22-q5@2,3: Design a network study of how information about jobs spreads among young adults in one town, and identify two challenges. | Ego-network survey of a random sample of young adults: name up to five contacts, their occupations and how they know them; measure diversity of weak ties; link to job outcomes over time. Challenges: recall and missing contacts; homophily versus influence; consent for named contacts; boundary of the town. | Design ; Measures ; Link to outcomes ; Challenge one ; Challenge two

## Computational sociology
LV: Advanced · Application
S: Computational sociology uses computers to model and analyse social processes, from agent-based simulations to large-scale analysis of digital data. This lesson introduces its main approaches and the debates about what computation adds to sociology.
O: Describe agent-based modelling and computational text and network analysis
O: Explain what Schelling's segregation model shows
O: Evaluate the contribution and limits of computational sociology
PRE: Social network analysis in practice
H: Approaches
- **Agent-based modelling** simulates many individuals (agents) following simple rules, to see what patterns emerge.
- **Computational text analysis** uses algorithms to analyse large volumes of text (news, parliamentary speeches, social media).
- **Large-scale network analysis** of digital interactions.
- **Machine learning** to classify, predict or find patterns in large data sets.
P: Lazer and colleagues (2009) argued that "computational social science" could transform understanding of social life using digital data and computing power.
H: Schelling's segregation model
P: Schelling (1971) placed two types of agent on a grid. Each agent moved if fewer than a certain share of its neighbours were like itself. Even when agents were content with being in a mixed neighbourhood (for example, satisfied if only a third of neighbours were similar), the grid quickly became highly segregated.
X: What the model does and doesn't show
> It shows that strong segregation can emerge from mild individual preferences: macro patterns needn't match micro intentions.
> It doesn't show that real segregation is caused only by preferences: housing markets, discrimination and income also matter.
> Models are tools for thinking through mechanisms, to be tested against evidence.
K: Computational sociology uses simulation and large-scale data analysis to explore how social patterns emerge from interactions.
H: Evaluation
P: Strengths: can study emergence, test the consequences of assumptions, and analyse data at enormous scale. Limitations: models simplify heavily; big data may be unrepresentative or created by platforms for other purposes; algorithms can embed biases; and pattern-finding without theory risks spurious results. Many argue computational methods work best combined with theory and qualitative insight.
!: Treating a simulation's output as evidence about the real world. Models show what could happen given their assumptions.
EV: established | Schelling's model shows that strong segregation can emerge from mild individual preferences.
EV: contested | How much computational methods change sociological explanation, rather than adding tools, is debated.
T: Agent-based model | A simulation in which many agents follow simple rules, producing emergent patterns
T: Emergence | Macro-level patterns arising from interactions that no individual intended
SUM: Computational sociology includes agent-based modelling, text analysis, network analysis and machine learning.
SUM: Schelling's model shows emergence; models and big data need theory and caution.
SRC: Schelling T. C., "Dynamic models of segregation", Journal of Mathematical Sociology 1(2):143–186 | primary | 1971 | https://doi.org/10.1080/0022250X.1971.9989794
SRC: Lazer D. et al., "Computational social science", Science 323(5915):721–723 | primary | 2009 | https://doi.org/10.1126/science.1167742
Q: What is an agent-based model? | A simulation in which many agents follow simple rules, so that larger patterns emerge from their interactions.
Q: What did Schelling's model show? | Strong segregation can emerge from mild individual preferences.
M1#sociology-u18-23-q1@1: Who developed the classic dynamic model of segregation? | Thomas Schelling | Émile Durkheim | Mark Granovetter | Anthony Giddens | Thomas Schelling published his dynamic models of segregation in 1971.
M2#sociology-u18-23-q2@2: A simulation shows that rumours spread fastest in networks with a few highly connected hubs. How should this be treated? | As a hypothesis to test against real data | As proof about all real rumours | As irrelevant to sociology | As a measure of individual personality | Models generate testable predictions; they don't prove real-world claims.
TF2#sociology-u18-23-q3@3: Schelling's model shows that residential segregation is caused only by residents' preferences. | false | It shows preferences could produce segregation; real segregation also reflects markets, discrimination and income.
M3#sociology-u18-23-q4@3: Why do critics warn about analysing big data without theory? | Patterns may be spurious artefacts | Big data are always too small | Theory makes data less accurate | Algorithms can't find patterns | Without theory, correlations in huge data sets can mislead.
SA3#sociology-u18-23-q5@3: Evaluate the contribution of computational sociology. | Contributions: emergence (Schelling), testing assumptions, scale, new data. Limits: simplification; unrepresentative digital data; algorithmic bias; spurious patterns; ethics of data use. Best combined with theory and qualitative work. | Approaches ; Schelling example ; Strengths ; Limits ; Judgement

## Digital trace data
LV: Advanced · Evaluation
S: Digital trace data are records left by online and digital activity: posts, searches, clicks, transactions and phone movements. This lesson explains how sociologists use them, and the problems of representativeness, platform control and ethics.
O: Define digital trace data and give examples
O: Explain the advantages of digital traces compared with surveys
O: Evaluate problems of representativeness, measurement and ethics in digital trace research
PRE: Computational sociology
H: Found data
P: Unlike survey data, which are designed by researchers, **digital trace data** are created as a by-product of activity: social media posts, search queries, mobile phone location data, online purchases, transport card records. Salganik (2018) calls them "found data", in contrast to "designed" survey data.
H: Advantages
P: Digital traces capture what people actually do, often continuously and at huge scale, reducing reliance on memory and self-report. They allow study of real-time events, large networks and behaviour across whole populations of platform users.
X: The lesson of Google Flu Trends
> Google Flu Trends estimated flu levels from search queries and initially tracked official data well.
> Later it badly overestimated flu, partly because search behaviour and Google's own algorithms changed.
> Lazer et al. (2014) called this a parable of "big data hubris": volume of data doesn't guarantee validity.
K: Digital trace data reveal behaviour at scale, but they are shaped by who uses platforms and how platforms work, and raise serious ethical questions.
H: Problems
- **Representativeness**: platform users aren't the population; a few users produce most content.
- **Algorithmic confounding**: platform design and algorithms shape behaviour and what is recorded.
- **Access**: platforms control data and can restrict or change access.
- **Measurement**: traces are proxies (a "like" isn't an attitude).
- **Ethics**: consent, privacy, re-identification and the use of data in ways users didn't expect.
!: Assuming public social media data represent public opinion. Users and posts are highly unrepresentative.
EV: established | Google Flu Trends overestimated flu prevalence substantially in later years (Lazer et al., 2014).
EV: contested | How to obtain meaningful consent for research using digital traces is debated.
T: Digital trace data | Records created as a by-product of digital activity, such as posts, searches and transactions
T: Algorithmic confounding | Distortion of behaviour and data by the design and algorithms of platforms
SUM: Digital traces record behaviour at scale, as "found" rather than designed data.
SUM: Representativeness, platform effects, access, measurement and ethics limit their use.
SRC: Lazer D. et al., "The parable of Google Flu: traps in big data analysis", Science 343(6176):1203–1205 | primary | 2014 | https://doi.org/10.1126/science.1248506
SRC: Salganik M. J., Bit by Bit: Social Research in the Digital Age, Princeton University Press | secondary | 2018
Q: What are digital trace data? | Records created as a by-product of digital activity, such as posts, searches and transactions.
Q: What lesson did Google Flu Trends teach? | Large volumes of data don't guarantee validity; changes in platforms and behaviour can make predictions fail.
M1#sociology-u18-24-q1@1: Which is an example of digital trace data? | Transport smart-card records | A face-to-face interview | A census questionnaire | A focus group transcript | Card records are created as a by-product of travel.
M2#sociology-u18-24-q2@2: A study uses tweets to measure national attitudes to immigration. What is the main problem? | Users aren't representative | Tweets are always fake | There is too little data | Tweets can't be analysed | Platform users and active posters differ from the population.
TF2#sociology-u18-24-q3@3: Data being publicly visible online removes all ethical concerns about using it in research. | false | Consent, privacy, harm and re-identification remain concerns.
M3#sociology-u18-24-q4@3: What is algorithmic confounding? | Platform design shaping behaviour and the data recorded | Random error in surveys | Researchers making arithmetic mistakes | A type of sampling frame | Recommendation systems and design change what users do and see.
SA3#sociology-u18-24-q5@3: Evaluate the use of digital trace data in sociological research. | Strengths: real behaviour, scale, real time, networks, less self-report bias. Weaknesses: unrepresentative users; algorithmic confounding; platform access and control; proxies (likes are not attitudes); ethics (consent, privacy, re-identification); Google Flu lesson. Best combined with designed data and theory. | Strengths ; Representativeness ; Platform effects or access ; Ethics ; Judgement

## Reproducible research
LV: Intermediate · Application
S: Reproducible research means others can follow and repeat every step from raw data to published findings. This lesson explains why reproducibility matters in social research and the practices that achieve it.
O: Distinguish reproducibility, replicability and transparency
O: Describe practices that make social research reproducible
O: Evaluate the challenges of reproducibility for quantitative and qualitative research
PRE: Survey data
H: Why it matters
P: **Reproducibility** means another researcher using the same data and code gets the same results. **Replicability** means new data give consistent findings. Both depend on **transparency**: clear reporting of methods, decisions and data. Errors in published analyses, including influential policy-relevant ones, have been found when others reran the analysis, showing why checking matters.
H: Practices
- Script analyses (R, Python, Stata) rather than pointing and clicking without records.
- Keep raw data unchanged; document every cleaning and recoding step.
- Use version control and clear file organisation.
- Share code, documentation and, where ethical and permitted, data (often via the UK Data Service).
- Preregister hypotheses and analysis plans for confirmatory research.
X: A reproducible survey analysis
> A researcher downloads Understanding Society data from the UK Data Service.
> A script recodes variables, applies weights, runs models and creates tables and figures.
> The script and a codebook are published; others with data access can reproduce every number.
K: Reproducible research scripts and documents every step so others can check, correct and build on findings.
H: Challenges
P: Licensing restricts sharing some survey and administrative data, though code can still be shared. Qualitative data raise confidentiality issues, but researchers can share coding frameworks, audit trails and anonymised extracts where consented. Incentives in academic careers don't always reward the time needed.
!: Thinking reproducibility only matters for statistics. Qualitative research also benefits from transparent, documented analysis.
EV: established | Publishing analysis code allows independent checking of results.
EV: contested | How far qualitative research should and can be made reproducible is debated.
T: Reproducibility | Getting the same results from the same data and code
T: Transparency | Clear reporting of methods, decisions and data so others can evaluate research
SUM: Reproducibility requires scripted, documented analysis and sharing of code and, where possible, data.
SUM: Licensing, confidentiality and incentives make it challenging, especially for qualitative work.
SRC: Peng R. D., "Reproducible research in computational science", Science 334(6060):1226–1227 | primary | 2011 | https://doi.org/10.1126/science.1213847
SRC: Freese J. and Peterson D., "Replication in social science", Annual Review of Sociology 43:147–165 | primary | 2017 | https://doi.org/10.1146/annurev-soc-060116-053450
Q: What is the difference between reproducibility and replicability? | Reproducibility: same data and code give the same results; replicability: new data give consistent findings.
Q: Name two practices that support reproducible research. | Any two of scripting analyses, keeping raw data unchanged, documenting steps, version control, sharing code and data, preregistration.
M1#sociology-u18-25-q1@1: Which practice most directly allows others to rerun an analysis? | Sharing the analysis script | Using a larger sample | Writing a longer report | Choosing a different test | A script records each step so it can be repeated.
M2#sociology-u18-25-q2@2: A researcher can't share licensed survey data. How can the analysis still be reproducible? | Share the code alone | Share nothing | Change the data before sharing | Report only conclusions | Others who obtain the data can rerun the shared code.
TF2#sociology-u18-25-q3@3: Reproducibility is irrelevant to qualitative research. | false | Transparent documentation of coding and decisions benefits qualitative research too.
M3#sociology-u18-25-q4@3: Why do some published analyses fail to reproduce from the authors' own data? | Undocumented cleaning and analysis steps | The data were too large | The analysis was preregistered | The results were not significant | Hidden decisions between raw data and results are a common cause.
SA2#sociology-u18-25-q5@2,3: Describe how you would make a secondary analysis of British Social Attitudes data reproducible. | Obtain data from the UK Data Service; write a script for all recoding, weighting and analysis; keep raw data unchanged; record software versions; use version control; document decisions in a codebook; share code (data via the archive); check by rerunning from scratch. | Data access ; Scripted analysis ; Documentation ; Sharing ; Rerun check
`;
