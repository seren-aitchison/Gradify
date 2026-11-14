// FinanceGradify Accounting, Technology and Society (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Accounting information systems
LV: Intermediate · Foundation
S: An accounting information system collects, stores and processes transaction data and turns it into information for decisions and reports. This lesson explains the components of an accounting information system, the main transaction cycles and the role of enterprise resource planning systems.
O: Describe the components of an accounting information system
O: Explain the main transaction cycles and the documents they use
O: Evaluate the benefits and risks of enterprise resource planning systems
PRE: Books of prime entry
H: What an accounting information system is
P: An **accounting information system** (AIS) is the set of people, procedures and technology that captures business events, records them and produces information for managers, owners, lenders and regulators. Its six usual components are **people**, **procedures and instructions**, **data**, **software**, **information technology infrastructure** and **internal controls**. A good AIS does three jobs: it **collects and stores data** about transactions, it **transforms data into information** such as ledgers, budgets and financial statements, and it **safeguards assets and data** through controls. Most organisations now run their AIS on **cloud accounting software** for small firms (such as Xero or Sage) or an **enterprise resource planning (ERP)** system for larger groups (such as SAP or Oracle), which links finance with sales, purchasing, inventory and payroll in one shared database.
H: Transaction cycles
- **Revenue cycle**: taking customer orders, dispatching goods, invoicing and collecting cash.
- **Expenditure cycle**: requisitioning, ordering from suppliers, receiving goods, approving invoices and paying.
- **Human resources and payroll cycle**: hiring, recording hours, calculating pay and deductions, and paying staff and HMRC.
- **Production (conversion) cycle**: turning materials and labour into finished goods and recording their cost.
- **Financing cycle**: raising and repaying loans and equity, and paying interest and dividends.
- The **general ledger and reporting system** receives summaries from every cycle and produces the trial balance and financial statements.
H: ERP systems: benefits and risks
- A single database means data are entered once and shared, reducing duplication and reconciliation work.
- Real-time information supports faster month-end closes and better decisions.
- Built-in **workflow controls** such as approval limits and **three-way matching** of order, goods received note and invoice.
- Implementation is expensive and slow, and failed projects can disrupt trading.
- Poorly designed **user access rights** can undermine **segregation of duties**.
- Reliance on one supplier and system creates concentration and continuity risk.
X: The expenditure cycle in an ERP system.
> A buyer raises a purchase order for 500 units at £4 each, approved within her £5,000 limit.
> The warehouse records a goods received note for 500 units on delivery.
> The supplier's invoice for £2,000 is matched automatically to the order and the goods received note.
> Because all three agree, the system posts the liability and schedules payment; a mismatch would hold the invoice for review.
K: An accounting information system combines people, procedures, data, software, infrastructure and controls to turn transactions in the revenue, expenditure, payroll, production and financing cycles into reliable information, and ERP systems integrate these cycles but bring cost, access and dependence risks.
!: Thinking an AIS is just the accounting software. The software is only one component; procedures, people and controls determine whether the information is reliable.
EV: established | Integrating transaction cycles in a single database reduces duplicated data entry and reconciliation, but control weaknesses in access rights are a recurring finding in ERP audits.
T: Accounting information system | The people, procedures, data, software, infrastructure and controls that record transactions and produce financial information
T: Enterprise resource planning system | Integrated software that links finance with other business functions through one shared database
T: Three-way matching | Checking a purchase order, goods received note and supplier invoice agree before payment
SUM: Six components, not just software.
SUM: Revenue, expenditure, payroll, production, financing.
SUM: ERP integrates but concentrates risk.
SRC: Romney M. B. and Steinbart P. J., Accounting Information Systems, 15th edition, Pearson | secondary | 2021
SRC: Hall J. A., Accounting Information Systems, 10th edition, Cengage Learning | secondary | 2019
Q: Which transaction cycle covers ordering from suppliers and paying them? | The expenditure cycle.
Q: Name the six components of an accounting information system. | People, procedures, data, software, IT infrastructure and internal controls.
M1#finance-u12-01-q1@1: Which transaction cycle includes invoicing customers and collecting cash from them? | The revenue cycle | The expenditure cycle | The financing cycle | The production cycle | Applying the standard result: The revenue cycle runs from customer order to cash receipt.
M2#finance-u12-01-q2@2: An invoice from a supplier does not agree with the goods received note. What should a well-controlled system do? | Hold the invoice for review before payment | Pay the invoice and correct the ledger later | Post the invoice to the suspense account and pay it | Reduce the purchase order to match the invoice automatically | Three-way matching exists to stop payment for goods not received or not ordered.
M3#finance-u12-01-q3@3: After an ERP implementation, one clerk can create suppliers, approve invoices and release payments. What is the main risk? | Lost segregation of duties allowing fictitious supplier fraud | Slower month-end close because of duplicated data entry | Higher depreciation on the new software licence | Inability to produce a trial balance from the ledger | One person controlling the whole payment process could set up and pay a false supplier.
SEQ1#finance-u12-01-q4@2: Put the steps of the revenue cycle in order. | Receive and approve the customer order ; Dispatch the goods ; Raise the sales invoice ; Collect and record cash | The revenue cycle moves from order to dispatch, billing and cash collection.
SA2#finance-u12-01-q5@1,3: Explain the benefits and risks of moving a company's accounting onto an ERP system. | An ERP system stores data from sales, purchasing, inventory, payroll and finance in one database, so data are entered once, reconciliations fall and managers get real-time information. It can enforce controls such as approval workflows and three-way matching. However, implementation is costly and can disrupt trading if it fails, and badly configured access rights can remove segregation of duties. The company also becomes dependent on one supplier and system, so continuity planning matters. | Single shared database ; Real-time information ; Built-in controls ; Cost and disruption ; Access rights and dependence

## Data analytics in accounting
LV: Intermediate · Application
S: Accountants increasingly analyse whole populations of data rather than samples. This lesson explains the four types of analytics, the importance of data quality and how techniques such as Benford's law help to spot anomalies.
O: Distinguish descriptive, diagnostic, predictive and prescriptive analytics
O: Explain why data quality matters and how data are prepared
O: Apply Benford's law and other tests to identify unusual transactions
PRE: Audit sampling and data analytics
H: Four types of analytics
P: Data analytics is the process of examining data to find patterns and draw conclusions. **Descriptive analytics** asks what happened, for example sales by region last quarter. **Diagnostic analytics** asks why it happened, for example drilling into a fall in margin to find a price cut. **Predictive analytics** asks what is likely to happen, using techniques such as **regression** and **machine learning** to forecast demand or flag customers likely to default. **Prescriptive analytics** asks what should be done, for example recommending the reorder quantity that minimises cost. Management accountants use analytics for forecasting and performance reporting; financial accountants use it for close and reconciliation work; and tax and audit teams use it to test **whole populations** of transactions.
H: Preparing the data
- Analysis is only as good as its inputs: "garbage in, garbage out".
- **Extract, transform, load (ETL)**: take data from source systems, clean and reshape them, and load them into the analysis tool.
- Check **completeness** by reconciling record counts and totals back to the ledger.
- Clean duplicates, inconsistent formats, missing values and coding errors.
- Document the steps so the analysis can be repeated and reviewed.
- Respect data protection rules when using personal data such as payroll records.
H: Tests for anomalies
- **Benford's law**: in many natural data sets the first digit is 1 about 30.1% of the time and 9 about 4.6% of the time.
- Too many invoices just below an approval limit may indicate splitting to avoid authorisation.
- **Duplicate tests** find the same supplier, amount and date paid twice.
- **Gap tests** find missing numbers in sequences such as invoice numbers.
- **Visualisation** such as scatter plots and dashboards makes outliers easier to see.
- Anomalies are prompts for investigation, not proof of fraud.
X: Applying Benford's law to expense claims.
> A company has 4,000 expense claims in the year.
> Benford's law predicts about 4,000 × 30.1% = 1,204 claims beginning with the digit 1.
> Only 700 begin with 1, while 900 begin with 4, far above the expected 4,000 × 9.7% = 388.
> The finance team investigates and finds staff splitting claims to stay under a £50 receipt limit.
K: Descriptive, diagnostic, predictive and prescriptive analytics answer what happened, why, what will happen and what to do, but only reliable, complete and well-documented data give useful results, and tests such as Benford's law flag anomalies that need investigation rather than proving wrongdoing.
!: Treating a Benford's law deviation as evidence of fraud. Some data sets, such as prices set at £9.99 or amounts with fixed limits, do not follow Benford's law, so deviations need explaining before conclusions are drawn.
EV: established | Benford's law describes the first-digit distribution of many naturally occurring financial data sets and is widely used as a screening test in forensic accounting.
T: Predictive analytics | Using historical data and statistical models to forecast future outcomes
T: Benford's law | The observation that leading digits in many data sets follow a logarithmic pattern, with 1 most common
T: Extract, transform, load | The process of taking data from source systems, cleaning them and loading them for analysis
SUM: What happened, why, what next, what to do.
SUM: Clean and reconcile data first.
SUM: Anomalies prompt questions, not verdicts.
SRC: Nigrini M. J., Benford's Law: Applications for Forensic Accounting, Auditing, and Fraud Detection, Wiley | secondary | 2012
SRC: Richardson V. J., Teeter R. A. and Terrell K. L., Data Analytics for Accounting, 3rd edition, McGraw Hill | secondary | 2023
SRC: ICAEW, Data analytics and the accountant | guidance | 2023 | https://www.icaew.com/technical/technology/data
Q: Which type of analytics asks what should be done? | Prescriptive analytics.
Q: Under Benford's law, roughly how often is 1 the leading digit? | About 30.1% of the time.
M1#finance-u12-02-q1@1: A dashboard showing last month's sales by region is an example of which type of analytics? | Descriptive | Diagnostic | Predictive | Prescriptive | Applying the standard result: Descriptive analytics reports what has already happened.
M2#finance-u12-02-q2@2: Before analysing a ledger extract, why should the analyst reconcile its total to the trial balance? | To confirm the extract is complete | To remove the need to clean the data | To make the data follow Benford's law | To convert the data into predictive form | Reconciling totals and record counts shows no transactions were lost in extraction.
M3#finance-u12-02-q3@3: A retailer's prices mostly end in .99 and its sales data deviate from Benford's law. What is the best conclusion? | The deviation is expected and is not a sign of fraud | Sales staff are certainly manipulating the till records | The data set must be incomplete and should be discarded | Benford's law proves the sales figures are overstated | Data shaped by pricing policies or limits are not expected to follow Benford's law.
NUM2#finance-u12-02-q4@3: Under Benford's law the first digit 1 occurs about 30.1% of the time. How many of 6,000 payments would you expect to begin with 1? | 1806 | 5 | – | Expected count = 6,000 × 0.301 = 1806 payments beginning with the digit 1.
SA2#finance-u12-02-q5@1,2: Explain why data quality matters in accounting analytics and how an accountant should prepare data before analysis. | Analysis based on incomplete or inaccurate data produces misleading results, so the accountant must first check the data. Extracted data should be reconciled to ledger totals and record counts to confirm completeness. They should then be cleaned to remove duplicates, fix inconsistent formats and deal with missing values, using a documented extract, transform and load process. Documenting the steps lets the analysis be reviewed and repeated, and personal data must be handled within data protection rules. | Garbage in, garbage out ; Reconcile for completeness ; Cleaning ; Documentation and data protection

## Automation, AI and the accountant
LV: Intermediate · Application
S: Robotic process automation and artificial intelligence are changing what accountants do. This lesson explains the main technologies, the tasks they suit, their risks and what they mean for professional judgement and careers.
O: Distinguish robotic process automation, machine learning and generative AI
O: Identify accounting tasks suited to automation and the risks involved
O: Evaluate the effect of automation on the role of the accountant
H: The technologies
P: **Robotic process automation (RPA)** uses software "bots" to follow fixed rules, copying what a person would do on screen: downloading bank statements, posting standard journals or matching invoices. It suits **high-volume, repetitive, rule-based** tasks with structured data. **Machine learning** goes further: algorithms learn patterns from past data, for example coding supplier invoices to ledger accounts or scoring receivables for default risk. **Generative AI**, based on **large language models**, produces text, summaries and code from prompts, and can draft board papers, explain variances or read contracts. These tools differ in how predictable they are: RPA does exactly what it is told, while machine learning and generative AI are **probabilistic** and can be wrong in ways that are hard to see.
H: Where automation helps
- Bank reconciliations and invoice matching with RPA.
- Automatic coding of purchase invoices and expense claims using machine learning.
- Continuous monitoring of transactions for unusual patterns.
- Drafting narrative commentary and summarising long documents with generative AI.
- Faster month-end closes, fewer keying errors and staff freed for analysis.
H: Risks and professional responsibility
- Bots repeat a mistake at scale if their rules or inputs are wrong.
- Generative AI can **hallucinate**: produce confident but false statements or references.
- Models can embed **bias** from historical data and be hard to explain.
- Entering client data into public AI tools can breach **confidentiality** and data protection.
- Responsibility stays with the accountant: professional codes require competence, due care and review of outputs.
- Automation needs **governance**: change control, testing, monitoring and clear ownership.
X: Measuring the benefit of an RPA bot.
> An accounts payable team processes 3,000 invoices a month, taking 5 minutes each by hand.
> A bot handles 80% of them, so 2,400 invoices no longer need manual keying.
> Time saved is 2,400 × 5 = 12,000 minutes, or 200 hours a month.
> The team redeploys this time to supplier queries and exception review, but still reviews a sample of bot postings.
K: RPA automates fixed rule-based tasks while machine learning and generative AI learn and generate but can err unpredictably, so automation speeds routine work but needs governance and human review, and the accountant remains responsible for the output.
!: Assuming AI output is correct because it is fluent. Generative AI can invent figures, standards or citations, so every output used professionally must be checked against reliable sources.
EV: contested | Frey and Osborne estimated in 2013 that accountants and auditors had a 94% probability of computerisation, but others argue automation changes tasks within the job more than it removes the job.
EV: established | Robotic process automation is best suited to high-volume, rule-based processes that use structured data.
T: Robotic process automation | Software bots that perform fixed, rule-based tasks on computer systems
T: Machine learning | Algorithms that learn patterns from data to make predictions or classifications
T: Hallucination | A confident but false output produced by a generative AI model
SUM: RPA follows rules; AI learns patterns.
SUM: Automate routine, review the output.
SUM: Responsibility stays human.
SRC: Frey C. B. and Osborne M. A., The future of employment: how susceptible are jobs to computerisation?, Technological Forecasting and Social Change, 114, 254–280 | primary | 2017
SRC: Susskind R. and Susskind D., The Future of the Professions, Oxford University Press | secondary | 2015
SRC: ICAEW, Generative AI guide | guidance | 2024 | https://www.icaew.com/technical/technology/artificial-intelligence
Q: Which technology suits high-volume, rule-based tasks with structured data? | Robotic process automation.
Q: What is a hallucination in generative AI? | A confident but false output, such as an invented figure or reference.
M1#finance-u12-03-q1@1: Software that logs into the bank portal each morning and downloads statements by following fixed steps is | Robotic process automation | A large language model | Machine learning | Blockchain | Applying the standard result: RPA bots copy fixed, rule-based human actions on screen.
M2#finance-u12-03-q2@2: A model learns from five years of coded invoices to suggest the ledger code for new ones. This is | Machine learning | Robotic process automation | Descriptive analytics | Three-way matching | The model learns patterns from historical data rather than following fixed rules.
M3#finance-u12-03-q3@3: A junior uses a public generative AI tool to draft a client's tax memo, pasting in the client's full records. What is the main professional concern? | Breach of confidentiality and data protection | The memo will be too short to be useful | The tool cannot write in formal English | The client will have to pay VAT on the memo | Client data entered into public tools may be stored or reused, breaching confidentiality.
NUM2#finance-u12-03-q4@2: A bot takes over 1,500 bank reconciliation lines a month that each took 4 minutes by hand. How many hours a month are saved? | 100 | 0.5 | hours | 1,500 × 4 = 6,000 minutes, and 6,000 ÷ 60 = 100 hours saved each month.
SA2#finance-u12-03-q5@2,3: Evaluate the claim that automation will make accountants unnecessary. | Automation is already taking over routine, rule-based work such as reconciliations, invoice matching and coding, and some studies have estimated a high probability of computerisation for accounting roles. However, much accounting work involves judgement, ethics, communication and responsibility for outputs, which software cannot take on. AI tools can be wrong, biased or opaque, so professionals are needed to govern, test and review them. The more likely result is a shift in the accountant's role towards analysis, advice and oversight rather than disappearance. | Routine tasks automated ; Frey and Osborne estimate ; Judgement and responsibility ; AI errors need oversight ; Role shifts rather than disappears

## Cyber security and data protection
LV: Intermediate · Application
S: Finance teams hold valuable data and control payments, so they are prime targets for cyber attack. This lesson covers common threats, basic cyber controls and the UK data protection rules that accountants must follow.
O: Identify common cyber threats to finance functions
O: Describe basic cyber security controls including Cyber Essentials
O: Apply the main UK GDPR principles and breach reporting rules
H: Threats to finance
P: Cyber criminals target finance because it moves money and holds personal and commercial data. **Phishing** emails trick staff into clicking links or giving away passwords. **Business email compromise** and **mandate fraud** use a hacked or spoofed email to ask the finance team to change a supplier's bank details, so genuine invoices are paid to the fraudster. **Ransomware** encrypts systems and demands payment to unlock them, often with a threat to publish stolen data. **Insider threats** come from staff who misuse access. Because many attacks rely on persuading a person rather than breaking a system, **people and procedures** matter as much as technology.
H: Basic controls
- The UK National Cyber Security Centre's **Cyber Essentials** scheme sets five technical controls: firewalls, secure configuration, user access control, malware protection and security update management.
- **Multi-factor authentication** for email, banking and accounting systems.
- Verify any change of bank details by calling the supplier on a number already held, never one in the email.
- Regular **backups** kept separate from the main network, and tested restores.
- Staff training and simulated phishing exercises.
- An incident response plan that says who does what when an attack happens.
H: UK data protection
- The **UK GDPR** and the **Data Protection Act 2018** govern personal data, such as payroll and customer records.
- Principles: lawfulness, fairness and transparency; purpose limitation; data minimisation; accuracy; storage limitation; integrity and confidentiality (security); and accountability.
- A personal data breach likely to risk people's rights must be reported to the **Information Commissioner's Office (ICO)** within 72 hours of becoming aware of it.
- Where the risk is high, the people affected must also be told without undue delay.
- As at 2026 the higher maximum fine is £17.5 million or 4% of worldwide annual turnover, whichever is greater.
X: A mandate fraud attempt.
> The accounts payable clerk receives an email, apparently from a regular supplier, giving new bank details.
> Procedure requires her to phone the supplier on the number in the supplier master file.
> The supplier confirms it has not changed its bank account; the email came from a spoofed address.
> The change is rejected, the email is reported to IT and staff are warned about the attempt.
K: Finance functions face phishing, mandate fraud, ransomware and insider threats, which are reduced by controls such as Cyber Essentials, multi-factor authentication, call-back checks and backups, while UK GDPR requires personal data to be handled on its seven principles and serious breaches reported to the ICO within 72 hours.
!: Thinking cyber security is purely an IT matter. Many losses come from staff acting on fraudulent emails, so finance procedures such as independent call-back verification are key controls.
EV: established | Most successful cyber attacks on organisations involve a human element such as phishing or stolen credentials, according to repeated UK government Cyber Security Breaches Surveys.
T: Mandate fraud | Tricking an organisation into changing a payee's bank details so that payments go to a fraudster
T: Ransomware | Malicious software that encrypts systems or data and demands payment for their release
T: Data minimisation | The principle that only personal data adequate, relevant and necessary for the purpose should be held
SUM: People are the main target.
SUM: Call back on a known number.
SUM: Report serious breaches within 72 hours.
SRC: Information Commissioner's Office, Guide to the UK GDPR | guidance | 2024 | https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/
SRC: National Cyber Security Centre, Cyber Essentials: requirements for IT infrastructure | guidance | 2025 | https://www.ncsc.gov.uk/cyberessentials/overview
SRC: Department for Science, Innovation and Technology, Cyber Security Breaches Survey 2025 | data | 2025 | https://www.gov.uk/government/collections/cyber-security-breaches-survey
Q: Within what period must a reportable personal data breach be notified to the ICO? | Within 72 hours of becoming aware of it.
Q: Name the five technical controls in Cyber Essentials. | Firewalls, secure configuration, user access control, malware protection and security update management.
M1#finance-u12-04-q1@1: An email that tricks a member of staff into entering their password on a fake website is | Phishing | Ransomware | Data minimisation | A gap test | Applying the standard result: Phishing uses deceptive messages to steal credentials or install malware.
M2#finance-u12-04-q2@2: An email from a "supplier" asks for future payments to go to a new account. What is the best control? | Phone the supplier on a number already on file | Reply to the email asking for confirmation | Pay half to each account until confirmed | Check the email's spelling for mistakes | Fraudsters control the email thread, so verification must use an independent, known contact.
M3#finance-u12-04-q3@3: A laptop holding unencrypted payroll data for 2,000 staff is stolen. What does UK GDPR most likely require? | Report to the ICO within 72 hours and tell the staff affected | Report to HMRC within 30 days and change the payroll software | Record the loss internally but report nothing outside the firm | Report to the police only and wait for them to inform staff | Unencrypted salary and personal details pose a high risk, triggering ICO and individual notification.
NUM3#finance-u12-04-q4@2: Under UK GDPR as at 2026, the higher maximum fine is £17.5m or 4% of worldwide annual turnover, whichever is greater. What is the maximum for a group with turnover of £800m, in £m? | 32 | 0.1 | £m | 4% × £800m = £32m, which exceeds £17.5m, so the maximum is £32m.
SA2#finance-u12-04-q5@1,2: Explain how a finance department can reduce the risk of losses from cyber attacks. | The department should combine technical, procedural and human controls. Technical controls include the Cyber Essentials measures, such as firewalls, secure configuration, access control, malware protection and patching, plus multi-factor authentication and tested backups kept separate from the network. Procedures should require any change of bank details to be verified by calling the supplier on a known number, with segregation of duties over payments. Staff need regular training, including simulated phishing, and an incident response plan should set out how to contain an attack and meet breach reporting duties. | Technical controls ; Multi-factor authentication and backups ; Call-back verification ; Training ; Incident response

## The history of accounting
LV: Intermediate · Foundation
S: Accounting has developed over thousands of years in response to trade, industry and regulation. This lesson traces key stages from ancient record keeping and double entry to the rise of the profession and international standards.
O: Describe early forms of accounting and the emergence of double entry
O: Explain how industrialisation and company law shaped accounting in Britain
O: Outline the development of accounting standards and the profession
PRE: The principles of double entry
H: From clay tokens to double entry
P: Some of the earliest known writing in Mesopotamia records quantities of goods such as grain and livestock, which suggests that **record keeping** helped drive the development of writing itself. Roman estates and medieval manors kept **charge and discharge** accounts, in which a steward accounted to the owner for what he had received and paid out. **Double-entry bookkeeping** emerged among merchants in northern Italy in the 13th and 14th centuries; the accounts of the Commune of Genoa from 1340 are an early complete example. In 1494 the Franciscan friar **Luca Pacioli** published Summa de arithmetica, geometria, proportioni et proportionalita in Venice, including a treatise on the "Venetian method" that is the first printed description of double entry and spread it across Europe.
H: Industry, railways and company law
- The industrial revolution needed **cost accounting**: Josiah Wedgwood analysed production costs at his potteries in the 1770s.
- Railways required huge capital and raised questions about depreciation and capital versus revenue spending.
- The **Joint Stock Companies Act 1844** introduced registration of companies, and the **Limited Liability Act 1855** gave shareholders limited liability.
- The **Companies Act 1862** consolidated company law; later Acts made audit and published accounts compulsory.
- Bankruptcy and insolvency work created demand for professional accountants.
H: The profession and standards
- The **Society of Accountants in Edinburgh** received a royal charter in 1854, and **ICAEW** was chartered in 1880.
- After accounting scandals in the late 1960s, UK standard setting began in 1970 with what became the Accounting Standards Committee.
- The **Accounting Standards Board** replaced it in 1990, and the FRC took over its role in 2012.
- The **International Accounting Standards Committee** was founded in 1973 and replaced by the **IASB** in 2001.
- From 2005, EU listed groups, including UK ones, had to use **IFRS** in their consolidated accounts.
X: Dating the key developments.
> 1494: Pacioli prints the first description of double entry in Venice.
> 1854: Edinburgh accountants receive the first royal charter for an accountancy body.
> 1862: the Companies Act consolidates British company law.
> 2005: UK listed groups adopt IFRS for consolidated financial statements.
K: Accounting grew from ancient records and stewardship accounts to Italian double entry, described in print by Pacioli in 1494, then developed through industrial costing and British company law into a chartered profession and, from the 1970s, national and international standard setting.
!: Saying Pacioli invented double entry. He described a method that Italian merchants were already using; earlier double-entry records, such as Genoa's 1340 accounts, survive.
EV: established | Double-entry bookkeeping was in use in northern Italy before Pacioli's 1494 treatise, which was its first printed description.
EV: contested | Historians disagree about how far double entry contributed to the rise of capitalism, as Sombart claimed in the early 20th century.
T: Charge and discharge accounting | A stewardship system in which an agent accounts to an owner for what was received and paid out
T: Summa de arithmetica | Pacioli's 1494 mathematics text containing the first printed description of double entry
T: Limited liability | The rule that shareholders' losses are limited to the amount they invested
SUM: Records helped drive writing.
SUM: Pacioli described, not invented.
SUM: Company law created the profession.
SRC: Edwards J. R., A History of Financial Accounting, Routledge | secondary | 1989
SRC: Sangster A., The genesis of double entry bookkeeping, The Accounting Review, 91(1), 299–315 | primary | 2016
SRC: Edwards J. R. and Walker S. P. (eds), The Routledge Companion to Accounting History, Routledge | secondary | 2009
Q: Who published the first printed description of double entry, and when? | Luca Pacioli, in 1494 in Venice.
Q: When did the IASB replace the IASC? | In 2001.
M1#finance-u12-05-q1@1: Luca Pacioli's Summa de arithmetica of 1494 is important because it | Was the first printed description of double entry | Introduced limited liability for companies | Created the first professional accountancy body | Set the first international accounting standards | Applying the standard result: Pacioli spread the Venetian method across Europe in print.
M2#finance-u12-05-q2@2: Why did railway companies in the 19th century raise new accounting questions? | Their vast long-lived assets raised capital and depreciation issues | They were the first companies to sell goods on credit | They were exempt from all company law requirements | They were the first organisations to employ any clerks | Huge investment in track and rolling stock made the capital versus revenue distinction critical.
M3#finance-u12-05-q3@3: Why is it more accurate to say Pacioli codified rather than invented double entry? | Italian merchants used double entry before 1494, as Genoa's 1340 accounts show | Pacioli's treatise described only charge and discharge accounts for estates | Double entry was first used by British railway companies in the 1840s | Pacioli's text was not published until after the Companies Act 1862 | Surviving earlier ledgers prove the method predates his book.
SEQ2#finance-u12-05-q4@3: Put these developments in date order, earliest first. | Pacioli's treatise on double entry ; Royal charter for the Society of Accountants in Edinburgh ; Founding of the International Accounting Standards Committee ; EU listed groups required to use IFRS | 1494, 1854, 1973 and 2005 in that order.
SA2#finance-u12-05-q5@2,3: Explain how industrialisation and company law in 19th-century Britain shaped modern accounting. | Industrialisation created large factories and railways needing long-term capital and cost control, so firms such as Wedgwood developed cost accounting and railways confronted depreciation and the split between capital and revenue spending. Company law from the Joint Stock Companies Act 1844, the Limited Liability Act 1855 and the Companies Act 1862 allowed many investors to fund companies with limited liability. Separating owners from managers increased the need for published accounts and audit to protect shareholders and creditors. Demand for audit, insolvency and accounting work led to chartered professional bodies in Edinburgh in 1854 and ICAEW in 1880. | Cost accounting ; Railways and capital ; Company law and limited liability ; Separation of ownership and audit ; Professional bodies

## Accounting theory
LV: Intermediate · Analysis
S: Accounting theory tries to explain and guide accounting practice. This lesson compares normative and positive theories, explains agency-based positive accounting theory and introduces social theories such as legitimacy and stakeholder theory.
O: Distinguish normative and positive accounting theories
O: Explain positive accounting theory and its three main hypotheses
O: Apply legitimacy, stakeholder and institutional theory to corporate reporting
PRE: The Conceptual Framework for Financial Reporting
H: Normative and positive theory
P: A **normative theory** says how accounting **ought** to be done, starting from assumed objectives. Examples include arguments for current cost or **current purchasing power** accounting in the inflationary 1960s and 1970s, and the IASB's **Conceptual Framework**, which prescribes useful information for investors. A **positive theory** tries to **explain and predict** what accountants and managers actually do. From the 1960s, empirical work such as **Ball and Brown (1968)**, which showed share prices respond to earnings news, encouraged a positive approach. **Watts and Zimmerman** developed **positive accounting theory** in 1978 and in their 1986 book, using economics and **agency theory** to explain managers' choices of accounting policies.
H: Positive accounting theory
- Builds on **agency theory** (Jensen and Meckling, 1976): managers (agents) may not act in owners' (principals') interests, so contracts and monitoring arise.
- **Bonus plan hypothesis**: managers paid on reported profit prefer policies that bring profit forward.
- **Debt covenant hypothesis**: firms close to breaching loan covenants choose policies that increase profit or assets.
- **Political cost hypothesis**: large, visible firms choose policies that reduce reported profit to avoid political attention.
- Critics say it assumes everyone is self-interested and that it describes without saying what is good.
H: Social and institutional theories
- **Legitimacy theory**: organisations disclose information to show they meet society's expectations, especially after a crisis.
- **Stakeholder theory**: reporting responds to the stakeholders with the most power over the organisation, or should serve all stakeholders.
- **Institutional theory**: organisations copy common practices through coercive, mimetic and normative pressures.
- These theories help explain voluntary disclosures such as sustainability reports.
- They are often used together because they overlap.
X: Predicting a policy choice.
> A company's loan agreement requires gearing below 50%, and gearing is now 49%.
> Directors can choose to revalue property upwards, increasing equity and reducing gearing.
> The debt covenant hypothesis predicts they will choose the revaluation.
> A normative theorist would instead ask whether revaluation gives the most useful information to users.
K: Normative theories prescribe how accounting should be done while positive theories explain and predict practice; positive accounting theory uses agency costs to predict policy choices through the bonus, debt covenant and political cost hypotheses, and legitimacy, stakeholder and institutional theories explain disclosures as responses to social pressures.
!: Treating positive theory as more "correct" than normative theory. They answer different questions: positive theory explains what happens, and normative theory argues about what should happen.
EV: established | Watts and Zimmerman's positive accounting theory predicts that managers' accounting choices are influenced by bonus contracts, debt covenants and political costs.
EV: contested | Critics argue positive accounting theory is not value-free, because its assumption of self-interested behaviour is itself a normative stance.
T: Normative theory | A theory that prescribes how accounting ought to be done
T: Positive accounting theory | A theory that explains and predicts accounting choices using economic self-interest and agency costs
T: Legitimacy theory | The view that organisations disclose information to show they conform to society's expectations
SUM: Ought versus is.
SUM: Bonus, debt, political cost.
SUM: Disclosure seeks legitimacy.
SRC: Watts R. L. and Zimmerman J. L., Towards a positive theory of the determination of accounting standards, The Accounting Review, 53(1), 112–134 | primary | 1978
SRC: Jensen M. C. and Meckling W. H., Theory of the firm: managerial behavior, agency costs and ownership structure, Journal of Financial Economics, 3(4), 305–360 | primary | 1976
SRC: Godfrey J., Hodgson A., Tarca A., Hamilton J. and Holmes S., Accounting Theory, 7th edition, Wiley | secondary | 2010
Q: What does a positive accounting theory try to do? | Explain and predict actual accounting practice.
Q: State the three hypotheses of positive accounting theory. | The bonus plan, debt covenant and political cost hypotheses.
M1#finance-u12-06-q1@1: A theory that sets out how accounting ought to be done is called | Normative | Positive | Empirical | Institutional | Applying the standard result: Normative theories prescribe rather than describe.
M2#finance-u12-06-q2@2: According to the political cost hypothesis, a very large and visible company is likely to | Choose policies that reduce reported profit | Choose policies that increase reported profit | Avoid disclosing any segment information at all | Switch auditors every year to reduce fees | Lower reported profits attract less political and regulatory attention.
M3#finance-u12-06-q3@3: After a fatal pollution incident, a chemical company greatly expands its environmental disclosures. Which theory best explains this? | Legitimacy theory | The bonus plan hypothesis | The debt covenant hypothesis | Capital maintenance theory | The company seeks to restore its legitimacy by showing it meets society's expectations.
MATCH2#finance-u12-06-q4@2: Match each theory or hypothesis to its prediction. | Bonus plan hypothesis = Managers bring profit forward to raise pay ; Debt covenant hypothesis = Firms near loan limits boost reported profit or assets ; Political cost hypothesis = Large visible firms lower reported profit ; Institutional theory = Firms copy common reporting practices | Each theory predicts behaviour from a different pressure.
SA2#finance-u12-06-q5@2,3: Compare positive accounting theory and legitimacy theory as explanations of corporate reporting choices. | Positive accounting theory, from Watts and Zimmerman, assumes managers act in their own economic interest and uses agency costs to predict choices, through the bonus plan, debt covenant and political cost hypotheses. It is mainly concerned with accounting policy choices and has been tested empirically. Legitimacy theory instead sees organisations as needing society's approval and explains voluntary disclosures, such as environmental reports after a scandal, as attempts to show they meet social expectations. Positive theory is criticised for narrow assumptions of self-interest, while legitimacy theory is criticised for being hard to test, so the two are often seen as complementary. | Self-interest and agency ; Three hypotheses ; Social approval and disclosure ; Criticisms ; Complementary use

## Critical perspectives on accounting
LV: Intermediate · Evaluation
S: Critical accounting research argues that accounting is not a neutral technical activity but shapes organisations and society. This lesson introduces the main critical ideas, key studies and the debate about their value for practice.
O: Explain why critical scholars argue that accounting is not neutral
O: Describe key critical studies and the ideas behind them
O: Evaluate the contribution of critical perspectives to accounting practice
PRE: Accounting theory
H: Accounting as a social practice
P: Mainstream accounting presents itself as a **neutral, technical** way of measuring economic reality. **Critical perspectives** challenge this. Anthony **Hopwood** (1983) urged researchers to study accounting "in the contexts in which it operates", showing how it shapes what organisations see and value. Ruth **Hines** (1988) argued that "in communicating reality, we construct reality": by choosing what to count as an asset, a cost or profit, accountants help decide what is real and important. Critical writers ask **whose interests** accounting serves, what it leaves out, such as unpaid work or environmental damage, and how numbers give power to some groups over others. This work is published in journals such as Accounting, Organizations and Society (founded 1976), the Accounting, Auditing and Accountability Journal (1988) and Critical Perspectives on Accounting (1990).
H: Main critical approaches
- **Political economy** and **Marxist** approaches (for example Tinker, 1980) see accounting as reflecting and reinforcing conflicts between capital and labour.
- **Foucauldian** studies, such as Miller and O'Leary (1987), show how standard costing and budgets made workers visible and **governable** as individuals.
- **Labour process** studies link management accounting to control of work.
- **Feminist** perspectives examine gender in the profession and what accounting values or ignores.
- **Social and environmental accounting** argues for accounts of impacts on society and nature.
H: What it means for practice
- Reminds accountants that measures affect behaviour: what gets measured gets managed.
- Encourages questioning which stakeholders a report serves.
- Has informed debates on sustainability reporting, public sector targets and tax justice.
- Critics say it is often abstract, hard to test and offers few practical alternatives.
- Supporters reply that understanding effects is a precondition for reform.
X: A target that changes behaviour.
> A hospital trust is judged on the percentage of patients seen within four hours.
> Managers move patients into a separate assessment area just before the deadline to stop the clock.
> The reported figure improves, but care does not.
> A critical perspective shows the measure has shaped behaviour and constructed a version of "performance".
K: Critical perspectives argue that accounting constructs rather than simply reflects reality, serves some interests over others and makes people governable, drawing on Marxist, Foucauldian, labour process and feminist ideas, and although criticised as abstract they help accountants see how measures shape behaviour and whom reports serve.
!: Thinking critical accounting rejects accounting altogether. Most critical scholars aim to make accounting more accountable and aware of its effects, not to abolish it.
EV: established | Studies such as Hopwood (1983) and Miller and O'Leary (1987) show that accounting practices shape organisational behaviour rather than merely recording it.
EV: contested | Whether critical accounting research has had a meaningful influence on practice and standard setting remains debated.
T: Critical accounting | Research that questions the neutrality of accounting and examines its social and political effects
T: Governable person | Miller and O'Leary's idea that costing and budgets make individuals visible and controllable
T: Social construction | The idea that accounts help create the reality they claim to describe
SUM: Accounting is not neutral.
SUM: Numbers make people governable.
SUM: Measures shape behaviour.
SRC: Hopwood A. G., On trying to study accounting in the contexts in which it operates, Accounting, Organizations and Society, 8(2/3), 287–305 | primary | 1983
SRC: Hines R. D., Financial accounting: in communicating reality, we construct reality, Accounting, Organizations and Society, 13(3), 251–261 | primary | 1988
SRC: Miller P. and O'Leary T., Accounting and the construction of the governable person, Accounting, Organizations and Society, 12(3), 235–265 | primary | 1987
Q: Who argued that "in communicating reality, we construct reality"? | Ruth Hines, in 1988.
Q: What did Miller and O'Leary argue about standard costing? | That it made individual workers visible and governable.
M1#finance-u12-07-q1@1: The central claim of critical perspectives on accounting is that accounting | Is not a neutral technical activity | Should be replaced by cash records only | Must always use historical cost | Is purely a matter for regulators | Applying the standard result: Critical scholars argue accounting shapes and reflects social interests.
M2#finance-u12-07-q2@2: A Foucauldian study of standard costing would most likely focus on how it | Made individual workers visible and controllable | Reduced the cost of raw materials over time | Complied with the Companies Act 1862 | Improved the accuracy of inventory counts | Foucauldian work examines how calculation creates power over individuals.
M3#finance-u12-07-q3@3: Which is the strongest criticism usually made of critical accounting research? | It is abstract and offers few practical alternatives | It relies only on large statistical samples | It assumes all managers are self-interested | It ignores the social effects of accounting | Critics argue it explains effects well but rarely proposes workable reforms.
TF1#finance-u12-07-q4@2: Hopwood argued that accounting should be studied in the organisational and social contexts in which it operates. | true | Hopwood's 1983 paper called for research on accounting in context rather than as a neutral technique.
SA2#finance-u12-07-q5@1,3: Evaluate the claim that accounting simply reflects economic reality. | Mainstream accounting presents numbers as neutral measures, but critical scholars such as Hines argue that by deciding what counts as assets, costs and profit, accounting helps construct the reality it reports. Studies like Miller and O'Leary show that techniques such as standard costing changed how workers were managed, and targets can drive behaviour that improves figures without improving outcomes. Accounting also leaves out things such as environmental damage and unpaid work. However, accounting is constrained by real transactions and standards, so it is better seen as partly reflecting and partly shaping reality. | Neutral measurement view ; Hines and construction ; Behavioural effects ; Omissions ; Balanced conclusion

## Public sector accounting
LV: Intermediate · Application
S: Government bodies account for taxpayers' money under rules adapted from IFRS. This lesson explains how UK central and local government report, who audits them and how accountability to Parliament and the public works.
O: Explain the purposes of public sector accounting and how they differ from the private sector
O: Describe the UK frameworks for central and local government reporting
O: Explain the roles of the National Audit Office and the Public Accounts Committee
PRE: Performance in not-for-profit organisations
H: Why public sector accounting is different
P: Public bodies are funded mainly by **taxation** rather than by investors, and their aim is to deliver services, not profit. Their accounts therefore focus on **stewardship** and **accountability**: showing that money voted by Parliament or a council has been spent as authorised, and that services give **value for money**. Since the **Government Resources and Accounts Act 2000**, UK central government has used **accruals-based resource accounting** rather than cash accounting. Departments follow the **Government Financial Reporting Manual (FReM)**, issued by **HM Treasury**, which applies **IFRS** adapted and interpreted for the public sector. Internationally, many governments use **IPSAS**, issued by the International Public Sector Accounting Standards Board, but the UK generally bases its rules on IFRS instead.
H: UK reporting frameworks
- Central government departments publish an **annual report and accounts** under the FReM.
- A **Statement of Outturn against Parliamentary Supply** compares spending with the amounts Parliament voted.
- **Whole of Government Accounts** consolidate about 10,000 public bodies into one set of accounts for the UK public sector.
- Local authorities in England follow the **CIPFA/LASAAC Code of Practice on Local Authority Accounting**, also based on IFRS.
- The NHS, academies and other bodies have their own adapted manuals.
H: Audit and accountability
- The **Comptroller and Auditor General**, supported by the **National Audit Office (NAO)**, audits central government accounts.
- The NAO also produces **value for money** reports on economy, efficiency and effectiveness.
- The Commons **Public Accounts Committee** examines NAO reports and questions departmental **accounting officers**, usually permanent secretaries.
- Local authority accounts in England are audited by firms appointed through Public Sector Audit Appointments.
- Serious delays in local audit led to statutory backstop dates for publishing audited accounts from 2024.
X: Comparing outturn with the vote.
> Parliament votes a department £4.0bn of resource spending for the year.
> The department's outturn is £4.15bn.
> The Statement of Outturn shows an excess of £0.15bn over the authorised limit.
> The C&AG qualifies the regularity opinion, and the Public Accounts Committee questions the accounting officer.
K: Public sector accounting stresses stewardship, authorised spending and value for money; UK central government uses IFRS adapted by the FReM and local government the CIPFA/LASAAC Code, with the NAO auditing central government and the Public Accounts Committee holding accounting officers to account.
!: Assuming public bodies use IPSAS. UK central and local government base their accounts on IFRS as adapted by the FReM and the CIPFA/LASAAC Code, not on IPSAS.
EV: established | UK central government has prepared accruals-based resource accounts since the early 2000s, with HM Treasury's FReM applying IFRS adapted for the public sector.
T: Financial Reporting Manual | HM Treasury's guide applying adapted IFRS to UK government bodies
T: Accounting officer | The official, usually a permanent secretary, personally answerable to Parliament for a body's spending
T: Whole of Government Accounts | Consolidated accounts covering the whole UK public sector
SUM: Stewardship and value for money.
SUM: FReM adapts IFRS.
SUM: NAO audits; PAC questions.
SRC: HM Treasury, Government Financial Reporting Manual 2025–26 | guidance | 2025 | https://www.gov.uk/government/collections/government-financial-reporting-manual-frem
SRC: CIPFA/LASAAC, Code of Practice on Local Authority Accounting in the United Kingdom 2025/26 | standard | 2025
SRC: National Audit Office, About us | guidance | 2025 | https://www.nao.org.uk/about-us/
Q: Who issues the FReM? | HM Treasury.
Q: Who audits UK central government accounts? | The Comptroller and Auditor General, supported by the National Audit Office.
M1#finance-u12-08-q1@1: Which set of rules do UK central government departments follow to prepare their accounts? | The Government Financial Reporting Manual | The Charities SORP | IPSAS without adaptation | The CIPFA/LASAAC Code only | Applying the standard result: The FReM applies adapted IFRS to central government.
M2#finance-u12-08-q2@2: Which statement in a UK department's annual report compares spending with amounts voted by Parliament? | The Statement of Outturn against Parliamentary Supply | The statement of changes in taxpayers' equity | The strategic report on value for money | The Whole of Government Accounts summary | It shows whether spending stayed within the limits Parliament authorised.
M3#finance-u12-08-q3@3: Why do public sector accounts stress stewardship and authorised spending rather than profit? | They report on the use of tax money to deliver services | They have no assets or liabilities to measure | Profit figures are banned by the Companies Act 2006 | Public bodies never prepare accruals-based accounts | Taxpayers and Parliament need to know money was used as authorised and well.
MATCH2#finance-u12-08-q4@2: Match each body to its role. | HM Treasury = Issues the Financial Reporting Manual ; National Audit Office = Audits central government accounts ; Public Accounts Committee = Questions accounting officers on spending ; CIPFA/LASAAC = Sets the local authority accounting code | Each body plays a different part in public sector accountability.
SA2#finance-u12-08-q5@1,3: Explain how UK central government is held to account for its spending. | Parliament votes departments limits on spending, and each department prepares accruals-based accounts under the FReM, including a Statement of Outturn against Parliamentary Supply. The Comptroller and Auditor General, supported by the NAO, audits these accounts, giving an opinion on truth and fairness and on regularity, and also reports on value for money. The Public Accounts Committee examines NAO findings and questions accounting officers, who are personally answerable for their department's spending. Whole of Government Accounts add a consolidated picture of the public sector. | Parliamentary votes ; FReM accounts and outturn ; NAO audit and regularity ; Value for money ; PAC and accounting officers

## Charity accounting
LV: Intermediate · Application
S: Charities must show donors and regulators how funds have been raised and spent. This lesson explains the Charities SORP, fund accounting, the Statement of Financial Activities and the rules on audit and independent examination in England and Wales.
O: Describe the regulatory framework for charity accounts in the UK
O: Distinguish restricted, unrestricted and endowment funds
O: Apply fund accounting and the scrutiny thresholds to simple cases
PRE: Performance in not-for-profit organisations
H: The framework
P: UK charities that prepare accruals accounts follow the **Charities SORP (FRS 102)**, a Statement of Recommended Practice issued jointly by the **Charity Commission for England and Wales** and the **Office of the Scottish Charity Regulator**, working with the Charity Commission for Northern Ireland. The SORP applies **FRS 102**, the UK accounting standard, to charities. A new edition, the **Charities SORP 2026**, applies to reporting periods beginning on or after **1 January 2026**. In England and Wales the main law is the **Charities Act 2011**; charitable companies must also follow the Companies Act 2006. Trustees are responsible for preparing a **trustees' annual report** and accounts, and for showing that funds are used for the charity's **purposes**. Smaller unincorporated charities may prepare simpler **receipts and payments** accounts instead of accruals accounts.
H: Fund accounting
- **Unrestricted funds** can be spent on any of the charity's purposes at the trustees' discretion.
- **Designated funds** are unrestricted funds that trustees have set aside for a purpose; they can be undesignated.
- **Restricted funds** must be spent on purposes specified by the donor or appeal.
- **Endowment funds** must be kept as capital: **permanent endowment** cannot normally be spent, while **expendable endowment** can be converted to income.
- The **Statement of Financial Activities (SoFA)** shows income and expenditure analysed by fund.
- The balance sheet and notes show the funds held at the year end.
H: Scrutiny thresholds in England and Wales
- As at 2025, an **audit** is required if gross income exceeds £1 million, or if gross assets exceed £3.26 million and gross income exceeds £250,000.
- Below this, an **independent examination** is required if gross income exceeds £25,000.
- If gross income exceeds £250,000 the independent examiner must be suitably qualified, such as a member of a listed professional body.
- Charitable companies may also be subject to company law audit requirements.
- Thresholds change from time to time, so always check current Charity Commission guidance.
X: Tracking a restricted fund.
> A charity starts the year with £40,000 in a restricted fund for a children's library.
> It receives a further £25,000 of donations for the library and spends £30,000 on books and staff for it.
> The closing balance on the restricted fund is 40,000 + 25,000 − 30,000 = £35,000.
> The £35,000 can only be spent on the library; it cannot pay general running costs.
K: UK charities follow the Charities SORP under FRS 102, with the 2026 edition applying from 1 January 2026, and must account separately for unrestricted, designated, restricted and endowment funds in the Statement of Financial Activities, while size thresholds decide whether accounts need an audit or an independent examination.
!: Spending restricted funds on general costs because the charity is short of cash. Restricted funds must be used for the donor's stated purpose; misusing them is a breach of trust.
EV: established | Fund accounting under the Charities SORP requires charities to show restricted and unrestricted funds separately so donors can see that restrictions have been respected.
T: Restricted fund | Money that must be spent on the purpose specified by the donor
T: Statement of Financial Activities | The charity's primary statement of income and expenditure analysed by fund
T: Independent examination | A lighter form of external scrutiny than audit for smaller charities
SUM: SORP applies FRS 102 to charities.
SUM: Restricted means donor-specified.
SUM: Size sets audit or examination.
SRC: Charity Commission for England and Wales and OSCR, Charities SORP (FRS 102), 2026 edition | standard | 2025 | https://www.charitysorp.org
SRC: Charity Commission, Charity reporting and accounting: the essentials (CC15d) | guidance | 2024 | https://www.gov.uk/government/organisations/charity-commission
SRC: Charities Act 2011 | primary | 2011 | https://www.legislation.gov.uk/ukpga/2011/25/contents
Q: Which statement shows a charity's income and expenditure by fund? | The Statement of Financial Activities.
Q: What is a designated fund? | An unrestricted fund that trustees have set aside for a particular purpose.
M1#finance-u12-09-q1@1: Donations received for a specific appeal to repair a church roof are | Restricted funds | Designated funds | Permanent endowment | General unrestricted funds | Applying the standard result: Money given for a stated purpose is restricted to it.
M2#finance-u12-09-q2@2: Trustees set aside £50,000 of general funds for a future building project. How should it be shown? | As a designated fund within unrestricted funds | As a restricted fund for the building project | As permanent endowment that cannot be spent | As a liability owed to future donors | The trustees' own decision designates the money but it stays unrestricted.
M3#finance-u12-09-q3@3: In England and Wales as at 2025, a non-company charity has gross income of £600,000 and gross assets of £4 million. What external scrutiny is required? | An audit, because assets exceed £3.26m and income exceeds £250,000 | An independent examination, because income is below £1 million | No external scrutiny, because the charity is not a company | A review by HMRC, because the charity claims Gift Aid | The asset test applies once income exceeds £250,000, so an audit is required.
NUM2#finance-u12-09-q4@3: A restricted fund opens at £18,000, receives £12,500 and spends £21,000 in the year. What is its closing balance, in £? | 9500 | 1 | £ | 18,000 + 12,500 − 21,000 = £9500 left in the restricted fund at the year end.
SA2#finance-u12-09-q5@2,3: Explain why charities use fund accounting and how it protects donors. | Donors often give money for specific purposes, so charities must track funds by type to show that restrictions are respected. Unrestricted funds can be used for any charitable purpose, designated funds are earmarked by trustees but remain unrestricted, restricted funds must be used as the donor specified, and endowments must be kept as capital. The Statement of Financial Activities and notes show income, spending and balances for each fund. This lets donors and regulators check that trustees have not used restricted money for general costs, supporting trust in the charity. | Purpose-specific gifts ; Types of fund ; SoFA by fund ; Accountability to donors and regulators

## Sustainability and integrated reporting
LV: Intermediate · Application
S: Investors and regulators now expect companies to report on climate and other sustainability matters. This lesson explains the ISSB standards and UK requirements, integrated reporting and its six capitals, and how emissions are measured and disclosed.
O: Describe the main sustainability reporting frameworks and UK requirements
O: Explain integrated reporting and the six capitals
O: Calculate and interpret simple emissions metrics
PRE: Narrative reporting and the strategic report
H: The reporting landscape
P: Sustainability reporting has moved from voluntary reports to formal standards. In June 2023 the **International Sustainability Standards Board (ISSB)**, part of the IFRS Foundation, issued **IFRS S1** (general requirements for sustainability-related financial disclosures) and **IFRS S2** (climate-related disclosures). They build on the four pillars of the **Task Force on Climate-related Financial Disclosures (TCFD)**: **governance**, **strategy**, **risk management** and **metrics and targets**. ISSB standards use **financial materiality**: information about sustainability matters that could affect the company's cash flows, finance or cost of capital. The **Global Reporting Initiative (GRI)** focuses on **impact materiality**: the company's effects on people and the planet. The EU's Corporate Sustainability Reporting Directive uses **double materiality**, combining both.
H: UK requirements
- From 2021 the FCA required premium listed companies to make TCFD-aligned disclosures on a comply or explain basis, later extended to other listed issuers.
- From April 2022 large UK companies and LLPs must give climate-related financial disclosures in the strategic report under the Companies Act.
- In 2025 the UK government consulted on **UK Sustainability Reporting Standards** based on IFRS S1 and S2.
- The UK also introduced the FCA's **Sustainability Disclosure Requirements** and anti-greenwashing rule for financial products.
- Requirements are developing quickly, so dates and scope should always be checked against current FCA and government guidance.
H: Integrated reporting and emissions
- The **International Integrated Reporting Framework** (2013, revised 2021) explains how an organisation creates value over time.
- It describes six capitals: **financial, manufactured, intellectual, human, social and relationship**, and **natural**.
- **Scope 1** emissions are direct emissions from owned or controlled sources, such as company vehicles.
- **Scope 2** emissions come from purchased electricity, heat and steam.
- **Scope 3** emissions are all other indirect emissions in the value chain, often the largest share.
- Emissions are measured in **tonnes of carbon dioxide equivalent (tCO2e)**, following the GHG Protocol.
X: Calculating an emissions intensity ratio.
> A manufacturer reports Scope 1 emissions of 9,000 tCO2e and Scope 2 emissions of 3,000 tCO2e.
> Its revenue is £80 million.
> Scope 1 and 2 intensity = 12,000 ÷ 80 = 150 tCO2e per £m of revenue.
> If revenue rises to £100m with the same emissions, intensity falls to 120, even though total emissions are unchanged.
K: ISSB's IFRS S1 and S2 build on the TCFD pillars using financial materiality, UK companies already make climate disclosures under FCA rules and the Companies Act, integrated reporting explains value creation through six capitals, and emissions are reported by Scope 1, 2 and 3 in tCO2e.
!: Treating falling emissions intensity as falling emissions. Intensity ratios can improve simply because revenue grows, so absolute emissions should also be reported and assessed.
EV: established | IFRS S1 and S2, issued in 2023, are structured around the four TCFD pillars of governance, strategy, risk management, and metrics and targets.
EV: contested | Whether sustainability reporting should use financial materiality, as the ISSB does, or double materiality, as in the EU, remains debated.
T: Financial materiality | Information about sustainability matters that could affect a company's cash flows, finance or cost of capital
T: Six capitals | The financial, manufactured, intellectual, human, social and relationship, and natural resources in integrated reporting
T: Scope 3 emissions | Indirect greenhouse gas emissions in a company's value chain other than purchased energy
SUM: ISSB builds on TCFD.
SUM: Six capitals create value.
SUM: Report absolute and intensity.
SRC: IFRS Foundation, IFRS S2 Climate-related Disclosures | standard | 2023 | https://www.ifrs.org/issued-standards/ifrs-sustainability-standards-navigator/
SRC: IFRS Foundation, International Integrated Reporting Framework | standard | 2021 | https://www.integratedreporting.ifrs.org/
SRC: World Resources Institute and WBCSD, The Greenhouse Gas Protocol: A Corporate Accounting and Reporting Standard, revised edition | standard | 2004 | https://ghgprotocol.org/corporate-standard
Q: What are the four TCFD pillars? | Governance, strategy, risk management, and metrics and targets.
Q: Which scope covers emissions from purchased electricity? | Scope 2.
M1#finance-u12-10-q1@1: Emissions from a company's own delivery lorries are classified as | Scope 1 | Scope 2 | Scope 3 | Natural capital | Applying the standard result: Scope 1 covers direct emissions from sources the company owns or controls.
M2#finance-u12-10-q2@2: Which concept of materiality do the ISSB standards use? | Financial materiality | Impact materiality | Double materiality | Social materiality | ISSB disclosures focus on matters that could affect the company's prospects for investors.
M3#finance-u12-10-q3@3: A company's emissions intensity per £m of revenue falls by 20% while total emissions rise. What is the best interpretation? | Revenue grew faster than emissions, so absolute impact still increased | The company has met its net zero target ahead of schedule | Scope 3 emissions must have been excluded from the figures | The ratio proves the company's operations have become greener | Intensity can fall as sales rise even when the company emits more in total.
NUM2#finance-u12-10-q4@3: A company emits 7,500 tCO2e (Scopes 1 and 2) and has revenue of £60 million. What is its emissions intensity, in tCO2e per £m of revenue? | 125 | 0.5 | tCO2e per £m | 7,500 ÷ 60 = 125 tCO2e for each £1 million of revenue.
SA2#finance-u12-10-q5@1,2: Compare the ISSB standards and integrated reporting as approaches to reporting beyond financial statements. | The ISSB's IFRS S1 and S2 set disclosure requirements for sustainability-related risks and opportunities, building on the TCFD pillars and using financial materiality, so they focus on what investors need to assess the company's prospects. Integrated reporting is a principles-based framework explaining how an organisation creates value over time through six capitals: financial, manufactured, intellectual, human, social and relationship, and natural. The ISSB standards are more specific and are being adopted by regulators, including through proposed UK standards, while integrated reporting gives a broader narrative of the business model. Both are now under the IFRS Foundation and can be used together. | ISSB requirements and TCFD ; Financial materiality ; Six capitals and value creation ; Specific versus principles-based ; Complementary use

## Ethics and the public interest
LV: Intermediate · Evaluation
S: Accountants have a duty to act in the public interest, not only for their clients or employers. This lesson explains what the public interest means, how it applies to non-compliance with laws and whistleblowing, and how to approach ethical dilemmas.
O: Explain what acting in the public interest means for professional accountants
O: Describe the responsibilities for responding to non-compliance with laws and regulations and for whistleblowing
O: Apply an ethical decision-making framework to a dilemma
PRE: Professional ethics
H: The public interest
P: The IESBA Code, which the UK professional bodies' codes follow, states that a distinguishing mark of the accountancy profession is its acceptance of the responsibility to **act in the public interest**. The International Federation of Accountants (IFAC) defined the public interest in 2012 as "the net benefits derived for, and procedural rigor employed on behalf of, all society in relation to any action, decision or policy". In practice it means that investors, lenders, employees, taxpayers and the wider public rely on accountants' work, so accountants cannot simply do whatever a client or employer wants. Corporate collapses such as **Carillion** in 2018 showed how failures of judgement by directors, auditors and advisers can harm employees, pensioners, suppliers and public services.
H: Non-compliance and whistleblowing
- **NOCLAR** (non-compliance with laws and regulations) provisions, added to the IESBA Code in 2016, set out how accountants should respond when they discover breaches such as fraud or bribery.
- The accountant should understand the matter, discuss it with appropriate management or those charged with governance, and consider whether to disclose it to an appropriate authority.
- Some disclosures are required by law, such as suspicious activity reports under the Proceeds of Crime Act 2002.
- The **Public Interest Disclosure Act 1998** protects UK workers who make qualifying disclosures, known as **whistleblowing**, from detriment and unfair dismissal.
- Confidentiality is not absolute: it can be overridden by legal duty or where disclosure is in the public interest.
H: Making ethical decisions
- Establish the facts and identify the ethical issues and the people affected.
- Identify which fundamental principles are threatened.
- Consult the organisation's procedures, the professional body's helpline or a trusted colleague, keeping records.
- Consider the options and their consequences, including escalation within the organisation.
- If the matter cannot be resolved, consider disassociating from it or resigning, and whether external reporting is required.
X: A dilemma in industry.
> A management accountant is told by the finance director to delay recording £2m of supplier invoices until after the year end to meet a bonus target.
> This would misstate the accounts and breach integrity and objectivity.
> She raises it with the finance director, then with the audit committee chair, keeping notes.
> When it is not corrected she seeks advice from ICAEW's ethics helpline and considers a protected disclosure.
K: Accountants must act in the public interest, which means considering all those who rely on their work, responding to non-compliance with laws under the NOCLAR provisions, escalating concerns internally first and, where needed, reporting externally with whistleblowing protection, guided by a structured decision-making framework.
!: Believing confidentiality always prevents disclosure. Confidentiality can be overridden by a legal duty, such as money laundering reporting, or where the public interest justifies disclosure.
EV: established | The IESBA Code states that accepting responsibility to act in the public interest is a distinguishing mark of the accountancy profession.
EV: contested | How far accountants in business should go in reporting employers' wrongdoing externally, rather than resigning, remains debated.
T: Public interest | The net benefits to, and procedural rigour on behalf of, all society in relation to any action or decision
T: NOCLAR | Non-compliance with laws and regulations, and the Code's provisions on how accountants should respond to it
T: Whistleblowing | Disclosing wrongdoing in an organisation to someone who can act on it, protected in the UK by PIDA 1998
SUM: Society relies on accountants.
SUM: Escalate first, then consider disclosure.
SUM: Confidentiality has limits.
SRC: International Ethics Standards Board for Accountants, International Code of Ethics for Professional Accountants | standard | 2024 | https://www.ethicsboard.org/international-code-ethics-professional-accountants
SRC: IFAC, Policy Position 5: A Definition of the Public Interest | guidance | 2012
SRC: ICAEW, Code of Ethics | standard | 2024 | https://www.icaew.com/technical/ethics/icaew-code-of-ethics
Q: Which UK Act protects workers who blow the whistle? | The Public Interest Disclosure Act 1998.
Q: What does NOCLAR stand for? | Non-compliance with laws and regulations.
M1#finance-u12-11-q1@1: What distinguishes the accountancy profession according to the IESBA Code? | Accepting responsibility to act in the public interest | Always following the instructions of the client | Maximising profits for shareholders | Avoiding any form of disclosure | Applying the standard result: The public interest duty is central to the Code.
M2#finance-u12-11-q2@2: An accountant in business discovers that her company is paying bribes to win contracts. What should she normally do first? | Raise it with appropriate management or those charged with governance | Post the details on social media to warn the public | Ignore it because confidentiality to the employer is absolute | Resign immediately without telling anyone about it | The NOCLAR provisions start with internal escalation before external reporting.
M3#finance-u12-11-q3@3: Why did the Carillion collapse in 2018 strengthen arguments about the public interest role of accountants? | Its failure harmed employees, pensioners, suppliers and public services | It showed that auditors have no duty to shareholders | It proved that construction companies cannot be audited | It led to the abolition of the ICAEW Code of Ethics | The collapse affected many groups beyond shareholders who rely on accountants' work.
SEQ2#finance-u12-11-q4@3: Put these steps of an ethical decision-making process in a sensible order. | Establish the facts and those affected ; Identify the principles threatened ; Escalate and seek advice internally ; Consider external reporting or resigning if unresolved | Facts first, then principles, internal escalation and finally external steps.
SA2#finance-u12-11-q5@2,3: A finance director asks a management accountant to hide losses until after a share issue. Explain how she should respond. | She should establish the facts and recognise that hiding losses would mislead investors and threaten integrity, objectivity and professional behaviour. She should refuse to make misleading entries and raise the matter with the finance director, then escalate to the audit committee or board if it is not resolved, keeping records. She can seek confidential advice from her professional body. If the problem continues, she should consider whether there is a legal duty or public interest case for disclosure to an appropriate authority, which may be protected under PIDA 1998, and consider resigning. | Identify threats ; Refuse and raise concerns ; Escalate internally ; Seek advice ; External disclosure or resignation

## The accountancy profession and its qualifications
LV: Intermediate · Application
S: The UK has several professional accountancy bodies with different qualifications and specialisms. This lesson explains the main bodies, how the profession is regulated and the routes to becoming a qualified accountant.
O: Describe the main UK accountancy bodies and their qualifications
O: Explain how the accountancy profession is regulated in the UK
O: Compare routes into the profession and their requirements
PRE: The regulation of audit
H: The main bodies
P: The UK accountancy profession is unusual in having several major chartered bodies. The **Institute of Chartered Accountants of Scotland (ICAS)**, whose forerunner received a royal charter in 1854, and the **Institute of Chartered Accountants in England and Wales (ICAEW)**, chartered in 1880, award the CA and ACA qualifications and are traditionally linked with practice and audit. **Chartered Accountants Ireland** covers the island of Ireland. The **Association of Chartered Certified Accountants (ACCA)** offers the global ACCA qualification. The **Chartered Institute of Management Accountants (CIMA)** focuses on management accounting and, with the American Institute of CPAs, awards the CGMA designation. The **Chartered Institute of Public Finance and Accountancy (CIPFA)** specialises in the public sector. These six bodies form the **Consultative Committee of Accountancy Bodies (CCAB)**. The **Association of Accounting Technicians (AAT)** offers technician-level qualifications.
H: Regulation of the profession
- The title "accountant" is not protected in the UK, but "chartered accountant" and statutory audit are.
- Only firms registered with a **recognised supervisory body** (ICAEW, ICAS, ACCA or Chartered Accountants Ireland) may carry out statutory audits under the Companies Act 2006.
- The **Financial Reporting Council (FRC)** oversees these bodies for audit and inspects audits of public interest entities.
- The government has proposed replacing the FRC with a new **Audit, Reporting and Governance Authority (ARGA)**, but legislation had not been passed as at 2026.
- Professional bodies are also anti-money laundering supervisors, overseen by the FCA's **OPBAS**.
- Members must follow their body's code of ethics and complete continuing professional development.
H: Routes in
- **ICAEW ACA**: 15 exam modules and 450 days of practical work experience over at least three years, usually with a training firm.
- **ACCA**: up to 13 exams, an Ethics and Professional Skills module and 36 months of practical experience.
- **CIMA**: objective tests and case study exams at operational, management and strategic levels, plus experience.
- Routes include graduate training contracts, apprenticeships and progression from AAT.
- Relevant degrees can give credit for some exams.
X: Choosing a qualification.
> A graduate wants to work in audit at a large firm: the ACA or ICAS CA with a training contract is a common route.
> A trainee in a manufacturing company's finance team wanting to become finance director might choose CIMA.
> Someone aiming for an NHS or local government finance role may choose CIPFA.
> A school leaver could start with AAT and progress to ACCA through an apprenticeship.
K: The UK profession is led by the six CCAB bodies (ICAEW, ICAS, Chartered Accountants Ireland, ACCA, CIMA and CIPFA), with AAT at technician level; statutory audit is restricted to firms registered with recognised supervisory bodies overseen by the FRC, and qualifications combine exams, ethics and practical experience.
!: Assuming anyone called an accountant is qualified and regulated. The title is unprotected, so clients should check membership of a professional body, especially for audit, which only registered firms can perform.
EV: established | Statutory audit in the UK can only be carried out by firms registered with a recognised supervisory body under the Companies Act 2006, overseen by the FRC.
T: CCAB | The Consultative Committee of Accountancy Bodies, linking the six main UK and Irish chartered bodies
T: Recognised supervisory body | A professional body authorised to register and supervise statutory auditors
T: Continuing professional development | Ongoing learning that members must undertake to maintain competence
SUM: Six chartered bodies plus AAT.
SUM: Audit is a restricted activity.
SUM: Exams, ethics and experience.
SRC: Financial Reporting Council, Professional oversight of the accountancy and actuarial professions | guidance | 2025 | https://www.frc.org.uk/
SRC: ICAEW, ACA qualification structure | guidance | 2025 | https://www.icaew.com/learning-and-development/aca
SRC: ACCA, ACCA qualification | guidance | 2025 | https://www.accaglobal.com/gb/en/qualifications/glance/acca.html
Q: Which body specialises in public sector accountancy? | CIPFA, the Chartered Institute of Public Finance and Accountancy.
Q: How many days of practical work experience does the ACA require? | 450 days, over at least three years.
M1#finance-u12-12-q1@1: Which body awards the ACA qualification? | ICAEW | ACCA | CIMA | CIPFA | Applying the standard result: ICAEW, chartered in 1880, awards the ACA.
M2#finance-u12-12-q2@2: Who oversees the recognised supervisory bodies for statutory audit in the UK? | The Financial Reporting Council | The Financial Conduct Authority | The Charity Commission | HM Revenue and Customs | The FRC oversees audit regulation by the professional bodies.
M3#finance-u12-12-q3@3: A small business owner hires someone who calls himself an accountant to audit the company. What is the main problem? | Only firms registered with a supervisory body may do statutory audits | Small companies must always be audited by the NAO | The title accountant may only be used by CIMA members | Audits must be carried out by HMRC officers | The unprotected title gives no right to sign a statutory audit report.
MATCH1#finance-u12-12-q4@2: Match each body to its main specialism. | CIMA = Management accounting in business ; CIPFA = Public sector finance ; ICAEW = Chartered accountancy, practice and audit ; AAT = Technician-level qualifications | Each body has a distinct traditional focus.
SA2#finance-u12-12-q5@2,3: Compare the ICAEW ACA and CIMA routes for someone choosing an accountancy career. | The ACA, from ICAEW, combines 15 exam modules with 450 days of practical experience over at least three years and is traditionally linked with audit and practice, giving access to registered auditor status. CIMA focuses on management accounting in business, with objective tests and case studies at operational, management and strategic levels, and leads to the CGMA designation. The ACA suits someone wanting to work in audit, tax or advisory firms, while CIMA suits someone aiming for a finance role inside a company. Both require ethics, experience and continuing professional development, and both are respected by employers. | ACA structure and experience ; Audit and practice link ; CIMA structure ; Career fit ; Shared requirements
`;
