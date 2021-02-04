const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingCartItemsSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref:"Products",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:"Users",
        required: true
    }
}, { timestamps: true });

const Shopping_cart_items = mongoose.model("Shopping_cart_items", shoppingCartItemsSchema);

module.exports = Shopping_cart_items;
