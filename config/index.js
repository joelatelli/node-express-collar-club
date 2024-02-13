// const bunyan = require('bunyan');
// // Load package.json
// const pjs = require('../package.json');

// // Get some meta info from the package.json
// const { name, version } = pjs;

// // Set up a logger
// const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

// // Configuration options for different environments
// module.exports = {
// development: {
//     client: "sqlite3",
//     dialect: 'sqlite',
//     useNullAsDefault: true,
//     connection: {
//         filename: "./data/lessons.db3"
//     },
//     pool: {
//         afterCreate: (conn, done) => {
//             conn.run("PRAGMA foreign_keys = ON", done);
//         },
//     },
//   },
//   production: {
//     client: "pg",
//     dialect: 'postgres',
//     connection: process.env.DATABASE_URL,
//     pool: {
//         min: 2,
//         max: 10,
//     }
//   },
//   test: {
//     name,
//     version,
//     serviceTimeout: 30,
//     log: () => getLogger(name, version, 'fatal'),
//   },
// };

module.exports = {
    environment: process.env.NODE_ENV || 'development' || 'test',
    port: process.env.PROD_DB_PORT || 8000,
    dbFile: process.env.DB_FILE,
    jwtConfig: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  };