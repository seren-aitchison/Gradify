// TechGradify · ForgeLab Data Representation (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Binary and denary
LV: GCSE · Foundation
S: Computers store all data as binary: patterns of 0s and 1s. This lesson explains why, how the binary place-value system works and how to convert between binary and denary (base 10).
O: Explain why computers use binary to represent data
O: Convert whole numbers between binary and denary, up to at least 8 bits
O: State the range of values that n bits can represent and apply it to a problem
H: Why binary?
P: A computer's processor and memory are built from billions of transistors, each of which acts as a switch that is either off or on. Two states are easy to make, store and tell apart reliably, even with electrical noise, so data is represented with two symbols: 0 and 1. One binary digit is a **bit**; 8 bits make a **byte**.
P: **Denary** (decimal) is base 10: each place is worth 10 times the one to its right (units, tens, hundreds). **Binary** is base 2: each place is worth twice the one to its right. For 8 bits the place values are 128, 64, 32, 16, 8, 4, 2, 1.
E: n bits represent 2^{n} different values :: 0 to 2^{n} − 1 for unsigned whole numbers
X: Convert binary 10110110 to denary, then denary 75 to binary.
> Under the place values 128 64 32 16 8 4 2 1, the bits are 1 0 1 1 0 1 1 0.
> Add the place values with a 1: 128 + 32 + 16 + 4 + 2 = 182.
> For 75: 64 fits (11 left), 32 doesn't, 16 doesn't, 8 fits (3 left), 4 doesn't, 2 fits (1 left), 1 fits.
> So 75 = 01001011. Check: 64 + 8 + 2 + 1 = 75. In Python, \`bin(75)\` gives \`"0b1001011"\` and \`int("1001011", 2)\` gives 75.
K: In binary each place is worth double the one to its right; n bits give 2^{n} values, so 8 bits store whole numbers from 0 to 255.
H: Ranges and leading zeros
- 4 bits (a nibble): 0 to 15. 8 bits: 0 to 255. 16 bits: 0 to 65,535.
- Leading zeros don't change a value: 00001011 is 11.
- The rightmost bit is the **least significant bit**; the leftmost is the **most significant bit**.
- An odd number always has a least significant bit of 1.
!: Thinking 8 bits can store 256 as the largest number. 2^{8} = 256 is the number of different values; because one of them is 0, the largest is 255.
EV: established | All data in a digital computer, including text, images, sound and instructions, is ultimately stored and processed as binary.
EV: established | Two-state devices are used because they are cheap to manufacture and distinguish reliably in the presence of electrical noise.
T: Bit | A binary digit, 0 or 1: the smallest unit of data
T: Denary | The base-10 number system, using digits 0 to 9
T: Binary | The base-2 number system, using digits 0 and 1
SUM: Computers use binary because two-state switches are reliable; each binary place is worth twice the next.
SUM: n bits give 2^{n} values: 8 bits store 0 to 255.
SRC: AQA, GCSE Computer Science 8525 specification, section 3.3.1 "Number bases" | standard | 2020
SRC: Python Software Foundation, The Python Standard Library, "Built-in Functions": bin() and int() | standard | 2024 | https://docs.python.org/3/library/functions.html
Q: How many different values can 8 bits represent? | 256 (2^{8}), from 0 to 255 for unsigned whole numbers.
Q: Why do computers use binary? | Their components are two-state switches (off or on), which are easy to make and distinguish reliably.
M1#computing-u06-01-q1@1: What is the denary value of binary 00001101? | 13 | 11 | 15 | 26 | The 1s are in the 8, 4 and 1 columns, so the value is 8 + 4 + 1 = 13.
M2#computing-u06-01-q2@2: What is denary 150 in 8-bit binary? | 10010110 | 10010011 | 01101001 | 11000110 | 150 = 128 + 16 + 4 + 2, giving 1 0 0 1 0 1 1 0.
TF1#computing-u06-01-q3@2: The largest unsigned whole number that 6 bits can store is 64. | false | 2^{6} = 64 values, from 0 to 63, so the largest is 63.
M3#computing-u06-01-q4@3: A sensor must report values from 0 to 1,000. What is the fewest number of bits that can store every value? | 10 | 9 | 8 | 1,000 | 9 bits reach only 511; 10 bits give 1,024 values, 0 to 1,023.
SA3#computing-u06-01-q5@2,3: Explain why computers use binary rather than denary, and show how to convert 201 into 8-bit binary. | Electronic components such as transistors have two stable states, off and on, which can be made cheaply and told apart reliably despite electrical noise; ten distinct voltage levels would be far harder to distinguish. To convert 201: 128 fits (73 left), 64 fits (9 left), 32 and 16 don't, 8 fits (1 left), 4 and 2 don't, 1 fits. So 201 = 11001001. Check: 128 + 64 + 8 + 1 = 201. | Two-state components ; Reliability or noise argument ; Uses place values to convert ; Correct answer 11001001 ; Shows a check

## Hexadecimal
LV: GCSE · Foundation
S: Hexadecimal (base 16) is a compact way for people to read and write binary: each hex digit stands for exactly four bits. This lesson covers converting between hex, binary and denary and where hex is used.
O: Explain why hexadecimal is used to represent binary values
O: Convert between hexadecimal, binary and denary
O: Identify uses of hexadecimal, such as colour codes and memory addresses
H: Base 16
P: **Hexadecimal** uses 16 digits: 0 to 9, then A (10), B (11), C (12), D (13), E (14) and F (15). Each place is worth 16 times the one to its right, so two hex digits have place values 16 and 1. Because 16 = 2^{4}, one hex digit corresponds exactly to one **nibble** (4 bits), and a byte is always two hex digits, from 00 to FF (0 to 255).
P: Computers don't store hex; it is a notation for people. It is shorter than binary, easier to read and copy, and converts to binary without any arithmetic beyond each nibble.
X: Convert binary 10101111 to hex and denary, then hex 3C to denary.
> Split into nibbles: 1010 and 1111.
> 1010 = 10 = A; 1111 = 15 = F; so the hex is AF.
> Denary: A × 16 + F = 10 × 16 + 15 = 175.
> 3C: 3 × 16 + 12 = 60. In Python, \`hex(175)\` gives \`"0xaf"\` and \`int("3C", 16)\` gives 60.
K: One hex digit is exactly four bits, so convert between hex and binary nibble by nibble; to get denary, multiply the first hex digit by 16 and add the second.
H: Where hex is used
- **Colour codes** in HTML and CSS: #FF8000 is red 255, green 128, blue 0.
- **Memory addresses** and machine code in debuggers.
- **MAC addresses**, such as 00:1A:2B:3C:4D:5E.
- **Error codes** and Unicode code points, such as U+00E9 for é.
!: Converting hex to binary via denary for long numbers. Each hex digit maps directly to four bits; the detour through denary is slower and error-prone.
EV: established | Hexadecimal is used for memory addresses, colours and machine code because each digit maps exactly onto four bits.
EV: established | CSS colours written as #RRGGBB use two hex digits for each of the red, green and blue channels.
T: Hexadecimal | The base-16 number system, using digits 0 to 9 and A to F
T: Nibble | A group of four bits, represented by one hexadecimal digit
T: Byte | A group of eight bits, represented by two hexadecimal digits
SUM: Hexadecimal is base 16; each digit stands for four bits, so a byte is two hex digits.
SUM: It is used for colours, addresses and machine code because it is compact and converts easily.
SRC: OCR, GCSE Computer Science J277 specification, section 1.2.4 "Data storage": numbers | standard | 2020
SRC: W3C, CSS Color Module Level 4, section 5.2 "The RGB hexadecimal notations" | standard | 2022 | https://www.w3.org/TR/css-color-4/
Q: What denary value does hex digit B represent? | 11.
Q: How many bits does one hex digit represent? | Four (a nibble).
M1#computing-u06-02-q1@1: Which hex value equals binary 1111? | F | E | 15 | 1F | 1111 is 15 in denary, written F in hexadecimal.
M2#computing-u06-02-q2@2: What is hex 7D in denary? | 125 | 113 | 77 | 213 | 7 is in the sixteens column and D is 13 in the units column: 7 × 16 + 13 = 125.
M2#computing-u06-02-q3@3: What is denary 200 in hexadecimal? | C8 | B8 | 8C | C0 | 200 ÷ 16 = 12 remainder 8, and 12 is C, so 200 = C8.
TF1#computing-u06-02-q4@1: Computers store numbers in hexadecimal inside memory. | false | Memory stores binary; hexadecimal is a shorthand that makes binary easier for people to read.
SA3#computing-u06-02-q5@2,3: Explain why programmers use hexadecimal, and convert the binary value 11100101 to hex and to denary. | Hex is much shorter than binary (two digits per byte rather than eight), so it is easier to read, remember and copy without errors, and each digit converts directly to four bits, unlike denary. 11100101 splits into 1110 = 14 = E and 0101 = 5, giving E5. In denary, 14 × 16 + 5 = 229 (check: 128 + 64 + 32 + 4 + 1 = 229). | Shorter than binary ; Easier to read with fewer errors ; Direct four-bit mapping ; Correct hex E5 ; Correct denary 229

## Binary arithmetic and overflow
LV: GCSE · Application
S: Computers add numbers in binary using the same column method as denary, carrying a 1 whenever a column totals 2 or more. This lesson covers binary addition and what happens when a result is too big to fit, an overflow error.
O: Add two or three binary numbers of up to 8 bits
O: Explain what an overflow error is and identify when one occurs
O: Evaluate the consequences of overflow in real systems
H: The rules of binary addition
E: 0 + 0 = 0 ; 0 + 1 = 1 :: no carry
E: 1 + 1 = 10 :: write 0, carry 1
E: 1 + 1 + 1 = 11 :: write 1, carry 1
P: Add from the rightmost column to the left, writing the result digit and carrying into the next column, exactly as in denary.
X: Add 01101101 (109) and 00111011 (59).
> Column by column from the right: 1 + 1 = 0 carry 1; 0 + 1 + 1 = 0 carry 1; 1 + 0 + 1 = 0 carry 1; 1 + 1 + 1 = 1 carry 1.
> Next: 0 + 1 + 1 = 0 carry 1; 1 + 1 + 1 = 1 carry 1; 1 + 0 + 1 = 0 carry 1; 0 + 0 + 1 = 1.
> Result: 10101000.
> Check: 128 + 32 + 8 = 168, and 109 + 59 = 168.
K: In binary addition, 1 + 1 makes 0 carry 1, and 1 + 1 + 1 makes 1 carry 1; an overflow occurs when there is a carry out of the most significant bit.
H: Overflow
P: An **overflow error** happens when the result of a calculation is too large for the number of bits available. Adding 11001000 (200) and 01100100 (100) gives 1 00101100: the true answer 300 needs 9 bits. In an 8-bit register the 9th bit is lost, leaving 00101100, which is 44. The processor sets an **overflow flag** (or carry flag) so software can detect the problem.
- Python integers grow as needed, so they don't overflow, but fixed-size integers in C, Java and hardware registers do.
- Overflow has caused real failures: the Ariane 5 rocket was lost in 1996 after a 64-bit floating-point value was converted to a 16-bit integer that couldn't hold it.
!: Ignoring the final carry in an exam answer. If the carry goes beyond the available bits, say an overflow has occurred and give the truncated result.
EV: established | Binary addition follows the same column-and-carry rules as denary addition, which adder circuits implement directly (School 7).
EV: established | The inquiry into the 1996 Ariane 5 flight 501 failure found that an unprotected conversion overflow in the inertial reference software caused the loss.
T: Overflow error | An error that occurs when a result is too large to be stored in the number of bits available
T: Carry | A 1 passed to the next column when a column's total is 2 or more
T: Most significant bit | The leftmost bit, with the largest place value
SUM: Add binary column by column from the right, carrying when a column totals 2 or 3.
SUM: A carry out of the most significant bit means overflow: the stored result is wrong.
SRC: Lions J. L. et al., Ariane 5 Flight 501 Failure: Report by the Inquiry Board, ESA | primary | 1996
SRC: AQA, GCSE Computer Science 8525 specification, section 3.3.4 "Binary arithmetic" | standard | 2020
Q: What is 1 + 1 + 1 in binary? | 11: write 1 and carry 1.
Q: What is an overflow error? | When a result is too large for the available number of bits, so the extra bit is lost and the stored value is wrong.
M1#computing-u06-03-q1@1: What is 0101 + 0011 in binary? | 1000 | 0111 | 1001 | 0110 | 5 + 3 = 8, which is 1000; the carries ripple through every column.
M2#computing-u06-03-q2@2: In 8 bits, what is 11110000 + 00100000? | Overflow: 9 bits are needed and 00010000 is stored | 11010000 with no overflow | 100010000 stored in full | 11111111 because the register is full | 240 + 32 = 272, which exceeds 255; the ninth bit is lost, leaving 16.
TF1#computing-u06-03-q3@1: In binary addition, 1 + 1 gives 0 with a carry of 1. | true | 1 + 1 = 2, which is 10 in binary: write 0 and carry 1.
M3#computing-u06-03-q4@3: A game stores each player's score in an unsigned 8-bit integer. A player on 250 points earns 10 more. What score is displayed? | 4 | 260 | 255 | 0 | 260 needs 9 bits; dropping the ninth bit (256) leaves 4. This is why scores use larger integer types.
SA3#computing-u06-03-q5@2,3: Add 10011010 and 01110011 as 8-bit binary numbers, show your working, and explain the result. | From the right: 0 + 1 = 1; 1 + 1 = 0 carry 1; 0 + 0 + 1 = 1; 1 + 0 = 1; 1 + 1 = 0 carry 1; 0 + 1 + 1 = 0 carry 1; 0 + 1 + 1 = 0 carry 1; 1 + 0 + 1 = 0 carry 1. The result is 1 00001101: a carry out of the eighth bit. 154 + 115 = 269, which exceeds 255, so an overflow has occurred: only 00001101 (13) is stored and the overflow flag would be set. | Correct column working ; Identifies the final carry ; States overflow has occurred ; Gives the stored value 00001101 ; Explains with denary values

## Binary shifts
LV: GCSE · Application
S: A binary shift moves every bit of a number left or right. Shifting left multiplies by a power of 2 and shifting right divides by one, so processors use shifts as fast multiplication and division.
O: Carry out logical left and right shifts on a binary number
O: Explain the effect of a shift on the value of a number, including lost bits
O: Distinguish logical and arithmetic shifts and use shifts in Python
H: Shifting left and right
P: A **left shift** by n places moves every bit n places left and fills the right with 0s: this multiplies the value by 2^{n}, provided no 1 is shifted out of the top. A **logical right shift** by n places moves bits right and fills the left with 0s: this divides by 2^{n}, discarding any remainder (bits shifted off the right are lost).
E: left shift by n :: multiply by 2^{n}
E: right shift by n :: divide by 2^{n}, rounding down
X: Shift 00010110 (22).
> Left by 2: 01011000, which is 64 + 16 + 8 = 88 = 22 × 4.
> Right by 1: 00001011, which is 11 = 22 ÷ 2.
> Right by 3: 00000010, which is 2: 22 ÷ 8 = 2.75, and the bits for 0.75 were lost.
> Left by 4: 01100000 = 96, but the true answer 352 needed 9 bits: the leading 1 was shifted out, an overflow.
K: Each left shift doubles the value and each right shift halves it (rounding down); bits shifted out of either end are lost, which causes overflow or loss of precision.
H: Logical and arithmetic shifts
- A **logical** shift always fills with 0s: suited to unsigned numbers and bit patterns.
- An **arithmetic** right shift copies the sign bit into the gap, so a negative two's complement number stays negative: 11110000 (−16) becomes 11111000 (−8).
- In Python, \`x << n\` and \`x >> n\` shift integers; \`>>\` acts as an arithmetic shift on negative numbers.
- Shifts are among the fastest operations a processor can do, so compilers often replace multiplication by 8 with a shift by 3.
!: Forgetting that a right shift loses the bits that fall off the end. 7 shifted right by 1 is 3, not 3.5.
EV: established | A left shift by n multiplies an unsigned integer by 2^{n}, and a logical right shift divides it by 2^{n} with truncation.
EV: established | Python's documentation defines \`x << n\` as multiplication by 2^{n} and \`x >> n\` as floor division by 2^{n}, without overflow.
T: Binary shift | Moving all the bits of a binary number a number of places left or right
T: Logical shift | A shift that fills the vacated positions with 0s
T: Arithmetic shift | A right shift that fills vacated positions with copies of the sign bit, preserving the sign
SUM: Left shift by n multiplies by 2^{n}; right shift by n divides by 2^{n}, rounding down.
SUM: Bits shifted out are lost; arithmetic right shifts keep the sign of negative numbers.
SRC: Python Software Foundation, The Python Language Reference, section 6.8 "Shifting operations" | standard | 2024 | https://docs.python.org/3/reference/expressions.html
SRC: OCR, GCSE Computer Science J277 specification, section 1.2.4 "Data storage": binary shifts | standard | 2020
Q: What is the effect of shifting a binary number two places left? | It multiplies the value by 4 (2^{2}), if no 1 bits are lost.
Q: What happens to bits shifted off the right-hand end? | They are lost, so the result is rounded down.
M1#computing-u06-04-q1@1: What does a one-place left shift do to an unsigned binary number? | Multiplies it by 2 | Divides it by 2 | Adds 1 to it | Reverses its bits | Each bit moves to a place worth twice as much.
M2#computing-u06-04-q2@2: What is 01101000 after a logical right shift of 3 places? | 00001101 | 01000000 | 00011010 | 11010000 | Moving each bit three places right gives 00001101: 104 ÷ 8 = 13.
TF1#computing-u06-04-q3@3: Shifting 00000111 right by one place gives the value 3.5. | false | Integer shifts lose the bit shifted off; 7 ÷ 2 rounds down to 3 (00000011).
M3#computing-u06-04-q4@3: Why might a 4-place left shift of 00110000 give a wrong answer in an 8-bit register? | 1s are shifted out of the top, so the result overflows | Left shifts only work on odd numbers | Shifting by 4 divides by 16 instead | The register fills with 1s from the right | 48 × 16 = 768 needs 10 bits; the leading 1s are lost, leaving 00000000.
SA3#computing-u06-04-q5@2,3: Explain how binary shifts can be used to multiply and divide, using 00011001 as an example, and state their limitations. | Shifting left by n multiplies by 2^{n}: 00011001 (25) shifted left by 2 gives 01100100 (100). Shifting right by n divides by 2^{n}: shifted right by 2 it gives 00000110 (6), because 25 ÷ 4 = 6.25 and the remainder bits are lost. Limitations: only multiplication and division by powers of 2; left shifts can overflow when 1s leave the top; right shifts lose precision; and for negative two's complement numbers an arithmetic shift is needed to keep the sign. | Left shift multiplies with correct example ; Right shift divides with correct example ; Notes remainder or precision loss ; Notes overflow ; Notes powers of two or sign handling

## Two's complement
LV: A level · Application
S: Two's complement is the standard way computers store negative whole numbers. The most significant bit has a negative place value, which lets the same adder circuit handle subtraction. This lesson covers converting to and from two's complement and its range.
O: Represent negative integers in two's complement and convert them to denary
O: State the range of values representable in n bits of two's complement
O: Use two's complement to subtract by adding, and explain why it is preferred to sign and magnitude
H: A negative place value
P: In **two's complement**, the most significant bit has a negative place value. In 8 bits the place values are −128, 64, 32, 16, 8, 4, 2, 1. So 10000000 is −128 and 11111111 is −128 + 127 = −1. A leading 1 always means the number is negative; a leading 0 means it is zero or positive.
E: range in n bits: −2^{n − 1} to 2^{n − 1} − 1 :: 8 bits: −128 to 127
X: Represent −45 in 8-bit two's complement, then convert 11010110 to denary.
> 45 in binary is 00101101.
> Invert every bit: 11010010. Add 1: 11010011, which is −45.
> Check: −128 + 64 + 16 + 2 + 1 = −45.
> 11010110: −128 + 64 + 16 + 4 + 2 = −42.
K: To negate a two's complement number, invert all the bits and add 1; the most significant bit is worth −2^{n − 1}.
H: Why two's complement?
- **Sign and magnitude** uses the first bit only as a sign: it has two zeros (00000000 and 10000000) and needs special rules for addition.
- Two's complement has one zero and ordinary binary addition just works, so subtraction is done by adding the negation: 7 − 5 = 7 + (−5).
- 00000111 + 11111011 = 1 00000010; the carry out is discarded, leaving 2.
- Overflow is detected differently: adding two positives that give a negative result (or two negatives giving a positive) signals overflow.
!: Converting a negative number by inverting the bits without adding 1. That gives ones' complement, which is off by one: inverting 00101101 alone gives −46, not −45.
EV: established | Almost all modern processors represent signed integers in two's complement, and the C23 and C++20 standards now require it.
EV: established | Two's complement allows the same addition circuit to perform subtraction, with a single representation of zero.
T: Two's complement | A representation of signed integers in which the most significant bit has a negative place value
T: Sign and magnitude | A representation in which the first bit gives the sign and the rest the size of the number
T: Negation | Changing the sign of a number; in two's complement, inverting all bits and adding 1
SUM: In two's complement the MSB is worth −2^{n − 1}; 8 bits store −128 to 127.
SUM: Negate by inverting and adding 1; subtraction becomes addition of the negation.
SRC: AQA, A-level Computer Science 7517 specification, section 4.5.4 "Representing negative numbers" | standard | 2015
SRC: Harris D. M. and Harris S. L., Digital Design and Computer Architecture, 2nd edition, Morgan Kaufmann, section 1.4.6 | secondary | 2012
Q: What is the range of 8-bit two's complement? | −128 to 127.
Q: How do you find the two's complement of a binary number? | Invert every bit, then add 1.
M1#computing-u06-05-q1@1: In 8-bit two's complement, what does a most significant bit of 1 indicate? | The number is negative | The number is odd | An overflow has occurred | The number is larger than 127 | The MSB carries the place value −128, so a 1 there makes the number negative.
M2#computing-u06-05-q2@2: What is 11111100 in 8-bit two's complement? | −4 | 252 | −124 | −3 | The MSB is worth −128, so the value is −128 + 64 + 32 + 16 + 8 + 4 = −4.
M2#computing-u06-05-q3@3: What is −20 in 8-bit two's complement? | 11101100 | 10010100 | 11101011 | 00010100 | 20 is 00010100; inverting gives 11101011; adding 1 gives 11101100.
TF1#computing-u06-05-q4@2: Sign and magnitude has two different representations of zero. | true | 00000000 is +0 and 10000000 is −0, one reason two's complement is preferred.
SA3#computing-u06-05-q5@2,3: Show how a computer calculates 12 − 19 using 8-bit two's complement addition, and explain why it is done this way. | 12 = 00001100. 19 = 00010011; inverting gives 11101100 and adding 1 gives 11101101, which is −19. Adding: 00001100 + 11101101 = 11111001. This is negative; check: −128 + 64 + 32 + 16 + 8 + 1 = −7, and 12 − 19 = −7. Using two's complement means subtraction is just adding the negation, so the processor needs only one adder circuit, and there is a single representation of zero. | Represents 12 correctly ; Negates 19 correctly ; Adds correctly to 11111001 ; Converts the result to −7 ; Explains one adder or single zero

## Fixed-point and floating-point numbers
LV: A level · Evaluation
S: Real numbers with fractional parts are stored in binary either in fixed point, with the binary point in a set position, or in floating point, as a mantissa and an exponent. This lesson covers both, normalisation and the trade-off between range and precision.
O: Convert fixed-point binary numbers with a fractional part to denary
O: Convert floating-point numbers with a two's complement mantissa and exponent to denary, and normalise them
O: Evaluate fixed and floating point in terms of range, precision and rounding errors
H: Fixed point
P: In **fixed point**, the binary point sits in a fixed position. Places after the point are worth 1/2, 1/4, 1/8 and so on. In an 8-bit format with 4 bits before and 4 after the point, 0110.1010 is 4 + 2 + 0.5 + 0.125 = 6.625. Fixed point is simple and fast, but the range and precision are fixed by where the point is placed.
H: Floating point
P: **Floating point** stores a number as a **mantissa** (the significant digits) and an **exponent** (how far to move the binary point), like scientific notation: m × 2^{e}. In the A level format both are in two's complement, and the mantissa has its point just after the first (sign) bit.
X: Convert an 8-bit mantissa 0.1100000 with 4-bit exponent 0011.
> Exponent 0011 = 3, so move the binary point 3 places right.
> 0.1100000 becomes 0110.0000.
> 0110 = 6, so the number is 6.
> With exponent 1111 (−1) the point moves 1 place left instead: 0.01100000 = 0.25 + 0.125 = 0.375.
K: More bits in the mantissa give more precision; more bits in the exponent give a greater range. For a fixed total, one is traded for the other.
H: Normalisation and errors
- A **normalised** number starts 01 (positive) or 10 (negative): no wasted leading digits, so precision is maximised and each value has one representation.
- Many decimals, such as 0.1, have no exact binary form, so they are **rounded**: in Python \`0.1 + 0.2\` is 0.30000000000000004.
- **Underflow** occurs when a number is too small (too close to zero) to represent.
- Real computers use the IEEE 754 standard: a 64-bit double has a 52-bit fraction and an 11-bit exponent.
!: Comparing floating-point results with ==. Rounding means two calculations that should agree may differ in the last bit; compare within a small tolerance.
EV: established | IEEE 754 defines the floating-point formats used by almost all modern processors, including Python's float, which is a 64-bit double.
EV: established | Floating-point arithmetic introduces rounding errors because most decimal fractions can't be represented exactly in binary.
T: Mantissa | The part of a floating-point number holding its significant digits
T: Exponent | The part of a floating-point number giving the power of 2 by which the mantissa is multiplied
T: Normalisation | Adjusting a floating-point number so the mantissa has no redundant leading digits, maximising precision
SUM: Fixed point puts the binary point in a set place; floating point stores a mantissa and an exponent.
SUM: Mantissa bits give precision, exponent bits give range; normalise to maximise precision.
SRC: IEEE, IEEE Standard for Floating-Point Arithmetic (IEEE 754-2019) | standard | 2019 | https://doi.org/10.1109/IEEESTD.2019.8766229
SRC: Goldberg D., "What every computer scientist should know about floating-point arithmetic", ACM Computing Surveys 23(1), 5–48 | primary | 1991 | https://doi.org/10.1145/103162.103163
Q: In floating point, what does increasing the number of mantissa bits improve? | Precision.
Q: What does a normalised positive two's complement mantissa begin with? | 01.
M1#computing-u06-06-q1@1: What is fixed-point binary 0011.1000 in denary, with 4 bits after the point? | 3.5 | 3.8 | 35 | 7 | 0011 is 3 and .1000 is one half, giving 3.5.
M2#computing-u06-06-q2@3: Convert mantissa 0.1010000 with exponent 0010 to denary. | 2.5 | 10 | 0.625 | 1.25 | Move the point 2 places right: 010.10000, which is 2 + 0.5 = 2.5.
TF1#computing-u06-06-q3@2: Every decimal fraction, such as 0.1, can be stored exactly in binary floating point. | false | 0.1 is a recurring fraction in binary, so it is rounded; this causes small arithmetic errors.
M3#computing-u06-06-q4@3: A scientist needs to store both the mass of an electron and the mass of a galaxy in the same format. Which is most suitable? | Floating point, because the exponent gives a very large range | Fixed point with 8 bits after the point | Fixed point with no fractional bits | An unsigned 8-bit integer | Values from about 10^{-30} to 10^{42} kg need the range that an exponent provides.
SA3#computing-u06-06-q5@2,3: Compare fixed-point and floating-point representations, and explain the trade-off between range and precision in floating point. | Fixed point places the binary point in a set position: arithmetic is simple and fast and the precision is constant, but the range is small for a given number of bits, so very large and very small numbers can't both be stored. Floating point stores a mantissa and an exponent, so the point moves: a huge range is possible, but arithmetic is more complex and absolute precision varies with magnitude. With a fixed total number of bits, giving more to the mantissa increases precision but reduces the range of the exponent, and vice versa. Both suffer rounding errors for values with no exact binary form. | Describes fixed point and a strength ; Gives a fixed point limitation ; Describes floating point mantissa and exponent ; Explains the range and precision trade-off ; Mentions rounding errors

## Units of data
LV: GCSE · Foundation
S: Data sizes are measured in bits and bytes and in larger units such as kilobytes, megabytes and gigabytes. This lesson covers the units, the difference between decimal and binary prefixes and how to calculate file sizes and transfer times.
O: State the units of data from bit to petabyte and the size of each
O: Distinguish decimal prefixes (kilo, mega) from binary prefixes (kibi, mebi)
O: Calculate data sizes and transfer times and convert between units
H: The units
- 1 bit; 4 bits = 1 nibble; 8 bits = 1 **byte**.
- 1 **kilobyte** (kB) = 1,000 bytes; 1 **megabyte** (MB) = 1,000 kB.
- 1 **gigabyte** (GB) = 1,000 MB; 1 **terabyte** (TB) = 1,000 GB; 1 **petabyte** (PB) = 1,000 TB.
- Binary prefixes: 1 **kibibyte** (KiB) = 1,024 bytes; 1 mebibyte (MiB) = 1,024 KiB; 1 gibibyte (GiB) = 1,024 MiB.
H: Decimal or binary prefixes?
P: Historically "kilobyte" was often used for 1,024 bytes, because memory comes in powers of 2. The IEC introduced kibi-, mebi- and gibi- in 1998 to remove the ambiguity. AQA's GCSE uses the decimal prefixes for kB, MB and GB and the binary ones for KiB, MiB and GiB; check the convention in each question.
X: How long does a 2 GB file take to download at 50 megabits per second?
> Convert the file to bits: 2 GB = 2,000,000,000 bytes × 8 = 16,000,000,000 bits.
> 50 Mbit/s = 50,000,000 bits per second.
> Time = 16,000,000,000 ÷ 50,000,000 = 320 seconds.
> That is 5 minutes 20 seconds, ignoring protocol overheads. Note the speed is in bits (b) and the file in bytes (B).
P: Real transfers take longer than the calculation suggests, because protocols add headers and acknowledgements, and the connection is shared with other traffic. Storage devices also reserve some space for the file system.
K: Multiply by 8 to turn bytes into bits; divide by 1,000 (or 1,024 for binary prefixes) to move up a unit. Network speeds are quoted in bits per second, file sizes in bytes.
!: Mixing up b (bits) and B (bytes). A 100 Mb/s connection transfers at most 12.5 MB per second.
EV: established | The IEC standardised the binary prefixes kibi, mebi and gibi (1998), now in IEC 80000-13, to distinguish 1,024-based units from SI decimal prefixes.
EV: established | Storage manufacturers use decimal units, while some operating systems report sizes in binary units, so a "1 TB" drive appears as about 931 GiB.
T: Byte | A group of 8 bits
T: Kilobyte | 1,000 bytes (decimal prefix)
T: Kibibyte | 1,024 bytes (binary prefix)
SUM: 8 bits make a byte; kB, MB, GB, TB and PB step up by 1,000, KiB, MiB and GiB by 1,024.
SUM: Speeds are in bits per second and sizes in bytes: multiply bytes by 8 for transfer times.
SRC: International Electrotechnical Commission, IEC 80000-13:2008 Quantities and units, Part 13: Information science and technology | standard | 2008
SRC: AQA, GCSE Computer Science 8525 specification, section 3.3.2 "Units of information" | standard | 2020
Q: How many bytes are in a kibibyte? | 1,024.
Q: How many bits are in 3 bytes? | 24.
M1#computing-u06-07-q1@1: How many bits are in a byte? | 8 | 4 | 10 | 16 | A byte is 8 bits; a group of 4 bits is called a nibble.
M2#computing-u06-07-q2@2: How many megabytes are in 3.5 gigabytes, using decimal prefixes? | 3,500 MB | 3,584 MB | 350 MB | 35,000 MB | With decimal prefixes 1 GB = 1,000 MB, so 3.5 × 1,000 = 3,500 MB.
TF1#computing-u06-07-q3@1: A 100 megabit per second connection can transfer 100 megabytes every second. | false | Speeds are in bits: 100 Mbit/s is at most 12.5 MB/s, since a byte is 8 bits.
M3#computing-u06-07-q4@3: A 600 MB video is uploaded at 20 Mbit/s. Approximately how long does it take, ignoring overheads? | 4 minutes | 30 seconds | 30 minutes | 4 seconds | 600 MB × 8 = 4,800 Mbit; 4,800 ÷ 20 = 240 seconds, which is 4 minutes.
SA3#computing-u06-07-q5@2,3: Explain why a new 1 TB hard drive might be shown by a computer as having about 931 GB, and how to avoid confusion. | The manufacturer uses decimal prefixes: 1 TB = 10^{12} bytes. Some operating systems divide by powers of 1,024 but label the result GB: 10^{12} ÷ 1,024^{3} ≈ 931, which is really 931 GiB. No storage is missing; the units differ. Using the IEC binary prefixes (GiB, TiB) for 1,024-based sizes and SI prefixes (GB, TB) for 1,000-based sizes removes the ambiguity. | Manufacturer uses 10^{12} bytes ; OS divides by 1,024 powers ; Calculates about 931 ; Explains nothing is missing ; Recommends binary prefixes

## Character sets: ASCII and Unicode
LV: GCSE · Application
S: Text is stored by giving every character a number, its code, defined by a character set. This lesson covers ASCII and Unicode, how codes are ordered and why Unicode replaced ASCII for most purposes.
O: Explain how a character set represents text as binary codes
O: Compare ASCII and Unicode, including the number of bits and characters each supports
O: Use character codes to solve problems, such as converting case, with ord() and chr()
H: Codes for characters
P: A **character set** maps each character to a unique binary code. **ASCII** (American Standard Code for Information Interchange, 1963) uses **7 bits**, giving 128 codes: control characters, the digits, upper- and lower-case English letters and punctuation. It is usually stored in a byte, and **extended ASCII** sets use the 8th bit for 128 more characters, differing between countries.
P: Codes are in order within groups: "A" is 65, "B" 66, … "Z" 90; "a" is 97; "0" is 48. Upper and lower case differ by 32, which is why sorting by code puts capitals first. The digit "7" (code 55) is different from the number 7.
X: Use codes in Python to shift a letter.
> \`ord("C")\` returns 67, the code of "C".
> \`ord("C") + 32\` is 99; \`chr(99)\` returns "c", the lower-case letter.
> \`chr(ord("C") + 1)\` returns "D".
> The same idea underlies the Caesar cipher in a later lesson.
K: Every character is stored as a number from a character set; ASCII has 128 codes in 7 bits, while Unicode covers every writing system with over a million possible code points.
H: Unicode
- **Unicode** gives a code point to every character in the world's writing systems, plus symbols and emoji: over 150,000 characters are assigned.
- Its first 128 code points are identical to ASCII, so ASCII text is valid Unicode.
- **UTF-8** stores each character in 1 to 4 bytes: English text stays compact, other scripts use more.
- UTF-16 and UTF-32 use 2 or 4 bytes per unit; UTF-8 is used by the great majority of web pages.
!: Saying Unicode always uses 16 bits per character. Unicode is the set of code points; UTF-8, UTF-16 and UTF-32 are different encodings, and UTF-8 is variable-length.
EV: established | Unicode's first 128 code points match ASCII, and UTF-8 encodes them as single bytes identical to ASCII.
EV: established | UTF-8 is by far the most common character encoding on the web.
T: Character set | A defined list of characters, each with a unique binary code
T: ASCII | A 7-bit character set of 128 characters, mainly for English
T: Unicode | A character set covering the characters of all writing systems, encoded in UTF-8, UTF-16 or UTF-32
SUM: Characters are stored as codes from a character set; ASCII uses 7 bits for 128 characters.
SUM: Unicode covers all scripts; UTF-8 is variable-length and backward compatible with ASCII.
SRC: The Unicode Consortium, The Unicode Standard, Version 15.1 | standard | 2023 | https://www.unicode.org/versions/latest/
SRC: Python Software Foundation, Unicode HOWTO | guidance | 2024 | https://docs.python.org/3/howto/unicode.html
Q: How many characters can 7-bit ASCII represent? | 128.
Q: What does ord("A") return in Python? | 65, the character code of "A".
M1#computing-u06-08-q1@1: Why was Unicode introduced? | ASCII couldn't represent the characters of most of the world's languages | ASCII used too many bits per character | ASCII couldn't store digits | Unicode is faster to type on a keyboard | 128 codes cover only basic English; Unicode covers every writing system.
M2#computing-u06-08-q2@2: "A" has code 65. What is the code of "E"? | 69 | 70 | 101 | 5 | Letters are in order: A 65, B 66, C 67, D 68, E 69.
TF1#computing-u06-08-q3@2: In ASCII, upper-case letters have lower codes than the corresponding lower-case letters. | true | "A" is 65 and "a" is 97; capitals come 32 codes earlier.
M3#computing-u06-08-q4@3: A text file of 1,000 English letters is saved in UTF-8 and in UTF-32. About how big is each? | About 1,000 bytes in UTF-8 and 4,000 bytes in UTF-32 | Both about 1,000 bytes | About 4,000 bytes in UTF-8 and 1,000 in UTF-32 | Both about 4,000 bytes | UTF-8 uses one byte for ASCII characters; UTF-32 always uses four.
SA3#computing-u06-08-q5@2,3: Compare ASCII and Unicode and explain why Unicode with UTF-8 is used for most text today. | ASCII uses 7 bits for 128 characters, enough for English letters, digits and punctuation but not for accented letters, other scripts or symbols; extended ASCII variants were incompatible between countries. Unicode assigns a code point to every character of every writing system, plus emoji, so one standard handles all languages. UTF-8 encodes ASCII characters in one byte, identical to ASCII, and others in two to four bytes, so English text stays compact, old ASCII files remain valid and every language can be mixed in one document. The cost is that some characters take more storage. | ASCII bits and character count ; ASCII limitation ; Unicode covers all scripts ; UTF-8 variable length and ASCII compatible ; Notes the storage trade-off

## Bitmap images
LV: GCSE · Application
S: A bitmap image is a grid of pixels, each stored as a binary colour code. This lesson covers resolution, colour depth and metadata, and how to calculate the file size of an image.
O: Explain how a bitmap image is represented using pixels and colour depth
O: Calculate the file size of a bitmap image
O: Evaluate the effect of changing resolution and colour depth on quality and file size
H: Pixels and colour depth
P: A **bitmap** image is a grid of **pixels** (picture elements). Each pixel's colour is stored as a binary number. The **colour depth** is the number of bits per pixel: 1 bit gives 2 colours (black and white), 8 bits give 256 colours, and 24 bits (8 each for red, green and blue) give over 16.7 million colours.
P: The **image resolution** is the number of pixels, written width × height, such as 1920 × 1080. More pixels capture more detail. **Metadata** stored with the image (width, height, colour depth, date, camera settings) tells software how to display it.
E: file size in bits = width × height × colour depth :: excluding metadata
X: Calculate the size of a 1920 × 1080 image with 24-bit colour.
> Pixels: 1920 × 1080 = 2,073,600.
> Bits: 2,073,600 × 24 = 49,766,400 bits.
> Bytes: ÷ 8 = 6,220,800 bytes, about 6.2 MB.
> Halving the colour depth to 12 bits would halve the size but reduce the colours from 16.7 million to 4,096.
K: A bitmap's size is width × height × colour depth bits: more pixels or more bits per pixel improve quality but increase file size proportionally.
H: Trade-offs
- Doubling both width and height quadruples the number of pixels and the file size.
- Increasing colour depth by 1 bit doubles the number of colours, but adds only one bit per pixel.
- Enlarging a bitmap beyond its resolution makes pixels visible (pixelation).
- Formats such as PNG and JPEG compress bitmaps to reduce the size.
!: Confusing image resolution with the screen's pixel density (pixels per inch). An image's resolution is its pixel count; how big it looks depends on the device displaying it.
EV: established | The uncompressed size of a bitmap is the product of its width, height and colour depth.
EV: established | 24-bit "true colour" gives 2^{24} = 16,777,216 colours, more than the human eye can distinguish in most conditions.
T: Pixel | The smallest element of a bitmap image, with a single colour
T: Colour depth | The number of bits used to store the colour of each pixel
T: Metadata | Data about data, such as an image's width, height and colour depth
SUM: Bitmaps are grids of pixels; colour depth sets the colours per pixel.
SUM: Size = width × height × colour depth bits; quality and size rise together.
SRC: AQA, GCSE Computer Science 8525 specification, section 3.3.7 "Representing images" | standard | 2020
SRC: W3C, Portable Network Graphics (PNG) Specification, Third Edition | standard | 2025 | https://www.w3.org/TR/png-3/
Q: How many colours can a colour depth of 4 bits represent? | 16 (2^{4}).
Q: What is metadata in an image file? | Data about the image, such as its width, height and colour depth, used to display it correctly.
M1#computing-u06-09-q1@1: What is colour depth? | The number of bits used to store each pixel's colour | The number of pixels in the image | The brightness of the screen | The number of colours in the image's file name | Colour depth is bits per pixel, which decides how many colours are available.
M2#computing-u06-09-q2@2: What is the size in bytes of a 100 × 50 image with a colour depth of 8 bits? | 5,000 bytes | 40,000 bytes | 625 bytes | 400 bytes | 100 × 50 = 5,000 pixels × 8 bits = 40,000 bits, which is 5,000 bytes.
TF1#computing-u06-09-q3@3: Doubling the width and the height of a bitmap doubles its file size. | false | The number of pixels is width × height, so doubling both quadruples it.
M3#computing-u06-09-q4@3: An image is changed from 8-bit to 16-bit colour depth at the same resolution. What happens? | The file size doubles and the colours rise from 256 to 65,536 | The file size doubles and the colours double to 512 | The file size stays the same but the colours increase | The resolution doubles | Each pixel now needs twice as many bits, and 2^{16} = 65,536 colours are possible.
SA3#computing-u06-09-q5@2,3: A photographer wants smaller image files for a website. Evaluate reducing resolution and reducing colour depth as ways to do this. | Reducing resolution (for example from 4000 × 3000 to 2000 × 1500) quarters the number of pixels and the file size; on a web page this may be unnoticeable, since screens show far fewer pixels, but fine detail is lost and enlarging later shows pixelation. Reducing colour depth (24-bit to 8-bit) cuts size to a third but limits the image to 256 colours, causing banding in skies and skin tones, which suits photographs poorly. For photos, reducing resolution to the display size, then using lossy compression such as JPEG, is usually better than reducing colour depth. | Effect of resolution on size ; Effect of resolution on quality ; Effect of colour depth on size ; Effect of colour depth on quality ; Reaches a justified recommendation

## Vector graphics
LV: A level · Application
S: Vector graphics store an image as a list of shapes and their properties rather than as pixels. This lesson compares vector and bitmap graphics and explains when each is the right choice.
O: Describe how a vector graphic is represented as objects with properties
O: Compare vector and bitmap images for scaling, file size and suitability
O: Choose an appropriate image representation for a given use
H: Shapes and properties
P: A **vector graphic** stores a **drawing list** of objects, such as lines, circles, rectangles, polygons, curves and text. Each object has **properties**: position, size, line colour, line thickness and fill colour. To display the image, software calculates which pixels each shape covers at the required size. SVG (Scalable Vector Graphics) is the standard vector format on the web.
X: Represent a simple logo as vectors.
> A circle: centre (50, 50), radius 40, fill red, line black, thickness 2.
> A rectangle: corner (30, 40), width 40, height 20, fill white.
> Text: "GO" at (38, 55), font size 16.
> In SVG the circle is written as a circle element with cx, cy, r and fill attributes; the file is a few hundred bytes at any display size.
K: Vector images are drawn from mathematical descriptions, so they scale to any size without losing quality and are usually small; bitmaps are better for complex, photographic images.
H: Vector or bitmap?
- **Scaling**: vectors stay sharp at any size; bitmaps pixelate when enlarged.
- **File size**: vectors depend on the number of objects, not the display size; bitmaps depend on resolution.
- **Editing**: each vector object can be moved and changed separately; bitmap editing changes pixels.
- **Realism**: photographs and complex textures need bitmaps; vectors suit logos, diagrams, fonts, maps and icons.
P: Fonts are vector outlines, which is why text stays crisp when you zoom. Displays are grids of pixels, so every vector image is **rasterised** into a bitmap before it is shown.
!: Thinking vector files are always smaller. A complex illustration with millions of objects can be larger than an equivalent bitmap, and a photo can't sensibly be stored as vectors.
EV: established | Vector graphics are resolution-independent: they are rendered to the output device's resolution at display time.
EV: established | SVG is a W3C standard, and outline font formats such as TrueType and OpenType store glyphs as vector curves.
T: Vector graphic | An image stored as a list of shapes and their properties rather than as pixels
T: Drawing list | The list of objects and their properties that makes up a vector graphic
T: Rasterisation | Converting a vector description into pixels for display
SUM: Vector graphics are lists of objects with properties, drawn at display time.
SUM: They scale without loss and suit logos, diagrams and fonts; bitmaps suit photographs.
SRC: W3C, Scalable Vector Graphics (SVG) 2 | standard | 2018 | https://www.w3.org/TR/SVG2/
SRC: AQA, A-level Computer Science 7517 specification, section 4.5.6.5 "Vector graphics" | standard | 2015
Q: What does a vector graphic store? | A list of objects (shapes, lines, text) and their properties, such as position, size and colour.
Q: Why don't vector images pixelate when enlarged? | They are redrawn from their mathematical descriptions at the new size.
M1#computing-u06-10-q1@1: Which is a property of a circle in a vector graphic? | Its radius | Its colour depth | Its number of pixels | Its sample rate | A circle is described by properties such as centre, radius and colours.
M2#computing-u06-10-q2@2: Which image is best stored as a vector graphic? | A company logo used on business cards and billboards | A holiday photograph of a beach | A scanned handwritten letter | A frame from a video | The logo must scale from tiny to huge without losing sharpness, and is made of simple shapes.
TF1#computing-u06-10-q3@2: The file size of a vector graphic depends on how large it is displayed. | false | It depends on the number and complexity of objects; the display size doesn't change the stored description.
M3#computing-u06-10-q4@3: Why are photographs normally stored as bitmaps rather than vectors? | Their continuous detail would need an enormous number of shapes to describe | Vector formats can't store any colour | Bitmaps can be enlarged without pixelation | Vector graphics can't be displayed on screens | Natural scenes have no simple geometric structure, so pixels are the efficient representation.
SA3#computing-u06-10-q5@2,3: Compare vector and bitmap graphics, and recommend a format for a website's icons and for its product photographs. | Bitmaps store a colour for every pixel, so they capture photographic detail, but their size grows with resolution and they pixelate when enlarged. Vectors store shapes with properties, so they scale perfectly, are often small and are easy to edit, but can't represent photographic detail efficiently. Icons are simple shapes shown at many sizes on different screens, so vectors (SVG) suit them. Product photographs need realistic detail, so compressed bitmaps (JPEG or WebP) suit them. | Describes bitmaps with a strength and weakness ; Describes vectors with a strength and weakness ; Recommends vectors for icons ; Recommends bitmaps for photos ; Justifies both choices

## Sound
LV: GCSE · Application
S: Sound is an analogue wave, so it must be sampled to be stored digitally. This lesson explains sampling, sample rate and sample resolution, how to calculate the size of a sound file and the trade-off between quality and size.
O: Explain how analogue sound is converted to digital by sampling
O: Calculate the file size of a sound recording from sample rate, resolution, duration and channels
O: Evaluate the effect of sample rate and sample resolution on quality and file size
H: Sampling
P: A microphone turns sound into a continuously varying (analogue) electrical signal. An **analogue-to-digital converter** (ADC) measures the signal's amplitude at regular intervals; each measurement is a **sample**, stored as a binary number. The **sample rate** is the number of samples per second, in hertz (Hz). The **sample resolution** (bit depth) is the number of bits per sample.
P: CD-quality audio uses 44,100 samples per second at 16 bits per sample in stereo (two channels). The Nyquist–Shannon sampling theorem says the sample rate must be more than twice the highest frequency to be captured; humans hear up to about 20,000 Hz, which is why 44.1 kHz was chosen.
E: file size in bits = sample rate × sample resolution × seconds × channels :: uncompressed
X: Calculate the size of one minute of CD-quality stereo audio.
> Sample rate 44,100 Hz; resolution 16 bits; 60 seconds; 2 channels.
> 44,100 × 16 × 60 × 2 = 84,672,000 bits.
> ÷ 8 = 10,584,000 bytes, about 10.6 MB.
> An hour would be about 635 MB, which is why music is usually compressed.
K: A higher sample rate captures higher frequencies and a higher resolution captures amplitude more precisely; both increase file size proportionally.
H: Quality and size
- Higher **sample rate**: more samples per second, closer to the original wave, larger file.
- Higher **sample resolution**: more possible amplitude levels (16 bits give 65,536), less quantisation noise, larger file.
- Telephone speech uses about 8,000 Hz at 8 bits: small but muffled.
- Compression formats such as MP3 and AAC (lossy) or FLAC (lossless) reduce the size.
!: Thinking sample resolution is the number of samples. Resolution is the bits per sample; the number of samples per second is the sample rate.
EV: established | The Nyquist–Shannon theorem states that a signal can be reconstructed from samples taken at more than twice its highest frequency.
EV: established | The CD audio standard (Red Book, 1980) specifies 44.1 kHz sampling at 16 bits per sample in two channels.
T: Sample rate | The number of samples of a sound taken per second, measured in hertz
T: Sample resolution | The number of bits used to store each sample (bit depth)
T: Analogue-to-digital converter | A device that measures an analogue signal at intervals and outputs binary values
SUM: Sound is sampled at regular intervals; each sample's amplitude is stored in binary.
SUM: Size = sample rate × resolution × seconds × channels; quality and size rise together.
SRC: Shannon C. E., "Communication in the presence of noise", Proceedings of the IRE 37(1), 10–21 | primary | 1949 | https://doi.org/10.1109/JRPROC.1949.232969
SRC: OCR, GCSE Computer Science J277 specification, section 1.2.4 "Data storage": sound | standard | 2020
Q: What is the sample rate of a sound recording? | The number of samples taken per second, measured in hertz.
Q: What is the formula for the size of an uncompressed sound file? | Sample rate × sample resolution × duration in seconds × number of channels (in bits).
M1#computing-u06-11-q1@1: What does increasing the sample resolution do? | Stores each sample's amplitude more precisely and increases the file size | Takes more samples every second | Makes the recording longer | Reduces the file size without loss | Resolution is bits per sample: more bits mean more possible levels and a bigger file.
M2#computing-u06-11-q2@2: What is the size of a 10-second mono recording at 8,000 Hz and 8 bits per sample? | 80,000 bytes | 640,000 bytes | 8,000 bytes | 10,000 bytes | 8,000 × 8 × 10 = 640,000 bits, which is 80,000 bytes.
TF1#computing-u06-11-q3@1: A sound file recorded at a higher sample rate will be larger, all else being equal. | true | More samples are stored per second, so the file grows in proportion.
M3#computing-u06-11-q4@3: Why does CD audio use a sample rate of 44,100 Hz rather than 20,000 Hz? | To capture frequencies up to about 20 kHz, the rate must be more than double that | Because 20,000 Hz would make files larger | Because human hearing goes up to 44,100 Hz | Because 44,100 is a power of 2 | The Nyquist–Shannon theorem requires sampling at over twice the highest frequency to be reproduced.
SA3#computing-u06-11-q5@2,3: A podcast producer wants smaller files. Evaluate reducing the sample rate and reducing the sample resolution of the recordings. | Halving the sample rate (44.1 kHz to 22.05 kHz) halves the size; speech contains little above 10 kHz, so voices remain clear, though music and sibilants lose brightness. Reducing resolution (16 to 8 bits) also halves the size but adds noticeable quantisation noise and hiss, with only 256 amplitude levels. Mono instead of stereo halves the size too. For speech, a lower sample rate and mono with 16-bit resolution, followed by compression (such as MP3 or AAC), gives small files with acceptable quality. | Effect of sample rate on size and quality ; Effect of resolution on size and quality ; Relates to speech content ; Mentions channels or compression ; Reaches a justified recommendation

## Lossy and lossless compression
LV: GCSE · Application
S: Compression reduces the size of a file so it takes less storage and transfers faster. Lossless compression lets the original be rebuilt exactly; lossy compression permanently removes data people are unlikely to notice. This lesson compares them.
O: Explain the reasons for compressing data
O: Distinguish lossy from lossless compression with examples of formats
O: Choose and justify a compression method for a given type of file
H: Why compress?
P: **Compression** uses fewer bits to represent data. Smaller files take less storage, transfer faster over networks, use less bandwidth (and data allowance) and make streaming possible. The cost is processing time to compress and decompress.
H: Two kinds
- **Lossless** compression finds and encodes redundancy (patterns, repeats) so the original can be reconstructed exactly. Examples: ZIP, PNG, FLAC, GIF. Essential for text, program code and spreadsheets.
- **Lossy** compression permanently discards data judged least noticeable, achieving much greater reductions. Examples: JPEG (photos), MP3 and AAC (audio), H.264 and H.265 (video).
P: Lossy methods exploit human perception: JPEG discards fine colour detail that the eye barely sees; MP3 removes sounds masked by louder ones. Compressing a lossy file again loses more each time (generation loss).
X: Choose compression for four files.
> A Python program: lossless (ZIP), because losing one character could break it.
> A holiday photo for social media: lossy (JPEG), cutting the size by around 10 times with little visible change.
> A screenshot with text and sharp edges: lossless (PNG), because JPEG blurs edges.
> A master recording in a music studio: lossless (FLAC), so later edits start from full quality.
K: Use lossless compression when every bit matters or the file will be edited further; use lossy compression for media where much smaller files matter more than a perfect copy.
!: Thinking lossless compression can shrink any file. Data with no redundancy, such as already compressed or random data, can't be made smaller and may even grow slightly.
EV: established | No lossless compression algorithm can shrink every possible input, by a counting (pigeonhole) argument.
EV: established | Lossy codecs such as JPEG and MP3 rely on models of human perception to discard data that is least noticeable.
T: Compression | Reducing the number of bits needed to store or transmit data
T: Lossless compression | Compression that allows the original data to be reconstructed exactly
T: Lossy compression | Compression that permanently removes some data to achieve a smaller file
SUM: Compression saves storage and transmission time at the cost of processing.
SUM: Lossless rebuilds the original exactly; lossy discards data people are unlikely to notice.
SRC: Sayood K., Introduction to Data Compression, 5th edition, Morgan Kaufmann | secondary | 2017
SRC: Wallace G. K., "The JPEG still picture compression standard", IEEE Transactions on Consumer Electronics 38(1), xviii–xxxiv | primary | 1992 | https://doi.org/10.1109/30.125072
Q: What is the difference between lossy and lossless compression? | Lossless lets the original be rebuilt exactly; lossy permanently removes some data for a smaller file.
Q: Name a lossy and a lossless file format. | Lossy: JPEG or MP3. Lossless: PNG, ZIP or FLAC.
M1#computing-u06-12-q1@1: Which type of compression should be used for a program's source code? | Lossless | Lossy | Either, because code is text | Neither, because code can't be compressed | Every character must be restored exactly, so only lossless compression is acceptable.
M2#computing-u06-12-q2@2: Which format uses lossy compression? | MP3 | PNG | ZIP | FLAC | MP3 removes sounds the ear is unlikely to notice; the others are lossless.
TF1#computing-u06-12-q3@3: Repeatedly opening and resaving a JPEG image can gradually reduce its quality. | true | Each save applies lossy compression again, discarding more data (generation loss).
M3#computing-u06-12-q4@3: A hospital stores X-ray images that doctors examine for tiny fractures. Which compression is most appropriate? | Lossless, because lost detail could affect a diagnosis | Lossy, because the files are very large | Lossy at the highest compression level | No compression is possible for medical images | Fine detail matters clinically, so exact reconstruction outweighs the extra storage.
SA3#computing-u06-12-q5@2,3: A video-streaming service and a cloud backup service both compress data. Compare the compression each should use and explain why. | The streaming service should use lossy compression (such as H.264 or H.265): video is huge, viewers accept small losses they barely notice, and much smaller files allow smooth streaming over limited bandwidth and lower costs. The backup service must use lossless compression (such as ZIP or zstd): users expect files back exactly as saved, and any change could corrupt documents or programs. Lossless gives smaller savings, especially on already compressed media, but correctness matters more. | Lossy for streaming ; Justifies with size or bandwidth ; Lossless for backup ; Justifies with exact restoration ; Notes the trade-off in savings

## Run-length encoding
LV: GCSE · Application
S: Run-length encoding (RLE) is a simple lossless compression method that replaces runs of repeated values with a count and the value. This lesson covers encoding, decoding and when RLE works well or badly.
O: Describe how run-length encoding compresses data
O: Encode and decode data using run-length encoding
O: Evaluate the effectiveness of RLE for different kinds of data
H: Counting runs
P: **Run-length encoding** replaces each **run** (a sequence of the same value) with a pair: how many times it repeats and the value. "AAAABBBCCD" becomes 4A 3B 2C 1D. Because the original can be rebuilt exactly, RLE is lossless.
P: RLE suits data with long runs: simple images with large areas of one colour, such as icons, diagrams and fax pages, and parts of other compression schemes. It is used inside formats such as TIFF and older BMP and PCX files.
X: Encode one row of a black-and-white image: 0000000011110000 (16 pixels).
> Runs: eight 0s, four 1s, four 0s.
> Encoded as pairs: (8, 0), (4, 1), (4, 0).
> If each count and value is stored in 8 bits, that is 6 bytes, compared with 16 pixels at 1 bit each, 2 bytes: here RLE made the data larger.
> With 1,000-pixel runs, RLE would shrink the row dramatically. Whether it helps depends on the data and on how pairs are stored.
K: RLE works well when data contains long runs of repeated values and badly when values change often, where it can make the data larger.
H: Strengths and weaknesses
- Simple and fast to encode and decode.
- Lossless: the original is restored exactly.
- Excellent for long runs; useless or harmful for photographs and text, where values rarely repeat consecutively.
- "ABCD" becomes 1A1B1C1D, twice as long.
!: Forgetting to decode a count of 10 or more correctly. "12W" means twelve Ws, not one W and two Ws; a fixed field size or separator avoids ambiguity.
EV: established | Run-length encoding is lossless and is effective only on data with long runs of repeated symbols.
EV: established | RLE was used in fax transmission standards (ITU-T T.4) and is still used inside some image formats.
T: Run-length encoding | A lossless compression method that stores each run of repeated values as a count and the value
T: Run | A sequence of consecutive identical values
T: Frequency-value pair | A pair giving how many times a value repeats and the value itself
SUM: RLE replaces each run with a count and a value, and is lossless.
SUM: It suits data with long runs and can enlarge data that changes often.
SRC: AQA, GCSE Computer Science 8525 specification, section 3.3.8 "Data compression" | standard | 2020
SRC: Salomon D. and Motta G., Handbook of Data Compression, 5th edition, Springer, section 1.4 | secondary | 2010
Q: Is run-length encoding lossy or lossless? | Lossless.
Q: For what kind of data does RLE work best? | Data with long runs of repeated values, such as simple images with large blocks of one colour.
M1#computing-u06-13-q1@1: How does RLE compress the string WWWWBB? | As 4W 2B | As W4 B2 B | As WB | As 6WB | Each run becomes a count followed by the repeated value.
M2#computing-u06-13-q2@2: Decode the RLE data 3R 1G 2B. | RRRGBB | RGB | 3R1G2B | RRRGGBB | Each pair is a count then a value: three Rs, one G and two Bs.
TF1#computing-u06-13-q3@2: Run-length encoding always makes a file smaller. | false | With few repeated values, every single item needs a count too, so the encoded data can be larger.
M3#computing-u06-13-q4@3: Why is RLE a poor choice for compressing a detailed photograph? | Neighbouring pixels rarely have exactly the same colour, so runs are short and pairs add overhead | RLE is lossy and would blur the photograph | RLE can only compress text | Photographs have no binary representation | Natural images vary slightly from pixel to pixel; methods such as JPEG suit them far better.
SA3#computing-u06-13-q5@2,3: Encode the row YYYYYYBBBBYYY using RLE, calculate the saving if each character and each count takes one byte, and evaluate RLE for this kind of data. | Runs: six Y, four B, three Y, so the encoding is 6Y 4B 3Y. Original: 13 characters = 13 bytes. Encoded: 3 pairs × 2 bytes = 6 bytes, a saving of 7 bytes (about 54%). RLE suits this kind of data because it contains long runs; it is simple, fast and lossless. For data with frequent changes, such as text or photographs, it would give little benefit or even increase the size. | Correct encoding ; Correct original size ; Correct encoded size ; Calculates the saving ; Evaluates suitability for different data

## Huffman coding
LV: A level · Application
S: Huffman coding is a lossless compression method that gives short binary codes to frequent characters and longer codes to rare ones. This lesson covers building a Huffman tree, reading off the codes and calculating the saving.
O: Explain how Huffman coding uses character frequencies to compress data
O: Build a Huffman tree and derive the code for each character
O: Calculate the number of bits saved compared with a fixed-length code
H: Variable-length codes
P: In ASCII every character takes the same number of bits. **Huffman coding** (David Huffman, 1952) instead gives the most frequent characters the shortest codes. The codes are **prefix-free**: no code is the start of another, so a bit stream can be decoded without separators.
- Count the frequency of each character.
- Treat each character as a node; repeatedly join the two nodes with the lowest frequencies under a new node whose frequency is their sum.
- Continue until one tree remains.
- Label each left branch 0 and each right branch 1; a character's code is the path from the root to its leaf.
X: Compress "ABRACADABRA" (A 5, B 2, R 2, C 1, D 1).
> Join C and D (2). Join B and R (4). Join CD (2) and BR (4) to make 6. Join A (5) and the 6-node to make the root (11).
> Codes: A = 0; C = 100, D = 101; B = 110, R = 111.
> Bits: 5 × 1 + 2 × 3 + 2 × 3 + 1 × 3 + 1 × 3 = 23 bits.
> In 8-bit ASCII the 11 characters need 88 bits, so Huffman saves 65 bits (the tree must also be stored to decode).
K: Huffman coding gives frequent characters shorter codes; because the codes are prefix-free, a stream of bits decodes unambiguously by following the tree from the root.
H: Strengths and limits
P: Huffman coding is optimal among codes that assign a whole number of bits to each character, and is used inside ZIP (DEFLATE), JPEG and MP3. Its savings depend on uneven frequencies: if every character is equally common, it saves little. The tree (or the frequency table) must be stored or sent with the data, which matters for short messages.
!: Assuming there is only one correct Huffman tree. Ties in frequency can be broken in different ways, giving different codes with the same total number of bits.
EV: established | Huffman coding produces an optimal prefix code for given symbol frequencies (Huffman, 1952).
EV: established | Huffman coding is part of the DEFLATE algorithm used in ZIP, gzip and PNG.
T: Huffman coding | A lossless compression method giving shorter binary codes to more frequent characters
T: Prefix-free code | A set of codes in which no code is the beginning of another, so messages decode unambiguously
T: Huffman tree | A binary tree built from character frequencies, whose paths give each character's code
SUM: Huffman coding builds a tree by repeatedly joining the two least frequent nodes.
SUM: Frequent characters get short codes; codes are prefix-free; the tree must be stored to decode.
SRC: Huffman D. A., "A method for the construction of minimum-redundancy codes", Proceedings of the IRE 40(9), 1098–1101 | primary | 1952 | https://doi.org/10.1109/JRPROC.1952.273898
SRC: Deutsch P., RFC 1951: DEFLATE Compressed Data Format Specification version 1.3, IETF | standard | 1996 | https://www.rfc-editor.org/rfc/rfc1951
Q: Which characters get the shortest codes in Huffman coding? | The most frequent characters.
Q: What does prefix-free mean for Huffman codes? | No code is the start of another code, so a bit stream can be decoded without separators.
M1#computing-u06-14-q1@1: What does Huffman coding use to decide the length of each character's code? | How often each character occurs | The character's ASCII code | The position of the character in the alphabet | The length of the file name | Frequent characters get shorter codes, which minimises the total number of bits.
M2#computing-u06-14-q2@3: With codes A = 0, B = 10, C = 11, what does the bit stream 0101100 decode to? | ABCAA | ABBAA | ACBAA | AABCA | Read from the start: 0 = A, 10 = B, 11 = C, 0 = A, 0 = A.
TF1#computing-u06-14-q3@2: When building a Huffman tree, the two nodes with the highest frequencies are joined first. | false | The two lowest-frequency nodes are joined first, so rare characters end up deepest with the longest codes.
M3#computing-u06-14-q4@3: A message uses 4 characters, each appearing exactly 25 times. How effective is Huffman coding compared with a fixed 2-bit code? | It gives no saving, because equal frequencies give every character a 2-bit code | It halves the size, because Huffman always compresses | It makes every code 1 bit long | It can't be used on data with equal frequencies | With equal frequencies the tree is balanced, so Huffman matches the fixed-length code.
SA3#computing-u06-14-q5@2,3: Build a Huffman tree for the text BEEKEEPER and use it to calculate the bits needed. | Frequencies: E 5, B 1, K 1, P 1, R 1. Join B and K (2), join P and R (2), join those (4), then join E (5) with the 4-node at the root (9). Codes: E = 0, B = 100, K = 101, P = 110, R = 111. Bits: 5 × 1 + 4 × 3 = 17. In 8-bit ASCII, 9 characters need 72 bits, so Huffman saves 55 bits, before storing the tree. | Correct frequencies ; Joins lowest frequencies first ; Derives prefix-free codes ; Correct total of 17 bits ; Compares with ASCII

## Ciphers: Caesar and Vernam
LV: A level · Application
S: Encryption turns plaintext into ciphertext that only someone with the key can read. This lesson covers the Caesar cipher, why it is easily broken, and the Vernam cipher (one-time pad), the only cipher proved to be perfectly secure.
O: Encrypt and decrypt messages with the Caesar cipher and the Vernam cipher using XOR
O: Explain how frequency analysis and brute force break the Caesar cipher
O: Evaluate the perfect security of the Vernam cipher and its practical limits
H: The Caesar cipher
P: **Encryption** converts **plaintext** into **ciphertext** using an algorithm and a **key**; decryption reverses it. In the **Caesar cipher**, each letter is shifted a fixed number of places along the alphabet: with a shift of 3, A becomes D and X wraps round to A. In code, a letter's position p becomes (p + key) MOD 26.
P: It is trivially broken. There are only 25 useful keys, so a **brute-force** attack tries them all. **Frequency analysis** works too: E is the most common letter in English, so the most common ciphertext letter probably stands for E.
X: Encrypt CAT with a Caesar shift of 3, then decrypt with the Vernam cipher.
> C → F, A → D, T → W: ciphertext FDW. Decrypt by shifting back 3.
> Vernam: plaintext byte 01000001 (A); key byte 00101100.
> XOR each bit (1 when the bits differ): ciphertext 01101101.
> XOR the ciphertext with the same key: 01000001 again. In Python, \`65 ^ 44\` gives 109 and \`109 ^ 44\` gives 65.
K: The Caesar cipher has too few keys and keeps letter frequencies, so it is easily broken; the Vernam cipher is unbreakable only if the key is truly random, as long as the message, kept secret and never reused.
H: The Vernam cipher
- Each bit (or character) of the plaintext is combined with a key bit by **XOR**.
- The key must be truly random, at least as long as the message, used only once and destroyed (a **one-time pad**).
- Then every possible plaintext of that length is equally likely: Shannon proved this gives **perfect secrecy**.
- In practice, generating, distributing and protecting such long keys is very hard, so modern systems use computationally secure ciphers such as AES instead.
!: Reusing a one-time pad. XORing two ciphertexts made with the same key cancels the key, leaving the XOR of the two plaintexts, which can often be unpicked.
EV: established | Shannon (1949) proved that the one-time pad achieves perfect secrecy when its key is random, as long as the message and never reused.
EV: established | The Caesar cipher and all simple substitution ciphers are vulnerable to frequency analysis, described by al-Kindi in the 9th century.
T: Encryption | Converting plaintext into ciphertext so that only those with the key can read it
T: Caesar cipher | A substitution cipher that shifts each letter a fixed number of places along the alphabet
T: Vernam cipher | A cipher that XORs the plaintext with a random key of the same length, used once (one-time pad)
SUM: Caesar shifts letters by a key; brute force and frequency analysis break it easily.
SUM: Vernam XORs with a random, single-use key as long as the message, giving perfect secrecy.
SRC: Shannon C. E., "Communication theory of secrecy systems", Bell System Technical Journal 28(4), 656–715 | primary | 1949 | https://doi.org/10.1002/j.1538-7305.1949.tb00928.x
SRC: Singh S., The Code Book, Fourth Estate | secondary | 1999
Q: What is the result of XORing a bit with the same key bit twice? | The original bit: XOR with the same key reverses itself.
Q: What four conditions make a Vernam cipher perfectly secure? | The key is truly random, at least as long as the message, used only once and kept secret.
M1#computing-u06-15-q1@1: With a Caesar shift of 2, what does the plaintext DOG become? | FQI | BME | EPH | DOG | Each letter moves 2 places forward: D → F, O → Q, G → I.
M2#computing-u06-15-q2@2: What is 10110010 XOR 01100110? | 11010100 | 00100010 | 11110110 | 11010110 | XOR gives 1 wherever the two bits differ and 0 wherever they match.
TF1#computing-u06-15-q3@3: The Caesar cipher can be broken by trying every possible key. | true | There are only 25 useful shifts, so a brute-force attack is quick even by hand.
M3#computing-u06-15-q4@3: Why is the Vernam cipher rarely used for everyday internet traffic despite being unbreakable? | Every message needs a new truly random key as long as itself, delivered securely in advance | It can only encrypt capital letters | Its ciphertext is much larger than the plaintext | Computers can't perform XOR fast enough | Key distribution is the obstacle; modern ciphers use short keys and are secure against all practical attacks.
SA3#computing-u06-15-q5@2,3: Compare the security of the Caesar and Vernam ciphers. | The Caesar cipher shifts every letter by the same amount, so there are only 25 keys: brute force tries them all in seconds. It also preserves letter frequencies, so frequency analysis reveals the key. The Vernam cipher XORs each character with a random key character; with a truly random key as long as the message, used once and kept secret, every plaintext is equally likely, so it can't be broken even with unlimited computing power (Shannon's perfect secrecy). Its weakness is practical: generating and securely sharing long one-time keys, and catastrophic failure if a key is reused. | Caesar key space and brute force ; Caesar frequency analysis ; Vernam method with XOR ; Conditions for perfect secrecy ; Practical limits of Vernam

## Error detection: parity and check digits
LV: GCSE · Application
S: Data can be corrupted when it is transmitted or typed in. This lesson covers how parity bits, majority voting, checksums and check digits detect errors, and what each can and can't catch.
O: Explain how parity bits detect errors in transmitted data
O: Calculate and verify a check digit, such as an ISBN-13 check digit
O: Evaluate the strengths and limitations of different error-detection methods
H: Parity bits
P: Interference can flip bits in transmission. A **parity bit** is an extra bit added to each group of bits so that the total number of 1s is even (**even parity**) or odd (**odd parity**). The receiver counts the 1s; if the count is wrong, an error has occurred and the data can be re-sent.
X: Even parity: send 1011001.
> It has four 1s, already even, so the parity bit is 0: transmit 01011001.
> The receiver gets 01011101: five 1s, odd, so an error is detected.
> If two bits had flipped, the count would be even again: parity misses even numbers of errors.
> Parity can tell that an error happened but not which bit is wrong.
K: Parity detects any odd number of flipped bits but not an even number; check digits catch most typing mistakes; neither, on their own, corrects errors.
H: Other methods
- **Majority voting**: send each bit three times (or another odd number) and take the majority: 110 is read as 1. It corrects single errors at the cost of three times the data.
- **Checksums**: the sender calculates a value from the data (for example, a sum of bytes) and sends it; the receiver recalculates and compares.
- **Check digits**: a digit calculated from the others, used to catch typing errors in barcodes, ISBNs and bank card numbers (the Luhn algorithm).
E: ISBN-13 check digit = (10 − (weighted sum MOD 10)) MOD 10 :: weights alternate 1, 3, 1, 3, … over the first 12 digits
P: For ISBN 978-0-306-40615-?, the weighted sum is 9 + 21 + 8 + 0 + 3 + 0 + 6 + 12 + 0 + 18 + 1 + 15 = 93; 93 MOD 10 = 3, so the check digit is 10 − 3 = 7.
!: Confusing error detection with validation. A check digit confirms a number was typed or scanned correctly, not that the book or account exists.
EV: established | A single parity bit detects any odd number of bit errors in a group but no even number of errors.
EV: established | The ISBN-13 check digit detects all single-digit errors, though not every transposition of adjacent digits.
T: Parity bit | An extra bit added so the number of 1s is even (even parity) or odd (odd parity)
T: Check digit | A digit calculated from the other digits of a number and appended, to detect input errors
T: Checksum | A value calculated from a block of data and sent with it, so the receiver can detect changes
SUM: Parity bits detect odd numbers of bit errors; majority voting can correct single errors.
SUM: Checksums and check digits detect corruption and typing errors by recalculating a value.
SRC: International ISBN Agency, ISBN Users' Manual, 7th edition, section 5 "Check digit" | standard | 2017 | https://www.isbn-international.org/content/isbn-users-manual
SRC: Hamming R. W., "Error detecting and error correcting codes", Bell System Technical Journal 29(2), 147–160 | primary | 1950 | https://doi.org/10.1002/j.1538-7305.1950.tb00463.x
Q: What can a single parity bit not detect? | An even number of flipped bits, such as two errors in the same byte.
Q: What is majority voting in error detection? | Sending each bit several times (an odd number) and taking the most common value, which can correct single errors.
M1#computing-u06-16-q1@1: Using even parity, what parity bit is added to 1100101? | 0 | 1 | 2 | It depends on the receiver | 1100101 has four 1s, already even, so the parity bit is 0.
M2#computing-u06-16-q2@2: A system uses odd parity. Which received byte contains a detectable error? | 10110100 | 10110110 | 11100000 | 00000001 | 10110100 has four 1s, an even count, so it breaks odd parity; each of the others has an odd number of 1s.
TF1#computing-u06-16-q3@3: A check digit proves that a bank account number belongs to a real account. | false | It only shows the digits are consistent, catching most typing errors; whether the account exists is a separate lookup.
M3#computing-u06-16-q4@3: With majority voting, each bit is sent three times. The receiver gets 011 101 000. What data does it accept? | 1, 1, 0 | 0, 1, 0 | 0, 0, 0 | 1, 0, 1 | 011 has two 1s → 1; 101 has two 1s → 1; 000 → 0. Single errors in each group are corrected.
SA3#computing-u06-16-q5@2,3: Compare parity bits and check digits as ways of detecting errors, including what each is used for and what it can miss. | A parity bit is added to each group of bits in transmission so that the number of 1s is even or odd; the receiver recounts and requests a re-send if it is wrong. It detects any single bit error cheaply but misses an even number of errors and can't locate the error. A check digit is calculated from the other digits of an identifier such as an ISBN or barcode and appended; on entry it is recalculated, catching most typing and scanning errors such as a wrong digit, though not every transposition. Neither confirms the data is meaningful, only that it hasn't been changed. | Describes parity ; Gives parity's limitation ; Describes check digits with a use ; Gives a check digit limitation ; Distinguishes detection from validity
`;
