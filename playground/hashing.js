const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const data = {message: "I am a secret"};
const token = jwt.sign(data, 'secret-key');
console.log(token);

const decoded = jwt.verify(token, 'secret-key');
console.log(decoded);
//const message = "message to hash";
//const hash = SHA256(message).toString();
//
//console.log(hash);
