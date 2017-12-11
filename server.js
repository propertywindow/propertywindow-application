'use strict';

const express = require('express');
const server = express();
const http = require('http');
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('privkey.pem'),
    cert: fs.readFileSync('fullchain.pem'),
    requestCert: false,
    rejectUnauthorized: false
};

http.createServer(server).listen(8000);
https.createServer(options, server).listen(8443);

server.use(require('helmet')());

const io = require('socket.io')(https);

let OnlineUsers = 0;

io.on('connection', (socket) => {
    OnlineUsers++;
    socket.emit('OnlineUsers', OnlineUsers);

    console.log(OnlineUsers + ' user(s) online');

    socket.on('add-message', (message) => {
        io.emit('message',  message);
    });

    socket.on('disconnect', function(){
        OnlineUsers--;
    });
});

server.get('/socket', function (req, res) {
    res.send("test");
});

