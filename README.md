# fundmefy
This is a NodeJS SDK based on the Devfundme's API. It allows people to easily integrate payment functionnalities in their apps. 
This SDK support up to 200 currencies and use STRIPE, MONCASH, NATCASH as payment gateway.

# Installation
Run the command : 
```bash
$ npm install fundmefy
```

# Get in touch
To use this SDK, please visit https://devfundme.com/fr/pms/service to get your token.

# Usage
### Initialization
```javascript
const sdk = new FundMeFy("YOUR TOKEN")
```
## We have 4 methods that facilitate communication between your app and the Devfundme's API. 
### Generate Paylink
Example 
```js
sdk.generate({amount, returnUrl, note, payorName, payorEmail})
.then(response => {
    const { mainData, all } = response
})
.catch(error => (error))
```
Params must be an object; All those keys 👇 are required
- **amount** (string or number) 
- **returnUrl** (string) : The *url* to redirect the user after the payment
- **note** (string) : Payment's description 
- **payorName** (string) 
- **payorEmail** (string)

You can also change the currency, just add the key :
- **currency** (string) : _"USD"_ by default

_Note that if the given currency isn't USD, the amount will be converted to USD using **openexchangerates** with real time rates._

Two objects (mainData & all) are returned in **generate**'s method. *mainData* is a concise form of *all*. You can _log_ them for more details.

### Get all the links that you have generated
Example 
```js
sdk.getAll()
.then(response => console.log(response))
.catch(error => console.error(error))
```

### Get a specific paylink informations by ID
Example 
```js 
sdk.getLink(id)
.then(response => console.log(response))
.catch(error => console.error(error))
``` 

### Get the status of a specific paylink by ID
Example
```js
sdk.getStatus(id)
.then(response => console.log(response))
.catch(error => console.error(error))
```

# Support
The project use a non Open Source package, so we're limited with the amount of request we can do in order to support multiple currencies. 
Contact me at : [jdavidbruno10@gmail.com] if you use this in a big project in order to upgrade the SDK plan.

# Credits 
- [Jean David Bruno][https://github.com/MrCocktail]
- [Dieuyel Jean Jeudy][https://github.com/Jeudy37]