const { Op } = require('sequelize');
const { Product, User } = require('../models');
const CustomErrors = require('../../errors');
const pagination = require('../../utils/pagination');

// return user with custom fields
const getById = async (id, requiredFields = null) => {
  const options = {};
  if (requiredFields) {
    options.attributes = ['id', ...requiredFields];
  }
  const product = await Product.findByPk(id, options);
  if (!product) {
    throw CustomErrors.NotFoundError('Product not found');
  }
  return product;
};

const createNewProduct = async (payload) => {
//   if (!payload.roleId) {
//     const role = await Role.findOne({ where: { name: 'user' } });
//     if (!role) {
//       throw CustomErrors.NotFoundError('Role not found');
//     }
//     payload.roleId = role.id;
//   }
  const product = await Product.create(payload);
  return product;
};

const getProducts = async (payload) => {
  // const allowedSortFields = ['username', 'createdAt'];
  // const sortByField = allowedSortFields.includes(payload.sortBy)
  //   ? payload.sortBy
  //   : 'username';
  const { limit, offset } = pagination(payload.page, payload.limit);
  const products = await Product.findAll({
    where: {
      username: {
        [Op.iLike]: `%${payload.search}%`,
      },
    },
    order: [[payload.sortBy, 'ASC']],
    limit,
    offset,
  });
  return products;
};

const getProduct = async (productId) => {
  const product = await Product.findByPk(productId, {
    attributes: ['id', 'name', 'createdAt'],
  });
  if (!product) {
    throw CustomErrors.NotFoundError('Product not found');
  }
  return product;
};

const updateProduct = async (productId, payload) => {
  const product = await getById(productId);
  if (payload.name) {
    product.name = payload.name;
  }

  await product.save();
  return product;
};

const deleteProduct = async (productId) => {
  const product = await getById(productId);
  await product.destroy();
};

module.exports = {
  createNewProduct,
  getById,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};