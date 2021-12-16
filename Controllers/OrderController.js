// validate order, calls orderService.validateSku , orderSerivce.validate stock service, orderService.validate email service

const dbConnection = require("../Services/DbService");
let OrderController = {
    validateOrder: async (req, res) => {
        let productData = req.body.orderData.productData
        let connection = await dbConnection()
        await OrderService.validateOrderSkus(productData, connection)
    }
}