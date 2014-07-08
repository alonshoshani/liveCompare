var mongoose = require('mongoose');
var _ = require('underscore');
var users;
var Product;

function connect(dbname){
	// for localhost
    mongoose.connect('mongodb://localhost/'+dbname);
	console.log("connecting to "+dbname);
	
	var productSchema=new mongoose.Schema({
		name: String,
		words:[{word:String}],
		prices:[{store:String,price:Number,link:String}]
	})
	
	Product = mongoose.model('products',productSchema);
	
	// for appfog
	//mongoose.connect(process.env.MONGOLAB_URI);
}

function addProduct(product){
	var productObj = new Product(product);
	productObj.save(function(err) {
	  if (err) return console.error(err);
		console.dir(product + " was insert to DB");
	});
}

function getProduct(name,callback){
	Product.find({name: name}).select({_id:0,prices:1}).limit(1).exec(
	function(err,fetchedProducts){
		if (err) {// ...
            console.log(err);
		}else{
			if (fetchedProducts.length===0){
				callback(fetchedProducts);
			}else{
				callback(fetchedProducts[0]['prices']);
			}
		}
	});
}

function createSchemas(){
    var eMailSchema = new mongoose.Schema({
        author: {
            firstName: String,
            lastName: String,
            userName:String
        },
        subject: String,
        body:String,
        date: String,
        isRead: String
    });
    mongoose.model('email',eMailSchema );

    var UserSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        age: String,
        userName:{
            type: String,
            required:true,
            unique:true
        },
        password: String,
        mails: [eMailSchema]

    });
    users = mongoose.model('user',UserSchema );
}
function User(){return mongoose.model('user');};
function Email(){ return mongoose.model('email');};

function addUser(user){
    //create new user model
    var userObj = new User()({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        userName : user.userName,
        mails : [{
            subject : "Welcome to Mail App!",
            body : "Welcome! we hope that you will enjoy our new site :)",
            date : (new Date()).getDate() +'/' + (new Date()).getMonth()+'/' + (new Date()).getFullYear() + '  ' + (new Date()).toLocaleTimeString(),
            isRead : "false",
           // _id : ObjectId("51f0081f4e01d06013000004"),
            author : {
                firstName : "Maill",
                lastName : "App"
            }
        }],
        password: user.password
    });
    //save to db
    userObj.save(function (err) {
        if (err) // ...
            console.log(err);
    });
};

function setMailAsReadbyMailId(mailId,callback){
    users.find({}, function(err,fetchedUsers){
        if (err) {
            console.log(err);
        } else {
            if (!fetchedUsers) {
                console.log('could not find User');
                callback(null);
            }
            var mail=null;
            _.each(fetchedUsers,function(user){
                mail = user.mails.id(mailId);
                if(mail){
                   mail.isRead = true;
                   user.save();
                }
            });
            callback(mail);
        }
    });
};
function getUserByNameAndPass (userObj,callback){
    users.find({userName:userObj.userNameSignIn,password:userObj.passSignIn}, function(err,fetchedUser){
        if (err) {
            console.log(err);
        } else {
            if (!fetchedUser) {
                console.log('could not find User');
                callback(null);
            }
            callback(fetchedUser[0]);
        }
    });
}
function getUserById(id,callback){
    users.find({_id:id}, function(err,fetchedUser){
        if (err) {
            console.log(err);
        } else {
            if (!fetchedUser) {
                console.log('could not find User');
                callback(null);
            }
            else
                callback(fetchedUser[0]);
        }
    });
}
function deleteMailById(id,callback){
    users.find({}, function(err,fetchedUsers){
        if (err) {
            console.log(err);
        } else {
            if (!fetchedUsers) {
                console.log('could not find User');
                callback(null);
            }
            var mail=null;
            _.each(fetchedUsers,function(user){
                mail = user.mails.id(id);
                if(mail){
                    mail.remove(function(err){
                        if(err)
                        //cant remove
                            console.log(err);
                        else
                            user.save(function(err){
                                //cant save
                                //console.log(err);
                            });
                    });
                }
            });
            callback(mail);
        }
    });
}
function addMailToUser(userName,mail,callback){
    users.findOne({userName:userName}, function(err,fetchedUser){
        if (err) {
            console.log(err);
        } else {
            if (!fetchedUser) {
                console.log('could not find User while adding');
                callback(null);
            }
           
		   else{
                fetchedUser.mails.push(mail);
                fetchedUser.save();
                callback(mail);
            }
        }
    });
}
//exports
module.exports.connect = connect;
module.exports.addProduct = addProduct;
module.exports.getProduct = getProduct;



module.exports.addUser = addUser;
module.exports.getUserByNameAndPass = getUserByNameAndPass;
module.exports.getUserById = getUserById;
module.exports.addMailToUser = addMailToUser
module.exports.deleteMailById = deleteMailById
module.exports.setMailAsReadbyMailId = setMailAsReadbyMailId;