'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
        Product.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: 'id'
      })
      Product.hasMany(models.Like, {
        foreignKey: "entityId",
        targetKey: 'id'
      })
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId:  {
      type: DataTypes.UUID,
      allowNull: false
    },
    price:  {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};