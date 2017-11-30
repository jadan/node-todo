const {MongoClient, ObjectID} = require('mongodb');
//amazon web services URL or Heroku URL
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db)=>{
	if(err){
		return console.log('Unable to connect to the MongoDB server.');
	}
	console.log('Connected to MongoDB server');

	// db.collection('Todos').find({completed:false}).toArray().then((docs)=>{
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err)=>{console.log("Unable to access database.", err)});

		db.collection('Todos').find().count().then((count)=>{
		console.log(`Todos: ${count}`);
	}, (err)=>{console.log("Unable to access database.", err)});

});
