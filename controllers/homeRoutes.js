const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ message: 'I am Son of Hal and am always watching!' })
})

module.exports = router;