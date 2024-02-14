const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PetProfile extends Model {
    static associate(models) {
        PetProfile.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: 'id'
      })
    }
  }
  PetProfile.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    age: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    breed: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    temperment: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    specialNeeds: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastVaccinated: {
      type: DataTypes.STRING,
      allowNull: false
    },
    request: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PetProfile',
  });
  return PetProfile;
};