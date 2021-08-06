const jwt = require('jsonwebtoken');
const config = require('../config.json');

const verifyToken = (req, res, next)=>{
  const token= req.body.token || req.query.token || req.headers["x-access-token"];

  if(!token){
    return res.status(403).send("A token is require for authentication");
  }

  try{
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = jwt.decoded;
  }catch(e){
    return res.status(401).send('InvalidToken')
  }
  return next();
}

module.exports = verifyToken;