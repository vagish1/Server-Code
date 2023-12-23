require("dotenv").config()
const jwt = require('jsonwebtoken');
const {InvalidTokenInHeader} =  require("../error/exception")
const ExceptionCode = require("../error/codes")


const checkAuthorization = async (req, res, next) => {
  const token = req.cookies.Session;
  const isMatch =  await jwt.verify(token,process.env.SECRET_KEY)

  if(!isMatch) {
    const exception = new InvalidTokenInHeader(ExceptionCode.invalidTokenInHeader,{"message":"Your session is not valid, please login again"});
    res.status(401).json(exception.toJSON())
    return;
  }
  next();
  
}

module.exports = {checkAuthorization}