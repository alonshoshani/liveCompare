var express = require('express');
 
var app = express();
 
app.use('/client',express.static(__dirname + '/public'));

app.post('/addDelta', function(req, res) {
	console.log("file");
  //  res.send("file");
});


 
app.listen(3000);
console.log('Listening on port 3000...');