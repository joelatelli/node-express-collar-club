// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const AppleStrategy = require('passport-apple');
// const { v4: uuidv4 } = require('uuid');
// const { User, UserSettings } = require('../db/models');
// const bcrypt = require('bcryptjs')
// const isProduction = process.env.NODE_ENV === 'production';


// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL:  isProduction
//         ? `${process.env.API_URL}/api/auth/google/callback`
//         : 'http://localhost:8000/api/auth/google/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         const foundUser = await User.findOne({ where: { email: profile.emails[0].value } });
//         if (foundUser) return done(null, foundUser);
//         const googlePassword = `${profile.displayName}-google-${profile.id.slice(-5)}`
//         const hashedPassword = bcrypt.hashSync(googlePassword, 13)
//         const image = profile.photos[0].value;

//         const user = await User.create({
//             id: uuidv4(),
//             name: profile.displayName ,
//             email: profile.emails[0].value ,
//             hashedPassword,
//             profileImage: image ? image : null
//         })

//         const userSettings = await UserSettings.create({
//             id: uuidv4(),
//             userId: user.id,
//             theme: 'dark',
//             notifications: false
//         })

//         const userPublic = {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             profileImage: user.profileImage,
//             createdAt: user.createdAt,
//         }

//         return done(null, userPublic)
//     } catch(e) {
//         return done(e, null);
//     }
// }));

// passport.use(new AppleStrategy({
//     clientID: process.env.APPLE_SERVICES_ID, // Your Services ID
//     teamID: process.env.APPLE_TEAM_ID, // Your Apple Team ID
//     keyID: process.env.APPLE_KEY_ID, // Your Key ID
//     privateKeyLocation: "path/to/your/private/key.p8", // Path to your private key file
//     callbackURL:  isProduction
//     ? `${process.env.API_URL}/api/auth/apple/callback`
//     : 'http://localhost:8000/api/auth/apple/callback'
// }, (accessToken, refreshToken, profile, done) => {
//     console.log(profile)
//     done(null, profile);
// }));

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const player = await User.findByPk(id);
//         done(null, user);
//     } catch (e) {
//         done(e, null);
//     }

// });