const {MongoClient, ObjectID} = require('mongodb');
//amazon web services URL or Heroku URL
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db)=>{
	if(err){
		return console.log('Unable to connect to the MongoDB server.');
	}
	console.log('Connected to MongoDB server');

	
});
