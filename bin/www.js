// const http = require('http');
// const Sequelize = require('sequelize');

// const config = require('../config')[process.env.NODE_ENV || 'development'];

// const app = require('../app')(config);

// // Get the configuration for the current environment
// const sequelizeConfig = config[process.env.NODE_ENV || 'development'];

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// })

// function connectToDatabase() {
//     sequelize.authenticate().then(() => {
//         console.log('Database connection success! Sequelize is ready to use...');
//     }).catch((error) => {
//         console.error('Unable to connect to the database:', error);
//         process.exit(1);
//     });

//     return sequelize;
// }

// // Connect to the database
// const db = connectToDatabase();

// // Pass the Sequelize instance to the config for use elsewhere in your application
// config.db = db;

// const server = http.createServer(app);

// server.listen(process.env.PORT || 3000);

// server.on('listening', () => {
//     console.log(
//         `Hi there! I'm listening on port ${server.address().port} in ${app.get('env')} mode.`,
//     );
// });

const http = require('http');
const Sequelize = require('sequelize');

const config = require('../config')[process.env.NODE_ENV || 'development'];

const App = require('../app')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

function connectToPostgres() {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');      
  }).catch((error) => {
    console.log('Unable to connect to the database:', error);
    process.exit(1);
  });

  return sequelize;
}

const postgresClient = connectToPostgres();
config.postgres.client = postgresClient;

const app = App(config);
const port = process.env.PORT || "3000";
app.set("port", port);
const server = http.createServer(app);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port  ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
        console.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
        console.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.on("error", onError);
server.on('listening', () => {
    console.log(
    `Hi there! I'm listening on port ${server.address().port} in ${app.get('env')} mode.`,
  );
});

server.listen(process.env.PORT || 3000);