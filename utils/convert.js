const Currency = require('./currency')  
const { InvalidCurrencyError } = require('./error-handling')

async function convert(amount, currencyCode) {
    let rate;
    const currency = new Currency();

    try {
        const data = await currency.getRate();

        if (!data.rates[currencyCode]) {
            throw new InvalidCurrencyError("Currency code not found");
        }
        rate = data.rates[currencyCode];
        amount = (amount / rate).toFixed(2)

        return amount;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    convert
}