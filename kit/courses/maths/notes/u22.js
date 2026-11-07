// School 22: Time Series and Forecasting. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Foundations, smoothing and ARIMA, multivariate and state-space models, volatility and change, and forecasting in practice.
export default `
## Time Series Analysis
S: A time series is a sequence of observations ordered in time, such as monthly sales, daily temperatures or heartbeats. Time series analysis describes their patterns, models how today depends on the past, and uses that to forecast, while respecting that observations aren't independent.
O: Identify trend, seasonal, cyclical and irregular components
O: Explain why dependence over time changes statistical methods
T: Time series | Observations y₁, y₂, …, y_{T} recorded at successive times, usually equally spaced
T: Serial dependence | Correlation between observations at different times, which violates the independence assumed by many methods
H: What to look for
- Trend: long-run increase or decrease.
- Seasonality: fixed-period patterns (weekly, yearly).
- Cycles: irregular longer fluctuations (business cycles).
- Noise, outliers and level shifts.
H: First steps
- Always plot the series against time.
- Check the frequency and look for missing values.
- Transform to stabilise variance (logs, Box–Cox).
- Look at autocorrelation plots.
H: Why it's different
- Standard errors assuming independence are wrong.
- Random walks can show spurious trends.
- Training and test sets must respect time order.
- Models: smoothing, ARIMA, state-space, machine learning.
X: Monthly ice-cream sales rise each year and peak every July. Name the components.
> The year-on-year rise is a trend
> The July peak every 12 months is seasonality
> What remains after removing these is the irregular (noise) component
K: Time series are ordered observations with trend, seasonality, cycles and noise; serial dependence changes inference; plot first, transform if needed, and respect time order when testing.
!: Randomly splitting a time series into training and test sets, which leaks future information.
Q: What is seasonality? | A pattern that repeats with a fixed period.
Q: Why can't time series be split randomly for testing? | Future values would inform past predictions.
SUM: Order matters in time series.
SUM: Patterns guide model choice.
SRC: Hyndman RJ, Athanasopoulos G, Forecasting: Principles and Practice (3rd edn, OTexts 2021) | textbook | 2021 | https://otexts.com/fpp3/
SRC: Chatfield C, Xing H, The Analysis of Time Series: An Introduction with R (7th edn, CRC Press 2019) | textbook | 2019 | https://www.routledge.com/
NUM1#maths-u22-01-q1@1: A series is recorded every hour with a daily cycle. What is the seasonal period in observations? | 24 | 0 | observations | One day contains 24 hourly observations, so the period is 24.
M1#maths-u22-01-q2@1: Which component describes a long-run upward movement in a series? | The trend | The seasonal component | The irregular component | The lag | The residual autocorrelation | A trend is a persistent long-term change in level.
M2#maths-u22-01-q3@2: Why can ordinary regression standard errors mislead with time series data? | Serially correlated errors make the effective sample size smaller than the number of observations | Time series have no random errors, so standard errors are always exactly zero | Regression can't use time as a variable, so its standard errors are undefined | Standard errors are always too large with time series, making tests too cautious | They don't mislead; independence makes no difference to regression inference | Positive autocorrelation means each observation adds less new information.

## Time Series Decomposition
S: Decomposition splits a series into trend–cycle, seasonal and remainder components. Seeing each separately helps understand the data, produce seasonally adjusted figures such as official unemployment rates, and build forecasts.
O: Distinguish additive and multiplicative decompositions
O: Describe classical, X-13 and STL decomposition methods
T: Additive decomposition | y_{t} = T_{t} + S_{t} + R_{t}, used when seasonal swings are roughly constant in size
T: Seasonally adjusted series | The data with the seasonal component removed: y_{t} − S_{t} (or y_{t}/S_{t} for multiplicative)
H: Additive or multiplicative
- Additive: seasonal effect is a fixed amount.
- Multiplicative: y_{t} = T_{t} × S_{t} × R_{t}, seasonal effect proportional to level.
- Logs turn multiplicative into additive.
H: Methods
- Classical: centred moving average for trend, then average seasonal deviations.
- X-11 and X-13ARIMA-SEATS: used by national statistics offices (ONS, US Census Bureau).
- STL (Seasonal and Trend decomposition using Loess): robust and flexible.
H: Uses and cautions
- Seasonally adjusted figures in news reports.
- Forecast each component, then recombine.
- End-point estimates get revised as new data arrive.
- Changing seasonality needs flexible methods.
X: A shop's December sales are 150 with an additive seasonal effect of +40 and trend 105. Find the remainder and the seasonally adjusted value.
> Remainder = 150 − 105 − 40 = 5
> Seasonally adjusted value = 150 − 40 = 110
> The adjusted figure shows the shop is slightly above trend
K: Decomposition separates trend, seasonal and remainder; additive suits constant swings and multiplicative proportional ones; X-13 and STL are standard; adjusted figures remove seasonality.
!: Using an additive decomposition when seasonal swings grow with the level.
Q: When is a multiplicative decomposition appropriate? | When seasonal swings grow with the level of the series.
Q: What does STL stand for? | Seasonal and Trend decomposition using Loess.
SUM: Split series into components.
SUM: Adjust for seasonality to see trends.
SRC: Cleveland RB, Cleveland WS, McRae JE, Terpenning I, STL: a seasonal-trend decomposition procedure based on loess, Journal of Official Statistics 6(1), 3 | journal | 1990 | https://www.scb.se/
SRC: Office for National Statistics, Guide to seasonal adjustment | guideline | 2023 | https://www.ons.gov.uk/methodology/methodologytopicsandstatisticalconcepts/seasonaladjustment
NUM1#maths-u22-02-q1@1: With a multiplicative seasonal index of 1.25 for December, what is the seasonally adjusted value of December sales of 500? | 400 | 0 |  | Divide by the seasonal index: 500/1.25 = 400.
M1#maths-u22-02-q2@1: Which decomposition suits a series whose seasonal peaks grow in proportion to its level? | Multiplicative | Additive | Linear trend only | No decomposition | Differencing only | Multiplicative seasonal factors scale with the trend.
M2#maths-u22-02-q3@2: Why are seasonally adjusted figures at the end of a series often revised? | Trend and seasonal estimates near the end use fewer future observations, so they change as new data arrive | Statisticians change their adjustment methods every month for consistency | The raw data are always wrong when first published, so they're replaced | Revisions are never made to seasonally adjusted figures once released | Seasonality disappears from the latest data, so the adjustment is redone | Centred filters need data on both sides; at the end, forecasts fill in until actual values come.

## Trend Analysis
S: Trend analysis estimates the long-run direction of a series and asks whether an apparent trend is real. Linear and nonlinear fits, smoothing filters and tests for unit roots distinguish deterministic trends from random-walk drift.
O: Fit and interpret linear and exponential trends
O: Distinguish deterministic trends from stochastic trends (unit roots)
T: Deterministic trend | A trend that is a fixed function of time, such as y_{t} = a + bt + ε_{t}
T: Stochastic trend | A trend generated by accumulated random shocks, as in a random walk y_{t} = y_{t−1} + δ + ε_{t}
H: Estimating trends
- Linear regression on time; exponential trends via log(y).
- Local smoothing: moving averages, loess, Hodrick–Prescott filter.
- Piecewise trends with breaks.
H: Deterministic versus stochastic
- Deterministic: shocks fade, series returns to the trend line.
- Stochastic (unit root): shocks persist forever.
- Tests: augmented Dickey–Fuller, KPSS.
- Choice affects forecasts and their uncertainty.
H: Cautions
- Regressing one trending series on another gives spurious correlation (Granger and Newbold 1974).
- Extrapolating trends far ahead is risky.
- Mann–Kendall test for monotonic trends (climate data).
X: A log-linear trend fit gives log y = 2 + 0.03t (t in years). Interpret the slope.
> The slope 0.03 in logs means growth of about 3% a year
> Exactly e^{0.03} − 1 ≈ 3.05%
> The series roughly doubles every ln 2/0.03 ≈ 23 years
K: Trends are estimated by regression or smoothing; log-linear slopes give growth rates; deterministic and stochastic trends behave differently under shocks; unit root tests tell them apart; beware spurious regressions.
!: Regressing two independent random walks on each other and reporting a strong relationship.
Q: What does a unit root imply about shocks? | They have permanent effects.
Q: Which test checks for a unit root? | The augmented Dickey–Fuller test.
SUM: Trends describe long-run direction.
SUM: Know whether shocks persist.
SRC: Granger CWJ, Newbold P, Spurious regressions in econometrics, Journal of Econometrics 2(2), 111 | journal | 1974 | https://doi.org/10.1016/0304-4076(74)90034-7
SRC: Dickey DA, Fuller WA, Distribution of the estimators for autoregressive time series with a unit root, Journal of the American Statistical Association 74(366), 427 | journal | 1979 | https://doi.org/10.1080/01621459.1979.10482531
NUM1#maths-u22-03-q1@1: A linear trend is y = 50 + 2.5t. What is the trend value at t = 12? | 80 | 0 |  | 50 + 2.5 × 12 = 50 + 30 = 80.
M1#maths-u22-03-q2@1: A series follows y_{t} = y_{t−1} + 0.5 + ε_{t}. What kind of trend does it have? | A stochastic trend (random walk with drift) | A deterministic linear trend | No trend | A seasonal trend | A quadratic trend | Accumulated shocks plus drift give a unit-root process.
M3#maths-u22-03-q3@2: Why do regressions between unrelated random walks often look significant? | Both series wander persistently, so they share apparent trends by chance, inflating R^{2} and t-statistics | Random walks are always related through their shared normal shocks | Regression removes the trends automatically, leaving real relationships | The regression errors are independent, so the tests are valid | They never look significant; random walks have zero correlation | Non-stationary errors invalidate standard inference (spurious regression).

## Seasonality
S: Seasonality is regular variation with a fixed period: higher energy use in winter, retail spikes at Christmas, rush-hour traffic. Detecting and modelling it, sometimes with several periods at once, is essential for accurate forecasts.
O: Detect seasonality from plots and autocorrelations
O: Model seasonality with dummies, Fourier terms or seasonal differencing
T: Seasonal period | m, the number of observations per cycle, such as 12 for monthly data with yearly seasonality
T: Fourier terms | Sine and cosine pairs sin(2πkt/m), cos(2πkt/m) used to represent smooth seasonal patterns
H: Detecting seasonality
- Seasonal plots and subseries plots.
- Spikes in the ACF at lags m, 2m, ….
- Peaks in the periodogram at frequency 1/m.
H: Modelling
- Seasonal dummy variables (one per season minus one).
- Fourier terms: few parameters for long periods (weekly data with m = 52.18).
- Seasonal differencing y_{t} − y_{t−m}.
- Seasonal ARIMA and seasonal exponential smoothing.
H: Complications
- Multiple seasonality: hourly electricity has daily and weekly cycles.
- Moving holidays (Easter) and trading-day effects.
- Changing seasonal patterns over time.
- Methods: TBATS, MSTL, Prophet.
X: Monthly data show ACF spikes at lags 12 and 24. What does this suggest, and how many dummies model it?
> Spikes at multiples of 12 indicate yearly seasonality in monthly data
> Use 12 − 1 = 11 seasonal dummies (one month is the baseline)
> Alternatively a few Fourier pairs if the pattern is smooth
K: Seasonality repeats with period m; it shows in plots, ACF spikes and periodogram peaks; dummies, Fourier terms or seasonal differencing model it; multiple and moving seasonality need special methods.
!: Including a dummy for every season as well as an intercept, causing perfect collinearity.
Q: What is m for quarterly data with yearly seasonality? | 4.
Q: How many dummies model monthly seasonality with an intercept? | 11.
SUM: Seasonality repeats with fixed period.
SUM: Choose a representation to suit the period.
SRC: Hyndman RJ, Athanasopoulos G, Forecasting: Principles and Practice (3rd edn, OTexts 2021) | textbook | 2021 | https://otexts.com/fpp3/
SRC: De Livera AM, Hyndman RJ, Snyder RD, Forecasting time series with complex seasonal patterns using exponential smoothing, Journal of the American Statistical Association 106(496), 1513 | journal | 2011 | https://doi.org/10.1198/jasa.2011.tm09771
NUM1#maths-u22-04-q1@1: Half-hourly electricity demand has a daily cycle. What is the seasonal period m? | 48 | 0 | observations | 24 hours × 2 observations per hour = 48.
M1#maths-u22-04-q2@1: Which ACF pattern suggests weekly seasonality in daily data? | Spikes at lags 7, 14 and 21 | A single spike at lag 1 | Spikes at lags 12 and 24 | A slow linear decay only | No spikes at all | With daily data a weekly cycle makes values correlate with those 7, 14 and 21 days earlier, so the ACF spikes at multiples of 7.
M2#maths-u22-04-q3@2: Why are Fourier terms preferred to dummies for weekly data with yearly seasonality? | A few sine–cosine pairs capture a smooth 52-week pattern with far fewer parameters than 51 dummies | Dummy variables can't model seasonality of any period length | Fourier terms need no data, since sine curves are fixed in advance | Weekly data have no seasonality, so Fourier terms just add noise | They aren't preferred; 51 dummies are always the better choice | Parsimony matters when the period is long.

## Stationarity
S: A stationary series has statistical properties that don't change over time: constant mean, variance and autocorrelation structure. Most classical models assume stationarity, so checking for it, and transforming the data to achieve it, comes first.
O: Define weak stationarity and recognise non-stationary series
O: Use unit root and stationarity tests and transformations
T: Weak stationarity | Constant mean, constant variance and autocovariance depending only on the lag, not on time
T: White noise | A sequence of uncorrelated variables with zero mean and constant variance, the simplest stationary series
H: Recognising non-stationarity
- Trends and changing means.
- Changing variance (growing swings).
- Seasonal patterns.
- ACF decaying very slowly.
H: Testing
- ADF test: null of a unit root (non-stationary).
- KPSS test: null of stationarity.
- Using both gives a clearer picture.
- Visual checks still matter.
H: Achieving stationarity
- Differencing removes stochastic trends.
- Logs or Box–Cox stabilise variance.
- Seasonal differencing removes seasonality.
- Detrending for deterministic trends.
X: Is a random walk y_{t} = y_{t−1} + ε_{t} stationary? What about its differences?
> Var(y_{t}) = tσ^{2} grows with time, so it isn't stationary
> Differences Δy_{t} = ε_{t} are white noise
> So the random walk is integrated of order 1, I(1)
K: Stationary series have constant mean, variance and lag-dependent autocovariance; ADF and KPSS tests check it; differencing, logs and seasonal differencing transform series towards stationarity.
!: Fitting an ARMA model to a trending series without differencing.
Q: What is the null hypothesis of the ADF test? | A unit root (non-stationarity).
Q: What is the variance of a random walk after t steps? | tσ^{2}.
SUM: Stationary means stable statistics.
SUM: Transform to reach stationarity.
SRC: Brockwell PJ, Davis RA, Introduction to Time Series and Forecasting (3rd edn, Springer 2016) | textbook | 2016 | https://link.springer.com/
SRC: Kwiatkowski D, Phillips PCB, Schmidt P, Shin Y, Testing the null hypothesis of stationarity against the alternative of a unit root, Journal of Econometrics 54, 159 | journal | 1992 | https://doi.org/10.1016/0304-4076(92)90104-Y
NUM1#maths-u22-05-q1@1: A random walk has shock variance σ^{2} = 4. What is the variance of y₂₅ (with y₀ = 0)? | 100 | 0 |  | Var(y_{t}) = tσ^{2} = 25 × 4 = 100.
M1#maths-u22-05-q2@1: Which series is weakly stationary? | White noise with constant variance | A random walk | A series with a linear trend | A series whose variance doubles each year | Monthly sales with growing seasonality | White noise has constant mean, variance and zero autocorrelation.
M3#maths-u22-05-q3@2: Why are the ADF and KPSS tests often used together? | They have opposite null hypotheses, so agreement between them gives stronger evidence | They are identical tests run twice for extra confidence | ADF tests seasonality only, while KPSS tests trends | KPSS can't detect stationarity, so ADF is needed instead | They are never combined, because their results always agree | ADF assumes a unit root and KPSS assumes stationarity; low power makes each alone inconclusive.

## Differencing
S: Differencing replaces a series by the changes between successive values. It removes stochastic trends and, with seasonal lags, seasonality, turning many non-stationary series into stationary ones ready for ARMA modelling.
O: Apply first, second and seasonal differences
O: Choose the order of differencing and recognise over-differencing
T: First difference | Δy_{t} = y_{t} − y_{t−1} = (1 − B)y_{t}, with backshift operator B
T: Integrated of order d | I(d): a series that becomes stationary after d differences
H: Types
- First difference removes a linear trend or random-walk behaviour.
- Second difference Δ^{2}y_{t} = y_{t} − 2y_{t−1} + y_{t−2} removes quadratic trends.
- Seasonal difference y_{t} − y_{t−m}.
- Log differences ≈ percentage growth rates.
H: Choosing d
- Unit root tests on the original and differenced series.
- Most economic series need d = 0, 1 or 2.
- KPSS-based automatic choice (as in auto.arima).
H: Over-differencing
- Differencing a stationary series introduces a unit root in the MA part.
- Signs: lag-1 autocorrelation near −0.5, larger variance.
- Forecasts become needlessly uncertain.
X: Difference the series 3, 5, 9, 15, 23 once and twice.
> First differences: 2, 4, 6, 8
> Second differences: 2, 2, 2
> Constant second differences show a quadratic trend (I(2) behaviour)
K: Differencing removes trends and seasonality; d differences make an I(d) series stationary; log differences give growth rates; over-differencing adds unwanted structure.
!: Differencing more than needed, which inflates forecast variance.
Q: What does the backshift operator B do? | By_{t} = y_{t−1}.
Q: What are log differences approximately? | Percentage growth rates.
SUM: Differences remove trends.
SUM: Don't over-difference.
SRC: Box GEP, Jenkins GM, Reinsel GC, Ljung GM, Time Series Analysis: Forecasting and Control (5th edn, Wiley 2015) | textbook | 2015 | https://www.wiley.com/
SRC: Hyndman RJ, Athanasopoulos G, Forecasting: Principles and Practice (3rd edn, OTexts 2021) | textbook | 2021 | https://otexts.com/fpp3/
NUM1#maths-u22-06-q1@1: Monthly values are 120 in January 2024 and 132 in January 2025. What is the seasonal (lag-12) difference? | 12 | 0 |  | y_{t} − y_{t−12} = 132 − 120 = 12.
M1#maths-u22-06-q2@1: A series becomes stationary after differencing twice. How is it described? | I(2) | I(1) | I(0) | Seasonal only | White noise | Integrated of order 2 needs two differences.
M2#maths-u22-06-q3@2: What sign suggests a series has been over-differenced? | A lag-1 autocorrelation near −0.5 in the differenced series | A lag-1 autocorrelation near +1 that decays very slowly | No autocorrelation at any lag in the differenced series | A growing trend that remains after the differencing | A single seasonal spike at lag 12 in the residuals | Differencing white noise gives an MA(1) with θ = −1 and ρ₁ = −0.5.

## Autocorrelation
S: Autocorrelation measures how strongly a series is correlated with its own past values. The autocorrelation function (ACF) summarises this at every lag, revealing trends, seasonality and the structure of MA models, and residual checks use it to test model fit.
O: Calculate and interpret sample autocorrelations
O: Use the ACF and Ljung–Box test to diagnose models
T: Autocorrelation function | ρ(k) = Cov(y_{t}, y_{t−k})/Var(y_{t}), the correlation at lag k
T: Ljung–Box test | A test of whether a group of autocorrelations is jointly zero, Q = T(T + 2) Σ r_{k}^{2}/(T − k)
H: Sample ACF
- r_{k} = Σ (y_{t} − ȳ)(y_{t−k} − ȳ)/Σ (y_{t} − ȳ)^{2}.
- Approximate 95% bounds for white noise: ±1.96/√T.
- Correlogram plots r_{k} against k.
H: Reading the ACF
- Slow decay: trend or unit root.
- Spikes at seasonal lags: seasonality.
- Cut-off after lag q: an MA(q) process.
- Exponential or damped sine decay: AR behaviour.
H: Diagnostics
- Model residuals should look like white noise.
- Ljung–Box on residuals tests overall fit.
- Durbin–Watson for regression residuals.
- Autocorrelation inflates or deflates standard errors.
X: With T = 100 observations, is a sample autocorrelation of 0.25 at lag 1 significant?
> 95% bounds: ±1.96/√100 = ±0.196
> 0.25 > 0.196
> So it's significant: the series is likely autocorrelated at lag 1
K: The ACF measures correlation with past values; ±1.96/√T bounds test single lags; patterns reveal trend, seasonality and MA order; Ljung–Box tests residuals for white noise.
!: Treating every ACF spike outside the bounds as meaningful when checking many lags.
Q: What are the approximate 95% ACF bounds for white noise? | ±1.96/√T.
Q: What should model residuals look like? | White noise.
SUM: Autocorrelation measures memory.
SUM: Use it to diagnose models.
SRC: Ljung GM, Box GEP, On a measure of lack of fit in time series models, Biometrika 65(2), 297 | journal | 1978 | https://doi.org/10.1093/biomet/65.2.297
SRC: Brockwell PJ, Davis RA, Introduction to Time Series and Forecasting (3rd edn, Springer 2016) | textbook | 2016 | https://link.springer.com/
NUM1#maths-u22-07-q1@1: For T = 400, what is the approximate 95% bound for sample autocorrelations of white noise, to 3 decimal places? | 0.098 | 0.001 |  | 1.96/√400 = 1.96/20 = 0.098.
M1#maths-u22-07-q2@1: Which ACF pattern suggests a non-stationary trending series? | Very slow decay from near 1 | A sharp cut-off after lag 1 | All values within the bounds | Alternating signs decaying fast | A single spike at lag 12 | Trends keep values correlated over many lags.
M3#maths-u22-07-q3@2: Why might about 1 in 20 ACF spikes cross the 95% bounds even for white noise? | Each bound is a 5% test, so checking many lags produces some false alarms by chance | White noise is always correlated at some lag, so spikes are real | The ±1.96/√T bounds are wrong for every sample size | ACFs are never random, so any spike indicates structure | It never happens with white noise; every spike is meaningful | Multiple testing means joint tests like Ljung–Box are more reliable.

## Partial Autocorrelation
S: The partial autocorrelation at lag k measures the correlation between y_{t} and y_{t−k} after removing the effects of the lags in between. The PACF cuts off for autoregressive models, making it the key tool for choosing AR order.
O: Interpret the partial autocorrelation function
O: Use ACF and PACF patterns to identify AR and MA orders
T: Partial autocorrelation | φ_{kk}, the coefficient of y_{t−k} in a regression of y_{t} on y_{t−1}, …, y_{t−k}
T: Box–Jenkins identification | Choosing ARIMA orders by matching sample ACF and PACF patterns to theoretical ones
H: Definition
- φ₁₁ = ρ(1).
- φ_{kk} is the last coefficient of the best AR(k) fit.
- Computed by the Durbin–Levinson recursion.
H: Identification patterns
- AR(p): PACF cuts off after lag p; ACF decays.
- MA(q): ACF cuts off after lag q; PACF decays.
- ARMA: both decay.
- Seasonal versions at lags m, 2m, ….
H: In practice
- Patterns in samples are noisy; use as a guide.
- Compare candidate models with AIC or BIC.
- Automatic selection (auto.arima) searches orders.
- Check residuals after fitting.
X: A sample PACF has a large spike at lag 1 and nothing significant after; the ACF decays geometrically. Which model is suggested?
> PACF cut-off after lag 1 indicates an AR(1)
> Geometric ACF decay confirms AR behaviour
> Fit y_{t} = c + φy_{t−1} + ε_{t}
K: The PACF measures direct correlation at each lag; AR(p) shows a PACF cut-off at p; MA(q) shows an ACF cut-off at q; Box–Jenkins uses these patterns, refined by information criteria.
!: Reading ACF and PACF patterns from short, noisy samples too literally.
Q: Which function cuts off for an AR(p) model? | The PACF, after lag p.
Q: Which function cuts off for an MA(q) model? | The ACF, after lag q.
SUM: PACF removes intermediate lags.
SUM: It identifies AR order.
SRC: Box GEP, Jenkins GM, Reinsel GC, Ljung GM, Time Series Analysis: Forecasting and Control (5th edn, Wiley 2015) | textbook | 2015 | https://www.wiley.com/
SRC: Shumway RH, Stoffer DS, Time Series Analysis and Its Applications (4th edn, Springer 2017) | textbook | 2017 | https://link.springer.com/
NUM1#maths-u22-08-q1@1: For an AR(1) with φ = 0.6, what is the partial autocorrelation at lag 2? | 0 | 0 |  | An AR(1) has no direct dependence on y_{t−2} once y_{t−1} is included, so φ₂₂ = 0.
M1#maths-u22-08-q2@1: A PACF shows significant spikes at lags 1 and 2 only, with a decaying ACF. Which model fits? | AR(2) | MA(2) | AR(1) | MA(1) | White noise | A PACF cut-off after lag 2 indicates two autoregressive terms.
M2#maths-u22-08-q3@2: Why do analysts compare information criteria after reading ACF and PACF plots? | Sample patterns are noisy and several models may look plausible, so AIC or BIC helps choose | ACF and PACF plots always identify the exact model, so criteria just confirm it | Information criteria replace fitting, so no estimation is needed afterwards | ACF and PACF plots are never useful, so only criteria should be used | They don't compare them; plots alone are the standard Box–Jenkins method | Criteria balance fit and complexity among candidate orders.

## Moving Averages
S: Moving averages smooth a series by averaging neighbouring values, revealing trends and removing noise or seasonality. Centred averages estimate trends, trailing ones support simple forecasts, and weighted versions give more importance to some points.
O: Calculate simple, centred and weighted moving averages
O: Use moving averages for trend estimation and simple forecasting
T: Centred moving average | An average of values symmetrically placed around time t, used to estimate the trend at t
T: 2 × m moving average | A moving average of a moving average, used to centre even-order averages such as 2 × 12 for monthly data
H: Types
- Simple trailing: (y_{t} + … + y_{t−k+1})/k.
- Centred: (y_{t−j} + … + y_{t+j})/(2j + 1).
- 2 × 12 MA for monthly seasonality (weights 1/24 at ends, 1/12 inside).
- Weighted moving averages.
H: Effects
- Larger windows give smoother curves but lag behind turning points.
- An m-period MA removes seasonality of period m.
- Trailing averages lag by (k − 1)/2 periods.
H: Uses
- Trend estimation in decomposition.
- Simple forecasts (the average of the last k values).
- Technical analysis in finance (moving-average crossovers).
- Not the same as MA(q) models (see MA Models).
X: Compute the 3-point centred moving average at times 2 and 3 for the series 4, 7, 10, 7, 4.
> At t = 2: (4 + 7 + 10)/3 = 7
> At t = 3: (7 + 10 + 7)/3 = 8
> The smoothing removes some of the up-and-down movement
K: Moving averages smooth by averaging neighbours; centred ones estimate trends; m-period averages remove period-m seasonality; larger windows smooth more but lag more.
!: Confusing moving-average smoothing with MA(q) time series models.
Q: Which moving average removes monthly seasonality? | A 2 × 12 (centred 12-month) moving average.
Q: What is the trade-off in choosing window size? | Smoothness against lag.
SUM: Average neighbours to smooth.
SUM: Windows trade smoothness for lag.
SRC: Hyndman RJ, Athanasopoulos G, Forecasting: Principles and Practice (3rd edn, OTexts 2021) | textbook | 2021 | https://otexts.com/fpp3/
SRC: Chatfield C, Xing H, The Analysis of Time Series: An Introduction with R (7th edn, CRC Press 2019) | textbook | 2019 | https://www.routledge.com/
NUM1#maths-u22-09-q1@1: What is the 4-period trailing moving-average forecast after observations 12, 15, 14 and 19? | 15 | 0 |  | (12 + 15 + 14 + 19)/4 = 60/4 = 15.
M1#maths-u22-09-q2@1: Why is a 2 × 12 moving average used for monthly data? | It centres the 12-month average on a single month while removing yearly seasonality | It doubles the amount of data available for estimating the trend | It removes all trends, leaving only the seasonal pattern | It needs only two months of data, which makes it quick | It isn't used; a 12-month trailing average is the standard | A 12-term average falls between months, so averaging two neighbours centres it.
M2#maths-u22-09-q3@2: What is the main drawback of a long trailing moving average for tracking a trend? | It responds slowly, so it lags behind turning points | It is too noisy to show the underlying trend | It removes the trend entirely along with the noise | It needs future data that aren't yet available | It has no drawbacks compared with short windows | Averaging many past values delays the reaction to recent changes.

## Exponential Smoothing
S: Exponential smoothing forecasts with weighted averages of past observations, with weights falling off exponentially for older data. Holt's and Holt–Winters' extensions add trend and seasonality, and the ETS framework gives these methods a statistical model with prediction intervals.
O: Apply simple, Holt and Holt–Winters smoothing
O: Describe the ETS state-space framework and parameter choice
T: Smoothing parameter | α in (0, 1); larger values weight recent observations more heavily
T: ETS model | Error, Trend, Seasonal state-space models underlying exponential smoothing methods
H: Simple exponential smoothing
- ℓ_{t} = αy_{t} + (1 − α)ℓ_{t−1}; forecast ŷ_{t+h} = ℓ_{t}.
- Weights α, α(1 − α), α(1 − α)^{2}, ….
- Flat forecasts: suits series without trend or seasonality.
H: Extensions
- Holt: adds a trend with parameter β; damped trends avoid over-extrapolation.
- Holt–Winters: adds seasonality (additive or multiplicative) with γ.
- Parameters chosen by minimising errors or maximising likelihood.
H: ETS framework
- ETS(A,N,N) is simple smoothing; ETS(A,A,A) additive Holt–Winters.
- Gives likelihoods, AIC and prediction intervals.
- Strong performer in forecasting competitions.
X: With α = 0.4, the previous level is 50 and the new observation is 60. Find the new level and the next forecast.
> ℓ_{t} = 0.4 × 60 + 0.6 × 50
> = 24 + 30 = 54
> The forecast for every future period is 54
K: Exponential smoothing weights past data with exponentially decaying weights; Holt adds trend, Holt–Winters seasonality; ETS models supply likelihoods and intervals; damped trends often forecast better.
!: Using simple exponential smoothing on a trending series, which lags behind.
Q: What does a large α do? | Weights recent observations more heavily.
Q: Which method adds seasonality to exponential smoothing? | Holt–Winters.
SUM: Weight recent data more.
SUM: ETS adds a statistical model.
SRC: Hyndman RJ, Koehler AB, Ord JK, Snyder RD, Forecasting with Exponential Smoothing: The State Space Approach (Springer 2008) | textbook | 2008 | https://link.springer.com/
SRC: Gardner ES, Exponential smoothing: the state of the art—Part II, International Journal of Forecasting 22(4), 637 | journal | 2006 | https://doi.org/10.1016/j.ijforecast.2006.03.005
NUM1#maths-u22-10-q1@1: In simple exponential smoothing with α = 0.2, what weight is given to the observation two periods before the latest (lag 2)? | 0.128 | 0.001 |  | Weight α(1 − α)^{2} = 0.2 × 0.64 = 0.128.
M1#maths-u22-10-q2@1: Which method suits a series with trend but no seasonality? | Holt's linear (or damped) trend method | Simple exponential smoothing | Holt–Winters seasonal method | A seasonal naive forecast | A 12-month moving average | Holt's method adds a trend component to the level.
M2#maths-u22-10-q3@2: Why do damped trend methods often forecast better than linear trends? | Trends rarely continue indefinitely, so damping avoids over-extrapolation at long horizons | Damping removes all trends, which is safer for every series | Linear trends are always correct in the long run, so damping only adds bias | Damped methods ignore the data, which avoids over-fitting entirely | They don't; undamped linear trends win every forecasting competition | Empirical studies show damped trends are robust across many series.

## AR Models
S: An autoregressive model predicts a value from a linear combination of its own past values plus noise. AR models capture persistence, such as temperatures or economic indicators that stay high or low for a while, and are stationary only when their coefficients satisfy certain conditions.
O: Write AR(p) models and check stationarity
O: Calculate means, variances and forecasts for AR(1)
T: AR(p) model | y_{t} = c + φ₁y_{t−1} + … + φ_{p}y_{t−p} + ε_{t}
T: Stationarity condition | For AR(1), |φ| < 1; in general, roots of 1 − φ₁z − … − φ_{p}z^{p} lie outside the unit circle
H: AR(1)
- Mean μ = c/(1 − φ).
- Variance σ^{2}/(1 − φ^{2}).
- ACF ρ(k) = φᵏ, decaying geometrically.
- φ = 1 is a random walk (unit root).
H: Higher orders
- AR(2) can produce cycles when roots are complex.
- Yule–Walker equations link ACF and coefficients.
- Estimate by least squares or maximum likelihood.
H: Forecasting
- ŷ_{T+1} = c + φy_{T}; ŷ_{T+h} → μ as h grows.
- Forecast variance grows towards the series variance.
- Mean reversion speed depends on φ.
X: An AR(1) has c = 2, φ = 0.6 and σ^{2} = 1. Find its mean, variance and the forecast after y_{T} = 10.
> Mean μ = 2/(1 − 0.6) = 5
> Variance = 1/(1 − 0.36) = 1.5625
> One-step forecast: 2 + 0.6 × 10 = 8, moving back towards 5
- Partial autocorrelations cut off after lag p, which identifies the order.
K: AR models regress on past values; AR(1) is stationary when |φ| < 1 with mean c/(1 − φ) and ACF φᵏ; forecasts revert to the mean; AR(2) can generate cycles.
!: Fitting an AR model with |φ| ≥ 1 and treating it as stationary.
Q: What is the ACF of an AR(1) at lag k? | φᵏ.
Q: What is the mean of a stationary AR(1)? | c/(1 − φ).
SUM: Regress on your own past.
SUM: Forecasts revert to the mean.
SRC: Box GEP, Jenkins GM, Reinsel GC, Ljung GM, Time Series Analysis: Forecasting and Control (5th edn, Wiley 2015) | textbook | 2015 | https://www.wiley.com/
SRC: Hamilton JD, Time Series Analysis (Princeton University Press 1994) | textbook | 1994 | https://press.princeton.edu/
NUM1#maths-u22-11-q1@1: For the AR(1) example (c = 2, φ = 0.6, y_{T} = 10), what is the two-step forecast? | 6.8 | 0.001 |  | ŷ_{T+2} = 2 + 0.6 × 8 = 6.8, continuing towards the mean of 5.
M1#maths-u22-11-q2@1: Which AR(1) is stationary? | y_{t} = 0.9y_{t−1} + ε_{t} | y_{t} = 1.0y_{t−1} + ε_{t} | y_{t} = 1.2y_{t−1} + ε_{t} | y_{t} = −1.5y_{t−1} + ε_{t} | y_{t} = 2y_{t−1} + ε_{t} | An AR(1) is stationary only when |φ| < 1; φ = 0.9 qualifies, while φ = 1 is a random walk and larger |φ| explodes.
M2#maths-u22-11-q3@2: Why do AR(1) forecasts converge to the mean at long horizons? | Each step multiplies the deviation from the mean by φ, which shrinks it when |φ| < 1 | Forecasts always equal the last observed value | The noise grows forever, swamping the forecast | AR models have no mean to converge towards | They don't converge; they grow without limit | The forecast deviation obeys ŷ_{T+h} − μ = φʰ(y_{T} − μ), which shrinks to zero geometrically when |φ| < 1.

## MA Models
S: A moving-average model expresses each value as a combination of current and past random shocks. MA models have short memory, with autocorrelation that cuts off after q lags, and they describe effects that last only a limited time.
O: Write MA(q) models and derive their autocorrelations
O: Explain invertibility and how MA forecasts behave
T: MA(q) model | y_{t} = μ + ε_{t} + θ₁ε_{t−1} + … + θ_{q}ε_{t−q}
T: Invertibility | The condition (|θ| < 1 for MA(1)) under which an MA model can be written as an infinite AR model, making it identifiable
H: MA(1)
- Mean μ; variance σ^{2}(1 + θ^{2}).
- ρ(1) = θ/(1 + θ^{2}); ρ(k) = 0 for k > 1.
- |ρ(1)| ≤ 0.5 for any θ.
H: Properties
- Always stationary (finite combination of white noise).
- Invertibility picks one θ from pairs with the same ACF (θ and 1/θ).
- Estimation needs nonlinear methods (shocks aren't observed).
H: Forecasting
- MA(q) forecasts revert to μ after q steps.
- Shocks have short-lived effects.
- Examples: effects of one-off promotions, overlapping survey samples.
X: An MA(1) has θ = 0.5 and σ^{2} = 4. Find its variance and lag-1 autocorrelation.
> Variance = 4 × (1 + 0.25) = 5
> ρ(1) = 0.5/(1 + 0.25) = 0.4
> ρ(k) = 0 for k ≥ 2
- Moving-average errors arise when shocks are averaged over overlapping periods.
- The ACF cut-off after lag q identifies the order from data.
K: MA(q) models combine recent shocks; the ACF cuts off after lag q; MA(1) has |ρ₁| ≤ 0.5; invertibility makes models unique; forecasts revert to the mean after q steps.
!: Confusing MA(q) models with moving-average smoothing.
Q: After how many lags does an MA(q) ACF cut off? | q.
Q: What is the maximum possible |ρ(1)| for MA(1)? | 0.5.
SUM: MA models have short memory.
SUM: Invertibility fixes uniqueness.
SRC: Brockwell PJ, Davis RA, Introduction to Time Series and Forecasting (3rd edn, Springer 2016) | textbook | 2016 | https://link.springer.com/
SRC: Shumway RH, Stoffer DS, Time Series Analysis and Its Applications (4th edn, Springer 2017) | textbook | 2017 | https://link.springer.com/
NUM1#maths-u22-12-q1@1: For an MA(1) with θ = −0.8, what is ρ(1), to 3 decimal places? | -0.488 | 0.001 |  | ρ(1) = −0.8/(1 + 0.64) = −0.8/1.64 ≈ −0.488.
M1#maths-u22-12-q2@1: For an MA(2) model, what is ρ(3)? | 0 | θ₁ | θ₂ | θ₁θ₂ | 1 | MA(q) autocorrelations vanish beyond lag q.
M3#maths-u22-12-q3@2: Why do MA models with θ and 1/θ need an invertibility condition? | Both give the same autocorrelations, so the data can't tell them apart without a convention | One of the two models is always non-stationary, so it must be excluded | They have different means, so the data distinguish them easily | Only one of them is a valid model, since θ must be below zero | They don't need any condition; θ and 1/θ give different ACFs | ρ(1) = θ/(1 + θ^{2}) is unchanged when θ is replaced by 1/θ.

## ARMA Models
S: ARMA models combine autoregressive and moving-average parts, describing stationary series parsimoniously. A low-order ARMA can capture autocorrelation that would need many AR or MA terms alone, and the Box–Jenkins method fits and checks them.
O: Write ARMA(p, q) models and their stationarity and invertibility conditions
O: Fit ARMA models using information criteria and residual diagnostics
T: ARMA(p, q) model | φ(B)y_{t} = c + θ(B)ε_{t}, with AR polynomial φ and MA polynomial θ
T: Akaike information criterion | AIC = −2 log L + 2k, balancing fit against the number of parameters k
H: Structure
- ARMA(1,1): y_{t} = c + φy_{t−1} + ε_{t} + θε_{t−1}.
- Stationary if AR roots lie outside the unit circle; invertible if MA roots do.
- Both ACF and PACF decay (no sharp cut-off).
- Common factors in φ(B) and θ(B) cancel (redundancy).
H: Box–Jenkins cycle
- Identify: plots, ACF, PACF.
- Estimate: maximum likelihood.
- Check: residual ACF, Ljung–Box test.
- Forecast; iterate if checks fail.
H: Model choice
- AIC, AICc and BIC (BIC penalises more heavily).
- Prefer parsimonious models.
- Wold's theorem: any stationary process has an MA(∞) representation.
X: Two fitted models give log-likelihoods −120 (ARMA(1,1), 3 parameters) and −118 (ARMA(2,2), 5 parameters). Which has lower AIC?
> ARMA(1,1): AIC = 240 + 6 = 246
> ARMA(2,2): AIC = 236 + 10 = 246
> They tie, so prefer the simpler ARMA(1,1)
K: ARMA combines AR and MA terms for parsimony; stationarity and invertibility depend on polynomial roots; Box–Jenkins identifies, estimates and checks; AIC and BIC compare models.
!: Over-fitting with high orders that add parameters without improving forecasts.
Q: What does AIC penalise? | The number of parameters.
Q: What does Wold's theorem state? | Every stationary process has an MA(∞) representation (plus a deterministic part).
SUM: AR and MA together are parsimonious.
SUM: Identify, estimate, check.
SRC: Box GEP, Jenkins GM, Reinsel GC, Ljung GM, Time Series Analysis: Forecasting and Control (5th edn, Wiley 2015) | textbook | 2015 | https://www.wiley.com/
SRC: Akaike H, A new look at the statistical model identification, IEEE Transactions on Automatic Control 19(6), 716 | journal | 1974 | https://doi.org/10.1109/TAC.1974.1100705
NUM1#maths-u22-13-q1@1: A model has log-likelihood −200 and 4 parameters. What is its AIC? | 408 | 0 |  | AIC = −2(−200) + 2 × 4 = 400 + 8 = 408.
M1#maths-u22-13-q2@1: What are the AR and MA orders of y_{t} = 0.5y_{t−1} + ε_{t} + 0.3ε_{t−1} + 0.2ε_{t−2}? | AR order 1, MA order 2 | AR order 2, MA order 1 | AR order 1, MA order 1 | AR order 0, MA order 3 | AR order 3, MA order 0 | One lag of y and two lagged shocks make it ARMA(1,2).
M2#maths-u22-13-q3@2: Why does BIC tend to choose smaller models than AIC? | Its penalty k log T grows with sample size, exceeding AIC's 2k once T > 7 | BIC ignores the likelihood and counts only parameters | AIC penalises parameters more heavily than BIC does | They always agree on the same model order | BIC chooses larger models when samples are big | A heavier complexity penalty favours parsimony.

## ARIMA Models
S: ARIMA models extend ARMA to non-stationary series by differencing first: ARIMA(p, d, q) applies an ARMA(p, q) to the d-times differenced data. They're a standard forecasting workhorse for trending series such as sales or prices.
O: Specify ARIMA(p, d, q) models and interpret common cases
O: Explain how differencing affects forecasts and intervals
T: ARIMA(p, d, q) | An ARMA(p, q) model for the d-th difference of the series: φ(B)(1 − B)^{d}y_{t} = c + θ(B)ε_{t}
T: Drift | A constant term in a differenced model, producing a linear trend in forecasts
H: Common cases
- ARIMA(0,1,0): random walk (naive forecast).
- ARIMA(0,1,0) with drift: random walk with drift.
- ARIMA(0,1,1): equivalent to simple exponential smoothing.
- ARIMA(0,2,2): related to Holt's linear method.
H: Forecasts
- With d = 1 and no constant: forecasts level off.
- With d = 1 and a constant: forecasts follow a straight line.
- Prediction intervals widen without bound as h grows (non-stationary).
H: Fitting
- Choose d by unit root tests; then p, q by ACF/PACF and AIC.
- Hyndman–Khandakar algorithm (auto.arima).
- Check residuals; refit if needed.
X: A random walk with drift has drift 2, last value 100 and shock variance 9. Give the 3-step forecast and its variance.
> Forecast = 100 + 3 × 2 = 106
> Variance = 3 × 9 = 27
> Standard deviation ≈ 5.2, growing like √h
K: ARIMA differences d times then fits ARMA; random walks, SES and Holt correspond to special cases; drift gives linear trends; intervals widen without bound for d ≥ 1.
!: Including a constant with d = 2, which gives a quadratic trend in forecasts.
Q: Which ARIMA model is equivalent to simple exponential smoothing? | ARIMA(0,1,1).
Q: What does a constant with d = 1 produce in forecasts? | A linear trend.
SUM: Difference, then fit ARMA.
SUM: Intervals widen for integrated series.
SRC: Hyndman RJ, Khandakar Y, Automatic time series forecasting: the forecast package for R, Journal of Statistical Software 27(3), 1 | journal | 2008 | https://doi.org/10.18637/jss.v027.i03
SRC: Box GEP, Jenkins GM, Reinsel GC, Ljung GM, Time Series Analysis: Forecasting and Control (5th edn, Wiley 2015) | textbook | 2015 | https://www.wiley.com/
NUM1#maths-u22-14-q1@1: A random walk without drift has shock variance 4. What is the standard deviation of its 9-step-ahead forecast error? | 6 | 0 |  | Variance = 9 × 4 = 36, so the SD is 6.
M1#maths-u22-14-q2@1: Which ARIMA model gives the naive forecast (the last value)? | ARIMA(0,1,0) without a constant | ARIMA(1,0,0) | ARIMA(0,0,1) | ARIMA(0,1,1) with drift | ARIMA(2,0,2) | A random walk forecasts every future value as the last observation.
M2#maths-u22-14-q3@2: Why do ARIMA prediction intervals for d = 1 keep widening with the horizon? | Shocks accumulate permanently in an integrated series, so uncertainty grows without limit | The model forgets the data after a few steps, so uncertainty grows | Intervals are always constant in width for any ARIMA model | The mean drifts randomly, so intervals must be reset each period | They don't widen; integrated models have bounded forecast variance | Forecast error variance for a random walk is hσ^{2}.

## SARIMA Models
S: Seasonal ARIMA models add seasonal AR, MA and differencing terms at multiples of the seasonal period. The classic airline model, ARIMA(0,1,1)(0,1,1)₁₂, captures trend and yearly seasonality in monthly data with just two parameters.
O: Write SARIMA(p,d,q)(P,D,Q)ₘ models
O: Identify seasonal terms from ACF and PACF at seasonal lags
T: Seasonal ARIMA | ARIMA(p,d,q)(P,D,Q)ₘ: non-seasonal orders p, d, q and seasonal orders P, D, Q at period m
T: Airline model | ARIMA(0,1,1)(0,1,1)₁₂, fitted by Box and Jenkins to monthly airline passenger numbers
H: Structure
- Seasonal differencing (1 − B^{m})^{D}.
- Seasonal AR Φ(B^{m}) and MA Θ(B^{m}) polynomials multiply the non-seasonal ones.
- Airline model: (1 − B)(1 − B^{12})y_{t} = (1 + θB)(1 + ΘB^{12})ε_{t}.
H: Identification
- Seasonal spikes in ACF at lags m, 2m suggest seasonal MA or differencing.
- Seasonal PACF spikes suggest seasonal AR.
- Usually D ≤ 1.
- Interaction terms appear around seasonal lags.
H: In practice
- Works well for one seasonal period of modest length.
- Long or multiple periods: use Fourier terms with ARIMA errors, or TBATS.
- Log transform first if seasonal swings grow.
X: How many parameters (excluding variance) does the airline model have, and what differencing does it apply?
> MA parameters: θ (lag 1) and Θ (lag 12): 2 parameters
> Differencing: one regular and one seasonal difference
> (1 − B)(1 − B^{12})y_{t}
K: SARIMA multiplies seasonal and non-seasonal polynomials; seasonal differencing removes yearly patterns; the airline model is a parsimonious classic; long or multiple seasonalities need other approaches.
!: Using seasonal and regular differencing when one would suffice.
Q: What is the seasonal period m for monthly data? | 12.
Q: What does (1 − B^{12}) do? | Takes a seasonal difference at lag 12.
SUM: Seasonal terms at lags of m.
SUM: The airline model is a classic.
SRC: Box GEP, Jenkins GM, Reinsel GC, Ljung GM, Time Series Analysis: Forecasting and Control (5th edn, Wiley 2015) | textbook | 2015 | https://www.wiley.com/
SRC: Hyndman RJ, Athanasopoulos G, Forecasting: Principles and Practice (3rd edn, OTexts 2021) | textbook | 2021 | https://otexts.com/fpp3/
NUM1#maths-u22-15-q1@1: In SARIMA(1,1,1)(1,1,1)₁₂, how many AR and MA coefficients (regular plus seasonal) are there in total? | 4 | 0 |  | φ, Φ, θ and Θ give four coefficients.
M1#maths-u22-15-q2@1: Monthly residuals show a significant ACF spike at lag 12 only. Which term is suggested? | A seasonal MA(1) term at lag 12 | A non-seasonal AR(1) term | An extra regular difference | A seasonal AR(5) | No change | An isolated spike at the seasonal lag points to seasonal MA.
M2#maths-u22-15-q3@2: Why might SARIMA be impractical for hourly data with weekly seasonality? | The period m = 168 makes seasonal polynomials and differencing unwieldy | SARIMA can't handle seasonality of any kind | Hourly data never contain weekly seasonality | SARIMA needs exactly m = 12 to work properly | It's always practical, whatever the period | Fourier terms or TBATS handle long periods more efficiently.

## Multivariate Time Series
S: Multivariate time series track several related variables over time, such as GDP, inflation and interest rates. Modelling them together captures how they influence each other, improves forecasts and allows tests of lead–lag relationships.
O: Describe cross-correlation and joint modelling of several series
O: Explain Granger causality and dimensionality challenges
T: Cross-correlation function | ρ_{xy}(k) = Corr(x_{t}, y_{t−k}), the correlation between one series and lags of another
T: Granger causality | x Granger-causes y if past values of x improve forecasts of y beyond y's own past
H: Joint behaviour
- Cross-correlations reveal leads and lags.
- Spurious cross-correlation from shared trends: pre-whiten first.
- Common factors drive many related series.
H: Modelling approaches
- Vector autoregressions (VAR).
- Cointegration and error correction (VECM).
- Dynamic factor models for many series.
- Multivariate state-space models.
H: Challenges
- Parameters grow with the square of the number of series.
- Shrinkage (Bayesian VAR, Minnesota prior) and regularisation help.
- Granger causality isn't true causation.
- Different frequencies (mixed-frequency models).
X: Past inflation improves forecasts of interest rates, but past interest rates don't improve inflation forecasts. What does this mean?
> Inflation Granger-causes interest rates
> Interest rates don't Granger-cause inflation (in this sample)
> This is predictive precedence, not proof of a causal mechanism
K: Multivariate series are modelled jointly; cross-correlations show lead–lag; Granger causality tests predictive content; VAR, VECM and factor models are main tools; dimensionality needs shrinkage.
!: Interpreting Granger causality as true causation.
Q: What does Granger causality test? | Whether past values of one series improve forecasts of another.
Q: Why pre-whiten before cross-correlating? | To avoid spurious correlations from shared autocorrelation and trends.
SUM: Model related series together.
SUM: Lead–lag isn't causation.
SRC: Granger CWJ, Investigating causal relations by econometric models and cross-spectral methods, Econometrica 37(3), 424 | journal | 1969 | https://doi.org/10.2307/1912791
SRC: Lütkepohl H, New Introduction to Multiple Time Series Analysis (Springer 2005) | textbook | 2005 | https://link.springer.com/
NUM1#maths-u22-16-q1@1: A VAR with 5 variables and 2 lags has how many slope coefficients (excluding intercepts)? | 50 | 0 |  | Each lag has a 5 × 5 matrix, so 2 × 25 = 50 coefficients.
M1#maths-u22-16-q2@1: Cross-correlation between x_{t} and y_{t−3} is high. What does this suggest? | y leads x by about three periods | x leads y by three periods | They are independent | Both are white noise | x causes y | Past y (three periods earlier) correlates with current x.
M2#maths-u22-16-q3@2: Why do VAR models with many variables need shrinkage? | The number of parameters grows with the square of the number of variables, risking over-fitting | VARs with many variables have too few parameters to fit the data | Shrinkage makes the VAR non-stationary, which suits macroeconomic data | Data are always plentiful enough to estimate every coefficient freely | They don't need it; least squares works well however many variables there are | Priors pull many small coefficients towards zero, improving forecasts.

## Vector Autoregression (VAR)
S: A vector autoregression models several series together, each regressed on lags of all of them. Introduced to macroeconomics by Christopher Sims in 1980, VARs are used for forecasting and, with identifying assumptions, for tracing how shocks spread through an economy.
O: Write and estimate VAR(p) models and check stability
O: Interpret impulse responses and variance decompositions
T: VAR(p) model | y_{t} = c + A₁y_{t−1} + … + A_{p}y_{t−p} + ε_{t}, with y_{t} a vector of variables
T: Impulse response function | The path of each variable after a one-time shock to one variable's equation
H: Specification
- Each equation estimated by OLS (same regressors in each).
- Lag order by AIC, BIC or HQ.
- Stable if all eigenvalues of the companion matrix lie inside the unit circle.
H: Analysis
- Granger causality tests.
- Impulse responses need identification: Cholesky ordering, sign restrictions, external instruments.
- Forecast error variance decomposition: share of each shock in forecast uncertainty.
- Structural VARs (SVAR).
H: Uses and limits
- Monetary policy effects (Sims, Nobel 2011).
- Forecasting macroeconomic aggregates.
- Results can depend on ordering and identification.
- Large Bayesian VARs for many variables.
X: A bivariate VAR(1) has A₁ = [[0.5, 0.1], [0.2, 0.4]]. Is it stable?
> Eigenvalues solve (0.5 − λ)(0.4 − λ) − 0.02 = 0, i.e. λ^{2} − 0.9λ + 0.18 = 0
> λ = (0.9 ± √(0.81 − 0.72))/2 = (0.9 ± 0.3)/2, so 0.6 and 0.3
> Both lie inside the unit circle, so the VAR is stable
K: VARs regress each variable on lags of all; stability needs companion eigenvalues inside the unit circle; impulse responses and variance decompositions need identification; Sims made them central to macroeconomics.
!: Reporting Cholesky impulse responses without checking sensitivity to variable ordering.
Q: Who introduced VARs to macroeconomics? | Christopher Sims (1980).
Q: What does a variance decomposition show? | The share of forecast error variance due to each shock.
SUM: Each variable depends on all lags.
SUM: Identification shapes interpretation.
SRC: Sims CA, Macroeconomics and reality, Econometrica 48(1), 1 | journal | 1980 | https://doi.org/10.2307/1912017
SRC: Kilian L, Lütkepohl H, Structural Vector Autoregressive Analysis (Cambridge University Press 2017) | textbook | 2017 | https://www.cambridge.org/
NUM1#maths-u22-17-q1@1: For a VAR(1) with A₁ = [[0.5, 0], [0, 0.8]], what is the larger eigenvalue? | 0.8 | 0 |  | A diagonal matrix has its diagonal entries as eigenvalues: 0.5 and 0.8.
M1#maths-u22-17-q2@1: What condition makes a VAR(1) stable? | All eigenvalues of A₁ have modulus less than 1 | All entries of A₁ are positive | A₁ is symmetric | The determinant of A₁ is 1 | A₁ is the identity | Stability requires shocks to die out, which needs eigenvalues inside the unit circle.
M2#maths-u22-17-q3@2: Why can Cholesky-identified impulse responses depend on variable ordering? | The ordering decides which shocks can affect which variables within the same period | Ordering never matters for impulse responses | Cholesky ignores correlations between the shocks | Changing the order changes the underlying data | They don't depend on it under any identification | A lower-triangular factor imposes a recursive contemporaneous structure.

## Vector Error Correction Models
S: When non-stationary series share a long-run equilibrium, they're cointegrated, and a vector error correction model describes both their short-run changes and their pull back towards equilibrium. Examples include consumption and income, or prices of the same good in two markets.
O: Explain cointegration and test for it
O: Interpret error-correction terms and adjustment speeds
T: Cointegration | Non-stationary I(1) series with a linear combination that is stationary, a long-run equilibrium
T: Error correction term | The lagged deviation from equilibrium, β'y_{t−1}, whose coefficient α measures how quickly variables adjust back
H: Cointegration
- Engle–Granger (1987): regress one I(1) series on others, test residuals for stationarity.
- Johansen test: finds the number of cointegrating relations (rank r).
- Example: x_{t} and y_{t} I(1), but y_{t} − 2x_{t} stationary.
H: The VECM
- Δy_{t} = αβ'y_{t−1} + Γ₁Δy_{t−1} + … + ε_{t}.
- β: cointegrating vectors (long run); α: adjustment speeds (short run).
- Granger representation theorem: cointegration ⇔ error-correction representation.
H: Uses
- Purchasing power parity and exchange rates.
- Money demand and term structure of interest rates.
- Pairs trading in finance.
- Avoids losing long-run information by differencing everything.
X: In Δy_{t} = −0.25(y_{t−1} − x_{t−1}) + ε_{t}, y is 4 units above x. What happens next period?
> Error-correction term = −0.25 × 4 = −1
> y is expected to fall by 1 unit
> A quarter of the disequilibrium is corrected each period
K: Cointegrated series share a stationary long-run relation; Engle–Granger and Johansen tests detect it; VECMs combine long-run equilibrium with short-run dynamics; α measures adjustment speed.
!: Differencing cointegrated series and fitting a VAR, which throws away the long-run relationship.
Q: What does cointegration mean? | A stationary linear combination of non-stationary series exists.
Q: Who developed the cointegration rank test? | Søren Johansen.
SUM: Long-run equilibrium binds series.
SUM: Error correction pulls them back.
SRC: Engle RF, Granger CWJ, Co-integration and error correction: representation, estimation, and testing, Econometrica 55(2), 251 | journal | 1987 | https://doi.org/10.2307/1913236
SRC: Johansen S, Statistical analysis of cointegration vectors, Journal of Economic Dynamics and Control 12(2–3), 231 | journal | 1988 | https://doi.org/10.1016/0165-1889(88)90041-3
NUM1#maths-u22-18-q1@1: With adjustment coefficient −0.2, what fraction of a deviation from equilibrium remains after 3 periods (ignoring shocks), to 3 decimal places? | 0.512 | 0.001 |  | Each period keeps 1 − 0.2 = 0.8 of the gap: 0.8^{3} = 0.512.
M1#maths-u22-18-q2@1: Two I(1) series x and y have y − 3x stationary. What is the cointegrating vector? | (1, −3) for (y, x) | (1, 1) | (3, 1) | (0, 0) | (1, 3) | The cointegrating vector gives the stationary combination: 1·y − 3·x, written (1, −3) for the ordering (y, x).
M3#maths-u22-18-q3@2: Why is a VECM preferred to a VAR in differences for cointegrated series? | Differencing alone discards the long-run equilibrium relation, which the error-correction term retains | VARs can't be estimated on differenced data, so a VECM is the only option | VECMs ignore short-run dynamics, which makes them simpler than VARs | Cointegration makes every series stationary, so no differencing is needed | It isn't preferred; a VAR in differences captures everything a VECM does | The Granger representation theorem shows the error-correction term is needed.

## State-Space Models
S: State-space models describe an observed series through an unobserved state that evolves over time. They unify ARIMA, exponential smoothing and structural models, handle missing data naturally, and are estimated with the Kalman filter.
O: Write state and observation equations for simple models
O: Explain the advantages of the state-space framework
T: State equation | α_{t+1} = Tα_{t} + Rη_{t}, describing how the hidden state evolves
T: Observation equation | y_{t} = Zα_{t} + ε_{t}, linking observations to the hidden state
H: Examples
- Local level model: y_{t} = μ_{t} + ε_{t}, μ_{t+1} = μ_{t} + η_{t}.
- Local linear trend: adds a slope state.
- Basic structural model: level, slope and seasonal states (Harvey).
- Every ARIMA model has a state-space form.
H: Advantages
- Missing observations simply skip the update step.
- Time-varying parameters and irregular spacing.
- Components (trend, seasonal) are interpretable.
- Likelihood via the Kalman filter's prediction errors.
H: Beyond linear Gaussian
- Nonlinear models: extended and unscented Kalman filters.
- Non-Gaussian: particle filters (sequential Monte Carlo).
- Hidden Markov models have discrete states.
- Dynamic linear models in Bayesian analysis.
X: Write the local level model for a noisy measurement of a slowly drifting level.
> The level μ_{t} follows a random walk: μ_{t+1} = μ_{t} + η_{t}
> Observations add measurement noise: y_{t} = μ_{t} + ε_{t}
> State dimension 1, with T = Z = R = 1
K: State-space models pair a hidden state equation with an observation equation; they include ARIMA and structural models; they handle missing data and time variation; the Kalman filter estimates them.
!: Treating the observations themselves as the state when measurement error is substantial.
Q: What does the observation equation link? | Observations to the hidden state.
Q: How does the state-space framework handle missing data? | It skips the update step and keeps predicting.
SUM: Hidden states drive observations.
SUM: The framework unifies many models.
SRC: Durbin J, Koopman SJ, Time Series Analysis by State Space Methods (2nd edn, Oxford University Press 2012) | textbook | 2012 | https://global.oup.com/
SRC: Harvey AC, Forecasting, Structural Time Series Models and the Kalman Filter (Cambridge University Press 1989) | textbook | 1989 | https://www.cambridge.org/
NUM1#maths-u22-19-q1@1: In a local level model, the level is 20 and η_{t} = 0.5 this period. What is the next level? | 20.5 | 0.001 |  | μ_{t+1} = μ_{t} + η_{t} = 20 + 0.5 = 20.5.
M1#maths-u22-19-q2@1: Which model is a state-space model with a random-walk level plus noise? | The local level model | A pure AR(2) without noise | A deterministic linear trend | White noise | A fixed seasonal dummy model | It has state μ_{t} following a random walk and noisy observations.
M2#maths-u22-19-q3@2: Why do state-space models handle missing observations easily? | The filter predicts the state forward and simply skips the update when no observation arrives | Missing data are filled with zeros before filtering | They need complete data, so gaps must be imputed first | Missing observations are deleted along with their dates | They can't handle missing data without special software | The prediction step needs no observation; only the update uses y_{t}.

## Kalman Filters
S: The Kalman filter estimates the hidden state of a linear system from noisy measurements, updating its estimate each time a new observation arrives. It is optimal for linear Gaussian models and guided Apollo spacecraft, GPS receivers and economic nowcasts.
O: Carry out Kalman filter prediction and update steps in one dimension
O: Interpret the Kalman gain and the filter's use in likelihood estimation
T: Kalman gain | K = P⁻/(P⁻ + R) in one dimension: the weight given to the new observation relative to the prediction
T: Innovation | v_{t} = y_{t} − ŷ_{t|t−1}, the difference between the observation and its prediction
H: The steps (1D local level)
- Predict: x̂⁻ = x̂_{t−1}, P⁻ = P_{t−1} + Q.
- Gain: K = P⁻/(P⁻ + R).
- Update: x̂_{t} = x̂⁻ + K(y_{t} − x̂⁻), P_{t} = (1 − K)P⁻.
- Q is process noise variance, R measurement noise variance.
H: Interpretation
- Noisy measurements (large R) give small K: trust the prediction.
- Uncertain predictions (large P⁻) give large K: trust the data.
- Steady state: K settles to a constant, like exponential smoothing.
- Innovations give the likelihood for parameter estimation.
H: Extensions and uses
- Smoothers (Rauch–Tung–Striebel) use all data.
- Extended, unscented and ensemble Kalman filters (weather data assimilation).
- Navigation, tracking, robotics and finance.
- Kalman (1960).
X: Prediction x̂⁻ = 10 with P⁻ = 4; a measurement y = 13 with R = 4 arrives. Update.
> K = 4/(4 + 4) = 0.5
> x̂ = 10 + 0.5 × (13 − 10) = 11.5
> P = (1 − 0.5) × 4 = 2: uncertainty halves
K: The Kalman filter alternates prediction and update; the gain balances prediction and measurement uncertainty; innovations give the likelihood; extensions handle nonlinear systems.
!: Setting the measurement noise R too low, so the filter chases noise.
Q: What does a Kalman gain near 0 mean? | The filter mostly trusts its prediction.
Q: What is the innovation? | The observation minus its prediction.
SUM: Predict, then correct with data.
SUM: The gain balances uncertainties.
SRC: Kalman RE, A new approach to linear filtering and prediction problems, Journal of Basic Engineering 82(1), 35 | journal | 1960 | https://doi.org/10.1115/1.3662552
SRC: Simon D, Optimal State Estimation: Kalman, H∞, and Nonlinear Approaches (Wiley 2006) | textbook | 2006 | https://www.wiley.com/
NUM1#maths-u22-20-q1@1: With P⁻ = 3 and R = 1, what is the Kalman gain? | 0.75 | 0.001 |  | K = 3/(3 + 1) = 0.75: the uncertain prediction is outweighed by the precise measurement.
M1#maths-u22-20-q2@1: A sensor becomes much noisier (R increases). How does the Kalman gain change? | It decreases, giving less weight to measurements | It increases, giving more weight to measurements | It stays the same, since only P⁻ affects it | It becomes negative, reversing the correction | It becomes exactly 1, ignoring the prediction | The gain K = P⁻/(P⁻ + R) falls as R grows, so the filter trusts noisy measurements less and leans on its prediction.
M3#maths-u22-20-q3@2: Why does a steady-state Kalman filter for the local level model resemble exponential smoothing? | Its constant gain K weights the latest observation by K and the previous estimate by 1 − K, like α | It ignores observations once it reaches steady state, so it's constant | It uses no prediction step, so it becomes a moving average | Exponential smoothing has no parameters, so any filter resembles it | They're unrelated; the Kalman filter is a completely different method | The update x̂_{t} = Ky_{t} + (1 − K)x̂_{t−1} matches SES with α = K.

## Hidden Markov Models
S: A hidden Markov model assumes the system switches between unobserved discrete states, each producing observations with its own distribution. HMMs model regime changes in economies and markets, speech sounds, gene sequences and animal behaviour.
O: Describe the components of an HMM
O: Explain the forward algorithm, Viterbi decoding and Baum–Welch estimation
T: Transition matrix | P with Pᵢⱼ = P(state j at t + 1 ∣ state i at t)
T: Viterbi algorithm | Dynamic programming that finds the most probable sequence of hidden states given the observations
H: Components
- Hidden states following a Markov chain.
- Emission distributions for observations in each state.
- Initial state probabilities.
- Example: "bull" and "bear" market regimes with different return distributions.
H: Algorithms
- Forward algorithm: likelihood of observations in O(N^{2}T).
- Forward–backward: probability of each state at each time.
- Viterbi: most likely state path.
- Baum–Welch (EM) estimates parameters.
H: Uses
- Speech recognition (historically).
- Regime-switching models in economics (Hamilton 1989).
- Bioinformatics: gene finding, profile HMMs.
- Expected duration in state i: 1/(1 − Pᵢᵢ).
X: A two-state economy stays in expansion with probability 0.9 each quarter. What is the expected length of an expansion?
> Expected duration = 1/(1 − P_{ii})
> = 1/(1 − 0.9)
> = 10 quarters (2.5 years)
K: HMMs have hidden Markov states emitting observations; forward, Viterbi and Baum–Welch algorithms compute likelihoods, paths and parameters; regime-switching models apply them to economics and finance.
!: Assuming the most probable state at each time forms the most probable state sequence (Viterbi differs).
Q: What does the Viterbi algorithm find? | The most probable sequence of hidden states.
Q: What is the expected duration of a state with self-transition probability p? | 1/(1 − p).
SUM: Hidden regimes generate observations.
SUM: Dynamic programming decodes them.
SRC: Rabiner LR, A tutorial on hidden Markov models and selected applications in speech recognition, Proceedings of the IEEE 77(2), 257 | journal | 1989 | https://doi.org/10.1109/5.18626
SRC: Hamilton JD, A new approach to the economic analysis of nonstationary time series and the business cycle, Econometrica 57(2), 357 | journal | 1989 | https://doi.org/10.2307/1912559
NUM1#maths-u22-21-q1@1: A recession state persists with probability 0.75 each quarter. What is its expected duration in quarters? | 4 | 0 | quarters | 1/(1 − 0.75) = 4 quarters.
M1#maths-u22-21-q2@1: Which algorithm estimates HMM parameters from unlabelled observations? | Baum–Welch (expectation–maximisation) | Viterbi decoding of the most probable path | The Kalman filter's prediction step | Ordinary least squares on the observations | Bisection on the likelihood function | Baum–Welch iterates forward–backward probabilities and parameter updates.
M2#maths-u22-21-q3@2: Why can the sequence of individually most probable states differ from the Viterbi path? | Choosing each state separately ignores transition probabilities, so the combined path may even be impossible | They are always identical, by the definition of the Viterbi algorithm | Viterbi ignores the observations and uses only transition probabilities | Individual state probabilities can't be computed for a hidden Markov model | It can't differ, since each state is chosen to maximise the same likelihood | Viterbi maximises the joint probability of the whole path.

## Functional Time Series
S: Functional time series are sequences of curves rather than numbers: a daily electricity demand curve, a yearly mortality-by-age curve, or the yield curve each day. Functional methods reduce each curve to a few components and forecast those.
O: Describe functional data and functional principal components
O: Explain how functional time series are forecast
T: Functional time series | A sequence X₁(s), X₂(s), … where each observation is a function of s, such as age or time of day
T: Functional principal components | Orthogonal basis functions capturing the main modes of variation of the curves
H: Data
- Intraday price or demand curves.
- Age-specific mortality and fertility curves.
- Yield curves by maturity.
- Each curve observed on a grid and smoothed.
H: Methods
- Functional PCA: X_{t}(s) ≈ μ(s) + Σ β_{t,k}φₖ(s).
- Forecast the score series β_{t,k} with ARIMA or exponential smoothing.
- Reconstruct forecast curves.
- Functional autoregression.
H: Example applications
- Lee–Carter mortality model: log m_{x,t} = a_{x} + b_{x}k_{t}, forecasting k_{t}.
- Nelson–Siegel yield curves with three factors (level, slope, curvature).
- Electricity load curve forecasting.
X: The Lee–Carter model has a₆₅ = −4, b₆₅ = 0.02 and k_{t} falling by 2 per year. How does log mortality at 65 change each year?
> Δ log m₆₅ = b₆₅ × Δk_{t}
> = 0.02 × (−2) = −0.04
> Mortality at 65 falls by about 4% a year
K: Functional time series observe curves over time; functional PCA reduces them to scores; forecasting scores gives forecast curves; Lee–Carter and Nelson–Siegel are classic examples.
!: Forecasting each grid point separately, ignoring the smooth structure of the curves.
Q: What does functional PCA produce? | Basis functions and scores capturing curve variation.
Q: Which mortality model uses a single time index k_{t}? | The Lee–Carter model.
SUM: Each observation is a curve.
SUM: Reduce, forecast, reconstruct.
SRC: Hyndman RJ, Ullah MS, Robust forecasting of mortality and fertility rates: a functional data approach, Computational Statistics and Data Analysis 51(10), 4942 | journal | 2007 | https://doi.org/10.1016/j.csda.2006.07.028
SRC: Lee RD, Carter LR, Modeling and forecasting U.S. mortality, Journal of the American Statistical Association 87(419), 659 | journal | 1992 | https://doi.org/10.1080/01621459.1992.10475265
NUM1#maths-u22-22-q1@1: In Nelson–Siegel yield curve modelling, how many factors describe the curve? | 3 | 0 | factors | Level, slope and curvature factors describe the whole yield curve.
M1#maths-u22-22-q2@1: Which is a functional time series? | A daily curve of electricity demand by hour | A single daily temperature | A list of share prices on one day | A set of independent surveys | A random sample of heights | Each day contributes a whole curve over the hours.
M2#maths-u22-22-q3@2: Why is functional PCA useful for forecasting curves? | It reduces each curve to a few scores whose time series can be forecast and recombined | It forecasts each grid point independently of the others | It removes all variation, leaving only the mean curve | It needs no data, since components are fixed in advance | It isn't useful; curves can't be forecast at all | A handful of components often explain most variation.

## ARCH Models
S: ARCH (autoregressive conditional heteroscedasticity) models let a series' variance depend on recent squared shocks, capturing the clustering of volatility. Robert Engle introduced them in 1982 to model UK inflation uncertainty and won the 2003 Nobel prize.
O: Write ARCH(q) models and their conditions
O: Test for ARCH effects and interpret them
T: ARCH(q) model | ε_{t} = σ_{t}z_{t}, σ_{t}^{2} = ω + α₁ε_{t−1}^{2} + … + α_{q}ε_{t−q}^{2}, with z_{t} i.i.d.
T: Conditional heteroscedasticity | Variance that changes over time depending on past information
H: The model
- ω > 0, αᵢ ≥ 0 ensure positive variance.
- Stationary if Σ αᵢ < 1; unconditional variance ω/(1 − Σ αᵢ).
- Large shocks raise next period's variance.
- Fat tails even with normal z_{t}.
H: Testing
- Engle's LM test: regress squared residuals on their lags.
- Ljung–Box on squared residuals.
- Many lags are often needed: GARCH is more parsimonious.
H: Uses
- Inflation uncertainty.
- Asset return volatility.
- Better prediction intervals in turbulent periods.
- Foundation for the GARCH family.
X: An ARCH(1) has ω = 0.2 and α = 0.5. Yesterday's shock was ε = 2. Find today's conditional variance and the unconditional variance.
> σ_{t}^{2} = 0.2 + 0.5 × 4 = 2.2
> Unconditional variance = 0.2/(1 − 0.5) = 0.4
> A large shock has raised variance well above its long-run level
K: ARCH makes variance depend on past squared shocks; positivity and Σα < 1 conditions apply; LM tests detect ARCH effects; it captures volatility clustering and fat tails.
!: Treating heteroscedastic residuals as constant variance when building prediction intervals.
Q: Who introduced ARCH models? | Robert Engle (1982).
Q: What is the unconditional variance of ARCH(1)? | ω/(1 − α).
SUM: Variance responds to recent shocks.
SUM: ARCH captures clustering.
SRC: Engle RF, Autoregressive conditional heteroscedasticity with estimates of the variance of United Kingdom inflation, Econometrica 50(4), 987 | journal | 1982 | https://doi.org/10.2307/1912773
SRC: Tsay RS, Analysis of Financial Time Series (3rd edn, Wiley 2010) | textbook | 2010 | https://www.wiley.com/
NUM1#maths-u22-23-q1@1: An ARCH(1) has ω = 0.1 and α = 0.6. What is its unconditional variance? | 0.25 | 0.001 |  | ω/(1 − α) = 0.1/0.4 = 0.25.
M1#maths-u22-23-q2@1: Which test checks residuals for ARCH effects? | Engle's Lagrange multiplier test on squared residuals | The Dickey–Fuller unit root test | The Durbin–Watson test on residual levels | A t-test on the mean of the residuals | The Jarque–Bera normality test only | Regressing squared residuals on their lags detects conditional heteroscedasticity.
M2#maths-u22-23-q3@2: Why does an ARCH model produce fat-tailed returns even with normal z_{t}? | Mixing normals with randomly varying variance gives more extreme values than a single normal | Normal variables are already fat-tailed, so ARCH inherits it | ARCH removes all extreme values from the distribution | The variance is constant, so tails come from the mean | It doesn't produce fat tails with normal innovations | Periods of high variance generate outliers more often than constant variance would.

## GARCH Models
S: GARCH models generalise ARCH by letting the conditional variance depend on its own past values too. GARCH(1,1), with just three parameters, captures the persistent volatility of most financial returns and is the industry standard.
O: Write the GARCH(1,1) model and compute variance forecasts
O: Interpret persistence and asymmetric GARCH variants
T: GARCH(p, q) | σ_{t}^{2} = ω + Σ αᵢε_{t−i}^{2} + Σ βⱼσ_{t−j}^{2}
T: Variance persistence | α + β in GARCH(1,1); values near 1 mean volatility shocks fade slowly
H: GARCH(1,1)
- σ_{t}^{2} = ω + αε_{t−1}^{2} + βσ_{t−1}^{2} (Bollerslev 1986).
- Long-run variance V_{L} = ω/(1 − α − β).
- h-step forecast: V_{L} + (α + β)^{h−1}(σ_{t+1}^{2} − V_{L}).
- Half-life of shocks: ln 0.5/ln(α + β).
H: Variants
- GJR-GARCH and EGARCH: negative shocks raise volatility more (leverage).
- Integrated GARCH (α + β = 1): shocks persist forever.
- Student-t errors for fat tails.
- Multivariate GARCH (DCC) for correlations.
H: Estimation and use
- Maximum likelihood.
- Typical daily equity estimates: α ≈ 0.05–0.1, β ≈ 0.85–0.93.
- VaR and option pricing.
X: GARCH(1,1) with α + β = 0.95: find the half-life of a volatility shock.
> Half-life h solves 0.95ʰ = 0.5
> h = ln 0.5/ln 0.95 = −0.693/−0.0513
> ≈ 13.5 days
- The unconditional variance exists only if α + β < 1.
K: GARCH adds lagged variance to ARCH; GARCH(1,1) is parsimonious and standard; persistence α + β controls decay; asymmetric variants capture leverage effects.
!: Using normal errors when standardised residuals are clearly fat-tailed.
Q: Who introduced GARCH? | Tim Bollerslev (1986).
Q: What does EGARCH capture? | Asymmetric (leverage) effects of shocks on volatility.
SUM: Variance depends on past variance and shocks.
SUM: Persistence sets decay.
SRC: Bollerslev T, Generalized autoregressive conditional heteroskedasticity, Journal of Econometrics 31(3), 307 | journal | 1986 | https://doi.org/10.1016/0304-4076(86)90063-1
SRC: Glosten LR, Jagannathan R, Runkle DE, On the relation between the expected value and the volatility of the nominal excess return on stocks, Journal of Finance 48(5), 1779 | journal | 1993 | https://doi.org/10.1111/j.1540-6261.1993.tb05128.x
NUM1#maths-u22-24-q1@1: A GARCH(1,1) has ω = 0.02, α = 0.08 and β = 0.9. What is its long-run variance? | 1 | 0.001 |  | ω/(1 − α − β) = 0.02/0.02 = 1.
M1#maths-u22-24-q2@1: In GARCH(1,1), what does α + β = 1 imply? | Volatility shocks persist indefinitely (integrated GARCH) | Volatility is constant at its long-run level | The model reduces to ARCH with no lags | Returns become independent and identically distributed | The conditional variance is always exactly zero | The long-run variance is undefined and shocks never decay.
M3#maths-u22-24-q3@2: Why are asymmetric GARCH models used for equity returns? | Falls in prices tend to raise volatility more than equal rises, which symmetric GARCH can't capture | Equity returns are symmetric, so asymmetric models fit better | Asymmetric models have fewer parameters than standard GARCH | GARCH ignores shocks completely, unlike asymmetric versions | They aren't used for equities, only for currencies | The leverage effect makes negative shocks more volatility-raising.

## Volatility Modelling
S: Volatility, the size of typical price fluctuations, is central to risk management and option pricing. It can be estimated from past returns, intraday data or option prices, and each approach answers a different question.
O: Compare historical, realised, implied and model-based volatility
O: Explain volatility forecasting and annualisation
T: Realised volatility | Volatility estimated from the sum of squared high-frequency (intraday) returns
T: Implied volatility | The volatility that makes an option pricing model match a market price; the VIX index is built from S&P 500 options
H: Measures
- Historical: standard deviation of past returns over a window.
- EWMA and GARCH: weight recent data more.
- Realised volatility from 5-minute returns: precise daily estimates.
- Implied volatility: the market's forward-looking view.
H: Scaling and patterns
- Annualise: σ_{annual} ≈ σ_{daily} × √252.
- Volatility smiles and term structures.
- Volatility is mean-reverting and clusters.
- Stochastic volatility models (Heston).
H: Forecasting and uses
- HAR models of realised volatility (daily, weekly, monthly components).
- Implied volatility often forecasts well but includes a risk premium.
- Risk limits, position sizing and volatility targeting.
- Volatility trading via variance swaps and VIX futures.
X: Daily returns have standard deviation 1.2%. Estimate the annualised volatility.
> σ_{annual} ≈ 1.2% × √252
> √252 ≈ 15.87
> ≈ 19%
K: Volatility is estimated historically, by EWMA/GARCH, from intraday realised measures or from option prices; annualise with √252; volatility clusters and mean-reverts; implied volatility includes a risk premium.
!: Annualising daily volatility by multiplying by 252 instead of √252.
Q: How is daily volatility annualised? | Multiply by √252 (trading days).
Q: What does the VIX measure? | Implied volatility of S&P 500 options over 30 days.
SUM: Many ways to measure volatility.
SUM: Each answers a different question.
SRC: Andersen TG, Bollerslev T, Diebold FX, Labys P, Modeling and forecasting realized volatility, Econometrica 71(2), 579 | journal | 2003 | https://doi.org/10.1111/1468-0262.00418
SRC: Corsi F, A simple approximate long-memory model of realized volatility, Journal of Financial Econometrics 7(2), 174 | journal | 2009 | https://doi.org/10.1093/jjfinec/nbp001
NUM1#maths-u22-25-q1@1: Annual volatility is 32%. What is the approximate daily volatility in %, using √256 = 16 as a rule of thumb? | 2 | 0 | % | 32%/16 = 2% a day.
M1#maths-u22-25-q2@1: Which volatility measure is forward-looking and derived from market prices of options? | Implied volatility | Historical volatility | Realised volatility | EWMA volatility | Range-based volatility | It's backed out from option prices, reflecting expectations and risk premiums.
M2#maths-u22-25-q3@2: Why does realised volatility from intraday data estimate daily volatility more precisely than daily returns alone? | Summing many squared intraday returns uses far more information about price movement within the day | Intraday prices are less volatile than daily closing prices | Daily returns are always zero, so they carry no information | It uses option prices as well as traded share prices | It isn't more precise than using daily returns alone | More observations of the same path reduce estimation error.

## Change-Point Detection
S: Change-point detection finds times when a series' statistical properties shift: its mean, variance or trend. It's used to spot machine faults, climate shifts, changes in disease rates and anomalies in website traffic, either after the fact or in real time.
O: Distinguish offline and online change-point detection
O: Apply CUSUM and describe penalised segmentation methods
T: Change point | A time at which the distribution of a series changes, such as a jump in its mean
T: CUSUM | A cumulative sum statistic S_{t} = max(0, S_{t−1} + x_{t} − μ₀ − k) that signals when it exceeds a threshold h
H: Online detection
- CUSUM (Page 1954): quick detection of small persistent shifts.
- Shewhart control charts for large shifts.
- Trade-off: detection delay versus false alarm rate (average run length).
- Bayesian online change-point detection.
H: Offline segmentation
- Binary segmentation: split where a test statistic is largest, then recurse.
- PELT: exact penalised search in linear time (Killick et al. 2012).
- Penalties (BIC-like) prevent too many change points.
- Wild binary segmentation for many changes.
H: Applications
- Quality control in manufacturing.
- Climate records and hydrology.
- Genomics (copy-number changes).
- Finance and network monitoring.
X: CUSUM with μ₀ = 10, k = 0.5 and h = 4 receives 11, 12, 11, 12. When does it signal?
> S₁ = max(0, 11 − 10.5) = 0.5; S₂ = 0.5 + 1.5 = 2
> S₃ = 2 + 0.5 = 2.5; S₄ = 2.5 + 1.5 = 4
> S₄ reaches h = 4, so it signals at the fourth observation
K: Change-point methods detect shifts in distribution; CUSUM and control charts work online; binary segmentation and PELT segment offline; penalties and run lengths control false alarms.
!: Allowing unlimited change points, which fits noise as structure.
Q: What does CUSUM accumulate? | Deviations from the target mean beyond an allowance k.
Q: What does PELT stand for? | Pruned Exact Linear Time.
SUM: Detect when behaviour changes.
SUM: Balance speed and false alarms.
SRC: Page ES, Continuous inspection schemes, Biometrika 41(1–2), 100 | journal | 1954 | https://doi.org/10.1093/biomet/41.1-2.100
SRC: Killick R, Fearnhead P, Eckley IA, Optimal detection of changepoints with a linear computational cost, Journal of the American Statistical Association 107(500), 1590 | journal | 2012 | https://doi.org/10.1080/01621459.2012.737745
NUM1#maths-u22-26-q1@1: In the CUSUM example (μ₀ = 10, k = 0.5), what is S after observations 13 and 9? | 1.5 | 0.001 |  | S₁ = 13 − 10.5 = 2.5; S₂ = max(0, 2.5 + 9 − 10.5) = 1.5.
M1#maths-u22-26-q2@1: Which method detects change points in real time as data arrive? | CUSUM | PELT | Binary segmentation | Wild binary segmentation | Offline Bayesian segmentation | CUSUM updates a statistic with each new observation.
M3#maths-u22-26-q3@2: Why do segmentation methods add a penalty for each change point? | Without it, adding change points always improves the fit, so the method would split at noise | Penalties make detection faster but have no effect on the results | Change points have no cost, so penalties are only a convention | Penalties remove real changes and keep only spurious ones | They don't add penalties; every possible split is accepted | A BIC-style penalty balances fit against the number of segments.

## Structural Break Analysis
S: Structural breaks are lasting changes in the relationships a model describes, such as a policy change altering how inflation responds to interest rates. Ignoring them biases estimates and ruins forecasts, so econometricians test for breaks and model them.
O: Apply the Chow test for a known break date
O: Describe tests for unknown break dates and their consequences
T: Chow test | An F-test of whether regression coefficients differ before and after a known date
T: Sup-F test | A test for a break at an unknown date, taking the maximum Chow statistic over candidate dates (Andrews 1993)
H: Known break dates
- Chow (1960): fit separately before and after, compare residual sums of squares.
- F = ((RSS_{pooled} − RSS₁ − RSS₂)/k) / ((RSS₁ + RSS₂)/(n − 2k)).
- Dummy variables for intercept and slope shifts.
H: Unknown dates
- Andrews sup-F and Quandt likelihood ratio tests.
- Bai–Perron for multiple breaks.
- CUSUM of recursive residuals (Brown, Durbin, Evans).
H: Consequences
- Breaks can mimic unit roots (Perron 1989).
- Forecasts from pre-break models fail after the break.
- Use rolling windows or time-varying parameters.
- Examples: oil shocks, the euro's introduction, the 2008 crisis, COVID-19.
X: A regression's pooled RSS is 120. Separate fits before and after a known date give RSS 40 and 50. With k = 2 coefficients and n = 64, compute the Chow F.
> Numerator: (120 − 40 − 50)/2 = 15
> Denominator: (40 + 50)/(64 − 4) = 1.5
> F = 15/1.5 = 10, strong evidence of a break
K: Structural breaks change model relationships; the Chow test checks known dates; sup-F and Bai–Perron handle unknown and multiple breaks; ignoring breaks biases estimates and forecasts.
!: Choosing the break date by looking at the data and then using standard Chow critical values.
Q: What does the Chow test compare? | Coefficients before and after a known date.
Q: What can an unmodelled break mimic? | A unit root.
SUM: Relationships can change.
SUM: Test and model breaks.
SRC: Chow GC, Tests of equality between sets of coefficients in two linear regressions, Econometrica 28(3), 591 | journal | 1960 | https://doi.org/10.2307/1910133
SRC: Bai J, Perron P, Estimating and testing linear models with multiple structural changes, Econometrica 66(1), 47 | journal | 1998 | https://doi.org/10.2307/2998540
NUM1#maths-u22-27-q1@1: A Chow test has pooled RSS 100, sub-sample RSS 30 and 40, k = 3 and n = 46. What is the F statistic, to 2 decimal places? | 5.71 | 0.01 |  | Numerator (100 − 70)/3 = 10 and denominator 70/(46 − 6) = 1.75, so F = 10/1.75 ≈ 5.71.
M1#maths-u22-27-q2@1: Which test handles a structural break at an unknown date? | Andrews' sup-F test | The Chow test with a guessed date | The Dickey–Fuller test | The Ljung–Box test | A t-test on the mean | Sup-F takes the maximum over candidate dates with adjusted critical values.
M2#maths-u22-27-q3@2: Why can an unmodelled structural break make a stationary series look like it has a unit root? | A shift in level makes deviations look persistent, so unit root tests lose power | Breaks always create genuine unit roots in the data | Unit root tests ignore the level of the series entirely | Breaks turn stationary series into white noise | It can't: breaks and unit roots are easily told apart | Perron (1989) showed breaks bias tests towards non-rejection of a unit root.

## Spectral Analysis
S: Spectral analysis decomposes a time series into oscillations of different frequencies, showing how much variance each frequency contributes. The periodogram and spectral density reveal hidden cycles, from sunspots to business cycles.
O: Compute and interpret the periodogram
O: Relate the spectral density to the autocovariance function
T: Spectral density | f(ω) = (1/2π) Σ γ(k)e^{−iωk}, the Fourier transform of the autocovariance function
T: Periodogram | I(ω_{j}) = (1/n)|Σ y_{t}e^{−iω_{j}t}|^{2}, a sample estimate of the spectrum at Fourier frequencies
H: The spectrum
- Total variance = integral of the spectral density.
- White noise: flat spectrum.
- AR(1) with φ > 0: power concentrated at low frequencies.
- Seasonal series: peaks at the seasonal frequency and harmonics.
H: Estimation
- The raw periodogram is noisy and inconsistent.
- Smooth it (Daniell, Bartlett windows) or use Welch's averaging.
- Multitaper methods reduce leakage.
- Frequency in cycles per observation; period = 1/frequency.
H: Uses
- Detecting cycles (sunspots ≈ 11 years).
- Filter design and signal processing.
- Long memory: spectrum diverging at zero frequency.
- Coherence between two series (cross-spectrum).
X: A periodogram of monthly data has a peak at frequency 1/12 cycles per month. What does it indicate?
> Period = 1/frequency = 12 months
> A yearly cycle
> Peaks at 2/12, 3/12, … would be its harmonics
K: Spectral analysis spreads variance across frequencies; the spectral density is the Fourier transform of the autocovariance; periodograms estimate it but need smoothing; peaks reveal cycles.
!: Interpreting single spikes in a raw, unsmoothed periodogram as genuine cycles.
Q: What does a flat spectrum indicate? | White noise.
Q: How is period related to frequency? | Period = 1/frequency.
SUM: Decompose variance by frequency.
SUM: Smooth the periodogram.
SRC: Percival DB, Walden AT, Spectral Analysis for Physical Applications (Cambridge University Press 1993) | textbook | 1993 | https://www.cambridge.org/
SRC: Priestley MB, Spectral Analysis and Time Series (Academic Press 1981) | textbook | 1981 | https://www.elsevier.com/
NUM1#maths-u22-28-q1@1: A daily series shows a spectral peak at frequency 1/7 cycles per day. What is the period in days? | 7 | 0 | days | Period = 1/(1/7) = 7 days: a weekly cycle.
M1#maths-u22-28-q2@1: Where does an AR(1) with φ = 0.9 concentrate its spectral power? | At low frequencies | At high frequencies | Equally at all frequencies | Only at the seasonal frequency | Nowhere | Strong positive persistence means slow fluctuations dominate.
M3#maths-u22-28-q3@2: Why is the raw periodogram an inconsistent estimator of the spectrum? | Its variance doesn't shrink as the sample grows, so it needs smoothing across neighbouring frequencies | It is biased towards zero at every frequency, however long the series | It ignores the data and depends only on the sample length | It has zero variance, so it can't be smoothed any further | It is consistent; its variance falls as the series gets longer | Each ordinate is roughly a scaled χ^{2}₂ variable no matter how long the series.

## Frequency-Domain Analysis
S: Frequency-domain methods analyse and filter series through their frequency components using the Fourier transform. They describe how linear filters change signals, measure relationships between series at each frequency and complement time-domain models.
O: Use the discrete Fourier transform and the FFT
O: Describe filters, gain, phase and coherence
T: Discrete Fourier transform | Y_{j} = Σ_{t} y_{t}e^{−2πijt/n}, representing a series as a sum of sinusoids at Fourier frequencies j/n
T: Coherence | The squared correlation between two series at each frequency, between 0 and 1
H: The Fourier transform
- The FFT computes the DFT in O(n log n) (Cooley–Tukey 1965).
- Parseval: total variance equals the sum of squared Fourier coefficients.
- Aliasing: frequencies above the Nyquist frequency ½ fold back.
H: Filters
- A linear filter multiplies each frequency by its transfer function.
- Gain: amplitude change; phase: time shift.
- Moving averages are low-pass filters.
- Band-pass filters (Baxter–King, Christiano–Fitzgerald) extract business cycles.
H: Cross-spectral analysis
- Coherence shows at which frequencies two series move together.
- Phase spectra show leads and lags at each frequency.
- Wavelets add time localisation for changing frequencies.
X: Daily data are sampled once a day. What is the highest frequency that can be identified, and what happens to a 1.5-day cycle?
> The Nyquist frequency is ½ cycle per day (a 2-day period)
> A 1.5-day cycle has frequency 2/3, above Nyquist
> It aliases to 1 − 2/3 = 1/3 cycle per day, appearing as a 3-day cycle
K: The DFT and FFT express series as sinusoids; Parseval links variance to coefficients; aliasing limits frequencies to Nyquist; filters change gain and phase; coherence measures frequency-wise association.
!: Sampling too slowly and misreading aliased cycles as real ones.
Q: What is the Nyquist frequency for data sampled once per unit time? | ½ cycle per unit time.
Q: What is the computational cost of the FFT? | O(n log n).
SUM: Analyse series by frequency.
SUM: Filters reshape frequency content.
SRC: Cooley JW, Tukey JW, An algorithm for the machine calculation of complex Fourier series, Mathematics of Computation 19, 297 | journal | 1965 | https://doi.org/10.1090/S0025-5718-1965-0178586-1
SRC: Baxter M, King RG, Measuring business cycles: approximate band-pass filters for economic time series, Review of Economics and Statistics 81(4), 575 | journal | 1999 | https://doi.org/10.1162/003465399558454
NUM1#maths-u22-29-q1@1: Data are sampled 10 times per second. What is the Nyquist frequency in Hz? | 5 | 0 | Hz | Nyquist = half the sampling rate = 5 Hz.
M1#maths-u22-29-q2@1: Which kind of filter is a simple moving average? | Low-pass | High-pass | Band-stop only | All-pass | Notch at zero frequency | Averaging suppresses rapid fluctuations and keeps slow ones.
M2#maths-u22-29-q3@2: What does high coherence at low frequencies between two series indicate? | They move together closely over long cycles, even if short-run movements differ | They are identical series at every frequency | They are unrelated at all frequencies | One of the two series is pure white noise | Nothing about how the series are related | Coherence measures frequency-specific correlation.

## Forecast Evaluation
S: Forecast evaluation measures how good forecasts are and compares methods fairly. Scale-dependent and scaled error measures, rolling-origin evaluation and statistical tests such as Diebold–Mariano guard against choosing methods that only look good by chance.
O: Calculate MAE, RMSE, MAPE and MASE
O: Use rolling-origin evaluation and the Diebold–Mariano test
T: Mean absolute scaled error | MASE: MAE divided by the in-sample MAE of a naive (or seasonal naive) forecast
T: Diebold–Mariano test | A test of whether two forecasts have equal expected loss
H: Error measures
- MAE and RMSE: in the units of the data; RMSE penalises large errors more.
- MAPE: unit-free but undefined at zero and asymmetric.
- MASE: scale-free, works with zeros; < 1 beats the naive benchmark.
- Bias: the mean error.
H: Procedures
- Hold out the latest data as a test set.
- Rolling-origin (time-series cross-validation): many forecast origins.
- Evaluate at each horizon separately.
- Compare against simple benchmarks.
H: Comparing methods
- Diebold–Mariano test for equal accuracy.
- Model confidence sets for many models.
- Beware data snooping when trying many methods.
- Evaluate prediction intervals too (coverage, interval score).
X: Forecast errors are 2, −3, 1 and −2. Find MAE and RMSE.
> MAE = (2 + 3 + 1 + 2)/4 = 2
> RMSE = √((4 + 9 + 1 + 4)/4) = √4.5
> ≈ 2.12, larger than MAE because the −3 error is squared
K: Use MAE, RMSE and scaled measures like MASE; evaluate out of sample with rolling origins; compare with benchmarks; test differences with Diebold–Mariano; avoid data snooping.
!: Comparing MAPE across series that include values near zero.
Q: What does MASE below 1 indicate? | Better than the naive benchmark in-sample.
Q: What does the Diebold–Mariano test compare? | Expected losses of two forecasts.
SUM: Measure accuracy out of sample.
SUM: Compare fairly with benchmarks.
SRC: Hyndman RJ, Koehler AB, Another look at measures of forecast accuracy, International Journal of Forecasting 22(4), 679 | journal | 2006 | https://doi.org/10.1016/j.ijforecast.2006.03.001
SRC: Diebold FX, Mariano RS, Comparing predictive accuracy, Journal of Business and Economic Statistics 13(3), 253 | journal | 1995 | https://doi.org/10.1080/07350015.1995.10524599
NUM1#maths-u22-30-q1@1: A method has test MAE 6, and the naive method's in-sample MAE is 8. What is the MASE? | 0.75 | 0.001 |  | MASE = 6/8 = 0.75.
M1#maths-u22-30-q2@1: Which error measure is undefined when actual values are zero? | MAPE | MAE | RMSE | MASE | Mean error | MAPE divides each error by the actual value, so a zero actual makes the percentage infinite or undefined.
M2#maths-u22-30-q3@2: Why use rolling-origin evaluation instead of a single train–test split? | Averaging over many forecast origins gives a more reliable estimate of accuracy | It uses future data to improve the accuracy estimates | A single split is always more reliable than many origins | It removes all forecast errors from the evaluation | It isn't used in practice, only in theory | One split depends heavily on the particular test period chosen.

## Prediction Intervals
S: A prediction interval gives a range in which a future observation is expected to fall with stated probability. Point forecasts alone hide uncertainty; intervals communicate it, and they must widen with the horizon and account for parameter and model uncertainty.
O: Construct prediction intervals from forecast standard errors
O: Evaluate interval coverage and describe bootstrap intervals
T: Prediction interval | ŷ_{T+h} ± z σ_{h}, an interval expected to contain y_{T+h} with probability such as 95% (z = 1.96)
T: Coverage | The proportion of actual outcomes falling inside the intervals, ideally close to the nominal level
H: Construction
- Normal errors: ŷ ± 1.96σ_{h} for 95%.
- σ_{h} grows with h: for a random walk σ_{h} = σ√h.
- Logs: compute in logs and back-transform (asymmetric intervals).
H: Other approaches
- Bootstrap: resample residuals to simulate future paths.
- Quantile regression and conformal prediction.
- Bayesian predictive distributions.
H: Common problems
- Intervals often too narrow: ignoring parameter and model uncertainty.
- Check empirical coverage on test data.
- Interval (Winkler) score rewards narrow intervals that cover.
- Communicate clearly with fan charts.
X: A random walk forecast has σ = 5 per step. Find the 95% interval half-width at h = 1 and h = 4.
> h = 1: 1.96 × 5 = 9.8
> h = 4: 1.96 × 5 × √4 = 19.6
> Quadrupling the horizon doubles the width
K: Prediction intervals quantify forecast uncertainty; widths grow with horizon; bootstrap and conformal methods avoid normality assumptions; check coverage, since intervals are often too narrow.
!: Reporting point forecasts without any interval.
Q: What z-value gives a 95% normal prediction interval? | 1.96.
Q: What does coverage measure? | The fraction of outcomes falling within the intervals.
SUM: Intervals show uncertainty.
SUM: Check coverage honestly.
SRC: Chatfield C, Calculating interval forecasts, Journal of Business and Economic Statistics 11(2), 121 | journal | 1993 | https://doi.org/10.1080/07350015.1993.10509938
SRC: Hyndman RJ, Athanasopoulos G, Forecasting: Principles and Practice (3rd edn, OTexts 2021) | textbook | 2021 | https://otexts.com/fpp3/
NUM1#maths-u22-31-q1@1: A point forecast is 200 with σ_{h} = 10. What is the upper limit of the 95% normal prediction interval? | 219.6 | 0.01 |  | 200 + 1.96 × 10 = 219.6.
M1#maths-u22-31-q2@1: Intervals labelled 95% contain the outcome only 80% of the time on test data. What does this show? | The intervals are too narrow (under-coverage) | The intervals are too wide (over-coverage) | The forecasts are unbiased and well calibrated | Coverage is perfect for 95% intervals | The data must have been recorded wrongly | Actual coverage below nominal means uncertainty is underestimated.
M2#maths-u22-31-q3@2: Why are model-based prediction intervals often too narrow? | They usually ignore uncertainty in parameter estimates and in the choice of model | They overstate every source of uncertainty, so they're actually too wide | They use too many simulations, which shrinks the intervals artificially | Future errors are always smaller than past ones, so they can't be too narrow | They aren't too narrow; model-based intervals usually over-cover in practice | Treating the fitted model as exactly true omits important sources of error.

## Probabilistic Forecasting
S: Probabilistic forecasting provides a full predictive distribution for future values, not just a point or interval. Weather services, energy markets and epidemic modellers use it, and proper scoring rules judge whether the distributions are both sharp and well calibrated.
O: Describe quantile and distributional forecasts
O: Evaluate them with calibration and proper scoring rules
T: Proper scoring rule | A score, such as the log score or CRPS, that is optimised in expectation by reporting one's true belief
T: Calibration | Agreement between forecast probabilities and observed frequencies
H: Forms
- Full densities or samples from them.
- Quantile forecasts (such as 5%, 50%, 95%).
- Probability of events (rain tomorrow: 70%).
- Ensemble forecasts in weather.
H: Evaluation
- Sharpness subject to calibration (Gneiting).
- Probability integral transform (PIT) histograms should be uniform.
- Continuous ranked probability score (CRPS); pinball loss for quantiles.
- Brier score for binary events: mean of (p − outcome)^{2}.
H: Uses
- Electricity load and price forecasting (GEFCom competitions).
- Inventory decisions need quantiles (newsvendor).
- Epidemic forecast hubs collect quantile forecasts.
- Combining distributions improves calibration.
X: A forecaster gives 0.8 chance of rain on a day it rains and 0.3 on a day it doesn't. Find the Brier score.
> Day 1: (0.8 − 1)^{2} = 0.04
> Day 2: (0.3 − 0)^{2} = 0.09
> Brier score = (0.04 + 0.09)/2 = 0.065 (lower is better)
K: Probabilistic forecasts give full distributions or quantiles; proper scores (log, CRPS, Brier, pinball) evaluate them; aim for sharpness subject to calibration; PIT histograms check calibration.
!: Evaluating probabilistic forecasts only by the error of their median.
Q: What is a proper scoring rule? | One optimised in expectation by honest reporting.
Q: What should a PIT histogram look like for calibrated forecasts? | Uniform.
SUM: Forecast the whole distribution.
SUM: Score with proper rules.
SRC: Gneiting T, Raftery AE, Strictly proper scoring rules, prediction, and estimation, Journal of the American Statistical Association 102(477), 359 | journal | 2007 | https://doi.org/10.1198/016214506000001437
SRC: Gneiting T, Katzfuss M, Probabilistic forecasting, Annual Review of Statistics and Its Application 1, 125 | review | 2014 | https://doi.org/10.1146/annurev-statistics-062713-085831
NUM1#maths-u22-32-q1@1: A forecaster always says 50% chance of rain. What Brier score do they get on every day, whatever happens? | 0.25 | 0.001 |  | (0.5 − 1)^{2} = (0.5 − 0)^{2} = 0.25.
M1#maths-u22-32-q2@1: Over many days a forecaster said "70% chance of rain", and it rained on 70% of them. What does this show? | The forecasts are well calibrated | The forecasts are always wrong | The forecasts are perfectly sharp | Rain is unpredictable | Nothing at all | Calibration means stated probabilities match observed frequencies.
M3#maths-u22-32-q3@2: Why must probabilistic forecasts be judged with proper scoring rules? | Improper rules can reward reporting distorted probabilities instead of honest beliefs | Proper rules ignore the outcomes and score only the forecasts | All scoring rules are proper, so the choice doesn't matter | Proper rules only check the median of each forecast | They needn't be; any accuracy measure judges them fairly | Under a proper score, the forecaster's expected score is best when reporting their true distribution.

## Intermittent Demand Forecasting
S: Intermittent demand has many periods of zero demand and occasional non-zero values, typical of spare parts and slow-moving stock. Standard methods perform poorly, so specialised approaches such as Croston's method forecast demand size and interval separately.
O: Recognise intermittent and lumpy demand patterns
O: Apply Croston's method and its corrections
T: Croston's method | Separately smoothing non-zero demand sizes and the intervals between them; the forecast is size/interval
T: Average demand interval | ADI, the mean number of periods between non-zero demands; ADI > 1.32 often indicates intermittent demand
H: Patterns
- Classification by ADI and the squared coefficient of variation of sizes (Syntetos–Boylan).
- Smooth, erratic, intermittent and lumpy categories.
- Common in spare parts, pharmaceuticals, retail long tails.
H: Methods
- Croston (1972): exponential smoothing of size z and interval p; forecast z/p.
- SBA correction (Syntetos–Boylan approximation): multiply by (1 − α/2) to reduce bias.
- TSB method: smooths demand probability instead of interval (handles obsolescence).
- Temporal aggregation (ADIDA) and bootstrap methods.
H: Evaluation and stock
- MAPE fails with zeros; use MASE or scaled errors.
- The aim is usually service level and stock, so evaluate inventory outcomes.
- Zero forecasts can look accurate but give stock-outs.
X: Smoothed non-zero demand size is 12 units and smoothed interval is 4 periods. What is Croston's forecast, and the SBA version with α = 0.1?
> Croston: 12/4 = 3 units per period
> SBA: 3 × (1 − 0.1/2) = 3 × 0.95
> = 2.85 units per period
K: Intermittent demand has many zeros; Croston smooths sizes and intervals separately; SBA and TSB correct its bias and handle obsolescence; evaluate with scaled errors and stock outcomes.
!: Using simple exponential smoothing on intermittent data, which over-reacts after each demand.
Q: What does Croston's method forecast? | Demand size divided by demand interval.
Q: Why can MAPE fail for intermittent demand? | Actual values of zero make it undefined.
SUM: Many zeros need special methods.
SUM: Judge by inventory outcomes.
SRC: Croston JD, Forecasting and stock control for intermittent demands, Operational Research Quarterly 23(3), 289 | journal | 1972 | https://doi.org/10.2307/3007885
SRC: Syntetos AA, Boylan JE, The accuracy of intermittent demand estimates, International Journal of Forecasting 21(2), 303 | journal | 2005 | https://doi.org/10.1016/j.ijforecast.2004.10.001
NUM1#maths-u22-33-q1@1: Non-zero demands occur in periods 2, 6 and 10 of a 12-period history. What is the average interval between them? | 4 | 0 | periods | The gaps are 4 and 4 periods, giving an average interval of 4.
M1#maths-u22-33-q2@1: Which method smooths the probability of demand occurring, helping with obsolete items? | TSB (Teunter–Syntetos–Babai) | Croston's original method | Simple exponential smoothing | Holt's linear method | Seasonal naive | TSB updates demand probability every period, so it decays when demand stops.
M2#maths-u22-33-q3@2: Why can a forecast of zero look accurate on intermittent data yet be useless? | Most periods have zero demand, so errors look small, but holding no stock causes stock-outs when demand comes | Zero forecasts are always optimal for intermittent items, so they're fine | Demand never occurs for intermittent items, so zero is exactly right | Errors can't be measured when demand is zero, so it looks accurate | It isn't useless; a zero forecast is the standard choice for spare parts | Point accuracy measures miss the inventory consequences.

## Causal Forecasting
S: Causal (explanatory) forecasting predicts a variable from other variables believed to drive it, such as sales from price, advertising and weather. It allows "what if" scenarios but needs forecasts of the drivers and stable relationships.
O: Build regression forecasts with predictor variables and ARIMA errors
O: Distinguish conditional and unconditional forecasts and causal interpretation
T: Regression with ARIMA errors | y_{t} = β'x_{t} + η_{t} with η_{t} an ARIMA process, combining predictors with time-series dynamics
T: Conditional forecast | A forecast made assuming given future values of the predictors (scenarios)
H: Building models
- Choose predictors from theory and domain knowledge.
- Allow for lags (advertising effects persist).
- Model residual autocorrelation (ARIMA errors).
- Include calendar and holiday effects.
H: Forecasting with predictors
- Unconditional: predictors must be forecast too (adding uncertainty).
- Conditional: scenarios ("if price falls 10%").
- Leading indicators known in advance avoid this problem.
- Nowcasting with timely indicators.
H: Causality and pitfalls
- Correlation in the past may not hold under intervention.
- Policy changes may alter relationships (Lucas critique).
- Causal inference methods (experiments, synthetic controls) support scenario claims.
- Over-fitting many predictors.
X: Sales = 200 − 5 × price + 2 × advertising (in £k). Forecast sales if price is £10 and advertising £30k.
> 200 − 5 × 10 + 2 × 30
> = 200 − 50 + 60
> = 210 units (conditional on those values)
K: Causal forecasting uses predictors with ARIMA errors; conditional forecasts give scenarios; unconditional ones must forecast the predictors; relationships may break under intervention.
!: Treating a correlational regression as reliable for scenarios that change how people behave.
Q: What is a conditional forecast? | One that assumes given future values of predictors.
Q: Why add ARIMA errors to a regression? | To model autocorrelation left in the residuals.
SUM: Forecast from drivers.
SUM: Scenarios need stable relationships.
SRC: Hyndman RJ, Athanasopoulos G, Forecasting: Principles and Practice (3rd edn, OTexts 2021) | textbook | 2021 | https://otexts.com/fpp3/
SRC: Abadie A, Diamond A, Hainmueller J, Synthetic control methods for comparative case studies, Journal of the American Statistical Association 105(490), 493 | journal | 2010 | https://doi.org/10.1198/jasa.2009.ap08746
NUM1#maths-u22-34-q1@1: In the sales model, by how many units do forecast sales change if advertising rises by £5k (price unchanged)? | 10 | 0 | units | The advertising coefficient is 2 per £1k, so £5k adds 10 units.
M1#maths-u22-34-q2@1: What extra uncertainty does an unconditional causal forecast include? | Uncertainty in forecasting the predictor variables themselves | None beyond the model residuals | Only rounding error in calculations | Uncertainty in past data only | Uncertainty in the intercept only | Unknown future predictors must themselves be forecast.
M2#maths-u22-34-q3@2: Why might a sales–price regression mislead when planning a big price cut? | Past data may not cover such a change, and customers or competitors may respond in new ways | Regressions can't use price as a predictor | Price never affects sales in practice | The coefficient is always exactly right | It wouldn't mislead for any price change | Extrapolating beyond observed conditions risks changed relationships.
`;
