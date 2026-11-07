// FinanceGradify Accounting and Finance: the full curriculum, 12 schools. Modelled on A level Accounting (AQA 7127),
// the ACCA Applied Knowledge and Applied Skills exams (Business and Technology, Management Accounting, Financial
// Accounting, Corporate and Business Law, Performance Management, Taxation, Financial Reporting, Audit and
// Assurance, Financial Management) and the QAA Subject Benchmark Statements for Accounting and for Finance. Each topic
// is taught as one lesson, grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent (ids.js,
// written by node scripts/new-course.mjs lock finance): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Accounting and the Double-Entry System
> Accounting and its users
* What is accounting?
* Users of accounting information
* Financial and management accounting
* Types of business organisation
* Accounting concepts and conventions
> The accounting equation
* The accounting equation
* Assets, liabilities and capital
* Income, expenses and drawings
> Double entry
* The principles of double entry
* Recording cash and credit transactions
* Balancing off accounts
* The trial balance
> Books of prime entry and controls
* Books of prime entry
* Sales tax in the accounts
* Control accounts
* Bank reconciliations
* Errors and the suspense account
2. Preparing Financial Statements
> Year-end adjustments
* Capital and revenue expenditure
* Accruals and prepayments
* Depreciation
* Disposal of non-current assets
* Irrecoverable debts and allowances for receivables
* Inventory valuation
> Final accounts of a sole trader
* The extended trial balance
* The statement of profit or loss
* The statement of financial position
* Incomplete records
* Profit and cash
> Partnerships
* Partnership agreements and the Partnership Act 1890
* The appropriation account
* Partners' capital and current accounts
* Goodwill and changes in partners
3. Financial Reporting for Companies
> Regulation and the Conceptual Framework
* The regulatory framework for financial reporting
* The Conceptual Framework for Financial Reporting
* Qualitative characteristics of useful information
* Recognition and measurement
> Company financial statements
* Share capital and reserves
* Issues of shares, rights issues and bonus issues
* Presenting company financial statements
* Statement of profit or loss and other comprehensive income
* Statement of changes in equity
* Statement of cash flows
> Accounting standards
* Property, plant and equipment
* Intangible assets
* Impairment of assets
* Inventories under IAS 2
* Revenue from contracts with customers
* Leases
* Provisions, contingent liabilities and contingent assets
* Events after the reporting period
* Accounting policies, estimates and errors
* Income taxes
* Financial instruments
* Earnings per share
4. Interpreting Financial Statements and Group Accounts
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
5. Management Accounting: Costing
> Costs and their behaviour
* The role of management accounting
* Cost classification
* Cost behaviour
* The high-low method
> Recording and attributing costs
* Accounting for materials
* Accounting for labour
* Overhead allocation, apportionment and reapportionment
* Absorption costing
* Marginal costing
* Marginal and absorption costing compared
* Activity-based costing
> Costing systems
* Job and batch costing
* Process costing
* Process losses and equivalent units
* Service costing
> Modern costing techniques
* Target costing
* Life-cycle costing
* Throughput accounting
* Environmental management accounting
6. Management Accounting: Planning, Control and Decisions
> Short-term decisions
* Relevant costing
* Cost–volume–profit analysis
* Break-even charts and the margin of safety
* Limiting factor analysis
* Make-or-buy and other short-term decisions
* Pricing decisions
* Decisions under risk and uncertainty
> Budgeting
* Budgeting: purposes and process
* Functional budgets
* Cash budgets
* Fixed and flexible budgets
* Approaches to budgeting
* Behavioural aspects of budgeting
> Control and performance
* Standard costing
* Material and labour variances
* Overhead and sales variances
* The operating statement
* Financial performance indicators
* The balanced scorecard
* Divisional performance and transfer pricing
7. Financial Management
> The finance function
* The financial management function
* Financial objectives and stakeholders
* The financial environment
> Investment appraisal
* The time value of money
* Accounting rate of return and payback
* Net present value
* Internal rate of return
* Inflation and taxation in investment appraisal
* Risk and uncertainty in investment appraisal
* Capital rationing and asset replacement
> Working capital management
* Working capital and its financing
* Managing inventory
* Managing receivables and payables
* Managing cash
> Financing and the cost of capital
* Sources of finance
* Islamic finance
* Dividend policy
* The cost of equity
* The cost of debt and WACC
* Capital structure
> Valuation and risk management
* Business valuation
* Foreign exchange risk
* Interest rate risk
8. Audit, Assurance and Ethics
> The audit framework
* What is an audit?
* The regulation of audit
* Corporate governance
* Internal audit
* Professional ethics
> The audit process
* Accepting and planning an engagement
* Risk assessment and materiality
* Internal control
* Tests of controls
* Audit evidence and substantive procedures
* Audit sampling and data analytics
* Auditing inventory, receivables and cash
* Completion and review
* The auditor's report
> Fraud and failure
* Fraud and error
* The audit expectation gap
* Audit failures and reform
9. Taxation
> The tax system
* The UK tax system
* Tax administration and self-assessment
* Tax avoidance and tax evasion
> Taxing individuals
* The income tax computation
* Employment income and benefits
* Trading income
* Capital allowances
* National Insurance contributions
> Other taxes
* Corporation tax
* Capital gains tax
* Inheritance tax
* Value added tax
10. Business and Company Law
> The legal system and obligations
* The English legal system
* Contract formation
* Contract terms and breach
* Contract remedies
* Negligence and professional liability
> Employment and business structures
* Employment law
* Agency and partnership law
* Forming a company
* Share capital and capital maintenance
* Loan capital and charges
> Running and ending a company
* Directors' duties
* Company meetings and resolutions
* Insolvency
* Fraudulent behaviour: insider dealing, money laundering and bribery
11. Finance and Financial Markets
> Markets and instruments
* The financial system
* Banks and money markets
* Bonds and bond valuation
* Equities and stock markets
* Derivatives
> Risk and return
* Risk and return
* Portfolio theory and diversification
* The capital asset pricing model
* Market efficiency
* Behavioural finance
* Option pricing
> Banking and regulation
* Financial regulation
* Financial crises
* Fintech and digital finance
12. Accounting, Technology and Society
> Technology and data
* Accounting information systems
* Data analytics in accounting
* Automation, AI and the accountant
* Cyber security and data protection
> Accounting in society
* The history of accounting
* Accounting theory
* Critical perspectives on accounting
* Public sector accounting
* Charity accounting
* Sustainability and integrated reporting
> The profession
* Ethics and the public interest
* The accountancy profession and its qualifications
`;

// stages on the map; FinanceGradify's colours run from emerald through teal to cyan
export const TRACKS = [
  { name: "Stage 1 · Foundations of accounting", units: [1, 2], from: "#34d399", to: "#10b981" },
  { name: "Stage 2 · Financial reporting", units: [3, 4], from: "#10b981", to: "#14b8a6" },
  { name: "Stage 3 · Management accounting", units: [5, 6], from: "#2dd4bf", to: "#0d9488" },
  { name: "Stage 4 · Finance", units: [7, 11], from: "#14b8a6", to: "#06b6d4" },
  { name: "Stage 5 · Professional practice", units: [8, 9, 10, 12], from: "#22d3ee", to: "#0ea5e9" },
];

export const PATHS = [
  { id: "alevel", name: "A level Accounting", sub: "The core of A level Accounting: double entry, final accounts, partnerships, company accounts, ratio analysis, costing, budgeting and decision-making.", units: [1, 2, 3, 4, 5, 6] },
  { id: "knowledge", name: "Professional exams: knowledge level", sub: "The ground covered by the first professional accountancy papers: financial accounting, management accounting and the business and legal context.", units: [1, 2, 5, 6, 10] },
  { id: "year1", name: "University year 1", sub: "The first-year core of an accounting and finance degree: recording, reporting, costing, financial management and markets.", units: [1, 2, 3, 5, 7, 11] },
  { id: "reporting", name: "Financial reporting", sub: "From the double-entry system to IFRS company and group accounts, their analysis and the wider corporate report.", units: [1, 2, 3, 4, 12] },
  { id: "corporate-finance", name: "Corporate finance", sub: "Investment appraisal, working capital, the cost of capital, valuation, markets and risk. Education, not investment advice.", units: [7, 11, 4] },
  { id: "practice", name: "Audit, tax and law", sub: "The professional practice papers: audit and ethics, UK taxation and the law that governs companies and accountants.", units: [8, 9, 10, 12] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "What accounting is and who uses it, the accounting equation, double entry, the trial balance and the controls that check it.",
  2: "Year-end adjustments, sole trader statements, incomplete records and partnership accounts.",
  3: "The IASB, the Conceptual Framework and the IFRS standards that shape company financial statements.",
  4: "Ratio and cash flow analysis, consolidated group accounts and the quality of what companies report.",
  5: "Cost behaviour, absorption, marginal and activity-based costing, costing systems and modern techniques.",
  6: "Relevant costs, CVP, budgeting, standard costing and variances, and measuring performance.",
  7: "Investment appraisal, working capital, sources of finance, the cost of capital, valuation and hedging.",
  8: "Why audits exist and how they are done: governance, ethics, risk, controls, evidence and the auditor's report.",
  9: "The UK tax system: income tax, National Insurance, corporation tax, capital gains, inheritance tax and VAT.",
  10: "Contract, negligence, employment and company law, directors' duties, insolvency and financial crime.",
  11: "Bonds, equities and derivatives, risk and return, portfolio theory, CAPM, market efficiency and regulation.",
  12: "Accounting systems, data and AI, accounting history and theory, the public and charity sectors, sustainability and the profession.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
