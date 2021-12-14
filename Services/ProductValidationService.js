
const ProductValidationService = {
    validateProductName: (productName) => {
        if (productName.length <= 50) {
            return true
        } else {
            return false
        }
    },

    validatePrice: (price) => {
        const regex = /^[0-9]+$/;
        if (regex.test(price) === true && price <= 99999999999.99 && price > 0) {
            return true
        } else {
            return false
        }
    },

    validateStockQuantity: (stockQuantity) => {
        if (Number.isInteger(stockQuantity) === true && stockQuantity <= 65535 && stockQuantity >= 0) {
            return true
        } else {
            return false
        }
    }
}

module.exports = ProductValidationService