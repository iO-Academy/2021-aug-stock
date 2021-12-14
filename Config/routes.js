// const ProductController = require("../Controllers/ProductController")
// const app = require("../index");
const connection = require('../Services/DbService')
const ProductController = require ('../Controllers/ProductController')

function routes(app) {
    app.get('/',ProductController.getAllProducts)

        // const products = async (db) => {
        //     let result = await connection.query('SELECT * FROM `products`;')
        //     result.json(products)
        //     console.log(products)
        // }
}

module.exports = routes