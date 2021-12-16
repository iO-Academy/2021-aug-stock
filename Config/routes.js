const ProductController = require ('../Controllers/ProductController')

function routes(app) {
    app.get('/products',ProductController.getAllProducts)
    app.get('/products/:sku',ProductController.getSingleProduct)
    app.post('/products',ProductController.addProduct)
    app.put('/products',ProductController.editProduct)
    app.delete('/products',ProductController.deleteProduct)
}

module.exports = routes