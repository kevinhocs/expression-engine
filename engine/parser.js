// parser.js
// Convert tokens into a numeric result, honoring operator precedence.

const { ParseError } = require('./errors');

const PRECEDENCE = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
};

// Apply the top operator to the top two operands on the stacks.
function applyOperator(operators, operands) {
    if (operators.length == 0) {
        throw new ParseError("No operators available");
    }

    const operatorToken = operators[operators.length - 1];

    if (!operatorToken || operatorToken.type !== 'OPERATOR') {
        throw new ParseError("Invalid operator token");
    }

    if (operands.length < 2) {
        throw new ParseError("Insufficient operands", null, operatorToken);
    }

    operators.pop(); // remove the operator

    const right = operands.pop();
    const left = operands.pop();

    let result;

    switch (operatorToken.value) {
        case '+':
            result = left + right;
            break;
        case '-':
            result = left - right;
            break;
        case '*':
            result = left * right;
            break;
        case '/':
            if (right === 0) {
                throw new ParseError("Division by zero", null, operatorToken);
            }
            result = left / right;
            break;
        default:
            throw new ParseError(`Unknown operator: ${operatorToken.value}`);
    }

    operands.push(result);
}

function parser(tokens, variables = {}) {
    const operands = [];
    const operators = [];

    // iterate over tokens
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        //handle token types here

        // NUMBERS
        if (token.type === 'NUMBER') {
            operands.push(token.value);
            continue;
        }

        // IDENTIFIERS
        if (token.type === 'IDENTIFIER') {
            if (Object.prototype.hasOwnProperty.call(variables, token.value)) {
                operands.push(variables[token.value]);
            } else {
                throw new ParseError(`Undefined variable: ${token.value}`, i, token);
            }
            continue;

        // LPAREN
        } else if (token.type === 'LPAREN') {
            operators.push(token);
            continue;
        }

        // RPAREN
        else if (token.type === 'RPAREN') {
            while (operators.length > 0 && operators[operators.length - 1].type !== 'LPAREN') {
                try {
                    applyOperator(operators, operands);
                } catch (err) {
                    if (err instanceof ParseError) {
                        if (err.index === null) err.index = i;
                        if (err.token === null) err.token = token;
                    }
                    throw err;
                }
            }
            if (operators.length === 0) {
                throw new ParseError("Mismatched parentheses", i, token);
            }
            operators.pop(); // remove the LPAREN
            continue;
        }

        // OPERATORS
        else if (token.type === 'OPERATOR') {
            while (operators.length > 0 && operators[operators.length - 1].type === 'OPERATOR' &&
                   PRECEDENCE[operators[operators.length - 1].value] >= PRECEDENCE[token.value]) {
                try {
                    applyOperator(operators, operands);
                } catch (err) {
                    if (err instanceof ParseError) {
                        if (err.index === null) err.index = i;
                        if (err.token === null) err.token = token;
                    }
                    throw err;
                }
            }

            operators.push(token);
            continue;
        }
        else {
            throw new ParseError(`Unknown token type: ${token.type}`, i, token);
        }
    }
    while (operators.length > 0) {
        const top = operators[operators.length - 1];

        if (top.type === 'LPAREN') {
            throw new ParseError("Mismatched parentheses", null, top);
        }

        try {
            applyOperator(operators, operands);
        } catch (err) {
            if (err instanceof ParseError) {
                if (err.index === null) err.index = tokens.length - 1;
                if (err.token === null) err.token = top;
            }
            throw err;
        }
    }

    if (operands.length !== 1) {
        throw new ParseError("Invalid expression", null, null);
    }
    return operands[0];
}



// Export the parser function
module.exports = parser;