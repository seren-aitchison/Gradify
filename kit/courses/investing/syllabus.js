// InvestorGradify Investing: the full curriculum, 12 schools, modelled on the topic areas of the CISI Fundamentals of
// Financial Services and Investment Operations Certificate and the CFA Institute Investment Foundations programme,
// arranged for UK beginners and growing investors. Each topic is taught as one lesson, grouped into modules ("> "
// lines) and stages (TRACKS). Lesson ids are permanent (ids.js, written by node scripts/new-course.mjs lock investing):
// never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Money Foundations
> Your financial base
* Saving and investing: what is the difference?
* Budgeting and cash flow
* The emergency fund
* Debt before investing
* Protecting your finances: insurance and resilience
> The maths of money
* Interest rates: AER, APR and the base rate
* Simple and compound interest
* Doubling time and the rule of 72
* Inflation and real returns
* The time value of money
* Present value and discounting
> Goals, time and risk
* Setting financial goals
* Time horizon and liquidity
* Attitude to risk and capacity for loss
* Cash savings accounts
* Investing, speculation and gambling
2. How Financial Markets Work
> The financial system
* The role of the financial system
* Savers, borrowers and financial intermediaries
* Banks and the Bank of England
* Interest rates and monetary policy
> Markets and trading
* Primary and secondary markets
* Stock exchanges: the LSE, AIM and global markets
* How a trade works: orders, bid and offer
* Brokers, market makers and investment platforms
* Clearing, settlement and custody
* Liquidity and price discovery
> Indices and the economy
* Stock market indices
* The economic cycle and markets
* Inflation, growth and asset prices
* Currencies and exchange rates
> Market history
* Bull and bear markets
* Bubbles and crashes
3. Asset Classes
> Cash and bonds
* Cash as an asset class
* What a bond is
* Gilts
* Corporate bonds and credit ratings
* Bond prices and yields
* Duration and interest-rate risk
* Index-linked bonds
> Shares
* What a share is
* Ordinary and preference shares
* Dividends and capital growth
* Shareholder rights and corporate actions
> Property and alternatives
* Property as an investment
* Real estate investment trusts (REITs)
* Commodities and gold
* Alternative investments: private equity and hedge funds
* Crypto-assets
* Derivatives: an introduction
4. Risk and Return
> Measuring return
* Holding period return
* Arithmetic and geometric average returns
* Total return and reinvested income
* Nominal and real returns in practice
> Measuring risk
* Volatility and standard deviation
* Drawdowns and recovery
* Sequence of returns risk
* Types of investment risk
> The trade-off
* The risk–return trade-off
* The equity risk premium
* The long-run evidence: shares, bonds and cash
* Risk-adjusted return: the Sharpe ratio
* The range of outcomes and probability
* Survivorship bias in performance data
5. Diversification and Portfolio Theory
> Diversification
* Why diversification works
* Correlation between assets
* Specific and systematic risk
* How many holdings are enough?
* Home bias and global diversification
> Portfolio theory
* Modern portfolio theory
* The efficient frontier
* The capital asset pricing model (CAPM)
* Beta
* Factor investing
> Asset allocation
* Strategic asset allocation
* Tactical asset allocation
* Rebalancing
* Lifestyling and glide paths
* Multi-asset funds and model portfolios
6. Valuation
> Principles
* Price and value
* Discounted cash flow valuation
* The dividend discount model
* The Gordon growth model
* The required return and the cost of equity
> Multiples
* Earnings per share
* The price-to-earnings ratio
* Dividend yield and dividend cover
* Price-to-book
* Enterprise value and EV/EBITDA
> Markets and styles
* Valuing a bond
* Valuing the whole market: CAPE
* Growth and value investing
* The limits of valuation
7. Interpreting Financial Statements and Group Accounts
> Ratio analysis
* Why analyse financial statements?
* Profitability ratios
* Liquidity ratios
* Efficiency ratios and the working capital cycle
* Gearing and investor ratios
* Interpreting ratios in context
* Limitations of ratio analysis
* Analysing cash flows
* Performance in not-for-profit organisations
> Group accounts
* Groups and control
* Goodwill on acquisition
* The consolidated statement of financial position
* Intra-group trading and unrealised profit
* The consolidated statement of profit or loss
* Associates and joint arrangements
> Quality of reporting
* Creative accounting and earnings management
* Narrative reporting and the strategic report
8. Funds, Index Investing and Costs
> Pooled investments
* Why pool investments?
* Unit trusts and OEICs
* Investment trusts
* Exchange-traded funds
* Fund factsheets and key information documents
> Active and passive
* Active fund management
* Index tracking funds
* The efficient market hypothesis
* Tracking error and replication methods
* The evidence on active and passive funds
> Costs
* Ongoing charges and platform fees
* How fees compound
* Dealing costs, spreads and stamp duty
* Accumulation and income units
* Choosing a platform
9. Behavioural Finance
> Biases
* Rational investors and their limits
* Loss aversion and prospect theory
* Overconfidence
* Anchoring and investment decisions
* Herding
* Recency and availability in markets
* The disposition effect
* Mental accounting
* Confirmation bias
> Markets and behaviour
* Investor psychology in bubbles
* Market timing
* News, noise and social media
> Better habits
* Pound-cost averaging and automatic investing
* Rules, checklists and investment journals
10. UK Wrappers, Pensions and Tax
> Tax on investments
* How investments are taxed in the UK
* Income tax on savings and dividends
* Capital gains tax
* General investment accounts
> ISAs
* Individual Savings Accounts
* Stocks and shares ISAs
* Lifetime ISAs and Junior ISAs
> Pensions
* Why save in a pension?
* Pension tax relief
* Workplace pensions and auto-enrolment
* Defined benefit and defined contribution pensions
* Self-invested personal pensions (SIPPs)
* The State Pension
* Accessing your pension
> Passing wealth on
* Inheritance tax basics
* Wills, nominations and estate planning
11. Regulation, Protection and Ethics
> Regulation
* Why financial services are regulated
* The FCA and the PRA
* The Consumer Duty
* Advice, guidance and execution-only
* Financial promotions and finfluencers
> Protection
* The Financial Services Compensation Scheme
* The Financial Ombudsman Service
* Client money and asset protection
> Scams
* Investment scams
* Red flags and the FCA Warning List
* Pension scams
> Ethics and ESG
* Ethics in investment
* The CFA Institute Code of Ethics
* ESG and responsible investing
* Stewardship and engagement
* Greenwashing and sustainability labels
12. Building Your Plan
> Making the plan
* The personal financial plan
* An investment policy statement
* Choosing an asset allocation
* Choosing funds for a portfolio
* Lump sums and regular investing
> Through life
* Investing early in adult life
* Mid-life: competing goals
* Approaching retirement
* Drawdown and sustainable withdrawals
* Annuities
> Staying on track
* Reviewing and monitoring a portfolio
* When to get regulated financial advice
* Record keeping and paperwork
`;

export const TRACKS = [
  { name: "Stage 1 · Foundations", units: [1, 2, 3], from: "#b8ba6e", to: "#8fae5d" },
  { name: "Stage 2 · Theory and analysis", units: [4, 5, 6, 7], from: "#c9c27a", to: "#6aa8a0" },
  { name: "Stage 3 · Investing in practice", units: [8, 9, 10], from: "#b8ba6e", to: "#5fa3c4" },
  { name: "Stage 4 · Protection and planning", units: [11, 12], from: "#d6c98a", to: "#22d3ee" },
];

export const PATHS = [
  { id: "core", name: "The whole course", sub: "Every school in order, from money basics to a written plan.", units: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { id: "beginner", name: "First-time investor", sub: "Saving first, how markets work, the main assets, funds and costs, UK wrappers, protection and a plan.", units: [1, 2, 3, 8, 10, 11, 12] },
  { id: "analyst", name: "Investment analysis", sub: "The theory behind portfolios and prices: risk and return, portfolio theory, valuation and company accounts.", units: [4, 5, 6, 7] },
  { id: "cisi", name: "Industry foundations", sub: "The topics of the CISI Fundamentals of Financial Services and CFA Investment Foundations: markets, assets, risk, regulation and ethics.", units: [2, 3, 4, 8, 11] },
  { id: "uk-saver", name: "UK saver and pensions", sub: "Cash, ISAs, pensions, tax, consumer protection and planning through life.", units: [1, 10, 11, 12] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "Budgeting, emergency funds and debt before investing, then compound interest, inflation and the time value of money.",
  2: "How the financial system, the Bank of England, exchanges, trading, settlement, indices and market cycles work.",
  3: "Cash, bonds, gilts, shares, property, commodities, alternatives, crypto-assets and derivatives: what each one is.",
  4: "Measuring return and risk, the equity risk premium, the long-run evidence and how to read performance honestly.",
  5: "Why diversification works, correlation, modern portfolio theory, CAPM, beta, factors and asset allocation.",
  6: "Price and value: discounted cash flow, the dividend discount model, P/E, yields, EV/EBITDA and CAPE.",
  7: "Ratio and cash flow analysis, consolidated group accounts and the quality of what companies report.",
  8: "Unit trusts, OEICs, investment trusts and ETFs, active against passive, and how charges compound.",
  9: "Loss aversion, overconfidence, herding and other biases, and habits that protect investors from themselves.",
  10: "ISAs, pensions, SIPPs, the State Pension, tax on savings, dividends and gains, and passing wealth on.",
  11: "The FCA, the Consumer Duty, the FSCS and the Ombudsman, how to spot scams, ethics and ESG.",
  12: "Turning knowledge into a written plan: asset allocation, fund choice, life stages, retirement and review.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
