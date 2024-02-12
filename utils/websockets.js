
const { Server } = require("socket.io");

const establishWebSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "PUT", "DELETE"]
        }
    });

    const sessionOrders = io.of('/orders');

    sessionOrders.on('connection', (socket) => {
        console.log(`User online - Sessions ${socket.id}`)

        socket.on('join_room', (data) => {
            console.log(`${data.player} has joined the ${data.room} chat`)
            socket.join(data.room)
        })

        socket.on('new_order', (room) => {
            sessionOrders.to(room).emit("update_feed")
        })

        socket.on('update_order', (room) => {
            sessionOrders.to(room).emit("update_feed")
        })

        socket.on('delete_order', (room) => {
            sessionOrders.to(room).emit("update_feed")
        })

        socket.on('leave_room', (data) => {
            console.log(`${data.player} has left the ${data.room} chat`)
        })

        socket.on('disconnect', (room) => {
            socket.broadcast.to(room).emit('offline')
            console.log(`User offline - Sessions ${socket.id}`)
        });
    })
}







module.exports = establishWebSocket