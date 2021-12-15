let response = (success, message, status, data) => {
    return {
        "success": success,
        "message": message,
        "status": status,
        "data": data
    }
}

module.exports = response