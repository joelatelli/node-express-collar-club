const { restoreUser } = require('./jwt');

const requireAuth = [restoreUser, (req, _res, next) => {
    if (!req.player) {
        const error = new Error('Authentication required');
        error.title = 'Authentication required';
        error.errors = { message: 'Authentication required'};
        error.status = 401;
        return next(error)
    }
    return next();
}]

module.exports = { requireAuth }