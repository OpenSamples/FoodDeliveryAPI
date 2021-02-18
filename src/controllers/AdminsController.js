const Users = require("../models/Users");
const Products = require("../models/Products");
const Categories = require("../models/Categories");

function deleteUser(id) {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(
                Users.findOneAndDelete({ _id: id })
            );
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while deleting user!',
                status: 500,
                err_msg
            })
        }
    });
}

function deleteProduct(id) {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(
                Products.findOneAndDelete({ _id: id })
            );
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while deleting product!',
                status: 500,
                err_msg
            })
        }
    });
}

function updateProduct(id,newProductData) {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(
                Products.findOneAndUpdate({ _id: id },newProductData,{new:true})
            );
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while deleting product!',
                status: 500,
                err_msg
            })
        }
    });
}

function deleteCategory(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await Categories.findOneAndDelete({ _id: id });
            const products = await Products.deleteMany({categoryId:id});
            const categoryAndProducts = {
                category,
                products
            }
            resolve(categoryAndProducts);
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while deleting category!',
                status: 500,
                err_msg
            })
        }
    });
}

function updatedCategory(id,newCategoryData) {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(
                Categories.findOneAndUpdate({ _id: id },newCategoryData,{new:true})
            );
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while deleting product!',
                status: 500,
                err_msg
            })
        }
    });
}

module.exports = {
    deleteUser,
    deleteProduct,
    deleteCategory,
    updateProduct,
    updatedCategory
};