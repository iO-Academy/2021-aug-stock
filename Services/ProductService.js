// const connection = require("../Services/DbService");

const ProductService = {
    getAllProducts: async (db) => {
        const connection = db
        let result = await connection.query('SELECT * FROM `products`;')
        result.json(result)
    }
}

module.exports = ProductService