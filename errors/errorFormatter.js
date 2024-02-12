const { environment } = require('../config');
const isProduction = environment === 'production';

const errorFormatter = (err, _req, res, _next) => {
    res.status(err.status || 500);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    })
}

module.exports = { errorFormatter };