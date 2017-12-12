'use strict';

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8000;

let OnlineUsers = 0;

app.use(require('helmet')());

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

server.listen(port, () => {
    console.log('started on port ' + port);
});