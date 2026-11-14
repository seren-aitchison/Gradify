// InvestorGradify Valuation (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Price and value
LV: Intermediate · Foundation
S: The price of a share is what you pay; its value is what the business is worth to an owner. This lesson explains intrinsic value, the three broad approaches to valuation and Benjamin Graham's idea of a margin of safety.
O: Distinguish market price from intrinsic value
O: Describe the main approaches to valuing an investment
O: Explain and apply the margin of safety
H: What price and value mean
P: The **market price** of a share is simply the last price at which buyers and sellers agreed to trade. The **intrinsic value** is an estimate of what the share is worth, based on the cash the business is expected to produce for its owners over its life. Price is a fact you can look up; value is an opinion that depends on forecasts and on the **required return**. Benjamin Graham described the market in the short run as a voting machine and in the long run as a weighing machine: prices can drift far from value for a time, but over long periods they tend to reflect the cash a business actually generates. Valuation is the discipline of estimating value so that you can judge whether a price looks cheap, fair or expensive.
H: Three approaches to valuation
- **Intrinsic (absolute) valuation**: estimate future cash flows and discount them to today, as in a discounted cash flow or dividend discount model.
- **Relative valuation**: compare a share with similar shares using multiples such as the price-to-earnings ratio, price-to-book or EV/EBITDA.
- **Asset-based valuation**: estimate what the assets would fetch, less the liabilities, which suits property companies, investment trusts and firms facing break-up.
- Professional analysts often use more than one approach and look for a range rather than a single number.
- Every approach rests on assumptions; the output is only as good as the inputs.
H: The margin of safety
- Graham's **margin of safety** is the gap between your estimate of value and the price you pay.
- Buying well below estimated value protects you if your forecasts turn out too optimistic.
- It is often expressed as a percentage of estimated value: (value − price) ÷ value.
- A wider margin is sensible where the business is less predictable or your knowledge is thinner.
- A margin of safety does not remove risk; it reduces the damage from errors you cannot foresee.
X: Applying a margin of safety (illustrative figures).
> An investor estimates that a share is worth 500p.
> She wants a 30% margin of safety before buying.
> Maximum price = 500p × (1 − 0.30) = 350p.
> At today's price of 420p the margin is only 16%, so she waits rather than buys.
K: Price is what the market charges and value is an estimate of what the cash flows are worth; intrinsic, relative and asset-based methods each estimate value, and a margin of safety protects against forecasting error.
!: Assuming a share that has fallen a long way must now be cheap. A lower price says nothing about value on its own; the business may have become worth less.
EV: established | Graham and Dodd's Security Analysis (1934) set out the distinction between price and intrinsic value that underpins modern fundamental analysis.
EV: contested | How far, and for how long, market prices deviate from intrinsic value is disputed between supporters of efficient markets and behavioural finance.
T: Intrinsic value | An estimate of what an investment is worth, based on the cash it is expected to generate
T: Margin of safety | The gap between estimated value and the price paid, as a cushion against error
T: Relative valuation | Valuing an asset by comparing its price multiples with those of similar assets
SUM: Price is a fact; value is an estimate.
SUM: Intrinsic, relative and asset-based methods all estimate value.
SUM: A margin of safety cushions forecasting error.
SRC: Graham B. and Dodd D., Security Analysis, McGraw-Hill | primary | 1934
SRC: Graham B., The Intelligent Investor, revised 4th edition, Harper and Row | primary | 1973
SRC: Damodaran A., Investment Valuation, 3rd edition, Wiley | secondary | 2012
Q: What is a margin of safety? | The gap between estimated intrinsic value and the price paid, protecting against forecasting error.
Q: Name the three broad approaches to valuation. | Intrinsic (discounted cash flow), relative (multiples) and asset-based.
M1#investing-u06-01-q1@1: Which statement best describes intrinsic value? | An estimate of worth based on the cash the business should generate | The price at which the share last traded on the exchange | The nominal value printed on the share certificate | The average share price over the past twelve months | Intrinsic value is an opinion built from forecasts of future cash flows, not an observed price.
M2#investing-u06-01-q2@2: An analyst values a company by comparing its price-to-earnings ratio with five similar listed firms. Which approach is this? | Relative valuation | Intrinsic valuation using discounted cash flows | Asset-based valuation using break-up values | Technical analysis using past price charts | Comparing multiples with peers is relative valuation; it tells you whether a share is cheap compared with others, not in absolute terms.
NUM2#investing-u06-01-q3@3: You estimate a share is worth 400p and it trades at 320p. What is your margin of safety as a percentage of estimated value? | 20 | 0.01 | % | Margin of safety = (400 − 320) ÷ 400 = 80 ÷ 400 = 0.20, which is 20% of estimated value.
M3#investing-u06-01-q4@3: Which investor most needs a wide margin of safety? | One valuing a young loss-making firm with uncertain future revenues | One valuing a utility with regulated and very stable cash flows | One buying a short-dated gilt to hold until it matures | One valuing a cash deposit with a fixed and known interest rate | The less predictable the cash flows, the larger the possible forecasting error and so the bigger the cushion needed.
SA3#investing-u06-01-q5@1,3: Explain why a share's price and its intrinsic value can differ, and how a margin of safety helps an investor. | Price is set by supply and demand in the market, which reflect mood, news and short-term flows, while intrinsic value is an estimate of the cash a business will generate for its owners. Prices can therefore overshoot or undershoot value for long periods. Because any estimate of value is uncertain, buying only when the price is well below the estimate gives a margin of safety. If forecasts prove too optimistic, the investor is less likely to lose money. | Price set by trading and sentiment ; Value is an estimate of future cash ; Gaps can persist ; Margin of safety cushions forecast error

## Discounted cash flow valuation
LV: Intermediate · Application
S: A discounted cash flow (DCF) valuation estimates what a business is worth by forecasting its future free cash flows and discounting them to today. This lesson shows the steps, the role of the terminal value and why DCF outputs are so sensitive to assumptions.
O: Describe the steps of a DCF valuation
O: Calculate the present value of a short series of cash flows
O: Evaluate the influence of the terminal value and discount rate
H: The idea
E: Value = CF_{1} ÷ (1 + r) + CF_{2} ÷ (1 + r)^{2} + ... + CF_{n} ÷ (1 + r)^{n} + TV_{n} ÷ (1 + r)^{n} :: CF are forecast free cash flows, r is the discount rate and TV is the terminal value at year n
P: John Burr Williams argued in 1938 that the value of any asset is the **present value** of the cash it will pay out. A **DCF** applies this to a whole business. The analyst forecasts **free cash flow** (cash from operations after the investment needed to keep the business going and growing) for an explicit period, often five to ten years, then estimates a **terminal value** for all the years after that. Each cash flow is divided by (1 + r) raised to the number of years until it arrives. When the cash flows belong to all providers of capital, the discount rate is the **weighted average cost of capital (WACC)** and the result is enterprise value; subtracting net debt gives the value of the shares.
H: Steps in a DCF
- Forecast revenue, margins, tax and investment to arrive at free cash flow for each year.
- Choose a discount rate that reflects the risk of those cash flows.
- Estimate a terminal value, usually with a perpetual growth formula or an exit multiple.
- Discount every cash flow and the terminal value to today and add them up.
- Subtract net debt and divide by the number of shares to get a value per share.
H: Why DCF results need care
- The **terminal value** often makes up more than half of the total, so long-run growth assumptions dominate.
- A small change in the discount rate can move the answer by a large amount.
- Forecasts more than a few years ahead are highly uncertain.
- Good practice is to show a **sensitivity table** of values for a range of growth and discount rates.
- A DCF is a disciplined way of making your assumptions explicit, not a machine that produces the right price.
X: A three-year DCF (illustrative figures, discount rate 8%).
> Free cash flows: £10m in year 1, £11m in year 2 and £12m in year 3.
> Present values: 10 ÷ 1.08 = £9.26m; 11 ÷ 1.1664 = £9.43m; 12 ÷ 1.2597 = £9.53m.
> The total present value of the three years is about £28.2m.
> If a terminal value of £150m at year 3 is added, its present value of about £119m dwarfs the forecast years.
K: A DCF values a business as the present value of its forecast free cash flows plus a terminal value, so the result depends heavily on the discount rate and long-run growth assumptions.
!: Presenting a DCF value to the penny as if it were precise. Show a range, because modest changes in inputs produce large changes in value.
EV: established | The principle that an asset's value equals the present value of its expected cash flows is standard in corporate finance textbooks.
T: Free cash flow | Cash generated by operations after the investment needed to sustain and grow the business
T: Terminal value | The estimated value of all cash flows beyond the explicit forecast period
T: WACC | The weighted average cost of capital, the blended required return of shareholders and lenders
SUM: Forecast cash flows, discount them, add a terminal value.
SUM: The terminal value often dominates the total.
SUM: Show a sensitivity range, not a single number.
SRC: Williams J. B., The Theory of Investment Value, Harvard University Press | primary | 1938
SRC: Koller T., Goedhart M. and Wessels D., Valuation: Measuring and Managing the Value of Companies, 7th edition, Wiley | secondary | 2020
SRC: Brealey R. A., Myers S. C. and Allen F., Principles of Corporate Finance, 14th edition, McGraw-Hill | secondary | 2023
Q: What is a terminal value in a DCF? | An estimate of the value of all cash flows beyond the explicit forecast period.
Q: Which discount rate is used when valuing cash flows to all providers of capital? | The weighted average cost of capital (WACC).
M1#investing-u06-02-q1@1: In a DCF valuation, what is discounted to today? | Forecast free cash flows and a terminal value | Last year's reported revenue and profit | The current share price and dividend yield | The book value of assets on the balance sheet | A DCF discounts expected future cash flows, including a terminal value, back to their present value.
NUM2#investing-u06-02-q2@2: A business is expected to generate £100 of free cash flow at the end of year 1 and £100 at the end of year 2. At a 10% discount rate, what is their total present value in pounds? | 173.55 | 0.05 | £ | 100 ÷ 1.1 = 90.91 and 100 ÷ 1.21 = 82.64, so the total present value is about 173.55 pounds.
M2#investing-u06-02-q3@2: In a DCF, the analyst raises the discount rate from 8% to 10% and leaves the cash flows unchanged. What happens to the valuation? | It falls, because each future cash flow is worth less today | It rises, because a higher rate means faster growth in value | It is unchanged, because only the cash flows matter | It doubles, because the rate has risen by a quarter | Present values fall as the discount rate rises, and the effect is largest for distant cash flows.
M3#investing-u06-02-q4@3: A DCF shows the terminal value is 75% of the total value. What is the best conclusion? | The valuation rests mainly on long-run assumptions, so test them hard | The forecast years are irrelevant and can safely be ignored | The company must be in decline and is worth very little | The model is wrong, because terminal values must stay below 25% | A high terminal-value share is common but means long-run growth and discount rate assumptions drive the answer.
SA3#investing-u06-02-q5@1,3: Evaluate the usefulness of DCF valuation for a private investor. | A DCF is grounded in the sound principle that value comes from future cash, and it forces the investor to state assumptions about growth, margins, investment and risk. However, forecasts are uncertain, the terminal value often dominates, and small changes in the discount rate or long-run growth rate change the answer greatly. It is most useful for stable businesses and as a sensitivity tool, showing what the price implies, rather than as a precise target price. | Sound principle of present value ; Makes assumptions explicit ; Sensitivity and terminal value problems ; Best used as a range or reverse-engineering tool

## The dividend discount model
LV: Intermediate · Application
S: The dividend discount model values a share as the present value of the dividends it is expected to pay. This lesson explains the model, values a share with a known dividend and sale price, and shows its limits for companies that pay little or nothing.
O: State the dividend discount model
O: Value a share from forecast dividends and a sale price
O: Evaluate when the model is and is not suitable
H: Dividends as the cash shareholders receive
E: P_{0} = D_{1} ÷ (1 + r) + D_{2} ÷ (1 + r)^{2} + D_{3} ÷ (1 + r)^{3} + ... :: D are expected dividends per share and r is the shareholders' required return
P: For a shareholder who never sells, the only cash received from a company is its **dividends**. The **dividend discount model (DDM)** therefore values a share as the present value of all expected future dividends, discounted at the **required return on equity**. An investor who plans to sell after a few years receives dividends plus a sale price, but that sale price itself depends on the dividends expected after the sale, so the two views give the same answer. The simplest case is a constant dividend paid for ever, a **perpetuity**, where value is just the dividend divided by the required return. This suits some **preference shares**, which pay a fixed dividend.
H: Using the model
- Forecast dividends per share for each future year.
- Choose a required return that reflects the share's risk.
- Discount each dividend, and any expected sale price, to today and add them up.
- For a constant perpetual dividend, value = D ÷ r.
- For dividends growing at a steady rate, the Gordon growth model gives a short-cut (see the next lesson).
H: Strengths and limits
- It fits mature, steady dividend payers such as utilities and large banks.
- It struggles with companies that pay no dividend, or that return cash mainly through **share buybacks**.
- Dividend policy is set by directors, so dividends can be smoothed or cut regardless of underlying earnings.
- A variant, the total payout model, counts buybacks as well as dividends.
- Like all DCF methods, the result is very sensitive to the required return.
X: Two years of dividends then a sale (illustrative figures, required return 8%).
> Expected dividends: 10p in year 1 and 11p in year 2; expected sale price 200p at the end of year 2.
> Year 1: 10 ÷ 1.08 = 9.26p.
> Year 2: (11 + 200) ÷ 1.1664 = 180.90p.
> Value today is about 190p, so a market price of 230p would look expensive on these assumptions.
K: The dividend discount model values a share as the present value of expected dividends; it suits steady payers but not firms that pay little or return cash through buybacks.
!: Concluding that a company paying no dividend is worthless under the DDM. Its value comes from dividends it may pay in future, or from other payouts, which the model must forecast.
EV: established | The dividend discount model follows directly from present value principles set out by Williams (1938).
T: Dividend discount model | A model valuing a share as the present value of its expected future dividends
T: Perpetuity | A cash flow of a constant amount paid for ever
T: Required return | The minimum return investors demand for holding an asset, given its risk
SUM: Value equals the present value of expected dividends.
SUM: A constant perpetual dividend is worth D ÷ r.
SUM: The model struggles with non-payers and buybacks.
SRC: Williams J. B., The Theory of Investment Value, Harvard University Press | primary | 1938
SRC: Bodie Z., Kane A. and Marcus A. J., Investments, 12th edition, McGraw-Hill | secondary | 2021
Q: What does the dividend discount model say a share is worth? | The present value of all its expected future dividends.
Q: What is the value of a constant dividend paid for ever? | The dividend divided by the required return.
M1#investing-u06-03-q1@1: Under the dividend discount model, what determines a share's value? | Its expected future dividends and the required return | Its past share price trend and trading volume | Its book value and the size of its workforce | Its last reported revenue and market share | The DDM discounts expected dividends at the required return; nothing else enters the formula directly.
NUM2#investing-u06-03-q2@2: A preference share pays a fixed dividend of 6p a year for ever. If investors require a 5% return, what is it worth in pence? | 120 | 0.01 | p | Value of a perpetuity = dividend ÷ required return = 6 ÷ 0.05 = 120p.
M2#investing-u06-03-q3@2: Why does an investor who plans to sell after three years reach the same DDM value as one who holds for ever? | The future sale price itself reflects the dividends expected after the sale | Capital gains are always ignored in valuation models | Sale prices are fixed in advance by the company's directors | Dividends after three years are always paid as zero | The buyer pays for the remaining dividends, so the sale price is the present value of the later dividends.
M3#investing-u06-03-q4@3: For which company is the dividend discount model least suitable? | A fast-growing technology firm that pays no dividend | A water utility with a long record of steady dividends | A large bank with a stable and predictable payout ratio | A preference share with a fixed dividend paid every year | With no current dividends, the model needs speculative forecasts of when and how much the firm will pay.
SA3#investing-u06-03-q5@1,3: Explain the dividend discount model and assess its strengths and weaknesses. | The DDM values a share as the present value of all expected future dividends, discounted at the required return, because dividends are the cash shareholders receive. It is logical and works well for mature, steady payers and fixed-dividend preference shares. However, it struggles with firms that pay no dividends or use buybacks, dividends are set by directors and can be smoothed, and the result is highly sensitive to the required return and growth assumptions. | Definition and logic ; Suits steady payers ; Problems with non-payers and buybacks ; Sensitivity to inputs

## The Gordon growth model
LV: Intermediate · Application
S: The Gordon growth model values a share whose dividends are expected to grow at a constant rate for ever. This lesson applies the formula, rearranges it to find the return implied by a share price, and shows how sensitive it is to the gap between required return and growth.
O: State the Gordon growth formula and its conditions
O: Calculate a share value and an implied return with the model
O: Evaluate the model's sensitivity and limitations
H: The formula
E: P_{0} = D_{1} ÷ (r − g) :: D1 is next year's dividend, r the required return and g the constant growth rate, with r greater than g
P: Myron Gordon popularised in 1959 a short-cut for the dividend discount model when dividends grow at a constant rate **g** for ever. The value today is next year's dividend **D1** divided by the difference between the **required return r** and **g**. Note that D1 is the dividend expected next year, so if you are given the dividend just paid, **D0**, you must first grow it: D1 = D0 × (1 + g). The model only works if r is greater than g; and since no company can grow faster than the whole economy for ever, g should be a modest long-run rate, close to long-run nominal economic growth. Rearranged, the formula gives the **implied return**: r = D1 ÷ P0 + g, the dividend yield plus growth.
H: Using the model well
- Grow the dividend just paid by one year before using the formula.
- Keep g below r and at a rate the economy could sustain for ever.
- Use it for mature companies, or for the terminal value at the end of a DCF.
- Rearrange it to see what growth rate the current price implies.
- Remember the result is the value of one share, in the same units as the dividend.
H: Sensitivity
- The denominator r − g is usually small, so small changes in either input move the value a lot.
- With D1 of 15p and r of 9%, g of 4% gives 300p but g of 5% gives 375p.
- As g approaches r, the value heads towards infinity, which is a warning sign rather than a result.
- Companies with growth phases need a multi-stage model: high growth first, then a Gordon terminal value.
- Treat the output as a guide to what assumptions a price implies.
X: Valuing a steady dividend payer (illustrative figures).
> The dividend just paid is 20p and is expected to grow at 3% a year for ever.
> Next year's dividend: D1 = 20p × 1.03 = 20.6p.
> With a required return of 8%: value = 20.6 ÷ (0.08 − 0.03) = 20.6 ÷ 0.05 = 412p.
> If the share trades at 350p, it looks cheap, provided the growth and return assumptions are reasonable.
K: The Gordon growth model values a share as next year's dividend divided by the required return minus growth; it is simple but very sensitive to the gap between r and g.
!: Using the dividend just paid in place of next year's dividend. The formula needs D1, so multiply D0 by (1 + g) first.
EV: established | The constant-growth dividend model is a standard result in corporate finance and is widely used for terminal values.
EV: contested | Whether long-run dividend growth assumptions used by analysts are realistic is debated; many studies find forecasters are too optimistic about growth.
T: Gordon growth model | A formula valuing a share as D1 ÷ (r − g) when dividends grow at a constant rate for ever
T: D1 | The dividend expected in one year's time
T: Implied return | The return an investor would earn at today's price if forecasts are met: dividend yield plus growth
SUM: Value = D1 ÷ (r − g), with r above g.
SUM: Implied return = dividend yield + growth.
SUM: Small changes in r or g move the value a lot.
SRC: Gordon M. J., Dividends, earnings and stock prices, Review of Economics and Statistics 41(2) | primary | 1959
SRC: Bodie Z., Kane A. and Marcus A. J., Investments, 12th edition, McGraw-Hill | secondary | 2021
Q: State the Gordon growth model. | Value = next year's dividend ÷ (required return − growth rate).
Q: What condition must hold for the Gordon model to work? | The required return must be greater than the growth rate.
M1#investing-u06-04-q1@1: In the Gordon growth model, what does D1 represent? | The dividend expected one year from now | The dividend paid one year ago | The total of all past dividends paid | The dividend divided by the share price | D1 is next year's dividend; if you are given the latest dividend, grow it by one year first.
NUM2#investing-u06-04-q2@2: A share is expected to pay a dividend of 15p next year, growing at 4% a year for ever. Investors require 9%. What is the share worth in pence? | 300 | 0.01 | p | Value = 15 ÷ (0.09 − 0.04) = 15 ÷ 0.05 = 300p.
M2#investing-u06-04-q3@2: A share costs 400p, next year's dividend is expected to be 16p and dividends should grow at 5% a year. What return does the price imply? | 9% | 4% | 5% | 21% | Implied return = D1 ÷ P0 + g = 16 ÷ 400 + 5% = 4% + 5% = 9%.
M3#investing-u06-04-q4@3: An analyst uses the Gordon model with a required return of 8% and a growth rate of 7.5%. What is the main problem? | The tiny gap makes the value extremely sensitive and probably unrealistic | The model only works when growth is above the required return | The dividend should be discounted at the growth rate, not r | There is no problem, because the result will be accurate | With r − g of only 0.5%, the value is huge and swings wildly with small input changes; 7.5% growth for ever is also implausible.
SA3#investing-u06-04-q5@2,3: Explain how the Gordon growth model can be used to find the growth an investor is implicitly assuming when buying a share, and why this is useful. | Rearranging the model gives g = r − D1 ÷ P0, so for a given required return and dividend the current price implies a particular long-run growth rate. For example, if an investor requires 8% and the dividend yield is 2%, the price implies about 6% growth a year for ever. The investor can then judge whether that growth is realistic compared with the economy and the firm's history. This turns valuation into a test of assumptions rather than a single forecast. | Rearranging the formula ; Worked implication ; Comparing with realistic growth ; Testing assumptions instead of point estimates

## The required return and the cost of equity
LV: Intermediate · Application
S: Every valuation needs a discount rate, the return investors require for bearing the risk. This lesson explains the cost of equity, three ways to estimate it, and how it combines with the cost of debt in the weighted average cost of capital.
O: Explain what the cost of equity represents
O: Estimate the cost of equity using CAPM and the dividend growth approach
O: Calculate and interpret a simple weighted average cost of capital
H: What the required return is
P: The **required return** is the minimum return investors demand to hold an asset, given its risk and what they could earn elsewhere. For shareholders, it is the company's **cost of equity**: the return the company must offer to attract and keep equity capital. It is an **opportunity cost**, not a payment the company makes. A higher required return means future cash flows are discounted more heavily, so the same business is worth less. The cost of equity cannot be observed directly, so analysts estimate it, and different reasonable methods can give noticeably different answers.
H: Three ways to estimate the cost of equity
- **CAPM**: risk-free rate plus beta times the equity risk premium (see the CAPM lesson in School 5).
- **Dividend growth approach**: rearrange the Gordon model, r = D1 ÷ P0 + g.
- **Bond yield plus premium**: the company's own bond yield plus a few percentage points for the extra risk of equity.
- The **risk-free rate** is usually taken from government bond yields, such as gilts for UK companies.
- Each method relies on estimates, so analysts often compare several.
H: The weighted average cost of capital
- Most companies are financed by both equity and debt.
- **WACC** weights the cost of each by its share of total financing, usually at market values.
- Interest is tax-deductible for companies, so the after-tax cost of debt is used: cost of debt × (1 − tax rate).
- The UK main rate of corporation tax has been 25% since April 2023 (HMRC), for companies with profits over £250,000.
- WACC is the discount rate for cash flows to all investors; the cost of equity is used for cash flows to shareholders alone.
X: A simple WACC (illustrative figures).
> A company is financed 60% by equity and 40% by debt, at market values.
> Cost of equity by CAPM: 4.5% + 1.1 × 5% = 10%; pre-tax cost of debt 5%; tax rate 25%.
> After-tax cost of debt: 5% × 0.75 = 3.75%.
> WACC = 0.6 × 10% + 0.4 × 3.75% = 6% + 1.5% = 7.5%.
K: The cost of equity is the return shareholders require, estimated with CAPM, the dividend growth approach or a bond yield plus premium, and it combines with the after-tax cost of debt to give WACC.
!: Treating the cost of equity as the dividend a company pays. It is the total return shareholders require, from dividends and growth, and it is an opportunity cost rather than a cash payment.
EV: established | The weighted average cost of capital is the standard discount rate for enterprise cash flows in corporate finance.
EV: contested | Estimates of the equity risk premium, a key input to the cost of equity, vary widely between studies and practitioners.
T: Cost of equity | The return shareholders require for investing in a company's shares
T: Opportunity cost | The return given up by not investing in the next best alternative of similar risk
T: After-tax cost of debt | The interest rate on debt multiplied by one minus the tax rate
SUM: The required return is an opportunity cost.
SUM: CAPM, dividend growth and bond-plus-premium estimate it.
SUM: WACC blends equity and after-tax debt costs.
SRC: Brealey R. A., Myers S. C. and Allen F., Principles of Corporate Finance, 14th edition, McGraw-Hill | secondary | 2023
SRC: HM Revenue and Customs, Corporation Tax rates and allowances, gov.uk | guidance | 2025 | https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax
SRC: Dimson E., Marsh P. and Staunton M., Triumph of the Optimists: 101 Years of Global Investment Returns, Princeton University Press | data | 2002
Q: Why is the cost of debt adjusted for tax in WACC? | Interest is tax-deductible for companies, so the effective cost is the interest rate × (1 − tax rate).
Q: Give the dividend growth formula for the cost of equity. | r = D1 ÷ P0 + g.
M1#investing-u06-05-q1@1: What is a company's cost of equity? | The return its shareholders require for bearing the risk | The interest rate the company pays on its bank loans | The total dividend it paid to shareholders last year | The cost of issuing new shares through a stockbroker | The cost of equity is the shareholders' required return, an opportunity cost rather than a cash payment.
NUM2#investing-u06-05-q2@2: A share trades at 250p. The dividend just paid was 10p and dividends are expected to grow at 4% a year. Using the dividend growth approach, what is the cost of equity as a percentage? | 8.16 | 0.01 | % | D1 = 10 × 1.04 = 10.4p; 10.4 ÷ 250 = 4.16%; adding growth of 4% gives a cost of equity of 8.16%.
M2#investing-u06-05-q3@2: Why does WACC use the after-tax cost of debt but no tax adjustment for equity? | Interest is deductible for corporation tax but dividends are not | Shareholders never pay any tax on the returns they receive | Debt is always cheaper than equity before tax is considered | Tax rates on debt and equity are always exactly the same | Companies deduct interest before tax, which lowers the effective cost of debt; dividends are paid from post-tax profit.
M3#investing-u06-05-q4@3: Two analysts estimate a company's cost of equity at 7% and 10%. What is the best response? | Value the company at both rates and see how far the answer moves | Pick the lower rate, because it gives the higher valuation | Average them and treat the result as precise and certain | Ignore the discount rate and value the shares on revenue | The cost of equity is uncertain, so testing a range shows how much the conclusion depends on it.
SA2#investing-u06-05-q5@2,3: Explain why a higher cost of equity reduces the value of a company's shares. | The cost of equity is the rate used to discount the cash flows that belong to shareholders. A higher rate means each future pound is worth less today, so the present value of all future dividends or free cash flows falls. The effect is strongest for cash flows far in the future, so growth companies are hit hardest. Rising interest rates or higher perceived risk raise the cost of equity and so tend to lower share values. | Discounting role ; Present value falls ; Distant cash flows hit hardest ; Link to interest rates and risk

## Earnings per share
LV: Intermediate · Foundation
S: Earnings per share (EPS) is the profit attributable to each ordinary share. This lesson explains how basic and diluted EPS are calculated under IAS 33, why the weighted average number of shares is used, and how buybacks and one-off items can flatter the figure.
O: Calculate basic earnings per share
O: Explain dilution and diluted EPS
O: Evaluate EPS as a measure of performance
H: Basic EPS
E: Basic EPS = profit attributable to ordinary shareholders ÷ weighted average number of ordinary shares :: preference dividends are deducted from profit first
P: **Earnings per share** is set out in the accounting standard **IAS 33**, which listed companies in the UK apply. The numerator is profit after tax attributable to **ordinary shareholders**, which means after deducting any **preference dividends** and profit belonging to minority (non-controlling) interests. The denominator is the **weighted average number of ordinary shares** in issue during the year, so that shares issued or bought back part-way through count only for the time they existed. EPS is shown on the face of the income statement and is the 'E' in the price-to-earnings ratio, which makes it one of the most quoted numbers in investing.
H: Dilution
- **Diluted EPS** assumes that all potential ordinary shares, such as share options, warrants and convertible bonds, are turned into shares.
- More shares spread the same profit thinner, so diluted EPS is usually lower than basic EPS.
- A big gap between basic and diluted EPS signals heavy use of options or convertibles.
- Companies also publish **adjusted** or **underlying** EPS that strip out items they regard as one-off.
- Adjusted figures are not defined by IAS 33, so compare them with the statutory figure.
H: Using EPS critically
- EPS growth can come from **share buybacks**, which reduce the number of shares, rather than from higher profits.
- One-off gains, such as selling a property, can lift EPS for a single year.
- EPS ignores how much capital was needed to earn the profit.
- EPS says nothing about cash; profits can rise while cash flow falls.
- Comparing EPS across companies means little, because share counts differ; compare growth and ratios instead.
X: Basic EPS with a share issue (illustrative figures).
> Profit after tax is £12m and preference dividends are £2m, so ordinary profit is £10m.
> The company had 40m shares at the start of the year and issued 10m more exactly halfway through.
> Weighted average shares = 40m + 10m × 0.5 = 45m.
> Basic EPS = £10m ÷ 45m = 22.2p.
K: Basic EPS is profit for ordinary shareholders divided by the weighted average number of shares; diluted EPS allows for options and convertibles, and EPS growth should be checked against buybacks, one-offs and cash flow.
!: Assuming rising EPS always means a better business. EPS can rise through buybacks or one-off gains while underlying profits and returns are flat.
EV: established | IAS 33 sets out how listed companies must calculate and present basic and diluted earnings per share.
T: Earnings per share | Profit attributable to ordinary shareholders divided by the weighted average number of ordinary shares
T: Diluted EPS | EPS calculated as if all options, warrants and convertibles had become ordinary shares
T: Weighted average shares | The number of shares in issue adjusted for the part of the year each share existed
SUM: EPS is profit per ordinary share.
SUM: Diluted EPS allows for options and convertibles.
SUM: Check EPS growth against buybacks and cash.
SRC: IFRS Foundation, IAS 33 Earnings per Share | standard | 2003 | https://www.ifrs.org/issued-standards/list-of-standards/ias-33-earnings-per-share/
SRC: Damodaran A., Investment Valuation, 3rd edition, Wiley | secondary | 2012
Q: What is deducted from profit after tax before calculating basic EPS? | Preference dividends and profit attributable to non-controlling interests.
Q: Why is diluted EPS usually lower than basic EPS? | It assumes options and convertibles become shares, spreading profit over more shares.
M1#investing-u06-06-q1@1: Which accounting standard sets out how earnings per share is calculated? | IAS 33 | IFRS 16 | IAS 7 | IFRS 9 | IAS 33 Earnings per Share covers basic and diluted EPS for listed companies.
NUM2#investing-u06-06-q2@2: A company's profit attributable to ordinary shareholders is £9m and the weighted average number of ordinary shares is 36m. What is basic EPS in pence? | 25 | 0.01 | p | Basic EPS = £9m ÷ 36m shares = £0.25, which is 25p per share.
M2#investing-u06-06-q3@2: A company with 100m shares buys back 10m shares at the start of the year; its profit is unchanged. What happens to EPS? | It rises by about 11% with no change in profit | It falls by 10% because cash has left the company | It stays the same because profit has not changed at all | It rises by exactly 10% because 10m shares were bought | The same profit over 90m shares instead of 100m raises EPS by 100 ÷ 90 − 1, about 11%.
M3#investing-u06-06-q4@3: A company reports basic EPS of 40p but diluted EPS of 30p. What should an investor conclude? | Many potential shares exist, so existing holders face significant dilution | The company has made a loss that the basic figure is hiding | The company must have made an error in its income statement | Diluted EPS is irrelevant and can be ignored by shareholders | A 25% gap means options or convertibles could substantially increase the share count.
SA3#investing-u06-06-q5@1,3: Evaluate EPS growth as a measure of a company's success. | EPS growth shows how much profit each share is earning and is closely watched because it feeds the P/E ratio. However, it can be raised by share buybacks that cut the share count, by one-off gains, or by adjusted figures that exclude costs. It ignores the capital needed to earn the profit and says nothing about cash generation. Investors should check the source of growth, compare statutory and adjusted figures, and look at return on capital and cash flow too. | Purpose of EPS ; Buybacks and one-offs ; Ignores capital and cash ; Need for supporting measures

## The price-to-earnings ratio
LV: Intermediate · Application
S: The price-to-earnings (P/E) ratio compares a share's price with its earnings per share. This lesson explains trailing and forward P/E, the earnings yield, what drives a high or low P/E, and the PEG ratio.
O: Calculate a P/E ratio and an earnings yield
O: Explain what drives differences in P/E between companies
O: Evaluate the P/E ratio and PEG as valuation tools
H: The ratio
E: P/E = share price ÷ earnings per share :: earnings yield = EPS ÷ share price = 1 ÷ P/E
P: The **price-to-earnings ratio** tells you how many pounds investors are paying for each pound of annual profit. A **trailing P/E** uses the last twelve months' reported EPS; a **forward P/E** uses analysts' forecasts for the coming year. Turning the ratio upside down gives the **earnings yield**, which can be compared loosely with bond yields: a P/E of 20 is an earnings yield of 5%. A company with no profits has no meaningful P/E. The Gordon growth model shows why P/E varies: for a steady company, a justified P/E is roughly the payout ratio divided by (r − g), so faster expected growth and lower risk both support a higher P/E.
H: What drives P/E
- **Expected growth**: investors pay more for earnings that are expected to rise quickly.
- **Risk**: a higher required return lowers the justified P/E.
- **Quality and durability** of earnings: stable, cash-backed profits earn higher multiples.
- **Interest rates**: lower rates generally support higher P/E ratios across the market.
- **Cyclical earnings**: P/E can look low at the peak of a cycle, when profits are unusually high, and high at the bottom.
H: The PEG ratio and other cautions
- The **PEG ratio** divides the P/E by the expected annual EPS growth rate in percent.
- A PEG near 1 was popularised by Jim Slater as a sign of reasonable value for growth shares.
- PEG depends on growth forecasts, which are often too optimistic.
- Compare P/E with the company's own history, its sector and the market, not in isolation.
- Use statutory earnings, or check adjustments, so the 'E' is not flattered.
X: Comparing two shares (illustrative figures).
> Share A: price 540p, EPS 30p, so P/E = 18; expected EPS growth 12% a year, so PEG = 1.5.
> Share B: price 480p, EPS 40p, so P/E = 12; expected EPS growth 4%, so PEG = 3.
> A has the higher P/E but the lower PEG, because more growth is expected.
> Neither ratio alone says which is better value; the reliability of the growth forecasts matters most.
K: The P/E ratio is price divided by EPS and its inverse is the earnings yield; higher growth, lower risk and lower interest rates justify higher P/E ratios, but cyclical earnings and optimistic forecasts can mislead.
!: Buying a share because its P/E is low. A low P/E may reflect falling future profits, high risk or peak-cycle earnings, rather than a bargain.
EV: established | Basu (1977) found that US shares with low P/E ratios earned higher average returns than those with high P/E ratios over 1957 to 1971.
EV: contested | Whether low-P/E returns compensate for extra risk or reflect investor over-reaction is still debated.
T: Price-to-earnings ratio | Share price divided by earnings per share
T: Earnings yield | Earnings per share divided by share price; the inverse of the P/E
T: PEG ratio | The P/E ratio divided by expected annual EPS growth in percent
SUM: P/E = price ÷ EPS; earnings yield = 1 ÷ P/E.
SUM: Growth, risk and rates drive P/E.
SUM: Beware cyclical earnings and rosy forecasts.
SRC: Basu S., Investment performance of common stocks in relation to their price-earnings ratios, Journal of Finance 32(3) | primary | 1977
SRC: Slater J., The Zulu Principle, Orion | secondary | 1992
SRC: Damodaran A., Investment Valuation, 3rd edition, Wiley | secondary | 2012
Q: What is the earnings yield of a share with a P/E of 25? | 4%, because 1 ÷ 25 = 0.04.
Q: What is the difference between trailing and forward P/E? | Trailing uses the last twelve months' actual EPS; forward uses forecast EPS for the coming year.
M1#investing-u06-07-q1@1: What does a P/E ratio of 20 mean? | Investors pay £20 for each £1 of annual earnings | The company earns 20% of its share price each year | The company pays 20p in dividends for every share | The share price has risen 20 times since it was floated | P/E is price divided by EPS, so a P/E of 20 means 20 times annual earnings, an earnings yield of 5%.
NUM2#investing-u06-07-q2@2: A share trades at 540p and its trailing EPS is 30p. What is its P/E ratio? | 18 | 0.01 | times | P/E = 540p ÷ 30p = 18 times earnings, equal to an earnings yield of about 5.6%.
M2#investing-u06-07-q3@2: A share has a P/E of 24 and expected EPS growth of 8% a year. What is its PEG ratio? | 3 | 0.33 | 1.92 | 32 | PEG = P/E ÷ growth rate in percent = 24 ÷ 8 = 3.
M3#investing-u06-07-q4@3: A steelmaker trades on a P/E of 5 at the peak of the economic cycle. What is the best interpretation? | Profits may be unusually high and likely to fall, so the shares may not be cheap | The shares are clearly undervalued and should be bought at once | The market has made an error that is bound to correct very soon | A low P/E always guarantees higher than average future returns | For cyclical firms, peak earnings flatter the P/E; investors anticipate the downturn and pay a low multiple.
SA3#investing-u06-07-q5@2,3: Explain why two companies in the same market can trade on very different P/E ratios, and whether the higher one is necessarily overvalued. | P/E reflects what investors expect about future earnings, not just current profit. A company expected to grow quickly, with stable, cash-backed profits and low risk, justifies a higher P/E than a slow-growing, risky or cyclical one. The higher P/E is therefore not necessarily overvalued; it is overvalued only if the growth and quality it implies are unlikely to be delivered. Investors should test the implied growth against realistic forecasts. | Growth expectations ; Risk and quality ; Higher P/E can be justified ; Test implied growth

## Dividend yield and dividend cover
LV: Intermediate · Application
S: Dividend yield shows the income a share pays relative to its price, and dividend cover shows how comfortably profits support that dividend. This lesson calculates both, explains the payout ratio and warns about the dividend trap.
O: Calculate dividend yield, dividend cover and payout ratio
O: Explain what a high or low dividend cover suggests
O: Evaluate a high dividend yield as a signal of value
H: The three measures
E: Dividend yield = dividend per share ÷ share price; dividend cover = EPS ÷ dividend per share :: payout ratio = dividend per share ÷ EPS = 1 ÷ cover
P: The **dividend yield** is the annual dividend per share as a percentage of the share price, and is usually quoted on the dividends paid over the last twelve months (a **trailing yield**) or on forecasts (a **prospective yield**). **Dividend cover** divides earnings per share by dividend per share and tells you how many times over the profit could pay the dividend. Its inverse is the **payout ratio**, the share of profit paid out. A cover of about 2 has traditionally been seen in the UK as comfortable; a cover below 1 means the company is paying out more than it earns, which cannot last unless profits recover. Because profits are not cash, it is also worth checking that **free cash flow** covers the dividend.
H: Reading the numbers
- A high yield can mean a generous, reliable payer, or a share price that has fallen because the market expects a dividend cut.
- A low yield often means investors expect strong growth, or that the company prefers reinvestment or buybacks.
- High cover leaves room to keep paying through a bad year and to reinvest.
- Low cover may suit very stable businesses, such as regulated utilities, but leaves little buffer.
- Cover based on cash flow is a useful check when profits include non-cash items.
H: Income, tax and the dividend trap
- A **dividend trap** is a share whose high yield attracts buyers just before the dividend is cut.
- Look at the trend in cover, debt levels and cash flow, not just the headline yield.
- In the UK the dividend allowance has been £500 a year since 6 April 2024 (HMRC); dividends above it are taxed at your dividend rate.
- Dividends received inside an ISA or a pension are not subject to UK income tax.
- Total return, income plus growth, matters more than yield alone.
X: Checking a dividend (illustrative figures).
> A share trades at 500p and paid dividends of 25p over the year, so the yield is 25 ÷ 500 = 5%.
> EPS was 40p, so dividend cover = 40 ÷ 25 = 1.6 times.
> The payout ratio is 25 ÷ 40 = 62.5% of earnings.
> The dividend looks covered, but the investor also checks that free cash flow per share exceeds 25p.
K: Dividend yield measures income relative to price, cover measures how many times earnings pay the dividend, and a very high yield with thin cover is more often a warning than a bargain.
!: Choosing shares purely for the highest yield. An unusually high yield often reflects a falling share price and a dividend the market expects to be cut.
EV: established | Dividend yield, dividend cover and payout ratio are standard investor ratios reported in UK financial data services.
EV: contested | Whether high-yield shares earn higher total returns over time, once their sector and value exposures are allowed for, is debated.
T: Dividend yield | Annual dividend per share as a percentage of the share price
T: Dividend cover | Earnings per share divided by dividend per share
T: Dividend trap | A share with a high yield that falls further when its dividend is cut
SUM: Yield = DPS ÷ price; cover = EPS ÷ DPS.
SUM: Cover below 1 is unsustainable.
SUM: A very high yield can signal a cut.
SRC: HM Revenue and Customs, Tax on dividends, gov.uk | guidance | 2025 | https://www.gov.uk/tax-on-dividends
SRC: Financial Conduct Authority, Investing: a consumer guide, fca.org.uk | guidance | 2024 | https://www.fca.org.uk/consumers/investing
SRC: Bodie Z., Kane A. and Marcus A. J., Investments, 12th edition, McGraw-Hill | secondary | 2021
Q: What does a dividend cover of below 1 mean? | The company is paying out more in dividends than it earns.
Q: How is the payout ratio related to dividend cover? | The payout ratio is the inverse of dividend cover: dividend per share ÷ EPS.
M1#investing-u06-08-q1@1: How is dividend cover calculated? | Earnings per share divided by dividend per share | Dividend per share divided by the share price | Share price divided by earnings per share | Dividend per share divided by net assets | Cover shows how many times profit could pay the dividend: EPS ÷ DPS.
NUM2#investing-u06-08-q2@2: A company's EPS is 36p and it pays a dividend of 24p per share. What is its dividend cover? | 1.5 | 0.01 | times | Dividend cover = EPS ÷ DPS = 36 ÷ 24 = 1.5 times, a payout ratio of about 67%.
M2#investing-u06-08-q3@2: A share's price falls from 400p to 250p while its expected dividend stays at 20p. What happens to its prospective yield? | It rises from 5% to 8% | It falls from 8% to 5% | It stays at 5% throughout | It rises from 5% to 12.5% | Yield = 20 ÷ 400 = 5% before and 20 ÷ 250 = 8% after; a falling price raises the yield.
M3#investing-u06-08-q4@3: A share yields 11%, its dividend cover is 0.7 and its debts are rising. What is the most likely interpretation? | The market expects the dividend to be cut | The share is a safe and generous source of income | The company is growing quickly and has spare cash | The yield is low compared with most UK shares | Cover below 1 plus rising debt suggests the payout is unsustainable; the high yield reflects a falling price.
SA3#investing-u06-08-q5@1,3: Evaluate the use of dividend yield to select shares for income. | Dividend yield shows the income received relative to the price and is useful for comparing income shares. However, a high yield can reflect a falling share price and a dividend at risk of being cut, so it should be checked against dividend cover, cash flow and debt. Shares with low yields but strong growth may provide more income in future. A balanced approach looks at the sustainability and growth of dividends and at total return, not at yield alone. | Usefulness for income comparison ; Dividend trap risk ; Checks on cover, cash and debt ; Total return and growth

## Price-to-book
LV: Intermediate · Application
S: The price-to-book ratio compares a company's market value with the net assets shown in its accounts. This lesson calculates P/B, links it to return on equity, and explains where it is useful and where intangible assets make it misleading.
O: Calculate book value per share and the price-to-book ratio
O: Explain the link between price-to-book and return on equity
O: Evaluate when price-to-book is a useful measure
H: The ratio
E: P/B = share price ÷ book value per share = market capitalisation ÷ net assets :: book value per share = shareholders' equity ÷ number of shares
P: **Book value** is shareholders' equity in the balance sheet: total assets minus total liabilities. Dividing by the number of shares gives **book value per share**, and comparing it with the share price gives the **price-to-book ratio (P/B)**. A P/B of 1 means the market values the company at exactly its accounting net assets. Benjamin Graham liked shares trading below book value, and low P/B is the classic measure of **value** used by Fama and French. A useful identity is P/B = P/E × **return on equity (ROE)**: companies that earn high returns on their net assets deserve to trade well above book, while those earning less than their cost of equity often trade below it.
H: Where P/B works
- **Banks and insurers**, whose assets and liabilities are mostly financial and carried near market value.
- **Property companies and investment trusts**, where net asset value is the main yardstick.
- Asset-heavy industries such as utilities and shipping.
- Screening for shares trading below the value of their net assets.
- Checking whether a high P/B is backed by a high ROE.
H: Where P/B misleads
- Much of the value of modern firms lies in **intangibles** such as brands, software, data and staff skills that are not on the balance sheet.
- Internally generated intangibles are expensed under accounting rules, so book value understates such companies.
- Buybacks reduce equity, pushing P/B up without any change in the business.
- Assets are often at historical cost, which may be far from current value.
- A low P/B may simply reflect poor returns or assets that are worth less than stated.
X: P/B and ROE (illustrative figures).
> A company has net assets of £180m and 90m shares, so book value per share is 200p.
> Its share price is 300p, so P/B = 300 ÷ 200 = 1.5.
> Its EPS is 25p, so P/E = 12 and ROE = 25 ÷ 200 = 12.5%.
> Check: P/E × ROE = 12 × 12.5% = 1.5, matching the P/B.
K: Price-to-book compares market value with accounting net assets; it is linked to ROE and works best for financial and asset-heavy firms, but understates the worth of companies built on intangibles.
!: Assuming a share below book value must be a bargain. If the company earns less than its cost of equity, or its assets are overstated, it may deserve to trade below book.
EV: established | Fama and French (1992) found that US shares with low price-to-book ratios earned higher average returns from 1963 to 1990.
EV: contested | Researchers debate whether the weaker value premium since about 2007 reflects the growing role of intangibles that book value omits.
T: Book value | Shareholders' equity in the balance sheet: total assets minus total liabilities
T: Price-to-book ratio | Share price divided by book value per share
T: Return on equity | Profit attributable to shareholders divided by shareholders' equity
SUM: P/B = price ÷ book value per share.
SUM: P/B = P/E × ROE.
SUM: Intangibles make P/B misleading for many firms.
SRC: Fama E. F. and French K. R., The cross-section of expected stock returns, Journal of Finance 47(2) | primary | 1992
SRC: Lev B. and Gu F., The End of Accounting and the Path Forward for Investors and Managers, Wiley | secondary | 2016
SRC: Damodaran A., Investment Valuation, 3rd edition, Wiley | secondary | 2012
Q: What is book value? | Shareholders' equity: total assets minus total liabilities.
Q: How is P/B related to P/E and ROE? | P/B = P/E × ROE.
M1#investing-u06-09-q1@1: What does a price-to-book ratio of 1 mean? | The market values the company at its accounting net assets | The share price has not changed over the last year | Earnings per share equal the dividend per share | The company has no debt on its balance sheet | P/B of 1 means market capitalisation equals shareholders' equity in the accounts.
NUM2#investing-u06-09-q2@2: A company has net assets of £180m and 90m shares. Its share price is 300p. What is its price-to-book ratio? | 1.5 | 0.01 | times | Book value per share = £180m ÷ 90m = 200p, so P/B = 300 ÷ 200 = 1.5 times.
M2#investing-u06-09-q3@2: For which company is price-to-book most informative? | A bank whose assets are mainly loans and bonds | A software firm whose value lies in its code and brand | A consultancy whose main asset is its staff | A pharmaceutical firm with mostly in-house research | Banks hold mainly financial assets carried near market value, so book value is a meaningful anchor.
M3#investing-u06-09-q4@3: A company trades at a P/B of 0.6 and has earned an ROE of 3% for many years, against a cost of equity of 9%. What is the best interpretation? | The low P/B may be justified because returns are below the cost of equity | The shares are certainly undervalued and will rise soon | The low P/B proves the accounts must be overstating profit | The company should trade at a P/B of at least 1 by law | A firm earning less than its cost of equity destroys value on its book assets, so a discount can be fair.
SA3#investing-u06-09-q5@1,3: Evaluate price-to-book as a valuation measure for modern companies. | Price-to-book compares market value with accounting net assets, and is useful for banks, insurers, property companies and asset-heavy firms. It is linked to ROE, so a high P/B can be justified by high returns. However, many modern companies create value through intangibles such as software, brands and data, which accounting rules largely leave off the balance sheet, so their book value is understated and P/B looks high. It is therefore best used within sectors where book value is meaningful and alongside earnings and cash flow measures. | Definition and use ; Link to ROE ; Intangibles problem ; Use within suitable sectors

## Enterprise value and EV/EBITDA
LV: Intermediate · Application
S: Enterprise value measures the value of the whole business, to shareholders and lenders together. This lesson calculates enterprise value and EV/EBITDA, explains why they help compare companies with different debt levels, and sets out the weaknesses of EBITDA.
O: Calculate enterprise value from market capitalisation and net debt
O: Calculate and interpret EV/EBITDA
O: Evaluate the strengths and weaknesses of EBITDA-based multiples
H: Enterprise value
E: EV = market capitalisation + debt − cash (+ preference shares + non-controlling interests) :: EV/EBITDA = enterprise value ÷ EBITDA
P: **Market capitalisation** values only the shares. **Enterprise value (EV)** adds the company's **net debt** (borrowings minus cash) and other claims such as preference shares and minority interests, giving roughly what a buyer would need to pay to take over the whole business and its obligations. Because EV belongs to all capital providers, it should be compared with a profit measure before interest, such as **EBITDA** (earnings before interest, tax, depreciation and amortisation) or **EBIT**. This makes **EV/EBITDA** useful for comparing companies with different amounts of debt, where P/E can be distorted by gearing.
H: Why analysts use EV/EBITDA
- It is **capital-structure neutral**: two firms with the same operations but different debt have similar EV/EBITDA.
- It is common in takeovers, private equity and sector comparisons.
- EBITDA is less affected by different depreciation policies between countries.
- It can be used when a company makes a net loss after interest, so P/E is meaningless.
- Lower multiples generally indicate cheaper businesses, other things being equal.
H: The weaknesses of EBITDA
- EBITDA ignores the **capital expenditure** needed to replace worn-out assets; depreciation is a real economic cost.
- It ignores tax and interest, which shareholders must bear.
- Under **IFRS 16**, lease costs moved below EBITDA from 2019, raising reported EBITDA for firms with many leases.
- Companies may present adjusted EBITDA that strips out recurring costs.
- EV/EBIT or EV to free cash flow are often more demanding alternatives.
X: Comparing two firms (illustrative figures).
> Firm A: market cap £800m, debt £300m, cash £100m, so EV = 800 + 300 − 100 = £1,000m.
> Firm A's EBITDA is £125m, so EV/EBITDA = 1,000 ÷ 125 = 8 times.
> Firm B: market cap £900m, no debt, cash £100m, so EV = £800m; EBITDA £80m gives 10 times.
> Firm A has the smaller market cap of the two but the larger EV, and is the cheaper on EV/EBITDA.
K: Enterprise value adds net debt and other claims to market capitalisation, and EV/EBITDA compares firms regardless of gearing, but EBITDA ignores capital spending, tax and lease effects.
!: Comparing a company's market capitalisation with its EBITDA. Market cap belongs to shareholders only, so it must be matched with an after-interest figure; EBITDA goes with enterprise value.
EV: established | Enterprise value multiples such as EV/EBITDA are widely used in equity research and takeover valuation.
EV: contested | Warren Buffett and others have criticised EBITDA for ignoring depreciation, arguing that capital spending is a real cost to owners.
T: Enterprise value | Market capitalisation plus net debt and other claims on the business
T: EBITDA | Earnings before interest, tax, depreciation and amortisation
T: Net debt | Borrowings minus cash and cash equivalents
SUM: EV = market cap + debt − cash.
SUM: EV/EBITDA ignores gearing differences.
SUM: EBITDA ignores capital spending.
SRC: Koller T., Goedhart M. and Wessels D., Valuation: Measuring and Managing the Value of Companies, 7th edition, Wiley | secondary | 2020
SRC: IFRS Foundation, IFRS 16 Leases | standard | 2016 | https://www.ifrs.org/issued-standards/list-of-standards/ifrs-16-leases/
SRC: Buffett W. E., Berkshire Hathaway Inc. Chairman's letter to shareholders | primary | 2000 | https://www.berkshirehathaway.com/letters/2000pdf.pdf
Q: Why is EV matched with EBITDA rather than net profit? | Both EV and EBITDA belong to all capital providers, before interest is paid to lenders.
Q: What does IFRS 16 do to reported EBITDA? | It moves lease costs below EBITDA, raising EBITDA for companies with many leases.
M1#investing-u06-10-q1@1: Which figure is added to market capitalisation to reach enterprise value? | Net debt | Annual revenue | Total dividends | Retained profit | EV = market cap + borrowings − cash, plus other claims such as preference shares.
NUM2#investing-u06-10-q2@2: A company has a market capitalisation of £450m, borrowings of £200m and cash of £50m. Its EBITDA is £100m. What is its EV/EBITDA multiple? | 6 | 0.01 | times | EV = 450 + 200 − 50 = £600m, and EV/EBITDA = 600 ÷ 100 = 6 times.
M2#investing-u06-10-q3@2: Two companies have identical operations, but one is financed largely by debt. Why might an analyst prefer EV/EBITDA to P/E when comparing them? | EV/EBITDA is not distorted by the different levels of debt | P/E ignores the share price, while EV/EBITDA does not | EV/EBITDA always gives a higher number than P/E | Debt is not shown in the accounts of listed companies | EV includes debt and EBITDA is before interest, so the multiple is neutral to capital structure.
M3#investing-u06-10-q4@3: A telecoms firm trades on a low EV/EBITDA but must spend heavily on network upgrades each year. What is the main risk in calling it cheap? | Heavy capital spending absorbs cash that EBITDA ignores | EV/EBITDA cannot be calculated for telecoms companies | Low multiples always mean the company has no debt | EBITDA already deducts all capital spending in full | EBITDA is before depreciation, so high ongoing capital expenditure can leave little free cash flow.
SA3#investing-u06-10-q5@1,3: Explain enterprise value and evaluate EV/EBITDA as a valuation multiple. | Enterprise value is market capitalisation plus net debt and other claims, so it values the whole business for all capital providers. EV/EBITDA compares it with profit before interest, tax, depreciation and amortisation, which allows firms with different debt levels and depreciation policies to be compared. However, EBITDA ignores the capital spending needed to sustain the business, as well as tax, and IFRS 16 and company adjustments can inflate it. EV/EBIT or EV to free cash flow give a more demanding test. | Definition of EV ; Capital-structure neutral comparison ; EBITDA ignores capex and tax ; Alternatives and adjustments

## Valuing a bond
LV: Intermediate · Application
S: A bond's price is the present value of its coupons and its final repayment, discounted at the market yield. This lesson prices a simple bond, explains premium and discount prices, current yield and the clean and dirty price, and notes the UK tax treatment of gilts.
O: Calculate the price of a simple fixed-coupon bond
O: Explain why bonds trade at a premium or discount to par
O: Distinguish yield to maturity, current yield and clean and dirty prices
H: Pricing a bond
E: Price = C ÷ (1 + y) + C ÷ (1 + y)^{2} + ... + (C + F) ÷ (1 + y)^{n} :: C is the coupon, F the face value repaid at maturity, y the yield and n the years to maturity
P: A conventional bond promises fixed **coupons** and the return of its **face value** (par, usually £100) at **maturity**. Its fair price is the present value of those cash flows, discounted at the **yield to maturity** demanded by the market for bonds of similar risk and term. If the market yield is below the coupon rate, the bond is worth more than £100 and trades at a **premium**; if the yield is above the coupon, it trades at a **discount**. As maturity approaches, the price is pulled towards par. Gilts pay coupons twice a year, so real calculations use half-yearly periods; the annual examples here keep the arithmetic simple.
H: Yields and prices
- **Yield to maturity** is the single discount rate that makes the present value of all cash flows equal the price.
- **Current yield** (running yield) is the annual coupon divided by the price, ignoring the gain or loss to maturity.
- A **zero-coupon bond** pays only its face value, so its price is F ÷ (1 + y)^{n}.
- Longer bonds and lower coupons make prices more sensitive to yield changes.
- Credit risk raises the yield investors demand, and so lowers the price.
H: Clean and dirty prices and UK tax
- Bond prices are quoted **clean**, excluding interest that has built up since the last coupon.
- The buyer pays the **dirty price**: clean price plus **accrued interest** owed to the seller.
- Gilts and qualifying corporate bonds are exempt from UK Capital Gains Tax (HMRC), but coupons are taxable as savings income outside an ISA or pension.
- This makes low-coupon gilts bought below par tax-efficient for some higher-rate taxpayers, since most of their return is a tax-free gain.
- Check current HMRC rules, as tax treatment can change.
X: Pricing a three-year bond (illustrative figures).
> A bond has face value £100, an annual coupon of 5% and three years to maturity; the market yield is 4%.
> Year 1: 5 ÷ 1.04 = 4.81; year 2: 5 ÷ 1.0816 = 4.62; year 3: 105 ÷ 1.1249 = 93.34.
> Price = about £102.78, a premium because the yield is below the coupon.
> Current yield = 5 ÷ 102.78 = 4.86%, higher than the 4% yield to maturity because the premium is lost by maturity.
K: A bond is worth the present value of its coupons and face value at the market yield; it trades at a premium when the yield is below the coupon and at a discount when it is above.
!: Treating the current yield as the bond's full return. Current yield ignores the gain or loss as the price moves to par at maturity; yield to maturity includes it.
EV: established | Bond prices and yields move in opposite directions because a bond's price is the present value of fixed cash flows.
T: Yield to maturity | The discount rate that equates a bond's price with the present value of its cash flows
T: Current yield | A bond's annual coupon divided by its price
T: Dirty price | The clean price plus interest accrued since the last coupon
SUM: Price = present value of coupons and face value.
SUM: Yield below coupon means a premium price.
SUM: Buyers pay the dirty price.
SRC: Bodie Z., Kane A. and Marcus A. J., Investments, 12th edition, McGraw-Hill | secondary | 2021
SRC: UK Debt Management Office, Gilt market: about gilts, dmo.gov.uk | guidance | 2024 | https://www.dmo.gov.uk/responsibilities/gilt-market/about-gilts/
SRC: HM Revenue and Customs, Capital Gains Manual CG54000: gilt-edged securities and qualifying corporate bonds | guidance | 2024 | https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual
Q: When does a bond trade at a premium to par? | When the market yield is below its coupon rate.
Q: What is the dirty price of a bond? | The clean quoted price plus interest accrued since the last coupon.
M1#investing-u06-11-q1@1: A bond's coupon rate is 3% and the market yield for similar bonds is 5%. How will it be priced? | Below par, at a discount | Above par, at a premium | Exactly at par | At zero, because it is unattractive | A coupon below the market yield must be offset by a price below £100, giving a capital gain to maturity.
NUM2#investing-u06-11-q2@2: A bond with a face value of £100 pays an annual coupon of 6% and matures in two years. The market yield is 5%. What is its price in pounds, to two decimal places? | 101.86 | 0.05 | £ | 6 ÷ 1.05 = 5.71 and 106 ÷ 1.1025 = 96.15, so the price is about 101.86 pounds, a premium because the yield is below the coupon.
M2#investing-u06-11-q3@2: What is the price of a five-year zero-coupon bond with a £100 face value when the yield is 4%? | About £82.19 | About £96.15 | About £80.00 | About £104.00 | Price = 100 ÷ 1.04 to the power 5 = 100 ÷ 1.2167, which is about £82.19.
M3#investing-u06-11-q4@3: A higher-rate taxpayer is choosing, outside an ISA, between two gilts with the same yield to maturity: one with a 0.5% coupon priced at £90, and one with a 5% coupon priced at £105. Which is likely to be more tax-efficient, and why? | The low-coupon gilt, because more of its return is a capital gain exempt from CGT | The high-coupon gilt, because coupons are exempt from income tax | The high-coupon gilt, because gilt gains are taxed at a high rate | Both are taxed identically, so there is no tax difference at all | Gilt gains are CGT-exempt but coupons are taxable income, so a return mostly from gain is taxed less.
SA3#investing-u06-11-q5@1,3: Explain why a bond's price changes when market interest rates change, and why this matters to an investor who may sell before maturity. | A bond's price is the present value of its fixed coupons and face value, discounted at the yield the market requires. When market yields rise, those fixed cash flows are discounted more heavily, so the price falls; when yields fall, the price rises. An investor who holds to maturity still receives the promised cash flows if the issuer does not default, but one who sells early receives the market price, which may be well below what was paid. Longer-dated and low-coupon bonds are most affected. | Price as present value ; Inverse relation with yields ; Holding to maturity versus selling early ; Sensitivity of long bonds

## Valuing the whole market: CAPE
LV: Intermediate · Evaluation
S: The cyclically adjusted price-to-earnings ratio, or CAPE, compares a market's price with its average real earnings over ten years. This lesson explains how CAPE is built, what the evidence says about its link with long-run returns, and why it is a poor short-term timing tool.
O: Explain how the CAPE ratio is calculated
O: Interpret what a high or low CAPE suggests about long-run returns
O: Evaluate the criticisms and limits of CAPE
H: Building the ratio
E: CAPE = real index level ÷ average of the last 10 years of real earnings :: real means adjusted for inflation
P: A single year's earnings can be distorted by booms and recessions, so a market P/E may look low at a profit peak and high in a slump. Following Graham and Dodd's advice to use average earnings over several years, John Campbell and Robert Shiller (1988, 1998) divided the inflation-adjusted price of the US market by its average **real earnings** over the previous ten years. This **cyclically adjusted P/E (CAPE)**, also called the **Shiller P/E**, smooths the cycle. Historically, periods of high CAPE, such as 1929 and 1999, have been followed on average by low real returns over the next ten years, and low CAPE periods, such as the early 1980s, by high returns.
H: What the evidence shows
- CAPE has had a meaningful negative relationship with **subsequent ten-year real returns** in the US and many other markets.
- Its link with returns over the next one or two years is weak.
- High CAPE readings can persist for many years; the US was above its long-run average for most of the period after 1990.
- The inverse of CAPE, the cyclically adjusted earnings yield, gives a rough guide to long-run real returns.
- Markets differ: UK and other markets have often traded on lower CAPEs than the US, partly because of different sector mixes.
H: Criticisms
- **Accounting changes**, such as stricter write-down rules, may have depressed reported earnings and so pushed CAPE up (Siegel, 2016).
- Lower interest rates may justify higher valuations than in the past.
- Changes in payout policy and the sector mix of indices affect comparisons over time.
- It says nothing about when prices will change, so using it to move in and out of markets has often failed.
- It is best used to set realistic expectations rather than to time trades.
X: Calculating CAPE (illustrative figures).
> An index stands at 4,000.
> Its earnings over the last ten years, adjusted to today's prices, average 160 index points a year.
> CAPE = 4,000 ÷ 160 = 25, and the cyclically adjusted earnings yield is 1 ÷ 25 = 4%.
> This suggests modest long-run real returns, but gives no signal about next year.
K: CAPE divides a market's real price by its ten-year average real earnings; high values have historically been followed by lower long-run returns, but it is a poor guide to short-term timing.
!: Selling all shares because CAPE is above average. CAPE has stayed high for long periods, and investors who left the market on that basis alone often missed years of gains.
EV: established | High CAPE ratios have historically been associated with lower subsequent ten-year real equity returns in the US (Campbell and Shiller, 1998).
EV: contested | Whether today's CAPE levels should be compared with the long-run average, given changes in accounting and interest rates, is debated (Siegel, 2016).
T: CAPE | Real price divided by the average of the last ten years of real earnings
T: Real earnings | Earnings adjusted for inflation to today's prices
T: Cyclically adjusted earnings yield | The inverse of CAPE, a rough guide to long-run real returns
SUM: CAPE smooths earnings over ten years.
SUM: High CAPE has meant lower long-run returns.
SUM: It is not a timing tool.
SRC: Campbell J. Y. and Shiller R. J., Valuation ratios and the long-run stock market outlook, Journal of Portfolio Management 24(2) | primary | 1998
SRC: Shiller R. J., Irrational Exuberance, Princeton University Press | secondary | 2000
SRC: Siegel J. J., The Shiller CAPE ratio: a new look, Financial Analysts Journal 72(3) | primary | 2016
Q: How many years of earnings does CAPE average? | Ten years of inflation-adjusted earnings.
Q: What has a high CAPE historically suggested? | Lower than average real returns over the following ten years.
M1#investing-u06-12-q1@1: Why does CAPE use ten years of average earnings instead of last year's earnings? | To smooth out the effect of booms and recessions on profits | To include only the most recent and accurate profit data | To make the ratio match the dividend yield of the index | To remove the effect of share prices from the calculation | Averaging over a decade irons out cyclical highs and lows in earnings.
NUM2#investing-u06-12-q2@2: A stock market index stands at 5,600 and its average real earnings over the past ten years are 175 index points. What is its CAPE? | 32 | 0.01 | times | CAPE = 5,600 ÷ 175 = 32, which corresponds to a cyclically adjusted earnings yield of about 3.1%.
M2#investing-u06-12-q3@2: Over which horizon has CAPE had the strongest link with subsequent market returns? | About ten years | About one month | About one year | About one week | CAPE's predictive power is weak over short periods and strongest over long horizons such as a decade.
M3#investing-u06-12-q4@3: An investor sees the US CAPE well above its long-run average. What is the most sensible response? | Expect lower long-run returns and keep a diversified plan, not trade on it | Sell all shares at once and wait in cash for the CAPE to fall | Borrow money to buy more shares, since high CAPE means momentum | Ignore valuation entirely, as CAPE has no link with returns | High CAPE suggests tempering expectations, but it is a poor timing signal and can stay high for years.
SA3#investing-u06-12-q5@2,3: Evaluate the CAPE ratio as a guide for long-term investors. | CAPE smooths earnings over ten years and has historically had a meaningful link with long-run real returns, so it helps investors set realistic expectations and compare valuation between markets. However, its short-term predictive power is weak, high readings have persisted for many years, and changes in accounting, interest rates and index composition may make comparisons with the past misleading. It is therefore most useful for planning expected returns and diversification, not for timing the market. | Smoothing and long-run link ; Setting expectations and comparing markets ; Weak timing power and persistence ; Structural criticisms

## Growth and value investing
LV: Intermediate · Evaluation
S: Growth and value are two broad styles of choosing shares: one pays up for fast-growing companies, the other buys shares that look cheap on measures such as price-to-book and P/E. This lesson explains both, the historical value premium and the debate about why it exists and why it weakened.
O: Distinguish growth and value investing styles
O: Describe the evidence on the value premium
O: Evaluate risk-based and behavioural explanations of the value premium
H: Two styles
P: **Value investing** buys shares that are cheap relative to fundamentals, such as low price-to-book, low P/E or high dividend yield, in the tradition of Benjamin Graham. **Growth investing** buys companies expected to grow sales and earnings faster than average, accepting high multiples, in the tradition of Philip Fisher. Index providers split markets into value and growth indices using such measures. The two are not opposites in principle: Warren Buffett has argued that growth is simply one input into value, since any share is worth the present value of its future cash. But in practice the styles hold very different portfolios and have taken turns to lead.
H: The evidence
- Fama and French (1992) found that low price-to-book shares earned higher average returns than high price-to-book shares in the US from 1963 to 1990.
- A value premium was also found in many other countries, including the UK.
- From about 2007 to 2020, value performed poorly against growth, led by large technology companies.
- Value recovered strongly in 2021 and 2022 as interest rates rose.
- Over long periods the premium has been positive but very volatile, with long stretches of underperformance.
H: Why might a value premium exist?
- **Risk explanation**: value companies are often distressed or highly geared and do badly in recessions, so investors demand a higher return (Fama and French).
- **Behavioural explanation**: investors extrapolate past growth, overpaying for glamour shares and underpricing unloved ones (Lakonishok, Shleifer and Vishny, 1994).
- **Measurement explanation**: book value misses intangibles, so price-to-book may now misclassify companies.
- Low interest rates raise the value of distant cash flows, favouring growth shares, and rising rates do the reverse.
- If the premium is a reward for risk, it should persist; if it is a mispricing, it may shrink once widely known.
X: Two styles, one market (illustrative figures).
> Share G: P/E of 35, price-to-book of 9, expected earnings growth of 20% a year, no dividend.
> Share V: P/E of 8, price-to-book of 0.9, expected earnings growth of 1%, dividend yield of 6%.
> A value fund would likely hold V; a growth fund would likely hold G.
> Which proves the better investment depends on whether G's growth is delivered and whether V's problems are as bad as the price implies.
K: Value investing buys shares cheap on fundamentals and growth investing pays up for expected growth; value has earned a long-run premium but with long dry spells, and whether this reflects risk or mispricing is debated.
!: Treating growth and value as permanent winners or losers. Leadership between the styles has swung for long periods, so a balanced or global portfolio avoids betting heavily on one.
EV: established | Fama and French (1992) documented higher average returns for low price-to-book US shares between 1963 and 1990.
EV: contested | Whether the value premium is compensation for risk or the result of investor over-reaction remains unresolved (Fama and French, 1993; Lakonishok, Shleifer and Vishny, 1994).
T: Value investing | Buying shares that are cheap relative to fundamentals such as book value or earnings
T: Growth investing | Buying shares of companies expected to grow earnings faster than average
T: Value premium | The historical tendency of value shares to earn higher average returns than growth shares
SUM: Value buys cheap; growth pays for growth.
SUM: The value premium is real but volatile.
SUM: Risk and behaviour both claim to explain it.
SRC: Fama E. F. and French K. R., The cross-section of expected stock returns, Journal of Finance 47(2) | primary | 1992
SRC: Lakonishok J., Shleifer A. and Vishny R. W., Contrarian investment, extrapolation, and risk, Journal of Finance 49(5) | primary | 1994
SRC: Fisher P. A., Common Stocks and Uncommon Profits, Harper and Brothers | primary | 1958
Q: Give two measures commonly used to identify value shares. | Low price-to-book and low price-to-earnings ratios (also high dividend yield).
Q: What is the behavioural explanation of the value premium? | Investors extrapolate past growth, overpaying for glamour shares and underpricing unloved ones.
M1#investing-u06-13-q1@1: Which share is most likely to be classed as a value share? | One with a low price-to-book ratio and a high dividend yield | One with a high P/E ratio and rapid expected sales growth | One with no profits that is investing heavily for expansion | One whose share price has doubled over the past year | Value is defined by cheapness relative to fundamentals, such as low P/B and P/E.
MATCH2#investing-u06-13-q2@2: Match each idea to the person or researchers most associated with it. | Buying below intrinsic value with a margin of safety = Benjamin Graham ; Investing in outstanding growth companies for the long term = Philip Fisher ; Value premium as a reward for distress risk = Fama and French ; Value premium from investor extrapolation = Lakonishok, Shleifer and Vishny | These names represent the main traditions in the growth and value debate.
M2#investing-u06-13-q3@2: Why did rising interest rates in 2022 tend to favour value shares over growth shares? | Growth shares' value depends more on distant cash flows, which are hit hardest by higher discount rates | Value companies are banned from borrowing money, so rate rises cannot affect them | Higher rates automatically raise the dividends that every value company pays | Growth companies are required by law to pay higher interest on their debts | Distant cash flows lose more present value when discount rates rise, which hurts long-duration growth shares most.
M3#investing-u06-13-q4@3: An investor reads that value shares underperformed growth for over a decade and concludes the value premium is gone. What is the best evaluation? | It may have shrunk, but long dry spells occurred before, so one decade is not proof | It is definitely gone, so value shares should never be held again | It proves that the original research by Fama and French was false | It shows that value shares always outperform in the following decade | The premium has always been volatile; a long underperformance is consistent with both a smaller premium and bad luck.
SA3#investing-u06-13-q5@2,3: Evaluate the risk-based and behavioural explanations for the value premium. | The risk-based explanation, linked to Fama and French, argues that value companies are often distressed or highly geared and do badly in bad times, so investors demand higher returns for holding them; if so, the premium should persist. The behavioural explanation, from Lakonishok, Shleifer and Vishny, argues that investors over-extrapolate past growth, overpaying for glamour shares and underpricing unloved ones; if so, the premium could shrink as it becomes known. The evidence is mixed: value shares do not always fall more in recessions, but mispricing may also persist because of limits to arbitrage. Both may play a part. | Risk explanation ; Behavioural explanation ; Implications for persistence ; Mixed evidence and balanced judgement

## The limits of valuation
LV: Intermediate · Evaluation
S: Every valuation method rests on uncertain forecasts and assumptions, and markets can stay away from estimated value for long periods. This lesson explains sensitivity to inputs, model and behavioural limits, and how investors can use valuation sensibly without overconfidence.
O: Explain why valuations are highly sensitive to their inputs
O: Describe the main practical and behavioural limits of valuation
O: Evaluate how a private investor should use valuation
H: Sensitive inputs
P: A valuation is only as good as its **assumptions** about growth, margins, investment and the discount rate, and small changes in these can transform the result. In a Gordon-type model the value depends on the gap between the required return and growth, so an extra percentage point of growth can raise the value by half or more. Forecasts are also biased: analysts' long-term growth estimates have tended to be too optimistic. And the future contains events no model includes, such as new technology, regulation or a pandemic. John Maynard Keynes compared the stock market to a beauty contest, in which investors try to guess what others will think rather than what a business is worth, which helps explain why prices can stay far from any estimate of value.
H: Practical and behavioural limits
- **Model risk**: different reasonable methods can give very different answers for the same company.
- **Anchoring and confirmation bias**: analysts may start from the current price and seek evidence that supports their view.
- **Efficient markets**: if prices already reflect public information, finding mispricing is hard and costly.
- **Limits to arbitrage**: even when mispricing exists, it can widen before it closes, and investors may run out of patience or money.
- **Accounting quality**: reported figures can be flattered by adjustments or aggressive policies.
H: Using valuation sensibly
- Work with **ranges** and **scenarios** rather than single target prices.
- Use **reverse valuation**: ask what growth the current price implies, then judge whether it is plausible.
- Insist on a **margin of safety** before acting on an estimate.
- Combine methods and check the results against each other.
- For most private investors, valuation is best used to avoid paying absurd prices and to set realistic return expectations, alongside diversification and low costs.
X: Sensitivity in action (illustrative figures).
> A share is expected to pay a dividend of 10p next year, and investors require 8%.
> With growth of 5%: value = 10 ÷ (0.08 − 0.05) = 333p.
> With growth of 6%: value = 10 ÷ (0.08 − 0.06) = 500p.
> One extra point of growth raises the value by 50%, so a precise target price would give false confidence.
K: Valuations are highly sensitive to uncertain inputs and are subject to model, behavioural and market limits, so investors should use ranges, reverse valuation and a margin of safety rather than trusting a single number.
!: Believing a detailed spreadsheet model makes a valuation accurate. Precision in calculation does not remove uncertainty in the assumptions.
EV: established | Analysts' long-term earnings growth forecasts have been found to be systematically over-optimistic on average (Chan, Karceski and Lakonishok, 2003).
EV: contested | How far markets are efficient, and so how much skilled valuation can add after costs, remains disputed.
T: Sensitivity analysis | Testing how a valuation changes when its key inputs are varied
T: Reverse valuation | Working out what assumptions the current price implies
T: Limits to arbitrage | Constraints, such as cost and risk, that stop investors correcting mispricing quickly
SUM: Small input changes cause big value changes.
SUM: Models, biases and markets all limit valuation.
SUM: Use ranges, reverse valuation and a margin of safety.
SRC: Keynes J. M., The General Theory of Employment, Interest and Money, Macmillan, chapter 12 | primary | 1936
SRC: Chan L. K. C., Karceski J. and Lakonishok J., The level and persistence of growth rates, Journal of Finance 58(2) | primary | 2003
SRC: Shleifer A. and Vishny R. W., The limits of arbitrage, Journal of Finance 52(1) | primary | 1997
Q: What is reverse valuation? | Working out what growth or other assumptions the current price implies, then judging whether they are plausible.
Q: What did Keynes compare the stock market to? | A beauty contest, where people guess what others will think rather than judge value directly.
M1#investing-u06-14-q1@1: Why can two careful analysts reach very different values for the same share? | Small differences in growth and discount rate assumptions change the result greatly | One of them must have made an arithmetic error in the model | Accounting rules require each analyst to use a different method | Share values are fixed by the exchange and analysts guess them | Valuations are highly sensitive to inputs that are uncertain and require judgement.
NUM2#investing-u06-14-q2@2: A share is expected to pay a 10p dividend next year and investors require 8%. By what percentage does its Gordon model value rise if expected growth increases from 5% to 6%? | 50 | 0.5 | % | Value rises from 10 ÷ 0.03 = 333.3p to 10 ÷ 0.02 = 500p, an increase of 50%.
M2#investing-u06-14-q3@2: What is meant by the limits to arbitrage? | Mispricing can persist because correcting it is costly and risky | Investors are legally banned from buying underpriced shares | Arbitrage is only permitted on government bonds in the UK | Prices always correct instantly, leaving no profit to be made | Shleifer and Vishny showed that mispricing can widen before it closes, deterring arbitrageurs.
M3#investing-u06-14-q4@3: Which is the most sensible way for a private investor to use valuation? | To avoid extreme prices and set realistic expectations, alongside diversification | To pick a precise target price and trade each time the market crosses it | To ignore it completely, because no valuation method contains any information | To concentrate the whole portfolio in the single cheapest share in the market | Valuation is a useful guide for expectations and avoiding overpaying, but too uncertain for precise trading rules.
SA3#investing-u06-14-q5@1,3: Evaluate the claim that valuation models are of little use because their inputs are so uncertain. | It is true that valuations are very sensitive to growth and discount rate assumptions, forecasts are often biased, and markets can stay away from estimated value for years. However, models make assumptions explicit, allow reverse valuation of what a price implies, and help investors avoid paying extreme prices. Used with ranges, scenarios and a margin of safety, valuation remains useful for setting realistic expectations. The claim is therefore too strong: models are limited, but not useless. | Sensitivity and bias ; Persistence of mispricing ; Value of explicit assumptions and reverse valuation ; Balanced conclusion
`;
