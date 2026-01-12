// test/test.js — simple usage examples for `evaluate`
const { evaluate } = require('../index');

console.log(evaluate("3 + 4 * 2")); 
// 11

console.log(evaluate("(1 + 2) * (3 + 4)")); 
// 21

console.log(evaluate("x * (y + 2)", { x: 3, y: 4 }));
// 18

try {
    evaluate("3 +");
} catch (e) {
    console.log(e.message);
    // Expected output: "Insufficient operands"
}

try {
    evaluate("(3 + 4");
} catch (e) {
    console.log(e.message);
    // Expected output: "Mismatched parentheses"
}