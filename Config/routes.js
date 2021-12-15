const ProductController = require ('../Controllers/ProductController')

function routes(app) {
    app.get('/products',ProductController.getAllProducts)
    app.post('/products',ProductController.addProduct)
    app.put('/products',ProductController.editProduct)
}

module.exports = routes