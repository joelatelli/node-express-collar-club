// Importing packages
const express = require('express');
require('express-async-errors');
const passport = require('passport');
const passportSetup = require('./config/passport');
const session = require('express-session');
const cookieSession = require('cookie-session');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { handleSequelizeErrors, handleResourceNotFound, errorFormatter } = require('./errors');
const { environment } = require('./config');
const { csurfCookie } = require('./utils/csrf');
const isProduction = environment === 'production';
const routes = require('./routes')

// Initialize express application
const app = express();


//Passport
app.use(session({
    secret: process.env.SESSION_COOKIE_KEY, // replace with your own secret
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// HTTP SERVER FOR WEBSOCKETS
const http = require('http').Server(app);


// Parsing & Logging Middleware
app.use(morgan('dev')) // Logs information about requests and responses
app.use(cookieParser()) // Parses cookies
app.use(express.json()) // Parses JSON bodies of requests
app.use(bodyParser.json())

// Security Middleware
if (isProduction) app.use(cors())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(csurfCookie)



// Connect app to routes
app.use(routes)

// Error Handling
app.use(handleResourceNotFound)
app.use(handleSequelizeErrors)
app.use(errorFormatter)

module.exports = { app, http };




// const express = require('express');

// const app = express();
// const routes = require('./routes');

// const ProductService = require('./services/ProductService');

// module.exports = (config) => {
// //   const log = config.log();

// const productService = new ProductService();

//   // Add a request logging middleware in development mode
//   if (app.get('env') === 'development') {
//     app.use((req, res, next) => {
//       console.log.debug(`${req.method}: ${req.url}`);
//       return next();
//     });
//   }
  
// //   app.use(routes)

//   app.use('/', routes({productService}));
  
//   // eslint-disable-next-line no-unused-vars
//   app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     // Log out the error to the console
//     console.log.error(error);
//     return res.json({
//       error: {
//         message: error.message,
//       },
//     });
//   });
//   return app;
// };