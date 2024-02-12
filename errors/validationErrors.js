const { validationResult } = require('express-validator');

const handleValidationErrors = (message) => (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errorObject = {};
        const errors = {}
        validationErrors.array().forEach(error => errors[error.path] = error.msg);
        errorObject.message = message,
        errorObject.errors = errors
        return res.status(400).json(errorObject)
    }
    next()
}

module.exports = { handleValidationErrors };