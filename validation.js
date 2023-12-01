const { AmountOutpassedError } = require("./error-handling")

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
        console.error(error.message);
        throw error
    }
}

module.exports = {
    validateAmount,
}