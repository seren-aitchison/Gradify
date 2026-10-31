# LawGradify: SQE coverage mapping

Maps the SRA's Solicitors Qualifying Examination to LawGradify schools and lessons, and shows the gaps.

> **Verification status: not yet checked against the published specification.** The SRA's assessment specifications (sqe.sra.org.uk) couldn't be reached from the development environment. This mapping uses the structure of the SQE1 and SQE2 specifications as known up to 2025–26. Before relying on it, compare it line by line with the current specifications for the sitting in question, update this file, and record the check in `kit/courses/law/qa.js`. The SRA revises the specifications from time to time.

Status key: **W** = notes written (draft until reviewed; see `docs/CURRICULUM_PROGRESS.md`), **–** = planned, not yet written, **Gap** = not yet in the curriculum.

## SQE1 overview

| Paper | Subjects | Format |
|---|---|---|
| FLK1 | Business Law and Practice; Dispute Resolution; Contract; Tort; the Legal System of England and Wales; Constitutional and Administrative Law and EU Law; Legal Services | 180 single-best-answer questions in two sessions of 90 |
| FLK2 | Property Practice; Wills and the Administration of Estates; Solicitors' Accounts; Land Law; Trusts; Criminal Law and Practice | 180 single-best-answer questions in two sessions of 90 |
| Both | Ethics and professional conduct (pervasive); taxation where relevant (pervasive) | |

Note: the original LawGradify brief listed FLK1 without Constitutional and Administrative Law and EU Law. The specification includes it, so the FLK1 pathway includes Schools 2 and 14.

## FLK1

| SQE1 subject | Main specification areas (summary) | LawGradify coverage | Status |
|---|---|---|---|
| **Contract** | Formation (offer, acceptance, consideration, intention, certainty, capacity); terms (express, implied, classification, incorporation, interpretation); exemption clauses and UCTA 1977, CRA 2015; vitiating factors (misrepresentation, mistake, duress, undue influence, illegality); privity and the 1999 Act; discharge (performance, breach, frustration, agreement); remedies (damages, equitable remedies, restitution) | School 3, all 36 lessons | W |
| **Tort** | Negligence (duty, breach, causation, remoteness, defences, damages; psychiatric harm; economic loss); occupiers' liability; product liability; nuisance; vicarious liability; defamation; remedies | School 4, all 30 lessons | W |
| **Legal System of England and Wales** | Sources of law; courts and precedent; statutory interpretation; the legislative process; the judiciary; law reform; the European Convention and the Human Rights Act in the legal system | School 1 (lessons 1–21, 26–28) | W |
| **Constitutional and Administrative Law and EU Law** | Constitutional principles (sovereignty, rule of law, separation of powers, conventions, prerogative); devolution; Parliament; judicial review (grounds, procedure, remedies); human rights; retained/assimilated EU law and the UK–EU relationship | School 2 (all), School 13 (lessons 3–5, 17–22), School 14 (lessons 1–7, 11–12) | – |
| **Legal Services** | Regulation of legal services (Legal Services Act 2007, regulators, reserved activities); the SRA's regulatory arrangements; funding (legal aid, CFAs, DBAs); consumer protection and complaints; financial services regulation affecting solicitors; money laundering, financial crime and sanctions; data protection in legal practice | School 1 (lessons 22–25), School 15 (lessons 2–3, 15–18, 20), School 18 | W (partial) |
| **Business Law and Practice** | Business structures; company formation, constitution, directors and duties, shareholders, decision-making, share capital, dividends, finance; partnerships and LLPs; insolvency (corporate and personal); taxation of businesses (corporation tax, income tax, CGT, VAT, IHT reliefs) | School 11, all 30 lessons | – |
| **Dispute Resolution** | ADR; pre-action conduct; limitation; jurisdiction and governing law; issuing and serving proceedings; statements of case; case management and tracks; interim applications; disclosure; evidence; experts; trial; costs; enforcement; appeals | School 12, all 26 lessons; School 1 lesson 21 | – |

## FLK2

| SQE1 subject | Main specification areas (summary) | LawGradify coverage | Status |
|---|---|---|---|
| **Land Law** | Estates and interests; registered and unregistered land; co-ownership and trusts of land; leases; easements; freehold covenants; mortgages; priorities | School 7, all 30 lessons | – |
| **Trusts** | Express trusts and certainties; constitution; resulting and constructive trusts; trustees' duties and powers; breach of trust, tracing and third-party liability; charitable and purpose trusts | School 9, all 27 lessons | – |
| **Property Practice** | Residential and commercial freehold and leasehold transactions: investigation of title, searches and enquiries, contract, exchange, completion, post-completion; finance; SDLT; leases (commercial and residential); planning and building regulation basics | School 8, all 25 lessons | – |
| **Wills and the Administration of Estates** | Validity, revocation, alteration and interpretation of wills; intestacy; personal representatives and grants; administration; inheritance tax; family provision; property passing outside the estate | School 10, all 20 lessons | – |
| **Solicitors' Accounts** | Client money and business money; client account; withdrawals and transfers; double-entry recording; reconciliation; interest; billing and VAT; mixed receipts; accountants' reports | School 15 lessons 7–8; School 8 lesson 25 | W (partial) |
| **Criminal Law and Practice** | Criminal liability (actus reus, mens rea, offences against the person, property offences, homicide, inchoate offences, parties, defences); police station advice; bail; allocation; plea and trial; evidence (hearsay, confessions, character, identification); sentencing; appeals; youth court | Schools 5 and 6, all 64 lessons | – |

## Pervasive topics

| Topic | Coverage | Status |
|---|---|---|
| Ethics and professional conduct | School 15 (all 25 lessons), conduct points built into School 19 case files and many law check questions | W |
| Taxation | SDLT (School 8 lessons 16, 23), IHT (School 10 lesson 15), business taxation (School 11 lesson 24) | – |

**Known gaps to close**
- Solicitors' Accounts needs a dedicated set of double-entry practice exercises (ledger postings, reconciliations, mixed receipts, VAT on fees and disbursements); two lessons aren't enough for FLK2. Proposed: add a "Solicitors' Accounts in practice" block to School 15 or a new school.
- Legal Services: financial services regulation affecting solicitors (exempt regulated activities) and data protection in practice aren't yet covered by a lesson.
- Youth court procedure isn't a named lesson in School 6.

## SQE2

| Skill | Assessed contexts (summary; check the current specification) | LawGradify coverage | Status |
|---|---|---|---|
| Client interview and attendance note / legal analysis (oral) | Property practice; wills and intestacy, probate administration and practice | School 19 lessons 2–4; School 16 lessons 15–16 | W (19); – (16) |
| Advocacy (oral) | Dispute resolution; criminal litigation | School 19 lessons 5–6; School 16 lesson 14 | W (19); – (16) |
| Case and matter analysis (written) | All five practice areas | School 19 lessons 7–8 | W |
| Legal research (written) | All five practice areas | School 19 lessons 9–10; School 16 lessons 1–7 | W (19); – (16) |
| Legal writing (written) | All five practice areas | School 19 lessons 11–12; School 16 lessons 9–11 | W (19); – (16) |
| Legal drafting (written) | All five practice areas | School 19 lessons 13–14; School 16 lesson 12 | W (19); – (16) |
| Ethics (pervasive) | All stations | School 19 lesson 15 and conduct points in every file | W |

**Known gaps to close**
- SQE2 is 16 stations; School 19 has one or two practice files per skill. Each skill needs a file in each practice context it can be set in (criminal litigation including police station advice, dispute resolution, property, wills and probate, business organisations), so roughly 25–30 files in total.
- Practice files need timed conditions and marking against the assessment criteria. The planned AI-marking mode (`docs/LEARNING_ENGINE.md`) would allow written work to be marked against a rubric.

## Bar pathway (for reference)

The BSB's centralised assessments (civil litigation, criminal litigation, professional ethics) are not SQE subjects. They map to Schools 12, 6 and 15 respectively, with Bar-specific conduct (the BSB Handbook) still to be added to School 15.
