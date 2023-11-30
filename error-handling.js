class AmountOutpassedError extends Error {
    constructor(message) {
        super(message)
        this.name = "AmountOutpassedError";
    }
}

class InvalidCurrencyError extends Error {
    constructor(message) {
        super(message)
        this.name = "InvalidCurrencyError";
    }
}
class AmountTypeError extends Error {
    constructor(message) {
        super(message)
        this.name = "AmountTypeError";
    }
}

module.exports = {
    AmountOutpassedError, InvalidCurrencyError, AmountTypeError
}