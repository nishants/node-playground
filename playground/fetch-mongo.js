const MongoClient = require('mongodb').MongoClient;

const url 	 = 'mongodb://localhost:27017';
const dbName = 'hello-mongo';

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("hello-collection");
  collection.find({message: "up and running"}).toArray().then((result)=>{
  	console.log(result);
  	collection.updateMany(
  		{}, 
  		{$rename: {text: "message"}},
  		{returnOriginal: true}
  		).then((result)=> {
    		console.log(result);
	});

  }); 
});

