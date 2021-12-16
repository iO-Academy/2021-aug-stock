// validate order, calls orderService.validateSku , orderSerivce.validate stock service, orderService.validate email service
const OrderService = require('../Services/OrderService')
const dbConnection = require("../Services/DbService")
const JsonResService = require("../Services/JsonResService");
const UniqId = require("uniqid");

const OrderController = {
    addOrder: async (req, res) => {
        let orderData = req.body.orderData
        let productData = req.body.orderData.productData
        let shippingData = req.body.orderData.shippingData

        //validate given data
        let connection = await dbConnection()
        let validationResult = await OrderService.validateOrder(orderData, connection)

        if (validationResult !== true) {
            res.json(JsonResService(false, validationResult, 400, []))
        } else {
            //only happens if validation checks are passed
            let customerEmail = req.body.orderData.customerEmail
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

            //add the order to the orders table and update stock levels for each product in the order
            productData.forEach((product) => {
                OrderService.addProductToOrder(connection, orderId, product.productSku, product.productQuantity)
                OrderService.updateStock(connection, product.productSku, product.productQuantity)
            })

            //add the orderId, customerId, shippingAddress and postcode to the customer-orders table
            await OrderService.linkOrderToCustomer(connection, orderId, customerId, shippingData.shippingAddress, shippingData.shippingPostcode)
            res.json(JsonResService(true, 'successfully added order', 200, result))
        }
    }
}

module.exports = OrderController