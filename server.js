const express = require('express');
const bodyParser = require("body-parser");

const {db} = require('./db');
const User = require('./models/user');
const Todo = require('./models/todo');

const app = express();

app.use(bodyParser);
app.listen(3000, ()=> {
	console.log("running on 3000");
})
