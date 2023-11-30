const { AmountOutpassedError, InvalidCurrencyError } = require("./error-handling")
const rates = require("./utils/convert")

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

// async function validateCurrency(currency) {
//     try {
//         if (!currency in rates[0]) {
//             throw new InvalidCurrencyError("InvalidCurrencyError")
//         } else console.log('yes');
//         return rates[0][currency]
//     } catch (error) {
//         console.error(error);
//         throw error
//     }
// }

module.exports = {
    validateAmount,
    // validateCurrency
}