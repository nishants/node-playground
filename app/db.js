const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbName = process.argv.indexOf('--test') > 0 ? 'test-todo-app' : 'todo-app'
const dbURL  = process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`

mongoose.connect(dbURL);

module.exports = {mongoose};