const OrderService = {
    getAllOrders: async (connection) => {
        let result = await connection.query("SELECT `orderId`, `productName`, ``, `stock-quantity`, `sku` FROM `products` WHERE `deleted` = 0;")
        return result
    },
}