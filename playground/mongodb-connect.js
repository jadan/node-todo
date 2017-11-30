const MongoClient = require('mongodb').MongoClient;
//amazon web services URL or Heroku URL
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db)=>{
	if(err){
		return console.log('Unable to connect to the MongoDB server.');
	}
	console.log('Connected to MongoDB server');
	db.collection('Todos').insertOne({
		text: 'Something to do',
		completed: false
	},(err, result)=>{
		if(err){
			return console.log('Unable to insert Todo.', err);
		}
		console.log(JSON.stringify(result.ops,undefined,2));
	});
	db.close();
});
