const express = require('express');
const router = express.Router();
const { PlayerSettings } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { settingsNotFound } =require('./constants/responseMessages')


router.get('/current', requireAuth, async(req, res) => {
    const playerId = req.player.id
    const settings = await PlayerSettings.findOne({
        where: { playerId }
    })

    if (!settings) {
        return res.status(404).json(settingsNotFound)
    }
    return res.status(200).json({
        status: 200,
        message: null,
        data: settings,
        error: null
    })
})

router.put('/theme', requireAuth, async(req, res) => {
    const playerId = req.player.id
    const settings = await PlayerSettings.findOne({
        where: { playerId }
    })
    if (!settings) {
        return res.status(404).json(settingsNotFound)
    }
    settings.set({theme: settings.theme ? false : true})
    settings.save();
    return res.status(200).json({
        status: 200,
        message: null,
        data: settings,
        error: null
    })
})

router.put('/locations', requireAuth, async(req, res) => {
    const playerId = req.player.id
    const settings = await PlayerSettings.findOne({
        where: { playerId }
    })
    if (!settings) {
        return res.status(404).json(settingsNotFound)
    }
    settings.set({locations: settings.locations ? false : true})
    settings.save();
    return res.status(200).json({
        status: 200,
        message: null,
        data: settings,
        error: null
    })
})

router.put('/notifications', requireAuth, async(req, res) => {
    const playerId = req.player.id
    const settings = await PlayerSettings.findOne({
        where: { playerId }
    })
    settings.set({notifications: settings.notifications ? false : true})
    settings.save();
    return res.status(200).json({
        status: 200,
        message: null,
        data: settings,
        error: null
    })
})



module.exports = router;