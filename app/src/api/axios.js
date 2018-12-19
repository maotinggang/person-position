const axios = require('axios')

axios.create({
  baseURL: 'http://localhost:3030',
  timeout: 5000
})

export default axios
