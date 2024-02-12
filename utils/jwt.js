const jwt = require('jsonwebtoken');
const { jwtConfig } = require ('../config');
const { Player } = require('../models');

const  { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie after a Player is sucessfully logged in
const setTokenCookie = async (res, player) => {
    // Creates safe user object

    try {
        const playerPublic = {
            id: player.id,
            name: player.name,
            email: player.email
        };

        // Generates token with player object
        console.log('generating token-----START')
        const token = jwt.sign(
            { data: playerPublic },
            secret,
            { expiresIn: parseInt(expiresIn) }
        );
        console.log('generating token-----DONE')

        const isProduction = process.env.NODE_ENV === "production";

        // Set the token cookie
        res.cookie('token', token, {
            maxAge: expiresIn * 1000,
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction && "Lax"
        })

        return token
    } catch(e) {
        console.log(e)
    }

}


const restoreUser = (req, res, next) => {

    // token parsed from the cookies
    const { token } = req.cookies;
    req.player = null;

    // verify the token from the parsed cookie
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {

        if (err) {
            return next()
        }

        try {
            const { id } = jwtPayload.data;
            req.player = await Player.findByPk(id, {
                attributes: {
                    include: ['email', 'createdAt', 'updatedAt']
                }
            });
        } catch(error) {
            res.clearCookie('token');
            return next();
        }

        if (!req.player) res.clearCookie('token');

        return next();

    })
};

module.exports = { setTokenCookie, restoreUser }