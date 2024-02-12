const router = require('express').Router();

const { ReplicationRuleFilter } = require('@aws-sdk/client-s3');
// const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
// const dashboardRoutes = require('./dashboard-routes');
// const likesRoutes = require('./likes-routes')

router.use('/', homeRoutes);
// router.use('/dashboard', dashboardRoutes);
// router.use('/api', apiRoutes);
// router.use('/likes', likesRoutes);

router.get('/', (req, res) => {
    res,json({ hell: "world" })
});

module.exports = router;