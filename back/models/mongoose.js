const { Schema, model } = require('mongoose');

const ChatSchema = new Schema({
    'created_at': Date,
    'chat': [{
        'date': Date,
        'value': String,
        'name': String
    }
    ]
}, { versionKey: false });
const chat = model('chat', ChatSchema);

class DataBase {
    async sendMessage(config, room) {
        try {
            let message = await chat.findById(room);
            message.chat.push(config);
            message.save();
            return true;
        } catch (e) {
            return false;
        }
    }
    async getLastMessages(room) {
        try {
            let res = await chat.findById(room);
            let received = res.chat;
            if (received.length < 20) {
                return received;
            } else {
                return received.slice(-20);
            }
        } catch (e) {
            return false;
        }
    }
    async findRoom(room) {
        try {
        await chat.findById(room);
                return true;

        }catch(e) {
            return false;
        }
    }
    createRoom() {
        let newChat = new chat();
        newChat.created_at = new Date();
        newChat.save();
        return newChat._id;

    }
}

module.exports = DataBase;