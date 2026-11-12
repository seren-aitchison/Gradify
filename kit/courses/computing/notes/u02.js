// TechGradify · ForgeLab Python Programming Fundamentals (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Programs and the Python interpreter
LV: GCSE · Foundation
S: A program is a sequence of instructions a computer carries out. This lesson explains what Python is, how the interpreter runs a program line by line, the difference between the interactive shell and a script, and why Python is used to teach programming.
O: Explain what a program is and how the Python interpreter runs one
O: Write, save and run a short Python script and use the interactive shell
O: Evaluate the advantages and disadvantages of an interpreted language such as Python
H: What Python is
P: **Python** is a high-level, general-purpose programming language created by Guido van Rossum and first released in 1991. *High-level* means it is written in words and symbols close to English and mathematics rather than in the processor's binary machine code. Python 3, released in 2008, is the current version; Python 2 reached its end of life in 2020.
P: The standard implementation, CPython, translates source code into an intermediate **bytecode** and runs it on a virtual machine, one instruction at a time. People call this "interpreted" because there is no separate compile step that produces a standalone executable.
H: Shell and scripts
- The **interactive shell** (the \`>>>\` prompt) runs each line as soon as you press Enter: useful for experiments.
- A **script** is a \`.py\` file of instructions, run from the top to the bottom, for example with \`python3 hello.py\`.
- Indentation is part of Python's syntax: it marks which lines belong to an \`if\`, loop or function.
- A **comment** starts with \`#\` and is ignored by the interpreter; it explains the code to people.
X: Run a two-line script.
> File \`hello.py\` contains \`name = "Ada"\` and then \`print("Hello,", name)\`.
> The interpreter runs line 1: it creates the variable \`name\` holding the text "Ada".
> It runs line 2: \`print\` displays its arguments separated by a space.
> Output: \`Hello, Ada\`. Then the script ends, because there are no more lines.
K: A Python program runs in sequence from the first line to the last, unless selection, loops or function calls change the order.
!: Mixing tabs and spaces, or indenting a line that shouldn't be indented. Python reports an \`IndentationError\`; use four spaces per level, as PEP 8 recommends.
EV: established | Python consistently ranks among the most used programming languages in developer surveys and is widely used in teaching, science and data analysis.
EV: contested | Whether a dynamically typed language like Python is the best first language, rather than a statically typed one such as Java, is debated among computing educators.
T: Interpreter | A translator that runs a program's instructions one at a time without producing a separate executable file
T: Script | A file of program instructions, such as a .py file, run from top to bottom
T: Syntax | The rules about how instructions in a language must be written
SUM: Python is a high-level language whose interpreter runs a program line by line from the top.
SUM: The shell runs single lines at once; scripts are saved files; indentation is part of the syntax.
SRC: Python Software Foundation, The Python Tutorial, section 2 "Using the Python Interpreter" | guidance | 2024 | https://docs.python.org/3/tutorial/interpreter.html
SRC: van Rossum G., Warsaw B. and Coghlan N., PEP 8: Style Guide for Python Code | standard | 2001 | https://peps.python.org/pep-0008/
Q: What does the Python interpreter do? | It translates and runs a program's instructions one at a time, without producing a separate executable file.
Q: What does a line starting with # do in Python? | It is a comment: the interpreter ignores it; it explains the code to human readers.
M1#computing-u02-01-q1@1: What is a script in Python? | A saved file of instructions run from top to bottom | A single line typed at the >>> prompt | A list of error messages from the interpreter | The machine code produced by a compiler | A script is a saved .py file. Lines typed at the prompt are run in the interactive shell.
M2#computing-u02-01-q2@2: A script contains \`print("A")\`, then \`print("B")\`, then \`print("C")\`. What is displayed? | A, B and C on three separate lines | C, B and A on three separate lines | Only C, because it is the last line | A, B and C on one line with no spaces | The lines run in sequence, and each \`print\` ends with a new line by default.
TF1#computing-u02-01-q3@1: In Python, indentation is only for readability and doesn't change what a program does. | false | Indentation is part of Python's syntax: it decides which statements belong to an if, a loop or a function.
M3#computing-u02-01-q4@3: Which is a genuine disadvantage of Python being interpreted rather than compiled to machine code? | Programs usually run more slowly than equivalent compiled code | Programs can't be run on more than one operating system | Errors can never be found until the program is finished | Python programs can't use variables or loops | Interpretation adds overhead at run time, so pure Python is slower than compiled C. Interpreted code is actually more portable, and errors are reported as soon as a line runs.
SA3#computing-u02-01-q5@2,3: Evaluate Python as a first programming language for GCSE students. | Strengths: simple, readable syntax close to English; no need to declare types; an interactive shell for quick experiments; a large standard library; and it is used professionally in data science and AI. Weaknesses: dynamic typing can hide type errors until run time; significant indentation confuses some beginners; it is slower than compiled languages; and it hides memory and types that a language like C or Java makes explicit. Overall it is a strong first language, provided students also learn concepts such as data types explicitly. | Names readability or simple syntax ; Names the shell or libraries or professional use ; Identifies dynamic typing as a weakness ; Identifies speed or hidden concepts as a weakness ; Reaches a justified judgement

## Variables and assignment
LV: GCSE · Foundation
S: A variable is a named location that holds a value which can change while a program runs. This lesson covers assignment, naming rules, constants and what really happens in Python when one variable is assigned to another.
O: Explain what a variable is and how assignment works in Python
O: Choose valid, meaningful variable names and use constants where appropriate
O: Trace a sequence of assignments and predict each variable's final value
H: Assignment
P: A **variable** is a name that refers to a value stored in memory. The **assignment** statement \`score = 10\` evaluates the right-hand side and makes the name on the left refer to the result. The \`=\` sign means "becomes", not "equals": \`score = score + 1\` takes the current value, adds 1 and stores the result back in \`score\`.
P: In Python a variable is created the first time it is assigned; there is no separate declaration, and the same name can later refer to a value of a different type. Using a name before it has been assigned raises a \`NameError\`.
H: Names and constants
- Names may contain letters, digits and underscores, but can't start with a digit: \`total2\` is valid, \`2total\` is not.
- Names are case-sensitive: \`Score\` and \`score\` are different variables.
- Keywords such as \`if\`, \`for\` and \`while\` can't be used as names.
- PEP 8 style: lower case with underscores for variables (\`max_speed\`) and capitals for constants (\`VAT_RATE = 0.2\`).
- A **constant** is a value that shouldn't change while the program runs; Python doesn't enforce this, so the capital letters are a signal to programmers.
X: Trace \`a = 4\`, then \`b = a\`, then \`a = a + 3\`, then \`b = b * 2\`.
> \`a = 4\`: a refers to 4.
> \`b = a\`: b now refers to the same value, 4.
> \`a = a + 3\`: the right side is 7, so a refers to 7; b still refers to 4.
> \`b = b * 2\`: b refers to 8. Final values: a = 7, b = 8.
K: Assignment evaluates the right-hand side first, then binds the name on the left to the result; changing one variable later doesn't change another that was copied from it, for numbers and strings.
!: Reading \`x = x + 1\` as a false equation. In programming it is an instruction: "make x one bigger".
EV: established | Using meaningful names and named constants makes programs easier to read and maintain; this is standard guidance in PEP 8 and in exam board mark schemes.
EV: established | In Python, names are references to objects; for immutable values such as numbers and strings, this behaves like copying.
T: Variable | A named reference to a value stored in memory, which can change while the program runs
T: Assignment | A statement that evaluates an expression and stores the result under a name
T: Constant | A named value that is not meant to change while the program runs
SUM: Assignment evaluates the right side and stores the result under the name on the left.
SUM: Use valid, meaningful names; write constants in capitals, such as VAT_RATE.
SRC: Python Software Foundation, The Python Language Reference, section 7.2 "Assignment statements" | standard | 2024 | https://docs.python.org/3/reference/simple_stmts.html
SRC: van Rossum G., Warsaw B. and Coghlan N., PEP 8: Style Guide for Python Code, "Naming Conventions" | standard | 2001 | https://peps.python.org/pep-0008/
Q: What does \`count = count + 1\` do? | It adds 1 to the current value of count and stores the result back in count.
Q: Why might a programmer use a constant such as VAT_RATE? | The value has a meaningful name and is set in one place, so it is easy to read and to change.
M1#computing-u02-02-q1@1: Which is a valid Python variable name? | \`total_score\` | \`2nd_place\` | \`for\` | \`my-score\` | Names can't start with a digit, can't be keywords such as \`for\`, and can't contain hyphens.
M2#computing-u02-02-q2@3: Trace \`x = 2\`, then \`y = x + 5\`, then \`x = y * 2\`, then \`y = x - y\`. What is y at the end? | 7 | 14 | 21 | 9 | y becomes 7, then x becomes 7 × 2 = 14, then y becomes 14 − 7 = 7.
TF1#computing-u02-02-q3@2: After \`a = 5\`, \`b = a\` and \`a = 9\`, the variable b holds 9. | false | b was given the value 5 when \`b = a\` ran; reassigning a afterwards doesn't change b.
M3#computing-u02-02-q4@2: Why is \`VAT_RATE = 0.2\` better than writing 0.2 throughout a program? | The rate has a clear name and can be changed in one place if it changes | Python can only multiply by values stored in constants | Constants make the program run much faster | Python prevents anyone changing a value written in capitals | A named constant explains the number and avoids missing one copy when the rate changes. Python doesn't actually enforce constants.
SA3#computing-u02-02-q5@2,3: Explain the difference between a variable and a constant, and why naming matters, using an example from a program that calculates a shopping total. | A variable such as \`total\` holds a value that changes as items are added (\`total = total + price\`). A constant such as \`DELIVERY_CHARGE = 3.50\` holds a value that stays fixed while the program runs. Meaningful names make the code self-explanatory, so others can maintain it; a constant means the value is changed in one place only, avoiding inconsistency. Python doesn't enforce constants, so the capitals are a convention. | Defines variable with an example ; Defines constant with an example ; Explains benefit of meaningful names ; Explains single-place change benefit ; Notes Python doesn't enforce constants

## Data types and casting
LV: GCSE · Foundation
S: Every value in Python has a data type that decides what it can do. This lesson covers the core types (integer, float, string and Boolean), how to check a type, and casting, which converts a value from one type to another.
O: Identify the data types integer, float, string and Boolean and choose a suitable type for data
O: Convert between types with int(), float(), str() and bool()
O: Predict the result or error when values of different types are combined
H: The core types
- **Integer** (\`int\`): whole numbers such as \`42\` or \`-7\`. Python integers have no fixed size limit.
- **Float** (\`float\`): numbers with a fractional part such as \`3.14\` or \`2.0\`, stored in binary floating point.
- **String** (\`str\`): text in quotes, such as \`"hello"\` or \`'42'\`.
- **Boolean** (\`bool\`): \`True\` or \`False\`.
P: \`type(x)\` returns a value's type: \`type(3)\` is \`int\`, \`type("3")\` is \`str\`. The type decides what operators do: \`3 + 4\` gives 7, but \`"3" + "4"\` joins the strings to give \`"34"\`.
H: Casting
P: **Casting** converts a value to another type. \`int("42")\` gives the integer 42; \`float("2.5")\` gives 2.5; \`str(7)\` gives the string \`"7"\`; \`int(3.9)\` gives 3, because it truncates towards zero rather than rounding. Casting a string that isn't a valid number, such as \`int("ten")\`, raises a \`ValueError\`.
X: Predict each result.
> \`"5" * 3\` repeats the string: \`"555"\`.
> \`int("5") * 3\` is 15, because the string is cast to an integer first.
> \`"Age: " + 16\` raises a \`TypeError\`: a string can't be joined to an integer.
> \`"Age: " + str(16)\` gives \`"Age: 16"\`.
K: Choose the type that fits the data and the operations you need, and cast deliberately: text from the keyboard or a file is always a string until you convert it.
!: Storing a telephone number as an integer. It loses a leading zero and you never do arithmetic on it, so it should be a string.
EV: established | Floats are binary approximations, so \`0.1 + 0.2\` gives \`0.30000000000000004\` in Python; money is better handled in whole pence or with the decimal module.
EV: established | Python is dynamically and strongly typed: a variable can refer to any type, but values are not silently converted between strings and numbers.
T: Data type | A classification of a value that decides what it can store and which operations work on it
T: Casting | Converting a value from one data type to another, such as int("42")
T: Float | A number with a fractional part, stored in binary floating point
SUM: Python's core types are int, float, str and bool, and type() reports a value's type.
SUM: Casting with int(), float(), str() and bool() converts types; invalid conversions raise errors.
SRC: Python Software Foundation, The Python Standard Library, "Built-in Types" | standard | 2024 | https://docs.python.org/3/library/stdtypes.html
SRC: Python Software Foundation, The Python Tutorial, section 15 "Floating-Point Arithmetic: Issues and Limitations" | guidance | 2024 | https://docs.python.org/3/tutorial/floatingpoint.html
Q: What does \`int(7.8)\` return? | 7: int() truncates towards zero rather than rounding.
Q: What data type should a telephone number be stored as, and why? | A string: it may start with 0 and is never used in arithmetic.
M1#computing-u02-03-q1@1: What data type is the value \`"3.5"\`? | String | Float | Integer | Boolean | The quotation marks make it text. \`3.5\` without quotes would be a float.
M2#computing-u02-03-q2@2: What is the result of \`"7" + "3"\` in Python? | \`"73"\` | \`10\` | \`"10"\` | A TypeError | Adding two strings concatenates them. Cast first with \`int()\` to add numerically.
M2#computing-u02-03-q3@2: Which data type is most suitable for whether a library book is on loan? | Boolean | Integer | Float | String | There are only two states, on loan or not, which is exactly what a Boolean represents.
TF1#computing-u02-03-q4@1: \`int("ten")\` converts the word to the number 10. | false | int() only converts text made of digits; "ten" raises a ValueError.
M3#computing-u02-03-q5@3: Why does \`0.1 + 0.2 == 0.3\` evaluate to False in Python? | 0.1 and 0.2 can't be stored exactly in binary, so their sum is slightly more than 0.3 | Python always rounds floats down to one decimal place | The == operator only works on integers, not floats | Floats are compared as strings, character by character | Like 1/3 in decimal, 0.1 has no exact binary representation; the tiny errors make the sum 0.30000000000000004.
SA3#computing-u02-03-q6@2,3: A program stores prices as floats and sometimes shows totals such as 10.199999999. Explain why, and evaluate two ways of fixing it. | Floats are binary approximations: decimal fractions like 0.1 can't be represented exactly, so small errors accumulate in sums. One fix is to store money as an integer number of pence and convert to pounds only for display, which is exact and fast. Another is Python's decimal module, which does exact decimal arithmetic but is slower. Simply rounding the displayed result hides the error but doesn't remove it from further calculations. | Explains binary approximation of floats ; Proposes integer pence ; Proposes the decimal module or equivalent ; Evaluates a strength or weakness of each ; Notes rounding only hides the problem

## Input and output
LV: GCSE · Foundation
S: Programs communicate through input and output. This lesson covers Python's input() and print() functions, formatting output with f-strings, and why input always arrives as a string that may need casting.
O: Use input() to read data from the user and print() to display results
O: Format output with f-strings, separators and line endings
O: Explain why input must be cast and checked before it is used in calculations
H: Reading input
P: \`input(prompt)\` displays the prompt, waits for the user to type a line and press Enter, and returns what they typed **as a string**. To use it as a number, cast it: \`age = int(input("Age: "))\`. If the user types something that isn't a whole number, the cast raises a \`ValueError\`; School 3 shows how to validate input and handle that error.
H: Displaying output
- \`print("a", "b")\` separates its arguments with a space and ends with a new line.
- \`sep\` changes the separator: \`print(1, 2, 3, sep="-")\` shows \`1-2-3\`.
- \`end\` changes the ending: \`print("Loading", end="")\` stays on the same line.
- An **f-string** puts values inside text: \`f"Total: {total}"\`; \`f"{price:.2f}"\` shows two decimal places.
P: Output doesn't only go to the screen: print() can write to a file (School 3), and programs also output by returning values to other code. Good output is labelled and formatted so that a user knows what each number means.
X: A program to greet and work out an age next year.
> \`name = input("Name? ")\`: the user types Sam; name is the string "Sam".
> \`age = int(input("Age? "))\`: the user types 15; the string "15" is cast to the integer 15.
> \`print(f"Hello {name}, next year you will be {age + 1}.")\`.
> Output: \`Hello Sam, next year you will be 16.\` Without \`int()\`, \`age + 1\` would raise a TypeError.
K: input() always returns a string; cast it before doing arithmetic, and expect that users will sometimes type something invalid.
!: Writing \`input("Age? ") + 1\`. The input is a string, so Python raises a TypeError; cast with int() first.
EV: established | f-strings (formatted string literals) were added in Python 3.6 and are the recommended way to format output in modern Python.
EV: established | Input from users is the most common source of invalid data in programs, which is why exam boards require validation (see School 3).
T: Input | Data received by a program, for example typed by a user
T: Output | Data a program produces, for example text displayed on the screen
T: f-string | A string literal prefixed with f, in which expressions inside braces are replaced by their values
SUM: input() shows a prompt and returns the typed line as a string; cast it to use it as a number.
SUM: print() displays values; sep, end and f-strings control the format.
SRC: Python Software Foundation, The Python Tutorial, section 7.1 "Fancier Output Formatting" | guidance | 2024 | https://docs.python.org/3/tutorial/inputoutput.html
SRC: Python Software Foundation, The Python Standard Library, "Built-in Functions": input() and print() | standard | 2024 | https://docs.python.org/3/library/functions.html
Q: What type does input() always return? | A string.
Q: How do you print a float to two decimal places with an f-string? | Use a format specifier: f"{value:.2f}".
M1#computing-u02-04-q1@1: What does \`input("Score? ")\` return when the user types 8? | The string "8" | The integer 8 | The float 8.0 | The Boolean True | input() always returns text; it must be cast with int() to become the integer 8.
M2#computing-u02-04-q2@2: What does \`print("A", "B", "C", sep="")\` display? | ABC | A B C | A,B,C | "A""B""C" | sep="" replaces the default space separator with nothing.
TF1#computing-u02-04-q3@2: \`print(f"{2 + 3}")\` displays 5. | true | Expressions inside the braces of an f-string are evaluated, so 2 + 3 becomes 5.
M3#computing-u02-04-q4@3: \`price = float(input("Price: "))\` crashes when a user types "£4". What is the best explanation and fix? | "£4" isn't a valid float; validate the input and handle the ValueError | float() can't convert any input, so use int() instead | Prices must be stored as strings and never converted | The program needs a longer prompt so users type correctly | The £ sign makes the text invalid for float(), raising ValueError. Checking the input or catching the error lets the program ask again.
SA3#computing-u02-04-q5@2,3: Write a short program that asks for the length and width of a room in metres and prints its area to one decimal place, and explain each step. | \`length = float(input("Length (m): "))\` reads text and casts it to a float because lengths can be fractional; the same for width. \`area = length * width\` multiplies them. \`print(f"Area: {area:.1f} square metres")\` formats the result to one decimal place. A robust version would also check the inputs are positive numbers and handle a ValueError if the user types text. | Uses input with a prompt ; Casts to float with a reason ; Calculates the area correctly ; Formats to one decimal place ; Mentions validation or error handling

## Arithmetic operators
LV: GCSE · Foundation
S: Python's arithmetic operators do the calculations at the heart of most programs. This lesson covers the seven operators, including integer division and modulus, the order in which they are applied and common uses such as testing for even numbers.
O: Use the arithmetic operators +, -, *, /, //, % and ** correctly
O: Apply operator precedence to evaluate an expression
O: Use integer division and modulus to solve problems such as conversions and divisibility tests
H: The operators
E: 7 + 2 = 9 ; 7 - 2 = 5 ; 7 * 2 = 14 :: addition, subtraction, multiplication
E: 7 / 2 = 3.5 :: true division always gives a float
E: 7 // 2 = 3 :: integer (floor) division: rounds down to the whole number
E: 7 % 2 = 1 :: modulus: the remainder after integer division
E: 7 ** 2 = 49 :: exponentiation (power)
P: Shorthand assignment operators combine an operator with assignment: \`total += 5\` means \`total = total + 5\`; \`n //= 10\` removes the last digit of a positive integer.
H: Precedence
P: Python follows the mathematical order of operations: brackets first, then \`**\`, then \`*\`, \`/\`, \`//\` and \`%\` (left to right), then \`+\` and \`-\` (left to right). So \`2 + 3 * 4\` is 14, but \`(2 + 3) * 4\` is 20. Exponentiation groups from the right: \`2 ** 3 ** 2\` is \`2 ** 9\`, which is 512.
X: Convert 200 minutes to hours and minutes.
> \`minutes = 200\`.
> \`hours = minutes // 60\`: 200 // 60 = 3.
> \`left = minutes % 60\`: 200 % 60 = 20.
> \`print(f"{hours} h {left} min")\` shows \`3 h 20 min\`.
K: \`//\` gives how many whole times one number goes into another and \`%\` gives what is left over; together they convert units and test divisibility (\`n % 2 == 0\` means n is even).
!: Using \`/\` when a whole number is needed. \`7 / 7\` is the float 1.0, which can't be used as a list index; use \`//\`.
EV: established | In Python, \`//\` and \`%\` round towards negative infinity, so \`-7 // 2\` is −4 and \`-7 % 2\` is 1; some other languages, such as C, truncate towards zero instead.
EV: established | Python integers have arbitrary precision, so \`2 ** 100\` is calculated exactly rather than overflowing.
T: Integer division | Division that gives only the whole-number part of the result, rounding down (// in Python)
T: Modulus | The remainder after integer division (% in Python)
T: Operator precedence | The rules deciding which operators in an expression are applied first
SUM: Python has +, -, *, /, //, % and **; / always gives a float.
SUM: Brackets, then powers, then multiplication and division, then addition and subtraction.
SRC: Python Software Foundation, The Python Language Reference, section 6.17 "Operator precedence" | standard | 2024 | https://docs.python.org/3/reference/expressions.html
SRC: Python Software Foundation, The Python Tutorial, section 3.1.1 "Numbers" | guidance | 2024 | https://docs.python.org/3/tutorial/introduction.html
Q: What is 17 % 5 in Python? | 2, the remainder when 17 is divided by 5.
Q: How can you test whether n is even in Python? | Check whether n % 2 == 0.
M1#computing-u02-05-q1@1: What does \`17 // 5\` evaluate to? | 3 | 3.4 | 2 | 4 | Integer division gives the whole number of times 5 goes into 17, which is 3; the remainder 2 is discarded.
M2#computing-u02-05-q2@2: What is the value of \`10 - 2 * 3 ** 2\`? | -8 | 72 | 64 | 16 | Powers first: 3 ** 2 = 9; then 2 * 9 = 18; then 10 − 18 = −8.
MATCH1#computing-u02-05-q3@1: Match each expression to its value. | 9 / 2 = 4.5 ; 9 // 2 = 4 ; 9 % 2 = 1 ; 9 ** 2 = 81 | True division gives a float, floor division the whole part, modulus the remainder and ** the power.
M3#computing-u02-05-q4@3: Which expression gives the last digit of a positive integer n? | \`n % 10\` | \`n // 10\` | \`n / 10\` | \`n ** 10\` | The remainder on dividing by 10 is the units digit. \`n // 10\` removes the last digit instead.
SA3#computing-u02-05-q5@2,3: Explain how integer division and modulus can be used to split a number of seconds into hours, minutes and seconds, using 4000 seconds as an example. | hours = 4000 // 3600 = 1, because 3600 goes into 4000 once. The remainder 4000 % 3600 = 400 seconds is left. minutes = 400 // 60 = 6, and seconds = 400 % 60 = 40. So 4000 seconds is 1 hour, 6 minutes and 40 seconds. Integer division counts the whole units and modulus keeps what remains for the next smaller unit. | Uses // 3600 for hours ; Uses % to find the remainder ; Uses // 60 and % 60 for minutes and seconds ; Correct result 1 h 6 min 40 s ; Explains the role of each operator

## Comparison and logical operators
LV: GCSE · Foundation
S: Comparison operators compare two values and produce True or False; logical operators combine those results. Together they form the conditions that control every if statement and while loop.
O: Use the comparison operators ==, !=, <, <=, > and >= correctly
O: Combine comparisons with and, or and not to express a condition
O: Explain how comparisons behave with strings and with mixed types
H: Comparison operators
- \`==\` equal to; \`!=\` not equal to.
- \`<\` less than; \`<=\` less than or equal to.
- \`>\` greater than; \`>=\` greater than or equal to.
P: Each comparison evaluates to a Boolean: \`5 > 3\` is True; \`5 == 5.0\` is True, because the integer and float have the same value. Python allows chained comparisons: \`0 <= mark <= 100\` means \`0 <= mark and mark <= 100\`.
H: Comparing strings
P: Strings are compared character by character using their Unicode code points, so \`"apple" < "banana"\` is True, but \`"Zebra" < "apple"\` is also True, because every capital letter comes before every lower-case letter. To compare without case, convert both first: \`a.lower() == b.lower()\`. Comparing a string with a number using \`<\` raises a TypeError.
X: Is a score valid and a pass? \`score = 72\`.
> \`valid = 0 <= score <= 100\` gives True.
> \`passed = valid and score >= 50\` gives True.
> \`not passed\` gives False.
> With \`score = 120\`, valid is False, so passed is False whatever the second comparison says.
K: A comparison produces True or False; use == to test equality and = only to assign.
!: Writing \`if score = 50:\`. A single = is assignment, which Python rejects in a condition with a SyntaxError; use ==.
EV: established | Python compares strings lexicographically by Unicode code point, which is why capital letters sort before lower-case letters.
EV: established | Comparing floats with == is unreliable because of rounding; \`math.isclose()\` is the recommended test.
T: Comparison operator | An operator that compares two values and gives True or False, such as == or <
T: Logical operator | An operator that combines Boolean values: and, or, not
T: Lexicographic order | Dictionary-style ordering that compares strings character by character
SUM: ==, !=, <, <=, > and >= give True or False; and, or and not combine them.
SUM: Strings compare by character code, so case matters; chained comparisons express ranges.
SRC: Python Software Foundation, The Python Language Reference, section 6.10 "Comparisons" | standard | 2024 | https://docs.python.org/3/reference/expressions.html
SRC: Python Software Foundation, The Python Standard Library, "math": math.isclose() | standard | 2024 | https://docs.python.org/3/library/math.html
Q: What is the difference between = and == in Python? | = assigns a value to a variable; == tests whether two values are equal.
Q: What does \`0 <= x <= 10\` mean in Python? | x is between 0 and 10 inclusive: it is the same as 0 <= x and x <= 10.
M1#computing-u02-06-q1@1: Which operator means "not equal to" in Python? | \`!=\` | \`<>\` | \`=!\` | \`==\` | \`!=\` tests inequality. \`<>\` was removed in Python 3; \`==\` tests equality.
M2#computing-u02-06-q2@2: Which condition is True only for ages from 13 to 19 inclusive? | \`13 <= age <= 19\` | \`13 < age < 19\` | \`age >= 13 or age <= 19\` | \`age > 13 and age > 19\` | Both ends are included, so <= is needed on each side. The or version is True for every age.
TF1#computing-u02-06-q3@2: In Python, \`"Zoo" < "ant"\` evaluates to True. | true | Capital letters have lower Unicode code points than lower-case letters, so "Z" comes before "a".
M3#computing-u02-06-q4@3: A login check is \`if entered == password or attempts < 3:\`. What is the flaw? | Anyone with fewer than three attempts is let in, even with a wrong password | It locks out users who type the right password | It raises an error because or can't join comparisons | It only works if the password is a number | With or, either condition alone is enough, so an early wrong guess still succeeds. The logic needs and, or separate checks.
SA3#computing-u02-06-q5@2,3: Explain how Python compares strings and why a program that sorts names might put "zoe" after "Zak" and "Amy", and how to fix it. | Strings are compared character by character using Unicode code points. All upper-case letters (A is 65) have lower codes than lower-case letters (a is 97), so any name starting with a capital comes before any starting with a small letter: "Amy" and "Zak" come before "zoe". The fix is to compare in a common case, for example sorting with key=str.lower or comparing name.lower() values. | Character-by-character comparison ; Uses Unicode or ASCII codes ; Capitals have lower codes ; Explains the observed order ; Proposes converting case

## Selection with if, elif and else
LV: GCSE · Foundation
S: Selection lets a program choose which code to run depending on a condition. This lesson covers if, elif and else, how Python checks the branches in order, and how to design conditions that cover every case exactly once.
O: Write if, if-else and if-elif-else statements in Python
O: Trace selection statements and predict which branch runs
O: Design and evaluate the order of conditions so that every input is handled correctly
H: The structure
P: An \`if\` statement runs its indented block only when its condition is True. \`else\` gives a block for when it is False. \`elif\` (else if) adds further conditions. Python tests the conditions **in order from the top** and runs only the **first** block whose condition is True; the rest are skipped.
X: Grade a mark of 65 with \`if mark >= 70:\` grade A, \`elif mark >= 60:\` grade B, \`elif mark >= 50:\` grade C, \`else:\` grade U.
> \`65 >= 70\` is False, so the first block is skipped.
> \`65 >= 60\` is True, so grade becomes "B".
> The remaining elif and else are skipped, even though \`65 >= 50\` is also True.
> Output: B. Order matters: with the 50 test first, every pass would be given a C.
P: A condition can be any expression that gives True or False, including a combination with and, or and not. Empty strings, empty lists and 0 count as False; other values count as True.
K: In an if-elif-else chain, only the first True branch runs, so order conditions from the most specific (or highest threshold) to the least.
H: Designing conditions
- Cover every possible input: an \`else\` catches anything the conditions miss.
- Avoid overlapping ranges unless the order deliberately resolves them.
- Test the **boundaries**: for \`mark >= 70\`, test 69, 70 and 71.
- Python 3.10 added \`match\`…\`case\` for choosing between many fixed values.
!: Using a series of separate \`if\` statements instead of elif. Every \`if\` is tested, so a mark of 75 would be given A, then overwritten by B and C.
EV: established | Selection is one of the three constructs sufficient for any algorithm, with sequence and iteration.
EV: established | Errors at boundary values (for example > where >= was intended) are among the most common logic errors, which is why boundary testing is standard.
T: Selection | Choosing which block of code to run depending on whether a condition is True
T: elif | Python's "else if": a further condition tested only if all earlier ones were False
T: Boundary value | A value at the edge of a range, such as 70 for mark >= 70, where errors are most likely
SUM: if runs a block when its condition is True; elif adds further conditions; else catches the rest.
SUM: Only the first True branch runs, so the order of conditions matters; test at the boundaries.
SRC: Python Software Foundation, The Python Tutorial, section 4.1 "if Statements" | guidance | 2024 | https://docs.python.org/3/tutorial/controlflow.html
SRC: OCR, GCSE Computer Science J277 specification, section 2.2.1 "Programming fundamentals" | standard | 2020
Q: In an if-elif-else chain, how many branches run? | At most one: the first whose condition is True, or else if none are.
Q: When does an else block run? | Only when every preceding if and elif condition is False.
M1#computing-u02-07-q1@1: When does the code inside an else block run? | When all the preceding conditions are False | Every time the if statement is reached | When the first condition is True | Only when the program has an error | else is the fall-back: it runs only if no earlier condition in the chain was True.
M2#computing-u02-07-q2@2: With \`if t > 25:\` print Hot, \`elif t > 15:\` print Warm, \`else:\` print Cold, what is printed when t is 25? | Warm | Hot | Cold | Hot and Warm | 25 > 25 is False, so Hot is skipped; 25 > 15 is True, so Warm is printed and the else is skipped.
SEQ2#computing-u02-07-q3@2: Order the conditions so that a ticket price is chosen correctly by an if-elif-else chain. | age < 5: free ; age < 16: child ; age < 65: adult ; else: senior | Testing the smallest upper limit first ensures each age reaches the first range it fits; any other order would give young children the child or adult price.
M3#computing-u02-07-q4@3: A program uses \`if mark >= 50:\` C, \`elif mark >= 60:\` B, \`elif mark >= 70:\` A. What happens to a mark of 85? | It is given C, because the first condition is already True | It is given A, the highest matching grade | It is given all three grades in turn | It raises an error because the ranges overlap | Python stops at the first True condition. The thresholds must be tested from highest to lowest.
SA3#computing-u02-07-q5@2,3: A cinema charges £5 for under-12s, £8 for 12 to 64 and £6 for 65 and over. Write the selection in Python and explain how you would test it. | \`if age < 12: price = 5\`, \`elif age < 65: price = 8\`, \`else: price = 6\`. Testing the lowest limit first means each elif only sees ages above the previous limit. Test typical values (8, 30, 70), the boundaries (11, 12, 64, 65) and an extreme or invalid value such as a negative age, which needs validation before the selection. | Correct conditions in a valid order ; Uses elif and else ; Correct prices ; Tests boundary values 11, 12, 64 and 65 ; Mentions invalid input

## Definite iteration: for loops
LV: GCSE · Foundation
S: Definite (count-controlled) iteration repeats code a known number of times. This lesson covers Python's for loop, the range() function and looping over the items of a string or list.
O: Write for loops using range() with one, two and three arguments
O: Use a for loop to process each item of a string or list
O: Trace a for loop, including running totals and counters, and predict its output
H: for and range()
P: A **for loop** runs its block once for each item in a sequence; the loop variable takes each item in turn. \`range()\` produces a sequence of integers:
- \`range(5)\` gives 0, 1, 2, 3, 4: it starts at 0 and stops **before** 5.
- \`range(2, 6)\` gives 2, 3, 4, 5.
- \`range(10, 0, -2)\` gives 10, 8, 6, 4, 2: the third argument is the step.
H: Looping over sequences
P: A for loop can also visit every item of a string or list directly: \`for letter in "cat":\` gives "c", "a", "t". This is clearer and less error-prone than looping over index numbers.
X: Count the vowels in a word: \`count = 0\`, then \`for ch in "banana":\` with the indented line \`if ch in "aeiou": count += 1\`.
> ch = "b": not a vowel; count stays 0.
> ch = "a": count becomes 1. ch = "n": no change.
> The remaining "a", "n", "a" bring count to 2, then 3.
> After the loop, count is 3.
K: Use a for loop when the number of repetitions is known before the loop starts, whether that is a count from range() or the length of a sequence.
!: Changing the loop variable inside the loop to skip items. In Python, the next pass resets it from the sequence; use \`continue\`, or a while loop, instead.
EV: established | Iterating directly over items, rather than over index numbers, is the idiomatic Python style recommended in the official tutorial.
EV: established | Off-by-one errors, especially in range() end values, are among the most common errors in novice loop code.
T: Definite iteration | Repeating code a number of times known before the loop begins; also called count-controlled
T: Loop variable | The variable that takes each value of the sequence in turn
T: Running total | A variable that accumulates a sum as a loop proceeds
SUM: A for loop runs once for each item in a sequence; range(start, stop, step) stops before stop.
SUM: Loop directly over a string or list where you need its items rather than their positions.
SRC: Python Software Foundation, The Python Tutorial, sections 4.2 "for Statements" and 4.3 "The range() Function" | guidance | 2024 | https://docs.python.org/3/tutorial/controlflow.html
SRC: AQA, GCSE Computer Science 8525 specification, section 3.2.2 "Programming concepts" | standard | 2020
Q: What values does range(3, 8) produce? | 3, 4, 5, 6 and 7: it stops before 8.
Q: What is definite iteration? | Repetition a known number of times, decided before the loop starts, such as a for loop.
M1#computing-u02-08-q1@1: How many times does \`for i in range(4):\` repeat? | 4 | 3 | 5 | It repeats forever | range(4) gives 0, 1, 2 and 3: four values, so four passes.
M2#computing-u02-08-q2@3: What is printed by \`total = 0\`, then \`for n in range(1, 4): total += n * n\`, then \`print(total)\`? | 14 | 9 | 30 | 6 | n takes 1, 2, 3, so total = 1 + 4 + 9 = 14. range(1, 4) excludes 4.
M2#computing-u02-08-q3@1: Which range gives 10, 7, 4, 1? | \`range(10, 0, -3)\` | \`range(10, 1, -3)\` | \`range(1, 10, 3)\` | \`range(10, -3)\` | Start 10, step −3, stopping before 0, gives 10, 7, 4, 1. range(10, 1, -3) stops before 1, so 1 is missing.
TF1#computing-u02-08-q4@1: \`for ch in "hi":\` runs its block twice. | true | A string is a sequence of characters, and "hi" has two.
SA3#computing-u02-08-q5@2,3: Write a for loop that prints the 7 times table from 1 × 7 to 12 × 7 in the form "3 x 7 = 21", and explain your choice of range. | \`for i in range(1, 13): print(f"{i} x 7 = {i * 7}")\`. A for loop suits a task repeated a known number of times (12). range(1, 13) starts at 1 and stops before 13, so it gives exactly 1 to 12; range(12) would start at 0 and miss 12. | Uses a for loop ; Uses range(1, 13) ; Correct output format with an f-string or equivalent ; Justifies a definite loop ; Explains the stop value is excluded

## Indefinite iteration: while loops
LV: GCSE · Foundation
S: Indefinite (condition-controlled) iteration repeats code for as long as a condition stays True, when the number of repetitions isn't known in advance. This lesson covers while loops, sentinel values, break, and how to avoid infinite loops.
O: Write while loops that repeat until a condition changes
O: Use a while loop for input checking and sentinel-controlled input
O: Identify and fix infinite loops and choose between for and while
H: How while works
P: A **while loop** checks its condition before each pass; if it is True, the block runs and the condition is checked again; once it is False, the program continues after the loop. If the condition is False at the start, the block never runs. Something inside the loop must eventually make the condition False, or the loop runs forever.
X: Keep asking until the user enters a mark from 0 to 100.
> \`mark = int(input("Mark: "))\`: the user types 150.
> \`while mark < 0 or mark > 100:\` is True for 150, so the block runs: print "Must be 0 to 100" and read again.
> The user types 80: the condition is now False, so the loop ends.
> The program continues with mark = 80.
K: Use a while loop when you can't know in advance how many passes there will be; make sure every pass moves towards the condition becoming False.
H: Patterns and controls
- **Sentinel value**: a special input that ends the loop, such as 0 or "quit".
- **Counter-controlled**: \`i = 0\`, \`while i < 5:\` … \`i += 1\` (a for loop is usually clearer).
- \`break\` leaves the loop immediately; \`continue\` skips to the next check.
- \`while True:\` with a \`break\` inside suits loops whose exit test falls in the middle.
P: Choose a for loop when the count is known (every item in a list, ten rounds of a quiz) and a while loop when it depends on something that happens during the loop (a correct password, a game ending, the end of the data).
!: Forgetting to update the variable in the condition, as in \`i = 0\` then \`while i < 5: print(i)\` with no \`i += 1\`. The condition never changes, so the loop is infinite; press Ctrl+C to stop it.
EV: established | Any for loop can be rewritten as a while loop, but not every while loop has a fixed count, which is why both constructs exist.
EV: established | Whether a general loop terminates can't always be decided by a program (the halting problem), so termination must be reasoned about by the programmer.
T: Indefinite iteration | Repetition that continues while a condition holds, with no count fixed in advance; also called condition-controlled
T: Sentinel value | A special input value that signals the end of the data, such as 0 or "quit"
T: Infinite loop | A loop whose condition never becomes False, so it never ends
SUM: A while loop repeats while its condition is True and may run zero times.
SUM: Each pass must move towards ending the loop; sentinels and break give controlled exits.
SRC: Python Software Foundation, The Python Language Reference, section 8.2 "The while statement" | standard | 2024 | https://docs.python.org/3/reference/compound_stmts.html
SRC: Python Software Foundation, The Python Tutorial, section 4.4 "break and continue Statements" | guidance | 2024 | https://docs.python.org/3/tutorial/controlflow.html
Q: When does a while loop's body never run? | When its condition is False the first time it is checked.
Q: What is a sentinel value? | A special input value, such as 0 or "quit", that signals the end of the data and stops the loop.
M1#computing-u02-09-q1@1: Which kind of loop is best when you don't know in advance how many times it must repeat? | A while loop | A for loop over range() | An if-elif-else chain | A loop that must run exactly ten times | A while (condition-controlled) loop runs until a condition changes, however many passes that takes.
M2#computing-u02-09-q2@2: Trace \`n = 50\`, then \`count = 0\`, then \`while n > 1:\` with the indented lines \`n = n // 2\` and \`count += 1\`. What is count at the end? | 5 | 6 | 4 | 25 | n goes 50, 25, 12, 6, 3, 1: five halvings, so count is 5.
TF1#computing-u02-09-q3@2: The loop \`x = 10\`, then \`while x != 0: x = x - 3\` eventually stops. | false | x goes 10, 7, 4, 1, −2 … and skips 0, so x != 0 is always True: an infinite loop. A test such as x > 0 would stop it.
M3#computing-u02-09-q4@3: A game loop is \`while lives > 0 or score < 100:\`. What problem does this cause? | The game continues after lives reach 0 as long as the score is under 100 | The game ends as soon as the score reaches 100, whatever the lives | The loop never runs because the condition starts False | Python can't use or in a while condition | With or, both parts must be False to stop. The intended condition is probably and.
SA3#computing-u02-09-q5@2,3: Explain the difference between definite and indefinite iteration, with an example of when each is the better choice. | Definite iteration repeats a number of times known before the loop starts: a for loop printing the 12 rows of a times table, or processing every item in a list. Indefinite iteration repeats until a condition changes: a while loop that keeps asking for a password until it is correct, where the number of attempts can't be known. Using a for loop for input checking would force a fixed number of attempts; using while for a fixed count needs a manual counter and risks an infinite loop. | Defines definite iteration ; Gives a suitable for example ; Defines indefinite iteration ; Gives a suitable while example ; Explains why the other choice is worse

## Nested selection and iteration
LV: GCSE · Application
S: Control structures can be placed inside one another: an if inside a loop, a loop inside a loop, or an if inside an if. This lesson shows how nesting works, how to trace it and when to flatten it for readability.
O: Write programs with selection inside iteration and iteration inside iteration
O: Trace nested loops and count how many times the inner block runs
O: Evaluate deeply nested code and simplify it with combined conditions or functions
H: Nesting
P: **Nesting** puts one control structure inside another; indentation shows which block each line belongs to. With nested loops, the inner loop runs completely for **each** pass of the outer loop, so if the outer loop runs m times and the inner loop n times, the innermost block runs m × n times.
X: Trace \`for row in range(1, 4):\` with the inner loop \`for col in range(1, row + 1): print("*", end="")\` and then \`print()\` after the inner loop.
> row = 1: the inner loop runs for col = 1 only, printing \`*\`, then a new line.
> row = 2: col = 1, 2, printing \`**\`, then a new line.
> row = 3: col = 1, 2, 3, printing \`***\`.
> Output: a triangle of 1, 2 and 3 stars; the inner block ran 1 + 2 + 3 = 6 times.
P: Selection inside iteration is just as common: a loop visits every item and an if inside it decides what to do with each, as in counting the passes in a list of marks.
K: In nested loops the inner loop completes all its passes for every single pass of the outer loop.
H: Keeping it readable
- Combine nested ifs where possible: \`if a:\` then \`if b:\` becomes \`if a and b:\`.
- Use an early \`continue\` or \`return\` instead of wrapping everything in another if.
- Move an inner loop into a well-named function.
- More than about three levels of indentation is a sign that the code needs restructuring.
!: Putting a statement at the wrong indentation level. In the triangle example, indenting \`print()\` one level further would put a new line after every star.
EV: established | Nested loops over the same n items take time proportional to n^{2}, a key idea in algorithm analysis (School 4).
EV: contested | How much nesting is too much is a style judgement; tools that measure cyclomatic complexity flag deeply nested functions for review.
T: Nesting | Placing one control structure inside another
T: Inner loop | A loop inside the body of another loop, run in full on each pass of the outer loop
T: Cyclomatic complexity | A measure of the number of independent paths through code, which rises with branching and nesting
SUM: Nested structures place selection or loops inside one another; indentation shows the structure.
SUM: The inner loop runs fully for each outer pass; flatten deep nesting for readability.
SRC: McCabe T. J., "A complexity measure", IEEE Transactions on Software Engineering SE-2(4), 308–320 | primary | 1976 | https://doi.org/10.1109/TSE.1976.233837
SRC: Python Software Foundation, The Python Tutorial, section 4 "More Control Flow Tools" | guidance | 2024 | https://docs.python.org/3/tutorial/controlflow.html
Q: If an outer loop runs 5 times and its inner loop 4 times, how often does the inner block run? | 20 times (5 × 4).
Q: How can \`if a:\` followed by a nested \`if b:\` be simplified? | Combine them into a single condition: if a and b:.
M1#computing-u02-10-q1@1: In nested loops, what does the inner loop do on each pass of the outer loop? | Runs through all of its own passes | Runs once only | Runs only on the outer loop's final pass | Skips every other pass of the outer loop | The inner loop restarts and completes fully for every pass of the outer loop.
M2#computing-u02-10-q2@2: How many times is "x" printed by \`for i in range(3):\` with the inner loop \`for j in range(4): print("x")\`? | 12 | 7 | 4 | 3 | The inner loop runs 4 times on each of the 3 outer passes: 3 × 4 = 12.
TF1#computing-u02-10-q3@3: Flattening \`if logged_in:\` with a nested \`if is_admin:\` into \`if logged_in and is_admin:\` changes what the code does. | false | When there is no else on either if, the inner block runs in exactly the same cases; the combined condition is simply easier to read.
M3#computing-u02-10-q4@3: A function has loops nested five deep with ifs inside each. What is the best improvement? | Move inner parts into well-named functions and use early exits | Add more comments and leave the structure as it is | Replace all the loops with copied-out code | Increase the indentation to eight spaces per level | Decomposing into functions and reducing nesting lowers complexity and makes each part testable; comments alone don't simplify the logic.
SA3#computing-u02-10-q5@2,3: Write nested loops that print a 3 × 3 multiplication grid (1 to 3) and explain how many times the inner statement runs and why. | \`for r in range(1, 4):\` then inside it \`for c in range(1, 4): print(r * c, end=" ")\`, then \`print()\` in the outer loop after the inner loop. For each of the 3 values of r, the inner loop runs for all 3 values of c, so the print runs 3 × 3 = 9 times, giving rows 1 2 3, 2 4 6, 3 6 9. The print() in the outer loop starts a new row after each inner loop. | Correct outer loop ; Correct inner loop ; New line placed in the outer loop ; States 9 runs ; Explains inner loop completes per outer pass

## Strings: indexing, slicing and methods
LV: GCSE · Application
S: A string is a sequence of characters. This lesson covers indexing, slicing, the len() function, common string methods and the fact that Python strings are immutable.
O: Access characters and substrings with indexes and slices, including negative indexes
O: Use len() and string methods such as upper(), lower(), strip(), find(), replace() and split()
O: Explain string immutability and use it to predict the effect of string operations
H: Indexing and slicing
P: Each character has an **index**, starting at 0. For \`word = "Python"\`, \`word[0]\` is "P" and \`word[5]\` is "n". Negative indexes count from the end: \`word[-1]\` is "n". \`len(word)\` is 6, so the last index is \`len(word) - 1\`; \`word[6]\` raises an IndexError.
P: A **slice** \`word[start:stop]\` gives the characters from start up to but not including stop: \`word[0:3]\` is "Pyt", \`word[2:]\` is "thon", \`word[:2]\` is "Py", and \`word[::-1]\` reverses the string.
H: Methods and immutability
- \`s.upper()\`, \`s.lower()\`: change case.
- \`s.strip()\`: remove spaces and new lines from both ends.
- \`s.find("x")\`: index of the first "x", or −1 if absent; \`"x" in s\` tests membership.
- \`s.replace("a", "b")\`: replace every "a" with "b".
- \`s.split(",")\`: split into a list of substrings.
- \`s.isdigit()\`: True if every character is a digit.
P: Strings are **immutable**: they can't be changed in place. Methods return a new string, so \`name.upper()\` on its own changes nothing; write \`name = name.upper()\`.
X: Extract initials from a full name: \`full = "ada lovelace"\`.
> \`parts = full.split(" ")\` gives the list \`["ada", "lovelace"]\`.
> \`first = parts[0][0]\` is "a"; \`last = parts[1][0]\` is "l".
> \`initials = (first + last).upper()\` gives "AL".
> \`full\` itself is unchanged, because each step created a new string.
K: Indexes start at 0 and slices exclude their stop index; string methods return new strings rather than changing the original.
!: Trying \`word[0] = "J"\` to change a letter. Strings are immutable, so Python raises a TypeError; build a new string such as \`"J" + word[1:]\`.
EV: established | Python strings are sequences of Unicode code points, so indexing works the same for "é" or "π" as for "e".
EV: established | Immutability makes strings safe to share and usable as dictionary keys, which is why Python designs them this way.
T: Index | The position of an item in a sequence, starting from 0
T: Slice | A part of a sequence from a start index up to but not including a stop index
T: Immutable | Unable to be changed after it is created; strings and tuples in Python are immutable
SUM: Characters are indexed from 0 (or from −1 at the end); slices [start:stop] exclude stop.
SUM: String methods return new strings, because strings are immutable.
SRC: Python Software Foundation, The Python Tutorial, section 3.1.2 "Text" | guidance | 2024 | https://docs.python.org/3/tutorial/introduction.html
SRC: Python Software Foundation, The Python Standard Library, "Built-in Types": String Methods | standard | 2024 | https://docs.python.org/3/library/stdtypes.html
Q: For s = "coding", what is s[1:4]? | "odi": the characters at indexes 1, 2 and 3.
Q: What does it mean that Python strings are immutable? | They can't be changed in place; operations create and return a new string.
M1#computing-u02-11-q1@1: For \`word = "Python"\`, what is \`word[-1]\`? | "n" | "P" | "o" | An IndexError | Negative indexes count from the end, and −1 is the last character.
M2#computing-u02-11-q2@2: The string \`s\` holds a date written with hyphens, such as 2026-11-12. What does \`s.split("-")\` return? | A list of three strings: the year, month and day text | A list of three integers | One string with the hyphens removed | A list containing the whole date as one item | split() returns a list of strings, cut at each "-"; the parts stay strings, not integers, until you convert them with int().
M2#computing-u02-11-q3@1: What is \`len("hello world")\`? | 11 | 10 | 5 | 2 | The space counts as a character: 5 + 1 + 5 = 11.
TF1#computing-u02-11-q4@3: After \`name = "sam"\` and then \`name.upper()\`, the variable name holds "SAM". | false | upper() returns a new string that is thrown away; name is still "sam" unless you write name = name.upper().
M3#computing-u02-11-q5@3: Which expression is True only if a string \`s\` reads the same forwards and backwards, ignoring capitals? | \`s.lower() == s.lower()[::-1]\` | \`s == s[::-1].upper()\` | \`s[0] == s[-1]\` | \`s.lower() == s[::-1]\` | Both sides must be in the same case, and the whole string reversed must match. Checking only the first and last letters isn't enough.
SA3#computing-u02-11-q6@2,3: Explain how you would check that a UK-style username is valid: 6 to 12 characters, starting with a letter and containing no spaces, using string operations. | Strip spaces from the ends with strip(), then test len(name) is between 6 and 12 with 6 <= len(name) <= 12. Test name[0].isalpha() for the first character. Test " " not in name for spaces. Combine the three with and. Because strings are immutable, store the stripped value with name = name.strip(). | Uses len with the correct range ; Checks the first character with indexing ; Checks for spaces with in or find ; Combines tests with and ; Handles strip or immutability correctly

## Defining and calling functions
LV: GCSE · Application
S: A function is a named block of code that performs one task and can be called whenever it is needed. This lesson covers defining functions with def, calling them, and why functions are the main tool of decomposition in Python.
O: Define and call functions in Python using def
O: Distinguish procedures that perform an action from functions that return a value
O: Evaluate how functions support decomposition, reuse and testing
H: def and calls
P: A function is defined with \`def\`, a name, brackets and a colon, followed by an indented body: \`def greet():\` then \`print("Hello")\`. Defining it doesn't run it; the body runs only when the function is **called**, as in \`greet()\`. A function must be defined before the line that calls it runs.
P: When a function is called, the program jumps to its body, runs it, then returns to the point just after the call. A function can call other functions, so a program becomes a set of small, named steps.
H: Procedures and functions
- A **procedure** (in exam pseudocode, a subroutine that returns nothing) performs an action, such as printing a menu.
- A **function** returns a value to the caller with \`return\`, such as \`def square(x): return x * x\`.
- In Python both are written with def; a function with no return statement returns \`None\`.
- Built-in functions such as \`len()\`, \`print()\` and \`int()\` work the same way.
X: Trace \`def double(n):\` with body \`return n * 2\`, then \`a = double(3)\`, then \`print(double(a) + 1)\`.
> \`double(3)\` jumps to the body with n = 3 and returns 6, so a = 6.
> \`double(a)\` runs again with n = 6 and returns 12.
> \`12 + 1\` is 13, so 13 is printed.
> The function was written once and used twice.
K: Define a function once, call it many times: each function should do one clearly named job.
!: Printing a result inside a function when the caller needs the value. \`print\` shows it on screen but gives the caller \`None\`; use \`return\`.
EV: established | Subroutines (functions) are one of the oldest abstractions in programming, and modular programs built from them are easier to test and maintain.
EV: established | Python's style guide recommends lower_case_with_underscores names for functions and a docstring describing what each public function does.
T: Function | A named block of code that performs a task and may return a value to the caller
T: Procedure | A subroutine that performs an action without returning a value
T: Function call | An instruction that runs a function's body, then returns to just after the call
SUM: def defines a function; it runs only when called, and control returns to the caller afterwards.
SUM: Procedures perform actions; functions return values with return; Python returns None otherwise.
SRC: Python Software Foundation, The Python Tutorial, section 4.8 "Defining Functions" | guidance | 2024 | https://docs.python.org/3/tutorial/controlflow.html
SRC: Downey A. B., Think Python: How to Think Like a Computer Scientist, 2nd edition, O'Reilly, chapters 3 and 6 | secondary | 2015 | https://greenteapress.com/wp/think-python-2e/
Q: What is the difference between a procedure and a function? | A function returns a value to the caller; a procedure performs an action without returning a value.
Q: What does a Python function return if it has no return statement? | None.
M1#computing-u02-12-q1@1: When does the body of a Python function run? | When the function is called | When the def line is read | When the program finishes | Only if the function contains print | def only defines the function; calling it runs the body.
M2#computing-u02-12-q2@2: What does \`x = show(5)\` store in x, given \`def show(n):\` with body \`print(n * 10)\`? | None | 50 | 5 | The string "50" | show prints 50 but has no return, so it returns None, which is stored in x.
TF1#computing-u02-12-q3@1: A function can be called many times from different parts of a program. | true | Reuse is one of the main reasons for writing functions.
M3#computing-u02-12-q4@3: A 400-line program is rewritten as twelve short functions with clear names. Which benefit is the most significant for a team? | Each function can be understood, tested and changed on its own | The program will always run much faster | Python requires functions in programs over 100 lines | Functions remove the need for any testing | Decomposition into functions makes code modular, so parts can be unit tested, reused and worked on separately. Speed usually doesn't change.
SA3#computing-u02-12-q5@2,3: Explain why a program that calculates delivery costs might be split into functions, and give two functions you would write. | Splitting into functions decomposes the problem: each part has one job, a clear name and can be tested on its own, reused (for example in a returns system) and changed without breaking the rest. Example functions: \`weight_cost(kg)\` returning the charge for a parcel's weight, and \`distance_cost(zone)\` returning the zone charge, with \`total_cost(kg, zone)\` calling both. | Explains decomposition ; Explains testing benefit ; Explains reuse or maintenance benefit ; Gives two sensible functions ; Shows return values or parameters

## Parameters, arguments and return values
LV: GCSE · Application
S: Parameters let a function work on different data each time it is called, and return values pass results back. This lesson covers positional and keyword arguments, default values, returning several values and how arguments are passed in Python.
O: Distinguish parameters from arguments and pass arguments by position and by keyword
O: Write functions with default parameter values that return one or more values
O: Explain how passing a mutable list differs from passing a number, and the risks involved
H: Parameters and arguments
P: A **parameter** is a name in the function definition: in \`def area(width, height):\`, width and height are parameters. An **argument** is the value supplied in the call: in \`area(4, 3)\`, 4 and 3 are arguments. Arguments are matched to parameters by position, or by name with **keyword arguments**: \`area(height=3, width=4)\`.
P: A parameter can have a **default value**: \`def greet(name, greeting="Hello"):\` lets the caller write \`greet("Ali")\` or \`greet("Ali", "Hi")\`. Parameters with defaults must come after those without.
H: Returning values
- \`return\` ends the function and sends a value back to the caller.
- A function can return several values as a tuple: \`return low, high\`, unpacked with \`a, b = min_max(data)\`.
- Code after a return in the same block never runs.
- A function that returns a value can be used in an expression: \`total = price(3) + price(5)\`.
X: Trace \`def bmi(mass, height=1.7):\` with body \`return round(mass / height ** 2, 1)\`, then \`print(bmi(68))\` and \`print(bmi(height=2.0, mass=80))\`.
> Call 1: mass = 68, height takes its default 1.7. \`1.7 ** 2\` is 2.89; 68 / 2.89 is about 23.53; rounded to 23.5.
> Call 2: keyword arguments set mass = 80 and height = 2.0 in any order. 80 / 4.0 = 20.0.
> Output: 23.5, then 20.0.
K: Parameters are the names in the definition; arguments are the values in the call. Return sends a result back; print only shows it.
H: Passing lists
P: Python passes a reference to the object. Reassigning a parameter inside a function doesn't affect the caller's variable, but a **mutable** object such as a list can be changed in place: if a function runs \`items.append(4)\`, the caller's list gains 4 too.
!: Using a mutable default such as \`def add(x, items=[]):\`. The same list is reused on every call, so items build up; use \`items=None\` and create a new list inside.
EV: established | Python's argument passing is often described as "pass by object reference" (or call by sharing): the function receives a reference to the same object as the caller.
EV: established | The mutable default argument problem is documented in the official Python tutorial as a common surprise.
T: Parameter | A variable named in a function definition that receives a value when the function is called
T: Argument | A value passed to a function when it is called
T: Return value | The value a function sends back to its caller with return
SUM: Parameters are named in the definition; arguments are passed in the call, by position or by keyword.
SUM: Return sends values back; lists passed to a function can be changed in place.
SRC: Python Software Foundation, The Python Tutorial, section 4.9 "More on Defining Functions" | guidance | 2024 | https://docs.python.org/3/tutorial/controlflow.html
SRC: Python Software Foundation, Programming FAQ, "How do I write a function with output parameters (call by reference)?" | guidance | 2024 | https://docs.python.org/3/faq/programming.html
Q: In \`def add(a, b):\` called as \`add(2, 5)\`, which are the parameters and which the arguments? | a and b are parameters; 2 and 5 are arguments.
Q: What is a keyword argument? | An argument passed by naming the parameter, such as area(height=3, width=4), so order doesn't matter.
M1#computing-u02-13-q1@1: In \`def total(price, qty):\`, what are price and qty? | Parameters | Arguments | Return values | Global constants | Names in a function's definition are parameters; the values supplied when it is called are arguments.
M2#computing-u02-13-q2@2: Given \`def f(a, b=2): return a * b\`, what is \`f(5)\`? | 10 | 5 | 7 | An error, because b is missing | b takes its default 2, so the result is 5 × 2 = 10.
M2#computing-u02-13-q3@3: What does \`def stats(nums): return min(nums), max(nums)\` return for \`[4, 9, 1]\`? | The tuple (1, 9) | The list [1, 9] | Only 1, because return stops at the first value | The number 10 | Values separated by commas after return form a tuple, here (1, 9).
TF1#computing-u02-13-q4@3: If a function runs \`nums.append(0)\` on a list passed to it, the caller's list also gains the 0. | true | The parameter refers to the same list object, so changing it in place is visible to the caller.
SA3#computing-u02-13-q5@2,3: Explain the difference between a parameter and an argument, and between returning a value and printing it, using a function that converts Celsius to Fahrenheit. | \`def to_f(c): return c * 9 / 5 + 32\`: c is the parameter, a name in the definition; in \`to_f(20)\` the 20 is the argument, the value passed in. Returning gives the caller the value 68.0 to store or use (\`temps.append(to_f(20))\`); printing would only show it and return None, so the caller couldn't use the result. Returning is better because it keeps the function reusable and testable. | Correct conversion function ; Identifies the parameter ; Identifies the argument ; Explains return gives the caller a value ; Explains why print alone is less useful

## Scope: local and global variables
LV: A level · Application
S: Scope is the part of a program in which a name can be used. This lesson explains local and global variables in Python, how Python looks up names, the global keyword and why programmers avoid global variables.
O: Distinguish local from global variables and state where each can be used
O: Predict the output of code in which local and global variables share a name
O: Evaluate the use of global variables and explain the alternatives
H: Local and global
P: A **local variable** is created inside a function, by assignment or as a parameter. It exists only while that function call runs and can't be used outside it. A **global variable** is created at the top level of a program and can be read anywhere in the file.
P: Python looks names up in the order **LEGB**: Local, then Enclosing function, then Global, then Built-in. If a function assigns to a name, that name is local throughout the function, unless it is declared \`global\`.
X: Trace \`count = 10\`, then \`def f():\` with body \`count = 5\` and \`print(count)\`, then \`f()\` and \`print(count)\`.
> \`count = 10\` creates a global.
> Inside f, \`count = 5\` creates a separate local variable called count.
> \`print(count)\` inside f shows 5 (the local one).
> After f returns, the local has gone; \`print(count)\` shows 10. The global was never changed.
K: Assigning to a name inside a function creates a local variable, even if a global with the same name exists; to change a global you must declare it with global.
H: Why avoid globals
- Any function can change a global, so bugs are hard to trace.
- Functions that depend on globals are hard to test and reuse.
- Prefer passing values in as parameters and getting results back with return.
- Global constants (such as \`MAX_SIZE = 100\`) are acceptable, because they never change.
!: Reading a global and then assigning to it in the same function, as in \`def add(): total = total + 1\`. Python treats total as local throughout, so it raises an UnboundLocalError.
EV: established | Python resolves names by the LEGB rule, as defined in the language reference's section on naming and binding.
EV: established | Minimising shared mutable state, including global variables, is standard software engineering guidance because it reduces coupling between parts of a program.
T: Scope | The region of a program in which a name can be used
T: Local variable | A variable created inside a function, usable only during that function call
T: Global variable | A variable created at the top level of a program, readable throughout the file
SUM: Local variables exist only inside their function; globals exist throughout the file.
SUM: Assigning inside a function makes a name local unless declared global; prefer parameters and return values.
SRC: Python Software Foundation, The Python Tutorial, section 9.2 "Python Scopes and Namespaces" | guidance | 2024 | https://docs.python.org/3/tutorial/classes.html
SRC: Python Software Foundation, The Python Language Reference, section 4.2 "Naming and binding" | standard | 2024 | https://docs.python.org/3/reference/executionmodel.html
Q: What is the scope of a local variable? | Only the function in which it is created, for the duration of that call.
Q: What does LEGB stand for? | Local, Enclosing, Global, Built-in: the order in which Python looks up a name.
M1#computing-u02-14-q1@1: Where can a local variable be used? | Only inside the function that created it | Anywhere in the program after it is created | In every function that has the same parameter names | Only in the main program, outside functions | A local variable belongs to one function call and disappears when it returns.
M2#computing-u02-14-q2@2: Given \`x = 1\`, \`def g():\` with body \`x = 2\`, then \`g()\` and \`print(x)\`, what is printed? | 1 | 2 | None | An UnboundLocalError | The assignment in g creates a local x; the global x is unchanged.
TF1#computing-u02-14-q3@2: Adding \`global total\` inside a function lets it change the global variable total. | true | The global declaration makes assignments in that function refer to the global name.
M3#computing-u02-14-q4@3: Why does \`total = 0\`, then \`def add(n):\` with body \`total = total + n\`, raise an error when add(5) is called? | total is assigned in the function, so it is local, and it is read before it has a value | Functions can't use parameters and globals together | total must be a string to be added to | The function has no return statement | Python decides at compile time that total is local to add, so reading it first raises UnboundLocalError. Pass and return values instead.
SA3#computing-u02-14-q5@2,3: Evaluate the use of global variables in a large program, and describe a better approach. | Globals are convenient: any function can read them without passing them around. But any function can also change them, so a bug in one place shows up somewhere else, and tracing it is hard. Functions using globals are hard to test in isolation and to reuse elsewhere, and two developers may unknowingly use the same name. A better approach is to pass data in as parameters and return results, keeping state local or inside objects; global constants that never change are acceptable. | Notes the convenience of globals ; Explains hidden side effects or hard debugging ; Explains testing or reuse problems ; Proposes parameters and return values ; Notes constants are acceptable

## Using modules: random and math
LV: GCSE · Application
S: A module is a file of reusable code, such as functions and constants, that a program can import. This lesson covers the import statement and two standard library modules used constantly in exam tasks: random and math.
O: Import modules and their functions with import and from … import
O: Use functions from random and math, such as randint(), choice(), sqrt() and floor()
O: Evaluate the benefits of the standard library and the limits of pseudo-random numbers
H: Importing
- \`import math\` loads the module; use its contents with a prefix: \`math.sqrt(16)\`.
- \`from random import randint\` imports one name, used without a prefix: \`randint(1, 6)\`.
- \`import random as rnd\` gives the module a shorter name.
- Python's **standard library** comes with every installation; other packages are installed with pip.
H: random and math
- \`random.randint(a, b)\`: a random integer from a to b **inclusive** (unlike range).
- \`random.random()\`: a float from 0.0 up to but not including 1.0.
- \`random.choice(seq)\`: a random item; \`random.shuffle(lst)\` shuffles a list in place.
- \`math.sqrt(x)\`, \`math.floor(x)\`, \`math.ceil(x)\`, \`math.pi\`.
P: Python's random module generates **pseudo-random** numbers with the Mersenne Twister algorithm. They look random but are produced by a deterministic formula from a starting **seed**; \`random.seed(42)\` gives the same sequence every run, which is useful for testing. For passwords or security tokens, use the \`secrets\` module instead.
X: Simulate a dice game: roll two dice until a double.
> \`import random\` and \`rolls = 0\`.
> \`while True:\`, then \`a = random.randint(1, 6)\`, \`b = random.randint(1, 6)\` and \`rolls += 1\`.
> \`if a == b: break\` leaves the loop on a double.
> \`print(f"Double after {rolls} rolls")\`. The chance of a double is 6 out of 36, so on average it takes 6 rolls.
K: Import what you need from the standard library rather than rewriting it: it is tested, documented and fast.
!: Expecting \`random.randint(1, 6)\` to work like \`range(1, 6)\`. randint includes the upper value 6; range stops before it.
EV: established | Python's random module uses the Mersenne Twister generator and the documentation warns it is unsuitable for security purposes.
EV: established | The secrets module (Python 3.6 onwards) generates cryptographically strong random numbers for passwords and tokens.
T: Module | A file of Python code, such as functions and constants, that can be imported into a program
T: Standard library | The collection of modules supplied with every Python installation
T: Pseudo-random number | A number produced by a deterministic algorithm that appears random
SUM: import loads a module; from … import brings in individual names.
SUM: random gives pseudo-random numbers (randint includes both ends); math gives sqrt, floor, ceil and pi.
SRC: Python Software Foundation, The Python Standard Library, "random: Generate pseudo-random numbers" | standard | 2024 | https://docs.python.org/3/library/random.html
SRC: Python Software Foundation, The Python Standard Library, "secrets: Generate secure random numbers for managing secrets" | standard | 2024 | https://docs.python.org/3/library/secrets.html
Q: What range of values can random.randint(1, 10) return? | Any integer from 1 to 10 inclusive.
Q: Why should random not be used to generate passwords? | Its numbers are pseudo-random and predictable from the seed; the secrets module is designed for security.
M1#computing-u02-15-q1@1: Which statement lets you call sqrt(25) without a prefix? | \`from math import sqrt\` | \`import math\` | \`import sqrt\` | \`math import sqrt\` | from … import brings the name in directly. \`import math\` requires \`math.sqrt(25)\`.
M2#computing-u02-15-q2@2: Which line simulates rolling one six-sided dice? | \`random.randint(1, 6)\` | \`random.randint(0, 6)\` | \`random.randint(1, 7)\` | \`random.random(6)\` | randint includes both ends, giving 1 to 6. (0, 6) could give 0; (1, 7) could give 7.
TF1#computing-u02-15-q3@2: Calling random.seed(5) before generating numbers makes the program produce the same sequence each time it runs. | true | Pseudo-random generators are deterministic: the same seed gives the same sequence, which helps testing.
M3#computing-u02-15-q4@3: A developer writes their own square root function rather than using math.sqrt. What is the strongest argument against this? | The library version is already tested, accurate and fast, so the new code adds risk for no gain | Python forbids writing functions that the library already has | Custom functions can't return floats | The math module only works with integers | Reusing the standard library saves time and avoids bugs; reinventing it is justified only for learning or special needs.
SA3#computing-u02-15-q5@2,3: Explain what pseudo-random numbers are, and evaluate whether Python's random module is suitable for a dice game and for generating account passwords. | Pseudo-random numbers come from a deterministic algorithm (the Mersenne Twister) started from a seed: they pass statistical tests of randomness but the same seed always gives the same sequence, and the sequence can be predicted from enough outputs. For a dice game this is fine: the numbers are fair enough, and seeding helps testing. For passwords it is unsuitable, because an attacker could predict them; the secrets module uses the operating system's cryptographically secure source instead. | Defines pseudo-random with seed ; Explains predictability ; Judges suitable for a game ; Judges unsuitable for passwords ; Names secrets or a secure source
`;
