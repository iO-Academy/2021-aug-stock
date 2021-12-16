const ProductValidationService = require('./ProductValidationService')
const JsonResService = require("../Services/JsonResService");
const validator = require('validator')

const OrderService = {
    validateOrder: async (orderData, connection) => {
        let productData = orderData.productData
        productData.forEach((product) => {
            if(ProductValidationService.validateSku(product.productSku) === true) {
                return true
            } else {
                productData.push('falseSku')
            }
        })
        if(productData.includes('falseSku')) {
            return false
        }
        let skus = productData.map(product => product.productSku)
        let result = await connection.query("SELECT `sku` FROM `products`;")
        let formattedResult = JSON.parse(JSON.stringify(result))
        let dbSkus = formattedResult.map(result => result.sku)
        skus.forEach((sku) => {
            if(dbSkus.includes(sku)) {
                return true
            } else {
                productData.push('falseSku')
            }
        })
        if(productData.includes('falseSku')) {
            return false
        }
        let dbStockResult = await connection.query("SELECT `sku`, `stockQuantity` FROM `products`;")
        let formattedDbStockResult = JSON.parse(JSON.stringify(dbStockResult))
        productData.forEach((product) => {
            let productSku = product.productSku
            formattedDbStockResult.forEach((dbResult) => {
                if(dbResult.sku === productSku) {
                    if(dbResult.stockQuantity - product.productQuantity <0) {
                        productData.push('negative stock')
                    }
                }
            })
        })
        if(productData.includes('negative stock')) {
            return false
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
    }
}


// then, for each record, check productQuantity against stockQuantity
module.exports = OrderService