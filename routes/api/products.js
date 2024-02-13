const express = require('express');
const router = express.Router();
const { Product, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/current', requireAuth,  async (req, res) => {
    const userId = req.user.id

    let products = await Product.findAll({
        where: { userId },
        attributes: ['id', 'name', 'desc', 'price'],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'profileImage'],
            }
        ]
    });

    return res.status(200).json({
        status: 200,
        message: null,
        data: products,
        error: null
    })
})

router.get('/', (req, res) => {
    res.send(' -- Products Page --');
});

module.exports = router;