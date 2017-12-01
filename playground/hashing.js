// const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

// var message = 'I am user number 3';

// var hash = SHA256(message).toString();

// console.log(`${message}:${hash}`);


var data = {
	id: 4
};
// //Salting to prevent API abuse.
// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data +'somesecret')).toString()
// };


// token.data.id = 5; 
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(data +'somesecret')).toString();

// if(resultHash === token.hash){
// 	console.log('Data was not changed.');
// }else{
// 	console.log('Data is not safe');
// }

var token = jwt.sign(data, '123456');
console.log(token);
var decoded = jwt.verify(token, '123456');
console.log(decoded);
