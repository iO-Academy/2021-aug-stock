



const ProductValidationService = require('./ProductValidationService')
const validator = require('validator')

const OrderService = {
    validateOrder: async (orderData, connection) => {
        let productData = orderData.productData
        let errorMessage = 'Error: Invalid SKU - The following SKU(s) are invalid:'
        productData.forEach((product) => {
            if(ProductValidationService.validateSku(product.productSku) === true) {
                return true
            } else {
                productData.push('falseSku')
                errorMessage += ' ' + product.productSku
            }
        })
        if(productData.includes('falseSku')) {
            errorMessage += '.'
            return errorMessage
        }
        let skus = productData.map(product => product.productSku)
        let result = await connection.query("SELECT `sku` FROM `products`;")
        let formattedResult = JSON.parse(JSON.stringify(result))
        let dbSkus = formattedResult.map(result => result.sku)
        errorMessage = 'Error: SKU not found - The following SKU(s) were not found in the database:'
        skus.forEach((sku) => {
            if(dbSkus.includes(sku)) {
                return true
            } else {
                productData.push('missingSku')
                errorMessage += ' ' + sku
            }
        })
        if(productData.includes('missingSku')) {
            errorMessage += '.'
            return errorMessage
        }
        let dbStockResult = await connection.query("SELECT `sku`, `stockQuantity` FROM `products`;")
        let formattedDbStockResult = JSON.parse(JSON.stringify(dbStockResult))
        errorMessage = 'Error: Stock too low - The following product SKU(s) must have their requested quantity reduced:'
        productData.forEach((product) => {
            let productSku = product.productSku
            formattedDbStockResult.forEach((dbResult) => {
                if(dbResult.sku === productSku) {
                    if(dbResult.stockQuantity - product.productQuantity <0) {
                        productData.push('negativeStock')
                        errorMessage += ' ' + productSku
                    }
                }
            })
        })
        if(productData.includes('negativeStock')) {
            errorMessage += '.'
            return errorMessage
        }
        let email = orderData.customerEmail
        if(validator.isEmail(email) === false) {
            return false
        } else {
            return true
        }
    },
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
    },

    getAllOrders: async (connection) => {
        let result = await connection.query("SELECT `orders`.`orderId`, `customers`.`customerEmail`, `products`.`productName`, `customers-orders`.`shippingAddress`, `customers-orders`.`ShippingPostcode`" +
            "FROM `orders`" +
            "INNER JOIN `customers-orders` ON `orders`.`orderId` = `customers-orders`.`orderId`" +
            "INNER JOIN `customers` ON `customers-orders`.`customerId` = `customers`.`customerId`" +
            "INNER JOIN `products` ON `orders`.`productSku` = `products`.`sku` WHERE `deleted` = 0;")
        return result
    }
}
// then, for each record, check productQuantity against stockQuantity
module.exports = OrderService
