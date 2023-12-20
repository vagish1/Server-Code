
const Users = require("../././db/models/user");
const { findUserByEmailOrPhone } = require("../utils/app-utils");

module.exports ={
    register: async (req,res) => {
     try{
        console.log(req.body);
        const {email,phone} = req.body;
        const fetchedUser =   await  Users.findOne({'$or': [{'email': email}, {'phone': phone}]});
        if(fetchedUser) {
            res.status(400).json({
                status: "error",
                message: "User already exists with this email or phone number"
            })
            return;
        }
        const user = new  Users(req.body)
        await user.save();
        res.status(200).json({
            status: "success",
            message: "User registered successfully",
            data: user
        });
     }catch(err){
        console.log(err);
        res.status(400).send({
            status: "error",
            error:err
        })
     }
    },
   

    login: async (req,res) => {
    
     const {email,password,phone} = req.body;

     if(!email &&!phone) {
        res.status(400).json({"status":"error", "message" : "Please provide a valid email or phone number and try again"});
        return;
     }

     if(!password){
        res.status(400).json({"status":"error", "message" : "Please provide passwords and try again"});
        return;
     }
       try {
       const user =  await  findUserByEmailOrPhone(email,phone)
        if(user.password == password){
            res.status(200).json({status : "success", message :"Login successful",})
            return;
        }

        res.status(403).json({status : "error", message :"Invalid password, Authorization failed"});
       }catch(err){
        console.log(err);
        res.status(400).send({
            status: "error",
            error:err.message
        });
       }
        

    },

    delete: async (req,res) => {
    },

    logout: async (req,res) => {

    },

    

}

