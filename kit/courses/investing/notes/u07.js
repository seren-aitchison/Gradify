// InvestorGradify Investing, School 7: Interpreting Financial Statements and Group Accounts. Reused from FinanceGradify Accounting and Finance School 4 (kit/courses/finance/notes/u04.js)
// by scripts/borrow-school.mjs on 2026-11-12; question ids are this course's own. Review state as qa.js records.
// FinanceGradify Interpreting Financial Statements and Group Accounts (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Why analyse financial statements?
LV: Intermediate · Foundation
S: Financial statement analysis turns published figures into information users can act on. This lesson explains who analyses accounts and why, the main techniques (ratios, trends and common-size statements), and the importance of comparison.
O: Identify the users of financial analysis and their information needs
O: Describe the main analytical techniques: ratios, horizontal and vertical analysis
O: Explain why comparisons over time and with other entities are essential
PRE: The Conceptual Framework for Financial Reporting
H: Users and their questions
- **Investors**: is the company profitable, and will it pay dividends and grow?
- **Lenders**: can it pay interest and repay loans? Is it too highly geared?
- **Suppliers**: will it pay on time?
- **Employees**: is the business secure?
- **Management**: where can performance improve?
- **Government and regulators**: tax, competition, public interest.
H: Techniques
- **Ratio analysis**: relating figures to each other, such as profit to revenue or current assets to current liabilities.
- **Horizontal (trend) analysis**: comparing figures across years, often as percentage changes.
- **Vertical (common-size) analysis**: expressing each line as a percentage of revenue or total assets, so companies of different sizes can be compared.
- **Cash flow analysis** and reading the **narrative report** and notes.
H: The need for comparison
P: A single ratio means little on its own. Compare with:
- **Previous years** (trend).
- **Competitors** or **industry averages** (benchmarking).
- **Budgets or targets**.
X: Horizontal analysis of revenue.
> Revenue: Year 1 £2.0m; Year 2 £2.3m; Year 3 £2.2m.
> Year 2 growth: (2.3 − 2.0) ÷ 2.0 = 15%.
> Year 3 change: (2.2 − 2.3) ÷ 2.3 = −4.3%.
> The trend raises questions: was Year 2 boosted by a one-off contract, or has demand fallen?
K: Analysis serves different users' decisions; ratios, trends and common-size statements are the main tools, and figures only become meaningful when compared with previous years, competitors or targets.
!: Drawing conclusions from one ratio for one year. Ratios need context: the industry, the company's strategy, the economy and the trend over several years.
EV: established | Ratio analysis is a standard part of credit assessment, equity research and professional accountancy examinations.
EV: contested | Research on the usefulness of accounting ratios in predicting failure, such as Altman's Z-score (1968), shows good but imperfect accuracy.
T: Horizontal analysis | Comparing financial data across periods to identify trends
T: Vertical analysis | Expressing items as a percentage of a base figure, such as revenue, in the same period
T: Benchmarking | Comparing performance with competitors or industry averages
SUM: Different users ask different questions of accounts.
SUM: Ratios, trends and common-size analysis are the main techniques.
SUM: Comparison gives figures meaning.
SRC: ACCA, Financial Reporting (FR) syllabus and study guide | standard | 2025
SRC: Altman E. I., "Financial ratios, discriminant analysis and the prediction of corporate bankruptcy", Journal of Finance 23(4), 589–609 | primary | 1968
Q: What is vertical analysis? | Expressing each item as a percentage of a base figure, such as revenue, for the same period.
Q: Why does a supplier analyse a customer's accounts? | To judge whether the customer will be able to pay on time.
M1#investing-u07-15-q1@1: Which user is most interested in a company's ability to repay a loan? | A lender | A customer buying a single product | A local resident | A competitor's employees | Lenders focus on liquidity, cash flow, gearing and interest cover.
M2#investing-u07-15-q2@2: Profit rose from £400,000 to £460,000. What is the percentage increase? | 15% | 6% | 60% | 13% | Percentage change = change ÷ original: (460,000 − 400,000) ÷ 400,000 = 15%.
M3#investing-u07-15-q3@3: A company's gross margin is 25%. An analyst calls this poor. What is missing from the analysis? | Comparison with the company's previous years and with the industry | The company's registered office address | The name of the company's auditor | Nothing, because 25% is always a poor margin | Whether 25% is good depends on industry norms and the trend; supermarkets have low margins, software firms high ones.
TF1#investing-u07-15-q4@1: Common-size statements help compare companies of very different sizes. | true | Expressing items as percentages removes the effect of scale.
SA2#investing-u07-15-q5@2,3: Explain why ratios must be compared with other information to be useful. | A ratio on its own has no benchmark. Comparing with previous years shows whether performance is improving or worsening; comparing with competitors or industry averages shows relative performance; comparing with budgets shows whether targets were met. Context such as the economy, strategy changes or one-off items also affects interpretation. | Trend comparison ; Industry comparison ; Budget comparison ; Context

## Profitability ratios
LV: Intermediate · Application
S: Profitability ratios measure how well a company turns revenue and capital into profit. This lesson covers gross and operating margin, return on capital employed and asset turnover, with a worked example, and explains what drives each ratio.
O: Calculate gross margin, operating margin, ROCE and asset turnover
O: Explain the relationship between ROCE, margin and asset turnover
O: Interpret changes in profitability ratios
PRE: Why analyse financial statements?
H: The ratios
E: Gross margin = gross profit ÷ revenue × 100
E: Operating margin = operating profit (PBIT) ÷ revenue × 100
E: ROCE = operating profit ÷ capital employed × 100 :: capital employed = equity + non-current liabilities
E: Asset turnover = revenue ÷ capital employed
E: ROCE = operating margin × asset turnover
X: A company (£000): revenue 2,000; cost of sales 1,200; operating expenses 500; equity 1,500; non-current loan 500.
> Gross profit = 2,000 − 1,200 = 800; gross margin = 40%.
> Operating profit = 800 − 500 = 300; operating margin = 15%.
> Capital employed = 1,500 + 500 = 2,000; ROCE = 300 ÷ 2,000 = 15%.
> Asset turnover = 2,000 ÷ 2,000 = 1.0 times. Check: 15% × 1.0 = 15%.
P: Always use the same definition of profit and capital employed across years and companies; using profit before or after tax, or including short-term debt, changes the answer.
H: What drives them
- **Gross margin**: selling prices, purchase costs, sales mix, discounts, inventory write-downs.
- **Operating margin**: also overheads such as wages, rent, marketing and depreciation.
- **Asset turnover**: how intensively assets are used; new investment may lower it until it generates revenue.
- **ROCE**: compare with the cost of borrowing; if ROCE is below the interest rate, borrowing to expand destroys value.
K: Margins show profit per pound of revenue; ROCE shows profit per pound of capital and equals margin times asset turnover; analyse which driver changed.
!: Comparing ROCE across companies that calculate capital employed differently. Check definitions, and note that revaluations or old, heavily depreciated assets can distort ROCE.
EV: established | ROCE and its decomposition into margin and turnover (the DuPont approach) are standard in financial analysis.
EV: contested | Using book values for capital employed can make companies with old, depreciated assets look more profitable than they are.
T: Gross margin | Gross profit as a percentage of revenue
T: ROCE | Return on capital employed: operating profit as a percentage of equity plus non-current liabilities
T: Asset turnover | Revenue divided by capital employed, showing how efficiently capital generates sales
SUM: Gross and operating margins measure profit per pound of revenue.
SUM: ROCE = margin × asset turnover.
SUM: Look for the driver of each change.
SRC: ACCA, Financial Reporting (FR) syllabus and study guide | standard | 2025
SRC: Elliott B. and Elliott J., Financial Accounting and Reporting, Pearson | secondary | 2019
Q: How is ROCE calculated? | Operating profit divided by capital employed (equity plus non-current liabilities), times 100.
Q: What two ratios multiply to give ROCE? | Operating margin and asset turnover.
M1#investing-u07-16-q1@1: Revenue is £500,000 and gross profit is £150,000. What is the gross margin? | 30% | 15% | 50% | 3.3% | Gross margin = gross profit ÷ revenue: 150,000 ÷ 500,000 = 30%.
M2#investing-u07-16-q2@2: A company's gross margin fell from 42% to 36% while revenue rose. Which is the most likely explanation? | Price cuts to win sales, or higher purchase costs | Higher administrative salaries paid to head-office staff | An increase in the interest rate on its bank loans | A larger dividend paid to shareholders this year | Gross margin reflects prices and cost of sales, not overheads, interest or dividends.
M3#investing-u07-16-q3@3: A company has an operating margin of 10% and asset turnover of 1.8. A rival has a margin of 20% and turnover of 0.8. Which has the higher ROCE? | The first, with ROCE of 18% against 16% | The second, because it has the higher margin | They are equal at 18% each | It can't be calculated from these figures | ROCE = margin × turnover: 10% × 1.8 = 18%; 20% × 0.8 = 16%.
NUM2#investing-u07-16-q4@2: Operating profit is £450,000; equity is £2,000,000 and non-current liabilities £1,000,000. What is ROCE, in per cent? | 15 | 1% | % | Capital employed = 3,000,000; ROCE = 450,000 ÷ 3,000,000 = 15%.
SA2#investing-u07-16-q5@2,3: Explain why a company's ROCE might fall even though its profit has increased. | ROCE divides operating profit by capital employed. If the company raises new capital, for example by borrowing or issuing shares to buy new assets, capital employed may rise faster than profit, particularly if the investment hasn't yet generated full revenue. Revaluing assets upwards also increases capital employed. So ROCE can fall despite higher profit. | ROCE formula ; New investment raises capital employed ; Time lag before returns ; Revaluations

## Liquidity ratios
LV: Intermediate · Application
S: Liquidity ratios show whether a company can meet its short-term obligations. This lesson covers the current ratio and the quick (acid test) ratio, how to interpret them in different industries, and why a profitable company can still fail for lack of cash.
O: Calculate the current ratio and quick ratio
O: Interpret liquidity ratios in the context of the industry
O: Explain why profitable businesses can fail through poor liquidity
PRE: Profitability ratios
H: The ratios
E: Current ratio = current assets ÷ current liabilities
E: Quick ratio = (current assets − inventories) ÷ current liabilities
X: Using the company from the previous lesson (£000).
> Current assets: inventories 300, receivables 400, cash 100 = 800. Current liabilities: 400.
> Current ratio = 800 ÷ 400 = 2.0.
> Quick ratio = (800 − 300) ÷ 400 = 1.25.
> Both suggest the company can meet short-term debts, though receivables must be collected.
H: Interpretation
- There is **no single ideal**: textbooks once cited 2:1 for the current ratio and 1:1 for the quick ratio, but norms vary by industry.
- **Supermarkets** often have current ratios below 1, because they sell inventory for cash quickly and pay suppliers later.
- A **very high** ratio can mean idle cash or excess inventory, which earns little.
- A **falling** trend can signal trouble.
H: Profit is not cash
P: A business can be profitable yet run out of cash if customers pay slowly, inventories build up, or it spends heavily on assets or repays loans. Overtrading, growing too fast without enough working capital, is a common cause of failure.
K: The current and quick ratios measure short-term liquidity; norms depend on the industry, and both very low and very high ratios can signal problems.
!: Treating the quick ratio as always more reliable. It excludes inventory, but receivables may also be slow or doubtful; check receivables days and cash flows too.
EV: established | Liquidity ratios are used in credit analysis and loan covenants.
EV: established | Overtrading is a widely recognised cause of business failure among growing firms.
T: Current ratio | Current assets divided by current liabilities
T: Quick ratio | Current assets less inventories, divided by current liabilities
T: Overtrading | Expanding sales faster than the working capital needed to support them
SUM: Current ratio = CA ÷ CL; quick ratio excludes inventories.
SUM: Norms vary by industry.
SUM: Profitable firms can fail through poor liquidity.
SRC: ACCA, Financial Reporting (FR) syllabus and study guide | standard | 2025
SRC: Elliott B. and Elliott J., Financial Accounting and Reporting, Pearson | secondary | 2019
Q: Why are inventories excluded from the quick ratio? | They are the least liquid current asset and may take time to sell.
Q: What is overtrading? | Growing sales faster than the working capital available to support them.
M1#investing-u07-17-q1@1: Current assets are £600,000 and current liabilities £400,000. What is the current ratio? | 1.5 | 0.67 | 2.0 | 1.0 | Current ratio = current assets ÷ current liabilities: 600,000 ÷ 400,000 = 1.5.
M2#investing-u07-17-q2@2: A supermarket has a current ratio of 0.7. What is the best interpretation? | This can be normal: supermarkets sell for cash quickly and pay suppliers later | The supermarket must be about to fail within the year | Supermarkets must always keep a current ratio of 2:1 | The ratio must have been calculated wrongly by the analyst | Low ratios are common in retail where inventory turns over fast and sales are for cash.
M3#investing-u07-17-q3@3: A fast-growing company reports record profits but can't pay its suppliers. What is the most likely cause? | Overtrading: cash is tied up in receivables and inventory as sales grow | Its profits must have been calculated incorrectly | It has too much cash in the bank | Its gross margin is too high | Rapid growth can consume working capital faster than profits generate cash.
NUM2#investing-u07-17-q4@2: Current assets are £900,000, including inventories of £350,000. Current liabilities are £500,000. What is the quick ratio? | 1.1 | 1% | :1 | (900,000 − 350,000) ÷ 500,000 = 1.1.
SA2#investing-u07-17-q5@2,3: Explain why a very high current ratio is not necessarily a good sign. | A very high ratio may mean the company holds excess inventory, which risks obsolescence and storage costs, or large receivables that customers are slow to pay, or idle cash earning little return. Resources tied up in current assets could be invested more profitably. Liquidity should be enough to meet obligations without wasting resources. | Excess inventory ; Slow receivables ; Idle cash ; Opportunity cost

## Efficiency ratios and the working capital cycle
LV: Intermediate · Application
S: Efficiency ratios show how quickly a business turns inventory into sales, collects cash from customers and pays suppliers. This lesson covers inventory, receivables and payables days, and the working capital (cash operating) cycle.
O: Calculate inventory days, receivables days and payables days
O: Calculate and interpret the working capital cycle
O: Suggest ways a business could shorten its working capital cycle
PRE: Liquidity ratios
H: The ratios
E: Inventory days = inventories ÷ cost of sales × 365
E: Receivables days = trade receivables ÷ revenue × 365 :: credit sales if available
E: Payables days = trade payables ÷ cost of sales × 365 :: credit purchases if available
E: Working capital cycle = inventory days + receivables days − payables days
X: Using the earlier company (£000): inventories 300, receivables 400, payables 300, cost of sales 1,200, revenue 2,000.
> Inventory days = 300 ÷ 1,200 × 365 = 91 days.
> Receivables days = 400 ÷ 2,000 × 365 = 73 days.
> Payables days = 300 ÷ 1,200 × 365 = 91 days.
> Working capital cycle = 91 + 73 − 91 = 73 days: cash is tied up for about 10 weeks.
P: Where credit sales and credit purchases are given, use them instead of revenue and cost of sales, because cash sales and purchases don't create receivables or payables.
H: Interpretation and management
- **Long inventory days**: slow-moving or obsolete stock; but may be deliberate for seasonal goods.
- **Long receivables days**: poor credit control or customer difficulties; compare with credit terms.
- **Long payables days**: the company uses suppliers' credit, which helps cash but may damage relationships or reflect cash shortage.
- **Shortening the cycle**: just-in-time inventory, invoice promptly, offer early-payment discounts, chase debts, factoring, negotiate longer supplier terms.
K: Inventory, receivables and payables days measure working capital efficiency; the cycle shows how long cash is tied up, and shortening it frees cash.
!: Using year-end balances without considering seasonality. A year-end at a quiet point may make inventory or receivables look unusually low; averages give a better picture.
EV: established | Working capital ratios are standard tools in financial analysis and treasury management.
EV: established | The UK's Payment Practices Reporting regulations (2017, extended) require large companies to publish their payment times to suppliers.
T: Receivables days | The average time customers take to pay
T: Payables days | The average time the business takes to pay suppliers
T: Working capital cycle | The time between paying for inputs and receiving cash from customers
SUM: Inventory, receivables and payables days measure efficiency.
SUM: Cycle = inventory days + receivables days − payables days.
SUM: A shorter cycle frees cash.
SRC: ACCA, Financial Reporting (FR) syllabus and study guide | standard | 2025
SRC: Department for Business and Trade, Reporting on payment practices and performance | guidance | 2024 | https://www.gov.uk/government/publications/business-payment-practices-and-performance-reporting-requirements
Q: How is the working capital cycle calculated? | Inventory days plus receivables days minus payables days.
Q: Give two ways to shorten receivables days. | Any two of: invoice promptly, chase overdue debts, offer early-payment discounts, tighten credit checks, use factoring.
M1#investing-u07-18-q1@1: Revenue is £730,000 and receivables are £100,000. What are receivables days? | 50 days | 73 days | 36.5 days | 100 days | Receivables days = receivables ÷ revenue × 365: 100,000 ÷ 730,000 × 365 = 50 days.
M2#investing-u07-18-q2@2: Inventory days rose from 40 to 75 while sales were flat. What is the most likely concern? | Slow-moving or obsolete inventory tying up cash | Customers paying faster than before | Suppliers being paid too quickly | A fall in interest rates | More inventory relative to cost of sales means stock is sitting longer.
M3#investing-u07-18-q3@3: A company extends its payables days from 30 to 120 to improve its cash. What is the main risk? | Damaged supplier relationships, loss of discounts or supply, and possible reputational harm | No risk at all, because delaying payment is always beneficial | Customers will immediately stop buying from the company | The current ratio will automatically fall to zero | Stretching suppliers improves cash short term but may harm relationships and signal distress.
NUM2#investing-u07-18-q4@2: Inventory days are 60, receivables days 45 and payables days 40. What is the working capital cycle, in days? | 65 | 0 | days | 60 + 45 − 40 = 65 days.
SA2#investing-u07-18-q5@2,3: Suggest and evaluate ways a manufacturer could reduce its working capital cycle. | It could reduce inventory through just-in-time ordering or better forecasting, cutting storage and obsolescence but risking stock-outs; collect receivables faster by invoicing promptly, chasing debts or offering discounts, though discounts reduce profit; or negotiate longer supplier terms, improving cash but risking relationships. Factoring speeds cash at a cost. The best mix balances cash benefits against costs and risks. | Inventory reduction ; Faster collection ; Longer payables ; Evaluation of costs and risks

## Gearing and investor ratios
LV: Intermediate · Application
S: Gearing ratios show how far a company is financed by debt, and investor ratios show returns to shareholders. This lesson covers gearing, interest cover, EPS, P/E ratio, dividend yield and dividend cover.
O: Calculate gearing and interest cover and explain financial risk
O: Calculate EPS, the price/earnings ratio, dividend yield and dividend cover
O: Interpret gearing and investor ratios from the viewpoints of lenders and shareholders
PRE: Profitability ratios
H: Gearing
E: Gearing = debt ÷ (debt + equity) × 100 :: debt includes long-term borrowings; some analysts include lease liabilities and overdrafts
E: Interest cover = operating profit ÷ finance costs
P: **High gearing** magnifies returns to shareholders when profits are good but increases **financial risk**: interest must be paid whatever the results.
H: Investor ratios
E: EPS = profit attributable to ordinary shareholders ÷ number of ordinary shares
E: P/E ratio = share price ÷ EPS
E: Dividend yield = dividend per share ÷ share price × 100
E: Dividend cover = EPS ÷ dividend per share
X: Using the earlier company (£000): debt 500, equity 1,500, operating profit 300, finance costs 60, profit after tax 180; 1,000,000 shares at £2.70; dividends £72,000.
> Gearing = 500 ÷ 2,000 = 25%. Interest cover = 300 ÷ 60 = 5 times.
> EPS = 180,000 ÷ 1,000,000 = 18p. P/E = 270 ÷ 18 = 15.
> Dividend per share = 7.2p; dividend yield = 7.2 ÷ 270 = 2.7%.
> Dividend cover = 18 ÷ 7.2 = 2.5 times.
H: Interpretation
- **Lenders** prefer low gearing and high interest cover.
- A **high P/E** suggests the market expects strong growth (or the share is overpriced).
- **Dividend cover** shows how safe the dividend is; low cover means little is retained.
K: Gearing and interest cover measure financial risk; EPS, P/E, dividend yield and dividend cover show returns and market expectations for shareholders.
!: Assuming high gearing is always bad. Debt is often cheaper than equity and can raise returns to shareholders; the risk depends on the stability of profits and cash flows.
EV: established | Gearing and interest cover are common in loan covenants and credit ratings.
EV: contested | Whether there is an optimal capital structure is debated in finance theory (Modigliani and Miller, 1958, and later work).
T: Gearing | The proportion of a company's long-term finance provided by debt
T: Interest cover | Operating profit divided by finance costs
T: P/E ratio | Share price divided by earnings per share
SUM: Gearing and interest cover measure financial risk.
SUM: EPS, P/E, dividend yield and cover measure shareholder returns.
SUM: Interpretation depends on the user and the stability of profits.
SRC: ACCA, Financial Reporting (FR) syllabus and study guide | standard | 2025
SRC: Modigliani F. and Miller M. H., "The cost of capital, corporation finance and the theory of investment", American Economic Review 48(3), 261–297 | primary | 1958
Q: How is interest cover calculated? | Operating profit divided by finance costs.
Q: What does a high P/E ratio suggest? | That the market expects strong future earnings growth, or that the share may be overvalued.
M1#investing-u07-19-q1@1: Debt is £3m and equity is £9m. What is gearing using debt ÷ (debt + equity)? | 25% | 33% | 75% | 300% | Gearing = debt ÷ (debt + equity) = 3 ÷ (3 + 9) = 3 ÷ 12 = 25%.
M2#investing-u07-19-q2@2: A company's interest cover fell from 8 times to 1.5 times. What concerns a lender most? | Profits barely cover interest, so a small fall in profit could mean default | The company is now paying too little interest on its debt | Dividends to shareholders must have increased sharply | Gearing has fallen to zero as debt was repaid | Low interest cover means little margin of safety for paying interest.
M3#investing-u07-19-q3@3: Two companies have the same operating profit, but one is highly geared. Profits then fall sharply in a recession. What happens to the highly geared company's shareholders? | Their earnings fall proportionately more, because interest must still be paid | Their earnings are protected by the debt | Their earnings fall less than the other company's | Gearing has no effect on shareholders' earnings | Fixed interest magnifies changes in operating profit for shareholders: financial leverage.
NUM2#investing-u07-19-q4@2: EPS is 24p and the share price is £3.60. What is the P/E ratio? | 15 | 1% | times | P/E = share price ÷ EPS = 360 ÷ 24 = 15.
SA2#investing-u07-19-q5@2,3: Explain why shareholders and lenders may view high gearing differently. | Shareholders may welcome higher gearing if the return on capital exceeds the cost of debt, because extra profit after interest goes to them, raising EPS and return on equity. Lenders see higher gearing as greater risk of default, especially if profits are volatile, and may charge higher interest or impose covenants. Both recognise that high gearing increases the variability of returns. | Shareholders: leverage effect ; Lenders: default risk ; Volatility of profits ; Covenants or interest cost

## Interpreting ratios in context
LV: Intermediate · Evaluation
S: Ratios are only useful when interpreted in context. This lesson shows how to write a structured interpretation, linking ratios to the business, its industry and events in the year, and how to reach a balanced conclusion.
O: Link changes in ratios to events and business decisions
O: Compare a company with competitors and industry norms
O: Write a balanced interpretation of financial performance and position
PRE: Gearing and investor ratios
H: A structured approach
- **1. Understand the business**: industry, strategy, size, events in the year (acquisitions, new products, economic changes).
- **2. Calculate relevant ratios** for profitability, liquidity, efficiency and gearing.
- **3. Compare** with previous years and competitors.
- **4. Explain** the likely causes, using information in the narrative report and notes.
- **5. Link** ratios together: for example, a price cut may lower margin but raise asset turnover.
- **6. Conclude** with a balanced judgement and any further information needed.
X: Interpreting a year of expansion (£000).
> Revenue rose 30% after opening new stores; operating margin fell from 12% to 9%.
> ROCE fell from 18% to 13% because a new £5m loan increased capital employed and gearing rose from 20% to 40%.
> Receivables days unchanged; inventory days rose as new stores were stocked.
> Interpretation: short-term dip consistent with expansion; ROCE should recover if the new stores mature, but higher gearing raises risk.
P: Ratios are signals, not answers: a change prompts questions that the narrative report, notes and wider information about the business can help answer.
H: Good practice
- Explain **why**, not just what: "margin fell because" rather than "margin fell by 3 points".
- Use **evidence** from the case: new contracts, price changes, one-off items.
- Consider **alternative explanations** and say what extra information would help.
K: Good interpretation explains the causes of ratio changes, links ratios together, compares with others and reaches a balanced conclusion supported by evidence.
!: Listing ratios and saying only whether each went up or down. Examiners and users need explanations of why ratios changed and what this means for the business.
EV: established | Professional accountancy exams reward explanation and linkage over calculation alone.
EV: contested | How far ratio analysis can predict future performance, rather than describe the past, is limited by changing conditions.
T: Interpretation | Explaining the causes and implications of financial results
T: Linkage | Connecting changes in different ratios to a common cause
SUM: Understand the business first.
SUM: Compare, explain and link ratios.
SUM: Reach a balanced, evidenced conclusion.
SRC: ACCA, Financial Reporting (FR) syllabus and study guide | standard | 2025
SRC: AQA, A level Accounting specification 7127 | standard | 2017
Q: What does "linkage" mean in ratio interpretation? | Connecting changes in different ratios to a common cause, such as an expansion affecting margins, ROCE and gearing.
Q: Why should an interpretation consider events in the year? | They often explain changes in ratios, such as acquisitions, price changes or new financing.
M1#investing-u07-20-q1@1: What should an analyst do first when interpreting ratios? | Understand the business, its industry and events in the year | Calculate as many ratios as possible | Ignore the narrative report | Compare only with the previous year | Context shapes what ratios mean: the same ratio can be healthy in one industry and worrying in another.
M2#investing-u07-20-q2@2: A company cut prices to win market share. Revenue rose, gross margin fell and asset turnover rose. What is the best interpretation? | The price cut traded margin for volume; the effect on ROCE depends on which effect is larger | The company is failing, because a fall in margin always means failure | Asset turnover can never rise when prices are cut | The ratios contradict each other, so one of them must be wrong | Margin and turnover can move in opposite directions from one decision.
M3#investing-u07-20-q3@3: ROCE fell after a large investment late in the year. Which further information would be most useful? | When the new assets were bought and when they will start generating revenue | The total number of shareholders on the share register | The age and background of the company's chairman | The design of the company's logo and branding | Investments made late in the year raise capital employed before producing a full year's profit.
TF1#investing-u07-20-q4@1: A good interpretation simply states whether each ratio increased or decreased. | false | It should explain causes, link ratios and reach a conclusion.
SA2#investing-u07-20-q5@3: A company's revenue and profit rose, but its current ratio fell from 1.8 to 0.9 and gearing doubled. Evaluate its performance and position. | Rising revenue and profit suggest good performance, perhaps from expansion. But the sharp fall in liquidity and higher gearing suggest the expansion was financed by debt and short-term borrowing, increasing financial risk. If cash flows from new activities are strong, the position may stabilise; if not, the company may struggle to meet obligations. More information on cash flows, debt terms and the purpose of borrowing is needed. | Positive performance ; Liquidity concern ; Gearing risk ; Balanced conclusion and further information

## Limitations of ratio analysis
LV: Intermediate · Evaluation
S: Ratio analysis is powerful but has important limitations. This lesson explains the main problems: differences in accounting policies, historical data, window dressing, one-off items, inflation and the difficulty of comparing companies.
O: Identify the main limitations of ratio analysis
O: Explain how accounting policies and estimates affect comparability
O: Evaluate the reliability of conclusions drawn from ratios
PRE: Interpreting ratios in context
H: Main limitations
- **Historical information**: accounts describe the past; conditions may have changed.
- **Different accounting policies and estimates**: cost versus revaluation, depreciation methods and lives, inventory formulas.
- **Year-end figures** may not be typical (seasonality) and may be **window dressed**, for example by delaying payments to suppliers to boost cash.
- **One-off items**: restructuring costs, gains on disposal.
- **Inflation**: historical cost figures may understate assets and overstate ROCE.
- **Different business models**: companies in the same industry may lease or own assets, outsource or manufacture, making comparison hard.
- **Non-financial factors**: customer satisfaction, staff morale, innovation and ESG aren't captured.
P: None of these limitations makes ratio analysis useless; they mean conclusions should be tentative and backed by other evidence.
H: Reducing the problems
- Read notes on accounting policies and adjust where possible.
- Use averages and several years of data.
- Separate one-off items.
- Combine ratios with cash flow analysis and narrative information.
X: Comparing two retailers' ROCE.
> Retailer A owns its stores at depreciated historical cost; Retailer B leases its stores.
> Before IFRS 16, B's leases were off-balance-sheet, flattering its ROCE.
> Under IFRS 16, B's lease liabilities and right-of-use assets are recognised, but differences in lease terms and discount rates remain.
> Adjusting for these differences gives a fairer comparison.
K: Ratios depend on accounting choices, year-end timing, one-off items and business models; analysts should adjust where possible and combine ratios with other information.
!: Treating ratios as precise measurements of performance. They are indicators that prompt questions; conclusions need support from other evidence.
EV: established | Differences in accounting policies are a recognised barrier to comparability, which standard-setters aim to reduce.
EV: established | Window dressing at year-end has been identified in research on bank balance sheets around reporting dates.
T: Window dressing | Arranging transactions around the year end to make the accounts look better
T: One-off item | An unusual or non-recurring income or expense that distorts comparisons
SUM: Ratios are historical and affected by accounting choices.
SUM: Year-end timing, one-off items and inflation distort them.
SUM: Use adjustments, averages, cash flows and narrative information.
SRC: ACCA, Financial Reporting (FR) syllabus and study guide | standard | 2025
SRC: IFRS Foundation, IAS 8 Accounting Policies, Changes in Accounting Estimates and Errors | standard | 2003 | https://www.ifrs.org/issued-standards/list-of-standards/ias-8-accounting-policies-changes-in-accounting-estimates-and-errors/
Q: What is window dressing? | Arranging transactions near the year end to make the accounts look better than usual.
Q: Why can inflation distort ROCE? | Historical cost assets may be understated, making capital employed low and ROCE appear high.
M1#investing-u07-21-q1@1: Which is a limitation of ratio analysis? | Accounts are based on historical information | Ratios can be calculated quickly | Ratios allow comparison over time | Ratios summarise large amounts of data | Historical data may not reflect current or future conditions.
M2#investing-u07-21-q2@2: Company A depreciates equipment over 5 years; Company B over 10 years. How might this affect comparison of their profitability? | B's profit may look higher because of a lower annual depreciation charge | Their profits are unaffected by depreciation policy | A's ROCE will always be higher | Depreciation affects only cash flow | Longer useful lives reduce annual depreciation, raising profit, though cash is unaffected.
M3#investing-u07-21-q3@3: A company's year-end cash balance is unusually high because it delayed supplier payments by two weeks. What is the main effect on analysis? | Liquidity ratios look better than the normal position, an example of window dressing | The company's true liquidity has permanently improved | Payables days will appear lower than usual | Profit has increased as a result | Delaying payments boosts year-end cash temporarily without improving the underlying position.
TF1#investing-u07-21-q4@1: Ratio analysis captures non-financial factors such as staff morale. | false | Ratios are based on financial data and don't measure non-financial factors directly.
SA2#investing-u07-21-q5@3: Evaluate how reliable ratio analysis is as a basis for an investment decision. | Ratios give a structured, comparable summary of performance and position. But they rely on historical data, are affected by accounting policies and estimates, can be distorted by year-end timing, one-off items and window dressing, and ignore non-financial factors. Reliability improves with several years of data, adjustment for policy differences, cash flow analysis and narrative information, but investment decisions also need forecasts and qualitative judgement. | Usefulness ; Limitations ; Ways to improve reliability ; Need for further information

## Analysing cash flows
LV: Intermediate · Application
S: Cash flow analysis shows whether a company generates enough cash to sustain itself and how it funds investment and returns to shareholders. This lesson covers free cash flow, cash conversion, interpreting the pattern of cash flows, and warning signs.
O: Calculate free cash flow and cash conversion
O: Interpret the pattern of operating, investing and financing cash flows
O: Identify warning signs in a statement of cash flows
PRE: Statement of cash flows
H: Key measures
E: Free cash flow = net cash from operating activities − capital expenditure
E: Cash conversion = cash generated from operations ÷ operating profit
P: Cash conversion near or above 100% suggests profits are turning into cash; much lower suggests working capital is absorbing cash or profit includes non-cash gains.
H: Reading the pattern
- **Healthy mature company**: strong operating inflow funds investment and dividends, with some debt repayment.
- **Growing company**: operating cash may be modest while heavy investment is funded by new borrowing or shares.
- **Struggling company**: weak or negative operating cash, asset sales to raise cash, new borrowing to pay dividends.
X: Comparing two years (£000).
> Year 1: operating cash 900; capital expenditure (600); dividends (200); free cash flow 300.
> Year 2: operating cash 250; capital expenditure (650); new loan 600; dividends (200).
> Free cash flow in Year 2 = 250 − 650 = −400, so the dividend was effectively funded by borrowing.
> Investigate why operating cash fell: rising receivables, inventory or falling profit?
H: Warning signs
- Operating cash consistently below operating profit.
- Dividends or buybacks funded by borrowing.
- Repeated sales of assets to cover operating shortfalls.
- Large changes in working capital around the year end.
K: Free cash flow and cash conversion show whether profits become cash; the pattern of operating, investing and financing flows reveals how the business funds itself, and persistent gaps between profit and cash are warning signs.
!: Assuming negative free cash flow is always bad. A company investing heavily for growth may have negative free cash flow for a time; the question is whether the investment will generate future operating cash.
EV: established | Analysts widely use free cash flow in valuation and credit analysis.
EV: established | Persistent gaps between accounting profit and operating cash flow are associated with lower future earnings (Sloan, 1996).
T: Free cash flow | Operating cash flow less capital expenditure
T: Cash conversion | The proportion of operating profit turned into operating cash
SUM: Free cash flow = operating cash − capex.
SUM: The pattern of flows shows how a company funds itself.
SUM: Watch for profits not turning into cash.
SRC: IFRS Foundation, IAS 7 Statement of Cash Flows | standard | 1992 | https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/
SRC: Sloan R. G., "Do stock prices fully reflect information in accruals and cash flows about future earnings?", The Accounting Review 71(3), 289–315 | primary | 1996
Q: How is free cash flow calculated? | Net cash from operating activities less capital expenditure.
Q: What does low cash conversion suggest? | Profits aren't turning into cash, perhaps because working capital is absorbing cash or profit includes non-cash gains.
M1#investing-u07-22-q1@1: Operating cash flow is £800,000 and capital expenditure £300,000. What is free cash flow? | £500,000 | £1,100,000 | £300,000 | £800,000 | Free cash flow = operating cash flow − capex: 800,000 − 300,000 = £500,000.
M2#investing-u07-22-q2@2: A company's cash generated from operations is £350,000 and its operating profit £300,000. What is its cash conversion? | About 117% | About 86% | 35% | 30% | Cash conversion = cash from operations ÷ operating profit: 350,000 ÷ 300,000 = 1.17, about 117%.
M3#investing-u07-22-q3@3: A company pays a rising dividend each year while operating cash falls and borrowing rises. What is the best interpretation? | The dividend may be unsustainable, as it is being funded by debt rather than operating cash | The company is very healthy because its dividends are rising | Borrowing has no connection with the dividends a company pays | Falling operating cash flow shows that profits are rising | Paying dividends from borrowing can't continue indefinitely and raises financial risk.
NUM2#investing-u07-22-q4@2: Net cash from operating activities is £1,200,000 and purchases of PPE are £450,000. What is free cash flow, in £? | 750000 | 0 | £ | 1,200,000 − 450,000 = 750,000.
SA2#investing-u07-22-q5@2,3: Explain what a statement of cash flows can reveal that a statement of profit or loss can't. | It shows whether profits are converted into cash, how much is being invested in assets, and how the business is funded: from operations, borrowing or share issues. It shows if dividends are paid from operating cash or debt, and whether asset sales are covering shortfalls. Cash is less affected by accounting estimates, so it helps assess earnings quality and liquidity. | Profit to cash conversion ; Investment ; Funding sources ; Earnings quality

## Performance in not-for-profit organisations
LV: Intermediate · Application
S: Charities, public bodies and other not-for-profit organisations exist to achieve a mission, not to make profit. This lesson explains how their performance is measured, value for money and the 3Es, and the limits of financial measures.
O: Explain why profit-based measures are inadequate for not-for-profit organisations
O: Apply the value for money framework of economy, efficiency and effectiveness
O: Design performance measures for a not-for-profit organisation
PRE: Interpreting ratios in context
H: A different purpose
P: **Not-for-profit organisations** (charities, NHS trusts, councils, universities) pursue social objectives. Surpluses are reinvested, so profit isn't the main measure of success. Users include funders, donors, regulators such as the Charity Commission, service users and taxpayers.
H: Value for money: the 3Es
- **Economy**: buying inputs at the lowest cost for the required quality (spending less).
- **Efficiency**: getting the most output from inputs (spending well), such as cost per patient treated.
- **Effectiveness**: achieving the intended outcomes (spending wisely), such as reduced readmissions.
P: Some add a fourth E, **equity**: whether services reach those who need them fairly.
H: Measures
- Financial: cost per output, administration costs as a share of spending, reserves policy, income sources.
- Non-financial: outputs (meals delivered, patients treated), outcomes (health improvements, people housed), quality and satisfaction.
X: A food charity's performance.
> Economy: buys food in bulk at 20% below retail prices.
> Efficiency: delivers 5,000 parcels a month at £4 per parcel, down from £5.
> Effectiveness: 70% of families helped report not needing emergency food again within 6 months.
> Financial ratios alone would miss whether the charity is achieving its purpose.
K: Not-for-profit performance is judged by value for money: economy, efficiency and effectiveness (and often equity), using financial and non-financial measures linked to the mission.
!: Judging charities only by the share of spending on administration. Low overheads can mean under-investment in skills and systems; effectiveness in achieving outcomes matters most.
EV: established | The economy, efficiency and effectiveness framework is the basis of the National Audit Office's value for money audits.
EV: contested | Measuring outcomes such as wellbeing is difficult, and targets can create perverse incentives.
T: Value for money | The optimal use of resources to achieve intended outcomes
T: Economy | Minimising the cost of resources for a given quality
T: Effectiveness | The extent to which objectives and intended outcomes are achieved
SUM: Not-for-profit organisations are judged by mission, not profit.
SUM: Value for money uses economy, efficiency and effectiveness.
SUM: Combine financial and non-financial measures.
SRC: HM Treasury, Managing Public Money | guidance | 2023 | https://www.gov.uk/government/publications/managing-public-money
SRC: Charity Commission, Charity reporting and accounting: the essentials (CC15d) | guidance | 2016 | https://www.gov.uk/government/publications/charity-reporting-and-accounting-the-essentials-november-2016-cc15d
Q: What are the 3Es of value for money? | Economy, efficiency and effectiveness.
Q: Why is profit not the main measure for a charity? | Its purpose is to achieve social objectives, and surpluses are reinvested rather than distributed.
M1#investing-u07-23-q1@1: Which measure assesses efficiency in a hospital? | Cost per patient treated | Total salaries paid | The number of buildings owned | The number of trustees | Efficiency relates outputs to inputs, such as cost per patient.
M2#investing-u07-23-q2@2: A council cut the price it pays for school meals by switching suppliers. Which E has improved? | Economy | Effectiveness | Efficiency | Equity | Paying less for inputs of the same quality improves economy.
M3#investing-u07-23-q3@3: A charity proudly reports administration costs of only 2% of spending, but its programmes show little impact. What is the best evaluation? | Low overheads don't show effectiveness; outcomes for beneficiaries matter most | The charity is clearly excellent because overheads are low | Charities should never measure outcomes | Administration costs are the only valid measure | Value for money depends on effectiveness; very low overheads may even reduce impact.
MATCH1#investing-u07-23-q4@1: Match each measure to its E. | Lower price for medical supplies = Economy ; Patients treated per nurse = Efficiency ; Reduced reoffending after a programme = Effectiveness ; Services reaching disadvantaged groups = Equity | Each measure reflects one element of value for money.
SA2#investing-u07-23-q5@2,3: Design performance measures for a homelessness charity. | Economy: cost of hostel places compared with alternatives. Efficiency: cost per person supported; caseworker caseloads. Effectiveness: number moved into stable housing and still housed after 12 months; improvements in health or employment. Equity: reaching groups such as young people or rough sleepers. Include financial sustainability and user satisfaction. | Economy measure ; Efficiency measure ; Effectiveness outcome ; Equity or other

## Groups and control
LV: Intermediate · Foundation
S: A group is a parent company and the subsidiaries it controls. This lesson explains control under IFRS 10, why consolidated financial statements are prepared, the different levels of investment, and the exemptions from preparing group accounts.
O: Define control under IFRS 10 and identify a subsidiary
O: Explain why consolidated financial statements are prepared
O: Distinguish subsidiaries, associates, joint arrangements and simple investments
PRE: Presenting company financial statements
H: Control
P: Under **IFRS 10**, an investor **controls** an investee when it has all three of:
- **Power** over the investee: rights that give it the ability to direct the relevant activities.
- **Exposure, or rights, to variable returns** from its involvement.
- The **ability to use its power** to affect those returns.
P: Control usually comes from owning **more than 50% of voting rights**, but can arise with less, for example through agreements with other shareholders or the right to appoint most directors.
H: Why consolidate?
P: A parent's own accounts show its investment in a subsidiary as a single asset. **Consolidated financial statements** present the group as a **single economic entity**, adding together 100% of the assets, liabilities, income and expenses of the parent and its subsidiaries, so users can see all the resources the parent controls.
H: Levels of investment
- **Subsidiary** (control): full consolidation.
- **Associate** (significant influence, usually 20–50% of votes): equity method (IAS 28).
- **Joint venture** (joint control): equity method (IFRS 11).
- **Simple investment** (no control or significant influence): IFRS 9.
X: Classifying three investments.
> P owns 70% of A's shares: control, so A is a subsidiary.
> P owns 40% of B and appoints 6 of B's 10 directors under a shareholder agreement: P has power, so B is also a subsidiary.
> P owns 25% of C and has one seat on its board: significant influence, so C is an associate.
> P owns 5% of D: a simple investment under IFRS 9.
K: A subsidiary is an entity the parent controls (power, variable returns and the link between them); consolidated accounts present the group as one economic entity, while associates and joint ventures use the equity method.
!: Deciding control by shareholding alone. Voting agreements, potential voting rights and the right to appoint directors can give control with less than half the shares, or deny it with more.
EV: established | IFRS 10 defines control by power, variable returns and the link between them.
EV: contested | Judging control in complex structures, such as special purpose entities, involves significant judgement; failures here featured in scandals such as Enron.
T: Control | Power over an investee, exposure to its variable returns and the ability to use that power to affect returns
T: Subsidiary | An entity controlled by another entity, the parent
T: Consolidated financial statements | Financial statements presenting a parent and its subsidiaries as a single economic entity
SUM: Control requires power, variable returns and the ability to use power.
SUM: Consolidation shows the group as a single economic entity.
SUM: Associates and joint ventures use the equity method; simple investments use IFRS 9.
SRC: IFRS Foundation, IFRS 10 Consolidated Financial Statements | standard | 2011 | https://www.ifrs.org/issued-standards/list-of-standards/ifrs-10-consolidated-financial-statements/
SRC: ACCA, Financial Reporting (FR) syllabus and study guide | standard | 2025
Q: What three elements make up control under IFRS 10? | Power over the investee, exposure to variable returns, and the ability to use power to affect those returns.
Q: How is an associate accounted for in group accounts? | Using the equity method under IAS 28.
M1#investing-u07-24-q1@1: What level of shareholding usually indicates significant influence? | 20–50% of voting rights | More than 75% of voting rights | Less than 5% of voting rights | Exactly 100% of voting rights | A holding of 20–50% normally indicates significant influence, making the investee an associate.
M2#investing-u07-24-q2@2: P owns 45% of S but, through an agreement, controls how other shareholders vote, giving it a majority. How is S treated? | As a subsidiary, because P has control | As an associate, because P owns less than 50% | As a simple investment under IFRS 9 | As a joint venture with the other shareholders | Control depends on power, not just percentage ownership; the agreement gives P power.
M3#investing-u07-24-q3@3: Why do users need consolidated statements rather than just the parent's own accounts? | The parent's accounts show only the investment, hiding the subsidiaries' assets, liabilities and results that the parent controls | Consolidated statements are only needed for tax purposes | Parent accounts always overstate profit | Subsidiaries never have any liabilities | Consolidation reveals the full resources and obligations under the parent's control.
TF1#investing-u07-24-q4@1: An investor can control an investee while owning less than half of its shares. | true | Control can arise from agreements, board appointment rights or potential voting rights.
SA2#investing-u07-24-q5@2,3: Explain how a parent company decides whether another entity is its subsidiary. | It applies IFRS 10's control test: does it have power over the relevant activities (usually through a majority of votes, but also through agreements or board appointment rights), is it exposed to variable returns, and can it use its power to affect those returns? If all three apply, the entity is a subsidiary and is consolidated. | Power ; Variable returns ; Link between power and returns ; Consequence: consolidation

## Goodwill on acquisition
LV: Intermediate · Application
S: When a parent buys a subsidiary, it usually pays more than the fair value of the identifiable net assets: the excess is goodwill. This lesson covers how to calculate goodwill under IFRS 3, the two ways to measure non-controlling interest, impairment, and negative goodwill.
O: Calculate goodwill on acquisition under IFRS 3
O: Compare the fair value and proportionate methods of measuring non-controlling interest
O: Explain impairment of goodwill and bargain purchases
PRE: Groups and control
H: The calculation
E: Goodwill = consideration transferred + non-controlling interest − fair value of identifiable net assets at acquisition
P: **Non-controlling interest (NCI)** is the share of the subsidiary not owned by the parent. IFRS 3 allows NCI to be measured at:
- **Fair value** (often the market value of the shares the parent didn't buy), giving **full goodwill**; or
- the **proportionate share** of the fair value of net assets, giving **partial goodwill** (the parent's share only).
X: P buys 80% of S for £800,000. S's identifiable net assets have a fair value of £750,000. The fair value of the NCI is £190,000.
> Fair value method: goodwill = 800,000 + 190,000 − 750,000 = £240,000.
> Proportionate method: NCI = 20% × 750,000 = £150,000.
> Goodwill = 800,000 + 150,000 − 750,000 = £200,000.
> The £40,000 difference is the goodwill attributable to the NCI.
H: After acquisition
- Goodwill isn't amortised under IFRS; it is **tested for impairment annually** (IAS 36).
- Under the fair value method, impairment is shared between the parent and NCI; under the proportionate method, it is charged to the parent only.
- If net assets exceed consideration plus NCI, there is a **bargain purchase** (negative goodwill): after reassessing the figures, the gain is recognised in profit or loss.
K: Goodwill is consideration plus NCI less the fair value of net assets acquired; NCI at fair value gives full goodwill, at proportionate share gives partial goodwill; goodwill is tested annually for impairment.
!: Using book values instead of fair values for the subsidiary's net assets. IFRS 3 requires identifiable assets and liabilities to be measured at fair value at the acquisition date.
EV: established | IFRS 3's acquisition method and the two NCI options are well established.
EV: contested | Whether goodwill should be amortised, as under FRS 102, or only tested for impairment remains a live debate at the IASB.
T: Goodwill | The excess of consideration and NCI over the fair value of identifiable net assets acquired
T: Non-controlling interest | The equity in a subsidiary not attributable to the parent
T: Bargain purchase | An acquisition where net assets exceed consideration plus NCI, giving a gain
SUM: Goodwill = consideration + NCI − fair value of net assets.
SUM: Fair value NCI gives full goodwill; proportionate gives partial.
SUM: Goodwill is tested annually for impairment; bargain purchases go to profit.
SRC: IFRS Foundation, IFRS 3 Business Combinations | standard | 2008 | https://www.ifrs.org/issued-standards/list-of-standards/ifrs-3-business-combinations/
SRC: ACCA, Financial Reporting (FR) syllabus and study guide | standard | 2025
Q: What is non-controlling interest? | The part of a subsidiary's equity not owned by the parent.
Q: How is goodwill treated after acquisition under IFRS? | It isn't amortised but is tested for impairment at least annually.
M1#investing-u07-25-q1@1: At what value are a subsidiary's identifiable net assets measured when calculating goodwill? | Fair value at the acquisition date | Book value in the subsidiary's accounts | Original historical cost | The parent's own estimate of future value | IFRS 3 requires fair values at the acquisition date.
M2#investing-u07-25-q2@2: P pays £600,000 for 75% of S, whose net assets have a fair value of £640,000. NCI is measured at its proportionate share. What is goodwill? | £120,000 | £40,000 | £160,000 | £200,000 | NCI = 25% × 640,000 = 160,000; goodwill = 600,000 + 160,000 − 640,000 = £120,000.
M3#investing-u07-25-q3@3: An acquisition gives net assets of £500,000 against consideration plus NCI of £450,000. What should the acquirer do? | Reassess the figures, then recognise a £50,000 bargain purchase gain in profit or loss | Record £50,000 of positive goodwill as an asset | Ignore the difference entirely | Add £50,000 to share capital | A bargain purchase is rare, so the figures are checked first; any remaining gain goes to profit.
NUM2#investing-u07-25-q4@2: P buys 90% of S for £1,000,000. S's net assets have a fair value of £900,000 and NCI at fair value is £105,000. What is goodwill, in £? | 205000 | 0 | £ | Goodwill = 1,000,000 + 105,000 − 900,000 = 205,000.
SA2#investing-u07-25-q5@2,3: Compare the fair value and proportionate share methods of measuring non-controlling interest. | Under the fair value method, NCI is measured at its fair value, so goodwill includes the NCI's share (full goodwill) and impairment is shared. Under the proportionate method, NCI is its share of net assets at fair value, so goodwill reflects only the parent's share (partial goodwill) and impairment falls on the parent. The fair value method usually gives higher goodwill and NCI. | Fair value method ; Proportionate method ; Effect on goodwill size ; Effect on impairment

## The consolidated statement of financial position
LV: Intermediate · Application
S: The consolidated statement of financial position adds together the parent's and subsidiaries' assets and liabilities and shows the equity attributable to the parent and to non-controlling interests. This lesson sets out the standard workings for a simple group.
O: Prepare a consolidated statement of financial position for a parent and one subsidiary
O: Calculate group retained earnings and non-controlling interest
O: Apply fair value adjustments and eliminate the investment
PRE: Goodwill on acquisition
H: The method
- **Add** 100% of the parent's and subsidiary's assets and liabilities line by line, even if the parent owns less than 100%.
- **Eliminate** the parent's investment in the subsidiary; replace it with **goodwill**.
- **Equity**: show only the **parent's** share capital and share premium.
- **Group retained earnings** = parent's retained earnings + parent's share of the subsidiary's **post-acquisition** retained earnings − parent's share of goodwill impairment.
- **NCI** = NCI at acquisition + NCI's share of post-acquisition retained earnings (− NCI's share of impairment under the fair value method).
- Adjust for **fair value** differences at acquisition and their later depreciation.
X: Building on the goodwill example (£000): P bought 80% of S; NCI at fair value 190; goodwill 240.
> Since acquisition, S's retained earnings have increased by 100.
> Parent's retained earnings are 2,000.
> Group retained earnings = 2,000 + 80% × 100 = 2,080.
> NCI = 190 + 20% × 100 = 210. Goodwill (240) appears as an intangible asset.
P: A useful check: total group net assets equal the parent's share capital and premium, plus group retained earnings, plus NCI. Building standard workings for net assets, goodwill, NCI and retained earnings keeps the calculation organised.
H: Common adjustments
- **Intra-group balances**: cancel receivables and payables between group companies.
- **Unrealised profit** on intra-group inventory (next lesson).
- **Fair value adjustments**: for example, if land was worth £50,000 more than book value at acquisition, add it to land and to the subsidiary's net assets in the goodwill calculation.
K: Add 100% of assets and liabilities, replace the investment with goodwill, show only the parent's share capital, and split post-acquisition reserves between the group and NCI.
!: Including the subsidiary's pre-acquisition reserves in group retained earnings. Those reserves were bought by the parent and are part of the net assets used to calculate goodwill.
EV: established | The line-by-line consolidation method is standard under IFRS 10.
EV: established | Fair value adjustments at acquisition are a common source of judgement and audit focus.
T: Post-acquisition reserves | Reserves of the subsidiary earned after the date the parent gained control
T: Pre-acquisition reserves | Reserves of the subsidiary at the acquisition date, included in net assets acquired
T: Fair value adjustment | The difference between the fair value and book value of a subsidiary's asset or liability at acquisition
SUM: Add 100% of assets and liabilities; replace investment with goodwill.
SUM: Group RE includes the parent's share of post-acquisition reserves.
SUM: NCI = NCI at acquisition + share of post-acquisition reserves.
SRC: IFRS Foundation, IFRS 10 Consolidated Financial Statements | standard | 2011 | https://www.ifrs.org/issued-standards/list-of-standards/ifrs-10-consolidated-financial-statements/
SRC: ACCA, Financial Reporting (FR) syllabus and study guide | standard | 2025
Q: How much of a subsidiary's assets are included in the consolidated statement of financial position? | 100%, even if the parent owns less than 100%.
Q: Whose share capital appears in consolidated equity? | Only the parent's.
M1#investing-u07-26-q1@1: What replaces the parent's investment in a subsidiary on consolidation? | Goodwill | The subsidiary's share capital | The parent's retained earnings | Nothing; the investment is kept | The investment is eliminated against the net assets acquired, leaving goodwill.
M2#investing-u07-26-q2@2: P owns 75% of S. S's retained earnings rose by £80,000 after acquisition, and P's retained earnings are £500,000. What are group retained earnings? | £560,000 | £580,000 | £500,000 | £520,000 | 500,000 + 75% × 80,000 = 500,000 + 60,000 = £560,000.
M3#investing-u07-26-q3@3: A student adds 100% of the subsidiary's retained earnings, including pre-acquisition amounts, to group retained earnings. What is wrong? | Pre-acquisition reserves were acquired and belong in the goodwill calculation, and only the parent's share of post-acquisition reserves goes to the group | Nothing: all of the subsidiary's reserves belong to the group | The subsidiary's reserves should never appear in group accounts | Only pre-acquisition reserves should be included | Group retained earnings include the parent's share of post-acquisition reserves only.
NUM2#investing-u07-26-q4@2: NCI at acquisition was £150,000. The NCI owns 30% of a subsidiary whose post-acquisition retained earnings are £60,000. What is NCI at the reporting date, in £? | 168000 | 0 | £ | NCI = 150,000 + 30% × 60,000 = 150,000 + 18,000 = 168,000.
SA2#investing-u07-26-q5@2,3: Explain why 100% of a subsidiary's assets and liabilities are consolidated even when the parent owns only 80%. | Consolidation presents the group as a single economic entity under the parent's control. The parent controls all the subsidiary's assets and liabilities, not just 80% of them, so all are included. The portion owned by outside shareholders is shown separately in equity as non-controlling interest, so the equity side reflects ownership while the assets reflect control. | Single economic entity ; Control of all assets ; NCI shown in equity ; Distinction between control and ownership

## Intra-group trading and unrealised profit
LV: Intermediate · Application
S: When group companies trade with each other, the sales, purchases, balances and any profit left in inventory must be eliminated on consolidation. This lesson explains why and shows how to calculate and adjust for provision for unrealised profit (PURP).
O: Eliminate intra-group sales, purchases and balances
O: Calculate unrealised profit on intra-group inventory using mark-up and margin
O: Adjust group accounts for unrealised profit depending on which company was the seller
PRE: The consolidated statement of financial position
H: Why eliminate?
P: A group can't make a profit by selling to itself. Sales between group companies, and receivables and payables between them, are **cancelled** on consolidation. If goods sold within the group remain in inventory at the year end, the profit on them hasn't been earned from outsiders: it is **unrealised** and must be removed.
H: Calculating PURP
- **Mark-up on cost**: profit = sales price × mark-up ÷ (100 + mark-up).
- **Margin on sales**: profit = sales price × margin %.
- Only the profit on goods **still held** at the year end is unrealised.
X: P sells goods to its 80% subsidiary S for £60,000 at cost plus 25%. Half are still in S's inventory at the year end.
> Profit on the goods = 60,000 × 25 ÷ 125 = £12,000.
> Half remain unsold: PURP = £6,000.
> Reduce group inventory by £6,000.
> P was the seller, so reduce group retained earnings by the full £6,000; NCI isn't affected.
H: Who was the seller?
- **Parent sells to subsidiary**: deduct all of the PURP from group retained earnings.
- **Subsidiary sells to parent**: deduct the PURP from the subsidiary's post-acquisition profits, so it is shared between group retained earnings and NCI.
- In the consolidated statement of profit or loss, remove intra-group sales from both revenue and cost of sales, and add the PURP to cost of sales.
K: Cancel intra-group sales, purchases and balances, and remove profit on intra-group goods still held in inventory; who sold the goods decides whether the NCI shares the adjustment.
!: Confusing mark-up and margin. A 25% mark-up on cost is a 20% margin on selling price; using the wrong one overstates or understates PURP.
EV: established | IFRS 10 requires intra-group transactions, balances and unrealised profits to be eliminated in full.
EV: established | Errors in eliminating intra-group trading are a common area of exam difficulty and audit adjustment.
T: Unrealised profit | Profit on intra-group sales where the goods are still held within the group
T: Mark-up | Profit expressed as a percentage of cost
T: Margin | Profit expressed as a percentage of selling price
SUM: Cancel intra-group sales, purchases and balances.
SUM: PURP is the profit on intra-group goods still in inventory.
SUM: If the subsidiary sold, NCI shares the PURP.
SRC: IFRS Foundation, IFRS 10 Consolidated Financial Statements | standard | 2011 | https://www.ifrs.org/issued-standards/list-of-standards/ifrs-10-consolidated-financial-statements/
SRC: ACCA, Financial Reporting (FR) syllabus and study guide | standard | 2025
Q: Why is unrealised profit removed on consolidation? | A group can't earn profit by selling to itself; profit is earned only when goods are sold outside the group.
Q: What margin is equivalent to a mark-up of 25% on cost? | 20% on selling price.
M1#investing-u07-27-q1@1: Which balances are cancelled on consolidation? | Receivables and payables between group companies | Receivables from external customers | Bank loans from outside lenders | Share capital of the parent | Intra-group balances cancel because the group can't owe itself money.
M2#investing-u07-27-q2@2: S sells goods to P for £40,000 at a 25% margin. All the goods are still in P's inventory. What is the PURP? | £10,000 | £8,000 | £40,000 | £5,000 | At a 25% margin on selling price, profit = 40,000 × 25% = £10,000, all unrealised.
M3#investing-u07-27-q3@3: The subsidiary sold goods to the parent, creating PURP of £5,000. The NCI owns 30%. How is the adjustment split? | Group retained earnings fall by £3,500 and NCI by £1,500 | Group retained earnings fall by £5,000 and NCI is unaffected | NCI falls by £5,000 and the group is unaffected | Neither is affected, as PURP only changes inventory | When the subsidiary is the seller, the PURP reduces its profit, shared 70:30 between group and NCI.
NUM2#investing-u07-27-q4@2: P sells goods to S for £90,000 at a mark-up of 50% on cost. One-third remain in S's inventory at the year end. What is the PURP, in £? | 10000 | 0 | £ | Profit = 90,000 × 50 ÷ 150 = 30,000; one-third unsold = 10,000.
SA2#investing-u07-27-q5@2,3: Explain the adjustments needed in the consolidated statement of profit or loss for intra-group sales with goods remaining in inventory. | Remove the full intra-group sales value from group revenue and from cost of sales, since the group didn't buy or sell externally. Then increase cost of sales by the unrealised profit on goods still held, reducing group profit. If the subsidiary was the seller, reduce the subsidiary's profit before calculating the NCI's share, so the NCI bears its share of the PURP. | Cancel revenue and cost of sales ; Add PURP to cost of sales ; Effect on group profit ; NCI adjustment if subsidiary sold

## The consolidated statement of profit or loss
LV: Intermediate · Application
S: The consolidated statement of profit or loss combines the income and expenses of the parent and subsidiaries for the period. This lesson explains how to add results, deal with mid-year acquisitions, remove intra-group items, and split profit between the parent's owners and non-controlling interests.
O: Prepare a consolidated statement of profit or loss
O: Time-apportion a subsidiary's results for a mid-year acquisition
O: Calculate profit attributable to the parent and to the non-controlling interest
PRE: Intra-group trading and unrealised profit
H: The method
- **Add** 100% of the parent's and subsidiary's income and expenses, line by line.
- For a **mid-year acquisition**, include only the subsidiary's results from the **acquisition date** (time-apportion).
- **Remove intra-group sales** from revenue and cost of sales, and add any PURP to cost of sales.
- Remove intra-group **interest** and **dividends**; add any **goodwill impairment** for the year to expenses.
- **Split profit**: NCI's share = NCI % × subsidiary's profit after tax (adjusted for PURP if the subsidiary was the seller, and for its share of impairment under the fair value method). The rest is attributable to owners of the parent.
X: P acquired 80% of S on 1 April; year ends 31 December (£000).
> S's revenue for the year was 1,200 and profit after tax 240, earned evenly.
> Include 9/12: revenue 900 and profit after tax 180.
> P sold S goods for 60 after acquisition, with PURP of 6 (P the seller): cut revenue and cost of sales by 60; add 6 to cost of sales.
> NCI's share of profit = 20% × 180 = 36; the rest of group profit goes to owners of the parent.
P: Working from a schedule that starts with each company's figures, then shows time apportionment and each adjustment in its own column, makes the consolidation easy to check.
H: Presentation
P: The statement ends with profit for the year, analysed into "attributable to owners of the parent" and "attributable to non-controlling interests". Total comprehensive income is split the same way.
K: Add 100% of results from the acquisition date, remove intra-group trading, interest and dividends, adjust for PURP and impairment, and split profit between owners of the parent and the NCI.
!: Including a full year of a subsidiary's profit when it was acquired part-way through the year. Only post-acquisition results belong in the group's profit.
EV: established | Line-by-line consolidation of income and expenses from the acquisition date is required by IFRS 10.
EV: established | Splitting profit between the parent's owners and NCI is required by IAS 1 and IFRS 10.
T: Time apportionment | Including only the part of a subsidiary's results earned after acquisition
T: Profit attributable to NCI | The non-controlling interest's share of the subsidiary's profit for the period
SUM: Add 100% of results from the acquisition date.
SUM: Remove intra-group items and adjust for PURP and impairment.
SUM: Split profit between the parent's owners and NCI.
SRC: IFRS Foundation, IFRS 10 Consolidated Financial Statements | standard | 2011 | https://www.ifrs.org/issued-standards/list-of-standards/ifrs-10-consolidated-financial-statements/
SRC: ACCA, Financial Reporting (FR) syllabus and study guide | standard | 2025
Q: How is a mid-year acquisition treated in the consolidated statement of profit or loss? | Only the subsidiary's results from the acquisition date are included.
Q: How is the NCI's share of profit calculated? | NCI percentage multiplied by the subsidiary's profit after tax for the post-acquisition period, after relevant adjustments.
M1#investing-u07-28-q1@1: What proportion of a subsidiary's revenue is included in group revenue? | 100% of post-acquisition revenue, less intra-group sales | Only the parent's percentage share | Nothing; only profit is consolidated | 50% in every case | Income and expenses are consolidated in full; NCI is dealt with by splitting profit.
M2#investing-u07-28-q2@2: A subsidiary acquired on 1 July (year end 31 December) made profit after tax of £400,000 for the year, evenly. How much is included in group profit? | £200,000 | £400,000 | £100,000 | £300,000 | Only 6 of 12 months are post-acquisition: 400,000 × 6/12 = £200,000.
M3#investing-u07-28-q3@3: The parent receives a £50,000 dividend from its subsidiary. How is it treated on consolidation? | Eliminated, because it is an intra-group transfer, not income from outside | Added to group revenue as investment income | Shown as an expense of the group | Added to non-controlling interest | Intra-group dividends cancel out; the group as a whole hasn't earned anything from outside.
NUM2#investing-u07-28-q4@2: A 75% subsidiary's post-acquisition profit after tax is £320,000, with no adjustments. What is the profit attributable to the NCI, in £? | 80000 | 0 | £ | NCI share = 25% × 320,000 = 80,000.
SA2#investing-u07-28-q5@2,3: Explain the adjustments needed when preparing a consolidated statement of profit or loss for a subsidiary acquired during the year. | Time-apportion the subsidiary's income and expenses so only post-acquisition results are included. Eliminate intra-group sales and purchases, intra-group interest and dividends. Add PURP to cost of sales. Include goodwill impairment for the year. Calculate the NCI's share of the subsidiary's post-acquisition profit after adjustments and show profit split between owners of the parent and NCI. | Time apportionment ; Intra-group eliminations ; PURP and impairment ; NCI split

## Associates and joint arrangements
LV: Intermediate · Application
S: Investments that give significant influence or joint control aren't consolidated line by line. This lesson explains the equity method for associates and joint ventures under IAS 28 and IFRS 11, and the difference between joint ventures and joint operations.
O: Identify an associate and apply the equity method
O: Distinguish joint ventures from joint operations under IFRS 11
O: Account for an associate in the consolidated financial statements
PRE: Groups and control
H: Associates
P: An **associate** is an entity over which the investor has **significant influence**: the power to participate in financial and operating policy decisions without control. Indicators include holding **20–50%** of voting rights, board representation and participation in policy decisions.
H: The equity method
- Initially recognise the investment at **cost**.
- Increase it by the investor's **share of post-acquisition profits** (and OCI); decrease it by **dividends received** and any impairment.
- In profit or loss, show one line: **share of profit of associate**.
- Eliminate the investor's share of unrealised profit on transactions with the associate.
X: P buys 30% of A for £300,000. In the year, A makes profit of £100,000 and pays dividends of £40,000.
> Share of profit: 30% × 100,000 = £30,000, shown in P's group profit or loss.
> Dividend received: 30% × 40,000 = £12,000, reducing the investment.
> Investment at year end = 300,000 + 30,000 − 12,000 = £318,000.
> A's individual assets and liabilities aren't added to the group's.
H: Joint arrangements (IFRS 11)
- A **joint arrangement** exists when two or more parties have **joint control**, requiring unanimous consent for relevant decisions.
- **Joint venture**: the parties have rights to the **net assets** of the arrangement, usually through a separate company; use the **equity method**.
- **Joint operation**: the parties have rights to the **assets** and obligations for the **liabilities**; each recognises its share of assets, liabilities, revenue and expenses.
K: Associates and joint ventures are accounted for using the equity method: cost plus share of post-acquisition profits less dividends; joint operations recognise their share of assets and liabilities directly.
!: Adding dividends from an associate to group income on top of the share of profit. Under the equity method, dividends reduce the investment; counting them as income too would double-count.
EV: established | IAS 28 and IFRS 11 set out the equity method and the classification of joint arrangements.
EV: contested | Some argue the equity method's single-line presentation hides the associate's debt and risks from users.
T: Significant influence | The power to participate in financial and operating policy decisions without control
T: Equity method | Carrying an investment at cost plus the investor's share of post-acquisition changes in net assets
T: Joint control | Contractually agreed sharing of control requiring unanimous consent for relevant decisions
SUM: Associates: significant influence, usually 20–50%; equity method.
SUM: Investment = cost + share of profits − dividends.
SUM: Joint ventures use the equity method; joint operations recognise shares of assets and liabilities.
SRC: IFRS Foundation, IAS 28 Investments in Associates and Joint Ventures | standard | 2011 | https://www.ifrs.org/issued-standards/list-of-standards/ias-28-investments-in-associates-and-joint-ventures/
SRC: IFRS Foundation, IFRS 11 Joint Arrangements | standard | 2011 | https://www.ifrs.org/issued-standards/list-of-standards/ifrs-11-joint-arrangements/
Q: How is a dividend from an associate treated under the equity method? | It reduces the carrying amount of the investment.
Q: What is the difference between a joint venture and a joint operation? | In a joint venture, parties have rights to net assets; in a joint operation, they have rights to assets and obligations for liabilities.
M1#investing-u07-29-q1@1: What does the equity method show in the group statement of profit or loss? | The investor's share of the associate's profit as a single line | 100% of the associate's revenue and expenses | Only dividends received from the associate | Nothing until the associate is sold | The equity method shows one line: share of profit of associate.
M2#investing-u07-29-q2@2: P owns 25% of A, bought for £200,000. A makes £80,000 profit and pays no dividend. What is the investment's carrying amount at the year end? | £220,000 | £280,000 | £200,000 | £180,000 | 200,000 + 25% × 80,000 = 200,000 + 20,000 = £220,000.
M3#investing-u07-29-q3@3: Two companies jointly own a pipeline directly, each owning a share of the asset and its liabilities, with no separate company. How should each account for it? | As a joint operation, recognising its share of the assets, liabilities, revenue and expenses | As a joint venture using the equity method | As a subsidiary with full consolidation | As a simple investment under IFRS 9 | Direct rights to assets and obligations for liabilities make it a joint operation.
NUM2#investing-u07-29-q4@2: An investor buys 40% of an associate for £500,000. The associate's profit is £150,000 and its dividends £50,000. What is the investment's carrying amount at the year end, in £? | 540000 | 0 | £ | 500,000 + 40% × 150,000 − 40% × 50,000 = 500,000 + 60,000 − 20,000 = 540,000.
SA2#investing-u07-29-q5@2,3: Explain why associates aren't consolidated line by line. | Consolidation applies to entities the parent controls. With significant influence, the investor can participate in decisions but doesn't control the associate's assets and liabilities, so adding them line by line would overstate the group's resources. The equity method instead shows the investor's share of the associate's net assets and profits, reflecting its economic interest. | Control versus influence ; Overstatement if consolidated ; Equity method reflects share ; Single-line presentation

## Creative accounting and earnings management
LV: Intermediate · Evaluation
S: Creative accounting uses the flexibility in accounting rules, and sometimes breaks them, to present a better picture than reality. This lesson covers motives and techniques, high-profile UK and international cases, and the roles of standards, auditors and regulators.
O: Explain the motives for creative accounting and earnings management
O: Identify common techniques, including revenue recognition, capitalisation and provisions
O: Evaluate the roles of standards, auditors and regulators in preventing misleading reporting
PRE: Limitations of ratio analysis
H: Motives
- Meeting **analysts' forecasts** or **bonus targets**.
- Protecting the **share price** or supporting a share issue.
- Meeting **loan covenants**.
- **Smoothing** profits to show steady growth.
P: **Earnings management** is using judgement within the rules to influence reported results (Healy and Wahlen, 1999); **fraud** is deliberate misstatement that breaks the rules.
H: Techniques
- **Revenue recognition**: recognising revenue too early or inflating it, such as on long-term contracts.
- **Capitalising expenses**: treating day-to-day costs as assets to boost profit.
- **Provisions**: creating excessive provisions in good years and releasing them later ("cookie jar" reserves).
- **Off-balance-sheet finance**: keeping debt out of the accounts through special structures.
- **Window dressing** at the year end.
H: Cases
- **Enron** (2001): used special purpose entities to hide debt; its collapse led to the Sarbanes–Oxley Act in the US.
- **Tesco** (2014): overstated profit by about £263 million by recognising supplier commercial income too early.
- **Carillion** (2018): a construction and services group that collapsed with large debts; the Kingman and Brydon reviews followed, criticising aggressive contract accounting and audit.
X: Spotting warning signs.
> Profits rise steadily while operating cash flow falls.
> Receivables days increase sharply.
> Large provisions are released, boosting profit, in a weak year.
> Frequent changes in accounting policies or auditors: investigate further before relying on the figures.
K: Creative accounting exploits flexibility or breaks rules to flatter results; warning signs include profit diverging from cash, rising receivables and provision releases; standards, auditors, audit committees and regulators provide safeguards.
!: Assuming audited accounts can't be misleading. Audit gives reasonable, not absolute, assurance, and many scandals involved audited companies.
EV: established | The Tesco and Carillion cases led to regulatory investigation and reforms to UK audit and corporate reporting.
EV: contested | How far UK audit reform, including a new regulator to replace the FRC, should go has been debated since the Kingman (2018) and Brydon (2019) reviews.
T: Creative accounting | Using or abusing accounting flexibility to present a more favourable picture
T: Earnings management | Using judgement in reporting to influence reported results
T: Off-balance-sheet finance | Funding arranged so that the obligation doesn't appear as a liability
SUM: Motives include targets, bonuses, share price and covenants.
SUM: Techniques include early revenue, capitalisation, cookie-jar provisions and hidden debt.
SUM: Cases such as Enron, Tesco and Carillion led to reforms.
SRC: Healy P. M. and Wahlen J. M., "A review of the earnings management literature and its implications for standard setting", Accounting Horizons 13(4), 365–383 | primary | 1999
SRC: Kingman J., Independent Review of the Financial Reporting Council | guidance | 2018 | https://www.gov.uk/government/publications/financial-reporting-council-review-2018
SRC: Brydon D., Assess, assure and inform: improving audit quality and effectiveness | guidance | 2019 | https://www.gov.uk/government/publications/the-quality-and-effectiveness-of-audit-independent-review
Q: What are "cookie jar" reserves? | Excessive provisions made in good years and released later to boost profits.
Q: What did Tesco overstate in 2014? | Profit, by about £263 million, through early recognition of commercial income from suppliers.
M1#investing-u07-30-q1@1: Which is a technique of creative accounting? | Capitalising day-to-day expenses as assets | Charging depreciation on new machinery | Disclosing contingent liabilities | Preparing a statement of cash flows | Capitalising costs that should be expensed increases profit and assets.
M2#investing-u07-30-q2@2: A company's profit rose 20% while operating cash flow fell 30% and receivables days doubled. What should an analyst suspect? | Possible aggressive revenue recognition, with sales recorded before cash is likely | That the company is very healthy and cash will follow | That depreciation has been miscalculated upwards | That the company has repaid all its debts | Profit diverging from cash with rising receivables is a classic warning sign.
M3#investing-u07-30-q3@3: Which best explains why audits don't prevent all misleading reporting? | Auditors give reasonable, not absolute, assurance, and judgements and collusion can conceal problems | Auditors don't look at the accounts at all | Accounting standards allow any figure to be reported | Regulators audit every company themselves | Audit is based on testing and judgement; it can't guarantee the absence of misstatement.
TF1#investing-u07-30-q4@1: Earnings management always involves breaking accounting rules. | false | Earnings management often uses judgement within the rules; fraud is deliberate misstatement.
SA2#investing-u07-30-q5@3: Evaluate how effectively standards, auditors and regulators protect users from creative accounting. | Standards such as IFRS 15 and IFRS 16 have reduced scope for early revenue and hidden lease debt, auditors test figures and challenge judgements, and regulators such as the FRC review accounts and sanction poor audit. But standards still require judgement, audit gives only reasonable assurance and can be compromised by lack of scepticism, and regulators' powers and resources have been criticised after cases such as Carillion. Protection is real but imperfect, so users should analyse cash flows and warning signs themselves. | Standards' role ; Auditors' role and limits ; Regulators' role and criticism ; Balanced conclusion

## Narrative reporting and the strategic report
LV: Intermediate · Application
S: Annual reports contain much more than the financial statements. This lesson covers the strategic report required by the Companies Act 2006, the section 172 statement, the UK Corporate Governance Code, climate-related and sustainability disclosures, and how users read narrative reporting.
O: Describe the content of the strategic report and section 172 statement
O: Explain the role of corporate governance and viability disclosures
O: Outline developments in climate and sustainability reporting in the UK
PRE: Why analyse financial statements?
H: The strategic report
P: Under the **Companies Act 2006 (sections 414A–414D)**, most companies (other than small ones) must prepare a **strategic report** with a fair review of the business and its principal risks and uncertainties. For quoted companies, it also covers strategy, business model, trends affecting the business, environmental matters, employees, social, community and human rights issues, and gender diversity.
- **Section 172 statement**: large companies explain how directors have had regard to employees, suppliers, customers, the community, the environment and the long term, as required by section 172.
H: Governance and viability
- **UK Corporate Governance Code** (FRC, 2024 edition): listed companies "comply or explain" on board leadership, independence, audit, risk and remuneration; from 2026, a declaration on the effectiveness of internal controls.
- **Viability statement**: directors explain how long they assess the company can continue to operate.
- **Going concern** disclosures.
H: Climate and sustainability reporting
- UK listed companies have reported against the **Task Force on Climate-related Financial Disclosures (TCFD)** framework since 2021–22, and large companies must make climate-related financial disclosures under 2022 regulations.
- The **ISSB** issued **IFRS S1** and **IFRS S2** in 2023; the UK government has been developing **UK Sustainability Reporting Standards** based on them. Check the current position.
X: Reading a strategic report.
> A retailer reports record profit, but its principal risks include rising energy costs and a key supplier's financial weakness.
> Its viability statement covers three years, with a scenario showing reduced demand.
> Its climate disclosures identify flood risk to two warehouses.
> The narrative gives forward-looking context that the financial statements alone don't.
K: Narrative reporting, especially the strategic report, section 172 statement, governance disclosures and climate reporting, explains strategy, risks and long-term prospects alongside the financial statements.
!: Treating narrative reports as neutral. They are written by management and can be promotional; check them against the financial statements and auditors' and regulators' comments.
EV: established | The strategic report and section 172 statement are legal requirements for qualifying UK companies.
EV: contested | Whether narrative and sustainability reporting changes corporate behaviour, or becomes boilerplate, is debated.
T: Strategic report | A narrative report required by the Companies Act 2006 reviewing the business, its strategy and principal risks
T: Section 172 statement | A statement explaining how directors have considered stakeholders and long-term consequences
T: Viability statement | A statement in which directors assess the company's prospects over a stated period
SUM: The strategic report reviews business, strategy and risks.
SUM: Section 172 and governance disclosures show how the company is run.
SUM: Climate and sustainability reporting is expanding.
SRC: Companies Act 2006, sections 172 and 414A–414D | legislation | 2006 | https://www.legislation.gov.uk/ukpga/2006/46/contents
SRC: Financial Reporting Council, UK Corporate Governance Code | standard | 2024 | https://www.frc.org.uk/
SRC: IFRS Foundation, IFRS S2 Climate-related Disclosures | standard | 2023 | https://www.ifrs.org/issued-standards/ifrs-sustainability-standards-navigator/
Q: Which sections of the Companies Act 2006 require a strategic report? | Sections 414A–414D.
Q: What does the section 172 statement explain? | How directors have had regard to stakeholders such as employees, suppliers, customers, the community and the environment.
M1#investing-u07-31-q1@1: What principle does the UK Corporate Governance Code operate on? | Comply or explain | Mandatory compliance with fines for any deviation | Voluntary disclosure with no reporting | Comply only if the share price falls | Companies either comply with each provision or explain why not.
M2#investing-u07-31-q2@2: Which document would best help an investor understand a company's principal risks? | The strategic report | The trial balance | The share register | The list of employees | The strategic report must describe principal risks and uncertainties.
M3#investing-u07-31-q3@3: A company's narrative report describes "strong momentum", but its cash flows are weakening and its auditor flags a material uncertainty about going concern. What should a reader conclude? | The narrative may be overly positive; rely on the financial evidence and auditor's report | The narrative is always the most reliable part of the annual report | The auditor's comments can be ignored if the narrative is positive | Cash flows don't matter if management is confident | Narrative reports are management's view and must be checked against the figures and the audit report.
TF1#investing-u07-31-q4@1: The ISSB issued IFRS S1 and IFRS S2 in 2023. | true | These are the first global sustainability disclosure standards, on general requirements and climate.
SA2#investing-u07-31-q5@2,3: Explain why narrative reporting is useful to investors alongside the financial statements. | Financial statements show past performance and position in figures. Narrative reporting explains strategy, the business model, principal risks, governance, stakeholder relationships, climate and sustainability issues, and directors' view of viability, giving forward-looking context and explaining the numbers. But it is written by management, so it should be read critically. | Strategy and risks ; Governance and stakeholders ; Climate and forward-looking information ; Need for critical reading
`;
