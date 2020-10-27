const DataBase = require('../models/mongoose');

const DB = new DataBase();

module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('User connected');

        socket.on('room-connect', async (name, room) => {
            console.log('A new user have joined to the room');
            socket.join(room);
            console.log(name);
            io.to(room).emit('room-connect', name);
        });

        socket.on('chat message', async (msg, room, name) => {
            let newChat = {
                date: new Date(),
                value: msg,
                name: name
            };
            DB.sendMessage(newChat, room);


            io.to(room).emit('chat message', msg, name);
        });
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};