// const ProductController = require("../Controllers/ProductController")
// const app = require("../index");
const connection = require('../Services/DbService')
const ProductController = require ('../Controllers/ProductController')

function routes(app) {
    app.get('/',ProductController.getAllProducts)

}

module.exports = routes