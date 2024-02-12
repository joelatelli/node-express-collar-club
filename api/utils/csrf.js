const { environment } = require('../config');
const isProduction = environment === 'production';

const csurf = require('csurf');

const csurfCookie = csurf({ // Set _csrf token and create req.csrfToken method
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
    }
})

module.exports = { csurfCookie };