const OrderService = require('../Services/OrderService')
const dbConnection = require("../Services/DbService")
const JsonResService = require("../Services/JsonResService");
const UniqId = require("uniqid");

const OrderController = {
    addOrder: async (req, res) => {

        //validate given data
        let productData = req.body.productData
        let shippingData = req.body.shippingData

        //only happens if validation checks are passed
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

        let orderId = UniqId('ORD-').toUpperCase()

        //add the order to the orders table
        productData.forEach((product)=> {
            OrderService.addProductToOrder(connection, orderId, product.productSku, product.productQuantity)
        })

        //add the orderId, customerId, shippingAddress and postcode to the customer-orders table
        await OrderService.linkOrderToCustomer(connection, orderId, customerId, shippingData.shippingAddress, shippingData.shippingPostcode)
        res.json(JsonResService(true, 'successfully retrieved all product data', 200, result))
    }




}

module.exports = OrderController