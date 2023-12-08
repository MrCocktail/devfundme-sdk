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
class ParameterTypeError extends Error {
    constructor(message) {
        super(message)
        this.name = "ParameterTypeError";
    }
}

class MissingParameterError extends Error {
    constructor(message){
        super(message)
        this.name = "MissingParameterError";
    }
}
class EmptyParameterError extends Error {
    constructor(message){
        super(message)
        this.name = "EmptyParameterError";
    }
}

module.exports = {
    AmountOutpassedError, InvalidCurrencyError, AmountTypeError, ParameterTypeError, MissingParameterError, EmptyParameterError
}