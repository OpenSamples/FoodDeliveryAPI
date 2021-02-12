const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingCartItemsSchema = new Schema({
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true
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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
}, { timestamps: true });

//Virtuel function called totalAmount which goes through array of objects called products
//and for every object multiplies its price with quantity and adds up in totalAmount which is returned
//we can use this whenever we want
shoppingCartItemsSchema.virtual("totalAmount")
    .get(function () {
        let totalAmount = 0;
        this.products.map(product => {
            totalAmount += (product.price * product.qty);
        });
        return totalAmount;
    });

const Shopping_cart_items = mongoose.model("Shopping_cart_items", shoppingCartItemsSchema);

module.exports = Shopping_cart_items;
