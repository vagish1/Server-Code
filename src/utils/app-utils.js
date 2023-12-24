const Users = require("../db/models/user");
const ExceptionCode = require("../error/codes");
const { UserNotFound, FailureException } = require("../error/exception");

module.exports = {
    findUserByEmailOrPhone: async function (email, phone) {
      
            const fetchedUser = await Users.findOne({ $or: [{ email: email }, { phone: phone }] });
            if (!fetchedUser) {
                throw new UserNotFound(ExceptionCode.userNotExist, {message:"User does not exist with this email",});
            }
            return fetchedUser;
       
    },
  
}