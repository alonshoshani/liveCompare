var express = require('express');
var dal = require('./dal');

var fs = require('fs');


 
var app = express();

dal.connect("products");
/*
dal.addProduct(
	{ name:"bbb",
	  words:[{word:"bbb"},{word:"BBB"}],
	  prices:[{store:"zolyoter",price:555,link:"linknini"},{store:"electrophoto",price:666,link:"linknini"}]
	});
*/

/*dal.deleteStoreByProduct("bbb","electrophoto");*/
	
/*dal.addStoreByProduct("bbb",{store:"aaa",price:222,link:"ggg"});*/

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
	
	var file = filePath;
	fs.readFile(file, 'utf8', function (err, data) {
	  if (err) {
		console.log('Error: ' + err);
		return;
	  }
	 
	  data = JSON.parse(data);
	 
	  console.dir(data);
	});
});

app.get('/addDeltass', function(req, res) {
	console.log("file");
  //  res.send("file");
});

app.post('/getListProduct',function(req,res){
	var productName=req.body.productName;
	dal.getProduct(productName,function(data){
		res.send(data);
	});
});
 
var io = require('socket.io').listen(app.listen(3000));
io.sockets.on('connection', function (socket) {
    //socket.emit('message', { message: 'welcome to the chat' });
});

app.get('/tryemit', function(req, res) {
	io.sockets.emit('updateProductsPrices', "bbb");
});


console.log('Listening on port 3000...');

