var dal = require('./dal');
var fs = require('fs');


function analyzeVendorFile(path){
	fs.readFile(path, 'utf8', function (err, data) {
		  if (err) {
			console.log('Error: ' + err);
			return;
		  }
		  data = JSON.parse(data); 
		  console.dir("parsing vendor file to json");
		  addProducts(data)
	});
}

function addProducts(fileJsonObject){
	 console.dir("parsing vendor file to products");
}