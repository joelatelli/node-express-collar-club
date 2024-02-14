const Joi = require('joi');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    username: Joi.string().required(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    search: Joi.string().empty(''),
    sortBy: Joi.string(),
    limit: Joi.number().integer().default(10),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    userId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};