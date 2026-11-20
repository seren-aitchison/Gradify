// TechGradify's Computer Science concept graph: what each module builds on (kit/learning/concepts.js reads it). Keys
// and values are "<school id>/<module>". A prerequisite is listed only where a learner genuinely needs it to follow
// the module, not wherever it's mentioned. Written from the lessons' content; like the lessons, it awaits review by a
// computer science teacher or lecturer. The chapter links (kit/learning/chapter-map.js) must agree with it: every
// school a module here builds on is one its school builds on there (tests/concepts.test.mjs checks this).
const THINK = "u01/Thinking computationally", ALGO = "u01/Representing algorithms", LOGIC = "u01/Logic";
const START = "u02/Getting started", FLOW = "u02/Control flow", FUNC = "u02/Text and functions";
const DS = "u03/Built-in data structures", FILES = "u03/Files", ROBUST = "u03/Robust programs";
const SEARCH = "u04/Searching", SORT = "u04/Sorting", BIGO = "u04/Analysing algorithms", REC = "u04/Recursion";
const LIN = "u05/Linear structures", TREES = "u05/Trees and graphs", HASH = "u05/Hashing";
const NUM = "u06/Number systems", MEDIA = "u06/Text, images and sound";
const CPU = "u07/The processor", MEM = "u07/Memory and storage", LOW = "u07/Low-level programming";
const OS = "u08/Systems software";
const NET = "u09/Network fundamentals", PROTO = "u09/Protocols";
const RDB = "u10/Relational databases", SQL = "u10/SQL", DATA = "u10/Managing data";
const SEC = "u12/Cyber security";

export const CONCEPTS = {
  modules: {
    // School 1: computational thinking
    [ALGO]: [THINK],
    "u01/Beyond the sequential": [ALGO],
    // School 2: Python
    [START]: [ALGO],
    [FLOW]: [START, LOGIC],
    [FUNC]: [FLOW],
    // School 3: data structures, files and robust code
    [DS]: [FUNC],
    [FILES]: [DS],
    [ROBUST]: [FUNC],
    // School 4: algorithms
    [SEARCH]: [DS],
    [SORT]: [DS],
    [BIGO]: [SEARCH, SORT],
    [REC]: [FUNC],
    "u04/Graph algorithms": [BIGO, DS],
    "u04/Problem-solving strategies": [REC, SORT],
    // School 5: data structures
    [LIN]: [DS],
    [TREES]: [LIN, REC],
    [HASH]: [LIN],
    "u05/Design choices": [TREES, HASH, BIGO],
    // School 6: data representation
    [MEDIA]: [NUM],
    "u06/Compression, encryption and errors": [MEDIA],
    // School 7: architecture
    [CPU]: [NUM],
    [MEM]: [CPU],
    [LOW]: [CPU],
    "u07/Hardware and circuits": [LOGIC, NUM],
    // School 8: operating systems and software
    [OS]: [MEM],
    "u08/Translators and languages": [LOW],
    "u08/Kinds of software": [OS],
    // School 9: networks
    [NET]: [MEDIA, OS],
    [PROTO]: [NET, NUM],
    "u09/The web": [PROTO],
    // School 10: databases
    [RDB]: [FILES],
    [SQL]: [RDB],
    [DATA]: [SQL],
    // School 11: software engineering and OOP
    "u11/Building software": [ROBUST],
    "u11/Object-oriented programming": [DS, LIN],
    // School 12: security, AI and society
    [SEC]: [PROTO, SQL, "u06/Compression, encryption and errors"],
    "u12/Artificial intelligence": [DATA],
    "u12/Law and ethics": [SEC, DATA],
  },
};
