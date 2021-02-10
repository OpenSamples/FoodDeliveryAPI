const mongoose = require('mongoose');


const UsersSchema = new mongoose.Schema(
    {   
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
                ref: 'products'
            }]
    },
    { timestamps: true },
);


module.exports = mongoose.model('users', UsersSchema);