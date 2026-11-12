// TechGradify · ForgeLab Data Structures, Files and Robust Code in Python (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Lists
LV: GCSE · Foundation
S: A list is an ordered, changeable collection of items held under one name. This lesson covers creating lists, indexing, changing items, looping over a list and how Python lists relate to the arrays of exam pseudocode.
O: Create lists and access, change and loop over their items by index
O: Explain how a Python list differs from a fixed-size array
O: Trace code that changes a list and predict its contents
H: Creating and indexing lists
P: A **list** stores several values in order: \`marks = [56, 72, 81]\`. Items are indexed from 0, so \`marks[0]\` is 56 and \`marks[-1]\` is 81. \`len(marks)\` gives 3. Lists are **mutable**: \`marks[1] = 75\` replaces the second item in place. An index outside the list, such as \`marks[3]\`, raises an IndexError.
P: A list can hold any types, even a mixture, but in practice a list usually holds items of one kind, such as all the marks in a class. \`[]\` is an empty list.
H: Lists and arrays
- An **array** in exam pseudocode has a fixed size set when it is declared, and holds items of one type.
- A Python list is **dynamic**: it grows and shrinks as items are added or removed.
- Both give fast access to any item by its index.
- Python also has an \`array\` module and the NumPy library for fixed-type arrays of numbers.
X: Trace \`nums = [3, 8, 5]\`, then \`for i in range(len(nums)): nums[i] = nums[i] * 2\`, then \`print(nums)\`.
> \`len(nums)\` is 3, so i takes 0, 1 and 2.
> i = 0: nums[0] becomes 6. i = 1: nums[1] becomes 16. i = 2: nums[2] becomes 10.
> Output: \`[6, 16, 10]\`.
> Looping over indexes is needed here because the items are being changed; to only read them, \`for n in nums:\` is simpler.
K: A list is an ordered, mutable sequence indexed from 0; use a loop over range(len(list)) to change items, and a loop over the list itself to read them.
!: Writing \`for n in nums: n = n * 2\` and expecting the list to change. n is a separate name for each item; reassigning it doesn't alter the list.
EV: established | Python lists are implemented as dynamic arrays of references, so indexing takes constant time.
EV: established | Exam boards accept Python lists as the implementation of the arrays in their pseudocode, while expecting students to know arrays have fixed size.
T: List | An ordered, mutable collection of items in Python, accessed by index
T: Array | A fixed-size collection of items of the same type, accessed by index
T: Mutable | Able to be changed after it is created; lists are mutable
SUM: Lists hold ordered items indexed from 0 and can be changed in place.
SUM: Arrays in pseudocode are fixed in size and type; Python lists are dynamic.
SRC: Python Software Foundation, The Python Tutorial, section 3.1.3 "Lists" | guidance | 2024 | https://docs.python.org/3/tutorial/introduction.html
SRC: AQA, GCSE Computer Science 8525 specification, section 3.2.6 "Data structures" | standard | 2020
Q: What is the index of the first item in a Python list? | 0.
Q: How does a Python list differ from an array in exam pseudocode? | A list is dynamic and can hold mixed types; an array has a fixed size and one type.
M1#computing-u03-01-q1@1: For \`pets = ["cat", "dog", "fish"]\`, what is \`pets[1]\`? | "dog" | "cat" | "fish" | An IndexError | Indexing starts at 0, so index 1 is the second item.
M2#computing-u03-01-q2@3: What does \`x = [1, 2, 3]\`, then \`x[0] = x[2]\`, then \`x[2] = 0\` leave in x? | [3, 2, 0] | [1, 2, 0] | [3, 2, 3] | [0, 2, 3] | x[0] takes the value 3, then x[2] is set to 0, giving [3, 2, 0].
TF1#computing-u03-01-q3@2: The loop \`for n in scores: n = 0\` sets every item of scores to 0. | false | n is a separate name bound to each item in turn; reassigning it doesn't change the list. Use an index loop.
M3#computing-u03-01-q4@2: Which is the main advantage of a dynamic list over a fixed-size array? | It can grow or shrink as items are added or removed | It always uses less memory than an array | Its items can only be accessed in order | It can never raise an IndexError | Dynamic lists resize as needed; fixed arrays must be declared large enough in advance.
SA3#computing-u03-01-q5@2,3: Explain the difference between a fixed-size array and a Python list, and when a fixed size might be preferable. | An array is declared with a fixed number of elements of one type, stored together in memory, so its size can't change. A Python list is dynamic: it resizes automatically and can hold any type. Fixed size is preferable when the amount of data is known and memory is limited, as in embedded systems, or for large numeric data, where typed arrays (such as NumPy) use far less memory and are faster. | Fixed size and one type for arrays ; Dynamic size for lists ; Mentions mixed types or resizing ; Gives a case for fixed size ; Justifies with memory or speed

## List operations and methods
LV: GCSE · Application
S: Python lists come with methods for adding, removing, searching and sorting items. This lesson covers the most useful ones, list slicing, and the difference between methods that change a list and functions that return a new one.
O: Use append(), insert(), remove(), pop(), index(), count() and sort() on lists
O: Distinguish methods that change a list in place from functions that return new values
O: Choose and combine list operations to solve a problem
H: Adding and removing
- \`lst.append(x)\`: add x to the end.
- \`lst.insert(i, x)\`: insert x before index i.
- \`lst.remove(x)\`: remove the first x (ValueError if absent).
- \`lst.pop()\`: remove and return the last item; \`lst.pop(i)\` removes index i.
- \`del lst[i]\`: delete the item at index i.
H: Searching and sorting
P: \`x in lst\` tests membership; \`lst.index(x)\` gives the position of the first x; \`lst.count(x)\` counts occurrences; \`len\`, \`sum\`, \`min\` and \`max\` work on lists of numbers. \`lst.sort()\` sorts **in place** and returns None, while \`sorted(lst)\` returns a **new** sorted list and leaves the original alone. Add \`reverse=True\` for descending order.
P: Slicing works as with strings: \`lst[1:3]\` is a new list of items 1 and 2, and \`lst[:]\` copies the whole list. \`+\` joins lists and \`*\` repeats them.
X: Trace \`q = [4, 1, 7]\`, then \`q.append(2)\`, \`q.insert(0, 9)\`, \`q.remove(1)\`, \`top = q.pop()\` and \`q.sort()\`.
> After append: [4, 1, 7, 2]. After insert: [9, 4, 1, 7, 2].
> After remove(1): [9, 4, 7, 2]; the value 1 is removed, not index 1.
> pop() removes and returns the last item, so top = 2 and q = [9, 4, 7].
> sort() gives [4, 7, 9].
K: Methods such as append, sort and remove change the list in place and return None; functions such as sorted and slices return new lists.
!: Writing \`lst = lst.sort()\`. sort returns None, so the list is lost; write \`lst.sort()\` or \`lst = sorted(lst)\`.
EV: established | Python's sort uses Timsort, a stable hybrid of merge sort and insertion sort, with O(n log n) worst-case time.
EV: established | Appending to the end of a Python list is fast (amortised constant time), but inserting or removing at the front takes time proportional to the list's length.
T: Method | A function that belongs to an object and is called with dot notation, such as lst.append(x)
T: In place | Changing the existing object rather than creating a new one
T: Stable sort | A sort that keeps items with equal keys in their original relative order
SUM: append, insert, remove, pop and del change a list; in, index and count search it.
SUM: sort() changes a list in place and returns None; sorted() returns a new list.
SRC: Python Software Foundation, The Python Tutorial, section 5.1 "More on Lists" | guidance | 2024 | https://docs.python.org/3/tutorial/datastructures.html
SRC: Python Software Foundation, Sorting Techniques (HOWTO) | guidance | 2024 | https://docs.python.org/3/howto/sorting.html
Q: What is the difference between lst.sort() and sorted(lst)? | lst.sort() sorts the list in place and returns None; sorted(lst) returns a new sorted list and leaves lst unchanged.
Q: What does lst.pop() do? | Removes the last item from the list and returns it.
M1#computing-u03-02-q1@1: Which method adds an item to the end of a list? | \`append()\` | \`insert()\` | \`add()\` | \`extend_end()\` | append adds one item at the end. insert needs a position; lists have no add method.
M2#computing-u03-02-q2@2: What is \`nums\` after \`nums = [5, 3, 5, 1]\` and \`nums.remove(5)\`? | [3, 5, 1] | [3, 1] | [5, 3, 1] | [5, 5, 1] | remove deletes only the first occurrence of the value 5.
TF1#computing-u03-02-q3@3: \`scores = scores.sort()\` leaves scores holding the sorted list. | false | sort sorts in place and returns None, so scores becomes None.
M3#computing-u03-02-q4@3: A program must show the top three scores without changing the original order of the list \`scores\`. Which expression does this? | \`sorted(scores, reverse=True)[:3]\` | \`scores.sort(reverse=True)[:3]\` | \`scores[:3]\` | \`scores.pop(3)\` | sorted returns a new descending list, which is sliced; sort() would change the original and return None.
SA3#computing-u03-02-q5@2,3: Write code that removes every negative number from a list called readings and explain why removing items inside a for loop over the same list is risky. | \`readings = [r for r in readings if r >= 0]\`, or build a new list with a loop and append. Removing items while looping over the same list shifts the remaining items left, so the loop skips the item after each removal: [−1, −2, 3] would leave −2 in place. Building a new list, or looping over a copy (readings[:]), avoids this. | Correct method that keeps non-negative values ; Builds a new list or loops over a copy ; Explains items shift after removal ; Explains items are skipped ; Gives an example of the error

## Two-dimensional lists
LV: GCSE · Application
S: A two-dimensional list is a list of lists, used to store a table or grid such as a game board, a seating plan or a spreadsheet. This lesson covers creating, indexing and looping over 2D lists.
O: Create a two-dimensional list and access items with two indexes
O: Use nested loops to process every row and column of a 2D list
O: Explain why a 2D list must be created carefully to avoid shared rows
H: Lists of lists
P: A **two-dimensional list** stores rows, each row itself a list: \`grid = [[1, 2, 3], [4, 5, 6]]\` has 2 rows and 3 columns. \`grid[r][c]\` gives row r, column c: \`grid[1][0]\` is 4. \`len(grid)\` is the number of rows and \`len(grid[0])\` the number of columns. 2D arrays in exam pseudocode work the same way.
P: Whether the first index is the row or the column is a convention; row first is usual, and an exam question will state which it uses.
X: Total each row of \`sales = [[3, 5, 2], [4, 0, 6]]\` (two shops, three days).
> \`for row in sales:\` takes [3, 5, 2] first; \`sum(row)\` is 10.
> Then [4, 0, 6]; sum is 10.
> To total each day (column), loop over columns: \`for c in range(3):\` add \`sales[r][c]\` for every r.
> Day totals: 7, 5 and 8.
K: In grid[r][c], the first index picks the row (an inner list) and the second picks the item in it; process a grid with nested loops over rows and then columns.
H: Creating grids safely
- Use a comprehension: \`board = [[0] * 3 for _ in range(3)]\` creates three separate rows.
- \`[[0] * 3] * 3\` creates three references to the **same** row: changing \`board[0][0]\` changes every row.
- Print a grid row by row: \`for row in board: print(row)\`.
!: Swapping the indexes. \`grid[c][r]\` reads the wrong cell or raises an IndexError when the grid isn't square.
EV: established | Multiplying a list of lists copies references, not the inner lists; the Python FAQ documents this as a common pitfall.
EV: established | Two-dimensional arrays are the standard way to represent grids, matrices and images in programs.
T: Two-dimensional list | A list whose items are lists, representing rows and columns
T: Row-major order | Storing or visiting a table row by row
T: List comprehension | A compact expression that builds a list, such as [x * 2 for x in nums]
SUM: A 2D list is a list of rows; grid[r][c] gives row r, column c.
SUM: Use nested loops to visit every cell, and a comprehension to create independent rows.
SRC: Python Software Foundation, Programming FAQ, "How do I create a multidimensional list?" | guidance | 2024 | https://docs.python.org/3/faq/programming.html
SRC: Python Software Foundation, The Python Tutorial, section 5.1.4 "Nested List Comprehensions" | guidance | 2024 | https://docs.python.org/3/tutorial/datastructures.html
Q: For grid = [[1, 2], [3, 4]], what is grid[1][0]? | 3: row 1 is [3, 4] and its item 0 is 3.
Q: Why is [[0] * 3] * 3 a bad way to create a grid? | It creates three references to the same row, so changing one row changes them all.
M1#computing-u03-03-q1@1: For \`t = [[7, 8, 9], [1, 2, 3]]\`, what is \`t[0][2]\`? | 9 | 1 | 8 | 3 | Row 0 is [7, 8, 9] and index 2 in that row is 9.
M2#computing-u03-03-q2@2: How many rows and columns has \`m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]\`? | 3 rows, 4 columns | 4 rows, 3 columns | 12 rows, 1 column | 3 rows, 3 columns | len(m) is 3 rows; each row has 4 items, so 4 columns.
TF1#computing-u03-03-q3@3: After \`b = [[0] * 2] * 2\` and \`b[0][0] = 5\`, the list b is [[5, 0], [5, 0]]. | true | Both rows are the same list object, so the change appears in both.
M3#computing-u03-03-q4@3: A 10 × 10 game board is stored as board[row][col]. Which code counts the cells containing "X"? | Nested loops over every row and every item in it, adding 1 for each "X" | \`board.count("X")\` | \`len(board) * len(board[0])\` | \`board[10][10] == "X"\` | board.count looks only for rows equal to "X"; each row must be searched, for example with sum(row.count("X") for row in board).
SA3#computing-u03-03-q5@2,3: Explain how you would store and process a cinema's seating plan of 8 rows of 12 seats, recording whether each seat is booked. | Store a 2D list of Booleans: \`seats = [[False] * 12 for _ in range(8)]\`, made with a comprehension so each row is separate. seats[r][c] = True books row r, seat c. Count free seats with nested loops (for row in seats, for s in row, add 1 if not s). Check a seat is free before booking and validate that r is 0 to 7 and c is 0 to 11. | 2D structure of 8 rows by 12 columns ; Suitable type such as Boolean ; Creates rows independently ; Uses nested loops to process ; Validates indexes or checks before booking

## Tuples
LV: GCSE · Application
S: A tuple is an ordered, immutable collection: once created, its items can't be changed. This lesson covers creating and unpacking tuples, returning several values from functions and when a tuple is a better choice than a list.
O: Create and index tuples and unpack them into variables
O: Explain how tuples differ from lists and why immutability is useful
O: Choose between a tuple and a list for a given purpose
H: Creating and using tuples
P: A **tuple** is written with round brackets: \`point = (3, 4)\`. It is indexed and sliced like a list (\`point[0]\` is 3) and can be looped over, but it is **immutable**: \`point[0] = 5\` raises a TypeError, and tuples have no append or remove. A one-item tuple needs a comma: \`(5,)\`.
P: **Unpacking** assigns a tuple's items to several names at once: \`x, y = point\`. The same mechanism lets a function return several values (\`return total, mean\`) and swaps two variables in one line: \`a, b = b, a\`.
H: Why use a tuple?
- It protects data that shouldn't change, such as coordinates or RGB colours.
- It can be a dictionary key or set member, because it is immutable (if its items are too).
- It signals to other programmers that the collection is a fixed record, not a growing list.
- It uses slightly less memory than a list.
X: Trace \`def min_max(v): return min(v), max(v)\`, then \`lo, hi = min_max([4, 9, 2])\`, then \`lo, hi = hi, lo\`.
> min_max returns the tuple (2, 9).
> Unpacking gives lo = 2 and hi = 9.
> The swap builds (9, 2) on the right first, then unpacks it: lo = 9, hi = 2.
> No temporary variable was needed.
K: Use a tuple for a fixed group of related values (a record) and a list for a collection that grows, shrinks or changes.
!: Thinking a tuple holding a list is fully frozen. In \`t = ([1, 2], 3)\`, \`t[0].append(4)\` works, because the list inside is still mutable.
EV: established | Tuples are hashable when all their items are hashable, which is why they can be used as dictionary keys and lists can't.
EV: contested | Whether to use tuples for records or named alternatives such as dataclasses is a style choice; named fields are clearer as records grow.
T: Tuple | An ordered, immutable collection of items in Python, written in round brackets
T: Unpacking | Assigning the items of a sequence to several variables at once, as in x, y = point
T: Record | A group of related fields describing one thing, such as a name, age and form
SUM: Tuples are ordered and immutable; they are indexed and unpacked like lists but can't be changed.
SUM: Use them for fixed records, multiple return values and dictionary keys.
SRC: Python Software Foundation, The Python Tutorial, section 5.3 "Tuples and Sequences" | guidance | 2024 | https://docs.python.org/3/tutorial/datastructures.html
SRC: Python Software Foundation, The Python Standard Library, "dataclasses: Data Classes" | standard | 2024 | https://docs.python.org/3/library/dataclasses.html
Q: What is the main difference between a tuple and a list? | A tuple is immutable (it can't be changed after creation); a list is mutable.
Q: How do you swap a and b in one line in Python? | a, b = b, a, which builds a tuple on the right and unpacks it.
M1#computing-u03-04-q1@1: What happens when you run \`t = (1, 2, 3)\` and then \`t[0] = 9\`? | A TypeError, because tuples are immutable | t becomes (9, 2, 3) | t becomes (9, 1, 2, 3) | A new tuple (9,) is created | Tuples can't be changed in place; assigning to an item raises an error.
M2#computing-u03-04-q2@2: After \`name, age = ("Ola", 16)\`, what is age? | 16 | "Ola" | ("Ola", 16) | A TypeError | Unpacking assigns the items in order: name gets "Ola" and age gets 16.
TF1#computing-u03-04-q3@1: \`(5)\` creates a tuple containing one item. | false | The brackets are just grouping; \`(5)\` is the integer 5. A one-item tuple needs a comma: \`(5,)\`.
M3#computing-u03-04-q4@3: Which is the best reason to store map coordinates as tuples rather than lists? | They are fixed records and, being immutable, can be dictionary keys | Tuples can be appended to more quickly than lists | Lists can't hold numbers with decimal places | Tuples are always sorted automatically | Immutability protects the values and makes them hashable, so \`visited[(3, 4)] = True\` works; a list can't be a key.
SA3#computing-u03-04-q5@2,3: Compare tuples and lists, and justify which you would use for a list of student names and for a single RGB colour. | Both are ordered and indexed. Lists are mutable: items can be added, removed and changed. Tuples are immutable, hashable if their items are, and signal a fixed record. Student names change as students join and leave, so a list fits. An RGB colour such as (255, 128, 0) is a fixed group of three values that shouldn't change and may be used as a key, so a tuple fits. | States both are ordered sequences ; Explains mutability difference ; Mentions hashability or signalling intent ; Chooses list for names with reason ; Chooses tuple for colour with reason

## Dictionaries
LV: GCSE · Application
S: A dictionary stores key-value pairs, so that a value can be found quickly from its key rather than its position. This lesson covers creating, reading, updating and looping over dictionaries, and using one to count things.
O: Create dictionaries and add, read, update and delete key-value pairs
O: Loop over a dictionary's keys, values and items
O: Use a dictionary to solve problems such as counting or lookups, and explain why lookups are fast
H: Keys and values
P: A **dictionary** maps **keys** to **values**: \`ages = {"Ali": 15, "Bea": 16}\`. \`ages["Bea"]\` gives 16. Assigning to a key adds or updates it: \`ages["Cy"] = 14\`. Reading a missing key raises a KeyError; \`ages.get("Dee", 0)\` returns 0 instead. \`"Ali" in ages\` tests whether a key exists, and \`del ages["Ali"]\` removes a pair.
P: Keys must be unique and immutable (strings, numbers or tuples); values can be anything, including lists or other dictionaries. Since Python 3.7, dictionaries keep the order in which keys were inserted.
H: Looping
- \`for k in d:\` loops over keys.
- \`for v in d.values():\` loops over values.
- \`for k, v in d.items():\` gives each key and value together.
- \`len(d)\` is the number of pairs.
X: Count words in \`"to be or not to be"\`.
> \`counts = {}\`, then \`for w in text.split():\` with the line \`counts[w] = counts.get(w, 0) + 1\`.
> "to": get returns 0, so counts["to"] = 1. "be" → 1. "or" → 1. "not" → 1.
> "to" again: get returns 1, so it becomes 2. "be" becomes 2.
> Result: {"to": 2, "be": 2, "or": 1, "not": 1}.
K: Use a dictionary when you look things up by a meaningful key; finding a value by key takes about the same time however large the dictionary is.
!: Using a list of pairs and searching it every time. Looking up \`d[key]\` is far faster than scanning a list for a matching name.
EV: established | Python dictionaries are hash tables, giving average constant-time lookup, insertion and deletion (School 5).
EV: established | Dictionaries preserve insertion order as part of the language specification from Python 3.7.
T: Dictionary | A mutable collection of key-value pairs in which each value is accessed by its unique key
T: Key | The unique, immutable identifier used to look up a value in a dictionary
T: Key-value pair | A key together with the value it maps to
SUM: Dictionaries map unique keys to values; d[key] reads or sets a value and get() avoids KeyError.
SUM: Loop over keys, values() or items(); lookups by key are fast whatever the size.
SRC: Python Software Foundation, The Python Tutorial, section 5.5 "Dictionaries" | guidance | 2024 | https://docs.python.org/3/tutorial/datastructures.html
SRC: Python Software Foundation, The Python Standard Library, "Built-in Types": Mapping Types, dict | standard | 2024 | https://docs.python.org/3/library/stdtypes.html
Q: What does d.get(k, 0) do? | Returns the value for key k, or 0 if k isn't in the dictionary, without raising an error.
Q: Can a list be a dictionary key? | No: keys must be immutable (hashable), so use a string, number or tuple.
M1#computing-u03-05-q1@1: For \`stock = {"pens": 12, "pads": 4}\`, what is \`stock["pads"]\`? | 4 | 12 | "pads" | A KeyError | Indexing a dictionary with a key returns that key's value.
M2#computing-u03-05-q2@2: What does \`prices = {"tea": 2}\` then \`prices["tea"] = 3\` then \`prices["cake"] = 4\` give? | {"tea": 3, "cake": 4} | {"tea": 2, "tea": 3, "cake": 4} | {"tea": 2, "cake": 4} | A KeyError for "cake" | Assigning to an existing key updates it; assigning to a new key adds it. Keys are unique.
TF1#computing-u03-05-q3@2: \`for k, v in d.items():\` gives each key together with its value. | true | items() returns key-value pairs, unpacked into k and v on each pass.
M3#computing-u03-05-q4@3: A school stores 2,000 students as a list of [id, name] pairs and searches it on every scan of a card. Why would a dictionary keyed by id be better? | Looking up a key takes about constant time, rather than scanning up to 2,000 pairs | Dictionaries use less memory than any list | Lists can't hold strings and numbers together | A dictionary keeps the students in alphabetical order | Hash-table lookup is on average constant time; a linear scan grows with the list length.
SA3#computing-u03-05-q5@2,3: Explain how a dictionary could store the results of a class vote for a school council candidate and how to find the winner. | Use the candidate's name as key and the vote count as value. For each vote, \`votes[name] = votes.get(name, 0) + 1\`, which adds new candidates automatically. Find the winner with \`max(votes, key=votes.get)\`, or loop over items keeping the highest count. Dictionary lookup is fast, keys are unique so a candidate can't appear twice, and ties need deciding separately. | Names as keys and counts as values ; Correct update with get or a membership test ; Finds the maximum correctly ; Explains a benefit such as fast lookup or unique keys ; Mentions ties or validation

## Sets
LV: GCSE · Application
S: A set is an unordered collection of unique items. This lesson covers creating sets, removing duplicates, fast membership tests and the set operations union, intersection and difference.
O: Create sets and add, remove and test membership of items
O: Use union, intersection and difference to combine sets
O: Explain when a set is a better choice than a list
H: Unique and unordered
P: A **set** holds each value at most once and has no order or indexes: \`s = {3, 1, 3, 2}\` stores {1, 2, 3}. \`set(lst)\` removes duplicates from a list. \`s.add(x)\` adds an item; \`s.discard(x)\` removes it if present; \`x in s\` tests membership quickly, like a dictionary key. \`{}\` is an empty dictionary, so an empty set is written \`set()\`.
H: Set operations
E: a.union(b) :: union: items in either set (also written with the vertical-bar operator)
E: a.intersection(b) or a & b :: intersection: items in both sets
E: a.difference(b) or a - b :: difference: items in a but not in b
E: a.symmetric_difference(b) or a ^ b :: symmetric difference: items in exactly one of the sets
P: The methods and operators give the same results; they match the set operations of discrete mathematics. The methods also accept any iterable, such as a list: \`a.union([4, 5])\`.
X: Two clubs: \`chess = {"Ali", "Bea", "Cy"}\` and \`drama = {"Bea", "Dee"}\`.
> Union: {"Ali", "Bea", "Cy", "Dee"}: everyone in a club.
> Intersection: {"Bea"}: members of both.
> chess − drama: {"Ali", "Cy"}: chess only.
> \`"Dee" in chess\` is False, found without scanning a list.
K: Use a set when only membership matters (is it there or not?) and duplicates should be ignored; it is fast to test and combines naturally with other sets.
!: Expecting a set to keep order or allow indexing. \`s[0]\` raises a TypeError; sort it into a list with \`sorted(s)\` if order is needed.
EV: established | Python sets are hash tables, so membership tests take constant time on average, while \`x in list\` takes time proportional to the list's length.
EV: established | Set operations in Python correspond directly to those of set theory, as used in discrete mathematics and SQL (UNION, INTERSECT, EXCEPT).
T: Set | An unordered collection of unique, immutable items
T: Union | The set of items in either or both of two sets
T: Intersection | The set of items in both of two sets
SUM: Sets store unique items with no order and test membership quickly.
SUM: Union, intersection and difference combine sets; set(list) removes duplicates.
SRC: Python Software Foundation, The Python Tutorial, section 5.4 "Sets" | guidance | 2024 | https://docs.python.org/3/tutorial/datastructures.html
SRC: Python Software Foundation, Time complexity (Python wiki) | data | 2023 | https://wiki.python.org/moin/TimeComplexity
Q: How do you remove duplicates from a list nums? | Convert it to a set with set(nums); convert back with list() if a list is needed, though the order may change.
Q: What is the intersection of two sets? | The set of items that appear in both.
M1#computing-u03-06-q1@1: What does \`len({4, 4, 5, 5, 5})\` return? | 2 | 5 | 3 | 1 | A set keeps only unique items, here 4 and 5.
M2#computing-u03-06-q2@2: For \`a = {1, 2, 3}\` and \`b = {2, 3, 4}\`, what is \`a - b\`? | {1} | {4} | {1, 4} | {2, 3} | Difference keeps items in a that aren't in b: only 1.
TF1#computing-u03-06-q3@1: \`x = {}\` creates an empty set. | false | Braces with nothing inside create an empty dictionary; an empty set is set().
M3#computing-u03-06-q4@3: A program checks 50,000 usernames against a list of 100,000 banned names. What is the best change? | Store the banned names in a set so each check is a fast hash lookup | Sort the usernames before checking them | Store the banned names in a tuple instead of a list | Check only the first 1,000 banned names | Each \`in\` test on a list scans it; on a set it is on average constant time, turning billions of comparisons into about 50,000 lookups.
SA3#computing-u03-06-q5@2,3: Explain how sets could be used to compare the students who took Computer Science and those who took Maths, and why sets suit this task. | Store each subject's students as a set. Intersection gives students taking both; union gives students taking either; CS minus Maths gives those taking CS only; symmetric difference those taking exactly one. Sets suit this because each student should appear once, order doesn't matter, membership tests are fast and the operations express the questions directly. | Stores each group as a set ; Uses intersection correctly ; Uses union or difference correctly ; Explains uniqueness or order doesn't matter ; Mentions fast membership

## Choosing a Python data structure
LV: GCSE · Evaluation
S: Python's built-in list, tuple, dictionary and set each suit different jobs. This lesson compares them by order, mutability, uniqueness and speed of lookup, and practises choosing and justifying a structure.
O: Compare lists, tuples, dictionaries and sets by their properties
O: Choose a suitable data structure for a problem and justify the choice
O: Evaluate the performance consequences of a choice of data structure
H: The four structures compared
- **List**: ordered, mutable, allows duplicates, indexed by position. For sequences that change.
- **Tuple**: ordered, immutable, allows duplicates. For fixed records and keys.
- **Dictionary**: key-value pairs, mutable, unique keys, fast lookup by key. For lookups and counts.
- **Set**: unordered, mutable, unique items, fast membership. For uniqueness and comparisons.
P: Structures nest: a list of dictionaries (one per student), a dictionary of lists (each form mapped to its students) or a dictionary with tuple keys (a grid of cells). Choose the outer structure by how you will **access** the data most often.
H: Speed matters at scale
P: Testing \`x in\` a list checks every item in the worst case (time proportional to n, written O(n)); \`x in\` a set or dictionary takes about constant time, O(1), because it uses hashing. Accessing \`lst[i]\` by index is O(1). For small collections the difference is negligible; for thousands of lookups on large data it is decisive.
X: Choose structures for a library system.
> Books looked up by ISBN: a dictionary keyed by ISBN, because lookup is by a unique key.
> Each book's details (title, author, year): a tuple or a dictionary, since they form one record.
> A borrower's loans in the order taken: a list, since order matters and it changes.
> All genres in the library: a set, since only uniqueness and membership matter.
K: Ask how the data will be used: by position (list), as a fixed record (tuple), by key (dictionary) or by membership only (set).
!: Defaulting to a list for everything. It works, but lookups by name and duplicate checks become slow and awkward.
EV: established | The average time complexities of Python's built-in operations are documented and follow from their implementations as dynamic arrays and hash tables.
EV: contested | For small collections, readability usually matters more than the speed difference, so the "best" structure depends on scale as well as access pattern.
T: Access pattern | The way a program most often reads or changes its data, such as by position, by key or by membership
T: O(1) | Constant time: an operation that takes about the same time regardless of the amount of data
T: O(n) | Linear time: an operation whose time grows in proportion to the amount of data
SUM: Lists are ordered and mutable; tuples fixed; dictionaries map keys to values; sets hold unique items.
SUM: Choose by access pattern; dictionaries and sets give fast lookups on large data.
SRC: Python Software Foundation, The Python Tutorial, section 5 "Data Structures" | guidance | 2024 | https://docs.python.org/3/tutorial/datastructures.html
SRC: Python Software Foundation, Time complexity (Python wiki) | data | 2023 | https://wiki.python.org/moin/TimeComplexity
Q: Which Python structure is best for looking up a value by a unique key? | A dictionary.
Q: Which structure would you choose for a collection where only membership and uniqueness matter? | A set.
M1#computing-u03-07-q1@1: Which built-in structure is ordered but can't be changed after creation? | Tuple | List | Set | Dictionary | Tuples are ordered and immutable. Lists are mutable; sets are unordered; dictionaries are mutable.
M2#computing-u03-07-q2@2: A program stores each country with its capital city and looks up capitals by country name. Which structure fits best? | A dictionary with countries as keys | A list of capital city names | A set of country names | A tuple of all the countries | Lookups are by a unique key (the country), which is exactly what a dictionary provides.
MATCH2#computing-u03-07-q3@2: Match each task to the most suitable structure. | The order of songs in a playlist = list ; A point's (x, y) coordinates = tuple ; Product prices looked up by code = dictionary ; The distinct postcodes of customers = set | Order and change suit a list; a fixed pair a tuple; lookup by key a dictionary; uniqueness a set.
M3#computing-u03-07-q4@3: A developer stores 1,000,000 visited web pages in a list and checks \`if url in visited\` before each crawl. What is the effect and the fix? | Each check scans up to a million items; a set makes each check about constant time | Lists can't hold more than 65,536 items, so use a tuple | The check is already fast, because lists are hash tables | The list will sort itself, so checks will slow down slightly | Membership in a list is O(n); in a set it is O(1) on average, which matters greatly at this scale.
SA3#computing-u03-07-q5@2,3: A teacher's program records each student's name, form and a list of test scores, and often finds a student by name. Choose and justify a data structure. | A dictionary keyed by student name (or better, a unique student ID, since names can repeat), whose value is a record: a dictionary or tuple with the form and a list of scores. Lookup by key is fast and direct; the scores are a list because tests are added over time and order matters; the form and name don't change often, so they suit a fixed record. A list of records would need searching each time. | Chooses a dictionary keyed by name or ID ; Notes names may not be unique ; Uses a list for scores with a reason ; Uses a suitable record for details ; Compares with a list of records

## Reading text files
LV: GCSE · Application
S: Programs store data permanently in files so that it survives after they end. This lesson covers opening and reading text files in Python with open() and with, reading line by line and dealing with newline characters.
O: Open and read a text file using with open() in read mode
O: Read a file line by line and process each line, removing newline characters
O: Explain why files are closed and how the with statement guarantees it
H: Opening a file
P: Data in variables is lost when a program ends; a **file** on secondary storage keeps it. \`open("names.txt", "r")\` opens a file for reading and returns a **file object**. The \`with\` statement closes the file automatically when its block ends, even if an error occurs: \`with open("names.txt") as f:\` ("r" is the default mode).
H: Reading the data
- \`f.read()\` returns the whole file as one string.
- \`f.readline()\` returns the next line, including its newline character.
- \`f.readlines()\` returns a list of all the lines.
- \`for line in f:\` loops over the lines one at a time, which works for files of any size.
- \`line.strip()\` removes the newline and surrounding spaces.
P: A file name on its own is looked for in the program's current working directory; a path such as \`data/names.txt\` points elsewhere. Text files are read using a character encoding; pass \`encoding="utf-8"\` to open() so that accented letters and symbols are read the same on every computer.
X: A file \`scores.txt\` holds three lines: 12, 30 and 18. Total them.
> \`total = 0\`, then \`with open("scores.txt") as f:\`.
> \`for line in f:\`: the first line is the string "12" followed by a newline.
> \`total += int(line.strip())\`: int("12") is 12; then 30 and 18 are added.
> After the with block the file is closed; total is 60.
K: Open files with with, so they are always closed; everything read from a text file is a string, so strip and cast it before use.
!: Forgetting that each line ends with a newline. Printing lines adds a second one, giving blank lines, and comparing \`line == "yes"\` fails; strip first.
EV: established | Python's documentation recommends the with statement for files because it closes them reliably even when an exception is raised.
EV: established | Reading a file line by line uses little memory whatever its size, whereas read() loads the whole file at once.
T: Text file | A file storing characters, organised into lines separated by newline characters
T: File mode | The way a file is opened: "r" read, "w" write, "a" append
T: with statement | A Python construct that sets up a resource, such as a file, and releases it automatically at the end of the block
SUM: open() returns a file object; with closes it automatically.
SUM: Read with read(), readline(), readlines() or a for loop; strip and cast each line.
SRC: Python Software Foundation, The Python Tutorial, section 7.2 "Reading and Writing Files" | guidance | 2024 | https://docs.python.org/3/tutorial/inputoutput.html
SRC: Python Software Foundation, The Python Standard Library, "Built-in Functions": open() | standard | 2024 | https://docs.python.org/3/library/functions.html
Q: Why use with when opening a file? | It closes the file automatically at the end of the block, even if an error occurs.
Q: What type is each line read from a text file? | A string, usually ending with a newline character.
M1#computing-u03-08-q1@1: Which mode opens a file for reading? | "r" | "w" | "a" | "x" | "r" is read mode (and the default). "w" writes and "a" appends.
M2#computing-u03-08-q2@2: A file holds the lines "5" and "7". What does \`with open("n.txt") as f: print(sum(int(x) for x in f))\` print? | 12 | 57 | A TypeError | "5" and "7" on two lines | Each line is cast to an integer (int ignores the trailing newline), giving 5 + 7 = 12.
TF1#computing-u03-08-q3@2: Opening a file that doesn't exist in "r" mode creates an empty file. | false | Read mode raises FileNotFoundError; only "w" and "a" create a missing file.
M3#computing-u03-08-q4@3: Why is \`for line in f:\` usually better than \`f.read()\` for a 5 GB log file? | It reads one line at a time, so memory use stays small | read() can't read files bigger than 1 MB | for loops are the only way to read numbers | read() deletes the file after reading it | read() loads the whole file into memory; iterating line by line processes it in small pieces.
SA3#computing-u03-08-q5@2,3: Write code that reads a file of usernames, one per line, and prints how many there are and whether "admin" is among them, explaining each step. | \`with open("users.txt") as f: names = [line.strip() for line in f]\`. The with block opens the file and closes it afterwards; each line is stripped of its newline so comparisons work. \`print(len(names))\` gives the count, and \`print("admin" in names)\` tests membership. A try/except for FileNotFoundError would handle a missing file. | Opens the file with with ; Reads every line ; Strips newlines ; Counts and tests membership correctly ; Mentions handling a missing file

## Writing and appending to files
LV: GCSE · Application
S: Programs save results by writing to files. This lesson covers write mode and append mode, writing lines with newline characters, and the danger of overwriting data by accident.
O: Write to a file in "w" mode and add to it in "a" mode
O: Format data correctly for writing, including newline characters and casting to strings
O: Choose the correct file mode and evaluate the risk of data loss
H: Write and append
- \`"w"\` (write): creates the file, or **erases** it if it exists, then writes from the start.
- \`"a"\` (append): creates the file if needed and adds to the end, keeping existing data.
- \`"x"\`: creates a new file and fails if it already exists, preventing accidental overwriting.
P: \`f.write(text)\` writes a string and returns the number of characters written. It doesn't add a newline, so write \`f.write(name + "\\n")\`, and it only accepts strings, so cast numbers with str() or use an f-string. \`print(value, file=f)\` is an alternative that adds the newline for you.
X: Save a high score and keep a log.
> \`with open("best.txt", "w") as f: f.write(str(score))\` replaces the old best score with the new one.
> \`with open("log.txt", "a") as f: f.write(f"{name},{score}\\n")\` adds one line per game.
> After three games, best.txt holds one number; log.txt holds three lines.
> Using "w" for the log would leave only the last game.
K: "w" erases and rewrites a file; "a" adds to the end. Choose the mode by asking whether the old contents should survive.
H: Data is written later than you think
P: Writes are **buffered**: data is held in memory and written to disk in larger blocks. Closing the file (which with does automatically) flushes the buffer. If a program crashes with a file still open, the last writes may be lost.
!: Writing a number directly with \`f.write(42)\`. write accepts only strings, so Python raises a TypeError; use \`f.write(str(42))\`.
EV: established | File writes in Python are buffered and flushed when the file is closed or the buffer fills, as described in the io module documentation.
EV: established | Exclusive creation mode "x" raises FileExistsError if the file exists, a defensive alternative to "w".
T: Write mode | Opening a file with "w", which creates it or erases its contents before writing
T: Append mode | Opening a file with "a", which adds new data to the end and keeps existing contents
T: Buffer | An area of memory that holds data temporarily before it is written to or after it is read from a device
SUM: "w" overwrites, "a" appends and "x" refuses to overwrite.
SUM: write() needs strings and doesn't add newlines; with flushes and closes the file.
SRC: Python Software Foundation, The Python Tutorial, section 7.2.1 "Methods of File Objects" | guidance | 2024 | https://docs.python.org/3/tutorial/inputoutput.html
SRC: Python Software Foundation, The Python Standard Library, "io: Core tools for working with streams" | standard | 2024 | https://docs.python.org/3/library/io.html
Q: What happens to an existing file opened in "w" mode? | Its contents are erased before writing begins.
Q: Does f.write() add a newline? | No: add the newline character yourself, or use print(..., file=f).
M1#computing-u03-09-q1@1: Which mode adds data to the end of a file and keeps what is there? | "a" | "w" | "r" | "x" | Append mode writes at the end. "w" would erase the existing contents first.
M2#computing-u03-09-q2@2: A program runs \`with open("out.txt", "w") as f:\` then writes "A", "B" and "C" with three write calls and no newlines. What does the file contain? | ABC on one line | A, B and C on three lines | Only C | Only A | write adds exactly what it is given; with no newline characters the letters run together.
TF1#computing-u03-09-q3@1: f.write() can write an integer such as 5 directly to a text file. | false | write() accepts only strings; cast with str(5) first.
M3#computing-u03-09-q4@3: A booking program opens its bookings file with "w" every time it saves a new booking. What is the problem and the fix? | Each save erases earlier bookings; open in "a" mode, or read all, update and rewrite | Bookings will be saved twice; use "r" instead | The file will become read-only; use "x" mode | Nothing is wrong, because "w" adds to the end | "w" truncates the file, so only the latest booking survives. Appending keeps earlier lines.
SA3#computing-u03-09-q5@2,3: Explain the difference between write and append mode, and evaluate which a program should use to store a running history of temperature readings and to store the current settings. | Write mode creates the file or erases it, then writes; append mode adds to the end and keeps existing data. A history of readings must keep every earlier reading, so append is correct; write would leave only the latest. Settings represent one current state, so write mode is appropriate: the old settings should be replaced, not accumulated. In both cases use with so the buffer is flushed and the file closed. | Explains write mode erases ; Explains append keeps data ; Chooses append for history with reason ; Chooses write for settings with reason ; Mentions closing or flushing

## CSV files
LV: GCSE · Application
S: A CSV (comma-separated values) file stores a table as text, one record per line with fields separated by commas. This lesson covers reading and writing CSV files with split() and with Python's csv module.
O: Describe the structure of a CSV file as records and fields
O: Read and write CSV data using split() and the csv module
O: Explain the limitations of splitting on commas and why the csv module is more robust
H: Records and fields
P: In a **CSV file** each line is a **record** and each comma separates a **field**. The first line is often a header naming the fields: \`name,form,score\`, then \`Ali,10B,72\`. Spreadsheets and databases import and export CSV, which makes it a common format for exchanging data.
P: The simplest way to read one is \`fields = line.strip().split(",")\`, which gives a list of strings; numeric fields must then be cast. This fails if a field itself contains a comma, such as an address.
H: The csv module
- \`csv.reader(f)\` gives each row as a list of strings, handling quoted fields such as \`"Smith, J"\`.
- \`csv.writer(f).writerow(["Ali", "10B", 72])\` writes a correctly quoted row.
- \`csv.DictReader(f)\` uses the header row so each record is a dictionary: \`row["score"]\`.
- Open the file with \`newline=""\`, as the documentation advises, to avoid blank lines on Windows.
X: Find the average score in a CSV with a header row.
> \`import csv\`, then \`with open("results.csv", newline="") as f:\` and \`rows = list(csv.DictReader(f))\`.
> Each row is a dictionary such as {"name": "Ali", "form": "10B", "score": "72"}.
> \`scores = [int(r["score"]) for r in rows]\` casts each score.
> \`print(sum(scores) / len(scores))\`: for 72, 64 and 80 the average is 72.0.
K: A CSV file is a table as text: one record per line, fields separated by commas. Use the csv module so that quoted fields and commas inside values are handled correctly.
!: Including the header line in calculations. Skip it with \`next(reader)\` or use DictReader, or \`int("score")\` raises a ValueError.
EV: established | CSV is described in RFC 4180, though many files in practice vary from it, which the csv module's dialects handle.
EV: established | Splitting on commas breaks for fields that contain commas or quotes; dedicated parsers exist for this reason.
T: CSV file | A text file storing a table, one record per line with fields separated by commas
T: Record | One row of related data, such as one student's details
T: Field | One item of data within a record, such as a score
SUM: CSV files store tables as text: one record per line, comma-separated fields, often with a header.
SUM: split(",") works for simple data; the csv module handles quoting and header rows.
SRC: Python Software Foundation, The Python Standard Library, "csv: CSV File Reading and Writing" | standard | 2024 | https://docs.python.org/3/library/csv.html
SRC: Shafranovich Y., RFC 4180: Common Format and MIME Type for Comma-Separated Values (CSV) Files, IETF | standard | 2005 | https://www.rfc-editor.org/rfc/rfc4180
Q: In a CSV file, what is a record and what is a field? | A record is one line (one row of data); a field is one comma-separated value within it.
Q: Why use the csv module rather than split(",")? | It handles quoted fields that contain commas, and header rows, correctly.
M1#computing-u03-10-q1@1: What separates fields in a CSV file? | Commas | New lines | Tabs only | Semicolons only | CSV stands for comma-separated values; new lines separate records.
M2#computing-u03-10-q2@2: A line read from a CSV file holds a name, a form and a score separated by commas, followed by a newline. What does \`line.strip().split(",")\` return? | A list of three strings, with the newline removed | A list of two strings and an integer | One string with the commas replaced by spaces | A list holding the whole line as one item | strip() removes the newline and split() gives a list of three strings; the score stays a string until you cast it with int().
TF1#computing-u03-10-q3@3: Splitting each line on "," always reads CSV files correctly. | false | A quoted field such as "Leeds, UK" contains a comma, so a plain split breaks it into two fields.
M3#computing-u03-10-q4@3: A CSV of customers has a header row and addresses such as "1 High St, York". Which approach reads it most reliably? | csv.DictReader, which uses the header and handles quoted commas | split(",") on every line, including the header | read() followed by a single split(",") | Reading each line as one field with no splitting | DictReader parses quoting correctly and maps each field to its header name, so the address stays one field.
SA3#computing-u03-10-q5@2,3: A program stores students' names and scores in a CSV file. Explain how it would add a new student and how it would find the highest score. | To add a student, open the file in append mode with newline="" and use csv.writer(f).writerow([name, score]), which adds one correctly formatted record. To find the highest, open in read mode, use csv.reader, skip the header with next(), cast each score with int(), and track the maximum (or use max with a key). Data read back is all strings, so casting is essential; the header must be skipped or it causes a ValueError. | Uses append mode to add ; Uses csv writer or correct comma formatting ; Reads and skips the header ; Casts scores to numbers ; Correctly finds the maximum

## Input validation and defensive design
LV: GCSE · Application
S: Defensive design means anticipating how a program might be misused or given bad data, and building it to cope. This lesson covers the main validation checks, authentication, and how to write a validation loop in Python.
O: Describe range, type, length, presence, format and lookup checks
O: Write a validation loop that repeats until valid input is entered
O: Distinguish validation from verification and evaluate the limits of each
H: Validation checks
P: **Validation** is an automatic check that input is sensible and allowed, before it is used. It can't prove data is correct: a valid date of birth may still be the wrong one.
- **Range check**: within limits, such as 0 to 100.
- **Type check**: the right type, such as a whole number.
- **Length check**: the right number of characters, such as a password of at least 8.
- **Presence check**: something has been entered.
- **Format check**: matches a pattern, such as a postcode.
- **Lookup check**: is one of an allowed list, such as "Y" or "N".
X: Keep asking until the user enters a whole number from 1 to 10.
> \`while True:\`, then \`text = input("1-10: ")\`.
> \`if text.isdigit() and 1 <= int(text) <= 10: break\` combines a type check and a range check.
> Otherwise \`print("Please enter a whole number from 1 to 10")\` and the loop repeats.
> After the loop, \`n = int(text)\` is guaranteed valid. Testing isdigit() first means int() is never given text like "ten".
K: Validate every input at the point it enters the program, and keep asking (with a helpful message) until it is acceptable.
H: Defensive design
- **Verification** checks data was entered as intended: typing a password twice, or a proof-reading check.
- **Authentication** confirms who a user is: passwords, two-factor codes.
- **Anticipating misuse**: limit login attempts, sanitise text that will be used in database queries (School 12).
- **Maintainability**: comments, sensible names and indentation make defensive code easier to check.
!: Thinking validation guarantees correct data. It only checks data is reasonable; "31/12/1990" passes a format check even if the real birthday is "13/12/1990".
EV: established | Validating untrusted input is a core secure coding practice recommended by the NCSC and OWASP, because invalid input causes many crashes and security flaws.
EV: established | Exam specifications (AQA and OCR) require students to know range, type, length, presence and format checks and the difference between validation and verification.
T: Validation | An automatic check that data is reasonable and meets set rules before it is accepted
T: Verification | A check that data has been entered or copied accurately, such as double entry
T: Authentication | Confirming the identity of a user, for example with a password
SUM: Validation checks input is sensible: range, type, length, presence, format and lookup checks.
SUM: Verification checks data was entered accurately; neither proves data is true.
SRC: OCR, GCSE Computer Science J277 specification, section 2.3.1 "Defensive design" | standard | 2020
SRC: OWASP Foundation, Input Validation Cheat Sheet | guidance | 2024 | https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
Q: What is the difference between validation and verification? | Validation checks that data is reasonable and allowed; verification checks it was entered accurately, for example by double entry.
Q: What does a presence check do? | Checks that data has actually been entered, rather than left blank.
M1#computing-u03-11-q1@1: Which check ensures an age is between 11 and 18? | Range check | Length check | Presence check | Format check | A range check tests that a value lies between limits.
M2#computing-u03-11-q2@2: A form asks the user to type their email address twice and compares them. What kind of check is this? | Verification | Range check | Lookup check | Authentication | Double entry checks the data was typed as intended, which is verification, not validation.
MATCH1#computing-u03-11-q3@1: Match each check to an example. | Range = a mark from 0 to 100 ; Length = a password of at least 8 characters ; Format = a postcode such as LS1 4AP ; Presence = a name box must not be blank | Each check tests a different property of the input.
M3#computing-u03-11-q4@3: A date-of-birth field accepts 29/02/2023. Which conclusion is correct? | The validation is incomplete: it doesn't check the day exists in that month and year | Validation worked, because the date has the correct format | Verification has failed, because the user mistyped | The input passed a range check, so it must be correct | 2023 wasn't a leap year, so the date doesn't exist; a format check alone isn't enough.
SA3#computing-u03-11-q5@2,3: Describe how you would validate a new password for a website and evaluate how far validation makes the system secure. | Presence check (not blank); length check (at least 12 characters); format checks requiring a mix of character types or rejecting common passwords; verification by entering it twice. Use a while loop with a helpful message until it passes. Validation improves password strength and prevents empty or trivial passwords, but it can't stop users reusing passwords or being phished; security also needs hashing, limited login attempts and two-factor authentication. | Gives presence and length checks ; Gives a format or blocklist check ; Mentions verification by double entry ; Uses a loop until valid ; Evaluates limits of validation for security

## Exception handling with try and except
LV: GCSE · Application
S: An exception is an error detected while a program runs. This lesson covers catching exceptions with try and except, handling specific errors such as ValueError and FileNotFoundError, and using else and finally.
O: Explain what an exception is and name common built-in exceptions
O: Use try, except, else and finally to handle errors without crashing
O: Evaluate when to handle an exception and when to let it stop the program
H: Exceptions
P: An **exception** is an error that occurs while a program is running, such as dividing by zero (\`ZeroDivisionError\`), casting invalid text (\`ValueError\`), opening a missing file (\`FileNotFoundError\`), using a bad index (\`IndexError\`) or a missing dictionary key (\`KeyError\`). Unless it is handled, Python stops and prints a **traceback** showing where it happened.
P: A \`try\` block contains code that might fail. If an exception occurs, Python jumps to the matching \`except\` block; the rest of the try block is skipped. If none occurs, the except block is skipped.
X: Trace \`try:\` with \`n = int(input("Number: "))\` and \`print(100 / n)\`, then \`except ValueError: print("Not a number")\`, then \`except ZeroDivisionError: print("Can't divide by zero")\`.
> The user types "abc": int() raises ValueError, so "Not a number" is printed; the division never runs.
> The user types "0": int succeeds, 100 / 0 raises ZeroDivisionError, so the second message is printed.
> The user types "4": no exception; 25.0 is printed and both except blocks are skipped.
> In every case the program carries on instead of crashing.
K: Catch specific exceptions that you expect and can deal with; let unexpected ones surface so that bugs aren't hidden.
H: else, finally and good practice
- \`else\`: runs only if the try block raised no exception.
- \`finally\`: always runs, error or not, for clean-up such as closing a connection.
- \`raise ValueError("Mark must be 0-100")\` signals an error from your own code.
- Combine with a loop to keep asking until input is valid.
!: Writing a bare \`except:\` that catches everything. It hides real bugs, even typing mistakes in variable names, and makes programs hard to debug.
EV: established | The Python documentation and PEP 8 advise catching specific exceptions rather than using a bare except.
EV: contested | Whether to check first ("look before you leap") or try and handle the exception ("easier to ask forgiveness than permission") is a style choice; Python's glossary describes the second as common Python style.
T: Exception | An error detected while a program is running, which can be caught and handled
T: Exception handling | Code that responds to a run-time error so that the program can recover instead of crashing
T: Traceback | The report Python prints when an unhandled exception stops a program, showing where it occurred
SUM: try runs code that may fail; except handles named exceptions; else and finally add success and clean-up code.
SUM: Catch specific exceptions you can recover from; don't hide bugs with a bare except.
SRC: Python Software Foundation, The Python Tutorial, section 8 "Errors and Exceptions" | guidance | 2024 | https://docs.python.org/3/tutorial/errors.html
SRC: Python Software Foundation, The Python Standard Library, "Built-in Exceptions" | standard | 2024 | https://docs.python.org/3/library/exceptions.html
Q: Which exception does int("hello") raise? | ValueError.
Q: When does a finally block run? | Always, whether or not an exception occurred in the try block.
M1#computing-u03-12-q1@1: Which exception is raised by opening a file that doesn't exist for reading? | FileNotFoundError | ValueError | IndexError | ZeroDivisionError | Opening a missing file in read mode raises FileNotFoundError.
M2#computing-u03-12-q2@2: In a try block, line 1 raises an exception that is caught. What happens to line 2 of the try block? | It is skipped, and the matching except block runs | It runs after the except block finishes | It runs before the except block | The program stops immediately | Control jumps from the failing line straight to the except block; the rest of try is skipped.
SEQ2#computing-u03-12-q3@2: Order what happens when a try statement with except, else and finally runs without any error. | The try block runs ; The except block is skipped ; The else block runs ; The finally block runs | With no exception, except is skipped, else runs because try succeeded, and finally always runs last.
M3#computing-u03-12-q4@3: A developer wraps a whole program in \`try:\` … \`except: pass\`. What is the main problem? | Every error, including bugs, is silently ignored, so faults go unnoticed | The program will run much more slowly | Python doesn't allow try around more than one line | It only catches syntax errors, not run-time errors | A bare except with pass swallows everything, hiding bugs and leaving the program in an unknown state.
SA3#computing-u03-12-q5@2,3: Explain how exception handling and validation together make a program that asks for a number of tickets (1 to 6) robust. | Use a loop. In a try block, cast the input with int(); except ValueError prints a message and repeats, so text such as "two" can't crash the program. If the cast succeeds, validate the range 1 to 6 and repeat with a message if it fails. Exception handling deals with input that can't be converted; validation deals with values that convert but aren't allowed. Catch only ValueError so other bugs still show. | Uses a loop to repeat ; Catches ValueError on the cast ; Applies a range check ; Explains the different roles ; Catches a specific exception

## Types of error: syntax, runtime and logic
LV: GCSE · Application
S: Programs go wrong in three different ways: syntax errors break the rules of the language, runtime errors stop a running program, and logic errors give the wrong result. This lesson shows how to recognise, find and fix each.
O: Distinguish syntax, runtime and logic errors and give an example of each
O: Identify the type of error in a piece of code and correct it
O: Explain why logic errors are the hardest to detect and how they are found
H: Three kinds of error
- **Syntax error**: the code breaks the grammar of the language, such as a missing colon or bracket. The interpreter refuses to run the program at all and reports the line (\`SyntaxError\`, \`IndentationError\`).
- **Runtime error**: the code is valid but something goes wrong while it runs, such as dividing by zero or using a missing index. The program stops with an exception unless it is handled.
- **Logic error**: the program runs to the end but gives the wrong result, such as using \`<\` instead of \`<=\`. No message appears.
X: Identify the errors in a function meant to average a list.
> \`def average(v)\` without a colon: syntax error; the program won't start. Add \`:\`.
> \`return sum(v) / len(v)\` with an empty list: runtime error, ZeroDivisionError. Check for an empty list first.
> \`return sum(v) / 2\` instead of \`len(v)\`: a logic error; it runs but gives the wrong answer for most lists.
> Only testing with known expected results reveals the logic error.
P: In compiled languages the compiler reports syntax errors (and many type errors) before the program can run at all; in Python a whole file is checked for syntax before any of it runs, but type problems only appear as runtime errors when the faulty line executes.
K: The translator finds syntax errors; running the program reveals runtime errors; only testing against expected results reveals logic errors.
H: Finding each type
P: Syntax errors are reported with a line number (sometimes the error is just before it). Runtime errors produce a traceback naming the exception and the line. Logic errors need test data with known correct answers, trace tables and debugging tools to find where the program's behaviour first differs from what was intended.
!: Fixing the line named in a syntax error message when the real mistake, such as an unclosed bracket, is on the line before.
EV: established | Syntax errors are detected during translation, before any code runs, which is why a single syntax error stops the whole Python file from running.
EV: established | Logic errors can survive into released software for years; systematic testing reduces but can't eliminate them.
T: Syntax error | An error in the grammar of the code that stops it being translated or run
T: Runtime error | An error that occurs while a program is running, such as division by zero
T: Logic error | An error that makes a program run but produce an incorrect result
SUM: Syntax errors stop translation; runtime errors stop a running program; logic errors give wrong results silently.
SUM: Testing with expected results and tracing are needed to find logic errors.
SRC: Python Software Foundation, The Python Tutorial, sections 8.1 "Syntax Errors" and 8.2 "Exceptions" | guidance | 2024 | https://docs.python.org/3/tutorial/errors.html
SRC: AQA, GCSE Computer Science 8525 specification, section 3.2.11 "Robust and secure programming" | standard | 2020
Q: Which type of error produces no error message? | A logic error: the program runs but gives the wrong result.
Q: Give an example of a runtime error. | Dividing by zero, using an index beyond the end of a list, or opening a missing file.
M1#computing-u03-13-q1@1: A line of Python calls print with the text Hello but leaves out the closing round bracket. What type of error is this? | Syntax error | Runtime error | Logic error | No error | The code breaks the language's grammar, so it can't be translated and run.
M2#computing-u03-13-q2@2: A program to calculate the area of a rectangle runs without error but returns width + height. What type of error is this? | Logic error | Syntax error | Runtime error | Validation error | The code is valid and runs, but the formula is wrong, which is a logic error.
MATCH2#computing-u03-13-q3@2: Match each fault to its type of error. | \`if x > 5\` with no colon = syntax error ; \`nums[10]\` on a 3-item list = runtime error ; using \`>\` where \`>=\` was needed = logic error ; \`int("abc")\` = runtime error | Grammar faults are syntax errors; faults that stop a running program are runtime errors; wrong results are logic errors.
M3#computing-u03-13-q4@3: Why are logic errors usually harder to find than syntax errors? | The program runs normally, so nothing reports them; they are found only by comparing results with expected ones | Logic errors are always in the last line of a program | Python hides logic errors on purpose | Logic errors only occur in programs with files | With no message or crash, a logic error is only visible when an output is checked against a known correct answer.
SA3#computing-u03-13-q5@2,3: Explain the three types of error, how a programmer discovers each, and which is most dangerous in released software. | Syntax errors break the language rules; the interpreter reports them before running. Runtime errors happen while running (division by zero, missing file); they produce an exception and a traceback, and can be handled. Logic errors give wrong results without any message; they are found by testing with expected results, tracing and debugging. Logic errors are the most dangerous in released software because they can silently produce wrong outputs, such as an incorrect bill, that nobody notices. | Defines syntax errors and how found ; Defines runtime errors and how found ; Defines logic errors and how found ; Judges the most dangerous ; Justifies the judgement

## Testing: normal, boundary and erroneous data
LV: GCSE · Application
S: Testing runs a program with chosen data to check that it behaves as intended. This lesson covers iterative and final testing and the three categories of test data, normal, boundary and erroneous, used in every exam test plan.
O: Distinguish iterative testing from final (terminal) testing
O: Choose normal, boundary and erroneous test data for a given rule
O: Evaluate whether a set of tests is sufficient to show a program works
H: When to test
- **Iterative testing** happens during development: each part is tested as it is written, and fixed before moving on.
- **Final** (or terminal) **testing** happens when the program is complete, checking it meets all its requirements together.
- Both are needed: parts that work alone may fail when combined.
H: Test data
P: For a rule such as "a mark from 0 to 100 is accepted":
- **Normal** data: typical valid values that should be accepted, such as 50.
- **Boundary** data: values at the edges, on each side: 0 and 100 (should be accepted) and −1 and 101 (should be rejected). Some boards call values just outside the range "invalid" data.
- **Erroneous** data: values of the wrong type or nonsense, such as "fifty" or an empty input, which should be rejected without crashing.
X: Test a function \`valid_age(a)\` that should accept ages from 13 to 19.
> Normal: 16 → True.
> Boundary: 13 → True, 19 → True; 12 → False, 20 → False.
> Erroneous: "abc" → False (or a handled error), not a crash.
> If 19 gives False, the code probably uses \`< 19\` instead of \`<= 19\`: a boundary logic error.
K: Test normal, boundary and erroneous data, and write down the expected result before running each test.
!: Testing only data you expect to work. Most faults are found at the boundaries and with unexpected input.
EV: established | Boundary value analysis is a standard testing technique because off-by-one errors cluster at the edges of ranges.
EV: established | Dijkstra observed that testing can show the presence of bugs but never their absence, so tests must be chosen to give the best chance of finding faults.
T: Normal data | Typical valid test data that the program should accept and process
T: Boundary data | Test data at or just beyond the edge of an accepted range
T: Erroneous data | Test data of the wrong type or nonsensical, which the program should reject
SUM: Iterative testing checks parts during development; final testing checks the finished program.
SUM: Test normal, boundary and erroneous data, with expected results written in advance.
SRC: Myers G. J., Sandler C. and Badgett T., The Art of Software Testing, 3rd edition, Wiley, chapter 4 | secondary | 2011
SRC: OCR, GCSE Computer Science J277 specification, section 2.3.2 "Testing" | standard | 2020
Q: What is boundary data? | Test data at or just beyond the edges of an accepted range, such as 0, 100, −1 and 101 for a 0–100 rule.
Q: What is the difference between iterative and final testing? | Iterative testing checks parts during development; final testing checks the complete program against its requirements.
M1#computing-u03-14-q1@1: Which is erroneous test data for a program expecting a number of tickets? | "three" | 3 | 1 | 6 | Text where a number is expected is of the wrong type, so it is erroneous data.
M2#computing-u03-14-q2@2: A field accepts passwords of 8 to 20 characters. Which set of lengths gives the best boundary tests? | 7, 8, 20 and 21 | 8, 12 and 20 | 1, 10 and 100 | 0 only | Boundary tests check each limit and the values just outside it.
TF1#computing-u03-14-q3@3: If a program passes every test in its test plan, it is guaranteed to be free of bugs. | false | Testing can show bugs are present but can't prove their absence; untested inputs may still fail.
M3#computing-u03-14-q4@3: A ticket program accepts ages 18 to 65 but the tests used only 30, 40 and 50. What is the most important missing test data? | Boundary values 17, 18, 65 and 66 and erroneous input | More normal values such as 35 and 45 | Very large values such as 1,000,000 only | No more tests are needed, because all three passed | Normal data alone misses off-by-one errors at the limits and crashes on invalid input.
SA3#computing-u03-14-q5@2,3: Write a short test plan for a function that accepts a percentage discount from 5 to 50 inclusive, and justify your choice of data. | Normal: 20 → accepted. Boundary: 5 and 50 → accepted; 4 and 51 → rejected. Erroneous: "ten", empty input, 12.5 if only whole numbers are allowed → rejected with a message, no crash. Each test lists its purpose, data and expected result. Normal data shows typical use works; boundary data catches the common off-by-one mistakes at the limits; erroneous data checks the program is robust against bad input. | Normal test with expected result ; Boundary values on and outside each limit ; Erroneous data ; States expected results ; Justifies each category

## Unit testing and test plans
LV: A level · Application
S: Unit testing checks the smallest parts of a program, usually functions, automatically and repeatably. This lesson covers test plans, Python's assert and unittest, and how automated tests support refactoring and regression testing.
O: Write a test plan with test data, expected results and actual results
O: Write automated unit tests with assert and the unittest module
O: Evaluate the benefits and limits of automated unit testing
H: Test plans
P: A **test plan** is a table listing, for each test: a number, its purpose, the test data, the type (normal, boundary or erroneous), the expected result and, once run, the actual result and any action taken. Writing expected results first stops you deciding after the fact that whatever happened was right.
H: Automated unit tests
P: A **unit test** checks one unit (usually a function) on its own. \`assert expression\` raises an AssertionError if the expression is False: \`assert add_vat(100) == 120\`. The \`unittest\` module groups tests into classes, runs them all and reports which pass; the third-party \`pytest\` tool is also widely used.
X: Unit tests for \`def grade(mark):\` which returns "Pass" for 50 or more, else "Fail".
> \`import unittest\`, then \`class TestGrade(unittest.TestCase):\`.
> \`def test_pass(self): self.assertEqual(grade(70), "Pass")\`.
> \`def test_boundary(self): self.assertEqual(grade(50), "Pass")\` and \`self.assertEqual(grade(49), "Fail")\`.
> \`unittest.main()\` runs all three checks and reports any that fail, every time the code changes.
K: Automated unit tests turn a test plan into code that can be rerun in seconds after every change, catching regressions immediately.
H: Why automate?
- **Regression testing**: rerunning all tests after a change shows whether anything that used to work has broken.
- **Refactoring** safely: code can be restructured with confidence that behaviour hasn't changed.
- **Test-driven development** (TDD): write a failing test first, then the code to make it pass.
- But tests only check what they test: poorly chosen cases give false confidence.
!: Writing tests that only repeat the code's own logic. A test should state the expected result independently, from the requirements.
EV: established | Automated regression test suites are standard practice in professional software development and in continuous integration systems.
EV: contested | Evidence on whether test-driven development improves quality and productivity is mixed: some studies find fewer defects, others little difference.
T: Unit test | An automated test that checks one small part of a program, such as a function, in isolation
T: Test plan | A table of planned tests with their purpose, data, type, expected result and actual result
T: Regression testing | Rerunning existing tests after a change to check that nothing that worked before has broken
SUM: A test plan records purpose, data, type, expected and actual results for each test.
SUM: Unit tests with assert or unittest automate checks, supporting regression testing and safe refactoring.
SRC: Python Software Foundation, The Python Standard Library, "unittest: Unit testing framework" | standard | 2024 | https://docs.python.org/3/library/unittest.html
SRC: Beck K., Test-Driven Development: By Example, Addison-Wesley | secondary | 2002
Q: What does \`assert x == 5\` do if x is 4? | Raises an AssertionError, signalling a failed test.
Q: What is regression testing? | Rerunning existing tests after a change to check that nothing that previously worked has broken.
M1#computing-u03-15-q1@1: What does a unit test check? | One small part of a program, such as a function, on its own | The whole program on the user's computer | Only the user interface | That the code follows the style guide | A unit test isolates one unit so that a failure points directly to it.
M2#computing-u03-15-q2@2: Which column of a test plan should be completed before the test is run? | Expected result | Actual result | Action taken after failure | Pass or fail | Expected results are decided from the requirements in advance; the others record what happened.
TF1#computing-u03-15-q3@2: In test-driven development, tests are written before the code that makes them pass. | true | TDD cycles through writing a failing test, writing code to pass it, then refactoring.
M3#computing-u03-15-q4@3: A team changes a tax function and all its unit tests still pass, but invoices are now wrong. What is the most likely explanation? | The tests don't cover the cases or interactions that changed | Unit tests can never detect errors in functions | The invoices must have a syntax error | Passing tests prove the invoices are correct | Tests check only what they test; missing cases or untested interactions between units let the fault through, so integration tests and better cases are needed.
SA3#computing-u03-15-q5@2,3: Evaluate the use of automated unit tests in a program that will be changed many times by a team. | Automated tests can be rerun in seconds after every change, so regressions are caught immediately and close to their cause. They document expected behaviour, let developers refactor confidently and fit continuous integration. Costs: writing and maintaining tests takes time, and tests only cover the cases written, so they can give false confidence; they don't test how units work together or usability. For frequently changed team code the benefits usually outweigh the costs. | Explains fast repeatable regression checks ; Mentions refactoring or documentation ; Identifies time or maintenance cost ; Identifies limited coverage or false confidence ; Reaches a justified judgement

## Debugging strategies
LV: GCSE · Application
S: Debugging is the process of finding and fixing the cause of an error. This lesson covers reading error messages, print debugging, trace tables, debuggers with breakpoints and the systematic habits that find bugs quickly.
O: Use error messages and tracebacks to locate a fault
O: Apply print statements, trace tables and a debugger with breakpoints to find a logic error
O: Evaluate debugging strategies and choose one suited to a problem
H: Reading the evidence
P: A traceback lists the calls that led to an error; its **last line** names the exception and its message, and the line above shows where it happened. Read it from the bottom up. "NameError: name 'totl' is not defined" points straight at a typing mistake.
P: For logic errors there is no message, so debugging starts by **reproducing** the fault with a small input whose correct answer you know, then narrowing down where the program's values first differ from the expected ones.
H: Tools and techniques
- **Print debugging**: temporarily print variables at key points to see their values.
- **Trace tables**: dry run the suspect part by hand.
- **Debugger**: an IDE tool that sets **breakpoints** (pauses execution at a line), **steps** through code line by line and shows variables in a **watch** window. Python has the built-in \`pdb\` module and \`breakpoint()\`.
- **Rubber duck debugging**: explaining the code line by line, even to an object, often reveals the mistake.
- **Divide and conquer**: comment out or test halves of the code to isolate the faulty part.
X: Debug \`def count_evens(v):\` with \`c = 0\`, \`for x in v: if x % 2 == 1: c += 1\`, \`return c\`. \`count_evens([2, 4, 5])\` returns 1, expected 2.
> Reproduce with the small list [2, 4, 5], where the answer 2 is known.
> Add \`print(x, c)\` inside the loop: it shows c increasing only at x = 5.
> So the condition is wrong: \`x % 2 == 1\` tests for odd numbers.
> Fix to \`x % 2 == 0\`, rerun: 2. Remove the print and add the case to the unit tests.
K: Reproduce the fault with a small known case, find where values first go wrong, fix the cause, then add a test so it can't return.
!: Changing code at random until the output looks right. Each change should test a specific hypothesis about the cause.
EV: established | IDE debuggers with breakpoints, stepping and watches are standard tools named in GCSE specifications and used throughout industry.
EV: contested | How effective print debugging is compared with interactive debuggers depends on the problem; experienced developers use both.
T: Debugging | Finding and fixing the cause of an error in a program
T: Breakpoint | A marker that pauses a program at a chosen line so that its state can be inspected
T: Stepping | Running a program one line at a time in a debugger
SUM: Read tracebacks from the bottom; reproduce logic errors with small cases of known answer.
SUM: Use prints, trace tables and debuggers (breakpoints, stepping, watches), and test a hypothesis with each change.
SRC: Python Software Foundation, The Python Standard Library, "pdb: The Python Debugger" | standard | 2024 | https://docs.python.org/3/library/pdb.html
SRC: Zeller A., Why Programs Fail: A Guide to Systematic Debugging, 2nd edition, Morgan Kaufmann | secondary | 2009
Q: What is a breakpoint? | A marker that pauses a program at a chosen line so that variables can be inspected.
Q: Which line of a Python traceback names the error? | The last line.
M1#computing-u03-16-q1@1: Which debugger feature runs a program one line at a time? | Stepping | A breakpoint alone | A syntax checker | A compiler | Stepping executes the program line by line, so you can watch values change.
M2#computing-u03-16-q2@2: A traceback ends with "IndexError: list index out of range" at \`print(names[i])\`. What is the best first step? | Check the values of i and len(names) at that line | Rewrite the whole program in another language | Delete the print statement | Add a bare except around the program | The error means i is beyond the list's last index; inspecting i and the length shows why.
TF1#computing-u03-16-q3@3: After fixing a bug, adding a test for the case that revealed it helps prevent the same bug returning. | true | A regression test fails if a later change reintroduces the bug.
M3#computing-u03-16-q4@3: A long function gives a wrong total for some inputs. Which approach is most systematic? | Reproduce with a small failing input, then check values at points until the first wrong one is found | Change operators one at a time until the output matches | Rewrite the function from scratch without testing | Run the function many times with random inputs and average the results | Narrowing down from a small reproducible case to the first incorrect value locates the cause efficiently.
SA3#computing-u03-16-q5@2,3: Compare print debugging with using an IDE debugger, and say when each is the better choice. | Print debugging adds temporary print statements to show values: it is simple, works anywhere (including on servers and in loops over many items when output is logged) and needs no tools, but clutters code, must be removed and requires rerunning for each new question. A debugger pauses at breakpoints, steps line by line and shows all variables without changing the code, which suits complex logic and exploring unexpected states, but needs an IDE and is awkward for long-running or concurrent programs. Print debugging suits quick checks and logs; a debugger suits detailed investigation. | Describes print debugging with a strength ; Gives a weakness of print debugging ; Describes the debugger with a strength ; Gives a weakness or limitation of the debugger ; Judges when each is better

## Code quality and maintainability
LV: GCSE · Evaluation
S: Maintainable code is easy for other people (and your future self) to read, change and fix. This lesson covers naming, comments and docstrings, indentation and layout, subroutines, constants and the PEP 8 style guide.
O: Identify features that make code maintainable, including names, comments, indentation and subroutines
O: Improve a piece of code by applying PEP 8 conventions and good structure
O: Evaluate the cost of poor code quality over the life of a program
H: Features of maintainable code
- **Meaningful names**: \`total_price\`, not \`tp\` or \`x\`.
- **Comments** explain *why* code does something; **docstrings** describe what a function does, its parameters and its return value.
- **Indentation and white space** make the structure visible (four spaces per level in Python).
- **Subroutines** each do one job and can be tested and reused.
- **Constants** replace unexplained "magic numbers": \`VAT_RATE = 0.2\`.
- **Consistency**: one style throughout, such as PEP 8.
P: Version control (School 11) adds a history of who changed what and why, which makes maintenance safer in a team. Clear commit messages are documentation too.
X: Improve \`def f(a): return a*1.2 if a>0 else 0\`.
> Rename: \`def price_with_vat(net_price):\`.
> Add a docstring: \`"""Return the price including VAT, or 0 for non-positive input."""\`.
> Replace the magic number: \`VAT_RATE = 0.2\` and \`net_price * (1 + VAT_RATE)\`.
> Lay it out with spaces around operators. The logic is unchanged but its purpose is now obvious.
K: Code is read far more often than it is written: write it for the next person who has to change it.
H: Why it matters
P: Most of the cost of software comes after its first release, in fixing faults and adding features. Hard-to-read code makes every change slower and riskier. Tools help: **linters** such as flake8 or pylint flag style problems and likely bugs, and **formatters** such as Black lay code out consistently.
!: Writing comments that repeat the code, such as \`x = x + 1  # add 1 to x\`. Comment the reason, not the mechanics.
EV: established | PEP 8 notes that code is read much more often than it is written, which is its main justification for consistent style.
EV: established | Studies of software costs since the 1970s consistently find that maintenance accounts for the majority of a system's lifetime cost.
T: Maintainability | How easily code can be understood, corrected and extended
T: Docstring | A string at the start of a function, class or module that documents what it does
T: Magic number | An unexplained literal value in code, better replaced by a named constant
SUM: Maintainable code uses meaningful names, useful comments, docstrings, clear layout, subroutines and constants.
SUM: Most of a program's cost is maintenance, so readability saves time and reduces errors.
SRC: van Rossum G., Warsaw B. and Coghlan N., PEP 8: Style Guide for Python Code | standard | 2001 | https://peps.python.org/pep-0008/
SRC: Goodger D. and van Rossum G., PEP 257: Docstring Conventions | standard | 2001 | https://peps.python.org/pep-0257/
Q: What is a magic number? | An unexplained literal value in code, such as 0.2, that should be replaced by a named constant.
Q: What should a good comment explain? | Why the code does something, rather than restating what each line does.
M1#computing-u03-17-q1@1: Which feature most improves the readability of \`x = y * z\`? | Meaningful names such as \`area = width * height\` | Removing all spaces from the line | Writing the line in capital letters | Moving it into a very long single function | Descriptive names state what each value means, so the line explains itself.
M2#computing-u03-17-q2@2: Which is the most useful comment? | \`# Retry three times because the network sometimes drops the first request\` | \`# add 1 to count\` | \`# this is a loop\` | \`# end of the program\` | It explains why the code is written that way; the others repeat what the code already shows.
TF1#computing-u03-17-q3@1: A docstring describes what a function does, its parameters and its return value. | true | Docstrings document a function's purpose and interface, and tools such as help() display them.
M3#computing-u03-17-q4@3: Why might a company insist on a style guide and automatic formatter even though they don't change what programs do? | Consistent code is quicker for anyone to read and change, reducing maintenance cost and errors | Formatted code always runs faster than unformatted code | Python refuses to run code that doesn't follow PEP 8 | Style guides replace the need for testing | Style has no effect on behaviour, but most effort goes into reading and maintaining code, which consistency makes cheaper and safer.
SA3#computing-u03-17-q5@2,3: A student's 200-line program uses single-letter variable names, no comments and no functions. Evaluate its maintainability and describe three improvements. | It may work, but it is hard to maintain: single letters hide what values mean, nothing explains the purpose or tricky parts, and with no functions every change risks breaking something else and nothing can be tested or reused separately. Improvements: rename variables meaningfully (total_score); decompose into functions with docstrings, each doing one job; replace magic numbers with named constants; add comments explaining why; follow PEP 8 layout. These cost a little time now but save much more whenever the program is changed. | Identifies problems with names ; Identifies lack of structure or comments ; Proposes meaningful names ; Proposes functions with docstrings ; Proposes constants, comments or PEP 8 with a judgement
`;
