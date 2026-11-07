// Example programming notes (Python 3). Code inside OUT: lines writes each new line as \\n.
export default `
## Variables and Assignment
S: A variable is a name bound to a value. Assignment with = binds the name on the left to the value of the expression on the right, evaluated first.
H: Binding names
- **x = 5** binds the name x to the value 5.
- The right-hand side is evaluated first, so **x = x + 2** reads the old x, adds 2, then rebinds x.
- Names are case-sensitive: **total** and **Total** are different variables.
X: What does x hold after x = 5, then x = x + 2?
> x + 2 is evaluated with the old value: 5 + 2 = 7
> x is rebound to 7
K: Assignment evaluates the right-hand side first, then binds the name.
Q: What does x = x + 1 do? | Reads x, adds 1, and binds x to the result.
Q: Are total and Total the same variable? | No: Python names are case-sensitive.
M1@1: After a = 3 and b = a, then a = 10, what is b? | 3 | 10 | 13 | An error | b was bound to the value 3; rebinding a later doesn't change b.
OUT1@1: What does this print? | x = 5\\nx = x + 2\\nprint(x) | 7 | The right-hand side uses the old x: 5 + 2 = 7.

## Numbers and Arithmetic
S: Python has integers and floating-point numbers. Division with / always gives a float; // gives the floor of the quotient and % the remainder.
H: Operators
- \`+\`, \`-\`, \`*\` and \`/\` do the usual arithmetic; \`/\` always returns a float.
- \`//\` is floor division and \`%\` the remainder: \`7 // 2\` is 3 and \`7 % 2\` is 1.
- \`**\` is a power, and binds tighter than \`*\`: \`2 ** 3 * 2\` is 16.
X: Find 7 // 2 and 7 % 2.
> 7 = 3 × 2 + 1
> so 7 // 2 is 3 and 7 % 2 is 1
K: / gives a float; // and % give the quotient and remainder.
Q: What does 10 / 5 give? | 2.0, a float.
Q: What does 7 % 2 give? | 1, the remainder.
M1@1: Which expression gives 2.5? | 10 / 4 | 10 // 4 | 10 % 4 | 10 ** 4 | / is true division and always returns a float.
OUT1@1: What does this print? | print(7 // 2, 7 % 2) | 3 1 | print separates its arguments with a space: 3 and 1.
OUT2@1: What does this print? | print(2 ** 3 * 2) | 16 | ** binds tighter than *, so it's 8 * 2 = 16.

## Conditionals
S: if, elif and else run a block only when a condition is true. Zero, empty strings and empty lists count as false.
H: Choosing a branch
- Conditions are tested in order; only the first true branch runs.
- Indentation marks the block that belongs to each branch.
H: Truthiness
- **0**, **""**, **[]** and **None** are false; most other values are true.
X: Which branch runs when n = 0 in "if n: … else: …"?
> 0 is false
> so the else branch runs
K: Only the first true branch runs, and 0 counts as false.
Q: Is an empty list true or false in a condition? | False.
Q: How many branches of an if–elif–else chain can run? | At most one.
M2@1: n = 15. Which runs first: if n > 10, elif n > 5, else? | The if branch only | Both the if and elif branches | The elif branch only | The else branch | Branches are tested in order and only the first true one runs.
OUT1@1: What does this print? | n = 0\\nif n:\\n    print("yes")\\nelse:\\n    print("no") | no | 0 is false, so the else branch runs.

## Loops
S: A for loop runs its block once for each item of a sequence; range(n) gives 0, 1, …, n − 1.
H: Counting with range
- **range(3)** gives 0, 1 and 2: it stops before 3.
- **range(1, 5)** gives 1, 2, 3 and 4.
H: Accumulating
- Start a total at 0 and add to it inside the loop.
X: What is the total after adding each i in range(1, 5)?
> i takes 1, 2, 3 and 4
> 1 + 2 + 3 + 4 = 10
K: range stops before its end value.
Q: What values does range(3) give? | 0, 1 and 2.
Q: How many times does a loop over range(1, 5) run? | Four.
M1@1: How many numbers does range(2, 7) give? | 5 | 7 | 6 | 2 | 2, 3, 4, 5 and 6: it stops before 7.
OUT1@1: What does this print? | for i in range(3):\\n    print(i) | 0\\n1\\n2 | range(3) gives 0, 1 and 2, one per line.
OUT2@1: What does this print? | total = 0\\nfor i in range(1, 5):\\n    total += i\\nprint(total) | 10 | 1 + 2 + 3 + 4 = 10.
`;
