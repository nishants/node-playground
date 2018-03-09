const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const Todo = require('./models/todo');
const Page = require('./models/page');
const app = express();
const port = process.env.PORT || 3000;
require('./db');
app.use(bodyParser.json());

app.listen(port, ()=> {
  //console.log(`running on ${port}`);
});

app.post('/todos', (request, response)=> {
  const params = request.body.todo;
  new Todo({
    text: params.text
  }).save()
    .then((created)=> {
      response.send({status: 'success', created});
    }, (error)=> {
      response.status(400).send({status: 'error', error});
    });
});

app.get('/todos', (request, response)=> {

  const page = Page.forRequest(request);

  Todo.find()
    .skip(page.index * page.size)
    .limit(page.size)
    .exec(function (error, todos) {
      if (error) {
        return response.status(500).send(error);
      }
      Todo.count().then((count)=> {
        response.send({
          page: page.count(count),
          todos
        });
      });
    });
});

app.get('/todos/:todoID', (request, response)=> {
  const
    todoID = request.params.todoID,
    onSuccess = (todo)=> {
      response.send({todo: todo, status: 'success'});
    },
    onNotFound = ()=> {
      response.status(404).send({status: 'error'});
    };

  if (!ObjectID.isValid(todoID)) {
    return onNotFound();
  }
  Todo.findById(todoID).then((todo)=> {
    todo ? onSuccess(todo) : onNotFound();
  });
});

app.delete('/todos/:todoID', (request, response)=> {
  const
    todoId = request.params.todoID,
    onDeleteSuccess = deleted=> response.send({deleted}),
    onNotFound = ()=> {
      response.status(404).send({status: 'error'});
    },
    validId = ObjectID.isValid(todoId);

  validId ?
    Todo.findByIdAndRemove(todoId).then(deleted => deleted ? onDeleteSuccess(deleted) : onNotFound())
    : onNotFound();
});

app.patch('/todos/:todoID/text', (request, response)=> {
  const
    todoID = request.params.todoID,
    text = request.body.text,
    onError = ()=> response.status(400).send(),
    notFound = ()=> response.status(404).send(),
    onUpdated = todo => todo ? response.send({todo}) : notFound();

  Todo.findByIdAndUpdate(
    todoID,
    {$set: {text}},
    {new: true, runValidators: true}
  ).then(onUpdated).catch(onError);
});
module.exports = app;
