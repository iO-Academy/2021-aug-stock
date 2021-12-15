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
    },

    editProduct: async (req, res) => {
        let productToEdit = {
            productName: req.body.productName,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity,
            sku: req.body.sku
        }
        let productCheck
        let priceCheck
        let stockQuantityCheck
        let {productName, price, stockQuantity, sku} = productToEdit
        let sanitisedProductName = sanitise.sanitiseString(productName)
        if (sanitisedProductName === undefined || validateProduct.validateProductName(sanitisedProductName)) {
            productCheck = true
        } else {
            productCheck = false
        }

        if (price === undefined || validateProduct.validatePrice(price)) {
            priceCheck = true
        } else {
            priceCheck = false
        }

        if (stockQuantityCheck === undefined || validateProduct.validateStockQuantity(parseFloat(stockQuantity))) {
            stockQuantityCheck = true
        } else {
            stockQuantityCheck = false
        }

        if (productCheck === true && priceCheck === true && stockQuantityCheck === true) {
            let connection = await dbConnection()
            await ProductService.editProduct(connection, sanitisedProductName, price, parseFloat(stockQuantity), sku)
            res.json(JsonResService(true, 'successfully edited product data in database', 200, []))
        } else {
            res.json(JsonResService(false,  'error: invalid input - no product edited in database', 400, []))
        }
    }
}

module.exports = ProductController