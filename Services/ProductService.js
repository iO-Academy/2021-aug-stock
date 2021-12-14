const UniqId = require('uniqid')

const ProductService = {
    getAllProducts: async (connection) => {
        let result = await connection.query('SELECT `id`, `product-name`, `price`, `stock-quantity`, `sku` FROM `products`;')
        return result
    },
    addProduct: async (connection, productToAdd, sku) => {
        let {productName, price, stockQuantity} = productToAdd
        // let sku = ProductService.generateSku(productName, connection)
        await connection.query("INSERT INTO `products` (`product-name`, `price`, `stock-quantity`, `sku`) VALUES ('" + productName + "','" + price + "','" + stockQuantity + "','" + sku + "');")
    },
    generateSku: async (productName, connection) => {
        let prefix = productName.substr(0, 3) + '-'
        let sku = UniqId(prefix).toUpperCase()
        return sku
    }
}

module.exports = ProductService