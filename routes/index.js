const express = require('express');
const router = express.Router();

// new
const apiRouter = require('./api')

const productsRoute = require('./products');

module.exports = (params) => {

    router.use('/api', apiRouter)

    router.get('/', (req, res) => {
        res.send('Home Page');
    });

    router.use('/product', productsRoute(params.productService));

    return router;
};