const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
var http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
require('./socket/index')(io);
const router = require('./router');
app.use(cors());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname+'/build')));
const start = async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("mongoDB has been started"));
    await http.listen(port, () => { console.log(`listening on :${port}`); });
};

app.get('/', router);
app.get('/api/createRoom', router);
app.get('/api/connectToRoom/:id', router);
app.get('/api/sendMess', router);
app.get('/:id', router);


start();



