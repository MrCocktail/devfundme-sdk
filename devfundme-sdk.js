const {AmountOutpassedError} = require('./error-handling')
const checkAmountType = require('./utils/checkAmountType')
const { validateAmount } = require('./validation')
const { convert} = require('./utils/convert')

class dfmfy {
    constructor(accessToken) {
        this.accessToken = accessToken
        this.baseUrl = 'https://devfundme.com/api/pms'
    }

    async generate(amount, redirectUrl, note, payorName, payorEmail, currency) {
        checkAmountType(amount)
        if (currency !== "USD") {
            // console.log("Given amount,", amount);
            const amountInUSD = await convert(amount, currency)
            amount = amountInUSD
        } else {
            amount = amount
        }
        // console.log(amount);
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
            // payment_method: paymentMethod,
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
                    // transaction: {
                    //     payment_method: paymentMethod,
                    // },
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
            console.log(responseData);
            return responseData
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
        // return fetch(url, {
        //     headers,
        // })
        // .then(res => {
        //     if (!res.ok) {
        //         console.error(res.status)
        //         //  switch (res.status) {
        //         //     case 400:
        //         //         console.error("Invalid request data");
        //         //         break;
        //         //     case 401:
        //         //         console.error("Invalid or expired token");
        //         //         break;
        //         //     case 500: 
        //         //         console.error("Internal server error");
        //         //         break;
        //         //     default:
        //         //         break;
        //         // }
        //         throw new Error(res.statusText)
        //     }
        //     return res.json()
        // })
        // .then(res => res)
        // .catch(err => {
        //     console.error(err);
        //     throw err
        // })
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
            console.log(responseData);
            return responseData
        } catch (error) {
            console.error(error);
            throw error
        }
    }
    async getStatus(linkId) {
        const linkStatus = await this.getLink(linkId).then(res => console.log(res.transaction.status))
        return linkStatus
    }
}

// Get your token from https://devfundme.com/fr/pms/service
const token = 'f20de56487c6c57b0b920429701fcea8fe40dded'
// const data = {
//     amount: '190',
//     note: 'Paiement ',
//     return_url: 'https://google.com',
//     // You can also add payor_email and payor_name
// }
const fakeToken = '' //for testing authentification
const sdk = new dfmfy(token)

const amount = '2000'
const redirectUrl = 'https://youpi.com'
const note = 'Paiement ciné'
const payorName = 'John Doe'
const payorEmail = 'hello@gmail.com'
// const currency = 'USD'
const currency = 'HTG'

// TEST

sdk.generate(amount, redirectUrl, note, payorName, payorEmail, currency)
.then(res => (console.log(res.pay_url)))
.catch(err => (err))
// sdk.getStatus(27)

// sdk.getLink(27)
// sdk.getAll()
// .then(res => res)
// .catch(err => err)