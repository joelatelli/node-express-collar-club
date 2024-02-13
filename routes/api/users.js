const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { setTokenCookie } = require('../../utils/jwt')
const { Player, PlayerSettings } = require('../../db/models');
const { uploadMedia, deleteMedia } = require('../../utils/aws');
const { requireAuth } = require('../../utils/auth')
const { validateSignUp } = require('./validation/expressValidations');
const { v4: uuidv4 } = require('uuid');
const { playerNotFound } = require('./constants/responseMessages');

// Create Player
router.post('/', uploadMedia, validateSignUp, async (req, res) => {
    const { name, email, password } = req.body;
    const image = req.file;

    const userExistsEmail = await Player.findOne({
        where: { email }
    })

    if (userExistsEmail) {
        return res.status(500).json({
            status: 500,
            message: "There was a problem signing you up",
            data: null,
            errors: {
                email: "Player with that email already exists"
            },
        })
    }

    const hashedPassword = bcrypt.hashSync(password, 13)

    const player = await Player.create({
        id: uuidv4(),
        name,
        email,
        hashedPassword,
        profileImage: image ? image.location : null
    })

    const playerSettings = await PlayerSettings.create({
        id: uuidv4(),
        playerId: player.id,
        theme: 'light',
        locations: false,
        notifications: false
    })

    const playerPublic = {
        id: player.id,
        name: player.name,
        email: player.email,
        profileImage: player.profileImage,
        createdAt: player.createdAt,
    }

    await setTokenCookie(res, playerPublic);

    return res.status(201).json({
        status: 201,
        message: "Congrats. You created a player.",
        data: playerPublic,
        errors: {},
    })
})

// Update Player
router.put('/update-profile', requireAuth, async (req, res) => {
    const { name, email, password } = req.body;
    const playerId = req.player.id;
    const player = await Player.findByPk(playerId)

    if (!player) {
        return res.status(404).json(playerNotFound)
    }

    await player.set({
        name: name ? name : player.name,
        email: email ? email : player.email,
        hashedPassword: password ? bcrypt.hashSync(password, 13) : player.hashedPassword
    })

    await player.save();

    const updatedPlayer = await Player.findByPk(player.id)

    const playerPublic = {
        id: updatedPlayer.id,
        name: updatedPlayer.name,
        email: updatedPlayer.email,
        profileImage: updatedPlayer.profileImage,
        createdAt: updatedPlayer.createdAt,
    }

    await setTokenCookie(res, playerPublic);


    return res.status(200).json({
        status: 200,
        message: "Your profile has been updated",
        data: playerPublic,
        error: null
    })



})

// Delete Player
router.delete('/delete-profile', requireAuth, async (req, res) => {
    const playerId = req.player.id;
    const player = await Player.findByPk(playerId)

    if (!player) {
        return res.status(404).json(playerNotFound)
    }

    await player.destroy();

    return res.status(200).json({
        status: 200,
        message: "Your profile has been deleted",
        data: null,
        error: null
    })

})

module.exports = router;