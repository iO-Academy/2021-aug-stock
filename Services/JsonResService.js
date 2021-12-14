let response = (data, success = true, message = '', status = 200) => {
    return {
        "data": data,
        "success": success,
        "message": message,
        "status": status
    }
}

module.exports = response