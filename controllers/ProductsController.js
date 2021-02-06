const Products = require("../models/Products");

function add(data) {
    return new Promise((resolve, reject) => {
        try {
            resolve(Products.create(data));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function findAll() {
    return new Promise((resolve, reject) => {
        try {
            resolve(Products.find({}).lean().sort({ createdAt: -1 }));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function findOneById(id) {
    return new Promise((resolve, reject) => {
        try {
            resolve(Products.findOne({ _id: id }));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function findAllByCategory(categoryId) {
    return new Promise((resolve, reject) => {
        try {
            resolve(Products.find({ categoryId: categoryId }).lean().sort({ createdAt: -1 }));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function findPopular() {
    return new Promise((resolve,reject)=>{
        try {
            resolve(Products.find({isPopularProduct:true}).lean().sort({createdAt:-1}));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

module.exports = {
    add,
    findAll,
    findOneById,
    findAllByCategory,
    findPopular
}