const handleResourceNotFound = (_req, _res, next) => {
    const error = new Error('The requested resource couldn\'t be found.')
    error.title = "Resource Not Found";
    error.errors = { message: 'The request resource couldn\'t be found.' }
    error.status = 404;
    next(error)
}

module.exports = { handleResourceNotFound };