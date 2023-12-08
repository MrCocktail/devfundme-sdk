const request = require('request');
const { oxrClient } = require('../config');

// Get your API key from https://openexchangerates.org/signup/free
const appID = oxrClient;

class Currency {
    constructor(from = 'USD', to = 'HTG') {
        this.from = from;
        this.to = to;
        this.url = 'https://openexchangerates.org/api/latest.json';
    }
    getRate() {
        let self = this;
        let query = {
            app_id: appID,
            base: self.from
        };
        let options = {
            url: self.url,
            qs: query,
            timeout: 5000
        };

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (!error) {
                    let data = JSON.parse(body);
                    resolve(data);
                } else {
                    reject({
                        error: error
                    });
                }
            });
        });
    }
}

module.exports = Currency;