const express = require('express');
const router = express.Router();
const config = require('../config/config');
const { environment } = require('../config/constants');

const defaultRoutes = [
  {
    path: '/auth',
    route: require('./auth.routes'),
  },
  {
    path: '/users',
    route: require('./user.routes'),
  },
  {
    path: '/products',
    route: require('./products.routes'),
  },
  {
    path: '/events',
    route: require('./events.routes'),
  },
  {
    path: '/profiles',
    route: require('./profiles.routes'),
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.get('/', (req, res) => {
    res.send('Home Page');
});

if (config.env === environment.DEVELOPMENT || config.env === environment.TEST) {
  router.use('/test-server', (req, res, next) => {
    res.status(200).json({
      message: 'Server is Alive :)',
    });
  });
}

module.exports = router;