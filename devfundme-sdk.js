class dfmfy {
    constructor(accessToken) {
        this.accessToken = accessToken
        this.baseUrl = 'https://devfundme.com/api/pms'
    }

    async generate(amount, redirectUrl,  options = {}) {
        // typeof amount !== "number" || typeof amount !== "string" ? throw new Error("Amount must be a number or string")

        const url = `${this.baseUrl}/generate_paylink/`
        const headers = {
            'Authorization': `Token ${this.accessToken}`,
            'Content-Type': 'application/json'
        }
        const data = {
            amount, 
            return_url: redirectUrl,
            note: 'Payment',
            payor_name: 'John Doe',
            payor_email: 'jdavidbruno10@gmail.com'
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data)
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
}

// Get your token from https://devfundme.com/fr/pms/service
const token = ''
// const data = {
//     amount: '190',
//     note: 'Paiement ',
//     return_url: 'https://google.com',
//     // You can also add payor_email and payor_name
// }
const fakeToken = '' //for testing authentification
const sdk = new dfmfy(token)

sdk.generate('155', 'https://google.com')
.then(res => (console.log(res.pay_url)))
.catch(err => (err))

// sdk.getLink(27)
// sdk.getAll()
// .then(res => res)
// .catch(err => err)