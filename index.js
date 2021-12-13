const express = require('express')
var cors = require('cors')
const routes = require('./Config/routes')

const app = express()
app.use(express.json())
app.use(cors())

console.log('hi')

routes(app)

module.exports = app