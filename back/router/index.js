const express = require('express');
const router = express.Router();

 const DataBase = require('../models/mongoose');


const DB = new DataBase();

router.get('/', function (req, res) {
    res.sendFile('../build/index.html');
});


router.get('/api/createRoom', (req, res) => {
    let id = DB.createRoom();
    res.status(201).json({ id });


});
router.get('/api/connectToRoom/:id', async (req, res) => {
    let config = await DB.findRoom(req.params.id);
    if (config) {
        res.status(200).json({ found: true });
    }
    else {
        res.status(200).json({ found: false });
    }

});

router.get('/api/sendMess', async (req, res) => {
    let received = await DB.getLastMessages(req.query.id);
    console.log(received);
    if (received) {
        res.status(200).json({ received: received });
    } else {
        res.status(200).json({ received: [] });
    }

});
router.get('/:id', (req,res) =>{
    res.redirect('/');
});
module.exports = router;