'use strict';

const express = require('express');
const server = express();
const http = require('http');
const https = require('https');
const fs = require('fs');

const sslOptions = {
    key: fs.readFileSync('privkey.pem'),
    cert: fs.readFileSync('fullchain.pem'),
    requestCert: false,
    rejectUnauthorized: false
};

const httpServer = http.createServer(server);
const httpsServer = https.createServer(sslOptions, server);
const io = require('socket.io')(httpsServer);

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

httpServer.listen(8443);
httpsServer.listen(8000);
