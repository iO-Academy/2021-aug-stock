const sql = require("promise-mysql")

function connection() {
    let db = sql.createConnection({
        user: 'root',
        password: 'password',
        database: 'blackMarket'
    })
    return db
}

module.exports = connection