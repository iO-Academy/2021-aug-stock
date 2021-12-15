const UniqId = require('uniqid')

const ProductService = {
    getAllProducts: async (connection) => {
        let result = await connection.query('SELECT `id`, `product-name`, `price`, `stock-quantity`, `sku` FROM `products`;')
        return result
    },

    addProduct: async (connection, sanitisedProductName, price, stockQuantity, sku) => {
        await connection.query("INSERT INTO `products` (`product-name`, `price`, `stock-quantity`, `sku`) VALUES ('" + sanitisedProductName + "','" + price + "','" + stockQuantity + "','" + sku + "');")
    },
    generateSku: async (productName, connection) => {
        let prefix = productName.substr(0, 3) + '-'
        let sku = UniqId(prefix).toUpperCase()
        return sku
    }
}

module.exports = ProductService