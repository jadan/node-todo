require('./config');


const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var port = process.env.PORT || 3000;
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

//Get specific task.
app.get('/todos/:id', (req, res)=>{
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(400).send('Not found!');
	}

	Todo.findById(id).then(
		(todo)=>{
			if(!todo){
				return res.status(404).send();
			}
			res.send({todo});
		})
	.catch((e)=>res.status(404).send(e));
});

//Remove specific task. 
app.delete('/todos/:id',(req,res)=>{
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(400).send('Not found!');
	}

	Todo.findByIdAndRemove(id).then(
		(todo)=>{
			if(!todo){
				return res.status(404).send();
			}
		res.send({todo});
	})
	.catch((e)=>res.status(404).send(e));
});


//Patch code (update)
app.patch('/todos/:id', (req,res)=>{
	var id = req.params.id;
	//app security via lodash.pick (can't edit some properties)
	var body = _.pick(req.body, ['text', 'completed']);

	if(!ObjectID.isValid(id)){
		return res.status(400).send('Not found!');
	}

	if(_.isBoolean(body.completed) && body.completed){
		//update
		body.completedAt = new Date().getTime();
	}else{
		body.completed = false;
		body.completedAt = null;
		console.log('here');
	}

	Todo.findByIdAndUpdate(id,{$set:body}, {new: true}).then((todo)=>{
		if(!todo){
			return res.status(400).send();
		}
		res.send({todo});
	}).catch((e)=>res.status(400).send());
});

//Start app and add to exports (header file).
app.listen(port, () => {
	console.log(`Server started on port ${port}.`);
});

module.exports = {app};