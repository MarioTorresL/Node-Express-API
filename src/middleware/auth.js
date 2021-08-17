const jwt = require('jsonwebtoken');
const config = require('../config.json');

const verifyToken = (req, res, next)=>{

  if( !req.headers['authorization'] ){
    return res.status(401).error(new InvalidAccessToken('Authorization header not present'))
  }

  const authorizationHeader = req.headers['authorization'];
  const [type, accessToken] = authorizationHeader.split(' ');

  if( type !== 'Bearer' ){
    return res.status(401).error(new InvalidAccessToken('Wrong Authorization header type given'))
  }

  if( !accessToken ){
    return res.status(401).error(new InvalidAccessToken('Access token not present'))
  }

  try{
    const decoded = jwt.verify(accessToken, config.TOKEN_KEY);
    req.user = jwt.decoded;
  }catch(e){
    return res.status(401).send('InvalidToken')
  }
  return next();
}

module.exports = verifyToken;