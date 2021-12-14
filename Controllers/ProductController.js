const dbConnection = require("../Services/DbService")
const JsonResService = require("../Services/JsonResService")
const ProductService = require("../Services/ProductService")
const sanitise = require('../Services/StringSanitisationService')
const validateProduct = require('../Services/ProductValidationService')

let ProductController = {
    getAllProducts: async (req, res) => {
        let connection = await dbConnection()
        let result = await ProductService.getAllProducts(connection)
        res.json(JsonResService(result))
    },

    addProduct: async (req, res) => {
        let productName = req.body.productName
        let price = parseFloat(req.body.price)
        let stockQuantity = parseFloat(req.body.stockQuantity)
        let sanitisedProductName = sanitise.sanitiseString(productName)
        if (validateProduct.validateProductName(sanitisedProductName) && validateProduct.validatePrice(price) && validateProduct.validateStockQuantity(stockQuantity)) {
            let connection = await dbConnection()
            let result = await ProductService.addProduct(connection, sanitisedProductName, price, 1)
            res.json(JsonResService(result))
        } else {
            res.json(JsonResService([], false, 'error: invalid input - no product added to database', 400))
        }
    }
}

module.exports = ProductController