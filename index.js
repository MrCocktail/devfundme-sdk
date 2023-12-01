require('dotenv').config();

const token = process.env.ACCESS_TOKEN
const oxrClient = process.env.OXR_APP_ID

module.exports = {
    token,
    oxrClient
}