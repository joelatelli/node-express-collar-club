const express = require('express')
const app = express()

const { Sequelize, DataTypes } = require('./config/sequelize.js')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.json());

const sequelize = require('./config/sequelize.js')

require('dotenv').config()
const port = process.env.port || 3001

const productRoute = require("./router/productRoutes")

app.use("/", productRoute)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
})