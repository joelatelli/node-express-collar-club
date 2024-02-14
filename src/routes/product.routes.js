const express = require('express');
const validate = require('../middlewares/validate');
const productValidation = require('../validations/productValidation');
const { productController } = require('../api/controllers');
const router = express.Router();

router.get('/', validate(productValidation.getProducts), productController.getProducts);
router.get('/:productId', validate(productValidation.getProduct), productController.getProduct);

router.post('/', validate(productValidation.createProduct), productController.createProduct);

router.put('/:productId', validate(productValidation.updateProduct), productController.updateProduct);

router.delete('/:productId', validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;