const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');

const todos = [
	{	_id: new ObjectID(),
		text:'First test todo'}, 
	{	_id: new ObjectID(),
		text:'Second test todo'}];

beforeEach((done)=>{
	Todo.remove({}).then(()=>{
		return Todo.insertMany(todos);
	}).then(()=>done());
});

describe('Post/Todos', ()=>{
	it('should create a new todo', (done)=>{
		var text = 'Test todo text';
		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res)=>{
				expect(res.body.text).toBe(text);
			})
			.end((err,res)=>{
				if(err){
					return done(err);
				}

				Todo.find({text}).then((todos)=>{
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e)=>done(e));
			})
	});

	it('should not create invalid', (done) => {
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err,res)=>{
			if(err){
				return done(err);
			}
			Todo.find().then((todos)=>{
				expect(todos.length).toBe(2);
				done();
			});
		});
	});
});


describe('GET/Todos', ()=>{
	it('Should get all todos.', (done)=>{
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res)=>{
			expect(res.body.todos.length).toBe(2);
		})
		.end(done);
	});
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return an error', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(400)
      .end(done);
  });

  it('should return a 404', (done) => {
  	var testID = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${testID}`)
      .expect(404)
      .end(done);
  });
});


describe('DELETE /todos/:id', ()=>{
	it('should delete a todo doc', (done) =>{
		request(app)
		.delete(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      	})
		.end(done);
	});

	it('should return an error deleting', (done)=>{
		var testID = new ObjectID().toHexString();
		request(app)
		.delete(`/todos/${testID}`)
		.request(400)
		.end(done);
	});

	it('should return an error deleting', (done)=>{
		var testID = 123;
		request(app)
		.delete(`/todos/${testID}`)
		.request(400)
		.end(done);
	});
})








