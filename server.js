var express = require('express');
 
var app = express();
 
app.use('/client',express.static(__dirname + '/public'));

app.post('/addDelta', function(req, res) {
	console.log("file");
  //  res.send("file");
});


 
var io = require('socket.io').listen(app.listen(3000));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

console.log('Listening on port 3000...');