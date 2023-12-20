const mongoose = require('mongoose');
const validator = require('validator');

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
        maxlength: 30,
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
    }
});
const Users = mongoose.model('User',userSchema);
module.exports = Users;