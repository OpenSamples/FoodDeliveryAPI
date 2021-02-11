const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
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
        ref: 'Users',
        required: true
    }
},{timestamps:true});

const Orders = mongoose.model("Orders",ordersSchema);

module.exports = Orders;
