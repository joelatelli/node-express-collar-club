const express = require('express');

const app = express();
const routes = require('./routes');

const ProductService = require('./services/ProductService');

module.exports = (config) => {
//   const log = config.log();

const productService = new ProductService();

  // Add a request logging middleware in development mode
  if (app.get('env') === 'development') {
    app.use((req, res, next) => {
      console.log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }
  
  app.use(routes)

//   app.use('/', routes({productService}));
  
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    console.log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  return app;
};