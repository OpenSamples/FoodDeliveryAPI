const Products = require('../models/Products')


function getProductBy(type, val) {
    return new Promise((resolve, reject) => {
        try {
            if(!['_id', 'categoryId'].includes(type)) {
                throw {error: true, message: 'You can only search by id or category!'}
            }
            resolve(Products.find({[type]: val}).exec())
        } catch(e) {
            reject(e)
        }
    })
}


function getPopularProducts() {
    return new Promise((resolve, reject) => {
        try {
            resolve(Products.find({isPopularProduct: true}).lean().exec())
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    getProductBy,
    getPopularProducts
}