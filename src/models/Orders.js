const mongoose = require('mongoose');



const OrdersSchema = new mongoose.Schema(
    {   
            fullName: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            orderTotal: {
                type: Number,
                required: true
            },
            orderPlaced: {
                type: Date,
                required: true
            },
            isOrderCompleted: {
                type: Boolean,
                default: false                
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true
            }
    },
    { timestamps: true },
);


module.exports = mongoose.model('orders', OrdersSchema);