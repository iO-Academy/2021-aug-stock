
const ProductValidationService = {
    validateProductName: (productName) => {
        if (productName.length <= 50) {
            return true
        } else {
            return false
        }
    },

    validatePrice: (price) => {
        if (Number.isFinite(price) === true && price <= 99999999999.99) {
            return true
        } else {
            return false
        }
    },

    validateStockQuantity: (stockQuantity) => {
        if (Number.isInteger(stockQuantity) === true && stockQuantity <= 65535) {
            return true
        } else {
            return false
        }
    }
}

module.exports = ProductValidationService