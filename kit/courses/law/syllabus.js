// LawGradify: the full curriculum as schools and lessons. Each "* topic" becomes a lesson on the
// school's path; its notes are in notes/uNN.js (format: kit/course/notes.js). The course engine calls
// a school a "unit" internally (ids u01…u19); the pages say "School".
// Jurisdiction: England and Wales unless a lesson says otherwise. School 17 covers Scotland and
// Northern Ireland; most lessons also end with a short "Elsewhere in the UK" section.
export const SYLLABUS = `
1. Legal Foundations and the English Legal System
* What is law?
* The nature and purposes of law
* Sources of law
* Common law and equity
* Civil and criminal law
* Public and private law
* The English legal system
* Court structures and jurisdiction
* The hierarchy of courts
* The doctrine of precedent
* Ratio decidendi and obiter dicta
* Statutory interpretation
* Parliamentary sovereignty
* The rule of law
* Separation of powers
* Judicial independence
* Parliament and the legislative process
* Delegated legislation
* The judiciary
* Tribunals
* Alternative dispute resolution
* Legal institutions and regulators
* The legal profession
* Access to justice
* Legal aid
* Legal research and authority
* Case law analysis
* Legal citation and referencing
* Legal writing
* Introduction to legal argument
2. Constitutional and Administrative Law
* The UK constitution
* Constitutional conventions
* Constitutional statutes
* Parliamentary sovereignty
* The rule of law
* Separation of powers
* Executive power
* Royal prerogative
* Parliament and legislative scrutiny
* Devolution
* The UK Supreme Court
* Judicial independence
* Human rights and constitutional protection
* The Human Rights Act 1998
* The European Convention on Human Rights
* Judicial review
* Grounds of judicial review
* Illegality
* Irrationality
* Procedural impropriety
* Legitimate expectations
* Proportionality
* Standing
* Justiciability
* Remedies
* Administrative tribunals
* Public authorities
* Government accountability
* Constitutional reform
* Contemporary constitutional challenges
3. Contract Law
* Introduction to contract law
* Agreement and offer
* Acceptance
* Communication of acceptance
* Consideration
* Intention to create legal relations
* Certainty and completeness
* Contractual terms
* Express terms
* Implied terms
* Conditions, warranties and innominate terms
* Representations and terms
* Misrepresentation
* Fraudulent misrepresentation
* Negligent misrepresentation
* Innocent misrepresentation
* Duress
* Undue influence
* Mistake
* Illegality
* Privity of contract
* Exclusion clauses
* Unfair Contract Terms Act 1977
* Consumer Rights Act 2015
* Discharge by performance
* Breach of contract
* Anticipatory breach
* Frustration
* Contractual remedies
* Damages
* Specific performance
* Injunctions
* Restitution
* Third-party rights
* Consumer contracts
* Digital and electronic contracts
4. Tort Law
* Introduction to tort
* Negligence
* Duty of care
* Neighbour principle
* Foreseeability
* Breach of duty
* Standard of care
* Causation in fact
* Legal causation
* Remoteness of damage
* Novus actus interveniens
* Psychiatric injury
* Pure economic loss
* Professional negligence
* Occupiers' liability
* Employers' liability
* Vicarious liability
* Product liability
* Defamation
* Private nuisance
* Public nuisance
* Trespass to the person
* Assault
* Battery
* False imprisonment
* Trespass to land
* Defences
* Contributory negligence
* Voluntary assumption of risk
* Remedies and damages
5. Criminal Law
* Introduction to criminal liability
* Actus reus
* Mens rea
* Coincidence of actus reus and mens rea
* Causation
* Strict liability
* Attempts
* Secondary liability
* Joint enterprise
* Corporate criminal liability
* Homicide
* Murder
* Voluntary manslaughter
* Diminished responsibility
* Loss of control
* Involuntary manslaughter
* Gross negligence manslaughter
* Unlawful act manslaughter
* Non-fatal offences
* Assault and battery
* Actual bodily harm
* Grievous bodily harm
* Sexual offences
* Theft
* Robbery
* Burglary
* Fraud
* Criminal damage
* Defences
* Self-defence
* Insanity
* Automatism
* Intoxication
* Duress
* Necessity
* Consent
* Criminal attempts and inchoate offences
6. Criminal Law and Practice
* The criminal justice system
* Police powers
* Stop and search
* Arrest
* Detention and questioning
* Police interviews
* PACE
* Disclosure
* Bail
* Charging decisions
* Prosecution
* Magistrates' Court
* Crown Court
* Allocation of offences
* Plea and trial preparation
* Evidence
* Hearsay
* Confessions
* Identification evidence
* Bad character evidence
* Witnesses
* Expert evidence
* Trial procedure
* Sentencing
* Appeals
* Criminal legal aid
* Professional conduct in criminal practice
7. Land Law
* Introduction to land law
* Nature of land
* Estates in land
* Freehold estates
* Leasehold estates
* Legal and equitable interests
* Registered land
* Unregistered land
* Land registration
* Title investigation
* Co-ownership
* Joint tenancy
* Tenancy in common
* Severance
* Trusts of land
* Overreaching
* Easements
* Covenants
* Mortgages
* Proprietary estoppel
* Adverse possession
* Leases
* Licences
* Landlord and tenant relationships
* Priorities and third-party rights
* Restrictive covenants
* Freehold covenants
* Land disputes
* Property transactions
* Conveyancing fundamentals
8. Property Law and Practice
* Residential conveyancing
* Commercial conveyancing
* Client onboarding
* Identity verification
* Source of funds and source of wealth
* Anti-money laundering
* Instructions and client care
* Searches and enquiries
* Official copies and title documents
* Contract packages
* Raising enquiries
* Mortgage finance
* Exchange of contracts
* Completion
* Post-completion formalities
* Stamp Duty Land Tax
* Land Registry applications
* Leasehold transactions
* New-build property
* Remortgaging
* Transfers of equity
* Commercial leases
* Property taxation
* Professional conduct
* Solicitors' accounts in property transactions
9. Equity and Trusts
* Historical development of equity
* Equitable principles
* Trusts
* Express trusts
* Implied trusts
* Resulting trusts
* Constructive trusts
* Certainty of intention
* Certainty of subject matter
* Certainty of objects
* Constitution of trusts
* Trustees' duties
* Trustees' powers
* Fiduciary duties
* Breach of trust
* Equitable remedies
* Tracing
* Knowing receipt
* Dishonest assistance
* Charitable trusts
* Purpose trusts
* Secret trusts
* Trusts of land
* Co-ownership
* Wills and testamentary trusts
* Equitable interests
* Remedies and defences
10. Wills, Probate and Administration of Estates
* Introduction to succession law
* Testamentary freedom
* Capacity to make a will
* Formalities of wills
* Revocation
* Alteration and rectification
* Interpretation of wills
* Gifts and legacies
* Intestacy
* Personal representatives
* Executors and administrators
* Grants of representation
* Probate procedure
* Estate administration
* Inheritance tax
* Estate liabilities
* Distribution of estates
* Family provision claims
* Proprietary estoppel in succession
* Professional responsibilities
11. Business Law and Practice
* Business organisations
* Sole traders
* Partnerships
* Limited liability partnerships
* Companies
* Company formation
* Corporate personality
* Directors
* Directors' duties
* Shareholders
* Share capital
* Corporate governance
* Company decision-making
* Company meetings
* Dividends
* Company accounts
* Corporate finance
* Business contracts
* Commercial transactions
* Agency
* Sale of goods
* Supply of goods and services
* Consumer protection
* Business taxation
* Insolvency
* Liquidation
* Administration
* Restructuring
* Corporate transactions
* Professional responsibilities
12. Dispute Resolution and Civil Litigation
* Civil justice system
* Pre-action protocols
* Letter before claim
* Limitation
* Jurisdiction
* Commencing proceedings
* Particulars of claim
* Defence and counterclaims
* Statements of case
* Case management
* Disclosure
* Evidence
* Witness statements
* Expert witnesses
* Interim applications
* Summary judgment
* Strike-out
* Settlement
* Mediation
* Trial preparation
* Trial procedure
* Costs
* Enforcement
* Appeals
* Alternative dispute resolution
* Professional conduct in litigation
13. Human Rights Law
* Human rights theory
* Universal human rights
* European Convention on Human Rights
* Human Rights Act 1998
* Convention rights
* Article 2: the right to life
* Article 3: prohibition of torture
* Article 4: slavery and forced labour
* Article 5: liberty and security
* Article 6: fair trial
* Article 8: private and family life
* Article 9: thought, conscience and religion
* Article 10: freedom of expression
* Article 11: assembly and association
* Article 14: discrimination
* Protocol 1 Article 1: property
* Positive obligations
* Proportionality
* Derogations
* Remedies
* Public authorities
* Human rights litigation
* International human rights frameworks
14. European Union and International Law
* Foundations of EU law
* EU institutions
* Sources of EU law
* EU legislation
* Direct effect
* Supremacy
* State liability
* Free movement
* EU citizenship
* Competition law
* UK-EU relationship
* Retained and assimilated law
* International law sources
* Treaties
* Customary international law
* State responsibility
* International courts
* Jurisdiction in international law
* International human rights
* International dispute resolution
15. Legal Ethics and Professional Conduct
* Professional ethics
* SRA Principles
* SRA Codes of Conduct
* Client confidentiality
* Legal professional privilege
* Conflicts of interest
* Client money
* Solicitors' accounts
* Client care
* Competence
* Honesty and integrity
* Independence
* Professional duties to the court
* Undertakings
* Anti-money laundering
* Financial crime
* Equality and diversity
* Complaints
* Professional negligence
* Regulatory compliance
* Duties to clients
* Duties to third parties
* Duties to the public
* Professional boundaries
* Ethical decision-making
16. Legal Research, Writing and Practical Skills
* Finding primary legal sources
* Finding secondary legal sources
* Legislation research
* Case law research
* Legal databases
* Westlaw and LexisNexis concepts
* Research methodology
* Case analysis
* Legal memoranda
* Opinion writing
* Client letters
* Legal drafting
* Negotiation
* Advocacy
* Interviewing clients
* Taking instructions
* Legal problem solving
* Applying IRAC
* Legal argumentation
* Professional communication
17. Scotland and Northern Ireland
* Three legal systems in one UK
* Scots law: a mixed legal system
* The Scottish courts
* The Scottish Parliament and devolved law
* Scots contract law and promise
* Delict: the Scots law of wrongs
* Scots criminal law and procedure
* Scots property law and land registration
* Succession in Scotland
* Northern Ireland's legal system
* The Northern Ireland courts
* The Northern Ireland Assembly and devolved law
* Northern Ireland criminal law and procedure
* Northern Ireland land law and conveyancing
* Cross-border issues within the UK
* Qualifying and practising in Scotland and Northern Ireland
18. Routes to Qualification
* Academic study and professional qualification
* Becoming a solicitor in England and Wales
* The Solicitors Qualifying Examination
* SQE1: structure and approach
* SQE2: structure and approach
* Qualifying work experience
* Character and suitability
* Becoming a barrister in England and Wales
* The academic component for the Bar
* The vocational component for the Bar
* Pupillage
* Other legal careers
* Answering single-best-answer questions
19. SQE2 Skills Practice
* How the SQE2 stations work
* Client interview: a residential purchase
* Attendance note: recording the interview
* Client interview: a contract dispute
* Advocacy: an interim application
* Advocacy: a bail application
* Case and matter analysis: a business dispute
* Case and matter analysis: an estate
* Legal research: a limitation question
* Legal research: a property question
* Legal writing: a letter of advice
* Legal writing: a letter to the other side
* Legal drafting: a clause in a commercial agreement
* Legal drafting: a witness statement
* Ethics in the skills assessments
`;

// tracks group the schools on the path and in the Tracks view; each has its own banner colours
export const TRACKS = [
  { name: "Foundations and skills", units: [1, 16], from: "#9f2f17", to: "#ff8a3d" },
  { name: "Public law", units: [2, 13, 14], from: "#4641ff", to: "#00b3ff" },
  { name: "Obligations", units: [3, 4], from: "#ff3d6e", to: "#ffb02e" },
  { name: "Criminal law", units: [5, 6], from: "#a24bff", to: "#ff3dc4" },
  { name: "Property and succession", units: [7, 8, 9, 10], from: "#16c784", to: "#00a3ff" },
  { name: "Business and disputes", units: [11, 12], from: "#ff5600", to: "#ffc002" },
  { name: "Professional practice", units: [15, 18, 19], from: "#0aa4c9", to: "#7ee0ff" },
  { name: "Across the UK", units: [17], from: "#2e5e18", to: "#6aa84f" },
];

// learning pathways: curated routes through the schools for one goal, in the order to learn them.
// The SQE1 paths follow the SRA's FLK1 and FLK2 split; check the SRA's current specification before
// you sit, because it changes. Ethics and professional conduct is examined throughout both papers.
export const PATHS = [
  { id: "llb", name: "LLB: the foundations of legal knowledge", sub: "The core of a qualifying law degree in England and Wales, in the order most universities teach it.", units: [1, 16, 2, 3, 4, 5, 7, 9, 14, 13] },
  { id: "gdl", name: "Graduate Diploma in Law (conversion)", sub: "The seven foundation subjects for non-law graduates, compressed into one year, with the skills to study them.", units: [1, 16, 3, 4, 5, 2, 14, 7, 9] },
  { id: "sqe1-flk1", name: "SQE1 · FLK1", sub: "Business Law and Practice, Dispute Resolution, Contract, Tort, the Legal System, Constitutional and Administrative Law, EU Law and Legal Services, with ethics throughout. 180 single-best-answer questions.", units: [18, 1, 3, 4, 2, 14, 11, 12, 15] },
  { id: "sqe1-flk2", name: "SQE1 · FLK2", sub: "Property Practice, Wills and the Administration of Estates, Solicitors' Accounts, Land Law, Trusts, and Criminal Law and Practice, with ethics throughout. 180 single-best-answer questions.", units: [18, 7, 8, 9, 10, 5, 6, 15] },
  { id: "sqe2", name: "SQE2: practical legal skills", sub: "Interviewing and attendance notes, advocacy, case and matter analysis, research, writing and drafting, in the five practice contexts, with realistic case files.", units: [19, 16, 15, 12, 6, 8, 10, 11] },
  { id: "bar", name: "Preparing for the Bar", sub: "Academic preparation for barristers: legal foundations, criminal and civil advocacy, evidence, procedure, opinion writing, drafting, conference skills and ethics. This is study, not Bar training.", units: [18, 1, 5, 6, 12, 16, 19, 15, 13] },
  { id: "uk", name: "Law across the UK", sub: "What changes in Scotland and Northern Ireland: courts, legislatures, contract, delict, crime, property, succession and qualification.", units: [17, 1, 2] },
  { id: "postgrad", name: "Postgraduate and advanced study", sub: "The public, international and theoretical subjects LLM and research students build on.", units: [13, 14, 2, 9, 11] },
  { id: "public", name: "Understanding the law", sub: "For anyone curious about how law works: what it is, who makes it, how courts decide and what rights you have.", units: [1, 13, 2, 17] },
];

// the syllabus as schools and lessons; lesson ids are u01-01 style
export const UNITS = SYLLABUS.trim().split(/\n(?=\d+\. )/).map((block) => {
  const [head, ...rest] = block.split("\n");
  const n = Number(head.match(/^(\d+)\./)[1]), id = `u${String(n).padStart(2, "0")}`;
  return { n, id, title: head.replace(/^\d+\.\s*/, ""), lessons: rest.filter((l) => l.startsWith("* ")).map((l, i) => ({ id: `${id}-${String(i + 1).padStart(2, "0")}`, title: l.slice(2).trim() })) };
});
