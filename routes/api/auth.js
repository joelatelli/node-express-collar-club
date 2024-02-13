const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs')
const { setTokenCookie } = require('../../utils/jwt')
const { validateLogin } = require('./validation/expressValidations');
const { Player } = require('../../db/models');
const isProduction = process.env.NODEENV === 'production'
const failRedirect = isProduction ? `https://linkup-api-jw4b.onrender.com/sign-in` : 'http://localhost:3000/sign-in'
const successRedirect = isProduction ? `https://linkup-api-jw4b.onrender.com/enable-location` : 'http://localhost:3000/enable-location'

// Restore session
router.get('/', (req, res) => {
    const { player } = req;
    if (!player) {
        return res.status(404).json({
            status: 404,
            message: "Please sign in to continue.",
            data: null,
            error: null
        })
    }

    const playerPublic = {
        id: player.id,
        name: player.name,
        email: player.email,
        profileImage: player.profileImage,
        createdAt: player.createdAt,
    }

    return res.status(200).json({
            status: 200,
            message: "You've been signed in successfully.",
            data: playerPublic,
            error: null
        })

})


// Sign in user
router.post('/', validateLogin, async (req, res, _next) => {
    const { email, password } = req.body;
    const player = await User.unscoped().findOne({
        where: { email }
    });

    if (!player || !bcrypt.compareSync(password, player.hashedPassword.toString())) {
        return res.status(401).json({
            status: 401,
            message: "Invalid credentials",
            data: null,
            error: "Check your email address or password."
        })
    }

    const playerPublic = {
        id: player.id,
        name: player.name,
        email: player.email,
        profileImage: player.profileImage,
        createdAt: player.createdAt,
    }

    await setTokenCookie(res, playerPublic);

    return res.status(200).json({
        status: 200,
        message: "You've been signed in successfully",
        data: playerPublic,
        error: null
    })
})

// Sign out user
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.status(201).json({
        status: 201,
        message: 'You\'ve been signed out successfully',
        data: null,
        error: null
    })
})

// GOOGLE AUTHENTICATION
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: failRedirect }), async (req, res) => {
    await setTokenCookie(res, req.user);
    res.redirect(successRedirect);
});

//APPLE AUTHENTICATION
router.get('/apple', passport.authenticate('apple'));

router.get('/apple/callback', passport.authenticate('apple', { failureRedirect: failRedirect }), async (req, res) => {
    await setTokenCookie(res, req.user);
    res.redirect(successRedirect);
});



module.exports = router;