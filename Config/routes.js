const ProductController = require('../Controllers/ProductController')
const OrderController = require('../Controllers/OrderController')

function routes(app) {
    app.get('/products',ProductController.getAllProducts)
    app.get('/products/:sku',ProductController.getSingleProduct)
    app.post('/products',ProductController.addProduct)
    app.put('/products',ProductController.editProduct)
    app.delete('/products',ProductController.deleteProduct)

    app.post('/orders',OrderController.getCustomerId)
}

module.exports = routes