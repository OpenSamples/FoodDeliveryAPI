const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    detail: {
        type: String,
        required:true
    },
    imageUrl: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    isPopularProduct: {
        type: Boolean
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref:"Categories",
        required:true
    }
}, { timestamps: true });

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
