// School 21: Financial Mathematics and Economics. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Interest and the time value of money, valuation, quantitative finance, risk and actuarial mathematics, and economics.
// Worked figures are illustrative; they are not financial advice.
export default `
## Financial Mathematics
S: Financial mathematics applies mathematical tools to money: interest, investment, pricing and risk. It ranges from the arithmetic of loans and savings to the stochastic models used to price derivatives and manage portfolios.
O: Describe the main areas of financial mathematics
O: Explain why money has time value and why risk needs probability
T: Time value of money | The principle that money now is worth more than the same amount later, because it can earn interest
T: Arbitrage | A riskless profit from price differences; pricing models assume none exist
H: Areas
- Interest theory: simple and compound interest, annuities, loans.
- Valuation: bonds, shares and projects by discounting cash flows.
- Portfolio theory: balancing return and risk.
- Derivatives pricing and risk management.
- Actuarial mathematics: insurance and pensions.
H: Key principles
- Time value of money: compare cash flows at a common date.
- No arbitrage: equal payoffs must have equal prices.
- Risk and return: higher expected return usually means more risk.
- Diversification reduces risk that isn't shared across assets.
H: Tools
- Algebra, geometric series and logarithms.
- Probability, statistics and stochastic processes.
- Optimisation and numerical methods.
- Regulation (such as Basel and Solvency II) relies on these models.
X: Would you prefer £1000 now or £1050 in a year if you can earn 4% risk-free?
> £1000 now grows to 1000 × 1.04 = £1040 in a year
> £1050 in a year is worth more than £1040
> So take £1050 later; its present value is 1050/1.04 ≈ £1009.62, which beats £1000
K: Financial mathematics covers interest, valuation, portfolios, derivatives and actuarial work; the time value of money and no arbitrage are core principles; probability models risk.
!: Comparing cash flows at different dates without discounting them to a common date.
Q: What is arbitrage? | A riskless profit from mispricing.
Q: Why is money now worth more than money later? | It can earn interest in the meantime.
SUM: Money has time value.
SUM: Risk needs probability models.
SRC: Kellison SG, The Theory of Interest (3rd edn, McGraw-Hill 2009) | textbook | 2009 | https://www.mheducation.com/
SRC: Hull JC, Options, Futures, and Other Derivatives (11th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
NUM1#maths-u21-01-q1@1: At a 5% annual interest rate, what is the present value in £ of £2100 received in one year? | 2000 | 0 | £ | PV = 2100/1.05 = £2000.
M1#maths-u21-01-q2@1: Which principle says two portfolios with identical future payoffs must have the same price? | No arbitrage | The time value of money | Diversification | Compound interest | Risk aversion | If prices differed, buying the cheap one and selling the dear one would give a riskless profit.
M2#maths-u21-01-q3@2: Why must cash flows at different dates be discounted before comparing them? | Money at different times has different value because of interest | Discounting removes all risk from the cash flows | Future cash is always worthless compared with cash now | Cash flows at all dates are always equal in value | It isn't necessary when the amounts are the same | Converting to present values puts every payment on the same footing.
Q: What is the time value of money? | The principle that money now is worth more than the same amount later, because it can earn interest.
Q: What does the no-arbitrage principle assume about pricing models? | That no riskless profits from price differences exist, so equal payoffs must have equal prices.
Q: Which five main areas does financial mathematics cover? | Interest theory, valuation, portfolio theory, derivatives pricing and risk management, and actuarial mathematics.
Q: What is the usual relationship between risk and return in finance? | Higher expected return usually comes with more risk.
Q: What kind of risk does diversification reduce? | Risk that isn't shared across assets.
Q: Why does financial mathematics need probability and stochastic processes? | Because risk and uncertain future prices must be modelled, for example in pricing derivatives and managing portfolios.
Q: What is a common mistake when comparing cash flows at different dates? | Comparing them without discounting them to a common date first.
Q: With a 4% risk-free rate, what is the present value of £1050 due in one year? | About £1009.62, since 1050/1.04 ≈ 1009.62.
Q: How are bonds, shares and projects valued in financial mathematics? | By discounting their future cash flows to today.
Q: Which regulatory frameworks are named as relying on financial models? | Basel and Solvency II.

## Simple Interest
S: Simple interest is paid only on the original principal, so it grows by the same amount every period. It's used for short-term loans, some bonds and as a basis for comparing with compound growth.
O: Calculate simple interest, amounts and rates
O: Compare simple and compound interest over time
T: Simple interest | I = Prt, for principal P, annual rate r and time t in years
T: Accumulated amount | A = P(1 + rt) under simple interest
H: Formulas
- I = Prt; A = P(1 + rt).
- Solve for rate r = I/(Pt) or time t = I/(Pr).
- Time in days: t = days/365 (or 360 in some money markets).
H: Uses
- Short-term loans and Treasury bills.
- Interest on some savings accounts paid out rather than added.
- Accrued interest between bond coupon dates.
H: Simple versus compound
- Simple: linear growth. Compound: exponential growth.
- For one period they're equal; afterwards compound pulls ahead.
- £1000 at 10% for 10 years: simple £2000, compound £2593.74.
X: £5000 is lent at 6% simple interest for 9 months. Find the interest and the total repaid.
> t = 9/12 = 0.75 years
> I = 5000 × 0.06 × 0.75 = £225
> Total repaid A = £5225
D: maths-u21-simple-interest-line
- Discounting at simple interest: P = A/(1 + rt) gives the price of a Treasury bill.
- Simple interest is common in legal judgments and some consumer agreements.
K: Simple interest I = Prt grows linearly; A = P(1 + rt); it's used for short terms and accrued interest; compound interest overtakes it after one period.
!: Using months as t without converting to years.
Q: What is the simple interest on £800 at 5% for 3 years? | £120.
Q: How does simple interest grow over time? | Linearly.
SUM: Interest on principal only.
SUM: Linear growth.
SRC: Kellison SG, The Theory of Interest (3rd edn, McGraw-Hill 2009) | textbook | 2009 | https://www.mheducation.com/
SRC: Vaaler LJF, Daniel JW, Mathematical Interest Theory (3rd edn, American Mathematical Society 2021) | textbook | 2021 | https://bookstore.ams.org/
NUM1#maths-u21-02-q1@1: What simple interest rate (in %) turns £2000 into £2300 over 3 years? | 5 | 0 | % | I = 300 = 2000 × r × 3, so r = 300/6000 = 0.05 = 5%.
M1#maths-u21-02-q2@1: £1200 is invested at 4% simple interest for 6 months. How much interest is earned? | £24 | £48 | £288 | £4.80 | £240 | Simple interest is I = Prt = 1200 × 0.04 × 0.5 = £24, with the 6 months written as half a year.
M2#maths-u21-02-q3@2: Why does compound interest eventually exceed simple interest at the same rate? | It earns interest on previously added interest, giving exponential rather than linear growth | Compound interest rates are always set higher than simple rates by banks | Simple interest stops being paid after the first year of any investment | Compound interest is paid more often, so it must be at a higher rate | It doesn't: simple interest always grows faster over long periods | Each period's interest joins the principal for the next period.
Q: What is the simple interest formula? | I = Prt, for principal P, annual rate r and time t in years.
Q: What is the accumulated amount under simple interest? | A = P(1 + rt).
Q: How do you find the time from simple interest, principal and rate? | t = I/(Pr).
Q: How is a period in days converted to years for simple interest? | t = days/365, or days/360 in some money markets.
Q: What is a common mistake with time in simple interest problems? | Using months as t without converting them to years.
Q: How is a Treasury bill priced using simple interest discounting? | P = A/(1 + rt), the amount due divided by (1 + rt).
Q: £5000 is lent at 6% simple interest for 9 months. What is the interest? | £225, since 5000 × 0.06 × 0.75 = 225.
Q: How do simple and compound interest compare over exactly one period? | They are equal; compound interest pulls ahead only after the first period.
Q: What is £1000 at 10% worth after 10 years under simple and compound interest? | £2000 with simple interest and £2593.74 with compound interest.
Q: Name three uses of simple interest. | Short-term loans and Treasury bills, savings interest paid out rather than added, and accrued interest between bond coupon dates.

## Compound Interest
S: Compound interest adds each period's interest to the principal, so interest earns interest. Growth is exponential, and the frequency of compounding and the effective annual rate determine how fast money grows.
O: Calculate compound amounts with different compounding frequencies
O: Convert between nominal and effective rates and use continuous compounding
T: Effective annual rate | AER = (1 + r/m)^{m} − 1 for nominal rate r compounded m times a year
T: Continuous compounding | A = Pe^{rt}, the limit as compounding becomes infinitely frequent
H: Formulas
- Annual compounding: A = P(1 + r)ᵗ.
- m times a year: A = P(1 + r/m)^{mt}.
- Continuous: A = Pe^{rt}.
- Doubling time ≈ 72/(rate in %) (the rule of 72).
H: Effective rates
- 12% compounded monthly has AER = 1.01^{12} − 1 ≈ 12.68%.
- APR versus AER on UK loans and savings.
- More frequent compounding raises AER, approaching e^{r} − 1.
H: Solving for time and rate
- t = ln(A/P)/ln(1 + r).
- r = (A/P)^{1/t} − 1.
- Compound annual growth rate (CAGR) uses this formula.
X: £1000 is invested at 5% compounded annually for 10 years. Find the amount and compare with the rule of 72.
> A = 1000 × 1.05^{10} ≈ £1628.89
> The rule of 72 gives doubling in about 72/5 = 14.4 years
> Exact doubling time ln 2/ln 1.05 ≈ 14.2 years
D: maths-u21-compound-doubling
- Logarithms solve for time: n = ln(A/P)/ln(1 + r).
P: **Investigate with the lab.** Choose Compound interest and write each answer as P × multiplierⁿ before calculating.
IX: practice
K: Compound interest grows exponentially; frequency raises the effective rate; continuous compounding gives Pe^{rt}; the rule of 72 estimates doubling time.
!: Comparing nominal rates with different compounding frequencies without converting to AER.
Q: What is the AER of 6% compounded quarterly? | About 6.14%.
Q: What does the rule of 72 estimate? | Doubling time: 72 divided by the percentage rate.
SUM: Interest earns interest.
SUM: Compare using effective rates.
SRC: Kellison SG, The Theory of Interest (3rd edn, McGraw-Hill 2009) | textbook | 2009 | https://www.mheducation.com/
SRC: Financial Conduct Authority, Consumer Credit sourcebook (CONC) App 1: Total charge for credit (APR) | guideline | 2024 | https://www.handbook.fca.org.uk/handbook/CONC/App/1/
NUM1#maths-u21-03-q1@1: What is £500 worth after 3 years at 4% compounded annually, to the nearest penny? | 562.43 | 0.01 | £ | 500 × 1.04^{3} = 500 × 1.124864 = £562.43.
M1#maths-u21-03-q2@1: What is the effective annual rate of 12% compounded monthly? | About 12.68% | Exactly 12% | About 1% | About 144% | About 12.36% | (1 + 0.12/12)^{12} − 1 = 1.01^{12} − 1 ≈ 0.1268.
M2#maths-u21-03-q3@2: Why does continuous compounding give the largest amount for a given nominal rate? | (1 + r/m)^{m} increases with m and tends to e^{r} as m → ∞ | Continuous compounding uses a higher rate | It adds interest only once | It removes the principal | It gives the smallest amount | More frequent compounding means interest starts earning interest sooner.
NUM1#maths-u21-03-q4@1: £2000 earns 3% compound interest a year. What is it worth after 2 years, in £? | 2121.8 | 0.01 | £ | 2000 × 1.03^{2} = 2000 × 1.0609 = £2121.80.
Q: What is the formula for the effective annual rate of a nominal rate r compounded m times a year? | AER = (1 + r/m)^{m} − 1.
Q: What is the amount after t years with continuous compounding? | A = Pe^{rt}.
Q: What is the amount after t years at rate r compounded m times a year? | A = P(1 + r/m)^{mt}.
Q: What value does the AER approach as compounding becomes more frequent? | e^{r} − 1.
Q: How do you solve for the time t in compound interest? | t = ln(A/P)/ln(1 + r).
Q: How is the compound annual growth rate found from start and end values over t years? | r = (A/P)^{1/t} − 1.
Q: What is a common mistake when comparing compound interest rates? | Comparing nominal rates with different compounding frequencies without converting them to AER.
Q: £1000 is invested at 5% compounded annually. What is it worth after 10 years? | About £1628.89.
Q: At 5% a year, how does the rule of 72 compare with the exact doubling time? | The rule gives 14.4 years; the exact value ln 2/ln 1.05 is about 14.2 years.
Q: Why does compound interest grow exponentially? | Each period's interest is added to the principal, so interest itself earns interest.

## Time Value of Money
S: The time value of money says a pound today is worth more than a pound in the future, because it can be invested. Moving cash flows forwards (accumulating) and backwards (discounting) in time is the basic operation of all valuation.
O: Move cash flows between dates using accumulation and discount factors
O: Use equations of value to solve for unknown payments, rates or times
T: Discount factor | v = 1/(1 + i), the present value of 1 due in one period at interest rate i
T: Equation of value | An equation setting the values of two sets of cash flows equal at a chosen comparison date
H: Moving money in time
- Forward n periods: multiply by (1 + i)ⁿ.
- Backward n periods: multiply by vⁿ = (1 + i)^{−n}.
- Any comparison date gives the same conclusion.
- Real versus nominal: real rate ≈ nominal − inflation (exactly (1 + n)/(1 + π) − 1).
H: Equations of value
- Set outgoings equal to incomings at one date.
- Solve for a missing payment, time or interest rate.
- Unknown rates may need numerical methods (see IRR).
H: Why it matters
- Loan repayments, pensions and insurance.
- Investment appraisal (NPV, IRR).
- Legal settlements and lottery choices (lump sum versus instalments).
- Opportunity cost of capital.
X: A debt of £1000 due now and £2000 due in 2 years is to be replaced by one payment in 1 year. At 5%, find it.
> Value at time 1: £1000 accumulates to 1000 × 1.05 = £1050
> £2000 discounts back one year to 2000/1.05 ≈ £1904.76
> The single payment is 1050 + 1904.76 = £2954.76
D: maths-u21-single-payment
K: Accumulate with (1 + i)ⁿ and discount with vⁿ; equations of value equate cash flows at one date; real rates adjust for inflation; this underlies all valuation.
!: Adding cash flows due at different dates without moving them to a common date.
Q: What is the discount factor at 10% for one year? | 1/1.1 ≈ 0.909.
Q: What is the exact real rate for 5% nominal and 2% inflation? | 1.05/1.02 − 1 ≈ 2.94%.
SUM: Move money through time with interest.
SUM: Equations of value solve problems.
SRC: Kellison SG, The Theory of Interest (3rd edn, McGraw-Hill 2009) | textbook | 2009 | https://www.mheducation.com/
SRC: Brealey RA, Myers SC, Allen F, Principles of Corporate Finance (14th edn, McGraw-Hill 2023) | textbook | 2023 | https://www.mheducation.com/
NUM1#maths-u21-04-q1@1: At 8% a year, what is the present value in £ of £1000 due in 2 years, to the nearest penny? | 857.34 | 0.01 | £ | 1000/1.08^{2} = 1000/1.1664 ≈ £857.34.
M1#maths-u21-04-q2@1: Nominal interest is 6% and inflation is 6%. What is the real interest rate? | 0% | 6% | 12% | 36% | −6% | (1.06/1.06) − 1 = 0: savings only keep pace with prices.
M2#maths-u21-04-q3@2: Why does the choice of comparison date not affect an equation of value? | Moving both sides by the same factor (1 + i)ᵏ keeps them equal | Every date gives different answers | Only the present date is valid | Interest is zero at the comparison date | It does affect it | Accumulating or discounting every cash flow by the same factor preserves equality.
Q: What is the discount factor v at interest rate i? | v = 1/(1 + i), the present value of 1 due in one period.
Q: What is an equation of value? | An equation setting the values of two sets of cash flows equal at a chosen comparison date.
Q: How do you move a sum forward n periods in time? | Multiply it by (1 + i)ⁿ.
Q: How do you move a sum back n periods in time? | Multiply it by vⁿ = (1 + i)^{−n}.
Q: What is the approximate relationship between real and nominal rates? | Real rate ≈ nominal rate − inflation.
Q: What is the exact formula for the real interest rate? | (1 + n)/(1 + π) − 1, for nominal rate n and inflation π.
Q: What may be needed to solve an equation of value for an unknown interest rate? | Numerical methods, as with the IRR.
Q: What is a common mistake when combining debts due at different dates? | Adding cash flows due at different dates without moving them to a common date.
Q: At 5%, £1000 due now and £2000 due in 2 years are replaced by one payment at year 1. What is it? | About £2954.76: £1050 plus £1904.76.
Q: Name three uses of the time value of money. | Loan repayments, pensions and insurance; investment appraisal by NPV and IRR; and choosing lump sums versus instalments.

## Present Value
S: Present value is today's worth of future cash flows, found by discounting each at the appropriate interest rate. It lets investors compare payments at different times and is the foundation for pricing bonds, valuing businesses and assessing projects.
O: Calculate present values of single sums and cash-flow streams
O: Explain how the discount rate affects present value
T: Present value | PV = Σ C_{t}/(1 + r)ᵗ, the sum of discounted future cash flows
T: Perpetuity | A level payment C forever, with present value C/r
H: Single sums and streams
- PV of C in t years: C/(1 + r)ᵗ.
- Streams: sum the discounted cash flows.
- Perpetuity C/r; growing perpetuity C/(r − g) for g < r.
H: The discount rate
- Higher r means lower PV, especially for distant cash flows.
- r reflects time preference, inflation and risk.
- Risk-adjusted rates for uncertain cash flows.
- Small changes in r strongly affect long-dated values (pensions, climate policy).
H: Uses
- Bond and share prices.
- Lease versus buy decisions.
- Compensation for lost earnings.
- Social discount rates in policy (UK Green Book 3.5%).
X: Find the present value of £100 a year forever at 5%, and of £100 growing at 2% a year.
> Level perpetuity: 100/0.05 = £2000
> Growing perpetuity: 100/(0.05 − 0.02) = 100/0.03
> ≈ £3333.33
D: maths-u21-perpetuity-pv
K: PV discounts future cash flows to today; perpetuities have PV C/r and growing ones C/(r − g); higher discount rates lower PV, most strongly for distant flows.
!: Using a growing perpetuity formula when growth is at or above the discount rate.
Q: What is the PV of a perpetuity paying C at rate r? | C/r.
Q: How does raising the discount rate affect PV? | It lowers it.
SUM: Discount future money to today.
SUM: The discount rate is crucial.
SRC: Brealey RA, Myers SC, Allen F, Principles of Corporate Finance (14th edn, McGraw-Hill 2023) | textbook | 2023 | https://www.mheducation.com/
SRC: HM Treasury, The Green Book: Central Government Guidance on Appraisal and Evaluation | guideline | 2022 | https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government
NUM1#maths-u21-05-q1@1: What is the present value in £ of a perpetuity paying £60 a year at a 4% discount rate? | 1500 | 0 | £ | PV = 60/0.04 = £1500.
M1#maths-u21-05-q2@1: Which cash flow has the lowest present value at 6%? | £1000 in 10 years | £1000 in 5 years | £1000 in 1 year | £1000 now | £1000 in 2 years | Further-off cash flows are discounted more heavily.
M2#maths-u21-05-q3@2: Why do long-term projects' values depend so strongly on the discount rate? | Discount factors (1 + r)^{−t} change rapidly with r when t is large | Long projects have no cash flows | Discount rates are always zero for long terms | PV ignores distant cash flows | They don't depend on it | At t = 50, moving from 3% to 5% cuts the discount factor from 0.23 to 0.09.
Q: What is the present value formula for a stream of cash flows? | PV = Σ C_{t}/(1 + r)ᵗ, the sum of the discounted future cash flows.
Q: What is a perpetuity? | A level payment C made forever, with present value C/r.
Q: What is the present value of a growing perpetuity? | C/(r − g), valid only when growth g is below the discount rate r.
Q: What does the discount rate reflect? | Time preference, inflation and risk.
Q: What is a common mistake with the growing perpetuity formula? | Using it when growth is at or above the discount rate.
Q: What is the PV of £100 a year forever at 5%? | £2000, since 100/0.05 = 2000.
Q: What is the PV of £100 a year growing at 2% forever, discounted at 5%? | About £3333.33, since 100/0.03 ≈ 3333.33.
Q: What social discount rate does the UK Green Book use? | 3.5%.
Q: How are uncertain cash flows usually discounted? | At risk-adjusted rates.
Q: Name three uses of present value. | Bond and share prices, lease versus buy decisions, and compensation for lost earnings.

## Future Value
S: Future value is what money or a series of payments will be worth at a later date after earning interest. It answers savers' questions: how much will I have, how much must I save, and how long will it take?
O: Calculate future values of lump sums and regular savings
O: Solve for the payment or time needed to reach a target
T: Future value | FV = PV(1 + r)ⁿ for a single sum after n periods
T: Sinking fund | A fund built by regular payments to meet a future target, with payment P = FV × r/((1 + r)ⁿ − 1)
H: Lump sums
- FV = PV(1 + r)ⁿ.
- With varying rates: multiply the growth factors.
- Inflation-adjusted future value uses the real rate.
H: Regular savings
- FV of P per period at the end of each period: P((1 + r)ⁿ − 1)/r.
- Payments at the start (annuity due): multiply by (1 + r).
- Early saving matters: compounding favours time.
H: Solving
- Payment for a target: rearrange the annuity formula.
- Time to target: n = ln(1 + FV r/P)/ln(1 + r).
- Spreadsheet functions FV, PMT, NPER.
X: You save £200 at the end of each month for 5 years at 0.5% a month. Find the future value.
> n = 60, r = 0.005
> FV = 200 × (1.005^{60} − 1)/0.005 = 200 × (1.34885 − 1)/0.005
> ≈ 200 × 69.77 ≈ £13,954
D: maths-u21-savings-fv
- Inflation erodes future value: divide by (1 + π)ⁿ for today's money.
- Spreadsheet FV functions follow the same formulas.
K: Future value compounds lump sums and regular payments; FV = P((1 + r)ⁿ − 1)/r for regular savings; solve for payments or time to meet targets.
!: Treating start-of-period payments as end-of-period, which understates future value.
Q: What is the FV factor for regular end-of-period savings? | ((1 + r)ⁿ − 1)/r.
Q: How do start-of-period payments change the FV? | Multiply by (1 + r).
SUM: Savings grow by compounding.
SUM: Start early.
SRC: Kellison SG, The Theory of Interest (3rd edn, McGraw-Hill 2009) | textbook | 2009 | https://www.mheducation.com/
SRC: Vaaler LJF, Daniel JW, Mathematical Interest Theory (3rd edn, American Mathematical Society 2021) | textbook | 2021 | https://bookstore.ams.org/
NUM1#maths-u21-06-q1@1: Saving £1000 at the end of each year for 3 years at 10%, what is the future value in £? | 3310 | 0 | £ | 1000 × (1.1^{3} − 1)/0.1 = 1000 × 3.31 = £3310.
M1#maths-u21-06-q2@1: What is £2000 worth after 2 years at 3% compounded annually? | £2121.80 | £2120.00 | £2060.00 | £2180.00 | £2000.00 | 2000 × 1.03^{2} = 2000 × 1.0609 = £2121.80.
M2#maths-u21-06-q3@2: Why does starting to save ten years earlier make such a difference at retirement? | Early contributions compound for longer, and growth is exponential in time | Interest rates are higher for young savers than for older ones | Savings made later in life earn no interest at all | Contributions are always larger when savers are young | It makes little difference, since interest is the same each year | Each extra decade multiplies those contributions by (1 + r)^{10}.
Q: What is the future value of a single sum after n periods? | FV = PV(1 + r)ⁿ.
Q: What is a sinking fund? | A fund built by regular payments to meet a future target.
Q: What payment builds a sinking fund to a target FV? | P = FV × r/((1 + r)ⁿ − 1).
Q: How do you find the future value of a lump sum when rates vary each period? | Multiply the growth factors for each period together.
Q: How do you express a future value in today's money? | Divide it by (1 + π)ⁿ, where π is inflation.
Q: How long does it take regular savings P to reach a target FV? | n = ln(1 + FV r/P)/ln(1 + r).
Q: What is a common mistake when payments are made at the start of each period? | Treating them as end-of-period payments, which understates the future value.
Q: Saving £200 a month for 5 years at 0.5% a month gives what future value? | About £13,954.
Q: Which spreadsheet functions are named for future value calculations? | FV, PMT and NPER.
Q: Why does early saving matter so much? | Compounding favours time, so money saved earlier has longer to grow.

## Annuities
S: An annuity is a series of equal payments at regular intervals, such as loan repayments, pensions or regular savings. Geometric series give neat formulas for their present and future values, the basis of most personal and corporate finance calculations.
O: Calculate present values of annuities immediate and annuities due
O: Value deferred and growing annuities
T: Annuity immediate | Payments at the end of each period; PV factor aₙ = (1 − vⁿ)/i
T: Annuity due | Payments at the start of each period; PV factor äₙ = (1 + i)aₙ
H: Formulas
- PV of P per period for n periods: P(1 − (1 + i)^{−n})/i.
- FV: P((1 + i)ⁿ − 1)/i.
- As n → ∞, aₙ → 1/i (perpetuity).
H: Variations
- Deferred annuity: discount by v^{d} for d periods of delay.
- Growing annuity: PV = P(1 − ((1 + g)/(1 + i))ⁿ)/(i − g).
- Payments more often than interest is compounded: use the equivalent periodic rate.
H: Uses
- Pension annuities bought with retirement savings.
- Loan and mortgage repayments.
- Lottery prizes paid in instalments.
- Valuing leases.
X: Find the PV of £1000 a year for 10 years at 5%, paid at year ends.
> v^{10} = 1.05^{−10} ≈ 0.6139
> a₁₀ = (1 − 0.6139)/0.05 ≈ 7.722
> PV ≈ £7,722
D: maths-u21-annuity-bars
- Increasing annuities pay 1, 2, 3, … and have their own closed-form PV.
- Annuity rates depend on age, health and gilt yields.
- Spreadsheet PV and PMT functions implement these formulas.
K: Annuities are level payment streams; aₙ = (1 − vⁿ)/i gives PV; annuities due multiply by (1 + i); deferred and growing annuities extend the formulas.
!: Mixing up annuity-immediate and annuity-due timing.
Q: What is the PV factor of an annuity immediate? | (1 − vⁿ)/i.
Q: What does aₙ approach as n → ∞? | 1/i.
SUM: Level payments sum as geometric series.
SUM: Timing changes the factor.
SRC: Kellison SG, The Theory of Interest (3rd edn, McGraw-Hill 2009) | textbook | 2009 | https://www.mheducation.com/
SRC: Dickson DCM, Hardy MR, Waters HR, Actuarial Mathematics for Life Contingent Risks (3rd edn, Cambridge University Press 2020) | textbook | 2020 | https://www.cambridge.org/
NUM1#maths-u21-07-q1@1: What is the PV in £ of £500 at the end of each year for 2 years at 10%, to the nearest penny? | 867.77 | 0.01 | £ | 500/1.1 + 500/1.21 = 454.55 + 413.22 = £867.77.
M1#maths-u21-07-q2@1: How does the PV of an annuity due compare with that of an annuity immediate with the same payments? | It is larger by a factor (1 + i) | It is smaller by a factor (1 + i) | They are always equal | It is larger by a factor i | It is n times larger | Each payment arrives one period earlier, so it's discounted one period less.
M2#maths-u21-07-q3@2: Why does a 30-year annuity at 5% have a PV only a little below a perpetuity's? | Payments beyond 30 years add little because v^{30} ≈ 0.23 shrinks them heavily | Perpetuities have no value, since their payments never end | Annuities pay more each year than perpetuities of the same size | Interest rates fall to zero after 30 years, so later payments vanish | It is far below, since a perpetuity has infinitely many more payments | a₃₀ ≈ 15.37 compared with 1/0.05 = 20 for the perpetuity.
Q: What is an annuity? | A series of equal payments at regular intervals, such as loan repayments, pensions or regular savings.
Q: What is an annuity immediate? | An annuity with payments at the end of each period, with PV factor aₙ = (1 − vⁿ)/i.
Q: What is an annuity due? | An annuity with payments at the start of each period, with PV factor äₙ = (1 + i)aₙ.
Q: What is the future value of P per period for n periods? | P((1 + i)ⁿ − 1)/i.
Q: How do you value a deferred annuity delayed by d periods? | Discount the annuity's value by v^{d}.
Q: What is the PV formula for a growing annuity? | PV = P(1 − ((1 + g)/(1 + i))ⁿ)/(i − g).
Q: What mathematical tool gives the neat annuity formulas? | Geometric series.
Q: What is a common mistake with annuity timing? | Mixing up annuity-immediate and annuity-due timing.
Q: What is the PV of £1000 a year for 10 years at 5%, paid at year ends? | About £7,722, since a₁₀ ≈ 7.722.
Q: What do pension annuity rates depend on? | Age, health and gilt yields.

## Loan Amortisation
S: Amortisation repays a loan with level payments that cover interest and gradually reduce the balance. An amortisation schedule shows how each payment splits between interest and principal, with interest dominating early on.
O: Calculate level loan payments and build an amortisation schedule
O: Find the outstanding balance at any time
T: Amortisation schedule | A table showing, for each payment, the interest, the capital repaid and the remaining balance
T: Outstanding balance | The present value of the remaining payments (prospective method)
H: The payment
- P = L × i/(1 − (1 + i)^{−n}) for loan L over n periods at rate i.
- Each period: interest = i × balance; capital repaid = P − interest.
- Early payments are mostly interest; later ones mostly capital.
H: Balances
- Prospective: Bₖ = P × a_{n−k}.
- Retrospective: L(1 + i)ᵏ − P × s_{k}, same answer.
- Overpayments reduce the balance and total interest.
H: Variations
- Interest-only loans: pay interest, repay capital at the end.
- Sinking fund method.
- Balloon payments.
- Total interest paid = nP − L.
X: A £10,000 loan at 1% a month is repaid over 12 months. Find the payment and the first month's split.
> P = 10,000 × 0.01/(1 − 1.01^{−12}) = 100/(1 − 0.88745) ≈ £888.49
> Month 1 interest = 0.01 × 10,000 = £100
> Capital repaid = 888.49 − 100 = £788.49, leaving £9,211.51
D: maths-u21-loan-balance
K: Level payments P = Li/(1 − vⁿ) amortise loans; interest is charged on the balance; early payments are interest-heavy; balances equal the PV of remaining payments.
!: Assuming each payment reduces the balance by the full payment amount.
Q: How is each period's interest calculated? | Interest rate times the outstanding balance.
Q: What is total interest on a level-payment loan? | nP − L.
SUM: Payments repay interest then capital.
SUM: Balances equal PV of remaining payments.
SRC: Kellison SG, The Theory of Interest (3rd edn, McGraw-Hill 2009) | textbook | 2009 | https://www.mheducation.com/
SRC: Broverman SA, Mathematics of Investment and Credit (7th edn, ACTEX 2017) | textbook | 2017 | https://www.actexlearning.com/
NUM1#maths-u21-08-q1@1: A loan of £5000 at 2% per period is repaid with level payments of £1060.80 over 5 periods. What is the interest in the first period, in £? | 100 | 0 | £ | Interest = 0.02 × 5000 = £100; the remaining £960.80 repays capital.
M1#maths-u21-08-q2@1: In a level-payment loan, how does the interest part of each payment change over time? | It falls as the balance falls | It rises steadily | It stays constant | It is zero until the last payment | It equals the full payment | Interest is charged on a shrinking balance.
M2#maths-u21-08-q3@2: Why do the prospective and retrospective methods give the same outstanding balance? | Both satisfy the same equation of value between the loan and its payments | They use different interest rates, which happen to cancel | One method ignores interest, so the answers agree only by luck | They give different answers, and lenders choose the larger | Only the prospective method is valid; the other is an estimate | The loan equals the PV of all payments, so past and future sides balance.
Q: What is an amortisation schedule? | A table showing, for each payment, the interest, the capital repaid and the remaining balance.
Q: What is the level payment on a loan L over n periods at rate i? | P = L × i/(1 − (1 + i)^{−n}).
Q: How is the capital repaid in a period found? | The payment minus that period's interest.
Q: What is the prospective method for an outstanding loan balance? | The balance is the present value of the remaining payments, Bₖ = P × a_{n−k}.
Q: What is the retrospective formula for the outstanding balance? | L(1 + i)ᵏ − P × s_{k}, which gives the same answer as the prospective method.
Q: What is an interest-only loan? | A loan where you pay only interest each period and repay the capital at the end.
Q: What is a common mistake about loan payments? | Assuming each payment reduces the balance by the full payment amount.
Q: What is the monthly payment on £10,000 at 1% a month over 12 months? | About £888.49.
Q: For a £10,000 loan at 1% a month with payment £888.49, what is the balance after month 1? | £9,211.51, since £788.49 of capital is repaid.
Q: How do overpayments affect a loan? | They reduce the balance and the total interest paid.

## Mortgage Mathematics
S: A mortgage is a long-term loan secured on property, repaid by monthly amortising payments over 20 to 35 years. Small differences in rates or terms change the monthly payment and total interest dramatically, which is why affordability and overpayment calculations matter.
O: Calculate monthly mortgage payments and total interest
O: Analyse the effect of rates, terms, overpayments and loan-to-value
T: Repayment mortgage | A mortgage whose monthly payments repay both interest and capital over the term
T: Loan-to-value ratio | LTV, the loan as a percentage of the property's value, affecting interest rates
H: Monthly payments
- Monthly rate j = annual rate/12 (on a nominal basis).
- P = L × j/(1 − (1 + j)^{−12n}).
- £200,000 over 25 years at 5%: about £1,169 a month.
H: Sensitivity
- A 1 percentage point rate rise on that loan adds about £120 a month.
- Longer terms reduce payments but increase total interest.
- Overpayments shorten the term and save interest.
H: Other features
- Interest-only versus repayment mortgages.
- Fixed, tracker and variable rates; early repayment charges.
- Affordability stress tests and loan-to-income limits (UK FCA rules).
- Lower LTV usually means a lower rate.
X: Find the monthly payment on a £150,000 repayment mortgage over 25 years at 6% a year.
> j = 0.005 and 12n = 300
> (1.005)^{−300} ≈ 0.2240
> P = 150,000 × 0.005/(1 − 0.2240) ≈ 750/0.776 ≈ £966.45
D: maths-u21-mortgage-balance
K: Mortgage payments follow the amortisation formula with monthly rates; rates and terms strongly affect payments and total interest; overpayments save interest; LTV and affordability rules shape borrowing.
!: Comparing mortgages by monthly payment alone, ignoring term and total interest.
Q: What does LTV mean? | Loan-to-value ratio.
Q: How does a longer term affect a mortgage? | Lower monthly payments but more total interest.
SUM: Mortgages are long amortising loans.
SUM: Rates and terms matter enormously.
SRC: Financial Conduct Authority, Mortgages and Home Finance: Conduct of Business sourcebook (MCOB) | guideline | 2024 | https://www.handbook.fca.org.uk/handbook/MCOB/
SRC: Broverman SA, Mathematics of Investment and Credit (7th edn, ACTEX 2017) | textbook | 2017 | https://www.actexlearning.com/
NUM1#maths-u21-09-q1@1: For the £150,000 mortgage at 6% over 25 years with payments of £966.45, what is the total interest paid, to the nearest pound? | 139935 | 1 | £ | 300 × 966.45 = £289,935, minus the £150,000 borrowed, gives £139,935 interest.
M1#maths-u21-09-q2@1: A house worth £250,000 is bought with a £200,000 mortgage. What is the LTV? | 80% | 20% | 125% | 50% | 75% | Loan-to-value is the loan divided by the property value: 200,000/250,000 = 0.8, so an 80% LTV with a 20% deposit.
M2#maths-u21-09-q3@2: Why do overpayments early in a mortgage save so much interest? | They cut the balance on which interest is charged for many remaining years | They reduce the interest rate charged on the rest of the mortgage | They are refunded with interest at the end of the mortgage term | They don't save interest; they only reduce the final payment | They only shorten the term, leaving total interest unchanged | Every pound repaid early avoids compound interest for the rest of the term.
Q: What is a repayment mortgage? | A mortgage whose monthly payments repay both interest and capital over the term.
Q: How is the monthly rate found from an annual mortgage rate on a nominal basis? | Divide the annual rate by 12.
Q: What is the monthly payment formula for a mortgage L over n years at monthly rate j? | P = L × j/(1 − (1 + j)^{−12n}).
Q: What is the monthly payment on £200,000 over 25 years at 5%? | About £1,169 a month.
Q: How much does a 1 percentage point rise add to a £200,000, 25-year, 5% mortgage? | About £120 a month.
Q: How does a lower LTV usually affect a mortgage? | It usually means a lower interest rate.
Q: What is a common mistake when comparing mortgages? | Comparing them by monthly payment alone, ignoring the term and total interest.
Q: What is the monthly payment on £150,000 over 25 years at 6%? | About £966.45.
Q: Name three types of mortgage rate. | Fixed, tracker and variable rates.
Q: What UK rules shape how much people can borrow on a mortgage? | Affordability stress tests and loan-to-income limits under FCA rules.

## Discounted Cash Flow
S: Discounted cash flow (DCF) analysis values an investment, project or company as the present value of its expected future cash flows. It's the standard method in corporate finance, though its results depend heavily on forecasts and the chosen discount rate.
O: Build a DCF valuation with forecast cash flows and a terminal value
O: Choose discount rates and test sensitivity
T: Terminal value | The value of all cash flows beyond the forecast horizon, often from a growing perpetuity
T: Weighted average cost of capital | WACC, the blended required return on a firm's debt and equity, used as a DCF discount rate
H: Steps
- Forecast free cash flows for 5–10 years.
- Estimate a terminal value, such as FCF_{n+1}/(r − g).
- Discount all to today at a risk-appropriate rate.
- Sum to get enterprise value; subtract net debt for equity value.
H: Discount rates
- WACC = (E/V)r_{E} + (D/V)r_{D}(1 − tax rate).
- Cost of equity from CAPM (see that lesson).
- Higher risk means higher discount rates.
H: Pitfalls
- Terminal value often dominates the total.
- Small changes in g or r swing values greatly.
- Inconsistent inflation assumptions between flows and rates.
- Use scenarios and sensitivity tables.
X: A firm expects cash flows of £10m next year, growing 3% forever. With a 9% discount rate, what's its value?
> Growing perpetuity: V = C₁/(r − g)
> = 10/(0.09 − 0.03)
> = £166.7m
D: maths-u21-dcf-running-value
K: DCF values an asset by discounting forecast cash flows plus a terminal value; WACC or CAPM sets the rate; terminal value and assumptions dominate, so sensitivity analysis is essential.
!: Using a terminal growth rate above long-run economic growth.
Q: What does WACC combine? | The costs of debt and equity weighted by their shares of financing.
Q: How is terminal value often calculated? | As a growing perpetuity of cash flows.
SUM: Value is discounted future cash.
SUM: Assumptions drive the result.
SRC: Koller T, Goedhart M, Wessels D, Valuation: Measuring and Managing the Value of Companies (7th edn, Wiley 2020) | textbook | 2020 | https://www.wiley.com/
SRC: Damodaran A, Investment Valuation (3rd edn, Wiley 2012) | textbook | 2012 | https://pages.stern.nyu.edu/~adamodar/
NUM1#maths-u21-10-q1@1: In the example, what is the firm's value in £m if the discount rate rises to 10% (same £10m growing 3%), to 1 decimal place? | 142.9 | 0.1 | £m | 10/(0.10 − 0.03) = 10/0.07 ≈ £142.9m, about 14% lower.
M1#maths-u21-10-q2@1: A firm has 60% equity costing 10% and 40% debt costing 5% before tax, with a 25% tax rate. What is its WACC? | 7.5% | 8.0% | 7.0% | 15% | 6.5% | 0.6 × 10% + 0.4 × 5% × 0.75 = 6% + 1.5% = 7.5%.
M2#maths-u21-10-q3@2: Why can the terminal value dominate a DCF valuation? | It captures all cash flows beyond the forecast period, often most of the total value | It is always zero, so the forecast years carry all the value | Forecast years are weighted more heavily than later years | Discounting doesn't apply to it, so it stays at full size | It never dominates; the explicit forecast years always do | For growing firms, flows after year 10 can be 60–80% of the present value.
Q: What is discounted cash flow analysis? | Valuing an investment, project or company as the present value of its expected future cash flows.
Q: What is a terminal value in a DCF? | The value of all cash flows beyond the forecast horizon, often from a growing perpetuity.
Q: What is the WACC formula? | WACC = (E/V)r_{E} + (D/V)r_{D}(1 − tax rate).
Q: How is a cost of equity often estimated for a DCF? | From the CAPM.
Q: How do you get equity value from enterprise value in a DCF? | Subtract net debt.
Q: What are the steps of a DCF? | Forecast free cash flows, estimate a terminal value, discount all to today at a risk-appropriate rate, and sum.
Q: What is a common mistake with terminal growth rates? | Using a terminal growth rate above long-run economic growth.
Q: A firm's cash flow is £10m next year, growing 3% forever, at a 9% discount rate. What is it worth? | About £166.7m, since 10/(0.09 − 0.03) ≈ 166.7.
Q: Why should DCF results be checked with scenarios and sensitivity tables? | Small changes in growth or the discount rate swing values greatly, so results depend heavily on assumptions.
Q: What inflation error can spoil a DCF? | Inconsistent inflation assumptions between the cash flows and the discount rate.

## Net Present Value (NPV)
S: Net present value is the present value of an investment's cash inflows minus the present value of its outflows. A positive NPV means the project earns more than the required return, so NPV is the main rule for choosing investments.
O: Calculate NPV and apply the NPV decision rule
O: Compare projects and explain NPV's advantages over other rules
T: Net present value | NPV = Σ C_{t}/(1 + r)ᵗ, including the initial outlay as a negative C₀
T: Required rate of return | The discount rate reflecting the opportunity cost of capital for the project's risk
H: The rule
- Accept projects with NPV > 0; reject those with NPV < 0.
- Among mutually exclusive projects, choose the highest NPV.
- NPV adds across projects (value additivity).
H: Advantages
- Uses all cash flows and the time value of money.
- Measures value added in money terms.
- Better than payback period (ignores later flows) and accounting rates of return.
- Handles changing discount rates.
H: Practicalities
- Use incremental cash flows, including working capital and tax.
- Ignore sunk costs; include opportunity costs.
- Inflation consistency (nominal flows with nominal rates).
- Real options can add value beyond static NPV.
X: A project costs £1000 now and returns £600 in each of the next 2 years. Find the NPV at 10%.
> PV of inflows = 600/1.1 + 600/1.21 = 545.45 + 495.87 = 1041.32
> NPV = 1041.32 − 1000
> = £41.32 > 0, so accept
D: maths-u21-npv-curve
K: NPV discounts all cash flows and subtracts the outlay; accept positive NPVs and choose the highest among exclusive projects; use incremental flows, ignore sunk costs.
!: Including sunk costs already spent in the NPV of a decision.
Q: What does a positive NPV indicate? | The project earns more than the required return.
Q: Should sunk costs be included in NPV? | No.
SUM: NPV measures value added.
SUM: Accept positive NPV projects.
SRC: Brealey RA, Myers SC, Allen F, Principles of Corporate Finance (14th edn, McGraw-Hill 2023) | textbook | 2023 | https://www.mheducation.com/
SRC: Graham JR, Harvey CR, The theory and practice of corporate finance: evidence from the field, Journal of Financial Economics 60(2–3), 187 | journal | 2001 | https://doi.org/10.1016/S0304-405X(01)00044-7
NUM1#maths-u21-11-q1@1: A project costs £2000 and pays £1210 at the end of year 2 and £1100 at the end of year 1. What is its NPV at 10%, in £? | 0 | 0.01 | £ | 1100/1.1 + 1210/1.21 = 1000 + 1000 = 2000, so NPV = 0.
M1#maths-u21-11-q2@1: Two exclusive projects have NPVs of £500 and £800. Which should be chosen? | The £800 project | The £500 project | Both projects together | Neither project | Whichever has the shorter payback | For mutually exclusive projects, the higher NPV adds more value.
M3#maths-u21-11-q3@2: Why is NPV preferred to the payback period? | It accounts for the time value of money and all cash flows, including those after payback | Payback uses discounting more carefully than NPV does in practice | NPV ignores risk, which makes it simpler than payback to compute | Payback measures value added in money, while NPV gives only a time | It isn't preferred: payback is the standard rule in corporate finance | Payback ignores flows after the cut-off and doesn't discount.
Q: What is net present value? | The present value of cash inflows minus the present value of outflows, NPV = Σ C_{t}/(1 + r)ᵗ with C₀ negative.
Q: What is the required rate of return? | The discount rate reflecting the opportunity cost of capital for the project's risk.
Q: What is the NPV rule for single projects? | Accept projects with NPV above zero and reject those below zero.
Q: What does value additivity mean for NPV? | NPVs add across projects.
Q: Why is the accounting rate of return weaker than NPV? | It doesn't use all cash flows with the time value of money or measure value added in money terms.
Q: Should opportunity costs be included in NPV? | Yes; use incremental cash flows including opportunity costs, working capital and tax.
Q: What is the correct inflation treatment in NPV? | Use nominal cash flows with nominal rates, consistently.
Q: A project costs £1000 and returns £600 in each of the next 2 years. What is its NPV at 10%? | About £41.32, so accept.
Q: What can add value beyond a static NPV? | Real options.
Q: What is a common mistake about past spending in NPV decisions? | Including sunk costs already spent.

## Internal Rate of Return (IRR)
S: The internal rate of return is the discount rate that makes a project's NPV zero. It's popular because it gives a percentage return, but it can mislead with unconventional cash flows or when comparing projects of different sizes.
O: Calculate IRR by solving NPV(r) = 0
O: Explain when IRR and NPV disagree and the multiple IRR problem
T: Internal rate of return | The rate r* with Σ C_{t}/(1 + r*)ᵗ = 0
T: Modified IRR | MIRR, which reinvests interim cash flows at a stated rate to give a single, more realistic return
H: Calculation
- Solve NPV(r) = 0 numerically (bisection, Newton, spreadsheet IRR).
- For two periods: a quadratic in v.
- Accept if IRR exceeds the required return (for conventional projects).
H: Pitfalls
- Multiple IRRs when cash flows change sign more than once (Descartes' rule).
- Scale: a small project can have a higher IRR but lower NPV.
- Timing: IRR ranking can differ from NPV ranking.
- Assumes reinvestment at the IRR itself.
H: When to use
- As a supplement to NPV.
- Comparing to hurdle rates.
- Private equity and fund performance reporting.
- MIRR fixes some problems.
X: A project costs £1000 and returns £1100 in one year. Find its IRR.
> NPV(r) = −1000 + 1100/(1 + r) = 0
> 1 + r = 1.1
> IRR = 10%
D: maths-u21-irr-root
- IRR is a root of a polynomial in v = 1/(1 + r).
K: IRR makes NPV zero; it's found numerically; it can have multiple values or rank projects wrongly; use it alongside NPV, and MIRR when reinvestment matters.
!: Choosing the higher-IRR project when it has the lower NPV.
Q: What is the NPV of a project at its IRR? | Zero.
Q: When can a project have several IRRs? | When cash flows change sign more than once.
SUM: IRR is the break-even discount rate.
SUM: Use it with NPV, not instead.
SRC: Brealey RA, Myers SC, Allen F, Principles of Corporate Finance (14th edn, McGraw-Hill 2023) | textbook | 2023 | https://www.mheducation.com/
SRC: Hazen GB, A new perspective on multiple internal rates of return, The Engineering Economist 48(1), 31 | journal | 2003 | https://doi.org/10.1080/00137910308965050
NUM1#maths-u21-12-q1@1: A project costs £1000 and pays £1210 after 2 years. What is its IRR as a percentage? | 10 | 0 | % | (1 + r)^{2} = 1.21, so r = 10%.
M1#maths-u21-12-q2@1: A small project has IRR 50% and NPV £100; a large one has IRR 15% and NPV £10,000. They're mutually exclusive. Which should be chosen? | The large project, since it adds more value | The small project, since its IRR is higher | Both projects together | Neither project | It's impossible to say | NPV measures value created; IRR ignores scale.
M2#maths-u21-12-q3@2: Why can cash flows −100, +230, −132 have two IRRs? | The NPV polynomial changes sign twice, so it can have two positive roots (here 10% and 20%) | IRR is always unique for any pattern of cash flows, so it can't | These flows have no IRR at all, since the NPV is always negative | The discount rate becomes negative, creating a second spurious IRR | They have only one IRR, at 10%, since IRR is defined to be unique | Two sign changes allow up to two positive real roots by Descartes' rule.
Q: What is the internal rate of return? | The discount rate r* that makes a project's NPV zero.
Q: What is the modified IRR? | MIRR, which reinvests interim cash flows at a stated rate to give a single, more realistic return.
Q: How is the IRR usually calculated? | Numerically, by bisection, Newton's method or a spreadsheet IRR function.
Q: When should a conventional project be accepted under the IRR rule? | When its IRR exceeds the required return.
Q: What reinvestment assumption does the IRR make? | That interim cash flows are reinvested at the IRR itself.
Q: Why can IRR mislead when comparing projects of different sizes? | A small project can have a higher IRR but a lower NPV.
Q: What is a common mistake when choosing between projects by IRR? | Choosing the higher-IRR project when it has the lower NPV.
Q: A project costs £1000 and returns £1100 in one year. What is its IRR? | 10%.
Q: Which rule relates sign changes in cash flows to the number of IRRs? | Descartes' rule of signs.
Q: Where is IRR commonly used for reporting? | Private equity and fund performance reporting.

## Bond Pricing
S: A bond pays fixed coupons and returns its face value at maturity. Its price is the present value of these payments, so bond prices fall when yields rise, and duration measures how sensitive the price is to interest rate changes.
O: Price bonds from coupons, face value and yield
O: Calculate yield to maturity, duration and convexity effects
T: Yield to maturity | The single discount rate equating a bond's price with the present value of its payments
T: Modified duration | D_{mod}, the approximate percentage fall in price for a 1 percentage point rise in yield
H: Pricing
- P = Σ C/(1 + y)ᵗ + F/(1 + y)ⁿ.
- Coupon rate = yield: price at par. Yield above coupon: discount. Below: premium.
- Zero-coupon bonds: P = F/(1 + y)ⁿ.
H: Interest rate sensitivity
- Macaulay duration: weighted average time to cash flows.
- Modified duration D_{mod} = D/(1 + y); ΔP/P ≈ −D_{mod}Δy.
- Convexity improves the approximation for large changes.
- Longer maturity and lower coupons mean higher duration.
H: Market features
- Yield curves and term structure (see Interest Rate Models).
- Credit spreads over government yields (gilts in the UK).
- Clean and dirty prices with accrued interest.
- Inflation-linked bonds.
X: A 3-year bond with face £100 pays a 5% annual coupon. Price it at a 6% yield.
> P = 5/1.06 + 5/1.06^{2} + 105/1.06^{3}
> = 4.717 + 4.450 + 88.160
> = £97.33, below par since the yield exceeds the coupon
D: maths-u21-bond-price-yield
K: Bond prices are PVs of coupons and face value; prices move opposite to yields; duration measures rate sensitivity; convexity refines it.
!: Thinking a bond's price rises when market yields rise.
Q: When does a bond trade at par? | When its coupon rate equals its yield.
Q: What does modified duration approximate? | The percentage price change per unit change in yield.
SUM: Bonds are discounted cash flows.
SUM: Duration measures rate risk.
SRC: Fabozzi FJ, Bond Markets, Analysis, and Strategies (10th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
SRC: Macaulay FR, Some Theoretical Problems Suggested by the Movements of Interest Rates, Bond Yields and Stock Prices in the United States since 1856 (NBER 1938) | report | 1938 | https://www.nber.org/books-and-chapters/
NUM1#maths-u21-13-q1@1: What is the price in £ of a zero-coupon bond paying £100 in 2 years at a 5% yield, to the nearest penny? | 90.70 | 0.01 | £ | 100/1.05^{2} = 100/1.1025 ≈ £90.70.
M1#maths-u21-13-q2@1: A bond has modified duration 7. If yields rise by 0.5 percentage points, roughly how does its price change? | It falls by about 3.5% | It rises by about 3.5% | It falls by about 7% | It falls by about 0.5% | It doesn't change | Using ΔP/P ≈ −D_{mod}Δy = −7 × 0.005 = −0.035, the price falls by about 3.5% (convexity makes the fall slightly smaller).
M2#maths-u21-13-q3@2: Why does a long-dated zero-coupon bond have high duration? | All its value comes from one payment far in the future, so discounting changes affect it strongly | It pays large coupons that are very sensitive to rates | Its yield is always zero, which makes its duration large | Duration falls as maturity increases, so it's actually low | It has low duration, since there's only one payment | The Macaulay duration of a zero equals its maturity.
Q: What is a bond's yield to maturity? | The single discount rate that makes the present value of the bond's payments equal its price.
Q: What is the price formula for a coupon bond? | P = Σ C/(1 + y)ᵗ + F/(1 + y)ⁿ, the PV of coupons plus the PV of the face value.
Q: When does a bond trade at a discount to par? | When its yield is above its coupon rate.
Q: How is a zero-coupon bond priced? | P = F/(1 + y)ⁿ.
Q: What is Macaulay duration? | The weighted average time to a bond's cash flows.
Q: How is modified duration related to Macaulay duration? | D_{mod} = D/(1 + y), and ΔP/P ≈ −D_{mod}Δy.
Q: What does convexity add to duration? | It improves the price-change approximation for large yield changes.
Q: Which bond features raise duration? | Longer maturity and lower coupons.
Q: What is a common mistake about bond prices and yields? | Thinking a bond's price rises when market yields rise; prices move opposite to yields.
Q: What is a 3-year, 5% annual coupon bond with face £100 worth at a 6% yield? | About £97.33, below par because the yield exceeds the coupon.

## Equity Valuation
S: Equity valuation estimates what a company's shares are worth. Dividend discount models, discounted free cash flow and comparisons with similar firms' multiples give estimates that depend strongly on growth and risk assumptions.
O: Apply the dividend discount (Gordon growth) model
O: Compare DCF and multiple-based valuation methods
T: Gordon growth model | P₀ = D₁/(r − g), the price of a share whose dividends grow at constant rate g, with required return r
T: Price–earnings ratio | P/E, the share price divided by earnings per share, used to compare valuations
H: Dividend discount models
- Price = PV of all future dividends.
- Gordon: P₀ = D₁/(r − g), needing g < r.
- Multi-stage models for high-growth firms.
- Implied growth or return from current prices.
H: Other methods
- Free cash flow to equity, discounted at the cost of equity.
- Multiples: P/E, EV/EBITDA, price-to-book.
- Residual income models.
H: Judging valuations
- Sensitive to r and g (as with DCF).
- Compare across sectors with care.
- Market prices reflect expectations, not certainty.
- Efficient markets hypothesis: prices reflect available information.
X: A share will pay £2 next year, dividends grow 4% a year, and investors require 9%. Find its value.
> P₀ = D₁/(r − g)
> = 2/(0.09 − 0.04)
> = £40
D: maths-u21-gordon-value
- Share buybacks return cash like dividends, so total payout models include them.
K: Shares are valued by discounting dividends or cash flows; the Gordon model gives D₁/(r − g); multiples compare with peers; results are sensitive to growth and required return.
!: Applying the Gordon model with g close to or above r.
Q: What is the Gordon growth model? | P₀ = D₁/(r − g).
Q: What does a P/E ratio compare? | Price with earnings per share.
SUM: Shares are worth their future payouts.
SUM: Growth and risk assumptions dominate.
SRC: Gordon MJ, Dividends, earnings, and stock prices, Review of Economics and Statistics 41(2), 99 | journal | 1959 | https://doi.org/10.2307/1927792
SRC: Damodaran A, Investment Valuation (3rd edn, Wiley 2012) | textbook | 2012 | https://pages.stern.nyu.edu/~adamodar/
NUM1#maths-u21-14-q1@1: A share costs £50 and next year's dividend is £2.50 with 5% growth. What required return (in %) does the Gordon model imply? | 10 | 0 | % | r = D₁/P₀ + g = 2.5/50 + 0.05 = 0.10.
M1#maths-u21-14-q2@1: A firm's earnings per share are £3 and its P/E is 15. What is its share price? | £45 | £5 | £18 | £12 | £0.20 | Price equals the P/E ratio times earnings per share: 15 × £3 = £45, so investors pay 15 years' current earnings.
M2#maths-u21-14-q3@2: Why does the Gordon model break down when g approaches r? | The denominator r − g tends to zero, so the value explodes towards infinity | Dividends stop growing once g gets close to r | It gives negative values for every possible g | Growth doesn't affect value in the Gordon model | It never breaks down for any growth rate | Sustained growth at or above the discount rate would make the sum of dividends infinite.
Q: What is the price of a share in a dividend discount model? | The present value of all its future dividends.
Q: What condition does the Gordon growth model need? | Dividend growth g must be below the required return r.
Q: When are multi-stage dividend models used? | For high-growth firms whose growth is not expected to stay constant.
Q: Name three valuation multiples used to compare firms. | P/E, EV/EBITDA and price-to-book.
Q: At what rate is free cash flow to equity discounted? | At the cost of equity.
Q: What does the efficient markets hypothesis say about share prices? | Prices reflect available information.
Q: Why do total payout models include share buybacks? | Buybacks return cash to shareholders just as dividends do.
Q: A share pays £2 next year, dividends grow 4% and investors require 9%. What is it worth? | £40, since 2/(0.09 − 0.04) = 40.
Q: What is a common mistake with the Gordon growth model? | Applying it with g close to or above r.
Q: Name one valuation method besides dividend discounting and multiples. | Residual income models, or discounted free cash flow to equity.

## Portfolio Theory
S: Portfolio theory studies how combining assets changes risk and return. Because asset returns don't move perfectly together, diversification lowers risk without necessarily lowering expected return, the idea behind spreading investments.
O: Calculate portfolio expected return and variance for two assets
O: Explain diversification and the role of correlation
T: Portfolio variance | For two assets, σ_{p}^{2} = w₁^{2}σ₁^{2} + w₂^{2}σ₂^{2} + 2w₁w₂ρσ₁σ₂
T: Diversification | Reducing risk by combining assets whose returns are not perfectly correlated
H: Two assets
- Expected return: E[R_{p}] = w₁μ₁ + w₂μ₂ (linear).
- Variance includes the covariance term (not linear).
- ρ = 1: no diversification benefit; ρ = −1: risk can be eliminated.
H: Many assets
- σ_{p}^{2} = wᵀΣw with covariance matrix Σ.
- With many equally weighted assets, variance approaches the average covariance.
- Idiosyncratic (specific) risk diversifies away; systematic (market) risk doesn't.
H: Practicalities
- Correlations rise in crises, reducing diversification just when it's needed.
- Estimation error in Σ is large.
- Index funds offer cheap diversification.
- Rebalancing keeps target weights.
X: Two assets each have σ = 20%, correlation 0.5. Find the risk of a 50/50 portfolio.
> σ_{p}^{2} = 0.25 × 0.04 + 0.25 × 0.04 + 2 × 0.25 × 0.5 × 0.04
> = 0.01 + 0.01 + 0.01 = 0.03
> σ_{p} = √0.03 ≈ 17.3%, lower than 20% for either asset
D: maths-u21-two-asset-risk
K: Portfolio return is a weighted average, but risk depends on correlations; diversification removes specific risk; systematic risk remains; correlations can rise in crises.
!: Averaging individual volatilities to get portfolio volatility.
Q: What correlation gives no diversification benefit? | +1.
Q: Which risk can't be diversified away? | Systematic (market) risk.
SUM: Combine assets to cut risk.
SUM: Correlation is the key.
SRC: Markowitz H, Portfolio selection, Journal of Finance 7(1), 77 | journal | 1952 | https://doi.org/10.1111/j.1540-6261.1952.tb01525.x
SRC: Bodie Z, Kane A, Marcus AJ, Investments (13th edn, McGraw-Hill 2023) | textbook | 2023 | https://www.mheducation.com/
NUM1#maths-u21-15-q1@1: Two assets with σ = 10% and correlation −1 are combined 50/50. What is the portfolio volatility in %? | 0 | 0 | % | σ_{p} = |0.5 × 10 − 0.5 × 10| = 0%: perfect negative correlation cancels the risk.
M1#maths-u21-15-q2@1: A portfolio is 70% in an asset returning 8% and 30% in one returning 4%. What is its expected return? | 6.8% | 6.0% | 12% | 5.2% | 7.4% | Portfolio expected return is the weighted average: 0.7 × 8% + 0.3 × 4% = 5.6% + 1.2% = 6.8%.
M2#maths-u21-15-q3@2: Why does diversification across many shares fail to remove all risk? | Shares share exposure to market-wide factors, so their covariances don't average away | Every share has zero variance, so there is nothing left to diversify | Correlations between shares are always −1, which adds risk | Diversification removes all risk once enough shares are held | It does remove all risk; only concentrated portfolios have any | As n grows, portfolio variance tends to the average covariance, not zero.
Q: What is the variance of a two-asset portfolio? | σ_{p}^{2} = w₁^{2}σ₁^{2} + w₂^{2}σ₂^{2} + 2w₁w₂ρσ₁σ₂.
Q: What is diversification? | Reducing risk by combining assets whose returns are not perfectly correlated.
Q: How is a portfolio's expected return found? | As the weighted average of the assets' expected returns, E[R_{p}] = w₁μ₁ + w₂μ₂.
Q: What correlation allows two-asset risk to be eliminated? | A correlation of −1.
Q: How is portfolio variance written in matrix form? | σ_{p}^{2} = wᵀΣw, with covariance matrix Σ.
Q: What does the variance of a large equally weighted portfolio approach? | The average covariance between the assets.
Q: What happens to correlations in crises? | They rise, reducing diversification just when it is needed.
Q: What is a common mistake when finding portfolio volatility? | Averaging the individual volatilities instead of including the covariance term.
Q: Two assets with σ = 20% and correlation 0.5 are held 50/50. What is the portfolio risk? | About 17.3%, lower than either asset's 20%.
Q: What keeps a portfolio at its target weights? | Rebalancing.

## Modern Portfolio Theory
S: Modern portfolio theory, founded by Harry Markowitz in 1952, chooses portfolios that give the highest expected return for each level of risk. Adding a risk-free asset leads to the capital market line and the Sharpe ratio for comparing investments.
O: Describe the efficient frontier and the minimum-variance portfolio
O: Use the capital market line and the Sharpe ratio
T: Efficient frontier | The set of portfolios with the highest expected return for each level of risk
T: Sharpe ratio | (E[R] − r_{f})/σ, excess return per unit of total risk
H: The mean–variance problem
- Minimise wᵀΣw subject to expected return μᵀw = target and Σwᵢ = 1.
- Solution traces a hyperbola in (σ, μ) space.
- The minimum-variance portfolio sits at its tip.
H: The risk-free asset
- Combinations of the risk-free asset and a risky portfolio lie on straight lines.
- The best line touches the frontier at the tangency (market) portfolio: the capital market line.
- Two-fund separation: every investor holds the risk-free asset plus the tangency portfolio.
H: Criticisms and extensions
- Inputs (expected returns) are very hard to estimate; optimisers amplify errors.
- Black–Litterman blends views with market equilibrium.
- Variance treats upside and downside equally.
- Robust and constrained optimisation in practice.
X: Fund A returns 10% with σ = 15%; fund B returns 8% with σ = 8%; r_{f} = 2%. Compare their Sharpe ratios.
> A: (10 − 2)/15 ≈ 0.53
> B: (8 − 2)/8 = 0.75
> B offers more excess return per unit of risk
D: maths-u21-sharpe-lines
K: MPT finds efficient portfolios by mean–variance optimisation; a risk-free asset gives the capital market line and two-fund separation; the Sharpe ratio compares risk-adjusted returns; estimation error is a major practical problem.
!: Trusting optimised weights without allowing for estimation error in expected returns.
Q: Who founded modern portfolio theory? | Harry Markowitz (1952).
Q: What does the Sharpe ratio measure? | Excess return per unit of total risk.
SUM: Efficient portfolios balance return and risk.
SUM: The Sharpe ratio compares them.
SRC: Markowitz H, Portfolio selection, Journal of Finance 7(1), 77 | journal | 1952 | https://doi.org/10.1111/j.1540-6261.1952.tb01525.x
SRC: Sharpe WF, Mutual fund performance, Journal of Business 39(1), 119 | journal | 1966 | https://doi.org/10.1086/294846
NUM1#maths-u21-16-q1@1: A portfolio returns 9% with volatility 14%, and the risk-free rate is 2%. What is its Sharpe ratio? | 0.5 | 0.001 |  | (9 − 2)/14 = 0.5.
M1#maths-u21-16-q2@1: What does two-fund separation say about investors' choices? | They all hold the risk-free asset plus the same tangency portfolio, in different proportions | They all hold only cash, avoiding risky assets entirely | Each holds a unique risky portfolio matched to their tastes | They avoid the risk-free asset and hold only shares | They hold two randomly chosen shares in equal amounts | With a risk-free asset, the capital market line dominates the frontier.
M3#maths-u21-16-q3@2: Why do mean–variance optimisers often give extreme, unstable weights? | Small errors in expected return estimates are magnified, pushing weights towards assets that look best by chance | Covariances are known exactly, so the optimiser has no uncertainty | The optimiser ignores risk and maximises expected return only | Expected returns never change, so extreme weights are correct | They give stable, moderate weights whatever the input estimates | Optimisation acts as an "error maximiser" when inputs are noisy.
Q: What is the efficient frontier? | The set of portfolios with the highest expected return for each level of risk.
Q: What is the Sharpe ratio formula? | (E[R] − r_{f})/σ.
Q: What does the mean–variance problem minimise and subject to what? | It minimises wᵀΣw subject to a target expected return μᵀw and weights summing to 1.
Q: Where does the minimum-variance portfolio sit? | At the tip of the frontier's hyperbola in (σ, μ) space.
Q: What is the capital market line? | The best line from the risk-free asset, touching the frontier at the tangency (market) portfolio.
Q: What does Black–Litterman do? | It blends investors' views with market equilibrium to set expected returns.
Q: What criticism of variance as a risk measure does MPT face? | Variance treats upside and downside moves equally.
Q: What is a common mistake with optimised portfolio weights? | Trusting them without allowing for estimation error in expected returns.
Q: Fund A returns 10% with σ = 15% and r_{f} = 2%. What is its Sharpe ratio? | About 0.53, since (10 − 2)/15 ≈ 0.53.
Q: What shape do combinations of a risk-free asset and a risky portfolio make in (σ, μ) space? | Straight lines.

## Capital Asset Pricing Model (CAPM)
S: The Capital Asset Pricing Model says an asset's expected return depends only on its exposure to market risk, measured by beta. It gives the security market line used to set required returns, though empirical tests show it's incomplete.
O: Calculate expected returns with CAPM and estimate beta
O: Interpret alpha and the security market line
T: Beta | β = Cov(Rᵢ, R_{m})/Var(R_{m}), the sensitivity of an asset's return to the market
T: Security market line | E[Rᵢ] = r_{f} + βᵢ(E[R_{m}] − r_{f})
H: The model
- Developed by Sharpe (1964), Lintner and Mossin.
- Only systematic risk (beta) is rewarded.
- β = 1: moves with the market; β > 1: amplifies; β < 1: dampens.
- Market risk premium E[R_{m}] − r_{f}.
H: Using it
- Cost of equity in DCF and WACC.
- Alpha: actual minus CAPM-predicted return (performance).
- Beta from regression of asset returns on market returns.
H: Evidence
- Low-beta stocks earn more than CAPM predicts.
- Size and value effects led to the Fama–French three-factor model.
- Still widely used for its simplicity.
- Assumes mean–variance investors and frictionless markets.
X: A share has β = 1.2; r_{f} = 3%; the expected market return is 8%. Find its required return.
> Market risk premium = 8 − 3 = 5%
> E[R] = 3 + 1.2 × 5
> = 9%
D: maths-u21-security-market-line
K: CAPM prices assets by beta; the security market line gives required returns; alpha measures out-performance; evidence supports multi-factor extensions.
!: Using total volatility instead of beta to set a CAPM required return.
Q: What does β = 1 mean? | The asset moves one-for-one with the market on average.
Q: Which risk does CAPM say is rewarded? | Systematic (market) risk.
SUM: Return depends on beta.
SUM: Multi-factor models extend CAPM.
SRC: Sharpe WF, Capital asset prices: a theory of market equilibrium under conditions of risk, Journal of Finance 19(3), 425 | journal | 1964 | https://doi.org/10.1111/j.1540-6261.1964.tb02865.x
SRC: Fama EF, French KR, The capital asset pricing model: theory and evidence, Journal of Economic Perspectives 18(3), 25 | journal | 2004 | https://doi.org/10.1257/0895330042162430
NUM1#maths-u21-17-q1@1: With r_{f} = 2%, market return 7% and β = 0.8, what is the CAPM required return in %? | 6 | 0 | % | 2 + 0.8 × (7 − 2) = 2 + 4 = 6%.
M1#maths-u21-17-q2@1: An asset has covariance 0.03 with the market, whose variance is 0.02. What is its beta? | 1.5 | 0.67 | 0.06 | 0.01 | 0.5 | Beta is the covariance with the market divided by the market variance: 0.03/0.02 = 1.5, so it amplifies market moves.
M2#maths-u21-17-q3@2: A fund earned 12% when CAPM predicted 9%. What is its alpha? | +3% | −3% | 12% | 21% | 0% | Alpha = actual − predicted = 12 − 9 = 3 percentage points.
Q: How is beta defined in the CAPM? | β = Cov(Rᵢ, R_{m})/Var(R_{m}), the sensitivity of an asset's return to the market.
Q: What is the security market line? | E[Rᵢ] = r_{f} + βᵢ(E[R_{m}] − r_{f}).
Q: Who developed the CAPM? | Sharpe (1964), Lintner and Mossin.
Q: What does a beta above 1 mean? | The asset amplifies market moves.
Q: What is the market risk premium? | E[R_{m}] − r_{f}, the market's expected return above the risk-free rate.
Q: How is beta usually estimated? | By regressing the asset's returns on market returns.
Q: What empirical finding about low-beta stocks challenges the CAPM? | Low-beta stocks earn more than the CAPM predicts.
Q: Which model grew from size and value effects that CAPM misses? | The Fama–French three-factor model.
Q: A share has β = 1.2, r_{f} = 3% and expected market return 8%. What is its required return? | 9%, since 3 + 1.2 × 5 = 9.
Q: What is a common mistake when setting a CAPM required return? | Using total volatility instead of beta.

## Arbitrage Pricing Theory
S: Arbitrage pricing theory, proposed by Stephen Ross in 1976, explains expected returns by exposure to several systematic factors, such as inflation, growth and interest rates. It rests on no-arbitrage arguments rather than investor preferences.
O: Write the APT factor model and pricing equation
O: Compare APT with CAPM and empirical factor models
T: Factor model | Rᵢ = E[Rᵢ] + Σ βᵢₖFₖ + εᵢ, with factor surprises Fₖ and specific risk εᵢ
T: Factor risk premium | λₖ, the extra expected return per unit of exposure to factor k
H: The theory
- Many assets plus no arbitrage imply E[Rᵢ] = r_{f} + Σ βᵢₖλₖ (approximately).
- Specific risk diversifies away in large portfolios.
- Factors aren't specified by the theory.
H: Factors in practice
- Macroeconomic: industrial production, inflation surprises, term spread (Chen, Roll, Ross 1986).
- Statistical: principal components of returns.
- Characteristic-based: Fama–French size, value, profitability, investment, momentum.
H: Compared with CAPM
- CAPM is a one-factor special case (the market).
- APT is more flexible but less specific.
- Used for risk models in fund management.
- "Factor zoo": hundreds of proposed factors, many spurious.
X: An asset has β₁ = 1.0 to growth (premium 4%) and β₂ = 0.5 to inflation (premium 2%); r_{f} = 3%. Find its expected return.
> E[R] = r_{f} + β₁λ₁ + β₂λ₂
> = 3 + 1.0 × 4 + 0.5 × 2
> = 8%
D: maths-u21-apt-build-up
K: APT prices assets by exposure to several factors using no-arbitrage; factors come from macroeconomics, statistics or firm characteristics; CAPM is a one-factor case; beware spurious factors.
!: Treating every factor found in back-tests as a genuine source of risk premium.
Q: Who proposed arbitrage pricing theory? | Stephen Ross (1976).
Q: Does APT specify which factors to use? | No.
SUM: Returns reflect several risk factors.
SUM: No arbitrage drives the pricing.
SRC: Ross SA, The arbitrage theory of capital asset pricing, Journal of Economic Theory 13(3), 341 | journal | 1976 | https://doi.org/10.1016/0022-0531(76)90046-6
SRC: Fama EF, French KR, A five-factor asset pricing model, Journal of Financial Economics 116(1), 1 | journal | 2015 | https://doi.org/10.1016/j.jfineco.2014.10.010
NUM1#maths-u21-18-q1@1: With r_{f} = 2%, factor premiums 3% and 1%, and betas 1.5 and 2, what is the APT expected return in %? | 8.5 | 0.01 | % | 2 + 1.5 × 3 + 2 × 1 = 2 + 4.5 + 2 = 8.5%.
M1#maths-u21-18-q2@1: How is CAPM related to APT? | CAPM is a special case with the market as the single factor | They are unrelated models with no common ground | APT is a special case of CAPM with one factor | CAPM uses five factors, while APT uses only one | APT ignores systematic risk, unlike CAPM | One factor (the market portfolio) recovers the security market line.
M2#maths-u21-18-q3@2: Why should factor discoveries from back-tests be treated with caution? | Testing many candidate factors makes some look significant by chance (data mining) | Factors always persist once they've been found in past data | Back-tests are never wrong, so every factor found is genuine | No factor has ever been found that explains any returns | They need no caution: more factors always improve models | Multiple testing inflates false positives, so many published factors fail out of sample.
Q: What is a factor model of returns? | Rᵢ = E[Rᵢ] + Σ βᵢₖFₖ + εᵢ, with factor surprises Fₖ and specific risk εᵢ.
Q: What is a factor risk premium? | λₖ, the extra expected return per unit of exposure to factor k.
Q: What is the APT expected-return equation? | E[Rᵢ] = r_{f} + Σ βᵢₖλₖ, approximately.
Q: What does APT rest on instead of investor preferences? | No-arbitrage arguments.
Q: Name three macroeconomic factors used in APT. | Industrial production, inflation surprises and the term spread.
Q: What are statistical factors in APT? | Principal components of asset returns.
Q: Name three characteristic-based factors. | Size, value and momentum, along with profitability and investment.
Q: What is the factor zoo? | The hundreds of proposed factors, many of them spurious.
Q: An asset has β = 1.0 to growth (4% premium) and 0.5 to inflation (2% premium), r_{f} = 3%. What is its expected return? | 8%, since 3 + 4 + 1 = 8.
Q: What is a common mistake with back-tested factors? | Treating every factor found in back-tests as a genuine source of risk premium.

## Quantitative Finance
S: Quantitative finance uses mathematical models, statistics and computation to price securities, manage risk and design trading strategies. Practitioners called "quants" work in banks, hedge funds and insurers, combining probability theory with large-scale data and numerical methods.
O: Describe the main areas and methods of quantitative finance
O: Explain the difference between risk-neutral pricing and real-world modelling
T: Risk-neutral measure | A probability measure Q under which discounted asset prices are martingales, used for pricing derivatives
T: Real-world measure | The probability measure P describing actual market behaviour, used for risk management and forecasting
H: Areas
- Derivatives pricing and hedging (the "Q-world").
- Risk management and portfolio construction (the "P-world").
- Algorithmic and high-frequency trading.
- Credit, insurance and structured products.
H: Methods
- Stochastic calculus and partial differential equations.
- Monte Carlo simulation and finite differences.
- Time-series statistics and machine learning.
- Optimisation and calibration to market prices.
H: Lessons from crises
- Models depend on assumptions that can fail (LTCM 1998, 2008 crisis).
- Model risk: wrong model, wrong parameters, wrong use.
- Correlations and liquidity change under stress.
- Stress testing complements statistical models.
X: Under risk-neutral pricing, a stock is worth £100 and r = 5% a year. What is its expected price in a year under Q?
> Under Q, the discounted price is a martingale
> E^{Q}[S₁] = S₀(1 + r)
> = £105, whatever investors actually expect (under P)
K: Quantitative finance prices derivatives with risk-neutral measures and manages risk with real-world models; it uses stochastic calculus, simulation and statistics; model risk and crises reveal its limits.
!: Using risk-neutral probabilities to forecast real-world outcomes.
Q: Under the risk-neutral measure, what do discounted prices form? | Martingales.
Q: Which measure is used for Value at Risk? | The real-world measure P.
SUM: Quants price and manage risk.
SUM: Pricing and forecasting use different measures.
SRC: Hull JC, Options, Futures, and Other Derivatives (11th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
SRC: Meucci A, 'P' versus 'Q': differences and commonalities between the two areas of quantitative finance, GARP Risk Professional, 47 | journal | 2011 | https://doi.org/10.2139/ssrn.1717163
NUM1#maths-u21-19-q1@1: A stock is £80 and the risk-free rate is 4% (annual compounding). What is its risk-neutral expected price in one year, in £? | 83.2 | 0.01 | £ | E^{Q}[S₁] = 80 × 1.04 = £83.20.
M1#maths-u21-19-q2@1: Which probability measure is used to price derivatives by no-arbitrage? | The risk-neutral measure Q | The real-world measure P | A uniform measure | The historical frequency only | Any measure chosen by the trader | Pricing relies on Q, where discounted prices are martingales.
M2#maths-u21-19-q3@2: What is model risk in quantitative finance? | Losses from using a wrong or misapplied model, or wrong parameters | The risk that markets close unexpectedly | The risk from holding too much cash | Risk from currency changes only | It doesn't exist if the maths is correct | Even correct maths can mislead when its assumptions don't hold in the market.
Q: What is the risk-neutral measure? | A probability measure Q under which discounted asset prices are martingales, used for pricing derivatives.
Q: What is the real-world measure? | The probability measure P describing actual market behaviour, used for risk management and forecasting.
Q: What work is done in the Q-world and the P-world? | Derivatives pricing and hedging in the Q-world; risk management and portfolio construction in the P-world.
Q: Name three methods used in quantitative finance. | Stochastic calculus and PDEs, Monte Carlo simulation, and time-series statistics or machine learning.
Q: What is calibration in quantitative finance? | Fitting a model's parameters so it matches market prices.
Q: Name two crises that showed models can fail. | LTCM in 1998 and the 2008 financial crisis.
Q: What complements statistical risk models under stress? | Stress testing.
Q: A stock is £100 and r = 5%. What is its expected price in a year under Q? | £105, whatever investors actually expect under P.
Q: What is a common mistake with risk-neutral probabilities? | Using them to forecast real-world outcomes.
Q: Where do quants work? | In banks, hedge funds and insurers.

## Mathematical Finance
S: Mathematical finance is the rigorous theory behind financial models: martingales, stochastic integrals and the fundamental theorems of asset pricing. It explains when prices are arbitrage-free and when markets are complete, so that every derivative can be hedged.
O: State the fundamental theorems of asset pricing
O: Explain martingales, replication and market completeness
T: First fundamental theorem of asset pricing | A market has no arbitrage if and only if an equivalent martingale measure exists
T: Complete market | A market where every contingent claim can be replicated by trading available assets
H: Foundations
- Filtrations model information over time.
- Martingales: E[X_{t} | ℱ_{s}] = X_{s}, fair games.
- Self-financing trading strategies.
- Harrison, Kreps and Pliska (1979–81) formalised the theory.
H: The fundamental theorems
- First: no arbitrage ⇔ an equivalent martingale measure exists.
- Second: completeness ⇔ the martingale measure is unique.
- Price of a claim X = E^{Q}[discounted X].
H: Incomplete markets
- Stochastic volatility or jumps create many possible Q.
- Prices then lie in a range (super- and sub-hedging bounds).
- Choosing a measure involves preferences or calibration.
- Transaction costs and constraints add further incompleteness.
X: In a one-period market, a stock is £100 and will be £120 or £90; r = 0. Find the risk-neutral probability of an up move.
> Martingale condition: 100 = q × 120 + (1 − q) × 90
> 100 = 90 + 30q
> q = 1/3, unique, so the market is complete
D: maths-u21-one-period-tree
K: The first fundamental theorem links no arbitrage to martingale measures; the second links completeness to uniqueness; prices are expected discounted payoffs under Q; incomplete markets have price ranges.
!: Assuming every market model has a unique risk-neutral price.
Q: What does the second fundamental theorem say? | A market is complete iff the martingale measure is unique.
Q: What is a martingale? | A process whose expected future value given the present equals its current value.
SUM: No arbitrage means a martingale measure exists.
SUM: Completeness means it's unique.
SRC: Harrison JM, Pliska SR, Martingales and stochastic integrals in the theory of continuous trading, Stochastic Processes and their Applications 11(3), 215 | journal | 1981 | https://doi.org/10.1016/0304-4149(81)90026-0
SRC: Shreve SE, Stochastic Calculus for Finance II: Continuous-Time Models (Springer 2004) | textbook | 2004 | https://link.springer.com/
NUM1#maths-u21-20-q1@1: A stock is £50 and moves to £60 or £45 in one period, with r = 0. What is the risk-neutral up probability, as a decimal to 3 places? | 0.333 | 0.001 |  | 50 = 60q + 45(1 − q) gives 15q = 5, so q = 1/3.
M1#maths-u21-20-q2@1: What does the first fundamental theorem of asset pricing equate? | Absence of arbitrage and existence of an equivalent martingale measure | Completeness of the market and absence of all risk | Positive interest rates and the absence of arbitrage | Expected returns on assets and their volatilities | Share prices and the present value of their dividends | No-arbitrage is equivalent to a measure making discounted prices martingales.
M3#maths-u21-20-q3@2: Why does adding stochastic volatility make a market incomplete? | Volatility risk can't be hedged with the stock and bond alone, so many martingale measures fit | It removes all arbitrage, which forces the market to become incomplete | It makes all prices deterministic, so there's nothing left to hedge | It adds more traded assets, which always makes markets incomplete | It keeps the market complete, since volatility can be traded freely | A new source of randomness without a matching traded asset leaves claims unreplicable.
Q: What does the first fundamental theorem of asset pricing say? | A market has no arbitrage if and only if an equivalent martingale measure exists.
Q: What is a complete market? | A market where every contingent claim can be replicated by trading available assets.
Q: What do filtrations model in mathematical finance? | Information available over time.
Q: How is a claim priced in an arbitrage-free market? | As the expected discounted payoff under the martingale measure Q.
Q: Who formalised the fundamental theorems of asset pricing? | Harrison, Kreps and Pliska, in 1979 to 1981.
Q: What happens to prices in an incomplete market? | They lie in a range, between sub-hedging and super-hedging bounds.
Q: What features make a market incomplete? | Stochastic volatility or jumps, and also transaction costs and constraints.
Q: A stock at £100 moves to £120 or £90 with r = 0. What is the risk-neutral up probability? | 1/3, from 100 = 120q + 90(1 − q).
Q: What is a common mistake about risk-neutral prices? | Assuming every market model has a unique risk-neutral price.
Q: How is a measure chosen in an incomplete market? | Using preferences or calibration.

## Financial Modelling
S: Financial modelling builds spreadsheet or code models of a company's finances to forecast results, value it and test decisions. Good models are transparent, consistent and tested, because errors in them have cost firms and governments millions.
O: Structure a three-statement forecast model with clear assumptions
O: Use scenarios, sensitivity tables and good modelling practice
T: Three-statement model | Linked forecasts of the income statement, balance sheet and cash-flow statement
T: Scenario analysis | Running a model under coherent sets of assumptions, such as base, upside and downside cases
H: Structure
- Inputs (assumptions) separated from calculations and outputs.
- Revenue drivers: volume × price, growth rates.
- Costs: fixed and variable; capital expenditure and depreciation.
- The balance sheet must balance (a key check).
H: Analysis
- Valuation outputs: DCF, multiples.
- Sensitivity tables for key drivers (growth, margin, discount rate).
- Scenarios and break-even analysis.
- Monte Carlo for uncertain inputs.
H: Good practice
- FAST or similar standards: consistent formulas, no hard-coded numbers inside formulas.
- Error checks and audit trails.
- Documentation and version control.
- Famous spreadsheet errors (such as the Reinhart–Rogoff Excel error) show the risks.
X: A product sells 10,000 units at £20 with variable cost £12 and fixed costs £50,000. Find profit and break-even volume.
> Contribution per unit = 20 − 12 = £8
> Profit = 10,000 × 8 − 50,000 = £30,000
> Break-even volume = 50,000/8 = 6,250 units
D: maths-u21-break-even
K: Financial models link statements and drivers; separate inputs from calculations; use scenarios and sensitivity tables; follow standards and checks, since spreadsheet errors are common and costly.
!: Hard-coding numbers inside formulas, which hides assumptions and causes errors.
Q: What check confirms a three-statement model is consistent? | The balance sheet balances.
Q: What is break-even volume? | Fixed costs divided by contribution per unit.
SUM: Models forecast and value businesses.
SUM: Structure and checks prevent errors.
SRC: Tjia JS, Building Financial Models (3rd edn, McGraw-Hill 2018) | textbook | 2018 | https://www.mheducation.com/
SRC: Panko RR, What we know about spreadsheet errors, Journal of End User Computing 10(2), 15 | journal | 1998 | https://doi.org/10.4018/joeuc.1998040102
NUM1#maths-u21-21-q1@1: Fixed costs are £120,000, price £50 and variable cost £30 per unit. What is the break-even volume in units? | 6000 | 0 | units | Contribution £20 per unit, so 120,000/20 = 6,000 units.
M1#maths-u21-21-q2@1: Which practice makes a financial model easier to audit? | Keeping assumptions in a separate, labelled input section | Typing numbers directly into formulas | Hiding rows and columns | Using different formulas across a row | Avoiding any checks | Separate inputs make every assumption visible and changeable.
M2#maths-u21-21-q3@2: Why are sensitivity tables useful in financial models? | They show how outputs change as key inputs vary, revealing which assumptions matter most | They remove all uncertainty from the model's outputs | They replace the need for forecasts of any kind | They make the balance sheet balance automatically | They aren't useful in professional financial models | A valuation that swings widely with one input deserves scrutiny of that input.
Q: What is a three-statement model? | Linked forecasts of the income statement, balance sheet and cash-flow statement.
Q: What is scenario analysis? | Running a model under coherent sets of assumptions, such as base, upside and downside cases.
Q: How should a financial model's structure be organised? | With inputs separated from calculations and outputs.
Q: How are revenue drivers often modelled? | As volume × price, or with growth rates.
Q: What is contribution per unit? | Price minus variable cost per unit.
Q: When is Monte Carlo used in financial modelling? | For inputs that are uncertain.
Q: What is a common mistake in spreadsheet formulas? | Hard-coding numbers inside formulas, which hides assumptions and causes errors.
Q: 10,000 units sell at £20 with variable cost £12 and fixed costs £50,000. What is the profit? | £30,000, since 10,000 × 8 − 50,000 = 30,000.
Q: Which famous spreadsheet error shows the risks of modelling? | The Reinhart–Rogoff Excel error.
Q: Name two good practices besides consistent formulas for financial models. | Error checks with audit trails, and documentation with version control.

## Stochastic Calculus
S: Stochastic calculus extends calculus to functions of random processes such as Brownian motion. Because Brownian paths are nowhere differentiable, ordinary rules fail, and Itô's lemma adds a crucial second-order term that underlies all continuous-time finance.
O: Describe Brownian motion and the Itô integral
O: Apply Itô's lemma to functions of stochastic processes
T: Itô's lemma | For dX = μ dt + σ dW and smooth f(t, X): df = (f_{t} + μf_{x} + ½σ^{2}f_{xx}) dt + σf_{x} dW
T: Quadratic variation | For Brownian motion, (dW)^{2} = dt: squared increments accumulate deterministically
H: Brownian motion
- W₀ = 0, independent Gaussian increments, W_{t} − W_{s} ~ N(0, t − s).
- Continuous but nowhere differentiable paths.
- Quadratic variation [W]_{t} = t.
H: Itô calculus
- The Itô integral ∫ H dW uses left-endpoint evaluation; it's a martingale.
- Itô isometry: E[(∫ H dW)^{2}] = E[∫ H^{2} dt].
- Rules: dt·dt = 0, dt·dW = 0, dW·dW = dt.
- Stratonovich calculus obeys ordinary rules but isn't a martingale.
H: Uses
- Deriving the Black–Scholes PDE.
- Solving SDEs such as geometric Brownian motion.
- Girsanov's theorem changes drift between measures.
- Feynman–Kac links PDEs and expectations.
X: Use Itô's lemma to find d(W^{2}).
> f(x) = x^{2}: f_{x} = 2x, f_{xx} = 2, and μ = 0, σ = 1
> d(W^{2}) = (½ × 2) dt + 2W dW
> = dt + 2W dW, so ∫₀ᵗ W dW = ½(W_{t}^{2} − t), not ½W_{t}^{2}
K: Brownian motion has nowhere-differentiable paths with (dW)^{2} = dt; Itô's lemma adds ½σ^{2}f_{xx}; Itô integrals are martingales; these tools underlie continuous-time finance.
!: Applying the ordinary chain rule to functions of Brownian motion and missing the ½σ^{2}f_{xx} term.
Q: What is (dW)^{2} in Itô calculus? | dt.
Q: What is ∫₀ᵗ W dW? | ½(W_{t}^{2} − t).
SUM: Random paths need new calculus.
SUM: Itô's lemma adds a second-order term.
SRC: Øksendal B, Stochastic Differential Equations (6th edn, Springer 2003) | textbook | 2003 | https://link.springer.com/
SRC: Itô K, Stochastic integral, Proceedings of the Imperial Academy 20(8), 519 | journal | 1944 | https://doi.org/10.3792/pia/1195572786
NUM1#maths-u21-22-q1@1: What is the variance of W₄ − W₁ for standard Brownian motion? | 3 | 0 |  | Increments are N(0, t − s), so the variance is 4 − 1 = 3.
M1#maths-u21-22-q2@1: Which multiplication rule holds in Itô calculus? | dW·dW = dt | dW·dW = 0 | dt·dt = dt | dt·dW = dW | dW·dW = dW | Quadratic variation of Brownian motion gives (dW)^{2} = dt.
M2#maths-u21-22-q3@2: Why does Itô's lemma contain a ½σ^{2}f_{xx} term absent from ordinary calculus? | Brownian increments have size √dt, so their squares contribute at order dt | It corrects a typing convention used by early probabilists | Ordinary calculus also has this term, so nothing is new | It accounts for interest rates in the stock price model | It doesn't contain one; the chain rule is unchanged | In a Taylor expansion, (dX)^{2} ≈ σ^{2}dt survives instead of vanishing.
Q: What is Itô's lemma? | For dX = μ dt + σ dW, df = (f_{t} + μf_{x} + ½σ^{2}f_{xx}) dt + σf_{x} dW.
Q: What is the quadratic variation of Brownian motion? | [W]_{t} = t; squared increments accumulate deterministically.
Q: What is the distribution of a Brownian increment W_{t} − W_{s}? | Normal, N(0, t − s), independent of the past.
Q: Why do ordinary calculus rules fail for Brownian motion? | Brownian paths are continuous but nowhere differentiable.
Q: How is the Itô integral evaluated, and what property does it have? | It uses left-endpoint evaluation and is a martingale.
Q: What is the Itô isometry? | E[(∫ H dW)^{2}] = E[∫ H^{2} dt].
Q: How does Stratonovich calculus differ from Itô calculus? | It obeys ordinary calculus rules but isn't a martingale.
Q: What does Girsanov's theorem do? | It changes the drift of a process between probability measures.
Q: What does Feynman–Kac link? | Partial differential equations and expectations.
Q: What is a common mistake with functions of Brownian motion? | Applying the ordinary chain rule and missing the ½σ^{2}f_{xx} term.

## Geometric Brownian Motion
S: Geometric Brownian motion is the standard model for stock prices: returns are normally distributed and prices stay positive with log-normal distribution. It underlies the Black–Scholes model and many simulation studies, though real returns have fatter tails.
O: Solve the GBM stochastic differential equation
O: Calculate expected values and probabilities for GBM prices
T: Geometric Brownian motion | dS = μS dt + σS dW, with drift μ and volatility σ
T: Log-normal distribution | ln S_{T} is normal with mean ln S₀ + (μ − ½σ^{2})T and variance σ^{2}T
H: Solution
- By Itô's lemma on ln S: d(ln S) = (μ − ½σ^{2}) dt + σ dW.
- S_{T} = S₀ exp((μ − ½σ^{2})T + σW_{T}).
- E[S_{T}] = S₀e^{μT}; the median is S₀e^{(μ − ½σ^{2})T}.
H: Properties
- Prices stay positive.
- Log returns over disjoint periods are independent and normal.
- Volatility drag: the typical (median) growth rate is μ − ½σ^{2}.
- Simulation: S_{t+Δt} = S_{t} exp((μ − ½σ^{2})Δt + σ√Δt Z).
H: Limitations
- Real returns have fat tails and volatility clustering.
- Jumps (crashes) aren't captured.
- Volatility changes over time (stochastic volatility models).
- Still the benchmark model.
X: A stock at £100 has μ = 8% and σ = 20%. Find its expected price and median price after 1 year.
> E[S₁] = 100e^{0.08} ≈ £108.33
> Median = 100e^{0.08 − 0.02} = 100e^{0.06}
> ≈ £106.18: the median is below the mean because of skew
D: maths-u21-gbm-mean-median
K: GBM gives log-normal prices with drift μ − ½σ^{2} in log terms; E[S_{T}] = S₀e^{μT}; volatility drag lowers the median; real markets show fat tails and jumps.
!: Confusing the expected price growth μ with the median (typical) growth μ − ½σ^{2}.
Q: What is E[S_{T}] under GBM? | S₀e^{μT}.
Q: What distribution do GBM prices have? | Log-normal.
SUM: GBM models positive, compounding prices.
SUM: Volatility drags the median.
SRC: Samuelson PA, Rational theory of warrant pricing, Industrial Management Review 6(2), 13 | journal | 1965 | https://www.proquest.com/
SRC: Hull JC, Options, Futures, and Other Derivatives (11th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
NUM1#maths-u21-23-q1@1: Under GBM with μ = 10% and σ = 30%, what is the median annual log growth rate, in %? | 5.5 | 0.01 | % | μ − ½σ^{2} = 0.10 − 0.045 = 0.055 = 5.5%.
M1#maths-u21-23-q2@1: Which statement about GBM prices is true? | They are log-normally distributed and always positive | They are normally distributed and can be negative | They follow a uniform distribution | They never change | They are always increasing | S_{T} = S₀e^{normal} is positive and log-normal.
M3#maths-u21-23-q3@2: Why is the median GBM price below the mean? | The log-normal distribution is right-skewed: rare large gains raise the mean above the typical outcome | The median is always zero under geometric Brownian motion | Volatility increases the median above the mean over time | They are equal, since the log-normal distribution is symmetric | The median is above the mean, since prices are bounded below | E[e^{X}] = e^{E[X] + ½Var X} exceeds e^{E[X]}, the median.
Q: What is geometric Brownian motion? | The process dS = μS dt + σS dW, with drift μ and volatility σ.
Q: What is the solution for S_{T} under GBM? | S_{T} = S₀ exp((μ − ½σ^{2})T + σW_{T}).
Q: What is the median of S_{T} under GBM? | S₀e^{(μ − ½σ^{2})T}.
Q: What is d(ln S) under GBM? | (μ − ½σ^{2}) dt + σ dW.
Q: What is volatility drag? | The typical (median) growth rate is μ − ½σ^{2}, below the drift μ.
Q: How is GBM simulated over a step Δt? | S_{t+Δt} = S_{t} exp((μ − ½σ^{2})Δt + σ√Δt Z), with Z standard normal.
Q: Name two features of real returns that GBM misses. | Fat tails with volatility clustering, and jumps such as crashes.
Q: A stock at £100 has μ = 8%. What is its expected price after one year under GBM? | About £108.33, since 100e^{0.08} ≈ 108.33.
Q: What is a common mistake about growth under GBM? | Confusing the expected price growth μ with the median growth μ − ½σ^{2}.
Q: What are the mean and variance of ln S_{T} under GBM? | Mean ln S₀ + (μ − ½σ^{2})T and variance σ^{2}T.

## Derivatives Pricing
S: Derivatives are contracts whose value depends on another asset, such as forwards, futures, options and swaps. They're priced by no-arbitrage: find a replicating portfolio or a risk-neutral expectation, and the price must match.
O: Price forwards by no-arbitrage and describe main derivative types
O: Explain replication, hedging and risk-neutral valuation
T: Forward contract | An agreement to buy an asset at a fixed price K on a future date
T: Replicating portfolio | A portfolio of traded assets reproducing a derivative's payoff, whose cost gives the derivative's price
H: Main types
- Forwards and futures: obligations to trade later.
- Options: rights (calls and puts).
- Swaps: exchange of cash-flow streams (interest rate swaps).
- Credit derivatives (CDS) and exotic options.
H: Forward pricing
- No dividends: F = S₀e^{rT}.
- With dividend yield q: F = S₀e^{(r − q)T}.
- Cost of carry for commodities (storage and convenience yield).
- If F is too high, sell forward and buy the asset (cash-and-carry arbitrage).
H: General principles
- Price = cost of replication = discounted risk-neutral expectation.
- Delta hedging: hold ∂V/∂S shares to offset small price moves.
- Put–call parity links European calls and puts: C − P = S₀ − Ke^{−rT}.
- Counterparty and model risk.
X: A stock pays no dividends, S₀ = £50, r = 4% (continuous) and T = 1. Find the forward price.
> F = S₀e^{rT}
> = 50e^{0.04}
> ≈ £52.04
D: maths-u21-forward-price
K: Derivatives include forwards, futures, options and swaps; forwards price as S₀e^{(r − q)T}; replication and risk-neutral expectation give prices; delta hedging and put–call parity are key tools.
!: Pricing a forward by the expected future spot price instead of by no-arbitrage.
Q: What is the forward price of a non-dividend stock? | S₀e^{rT}.
Q: State put–call parity. | C − P = S₀ − Ke^{−rT}.
SUM: Derivatives derive value from underlyings.
SUM: No arbitrage sets their prices.
SRC: Hull JC, Options, Futures, and Other Derivatives (11th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
SRC: Wilmott P, Paul Wilmott Introduces Quantitative Finance (2nd edn, Wiley 2007) | textbook | 2007 | https://www.wiley.com/
NUM1#maths-u21-24-q1@1: A European call costs £8, the stock is £100, K = £100, r = 5% and T = 1 (continuous). What should the put cost by put–call parity, in £, to 2 decimal places? | 3.12 | 0.01 | £ | P = C − S₀ + Ke^{−rT} = 8 − 100 + 100e^{−0.05} ≈ 8 − 100 + 95.12 = £3.12.
M1#maths-u21-24-q2@1: The forward price of a stock is above S₀e^{rT}. What arbitrage is possible? | Borrow, buy the stock and sell the forward | Buy the forward and sell the stock | Do nothing, as forwards can't be mispriced | Buy both the stock and the forward | Sell the stock and lend the proceeds | Cash-and-carry locks in the difference between F and S₀e^{rT}.
M2#maths-u21-24-q3@2: Why do derivative prices not depend on investors' expected returns for the underlying? | The derivative can be replicated by trading the underlying and cash, so its price is fixed by the replication cost | Investors all expect the same return, so it cancels out of the price | Expected returns are always zero in efficient markets, so they don't appear | Derivatives have no risk of their own, so returns don't matter to them | They do depend on them: higher expected returns always raise call prices | Hedging removes exposure to the drift, leaving only volatility and rates.
Q: What is a derivative? | A contract whose value depends on another asset, such as a forward, future, option or swap.
Q: What is a forward contract? | An agreement to buy an asset at a fixed price K on a future date.
Q: What is a replicating portfolio? | A portfolio of traded assets reproducing a derivative's payoff, whose cost gives the derivative's price.
Q: What is the forward price with a dividend yield q? | F = S₀e^{(r − q)T}.
Q: What affects forward prices of commodities? | The cost of carry, including storage costs and convenience yield.
Q: What is a cash-and-carry arbitrage? | When the forward price is too high, sell forward and buy the asset.
Q: What is delta hedging? | Holding ∂V/∂S shares to offset small price moves in a derivative.
Q: What is a swap? | An exchange of cash-flow streams, such as in an interest rate swap.
Q: A non-dividend stock is £50 with r = 4% continuous. What is its 1-year forward price? | About £52.04, since 50e^{0.04} ≈ 52.04.
Q: What is a common mistake in forward pricing? | Pricing a forward by the expected future spot price instead of by no-arbitrage.

## Options Pricing
S: An option gives the right, but not the obligation, to buy (call) or sell (put) an asset at a set strike price. Its value depends on the underlying price, strike, time, volatility and interest rates, and the "Greeks" measure its sensitivity to each.
O: Describe option payoffs, intrinsic and time value
O: Explain the main determinants of option value and the Greeks
T: Call option | The right to buy at strike K; payoff max(S_{T} − K, 0) at expiry
T: Implied volatility | The volatility that makes a model's option price match the market price
H: Payoffs and values
- Call payoff max(S − K, 0); put payoff max(K − S, 0).
- Intrinsic value: payoff if exercised now; time value: the rest.
- In, at and out of the money.
- European (exercise at expiry) versus American (any time).
H: What drives value
- Higher S: calls up, puts down.
- Higher volatility: both up (more chance of large payoffs).
- Longer time: usually up.
- Higher interest rates: calls up, puts down.
H: The Greeks
- Delta ∂V/∂S, gamma ∂^{2}V/∂S^{2}, vega ∂V/∂σ, theta ∂V/∂t, rho ∂V/∂r.
- Delta of a call lies between 0 and 1.
- Implied volatility "smiles" and "skews" show model departures.
- Early exercise of American calls on non-dividend stocks is never optimal.
X: A call with K = £50 is priced £6 when the stock is £53. Find intrinsic and time value.
> Intrinsic value = max(53 − 50, 0) = £3
> Time value = 6 − 3 = £3
> The time value reflects the chance of further gains before expiry
D: maths-u21-call-value-split
K: Calls and puts have payoffs max(S − K, 0) and max(K − S, 0); value = intrinsic + time value; volatility, time, rates and the underlying price drive it; Greeks measure sensitivities.
!: Thinking higher volatility lowers option values because of more downside.
Q: What does vega measure? | Sensitivity of option value to volatility.
Q: When is it optimal to exercise an American call on a non-dividend stock early? | Never.
SUM: Options give rights, not obligations.
SUM: Volatility raises their value.
SRC: Hull JC, Options, Futures, and Other Derivatives (11th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
SRC: Natenberg S, Option Volatility and Pricing (2nd edn, McGraw-Hill 2015) | textbook | 2015 | https://www.mheducation.com/
NUM1#maths-u21-25-q1@1: A put with strike £80 expires when the stock is £72. What is its payoff in £? | 8 | 0 | £ | max(80 − 72, 0) = £8.
M1#maths-u21-25-q2@1: How does an increase in volatility affect the value of a call option? | It increases it | It decreases it | It has no effect | It makes it zero | It depends only on the strike | More volatility raises the chance of big payoffs while losses stay capped at the premium.
M3#maths-u21-25-q3@2: Why is early exercise of an American call on a non-dividend-paying stock never optimal? | Selling the call is worth at least its intrinsic value plus time value, which exceeds exercising | Early exercise is forbidden by the terms of American option contracts | The call has no value before expiry, so exercising gains nothing | Interest rates are negative, so waiting always costs the holder money | It is always optimal to exercise as soon as the call is in the money | The call is worth at least S − Ke^{−r(T−t)} > S − K, so exercising gives up value.
Q: What is a call option? | The right, but not the obligation, to buy at strike K, with payoff max(S_{T} − K, 0) at expiry.
Q: What is implied volatility? | The volatility that makes a model's option price match the market price.
Q: What is the payoff of a put option? | max(K − S, 0).
Q: How is an option's value split into two parts? | Intrinsic value, the payoff if exercised now, plus time value, the rest.
Q: How do European and American options differ? | European options can be exercised only at expiry; American options at any time.
Q: How do higher interest rates affect calls and puts? | Calls rise in value and puts fall.
Q: What does the gamma of an option measure? | ∂^{2}V/∂S^{2}, how fast delta changes with the underlying price.
Q: Between what values does a call's delta lie? | Between 0 and 1.
Q: A call with K = £50 costs £6 when the stock is £53. What is its time value? | £3, since intrinsic value is £3.
Q: What is a common mistake about volatility and option values? | Thinking higher volatility lowers option values because of more downside.

## Binomial Options Pricing
S: The binomial model, introduced by Cox, Ross and Rubinstein in 1979, lets a stock move up or down each step. Working backwards through the tree with risk-neutral probabilities prices European and American options and converges to Black–Scholes as steps shrink.
O: Price options on one- and two-step binomial trees
O: Handle American early exercise and explain convergence
T: Risk-neutral probability | q = (e^{rΔt} − d)/(u − d), the up-probability making the stock's discounted price a martingale
T: Backward induction | Valuing an option at each node from the values at the next step, starting at expiry
H: One step
- Stock S goes to Su or Sd.
- Replicate with Δ = (V_{u} − V_{d})/(S(u − d)) shares plus cash.
- V = e^{−rΔt}(qV_{u} + (1 − q)V_{d}).
H: Multi-step trees
- CRR parameters: u = e^{σ√Δt}, d = 1/u.
- Recombining trees keep nodes manageable.
- American options: at each node take max(continuation, exercise value).
H: Convergence and uses
- As Δt → 0, prices converge to Black–Scholes.
- Handles dividends, early exercise and barriers.
- Trinomial trees and lattices for interest rates.
- Teaching tool for no-arbitrage.
X: S = £100, u = 1.2, d = 0.8, r = 0 per step. Price a one-step call with K = £100.
> q = (1 − 0.8)/(1.2 − 0.8) = 0.5
> Payoffs: up £20, down £0
> Call value = 0.5 × 20 + 0.5 × 0 = £10
D: maths-u21-binomial-call
K: Binomial trees price options by backward induction with risk-neutral q; replication gives the same answer; American options compare exercise with continuation; trees converge to Black–Scholes.
!: Using real-world probabilities instead of risk-neutral q in the tree.
Q: What is the risk-neutral probability in a binomial tree? | q = (e^{rΔt} − d)/(u − d).
Q: What do binomial prices converge to as steps increase? | Black–Scholes prices.
SUM: Trees price options step by step.
SUM: Backward induction handles early exercise.
SRC: Cox JC, Ross SA, Rubinstein M, Option pricing: a simplified approach, Journal of Financial Economics 7(3), 229 | journal | 1979 | https://doi.org/10.1016/0304-405X(79)90015-1
SRC: Shreve SE, Stochastic Calculus for Finance I: The Binomial Asset Pricing Model (Springer 2004) | textbook | 2004 | https://link.springer.com/
NUM1#maths-u21-26-q1@1: In the example (S = 100, u = 1.2, d = 0.8, r = 0), what is the one-step put price with K = 100, in £? | 10 | 0 | £ | Put payoffs are 0 (up) and 20 (down), so 0.5 × 0 + 0.5 × 20 = £10, matching put–call parity with r = 0.
M1#maths-u21-26-q2@1: In a one-step tree with S = 100, u = 1.1, d = 0.9 and r = 0, what is q? | 0.5 | 0.55 | 0.45 | 0.9 | 1.1 | q = (1 − 0.9)/(1.1 − 0.9) = 0.1/0.2 = 0.5.
M2#maths-u21-26-q3@2: How is early exercise handled for an American put on a binomial tree? | At each node, its value is the larger of immediate exercise and the discounted continuation value | Early exercise is ignored, since the tree only prices European options | Only the final nodes matter, so earlier exercise can't be included | The tree is solved forwards from today, checking exercise along the way | It can't be handled on a tree; a separate PDE method is needed | Backward induction compares exercising now with holding at every node.
Q: Who introduced the binomial options model, and when? | Cox, Ross and Rubinstein, in 1979.
Q: What is backward induction in a binomial tree? | Valuing the option at each node from the values at the next step, starting at expiry.
Q: How many shares replicate an option in a one-step tree? | Δ = (V_{u} − V_{d})/(S(u − d)), plus cash.
Q: What is the one-step option value in a binomial tree? | V = e^{−rΔt}(qV_{u} + (1 − q)V_{d}).
Q: What are the CRR parameters for up and down moves? | u = e^{σ√Δt} and d = 1/u.
Q: Why are recombining trees useful? | They keep the number of nodes manageable.
Q: Name two features binomial trees can handle. | Dividends, early exercise and barriers.
Q: With S = £100, u = 1.2, d = 0.8 and r = 0, what is the one-step call price for K = £100? | £10, since q = 0.5 and the up payoff is £20.
Q: What is a common mistake when pricing on a binomial tree? | Using real-world probabilities instead of risk-neutral q.
Q: What tree extensions are used for interest rates? | Trinomial trees and lattices.

## Black–Scholes Model
S: The Black–Scholes model (1973) gives a closed-form price for European options assuming the stock follows geometric Brownian motion with constant volatility. It transformed financial markets, earned a Nobel prize, and its implied volatilities are still the language of options trading.
O: Apply the Black–Scholes formula for a European call
O: Explain the Black–Scholes PDE, its assumptions and limitations
T: Black–Scholes formula | C = S₀N(d₁) − Ke^{−rT}N(d₂), with d₁ = (ln(S₀/K) + (r + ½σ^{2})T)/(σ√T) and d₂ = d₁ − σ√T
T: Black–Scholes PDE | V_{t} + ½σ^{2}S^{2}V_{SS} + rSV_{S} − rV = 0
H: Derivation
- Hedge an option with Δ = V_{S} shares: the portfolio is riskless over dt.
- No arbitrage: it must earn r, giving the PDE.
- The drift μ disappears: only σ and r matter.
- Equivalent to risk-neutral expectation (Feynman–Kac).
H: Assumptions
- GBM with constant σ; constant r.
- Continuous trading, no transaction costs, no dividends (or known yield).
- European exercise.
H: Limitations and uses
- Volatility smiles show σ isn't constant.
- Jumps and fat tails.
- Still used to quote prices as implied volatilities.
- Merton and Scholes received the 1997 Nobel prize (Black had died).
X: Price an at-the-money call with S₀ = K = £100, r = 0, σ = 20% and T = 1.
> d₁ = (0 + 0.02)/0.2 = 0.1 and d₂ = −0.1
> N(0.1) ≈ 0.5398 and N(−0.1) ≈ 0.4602
> C = 100 × 0.5398 − 100 × 0.4602 ≈ £7.97
D: maths-u21-bs-normal-area
K: Black–Scholes prices European options using S, K, r, σ and T; it follows from delta hedging and no arbitrage; drift drops out; constant volatility is its main unrealistic assumption.
!: Plugging the stock's expected return μ into the Black–Scholes formula.
Q: Which parameter of the stock does the Black–Scholes price not depend on? | Its expected return μ.
Q: Who received the 1997 Nobel prize for the model? | Robert Merton and Myron Scholes.
SUM: A closed form for European options.
SUM: Hedging removes the drift.
SRC: Black F, Scholes M, The pricing of options and corporate liabilities, Journal of Political Economy 81(3), 637 | journal | 1973 | https://doi.org/10.1086/260062
SRC: Merton RC, Theory of rational option pricing, Bell Journal of Economics and Management Science 4(1), 141 | journal | 1973 | https://doi.org/10.2307/3003143
NUM1#maths-u21-27-q1@1: For an at-the-money call with r = 0, the price is approximately 0.4Sσ√T. Estimate it for S = £100, σ = 25%, T = 1, in £. | 10 | 0.1 | £ | 0.4 × 100 × 0.25 × 1 = £10 (the exact value is about £9.95).
M1#maths-u21-27-q2@1: In the Black–Scholes formula, what is d₂? | d₁ − σ√T | d₁ + σ√T | σ√T | ln(S/K) | d₁/σ | By definition d₂ = d₁ − σ√T; N(d₂) is the risk-neutral probability that the call finishes in the money.
M3#maths-u21-27-q3@2: Why does the expected return μ drop out of the Black–Scholes equation? | A delta-hedged portfolio is riskless, so it must earn r regardless of μ | μ is always equal to r in real markets, so it cancels | Investors don't care about expected returns when trading options | The formula ignores the stock price, so μ can't appear | It doesn't drop out; it appears inside d₁ and d₂ | Continuous hedging cancels the dW terms, and with them any dependence on drift.
Q: What is the Black–Scholes call formula? | C = S₀N(d₁) − Ke^{−rT}N(d₂).
Q: How is d₁ defined in Black–Scholes? | d₁ = (ln(S₀/K) + (r + ½σ^{2})T)/(σ√T).
Q: What is the Black–Scholes PDE? | V_{t} + ½σ^{2}S^{2}V_{SS} + rSV_{S} − rV = 0.
Q: How is the Black–Scholes PDE derived? | Hedge the option with Δ = V_{S} shares to make a riskless portfolio, which must earn r by no arbitrage.
Q: What stock model does Black–Scholes assume? | Geometric Brownian motion with constant volatility.
Q: Name three Black–Scholes assumptions besides GBM. | Constant r, continuous trading with no transaction costs, and European exercise.
Q: What shows that volatility isn't really constant? | Volatility smiles in implied volatilities.
Q: What is an at-the-money call worth with S₀ = K = £100, r = 0, σ = 20%, T = 1? | About £7.97.
Q: What is a common mistake when using the Black–Scholes formula? | Plugging the stock's expected return μ into it.
Q: Why was Fischer Black not awarded the 1997 Nobel prize? | He had died.

## Interest Rate Models
S: Interest rate models describe how rates evolve over time and across maturities, the yield curve. Short-rate models such as Vasicek and Hull–White, and market models such as LIBOR/SOFR models, price bonds, swaps and interest rate options.
O: Describe the yield curve, forward rates and short-rate models
O: Explain mean reversion and calibration to market curves
T: Yield curve | The relationship between interest rates (yields) and time to maturity
T: Vasicek model | dr = a(b − r)dt + σ dW: a mean-reverting short rate with speed a and long-run level b
H: The term structure
- Spot rates from zero-coupon bond prices: P(0, T) = e^{−R(T)T}.
- Forward rates: rates agreed now for future periods.
- Normal (upward), flat and inverted curves.
- Inversions have often preceded recessions.
H: Short-rate models
- Vasicek: mean-reverting, Gaussian; rates can go negative.
- Cox–Ingersoll–Ross: σ√r volatility keeps rates non-negative.
- Hull–White: time-dependent b(t) fits today's curve exactly.
- Heath–Jarrow–Morton: model the whole forward curve.
H: Market models and uses
- LIBOR market model; transition to SOFR and SONIA (risk-free rates).
- Pricing caps, floors and swaptions.
- Asset–liability management for banks and insurers.
- Central bank policy and the curve.
X: In Vasicek with a = 0.5, b = 4% and current r = 2%, what is the expected rate in the long run, and the drift now?
> The drift a(b − r) = 0.5 × (0.04 − 0.02) = 0.01 per year
> So rates are pulled up by 1% a year at first
> In the long run E[r] → b = 4%
D: maths-u21-vasicek-mean
K: Yield curves link rates to maturities; forward rates come from spot rates; Vasicek, CIR and Hull–White model the short rate with mean reversion; models are calibrated to market curves.
!: Using a model that allows negative rates without checking whether that matters for the product.
Q: What feature makes rates return to a long-run level? | Mean reversion.
Q: Which short-rate model keeps rates non-negative? | Cox–Ingersoll–Ross (CIR).
SUM: Models describe rates across time and maturity.
SUM: Calibration fits today's curve.
SRC: Vasicek O, An equilibrium characterization of the term structure, Journal of Financial Economics 5(2), 177 | journal | 1977 | https://doi.org/10.1016/0304-405X(77)90016-2
SRC: Brigo D, Mercurio F, Interest Rate Models: Theory and Practice (2nd edn, Springer 2006) | textbook | 2006 | https://link.springer.com/
NUM1#maths-u21-28-q1@1: The 1-year spot rate is 3% and the 2-year spot rate is 4% (annual compounding). What is the 1-year forward rate starting in one year, in %, to 2 decimal places? | 5.01 | 0.01 | % | (1.04^{2}/1.03) − 1 = 1.0816/1.03 − 1 ≈ 0.0501.
M1#maths-u21-28-q2@1: What does an inverted yield curve mean? | Short-term rates are higher than long-term rates | Long-term rates are higher than short-term rates | All rates are zero | Rates are equal at all maturities | Bonds have no yield | Inversion means the curve slopes downwards.
M2#maths-u21-28-q3@2: Why do Hull–White models include a time-dependent long-run level b(t)? | So the model reproduces today's observed yield curve exactly | To make interest rates constant over time | To remove all randomness from the rate | To prevent any mean reversion in rates | They don't include a time-dependent level | Exact calibration to market prices is needed before pricing derivatives.
Q: What is a yield curve? | The relationship between interest rates (yields) and time to maturity.
Q: What is the Vasicek model? | dr = a(b − r)dt + σ dW, a mean-reverting short rate with speed a and long-run level b.
Q: How are spot rates found from zero-coupon bond prices? | From P(0, T) = e^{−R(T)T}.
Q: What are forward rates? | Rates agreed now for future periods.
Q: What has often followed inverted yield curves? | Recessions.
Q: What drawback does the Vasicek model have? | Being Gaussian, it allows rates to go negative.
Q: What does the Heath–Jarrow–Morton framework model? | The whole forward curve.
Q: Which rates are replacing LIBOR in market models? | Risk-free rates such as SOFR and SONIA.
Q: In Vasicek with a = 0.5, b = 4% and r = 2%, what is the drift now? | 0.01 a year, pulling the rate up by 1% a year at first.
Q: What is a common mistake when choosing interest rate models? | Using a model that allows negative rates without checking whether that matters for the product.

## Risk Theory
S: Risk theory, or ruin theory, models an insurer's surplus as premiums come in and random claims go out. It asks how likely the insurer is to run out of money and how big premiums and capital must be to keep that probability small.
O: Describe the Cramér–Lundberg surplus model
O: Use the safety loading and Lundberg's inequality for ruin probability
T: Probability of ruin | ψ(u), the probability that an insurer starting with capital u ever has negative surplus
T: Safety loading | θ, the proportion by which premiums exceed expected claims: premium rate c = (1 + θ)λE[X]
H: The model
- Surplus U(t) = u + ct − S(t), where S(t) is a compound Poisson sum of claims.
- Claims arrive at rate λ with sizes X.
- Net profit condition: θ > 0, otherwise ruin is certain.
H: Ruin probabilities
- Lundberg's inequality: ψ(u) ≤ e^{−Ru}, with adjustment coefficient R.
- Exponential claims with mean μ: ψ(u) = (1/(1 + θ)) e^{−θu/((1 + θ)μ)}.
- Heavy-tailed claims make ruin decay much more slowly.
H: Uses
- Setting premiums and capital.
- Reinsurance design.
- Solvency regulation (Solvency II).
- Collective risk models for aggregate claims.
X: Claims are exponential with mean £1000 and θ = 0.25. Find the ruin probability with initial capital £5000.
> ψ(u) = (1/1.25) e^{−0.25 × 5000/(1.25 × 1000)}
> = 0.8 × e^{−1}
> ≈ 0.294
D: maths-u21-ruin-probability
K: Ruin theory models surplus as capital plus premiums minus compound Poisson claims; positive safety loading is essential; ψ(u) decays exponentially for light tails (Lundberg); heavy tails increase ruin risk.
!: Charging premiums equal to expected claims, which makes eventual ruin certain.
Q: What is the net profit condition? | Premiums exceed expected claims (θ > 0).
Q: What does Lundberg's inequality bound? | The probability of ruin, by e^{−Ru}.
SUM: Model surplus as income minus claims.
SUM: Loading and capital control ruin.
SRC: Asmussen S, Albrecher H, Ruin Probabilities (2nd edn, World Scientific 2010) | textbook | 2010 | https://www.worldscientific.com/
SRC: Klugman SA, Panjer HH, Willmot GE, Loss Models: From Data to Decisions (5th edn, Wiley 2019) | textbook | 2019 | https://www.wiley.com/
NUM1#maths-u21-29-q1@1: In the exponential-claims formula, what is ψ(0) when θ = 0.25? | 0.8 | 0.001 |  | ψ(0) = 1/(1 + θ) = 1/1.25 = 0.8.
M1#maths-u21-29-q2@1: Claims arrive at 100 per year with mean £500 and θ = 0.2. What is the annual premium income? | £60,000 | £50,000 | £10,000 | £600 | £120,000 | Premium income is (1 + θ) × expected claims = 1.2 × 100 × £500 = £60,000 a year, including a 20% safety loading.
M2#maths-u21-29-q3@2: Why is ruin certain if premiums equal expected claims exactly? | Random fluctuations then have no upward drift to offset them, so the surplus eventually hits zero | Claims stop arriving once premiums match expected claims exactly | Capital then grows without bound, which counts as ruin by definition | Ruin becomes impossible in that case, since income equals outgo | It isn't certain; ruin then has a probability of exactly one half | A random walk with zero drift eventually reaches any level below its start.
Q: What is the probability of ruin? | ψ(u), the probability that an insurer starting with capital u ever has negative surplus.
Q: What is the safety loading? | θ, the proportion by which premiums exceed expected claims, so c = (1 + θ)λE[X].
Q: What is the surplus process in risk theory? | U(t) = u + ct − S(t), with S(t) a compound Poisson sum of claims.
Q: What is the ruin probability for exponential claims with mean μ? | ψ(u) = (1/(1 + θ)) e^{−θu/((1 + θ)μ)}.
Q: How do heavy-tailed claims affect ruin probabilities? | Ruin probability decays much more slowly with capital.
Q: Name two uses of ruin theory. | Setting premiums and capital, reinsurance design, and solvency regulation.
Q: Claims are exponential with mean £1000, θ = 0.25 and capital £5000. What is the ruin probability? | About 0.294, since 0.8 × e^{−1} ≈ 0.294.
Q: What is a common mistake in setting insurance premiums? | Charging premiums equal to expected claims, which makes eventual ruin certain.
Q: What is R in Lundberg's inequality? | The adjustment coefficient in the bound ψ(u) ≤ e^{−Ru}.
Q: How are claims assumed to arrive in the classical risk model? | As a Poisson process at rate λ, with random sizes X.

## Market Risk Modelling
S: Market risk is the risk of losses from movements in market prices: shares, interest rates, currencies and commodities. Banks model it with historical simulation, variance–covariance and Monte Carlo methods, and regulators require them to hold capital against it.
O: Compare historical, parametric and Monte Carlo approaches to market risk
O: Describe volatility estimation, stress testing and backtesting
T: Historical simulation | Estimating a loss distribution by applying past daily market changes to today's portfolio
T: Backtesting | Comparing a risk model's predicted loss thresholds with actual outcomes to check its accuracy
H: Approaches
- Variance–covariance: assume normal returns; loss quantiles from σ and correlations.
- Historical simulation: no distributional assumption, but limited by the history window.
- Monte Carlo: simulate from a fitted model; flexible but costly.
H: Volatility
- EWMA (RiskMetrics): σₜ^{2} = λσₜ₋₁^{2} + (1 − λ)rₜ₋₁^{2}, with λ ≈ 0.94.
- GARCH models capture volatility clustering.
- Correlations rise in crises.
H: Validation and regulation
- Backtesting: count exceptions where losses exceed VaR.
- Basel traffic-light system for exceptions.
- Stress tests for extreme but plausible scenarios.
- The Fundamental Review of the Trading Book moved to expected shortfall.
X: Using EWMA with λ = 0.94, yesterday's variance 0.0001 and return 2%, update the variance.
> σₜ^{2} = 0.94 × 0.0001 + 0.06 × 0.02^{2}
> = 0.000094 + 0.000024 = 0.000118
> Daily volatility ≈ √0.000118 ≈ 1.09%
D: maths-u21-ewma-update
K: Market risk is modelled by variance–covariance, historical simulation or Monte Carlo; EWMA and GARCH track changing volatility; backtesting and stress tests validate models.
!: Assuming normal returns, which underestimates extreme losses.
Q: What does backtesting check? | Whether actual losses exceed predicted thresholds as often as expected.
Q: What λ does RiskMetrics use for daily EWMA? | 0.94.
SUM: Model losses from market moves.
SUM: Validate with backtests and stress tests.
SRC: Jorion P, Value at Risk: The New Benchmark for Managing Financial Risk (3rd edn, McGraw-Hill 2007) | textbook | 2007 | https://www.mheducation.com/
SRC: J.P. Morgan/Reuters, RiskMetrics: Technical Document (4th edn 1996) | report | 1996 | https://www.msci.com/
NUM1#maths-u21-30-q1@1: With daily volatility 1.5%, what is the approximate 10-day volatility in %, using the square-root-of-time rule, to 2 decimal places? | 4.74 | 0.01 | % | 1.5 × √10 ≈ 1.5 × 3.162 ≈ 4.74%.
M1#maths-u21-30-q2@1: Which market risk method uses no distributional assumption about returns? | Historical simulation | Variance–covariance | Normal parametric VaR | Delta-normal approximation | A single scenario | Historical simulation replays actual past market changes on today's portfolio, so it assumes no particular return distribution.
M2#maths-u21-30-q3@2: Why do banks run stress tests as well as statistical risk models? | Statistical models based on recent data can miss extreme, rare scenarios | Stress tests replace backtesting | Statistical models are always too conservative | Regulators forbid statistical models | They don't run them | Scenarios like 2008 may lie outside the history window used by the model.
Q: What is market risk? | The risk of losses from movements in market prices of shares, interest rates, currencies and commodities.
Q: What is historical simulation? | Estimating a loss distribution by applying past daily market changes to today's portfolio.
Q: What is backtesting a risk model? | Comparing its predicted loss thresholds with actual outcomes to check its accuracy.
Q: What does the variance–covariance method assume? | Normal returns, with loss quantiles from volatilities and correlations.
Q: What is the trade-off of Monte Carlo for market risk? | It is flexible but computationally costly.
Q: What is the EWMA variance update? | σₜ^{2} = λσₜ₋₁^{2} + (1 − λ)rₜ₋₁^{2}.
Q: What do GARCH models capture? | Volatility clustering.
Q: What does the Basel traffic-light system judge? | The number of backtesting exceptions where losses exceed VaR.
Q: What is a common mistake about return distributions in market risk? | Assuming normal returns, which underestimates extreme losses.
Q: What did the Fundamental Review of the Trading Book change? | It moved market risk measurement to expected shortfall.

## Credit Risk Modelling
S: Credit risk is the risk that a borrower fails to repay. Models estimate the probability of default, the loss given default and the exposure at default, and portfolio models capture how defaults cluster in downturns.
O: Calculate expected loss from PD, LGD and EAD
O: Describe structural (Merton) and reduced-form credit models
T: Expected loss | EL = PD × LGD × EAD: probability of default times loss given default times exposure at default
T: Merton model | A structural model where a firm defaults if its asset value falls below its debt at maturity, treating equity as a call option
H: Building blocks
- PD from ratings, scoring models or market data.
- LGD = 1 − recovery rate.
- EAD for drawn and undrawn credit lines.
- Credit scoring (logistic regression, machine learning) for retail lending.
H: Models
- Structural (Merton 1974): default when assets < debt; distance to default.
- Reduced-form: default arrives at a random intensity λ (hazard rate).
- Credit spreads ≈ λ × LGD.
- Credit default swaps price default risk.
H: Portfolios
- Defaults are correlated through economic cycles.
- Vasicek one-factor model underlies Basel IRB capital.
- Gaussian copula models were criticised after 2008.
- Unexpected loss and economic capital.
X: A £1m loan has PD = 2% and recovery rate 40%. Find the expected loss.
> LGD = 1 − 0.4 = 0.6
> EL = 0.02 × 0.6 × 1,000,000
> = £12,000
D: maths-u21-loss-given-default
K: Expected loss is PD × LGD × EAD; structural models link default to asset values; reduced-form models use hazard rates; portfolio models capture correlated defaults for capital.
!: Ignoring default correlation, which understates the risk of many defaults at once.
Q: What is LGD in terms of the recovery rate? | 1 − recovery rate.
Q: In the Merton model, what is equity equivalent to? | A call option on the firm's assets.
SUM: Credit risk is default risk.
SUM: Correlation drives portfolio losses.
SRC: Merton RC, On the pricing of corporate debt: the risk structure of interest rates, Journal of Finance 29(2), 449 | journal | 1974 | https://doi.org/10.1111/j.1540-6261.1974.tb03058.x
SRC: Basel Committee on Banking Supervision, An Explanatory Note on the Basel II IRB Risk Weight Functions | guideline | 2005 | https://www.bis.org/bcbs/irbriskweight.htm
NUM1#maths-u21-31-q1@1: A bond has default intensity λ = 3% a year and LGD 50%. What approximate credit spread does this imply, in %? | 1.5 | 0.01 | % | Spread ≈ λ × LGD = 0.03 × 0.5 = 1.5%.
M1#maths-u21-31-q2@1: A £500,000 exposure has PD 1% and LGD 45%. What is the expected loss? | £2,250 | £5,000 | £225,000 | £4,500 | £2,750 | Expected loss = PD × LGD × EAD = 0.01 × 0.45 × £500,000 = £2,250.
M3#maths-u21-31-q3@2: Why did Gaussian copula models of mortgage portfolios fail in 2008? | They underestimated how strongly defaults cluster in extreme downturns (weak tail dependence) | They overestimated default rates, making mortgage securities look too risky | They ignored interest rates but modelled default correlation perfectly | They were far too conservative, so banks held too much capital | They didn't fail; losses in 2008 matched the models' predictions | The Gaussian copula has no tail dependence, so joint extreme defaults seemed very unlikely.
Q: What is credit risk? | The risk that a borrower fails to repay.
Q: What is the expected loss formula for credit risk? | EL = PD × LGD × EAD.
Q: What is the Merton model of default? | A structural model where a firm defaults if its asset value falls below its debt at maturity.
Q: How does a reduced-form credit model treat default? | Default arrives at a random intensity λ, the hazard rate.
Q: How is a credit spread approximated from a hazard rate? | Spread ≈ λ × LGD.
Q: What methods are used for retail credit scoring? | Logistic regression and machine learning.
Q: Which model underlies Basel IRB capital? | The Vasicek one-factor model.
Q: Why are defaults correlated? | They are linked through economic cycles, clustering in downturns.
Q: A £1m loan has PD 2% and recovery 40%. What is the expected loss? | £12,000, since 0.02 × 0.6 × 1,000,000 = 12,000.
Q: What is a common mistake in credit portfolio risk? | Ignoring default correlation, which understates the risk of many defaults at once.

## Value at Risk (VaR)
S: Value at Risk is the loss level that won't be exceeded with a given confidence over a given period, such as "99% one-day VaR of £1m". It's simple to communicate but says nothing about how bad losses beyond it can be.
O: Calculate parametric VaR for normally distributed returns
O: Interpret VaR and explain its limitations
T: Value at Risk | VaR_{α}, the loss L with P(loss > L) = 1 − α over a horizon
T: Subadditivity | ρ(A + B) ≤ ρ(A) + ρ(B): combining portfolios shouldn't increase risk; VaR can violate it
H: Calculation
- Normal returns: VaR = z_{α}σV − μV (often μ ≈ 0 for short horizons).
- z₀.₉₅ = 1.645, z₀.₉₉ = 2.326.
- Historical: the appropriate percentile of simulated losses.
- Scaling with √T for longer horizons (if returns are independent).
H: Interpretation
- 99% one-day VaR of £1m: on about 1 day in 100, losses exceed £1m.
- Says nothing about the size of those exceedances.
- Depends on horizon, confidence and model.
H: Limitations
- Not subadditive in general: can discourage diversification.
- Ignores tail shape (fat tails).
- Gave false comfort before 2008.
- Expected shortfall now preferred by regulators.
X: A £10m portfolio has daily volatility 1%. Find its 99% one-day VaR assuming normal returns with zero mean.
> σV = 0.01 × 10m = £100,000
> VaR = 2.326 × 100,000
> ≈ £232,600
D: maths-u21-var-tail
- Banks report VaR daily to management and regulators.
K: VaR is a loss quantile at a given confidence and horizon; parametric VaR uses z_{α}σV; it ignores losses beyond the threshold and isn't always subadditive.
!: Reading VaR as the maximum possible loss.
Q: What does a 95% one-day VaR of £1m mean? | Losses exceed £1m on about 5% of days.
Q: What z-value gives 99% one-sided normal VaR? | About 2.326.
SUM: VaR is a loss threshold.
SUM: It ignores tail size.
SRC: Jorion P, Value at Risk: The New Benchmark for Managing Financial Risk (3rd edn, McGraw-Hill 2007) | textbook | 2007 | https://www.mheducation.com/
SRC: Artzner P, Delbaen F, Eber JM, Heath D, Coherent measures of risk, Mathematical Finance 9(3), 203 | journal | 1999 | https://doi.org/10.1111/1467-9965.00068
NUM1#maths-u21-32-q1@1: A £5m portfolio has daily volatility 2%. What is its 95% one-day normal VaR in £ (z = 1.645)? | 164500 | 1 | £ | 1.645 × 0.02 × 5,000,000 = £164,500.
M1#maths-u21-32-q2@1: Which statement about VaR is correct? | It gives a loss threshold exceeded with a stated small probability | It is the largest loss that can possibly occur | It measures the average return of the portfolio | It is always subadditive across portfolios | It measures the average size of tail losses | VaR is a quantile, not a worst case or a tail average.
M2#maths-u21-32-q3@2: Why can VaR discourage diversification? | It isn't always subadditive, so a combined portfolio can show higher VaR than the sum of its parts | It always rewards diversification, so it can't discourage it | It ignores correlations completely between portfolio positions | It is only defined for a single asset, never for portfolios | It can't: VaR always falls when positions are combined | With certain discrete or skewed losses, VaR(A + B) > VaR(A) + VaR(B).
Q: What is Value at Risk? | The loss level that won't be exceeded with a given confidence over a given period.
Q: What is subadditivity of a risk measure? | ρ(A + B) ≤ ρ(A) + ρ(B): combining portfolios shouldn't increase risk.
Q: What is the parametric normal VaR formula? | VaR = z_{α}σV − μV, often with μ ≈ 0 for short horizons.
Q: What is the z-value for 95% normal VaR? | 1.645.
Q: How is VaR scaled to longer horizons? | By √T, if returns are independent.
Q: What does VaR fail to tell you? | Anything about the size of losses beyond the threshold.
Q: A £10m portfolio has 1% daily volatility. What is its 99% one-day normal VaR? | About £232,600.
Q: What is a common mistake in reading VaR? | Treating it as the maximum possible loss.
Q: What do regulators now prefer to VaR? | Expected shortfall.
Q: What three choices does a VaR figure depend on? | The horizon, the confidence level and the model.

## Expected Shortfall
S: Expected shortfall, also called conditional VaR, is the average loss in the worst (1 − α) of cases. It looks beyond the VaR threshold into the tail and is a coherent risk measure, which is why Basel trading-book rules adopted it.
O: Calculate expected shortfall for normal and discrete loss distributions
O: Explain coherence and why ES improves on VaR
T: Expected shortfall | ES_{α} = E[loss ∣ loss ≥ VaR_{α}], the average of losses in the worst (1 − α) tail
T: Coherent risk measure | A measure satisfying monotonicity, subadditivity, positive homogeneity and translation invariance (Artzner et al.)
H: Calculation
- Normal losses with mean 0: ES_{α} = σ φ(z_{α})/(1 − α).
- 97.5% ES ≈ 2.338σ, close to 99% VaR (2.326σ).
- Historical: average the worst (1 − α) fraction of scenarios.
H: Properties
- Always at least as large as VaR at the same level.
- Coherent, so it rewards diversification.
- Sensitive to tail shape.
- Harder to backtest than VaR (it's not elicitable on its own).
H: Regulation
- Basel FRTB (2016–19): 97.5% ES replaces 99% VaR for market risk.
- Used in insurance (Swiss Solvency Test uses ES).
- Liquidity horizons vary by risk factor.
X: Ten equally likely losses are 1, 2, 3, 4, 5, 6, 7, 8, 20 and 50. Find the 80% VaR and ES.
> The worst 20% of outcomes are 20 and 50
> VaR at 80%: the threshold at the 8th worst value, 8 (by one convention)
> ES = average of the worst 20% = (20 + 50)/2 = 35, much more than VaR shows
D: maths-u21-expected-shortfall
K: Expected shortfall averages losses beyond VaR; it's coherent and captures tail severity; 97.5% ES is close to 99% VaR for normal distributions; regulators now use it for market risk.
!: Assuming two portfolios with equal VaR have equal tail risk.
Q: Is expected shortfall subadditive? | Yes: it's coherent.
Q: What confidence level does Basel FRTB use for ES? | 97.5%.
SUM: ES averages the tail.
SUM: It's coherent, unlike VaR.
SRC: Acerbi C, Tasche D, On the coherence of expected shortfall, Journal of Banking and Finance 26(7), 1487 | journal | 2002 | https://doi.org/10.1016/S0378-4266(02)00283-2
SRC: Basel Committee on Banking Supervision, Minimum capital requirements for market risk (FRTB) | guideline | 2019 | https://www.bis.org/bcbs/publ/d457.htm
NUM1#maths-u21-33-q1@1: For normal losses with σ = £1m, what is 97.5% expected shortfall in £m, using ES ≈ 2.338σ? | 2.338 | 0.001 | £m | 2.338 × 1 = £2.338m, close to the 99% VaR of £2.326m.
M1#maths-u21-33-q2@1: Which property does expected shortfall have that VaR lacks in general? | Subadditivity | Monotonicity | Translation invariance | Positive homogeneity | Being a quantile | ES is coherent, so diversification never increases it.
M3#maths-u21-33-q3@2: Why can two portfolios with the same VaR have very different expected shortfalls? | VaR marks only the threshold, while ES averages the losses beyond it, which can differ greatly in size | VaR and ES are always equal, so they can't differ | ES ignores the tail and looks only at typical losses | VaR already measures the size of tail losses fully | They can't differ when VaR is the same at that level | A fat-tailed portfolio has far larger losses beyond the same threshold.
Q: What is expected shortfall? | The average loss in the worst (1 − α) of cases, ES_{α} = E[loss ∣ loss ≥ VaR_{α}].
Q: What is a coherent risk measure? | One satisfying monotonicity, subadditivity, positive homogeneity and translation invariance.
Q: What is another name for expected shortfall? | Conditional VaR.
Q: What is normal ES with mean 0? | ES_{α} = σ φ(z_{α})/(1 − α).
Q: How does 97.5% normal ES compare with 99% normal VaR? | They are close: about 2.338σ versus 2.326σ.
Q: How does expected shortfall compare in size with VaR at the same level? | It is always at least as large.
Q: Why is expected shortfall harder to backtest than VaR? | It is not elicitable on its own.
Q: Losses of 1 to 8, 20 and 50 are equally likely. What is the 80% expected shortfall? | 35, the average of the worst two, 20 and 50.
Q: What is a common mistake about portfolios with equal VaR? | Assuming they have equal tail risk.
Q: Which insurance regime uses expected shortfall? | The Swiss Solvency Test.

## Actuarial Mathematics
S: Actuarial mathematics combines interest, probability and statistics to value future payments that depend on uncertain events such as death, illness or accidents. Actuaries use it to price insurance, set pension contributions and hold adequate reserves.
O: Use life tables and survival probabilities to value life-contingent payments
O: Apply the equivalence principle to set premiums
T: Life table | A table of lₓ survivors at each age x from a starting cohort, giving probabilities such as ₜpₓ = lₓ₊ₜ/lₓ
T: Equivalence principle | Setting premiums so that the expected present value of premiums equals that of benefits
H: Building blocks
- Survival probability ₜpₓ and death probability qₓ = 1 − pₓ.
- Life expectancy eₓ.
- Discount factors vᵗ from interest.
- Expected present values combine both.
H: Insurance and annuities
- Term insurance pays on death within n years.
- Whole life insurance: Aₓ = Σ vᵏ⁺¹ ₖpₓ qₓ₊ₖ.
- Life annuities: äₓ = Σ vᵏ ₖpₓ.
- Relation: Aₓ = 1 − däₓ, with d = i/(1 + i).
H: Reserves and profession
- Reserves: EPV of future benefits minus EPV of future premiums.
- Thiele's differential equation for reserves.
- Mortality improvement and longevity risk.
- Professional bodies: Institute and Faculty of Actuaries (UK), Society of Actuaries.
X: A 1-year term policy pays £10,000 if a 60-year-old dies within a year (q₆₀ = 0.01), with i = 5%. Find the single premium.
> Benefit paid at year end with probability 0.01
> EPV = 10,000 × 0.01/1.05
> ≈ £95.24
D: maths-u21-term-policy-tree
K: Actuarial mathematics combines life tables with discounting; insurance and annuity values are expected present values; the equivalence principle sets premiums; reserves cover future obligations.
!: Ignoring interest and valuing benefits by probability alone.
Q: What does ₜpₓ mean? | The probability that a life aged x survives t more years.
Q: What does the equivalence principle set equal? | Expected present values of premiums and benefits.
SUM: Probability plus interest values life contingencies.
SUM: Premiums balance expected benefits.
SRC: Dickson DCM, Hardy MR, Waters HR, Actuarial Mathematics for Life Contingent Risks (3rd edn, Cambridge University Press 2020) | textbook | 2020 | https://www.cambridge.org/
SRC: Bowers NL et al., Actuarial Mathematics (2nd edn, Society of Actuaries 1997) | textbook | 1997 | https://www.soa.org/
NUM1#maths-u21-34-q1@1: A life table has l₅₀ = 95,000 and l₆₀ = 90,250. What is ₁₀p₅₀? | 0.95 | 0.001 |  | ₁₀p₅₀ = l₆₀/l₅₀ = 90,250/95,000 = 0.95.
M1#maths-u21-34-q2@1: If q₇₀ = 0.02, what is p₇₀? | 0.98 | 0.02 | 1.02 | 0.2 | 0.5 | Survival and death probabilities over one year sum to 1.
M2#maths-u21-34-q3@2: Why must actuaries model mortality improvement over time? | People are living longer, so using old tables underestimates annuity and pension costs | Mortality rates never change, so old tables are always correct | Mortality improvement reduces life expectancy over time | It only affects term insurance, never pensions or annuities | They needn't, since regulators set mortality assumptions | Longevity risk means payments last longer than older tables predict.
Q: What is a life table? | A table of survivors lₓ at each age x from a starting cohort, giving probabilities such as ₜpₓ = lₓ₊ₜ/lₓ.
Q: What is the equivalence principle? | Setting premiums so the expected present value of premiums equals that of benefits.
Q: How is qₓ related to pₓ? | qₓ = 1 − pₓ.
Q: What does term insurance pay? | A benefit on death within n years.
Q: What is the formula for a whole life annuity-due value? | äₓ = Σ vᵏ ₖpₓ.
Q: How are Aₓ and äₓ related? | Aₓ = 1 − däₓ, with d = i/(1 + i).
Q: How is a policy reserve defined? | The EPV of future benefits minus the EPV of future premiums.
Q: Which differential equation describes reserves? | Thiele's differential equation.
Q: A 1-year term policy pays £10,000 if a 60-year-old dies, with q₆₀ = 0.01 and i = 5%. What is the single premium? | About £95.24.
Q: What is a common mistake in valuing insurance benefits? | Ignoring interest and valuing benefits by probability alone.

## Insurance Mathematics
S: Insurance mathematics prices general insurance, such as motor, home and liability cover, where claims vary in number and size. Frequency–severity models, premium principles and credibility theory set fair premiums from limited and varied data.
O: Model aggregate claims with frequency and severity distributions
O: Apply premium principles and credibility theory
T: Compound distribution | Aggregate claims S = X₁ + … + X_{N}, with random claim count N and claim sizes Xᵢ
T: Credibility premium | Z × (own experience) + (1 − Z) × (collective mean), with credibility factor Z between 0 and 1
H: Frequency and severity
- Claim counts: Poisson, negative binomial.
- Claim sizes: gamma, log-normal, Pareto (heavy tails).
- E[S] = E[N]E[X]; Var(S) = E[N]Var(X) + Var(N)E[X]^{2}.
- Panjer recursion and simulation for the distribution of S.
H: Premium principles
- Expected value principle: (1 + θ)E[S].
- Variance and standard deviation principles.
- Exponential (zero-utility) principle.
- Reinsurance: excess of loss and quota share.
H: Experience rating
- Bühlmann credibility: Z = n/(n + k).
- No-claims discounts as Markov chains.
- Generalised linear models for rating factors (age, location, vehicle).
- Reserving for claims not yet reported (chain ladder).
X: Claims per policy are Poisson with mean 0.1, and each claim averages £2000 with standard deviation £1000. Find E[S] and Var(S).
> E[S] = 0.1 × 2000 = £200
> For Poisson N, Var(S) = λE[X^{2}] = 0.1 × (1000^{2} + 2000^{2})
> = 0.1 × 5,000,000 = 500,000, so the SD ≈ £707
K: Aggregate claims combine frequency and severity; compound moments follow standard formulas; premium principles add loadings; credibility blends own and collective experience; GLMs set rating factors.
!: Ignoring the variance of claim counts when estimating aggregate claim variability.
Q: What is E[S] for a compound distribution? | E[N]E[X].
Q: What does a credibility factor Z = 1 mean? | Full weight on the policyholder's own experience.
SUM: Claims combine frequency and severity.
SUM: Credibility blends evidence.
SRC: Klugman SA, Panjer HH, Willmot GE, Loss Models: From Data to Decisions (5th edn, Wiley 2019) | textbook | 2019 | https://www.wiley.com/
SRC: Bühlmann H, Experience rating and credibility, ASTIN Bulletin 4(3), 199 | journal | 1967 | https://doi.org/10.1017/S0515036100008989
NUM1#maths-u21-35-q1@1: With Bühlmann credibility k = 10 and n = 5 years of data, what is Z, to 3 decimal places? | 0.333 | 0.001 |  | Z = n/(n + k) = 5/15 ≈ 0.333.
M1#maths-u21-35-q2@1: Claim count averages 2 per year and claim size averages £300. What are expected aggregate claims per year? | £600 | £300 | £150 | £1200 | £302 | Expected aggregate claims are E[N] × E[X] = 2 × £300 = £600 a year, by the compound distribution formula.
M2#maths-u21-35-q3@2: Why are Pareto distributions used for some insurance claim sizes? | They have heavy tails, matching rare but very large claims such as liability losses | They are bounded above, so claims can't exceed a limit | They have no variance, which simplifies premium setting | They model the number of claims rather than their size | They aren't used in insurance, only in economics | Large commercial and catastrophe claims follow power-law tails.
Q: What is a compound distribution of aggregate claims? | S = X₁ + … + X_{N}, with random claim count N and claim sizes Xᵢ.
Q: What is a credibility premium? | Z × own experience + (1 − Z) × collective mean, with Z between 0 and 1.
Q: What is the variance of a compound distribution? | Var(S) = E[N]Var(X) + Var(N)E[X]^{2}.
Q: Name two distributions used for claim counts. | Poisson and negative binomial.
Q: What is the expected value premium principle? | Premium = (1 + θ)E[S].
Q: What is the Bühlmann credibility factor? | Z = n/(n + k).
Q: How are no-claims discounts modelled? | As Markov chains.
Q: What method reserves for claims not yet reported? | The chain ladder.
Q: Claims are Poisson with mean 0.1, size mean £2000 and SD £1000. What is the SD of aggregate claims? | About £707, since Var(S) = 500,000.
Q: What is a common mistake when estimating aggregate claim variability? | Ignoring the variance of claim counts.

## Survival Models
S: Survival models describe the time until an event such as death, failure or relapse. They use survival and hazard functions, handle incomplete (censored) data, and are central to actuarial science, medicine and reliability engineering.
O: Relate survival, density and hazard functions
O: Estimate survival with the Kaplan–Meier method and describe the Cox model
T: Hazard function | h(t) = f(t)/S(t), the instantaneous event rate at time t among those who've survived to t
T: Censoring | Incomplete observation of survival times, such as a patient still alive when the study ends
H: Functions
- S(t) = P(T > t); F(t) = 1 − S(t).
- S(t) = exp(−∫₀ᵗ h(u) du).
- Exponential: constant hazard λ, S(t) = e^{−λt}.
- Gompertz: hazard rising exponentially with age (human mortality).
H: Estimation
- Kaplan–Meier: Ŝ(t) = Π (1 − dᵢ/nᵢ) over event times.
- Log-rank test compares groups.
- Nelson–Aalen estimates cumulative hazard.
H: Regression
- Cox proportional hazards: h(t | x) = h₀(t)e^{βᵀx}.
- Hazard ratios e^{β} compare groups.
- Check the proportional hazards assumption.
- Parametric models (Weibull) and competing risks.
X: 10 patients are at risk; 2 die at month 1; 1 is censored at month 2; 1 of the remaining 7 dies at month 3. Find the Kaplan–Meier S(3).
> Month 1: factor 1 − 2/10 = 0.8
> Month 3: 7 at risk, factor 1 − 1/7 ≈ 0.857
> S(3) = 0.8 × 0.857 ≈ 0.686
D: maths-u21-kaplan-meier
K: Survival analysis uses S(t), f(t) and h(t); censoring needs special methods; Kaplan–Meier estimates S(t); Cox models relate hazards to covariates through hazard ratios.
!: Treating censored observations as events or dropping them.
Q: What is the survival function of an exponential distribution? | e^{−λt}.
Q: What does a hazard ratio of 2 mean? | The event rate is twice as high in one group at any time.
SUM: Model time to event.
SUM: Handle censoring properly.
SRC: Kaplan EL, Meier P, Nonparametric estimation from incomplete observations, Journal of the American Statistical Association 53(282), 457 | journal | 1958 | https://doi.org/10.1080/01621459.1958.10501452
SRC: Cox DR, Regression models and life-tables, Journal of the Royal Statistical Society B 34(2), 187 | journal | 1972 | https://doi.org/10.1111/j.2517-6161.1972.tb00899.x
NUM1#maths-u21-36-q1@1: With constant hazard λ = 0.1 per year, what is the probability of surviving 5 years, to 3 decimal places? | 0.607 | 0.001 |  | S(5) = e^{−0.5} ≈ 0.607.
M1#maths-u21-36-q2@1: In a Cox model, a covariate has β = ln 2. What is its hazard ratio? | 2 | 0.69 | ln 2 | 0.5 | 1 | The hazard ratio is e^{β} = e^{ln 2} = 2.
M2#maths-u21-36-q3@2: Why must censored observations be included in survival estimation? | They show the subject survived at least until censoring, and excluding them biases survival downwards | They are deaths and must be counted as events | They contain no information about survival | They should be counted as events at the censoring time | They must be excluded to avoid bias | Kaplan–Meier keeps them in the risk set until they leave.
Q: What is a hazard function? | h(t) = f(t)/S(t), the instantaneous event rate at time t among those who have survived to t.
Q: What is censoring in survival analysis? | Incomplete observation of survival times, such as a patient still alive when the study ends.
Q: How is the survival function written in terms of the hazard? | S(t) = exp(−∫₀ᵗ h(u) du).
Q: What does the Gompertz model assume about the hazard? | That it rises exponentially with age, as in human mortality.
Q: What is the Kaplan–Meier estimator? | Ŝ(t) = Π (1 − dᵢ/nᵢ) over the event times.
Q: What does the log-rank test do? | It compares survival between groups.
Q: What does the Nelson–Aalen estimator estimate? | The cumulative hazard.
Q: What is the Cox proportional hazards model? | h₀(t)e^{βᵀx} for covariates x, relating hazards to covariates.
Q: In the Kaplan–Meier example, what is S(3) after factors 0.8 and 6/7? | About 0.686.
Q: What is a common mistake with censored observations? | Treating them as events or dropping them.

## Pension Mathematics
S: Pension mathematics values the promises made by pension schemes and sets the contributions needed to fund them. It combines interest, mortality, salary growth and inflation, and small changes in assumptions can move a scheme's deficit by billions.
O: Distinguish defined benefit and defined contribution schemes
O: Value pension liabilities and explain the effect of discount rates and longevity
T: Defined benefit scheme | A pension promising a benefit based on salary and service, with the sponsor bearing investment and longevity risk
T: Funding level | Assets divided by the present value of liabilities; below 100% means a deficit
H: Scheme types
- Defined benefit (DB): benefit = accrual rate × service × final or career-average salary.
- Defined contribution (DC): pot from contributions and returns; member bears the risk.
- Collective DC and hybrid designs.
H: Valuing liabilities
- Project benefits using salary growth and inflation.
- Discount using a rate based on gilt or corporate bond yields.
- Mortality tables with improvements.
- Funding methods: projected unit, attained age.
H: Sensitivities and governance
- A 0.1% fall in discount rate can raise liabilities by about 2% for long durations.
- Longevity improvements increase costs.
- Liability-driven investment hedges rate and inflation risk (2022 UK gilt crisis).
- Regulated by The Pensions Regulator in the UK.
X: A DB scheme pays 1/60 of final salary per year of service. A member retiring after 30 years on £45,000 receives what pension?
> Accrual = 30/60 = 0.5
> Pension = 0.5 × 45,000
> = £22,500 a year
D: maths-u21-pension-accrual
K: DB schemes promise salary-linked benefits with sponsor risk; DC schemes give members a pot; liabilities are PVs of projected benefits; discount rates and longevity strongly affect funding levels.
!: Ignoring how sensitive long-duration liabilities are to the discount rate.
Q: Who bears investment risk in a DC scheme? | The member.
Q: What is a funding level below 100%? | A deficit: assets are less than liabilities.
SUM: Pensions are long-term promises.
SUM: Assumptions drive valuations.
SRC: Dickson DCM, Hardy MR, Waters HR, Actuarial Mathematics for Life Contingent Risks (3rd edn, Cambridge University Press 2020) | textbook | 2020 | https://www.cambridge.org/
SRC: The Pensions Regulator, Defined benefit funding code of practice | guideline | 2024 | https://www.thepensionsregulator.gov.uk/
NUM1#maths-u21-37-q1@1: A scheme has assets of £900m and liabilities of £1,000m. What is its funding level in %? | 90 | 0 | % | 900/1000 = 90%, a £100m deficit.
M1#maths-u21-37-q2@1: Under a 1/80 accrual DB scheme, what pension does 40 years' service on £40,000 final salary give? | £20,000 a year | £32,000 a year | £16,000 a year | £10,000 a year | £40,000 a year | The pension is service × accrual rate × final salary: 40/80 × £40,000 = £20,000 a year.
M2#maths-u21-37-q3@2: Why did falling interest rates increase many DB scheme deficits? | Lower discount rates raise the present value of long-dated liabilities more than typical asset gains | Liabilities don't depend on interest rates, so assets must have fallen | Lower rates reduce promised benefits, which raises deficits | Assets always rise more than liabilities when rates fall | They decreased deficits, since lower rates cut liability values | With long durations, liability values are very sensitive to the discount rate.
Q: What is a defined benefit scheme? | A pension promising a benefit based on salary and service, with the sponsor bearing investment and longevity risk.
Q: What is a scheme's funding level? | Assets divided by the present value of liabilities.
Q: How is a DB pension calculated? | Accrual rate × service × final or career-average salary.
Q: What is a defined contribution scheme? | A pension pot built from contributions and returns, with the member bearing the risk.
Q: How are DB pension liabilities valued? | Project benefits with salary growth and inflation, then discount at a rate based on gilt or corporate bond yields.
Q: How much can a 0.1% fall in the discount rate raise long-duration pension liabilities? | By about 2%.
Q: What does liability-driven investment do? | It hedges interest rate and inflation risk in pension liabilities.
Q: A 1/60 scheme member retires after 30 years on £45,000. What is the pension? | £22,500 a year.
Q: Who regulates UK pension schemes? | The Pensions Regulator.
Q: What is a common mistake in valuing pension liabilities? | Ignoring how sensitive long-duration liabilities are to the discount rate.

## Mathematical Economics
S: Mathematical economics expresses economic theory precisely with optimisation, equilibrium and fixed-point theorems. It models consumers maximising utility, firms maximising profit, and markets reaching equilibrium, and it proved the existence of general equilibrium.
O: Solve consumer utility maximisation problems with budget constraints
O: Describe general equilibrium and the welfare theorems
T: Utility maximisation | Choosing a bundle x to maximise u(x) subject to the budget p·x ≤ m
T: Walrasian equilibrium | Prices at which every market clears: demand equals supply for every good
H: Consumers and firms
- Lagrange conditions: marginal rate of substitution = price ratio.
- Cobb–Douglas u = x^{a}y^{1−a}: spend share a of income on x.
- Firms: maximise profit, set marginal product × price = wage.
- Elasticities measure responsiveness.
H: General equilibrium
- Arrow and Debreu (1954) proved equilibrium exists using fixed-point theorems.
- First welfare theorem: competitive equilibria are Pareto efficient.
- Second: any efficient allocation can be reached with transfers.
- Edgeworth boxes illustrate exchange.
H: Tools
- Constrained optimisation and envelope theorems.
- Fixed-point theorems (Brouwer, Kakutani).
- Comparative statics: how equilibria shift with parameters.
- Dynamic optimisation for growth models.
X: A consumer has u = x^{0.5}y^{0.5}, income £100, and prices p_{x} = £2, p_{y} = £5. Find optimal demands.
> Cobb–Douglas: spend half of income on each good
> x = 50/2 = 25
> y = 50/5 = 10
D: maths-u21-consumer-optimum
K: Mathematical economics uses optimisation for consumers and firms and fixed-point theorems for equilibrium; Cobb–Douglas gives constant expenditure shares; the welfare theorems link equilibrium and efficiency.
!: Forgetting that welfare theorems need assumptions such as no externalities and complete markets.
Q: What does the first welfare theorem say? | Competitive equilibria are Pareto efficient.
Q: Who proved existence of general equilibrium in 1954? | Arrow and Debreu.
SUM: Economics as optimisation and equilibrium.
SUM: Fixed points prove existence.
SRC: Mas-Colell A, Whinston MD, Green JR, Microeconomic Theory (Oxford University Press 1995) | textbook | 1995 | https://global.oup.com/
SRC: Arrow KJ, Debreu G, Existence of an equilibrium for a competitive economy, Econometrica 22(3), 265 | journal | 1954 | https://doi.org/10.2307/1907353
NUM1#maths-u21-38-q1@1: With u = x^{0.3}y^{0.7}, income £200 and p_{x} = £3, how many units of x are demanded, to 1 decimal place? | 20 | 0.1 | units | Spend 30% of income on x: 0.3 × 200/3 = 20 units.
M1#maths-u21-38-q2@1: At an interior utility maximum, what equals the price ratio p_{x}/p_{y}? | The marginal rate of substitution | Total utility | Income | The quantity of x | The elasticity of demand | Tangency of the indifference curve and budget line sets MU_{x}/MU_{y} = p_{x}/p_{y}.
M2#maths-u21-38-q3@2: Which mathematical result did Arrow and Debreu use to prove equilibrium exists? | A fixed-point theorem (Kakutani's) | The central limit theorem | The fundamental theorem of calculus | Pythagoras' theorem | Fermat's last theorem | Equilibrium prices are fixed points of an excess-demand correspondence.
Q: What is utility maximisation? | Choosing a bundle x to maximise u(x) subject to the budget p·x ≤ m.
Q: What is a Walrasian equilibrium? | Prices at which every market clears, with demand equal to supply for every good.
Q: What does Cobb–Douglas utility u = x^{a}y^{1−a} imply about spending? | The consumer spends share a of income on x.
Q: What condition holds for a profit-maximising firm hiring labour? | Marginal product × price = wage.
Q: What does the second welfare theorem say? | Any efficient allocation can be reached as an equilibrium with transfers.
Q: What illustrates exchange between two consumers? | An Edgeworth box.
Q: Name two fixed-point theorems used in economics. | Brouwer's and Kakutani's.
Q: What are comparative statics? | Studying how equilibria shift when parameters change.
Q: With u = x^{0.5}y^{0.5}, income £100 and p_{x} = £2, how much x is demanded? | 25 units, since half the income, £50, is spent on x.
Q: What is a common mistake about the welfare theorems? | Forgetting they need assumptions such as no externalities and complete markets.

## Econometrics
S: Econometrics applies statistics to economic data to estimate relationships, test theories and forecast. Its central challenge is causality: economic data come from observation, not experiments, so methods must deal with confounding, endogeneity and dependence over time.
O: Estimate and interpret linear regression models
O: Explain endogeneity and instrumental variables
T: Ordinary least squares | OLS: choosing coefficients to minimise the sum of squared residuals, β̂ = (XᵀX)^{−1}Xᵀy
T: Instrumental variable | A variable correlated with an endogenous regressor but not with the error, used to estimate causal effects
H: Regression
- y = Xβ + ε; OLS is unbiased if E[ε | X] = 0.
- Interpret coefficients ceteris paribus; log models give elasticities.
- Standard errors, t-tests, R^{2}; robust errors for heteroscedasticity.
H: Endogeneity
- Omitted variables, reverse causality and measurement error bias OLS.
- Instrumental variables (two-stage least squares).
- Natural experiments, difference-in-differences, regression discontinuity.
- 2021 Nobel (Card, Angrist, Imbens) for causal methods.
H: Data types
- Cross-section, time series (see Financial Time Series) and panel data.
- Fixed and random effects.
- Spurious regression with trending series; cointegration.
X: A regression of log wages on years of education gives a coefficient 0.08. Interpret it, and give a reason it may be biased.
> Each extra year of education is associated with about 8% higher wages
> Ability affects both education and wages, so it's an omitted variable
> OLS may overstate the causal return; instruments such as compulsory schooling laws help
K: Econometrics estimates economic relationships by regression; OLS needs exogeneity; endogeneity biases estimates; IV, natural experiments and panel methods target causal effects.
!: Reading a regression coefficient as causal without addressing confounding.
Q: What is the OLS estimator? | (XᵀX)^{−1}Xᵀy.
Q: What two properties must an instrument have? | Relevance (correlated with the regressor) and exogeneity (uncorrelated with the error).
SUM: Statistics meets economic data.
SUM: Causality needs careful design.
SRC: Wooldridge JM, Introductory Econometrics: A Modern Approach (7th edn, Cengage 2020) | textbook | 2020 | https://www.cengage.com/
SRC: Angrist JD, Pischke JS, Mostly Harmless Econometrics (Princeton University Press 2009) | textbook | 2009 | https://press.princeton.edu/
NUM1#maths-u21-39-q1@1: A log–log regression of quantity on price gives a coefficient −1.5. By roughly what percentage does quantity fall when price rises 10%? | 15 | 0 | % | The coefficient is an elasticity: −1.5 × 10% = −15%.
M1#maths-u21-39-q2@1: Which problem arises when a regressor is correlated with the error term? | Endogeneity, which biases OLS estimates | Multicollinearity only | A perfect fit to the data | Heteroscedasticity only | No problem for OLS | Exogeneity E[ε ∣ X] = 0 fails, so OLS no longer estimates the causal effect.
M2#maths-u21-39-q3@2: Why might regressing crime on police numbers suggest police increase crime? | Reverse causality: areas with more crime hire more police | Police always increase crime wherever they are deployed | The data must be wrong if this result appears | OLS is always biased upwards for any public policy data | It wouldn't suggest this; the coefficient is always negative | Simultaneity makes police numbers endogenous, so instruments are needed.
Q: What is ordinary least squares? | Choosing coefficients to minimise the sum of squared residuals, giving β̂ = (XᵀX)^{−1}Xᵀy.
Q: What is an instrumental variable? | A variable correlated with an endogenous regressor but not with the error, used to estimate causal effects.
Q: When is OLS unbiased? | When the errors have zero mean given the regressors, E[ε given X] = 0.
Q: Name three causes of endogeneity. | Omitted variables, reverse causality and measurement error.
Q: Name three natural-experiment methods in econometrics. | Difference-in-differences, regression discontinuity and instrumental variables.
Q: Who won the 2021 Nobel for causal methods? | Card, Angrist and Imbens.
Q: What do robust standard errors deal with? | Heteroscedasticity.
Q: What problem arises when regressing one trending series on another? | Spurious regression; cointegration addresses it.
Q: A log wage regression on education gives 0.08. What does that mean? | Each extra year of education is associated with about 8% higher wages.
Q: What is a common mistake in reading regression coefficients? | Reading them as causal without addressing confounding.

## Microeconomic Modelling
S: Microeconomic models describe individual decisions and markets: supply and demand, consumer choice, firm behaviour and market structure. They predict prices and quantities, and show how taxes, regulation and competition change outcomes.
O: Find market equilibria from supply and demand and calculate surplus
O: Compare outcomes under competition and monopoly
T: Price elasticity of demand | ε = (∂Q/∂P)(P/Q), the percentage change in quantity per percentage change in price
T: Consumer surplus | The area between the demand curve and the price, measuring buyers' net benefit
H: Markets
- Equilibrium where supply equals demand.
- Taxes create a wedge and deadweight loss; incidence depends on elasticities.
- Price ceilings and floors cause shortages or surpluses.
H: Firms
- Perfect competition: price = marginal cost.
- Monopoly: marginal revenue = marginal cost, higher price, lower output.
- Oligopoly: Cournot and Bertrand models (see Game-Theoretic Economics).
- Cost curves: fixed, variable, marginal, average.
H: Uses
- Competition policy and merger analysis.
- Tax design and incidence.
- Regulation of utilities.
- Auction and market design.
X: Demand Q = 100 − 2P and supply Q = 3P. Find the equilibrium and consumer surplus.
> 100 − 2P = 3P gives P = 20 and Q = 60
> Demand hits zero at P = 50
> Consumer surplus = ½ × 60 × (50 − 20) = 900
D: maths-u21-supply-demand
K: Microeconomic models find equilibria from supply and demand; taxes cause deadweight loss; competition sets P = MC while monopoly sets MR = MC; surplus measures welfare.
!: Assuming the party legally paying a tax bears all of its burden.
Q: Where does a monopolist produce? | Where marginal revenue equals marginal cost.
Q: What determines tax incidence? | The relative elasticities of supply and demand.
SUM: Markets balance supply and demand.
SUM: Structure changes outcomes.
SRC: Varian HR, Intermediate Microeconomics with Calculus (2nd edn, W. W. Norton 2019) | textbook | 2019 | https://wwnorton.com/
SRC: Mas-Colell A, Whinston MD, Green JR, Microeconomic Theory (Oxford University Press 1995) | textbook | 1995 | https://global.oup.com/
NUM1#maths-u21-40-q1@1: With demand P = 100 − Q and marginal cost 20, what quantity does a monopolist produce? | 40 | 0 | units | Revenue PQ = 100Q − Q^{2} gives MR = 100 − 2Q; setting MR = 20 gives Q = 40.
M1#maths-u21-40-q2@1: Demand Q = 50 − P and supply Q = P − 10. What is the equilibrium price? | 30 | 20 | 40 | 10 | 25 | Setting demand equal to supply, 50 − P = P − 10 gives 2P = 60, so P = 30 and Q = 20.
M2#maths-u21-40-q3@2: Why does a monopoly create deadweight loss? | It restricts output below the level where price equals marginal cost, losing mutually beneficial trades | It produces too much output, beyond what consumers want to buy | It charges a price equal to marginal cost, below the efficient level | It increases consumer surplus at the expense of producer surplus | It doesn't: monopoly transfers surplus without any efficiency loss | Units valued above their cost go unproduced.
Q: What is the price elasticity of demand? | ε = (∂Q/∂P)(P/Q), the percentage change in quantity per percentage change in price.
Q: What is consumer surplus? | The area between the demand curve and the price, measuring buyers' net benefit.
Q: What do taxes create in a market? | A wedge between prices and a deadweight loss.
Q: What do price ceilings and floors cause? | Shortages and surpluses respectively.
Q: Where does a perfectly competitive firm set price? | At marginal cost.
Q: How does monopoly compare with competition in price and output? | Monopoly gives a higher price and lower output.
Q: With demand Q = 100 − 2P and supply Q = 3P, what is the equilibrium? | P = 20 and Q = 60.
Q: In the Q = 100 − 2P, Q = 3P market, what is consumer surplus? | 900, since ½ × 60 × (50 − 20) = 900.
Q: Name two uses of microeconomic models. | Competition policy and merger analysis, tax design, utility regulation, and auction design.
Q: What is a common mistake about who bears a tax? | Assuming the party legally paying it bears all of its burden.

## Macroeconomic Modelling
S: Macroeconomic models describe whole economies: output, inflation, unemployment and interest rates. From the IS–LM model to growth models and modern dynamic stochastic general equilibrium (DSGE) models, they guide central banks and governments.
O: Use the Solow growth model and the Taylor rule
O: Describe the structure and limits of DSGE models
T: Solow growth model | A model where output Y = K^{α}(AL)^{1−α} and capital accumulates by saving minus depreciation, reaching a steady state
T: Taylor rule | i = r* + π + 0.5(π − π*) + 0.5(output gap): a guide for setting interest rates
H: Growth
- Solow: k̇ = sf(k) − (n + δ)k per effective worker.
- Steady state where saving equals break-even investment.
- Long-run growth comes from technology A.
- Endogenous growth models explain A by ideas and R&D.
H: Short-run models
- IS–LM and aggregate demand–supply.
- Phillips curve trade-offs.
- New Keynesian DSGE: optimising households and firms with sticky prices.
- Central bank models (Bank of England's COMPASS).
H: Limits
- DSGE models missed the 2008 financial crisis's dynamics.
- Financial frictions and heterogeneous agents (HANK) added since.
- Forecast uncertainty is large (fan charts).
- Lucas critique: behaviour changes with policy.
X: Using the Taylor rule with r* = 2%, π = 4%, π* = 2% and output gap 1%, find the recommended policy rate.
> i = 2 + 4 + 0.5 × (4 − 2) + 0.5 × 1
> = 6 + 1 + 0.5
> = 7.5%
D: maths-u21-taylor-rule
K: Macroeconomic models describe output, inflation and rates; Solow explains growth via capital and technology; the Taylor rule guides policy; DSGE models are standard but have known limits.
!: Treating model forecasts as precise despite wide uncertainty.
Q: What drives long-run growth in the Solow model? | Technological progress.
Q: What does the Lucas critique say? | Relationships estimated under one policy may change when policy changes.
SUM: Models of whole economies.
SUM: Useful but uncertain.
SRC: Solow RM, A contribution to the theory of economic growth, Quarterly Journal of Economics 70(1), 65 | journal | 1956 | https://doi.org/10.2307/1884513
SRC: Taylor JB, Discretion versus policy rules in practice, Carnegie-Rochester Conference Series on Public Policy 39, 195 | journal | 1993 | https://doi.org/10.1016/0167-2231(93)90009-L
NUM1#maths-u21-41-q1@1: In a Solow model with f(k) = √k, saving rate s = 0.2 and n + δ = 0.05, what is the steady-state capital per worker k*? | 16 | 0 |  | s√k = (n + δ)k gives √k = s/(n + δ) = 4, so k* = 16.
M1#maths-u21-41-q2@1: According to the Taylor rule, how should rates respond when inflation rises above target? | Rise by more than the increase in inflation | Fall | Stay unchanged | Rise by exactly half the increase | Become zero | The coefficient on inflation is 1.5 in total (Taylor principle), raising real rates.
M3#maths-u21-41-q3@2: Why does the Lucas critique matter for policy models? | People's behaviour responds to policy, so relationships estimated under old policies may break under new ones | Policy never affects how people behave, so models are stable | Models always include expectations correctly, so it's irrelevant | It only applies to microeconomics, not to macroeconomic policy | It doesn't matter for policy, only for academic forecasting | Reduced-form correlations aren't structural; models need deep parameters.
Q: What is the Solow growth model? | A model with Y = K^{α}(AL)^{1−α} where capital accumulates by saving minus depreciation, reaching a steady state.
Q: What is the Taylor rule? | i = r* + π + 0.5(π − π*) + 0.5(output gap), a guide for setting interest rates.
Q: What is the Solow capital accumulation equation per effective worker? | k̇ = sf(k) − (n + δ)k.
Q: Where is the Solow steady state? | Where saving equals break-even investment.
Q: How do endogenous growth models explain technology? | Through ideas and R&D.
Q: What is a New Keynesian DSGE model? | A model of optimising households and firms with sticky prices.
Q: What is the Bank of England's central model called? | COMPASS.
Q: What have macro models added since 2008? | Financial frictions and heterogeneous agents, as in HANK models.
Q: With r* = 2%, π = 4%, π* = 2% and output gap 1%, what rate does the Taylor rule give? | 7.5%.
Q: What is a common mistake with macroeconomic forecasts? | Treating them as precise despite wide uncertainty.

## Game-Theoretic Economics
S: Game theory models strategic interaction, where each player's best choice depends on what others do. In economics it explains oligopoly pricing, auctions, bargaining and contracts, and Nash equilibrium is its central solution concept.
O: Find Nash equilibria in matrix games and Cournot competition
O: Apply game theory to auctions and repeated interactions
T: Nash equilibrium | A strategy profile where no player can gain by changing strategy alone
T: Cournot competition | Firms choose quantities simultaneously; each best-responds to the others' output
H: Basic games
- Prisoner's dilemma: defecting dominates, though both cooperating is better.
- Coordination games with multiple equilibria.
- Mixed strategies: Nash (1950) proved an equilibrium always exists in finite games.
H: Oligopoly and auctions
- Cournot: duopoly output between monopoly and competition.
- Bertrand: price competition drives price to marginal cost.
- Auctions: second-price sealed bids make truthful bidding dominant (Vickrey).
- Revenue equivalence under standard assumptions.
H: Dynamics and information
- Repeated games sustain cooperation (folk theorem).
- Subgame perfection and backward induction.
- Signalling and screening with asymmetric information.
- Mechanism design (2007 Nobel) and market design (2012, 2020 Nobels).
X: Two firms face P = 120 − Q with zero costs. Find the Cournot equilibrium.
> Firm 1 maximises q₁(120 − q₁ − q₂): best response q₁ = (120 − q₂)/2
> By symmetry q₁ = q₂ = q: q = (120 − q)/2 gives q = 40
> Total output 80, price 40 (monopoly would give Q = 60, P = 60)
D: maths-u21-cournot-reaction
K: Nash equilibrium is the core concept; the prisoner's dilemma shows individual and collective interests can clash; Cournot and Bertrand model oligopoly; auctions and repeated games apply it widely.
!: Assuming a Nash equilibrium is the best outcome for the players jointly.
Q: In a second-price sealed-bid auction, what should you bid? | Your true value.
Q: What does Bertrand competition with identical firms predict? | Price equals marginal cost.
SUM: Strategy depends on others' choices.
SUM: Nash equilibrium predicts outcomes.
SRC: Nash JF, Equilibrium points in n-person games, Proceedings of the National Academy of Sciences 36(1), 48 | journal | 1950 | https://doi.org/10.1073/pnas.36.1.48
SRC: Osborne MJ, An Introduction to Game Theory (Oxford University Press 2004) | textbook | 2004 | https://global.oup.com/
NUM1#maths-u21-42-q1@1: Three identical firms with zero costs face P = 120 − Q in Cournot competition. What is each firm's output? | 30 | 0 | units | With n firms, each produces (a − c)/(n + 1) = 120/4 = 30.
M1#maths-u21-42-q2@1: In the prisoner's dilemma, what is the Nash equilibrium? | Both players defect | Both cooperate | One cooperates and one defects | There is no equilibrium | Players alternate | Defecting is a dominant strategy for each player.
M2#maths-u21-42-q3@2: Why is bidding your true value optimal in a second-price auction? | The price you pay is set by the next-highest bid, so shading your bid can only lose auctions you'd want to win | You pay your own bid, so bidding your value avoids overpaying | Overbidding is always safe because you never pay your bid | Bids don't affect whether you win, only what you pay | It isn't optimal; shading below value always earns more | Truthful bidding is weakly dominant (Vickrey 1961).
Q: What is a Nash equilibrium? | A strategy profile where no player can gain by changing strategy alone.
Q: What is Cournot competition? | Firms choose quantities simultaneously, each best-responding to the others' output.
Q: What does the prisoner's dilemma show? | Defecting dominates, though both cooperating would be better.
Q: What did Nash prove in 1950? | That every finite game has an equilibrium in mixed strategies.
Q: How does Cournot duopoly output compare with monopoly and competition? | It lies between monopoly and competitive output.
Q: What does the folk theorem say about repeated games? | Repetition can sustain cooperation.
Q: What is revenue equivalence? | Under standard assumptions, standard auction formats give the same expected revenue.
Q: Two firms face P = 120 − Q with zero costs. What is the Cournot outcome? | Each produces 40, so total output 80 and price 40.
Q: What tools handle asymmetric information in games? | Signalling and screening.
Q: What is a common mistake about Nash equilibria? | Assuming a Nash equilibrium is the best outcome for the players jointly.

## Cost-Benefit Analysis
S: Cost–benefit analysis compares the total social costs and benefits of a policy or project, expressed in money and discounted over time. Governments use it to appraise roads, health programmes and climate policy, though valuing non-market effects and choosing discount rates are contentious.
O: Calculate net present social value and benefit–cost ratios
O: Discuss valuing non-market effects and the social discount rate
T: Benefit–cost ratio | BCR, the present value of benefits divided by the present value of costs
T: Social discount rate | The rate used to discount future costs and benefits to society, such as 3.5% in the UK Green Book
H: Method
- Identify all affected groups and effects.
- Monetise costs and benefits, including time savings and health.
- Discount at the social rate; compute NPSV and BCR.
- Sensitivity and distributional analysis.
H: Valuing non-market effects
- Value of a statistical life (VSL) from willingness to pay for small risk reductions.
- QALYs in health (NICE thresholds £20,000–£30,000 per QALY).
- Contingent valuation and revealed preference (hedonic pricing, travel cost).
- Carbon values for emissions.
H: Controversies
- Discount rate choice dominates long-term issues (Stern versus Nordhaus on climate).
- Declining discount rates for long horizons.
- Distributional weights for equity.
- Unquantifiable effects need qualitative treatment.
X: A scheme costs £10m now and yields £1.2m of benefits a year for 15 years. At 3.5%, find the BCR.
> PV of benefits = 1.2 × (1 − 1.035^{−15})/0.035
> 1.035^{−15} ≈ 0.5969, so the annuity factor ≈ 11.517 and PV ≈ £13.82m
> BCR = 13.82/10 ≈ 1.38
D: maths-u21-bcr-pv-benefits
K: CBA monetises and discounts social costs and benefits; NPSV and BCR summarise results; non-market values use VSL, QALYs and revealed preference; discount rates and equity weights are contested.
!: Ignoring who bears costs and who receives benefits.
Q: What is the UK Green Book's standard social discount rate? | 3.5%.
Q: What does a BCR above 1 mean? | Benefits exceed costs in present value.
SUM: Compare social costs and benefits.
SUM: Discounting and valuation are contentious.
SRC: HM Treasury, The Green Book: Central Government Guidance on Appraisal and Evaluation | guideline | 2022 | https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government
SRC: Boardman AE, Greenberg DH, Vining AR, Weimer DL, Cost-Benefit Analysis: Concepts and Practice (5th edn, Cambridge University Press 2018) | textbook | 2018 | https://www.cambridge.org/
NUM1#maths-u21-43-q1@1: A project's benefits have PV £15m and costs have PV £12m. What is its benefit–cost ratio? | 1.25 | 0.001 |  | BCR = 15/12 = 1.25.
M1#maths-u21-43-q2@1: A health intervention costs £50,000 and gains 2 QALYs. What is its cost per QALY? | £25,000 | £100,000 | £50,000 | £12,500 | £2,000 | 50,000/2 = £25,000, within NICE's usual range.
M3#maths-u21-43-q3@2: Why did the Stern and Nordhaus climate analyses reach very different conclusions? | They used very different discount rates, which hugely change the present value of damages a century away | They used different climate data only, but the same economics | One of them ignored the costs of cutting emissions entirely | They agreed closely, since both used the Green Book rate | Discounting doesn't matter for climate, so it was the damages | At 1.4% versus about 4.5%, a £1 damage in 100 years is worth roughly 25p versus 1p today.
Q: What is cost–benefit analysis? | Comparing a project's total social costs and benefits in money, discounted over time.
Q: What is a benefit–cost ratio? | The present value of benefits divided by the present value of costs.
Q: What is a social discount rate? | The rate used to discount future costs and benefits to society.
Q: How is the value of a statistical life estimated? | From willingness to pay for small risk reductions.
Q: What are NICE's cost per QALY thresholds? | £20,000 to £30,000 per QALY.
Q: Name two revealed preference valuation methods. | Hedonic pricing and the travel cost method.
Q: What adjustment is suggested for long time horizons in CBA? | Declining discount rates.
Q: A £10m scheme yields £1.2m a year for 15 years at 3.5%. What is its BCR? | About 1.38.
Q: How should effects that can't be quantified be handled in CBA? | With qualitative treatment.
Q: What is a common mistake in cost–benefit analysis? | Ignoring who bears costs and who receives benefits.

## Forecasting
S: Economic and business forecasting predicts future values such as sales, inflation or demand. Methods range from simple averages and exponential smoothing to regression and judgement, and good forecasts come with honest uncertainty and are evaluated against what actually happens.
O: Apply simple forecasting methods and measure forecast accuracy
O: Describe forecast evaluation, combination and communication of uncertainty
T: Mean absolute percentage error | MAPE = (100/n) Σ |actual − forecast|/|actual|
T: Forecast combination | Averaging forecasts from several methods, which often beats any single method
H: Methods
- Naive forecast: next value = last value (a key benchmark).
- Moving averages and exponential smoothing: ŷ_{t+1} = αy_{t} + (1 − α)ŷ_{t}.
- Regression on leading indicators.
- Expert judgement and surveys (with known biases).
H: Evaluation
- Out-of-sample testing.
- Errors: MAE, RMSE, MAPE.
- Compare with naive benchmarks.
- M-competitions (Makridakis): simple and combined methods often do well.
H: Uncertainty
- Prediction intervals and fan charts (Bank of England).
- Scenario analysis for structural breaks.
- Forecasts shouldn't be judged by one outcome.
- Time-series methods in School 22.
X: Using exponential smoothing with α = 0.3, the last forecast was 100 and the actual value was 110. Find the next forecast.
> ŷ_{t+1} = αy_{t} + (1 − α)ŷ_{t}
> = 0.3 × 110 + 0.7 × 100
> = 103
D: maths-u21-smoothing-forecast
K: Forecasting uses naive, smoothing, regression and judgemental methods; accuracy is judged out of sample against benchmarks; combinations often help; uncertainty must be communicated.
!: Judging a method by its fit to past data rather than out-of-sample accuracy.
Q: What is the naive forecast? | The next value equals the last observed value.
Q: What do fan charts show? | The range of likely outcomes around a central forecast.
SUM: Forecasts need benchmarks.
SUM: Uncertainty must be shown.
SRC: Hyndman RJ, Athanasopoulos G, Forecasting: Principles and Practice (3rd edn, OTexts 2021) | textbook | 2021 | https://otexts.com/fpp3/
SRC: Makridakis S, Spiliotis E, Assimakopoulos V, The M4 Competition: 100,000 time series and 61 forecasting methods, International Journal of Forecasting 36(1), 54 | journal | 2020 | https://doi.org/10.1016/j.ijforecast.2019.04.014
NUM1#maths-u21-44-q1@1: Actual sales were 200 and 250; forecasts were 180 and 260. What is the MAPE in %? | 7 | 0 | % | Errors are 10% and 4%, so MAPE = (10 + 4)/2 = 7%.
M1#maths-u21-44-q2@1: Why is the naive forecast an important benchmark? | A method that can't beat it isn't adding value | It is always the most accurate | It uses the most data | It has no errors | It isn't important | Many sophisticated methods fail to beat "no change" on real data.
M2#maths-u21-44-q3@2: Why do combined forecasts often outperform individual methods? | Different methods' errors partly cancel when averaged | Combinations use more parameters | Individual methods are always biased | They don't outperform | Averaging removes all uncertainty | Diversifying across models reduces the variance of forecast errors.
Q: What is MAPE? | Mean absolute percentage error, (100/n) Σ |actual − forecast|/|actual|.
Q: What is forecast combination? | Averaging forecasts from several methods, which often beats any single method.
Q: What is the exponential smoothing formula? | ŷ_{t+1} = αy_{t} + (1 − α)ŷ_{t}.
Q: Name three forecast error measures. | MAE, RMSE and MAPE.
Q: What did the Makridakis M-competitions find? | Simple and combined methods often do well.
Q: What is out-of-sample testing? | Evaluating forecasts on data not used to build them.
Q: How should structural breaks be handled in forecasting? | With scenario analysis.
Q: With α = 0.3, last forecast 100 and actual 110, what is the next smoothed forecast? | 103.
Q: Why shouldn't a forecast be judged by one outcome? | Forecasts are uncertain, so accuracy must be judged over many outcomes.
Q: What is a common mistake when choosing a forecasting method? | Judging it by its fit to past data rather than out-of-sample accuracy.

## Financial Time Series
S: Financial time series, such as daily returns of shares or currencies, have distinctive features: little autocorrelation in returns, fat tails and volatility that clusters in calm and turbulent periods. Models like ARCH and GARCH capture these stylised facts for risk and pricing.
O: Describe the stylised facts of asset returns
O: Use ARCH/GARCH models to describe changing volatility
T: Volatility clustering | Large price changes tend to be followed by large changes, and small by small
T: GARCH(1,1) | σₜ^{2} = ω + αεₜ₋₁^{2} + βσₜ₋₁^{2}, a model of time-varying conditional variance
H: Stylised facts
- Returns: near-zero autocorrelation (weak-form efficiency).
- Squared or absolute returns: strong, slowly decaying autocorrelation.
- Fat tails (high kurtosis); negative skew for equities.
- Leverage effect: falls raise volatility more than rises.
H: Models
- ARCH (Engle 1982, Nobel 2003); GARCH (Bollerslev 1986).
- Persistence α + β close to 1; long-run variance ω/(1 − α − β).
- EGARCH and GJR for asymmetry.
- Stochastic volatility and realised volatility from intraday data.
H: Uses
- Risk management (VaR, ES).
- Option pricing with changing volatility.
- Volatility forecasting and trading (VIX).
- Testing market efficiency.
X: A GARCH(1,1) has ω = 0.00001, α = 0.1 and β = 0.85. Find the long-run daily volatility.
> Long-run variance = ω/(1 − α − β) = 0.00001/0.05 = 0.0002
> Volatility = √0.0002 ≈ 0.0141
> About 1.41% a day (around 22% a year with √252)
K: Returns are nearly uncorrelated but have fat tails and volatility clustering; ARCH/GARCH model conditional variance; persistence and long-run variance follow from the parameters; they underpin risk and pricing.
!: Modelling returns as independent normal draws with constant volatility.
Q: What does volatility clustering mean? | Large moves tend to follow large moves.
Q: Who introduced ARCH models? | Robert Engle (1982).
SUM: Returns have stylised facts.
SUM: GARCH models changing volatility.
SRC: Engle RF, Autoregressive conditional heteroscedasticity with estimates of the variance of United Kingdom inflation, Econometrica 50(4), 987 | journal | 1982 | https://doi.org/10.2307/1912773
SRC: Cont R, Empirical properties of asset returns: stylized facts and statistical issues, Quantitative Finance 1(2), 223 | journal | 2001 | https://doi.org/10.1080/713665670
NUM1#maths-u21-45-q1@1: A GARCH(1,1) has α = 0.08 and β = 0.9. What is its persistence α + β? | 0.98 | 0.001 |  | 0.08 + 0.9 = 0.98: shocks to volatility decay slowly.
M1#maths-u21-45-q2@1: Which feature is a stylised fact of daily equity returns? | Fat tails relative to the normal distribution | Strong positive autocorrelation of returns | Constant volatility over time | Exactly normal distributions | Positive skew always | Extreme returns occur far more often than a normal model predicts.
M2#maths-u21-45-q3@2: Why do squared returns show autocorrelation even when returns themselves don't? | Volatility clusters, so the size of moves is predictable even though their direction isn't | Returns are perfectly predictable in both size and direction | Squaring creates fake patterns from purely random data | Markets are inefficient in direction, so signs are predictable | They don't show it; squared returns are independent too | Periods of high variance persist, which shows up in squared returns.
Q: What is GARCH(1,1)? | σₜ^{2} = ω + αεₜ₋₁^{2} + βσₜ₋₁^{2}, a model of time-varying conditional variance.
Q: What is the long-run variance of a GARCH(1,1)? | ω/(1 − α − β).
Q: What is the leverage effect? | Price falls raise volatility more than price rises.
Q: What shape do equity return distributions have? | Fat tails with high kurtosis, and negative skew.
Q: Who introduced GARCH, and when? | Bollerslev, in 1986.
Q: Which models capture asymmetric volatility? | EGARCH and GJR.
Q: What is realised volatility? | Volatility measured from intraday data.
Q: A GARCH has ω = 0.00001, α = 0.1 and β = 0.85. What is the long-run daily volatility? | About 1.41% a day.
Q: What does near-zero return autocorrelation suggest? | Weak-form market efficiency.
Q: What is a common mistake in modelling financial returns? | Treating them as independent normal draws with constant volatility.
`;
