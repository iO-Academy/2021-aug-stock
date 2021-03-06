const UniqId = require('uniqid')

const ProductService = {
    getAllProducts: async (connection) => {
        let result = await connection.query("SELECT `id`, `productName`, `price`, `stockQuantity`, `sku` FROM `products` WHERE `deleted` = 0;")
        return result
    },

    getSingleProduct: async (connection, sku) => {
        let result = await connection.query("SELECT `id`, `productName`, `price`, `stockQuantity`, `sku`, `deleted` FROM `products` WHERE `sku` = '" + sku + "' AND `deleted` = 0;")
        return result
    },

    addProduct: async (connection, sanitisedProductName, price, stockQuantity, sku) => {
        await connection.query("INSERT INTO `products` (`productName`, `price`, `stockQuantity`, `sku`) VALUES ('" + sanitisedProductName + "','" + price + "','" + stockQuantity + "','" + sku + "');")
    },

    generateSku: async (productName, connection) => {
        let prefix = productName.substr(0, 3) + '-'
        let sku = UniqId(prefix).toUpperCase()
        return sku
    },

    editProduct: async (connection, sanitisedProductName, price, stockQuantity, sku) => {
        if(sanitisedProductName !== undefined) {
            await connection.query("UPDATE `products` SET `productName` = '" + sanitisedProductName + "' WHERE `sku` = '" + sku + "';")
        }
        if(price !== undefined) {
            await connection.query("UPDATE `products` SET `price` = '" + price + "' WHERE `sku` = '" + sku + "';")
        }
        if(!isNaN(stockQuantity)) {
            await connection.query("UPDATE `products` SET `stockQuantity` = '" + stockQuantity + "' WHERE `sku` = '" + sku + "';")
        }
    },

    deleteProduct: async (connection, sku) => {
        await connection.query("UPDATE `products` SET `deleted` = 1 WHERE `sku` = '" + sku + "';")
    }
}




module.exports = ProductService