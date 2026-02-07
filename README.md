# Expression Evaluation Engine

A deterministic expression evaluation engine for safely parsing and evaluating arithmetic expressions without using eval

## What it does

- Parses arithmetic expressions containing `+ - * /` and parentheses
- Supports variable substitution via explicit bindings
- Evaluates expressions deterministically using a stack-based algorithm
- Rejects malformed expressions with explicit error states (invalid tokens, mismatched parentheses, invalid operand/operator structure)

## Why this project exists

This project was built to explore how expression evaluation works under the hood, without relying on JavaScript’s `eval`.  
The focus is correctness, predictability, and explicit control over parsing and execution rather than feature breadth or UI.
This mirrors the core logic used in interpreters, calculators, and query evaluators where safety and correctness matter.

## Design overview

- Tokenizer converts raw input into a typed token stream
- Parser uses a precedence-aware, stack-based algorithm (shunting-yard style)
- Evaluation enforces invariants (operand count, operator validity, parentheses matching)
- A single public API (`evaluate`) hides implementation details
- Operators are defined declaratively (precedence, associativity, arity), allowing controlled extensibility without changing parser logic

## Public API

```js
const { evaluate } = require('./index');

evaluate("x * (y + 2)", { x: 3, y: 4 });
// - 18
```
## Limitations
- Integer-only arithmetic (floating-point semantics intentionally excluded)
- Unary operators not yet supported
- Grammar restricted to core arithmetic to prioritize correctness over feature breadth

## How to run 
Run the included test suite to validate parsing and evaluation behavior:
```md
node test/test.js
