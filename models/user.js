 const mongoose= require('mongoose');
 const bcrypt = require('bcryptjs');


const validator = require('validator');
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
		unique: true,
		validate: {
			validator: validator.isEmail,
			message:'{VALUE} is not a valid email'
		}
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
var User = mongoose.model('User',UserSchema);

 module.exports = {User};
