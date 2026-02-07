// errors.js
class ParseError extends Error {
    constructor(message, index = null, token = null) {
        super(message);
        this.name = 'ParseError';
        this.index = index;
        this.token = token;
    }
}

function formatError(err) {
    if (!(err instanceof ParseError)) return err.message;

    let msg = err.message;
    if (err.index !== null) {
        msg += ` at token index ${err.index}`;
    }
    if (err.token?.value) {
        msg += ` ('${err.token.value}')`;
    }
    return msg;
}

module.exports = { ParseError, formatError };