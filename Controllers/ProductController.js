const dbConnection = require("../Services/DbService")
const JsonResService = require("../Services/JsonResService")
const ProductService = require("../Services/ProductService")
const sanitise = require('../Services/StringSanitisationService')
const validateProduct = require('../Services/ProductValidationService')

let ProductController = {
    getAllProducts: async (req, res) => {
        let connection = await dbConnection()
        let result = await ProductService.getAllProducts(connection)
        res.json(JsonResService(true, 'successfully retrieved all product data', 200, result))
    },


    addProduct: async (req, res) => {
        let productToAdd = {
            productName: req.body.productName,
            price: req.body.price,
            stockQuantity: parseFloat(req.body.stockQuantity)
        }
        let {productName, price, stockQuantity} = productToAdd
        let sanitisedProductName = sanitise.sanitiseString(productName)
        if (validateProduct.validateProductName(sanitisedProductName) && validateProduct.validatePrice(price) && validateProduct.validateStockQuantity(stockQuantity)) {
            let connection = await dbConnection()
            let sku = await ProductService.generateSku(sanitisedProductName, connection)
            await ProductService.addProduct(connection, sanitisedProductName, price, stockQuantity, sku)
            res.json(JsonResService(true, 'successfully added product data to database', 200, []))
        } else {
            res.json(JsonResService(false,  'error: invalid input - no product added to database', 400, []))
        }
    }
}

module.exports = ProductController