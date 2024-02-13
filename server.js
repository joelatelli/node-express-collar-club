const express = require("express");

const PORT = process.env.PROD_DB_PORT || 8080;

const app = express();
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/HTMLroutes")(app);
require("./routes/APIroutes")(app);

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection success! Sequelize is ready to use...');
        app.listen(PORT, () => console.log(`Listening on port ${PORT}...`)) // Listen for connections
        // http.listen(3030, () => console.log('Web Socket server listening on...'))
    })
    .catch(error => {
        console.log('Database connection failure.');
        console.error(error)
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