const mongoose = require('mongoose');



const OrderDetailsSchema = new mongoose.Schema(
    {   
            totalAmount: {
                type: Number,
                required: true
            },
            products: [{
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
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
                type: Number,
                ref: 'orders',
                required: true
            }

    },
    { timestamps: true },
);


module.exports = mongoose.model('orderdetails', OrderDetailsSchema);