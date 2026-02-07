// index.js
// Public API: expose the `evaluate` function.
const {evaluate } = require('./engine/evaluate');
const validate = require('./engine/validate');

module.exports = {
    evaluate,
    validate
};