const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:6
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    role:{
        type:Number,
        required:true,
        default:0
    }
},{timestamps:true});

const Users = mongoose.model("Users",usersSchema);

module.exports = Users;
