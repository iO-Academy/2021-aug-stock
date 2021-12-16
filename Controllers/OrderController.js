// validate order, calls orderService.validateSku , orderSerivce.validate stock service, orderService.validate email service
const OrderService = require('../Services/OrderService')
const dbConnection = require("../Services/DbService")
const JsonResService = require("../Services/JsonResService");
const UniqId = require("uniqid");

const OrderController = {
    validateOrder: async (req, res) => {
        let productData = req.body.orderData.productData
        let connection = await dbConnection()
        let result = await OrderService.validateOrderSkus(productData, connection)

        if(result === false) {
            res.json(JsonResService(false, 'error: invalid sku', 400, []))
        } else {
            res.json(JsonResService(true, 'valid skus', 200, productData))
        }
    },
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