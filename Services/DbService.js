const sql = require("promise-mysql")

const connection = async () => {
    let connection = await sql.createConnection({
        user: 'root',
        password: 'password',
        database: 'blackMarket'
    })
    return connection
}

module.exports = connection