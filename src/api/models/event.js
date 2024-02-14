const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        targetKey: 'id',
      });
    }
  }

  Event.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lat: {
          type: DataTypes.DECIMAL,
          allowNull: true,
          min: -90,
          max: 90
      },
      long: {
          type: DataTypes.DECIMAL,
          allowNull: true,
          min: -180,
          max: 180
      },
      private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      startDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDate: true,
          validateDate(value) {
            let enteredDate = new Date(value);
            let currentDate = new Date();
            if (enteredDate < currentDate) throw new Error('Start date must be in the future')
          }
        }
      },
      endDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDate: true,
          validateDate(value) {
            let enteredDate = new Date(value);
            let startDate = new Date(this.startDate);
            if (enteredDate < startDate) throw new Error('End date is less than start date')
          }
        }
      }
    }, {
      setterMethods: {
        setStartDate: function(value) {
          let startDate = new Date(value).toISOString().slice(0,19).replace('T', ' ');
          this.setDataValue('startDate', startDate)
        },
        setEndDate: function(value) {
          let endDate = new Date(value).toISOString().slice(0,19).replace('T', ' ');
          this.setDataValue('endDate', endDate)
        }
      },
      sequelize,
      modelName: 'Event',
      timestamps: true
    }
  );

  return Event;
};
//