const mongoose = require('../src/db');
const {ObjectID} = require('mongodb');
const Todo = require('../src/models/todo');

// const id = "2";
const id = "5a9fe23b582a29f52ac0eec5";

(()=> {
	if(!ObjectID.isValid(id)){
		return console.log("not a valid id");
	}

	// Todo.find({_id: id}).then(todo=> {console.log('todo : ',todo)});

	// Todo.findOne({_id: id}).then(todo => console.log(todo));

	Todo.findById(id).then(todo=> console.log(todo));
})();

