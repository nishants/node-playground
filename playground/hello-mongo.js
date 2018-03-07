const MongoClient = require('mongodb').MongoClient;

const url 	 = 'mongodb://localhost:27017';
const dbName = 'hello-mongo';

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("hello-collection");
  collection.insertOne({
  	message: "up and running"
  },
 (error, result)=> {
 	console.log("inserted record");
 	console.log(`error : ${error}`);
 	console.log(result.ops, null, 2);
 	console.log("Created at "+result.ops[0]._id.getTimestamp());
 	console.log("close connection");
	client.close(); 	
 });
  
});

