const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbName = process.argv.indexOf('--test') > 0 ? 'test-todo-app' : 'todo-app'
const dbURL  = 'mongodb://localhost:27017'

mongoose.connect(`${dbURL}/${dbName}`);

module.exports = {mongoose};