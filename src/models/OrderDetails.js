const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema({
    totalAmount: {
        type: Number,
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    }],
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
        required: true
    }
}, { timestamps: true });



const Order_Details = mongoose.model("Order_Details", orderDetailsSchema);

module.exports = Order_Details;
