var express = require('express');
var dal = require('./dal');
 
var app = express();

dal.connect("products");
dal.addProduct(
	{ name:"aaa",
	  words:[{word:"a"},{word:"b"}],
	  prices:[{store:"aaa",price:555},{store:"bbb",price:666}]
	});

 
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

app.get('/getListProduct',function(req,res){
	console.log(dal.getProduct("aaa",function(data){
		res.send(data);
	}));
});
 
var io = require('socket.io').listen(app.listen(3000));
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});




console.log('Listening on port 3000...');

