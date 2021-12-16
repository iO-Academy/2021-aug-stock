const OrderService = {
    checkCustomerExistence: async (connection, customerEmail) => {
        let result = await connection.query("SELECT `customer-email`, `customerId` FROM `customers` WHERE `customer-email` = '" + customerEmail + "';")
        return result
    },

    addCustomer: async (connection, customerEmail, customerId) => {
        await connection.query("INSERT INTO `customers` (`customer-email`, `customerId`) VALUES ('" + customerEmail + "','" + customerId + "');")
    },

    addProductToOrder: async (connection, orderId, productSku, productQuantity) => {
        await connection.query("INSERT INTO `orders` (`orderId`, `productSku`, `productQuantity`) VALUES ('" + orderId + "','" + productSku + "','" + productQuantity + "');")
    }
}

module.exports = OrderService