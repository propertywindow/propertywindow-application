'use strict';

const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(require('helmet')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));
// app.use('/api', api);

const port = process.env.PORT || '8000';
app.set('port', port);

const server = http.createServer(app);
// if ( app.get('env') !== 'development' ) {
//     const server = https.createServer({
//         cert: fs.readFileSync('/etc/letsencrypt/live/propertywindow.nl/fullchain.pem'),
//         key: fs.readFileSync('/etc/letsencrypt/live/propertywindow.nl/privkey.pem')
//     }, app);
// }

const io = require('socket.io')(server);

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
        io.emit('users-changed', {user: socket.author, event: 'left'});
    });
});

server.listen(port, () => {
    console.log('started on port ' + port);
});

server.listen(port);