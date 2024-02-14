// /* eslint-disable no-redeclare */
// // "use strict";

// // var fs = require("fs");
// // var path = require("path");
// // var Sequelize = require("sequelize");
// // var basename = path.basename(module.filename);
// // var env = process.env.NODE_ENV || "development";
// // var config = require(__dirname + "/../config/config.json")[env];
// // var db = {};


// // var sequelize = new Sequelize(process.env.DATABASE_URL, {
// //     dialect: 'postgres',
// //     protocol: 'postgres',
// //     dialectOptions: {
// //         ssl: {
// //             require: true,
// //             rejectUnauthorized: false
// //         }
// //     }
// // })

// // // if (config.use_env_variable) {
// // //   var sequelize = new Sequelize(process.env[config.use_env_variable]);
// // // } else {
// // //   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// // // }

// // fs
// //   .readdirSync(__dirname)
// //   .filter(function(file) {
// //     return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
// //   })
// //   .forEach(function(file) {
// //     var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
// //     db[model.name] = model;
// //   });

// // Object.keys(db).forEach(function(modelName) {
// //   if (db[modelName].associate) {
// //     db[modelName].associate(db);
// //   }
// // });

// // db.sequelize = sequelize;
// // db.Sequelize = Sequelize;

// // module.exports = db;

const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'John',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Doe'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    timestamps:true,
  });

  const ContactInfo = sequelize.define('ContactInfo', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    freezeTableName: true,
    timestamps:true,
  });

  const Tweet = sequelize.define('Tweet', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },{
    timestamps:true,
  });

  //hasOne, belognsTo, hasMany, belongsToMany

  //one-to-one => hasOne, belognsTo
  User.hasOne(ContactInfo, {
    foriegnKey: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
  ContactInfo.belongsTo(User);

  //one-to-many => hasMany, belognsTo
  User.hasMany(Tweet, {
    foriegnKey: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
  Tweet.belongsTo(User);

  //many-to-many => belongsToMany
  User.belongsToMany(User, {as: "User", foreignKey: "UserId", through: "Follow"});
  User.belongsToMany(User, {as: "Followed", foreignKey: "FollowedId", through: "Follow"});

  sequelize.sync({alter: true}); //force: true
}