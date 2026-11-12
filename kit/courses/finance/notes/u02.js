// School 2: Preparing Financial Statements. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md):
// objectives, key terms, summaries, typed and dated sources, evidence status (EV:) and questions at three levels
// (Foundation, Application, Evaluation) in every lesson. Explanations and worked figures are original; sources are those
// used and cited for checking, pending human verification (qa.js records the review stages). Level: A level and the
// first professional accountancy papers. Tax rules are UK rules as at 2026; check current guidance on GOV.UK.
export default `
## Capital and revenue expenditure
LV: Introductory · Foundation
S: Spending that brings benefits over several years is capital expenditure and goes to the statement of financial position; spending used up in the year is revenue expenditure and goes to profit. This lesson draws the line and shows what goes wrong when it is drawn in the wrong place.
O: Distinguish capital expenditure from revenue expenditure, and capital from revenue receipts
O: Classify costs such as delivery, installation, repairs and improvements correctly
O: Analyse the effect of misclassification on profit and on the statement of financial position
PRE: Assets, liabilities and capital
H: The distinction
P: **Capital expenditure** buys or improves non-current assets that will be used to earn income for more than one accounting period: buildings, machinery, vehicles, and costs that extend an asset's life or capacity. It is recorded as an asset and charged to profit gradually through depreciation.
P: **Revenue expenditure** is spent on running the business day to day, or on maintaining assets in their existing condition: wages, rent, fuel, repairs, insurance. It is an expense in the period in which it is incurred.
H: What counts as cost of a non-current asset
- **Capitalise**: purchase price (after trade discounts, excluding reclaimable VAT), import duties, delivery, installation, site preparation, professional fees, testing costs, and the legal costs of buying land or buildings.
- **Expense**: repairs and maintenance, servicing, staff training to use the asset, administration and general overheads, and costs of running the asset once it is in use.
- **Improvements**: an extension to a building, or an upgrade that increases a machine's output, is capital; repainting or replacing worn parts like for like is revenue.
P: IAS 16 recognises an item of property, plant and equipment as an asset when future economic benefits are probable and its cost can be measured reliably, and lists the costs directly attributable to bringing it to working condition. Receipts follow the same logic: selling a non-current asset is a **capital receipt**; sales of goods are **revenue receipts**.
X: A printer business buys a press for £48,000 plus VAT, pays £1,500 delivery, £2,200 installation, £600 for a year's service contract and £900 to train staff.
> Capitalise: 48,000 + 1,500 + 2,200 = £51,700 (VAT is reclaimable, so excluded).
> Expense: service contract £600 and training £900 = £1,500 in the year.
> The £51,700 is depreciated over the press's useful life.
K: Capital expenditure creates or improves an asset with benefits beyond the year and is depreciated; revenue expenditure maintains the business and is an expense now.
!: Capitalising repairs because they are large. Size doesn't decide the treatment: a costly repair that restores the original condition is still revenue expenditure.
H: Effects of misclassification
P: Treating capital expenditure as revenue understates profit and non-current assets this year, then overstates profit in later years (no depreciation). Treating revenue expenditure as capital overstates profit and assets now. Because profit affects tax, dividends and bonuses, misclassification can be deliberate: WorldCom's 2002 collapse followed the capitalisation of about 3.8 billion US dollars of ordinary line costs as assets.
EV: established | IAS 16 requires costs of day-to-day servicing to be recognised in profit or loss as incurred, not added to the carrying amount of the asset.
EV: contested | Where to draw the line between improvement and repair is often a matter of judgement, and UK tax cases on the capital/revenue divide show courts disagreeing on similar facts.
T: Capital expenditure | Spending on acquiring or improving non-current assets that benefit more than one period
T: Revenue expenditure | Spending on running the business or maintaining assets, expensed in the period
SUM: Capital expenditure is capitalised and depreciated; revenue expenditure is an expense now.
SUM: Misclassification distorts profit and assets, and can be used to manipulate results.
SRC: IAS 16 Property, Plant and Equipment, paragraphs 7, 12 and 16–17 | standard | 2003 | https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/
SRC: Income Tax (Trading and Other Income) Act 2005, section 33 "Capital expenditure" | legislation | 2005 | https://www.legislation.gov.uk/ukpga/2005/5/section/33
SRC: HMRC, Business Income Manual BIM35000 "Capital/revenue divide" | guidance | 2026 | https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim35000
Q: Define capital expenditure. | Spending on acquiring or improving non-current assets whose benefits last more than one accounting period.
Q: Is the cost of installing a new machine capital or revenue? | Capital: it is directly attributable to bringing the asset into working condition.
M1#finance-u02-01-q1@1: Which is revenue expenditure for a haulage firm? | Fuel for its lorries | A new lorry | Fitting a refrigerated unit that lets a lorry carry chilled goods | Legal fees for buying a depot | Fuel is consumed in day-to-day operations; the others create or improve non-current assets.
NUM2#finance-u02-01-q2@2: A machine costs £30,000 plus reclaimable VAT of £6,000. Delivery is £800, installation £1,200 and first-year insurance £500. What is the cost to capitalise, in £? | 32000 | 0 | £ | 30,000 + 800 + 1,200 = £32,000; reclaimable VAT and insurance are excluded.
M2#finance-u02-01-q3@2: A café replaces its worn floor tiles with identical new tiles for £4,000. How should this be treated? | Revenue expenditure: it restores the original condition | Capital expenditure, because it is a large amount | Capital expenditure, because the tiles last several years | A capital receipt | Like-for-like replacement maintains the asset's condition; it doesn't improve it, so it is a repair.
M3#finance-u02-01-q4@3: A company capitalises £50,000 of routine repairs as an improvement to its building. What is the effect this year? | Profit and non-current assets are both overstated, by up to £50,000 less any depreciation charged | Profit is understated by £50,000 | Only cash is affected | Liabilities are overstated by £50,000 | Moving an expense into assets raises profit and assets this year; the cost then leaks into later years through depreciation.
SA3#finance-u02-01-q5@2,3: Classify four costs of a new delivery van (price, sign-writing the company logo, road fund licence for the first year, a later engine rebuild that adds three years to its life) and analyse the effect of treating the price as an expense. | Purchase price and sign-writing are capital (cost of making it ready for use); the road fund licence is revenue (running cost); the engine rebuild that extends the life is capital. Expensing the price would understate profit and non-current assets this year and overstate profit in later years when no depreciation is charged, distorting comparisons and possibly tax. | Price capital ; Sign-writing capital ; Licence revenue ; Life-extending rebuild capital ; Effect on profit now and later

## Accruals and prepayments
LV: Introductory · Application
S: The accruals concept matches income and expenses to the period they belong to, not to when cash moves. This lesson adjusts expenses for accruals and prepayments, and income for accrued and deferred income.
O: Explain accruals, prepayments, accrued income and deferred income
O: Calculate the expense or income for the year and the year-end balances
O: Explain how the adjustments affect profit and the statement of financial position
PRE: Accounting concepts and conventions
H: Adjusting expenses
P: An **accrual** (accrued expense) is an expense incurred in the period but not yet paid or invoiced, such as electricity used in the last month. It increases the expense and is a current liability. A **prepayment** is an expense paid in advance for a later period, such as insurance paid for the next year. It reduces the expense and is a current asset.
E: Expense for the year = cash paid + closing accrual − opening accrual − closing prepayment + opening prepayment
X: A business with a 31 December year end pays rent of £1,200 a quarter in advance. In the year it paid £6,000, including £1,200 on 31 December for January to March. Electricity paid in the year was £2,100, and the December bill of £300 is unpaid.
> Rent expense = 6,000 − 1,200 = £4,800; prepayment £1,200 is a current asset.
> Electricity expense = 2,100 + 300 = £2,400; accrual £300 is a current liability.
> Entries: Dr Prepayments £1,200, Cr Rent £1,200; Dr Electricity £300, Cr Accruals £300.
H: Adjusting income
- **Accrued income**: income earned but not yet received, such as rent receivable for December still unpaid; it increases income and is a current asset.
- **Deferred income** (income received in advance): cash received for a later period, such as a customer's deposit or a subscription for next year; it reduces income and is a current liability.
P: Adjustments reverse at the start of the next period: last year's closing accrual becomes this year's opening accrual, so this year's payment of it isn't counted again.
K: Accruals increase expenses (liability); prepayments decrease expenses (asset); accrued income increases income (asset); deferred income decreases income (liability).
!: Mixing up the direction. Ask "has the business had the benefit yet?" An accrual is a benefit received but not paid; a prepayment is a payment made for a benefit still to come.
H: Why it matters
P: Without these adjustments, profit would depend on when bills happen to be paid, and businesses could shift profit between years by delaying or advancing payments. The adjustments make profit a measure of performance, and the balances show real obligations and rights at the year end.
EV: established | IAS 1 requires the accrual basis for all financial statements except cash flow information.
EV: hypothetical | If a firm ignored accruals, paying an annual insurance premium just before the year end would make one year's profit lower and the next year's higher with no change in performance.
T: Accrual | An expense incurred but not yet paid at the year end, shown as a current liability
T: Prepayment | An expense paid in advance for a future period, shown as a current asset
SUM: Expenses and income are matched to the period they relate to; cash timing is adjusted at the year end.
SUM: Accruals and deferred income are liabilities; prepayments and accrued income are assets.
SRC: IAS 1 Presentation of Financial Statements, paragraphs 27–28 | standard | 2007 | https://www.ifrs.org/issued-standards/list-of-standards/ias-1-presentation-of-financial-statements/
SRC: AQA, A level Accounting specification 7127 | standard | 2017
Q: How is a prepayment shown in the statement of financial position? | As a current asset.
Q: What is deferred income? | Cash received in advance for income that belongs to a later period; a current liability.
NUM1#finance-u02-02-q1@2: Insurance paid in the year was £3,600. At the year end £900 relates to next year, and there was no opening prepayment. What is the insurance expense, in £? | 2700 | 0 | £ | 3,600 − 900 = £2,700; the £900 is a prepayment.
NUM2#finance-u02-02-q2@2: Opening accrual for wages £800; wages paid £42,000; closing accrual £1,100. What is the wages expense, in £? | 42300 | 0 | £ | 42,000 + 1,100 − 800 = £42,300.
M1#finance-u02-02-q3@1: Electricity used in the last month of the year but not yet billed is an example of: | An accrual | A prepayment | Accrued income | Deferred income | The benefit has been received but not paid for, so it is an accrued expense, a current liability.
M2#finance-u02-02-q4@2: A landlord receives £9,000 rent in the year, including £1,500 paid in advance for next year, and £750 for this year is still owed by a tenant. What is rent income for the year? | £8,250 | £9,000 | £9,750 | £10,500 | 9,000 − 1,500 deferred + 750 accrued = £8,250.
M3#finance-u02-02-q5@3: A business fails to record a closing accrual of £2,000. What is the effect on this year's statements? | Profit is overstated and liabilities understated by £2,000 | Profit is understated and assets overstated by £2,000 | Only next year's profit is affected | There is no effect, because the bill will be paid next year | The expense is missing from this year, so profit is too high, and the obligation is missing from liabilities.
SA3#finance-u02-02-q6@2,3: Explain how accruals and prepayments apply the accruals concept, with a calculation, and the effect of the adjustments on the statement of financial position. | The accruals concept matches expenses to the period they are incurred in. Example: rent paid £5,000 including £1,000 for next year gives an expense of £4,000 and a prepayment (current asset) of £1,000; electricity paid £1,800 with £200 owing gives an expense of £2,000 and an accrual (current liability) of £200. Without them profit would reflect payment timing rather than the year's resources used. | Defines the accruals concept ; Correct prepayment calculation ; Correct accrual calculation ; Classifies balances ; Explains why profit is more meaningful

## Depreciation
LV: Introductory · Application
S: Depreciation spreads the cost of a non-current asset over the years it is used. This lesson explains why, calculates straight-line, reducing balance and units-of-production depreciation, and records it in the accounts.
O: Explain the purpose of depreciation and the factors that determine it
O: Calculate depreciation using the straight-line, reducing balance and units-of-production methods
O: Evaluate the choice of depreciation method and the role of estimates
PRE: Capital and revenue expenditure
H: What depreciation is
P: IAS 16 defines **depreciation** as the systematic allocation of the depreciable amount of an asset over its useful life. The **depreciable amount** is cost less **residual value** (the estimated amount obtainable at the end of the asset's life). It applies the accruals concept: a machine used for five years helps earn income in each of them, so each bears part of its cost. Depreciation isn't a way of valuing the asset, and it doesn't set aside cash. Land normally has an unlimited life and isn't depreciated.
H: Methods
E: Straight-line charge = (cost − residual value) ÷ useful life :: the same each year
E: Reducing balance charge = rate × carrying amount at the start of the year :: falls each year
E: Units of production charge = (cost − residual value) × units this year ÷ total expected units :: follows usage
X: A van costs £24,000, with a residual value of £4,000 after 5 years.
> Straight line: (24,000 − 4,000) ÷ 5 = £4,000 a year; carrying amount after year 2 = 24,000 − 8,000 = £16,000.
> Reducing balance at 25%: year 1 = 25% × 24,000 = £6,000; year 2 = 25% × 18,000 = £4,500; year 3 = 25% × 13,500 = £3,375.
> Units: if the van is expected to do 200,000 miles and does 50,000 in year 1, the charge is 20,000 × 50,000 ÷ 200,000 = £5,000.
H: Recording it
P: The entry is Dr Depreciation expense (statement of profit or loss), Cr Accumulated depreciation (a contra-asset account). The asset account stays at cost; the statement of financial position shows cost less accumulated depreciation = **carrying amount**. A business chooses a policy for part years: a full year's charge in the year of purchase and none in the year of sale, or a time-apportioned (monthly) charge.
- **Straight line** suits assets used evenly, such as buildings and fixtures.
- **Reducing balance** suits assets that lose more value or give more benefit early, such as vehicles and computers.
- **Units of production** suits assets whose wear depends on use, such as machines or mines.
K: Depreciation allocates cost less residual value over useful life using the method that best reflects how the asset's benefits are consumed; it is an expense, not a cash flow or a valuation.
!: Thinking depreciation provides money to replace the asset. It is a book entry: no cash moves when it is charged.
H: Judgement in depreciation
P: Useful life, residual value and method are estimates, and IAS 16 requires them to be reviewed at least at each financial year end. Changing an estimate affects the current and future years only (IAS 8). Because the estimates change profit, a longer useful life can flatter results; users compare depreciation policies when comparing companies.
EV: established | IAS 16 requires the depreciation method to reflect the pattern in which the asset's future economic benefits are expected to be consumed, and residual value and useful life to be reviewed at least each financial year end.
EV: contested | Whether historical-cost depreciation gives a meaningful measure of the cost of using assets during inflation, compared with replacement-cost approaches, has been debated since the current cost accounting experiments of the 1970s and 1980s.
T: Depreciable amount | The cost of an asset less its residual value
T: Carrying amount | Cost less accumulated depreciation (and impairment) shown in the statement of financial position
SUM: Depreciation spreads cost less residual value over useful life; it isn't a valuation or a cash fund.
SUM: Straight line gives equal charges; reducing balance falls each year; units of production follows use.
SRC: IAS 16 Property, Plant and Equipment, paragraphs 50–62 | standard | 2003 | https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/
SRC: ACCA, Financial Accounting (FA) syllabus and study guide | standard | 2025
Q: What is the depreciable amount? | Cost less residual value.
Q: What is the double entry for the depreciation charge? | Debit depreciation expense, credit accumulated depreciation.
NUM1#finance-u02-03-q1@2: A machine costs £50,000, has a residual value of £5,000 and a useful life of 9 years. What is the annual straight-line depreciation, in £? | 5000 | 0 | £ | (50,000 − 5,000) ÷ 9 = £5,000 a year.
NUM2#finance-u02-03-q2@2: Equipment costs £16,000 and is depreciated at 20% reducing balance. What is the charge in year 3, in £? | 2048 | 0 | £ | Year 1: 3,200 (carrying 12,800); year 2: 2,560 (carrying 10,240); year 3: 20% × 10,240 = £2,048.
M1#finance-u02-03-q3@1: Which asset is normally not depreciated? | Freehold land | Buildings | Delivery vehicles | Computer equipment | Land usually has an unlimited useful life, so it isn't depreciated; buildings on it are.
M2#finance-u02-03-q4@2: Which method best suits a mining machine whose wear depends on tonnes extracted? | Units of production | Straight line | Reducing balance | No depreciation | Units of production links the charge to use, matching the consumption of the machine's benefits.
M3#finance-u02-03-q5@3: A company extends the estimated useful life of its fleet from 4 to 6 years. What is the main effect, and why might users be cautious? | Annual depreciation falls and profit rises, without any change in cash or operations | Depreciation rises, reducing profit | Past years' profits are restated | Cash flow improves because less depreciation is paid | A longer life spreads the cost over more years, raising current profit; users should ask whether the new estimate reflects reality or flatters results.
SA3#finance-u02-03-q6@2,3: Calculate two years' depreciation on a £40,000 asset with a £4,000 residual value under straight line (4 years) and reducing balance (40%), and evaluate which method is more appropriate for a delivery van. | Straight line: 36,000 ÷ 4 = £9,000 each year. Reducing balance: year 1 40% × 40,000 = £16,000; year 2 40% × 24,000 = £9,600. A van loses more value and gives more trouble-free use early, while repairs rise later, so reducing balance matches expense to benefit better and keeps total running cost more even; straight line is simpler and comparable. The choice must reflect the pattern of benefits and be applied consistently. | Straight-line £9,000 ; Reducing balance £16,000 then £9,600 ; Pattern of benefit for a van ; Strength of the other method ; Judgement with consistency

## Disposal of non-current assets
LV: Introductory · Application
S: When a non-current asset is sold or scrapped, its cost and accumulated depreciation are removed and any profit or loss on disposal is calculated. This lesson uses the disposal account, including part-exchange.
O: Explain why a profit or loss on disposal arises
O: Prepare the disposal account and journal entries for a sale or part-exchange
O: Interpret a profit or loss on disposal as an adjustment to past depreciation
PRE: Depreciation
H: The disposal account
- Dr Disposal, Cr Asset at cost: removes the asset.
- Dr Accumulated depreciation, Cr Disposal: removes its depreciation.
- Dr Bank (or receivable), Cr Disposal: records the proceeds.
- The balancing figure is a **profit** on disposal if the credits (depreciation and proceeds) exceed the cost, or a **loss** if they fall short; it is transferred to the statement of profit or loss.
E: Profit or loss on disposal = proceeds − carrying amount at the date of disposal
X: A machine cost £20,000 and accumulated depreciation is £13,500. It is sold for £5,000.
> Carrying amount = 20,000 − 13,500 = £6,500.
> Loss on disposal = 5,000 − 6,500 = −£1,500.
> Disposal account: debit £20,000 (cost); credits £13,500 (depreciation) and £5,000 (bank); balancing figure £1,500 credit to close it, debited to profit or loss as a loss.
H: Part-exchange
P: When an old asset is traded in against a new one, the **part-exchange allowance** acts as the disposal proceeds. Entries: Dr New asset (full price), Cr Disposal (allowance), and Cr Bank or payable for the balance paid. For example, a new van costs £30,000; the dealer allows £7,000 for the old van and £23,000 is paid: Dr Van £30,000, Cr Disposal £7,000, Cr Bank £23,000.
K: Disposal removes cost and accumulated depreciation; comparing proceeds with the carrying amount gives a profit or loss that corrects past depreciation.
!: Recording the new asset at the cash paid in a part-exchange. The new asset is recorded at its full cost; the allowance is the proceeds of the old asset.
H: Interpreting the result
P: A profit or loss on disposal mostly shows that past depreciation estimates were not exact: a loss means too little was charged, a profit too much. It is not a trading gain. Large or recurring disposal profits can flatter profit and are usually disclosed separately. Depreciation in the year of disposal follows the business's policy (none, or time-apportioned to the date of sale).
EV: established | IAS 16 requires the gain or loss on derecognition to be the difference between net disposal proceeds and carrying amount, included in profit or loss, and gains not to be classified as revenue.
EV: hypothetical | A business that systematically overestimates useful lives would show recurring losses on disposal, signalling that its depreciation policy flatters reported profit.
T: Disposal account | A temporary ledger account that brings together cost, accumulated depreciation and proceeds of an asset disposed of
T: Part-exchange allowance | The value given for an old asset traded in against a new one, treated as its disposal proceeds
SUM: Profit or loss on disposal = proceeds − carrying amount; cost and depreciation are removed via the disposal account.
SUM: Part-exchange allowances are proceeds; the new asset is recorded at full cost.
SRC: IAS 16 Property, Plant and Equipment, paragraphs 67–72 | standard | 2003 | https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/
SRC: AQA, A level Accounting specification 7127 | standard | 2017
Q: How is the profit or loss on disposal calculated? | Proceeds minus the carrying amount (cost less accumulated depreciation) at the date of disposal.
Q: What does a loss on disposal usually indicate? | That depreciation charged in earlier years was less than the fall in the asset's value.
NUM2#finance-u02-04-q1@2: Equipment cost £12,000 and has accumulated depreciation of £9,200. It is sold for £3,400. What is the profit on disposal, in £? | 600 | 0 | £ | Carrying amount 12,000 − 9,200 = £2,800; profit 3,400 − 2,800 = £600.
M1#finance-u02-04-q2@1: Which entry removes accumulated depreciation when an asset is sold? | Debit accumulated depreciation, credit disposal | Debit disposal, credit accumulated depreciation | Debit bank, credit accumulated depreciation | Debit depreciation expense, credit disposal | Accumulated depreciation is a credit balance, so it is debited to remove it, and the disposal account is credited.
M2#finance-u02-04-q3@2: A new machine costing £18,000 is bought by trading in an old one for an allowance of £2,500, with the rest paid by bank. What is debited to the machinery account? | £18,000 | £15,500 | £2,500 | £20,500 | The new asset is recorded at full cost; the £2,500 allowance is credited to disposal, and £15,500 is paid.
M3#finance-u02-04-q4@3: A company reports a large profit on disposal of vehicles every year. What is the best interpretation? | Its depreciation is probably too high, so it is shifting profit into disposal gains | It is an efficient vehicle trader | Its vehicles are increasing in value | Its revenue is understated | Repeated disposal profits mean the carrying amounts were consistently too low: depreciation charged was more than the actual fall in value.
SA3#finance-u02-04-q5@2,3: A vehicle bought for £25,000 has accumulated depreciation of £16,000 and is part-exchanged for a new one costing £32,000 with an allowance of £7,500. Prepare the key entries and interpret the result. | Dr Disposal 25,000, Cr Vehicles 25,000; Dr Accumulated depreciation 16,000, Cr Disposal 16,000; Dr Vehicles 32,000, Cr Disposal 7,500, Cr Bank 24,500. Carrying amount £9,000; proceeds £7,500; loss £1,500 to profit or loss. The loss shows depreciation was slightly too low over the van's life; it is an adjustment to past estimates, not a trading loss. | Cost and depreciation removed ; New vehicle at £32,000 ; Allowance as proceeds and £24,500 paid ; Loss of £1,500 ; Interpretation

## Irrecoverable debts and allowances for receivables
LV: Introductory · Application
S: Some customers never pay. This lesson writes off irrecoverable debts, records recoveries, and sets up and adjusts an allowance for receivables, linking it to the expected credit loss model in IFRS 9.
O: Distinguish an irrecoverable debt from an allowance for receivables
O: Record write-offs, recoveries and changes in the allowance
O: Explain how IFRS 9's expected credit loss model changes the approach
PRE: Recording cash and credit transactions
H: Writing off a debt
P: An **irrecoverable debt** (bad debt) is one the business is sure it won't collect, for example because the customer is insolvent. It is written off: Dr Irrecoverable debts expense, Cr the customer (and receivables control). If a written-off debt is later paid, the debt is reinstated and the receipt recorded, or simply: Dr Bank, Cr Irrecoverable debts recovered (income).
H: The allowance for receivables
P: Some remaining debts may also not be paid, though no individual customer can yet be identified. Applying prudence and accruals, the business estimates the shortfall as an **allowance for receivables** (formerly provision for doubtful debts). Only the **change** in the allowance goes to profit or loss each year: an increase is an expense, a decrease is income (or a reduction of the expense). The allowance is deducted from receivables in the statement of financial position.
X: At the year end receivables are £42,000 before write-offs. Debts of £2,000 are irrecoverable. The allowance is to be 3% of remaining receivables; last year's allowance was £1,500.
> Receivables after write-off = 42,000 − 2,000 = £40,000.
> Allowance required = 3% × 40,000 = £1,200.
> Change = 1,200 − 1,500 = a decrease of £300, credited to profit or loss.
> Profit or loss: irrecoverable debts £2,000 expense, less £300 reduction in allowance: net charge £1,700.
> Statement of financial position: receivables £40,000 less allowance £1,200 = £38,800.
K: Irrecoverable debts are written off against the customer; the allowance estimates further losses, and only its change each year affects profit.
!: Charging the whole allowance to profit every year. Only the increase or decrease since last year is recognised; the balance carries forward.
H: Expected credit losses under IFRS 9
P: IFRS 9 requires allowances to reflect **expected credit losses**, using reasonable forecasts as well as past experience, rather than waiting for evidence that a loss has happened. For trade receivables without a significant financing component, entities use the **simplified approach**: a loss allowance equal to lifetime expected credit losses, often estimated with a provision matrix that applies higher loss rates to older debts.
EV: established | IFRS 9 (effective 2018) replaced IAS 39's incurred-loss model with an expected credit loss model, requiring the simplified lifetime approach for trade receivables without a significant financing component.
EV: contested | Expected-loss models were adopted after criticism that incurred-loss rules recognised bank losses "too little, too late" before the 2007–08 crisis; critics argue the forward-looking estimates add subjectivity and can be procyclical.
T: Irrecoverable debt | A receivable that will not be collected and is written off as an expense
T: Allowance for receivables | An estimate of losses on remaining receivables, deducted from receivables in the statement of financial position
SUM: Write off irrecoverable debts; recognise only the change in the allowance in profit or loss.
SUM: Under IFRS 9, allowances reflect expected credit losses, using the simplified lifetime approach for trade receivables.
SRC: IFRS 9 Financial Instruments, section 5.5 "Impairment" (paragraph 5.5.15 simplified approach) | standard | 2014 | https://www.ifrs.org/issued-standards/list-of-standards/ifrs-9-financial-instruments/
SRC: ACCA, Financial Accounting (FA) syllabus and study guide | standard | 2025
Q: What is the entry to write off an irrecoverable debt? | Debit irrecoverable debts expense, credit the customer's account (receivables).
Q: How does an allowance for receivables appear in the statement of financial position? | Deducted from trade receivables, showing the net amount expected to be collected.
NUM2#finance-u02-05-q1@2: Receivables are £60,000 after write-offs. The allowance is to be 4%, and last year's allowance was £1,800. By how much does the allowance increase, in £? | 600 | 0 | £ | Required 4% × 60,000 = £2,400; increase 2,400 − 1,800 = £600, charged to profit or loss.
M1#finance-u02-05-q2@1: When should a debt be written off as irrecoverable? | When it is certain it won't be collected, for example because the customer is insolvent | When it is one day overdue | When the customer queries an invoice | At the end of every year, for all receivables | Write-off is for debts known to be uncollectable; uncertain debts are covered by the allowance instead.
M2#finance-u02-05-q3@2: A debt of £800 written off last year is unexpectedly paid. What is the simplest entry? | Debit bank £800, credit irrecoverable debts recovered £800 | Debit irrecoverable debts £800, credit bank £800 | Debit sales £800, credit bank £800 | Debit bank £800, credit allowance for receivables £800 | The recovery is income this year; reinstating and then clearing the customer's account gives the same result.
TF2#finance-u02-05-q4@2: A decrease in the allowance for receivables increases profit. | true | Only the change in the allowance goes to profit or loss; a decrease is a credit (income or a reduction in the expense).
M3#finance-u02-05-q5@3: Why did IFRS 9 move from an incurred-loss to an expected-loss model? | Incurred-loss rules delayed recognising losses until there was evidence of impairment, which was criticised after the financial crisis | Expected losses are always smaller | Incurred losses were too subjective to audit | IFRS 9 abolished allowances for receivables | Waiting for a loss event meant allowances lagged reality; the expected-loss model uses forward-looking information to recognise losses earlier.
SA3#finance-u02-05-q6@2,3: Receivables are £85,000 before writing off £5,000; the allowance is to be 2.5% of the remainder, and last year's was £1,500. Calculate the effects and explain the difference between the write-off and the allowance. | Receivables after write-off £80,000; allowance required £2,000; increase £500. Profit or loss: irrecoverable debts £5,000 and increase in allowance £500, total £5,500. Statement of financial position: receivables £80,000 less allowance £2,000 = £78,000. The write-off removes specific debts known to be lost; the allowance is an estimate of further losses on remaining debts, applying prudence and, under IFRS 9, expected credit losses. | Allowance £2,000 ; Increase £500 ; Net receivables £78,000 ; Total charge £5,500 ; Distinguishes write-off from estimate

## Inventory valuation
LV: Introductory · Application
S: Closing inventory directly changes cost of sales and profit. This lesson applies IAS 2: inventory at the lower of cost and net realisable value, with cost measured by FIFO or weighted average, and shows why LIFO isn't allowed.
O: State the IAS 2 rule for valuing inventory and what cost includes
O: Calculate closing inventory using FIFO and weighted average cost, and apply the lower of cost and NRV
O: Evaluate how the valuation method affects profit
PRE: Accounting concepts and conventions
H: The IAS 2 rule
P: IAS 2 requires inventory to be measured at the **lower of cost and net realisable value** (NRV). **Cost** includes the purchase price, import duties, carriage inwards and, for manufactured goods, conversion costs (direct labour and production overheads). It excludes abnormal waste, storage (unless needed in production), administrative overheads and selling costs. **NRV** is the estimated selling price less the estimated costs of completion and of making the sale. The comparison is made item by item, or for groups of similar items, never for inventory as a whole.
X: Three product lines at the year end.
> Line A: cost £4,000, NRV £5,200: value at £4,000.
> Line B: cost £2,500, selling price £2,600 but £400 of repairs needed to sell: NRV £2,200, so value at £2,200.
> Line C: cost £1,800, NRV £1,950: value at £1,800.
> Total = 4,000 + 2,200 + 1,800 = £8,000; comparing the totals (cost 8,300 against NRV 9,350) would wrongly give £8,300.
H: Cost formulas
- **FIFO** (first in, first out): items sold are assumed to be the oldest, so closing inventory is valued at the latest prices.
- **Weighted average cost** (AVCO): each item is valued at the average cost of the units available, recalculated after each purchase (perpetual) or for the period (periodic).
- **LIFO** (last in, first out) is prohibited by IAS 2: it values inventory at old prices that may bear no relation to current costs.
X: Opening inventory 100 units at £5; purchases 200 units at £6; 150 units sold in the period.
> FIFO: the 150 sold are 100 at £5 and 50 at £6; closing 150 units at £6 = £900.
> AVCO: total cost 500 + 1,200 = £1,700 for 300 units = £5.667 each; closing 150 × 5.667 = £850.
> With rising prices FIFO gives higher closing inventory, lower cost of sales and higher profit (by £50 here).
K: Inventory is valued at the lower of cost and NRV, item by item; FIFO and weighted average are allowed, LIFO is not.
!: Including selling costs in inventory cost. Delivery to customers and sales commission are deducted in arriving at NRV, but are never part of cost.
H: Effect on profit
P: Because cost of sales = opening inventory + purchases − closing inventory, an overstatement of closing inventory overstates this year's profit by the same amount, and then reduces next year's profit, because it becomes next year's opening inventory. That makes inventory a classic area for both error and fraud.
EV: established | IAS 2 permits FIFO and weighted average cost formulas and does not permit LIFO.
EV: contested | US GAAP still allows LIFO, partly because of its US tax advantages in times of inflation; whether its prohibition under IFRS gives a better measure of profit is debated.
T: Net realisable value | Estimated selling price less estimated costs of completion and of making the sale
T: FIFO | A cost formula assuming the oldest items are sold first, so closing inventory is at the most recent prices
SUM: Inventory = lower of cost and NRV, item by item; cost excludes selling, admin and abnormal costs.
SUM: FIFO gives higher profit than AVCO when prices rise; LIFO is prohibited by IAS 2.
SRC: IAS 2 Inventories, paragraphs 9–16, 25 and 28–29 | standard | 2003 | https://www.ifrs.org/issued-standards/list-of-standards/ias-2-inventories/
SRC: AQA, A level Accounting specification 7127 | standard | 2017
Q: State the IAS 2 rule for valuing inventory. | The lower of cost and net realisable value, applied item by item or to groups of similar items.
Q: Which cost formula does IAS 2 prohibit? | LIFO (last in, first out).
NUM2#finance-u02-06-q1@2: An item cost £900. It can be sold for £1,000 after repairs of £150 and delivery of £40. At what value should it be included in inventory, in £? | 810 | 0 | £ | NRV = 1,000 − 150 − 40 = £810, lower than cost of £900, so value at £810.
M1#finance-u02-06-q2@1: Which cost is included in the cost of purchased inventory? | Carriage inwards | Carriage outwards | Sales commission | Head office rent | Carriage inwards brings the goods to their present location; the others are selling or administrative costs.
M2#finance-u02-06-q3@2: Prices are rising. Compared with weighted average cost, FIFO gives: | Higher closing inventory and higher profit | Lower closing inventory and higher profit | Higher cost of sales and lower profit | The same profit | With rising prices FIFO leaves the newest, dearer units in inventory, so cost of sales is lower and profit higher.
M3#finance-u02-06-q4@3: Closing inventory this year is overstated by £5,000. What is the effect over two years, ignoring tax? | This year's profit is overstated by £5,000 and next year's understated by £5,000 | Both years' profits are overstated by £5,000 | Only this year is affected | Only next year is affected | Closing inventory reduces cost of sales this year; as next year's opening inventory it increases next year's cost of sales, so the error reverses.
SA3#finance-u02-06-q5@2,3: Explain how IAS 2 values inventory, and evaluate the effect of choosing FIFO rather than weighted average cost when prices are rising. | Inventory is valued at the lower of cost and NRV item by item; cost includes purchase and conversion costs, not selling or admin costs; FIFO and weighted average are allowed, LIFO isn't. With rising prices FIFO gives higher closing inventory, lower cost of sales and higher profit than AVCO; the statement of financial position is closer to current cost, but profit includes holding gains. The choice must be applied consistently so years can be compared. | Lower of cost and NRV ; What cost includes and excludes ; FIFO higher inventory and profit ; Evaluation of relevance or holding gains ; Consistency

## The extended trial balance
LV: Intermediate · Application
S: The extended trial balance is a worksheet that takes the trial balance, adds year-end adjustments and sorts every figure into the statement of profit or loss or the statement of financial position. This lesson builds one step by step.
O: Describe the columns of an extended trial balance
O: Enter adjustments for inventory, accruals, prepayments, depreciation and allowances
O: Explain how the profit figure balances the worksheet
PRE: The trial balance
H: The layout
- **Ledger balances**: debit and credit columns from the trial balance.
- **Adjustments**: debit and credit columns for each year-end journal (closing inventory, accruals, prepayments, depreciation, irrecoverable debts, allowance changes, corrections).
- **Statement of profit or loss**: debit (expenses) and credit (income) columns.
- **Statement of financial position**: debit (assets, drawings) and credit (liabilities, capital) columns.
P: Each line's balance after adjustments is extended to either the profit or loss columns or the financial position columns. Every adjustment has an equal debit and credit, so the adjustment columns agree.
H: Entering the adjustments
P: Closing inventory needs two lines: Dr Closing inventory (financial position, an asset) and Cr Closing inventory (profit or loss, reducing cost of sales). Accruals and prepayments are entered against the expense and on new accrual or prepayment lines. Depreciation is Dr Depreciation expense, Cr Accumulated depreciation.
X: Extract from an extended trial balance: rent £6,000 debit with a £1,000 prepayment; electricity £2,000 debit with a £250 accrual; closing inventory £7,500.
> Rent: adjustment credit £1,000; extend £5,000 debit to profit or loss. Prepayment line: £1,000 debit to financial position.
> Electricity: adjustment debit £250; extend £2,250 debit to profit or loss. Accruals line: £250 credit to financial position.
> Closing inventory: £7,500 credit in profit or loss and £7,500 debit in financial position.
H: The balancing profit
P: When everything is extended, the profit or loss credit column (income) exceeds the debit column (expenses) by the profit. Profit is entered as a debit in the profit or loss columns and a credit in the financial position columns (added to capital), so both pairs balance. A loss is the reverse. If the financial position columns don't balance after this, there is an extension error.
K: The extended trial balance carries each balance, adjusted, to one of the two statements; the profit figure is the balancing item that makes both pairs of columns agree.
!: Extending closing inventory only once. It must appear in both statements: as an asset and as a reduction in cost of sales.
EV: established | The extended trial balance is a standard worksheet in UK bookkeeping qualifications, used to move from the trial balance to the financial statements.
EV: contested | Whether the extended trial balance still teaches something useful when software produces statements directly is debated; supporters say it makes the link between adjustments and both statements visible.
T: Extended trial balance | A worksheet that adjusts the trial balance and sorts each figure into the statement of profit or loss or of financial position
T: Adjustment | A year-end journal entry, such as an accrual, prepayment, depreciation or inventory entry, made before the statements are prepared
SUM: The extended trial balance has ledger, adjustment, profit or loss and financial position columns.
SUM: Profit balances both sets of statement columns; closing inventory goes in both statements.
SRC: Wood F. and Sangster A., Frank Wood's Business Accounting 1, 14th edition, Pearson | secondary | 2018
SRC: ACCA, Financial Accounting (FA) syllabus and study guide | standard | 2025
Q: What are the four pairs of columns in an extended trial balance? | Ledger balances, adjustments, statement of profit or loss, statement of financial position.
Q: How is profit entered in an extended trial balance? | As a debit in the profit or loss columns and a credit in the financial position columns.
M1#finance-u02-07-q1@1: Where is a prepayment extended in the extended trial balance? | The statement of financial position debit column | The statement of profit or loss credit column | The statement of financial position credit column | The adjustments column only | A prepayment is an asset, so it is a debit in the financial position columns.
NUM2#finance-u02-07-q2@2: In an extended trial balance, the profit or loss credit column totals £185,000 and the debit column £162,400. What is the profit, in £? | 22600 | 0 | £ | Income exceeds expenses by 185,000 − 162,400 = £22,600.
M2#finance-u02-07-q3@2: Wages in the trial balance are £30,000 and £1,200 is owed at the year end. What is extended to the profit or loss debit column? | £31,200 | £28,800 | £30,000 | £1,200 | The accrual adds to the expense: 30,000 + 1,200 = £31,200, and a £1,200 accrual is shown as a liability.
M3#finance-u02-07-q4@3: After extending everything and inserting profit, the financial position columns differ by £900. What is the most likely cause? | An item extended to the wrong column or for the wrong amount | The profit figure is always £900 out | The trial balance columns never agree | Closing inventory was entered in both statements | Profit is calculated from the profit or loss columns, so a remaining difference signals an extension error, such as an asset placed on the credit side.
SA3#finance-u02-07-q5@2,3: Explain how an extended trial balance moves from the trial balance to the financial statements, using closing inventory and an accrual as examples. | Start with ledger balances; enter year-end adjustments as debit and credit pairs; extend each adjusted balance to profit or loss (income and expenses) or financial position (assets, liabilities, capital, drawings). Closing inventory is credited in profit or loss (reducing cost of sales) and debited in financial position (asset). An accrual is debited to the expense, increasing it, and credited to an accruals line shown as a liability. Profit is the balancing figure in both pairs. | Describes the columns ; Adjustments as pairs ; Closing inventory in both statements ; Accrual increases expense and creates liability ; Profit as balancing figure

## The statement of profit or loss
LV: Introductory · Application
S: The statement of profit or loss shows a business's income and expenses for a period and the profit that results. This lesson prepares one for a sole trader, from revenue and cost of sales to gross profit and profit for the year.
O: Describe the structure of a sole trader's statement of profit or loss
O: Prepare a statement of profit or loss including cost of sales, returns and carriage
O: Distinguish gross profit from profit for the year and explain what each shows
PRE: The extended trial balance
H: The structure
E: Revenue = sales − returns inwards :: net sales
E: Cost of sales = opening inventory + purchases + carriage inwards − returns outwards − closing inventory
E: Gross profit = revenue − cost of sales :: profit from trading
E: Profit for the year = gross profit + other income − expenses
P: **Gross profit** shows how much the business earns from buying and selling (or making and selling) before overheads. **Profit for the year** (net profit) is what remains after all expenses, including depreciation, irrecoverable debts and the changes in allowances, and after other income such as rent received or discounts received.
X: Prepare a statement of profit or loss for Amira for the year to 31 March.
> Revenue: sales £120,000 − returns inwards £2,000 = £118,000.
> Cost of sales: opening inventory £9,000 + purchases £70,000 + carriage inwards £1,000 − returns outwards £1,500 − closing inventory £10,500 = £68,000.
> Gross profit = 118,000 − 68,000 = £50,000.
> Expenses: wages £22,000, rent £8,000, depreciation £4,000, carriage outwards £1,200, irrecoverable debts £800 = £36,000.
> Profit for the year = 50,000 − 36,000 = £14,000.
K: Revenue less cost of sales gives gross profit; gross profit plus other income less all expenses gives profit for the year, which is added to the owner's capital.
!: Putting carriage outwards in cost of sales. Carriage inwards is part of the cost of buying goods; carriage outwards (delivery to customers) is a selling expense.
H: Reading the statement
P: Comparing gross profit with revenue (the gross margin) shows pricing and buying efficiency; comparing profit for the year with revenue shows overall control of costs. Sole traders aren't required to follow IAS 1's format, but the same layout is used and HMRC's Self Assessment return asks for income and expenses in similar categories. Drawings never appear in this statement.
EV: established | Under the accruals concept, cost of sales is the cost of the goods actually sold in the period, which requires adjusting purchases for opening and closing inventory.
EV: contested | Whether profit for the year or a cash-based measure is the better guide to a small business's performance is debated; HMRC made the cash basis the default for most unincorporated businesses from 2024–25.
T: Gross profit | Revenue less cost of sales: the profit from trading before overheads
T: Cost of sales | The cost of the goods sold in the period: opening inventory plus net purchases less closing inventory
SUM: Revenue − cost of sales = gross profit; gross profit + other income − expenses = profit for the year.
SUM: Carriage inwards is cost of sales; carriage outwards is an expense; drawings are excluded.
SRC: AQA, A level Accounting specification 7127 | standard | 2017
SRC: IAS 1 Presentation of Financial Statements, paragraphs 81A–105 | standard | 2007 | https://www.ifrs.org/issued-standards/list-of-standards/ias-1-presentation-of-financial-statements/
Q: How is cost of sales calculated? | Opening inventory + purchases + carriage inwards − returns outwards − closing inventory.
Q: What is the difference between gross profit and profit for the year? | Gross profit is before overheads; profit for the year is after all expenses and other income.
NUM2#finance-u02-08-q1@2: Opening inventory £6,000, purchases £45,000, returns outwards £1,000, carriage inwards £500, closing inventory £7,500. What is cost of sales, in £? | 43000 | 0 | £ | 6,000 + 45,000 + 500 − 1,000 − 7,500 = £43,000.
M1#finance-u02-08-q2@1: Where does carriage outwards appear? | Among the expenses, after gross profit | In cost of sales | Deducted from revenue | In the statement of financial position | Delivering goods to customers is a selling cost, so it is an expense below gross profit.
NUM1#finance-u02-08-q3@2: Revenue is £90,000 and cost of sales £54,000. Expenses are £21,000 and rent received is £3,000. What is profit for the year, in £? | 18000 | 0 | £ | Gross profit 36,000 + 3,000 − 21,000 = £18,000.
M2#finance-u02-08-q4@2: Gross profit has risen but profit for the year has fallen. Which is the most likely explanation? | Overheads such as wages or rent have risen faster than gross profit | Sales have fallen | Cost of sales has risen sharply | Closing inventory has increased | Gross profit is before overheads; if it rises while profit falls, expenses below gross profit must have grown more.
M3#finance-u02-08-q5@3: A sole trader includes £12,000 of drawings among expenses. What is the effect, and why does it matter? | Profit is understated by £12,000, which misstates performance and taxable profit | Profit is overstated by £12,000 | Capital is overstated by £12,000 | There is no effect, as drawings and expenses both reduce capital | Drawings reduce capital directly; treating them as expenses reduces reported profit and would understate taxable profit.
SA3#finance-u02-08-q6@2,3: Prepare the key figures of a statement of profit or loss from: sales £80,000, returns inwards £1,000, opening inventory £5,000, purchases £48,000, closing inventory £6,000, expenses £19,000; then explain what gross profit and profit for the year each show. | Revenue 79,000; cost of sales 5,000 + 48,000 − 6,000 = 47,000; gross profit 32,000; profit for the year 32,000 − 19,000 = 13,000. Gross profit shows the margin earned on trading, reflecting pricing and buying; profit for the year shows what is left for the owner after all costs, reflecting overall efficiency. | Revenue £79,000 ; Cost of sales £47,000 ; Gross profit £32,000 ; Profit £13,000 ; Explains each measure

## The statement of financial position
LV: Introductory · Application
S: The statement of financial position shows what a business owns and owes, and the owner's capital, at one date. This lesson prepares one for a sole trader, including net current assets and the capital section.
O: Describe the layout of a sole trader's statement of financial position
O: Prepare a statement of financial position including year-end adjustments
O: Interpret net current assets and the capital section
PRE: The statement of profit or loss
H: The layout
- **Non-current assets**: at cost less accumulated depreciation, giving carrying amounts.
- **Current assets**: inventory, trade receivables less allowance, prepayments and accrued income, bank and cash.
- **Current liabilities**: trade payables, accruals and deferred income, bank overdraft, loan instalments due within a year.
- **Net current assets** (working capital) = current assets − current liabilities.
- **Non-current liabilities**: long-term loans.
- **Net assets** = non-current assets + net current assets − non-current liabilities.
- **Capital**: opening capital + capital introduced + profit for the year − drawings = closing capital, which equals net assets.
X: Prepare Amira's statement of financial position at 31 March.
> Non-current assets: premises £80,000; equipment cost £30,000 less accumulated depreciation £12,000 = £18,000; total £98,000.
> Current assets: inventory £10,500; receivables £14,000 less allowance £700 = £13,300; prepayments £600; bank £3,600; total £28,000.
> Current liabilities: payables £9,000; accruals £1,000; total £10,000. Net current assets = £18,000.
> Non-current liabilities: bank loan £20,000. Net assets = 98,000 + 18,000 − 20,000 = £96,000.
> Capital: opening £92,000 + profit £14,000 − drawings £10,000 = £96,000, equal to net assets.
P: The adjustments from earlier lessons all land here: prepayments and accrued income join current assets; accruals and deferred income join current liabilities; accumulated depreciation is deducted from non-current assets at cost; and the allowance for receivables is deducted from trade receivables. Closing inventory, counted and valued under IAS 2, is the inventory figure.
K: Net assets equal closing capital: the statement of financial position is the accounting equation set out in detail at one date.
!: Adding drawings to capital or putting them among liabilities. Drawings reduce capital and are deducted in the capital section.
H: What it tells users
P: Net current assets show whether short-term debts are covered by short-term assets; a negative figure can signal liquidity problems. The split of finance between capital and loans shows how much the business depends on borrowing. But the statement is a snapshot at one date, values many assets at historical cost less depreciation rather than market value, and leaves out unrecorded assets such as internally built reputation.
EV: established | The statement of financial position presents the accounting equation at the reporting date, with current and non-current items separated as IAS 1 requires.
EV: contested | Whether historical-cost carrying amounts are useful to users, compared with current values, is debated; IFRS allows revaluation for some assets but most businesses use cost.
T: Net current assets | Current assets less current liabilities; also called working capital
T: Net assets | Total assets less total liabilities, equal to the owner's capital
SUM: Non-current assets + net current assets − non-current liabilities = net assets = closing capital.
SUM: Closing capital = opening capital + capital introduced + profit − drawings.
SRC: IAS 1 Presentation of Financial Statements, paragraphs 54–80A | standard | 2007 | https://www.ifrs.org/issued-standards/list-of-standards/ias-1-presentation-of-financial-statements/
SRC: AQA, A level Accounting specification 7127 | standard | 2017
Q: What are net current assets? | Current assets minus current liabilities.
Q: How is closing capital calculated for a sole trader? | Opening capital + capital introduced + profit for the year − drawings.
NUM2#finance-u02-09-q1@2: Non-current assets are £64,000, current assets £21,000, current liabilities £13,000 and a long-term loan £15,000. What are net assets, in £? | 57000 | 0 | £ | 64,000 + (21,000 − 13,000) − 15,000 = £57,000.
M1#finance-u02-09-q2@1: In which section of the statement of financial position does an accrual appear? | Current liabilities | Current assets | Non-current assets | Capital | An accrual is an expense owed at the year end, a current liability.
M2#finance-u02-09-q3@2: Opening capital is £50,000, profit £18,000 and drawings £21,000. What is closing capital? | £47,000 | £53,000 | £89,000 | £11,000 | 50,000 + 18,000 − 21,000 = £47,000: drawings exceeded profit, so capital fell.
M3#finance-u02-09-q4@3: A business has net current liabilities (current liabilities exceed current assets). What is the best interpretation? | It may struggle to pay short-term debts unless it generates cash quickly or has reliable finance | It is certainly insolvent and must close | It is very profitable | It has too much inventory | Negative working capital is a warning sign, though some businesses, such as supermarkets paid in cash, run that way safely; context matters.
SA3#finance-u02-09-q5@2,3: Explain how a sole trader's statement of financial position reflects the accounting equation, and evaluate its usefulness to a lender. | Assets less liabilities (net assets) equal closing capital, which is opening capital plus profit less drawings. A lender can see existing borrowings, net current assets as a sign of liquidity and assets that might be security. Limitations: it is a snapshot that may be untypical, assets are at historical cost not realisable value, and it says nothing about future cash flows, so lenders also want forecasts and the profit and cash history. | Net assets equal capital ; Capital section explained ; Liquidity from net current assets ; Security and existing debt ; Limitations

## Incomplete records
LV: Intermediate · Application
S: Many small businesses don't keep full double-entry records. This lesson finds profit from changes in net assets, rebuilds missing figures with control accounts and uses mark-up and margin to find sales or cost of sales.
O: Calculate profit from opening and closing capital using statements of affairs
O: Reconstruct sales, purchases and missing balances with control accounts and the cash book
O: Apply mark-up and margin to find missing trading figures
PRE: The accounting equation
H: Profit from changes in capital
P: If only lists of assets and liabilities exist, a **statement of affairs** at each date gives opening and closing capital (assets − liabilities). Because capital grows by profit and capital introduced and falls by drawings:
E: Profit = closing capital − opening capital + drawings − capital introduced
X: A market trader's net assets were £32,000 at the start of the year and £41,000 at the end. Drawings were £15,000 and the trader paid in a £4,000 inheritance.
> Increase in capital = 41,000 − 32,000 = £9,000.
> Add back drawings, which reduced capital: 9,000 + 15,000 = £24,000.
> Deduct capital introduced, which isn't profit: 24,000 − 4,000 = £20,000 profit.
H: Rebuilding the accounts
- **Sales**: from a receivables control account: credit sales = receipts from customers + closing receivables − opening receivables (+ discounts allowed and irrecoverable debts). Add cash sales.
- **Purchases**: from a payables control account: credit purchases = payments to suppliers + closing payables − opening payables (+ discounts received).
- **Cash book**: a missing figure such as drawings or cash stolen is the balancing figure once all known receipts and payments are entered.
H: Mark-up and margin
E: Mark-up = gross profit ÷ cost of sales :: profit as a share of cost
E: Margin = gross profit ÷ revenue :: profit as a share of selling price
P: A mark-up of 25% means a margin of 20%: goods costing £100 sell for £125, giving £25 profit, which is 25/125 = 20% of the price. If cost of sales is £60,000 and mark-up 25%, sales are £75,000. Comparing expected gross profit with actual inventory can reveal missing inventory, such as goods lost in a fire or stolen.
K: With incomplete records, profit comes from the change in net assets adjusted for drawings and capital introduced; control accounts, the cash book and mark-up or margin fill in missing figures.
!: Using the mark-up percentage as if it were a margin. A 25% mark-up on cost is only a 20% margin on sales; always check which base a percentage uses.
EV: established | The relationships margin = mark-up ÷ (1 + mark-up) and mark-up = margin ÷ (1 − margin) follow directly from their definitions.
EV: hypothetical | If a trader's records showed a gross margin well below the usual margin for the trade, HMRC or an accountant would suspect unrecorded sales or missing inventory and would test this against business-economics benchmarks.
T: Statement of affairs | A list of assets and liabilities at a date, used to calculate capital when full records are not kept
T: Mark-up | Gross profit expressed as a percentage of cost of sales
T: Margin | Gross profit expressed as a percentage of revenue
SUM: Profit = closing capital − opening capital + drawings − capital introduced.
SUM: Control accounts rebuild sales and purchases; mark-up and margin convert between cost and sales.
SRC: Wood F. and Sangster A., Frank Wood's Business Accounting 1, 14th edition, Pearson | secondary | 2018
SRC: ACCA, Financial Accounting (FA) syllabus and study guide | standard | 2025
Q: How is profit found from statements of affairs? | Closing capital − opening capital + drawings − capital introduced.
Q: Convert a 50% mark-up to a margin. | 33⅓%: on cost £100, price £150, profit £50 = 50/150.
NUM2#finance-u02-10-q1@2: Receipts from credit customers were £84,000. Receivables were £9,000 at the start and £11,500 at the end. What were credit sales, in £? | 86500 | 0 | £ | Credit sales = 84,000 + 11,500 − 9,000 = £86,500.
NUM2#finance-u02-10-q2@2: Cost of sales is £48,000 and the business uses a mark-up of 25%. What is revenue, in £? | 60000 | 0 | £ | Gross profit = 25% × 48,000 = £12,000; revenue = 48,000 + 12,000 = £60,000.
M1#finance-u02-10-q3@1: Which formula gives profit from opening and closing capital? | Closing capital − opening capital + drawings − capital introduced | Closing capital + opening capital − drawings | Opening capital − closing capital + capital introduced | Closing capital − drawings | Drawings reduced capital but aren't losses, so they are added back; capital introduced increased capital but isn't profit, so it is deducted.
M3#finance-u02-10-q4@3: A shop's expected margin is 30% but its records give 22%, and the owner says nothing unusual happened. What should an accountant consider first? | Unrecorded sales or missing inventory, such as takings not banked or goods taken | That the margin calculation is always unreliable | That prices must have risen | That the business has made an error in depreciation | A margin below the norm for the trade signals that sales or closing inventory may be understated, or goods taken; it calls for investigation before accepting the figures.
SA3#finance-u02-10-q5@1,3: A trader's net assets rose from £18,000 to £25,000; drawings were £12,000 and £3,000 of capital was introduced. Calculate profit and evaluate the reliability of profit found this way. | Profit = 25,000 − 18,000 + 12,000 − 3,000 = £16,000. Reliability is limited: it depends on complete, correctly valued lists of assets and liabilities at both dates, accurate drawings records (often not kept), and gives no breakdown of revenue and expenses, so errors or unrecorded drawings go straight into profit; it is a fallback where double-entry records don't exist. | Correct profit £16,000 ; Depends on accurate asset and liability lists ; Drawings often unrecorded ; No analysis of income and expenses ; Judgement

## Profit and cash
LV: Intermediate · Analysis
S: A profitable business can run out of cash, and a loss-making one can have plenty. This lesson explains the differences between profit and cash flow and reconciles the two for a sole trader.
O: Explain why profit and cash flow differ
O: Reconcile profit for the year with the change in cash
O: Evaluate the importance of cash flow to a business's survival
PRE: The statement of financial position
H: Why they differ
- **Credit sales and purchases**: income and expenses are recorded before cash moves; rising receivables absorb cash.
- **Inventory**: buying inventory uses cash before it reaches cost of sales.
- **Depreciation**: an expense with no cash outflow; the cash left when the asset was bought.
- **Capital expenditure**: cash out now, expense only gradually.
- **Loans and capital**: borrowing and capital introduced bring cash without profit; repayments use cash without an expense.
- **Drawings**: use cash but don't reduce profit.
- **Accruals and prepayments**: timing differences between expense and payment.
H: Reconciling the two
P: Start from profit, add back non-cash expenses such as depreciation and losses on disposal, then adjust for working capital: increases in inventory, receivables and prepayments reduce cash; increases in payables and accruals increase it. That gives cash from operations. Then deduct capital expenditure and drawings, and add new loans or capital.
X: A sole trader made a profit of £18,000. Depreciation was £3,000; receivables rose by £4,000, inventory by £2,000 and payables by £1,500. Equipment costing £7,000 was bought and drawings were £12,000.
> Cash from operations = 18,000 + 3,000 − 4,000 − 2,000 + 1,500 = £16,500.
> Less equipment £7,000 and drawings £12,000 = −£19,000.
> Change in cash = 16,500 − 19,000 = a fall of £2,500, despite the £18,000 profit.
K: Profit measures performance under the accruals concept; cash measures the money actually available. Working capital, capital spending, financing and drawings drive the gap.
!: Adding depreciation back as if it produced cash. It is added back only because it was deducted in arriving at profit without any cash leaving; it generates nothing.
H: Why cash matters
P: Businesses fail when they can't pay debts as they fall due, even if profitable on paper: a common pattern is **overtrading**, fast growth on credit that ties cash up in inventory and receivables. That is why lenders look at cash flow forecasts, why companies must publish a statement of cash flows (IAS 7), and why HMRC lets most small unincorporated businesses use the **cash basis**, which is now the default for income tax from 2024–25, taxing receipts less payments rather than accruals-based profit.
EV: established | Insolvency law tests a company's ability to pay its debts as they fall due (cash-flow insolvency) as well as whether liabilities exceed assets (balance-sheet insolvency) (Insolvency Act 1986, s.123).
EV: contested | Whether simple cash accounting gives small traders a less accurate picture of performance than accruals accounting, even if it is easier and cheaper, is debated by accountants and the tax profession.
T: Overtrading | Expanding sales faster than the working capital available to finance them, leading to cash shortages
T: Cash basis | Calculating taxable profit from money received and paid in the period rather than income earned and expenses incurred
SUM: Profit and cash differ because of credit, inventory, depreciation, capital spending, financing and drawings.
SUM: Profitable businesses can fail through lack of cash; cash flow statements and forecasts address this.
SRC: IAS 7 Statement of Cash Flows, paragraphs 18–20 (indirect method) | standard | 1992 | https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/
SRC: HMRC, "Cash basis" | guidance | 2026 | https://www.gov.uk/simpler-income-tax-cash-basis
SRC: Insolvency Act 1986, section 123 "Definition of inability to pay debts" | legislation | 1986 | https://www.legislation.gov.uk/ukpga/1986/45/section/123
Q: Why is depreciation added back when reconciling profit to cash? | It reduced profit but involved no cash outflow in the period.
Q: What is overtrading? | Growing sales faster than working capital allows, so cash runs short despite profits.
NUM2#finance-u02-11-q1@2: Profit is £25,000, depreciation £5,000, receivables increase £6,000, inventory decreases £2,000 and payables decrease £3,000. What is cash from operations, in £? | 23000 | 0 | £ | 25,000 + 5,000 − 6,000 + 2,000 − 3,000 = £23,000.
M1#finance-u02-11-q2@1: Which item reduces profit but not cash in the year? | Depreciation | Paying a supplier | Drawings | Buying a new machine | Depreciation is an expense with no cash payment; the others move cash, and drawings and machinery don't reduce profit when paid.
M2#finance-u02-11-q3@2: A business's receivables doubled while its profit rose. What happens to cash? | Cash is held back by the rise in receivables, so it rises less than profit or falls | Cash rises by more than profit | Cash is unaffected by receivables | Receivables increase cash immediately | Sales on credit count as profit before the cash arrives; a growing receivables balance means profit is not yet converted into cash.
M3#finance-u02-11-q4@3: A fast-growing wholesaler is profitable but keeps exceeding its overdraft. Which response best addresses the problem? | Tighten credit control and arrange longer-term working capital finance matched to growth | Charge more depreciation | Pay higher drawings to the owner | Ignore it, since the business is profitable | The cash shortage comes from working capital absorbed by growth; collecting receivables faster and financing growth properly addresses it.
SA3#finance-u02-11-q5@2,3: Explain why a profitable sole trader might have less cash at the end of the year than at the start, and evaluate why cash flow matters for survival. | Profit is measured on accruals; cash can fall if receivables and inventory rise, payables fall, equipment is bought, loans are repaid or drawings exceed profit. Depreciation reduces profit without cash. Survival depends on paying debts when due: a business can be insolvent on a cash-flow basis despite profits, especially when overtrading, so forecasts, credit control and appropriate finance matter as much as profitability. | Accruals versus cash ; Working capital effects ; Capital spending, loans or drawings ; Depreciation non-cash ; Survival and insolvency or overtrading

## Partnership agreements and the Partnership Act 1890
LV: Introductory · Foundation
S: A partnership's accounts follow its partnership agreement, and where there is none, the default rules of the Partnership Act 1890. This lesson sets out what an agreement covers, the statutory defaults and partners' liability.
O: Describe the main terms of a partnership agreement
O: Apply the section 24 default rules where no agreement exists
O: Evaluate the advantages and disadvantages of partnership as a business form
PRE: Types of business organisation
H: The partnership agreement
- How profits and losses are shared (the **profit-sharing ratio**).
- Interest on capital, and the rate.
- Partners' salaries.
- Interest on drawings and any limits on drawings.
- Capital to be contributed and whether capital accounts are fixed.
- Interest on loans from partners.
- Procedures for admitting, retiring and expelling partners, valuing goodwill and resolving disputes.
H: The default rules
P: Where partners haven't agreed otherwise, section 24 of the Partnership Act 1890 applies. Partners share capital and profits **equally** and contribute equally to losses; **no interest on capital** and **no salaries** are paid; **no interest is charged on drawings**; a partner who lends the firm money beyond their agreed capital is entitled to **interest at 5% a year** on the loan; every partner may take part in management; differences about ordinary matters are decided by a majority, but no new partner may be admitted without the consent of all.
X: Ali and Beth formed a partnership with no written agreement. Ali contributed £60,000 capital and Beth £20,000; Ali also lent the firm £10,000. Profit before loan interest is £50,500. Beth worked full time; Ali part time.
> Interest on Ali's loan: 5% × 10,000 = £500, an expense of the firm; profit becomes £50,000.
> No interest on capital and no salary for Beth, despite their different contributions.
> Profit shared equally: £25,000 each.
> The outcome shows why partners with unequal capital or work should agree terms in writing.
K: The partnership agreement governs how profits are shared; without one, section 24 gives equal shares, no interest on capital, no salaries, no interest on drawings and 5% interest on partners' loans.
!: Treating interest on a partner's loan as an appropriation of profit. It is an expense charged before profit is calculated, because the partner is acting as a lender.
H: Liability and the choice of form
P: In England and Wales an ordinary partnership is not a separate legal person: each partner is an agent of the firm (s.5), and partners are jointly liable for the firm's debts (s.9) without limit. Partnership lets professionals pool skills and capital with few formalities and private accounts; but unlimited liability, the risk of disputes and the dissolution of the firm when a partner leaves (unless the agreement provides otherwise) lead many to choose an LLP or a company.
EV: established | Section 24 of the Partnership Act 1890 sets the default rules for sharing profits and interest on advances where partners have not agreed otherwise.
EV: contested | Whether the 1890 Act still suits modern firms was examined by the Law Commissions, whose 2003 report recommended reforms, including separate legal personality for partnerships, that have not been enacted.
T: Partnership agreement | A contract, written or oral, setting out the partners' rights and duties, including how profits are shared
T: Profit-sharing ratio | The ratio in which partners share residual profits and losses
SUM: An agreement normally covers profit sharing, interest on capital and drawings, salaries and changes in partners.
SUM: Without one, s.24 gives equal shares, no interest on capital, no salaries and 5% on partners' loans.
SRC: Partnership Act 1890, section 24 "Rules as to interests and duties of partners subject to special agreement" | legislation | 1890 | https://www.legislation.gov.uk/ukpga/Vict/53-54/39/section/24
SRC: Law Commission and Scottish Law Commission, Partnership Law (Law Com No 283) | guidance | 2003
Q: Under the Partnership Act 1890, how are profits shared if there is no agreement? | Equally.
Q: What interest is a partner entitled to on a loan to the firm under s.24? | 5% a year on advances beyond the agreed capital.
M1#finance-u02-12-q1@1: Which is a default rule under section 24 of the Partnership Act 1890? | Partners are not entitled to salaries | Interest on capital is paid at 5% | Profits are shared in the ratio of capital | Interest is charged on drawings | Without agreement, no salaries or interest on capital are paid, no interest is charged on drawings, and profits are shared equally.
NUM2#finance-u02-12-q2@2: With no partnership agreement, Cara lends the firm £16,000 in addition to her capital. How much loan interest is she entitled to for a full year, in £? | 800 | 0 | £ | Section 24 gives 5% a year on advances: 5% × 16,000 = £800, charged as an expense.
M2#finance-u02-12-q3@2: Three partners with no agreement disagree about whether to admit a fourth. Two agree, one refuses. What happens? | The new partner can't be admitted without everyone's consent | The majority decides | The partner with most capital decides | The court must appoint the new partner | Section 24(7) requires the consent of all existing partners to admit a new partner.
M3#finance-u02-12-q4@3: Why might two professionals choose an LLP rather than an ordinary partnership? | It gives members limited liability while keeping partnership-style flexibility, at the cost of filing public accounts | It removes the need for any agreement between members | Its profits are tax-free | It cannot be sued | An LLP is a separate legal person whose members generally have limited liability; in exchange it must file accounts at Companies House.
SA3#finance-u02-12-q5@1,3: Explain what a partnership agreement should cover and evaluate the risks of relying on the Partnership Act 1890 defaults. | It should cover profit-sharing ratio, interest on capital, salaries, interest on drawings, capital contributions, loans and procedures for admission, retirement and disputes. Under the defaults partners share equally regardless of capital or work, get no interest on capital or salaries, and need unanimous consent for new partners. This can be unfair where contributions differ and leads to disputes; a written agreement tailored to the partners avoids this. | Lists agreement terms ; States the main defaults ; Unfairness where contributions differ ; Dispute or exit risks ; Judgement favouring written agreement

## The appropriation account
LV: Intermediate · Application
S: A partnership's profit is shared out in an appropriation account: interest on drawings is added, salaries and interest on capital are deducted, and the residue is split in the profit-sharing ratio. This lesson prepares one.
O: Describe the purpose and items of a partnership appropriation account
O: Prepare an appropriation account from the partnership agreement
O: Analyse how the terms of the agreement reward capital, work and risk
PRE: Partnership agreements and the Partnership Act 1890
H: The appropriation account
P: After the statement of profit or loss gives profit for the year, the **appropriation account** shows how that profit is divided among the partners. Appropriations are not expenses: they are shares of profit.
- **Add** interest on drawings (charged to partners to discourage early or heavy drawings).
- **Deduct** partners' salaries.
- **Deduct** interest on capital.
- **Share** the residual profit (or loss) in the profit-sharing ratio.
X: Asha and Ben share profits 3:2. Profit for the year is £60,000. Capitals: Asha £50,000, Ben £30,000; interest on capital 5%. Ben receives a salary of £12,000. Interest on drawings: Asha £600, Ben £400.
> Profit + interest on drawings: 60,000 + 1,000 = £61,000.
> Less salary to Ben £12,000: £49,000.
> Less interest on capital: Asha £2,500, Ben £1,500: £45,000 residual profit.
> Shared 3:2: Asha £27,000, Ben £18,000.
> Total to Asha = 2,500 + 27,000 − 600 = £28,900; to Ben = 12,000 + 1,500 + 18,000 − 400 = £31,100; together £60,000.
K: Profit for the year plus interest on drawings, less salaries and interest on capital, leaves a residue shared in the profit-sharing ratio.
!: Deducting partners' salaries as an expense in the statement of profit or loss. A partner's salary is an appropriation of profit; only wages of employees are expenses.
H: Rewarding capital, work and risk
P: Each term rewards a different contribution: interest on capital rewards the capital tied up, salaries reward work or responsibility, and the profit share rewards bearing risk. If appropriations exceed profit, the residue is negative and is shared as a loss in the profit-sharing ratio, which can reduce a partner's total below their salary.
EV: established | Partners' salaries and interest on capital are appropriations of profit, not expenses, because partners are owners rather than employees or lenders.
EV: hypothetical | If a firm's profit fell below the total of salaries and interest on capital, the negative residue shared in the profit-sharing ratio could leave a partner with a lower total than an equal split would give.
T: Appropriation account | The account showing how a partnership's profit for the year is divided among the partners
T: Interest on drawings | A charge on partners' drawings, added to profit available for appropriation
SUM: Add interest on drawings; deduct salaries and interest on capital; share the residue in the profit-sharing ratio.
SUM: Appropriations reward capital, work and risk; they are shares of profit, not expenses.
SRC: AQA, A level Accounting specification 7127 | standard | 2017
SRC: Partnership Act 1890, section 24 | legislation | 1890 | https://www.legislation.gov.uk/ukpga/Vict/53-54/39/section/24
Q: Name the items in a partnership appropriation account. | Profit for the year, interest on drawings (added), salaries and interest on capital (deducted), and residual profit shared in the profit-sharing ratio.
Q: Why is a partner's salary not an expense? | Partners are owners, not employees; the salary is a share of profit allocated for their work.
NUM2#finance-u02-13-q1@2: Profit is £40,000. Salaries total £15,000, interest on capital £5,000 and interest on drawings £1,000. Residual profit is shared equally between two partners. What is each partner's share of the residue, in £? | 10500 | 0 | £ | 40,000 + 1,000 − 15,000 − 5,000 = £21,000; half each = £10,500.
M1#finance-u02-13-q2@1: Which item is added in the appropriation account? | Interest on drawings | Partners' salaries | Interest on capital | Interest on a partner's loan | Interest on drawings is charged to partners, so it increases profit available for sharing.
M2#finance-u02-13-q3@2: A partner lends the firm £20,000 at 6% interest. Where is the £1,200 interest recorded? | As an expense in the statement of profit or loss | As an appropriation of profit | Deducted from the partner's capital account | It isn't recorded | Interest on a partner's loan is a cost of borrowing, charged before profit is found; it is credited to the partner's current account.
M3#finance-u02-13-q4@3: A firm makes £20,000 profit; salaries and interest on capital total £30,000, shared between two partners equally. What is the effect? | A £10,000 residual loss is shared in the profit-sharing ratio, reducing each partner's total below their salaries and interest | The salaries are reduced until they equal profit | The partners receive £30,000 in total | The appropriation account can't be prepared | Appropriations are still made in full; the negative residue is a loss shared in the ratio, so totals still equal the £20,000 profit.
SA3#finance-u02-13-q5@2,3: Prepare an appropriation account for Cal and Dee (profit £72,000, ratio 2:1, interest on capital 4% on £60,000 and £40,000, salary to Dee £15,000, interest on drawings Cal £700 and Dee £300) and analyse how the terms reflect each partner's contribution. | 72,000 + 1,000 = 73,000; less salary 15,000 = 58,000; less interest on capital 2,400 and 1,600 = 54,000; shared 2:1: Cal 36,000, Dee 18,000. Totals: Cal 2,400 + 36,000 − 700 = 37,700; Dee 15,000 + 1,600 + 18,000 − 300 = 34,300; total 72,000. Cal's larger capital and profit share reward capital and risk; Dee's salary rewards work in the business. | Correct residue £54,000 ; Shares £36,000 and £18,000 ; Totals reconcile to £72,000 ; Links terms to capital, work and risk

## Partners' capital and current accounts
LV: Intermediate · Application
S: Partners usually keep fixed capital accounts for the money they have invested and current accounts for their shares of profit and their drawings. This lesson prepares both and interprets the balances.
O: Distinguish fixed capital accounts from current accounts and fluctuating capital accounts
O: Prepare partners' current accounts from the appropriation account and drawings
O: Interpret debit and credit balances on partners' current accounts
PRE: The appropriation account
H: Fixed and fluctuating capitals
P: With **fixed capital accounts**, each partner's capital account records only long-term capital introduced or withdrawn, and stays the same from year to year unless the partners agree to change it. Shares of profit, salaries, interest and drawings go to a separate **current account**. With **fluctuating capital accounts**, everything goes through one account per partner, so capital changes every year. Fixed capitals are more common because they keep the agreed capital clear, which matters when interest on capital is paid.
H: The current account
- **Credit side**: balance b/d (if in credit), salary, interest on capital, share of residual profit, interest on a loan to the firm if credited there.
- **Debit side**: balance b/d (if in debit), drawings, interest on drawings, share of a residual loss, balance c/d.
X: Ben's current account (continuing from the appropriation account example): opening balance £2,000 credit; salary £12,000; interest on capital £1,500; share of profit £18,000; drawings £25,000; interest on drawings £400.
> Credits: 2,000 + 12,000 + 1,500 + 18,000 = £33,500.
> Debits: 25,000 + 400 = £25,400.
> Closing balance = 33,500 − 25,400 = £8,100 credit: profits earned but not yet withdrawn, owed by the firm to Ben.
K: Capital accounts hold the agreed long-term capital; current accounts record each year's profit shares and drawings, and a credit balance is undrawn profit owed to the partner.
!: Recording drawings in a fixed capital account. With fixed capitals, drawings and profit shares always go through the current account.
H: Interpreting balances
P: A **credit balance** on a current account means the partner has left profit in the firm. A **debit balance** means the partner has drawn more than their share of profit: in effect they owe the firm money, and persistent debit balances can drain its cash. In the statement of financial position, partners' capital and current accounts are shown together as the partners' funds; a debit current account balance is deducted.
EV: established | Using fixed capital accounts with separate current accounts is standard practice in partnership accounting and is assumed in A level and professional examinations unless stated otherwise.
EV: hypothetical | If one partner's current account showed a growing debit balance year after year, the firm would be funding that partner's spending from capital, eroding the working capital the others rely on.
T: Fixed capital account | A partner's capital account that records only agreed long-term capital and doesn't change with profits or drawings
T: Current account | A partner's account recording salary, interest, profit share, drawings and interest on drawings
SUM: Fixed capital accounts hold agreed capital; current accounts record profit shares and drawings.
SUM: A debit current account balance means drawings exceed profit allocated: the partner owes the firm.
SRC: AQA, A level Accounting specification 7127 | standard | 2017
SRC: Wood F. and Sangster A., Frank Wood's Business Accounting 1, 14th edition, Pearson | secondary | 2018
Q: What is the advantage of fixed capital accounts? | The agreed capital stays clear and unchanged, which matters for interest on capital, while profit and drawings go to the current account.
Q: What does a debit balance on a partner's current account mean? | The partner has drawn more than their allocated profit and owes that amount to the firm.
NUM2#finance-u02-14-q1@2: A partner's current account opens with a debit balance of £1,500. Profit share £20,000, interest on capital £1,000, drawings £22,000. What is the closing balance (enter a debit as a negative number), in £? | -2500 | 0 | £ | Credits 21,000; debits 1,500 + 22,000 = 23,500; closing balance 2,500 debit.
M1#finance-u02-14-q2@1: With fixed capital accounts, where is a partner's share of profit credited? | The partner's current account | The partner's capital account | The appropriation account only | The bank account | Fixed capital accounts change only for agreed capital; profit shares go to the current account.
M2#finance-u02-14-q3@2: Which entry appears on the debit side of a partner's current account? | Interest on drawings | Salary | Interest on capital | Share of residual profit | Interest on drawings is charged to the partner, reducing what they are owed.
M3#finance-u02-14-q4@3: A partner has a large and growing debit balance on their current account. What is the main concern for the other partners? | The firm is financing that partner's drawings, reducing cash and effectively lending to them without agreement | It shows the partner is very profitable | It increases the firm's capital | It means the appropriation account is wrong | Drawings beyond profit take cash the business may need; the partners may agree limits on drawings or interest on drawings to discourage it.
SA3#finance-u02-14-q5@2,3: Prepare a current account for a partner (opening credit £3,000, salary £10,000, interest on capital £2,000, profit share £16,000, drawings £30,000, interest on drawings £500) and interpret the balance. | Credits 3,000 + 10,000 + 2,000 + 16,000 = 31,000; debits 30,000 + 500 = 30,500; closing balance £500 credit. The partner has drawn almost all of the profit allocated, leaving just £500 in the firm; the opening credit has been used up, so continuing at this rate would turn the balance into a debit and draw on the firm's cash. | Correct credits ; Correct debits ; Closing £500 credit ; Interpretation of undrawn profit ; Comment on trend or cash

## Goodwill and changes in partners
LV: Advanced · Application
S: When a partner joins or leaves, or the profit-sharing ratio changes, the existing partners must be credited with the value they have built up. This lesson values goodwill, adjusts capital accounts and revalues assets for changes in partnership.
O: Explain what goodwill is and why it must be adjusted for on a change in partners
O: Prepare the entries for creating and eliminating goodwill and for a revaluation
O: Evaluate methods of valuing goodwill
PRE: Partners' capital and current accounts
H: Goodwill
P: **Goodwill** is the value of a business as a whole above the fair value of its separable net assets: its reputation, customers, staff and location. Partnerships don't normally keep goodwill in their books, but when a new partner joins, a partner retires or profit shares change, the partners who built it up must be credited with their share. Common valuation methods are a multiple of average profits, a multiple of **super profits** (profits above a normal return for the partners' capital and work), or an agreed figure.
H: Creating and eliminating goodwill
- **Create** goodwill at its agreed value in the **old** profit-sharing ratio: Dr Goodwill, Cr old partners' capital accounts.
- **Eliminate** it (if it isn't to stay in the books) in the **new** profit-sharing ratio: Dr all partners' capital accounts, Cr Goodwill.
X: Asha and Ben share profits 3:2. Cal joins, and the new ratio is Asha 2, Ben 2, Cal 1. Goodwill is valued at £30,000 and isn't to remain in the books.
> Create in the old ratio 3:2: Dr Goodwill £30,000; Cr Asha £18,000, Cr Ben £12,000.
> Eliminate in the new ratio 2:2:1: Dr Asha £12,000, Dr Ben £12,000, Dr Cal £6,000; Cr Goodwill £30,000.
> Net effect: Asha +£6,000, Ben nil, Cal −£6,000. Cal has paid for the one-fifth share of goodwill gained; Asha, whose share fell from 3/5 to 2/5, is compensated, while Ben's share is unchanged at 2/5.
H: Revaluation and retirement
P: Assets and liabilities are also revalued to fair value on a change in partners, so that gains or losses up to that date belong to the old partners. A **revaluation account** is debited with decreases and credited with increases; its balance is shared among the old partners in the old ratio. On retirement, the retiring partner's capital and current account balances, after goodwill and revaluation adjustments, are paid out or transferred to a loan account repaid over time. On dissolution, if an insolvent partner can't make good a debit balance, Garner v Murray (1904) requires the solvent partners to bear it in the ratio of their last agreed capitals.
K: Goodwill and revaluation adjustments give the old partners, in the old ratio, the value built up before the change; the new ratio applies only afterwards.
!: Eliminating goodwill in the old ratio. Creation uses the old ratio and elimination the new one; using the same ratio for both would make the adjustment cancel out.
EV: established | When goodwill is created in the old ratio and eliminated in the new, each partner's capital changes by goodwill × (old share − new share).
EV: contested | Valuing partnership goodwill by multiples of past or super profits relies on assumptions about future earnings and the multiple; different reasonable methods can give very different values, which is why agreements often fix a method.
T: Goodwill | The value of a business as a whole in excess of the fair value of its separable net assets
T: Revaluation account | A temporary account recording gains and losses on revaluing assets and liabilities on a change in partners
SUM: Goodwill is created in the old ratio and eliminated in the new; each partner gains or loses goodwill × change in share.
SUM: Revaluation gains and losses go to the old partners in the old ratio; retiring partners are paid out or become lenders.
SRC: Garner v Murray [1904] 1 Ch 57 | case | 1904
SRC: Partnership Act 1890, section 44 "Rule for distribution of assets on final settlement of accounts" | legislation | 1890 | https://www.legislation.gov.uk/ukpga/Vict/53-54/39/section/44
SRC: AQA, A level Accounting specification 7127 | standard | 2017
Q: In which ratio is goodwill created and eliminated? | Created in the old profit-sharing ratio; eliminated in the new ratio.
Q: What does a revaluation account do on a change in partners? | Records gains and losses on revaluing assets and liabilities, shared among the old partners in the old ratio.
NUM2#finance-u02-15-q1@2: Partners X and Y share 1:1. Z joins, and the new ratio X:Y:Z is 2:2:1. Goodwill of £40,000 is created and then eliminated. By how much does Z's capital account fall, in £? | 8000 | 0 | £ | Z gets no goodwill in the old ratio and is debited with 1/5 × 40,000 = £8,000 on elimination.
M1#finance-u02-15-q2@1: When a new partner is admitted, in which ratio is goodwill first credited to the existing partners? | The old profit-sharing ratio | The new profit-sharing ratio | The ratio of capital accounts | Equally, regardless of the agreement | The old partners built up the goodwill, so it is credited to them in the ratio in which they shared profits before the change.
M2#finance-u02-15-q3@2: On admission of a partner, premises are revalued from £120,000 to £150,000 and inventory down by £4,000. The old partners share 1:1. What is credited to each old partner? | £13,000 | £15,000 | £17,000 | £26,000 | Net revaluation gain = 30,000 − 4,000 = £26,000, shared 1:1 = £13,000 each.
M3#finance-u02-15-q4@3: Why are goodwill and revaluation adjustments needed when a partner joins, even though no cash changes hands? | Without them the new partner would share in value created before joining, at the old partners' expense | They are required to calculate tax on the partnership | They increase the firm's cash | They prevent the new partner from receiving a salary | Adjusting capital accounts for value built up to the date of the change ensures that later gains on that value are shared fairly.
SA3#finance-u02-15-q5@2,3: Partners P and Q share 3:1. R joins with a new ratio of 2:1:1. Goodwill is valued at £48,000 and not kept in the books. Calculate the effect on each capital account and evaluate why goodwill is hard to value. | Created 3:1: P +36,000, Q +12,000. Eliminated 2:1:1: P −24,000, Q −12,000, R −12,000. Net: P +12,000, Q nil, R −12,000. Goodwill depends on expected future profits from reputation and customers; methods such as a multiple of average or super profits rely on judgements about future earnings and the multiple, and it disappears if key people leave, so values are subjective and often fixed by agreement. | Creation in old ratio ; Elimination in new ratio ; Correct net effects ; Explains subjectivity of valuation ; Mentions methods or dependence on people
`;
