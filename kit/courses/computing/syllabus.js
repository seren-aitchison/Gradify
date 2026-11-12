// TechGradify · ForgeLab Computer Science: the full curriculum, 12 schools, mapped to the GCSE (AQA 8525, OCR J277)
// and A level (AQA 7517, OCR H446) Computer Science specifications and the first-year core of the ACM/IEEE-CS/AAAI
// Computer Science Curricula 2023 (CS2023). Each topic is taught as one lesson, grouped into modules ("> " lines) and
// stages (TRACKS). Lesson ids are permanent (ids.js, written by node scripts/new-course.mjs lock computing): never
// renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Computational Thinking and Problem Solving
> Thinking computationally
* What is computer science?
* Abstraction
* Decomposition
* Algorithmic thinking
* Pattern recognition and generalisation
* Thinking ahead and thinking procedurally
> Representing algorithms
* Pseudocode
* Flowcharts
* Trace tables
> Logic
* Boolean logic
* Logic gates and truth tables
* Simplifying Boolean expressions
> Beyond the sequential
* Thinking concurrently
* The limits of computation
2. Python Programming Fundamentals
> Getting started
* Programs and the Python interpreter
* Variables and assignment
* Data types and casting
* Input and output
* Arithmetic operators
> Control flow
* Comparison and logical operators
* Selection with if, elif and else
* Definite iteration: for loops
* Indefinite iteration: while loops
* Nested selection and iteration
> Text and functions
* Strings: indexing, slicing and methods
* Defining and calling functions
* Parameters, arguments and return values
* Scope: local and global variables
* Using modules: random and math
3. Data Structures, Files and Robust Code in Python
> Built-in data structures
* Lists
* List operations and methods
* Two-dimensional lists
* Tuples
* Dictionaries
* Sets
* Choosing a Python data structure
> Files
* Reading text files
* Writing and appending to files
* CSV files
> Robust programs
* Input validation and defensive design
* Exception handling with try and except
* Types of error: syntax, runtime and logic
* Testing: normal, boundary and erroneous data
* Unit testing and test plans
* Debugging strategies
* Code quality and maintainability
4. Algorithms
> Searching
* Linear search
* Binary search
> Sorting
* Bubble sort
* Insertion sort
* Merge sort
* Quicksort
> Analysing algorithms
* Measuring efficiency
* Big O notation
* Comparing algorithm complexity
* Time and space trade-offs
> Recursion
* Recursion
* Recursive and iterative solutions
> Graph algorithms
* Breadth-first and depth-first traversal
* Dijkstra's shortest path algorithm
* A* search
> Problem-solving strategies
* Divide and conquer
* Greedy algorithms
* Dynamic programming
* Backtracking
5. Data Structures
> Linear structures
* Abstract data types
* Arrays and records
* Stacks
* Queues
* Circular and priority queues
* Linked lists
> Trees and graphs
* Trees
* Binary search trees
* Tree traversal
* Graphs
* Adjacency matrices and adjacency lists
> Hashing
* Hash tables
* Collision resolution
> Design choices
* Static and dynamic data structures
* Comparing data structures
6. Data Representation
> Number systems
* Binary and denary
* Hexadecimal
* Binary arithmetic and overflow
* Binary shifts
* Two's complement
* Fixed-point and floating-point numbers
> Text, images and sound
* Units of data
* Character sets: ASCII and Unicode
* Bitmap images
* Vector graphics
* Sound
> Compression, encryption and errors
* Lossy and lossless compression
* Run-length encoding
* Huffman coding
* Ciphers: Caesar and Vernam
* Error detection: parity and check digits
7. Computer Architecture
> The processor
* The von Neumann architecture
* The fetch-decode-execute cycle
* Registers and buses
* Factors affecting processor performance
* RISC, CISC and parallel processors
> Memory and storage
* RAM and ROM
* Cache and virtual memory
* Secondary storage
> Low-level programming
* Machine code and assembly language
* Addressing modes
* The Little Man Computer
> Hardware and circuits
* Embedded systems
* Input and output devices
* Adders and flip-flops
8. Operating Systems and Software
> Systems software
* The role of the operating system
* Memory management: paging and segmentation
* Process scheduling
* Interrupts
* File systems
* Utility software
> Translators and languages
* High-level and low-level languages
* Compilers, interpreters and assemblers
* Stages of compilation
* Linkers, loaders and libraries
> Kinds of software
* Application software
* Open source and proprietary software
* Virtual machines
9. Networks and the Internet
> Network fundamentals
* Types of network: LAN and WAN
* Network topologies
* Network hardware
* Wired and wireless connections
* Client-server and peer-to-peer
> Protocols
* Protocols and standards
* The TCP/IP stack
* Packet switching
* IP addresses and DNS
* HTTP, HTTPS and other application protocols
> The web
* How the web works
* HTML, CSS and JavaScript
* Client-side and server-side processing
* Search engines and PageRank
10. Databases and SQL
> Relational databases
* Data, information and databases
* Flat-file and relational databases
* Primary and foreign keys
* Entity relationship diagrams
* Normalisation
> SQL
* SELECT queries
* Filtering and sorting results
* Joining tables
* Aggregate functions and grouping
* INSERT, UPDATE and DELETE
* Creating tables
> Managing data
* Transactions and ACID
* Referential integrity
* Big data
11. Software Engineering and Object-Oriented Programming
> Building software
* The software development life cycle
* Waterfall and agile methods
* Requirements and analysis
* Designing software
* Version control with Git
* Testing strategies
* Maintenance and documentation
> Object-oriented programming
* Classes and objects
* Attributes and methods
* Encapsulation
* Inheritance
* Polymorphism
* Composition and aggregation
* Programming paradigms
12. Security, AI and Society
> Cyber security
* Malware
* Social engineering and phishing
* Network attacks: denial of service and SQL injection
* Defences: firewalls, authentication and encryption
* Penetration testing and secure design
> Artificial intelligence
* What is artificial intelligence?
* Machine learning
* Neural networks
* Bias and fairness in AI
> Law and ethics
* The Computer Misuse Act 1990
* UK GDPR and the Data Protection Act 2018
* Copyright and software licences
* The environmental impact of computing
* Ethical issues in computing
`;

// stages on the map; ForgeLab's colours run from coral through amber to cyan
export const TRACKS = [
  { name: "Stage 1 · Thinking and programming", units: [1, 2, 3], from: "#ff5a4d", to: "#f59e0b" },
  { name: "Stage 2 · Algorithms and data", units: [4, 5, 6], from: "#f97316", to: "#eab308" },
  { name: "Stage 3 · Systems", units: [7, 8, 9], from: "#fb7185", to: "#a78bfa" },
  { name: "Stage 4 · Data, software and society", units: [10, 11, 12], from: "#f472b6", to: "#22d3ee" },
];

export const PATHS = [
  { id: "gcse", name: "GCSE Computer Science", sub: "The core of AQA and OCR GCSE: computational thinking, Python, searching and sorting, data representation, architecture, networks, security and the law.", units: [1, 2, 3, 4, 6, 7, 9, 12] },
  { id: "alevel", name: "A level Computer Science", sub: "The whole A level: all of GCSE plus data structures, Big O, graph algorithms, operating systems, databases, OOP and the limits of computation.", units: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { id: "year1", name: "University year 1", sub: "The first-year core of a computer science degree, after ACM CS2023: programming, algorithms and complexity, data structures, systems, databases and software engineering.", units: [2, 3, 4, 5, 8, 10, 11] },
  { id: "programmer", name: "Learn to program", sub: "From your first Python program to tested, object-oriented code that reads files and uses the right data structures.", units: [1, 2, 3, 11] },
  { id: "systems", name: "How computers work", sub: "From bits and logic gates to processors, operating systems and the internet.", units: [6, 7, 8, 9] },
  { id: "society", name: "Computing and society", sub: "Security, artificial intelligence, data protection and the ethics of computing.", units: [12, 10, 9] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "Abstraction, decomposition, algorithms, pseudocode, flowcharts, trace tables, Boolean logic and the limits of what computers can do.",
  2: "Your first Python programs: variables, types, input and output, operators, selection, loops, strings and functions.",
  3: "Lists, tuples, dictionaries and sets; reading and writing files; validation, exceptions, testing and debugging.",
  4: "Searching and sorting, Big O, recursion, graph algorithms and the strategies behind efficient solutions.",
  5: "Abstract data types: stacks, queues, linked lists, trees, graphs and hash tables, and when to use each.",
  6: "Binary, hexadecimal, two's complement and floating point; how text, images and sound become bits; compression and error checks.",
  7: "The processor and the fetch-decode-execute cycle, memory and storage, assembly language and the circuits underneath.",
  8: "What an operating system does, how programs are translated and run, and the kinds of software around them.",
  9: "LANs and WANs, protocols and the TCP/IP stack, packet switching, addressing, DNS and how the web works.",
  10: "Relational databases, keys, ER diagrams and normalisation, SQL queries, transactions and big data.",
  11: "The development life cycle, agile, version control and testing; classes, objects, inheritance and polymorphism.",
  12: "Cyber threats and defences, how AI and machine learning work, and the law and ethics of computing in the UK.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
