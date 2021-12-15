const UniqId = require('uniqid')

const ProductService = {
    getAllProducts: async (connection) => {
        let result = await connection.query("SELECT `id`, `product-name`, `price`, `stock-quantity`, `sku` FROM `products` WHERE `deleted` = 0;")
        return result
    },

    addProduct: async (connection, sanitisedProductName, price, stockQuantity, sku) => {
        await connection.query("INSERT INTO `products` (`product-name`, `price`, `stock-quantity`, `sku`) VALUES ('" + sanitisedProductName + "','" + price + "','" + stockQuantity + "','" + sku + "');")
    },

    generateSku: async (productName, connection) => {
        let prefix = productName.substr(0, 3) + '-'
        let sku = UniqId(prefix).toUpperCase()
        return sku
    },

    deleteProduct: async (connection, sku) => {
        await connection.query("UPDATE `products` SET `deleted` = 1 WHERE `sku` = '" + sku + "';")
    }
}

module.exports = ProductService