// const express = require("express");
// const router = express.Router();
// const apiRouter = require('./api')

// // Add a XSRF-Token cookie
// router.get('/api/csrf/restore', (req, res) => {
//     const csrfToken = req.csrfToken();
//     res.cookie("XSRF-TOKEN", csrfToken);
//     res.status(200).json({
//         'XSRF-TOKEN': csrfToken
//     })
// })

// // Serve React build Files in production
// if (process.env.NODE_ENV === 'production') {
//     const path = require('path');
//     // Serve the client's index.html file at the root route
//     router.get('/', (req, res) => {
//       res.cookie('XSRF-TOKEN', req.csrfToken());
//       res.sendFile(
//         path.resolve(__dirname, '../../client', 'build', 'index.html')
//       );
//     });

//     // Serve the static assets in the client's build folder
//     router.use(express.static(path.resolve("../client/build")));

//     // Serve the client's index.html file at all other routes NOT starting with /api
//     router.get(/^(?!\/?api).*/, (req, res) => {
//       res.cookie('XSRF-TOKEN', req.csrfToken());
//       res.sendFile(
//         path.resolve(__dirname, '../../client', 'build', 'index.html')
//       );
//     });
// }

// // Add a XSRF-TOKEN cookie in development
// if (process.env.NODE_ENV !== 'production') {
//     router.get('/api/csrf/restore', (req, res) => {
//       res.cookie('XSRF-TOKEN', req.csrfToken());
//       return res.json({});
//     });
//   }




// router.use('/api', apiRouter)


// module.exports = router;