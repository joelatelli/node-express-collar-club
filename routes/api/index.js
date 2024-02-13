const router = require('express').Router();
const authRouter = require('./auth.js');
const productsRouter = require('./products.js')

const { restoreUser } = require('../../utils/jwt.js');

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser)

router.use('/auth', authRouter);
router.use('/products', productsRouter);

module.exports = router;