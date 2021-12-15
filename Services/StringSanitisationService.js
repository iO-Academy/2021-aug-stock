const sanitisor = require('validator');

const StringSanitisationService = {
    sanitiseString: (uncleansedInput) => {
        let sanitised = sanitisor.escape(uncleansedInput)
        return sanitised
    }
}
module.exports = StringSanitisationService