const jwt = require("jsonwebtoken");

const data = {
  message: "who let the dogs out ?"
};

const savedToken = jwt.sign(data, process.env.JWT);
console.log(process.env.JWT);
console.log(savedToken);

try{
  jwt.verify(savedToken, "invalid key");
}catch(e){
  console.log("invalid key signature")
}

const decoded = jwt.verify(savedToken, process.env.JWT);
console.log(decoded);