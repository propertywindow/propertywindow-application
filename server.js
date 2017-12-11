'use strict';

const express = require('express');
const server = express();
const http = require('http');
const https = require('https');
const fs = require('fs');
const port = 8000;

const sslOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'propertywindow',
    requestCert: false,
    rejectUnauthorized: false
};

const app = https.createServer(sslOptions, server).listen(port);
const io = require('socket.io')(app);

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
