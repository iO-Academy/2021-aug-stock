const ProductController = require ('../Controllers/ProductController')

function routes(app) {
    app.get('/products',ProductController.getAllProducts)
    app.post('/products',ProductController.addProduct)
    app.delete('/products',ProductController.deleteProduct)
}

module.exports = routes