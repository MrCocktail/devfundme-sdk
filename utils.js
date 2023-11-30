const fx = require("money")
const { convert } = require('exchange-rates-api')
async function convertToUSD() {
    let amount = await convert(10, "USD", "CAD", "2023-11-25")
    console.log(amount);
}

// convertToUSD()
// fx(1).from("USD").to("CAD")
fx.convert(1000, {from: "GBP", to: "HKD"})