// School 29: Everyday and Practical Mathematics. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Money, measures, time and risk for daily life and work. UK tax and benefit figures are dated: check gov.uk for current rates.
export default `
## Financial Literacy
S: Financial literacy is the knowledge and confidence to manage money well: budgeting, saving, borrowing, comparing products and avoiding scams. Most of it rests on percentages, compound interest and careful comparison.
O: Compare savings and credit products using AER and APR
O: Apply basic principles of saving, borrowing and protection
T: AER | Annual Equivalent Rate: the yearly interest on savings, including compounding, so accounts can be compared
T: APR | Annual Percentage Rate: the yearly cost of borrowing, including interest and compulsory fees
H: Comparing products
- Savings: compare AERs; a monthly rate r compounds to (1 + r)^{12} − 1 a year.
- Borrowing: compare APRs and the total amount repayable, not just the monthly payment.
- Check terms: notice periods, early repayment charges, introductory rates that end.
H: Principles
- Spend less than you earn; build an emergency fund (often suggested as 3 to 6 months of essential costs).
- Pay off the most expensive debt first.
- Pensions benefit from long-term compounding and, for employees, employer contributions.
- Protect yourself: if a return sounds too good to be true, it probably is; check firms on the FCA register.
H: Credit
- Credit scores reflect your history of borrowing and repaying.
- Missing payments adds fees and harms future borrowing.
- Buy now, pay later is still borrowing.
X: Account A pays 4.5% AER. Account B pays 0.37% per month, compounded monthly. Which is better?
> B's annual equivalent: 1.0037^{12} − 1
> ≈ 1.0453 − 1 = 4.53%
> B is slightly better (4.53% against 4.5%), if the other terms are the same
K: Compare savings by AER and loans by APR and total repayable; build an emergency fund; clear expensive debt first; check firms are regulated.
!: Choosing a loan by the lowest monthly payment without looking at the total cost.
Q: What does APR include? | Interest and compulsory fees, as a yearly rate.
Q: Which debt should usually be paid off first? | The one with the highest interest rate.
SUM: Financial literacy rests on comparison.
SUM: AER for saving, APR for borrowing.
SRC: Money and Pensions Service, MoneyHelper: savings and borrowing guides | guidance | 2025 | https://www.moneyhelper.org.uk/
SRC: Financial Conduct Authority, ScamSmart: avoid investment and pension scams | guidance | 2025 | https://www.fca.org.uk/scamsmart
NUM1#maths-u29-01-q1@1: A card charges 1.5% interest per month. Find the annual equivalent rate as a percentage, to 1 decimal place. | 19.6 | 0.05 | % | 1.015^{12} − 1 ≈ 0.1956, about 19.6% a year.
M1#maths-u29-01-q2@1: Which figure should you compare when choosing between two loans? | The APR and the total amount repayable | Only the monthly payment | The length of the advert | The lender's logo | The AER | APR includes fees; the total repayable shows the full cost.
M2#maths-u29-01-q3@2: Someone has a credit card at 24% APR and savings earning 4%. What's usually wise? | Use spare savings (beyond an emergency fund) to clear the card | Keep both unchanged | Borrow more to save more | Move savings to a 2% account | Pay only the minimum | Debt at 24% costs far more than savings at 4% earn.

## Personal Budgeting
S: A personal budget plans how income is spent and saved, so that money lasts the month and goals are reached. It turns vague worries into numbers you can act on.
O: Build a monthly budget from income and expenses
O: Use rules of thumb such as 50/30/20 and convert between time periods
T: Fixed expense | A cost that's the same each month, such as rent or a phone contract
T: Variable expense | A cost that changes, such as food or travel
H: Building a budget
- Start with take-home pay (after tax and deductions).
- List fixed expenses, then variable ones; use bank statements to see real spending.
- Subtract: a surplus can be saved; a deficit means cutting back or increasing income.
H: Rules of thumb
- 50/30/20: about 50% on needs, 30% on wants and 20% on saving or debt repayment.
- Pay yourself first: move savings out on payday.
- Convert to the same period: weekly × 52 ÷ 12 for monthly (not × 4).
H: Keeping it going
- Track spending with an app or spreadsheet.
- Review monthly and plan for irregular costs (birthdays, car insurance) by saving a little each month.
- Small regular costs add up: £3.50 a day is over £1,250 a year.
X: Take-home pay is £2,000 a month. Apply 50/30/20, and convert a £15-a-week subscription to a monthly and yearly cost.
> Needs £1,000, wants £600, savings £400
> £15 × 52 = £780 a year
> £780 ÷ 12 = £65 a month (not £60, since a month isn't exactly 4 weeks)
K: Budget from take-home pay; list fixed and variable costs; 50/30/20 as a guide; convert weekly to monthly with × 52 ÷ 12.
!: Converting weekly to monthly by multiplying by 4, which understates yearly costs.
Q: How do you convert a weekly amount to monthly accurately? | Multiply by 52, then divide by 12.
Q: In the 50/30/20 rule, what is the 20% for? | Saving or paying off debt.
SUM: A budget turns income into a plan.
SUM: Track, review and plan for irregular costs.
SRC: Money and Pensions Service, MoneyHelper: budget planner | guidance | 2025 | https://www.moneyhelper.org.uk/en/everyday-money/budgeting/budget-planner
SRC: Warren E, Tyagi AW, All Your Worth: The Ultimate Lifetime Money Plan (Free Press 2005) | textbook | 2005 | https://www.simonandschuster.com/
NUM1#maths-u29-02-q1@1: A coffee costs £3.20 and is bought 5 days a week. Find the yearly cost in pounds. | 832 | 0 | £ | 3.20 × 5 × 52 = £832.
M1#maths-u29-02-q2@1: Which is a fixed expense for most people? | Rent | Groceries | Petrol | Eating out | Gifts | Rent stays the same each month; the others vary.
M2#maths-u29-02-q3@2: Monthly take-home pay is £1,800 and spending is £1,950. What does the budget show? | A £150 monthly deficit that needs cutting back or more income | A £150 surplus | Nothing useful | A £1,950 surplus | A balanced budget | Spending of £1,950 exceeds income of £1,800, a monthly shortfall of £150 to close.

## Household Budgeting
S: Household budgeting manages shared costs: housing, energy, council tax, food and bills split between members. It needs fair ways to divide costs and an understanding of how bills are calculated.
O: Calculate energy bills from unit rates and standing charges
O: Split shared costs fairly, including in proportion to income
T: Unit rate | The price per kilowatt-hour (kWh) of electricity or gas used
T: Standing charge | A fixed daily charge for being connected, paid regardless of use
H: Bills
- Energy: cost = kWh used × unit rate + days × standing charge.
- Council tax depends on the property band and local authority; single occupants may get a 25% discount.
- Water may be metered (pay per cubic metre) or unmetered.
- Prices change: check current tariffs.
H: Splitting costs
- Equal shares: simple when incomes are similar.
- Proportional to income: each pays the same share of their income.
- By use: for example, by room size for rent.
H: Saving money
- Compare tariffs and switch when worthwhile.
- Reduce use: a 1 kW heater for 1 hour uses 1 kWh.
- Set aside money monthly for annual bills.
X: A month's electricity use is 250 kWh at 24.5p per kWh, with a standing charge of 53p a day for 30 days. Find the bill.
> Usage: 250 × £0.245 = £61.25
> Standing charge: 30 × £0.53 = £15.90
> Total = £77.15
- Smart meters show usage in real time, which helps households spot expensive appliances.
K: Energy bill = kWh × unit rate + days × standing charge; split costs equally, by income or by use; budget for annual bills monthly.
!: Forgetting the standing charge, which is paid even with no use.
Q: How many kWh does a 2 kW heater use in 3 hours? | 6 kWh.
Q: What is a standing charge? | A fixed daily charge regardless of how much energy is used.
SUM: Bills follow simple formulas.
SUM: Choose a fair way to split costs.
SRC: Ofgem, Energy price cap explained | guidance | 2025 | https://www.ofgem.gov.uk/energy-price-cap
SRC: GOV.UK, Council Tax: discounts and bands | guidance | 2025 | https://www.gov.uk/council-tax
NUM1#maths-u29-03-q1@1: Rent of £1,200 is split in proportion to incomes of £30,000 and £20,000. How much does the higher earner pay, in pounds? | 720 | 0 | £ | The ratio is 3:2, so they pay 3/5 × 1,200 = £720.
M1#maths-u29-03-q2@1: A 100 W light bulb is on for 10 hours. How much energy does it use? | 1 kWh | 10 kWh | 100 kWh | 0.1 kWh | 1,000 kWh | 100 W is 0.1 kW, and energy = power × time = 0.1 kW × 10 h = 1 kWh.
M2#maths-u29-03-q3@2: Gas use doubles in winter. What happens to the standing charge part of the bill? | It stays the same | It doubles | It halves | It disappears | It quadruples | The standing charge is fixed per day, regardless of use.

## Tax Calculations
S: Income tax and National Insurance are taken from earnings using bands: different rates apply to different slices of income. Understanding bands explains why a pay rise is never wiped out by moving into a higher band.
O: Calculate income tax and National Insurance using bands
O: Explain marginal and average tax rates
T: Personal allowance | Income that's tax-free; £12,570 in 2025/26 for most people in England
T: Marginal rate | The tax rate on the next pound earned; the average rate is total tax ÷ total income
H: Income tax bands (England, Wales and Northern Ireland, 2025/26)
- Personal allowance: £0 to £12,570 at 0%.
- Basic rate: £12,571 to £50,270 at 20%.
- Higher rate: £50,271 to £125,140 at 40%; additional rate above £125,140 at 45%.
- The personal allowance shrinks by £1 for every £2 earned over £100,000.
- Scotland has different bands. Rates change: always check gov.uk.
H: National Insurance (employees, 2025/26)
- 8% on earnings between £12,570 and £50,270 a year; 2% above that.
- Different rules apply to the self-employed.
H: How bands work
- Only the income inside each band is taxed at that band's rate.
- Moving into a higher band raises tax only on the extra income.
- Average rate is always below the top marginal rate.
X: Find the income tax and employee National Insurance on a salary of £35,000 (2025/26 rates), and the take-home pay.
> Taxable income: 35,000 − 12,570 = 22,430; tax = 20% × 22,430 = £4,486
> NI: 8% × 22,430 = £1,794.40
> Take-home = 35,000 − 4,486 − 1,794.40 = £28,719.60 (ignoring pension and student loan)
K: Tax each slice of income at its band's rate; personal allowance first; NI is separate; check current rates and Scottish bands.
!: Taxing the whole salary at the highest rate it reaches.
Q: What is the basic rate of income tax in England for 2025/26? | 20%.
Q: Does a pay rise into the higher-rate band reduce take-home pay? | No: only the income above the threshold is taxed at 40%.
SUM: Tax is charged band by band.
SUM: Marginal and average rates differ.
SRC: HM Revenue and Customs, Income Tax rates and Personal Allowances | data | 2025 | https://www.gov.uk/income-tax-rates
SRC: HM Revenue and Customs, National Insurance rates and categories | data | 2025 | https://www.gov.uk/national-insurance-rates-letters
NUM1#maths-u29-04-q1@1: Using 2025/26 bands, find the income tax on a salary of £60,000, in pounds. | 11432 | 0 | £ | 20% of £37,700 is £7,540, plus 40% of £9,730 is £3,892: total £11,432.
M1#maths-u29-04-q2@1: Someone earning £50,000 gets a £1,000 rise, taking them to £51,000. How much extra income tax do they pay (2025/26)? | £346 | £400 | £200 | £20,400 | £4,000 | £270 above £50,000 stays at 20% (£54); £730 above £50,270 is at 40% (£292): £346 in total.
M3#maths-u29-04-q3@2: What is the average income tax rate on £35,000 (tax £4,486)? | About 12.8% | 20% | 40% | 8% | About 35% | £4,486 ÷ £35,000 ≈ 0.128: well below the 20% marginal rate.

## VAT Calculations
S: Value Added Tax (VAT) is a tax on most goods and services in the UK. Adding it to a price, or extracting it from a price that includes it, are common calculations in shops and businesses.
O: Add VAT to a price and find the VAT within a VAT-inclusive price
O: Recognise standard, reduced and zero rates
T: Standard rate | 20% VAT, applied to most goods and services in the UK
T: VAT-inclusive price | A price that already includes VAT, so the pre-VAT price is the inclusive price ÷ 1.2 at the standard rate
H: Rates (UK)
- Standard 20%; reduced 5% (for example, domestic energy); zero 0% (most food, children's clothes, books).
- Some items are exempt (such as many financial and health services).
- Check HMRC guidance for particular goods.
H: Calculating
- Adding 20%: multiply by 1.2. £250 + VAT = £300.
- Extracting: divide the inclusive price by 1.2 to get the net price; VAT is the difference.
- Quick rule: VAT in a standard-rated inclusive price is one sixth of it (0.2/1.2).
- For 5%: multiply by 1.05; VAT in an inclusive price is 1/21 of it.
H: Businesses
- VAT-registered businesses charge VAT on sales and reclaim VAT on purchases, paying HMRC the difference.
- Registration is compulsory above a turnover threshold (check gov.uk for the current figure).
X: A drill costs £84 including VAT at 20%. Find the price before VAT and the VAT.
> Net price = 84 ÷ 1.2 = £70
> VAT = 84 − 70 = £14
> Check: £14 is one sixth of £84 ✓
K: Add VAT by multiplying by 1.2; extract by dividing by 1.2 (VAT is one sixth); know the 5% and 0% rates.
!: Finding VAT in an inclusive price by taking 20% of it (that overstates the VAT).
Q: What is the standard UK VAT rate? | 20%.
Q: What fraction of a standard-rated VAT-inclusive price is VAT? | One sixth.
SUM: VAT is added at 20% for most items.
SUM: Divide by 1.2 to remove it.
SRC: HM Revenue and Customs, VAT rates | data | 2025 | https://www.gov.uk/guidance/rates-of-vat-on-different-goods-and-services
SRC: HM Revenue and Customs, VAT registration | guidance | 2025 | https://www.gov.uk/vat-registration
NUM1#maths-u29-05-q1@1: How much VAT is included in a £150 standard-rated price? | 25 | 0 | £ | £150 ÷ 6 = £25 (the net price is £125).
M1#maths-u29-05-q2@1: An item costs £45 before VAT at 20%. What is the price including VAT? | £54 | £49 | £36 | £56.25 | £45.20 | Adding 20% VAT means multiplying by 1.2: £45 × 1.2 = £54.
M2#maths-u29-05-q3@2: A bill is £105 including VAT at 5%. What is the VAT? | £5 | £5.25 | £21 | £10.50 | £0.50 | £105 ÷ 1.05 = £100, so the VAT is £5 (1/21 of £105).

## Discounts
S: Discounts reduce prices by a percentage, a fixed amount or a deal such as "3 for 2". Comparing them, and seeing through deals that aren't as good as they look, needs multipliers and unit prices.
O: Calculate sale prices and combined discounts using multipliers
O: Compare deals and unit prices
T: Unit price | The price per unit of quantity, such as per 100 g or per litre, used to compare sizes
T: Successive discounts | Discounts applied one after another, which multiply rather than add
H: Percentage discounts
- 30% off: multiply by 0.7.
- 30% off then an extra 10% off: 0.7 × 0.9 = 0.63, a 37% discount, not 40%.
- Original price from sale price: divide by the multiplier.
H: Deals
- "3 for 2": pay for 2 of 3, saving one third (33.3%).
- "Buy one get one half price": pay 1.5 for 2, saving 25%.
- Fixed amounts: £10 off £40 is 25%; £10 off £200 is 5%.
H: Unit prices
- Compare price per 100 g (or per item, per litre).
- Bigger packs are often, but not always, cheaper per unit.
- A deal is only a saving if you'd use what you buy.
X: Pack A is 500 g for £2.40; pack B is 750 g for £3.30. Which is better value?
> A: 240p ÷ 5 = 48p per 100 g
> B: 330p ÷ 7.5 = 44p per 100 g
> B is cheaper per 100 g
- Check the "was" price: a discount from an inflated reference price isn't a real saving.
- Loyalty prices and multibuys may require a membership card or buying more than you need.
- Always compare the final price you'd pay, including delivery charges for online orders.
K: Discounts multiply; compare deals as percentage savings; use unit prices to compare sizes.
!: Adding successive percentage discounts (30% + 10% = 40%).
Q: What percentage do you save with "3 for 2"? | 33.3%.
Q: What is the overall discount from 20% off then a further 25% off? | 40% (0.8 × 0.75 = 0.6).
SUM: Multipliers handle discounts.
SUM: Unit prices reveal true value.
SRC: Competition and Markets Authority, Pricing practices guide | guidance | 2016 | https://www.gov.uk/government/organisations/competition-and-markets-authority
SRC: Which?, Supermarket unit pricing | guidance | 2024 | https://www.which.co.uk/
NUM1#maths-u29-06-q1@1: A £80 jacket has 25% off, then 10% off the sale price. Find the final price in pounds. | 54 | 0 | £ | 80 × 0.75 × 0.9 = £54.
M1#maths-u29-06-q2@1: What percentage saving is "buy one, get one half price"? | 25% | 50% | 33.3% | 15% | 75% | You pay for 1.5 items out of 2, saving 0.5/2 = 25%.
M3#maths-u29-06-q3@2: Shop X offers 40% off. Shop Y offers 25% off then a further 20% off. Which is cheaper? | They're the same | Shop X | Shop Y | It depends on the price | Neither is a discount | Successive discounts multiply: 0.75 × 0.8 = 0.6, exactly the same as 40% off.

## Profit and Loss
S: Profit is what's left from sales after costs. Businesses track profit, margins and break-even points to set prices and decide whether a product or venture is worthwhile.
O: Calculate profit, markup and margin
O: Find a break-even point
T: Markup | Profit as a percentage of cost price
T: Margin | Profit as a percentage of selling price
H: Basic terms
- Profit = revenue − costs (a loss if negative).
- Cost £40, sold for £50: profit £10; markup 25% (of cost); margin 20% (of price).
- Selling price from cost and markup: cost × (1 + markup).
H: Fixed and variable costs
- Fixed costs (rent, equipment) don't change with output.
- Variable costs (materials) are per unit.
- Contribution per unit = price − variable cost.
- Break-even quantity = fixed costs ÷ contribution per unit.
H: Percentages of profit
- Percentage profit or loss is usually given on the cost price.
- A 50% markup is only a 33.3% margin: be clear which is meant.
- VAT and other taxes affect what the business keeps.
X: A stall has fixed costs of £1,200 a month. Each item sells for £15 and costs £7 to make. How many must be sold to break even?
> Contribution per item = 15 − 7 = £8
> Break-even = 1,200 ÷ 8
> = 150 items a month
- Cash flow matters too: a profitable business can fail if bills fall due before customers pay.
K: Profit = revenue − costs; markup is on cost, margin on price; break-even = fixed costs ÷ (price − variable cost).
!: Confusing markup with margin.
Q: An item costs £60 and sells for £75. What is the markup? | 25%.
Q: What is the margin on the same item? | 20%.
SUM: Profit drives business decisions.
SUM: Markup and margin aren't the same.
SRC: GOV.UK, Business finance explained | guidance | 2024 | https://www.gov.uk/business-finance-support
SRC: Atrill P, McLaney E, Accounting and Finance for Non-Specialists (12th edn, Pearson 2023) | textbook | 2023 | https://www.pearson.com/
NUM1#maths-u29-07-q1@1: A trader buys a bike for £240 and sells it for £204. Find the percentage loss. | 15 | 0 | % | Loss £36; 36/240 = 15%.
M1#maths-u29-07-q2@1: A product costs £20 and has a 40% markup. What is its selling price? | £28 | £24 | £33.33 | £12 | £60 | Markup is a percentage of cost, so the price is £20 × 1.4 = £28.
M2#maths-u29-07-q3@2: A 50% markup corresponds to what margin? | 33.3% | 50% | 25% | 66.7% | 150% | Cost 100, price 150: profit 50 is a third of the price.

## Currency Conversion
S: Currency conversion turns an amount in one currency into another using an exchange rate. Travellers and businesses also need to account for the difference between buying and selling rates and for commission.
O: Convert amounts in both directions using an exchange rate
O: Compare the cost of conversions including fees and spreads
T: Exchange rate | How much of one currency you get for one unit of another, such as £1 = €1.16
T: Spread | The gap between the rate a bureau buys at and the rate it sells at, which is its profit
H: Converting
- £ to €: multiply by the rate (£250 × 1.16 = €290).
- € to £: divide by the rate (€75 ÷ 1.16 ≈ £64.66).
- Check the direction: you should get more euros than pounds if £1 buys more than €1.
H: Costs
- Bureaux offer a worse rate than the market ("mid-market") rate; the difference is a hidden fee.
- Commission: a percentage or fixed fee on top.
- Card payments abroad may add a foreign transaction fee; choose to pay in the local currency.
H: Comparing offers
- Work out how much foreign currency each option gives for the same pounds.
- "0% commission" may come with a poorer rate.
X: Bureau A offers £1 = €1.14 with no commission. Bureau B offers £1 = €1.17 with 2% commission. Which gives more euros for £500?
> A: 500 × 1.14 = €570
> B: 500 × 0.98 = £490 converted, × 1.17 = €573.30
> B gives €3.30 more
- Airport bureaux usually offer the poorest rates; ordering in advance often gets better ones.
K: Multiply to convert into the foreign currency and divide to convert back; compare total euros after rates, spreads and commission.
!: Multiplying when converting back to pounds.
Q: £1 = $1.25. How many pounds is $50? | £40.
Q: Why can "0% commission" still be expensive? | The exchange rate may be worse.
SUM: Multiply one way, divide the other.
SUM: Compare the total received.
SRC: Bank of England, Database: daily spot exchange rates | data | 2025 | https://www.bankofengland.co.uk/boeapps/database/
SRC: Money and Pensions Service, MoneyHelper: travel money | guidance | 2025 | https://www.moneyhelper.org.uk/
NUM1#maths-u29-08-q1@1: £1 = €1.16. Convert €87 to pounds. | 75 | 0.01 | £ | 87 ÷ 1.16 = £75.
M1#maths-u29-08-q2@1: £1 = 180 Japanese yen. How many yen is £35? | 6,300 | 5,143 | 215 | 0.19 | 63,000 | Converting pounds to yen means multiplying by the rate: 35 × 180 = 6,300 yen.
M2#maths-u29-08-q3@2: A traveller changes £400 to euros at €1.15 and later changes all of them back at €1.20 per pound. How many pounds do they get back? | £383.33 | £400 | £416.67 | £460 | £552 | €460 ÷ 1.20 = £383.33: the spread costs £16.67.

## Currency and Exchange Rates
S: Exchange rates move with trade, interest rates, inflation and confidence. A change in the rate changes the cost of imports, holidays and the value of overseas earnings, and percentage changes in rates are often misread.
O: Calculate percentage changes in exchange rates and their effects
O: Find cross rates between two currencies
T: Appreciation | A rise in a currency's value against another
T: Cross rate | An exchange rate between two currencies worked out through a third, such as the US dollar
H: Rate changes
- If £1 goes from $1.25 to $1.30, the pound has appreciated by 4%.
- The dollar has depreciated: $1 buys £0.80 before and about £0.769 after, a 3.8% fall.
- The two percentages aren't equal, because they're measured from different bases.
H: Effects
- A stronger pound makes imports and foreign holidays cheaper, and exports dearer for foreign buyers.
- UK firms earning in dollars receive fewer pounds when the pound strengthens.
- Businesses hedge with forward contracts to fix rates.
H: Cross rates
- £1 = $1.27 and €1 = $1.09, so £1 = 1.27/1.09 ≈ €1.165.
- Divide or multiply carefully, checking units: ($/£) ÷ ($/€) = €/£.
X: A UK shop imports a $200 item. The rate moves from £1 = $1.25 to £1 = $1.30. Find the change in its cost in pounds.
> Before: 200 ÷ 1.25 = £160
> After: 200 ÷ 1.30 ≈ £153.85
> The cost falls by about £6.15 (3.8%)
K: Rate changes have different percentages depending on the base; a stronger pound cuts import costs; cross rates combine two rates through a third.
!: Assuming a 4% rise in one currency means a 4% fall in the other.
Q: If £1 rises from €1.10 to €1.21, by what percentage has the pound appreciated? | 10%.
Q: £1 = $1.30 and €1 = $1.10. What is £1 in euros? | About €1.18.
SUM: Exchange rates move constantly.
SUM: Their changes affect prices and earnings.
SRC: Bank of England, What are exchange rates? | guidance | 2024 | https://www.bankofengland.co.uk/explainers/
SRC: Krugman PR, Obstfeld M, Melitz MJ, International Economics: Theory and Policy (12th edn, Pearson 2022) | textbook | 2022 | https://www.pearson.com/
NUM1#maths-u29-09-q1@1: The rate falls from £1 = $1.30 to £1 = $1.17. By what percentage has the pound depreciated? | 10 | 0.01 | % | (1.30 − 1.17)/1.30 = 0.10, a 10% fall.
M1#maths-u29-09-q2@1: The pound strengthens against the euro. What happens to UK holidays in Spain? | They get cheaper for UK tourists | They get more expensive | Nothing changes | Hotels close | They must be paid in pounds | A stronger pound buys more euros, so prices in Spain cost UK tourists fewer pounds.
M3#maths-u29-09-q3@2: £1 = $1.20 and $1 = ¥150. What is £1 in yen? | ¥180 | ¥125 | ¥150 | ¥1.80 | ¥0.008 | Chain the rates: £1 buys $1.20, and each dollar buys ¥150, so £1 buys 1.20 × 150 = ¥180.

## Percent Change
S: Percentage change measures how much a quantity has grown or shrunk relative to where it started. It's used for prices, populations, results and statistics in the news, and it's often confused with percentage points.
O: Calculate percentage increases and decreases
O: Distinguish percentage change from percentage point change and reverse changes
T: Percentage change | (new − original)/original × 100%
T: Percentage point | The arithmetic difference between two percentages
H: Calculating
- 80 to 92: change 12, so 12/80 = 15% increase.
- 92 back to 80: change −12, so −12/92 ≈ −13.0%: a different percentage, because the base differs.
- Always divide by the original value.
H: Percentage points
- An interest rate rising from 4% to 5% is a 1 percentage point rise but a 25% relative rise.
- News stories may use whichever sounds more dramatic.
H: Repeated changes
- A 50% fall needs a 100% rise to recover.
- Changes over several years multiply: +10% then +10% is +21%.
- Average annual change uses the nth root (see Compound Growth).
X: A town's population rose from 24,000 to 27,600. Find the percentage increase, and the percentage fall that would return it to 24,000.
> Increase: 3,600/24,000 = 15%
> Fall needed: 3,600/27,600
> ≈ 13.0%
- A percentage change is meaningless without its base: "up 200%" from 1 case to 3 is tiny.
K: Percentage change = change ÷ original; reversing a change needs a different percentage; percentage points are differences between percentages.
!: Dividing the change by the new value instead of the original.
Q: A price goes from £50 to £40. What is the percentage change? | −20%.
Q: An approval rating goes from 30% to 36%. Give the change in points and per cent. | 6 points; a 20% relative rise.
SUM: Divide the change by the original.
SUM: Percentage points aren't per cent.
SRC: Office for National Statistics, Statistical guidance: percentages and percentage points | guidance | 2024 | https://www.ons.gov.uk/
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
NUM1#maths-u29-10-q1@1: A value falls from 250 to 210. Find the percentage change. | -16 | 0.01 | % | (210 − 250)/250 = −0.16, a 16% fall.
M1#maths-u29-10-q2@1: A share price halves. What percentage rise returns it to its original price? | 100% | 50% | 200% | 25% | 150% | From half back to the whole is doubling, a 100% rise.
M2#maths-u29-10-q3@2: Unemployment rises from 4% to 5%. Which statement is correct? | It rose by 1 percentage point, a 25% relative increase | It rose by 1% | It rose by 25 percentage points | It rose by 5% | It doubled | 5 − 4 = 1 point, and 1/4 = 25% of the starting rate.

## Compound Growth
S: Compound growth happens when something grows by a fixed percentage each period, so the growth itself grows. Savings, populations, prices and debts all compound, and the effect over long periods is dramatic.
O: Use A = P(1 + r)^{n} for compound growth and decay
O: Calculate average annual growth rates and doubling times
T: Compound annual growth rate (CAGR) | The constant yearly rate giving the same overall growth: (end/start)^{1/n} − 1
T: Rule of 72 | Doubling time ≈ 72 ÷ (percentage growth rate)
H: The formula
E: A = P(1 + r)^{n}
- Growth by 5% a year for 10 years: × 1.05^{10} ≈ × 1.63.
- Decay: A = P(1 − r)^{n}, such as depreciation.
- More frequent compounding (monthly) gives slightly more than the same annual rate split up.
H: Average growth and doubling
- CAGR: a value growing from 100 to 150 in 5 years: 1.5^{1/5} − 1 ≈ 8.4% a year.
- Rule of 72: at 6% a year, money doubles in about 12 years.
- Solving for n exactly: n = ln(A/P)/ln(1 + r).
H: Why it matters
- Starting to save early has a huge effect over decades.
- Small differences in rates, such as fees, compound into large differences.
- Debts left unpaid compound too.
X: An investment grew from £10,000 to £15,000 in 5 years. Find the average annual growth rate.
> CAGR = (15,000/10,000)^{1/5} − 1
> = 1.5^{0.2} − 1 ≈ 1.0845 − 1
> ≈ 8.45% a year (not 10%, which is the simple average 50% ÷ 5)
K: A = P(1 + r)^{n}; CAGR = (end/start)^{1/n} − 1; rule of 72 for doubling time; small rate differences compound.
!: Averaging total growth over years (50% ÷ 5 = 10%) instead of using the nth root.
Q: Roughly how long does money take to double at 8% a year? | About 9 years.
Q: What multiplier gives 3 years of 4% growth? | 1.04^{3} ≈ 1.125.
SUM: Compound growth multiplies.
SUM: The nth root gives the average rate.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Money and Pensions Service, MoneyHelper: how compound interest works | guidance | 2025 | https://www.moneyhelper.org.uk/
NUM1#maths-u29-11-q1@1: Using the rule of 72, roughly how many years does it take to double money at 6% a year? | 12 | 0 | years | 72 ÷ 6 = 12 years.
M1#maths-u29-11-q2@1: A population of 2,000 grows by 3% a year. What is it after 2 years? | 2,121.8 | 2,120 | 2,060 | 2,180 | 2,006 | Compound growth multiplies each year: 2,000 × 1.03^{2} = 2,121.8.
M2#maths-u29-11-q3@2: Why does starting a pension 10 years earlier make such a difference? | Each early pound compounds for 10 more years | Pensions only grow late | Interest is higher for young people | It doesn't matter | Taxes are lower early | The longer money compounds, the faster its growth accelerates.

## Inflation Calculations
S: Inflation is the general rise in prices over time, measured in the UK mainly by the Consumer Prices Index (CPI). It erodes the value of money, so real changes in pay, savings and prices must be adjusted for it.
O: Calculate inflation rates from price indices
O: Convert between nominal and real values
T: Price index | A number showing the price level relative to a base year set at 100
T: Real value | A value adjusted for inflation, showing purchasing power
H: Measuring inflation
- Inflation rate = (index this year − index last year)/index last year.
- The ONS tracks a basket of hundreds of goods and services; CPIH adds owner-occupier housing costs.
- The Bank of England targets CPI inflation of 2%.
H: Real values
- Real value = nominal value ÷ (1 + inflation) for one year, or ÷ the index ratio over longer periods.
- A 3% pay rise with 4% inflation is a real fall of about 1% (1.03/1.04 ≈ 0.990).
- Real interest rate ≈ nominal rate − inflation.
H: Using indices
- To express a past price in today's money: multiply by (index now/index then).
- Inflation affects people differently, depending on what they buy.
X: A basket cost £200 last year and £208 this year. A worker's pay rose by 3%. What happened to their real pay?
> Inflation = 8/200 = 4%
> Real change = 1.03/1.04 − 1 ≈ −0.96%
> Real pay fell by about 1%, despite the rise
K: Inflation = change in index ÷ old index; real = nominal ÷ price ratio; pay rises below inflation are real cuts.
!: Treating a pay rise as an improvement without comparing it with inflation.
Q: What is the Bank of England's inflation target? | 2% CPI inflation.
Q: Savings earn 5% when inflation is 3%. What is the approximate real return? | About 2%.
SUM: Inflation erodes money's value.
SUM: Real values adjust for it.
SRC: Office for National Statistics, Consumer price inflation, UK | data | 2025 | https://www.ons.gov.uk/economy/inflationandpriceindices
SRC: Bank of England, What is inflation? | guidance | 2024 | https://www.bankofengland.co.uk/explainers/what-is-inflation
NUM1#maths-u29-12-q1@1: £100 is kept as cash for 2 years with 3% inflation each year. What is its value in today's money, to the nearest penny? | 94.26 | 0.01 | £ | 100 ÷ 1.03^{2} ≈ £94.26.
M1#maths-u29-12-q2@1: A price index goes from 120 to 126. What is the inflation rate? | 5% | 6% | 4.8% | 126% | 0.05% | Inflation is the change divided by the old index: 6/120 = 0.05, which is 5%.
M2#maths-u29-12-q3@2: A 1990 price of £50 is to be expressed in today's money. The index was 60 then and 150 now. What is it? | £125 | £20 | £90 | £75 | £150 | Scale by the ratio of index values: £50 × 150/60 = £50 × 2.5 = £125.

## Loan Repayments
S: Most loans are repaid in equal monthly instalments that cover both interest and part of the balance. The amortisation formula gives the payment, and the total repaid shows the true cost of borrowing.
O: Calculate a monthly loan repayment with the amortisation formula
O: Find the total cost of a loan and compare options
T: Amortisation | Paying off a loan with regular payments that cover interest and reduce the balance
T: Monthly rate | The annual rate divided by 12 (for loans quoted that way)
H: The formula
E: M = P × r(1 + r)^{n}/((1 + r)^{n} − 1)
- P: amount borrowed; r: monthly interest rate; n: number of payments.
- Early payments are mostly interest; later ones mostly repay the balance.
- Total repaid = M × n; total interest = M × n − P.
H: Comparing loans
- Longer terms mean lower monthly payments but more interest in total.
- Overpaying reduces interest (check for early repayment charges).
- Use the APR to compare, since fees are included.
H: Credit cards and minimum payments
- Interest is charged monthly on the balance.
- Paying only the minimum can take years and cost more than the original spending.
X: Find the monthly payment on £5,000 over 3 years at 6% a year (0.5% a month), and the total interest.
> r = 0.005, n = 36; 1.005^{36} ≈ 1.19668
> M = 5,000 × 0.005 × 1.19668/0.19668 ≈ £152.11
> Total = 36 × 152.11 ≈ £5,475.96, so interest ≈ £475.96
K: M = Pr(1 + r)^{n}/((1 + r)^{n} − 1); total repaid = Mn; longer terms cost more interest; minimum payments are expensive.
!: Using the annual rate as r in a monthly formula.
Q: How does a longer loan term affect total interest? | It increases it.
Q: What fraction of early loan payments goes to interest? | Most of it.
SUM: Equal payments cover interest and capital.
SUM: Compare total cost, not just payments.
SRC: Money and Pensions Service, MoneyHelper: loan calculator | guidance | 2025 | https://www.moneyhelper.org.uk/en/everyday-money/credit-and-purchases/loan-calculator
SRC: Financial Conduct Authority, Consumer Credit sourcebook (CONC) | standard | 2025 | https://www.handbook.fca.org.uk/handbook/CONC/
NUM1#maths-u29-13-q1@1: A credit card balance of £2,000 is charged 1.5% interest a month. How much interest is added in the first month, in pounds? | 30 | 0 | £ | 2,000 × 0.015 = £30.
M1#maths-u29-13-q2@1: Two loans of £10,000 have the same rate; one lasts 3 years and one 5 years. Which costs more in total interest? | The 5-year loan | The 3-year loan | They cost the same | It depends on the lender's name | Neither charges interest | The balance is outstanding for longer, so more interest accrues.
M3#maths-u29-13-q3@2: A £6,000 loan is repaid at £200 a month for 36 months. What is the total interest? | £1,200 | £7,200 | £200 | £600 | £3,600 | Total repaid £7,200 minus £6,000 borrowed.

## Mortgage Calculations
S: A mortgage is a long-term loan to buy property, secured on the home. Mortgage maths covers monthly repayments, deposits and loan-to-value ratios, and the large effect of interest rates over 25 years or more.
O: Calculate repayment and interest-only mortgage payments
O: Find loan-to-value ratios and the effect of rate changes
T: Loan-to-value (LTV) | The loan as a percentage of the property's value; lower LTVs usually get better rates
T: Interest-only mortgage | Monthly payments cover only the interest; the full loan is repaid at the end
H: Repayment mortgages
- Monthly payment from the amortisation formula with monthly rate r and n = 12 × years.
- £200,000 over 25 years at 4.5%: r = 0.00375, n = 300, so M ≈ £1,111.66; total repaid ≈ £333,500.
- Interest-only on the same loan: 200,000 × 0.045/12 = £750 a month, but £200,000 still owed.
H: Deposits and LTV
- A 10% deposit on a £250,000 home: loan £225,000, LTV 90%.
- Lenders also check affordability: income, outgoings and a stress test at higher rates.
- Stamp Duty Land Tax may apply (check current thresholds on gov.uk).
H: Rates
- Fixed rates stay the same for a set period; variable or tracker rates move with the market.
- A 1 percentage point rise can add well over £100 a month to a typical mortgage.
- Overpayments cut the term and total interest.
X: Find the monthly payment on a £200,000 repayment mortgage over 25 years at 4.5% a year.
> r = 0.045/12 = 0.00375, n = 300; 1.00375^{300} ≈ 3.0738
> M = 200,000 × 0.00375 × 3.0738/2.0738
> ≈ £1,111.66 a month
K: Use the amortisation formula with monthly rate and n = 12 × years; LTV = loan ÷ value; interest-only leaves the loan to repay; rates matter enormously.
!: Forgetting that an interest-only mortgage still requires the whole loan to be repaid at the end.
Q: What is the LTV for a £180,000 loan on a £200,000 home? | 90%.
Q: What is the monthly interest-only payment on £150,000 at 4%? | £500.
SUM: Mortgages are long amortised loans.
SUM: Deposits set the LTV.
SRC: Money and Pensions Service, MoneyHelper: mortgage calculator | guidance | 2025 | https://www.moneyhelper.org.uk/en/homes/buying-a-home/mortgage-calculator
SRC: Financial Conduct Authority, Mortgages and Home Finance: Conduct of Business sourcebook (MCOB) | standard | 2025 | https://www.handbook.fca.org.uk/handbook/MCOB/
NUM1#maths-u29-14-q1@1: A buyer puts down £30,000 on a £200,000 home. What is the LTV, as a percentage? | 85 | 0 | % | Loan £170,000; 170,000/200,000 = 85%.
M1#maths-u29-14-q2@1: What is the monthly interest-only payment on £240,000 at 5% a year? | £1,000 | £12,000 | £1,200 | £500 | £2,400 | Interest-only payments cover just the interest: 240,000 × 0.05 ÷ 12 = £1,000.
M2#maths-u29-14-q3@2: Why do lower-LTV mortgages usually have lower rates? | The lender has more security if prices fall | Lenders like small loans | They're always fixed rates | Deposits earn interest | They're shorter | A larger deposit cushions the lender against losses.

## Investment Returns
S: Investment returns combine income (dividends or interest) and changes in value. Comparing investments means accounting for time, fees, risk and inflation, not just headline gains.
O: Calculate total and annualised returns
O: Explain the effects of fees, risk and diversification
T: Total return | Income received plus the change in value, as a percentage of the amount invested
T: Diversification | Spreading money across different investments so one failure does less harm
H: Measuring returns
- Total return = (income + end value − start value)/start value.
- Dividend yield = annual dividend ÷ share price.
- Annualised return over n years: (end/start)^{1/n} − 1.
H: Fees and inflation
- Fees compound: £10,000 for 20 years at 5% grows to about £26,500; at 4% (after a 1% fee) to about £21,900.
- Real return ≈ nominal return − inflation.
- Tax wrappers (such as ISAs and pensions in the UK) protect returns from tax.
H: Risk
- Higher expected returns usually come with more risk (bigger swings, chance of loss).
- Diversification reduces risk without necessarily reducing expected return.
- Past performance doesn't guarantee future returns.
X: £1,000 of shares pay £40 in dividends over a year and are then sold for £1,100. Find the total return.
> Capital gain = £100; income = £40
> Total = £140
> Total return = 140/1,000 = 14%
K: Total return includes income and growth; annualise with the nth root; fees and inflation reduce real returns; diversify against risk.
!: Ignoring fees, which compound into large differences over decades.
Q: What is the dividend yield on a £50 share paying £2 a year? | 4%.
Q: What does diversification do? | Reduces the impact of any one investment doing badly.
SUM: Returns include income and growth.
SUM: Fees and risk matter as much as headline gains.
SRC: Financial Conduct Authority, Investing: understanding risk | guidance | 2025 | https://www.fca.org.uk/consumers/investing
SRC: Bodie Z, Kane A, Marcus AJ, Investments (13th edn, McGraw-Hill 2024) | textbook | 2024 | https://www.mheducation.co.uk/
NUM1#maths-u29-15-q1@1: A share bought for £60 pays a £3 dividend. Find the dividend yield. | 5 | 0 | % | 3/60 = 5%.
M1#maths-u29-15-q2@1: £10,000 grows at 5% a year for 20 years. Roughly what is it worth? | £26,500 | £20,000 | £15,000 | £30,000 | £21,900 | Compounding gives 10,000 × 1.05^{20} ≈ 10,000 × 2.653 ≈ £26,533.
M3#maths-u29-15-q3@2: Fund A returns 7% with a 1.5% annual fee; fund B returns 6.5% with a 0.2% fee. Which is better, assuming equal risk? | Fund B (6.3% net against 5.5%) | Fund A, because 7% is higher | They're equal | Neither: fees don't matter | Fund A over long periods | Compare returns after fees: 7 − 1.5 = 5.5% against 6.5 − 0.2 = 6.3%.

## Measurement
S: Measurement assigns numbers to quantities like length, mass, time and temperature using standard units. Every measurement has limited accuracy, and knowing those limits matters as much as the reading itself.
O: Read scales accurately and choose suitable instruments and units
O: Find upper and lower bounds of rounded measurements
T: SI units | The international system: metre, kilogram, second, kelvin, ampere, mole and candela
T: Bounds | The smallest and largest values a rounded measurement could be: 12 cm to the nearest cm lies in [11.5, 12.5)
H: Reading scales
- Work out what each small division represents: 5 divisions between 2 and 3 means 0.2 each.
- Read at eye level to avoid parallax.
- Choose instruments to match the precision needed: a tape measure for a room, callipers for a bolt.
H: Accuracy
- A measurement to the nearest unit can be up to half a unit out either way.
- Bounds combine: the perimeter of a square of side 8 cm (nearest cm) is between 30 and 34 cm.
- Repeat measurements and average them to reduce random error.
H: Units
- Choose sensible units: millimetres for a screw, kilometres for a journey.
- Metric prefixes: kilo (× 1,000), centi (÷ 100), milli (÷ 1,000), micro (÷ 1,000,000).
- Temperature: °C and K (K = °C + 273.15); °F = 1.8 × °C + 32.
X: A scale between 40 and 50 has 4 small divisions between the numbered marks, and the pointer is on the 3rd division after 40. What's the reading, and what are its bounds if it's taken to the nearest division?
> 4 divisions span 10 units, so each is 2.5
> Reading = 40 + 3 × 2.5 = 47.5
> To the nearest division: between 46.25 and 48.75
K: Work out the value of each division; know bounds of rounded values; use suitable instruments and units.
!: Assuming each small division is 1 without checking the scale.
Q: A mass is 3.4 kg to 1 d.p. What is its upper bound? | 3.45 kg.
Q: Convert 25°C to °F. | 77°F.
SUM: Read scales carefully.
SUM: Every measurement has bounds.
SRC: Bureau International des Poids et Mesures, The International System of Units (SI brochure, 9th edn) | standard | 2019 | https://www.bipm.org/en/publications/si-brochure
SRC: National Physical Laboratory, Good practice guide: beginner's guide to measurement | guidance | 2012 | https://www.npl.co.uk/
NUM1#maths-u29-16-q1@1: A square's side is 8 cm to the nearest cm. Find the upper bound of its perimeter in cm. | 34 | 0 | cm | 4 × 8.5 = 34 cm.
M1#maths-u29-16-q2@1: Which instrument is most suitable for measuring the diameter of a pencil? | Callipers | A metre rule | A tape measure | A trundle wheel | A measuring jug | Callipers measure small lengths to fractions of a millimetre.
M2#maths-u29-16-q3@2: A length is 120 mm to the nearest 10 mm. What is its lower bound? | 115 mm | 119.5 mm | 110 mm | 125 mm | 120 mm | Half of 10 mm is 5 mm, so the lower bound is 120 − 5 = 115 mm.

## Unit Conversion
S: Unit conversion changes a quantity from one unit to another without changing its size: metres to centimetres, square metres to square centimetres, miles to kilometres. Errors are common with area and volume units, where factors are squared or cubed.
O: Convert between metric units of length, area, volume and capacity
O: Convert between metric and imperial units
T: Conversion factor | The number you multiply by to change units, such as 100 cm per m
T: Capacity | The volume a container holds; 1 litre = 1,000 cm^{3}
H: Metric conversions
- Length: 1 m = 100 cm = 1,000 mm; 1 km = 1,000 m.
- Area: 1 m^{2} = 100^{2} = 10,000 cm^{2}; 1 hectare = 10,000 m^{2}.
- Volume: 1 m^{3} = 100^{3} = 1,000,000 cm^{3} = 1,000 litres.
- Mass: 1 kg = 1,000 g; 1 tonne = 1,000 kg.
H: Imperial conversions
- 1 inch = 2.54 cm exactly; 1 foot = 12 inches ≈ 30.48 cm.
- 1 mile ≈ 1.609 km; 5 miles ≈ 8 km.
- 1 kg ≈ 2.205 lb; 1 stone = 14 lb.
- 1 UK gallon ≈ 4.546 litres; 1 UK pint ≈ 568 ml.
H: Method
- Write units through the calculation and cancel them (dimensional analysis).
- Check direction: converting to a smaller unit gives a larger number.
- Compound units: 1 m/s = 3.6 km/h; 1 g/cm^{3} = 1,000 kg/m^{3}.
X: Convert 3.5 m^{2} to cm^{2}, and 2.4 m^{3} to litres.
> 1 m^{2} = 10,000 cm^{2}, so 3.5 m^{2} = 35,000 cm^{2}
> 1 m^{3} = 1,000 litres
> 2.4 m^{3} = 2,400 litres
K: Square the factor for areas and cube it for volumes; 1 m^{3} = 1,000 L; 1 inch = 2.54 cm; keep units in the working.
!: Converting m^{2} to cm^{2} by multiplying by 100 instead of 10,000.
Q: How many cm^{3} are in a litre? | 1,000.
Q: Roughly how many km is 50 miles? | About 80 km.
SUM: Area and volume factors are squared and cubed.
SUM: Carry units through the working.
SRC: Bureau International des Poids et Mesures, The International System of Units (SI brochure, 9th edn) | standard | 2019 | https://www.bipm.org/en/publications/si-brochure
SRC: GOV.UK, Weights and Measures Act 1985: schedule 1 definitions of units | legislation | 1985 | https://www.legislation.gov.uk/ukpga/1985/72/schedule/1
NUM1#maths-u29-17-q1@1: Convert 5 miles to km, to 2 decimal places (1 mile = 1.609 km). | 8.05 | 0.01 | km | 5 × 1.609 = 8.045 ≈ 8.05 km.
M1#maths-u29-17-q2@1: How many mm^{2} are in 1 cm^{2}? | 100 | 10 | 1,000 | 0.1 | 10,000 | 1 cm = 10 mm, so 1 cm^{2} = 10^{2} = 100 mm^{2}.
M2#maths-u29-17-q3@2: A tank is 2 m × 1.5 m × 0.8 m. How many litres does it hold? | 2,400 | 240 | 24,000 | 2.4 | 4,300 | Volume 2.4 m^{3}, and 1 m^{3} = 1,000 litres.

## Time Calculations
S: Time calculations involve the 24-hour clock, durations, timetables, time zones and converting between hours, minutes and decimals. Base 60 makes them error-prone on calculators.
O: Calculate durations, including across midnight, and convert time units
O: Work with time zones and pay calculated by the hour
T: 24-hour clock | Times from 00:00 to 23:59, avoiding a.m. and p.m.
T: Time zone | A region with a common standard time, given as an offset from UTC
H: Durations
- Count up in steps: 22:47 to 23:00 is 13 minutes; to 01:00 is 2 hours more; to 01:15 is 15 more.
- Don't subtract times like decimals: 13:20 − 11:45 isn't 1.75 hours.
- Convert: 3 h 45 min = 3.75 h; 0.4 h = 24 minutes.
H: Calendars and zones
- Days in months, leap years (divisible by 4, except centuries not divisible by 400).
- UTC offsets: when it's 12:00 UTC, New York (UTC−5 in winter) is 07:00.
- The UK uses GMT (UTC+0) in winter and BST (UTC+1) in summer.
H: Pay and rates
- Pay = hours × hourly rate, with hours in decimal form.
- Overtime is often paid at time and a half (× 1.5).
X: A train leaves at 22:47 and arrives at 01:15 the next day. How long is the journey?
> 22:47 to 23:00: 13 minutes
> 23:00 to 01:00: 2 hours; 01:00 to 01:15: 15 minutes
> Total: 2 hours 28 minutes
- Timesheets often record minutes: convert to hours by dividing by 60 before multiplying by the pay rate.
- Clocks change on the last Sundays of March and October in the UK, which affects overnight durations.
K: Count up through hours for durations; convert minutes ÷ 60 for decimals; use UTC offsets for time zones.
!: Treating 1 hour 30 minutes as 1.3 hours.
Q: Write 7:45 p.m. in 24-hour time. | 19:45.
Q: How many minutes is 0.35 hours? | 21 minutes.
SUM: Time works in base 60.
SUM: Count up through the hours.
SRC: Department for Education, Mathematics programmes of study: key stages 1 and 2 | standard | 2013 | https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study
SRC: National Physical Laboratory, Time and frequency: UTC and the UK's time scale | guidance | 2024 | https://www.npl.co.uk/time
NUM1#maths-u29-18-q1@1: Someone works 7 hours 30 minutes at £12.60 an hour. How much do they earn, in pounds? | 94.5 | 0.01 | £ | 7.5 × 12.60 = £94.50.
M1#maths-u29-18-q2@1: It's 15:00 in London (GMT). What time is it in Tokyo (UTC+9)? | 00:00 the next day | 06:00 | 18:00 | 09:00 | 24:00 | 15:00 + 9 hours = 24:00, which is midnight, the start of the next day.
M2#maths-u29-18-q3@2: A film starts at 19:40 and lasts 2 hours 35 minutes. When does it end? | 22:15 | 21:75 | 22:05 | 21:15 | 22:35 | 19:40 + 2 h = 21:40, then + 35 min = 22:15.

## Speed and Distance
S: Everyday speed and distance problems include planning journeys, fuel use, running pace and stopping distances. They use the same relationship as exam problems, applied to real decisions.
O: Plan journeys using speed, distance and time
O: Calculate fuel use, running pace and stopping distances
T: Pace | Time per unit distance, such as minutes per kilometre, used in running
T: Fuel economy | Distance per unit of fuel (miles per gallon) or fuel per distance (litres per 100 km)
H: Journeys
- Time = distance ÷ speed; add time for breaks and traffic.
- Arrival time: departure + travel time.
- Average speeds for real journeys are usually well below speed limits.
H: Fuel and pace
- Fuel needed = distance ÷ mpg (in gallons); × 4.546 for litres.
- Running pace: 10 km in 52 min 30 s is 5 min 15 s per km, or about 11.4 km/h.
- Cost of a trip = fuel used × price per litre.
H: Stopping distances
- Stopping distance = thinking distance + braking distance.
- The Highway Code gives typical stopping distances of 23 m at 30 mph and 96 m at 70 mph.
- Braking distance grows with the square of speed: doubling speed roughly quadruples it.
X: A runner finishes 10 km in 52 minutes 30 seconds. Find the pace per km and the average speed in km/h.
> 52.5 minutes ÷ 10 = 5.25 minutes per km = 5 min 15 s
> Time in hours = 52.5/60 = 0.875 h
> Speed = 10/0.875 ≈ 11.4 km/h
K: Plan with time = distance ÷ speed plus breaks; fuel = distance ÷ economy; pace is time per distance; braking distance rises with speed squared.
!: Converting a pace of 5.25 minutes to "5 minutes 25 seconds".
Q: What two parts make up stopping distance? | Thinking distance and braking distance.
Q: If speed doubles, roughly what happens to braking distance? | It quadruples.
SUM: Speed, distance and time plan real journeys.
SUM: Stopping distance grows fast with speed.
SRC: Department for Transport, The Highway Code: typical stopping distances (rule 126) | guidance | 2022 | https://www.gov.uk/guidance/the-highway-code
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
NUM1#maths-u29-19-q1@1: A car does 45 miles per gallon. How many litres of fuel for a 300-mile trip, to 1 decimal place (1 gallon = 4.546 litres)? | 30.3 | 0.05 | litres | 300/45 = 6.67 gallons, × 4.546 ≈ 30.3 litres.
M1#maths-u29-19-q2@1: A 180-mile journey is driven at an average of 60 mph with a 30-minute break. How long does it take? | 3 hours 30 minutes | 3 hours | 3 hours 18 minutes | 2 hours 30 minutes | 4 hours | 180/60 = 3 hours driving, plus 30 minutes.
M2#maths-u29-19-q3@2: According to the Highway Code, what's the typical stopping distance at 70 mph? | 96 m | 23 m | 53 m | 70 m | 140 m | Rule 126 gives 96 m at 70 mph, made up of thinking and braking distances.

## Ratios in Recipes
S: Recipes are ratios: the proportions of ingredients matter more than the amounts. Scaling a recipe up or down, converting units and using baker's percentages are everyday uses of ratio.
O: Scale recipes for different numbers of servings
O: Use ratios and baker's percentages to set ingredient amounts
T: Scale factor | The number you multiply every quantity by: new servings ÷ original servings
T: Baker's percentage | Each ingredient as a percentage of the flour weight
H: Scaling
- Scale factor = wanted servings ÷ recipe servings; multiply every ingredient by it.
- Round sensibly: you can't use 2.25 eggs, so choose 2 or use part of a beaten egg.
- Cooking times don't scale simply; larger dishes may need longer at the same temperature.
H: Ratios
- Shortcrust pastry is roughly 2 parts flour to 1 part fat.
- Share a total in a ratio: 2:3 of 500 g is 200 g and 300 g.
- Unitary method: find the amount for one serving first.
H: Baker's percentages
- Bread at 65% hydration: 650 g water per 1,000 g flour.
- Salt is often around 2% of the flour weight.
- Percentages make it easy to scale any batch size.
X: A recipe for 4 uses 300 g flour, 150 ml milk and 2 eggs. Scale it for 6.
> Scale factor = 6/4 = 1.5
> Flour 450 g; milk 225 ml
> Eggs 3
- Converting units: 1 tablespoon is about 15 ml and 1 teaspoon about 5 ml; US cups differ from UK measures.
K: Scale factor = new ÷ old servings; multiply every ingredient; share totals in ratios; baker's percentages scale with the flour.
!: Adding the same extra amount to every ingredient instead of multiplying.
Q: A recipe serves 8. What scale factor makes it serve 2? | 0.25.
Q: Dough uses 500 g flour at 70% hydration. How much water? | 350 g.
SUM: Recipes are ratios.
SUM: Multiply every ingredient by the scale factor.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Ruhlman M, Ratio: The Simple Codes Behind the Craft of Everyday Cooking (Scribner 2009) | textbook | 2009 | https://www.simonandschuster.com/
NUM1#maths-u29-20-q1@1: A smoothie recipe uses fruit and yoghurt in the ratio 3:2. How much fruit is in 750 g of smoothie, in grams? | 450 | 0 | g | 3/5 × 750 = 450 g.
M1#maths-u29-20-q2@1: Pastry uses flour and butter in the ratio 2:1. How much butter goes with 350 g of flour? | 175 g | 700 g | 117 g | 233 g | 350 g | In a 2:1 ratio the butter is half the flour, so 350 ÷ 2 = 175 g.
M2#maths-u29-20-q3@2: A recipe for 6 needs 450 g of rice. How much for 10 people? | 750 g | 600 g | 270 g | 4,500 g | 900 g | Find one serving first: 450 ÷ 6 = 75 g, then 75 × 10 = 750 g.

## Scaling and Proportions
S: Proportion problems appear everywhere: map scales, model sizes, best-buy comparisons, staffing and dosages. Recognising whether quantities are in direct or inverse proportion is the key step.
O: Solve direct and inverse proportion problems
O: Use map scales and scale factors for length, area and volume
T: Direct proportion | Two quantities increase together at the same rate: y = kx
T: Inverse proportion | As one doubles, the other halves: y = k/x
H: Direct and inverse
- Direct: 5 kg costs £12, so 8 kg costs 12 × 8/5 = £19.20.
- Inverse: 6 workers take 10 days, so 4 workers take 6 × 10/4 = 15 days (assuming equal work rates).
- Ask: if one quantity doubles, does the other double or halve?
H: Map scales
- 1:25,000 means 1 cm on the map is 25,000 cm = 250 m in reality, so 4 cm is 1 km.
- 1:50,000: 2 cm per km.
- Convert units carefully: 100,000 cm = 1 km.
H: Area and volume scale factors
- Lengths scale by k, areas by k^{2}, volumes by k^{3}.
- A model at 1:20 has 1/400 of the real area and 1/8,000 of the real volume.
- That's why doubling a pizza's diameter quadruples its area.
X: Six workers can lay a patio in 10 days. How long would 4 workers take, and why?
> Total work = 6 × 10 = 60 worker-days
> Fewer workers take longer: inverse proportion
> 60 ÷ 4 = 15 days
K: Decide direct or inverse; use the unitary method or k; map scales convert by the ratio; area scales by k^{2} and volume by k^{3}.
!: Treating an inverse proportion as direct (more workers taking longer).
Q: On a 1:50,000 map, how far in reality is 6 cm? | 3 km.
Q: A model is a 1:10 scale. How does its volume compare with the real thing? | 1/1,000.
SUM: Identify direct or inverse proportion.
SUM: Areas and volumes scale by k^{2} and k^{3}.
SRC: Ordnance Survey, Map reading made easy: scales | guidance | 2024 | https://www.ordnancesurvey.co.uk/
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
NUM1#maths-u29-21-q1@1: On a 1:50,000 map, two villages are 7 cm apart. How far apart are they, in km? | 3.5 | 0 | km | 7 × 50,000 = 350,000 cm = 3.5 km.
M1#maths-u29-21-q2@1: A 12-inch pizza and an 8-inch pizza are similar shapes. How many times more pizza is in the larger one? | 2.25 | 1.5 | 3.375 | 2 | 4 | The length scale factor is 1.5, so the area scale factor is 1.5^{2} = 2.25.
M3#maths-u29-21-q3@2: A pump fills a pool in 9 hours. How long do 3 identical pumps take? | 3 hours | 27 hours | 9 hours | 6 hours | 4.5 hours | Three times the pumping rate means a third of the time.

## Area and Volume Calculations
S: Practical area and volume calculations decide how much paint, turf, flooring, concrete or water a job needs. They combine standard formulas with composite shapes, unit conversion and allowances for waste.
O: Calculate areas and volumes of composite shapes
O: Turn areas and volumes into quantities of materials
T: Composite shape | A shape made of simpler shapes, found by adding or subtracting their areas
T: Prism | A solid with a constant cross-section: volume = cross-section area × length
H: Formulas
- Rectangle lw; triangle ½bh; circle πr^{2}; trapezium ½(a + b)h.
- Cuboid lwh; prism A × l; cylinder πr^{2}h; sphere (4/3)πr^{3}.
- Composite: split into simple shapes; subtract cut-outs such as windows.
H: Materials
- Paint: area ÷ coverage per litre × number of coats.
- Flooring and turf: area plus a waste allowance (often 5 to 10%).
- Round up to whole tins, packs or bags.
H: Capacity
- 1 m^{3} = 1,000 litres: a pond's volume in m^{3} gives litres.
- Check units: cm and m mixed together are the commonest error.
X: A circular pond has radius 1.5 m and depth 0.6 m. How many litres of water does it hold?
> Volume = π × 1.5^{2} × 0.6 = π × 1.35
> ≈ 4.241 m^{3}
> × 1,000 ≈ 4,241 litres
- Gravel and soil are sold by volume or weight: multiply volume by density to get the mass to order.
- Odd shapes can be approximated by splitting them into rectangles and triangles.
K: Split composite shapes; prisms and cylinders are cross-section × length; convert to materials with waste allowances, rounding up.
!: Mixing centimetres and metres in the same calculation.
Q: What is the area of a trapezium with parallel sides 4 m and 6 m, 3 m apart? | 15 m^{2}.
Q: How many litres are in 0.25 m^{3}? | 250 litres.
SUM: Formulas give areas and volumes.
SUM: Allow for waste and round up.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Construction Industry Training Board, Construction maths: area and volume | guidance | 2023 | https://www.citb.co.uk/
NUM1#maths-u29-22-q1@1: A lawn is 6 m by 4.5 m. How many square metres of turf are needed, with no waste allowance? | 27 | 0 | m² | 6 × 4.5 = 27 m^{2}.
M1#maths-u29-22-q2@1: A wall is 5 m by 2.4 m with a 1.2 m by 1 m window. What area needs painting? | 10.8 m^{2} | 12 m^{2} | 13.2 m^{2} | 9.6 m^{2} | 1.2 m^{2} | Subtract the window from the wall: 5 × 2.4 − 1.2 × 1 = 12 − 1.2 = 10.8 m^{2}.
M2#maths-u29-22-q3@2: A cylindrical tank has diameter 1 m and height 2 m. What is its capacity, to the nearest litre? | 1,571 litres | 6,283 litres | 3,142 litres | 785 litres | 2,000 litres | π × 0.5^{2} × 2 ≈ 1.571 m^{3} = 1,571 litres.

## Construction Mathematics
S: Construction mathematics turns plans into materials and measurements: setting out square corners, calculating concrete and bricks, working out roof pitches and designing stairs within building regulations.
O: Use Pythagoras and trigonometry for setting out and roof pitches
O: Calculate quantities of concrete and bricks, and check stair dimensions
T: 3-4-5 rule | A triangle with sides 3, 4 and 5 has a right angle, used to set out square corners
T: Rise and going | The height of each step and the horizontal depth of each tread
H: Setting out
- Mark 3 m along one line and 4 m along the other: if the diagonal is 5 m, the corner is square.
- Check rectangles by comparing diagonals: they're equal only if the corners are right angles.
- Roof pitch: tan θ = rise ÷ run; rafter length by Pythagoras.
H: Materials
- Concrete volume = length × width × depth, plus a waste allowance.
- Brickwork: about 60 standard bricks per square metre of single-skin wall (with 10 mm mortar joints).
- Order in the units supplied: cubic metres of concrete, packs of blocks.
H: Stairs (England, Building Regulations Part K, private stairs)
- Maximum rise 220 mm; minimum going 220 mm; maximum pitch 42°.
- 2 × rise + going should be between 550 mm and 700 mm.
- Divide the total rise into equal steps; check the current Approved Document.
X: A concrete slab is 4 m by 3 m and 100 mm thick. With 10% extra for waste, how much concrete should be ordered?
> Volume = 4 × 3 × 0.1 = 1.2 m^{3}
> Add 10%: 1.2 × 1.1
> = 1.32 m^{3}
K: Use 3-4-5 and equal diagonals for square corners; tan for pitches; volume plus waste for concrete; check stairs against Part K.
!: Forgetting to convert millimetres to metres when calculating volumes.
Q: How can you check that a rectangular frame is square? | Measure the diagonals: they should be equal.
Q: A stair has rise 200 mm and going 250 mm. What is 2R + G? | 650 mm.
SUM: Construction relies on geometry and volume.
SUM: Regulations set limits for safety.
SRC: Department for Levelling Up, Housing and Communities, Approved Document K: protection from falling, collision and impact | standard | 2013 | https://www.gov.uk/government/publications/protection-from-falling-collision-and-impact-approved-document-k
SRC: Construction Industry Training Board, Construction maths: area and volume | guidance | 2023 | https://www.citb.co.uk/
NUM1#maths-u29-23-q1@1: A total stair rise of 2.6 m is divided into 13 equal risers. What is each rise, in mm? | 200 | 0 | mm | 2,600 ÷ 13 = 200 mm.
M1#maths-u29-23-q2@1: A roof rises 2 m over a horizontal run of 4 m. What is its pitch, to the nearest degree? | 27° | 30° | 45° | 63° | 22° | tan θ = 2/4, so θ = tan^{−1}(0.5) ≈ 26.6°.
M2#maths-u29-23-q3@2: About how many bricks are needed for a single-skin wall 6 m long and 2 m high? | About 720 | About 120 | About 60 | About 1,440 | About 360 | 12 m^{2} × about 60 bricks per m^{2} ≈ 720.

## Surveying Mathematics
S: Surveying measures land: distances, angles, heights and levels, for maps, building sites and roads. It relies on trigonometry, bearings and careful arithmetic with heights.
O: Calculate heights by trigonometry and levelling
O: Express gradients as ratios and percentages
T: Reduced level | The height of a point relative to a datum, such as Ordnance Datum Newlyn in Great Britain
T: Levelling | Finding height differences using a level and staff readings (backsight and foresight)
H: Heights and distances
- Height of a building: distance × tan(angle of elevation) + instrument height.
- Bearings: three-figure angles clockwise from north.
- Triangulation: a measured baseline and angles locate distant points (sine rule).
H: Levelling
- Height of instrument = known level + backsight.
- New level = height of instrument − foresight.
- Check by closing the loop back to the starting benchmark.
H: Gradients
- Gradient = vertical change ÷ horizontal distance.
- 1 in 80: a 1 m drop over 80 m (1.25%).
- Drains, ramps and roads have required gradients (for example, wheelchair ramps have maximum gradients set by regulations).
- Modern surveying uses GNSS (satellite positioning) and laser scanning, with the same mathematics.
X: A level is set up with a backsight of 1.45 m on a benchmark at 50.00 m. The foresight to point P is 2.10 m. Find the reduced level of P.
> Height of instrument = 50.00 + 1.45 = 51.45 m
> Level of P = 51.45 − 2.10
> = 49.35 m (P is 0.65 m below the benchmark)
K: Height = distance × tan(elevation) + instrument height; levels = benchmark + backsight − foresight; gradients as ratios or percentages.
!: Adding the foresight instead of subtracting it.
Q: Express a gradient of 1 in 20 as a percentage. | 5%.
Q: What does a backsight reading measure? | The staff reading on a point of known level.
SUM: Surveying measures land with trigonometry.
SUM: Levelling tracks heights carefully.
SRC: Ordnance Survey, A guide to coordinate systems in Great Britain | guidance | 2020 | https://www.ordnancesurvey.co.uk/
SRC: Uren J, Price WF, Surveying for Engineers (5th edn, Palgrave Macmillan 2010) | textbook | 2010 | https://link.springer.com/
NUM1#maths-u29-24-q1@1: From 60 m away, the top of a building is at an elevation of 25°, measured from an instrument 1.5 m high. Find the height, to 1 decimal place. | 29.5 | 0.05 | m | 60 tan 25° ≈ 27.98, plus 1.5 ≈ 29.5 m.
M1#maths-u29-24-q2@1: A drain falls 0.5 m over 40 m. What is its gradient? | 1 in 80 | 1 in 20 | 1 in 40 | 1 in 8 | 1 in 200 | Divide the horizontal distance by the drop: 40 ÷ 0.5 = 80, so 1 in 80, or 1.25%.
M2#maths-u29-24-q3@2: The height of instrument is 32.40 m and the foresight on a point is 1.85 m. What is the point's level? | 30.55 m | 34.25 m | 32.40 m | 1.85 m | 30.85 m | Level = height of instrument − foresight.

## Reading Graphs
S: Everyday graphs show energy use, prices, tariffs and conversions. Reading them well means knowing what the axes measure, what the gradient means, and where two lines cross.
O: Use conversion graphs and tariff graphs
O: Find break-even points where two graphs cross
T: Conversion graph | A straight-line graph through the origin used to convert units, such as miles and kilometres
T: Fixed and variable charges | A tariff with a fixed monthly fee plus a rate per unit, giving a straight line with an intercept
H: Straight-line graphs in daily life
- Cost = fixed charge + rate × usage: intercept is the fixed charge, gradient the rate.
- Conversion graphs pass through the origin (0 miles = 0 km).
- Step graphs show charges that jump at thresholds (postage by weight band).
H: Comparing options
- Where two tariff lines cross, they cost the same.
- Below the crossing, the line with the smaller value is cheaper; above it, the other.
- Solve algebraically to find the crossing exactly.
H: Reading carefully
- Check the scales (they may not start at zero).
- Read between gridlines by estimating.
- Ask what's missing: a graph of a few months can hide seasonal patterns.
X: Tariff A: £10 a month plus 5p a minute. Tariff B: £4 a month plus 9p a minute. When do they cost the same, and which is cheaper for 200 minutes?
> 10 + 0.05m = 4 + 0.09m gives 6 = 0.04m, so m = 150 minutes
> At 200 minutes: A = 10 + 10 = £20; B = 4 + 18 = £22
> A is cheaper above 150 minutes; B below
K: Intercept = fixed charge, gradient = rate; crossing points give break-even usage; check scales and missing context.
!: Assuming the tariff with the lower fixed charge is always cheaper.
Q: On a cost graph, what does the gradient represent? | The cost per unit used.
Q: Why does a conversion graph pass through the origin? | Zero in one unit is zero in the other.
SUM: Everyday graphs show fixed and variable costs.
SUM: Crossings show break-even points.
SRC: Department for Education, Mathematics GCSE subject content and assessment objectives | standard | 2013 | https://www.gov.uk/government/publications/gcse-mathematics-subject-content-and-assessment-objectives
SRC: Office for National Statistics, Data visualisation style guide | guidance | 2024 | https://service-manual.ons.gov.uk/data-visualisation
NUM1#maths-u29-25-q1@1: Plan A costs £15 plus 20p per unit; plan B costs £5 plus 30p per unit. At how many units do they cost the same? | 100 | 0 | units | 15 + 0.2u = 5 + 0.3u gives 10 = 0.1u, so u = 100.
M1#maths-u29-25-q2@1: On a conversion graph, 50 miles reads as 80 km. Roughly how many km is 25 miles? | 40 km | 80 km | 20 km | 50 km | 16 km | The graph is a straight line through the origin, so halve 80.
M2#maths-u29-25-q3@2: A parcel service charges by weight band: up to 1 kg £3, up to 2 kg £5, up to 5 kg £8. What type of graph is this? | A step graph | A straight line through the origin | A curve | A scatter graph | A pie chart | Prices jump at each threshold and stay level between them.

## Reading Tables
S: Tables organise information for timetables, nutrition labels, distance charts and tax bands. Reading them accurately, and doing the arithmetic they imply, is a key practical skill.
O: Extract and combine information from tables
O: Interpret nutrition labels and timetables
T: Reference intake (RI) | Guideline daily amounts on UK food labels, such as 2,000 kcal energy and 6 g salt for an adult
T: Per 100 g versus per portion | Nutrition labels give both; per 100 g allows fair comparisons
H: Nutrition labels
- Compare products using the per-100 g column.
- Portion amount = per-100 g value × portion weight ÷ 100.
- % RI = amount ÷ reference intake; adult RIs include 2,000 kcal, 70 g fat, 90 g total sugars and 6 g salt.
- Traffic-light colours flag high, medium and low levels.
H: Timetables and charts
- Read across rows for one service and down columns for one stop.
- Look for footnotes (weekdays only, change trains).
- Distance charts: find the cell where the row of one place meets the column of another.
H: Care
- Check units and headings before reading values.
- Note whether totals or averages are shown.
- Two-way tables give conditional proportions (see Contingency Tables in School 13).
X: Cereal has 22.5 g of sugars per 100 g. A portion is 30 g. Find the sugar per portion and its % RI (90 g).
> Per portion: 22.5 × 30/100 = 6.75 g
> % RI = 6.75/90
> = 7.5%
K: Use per-100 g values to compare and scale by portion size; % RI = amount ÷ reference intake; read timetable footnotes and headings.
!: Comparing one product's per-portion figure with another's per-100 g figure.
Q: Which column of a nutrition label should you use to compare two products? | Per 100 g.
Q: What is the adult reference intake for salt? | 6 g.
SUM: Tables pack information densely.
SUM: Check columns, units and footnotes.
SRC: Food Standards Agency and Department of Health, Guide to creating a front of pack nutrition label | guidance | 2016 | https://www.gov.uk/government/publications/front-of-pack-nutrition-labelling-guidance
SRC: NHS, Food labels | guidance | 2024 | https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/how-to-read-food-labels/
NUM1#maths-u29-26-q1@1: A meal contains 1.2 g of salt. What percentage of the adult reference intake (6 g) is that? | 20 | 0 | % | 1.2/6 = 0.2 = 20%.
M1#maths-u29-26-q2@1: A label shows 12 g of fat per 100 g, and a portion is 150 g. How much fat is in a portion? | 18 g | 12 g | 8 g | 1.8 g | 180 g | Scale the per-100 g value by the portion weight: 12 × 150/100 = 18 g.
M2#maths-u29-26-q3@2: A timetable shows a train at 08:42 with a footnote "Mondays to Fridays". Can you catch it on Saturday? | No: it runs only on weekdays | Yes | Only in summer | Yes, but it's late | It depends on the weather | The footnote restricts the service to weekdays.

## Risk and Probability
S: Everyday decisions involve risk: insurance, health choices, travel, investments and weather. Understanding probabilities, expected values and how risks are presented leads to better decisions.
O: Compare risks using natural frequencies and expected values
O: Decide whether insurance or a warranty is worth buying
T: Natural frequency | A probability expressed as a count, such as "3 in 1,000 people"
T: Expected cost | Probability × cost, summed over outcomes: the long-run average cost
H: Communicating risk
- "3 in 1,000" is clearer than "0.3%" for most people.
- Absolute risk tells you your chance; relative risk compares groups (see Data Interpretation in School 13).
- A micromort is a one-in-a-million chance of death, used to compare activities.
H: Insurance and warranties
- Expected payout = P(claim) × (loss − excess).
- Premiums are higher than expected payouts on average: that covers the insurer's costs and profit.
- Insure what you couldn't afford to lose (home, car liability); self-insure small risks (phone cases, extended warranties) if you can.
H: Everyday probability
- Weather forecasts: a 70% chance of rain means it rains on about 70% of such days.
- Independent events don't "balance out" (the gambler's fallacy).
- Rare events happen somewhere every day because there are so many opportunities.
X: A £600 phone has a 5% chance a year of a claim. Insurance costs £60 a year with a £50 excess. Find the expected payout and comment.
> Expected payout = 0.05 × (600 − 50) = £27.50
> The premium is £60, more than double the expected payout
> It's only worth it if losing £600 would be a serious hardship
K: Use natural frequencies; compare expected cost with premiums; insure large, unaffordable losses; remember that independent events don't balance out.
!: Buying insurance for small, affordable losses where premiums far exceed expected payouts.
Q: Express a 0.4% risk as a natural frequency. | 4 in 1,000.
Q: Why are insurance premiums higher than expected payouts? | They cover the insurer's costs and profit.
SUM: Risk decisions weigh probability and cost.
SUM: Natural frequencies clarify risk.
SRC: Spiegelhalter D, The Art of Statistics: Learning from Data (Pelican 2019) | textbook | 2019 | https://www.penguin.co.uk/
SRC: Winton Centre for Risk and Evidence Communication, Communicating risk | guidance | 2022 | https://wintoncentre.maths.cam.ac.uk/
NUM1#maths-u29-27-q1@1: A £1,200 bike has a 10% chance of theft each year. Insurance has a £100 excess. Find the expected yearly payout, in pounds. | 110 | 0 | £ | 0.1 × (1,200 − 100) = £110.
M1#maths-u29-27-q2@1: Which is the clearest way to present a 0.2% risk to the public? | 2 in 1,000 people | 0.002 | 0.2% | One-fifth of a per cent | A relative risk of 1.2 | Natural frequencies are easiest to picture.
M3#maths-u29-27-q3@2: An extended warranty on a £300 washing machine costs £90 for 3 years. The chance of a repair in that time is 15%, and a repair costs £150. Is it good value on average? | No: the expected cost is £22.50, well below £90 | Yes: £90 is less than £300 | Yes: repairs are certain | No: repairs cost nothing | It's exactly fair | 0.15 × £150 = £22.50 expected; the warranty costs four times that.

## Estimation and Mental Maths
S: In everyday life, quick estimates check bills, budgets, tips and quantities on the spot. Rounding sensibly and a few mental strategies are enough to spot errors and make good decisions without a calculator.
O: Estimate shopping totals, tips and shared bills mentally
O: Check receipts and quotes for reasonableness
T: Rounding to friendly numbers | Choosing nearby values that are easy to work with, such as £2.99 → £3
T: Reasonableness check | Asking whether an answer is about the size you'd expect
H: Shopping and bills
- Round each price to the nearest 50p or £1 and add: £2.99 + £4.49 + £1.89 + £6.25 ≈ £3 + £4.50 + £2 + £6.25 = £15.75.
- Keep a running total as you shop.
- Splitting a bill: divide the total, then round up so the bill is covered.
H: Tips and percentages
- 10%: move the decimal point. 12.5% is 10% + a quarter of 10%.
- 15% = 10% + half of 10%.
- Service charges may already be included: check the bill.
H: Checking
- Does the receipt total match your estimate within a pound or two?
- Quotes: does £2,400 for painting one room sound right? Ask for a breakdown.
- Units: a 2-litre bottle can't contain 20 servings of 250 ml.
X: Four items cost £2.99, £4.49, £1.89 and £6.25. Estimate the total, then find the exact total and a 12.5% tip on a £64 meal.
> Estimate: 3 + 4.50 + 2 + 6.25 = £15.75; exact £15.62
> 10% of £64 = £6.40; 2.5% = £1.60
> Tip = £8.00
K: Round to friendly numbers, keep running totals, build percentages from 10%, and check totals and quotes against estimates.
!: Trusting a total without a quick estimate, so scanning errors go unnoticed.
Q: Find 15% of £40 mentally. | £6 (£4 + £2).
Q: Five people share a £87 bill. About how much each? | About £17.40, so £18 each covers it.
SUM: Estimates catch everyday errors.
SUM: Build percentages from 10%.
SRC: National Numeracy, Everyday maths: estimation | guidance | 2024 | https://www.nationalnumeracy.org.uk/
SRC: Money and Pensions Service, MoneyHelper: everyday money | guidance | 2025 | https://www.moneyhelper.org.uk/
NUM1#maths-u29-28-q1@1: A restaurant bill is £72 with a 12.5% service charge added. Find the total, in pounds. | 81 | 0 | £ | 12.5% of 72 is 9 (7.20 + 1.80), so the total is £81.
M1#maths-u29-28-q2@1: Which estimate is closest for £4.95 × 6? | £30 | £24 | £36 | £3 | £300 | Round £4.95 to £5: 5 × 6 = £30 (exact £29.70).
M2#maths-u29-28-q3@2: A receipt for 3 items around £2 each shows a total of £61.40. What's the most likely problem? | An item was scanned with a misplaced decimal point or wrong quantity | The prices are correct | VAT was added twice | It's a discount | Nothing: receipts are always right | Three items around £2 should total about £6, so the receipt needs checking.
`;
