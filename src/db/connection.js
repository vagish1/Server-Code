const mongoose = require('mongoose');
require("dotenv").config()
const connection = async()=>{

   try{
      // console.log(process.env.MONGODB_URI);
    const result =   await mongoose.connect(process.env.MONGODB_URI,{})
    return result;
   }catch(err){
    return err;
   }
    
}

module.exports={connection}