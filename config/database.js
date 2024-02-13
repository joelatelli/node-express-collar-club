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
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require:false,
        rejectUnauthorized: false
      }
    }
  }
};