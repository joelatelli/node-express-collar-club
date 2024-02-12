const express = require('express');
const router = express.Router();

module.exports = (productService) => {

  router.get('/', async (req, res) => {
    try{
      const product = await productService.getProduct();
      res.send(product);
    }catch(err){
      return next(err);
    }
  });

  return router;
};