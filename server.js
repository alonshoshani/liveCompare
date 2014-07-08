var express = require('express');
 
var app = express();
 
app.use('/client',express.static(__dirname + '/public'));
app.use(express.logger('dev'));
app.use(express.bodyParser());


app.post('/addDelta', function(req, res) {
	var file=req.files.file;
	var fileName=file.name;
	var filePath=file.path;
	console.log("file name :"+fileName);
	console.log("file path :"+filePath);
    res.send("true");
});

app.get('/addDeltass', function(req, res) {
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