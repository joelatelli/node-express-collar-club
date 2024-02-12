'use strict';

const { Model, Validator } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {

      User.hasMany(models.Event, {
        onDelete: 'CASCADE',
        foreignKey: 'userId',
        sourceKey: 'id'
      })

      User.hasOne(models.UserSettings, {
        onDelete: 'CASCADE',
        foreignKey: 'userId',
        sourceKey: 'id'
      })

    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4()
    },
    name:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60,60]
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    profileImage: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['email', 'hashedPassword', 'updatedAt']
      }
    }
  });
  return User;
};