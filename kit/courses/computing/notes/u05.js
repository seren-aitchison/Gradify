// TechGradify · ForgeLab Data Structures (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Abstract data types
LV: A level · Foundation
S: An abstract data type describes what a data structure does, not how it is built. This lesson explains the difference between an abstract data type and its implementation, and why that separation matters in software design.
O: Define an abstract data type and give examples
O: Distinguish an interface from an implementation
O: Explain the benefits of abstraction in data structures
H: What and how
P: An **abstract data type (ADT)** is defined by the **values** it can hold and the **operations** allowed on them, without saying how they are stored. A **stack** ADT, for example, offers push, pop, peek and is_empty. A **data structure** is a concrete way of implementing an ADT in memory: a stack could be built with an array or with a linked list. The ADT is the **interface**; the data structure is the **implementation**.
H: Common ADTs
- **List**: an ordered sequence with insert, delete and access by position.
- **Stack**: last in, first out (LIFO).
- **Queue**: first in, first out (FIFO).
- **Dictionary (map)**: key–value pairs with lookup by key.
- **Set**: unordered collection of distinct items with membership tests.
- **Graph** and **tree**: nodes connected by edges.
H: Why separate them?
- **Encapsulation**: code that uses a stack does not need to know how it is stored.
- **Replaceability**: the implementation can be changed, for example for speed, without changing the code that uses it.
- **Reasoning**: programmers can think about behaviour and cost separately.
- Python's built-in list, dict and set are implementations of these ADTs, each with documented performance.
X: One ADT, two implementations.
> A program needs a stack to undo actions in a text editor.
> Version 1 stores items in a Python list, using append and pop.
> Version 2 stores items in a linked list of nodes.
> The rest of the program only calls push and pop, so it works unchanged with either version.
K: An abstract data type specifies values and operations, such as a stack's push and pop, independently of any data structure that implements it; separating interface from implementation supports encapsulation, replaceability and clearer reasoning.
!: Treating "stack" as meaning a Python list. A stack is an abstract behaviour; a list is just one way to implement it.
EV: established | Separating interface from implementation is a central principle of software engineering.
T: Abstract data type | A type defined by its values and operations, not its implementation
T: Interface | The set of operations a type offers to its users
T: Implementation | The concrete code and storage that provide an interface
SUM: ADTs describe what, not how.
SUM: Data structures implement ADTs.
SUM: Separation aids change and reasoning.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 10 "Elementary Data Structures" | secondary | 2022
SRC: AQA, AS and A-level Computer Science (7516, 7517) specification, section 4.2 Fundamentals of data structures | standard | 2015 | https://www.aqa.org.uk/subjects/computer-science-and-it/as-and-a-level/computer-science-7516-7517
Q: What does an abstract data type specify? | The values it holds and the operations allowed on them.
Q: Give two ways to implement a stack. | With an array (or Python list) or with a linked list.
M1#computing-u05-01-q1@1: Which operation belongs to the stack ADT? | Push | Enqueue | Hash | Traverse | Applying the standard result: Push adds an item to the top.
M2#computing-u05-01-q2@2: What is the main benefit of separating an ADT from its implementation? | The implementation can change without affecting code that uses it | Programs always run faster on every computer | Memory use is always lower than before | No testing is ever needed after changes | Applying the standard result: Encapsulation allows replacement.
M3#computing-u05-01-q3@3: A team replaces an array-based queue with a linked-list queue. What should the rest of the program need? | No changes, if it uses only the queue's operations | A complete rewrite | A new programming language | A different operating system | Applying the standard result: Code depends on the interface.
MATCH1#computing-u05-01-q4@2: Match each ADT to its behaviour. | Stack = Last in, first out ; Queue = First in, first out ; Dictionary = Lookup by key ; Set = Distinct items with membership | Each ADT has defined behaviour.
SA2#computing-u05-01-q5@2,3: Explain the difference between an abstract data type and a data structure, using a queue as an example. | A queue ADT defines first-in, first-out behaviour with operations such as enqueue, dequeue and is_empty, without saying how items are stored. A data structure is a concrete implementation, such as a circular array or a linked list, that provides those operations with particular time and memory costs. Code using the queue relies only on the ADT, so the implementation can be changed. | ADT definition ; Queue operations ; Data structure implementations ; Replaceability

## Arrays and records
LV: A level · Foundation
S: Arrays and records are the basic building blocks for storing data. This lesson explains one- and two-dimensional arrays, records, indexing and how arrays are stored in contiguous memory.
O: Use one- and two-dimensional arrays
O: Explain how arrays give constant-time access by index
O: Define and use records with named fields
H: Arrays
P: An **array** is a fixed-size collection of elements of the same type, stored in **contiguous** memory and accessed by an **index**, usually starting at 0. Because the address of element *i* is the base address plus *i* × the element size, access by index takes **constant time**, O(1), whatever the array's size. Inserting or deleting in the middle is slower, O(n), because later elements must shift.
H: Two-dimensional arrays
- A **2D array** is an array of arrays, used for grids, tables and images.
- Element grid[r][c] is in row *r* and column *c*.
- In **row-major** order, used by C and many languages, rows are stored one after another in memory.
- In Python, 2D structures are usually lists of lists; libraries such as NumPy provide true contiguous arrays.
H: Records
- A **record** groups related fields of possibly different types under one name, such as a student's name, age and grade.
- Fields are accessed by name: student.name.
- In Python, records can be written as classes, dataclasses or named tuples.
- An **array of records** stores many such items, for example a class list.
X: A seating plan.
> A classroom has 4 rows of 5 seats, stored as seats = [[None]*5 for _ in range(4)].
> seats[2][3] = "Ana" places Ana in row 2, column 3 (both counted from 0).
> Reading seats[2][3] takes the same time as reading seats[0][0]: constant time.
> Each pupil could instead be a record with fields name, row and seat.
K: Arrays store elements of one type contiguously, giving O(1) access by index but O(n) insertion in the middle; 2D arrays model grids, and records group named fields of different types, often stored in arrays.
!: Creating a 2D list with [[None]*5]*4. This makes four references to the same row, so changing one row changes them all.
EV: established | Contiguous storage gives arrays constant-time indexed access.
T: Array | A fixed-size, indexed collection of same-type elements
T: Record | A grouping of named fields that may have different types
T: Contiguous memory | Memory locations that follow one after another
SUM: Arrays: O(1) access by index.
SUM: 2D arrays model grids.
SUM: Records group named fields.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 10 "Elementary Data Structures" | secondary | 2022
SRC: Python Software Foundation, dataclasses: Data Classes (Python 3 documentation) | guidance | 2024 | https://docs.python.org/3/library/dataclasses.html
Q: Why is access by index O(1) in an array? | The element's address can be calculated directly from the base address and index.
Q: What is a record? | A data structure grouping named fields that can have different types.
M1#computing-u05-02-q1@1: What is the index of the first element in most programming languages? | 0 | 1 | -1 | It varies randomly | Applying the standard result: Most languages index from 0.
M2#computing-u05-02-q2@2: What is the time complexity of inserting an element at the start of an array of n items? | O(n) | O(1) | O(log n) | O(n²) | Applying the standard result: All other elements must shift.
NUM2#computing-u05-02-q3@2: A 2D array has 6 rows and 8 columns. How many elements does it hold? | 48 | 0 | elements | 6 rows × 8 columns = 48 elements.
M3#computing-u05-02-q4@3: Which Python code creates a safe 3 × 3 grid of zeros? | [[0]*3 for _ in range(3)] | [[0]*3]*3 | [0]*9*3 | [[0, 0, 0]]*3 | Applying the standard result: A comprehension creates separate rows.
SA2#computing-u05-02-q5@2,3: Explain why arrays provide fast access but slow insertion in the middle. | Arrays store elements contiguously, so the address of any element is the base address plus its index times the element size, giving constant-time access. But inserting or deleting in the middle requires shifting all later elements one place to keep them contiguous, which takes time proportional to the number of elements, O(n). | Contiguous storage ; Address calculation ; Shifting elements ; Time complexity

## Stacks
LV: A level · Application
S: A stack is a last-in, first-out structure used for undo, function calls and expression evaluation. This lesson covers stack operations, array-based implementation, overflow and underflow, and applications.
O: Describe and implement the stack operations
O: Handle stack overflow and underflow
O: Apply stacks to problems such as bracket matching and the call stack
H: Operations
P: A **stack** follows **last in, first out (LIFO)**: the last item added is the first removed, like a pile of plates. Its operations are **push** (add to the top), **pop** (remove and return the top), **peek** or **top** (look at the top without removing it), **is_empty** and, for a fixed-size stack, **is_full**. All of these run in constant time, O(1).
H: Implementation
- With an array of fixed size and a **top pointer** that holds the index of the top item, starting at -1 when empty.
- Push: if not full, increment top and store the item.
- Pop: if not empty, return the item at top and decrement top.
- **Overflow** occurs when pushing to a full stack; **underflow** when popping from an empty one.
- In Python, a list's append and pop provide a dynamic stack.
H: Applications
- The **call stack** stores return addresses and local variables for each function call; very deep recursion can cause a stack overflow.
- **Undo** in editors.
- **Bracket matching**: push opening brackets, pop on closing ones and check they match.
- Evaluating **Reverse Polish notation** and converting expressions.
- **Backtracking**, such as depth-first search.
X: Checking brackets in "( [ ] { } )".
> Read "(": push. Stack: (.
> Read "[": push. Stack: ( [. Read "]": pop "[", which matches.
> Read "{": push. Stack: ( {. Read "}": pop "{", which matches.
> Read ")": pop "(", which matches. The stack is empty at the end, so the brackets are balanced.
K: Stacks are LIFO structures with O(1) push, pop and peek, implemented with an array and top pointer or a dynamic list; overflow and underflow must be handled, and stacks power the call stack, undo, bracket matching and backtracking.
!: Popping from an empty stack without checking. Always test is_empty first or handle underflow.
EV: established | The call stack is fundamental to how programming languages implement function calls and recursion.
T: LIFO | Last in, first out
T: Top pointer | An index or reference to the top element of a stack
T: Stack overflow | An error when pushing to a full stack or exceeding call stack space
SUM: LIFO with push, pop and peek.
SUM: Watch for overflow and underflow.
SUM: Used for calls, undo and brackets.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 10 "Elementary Data Structures" | secondary | 2022
SRC: OCR, A Level Computer Science H446 specification, 1.4.2 Data structures | standard | 2015 | https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
Q: What does LIFO stand for? | Last in, first out.
Q: What is stack underflow? | Trying to pop from an empty stack.
M1#computing-u05-03-q1@1: Which item is removed by pop? | The most recently pushed item | The first item pushed | The middle item | A random item | Applying the standard result: Stacks are LIFO.
M2#computing-u05-03-q2@2: In an array-based stack, the top pointer is 4 in an array of size 5. What happens on push? | Overflow, as the stack is full | The item goes in index 5 safely | The bottom item is removed | The top pointer resets to 0 | Applying the standard result: Indices 0 to 4 are used.
NUM2#computing-u05-03-q3@2: Starting with an empty stack, you push 3, push 7, pop, push 2 and push 9. What value is on top? | 9 | 0 | value | After the pop removes 7, pushing 2 then 9 leaves 9 on top.
M3#computing-u05-03-q4@3: Why can deep recursion cause a crash? | Each call adds a frame to the call stack, which can overflow | Recursion deletes data stored on the heap | Recursive functions use no memory at all | The CPU runs out of registers to hold values | Applying the standard result: Call stack space is limited.
SA2#computing-u05-03-q5@2,3: Explain how a stack can be used to check whether brackets in an expression are balanced. | Scan the expression from left to right. Push every opening bracket onto the stack. For each closing bracket, if the stack is empty or the popped bracket is not the matching type, the expression is unbalanced. At the end, the brackets are balanced only if the stack is empty, because every opening bracket has been matched. | Push openings ; Pop on closings ; Check matching ; Empty at end

## Queues
LV: A level · Application
S: A queue is a first-in, first-out structure used for scheduling, buffering and breadth-first search. This lesson covers queue operations, a linear array implementation and its drawback, and Python's deque.
O: Describe and implement the queue operations
O: Explain the drawback of a linear array queue
O: Apply queues to scheduling and buffering problems
H: Operations
P: A **queue** follows **first in, first out (FIFO)**: items join at the **rear** and leave from the **front**, like a queue at a shop. Its operations are **enqueue** (add at the rear), **dequeue** (remove from the front), **peek** or **front**, **is_empty** and **is_full**. With a suitable implementation, all run in O(1).
H: A linear array queue
- Use an array with **front** and **rear** pointers.
- Enqueue: increment rear and store the item.
- Dequeue: return the item at front and increment front.
- Drawback: as items are removed, the front moves along and the space behind it is wasted; the queue can appear full even when most of the array is empty.
- Shifting all items forward after each dequeue fixes this but costs O(n).
- The **circular queue**, in the next lesson, solves the problem efficiently.
H: In practice and applications
- In Python, collections.deque gives O(1) appends and pops at both ends; using list.pop(0) is O(n).
- **Print queues** and **task schedulers** in operating systems.
- **Buffers** for keyboard input, streaming and network packets.
- **Breadth-first search** in graphs.
X: A print queue.
> Three documents are sent to a printer: A, then B, then C.
> Enqueue A, enqueue B, enqueue C: front is A, rear is C.
> The printer dequeues A and prints it, then B.
> A new document D is enqueued at the rear: the queue is now C, D.
K: Queues are FIFO structures with enqueue at the rear and dequeue from the front; a linear array queue wastes space as the front advances, so circular queues or deques are used, and queues underpin scheduling, buffering and breadth-first search.
!: Using list.pop(0) for a large queue in Python. It shifts every element; use collections.deque instead.
EV: established | Queues are used throughout operating systems for scheduling and buffering.
T: FIFO | First in, first out
T: Enqueue | Adding an item to the rear of a queue
T: Dequeue | Removing an item from the front of a queue
SUM: FIFO: enqueue at rear, dequeue at front.
SUM: Linear arrays waste space.
SUM: Use deque or circular queues.
SRC: Python Software Foundation, collections: Container datatypes, deque objects (Python 3 documentation) | guidance | 2024 | https://docs.python.org/3/library/collections.html
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 10 "Elementary Data Structures" | secondary | 2022
Q: What does FIFO stand for? | First in, first out.
Q: Why is collections.deque better than a list for a queue in Python? | It removes items from the front in O(1), whereas list.pop(0) is O(n).
M1#computing-u05-04-q1@1: Where are items added to a queue? | The rear | The front | The middle | Anywhere at random | Applying the standard result: Enqueue adds at the rear.
M2#computing-u05-04-q2@2: What is the main drawback of a simple linear array queue? | Space before the front pointer is wasted | Items are removed in LIFO order | Enqueue is O(n²) | It cannot store integers | Applying the standard result: The front moves along the array.
NUM2#computing-u05-04-q3@2: Starting with an empty queue, you enqueue 4, enqueue 8, enqueue 1, then dequeue twice. What value is at the front? | 1 | 0 | value | Dequeuing removes 4 then 8, leaving 1 at the front.
M3#computing-u05-04-q4@3: Which data structure suits a web server handling requests in the order they arrive? | A queue | A stack | A binary search tree | A hash table | Applying the standard result: FIFO matches arrival order.
SA2#computing-u05-04-q5@2,3: Compare stacks and queues, giving an application of each. | A stack is last in, first out: items are added and removed at the same end, which suits undo features and the call stack, where the most recent action must be handled first. A queue is first in, first out: items join at the rear and leave from the front, which suits print queues and task scheduling, where items must be handled in arrival order. | Stack behaviour ; Stack application ; Queue behaviour ; Queue application

## Circular and priority queues
LV: A level · Application
S: Circular queues reuse array space efficiently, and priority queues serve the most important item first. This lesson explains both, including modular arithmetic for circular pointers and heaps for priority queues.
O: Implement a circular queue using modular arithmetic
O: Explain how a priority queue orders items
O: Describe heap-based priority queues and their efficiency
H: Circular queues
P: A **circular queue** treats the array as if its end wrapped round to its start. When the rear pointer reaches the last index, the next item goes into index 0 if it is free. Pointers advance using **modular arithmetic**: rear = (rear + 1) % size. A **count** of items, or one deliberately empty slot, distinguishes a full queue from an empty one. Enqueue and dequeue remain O(1) and no space is wasted. Circular buffers are used in audio streaming and keyboard buffers.
H: Priority queues
- In a **priority queue**, each item has a priority, and the highest-priority item is removed first, regardless of arrival order.
- Items of equal priority are often served in FIFO order.
- Uses: hospital triage, operating system scheduling and shortest-path algorithms such as Dijkstra's.
- A simple sorted list gives O(1) removal but O(n) insertion.
H: Heaps
- A **binary heap** is a complete binary tree in which each parent is smaller (min-heap) or larger (max-heap) than its children.
- Insertion and removal of the top item take **O(log n)**.
- Heaps are stored compactly in arrays: the children of index *i* are at 2*i* + 1 and 2*i* + 2.
- Python's heapq module implements a min-heap on a list.
X: A circular queue of size 5.
> The queue holds items at indices 2, 3 and 4; front = 2, rear = 4.
> Enqueue X: rear = (4 + 1) % 5 = 0, so X goes into index 0.
> Dequeue: the item at index 2 is removed; front = (2 + 1) % 5 = 3.
> The freed space at the start of the array has been reused.
K: Circular queues wrap pointers with modular arithmetic so array space is reused with O(1) operations, while priority queues serve the highest-priority item first, efficiently implemented as binary heaps with O(log n) insertion and removal.
!: Testing for a full circular queue with front == rear alone. That condition can also mean empty; keep a count or leave one slot free.
EV: established | Binary heaps support priority queue operations in logarithmic time.
T: Circular queue | A queue in which the array wraps round from end to start
T: Priority queue | A queue that removes the highest-priority item first
T: Binary heap | A complete binary tree satisfying the heap ordering property
SUM: Circular queues reuse space with %.
SUM: Priority queues serve by priority.
SUM: Heaps give O(log n) operations.
SRC: Python Software Foundation, heapq: Heap queue algorithm (Python 3 documentation) | guidance | 2024 | https://docs.python.org/3/library/heapq.html
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 6 "Heapsort" | secondary | 2022
Q: How is the rear pointer advanced in a circular queue? | rear = (rear + 1) % size.
Q: What is the time complexity of removing the top item from a binary heap? | O(log n).
M1#computing-u05-05-q1@1: In a priority queue, which item is removed first? | The highest-priority item | The first item added | The last item added | The smallest index | Applying the standard result: Priority decides order.
M2#computing-u05-05-q2@2: Why does a circular queue avoid wasted space? | Pointers wrap round to reuse freed slots | It shifts all items after every dequeue | It doubles in size when full | It stores items in a stack | Applying the standard result: Modular arithmetic reuses space.
NUM2#computing-u05-05-q3@2: A circular queue has size 8 and rear = 7. After one enqueue, what is the new rear index? | 0 | 0 | index | rear = (7 + 1) % 8 = 0, so it wraps to index 0.
M3#computing-u05-05-q4@3: Which structure best suits an emergency department that sees the most urgent patients first? | A priority queue | A simple FIFO queue | A stack | A linked list sorted by name | Applying the standard result: Urgency is a priority.
SA2#computing-u05-05-q5@2,3: Explain how a binary heap implements a priority queue efficiently. | A min-heap is a complete binary tree in which every parent is no larger than its children, so the smallest, highest-priority item is always at the root. Inserting adds the item at the end and sifts it up; removing takes the root, moves the last item to the top and sifts it down. Because the tree height is about log n, both operations take O(log n), and the heap is stored compactly in an array. | Heap property ; Root holds top priority ; Sift up and down ; Logarithmic time

## Linked lists
LV: A level · Application
S: A linked list stores items in nodes connected by pointers rather than in contiguous memory. This lesson explains singly and doubly linked lists, insertion and deletion, and how they compare with arrays.
O: Describe the structure of singly and doubly linked lists
O: Trace insertion and deletion in a linked list
O: Compare the costs of linked lists and arrays
H: Nodes and pointers
P: A **linked list** is a chain of **nodes**. Each node holds a **data** item and a **pointer** (reference) to the next node. A **head** pointer marks the first node, and the last node's pointer is **null**. Because nodes can be anywhere in memory, the list can grow and shrink easily. In a **doubly linked list**, each node also points to the previous node, allowing traversal in both directions.
H: Operations
- **Traversal**: start at the head and follow pointers until null: O(n).
- **Search**: also O(n), because there is no direct access by index.
- **Insert at the head**: create a node, point it at the old head, and update the head: O(1).
- **Insert after a known node**: point the new node at the next node, then point the known node at the new one: O(1).
- **Delete**: change the previous node's pointer to skip the deleted node; finding the previous node may take O(n).
- In arrays without dynamic support, a **free list** can track unused nodes.
H: Linked lists versus arrays
- Arrays give O(1) access by index; linked lists need O(n).
- Linked lists insert and delete in O(1) once the position is found; arrays need O(n) shifting.
- Linked lists use extra memory for pointers and have poorer cache performance.
X: Inserting into a sorted list.
> A sorted list holds 10 → 25 → 40 → null; insert 30.
> Traverse from the head: 10, then 25. The next value, 40, is larger, so 30 goes after 25.
> Set the new node's pointer to the node holding 40.
> Set the 25 node's pointer to the new node: 10 → 25 → 30 → 40 → null.
K: Linked lists chain nodes with pointers from a head to null, allowing O(1) insertion and deletion at a known position but O(n) search and access; doubly linked lists add backward pointers, at the cost of extra memory.
!: Updating pointers in the wrong order when inserting. Point the new node at the next node first, or the rest of the list is lost.
EV: established | Linked lists trade constant-time insertion for linear-time access compared with arrays.
T: Node | An element holding data and a pointer to another node
T: Head pointer | A reference to the first node of a linked list
T: Null pointer | A pointer that does not refer to any node, marking the end
SUM: Nodes connected by pointers.
SUM: O(1) insert at known position, O(n) search.
SUM: Doubly linked lists go both ways.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 10 "Elementary Data Structures" | secondary | 2022
SRC: AQA, AS and A-level Computer Science (7516, 7517) specification, section 4.2 Fundamentals of data structures | standard | 2015 | https://www.aqa.org.uk/subjects/computer-science-and-it/as-and-a-level/computer-science-7516-7517
Q: What does the last node in a singly linked list point to? | Null.
Q: What extra pointer does a doubly linked list node have? | A pointer to the previous node.
M1#computing-u05-06-q1@1: What does each node in a singly linked list contain? | Data and a pointer to the next node | Data only | An index and a hash | Two copies of the data | Applying the standard result: Nodes link data with pointers.
M2#computing-u05-06-q2@2: What is the time complexity of accessing the 50th item in a linked list? | O(n) | O(1) | O(log n) | O(n²) | Applying the standard result: You must follow pointers from the head.
M3#computing-u05-06-q3@3: When inserting a new node after node A, what must be done first? | Point the new node at A's next node | Point A at the new node | Delete A | Move the head pointer | Applying the standard result: Otherwise the rest of the list is lost.
TF1#computing-u05-06-q4@2: Inserting at the head of a linked list takes O(1) time. | true | Only the new node's pointer and the head pointer change.
SA2#computing-u05-06-q5@2,3: Compare linked lists and arrays for a program that frequently inserts items in the middle of a sequence. | An array must shift every later element to insert in the middle, costing O(n) each time, though it offers O(1) access by index. A linked list inserts in O(1) once the position is found by changing two pointers, though finding the position takes O(n) and each node needs extra memory for pointers. If insertions are frequent at known positions, a linked list may be more efficient. | Array shifting ; Array access ; Linked list pointer changes ; Trade-offs

## Trees
LV: A level · Foundation
S: A tree is a hierarchical structure of nodes with parent–child relationships. This lesson defines trees and their terminology, binary trees, and applications such as file systems and parse trees.
O: Use tree terminology correctly
O: Define a binary tree and describe how it is stored
O: Identify applications of trees
H: What is a tree?
P: A **tree** is a connected graph with no cycles, usually drawn with a **root** at the top. Each node except the root has exactly one **parent**; nodes may have **children**. Nodes with no children are **leaves**. An **edge** connects a parent and child. A **subtree** is a node with all its descendants. The **height** of a tree is the number of edges on the longest path from the root to a leaf.
H: Binary trees
- In a **binary tree**, each node has at most two children, called **left** and **right**.
- A node can be stored as a record with data, a left pointer and a right pointer.
- Binary trees can also be stored in arrays using three parallel arrays (left, data, right) or by index arithmetic.
- A **complete** binary tree fills every level except possibly the last, from left to right, as in a heap.
- A binary tree of height h has at most 2^(h+1) − 1 nodes.
H: Applications
- **File systems**: folders contain files and subfolders.
- **Parse trees** and **expression trees** in compilers.
- **Binary search trees** for fast searching and sorting.
- **Decision trees** in machine learning.
- **The DOM** in web pages.
X: An expression tree.
> The expression (3 + 4) × 5 can be stored as a tree.
> The root is ×, with a left subtree for (3 + 4) and a right child 5.
> The left subtree has + as its root and 3 and 4 as leaves.
> Evaluating from the leaves upwards gives 7, then 7 × 5 = 35.
K: Trees are connected, acyclic hierarchies with a root, parents, children and leaves; binary trees limit each node to two children and are stored with pointers or arrays, and trees model file systems, expressions, searching and decisions.
!: Confusing a tree's height with its number of nodes. Height counts edges on the longest root-to-leaf path.
EV: established | Trees are among the most widely used data structures in computing.
T: Root | The top node of a tree, with no parent
T: Leaf | A node with no children
T: Binary tree | A tree in which each node has at most two children
SUM: Root, parents, children, leaves.
SUM: Binary trees: at most two children.
SUM: Used for files, expressions and search.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, appendix B.5 "Trees" | secondary | 2022
SRC: OCR, A Level Computer Science H446 specification, 1.4.2 Data structures | standard | 2015 | https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
Q: What is a leaf node? | A node with no children.
Q: What is the height of a tree? | The number of edges on the longest path from the root to a leaf.
M1#computing-u05-07-q1@1: Which node in a tree has no parent? | The root | A leaf | A child | A subtree | Applying the standard result: The root is at the top.
M2#computing-u05-07-q2@2: How many children can a node in a binary tree have at most? | Two | One | Three | Unlimited | Applying the standard result: Binary means at most two.
NUM2#computing-u05-07-q3@2: What is the maximum number of nodes in a binary tree of height 2? | 7 | 0 | nodes | 2^(2+1) − 1 = 8 − 1 = 7 nodes.
M3#computing-u05-07-q4@3: Which real-world structure is best modelled as a tree? | Folders and subfolders on a disk | A queue of customers | A list of numbers to sum | A circular buffer | Applying the standard result: File systems are hierarchical.
SA2#computing-u05-07-q5@2,3: Explain how an expression tree represents and evaluates an arithmetic expression. | Operators are stored in internal nodes and operands in leaves, with each operator's subtrees representing its operands, so the tree structure captures the order of operations without brackets. Evaluating the tree recursively, computing the value of each subtree before applying the operator at its root, gives the result of the whole expression. | Operators and operands ; Structure encodes order ; Recursive evaluation ; Result at root

## Binary search trees
LV: A level · Application
S: A binary search tree keeps its items ordered so that searching can skip half of the remaining tree at each step. This lesson covers the BST property, insertion, searching, deletion and the effect of balance.
O: State the binary search tree property
O: Insert into and search a binary search tree
O: Explain how balance affects efficiency
H: The BST property
P: In a **binary search tree (BST)**, for every node, all values in its **left** subtree are **smaller** and all values in its **right** subtree are **larger**. This lets searching compare the target with the current node and move left or right, discarding one subtree each time. In a well-balanced tree, search, insertion and deletion take **O(log n)** time.
H: Insertion and search
- **Search**: start at the root. If the target equals the node, stop; if smaller, go left; if larger, go right; if you reach null, it is not present.
- **Insert**: search for the value; where the search reaches null, attach the new node.
- **Deletion** has three cases: a leaf is simply removed; a node with one child is replaced by that child; a node with two children is replaced by its **in-order successor** (smallest value in its right subtree).
H: Balance
- If items are inserted in sorted order, the BST becomes a long chain, like a linked list, and operations degrade to **O(n)**.
- **Self-balancing** trees, such as AVL trees and red–black trees, rotate nodes to keep the height around log n.
- Many language libraries use balanced trees for ordered maps and sets.
X: Building a BST.
> Insert 50, 30, 70, 20, 40, 60, 80 in that order.
> 50 becomes the root; 30 goes left of 50; 70 goes right.
> 20 goes left of 30, 40 right of 30, 60 left of 70, 80 right of 70.
> Searching for 60: 60 > 50, go right to 70; 60 < 70, go left to 60. Found in 3 comparisons.
K: A BST keeps smaller values to the left and larger to the right, so search, insertion and deletion follow a single path, taking O(log n) when balanced but O(n) when the tree degenerates into a chain; self-balancing trees prevent this.
!: Assuming a BST always gives O(log n) search. Inserting sorted data creates an unbalanced chain with O(n) search.
EV: established | Balanced binary search trees guarantee logarithmic-time operations.
T: Binary search tree | A binary tree with smaller values on the left and larger on the right
T: In-order successor | The smallest value in a node's right subtree
T: Self-balancing tree | A BST that restructures itself to keep its height small
SUM: Left smaller, right larger.
SUM: O(log n) when balanced.
SUM: Sorted insertion causes O(n) chains.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 12 "Binary Search Trees" | secondary | 2022
SRC: Sedgewick R. and Wayne K., Algorithms, 4th edition, Addison-Wesley | secondary | 2011
Q: What is the BST property? | Every value in a node's left subtree is smaller and every value in its right subtree is larger.
Q: What happens if sorted values are inserted into a BST? | It becomes an unbalanced chain and operations degrade to O(n).
M1#computing-u05-08-q1@1: In a BST, where is a value smaller than the root found? | In the left subtree | In the right subtree | At the root | In any leaf | Applying the standard result: Smaller values go left.
M2#computing-u05-08-q2@2: When deleting a node with two children, what usually replaces it? | Its in-order successor | Its parent | The root | A random leaf | Applying the standard result: The successor keeps the order.
NUM2#computing-u05-08-q3@2: Values 50, 30, 70 and 20 are inserted into an empty BST in that order. How many comparisons are needed to find 20? | 3 | 0 | comparisons | Compare with 50 (go left), 30 (go left), then 20: 3 comparisons.
M3#computing-u05-08-q4@3: Why are self-balancing trees used in libraries? | They keep the height near log n so operations stay fast | They store data without pointers | They prevent duplicate values | They make insertion O(1) | Applying the standard result: Balance guarantees efficiency.
SA2#computing-u05-08-q5@2,3: Explain why the order of insertion affects the performance of a binary search tree. | Each new value follows the comparisons down to a null position, so the shape depends on the order of insertion. Random orders tend to produce bushy trees with height near log n, giving O(log n) operations. Inserting values in sorted order makes every new node a right child of the last, creating a chain of height n, so search, insertion and deletion degrade to O(n), which self-balancing trees avoid. | Shape from order ; Balanced case ; Sorted-order chain ; Self-balancing solution

## Tree traversal
LV: A level · Application
S: Traversing a tree means visiting every node in a systematic order. This lesson covers pre-order, in-order and post-order depth-first traversals, breadth-first traversal, and their uses.
O: Perform pre-order, in-order and post-order traversals
O: Perform a breadth-first traversal using a queue
O: Match each traversal to its typical use
H: Depth-first traversals
P: Three recursive traversals visit the left and right subtrees in turn, differing only in when the current node is visited. **Pre-order**: node, then left, then right. **In-order**: left, then node, then right. **Post-order**: left, then right, then node. A simple way to remember: the name says where the node comes relative to its subtrees. Each visits all n nodes, so each takes O(n).
H: Breadth-first traversal
- **Breadth-first** (level-order) traversal visits nodes level by level, from left to right.
- It uses a **queue**: enqueue the root, then repeatedly dequeue a node, visit it and enqueue its children.
- It is useful for finding the shallowest node satisfying a condition.
H: Uses
- **In-order** on a BST outputs values in sorted order.
- **Pre-order** copies a tree or outputs prefix (Polish) notation from an expression tree.
- **Post-order** deletes a tree safely (children before parent) and outputs Reverse Polish notation from an expression tree.
- **Breadth-first** prints a tree by levels and finds shortest paths in unweighted trees.
X: Traversing a BST.
> The BST has root 50; 30 and 70 are its children; 20 and 40 are children of 30; 60 and 80 are children of 70.
> Pre-order: 50, 30, 20, 40, 70, 60, 80.
> In-order: 20, 30, 40, 50, 60, 70, 80 (sorted).
> Post-order: 20, 40, 30, 60, 80, 70, 50. Breadth-first: 50, 30, 70, 20, 40, 60, 80.
K: Pre-order visits the node before its subtrees, in-order between them and post-order after them, while breadth-first visits level by level using a queue; in-order yields sorted output from a BST, pre-order copies trees and post-order deletes them or produces Reverse Polish notation.
!: Mixing up pre-order and post-order. In pre-order the root comes first; in post-order it comes last.
EV: established | In-order traversal of a binary search tree produces its keys in sorted order.
T: Pre-order traversal | Visiting a node before its left and right subtrees
T: In-order traversal | Visiting a node between its left and right subtrees
T: Breadth-first traversal | Visiting nodes level by level using a queue
SUM: Pre, in and post differ by node position.
SUM: Breadth-first uses a queue.
SUM: In-order sorts a BST.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 12 "Binary Search Trees" | secondary | 2022
SRC: Knuth D. E., The Art of Computer Programming, Volume 1: Fundamental Algorithms, 3rd edition, Addison-Wesley | secondary | 1997
Q: Which traversal outputs a BST's values in sorted order? | In-order.
Q: Which data structure does breadth-first traversal use? | A queue.
M1#computing-u05-09-q1@1: In pre-order traversal, when is the current node visited? | Before its subtrees | Between its subtrees | After its subtrees | Never | Applying the standard result: Pre means before.
M2#computing-u05-09-q2@2: Which traversal of an expression tree gives Reverse Polish notation? | Post-order | Pre-order | In-order | Breadth-first | Applying the standard result: Operators come after operands.
M3#computing-u05-09-q3@3: Why is post-order used to delete a tree? | Children are deleted before their parent | It visits nodes in sorted order | It uses less memory than other traversals | It visits the root first | Parents must not be freed before children.
SEQ1#computing-u05-09-q4@2: Order the steps of a breadth-first traversal. | Enqueue the root ; Dequeue a node and visit it ; Enqueue its children ; Repeat until the queue is empty | The queue gives level order.
SA2#computing-u05-09-q5@2,3: Explain the difference between depth-first and breadth-first traversal of a tree. | Depth-first traversals, pre-order, in-order and post-order, follow one branch down to a leaf before backtracking, usually implemented recursively or with a stack, and differ in when each node is visited relative to its subtrees. Breadth-first traversal visits all nodes at one level before moving to the next, using a queue, so it suits finding the shallowest matching node. | Depth-first approach ; Three orders ; Breadth-first approach ; Data structures used

## Graphs
LV: A level · Foundation
S: A graph is a set of nodes connected by edges, used to model networks of every kind. This lesson defines graphs, directed and weighted graphs, and their applications.
O: Define a graph and its components
O: Distinguish directed and undirected, weighted and unweighted graphs
O: Identify real-world applications of graphs
H: What is a graph?
P: A **graph** consists of **vertices** (nodes) and **edges** (arcs) connecting pairs of vertices. Unlike a tree, a graph can contain **cycles** and need not have a root. Two vertices joined by an edge are **adjacent** (neighbours), and the **degree** of a vertex is the number of edges connected to it. A graph is **connected** if there is a path between every pair of vertices.
H: Types of graph
- **Undirected**: edges work in both directions, such as a friendship network.
- **Directed** (digraph): edges have a direction, such as one-way streets or web links.
- **Weighted**: edges carry values, such as distances, costs or times.
- **Unweighted**: all edges are treated equally.
- A **tree** is a connected, undirected graph with no cycles.
H: Applications
- **Maps and route finding**: junctions as vertices, roads as weighted edges.
- **Social networks**: people as vertices, relationships as edges.
- **The internet and the web**: routers or pages as vertices.
- **Dependencies**: tasks that must happen before others, as in build systems.
- Algorithms such as **Dijkstra's**, **A***, **breadth-first** and **depth-first search** operate on graphs.
X: Modelling a rail network.
> Stations are vertices: A, B, C and D.
> Tracks are edges, weighted by journey time in minutes: A–B 10, B–C 15, A–C 30, C–D 5.
> The network is undirected, because trains run both ways.
> The fastest route from A to D is A–B–C–D, taking 10 + 15 + 5 = 30 minutes, rather than A–C–D at 35.
K: Graphs are vertices joined by edges, which may be directed or undirected and weighted or unweighted; they can contain cycles, include trees as a special case, and model maps, networks, the web and dependencies.
!: Assuming every graph is a tree. Graphs can contain cycles and have no root.
EV: established | Graph models underpin routing, networking and many optimisation problems.
T: Vertex | A node in a graph
T: Edge | A connection between two vertices
T: Weighted graph | A graph whose edges carry values such as distance
SUM: Vertices and edges.
SUM: Directed or undirected; weighted or not.
SUM: Models networks and routes.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 20 "Elementary Graph Algorithms" | secondary | 2022
SRC: AQA, AS and A-level Computer Science (7516, 7517) specification, section 4.2 Fundamentals of data structures | standard | 2015 | https://www.aqa.org.uk/subjects/computer-science-and-it/as-and-a-level/computer-science-7516-7517
Q: What is the degree of a vertex? | The number of edges connected to it.
Q: What is a directed graph? | A graph whose edges have a direction.
M1#computing-u05-10-q1@1: Which graph type suits one-way streets? | Directed | Undirected | Unweighted tree | Complete undirected | Applying the standard result: Edges have direction.
M2#computing-u05-10-q2@2: What distinguishes a tree from a general graph? | A tree is connected and has no cycles | A tree has weighted edges | A tree must be directed | A tree has more edges than vertices | Applying the standard result: Trees are acyclic connected graphs.
NUM2#computing-u05-10-q3@2: In an undirected graph, vertex X is joined to vertices A, B, C and D. What is the degree of X? | 4 | 0 | edges | X has 4 edges, so its degree is 4.
M3#computing-u05-10-q4@3: A route-planning app needs to find the quickest journey. What should its graph's edges store? | Travel times as weights | Nothing, as all edges are equal | Only the station names | The number of passengers | Applying the standard result: Weights represent cost.
SA2#computing-u05-10-q5@2,3: Explain how a graph can model a social network and what questions it can help answer. | Each person is a vertex and each friendship an undirected edge, or each follow a directed edge. The graph shows who is connected to whom, so algorithms can find people's degrees (number of friends), the shortest chain of connections between two people, clusters of closely connected friends, and suggest new contacts who share many neighbours. | Vertices as people ; Edges as relationships ; Degree and paths ; Clusters and suggestions

## Adjacency matrices and adjacency lists
LV: A level · Application
S: Graphs can be stored as adjacency matrices or adjacency lists. This lesson shows how each works, how they handle directed and weighted graphs, and when to choose each.
O: Represent a graph as an adjacency matrix and as an adjacency list
O: Compare their memory use and the speed of common operations
O: Choose a representation for dense or sparse graphs
H: Adjacency matrix
P: An **adjacency matrix** for a graph with n vertices is an n × n grid. The entry in row i, column j is 1 if there is an edge from vertex i to vertex j, and 0 otherwise; for a **weighted** graph it holds the weight, with a special value such as infinity for no edge. An **undirected** graph's matrix is **symmetric**. Checking whether two vertices are connected takes **O(1)**, but the matrix always uses **O(n²)** memory.
H: Adjacency list
- An **adjacency list** stores, for each vertex, a list of its neighbours (and weights, if any).
- In Python, a dictionary of lists works well: graph["A"] = ["B", "C"].
- It uses **O(n + e)** memory, where e is the number of edges.
- Listing a vertex's neighbours is fast, proportional to its degree.
- Checking a specific edge requires searching the list: up to O(degree).
H: Choosing
- **Dense** graphs, with many edges relative to vertices, suit matrices.
- **Sparse** graphs, such as road networks or social networks, suit lists, saving a great deal of memory.
- Algorithms that repeatedly visit neighbours, such as breadth-first search, are usually faster with lists.
X: Representing a small graph.
> An undirected graph has vertices A, B, C and D, with edges A–B, A–C and C–D.
> Adjacency list: A: [B, C]; B: [A]; C: [A, D]; D: [C].
> Adjacency matrix (order A, B, C, D): row A is 0 1 1 0; row B is 1 0 0 0; row C is 1 0 0 1; row D is 0 0 1 0.
> The matrix has 16 entries, only 6 of them 1s; the list stores just 6 neighbour entries.
K: Adjacency matrices store a graph in an n × n grid, giving O(1) edge checks but O(n²) memory, while adjacency lists store each vertex's neighbours, using O(n + e) memory and suiting sparse graphs and neighbour-based algorithms.
!: Using an adjacency matrix for a huge sparse graph such as a road network. Most entries would be zero, wasting memory.
EV: established | Adjacency lists are the standard representation for sparse graphs.
T: Adjacency matrix | An n × n grid showing which vertices are connected
T: Adjacency list | A list of neighbours for each vertex
T: Sparse graph | A graph with relatively few edges compared with the maximum possible
SUM: Matrix: O(1) edge check, O(n²) memory.
SUM: List: O(n + e) memory.
SUM: Lists suit sparse graphs.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 20 "Elementary Graph Algorithms" | secondary | 2022
SRC: Sedgewick R. and Wayne K., Algorithms, 4th edition, Addison-Wesley | secondary | 2011
Q: Why is an undirected graph's adjacency matrix symmetric? | Each edge connects both vertices, so entry (i, j) equals entry (j, i).
Q: How much memory does an adjacency list use? | O(n + e), proportional to vertices plus edges.
M1#computing-u05-11-q1@1: What does a 1 in row i, column j of an adjacency matrix mean? | There is an edge from vertex i to vertex j | Vertex i has degree 1 | Vertex j is the root | The graph has one edge | Applying the standard result: Entries mark edges.
M2#computing-u05-11-q2@2: Which representation suits a sparse social network with millions of users? | Adjacency list | Adjacency matrix | A single array of names | A stack | Applying the standard result: Lists save memory for sparse graphs.
NUM2#computing-u05-11-q3@2: A graph has 100 vertices. How many entries does its adjacency matrix contain? | 10000 | 0 | entries | An n × n matrix has 100 × 100 = 10000 entries.
M3#computing-u05-11-q4@3: Which operation is faster with an adjacency matrix than with a list? | Checking whether two given vertices are connected | Listing all neighbours of a vertex | Storing a sparse graph | Adding a new vertex cheaply | Applying the standard result: Matrix lookup is O(1).
SA2#computing-u05-11-q5@2,3: Compare adjacency matrices and adjacency lists for storing a road network. | A road network is sparse: each junction connects to only a few roads. An adjacency matrix would need n² entries, mostly zero, wasting memory, though it would check whether two junctions are directly connected in constant time. An adjacency list stores only the existing roads, using O(n + e) memory, and lets route-finding algorithms visit each junction's neighbours efficiently, so it is the better choice. | Sparse network ; Matrix memory ; Matrix edge check ; List efficiency

## Hash tables
LV: A level · Application
S: Hash tables store key–value pairs so that items can be found almost instantly. This lesson explains hash functions, how keys map to indices, load factor, and Python's dictionaries.
O: Explain how a hash function maps keys to table positions
O: Describe the properties of a good hash function
O: Explain average-case O(1) lookup and the role of the load factor
H: How hashing works
P: A **hash table** stores data in an array of **buckets**. A **hash function** converts each key into an index: for example, for integer keys, index = key mod table size. To store a value, hash its key and place the pair in that bucket; to look it up, hash the key again and go straight to the bucket. When few keys share a bucket, insertion, lookup and deletion take **O(1)** on average, whatever the number of items.
H: Good hash functions
- **Deterministic**: the same key always gives the same index.
- **Fast** to compute.
- **Uniform**: spreads keys evenly across buckets, avoiding clusters.
- Using a **prime** table size with the mod method often helps spread keys.
- For strings, functions combine the character codes, for example with a polynomial.
H: Load factor and resizing
- The **load factor** is the number of items divided by the number of buckets.
- As it rises, **collisions** (two keys mapping to the same index) become more frequent and performance falls.
- Tables **resize** when the load factor passes a threshold, rehashing every key into a larger array.
- Python's **dict** and **set** are hash tables; keys must be **hashable** (immutable), so lists cannot be dictionary keys.
X: Hashing integer keys.
> A table has 11 buckets and uses index = key mod 11.
> Key 25: 25 mod 11 is 3, so it goes in bucket 3.
> Key 47: 47 mod 11 is 3 as well: a collision with 25.
> Key 30: 30 mod 11 is 8, so it goes in bucket 8. The load factor is now 3 ÷ 11, about 0.27.
K: Hash tables use a hash function to map keys to array positions, giving average O(1) insertion, lookup and deletion; good hash functions are deterministic, fast and uniform, and tables resize as the load factor rises to limit collisions.
!: Assuming hash tables are always O(1). With many collisions or a poor hash function, lookups can degrade towards O(n).
EV: established | Hash tables offer constant average-time operations under reasonable assumptions about the hash function.
T: Hash function | A function mapping keys to table indices
T: Load factor | The ratio of stored items to buckets
T: Collision | Two different keys mapping to the same index
SUM: Hash keys to indices.
SUM: Average O(1) operations.
SUM: Resize as load factor rises.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 11 "Hash Tables" | secondary | 2022
SRC: Python Software Foundation, Time complexity (Python wiki) | data | 2023 | https://wiki.python.org/moin/TimeComplexity
Q: What is a load factor? | The number of items in a hash table divided by the number of buckets.
Q: Why can't a Python list be a dictionary key? | Lists are mutable and therefore not hashable.
M1#computing-u05-12-q1@1: What does a hash function do? | Converts a key into a table index | Sorts the table's contents | Encrypts every value | Counts the items | Applying the standard result: It maps keys to positions.
M2#computing-u05-12-q2@2: What is the average time complexity of lookup in a well-designed hash table? | O(1) | O(n) | O(log n) | O(n²) | Applying the standard result: Hashing goes straight to a bucket.
NUM2#computing-u05-12-q3@2: A hash table with 13 buckets uses index = key mod 13. Which bucket does key 40 go into? | 1 | 0 | index | 40 mod 13 is 1, because 3 × 13 = 39 leaves remainder 1.
M3#computing-u05-12-q4@3: A hash table's lookups slow down as it fills. What is the usual remedy? | Resize the table and rehash the keys | Delete half the keys | Switch to a stack | Use a slower hash function | Lowering the load factor reduces collisions.
SA2#computing-u05-12-q5@2,3: Explain how a hash table achieves fast lookup and what can make it slow. | A hash function converts the key into an index, so the table can go directly to the right bucket instead of searching, giving O(1) average time. Performance falls if many keys collide, because of a poor hash function that clusters keys or a high load factor; then several items must be checked in one bucket, and in the worst case lookup approaches O(n). Good hash functions and resizing prevent this. | Direct indexing ; Average O(1) ; Collisions ; Remedies

## Collision resolution
LV: A level · Application
S: When two keys hash to the same index, a hash table needs a way to resolve the collision. This lesson compares chaining and open addressing, including linear probing, and the problem of clustering.
O: Explain separate chaining
O: Trace linear probing in open addressing
O: Compare the strengths and weaknesses of each method
H: Separate chaining
P: In **separate chaining**, each bucket holds a **list** (often a linked list) of all the key–value pairs that hash to it. Insertion adds to the list; lookup hashes to the bucket and searches its list. With a good hash function and moderate load factor, lists stay short, so operations are close to O(1). Chaining copes well with high load factors and deletions are simple, but it uses extra memory for the lists.
H: Open addressing
- In **open addressing**, every item is stored in the array itself.
- If the target slot is taken, the table **probes** for another slot.
- **Linear probing**: try the next slot, then the next, wrapping round: index, index + 1, index + 2, and so on, modulo the size.
- **Quadratic probing** and **double hashing** use other step patterns to reduce clustering.
- **Searching** follows the same probe sequence until the key or an empty slot is found.
- **Deletion** must leave a special marker (a tombstone) so that later searches do not stop early.
H: Clustering and choice
- Linear probing creates **primary clustering**: runs of filled slots that grow and slow down inserts and searches.
- Open addressing needs the load factor kept low, often below about 0.7.
- Open addressing has good cache performance; chaining is simpler to manage at high load.
X: Linear probing in a table of size 7.
> The hash is key mod 7. Insert 10: 10 mod 7 is 3, so slot 3.
> Insert 17: 17 mod 7 is also 3, which is full, so probe slot 4: empty, so 17 goes there.
> Insert 24: 24 mod 7 is 3: full; slot 4: full; slot 5: empty, so 24 goes there.
> Searching for 24 checks slots 3, 4 and 5: the cluster has lengthened the search.
K: Collisions are resolved by separate chaining, storing colliding items in lists at each bucket, or open addressing, probing for another slot by linear, quadratic or double hashing; linear probing causes clustering and requires low load factors and tombstones for deletion.
!: Emptying a slot when deleting from an open-addressed table. Later searches would stop early; use a tombstone marker.
EV: established | Linear probing suffers from primary clustering as the load factor rises.
T: Separate chaining | Storing colliding items in a list at each bucket
T: Linear probing | Checking successive slots until a free one is found
T: Tombstone | A marker left when deleting from an open-addressed table
SUM: Chaining uses lists per bucket.
SUM: Open addressing probes for free slots.
SUM: Beware clustering and use tombstones.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 11 "Hash Tables" | secondary | 2022
SRC: Knuth D. E., The Art of Computer Programming, Volume 3: Sorting and Searching, 2nd edition, Addison-Wesley | secondary | 1998
Q: What is separate chaining? | Storing all items that hash to the same bucket in a list at that bucket.
Q: Why are tombstones needed in open addressing? | So that searches do not stop early at a slot emptied by deletion.
M1#computing-u05-13-q1@1: Which method stores colliding items in a list at each bucket? | Separate chaining | Linear probing | Quadratic probing | Double hashing | Applying the standard result: Chaining uses lists.
M2#computing-u05-13-q2@2: What is primary clustering? | Runs of filled slots forming in linear probing | Keys spread evenly across buckets | Items stored in linked lists | Deleting items with tombstones | Applying the standard result: Clusters grow and slow access.
NUM2#computing-u05-13-q3@2: A table of size 10 uses key mod 10 with linear probing. Slots 4 and 5 are full. Where does key 34 go? | 6 | 0 | slot | 34 mod 10 is 4; slots 4 and 5 are full, so it goes in slot 6.
M3#computing-u05-13-q4@3: Why must open-addressed tables keep a low load factor? | Probe sequences lengthen sharply as the table fills | Chaining stops working when full | Keys become unhashable | The hash function changes | Applying the standard result: High load causes long probes.
SA2#computing-u05-13-q5@2,3: Compare separate chaining and linear probing as collision resolution methods. | Separate chaining keeps a list at each bucket, so collisions simply lengthen the list; it tolerates high load factors and makes deletion easy, but needs extra memory for list nodes. Linear probing stores everything in the array, probing successive slots; it uses memory compactly and has good cache behaviour, but suffers primary clustering, needs a low load factor and requires tombstones for deletion. | Chaining mechanism ; Chaining trade-offs ; Probing mechanism ; Probing trade-offs

## Static and dynamic data structures
LV: A level · Foundation
S: Data structures can have a fixed size or grow and shrink as the program runs. This lesson compares static and dynamic structures, explains how dynamic arrays grow, and covers the heap and memory allocation.
O: Distinguish static and dynamic data structures
O: Explain how dynamic arrays resize and why appends are amortised O(1)
O: Evaluate when each type is appropriate
H: Static and dynamic
P: A **static** data structure has a size fixed when it is created, such as a fixed-length array. Its memory is reserved in advance, so access is fast and memory use is predictable, but space may be wasted or it may run out. A **dynamic** data structure, such as a linked list or a Python list, can **grow and shrink** at runtime, allocating memory from the **heap** as needed. It uses memory more flexibly but has overheads, such as pointers or occasional resizing.
H: Dynamic arrays
- Python's list is a **dynamic array**: it stores elements contiguously but reserves extra capacity.
- When it fills, it allocates a larger block, often about 1.125 to 2 times bigger, and copies the elements across.
- Copying is O(n), but it happens rarely, so the **amortised** cost of each append is O(1).
- Inserting or deleting in the middle is still O(n).
H: Memory and choice
- Dynamic structures use the **heap**, a pool of memory managed at runtime; languages like Python free unused memory automatically with **garbage collection**.
- Static structures suit fixed-size data, such as the days of the week, or embedded systems with tight memory.
- Dynamic structures suit data whose size is unknown in advance, such as user input or streamed data.
X: A growing list.
> A dynamic array has capacity 4 and holds 4 items.
> Appending a fifth item triggers a resize: a new array of capacity 8 is allocated and the 4 items copied.
> The next three appends need no copying.
> Over many appends, the occasional copying averages out to constant time per append.
K: Static structures have fixed sizes and predictable memory, while dynamic structures grow and shrink at runtime using the heap; dynamic arrays such as Python lists resize occasionally, making appends amortised O(1), and the choice depends on whether the data's size is known.
!: Assuming every append to a Python list copies the whole list. Resizing is occasional, so appends are amortised O(1).
EV: established | Geometric resizing gives dynamic arrays amortised constant-time appends.
T: Static data structure | A structure with a fixed size set at creation
T: Dynamic data structure | A structure that can change size at runtime
T: Amortised complexity | The average cost per operation over a sequence of operations
SUM: Static: fixed size.
SUM: Dynamic: grows and shrinks.
SUM: Dynamic arrays give amortised O(1) appends.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 16 "Amortized Analysis" | secondary | 2022
SRC: OCR, A Level Computer Science H446 specification, 1.4.2 Data structures | standard | 2015 | https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
Q: What is the heap in memory management? | A pool of memory from which dynamic structures are allocated at runtime.
Q: Why are appends to a dynamic array amortised O(1)? | Resizing and copying happen only occasionally, so the average cost per append is constant.
M1#computing-u05-14-q1@1: Which is a static data structure? | A fixed-length array | A linked list | A Python list | A dynamic queue | Applying the standard result: Its size is fixed.
M2#computing-u05-14-q2@2: What happens when a full dynamic array receives a new item? | A larger block is allocated and the items are copied | The new item is discarded | The array becomes static | The oldest item is deleted | Applying the standard result: Dynamic arrays resize.
NUM2#computing-u05-14-q3@2: A dynamic array doubles its capacity when full. Starting at capacity 4, what is its capacity after the 9th item is added? | 16 | 0 | slots | Capacity goes 4 to 8 at the 5th item, then 8 to 16 at the 9th.
M3#computing-u05-14-q4@3: Which situation best suits a static structure? | Storing the 12 months of the year | Storing an unknown number of chat messages | Storing user-uploaded files of any count | Buffering a live video stream | Applying the standard result: The size is known and fixed.
SA2#computing-u05-14-q5@2,3: Evaluate the use of static and dynamic data structures. | Static structures reserve a fixed amount of memory, giving fast, predictable access and suiting data of known size or memory-limited systems, but they can waste space or overflow. Dynamic structures grow and shrink as needed, using memory flexibly for data of unknown size, but they add overheads such as pointers, heap allocation and occasional resizing. The best choice depends on whether the size is known and on performance needs. | Static benefits ; Static drawbacks ; Dynamic benefits ; Dynamic overheads

## Comparing data structures
LV: A level · Evaluation
S: Choosing a data structure means weighing the operations a program needs against their costs. This lesson compares the time complexity of common operations across structures and applies the comparison to design decisions.
O: Compare the time complexity of common operations across data structures
O: Select an appropriate data structure for a given problem
O: Justify design choices in terms of time and memory
H: Comparing costs
- **Array**: access by index O(1); search O(n), or O(log n) if sorted; insert or delete in the middle O(n).
- **Linked list**: access and search O(n); insert or delete at a known node O(1).
- **Stack** and **queue**: push, pop, enqueue and dequeue O(1).
- **Balanced binary search tree**: search, insert and delete O(log n); keeps items ordered.
- **Hash table**: search, insert and delete O(1) on average, O(n) in the worst case; no ordering.
- **Binary heap**: insert and remove top O(log n); find top O(1).
H: Making the choice
P: Start from the **operations** the program performs most often, and the **constraints**: data size, memory, whether order matters and whether worst-case guarantees are needed. A phone book needing fast lookup by name suits a **hash table**; if names must also be listed alphabetically, a **balanced BST** may be better. A browser's back button suits a **stack**; a task scheduler suits a **priority queue**. Real systems often combine structures, for example a hash table pointing into a linked list for a least-recently-used cache.
H: Beyond big O
- Constant factors and **cache performance** matter: arrays are often faster in practice than linked lists for small data.
- **Memory overhead**: pointers in linked lists and trees, empty buckets in hash tables.
- **Simplicity** and the availability of well-tested library implementations.
X: Choosing for a leaderboard.
> A game must add scores quickly, show the top 10 at any time and look up a player's score by name.
> A hash table gives O(1) lookup by name but no ordering.
> A balanced BST or heap keyed on score gives ordered access to the top scores.
> The design combines a hash table for lookup by name with a balanced tree for the rankings.
K: Data structures trade off the costs of access, search, insertion and deletion, from O(1) array access and hash lookup to O(log n) balanced trees and heaps; choices should start from the most frequent operations and constraints such as ordering, memory and worst-case needs, and real systems often combine structures.
!: Choosing a structure by habit rather than by the operations needed. A list may be convenient but slow for frequent membership tests.
EV: established | Time complexity guides data structure choice, but constant factors and memory behaviour also matter in practice.
T: Time complexity | How an operation's cost grows with input size
T: Trade-off | A gain in one property at the cost of another
T: LRU cache | A cache that evicts the least recently used item, often built from a hash table and linked list
SUM: Each structure has strengths.
SUM: Start from the main operations.
SUM: Combine structures where needed.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press | secondary | 2022
SRC: Python Software Foundation, Time complexity (Python wiki) | data | 2023 | https://wiki.python.org/moin/TimeComplexity
Q: Which structure gives O(1) average lookup by key? | A hash table.
Q: Which structure keeps items ordered with O(log n) insertion? | A balanced binary search tree.
M1#computing-u05-15-q1@1: Which structure suits a browser's back button? | A stack | A queue | A hash table | A heap | Applying the standard result: The most recent page is revisited first.
M2#computing-u05-15-q2@2: Which structure gives O(1) access to the top-priority item and O(log n) removal? | A binary heap | A linked list | An unsorted array | A circular queue | Applying the standard result: Heaps keep the top at the root.
NUM1#computing-u05-15-q3@2: A balanced BST holds about 1,000,000 items. Roughly how many comparisons does a search need, given that 2^20 is about a million? | 20 | 1 | comparisons | Height is about log2 of 1,000,000, so roughly 20 comparisons.
M3#computing-u05-15-q4@3: A program checks millions of times whether a word is in a dictionary. Which structure is best? | A hash set | An unsorted list | A stack | A queue | Applying the standard result: Membership tests are O(1) on average.
SA2#computing-u05-15-q5@2,3: Explain how you would choose a data structure for a contacts app that must look up contacts by name and display them in alphabetical order. | A hash table gives fast O(1) average lookup by name but does not keep names in order, so listing them alphabetically would need sorting each time. A balanced binary search tree keeps names ordered, giving O(log n) lookup and in-order traversal for an alphabetical list. If both operations are frequent, the app could use a balanced tree, or combine a hash table for lookup with an ordered structure for display. | Hash table strengths ; Ordering problem ; Balanced BST strengths ; Combined design
`;
