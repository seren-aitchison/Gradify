// Example programming notes (Python 3). Code inside OUT: lines writes each new line as \\n.
export default `
## Defining Functions
S: def gives a block of code a name and parameters. return sends a value back to the caller; a function with no return gives None.
H: Parameters and return
- **def f(x):** defines f with one parameter, x.
- **return** ends the call and gives its value to the caller.
H: None
- A function that ends without return returns **None**, which print shows as None.
X: What is f(3) + 1 when f returns x * 2?
> f(3) returns 3 * 2 = 6
> 6 + 1 = 7
K: return gives the caller a value; without it, the call gives None.
Q: What does a function with no return statement return? | None.
Q: What does return do? | Ends the call and gives its value to the caller.
M2@1: def g(): print("hi"). What is the value of g()? | None | "hi" | 0 | An error | g prints hi but returns nothing, so its value is None.
OUT1@1: What does this print? | def f(x):\\n    return x * 2\\nprint(f(3) + 1) | 7 | f(3) is 6, plus 1 is 7.
OUT2@1: What does this print? | def g():\\n    print("hi")\\nprint(g()) | hi\\nNone | g prints hi, then print shows the None it returns.
`;
