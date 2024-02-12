const cron = require('node-cron');
// const { Session, TeamChat, SessionChat } = require('../db/models');


// const deleteOldSessions = async () => {
//     const today = new Date();
//     const threeDaysAgo = today.setDate(today.getDate() - 3)
//     const sessions = await Session.findAll({
//         where: {
//             endDate: {
//                 [Op.lt]: threeDaysAgo
//             }
//         }
//     });
//     sessions.forEach(session => session.destroy());
//     return res.status(200).json({
//         status: 200,
//         message: "Sessions older than 3 days have been deleted",
//         data: null,
//         error: null
//     })
// }

// const deleteOldTeamChats = async () => {
//     const today = new Date();
//     const sevenDaysAgo = today.setDate(today.getDate() - 3)
//     const teamChats = await TeamChat.findAll({
//         where: {
//             createdAt: {
//                 [Op.lt]: sevenDaysAgo
//             }
//         }
//     });
//     teamChats.forEach(teamChat => teamChat.destroy());
//     return res.status(200).json({
//         status: 200,
//         message: "Team Chats older than 7 days have been deleted",
//         data: null,
//         error: null
//     })
// }

// const deleteOldSessionChats = async () => {
//     const today = new Date();
//     const sevenDaysAgo = today.setDate(today.getDate() - 3)
//     const sessionChats = await SessionChat.findAll({
//         where: {
//             createdAt: {
//                 [Op.lt]: sevenDaysAgo
//             }
//         }
//     });
//     sessionChats.forEach(sessionChat => sessionChat.destroy());
//     return res.status(200).json({
//         status: 200,
//         message: "Session Chats older than 7 days have been deleted",
//         data: null,
//         error: null
//     })
// }


// cron.schedule('0 0 * * *', () => {
//     try {
//         deleteOldSessions();
//         deleteOldTeamChats();
//         deleteOldSessionChats();
//         console.log('Data clean successful.')
//     } catch(e) {
//         console.error('Failed to delete old records:', e)
//     }
// });