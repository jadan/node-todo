const {MongoClient, ObjectID} = require('mongodb');
//amazon web services URL or Heroku URL
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db)=>{
	if(err){
		return console.log('Unable to connect to the MongoDB server.');
	}
	console.log('Connected to MongoDB server');

	db.collection('Todos').findOneAndUpdate(
		{_id:new ObjectID('5a1f3fb2e2720a124e67d1d8')},
		{$set:{
			completed:true
		}},
		{returnOriginal:false}).then((result)=>{
		console.log(result);
	});
});
