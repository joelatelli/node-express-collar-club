#!/usr/bin/env node

// Import environemnt variables
// require('dotenv').config();
// const { port } = require('../config');
// const { app, http } = require('../app');
// const db = require('../db/models');
// const establishWebSocket = require('../utils/websockets')

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

const http = require('http');
const Sequelize = require('sequelize');

const config = require('../config')[process.env.NODE_ENV || 'development'];

const app = require('../app')(config);

// Get the configuration for the current environment
const sequelizeConfig = config[process.env.NODE_ENV || 'development'];

// Create a Sequelize instance using the appropriate configuration
const sequelize = new Sequelize(sequelizeConfig);

function connectToDatabase() {
    sequelize.authenticate().then(() => {
        console.log('Database connection success! Sequelize is ready to use...');
    }).catch((error) => {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    });

    return sequelize;
}

// Connect to the database
const db = connectToDatabase();

// Pass the Sequelize instance to the config for use elsewhere in your application
config.db = db;

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);

server.on('listening', () => {
    console.log(
        `Hi there! I'm listening on port ${server.address().port} in ${app.get('env')} mode.`,
    );
});