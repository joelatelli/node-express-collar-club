const { ValidationError } = require('sequelize');

const handleSequelizeErrors = (err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors
    }
    next(err)
}


module.exports = { handleSequelizeErrors }