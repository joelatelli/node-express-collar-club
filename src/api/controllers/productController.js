const { successResponse } = require('../../utils/apiResponse');
const asyncWrapper = require('../../middlewares/asyncHandler');
const { productService } = require('../services');


const createProduct = asyncWrapper(async (req, res, next) => {
    const product = await productService.createNewProduct(req.body);
    return successResponse(res, statusCode.CREATED, product, 'Product Created Successfully');
});

const getProducts = asyncWrapper(async (req, res, next) => {
  const products = await productService.getProducts(req.query);
  return successResponse(res, 200, products, 'Product Retrieved Successfully');
});

const getProduct = asyncWrapper(async (req, res, next) => {
  const { productId } = req.params;
  const product = await productService.getProduct(productId);
  return successResponse(res, 200, product, 'Product Retrieved Successfully');
});

const updateProduct = asyncWrapper(async (req, res, next) => {
  const { productId } = req.params;
  const product = await productService.updateProduct(productId, req.body);
  return successResponse(res, 200, product, 'Product Updated Successfully');
});

const deleteProduct = asyncWrapper(async (req, res, next) => {
  const { productId } = req.params;
  await productService.deleteProduct(productId);
  return successResponse(res, 200, null, 'Product Deleted Successfully');
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};