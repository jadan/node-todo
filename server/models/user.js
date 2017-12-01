//User 
const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//Using a Schema allows you to define methods.
var UserSchema = new mongoose.Schema(
{
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique:true,
		validate: 
		{
			isAsync: true,
			validator: validator.isEmail,
			message: `{VALUE} is not a valid email!`
		}
	},

	password:{
		type: String,
		required: true,
		minlength: 6 
	},

	tokens:[{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

//Define the instance methods. 
//Arrow functions do not bind the this method. 
UserSchema.methods.generateAuthToken =  function(){
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString();
	user.tokens.push({access, token});
	return user.save().then(()=>{return token});
};

//Method override.
UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();
	return _.pick(user, ['_id', 'email']);
}

var User = mongoose.model('User', UserSchema);

module.exports={User};