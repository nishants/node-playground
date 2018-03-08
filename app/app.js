const express 	 = require('express');
const bodyParser = require("body-parser");
const {ObjectID} = require('mongodb')

const {db} = require('./db');
const User = require('./models/user');
const Todo = require('./models/todo');
const Page = require('./models/page');
const app  = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.listen(port, ()=> {
	console.log(`running on ${port}`);
});

app.post("/todos", (request, response)=> {
	const params = request.body.todo;
	console.log(params)
	new Todo({
		text: params.text
	}).save().then((created)=> {
		response.send({status: "success", created});
	}, (error)=> {
		response.status(400).send({status: "error", error});
	})
});

app.get('/todos', (request, response)=>{

	const page = Page.forRequest(request);

	Todo.find()
    .skip(page.index*page.size)
    .limit(page.size)
    .exec(function (error, todos) {
        if(error) { return response.status(500).send(error); };
        Todo.count().then((count)=> {
	        response.send({
	        	page: page.count(count),
	        	todos
	        });        	
        })
    });
});

app.get('/todos/:todoID', (request, response)=>{
	const 
		todoID = request.params.todoID,
		onSuccess = (todo)=> {
			response.send({todo: todo, status: "success"});
		},
		onNotFound = ()=>{
			response.status(404).send({status: "error"});
		};

	if(!ObjectID.isValid(todoID)){
		return onNotFound();
	}
	Todo.findById(todoID).then((todo)=>{
		todo ? onSuccess(todo) : onNotFound();
	});
});

module.exports = app;
