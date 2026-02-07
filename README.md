# Expression Evaluation Engine

A deterministic expression evaluation engine for safely parsing and evaluating arithmetic expressions without using `eval`

## Features

- Parses arithmetic expressions containing `+ - * /` and parentheses
- Supports variable substitution via explicit bindings
- Evaluates expressions deterministically using a stack-based algorithm
- Rejects malformed expressions with structured, contextual error reporting

## Why this project exists

This project was built to explore how expression evaluation works under the hood, without relying on JavaScript’s `eval`.  
The focus is correctness, predictability, and explicit control over parsing and execution rather than feature breadth or UI.
This mirrors the core logic used in interpreters, calculators, and query evaluators where safety and correctness matter.

## Design Overview

- Tokenizer converts raw input into a typed token stream
- Parser uses a precedence-aware, stack-based algorithm (shunting-yard style)
- Evaluation enforces invariants (operand count, operator validity, parentheses matching)
- A single public API (`evaluate`) hides implementation details

## Public API

```js
const { evaluate, validate } = require('./index');

validate("3 + * 4");
// false

evaluate("x * (y + 2)", { x: 3, y: 4 });
// - 18
```

## Error Handling
Invalid expressions throw a typed `ParseError` with contextual information:

Insufficient operands at token index 1 ('+')

## Limitations
- Integer-only arithmetic (floating-point semantics intentionally excluded)
- Unary operators not yet supported
- Grammar restricted to core arithmetic to prioritize correctness over feature breadth

## How to run 
Run the included test suite to validate parsing and evaluation behavior:
```md
node test/test.js
