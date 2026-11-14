// EngineerGradify Projects and Professional Practice (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## The project lifecycle and planning
LV: Year 1 · Foundation
S: Engineering work is usually delivered as projects with a defined goal, budget and timescale. This lesson describes the project lifecycle, the balance between scope, time, cost and quality, and the main planning tools, including the work breakdown structure.
O: Describe the phases of a project lifecycle
O: Explain the trade-offs between scope, time, cost and quality
O: Build a simple work breakdown structure for an engineering project
PRE: The engineering design process
H: What a project is
P: A **project** is a unique, temporary undertaking to deliver a defined result, unlike routine operations that repeat. The Association for Project Management describes a **lifecycle** of **concept**, **definition**, **deployment** and **transition**, and many organisations describe similar phases as initiation, planning, execution, monitoring and control, and closure. In construction, the RIBA Plan of Work divides a project into stages from strategic definition to use. At each phase boundary a **gate review** decides whether to continue, change or stop. Good planning sets clear, **SMART** objectives (specific, measurable, achievable, relevant and time-bound), identifies stakeholders and defines what is in and out of **scope**. Most problems in projects come from unclear scope, poor estimates and weak communication rather than from technical difficulty.
H: Scope, time, cost and quality
- The **iron triangle** links scope, time and cost; quality sits at its centre.
- Changing one constraint usually affects the others: adding scope needs more time or money.
- **Scope creep** is uncontrolled growth in what the project must deliver.
- **Change control** assesses and approves changes before they are made.
- The **project sponsor** owns the business case; the **project manager** delivers it.
H: Planning tools
- A **work breakdown structure** (WBS) divides the deliverable into smaller **work packages** that can be estimated and assigned.
- The WBS is **deliverable-based**: each level is a breakdown of the one above, with no gaps or overlaps.
- **Milestones** mark key points, such as design freeze or first article inspection.
- A **project plan** brings together scope, schedule, budget, resources, risks and communications.
- Plans are updated as work proceeds and actual progress is measured against the **baseline**.
X: A student race-car project.
> The team's goal is to build a car for a student competition within 12 months and a budget of 20 000 pounds.
> The WBS splits the car into chassis, suspension, powertrain, electronics and bodywork, then into work packages such as front wishbones.
> Each work package gets an owner, an estimate and a deadline, and milestones include design freeze and first drive.
> When the team proposes a new aerodynamic package late on, change control checks its effect on time and budget before approval.
K: Projects follow a lifecycle with gate reviews, are planned with SMART objectives and a work breakdown structure, and are controlled by balancing scope, time, cost and quality through change control.
!: Starting work before scope is agreed. Unclear scope leads to scope creep, rework and overruns; define and baseline scope first.
EV: established | Unclear requirements and scope creep are widely reported as leading causes of project overruns.
T: Work breakdown structure | A hierarchical breakdown of a project deliverable into manageable work packages
T: Scope creep | Uncontrolled growth in the scope of a project
T: Baseline | The approved version of the plan against which progress is measured
SUM: Lifecycle phases with gates.
SUM: Scope, time and cost trade off.
SUM: Break work down to plan it.
SRC: Association for Project Management, APM Body of Knowledge, 7th edition | guidance | 2019 | https://www.apm.org.uk/body-of-knowledge/
SRC: Project Management Institute, A Guide to the Project Management Body of Knowledge (PMBOK Guide), 7th edition | standard | 2021
SRC: Lock D., Project Management, 10th edition, Gower | secondary | 2013
Q: What is a work breakdown structure? | A hierarchy that splits a project deliverable into manageable work packages.
Q: What does SMART stand for? | Specific, measurable, achievable, relevant and time-bound.
M1#engineering-u12-01-q1@1: Which of these best describes a project? | A temporary undertaking to deliver a unique result | A routine process repeated every day without end | A permanent department within a company | A single meeting with a client to agree a price | Projects are temporary and unique, unlike ongoing operations.
M2#engineering-u12-01-q2@2: A client adds three features without extending the deadline or budget. What is the most likely result? | Pressure on quality, or overruns in time or cost | No effect, because scope does not affect cost | The project automatically finishes early | The work breakdown structure becomes unnecessary | Scope, time and cost are linked, so extra scope must be paid for somewhere.
M3#engineering-u12-01-q3@3: Which is the best example of a SMART objective for a design project? | Reduce bracket mass by 15% by the end of March | Make the bracket much better than before | Do the best possible job on the bracket design | Improve everything about the bracket eventually | It is specific, measurable, achievable, relevant and time-bound.
SEQ1#engineering-u12-01-q4@1: Put these APM lifecycle phases in order. | Concept ; Definition ; Deployment ; Transition | The project is conceived, defined, delivered and then handed over.
SA2#engineering-u12-01-q5@2,3: Explain how a work breakdown structure and change control help a project stay on track. | A work breakdown structure divides the deliverable into smaller work packages with no gaps or overlaps, so each can be estimated, scheduled and assigned to an owner. This makes the plan realistic and progress measurable against the baseline. Change control means any proposed change to scope is assessed for its effect on time, cost and quality and formally approved or rejected. Together they prevent scope creep and keep the iron triangle in balance. | WBS definition ; Estimating and ownership ; Change control ; Scope creep and trade-offs

## Scheduling: Gantt charts and the critical path
LV: Year 1 · Intermediate
S: A schedule shows when each activity happens and which activities control the finish date. This lesson explains Gantt charts, activity dependencies and the critical path method, including how to calculate float.
O: Read and construct a Gantt chart
O: Find the critical path and project duration of an activity network
O: Calculate float and explain its use in managing a schedule
PRE: The project lifecycle and planning
H: Gantt charts and dependencies
P: A **Gantt chart**, named after Henry Gantt, shows activities as horizontal bars against a time axis, making it easy to see what happens when and to compare planned and actual progress. Activities are linked by **dependencies**, most often **finish-to-start**, where one cannot begin until another ends. The **critical path method** (CPM), developed by Kelley and Walker in the late 1950s, models the project as a network of activities with durations. A **forward pass** finds each activity's **earliest start** and **earliest finish**; a **backward pass** from the project end finds the **latest start** and **latest finish**. The **critical path** is the longest path through the network, and its length is the shortest possible project duration. Activities on it have zero **float**, so any delay to them delays the whole project.
H: Calculating float
- **Total float** = latest start - earliest start, or latest finish - earliest finish.
- Critical activities have zero total float.
- Non-critical activities can slip by up to their float without delaying the end date.
- If a non-critical activity uses up its float, a new critical path can appear.
- Software such as Microsoft Project calculates floats automatically, but engineers must check the logic.
H: Managing the schedule
- **Crashing** shortens critical activities by adding resources, at extra cost.
- **Fast-tracking** overlaps activities that were planned in sequence, at extra risk.
- **Resource levelling** smooths demand on people or equipment, sometimes lengthening the schedule.
- Progress is tracked against the **baseline** schedule.
- Shortening a non-critical activity does not shorten the project.
X: A small installation job.
> Activities: A survey (2 days); B order parts (6 days, after A); C prepare site (3 days, after A); D install (4 days, after B and C).
> Path A-B-D takes 2 + 6 + 4 = 12 days; path A-C-D takes 2 + 3 + 4 = 9 days.
> The critical path is A-B-D and the project takes 12 days.
> C can start at day 2 but need not finish until day 8, so its total float is 8 - 5 = 3 days.
K: Gantt charts show activities against time; the critical path method finds the longest path through the network, which sets the project duration, and float shows how far non-critical activities can slip.
!: Thinking the critical path is the path with the most activities. It is the path with the longest total duration.
EV: established | The critical path method was introduced by Kelley and Walker in 1959 for planning and scheduling engineering projects.
T: Critical path | The longest-duration path through an activity network, setting the minimum project duration
T: Total float | The time an activity can be delayed without delaying the project
T: Crashing | Shortening critical activities by adding resources at extra cost
SUM: Gantt bars show timing.
SUM: Longest path is critical.
SUM: Float shows slack.
SRC: Kelley J. E. and Walker M. R., "Critical-path planning and scheduling", Proceedings of the Eastern Joint Computer Conference, 160–173 | primary | 1959
SRC: Lock D., Project Management, 10th edition, Gower | secondary | 2013
SRC: Association for Project Management, APM Body of Knowledge, 7th edition | guidance | 2019 | https://www.apm.org.uk/body-of-knowledge/
Q: What is the float of an activity on the critical path? | Zero.
Q: What does a forward pass calculate? | The earliest start and finish times of each activity.
M1#engineering-u12-02-q1@1: What does a Gantt chart show? | Activities as bars against a time axis | The cash flow of a project each year | The team's reporting lines and roles | The risk score of each activity | Gantt charts display each activity's start, duration and finish against time.
M2#engineering-u12-02-q2@2: A non-critical activity with 4 days of float is delayed by 2 days. What happens to the project end date? | It is unchanged | It is delayed by 2 days | It is delayed by 4 days | It moves 2 days earlier | The delay is within the float, so the critical path and end date are not affected.
M3#engineering-u12-02-q3@3: A manager adds staff to shorten a non-critical activity by 3 days. What is the effect on project duration? | No reduction, because the critical path is unchanged | A 3-day reduction in the overall duration | A reduction equal to the activity's float | A longer project because more staff were added | Only shortening critical activities can shorten the project.
NUM2#engineering-u12-02-q4@2: Activities: A 3 days; B 5 days after A; C 2 days after A; D 4 days after both B and C. What is the total float of C in days? | 3 | 0 | days | D starts at day 8, so C may finish by day 8 but its earliest finish is 3 + 2 = 5, giving a float of 3 days.
SA2#engineering-u12-02-q5@2,3: Explain how the critical path is found and how a project manager could use it to recover a late schedule. | The project is drawn as a network of activities with durations and dependencies. A forward pass gives earliest start and finish times and a backward pass gives latest times; activities whose earliest and latest times match have zero float and form the critical path, the longest route, which sets the project duration. To recover a late schedule, the manager should act on critical activities, for example crashing them with extra resources or fast-tracking by overlapping them, while watching for new critical paths. Effort on non-critical activities does not shorten the project. | Network and passes ; Zero float ; Longest path sets duration ; Crashing and fast-tracking

## Engineering economics
LV: Year 1 · Advanced
S: Engineers must show that projects are worth their cost. This lesson introduces the time value of money, present value and discounting, net present value, payback period and internal rate of return.
O: Calculate present and future values using compound interest
O: Evaluate a project using net present value and payback period
O: Explain the strengths and limits of different appraisal methods
PRE: Exponentials and logarithms in engineering
H: The time value of money
P: A pound today is worth more than a pound in the future, because it can be invested to earn interest and because the future is uncertain. With compound interest at rate i per year, a present sum P grows to a **future value** F = P(1 + i)^n after n years. Working backwards, the **present value** of a future sum is P = F / (1 + i)^n; this is called **discounting**, and i is the **discount rate**. **Net present value** (NPV) is the sum of the present values of all cash flows, with costs negative and benefits positive. A project with a positive NPV adds value at that discount rate. For a constant annual cash flow A for n years, the present value is A times the **annuity factor** (1 - (1 + i)^-n) / i. UK public projects are appraised using the HM Treasury **Green Book**, which sets a standard social discount rate of 3.5% per year for the first 30 years.
H: Appraisal methods
- **Payback period**: time for cumulative savings to repay the initial cost; simple but ignores later cash flows and the time value of money.
- **NPV**: accounts for all cash flows and timing; depends on the chosen discount rate.
- **Internal rate of return** (IRR): the discount rate at which NPV is zero; accept if IRR exceeds the required rate.
- **Whole-life cost**: total cost of ownership, including operation, maintenance and disposal.
- Comparisons must use the same time period and the same assumptions.
H: Using the results
- Sensitivity analysis tests how NPV changes with energy price, discount rate or lifetime.
- Inflation can be handled by using real prices with a real discount rate.
- Non-monetary factors, such as safety and environmental impact, also inform decisions.
- A higher discount rate gives less weight to long-term benefits such as energy savings.
- Engineers should state assumptions clearly so decision-makers can judge them.
X: Buying an efficient compressor.
> A new compressor costs 20 000 pounds and saves 6000 pounds a year for 5 years; the discount rate is 8%.
> The annuity factor is (1 - 1.08^-5) / 0.08 = 3.993, so the savings have a present value of 6000 x 3.993 = 23 956 pounds.
> NPV = 23 956 - 20 000 = 3956 pounds, which is positive, so the investment is worthwhile at 8%.
> The simple payback is 20 000 / 6000 = 3.3 years, which ignores the time value of money.
K: Money has a time value, so future cash flows are discounted with P = F / (1 + i)^n; NPV sums discounted cash flows and is the most robust measure, while payback is simpler but ignores timing and later cash flows.
!: Adding future savings without discounting. Money received in later years is worth less today and must be discounted to its present value.
EV: established | The HM Treasury Green Book sets a social time preference discount rate of 3.5% per year for appraising UK public projects.
EV: contested | The appropriate discount rate for very long-term projects such as climate mitigation; low rates give far more weight to future generations.
T: Present value | The value today of a future cash flow, found by discounting
T: Net present value | The sum of the present values of all costs and benefits of a project
T: Internal rate of return | The discount rate at which a project's NPV is zero
SUM: Future money is worth less.
SUM: Positive NPV adds value.
SUM: Payback ignores timing.
SRC: HM Treasury, The Green Book: Central Government Guidance on Appraisal and Evaluation | guidance | 2022 | https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government
SRC: Park C. S., Contemporary Engineering Economics, 6th edition, Pearson | secondary | 2016
SRC: Newnan D. G., Eschenbach T. G. and Lavelle J. P., Engineering Economic Analysis, 14th edition, Oxford University Press | secondary | 2019
Q: What is the formula for the present value of a future sum? | P = F / (1 + i)^n.
Q: What does a positive NPV indicate? | The project adds value at the chosen discount rate.
M1#engineering-u12-03-q1@1: What does discounting do? | Converts future cash flows into present values | Converts present costs into future costs | Removes the effect of tax from a project | Adds inflation to every future price | Discounting finds what future money is worth today.
M2#engineering-u12-03-q2@2: What is the main weakness of the simple payback period? | It ignores cash flows after payback and their timing | It always gives a negative answer for good projects | It needs the internal rate of return first | It can only be used for public sector projects | Payback counts only the years to recover cost and does not discount.
M3#engineering-u12-03-q3@3: Raising the discount rate from 3.5% to 10% for a wind farm with long-lived savings will most likely | lower its NPV | raise its NPV | leave its NPV unchanged | make its payback period negative | A higher rate shrinks the present value of distant benefits, reducing NPV.
NUM3#engineering-u12-03-q4@1: What is the present value of 10 000 pounds received in 3 years at a discount rate of 5% per year? | 8638 | 2 | pounds | P = 10 000 / 1.05^3 = 10 000 / 1.157625, which is about 8638 pounds.
SA2#engineering-u12-03-q5@2,3: Compare net present value and payback period as methods of appraising an engineering investment. | Net present value discounts every cash flow over the project life to the present using a chosen rate and sums them; a positive NPV shows the project adds value, and it accounts for both timing and size of all cash flows. Payback period is the time for savings to repay the initial cost, which is easy to calculate and indicates risk exposure. However, payback ignores the time value of money and any benefits after payback, so it can favour short-lived projects. NPV is more robust but depends on the discount rate, so sensitivity analysis is needed. | NPV method ; NPV strengths ; Payback method ; Payback limits

## Risk management in projects
LV: Year 1 · Intermediate
S: Every project faces uncertain events that could harm or help its objectives. This lesson explains the project risk management process, the risk register, probability-impact assessment, expected monetary value and the main risk responses.
O: Describe the project risk management process
O: Assess risks using probability, impact and expected monetary value
O: Select appropriate responses to threats and opportunities
PRE: Risk assessment
H: Risk in projects
P: In project management a **risk** is an uncertain event or condition that, if it occurs, affects at least one project objective such as time, cost or quality. Unlike workplace safety risk, project risk includes both **threats** and **opportunities**. ISO 31000 describes a cycle of **identifying**, **analysing**, **evaluating** and **treating** risks, with continual **monitoring and review** and communication. Risks are recorded in a **risk register**, which lists each risk, its cause and effect, its probability and impact, an **owner** and the planned response. An **issue** is different: it is a problem that has already happened. Qualitative assessment scores probability and impact on a matrix; quantitative assessment may use **expected monetary value** (EMV), the probability times the cost impact, or Monte Carlo simulation of the schedule and budget.
H: Responses to threats
- **Avoid**: change the plan to remove the risk, such as choosing a proven supplier.
- **Reduce**: lower the probability or impact, such as by early prototyping.
- **Transfer**: pass the impact to another party, such as by insurance or a fixed-price contract.
- **Accept**: take the risk knowingly, often with a contingency allowance.
- Every response should have an owner and a cost compared with the benefit.
H: Opportunities and contingency
- **Exploit** an opportunity to make sure it happens.
- **Enhance** it to increase its probability or benefit.
- **Share** it with a partner better placed to realise it.
- **Contingency** in time and money is held for identified risks; **management reserve** covers unknowns.
- The register is a live document, reviewed at regular project meetings.
X: A bridge refurbishment.
> Risk: hidden corrosion found when paint is removed, with probability 30% and cost impact 80 000 pounds.
> EMV = 0.30 x 80 000 = 24 000 pounds, which is added to the contingency.
> The team reduces the risk by commissioning an intrusive survey before tendering.
> The survey cuts the probability to 10%, so the new EMV is 8000 pounds and the contingency can be reduced.
K: Project risks are uncertain events that could affect objectives, both threats and opportunities; they are identified, analysed with probability, impact and EMV, recorded in a risk register with owners, and treated by avoid, reduce, transfer or accept.
!: Confusing risks with issues. A risk may happen; an issue has already happened and needs action now.
EV: established | ISO 31000 sets out principles and a process for managing risk that apply to any organisation or project.
T: Risk register | A record of identified risks, their assessment, owners and responses
T: Expected monetary value | Probability of a risk multiplied by its cost impact
T: Contingency | Time or money set aside to cover identified risks
SUM: Risks can be threats or opportunities.
SUM: EMV = probability x impact.
SUM: Avoid, reduce, transfer, accept.
SRC: International Organization for Standardization, ISO 31000:2018 Risk management. Guidelines | standard | 2018
SRC: Association for Project Management, Project Risk Analysis and Management (PRAM) Guide, 2nd edition | guidance | 2004
SRC: Hillson D., Effective Opportunity Management for Projects: Exploiting Positive Risk, Marcel Dekker | secondary | 2004
Q: What is the difference between a risk and an issue? | A risk might happen; an issue has already happened.
Q: How is expected monetary value calculated? | Probability multiplied by the cost impact.
M1#engineering-u12-04-q1@1: Which document records each project risk, its owner and planned response? | The risk register | The Gantt chart | The work breakdown structure | The lessons learned log | The risk register is the central record of identified risks and their treatment.
M2#engineering-u12-04-q2@2: Taking out insurance against flood damage to a construction site is an example of | transferring the risk | avoiding the risk | accepting the risk | exploiting the risk | Insurance moves the financial impact to another party.
M3#engineering-u12-04-q3@3: A supplier's late delivery is now certain and will delay testing by two weeks. How should it be handled? | As an issue needing action now | As a new opportunity to enhance | As a risk to accept with no action | As a low-probability threat to monitor | Once an event has happened it is an issue, not a risk.
NUM2#engineering-u12-04-q4@2: A risk has a 25% probability of occurring and would cost 40 000 pounds. What is its expected monetary value in pounds? | 10000 | 1 | pounds | EMV = 0.25 x 40 000, which equals 10000 pounds.
SA2#engineering-u12-04-q5@2,3: Describe how a project team should manage a significant threat, using a risk register and suitable responses. | The team identifies the threat, records its cause and effect in the risk register and assigns an owner. It analyses probability and impact, for example on a matrix or by expected monetary value, to rank it against other risks. It then chooses a response: avoid by changing the plan, reduce by lowering probability or impact, transfer by insurance or contract, or accept with a contingency. The register is reviewed regularly, and the response's cost is weighed against the reduction in exposure. | Identify and record ; Owner ; Analyse and rank ; Responses and review

## Teamwork and roles
LV: Year 1 · Foundation
S: Engineering is almost always a team activity. This lesson introduces Tuckman's stages of team development, Belbin's team roles, tools for allocating responsibility, and the importance of psychological safety.
O: Describe the stages of team development
O: Identify team roles and how they contribute to performance
O: Use a responsibility matrix and good practice to improve team effectiveness
PRE: The project lifecycle and planning
H: How teams develop
P: Bruce Tuckman proposed in 1965 that small groups pass through stages of **forming**, when members are polite and unsure; **storming**, when conflicts over goals and roles emerge; **norming**, when the team agrees ways of working; and **performing**, when it works effectively towards its goal. In 1977 Tuckman and Jensen added **adjourning**, when the team disbands. Meredith Belbin's research found that successful teams have a balance of **team roles**, behaviours people tend to adopt, rather than simply the cleverest members. His nine roles include the **Plant**, who generates ideas, the **Monitor Evaluator**, who judges options, the **Implementer**, who turns ideas into action, the **Completer Finisher**, who checks for errors, and the **Specialist**, who brings expert knowledge. Amy Edmondson's work on **psychological safety** shows that teams learn better when members feel safe to speak up and admit mistakes.
H: Making teams work
- Agree a clear shared goal and ground rules at the start.
- Hold short, regular meetings with an agenda, actions and owners.
- Use shared files and version control for documents and code.
- Deal with conflict early, focusing on the problem rather than the person.
- Recognise that some storming is normal and can improve ideas.
H: Allocating responsibility
- A **RACI matrix** lists tasks against people, marking who is **Responsible**, **Accountable**, **Consulted** and **Informed**.
- Each task should have exactly one accountable person.
- Rotate roles such as chair and note-taker to share skills.
- In student projects, peer assessment helps recognise individual contributions.
- Diverse teams bring a wider range of ideas but need inclusive practices to benefit.
X: A design team stuck in storming.
> Four students disagree about which concept to pursue and two stop attending meetings.
> They agree ground rules, meeting times and a decision method using a weighted matrix.
> A RACI matrix gives each work package one accountable person, with others consulted.
> Within two weeks the team is norming, and the quieter member's idea, now heard, is adopted.
K: Teams develop through forming, storming, norming, performing and adjourning; balanced Belbin roles, clear responsibilities in a RACI matrix and psychological safety help teams perform.
!: Assuming conflict means a team is failing. Storming is a normal stage, and well-managed disagreement often improves the design.
EV: established | Tuckman's 1965 model of forming, storming, norming and performing is a widely used description of small-group development.
EV: contested | Belbin's team role inventory reliably predicts team performance; independent studies of its psychometric properties have given mixed results.
T: Storming | A team stage in which conflicts over goals, roles and methods emerge
T: RACI matrix | A chart showing who is responsible, accountable, consulted and informed for each task
T: Psychological safety | A shared belief that the team is safe for interpersonal risk-taking
SUM: Form, storm, norm, perform.
SUM: Balance the team roles.
SUM: One accountable person per task.
SRC: Tuckman B. W., "Developmental sequence in small groups", Psychological Bulletin 63(6), 384–399 | primary | 1965
SRC: Belbin R. M., Management Teams: Why They Succeed or Fail, Heinemann | primary | 1981
SRC: Edmondson A., "Psychological safety and learning behavior in work teams", Administrative Science Quarterly 44(2), 350–383 | primary | 1999
Q: What are Tuckman's original four stages? | Forming, storming, norming and performing.
Q: What does the A in RACI stand for? | Accountable.
M1#engineering-u12-05-q1@1: In which stage do team members first openly disagree about goals and roles? | Storming | Forming | Norming | Performing | Storming is the stage of conflict before the team agrees how to work.
M2#engineering-u12-05-q2@2: Which Belbin role is most associated with careful checking for errors before delivery? | Completer Finisher | Plant | Resource Investigator | Shaper | The Completer Finisher polishes work and checks details.
M3#engineering-u12-05-q3@3: Two team members both believe they are in charge of the test report, and neither finishes it. What would fix this most directly? | A RACI matrix naming one accountable person | Adding a third person to also lead it | Waiting until the deadline passes to decide | Removing the test report from the plan | Each task needs exactly one accountable person.
MATCH1#engineering-u12-05-q4@2: Match each Belbin role to its typical contribution. | Plant = Generates original ideas ; Monitor Evaluator = Weighs up options objectively ; Implementer = Turns ideas into practical plans ; Specialist = Provides expert knowledge | Balanced teams cover these different contributions.
SA2#engineering-u12-05-q5@1,3: Describe Tuckman's stages of team development and suggest how a student team can move from storming to performing. | Tuckman's model says teams form, when members are polite and uncertain; storm, when conflicts over goals and roles appear; norm, when they agree ways of working; perform, when they work effectively; and adjourn when they disband. To move past storming, the team can agree a shared goal and ground rules, a fair decision method, and regular meetings with clear actions. A RACI matrix clarifies who is accountable for each task, and creating psychological safety lets everyone speak up. Conflict should be addressed early and focused on the problem. | Stages ; Ground rules and decisions ; RACI ; Psychological safety

## Technical report writing
LV: Year 1 · Foundation
S: Technical reports communicate engineering work so that others can understand, check and act on it. This lesson describes the standard structure of a report, how to present data and references, and the features of clear technical writing.
O: Describe the standard sections of a technical report
O: Present figures, tables, units and references correctly
O: Write clear, concise and objective technical prose
PRE: Uncertainty, significant figures and estimation
H: Structure of a report
P: A **technical report** is written for a reader who needs to understand what was done, what was found and what it means, often without reading every page. Most follow a standard structure. The **title** and **summary** (or **abstract**) state the purpose, method, key results and conclusions in a few sentences. The **introduction** gives background, aims and objectives. The **method** describes what was done in enough detail to be repeated. **Results** present the data, usually in figures and tables, without interpretation. The **discussion** interprets the results, compares them with theory or other work and considers **uncertainty** and limitations. **Conclusions** answer the aims, and **recommendations** say what should be done next. **References** list sources, and **appendices** hold detailed calculations or raw data.
H: Figures, tables and units
- Number every figure and table, and give each a descriptive caption: figure captions go below, table captions above.
- Refer to each figure and table in the text before it appears.
- Label axes with the quantity and **SI unit**, for example "Stress (MPa)".
- Quote results to a sensible number of **significant figures**, with uncertainties where known.
- Use a consistent referencing style, such as **Harvard** (author, date) or **IEEE** (numbered), following BS ISO 690 principles.
H: Clear technical writing
- Write for the intended reader and define specialist terms and abbreviations.
- Use short sentences and paragraphs, each with one main idea.
- Be objective: report evidence, not opinions, and state assumptions.
- Use the past tense for what was done and the present tense for established facts.
- Edit and proofread; a colleague's review catches errors you cannot see.
X: Improving a results sentence.
> Draft: "The beam was really strong and it didn't bend much at all which was good."
> Revised: "At the design load of 5 kN, the measured midspan deflection was 2.1 mm (Figure 3), within the 4 mm limit."
> The revision is objective, gives the quantity with units, refers to a figure and compares with the criterion.
> It also leaves interpretation of why the deflection was low to the discussion section.
K: A technical report follows a clear structure from summary to appendices, presents numbered and captioned figures and tables with SI units and consistent references, and uses concise, objective prose.
!: Putting interpretation in the results section. Results should present the data; explanation and comparison with theory belong in the discussion.
EV: established | Standard report structures separating method, results and discussion help readers locate and evaluate information.
T: Abstract | A short summary of a report's purpose, method, results and conclusions
T: Discussion | The section that interprets results and considers their limitations
T: Harvard style | A referencing style using author and date in the text
SUM: Summary first, details later.
SUM: Caption, number and label.
SUM: Objective and concise.
SRC: Silyn-Roberts H., Writing for Science and Engineering: Papers, Presentations and Reports, 2nd edition, Elsevier | secondary | 2013
SRC: British Standards Institution, BS ISO 690:2021 Information and documentation. Guidelines for bibliographic references and citations to information resources | standard | 2021
SRC: van Emden J., Writing for Engineers, 3rd edition, Palgrave Macmillan | secondary | 2005
Q: Where does a figure caption go? | Below the figure.
Q: Which section interprets the results? | The discussion.
M1#engineering-u12-06-q1@1: Which section of a report should allow another engineer to repeat the work? | Method | Summary | Conclusions | Appendices | The method describes what was done in enough detail to be reproduced.
M2#engineering-u12-06-q2@2: Which axis label is correctly written for a technical graph? | Strain rate (1/s) | strain rate stuff | Rate, units not needed | SR | Axis labels state the quantity and its unit.
M3#engineering-u12-06-q3@3: A report's summary says only "This report describes a test on a beam." What should be added? | Key results and conclusions | A longer history of the laboratory | The full table of raw data | A list of all the equipment suppliers | A summary should let readers grasp purpose, method, findings and conclusions without the full report.
SEQ1#engineering-u12-06-q4@1: Put these report sections in their usual order. | Introduction ; Method ; Results ; Discussion | Readers move from aims to methods, then data, then interpretation.
SA2#engineering-u12-06-q5@2,3: Explain what makes a technical report clear and useful to its reader. | A clear report follows a standard structure, with a summary giving the purpose, method, key results and conclusions, and sections that separate method, results and discussion so readers can find information. Figures and tables are numbered, captioned, referred to in the text and labelled with quantities and SI units, and results are given with sensible significant figures and uncertainties. The writing is concise and objective, defines terms and states assumptions. Sources are cited consistently so claims can be checked. | Structure and summary ; Figures and units ; Objective concise prose ; Referencing

## Presentations and technical communication
LV: Year 1 · Intermediate
S: Engineers must explain their work to clients, colleagues and the public. This lesson covers planning a technical presentation for an audience, designing effective slides, delivering with confidence, and communicating risk and uncertainty to non-specialists.
O: Plan a presentation around the audience and a clear message
O: Design slides using evidence-based principles
O: Communicate technical information and uncertainty to non-specialists
PRE: Technical report writing
H: Planning for the audience
P: A good presentation starts with the **audience**: what they already know, what they need to decide and how long they have. Engineers should be able to state the **key message** in one or two sentences before making any slides. A simple structure is to tell the audience what the talk will cover, present the evidence, and then summarise the conclusions and any action needed. Michael Alley's **assertion-evidence** approach replaces bullet-point slides with a short sentence headline stating the main point, supported by a visual such as a graph, photograph or diagram. Richard Mayer's research on multimedia learning supports this: people learn better from words and pictures together than from words alone, and extra decorative material distracts from understanding.
H: Slide design
- Use a headline sentence that states the point of each slide.
- Prefer clear graphs and diagrams to dense text and tables.
- Keep fonts large, colours high-contrast, and avoid relying on colour alone.
- Remove decoration that does not support the message.
- Do not read slides aloud; speak to the audience and use the slide as evidence.
H: Delivery and communicating risk
- Rehearse aloud and time the talk; a typical speaking rate is around 130 words per minute.
- Make eye contact, pause, and invite questions.
- For non-specialists, explain technical terms and use familiar comparisons.
- Give probabilities as natural frequencies, such as "1 in 100", rather than only as decimals.
- Be honest about uncertainty and what is not known, and avoid jargon or false precision.
X: Presenting a flood scheme to residents.
> The engineer's key message: the new wall reduces the chance of the street flooding in any year from 1 in 20 to 1 in 100.
> Each slide has a headline sentence, with maps and photographs rather than bullet points.
> She explains that "1 in 100" does not mean once a century, but a 1% chance each year.
> She ends by summarising benefits, disruption during building and how residents can comment.
K: Effective technical presentations start from the audience and a clear message, use assertion-evidence slides with visuals, and communicate uncertainty honestly in terms non-specialists understand.
!: Putting the report on slides. Dense bullet points that the presenter reads aloud overload the audience; use headline assertions and visual evidence instead.
EV: established | Mayer's multimedia principle states that people learn more deeply from words and pictures than from words alone.
T: Key message | The main point the audience should remember, stated in one or two sentences
T: Assertion-evidence slide | A slide with a sentence headline supported by visual evidence
T: Natural frequency | Expressing a probability as a count, such as 1 in 100
SUM: Know the audience.
SUM: Headline plus visual.
SUM: Be honest about uncertainty.
SRC: Alley M., The Craft of Scientific Presentations, 2nd edition, Springer | secondary | 2013
SRC: Mayer R. E., Multimedia Learning, 2nd edition, Cambridge University Press | primary | 2009
SRC: Spiegelhalter D., The Art of Statistics: Learning from Data, Pelican | secondary | 2019
Q: What is an assertion-evidence slide? | A slide with a full-sentence headline supported by visual evidence.
Q: What does a 1 in 100 annual chance of flooding mean? | A 1% chance of flooding in any given year.
M1#engineering-u12-07-q1@1: What should a presenter decide before making any slides? | The audience's needs and the key message | The colour scheme and the font family | How many bullet points fit on a slide | Which animations to use for transitions | Planning starts with who the audience is and what they must take away.
M2#engineering-u12-07-q2@2: According to Mayer's multimedia principle, which slide is likely to be most effective? | A headline sentence with a labelled diagram | A full paragraph copied from the report | Bullet points with decorative clip art | A table of every measured value | Words and relevant pictures together support understanding.
M3#engineering-u12-07-q3@3: A resident asks whether a 1 in 100 year flood means the town is safe for the next century. The best reply is | No, there is about a 1% chance of such a flood in any year | Yes, it can only happen once every hundred years | Yes, because the last one happened recently | No, it will certainly happen within ten years | Annual exceedance probability applies each year independently.
NUM1#engineering-u12-07-q4@2: A presenter speaks at about 130 words per minute. Roughly how many words of script fit a 12-minute talk? | 1560 | 20 | words | 130 words per minute x 12 minutes gives 1560 words.
SA2#engineering-u12-07-q5@1,3: Explain how an engineer should prepare and deliver a presentation on a technical risk to a non-specialist audience. | The engineer should first find out what the audience knows and needs to decide, and state the key message in a sentence or two. Slides should use headline assertions supported by clear visuals, such as maps or graphs, rather than dense bullet points. Technical terms should be explained and probabilities expressed as natural frequencies such as 1 in 100, with honest statements about uncertainty. The talk should be rehearsed and timed, delivered to the audience rather than read from the slides, and end with a clear summary and a chance for questions. | Audience and message ; Slide design ; Explaining risk ; Delivery

## Searching literature and standards
LV: Year 1 · Foundation
S: Engineers need reliable information from journals, books, standards and data. This lesson explains where to search, how to build an effective search with Boolean operators, and how to judge the quality of what you find.
O: Identify suitable databases and sources for engineering information
O: Build a structured search using keywords and Boolean operators
O: Evaluate the reliability of sources
PRE: Technical report writing
H: Where to look
P: A **literature search** finds what is already known about a topic so that work builds on existing knowledge instead of repeating it. Engineering sources include **peer-reviewed journal articles**, **conference papers**, **textbooks**, **standards**, **patents**, **theses** and **grey literature** such as government and industry reports. Specialist databases include **Scopus**, **Web of Science**, **IEEE Xplore** for electrical and computing topics, and **Engineering Village**, which contains the Compendex index. British and international standards can be searched through **BSI Knowledge**, which most universities subscribe to, and patents through Espacenet. **Google Scholar** is broad and useful for tracing citations, but its coverage is less controlled. A university library's **discovery service** searches many of these at once and links to full text.
H: Building a search
- Break the question into key **concepts**, then list synonyms and alternative spellings for each.
- Combine synonyms with **OR** to broaden, and concepts with **AND** to narrow.
- Use **NOT** sparingly to exclude an unwanted meaning.
- Use quotation marks for exact phrases, such as "fatigue crack growth".
- Use **truncation**, such as corros*, to find corrosion, corrosive and corroded.
H: Judging sources
- Prefer **peer-reviewed** and authoritative sources, such as standards bodies and government agencies.
- Check the **date**: an old standard may have been withdrawn or superseded.
- Consider the **authority** and possible bias of the author or publisher.
- Look at the **evidence**: methods, data and whether results have been reproduced.
- Keep a record of searches and manage references with software such as Zotero or Mendeley.
X: Searching for bridge bearing corrosion.
> Concepts: bridge, bearing, corrosion.
> Search string: (bridge* OR viaduct*) AND bearing* AND (corros* OR rust*).
> Scopus returns too many results, so the student adds AND inspection and limits to the last ten years.
> She also searches BSI Knowledge for the current bearing standards, BS EN 1337, and records each search in her logbook.
K: Engineering literature comes from databases such as Scopus, IEEE Xplore and Engineering Village and standards from BSI Knowledge; searches combine synonyms with OR and concepts with AND, and sources are judged on peer review, date, authority and evidence.
!: Relying on a general web search alone. Specialist databases and standards collections give more relevant, authoritative and current results.
EV: established | Peer review is the main quality control for published research, though it does not guarantee that findings are correct.
T: Peer review | Evaluation of a research paper by independent experts before publication
T: Boolean operators | The words AND, OR and NOT used to combine search terms
T: Grey literature | Material such as reports and theses published outside commercial journals
SUM: Use specialist databases.
SUM: OR broadens; AND narrows.
SUM: Check date and authority.
SRC: Booth A., Sutton A. and Papaioannou D., Systematic Approaches to a Successful Literature Review, 2nd edition, SAGE | secondary | 2016
SRC: Hart C., Doing a Literature Review: Releasing the Research Imagination, 2nd edition, SAGE | secondary | 2018
SRC: British Standards Institution, BSI Knowledge | data | 2024 | https://knowledge.bsigroup.com/
Q: Which Boolean operator broadens a search? | OR.
Q: Where can British Standards be searched in most universities? | BSI Knowledge.
M1#engineering-u12-08-q1@1: Which database is particularly focused on electrical, electronic and computing engineering? | IEEE Xplore | Espacenet | BSI Knowledge | PubMed | IEEE Xplore indexes IEEE and IET journals, conferences and standards.
M2#engineering-u12-08-q2@2: A search for wind AND turbine AND noise returns too few results. Which change is most likely to help? | Add synonyms with OR, such as noise OR acoustic | Add NOT turbine to the search string | Replace every AND with NOT | Put the whole string in a single quoted phrase | Combining synonyms with OR broadens each concept.
M3#engineering-u12-08-q3@3: A student finds a 1995 design standard on a website and plans to use it for a new design. What should she check first? | Whether it has been withdrawn or superseded | How many times the website has been visited | Whether the PDF can be printed in colour | Whether the author has a social media account | Designs must use current standards, so withdrawn editions should not be relied on.
MATCH1#engineering-u12-08-q4@2: Match each search technique to its effect. | OR = Broadens to include synonyms ; AND = Narrows to records with all concepts ; Quotation marks = Finds an exact phrase ; Truncation with * = Finds different word endings | Combining these builds a precise and complete search.
SA2#engineering-u12-08-q5@2,3: Describe how you would plan a literature search for an engineering project and judge the sources you find. | I would split the question into key concepts and list synonyms for each, then combine synonyms with OR and concepts with AND, using phrases and truncation. I would search specialist databases such as Scopus, IEEE Xplore or Engineering Village, and BSI Knowledge for standards, refining with date limits. I would judge sources on whether they are peer reviewed or from an authoritative body, how current they are, possible bias and the quality of their evidence. I would record searches and manage references with software. | Concepts and synonyms ; Boolean searching ; Databases and standards ; Evaluation criteria

## Laboratory practice and experimental design
LV: Year 1 · Intermediate
S: Laboratory work tests ideas and generates data that others rely on. This lesson covers safe laboratory practice, the design of fair experiments, and how to estimate and report measurement uncertainty.
O: Follow safe and well-recorded laboratory practice
O: Design an experiment with controlled variables, replication and randomisation
O: Estimate and report the uncertainty of a measured result
PRE: Uncertainty, significant figures and estimation
H: Good laboratory practice
P: Safe and reliable laboratory work begins before any equipment is switched on. A **risk assessment**, and a **COSHH** assessment for hazardous substances under the Control of Substances Hazardous to Health Regulations 2002, identify hazards and controls. Instruments should be **calibrated** against traceable standards. A **laboratory notebook** records the date, aims, equipment and serial numbers, settings, raw readings, observations and any changes as they happen, in ink and without erasing. Good records make work **reproducible** and protect against disputes. In an **experiment**, the **independent variable** is changed deliberately, the **dependent variable** is measured, and **control variables** are held constant so that the effect can be attributed fairly.
H: Designing an experiment
- State a clear aim or **hypothesis** before testing.
- Change one factor at a time, or use a **factorial design** to study several factors and their interactions efficiently.
- **Replicate** measurements to estimate random variation.
- **Randomise** the order of tests to avoid bias from drift or warm-up effects.
- Include a **control** or baseline where possible.
H: Measurement uncertainty
- **Random errors** scatter readings and are reduced by repeating measurements.
- **Systematic errors**, such as a zero offset, shift all readings and are not reduced by repetition.
- The **standard uncertainty of the mean** of n readings with standard deviation s is s divided by the square root of n.
- The Guide to the Expression of Uncertainty in Measurement (GUM) combines uncertainty sources and reports an **expanded uncertainty**, often with coverage factor k = 2 for about 95% confidence.
- Report results as value plus or minus uncertainty, with units and sensible significant figures.
X: Measuring a spring constant.
> A student hangs masses on a spring and measures extension, randomising the order of loads.
> Five repeat tests give stiffness values with mean 248 N/m and standard deviation 10 N/m.
> The standard uncertainty of the mean is 10 / square root of 5 = 4.5 N/m, and the expanded uncertainty with k = 2 is about 9 N/m.
> She reports k = 248 plus or minus 9 N/m (k = 2), noting that the ruler was checked for zero offset.
K: Safe laboratory work needs risk and COSHH assessments, calibrated instruments and a contemporaneous notebook; fair experiments control variables, replicate and randomise, and results are reported with uncertainty following the GUM.
!: Assuming that repeating a measurement removes all error. Repetition reduces random error but not systematic error, which needs calibration.
EV: established | The GUM (JCGM 100:2008) is the internationally accepted framework for evaluating and expressing measurement uncertainty.
T: Control variable | A factor kept constant so it does not affect the result
T: Randomisation | Running tests in random order to avoid bias from time-related effects
T: Expanded uncertainty | A standard uncertainty multiplied by a coverage factor, often 2
SUM: Assess risk, calibrate, record.
SUM: Control, replicate, randomise.
SUM: Report value with uncertainty.
SRC: Joint Committee for Guides in Metrology, JCGM 100:2008 Evaluation of measurement data. Guide to the expression of uncertainty in measurement | standard | 2008 | https://www.bipm.org/en/committees/jc/jcgm/publications
SRC: Montgomery D. C., Design and Analysis of Experiments, 9th edition, Wiley | secondary | 2017
SRC: The Control of Substances Hazardous to Health Regulations 2002, SI 2002/2677 | primary | 2002 | https://www.legislation.gov.uk/uksi/2002/2677/contents
Q: What is the standard uncertainty of the mean of n readings? | The standard deviation divided by the square root of n.
Q: What does COSHH stand for? | Control of Substances Hazardous to Health.
M1#engineering-u12-09-q1@1: In an experiment on how temperature affects a resistor's resistance, the resistance is the | dependent variable | independent variable | control variable | coverage factor | The measured quantity that responds to the change is the dependent variable.
M2#engineering-u12-09-q2@2: Why should the order of tests be randomised? | To avoid bias from drift or warm-up effects | To make the experiment take less time | To remove the need for repeat readings | To ensure every reading is identical | Randomisation spreads time-related effects across all conditions.
M3#engineering-u12-09-q3@3: A balance reads 0.5 g with nothing on it, and every reading is high by this amount. How should this be handled? | Correct for the zero offset or recalibrate | Take many more readings and average them | Ignore it, as random errors cancel out | Increase the coverage factor to 3 | This is a systematic error, which repetition does not remove.
NUM2#engineering-u12-09-q4@3: Nine repeat readings have a standard deviation of 0.6 mm. What is the standard uncertainty of their mean in mm? | 0.2 | 0.01 | mm | s / square root of n = 0.6 / 3, which gives 0.2 mm.
SA2#engineering-u12-09-q5@2,3: Describe how you would design and report a fair laboratory experiment. | I would start with a clear aim or hypothesis, a risk assessment and COSHH assessment, and check that instruments are calibrated. I would vary the independent variable, measure the dependent variable and hold control variables constant, replicating readings and randomising the test order. Everything would be recorded in a laboratory notebook as it happened. I would report results as the mean with its uncertainty, found from s divided by the square root of n and expanded with k = 2, together with any systematic corrections, units and sensible significant figures. | Safety and calibration ; Variables ; Replication and randomisation ; Uncertainty reporting

## Professional registration: EngTech, IEng and CEng
LV: Year 1 · Foundation
S: Professional registration shows that an engineer has met recognised standards of competence and commitment. This lesson explains the Engineering Council register, the three main titles, how they are gained through professional institutions, and how they are recognised internationally.
O: Describe the roles of the Engineering Council and the professional engineering institutions
O: Distinguish the titles EngTech, IEng and CEng
O: Outline the routes and steps to registration
PRE: The statement of ethical principles
H: The registration system
P: The **Engineering Council** holds the UK register of professional engineers and technicians and sets the standards for registration, chiefly **UK-SPEC** for engineers and technicians and **AHEP** (Accreditation of Higher Education Programmes) for degrees. It licenses **professional engineering institutions** (PEIs), such as the IMechE, ICE, IET, IChemE and RAeS, to assess candidates, accredit degrees and register members. The three main titles are **Engineering Technician** (EngTech), **Incorporated Engineer** (IEng) and **Chartered Engineer** (CEng). Registration is not a legal requirement for most engineering work in the UK, but many employers and clients value or require it, especially for safety-critical roles, and registrants commit to their institution's code of conduct and to continuing professional development.
H: The three titles
- **EngTech**: applies proven techniques and procedures to solve practical engineering problems, often after an approved apprenticeship or Level 3 qualification.
- **IEng**: maintains and manages applications of current and developing technology, often after an accredited bachelor's degree.
- **CEng**: develops solutions using new or existing technologies, through innovation, creativity and change, often after an accredited MEng or an accredited bachelor's degree plus further learning to master's level.
- The academic qualifications are **exemplifying**: other routes, such as work-based learning or an individual assessment, are available.
- The title ICTTech also exists for information and communications technicians.
H: Becoming registered
- Join a relevant licensed institution and record your experience and development.
- Gather evidence against the UK-SPEC competences, often with a mentor.
- Submit an application and attend a **professional review interview**.
- On success, use the post-nominal letters and pay an annual registration fee.
- Accredited degrees are recognised internationally through the **Washington Accord** (CEng level), **Sydney Accord** (IEng level) and **Dublin Accord** (EngTech level).
X: A route to chartership.
> A student completes an accredited BEng in mechanical engineering and joins the IMechE.
> She takes an accredited MSc part-time to meet the further learning requirement for CEng.
> Over several years she records experience against UK-SPEC with her mentor.
> She submits her application, passes the professional review interview and becomes a Chartered Engineer.
K: The Engineering Council licenses institutions to register EngTech, IEng and CEng against UK-SPEC; registration requires suitable learning, evidence of competence and a professional review, and accredited degrees are recognised through international accords.
!: Thinking a degree alone makes you a Chartered Engineer. Registration also requires demonstrated professional competence and commitment, assessed at a professional review.
EV: established | The Engineering Council sets the standards for, and holds the register of, UK professional engineers and technicians.
T: Chartered Engineer | The professional title for engineers who develop solutions through innovation, creativity and change
T: Professional engineering institution | A body licensed by the Engineering Council to assess and register engineers
T: Washington Accord | An international agreement recognising accredited engineering degrees at professional engineer level
SUM: Engineering Council holds the register.
SUM: EngTech, IEng, CEng.
SUM: Learning plus proven competence.
SRC: Engineering Council, UK Standard for Professional Engineering Competence and Commitment (UK-SPEC), 4th edition | standard | 2020 | https://www.engc.org.uk/standards-guidance/standards/uk-spec/
SRC: Engineering Council, The Accreditation of Higher Education Programmes (AHEP), 4th edition | standard | 2020 | https://www.engc.org.uk/standards-guidance/standards/accreditation-of-higher-education-programmes-ahep/
SRC: International Engineering Alliance, Washington Accord | guidance | 2024 | https://www.ieagreements.org/accords/washington/
Q: Which body holds the UK register of professional engineers? | The Engineering Council.
Q: What is the final assessment step for registration? | A professional review interview.
M1#engineering-u12-10-q1@1: Which title is usually associated with an accredited MEng degree? | CEng | EngTech | IEng | ICTTech | An accredited MEng is the exemplifying qualification for Chartered Engineer.
M2#engineering-u12-10-q2@2: What is the role of a professional engineering institution in registration? | It assesses candidates and registers them under licence | It passes laws that require all engineers to register | It replaces the need for any professional review | It awards university degrees directly to students | The Engineering Council licenses PEIs to assess and register members.
M3#engineering-u12-10-q3@3: An engineer with an accredited BEng wants to become a Chartered Engineer. What else is typically needed? | Further learning to master's level and demonstrated competence | Nothing more, as the degree confers the title | Only a fee paid to the Engineering Council | Ten years of experience in any industry | CEng needs master's-level learning, evidence against UK-SPEC and a professional review.
MATCH1#engineering-u12-10-q4@2: Match each title to its typical exemplifying qualification. | EngTech = Approved apprenticeship or Level 3 qualification ; IEng = Accredited bachelor's degree ; CEng = Accredited MEng degree ; ICTTech = Approved ICT technician qualification | Each title has exemplifying academic routes, with alternatives available.
SA2#engineering-u12-10-q5@1,3: Explain how an engineering graduate becomes professionally registered and why registration matters. | A graduate joins a licensed professional engineering institution, which works under the Engineering Council's standards. They must meet the learning requirement, for example an accredited MEng for CEng or an accredited bachelor's degree for IEng, then gain experience and gather evidence against the UK-SPEC competences, often with a mentor. They apply and attend a professional review interview. Registration matters because it shows independently assessed competence and commitment to a code of conduct, is valued by employers and clients, and is recognised internationally. | Institution and Engineering Council ; Learning requirement ; Competence evidence and review ; Value of registration

## The UK-SPEC competences
LV: Year 1 · Intermediate
S: UK-SPEC describes the competence and commitment expected of registered engineers and technicians. This lesson sets out its five areas of competence, explains how candidates provide evidence, and shows how students can start building that evidence now.
O: List the five areas of competence in UK-SPEC
O: Relate everyday engineering activities to the competence areas
O: Plan how to gather evidence of competence during study and early work
PRE: Professional registration: EngTech, IEng and CEng
H: Five areas of competence
P: The **UK Standard for Professional Engineering Competence and Commitment** (UK-SPEC), published by the Engineering Council, defines what EngTech, IEng and CEng registrants must be able to do. It is organised in five areas. **A: Knowledge and understanding** covers the engineering knowledge needed for the role. **B: Design, development and solving engineering problems** covers applying that knowledge to create and improve solutions. **C: Responsibility, management and leadership** covers planning, managing people, budgets and quality. **D: Communication and inter-personal skills** covers communicating with others and working in teams. **E: Personal and professional commitment** covers ethics, health and safety, sustainability, codes of conduct and continuing professional development. The same areas apply to each title, but the level expected rises from EngTech to IEng to CEng.
H: Providing evidence
- Candidates describe what **they** did, using "I" rather than "we", with specific examples.
- Each example should show the **situation**, the **action** taken and the **outcome**.
- Evidence can come from projects, design work, site work, reports and management roles.
- A mentor or supervisor can verify the examples.
- Many institutions provide online tools for mapping experience to UK-SPEC.
H: Starting as a student
- Degree learning contributes mainly to area A and parts of B.
- Group projects provide evidence for C and D.
- Placements and internships give real-world examples for every area.
- Keep a reflective log of what you did, what you learned and which competence it shows.
- Join your institution as a student member to access mentoring and resources.
X: Mapping a placement.
> During a placement, a student leads a small redesign of a pump mounting to cut vibration.
> Analysing vibration data and choosing a new mount shows area B.
> Organising tests with the workshop and keeping to budget shows area C, and writing the report shows area D.
> Completing the risk assessment and considering energy use shows area E, all recorded in her log.
K: UK-SPEC has five competence areas, A knowledge and understanding, B design and problem solving, C responsibility, management and leadership, D communication and inter-personal skills, and E personal and professional commitment, evidenced with specific personal examples.
!: Describing team achievements as "we did". Reviewers need to see your own contribution, so evidence should say what you personally did and decided.
EV: established | UK-SPEC sets out the competence and commitment standards for registration as EngTech, IEng and CEng.
T: UK-SPEC | The Engineering Council's standard of competence and commitment for registration
T: Competence | The ability to carry out a task to a defined standard, combining knowledge, skills and attitude
T: Mentor | An experienced engineer who guides and verifies a candidate's development
SUM: Five areas, A to E.
SUM: Show what you did.
SUM: Start logging now.
SRC: Engineering Council, UK Standard for Professional Engineering Competence and Commitment (UK-SPEC), 4th edition | standard | 2020 | https://www.engc.org.uk/standards-guidance/standards/uk-spec/
SRC: Institution of Mechanical Engineers, Chartered Engineer (CEng) application guidance | guidance | 2023 | https://www.imeche.org/membership-registration/professional-registration
Q: Which UK-SPEC area covers ethics, safety and CPD? | Area E, personal and professional commitment.
Q: Which UK-SPEC area covers teamwork and communication? | Area D, communication and inter-personal skills.
M1#engineering-u12-11-q1@1: How many areas of competence does UK-SPEC set out? | Five | Three | Seven | Ten | UK-SPEC is organised into five areas, labelled A to E.
M2#engineering-u12-11-q2@2: An engineer manages a project budget and a team of three technicians. Which UK-SPEC area does this mainly evidence? | C: Responsibility, management and leadership | A: Knowledge and understanding | B: Design and solving engineering problems | E: Personal and professional commitment | Managing people, resources and budgets falls in area C.
M3#engineering-u12-11-q3@3: Which statement is the strongest piece of evidence for a UK-SPEC application? | I selected a new bearing after calculating its life, cutting failures by half | We worked as a team on a bearing project last year | The company makes very high-quality bearings | Bearings are an important part of rotating machinery | Strong evidence describes the candidate's own action and its outcome.
MATCH2#engineering-u12-11-q4@2: Match each activity to the UK-SPEC area it mainly demonstrates. | Applying thermodynamics to size a heat exchanger = A: Knowledge and understanding ; Developing and testing a new fixture design = B: Design, development and solving engineering problems ; Presenting results to a client = D: Communication and inter-personal skills ; Carrying out a risk assessment and logging CPD = E: Personal and professional commitment | Each area captures a different aspect of professional competence.
SA2#engineering-u12-11-q5@1,3: Describe the five UK-SPEC competence areas and explain how a student can begin collecting evidence for them. | UK-SPEC sets out A knowledge and understanding, B design, development and solving engineering problems, C responsibility, management and leadership, D communication and inter-personal skills, and E personal and professional commitment, including ethics, safety and CPD. A student can begin by keeping a reflective log of projects, labs, placements and society roles, noting their own actions and outcomes. Group projects give evidence for C and D, design work for B, and risk assessments and sustainability considerations for E. Joining an institution as a student member gives access to mentoring and mapping tools. | Five areas named ; Reflective log ; Mapping activities ; Institution support

## Continuing professional development
LV: Year 1 · Foundation
S: Engineering knowledge changes quickly, so registered engineers must keep learning throughout their careers. This lesson explains continuing professional development, how to plan and record it, and how reflection turns experience into learning.
O: Explain what continuing professional development is and why it is required
O: Plan and record CPD against development needs
O: Use a reflective cycle to learn from experience
PRE: The UK-SPEC competences
H: What CPD is
P: **Continuing professional development** (CPD) is the systematic maintenance, improvement and broadening of knowledge and skills throughout a working life. UK-SPEC includes a commitment to CPD within area E, and the Engineering Council's CPD code expects registrants to take ownership of their learning, undertake a variety of development activities, record them and reflect on what they learned. Professional institutions **sample** members' CPD records each year and can ask for evidence. CPD is not just formal courses: it includes on-the-job learning, reading journals and standards, attending lectures, mentoring others, voluntary work and studying for further qualifications. The aim is to remain competent, adapt to new technologies such as digital tools and low-carbon methods, and progress in your career.
H: Planning and recording
- Identify **development needs** by comparing current skills with your role and goals.
- Set **objectives** and choose activities to meet them.
- **Record** each activity with its date, what you did and what you learned.
- **Reflect** on how you will apply the learning.
- **Review** progress at least yearly, often with a manager at an appraisal.
H: Learning from experience
- David Kolb's **experiential learning cycle** has four stages: concrete experience, reflective observation, abstract conceptualisation and active experimentation.
- Graham Gibbs's **reflective cycle** asks: description, feelings, evaluation, analysis, conclusion and action plan.
- Reflection turns events, including mistakes, into lasting learning.
- Writing short reflections soon after an event makes them more accurate.
- Sharing lessons with colleagues supports the learning of others, which also counts as CPD.
X: Reflecting on a failed test.
> A graduate's prototype bracket cracks during a fatigue test (concrete experience).
> She reviews the data and notices the crack began at a sharp internal corner (reflective observation).
> She reads about stress concentrations and fatigue design rules (abstract conceptualisation).
> She adds a larger fillet radius in the next design and tests again (active experimentation), then records the cycle as CPD.
K: CPD is lifelong, planned learning required of registered engineers; it is planned against needs, recorded and reflected on, and reflective cycles such as Kolb's turn experience into learning.
!: Treating CPD as only attending courses. Work-based learning, reading, mentoring and reflection all count, provided they are planned, recorded and reflected on.
EV: established | Professional engineering institutions require registrants to undertake and record CPD and may sample their records.
T: Continuing professional development | Systematic, lifelong maintenance and improvement of professional knowledge and skills
T: Reflective practice | Thinking critically about experience to learn and improve future action
T: Experiential learning cycle | Kolb's four-stage cycle of experience, reflection, conceptualisation and experimentation
SUM: Learning never stops.
SUM: Plan, do, record, reflect.
SUM: Reflection turns experience into learning.
SRC: Kolb D. A., Experiential Learning: Experience as the Source of Learning and Development, Prentice Hall | primary | 1984
SRC: Gibbs G., Learning by Doing: A Guide to Teaching and Learning Methods, Further Education Unit, Oxford Polytechnic | primary | 1988
SRC: Engineering Council, UK Standard for Professional Engineering Competence and Commitment (UK-SPEC), 4th edition | standard | 2020 | https://www.engc.org.uk/standards-guidance/standards/uk-spec/
Q: What are the four stages of Kolb's learning cycle? | Concrete experience, reflective observation, abstract conceptualisation and active experimentation.
Q: Why do institutions sample CPD records? | To check that registrants are maintaining their competence as required.
M1#engineering-u12-12-q1@1: Which of these counts as CPD for an engineer? | Reading a new standard and recording what was learned | Taking annual leave for a family holiday | Commuting to the office each day | Filing expense claims on time each month | Planned learning that is recorded and reflected on counts as CPD.
M2#engineering-u12-12-q2@2: What is the main purpose of reflection in CPD? | Turning experience into learning that changes future practice | Listing as many hours of training as possible | Proving to managers that no mistakes were made | Avoiding the need to set development objectives | Reflection links what happened to what you will do differently.
M3#engineering-u12-12-q3@3: An engineer moves from design into project management. What is the best first CPD step? | Identify the new skills needed and set objectives | Continue only the same design courses as before | Wait for the employer to arrange all training | Record past activities again under a new heading | CPD should be planned against current and future development needs.
SEQ1#engineering-u12-12-q4@3: Put Kolb's experiential learning cycle in order, starting from experience. | Concrete experience ; Reflective observation ; Abstract conceptualisation ; Active experimentation | The learner experiences, reflects, forms ideas and then tests them.
SA2#engineering-u12-12-q5@2,3: Explain how an engineer should plan and record CPD, and how a reflective cycle can help. | The engineer should identify development needs by comparing current skills with their role and career goals, set objectives, and choose varied activities such as courses, reading, on-the-job learning and mentoring. Each activity should be recorded with dates and learning outcomes and reviewed regularly, for example at an appraisal. A reflective cycle such as Kolb's, moving from experience through reflection and conceptualisation to experimentation, turns events, including mistakes, into lasting learning. This keeps the engineer competent and provides evidence if the institution samples their record. | Identify needs and objectives ; Varied activities ; Record and review ; Reflective cycle

## Intellectual property and contracts
LV: Year 1 · Advanced
S: Engineers create valuable ideas and work under legal agreements. This lesson explains the main types of intellectual property in the UK, how patents are obtained, who owns employees' inventions, and the basic elements of a contract.
O: Distinguish patents, copyright, designs, trade marks and confidential information
O: Explain the requirements for a patent and the risk of early disclosure
O: Identify the essential elements of a contract and common engineering contract forms
PRE: Design for manufacture and assembly
H: Types of intellectual property
P: **Intellectual property** (IP) is the legal protection of creations of the mind. A **patent**, granted in the UK by the **Intellectual Property Office** under the **Patents Act 1977**, gives the owner the right to stop others making, using or selling an invention for up to **20 years** from filing, provided renewal fees are paid. In return the invention is published. To be patentable an invention must be **new**, involve an **inventive step** that is not obvious to a skilled person, and be capable of **industrial application**. **Copyright** arises automatically for original works such as drawings, reports and software code. A **registered design** protects the appearance of a product for up to 25 years, renewed every five years. A **trade mark** protects brand names and logos and can be renewed every ten years indefinitely. **Confidential information**, including trade secrets, is protected by agreements and the law of confidence.
H: Patents in practice
- Any public disclosure before filing, including at a conference or trade show, can destroy **novelty**.
- Use a **non-disclosure agreement** (NDA) before discussing an invention with outsiders.
- Under section 39 of the Patents Act 1977, an invention made in the course of an employee's normal duties usually belongs to the **employer**.
- Patent searches on Espacenet help check novelty and avoid infringing others' rights.
- A patent is territorial: protection abroad needs separate or international applications.
H: Contracts
- A contract needs **offer**, **acceptance**, **consideration** (something of value exchanged), and an **intention to create legal relations**.
- Contracts define scope, price, programme, quality, liability and how disputes are resolved.
- Construction often uses standard forms such as **NEC4** and **JCT**, and international projects often use **FIDIC**.
- **Liability** for defects can arise in contract and in the law of negligence.
- Engineers should read and understand the contracts they work under and seek legal advice when needed.
X: A student's clever clamp.
> A student designs a new quick-release clamp during a sponsored project and wants to show it at a trade fair.
> Showing it before filing would make it part of the state of the art, so it would no longer be new.
> She checks the project agreement, which assigns IP to the sponsor, and the sponsor files a UK patent application first.
> The drawings themselves are protected by copyright, and the clamp's distinctive shape could also be a registered design.
K: UK IP includes patents for new, inventive and industrially applicable inventions (up to 20 years), automatic copyright, registered designs, trade marks and confidential information; early disclosure can destroy novelty, and contracts require offer, acceptance, consideration and intention.
!: Presenting an invention publicly and patenting it afterwards. In the UK, prior public disclosure usually destroys novelty, so file first or use an NDA.
EV: established | Under the Patents Act 1977 an invention must be new, involve an inventive step and be capable of industrial application to be patentable.
T: Patent | A time-limited right to stop others exploiting an invention, granted in exchange for publishing it
T: Inventive step | The requirement that an invention is not obvious to a person skilled in the field
T: Consideration | Something of value given by each party to a contract
SUM: Patents need novelty and inventiveness.
SUM: File before you disclose.
SUM: Contracts need offer, acceptance and consideration.
SRC: Patents Act 1977, c. 37 | primary | 1977 | https://www.legislation.gov.uk/ukpga/1977/37/contents
SRC: Intellectual Property Office, Intellectual property: an overview | guidance | 2023 | https://www.gov.uk/guidance/intellectual-property-an-overview
SRC: Uff J., Construction Law, 12th edition, Sweet and Maxwell | secondary | 2017
Q: What is the maximum term of a UK patent? | Twenty years from filing, if renewal fees are paid.
Q: Does copyright need to be registered in the UK? | No, it arises automatically.
M1#engineering-u12-13-q1@1: Which form of IP arises automatically, without registration, for an engineering drawing? | Copyright | Patent | Registered design | Trade mark | Copyright protects original works such as drawings as soon as they are created.
M2#engineering-u12-13-q2@2: Why should an inventor file a patent application before presenting at a conference? | Public disclosure can destroy the invention's novelty | Conferences own all inventions shown at them | Patents can only be filed by conference organisers | Disclosure doubles the length of patent protection | An invention must be new at the filing date to be patentable.
M3#engineering-u12-13-q3@3: An engineer employed to design pumps invents an improved impeller at work. Under the Patents Act 1977, who is most likely to own the invention? | The employer, as it arose from normal duties | The engineer personally in every case | The UK Intellectual Property Office | Any competitor who copies it first | Section 39 gives employers ownership of inventions made in the course of normal duties.
MATCH2#engineering-u12-13-q4@1: Match each item to the form of IP that best protects it. | A new mechanism for a valve = Patent ; A company logo = Trade mark ; The shape of a kettle = Registered design ; Source code for control software = Copyright | Different IP rights protect inventions, brands, appearance and original works.
SA2#engineering-u12-13-q5@2,3: Explain how an engineer should protect a new invention and why contracts matter in engineering work. | The engineer should keep the invention confidential, using a non-disclosure agreement for any outside discussion, and check who owns it under the employment or project contract. A patent search helps confirm novelty, and an application should be filed before any public disclosure, since the invention must be new, inventive and industrially applicable. Contracts matter because they define scope, price, programme, quality, IP ownership and liability, and need offer, acceptance, consideration and intention. Standard forms such as NEC4 help allocate risks clearly. | Confidentiality and NDA ; Ownership ; Patent requirements and timing ; Contract elements and role

## The individual project
LV: Year 1 · Intermediate
S: Most engineering degrees end with an individual project in which students investigate a problem independently. This lesson explains how to choose and define a project, plan and manage it, work with a supervisor, and write up and present the results.
O: Define a project with a clear aim, objectives and scope
O: Plan and manage an individual project using project management tools
O: Prepare a dissertation and presentation that meet assessment criteria
PRE: Scheduling: Gantt charts and the critical path
H: Defining the project
P: The **individual project** brings together the skills of a degree: technical knowledge, research, design, experimentation or modelling, project management and communication. The Engineering Council's **AHEP** standard expects accredited degrees to include substantial individual or group project work in which students apply their learning to complex problems. A good project starts with a clear **aim**, the overall goal, and three to five **SMART objectives** that break it into achievable steps. The **scope** sets what is and is not included. Choose a topic that interests you, can be done with the time, equipment and data available, and has a supervisor willing to guide it. An early **literature review** shows what is known and sharpens the research question. Some projects need **ethics approval**, for example if they involve human participants or personal data.
H: Managing the project
- Write a **project plan** with a Gantt chart, milestones and deliverables.
- Keep a **logbook** of meetings, decisions, results and ideas.
- Meet your supervisor regularly with an agenda and record agreed actions.
- Keep a **risk register**: equipment delays, software failures and data loss are common risks.
- Back up work in more than one place and use version control.
H: Writing up and presenting
- Follow the department's format and the assessment criteria closely.
- Structure the dissertation like a technical report: abstract, introduction, literature review, method, results, discussion, conclusions and further work.
- Critically discuss limitations and uncertainty rather than only describing results.
- Cite all sources, and follow the university's rules on academic integrity, including on the use of AI tools.
- Prepare a clear presentation or poster and practise answering questions for any viva.
X: Planning a heat-sink project.
> Aim: assess whether 3D-printed lattice heat sinks can outperform a conventional finned design for a given fan flow.
> Objectives include reviewing the literature by November, modelling three designs by January and testing printed prototypes by March.
> The Gantt chart shows printing on the critical path, so the student orders material early and books printer time.
> When the printer breaks, the risk register response, using the department's second printer, keeps the project on schedule.
K: A successful individual project has a clear aim, SMART objectives and scope, is managed with a Gantt chart, logbook, risk register and regular supervisor meetings, and is written up critically against the assessment criteria.
!: Leaving the write-up until the end. Writing sections such as the literature review and method as you go spreads the load and improves quality.
EV: established | The Engineering Council AHEP standard requires accredited engineering degrees to develop students' ability to apply knowledge to complex problems through project work.
T: Aim | The overall goal of a project
T: Logbook | A dated record of a project's meetings, decisions, results and ideas
T: Viva | An oral examination in which a student explains and defends their work
SUM: Aim, objectives, scope.
SUM: Plan, log and meet.
SUM: Write as you go.
SRC: Engineering Council, The Accreditation of Higher Education Programmes (AHEP), 4th edition | standard | 2020 | https://www.engc.org.uk/standards-guidance/standards/accreditation-of-higher-education-programmes-ahep/
SRC: Dawson C. W., Projects in Computing and Information Systems: A Student's Guide, 3rd edition, Pearson | secondary | 2015
SRC: Lock D., Project Management, 10th edition, Gower | secondary | 2013
Q: What is the difference between an aim and an objective? | The aim is the overall goal; objectives are specific steps that achieve it.
Q: Why keep a project logbook? | To record meetings, decisions, results and ideas as evidence and for the write-up.
M1#engineering-u12-14-q1@1: Which statement is best written as a project aim rather than an objective? | To assess whether lattice heat sinks outperform finned designs | Model three designs in software by 31 January | Print two test pieces by the end of week 8 | Book the wind tunnel for two days in March | The aim is the overall goal; the others are specific, time-bound objectives.
M2#engineering-u12-14-q2@2: A student's project depends on a single 3D printer that is often busy. How should this be handled in planning? | Record it as a risk with a response, such as booking early | Ignore it until the printer actually breaks down | Remove all printing work from the project | Assume the supervisor will deal with any delay | A risk register identifies threats in advance and plans responses.
M3#engineering-u12-14-q3@3: Which dissertation discussion is most likely to earn high marks? | One that compares results with theory and explains limitations | One that repeats every result in words without comment | One that only lists the equipment that was used | One that claims the results prove the theory beyond doubt | Critical discussion of meaning, comparison and uncertainty shows deeper understanding.
TF1#engineering-u12-14-q4@2: Writing the literature review and method sections during the project, rather than at the end, usually improves the final dissertation. | true | Writing as you go spreads the workload, records decisions accurately and leaves time for revision.
SA2#engineering-u12-14-q5@1,2: Describe how a student should define and manage an individual engineering project. | The student should choose a feasible topic with a supervisor, then define a clear aim and three to five SMART objectives with a stated scope, informed by an early literature review and any ethics approval needed. A project plan with a Gantt chart, milestones and deliverables shows the critical tasks. A logbook records meetings, decisions and results, and regular supervisor meetings keep the project on track. A risk register and backups protect against delays and data loss, and writing as the project proceeds leaves time for a critical write-up. | Aim and objectives ; Planning with Gantt ; Logbook and supervision ; Risks and writing as you go
`;
