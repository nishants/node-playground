const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/todo-app");

const Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 3,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

// const cookDinner = new Todo({
// 	text: '  some task  '
// });

// cookDinner.save();

// const wakeUp = new Todo({
// 	text: "wake up early",
// 	completed: true,
// 	completedAt : new Date().getTime()
// });
// wakeUp.save().then((doc)=> {
// 	console.log("saved: " + JSON.stringify(doc))
// });

const User = mongoose.model("User", {
	email: {
		type: String,
		minlength: 5,
		trim: true,
		required: true
	}
});

new User({email: " as@ad.com"}).save().then(()=> {}, (error)=> {
	console.log(error);
});