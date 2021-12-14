const ProductService = {
    getAllProducts: async (connection) => {
        let result = await connection.query('SELECT * FROM `products`;')
        return result
    }
}

module.exports = ProductService