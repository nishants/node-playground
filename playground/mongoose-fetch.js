const mongoose = require('../app/db');
const {ObjectID} = require('mongodb');
const Todo = require('../app/models/todo');

// const id = "2";
const id = "5a9fe23b582a29f52ac0eec5";

(()=> {
	if(!ObjectID.isValid(id)){
		return console.log("not a valid id");
	}

	// Todo.find({_id: id}).then(todo=> {console.log('todo : ',todo)});

	// Todo.findOne({_id: id}).then(todo => console.log(todo));

  Todo.create({text: "will be updated with invalid text"}).then((todo)=>{
    Todo.findByIdAndUpdate(
        todo._id,
        {$set: {text: "a"}},
        {new: true, runValidators: true}
    ).then((updated)=>{
          console.log("updated", updated);
        });
  })

	Todo.findById(id).then(todo=> console.log(todo));
  Todo.create({text: "to be deleted"}).then((created)=> {
    Todo.findByIdAndRemove(created._id).then((deleted)=> {
      Todo.findByIdAndRemove(created._id).then((deleted)=> {
      });
    });
  });
})();

