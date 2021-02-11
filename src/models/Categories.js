const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('categories', CategoriesSchema);