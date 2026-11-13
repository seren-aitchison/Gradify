// InvestorGradify Diversification and Portfolio Theory (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Why diversification works
LV: Introductory · Foundation
S: Diversification means spreading money across many investments so that no single loss is devastating. This lesson explains why combining investments reduces risk without necessarily reducing expected return.
O: Explain what diversification is
O: Show why combining investments reduces the volatility of a portfolio
O: Distinguish diversification from simply owning many similar assets
H: Not putting all your eggs in one basket
P: **Diversification** spreads money across different investments, such as many companies, sectors, countries and asset classes. If one investment falls sharply, others may hold steady or rise, so the overall portfolio is less affected. Harry Markowitz, who developed modern portfolio theory in 1952, showed that the **risk of a portfolio** depends not only on the risk of each holding but on how their returns **move together**. Diversification has been called "the only free lunch in investing" because it can reduce risk without lowering expected return.
H: How it works
- Each investment's return is partly **specific** to it, from company news or events, and partly driven by **market-wide** forces.
- Specific ups and downs in different holdings partly **cancel out** when combined.
- The portfolio's expected return is the **weighted average** of the holdings' expected returns, but its volatility is usually **lower** than the weighted average volatility.
- The benefit is greatest when holdings are **not closely correlated**.
H: Real diversification
- Owning 20 technology shares is less diversified than owning 20 shares across different sectors and countries.
- Diversification does not eliminate risk: in a general market fall, most shares decline together.
- Broad index funds give wide diversification at low cost.
X: One share versus a fund.
> Investor A puts £10,000 into a single company. It issues a profit warning and its shares fall 40%: a loss of £4,000.
> Investor B puts £10,000 into a fund holding 500 companies, including the same one at 0.2% of the fund.
> The profit warning reduces B's portfolio by only about 0.08%, or £8.
> B is still exposed to the market as a whole, but not to the fate of one company.
K: Diversification spreads money across many different investments so that specific losses are offset by other holdings; because portfolio risk depends on how returns move together, combining imperfectly correlated assets lowers volatility without necessarily lowering expected return, though it cannot remove market-wide risk.
!: Thinking diversification means owning many funds that hold the same shares. Real diversification needs holdings that behave differently.
EV: established | Combining assets that are not perfectly correlated reduces portfolio volatility.
T: Diversification | Spreading investments to reduce the impact of any single loss
T: Volatility | How much an investment's returns vary over time
T: Portfolio | The collection of investments a person holds
SUM: Spread money across different assets.
SUM: Specific risks partly cancel out.
SUM: Market risk remains.
SRC: Markowitz H., "Portfolio selection", Journal of Finance 7(1), 77–91 | primary | 1952
SRC: Bodie Z., Kane A. and Marcus A. J., Investments, 12th edition, McGraw-Hill | secondary | 2021
Q: Why is diversification sometimes called a "free lunch"? | It can reduce risk without necessarily reducing expected return.
Q: Can diversification remove all investment risk? | No, market-wide risk remains.
M1#investing-u05-01-q1@1: What does diversification mean? | Spreading money across different investments | Putting all money in one share | Holding only cash | Trading as often as possible | Applying the standard result: It spreads risk.
M2#investing-u05-01-q2@2: When is diversification most effective? | When holdings are not closely correlated | When all holdings move together | When you own one sector only | When you hold only one fund | Applying the standard result: Low correlation helps most.
NUM2#investing-u05-01-q3@2: A fund holds a company at 0.5% of its value. If that company's shares fall 40%, by how much does the fund fall, in per cent? | 0.2 | 0.01 | % | 0.5% × 40% = 0.2% fall in the fund.
M3#investing-u05-01-q4@3: An investor holds five funds that all track the same UK index. How diversified is she? | Barely more than holding one of the funds | Very well diversified globally | Fully protected from market falls | Diversified across asset classes | Applying the standard result: The funds hold the same shares.
SA2#investing-u05-01-q5@2,3: Explain why diversification reduces risk but cannot eliminate it. | Each investment's return includes specific events, such as a company's results, and market-wide movements. When many different investments are combined, specific gains and losses partly cancel out, so the portfolio is less volatile than its parts. But market-wide forces, such as recessions or interest rate changes, affect most investments together, so this systematic risk remains however many holdings are added. | Specific events ; Cancelling out ; Market-wide forces ; Remaining risk

## Correlation between assets
LV: Introductory · Application
S: Correlation measures how investments move in relation to each other. This lesson explains correlation coefficients, how correlation affects portfolio risk, and why correlations can change in crises.
O: Interpret correlation coefficients between assets
O: Explain how correlation affects portfolio volatility
O: Recognise that correlations can rise in market crises
H: Measuring correlation
P: The **correlation coefficient** (ρ) ranges from **+1** to **−1**. A value of +1 means two assets always move in the same direction in proportion; 0 means no linear relationship; −1 means they always move in opposite directions. Shares in the same sector tend to have high positive correlations; shares and high-quality government bonds have often had low or negative correlations, though not always.
H: Correlation and portfolio risk
- For two assets, portfolio volatility is σ_p = √(w_{1}^{2}σ_{1}^{2} + w_{2}^{2}σ_{2}^{2} + 2w_{1}w_{2}ρσ_{1}σ_{2}).
- If ρ = +1, there is **no diversification benefit**: portfolio volatility is the weighted average.
- The lower the correlation, the lower the portfolio's volatility.
- With ρ = −1, risk could in theory be eliminated with the right weights.
E: σ_p = √(w_{1}^{2}σ_{1}^{2} + w_{2}^{2}σ_{2}^{2} + 2w_{1}w_{2}ρσ_{1}σ_{2}) :: volatility of a two-asset portfolio
H: Correlations change
- Correlations are estimated from past data and vary over time.
- In crises, such as 2008, many risky assets fell together and correlations rose, reducing diversification just when it was most needed.
- In 2022, both shares and bonds fell as interest rates rose, showing that the usual negative share–bond correlation is not guaranteed.
X: Two assets with equal volatility.
> Two assets each have volatility of 20%, and you hold 50% in each.
> If ρ = +1, portfolio volatility is 20%: no benefit.
> If ρ = 0, volatility is √(0.25 × 0.04 + 0.25 × 0.04), which is √0.02, about 14.1%.
> Lower correlation substantially reduces risk with the same expected return.
K: Correlation, from +1 to −1, measures how assets move together; lower correlation means greater diversification benefit, as the two-asset volatility formula shows, but correlations are estimated from the past and can rise sharply in crises.
!: Assuming historical correlations will always hold. In crises, many assets fall together.
EV: established | Correlations between risky assets tend to increase during market crises.
EV: contested | Whether shares and bonds will remain negatively correlated in future is debated, especially when inflation is high.
T: Correlation coefficient | A measure from −1 to +1 of how two variables move together
T: Positive correlation | A tendency to move in the same direction
T: Negative correlation | A tendency to move in opposite directions
SUM: Correlation ranges from −1 to +1.
SUM: Lower correlation, lower risk.
SUM: Correlations change in crises.
SRC: Markowitz H., "Portfolio selection", Journal of Finance 7(1), 77–91 | primary | 1952
SRC: Bodie Z., Kane A. and Marcus A. J., Investments, 12th edition, McGraw-Hill | secondary | 2021
Q: What does a correlation of 0 mean? | There is no linear relationship between the two assets' returns.
Q: Why did diversification seem to fail in 2008? | Correlations between risky assets rose as many fell together.
M1#investing-u05-02-q1@1: What correlation gives no diversification benefit? | +1 | 0 | −0.5 | −1 | Perfectly correlated assets move together.
M2#investing-u05-02-q2@2: What happened to share–bond correlation in 2022? | Both fell together as interest rates rose | Bonds rose sharply as shares fell | Shares rose and bonds fell | Neither asset changed | Applying the standard result: Rising rates hit both.
NUM2#investing-u05-02-q3@2: Two assets each have 10% volatility, are held 50:50 and have ρ = 0. What is portfolio volatility, in per cent, to one decimal place? | 7.1 | 0.05 | % | √(0.25 × 0.01 × 2) = √0.005, about 0.0707, or 7.1%.
M3#investing-u05-02-q4@3: An investor relies on past correlations to build a portfolio. What is the main risk? | Correlations may rise in a crisis, reducing protection | Correlations always fall in crises | Past data are always perfect predictors | Correlation has no effect on risk | Applying the standard result: Relationships change.
SA2#investing-u05-02-q5@2,3: Explain how correlation affects the benefits of diversification. | Portfolio volatility depends on each asset's volatility, its weight and the correlations between assets. If assets are perfectly correlated, their movements never offset, so combining them gives no reduction in risk. As correlation falls, gains in one asset more often offset losses in another, so portfolio volatility falls below the weighted average, with the greatest benefit at low or negative correlation, though correlations can change over time. | Formula components ; Perfect correlation ; Lower correlation ; Changing correlations

## Specific and systematic risk
LV: Introductory · Application
S: Investment risk has two parts: risk specific to individual holdings, which diversification can reduce, and systematic risk, which affects the whole market. This lesson explains the difference and why only systematic risk is rewarded.
O: Distinguish specific risk from systematic risk
O: Explain how diversification affects each type
O: Explain why investors are not rewarded for specific risk
H: Two kinds of risk
P: **Specific risk** (also called unsystematic, idiosyncratic or diversifiable risk) comes from events affecting a particular company or sector: a product failure, a fraud, a lawsuit or a strike. **Systematic risk** (market or non-diversifiable risk) comes from forces affecting the whole market: recessions, interest rate changes, inflation, pandemics and political shocks. Total risk is the sum of both.
H: Diversification and risk
- Adding more holdings reduces **specific risk**, because company-specific events tend to cancel out.
- **Systematic risk** remains, however many shares you own, because they all respond to the same market forces.
- A well-diversified portfolio is left mainly with systematic risk.
H: Reward for risk
- Because specific risk can be removed cheaply by diversifying, markets do not generally offer extra expected return for bearing it.
- Investors expect to be rewarded for bearing **systematic risk**, which cannot be diversified away.
- This idea underpins the capital asset pricing model.
- Concentrated portfolios take on risk that is unlikely to be rewarded on average.
X: Two kinds of loss.
> A pharmaceutical company's key drug fails a trial, and its shares fall 30%: specific risk.
> A diversified investor holding hundreds of companies barely notices.
> In March 2020, the pandemic caused most shares worldwide to fall sharply: systematic risk.
> The diversified investor's portfolio fell too, because systematic risk cannot be diversified away.
K: Specific risk arises from events affecting individual companies and can be reduced by diversification, while systematic risk comes from market-wide forces and remains; because specific risk can be diversified cheaply, investors are rewarded on average only for bearing systematic risk.
!: Expecting a higher return for holding a few concentrated shares. Specific risk is not generally rewarded.
EV: established | Diversification substantially reduces specific risk in a portfolio of shares.
T: Specific risk | Risk from events affecting a particular company or sector
T: Systematic risk | Risk from market-wide forces that cannot be diversified away
T: Idiosyncratic | Specific to one company or asset
SUM: Specific risk can be diversified.
SUM: Systematic risk remains.
SUM: Only systematic risk is rewarded.
SRC: Sharpe W. F., "Capital asset prices: a theory of market equilibrium under conditions of risk", Journal of Finance 19(3), 425–442 | primary | 1964
SRC: Bodie Z., Kane A. and Marcus A. J., Investments, 12th edition, McGraw-Hill | secondary | 2021
Q: Give an example of specific risk. | A company's key product failing (also a fraud, lawsuit or strike at that company).
Q: Why are investors not rewarded for specific risk? | It can be removed cheaply through diversification.
M1#investing-u05-03-q1@1: Which is an example of systematic risk? | A global recession | A single company's product recall | One firm's chief executive resigning | A strike at one factory | Applying the standard result: Recessions affect the whole market.
M2#investing-u05-03-q2@2: What happens to specific risk as more holdings are added? | It falls | It rises | It stays the same | It becomes systematic risk | Applying the standard result: Specific events cancel out.
M3#investing-u05-03-q3@3: Why did diversified portfolios still fall in March 2020? | Systematic risk from the pandemic affected most shares | Diversification increases risk in crises | Specific risk rose for every company | Diversified funds hold no shares | Applying the standard result: Market-wide shocks remain.
MATCH1#investing-u05-03-q4@2: Match each event to its type of risk. | Rise in interest rates = Systematic ; Fraud at one bank = Specific ; Pandemic market crash = Systematic ; Failed drug trial = Specific | Specific events affect individual firms.
SA2#investing-u05-03-q5@2,3: Explain why concentrated portfolios are unlikely to be rewarded with higher returns on average. | A concentrated portfolio carries a large amount of specific risk from the few companies it holds. Because investors can remove this risk cheaply by diversifying, competitive markets do not generally offer extra expected return for bearing it. Investors are rewarded for systematic risk, which cannot be diversified, so concentration adds volatility without a corresponding increase in expected return. | Concentration ; Diversifiable risk ; No reward ; Systematic risk rewarded

## How many holdings are enough?
LV: Intermediate · Application
S: How many shares does a portfolio need to be diversified? This lesson reviews the evidence from classic studies, the effect of concentration in indices, and the case for broad funds.
O: Summarise research on the number of holdings needed for diversification
O: Explain diminishing returns to adding holdings
O: Evaluate the case for broad index funds
H: Early studies
P: In 1968, John Evans and Stephen Archer found that most of the reduction in volatility from diversifying came with the first **10 or so** randomly chosen US shares. Later studies, such as Meir Statman's in 1987, argued that **30 to 40 or more** shares were needed when the costs and benefits were balanced. More recent research suggests that, because individual share volatility has increased, investors need even more holdings to achieve the same reduction in specific risk.
H: Diminishing returns
- Each additional holding reduces specific risk by less than the one before.
- Going from 1 to 10 holdings removes much specific risk; going from 100 to 110 adds little.
- But even with dozens of holdings, a portfolio may miss the rare big winners that drive much of market returns.
- Research has found that a small proportion of shares accounts for most of the long-run wealth creation in stock markets.
H: Broad funds
- **Index funds** and **ETFs** can hold hundreds or thousands of companies cheaply.
- Market-cap-weighted indices can become **concentrated**: a few very large companies may make up a large share of an index, reducing diversification.
- Owning a global fund spreads risk across countries and sectors as well as companies.
X: Comparing portfolios.
> Investor A holds 8 UK shares she picked herself.
> Investor B holds a global index fund with about 3,000 companies.
> A has much higher specific risk and may miss the few companies that deliver outsized returns.
> B's risk is mainly systematic, and her costs are low.
K: Classic studies suggested 10 to 40 shares captured most diversification benefits, with diminishing returns to each addition, but rising individual volatility and the concentration of long-run returns in a few shares favour broad, low-cost funds holding hundreds or thousands of companies, while noting index concentration.
!: Believing 10 shares make a fully diversified portfolio. Much specific risk can remain, and big winners may be missed.
EV: established | The marginal reduction in specific risk falls as holdings are added.
EV: contested | The number of shares needed for adequate diversification depends on the measure used and market conditions.
T: Diminishing returns | Each extra unit giving a smaller benefit than the last
T: Index fund | A fund that tracks a market index
T: Concentration | A large share of a portfolio or index held in few assets
SUM: Most benefit comes early.
SUM: More holdings help less each time.
SUM: Broad funds diversify cheaply.
SRC: Evans J. L. and Archer S. H., "Diversification and the reduction of dispersion: an empirical analysis", Journal of Finance 23(5), 761–767 | primary | 1968
SRC: Statman M., "How many stocks make a diversified portfolio?", Journal of Financial and Quantitative Analysis 22(3), 353–363 | primary | 1987
SRC: Bessembinder H., "Do stocks outperform Treasury bills?", Journal of Financial Economics 129(3), 440–457 | primary | 2018
Q: What did Evans and Archer find in 1968? | Most of the volatility reduction came with the first 10 or so shares.
Q: Why can a market-cap-weighted index become concentrated? | A few very large companies can make up a large share of it.
M1#investing-u05-04-q1@1: What happens to the benefit of each extra holding? | It gets smaller | It gets larger | It stays constant | It becomes negative | Applying the standard result: Diminishing returns apply.
M2#investing-u05-04-q2@2: What did Bessembinder's research suggest about share returns? | A small proportion of shares accounts for most wealth creation | Every share beats Treasury bills | Small portfolios capture all big winners | Returns are spread evenly across shares | Applying the standard result: Winners are concentrated.
M3#investing-u05-04-q3@3: Why might a broad global index fund be preferred to 15 hand-picked shares? | It reduces specific risk and is less likely to miss big winners | It guarantees higher returns | It has no market risk | It always costs more | Applying the standard result: Breadth reduces specific risk.
TF1#investing-u05-04-q4@1: Market-cap-weighted index funds can never become concentrated. | false | A few very large companies can make up a large share of such an index.
SA2#investing-u05-04-q5@2,3: Evaluate the claim that "you only need 20 shares to be diversified". | Classic studies found most specific risk is removed by 10 to 40 holdings, so 20 shares remove a lot of it. However, individual share volatility has risen, so more holdings are now needed for the same effect, and long-run returns are concentrated in a few companies that a small portfolio may miss. Broad, low-cost funds diversify across thousands of companies, countries and sectors more effectively. | Classic evidence ; Rising volatility ; Concentrated returns ; Broad funds

## Home bias and global diversification
LV: Intermediate · Application
S: Investors tend to hold far more of their own country's shares than its share of world markets would suggest. This lesson explains home bias, its causes, and the case for global diversification.
O: Define home bias and give evidence for it
O: Explain the reasons for home bias
O: Evaluate the benefits and risks of global diversification
H: Home bias
P: **Home bias** is the tendency to invest disproportionately in your own country's markets. Kenneth French and James Poterba documented it in 1991, finding that investors in the US, Japan and the UK held the great majority of their equities at home. The UK accounts for only a small share, around 4%, of global stock market value, while the US accounts for well over half of global indices. A UK investor holding mostly UK shares is heavily concentrated.
H: Why it happens
- **Familiarity**: people feel more comfortable with companies they know.
- **Currency**: home assets avoid exchange rate risk.
- **Costs and taxes**, historically higher for foreign investment.
- **Information**: investors feel better informed about local firms.
- **Liabilities**: spending in pounds may justify some home bias, especially in bonds.
H: Global diversification
- Spreads risk across economies, sectors and currencies.
- The UK market is weighted towards certain sectors, such as financials, energy and consumer staples, and has fewer large technology companies.
- Global funds give access to a wider range of companies.
- Currency movements add volatility; some investors use **currency-hedged** funds, especially for bonds.
- Global diversification also means significant exposure to the US.
X: Comparing exposures.
> A UK investor holds 90% of her shares in a FTSE 100 tracker.
> The FTSE 100 makes up only a few per cent of global market value and is concentrated in a few sectors.
> Switching part of the portfolio to a global fund spreads her holdings across thousands of companies in dozens of countries.
> She accepts that currency movements will now affect her returns in pounds.
K: Home bias leads investors to hold far more domestic shares than global market weights suggest, for reasons of familiarity, currency, costs and information; the UK is a small part of world markets, so global diversification spreads risk across economies, sectors and currencies, at the cost of currency volatility.
!: Assuming a FTSE 100 tracker is globally diversified because many of its companies earn overseas. It is still concentrated in certain sectors and in UK-listed firms.
EV: established | Investors in many countries hold a much larger share of domestic equities than their weight in world markets.
EV: contested | The optimal degree of home bias is debated, especially given currency and liability considerations.
T: Home bias | Overweighting investments in one's own country
T: Currency risk | The risk that exchange rate changes affect returns
T: Currency-hedged fund | A fund that reduces the effect of currency movements
SUM: Investors overweight home markets.
SUM: The UK is a small part of world markets.
SUM: Global diversification spreads risk.
SRC: French K. R. and Poterba J. M., "Investor diversification and international equity markets", American Economic Review 81(2), 222–226 | primary | 1991
SRC: Dimson E., Marsh P. and Staunton M., UBS Global Investment Returns Yearbook | data | 2024
Q: What is home bias? | The tendency to invest disproportionately in one's own country.
Q: Roughly what share of global stock market value does the UK represent? | About 4%.
M1#investing-u05-05-q1@1: What does home bias describe? | Overweighting your own country's investments | Investing only in property | Buying shares in your employer | Holding no foreign currency | Applying the standard result: It is domestic overweighting.
M2#investing-u05-05-q2@2: Which is a reason for home bias? | Familiarity with local companies | Lower returns at home guaranteed | Laws banning foreign investment in the UK | Foreign shares cannot be bought | Applying the standard result: People favour what they know.
NUM2#investing-u05-05-q3@2: A UK investor holds £50,000 in shares, all in UK companies. If the UK is about 4% of global markets, how much would a global market weighting put in UK shares, in £? | 2000 | 0 | £ | 4% × 50,000 = 2000 in UK shares under global weights.
M3#investing-u05-05-q4@3: Why might a UK investor use a currency-hedged global bond fund? | To reduce the effect of exchange rate swings on returns | To increase currency risk deliberately | To avoid all interest rate risk | Because hedging guarantees profits | Applying the standard result: Hedging reduces currency volatility.
SA2#investing-u05-05-q5@2,3: Evaluate the case for a UK investor diversifying globally. | The UK is only a small part of world markets and is concentrated in sectors such as financials and energy, so a UK-focused portfolio carries concentrated risk. Global funds spread holdings across economies, sectors and currencies, giving access to industries underrepresented in the UK. However, currency movements add volatility, global indices are heavily weighted to the US, and some home bias may suit sterling spending needs. | UK concentration ; Global breadth ; Currency risk ; Balanced view

## Modern portfolio theory
LV: Intermediate · Application
S: Modern portfolio theory, developed by Harry Markowitz, treats investment as a trade-off between expected return and risk across a whole portfolio. This lesson explains its key ideas and assumptions.
O: Describe the main ideas of modern portfolio theory
O: Calculate the expected return of a portfolio
O: Evaluate the assumptions and limitations of the theory
H: Markowitz's insight
P: In 1952, **Harry Markowitz** argued that investors should judge investments not in isolation but by their effect on the **whole portfolio**. He measured return by **expected return** and risk by **variance** (or standard deviation) of returns, and showed how combining assets with imperfect correlations can produce portfolios with better risk–return trade-offs than any single asset. A rational investor should choose a portfolio that maximises expected return for a given level of risk. Markowitz shared the Nobel Prize in Economics in 1990.
H: Portfolio return and risk
- **Expected portfolio return** is the weighted average of the expected returns of its holdings.
- **Portfolio risk** depends on weights, individual volatilities and correlations.
- Investors are assumed to be **risk-averse**: they need a higher expected return to accept more risk.
E: E(R_p) = w_{1}E(R_{1}) + w_{2}E(R_{2}) :: expected return of a two-asset portfolio
H: Limitations
- It relies on **estimates** of expected returns, volatilities and correlations, which are uncertain and change.
- Small changes in inputs can produce very different "optimal" portfolios.
- It assumes returns are roughly normally distributed, but markets have more extreme events ("fat tails").
- Variance treats upside and downside equally, though investors mainly fear losses.
X: Expected return of a 60/40 portfolio.
> Shares are expected to return 7% a year and bonds 3%.
> A portfolio holds 60% shares and 40% bonds.
> Expected return = 0.6 × 7 + 0.4 × 3 = 4.2 + 1.2 = 5.4%.
> Its volatility will be lower than 60% of the share volatility plus 40% of the bond volatility, unless the two are perfectly correlated.
K: Modern portfolio theory judges investments by their effect on a whole portfolio, measuring risk by variance and showing that imperfectly correlated assets combine into better risk–return trade-offs; it underpins diversification but relies on uncertain estimates and simplifying assumptions about returns.
!: Treating "optimal" portfolio weights from historical data as precise. Small changes in estimates can change them greatly.
EV: established | Modern portfolio theory is a foundation of professional portfolio management.
EV: contested | Critics argue that mean–variance optimisation is too sensitive to estimation errors to be used mechanically.
T: Modern portfolio theory | A framework for choosing portfolios by expected return and risk
T: Expected return | The average return anticipated from an investment
T: Risk aversion | Preferring less risk for a given expected return
SUM: Judge investments by portfolio effect.
SUM: Return is weighted; risk depends on correlation.
SUM: Inputs are uncertain.
SRC: Markowitz H., "Portfolio selection", Journal of Finance 7(1), 77–91 | primary | 1952
SRC: Bodie Z., Kane A. and Marcus A. J., Investments, 12th edition, McGraw-Hill | secondary | 2021
Q: How did Markowitz measure risk? | By the variance or standard deviation of returns.
Q: How is a portfolio's expected return calculated? | As the weighted average of its holdings' expected returns.
M1#investing-u05-06-q1@1: Who developed modern portfolio theory? | Harry Markowitz | Warren Buffett | John Maynard Keynes | Eugene Fama | Applying the standard result: Markowitz published it in 1952.
M2#investing-u05-06-q2@2: What does risk aversion mean in MPT? | Investors need higher expected return to accept more risk | Investors prefer maximum risk | Investors ignore risk entirely | Investors never hold shares | Applying the standard result: Risk must be compensated.
NUM2#investing-u05-06-q3@2: A portfolio is 70% shares expected to return 8% and 30% bonds expected to return 3%. What is the expected return, in per cent? | 6.5 | 0.05 | % | 0.7 × 8 + 0.3 × 3 = 5.6 + 0.9 = 6.5%.
M3#investing-u05-06-q4@3: A model gives very different "optimal" portfolios when expected returns change slightly. What does this show? | MPT is sensitive to uncertain inputs | MPT is always precise | Expected returns are known exactly | Correlation has no effect | Applying the standard result: Estimation error matters.
SA2#investing-u05-06-q5@2,3: Evaluate modern portfolio theory as a guide for investors. | MPT shows clearly that risk should be judged at the portfolio level and that combining imperfectly correlated assets improves the risk–return trade-off, providing the foundation for diversification. However, its inputs are estimates that change over time, optimised portfolios are highly sensitive to small errors, returns are not normally distributed, and variance treats gains like losses, so it is best used as a framework rather than a precise formula. | Portfolio-level insight ; Diversification basis ; Input sensitivity ; Distribution and variance limits

## The efficient frontier
LV: Intermediate · Application
S: The efficient frontier shows the portfolios that offer the highest expected return for each level of risk. This lesson explains the frontier, the role of a risk-free asset, and the Sharpe ratio.
O: Describe the efficient frontier
O: Explain how a risk-free asset creates the capital market line
O: Calculate and interpret the Sharpe ratio
H: The efficient frontier
P: If you plot every possible portfolio of risky assets by **risk** (standard deviation) on the horizontal axis and **expected return** on the vertical axis, the upper-left edge of the possible combinations forms the **efficient frontier**. Portfolios on the frontier give the **highest expected return for each level of risk**. Portfolios below it are **inefficient**: another portfolio offers more return for the same risk, or the same return for less risk. The leftmost point is the **minimum-variance portfolio**.
H: Adding a risk-free asset
- If investors can lend or borrow at a **risk-free rate**, such as short-term government bills, they can combine it with a risky portfolio.
- The best risky portfolio is the one where a straight line from the risk-free rate just touches the frontier: the **tangency portfolio**.
- That line is the **capital market line**; investors choose a point on it according to their risk tolerance.
- In theory, all investors hold the same risky portfolio, mixed with different amounts of the risk-free asset.
H: The Sharpe ratio
- The **Sharpe ratio**, developed by William Sharpe, measures excess return per unit of risk: (portfolio return − risk-free rate) ÷ standard deviation.
- The tangency portfolio has the highest Sharpe ratio.
- It is used to compare funds, though it relies on past data and on volatility as the measure of risk.
E: Sharpe ratio = (R_p − R_f) ÷ σ_p :: excess return per unit of risk
X: Comparing two funds.
> Fund A returned 8% with volatility of 16%; Fund B returned 6% with volatility of 8%. The risk-free rate is 4%.
> Sharpe ratio of A: (8 − 4) ÷ 16 = 0.25.
> Sharpe ratio of B: (6 − 4) ÷ 8 = 0.25.
> Both delivered the same excess return per unit of risk, despite their different returns.
K: The efficient frontier traces portfolios with the highest expected return for each level of risk; combining a risk-free asset with the tangency portfolio produces the capital market line, and the Sharpe ratio measures excess return per unit of risk, highest at the tangency portfolio.
!: Comparing funds only by their returns. A higher return may simply reflect higher risk; the Sharpe ratio adjusts for this.
EV: established | The Sharpe ratio is one of the most widely used measures of risk-adjusted performance.
T: Efficient frontier | The set of portfolios with the highest expected return for each level of risk
T: Capital market line | The line of portfolios combining the risk-free asset and the tangency portfolio
T: Sharpe ratio | Excess return divided by standard deviation
SUM: The frontier shows efficient portfolios.
SUM: The risk-free asset creates the CML.
SUM: Sharpe ratio adjusts for risk.
SRC: Sharpe W. F., "Mutual fund performance", Journal of Business 39(1), 119–138 | primary | 1966
SRC: Bodie Z., Kane A. and Marcus A. J., Investments, 12th edition, McGraw-Hill | secondary | 2021
Q: What is an inefficient portfolio? | One below the frontier, where another portfolio gives more return for the same risk.
Q: How is the Sharpe ratio calculated? | (Portfolio return minus the risk-free rate) divided by the portfolio's standard deviation.
M1#investing-u05-07-q1@1: What does the efficient frontier show? | The highest expected return for each level of risk | The lowest return for each risk | All portfolios with zero risk | Only single shares | Applying the standard result: It shows efficient portfolios.
M2#investing-u05-07-q2@2: Which portfolio has the highest Sharpe ratio in theory? | The tangency portfolio | The minimum-variance portfolio | Any portfolio below the frontier | The risk-free asset alone | Applying the standard result: The CML touches the frontier there.
NUM2#investing-u05-07-q3@2: A fund returned 9% with volatility of 10% when the risk-free rate was 4%. What is its Sharpe ratio? | 0.5 | 0.01 | – | Sharpe ratio = (9 − 4) ÷ 10 = 0.5.
M3#investing-u05-07-q4@3: A portfolio lies below the efficient frontier. What does this mean? | Another portfolio offers more return for the same risk | It is the best possible portfolio | It has no risk at all | It cannot be held by investors | Applying the standard result: It is inefficient.
SA2#investing-u05-07-q5@2,3: Explain how adding a risk-free asset changes the choice of portfolio. | Without a risk-free asset, investors choose a point on the efficient frontier. With one, they can combine lending or borrowing at the risk-free rate with a risky portfolio. The best risky portfolio is where a line from the risk-free rate touches the frontier, the tangency portfolio with the highest Sharpe ratio. All investors then hold that portfolio, adjusting risk by how much they put in the risk-free asset. | Frontier choice ; Risk-free combinations ; Tangency portfolio ; Adjusting risk

## The capital asset pricing model (CAPM)
LV: Intermediate · Application
S: The capital asset pricing model links an investment's expected return to its systematic risk. This lesson explains the CAPM formula, the market risk premium and the security market line, and evaluates the model.
O: State the CAPM and explain its components
O: Calculate expected returns using CAPM
O: Evaluate the empirical evidence on CAPM
H: The model
P: Developed in the 1960s by William Sharpe, John Lintner and others, the **capital asset pricing model** says that the expected return on an investment equals the **risk-free rate** plus a premium for its **systematic risk**, measured by **beta**: E(R) = R_f + β × (E(R_m) − R_f). The term E(R_m) − R_f is the **market risk premium**: the extra return investors expect for holding the market rather than risk-free assets. Specific risk earns no premium, because it can be diversified away.
E: E(R) = R_f + β (E(R_m) − R_f) :: capital asset pricing model
H: The security market line
- Plotting expected return against beta gives the **security market line (SML)**.
- An asset with β = 1 has the same expected return as the market; β = 0 earns the risk-free rate.
- Assets plotting above the line would appear undervalued, and those below overvalued.
- Companies use CAPM to estimate their **cost of equity**.
H: Evaluating CAPM
- CAPM is simple and widely used, and captures the idea that only systematic risk is rewarded.
- Empirical tests have found the relationship between beta and returns flatter than predicted: low-beta shares have often done better, and high-beta shares worse, than CAPM suggests.
- Other factors, such as size and value, also explain returns, leading to multi-factor models.
X: Estimating an expected return.
> The risk-free rate is 4%, the expected market return is 9% and a share's beta is 1.2.
> The market risk premium is 9 − 4 = 5%.
> Expected return = 4 + 1.2 × 5 = 4 + 6 = 10%.
> A share with beta 0.8 would have expected return 4 + 0.8 × 5 = 8%.
K: The CAPM sets expected return equal to the risk-free rate plus beta times the market risk premium, rewarding only systematic risk; it underpins the security market line and cost-of-equity estimates, but empirical evidence shows the beta–return relationship is flatter than predicted and other factors matter.
!: Using CAPM to predict next year's return precisely. It gives a theoretical required return, not a forecast.
EV: established | CAPM remains widely used to estimate the cost of equity.
EV: contested | Empirical tests show that beta alone does not fully explain differences in average returns.
T: CAPM | A model linking expected return to systematic risk measured by beta
T: Market risk premium | The expected return on the market above the risk-free rate
T: Security market line | A graph of expected return against beta
SUM: E(R) = R_f + β × premium.
SUM: Only systematic risk is rewarded.
SUM: Evidence is mixed.
SRC: Sharpe W. F., "Capital asset prices: a theory of market equilibrium under conditions of risk", Journal of Finance 19(3), 425–442 | primary | 1964
SRC: Lintner J., "The valuation of risk assets and the selection of risky investments in stock portfolios and capital budgets", Review of Economics and Statistics 47(1), 13–37 | primary | 1965
SRC: Fama E. F. and French K. R., "The capital asset pricing model: theory and evidence", Journal of Economic Perspectives 18(3), 25–46 | secondary | 2004
Q: What is the market risk premium? | The expected return on the market minus the risk-free rate.
Q: What expected return does CAPM give an asset with beta of zero? | The risk-free rate.
M1#investing-u05-08-q1@1: In CAPM, what measures an asset's systematic risk? | Beta | Standard deviation | Dividend yield | Price–earnings ratio | Applying the standard result: Beta measures market sensitivity.
M2#investing-u05-08-q2@2: What return does CAPM predict for a share with beta of 1? | The expected market return | The risk-free rate | Zero | Twice the market return | Applying the standard result: Beta 1 matches the market.
NUM2#investing-u05-08-q3@2: The risk-free rate is 3%, the market return is 8% and a share's beta is 1.5. What is its CAPM expected return, in per cent? | 10.5 | 0.05 | % | 3 + 1.5 × 5 = 3 + 7.5 = 10.5%.
M3#investing-u05-08-q4@3: Empirical studies found low-beta shares did better than CAPM predicted. What does this suggest? | Beta alone does not fully explain returns | CAPM is perfect | High-beta shares always win | Risk is never rewarded | Applying the standard result: Other factors matter.
SA2#investing-u05-08-q5@2,3: Evaluate the capital asset pricing model. | CAPM is simple and intuitive, showing that investors should be rewarded only for systematic risk, and it is widely used to estimate the cost of equity. However, it rests on strong assumptions, such as investors holding the market portfolio, and empirical tests find the link between beta and returns flatter than predicted, while factors such as size and value also explain returns, so multi-factor models are often preferred. | Intuition and use ; Assumptions ; Empirical weaknesses ; Alternatives

## Beta
LV: Intermediate · Application
S: Beta measures how much an investment tends to move with the market. This lesson explains how beta is estimated, how to interpret it, and its limitations.
O: Define beta and interpret its values
O: Explain how beta is estimated from historical data
O: Evaluate the limitations of beta as a measure of risk
H: What beta measures
P: **Beta** (β) measures the sensitivity of an investment's returns to movements in the overall market. A beta of **1** means the investment tends to move in line with the market. A beta **above 1**, such as 1.5, means it tends to amplify market moves: rising about 15% when the market rises 10%, and falling about 15% when it falls 10%. A beta **below 1** means smaller moves, and a **negative** beta means it tends to move opposite to the market. The market itself has a beta of 1.
H: Estimating beta
- Beta is estimated by **regressing** an asset's past returns against the market's returns, for example using five years of monthly data.
- Mathematically, β = covariance(asset, market) ÷ variance(market).
- Estimates vary with the period, frequency of data and choice of market index.
- A portfolio's beta is the **weighted average** of its holdings' betas.
H: Interpreting and using beta
- High-beta sectors, such as technology and consumer discretionary, tend to swing more with the economy.
- Low-beta sectors, such as utilities and consumer staples, tend to be more defensive.
- Beta captures **systematic** risk only; a share can have low beta but high specific risk.
- Betas change over time as companies and markets change.
X: A portfolio beta.
> A portfolio holds 50% in a fund with beta 1.2, 30% in a fund with beta 0.8 and 20% in cash with beta 0.
> Portfolio beta = 0.5 × 1.2 + 0.3 × 0.8 + 0.2 × 0 = 0.6 + 0.24 + 0 = 0.84.
> If the market falls 10%, the portfolio would be expected to fall about 8.4%, all else equal.
> Actual results will differ because of specific risk and changing betas.
K: Beta measures an investment's sensitivity to market movements, with 1 matching the market, above 1 amplifying and below 1 dampening moves; it is estimated by regression on past data, a portfolio's beta is the weighted average of its holdings, and it captures only systematic risk and changes over time.
!: Assuming a low-beta share is low-risk overall. Beta ignores specific risk, which can still be large.
EV: established | Beta is the standard measure of an asset's systematic risk in the CAPM.
EV: contested | Historical beta estimates are unstable and may predict future sensitivity poorly.
T: Beta | A measure of an investment's sensitivity to market movements
T: Covariance | A measure of how two variables move together
T: Defensive share | A share with low sensitivity to the economic cycle
SUM: Beta 1 matches the market.
SUM: Estimated from past returns.
SUM: Measures systematic risk only.
SRC: Sharpe W. F., "Capital asset prices: a theory of market equilibrium under conditions of risk", Journal of Finance 19(3), 425–442 | primary | 1964
SRC: Bodie Z., Kane A. and Marcus A. J., Investments, 12th edition, McGraw-Hill | secondary | 2021
Q: What does a beta of 1.5 mean? | The investment tends to move about 1.5 times as much as the market.
Q: How is a portfolio's beta calculated? | As the weighted average of its holdings' betas.
M1#investing-u05-09-q1@1: What is the beta of the market itself? | 1 | 0 | 0.5 | 2 | Applying the standard result: The market moves with itself.
M2#investing-u05-09-q2@2: Which sector typically has a low beta? | Utilities | Technology | Luxury goods | Airlines | Applying the standard result: Utilities are defensive.
NUM2#investing-u05-09-q3@2: A portfolio is 60% in a fund with beta 1.0 and 40% in a fund with beta 0.5. What is the portfolio beta? | 0.8 | 0.01 | – | 0.6 × 1.0 + 0.4 × 0.5 = 0.6 + 0.2 = 0.8.
M3#investing-u05-09-q4@3: A share has a beta of 0.6 but its company faces a major lawsuit. What does beta fail to capture? | Specific risk from the lawsuit | Systematic market risk | The share's price | Its dividend payments | Applying the standard result: Beta measures only market sensitivity.
SA2#investing-u05-09-q5@2,3: Evaluate beta as a measure of investment risk. | Beta is simple and useful: it shows how sensitive an investment is to market movements, which is the systematic risk that cannot be diversified, and portfolio betas are easy to calculate. However, it is estimated from past data and changes over time, depends on the period and index chosen, and ignores specific risk, so a share can have low beta but high total risk. | Usefulness ; Systematic focus ; Estimation problems ; Ignores specific risk

## Factor investing
LV: Intermediate · Evaluation
S: Factor investing targets characteristics, such as value, size and momentum, that research links to long-run returns. This lesson explains the main factors, the Fama–French models, smart beta funds and the debate about whether factors will keep working.
O: Describe the main investment factors
O: Explain the Fama–French and Carhart factor models
O: Evaluate the risks and costs of factor investing
H: What are factors?
P: A **factor** is a characteristic shared by a group of securities that helps explain their returns. Eugene Fama and Kenneth French's **three-factor model** (1993) added **size** (small companies) and **value** (cheap companies relative to book value) to the market factor. Mark Carhart added **momentum** (recent winners) in 1997. Fama and French later added **profitability** and **investment** factors (2015). Other widely used factors include **quality** and **low volatility**.
H: Why factors might work
- **Risk explanations**: value and small companies may be riskier, for example more vulnerable in recessions, so investors demand higher returns.
- **Behavioural explanations**: investors may overreact or underreact to news, creating patterns such as momentum.
- **Structural** reasons, such as constraints on some investors.
H: Factor funds and risks
- **Smart beta** or factor ETFs tilt portfolios towards chosen factors using rules.
- Factors can **underperform for long periods**: value shares lagged growth shares for much of the 2010s.
- Once factors are widely known and traded, their premiums may shrink.
- Some apparent factors found in historical data may be due to **data mining**.
- Costs and turnover reduce net returns.
X: A value tilt.
> An investor uses a global value ETF for part of her equity allocation.
> In 2014 to 2020, value shares lag growth shares and her portfolio trails a market fund.
> In 2022, value outperforms as interest rates rise.
> She concludes that factor tilts require patience and conviction through long dry spells.
K: Factors such as market, size, value, momentum, profitability, investment, quality and low volatility help explain returns in models from Fama–French and Carhart; they may reflect risk or behaviour, and factor funds can capture them, but premiums vary, can disappear for years and may shrink once widely exploited.
!: Expecting a factor tilt to outperform every year. Factors can underperform for a decade or more.
EV: established | Multi-factor models explain more of the variation in returns than CAPM alone.
EV: contested | Whether factor premiums will persist after becoming widely known is debated.
T: Factor | A characteristic of securities linked to their returns
T: Value factor | The tendency of cheap shares relative to fundamentals to outperform
T: Smart beta | Rules-based funds that tilt towards chosen factors
SUM: Size, value, momentum and more.
SUM: Risk or behaviour may explain them.
SUM: Factors can lag for years.
SRC: Fama E. F. and French K. R., "Common risk factors in the returns on stocks and bonds", Journal of Financial Economics 33(1), 3–56 | primary | 1993
SRC: Carhart M. M., "On persistence in mutual fund performance", Journal of Finance 52(1), 57–82 | primary | 1997
SRC: Fama E. F. and French K. R., "A five-factor asset pricing model", Journal of Financial Economics 116(1), 1–22 | primary | 2015
Q: Which factors did Fama and French add in their 1993 model? | Size and value.
Q: What did Carhart add? | Momentum.
M1#investing-u05-10-q1@1: Which factor targets companies that are cheap relative to their book value? | Value | Momentum | Size | Low volatility | Applying the standard result: Value buys cheap shares.
M2#investing-u05-10-q2@2: What is momentum in factor investing? | The tendency of recent winners to keep outperforming for a time | Buying only the largest companies | Holding only bonds | Avoiding all volatility | Applying the standard result: Momentum follows trends.
M3#investing-u05-10-q3@3: Value shares underperform for years. What does this show? | Factor premiums can disappear for long periods | Value investing never works | Factors always beat the market | Factor funds have no costs | Applying the standard result: Factors are not guaranteed.
MATCH2#investing-u05-10-q4@2: Match each factor to its description. | Size = Small companies ; Value = Cheap relative to fundamentals ; Momentum = Recent winners ; Quality = Profitable, stable companies | Factors target characteristics.
SA2#investing-u05-10-q5@2,3: Evaluate factor investing as a strategy. | Research shows factors such as value, size and momentum have historically explained and added to returns, and smart beta funds offer cheap, rules-based exposure. However, factors can underperform for many years, premiums may shrink as more investors exploit them, some may be artefacts of data mining, and costs reduce returns, so investors need diversification across factors and long-term patience. | Evidence ; Access via funds ; Long underperformance ; Data mining and costs

## Strategic asset allocation
LV: Intermediate · Application
S: Strategic asset allocation sets the long-term mix of asset classes in a portfolio. This lesson explains how it is set, why it matters so much, and how it relates to goals, time horizon and risk tolerance.
O: Define strategic asset allocation
O: Explain the factors that determine an investor's allocation
O: Evaluate evidence on the importance of asset allocation
H: What it is
P: **Strategic asset allocation** is the long-term target mix of **asset classes**, such as shares, bonds, property and cash, that suits an investor's objectives. A common example is a "60/40" portfolio of 60% shares and 40% bonds. The allocation is set in advance and maintained by rebalancing, rather than changed in response to short-term market views. Because different asset classes have very different risks and returns, the allocation is the main driver of how a portfolio behaves.
H: Setting the allocation
- **Goals**: what the money is for, such as retirement or a house deposit.
- **Time horizon**: longer horizons can usually tolerate more volatile assets such as shares.
- **Risk tolerance**: willingness to accept losses without panicking.
- **Risk capacity**: ability to absorb losses without harming essential plans.
- **Liquidity needs**, tax and costs.
- Regulated advisers must assess suitability under FCA rules, including the Consumer Duty.
H: Why it matters
- A 1986 study by Brinson, Hood and Beebower found that asset allocation policy explained over 90% of the **variation** in pension funds' quarterly returns over time.
- This is often misquoted as explaining 90% of **returns**; later work showed it explains variation through time much more than differences between funds.
- Even so, the choice between, say, 80% and 20% in shares matters far more for most investors' outcomes than picking individual funds.
X: Two investors.
> Investor A, aged 30, is saving for retirement in 35 years and is comfortable with large swings: an allocation of 80% shares and 20% bonds may suit her.
> Investor B, aged 60, plans to buy a home in two years: he needs stability, so more cash and short-term bonds.
> Both choose diversified funds, but their strategic allocations differ greatly.
> Their outcomes will depend far more on these allocations than on which share funds they choose.
K: Strategic asset allocation sets a long-term mix of asset classes based on goals, time horizon, risk tolerance and risk capacity, maintained through rebalancing; it largely determines a portfolio's behaviour, as Brinson's study of return variation shows, though it is often misquoted as explaining 90% of returns.
!: Saying asset allocation explains 90% of returns. Brinson's finding concerned the variation of returns over time.
EV: established | Asset allocation is the main determinant of a diversified portfolio's risk and return profile.
EV: contested | How much of the differences in returns between funds is explained by allocation rather than selection remains debated.
T: Strategic asset allocation | A long-term target mix of asset classes
T: Risk tolerance | Willingness to accept investment losses
T: Risk capacity | Ability to absorb losses without harming essential plans
SUM: Set a long-term mix.
SUM: Base it on goals and risk.
SUM: Allocation drives outcomes.
SRC: Brinson G. P., Hood L. R. and Beebower G. L., "Determinants of portfolio performance", Financial Analysts Journal 42(4), 39–44 | primary | 1986
SRC: Financial Conduct Authority, Consumer Duty (PRIN 2A) | standard | 2023 | https://www.fca.org.uk/firms/consumer-duty
Q: What is a 60/40 portfolio? | A portfolio of 60% shares and 40% bonds.
Q: What is risk capacity? | The ability to absorb losses without harming essential plans.
M1#investing-u05-11-q1@1: What does strategic asset allocation set? | A long-term target mix of asset classes | Daily share trades | The price of each share | Interest rates | Applying the standard result: It is a long-term plan.
M2#investing-u05-11-q2@2: Which factor usually allows a higher allocation to shares? | A longer time horizon | Needing the money next month | Very low risk tolerance | A need for regular cash withdrawals | Applying the standard result: Time helps absorb volatility.
NUM2#investing-u05-11-q3@2: A £20,000 portfolio follows a 70/30 share–bond allocation. How much is in bonds, in £? | 6000 | 0 | £ | 30% × 20,000 = 6000 in bonds.
M3#investing-u05-11-q4@3: Which statement about Brinson's 1986 study is accurate? | Allocation explained most of the variation in returns over time | Allocation explains exactly 90% of all returns | Fund selection matters more than allocation | Asset allocation has no effect | Applying the standard result: The result concerns variation.
SA2#investing-u05-11-q5@2,3: Explain how an investor's circumstances shape their strategic asset allocation. | The allocation depends on goals, such as retirement or a house deposit; time horizon, since longer horizons can absorb share volatility; risk tolerance, the willingness to bear losses; and risk capacity, the ability to absorb losses without harming essential plans. Liquidity needs, taxes and costs also matter, and regulated advisers must ensure the allocation is suitable for the client. | Goals ; Time horizon ; Tolerance and capacity ; Other factors

## Tactical asset allocation
LV: Intermediate · Evaluation
S: Tactical asset allocation adjusts a portfolio away from its long-term mix to exploit short-term market views. This lesson explains how it works and examines the evidence on whether it adds value.
O: Distinguish tactical from strategic asset allocation
O: Describe how tactical decisions are made
O: Evaluate the evidence on the success of market timing
H: What tactical allocation is
P: **Tactical asset allocation (TAA)** makes temporary departures from the strategic mix to take advantage of perceived short-term opportunities: for example, moving from 60% to 65% shares because a manager believes shares are cheap. The aim is to add return or reduce risk relative to the strategic benchmark. Tactical moves are usually limited to set ranges around the strategic weights.
H: How decisions are made
- **Valuation** signals, such as price–earnings ratios or bond yields.
- **Economic forecasts**, such as expected growth or inflation.
- **Momentum** and trend signals.
- **Sentiment** indicators, such as investor surveys.
- Many multi-asset fund managers use some tactical allocation.
H: Does it work?
- Successful timing requires being right twice: when to move and when to move back.
- Many of the market's best days occur close to its worst days, so investors who move to cash during falls often miss the rebound.
- Studies of fund managers find little consistent evidence that tactical calls add value after costs.
- Valuations have some long-term predictive power, but are weak guides to short-term returns.
- Behavioural biases, such as overconfidence, can lead individual investors to trade too often.
X: Market timing in a crash.
> An investor sells her shares in March 2020 as markets fall sharply, planning to buy back "when things settle".
> Markets rebound strongly within weeks, partly on a few very strong days.
> She buys back months later at higher prices.
> Her tactical move locked in losses and missed the recovery.
K: Tactical asset allocation makes temporary, limited departures from the strategic mix based on valuations, forecasts, momentum or sentiment, but successful market timing requires repeated correct decisions, the best and worst days often cluster together, and evidence that tactical calls add value after costs is weak.
!: Selling everything during a crash to "wait for things to settle". Investors often miss the rebound.
EV: established | A significant share of long-run equity returns comes from a small number of strong days, many close to market lows.
EV: contested | Whether skilled managers can add value through tactical allocation is debated, with mixed evidence.
T: Tactical asset allocation | Short-term departures from a strategic mix based on market views
T: Market timing | Trying to move in and out of markets ahead of price moves
T: Overconfidence | Overestimating one's own judgement or knowledge
SUM: Short-term tilts from the strategic mix.
SUM: Must be right twice.
SUM: Evidence of added value is weak.
SRC: Bodie Z., Kane A. and Marcus A. J., Investments, 12th edition, McGraw-Hill | secondary | 2021
SRC: Barber B. M. and Odean T., "Trading is hazardous to your wealth: the common stock investment performance of individual investors", Journal of Finance 55(2), 773–806 | primary | 2000
Q: What is tactical asset allocation? | Temporary departures from the strategic mix to exploit short-term market views.
Q: Why is market timing difficult? | You must be right about both when to move out and when to move back.
M1#investing-u05-12-q1@1: How does tactical allocation differ from strategic allocation? | It makes temporary short-term adjustments | It sets the long-term target mix | It never changes the portfolio | It only applies to cash | Applying the standard result: Tactical moves are temporary.
M2#investing-u05-12-q2@2: What did Barber and Odean find about individual investors who traded most? | They earned lower returns after costs | They earned the highest returns | Trading had no effect | They avoided all losses | Applying the standard result: Frequent trading hurt returns.
M3#investing-u05-12-q3@3: Why do investors who sell during a market crash often lose out? | They miss the strong rebound days that follow | Markets never recover after crashes | Cash always outperforms shares | Selling has no effect on returns | Applying the standard result: Best days cluster near worst days.
TF2#investing-u05-12-q4@2: Valuation measures such as price–earnings ratios are reliable guides to next month's returns. | false | Valuations have some long-term predictive power but are weak short-term guides.
SA2#investing-u05-12-q5@2,3: Evaluate tactical asset allocation as a way to improve returns. | Tactical allocation can, in principle, add value by tilting towards cheaper or more promising assets, and some managers use valuation and momentum signals. However, it requires repeated correct timing decisions, incurs trading costs and taxes, and the best market days often follow the worst, so moving out can miss rebounds. Evidence that tactical calls consistently add value after costs is weak, especially for individual investors prone to overconfidence. | Potential benefits ; Timing difficulty ; Costs ; Weak evidence

## Rebalancing
LV: Intermediate · Application
S: Over time, market movements push a portfolio away from its target allocation. This lesson explains why rebalancing matters, the main approaches and their trade-offs.
O: Explain why portfolios drift from their target allocation
O: Compare calendar and threshold rebalancing
O: Calculate the trades needed to rebalance a portfolio
H: Drift
P: If shares rise faster than bonds, a 60/40 portfolio may drift to 70/30, making it **riskier** than intended. If shares fall, the portfolio becomes more conservative. **Rebalancing** means buying and selling to bring the portfolio back to its target. Its main purpose is to **control risk** and keep the portfolio consistent with the investor's plan, rather than to boost returns.
H: Approaches
- **Calendar rebalancing**: at fixed intervals, such as once a year.
- **Threshold rebalancing**: when an asset class drifts beyond a set band, such as 5 percentage points from target.
- **Combined**: check at intervals and rebalance only if thresholds are breached.
- Research by Vanguard suggests there is no single optimal frequency; annual or threshold-based approaches balance risk control and costs reasonably.
H: Practical considerations
- Rebalancing can involve **trading costs** and, outside tax wrappers such as ISAs and pensions, **capital gains tax**.
- Using new contributions or withdrawals to rebalance can reduce costs.
- Rebalancing means **selling what has risen and buying what has fallen**, which can feel uncomfortable but enforces discipline.
- Multi-asset funds rebalance automatically.
X: Rebalancing a portfolio.
> A £100,000 portfolio targets 60% shares and 40% bonds.
> After a strong year, shares are worth £70,000 and bonds £35,000: a total of £105,000.
> The target is 60% of £105,000, or £63,000, in shares, and £42,000 in bonds.
> The investor sells £7,000 of shares and buys £7,000 of bonds.
K: Market movements cause portfolios to drift from their targets, changing their risk; rebalancing, by calendar, threshold or a combination, restores the target mix, mainly to control risk, while costs, taxes and the use of new cash flows affect how and when to do it.
!: Thinking rebalancing is mainly a way to increase returns. Its main purpose is to keep risk at the intended level.
EV: established | Without rebalancing, portfolios tend to drift towards higher-risk assets over long periods of rising share prices.
T: Rebalancing | Restoring a portfolio to its target allocation
T: Drift | The change in a portfolio's allocation caused by market movements
T: Threshold rebalancing | Rebalancing when an allocation moves beyond a set band
SUM: Portfolios drift.
SUM: Rebalance by calendar or threshold.
SUM: Control risk, mind costs.
SRC: Zilbering Y., Jaconetti C. M. and Kinniry F. M., Best Practices for Portfolio Rebalancing, Vanguard | secondary | 2015
SRC: Bodie Z., Kane A. and Marcus A. J., Investments, 12th edition, McGraw-Hill | secondary | 2021
Q: What is the main purpose of rebalancing? | To keep a portfolio's risk consistent with its target allocation.
Q: How can new contributions help rebalancing? | By directing new money to underweight assets, reducing the need to sell.
M1#investing-u05-13-q1@1: What does rebalancing involve? | Restoring a portfolio to its target allocation | Moving all money into cash | Choosing new funds every month | Increasing risk deliberately | Applying the standard result: It restores the target mix.
M2#investing-u05-13-q2@2: What is threshold rebalancing? | Rebalancing when an asset moves beyond a set band | Rebalancing on a fixed date only | Never rebalancing | Rebalancing every day | Applying the standard result: Bands trigger trades.
NUM2#investing-u05-13-q3@2: A portfolio targets 50% shares. It is worth £80,000, with £48,000 in shares. How much must be sold from shares to return to target, in £? | 8000 | 0 | £ | Target shares are 50% × 80,000 = 40,000, so sell 48,000 − 40,000 = 8000.
M3#investing-u05-13-q4@3: An investor never rebalances during a long bull market. What is the likely effect? | The portfolio becomes riskier than intended | The portfolio becomes safer over time | Nothing changes at all | It always earns higher returns safely | Applying the standard result: Shares grow as a share of the total.
SA2#investing-u05-13-q5@2,3: Explain why rebalancing is important and how an investor might do it. | As markets move, portfolios drift; after share gains, a 60/40 portfolio might become 70/30 and riskier than the investor intended. Rebalancing restores the target by selling what has risen and buying what has fallen, either on a fixed schedule or when allocations pass set thresholds. Investors can reduce costs and tax by using new contributions or withdrawals and rebalancing within ISAs and pensions. | Drift and risk ; Restoring target ; Calendar and threshold ; Costs and tax

## Lifestyling and glide paths
LV: Intermediate · Application
S: As people approach the time they need their money, many funds gradually reduce investment risk. This lesson explains lifestyling, target-date funds and glide paths, and how pension freedoms changed them.
O: Explain lifestyling and glide paths
O: Describe target-date funds
O: Evaluate the strengths and limitations of automatic de-risking
H: Lifestyling
P: **Lifestyling** automatically moves a pension or savings fund from higher-risk assets, such as shares, towards lower-risk assets, such as bonds and cash, as the saver approaches a target date such as retirement. The idea is to reduce the risk that a market fall just before retirement badly damages savings, a problem called **sequence risk**. The planned path of this shift is the **glide path**. Many UK workplace pension default funds use lifestyling.
H: Target-date funds
- A **target-date fund** has a set year in its name, such as "Retirement 2050", and follows a glide path towards that date.
- Early on it may hold mainly shares; it de-risks gradually over the final 10 to 15 years.
- It offers a simple "single-fund" solution.
- Glide paths differ between providers, so two funds with the same date can hold very different mixes.
H: Pension freedoms
- Before 2015, many UK savers bought an **annuity** at retirement, so lifestyling often moved into bonds that matched annuity prices, and cash.
- The **pension freedoms** introduced in April 2015 allowed people to keep money invested in **drawdown**.
- Many default funds now target drawdown, keeping more in growth assets beyond retirement.
- Savers should check that their glide path matches how they plan to use their pension.
X: A glide path in practice.
> A saver aged 40 is in a workplace pension default fund targeting retirement at 67.
> Until about 15 years before retirement, the fund holds mostly global shares.
> From age 52 it gradually increases bonds and cash, ending with a balanced mix.
> If she plans to stay invested in drawdown, she checks the fund is not designed for buying an annuity.
K: Lifestyling and target-date funds reduce investment risk automatically along a glide path as a target date approaches, limiting sequence risk; glide paths differ between providers, and since the 2015 pension freedoms many target drawdown rather than annuity purchase, so savers should check that the path matches their plans.
!: Assuming all target-date funds with the same year are the same. Glide paths and asset mixes vary widely.
EV: established | Most UK workplace pension default funds use some form of lifestyling.
EV: contested | How much risk to keep in retirement, especially in drawdown, is debated.
T: Lifestyling | Automatically reducing investment risk as a target date approaches
T: Glide path | The planned shift in asset mix over time
T: Sequence risk | The danger that poor returns near withdrawals cause lasting damage
SUM: De-risk as the target nears.
SUM: Target-date funds follow glide paths.
SUM: Match the path to your plans.
SRC: Pensions Policy Institute, The DC Future Book | data | 2024
SRC: Financial Conduct Authority, Retirement Outcomes Review: Final Report (MS16/1.3) | primary | 2018
Q: What is sequence risk? | The danger that poor returns near the time of withdrawal cause lasting damage to savings.
Q: How did the 2015 pension freedoms affect lifestyling? | Many funds shifted from targeting annuity purchase to targeting drawdown.
M1#investing-u05-14-q1@1: What does lifestyling do? | Gradually reduces risk as a target date approaches | Increases risk every year until retirement | Keeps the same mix forever | Moves all money into shares at retirement | Applying the standard result: It de-risks over time.
M2#investing-u05-14-q2@2: What is a target-date fund? | A fund following a glide path towards a set year | A fund that only holds cash | A fund for day trading | A fund that guarantees returns | Applying the standard result: The date sets the glide path.
NUM2#investing-u05-14-q3@2: A glide path starts de-risking 15 years before retirement at 67. At what age does de-risking begin? | 52 | 0 | years | 67 − 15 = 52, so de-risking begins at age 52.
M3#investing-u05-14-q4@3: A saver plans to stay invested in drawdown, but her default fund de-risks fully into cash for an annuity. What should she do? | Check whether a drawdown-focused option suits her better | Ignore it, as all funds are the same | Move everything into a single share | Stop contributing to her pension | Applying the standard result: The path should match her plans.
SA2#investing-u05-14-q5@2,3: Evaluate the use of lifestyling in pension default funds. | Lifestyling protects savers who do not actively manage their pensions by reducing risk as retirement nears, limiting the damage a late market fall could cause. However, glide paths vary, may de-risk too early or too much, and may not match how people now use pensions under the 2015 freedoms, such as staying invested in drawdown, so savers should check their default fund suits their plans. | Protection from sequence risk ; Simplicity ; Variation and timing ; Fit with pension freedoms

## Multi-asset funds and model portfolios
LV: Intermediate · Application
S: Many investors use ready-made portfolios that hold a mix of assets. This lesson explains multi-asset funds and model portfolios, how risk ratings work, and what to check before investing.
O: Describe multi-asset funds and model portfolios
O: Explain risk ratings and risk-graded portfolios
O: Evaluate costs, transparency and suitability
H: Ready-made portfolios
P: A **multi-asset fund** holds a mix of asset classes, such as shares, bonds and sometimes property and alternatives, in one fund, with the manager handling allocation and rebalancing. Types include **static allocation** funds, such as fixed 60/40 index funds, and **actively managed** funds that change allocations. A **model portfolio** is a recommended mix of funds, often offered by platforms or advisers, which may be rebalanced on the investor's behalf. Both offer **diversification** and **convenience** in a single decision.
H: Risk ratings
- Funds are often grouped by risk level, such as "cautious", "balanced" and "adventurous", or numbered scales.
- The Synthetic Risk and Reward Indicator (SRRI), on a scale of 1 to 7, has been used in UK fund key information documents, based on past volatility.
- Risk labels are not standardised across providers, so a "balanced" fund from one may hold far more shares than another's.
- Always check the actual asset mix.
H: What to check
- **Costs**: the ongoing charges figure (OCF) and any platform or adviser fees.
- **Asset mix** and how much it can change.
- **Diversification** across regions and asset classes.
- **Performance** relative to suitable benchmarks, over the long term.
- **Suitability** for your goals and risk, as FCA rules require firms to consider.
X: Comparing two "balanced" funds.
> Fund A, labelled "balanced", holds 60% shares and has an OCF of 0.22%.
> Fund B, also "balanced", holds 40% shares, 20% alternatives and has an OCF of 0.95%.
> Despite the same label, they have different risk profiles and costs.
> Over 20 years, the difference in charges alone could significantly affect the final value.
K: Multi-asset funds and model portfolios provide diversified, managed mixes of assets in one decision, grouped by risk level, but labels are not standardised, so investors should check the actual asset mix, costs, diversification, performance and suitability.
!: Relying on a fund's "balanced" label alone. Asset mixes and risk vary widely between providers.
EV: established | Charges compound over time and can substantially reduce long-term returns.
T: Multi-asset fund | A fund holding several asset classes in one portfolio
T: Model portfolio | A recommended mix of funds, often rebalanced for the investor
T: Ongoing charges figure | The annual cost of running a fund, as a percentage of assets
SUM: One-stop diversified portfolios.
SUM: Check the real asset mix.
SUM: Costs and suitability matter.
SRC: Financial Conduct Authority, Asset Management Market Study: Final Report (MS15/2.3) | primary | 2017
SRC: Financial Conduct Authority, Consumer Duty (PRIN 2A) | standard | 2023 | https://www.fca.org.uk/firms/consumer-duty
Q: What is a model portfolio? | A recommended mix of funds, often rebalanced on the investor's behalf.
Q: Why should you check a multi-asset fund's actual holdings? | Risk labels are not standardised, so funds with the same label can differ greatly.
M1#investing-u05-15-q1@1: What does a multi-asset fund hold? | A mix of asset classes in one fund | Shares in one company only | Only cash deposits | A single government bond | Applying the standard result: It combines asset classes.
M2#investing-u05-15-q2@2: What does the OCF measure? | The annual cost of running a fund | The fund's expected return | The number of holdings | The fund's risk rating | Applying the standard result: Charges reduce returns.
NUM2#investing-u05-15-q3@2: A £50,000 investment is in a fund with an ongoing charge of 0.8% a year. Roughly how much is charged in the first year, in £? | 400 | 0 | £ | 0.8% × 50,000 = 400 in the first year.
M3#investing-u05-15-q4@3: Two funds are both labelled "cautious" but one holds 70% shares. What should an investor conclude? | Labels are not standardised, so check holdings | Both funds must be identical | The 70% shares fund is the safest | Labels guarantee the asset mix | Applying the standard result: Real holdings decide risk.
SA2#investing-u05-15-q5@2,3: Explain what an investor should check before choosing a multi-asset fund or model portfolio. | They should check the actual asset mix rather than the label, how much the manager can change it, and how diversified it is across regions and asset classes. They should compare ongoing charges and platform or adviser fees, since costs compound, look at long-term performance against suitable benchmarks, and make sure the risk level suits their goals, time horizon and capacity for loss. | Asset mix ; Costs ; Performance ; Suitability
`;
