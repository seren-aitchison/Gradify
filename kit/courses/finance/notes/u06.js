// FinanceGradify Management Accounting: Planning, Control and Decisions (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Relevant costing
LV: Intermediate · Application
S: Good decisions depend on the costs and revenues that change as a result of them. This lesson defines relevant costs, identifies irrelevant costs such as sunk and committed costs, and applies opportunity cost to a special order decision.
O: Define relevant costs and identify irrelevant costs
O: Apply opportunity cost and replacement cost in decisions
O: Evaluate a special order using relevant costing
PRE: Marginal costing
H: What makes a cost relevant?
P: A **relevant cost** is a **future**, **incremental cash flow** that arises as a direct result of the decision.
- **Sunk costs**: already spent, such as past research: irrelevant.
- **Committed costs**: future costs that cannot be avoided whatever is decided, such as a lease: irrelevant.
- **Notional costs**: accounting charges with no cash flow, such as depreciation or absorbed fixed overhead: irrelevant.
- **Opportunity costs**: the benefit forgone by using a resource for this purpose: relevant.
H: Materials and labour
- Materials in regular use: relevant cost is the **replacement cost**.
- Materials with no other use: relevant cost is the **scrap value** forgone (or zero).
- Labour with **spare capacity** that is paid anyway: relevant cost is **zero**.
- Labour diverted from other work: relevant cost includes the **lost contribution**.
X: A special order.
> A customer offers to buy 500 units at £30 each.
> Each unit needs material regularly used by the firm, bought last month at £8, now costing £10 to replace.
> Labour is idle and paid anyway; variable overhead is £4 per unit; absorbed fixed overhead is £6 per unit.
> Relevant cost per unit = £10 + £0 + £4 = £14; contribution = (30 − 14) × 500 = £8,000, so accept, other things being equal.
K: Relevant costs are future incremental cash flows caused by a decision; sunk, committed and notional costs are irrelevant, while opportunity costs and replacement costs are relevant.
!: Including absorbed fixed overheads in a one-off decision. If total fixed costs do not change, they are irrelevant.
EV: established | Relevant costing is the standard basis for short-term decision analysis.
EV: established | Qualitative factors, such as customer relationships and the effect on regular prices, should also be considered.
T: Relevant cost | A future, incremental cash flow arising from a decision
T: Sunk cost | A cost already incurred that cannot be recovered
T: Opportunity cost | The benefit forgone by choosing one option over the next best
SUM: Relevant costs are future, incremental and cash.
SUM: Ignore sunk, committed and notional costs.
SUM: Include opportunity and replacement costs.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: CIMA, CIMA Official Terminology, CIMA Publishing | secondary | 2005
Q: What is a sunk cost? | A cost already incurred that cannot be recovered, and so is irrelevant to decisions.
Q: What is the relevant cost of labour that is idle and paid anyway? | Zero.
M1#finance-u06-01-q1@1: Which cost is relevant to a decision? | A future cost that changes because of the decision | Research spending incurred last year | Depreciation on existing machinery | A lease payment that must be paid regardless | Only future incremental cash flows are relevant.
M2#finance-u06-01-q2@2: Material in stock cost £5 a kg; it is regularly used and now costs £7 to replace. What is its relevant cost? | £7 per kg | £5 per kg | £0 | £12 per kg | Using it means buying more at the replacement cost.
M3#finance-u06-01-q3@3: A special order's price exceeds relevant cost, but accepting it would cause regular customers to demand the same low price. What should managers do? | Weigh the long-term impact on regular prices alongside the short-term contribution | Accept, as only the order's contribution matters | Reject all special orders permanently | Ignore customers' reactions | Qualitative and longer-term effects can outweigh one-off gains.
NUM2#finance-u06-01-q4@3: A special order is for 500 units at £30. Relevant costs are £14 per unit. What is the contribution from the order, in £? | 8000 | 0 | £ | (30 − 14) × 500 = £8,000.
SA2#finance-u06-01-q5@2,3: Explain why absorbed fixed overheads are usually irrelevant in a special order decision. | Absorbed fixed overheads are an accounting allocation of costs that are incurred anyway, such as rent and salaries. Accepting a one-off order does not usually change these totals, so they are not incremental cash flows. Including them would overstate the cost of the order and might lead managers to reject profitable work. They become relevant only if the decision changes total fixed costs. | Allocation not incremental ; Totals unchanged ; Risk of wrong decision ; When they matter

## Cost–volume–profit analysis
LV: Intermediate · Application
S: Cost–volume–profit (CVP) analysis shows how profit changes with sales volume. This lesson calculates break-even points, target profit volumes, and break-even revenue using the contribution to sales ratio.
O: Calculate the break-even point in units and revenue
O: Calculate the sales needed to achieve a target profit
O: Explain the assumptions and limitations of CVP analysis
PRE: Marginal costing
H: Break-even
E: Break-even units = fixed costs ÷ contribution per unit
E: Break-even revenue = fixed costs ÷ C/S ratio
E: Units for target profit = (fixed costs + target profit) ÷ contribution per unit
X: CVP for a product.
> Selling price £50; variable cost £30; contribution £20; fixed costs £60,000.
> Break-even = 60,000 ÷ 20 = 3,000 units, or 3,000 × £50 = £150,000 revenue.
> C/S ratio = 20 ÷ 50 = 40%; break-even revenue = 60,000 ÷ 0.4 = £150,000, confirming the answer.
> For a target profit of £20,000: (60,000 + 20,000) ÷ 20 = 4,000 units.
H: Assumptions
- Selling price and variable cost per unit are constant.
- Fixed costs are constant within the relevant range.
- Production equals sales, or inventory changes are ignored.
- A single product, or a constant sales mix.
P: These assumptions make CVP a useful short-term planning tool, but results should be treated as approximations.
K: CVP analysis uses contribution to find break-even points, break-even revenue and sales needed for target profits, under assumptions of linear costs and revenues within a relevant range.
!: Using CVP far outside the relevant range. Prices, variable costs and fixed costs may change at very different volumes.
EV: established | CVP analysis is a standard short-term planning tool.
EV: established | Multi-product CVP requires assumptions about a constant sales mix.
T: Break-even point | The level of sales at which total revenue equals total costs
T: C/S ratio | Contribution as a proportion of sales revenue
T: Target profit | A planned level of profit used to calculate required sales
SUM: Break-even = fixed costs ÷ unit contribution.
SUM: Break-even revenue = fixed costs ÷ C/S ratio.
SUM: Add target profit to fixed costs for required sales.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: Horngren C. T., Datar S. M. and Rajan M. V., Cost Accounting: A Managerial Emphasis, 16th edition, Pearson | secondary | 2018
Q: How is the break-even point in units calculated? | Fixed costs divided by contribution per unit.
Q: How is break-even revenue calculated using the C/S ratio? | Fixed costs divided by the C/S ratio.
M1#finance-u06-02-q1@1: At the break-even point, what is profit? | Zero | Equal to fixed costs | Equal to total contribution | Maximum | Applying the standard result: Total revenue equals total costs.
M2#finance-u06-02-q2@2: Fixed costs are £45,000, price £25 and variable cost £10. What is the break-even point? | 3,000 units | 1,800 units | 4,500 units | 1,286 units | Applying the standard result: 45,000 ÷ 15 = 3,000 units.
M3#finance-u06-02-q3@3: Fixed costs rise by £10,000 while contribution per unit stays at £20. What happens to break-even? | It rises by 500 units | It falls by 500 units | It is unchanged | It rises by 10,000 units | 10,000 ÷ 20 = 500 extra units are needed.
NUM2#finance-u06-02-q4@2: Fixed costs are £60,000 and contribution per unit is £20. How many units are needed for a target profit of £20,000? | 4000 | 0 | units | (60,000 + 20,000) ÷ 20 = 4,000 units.
SA2#finance-u06-02-q5@3: Evaluate CVP analysis as a planning tool. | CVP is simple and shows clearly how volume, prices and costs affect profit, helping managers set targets, assess risk and test scenarios. However, it assumes linear costs and revenues, constant prices, fixed costs that do not change, and a constant sales mix, which may not hold, especially at very different volumes. It is best used for short-term planning within a relevant range. | Simplicity and uses ; Linearity assumptions ; Fixed costs and mix ; Relevant range

## Break-even charts and the margin of safety
LV: Intermediate · Application
S: Break-even charts show CVP relationships visually, and the margin of safety measures how far sales can fall before losses occur. This lesson covers break-even and profit–volume charts, the margin of safety and operating gearing.
O: Interpret break-even and profit–volume charts
O: Calculate the margin of safety in units, revenue and percentage
O: Explain operating gearing and its effect on risk
PRE: Cost–volume–profit analysis
H: Charts
- **Break-even chart**: plots total revenue and total cost against volume; they cross at break-even.
- **Contribution chart**: shows variable costs first, then fixed costs, so contribution is visible.
- **Profit–volume (P/V) chart**: plots profit against volume; the line crosses zero at break-even and starts at minus fixed costs.
H: Margin of safety
E: Margin of safety = budgeted sales − break-even sales :: often expressed as a percentage of budgeted sales
X: Calculating the margin of safety.
> Budgeted sales: 4,000 units; break-even: 3,000 units.
> Margin of safety = 4,000 − 3,000 = 1,000 units.
> As a percentage: 1,000 ÷ 4,000 × 100 = 25%.
> Sales could fall by a quarter before the business makes a loss.
H: Operating gearing
P: **Operating gearing** is the proportion of fixed to variable costs. Businesses with high fixed costs, such as airlines, have high operating gearing: profits rise sharply when sales grow above break-even but fall sharply when sales fall. Low-gearing businesses have more stable profits.
K: Break-even, contribution and P/V charts show CVP visually; the margin of safety measures how far sales can fall before losses; high operating gearing makes profits more sensitive to sales.
!: Treating a large margin of safety as guaranteeing profit. Budgeted sales may be optimistic, and costs may change.
EV: established | The margin of safety is a common measure of business risk in CVP analysis.
EV: established | High operating gearing increases the volatility of profit.
T: Margin of safety | The amount by which sales exceed break-even sales
T: Profit–volume chart | A chart plotting profit against sales volume
T: Operating gearing | The proportion of fixed costs in a firm's cost structure
SUM: Charts show where revenue meets cost.
SUM: Margin of safety = budget − break-even.
SUM: High fixed costs mean volatile profits.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: Horngren C. T., Datar S. M. and Rajan M. V., Cost Accounting: A Managerial Emphasis, 16th edition, Pearson | secondary | 2018
Q: What is the margin of safety? | The amount by which budgeted or actual sales exceed break-even sales.
Q: Where does the profit–volume line cross the horizontal axis? | At the break-even point.
M1#finance-u06-03-q1@1: On a profit–volume chart, where does the profit line start at zero sales? | At minus the fixed costs | At zero profit | At maximum profit | At the break-even revenue | With no sales, the loss equals fixed costs.
M2#finance-u06-03-q2@2: Budgeted sales are 10,000 units and break-even is 8,000 units. What is the margin of safety as a percentage? | 20% | 25% | 80% | 2% | Applying the standard result: 2,000 ÷ 10,000 = 20%.
M3#finance-u06-03-q3@3: An airline has high fixed costs. What happens to its profits when passenger numbers fall below break-even? | Losses grow rapidly, because most costs do not fall | Profits rise because costs fall | Profits stay stable | Fixed costs disappear | High operating gearing amplifies the effect of sales changes.
NUM2#finance-u06-03-q4@2: Budgeted sales are 4,000 units and break-even is 3,000 units. What is the margin of safety as a percentage of budgeted sales? | 25 | 0 | % | (4,000 − 3,000) ÷ 4,000 × 100 = 25%.
SA2#finance-u06-03-q5@2,3: Explain how operating gearing affects business risk. | A business with high fixed costs and low variable costs has high operating gearing. Each extra sale above break-even adds a large contribution, so profits grow quickly; but below break-even, costs do not fall much, so losses grow quickly. This makes profits volatile and the business riskier in downturns. Firms with low operating gearing have smaller swings. | Definition ; Upside ; Downside ; Risk

## Limiting factor analysis
LV: Intermediate · Application
S: When a resource is scarce, a business must decide how to use it to maximise profit. This lesson explains how to rank products by contribution per unit of limiting factor and build an optimal production plan.
O: Identify a limiting factor
O: Rank products by contribution per unit of the limiting factor
O: Prepare a production plan that maximises contribution
PRE: Cost–volume–profit analysis
H: The principle
P: A **limiting factor** (key factor) is a resource in short supply, such as labour hours, machine hours or materials, that stops the business meeting all demand. To maximise profit, rank products by **contribution per unit of the limiting factor**, not contribution per unit.
H: Method
- Check that the resource really limits production.
- Calculate contribution per unit and per unit of the limiting factor.
- Rank products.
- Allocate the scarce resource in rank order, up to each product's demand.
X: Three products with limited labour.
> X: contribution £20, 2 hours, so £10 per hour; demand 1,000 units (2,000 hours).
> Y: contribution £30, 5 hours, so £6 per hour; demand 600 units (3,000 hours).
> Z: contribution £24, 3 hours, so £8 per hour; demand 800 units (2,400 hours).
> With 6,000 hours: X uses 2,000, Z 2,400, leaving 1,600 for Y (320 units). Contribution = 20,000 + 19,200 + 9,600 = £48,800.
H: More than one limiting factor
P: When several resources are scarce, **linear programming** is used to find the optimal mix. With two products, a graphical method can be used.
K: When a resource is scarce, products are ranked by contribution per unit of the limiting factor and the resource is allocated in that order to maximise total contribution.
!: Ranking by contribution per unit. A product with high unit contribution may use so much of the scarce resource that it earns less per hour.
EV: established | Ranking by contribution per limiting factor maximises short-term contribution with one constraint.
EV: established | Qualitative factors, such as keeping customers who buy a full range, may justify a different mix.
T: Limiting factor | A scarce resource that restricts the volume of production
T: Contribution per limiting factor | Contribution earned per unit of the scarce resource
T: Linear programming | A mathematical method to optimise output with several constraints
SUM: Identify the scarce resource.
SUM: Rank by contribution per unit of it.
SUM: Allocate in rank order.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: CIMA, CIMA Official Terminology, CIMA Publishing | secondary | 2005
Q: What is a limiting factor? | A scarce resource that restricts the volume of production or sales.
Q: How should products be ranked when there is one limiting factor? | By contribution per unit of the limiting factor.
M1#finance-u06-04-q1@1: Which technique is used when there are several limiting factors? | Linear programming | Break-even analysis | Absorption costing | Process costing | Linear programming handles multiple constraints.
M2#finance-u06-04-q2@2: Product A earns £40 contribution using 8 machine hours; B earns £25 using 4 hours. Which should be prioritised if machine hours are scarce? | B, at £6.25 per hour | A, at £5 per hour | A, because its unit contribution is higher | Both equally | Contribution per scarce hour decides the ranking.
M3#finance-u06-04-q3@3: A firm ranks products by unit contribution when labour is scarce. What is the likely result? | Lower total contribution than ranking by contribution per hour | The maximum possible contribution | No effect on total contribution | Higher fixed costs | High unit contribution may hide poor use of the scarce resource.
NUM3#finance-u06-04-q4@2: With 6,000 labour hours, X (£10/hour, needs 2,000 hours), Z (£8/hour, 2,400 hours) and Y (£6/hour) are produced in rank order. How many labour hours remain for Y? | 1600 | 0 | hours | 6,000 − 2,000 − 2,400 = 1,600 hours.
SA2#finance-u06-04-q5@2,3: Explain why contribution per unit of the limiting factor is used to rank products. | When a resource is scarce, the goal is to earn as much contribution as possible from each unit of that resource. A product with a high contribution per unit may need a lot of the scarce resource, giving a low return per hour. Ranking by contribution per hour (or kg) ensures the scarce resource is used where it earns most, maximising total contribution. | Aim with scarce resource ; Unit contribution misleading ; Per-unit-of-resource ranking ; Maximises contribution

## Make-or-buy and other short-term decisions
LV: Intermediate · Application
S: Many decisions compare the relevant costs of alternatives. This lesson applies relevant costing to make-or-buy, shutting down a segment and further processing decisions, including opportunity costs.
O: Evaluate make-or-buy decisions using relevant costs
O: Assess whether to close a segment or product line
O: Decide whether to sell or process further
PRE: Relevant costing
H: Make or buy
P: Compare the **relevant cost of making** (variable costs plus any avoidable fixed costs and opportunity costs) with the **purchase price**. Unavoidable fixed overheads are irrelevant.
X: A component decision.
> Variable cost to make: materials £5, labour £4, variable overhead £3, so £12; absorbed fixed overhead £6 (unavoidable).
> An outside supplier offers it at £15.
> Making costs £12 relevant versus £15 to buy, saving £3 per unit.
> If buying would free capacity earning £20,000 on other work over 10,000 units (£2 per unit), making still costs £12 + £2 = £14, less than £15: keep making.
H: Closing a segment
P: Close a division or product line only if the **contribution lost** is less than the **fixed costs saved**. Shared fixed costs that would continue should be ignored. Consider knock-on effects on sales of other products.
H: Further processing
P: For joint products, process further only if **incremental revenue exceeds incremental processing costs**. Joint costs incurred before the split-off point are irrelevant.
K: Make-or-buy compares relevant making costs, including opportunity costs, with the purchase price; segments should close only if lost contribution is below fixed costs saved; further processing is worthwhile if extra revenue exceeds extra cost.
!: Closing a product line because it shows a loss after allocated fixed costs. If those costs continue, closing may reduce total profit.
EV: established | Relevant costing is the standard basis for make-or-buy and closure decisions.
EV: established | Qualitative factors, such as supplier reliability, quality and control, influence outsourcing decisions.
T: Make-or-buy decision | Choosing whether to produce internally or purchase from outside
T: Avoidable cost | A cost that would be saved if an activity stopped
T: Split-off point | The point at which joint products become separately identifiable
SUM: Compare relevant cost of making with buying.
SUM: Close only if fixed costs saved exceed lost contribution.
SUM: Process further if extra revenue exceeds extra cost.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: Horngren C. T., Datar S. M. and Rajan M. V., Cost Accounting: A Managerial Emphasis, 16th edition, Pearson | secondary | 2018
Q: When should a product line be closed? | When the fixed costs saved exceed the contribution lost.
Q: Are joint costs relevant to further processing decisions? | No; they are incurred before the split-off point.
M1#finance-u06-05-q1@1: In a make-or-buy decision, which cost is irrelevant? | Unavoidable absorbed fixed overhead | Variable materials cost | Variable labour cost | Opportunity cost of capacity | Costs that continue either way do not affect the choice.
M2#finance-u06-05-q2@2: A product can be sold at split-off for £10 or processed further for £3 and sold for £14. Should it be processed? | Yes, as extra revenue of £4 exceeds extra cost of £3 | No, as processing costs money | No, as joint costs are too high | Yes, because £14 is above £10 | Compare incremental revenue with incremental cost.
M3#finance-u06-05-q3@3: A division earns £40,000 contribution but is charged £60,000 of head office costs that would continue if it closed. What happens to group profit if it closes? | It falls by £40,000 | It rises by £20,000 | It is unchanged | It rises by £60,000 | Only the contribution is lost; the shared costs remain.
NUM2#finance-u06-05-q4@2: The relevant cost of making a component is £12 plus a £2 per unit opportunity cost. A supplier charges £15. By how much per unit is making cheaper, in £? | 1 | 0 | £ | Making costs 12 + 2 = £14, versus £15 to buy, a saving of £1.
SA2#finance-u06-05-q5@3: Discuss the qualitative factors in a decision to outsource a component. | Beyond cost, firms should consider the supplier's quality and reliability, the risk of supply disruption, loss of control and know-how, effects on staff and morale, confidentiality of designs, and the flexibility to change volumes. Long-term dependence may weaken bargaining power. These factors may outweigh a modest cost saving. | Quality and reliability ; Control and know-how ; People ; Strategic dependence

## Pricing decisions
LV: Intermediate · Application
S: Setting prices combines cost information with understanding of demand. This lesson covers cost-plus methods, the demand curve and the profit-maximising price where marginal revenue equals marginal cost.
O: Calculate prices using full cost-plus and marginal cost-plus methods
O: Use a linear demand curve to find the profit-maximising price
O: Evaluate cost-based and market-based pricing
PRE: Cost–volume–profit analysis
H: Cost-plus pricing
- **Full cost-plus**: add a mark-up to full cost (including fixed overheads); ensures costs are covered if volumes are met.
- **Marginal cost-plus**: add a mark-up to variable cost; simpler, highlights contribution.
P: Cost-plus is easy but ignores what customers will pay and competitors' prices.
H: Profit maximisation
E: Linear demand: P = a − bQ; marginal revenue MR = a − 2bQ :: profit is maximised where MR = MC
X: Finding the optimum price.
> Demand: P = 100 − 0.01Q; marginal cost £40 per unit.
> MR = 100 − 0.02Q; set MR = MC: 100 − 0.02Q = 40, so Q = 3,000 units.
> Price = 100 − 0.01 × 3,000 = £70.
> Contribution = (70 − 40) × 3,000 = £90,000.
H: In practice
P: Firms rarely know their demand curve precisely, so they combine cost information with market research, competitor prices and strategy, such as penetration or skimming. Price discrimination charges different prices to different segments, such as off-peak fares.
K: Cost-plus pricing adds a mark-up to full or marginal cost; economic theory sets price where marginal revenue equals marginal cost; practical pricing combines costs, demand, competition and strategy.
!: Setting prices by cost alone. Customers judge value, not the supplier's costs.
EV: established | Profit is maximised where marginal revenue equals marginal cost.
EV: established | Surveys find that many firms use cost-plus pricing as a starting point, adjusted for market conditions.
T: Cost-plus pricing | Setting price by adding a mark-up to cost
T: Marginal revenue | The change in total revenue from selling one more unit
T: Price discrimination | Charging different prices to different customer groups for the same product
SUM: Cost-plus: simple but ignores demand.
SUM: Maximise profit where MR = MC.
SUM: Combine costs with market factors.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: Horngren C. T., Datar S. M. and Rajan M. V., Cost Accounting: A Managerial Emphasis, 16th edition, Pearson | secondary | 2018
Q: At what output is profit maximised? | Where marginal revenue equals marginal cost.
Q: What is a weakness of cost-plus pricing? | It ignores demand and competitors' prices.
M1#finance-u06-06-q1@1: Which pricing method adds a mark-up to variable cost? | Marginal cost-plus pricing | Full cost-plus pricing | Penetration pricing | Price skimming | Marginal cost-plus starts from variable cost.
M2#finance-u06-06-q2@2: Full cost is £40 per unit and the mark-up is 25%. What is the price? | £50 | £45 | £65 | £30 | Applying the standard result: 40 × 1.25 = £50.
M3#finance-u06-06-q3@3: Demand is P = 100 − 0.01Q and marginal cost is £40. What is the profit-maximising price? | £70 | £40 | £100 | £50 | MR = 100 − 0.02Q = 40 gives Q = 3,000; P = 100 − 30 = £70.
NUM3#finance-u06-06-q4@2: Demand is P = 100 − 0.01Q and marginal cost is £40. What is the profit-maximising output, in units? | 3000 | 0 | units | MR = 100 − 0.02Q = 40, so Q = 60 ÷ 0.02 = 3,000 units.
SA2#finance-u06-06-q5@3: Evaluate cost-plus pricing. | Cost-plus pricing is simple, transparent and ensures that costs are covered if expected volumes are achieved, which helps in contract pricing. But it ignores customers' willingness to pay and competitors' prices, so it may set prices too high to sell or too low to capture value. Full cost-plus also depends on volume assumptions for fixed overhead. It works best as a starting point adjusted for market conditions. | Strengths ; Ignores demand ; Volume dependence ; Starting point

## Decisions under risk and uncertainty
LV: Intermediate · Analysis
S: Most business decisions involve uncertain outcomes. This lesson covers expected values, decision trees, decision rules under uncertainty (maximax, maximin and minimax regret), sensitivity analysis and the value of information.
O: Calculate expected values and use decision trees
O: Apply maximax, maximin and minimax regret rules
O: Explain sensitivity analysis and the value of perfect information
PRE: Relevant costing
H: Risk and uncertainty
P: **Risk** means outcomes can be assigned probabilities; **uncertainty** means probabilities are unknown. Different tools suit each.
H: Expected value
E: EV = Σ (probability × outcome)
X: Expected value of a project.
> Outcomes: £50,000 profit (probability 0.3), £20,000 (0.5), −£10,000 (0.2).
> EV = 0.3 × 50,000 + 0.5 × 20,000 + 0.2 × (−10,000).
> EV = 15,000 + 10,000 − 2,000 = £23,000.
> EV is a long-run average; a single project still has a 20% chance of a £10,000 loss.
H: Rules under uncertainty
- **Maximax**: choose the option with the best possible outcome (optimistic).
- **Maximin**: choose the option with the best worst outcome (pessimistic, risk-averse).
- **Minimax regret**: choose the option that minimises the maximum regret, the gap between each outcome and the best outcome in that state.
H: Other tools
- **Decision trees** map sequences of decisions and chance events.
- **Sensitivity analysis** tests how much a variable must change before the decision changes.
- **Value of perfect information** = EV with perfect information − EV without it; the most worth paying for research.
K: Expected values and decision trees handle risk; maximax, maximin and minimax regret handle uncertainty; sensitivity analysis and the value of information show how robust a decision is.
!: Treating expected value as the outcome that will occur. It is a weighted average; the actual result will be one of the possible outcomes.
EV: established | Expected value is suitable for repeated decisions, less so for one-off decisions with large risks.
EV: contested | Subjective probability estimates can give a false impression of precision.
T: Expected value | The probability-weighted average of possible outcomes
T: Maximin | A decision rule choosing the option with the best worst-case outcome
T: Sensitivity analysis | Testing how changes in key variables affect a decision
SUM: EV = Σ probability × outcome.
SUM: Maximax, maximin and minimax regret under uncertainty.
SUM: Test robustness with sensitivity analysis.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: Moore P. G. and Thomas H., The Anatomy of Decisions, 2nd edition, Penguin | secondary | 1988
Q: What is the difference between risk and uncertainty? | Risk has outcomes with known probabilities; uncertainty does not.
Q: What does the maximin rule choose? | The option with the best worst-case outcome.
M1#finance-u06-07-q1@1: Which decision rule suits an optimistic decision-maker? | Maximax | Maximin | Minimax regret | Expected value only | Maximax chooses the best possible outcome.
M2#finance-u06-07-q2@2: An option has outcomes of £100 (probability 0.6) and −£50 (0.4). What is its expected value? | £40 | £50 | £60 | £100 | Applying the standard result: 60 − 20 = £40.
M3#finance-u06-07-q3@3: A one-off project has a high EV but a 10% chance of bankrupting the firm. What should managers consider? | Their attitude to risk and the severity of the worst outcome, not just EV | Only the expected value | Only the best outcome | Nothing, as EV guarantees the result | EV ignores the spread of outcomes and catastrophic risk.
NUM2#finance-u06-07-q4@2: Outcomes are £50,000 (p = 0.3), £20,000 (p = 0.5) and −£10,000 (p = 0.2). What is the expected value, in £? | 23000 | 0 | £ | EV = 15,000 + 10,000 − 2,000 = £23,000.
SA2#finance-u06-07-q5@3: Evaluate expected value as a basis for decisions. | Expected value combines outcomes and probabilities into one figure, useful for comparing options and for repeated decisions where averages will be achieved. But it ignores the spread of outcomes and risk attitude, relies on probability estimates that may be subjective, and can mislead for one-off decisions with extreme outcomes. It should be supported by sensitivity analysis and consideration of worst cases. | Usefulness ; Ignores risk ; Subjective probabilities ; One-off decisions

## Budgeting: purposes and process
LV: Intermediate · Foundation
S: A budget is a quantified plan for a future period. This lesson explains the purposes of budgeting, the budget-setting process, the principal budget factor and the master budget.
O: Explain the purposes of budgeting
O: Describe the stages of the budget-setting process
O: Identify the principal budget factor and the components of a master budget
PRE: The role of management accounting
H: Purposes
- **Planning**: translating strategy into short-term targets.
- **Coordination**: aligning departments, such as sales and production.
- **Communication**: telling managers what is expected.
- **Control**: comparing actual results with budget.
- **Motivation**: setting targets that encourage performance.
- **Authorisation**: giving managers authority to spend.
- **Evaluation**: assessing managers' performance.
H: The process
- A **budget committee** coordinates, often with a budget manual and timetable.
- Identify the **principal budget factor** (limiting factor), usually sales demand.
- Prepare the **sales budget** first, then functional budgets.
- Review, negotiate and approve; combine into the **master budget**.
- Monitor actual against budget throughout the year.
H: The master budget
P: The master budget brings together the **budgeted income statement**, **budgeted statement of financial position** and **cash budget**, supported by functional budgets such as production, materials, labour and overheads.
X: Identifying the principal budget factor.
> A bakery can sell 20,000 loaves a week, but its ovens can bake only 15,000.
> The principal budget factor is oven capacity, not sales.
> The production budget is set at 15,000 loaves, and the sales budget follows.
> If the bakery invests in another oven, sales demand may become the limiting factor.
K: Budgets plan, coordinate, communicate, control, motivate, authorise and evaluate; the process starts with the principal budget factor, usually sales, and ends in a master budget of income statement, financial position and cash.
!: Preparing all functional budgets before identifying the principal budget factor. The limiting factor determines the starting point.
EV: established | Budgeting serves multiple purposes that can conflict, such as planning and motivation.
EV: contested | Some argue traditional annual budgets are too rigid for fast-changing environments.
T: Budget | A quantified plan for a future period
T: Principal budget factor | The factor that limits the organisation's activities, usually sales demand
T: Master budget | The combined budgeted income statement, financial position and cash budget
SUM: Budgets serve many purposes.
SUM: Start with the principal budget factor.
SUM: Combine into the master budget.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: CIMA, CIMA Official Terminology, CIMA Publishing | secondary | 2005
Q: What is the principal budget factor? | The factor that limits activity, usually sales demand, which determines the starting point of budgeting.
Q: What three statements make up the master budget? | The budgeted income statement, budgeted statement of financial position and cash budget.
M1#finance-u06-08-q1@1: Which budget is usually prepared first? | The sales budget | The cash budget | The capital expenditure budget | The master budget | Sales demand is usually the principal budget factor.
M2#finance-u06-08-q2@2: Which purpose of budgeting involves comparing actual results with plans? | Control | Authorisation | Coordination | Communication | Control compares actual with budget and acts on differences.
M3#finance-u06-08-q3@3: A budget set to motivate staff is very demanding, but the same figures are used for planning cash needs. What problem may arise? | Cash planning may be unrealistic if stretch targets are missed | Motivation will always fall | There is no conflict between purposes | The budget will be illegal | Purposes such as motivation and planning can conflict.
SEQ1#finance-u06-08-q4@2: Order the stages of budget preparation. | Identify the principal budget factor ; Prepare the sales budget ; Prepare functional budgets ; Combine into the master budget | Budgets flow from the limiting factor to the master budget.
SA2#finance-u06-08-q5@2,3: Explain why the purposes of budgeting may conflict. | A budget used for motivation may be set as a challenging target, while a budget used for planning should be realistic to avoid shortfalls in cash or capacity. Using budgets to evaluate managers may encourage them to build in slack, which undermines accurate planning. Organisations may need separate targets or flexible approaches to balance these purposes. | Motivation versus planning ; Evaluation and slack ; Consequences ; Solutions

## Functional budgets
LV: Intermediate · Application
S: Functional budgets translate the sales forecast into plans for production, materials and labour. This lesson works through the sales, production, materials usage, materials purchases and labour budgets.
O: Prepare a production budget from sales and inventory targets
O: Prepare materials usage and purchases budgets
O: Prepare a labour budget
PRE: Budgeting: purposes and process
H: The sequence
E: Production = sales + closing finished goods − opening finished goods
E: Materials purchases = materials usage + closing materials − opening materials
X: Budgets for a product.
> Sales budget: 10,000 units. Opening finished goods: 1,500; required closing: 2,000.
> Production = 10,000 + 2,000 − 1,500 = 10,500 units.
> Each unit needs 3 kg of material: usage = 31,500 kg. Opening material 4,000 kg; closing 5,000 kg; purchases = 31,500 + 5,000 − 4,000 = 32,500 kg, at £2 = £65,000.
> Each unit needs 0.5 labour hours: 5,250 hours at £14 = £73,500.
H: Other functional budgets
- **Overhead budgets**: production, administration and selling overheads.
- **Capital expenditure budget**: planned investment in non-current assets.
P: Functional budgets feed into the budgeted income statement and the cash budget.
K: The sales budget drives the production budget, adjusted for finished goods inventory; production drives materials usage and, with materials inventory, purchases; production also drives the labour budget.
!: Setting production equal to sales when inventory levels change. Production must allow for changes in opening and closing inventory.
EV: established | Functional budgets follow a standard logical sequence from sales.
EV: established | Budgeting software and spreadsheets now automate much of this process.
T: Production budget | Planned production, adjusted for changes in finished goods inventory
T: Materials purchases budget | Planned materials purchases, adjusted for changes in materials inventory
T: Labour budget | Planned labour hours and cost for the budgeted production
SUM: Sales → production → materials → labour.
SUM: Adjust for opening and closing inventory.
SUM: Functional budgets feed the master budget.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: Horngren C. T., Datar S. M. and Rajan M. V., Cost Accounting: A Managerial Emphasis, 16th edition, Pearson | secondary | 2018
Q: How is the production budget calculated? | Sales plus closing finished goods inventory minus opening finished goods inventory.
Q: How is the materials purchases budget calculated? | Materials usage plus closing materials inventory minus opening materials inventory.
M1#finance-u06-09-q1@1: Which budget follows directly from the sales budget? | The production budget | The cash budget | The capital expenditure budget | The master budget | Production depends on sales and inventory targets.
M2#finance-u06-09-q2@2: Sales are 8,000 units, opening inventory 1,000 and closing inventory 600. What is production? | 7,600 units | 8,400 units | 9,000 units | 8,000 units | Applying the standard result: 8,000 + 600 − 1,000 = 7,600.
M3#finance-u06-09-q3@3: A firm plans to raise its closing finished goods inventory. What happens to its production budget? | Production must exceed sales to build inventory | Production must be less than sales | Production must equal sales | Inventory has no effect on production | Extra closing inventory requires more output.
NUM2#finance-u06-09-q4@2: Materials usage is 31,500 kg, opening materials 4,000 kg and closing materials 5,000 kg. What are materials purchases, in kg? | 32500 | 0 | kg | 31,500 + 5,000 − 4,000 = 32,500 kg.
SA2#finance-u06-09-q5@2,3: Explain the links between functional budgets. | The sales budget sets expected sales volume. The production budget converts this into units to make, adjusted for planned changes in finished goods inventory. The production budget determines materials usage and labour hours, and materials usage with inventory targets gives purchases. These feed the overhead, income statement and cash budgets, so an error in the sales forecast flows through all of them. | Sales to production ; Production to materials and labour ; Purchases ; Knock-on effects

## Cash budgets
LV: Intermediate · Application
S: A cash budget forecasts cash receipts and payments to ensure an organisation can pay its bills. This lesson explains timing of receipts and payments, non-cash items, and how to respond to forecast shortfalls or surpluses.
O: Prepare a cash budget allowing for credit terms
O: Distinguish cash flows from accounting profit
O: Recommend actions in response to forecast cash shortages or surpluses
PRE: Functional budgets
H: Structure
- **Receipts**: cash sales, receipts from credit customers, loans, share issues, asset sales.
- **Payments**: suppliers, wages, overheads, tax, capital expenditure, loan repayments, dividends.
- **Net cash flow** for each period, then opening and closing balances.
H: Timing and non-cash items
P: Cash budgets record when cash moves, not when sales or costs are recognised. **Depreciation** is excluded, as it is not a cash flow. Credit sales are received after the credit period.
X: Receipts with credit sales.
> Sales: January £40,000, February £50,000, March £60,000.
> 20% are cash sales; 80% are on credit, received the following month.
> March receipts = 20% × 60,000 + 80% × 50,000 = 12,000 + 40,000 = £52,000.
> Profitable growth can still strain cash, because cash from rising sales arrives later.
H: Managing cash
- **Shortfall**: arrange an overdraft or loan, chase debtors, delay non-essential spending, negotiate supplier terms.
- **Surplus**: repay debt, invest short-term, or fund investment.
K: Cash budgets forecast receipts and payments by period, allowing for credit timing and excluding non-cash items such as depreciation, so managers can plan finance for shortfalls and use surpluses well.
!: Including depreciation as a cash payment. Depreciation reduces profit but involves no cash outflow.
EV: established | Cash flow problems are a major cause of business failure, even among profitable firms.
EV: established | Rolling cash forecasts are widely used to manage liquidity.
T: Cash budget | A forecast of cash receipts and payments over a period
T: Overtrading | Growing faster than working capital and cash can support
T: Credit period | The time allowed for a customer to pay
SUM: Record cash when it moves.
SUM: Exclude depreciation.
SUM: Plan finance for shortfalls.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: Atrill P. and McLaney E., Management Accounting for Decision Makers, 10th edition, Pearson | secondary | 2021
Q: Why is depreciation excluded from a cash budget? | It is not a cash flow.
Q: What is overtrading? | Growing faster than working capital and cash can support.
M1#finance-u06-10-q1@1: Which item appears in a cash budget? | Payments to suppliers | Depreciation | Accruals adjustments | Provisions for doubtful debts | Applying the standard result: Only actual cash flows are included.
M2#finance-u06-10-q2@2: Sales are £30,000 in May and £40,000 in June; 25% cash, 75% received next month. What are June receipts? | £32,500 | £40,000 | £30,000 | £37,500 | Applying the standard result: 10,000 + 22,500 = £32,500.
M3#finance-u06-10-q3@3: A cash budget shows a deficit in three months' time. What is the best response? | Arrange finance in advance and review credit control and spending | Wait until the deficit occurs, then act | Ignore it, as profits are rising | Increase depreciation charges | Early planning allows cheaper, smoother financing.
NUM2#finance-u06-10-q4@2: March sales are £60,000 and February sales £50,000. 20% are cash; 80% are received the following month. What are March cash receipts, in £? | 52000 | 0 | £ | 0.2 × 60,000 + 0.8 × 50,000 = 12,000 + 40,000 = £52,000.
SA2#finance-u06-10-q5@2,3: Explain why a profitable business can run out of cash. | Profit is recognised when sales are made, but cash may arrive much later if customers have credit terms. Growth requires paying for materials, staff and inventory before receipts come in. Capital spending, loan repayments and tax use cash without affecting profit in the same way. So rapid growth or poor credit control can leave a profitable business unable to pay its bills. | Timing of receipts ; Working capital needs ; Non-profit cash flows ; Overtrading

## Fixed and flexible budgets
LV: Intermediate · Application
S: A fixed budget is set for one level of activity; a flexible budget adjusts for actual activity. This lesson shows why flexible budgets give fairer comparisons and how to prepare them.
O: Distinguish fixed and flexible budgets
O: Prepare a flexed budget for an actual level of activity
O: Explain why flexed budgets give more meaningful variances
PRE: Cost behaviour
PRE: Budgeting: purposes and process
H: Fixed and flexible
- A **fixed budget** is prepared for one planned level of activity and not adjusted.
- A **flexible budget** recognises cost behaviour and is **flexed** to the actual level of activity, so variable costs are adjusted while fixed costs stay the same.
X: Comparing fixed and flexed budgets.
> The budget for 10,000 units: materials £50,000 (£5 a unit), labour £40,000 (£4 a unit), fixed costs £30,000; total £120,000.
> Actual output was 12,000 units, with actual costs of £141,000.
> Against the fixed budget, costs appear £21,000 over budget.
> Flexed budget = 12,000 × £9 + £30,000 = £138,000, so the true overspend is only £3,000.
H: Why flex?
P: Comparing actual costs at 12,000 units with a budget for 10,000 units mixes the effect of **volume** with the effect of **efficiency and prices**. Flexing removes the volume effect, so remaining variances reflect controllable performance.
P: Semi-variable costs must be split into fixed and variable parts, for example with the high-low method, before they can be flexed. Revenue can be flexed too, giving a flexed profit to compare with actual profit.
K: Fixed budgets are set for one activity level; flexible budgets adjust variable costs to actual activity, giving fair comparisons that separate volume effects from spending and efficiency.
!: Judging managers against a fixed budget when activity changes. A busier department will naturally spend more on variable costs.
EV: established | Flexible budgeting is standard practice for cost control.
EV: established | Flexing requires reliable classification of costs as fixed or variable.
T: Fixed budget | A budget prepared for one level of activity and not adjusted
T: Flexible budget | A budget adjusted for the actual level of activity
T: Flexed budget | The flexible budget calculated at actual activity
SUM: Fixed budgets do not change with activity.
SUM: Flexed budgets adjust variable costs.
SUM: Flexing separates volume from efficiency.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: Horngren C. T., Datar S. M. and Rajan M. V., Cost Accounting: A Managerial Emphasis, 16th edition, Pearson | secondary | 2018
Q: What is a flexible budget? | A budget that adjusts for the actual level of activity, recognising cost behaviour.
Q: Why is a flexed budget a fairer basis for control? | It removes the effect of volume changes, so variances reflect spending and efficiency.
M1#finance-u06-11-q1@1: Which budget is adjusted for the actual level of activity? | A flexible budget | A fixed budget | An incremental budget | A cash budget | Flexing adjusts variable costs to actual output.
M2#finance-u06-11-q2@2: Variable cost is £6 per unit and fixed cost £20,000. What is the flexed budget for 5,000 units? | £50,000 | £30,000 | £20,000 | £26,000 | Applying the standard result: 5,000 × 6 + 20,000 = £50,000.
M3#finance-u06-11-q3@3: A department produced 20% more than planned and overspent its fixed budget. What should be done before criticising its manager? | Compare actual costs with a flexed budget at actual output | Cut its budget by 20% | Ignore the volume increase | Reward the overspend | The overspend may simply reflect higher activity.
NUM2#finance-u06-11-q4@2: Variable costs are £9 per unit and fixed costs are £30,000. What is the flexed budget for 12,000 units, in £? | 138000 | 0 | £ | 12,000 × 9 + 30,000 = £138,000.
SA2#finance-u06-11-q5@2,3: Explain why flexible budgets are more useful for control than fixed budgets. | A fixed budget compares actual costs with costs planned for a different level of activity, so differences mix volume effects with genuine overspending or savings. A flexible budget adjusts variable costs to actual activity, while fixed costs stay the same, so remaining variances show how well costs were controlled. This gives fairer evaluation of managers and better information for corrective action. | Fixed budget problem ; Flexing ; Meaningful variances ; Fair evaluation

## Approaches to budgeting
LV: Intermediate · Evaluation
S: Organisations prepare budgets in different ways, each with strengths and weaknesses. This lesson compares incremental, zero-based, rolling and activity-based budgeting, top-down and participative approaches, and the "beyond budgeting" movement.
O: Compare incremental and zero-based budgeting
O: Explain rolling and activity-based budgets
O: Evaluate participative budgeting and beyond budgeting
PRE: Budgeting: purposes and process
H: Methods
- **Incremental budgeting**: last year's budget plus or minus adjustments; quick but can carry forward inefficiencies.
- **Zero-based budgeting (ZBB)**: every activity is justified from zero each period. Developed by Peter Pyhrr at Texas Instruments in the late 1960s; thorough but time-consuming.
- **Rolling budgets**: continuously updated, adding a new period as one ends, such as a 12-month rolling forecast updated quarterly.
- **Activity-based budgeting**: budgets based on the activities and cost drivers needed to deliver planned output.
H: Who sets the budget?
- **Top-down (imposed)**: set by senior management; quick, aligned with strategy, but may demotivate.
- **Participative (bottom-up)**: managers help set budgets; better information and commitment, but risk of **budget slack**.
H: Beyond budgeting
P: Jeremy Hope and Robin Fraser (2003) argued that traditional annual budgets encourage gaming and rigidity, and proposed replacing them with relative targets, rolling forecasts and devolved decision-making, as practised by firms such as Svenska Handelsbanken.
X: Applying zero-based budgeting.
> A council's library service is asked to justify every activity from zero.
> Managers list "decision packages": core lending, children's events, mobile library, extended hours.
> Each package is ranked by cost and benefit.
> Lower-ranked packages may be cut, freeing resources for higher priorities.
K: Incremental budgeting is quick but perpetuates past patterns, ZBB questions every cost, rolling and activity-based budgets improve relevance, participation improves commitment but risks slack, and beyond budgeting rejects fixed annual targets.
!: Assuming ZBB is always better. It is costly and time-consuming, so many organisations apply it selectively to discretionary spending.
EV: established | Zero-based budgeting is effective for reviewing discretionary costs.
EV: contested | Whether organisations should abandon traditional budgeting, as beyond budgeting proposes, is debated.
T: Incremental budgeting | Basing a budget on the previous period with adjustments
T: Zero-based budgeting | Justifying every activity and cost from zero each period
T: Rolling budget | A budget continuously updated by adding a new period as one ends
SUM: Incremental is quick; ZBB is thorough.
SUM: Rolling and activity-based budgets improve relevance.
SUM: Participation helps but risks slack.
SRC: Pyhrr P. A., "Zero-base budgeting", Harvard Business Review 48(6), 111–121 | primary | 1970
SRC: Hope J. and Fraser R., Beyond Budgeting: How Managers Can Break Free from the Annual Performance Trap, Harvard Business School Press | secondary | 2003
Q: What is zero-based budgeting? | A method requiring every activity and cost to be justified from zero each period.
Q: What is budget slack? | Deliberately overestimating costs or underestimating revenue to make a budget easier to achieve.
M1#finance-u06-12-q1@1: Which method bases next year's budget on this year's plus adjustments? | Incremental budgeting | Zero-based budgeting | Activity-based budgeting | Beyond budgeting | Incremental budgeting builds on the previous period.
M2#finance-u06-12-q2@2: Which approach continuously adds a new period as one ends? | Rolling budgeting | Incremental budgeting | Fixed budgeting | Zero-based budgeting | Rolling budgets stay current over a fixed horizon.
M3#finance-u06-12-q3@3: Managers who set their own budgets consistently beat them by wide margins. What is the likely problem? | Budget slack built into participative budgets | Budgets that are far too demanding | Use of zero-based budgeting | Too little participation | Applying the standard result: Easy targets suggest slack.
MATCH1#finance-u06-12-q4@1: Match each budgeting approach to its feature. | Incremental = Adjusts last year's figures ; Zero-based = Justifies every cost from zero ; Rolling = Continuously updated ; Activity-based = Built on cost drivers | Each approach builds budgets differently.
SA2#finance-u06-12-q5@3: Evaluate zero-based budgeting. | ZBB forces managers to justify every activity, exposing waste and outdated spending and helping allocate resources to priorities, particularly discretionary costs. But it is time-consuming and costly, needs skills to evaluate decision packages, may focus on short-term savings, and can create anxiety. Many organisations use it periodically or selectively. | Benefits ; Costs ; Risks ; Selective use

## Behavioural aspects of budgeting
LV: Intermediate · Evaluation
S: Budgets affect how people behave as well as recording plans. This lesson examines budget difficulty and motivation, participation, budgetary slack, gaming and dysfunctional behaviour.
O: Explain how budget difficulty affects motivation and performance
O: Describe dysfunctional behaviours caused by budgets
O: Evaluate ways to reduce dysfunctional budget behaviour
PRE: Approaches to budgeting
H: Targets and motivation
P: Geert Hofstede's study The Game of Budget Control (1968) found that budgets motivate best when they are **challenging but achievable**: easy targets encourage complacency, while targets seen as impossible demotivate. This fits goal-setting theory, which links specific, difficult goals with higher performance if people accept them.
H: Dysfunctional behaviour
- **Budget slack**: padding costs or understating revenue.
- **Spend it or lose it**: spending remaining budget at year-end to avoid cuts.
- **Short-termism**: cutting training or maintenance to hit this year's target.
- **Gaming and manipulation**: shifting sales or costs between periods.
- **Lack of goal congruence**: departmental targets conflict with organisational goals.
X: Year-end spending.
> A department has £20,000 left with a month to go.
> Managers fear next year's budget will be cut if they underspend.
> They buy equipment that is not urgently needed.
> Allowing carry-forward of savings or rewarding efficiency can reduce this behaviour.
H: Reducing problems
- Involve managers in setting realistic targets.
- Use flexible budgets and controllable costs for evaluation.
- Combine financial with non-financial measures.
- Build a culture where honest forecasts are valued.
K: Challenging but accepted targets motivate best; budgets can cause slack, year-end spending, short-termism and gaming; participation, fair evaluation, broader measures and culture reduce these effects.
!: Using budgets mainly to punish managers. Fear encourages slack, gaming and concealment of problems.
EV: established | Targets that are challenging but achievable tend to motivate better than very easy or very hard ones.
EV: contested | How much participation reduces dysfunctional behaviour, rather than increasing slack, is debated.
T: Goal congruence | Alignment between individual or departmental goals and organisational goals
T: Short-termism | Focusing on immediate results at the expense of long-term performance
T: Goal-setting theory | The theory that specific, challenging goals improve performance when accepted
SUM: Challenging but achievable targets work best.
SUM: Budgets can cause gaming and short-termism.
SUM: Fair evaluation and culture help.
SRC: Hofstede G. H., The Game of Budget Control, Van Gorcum | primary | 1968
SRC: Locke E. A. and Latham G. P., "Building a practically useful theory of goal setting and task motivation", American Psychologist 57(9), 705–717 | primary | 2002
Q: What level of budget difficulty tends to motivate best? | Challenging but achievable.
Q: What is "spend it or lose it" behaviour? | Spending remaining budget at year-end to avoid future cuts.
M1#finance-u06-13-q1@1: Which researcher studied budgets in The Game of Budget Control? | Geert Hofstede | Peter Pyhrr | Robert Kaplan | Jeremy Hope | Hofstede's 1968 study examined budget motivation.
M2#finance-u06-13-q2@2: A manager cuts the training budget to meet this year's profit target. What is this an example of? | Short-termism | Goal congruence | Zero-based budgeting | Budget slack | Long-term capability is sacrificed for short-term results.
M3#finance-u06-13-q3@3: Managers are judged only on meeting cost budgets, so they refuse orders that would raise costs but increase group profit. What has failed? | Goal congruence between departmental and organisational objectives | Budget slack | Flexible budgeting | Cash forecasting | Narrow targets can conflict with wider goals.
TF1#finance-u06-13-q4@1: Very easy budget targets tend to maximise managers' performance. | false | Easy targets encourage complacency; challenging but achievable targets motivate more.
SA2#finance-u06-13-q5@3: Evaluate ways to reduce dysfunctional behaviour caused by budgets. | Involving managers in setting targets builds commitment and uses their knowledge but must be balanced against slack. Evaluating managers on controllable costs and flexed budgets is fairer. Including non-financial measures discourages short-termism. Allowing savings to be carried forward reduces year-end spending. A culture that values honest forecasting is essential. No single measure removes all gaming. | Participation ; Fair evaluation ; Broader measures ; Culture

## Standard costing
LV: Intermediate · Application
S: Standard costing sets predetermined costs for each unit, providing a benchmark for control. This lesson explains types of standard, how a standard cost card is built, and the uses and limitations of standard costing.
O: Explain the purpose of standard costing
O: Distinguish ideal, attainable, current and basic standards
O: Prepare a standard cost card
PRE: Absorption costing
PRE: Fixed and flexible budgets
H: What standards are
P: A **standard cost** is a carefully predetermined cost per unit under efficient conditions, built from standard quantities and prices of materials, labour and overheads. Comparing actual with standard costs produces **variances** that direct management attention: **management by exception**.
H: Types of standard
- **Ideal**: perfect conditions, no waste; rarely achieved and can demotivate.
- **Attainable**: efficient but realistic, allowing normal losses; most widely used.
- **Current**: based on current conditions, including existing inefficiencies.
- **Basic**: unchanged over long periods, used to show trends.
X: A standard cost card.
> Direct material: 4 kg at £3 per kg = £12.
> Direct labour: 2 hours at £15 per hour = £30.
> Variable overhead: 2 hours at £5 per hour = £10; fixed overhead: 2 hours at £10 per hour = £20.
> Standard cost per unit = 12 + 30 + 10 + 20 = £72. With a standard price of £100, standard profit is £28.
H: Limitations
P: Standard costing suits repetitive production with stable processes. In fast-changing, customised or service environments, standards date quickly, and a focus on cost variances may encourage behaviour that harms quality or flexibility.
K: Standard costs are predetermined unit costs that provide benchmarks; attainable standards are most common; variances from standard highlight exceptions, though standards suit stable, repetitive environments best.
!: Using ideal standards to set staff targets. Unattainable standards produce constant adverse variances and demotivate.
EV: established | Standard costing remains widely used in manufacturing.
EV: contested | Its relevance in modern environments with lean production and frequent change is debated.
T: Standard cost | A predetermined cost per unit under efficient conditions
T: Attainable standard | A standard that is challenging but achievable with efficient working
T: Management by exception | Focusing attention on significant differences from plan
SUM: Standards are benchmarks for control.
SUM: Attainable standards are most common.
SUM: Best for stable, repetitive production.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: CIMA, CIMA Official Terminology, CIMA Publishing | secondary | 2005
Q: What is an attainable standard? | A standard that is challenging but achievable with efficient working, allowing normal losses.
Q: What is management by exception? | Focusing attention on significant differences between actual and planned results.
M1#finance-u06-14-q1@1: Which type of standard assumes perfect conditions with no waste? | Ideal standard | Attainable standard | Current standard | Basic standard | Applying the standard result: Ideal standards are rarely achieved.
M2#finance-u06-14-q2@2: Material is 3 kg at £4 per kg and labour 1.5 hours at £12. What is the standard prime cost per unit? | £30 | £18 | £12 | £24 | Applying the standard result: 12 + 18 = £30.
M3#finance-u06-14-q3@3: A company making bespoke products changes designs every month. Why may standard costing be less useful? | Standards quickly become out of date for customised, changing work | Standards are illegal for bespoke products | Variances cannot be calculated at all | Standard costing only works in services | Stable, repetitive production suits standards best.
NUM2#finance-u06-14-q4@2: A standard cost card has materials £12, labour £30, variable overhead £10 and fixed overhead £20. What is the standard cost per unit, in £? | 72 | 0 | £ | Standard cost = 12 + 30 + 10 + 20 = £72.
SA2#finance-u06-14-q5@2,3: Explain why attainable standards are usually preferred to ideal standards. | Ideal standards assume perfect efficiency, with no breakdowns, waste or idle time, so they are almost never achieved, producing constant adverse variances that demotivate staff and obscure real problems. Attainable standards allow for normal losses while still requiring efficient working, so they are challenging but achievable, motivate better and make variances meaningful. | Ideal standard problems ; Demotivation ; Attainable standard features ; Meaningful variances

## Material and labour variances
LV: Intermediate · Application
S: Variance analysis splits the difference between standard and actual cost into causes. This lesson calculates material price and usage variances and labour rate, idle time and efficiency variances, and interprets them.
O: Calculate material price and usage variances
O: Calculate labour rate, idle time and efficiency variances
O: Interpret variances and their possible causes
PRE: Standard costing
H: Material variances
E: Price variance = (SP − AP) × AQ purchased; Usage variance = (SQ − AQ) × SP :: SQ is the standard quantity for actual output
H: Labour variances
E: Rate variance = (SR − AR) × hours paid; Idle time variance = idle hours × SR; Efficiency variance = (SH − hours worked) × SR
X: Variances for 1,000 units.
> Standard: 4 kg at £3; actual: 4,200 kg bought and used for £13,020 (£3.10 per kg).
> Material price = (3.00 − 3.10) × 4,200 = £420 adverse; usage = (4,000 − 4,200) × 3 = £600 adverse.
> Standard labour: 2 hours at £15; actual: 2,100 hours paid for £30,450 (£14.50), 2,050 hours worked.
> Labour rate = (15 − 14.50) × 2,100 = £1,050 favourable; idle time = 50 × 15 = £750 adverse; efficiency = (2,000 − 2,050) × 15 = £750 adverse.
H: Interpreting variances
- **Material price adverse**: higher market prices, a new supplier, rush orders.
- **Material usage adverse**: poor-quality materials, waste, untrained staff.
- **Labour rate favourable**: cheaper, less skilled staff, which may explain adverse usage and efficiency.
- **Idle time adverse**: machine breakdowns, material shortages.
P: Variances are often **interdependent**: buying cheaper material may create a favourable price variance but an adverse usage variance.
K: Material price and usage variances and labour rate, idle time and efficiency variances explain differences from standard; they should be interpreted together, since causes are often linked.
!: Judging each variance in isolation. A favourable price variance may cause adverse usage or efficiency variances elsewhere.
EV: established | Variance analysis is the standard method for investigating differences from standard cost.
EV: established | Only significant variances are usually investigated, weighing cost against benefit.
T: Price variance | The difference due to paying a different price from standard
T: Usage variance | The difference due to using a different quantity of material from standard
T: Efficiency variance | The difference due to taking a different number of hours from standard
SUM: Price × quantity splits material variance.
SUM: Rate, idle time and efficiency for labour.
SUM: Interpret variances together.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: Horngren C. T., Datar S. M. and Rajan M. V., Cost Accounting: A Managerial Emphasis, 16th edition, Pearson | secondary | 2018
Q: How is the material usage variance calculated? | (Standard quantity for actual output − actual quantity) × standard price.
Q: How is the labour efficiency variance calculated? | (Standard hours for actual output − actual hours worked) × standard rate.
M1#finance-u06-15-q1@1: What does an adverse material usage variance mean? | More material was used than standard for the actual output | Material cost less than standard | Fewer units were produced | Labour worked faster | Applying the standard result: Using more than standard increases cost.
M2#finance-u06-15-q2@2: Standard price is £5 per kg; 2,000 kg were bought for £9,600. What is the price variance? | £400 favourable | £400 adverse | £600 favourable | £9,600 adverse | 2,000 × 5 = 10,000; 10,000 − 9,600 = £400 favourable.
M3#finance-u06-15-q3@3: A firm hires cheaper, less experienced staff. Which combination of variances is likely? | Favourable labour rate, adverse labour efficiency | Adverse labour rate, favourable efficiency | Favourable rate and favourable efficiency | No change in any variance | Applying the standard result: Cheaper staff may work more slowly.
NUM3#finance-u06-15-q4@2: Standard is 4 kg at £3 for each of 1,000 units; actual usage is 4,200 kg. What is the material usage variance, in £ (enter a negative number for adverse)? | -600 | 0 | £ | (4,000 − 4,200) × 3 = −£600, so £600 adverse.
SA2#finance-u06-15-q5@2,3: Explain why variances should be interpreted together. | Causes are often linked: buying cheaper, lower-quality material gives a favourable price variance but may cause more waste, an adverse usage variance, and slower work, an adverse labour efficiency variance. Hiring cheaper staff gives a favourable rate but may reduce efficiency. Looking at one variance alone could reward a manager for decisions that raise total cost. | Linked causes ; Material example ; Labour example ; Avoiding wrong conclusions

## Overhead and sales variances
LV: Intermediate · Application
S: Overhead and sales variances complete the picture of performance against standard. This lesson calculates variable overhead expenditure and efficiency variances, fixed overhead expenditure and volume variances, and sales price and volume variances.
O: Calculate variable overhead variances
O: Calculate fixed overhead expenditure and volume variances
O: Calculate sales price and sales volume variances
PRE: Material and labour variances
H: Variable overhead
E: Expenditure = (hours worked × standard rate) − actual cost; Efficiency = (standard hours − hours worked) × standard rate
H: Fixed overhead (absorption costing)
E: Expenditure = budgeted fixed overhead − actual fixed overhead; Volume = (actual units − budgeted units) × standard fixed overhead per unit
H: Sales
E: Sales price = (actual price − standard price) × actual units; Sales volume = (actual units − budgeted units) × standard profit per unit
X: Continuing the example (standard cost £72, price £100, budget 1,100 units, actual 1,000).
> Variable overhead: 2,050 hours worked; actual cost £10,400; expenditure = 2,050 × 5 − 10,400 = £150 adverse; efficiency = (2,000 − 2,050) × 5 = £250 adverse.
> Fixed overhead: budget 1,100 × £20 = £22,000; actual £21,500; expenditure £500 favourable; volume = (1,000 − 1,100) × 20 = £2,000 adverse.
> Sales price: actual £98; (98 − 100) × 1,000 = £2,000 adverse.
> Sales volume: (1,000 − 1,100) × £28 = £2,800 adverse.
H: Interpretation
P: An adverse fixed overhead **volume** variance means fewer units absorbed the fixed costs than planned; it does not mean more was spent. Sales price and volume variances are often linked: cutting price may raise volume.
K: Variable overhead variances mirror labour efficiency; fixed overhead expenditure compares budget with actual spending and the volume variance reflects under-absorption from lower output; sales price and volume variances explain revenue and profit differences.
!: Treating an adverse fixed overhead volume variance as overspending. It reflects lower output than budgeted, not higher cost.
EV: established | Fixed overhead volume variances arise only under absorption costing.
EV: established | Under marginal costing, sales volume variances use standard contribution rather than standard profit.
T: Fixed overhead volume variance | The under- or over-absorption of fixed overhead due to output differing from budget
T: Sales price variance | The difference in revenue due to selling at a different price from standard
T: Sales volume variance | The difference in profit due to selling a different quantity from budget
SUM: Variable overhead: expenditure and efficiency.
SUM: Fixed overhead: expenditure and volume.
SUM: Sales: price and volume.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: CIMA, CIMA Official Terminology, CIMA Publishing | secondary | 2005
Q: How is the sales price variance calculated? | (Actual price − standard price) × actual units sold.
Q: What does an adverse fixed overhead volume variance indicate? | Output was below budget, so fixed overheads were under-absorbed.
M1#finance-u06-16-q1@1: Which variance compares budgeted and actual fixed overhead spending? | Fixed overhead expenditure variance | Fixed overhead volume variance | Sales volume variance | Labour rate variance | Expenditure compares planned and actual spending.
M2#finance-u06-16-q2@2: Budgeted sales were 500 units at a standard profit of £10; actual sales were 450. What is the sales volume variance? | £500 adverse | £500 favourable | £4,500 adverse | £50 adverse | Applying the standard result: (450 − 500) × 10 = −£500.
M3#finance-u06-16-q3@3: A firm cuts prices and sells more units than budgeted. What pattern of sales variances is likely? | Adverse sales price, favourable sales volume | Favourable price, adverse volume | Both adverse | Both zero | Lower price reduces revenue per unit but raises volume.
NUM3#finance-u06-16-q4@2: Actual price is £98 against a standard of £100, and 1,000 units are sold. What is the sales price variance, in £ (negative for adverse)? | -2000 | 0 | £ | (98 − 100) × 1,000 = −£2,000, so £2,000 adverse.
SA2#finance-u06-16-q5@2,3: Explain the difference between the fixed overhead expenditure and volume variances. | The expenditure variance compares budgeted fixed overhead with actual fixed overhead spent, showing whether spending was controlled. The volume variance arises because fixed overheads are absorbed per unit: if output differs from budget, more or less overhead is absorbed than budgeted. It reflects output levels, not spending. Together they explain total under- or over-absorption. | Expenditure meaning ; Volume meaning ; Causes ; Total under- or over-absorption

## The operating statement
LV: Intermediate · Analysis
S: The operating statement reconciles budgeted profit with actual profit using variances. This lesson builds a complete operating statement and shows how managers use it to understand performance.
O: Prepare an operating statement reconciling budgeted and actual profit
O: Check the statement against actual results
O: Use the statement to identify priorities for investigation
PRE: Overhead and sales variances
H: Structure
- Start with **budgeted profit**.
- Adjust for the **sales volume variance**, giving standard profit on actual sales.
- Adjust for the **sales price variance**.
- Adjust for each **cost variance** (favourable added, adverse deducted).
- End with **actual profit**.
X: Operating statement for the example.
> Budgeted profit: 1,100 × £28 = £30,800; sales volume £2,800 A gives £28,000; sales price £2,000 A gives £26,000.
> Cost variances: material price £420 A, usage £600 A, labour rate £1,050 F, idle time £750 A, efficiency £750 A, variable overhead expenditure £150 A and efficiency £250 A, fixed overhead expenditure £500 F and volume £2,000 A.
> Adverse total 4,920, favourable total 1,550: net £3,370 adverse.
> Actual profit = 26,000 − 3,370 = £22,630.
H: Checking the result
P: Actual revenue = 1,000 × £98 = £98,000. Actual costs = materials 13,020 + labour 30,450 + variable overhead 10,400 + fixed overhead 21,500 = £75,370. Actual profit = 98,000 − 75,370 = £22,630, matching the statement.
H: Using the statement
P: The largest variances, here sales volume, fixed overhead volume and sales price, point to the main issue: lower sales than budgeted at lower prices. Managers should investigate the market and pricing before focusing on smaller cost variances.
K: The operating statement reconciles budgeted to actual profit through sales and cost variances; it should agree with actual results and helps managers focus on the most significant causes.
!: Investigating every small variance. Focus on significant ones whose causes can be controlled.
EV: established | Operating statements are a standard reporting format in standard costing systems.
EV: established | Significance thresholds help decide which variances to investigate.
T: Operating statement | A report reconciling budgeted profit with actual profit using variances
T: Favourable variance | A difference that increases profit compared with standard
T: Adverse variance | A difference that reduces profit compared with standard
SUM: Budgeted profit adjusted by variances gives actual profit.
SUM: Check against actual results.
SUM: Focus on significant variances.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: Horngren C. T., Datar S. M. and Rajan M. V., Cost Accounting: A Managerial Emphasis, 16th edition, Pearson | secondary | 2018
Q: What does an operating statement reconcile? | Budgeted profit with actual profit.
Q: Which variance is applied first to budgeted profit? | The sales volume variance.
M1#finance-u06-17-q1@1: What does an operating statement end with? | Actual profit | Budgeted profit | Standard cost per unit | Total revenue | Applying the standard result: It reconciles budget to actual profit.
M2#finance-u06-17-q2@2: Budgeted profit is £50,000, net adverse variances are £8,000 and net favourable variances £3,000. What is actual profit? | £45,000 | £55,000 | £61,000 | £39,000 | Applying the standard result: 50,000 − 8,000 + 3,000 = £45,000.
M3#finance-u06-17-q3@3: The largest variances relate to lower sales volumes and prices. Where should managers focus first? | Market conditions and pricing | Minor material usage variances | The design of the statement | Idle time of a few hours | Applying the standard result: The biggest effects come from sales.
NUM3#finance-u06-17-q4@2: Standard profit on actual sales is £26,000 and net cost variances are £3,370 adverse. What is actual profit, in £? | 22630 | 0 | £ | Actual profit = 26,000 − 3,370 = £22,630.
SA2#finance-u06-17-q5@3: Explain how managers should use an operating statement. | They should identify which variances are significant in size and controllable, rather than investigating every small difference. They should look for links between variances, such as cheaper materials causing adverse usage. Variances should prompt questions about causes, leading to corrective action or revised standards, not automatic blame. The statement also shows whether problems lie in sales, production or overheads. | Significance ; Links between variances ; Investigate causes ; Locate problems

## Financial performance indicators
LV: Intermediate · Application
S: Financial performance indicators measure how well an organisation or division is doing. This lesson covers profitability, liquidity and efficiency measures for performance management, and the limits of financial measures alone.
O: Calculate key profitability, liquidity and efficiency indicators
O: Analyse how ROCE breaks down into margin and asset turnover
O: Explain the limitations of financial performance indicators
PRE: Interpreting Financial Statements and Group Accounts
H: Profitability
- **Return on capital employed (ROCE)** = profit before interest and tax ÷ capital employed.
- **Operating profit margin** = operating profit ÷ revenue.
- **Gross profit margin** = gross profit ÷ revenue.
H: Liquidity and efficiency
- **Current ratio** and **acid test** for short-term liquidity.
- **Asset turnover** = revenue ÷ capital employed.
- **Receivables days**, **payables days** and **inventory days**.
H: The ROCE pyramid
E: ROCE = operating margin × asset turnover
X: Breaking down ROCE.
> A division has revenue £3,000,000, operating profit £300,000 and capital employed £2,000,000.
> Operating margin = 300,000 ÷ 3,000,000 = 10%; asset turnover = 3,000,000 ÷ 2,000,000 = 1.5.
> ROCE = 10% × 1.5 = 15%, confirmed by 300,000 ÷ 2,000,000 = 15%.
> To improve ROCE, managers can raise margins or use assets more intensively.
H: Limitations
- Focus on the **short term** and past results.
- Can be **manipulated**, for example by delaying maintenance.
- Do not capture **quality, customer satisfaction or innovation**.
P: This is why many organisations add non-financial measures, as in the balanced scorecard.
K: Profitability, liquidity and efficiency indicators measure financial performance; ROCE combines margin and asset turnover; but financial measures are short-term and incomplete, so they are combined with non-financial indicators.
!: Judging a division only on ROCE. Old, depreciated assets can make ROCE look high even when performance is poor.
EV: established | ROCE and margins are widely used performance indicators.
EV: established | Over-reliance on short-term financial measures can encourage short-termism.
T: ROCE | Profit before interest and tax divided by capital employed
T: Asset turnover | Revenue divided by capital employed
T: Operating margin | Operating profit divided by revenue
SUM: ROCE = margin × asset turnover.
SUM: Liquidity and efficiency matter too.
SUM: Financial measures are incomplete.
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
SRC: Atrill P. and McLaney E., Management Accounting for Decision Makers, 10th edition, Pearson | secondary | 2021
Q: How is ROCE linked to margin and asset turnover? | ROCE equals operating margin multiplied by asset turnover.
Q: Give one limitation of financial performance indicators. | They are short-term, can be manipulated and ignore non-financial factors such as quality.
M1#finance-u06-18-q1@1: Which ratio measures short-term liquidity? | Current ratio | ROCE | Asset turnover | Gross margin | The current ratio compares current assets with current liabilities.
M2#finance-u06-18-q2@2: Operating margin is 8% and asset turnover is 2. What is ROCE? | 16% | 10% | 4% | 6% | Applying the standard result: 8% × 2 = 16%.
M3#finance-u06-18-q3@3: A division with old, fully depreciated assets reports a high ROCE. Why might this mislead? | Low capital employed inflates ROCE without better performance | Old assets always improve real efficiency | ROCE ignores capital employed | Depreciation increases ROCE in every case | A small asset base makes returns look higher.
NUM2#finance-u06-18-q4@2: A division has operating profit of £300,000 and capital employed of £2,000,000. What is its ROCE, in %? | 15 | 0 | % | ROCE = 300,000 ÷ 2,000,000 × 100 = 15%.
SA2#finance-u06-18-q5@2,3: Explain how a division could improve its ROCE. | ROCE equals operating margin times asset turnover. The division could raise margins by increasing prices, cutting costs or improving its product mix. It could raise asset turnover by generating more sales from the same assets, or by disposing of underused assets and reducing inventory and receivables. Managers must avoid harmful shortcuts such as cutting maintenance. | Margin improvements ; Asset turnover improvements ; Working capital ; Avoiding short-termism

## The balanced scorecard
LV: Intermediate · Evaluation
S: The balanced scorecard measures performance from financial and non-financial perspectives linked to strategy. This lesson explains its four perspectives, strategy maps, and how to choose measures.
O: Describe the four perspectives of the balanced scorecard
O: Select appropriate measures for each perspective
O: Evaluate the balanced scorecard as a performance management tool
PRE: Financial performance indicators
H: Four perspectives
P: Robert Kaplan and David Norton (1992) proposed the **balanced scorecard** to complement financial measures with drivers of future performance:
- **Financial**: how do we look to shareholders? (ROCE, revenue growth).
- **Customer**: how do customers see us? (satisfaction, retention, market share).
- **Internal business process**: what must we excel at? (quality, cycle time, productivity).
- **Learning and growth**: can we continue to improve and create value? (staff skills, training, innovation).
H: Strategy maps
P: Kaplan and Norton later developed **strategy maps** showing cause-and-effect links: better staff skills improve processes, which raise customer satisfaction, which drives financial results.
X: A scorecard for a budget hotel chain.
> Financial: revenue per available room; operating margin.
> Customer: online review scores; repeat booking rate.
> Internal process: average check-in time; room cleaning time; maintenance faults per room.
> Learning and growth: staff training hours; staff turnover. Each measure links to the strategy of low cost with reliable quality.
H: Strengths and limits
- **Strengths**: links measures to strategy, balances short and long term, includes non-financial drivers.
- **Limits**: choosing too many measures, difficulty measuring some areas, assumed cause-and-effect links that may not hold, and potential conflicts between measures.
K: The balanced scorecard measures performance across financial, customer, internal process and learning and growth perspectives, linked by strategy maps; it broadens performance management but needs careful choice of measures.
!: Adding dozens of measures to a scorecard. Too many measures dilute focus; a few key indicators per perspective work better.
EV: established | The balanced scorecard is widely used in private and public sector organisations.
EV: contested | Evidence that the scorecard's assumed cause-and-effect links hold in practice is mixed.
T: Balanced scorecard | A performance framework with financial, customer, internal process and learning perspectives
T: Strategy map | A diagram showing cause-and-effect links among strategic objectives
T: Lead indicator | A measure that predicts future performance
SUM: Four perspectives linked to strategy.
SUM: Strategy maps show cause and effect.
SUM: Keep measures focused.
SRC: Kaplan R. S. and Norton D. P., "The balanced scorecard: measures that drive performance", Harvard Business Review 70(1), 71–79 | primary | 1992
SRC: Kaplan R. S. and Norton D. P., Strategy Maps: Converting Intangible Assets into Tangible Outcomes, Harvard Business School Press | secondary | 2004
Q: What are the four perspectives of the balanced scorecard? | Financial, customer, internal business process, and learning and growth.
Q: What is a strategy map? | A diagram showing cause-and-effect links among strategic objectives across the scorecard.
M1#finance-u06-19-q1@1: Which perspective includes staff training and innovation? | Learning and growth | Financial | Customer | Internal business process | It covers the capabilities needed for future improvement.
M2#finance-u06-19-q2@2: Which measure belongs to the customer perspective? | Customer retention rate | Return on capital employed | Machine downtime | Staff training hours | Retention shows how customers view the firm.
M3#finance-u06-19-q3@3: A hospital adds 60 measures to its scorecard. What is the main risk? | Loss of focus on the few measures that matter most | Too little information for managers | It becomes a purely financial report | Staff will ignore finance | Applying the standard result: Too many measures dilute attention.
MATCH1#finance-u06-19-q4@1: Match each measure to its perspective. | Operating margin = Financial ; Customer satisfaction = Customer ; Defect rate = Internal business process ; Staff skills = Learning and growth | Each perspective has its own measures.
SA2#finance-u06-19-q5@3: Evaluate the balanced scorecard as a performance management tool. | It links performance measures to strategy, includes non-financial drivers of future results and balances short- and long-term goals, reducing over-reliance on profit. But choosing the right measures is hard, some areas are difficult to quantify, assumed causal links may not hold, and too many or conflicting measures can confuse. It works best with a clear strategy and a few well-chosen measures. | Strategic links ; Balance ; Measurement challenges ; Conditions for success

## Divisional performance and transfer pricing
LV: Intermediate · Analysis
S: Large organisations are divided into divisions whose performance must be measured fairly. This lesson compares return on investment and residual income, explains goal congruence, and examines transfer pricing.
O: Calculate and compare ROI and residual income
O: Explain how performance measures affect goal congruence
O: Determine minimum and maximum transfer prices
PRE: Financial performance indicators
H: ROI and residual income
E: ROI = divisional profit ÷ capital employed; Residual income (RI) = divisional profit − (capital employed × cost of capital)
X: A new investment decision.
> A division earns £180,000 on capital of £1,200,000: ROI = 15%; with a cost of capital of 12%, RI = 180,000 − 144,000 = £36,000.
> A project needs £200,000 and earns £26,000 a year (13%).
> New ROI = 206,000 ÷ 1,400,000 = 14.7%, so a manager judged on ROI may reject it.
> New RI rises by 26,000 − 24,000 = £2,000, so RI encourages acceptance, which benefits the group.
H: Goal congruence
P: ROI can discourage projects that earn above the cost of capital but below current ROI, harming group performance. RI avoids this but favours large divisions. **Economic value added (EVA)** is a refined version of residual income.
H: Transfer pricing
P: When divisions trade with each other, the **transfer price** affects each division's profit but not group profit directly. It should encourage decisions that benefit the group and preserve divisional autonomy.
- **Minimum** (selling division) = marginal cost + opportunity cost.
- **Maximum** (buying division) = the lower of the external purchase price and the net marginal revenue it earns.
- Methods: market price, cost-based (variable or full cost plus), negotiated, dual pricing.
P: For multinational groups, tax authorities require transfer prices to follow the **arm's length principle** in the OECD Transfer Pricing Guidelines, to prevent profit shifting.
K: ROI is a percentage that can discourage worthwhile projects; residual income measures absolute surplus over the cost of capital and improves goal congruence; transfer prices should lie between the seller's marginal plus opportunity cost and the buyer's alternative price.
!: Assuming the transfer price changes group profit. It reallocates profit between divisions, but can distort their decisions and so affect group profit indirectly.
EV: established | Residual income avoids ROI's tendency to reject projects earning above the cost of capital.
EV: established | International transfer pricing is regulated through the arm's length principle.
T: Residual income | Divisional profit minus a charge for capital employed
T: Transfer price | The price charged for goods or services traded between divisions
T: Goal congruence | Alignment between divisional decisions and group objectives
SUM: ROI is relative; RI is absolute.
SUM: RI improves goal congruence.
SUM: Transfer prices lie between minimum and maximum limits.
SRC: OECD, OECD Transfer Pricing Guidelines for Multinational Enterprises and Tax Administrations | guidance | 2022
SRC: Drury C., Management and Cost Accounting, 10th edition, Cengage | secondary | 2018
Q: How is residual income calculated? | Divisional profit minus capital employed multiplied by the cost of capital.
Q: What is the minimum transfer price for the selling division? | Marginal cost plus opportunity cost.
M1#finance-u06-20-q1@1: What does ROI measure? | Divisional profit as a percentage of capital employed | Profit after a capital charge in pounds | Total group revenue | The cost of capital | Applying the standard result: ROI is a percentage return.
M2#finance-u06-20-q2@2: A division earns £90,000 on capital of £600,000 with a 10% cost of capital. What is its residual income? | £30,000 | £60,000 | £90,000 | £15,000 | Applying the standard result: 90,000 − 60,000 = £30,000.
M3#finance-u06-20-q3@3: A selling division has spare capacity and a variable cost of £30 per unit. What is its minimum transfer price? | £30, as there is no opportunity cost | £50, the external market price | £80, full cost plus profit | £0, as transfers are free | With spare capacity, no outside sales are lost.
NUM3#finance-u06-20-q4@2: A project needs £200,000 of capital and earns £26,000 a year; the cost of capital is 12%. By how much does residual income change, in £? | 2000 | 0 | £ | Change in RI = 26,000 − 200,000 × 12% = 26,000 − 24,000 = £2,000.
SA2#finance-u06-20-q5@3: Compare ROI and residual income as divisional performance measures. | ROI is a percentage, easy to understand and compare across divisions of different sizes, but a manager may reject projects earning above the cost of capital if they lower the current ROI, harming the group. Residual income deducts a capital charge, so any project earning above the cost of capital increases it, improving goal congruence. But RI is an absolute figure that favours larger divisions, and both rely on accounting profit and asset values. | ROI strengths ; ROI weakness ; RI strengths ; RI weaknesses
`;
