const { token } = require("./config")
const FundMeFy = require("./devfundme-sdk")

// Get your token from https://devfundme.com/fr/pms/service
const sdk = new FundMeFy(token)
