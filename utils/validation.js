const { AmountOutpassedError, ParameterTypeError, AmountTypeError, MissingParameterError, EmptyParameterError } = require("./error-handling")

async function validateAmount(amount){
    try {
        amount = Number(amount)

        if (isNaN(amount)) {
            throw new Error("Invalid amount.")
        }
        if (amount < 10 || amount > 10000) {
            throw new AmountOutpassedError("Amount must be between $10 USD and $10000 USD.")
        }
        return amount
    } catch (error) {
        throw error
    }
}

async function validateParameter(param){
    try {
        if (param === null || typeof param === "undefined"){
            throw new MissingParameterError("No parameter provided")
        }
        if (typeof param !== 'object'){
            throw new ParameterTypeError("Type of given parameter must be object")
        }
        if (Object.keys(param).length === 0){
            throw new EmptyParameterError("Parameter can't be empty")
        }
    } catch (error) {
        throw error
    }
}

async function checkAmountType(amount){
    try {
        if (typeof amount !== "number" && typeof amount !== "string") {
            throw new AmountTypeError("Amount must be a number or string")
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    validateAmount, validateParameter, checkAmountType
}