const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        detail: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String
        },
        price: {
            type: Number,
            required: true
        },
        isPopularProduct: {
            type: Boolean,
            default: false
        },
        reviews: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            rating: {
                type: Number
            },
            comment: {
                type: String
            }
        }],
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories',
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('products', ProductsSchema);