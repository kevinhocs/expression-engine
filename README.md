# Expression Evaluation Engine

A deterministic expression evaluation engine that parses and evaluates arithmetic expressions with operator precedence and variables.

## What it does

- Parses arithmetic expressions containing `+ - * /` and parentheses
- Supports variable substitution via explicit bindings
- Evaluates expressions deterministically using a stack-based algorithm
- Rejects invalid expressions with explicit error states

## Why this project exists

This project was built to explore how expression evaluation works under the hood, without relying on JavaScript’s `eval`.  
The focus is correctness, predictability, and explicit control over parsing and execution rather than feature breadth or UI.

## Design overview

- Tokenizer converts raw input into a typed token stream
- Parser uses a precedence-aware, stack-based algorithm (shunting-yard style)
- Evaluation enforces invariants (operand count, operator validity, parentheses matching)
- A single public API (`evaluate`) hides implementation details

## Public API

```js
const { evaluate } = require('./index');

evaluate("x * (y + 2)", { x: 3, y: 4 });
// → 18

## Limitations
- Integer-only arithmetic
- No unary operators
- Limited grammar by design

## How to run
```bash
node test/test.js