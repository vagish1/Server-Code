
const Users = require("../././db/models/user");
const { findUserByEmailOrPhone } = require("../utils/app-utils");
const {UserAlreadyExistsException,InvalidPasswordException, FailureException, InvalidEmailException} = require("../error/exception")
const ExceptionCode = require("../error/codes")
const validator = require('validator');

module.exports ={
    register: async (req,res,next) => {
     try{
        console.log(req.body);
        const {email,phone} = req.body;
        const fetchedUser =   await  Users.findOne({'$or': [{'email': email}, {'phone': phone}]});
        if(fetchedUser) {
            const userAlreadyExistsError = new UserAlreadyExistsException(ExceptionCode.userAlreadyExists, {"message":"User already exists either by email or phone number, we don't allow duplicacy"});
            res.status(409).json(userAlreadyExistsError.toJSON());
            return;
        }
        const user = new  Users(req.body)
        const token =  await user.generateAuthToken(next);
        res.cookie("Session",token,{httpOnly: true, expires: new Date(Date.now()+1200000)});
        await user.save();
        res.status(200).json();
     }catch(err){
        res.status(500).send(FailureException(400,ExceptionCode.userRegistrationFailed,{"message":"We encountered an error while registering  the user try again after some time"}))
     }
    },
   

    login: async (req,res) => {
       try{
        const {email,password} = req.body;
        if(!validator.isEmail(email)){
            const exception = new InvalidEmailException("User provided a invalid email",{err_code: ExceptionCode.invalidEmail, "message":"Please provide a valid email address"});
            res.status(400).json(exception.toJSON())
            return;
        }

        const user = await findUserByEmailOrPhone(email);
       } catch(err){
        res.status(400).json(err.details)
       }
        
        
    },

    delete: async (req,res) => {
    },

    logout: async (req,res) => {

    },

    

}

