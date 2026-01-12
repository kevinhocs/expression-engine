// tokenizer.js
// Convert an expression string into a sequence of simple tokens.

function tokenize(input) {
    const tokens = [];
    let i = 0;

    while (i < input.length) {
        const char = input[i];

        // Whitespace
        if (char === ' ' || char === '\t' || char === '\n' || char === '\r') {
            i++;
            continue;
        }

        // Numbers
        if (char >= '0' && char <= '9') {
            let numStr = '';
            while (i < input.length && input[i] >= '0' && input[i] <= '9') {
                numStr += input[i];
                i++;
            }
            tokens.push({ type: 'NUMBER', value: parseInt(numStr, 10) });
            continue;
        }

        // Identifiers
        if (
            (char >= 'a' && char <= 'z') ||
            (char >= 'A' && char <= 'Z') ||
            char === '_'
        ) {
            let idStr = '';
            while (
                i < input.length &&
                (
                    (input[i] >= 'a' && input[i] <= 'z') ||
                    (input[i] >= 'A' && input[i] <= 'Z') ||
                    (input[i] >= '0' && input[i] <= '9') ||
                    input[i] === '_'
                )
            ) {
                idStr += input[i];
                i++;
            }
            tokens.push({ type: 'IDENTIFIER', value: idStr });
            continue;
        }

        // Operators
        if (char === '+' || char === '-' || char === '*' || char === '/') {
            tokens.push({ type: 'OPERATOR', value: char });
            i++;
            continue;
        }

        // Parentheses
        if (char === '(') {
            tokens.push({ type: 'LPAREN' });
            i++;
            continue;
        }

        if (char === ')') {
            tokens.push({ type: 'RPAREN' });
            i++;
            continue;
        }

        throw new Error(`Unexpected character: ${char}`);
    }

    return tokens;
}

module.exports = tokenize;

// Export the tokenizer function