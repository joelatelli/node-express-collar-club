// module.exports = {
//     environment: process.env.NODE_ENV || 'development' || 'test',
//     port: process.env.PORT || 8000,
//     dbFile: process.env.DB_FILE,
//     jwtConfig: {
//       secret: process.env.JWT_SECRET,
//       expiresIn: process.env.JWT_EXPIRES_IN
//     }
//   };

const bunyan = require('bunyan');
// Load package.json
const pjs = require('../package.json');

// Get some meta info from the package.json
const { name, version } = pjs;

// Set up a logger
const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

// Configuration options for different environments
module.exports = {
  development: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'debug'),
  },
  production: {
    client: "pg",
    connections: process.env.DATABASE_URL,
    pool: {
        min: 2,
        max: 10,
    }
  },
  test: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'fatal'),
  },
};