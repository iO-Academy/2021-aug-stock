const ProductValidationService = require('./ProductValidationService')
const JsonResService = require("../Services/JsonResService");

const OrderService = {
    validateOrderSkus: async (connection) => {
        let productData = [{"productSku": "NUC-BATS91RD6KX7REHS5", "productQuantity": 1}, {"productSku": "DRU-BATS91RD6KX7RFFJF", "productQuantity": 2}]
        productData.forEach((product) => {
            if(ProductValidationService.validateSku(product.productSku) === true) {
                return true
            } else {
                productData

        })

        let skus = productData.map(product => product.productSku)
        let result = connection.query("SELECT `sku` FROM `products`;")

        // use map to compare arrays
            // for each record, check if sku exists in db


            if (result.length) {
                return true
            }
        })
    }
}


// then, for each record, check productQuantity against stockQuantity

module.exports = OrderService