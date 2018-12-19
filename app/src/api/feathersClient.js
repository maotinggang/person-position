const feathers = require('@feathersjs/feathers')
const rest = require('@feathersjs/rest-client')
const axios = require('axios')

const app = feathers()
// Connect to the same as the browser URL (only in the browser)
const restClient = rest('http://localhost:3030')
app.configure(restClient.axios(axios))

export default app
