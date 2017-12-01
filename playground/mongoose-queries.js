const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5a20242f9abd6018b50b6ca5';

Todo.find({_id: id}).then((todos)=>{
	console.log('Todos: ', todos);
});

Todo.findOne({_id: id}).then((todo)=>{
	console.log('Todo: ', todo);
});