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
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true,
        default: 0
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

usersSchema.virtual("fullName")
           .get(function(){
            return this.firstName+" "+this.lastName;
           });

const Users = mongoose.model("Users",usersSchema);

module.exports = Users;
