const OrderService = {
    checkCustomerExistence: async (connection, customerEmail) => {
        let result = await connection.query("SELECT `customerEmail`, `customerId` FROM `customers` WHERE `customerEmail` = '" + customerEmail + "';")
        return result
    },

    addCustomer: async (connection, customerEmail, customerId) => {
        await connection.query("INSERT INTO `customers` (`customerEmail`, `customerId`) VALUES ('" + customerEmail + "','" + customerId + "');")
    },

    addProductToOrder: async (connection, orderId, productSku, productQuantity) => {
        await connection.query("INSERT INTO `orders` (`orderId`, `productSku`, `productQuantity`) VALUES ('" + orderId + "','" + productSku + "','" + productQuantity + "');")
    },

    linkOrderToCustomer: async (connection, orderId, customerId, shippingAddress, shippingPostcode) => {
        await connection.query("INSERT INTO `customers-orders` (`orderId`, `customerId`, `shippingAddress`, `shippingPostcode`) VALUES ('" + orderId + "','" + customerId + "','" + shippingAddress + "','" + shippingPostcode + "');")
    },

    updateStock: async (connection, productSku, orderQuantity) => {
        let stockQuantity = await connection.query("SELECT `stockQuantity` FROM `products` WHERE `sku` = '" + productSku + "';")
        let newStockQuantity = parseInt(stockQuantity[0].stockQuantity) - parseInt(orderQuantity)
        await connection.query("UPDATE `products` SET `stockQuantity` = '" + parseInt(newStockQuantity) + "' WHERE `sku` = '" + productSku + "';")
    }
}

module.exports = OrderService