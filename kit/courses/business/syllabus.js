// BusinessGradify Business and Management: the full curriculum, 11 schools, modelled on the QAA Subject Benchmark
// Statement for Business and Management (2023) and the A level Business subject content (DfE, 2015): the business
// environment, management and organisational behaviour, strategy, marketing, operations and supply chains, people
// management, finance for managers, economics for business, entrepreneurship and innovation, digital business, and
// ethics, ESG and governance. Each topic is taught as one lesson, grouped into modules ("> " lines) and stages
// (TRACKS). Lesson ids are permanent (ids.js, written by node scripts/new-course.mjs lock business): never
// renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. The Business Environment
> What business is
* What is a business?
* Business purpose and objectives
* Stakeholders
* The private, public and third sectors
> Legal forms and ownership
* Sole traders and partnerships
* Private and public limited companies
* Social enterprises and co-operatives
* Franchising
> The external environment
* PESTLE analysis
* Markets and competition
* The economic environment
* The legal and regulatory environment
* Technology and social change
* Globalisation and international business
> Size, growth and failure
* Business size and growth
* Why businesses fail
2. Management and Organisational Behaviour
> What managers do
* What is management?
* Classical management theory: Taylor and Fayol
* Mintzberg's managerial roles
* The human relations movement
> Organisational structure
* Organisational structure
* Centralisation and decentralisation
* Bureaucracy and Weber
* Contingency theory and organisational design
> People at work
* Motivation: content theories
* Motivation: process theories
* Leadership theories
* Leadership styles
* Teams and group working
* Communication in organisations
> Culture, power and change
* Organisational culture
* Power and politics in organisations
* Managing change
* Decision-making in organisations
3. Strategy
> Strategic thinking
* What is strategy?
* Mission, vision and objectives
* Planned and emergent strategy
> Analysing the environment
* Porter's five forces
* The industry life cycle
* SWOT analysis
> Internal analysis
* Resources and capabilities
* The value chain
* Core competences and the VRIO framework
> Strategic choice
* Porter's generic strategies
* The Ansoff matrix
* The Boston Matrix and portfolio analysis
* Mergers, acquisitions and alliances
* Blue ocean strategy
> Implementing strategy
* Strategy implementation
* The balanced scorecard
4. Marketing
> Marketing foundations
* What is marketing?
* Market research
* Segmentation, targeting and positioning
* Consumer behaviour
* Business-to-business marketing
> The marketing mix
* Product and the product life cycle
* Pricing strategies
* Promotion and marketing communications
* Place and distribution channels
* The extended marketing mix
> Brands and customers
* Branding and brand equity
* Customer relationship management
* Services marketing
> Modern marketing
* Digital and social media marketing
* Marketing metrics
* Sustainable and ethical marketing
* International marketing
* The marketing plan
5. Operations and Supply Chain Management
> Operations fundamentals
* What is operations management?
* The transformation model and the four Vs
* Process types and layouts
* Capacity management
> Quality
* Quality management
* Total quality management
* Six Sigma
* Lean production
> Supply chains
* Supply chain management
* Inventory management
* Just-in-time
* Procurement and supplier relationships
* Logistics
* Supply chain risk and resilience
> Improving operations
* Productivity and efficiency
* Project management
6. People Management
> HRM foundations
* What is human resource management?
* Workforce planning
* Recruitment and selection
* Employment law essentials
> Developing people
* Learning and development
* Performance management
* Reward and pay
* Talent management
> Employment relations
* Employee engagement and wellbeing
* Employment relations and trade unions
* Equality, diversity and inclusion
* Flexible working and the future of work
* Discipline, grievance and conflict
> HR strategy
* Strategic HRM
* HR analytics
7. Finance for Managers
> Financial statements
* Why managers need finance
* The income statement
* The statement of financial position
* The statement of cash flows
> Analysing performance
* Profitability ratios
* Liquidity and efficiency ratios
* Gearing and investor ratios
> Costs and budgets
* Costs and break-even analysis
* Contribution and short-term decisions
* Budgeting
* Variance analysis
* Cash flow forecasting
> Investment and funding
* Sources of finance
* Investment appraisal: payback and ARR
* Net present value
* Working capital management
* The cost of capital
8. Economics for Business
> Markets
* Demand
* Supply and market equilibrium
* Price elasticity of demand
* Market failure
> Market structures
* Perfect competition and monopoly
* Oligopoly and game theory
* Competition policy
> The macroeconomy
* Economic growth and the business cycle
* Inflation
* Unemployment and the labour market
* Interest rates and monetary policy
* Fiscal policy and taxation
* Exchange rates
* International trade and protectionism
> Behaviour and decisions
* Behavioural economics for business
9. Entrepreneurship and Innovation
> The entrepreneur
* What is entrepreneurship?
* Opportunity recognition and the entrepreneurial mindset
* Effectuation and the lean start-up
> Starting a business
* The business model canvas
* The business plan
* Funding a start-up
* Protecting ideas: intellectual property
* Small business support in the UK
> Innovation
* Types of innovation
* Disruptive innovation
* Diffusion of innovations
* Open innovation
* Design thinking
> Growth
* Scaling a business
* Social entrepreneurship
10. Digital Business and Information Systems
> Digital foundations
* Information systems in organisations
* Digital transformation
* E-commerce business models
* Platforms and network effects
> Data and analytics
* Data-driven decision-making
* Business intelligence and dashboards
* Correlation and regression for forecasting
* Artificial intelligence in business
> Risk and regulation
* Cybersecurity for business
* Data protection and UK GDPR
* Digital ethics
> Digital operations
* Enterprise systems: ERP and CRM
* Cloud computing
* Fintech and digital payments
* Agile project management
11. Ethics, ESG and Corporate Governance
> Business ethics
* Ethical theories in business
* Ethical decision-making
* Corporate social responsibility
* Shareholder and stakeholder theories of the firm
> Corporate governance
* Principles of corporate governance
* The UK Corporate Governance Code
* Directors' duties
* Agency theory
* Executive pay
> ESG and sustainability
* ESG: environmental, social and governance
* Sustainability and the triple bottom line
* Climate change and business
* Sustainability reporting
* Modern slavery and supply chain ethics
> Integrity and risk
* Bribery and corruption
* Whistleblowing
* Corporate failures: lessons from case studies
`;

export const TRACKS = [
  { name: "Stage 1 · Foundations", units: [1, 2, 8], from: "#9b7fd4", to: "#818cf8" },
  { name: "Stage 2 · Business functions", units: [4, 5, 6, 7], from: "#818cf8", to: "#38bdf8" },
  { name: "Stage 3 · Strategy and the wider world", units: [3, 9, 10, 11], from: "#38bdf8", to: "#22d3ee" },
];

export const PATHS = [
  { id: "a-level", name: "A level Business", sub: "The A level content: the environment, management, the four functions and strategy.", units: [1, 2, 4, 5, 6, 7, 3] },
  { id: "manager", name: "New manager", sub: "Leading people, managing money, making strategy and governing well.", units: [2, 6, 7, 3, 11] },
  { id: "founder", name: "Starting a business", sub: "From an idea to a funded, legal, growing venture.", units: [1, 9, 4, 7, 10] },
  { id: "degree", name: "Business degree, first year", sub: "Every school, in the order a business school teaches them.", units: [1, 2, 8, 4, 5, 6, 7, 3, 9, 10, 11] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "What a business is, who it serves, the legal forms it can take and the external forces it must read.",
  2: "What managers do, how organisations are structured, and how motivation, leadership, culture and change work.",
  3: "How firms choose where to compete and how to win: five forces, the value chain, generic strategies and growth.",
  4: "Understanding customers and markets, the marketing mix, brands, digital marketing and the marketing plan.",
  5: "Turning inputs into goods and services: processes, capacity, quality, lean, supply chains and projects.",
  6: "Recruiting, developing, rewarding and engaging people, within employment law and an HR strategy.",
  7: "Reading financial statements, ratios, costs, break-even, budgets, cash flow and investment appraisal.",
  8: "The economics every manager uses: demand, elasticity, market structures, the macroeconomy and trade.",
  9: "Spotting opportunities, testing business models, funding a start-up, protecting ideas and managing innovation.",
  10: "Information systems, platforms, data and AI, cybersecurity and data protection, and digital operations.",
  11: "Ethics, corporate social responsibility, governance, directors' duties, ESG, sustainability and integrity.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
