const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        static associate(models) {
            Like.belongsTo(models.User, {
                foreignKey: 'playerId',
                targetKey: 'id'
            })

            Like.belongsTo(models.Product, {
                foreignKey: 'playerId',
                targetKey: 'id'
            })
        }
    }

    Like.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: uuidv4()
        },
        playerId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        entityId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Like'
    })
    return Like;

}