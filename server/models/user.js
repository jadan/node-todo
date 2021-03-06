//User 
const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

//mongoose middleware 
//some code before a document is saved (hash password)



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
	var token = jwt.sign({_id:user._id.toHexString(), access}, process.env.JWT_SEED).toString();
	user.tokens.push({access, token});
	return user.save().then(()=>{return token});
};

//Method override.
UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();
	return _.pick(user, ['_id', 'email']);
};

UserSchema.methods.removeToken = function (token) {
	var user = this; 
//remove items from an array  that match criteria
	return user.update({
		$pull:{
			tokens: {
				token: token
			}
		}
	});
};


//Model method. 
UserSchema.statics.findByToken = function (token) {
	//uppercase User 
	var User = this; 

	var decoded = undefined;
	// console.log('decoded:', decoded);
	try{
		decoded = jwt.verify(token, process.env.JWT_SEED);
		return User.findOne({
			'_id': decoded._id,
			'tokens.token': token,
			'tokens.access': 'auth'
		});
	}catch(e){
		return Promise.reject();
	};
};

UserSchema.statics.findByCredentials = function (email, password) {
	var User = this;
	return User.findOne({email}).then((user)=>{
		if(!user){
			return Promise.reject();
		}
		//only supports callbacks, no promises...
		return new Promise((resolve, reject)=>{
			bcrypt.compare(password, user.password, (err, res)=>{
				if(res){
					resolve(user);
				}else{
					reject();
				}
			});
		});
	});
};

//UserSchema pre (middleware setup)
UserSchema.pre('save', function(next) {
	var user = this;
	if(user.isModified('password')){
		//hash
		// console.log('called hashing!');
		bcrypt.genSalt(10,(err,salt)=>{
			bcrypt.hash(user.password, salt, (err, hash)=>{
				user.password = hash;
				next();
			});
		});
	}else{
		// console.log('did not call hashing...');
		next();
	}
});



var User = mongoose.model('User', UserSchema);

module.exports={User};