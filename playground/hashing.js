// // const {SHA256} = require('crypto-js');
// const jwt = require('jsonwebtoken');
// // var message = 'I am user number 3';

// // var hash = SHA256(message).toString();

// // console.log(`${message}:${hash}`);


// var data = {
// 	id: 4
// };
// // //Salting to prevent API abuse.
// // var token = {
// // 	data,
// // 	hash: SHA256(JSON.stringify(data +'somesecret')).toString()
// // };


// // token.data.id = 5; 
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// // var resultHash = SHA256(JSON.stringify(data +'somesecret')).toString();

// // if(resultHash === token.hash){
// // 	console.log('Data was not changed.');
// // }else{
// // 	console.log('Data is not safe');
// // }

// var token = jwt.sign(data, '123456');
// console.log(token);
// var decoded = jwt.verify(token, '123456');
// console.log(decoded);
const bcrypt = require('bcryptjs');

var password = '123abc!';
// !rainbowTables
// bcrypt.genSalt(10,(err,salt)=>{
// 	bcrypt.hash(password, salt, (err, hash)=>{
// 		console.log(hash);
// 	});
// });

var hashedPassword = '$2a$10$JBECKmPKokN6mk7zHWAZ9ekM6cDdPTJwd6AX8OfW21xP/BYNFnAvS';

bcrypt.compare(password, hashedPassword, (err, res)=>{
	console.log(res);
});



