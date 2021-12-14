const ProductService = {
    getAllProducts: async (connection) => {
        let result = await connection.query('SELECT `id`, `product-name`, `price`, `stock-quantity`, `sku` FROM `products`;')
        return result
    },
    addProduct: async (connection, productToAdd) => {
        let {productName, price, stockQuantity, sku} = productToAdd
        await connection.query("INSERT INTO `products` (`product-name`, `price`, `stock-quantity`, `sku`) VALUES ('" + productName + "','" + price + "','" + stockQuantity + "','" + sku + "');")
    }
}

module.exports = ProductService