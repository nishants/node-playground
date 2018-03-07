const express = require('express');
const bodyParser = require("body-parser");

const {db} = require('./db');
const User = require('./models/user');
const Todo = require('./models/todo');

const app = express();

app.use(bodyParser.json());

app.listen(3000, ()=> {
	console.log("running on 3000");
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
	const 
		pageSize = parseInt(request.query.limit) || 10,
		pageIndex = parseInt(request.query.page) || 0;

	Todo.find()
    .skip(pageIndex*pageSize)
    .limit(pageSize)
    .exec(function (error, todos) {
        if(error) { return response.status(500).send(error); };
        Todo.count().then((count)=> {
	        response.send({
	        	page: {index: pageIndex, limit: pageSize, maxPage: parseInt(count/pageSize)},
	        	todos
	        });        	
        })
    });

	console.log(request);
});

module.exports = app;
