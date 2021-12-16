const ProductValidationService = require('./ProductValidationService')
const JsonResService = require("../Services/JsonResService");
const validator = require('validator')

const OrderService = {
    validateOrderSkus: async (productData, connection) => {
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
        } else {
            return true
        }
    },
    checkCustomerExistence: async (connection, customerEmail) => {
        let result = await connection.query("SELECT `customer-email`, `customerId` FROM `customers` WHERE `customer-email` = '" + customerEmail + "';")
        return result
    },

    addCustomer: async (connection, customerEmail, customerId) => {
        await connection.query("INSERT INTO `customers` (`customer-email`, `customerId`) VALUES ('" + customerEmail + "','" + customerId + "');")
    }
}


// then, for each record, check productQuantity against stockQuantity
module.exports = OrderService