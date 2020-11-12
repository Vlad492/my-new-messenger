const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
require('./socket/index')(io);
const router = require('./router');
app.use(cors());

const start = async () => {
    await mongoose.connect('mongodb+srv://vlad:vlad@cluster0.1rrsu.mongodb.net/my-new-messenger', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("mongoDB has been started"));
    await http.listen(port, () => { console.log(`listening on :${port}`); });
};

app.get('/api/createRoom', router);
app.get('/api/connectToRoom/:id', router);
app.get('/api/sendMess', router);
app.get('/:id', router);


start();



