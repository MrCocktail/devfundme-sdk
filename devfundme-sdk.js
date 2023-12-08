const { validateAmount, validateParameter, checkAmountType } = require('./utils/validation')
const { convert} = require('./utils/convert')

class FundMeFy {
    constructor(accessToken) {
        this.accessToken = accessToken
        this.baseUrl = 'https://devfundme.com/api/pms'
    }

    async generate(options) {
        validateParameter(options)
        let {
            amount = "",
            currency = "USD", // by default
            returnUrl = "",
            note = "",
            payorName = "",
            payorEmail = "",
        } = options

        checkAmountType(amount)
        if (currency !== "USD") {
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
            return_url: returnUrl,
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
                    return_url: returnUrl,
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
        try {
            const linkStatus = await this.getLink(linkId).then(res => (res.transaction.status))
            return linkStatus
        } catch (error) {
            console.error(error);
            throw error
        }
    }
}

module.exports = FundMeFy