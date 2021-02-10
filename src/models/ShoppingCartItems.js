const mongoose = require('mongoose');



const ShoppingCartItemsSchema = new mongoose.Schema(
    {   
            totalAmount: {
                type: Number,
                required: true
            },
            products: [{
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
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
                ref: 'users',
                required: true
            }
    },
    { timestamps: true },
);


module.exports = mongoose.model('shoppingcartitems', ShoppingCartItemsSchema);