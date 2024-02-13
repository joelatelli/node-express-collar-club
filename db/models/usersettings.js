'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class UserSettings extends Model {
    static associate(models) {
        UserSettings.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id'
      })
    }
  }
  UserSettings.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4()
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    theme: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['light', 'dark'],
    },
    notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'UserSettings',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return UserSettings;
};