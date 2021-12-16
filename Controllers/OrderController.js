// validate order, calls orderService.validateSku , orderSerivce.validate stock service, orderService.validate email service
const OrderService = require('../Services/OrderService')
const dbConnection = require("../Services/DbService")
const JsonResService = require("../Services/JsonResService");
const UniqId = require("uniqid");

const OrderController = {
    addOrder: async (req, res) => {

        //validate given data
        let productData = req.body.orderData.productData
        let connection = await dbConnection()
        let validationResult = await OrderService.validateOrderSkus(productData, connection)

        if (validationResult === false) {
            res.json(JsonResService(false, 'error: invalid sku', 400, []))
        } else {
            //only happens if validation checks are passed
            let customerEmail = req.body.customerEmail
            let result = await OrderService.checkCustomerExistence(connection, customerEmail)
            let customerId
            if (result.length) {
                customerId = result[0].customerId
            } else {
                customerId = UniqId('CUS-').toUpperCase()
                await OrderService.addCustomer(connection, customerEmail, customerId)
            }

            let orderId = UniqId('ORD-').toUpperCase()

            //add the order to the orders table
            productData.forEach((product) => {
                OrderService.addProductToOrder(connection, orderId, product.productSku, product.productQuantity)
            })

            //add the orderId, customerId, shippingAddress and postcode to the customer-orders table
            res.json(JsonResService(true, 'successfully retrieved all product data', 200, result))
        }
    }
}

module.exports = OrderController