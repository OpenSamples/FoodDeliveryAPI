const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    email_is_verified:{
        type:Boolean,
        default:false
    },
    two_fa: {
        enabled: {
            type: Boolean,
            default: false
        },
        code: {
            type: Number
        }
    },
    password: {
        type: String,
        default: null
    },
    googleId:{
        type:String,
        default: null
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
        default: null
    },
    logoUrl: {
        type: String
    },
    addresses: [{
        type: String
    }],
    favoriteFood: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }]
},{timestamps:true});

//Virutal function called fullName which we can use
//to get users full name at some point
usersSchema.virtual("fullName")
           .get(function(){
            return this.firstName+" "+this.lastName;
           });

const Users = mongoose.model("Users",usersSchema);

module.exports = Users;
