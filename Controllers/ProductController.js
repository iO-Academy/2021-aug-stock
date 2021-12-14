const dbConnection = require("../Services/DbService")
const JsonResService = require("../Services/JsonResService")
const ProductService = require("../Services/ProductService")

let ProductController = {
    getAllProducts: async (req, res) => {
        let connection = await dbConnection()
        let result = await ProductService.getAllProducts(connection)
        res.json(JsonResService(result))
    },
    addProduct: async (req, res) => {
        let productToAdd = {
            productName: req.body.productName,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity,
            sku: req.body.sku
        }
        let connection = await dbConnection()
        let result = await ProductService.addProduct(connection, productToAdd)
        res.json(JsonResService(result))
    }
}

module.exports = ProductController