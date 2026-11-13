// School 5: Diversification and Portfolio Theory. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md):
// objectives, key terms, summaries, typed and dated sources, evidence status (EV:) and questions at three levels
// (Foundation, Application, Evaluation) in every lesson. Education, not financial advice: no portfolio here is a
// recommendation and worked numbers are illustrative. Explanations are original; sources are those used for checking,
// pending human verification.
export default `
## Why diversification works
LV: Introductory · Foundation
S: Diversification means spreading money across many investments that do not all move together. Because their ups and downs partly cancel out, a diversified portfolio is less volatile than its parts, without giving up expected return. It has been called the only free lunch in investing.
O: Explain how combining imperfectly correlated assets reduces risk
O: Calculate the expected return and risk of a simple two-asset portfolio
O: Evaluate the limits of diversification
H: The idea
P: A portfolio's **expected return** is simply the weighted average of its holdings' expected returns. Its **risk**, however, is usually lower than the weighted average of their risks, because when one holding falls another may rise or fall less. The less closely holdings move together, the bigger the reduction. Harry Markowitz formalised this in 1952, and it is the foundation of modern portfolio management.
E: Expected return of portfolio = Σ weight × expected return
E: σ_{p}² = w_{1}²σ_{1}² + w_{2}²σ_{2}² + 2w_{1}w_{2}ρσ_{1}σ_{2} :: ρ is the correlation between the two assets
X: Half in Asset A (expected 8%, volatility 15%) and half in Asset B (expected 6%, volatility 12%), with correlation 0.2 (illustrative).
> Expected return = 0.5 × 8% + 0.5 × 6% = 7%.
> Variance = 0.25 × 0.0225 + 0.25 × 0.0144 + 2 × 0.25 × 0.2 × 0.15 × 0.12 = 0.011025; volatility = 10.5%.
> The weighted average volatility is 13.5%, so diversification removed 3 percentage points of risk at no cost to expected return.
H: What it cannot do
- It cannot remove **market risk**: in a global crash most shares fall together.
- Correlations tend to **rise in crises**, just when diversification is most wanted.
- It reduces the chance of a spectacular result as well as a disastrous one: you will never own only the best performer.
K: Diversification lowers risk without lowering expected return, because imperfectly correlated holdings partly offset each other; it cannot remove market-wide risk.
!: Thinking you are diversified because you own many funds. If they all hold the same large companies, the overlap leaves you concentrated.
EV: established | Combining assets that are not perfectly correlated produces portfolio volatility below the weighted average of individual volatilities (Markowitz, 1952).
EV: established | Correlations between risky assets tend to increase during market crises.
T: Diversification | Spreading investments across assets that do not move perfectly together to reduce risk
T: Portfolio | The collection of investments held by an investor
SUM: Portfolio return is a weighted average; portfolio risk is lower when holdings are imperfectly correlated.
SUM: Diversification removes specific risk at no cost but cannot remove market risk, and correlations rise in crises.
SRC: Markowitz H., Portfolio selection, Journal of Finance 7(1) | primary | 1952
SRC: Bodie Z., Kane A. and Marcus A. J., Investments (12th edition), McGraw Hill: optimal risky portfolios | secondary | 2021
Q: Why is diversification called a free lunch? | It reduces risk without reducing expected return.
Q: Which risk can diversification not remove? | Market (systematic) risk.
M1#investing-u05-01-q1@1: What determines how much diversification reduces risk? | How closely the holdings' returns move together (their correlation) | The number of letters in each fund's name | The size of each company's head office | Whether shares pay dividends | Lower correlation means more offsetting and more risk reduction.
NUM2#investing-u05-01-q2@2: A portfolio is 60% in shares expected to return 8% and 40% in bonds expected to return 3%. What is its expected return as a percentage? | 6 | 0.01 | % | Weighted average: 0.6 × 8% + 0.4 × 3% = 4.8% + 1.2% = 6%.
M2#investing-u05-01-q3@2: Two assets each have 20% volatility. If they are perfectly correlated (ρ = 1), what is the volatility of a 50/50 portfolio? | 20%: with perfect correlation there is no diversification benefit | 10% | 0% | 28% | With ρ = 1 the portfolio volatility equals the weighted average, so no risk is removed.
M3#investing-u05-01-q4@3: In a severe global crash most of an investor's holdings fall together. Which is the best evaluation? | Diversification still helped against specific risk, but rising correlations in crises limit its protection against market-wide falls | Diversification has failed and should be abandoned | The investor must not have owned any shares | Diversification guarantees protection in crashes | Diversification is not insurance against systematic falls; bonds and cash may help more in such periods.
SA3#investing-u05-01-q5@1,3: Evaluate the claim that diversification is "the only free lunch in investing". | Diversification reduces volatility without lowering expected return, because imperfectly correlated holdings partly cancel, which is genuinely free in that sense. But it cannot remove market risk, correlations rise in crises, it gives up the chance of concentrated windfalls, and over-diversification across costly funds can add fees. Broadly it is free, but it is not unlimited protection. | Risk reduced without lower expected return ; Correlation is the mechanism ; Market risk remains ; Correlations rise in crises ; Costs or concentrated upside caveat

## Correlation between assets
LV: Intermediate · Application
S: Correlation measures how closely two assets' returns move together, on a scale from −1 to +1. It is the key input to diversification: assets with low or negative correlation combine to give smoother portfolios.
O: Interpret correlation coefficients between −1 and +1
O: Calculate portfolio volatility for different correlations
O: Evaluate the stability of correlations over time
H: The scale
- **+1**: perfect positive correlation; the assets always move in step, so no diversification benefit.
- **0**: no linear relationship; substantial risk reduction.
- **−1**: perfect negative correlation; risk can in principle be eliminated.
P: Shares in the same country and sector tend to have high positive correlations; shares and high-quality government bonds have often had low or negative correlations in recent decades, though not in 2022; cash has almost no correlation with anything. Correlation is calculated from historical returns and is related to **covariance**: covariance = ρ × σ_{1} × σ_{2}.
X: A portfolio is 60% shares (volatility 20%) and 40% bonds (volatility 8%) (illustrative).
> Correlation +1: volatility = 0.6 × 20% + 0.4 × 8% = 15.2%.
> Correlation 0: volatility = √(0.36 × 0.04 + 0.16 × 0.0064) = 12.4%.
> Correlation −0.5: volatility = 10.8%. The lower the correlation, the smoother the portfolio.
H: Correlations change
P: Correlation is not a fixed property. The share–bond correlation was mostly positive in the high-inflation decades before the late 1990s, mostly negative from about 2000 to 2021, then positive again in 2022. In crises, correlations between risky assets often jump towards +1. Portfolios built on recent correlations alone can disappoint.
K: Correlation from −1 to +1 measures co-movement; lower correlation means greater diversification benefit, but correlations shift over time and rise in crises.
!: Assuming correlation means causation, or that a historical correlation will hold in the next crisis.
EV: established | The correlation between US and UK equity and government bond returns has changed sign over recent decades, varying with the inflation environment.
T: Correlation coefficient | A measure from −1 to +1 of how closely two variables move together
T: Covariance | A measure of how two variables move together, equal to correlation times the two standard deviations
T: Negative correlation | A relationship in which one variable tends to rise when the other falls
SUM: Correlation runs from −1 (opposite) through 0 (unrelated) to +1 (in step).
SUM: Lower correlations give smoother portfolios, but correlations change with economic conditions.
SRC: Markowitz H., Portfolio selection, Journal of Finance 7(1) | primary | 1952
SRC: Dimson E., Marsh P. and Staunton M., UBS Global Investment Returns Yearbook: stock–bond correlation | data | 2024
Q: What does a correlation of zero mean? | No linear relationship between the two assets' returns.
Q: How is covariance related to correlation? | Covariance = correlation × σ1 × σ2.
M1#investing-u05-02-q1@1: What correlation gives no diversification benefit? | +1 | 0 | −1 | −0.5 | Perfectly correlated assets move in step, so combining them does not reduce volatility.
NUM2#investing-u05-02-q2@2: Two assets have volatilities of 15% and 10% and a correlation of 0.4. What is their covariance, as a decimal to four places? | 0.006 | 0.0001 |  | Covariance = 0.4 × 0.15 × 0.10 = 0.006.
M2#investing-u05-02-q3@2,3: Which pair would usually offer the largest diversification benefit? | Global shares and high-quality short-dated government bonds | Two UK bank shares | Two FTSE 100 tracker funds | A FTSE 100 fund and a FTSE All-Share fund | Pairs from different asset classes have lower correlations; the others overlap heavily.
M3#investing-u05-02-q4@3: Why did many 60/40 share–bond portfolios fall sharply in 2022? | Rising inflation and interest rates turned the share–bond correlation positive, so both fell together | Bonds were removed from the indices | Share–bond correlation is always +1 | Diversification was banned | Correlation depends on the economic regime; inflation shocks hurt both.
SA3#investing-u05-02-q5@1,3: Evaluate the use of historical correlations to build a portfolio. | Historical correlations show which assets have moved together and give a reasoned starting point for diversification. But they vary with the period and economic regime, rise in crises, and are estimated with error. Robust portfolios assume correlations may be higher than history suggests, diversify across genuinely different return drivers, and test scenarios such as inflation shocks. | Useful starting point ; Vary with period and regime ; Rise in crises ; Estimation error ; Robust approach and scenarios

## Specific and systematic risk
LV: Introductory · Application
S: Total risk divides into specific risk, unique to a company or sector, and systematic risk, which affects the whole market. Diversification removes most specific risk; systematic risk remains and is the risk investors are rewarded for bearing.
O: Distinguish specific risk from systematic risk with examples
O: Explain why only systematic risk earns a risk premium
O: Evaluate the risks of holding concentrated positions, such as employer shares
H: Two kinds of risk
- **Specific (unsystematic, idiosyncratic) risk**: a product recall, a fraud, a failed drug trial, a chief executive leaving. It affects one company or sector.
- **Systematic (market) risk**: recessions, interest-rate changes, inflation, pandemics. It affects nearly all companies.
E: Total risk = systematic risk + specific risk :: in variance terms
P: Because specific risks are largely independent across companies, they cancel out in a large portfolio. Systematic risk does not, because it hits everything at once.
H: Why only systematic risk is rewarded
P: If specific risk can be removed cheaply by diversifying, markets do not need to pay investors for bearing it: any investor who chooses to hold it could get rid of it at little cost. Capital market theory therefore predicts that expected returns depend on systematic risk alone (see The capital asset pricing model).
X: An employee holds 60% of their savings in their employer's shares (illustrative).
> If the company fails, they lose both their job and most of their savings at once.
> The concentration adds large specific risk with no extra expected return.
> Examples such as Enron in 2001, where many employees held company stock in their retirement plans, show the danger.
K: Specific risk can be diversified away and earns no premium; systematic risk cannot be diversified and is what investors are paid to bear.
!: Holding a large stake in your employer's shares because you "know the company". Your income already depends on it.
EV: established | Specific risk falls rapidly as the number of holdings increases, while market risk remains.
EV: established | Employees concentrated in employer stock suffered heavy losses when firms such as Enron collapsed.
T: Specific risk | Risk unique to a company or sector, which diversification can reduce
T: Systematic risk | Risk affecting the whole market, which diversification cannot remove
T: Concentration risk | Risk from holding a large share of a portfolio in one investment, sector or country
SUM: Total risk = systematic + specific; diversification removes most specific risk.
SUM: Only systematic risk is rewarded, so concentrated positions add risk without extra expected return.
SRC: Sharpe W. F., Capital asset prices: a theory of market equilibrium under conditions of risk, Journal of Finance 19(3) | primary | 1964
SRC: Bodie Z., Kane A. and Marcus A. J., Investments (12th edition), McGraw Hill | secondary | 2021
Q: Give an example of specific risk. | Any company-specific event such as a product recall, fraud, failed trial or loss of a key contract.
Q: Why does specific risk earn no premium? | Because it can be diversified away cheaply, so markets do not compensate investors for bearing it.
M1#investing-u05-03-q1@1: Which is an example of systematic risk? | A rise in interest rates that affects all companies | A fraud at one company | A failed drug trial | A factory fire | Market-wide shocks such as interest-rate changes are systematic.
M2#investing-u05-03-q2@2: An investor holds one pharmaceutical company's shares. Its main drug fails a trial and the price halves. What type of risk caused the loss? | Specific risk | Systematic risk | Currency risk | Inflation risk | The event is unique to that company and could have been diversified away.
TF2#investing-u05-03-q3@1,2: Adding more shares from different sectors to a portfolio reduces its systematic risk. | false | Diversification reduces specific risk; systematic risk affects all shares and remains.
M3#investing-u05-03-q4@3: Why is holding a large share of savings in an employer's shares particularly risky? | The employee's income and savings depend on the same company, so a failure hits both at once | Employer shares never pay dividends | It is illegal | It removes systematic risk | Concentration combines human capital and financial capital risk in one company.
SA3#investing-u05-03-q5@1,3: Explain why a diversified investor should not expect extra return for holding a single risky share. | A single share's risk is mostly specific, which can be removed by holding many shares. Since diversified investors set prices and do not bear specific risk, the market does not pay a premium for it. Expected returns reflect only systematic risk (as in CAPM), so concentrated holdings carry extra volatility without extra expected reward. | Single shares mainly specific risk ; Specific risk diversifiable ; Diversified investors set prices ; Only systematic risk rewarded ; Conclusion on concentration

## How many holdings are enough?
LV: Intermediate · Application
S: Adding holdings reduces specific risk quickly at first and then more slowly. Research suggests a few dozen well-spread shares remove most specific risk, but for most private investors a fund holding hundreds or thousands is simpler and cheaper.
O: Describe how portfolio risk falls as the number of holdings rises
O: Calculate the volatility of an equally weighted portfolio of n similar shares
O: Evaluate direct share portfolios against diversified funds
H: Diminishing returns
E: σ_{p}² = average variance ÷ n + (1 − 1/n) × average covariance :: equally weighted n shares
P: As n grows, the first term (specific risk) shrinks towards zero and the portfolio's risk approaches the average covariance: the market risk that remains. Early studies, such as Evans and Archer (1968), suggested about ten shares captured much of the benefit; later work (Statman, 1987) argued that 30 to 40 or more were needed, and since then individual share volatility has risen, increasing the number needed.
X: Shares each have volatility 40% and pairwise correlation 0.3 (illustrative).
> One share: 40%.
> Ten shares: about 24.3%. Thirty shares: about 22.7%. A hundred: about 22.2%.
> The floor is √(0.3 × 0.16) ≈ 21.9%: market risk, which no number of these shares removes.
H: Practical choices
- A small number of shares leaves the investor exposed to **stock-specific** disasters and to missing the few big winners that drive index returns; research by Bessembinder (2018) found most US stocks underperformed Treasury bills over their lifetimes, with a small minority creating most wealth.
- Shares in the same sector or country are more correlated, so 30 UK banks are not diversified.
- A global index fund provides thousands of holdings for a low charge.
K: Risk falls quickly with the first holdings, then levels off at market risk; dozens of well-spread shares or a broad fund remove most specific risk.
!: Counting holdings rather than exposures. Ten funds can hold the same companies; thirty shares can sit in one sector.
EV: established | Most of the reduction in specific risk is achieved with a few dozen randomly chosen shares, with diminishing benefits thereafter.
EV: established | A small fraction of listed companies account for most of the long-run wealth created by stock markets (Bessembinder, 2018).
T: Average covariance | The typical co-movement between pairs of holdings, which sets the floor for a diversified portfolio's risk
T: Equally weighted portfolio | A portfolio holding the same amount in each investment
SUM: Portfolio risk falls with each holding but levels off at the market's average covariance.
SUM: Dozens of shares across sectors or a broad fund remove most specific risk; skewed winners argue for breadth.
SRC: Statman M., How many stocks make a diversified portfolio?, Journal of Financial and Quantitative Analysis 22(3) | primary | 1987
SRC: Bessembinder H., Do stocks outperform Treasury bills?, Journal of Financial Economics 129(3) | primary | 2018
Q: What level does portfolio risk approach as holdings increase? | The average covariance between holdings: market risk.
Q: What did Bessembinder (2018) find? | Most US stocks underperformed Treasury bills over their lifetimes; a small minority created most wealth.
M1#investing-u05-04-q1@1: As more shares are added to a portfolio, what happens to the reduction in risk from each extra share? | It gets smaller | It gets larger | It stays the same | It becomes negative | Diversification shows diminishing returns as risk approaches the market floor.
NUM3#investing-u05-04-q2@2: Shares each have variance 0.09 and average covariance 0.027. What is the variance of an equally weighted 10-share portfolio, to four decimal places? | 0.0333 | 0.0002 |  | 0.09 ÷ 10 + (1 − 0.1) × 0.027 = 0.009 + 0.0243 = 0.0333.
M2#investing-u05-04-q3@2,3: An investor holds 25 shares, all UK banks and insurers. What is the main problem? | High correlation within one sector leaves much specific and sector risk | 25 shares is too many to manage | Banks never pay dividends | The portfolio has no market risk | Holdings in one sector move together, limiting the benefit of their number.
M3#investing-u05-04-q4@3: Why might a broad index fund beat a hand-picked portfolio of 15 shares even if the picker has average skill? | Returns are skewed towards a few big winners that a small portfolio is likely to miss, and the fund is cheaper | Index funds are guaranteed | 15 shares cannot be bought on a platform | Small portfolios have no risk | Skewness and costs favour broad diversification.
SA3#investing-u05-04-q5@1,3: Evaluate whether a private investor should build a portfolio of individual shares or use funds. | Individual shares avoid ongoing fund charges, give control and can be tax-managed, and 30 or more well-spread holdings remove much specific risk. But building that diversification costs time and dealing fees, sector and country spread is hard, skewed returns mean small portfolios often miss the winners, and behavioural mistakes are common. For most, low-cost diversified funds achieve more diversification more cheaply; direct shares may suit a small satellite portion. | Benefits of direct shares ; Numbers and spread needed ; Skewness of returns ; Costs and behaviour ; Reaches a justified judgement

## Home bias and global diversification
LV: Intermediate · Evaluation
S: Investors everywhere tend to hold far more of their own country's shares than its share of world markets would suggest. For UK investors, whose market is a small slice of the global total, home bias means concentration in a few sectors and companies.
O: Define home bias and describe its extent for UK investors
O: Explain the diversification benefits and costs of investing globally
O: Evaluate reasons an investor might still hold more domestic assets
H: The bias
P: The UK makes up roughly 4% of global share market value, but UK investors have traditionally held a much larger proportion of their equities at home, though the share has fallen in recent decades. French and Poterba (1991) documented home bias in the US, Japan and the UK. The UK market is concentrated in sectors such as financials, energy, mining, consumer staples and pharmaceuticals, with relatively little technology, so a UK-only portfolio misses much of the world economy.
X: A global index fund's weights compared with a UK-only fund (illustrative, approximate).
> Global: US around 60% or more, Japan, UK, France and others each a few per cent; many sectors represented.
> UK-only: the ten largest companies make up roughly half of the FTSE 100.
> The global fund spreads company, sector and country risk far more widely.
H: Reasons for and against home bias
- **For global**: diversification across economies, sectors and currencies; access to industries missing at home.
- **For some home bias**: liabilities in pounds (home bias avoids currency risk for spending in sterling), lower costs and taxes in some cases, familiarity, and UK bonds for sterling needs.
- **Caution on global**: a cap-weighted global index is itself concentrated, currently heavily in the US and in a few very large technology companies.
P: Many UK investors now use a global index fund as their core equity holding, sometimes adding a UK fund to raise the domestic share. There is no single correct split; what matters is making the choice deliberately, knowing the concentration each option brings.
K: Home bias concentrates UK investors in a small, sector-skewed market; global diversification spreads risk, though sterling spending needs justify some domestic assets, especially bonds.
!: Assuming a global index fund is evenly spread around the world. Cap-weighting puts most of it in the US.
EV: established | Investors hold more domestic equities than market weights would imply, across many countries (French and Poterba, 1991).
EV: contested | How much home bias is rational, given currency, costs and liabilities, is debated.
T: Home bias | The tendency to hold a disproportionately large share of investments in one's home country
T: Global market capitalisation weight | A country's share of the total value of the world's listed companies
SUM: The UK is a small part of global markets, but UK investors have historically held much more at home.
SUM: Global investing spreads country, sector and company risk; currency and liabilities can justify some home bias.
SRC: French K. R. and Poterba J. M., Investor diversification and international equity markets, American Economic Review 81(2) | primary | 1991
SRC: MSCI, MSCI ACWI Index factsheet (country weights) | data | 2026 | https://www.msci.com/
Q: What is home bias? | Holding a disproportionate share of investments in one's own country.
Q: Roughly what share of global share market value does the UK represent? | About 4%.
M1#investing-u05-05-q1@1: Which is a consequence of home bias for a UK-only share investor? | Concentration in a few sectors and companies | Exposure to every major global industry | No currency risk on any holdings ever | Guaranteed higher returns | The UK market is sector-skewed and top-heavy.
M2#investing-u05-05-q2@2,3: Which is the best reason a UK retiree might keep bonds mainly in sterling? | Their spending is in pounds, so sterling bonds avoid currency swings on money they need | Overseas bonds are illegal for UK investors | Sterling bonds always yield more | Currency risk improves bond returns | Matching assets to the currency of liabilities is a sound reason for domestic bonds.
TF2#investing-u05-05-q3@3: A market-capitalisation-weighted global share index is spread equally across countries. | false | Weights follow market value, so the US makes up the majority, with a few large companies very prominent.
M3#investing-u05-05-q4@3: An investor switches from a UK fund to a global fund. Which new risk should they understand? | Currency risk and concentration in the US market | No risk at all | Higher specific risk | Loss of all dividends | Global funds diversify sector and country but introduce currency exposure and US concentration.
SA3#investing-u05-05-q5@1,3: Evaluate the case for a UK investor holding a global rather than UK-only share portfolio. | Global holdings diversify across countries, sectors and currencies, and give access to industries underrepresented in the UK, such as technology. But they add currency risk, concentrate heavily in the US and a few giant companies, and may cost slightly more. Some home bias can be rational for sterling spending, especially in bonds. A global core with considered domestic exposure is a common compromise. | Diversification across countries and sectors ; Access to missing industries ; Currency risk ; US and mega-cap concentration ; Reaches a balanced judgement

## Modern portfolio theory
LV: Intermediate · Application
S: Modern portfolio theory, developed by Harry Markowitz, treats a portfolio as a whole: investors should choose combinations of assets that give the highest expected return for each level of risk, using expected returns, volatilities and correlations.
O: Describe the assumptions and main ideas of modern portfolio theory
O: Explain mean–variance optimisation
O: Evaluate the strengths and weaknesses of MPT in practice
H: The theory
P: In "Portfolio Selection" (1952), Markowitz argued that investors care about expected return and risk (measured by variance), and that an asset should be judged by its contribution to the portfolio, not on its own. **Mean–variance optimisation** finds the weights that minimise variance for each target return. Markowitz shared the 1990 Nobel Memorial Prize in Economics with William Sharpe and Merton Miller.
- Investors are risk-averse and prefer more return to less.
- Risk is measured by the variance (or standard deviation) of returns.
- Investors know or can estimate expected returns, volatilities and correlations.
H: In practice
P: MPT is the basis of asset allocation, risk models and multi-asset funds. Its weaknesses are practical. Optimisers are very sensitive to expected-return inputs, which are hard to estimate, and can produce extreme, concentrated portfolios ("error maximisation"). Variance treats upside and downside alike and assumes normal returns, while real returns have fat tails.
X: An optimiser is told that Asset A will return 7% and Asset B 6.5%, with similar risk and correlation 0.9 (illustrative).
> Because the assets are near-substitutes, the optimiser piles into A, perhaps 90% or more.
> If the true expected returns are reversed, the "optimal" portfolio is badly concentrated in the worse asset.
> Practitioners respond with constraints, blended inputs (such as Black–Litterman) or simple rules like equal or market weights.
K: MPT judges assets by their contribution to portfolio risk and return; it is the foundation of diversification and asset allocation, but its outputs are only as good as uncertain inputs.
!: Treating an optimiser's output as precise. Small changes in estimated returns can swing the "optimal" weights dramatically.
EV: established | Mean–variance optimised portfolios are highly sensitive to errors in expected return estimates (Michaud, 1989).
EV: contested | Whether simple allocations such as equal weighting perform as well as optimised ones out of sample is debated (DeMiguel, Garlappi and Uppal, 2009).
T: Modern portfolio theory | Markowitz's framework for choosing portfolios by expected return and variance, taking correlations into account
T: Mean–variance optimisation | Choosing weights to minimise portfolio variance for a target expected return
SUM: MPT evaluates assets by their effect on the whole portfolio using expected returns, variances and correlations.
SUM: It underpins asset allocation but is sensitive to inputs and assumes normal, symmetric risk.
SRC: Markowitz H., Portfolio selection, Journal of Finance 7(1) | primary | 1952
SRC: Michaud R. O., The Markowitz optimization enigma: is optimized optimal?, Financial Analysts Journal 45(1) | primary | 1989
Q: Who developed modern portfolio theory, and when? | Harry Markowitz, in 1952.
Q: What is the main practical weakness of mean–variance optimisation? | Extreme sensitivity to estimated expected returns, producing concentrated portfolios.
M1#investing-u05-06-q1@1: In modern portfolio theory, how is risk measured? | By the variance or standard deviation of returns | By the number of holdings | By the share price | By the dividend yield | Markowitz used variance as the measure of risk.
M2#investing-u05-06-q2@2: According to MPT, how should a new asset be judged? | By how it changes the risk and return of the whole portfolio | By its own return alone | By its past price chart | By its popularity | An asset with high risk can still reduce portfolio risk if it has low correlation with the rest.
NUM2#investing-u05-06-q3@2: A 50/50 portfolio holds two assets each with 10% volatility and correlation 0. What is the portfolio volatility as a percentage, to two decimal places? | 7.07 | 0.02 | % | Variance = 0.25 × 0.01 + 0.25 × 0.01 = 0.005; √0.005 = 0.0707, so 7.07%.
M3#investing-u05-06-q4@3: Why do many professional investors constrain mean–variance optimisers or use simple weighting rules? | Optimisers amplify estimation errors into extreme, unstable weights | Optimisation is banned by the FCA | Simple rules always outperform | Correlations cannot be measured | Constraints and simple rules make portfolios more robust to uncertain inputs.
SA3#investing-u05-06-q5@1,3: Evaluate modern portfolio theory as a guide for private investors. | MPT's central insight, that assets should be judged by their contribution to portfolio risk and that diversification reduces risk, is sound and widely used. But precise optimisation needs inputs that cannot be known, produces fragile portfolios, uses variance as risk and assumes normal returns. For private investors its value lies in principles: diversify across imperfectly correlated assets and choose risk deliberately, rather than in exact optimisation. | Core insight on portfolio contribution ; Diversification principle ; Input sensitivity ; Variance and normality limits ; Practical conclusion

## The efficient frontier
LV: Intermediate · Application
S: The efficient frontier is the set of portfolios offering the highest expected return for each level of risk. Adding a risk-free asset turns it into the capital market line, along which investors choose their risk by mixing cash with one optimal risky portfolio.
O: Describe the efficient frontier and the minimum-variance portfolio
O: Explain the capital market line and the tangency portfolio
O: Evaluate the practical use of the frontier for choosing a portfolio
H: The frontier
P: Plot every possible portfolio of risky assets by risk (horizontal) and expected return (vertical). The upper edge of the region is the **efficient frontier**: no portfolio offers more return for the same risk. Portfolios below it are **inefficient**. The leftmost point is the **minimum-variance portfolio**. Each investor should hold a frontier portfolio that suits their risk tolerance.
H: Adding cash
P: With a risk-free asset, combinations of cash and any risky portfolio lie on a straight line. The steepest such line touches the frontier at the **tangency portfolio**, which has the highest Sharpe ratio. This line is the **capital market line (CML)**. Tobin's separation theorem (1958) says every investor should hold the same risky portfolio, mixed with cash (or borrowing) according to their risk tolerance.
E: CML: E(R_{p}) = r_{f} + [(E(R_{T}) − r_{f}) ÷ σ_{T}] × σ_{p} :: T is the tangency portfolio
X: The tangency portfolio expects 8% with 16% volatility; cash yields 4% (illustrative).
> Slope (Sharpe ratio) = (8 − 4) ÷ 16 = 0.25.
> A cautious investor wanting 8% volatility holds half cash, half tangency: expected return 4% + 0.25 × 8% = 6%.
> An investor wanting 12% volatility holds 75% tangency: expected return 7%.
K: The efficient frontier shows the best risk–return trade-offs; with cash, investors mix one optimal risky portfolio with cash to reach their chosen risk.
!: Thinking a "riskier" portfolio is automatically better at delivering returns. Only efficient portfolios are worth holding; inefficient ones take risk without reward.
EV: established | With a risk-free asset and mean–variance investors, the optimal risky portfolio is the same for all investors (Tobin's separation theorem).
EV: contested | Real-world frontiers estimated from historical data are unstable, so investors cannot locate the true tangency portfolio precisely.
T: Efficient frontier | The set of portfolios giving the highest expected return for each level of risk
T: Capital market line | The line of portfolios combining the risk-free asset with the tangency portfolio
T: Tangency portfolio | The risky portfolio with the highest Sharpe ratio, where the capital market line touches the efficient frontier
SUM: The efficient frontier traces the best available risk–return combinations of risky assets.
SUM: With cash, all investors hold the tangency portfolio in different proportions along the capital market line.
SRC: Tobin J., Liquidity preference as behavior towards risk, Review of Economic Studies 25(2) | primary | 1958
SRC: Bodie Z., Kane A. and Marcus A. J., Investments (12th edition), McGraw Hill: capital allocation | secondary | 2021
Q: What is the efficient frontier? | The set of portfolios with the highest expected return for each level of risk.
Q: What does Tobin's separation theorem say? | Every investor holds the same risky portfolio, mixed with cash according to risk tolerance.
M1#investing-u05-07-q1@1: A portfolio lies below the efficient frontier. What does this mean? | Another portfolio offers higher expected return for the same risk | It has no risk | It is the minimum-variance portfolio | It is the tangency portfolio | Below the frontier means inefficient: more return was available for that risk.
NUM2#investing-u05-07-q2@2: The tangency portfolio expects 9% with 15% volatility and cash yields 3%. What is the expected return of a portfolio on the capital market line with 10% volatility? | 7 | 0.01 | % | Slope = (9 − 3) ÷ 15 = 0.4; 3% + 0.4 × 10% = 7%.
M2#investing-u05-07-q3@2: According to the capital market line, how should a very cautious investor reduce risk? | Hold more cash alongside the same risky portfolio | Switch to a completely different set of risky assets | Hold only the minimum-variance portfolio of single shares | Borrow to invest | Separation means adjusting the cash proportion, not the risky mix.
M3#investing-u05-07-q4@3: Why is the separation theorem only an approximation for real investors? | Inputs are uncertain, investors face different taxes, constraints and liabilities, and borrowing costs exceed the risk-free rate | It is mathematically false | Cash does not exist | All investors already hold the same portfolio | Real frictions and estimation errors mean portfolios reasonably differ, though the idea supports broad market funds plus cash.
SA3#investing-u05-07-q5@1,3: Explain how the efficient frontier and capital market line support the use of a diversified fund plus cash for different risk levels. | The frontier shows that well-diversified portfolios dominate concentrated ones. With cash, the best strategy is to hold one high-Sharpe risky portfolio and adjust risk by changing the cash proportion. A broad market fund approximates that risky portfolio, so investors of different risk tolerances can hold it in different amounts with cash or bonds. In practice inputs are uncertain, but the logic favours diversified cores. | Frontier favours diversification ; Tangency portfolio and CML ; Risk adjusted via cash proportion ; Broad fund as proxy ; Practical caveats

## The capital asset pricing model (CAPM)
LV: Intermediate · Application
S: The CAPM says an asset's expected return equals the risk-free rate plus its beta times the market risk premium. It turns the idea that only systematic risk is rewarded into a formula used to estimate required returns and costs of capital.
O: State the CAPM formula and its assumptions
O: Calculate an expected return using CAPM
O: Evaluate the empirical evidence on CAPM
H: The model
E: E(R_{i}) = r_{f} + β_{i} × [E(R_{m}) − r_{f}] :: β measures sensitivity to the market; the bracket is the market risk premium
P: Developed by William Sharpe (1964), John Lintner (1965) and Jan Mossin (1966), the CAPM follows from MPT if all investors hold the market portfolio. Because specific risk is diversified away, the only risk priced is the asset's contribution to market risk, measured by **beta**. Plotting expected return against beta gives the **security market line (SML)**.
X: The risk-free rate is 4%, the market is expected to return 9% and a share's beta is 1.2 (illustrative).
> Market risk premium: 9% − 4% = 5%.
> Expected return = 4% + 1.2 × 5% = 10%.
> A share expected to return 12% would lie above the SML, looking undervalued; one expected to return 8% would look overvalued.
H: Assumptions and evidence
- Investors hold diversified portfolios, can borrow and lend at the risk-free rate, share the same expectations and face no taxes or costs.
- Early tests found a positive relation between beta and return, but flatter than predicted: low-beta shares have earned more, and high-beta less, than CAPM implies (Black, Jensen and Scholes, 1972; Fama and French, 1992).
- Other factors, such as size and value, explained returns better in many periods (see Factor investing).
P: Despite its weaknesses, CAPM remains widely used to estimate the cost of equity in company valuation and regulation, because it is simple and grounded in theory.
K: CAPM: expected return = risk-free rate + beta × market risk premium; simple and widely used, but empirically incomplete.
!: Treating a CAPM expected return as a forecast. It is a model of required return under strong assumptions.
EV: established | Empirically, the relation between beta and average return has been flatter than CAPM predicts.
EV: contested | Whether CAPM's failures reflect the model or the difficulty of measuring the true market portfolio (Roll, 1977) is debated.
T: CAPM | A model in which expected return equals the risk-free rate plus beta times the market risk premium
T: Market risk premium | The expected return on the market minus the risk-free rate
T: Security market line | The line showing expected return against beta under CAPM
SUM: CAPM prices only systematic risk, measured by beta, through the security market line.
SUM: It is widely used for the cost of equity, though evidence shows a flatter beta–return relation and other factors.
SRC: Sharpe W. F., Capital asset prices: a theory of market equilibrium under conditions of risk, Journal of Finance 19(3) | primary | 1964
SRC: Fama E. F. and French K. R., The capital asset pricing model: theory and evidence, Journal of Economic Perspectives 18(3) | primary | 2004
Q: State the CAPM formula. | E(Ri) = rf + βi × (E(Rm) − rf).
Q: What risk does CAPM say is rewarded? | Only systematic (market) risk, measured by beta.
M1#investing-u05-08-q1@1: Under CAPM, what determines a share's expected return? | Its beta, the risk-free rate and the market risk premium | Its total volatility | Its dividend yield | Its share price | Only systematic risk, via beta, matters in CAPM.
NUM2#investing-u05-08-q2@2: The risk-free rate is 3.5%, the market risk premium is 5.5% and a share's beta is 0.8. What is its CAPM expected return as a percentage? | 7.9 | 0.01 | % | 3.5% + 0.8 × 5.5% = 3.5% + 4.4% = 7.9%.
M2#investing-u05-08-q3@2: An analyst expects a share with beta 1.5 to return 9%. The risk-free rate is 4% and the market return 8%. What does CAPM suggest? | The share looks overvalued, since CAPM requires 10% | It looks undervalued | It is fairly valued | CAPM cannot be applied | Required return = 4% + 1.5 × 4% = 10%; an expected 9% lies below the SML.
M3#investing-u05-08-q4@3: Which finding most challenges CAPM? | Low-beta shares have historically earned more, and high-beta shares less, than CAPM predicts | Shares with higher beta are more volatile | The market risk premium is positive | Diversification reduces specific risk | A flatter-than-predicted SML contradicts CAPM's central prediction.
SA3#investing-u05-08-q5@1,3: Evaluate the continued use of CAPM despite its empirical weaknesses. | CAPM is simple, grounded in theory and gives a consistent way to estimate required returns and the cost of equity, which is why companies and regulators use it. But evidence shows beta explains returns poorly, the market portfolio cannot be observed, and assumptions are unrealistic; multi-factor models fit better. CAPM is best used as a benchmark with judgement, not as a precise tool. | Simplicity and theory ; Practical uses in cost of equity ; Empirical weaknesses ; Alternative factor models ; Reaches a balanced judgement

## Beta
LV: Intermediate · Application
S: Beta measures how sensitive an investment is to movements in the overall market. A beta of 1 moves with the market; above 1 amplifies it; below 1 dampens it. It is the measure of systematic risk in CAPM.
O: Interpret beta values for shares and portfolios
O: Calculate beta from correlation and volatilities, and portfolio beta from weights
O: Evaluate the reliability of beta estimates
H: What beta means
E: β = covariance(asset, market) ÷ variance(market) = ρ × σ_{asset} ÷ σ_{market}
- **β = 1**: tends to move in line with the market.
- **β > 1**: amplifies market moves (often cyclical companies, such as housebuilders).
- **0 < β < 1**: moves less (often defensive companies, such as utilities and consumer staples).
- **β < 0**: tends to move against the market (rare; some hedging assets).
X: A share has volatility 25% and correlation 0.8 with the market, whose volatility is 16% (illustrative).
> β = 0.8 × 25% ÷ 16% = 1.25.
> If the market falls 10%, the share would be expected to fall about 12.5%, plus any specific movement.
> A highly volatile share with low correlation can have a low beta: beta measures market sensitivity, not total risk.
H: Portfolio beta and reliability
E: Portfolio beta = Σ weight × beta
P: Betas are estimated by regressing an asset's returns on the market's, usually over a few years. Estimates vary with the period, the frequency of data and the index used, and tend to drift towards 1 over time. Beta also ignores specific risk, which matters to an undiversified investor.
K: Beta measures market sensitivity: systematic risk, not total risk; portfolio beta is the weighted average of holdings' betas.
!: Equating high volatility with high beta. A share can be very volatile for company-specific reasons yet have a low beta.
EV: established | Estimated betas tend to regress towards 1 over time (Blume, 1971).
T: Beta | A measure of an asset's sensitivity to movements in the overall market
T: Defensive share | A share with a beta below 1, whose earnings are relatively stable through the economic cycle
T: Cyclical share | A share whose earnings and price are strongly tied to the economic cycle, typically with beta above 1
SUM: Beta = covariance with the market ÷ market variance; 1 is market-like, above amplifies, below dampens.
SUM: Portfolio beta is a weighted average; beta estimates are unstable and ignore specific risk.
SRC: Blume M. E., On the assessment of risk, Journal of Finance 26(1) | primary | 1971
SRC: CFA Institute, Investment Foundations Certificate curriculum: risk and return | secondary | 2024 | https://www.cfainstitute.org/
Q: What does a beta of 0.6 mean? | The asset tends to move about 60% as much as the market.
Q: How do you calculate a portfolio's beta? | The weighted average of its holdings' betas.
M1#investing-u05-09-q1@1: A share has a beta of 1.4. If the market rises 10%, what is its expected move from market effects? | About 14% | About 10% | About 4% | About 1.4% | Beta 1.4 means 1.4 × 10% = 14% from market sensitivity.
NUM2#investing-u05-09-q2@2: A share's correlation with the market is 0.6, its volatility is 30% and the market's volatility is 15%. What is its beta? | 1.2 | 0.01 |  | β = 0.6 × 30% ÷ 15% = 1.2.
NUM2#investing-u05-09-q3@2: A portfolio is 70% in a fund with beta 1.1 and 30% in a fund with beta 0.4. What is the portfolio beta, to two decimal places? | 0.89 | 0.01 |  | 0.7 × 1.1 + 0.3 × 0.4 = 0.77 + 0.12 = 0.89.
M2#investing-u05-09-q4@2,3: Which company is most likely to have a beta below 1? | A water utility | A housebuilder | A luxury car maker | A small mining explorer | Utilities have stable demand and earnings, so they move less with the market.
M3#investing-u05-09-q5@3: A biotech share has 50% volatility but a beta of 0.5. Which is the best evaluation? | Most of its risk is specific, which CAPM says is not rewarded but which matters greatly to an undiversified holder | It is a low-risk share | Its beta must be wrong | It will move exactly half as much as the market every day | Beta captures only market sensitivity; total risk can still be high.
SA3#investing-u05-09-q6@1,3: Evaluate beta as a measure of risk for a private investor. | Beta usefully measures how much a holding amplifies market moves, and portfolio beta helps gauge market exposure. But estimates depend on period and index, change over time, and ignore specific risk, which matters if the investor is not diversified. It also says nothing about liquidity, default or permanent loss. Beta is helpful within a diversified portfolio, less so for concentrated holdings. | Measures market sensitivity ; Portfolio beta use ; Estimation instability ; Ignores specific and other risks ; Context of diversification

## Factor investing
LV: Intermediate · Evaluation
S: Factors are characteristics of securities, such as value, size, momentum, quality and low volatility, that have historically been associated with returns beyond the market. Factor or "smart beta" funds tilt portfolios towards them, with mixed results.
O: Describe the main equity factors and the research behind them
O: Explain how factor funds tilt portfolios
O: Evaluate the evidence on whether factor premiums persist
H: The main factors
- **Market**: the equity risk premium itself.
- **Size**: small companies have historically outperformed large ones on average (Banz, 1981), though the effect has been weak in recent decades.
- **Value**: cheap shares (high book-to-price or earnings-to-price) have outperformed expensive ones over long periods (Fama and French, 1992, 1993), but value lagged badly from about 2007 to 2020.
- **Momentum**: recent winners have tended to keep winning in the short term (Jegadeesh and Titman, 1993; Carhart, 1997), with occasional sharp crashes.
- **Quality and profitability**: profitable, stable companies have earned more than the CAPM predicts (Novy-Marx, 2013; Fama and French five-factor model, 2015).
- **Low volatility**: low-risk shares have delivered returns similar to or better than high-risk shares, contrary to CAPM.
P: Factor funds, often marketed as "smart beta", follow rules that weight shares by these characteristics rather than by market value. They usually cost more than plain market trackers and less than active funds, and they create tracking error against the market index.
H: Why might they work?
P: Two explanations compete. **Risk-based**: factors reward exposure to risks, for example value companies are more vulnerable in recessions. **Behavioural**: investors systematically overpay for glamorous growth shares or underreact to news. If a premium is a reward for risk, it should persist; if it is a mispricing, it may shrink once widely known and traded, as McLean and Pontiff (2016) found for many published anomalies.
X: A value fund and a broad market fund over a decade in which growth companies lead (illustrative).
> The market fund rises 150%; the value fund 80%.
> Investors who chose value for its long-run premium had to endure ten years of underperformance.
> Factor premiums, if real, arrive unevenly and require patience and conviction.
K: Factors such as value, size, momentum and quality have historically earned premiums, but they come and go for long periods and may shrink once widely exploited.
!: Buying a factor fund after a strong run. Factor returns are cyclical, and recent performance says little about the next decade.
EV: established | Value, momentum and profitability factors have explained a substantial part of differences in historical equity returns across many markets.
EV: contested | Whether factor premiums will persist after publication and wide adoption, and whether they reflect risk or mispricing, is debated.
T: Factor | A characteristic of securities associated with differences in average returns
T: Value investing | Favouring shares that are cheap relative to fundamentals such as earnings or book value
T: Smart beta | Index strategies that weight holdings by factors rather than by market capitalisation
SUM: Size, value, momentum, quality and low volatility have historically been associated with excess returns.
SUM: Explanations split between risk and behaviour; premiums are cyclical and may decay after discovery.
SRC: Fama E. F. and French K. R., Common risk factors in the returns on stocks and bonds, Journal of Financial Economics 33(1) | primary | 1993
SRC: McLean R. D. and Pontiff J., Does academic research destroy stock return predictability?, Journal of Finance 71(1) | primary | 2016
Q: Name four equity factors. | Any four of: market, size, value, momentum, quality or profitability, low volatility.
Q: What did McLean and Pontiff (2016) find? | Returns to published anomalies fell substantially after publication.
M1#investing-u05-10-q1@1: Which factor favours shares that have risen most over the past year? | Momentum | Value | Size | Low volatility | Momentum strategies buy recent winners and sell recent losers, betting that trends persist for a few months.
M2#investing-u05-10-q2@1,2: A fund buys shares with low prices relative to book value and earnings. Which factor is it targeting? | Value | Momentum | Size | Quality | Low price-to-book and price-to-earnings define value.
TF2#investing-u05-10-q3@3: The value factor underperformed growth for much of the period from about 2007 to 2020. | true | Value had one of its longest periods of underperformance, a reminder that factor premiums are uneven.
M3#investing-u05-10-q4@3: Why might a factor premium shrink after it becomes widely known? | If it reflected mispricing, investors exploiting it bid prices up and reduce future returns | Factors are banned after publication | Published factors become riskier | Index providers remove the shares | Research on many anomalies shows weaker returns after publication, consistent with arbitrage.
SA3#investing-u05-10-q5@1,3: Evaluate whether a private investor should tilt their portfolio towards factors such as value or small companies. | Long-run research supports factor premiums, and low-cost funds now offer them, potentially improving returns or diversification. But premiums are cyclical with decades-long droughts, may shrink after discovery, funds cost more than plain trackers, and investors often abandon tilts at the wrong time. A modest tilt held with conviction may suit some; a plain market fund is a reasonable default. | Evidence for premiums ; Cyclicality and long underperformance ; Decay after publication ; Costs and behavioural risk ; Reaches a justified judgement

## Strategic asset allocation
LV: Introductory · Application
S: Strategic asset allocation is the long-term mix of asset classes, such as shares, bonds and cash, chosen to fit an investor's goals and risk tolerance. It is the most important investment decision most people make, more than which funds they pick.
O: Define strategic asset allocation and the factors that set it
O: Calculate a portfolio's expected return from its allocation
O: Evaluate the claim that asset allocation explains most of portfolio returns
H: Setting the mix
P: A **strategic asset allocation** sets long-term target weights, for example 60% global shares, 30% bonds, 10% cash, based on the investor's time horizon, attitude to risk, capacity for loss, goals and need for return. Once set, it is maintained through rebalancing and changed only when circumstances change, not in response to market forecasts.
- More equities: higher expected return and volatility, suited to long horizons and high capacity for loss.
- More bonds and cash: lower volatility and drawdowns, suited to short horizons and low capacity for loss.
- Within each class: decisions about regions, bond duration and credit quality.
E: Expected portfolio return = Σ allocation weight × expected asset class return
X: A 60/40 allocation with assumed returns of 7% for shares and 3.5% for bonds (illustrative).
> Expected return = 0.6 × 7% + 0.4 × 3.5% = 5.6%.
> An 80/20 mix: 0.8 × 7% + 0.2 × 3.5% = 6.3%, but with deeper expected falls.
> A 40/60 mix: 4.9%, with shallower falls.
H: How much does allocation matter?
P: Brinson, Hood and Beebower (1986) found that asset allocation policy explained over 90% of the **variation** of pension funds' returns over time. This is often misquoted as explaining 90% of the **level** of returns. Ibbotson and Kaplan (2000) clarified that allocation explains most of a fund's ups and downs over time, while differences between funds' returns depend on both allocation and implementation. Either way, the mix of assets dominates the experience of most investors.
K: The long-term mix of shares, bonds and cash sets most of a portfolio's risk and return; choose it to fit goals and risk, then keep it with discipline.
!: Spending hours choosing funds while ignoring the overall split between shares and bonds, which matters far more.
EV: established | Asset allocation policy explains most of the variation in a diversified portfolio's returns over time (Brinson, Hood and Beebower, 1986; Ibbotson and Kaplan, 2000).
T: Strategic asset allocation | A long-term target mix of asset classes set to match an investor's goals and risk
T: Asset class | A group of investments with similar characteristics, such as shares, bonds, property or cash
SUM: Strategic allocation sets long-term target weights from goals, horizon and risk tolerance.
SUM: It drives most of a portfolio's variation in returns; implementation matters less than the mix.
SRC: Brinson G. P., Hood L. R. and Beebower G. L., Determinants of portfolio performance, Financial Analysts Journal 42(4) | primary | 1986
SRC: Ibbotson R. G. and Kaplan P. D., Does asset allocation policy explain 40, 90, or 100 percent of performance?, Financial Analysts Journal 56(1) | primary | 2000
Q: What is strategic asset allocation? | A long-term target mix of asset classes chosen to suit an investor's goals and risk.
Q: What did Brinson, Hood and Beebower (1986) find? | Asset allocation policy explained over 90% of the variation of pension funds' returns over time.
M1#investing-u05-11-q1@1: Which decision usually has the biggest effect on a diversified portfolio's risk? | The split between shares, bonds and cash | The choice between two similar global trackers | The day of the week trades are placed | The platform's website design | Asset allocation dominates portfolio risk and return.
NUM2#investing-u05-11-q2@2: A portfolio holds 70% shares (expected 7.5%), 25% bonds (expected 4%) and 5% cash (expected 3%). What is its expected return as a percentage, to two decimal places? | 6.4 | 0.01 | % | 0.7 × 7.5% + 0.25 × 4% + 0.05 × 3% = 5.25% + 1% + 0.15% = 6.4%.
M2#investing-u05-11-q3@2,3: A 62-year-old planning to retire at 65 has 100% in shares and low capacity for loss. What would a strategic allocation review most likely suggest? | Reducing equity exposure towards a mix with more bonds and cash | Adding more shares to maximise growth | Moving everything to a single share | No change, since allocation does not matter | Short horizon and low capacity for loss argue for less volatility.
M3#investing-u05-11-q4@3: A common claim is "asset allocation explains 90% of returns". Which is the most accurate evaluation? | It explains about 90% of the variation in a portfolio's returns over time, not 90% of the level of returns or of differences between funds | It is exactly right in every sense | It is false; allocation does not matter | It applies only to cash | Ibbotson and Kaplan showed the figure refers to time-series variation.
SA3#investing-u05-11-q5@1,3: Explain why strategic asset allocation is described as the most important investment decision. | The split between asset classes determines most of a diversified portfolio's volatility and long-run expected return, because asset classes differ far more from each other than funds within a class. Getting the mix right for goals, horizon and risk tolerance matters more than fund selection. Research (Brinson et al.; Ibbotson and Kaplan) supports this, though implementation and costs also matter. | Allocation drives risk and expected return ; Asset classes differ more than funds ; Fits goals and risk ; Research cited accurately ; Implementation still matters

## Tactical asset allocation
LV: Intermediate · Evaluation
S: Tactical asset allocation means deliberately moving away from the strategic mix for a period to exploit expected short-term opportunities, for example holding more cash when shares look expensive. It is a form of market timing, and the evidence that it adds value is weak.
O: Distinguish tactical from strategic asset allocation
O: Calculate the effect of a tactical tilt on returns
O: Evaluate the evidence on tactical allocation and market timing
H: What it is
P: A strategic allocation might be 60% shares and 40% bonds. A **tactical** decision might move to 50/50 because shares look overvalued, or to 70/30 after a crash. Tactical moves are usually limited to set ranges and reversed later. They rely on forecasting relative returns over months or a few years.
X: A portfolio cuts shares from 60% to 45% for a year, adding to bonds; shares return 20% and bonds 3% that year (illustrative).
> Strategic return: 0.6 × 20% + 0.4 × 3% = 13.2%.
> Tactical return: 0.45 × 20% + 0.55 × 3% = 10.65%.
> The tilt cost 2.55 percentage points; if shares had fallen 20%, it would have added a similar amount.
H: The evidence
- Professional multi-asset managers, on average, have not reliably added value through tactical allocation after costs.
- Valuation measures such as the cyclically adjusted P/E (School 6) have had some ability to predict 10-year returns, but little over one or two years.
- Every tactical move needs two correct decisions: when to leave and when to return.
- Tilts also create tracking error and regret, and can lead investors to abandon their plan.
P: Where tactical moves are used, good practice is to set them in advance: a written range around each strategic weight (for example ±10 percentage points), clear reasons for a tilt, and a rule for reversing it. That separates a deliberate, limited decision from a reaction to headlines.
K: Tactical allocation is short-term timing around a strategic mix; it can add or subtract value, but evidence that it adds value consistently after costs is weak.
!: Calling panic selling "tactical asset allocation". A pre-set, limited, rules-based tilt is different from abandoning a plan in fear.
EV: established | Valuation ratios have some predictive power for long-horizon equity returns but very little for short horizons (Campbell and Shiller, 1998).
EV: contested | Whether skilled managers can add value through tactical allocation is debated; average results after costs are unimpressive.
T: Tactical asset allocation | Temporary deviations from the strategic asset mix to exploit expected short-term opportunities
T: Market timing | Moving in and out of markets or asset classes based on forecasts of their short-term direction
SUM: Tactical allocation tilts temporarily away from the strategic mix based on forecasts.
SUM: It can add or lose value; evidence of consistent success after costs is weak.
SRC: Campbell J. Y. and Shiller R. J., Valuation ratios and the long-run stock market outlook, Journal of Portfolio Management 24(2) | primary | 1998
SRC: Malkiel B. G., A Random Walk Down Wall Street (50th anniversary edition), W. W. Norton | secondary | 2023
Q: What is tactical asset allocation? | A temporary deviation from the strategic mix to exploit expected short-term opportunities.
Q: Why is market timing difficult? | It requires two correct decisions, when to leave and when to return, and short-term returns are hard to predict.
M1#investing-u05-12-q1@1: How does tactical asset allocation differ from strategic asset allocation? | It is a short-term deviation from the long-term target mix | It sets the long-term target mix | It never changes | It only applies to cash | Strategic allocation is long-term; tactical moves are temporary tilts around it.
NUM2#investing-u05-12-q2@2: A strategic 60/40 portfolio is tilted to 70/30 for a year in which shares return −10% and bonds 5%. By how many percentage points does the tilt change the return? | -1.5 | 0.01 | percentage points | Strategic: 0.6 × (−10) + 0.4 × 5 = −4%. Tactical: 0.7 × (−10) + 0.3 × 5 = −5.5%. Difference −1.5 points.
M2#investing-u05-12-q3@2,3: A manager moves heavily to cash because shares "look expensive". Shares keep rising for three years. What does this illustrate? | Valuations are poor short-term timing signals, and tactical bets can be costly | Valuation always predicts next year's returns | Cash always outperforms | Tactical allocation is risk-free | Expensive markets can stay expensive; valuation predicts long-run, not short-run, returns.
M3#investing-u05-12-q4@3: Which is the best evaluation of a private investor using tactical allocation? | Small, rules-based tilts may be harmless, but frequent forecast-driven moves risk costs, bad timing and abandoning the plan | It is the most reliable way to increase returns | It removes all risk | It is required by regulation | Evidence favours a stable strategic mix; tactical moves need skill most investors lack.
SA3#investing-u05-12-q5@1,3: Evaluate the case for and against tactical asset allocation. | For: valuations and economic conditions do vary, extreme valuations have predicted poor long-run returns, and disciplined tilts within limits might add modest value. Against: short-term returns are hard to forecast, average managers do not add value after costs, timing needs two right decisions, and tilts create tracking error and behavioural risks. A stable strategic allocation with rebalancing is a sound default. | Arguments for ; Long versus short horizon predictability ; Evidence on managers ; Two decisions and costs ; Reaches a justified judgement

## Rebalancing
LV: Introductory · Application
S: As markets move, a portfolio drifts away from its target mix. Rebalancing means trading back to the targets, which keeps risk at the chosen level and enforces a disciplined "sell high, buy low" habit.
O: Explain why portfolios drift and why rebalancing controls risk
O: Calculate the trades needed to rebalance a portfolio
O: Evaluate calendar and threshold rebalancing approaches
H: Drift
P: If shares rise faster than bonds, a 60/40 portfolio may become 70/30, with more risk than intended. Without rebalancing, a portfolio tends to drift towards its highest-returning, usually riskiest, asset over time.
X: A £100,000 portfolio starts 60/40. Shares rise 25% and bonds are flat (illustrative).
> Shares £75,000, bonds £40,000; total £115,000; shares now 65.2%.
> Target shares: 60% × £115,000 = £69,000; target bonds £46,000.
> Sell £6,000 of shares and buy £6,000 of bonds to restore 60/40.
H: How and when
- **Calendar rebalancing**: review once or twice a year and trade back to targets.
- **Threshold rebalancing**: trade when an asset drifts beyond a band, such as 5 percentage points.
- **Cash-flow rebalancing**: direct new contributions or withdrawals towards the underweight asset, avoiding sales.
P: Rebalancing has costs: dealing charges, spreads and, outside ISAs and pensions, potential capital gains tax. Multi-asset funds rebalance automatically. Research by Vanguard and others suggests that annual or threshold-based rebalancing controls risk adequately; very frequent rebalancing adds costs without much benefit.
K: Rebalancing keeps a portfolio's risk at its chosen level by trimming what has risen and topping up what has fallen; once or twice a year, or at thresholds, is usually enough.
!: Expecting rebalancing to always boost returns. Its main purpose is controlling risk; in a long bull market it can lower returns compared with letting shares run.
EV: established | Rebalancing keeps portfolio risk close to target; its effect on returns depends on market patterns.
EV: contested | The optimal rebalancing frequency and threshold vary by study and cost assumptions.
T: Rebalancing | Trading a portfolio back to its target allocation after market movements
T: Drift | The change in a portfolio's allocation caused by different returns on its assets
T: Threshold rebalancing | Rebalancing only when an allocation moves outside a set band
SUM: Portfolios drift towards their best-performing assets, raising risk.
SUM: Rebalancing by calendar, threshold or cash flows restores targets; mind costs and tax.
SRC: Jaconetti C. M., Kinniry F. M. and Zilbering Y., Best practices for portfolio rebalancing, Vanguard research | secondary | 2010
SRC: Bodie Z., Kane A. and Marcus A. J., Investments (12th edition), McGraw Hill | secondary | 2021
Q: Why does a portfolio drift? | Its assets earn different returns, so their weights change.
Q: Name three ways to rebalance. | Calendar, threshold and cash-flow rebalancing.
M1#investing-u05-13-q1@1: What is the main purpose of rebalancing? | To keep the portfolio's risk in line with its target allocation | To maximise returns every year | To avoid all taxes | To time the market | Rebalancing controls risk by restoring target weights.
NUM2#investing-u05-13-q2@2: A portfolio of £50,000 targets 50/50. Shares grow to £32,000 and bonds stay at £20,000. How much should be moved from shares to bonds, in pounds? | 6000 | 0 | £ | Total £52,000; target £26,000 each; sell £32,000 − £26,000 = £6,000 of shares.
M2#investing-u05-13-q3@3: An investor adds £500 a month and their shares are above target. What is a low-cost way to rebalance? | Direct new contributions to bonds until the target is restored | Sell all the shares | Stop contributing | Borrow to buy bonds | Cash-flow rebalancing avoids dealing costs and tax on sales.
M3#investing-u05-13-q4@3: Shares rise strongly for ten years. Which is the best evaluation of an investor who rebalanced annually? | They probably earned slightly less than letting shares run, but kept risk at the level they chose | They made a mistake and should never rebalance | Rebalancing guaranteed higher returns | Their risk increased | Rebalancing trades some return in trending markets for risk control.
SA3#investing-u05-13-q5@1,3: Evaluate the costs and benefits of rebalancing a portfolio held outside a tax wrapper. | Benefits: keeps risk at target, enforces buying low and selling high, and prevents drift into riskier allocations. Costs: dealing fees and spreads, and selling winners outside an ISA or pension can trigger capital gains tax. Using new contributions, wider thresholds, annual reviews or holding assets in wrappers reduces costs. Rebalancing is usually worthwhile but should be done efficiently. | Risk control benefit ; Discipline benefit ; Dealing costs ; Capital gains tax outside wrappers ; Efficient methods and conclusion

## Lifestyling and glide paths
LV: Intermediate · Application
S: Lifestyling automatically moves a pension from higher-risk to lower-risk assets as the planned retirement date approaches, following a glide path. It reduces sequence risk but must match how the saver will actually take their money.
O: Describe how lifestyling and target-date funds work
O: Explain the link between glide paths and sequence of returns risk
O: Evaluate whether a default glide path suits a given saver
H: How it works
P: Many workplace pension default funds hold mainly shares while retirement is far away, then switch gradually, often over the last 5 to 15 years, into bonds and cash. **Target-date funds** do the same within a single fund named for a retirement year. The schedule of changes is the **glide path**.
X: A default fund holds 90% shares until 15 years before the selected retirement age, then reduces shares by about 4 percentage points a year (illustrative).
> At 10 years to go: about 70% shares.
> At retirement: perhaps 30% shares, with the rest in bonds and cash.
> A crash in the final years then hits a smaller share of the pot.
H: Matching the glide path to the plan
P: Older glide paths targeted buying an **annuity** at retirement, ending heavily in long gilts and cash. Since the 2015 pension freedoms, most people take flexible drawdown, keeping money invested for decades after retirement. A glide path designed for an annuity can be too cautious for someone who will stay invested. Savers should also check that the selected retirement age matches their real plans, as the switching is based on it.
K: Lifestyling reduces risk as retirement nears, protecting against a late crash, but the glide path should match the retirement date and how the money will be used.
P: Savers can usually opt out of the default lifestyle strategy and choose their own funds, or choose a different strategy aimed at drawdown, annuity purchase or a cash lump sum. Pension Wise, the free government guidance service from MoneyHelper, explains the options for people aged 50 and over with a defined contribution pension.
!: Ignoring the retirement age recorded on a workplace pension. If it is earlier or later than you plan, the de-risking happens at the wrong time.
EV: established | Glide paths reduce exposure to equity falls near retirement, the period of greatest sequence risk.
EV: contested | The ideal glide path, including whether equity exposure should rise again after retirement, is debated in research.
T: Lifestyling | Automatically switching a pension into lower-risk assets as the selected retirement date approaches
T: Glide path | The planned schedule by which a fund's allocation becomes more cautious over time
T: Target-date fund | A fund that follows a glide path towards a named target year
SUM: Lifestyling and target-date funds reduce risk on a schedule as retirement approaches.
SUM: The glide path should match the real retirement date and whether the saver will buy an annuity or use drawdown.
SRC: Department for Work and Pensions, Guidance for offering a default option for defined contribution automatic enrolment pension schemes | guidance | 2019 | https://www.gov.uk/government/publications/automatic-enrolment-default-option-guidance
SRC: MoneyHelper, Lifestyling and your pension investments (Money and Pensions Service) | guidance | 2026 | https://www.moneyhelper.org.uk/en/pensions-and-retirement
Q: What does lifestyling do? | It switches a pension into lower-risk assets automatically as the selected retirement date approaches.
Q: Why might an old-style glide path not suit someone using drawdown? | It may be designed for buying an annuity and be too cautious for money that stays invested for decades.
M1#investing-u05-14-q1@1: Which describes a target-date fund? | A fund that becomes more cautious over time towards a named year | A fund that always holds 100% shares | A fund that only holds cash | A fund that guarantees a return by its target date | Target-date funds follow a glide path toward their named year.
NUM2#investing-u05-14-q2@2: A glide path cuts equity exposure from 80% by 5 percentage points a year starting 10 years before retirement. What is the equity share 4 years before retirement, as a percentage? | 50 | 0 | % | Six years of reductions (from 10 to 4 years to go): 80% − 6 × 5% = 50%.
M2#investing-u05-14-q3@2,3: A saver's pension records a retirement age of 60 but they plan to work to 68. What is the main risk? | Their pot will be de-risked years too early, reducing likely growth | Their pot will be too risky at 68 | Nothing, because retirement ages are ignored | They will lose tax relief | Lifestyling follows the recorded date, so it should match real plans.
M3#investing-u05-14-q4@3: Why have many pension providers redesigned glide paths since 2015? | The pension freedoms meant most savers use drawdown rather than buying an annuity at retirement | Shares were banned in pensions | Auto-enrolment ended | Annuities became compulsory | Glide paths now often target a mixed, drawdown-friendly allocation.
SA3#investing-u05-14-q5@1,3: Evaluate whether a saver should rely on their workplace pension's default lifestyle strategy. | Defaults are designed for typical members, are low-cost, and reduce sequence risk near retirement, which suits savers who do not want to manage investments. But they assume a retirement date and withdrawal approach that may not fit: someone planning drawdown, retiring later, or with other assets might want a different glide path. Checking the retirement age and strategy, and getting guidance (Pension Wise) or advice, is sensible. | Defaults suit typical members ; Reduce sequence risk ; Assumptions on date and withdrawal ; May not suit drawdown or other assets ; Check and seek guidance

## Multi-asset funds and model portfolios
LV: Introductory · Application
S: Multi-asset funds hold a mix of shares, bonds and other assets in one fund, rebalancing automatically. Model portfolios offered by platforms and advisers do something similar with several funds. They package asset allocation for investors who prefer not to build it themselves.
O: Describe the main types of multi-asset fund and model portfolio
O: Explain how risk-targeted and fixed-allocation funds differ
O: Evaluate multi-asset funds against building a portfolio yourself
H: Types
- **Fixed-allocation funds**: hold a set mix, such as 60% shares and 40% bonds, rebalanced automatically; often index-based and low-cost.
- **Risk-targeted funds**: aim to keep volatility within a band, adjusting the mix as markets change.
- **Active multi-asset funds**: managers change the allocation tactically and select holdings; usually more expensive.
- **Target-date funds**: follow a glide path (previous lesson).
- **Model portfolios**: a recommended set of funds in set proportions, maintained by a platform or adviser.
P: Under FCA rules, a model portfolio recommended by an adviser is part of personal advice and must be suitable for the client; a ready-made portfolio chosen by the investor on a platform is not advice, so the investor carries the responsibility for choosing a suitable one.
X: An investor compares holding one 60/40 multi-asset index fund with building the same mix from two trackers (illustrative).
> One fund: automatic rebalancing, one charge, no decisions; but the investor cannot change the mix within it.
> Two trackers: possibly slightly cheaper and more flexible; but the investor must rebalance and resist tinkering.
> For many, the convenience and discipline of the single fund outweigh the small difference in cost.
H: What to check
P: Compare the **ongoing charges figure**, the actual mix (equity share, regions, bond duration and credit quality) and the risk rating. Names such as "cautious", "balanced" and "adventurous" are not standardised and can describe very different mixes. Industry sector averages, such as the Investment Association's Mixed Investment sectors, group funds by equity range and help comparison.
K: Multi-asset funds and model portfolios deliver a ready-made, rebalanced allocation; check the actual mix and charges, since labels like "balanced" are not standardised.
!: Holding a multi-asset fund alongside several other funds without checking the combined allocation, which can end up far from what was intended.
EV: established | Investment Association sectors such as Mixed Investment 40–85% Shares classify multi-asset funds by their equity range.
EV: contested | Whether active multi-asset managers add value over simple fixed-allocation index funds after charges is debated.
T: Multi-asset fund | A fund holding several asset classes in one portfolio
T: Model portfolio | A predefined combination of funds maintained by a platform or adviser
T: Risk-targeted fund | A fund that adjusts its asset mix to keep volatility within a target range
SUM: Multi-asset funds and model portfolios package allocation and rebalancing.
SUM: Compare actual mix, risk and charges; "balanced" means different things at different providers.
SRC: Investment Association, IA sector definitions | standard | 2026 | https://www.theia.org/
SRC: Financial Conduct Authority, Asset management market study: final report (MS15/2.3) | primary | 2017 | https://www.fca.org.uk/
Q: What does a fixed-allocation multi-asset fund do? | Holds a set mix of assets and rebalances automatically.
Q: Are fund risk labels such as "balanced" standardised? | No; they vary between providers, so check the actual mix.
M1#investing-u05-15-q1@1: What is a model portfolio? | A predefined set of funds in set proportions maintained by a platform or adviser | A single share | A savings account | A government bond | Model portfolios combine several funds into a recommended mix.
M2#investing-u05-15-q2@2: Two "balanced" funds hold 40% and 80% in shares. What follows? | Their risk differs considerably despite the same label | They must have identical risk | The label guarantees the mix | Neither holds shares | Labels are not standardised; the equity share drives risk.
NUM2#investing-u05-15-q3@2: A multi-asset fund holds 60% in a share index charging 0.10% and 40% in a bond index charging 0.08%, plus a 0.10% management layer. What is its total ongoing charge as a percentage, to three decimal places? | 0.192 | 0.001 | % | Weighted underlying: 0.6 × 0.10 + 0.4 × 0.08 = 0.092%; plus 0.10% = 0.192%.
M3#investing-u05-15-q4@3: Which investor is best suited to a single fixed-allocation multi-asset index fund? | Someone who wants a simple, low-cost, rebalanced portfolio and is unlikely to manage it actively | Someone who wants to pick individual shares daily | Someone needing all their money next month | Someone who wants only cash | The fund's strength is simplicity and automatic discipline.
SA3#investing-u05-15-q5@1,3: Evaluate a single multi-asset fund as a complete portfolio for a beginner. | Advantages: instant diversification across asset classes and regions, automatic rebalancing, one charge and fewer decisions, which reduces behavioural mistakes. Disadvantages: the mix cannot be tailored, charges vary widely (active versions cost more), labels are not standardised, and the fund may not match the investor's risk or home-currency needs. A low-cost fund matching the investor's risk level can be a sensible complete solution. | Diversification and rebalancing ; Simplicity and behavioural benefit ; Lack of tailoring ; Charges and labels vary ; Reaches a justified judgement
`;
