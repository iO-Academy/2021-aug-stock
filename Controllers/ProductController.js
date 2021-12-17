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
    getSingleProduct: async (req, res) => {
        let sku = req.params.sku
        if (validateProduct.validateSku(sku)) {
            let connection = await dbConnection()
            let result = await ProductService.getSingleProduct(connection, sku)
            if (result.length) {
                res.json(JsonResService(true, 'successfully retrieved product data', 200, result))
            } else {
                res.json(JsonResService(false,  'error: SKU not found in database - no product retrieved', 404, []))
            }
        } else {
            res.json(JsonResService(false,  'error: invalid SKU - no product retrieved from database', 400, []))
        }
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
        let {productName, price, stockQuantity, sku} = productToEdit
        if (validateProduct.validateSku(sku)) {
            let connection = await dbConnection()
            let result = await connection.query("SELECT `sku` FROM `products` WHERE `sku` = '" + sku + "';")
            if (result.length) {
                let productCheck
                let priceCheck
                let stockQuantityCheck
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
            } else {
                res.json(JsonResService(false,  'error: SKU not found in database - no product edited in database', 404, []))
            }
        } else {
            res.json(JsonResService(false,  'error: invalid SKU - no product edited in database', 400, []))
        }
    },
    deleteProduct: async (req, res) => {
        let sku = req.body.sku
        if (validateProduct.validateSku(sku)) {
            let connection = await dbConnection()
            let result = await connection.query("SELECT `sku` FROM `products` WHERE `sku` = '" + sku + "';")
            if (result.length) {
                await ProductService.deleteProduct(connection, sku)
                res.json(JsonResService(true, 'successfully deleted product in database', 200, []))
            } else {
                res.json(JsonResService(false,  'error: SKU not found in database - no product deleted', 404, []))
            }
        } else {
            res.json(JsonResService(false,  'error: invalid SKU - no product deleted in database', 400, []))
        }
    }
}

module.exports = ProductController