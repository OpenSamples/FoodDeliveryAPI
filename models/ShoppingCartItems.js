const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingCartItemsSchema = new Schema({
    price: {
        type: Number,
    },
    qty: {
        type: Number,
    },
    totalAmount: {
        type: Number,
    },
    productId:{
        type: Schema.Types.ObjectId,
        ref:"Products",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:"Users",
        required: true
    }
}, { timestamps: true });

const Shopping_cart_items = mongoose.model("Shopping_cart_items", shoppingCartItemsSchema);

module.exports = Shopping_cart_items;
