const isNumber = require('is-number')

const ProductValidationService = {
    validateProductName: (productName) => {
        if (productName.length <= 50) {
            return true
        } else {
            return false
        }
    },

    validatePrice: (price) => {
        if (isNumber(price) && price <= 99999999999.99 && price > 0) {
            return true
        } else {
            return false
        }
    },

    validateStockQuantity: (stockQuantity) => {
        if (Number.isInteger(stockQuantity) && stockQuantity <= 65535 && stockQuantity >= 0) {
            return true
        } else {
            return false
        }
    },

    validateSku: (sku) => {
        const regex = /^[A-Z]{3}-[0-9A-Z]{14,26}$/
        if (regex.test(sku)) {
            return true
        } else {
            return false
        }
    }
}

module.exports = ProductValidationService