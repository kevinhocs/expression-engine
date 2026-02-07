// engine/validate.js
const evaluate = require('./evaluate');

function validate(expression, variables = {}) {
    try {
        evaluate(expression, variables);
        return true;
    } catch {
        return false;
    }
}

module.exports = validate;