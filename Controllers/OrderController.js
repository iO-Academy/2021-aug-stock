const OrderService = require('../Services/OrderService')
const dbConnection = require("../Services/DbService")
const JsonResService = require("../Services/JsonResService");
const UniqId = require("uniqid");

const OrderController = {
    getCustomerId: async (req, res) => {
        let customerEmail = req.body.customerEmail
        let connection = await dbConnection()
        let result = await OrderService.checkCustomerExistence(connection, customerEmail)
        let customerId
        if (result.length) {
            customerId = result[0].customerId
        } else {
            customerId = UniqId('CUS-').toUpperCase()
            await OrderService.addCustomer(connection, customerEmail, customerId)
        }
        res.json(JsonResService(true, 'successfully retrieved customer ID', 200, customerId))
    }


}

module.exports = OrderController