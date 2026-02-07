// test/test.js — simple usage examples for `evaluate`
const { evaluate } = require('../index');
const { formatError } = require('../engine/errors');

function expectEqual(actual, expected) {
    if (actual !== expected) {
        throw new Error(`Expected ${expected}, but got ${actual}`);
    }
}

expectEqual(evaluate("3 + 4 * 2"), 11);
// 11

expectEqual(evaluate("(1 + 2) * (3 + 4)"), 21);
// 21

expectEqual(evaluate("x * (y + 2)", { x: 3, y: 4 }), 18);
// 18

try {
    evaluate("3 +");
} catch (e) {
    console.log(formatError(e));
    // Expected output: "Insufficient operands"
}

try {
    evaluate("(3 + 4");
} catch (e) {
    console.log(formatError(e));
    // Expected output: "Mismatched parentheses"
}

console.log("All tests passed.");