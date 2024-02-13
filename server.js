const http = require('http');
const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/HTMLroutes")(app);
require("./routes/APIroutes")(app);

db.sequelize.authenticate().then(() => {
    console.log('Database connection success! Sequelize is ready to use...');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
});


// config.db = db;

const server = http.createServer(db);

server.listen(process.env.PORT || 3000);

server.on('listening', () => {
    console.log(
        `My guy! I'm listening on port ${server.address().port}.`,
    );
});


// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(
//       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });