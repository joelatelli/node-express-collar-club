#!/usr/bin/env node

// Import environemnt variables
require('dotenv').config();
// const { port } = require('./config');
// const { app, http} = require('./app');
// const db = require('./db/models');
// const establishWebSocket = require('./utils/websockets')

// // Web Sockets
// establishWebSocket(http)

// // Check the database connection before starting the app
// db.sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Database connection success! Sequelize is ready to use...');
//         app.listen(port, () => console.log(`Listening on port ${port}...`)) // Listen for connections
//         http.listen(3030, () => console.log('Web Socket server listening on...'))
//     })
//     .catch(error => {
//         console.log('Database connection failure.');
//         console.error(error)
//     });

// const Sequelize = require('sequelize');
// sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false
//       }
//     }
//   }
// );

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });