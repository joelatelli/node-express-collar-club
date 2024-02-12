const config = require('./index');

module.exports = {
  development: {
    storage: config.dbFile,
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require:false,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }
//   production: {
//     username: DB_USERNAME_PROD,
//     password: DB_PASSWORD_PROD,
//     database: DB_NAME_PROD,
//     host: DB_HOST_PROD,
//     dialect: 'postgres',
//   },
};