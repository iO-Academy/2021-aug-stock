const ProductService = {
    getAllProducts: async (connection) => {
        let result = await connection.query('SELECT `id`, `product-name`, `price`, `stock-quantity`, `sku` FROM `products`;')
        return result
    },
    addProduct: async (connection, productToAdd, sku) => {
        let {productName, price, stockQuantity} = productToAdd
        await connection.query("INSERT INTO `products` (`product-name`, `price`, `stock-quantity`, `sku`) VALUES ('" + productName + "','" + price + "','" + stockQuantity + "','" + sku + "');")
    },
    generateSku: async (productName) => {
        let foo = productName.substr(0, 3).toUpperCase()
        let number = Math.floor(Math.random() * (1000 - 1 + 1) + 1)
        let sku = foo + '-' + number
        return sku
    }
}

module.exports = ProductService