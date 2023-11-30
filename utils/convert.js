const Currency = require('./currency')  
const { validateCurrency } = require('../validation')
const { InvalidCurrencyError } = require('../error-handling')

async function convert(amount, currencyCode) {
    // console.log("IN convert");
    let rate;
    const currency = new Currency();

    try {
        const data = await currency.getRate();

        if (!data.rates[currencyCode]) {
            throw new InvalidCurrencyError("Currency code not found");
        }
        rate = data.rates[currencyCode];
        // console.log("Rate here", rate);

        console.log(`Amount in ${currencyCode} before conversion`, amount);
        amount = (amount / rate).toFixed(2);
        console.log("Amount in USD", amount);

        return amount;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    convert
}