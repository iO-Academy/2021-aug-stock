const ProductController = require ('../Controllers/ProductController')

function routes(app) {
    app.get('/', ProductController.getAllProducts)

    app.post('/', ProductController.addProduct)
}

module.exports = routes