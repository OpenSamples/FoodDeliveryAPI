const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
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
            ref: 'Users',
            required: true
        },
        rating: {
            type: Number
        },
        comment: {
            imageUrl: String,
            name: String,
            comment: String
        }
    }],
    
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    }
}, { timestamps: true });

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
