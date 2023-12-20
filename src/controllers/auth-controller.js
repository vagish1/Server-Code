
const Users = require("../././db/models/user");

module.exports ={
    register: async (req,res) => {
     try{
        console.log(req.body);
    
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
    },

    delete: async (req,res) => {
    },

    logout: async (req,res) => {

    },

}