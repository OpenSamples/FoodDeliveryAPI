const Categories = require('../models/Categories')

function findAll() {
    return new Promise((resolve, reject) => {
        try {
            resolve(Categories.find({}).lean().exec())
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    findAll
}