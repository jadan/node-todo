const {MongoClient, ObjectID} = require('mongodb');
//amazon web services URL or Heroku URL
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db)=>{
	if(err){
		return console.log('Unable to connect to the MongoDB server.');
	}
	console.log('Connected to MongoDB server');

	//delete many
	// db.collection('Todos').deleteMany({text:'Stuff'}).then((result)=>{
	// 	console.log(result);
	// });

	//delete one
	// db.collection('Todos').deleteOne({text:'Stuff'}).then((result=>{
	// 	console.log(result);
	// }))

	//findone and delete
	// db.collection('Todos').findOneAndDelete({completed:true}).then((result)=>{
	// 	console.log(result);
	// })
});
