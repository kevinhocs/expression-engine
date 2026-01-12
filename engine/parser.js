// parser.js
// Convert tokens into a numeric result, honoring operator precedence.

const PRECEDENCE = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
};

// Apply the top operator to the top two operands on the stacks.
function applyOperator(operators, operands) {
    if (operators.length == 0) {
        throw new Error("No operators available");
    }

    if (operands.length < 2) {
        throw new Error("Insufficient operands");
    }

    const operatorToken = operators.pop();

    if (operatorToken.type !== 'OPERATOR') {
        throw new Error("Invalid operator token");
    }

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
                throw new Error("Division by zero");
            }
            result = left / right;
            break;
        default:
            throw new Error(`Unknown operator: ${operatorToken.value}`);
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
                throw new Error(`Undefined variable: ${token.value}`);
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
                applyOperator(operators, operands);
            }
            if (operators.length === 0) {
                throw new Error("Mismatched parentheses");
            }
            operators.pop(); // remove the LPAREN
            continue;
        }

        // OPERATORS
        else if (token.type === 'OPERATOR') {
            while (operators.length > 0 && operators[operators.length - 1].type === 'OPERATOR' &&
                   PRECEDENCE[operators[operators.length - 1].value] >= PRECEDENCE[token.value]) {
                applyOperator(operators, operands);
            }

            operators.push(token);
            continue;
        }
        else {
            throw new Error(`Unknown token type: ${token.type}`);
        }
    }
    while (operators.length > 0) {
        if (operators[operators.length - 1].type === 'LPAREN') {
            throw new Error("Mismatched parentheses");
        }
        applyOperator(operators, operands);
    }

    if (operands.length !== 1) {
        throw new Error("Invalid expression");
    }
    return operands[0];
}



// Export the parser function
module.exports = parser;