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

module.exports = app;
