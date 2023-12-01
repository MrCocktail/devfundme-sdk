const {AmountOutpassedError} = require('./error-handling')
const checkAmountType = require('./utils/checkAmountType')
const { validateAmount } = require('./validation')
const { convert} = require('./utils/convert')
const { token } = require('./index')

class dfmfy {
    constructor(accessToken) {
        this.accessToken = accessToken
        this.baseUrl = 'https://devfundme.com/api/pms'
    }

    // async generate(amount, redirectUrl, note, payorName, payorEmail, currency = "USD") {
        // this 👆
        // OR 
        // this 👇
    async generate(amount, options = {}) {
        const {
            currency = "USD", // by default
            redirectUrl = "",
            note = "",
            payorName = "",
            payorEmail = "",
        } = options
        checkAmountType(amount)
        if (currency !== "USD") {
            // Go to currency.js to include your APP ID from openexchangerates.org
            const amountInUSD = await convert(amount, currency)
            amount = amountInUSD
        } 
        try {
            amount = await validateAmount(amount)

        } catch(err){
            console.error(err);
            return err
        }

        const url = `${this.baseUrl}/generate_paylink/`
        const headers = {
            'Authorization': `Token ${this.accessToken}`,
            'Content-Type': 'application/json'
        }
        const meta_data = JSON.stringify({
            amount, 
            return_url: redirectUrl,
            note,
            payor_name: payorName,
            payor_email: payorEmail,
        })

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    amount,
                    note,
                    return_url: redirectUrl,
                    payor_name: payorName,
                    payor_email: payorEmail,
                    meta_data
                })
            })
            if (!response.ok) {
                console.error(response.status, response.statusText);
                const errorBody = await response.text()

                console.error('Response Body:', errorBody);

                throw new Error(response.statusText);
            }
            const responseData = await response.json()
            const {
                id,
                pay_url, 
                payor_email,
                created_at,
                transaction: {
                    order_id, 
                    status
                }
            } = responseData
            const conciseData = {id, pay_url, order_id, status, payor_email, created_at}

            // We return mainData to display the more important data for a better user experience
            return { mainData: conciseData, all: responseData }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async getAll() {
        const url = `${this.baseUrl}/paylink`
        const headers = {
            'Authorization': `Token ${this.accessToken}`
        }
        try {
            const response = await fetch(url, {
                headers,
            })
            if (!response.ok) {
                console.error(response.status, response.statusText);
                const errorBody = await response.text()

                console.error('Response Body:', errorBody);

                throw new Error(response.statusText);
            }
            const responseData = await response.json()
            console.log(responseData);
            return responseData
        } catch (error) {
            console.error(error);
            throw error
        }
    }
    async getLink(linkId) {
        const url = `${this.baseUrl}/paylink/${linkId}`
        const headers = {
            'Authorization': `Token ${this.accessToken}`
        }
        try {
            const response = await fetch(url, {
                headers,
            })
            if (!response.ok) {
                console.error(response.status, response.statusText);
                const errorBody = await response.text()

                console.error('Response Body:', errorBody);

                throw new Error(response.statusText);
            }
            const responseData = await response.json()
            return responseData
        } catch (error) {
            console.error(error);
            throw error
        }
    }
    async getStatus(linkId) {
        const linkStatus = await this.getLink(linkId).then(res => console.log(res.transaction.status))
    }
}

// Get your token from https://devfundme.com/fr/pms/service
const sdk = new dfmfy(token)

const amount = '1500'
const redirectUrl = 'https://youpi.com'
const note = 'Paiement ciné'
const payorName = 'John Doe'
const payorEmail = 'hello@gmail.com'
const currency = 'USD'
// const currency = 'HTG'

// TEST

sdk.generate(amount, {currency, redirectUrl, note, payorName, payorEmail})
.then(res => {
    const { mainData } = res
    console.log(mainData);
})
.catch(err => (err))
// sdk.getStatus('160')

// sdk.getLink(27)
// sdk.getAll()
// .then(res => res)
// .catch(err => err)