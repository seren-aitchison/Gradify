// TechGradify · ForgeLab Computational Thinking and Problem Solving (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## What is computer science?
LV: GCSE · Foundation
S: Computer science is the study of computation: what can be computed, how to compute it efficiently and how to build reliable systems that do it. This lesson separates it from using computers or IT, and sets out its main branches and ways of thinking.
O: Define computer science and distinguish it from information technology and digital literacy
O: Describe the main areas of computer science and how they connect
O: Evaluate the claim that computer science is "just programming"
H: A working definition
P: **Computer science** studies computation and information: the theory of what can be computed, the design and analysis of **algorithms** (precise step-by-step methods), the data structures that store information, and the hardware, software and networks that carry it out. A **computer** is any device that takes input, processes it by following stored instructions and produces output.
P: It is different from **information technology** (IT), which is about using and managing computer systems in organisations, and from **digital literacy**, the everyday skill of using devices safely and well. A computer scientist asks why a method works, how fast it is and whether it can be trusted, not only how to use it.
H: The branches of the subject
- **Theory**: computability, complexity and logic: what problems can be solved at all, and at what cost.
- **Algorithms and data structures**: searching, sorting, graphs, trees and hash tables.
- **Programming and software engineering**: writing, testing and maintaining correct programs.
- **Systems**: processors, operating systems, networks and databases.
- **Applications**: security, artificial intelligence, graphics, human-computer interaction.
X: How computer science answers "how do I find a name in a list of a million?"
> A programmer could check every name in turn: up to 1,000,000 comparisons.
> A computer scientist notices that if the list is sorted, each comparison can discard half of what remains (binary search).
> 2^{20} is about a million, so at most about 20 comparisons are needed.
> The insight is about the method, not the machine: it works the same on any computer or language.
K: Computer science is about methods and their properties (correctness, efficiency, limits), not about a particular machine or program; programming is how its ideas are expressed and tested.
!: Treating computer science as "learning to use software" or "learning a language". Languages change every decade; algorithms, data structures and the principles of systems last.
EV: established | Some well-defined problems cannot be solved by any algorithm on any computer, as Turing proved for the halting problem in 1936.
EV: contested | How much of computer science is mathematics, engineering or science is debated; most curricula, including ACM CS2023, treat it as all three.
T: Computer science | The study of computation and information: algorithms, data, and the systems that process them
T: Algorithm | A finite, precise sequence of steps that solves a problem or carries out a task
T: Computer | A device that accepts input, processes it by following stored instructions and produces output
SUM: Computer science studies what can be computed and how to compute it efficiently and reliably.
SUM: Its branches run from theory and algorithms through programming and systems to applications such as security and AI.
SRC: ACM/IEEE-CS/AAAI Joint Task Force, Computer Science Curricula 2023 (CS2023) | standard | 2023 | https://csed.acm.org/
SRC: Wing J. M., "Computational thinking", Communications of the ACM 49(3), 33–35 | primary | 2006 | https://doi.org/10.1145/1118178.1118215
Q: What is an algorithm? | A finite, precise sequence of steps that solves a problem or carries out a task.
Q: How does computer science differ from IT? | Computer science studies computation, algorithms and how systems work; IT is about using and managing computer systems in organisations.
M1#computing-u01-01-q1@1: Which best describes computer science? | The study of computation, algorithms and the systems that carry them out | The skill of using office software and the internet safely | The management of computer equipment inside an organisation | The repair and maintenance of computer hardware | Computer science is about computation itself: what can be computed and how. Using software is digital literacy; managing systems is IT; repair is a technical trade.
M2#computing-u01-01-q2@2: A researcher proves that a new method finds routes on any map in half the steps of the old one. Which area of computer science is this mainly part of? | Algorithms and their analysis | Human-computer interaction | Computer networks | Operating systems | The result concerns the number of steps a method takes, which is the analysis of algorithms. Networks and operating systems are systems areas; HCI studies how people use computers.
TF1#computing-u01-01-q3@1: An algorithm is tied to one programming language and one kind of computer. | false | An algorithm is a method, independent of language and machine; the same algorithm can be written in Python, Java or pseudocode and run on any computer.
M3#computing-u01-01-q4@3: Which is the strongest reply to the claim that computer science is "just programming"? | Programming expresses ideas, but the subject also asks which methods are correct, efficient and possible at all | Programming is too easy to count as a university subject | Most computer scientists never write any code at all | Computer science is only about hardware and electronics | Programming is central but is the medium, not the whole: analysing correctness, efficiency and computability is what makes it a science. The other options are false or overstate the case.
SA3#computing-u01-01-q5@2,3: Evaluate the view that computer science is just programming. | Programming is central: it is how algorithms are expressed and tested. But computer science also covers theory (what can be computed, how fast), algorithm design and analysis, data structures, and systems such as processors, networks and databases. A binary search insight, or a proof that a problem is unsolvable, holds whatever the language. So programming is a core tool rather than the whole subject. | Acknowledges programming is central ; Names other areas such as theory, algorithms or systems ; Gives an example of an idea independent of language ; Explains that methods outlast languages ; Reaches a balanced judgement

## Abstraction
LV: GCSE · Foundation
S: Abstraction means removing detail that doesn't matter for a problem so that you can focus on what does. It is the most important idea in computational thinking, used in every map, model, data type and function.
O: Define abstraction and give examples of it in and outside computing
O: Decide which details to keep and which to remove when modelling a problem
O: Evaluate the benefits and risks of a particular abstraction
H: Removing unnecessary detail
P: **Abstraction** is the process of removing unnecessary detail from a problem so that only the features relevant to solving it remain. The result is a **model**: a simplified representation that is easier to reason about and to program.
P: The classic example is the London Underground map (Harry Beck, 1931). It ignores real distances and street geography and keeps only what a traveller needs: the stations, the lines and where they connect. That makes it far easier to plan a route than a scale map would.
H: Abstraction in computing
- **Data abstraction**: a variable called \`score\` stands for a number without saying how it is stored in binary.
- **Procedural abstraction**: calling \`len(names)\` gives a list's length without needing to know how Python counts it.
- **Layers**: an application uses the operating system, which uses the hardware; each layer hides the one below.
- **Generalisation**: a single function \`area(width, height)\` replaces many separate calculations.
X: Model a game of noughts and crosses for a program.
> Keep: the 3 × 3 grid, which cells hold X, O or nothing, whose turn it is.
> Remove: the colour of the board, the players' names, what the pieces are made of.
> Represent the grid as a list of nine cells: \`board = [" "] * 9\`.
> The program now reasons about only the information that decides the game.
K: A good abstraction keeps exactly the details needed for the purpose: too few and the model gives wrong answers, too many and it becomes hard to build and use.
!: Thinking abstraction means "make it vague". An abstraction must be precise about what it keeps; it only removes what doesn't affect the answer.
EV: established | Layered abstraction (hardware, operating system, applications) is how all modern computer systems are designed and managed.
EV: contested | Whether a given abstraction is "good" depends on its purpose: a tube map is excellent for routes and poor for estimating walking times.
T: Abstraction | Removing unnecessary detail so that only the features relevant to a problem remain
T: Model | A simplified representation of a real system, made by abstraction
T: Procedural abstraction | Using a named procedure or function without needing to know how it works inside
SUM: Abstraction keeps what matters for a problem and hides the rest, producing a model that is easier to reason about.
SUM: It appears in data (variables and types), procedures (functions) and layers (hardware, OS, applications).
SRC: Wing J. M., "Computational thinking", Communications of the ACM 49(3), 33–35 | primary | 2006 | https://doi.org/10.1145/1118178.1118215
SRC: OCR, A Level Computer Science H446 specification, section 2.1.1 "Thinking abstractly" | standard | 2015
Q: What is abstraction? | Removing unnecessary detail from a problem so that only the features relevant to solving it remain.
Q: Give an everyday example of abstraction. | The London Underground map: it removes real distances and streets and keeps stations, lines and connections.
M1#computing-u01-02-q1@1: What does abstraction involve? | Removing details that aren't needed to solve the problem | Splitting a problem into several smaller problems | Writing the solution in a programming language | Repeating a set of steps until a condition is met | Abstraction removes unnecessary detail. Splitting a problem up is decomposition; repetition is iteration.
M2#computing-u01-02-q2@2: A program simulates queues at a supermarket checkout. Which detail is best removed by abstraction? | The colour of each customer's coat | The time each customer arrives | How many items each customer has | How many tills are open | Arrival times, item counts and open tills all affect queue lengths; coat colour does not, so it can be removed.
MS2#computing-u01-02-q3@2: A satnav models a road network to find the fastest route. Choose the details it must keep. | Road lengths ; Speed limits ; Which roads connect at junctions | The names of houses along each road ; The colour of road signs | Fastest-route calculations need distances, speeds and connections; house names and sign colours don't affect journey time.
M3#computing-u01-02-q4@3: A flood-risk model of a town keeps the streets and buildings but treats the ground as flat. What is the main risk of this abstraction? | It removes a detail that matters, so its predictions of where water flows may be wrong | It keeps too much detail, so it will run too slowly to be useful | It is not an abstraction because it still includes buildings | It can't be programmed because real towns are not flat | Height decides where water flows, so removing it removes a relevant detail: the model becomes easier but wrong. An abstraction must keep every feature that affects the answer.
SA3#computing-u01-02-q5@2,3: Explain how abstraction is used in the London Underground map and evaluate it as a model. | The map removes geographical distance, street layout and exact positions, keeping stations, lines, interchanges and the order of stops. This makes route planning quick and the map easy to read. But because distances are distorted, it is poor for judging travel time or whether walking is quicker. It is a good abstraction for its purpose but misleading if used for another. | Identifies details removed ; Identifies details kept ; Explains the benefit for route planning ; Identifies a limitation from the removed detail ; Judges the abstraction against its purpose

## Decomposition
LV: GCSE · Foundation
S: Decomposition means breaking a complex problem into smaller sub-problems that can each be understood, solved and tested separately. It underlies structure diagrams, functions and the division of work in a software team.
O: Define decomposition and explain why it makes problems easier to solve
O: Decompose a problem into sub-problems and represent it as a structure diagram
O: Evaluate how well a decomposition supports testing, reuse and teamwork
H: Breaking problems down
P: **Decomposition** is breaking a problem into smaller, more manageable sub-problems. Each sub-problem is decomposed again until every part is simple enough to solve directly, often as a single function. The solutions are then combined to solve the whole problem.
P: A **structure diagram** shows a decomposition as a tree: the whole problem at the top, its sub-problems beneath it, and each of those broken down further. Reading from left to right usually gives the order in which the parts run.
X: Decompose a quiz program.
> Top level: run a quiz.
> Sub-problems: load the questions; ask each question; check the answer; keep the score; show the result.
> "Ask each question" splits again: display the question; get the user's answer; validate it.
> Each bottom-level box becomes one small function, such as \`check_answer(given, correct)\`, that can be written and tested on its own.
K: Decompose until each part does one clear job: small parts are easier to write, test, reuse and share among a team.
H: Why it helps
- **Manageable**: each part is small enough to understand completely.
- **Testable**: each part can be tested on its own before being combined (unit testing).
- **Reusable**: a part such as "validate a date" can be used in other programs.
- **Teamwork**: different programmers can build different parts at the same time.
!: Decomposing by when things happen ("first half of the program, second half") rather than by what each part does. Good parts have a single purpose and few connections to other parts.
EV: established | Parnas (1972) argued that systems should be split into modules that each hide one design decision, an idea behind modern modular design.
EV: contested | How small parts should be is a judgement: very fine decomposition can make a program harder to follow.
T: Decomposition | Breaking a problem into smaller sub-problems that can be solved separately
T: Structure diagram | A tree diagram showing how a problem is decomposed into sub-problems
T: Module | A self-contained part of a program that performs one task, such as a function
SUM: Decomposition breaks a problem into sub-problems until each is simple to solve, then combines the solutions.
SUM: It makes programs easier to write, test, reuse and divide among a team.
SRC: Parnas D. L., "On the criteria to be used in decomposing systems into modules", Communications of the ACM 15(12), 1053–1058 | primary | 1972 | https://doi.org/10.1145/361598.361623
SRC: AQA, GCSE Computer Science 8525 specification, section 3.1.1 "Representing algorithms" | standard | 2020
Q: What is decomposition? | Breaking a complex problem into smaller sub-problems that can each be solved separately.
Q: What does a structure diagram show? | How a problem is decomposed: the whole problem at the top and its sub-problems as boxes beneath it.
M1#computing-u01-03-q1@1: Which describes decomposition? | Breaking a problem into smaller sub-problems | Removing detail that isn't needed | Finding similarities between problems | Writing an algorithm as a flowchart | Decomposition breaks a problem down. Removing detail is abstraction; finding similarities is pattern recognition.
M2#computing-u01-03-q2@2: A team is building an online shop. Which is the best first-level decomposition? | Product catalogue, basket, payment, user accounts | Morning work, afternoon work, evening work | Python code, HTML code, CSS code | The easy parts and the hard parts | Each sub-problem should be a distinct job of the system. Splitting by time of day, by language or by difficulty doesn't produce parts with a clear single purpose.
TF1#computing-u01-03-q3@2: A benefit of decomposition is that each sub-problem can be tested separately before the parts are combined. | true | Small parts can be unit tested on their own, so errors are found and fixed where they occur.
M3#computing-u01-03-q4@3: A program is decomposed into two huge functions, each doing many unrelated tasks. What is the main weakness? | Each part has several jobs, so it is hard to test, reuse or share | It has too many functions to be maintained easily | Functions can't call each other in Python | Decomposition only applies to hardware, not software | Good decomposition gives each part one clear purpose; two large multi-purpose functions lose most of the benefits of testing, reuse and teamwork.
SA3#computing-u01-03-q5@2,3: Decompose a program that lets a student book a library room, and explain how your decomposition helps the developers. | Top level: book a room. Sub-problems: log in the student; show available rooms and times; choose a slot; check it is still free; record the booking; send a confirmation. Each becomes a function that can be written and unit tested separately, by different developers at once, and parts such as log in can be reused in other library programs. | Breaks the problem into sensible sub-problems ; Sub-problems each have one clear purpose ; Shows at least two levels or a structure ; Explains testing benefit ; Explains reuse or teamwork benefit

## Algorithmic thinking
LV: GCSE · Foundation
S: Algorithmic thinking is the ability to define a precise, ordered set of steps that solves a problem for every valid input. This lesson introduces the three building blocks of every algorithm (sequence, selection and iteration) and what makes an algorithm correct.
O: Describe sequence, selection and iteration and identify them in an algorithm
O: Write a simple algorithm with clear inputs, steps and outputs
O: Evaluate an algorithm for correctness, termination and clarity
H: Sequence, selection and iteration
P: An **algorithm** is a finite sequence of precise steps that solves a problem. Every algorithm can be built from three constructs:
- **Sequence**: steps carried out one after another, in order.
- **Selection**: choosing which steps to run depending on a condition (\`if\`).
- **Iteration**: repeating steps, either a set number of times (\`for\`) or until a condition changes (\`while\`).
P: In 1966 Böhm and Jacopini showed that these three structures are enough to express any computable procedure, which is why structured programming uses nothing else.
X: An algorithm to find the largest number in a list.
> Input: a list of numbers, such as 4, 9, 2, 7.
> Set \`largest\` to the first number (4). This is sequence.
> For each remaining number (iteration): if it is bigger than \`largest\` (selection), set \`largest\` to it. 9 replaces 4; 2 and 7 don't replace 9.
> Output \`largest\`: 9. The algorithm works for any non-empty list, not only this one.
K: An algorithm must be unambiguous, finite and correct for every valid input, not just the example you tried.
H: What makes a good algorithm
- **Correct**: gives the right output for every valid input, including edge cases such as an empty list.
- **Terminates**: always stops after a finite number of steps.
- **Unambiguous**: each step has exactly one meaning.
- **Efficient**: doesn't waste steps or memory.
!: Testing an algorithm on one typical example and assuming it is correct. Try edge cases: the first item being largest, all items equal, negative numbers, an empty input.
EV: established | Sequence, selection and iteration are sufficient to express any algorithm (Böhm and Jacopini, 1966).
EV: established | Whether an arbitrary algorithm terminates can't be decided in general (the halting problem), so termination has to be argued for each algorithm.
T: Sequence | Instructions carried out one after another in order
T: Selection | Choosing which instructions to run based on a condition
T: Iteration | Repeating a set of instructions, a fixed number of times or until a condition is met
SUM: Every algorithm is built from sequence, selection and iteration.
SUM: A good algorithm is correct for all valid inputs, terminates, is unambiguous and is efficient.
SRC: Böhm C. and Jacopini G., "Flow diagrams, Turing machines and languages with only two formation rules", Communications of the ACM 9(5), 366–371 | primary | 1966 | https://doi.org/10.1145/355592.365646
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 1 | secondary | 2022
Q: Name the three basic programming constructs. | Sequence, selection and iteration.
Q: What two properties must every algorithm have besides being correct? | It must terminate after a finite number of steps, and each step must be unambiguous.
M1#computing-u01-04-q1@1: Which construct repeats a set of instructions? | Iteration | Selection | Sequence | Abstraction | Iteration repeats steps. Selection chooses between paths; sequence runs steps in order; abstraction is not a programming construct.
M2#computing-u01-04-q2@2: "If the temperature is below 5, display a frost warning." Which construct does this use? | Selection | Iteration | Sequence only | Decomposition | The step runs only when a condition is true, which is selection. Nothing is repeated, so it is not iteration.
SEQ2#computing-u01-04-q3@2: Put the steps of the "find the largest" algorithm in order. | Set largest to the first item ; Move to the next item ; Compare the item with largest ; Replace largest if the item is bigger ; Output largest after the last item | The initial value must be set before comparing; each item is compared and possibly replaces largest; output happens only after the loop ends.
M3#computing-u01-04-q4@3: An algorithm to find the largest number starts by setting \`largest\` to 0. For which input does it fail? | A list where every number is negative | A list where the largest number comes first | A list containing duplicate numbers | A list with only one positive number | With all negative numbers nothing beats 0, so it wrongly outputs 0. Starting with the first item avoids this edge case.
SA3#computing-u01-04-q5@2,3: Explain what makes an algorithm correct, and how you would check one that finds the average of a list of exam marks. | A correct algorithm gives the right output for every valid input and terminates. To check an averaging algorithm I would trace it with typical data (50, 60, 70 gives 60), with edge cases such as one mark or all marks equal, and with an empty list, where dividing by zero must be handled. I would also confirm the loop visits every mark exactly once so it always terminates. | States correctness means all valid inputs ; States it must terminate ; Uses typical test data with expected result ; Identifies the empty-list edge case ; Explains checking each item is processed once

## Pattern recognition and generalisation
LV: GCSE · Foundation
S: Pattern recognition means spotting similarities between problems or within a problem, so that a solution can be reused. Generalisation turns those patterns into a single, adaptable solution such as a loop or a function with parameters.
O: Explain pattern recognition and generalisation as parts of computational thinking
O: Generalise repeated steps into a loop or a function with parameters
O: Evaluate when generalising a solution is and is not worthwhile
H: Spotting patterns
P: **Pattern recognition** is finding similarities: steps that repeat, problems that share a structure, or data that follows a rule. Once a pattern is found, **generalisation** replaces the specific cases with one general solution that takes the differences as inputs (parameters).
P: Repeated instructions suggest a loop; a calculation done several times with different values suggests a function; two problems with the same shape (finding the cheapest flight, finding the shortest route) suggest a shared algorithm.
X: Generalising repeated code.
> Specific: \`print(1 * 7)\`, \`print(2 * 7)\`, \`print(3 * 7)\` … up to 12.
> Pattern: the only thing that changes is the first number, which goes up by 1.
> Generalise with a loop: \`for i in range(1, 13): print(i * 7)\`.
> Generalise again with a parameter: \`def times_table(n)\` loops over 1 to 12 and prints \`i * n\`, so one function produces any table.
K: Find what stays the same and what changes: what stays the same becomes the body of a loop or function; what changes becomes a loop variable or a parameter.
H: Benefits and limits
- Shorter programs with less repetition, so fewer places for errors.
- A fix in one place corrects every use.
- General solutions can be reused on new problems.
- But generalising too early adds parameters and options nobody needs, making code harder to read.
!: Copying and pasting a block of code and changing one value each time. If the same lines appear three times, generalise them.
EV: established | Reducing duplicated code reduces the chance of inconsistent fixes; this is the "don't repeat yourself" principle widely taught in software engineering.
EV: contested | When to generalise is a judgement: many engineers wait until a pattern appears two or three times rather than designing for imagined future cases.
T: Pattern recognition | Identifying similarities within or between problems
T: Generalisation | Replacing specific cases with one solution that works for a whole class of problems
T: Parameter | A named input to a function that lets the same code work with different values
SUM: Pattern recognition spots what problems or steps share; generalisation turns that into one reusable solution.
SUM: What stays the same becomes the code; what changes becomes a parameter or loop variable.
SRC: Grover S. and Pea R., "Computational thinking in K–12: a review of the state of the field", Educational Researcher 42(1), 38–43 | secondary | 2013 | https://doi.org/10.3102/0013189X12463051
SRC: Python Software Foundation, The Python Tutorial, section 4 "More Control Flow Tools" | guidance | 2024 | https://docs.python.org/3/tutorial/controlflow.html
Q: What is generalisation? | Replacing specific cases with a single solution, such as a loop or function with parameters, that works for a whole class of problems.
Q: In repeated code, what usually becomes the parameter? | The value that changes between the repeated cases.
M1#computing-u01-05-q1@1: What is pattern recognition in computational thinking? | Spotting similarities within or between problems | Removing details that aren't needed | Breaking a problem into parts | Testing a program with unusual data | Pattern recognition finds similarities that can be reused. Removing detail is abstraction; breaking down is decomposition.
M2#computing-u01-05-q2@2: A program contains \`print("Hi Ann")\`, \`print("Hi Bob")\` and \`print("Hi Cat")\`. What is the best generalisation? | A function \`greet(name)\` that prints "Hi " followed by the name | Three separate functions, one for each name | A longer program with each line repeated twice | Deleting two of the three lines | Only the name changes, so it becomes a parameter of one function that handles any name.
TF1#computing-u01-05-q3@2: Generalising a solution always makes a program easier to read. | false | Generalising repeated code usually helps, but adding parameters for cases that never occur can make code harder to read.
M3#computing-u01-05-q4@3: A developer writes one function with eight optional parameters to handle every report the company might ever need, though only one report exists. What is the best judgement? | It is premature generalisation: simpler code for the one real case would be clearer | It is ideal, because general code is always better | It is wrong because functions may have only one parameter | It is decomposition, not generalisation | Generalisation pays off when a real pattern exists; designing for imagined cases adds complexity with no current benefit.
SA3#computing-u01-05-q5@2,3: Explain how pattern recognition and generalisation could improve a program that calculates the area of five different rectangles with five separate blocks of code. | The five blocks share a pattern: each multiplies a width by a height. Only the values change. Generalise by writing one function \`area(width, height)\` that returns width times height, and call it five times, or loop over a list of sizes. The program becomes shorter, a single fix corrects every case and the function can be reused for any rectangle. | Identifies the repeated pattern ; Identifies what changes ; Proposes a function or loop with parameters ; Explains a benefit such as fewer errors or one fix ; Mentions reuse

## Thinking ahead and thinking procedurally
LV: A level · Application
S: Thinking ahead means identifying a solution's inputs, outputs and preconditions before building it, and planning for reuse. Thinking procedurally means identifying the components of a solution and the order in which they must run.
O: Identify the inputs, outputs and preconditions of a problem before designing a solution
O: Explain caching and reusable components as ways of thinking ahead
O: Order the sub-procedures of a solution and justify the order chosen
H: Thinking ahead
P: Before writing code, a programmer decides what the solution needs (**inputs**), what it must produce (**outputs**) and what must already be true for it to work (**preconditions**). A binary search, for example, has the precondition that the list is sorted. Stating preconditions makes a component easier to reuse, because anyone calling it knows what they must supply.
P: Thinking ahead also means planning for **reusable program components** (functions and libraries written once, used many times) and **caching**: storing the result of an expensive operation so that the next request is served quickly. Web browsers cache images; a CPU cache holds recently used data.
X: Thinking ahead about a function that returns a student's average mark.
> Inputs: a list of marks.
> Output: the mean as a number.
> Precondition: the list must not be empty, otherwise the division fails.
> Decision: either state the precondition in the documentation or check for an empty list and handle it.
K: State inputs, outputs and preconditions first: they define what the component promises and what its caller must provide.
H: Thinking procedurally
P: **Thinking procedurally** means identifying the components (sub-procedures) of a solution and the order in which they must run. Some orders are forced: data must be validated before it is stored. Others are free, and recognising those helps with thinking concurrently.
!: Treating caching as free. A cache uses memory and can serve **stale** data if the original changes, so it must be invalidated or refreshed.
EV: established | Caching improves performance whenever the same data is requested repeatedly, which is why it appears at every level from CPU hardware to web servers.
EV: established | Stating preconditions and postconditions ("design by contract") makes components easier to verify and reuse.
T: Precondition | A condition that must be true before a procedure runs for it to work correctly
T: Caching | Storing the results of operations or fetched data so that later requests for them are faster
T: Reusable component | A tested piece of code, such as a function or library, that can be used in several programs
SUM: Thinking ahead identifies inputs, outputs and preconditions, and plans for caching and reusable components.
SUM: Thinking procedurally identifies the sub-procedures and the order they must run in.
SRC: OCR, A Level Computer Science H446 specification, sections 2.1.2 "Thinking ahead" and 2.1.3 "Thinking procedurally" | standard | 2015
SRC: Meyer B., "Applying design by contract", IEEE Computer 25(10), 40–51 | primary | 1992 | https://doi.org/10.1109/2.161279
Q: What is a precondition? | A condition that must be true before a procedure runs for it to work correctly, such as a list being sorted before a binary search.
Q: What is one drawback of caching? | It uses extra memory and can return stale data if the original changes.
M1#computing-u01-06-q1@1: Which is a precondition of binary search? | The list must be sorted | The list must contain numbers only | The list must have an even length | The list must contain no duplicates | Binary search discards half the list each step, which only works if the items are in order.
M2#computing-u01-06-q2@2: A weather website stores today's forecast for each town for ten minutes rather than recalculating it on every visit. What is this an example of? | Caching | Decomposition | Pattern recognition | Validation | Keeping a computed result to serve later requests faster is caching. The trade-off is that the forecast may be up to ten minutes old.
SEQ2#computing-u01-06-q3@3: Order these sub-procedures for registering a new user. | Read the user's details ; Validate the details ; Check the username is not already taken ; Store the new account ; Send a confirmation email | Data must be read before it can be checked, checked before it is stored, and only a stored account should be confirmed.
M3#computing-u01-06-q4@3: A shop caches product prices for one hour to reduce load on its database. A manager changes a price. What is the main risk? | Customers may see the old price until the cache is refreshed | The database will be overloaded by the cache | The cache will make the new price appear early | The program will crash because caches can't hold prices | Caches can hold stale data. The usual fix is to invalidate the cached item when the original is updated.
SA3#computing-u01-06-q5@2,3: Explain how thinking ahead would help when designing a function to search a list of usernames. | Identify inputs (the list and the name sought) and the output (found or not, or its position). Identify preconditions: if a binary search is used, the list must be sorted, so either sort it first or state this. Consider whether the function will be reused elsewhere and make it general. If the same searches repeat, a cache or a set could speed them up, at the cost of memory and keeping it up to date. | Identifies inputs and output ; Identifies a precondition ; Discusses reuse ; Discusses caching or a faster structure ; Notes a trade-off

## Pseudocode
LV: GCSE · Foundation
S: Pseudocode is a structured, language-independent way of writing an algorithm. Exam boards publish their own pseudocode styles; this lesson teaches the common constructs and how to translate them into Python.
O: Explain the purpose of pseudocode and why it is language-independent
O: Write algorithms in pseudocode using sequence, selection and iteration
O: Translate between pseudocode and Python, and judge whether pseudocode is precise enough
H: Why pseudocode?
P: **Pseudocode** describes an algorithm in structured English-like statements. It ignores the strict syntax of a real language so that the reader can focus on the logic. Because it is **language-independent**, the same pseudocode can be implemented in Python, Java or C#. AQA and OCR each publish a reference pseudocode (OCR's is called the Exam Reference Language); exam answers in any clear, consistent pseudocode usually earn credit.
H: Common constructs
- Assignment: \`total ← 0\` (AQA) or \`total = 0\` (OCR).
- Input and output: \`name ← USERINPUT\` and \`OUTPUT name\` (AQA); \`name = input()\` and \`print(name)\` (OCR).
- Selection: \`IF mark ≥ 50 THEN … ELSE … ENDIF\`.
- Count-controlled loop: \`FOR i ← 1 TO 10 … ENDFOR\`.
- Condition-controlled loops: \`WHILE … ENDWHILE\` and \`REPEAT … UNTIL\`.
P: Subroutines are written \`SUBROUTINE name(parameters) … ENDSUBROUTINE\` (AQA) or \`function name(parameters) … endfunction\` (OCR), with \`RETURN\` giving back a value. Indent the body of every IF, loop and subroutine so that its structure is visible.
X: Translate a pseudocode algorithm into Python.
> Pseudocode: \`total ← 0\`, then \`FOR i ← 1 TO 5\`, \`total ← total + i\`, \`ENDFOR\`, \`OUTPUT total\`.
> Python: \`total = 0\`, then \`for i in range(1, 6):\` with the indented line \`total = total + i\`, then \`print(total)\`.
> Note \`range(1, 6)\` stops before 6, so it gives 1 to 5, matching \`1 TO 5\`.
> Output: 15.
K: Pseudocode must be precise enough to implement without guessing, but free of any one language's syntax.
!: Off-by-one translation. Pseudocode \`FOR i ← 1 TO 5\` includes 5; Python \`range(1, 5)\` does not. Use \`range(1, 6)\`.
EV: established | Pseudocode is used in algorithm textbooks such as CLRS to state algorithms independently of any language.
EV: contested | There is no single standard pseudocode; examiners accept any clear, consistent style, though each board publishes a reference.
T: Pseudocode | A structured, language-independent notation for writing an algorithm
T: Count-controlled loop | A loop that repeats a fixed number of times, such as FOR
T: Condition-controlled loop | A loop that repeats while or until a condition holds, such as WHILE or REPEAT…UNTIL
SUM: Pseudocode states an algorithm's logic without a real language's syntax, so it can be implemented in any language.
SUM: Its core constructs are assignment, input and output, IF, FOR, WHILE and REPEAT…UNTIL.
SRC: AQA, GCSE Computer Science 8525 pseudo-code guide | standard | 2020
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, section 2.1 "Pseudocode conventions" | secondary | 2022
Q: Why is pseudocode described as language-independent? | It ignores the syntax of any real language, so the same algorithm can be implemented in any language.
Q: What is the difference between WHILE and REPEAT…UNTIL? | WHILE checks its condition before each pass and may run zero times; REPEAT…UNTIL checks after each pass, so it always runs at least once.
M1#computing-u01-07-q1@1: What is the main purpose of pseudocode? | To describe an algorithm's logic without a language's syntax | To run a program faster than Python | To translate a program into machine code | To draw the structure of a program as boxes | Pseudocode is a planning and communication notation; it is not executed or compiled.
M2#computing-u01-07-q2@2: Which Python loop matches the pseudocode \`FOR i ← 1 TO 10\`? | \`for i in range(1, 11):\` | \`for i in range(1, 10):\` | \`for i in range(10):\` | \`while i < 10:\` | \`range(1, 11)\` gives 1 up to and including 10. \`range(1, 10)\` stops at 9; \`range(10)\` gives 0 to 9.
TF1#computing-u01-07-q3@1: A REPEAT…UNTIL loop always runs its body at least once. | true | The condition is checked at the end of each pass, so the body runs before the first check.
M3#computing-u01-07-q4@3: A student writes the step "sort the list properly" in pseudocode for an exam answer about sorting. Why would it earn little credit? | It is too vague to implement without guessing the method | It uses English words instead of Python | Pseudocode can't describe sorting | It should be drawn as a flowchart instead | Pseudocode must be precise enough to follow step by step; "sort properly" hides the very algorithm the question asks for.
SA3#computing-u01-07-q5@2,3: Write pseudocode that asks for numbers until the user enters 0, then outputs their total, and explain your choice of loop. | total ← 0 ; num ← USERINPUT ; WHILE num ≠ 0: total ← total + num, num ← USERINPUT ; ENDWHILE ; OUTPUT total. A condition-controlled WHILE loop is used because the number of inputs isn't known in advance; reading the first number before the loop means a 0 entered first gives a total of 0 without adding anything. | Initialises total ; Uses a condition-controlled loop ; Correct condition to stop on 0 ; Adds each number and re-reads input ; Justifies the choice of loop

## Flowcharts
LV: GCSE · Foundation
S: A flowchart shows an algorithm as a diagram of standard symbols joined by arrows. This lesson covers the symbols, how they show sequence, selection and iteration, and when a flowchart helps more than pseudocode.
O: Identify the standard flowchart symbols and their meanings
O: Draw and follow a flowchart that uses selection and iteration
O: Compare flowcharts and pseudocode as ways of representing algorithms
H: The symbols
- **Terminator** (rounded rectangle): Start and Stop.
- **Process** (rectangle): a calculation or assignment, such as total = total + price.
- **Input/output** (parallelogram): reading data or displaying a result.
- **Decision** (diamond): a yes/no question with two exits.
- **Subroutine** (rectangle with double sides): a call to a separate procedure.
- **Arrows** (flow lines): show the order in which steps run.
P: The symbols are defined in the international standard ISO 5807 and used by the exam boards. A decision always has exactly two labelled exits, Yes and No (or True and False).
H: Selection and iteration in a flowchart
P: Selection appears as a decision whose two exits rejoin later. Iteration appears as a decision whose arrow loops back to an earlier step: the loop continues until the condition sends the flow onwards.
X: Follow a flowchart that counts down.
> Start. Process: set n to 3.
> Decision: is n > 0? Yes: output n, then process: n = n − 1, then the arrow returns to the decision.
> Outputs 3, 2, 1. When n is 0, the decision answers No.
> Output "Lift off", then Stop.
K: In a flowchart, a loop is a decision with an arrow back to an earlier step; selection is a decision whose two paths rejoin further on.
!: Giving a decision diamond only one exit, or leaving its exits unlabelled. Every decision needs two labelled outcomes.
EV: established | Flowchart symbols are standardised in ISO 5807:1985.
EV: contested | Flowcharts are clear for small algorithms but become hard to follow for large ones, which is one reason professional developers more often use pseudocode or UML.
T: Flowchart | A diagram of standard symbols joined by arrows that shows the steps of an algorithm
T: Decision symbol | A diamond containing a yes/no question, with two labelled exits
T: Terminator | The rounded symbol marking the start or end of a flowchart
SUM: Flowcharts show algorithms visually with terminators, processes, input/output, decisions and subroutine symbols.
SUM: Loops are decisions that point back; selections are decisions whose branches rejoin.
SRC: ISO 5807:1985, Information processing: documentation symbols and conventions for data, program and system flowcharts | standard | 1985
SRC: OCR, GCSE Computer Science J277 specification, section 2.1.2 "Designing, creating and refining algorithms" | standard | 2020
Q: What shape is a decision in a flowchart? | A diamond, with two labelled exits such as Yes and No.
Q: Which flowchart symbol is used for input and output? | A parallelogram.
M1#computing-u01-08-q1@1: Which symbol represents a calculation such as total = total + 1? | Rectangle (process) | Diamond (decision) | Parallelogram (input/output) | Rounded rectangle (terminator) | Calculations and assignments are processes, drawn as rectangles.
M2#computing-u01-08-q2@2: A flowchart has a decision "Is password correct?" whose No exit points back to "Input password". What does this represent? | Iteration until the correct password is entered | Selection between two separate outputs | A subroutine call | The end of the algorithm | An arrow back to an earlier step makes a loop: the user is asked again until the condition is met.
MATCH1#computing-u01-08-q3@1: Match each flowchart symbol to its use. | Diamond = decision ; Parallelogram = input or output ; Rectangle = process ; Rounded rectangle = start or stop | These are the standard ISO 5807 meanings used in GCSE and A level exams.
M3#computing-u01-08-q4@3: Why are flowcharts rarely used to design large software systems? | They grow too large to follow, whereas pseudocode and modular diagrams scale better | They can't represent iteration at all | They can only be drawn by hand, not with software | They are not allowed by the ISO standard for programs | Flowcharts can show any algorithm, but for large systems the diagrams become unwieldy; structured pseudocode, structure diagrams and UML scale better.
SA3#computing-u01-08-q5@2,3: Describe a flowchart that inputs an exam mark and outputs "Pass" if it is 40 or more and "Fail" otherwise, then compare it with pseudocode for the same task. | Start (terminator) → input mark (parallelogram) → decision "mark ≥ 40?" (diamond) → Yes: output "Pass"; No: output "Fail" (parallelograms) → both paths join → Stop. The flowchart makes the two paths visible at a glance, which suits beginners and small algorithms; pseudocode is quicker to write, easier to edit and closer to code, and scales better to longer algorithms. | Correct start and stop terminators ; Input symbol for the mark ; Decision with two labelled exits ; Outputs on each branch ; Compares a strength of each representation

## Trace tables
LV: GCSE · Application
S: A trace table records the value of each variable as an algorithm runs, line by line. Tracing by hand is how you find out what code does, check it is correct and locate logic errors; it is a standard exam task.
O: Explain the purpose of a trace table
O: Complete a trace table for an algorithm with selection and iteration
O: Use a trace table to locate and explain a logic error
H: How to trace
P: A **trace table** has a column for each variable (and often for the condition being tested and for output), and a new row whenever a value changes. You "dry run" the algorithm by hand, following each line exactly as the computer would, without assuming what it is meant to do.
- Write only what the code does, not what you expect.
- Record a value each time it changes.
- Evaluate each condition with the current values.
X: Trace \`total = 0\`, then \`for n in range(1, 5):\` with the indented line \`if n % 2 == 0: total = total + n\`, then \`print(total)\`.
> Start: total = 0.
> n = 1: \`1 % 2\` is 1, condition False; total stays 0.
> n = 2: \`2 % 2\` is 0, condition True; total = 0 + 2 = 2.
> n = 3: False; total stays 2. n = 4: True; total = 2 + 4 = 6.
> \`range(1, 5)\` stops before 5, so the loop ends. Output: 6, the sum of the even numbers from 1 to 4.
K: Trace exactly what the code says, one line at a time, recording every change: the computer doesn't know what you meant.
H: Tracing to find errors
P: If the trace gives a different result from the expected one, the first row where they differ points to the error. Trace tables find **logic errors**, which produce wrong output without crashing.
!: Forgetting that Python's \`range(a, b)\` stops at b − 1, so the trace includes one loop too many.
EV: established | Studies of novice programmers find that the ability to trace code reliably is closely related to the ability to write it (Lister et al., 2004).
EV: established | Dry running is a standard technique for desk-checking algorithms in both exams and industry code review.
T: Trace table | A table recording the values of variables at each step as an algorithm is dry run
T: Dry run | Working through an algorithm by hand, step by step, without a computer
T: Logic error | An error that makes a program produce the wrong result without crashing
SUM: A trace table records each variable's value as you dry run an algorithm line by line.
SUM: It shows what code actually does and pinpoints where a logic error first appears.
SRC: Lister R. et al., "A multi-national study of reading and tracing skills in novice programmers", ACM SIGCSE Bulletin 36(4), 119–150 | primary | 2004 | https://doi.org/10.1145/1041624.1041673
SRC: Python Software Foundation, The Python Tutorial, section 4.3 "The range() function" | guidance | 2024 | https://docs.python.org/3/tutorial/controlflow.html
Q: What is a trace table used for? | Recording variable values step by step during a dry run, to see what an algorithm does and find logic errors.
Q: What does \`7 % 2\` give in Python? | 1, the remainder when 7 is divided by 2.
M1#computing-u01-09-q1@1: What is a dry run? | Working through an algorithm by hand, step by step | Running a program with no input data | Compiling a program without running it | Testing a program on a different computer | A dry run is a manual trace of the algorithm, usually recorded in a trace table.
M2#computing-u01-09-q2@2: Trace \`x = 1\`, then \`while x < 20:\` with the indented line \`x = x * 3\`. What is x when the loop ends? | 27 | 9 | 20 | 18 | x goes 1, 3, 9, 27. When x is 9 the condition is still True, so it becomes 27; then 27 < 20 is False and the loop stops.
M2#computing-u01-09-q3@3: A loop meant to add the numbers 1 to 10 is \`for i in range(1, 10): total = total + i\`. A trace gives 45, not 55. What is the error? | The range stops at 9, so 10 is never added | total was never multiplied by i | The loop should start at 0 | The addition should be total = i | \`range(1, 10)\` gives 1 to 9, totalling 45; \`range(1, 11)\` is needed to include 10.
TF1#computing-u01-09-q4@1: A trace table can find syntax errors that stop a program from running. | false | Trace tables are for logic: syntax errors are reported by the translator before the program runs.
M3#computing-u01-09-q5@3: Trace \`a = 5\` then \`b = 3\` then \`a = a + b\` then \`b = a - b\` then \`a = a - b\`. What are a and b at the end? | a = 3, b = 5 | a = 5, b = 3 | a = 8, b = 5 | a = 3, b = 3 | a becomes 8; b becomes 8 − 3 = 5; a becomes 8 − 5 = 3. The code swaps the two values without a temporary variable.
SA3#computing-u01-09-q6@2,3: Explain why tracing code by hand is still valuable when a computer can run the code instantly. | Running code shows only the final output; a trace shows every intermediate value, so it reveals where and why a logic error occurs. Tracing builds a mental model of how the code executes, which research links to the ability to write code. It works on paper in exams and on code that can't easily be run, such as one function from a large system. But for long or complex code a debugger, which steps through it automatically, is more practical. | Running shows only output, trace shows intermediate values ; Locates logic errors ; Builds understanding of execution ; Useful without a computer or in exams ; Notes a limitation or the debugger alternative

## Boolean logic
LV: GCSE · Foundation
S: Boolean logic works with values that are either True or False and combines them with the operators AND, OR and NOT. It is the basis of every condition in a program and every circuit in a processor.
O: Define the Boolean operators AND, OR and NOT and evaluate expressions that use them
O: Write Boolean conditions for real situations in Python and in logic notation
O: Explain how the order of evaluation affects the result of a Boolean expression
H: True, False and three operators
P: A **Boolean** value is either True or False (in circuits, 1 or 0), named after George Boole, whose *Laws of Thought* (1854) set out an algebra of logic. Three operators combine Boolean values:
- **AND** (conjunction, written A ∧ B or A.B): True only if both inputs are True.
- **OR** (disjunction, A ∨ B or A + B): True if at least one input is True.
- **NOT** (negation, ¬A or A with a bar over it): reverses the input.
H: Combining operators in code
P: In Python these are \`and\`, \`or\` and \`not\`, and comparisons such as \`age >= 18\` produce Boolean values. NOT is applied first, then AND, then OR, unless brackets say otherwise.
X: Evaluate \`not (age < 13) and (member or age >= 65)\` when age = 70 and member = False.
> \`age < 13\` is False, so \`not (age < 13)\` is True.
> \`member\` is False and \`age >= 65\` is True, so the OR gives True.
> True and True gives True.
> The person qualifies: aged over 12, and either a member or 65 or over.
K: AND needs both; OR needs at least one; NOT flips. Use brackets to make the order of evaluation explicit.
!: Writing \`if x == 1 or 2:\` in Python. It means \`(x == 1) or 2\`, and 2 counts as True, so the condition is always True. Write \`if x == 1 or x == 2:\`.
EV: established | Shannon (1937–38) showed that Boolean algebra describes relay and switching circuits, the foundation of digital electronics.
EV: established | Python evaluates \`and\` and \`or\` lazily (short-circuit evaluation): the right-hand side is skipped if the left decides the result.
T: Boolean | A data type with only two values, True and False
T: AND | An operator that gives True only when both inputs are True
T: OR | An operator that gives True when at least one input is True
SUM: Boolean values are True or False; AND, OR and NOT combine them.
SUM: NOT is evaluated before AND, and AND before OR; brackets override this.
SRC: Boole G., An Investigation of the Laws of Thought, Walton and Maberly | primary | 1854
SRC: Python Software Foundation, The Python Language Reference, section 6.11 "Boolean operations" | standard | 2024 | https://docs.python.org/3/reference/expressions.html
Q: When is A AND B True? | Only when both A and B are True.
Q: In what order are NOT, AND and OR evaluated without brackets? | NOT first, then AND, then OR.
M1#computing-u01-10-q1@1: What is True OR False? | True | False | It can't be evaluated | It depends on the order | OR gives True if at least one input is True.
M2#computing-u01-10-q2@2: A ride is allowed if a person is at least 120 cm tall and not pregnant. Which Python condition is correct? | \`height >= 120 and not pregnant\` | \`height >= 120 or not pregnant\` | \`height > 120 and pregnant\` | \`not height >= 120 and pregnant\` | Both conditions must hold, so AND is needed; \`not pregnant\` is True for someone who isn't pregnant; \`>=\` includes exactly 120 cm.
TF1#computing-u01-10-q3@2: In Python, \`True or False and False\` evaluates to True. | true | AND is evaluated first: False and False is False; then True or False is True.
M3#computing-u01-10-q4@3: Why is \`if colour == "red" or "blue":\` a bug in Python? | The right side is the non-empty string "blue", which is always truthy, so the condition is always True | Python doesn't allow \`or\` between strings | It compares colour with the word "or" | It is only True when colour is both red and blue | Each side of \`or\` is evaluated separately; a non-empty string counts as True. The fix is \`colour == "red" or colour == "blue"\`.
SA3#computing-u01-10-q5@2,3: A school gives a prize to students with attendance over 95% who either have no detentions or have a merit award. Write this as a Boolean expression and explain how brackets affect its meaning. | \`attendance > 95 and (detentions == 0 or merit)\`. Without brackets, AND binds before OR, so \`attendance > 95 and detentions == 0 or merit\` would mean (attendance over 95 with no detentions) or merit, giving the prize to anyone with a merit even with poor attendance. The brackets keep the attendance rule for everyone. | Correct comparison for attendance ; Correct OR between detentions and merit ; Uses brackets around the OR ; Explains AND is evaluated before OR ; Gives the wrong meaning without brackets

## Logic gates and truth tables
LV: GCSE · Application
S: Logic gates are electronic circuits that carry out Boolean operations on binary signals. This lesson covers the AND, OR, NOT, NAND, NOR and XOR gates, their truth tables and how to combine them into circuits.
O: State the truth table for AND, OR, NOT, NAND, NOR and XOR gates
O: Complete a truth table for a circuit of combined gates
O: Explain why NAND gates are called universal and why this matters in chip design
H: The gates
- **AND**: output 1 only if both inputs are 1.
- **OR**: output 1 if at least one input is 1.
- **NOT**: one input; output is the opposite.
- **NAND** (NOT AND): output 0 only if both inputs are 1.
- **NOR** (NOT OR): output 1 only if both inputs are 0.
- **XOR** (exclusive OR): output 1 if the inputs differ.
P: A **truth table** lists every combination of inputs and the resulting output. With n inputs there are 2^{n} rows: 4 rows for two inputs, 8 for three.
E: Q = A AND B :: 1 only for A = 1, B = 1
E: Q = A XOR B :: 1 for (0, 1) and (1, 0); 0 when the inputs match
X: Truth table for Q = NOT (A OR B) AND C (a NOR gate feeding an AND gate).
> Three inputs, so 8 rows: A, B and C each 0 or 1.
> A OR B is 0 only when A = 0 and B = 0; so NOT (A OR B) is 1 only in those rows.
> The AND with C gives 1 only when A = 0, B = 0 and C = 1.
> So Q is 1 in exactly one row of the eight: (0, 0, 1).
K: Build truth tables column by column: one column for each intermediate gate output, then the final output, for all 2^{n} input combinations.
H: Universal gates
P: Any Boolean function can be built from NAND gates alone (and also from NOR alone). For example, NOT A = A NAND A. Chip manufacturers exploit this because NAND gates are cheap and fast to make in CMOS technology.
!: Mixing up NOR and XOR. With inputs 1 and 1, XOR gives 0 (they are the same) and NOR also gives 0, but with 0 and 0, XOR gives 0 while NOR gives 1.
EV: established | NAND and NOR are each functionally complete: every Boolean function can be built from either alone.
EV: established | Modern processors contain billions of transistors arranged as logic gates.
T: Logic gate | An electronic circuit that performs a Boolean operation on one or more binary inputs
T: Truth table | A table listing the output of a logic circuit for every combination of inputs
T: XOR | Exclusive OR: output 1 when exactly one of two inputs is 1
SUM: AND, OR, NOT, NAND, NOR and XOR gates each have a fixed truth table; n inputs give 2^{n} rows.
SUM: NAND (or NOR) alone can build any circuit, which simplifies chip manufacture.
SRC: Shannon C. E., "A symbolic analysis of relay and switching circuits", Transactions of the American Institute of Electrical Engineers 57(12), 713–723 | primary | 1938 | https://doi.org/10.1109/T-AIEE.1938.5057767
SRC: Harris D. M. and Harris S. L., Digital Design and Computer Architecture, 2nd edition, Morgan Kaufmann, chapter 1 | secondary | 2012
Q: How many rows does a truth table for three inputs need? | 8, because 2^{3} = 8.
Q: When does an XOR gate output 1? | When its two inputs are different.
M1#computing-u01-11-q1@1: Which gate outputs 1 only when both inputs are 1? | AND | OR | XOR | NOR | AND requires both inputs to be 1. OR needs at least one; XOR needs them to differ; NOR needs both to be 0.
M2#computing-u01-11-q2@2: What is the output of NOT (A AND B) when A = 1 and B = 0? | 1 | 0 | It depends on C | It can't be determined | A AND B is 0, and NOT 0 is 1. This is a NAND gate.
MATCH1#computing-u01-11-q3@1: Match each gate to the inputs that give an output of 1. | NOR = only 0 and 0 ; AND = only 1 and 1 ; XOR = 0 and 1 or 1 and 0 ; NAND = every input except 1 and 1 | Each gate's truth table defines exactly which combinations give 1.
M3#computing-u01-11-q4@3: Why can NOT A be built from a single NAND gate? | Joining both NAND inputs to A gives NOT (A AND A), which equals NOT A | A NAND gate already has one input | NAND gates always output the opposite of their first input only | It can't: NOT needs its own separate gate | A AND A equals A, so NOT (A AND A) is NOT A. This is part of why NAND is universal.
SA3#computing-u01-11-q5@2,3: Explain what is meant by saying NAND is a universal gate and why that matters for manufacturing chips. | A universal (functionally complete) gate can be combined to build any Boolean function. NOT A is A NAND A; AND is a NAND followed by a NOT made from NAND; OR follows from De Morgan's law as (NOT A) NAND (NOT B). So a chip can be made from one kind of gate. In CMOS technology NAND gates are small and fast, so building from a single repeated cell simplifies design and manufacture. | Defines universal gate ; Shows NOT from NAND ; Shows or describes AND or OR from NAND ; Mentions De Morgan or an equivalent argument ; Explains the manufacturing benefit

## Simplifying Boolean expressions
LV: A level · Application
S: Boolean algebra lets you simplify logic expressions so that circuits need fewer gates and conditions are easier to read. This lesson covers the main identities, De Morgan's laws and Karnaugh maps.
O: Apply Boolean identities and De Morgan's laws to simplify expressions
O: Use a Karnaugh map to simplify an expression of up to four variables
O: Explain why simplifying a Boolean expression matters for circuits and code
H: Identities and laws
E: A AND 1 = A ; A AND 0 = 0 :: identity and null laws for AND
E: A OR 0 = A ; A OR 1 = 1 :: identity and null laws for OR
E: A AND NOT A = 0 ; A OR NOT A = 1 :: complement laws
E: NOT (NOT A) = A :: double negation
E: A OR (A AND B) = A :: absorption
E: NOT (A AND B) = NOT A OR NOT B :: De Morgan's first law
E: NOT (A OR B) = NOT A AND NOT B :: De Morgan's second law
P: The commutative, associative and distributive laws also hold: A AND (B OR C) = (A AND B) OR (A AND C), and, unlike ordinary algebra, A OR (B AND C) = (A OR B) AND (A OR C).
X: Simplify (A AND B) OR (A AND NOT B).
> Factor out A by the distributive law: A AND (B OR NOT B).
> Complement law: B OR NOT B = 1.
> Identity law: A AND 1 = A.
> Result: A. The circuit needs no gates at all: the output simply equals A.
K: De Morgan's laws: break the bar, change the sign. NOT over an AND becomes an OR of NOTs, and vice versa.
H: Karnaugh maps
P: A **Karnaugh map** arranges a truth table's outputs in a grid whose rows and columns are labelled in Gray code (00, 01, 11, 10), so that adjacent cells differ by one variable. Grouping adjacent 1s in rectangles of 1, 2, 4 or 8 cells (groups may wrap round the edges) shows which variables can be eliminated: each group gives one term, keeping only the variables that don't change within it.
!: Applying De Morgan's law without changing the operator: NOT (A AND B) is not NOT A AND NOT B.
EV: established | De Morgan's laws and the other Boolean identities hold for all values and can be proved by truth tables.
EV: established | Karnaugh maps (Karnaugh, 1953) are practical by hand for up to about four variables; larger problems use algorithmic methods.
T: De Morgan's laws | NOT (A AND B) = NOT A OR NOT B, and NOT (A OR B) = NOT A AND NOT B
T: Karnaugh map | A grid of a truth table's outputs, arranged so that grouping adjacent 1s gives a simplified expression
T: Absorption | The law A OR (A AND B) = A, and A AND (A OR B) = A
SUM: Boolean identities, the distributive laws and De Morgan's laws simplify expressions.
SUM: Karnaugh maps simplify by grouping adjacent 1s in powers of two.
SRC: Karnaugh M., "The map method for synthesis of combinational logic circuits", Transactions of the American Institute of Electrical Engineers, Part I, 72(5), 593–599 | primary | 1953 | https://doi.org/10.1109/TCE.1953.6371932
SRC: AQA, A-level Computer Science 7517 specification, section 4.6.4 "Boolean algebra" | standard | 2015
Q: State De Morgan's first law. | NOT (A AND B) = NOT A OR NOT B.
Q: Why are Karnaugh map rows labelled 00, 01, 11, 10? | It is Gray code: adjacent cells differ in only one variable, so adjacent 1s can be grouped.
M1#computing-u01-12-q1@1: What does A OR NOT A simplify to? | 1 | 0 | A | NOT A | The complement law: a value or its opposite is always True.
M2#computing-u01-12-q2@1: Which expression equals NOT (A OR B)? | NOT A AND NOT B | NOT A OR NOT B | A AND B | NOT A OR B | De Morgan's second law: negating an OR gives the AND of the negations.
M2#computing-u01-12-q3@2: Simplify A AND (A OR B). | A | B | A AND B | A OR B | Absorption: if A is 1 the result is 1; if A is 0 it is 0, whatever B is.
M3#computing-u01-12-q4@3: A Python condition reads \`not (age < 18 or banned)\`. Which equivalent condition avoids the negated bracket? | \`age >= 18 and not banned\` | \`age >= 18 or not banned\` | \`age < 18 and banned\` | \`not age < 18 or banned\` | De Morgan: NOT (X OR Y) = NOT X AND NOT Y; NOT (age < 18) is age >= 18.
SA3#computing-u01-12-q5@2,3: Simplify (A AND B) OR (A AND NOT B) OR (NOT A AND B), showing each law used, and explain the benefit. | Combine the first two terms: A AND (B OR NOT B) = A AND 1 = A (distributive, complement, identity). The expression is now A OR (NOT A AND B). By the distributive law for OR, this is (A OR NOT A) AND (A OR B) = 1 AND (A OR B) = A OR B. The circuit falls from five gates to one OR gate, so it is cheaper, faster and uses less power. | Groups the first two terms by distribution ; Uses the complement and identity laws ; Applies distribution of OR over AND ; Correct result A OR B ; Explains the benefit of fewer gates

## Thinking concurrently
LV: A level · Application
S: Thinking concurrently means identifying parts of a problem that can happen at the same time. This lesson explains concurrency and parallelism, where they speed up a solution and the problems they bring, such as race conditions and deadlock.
O: Distinguish concurrent processing from parallel processing
O: Identify parts of a problem that can be processed concurrently
O: Evaluate the benefits and drawbacks of concurrent solutions, including race conditions and deadlock
H: Concurrency and parallelism
P: **Concurrent processing** means several tasks are in progress during the same period, their steps interleaved. **Parallel processing** means tasks literally run at the same instant on different processor cores. A single-core computer can be concurrent (switching rapidly between tasks) but not parallel.
P: Tasks can run concurrently when neither needs the other's result. Downloading ten images is a good fit; the steps of a calculation that each need the previous answer are not.
X: Two threads add 1 to a shared counter at the same time, starting from 5.
> Thread A reads 5. Thread B reads 5 before A has written back.
> A writes 6. B writes 6.
> Two increments should give 7, but the counter shows 6: a **race condition**.
> Fix: a lock lets only one thread read and update the counter at a time.
K: Concurrency speeds up independent tasks, but any shared data must be protected, and the speed-up is limited by the parts that must still run in sequence.
H: Benefits and problems
- **Faster** overall for independent tasks, especially on multicore processors.
- **More responsive**: a program can keep its interface working while a long task runs.
- **Race conditions**: results depend on unpredictable timing when tasks share data.
- **Deadlock**: two tasks each hold a resource the other needs, so both wait forever.
- **Harder** to write, test and debug, because faults may not repeat.
!: Assuming that doubling the cores halves the time. Amdahl's law shows the sequential part of a task limits the overall speed-up.
EV: established | Amdahl (1967) argued that the speed-up from parallel processing is limited by the fraction of a task that must run sequentially.
EV: established | Coffman et al. (1971) identified four conditions that must all hold for deadlock: mutual exclusion, hold and wait, no pre-emption and circular wait.
T: Concurrent processing | Several tasks in progress over the same period, with their steps interleaved
T: Race condition | A fault where the result depends on the unpredictable timing of tasks sharing data
T: Deadlock | A state in which two or more tasks each wait for a resource held by another, so none can continue
SUM: Concurrency interleaves tasks; parallelism runs them at the same instant on several cores.
SUM: It speeds up independent tasks but brings race conditions and deadlock, and gains are limited by sequential parts.
SRC: Amdahl G. M., "Validity of the single processor approach to achieving large scale computing capabilities", AFIPS Conference Proceedings 30, 483–485 | primary | 1967 | https://doi.org/10.1145/1465482.1465560
SRC: Coffman E. G., Elphick M. J. and Shoshani A., "System deadlocks", ACM Computing Surveys 3(2), 67–78 | primary | 1971 | https://doi.org/10.1145/356586.356588
Q: What is a race condition? | A fault where the outcome depends on the unpredictable timing of tasks that share data.
Q: Can a single-core processor process tasks concurrently? | Yes, by interleaving them, but not in parallel.
M1#computing-u01-13-q1@1: What is the difference between concurrent and parallel processing? | Parallel tasks run at the same instant on separate cores; concurrent ones may just be interleaved | Concurrent tasks always need more than one processor | Parallel processing switches rapidly between tasks on one core | There is no difference between the two terms | Concurrency means overlapping in time; parallelism means simultaneous execution on several cores.
M2#computing-u01-13-q2@2: Which task is most suitable for concurrent processing? | Resizing 500 separate photos | Calculating each Fibonacci number from the previous two | Reading a file and then printing its first line | Validating a password before logging in | Each photo is independent, so they can be processed at once. The others depend on earlier results.
TF1#computing-u01-13-q3@3: Doubling the number of processor cores always halves the time a program takes. | false | Amdahl's law: the part that must run sequentially limits the speed-up, and there are coordination overheads.
M3#computing-u01-13-q4@3: Process P holds the printer and waits for the scanner; process Q holds the scanner and waits for the printer. What has happened? | Deadlock: each holds a resource the other needs | A race condition on shared data | Starvation of a low-priority process | Parallel processing working normally | Circular waiting for held resources is deadlock; neither process can proceed until one releases its resource.
SA3#computing-u01-13-q5@2,3: A video game must load a level, play music and respond to the player's controls. Evaluate the use of concurrent processing for it. | Music, input handling and loading are largely independent, so running them concurrently keeps the game responsive and, on a multicore console, uses cores in parallel for speed. However, they share data such as the game state, so access must be controlled with locks to avoid race conditions, and careless locking can cause deadlock. Concurrent code is harder to test because faults depend on timing. Overall concurrency is worthwhile here, provided shared state is carefully managed. | Identifies independent tasks ; Explains responsiveness or speed benefit ; Identifies race condition risk on shared data ; Identifies deadlock or testing difficulty ; Reaches a justified judgement

## The limits of computation
LV: A level · Evaluation
S: Some problems can't be solved by any algorithm, and others can be solved in principle but would take impossibly long. This lesson introduces Turing machines, the halting problem and the difference between tractable and intractable problems.
O: Describe a Turing machine and explain its significance
O: Explain the halting problem and why it shows some problems are non-computable
O: Distinguish tractable from intractable problems and evaluate how heuristics are used for the latter
H: Turing machines and computability
P: In 1936 Alan Turing described an abstract machine: an infinite tape of cells, a read/write head and a finite set of states with transition rules ("in state 1 reading 0, write 1, move right, go to state 2"). A **Turing machine** is simple but, according to the Church–Turing thesis, can compute anything that any algorithm can. A **universal Turing machine** reads another machine's description from its tape and simulates it: the idea of the stored-program computer.
H: The halting problem
P: The **halting problem** asks whether there is an algorithm that, given any program and its input, decides whether the program eventually stops. Turing proved there is not.
X: Why no perfect halting checker can exist (proof by contradiction).
> Suppose \`halts(p, x)\` always correctly returns True if program p stops on input x.
> Build \`trouble(p)\`: if \`halts(p, p)\` is True, loop forever; otherwise stop.
> Ask what \`trouble(trouble)\` does. If it stops, halts said it stops, so it loops forever. If it loops, halts said it loops, so it stops.
> Both cases contradict, so the assumed \`halts\` can't exist.
K: Non-computable problems can't be solved by any algorithm on any computer, however fast; intractable problems can be solved in principle but not in reasonable (polynomial) time for large inputs.
H: Tractable and intractable
P: A problem is **tractable** if an algorithm solves it in polynomial time, such as O(n^{2}). It is **intractable** if the best known algorithms need exponential or factorial time, such as checking every route in the travelling salesman problem (about n! routes). For intractable problems, programs use **heuristics**: rules of thumb that give a good-enough answer quickly without guaranteeing the best.
!: Thinking a faster computer could solve the halting problem. Non-computability is a logical limit, not a speed limit.
EV: established | The halting problem is undecidable (Turing, 1936).
EV: contested | Whether P = NP, that is, whether every problem whose answers can be checked quickly can also be solved quickly, is unproven and one of the Clay Millennium Prize Problems.
EV: hypothetical | The Church–Turing thesis, that Turing machines capture everything "effectively computable", is widely accepted but can't be proved, because "effectively computable" is informal.
T: Turing machine | An abstract model of computation: a tape, a read/write head, states and transition rules
T: Halting problem | Deciding, for any program and input, whether the program will stop; proved to be unsolvable
T: Intractable problem | A problem solvable in principle but with no known polynomial-time algorithm
T: Heuristic | A rule of thumb that finds a good-enough solution quickly without guaranteeing the best one
SUM: Turing machines define what is computable; the halting problem shows some problems are not.
SUM: Intractable problems are solvable only in impractical time; heuristics give good-enough answers.
SRC: Turing A. M., "On computable numbers, with an application to the Entscheidungsproblem", Proceedings of the London Mathematical Society s2-42(1), 230–265 | primary | 1936 | https://doi.org/10.1112/plms/s2-42.1.230
SRC: Sipser M., Introduction to the Theory of Computation, 3rd edition, Cengage, chapters 4 and 7 | secondary | 2013
Q: What does the halting problem show? | That some problems are non-computable: no algorithm can decide, for every program and input, whether the program stops.
Q: What is a heuristic? | A rule of thumb that finds a good-enough solution quickly without guaranteeing the best one.
M1#computing-u01-14-q1@1: What did Turing prove about the halting problem? | No algorithm can solve it for all programs and inputs | It can be solved with enough memory | It can be solved only for Python programs | It is solvable but intractable | The proof by contradiction shows no general halting checker can exist, regardless of resources.
M2#computing-u01-14-q2@3: A delivery company has 60 drops a day and wants the shortest route. Why does its software use a heuristic? | Checking every possible route would take far too long, so a good route found quickly is used instead | The shortest route can't exist for more than 50 drops | Heuristics always find the exact shortest route faster | Route planning is a non-computable problem | The travelling salesman problem is intractable: 60 drops give an astronomical number of routes. A heuristic trades guaranteed optimality for speed.
TF1#computing-u01-14-q3@1: An intractable problem can't be solved by any algorithm. | false | It can be solved in principle; the difficulty is that known algorithms take impractically long for large inputs. Unsolvable problems are called non-computable.
M3#computing-u01-14-q4@3: In the halting proof, what makes \`trouble(trouble)\` contradictory? | It does the opposite of whatever \`halts\` predicts about it | It runs out of memory before halting | It calls itself, which Python forbids | It halts on every input it receives | Whatever \`halts(trouble, trouble)\` answers, \`trouble\` does the opposite, so \`halts\` must be wrong: the contradiction shows it can't exist.
SA3#computing-u01-14-q5@2,3: Explain the difference between a non-computable problem and an intractable problem, and evaluate how computer scientists deal with each. | A non-computable problem, like the halting problem, has no algorithm at all; an intractable problem, like the travelling salesman problem, has an algorithm but it takes exponential or factorial time. For non-computable problems we solve restricted versions (tools that detect some infinite loops) and accept they will sometimes be unable to answer. For intractable problems we use heuristics or approximation algorithms that give good answers quickly, or exact methods for small inputs. Neither limit is removed by faster hardware. | Defines non-computable with an example ; Defines intractable with an example ; Describes restricted or partial solutions ; Describes heuristics or approximation ; Notes faster hardware doesn't remove the limits
`;
