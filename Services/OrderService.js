const OrderService = {
    checkCustomerExistence: async (connection, customerEmail) => {
        let result = await connection.query("SELECT `customer-email`, `customerId` FROM `customers` WHERE `customer-email` = '" + customerEmail + "';")
        return result
    },

    addCustomer: async (connection, customerEmail, customerId) => {
        await connection.query("INSERT INTO `customers` (`customer-email`, `customerId`) VALUES ('" + customerEmail + "','" + customerId + "');")
    }
}

module.exports = OrderService