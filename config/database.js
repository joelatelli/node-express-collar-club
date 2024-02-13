const config = require('./index');

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefailt: true,
    connection: {
        filename: "./data/lessons.db3"
    },
    pool: {
        afterCreate: (con, done) => {
            con.run("PRAGMA foreign_keys = ON", done);
        },
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require:false,
          rejectUnauthorized: false
        }
    },
    pool: {
        min: 2,
        max: 10,
    }
  }
};