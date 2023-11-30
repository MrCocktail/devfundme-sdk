const { AmountTypeError } = require("../error-handling")

const checkAmountType = (amount) => {
    if (typeof amount !== "number" && typeof amount !== "string") {
        throw new AmountTypeError("Amount must be a number or string")
    }
}

module.exports = checkAmountType