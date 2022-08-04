const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if(!authHeader)return res.sendStatus(400)
  console.log(authHeader) // bearer token
  const token = authHeader.split(" ",)[1]
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if(err) return res.sendStatus(403)// Invalid token 
      req.user = decoded.username;
      next()
    }
  )
  next()
};

