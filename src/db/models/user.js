require("dotenv").config()
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 const {PasswordHasherException,FailureException,JwtTokenGenException} =  require('../../error/exception');
const userSchema = new mongoose.Schema({
 
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
     
        unique: [true,"Email id already in use"],
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email',
          }, 
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    phone:{
        type:Number,
        minlength:10,
        maxlength:10,
        required:true,
        unique:true,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        },
        createdAt:{
            type: Date,
            required: true,
        },
        inUse:{
            type: Boolean,
            required: true
        }
    }],
    passwordAttempt: {
        type: Number,
        default: 0
    }
});

userSchema.methods.generateAuthToken = async function (next){
    try{
        const token = await jwt.sign({_id: this._id},process.env.SECRET_KEY,{expiresIn: "14 days"})
        this.tokens.push({token:token, "createdAt":Date.now(),"inUse":true});
        return token;
    }catch(e){
       throw new JwtTokenGenException(e.message, {"status":"error","error":"Json Web token generation error ", causedBy: e.message});
    }
}
userSchema.pre('save', async function (){
    try{
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password,10);
        }
       
    }catch(e){
        throw new PasswordHasherException("Hash generation failed",{"status":"error","message":"Password hash failed",causeBy: e.message})
    }
});
const Users = mongoose.model('User',userSchema);
module.exports = Users;