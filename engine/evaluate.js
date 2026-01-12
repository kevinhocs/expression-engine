// engine/evaluate.js
// Top-level evaluate: tokenize an expression then parse it.

const tokenize = require('./tokenizer');
const parse = require('./parser');

function evaluate(expression, variables = {}) {
    const tokens = tokenize(expression);
    return parse(tokens, variables);
}

// Export the evaluator
module.exports = evaluate;