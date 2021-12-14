const dbConnection = require("../Services/DbService")
const JsonResService = require("../Services/JsonResService")
const ProductService = require("../Services/ProductService")

let ProductController = {
    getAllProducts: async (req, res) => {
        connToDb(async (db) => {
            let result = await ProductService.getAllProducts(db)
            res.json(JsonResService(result))
        })
    }
}

module.exports = ProductController