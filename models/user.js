 var mongoose= require('mongoose');
 var bcrypt = require('bcryptjs');

var UserSchema =  new mongoose.Schema({
name:{
    type:String,
    required: true,
     trim: true,
     minLength:5,
},
 email:{
		type:String,
		required: true,
		trim: true,
		minLength:5,
		unique: true
	},
	username:{
		type:String,
		required: true
	},
	password:{
		type: 'String',
		require: true,
		minlength:6
	}
});
var User = module.exports= mongoose.model('User',UserSchema);

module.exports.createUser = function(newUser,callback) {
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      console.log(newUser.password); 
      newUser.password = hash;
      console.log(newUser.password); 
        newUser.save(callback);
    });
});}


module.exports.getUserByUsername = function(username,callback){
    var query = {username: username};
    console.log(query);
    User.findOne(query,callback);
}

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword, hash, function(err,isMatch){
      console.log(candidatePassword);
    if(err) throw err;
    callback(null, isMatch);
    console.log(isMatch);
    });
}

