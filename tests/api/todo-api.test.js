const 
	request = require('supertest'),
	expect = require('chai').expect

	app  = require('../../src/app'),
	Todo = require('../../src/models/todo');

describe("POST /todos", ()=>{

	beforeEach((done)=> {
		Todo.remove({}).then(()=> done());
	})

	it("should save text as todo", (done)=> {
		const text = "a todo note";
		request(app)
			.post("/todos")
			.send({todo: {text}})
			.expect(200)
			.end((error, response)=> {
				expect(response.body.status).to.equal("success");
				expect(response.body.created).to.include({text});
				Todo.find().then(todos => {
					console.log("find now")
					expect(todos.length).to.equal(1);
					done();
				}).catch(e => done(e));
			});
	
	});
})
	