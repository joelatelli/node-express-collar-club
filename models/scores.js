
module.exports = function (sequelize, DataTypes) {
    var Scores = sequelize.define(
      "Scores",
      {
        // The player can not be null
        player: {
          type: DataTypes.STRING,
          allowNull: false
        },
        score: {
          // the score must be an integer and unique
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            isNumeric: true,
            len: [1, 1000]
          }
        }
      },
      {
        freezeTableName: true //model table name will be the same as the model name
      }
    );
  
    return Scores;
  };