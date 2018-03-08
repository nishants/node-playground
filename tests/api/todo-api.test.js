const 
	request = require('supertest'),
	expect = require('chai').expect

	app  = require('../../app/app'),
	Todo = require('../../app/models/todo');

describe(" /todos", ()=> {
	beforeEach((done)=> {
		Todo.remove({}).then(()=> done());
	});

	describe("GET /todos/:id", ()=> {
		let 
			text = "todo to fetch",
			todoID = null;

		beforeEach(done=>{
			new Todo({text}).save().then(todo => {
				todoID = todo._id; 
				done();
			});
		});

		it("should return todo by id", (done)=>{
			request(app)
				.get(`/todos/${todoID}`)
				.expect(200)
				.end((error, response) => {
					expect(error).to.be.null;
					expect(response.body.todo).to.include({text});
					expect(response.body.status).to.eql('success');
					done();
				})
		});

		it("should return 404 for invalid ID", (done)=>{
			request(app)
				.get(`/todos/invalid-id`)
				.expect(404)
				.end((error, response) => {
					expect(error).to.be.null;
					expect(response.body.status).to.eql('error');
					done();
				})
		});


		it("should return 404 if ID not found", (done)=>{
			Todo.remove({}).then(()=> {
				request(app)
					.get(`/todos/${todoID}`)
					.expect(404)
					.end((error, response) => {
						expect(error).to.be.null;
						expect(response.body.status).to.eql('error');
						done();
					})
			});
		});
	});

	describe("GET /todos", ()=> {
		const savedTodosTexts = [
			"todo#1",
			"todo#2",
			"todo#3",
			"todo#4",
			"todo#5",
		];

		beforeEach((done)=> {
			savedTodosTexts.forEach((text, index)=> {
				new Todo({text: text}).save().then(()=> {
					if(index === savedTodosTexts.length -1 ) done();
				})
			});
		});

		it("should return 0th page with 10 elements by default", (done)=> {
			request(app)
				.get("/todos")
				.expect(200)
				.end((error, response)=>{
					expect(response.body.page.index).to.equal(0);
					expect(response.body.page.size).to.equal(10);
					expect(response.body.todos.map(todo => todo.text).sort()).to.eql(savedTodosTexts.sort());
					done();
				});
		});


		it("should return page and page size by request params", (done)=> {
			request(app)
				.get("/todos?page=2&size=2")
				.expect(200)
				.end((error, response)=>{
					expect(response.body.page.index).to.equal(2);
					expect(response.body.page.size).to.equal(2);
					expect(response.body.todos.map(todo => todo.text)).to.eql(["todo#5"]);
					done();
				});
		});
	});
	describe("POST /todos", ()=>{

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

		it("shoule return bad request error if text is missin", (done)=>{
			request(app)
				.post("/todos")
				.send({todo: {text: ''}})
				.expect(400)
				.end((error, reponse) => {
					expect(reponse.body.status).to.equal("error");
					expect(reponse.body.error).to.be.an('object');
					Todo.find().then(todos=> {
						expect(todos.length).to.equal(0);
						done();
					})			
				});
		});
});
});

	