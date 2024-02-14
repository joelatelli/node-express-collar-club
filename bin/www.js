const http = require('http');
const Sequelize = require('sequelize');

const config = require('../config')[process.env.NODE_ENV || 'development'];

const app = require('../app')(config);

// Get the configuration for the current environment
const sequelizeConfig = config[process.env.NODE_ENV || 'development'];

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