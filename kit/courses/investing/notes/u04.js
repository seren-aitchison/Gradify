// School 4: Risk and Return. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md): objectives, key
// terms, summaries, typed and dated sources, evidence status (EV:) and questions at three levels (Foundation,
// Application, Evaluation) in every lesson. Education, not financial advice: worked numbers are illustrative, and
// historical returns are described approximately with their source; past performance is not a guide to the future.
// Explanations are original; sources are those used for checking, pending human verification.
export default `
## Holding period return
LV: Introductory · Foundation
S: The holding period return measures what an investment earned over the whole time it was held, combining price change and income. Annualising it lets returns over different periods be compared fairly.
O: Calculate a holding period return including income
O: Convert a multi-year return into an annualised (compound) return
O: Evaluate the use of cumulative and annualised returns in marketing and comparison
H: The basic measure
E: HPR = (end value − start value + income) ÷ start value :: income includes dividends, interest or rent received
P: The **holding period return (HPR)** answers "how much did I make, as a percentage of what I put in?". It must include income as well as price change; leaving out dividends understates the return on shares. Costs such as dealing fees and platform charges should be deducted for the investor's actual return.
X: Shares bought for £4,000 are worth £4,600 a year later and paid £160 of dividends (illustrative).
> Price gain: £4,600 − £4,000 = £600.
> HPR = (£600 + £160) ÷ £4,000 = 19%.
> Without the dividends the return would look like 15%.
H: Annualising
E: Annualised return = (1 + HPR)^{1/n} − 1 :: n is the number of years
P: A cumulative return over several years sounds impressive but cannot be compared with a one-year figure. Annualising finds the constant yearly rate that would have produced the same end value: the **compound annual growth rate (CAGR)**.
X: £10,000 grows to £15,000 over five years, including reinvested income (illustrative).
> HPR = 50%.
> Annualised = 1.5^{0.2} − 1 = 0.0845, about 8.4% a year.
> Not 10% a year (50 ÷ 5): dividing ignores compounding and overstates the yearly rate.
K: Holding period return includes income; annualise multi-year returns with the compound formula before comparing them.
!: Dividing a cumulative return by the number of years. That ignores compounding and overstates the annual rate.
EV: established | Annualised (geometric) returns are the standard way to compare performance over different periods, as in the CFA Institute's GIPS standards.
T: Holding period return | The total return over the period an investment is held, including income, as a percentage of the starting value
T: Annualised return | The constant yearly compound rate that produces the same overall return over several years
SUM: HPR = (change in value + income) ÷ start value.
SUM: Annualise with (1 + HPR)^{1/n} − 1, never by simple division.
SRC: CFA Institute, Global Investment Performance Standards (GIPS) for Firms | standard | 2020 | https://www.gipsstandards.org/
SRC: Bodie Z., Kane A. and Marcus A. J., Investments (12th edition), McGraw Hill | secondary | 2021
Q: What must a holding period return include besides price change? | Income received, such as dividends or interest.
Q: How do you annualise a 3-year return of 30%? | 1.3^{1/3} − 1, about 9.1% a year.
M1#investing-u04-01-q1@1: A fund rises from £100 to £108 and pays £2 of income in a year. What is its holding period return? | 10% | 8% | 2% | 6% | (8 + 2) ÷ 100 = 10%; leaving out income would give 8%.
NUM2#investing-u04-01-q2@2: An investment grows from £5,000 to £6,050 over two years. What is the annualised return as a percentage? | 10 | 0.01 | % | HPR = 6,050 ÷ 5,000 − 1 = 21%; annualised = 1.21^{0.5} − 1 = 10%.
NUM2#investing-u04-01-q3@1: Shares bought for £2,500 are sold for £2,300 after receiving £150 of dividends. What is the holding period return as a percentage? | -2 | 0.01 | % | (2,300 − 2,500 + 150) ÷ 2,500 = −50 ÷ 2,500 = −2%.
M2#investing-u04-01-q4@3: An advert says a fund "returned 80% over ten years". What is the fairest way to compare it with a savings rate? | Annualise it: 1.8^{0.1} − 1 is about 6% a year | Divide by ten: 8% a year | Compare 80% directly with the savings rate | Ignore it, because all adverts are false | Annualising gives about 6.1% a year, the comparable figure; simple division overstates it.
M3#investing-u04-01-q5@3: Two funds report five-year returns of 40% and 45%. Which further information matters most before concluding the second is better? | Whether both include income and are net of charges, and how volatile each was | The fund managers' ages | Which fund has the longer name | The number of shares each holds | Like-for-like comparison needs the same basis (total return, net of fees) and context on risk.
SA3#investing-u04-01-q6@1,3: Explain why annualised returns can still mislead an investor comparing two investments. | Annualised returns smooth the path: two investments with the same CAGR can have very different volatility and drawdowns. They also depend heavily on start and end dates, may be gross or net of fees, and may exclude income. A fair comparison uses net total returns over the same period and considers risk alongside return. | Hides volatility and path ; Sensitive to start and end dates ; Gross versus net of fees ; Income inclusion ; Recommends risk-adjusted, like-for-like comparison

## Arithmetic and geometric average returns
LV: Intermediate · Application
S: The arithmetic average of yearly returns is not the rate at which money actually grew. The geometric average is, and it is always lower than the arithmetic average when returns vary. The gap, often called volatility drag, grows with volatility.
O: Calculate arithmetic and geometric average returns
O: Explain why volatility makes the geometric average lower than the arithmetic
O: Evaluate which average to use for different purposes
H: Two averages
E: Arithmetic mean = (r_{1} + r_{2} + … + r_{n}) ÷ n
E: Geometric mean = [(1 + r_{1})(1 + r_{2})…(1 + r_{n})]^{1/n} − 1
X: An investment rises 50% then falls 50% (illustrative).
> Arithmetic mean: (50% − 50%) ÷ 2 = 0%.
> Money: £100 → £150 → £75.
> Geometric mean: (1.5 × 0.5)^{0.5} − 1 = −13.4% a year. The investor lost 25% overall; the arithmetic average hid it.
H: Volatility drag
E: Geometric ≈ arithmetic − σ²/2 :: σ is the standard deviation of returns, as a decimal
P: The more returns swing, the bigger the gap. A fund averaging 8% arithmetic with 20% volatility compounds at roughly 8% − 0.2²/2 = 6% a year. This is why reducing volatility, through diversification, can improve compound growth even without raising the average return.
- Use the **geometric** mean to describe past growth and to compare funds' historical performance.
- The **arithmetic** mean is the best estimate of a single future year's expected return, and is used in some forecasting models.
K: The geometric mean is the true compound growth rate and is always below the arithmetic mean when returns vary; the gap grows with volatility.
!: Projecting wealth by compounding an arithmetic average return. That overstates the likely outcome when returns are volatile.
EV: established | The geometric mean is less than or equal to the arithmetic mean, with equality only when all returns are identical (the AM–GM inequality).
T: Arithmetic mean return | The simple average of periodic returns
T: Geometric mean return | The constant compound rate that gives the same final value as the actual sequence of returns
T: Volatility drag | The reduction in compound growth caused by variability of returns
SUM: Arithmetic averages add returns; geometric averages compound them and show real growth.
SUM: Geometric ≈ arithmetic − σ²/2, so volatility reduces compound returns.
SRC: Bodie Z., Kane A. and Marcus A. J., Investments (12th edition), McGraw Hill: return measurement | secondary | 2021
SRC: CFA Institute, Investment Foundations Certificate curriculum: quantitative concepts | secondary | 2024 | https://www.cfainstitute.org/
Q: Which average shows the actual compound growth rate? | The geometric mean.
Q: What is the approximate gap between arithmetic and geometric means? | About half the variance: σ²/2.
M1#investing-u04-02-q1@1: An investment returns +10% and then −10%. What is the arithmetic mean return? | 0% | −0.5% | 10% | −1% | (10 − 10) ÷ 2 = 0%, although the investor ends 1% down.
NUM2#investing-u04-02-q2@1: An investment returns +20% one year and −10% the next. What is the geometric mean return as a percentage, to two decimal places? | 3.92 | 0.02 | % | (1.2 × 0.9)^{0.5} − 1 = 1.08^{0.5} − 1 = 0.0392, so 3.92%, below the 5% arithmetic mean.
NUM3#investing-u04-02-q3@2: A fund's arithmetic mean return is 9% with a standard deviation of 18%. Estimate its geometric mean return as a percentage, to one decimal place. | 7.4 | 0.1 | % | 9% − 0.18²/2 = 9% − 1.62% = 7.38%, about 7.4%.
M2#investing-u04-02-q4@2,3: Two funds both average 7% a year arithmetically. Fund A's returns vary little; Fund B's swing widely. Which probably grew more? | Fund A, because lower volatility means less drag on compound growth | Fund B, because volatility adds return | They grew exactly the same | It is impossible to say anything | With the same arithmetic mean, the less volatile fund has the higher geometric mean.
M3#investing-u04-02-q5@3: Which average should a fund factsheet use to describe its five-year past performance? | The geometric (annualised) return, because it reflects actual growth | The arithmetic mean, because it is higher | The best single year | The median year | Investors experience compound growth; GIPS and good practice use time-weighted, geometrically linked returns.
SA3#investing-u04-02-q6@2,3: Explain why reducing volatility can increase long-term wealth even if average annual returns are unchanged. | Compound growth depends on the geometric mean, approximately the arithmetic mean minus half the variance. Large losses need larger gains to recover, so volatile returns compound more slowly. Lowering volatility, for example through diversification, reduces this drag, raising the geometric mean and final wealth for the same arithmetic average. | Wealth depends on geometric mean ; Volatility drag σ²/2 ; Asymmetry of losses and gains ; Diversification as a way to reduce volatility ; Clear conclusion

## Total return and reinvested income
LV: Introductory · Application
S: Total return combines price changes with income. Over decades, reinvested dividends and interest account for a large part of the growth in a portfolio, which is why accumulation units and dividend reinvestment matter so much.
O: Distinguish price return from total return
O: Calculate the long-run effect of reinvesting income
O: Evaluate how income needs affect the choice between income and accumulation
H: Price return versus total return
P: **Price return** counts only the change in price; **total return** also assumes that income is reinvested. For shares, the dividend yield has historically been a substantial part of total return in the UK. Index providers publish both versions, and fund factsheets should quote total return net of charges.
X: Shares grow 3% a year in price and yield 4% in dividends, reinvested, for 30 years (illustrative, ignoring tax and costs).
> Price only: 1.03^{30} = 2.43: £10,000 becomes about £24,300.
> Total return of about 7% a year: 1.07^{30} = 7.61: £10,000 becomes about £76,100.
> Reinvested income more than tripled the end value compared with price growth alone.
H: Income or accumulation
- **Accumulation units** reinvest income automatically within the fund price; **income units** pay it out (see School 8).
- **Dividend reinvestment** for directly held shares buys more shares with each dividend.
- Investors who need income can take it, but should recognise that spending it reduces future growth.
P: Income reinvested inside a fund is still taxable outside an ISA or pension in the year it arises, even though no cash is received, so records are important for tax returns.
K: Total return = price change + income; reinvesting income compounds it and has driven much of the long-run return on shares.
!: Comparing a fund's total return with an index's price return, or judging long-run share performance from price charts alone.
EV: established | Reinvested dividends account for a large share of the long-run total return on UK and global equities (Dimson, Marsh and Staunton; Barclays Equity Gilt Study).
T: Total return | The return from price changes plus income, assuming income is reinvested
T: Price return | The return from price changes alone, excluding income
T: Accumulation units | Fund units in which income is automatically reinvested
SUM: Total return includes reinvested income and gives the true picture of investment growth.
SUM: Over decades reinvested income compounds into a large share of the final value.
SRC: Dimson E., Marsh P. and Staunton M., UBS Global Investment Returns Yearbook | data | 2024
SRC: Barclays, Equity Gilt Study (annual long-run UK returns data) | data | 2024
Q: What is the difference between price return and total return? | Total return includes reinvested income; price return does not.
Q: Is income reinvested in accumulation units taxable outside a wrapper? | Yes, in the tax year it arises, even though no cash is received.
M1#investing-u04-03-q1@1: Which measure includes reinvested dividends? | Total return | Price return | Dividend yield | Market capitalisation | Total return includes income; price return excludes it.
NUM2#investing-u04-03-q2@2: A share fund's price rises 5% and it yields 3% in reinvested income over a year. What is its approximate total return as a percentage? | 8 | 0.2 | % | Total return ≈ price return + income return = 5% + 3% = 8% (slightly more if income is reinvested during the year).
M2#investing-u04-03-q3@2: A retired investor needs income from their fund. Which unit type pays income out? | Income units | Accumulation units | Both automatically pay out cash | Neither; funds never pay income | Income units distribute; accumulation units reinvest within the price.
M3#investing-u04-03-q4@3: Why does a chart of the FTSE 100 level since 2000 understate what investors in a UK index fund earned? | It shows only price changes, and dividends, which were a substantial part of returns, are excluded | The FTSE 100 has risen faster than any fund | Index funds pay no dividends | It includes charges | Dividends of several per cent a year over two decades add a great deal; total return indices show this.
SA3#investing-u04-03-q5@1,3: Evaluate the claim that "dividends don't matter, only the share price does". | Dividends are part of total return, and reinvested over decades they compound into a large share of long-run equity returns. A price-only view understates performance. However, a dividend paid lowers the share price by about the same amount, so it is not extra money in the short run; what matters is total return, and buybacks or reinvestment can substitute. The claim is wrong about long-run returns but right that dividends are not free money. | Dividends are part of total return ; Long-run compounding of reinvested income ; Price falls by dividend on ex-date ; Total return is what matters ; Reaches a balanced judgement

## Nominal and real returns in practice
LV: Introductory · Application
S: Nominal returns are measured in pounds; real returns measure the change in purchasing power. Tax, charges and inflation together determine what an investor actually keeps, and over long periods the differences are large.
O: Calculate real returns over several years from nominal returns and inflation
O: Explain money illusion and why tax is charged on nominal gains
O: Evaluate how inflation, tax and charges combine to reduce returns
H: From nominal to real
E: Real return = (1 + nominal) ÷ (1 + inflation) − 1
P: Over a long horizon the gap between nominal and real growth is large. At 6% nominal and 2.5% inflation, real growth is about 3.4% a year. Over 20 years £10,000 grows to about £32,100 in pounds but only about £19,600 in today's money.
X: An investor reports "my portfolio doubled in twelve years" while prices rose 40% over the same period (illustrative).
> Real value: 2.00 ÷ 1.40 = 1.43.
> Purchasing power rose 43%, not 100%.
> Annualised real return: 1.43^{1/12} − 1, about 3% a year.
H: Money illusion, tax and charges
P: **Money illusion** is the tendency to think in nominal pounds and ignore inflation, so a 3% pay rise feels good even when prices rise 5%. Tax adds to the effect: capital gains tax and tax on interest are charged on **nominal** gains, so outside ISAs and pensions part of the "gain" taxed may simply be inflation.
- Start with the gross return.
- Subtract charges (fund and platform fees).
- Subtract tax, if outside a tax wrapper.
- Adjust for inflation to get the real, net return.
K: Judge investments by their real return after charges and tax: the change in what your money can buy.
!: Comparing returns from a high-inflation period with those from a low-inflation period without adjusting for inflation.
EV: established | People commonly evaluate outcomes in nominal rather than real terms (money illusion), as shown by Shafir, Diamond and Tversky (1997).
T: Nominal return | A return measured in money terms, without adjusting for inflation
T: Money illusion | The tendency to think about money in nominal rather than real terms
SUM: Real return strips out inflation; over decades the gap from nominal returns is large.
SUM: Charges, tax on nominal gains and inflation together determine what an investor really keeps.
SRC: Shafir E., Diamond P. and Tversky A., Money illusion, Quarterly Journal of Economics 112(2) | primary | 1997
SRC: Office for National Statistics, Consumer price inflation | data | 2026 | https://www.ons.gov.uk/economy/inflationandpriceindices
Q: What is money illusion? | Thinking about money in nominal terms and ignoring inflation.
Q: Is UK capital gains tax charged on nominal or real gains? | Nominal gains: there is no inflation adjustment for individuals.
M1#investing-u04-04-q1@1: An investment earns 5% when inflation is 5%. What is its real return? | About 0% | 5% | 10% | −5% | Purchasing power is unchanged when nominal return equals inflation.
NUM2#investing-u04-04-q2@1: A portfolio rises 60% over ten years while prices rise 25%. By what percentage did its purchasing power rise? | 28 | 0.01 | % | 1.60 ÷ 1.25 = 1.28, a 28% real increase.
M2#investing-u04-04-q3@2,3: A fund returns 7% gross, charges 1% and inflation is 3%. Roughly what is the real return after charges? | About 3% | About 7% | About 4% | About 6% | 7% − 1% charges = 6% nominal; 6% − 3% inflation ≈ 3% real (exactly 1.06 ÷ 1.03 − 1 = 2.9%).
M3#investing-u04-04-q4@3: Why can tax outside an ISA be a larger burden than its headline rate suggests in high-inflation periods? | Tax falls on nominal gains, part of which only compensates for inflation, so the tax on the real gain is higher | Tax rates double automatically with inflation | Inflation is taxed separately | ISAs are taxed more heavily in inflation | Taxing the inflation component means the effective tax rate on real gains exceeds the headline rate.
SA3#investing-u04-04-q5@1,3: Evaluate the statement "my savings account has never lost money". | In nominal terms it may be true, since balances only rise with interest. But in real terms savings have often lost purchasing power when interest after tax was below inflation, for example in 2021–23. Money illusion makes nominal stability feel safe. Whether this matters depends on the goal: for short-term needs nominal safety is appropriate; for long-term goals real returns matter. | Nominal versus real distinction ; Example of negative real returns ; Money illusion ; Tax effect ; Depends on goal and horizon

## Volatility and standard deviation
LV: Intermediate · Application
S: Volatility measures how widely returns vary around their average, and standard deviation is the usual statistic for it. It is the most common measure of investment risk and underpins the risk ratings on UK fund documents.
O: Calculate the standard deviation of a set of returns
O: Interpret standard deviation using the normal distribution
O: Evaluate standard deviation as a measure of risk
H: Measuring spread
E: Sample standard deviation = √[Σ(r − mean)² ÷ (n − 1)]
X: Annual returns are 10%, −5%, 15%, 0% and 5% (illustrative).
> Mean = 25 ÷ 5 = 5%.
> Squared deviations: 25, 100, 100, 25, 0; sum 250.
> Variance = 250 ÷ 4 = 62.5; standard deviation = √62.5 = 7.9%.
P: If returns were roughly normally distributed, about two-thirds of years would fall within one standard deviation of the mean and about 95% within two. A fund with a 7% average and 15% standard deviation would then lose more than 8% in about one year in six.
H: Using and questioning it
P: Annualised volatility is reported on many factsheets, and the UK synthetic risk indicator on fund documents ranks funds on a scale of 1 to 7 based largely on past volatility. Typical figures: cash near 0%, short-dated gilts a few per cent, global shares around 15% a year.
- Standard deviation treats rises and falls alike, but investors mainly fear falls.
- Real returns have **fat tails**: extreme falls happen more often than a normal distribution predicts (for example October 1987).
- Past volatility can understate future risk, especially for assets that are rarely valued.
K: Standard deviation measures the spread of returns; it is a useful, standard risk measure but misses fat tails and the difference between gains and losses.
!: Treating a low-volatility history as proof of low risk. Some risks, such as default or illiquidity, appear rarely and suddenly.
EV: established | Equity returns show fatter tails than a normal distribution, so extreme moves occur more often than the normal model predicts (Mandelbrot, 1963; Fama, 1965).
T: Volatility | The degree of variation in an investment's returns over time
T: Standard deviation | A statistic measuring how far values typically lie from their mean
T: Fat tails | A distribution in which extreme outcomes are more likely than under a normal distribution
SUM: Standard deviation summarises volatility; under normality two-thirds of outcomes lie within one standard deviation.
SUM: It is widely used, including in fund risk scales, but ignores direction and underweights extreme events.
SRC: Bodie Z., Kane A. and Marcus A. J., Investments (12th edition), McGraw Hill: risk and return | secondary | 2021
SRC: Fama E. F., The behavior of stock-market prices, Journal of Business 38(1) | primary | 1965
Q: About what share of outcomes lie within one standard deviation of the mean in a normal distribution? | About 68%, roughly two-thirds.
Q: What are fat tails? | Extreme outcomes occurring more often than a normal distribution predicts.
M1#investing-u04-05-q1@1: Which typically has the highest volatility? | A global share fund | An easy-access savings account | A short-dated gilt fund | A money market fund | Shares are more volatile than cash and short-dated bonds.
NUM2#investing-u04-05-q2@1: Four annual returns are 8%, 2%, 14% and −4%. What is their sample standard deviation as a percentage, to one decimal place? | 7.7 | 0.1 | % | Mean 5%; squared deviations 9, 9, 81, 81 = 180; 180 ÷ 3 = 60; √60 = 7.7%.
M2#investing-u04-05-q3@2: A fund's mean return is 6% with a standard deviation of 10%. Assuming a normal distribution, roughly 95% of annual returns lie in which range? | −14% to 26% | −4% to 16% | 0% to 12% | −10% to 10% | Mean ± 2 standard deviations: 6 ± 20 gives −14% to 26%.
M3#investing-u04-05-q4@3: Why is standard deviation an incomplete measure of risk for a private-loan fund valued once a quarter? | Infrequent valuations smooth reported returns, hiding volatility, and default or liquidity risk may appear suddenly | Standard deviation cannot be calculated for any fund | Loans have no risk | Quarterly data are always more volatile | Smoothed prices understate true variability, and rare events may not appear in the history.
SA3#investing-u04-05-q5@1,3: Evaluate standard deviation as the main measure of investment risk for a private investor. | It is objective, widely reported and captures how bumpy returns are, and it underlies fund risk scales. But it treats gains and losses alike, assumes a normal shape when real returns have fat tails, relies on past data, and ignores risks that matter to individuals such as permanent loss, inflation and failing to meet a goal. It is a useful starting point, best combined with drawdown, scenario and goal-based measures. | Strengths: objective and widely used ; Treats upside and downside alike ; Fat tails and normality assumption ; Past data and other risks ignored ; Combine with other measures

## Drawdowns and recovery
LV: Intermediate · Application
S: A drawdown is the fall from a peak to a subsequent low. Maximum drawdown and the time taken to recover tell investors more about the experience of losing money than volatility alone.
O: Calculate drawdown and the gain required to recover
O: Describe historical drawdowns and recovery times for share markets
O: Evaluate how drawdown risk should shape a portfolio and behaviour
H: Measuring the fall
E: Drawdown = (peak value − trough value) ÷ peak value
E: Gain needed to recover = drawdown ÷ (1 − drawdown)
X: A portfolio peaks at £150,000 and falls to £105,000 (illustrative).
> Drawdown = (150,000 − 105,000) ÷ 150,000 = 30%.
> Gain needed = 0.30 ÷ 0.70 = 42.9%.
> At 7% a year, recovery would take about five years (1.07^{5} = 1.40), assuming no withdrawals.
H: History
P: Share market drawdowns have been large and recoveries sometimes slow. UK shares fell around 70% in nominal terms in 1973–74. The FTSE 100 roughly halved between its end-1999 peak and March 2003, and fell again by about half from 2007 to early 2009; its price index did not regain its 1999 level for many years, although with dividends reinvested the recovery came sooner. US shares took about 25 years, until the 1950s, to regain their 1929 peak in price terms.
- **Maximum drawdown**: the worst peak-to-trough fall over a period.
- **Time under water**: how long until the previous peak is regained.
- Diversified portfolios with bonds and cash have historically had smaller drawdowns than pure equity portfolios.
K: Drawdowns describe the pain of losses; a fall of x needs a gain of x ÷ (1 − x) to recover, and recoveries can take years.
!: Judging a fund's risk only from its annualised return. Two funds with the same return can have very different maximum drawdowns.
EV: established | Major equity markets have experienced drawdowns of 50% or more on several occasions in the past century.
T: Drawdown | The percentage fall in value from a peak to a subsequent trough
T: Maximum drawdown | The largest peak-to-trough fall over a period
T: Time under water | The time taken for an investment to regain its previous peak
SUM: Drawdown and recovery time measure the experience of losses directly.
SUM: Historical equity drawdowns of 50% or more have occurred; diversification has reduced them.
SRC: Dimson E., Marsh P. and Staunton M., Triumph of the Optimists: 101 Years of Global Investment Returns, Princeton University Press | secondary | 2002
SRC: Barclays, Equity Gilt Study (annual long-run UK returns data) | data | 2024
Q: What is maximum drawdown? | The largest peak-to-trough percentage fall over a period.
Q: What gain recovers a 30% drawdown? | About 42.9%.
M1#investing-u04-06-q1@1: A fund falls from £20,000 to £15,000. What is the drawdown? | 25% | 33% | 20% | 5% | Drawdown is measured from the peak: (20,000 − 15,000) ÷ 20,000 = 25%.
NUM2#investing-u04-06-q2@1: A portfolio falls 35% from its peak. What gain, as a percentage to one decimal place, is needed to recover? | 53.8 | 0.1 | % | 0.35 ÷ 0.65 = 0.538, so 53.8%.
M2#investing-u04-06-q3@2,3: Two funds both returned 6% a year over ten years. Fund A's maximum drawdown was 15%; Fund B's was 45%. Which is the better evaluation? | Fund A delivered the same return with far less painful losses, which many investors would find easier to hold | They are identical in every way that matters | Fund B is better because it was more exciting | Drawdowns do not matter if returns are equal | Investors who would have sold during a 45% fall would not have received Fund B's return.
M3#investing-u04-06-q4@3: Why might a price index understate how quickly investors recovered after a crash? | Reinvested dividends continued to buy shares at low prices, so total return recovered faster than the price index | Price indices always overstate losses | Dividends stop entirely in crashes | Indices are adjusted for inflation | Total return includes income reinvested at depressed prices, shortening the recovery.
SA3#investing-u04-06-q5@2,3: Evaluate how knowledge of historical drawdowns should influence a beginner's portfolio choices. | History shows equity falls of 50% or more and recoveries taking years, so investors should choose a mix whose plausible worst fall they could tolerate without selling, hold an emergency fund, and reduce equity exposure before money is needed. But history may not repeat exactly, and avoiding all drawdown risk means giving up long-run growth. A pre-commitment to stay invested matters as much as the allocation. | Size of historical drawdowns ; Choose allocation to tolerate worst falls ; Emergency fund and horizon ; Trade-off with growth ; Behavioural pre-commitment

## Sequence of returns risk
LV: Intermediate · Evaluation
S: When money is being added or withdrawn, the order of returns matters, not just their average. Poor returns early in retirement, while withdrawals are being taken, can permanently damage a pot even if later returns are good.
O: Explain why the order of returns matters when cash flows occur
O: Calculate portfolio values under different return sequences with withdrawals
O: Evaluate strategies to reduce sequence risk near and in retirement
H: Why order matters
P: With no money going in or out, the order of returns makes no difference: multiplication is commutative, so +20%, +10%, −20% gives the same final value as −20%, +10%, +20%. Once withdrawals are taken, losses early on force the sale of more units at low prices, leaving less to benefit from any recovery.
X: A £100,000 pot pays out £10,000 at the end of each year for three years (illustrative).
> Sequence A (+20%, +10%, −20%): £120,000 − £10,000 = £110,000; × 1.1 − £10,000 = £111,000; × 0.8 − £10,000 = £78,800.
> Sequence B (−20%, +10%, +20%): £80,000 − £10,000 = £70,000; × 1.1 − £10,000 = £67,000; × 1.2 − £10,000 = £70,400.
> Same returns, different order: £8,400 less, just from bad years coming first.
H: The danger zone
P: Sequence risk is greatest in the years just before and after retirement, when the pot is largest and withdrawals begin. For savers adding money regularly, early losses are less harmful, even helpful, because contributions buy at low prices.
- **Cash buffer**: one to three years of spending in cash, so withdrawals need not come from investments after a fall.
- **Lower-risk assets near retirement**: lifestyling or glide paths reduce exposure to a crash at the worst time (School 5).
- **Flexible withdrawals**: spending less after falls.
- **Guaranteed income**: an annuity for essential spending removes market risk from that part (School 12).
K: With withdrawals, poor early returns cause lasting harm; reduce sequence risk around retirement with buffers, lower risk and flexible spending.
!: Assuming that because average returns over retirement will be fine, the order does not matter. With withdrawals, it does.
EV: established | When cash flows occur, the sequence of returns affects final wealth, which is the basis of sequence-of-returns risk in retirement planning.
EV: contested | The best way to manage sequence risk (cash buffers, glide paths, rising equity glide paths, annuities) is debated among researchers and practitioners.
T: Sequence of returns risk | The risk that the order of returns, combined with withdrawals or contributions, harms the final outcome
T: Cash buffer | Cash held to fund near-term withdrawals so investments need not be sold after falls
SUM: Without cash flows, order is irrelevant; with withdrawals, bad early returns permanently reduce wealth.
SUM: Sequence risk peaks around retirement; buffers, lower risk, flexible spending and annuities reduce it.
SRC: Bengen W. P., Determining withdrawal rates using historical data, Journal of Financial Planning 7(4) | primary | 1994
SRC: MoneyHelper, Pension drawdown guidance (Money and Pensions Service) | guidance | 2026 | https://www.moneyhelper.org.uk/en/pensions-and-retirement
Q: When does the order of returns not matter? | When no money is added or withdrawn.
Q: When is sequence risk greatest? | In the years just before and after retirement, when the pot is large and withdrawals begin.
M1#investing-u04-07-q1@3: Which person is most exposed to sequence of returns risk? | A 66-year-old who has just started drawing an income from a large invested pension | A 25-year-old making regular pension contributions | A child with a Junior ISA | Someone with all savings in an easy-access account | Withdrawals from a large pot early in retirement magnify the harm of early losses.
NUM3#investing-u04-07-q2@2: A £50,000 pot earns −10% in year 1 and +10% in year 2, with £5,000 withdrawn at the end of each year. What is it worth after year 2, in pounds? | 39000 | 1 | £ | Year 1: £45,000 − £5,000 = £40,000. Year 2: £44,000 − £5,000 = £39,000.
TF2#investing-u04-07-q3@1: With no withdrawals or contributions, the order of a set of annual returns does not change the final value. | true | Final value is the product of the growth factors, which is the same in any order.
M2#investing-u04-07-q4@2,3: Why might a regular saver in their twenties be less worried by a market crash than a new retiree? | Their contributions buy at low prices and they have decades to recover, while the retiree must sell to fund spending | Crashes never affect young people's pensions | Young savers' pensions are guaranteed | Retirees cannot invest in shares | Contributions turn falls into opportunities; withdrawals turn them into locked-in losses.
M3#investing-u04-07-q5@3: A retiree holds two years of spending in cash alongside an invested pension. What is the main purpose? | To avoid selling investments after a fall, reducing sequence risk | To maximise long-run returns | To avoid all inflation risk | To qualify for the State Pension | The buffer funds spending while markets recover; it may slightly lower expected return but protects the plan.
SA3#investing-u04-07-q6@1,3: Evaluate strategies a retiree can use to manage sequence of returns risk. | Options include holding a cash buffer, reducing equity exposure before retirement, adjusting withdrawals after poor years, and annuitising essential spending. Each has costs: cash and lower risk reduce expected growth and expose the pot to inflation; flexible spending reduces income certainty; annuities are irreversible and less flexible. A combination matched to essential and discretionary spending, and regulated advice or MoneyHelper guidance, is sensible. | Cash buffer ; Lower risk near retirement ; Flexible withdrawals ; Annuity for essential spending ; Costs of each and a justified conclusion

## Types of investment risk
LV: Introductory · Foundation
S: Investment risk is not one thing. Market, specific, interest-rate, credit, inflation, currency, liquidity and other risks affect different assets in different ways, and naming them helps investors see what they are exposed to.
O: Identify the main types of investment risk
O: Match risks to the assets most exposed to them
O: Evaluate which risks matter most for a given investor's goal
H: The main risks
- **Market (systematic) risk**: the whole market falls; cannot be diversified away.
- **Specific (unsystematic) risk**: a single company or sector does badly; reduced by diversification.
- **Interest-rate risk**: bond prices fall when yields rise.
- **Credit (default) risk**: a borrower fails to pay.
- **Inflation risk**: returns fail to keep pace with prices.
- **Currency risk**: overseas assets lose value in pounds.
- **Liquidity risk**: an asset cannot be sold quickly at a fair price.
- **Concentration risk**: too much in one holding, sector or country.
- **Counterparty risk**: the other party to a contract fails.
- **Regulatory and political risk**: changes in rules or taxes.
P: Most assets carry several of these at once. A UK corporate bond fund, for example, carries interest-rate, credit, inflation and liquidity risk; a global share fund carries market and currency risk, with specific risk largely diversified away. Fund documents such as the key information document list the main risks, and reading them is a quick way to see what you are exposed to.
H: Personal risks
P: Some of the most important risks are personal. **Shortfall risk** is the chance of not reaching a goal; **longevity risk** is outliving your savings. Being too cautious can increase both, by leaving money in assets that fail to grow. Risk is therefore relative to the goal: for a retirement 30 years away, inflation and shortfall can matter more than short-term volatility.
X: A 40-year-old keeps a £50,000 pension pot entirely in cash for safety (illustrative).
> Market risk: almost none.
> Inflation and shortfall risk: high, because cash has historically barely kept pace with prices.
> Swapping one risk for another is unavoidable; the question is which risks fit the goal.
K: Every investment carries some risks; diversify away specific risk, choose how much market risk to accept, and remember inflation and shortfall risks of being too cautious.
!: Thinking cash is "risk-free" for long-term goals. It avoids market risk but carries inflation and shortfall risk.
EV: established | Specific risk can be largely diversified away, while market risk cannot (see School 5).
T: Systematic risk | Risk affecting the whole market, which diversification cannot remove
T: Shortfall risk | The risk of failing to reach a financial goal
T: Longevity risk | The risk of outliving your savings
SUM: Market, specific, interest-rate, credit, inflation, currency, liquidity and concentration risks affect assets differently.
SUM: Risk should be judged against the goal, including shortfall and longevity risk.
SRC: CISI, Fundamentals of Financial Services workbook: investment risk | secondary | 2024 | https://www.cisi.org/
SRC: Financial Conduct Authority, Consumer investments: understanding investment risk | guidance | 2026 | https://www.fca.org.uk/investsmart
Q: Which type of risk cannot be removed by diversification? | Market (systematic) risk.
Q: What is longevity risk? | The risk of outliving your savings.
M1#investing-u04-08-q1@1: A UK investor holds US shares and the dollar falls against the pound. Which risk has affected them? | Currency risk | Credit risk | Liquidity risk | Interest-rate risk | Exchange rate changes alter the sterling value of overseas holdings.
M2#investing-u04-08-q2@2: Which risk is the main concern for a holder of a long-dated fixed-rate corporate bond when inflation and interest rates rise? | Interest-rate risk (and inflation risk) | Currency risk | Concentration risk in a single share | Longevity risk | Rising yields lower fixed bond prices; inflation reduces real value.
TF1#investing-u04-08-q3@2: Holding many different shares reduces specific risk but not market risk. | true | Company-specific events average out; market-wide falls affect all shares.
M3#investing-u04-08-q4@3: Which is the best evaluation of a cautious saver keeping a 30-year retirement fund entirely in cash? | They have low market risk but high inflation and shortfall risk, which may matter more for this goal | They have no risk at all | They have maximum market risk | They face only currency risk | Avoiding volatility can increase the risk of failing to meet a long-term goal.
SA3#investing-u04-08-q5@1,3: Explain why "risk" means different things to different investors. | Risk depends on goal and horizon: for someone needing money soon, volatility and liquidity risk matter most; for a long-term saver, inflation and shortfall risk may dominate; for a retiree, sequence and longevity risk. Professionals measure volatility, but individuals care about permanent loss and missing goals. So the right portfolio balances the risks that matter for that investor. | Different types of risk ; Short-horizon investor priorities ; Long-horizon priorities ; Retiree priorities ; Personal goal-based conclusion

## The risk–return trade-off
LV: Introductory · Foundation
S: Investors require higher expected returns to hold riskier assets. That principle links risk and return across all markets, but it promises nothing about any particular outcome: higher risk means a wider range of results, including worse ones.
O: State the risk–return trade-off and explain why it exists
O: Rank the main asset classes by expected risk and return
O: Evaluate claims of high returns with low risk
H: The principle
E: Expected return = risk-free rate + risk premium :: the premium compensates for bearing risk
P: Most investors are **risk-averse**: they prefer a certain return to an uncertain one with the same average. To persuade them to hold risky assets, those assets must be priced to offer higher expected returns. Over long periods the ranking has broadly held: cash lowest, then government bonds, corporate bonds, property and shares, with smaller and emerging market shares higher still.
X: Two investments each cost £1,000 (illustrative).
> A: guaranteed £1,040 in a year.
> B: 50% chance of £1,200, 50% chance of £880: expected £1,040.
> Most people choose A. For B to attract buyers, its price must fall (say to £980), raising its expected return to about 6.1% above A's 4%.
H: What it does not mean
- Higher risk does not guarantee a higher return; it raises the **expected** return and widens the **range** of outcomes.
- Only risk that cannot be diversified away is rewarded (School 5): holding one company's shares carries extra risk with no extra expected return.
- Claims of high returns with low risk are a classic warning sign of scams (School 11).
K: Higher expected returns are compensation for bearing risk; risk widens the range of outcomes and guarantees nothing.
!: Reading the trade-off backwards: taking more risk does not entitle you to a higher return.
EV: established | Across long histories, riskier asset classes such as equities have delivered higher average returns than safer ones such as bills.
EV: established | Investment offers promising high, guaranteed returns are a recognised feature of scams, as FCA ScamSmart warns.
T: Risk aversion | A preference for certain outcomes over uncertain ones with the same expected value
T: Risk premium | The extra expected return demanded for holding a risky asset instead of a risk-free one
SUM: Risk-averse investors require a premium, so riskier assets are priced to offer higher expected returns.
SUM: The premium applies to undiversifiable risk and widens the range of results; "high return, no risk" is a red flag.
SRC: Bodie Z., Kane A. and Marcus A. J., Investments (12th edition), McGraw Hill: risk aversion | secondary | 2021
SRC: Financial Conduct Authority, ScamSmart: how to avoid investment scams | guidance | 2026 | https://www.fca.org.uk/scamsmart
Q: State the risk–return trade-off. | Investors require higher expected returns for bearing more risk.
Q: Is the extra return for risk guaranteed? | No; risk raises expected return and widens the range of outcomes.
M1#investing-u04-09-q1@1: Which asset class has historically had the highest long-run expected return and risk? | Shares | Cash | Gilts | Money market funds | Shares have historically delivered the highest returns with the highest volatility of these.
NUM2#investing-u04-09-q2@2: The risk-free rate is 4% and an asset's risk premium is 3.5%. What is its expected return as a percentage? | 7.5 | 0.01 | % | Expected return = risk-free rate + risk premium = 4% + 3.5% = 7.5%.
M2#investing-u04-09-q3@2,3: A scheme promises 15% a year, guaranteed, with "no risk". What does the trade-off suggest? | It is implausible: high guaranteed returns without risk contradict how markets price risk, a scam warning sign | It is a good deal, since returns follow risk | It must be a government bond | It is normal for property | No genuine investment offers high returns with no risk.
M3#investing-u04-09-q4@3: Why does holding a single company's shares not earn a higher expected return than a diversified fund, despite being riskier? | Its extra risk is specific and could be diversified away, so markets do not reward it | Single shares always outperform | Diversified funds are riskier | The FCA caps single-share returns | Only systematic risk carries a premium; specific risk is uncompensated.
SA3#investing-u04-09-q5@1,3: Evaluate the claim "the more risk you take, the more you'll make". | Over long periods riskier assets have, on average, earned more, because investors demand a premium. But the statement confuses expected and actual returns: risk widens the range of outcomes, so higher risk can mean worse results, sometimes for long periods. Only undiversifiable risk is rewarded; concentrated or leveraged bets add risk without extra expected return. Risk should be matched to goals and capacity. | Risk premium explained ; Expected versus actual returns ; Wider range of outcomes ; Specific risk not rewarded ; Match risk to goals

## The equity risk premium
LV: Intermediate · Application
S: The equity risk premium is the extra return shares are expected to earn over a risk-free asset. It is the main reason long-term investors hold shares, and estimating it, from history or from current prices, is one of the central debates in finance.
O: Define the equity risk premium and how it is measured historically
O: Estimate a forward-looking equity risk premium from yields and growth
O: Evaluate why the equity risk premium is uncertain and debated
H: Definition and history
E: Equity risk premium = expected equity return − risk-free rate :: risk-free usually Treasury bills or government bonds
P: Historically, measured over long periods, equities in the UK and many other countries have beaten Treasury bills by several percentage points a year on average, according to Dimson, Marsh and Staunton's long-run data, though estimates vary with country, period and method. Mehra and Prescott (1985) called the size of the US premium a "puzzle", because standard economic models struggled to explain why investors demanded so much.
H: Forward-looking estimates
P: Historical averages may not predict the future, and survivorship (markets that collapsed, such as Russia in 1917, are easy to overlook) may inflate them. A forward-looking approach adds the dividend yield to expected dividend growth, then subtracts the risk-free rate.
E: Expected equity return ≈ dividend yield + expected growth in dividends :: a version of the Gordon growth model (School 6)
X: The market's dividend yield is 3.5%, dividends are expected to grow 3.5% a year, and gilts yield 4.5% (illustrative).
> Expected equity return ≈ 3.5% + 3.5% = 7%.
> Equity risk premium ≈ 7% − 4.5% = 2.5%.
> A lower premium than the historical average implies more modest expected rewards for equity risk.
K: The equity risk premium is the expected extra return for holding shares instead of a risk-free asset; it is positive on long-run evidence but its future size is uncertain.
!: Assuming the historical premium will repeat. History contains one sample of outcomes, and starting valuations affect future returns.
EV: established | Over the 20th century equities outperformed bills and bonds in every country in the Dimson, Marsh and Staunton dataset with continuous history.
EV: contested | The size of the future equity risk premium, and how much historical estimates are inflated by survivorship and rising valuations, are debated.
T: Equity risk premium | The extra return expected from equities over a risk-free asset
T: Equity premium puzzle | The finding that historical equity premiums are larger than standard economic models can easily explain
SUM: The ERP is equity return minus the risk-free rate, large historically but varying by country and period.
SUM: Forward estimates use yields and growth; the future premium is uncertain and debated.
SRC: Mehra R. and Prescott E. C., The equity premium: a puzzle, Journal of Monetary Economics 15(2) | primary | 1985
SRC: Dimson E., Marsh P. and Staunton M., UBS Global Investment Returns Yearbook | data | 2024
Q: Define the equity risk premium. | The expected return on equities minus the risk-free rate.
Q: What is the equity premium puzzle? | The historical equity premium is larger than standard economic models of risk aversion can explain.
M1#investing-u04-10-q1@1: Which is the best definition of the equity risk premium? | The extra return expected from shares above a risk-free asset | The dividend yield on shares | The fee charged by equity funds | The return on government bonds | It is the excess of equity returns over the risk-free rate.
NUM2#investing-u04-10-q2@2: Shares are expected to return 8% and gilts yield 4.75%. What is the implied equity risk premium as a percentage? | 3.25 | 0.01 | % | ERP = expected equity return − risk-free rate = 8% − 4.75% = 3.25%.
NUM2#investing-u04-10-q3@2: The market's dividend yield is 3%, expected dividend growth is 4% and the risk-free rate is 4.5%. Estimate the equity risk premium as a percentage. | 2.5 | 0.01 | % | Expected return ≈ 3% + 4% = 7%; ERP ≈ 7% − 4.5% = 2.5%.
M2#investing-u04-10-q4@1,3: Why might a historical equity risk premium overstate the future one? | Survivorship of successful markets and rising valuations over the period may have boosted past returns | Historical data always understate returns | Bills were risky in the past | Dividends are no longer paid | Past returns partly reflect re-rating and lucky survival, which may not recur.
M3#investing-u04-10-q5@3: Bond yields rise sharply while expected equity returns are unchanged. What happens to the expected equity risk premium? | It falls, so shares offer less extra reward relative to bonds | It rises | It is unchanged | It becomes negative automatically | ERP is equity return minus the risk-free rate; a higher risk-free rate narrows it.
SA3#investing-u04-10-q6@2,3: Evaluate the reliance of financial planners on historical equity returns when projecting clients' pensions. | Historical data show a substantial premium over long periods and across many countries, giving a reasonable basis. But the future premium may be smaller given valuations and rates, history includes survivorship bias, and averages hide wide ranges of outcomes. Prudent projections use cautious assumptions, show a range of outcomes and are revised over time; FCA rules require projections to use standard rates and warnings. | Historical evidence of a premium ; Future may differ: valuations and rates ; Survivorship bias ; Range of outcomes not a single figure ; Cautious assumptions and review

## The long-run evidence: shares, bonds and cash
LV: Introductory · Application
S: More than a century of data on UK and global markets shows shares beating bonds and cash on average, with much larger swings. The evidence supports long-term equity investing, but it also shows long periods when shares disappointed.
O: Summarise the long-run real returns of UK shares, gilts and cash
O: Interpret the frequency with which shares beat cash over different horizons
O: Evaluate the limitations of using long-run data to guide decisions
H: What the data show
P: Two main sources cover UK returns since around 1900: the **Barclays Equity Gilt Study** and Dimson, Marsh and Staunton's data (published in the UBS Global Investment Returns Yearbook). Both show, approximately and over the long run:
- **UK shares**: real returns of roughly 5% a year on average, with large variation.
- **Gilts**: real returns of roughly 1–2% a year, with long periods of negative real returns, notably during high inflation.
- **Cash (Treasury bills)**: real returns close to zero on average.
P: The longer the holding period, the more often shares have beaten cash. Over single years shares lost to cash frequently; over 10-year periods they won most of the time, but not always; over 20-year periods the record is stronger still. The exact percentages depend on the dataset and dates, which the Barclays study reports each year.
X: Compounding long-run averages over 25 years (illustrative, real terms).
> At 5% a year: £10,000 grows to about £33,900.
> At 1% a year: about £12,800.
> At 0%: £10,000. The gap explains why long-horizon savers hold shares.
H: Caveats
- Averages hide decades of poor real returns, such as UK shares in the 1970s or after 1999.
- The UK and US are among the more successful markets; some markets, such as Russia and China in the 20th century, were wiped out for investors.
- Costs and taxes, not in index data, reduce investors' actual returns.
K: Over the long run UK shares have delivered roughly 5% a year above inflation, far ahead of gilts and cash, but with long disappointing periods along the way.
!: Treating "shares beat cash over the long run" as a guarantee for your particular period.
EV: established | Over more than a century of UK data, equities have delivered higher real returns than gilts and cash, with greater volatility.
EV: contested | How representative the UK and US records are of future returns, given survivorship and changing conditions, is debated.
T: Real return | Return after adjusting for inflation
T: Rolling period | A sequence of overlapping periods of fixed length used to test how often an outcome occurred
SUM: Long-run UK data show shares beating gilts and cash by wide margins in real terms.
SUM: Longer horizons raised the odds of shares beating cash, but costs, survivorship and long bad periods are important caveats.
SRC: Barclays, Equity Gilt Study (annual long-run UK returns data) | data | 2024
SRC: Dimson E., Marsh P. and Staunton M., UBS Global Investment Returns Yearbook | data | 2024
Q: Roughly what real return have UK shares delivered since about 1900? | Approximately 5% a year on average, with large variation.
Q: Name two sources of long-run UK return data. | The Barclays Equity Gilt Study and Dimson, Marsh and Staunton's data in the UBS Global Investment Returns Yearbook.
M1#investing-u04-11-q1@1: Which asset class has delivered the lowest long-run real return in UK data? | Cash (Treasury bills) | UK shares | Global shares | Smaller companies | Cash has delivered real returns close to zero on average.
NUM2#investing-u04-11-q2@2: £20,000 grows at a real 4% a year for 25 years. What is its real value, to the nearest pound? | 53317 | 5 | £ | £20,000 × 1.04^{25} = £20,000 × 2.6658 = £53,317.
M2#investing-u04-11-q3@2: What happens to the proportion of periods in which shares beat cash as the holding period lengthens, in UK data? | It rises, though it does not reach 100% for ten-year periods | It falls | It is the same for all horizons | It reaches 100% for one-year periods | Longer horizons give more time for the premium to accumulate, but some long periods still disappointed.
M3#investing-u04-11-q4@3: Why might the UK and US long-run records overstate what a typical investor should expect from equities? | They are among history's more successful markets, and markets that failed are easy to overlook (survivorship) | They exclude dividends | They include too many crashes | They are adjusted for inflation twice | Choosing successful markets with long continuous histories biases returns upwards.
SA3#investing-u04-11-q5@1,3: Evaluate how a long-term investor should use the historical evidence on shares, bonds and cash. | The evidence supports holding shares for long horizons, since they have beaten bonds and cash in real terms, and shows the cost of holding too much cash. But it is one historical path with survivorship bias, contains long poor periods, excludes costs and taxes, and future returns depend on starting valuations. Use it to set reasonable expectations and an allocation one can hold through bad decades, not as a promise. | Supports long-term equity exposure ; Cost of excessive cash ; Survivorship and one-path caveats ; Long poor periods and costs ; Use for expectations not guarantees

## Risk-adjusted return: the Sharpe ratio
LV: Intermediate · Application
S: Comparing returns without considering risk can mislead. The Sharpe ratio measures excess return per unit of volatility, letting investors judge whether a higher return was worth the extra risk.
O: Calculate a Sharpe ratio from return, the risk-free rate and standard deviation
O: Compare investments using risk-adjusted return
O: Evaluate the limitations of the Sharpe ratio
H: The measure
E: Sharpe ratio = (portfolio return − risk-free rate) ÷ standard deviation of portfolio return
P: Developed by William Sharpe (1966), the ratio shows how much **excess return** (above cash) each unit of volatility earned. A higher ratio means more reward per unit of risk. It allows a cautious fund to be compared with an adventurous one.
X: Fund A returned 8% with 12% volatility; Fund B returned 10% with 16% volatility; the risk-free rate was 3% (illustrative).
> Sharpe A = (8 − 3) ÷ 12 = 0.42.
> Sharpe B = (10 − 3) ÷ 16 = 0.44.
> B earned more and was slightly more efficient; if B had returned 9%, its ratio (0.375) would have been lower than A's despite the higher return.
H: Limitations
- Uses standard deviation, so it treats upside and downside volatility alike; the **Sortino ratio** uses only downside deviation.
- Assumes roughly normal returns; strategies with rare large losses (selling options) can show high Sharpe ratios until they blow up.
- Sensitive to the period chosen and to smoothed valuations of illiquid assets.
- Past Sharpe ratios do not predict future ones reliably.
K: The Sharpe ratio is excess return divided by volatility: a way to compare reward per unit of risk, not a forecast.
!: Choosing the fund with the highest past return without asking how much risk it took to get there.
EV: established | The Sharpe ratio is a standard measure of risk-adjusted performance in investment analysis.
EV: established | Strategies with negatively skewed returns can show high Sharpe ratios that understate their risk of large losses.
T: Sharpe ratio | Excess return over the risk-free rate divided by the standard deviation of returns
T: Excess return | Return above the risk-free rate
T: Sortino ratio | A variant of the Sharpe ratio that divides excess return by downside deviation only
SUM: Sharpe = (return − risk-free) ÷ volatility, comparing reward per unit of risk.
SUM: It ignores the shape of returns and depends on the period, so use it with other measures.
SRC: Sharpe W. F., Mutual fund performance, Journal of Business 39(1) | primary | 1966
SRC: Sharpe W. F., The Sharpe ratio, Journal of Portfolio Management 21(1) | primary | 1994
Q: Give the formula for the Sharpe ratio. | (Portfolio return − risk-free rate) ÷ standard deviation of returns.
Q: What does the Sortino ratio change? | It uses only downside deviation instead of total standard deviation.
M1#investing-u04-12-q1@1: What does a higher Sharpe ratio indicate? | More excess return per unit of volatility | A higher absolute return in all cases | Lower charges | Fewer holdings | The ratio measures reward per unit of risk, not return alone.
NUM2#investing-u04-12-q2@1: A portfolio returned 9% with a standard deviation of 15%, and the risk-free rate was 3%. What is its Sharpe ratio, to two decimal places? | 0.4 | 0.01 |  | (9 − 3) ÷ 15 = 6 ÷ 15 = 0.40.
M2#investing-u04-12-q3@2: Fund X: return 7%, volatility 8%. Fund Y: return 11%, volatility 20%. Risk-free rate 3%. Which had the better risk-adjusted return? | Fund X: Sharpe 0.5 against 0.4 | Fund Y, because its return was higher | They are equal | Neither can be assessed | X: (7 − 3) ÷ 8 = 0.5; Y: (11 − 3) ÷ 20 = 0.4.
M3#investing-u04-12-q4@3: A strategy that sells insurance-like options shows a very high Sharpe ratio for eight years. Which is the best evaluation? | It may be hiding a risk of rare, large losses that standard deviation does not capture | It is proven to be risk-free | High Sharpe ratios always persist | It should be the whole of any portfolio | Negatively skewed strategies earn small steady gains and occasional big losses, flattering the Sharpe ratio.
SA3#investing-u04-12-q5@1,3: Evaluate the use of the Sharpe ratio when choosing between two funds. | It usefully adjusts returns for volatility, allowing like-for-like comparison of cautious and adventurous funds. But it uses past data over a chosen period, treats all volatility as bad, assumes normal returns and can be distorted by smoothed valuations or option-like strategies. It should be one input alongside costs, drawdowns, strategy, fit with the portfolio and the investor's goals. | Adjusts return for risk ; Past data and period sensitivity ; Volatility symmetry and normality ; Distortions from smoothing or skew ; Use alongside other factors

## The range of outcomes and probability
LV: Intermediate · Evaluation
S: Investment results are uncertain, so it is better to think in ranges and probabilities than in single forecasts. Over longer horizons the average annual return becomes more predictable, but the range of final wealth still widens.
O: Use mean and standard deviation to describe a likely range of returns
O: Explain how time affects the dispersion of annualised returns and of final wealth
O: Evaluate the use of projections and scenarios in planning
H: Ranges, not points
P: If annual returns had a mean of 7% and a standard deviation of 15%, roughly 95% of single years would fall between −23% and +37% (mean ± 2 standard deviations, assuming normality). A single "expected return" figure hides this spread. Planning tools increasingly show **percentile** outcomes, such as a poor (10th percentile), median and good (90th percentile) result.
H: The effect of time
E: Standard deviation of the annualised return ≈ σ ÷ √T :: T years, assuming independent returns
X: Annual volatility is 15%; the horizon is 25 years (illustrative).
> Standard deviation of the 25-year annualised return ≈ 15% ÷ 5 = 3%.
> So the annualised return would usually fall within about 7% ± 6%, between roughly 1% and 13% a year.
> But compounding over 25 years turns that range of rates into a very wide range of final values: 1.01^{25} ≈ 1.28 versus 1.13^{25} ≈ 21.2.
P: This is the subtle point of "time diversification": the average annual return becomes more predictable with time, yet the spread of possible end values, in pounds, widens. Long horizons reduce the chance of a loss but do not make outcomes certain.
K: Think in ranges: the annualised return narrows with time, but the range of final wealth widens; plans should consider poor outcomes, not just the average.
!: Planning around a single projected figure. A plan should still work if returns come in towards the poor end of the range.
EV: established | Under independent returns, the dispersion of annualised returns falls with the square root of time while the dispersion of terminal wealth increases.
EV: contested | Whether shares become less risky over long horizons ("time diversification") is debated; Samuelson and others argued the reduction in risk is often overstated.
T: Percentile | The value below which a given percentage of outcomes fall
T: Time diversification | The idea that risk falls with investment horizon, debated because terminal wealth dispersion still grows
SUM: Describe outcomes as ranges or percentiles, not single numbers.
SUM: Annualised returns become more predictable over time, but final wealth becomes more dispersed; plan for poor outcomes.
SRC: Samuelson P. A., Risk and uncertainty: a fallacy of large numbers, Scientia 98 | primary | 1963
SRC: Bodie Z., On the risk of stocks in the long run, Financial Analysts Journal 51(3) | primary | 1995
Q: Under normality, about what share of outcomes lie within two standard deviations of the mean? | About 95%.
Q: How does the standard deviation of the annualised return change with horizon T? | It falls roughly in proportion to 1 ÷ √T.
M1#investing-u04-13-q1@1: A fund has an expected annual return of 6% and a standard deviation of 12%. What is the approximate one-standard-deviation range for a single year? | −6% to 18% | 0% to 12% | −18% to 30% | 6% to 18% | Mean ± 1 standard deviation: 6 ± 12 gives −6% to 18%, covering about two-thirds of years under normality.
NUM2#investing-u04-13-q2@2: Annual volatility is 18% and the horizon is 9 years. What is the approximate standard deviation of the annualised return, as a percentage? | 6 | 0.01 | % | 18% ÷ √9 = 18% ÷ 3 = 6%.
M2#investing-u04-13-q3@2,3: A pension projection shows only a single "expected" value at 65. What is the main weakness? | It hides the wide range of possible outcomes, including poor ones the plan should survive | It always overstates fees | Projections must show zero growth | It includes too many scenarios | A single figure conveys false precision; ranges and percentiles show the real uncertainty.
M3#investing-u04-13-q4@3: Why is it wrong to say that a 30-year equity investment is "risk-free because the average return becomes stable"? | The annualised return narrows, but the range of final wealth in pounds still widens, and poor long periods remain possible | Equity returns become guaranteed after 20 years | Volatility disappears after 30 years | Long-run returns are always exactly the average | Compounding a narrower range of rates over many years still produces widely different end values.
SA3#investing-u04-13-q5@1,3: Explain why financial planners use percentile or scenario projections rather than a single growth rate. | Returns are uncertain and a single rate gives false precision. Percentile or stochastic projections show a range: median, poor and good outcomes, so the investor can see the chance of meeting a goal and test whether the plan survives poor results. They also reveal sequence and shortfall risks. The model's assumptions still matter and should be cautious and reviewed. | Uncertainty of returns ; Single figures give false precision ; Percentiles show chance of meeting goals ; Plan should survive poor outcomes ; Assumptions matter

## Survivorship bias in performance data
LV: Intermediate · Evaluation
S: Survivorship bias arises when failed or closed funds and companies drop out of the data, leaving only the survivors. It makes average past performance look better than investors actually experienced, and it distorts many claims about investing success.
O: Explain how survivorship bias arises in fund and market data
O: Calculate the effect of excluding closed funds on an average return
O: Evaluate performance claims for hidden survivorship and selection effects
H: How it arises
P: Each year some funds are closed or merged, usually after poor performance. If a database or league table shows only funds that still exist, the average return of "all funds" is inflated, because the failures have quietly disappeared. The same applies to indices of companies, hedge fund databases (where funds may stop reporting after losses) and whole stock markets.
- **Backfill bias**: a fund joins a database after a good start and brings its good early record with it.
- **Incubation**: a firm launches several small funds and markets only the ones that do well.
- **Selection in stories**: we hear about successful investors, not the many who tried the same approach and failed.
X: 100 funds start; over ten years 40 close after averaging 2% a year, and the 60 survivors average 7% (illustrative).
> Average of survivors only: 7% a year.
> Average of all 100: 0.6 × 7% + 0.4 × 2% = 5% a year.
> An investor picking at random at the start could have expected about 5%, not 7%.
H: The evidence
P: S&P Dow Jones Indices' SPIVA reports, which adjust for survivorship, have repeatedly found that a large share of actively managed funds in many markets, including the UK, were merged or closed over ten-year periods, and that most underperformed their benchmarks after fees.
K: Data that exclude failures overstate success; check whether performance figures include closed funds, start dates and all products launched.
!: Judging a fund manager's skill from a list of today's top funds, which excludes yesterday's failures.
EV: established | Fund databases that exclude closed funds overstate average performance (Elton, Gruber and Blake, 1996; Brown, Goetzmann, Ibbotson and Ross, 1992).
EV: established | SPIVA scorecards report substantial fund closures and mergers over ten-year periods across markets.
T: Survivorship bias | The distortion caused by analysing only those funds, companies or people that survived
T: Backfill bias | Inflation of database returns when funds join and bring their successful past record
SUM: Excluding failed funds and companies makes past performance look better than it was.
SUM: Survivorship-adjusted studies such as SPIVA show many funds close and most active funds lag their benchmarks.
SRC: Elton E. J., Gruber M. J. and Blake C. R., Survivorship bias and mutual fund performance, Review of Financial Studies 9(4) | primary | 1996
SRC: S&P Dow Jones Indices, SPIVA Europe Scorecard | data | 2025 | https://www.spglobal.com/spdji/en/research-insights/spiva/
Q: What is survivorship bias? | Distortion from analysing only the survivors, which excludes failures and inflates apparent success.
Q: What is backfill bias? | When funds join a database and bring a successful past record, inflating the database's returns.
M1#investing-u04-14-q1@1: Why does survivorship bias usually make fund averages look too good? | Poorly performing funds tend to close and disappear from the data | Surviving funds report returns gross of fees | Closed funds always had the best returns | Regulators remove the best funds | Failures drop out, so the remaining average is biased upwards.
NUM3#investing-u04-14-q2@2: 200 funds start. After ten years 80 have closed with an average return of 1% a year; the 120 survivors averaged 6%. What was the average for all 200 funds, as a percentage a year? | 4 | 0.01 | % | (120 × 6% + 80 × 1%) ÷ 200 = (720 + 80) ÷ 200 = 4%.
M2#investing-u04-14-q3@2,3: A newspaper profiles five investors who became rich trading penny shares. What is the main flaw in concluding the strategy works? | It ignores the many who tried and lost, so the sample is selected for success | Penny shares are illegal | Five is too many examples | Rich investors never trade | Stories of winners suffer from survivorship and selection bias.
M3#investing-u04-14-q4@3: A fund company advertises that "our three funds launched in 2019 all beat the market". Which further question best tests for selection bias? | How many funds were launched or closed in that period in total | What colour the factsheet is | How tall the fund manager is | Whether the funds have long names | Incubation and closure can leave only the winners on display.
SA3#investing-u04-14-q5@1,3: Explain how survivorship bias affects the case for active fund management. | League tables of existing funds exclude the many active funds that closed or merged, usually after poor performance, so they overstate the average active fund's results and the apparent ease of picking winners. Survivorship-adjusted studies such as SPIVA find that a large share of funds disappear and most underperform benchmarks over long periods. This strengthens the case for low-cost index funds, though some active funds do outperform. | Closed funds excluded from tables ; Overstates average active performance ; SPIVA or other adjusted evidence ; Implication for index funds ; Acknowledges some active outperformance
`;
