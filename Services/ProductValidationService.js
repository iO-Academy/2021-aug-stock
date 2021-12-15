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
        }
    },

    validateStockQuantity: (stockQuantity) => {
        if (Number.isInteger(stockQuantity) && stockQuantity <= 65535 && stockQuantity >= 0) {
            return true
        }
    }
}

module.exports = ProductValidationService