
const { Server } = require("socket.io");

const establishWebSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5000",
            methods: ["GET", "POST", "PUT", "DELETE"]
        }
    });

    const teamChat = io.of('/teams');
    const sessionChat = io.of('/sessions');

    sessionChat.on('connection', (socket) => {
        console.log(`User online - Sessions ${socket.id}`)

        socket.on('join_room', (data) => {
            console.log(`${data.player} has joined the ${data.room} chat`)
            socket.join(data.room)
        })

        socket.on('new_message', (room) => {
            sessionChat.to(room).emit("update_feed")
        })

        socket.on('update_message', (room) => {
            sessionChat.to(room).emit("update_feed")
        })

        socket.on('delete_message', (room) => {
            sessionChat.to(room).emit("update_feed")
        })

        socket.on('leave_room', (data) => {
            console.log(`${data.player} has left the ${data.room} chat`)
        })

        socket.on('disconnect', (room) => {
            socket.broadcast.to(room).emit('offline')
            console.log(`User offline - Sessions ${socket.id}`)
        });
    })

    teamChat.on('connection', (socket) => {
        console.log(`User online - Teams ${socket.id}`)

        socket.on('join_room', (room) => {
            socket.join(room)
        })

        socket.on('new_message', (room) => {
            teamChat.to(room).emit("update_feed")
        })

        socket.on('update_message', (room) => {
            teamChat.to(room).emit("update_feed")
        })

        socket.on('delete_message', (room) => {
            teamChat.to(room).emit("update_feed")
        })

        socket.on('disconnect', (room) => {
            socket.broadcast.to(room).emit('offline')
            console.log(`User offline - Teams ${socket.id}`)
        });
    })
}







module.exports = establishWebSocket