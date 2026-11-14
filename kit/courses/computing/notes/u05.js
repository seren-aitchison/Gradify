// TechGradify · ForgeLab Data Structures (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Abstract data types
LV: A level · Foundation
S: An abstract data type (ADT) defines a collection of data by the operations it supports, not by how it is stored. This lesson explains the idea, why separating interface from implementation matters, and the ADTs studied in this school.
O: Define an abstract data type and distinguish it from a data structure
O: Describe an ADT by listing its operations and their behaviour
O: Evaluate the benefits of separating an interface from its implementation
H: Interface, not implementation
P: An **abstract data type** specifies what data is held and which **operations** can be performed on it, with their expected behaviour, but says nothing about how they are carried out. A stack ADT, for example, offers push, pop, peek and is_empty. A **data structure** is a concrete way of storing data in memory, such as an array or a linked list, used to **implement** an ADT.
P: The idea comes from Barbara Liskov and Stephen Zilles (1974): programs should use data only through its operations. Then the implementation can change, for example from an array to a linked list, without any code that uses the ADT having to change.
H: The ADTs in this school
- **Stack**: last in, first out.
- **Queue**: first in, first out; circular and priority variants.
- **List**: ordered items accessed by position, implemented as an array or a linked list.
- **Tree** and **binary search tree**: hierarchical data and fast ordered search.
- **Graph**: vertices joined by edges.
- **Dictionary** (map): values looked up by key, usually implemented as a hash table.
X: Specify a queue ADT for a printer.
> enqueue(job): add a job to the back.
> dequeue(): remove and return the job at the front.
> is_empty(): return True if no jobs are waiting; size(): return the number of jobs.
> Whether it uses a Python list, a circular array or a linked list is hidden from the code that sends print jobs.
K: An ADT is a contract (operations and behaviour); a data structure is one way of fulfilling it. Code that uses only the contract survives a change of implementation.
!: Treating "stack" and "array" as the same kind of thing. A stack is an ADT; an array is one data structure that can implement it.
EV: established | Data abstraction, introduced by Liskov and Zilles in 1974, underpins modules, classes and interfaces in modern languages.
EV: established | The same ADT can have implementations with very different performance, so choosing the implementation remains an engineering decision.
T: Abstract data type | A model of data defined by its operations and their behaviour, independent of implementation
T: Data structure | A concrete arrangement of data in memory used to implement an abstract data type
T: Interface | The set of operations through which other code uses an ADT or module
SUM: An ADT defines operations and behaviour; a data structure implements them.
SUM: Separating interface from implementation lets the implementation change without affecting users.
SRC: Liskov B. and Zilles S., "Programming with abstract data types", ACM SIGPLAN Notices 9(4), 50–59 | primary | 1974 | https://doi.org/10.1145/942572.807045
SRC: AQA, A-level Computer Science 7517 specification, section 4.2.1 "Data structures and abstract data types" | standard | 2015
Q: What is an abstract data type? | A model of data defined by the operations it supports and their behaviour, without saying how it is stored.
Q: What is the difference between an ADT and a data structure? | An ADT specifies operations and behaviour; a data structure is a concrete storage method used to implement it.
M1#computing-u05-01-q1@1: What does an abstract data type define? | The operations on the data and how they behave | The exact layout of the data in memory | The programming language that must be used | The speed of each operation in seconds | An ADT is about behaviour; layout is the implementation's concern.
M2#computing-u05-01-q2@2: A team replaces the array inside its stack with a linked list. Code elsewhere that only calls push and pop is unchanged. Which principle does this show? | Separating an ADT's interface from its implementation | Recursion replacing iteration | Static memory allocation | Normalisation of data | Because other code uses only the operations, the implementation can change freely.
TF1#computing-u05-01-q3@1: A stack is an example of an abstract data type. | true | A stack is defined by its operations (push, pop, peek, is_empty), and can be implemented with an array or a linked list.
M3#computing-u05-01-q4@3: Why is it risky for code to read a stack's internal array directly instead of calling pop and peek? | The code breaks if the stack's implementation changes, and it may bypass rules such as last in, first out | Arrays can't be read once they are inside a stack | It makes the stack hold items in the wrong data type | Reading an array always causes a syntax error | Depending on internals ties code to one implementation and can violate the ADT's behaviour.
SA3#computing-u05-01-q5@2,3: Explain the difference between an abstract data type and a data structure, using a queue as an example, and evaluate why the distinction matters. | A queue ADT is defined by enqueue, dequeue, is_empty and size, with first-in, first-out behaviour. It can be implemented with data structures such as a Python list, a circular array or a linked list. The distinction matters because code using only the operations doesn't depend on the implementation, so a slow implementation (list with removal from the front, O(n)) can be replaced by a faster one (a deque or circular array, O(1)) without changing the rest of the program. It also makes the code easier to understand and test. | Defines ADT by operations ; Lists queue operations ; Names implementations ; Explains replaceable implementation ; Gives a concrete benefit such as speed or testing

## Arrays and records
LV: A level · Foundation
S: An array stores a fixed number of items of the same type in consecutive memory, so any item can be reached directly by its index. A record groups related fields of different types. This lesson covers both and how they combine.
O: Describe how an array is stored and why indexing takes constant time
O: Define records and use arrays of records to represent tables of data
O: Compare arrays with Python lists and with linked structures
H: Arrays
P: An **array** is a fixed-size, indexed collection of elements of one type, stored in **contiguous** memory. If the array starts at address B and each element takes s bytes, element i is at address B + i × s, so any element is found in one calculation: access is O(1). Arrays can have one, two or more dimensions.
E: address of element i = base address + i × element size :: why array access takes constant time
P: The size is fixed when the array is created. Inserting an item in the middle means shifting every later item along, which is O(n), and growing beyond the size means allocating a new, larger array and copying.
H: Records
- A **record** groups named fields that may have different types: a student record has name (string), age (integer) and fees_paid (Boolean).
- In Python a record can be a tuple, a dictionary, a dataclass or an object.
- An **array of records** represents a table: each record is a row, each field a column.
- A file of records stores the same structure permanently, as in a CSV file.
X: An array of student records using a dataclass.
> \`from dataclasses import dataclass\`, then define class Student with fields name: str, age: int and paid: bool.
> \`students = [Student("Ali", 16, True), Student("Bea", 17, False)]\`.
> \`students[1].paid\` reads one field of one record: False.
> Counting unpaid fees is a loop over the array testing each record's paid field.
K: Arrays give constant-time access by index because elements are the same size and stored side by side; records group fields of different types describing one thing.
!: Assuming Python lists are arrays of values. A list holds references to objects anywhere in memory, which is why it can mix types and grow, at some cost in memory.
EV: established | Indexing a contiguous array takes constant time because each element's address is computed directly from its index.
EV: established | Exam specifications define arrays as fixed-size and homogeneous; Python lists are dynamic arrays of references.
T: Array | A fixed-size collection of elements of the same type stored in contiguous memory and accessed by index
T: Record | A data structure grouping related named fields, which may be of different types
T: Field | One named item of data within a record
SUM: Arrays store same-typed elements contiguously, giving O(1) indexing but costly insertion and fixed size.
SUM: Records group fields of different types; arrays of records represent tables.
SRC: Python Software Foundation, The Python Standard Library, "array: Efficient arrays of numeric values" | standard | 2024 | https://docs.python.org/3/library/array.html
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, section 10.1 | secondary | 2022
Q: Why is accessing an array element by index O(1)? | Its address is computed directly as the base address plus index times element size.
Q: What is a record? | A data structure that groups related named fields, possibly of different types, describing one item.
M1#computing-u05-02-q1@1: Which describes an array as defined in exam specifications? | A fixed-size collection of elements of one type, accessed by index | A collection of key-value pairs looked up by key | A chain of nodes linked by pointers | A collection whose items have no order | Arrays are fixed in size, homogeneous and indexed.
M2#computing-u05-02-q2@3: An array of 4-byte integers starts at address 1000. What is the address of element 5? | 1020 | 1005 | 1024 | 1016 | Address = 1000 + 5 × 4 = 1020; elements are numbered from 0.
TF1#computing-u05-02-q3@2: Inserting a new item at the start of an array of n items requires shifting the existing items. | true | Every existing item must move one place along, which takes O(n) time.
M3#computing-u05-02-q4@3: A program stores each customer's name, phone number and balance. Which structure best represents all the customers? | An array of records, one record per customer | Three unrelated arrays, sorted separately | One string joining all the data | A single integer variable per customer | Records keep each customer's fields together; parallel arrays sorted separately would lose which values belong together.
SA3#computing-u05-02-q5@2,3: Compare arrays and linked lists for storing a list of names that is read often but rarely changed. | An array stores names contiguously, so any name is reached by index in O(1), and it uses little extra memory; but inserting or deleting in the middle needs shifting, O(n), and the size is fixed. A linked list grows easily and inserts in O(1) once the position is found, but reaching item i means following i pointers, O(n), and each node stores a pointer. For data read often and rarely changed, an array is better. | Array O(1) access ; Array costly insertion or fixed size ; Linked list easy insertion ; Linked list O(n) access or pointer overhead ; Chooses array with justification

## Stacks
LV: A level · Application
S: A stack is a last-in, first-out (LIFO) collection: items are added and removed only at the top. This lesson covers stack operations, implementing a stack with an array and a pointer, and the many uses of stacks in computing.
O: Describe the stack operations push, pop, peek, is_empty and is_full
O: Implement a stack with an array and a top pointer, and trace its operations
O: Explain uses of stacks, including the call stack, undo and expression evaluation
H: Last in, first out
P: A **stack** allows access only at one end, the **top**. **Push** adds an item to the top; **pop** removes and returns the top item; **peek** returns it without removing it; **is_empty** tests for no items. Popping an empty stack is a **stack underflow**; pushing onto a full fixed-size stack is a **stack overflow**.
P: With an array of size n and a **top pointer** holding the index of the top item (−1 when empty), push increments top then stores the item, and pop reads the item at top then decrements it. Both are O(1). In Python, a list's append and pop give the same behaviour.
X: Trace a stack of size 4, top = −1, after push(5), push(8), pop(), push(3), push(9), peek().
> push(5): top = 0, stack [5]. push(8): top = 1, [5, 8].
> pop() returns 8: top = 0. The 8 may still be in memory but is no longer part of the stack.
> push(3): top = 1, [5, 3]. push(9): top = 2, [5, 3, 9].
> peek() returns 9 and top stays 2.
K: A stack adds and removes only at the top: the last item pushed is the first popped, and every operation takes constant time.
H: Uses of stacks
- **Call stack**: return addresses and local variables of active subroutines.
- **Undo** in editors: each action is pushed; undo pops the most recent.
- **Back button** in a browser.
- **Expression evaluation**: Reverse Polish notation and checking brackets are balanced.
- **Depth-first search** and backtracking.
!: Forgetting to check for underflow before popping. Popping an empty stack must be handled, or the program reads invalid data or crashes.
EV: established | All stack operations take O(1) time in array and linked-list implementations.
EV: established | Stacks are used by processors and language runtimes to manage subroutine calls, which is why unbounded recursion causes a stack overflow.
T: Stack | A last-in, first-out collection where items are added and removed only at the top
T: Push | The operation that adds an item to the top of a stack
T: Pop | The operation that removes and returns the top item of a stack
SUM: A stack is LIFO: push, pop and peek act only at the top, in O(1) time.
SUM: Stacks manage subroutine calls, undo, back buttons, expression evaluation and DFS.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, section 10.1.3 "Stacks and queues" | secondary | 2022
SRC: Python Software Foundation, The Python Tutorial, section 5.1.1 "Using Lists as Stacks" | guidance | 2024 | https://docs.python.org/3/tutorial/datastructures.html
Q: What does LIFO mean? | Last in, first out: the most recently added item is removed first.
Q: What is stack underflow? | An attempt to pop from an empty stack.
M1#computing-u05-03-q1@1: Which item does pop remove from a stack? | The most recently pushed item | The first item ever pushed | The smallest item | A random item | A stack is last in, first out, so pop removes the top, most recent item.
M2#computing-u05-03-q2@2: Starting empty, a stack does push(A), push(B), push(C), pop(), push(D), pop(), pop(). Which item is left? | A | B | C | D | C is popped, D pushed then popped, then B popped, leaving only A.
TF1#computing-u05-03-q3@1: Peek removes the top item from a stack. | false | Peek returns the top item without removing it; pop removes it.
M3#computing-u05-03-q4@3: Which application needs a stack rather than a queue? | Checking that every opening bracket in an expression has a matching closing bracket | Serving customers in the order they arrive | Sending print jobs to a printer in order | Buffering keystrokes before they are processed | The most recent unclosed bracket must be matched first, which is last in, first out.
SA3#computing-u05-03-q5@2,3: Explain how a stack can check whether the brackets in an expression such as ( [ ] ) are balanced. | Read the expression from left to right. Push each opening bracket. For each closing bracket, if the stack is empty or the popped bracket isn't the matching opening type, the expression is unbalanced. At the end, the stack must be empty; otherwise some brackets weren't closed. A stack suits this because the most recently opened bracket must be closed first (LIFO). | Pushes opening brackets ; Pops and compares on a closing bracket ; Handles empty stack on a closing bracket ; Checks the stack is empty at the end ; Explains why LIFO fits

## Queues
LV: A level · Application
S: A queue is a first-in, first-out (FIFO) collection: items join at the rear and leave from the front. This lesson covers queue operations, a linear array implementation with front and rear pointers, and where queues are used.
O: Describe the queue operations enqueue, dequeue, is_empty and is_full
O: Implement a linear queue with an array and front and rear pointers, and trace it
O: Explain the weakness of a linear array queue and identify uses of queues
H: First in, first out
P: A **queue** adds items at the **rear** with **enqueue** and removes them from the **front** with **dequeue**, so items leave in the order they arrived. Peek returns the front item without removing it.
P: In a **linear queue** in an array, a front pointer marks the first item and a rear pointer the last. Enqueue increments rear and stores the item; dequeue reads the item at front and increments front. Items never move, so both operations are O(1).
X: Trace a linear queue of size 5 (front = 0, rear = −1) after enqueue(4), enqueue(7), enqueue(2), dequeue(), enqueue(9).
> enqueue(4): rear = 0. enqueue(7): rear = 1. enqueue(2): rear = 2. Queue 4, 7, 2.
> dequeue() returns 4; front = 1.
> enqueue(9): rear = 3. Queue 7, 2, 9 in positions 1 to 3.
> Position 0 is now wasted: once rear reaches 4, the queue reports full even though position 0 is free.
K: A queue removes items in arrival order; a linear array queue is simple but wastes the space at the front as items are dequeued.
H: Uses and implementations
- **Print queues** and **task scheduling** in an operating system.
- **Keyboard buffers** and network packet buffers.
- **Breadth-first search**.
- Simulations of real queues (checkouts, traffic).
- In Python, \`collections.deque\` gives O(1) appends and pops at both ends; \`list.pop(0)\` is O(n) because every item shifts.
!: Using \`list.pop(0)\` for a large queue in Python. Each dequeue shifts every remaining item; use collections.deque instead.
EV: established | Queue operations take O(1) time with a circular array, linked list or deque.
EV: established | Python's documentation recommends collections.deque for queues because removing from the front of a list is slow.
T: Queue | A first-in, first-out collection: items join at the rear and leave from the front
T: Enqueue | The operation that adds an item to the rear of a queue
T: Dequeue | The operation that removes and returns the item at the front of a queue
SUM: A queue is FIFO: enqueue at the rear, dequeue from the front.
SUM: A linear array queue wastes space as the front advances; circular queues and deques fix this.
SRC: Python Software Foundation, The Python Standard Library, "collections": deque objects | standard | 2024 | https://docs.python.org/3/library/collections.html
SRC: OCR, A Level Computer Science H446 specification, section 1.4.2 "Data structures" | standard | 2015
Q: What does FIFO mean? | First in, first out: items leave in the order they arrived.
Q: Why is collections.deque better than a list for a queue in Python? | Removing from the front of a list shifts every item, O(n); deque removes from either end in O(1).
M1#computing-u05-04-q1@1: In a queue, where are new items added? | At the rear | At the front | In the middle | At a random position | Enqueue adds at the rear; dequeue removes from the front.
M2#computing-u05-04-q2@2: An empty queue does enqueue(P), enqueue(Q), dequeue(), enqueue(R), dequeue(). Which item remains? | R | P | Q | None | P leaves first, then Q, so only R remains.
TF1#computing-u05-04-q3@3: In a linear array queue, positions freed by dequeue are automatically reused for new items. | false | The rear only moves forward, so freed positions at the front are wasted; a circular queue wraps round to reuse them.
M3#computing-u05-04-q4@3: Why does an operating system use a queue for print jobs? | Jobs should be printed in the order they were submitted | The most recent job should always print first | Jobs must be sorted by size before printing | Queues use no memory at all | Fairness requires first come, first served, which is FIFO.
SA3#computing-u05-04-q5@2,3: Compare stacks and queues, giving one application of each and explaining why that structure suits it. | A stack is LIFO: items are added and removed at the top. It suits undo in a word processor, because the most recent action must be undone first. A queue is FIFO: items join at the rear and leave from the front. It suits a print queue, because jobs should be printed in submission order. Both have O(1) operations when implemented properly. | Defines a stack as LIFO ; Gives a stack application with reason ; Defines a queue as FIFO ; Gives a queue application with reason ; Notes O(1) operations or implementation

## Circular and priority queues
LV: A level · Application
S: A circular queue reuses array space by wrapping its pointers round to the start; a priority queue removes the highest-priority item first. This lesson covers how each works and where they are used.
O: Explain how a circular queue reuses space using modular arithmetic
O: Trace enqueue and dequeue operations on a circular queue, detecting full and empty states
O: Describe priority queues, their implementations and uses
H: Circular queues
P: A **circular queue** treats the array as a ring. When a pointer reaches the last position it wraps round to position 0, so space freed at the front is reused. With size n, the pointers advance with \`rear = (rear + 1) % n\` and \`front = (front + 1) % n\`. Keeping a count of items is the simplest way to tell full (count = n) from empty (count = 0).
E: rear = (rear + 1) MOD size :: advances the rear pointer, wrapping to 0 after the last position
X: A circular queue of size 4 holds items in positions 1 to 3 (front = 1, rear = 3, count = 3). Enqueue X, then dequeue.
> enqueue(X): rear = (3 + 1) % 4 = 0, so X goes in position 0; count = 4, full.
> dequeue(): returns the item at position 1; front = 2; count = 3.
> The next enqueue goes to position 1, reusing freed space.
> A linear queue would have reported full long before.
K: A circular queue wraps its pointers with MOD so freed positions are reused; track a count, or leave one slot empty, to distinguish full from empty.
H: Priority queues
P: In a **priority queue** each item has a priority, and dequeue removes the item with the highest priority (items of equal priority usually leave in arrival order). A simple implementation keeps items sorted (O(n) insert, O(1) remove); a **binary heap** gives O(log n) for both, and Python's \`heapq\` module provides one.
- Operating system schedulers run high-priority processes first.
- A&E triage sees the most urgent patients first.
- Dijkstra's and A* search algorithms take the vertex with the smallest distance next.
- Network routers prioritise time-sensitive traffic such as voice calls.
!: Testing \`front == rear\` alone to decide whether a circular queue is empty. With wrapping, the same condition can also mean full, unless a count or spare slot is used.
EV: established | Binary heaps support priority-queue insertion and removal of the minimum in O(log n) time.
EV: established | Circular buffers are widely used in hardware and operating systems for streams such as audio and keyboard input.
T: Circular queue | A queue in a fixed array whose front and rear pointers wrap round to the start, reusing space
T: Priority queue | A queue in which the item with the highest priority is removed first
T: Binary heap | A complete binary tree stored in an array, used to implement priority queues efficiently
SUM: Circular queues wrap pointers with MOD to reuse array space.
SUM: Priority queues remove the highest-priority item first; heaps implement them in O(log n).
SRC: Python Software Foundation, The Python Standard Library, "heapq: Heap queue algorithm" | standard | 2024 | https://docs.python.org/3/library/heapq.html
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 6 "Heapsort" | secondary | 2022
Q: How does a circular queue advance its rear pointer? | rear = (rear + 1) MOD size, wrapping to 0 after the last position.
Q: Which item does a priority queue remove first? | The item with the highest priority.
M1#computing-u05-05-q1@1: What is the main advantage of a circular queue over a linear queue in an array? | It reuses positions freed at the front | It can hold items of different types | It sorts items as they arrive | It never becomes full | Wrapping round lets freed space be reused; a fixed array can still fill up.
M2#computing-u05-05-q2@3: A circular queue has size 6 and rear = 5. Where is the next item stored? | Position 0 | Position 6 | Position 5 | Position 1 | (5 + 1) MOD 6 = 0, so the rear wraps round to the start.
TF1#computing-u05-05-q3@2: In a priority queue, an item that arrives later can leave before items that arrived earlier. | true | Removal order depends on priority, not only on arrival time.
M3#computing-u05-05-q4@3: A hospital system stores waiting patients in a sorted list and inserts each new patient in priority order. What is the cost and a better option? | Each insertion is O(n); a binary heap makes insertion and removal O(log n) | Each insertion is O(1), so no improvement is possible | Removal is O(n²), so a stack would be better | Sorted lists can't store priorities, so a queue must be used | A heap balances insertion and removal at O(log n), better than O(n) inserts for large queues.
SA3#computing-u05-05-q5@2,3: Explain how a circular queue overcomes the problem of a linear queue, and how it tells when it is full. | In a linear array queue the front pointer moves forward as items are dequeued, so positions at the start can't be reused and the queue reports full early. A circular queue wraps both pointers round with (pointer + 1) MOD size, so after the last position the next item goes into position 0 if it is free. To tell full from empty, keep a count of items (full when count equals size), or leave one slot always empty so that full is when (rear + 1) MOD size equals front. | Describes wasted space in a linear queue ; Explains wrapping with MOD ; Shows reuse of freed positions ; Explains a full test with a count or spare slot ; Distinguishes full from empty

## Linked lists
LV: A level · Application
S: A linked list stores items in nodes, each holding data and a pointer to the next node. This lesson covers traversing, inserting and deleting in linked lists, and compares them with arrays.
O: Describe the structure of a singly linked list, including nodes, pointers and the head
O: Trace traversal, insertion and deletion in a linked list
O: Compare linked lists with arrays for access, insertion and memory use
H: Nodes and pointers
P: A **linked list** is a sequence of **nodes**. Each node holds a data item and a **pointer** (reference) to the next node; the last node's pointer is **null** (None in Python). A **head** pointer gives the first node. Nodes can be anywhere in memory, so the list grows one node at a time without moving existing items.
P: To **traverse**, start at the head and follow pointers until null. Reaching the ith item means following i pointers, so access by position is O(n), unlike an array's O(1).
X: Insert "C" in alphabetical order into the list A → B → D.
> Create a new node holding C.
> Traverse from the head to the node before the insertion point: B, because B < C < D.
> Set C's pointer to B's next node (D), then set B's pointer to C.
> The list is A → B → C → D. No other nodes moved: the insertion itself is O(1) once the position is found.
K: Linked lists insert and delete by changing pointers, without shifting items, but finding a position requires traversal from the head.
H: Variations and trade-offs
- **Deleting** node X: set the previous node's pointer to X's next node.
- **Doubly linked**: each node also points to the previous node, allowing backward traversal.
- **Circular**: the last node points back to the first.
- Costs: extra memory for pointers, no direct indexing, and poor cache performance.
- In exam questions, linked lists are often stored in arrays, with a "next" index acting as the pointer and a free list of unused nodes.
!: Changing pointers in the wrong order. Setting B's pointer to C before copying B's old next into C loses the rest of the list.
EV: established | Linked lists support O(1) insertion and deletion at a known node but O(n) access by position.
EV: contested | On modern hardware, arrays often outperform linked lists even for insertions, because contiguous memory makes better use of the processor cache.
T: Linked list | A dynamic data structure of nodes, each holding data and a pointer to the next node
T: Node | An element of a linked structure, holding data and one or more pointers
T: Null pointer | A pointer that refers to nothing, marking the end of a linked list
SUM: Linked lists chain nodes with pointers from a head to a null end.
SUM: They insert and delete by changing pointers but need O(n) traversal to find a position.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, section 10.2 "Linked lists" | secondary | 2022
SRC: Knuth D. E., The Art of Computer Programming, Volume 1: Fundamental Algorithms, 3rd edition, Addison-Wesley, section 2.2 | secondary | 1997
Q: What does each node in a singly linked list contain? | A data item and a pointer to the next node.
Q: How do you delete a node from a linked list? | Set the previous node's pointer to the deleted node's next node.
M1#computing-u05-06-q1@1: What marks the end of a singly linked list? | A null pointer in the last node | A node holding the value 0 | The head pointer | The largest data item | The last node points to nothing, signalling the end of the list.
M2#computing-u05-06-q2@2: List: head → 3 → 8 → 12 → null. Node 8 is deleted. Which pointer changes? | The pointer in node 3, which now points to 12 | The head pointer, which now points to 12 | The pointer in node 12, which now points to 3 | No pointer changes | The node before the deleted one is redirected past it.
TF1#computing-u05-06-q3@1: Accessing the 500th item of a linked list takes the same time as accessing the 1st. | false | You must follow pointers from the head, so the 500th item needs about 500 steps.
M3#computing-u05-06-q4@3: Which task most favours a linked list over an array? | Frequently inserting and deleting items in the middle of a long sequence | Repeatedly reading items by their position | Storing a fixed set of values that never changes | Binary searching a sorted sequence | Linked lists change pointers instead of shifting items; arrays are better for indexed access and binary search.
SA3#computing-u05-06-q5@2,3: Describe how to insert a new item into the middle of a linked list, and explain why the order of the pointer changes matters. | Create a node for the new item. Traverse from the head to the node after which it belongs (the previous node). Set the new node's pointer to the previous node's next node, then set the previous node's pointer to the new node. If the previous node's pointer were changed first, the reference to the rest of the list would be lost, cutting off every later node. The insertion is O(1) once the position is found, but finding it is O(n). | Creates a new node ; Traverses to the previous node ; Sets new node's pointer first ; Then updates the previous node ; Explains loss of the rest of the list in the wrong order

## Trees
LV: A level · Foundation
S: A tree is a hierarchical data structure of nodes connected by edges, with one root and no cycles. This lesson covers the vocabulary of trees, binary trees and the many places trees appear in computing.
O: Define a tree and use the terms root, parent, child, leaf, subtree, edge and height
O: Represent a binary tree using nodes with left and right pointers or arrays
O: Identify real uses of trees in computing
H: Tree vocabulary
P: A **tree** is a connected graph with no cycles. A rooted tree has one **root** node at the top; every other node has exactly one **parent**, and may have **children**. Nodes with no children are **leaves**. Any node with all its descendants forms a **subtree**. The **height** of a tree is the number of edges on the longest path from the root to a leaf.
P: In a **binary tree** every node has at most two children, called left and right. Each node holds data, a left pointer and a right pointer (null where there is no child). In exam questions a binary tree is often stored in three arrays: data, left and right, with indexes as pointers.
X: A family-style tree: root "CS" with children "Theory" and "Systems"; "Systems" has children "OS" and "Networks".
> Root: CS. Parent of OS: Systems. Children of Systems: OS and Networks.
> Leaves: Theory, OS and Networks, which have no children.
> Height: 2 edges, from CS to Systems to OS.
> The subtree rooted at Systems contains Systems, OS and Networks.
K: A tree has one root, every other node has one parent, and there are no cycles; a binary tree allows at most two children per node.
H: Trees in computing
- **File systems**: folders contain files and folders.
- **Binary search trees** for fast ordered lookups, and B-trees in database indexes.
- **Syntax trees** produced by compilers when parsing code.
- **HTML documents**: the DOM is a tree of elements.
- **Decision trees** in machine learning and **Huffman trees** in compression.
!: Thinking every node in a binary tree must have exactly two children. Binary means at most two; leaves have none.
EV: established | A tree with n nodes has exactly n − 1 edges.
EV: established | A binary tree of height h has at most 2^{h + 1} − 1 nodes, so a balanced tree of n nodes has height about log_{2} n.
T: Tree | A connected, undirected graph with no cycles, usually with a designated root
T: Leaf | A node in a tree with no children
T: Binary tree | A tree in which each node has at most two children, left and right
SUM: Trees are hierarchical: one root, one parent per node, no cycles, leaves at the bottom.
SUM: Binary trees allow at most two children; trees model file systems, indexes, syntax and documents.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, appendix B.5 "Trees" | secondary | 2022
SRC: AQA, A-level Computer Science 7517 specification, section 4.2.3 "Trees" | standard | 2015
Q: What is a leaf node? | A node with no children.
Q: How many edges does a tree with n nodes have? | n − 1.
M1#computing-u05-07-q1@1: What is the root of a tree? | The single node with no parent | Any node with no children | The node with the largest value | The last node added | The root is at the top and is the only node without a parent.
M2#computing-u05-07-q2@2: A tree's root has three children, and one of those children has two children. How many leaves does it have? | 4 | 3 | 5 | 2 | Two of the root's children are leaves, plus the two grandchildren: 4.
TF1#computing-u05-07-q3@1: A tree can contain a cycle. | false | By definition a tree has no cycles; a structure with a cycle is a general graph.
M3#computing-u05-07-q4@3: Why is an operating system's folder structure modelled as a tree? | Each folder or file is inside exactly one parent folder, with a single top-level root | Files must be sorted alphabetically | Folders can contain each other in a loop | Trees use less disk space than lists | One parent per item and a single root is exactly the definition of a rooted tree.
SA3#computing-u05-07-q5@2,3: Explain the terms root, parent, child, leaf and height using an example tree, and describe one use of trees in computing. | Example: root A has children B and C; B has children D and E. A is the root (no parent); B is the parent of D and E, which are its children; C, D and E are leaves (no children); the height is 2 (A to B to D). Use: a file system, where each folder is a node whose children are the files and folders inside it, so paths are routes from the root. | Defines root and parent correctly ; Defines child and leaf correctly ; Calculates height ; Uses a consistent example ; Describes a real use

## Binary search trees
LV: A level · Application
S: A binary search tree (BST) keeps its items ordered: everything in a node's left subtree is smaller and everything in its right subtree is larger. This lesson covers searching, inserting and deleting in a BST and why balance matters.
O: State the binary search tree property and build a BST from a sequence of values
O: Trace search and insertion in a binary search tree
O: Explain how balance affects a BST's efficiency
H: The ordering property
P: In a **binary search tree**, for every node, all values in its left subtree are less than the node's value and all values in its right subtree are greater. To **search**, start at the root: if the target is smaller go left, if larger go right, until it is found or a null pointer is reached. Each step discards a whole subtree, like binary search.
P: To **insert**, search for the value; where the search falls off the tree (a null pointer), attach a new leaf. Insertion order decides the shape of the tree.
X: Insert 50, 30, 70, 20, 40, 60 in that order, then search for 40.
> 50 becomes the root. 30 < 50: left of 50. 70 > 50: right of 50.
> 20: left of 50, then left of 30. 40: left of 50, then right of 30. 60: right of 50, then left of 70.
> Search 40: 40 < 50, go left to 30; 40 > 30, go right: found in 3 comparisons.
> Searching for 45 would go 50, 30, 40, then right of 40: null, so 45 is absent.
K: In a balanced BST, search, insertion and deletion take O(log n); in a degenerate (unbalanced) tree they take O(n).
H: Balance and deletion
- Inserting values in sorted order (10, 20, 30, …) makes every node a right child: the tree becomes a linked list, O(n).
- **Self-balancing** trees, such as AVL and red-black trees, restructure themselves to keep the height near log_{2} n.
- **Deleting** a leaf: remove it. A node with one child: link the child to the parent. A node with two children: replace its value with its in-order successor (the smallest value in the right subtree), then delete that node.
- An **in-order traversal** visits a BST's values in ascending order.
!: Checking only a node's immediate children for the BST property. Every value in the whole left subtree must be smaller than the node, not just its left child.
EV: established | BST operations take time proportional to the tree's height: O(log n) when balanced and O(n) in the worst case.
EV: established | AVL trees (Adelson-Velsky and Landis, 1962) were the first self-balancing binary search trees.
T: Binary search tree | A binary tree in which every left subtree holds smaller values and every right subtree larger values than its node
T: Balanced tree | A tree whose height is kept close to log₂ n, so operations stay fast
T: In-order successor | The next larger value in a BST: the smallest value in a node's right subtree
SUM: A BST keeps smaller values to the left and larger to the right, so search discards a subtree each step.
SUM: Balanced BSTs give O(log n) operations; sorted insertion order degrades them to O(n).
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 12 "Binary Search Trees" | secondary | 2022
SRC: Adelson-Velsky G. M. and Landis E. M., "An algorithm for the organization of information", Soviet Mathematics Doklady 3, 1259–1263 | primary | 1962
Q: State the binary search tree property. | For every node, all values in its left subtree are smaller and all values in its right subtree are larger.
Q: What happens to a BST if values are inserted in sorted order? | It becomes a chain like a linked list, so operations degrade to O(n).
M1#computing-u05-08-q1@1: In a binary search tree, where are values smaller than a node stored? | In its left subtree | In its right subtree | At the root | In a separate list | The BST property puts smaller values on the left and larger on the right.
M2#computing-u05-08-q2@2: Values 40, 25, 60, 30 are inserted in that order into an empty BST. Where does 30 go? | Right child of 25 | Left child of 25 | Left child of 60 | Right child of 40 | 30 < 40 goes left to 25; 30 > 25 goes right, where the pointer is null.
TF1#computing-u05-08-q3@2: An in-order traversal of a binary search tree visits its values in ascending order. | true | Left subtree, node, right subtree visits smaller values, then the node, then larger values.
M3#computing-u05-08-q4@3: A BST built from 1, 2, 3, …, 1000 inserted in order is searched for 1000. How many comparisons are needed? | About 1,000, because the tree is a chain | About 10, because BST search is O(log n) | Exactly 1, because 1000 is the largest | About 500, because it searches half the tree | Sorted insertion gives a degenerate tree of height 999, so search is linear.
SA3#computing-u05-08-q5@2,3: Explain why a binary search tree can be searched efficiently, and evaluate what can go wrong. | At each node the search compares the target and goes left or right, discarding the other subtree, so the number of comparisons is at most the height. In a balanced tree the height is about log₂ n: 20 comparisons for a million items. But the shape depends on insertion order: sorted or nearly sorted input produces a tall, chain-like tree, making search O(n). Self-balancing trees such as AVL or red-black trees fix this by rotating nodes after insertions and deletions, keeping operations O(log n). | Explains discarding a subtree per comparison ; Relates comparisons to height ; States O(log n) when balanced ; Explains degeneration with sorted input ; Mentions self-balancing trees

## Tree traversal
LV: A level · Application
S: Traversing a tree means visiting every node exactly once. This lesson covers the three depth-first traversals of a binary tree (pre-order, in-order and post-order) and breadth-first level-order traversal, with their uses.
O: Describe pre-order, in-order, post-order and level-order traversals
O: Trace each traversal on a binary tree and write down the visiting order
O: Match each traversal to a use, such as copying, sorting or deleting a tree
H: Depth-first traversals
- **Pre-order**: visit the node, then traverse the left subtree, then the right subtree.
- **In-order**: traverse the left subtree, visit the node, then traverse the right subtree.
- **Post-order**: traverse the left subtree, then the right subtree, then visit the node.
P: Each is naturally recursive: \`def inorder(node):\` returns if node is None, otherwise calls inorder(node.left), visits node, then calls inorder(node.right). A quick check by hand: draw a dot on the left of each node for pre-order, underneath for in-order and on the right for post-order, then trace round the tree anticlockwise from the root.
X: Tree: root 8; 8 has left 3 and right 10; 3 has left 1 and right 6; 10 has right 14.
> Pre-order: 8, 3, 1, 6, 10, 14.
> In-order: 1, 3, 6, 8, 10, 14 (ascending, because it is a BST).
> Post-order: 1, 6, 3, 14, 10, 8.
> Level-order (breadth-first): 8, 3, 10, 1, 6, 14.
K: Pre-order visits a node before its children, post-order after them, and in-order between its left and right subtrees; in-order on a BST gives sorted output.
H: Uses
P: **Level-order** traversal visits nodes level by level using a queue, like breadth-first search on a graph. Each traversal suits particular tasks:
- Pre-order: copying a tree, and producing prefix (Polish) notation from an expression tree.
- In-order: outputting a BST's contents in order; producing infix notation.
- Post-order: deleting a tree (children before parent) and producing Reverse Polish notation for evaluation.
- Level-order: printing a tree level by level, and finding the shallowest node with a property.
!: Mixing up pre-order and post-order on expression trees. For the tree of 3 + 4, pre-order gives + 3 4 and post-order gives 3 4 +.
EV: established | Each traversal of a binary tree with n nodes takes O(n) time, visiting every node once.
EV: established | Post-order traversal of an expression tree produces Reverse Polish notation, which can be evaluated with a stack.
T: Pre-order traversal | Visiting a node, then its left subtree, then its right subtree
T: In-order traversal | Visiting a node's left subtree, then the node, then its right subtree
T: Post-order traversal | Visiting a node's left subtree, then its right subtree, then the node
SUM: Pre-order: node, left, right. In-order: left, node, right. Post-order: left, right, node.
SUM: Level-order uses a queue; in-order sorts a BST; post-order deletes trees and gives RPN.
SRC: Knuth D. E., The Art of Computer Programming, Volume 1: Fundamental Algorithms, 3rd edition, Addison-Wesley, section 2.3.1 "Traversing binary trees" | secondary | 1997
SRC: OCR, A Level Computer Science H446 specification, section 2.3.1 "Algorithms": tree traversal | standard | 2015
Q: In what order does a post-order traversal visit nodes? | Left subtree, right subtree, then the node.
Q: Which traversal outputs the values of a binary search tree in ascending order? | In-order traversal.
M1#computing-u05-09-q1@1: In a pre-order traversal, when is a node visited? | Before its left and right subtrees | After both of its subtrees | Between its left and right subtrees | Only if it is a leaf | Pre-order visits the node first, then the left subtree, then the right.
M2#computing-u05-09-q2@2: Tree: root A with left B and right C; B has left D. What is the post-order traversal? | D, B, C, A | A, B, D, C | D, B, A, C | A, B, C, D | Post-order: left subtree (D then B), right subtree (C), then the root A.
TF1#computing-u05-09-q3@3: Post-order traversal is suitable for deleting every node in a tree. | true | Each node's children are visited (deleted) before the node itself, so no node is deleted while its children still need it.
M3#computing-u05-09-q4@3: An expression tree has root ×, left child + (with children 2 and 5) and right child 3. What does a post-order traversal produce? | 2 5 + 3 × | × + 2 5 3 | 2 + 5 × 3 | 3 × 5 + 2 | Post-order gives Reverse Polish notation: 2 5 + 3 ×, which evaluates to 21.
SA3#computing-u05-09-q5@2,3: Explain the difference between in-order and pre-order traversal using a small binary search tree, and give a use for each. | For a BST with root 5, left 2 and right 9: in-order (left, node, right) gives 2, 5, 9, the values in ascending order, so it is used to output a BST sorted. Pre-order (node, left, right) gives 5, 2, 9; reinserting values in that order rebuilds the same tree shape, so it is used to copy or save a tree. Both are recursive and O(n). | Defines in-order ; Defines pre-order ; Traces a consistent example correctly ; Gives a use of in-order ; Gives a use of pre-order

## Graphs
LV: A level · Foundation
S: A graph is a set of vertices joined by edges. Graphs model networks of all kinds: roads, social connections, the web and computer networks. This lesson covers graph vocabulary and the main kinds of graph.
O: Define a graph and use the terms vertex, edge, neighbour, degree, path and cycle
O: Distinguish directed from undirected and weighted from unweighted graphs
O: Model real problems as graphs and identify what vertices and edges represent
H: Vertices and edges
P: A **graph** consists of **vertices** (nodes) and **edges** (arcs) connecting pairs of them. Two vertices joined by an edge are **neighbours** (adjacent). The **degree** of a vertex is its number of edges. A **path** is a sequence of vertices joined by edges; a **cycle** is a path that returns to its start. A graph is **connected** if there is a path between every pair of vertices.
P: Unlike trees, graphs may contain cycles, may be disconnected and have no root. A tree is a special case: a connected graph with no cycles.
H: Kinds of graph
- **Undirected**: edges have no direction (a friendship on Facebook).
- **Directed** (digraph): edges go one way (following on social media, one-way streets, links between web pages).
- **Weighted**: each edge carries a value such as distance, time or cost.
- **Unweighted**: edges simply show a connection.
X: Model a train network as a graph.
> Vertices: stations.
> Edges: direct lines between stations, undirected if trains run both ways.
> Weights: journey times in minutes.
> Questions become graph problems: fastest route is a shortest-path problem; "can every station be reached?" asks whether the graph is connected.
K: Graphs model relationships: decide what the vertices and edges represent and whether edges need direction or weights, and many real problems become standard graph algorithms.
!: Drawing a graph's layout as meaningful. Only which vertices are connected (and the weights) matter; positions on the page carry no information.
EV: established | Euler's 1736 solution to the Königsberg bridges problem is regarded as the founding result of graph theory.
EV: established | The handshake lemma states that the sum of the degrees in any graph is twice the number of edges.
T: Graph | A set of vertices connected by edges
T: Directed graph | A graph whose edges have a direction, from one vertex to another
T: Weighted graph | A graph whose edges carry values such as distances or costs
SUM: Graphs are vertices joined by edges; they may be directed or undirected, weighted or unweighted.
SUM: They model roads, social networks, the web and computer networks.
SRC: Euler L., "Solutio problematis ad geometriam situs pertinentis", Commentarii academiae scientiarum Petropolitanae 8, 128–140 | primary | 1741
SRC: Wilson R. J., Introduction to Graph Theory, 5th edition, Pearson | secondary | 2010
Q: What is the degree of a vertex? | The number of edges connected to it.
Q: What is the difference between a directed and an undirected graph? | Directed edges go one way only; undirected edges connect both ways.
M1#computing-u05-10-q1@1: What is a weighted graph? | A graph whose edges carry values such as distances | A graph with more vertices than edges | A graph in which every vertex has the same degree | A graph drawn with thick lines | Weights are values attached to edges, used for costs, distances or times.
M2#computing-u05-10-q2@2: Which situation is best modelled by a directed graph? | Accounts following other accounts on a social network | Two-way roads between towns | Friendships in which both people agree | Cables connecting computers in a LAN | Following isn't necessarily mutual, so each edge has a direction.
TF1#computing-u05-10-q3@3: In any undirected graph, the sum of the degrees of all vertices is even. | true | Each edge adds 1 to the degree of each of its two ends, so the total is twice the number of edges.
M3#computing-u05-10-q4@3: A graph has 5 vertices and is connected with no cycles. How many edges does it have? | 4 | 5 | 10 | 3 | A connected graph with no cycles is a tree, and a tree with n vertices has n − 1 edges.
SA3#computing-u05-10-q5@2,3: Explain how the world wide web could be modelled as a graph and what kind of graph it would be. | Each web page is a vertex and each hyperlink an edge from the page containing it to the page it links to. Links go one way, so the graph is directed; it is usually unweighted, though weights could represent link importance. It contains cycles (pages linking to each other) and may be disconnected. Algorithms such as PageRank and web crawlers' traversals operate on this graph. | Pages as vertices ; Links as edges ; Identifies it as directed with reason ; Comments on weights or cycles ; Names an algorithm or use

## Adjacency matrices and adjacency lists
LV: A level · Application
S: Graphs are stored in programs as adjacency matrices or adjacency lists. This lesson shows how each represents a graph, how to convert between them and how to choose between them.
O: Represent a graph as an adjacency matrix and as an adjacency list
O: Read a graph's structure from either representation
O: Compare the two representations for memory use and speed of operations
H: Adjacency matrix
P: An **adjacency matrix** is a 2D array with one row and one column per vertex. Entry [i][j] is 1 (or the weight) if there is an edge from i to j, and 0 (or infinity for weights) if not. An undirected graph gives a symmetric matrix. Checking whether two vertices are adjacent takes O(1), but the matrix needs V^{2} entries even when there are few edges.
H: Adjacency list
P: An **adjacency list** stores, for each vertex, a list of its neighbours (with weights if needed). In Python this is naturally a dictionary of lists: \`graph = {"A": ["B", "C"], "B": ["A"], "C": ["A"]}\`. It uses memory proportional to V + E and lists a vertex's neighbours quickly, but checking for a specific edge means scanning a list.
X: Undirected graph: A–B, A–C, C–D.
> Matrix (order A, B, C, D): row A is 0 1 1 0; row B is 1 0 0 0; row C is 1 0 0 1; row D is 0 0 1 0.
> The matrix is symmetric about its diagonal because edges go both ways.
> List: A: B, C. B: A. C: A, D. D: C.
> The matrix stores 16 entries; the list stores 6 neighbour entries (2 per edge).
K: Use an adjacency matrix for dense graphs or frequent edge look-ups; use an adjacency list for sparse graphs and traversals, which most real networks are.
H: Choosing
- **Sparse** graphs (few edges, such as road networks or social networks): adjacency lists save a great deal of memory.
- **Dense** graphs (many edges): matrices are compact enough and give O(1) edge checks.
- Traversals (BFS, DFS) run in O(V + E) with lists and O(V^{2}) with matrices.
- Adding a vertex is easy with a list but means resizing a matrix.
!: Forgetting that an undirected edge must appear twice in an adjacency list, once in each vertex's list.
EV: established | Adjacency lists use Θ(V + E) memory and adjacency matrices Θ(V^{2}); the standard textbook recommendation is lists for sparse graphs.
EV: established | Most large real-world networks are sparse: the average number of connections per vertex is tiny compared with the number of vertices.
T: Adjacency matrix | A 2D array recording whether (and with what weight) each pair of vertices is connected
T: Adjacency list | A list, for each vertex, of the vertices it is connected to
T: Sparse graph | A graph with relatively few edges compared with the maximum possible
SUM: A matrix stores V^{2} entries and checks an edge in O(1); a list stores V + E and lists neighbours fast.
SUM: Lists suit sparse graphs; matrices suit dense graphs and frequent edge checks.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, section 20.1 "Representations of graphs" | secondary | 2022
SRC: AQA, A-level Computer Science 7517 specification, section 4.2.2 "Graphs" | standard | 2015
Q: How much memory does an adjacency matrix need for V vertices? | V^{2} entries, whatever the number of edges.
Q: Why is an undirected graph's adjacency matrix symmetric? | Each edge connects both ways, so entry [i][j] equals entry [j][i].
M1#computing-u05-11-q1@1: In an adjacency matrix, what does a 1 at row P, column Q mean? | There is an edge from P to Q | P has degree 1 | Q is the first vertex | P and Q are the same vertex | Each entry records whether an edge connects that pair of vertices.
M2#computing-u05-11-q2@2: A graph has 10,000 vertices and about 30,000 edges. Which representation is more memory-efficient? | Adjacency list | Adjacency matrix | Both use exactly the same memory | Neither can store a graph this large | A matrix needs 100 million entries; a list needs about 10,000 + 60,000 entries for an undirected graph.
TF1#computing-u05-11-q3@2: Checking whether an edge exists between two given vertices is faster in an adjacency matrix than in an adjacency list. | true | The matrix is indexed directly in O(1); the list must be scanned.
M3#computing-u05-11-q4@3: For a graph with 6 vertices and 15 edges (every pair connected), which representation is reasonable and why? | An adjacency matrix: the graph is dense, so few entries are wasted and edge checks are O(1) | An adjacency list, because matrices can't store complete graphs | Neither, because complete graphs can't be stored | An adjacency list, because it always uses less memory | A complete graph uses every matrix entry, so the matrix wastes nothing and is simple and fast.
SA3#computing-u05-11-q5@2,3: Compare adjacency matrices and adjacency lists for storing a social network of 2 million users, each with about 200 friends. | A matrix would need (2 × 10^{6})^{2} = 4 × 10^{12} entries, almost all zero: impossible to store. An adjacency list stores each user's friends: about 2 × 10^{6} × 200 = 4 × 10^{8} entries, which is manageable. Lists also make listing a user's friends and running BFS (O(V + E)) efficient. A matrix's only advantage, O(1) edge checks, can be recovered by storing each friend list as a hash set. So an adjacency list is clearly the right choice for this sparse graph. | Calculates matrix size ; Calculates list size ; Identifies the graph as sparse ; Notes traversal or neighbour listing benefits ; Addresses the edge-check trade-off and concludes

## Hash tables
LV: A level · Application
S: A hash table stores key-value pairs in an array, using a hash function to turn each key into an array index. This gives average constant-time insertion, lookup and deletion, which is why Python dictionaries and sets use hash tables.
O: Explain how a hash function maps keys to positions in a hash table
O: Calculate hash positions using a simple hash function such as key MOD table size
O: Describe the properties of a good hash function and evaluate hash tables' performance
H: From key to index
P: A **hash table** is an array of slots (buckets). A **hash function** takes a key and returns an index: to insert, compute the index and store the pair there; to look up, compute the same index and look there. No search is needed, so operations take O(1) time on average, however many items are stored.
E: index = key MOD table size :: a simple hash function for integer keys
P: For strings, a hash function combines the character codes, for example by summing them (weak) or by a polynomial such as h = h × 31 + code for each character (better). Python's built-in \`hash()\` does this for its dictionaries.
X: Store keys 27, 18, 40 and 9 in a table of size 7 with index = key MOD 7.
> 27 MOD 7 = 6, so 27 goes in slot 6.
> 18 MOD 7 = 4: slot 4. 40 MOD 7 = 5: slot 5.
> 9 MOD 7 = 2: slot 2.
> To find 40, compute 40 MOD 7 = 5 and look in slot 5: one step. A key such as 34 (34 MOD 7 = 6) would collide with 27.
K: A hash function turns a key into an index so items are stored and found directly; performance depends on spreading keys evenly and keeping the table from getting too full.
H: Good hash functions
- **Deterministic**: the same key always gives the same index.
- **Fast** to compute.
- **Uniform**: spreads keys evenly over the table, minimising collisions.
- A **prime** table size helps MOD spread keys with patterns.
- The **load factor** (items ÷ slots) should stay below about 0.7; beyond that, the table is resized and every item rehashed.
!: Using a mutable object, such as a list, as a key. If its contents change, its hash changes and the item can't be found again; this is why Python refuses list keys.
EV: established | Hash tables provide O(1) average-case insertion, deletion and lookup, but O(n) in the worst case when many keys collide.
EV: established | Hashing for data structures is different from cryptographic hashing, which must also make it infeasible to find two inputs with the same hash.
T: Hash table | A data structure that stores key-value pairs in an array at positions computed by a hash function
T: Hash function | A function that maps a key to an index in a hash table
T: Load factor | The number of items stored divided by the number of slots in a hash table
SUM: A hash table computes each key's index with a hash function, giving O(1) average operations.
SUM: Good hash functions are deterministic, fast and uniform; tables are resized as the load factor rises.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 11 "Hash Tables" | secondary | 2022
SRC: Python Software Foundation, The Python Language Reference, section 3.3.1: object.__hash__ | standard | 2024 | https://docs.python.org/3/reference/datamodel.html
Q: What does a hash function do in a hash table? | It converts a key into an index (slot) in the table's array.
Q: What is the load factor of a hash table? | The number of stored items divided by the number of slots.
M1#computing-u05-12-q1@1: What is the average time complexity of looking up a key in a hash table? | O(1) | O(n) | O(log n) | O(n^{2}) | The index is computed directly, so lookup doesn't depend on the number of items, on average.
M2#computing-u05-12-q2@3: Using index = key MOD 11, in which slot is the key 50 stored? | 6 | 4 | 5 | 50 | 50 = 4 × 11 + 6, so the remainder 50 MOD 11 is 6 and 50 goes in slot 6.
TF1#computing-u05-12-q3@1: A hash function must always return the same index for the same key. | true | Otherwise an item stored under one index couldn't be found again.
M3#computing-u05-12-q4@3: A hash function for surnames returns the code of the first letter only. What is the main problem? | Many names share a first letter, so keys cluster in a few slots and collisions are frequent | It is too slow to compute for long names | It returns different indexes for the same name | It can't handle names longer than ten letters | A good hash spreads keys uniformly; first letters are unevenly distributed and give at most 26 slots.
SA3#computing-u05-12-q5@2,3: Explain how a hash table achieves fast lookups and evaluate when its performance can degrade. | Each key is passed through a hash function that computes an array index, so storing and finding a key needs only that calculation and one access, O(1) on average, regardless of size. Performance degrades when many keys hash to the same slot (a poor hash function or adversarial keys), making operations approach O(n), and as the load factor rises, collisions increase. Tables are resized and rehashed when the load factor passes a threshold, which is costly but rare, giving amortised O(1). Hash tables also don't keep keys in order, so ordered queries need another structure. | Explains index computation by the hash function ; States O(1) average ; Explains collisions and poor hash functions ; Explains load factor and resizing ; Notes lack of ordering or worst case O(n)

## Collision resolution
LV: A level · Application
S: A collision happens when two keys hash to the same slot. This lesson covers the two main ways of resolving collisions, open addressing with linear probing and chaining, and how deletion and clustering affect them.
O: Explain what a collision is and why collisions are unavoidable
O: Insert and find keys using linear probing and using chaining
O: Compare open addressing and chaining, including clustering and deletion
H: Why collisions happen
P: A **collision** occurs when two different keys produce the same hash index. Because there are usually far more possible keys than slots, collisions are unavoidable (the pigeonhole principle); even with a good hash function, a table of 365 slots is likely to have a collision once about 23 keys are stored (the birthday paradox).
H: Two strategies
- **Open addressing with linear probing**: if the slot is taken, try the next slot, then the next (wrapping round), until an empty one is found. To search, probe the same sequence until the key or an empty slot is found.
- **Chaining**: each slot holds a linked list (or list) of every pair that hashed there; a collision simply adds to the list.
X: Table size 7, index = key MOD 7, linear probing. Insert 10, 17, 24.
> 10 MOD 7 = 3: slot 3.
> 17 MOD 7 = 3: taken; try slot 4: empty, store 17.
> 24 MOD 7 = 3: slots 3 and 4 taken; slot 5: store 24.
> With chaining instead, slot 3 would hold the list 10 → 17 → 24, and the other slots stay free.
K: Linear probing stores colliding keys in the next free slots of the array; chaining stores them in a list at the same slot. Both keep average operations O(1) if the load factor is controlled.
H: Comparing them
P: Linear probing keeps everything in one array (good cache use) but suffers **primary clustering**: runs of filled slots grow and lengthen every probe. Deleting is awkward, because emptying a slot breaks the probe sequence for later keys, so a "deleted" marker (tombstone) is left instead. Chaining handles high load factors gracefully and deletes easily, but uses extra memory for the lists. **Rehashing** into a larger table restores performance for both.
!: Stopping a linear-probing search at the first slot that doesn't contain the key. The search must continue until the key or an empty slot is found, because the key may have been pushed along.
EV: established | Collisions are unavoidable whenever the set of possible keys is larger than the table, by the pigeonhole principle.
EV: established | Linear probing suffers from primary clustering, which increases the expected probe length as the load factor approaches 1.
T: Collision | When two different keys hash to the same index
T: Linear probing | Resolving a collision by trying successive slots until an empty one is found
T: Chaining | Resolving collisions by storing all items with the same index in a list at that slot
SUM: Collisions are unavoidable; linear probing uses the next free slot, chaining keeps a list per slot.
SUM: Probing suffers clustering and awkward deletion; chaining uses extra memory; rehashing restores speed.
SRC: Knuth D. E., The Art of Computer Programming, Volume 3: Sorting and Searching, 2nd edition, Addison-Wesley, section 6.4 "Hashing" | secondary | 1998
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, sections 11.2 and 11.5 | secondary | 2022
Q: What is a collision in a hash table? | When two different keys hash to the same index.
Q: How does chaining resolve collisions? | Each slot holds a list of all the items whose keys hashed to that slot.
M1#computing-u05-13-q1@1: What does linear probing do when the calculated slot is already occupied? | Tries the next slot, and continues until it finds an empty one | Overwrites the existing item | Discards the new item | Doubles the key and hashes it again | Linear probing searches forward through the table, wrapping round, for a free slot.
M2#computing-u05-13-q2@2: Table size 5, index = key MOD 5, linear probing. Keys 12 then 7 are inserted. Where does 7 go? | Slot 3 | Slot 2 | Slot 7 | Slot 0 | 12 MOD 5 = 2 takes slot 2; 7 MOD 5 = 2 collides, so it goes in the next free slot, 3.
TF1#computing-u05-13-q3@3: In a linear-probing table, simply emptying a deleted item's slot can make other keys impossible to find. | true | A search stops at an empty slot, so keys stored further along the probe sequence would be missed; tombstones prevent this.
M3#computing-u05-13-q4@3: A linear-probing table is 95% full and lookups have become slow. What is the best fix? | Resize to a larger table and rehash every item | Switch to searching the table from the start each time | Remove the hash function and use the key as the index | Increase the key sizes so they spread out | At high load factors clusters make probe sequences long; rehashing into a bigger table lowers the load factor.
SA3#computing-u05-13-q5@2,3: Compare linear probing and chaining as methods of resolving collisions. | Linear probing stores colliding items in the next free slots of the same array: it uses no extra memory and has good cache performance, but clusters of filled slots form and lengthen probes, it degrades badly as the table fills, and deletion needs tombstones. Chaining stores colliding items in a list at their slot: the table never fills, deletion is simple and performance degrades gradually with load, but the lists use extra memory and pointers. Both give O(1) average operations if the load factor is kept moderate by rehashing. | Describes linear probing ; Gives probing's clustering or deletion problem ; Describes chaining ; Gives chaining's memory cost or advantages ; Notes load factor or rehashing for both

## Static and dynamic data structures
LV: A level · Application
S: A static data structure has a fixed size set when it is created; a dynamic one grows and shrinks while the program runs. This lesson compares them and explains how dynamic structures use the heap and how Python's lists grow.
O: Distinguish static from dynamic data structures with examples
O: Explain how dynamic structures allocate memory from the heap and how dynamic arrays grow
O: Evaluate the advantages and disadvantages of each for a given problem
H: Fixed or flexible
P: A **static data structure**, such as a fixed-size array, has its size fixed when it is created. Its memory is reserved in one block, so access is fast and predictable, but space may be wasted if it is too big, or data refused if it is too small.
P: A **dynamic data structure**, such as a linked list, tree or Python list, changes size while the program runs. Memory is requested from the **heap**, a pool of free memory managed by the runtime, as items are added, and released when they are removed (in Python, automatically by **garbage collection**).
H: Comparing them
- Static: no risk of running out mid-operation (once allocated); fast, simple, cache-friendly; but fixed capacity and possible waste.
- Dynamic: uses only the memory needed; no fixed limit; but allocation costs time, pointers use extra memory, and memory can run out (or fragment) at run time.
- Static suits data of known, fixed size (the days of the week, a chessboard); dynamic suits data of unpredictable size (a shopping basket, a social network).
X: How a Python list grows (a dynamic array).
> A list reserves a little more space than it needs.
> Appending uses the spare space at O(1) cost until it runs out.
> Then a bigger block is allocated (proportionally larger, not just one slot more) and every item is copied: an O(n) step.
> Because the copies get rarer as the list grows, the average cost per append is still O(1), described as amortised constant time.
K: Static structures fix their size in advance for speed and predictability; dynamic structures trade some overhead for the ability to grow and shrink as needed.
!: Thinking dynamic structures have no limit. They are limited by available heap memory, and a program that keeps adding without removing can exhaust it.
EV: established | Dynamic arrays that grow geometrically give amortised O(1) appends, as in Python lists and Java's ArrayList.
EV: contested | Garbage collection simplifies programming and prevents many memory bugs but adds unpredictable pauses, so real-time systems often avoid it.
T: Static data structure | A data structure whose size is fixed when it is created
T: Dynamic data structure | A data structure that can grow and shrink while a program runs
T: Heap | A region of memory from which dynamic data structures are allocated at run time
SUM: Static structures have a fixed size and fast, predictable access; dynamic structures grow and shrink using the heap.
SUM: Dynamic arrays grow by copying into larger blocks, giving amortised O(1) appends.
SRC: Python Software Foundation, Design and History FAQ, "How are lists implemented in CPython?" | guidance | 2024 | https://docs.python.org/3/faq/design.html
SRC: OCR, A Level Computer Science H446 specification, section 1.4.2 "Data structures": static and dynamic | standard | 2015
Q: What is the heap in memory management? | A pool of memory from which dynamic data structures are allocated while a program runs.
Q: Give an example of a static and a dynamic data structure. | Static: a fixed-size array. Dynamic: a linked list (or a Python list).
M1#computing-u05-14-q1@1: Which is a dynamic data structure? | A linked list | A fixed-size array of 10 integers | A constant holding the value of pi | A record with three fields of fixed size | A linked list grows and shrinks node by node at run time.
M2#computing-u05-14-q2@2: A program stores the 64 squares of a chessboard. Which kind of structure suits it and why? | Static, because the number of squares never changes | Dynamic, because the board may grow during play | Dynamic, because static arrays can't hold strings | Static, because dynamic structures can't be indexed | The size is known and fixed, so a static 8 × 8 array is simple and efficient.
TF1#computing-u05-14-q3@3: Appending to a Python list occasionally takes O(n) time, but O(1) on average. | true | Occasionally the list must be copied into a larger block, but the copies are rare enough that the amortised cost is constant.
M3#computing-u05-14-q4@3: An embedded heart monitor must never pause unexpectedly. Why might its designers prefer static structures? | Static allocation avoids run-time allocation failures and garbage-collection pauses | Static structures always use less memory | Dynamic structures can't store numbers | Static structures grow automatically when needed | Predictable timing and guaranteed memory matter more than flexibility in safety-critical systems.
SA3#computing-u05-14-q5@2,3: Evaluate the use of static and dynamic data structures for an online shop's basket and for its list of the seven days' delivery slots. | A basket's size is unpredictable and changes as items are added and removed, so a dynamic structure (a list) fits: it uses only the memory needed and has no fixed limit, at the cost of allocation overhead. The delivery slots are always seven days, so a static array of size 7 fits: simple, fast and predictable, with no wasted or missing space. Using a static array for the basket would either waste memory or refuse items; a dynamic structure for the slots would add overhead for no benefit. | Chooses dynamic for the basket with reason ; Chooses static for the slots with reason ; Gives a dynamic disadvantage ; Gives a static disadvantage ; Explains why the alternative is worse

## Comparing data structures
LV: A level · Evaluation
S: Choosing the right data structure is often what makes a program fast. This lesson brings together the structures in this school, compares the costs of their operations and practises justifying choices.
O: Compare arrays, linked lists, stacks, queues, trees, hash tables and graphs by the cost of their main operations
O: Choose a suitable data structure for a scenario and justify the choice by its operations
O: Evaluate trade-offs between speed, memory, ordering and simplicity
H: Operation costs
- **Array**: access by index O(1); search O(n), or O(log n) if sorted; insert in middle O(n).
- **Linked list**: access O(n); insert or delete at a known node O(1).
- **Stack / queue**: push, pop, enqueue, dequeue O(1).
- **Balanced BST**: search, insert, delete O(log n); in-order gives sorted output.
- **Hash table**: insert, lookup, delete O(1) on average; no ordering.
- **Heap (priority queue)**: insert and remove highest priority O(log n).
P: Start from the operations the program needs most: lookups by key, ordered output, first-come-first-served, most-recent-first, or relationships between items. Then pick the structure that makes those operations cheapest.
X: Choose structures for a ride-hailing app.
> Waiting ride requests served in order: a queue.
> Drivers looked up by driver ID: a hash table.
> Urgent requests served first: a priority queue (heap).
> The road network for routing: a weighted graph stored as an adjacency list, searched with Dijkstra or A* search.
K: Match the structure to the dominant operations: hash tables for lookup by key, balanced trees for ordered data, stacks and queues for processing order, graphs for relationships.
H: Trade-offs
P: Faster operations often cost memory (hash tables, adjacency matrices) or complexity (self-balancing trees). Hash tables beat trees for single lookups but can't answer "all keys between 100 and 200" efficiently; trees can. For small data, the simplest structure is often fastest because constant factors dominate.
!: Choosing a structure for one operation and ignoring the others. A hash table gives fast lookups, but if the program must also list items in order, a balanced tree may be better overall.
EV: established | The average and worst-case costs of operations on standard data structures are proved results in algorithms textbooks.
EV: contested | Real performance also depends on memory layout and caching, so engineers benchmark when the choice matters.
T: Operation cost | The time complexity of an operation on a data structure, such as O(1) lookup
T: Range query | A request for all items whose keys lie between two values
T: Trade-off | Gaining one benefit, such as speed, at the cost of another, such as memory
SUM: Each structure makes some operations cheap and others expensive.
SUM: Choose by the dominant operations, then weigh memory, ordering and simplicity.
SRC: Sedgewick R. and Wayne K., Algorithms, 4th edition, Addison-Wesley, chapter 3 "Searching" | secondary | 2011
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, part III "Data Structures" | secondary | 2022
Q: Which data structure supports efficient range queries such as all keys between 10 and 20? | A balanced binary search tree.
Q: Which structure would you use to process jobs in order of urgency? | A priority queue, usually implemented as a binary heap.
M1#computing-u05-15-q1@1: Which structure gives O(1) average lookup by key but keeps no order? | Hash table | Balanced binary search tree | Linked list | Sorted array | Hashing gives direct access to a slot, but the slots aren't in key order.
M2#computing-u05-15-q2@2: A browser needs to return to the previous page each time the back button is pressed. Which structure fits? | A stack | A queue | A hash table | A binary search tree | The most recently visited page is returned to first, which is last in, first out.
MATCH2#computing-u05-15-q3@2: Match each requirement to the most suitable structure. | Undo the last action = stack ; Serve customers in arrival order = queue ; Find a product by its barcode = hash table ; List words in alphabetical order as they are added = binary search tree | Each structure makes the required operation cheapest.
M3#computing-u05-15-q4@3: A leaderboard must add new scores frequently and often show the top 10 in order. Which structure is most suitable? | A balanced binary search tree or heap keyed on score | An unsorted linked list | A hash table keyed on player name only | A fixed array re-sorted with bubble sort after every insert | A balanced tree keeps scores ordered with O(log n) inserts; a hash table can't give the top scores, and re-sorting each time is wasteful.
SA3#computing-u05-15-q5@2,3: A library system must find books by ISBN, list books by title in alphabetical order, and handle reservations in the order they were made. Choose and justify data structures. | Find by ISBN: a hash table keyed on ISBN, giving O(1) average lookups. Alphabetical listing: a balanced binary search tree keyed on title, kept ordered as books are added, with in-order traversal producing the list (O(log n) inserts). Reservations: a queue for each book, so the earliest reservation is served first (O(1) operations). Using one structure for everything would make at least one operation slow: a hash table can't list in order, a tree is slower for exact lookups. | Hash table for ISBN with reason ; Ordered structure for titles with reason ; Queue for reservations with reason ; States operation costs ; Explains why one structure wouldn't suffice
`;
