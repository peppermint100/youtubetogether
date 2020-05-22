import express from "express"
import socketio from "socket.io"
import http from "http"
import { chatRouter } from "./routes";
import { addUser, removeUser, getUser, getUsersInRoom } from './service/userService';
const PORT = process.env.PORT || 5000

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const io: socketio.Server = socketio(server);

// client types
import { videoStateProps } from "./client/src/customs"


//routers
app.use("/chat", chatRouter)

// socketio
io.on('connection', socket => {
    console.log('we have new connection!');
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })
        console.log('join')
        if (error) {
            callback(error);
        }
        if (user) {
            socket.emit('message', { user: 'admin', text: `${user!.name} welcome to ${user!.room}!` })
            socket.broadcast.to(user!.room).emit('message', { user: 'admin', text: `${user!.name} has joined!` })
            socket.join(user!.room)
            io.to(user!.room).emit('roomData', { users: getUsersInRoom(user!.room) });
            callback();
        }
    })

    socket.on('hit', (videoState: videoStateProps) => {
        console.log('hit button!')
        console.log(videoState)
        io.to(videoState!.room!.toString()).emit('set', { ...videoState })
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user!.room).emit('message', { user: user!.name, text: message.text });
        io.to(user!.room).emit('roomData', { users: getUsersInRoom(user!.room) });
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user!.room).emit('message', { user: 'admin', text: `${user!.name} has left the room` })
            console.log(`${user!.name} has left`)
        }
    })
})

server.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
})


