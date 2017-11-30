var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
//middleware
app.use(bodyParser.json());


//Define server methods.

//Define input.
app.post('/todos', (req,res)=>{
	var todo = new Todo({
		text: req.body.text
	});
	todo.save().then((doc)=>{
		res.send(doc);
	}, (e)=>{ 
		res.status(400).send(e);
	});
});

//Define output.
app.get('/todos', (req,res)=>{
	Todo.find().then(
		(todos)=>{
			res.send({todos});
		}, 
		(e)=>{
			res.status(400).send(e);
		});
});


//Start app and add to exports (header file).
app.listen(3000, () => {
	console.log('Server started on port 3000.');
});

module.exports = {app};